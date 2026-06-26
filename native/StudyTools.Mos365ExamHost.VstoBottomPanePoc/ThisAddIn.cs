using System;
using System.Diagnostics;
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
        private bool _verifying;

        private void ThisAddIn_Startup(object sender, System.EventArgs e)
        {
            _sessionId = Guid.NewGuid();
            _probe = new RuntimeProbe();
            _probe.Write("startup.begin", _sessionId.ToString("N"),
                excelPid: Process.GetCurrentProcess().Id);

            try
            {
                _excelApp = this.Application;

                _paneControl = new ExamHostPaneControl();
                _paneControl.UpdateSession(_sessionId, Process.GetCurrentProcess().Id);

                _probe.Write("control.handle.created", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id);

                _pane = this.CustomTaskPanes.Add(
                    _paneControl,
                    "MOS Native Exam Host · R3 VSTO POC");

                _probe.Write("pane.created", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id,
                    paneTitle: "MOS Native Exam Host · R3 VSTO POC",
                    dockPosition: "Bottom");

                _pane.DockPosition = Office.MsoCTPDockPosition.msoCTPDockPositionBottom;
                _pane.Height = 140;
                _pane.Visible = true;

                _probe.Write("pane.visible", _sessionId.ToString("N"),
                    excelPid: Process.GetCurrentProcess().Id,
                    paneTitle: "MOS Native Exam Host · R3 VSTO POC",
                    dockPosition: "Bottom",
                    paneVisible: true);

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
                    exceptionType: ex.GetType().Name,
                    exceptionMessage: ex.Message);
                Debug.WriteLine("VSTO POC startup error: " + ex.Message);
            }
        }

        private void ThisAddIn_Shutdown(object sender, System.EventArgs e)
        {
            _probe?.Write("shutdown.begin", _sessionId.ToString("N"),
                excelPid: Process.GetCurrentProcess().Id);
            try
            {
                if (_excelApp != null)
                {
                    _excelApp.WorkbookActivate -= OnWorkbookActivate;
                    _excelApp.WorkbookDeactivate -= OnWorkbookDeactivate;
                    _excelApp.WorkbookOpen -= OnWorkbookOpen;
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
            try { _paneControl.UpdateWorkbook(wb.Name); } catch { _paneControl.UpdateWorkbook("(unknown)"); }
            TryBindWorkbook(wb);
            _probe?.Write("excel.window.activate", _sessionId.ToString("N"),
                excelPid: Process.GetCurrentProcess().Id,
                workbookCount: GetWorkbookCount());
        }

        private void OnWorkbookOpen(Excel.Workbook wb)
        {
            try { Debug.WriteLine("Workbook opened: " + wb.Name); } catch { }
            TryBindWorkbook(wb);
        }

        private void TryBindWorkbook(Excel.Workbook wb)
        {
            if (_verifying || wb == null) return;
            _verifying = true;
            var pid = Process.GetCurrentProcess().Id;
            var guid = _sessionId.ToString("N");
            try
            {
                string path = null;
                try { path = wb.FullName; } catch { }

                if (string.IsNullOrEmpty(path))
                {
                    _probe?.Write("session.verify.begin", guid, excelPid: pid);
                    _probe?.Write("session.verify.rejected", guid, excelPid: pid);
                    _paneControl.UpdateSessionState("未绑定");
                    _boundSessionId = null;
                    return;
                }

                _probe?.Write("session.verify.begin", guid, excelPid: pid);
                var result = _bridge.VerifyWorkbook(path, pid);

                if (result.Ok)
                {
                    _probe?.Write("session.verify.accepted", guid, excelPid: pid);
                    _probe?.Write("session.bound", result.SessionId, excelPid: pid);
                    _boundSessionId = result.SessionId;
                    _paneControl.UpdateSessionState("已验证", result.SessionId, result.ExcelPid ?? pid);
                    // R8 training: show task if available
                    if (!string.IsNullOrEmpty(result.TaskId))
                    {
                        _probe?.Write("training.task.received", _sessionId.ToString("N"), excelPid: pid);
                        _paneControl.ShowTask(result.InstructionJa, result.InstructionZh);
                        if (result.CompletionAcknowledged)
                            _paneControl.ShowCompletionAccepted();
                        // Wire completion button
                        _paneControl.OnCompleteClicked = () => HandleCompletion(pid);
                    }
                }
                else
                {
                    _probe?.Write("session.verify.rejected", guid, excelPid: pid);
                    _boundSessionId = null;
                    _paneControl.UpdateSessionState(result.ErrorCode ?? "验证失败");
                }
            }
            catch (Exception ex)
            {
                _probe?.Write("session.http_failed", guid, excelPid: pid);
                _paneControl.UpdateSessionState("HTTP失败");
                Debug.WriteLine("SessionBridge error: " + ex.Message);
            }
            finally
            {
                _verifying = false;
            }
        }

        private void OnWorkbookDeactivate(Excel.Workbook wb)
        {
            _paneControl.UpdateWorkbook("(inactive)");
        }

        private void HandleCompletion(int pid)
        {
            var guid = _sessionId.ToString("N");
            _probe?.Write("training.complete.begin", guid, excelPid: pid);
            try
            {
                var result = _bridge.SendCompletion(_boundSessionId, pid);
                if (result.Ok)
                {
                    _probe?.Write("training.complete.accepted", guid, excelPid: pid);
                    _paneControl.ShowCompletionAccepted();
                }
                else
                {
                    _probe?.Write("training.complete.rejected", guid, excelPid: pid);
                }
            }
            catch (Exception ex)
            {
                _probe?.Write("training.complete.http_failed", guid, excelPid: pid);
                Debug.WriteLine("Completion failed: " + ex.Message);
            }
        }

        private string GetWorkbookName()
        {
            try { Excel.Workbook wb = _excelApp.ActiveWorkbook; return wb != null ? wb.Name : "(no workbook)"; }
            catch { return "(no workbook)"; }
        }

        private int GetWorkbookCount()
        {
            try { return _excelApp.Workbooks.Count; }
            catch { return 0; }
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
