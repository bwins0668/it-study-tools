# check_local_runtimes.ps1 — Windows 本地运行环境探测脚本
# Round 87.0 deliverable: 探测 Java/Python 本地运行环境状态

Write-Host "=== Java/Python 本地运行环境探测 ===" -ForegroundColor Cyan
Write-Host ""

# 1. Check Java
Write-Host "--- 1. Java 运行环境 ---" -ForegroundColor Yellow
$javaFound = $false
$javaVersion = ""

try {
  $javaVersion = & java -version 2>&1 | Select-String "version"
  if ($javaVersion) {
    Write-Host "  [OK] Java found: $javaVersion" -ForegroundColor Green
    $javaFound = $true
  }
} catch {
  Write-Host "  [FAIL] Java not found in PATH" -ForegroundColor Red
}

try {
  $javacVersion = & javac -version 2>&1
  if ($javacVersion) {
    Write-Host "  [OK] javac found: $javacVersion" -ForegroundColor Green
  }
} catch {
  Write-Host "  [WARN] javac not found (may impact compilation)" -ForegroundColor Yellow
}

# Check for bundled JDK in project dir
$bundledJdk = Get-ChildItem -Path "." -Filter "jdk*" -Directory -ErrorAction SilentlyContinue | Select-Object -First 1
if ($bundledJdk) {
  Write-Host "  [INFO] Bundled JDK found: $($bundledJdk.FullName)" -ForegroundColor Cyan
}

# 2. Check Python
Write-Host ""
Write-Host "--- 2. Python 运行环境 ---" -ForegroundColor Yellow
$pythonFound = $false
$pythonVersion = ""

try {
  $pythonVersion = & python --version 2>&1
  if ($pythonVersion) {
    Write-Host "  [OK] Python found: $pythonVersion" -ForegroundColor Green
    $pythonFound = $true
  }
} catch {
  try {
    $pythonVersion = & py --version 2>&1
    if ($pythonVersion) {
      Write-Host "  [OK] Python (py launcher) found: $pythonVersion" -ForegroundColor Green
      $pythonFound = $true
    }
  } catch {
    Write-Host "  [FAIL] Python not found in PATH" -ForegroundColor Red
  }
}

# Check for bundled Python in project dir
$bundledPython = Get-ChildItem -Path "." -Filter "python*" -Directory -ErrorAction SilentlyContinue | Select-Object -First 1
if ($bundledPython) {
  Write-Host "  [INFO] Bundled Python found: $($bundledPython.FullName)" -ForegroundColor Cyan
}

# 3. Check local server
Write-Host ""
Write-Host "--- 3. 本地服务器状态 ---" -ForegroundColor Yellow

$serverPy = Get-ChildItem -Path "." -Filter "server.py" -ErrorAction SilentlyContinue
if ($serverPy) {
  Write-Host "  [INFO] server.py found: $($serverPy.FullName)" -ForegroundColor Cyan
  
  # Check if server is running
  $running = Get-Process -Name "python" -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -like "*server*" }
  if ($running) {
    Write-Host "  [OK] Python server might be running" -ForegroundColor Green
  } else {
    Write-Host "  [WARN] Python server not detected as running process" -ForegroundColor Yellow
  }
} else {
  Write-Host "  [WARN] server.py not found in project root" -ForegroundColor Yellow
}

# 4. Check port 8000 or common dev ports
Write-Host ""
Write-Host "--- 4. 端口检测 ---" -ForegroundColor Yellow

$ports = @(8000, 5000, 3000, 8080)
foreach ($port in $ports) {
  $tcpClient = New-Object System.Net.Sockets.TcpClient
  try {
    $tcpClient.Connect("127.0.0.1", $port)
    Write-Host "  [OK] Port $port is open (local server might be running)" -ForegroundColor Green
    $tcpClient.Close()
  } catch {
    # Port is closed, ignore
  }
}

# 5. Summary
Write-Host ""
Write-Host "=== 总结 ===" -ForegroundColor Cyan
if ($javaFound) {
  Write-Host "  Java: 可用" -ForegroundColor Green
} else {
  Write-Host "  Java: 不可用 — 请安装 JDK 或启动本地服务器" -ForegroundColor Red
}
if ($pythonFound) {
  Write-Host "  Python: 可用" -ForegroundColor Green
} else {
  Write-Host "  Python: 不可用 — 请安装 Python 或启动本地服务器" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== 建议 ===" -ForegroundColor Cyan
Write-Host "1. 如果使用 Windows 完整版，请确保 server.py 正在运行"
Write-Host "2. 如果使用 Web 公开版，请确保本地 API 服务器正在运行"
Write-Host "3. 访问 http://127.0.0.1:PORT 来使用本地运行功能"
Write-Host ""
