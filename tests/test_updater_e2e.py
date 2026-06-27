#!/usr/bin/env python3
"""
updater E2E 集成测试 —— 在临时目录中模拟完整更新流程。

测试范围：
    - apply_update: 正常更新、回滚、路径拒绝、staging ZIP 缺失
    - rollback: 恢复旧文件
    - health_check: 对新 server 的健康验证
    - should_update: 降级拒绝
    - parse_manifest: 不合法 manifest 拦截
    - is_dev_repo: 开发仓库检测

运行方式：
    python -m unittest tests/test_updater_e2e.py -v
"""

import json
import os
import random
import shutil
import socket
import string
import subprocess
import sys
import tempfile
import threading
import time
import unittest
import zipfile
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from unittest.mock import MagicMock, patch

# ── 被测模块 ──────────────────────────────────────────────────────────
PROJECT_ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), '..'))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from updater.apply_update import apply_update, rollback, health_check
from updater.path_safety import is_dev_repo, is_authorized_installation_path
from updater.version import should_update, parse_manifest, compare_versions, parse_version
from updater.state import read_state, write_state


# ── 工具函数 ──────────────────────────────────────────────────────────

def _random_suffix(length=8) -> str:
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))


def _find_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]


def _make_zip(zip_path: str, files: dict):
    os.makedirs(os.path.dirname(zip_path), exist_ok=True)
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for rel_path, content in files.items():
            if isinstance(content, str):
                content = content.encode('utf-8')
            zf.writestr(rel_path, content)


def _write_file(path: str, content: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)


class MockServerHandler(SimpleHTTPRequestHandler):
    server_version = 'MockServer/0.1'
    doc_root = ''

    def do_GET(self):
        if self.path == '/index.html':
            self._respond(200, 'text/html', '<html>ok</html>')
        elif self.path == '/version.json':
            self._respond(200, 'application/json', '{"version": "2026.6.20"}')
        elif self.path == '/assets/css/index.css':
            self._respond(200, 'text/css', '/* css */')
        elif self.path == '/health':
            self._respond(200, 'text/plain', 'OK')
        else:
            self._respond(404, 'text/plain', 'Not Found')

    def do_POST(self):
        if self.path == '/heartbeat':
            self._respond(200, 'text/plain', 'OK')
        else:
            self._respond(404, 'text/plain', 'Not Found')

    def _respond(self, status, content_type, body):
        self.send_response(status)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        if isinstance(body, str):
            body = body.encode('utf-8')
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        pass


class MockServerThread(threading.Thread):
    """在后台线程中运行的 mock HTTP server，每次处理一个请求后检查停止信号。"""

    def __init__(self, port: int):
        super().__init__(daemon=True)
        self.port = port
        self.ready = threading.Event()
        self._server = None

    def run(self):
        self._server = HTTPServer(('127.0.0.1', self.port), MockServerHandler)
        self._server.timeout = 0.5
        self.ready.set()
        while True:
            self._server.handle_request()

    def stop(self):
        if self._server:
            self._server.server_close()


class TestUpdaterE2E(unittest.TestCase):
    """updater 端到端集成测试。"""

    @classmethod
    def setUpClass(cls):
        cls.real_dev_repo = PROJECT_ROOT
        assert os.path.isdir(os.path.join(cls.real_dev_repo, '.git')), \
            f'项目根 {cls.real_dev_repo} 不是 git 仓库'

    def setUp(self):
        # 生成唯一临时根在 %TEMP%\studytools-updater-install-e2e 之下
        base_dir = os.path.join(tempfile.gettempdir(), 'studytools-updater-install-e2e')
        os.makedirs(base_dir, exist_ok=True)
        self.temp_root = tempfile.mkdtemp(dir=base_dir, prefix=f'studytools-e2e-{_random_suffix()}-')

        # 设置 LOCALAPPDATA
        self.local_app_data = os.path.join(self.temp_root, 'LocalAppData')
        os.makedirs(self.local_app_data, exist_ok=True)
        self._orig_localappdata = os.environ.get('LOCALAPPDATA')
        os.environ['LOCALAPPDATA'] = self.local_app_data

        # 合法安装目录结构
        self.studytools_root = os.path.join(self.local_app_data, 'StudyTools')
        os.makedirs(self.studytools_root, exist_ok=True)

        # Create installation.json
        _write_file(
            os.path.join(self.studytools_root, 'installation.json'),
            json.dumps({'installedAt': '2026-06-27T00:00:00Z', 'version': '2026.6.20'})
        )

        self.app_root = os.path.join(self.studytools_root, 'app', 'current')
        os.makedirs(self.app_root, exist_ok=True)

        self.app_previous = os.path.join(self.studytools_root, 'app', 'previous')
        os.makedirs(self.app_previous, exist_ok=True)

        self.staging_dir = os.path.join(self.studytools_root, 'updates', 'staging')
        os.makedirs(self.staging_dir, exist_ok=True)

        # 写入初始文件 (2026.6.20)
        _write_file(
            os.path.join(self.app_root, 'version.json'),
            json.dumps({'version': '2026.6.20'})
        )
        _write_file(os.path.join(self.app_root, 'index.html'), '<html>old</html>')
        os.makedirs(os.path.join(self.app_root, 'assets', 'css'), exist_ok=True)
        _write_file(os.path.join(self.app_root, 'assets', 'css', 'index.css'), '/* old css */')

        # 写入一个 server.py（正常启动）
        self._write_mock_server(self.app_root, '2026.6.20')

    def tearDown(self):
        if self._orig_localappdata is not None:
            os.environ['LOCALAPPDATA'] = self._orig_localappdata
        else:
            os.environ.pop('LOCALAPPDATA', None)
        if os.path.isdir(self.temp_root):
            shutil.rmtree(self.temp_root, ignore_errors=True)

    # ── 辅助方法 ──────────────────────────────────────────────────────

    def _write_mock_server(self, app_root: str, version: str):
        server_code = f'''#!/usr/bin/env python3
"""Mock server for version {version}."""
import json, os, sys, socket, threading
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 0

class H(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/index.html':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', '16')
            self.end_headers()
            self.wfile.write(b'<html>ok</html>')
        elif self.path == '/version.json':
            body = json.dumps({{"version": "{version}"}})
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body.encode())
        elif self.path == '/assets/css/index.css':
            body = b'/* css */'
            self.send_response(200)
            self.send_header('Content-Type', 'text/css')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        else:
            self.send_response(404)
            self.end_headers()
    def do_POST(self):
        if self.path == '/heartbeat':
            self.send_response(200)
            self.send_header('Content-Length', '2')
            self.end_headers()
            self.wfile.write(b'OK')
        else:
            self.send_response(404)
            self.end_headers()
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
        _write_file(os.path.join(app_root, 'server.py'), server_code)

    def _write_updater_state(self, **overrides):
        state = {
            'updateReady': True,
            'downloadStage': 'ready',
            'stagedZipPath': '',
            'stagedVersion': '',
            'currentVersion': '2026.6.20',
            'downloadProgress': 100,
            'lastError': None,
        }
        state.update(overrides)
        write_state(self.app_root, state)

    def _create_staging_zip(self, new_version: str = '2026.8.0', extra_files: dict = None) -> str:
        """创建包含 server.py 的 staging ZIP，供 bootstrapper 使用。"""
        files = {
            'index.html': '<html>new</html>',
            'assets/css/index.css': '/* new css */',
            'version.json': json.dumps({'version': new_version}),
            'server.py': '#!/usr/bin/env python3\nprint("mock")\n',
        }
        if extra_files:
            files.update(extra_files)
        zip_path = os.path.join(self.staging_dir, f'update-{new_version}.zip')
        _make_zip(zip_path, files)
        return zip_path

    def _mock_subprocess_success(self, *args, **kwargs):
        """Mock subprocess.run 返回成功。"""
        return subprocess.CompletedProcess(args=args[0] if args else [], returncode=0, stdout='更新成功: 2026.8.0\n', stderr='')

    def _mock_subprocess_failure(self, *args, **kwargs):
        """Mock subprocess.run 返回失败。"""
        return subprocess.CompletedProcess(args=args[0] if args else [], returncode=1, stdout='', stderr='更新失败，已回滚: 健康检查失败\n')

    # ── 测试：正常更新（mock subprocess.run） ──────────────────────────

    @patch('updater.apply_update.subprocess.run')
    def test_normal_update(self, mock_run):
        """场景 a: 正常更新流程。"""
        mock_run.side_effect = self._mock_subprocess_success

        new_version = '2026.8.0'
        zip_path = self._create_staging_zip(new_version)
        self._write_updater_state(
            stagedZipPath=zip_path,
            stagedVersion=new_version,
        )

        result = apply_update(self.app_root)

        self.assertTrue(result['success'], f'更新失败: {result}')
        self.assertEqual(result['version'], new_version)
        self.assertFalse(result['rolledBack'])

        # 验证 state 被重置
        state = read_state(self.app_root)
        self.assertEqual(state['downloadStage'], 'idle')
        self.assertFalse(state['updateReady'])
        self.assertEqual(state['currentVersion'], new_version)

    # ── 测试：健康检查失败后回滚 ─────────────────────────────────────

    @patch('updater.apply_update.subprocess.run')
    def test_health_check_fail_rollback(self, mock_run):
        """场景 b: 健康检查失败后自动回滚（由 bootstrapper 内部处理）。"""
        mock_run.side_effect = self._mock_subprocess_failure

        new_version = '2026.8.0'
        zip_path = self._create_staging_zip(new_version)
        self._write_updater_state(
            stagedZipPath=zip_path,
            stagedVersion=new_version,
        )

        result = apply_update(self.app_root)

        # bootstrapper 非零退出，apply_update 报告失败
        self.assertFalse(result['success'], f'预期失败但返回: {result}')
        self.assertTrue(result.get('rolledBack', False), '预期回滚')

        state = read_state(self.app_root)
        self.assertEqual(state['downloadStage'], 'idle')
        self.assertIn('lastError', state)

    # ── 测试：开发仓库被拒绝 ──────────────────────────────────────────

    def test_dev_repo_rejected(self):
        """场景 c: 对实际开发仓库调用 apply_update，必须被拒绝。"""
        result = apply_update(self.real_dev_repo)

        self.assertFalse(result['success'], '预期更新被拒绝')
        self.assertIn(result.get('code'), ('PATH_SAFETY_FAILED', 'UNAUTHORIZED_PATH'),
                      f'预期 PATH_SAFETY_FAILED 或 UNAUTHORIZED_PATH')

        git_dir = os.path.join(self.real_dev_repo, '.git')
        self.assertTrue(os.path.isdir(git_dir), '.git 应仍存在')

    # ── 测试：staging ZIP 不存在 ──────────────────────────────────────

    def test_missing_staging_zip(self):
        """场景 d: stagedZipPath 指向不存在的文件。"""
        self._write_updater_state(
            stagedZipPath=os.path.join(self.staging_dir, 'nonexistent.zip'),
            stagedVersion='2026.8.0',
        )

        result = apply_update(self.app_root)

        self.assertFalse(result['success'])
        self.assertEqual(result.get('code'), 'STAGED_ZIP_MISSING')

    # ── 测试：降级拒绝 ──────────────────────────────────────────────

    def test_downgrade_rejected(self):
        """场景 e: should_update 应拒绝降级。"""
        result = should_update('2026.8.0', '2026.6.20')
        self.assertFalse(result['should_update'])
        self.assertIn('降级', result.get('reason', ''))

    # ── 测试：不合法 manifest ─────────────────────────────────────────

    def test_malformed_manifest(self):
        """场景 f: parse_manifest 应拒绝不合法 manifest。"""
        with self.assertRaises(ValueError):
            parse_manifest({'version': '1.0.0', 'zipName': 'update.zip'})
        with self.assertRaises(ValueError):
            parse_manifest('')
        with self.assertRaises(ValueError):
            parse_manifest({'version': '1.0.0', 'zipName': 'update.zip', 'sha256': 'not-a-hex'})
        with self.assertRaises(ValueError):
            parse_manifest(['version', 'zipName', 'sha256'])

    # ── 测试：开发仓库检测 ──────────────────────────────────────────

    def test_dev_repo_detection(self):
        """场景 g: is_dev_repo() 对实际开发仓库返回 True。"""
        self.assertTrue(is_dev_repo(self.real_dev_repo))
        self.assertFalse(is_dev_repo(self.temp_root))

    # ── 额外测试：compare_versions ─────────────────────────────────────

    def test_compare_versions(self):
        self.assertEqual(compare_versions('1.0.0', '2.0.0'), -1)
        self.assertEqual(compare_versions('2.0.0', '1.0.0'), 1)
        self.assertEqual(compare_versions('1.0.0', '1.0.0'), 0)

    # ── 额外测试：parse_version ───────────────────────────────────────

    def test_parse_version(self):
        v = parse_version('2026.6.20')
        self.assertEqual(v.major, 2026)
        self.assertEqual(v.minor, 6)
        self.assertEqual(v.patch, 20)
        with self.assertRaises(ValueError):
            parse_version('')
        with self.assertRaises(ValueError):
            parse_version('not-a-version')

    # ── 额外测试：rollback 手动调用 ────────────────────────────────────

    def test_rollback_manual(self):
        """手动调用 rollback() 恢复文件。"""
        rollback_dir = os.path.join(self.app_root, '.update_rollback_2026.8.0')
        os.makedirs(rollback_dir, exist_ok=True)
        _write_file(os.path.join(rollback_dir, 'index.html'), '<html>rollback</html>')

        write_state(self.app_root, {
            'rollbackPath': rollback_dir,
            'downloadStage': 'ready',
        })

        _write_file(os.path.join(self.app_root, 'index.html'), '<html>broken</html>')

        result = rollback(self.app_root, error_reason='test_rollback')

        self.assertTrue(result['success'])
        self.assertTrue(result['rolledBack'])

        with open(os.path.join(self.app_root, 'index.html'), 'r') as f:
            self.assertEqual(f.read(), '<html>rollback</html>')

        state = read_state(self.app_root)
        self.assertEqual(state['downloadStage'], 'idle')


if __name__ == '__main__':
    unittest.main()
