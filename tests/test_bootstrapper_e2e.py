#!/usr/bin/env python3
"""
bootstrapper 真实 E2E 集成测试 —— 不 mock restart_server / health_check。

运行实际 bootstrapper 子进程，验证完整交换流程：

    正常路径：setup → 创建 staging → apply_update → real bootstrapper
              → _restart_server(真实 server.py) → _health_check(真实 HTTP)
              → 文件交换成功
    回滚路径：server.py 报告错误版本 → health check 失败 → 自动回滚

运行方式：
    python -m unittest tests/test_bootstrapper_e2e.py -v
"""

import json
import os
import shutil
import signal
import subprocess
import sys
import tempfile
import threading
import time
import unittest
import zipfile
from http.server import HTTPServer, SimpleHTTPRequestHandler

# ── 项目根 ──────────────────────────────────────────────────────────────
PROJECT_ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), '..'))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)


def _write_file(path: str, content: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)


def _write_json(path: str, data: dict):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f)


def _write_state(state_dir: str, data: dict):
    """写 updater-state.json（位于 app_dir 的同级）。"""
    _write_json(os.path.join(state_dir, 'updater-state.json'), data)


MOCK_SERVER_TEMPLATE = '''#!/usr/bin/env python3
"""Mock server v{version}"""
import json, os, sys, threading, time
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 0
VERSION = "{version}"

class H(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/index.html':
            self._ok('text/html', b'<html>ok</html>')
        elif self.path == '/version.json':
            self._ok('application/json', json.dumps({{"version": VERSION}}).encode())
        elif self.path.startswith('/assets/css/'):
            self._ok('text/css', b'/* css */')
        elif self.path == '/heartbeat':
            self._ok('text/plain', b'OK')
        else:
            self.send_response(404)
            self.end_headers()
    def do_POST(self):
        if self.path == '/heartbeat':
            self._ok('text/plain', b'OK')
        else:
            self.send_response(404)
            self.end_headers()
    def _ok(self, ct, body):
        self.send_response(200)
        self.send_header('Content-Type', ct)
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)
    def log_message(self, fmt, *args):
        pass

server = HTTPServer(('127.0.0.1', PORT), H)
t = threading.Thread(target=server.serve_forever, daemon=True)
t.start()
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    server.shutdown()
'''


class TestBootstrapperRealE2E(unittest.TestCase):
    """真实 bootstrapper E2E：不 mock restart_server / health_check。"""

    def setUp(self):
        base_dir = os.path.join(tempfile.gettempdir(), 'studytools-updater-install-e2e')
        os.makedirs(base_dir, exist_ok=True)
        self.temp = tempfile.TemporaryDirectory(dir=base_dir)

        # LOCALAPPDATA 设置
        self.local_appdata = os.path.join(self.temp.name, 'LocalAppData')
        os.makedirs(self.local_appdata, exist_ok=True)
        self._orig_localappdata = os.environ.get('LOCALAPPDATA')
        os.environ['LOCALAPPDATA'] = self.local_appdata

        # 安装目录结构
        self.studytools_root = os.path.join(self.local_appdata, 'StudyTools')
        self.app_root = os.path.join(self.studytools_root, 'app', 'current')
        self.state_dir = os.path.dirname(self.app_root)  # app/ 目录
        os.makedirs(self.app_root, exist_ok=True)

        # Create installation.json
        _write_json(os.path.join(self.studytools_root, 'installation.json'), {'installedAt': '2026-06-27T00:00:00Z', 'version': '2026.6.20'})

        # 初始文件（2026.6.20）
        _write_json(os.path.join(self.app_root, 'version.json'), {'version': '2026.6.20'})
        _write_file(os.path.join(self.app_root, 'index.html'), '<html>old</html>')
        _write_file(os.path.join(self.app_root, 'app.js'), 'old app')
        os.makedirs(os.path.join(self.app_root, 'assets', 'css'), exist_ok=True)
        _write_file(os.path.join(self.app_root, 'assets', 'css', 'index.css'), '/* old css */')

        # 可正常启动的 server.py
        _write_file(
            os.path.join(self.app_root, 'server.py'),
            MOCK_SERVER_TEMPLATE.format(version='2026.6.20'),
        )

        # staging ZIP
        self.staging_dir = os.path.join(self.studytools_root, 'updates', 'staging')
        os.makedirs(self.staging_dir, exist_ok=True)

    def tearDown(self):
        if self._orig_localappdata is not None:
            os.environ['LOCALAPPDATA'] = self._orig_localappdata
        else:
            os.environ.pop('LOCALAPPDATA', None)
        # Kill any server.py subprocesses still holding app_root open
        if os.name == 'nt':
            subprocess.run(
                ['taskkill', '/F', '/FI', 'WINDOWTITLE eq server.py*'],
                capture_output=True, shell=False,
            )
        # Retry cleanup for Windows file locks
        for attempt in range(5):
            try:
                shutil.rmtree(self.temp.name, ignore_errors=False)
                break
            except PermissionError:
                time.sleep(0.5)
        else:
            shutil.rmtree(self.temp.name, ignore_errors=True)

    def _create_staging_zip(self, new_version='2026.8.0',
                            server_version=None) -> tuple:
        """创建 staging ZIP 并解压，返回 (zip_path, staging_extract_dir)."""
        import zipfile

        sv = server_version if server_version else new_version
        files = {
            'index.html': '<html>new</html>',
            'app.js': 'new app',
            'assets/css/index.css': '/* new css */',
            'version.json': json.dumps({'version': new_version}),
            'server.py': MOCK_SERVER_TEMPLATE.format(version=sv),
        }

        zip_dir = os.path.join(self.staging_dir, f'_zip_{new_version}')
        os.makedirs(zip_dir, exist_ok=True)
        zip_path = os.path.join(zip_dir, f'update-{new_version}.zip')

        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
            for rel_path, content in files.items():
                zf.writestr(rel_path, content if isinstance(content, bytes) else content.encode('utf-8'))

        # 解压到 staging_extract（bootstrapper 将用 --staging-dir 指向此处）
        staging_extract_dir = os.path.join(zip_dir, 'extracted')
        with zipfile.ZipFile(zip_path, 'r') as zf:
            zf.extractall(staging_extract_dir)

        return zip_path, staging_extract_dir

    def _write_state(self, **overrides):
        state = {
            'updateReady': True,
            'downloadStage': 'ready',
        }
        state.update(overrides)
        _write_state(self.state_dir, state)

    def _read_state(self) -> dict:
        p = os.path.join(self.state_dir, 'updater-state.json')
        if not os.path.isfile(p):
            return {}
        with open(p, 'r', encoding='utf-8') as f:
            return json.load(f)

    def _find_bootstrap_script(self) -> str:
        """找到 bootstrapper 脚本的绝对路径。"""
        candidates = [
            os.path.join(PROJECT_ROOT, 'bootstrapper', 'bootstrap.py'),
            os.path.join(PROJECT_ROOT, '..', 'bootstrapper', 'bootstrap.py'),
        ]
        for c in candidates:
            if os.path.isfile(c):
                return os.path.normpath(c)
        self.fail(f'bootstrapper 未找到 (search: {candidates})')

    # ── 测试 1：真实 bootstrapper 成功 ├正常 swap ────────────────────

    def test_real_bootstrapper_success(self):
        """场景 1：完整更新——bootstrapper 真实运行不 mock。"""
        new_version = '2026.8.0'
        zip_path, staging_extract = self._create_staging_zip(new_version)
        self._write_state(stagedZipPath=zip_path, stagedVersion=new_version)

        bootstrap_script = self._find_bootstrap_script()
        env = os.environ.copy()

        proc = subprocess.run(
            [sys.executable, bootstrap_script,
             '--app-root', self.app_root,
             '--version', new_version,
             '--staging-dir', staging_extract,
             '--timeout', '30'],
            capture_output=True, text=True, env=env,
            timeout=60,
        )

        if proc.returncode != 0:
            self.fail(f'bootstrapper 失败 (rc={proc.returncode}): '
                      f'stderr={proc.stderr}, stdout={proc.stdout}')

        # 验证文件已更新
        with open(os.path.join(self.app_root, 'index.html')) as f:
            self.assertEqual(f.read(), '<html>new</html>')
        with open(os.path.join(self.app_root, 'assets', 'css', 'index.css')) as f:
            self.assertEqual(f.read(), '/* new css */')

        # 验证 version.json 已更新
        with open(os.path.join(self.app_root, 'version.json')) as f:
            data = json.load(f)
        self.assertEqual(data['version'], new_version)

        # 验证 state
        state = self._read_state()
        self.assertEqual(state.get('currentVersion'), new_version)
        self.assertFalse(state.get('updateReady', True))

    # ── 测试 2：bootstrapper 健康检查失败 → 回滚 ───────────────────

    def test_real_bootstrapper_health_fail_rollback(self):
        """场景 2：server.py 报告错误版本 → health check 失败 → 自动回滚。"""
        new_version = '2026.8.0'

        # server.py 报告旧版本 → health check 检测到版本不匹配
        zip_path, staging_extract = self._create_staging_zip(
            new_version, server_version='2026.6.20',
        )
        self._write_state(stagedZipPath=zip_path, stagedVersion=new_version)

        bootstrap_script = self._find_bootstrap_script()
        env = os.environ.copy()

        proc = subprocess.run(
            [sys.executable, bootstrap_script,
             '--app-root', self.app_root,
             '--version', new_version,
             '--staging-dir', staging_extract,
             '--timeout', '15'],
            capture_output=True, text=True, env=env,
            timeout=60,
        )

        # bootstrapper 应失败并回滚
        self.assertNotEqual(proc.returncode, 0,
                            f'预期 bootstrapper 失败，但返回 0: {proc.stdout}')

        # 验证文件恢复到旧版本
        with open(os.path.join(self.app_root, 'index.html')) as f:
            self.assertEqual(f.read(), '<html>old</html>')

        with open(os.path.join(self.app_root, 'version.json')) as f:
            data = json.load(f)
        self.assertEqual(data['version'], '2026.6.20')

        # 验证 state
        state = self._read_state()
        self.assertFalse(state.get('updateReady', True))
        self.assertIn('lastError', state)

    # ── 测试 3：bootstrapper 拒绝非 LOCALAPPDATA 路径 ─────────────

    def test_real_bootstrapper_path_rejected(self):
        """场景 3：路径不在 LOCALAPPDATA 下 → bootstrapper 拒绝。"""
        fake_root = os.path.join(self.temp.name, 'NotInLocalAppData', 'app', 'current')
        os.makedirs(fake_root, exist_ok=True)

        staging = os.path.join(fake_root, '_staging')
        os.makedirs(staging, exist_ok=True)

        _write_file(os.path.join(fake_root, 'version.json'), '{}')

        bootstrap_script = self._find_bootstrap_script()
        env = os.environ.copy()

        proc = subprocess.run(
            [sys.executable, bootstrap_script,
             '--app-root', fake_root,
             '--version', '1.0.0',
             '--staging-dir', staging,
             '--timeout', '5'],
            capture_output=True, text=True, env=env,
            timeout=30,
        )

        self.assertNotEqual(proc.returncode, 0,
                            'bootstrapper 应拒绝未授权路径')
        self.assertIn('路径', proc.stderr or '')

    # ── 测试 4：bootstrapper 拒绝已知开发仓库路径 ──────────────────────

    def test_real_bootstrapper_dev_repo_rejected(self):
        """场景 4：已知开发仓库路径（G:\项目\sql-learning-hub）→ bootstrapper 拒绝。"""
        # 使用实际开发仓库路径
        dev_repo_path = os.path.normpath(PROJECT_ROOT)
        staging = os.path.join(self.staging_dir, '_staging_dev')
        os.makedirs(staging, exist_ok=True)

        bootstrap_script = self._find_bootstrap_script()
        env = os.environ.copy()

        proc = subprocess.run(
            [sys.executable, bootstrap_script,
             '--app-root', dev_repo_path,
             '--version', '1.0.0',
             '--staging-dir', staging,
             '--timeout', '5'],
            capture_output=True, text=True, env=env,
            timeout=30,
        )

        self.assertNotEqual(proc.returncode, 0,
                            'bootstrapper 应拒绝开发仓库')
        stderr = proc.stderr or ''
        # 应包含开发仓库或 .git 相关拒绝信息
        self.assertTrue(
            '开发仓库' in stderr or '.git' in stderr or '拒绝' in stderr,
            f'stderr 应包含拒绝信息: {stderr}'
        )


if __name__ == '__main__':
    unittest.main(verbosity=2)
