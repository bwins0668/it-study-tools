# provision_runtime.ps1 — 受控 Portable Runtime 依赖装配（幂等、可重复、版本可追踪）
#
# 用途：为项目内置 embedded Python (python\) 补齐更新器签名验证所需的
#       cryptography 及其依赖。构建机使用系统 pip 仅做 wheel 下载，
#       终端用户永远不需要 pip / 系统 Python。
#
# 安全边界：不触碰签名协议、受信公钥、keyId 逻辑；不打包私钥/Token。
# 验收：python\python.exe 可独立 import cryptography 并加载 Ed25519PublicKey。

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$runtimePy = Join-Path $root "python\python.exe"
$sitePackages = Join-Path $root "python\Lib\site-packages"
$lockFile = Join-Path $root "tools\runtime-requirements.lock"

Write-Host "== Study Tools controlled runtime provisioning =="

if (-not (Test-Path $runtimePy)) { throw "受控 runtime 不存在: $runtimePy" }

# ── 幂等检测 ──
& $runtimePy -c "from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey" 2>$null
if ($LASTEXITCODE -eq 0) {
  $v = & $runtimePy -c "import cryptography; print(cryptography.__version__)"
  Write-Host "OK cryptography $v 已可用（ed25519 加载通过），无需装配。"
  exit 0
}

# ── 找构建机 pip（仅用于下载 wheel）──
$builderPy = $null
foreach ($cand in @("py -3.12", "py -3.14", "py -3.10", "python")) {
  try {
    $parts = $cand.Split(" ")
    & $parts[0] $parts[1..($parts.Count-1)] -m pip --version 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { $builderPy = $cand; break }
  } catch {}
}
if (-not $builderPy) { throw "构建机无可用 pip（仅构建时需要；终端用户包应已含依赖）" }
Write-Host "构建机 pip 来源: $builderPy"

# ── 下载 cp312 win_amd64 wheel（受控 runtime 为 Python 3.12 x64）──
$dl = Join-Path $env:TEMP ("st_runtime_wheels_" + [guid]::NewGuid().ToString("N").Substring(0, 8))
New-Item -ItemType Directory -Path $dl | Out-Null
$parts = $builderPy.Split(" ")
& $parts[0] ($parts[1..($parts.Count-1)] + @(
  "-m", "pip", "download", "cryptography",
  "--dest", $dl,
  "--python-version", "3.12",
  "--only-binary=:all:",
  "--platform", "win_amd64",
  "--implementation", "cp"
))
if ($LASTEXITCODE -ne 0) { throw "wheel 下载失败" }

# ── 解压 wheel 到受控 site-packages ──
New-Item -ItemType Directory -Path $sitePackages -Force | Out-Null
Add-Type -AssemblyName System.IO.Compression.FileSystem
$wheels = Get-ChildItem $dl -Filter "*.whl"
$lock = @("# 受控 runtime 依赖锁（provision_runtime.ps1 生成）", "# python: 3.12 embedded win_amd64")
foreach ($w in $wheels) {
  Write-Host "装配 $($w.Name)"
  $lock += $w.Name
  $zip = [System.IO.Compression.ZipFile]::OpenRead($w.FullName)
  try {
    foreach ($entry in $zip.Entries) {
      if ($entry.FullName.EndsWith("/")) { continue }
      $target = Join-Path $sitePackages $entry.FullName
      $dir = Split-Path -Parent $target
      if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
      [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $target, $true)
    }
  } finally { $zip.Dispose() }
}
$lock | Set-Content $lockFile -Encoding UTF8
Remove-Item $dl -Recurse -Force

# ── 独立验证（终端用户视角：不依赖系统 Python）──
& $runtimePy -c "import cryptography; print('cryptography', cryptography.__version__)"
if ($LASTEXITCODE -ne 0) { throw "装配后 import cryptography 失败" }
& $runtimePy -c "from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey; print('ed25519-ok')"
if ($LASTEXITCODE -ne 0) { throw "装配后 Ed25519 加载失败" }

Write-Host "== 装配完成：受控 runtime 可独立验证签名（锁文件 $lockFile）=="
