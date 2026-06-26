using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Text;

namespace StudyTools.Mos365ExamHost
{
    public class RuntimeProbe
    {
        private readonly string _logDir;
        private readonly object _lock = new object();
        private bool _initialized;

        public RuntimeProbe()
        {
            try
            {
                _logDir = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    "Coco", "VSTO-Gate-R3", "runtime-logs");
                Directory.CreateDirectory(_logDir);
                _initialized = true;
            }
            catch (Exception ex)
            {
                Debug.WriteLine("RuntimeProbe init error: " + ex.Message);
            }
        }

        public void Write(string eventName, string sessionGuid = null,
            int? excelPid = null, string paneTitle = null,
            string dockPosition = null, bool? paneVisible = null,
            int? workbookCount = null, string exceptionType = null,
            string exceptionMessage = null)
        {
            if (!_initialized) return;

            try
            {
                var asm = Assembly.GetExecutingAssembly();
                var asmName = asm.GetName();
                var sb = new StringBuilder();
                sb.Append("{\"timestamp\":\"");
                sb.Append(DateTime.UtcNow.ToString("o"));
                sb.Append("\",\"event\":\"");
                sb.Append(EscapeJson(eventName ?? ""));
                sb.Append("\",\"excelPid\":");
                sb.Append(excelPid.HasValue ? excelPid.Value.ToString() : "null");
                sb.Append(",\"sessionGuid\":");
                sb.Append(sessionGuid != null ? "\"" + EscapeJson(sessionGuid) + "\"" : "null");
                sb.Append(",\"processStartTimeUtc\":\"");
                sb.Append(EscapeJson(Process.GetCurrentProcess().StartTime.ToUniversalTime().ToString("o")));
                sb.Append("\",\"assemblyName\":\"");
                sb.Append(EscapeJson(asmName.Name));
                sb.Append("\",\"assemblyVersion\":\"");
                sb.Append(EscapeJson(asmName.Version.ToString()));
                sb.Append("\",\"assemblyLocation\":\"");
                sb.Append(EscapeJson(asm.Location));
                sb.Append("\",\"assemblyMvid\":\"");
                sb.Append(EscapeJson(asm.ManifestModule.ModuleVersionId.ToString()));
                sb.Append("\",\"workbookCount\":");
                sb.Append(workbookCount.HasValue ? workbookCount.Value.ToString() : "null");
                sb.Append(",\"paneTitle\":");
                sb.Append(paneTitle != null ? "\"" + EscapeJson(paneTitle) + "\"" : "null");
                sb.Append(",\"dockPosition\":");
                sb.Append(dockPosition != null ? "\"" + EscapeJson(dockPosition) + "\"" : "null");
                sb.Append(",\"paneVisible\":");
                sb.Append(paneVisible.HasValue ? (paneVisible.Value ? "true" : "false") : "null");
                sb.Append(",\"exceptionType\":");
                sb.Append(exceptionType != null ? "\"" + EscapeJson(exceptionType) + "\"" : "null");
                sb.Append(",\"exceptionMessage\":");
                sb.Append(exceptionMessage != null ? "\"" + EscapeJson(exceptionMessage) + "\"" : "null");
                sb.Append("}");

                string logFile = Path.Combine(_logDir, "runtime-probe.jsonl");
                lock (_lock)
                {
                    File.AppendAllText(logFile, sb.ToString() + Environment.NewLine, Encoding.UTF8);
                }

                Debug.WriteLine("[RuntimeProbe] " + eventName + ": " + (sessionGuid ?? "N/A"));
            }
            catch (Exception ex)
            {
                Debug.WriteLine("RuntimeProbe write error: " + ex.Message);
            }
        }

        private static string EscapeJson(string s)
        {
            if (string.IsNullOrEmpty(s)) return s;
            return s.Replace("\\", "\\\\").Replace("\"", "\\\"")
                    .Replace("\n", "\\n").Replace("\r", "\\r")
                    .Replace("\t", "\\t");
        }
    }
}
