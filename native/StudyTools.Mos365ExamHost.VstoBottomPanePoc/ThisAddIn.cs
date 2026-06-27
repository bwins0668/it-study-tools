using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;
using Office = Microsoft.Office.Core;
using Microsoft.Office.Tools;

namespace StudyTools.Mos365ExamHost
{
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
                    else
                        _paneControl.UpdateSessionState("retrying");
                };
                _paneControl.OnExitClicked = () => HandleExitAsync(Process.GetCurrentProcess().Id);
                _probe.Write("control.handle.created", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id);
                _pane = this.CustomTaskPanes.Add(_paneControl, "MOS 実技トレーニング");
                _probe.Write("pane.created", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id,
                    paneTitle: "MOS 実技トレーニング", dockPosition: "Right");
                _pane.DockPosition = Office.MsoCTPDockPosition.msoCTPDockPositionRight;
                _pane.Width = 360;
                _pane.Visible = true;
                _probe.Write("pane.visible", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id,
                    paneTitle: "MOS 実技トレーニング", dockPosition: "Right", paneVisible: true);
                _paneControl.UpdateWorkbook(GetWorkbookName());
                _excelApp.WorkbookActivate += OnWorkbookActivate;
                _excelApp.WorkbookDeactivate += OnWorkbookDeactivate;
                _excelApp.WorkbookOpen += OnWorkbookOpen;
                _bridge = new SessionBridge();
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
                    _excelApp.WorkbookActivate -= OnWorkbookActivate;
                    _excelApp.WorkbookDeactivate -= OnWorkbookDeactivate;
                    _excelApp.WorkbookOpen -= OnWorkbookOpen;
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
            try { _paneControl.UpdateWorkbook(wb.Name); }
            catch { _paneControl.UpdateWorkbook("(unknown)"); }
            if (!_exiting) StartBindWorkbook(wb);
            _probe?.Write("excel.window.activate", _sessionId.ToString("N"),
                excelPid: Process.GetCurrentProcess().Id,
                workbookCount: GetWorkbookCount());
        }

        private void OnWorkbookOpen(Excel.Workbook wb)
        {
            try { Debug.WriteLine("Workbook opened: " + wb.Name); } catch { }
            if (!_exiting) StartBindWorkbook(wb);
        }

        /// <summary>
        /// Fire-and-forget bind: starts async verification on background thread.
        /// Pane shows "connecting" immediately — Excel UI stays responsive.
        /// </summary>
        private void StartBindWorkbook(Excel.Workbook wb)
        {
            if (Interlocked.CompareExchange(ref _verifying, 1, 0) != 0) return;
            if (_exiting || wb == null) { _verifying = 0; return; }

            CancelAttach();
            _attachCts = new CancellationTokenSource();
            var token = _attachCts.Token;
            var pid = Process.GetCurrentProcess().Id;
            var guid = _sessionId.ToString("N");

            string path = null;
            try { path = wb.FullName; } catch { }

            if (string.IsNullOrEmpty(path))
            {
                _probe?.Write("session.verify.begin", guid, excelPid: pid);
                _probe?.Write("session.verify.rejected", guid, excelPid: pid);
                _paneControl.UpdateSessionState("connecting");
                _boundSessionId = null;
                _verifying = 0;
                return;
            }

            _probe?.Write("session.verify.begin", guid, excelPid: pid);
            _paneControl.UpdateSessionState("connecting");

            // Fire async verification on thread pool — never block UI
            Task.Run(async () =>
            {
                try
                {
                    var result = await _bridge.VerifyWorkbookAsync(path, pid, token)
                        .ConfigureAwait(false);

                    if (token.IsCancellationRequested) return;

                    // Marshal back to UI thread for pane updates
                    _paneControl.BeginInvoke((Action)(() =>
                    {
                        try
                        {
                            if (result.Ok)
                            {
                                _probe?.Write("session.verify.accepted", guid, excelPid: pid);
                                _probe?.Write("session.bound", result.SessionId, excelPid: pid);
                                _boundSessionId = result.SessionId;
                                _paneControl.UpdateSessionState("attached", result.SessionId,
                                    result.ExcelPid ?? pid);
                                if (!string.IsNullOrEmpty(result.TaskId))
                                {
                                    _probe?.Write("training.task.received",
                                        _sessionId.ToString("N"), excelPid: pid);
                                    _paneControl.ShowTask(result.InstructionJa,
                                        result.InstructionZh);
                                    if (result.CompletionAcknowledged)
                                        _paneControl.ShowCompletionAccepted();
                                    _paneControl.OnGradeClicked = () =>
                                        HandleGradeAsync(pid);
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
                    try { this.CustomTaskPanes.Remove(pane); }
                    catch { }
                }
            }
            catch { }
        }

        private void OnWorkbookDeactivate(Excel.Workbook wb)
        {
            _paneControl.UpdateWorkbook("(inactive)");
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
                        result.Earned, result.Total);
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
        /// Async exit: cancel attach, end session, close workbook.
        /// Never blocks UI thread. Always completes.
        /// </summary>
        private async void HandleExitAsync(int pid)
        {
            if (_exiting) return;
            _exiting = true;

            var guid = _sessionId.ToString("N");
            var sessionId = _boundSessionId;
            _probe?.Write("training.exit.begin", guid, excelPid: pid);

            // 1. Cancel any in-flight attach/retry
            CancelAttach();

            // 2. Pane shows ending state immediately
            _paneControl.ShowEnding();

            // 3. Async end session (non-blocking, max 3s)
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

            // 4. Pane shows ended — workbook stays open, user closes it manually
            _paneControl.ShowEnded();
            _boundSessionId = null;
            _exiting = false;
            _verifying = 0;
        }

        private string GetWorkbookName()
        {
            try
            {
                Excel.Workbook wb = _excelApp.ActiveWorkbook;
                return wb != null ? wb.Name : "(no workbook)";
            }
            catch { return "(no workbook)"; }
        }

        private int GetWorkbookCount()
        {
            try { return _excelApp.Workbooks.Count; }
            catch { return 0; }
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
            this.Startup += new System.EventHandler(ThisAddIn_Startup);
            this.Shutdown += new System.EventHandler(ThisAddIn_Shutdown);
        }
        #endregion
    }
}
