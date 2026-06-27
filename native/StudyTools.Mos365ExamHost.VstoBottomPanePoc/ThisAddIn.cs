using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;
using Office = Microsoft.Office.Core;
using Microsoft.Office.Tools;

namespace StudyTools.Mos365ExamHost
{
    /// <summary>
    /// MOS 底部训练控制台 Add-in — R33
    ///
    /// 关键变更：
    ///   1. Pane 停靠：msoCTPDockPositionBottom（高度 240px）
    ///   2. 单一 pane：启动时清除旧训练 pane
    ///   3. task_metadata_ready：workbook 打开后立即读取安全元数据并渲染题干
    ///   4. 状态机：connecting/failed 不覆盖已渲染的题干
    ///   5. Generation 防护：stale 回调无效化
    /// </summary>
    public partial class ThisAddIn
    {
        private ExamHostPaneControl _paneControl;
        private CustomTaskPane _pane;
        private Guid _sessionId;
        private Excel.Application _excelApp;
        private RuntimeProbe _probe;
        private SessionBridge _bridge;
        private string _boundSessionId;
        private int _verifying; // 0=idle, 1=verifying
        private CancellationTokenSource _attachCts;
        private bool _exiting;
        private long _activeGeneration; // R31: current render generation

        // R33: 安全任务元数据字段名（与服务端 workbook 写入字段一致）
        private const string META_TASK_ID      = "MOS_TASK_ID";
        private const string META_TITLE_JA     = "MOS_TITLE_JA";
        private const string META_TITLE_ZH     = "MOS_TITLE_ZH";
        private const string META_INSTR_JA     = "MOS_INSTRUCTION_JA";
        private const string META_INSTR_ZH     = "MOS_INSTRUCTION_ZH";
        private const string META_SHEET_LABEL  = "MOS_SHEET_LABEL";
        private const string META_TARGET_LABEL = "MOS_TARGET_LABEL";

        private void ThisAddIn_Startup(object sender, System.EventArgs e)
        {
            _sessionId = Guid.NewGuid();
            _probe = new RuntimeProbe();
            if (_pane != null)
            {
                _paneControl?.UpdateSession(_sessionId, Process.GetCurrentProcess().Id);
                _probe?.Write("startup.duplicate.prevented", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id);
                return;
            }
            _probe.Write("startup.begin", _sessionId.ToString("N"),
                excelPid: Process.GetCurrentProcess().Id);
            try
            {
                _excelApp = this.Application;
                RemoveExistingTrainingPanes();
                _paneControl = new ExamHostPaneControl();
                _paneControl.UpdateSession(_sessionId, Process.GetCurrentProcess().Id);
                _paneControl.OnRetryClicked = () =>
                {
                    if (_exiting) return;
                    var wb = _excelApp?.ActiveWorkbook;
                    if (wb != null) StartBindWorkbook(wb);
                    else _paneControl.UpdateSessionState("retrying");
                };
                _paneControl.OnExitClicked = () => HandleExitAsync(Process.GetCurrentProcess().Id);
                _paneControl.OnStartClicked = () =>
                {
                    _paneControl.StartTimer();
                    _paneControl.ApplyUIState("running");
                };
                _paneControl.OnPauseClicked = () =>
                {
                    _paneControl.PauseTimer();
                    _paneControl.ApplyUIState("paused");
                };
                _paneControl.OnResumeClicked = () =>
                {
                    _paneControl.ResumeTimer();
                    _paneControl.ApplyUIState("running");
                };
                _paneControl.OnGradeClicked = () =>
                {
                    HandleGradeAsync(Process.GetCurrentProcess().Id);
                };
                _probe.Write("control.handle.created", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id);

                // R33: 底部停靠
                _pane = this.CustomTaskPanes.Add(_paneControl, "MOS 実技トレーニング");
                _probe.Write("pane.created", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id,
                    paneTitle: "MOS 実技トレーニング", dockPosition: "Bottom");

                _pane.DockPosition = Office.MsoCTPDockPosition.msoCTPDockPositionBottom;
                _pane.Height = 280;
                _pane.Visible = true;

                _probe.Write("pane.visible", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id,
                    paneTitle: "MOS 実技トレーニング", dockPosition: "Bottom", paneVisible: true);

                _excelApp.WorkbookActivate  += OnWorkbookActivate;
                _excelApp.WorkbookDeactivate += OnWorkbookDeactivate;
                _excelApp.WorkbookOpen       += OnWorkbookOpen;
                _bridge = new SessionBridge();

                // R33: 如果启动时已有 workbook，立即尝试读取元数据
                var activeWb = SafeGetActiveWorkbook();
                if (activeWb != null)
                {
                    TryRenderMetadata(activeWb);
                    StartBindWorkbook(activeWb);
                }

                _probe.Write("startup.complete", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id,
                    workbookCount: GetWorkbookCount());
            }
            catch (Exception ex)
            {
                _probe.Write("exception", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id,
                    exceptionType: ex.GetType().Name, exceptionMessage: ex.Message);
                Debug.WriteLine("VSTO startup error: " + ex.Message);
            }
        }

        private void ThisAddIn_Shutdown(object sender, System.EventArgs e)
        {
            _probe?.Write("shutdown.begin", _sessionId.ToString("N"),
                excelPid: Process.GetCurrentProcess().Id);
            CancelAttach();
            try
            {
                if (_excelApp != null)
                {
                    _excelApp.WorkbookActivate   -= OnWorkbookActivate;
                    _excelApp.WorkbookDeactivate -= OnWorkbookDeactivate;
                    _excelApp.WorkbookOpen       -= OnWorkbookOpen;
                }
                if (_pane != null)
                {
                    try { this.CustomTaskPanes.Remove(_pane); } catch { }
                    _pane = null;
                    _paneControl = null;
                }
                _probe?.Write("shutdown.complete", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id);
            }
            catch (Exception ex)
            {
                _probe?.Write("exception", _sessionId.ToString("N"),
                    exceptionType: ex.GetType().Name, exceptionMessage: ex.Message);
            }
        }

        private void OnWorkbookActivate(Excel.Workbook wb)
        {
            try
            {
                if (this.Application != null)
                {
                    this.Application.WindowState = Excel.XlWindowState.xlMaximized;
                }
            }
            catch { }
            // R33: 先渲染 metadata（即时），再异步 attach
            TryRenderMetadata(wb);
            if (!_exiting) StartBindWorkbook(wb);
            _probe?.Write("excel.window.activate", _sessionId.ToString("N"),
                excelPid: Process.GetCurrentProcess().Id,
                workbookCount: GetWorkbookCount());
        }

        private void OnWorkbookOpen(Excel.Workbook wb)
        {
            try
            {
                if (this.Application != null)
                {
                    this.Application.WindowState = Excel.XlWindowState.xlMaximized;
                }
            }
            catch { }
            try { Debug.WriteLine("Workbook opened: " + wb.Name); } catch { }
            TryRenderMetadata(wb);
            if (!_exiting) StartBindWorkbook(wb);
        }

        private void OnWorkbookDeactivate(Excel.Workbook wb) { }

        // ──────────────────────────────────────────────────────────
        // R33 核心：读取 workbook 安全任务元数据并立即渲染题干
        // ──────────────────────────────────────────────────────────

        /// <summary>
        /// 从 workbook CustomDocumentProperties 读取安全元数据。
        /// 立即渲染题干，不等 attach。
        /// 在 UI 线程调用（OnWorkbookActivate / OnWorkbookOpen）。
        /// </summary>
        private void TryRenderMetadata(Excel.Workbook wb)
        {
            if (wb == null || _paneControl == null) return;
            try
            {
                var meta = ReadWorkbookMetadata(wb);
                if (meta == null) return;

                string titleJa   = meta.ContainsKey(META_TITLE_JA)     ? meta[META_TITLE_JA]     : "";
                string titleZh   = meta.ContainsKey(META_TITLE_ZH)     ? meta[META_TITLE_ZH]     : "";
                string instrJa   = meta.ContainsKey(META_INSTR_JA)     ? meta[META_INSTR_JA]     : "";
                string instrZh   = meta.ContainsKey(META_INSTR_ZH)     ? meta[META_INSTR_ZH]     : "";
                string sheetLbl  = meta.ContainsKey(META_SHEET_LABEL)  ? meta[META_SHEET_LABEL]  : "";
                string targetLbl = meta.ContainsKey(META_TARGET_LABEL) ? meta[META_TARGET_LABEL] : "";

                if (string.IsNullOrWhiteSpace(instrJa) && string.IsNullOrWhiteSpace(titleJa)) return;

                _probe?.Write("training.metadata.ready", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id);

                // 在 UI 线程：直接调用（OnWorkbookActivate 已在 Excel 主线程）
                _paneControl.ShowTaskFromMetadata(titleJa, titleZh, instrJa, instrZh, sheetLbl, targetLbl);
            }
            catch (Exception ex)
            {
                Debug.WriteLine("TryRenderMetadata error: " + ex.Message);
                // 失败无害：服务端 attach 会补充数据
            }
        }

        /// <summary>
        /// 从 workbook CustomDocumentProperties 读取字段。
        /// 只读取 MOS_* 前缀的属性，不读取任何其他属性。
        /// 返回 null 表示无元数据。
        /// </summary>
        private Dictionary<string, string> ReadWorkbookMetadata(Excel.Workbook wb)
        {
            try
            {
                // Excel CustomDocumentProperties: COM 自动化，官方 API
                var props = wb.CustomDocumentProperties as Microsoft.Office.Core.DocumentProperties;
                if (props == null) return null;

                var result = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
                var fields = new[] {
                    META_TASK_ID, META_TITLE_JA, META_TITLE_ZH,
                    META_INSTR_JA, META_INSTR_ZH,
                    META_SHEET_LABEL, META_TARGET_LABEL
                };

                foreach (var field in fields)
                {
                    try
                    {
                        var prop = props[field] as Microsoft.Office.Core.DocumentProperty;
                        if (prop != null)
                        {
                            var val = prop.Value as string;
                            if (!string.IsNullOrEmpty(val))
                                result[field] = val;
                        }
                    }
                    catch { /* 属性不存在 — 跳过 */ }
                }
                return result.Count > 0 ? result : null;
            }
            catch (Exception ex)
            {
                Debug.WriteLine("ReadWorkbookMetadata error: " + ex.Message);
                return null;
            }
        }

        // ──────────────────────────────────────────────────────────
        // 异步 attach：不覆盖已渲染的 metadata 题干
        // ──────────────────────────────────────────────────────────

        /// <summary>
        /// Fire-and-forget bind: starts async verification on background thread.
        /// R33: connecting state no longer clears task area.
        /// R31: generation-based rendering prevents stale overwrites.
        /// </summary>
        private void StartBindWorkbook(Excel.Workbook wb)
        {
            if (Interlocked.CompareExchange(ref _verifying, 1, 0) != 0) return;
            if (_exiting || wb == null) { _verifying = 0; return; }

            CancelAttach();
            _attachCts = new CancellationTokenSource();
            var token = _attachCts.Token;
            var pid   = Process.GetCurrentProcess().Id;
            var guid  = _sessionId.ToString("N");

            // R31: bump generation for this attach cycle
            long gen = _paneControl.NewRenderGeneration();
            _activeGeneration = gen;

            string path = null;
            try { path = wb.FullName; } catch { }

            if (string.IsNullOrEmpty(path))
            {
                _probe?.Write("session.verify.rejected", guid, excelPid: pid);
                // R33: connecting 状态不覆盖题干
                _paneControl.UpdateSessionState("connecting");
                _boundSessionId = null;
                _activeGeneration = 0;
                _verifying = 0;
                return;
            }

            _probe?.Write("session.verify.begin", guid, excelPid: pid);
            // R33: connecting 不覆盖题干（ExamHostPaneControl 已保证）
            _paneControl.UpdateSessionState("connecting");

            var capturedGen = gen;

            Task.Run(async () =>
            {
                try
                {
                    var result = await _bridge.VerifyWorkbookAsync(path, pid, token)
                        .ConfigureAwait(false);

                    if (token.IsCancellationRequested) return;

                    _paneControl.BeginInvoke((Action)(() =>
                    {
                        try
                        {
                            // R31: ignore stale generations
                            if (capturedGen != _activeGeneration) return;

                            if (result.Ok)
                            {
                                _probe?.Write("session.verify.accepted", guid, excelPid: pid);
                                _probe?.Write("session.bound", result.SessionId, excelPid: pid);
                                _boundSessionId = result.SessionId;

                                if (!string.IsNullOrEmpty(result.TaskId)
                                    && !string.IsNullOrEmpty(result.InstructionJa)
                                    && !string.IsNullOrEmpty(result.InstructionZh))
                                {
                                    _probe?.Write("training.task.received",
                                        _sessionId.ToString("N"), excelPid: pid);
                                    // R33: ShowTask 不清空 metadata 题干，只更新说明文字并启用评分
                                    _paneControl.ShowTask(result.InstructionJa,
                                        result.InstructionZh, capturedGen,
                                        result.IsExam, result.CurrentStep, result.TotalSteps,
                                        result.TitleJa, result.TitleZh,
                                        result.SheetLabel, result.TargetLabel);
                                    if (result.CompletionAcknowledged)
                                        _paneControl.ShowCompletionAccepted();
                                    _paneControl.OnGradeClicked = () =>
                                        HandleGradeAsync(pid);
                                    _paneControl.OnNextClicked = async () =>
                                    {
                                        _paneControl.ApplyUIState("scoring");
                                        try
                                        {
                                            var ok = await _bridge.NextStepAsync(_boundSessionId, pid);
                                            if (ok)
                                            {
                                                var activeWb = _excelApp?.ActiveWorkbook;
                                                if (activeWb != null)
                                                {
                                                    StartBindWorkbook(activeWb);
                                                }
                                            }
                                        }
                                        catch (Exception ex)
                                        {
                                            Debug.WriteLine("Next step transition failed: " + ex.Message);
                                            _paneControl.ApplyUIState("running");
                                        }
                                    };
                                }
                                else
                                {
                                    _probe?.Write("training.task.missing",
                                        _sessionId.ToString("N"), excelPid: pid);
                                    // 服务端 attach 成功但无题干：只启用评分按钮（metadata 有题干时）
                                    _paneControl.UpdateSessionState("attached",
                                        result.SessionId, result.ExcelPid ?? pid);
                                    _paneControl.EnableGrading();
                                    _paneControl.OnGradeClicked = () =>
                                        HandleGradeAsync(pid);
                                    Task.Delay(1500).ContinueWith(_ =>
                                    {
                                        _paneControl.BeginInvoke((Action)(() =>
                                        {
                                            if (capturedGen == _activeGeneration)
                                                _paneControl.ShowTaskLoadFailed();
                                        }));
                                    });
                                }
                            }
                            else
                            {
                                _probe?.Write("session.verify.rejected", guid, excelPid: pid);
                                _boundSessionId = null;
                                _paneControl.ShowConnectionFailed(result.ErrorMessage);
                            }
                        }
                        catch (Exception ex)
                        {
                            _probe?.Write("session.connection_failed", guid, excelPid: pid);
                            _paneControl.ShowConnectionFailed(null);
                            Debug.WriteLine("SessionBridge error: " + ex.Message);
                        }
                        finally { _verifying = 0; }
                    }));
                }
                catch (OperationCanceledException)
                {
                    _paneControl.BeginInvoke((Action)(() =>
                    {
                        _boundSessionId = null;
                        _verifying = 0;
                    }));
                }
                catch (Exception ex)
                {
                    _paneControl.BeginInvoke((Action)(() =>
                    {
                        _probe?.Write("session.connection_failed", guid, excelPid: pid);
                        _paneControl.ShowConnectionFailed(null);
                        Debug.WriteLine("SessionBridge error: " + ex.Message);
                        _verifying = 0;
                    }));
                }
            });
        }

        private void CancelAttach()
        {
            try
            {
                var cts = Interlocked.Exchange(ref _attachCts, null);
                if (cts != null)
                {
                    cts.Cancel();
                    cts.Dispose();
                }
            }
            catch { }
        }

        /// <summary>
        /// 清除已有的 MOS 训练 pane（防止重复）。
        /// R33：不保留右侧 pane，不创建多个 pane。
        /// </summary>
        private void RemoveExistingTrainingPanes()
        {
            var panes = new List<CustomTaskPane>();
            try
            {
                foreach (CustomTaskPane pane in this.CustomTaskPanes)
                {
                    try
                    {
                        var title = pane.Title ?? "";
                        if (title.IndexOf("MOS", StringComparison.OrdinalIgnoreCase) >= 0 ||
                            title.IndexOf("トレーニング", StringComparison.OrdinalIgnoreCase) >= 0)
                        {
                            panes.Add(pane);
                        }
                    }
                    catch { }
                }
                foreach (var pane in panes)
                {
                    try { this.CustomTaskPanes.Remove(pane); } catch { }
                }
            }
            catch { }
        }

        /// <summary>
        /// Async grade: complete → score → show result.
        /// Non-blocking on UI thread.
        /// </summary>
        private async void HandleGradeAsync(int pid)
        {
            var guid = _sessionId.ToString("N");
            if (string.IsNullOrEmpty(_boundSessionId))
            {
                _paneControl.ShowConnectionFailed(null);
                return;
            }
            _probe?.Write("training.complete.begin", guid, excelPid: pid);
            _paneControl.ShowScoreSaving();

            try
            {
                var complete = await _bridge.SendCompletionAsync(_boundSessionId, pid)
                    .ConfigureAwait(true);
                if (!complete.Ok)
                {
                    _probe?.Write("training.complete.rejected", guid, excelPid: pid);
                    _paneControl.ShowConnectionFailed(complete.ErrorMessage);
                    return;
                }
                _probe?.Write("training.complete.accepted", guid, excelPid: pid);
            }
            catch (Exception ex)
            {
                _probe?.Write("training.complete.connection_failed", guid, excelPid: pid);
                _paneControl.ShowConnectionFailed(null);
                Debug.WriteLine("Completion failed: " + ex.Message);
                return;
            }

            _probe?.Write("scoring.save.begin", guid, excelPid: pid);
            try
            {
                var wb = GetActiveSessionWorkbook(_boundSessionId);
                if (wb != null)
                {
                    string path = null;
                    try { path = wb.FullName; } catch { }
                    if (!string.IsNullOrEmpty(path)) { wb.Save(); }
                }
            }
            catch (Exception ex)
            {
                _probe?.Write("scoring.save.failed", guid, excelPid: pid);
                Debug.WriteLine("Workbook save failed: " + ex.Message);
            }

            _probe?.Write("scoring.request.begin", guid, excelPid: pid);
            try
            {
                var result = await _bridge.SendScoreAsync(_boundSessionId, pid)
                    .ConfigureAwait(true);
                if (result.Ok)
                {
                    _probe?.Write("scoring.request.accepted", guid, excelPid: pid);
                    _probe?.Write("scoring.result.shown", guid, excelPid: pid);
                    _paneControl.ShowScoreResult(result.ResultJa, result.ResultZh,
                        result.Earned, result.Total,
                        result.IsExam, result.CurrentStep, result.TotalSteps,
                        result.TaskId, result.InstructionJa, result.InstructionZh,
                        result.TitleJa, result.TitleZh,
                        result.SheetLabel, result.TargetLabel);
                }
                else
                {
                    _probe?.Write("scoring.request.rejected", guid, excelPid: pid);
                    _paneControl.ShowScoreResult("採点できませんでした。", "评分失败。", 0, 1);
                }
            }
            catch (Exception ex)
            {
                _probe?.Write("scoring.connection_failed", guid, excelPid: pid);
                _paneControl.ShowConnectionFailed(null);
                Debug.WriteLine("Score failed: " + ex.Message);
            }
        }

        /// <summary>
        /// Async exit: cancel attach, end session.
        /// Never blocks UI thread. Workbook stays open.
        /// </summary>
        private async void HandleExitAsync(int pid)
        {
            if (_exiting) return;
            _exiting = true;
            _activeGeneration = 0; // R31: invalidate all pending renders

            var guid      = _sessionId.ToString("N");
            var sessionId = _boundSessionId;
            _probe?.Write("training.exit.begin", guid, excelPid: pid);

            CancelAttach();
            _paneControl.ShowEnding();

            try
            {
                if (!string.IsNullOrEmpty(sessionId))
                {
                    var result = await _bridge.EndSessionAsync(sessionId, pid)
                        .ConfigureAwait(true);
                    if (result.Ok)
                        _probe?.Write("training.exit.accepted", guid, excelPid: pid);
                    else
                        _probe?.Write("training.exit.rejected", guid, excelPid: pid);
                }
            }
            catch (Exception ex)
            {
                _probe?.Write("training.exit.failed", guid, excelPid: pid);
                Debug.WriteLine("Exit session end failed: " + ex.Message);
            }

            // Workbook stays open — user closes manually
            _paneControl.ShowEnded();
            _boundSessionId = null;
            _exiting  = false;
            _verifying = 0;
        }

        private Excel.Workbook SafeGetActiveWorkbook()
        {
            try { return _excelApp?.ActiveWorkbook; } catch { return null; }
        }

        private int GetWorkbookCount()
        {
            try { return _excelApp.Workbooks.Count; } catch { return 0; }
        }

        private Excel.Workbook GetActiveSessionWorkbook(string sessionId)
        {
            if (string.IsNullOrEmpty(sessionId)) return null;
            try
            {
                var wb = _excelApp.ActiveWorkbook;
                if (wb == null) return null;
                string path = null;
                try { path = wb.FullName; } catch { }
                if (!string.IsNullOrEmpty(path) &&
                    path.IndexOf("\\" + sessionId + "\\", StringComparison.OrdinalIgnoreCase) >= 0)
                    return wb;
            }
            catch { }
            return null;
        }

        #region VSTO generated code
        private void InternalStartup()
        {
            this.Startup  += new System.EventHandler(ThisAddIn_Startup);
            this.Shutdown += new System.EventHandler(ThisAddIn_Shutdown);
        }
        #endregion
    }
}
