@echo off
chcp 65001 >nul 2>&1
setlocal

:: ============================================================
::  Study Tools  —  一键启动
:: ============================================================

set "APP_DIR=%~dp0"
set "SERVER=%APP_DIR%server.py"

:: ---------- 1. 找 Python ----------
:: 优先使用随附的内嵌版 Python（免安装）
set "PYTHON="
if exist "%APP_DIR%python\python.exe" (
    set "PYTHON=%APP_DIR%python\python.exe"
    goto :found_python
)

:: 其次尝试系统 PATH 中的 Python
for %%P in (python.exe python3.exe) do (
    where %%P >nul 2>&1
    if not errorlevel 1 (
        set "PYTHON=%%P"
        goto :found_python
    )
)

:: 最后扫描常见安装路径
for %%D in (
    "%LOCALAPPDATA%\Programs\Python"
    "C:\Python312" "C:\Python311" "C:\Python310" "C:\Python39"
    "C:\Program Files\Python312" "C:\Program Files\Python311"
) do (
    if exist "%%~D\python.exe" (
        set "PYTHON=%%~D\python.exe"
        goto :found_python
    )
)

:: ---- 找不到 Python ----
echo.
echo  ╔══════════════════════════════════════════════╗
echo  ║  错误：未找到 Python 运行环境               ║
echo  ║                                              ║
echo  ║  请访问以下地址下载安装 Python 3.x：         ║
echo  ║  https://www.python.org/downloads/           ║
echo  ║                                              ║
echo  ║  安装时请勾选 "Add Python to PATH"           ║
echo  ╚══════════════════════════════════════════════╝
echo.
pause
exit /b 1

:found_python
:: ---------- 2. 选择端口 ----------
set "PORT=8765"

:: ---------- 3. 启动服务器 ----------
echo.
echo  正在启动 Study Tools 学习平台...
echo  Python: %PYTHON%
echo.

:: 用 pythonw 静默启动（无黑窗口），嵌入版用 python
set "PYTHONW=%~dp0python\pythonw.exe"
if not exist "%PYTHONW%" set "PYTHONW=%PYTHON%"

:: 后台启动 Python 服务器
start "" /B "%PYTHONW%" "%SERVER%" %PORT% --launcher

:: ---------- 4. 等待服务器就绪后打开浏览器 ----------
timeout /t 2 /nobreak >nul

:: 等待端口响应（最多10秒）
set /a "TRIES=0"
:wait_loop
set /a "TRIES+=1"
if %TRIES% GTR 20 goto :open_anyway
netstat -ano | findstr /C:":%PORT% " | findstr /I "LISTENING" >nul 2>&1
if errorlevel 1 (
    timeout /t 1 /nobreak >nul
    goto :wait_loop
)

:open_anyway
:: 尝试用 Chrome/Edge 无边框 App 模式打开（体验更好）
set "URL=http://127.0.0.1:%PORT%/index.html"
set "BROWSER_PROFILE=%APP_DIR%.study-tools-browser-profile"
if not exist "%BROWSER_PROFILE%" mkdir "%BROWSER_PROFILE%" >nul 2>&1
set "BROWSER_ARGS=--start-maximized --disable-extensions --disable-features=WebContentsForceDark,AutoDarkMode --disable-blink-features=AutoDarkMode --user-data-dir=%BROWSER_PROFILE%"
set "CHROME=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
set "EDGE86=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"

if exist "%CHROME%" (
    start "" "%CHROME%" %BROWSER_ARGS% "--app=%URL%"
    goto :done
)
if exist "%EDGE%" (
    start "" "%EDGE%" %BROWSER_ARGS% "--app=%URL%"
    goto :done
)
if exist "%EDGE86%" (
    start "" "%EDGE86%" %BROWSER_ARGS% "--app=%URL%"
    goto :done
)

:: 使用默认浏览器
start "" "%URL%"

:done
echo  已在浏览器中打开：%URL%
echo  关闭此窗口将停止服务器。
echo.
echo  按任意键退出（同时停止服务器）...
pause >nul

:: ---------- 5. 关闭服务器 ----------
taskkill /F /FI "IMAGENAME eq python.exe" /FI "WINDOWTITLE eq*server.py*" >nul 2>&1
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":%PORT% " ^| findstr "LISTENING"') do (
    taskkill /F /PID %%P >nul 2>&1
)

endlocal
exit /b 0
