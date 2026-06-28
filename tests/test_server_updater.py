#!/usr/bin/env python3
"""Test suite for server.py updater API safety checks"""

import json
import os
import socket
import sys
import tempfile
import threading
import time
import unittest
import urllib.request
import urllib.parse
from http.server import HTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

# Setup temporary local app data for tests
temp_dir = tempfile.TemporaryDirectory()
orig_localappdata = os.environ.get('LOCALAPPDATA')
os.environ['LOCALAPPDATA'] = os.path.join(temp_dir.name, 'LocalAppData')

# Create installation.json in local app data to satisfy path_safety checks
install_root = os.path.join(os.environ['LOCALAPPDATA'], 'StudyTools')
os.makedirs(os.path.join(install_root, 'app', 'current'), exist_ok=True)
with open(os.path.join(install_root, 'installation.json'), 'w') as f:
    json.dump({'installedAt': '2026-06-27T00:00:00Z', 'version': '2026.7.1'}, f)

def get_free_port():
    s = socket.socket()
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port

test_port = get_free_port()
sys.argv = [sys.argv[0], str(test_port)]

import server
from server import StudyHubHandler, _generate_csrf_token

class TestServerUpdaterAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = HTTPServer(('127.0.0.1', test_port), StudyHubHandler)
        cls.thread = threading.Thread(target=cls.server.serve_forever)
        cls.thread.daemon = True
        cls.thread.start()
        
    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()
        temp_dir.cleanup()
        if orig_localappdata:
            os.environ['LOCALAPPDATA'] = orig_localappdata
        else:
            os.environ.pop('LOCALAPPDATA', None)

    def _post(self, path, body, headers=None):
        url = f'http://127.0.0.1:{test_port}{path}'
        data = json.dumps(body).encode('utf-8')
        req = urllib.request.Request(url, data=data, method='POST')
        req.add_header('Content-Type', 'application/json')
        if headers:
            for k, v in headers.items():
                req.add_header(k, v)
        try:
            with urllib.request.urlopen(req, timeout=3) as resp:
                return resp.status, json.loads(resp.read().decode('utf-8'))
        except urllib.error.HTTPError as e:
            try:
                body_err = json.loads(e.read().decode('utf-8'))
            except Exception:
                body_err = None
            return e.code, body_err

    def test_apply_missing_origin(self):
        # 缺失 Origin 头部，返回 403
        code, body = self._post('/api/updater/apply', {'csrfToken': 'token'})
        self.assertEqual(code, 403)
        self.assertFalse(body['success'])
        self.assertEqual(body['error']['code'], 'UPDATER_ERROR')

    def test_apply_mismatched_origin(self):
        # Origin 与 Host 不匹配，返回 403
        headers = {
            'Origin': 'http://malicious-origin.com',
        }
        code, body = self._post('/api/updater/apply', {'csrfToken': 'token'}, headers)
        self.assertEqual(code, 403)
        self.assertFalse(body['success'])

    def test_apply_invalid_csrf(self):
        # Origin 合法但 CSRF token 无效，返回 403
        headers = {
            'Origin': f'http://127.0.0.1:{test_port}',
        }
        code, body = self._post('/api/updater/apply', {'csrfToken': 'invalid-csrf-token'}, headers)
        self.assertEqual(code, 403)
        self.assertFalse(body['success'])

    def test_apply_valid_csrf_success_or_no_update(self):
        # Origin 与 CSRF 均有效，但没有待执行的更新，返回 400 (NO_PENDING_UPDATE)
        headers = {
            'Origin': f'http://127.0.0.1:{test_port}',
        }
        token = _generate_csrf_token()
        
        # Mock APP_ROOT to satisfy authorized installation path check
        orig_app_root = server.APP_ROOT
        server.APP_ROOT = os.path.join(install_root, 'app', 'current')
        try:
            code, body = self._post('/api/updater/apply', {'csrfToken': token}, headers)
            # 因为没有 staged zip，所以 apply_update 返回 {'success': False, 'code': 'NO_PENDING_UPDATE'}，包裹在 200 data 内
            self.assertEqual(code, 200)
            self.assertTrue(body['success'])
            self.assertFalse(body['data']['success'])
            self.assertEqual(body['data']['code'], 'NO_PENDING_UPDATE')
            self.assertIn('没有待执行的更新', body['data']['error'])
        finally:
            server.APP_ROOT = orig_app_root


if __name__ == '__main__':
    unittest.main(verbosity=2, argv=[sys.argv[0]])
