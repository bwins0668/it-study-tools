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
            _probe?.Write("excel.window.activate", _sessionId.ToString("N"),
                excelPid: Process.GetCurrentProcess().Id,
                workbookCount: GetWorkbookCount());
        }

        private void OnWorkbookDeactivate(Excel.Workbook wb)
        {
            _paneControl.UpdateWorkbook("(inactive)");
        }

        private void OnWorkbookOpen(Excel.Workbook wb)
        {
            try { Debug.WriteLine("Workbook opened: " + wb.Name); } catch { }
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
