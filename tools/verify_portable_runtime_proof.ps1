# tools/verify_portable_runtime_proof.ps1 — P14.3 干净 Portable Runtime 发布证明
#
# 从干净临时目录证明：Portable zip 自带签名验证 runtime（cryptography + Ed25519），
# 解压后不依赖系统 Python / pip / Node / Git 即可启动 server 并安全地执行更新检查；
# Release gate 在 runtime 缺依赖时明确失败且不产出 zip。
#
# 全部临时产物位于 %TEMP%\studytools-p14-3-proof\，可整目录删除。
# 安全边界：签名协议 / 受信公钥 / keyId 不触碰；签名仅使用运行中生成的
#           dev 测试密钥对（generate_dev_keypair，不落任何生产私钥）；
#           不创建 GitHub Release。
# 运行：pwsh -File tools/verify_portable_runtime_proof.ps1
# 退出码：0=全部证明成立 1=存在失败

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$controlledPy = Join-Path $root "python\python.exe"
$proof = Join-Path $env:TEMP "studytools-p14-3-proof"
$ver = "0.0.0-p143proof"

$script:results = @()
$script:procAudit = @()

function Redact([string]$s) {
  if (-not $s) { return $s }
  return $s.Replace($env:TEMP, "%TEMP%").Replace($root, "<REPO>")
}
function Check([string]$name, [bool]$ok, [string]$detail = "") {
  $script:results += [pscustomobject]@{ Name = $name; Ok = $ok }
  $mark = if ($ok) { "PASS" } else { "FAIL" }
  Write-Host ("{0}  {1}{2}" -f $mark, $name, $(if ($detail) { "  | " + (Redact $detail) } else { "" }))
}
function RunPy([string]$py, [string[]]$argv, [string]$cwdir, [hashtable]$extraEnv) {
  # 进程审计：证明全程只调用受控 / 包内 runtime
  $script:procAudit += (Redact ("{0} {1}" -f $py, ($argv -join " ")))
  $old = @{}
  $env2 = @{ PYTHONUTF8 = "1" }   # create_release 打印 '✓'，重定向管道下须固定 UTF-8 防 GBK 编码崩溃
  if ($extraEnv) { foreach ($k in $extraEnv.Keys) { $env2[$k] = $extraEnv[$k] } }
  foreach ($k in $env2.Keys) { $old[$k] = [Environment]::GetEnvironmentVariable($k); [Environment]::SetEnvironmentVariable($k, $env2[$k]) }
  try {
    Push-Location $cwdir
    # Windows PowerShell 5.1：EAP=Stop 时 native stderr 经 2>&1 会被包装为 ErrorRecord 并抛出；
    # 探针类调用（如 nocrypto runtime 的预期 Traceback）必须允许 stderr——局部降级。
    $prevEap = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    try { $out = & $py @argv 2>&1 | Out-String } finally { $ErrorActionPreference = $prevEap; Pop-Location }
    return @{ Code = $LASTEXITCODE; Out = $out }
  } finally {
    foreach ($k in $old.Keys) { [Environment]::SetEnvironmentVariable($k, $old[$k]) }
  }
}

Write-Host "== P14.3 Portable Runtime clean-room proof =="
if (-not (Test-Path $controlledPy)) { throw "受控 runtime 不存在（python\python.exe）" }

# ── S1 干净 proof 目录 ──
if (Test-Path $proof) { Remove-Item $proof -Recurse -Force -Confirm:$false }
foreach ($d in @("", "fixtures", "build", "extracted", "gate-denied", "drivers")) {
  New-Item -ItemType Directory -Path (Join-Path $proof $d) -Force | Out-Null
}
Check "S1 干净 proof 目录建立（%TEMP%\studytools-p14-3-proof）" $true

# ── S2 provision（幂等；受控 runtime 已装配时不触碰任何 pip）──
$prov = Join-Path $root "tools\provision_runtime.ps1"
$script:procAudit += (Redact "pwsh -NoProfile -File $prov")
$provOut = & pwsh -NoProfile -ExecutionPolicy Bypass -File $prov 2>&1 | Out-String
Check "S2 provision_runtime 幂等通过" ($LASTEXITCODE -eq 0) ($provOut.Trim().Split("`n")[-1])

# ── S3 测试签名密钥 fixture（generate_dev_keypair，非生产私钥）──
$fixKey = Join-Path $proof "fixtures\test-signing-key.pem"
$fixPub = Join-Path $proof "fixtures\test-signing-key.pub.pem"
$r = RunPy $controlledPy @("-c", @"
import sys, os
sys.path.insert(0, os.environ['ST_ROOT'])
from updater.sign_verify import generate_dev_keypair
pub, priv = generate_dev_keypair()
open(os.environ['ST_PUB'], 'wb').write(pub)
open(os.environ['ST_KEY'], 'wb').write(priv)
print('FIXTURE-KEYPAIR-OK')
"@) $root @{ ST_ROOT = $root; ST_KEY = $fixKey; ST_PUB = $fixPub }
Check "S3 dev 测试密钥对 fixture 生成" (($r.Code -eq 0) -and $r.Out.Contains("FIXTURE-KEYPAIR-OK")) $r.Out.Trim()

# ── S4 create_release → Portable zip（干净输出目录）──
$driverRelease = Join-Path $proof "drivers\driver_release.py"
@'
import importlib.util, os, sys
root = os.environ["ST_ROOT"]
sys.path.insert(0, root)
spec = importlib.util.spec_from_file_location("create_release", os.path.join(root, "tools", "create_release.py"))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
r = m.create_release(
    version=os.environ["ST_VER"], channel="stable",
    release_notes="P14.3 clean portable runtime proof (test-fixture signing only)",
    output_dir=os.environ["ST_OUT"], private_key_path=os.environ["ST_KEY"])
print("ZIPNAME=" + os.path.basename(r["zip_path"]))
print("FILECOUNT=%d" % r["file_count"])
print("SIZEMB=%.1f" % (r["size_bytes"] / 1048576.0))
'@ | Set-Content $driverRelease -Encoding UTF8
$buildDir = Join-Path $proof "build"
$r = RunPy $controlledPy @($driverRelease) $root @{ ST_ROOT = $root; ST_VER = $ver; ST_OUT = $buildDir; ST_KEY = $fixKey }
$zipPath = Join-Path $buildDir "StudyTools-Windows-x64-$ver.zip"
$zipLine = ($r.Out -split "`n" | Where-Object { $_ -match "ZIPNAME=|FILECOUNT=|SIZEMB=" }) -join " "
Check "S4 create_release 产出 Portable zip" (($r.Code -eq 0) -and (Test-Path $zipPath)) $zipLine
Check "S4 发布 artifacts 齐备（sha256/manifest/sig）" ((Test-Path "$zipPath.sha256") -and (Test-Path (Join-Path $buildDir "release-manifest.json")) -and (Test-Path (Join-Path $buildDir "release-manifest.json.sig")))

# ── S5 Release gate 负面：真实缺 cryptography 的 runtime ──
$noCrypto = Join-Path $proof "runtime-nocrypto"
Copy-Item (Join-Path $root "python") $noCrypto -Recurse
Get-ChildItem (Join-Path $noCrypto "Lib\site-packages") -Filter "cryptography*" | Remove-Item -Recurse -Force -Confirm:$false
$noCryptoPy = Join-Path $noCrypto "python.exe"
$probe = RunPy $noCryptoPy @("-c", "import cryptography") $proof @{}
Check "S5 nocrypto runtime 构造成功（import cryptography 必失败）" ($probe.Code -ne 0)

$driverGate = Join-Path $proof "drivers\driver_gate.py"
@'
import glob, importlib.util, os, sys
root = os.environ["ST_ROOT"]
sys.path.insert(0, root)
spec = importlib.util.spec_from_file_location("create_release", os.path.join(root, "tools", "create_release.py"))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
mode = os.environ["ST_MODE"]
if mode == "deny":
    nocrypto = os.environ["ST_NOCRYPTO_PY"]
    try:
        m.verify_runtime_signature_dependency(runtime_py=nocrypto)
        print("GATE1-UNEXPECTED-PASS")
    except RuntimeError as e:
        print("GATE1-DENIED-OK:", str(e)[:60])
    orig = m.verify_runtime_signature_dependency
    m.verify_runtime_signature_dependency = lambda runtime_py=None, _o=orig, _n=nocrypto: _o(runtime_py=_n)
    try:
        m.create_release(version="0.0.0-gate-denied", channel="stable", release_notes="",
                         output_dir=os.environ["ST_DENIED_OUT"], private_key_path=os.environ["ST_KEY"])
        print("GATE2-UNEXPECTED-PASS")
    except RuntimeError as e:
        print("GATE2-CREATE-RELEASE-DENIED-OK:", str(e)[:60])
    zips = glob.glob(os.path.join(os.environ["ST_DENIED_OUT"], "*.zip"))
    print("GATE3-NO-ZIP-OK" if not zips else "GATE3-ZIP-LEAKED:%d" % len(zips))
else:
    m.verify_runtime_signature_dependency(runtime_py=os.environ["ST_TARGET_PY"])
    print("GATE-PASS-OK")
'@ | Set-Content $driverGate -Encoding UTF8
$deniedOut = Join-Path $proof "gate-denied"
$r = RunPy $controlledPy @($driverGate) $root @{ ST_ROOT = $root; ST_MODE = "deny"; ST_NOCRYPTO_PY = $noCryptoPy; ST_DENIED_OUT = $deniedOut; ST_KEY = $fixKey }
Check "S5 gate 拒绝缺依赖 runtime（verify_runtime_signature_dependency）" $r.Out.Contains("GATE1-DENIED-OK")
Check "S5 create_release 对缺依赖 runtime 明确失败" $r.Out.Contains("GATE2-CREATE-RELEASE-DENIED-OK")
Check "S5 失败路径不生成可发布 zip" $r.Out.Contains("GATE3-NO-ZIP-OK")

# ── S6 解压到全新目录 ──
$extracted = Join-Path $proof "extracted"
$script:procAudit += "Expand-Archive (PowerShell 内置)"
Expand-Archive -Path $zipPath -DestinationPath $extracted -Force
$portablePy = Join-Path $extracted "python\python.exe"
Check "S6 zip 解压到全新目录，包内含 runtime 与 server" ((Test-Path $portablePy) -and (Test-Path (Join-Path $extracted "server.py")) -and (Test-Path (Join-Path $extracted "updater\sign_verify.py")))
Check "S6 包内不含 node_modules/.git/tools/tests" (-not ((Test-Path (Join-Path $extracted "node_modules")) -or (Test-Path (Join-Path $extracted ".git")) -or (Test-Path (Join-Path $extracted "tools")) -or (Test-Path (Join-Path $extracted "tests"))))

# ── S7 仅用包内 runtime：cryptography / Ed25519 / 路径自包含 ──
$r = RunPy $portablePy @("-c", "import cryptography, os, sys; print('CRYPTO=' + cryptography.__version__); print('EXE-DIR=' + os.path.basename(os.path.dirname(sys.executable)))") $extracted @{}
Check "S7 包内 runtime import cryptography" (($r.Code -eq 0) -and $r.Out.Contains("CRYPTO=")) (($r.Out -split "`n")[0])
$r = RunPy $portablePy @("-c", "from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey; print('ED25519-OK')") $extracted @{}
Check "S7 包内 runtime 加载 Ed25519PublicKey" (($r.Code -eq 0) -and $r.Out.Contains("ED25519-OK"))
$r = RunPy $portablePy @("-c", @"
import sys, os
base = os.path.dirname(os.path.abspath(sys.executable))
bad = [p for p in sys.path if p and not os.path.abspath(p).lower().startswith(base.lower())]
print('SELF-CONTAINED-OK' if not bad else 'PATH-LEAK:' + ';'.join(bad))
print('EXECUTABLE-DIRNAME=' + os.path.basename(base))
"@) $extracted @{}
Check "S7 包内 sys.path 全部位于包内（不吸系统 site-packages）" $r.Out.Contains("SELF-CONTAINED-OK") (($r.Out -split "`n")[0])
$r = RunPy $controlledPy @($driverGate) $root @{ ST_ROOT = $root; ST_MODE = "pass"; ST_TARGET_PY = $portablePy }
Check "S7 解压后的真实 runtime 通过 Release gate" $r.Out.Contains("GATE-PASS-OK")

# ── S8 仅包内 runtime 启动 server → 页面 → 更新检查 ──
$port = Get-Random -Minimum 42000 -Maximum 55000
$script:procAudit += (Redact "$portablePy server.py $port --launcher (cwd=extracted)")
$server = Start-Process -FilePath $portablePy -ArgumentList @("server.py", "$port", "--launcher") -WorkingDirectory $extracted -PassThru -WindowStyle Hidden
try {
  $up = $false
  foreach ($i in 1..60) {
    try { if ((Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:$port/index.html" -TimeoutSec 3).StatusCode -eq 200) { $up = $true; break } } catch {}
    Start-Sleep -Milliseconds 400
  }
  Check "S8 包内 runtime 启动 server 并提供页面 (GET /index.html=200)" $up
  $page = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:$port/index.html" -TimeoutSec 10
  Check "S8 页面内容非空且含应用骨架" (($page.Content.Length -gt 10000) -and ($page.Content -match "main-app-body"))

  $state0 = (Invoke-RestMethod -Uri "http://127.0.0.1:$port/api/updater/state" -TimeoutSec 10).data
  Check "S8 更新器初态 signatureConfigured=true（非 securityUnavailable）" ($state0.signatureConfigured -eq $true) ("downloadStage=" + $state0.downloadStage)

  $check = $null
  try { $check = Invoke-RestMethod -Uri "http://127.0.0.1:$port/api/updater/check" -Method Post -ContentType "application/json" -Body "{}" -TimeoutSec 60 } catch { $check = @{ success = $false; error = @{ message = $_.Exception.Message } } }
  $checkText = ($check | ConvertTo-Json -Depth 6 -Compress)
  Check "S8 更新检查完成且非 'signature not configured'" (($checkText -notmatch "signature not configured") -and ($checkText -notmatch "签名验证未配置")) ($checkText.Substring(0, [Math]::Min(160, $checkText.Length)))

  $state1 = (Invoke-RestMethod -Uri "http://127.0.0.1:$port/api/updater/state" -TimeoutSec 10).data
  Check "S8 检查后 signatureConfigured 仍为 true" ($state1.signatureConfigured -eq $true) ("lastError=" + $state1.lastError)
  Check "S8 无自动 download（downloadStage=idle）" ($state1.downloadStage -eq "idle") ("downloadStage=" + $state1.downloadStage)
  Check "S8 无自动 apply（updateReady=false）" ($state1.updateReady -eq $false)
} finally {
  try { Stop-Process -Id $server.Id -Force -Confirm:$false } catch {}
}

# ── S9 包内 runtime 的 fail-closed fixture 验证（缺失/错误/篡改签名）──
$driverFail = Join-Path $proof "drivers\driver_failclosed.py"
@'
import os, sys
root = os.environ["ST_EXTRACTED"]
sys.path.insert(0, root)
from updater.sign_verify import sign_manifest, verify_manifest_signature
manifest = {"version": "9.9.9", "channel": "stable", "zipName": "x.zip",
            "sha256": "0" * 64, "minAppVersion": "9.9.9", "releaseNotes": [],
            "fileCount": 1, "sizeBytes": 1, "keyId": "prod-key-2026-r42"}
sig_dev = sign_manifest(manifest, os.environ["ST_KEY"])          # dev fixture 私钥签名
dev_pub = open(os.environ["ST_PUB"], "rb").read()
print("MISSING-SIG-CLOSED" if not verify_manifest_signature(manifest, "") else "MISSING-SIG-OPEN")
print("WRONG-SIG-CLOSED" if not verify_manifest_signature(manifest, sig_dev) else "WRONG-SIG-OPEN")  # 注册表 prod 公钥 vs dev 签名
print("VERIFIER-WORKS" if verify_manifest_signature(manifest, sig_dev, public_key_pem=dev_pub) else "VERIFIER-BROKEN")
tampered = dict(manifest, version="6.6.6")
print("TAMPER-CLOSED" if not verify_manifest_signature(tampered, sig_dev, public_key_pem=dev_pub) else "TAMPER-OPEN")
'@ | Set-Content $driverFail -Encoding UTF8
$r = RunPy $portablePy @($driverFail) $extracted @{ ST_EXTRACTED = $extracted; ST_KEY = $fixKey; ST_PUB = $fixPub }
Check "S9 缺失签名 fail closed" $r.Out.Contains("MISSING-SIG-CLOSED")
Check "S9 错误签名（dev 签名 vs 受信 keyId）fail closed" $r.Out.Contains("WRONG-SIG-CLOSED")
Check "S9 验证器自身工作（dev 公钥直验为 true）" $r.Out.Contains("VERIFIER-WORKS")
Check "S9 篡改 manifest fail closed" $r.Out.Contains("TAMPER-CLOSED")

# ── S10 进程审计 ──
Write-Host "`n-- 外部进程审计（应只含受控/包内 python 与 PowerShell 内置）--"
$script:procAudit | ForEach-Object { Write-Host ("  spawn: " + $_) }
$sysTools = $script:procAudit | Where-Object { $_ -match "(?i)\b(node(\.exe)?|git(\.exe)?|pip[0-9.]*(\.exe)?)\b" }
$sysPython = $script:procAudit | Where-Object { $_ -notmatch "%TEMP%" -and $_ -notmatch "<REPO>" -and $_ -match "(?i)python" }
Check "S10 未调用系统 Python/pip/Node/Git" ((-not $sysTools) -and (-not $sysPython))

$failed = @($script:results | Where-Object { -not $_.Ok })
Write-Host ("`n==== portable runtime proof: {0}/{1} PASS ====" -f ($script:results.Count - $failed.Count), $script:results.Count)
if ($failed.Count) { $failed | ForEach-Object { Write-Host ("  FAILED - " + $_.Name) }; exit 1 }
exit 0
