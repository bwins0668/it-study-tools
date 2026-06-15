# package_portable.ps1 - Windows Portable ZIP packaging helper
# Round 134.3: wraps tools/create_zip.py and verifies the generated archive.

param(
    [string]$Version = "v2026.6.15-r134.3",
    [string]$OutputDir = "backups",
    [switch]$SkipCreate
)

$ErrorActionPreference = "Stop"

function Resolve-ProjectRoot {
    if ($PSScriptRoot) {
        return (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
    }
    return (Get-Location).Path
}

function Resolve-OutputDir([string]$ProjectRoot, [string]$PathValue) {
    if ([System.IO.Path]::IsPathRooted($PathValue)) {
        return $PathValue
    }
    return (Join-Path $ProjectRoot $PathValue)
}

function Test-ZipEntryMatch([string[]]$Entries, [string]$Pattern) {
    return @($Entries | Where-Object { $_ -like $Pattern })
}

$ProjectRoot = Resolve-ProjectRoot
$OutputPath = Resolve-OutputDir $ProjectRoot $OutputDir
$PackageName = "Study-Tools-Portable-$Version"
$ZipPath = Join-Path $OutputPath "$PackageName.zip"

Write-Host "=== Study Tools Portable packaging ===" -ForegroundColor Cyan
Write-Host "Project root: $ProjectRoot"
Write-Host "Version: $Version"
Write-Host "Output: $ZipPath"

Set-Location $ProjectRoot

$pythonExe = Join-Path $ProjectRoot "python\python.exe"
if (!(Test-Path $pythonExe)) {
    $pythonExe = "python"
}

if (!$SkipCreate) {
    Write-Host "--- Create ZIP via tools/create_zip.py ---" -ForegroundColor Yellow
    $oldVersion = $env:STUDY_TOOLS_VERSION
    $env:STUDY_TOOLS_VERSION = $Version
    try {
        & $pythonExe (Join-Path $ProjectRoot "tools\create_zip.py")
    } finally {
        $env:STUDY_TOOLS_VERSION = $oldVersion
    }
}

if (!(Test-Path $ZipPath)) {
    throw "ZIP was not created: $ZipPath"
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($ZipPath)
try {
    $entries = @($zip.Entries | ForEach-Object { $_.FullName })
} finally {
    $zip.Dispose()
}

$required = @(
    "$PackageName/index.html",
    "$PackageName/server.py",
    "$PackageName/Study-Tools.exe",
    "$PackageName/assets/js/java_sandbox.js",
    "$PackageName/assets/js/python_sandbox.js",
    "$PackageName/assets/js/version.js",
    "$PackageName/data/java_lessons.js",
    "$PackageName/data/python_lessons.js",
    "$PackageName/python/python.exe"
)

$missing = @($required | Where-Object { $entries -notcontains $_ })
if ($missing.Count -gt 0) {
    Write-Host "[FAIL] Missing required ZIP entries:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
    exit 1
}

$forbiddenPatterns = @(
    "$PackageName/_fix.py",
    "$PackageName/_fix2.py",
    "$PackageName/backups/*.json",
    "$PackageName/*.log",
    "$PackageName/*/*.log",
    "$PackageName/screenshots/*",
    "$PackageName/test-output/*",
    "$PackageName/playwright-report/*",
    "$PackageName/.env",
    "$PackageName/.env.*",
    "$PackageName/*local*config*",
    "$PackageName/*service*role*"
)

$forbiddenRegexes = @(
    '(^|/)(token|session|cookie|jwt)([._ -]|$)',
    '(^|/)(api[._ -]?key|service[._ -]?role)([._ -]|$)'
)

$forbidden = @()
foreach ($pattern in $forbiddenPatterns) {
    $forbidden += Test-ZipEntryMatch $entries $pattern
}
$forbidden += @($entries | Where-Object {
    $entry = $_.ToLowerInvariant()
    $forbiddenRegexes | Where-Object { $entry -match $_ }
})
$forbidden = @($forbidden | Sort-Object -Unique)
if ($forbidden.Count -gt 0) {
    Write-Host "[FAIL] Forbidden ZIP entries found:" -ForegroundColor Red
    $forbidden | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
    exit 1
}

$hash = Get-FileHash -LiteralPath $ZipPath -Algorithm SHA256
$size = (Get-Item -LiteralPath $ZipPath).Length

Write-Host "--- Verification ---" -ForegroundColor Yellow
Write-Host "ZIP path: $ZipPath"
Write-Host "File count: $($entries.Count)"
Write-Host "Size bytes: $size"
Write-Host "SHA256: $($hash.Hash)"
Write-Host "Required files: PASS"
Write-Host "Forbidden files: PASS"
