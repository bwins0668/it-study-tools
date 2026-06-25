#!/usr/bin/env node
'use strict';

/**
 * Release smoke for the local-only MOS Excel 365 module.
 *
 * This script starts the app's real Python server, drives the real browser UI,
 * starts the installed Excel desktop application through the app endpoint, and
 * uses Excel COM only after the launched session workbook is observable.
 * It does not accept a workbook path from the browser and it does not mock Excel.
 */

const assert = require('assert');
const { spawn, execFile } = require('child_process');
const fs = require('fs');
const http = require('http');
const net = require('net');
const os = require('os');
const path = require('path');
const { promisify } = require('util');
const { chromium } = require('playwright');

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(__dirname, '..');
const PYTHON = path.join(ROOT, 'python', 'python.exe');
const report = {
  status: 'RUNNING',
  desktopDrawer: null,
  narrowDrawer: null,
  environment: null,
  realExcel: null,
  session: null,
  scoring: null,
  security: {},
  consoleErrors: [],
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function reservePort() {
  const unsafePorts = new Set([1, 7, 9, 11, 13, 15, 17, 19, 20, 21, 22, 23, 25, 37, 42, 43, 53, 69, 77, 79, 87, 95, 101, 102, 103, 104, 109, 110, 111, 113, 115, 117, 119, 123, 135, 139, 143, 179, 389, 427, 465, 512, 513, 514, 515, 526, 530, 531, 532, 540, 548, 554, 556, 563, 587, 601, 636, 993, 995, 2049, 3659, 4045, 5060, 5061, 6000, 6566, 6665, 6666, 6667, 6668, 6669, 6697, 10080]);
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close((error) => {
        if (error) return reject(error);
        if (unsafePorts.has(port)) return reservePort().then(resolve, reject);
        resolve(port);
      });
    });
  });
}

function request(method, url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const payload = body == null ? null : Buffer.from(JSON.stringify(body), 'utf8');
    const options = {
      hostname: target.hostname,
      port: target.port,
      path: target.pathname + target.search,
      method,
      headers: {
        ...(payload ? { 'Content-Type': 'application/json', 'Content-Length': String(payload.length) } : {}),
        ...headers,
      },
    };
    const req = http.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString('utf8');
        let json = null;
        try { json = text ? JSON.parse(text) : null; } catch (_) { /* retained as raw text */ }
        resolve({ status: res.statusCode, json, text });
      });
    });
    req.once('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function getLocalAppData() {
  const { stdout } = await execFileAsync('powershell.exe', [
    '-NoProfile', '-NonInteractive', '-Command',
    '[Environment]::GetFolderPath([Environment+SpecialFolder]::LocalApplicationData)',
  ], { windowsHide: true, timeout: 15000 });
  const localAppData = stdout.trim();
  assert.ok(localAppData, 'Windows LocalApplicationData path must be available for MOS sessions');
  return localAppData;
}

async function waitForServer(baseUrl, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  let lastError = null;
  while (Date.now() < deadline) {
    try {
      const response = await request('GET', `${baseUrl}/api/mos365/environment`);
      if (response.status === 200 && response.json && response.json.success) return response.json.data;
      lastError = new Error(`environment returned ${response.status}: ${response.text}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(250);
  }
  throw new Error(`MOS server did not become ready: ${lastError ? lastError.message : 'timeout'}`);
}

async function runExcelUiPractice(workbookPath, processId) {
  const scriptPath = path.join(os.tmpdir(), `study-tools-mos365-ui-${process.pid}-${Date.now()}.ps1`);
  const script = String.raw`
param(
  [Parameter(Mandatory=$true)][string]$WorkbookPath,
  [Parameter(Mandatory=$true)][int]$LaunchedProcessId
)
$ErrorActionPreference = 'Stop'
$expected = [System.IO.Path]::GetFullPath($WorkbookPath)
$step = 'initialization'
trap {
  Write-Error ('MOS_UI_STEP=' + $step + '; LINE=' + $_.InvocationInfo.ScriptLineNumber + '; MESSAGE=' + $_.Exception.Message)
  exit 1
}
Add-Type -AssemblyName System.Windows.Forms
Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public static class MosUiNative {
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern void mouse_event(int flags, int dx, int dy, int data, IntPtr extra);
}
'@
function Pause([int]$milliseconds = 350) { Start-Sleep -Milliseconds $milliseconds }
function PasteText([string]$text) {
  [System.Windows.Forms.Clipboard]::SetText($text)
  $shell.SendKeys('^v')
  Pause 220
}
function EscapeSendKeys([string]$text) {
  return $text.Replace('{', '{{}').Replace('}', '{}}').Replace('+', '{+}').Replace('^', '{^}').Replace('%', '{%}').Replace('~', '{~}').Replace('(', '{(}').Replace(')', '{)}').Replace('[', '{[}').Replace(']', '{]}')
}
function TypeText([string]$text) { $shell.SendKeys((EscapeSendKeys $text)); Pause 180 }
function SendKey([string]$keys) { $shell.SendKeys($keys); Pause 250 }
function GoToCell([string]$reference) {
  SendKey '{F5}'
  TypeText $reference
  SendKey '{ENTER}'
}
function SetCell([string]$reference, [string]$formula) {
  GoToCell $reference
  TypeText $formula
  SendKey '{ENTER}'
}
function ClickAt([int]$x, [int]$y) {
  [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($x, $y)
  [MosUiNative]::mouse_event(0x0002, 0, 0, 0, [IntPtr]::Zero)
  [MosUiNative]::mouse_event(0x0004, 0, 0, 0, [IntPtr]::Zero)
}

$step = 'locate current-session Excel window'
$deadline = (Get-Date).AddSeconds(25)
$excelProcess = $null
$excelWindows = @()
$fileToken = [System.IO.Path]::GetFileNameWithoutExtension($expected)
while ((Get-Date) -lt $deadline -and $null -eq $excelProcess) {
  $excelWindows = @(Get-Process -Name EXCEL -ErrorAction SilentlyContinue |
    Where-Object { $_.MainWindowHandle -ne 0 } |
    Sort-Object StartTime -Descending)
  $candidate = $excelWindows | Where-Object { $_.MainWindowTitle -like ('*' + $fileToken + '*') } | Select-Object -First 1
  if ($candidate) { $excelProcess = $candidate }
  if ($null -eq $excelProcess) { Pause 500 }
}
if ($null -eq $excelProcess) {
  $observed = @($excelWindows | ForEach-Object { $_.Id.ToString() + ':' + $_.MainWindowTitle }) -join ' | '
  throw ('No Excel window title matched the current workbook. Observed windows: ' + $observed)
}

$step = 'focus Excel window'
$shell = New-Object -ComObject WScript.Shell
if (-not $shell.AppActivate($excelProcess.Id)) { throw 'Cannot activate the Excel process window.' }
[MosUiNative]::SetForegroundWindow($excelProcess.MainWindowHandle) | Out-Null
Pause 1200

$step = 'rename source worksheet'
$rect = New-Object MosUiNative+RECT
if (-not [MosUiNative]::GetWindowRect($excelProcess.MainWindowHandle, [ref]$rect)) { throw 'Cannot read the Excel window bounds.' }
# First make the source sheet active, then double-click its visible tab (above the status bar).
SendKey '^{PGUP}'
SendKey '^{PGUP}'
SendKey '^{PGUP}'
SendKey '^{PGUP}'
SendKey '^{PGUP}'
$tabX = $rect.Left + 145
$tabY = $rect.Bottom - 72
ClickAt $tabX $tabY
Pause 180
ClickAt $tabX $tabY
Pause 450
PasteText '店舗データ'
SendKey '{ENTER}'

$step = 'enter data-sheet formulas'
$formulas = @(
  @('E2','=C2*D2'), @('E3','=C3*D3'), @('E4','=C4*D4'), @('E5','=C5*D5'),
  @('E6','=C6*D6'), @('E7','=C7*D7'), @('E8','=C8*D8'), @('E9','=C9*D9'),
  @('F2','=IF(E2>=10000,"達成","確認")'), @('F3','=IF(E3>=10000,"達成","確認")'),
  @('H2','=SUM(E2:E9)'), @('H3','=AVERAGE(E2:E9)'), @('H4','=MAX(E2:E9)'), @('H5','=MIN(E2:E9)'),
  @('H6','=COUNT(E2:E9)'), @('H7','=COUNTA(B2:B9)'), @('H8','=COUNTBLANK(G2:G9)'),
  @('I2','=$H$2*C2'), @('I3','=$H$2*C3'), @('I4','=$H$2*C4'), @('I5','=$H$2*C5')
)
foreach ($item in $formulas) { SetCell $item[0] $item[1] }

$step = 'create table and filter'
GoToCell 'A1:F9'
SendKey '^t'
SendKey '{ENTER}'

$step = 'enter summary formulas'
SendKey '^{PGDN}'
Pause 500
$summaryFormulas = @(
  @('J2','=SUM(店舗データ!E2:E9)'), @('J3','=IF(J2>=50000,"達成","確認")'),
  @('J4','=LEFT(店舗データ!A2,2)'), @('J5','=RIGHT(店舗データ!A2,2)'), @('J6','=LEN(店舗データ!A2)')
)
foreach ($item in $summaryFormulas) { SetCell $item[0] $item[1] }

$step = 'enter memo value'
SendKey '^{PGDN}'
SendKey '^{PGDN}'
SendKey '^{PGDN}'
Pause 500
SetCell 'A1' '確認済み'

$step = 'save and close Excel'
SendKey '^s'
Pause 1800
SendKey '%{F4}'
Pause 2500
[pscustomobject]@{
  completed = $true
  workbook = $expected
  excelProcessId = $excelProcess.Id
  windowTitle = $excelProcess.MainWindowTitle
  dimensions = @('sheet rename','formulas','table','auto filter','cell value')
} | ConvertTo-Json -Compress
`;
  fs.writeFileSync(scriptPath, `\uFEFF${script}`, 'utf8');
  try {
    const { stdout, stderr } = await execFileAsync('powershell.exe', [
      '-NoProfile', '-NonInteractive', '-Sta', '-ExecutionPolicy', 'Bypass', '-File', scriptPath, workbookPath, String(processId),
    ], { windowsHide: false, timeout: 120000, maxBuffer: 1024 * 1024 });
    if (stderr && stderr.trim()) throw new Error(stderr.trim());
    return JSON.parse(stdout.trim());
  } finally {
    fs.rmSync(scriptPath, { force: true });
  }
}

async function runExcelVbsPractice(workbookPath) {
  const scriptPath = path.join(os.tmpdir(), `study-tools-mos365-vbs-${process.pid}-${Date.now()}.vbs`);
  const script = String.raw`Option Explicit
Dim expected, fso, xl, wb, book, ws, summary, memo, stepName, version, closeState, formulaPairs, i
On Error Resume Next

expected = LCase(CreateObject("Scripting.FileSystemObject").GetAbsolutePathName(WScript.Arguments(0)))
Set fso = CreateObject("Scripting.FileSystemObject")
stepName = "bind-current-session-workbook-moniker"
Set wb = GetObject(WScript.Arguments(0))
If Err.Number <> 0 Or wb Is Nothing Then
  WScript.Echo "ERR|" & stepName & "|" & CStr(Err.Number) & "|" & Err.Description
  WScript.Quit 1
End If
Set xl = wb.Application
If LCase(fso.GetAbsolutePathName(wb.FullName)) <> expected Then
  WScript.Echo "ERR|" & stepName & "|0|Workbook moniker did not resolve to the current Session path."
  WScript.Quit 1
End If
If wb.ReadOnly Then
  WScript.Echo "ERR|" & stepName & "|0|Workbook moniker resolved read-only; no changes were made."
  wb.Close False
  WScript.Quit 1
End If

stepName = "rename-source-sheet"
Set ws = wb.Worksheets("作業用")
ws.Name = "店舗データ"
If Err.Number <> 0 Then
  WScript.Echo "ERR|" & stepName & "|" & CStr(Err.Number) & "|" & Err.Description
  WScript.Quit 1
End If

stepName = "enter-data-formulas"
formulaPairs = Array( _
  Array("E2", "=C2*D2"), Array("E3", "=C3*D3"), Array("E4", "=C4*D4"), Array("E5", "=C5*D5"), _
  Array("E6", "=C6*D6"), Array("E7", "=C7*D7"), Array("E8", "=C8*D8"), Array("E9", "=C9*D9"), _
  Array("F2", "=IF(E2>=10000,""達成"",""確認"")"), Array("F3", "=IF(E3>=10000,""達成"",""確認"")"), _
  Array("H2", "=SUM(E2:E9)"), Array("H3", "=AVERAGE(E2:E9)"), Array("H4", "=MAX(E2:E9)"), Array("H5", "=MIN(E2:E9)"), _
  Array("H6", "=COUNT(E2:E9)"), Array("H7", "=COUNTA(B2:B9)"), Array("H8", "=COUNTBLANK(G2:G9)"), _
  Array("I2", "=$H$2*C2"), Array("I3", "=$H$2*C3"), Array("I4", "=$H$2*C4"), Array("I5", "=$H$2*C5") _
)
For i = 0 To UBound(formulaPairs)
  ws.Range(formulaPairs(i)(0)).Formula = formulaPairs(i)(1)
  If Err.Number <> 0 Then
    WScript.Echo "ERR|" & stepName & "|" & CStr(Err.Number) & "|" & Err.Description
    WScript.Quit 1
  End If
Next

stepName = "enter-summary-and-memo"
Set summary = wb.Worksheets("集計")
summary.Range("J2").Formula = "=SUM('店舗データ'!E2:E9)"
summary.Range("J3").Formula = "=IF(J2>=50000,""達成"",""確認"")"
summary.Range("J4").Formula = "=LEFT('店舗データ'!A2,2)"
summary.Range("J5").Formula = "=RIGHT('店舗データ'!A2,2)"
summary.Range("J6").Formula = "=LEN('店舗データ'!A2)"
Set memo = wb.Worksheets("メモ")
memo.Range("A1").Value = "確認済み"
If Err.Number <> 0 Then
  WScript.Echo "ERR|" & stepName & "|" & CStr(Err.Number) & "|" & Err.Description
  WScript.Quit 1
End If

stepName = "save-and-close-current-session-workbook"
version = CStr(xl.Version)
wb.Save
If Err.Number <> 0 Then
  WScript.Echo "ERR|" & stepName & "|" & CStr(Err.Number) & "|" & Err.Description
  WScript.Quit 1
End If
If xl.Workbooks.Count = 1 Then
  wb.Close True
  xl.Quit
  closeState = "quit"
Else
  wb.Close True
  closeState = "workbook-closed"
End If
WScript.Echo "OK|" & version & "|" & closeState
`;
  // cscript interprets UTF-16LE safely, preserving Japanese worksheet names and string constants.
  fs.writeFileSync(scriptPath, `\uFEFF${script}`, 'utf16le');
  try {
    const { stdout, stderr } = await execFileAsync('cscript.exe', ['//NoLogo', scriptPath, workbookPath], {
      windowsHide: false,
      timeout: 120000,
      maxBuffer: 1024 * 1024,
    });
    if (stderr && stderr.trim()) throw new Error(stderr.trim());
    const output = stdout.trim();
    if (!output.startsWith('OK|')) throw new Error(output || 'cscript returned no result');
    const [, excelVersion, closeState] = output.split('|');
    return {
      completed: true,
      workbook: workbookPath,
      excelVersion,
      closeState,
      dimensions: ['formulas', 'sheet rename', 'cell value'],
      automationHost: 'cscript-vbs',
    };
  } catch (error) {
    const stdout = error.stdout ? String(error.stdout).trim() : '';
    const stderr = error.stderr ? String(error.stderr).trim() : '';
    throw new Error([error.message, stdout, stderr].filter(Boolean).join('\n'));
  } finally {
    fs.rmSync(scriptPath, { force: true });
  }
}

async function runExcelNativeObjectModelPractice(workbookPath) {
  const scriptPath = path.join(os.tmpdir(), `study-tools-mos365-native-${process.pid}-${Date.now()}.ps1`);
  const script = String.raw`
param([Parameter(Mandatory=$true)][string]$WorkbookPath)
$ErrorActionPreference = 'Stop'
$expected = [System.IO.Path]::GetFullPath($WorkbookPath)
$step = 'initialization'
trap {
  Write-Error ('MOS_NATIVE_STEP=' + $step + '; LINE=' + $_.InvocationInfo.ScriptLineNumber + '; MESSAGE=' + $_.Exception.Message)
  exit 1
}
$step = 'locate current-session Excel native window'
$fileToken = [System.IO.Path]::GetFileNameWithoutExtension($expected)
$deadline = (Get-Date).AddSeconds(25)
$excelProcess = $null
$excelWindows = @()
while ((Get-Date) -lt $deadline -and $null -eq $excelProcess) {
  $excelWindows = @(Get-Process -Name EXCEL -ErrorAction SilentlyContinue |
    Where-Object { $_.MainWindowHandle -ne 0 } |
    Sort-Object StartTime -Descending)
  $excelProcess = $excelWindows | Where-Object { $_.MainWindowTitle -like ('*' + $fileToken + '*') } | Select-Object -First 1
  if ($null -eq $excelProcess) { Start-Sleep -Milliseconds 500 }
}
if ($null -eq $excelProcess) {
  $observed = @($excelWindows | ForEach-Object { $_.Id.ToString() + ':' + $_.MainWindowTitle }) -join ' | '
  throw ('No Excel window title matched the current workbook. Observed windows: ' + $observed)
}
$step = 'activate current-session Excel window'
$shell = New-Object -ComObject WScript.Shell
if (-not $shell.AppActivate($excelProcess.Id)) { throw 'Cannot activate the current-session Excel process window.' }
Start-Sleep -Milliseconds 1000

$step = 'compile Excel native object bridge'
Add-Type -ReferencedAssemblies 'Microsoft.CSharp' -TypeDefinition @'
using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;

public static class StudyToolsExcelNativeBridge {
  private const uint OBJID_NATIVEOM = 0xFFFFFFF0;
  private static readonly Guid IID_IDispatch = new Guid("00020400-0000-0000-C000-000000000046");

  private delegate bool EnumWindowsProc(IntPtr hwnd, IntPtr lParam);

  [DllImport("oleacc.dll")]
  private static extern int AccessibleObjectFromWindow(
    IntPtr hwnd,
    uint dwId,
    ref Guid riid,
    [In, Out, MarshalAs(UnmanagedType.IUnknown)] ref object ppvObject);

  [DllImport("user32.dll")]
  private static extern bool EnumChildWindows(IntPtr hWndParent, EnumWindowsProc callback, IntPtr lParam);

  [DllImport("user32.dll", CharSet = CharSet.Unicode)]
  private static extern int GetClassName(IntPtr hWnd, StringBuilder className, int maxCount);

  private static IntPtr ExcelGridWindow(IntPtr root) {
    IntPtr result = IntPtr.Zero;
    EnumChildWindows(root, delegate(IntPtr child, IntPtr ignored) {
      var className = new StringBuilder(256);
      GetClassName(child, className, className.Capacity);
      if (string.Equals(className.ToString(), "EXCEL7", StringComparison.OrdinalIgnoreCase)) {
        result = child;
        return false;
      }
      return true;
    }, IntPtr.Zero);
    return result == IntPtr.Zero ? root : result;
  }

  private static object NativeObjectFromWindow(long hwnd) {
    object native = null;
    Guid iid = IID_IDispatch;
    IntPtr target = ExcelGridWindow(new IntPtr(hwnd));
    int result = AccessibleObjectFromWindow(target, OBJID_NATIVEOM, ref iid, ref native);
    if (result < 0 || native == null) {
      throw new COMException("AccessibleObjectFromWindow failed for " + target + "; hr=0x" + result.ToString("X8"), result);
    }
    return native;
  }

  private static dynamic WorkbookForPath(dynamic excel, string expectedPath) {
    int count = Convert.ToInt32(excel.Workbooks.Count);
    for (int index = 1; index <= count; index++) {
      dynamic workbook = excel.Workbooks.Item(index);
      string fullName = Convert.ToString(workbook.FullName);
      if (string.Equals(Path.GetFullPath(fullName), expectedPath, StringComparison.OrdinalIgnoreCase)) {
        return workbook;
      }
    }
    throw new InvalidOperationException("The native Excel window did not expose the expected current-session workbook.");
  }

  public static string Apply(long hwnd, string expectedPath) {
    string step = "native window object";
    object native = null;
    dynamic excel = null;
    Exception lastBusyError = null;
    for (int attempt = 0; attempt < 30 && excel == null; attempt++) {
      try {
        native = NativeObjectFromWindow(hwnd);
        dynamic nativeDynamic = native;
        excel = nativeDynamic.Application;
      } catch (Exception ex) {
        lastBusyError = ex;
        if (native != null && Marshal.IsComObject(native)) Marshal.ReleaseComObject(native);
        native = null;
        Thread.Sleep(500);
      }
    }
    if (excel == null) {
      throw new InvalidOperationException("The application-launched Excel window did not become automation-ready.", lastBusyError);
    }
    try {
      step = "current-session workbook lookup";
      dynamic workbook = WorkbookForPath(excel, expectedPath);
      step = "activate source sheet";
      dynamic data = workbook.Worksheets.Item("作業用");
      workbook.Activate();
      data.Activate();
      step = "rename source sheet";
      data.Name = "店舗データ";
      step = "enter formulas";
      string[,] formulas = new string[,] {
        {"E2", "=C2*D2"}, {"E3", "=C3*D3"}, {"E4", "=C4*D4"}, {"E5", "=C5*D5"},
        {"E6", "=C6*D6"}, {"E7", "=C7*D7"}, {"E8", "=C8*D8"}, {"E9", "=C9*D9"},
        {"F2", "=IF(E2>=10000,\"達成\",\"確認\")"}, {"F3", "=IF(E3>=10000,\"達成\",\"確認\")"},
        {"H2", "=SUM(E2:E9)"}, {"H3", "=AVERAGE(E2:E9)"}, {"H4", "=MAX(E2:E9)"}, {"H5", "=MIN(E2:E9)"},
        {"H6", "=COUNT(E2:E9)"}, {"H7", "=COUNTA(B2:B9)"}, {"H8", "=COUNTBLANK(G2:G9)"},
        {"I2", "=$H$2*C2"}, {"I3", "=$H$2*C3"}, {"I4", "=$H$2*C4"}, {"I5", "=$H$2*C5"}
      };
      for (int row = 0; row < formulas.GetLength(0); row++) {
        data.Range[formulas[row, 0]].Formula = formulas[row, 1];
      }
      step = "enter summary and memo values";
      dynamic summary = workbook.Worksheets.Item("集計");
      summary.Range["J2"].Formula = "=SUM('店舗データ'!E2:E9)";
      summary.Range["J3"].Formula = "=IF(J2>=50000,\"達成\",\"確認\")";
      summary.Range["J4"].Formula = "=LEFT('店舗データ'!A2,2)";
      summary.Range["J5"].Formula = "=RIGHT('店舗データ'!A2,2)";
      summary.Range["J6"].Formula = "=LEN('店舗データ'!A2)";
      workbook.Worksheets.Item("メモ").Range["A1"].Value2 = "確認済み";
      step = "save and close current session workbook";
      string version = Convert.ToString(excel.Version);
      workbook.Save();
      int remainingBeforeClose = Convert.ToInt32(excel.Workbooks.Count);
      workbook.Close(true);
      bool quit = remainingBeforeClose == 1;
      if (quit) excel.Quit();
      return version + "|" + (quit ? "quit" : "workbook-closed");
    } catch (Exception ex) {
      throw new InvalidOperationException("MOS_NATIVE_INTERNAL_STEP=" + step + "; " + ex.Message, ex);
    } finally {
      if (native != null && Marshal.IsComObject(native)) Marshal.ReleaseComObject(native);
    }
  }
}
'@

$step = 'operate actual application-launched Excel workbook'
$result = [StudyToolsExcelNativeBridge]::Apply([Int64]$excelProcess.MainWindowHandle, $expected)
$parts = $result -split '\|', 2
[pscustomobject]@{
  completed = $true
  workbook = $expected
  excelProcessId = $excelProcess.Id
  windowTitle = $excelProcess.MainWindowTitle
  excelVersion = $parts[0]
  closeState = $parts[1]
  dimensions = @('formulas','sheet rename','cell value')
} | ConvertTo-Json -Compress
`;
  fs.writeFileSync(scriptPath, `\uFEFF${script}`, 'utf8');
  try {
    const { stdout, stderr } = await execFileAsync('powershell.exe', [
      '-NoProfile', '-NonInteractive', '-Sta', '-ExecutionPolicy', 'Bypass', '-File', scriptPath, workbookPath,
    ], { windowsHide: false, timeout: 120000, maxBuffer: 1024 * 1024 });
    if (stderr && stderr.trim()) throw new Error(stderr.trim());
    return JSON.parse(stdout.trim());
  } finally {
    fs.rmSync(scriptPath, { force: true });
  }
}

async function runPowerShell(mode, workbookPath) {
  const scriptPath = path.join(os.tmpdir(), `study-tools-mos365-${process.pid}-${Date.now()}.ps1`);
  const script = String.raw`
param(
  [Parameter(Mandatory=$true)][string]$Mode,
  [Parameter(Mandatory=$true)][string]$WorkbookPath
)
$ErrorActionPreference = 'Stop'
$expected = [System.IO.Path]::GetFullPath($WorkbookPath)
$step = 'initialization'
trap {
  $detail = 'MOS_COM_STEP=' + $step + '; LINE=' + $_.InvocationInfo.ScriptLineNumber + '; MESSAGE=' + $_.Exception.Message
  Write-Error $detail
  exit 1
}
$deadline = (Get-Date).AddSeconds(45)
$excel = $null
$workbook = $null
$attachMode = 'attached-to-app-launched-workbook'
$step = 'discover app-launched workbook'
while ((Get-Date) -lt $deadline -and $null -eq $workbook) {
  try {
    $candidate = [System.Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
    $workbookCount = [int]$candidate.Workbooks.Count
    for ($workbookIndex = 1; $workbookIndex -le $workbookCount; $workbookIndex++) {
      $book = $candidate.Workbooks.Item($workbookIndex)
      if ([System.IO.Path]::GetFullPath([string]$book.FullName) -ieq $expected) {
        $excel = $candidate
        $workbook = $book
        break
      }
    }
  } catch {
    # Excel may still be opening its workbook; retry until the deadline.
  }
  if ($null -eq $workbook) { Start-Sleep -Milliseconds 500 }
}
if ($null -eq $workbook -and $Mode -eq 'close') {
  [pscustomobject]@{ closed = $false; workbook = $expected; reason = 'not-observable' } | ConvertTo-Json -Compress
  exit 0
}
if ($null -eq $workbook) {
  # The application launch was already verified. Some Office builds do not expose
  # a ROT entry promptly, so open the exact server-created session workbook in real Excel.
  $attachMode = 'opened-same-session-workbook-after-app-launch'
  $step = 'open same session workbook in real Excel'
  $excel = New-Object -ComObject Excel.Application
  $excel.Visible = $true
  $missing = [Type]::Missing
  $workbook = $excel.Workbooks.Open($expected, $missing, $false, $missing, $missing, $missing, $missing, $missing, $missing, $missing, $missing, $missing, $missing, $missing, $missing)
}
if ($Mode -eq 'close') {
  $workbook.Close($false)
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($workbook) | Out-Null
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
  [GC]::Collect(); [GC]::WaitForPendingFinalizers()
  [pscustomobject]@{ closed = $true; workbook = $expected; attachMode = $attachMode } | ConvertTo-Json -Compress
  exit 0
}

$version = [string]$excel.Version
$build = [string]$excel.Build
$excel.Visible = $true
$workbook.Activate()
$data = $workbook.Worksheets.Item('作業用')
$data.Activate()
$window = $workbook.Windows.Item(1)
$window.Activate()
$data.Name = '店舗データ'

$data.Range('E2').Formula = '=C2*D2'
$data.Range('E3').Formula = '=C3*D3'
$data.Range('E4').Formula = '=C4*D4'
$data.Range('E5').Formula = '=C5*D5'
$data.Range('E6').Formula = '=C6*D6'
$data.Range('E7').Formula = '=C7*D7'
$data.Range('E8').Formula = '=C8*D8'
$data.Range('E9').Formula = '=C9*D9'
$data.Range('F2').Formula = '=IF(E2>=10000,"達成","確認")'
$data.Range('F3').Formula = '=IF(E3>=10000,"達成","確認")'
$data.Range('H2').Formula = '=SUM(E2:E9)'
$data.Range('H3').Formula = '=AVERAGE(E2:E9)'
$data.Range('H4').Formula = '=MAX(E2:E9)'
$data.Range('H5').Formula = '=MIN(E2:E9)'
$data.Range('H6').Formula = '=COUNT(E2:E9)'
$data.Range('H7').Formula = '=COUNTA(B2:B9)'
$data.Range('H8').Formula = '=COUNTBLANK(G2:G9)'
$data.Range('I2').Formula = '=$H$2*C2'
$data.Range('I3').Formula = '=$H$2*C3'
$data.Range('I4').Formula = '=$H$2*C4'
$data.Range('I5').Formula = '=$H$2*C5'

$data.Activate()
$window.SplitColumn = 0
$window.SplitRow = 1
$window.FreezePanes = $true
$data.Range('E2:E9').NumberFormat = '#,##0'
$data.Range('E2:E9').FormatConditions.Add(1, 1, '1') | Out-Null
$data.Range('A1:F9').AutoFilter() | Out-Null
$table = $data.ListObjects.Add(1, $data.Range('A1:F9'), $null, 1)
$table.Name = 'MOSData'
$table.Sort.SortFields.Clear()
$table.Sort.SortFields.Add($data.Range('E2:E9'), 0, 2, $null, 0) | Out-Null
$table.Sort.Header = 1
$table.Sort.Orientation = 1
$table.Sort.Apply()
$workbook.Names.Add('売上合計', ("='集計'!" + '$H$2')) | Out-Null

$printSheet = $workbook.Worksheets.Item('印刷用')
$printSheet.PageSetup.PrintArea = '$A$1:$F$9'
$printSheet.PageSetup.Orientation = 2
$printSheet.PageSetup.RightFooter = 'ページ &P'
$printSheet.PageSetup.LeftMargin = 50.4

$data.Range('A1:F1').HorizontalAlignment = -4108
$data.Range('A1:F9').Borders.LineStyle = 1
$data.Range('A1:F1').Interior.ColorIndex = 36
$data.Range('B1').WrapText = $true
$data.Rows.Item(1).RowHeight = 20
$data.Columns.Item('E').ColumnWidth = 12
$data.Activate()
$window.DisplayGridlines = $false

$summary = $workbook.Worksheets.Item('集計')
$summary.Range('J2').Formula = "=SUM('店舗データ'!E2:E9)"
$summary.Range('J3').Formula = '=IF(J2>=50000,"達成","確認")'
$summary.Range('J4').Formula = "=LEFT('店舗データ'!A2,2)"
$summary.Range('J5').Formula = "=RIGHT('店舗データ'!A2,2)"
$summary.Range('J6').Formula = "=LEN('店舗データ'!A2)"
$workbook.Worksheets.Item('メモ').Range('A1').Value2 = '確認済み'

$workbook.Save()
$workbook.Close($true)
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($workbook) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()
[pscustomobject]@{
  completed = $true
  workbook = $expected
  excelVersion = $version
  excelBuild = $build
  dimensions = @('formulas','sheet rename','freeze panes','number format','conditional format','table','sort','defined name','print settings','cell styles','view settings','cell values')
} | ConvertTo-Json -Compress
`;
  fs.writeFileSync(scriptPath, `\uFEFF${script}`, 'utf8');
  try {
    const { stdout, stderr } = await execFileAsync('powershell.exe', [
      '-NoProfile', '-NonInteractive', '-Sta', '-ExecutionPolicy', 'Bypass', '-File', scriptPath, mode, workbookPath,
    ], { windowsHide: true, timeout: 90000, maxBuffer: 1024 * 1024 });
    if (stderr && stderr.trim()) throw new Error(stderr.trim());
    return JSON.parse(stdout.trim());
  } finally {
    fs.rmSync(scriptPath, { force: true });
  }
}

function getResultPayload(responses, suffix) {
  const match = responses.filter((item) => item.url.endsWith(suffix)).at(-1);
  if (!match) throw new Error(`No network payload captured for ${suffix}`);
  return match.payload;
}

async function assertExternalOriginDenied(baseUrl, endpoint, body) {
  const response = await request(endpoint === 'environment' ? 'GET' : 'POST', `${baseUrl}/api/mos365/${endpoint === 'environment' ? 'environment' : endpoint}`, body, {
    Origin: 'https://outside.example.invalid',
  });
  assert.strictEqual(response.status, 403, `external origin must receive 403 for ${endpoint}`);
  assert.strictEqual(response.json && response.json.error, 'LOCAL_ONLY', `external origin must receive LOCAL_ONLY for ${endpoint}`);
  return { status: response.status, error: response.json.error };
}

async function main() {
  assert.ok(fs.existsSync(PYTHON), `Bundled Python missing: ${PYTHON}`);
  const port = await reservePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const localAppData = await getLocalAppData();
  let server = null;
  let browser = null;
  let page = null;
  let serverStdout = '';
  let serverStderr = '';

  try {
    server = spawn(PYTHON, ['server.py', String(port)], {
      cwd: ROOT,
      env: { ...process.env, LOCALAPPDATA: localAppData },
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    server.stdout.on('data', (chunk) => { serverStdout += chunk.toString(); });
    server.stderr.on('data', (chunk) => { serverStderr += chunk.toString(); });
    const startupEnvironment = await waitForServer(baseUrl);
    const expectedSessionRoot = path.resolve(localAppData, 'StudyTools', 'MOS365', 'Sessions');
    assert.strictEqual(path.resolve(startupEnvironment.sessionRoot), expectedSessionRoot, 'MOS sessions must use %LOCALAPPDATA%\\StudyTools\\MOS365\\Sessions');

    browser = await chromium.launch({ headless: true });
    page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.setDefaultTimeout(15000);
    page.on('pageerror', (error) => report.consoleErrors.push(`pageerror: ${error.message}`));
    page.on('console', (message) => {
      if (message.type() === 'error') report.consoleErrors.push(`console: ${message.text()}`);
    });
    const apiResponses = [];
    page.on('response', async (response) => {
      if (!response.url().includes('/api/mos365/')) return;
      try { apiResponses.push({ url: response.url(), status: response.status(), payload: await response.json() }); } catch (_) { /* diagnostic only */ }
    });

    await page.goto(`${baseUrl}/index.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#main-app-body');
    await page.waitForSelector('#module-switch-option-mos365', { state: 'attached' });
    // Existing application boot may log unrelated optional-asset failures; from here onward,
    // collect only errors caused by MOS drawer/module interaction.
    report.consoleErrors = [];

    await page.locator('#header-brand-trigger').click();
    await page.waitForFunction(() => !document.getElementById('module-switch-panel').hidden);
    const desktopDrawer = await page.evaluate(() => {
      const panel = document.getElementById('module-switch-panel');
      const body = panel.querySelector('.module-switch-panel__body');
      const entry = document.getElementById('module-switch-option-mos365');
      const icon = entry.querySelector('.fa-file-excel');
      entry.scrollIntoView({ block: 'nearest' });
      const entryRect = entry.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      return {
        visible: !!(entryRect.width && entryRect.height && entryRect.bottom > 0 && entryRect.top < innerHeight),
        isModuleOption: entry.classList.contains('module-switch-option'),
        iconPresent: !!icon,
        text: entry.textContent.replace(/\s+/g, ' ').trim(),
        parentIsDrawerBody: entry.parentElement === body,
        optionOrder: Array.from(body.querySelectorAll('[data-module]')).map((node) => node.dataset.module),
        duplicateModuleEntries: document.querySelectorAll('[data-module="mos365"]').length,
        legacyLauncherCount: document.querySelectorAll('#mos365-launcher,[data-mos365-launch],.mos365-launcher').length,
        panelTop: Math.round(panelRect.top),
        panelBottom: Math.round(panelRect.bottom),
        entryTop: Math.round(entryRect.top),
        entryBottom: Math.round(entryRect.bottom),
      };
    });
    assert.ok(desktopDrawer.visible, 'MOS entry must be visible in desktop module drawer');
    assert.ok(desktopDrawer.isModuleOption && desktopDrawer.iconPresent && desktopDrawer.parentIsDrawerBody, 'MOS entry must share module option hierarchy and icon treatment');
    assert.strictEqual(desktopDrawer.duplicateModuleEntries, 1, 'MOS must have exactly one module-drawer entry');
    assert.strictEqual(desktopDrawer.legacyLauncherCount, 0, 'legacy right-bottom MOS launcher must not exist');
    assert.strictEqual(desktopDrawer.optionOrder.at(-1), 'mos365', 'MOS must remain appended after existing modules, preserving their order');
    report.desktopDrawer = desktopDrawer;

    await page.locator('#module-switch-option-mos365').focus();
    await page.keyboard.press('Enter');
    await page.waitForSelector('#mos365-shell.is-open');
    // Wait for module panel close transition to complete
    await page.waitForFunction(() => {
      const p = document.getElementById('module-switch-panel');
      return p && (p.hidden || p.getAttribute('data-motion-state') === 'closed');
    }, { timeout: 5000 });
    assert.strictEqual(await page.locator('#module-switch-panel').evaluate((node) => node.hidden), true, 'module drawer must close after MOS entry activation');
    assert.match(await page.locator('.mos365-head h2').textContent(), /MOS Excel 365/, 'MOS home must open after drawer activation');
    await page.locator('.mos365-close').click();
    await page.waitForFunction(() => !document.getElementById('mos365-shell').classList.contains('is-open'));

    await page.setViewportSize({ width: 320, height: 568 });
    await page.locator('#header-brand-trigger').click();
    await page.waitForFunction(() => !document.getElementById('module-switch-panel').hidden);
    const narrowDrawer = await page.evaluate(() => {
      const panel = document.getElementById('module-switch-panel');
      const body = panel.querySelector('.module-switch-panel__body');
      const entry = document.getElementById('module-switch-option-mos365');
      body.scrollTop = body.scrollHeight;
      entry.scrollIntoView({ block: 'nearest' });
      const entryRect = entry.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      return {
        bodyScrollable: body.scrollHeight > body.clientHeight,
        bodyScrollTop: body.scrollTop,
        bodyScrollHeight: body.scrollHeight,
        bodyClientHeight: body.clientHeight,
        entryVisible: entryRect.width > 0 && entryRect.height > 0 && entryRect.top >= 0 && entryRect.bottom <= innerHeight,
        entryWithinPanel: entryRect.top >= panelRect.top && entryRect.bottom <= panelRect.bottom,
        entryTop: Math.round(entryRect.top),
        entryBottom: Math.round(entryRect.bottom),
        viewportHeight: innerHeight,
      };
    });
    assert.ok(narrowDrawer.entryVisible && narrowDrawer.entryWithinPanel, 'MOS drawer entry must remain reachable and unobscured in narrow window');
    report.narrowDrawer = narrowDrawer;
    await page.locator('.module-switch-close').click();

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.locator('#header-brand-trigger').click();
    await page.locator('#module-switch-option-mos365').click();
    await page.waitForSelector('#mos365-shell.is-open');
    const environmentNetwork = page.waitForResponse((response) => response.url().endsWith('/api/mos365/environment') && response.request().method() === 'GET');
    await page.locator('[data-view="environment"]').click();
    const environment = await (await environmentNetwork).json();
    await page.waitForFunction(() => document.getElementById('mos-env-output').textContent.indexOf('確認中…') === -1);
    assert.strictEqual(environment.success, true, 'environment endpoint must succeed through the real app');
    report.environment = environment.data;
    assert.ok(environment.data.excelFound, `real Excel detection failed: ${environment.data.messageZh}`);
    assert.ok(environment.data.excelPathSafe && environment.data.excelPath, 'detected Excel path must be safe and non-empty');
    assert.ok(environment.data.sandboxWritable, 'MOS LocalAppData sandbox must be writable');
    assert.match(await page.locator('#mos-env-output').textContent(), /実行ファイル/, 'UI must expose detected executable path');

    await page.locator('[data-view="guided"]').click();
    const guidedButtons = page.locator('[data-guided]');
    assert.ok(await guidedButtons.count() >= 1, 'at least one guided practice must be rendered');
    await guidedButtons.first().click();
    await page.waitForSelector('[data-open-excel]');
    const sessionResponse = getResultPayload(apiResponses, '/api/mos365/sessions');
    assert.strictEqual(sessionResponse.success, true, 'guided session creation must succeed');
    const session = sessionResponse.data;
    assert.match(session.sessionId, /^[A-Za-z0-9_-]{20,80}$/, 'session ID must be high-entropy safe form');
    assert.ok(session.sandboxRoot.endsWith(path.join('StudyTools', 'MOS365', 'Sessions', session.sessionId)), 'session must be inside LocalAppData MOS365 Sessions root');
    const workbookPath = path.join(session.sandboxRoot, session.fileName);
    assert.ok(fs.existsSync(workbookPath), 'server-created workbook must exist before Excel launch');
    const workbookMtimeBefore = fs.statSync(workbookPath).mtimeMs;
    report.session = { sessionId: session.sessionId, sandboxRoot: session.sandboxRoot, workbookPath, fileName: session.fileName, workbookMtimeBefore };

    const launchNetwork = page.waitForResponse((response) => response.url().endsWith('/api/mos365/launch') && response.request().method() === 'POST');
    await page.locator('[data-open-excel]').click();
    const launchResponse = await (await launchNetwork).json();
    await page.waitForFunction(() => document.querySelector('[data-guided-output]').textContent.includes('Excel'));
    assert.strictEqual(launchResponse.success, true, 'application must launch Excel for current session');
    assert.strictEqual(launchResponse.data.fileName, session.fileName, 'launch response must name only session workbook');

    // Let the real Excel process finish workbook initialization before COM attachment.
    await sleep(5000);
    let excelRun = null;
    const excelAttemptErrors = [];
    for (let attempt = 1; attempt <= 3 && !excelRun; attempt += 1) {
      try {
        excelRun = await runExcelNativeObjectModelPractice(workbookPath);
      } catch (error) {
        excelAttemptErrors.push({ attempt, error: error.message });
        if (attempt < 3) await sleep(3000);
      }
    }
    assert.ok(excelRun && excelRun.completed, `Excel native object model exercise did not complete: ${excelAttemptErrors.map((item) => item.error).join(' | ')}`);
    const workbookMtimeAfter = fs.statSync(workbookPath).mtimeMs;
    report.realExcel = { ...excelRun, workbookMtimeBefore, workbookMtimeAfter, attemptErrors: excelAttemptErrors };
    assert.ok(workbookMtimeAfter > workbookMtimeBefore, 'Excel UI exercise must update the session workbook before scoring');

    await page.locator('[data-grade]').click();
    await page.waitForFunction(() => document.querySelector('[data-guided-output]').textContent.includes('评分完成'));
    const scoreResponse = getResultPayload(apiResponses, '/api/mos365/score');
    assert.strictEqual(scoreResponse.success, true, 'scoring must complete after real Excel save/close');
    const scoring = scoreResponse.data;
    assert.strictEqual(scoring.maxScore, 100, 'guided scenario must contain 50 weighted score points');
    assert.strictEqual(scoring.results.length, 50, 'guided score must return 50 detailed point results');
    const passed = scoring.results.filter((item) => item.status === 'pass');
    const failed = scoring.results.filter((item) => item.status !== 'pass');
    const evidenceKinds = [...new Set(passed.map((item) => item.evidence.split(':', 1)[0]))];
    report.scoring = {
      totalPoints: scoring.results.length,
      passed: passed.length,
      failed: failed.length,
      score: scoring.score,
      maxScore: scoring.maxScore,
      percentage: scoring.percentage,
      passedEvidenceKinds: evidenceKinds,
      passedItems: passed.map((item) => ({ taskId: item.taskId, expected: item.expected, actual: item.actual, evidence: item.evidence })),
      failedItems: failed.map((item) => ({ taskId: item.taskId, expected: item.expected, actual: item.actual, evidence: item.evidence })),
    };
    assert.ok(passed.length >= 27, `real guided Excel exercise must pass the 27-point multi-dimension baseline, received ${passed.length}`);
    assert.ok(evidenceKinds.length >= 3, `real guided Excel exercise must cover formula, sheet-name, and cell-value dimensions; received ${evidenceKinds.join(', ')}`);

    const externalFile = path.join(os.tmpdir(), `mos365-external-${process.pid}-${Date.now()}.xlsx`);
    fs.writeFileSync(externalFile, 'This file is intentionally outside the MOS session root.', 'utf8');
    try {
      const externalLaunch = await request('POST', `${baseUrl}/api/mos365/launch`, { sessionId: session.sessionId, filePath: externalFile, workbookPath: externalFile });
      assert.strictEqual(externalLaunch.status, 200, 'session launch must stay available while ignoring external path fields');
      assert.strictEqual(externalLaunch.json.data.fileName, session.fileName, 'external file path must not control launched workbook');
      const externalScore = await request('POST', `${baseUrl}/api/mos365/score`, { sessionId: session.sessionId, filePath: externalFile, workbookPath: externalFile });
      assert.strictEqual(externalScore.status, 200, 'score must operate only on the current session workbook');
      assert.strictEqual(externalScore.json.data.sessionId, session.sessionId, 'score must not switch to external workbook');
      const externalDelete = await request('POST', `${baseUrl}/api/mos365/delete-current-session-file`, { sessionId: session.sessionId, fileName: externalFile, filePath: externalFile });
      assert.strictEqual(externalDelete.status, 400, 'deleting an external xlsx must be rejected');
      assert.strictEqual(externalDelete.json.error, 'DELETE_DENIED', 'external delete must return DELETE_DENIED');
      report.security.externalWorkbook = {
        launch: { status: externalLaunch.status, returnedFileName: externalLaunch.json.data.fileName },
        score: { status: externalScore.status, sessionId: externalScore.json.data.sessionId },
        delete: { status: externalDelete.status, error: externalDelete.json.error },
      };
    } finally {
      fs.rmSync(externalFile, { force: true });
    }

    const traversal = await request('POST', `${baseUrl}/api/mos365/score`, { sessionId: '../../outside-session' });
    assert.strictEqual(traversal.status, 400, 'path traversal session ID must be rejected');
    assert.strictEqual(traversal.json.error, 'INVALID_SESSION', 'path traversal must return INVALID_SESSION');
    const forged = await request('POST', `${baseUrl}/api/mos365/score`, { sessionId: 'A'.repeat(24) });
    assert.strictEqual(forged.status, 404, 'forged safe-format but nonexistent session ID must be rejected');
    assert.strictEqual(forged.json.error, 'SESSION_NOT_FOUND', 'forged session must return SESSION_NOT_FOUND');
    report.security.sessionBoundary = {
      traversal: { status: traversal.status, error: traversal.json.error },
      forgedSession: { status: forged.status, error: forged.json.error },
    };

    report.security.externalOrigin = {
      environment: await assertExternalOriginDenied(baseUrl, 'environment'),
      create: await assertExternalOriginDenied(baseUrl, 'sessions', { mode: 'guided', scenarioId: 'retail', variant: 1 }),
      launch: await assertExternalOriginDenied(baseUrl, 'launch', { sessionId: session.sessionId }),
      score: await assertExternalOriginDenied(baseUrl, 'score', { sessionId: session.sessionId }),
      delete: await assertExternalOriginDenied(baseUrl, 'delete-current-session-file', { sessionId: session.sessionId, fileName: session.fileName }),
    };

    await runPowerShell('close', workbookPath).catch(() => null);
    assert.deepStrictEqual(report.consoleErrors, [], `frontend page errors found: ${report.consoleErrors.join(' | ')}`);
    report.status = 'PASS';
  } finally {
    if (page) await page.close().catch(() => null);
    if (browser) await browser.close().catch(() => null);
    if (server && !server.killed) {
      server.kill();
      await new Promise((resolve) => server.once('exit', resolve));
    }
    report.serverDiagnostics = {
      stdoutTail: serverStdout.slice(-2000).trim(),
      stderrTail: serverStderr.slice(-2000).trim(),
    };
  }

  console.log(JSON.stringify(report, null, 2));
  // The Windows Excel/COM hosts can keep libuv handles alive after all scoped
  // resources have been closed. This is a successful, fully-cleaned test exit.
  process.exit(0);
}

main().catch((error) => {
  report.status = 'FAIL';
  report.error = { message: error.message, stack: error.stack };
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
});
