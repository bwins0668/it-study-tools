using System;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Windows.Forms;
using System.Text;
using System.Runtime.InteropServices;
using System.Reflection;

[assembly: AssemblyTitle("Study Tools")]
[assembly: AssemblyDescription("Desktop App Launcher for Study Tools learning platform")]
[assembly: AssemblyConfiguration("")]
[assembly: AssemblyCompany("Study Tools Open Source Team")]
[assembly: AssemblyProduct("Study Tools")]
[assembly: AssemblyCopyright("Copyright © 2026 Coco")]
[assembly: AssemblyTrademark("")]
[assembly: AssemblyCulture("")]
[assembly: AssemblyVersion("0.1.0.0")]
[assembly: AssemblyFileVersion("0.1.0.0")]
[assembly: ComVisible(false)]

namespace StudyToolsLauncher
{
    static class Program
    {
        private static Process pythonProcess = null;
        private static int serverPort = 8765;

        // Find Python executable
        private static string FindPython()
        {
            // 0. Check local embedded Python first
            try
            {
                string appDir = AppDomain.CurrentDomain.BaseDirectory;
                string localPython = Path.Combine(appDir, @"python\python.exe");
                if (File.Exists(localPython)) return localPython;
            }
            catch { }

            // 1. Check PATH
            foreach (string pathDir in (Environment.GetEnvironmentVariable("PATH") ?? "").Split(';'))
            {
                if (string.IsNullOrEmpty(pathDir)) continue;
                try
                {
                    string candidate = Path.Combine(pathDir.Trim(), "python.exe");
                    if (File.Exists(candidate)) return candidate;
                }
                catch { }
            }

            // 2. Check default Windows installation folder: AppData\Local\Programs\Python\PythonXX\python.exe
            try
            {
                string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
                string programsPythonDir = Path.Combine(localAppData, @"Programs\Python");
                if (Directory.Exists(programsPythonDir))
                {
                    foreach (string subDir in Directory.GetDirectories(programsPythonDir))
                    {
                        string candidate = Path.Combine(subDir, "python.exe");
                        if (File.Exists(candidate)) return candidate;
                    }
                }
            }
            catch { }

            // 3. Check WindowsApps folder (Microsoft Store version)
            try
            {
                string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
                string storePython = Path.Combine(localAppData, @"Microsoft\WindowsApps\python.exe");
                if (File.Exists(storePython)) return storePython;
            }
            catch { }

            // 4. Check C:\PythonXX and Program Files root locations
            string[] roots = new string[] { @"C:\", @"C:\Program Files\", @"C:\Program Files (x86)\" };
            foreach (string root in roots)
            {
                try
                {
                    if (!Directory.Exists(root)) continue;
                    foreach (string dir in Directory.GetDirectories(root, "Python*"))
                    {
                        string candidate = Path.Combine(dir, "python.exe");
                        if (File.Exists(candidate)) return candidate;
                    }
                }
                catch { }
            }

            return null;
        }

        // Get a free port by trying to bind a TcpListener
        private static int GetFreePort()
        {
            try
            {
                var listener = new System.Net.Sockets.TcpListener(System.Net.IPAddress.Loopback, 0);
                listener.Start();
                int port = ((System.Net.IPEndPoint)listener.LocalEndpoint).Port;
                listener.Stop();
                return port;
            }
            catch
            {
                return 8765;
            }
        }

        // Try to open browser after port is ready
        private static void WaitAndOpenBrowser(int port, string appDir)
        {
            string url = "http://127.0.0.1:" + port + "/index.html";

            // Wait up to 8 seconds for server to start
            for (int i = 0; i < 40; i++)
            {
                Thread.Sleep(200);
                try
                {
                    var req = (System.Net.HttpWebRequest)System.Net.WebRequest.Create("http://127.0.0.1:" + port + "/");
                    req.Timeout = 500;
                    req.Method = "HEAD";
                    using (var resp = (System.Net.HttpWebResponse)req.GetResponse())
                    {
                        if ((int)resp.StatusCode < 500) break;
                    }
                }
                catch { }
            }

            string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            string programFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
            string programFilesX86 = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86);

            string[] browserPaths = new string[]
            {
                Path.Combine(localAppData, @"Google\Chrome\Application\chrome.exe"),
                Path.Combine(programFiles, @"Google\Chrome\Application\chrome.exe"),
                Path.Combine(programFilesX86, @"Google\Chrome\Application\chrome.exe"),
                Path.Combine(programFiles, @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(programFilesX86, @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(localAppData, @"Microsoft\Edge\Application\msedge.exe")
            };

            string chosenBrowser = null;
            foreach (string path in browserPaths)
            {
                if (File.Exists(path)) { chosenBrowser = path; break; }
            }

            try
            {
                ProcessStartInfo psi = new ProcessStartInfo();
                psi.WindowStyle = ProcessWindowStyle.Maximized;
                string browserProfileDir = Path.Combine(appDir, ".study-tools-browser-profile");
                try
                {
                    if (!Directory.Exists(browserProfileDir)) Directory.CreateDirectory(browserProfileDir);
                }
                catch { }

                if (chosenBrowser != null)
                {
                    psi.FileName = chosenBrowser;
                    psi.Arguments =
                        "--start-maximized " +
                        "--disable-extensions " +
                        "--disable-features=WebContentsForceDark,AutoDarkMode " +
                        "--disable-blink-features=AutoDarkMode " +
                        "--user-data-dir=\"" + browserProfileDir + "\" " +
                        "--app=\"" + url + "\"";
                    psi.UseShellExecute = true;
                }
                else
                {
                    psi.FileName = url;
                    psi.UseShellExecute = true;
                }
                Process.Start(psi);
            }
            catch (Exception ex)
            {
                MessageBox.Show("ブラウザを開けませんでした:\n" + ex.Message + "\n\n手動でアクセス: " + url,
                    "Study Tools", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
        }

        [STAThread]
        static void Main()
        {
            string appDir = AppDomain.CurrentDomain.BaseDirectory;
            string indexPath = Path.Combine(appDir, "index.html");
            string serverScript = Path.Combine(appDir, "server.py");

            if (!File.Exists(indexPath))
            {
                MessageBox.Show("错误：找不到 index.html！\n请确保 exe 与网页文件在同一文件夹。",
                    "Study Tools", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            if (!File.Exists(serverScript))
            {
                MessageBox.Show("错误：找不到 server.py！\n请确保 server.py 与 exe 在同一文件夹。",
                    "Study Tools", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            string pythonExe = FindPython();
            if (pythonExe == null)
            {
                MessageBox.Show(
                    "找不到 Python！\n\n请安装 Python 3.x：\nhttps://www.python.org/downloads/\n\n安装时请勾选 'Add Python to PATH'",
                    "Study Tools — 需要 Python", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            // Find a free port
            serverPort = GetFreePort();

            // Start the Python server
            try
            {
                ProcessStartInfo psi = new ProcessStartInfo();
                psi.FileName = pythonExe;
                psi.Arguments = "\"" + serverScript + "\" " + serverPort + " --launcher";
                psi.WorkingDirectory = appDir;
                psi.UseShellExecute = false;
                psi.CreateNoWindow = true;
                psi.RedirectStandardOutput = true;
                psi.RedirectStandardError = true;
                psi.StandardOutputEncoding = Encoding.UTF8;
                psi.StandardErrorEncoding = Encoding.UTF8;

                pythonProcess = Process.Start(psi);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Python 运行环境启动异常:\n" + ex.Message,
                    "Study Tools 启动失败", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            // Wait a short duration to verify if Python crashes on startup
            Thread.Sleep(1500);
            if (pythonProcess.HasExited)
            {
                string errVal = pythonProcess.StandardError.ReadToEnd();
                string outVal = pythonProcess.StandardOutput.ReadToEnd();
                int code = pythonProcess.ExitCode;

                StringBuilder sb = new StringBuilder();
                sb.AppendLine("Python 后端服务进程意外退出！这可能是由于端口冲突、安全拦截或环境文件缺失导致。");
                sb.AppendLine("退出代码 (Exit Code): " + code);
                sb.AppendLine();
                sb.AppendLine("【错误堆栈 (Stderr)】:");
                sb.AppendLine(string.IsNullOrEmpty(errVal) ? "(空)" : errVal);
                sb.AppendLine();
                sb.AppendLine("【标准输出 (Stdout)】:");
                sb.AppendLine(string.IsNullOrEmpty(outVal) ? "(空)" : outVal);

                MessageBox.Show(sb.ToString(), "Study Tools 启动失败", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            // Start background threads to continuously consume stdout/stderr streams to prevent process hang
            Thread outReader = new Thread(() => {
                try { while (!pythonProcess.StandardOutput.EndOfStream) pythonProcess.StandardOutput.ReadLine(); } catch {}
            });
            outReader.IsBackground = true;
            outReader.Start();

            Thread errReader = new Thread(() => {
                try { while (!pythonProcess.StandardError.EndOfStream) pythonProcess.StandardError.ReadLine(); } catch {}
            });
            errReader.IsBackground = true;
            errReader.Start();

            // Open browser (waits for server to be ready)
            Thread browserThread = new Thread(() => WaitAndOpenBrowser(serverPort, appDir));
            browserThread.IsBackground = true;
            browserThread.Start();

            // Register cleanup on exit
            Application.ApplicationExit += (s, e) =>
            {
                try
                {
                    if (pythonProcess != null && !pythonProcess.HasExited)
                        pythonProcess.Kill();
                }
                catch { }
            };

            // Keep the launcher process alive as long as Python server is running
            while (pythonProcess != null && !pythonProcess.HasExited)
            {
                Thread.Sleep(2000);
            }
        }
    }
}
