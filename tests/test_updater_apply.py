#!/usr/bin/env python3
"""Test suite for updater/apply_update.py (R38.2 bootstrapper architecture)"""

import json
import os
import shutil
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from updater.apply_update import (
    apply_update,
    rollback,
    health_check,
    restart_server,
    _list_files_recursive,
    _cleanup_dir,
    _get_bootstrap_path,
)
from updater.state import write_state, read_state


def _create_file(directory, rel_path, content='test'):
    full = os.path.join(directory, rel_path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f:
        f.write(content)
    return full


def _create_version_json(directory, version='2026.8.0'):
    path = os.path.join(directory, 'version.json')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump({'version': version}, f)
    return path


class TestListFilesRecursive(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()

    def tearDown(self):
        self.temp.cleanup()

    def test_lists_all_files(self):
        _create_file(self.temp.name, 'a.txt')
        _create_file(self.temp.name, 'sub/b.txt')
        files = _list_files_recursive(self.temp.name)
        self.assertEqual(len(files), 2)
        self.assertIn('a.txt', files)
        self.assertIn(os.path.join('sub', 'b.txt'), files)

    def test_empty_directory(self):
        files = _list_files_recursive(self.temp.name)
        self.assertEqual(files, [])


class TestCleanupDir(unittest.TestCase):
    def test_removes_directory(self):
        temp = tempfile.TemporaryDirectory()
        path = temp.name
        temp.cleanup()
        _create_file(path, 'test.txt')
        _cleanup_dir(path)
        self.assertFalse(os.path.isdir(path))

    def test_nonexistent_directory(self):
        _cleanup_dir('/nonexistent/path')


class TestBootstrapPath(unittest.TestCase):
    def test_get_bootstrap_path_returns_path(self):
        path = _get_bootstrap_path()
        self.assertIsInstance(path, str)
        self.assertTrue(path.endswith('bootstrap.py'))


class TestApplyUpdate(unittest.TestCase):
    def setUp(self):
        base_dir = os.path.join(tempfile.gettempdir(), 'studytools-updater-install-e2e')
        os.makedirs(base_dir, exist_ok=True)
        self.temp = tempfile.TemporaryDirectory(dir=base_dir)
        self.local_appdata = os.path.join(self.temp.name, 'LocalAppData')
        os.makedirs(self.local_appdata, exist_ok=True)
        self._orig_localappdata = os.environ.get('LOCALAPPDATA')
        os.environ['LOCALAPPDATA'] = self.local_appdata

        self.studytools_root = os.path.join(self.local_appdata, 'StudyTools')
        self.app_root = os.path.join(self.studytools_root, 'app', 'current')
        os.makedirs(self.app_root, exist_ok=True)

        # Create installation.json
        with open(os.path.join(self.studytools_root, 'installation.json'), 'w') as f:
            json.dump({'installedAt': '2026-06-27T00:00:00Z', 'version': '2026.7.1'}, f)

        # Write initial files
        _create_file(self.app_root, 'index.html', '<html>old</html>')
        _create_file(self.app_root, 'assets/js/app.js', 'old app')
        _create_version_json(self.app_root, '2026.7.1')

        # Write server.py (required for bootstrapper validation)
        _create_file(self.app_root, 'server.py',
                     '#!/usr/bin/env python3\nprint("mock server")\n')

        # Create staging ZIP
        staging_dir = os.path.join(self.app_root, '.update_staging_2026.8.0')
        os.makedirs(staging_dir)
        import zipfile
        self.zip_path = os.path.join(staging_dir, 'StudyTools-Windows-x64-2026.8.0.zip')
        with zipfile.ZipFile(self.zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
            zf.writestr('index.html', '<html>new</html>')
            zf.writestr('assets/js/app.js', 'new app')
            zf.writestr('server.py', '#!/usr/bin/env python3\nprint("new server")\n')
            zf.writestr('version.json', json.dumps({'version': '2026.8.0'}))

        # Set updater state
        write_state(self.app_root, {
            'updateReady': True,
            'downloadStage': 'ready',
            'stagedZipPath': self.zip_path,
            'stagedVersion': '2026.8.0',
        })

    def tearDown(self):
        if self._orig_localappdata is not None:
            os.environ['LOCALAPPDATA'] = self._orig_localappdata
        else:
            os.environ.pop('LOCALAPPDATA', None)
        self.temp.cleanup()

    @patch('updater.apply_update.subprocess.run')
    def test_apply_success(self, mock_run):
        """Bootstrapper 返回 0 → 更新成功"""
        mock_proc = MagicMock()
        mock_proc.returncode = 0
        mock_proc.stdout = '更新成功: 2026.8.0\n'
        mock_proc.stderr = ''
        mock_run.return_value = mock_proc

        result = apply_update(self.app_root)

        self.assertTrue(result['success'])
        self.assertEqual(result['version'], '2026.8.0')
        self.assertFalse(result['rolledBack'])

        # Verify bootstrapper was called with correct args
        call_args = mock_run.call_args[0][0]
        self.assertTrue(any('bootstrap.py' in a for a in call_args),
                        f'bootstrapper 路径未在 args 中: {call_args}')
        self.assertIn('--app-root', call_args)
        self.assertIn('--version', call_args)
        self.assertIn('2026.8.0', call_args)
        self.assertIn('--staging-dir', call_args)

        # Verify state updated
        state = read_state(self.app_root)
        self.assertEqual(state['downloadStage'], 'idle')
        self.assertEqual(state['currentVersion'], '2026.8.0')

    @patch('updater.apply_update.subprocess.run')
    def test_apply_without_server_py_in_zip(self, mock_run):
        """ZIP 缺少 server.py → bootstrapper 不应被调用"""
        import zipfile
        bad_zip_path = self.zip_path.replace('.zip', '-noserver.zip')
        with zipfile.ZipFile(bad_zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
            zf.writestr('index.html', '<html>new</html>')

        write_state(self.app_root, {
            'updateReady': True,
            'downloadStage': 'ready',
            'stagedZipPath': bad_zip_path,
            'stagedVersion': '2026.8.0',
        })

        result = apply_update(self.app_root)

        self.assertFalse(result['success'])
        self.assertEqual(result.get('code'), 'MISSING_SERVER_PY')
        mock_run.assert_not_called()

    @patch('updater.apply_update.subprocess.run')
    def test_bootstrapper_failure(self, mock_run):
        """Bootstrapper 非零退出 → 失败"""
        mock_proc = MagicMock()
        mock_proc.returncode = 1
        mock_proc.stdout = ''
        mock_proc.stderr = '更新失败，已回滚: 健康检查失败\n'
        mock_run.return_value = mock_proc

        result = apply_update(self.app_root)

        self.assertFalse(result['success'])
        self.assertTrue(result.get('rolledBack', False))

    def test_no_pending_update(self):
        write_state(self.app_root, {'updateReady': False, 'downloadStage': 'idle'})
        result = apply_update(self.app_root)
        self.assertFalse(result['success'])
        self.assertEqual(result['code'], 'NO_PENDING_UPDATE')

    def test_missing_staged_zip(self):
        write_state(self.app_root, {
            'updateReady': True,
            'downloadStage': 'ready',
            'stagedZipPath': '/nonexistent.zip',
            'stagedVersion': '2026.8.0',
        })
        result = apply_update(self.app_root)
        self.assertFalse(result['success'])
        self.assertEqual(result['code'], 'STAGED_ZIP_MISSING')

    def test_staging_zip_contains_no_files(self):
        """空 ZIP → MISSING_SERVER_PY（safe_extract 生成空目录，但缺少 server.py）"""
        import zipfile
        empty_zip = self.zip_path.replace('.zip', '-empty.zip')
        with zipfile.ZipFile(empty_zip, 'w') as zf:
            pass  # 空 ZIP

        write_state(self.app_root, {
            'updateReady': True,
            'downloadStage': 'ready',
            'stagedZipPath': empty_zip,
            'stagedVersion': '2026.8.0',
        })
        result = apply_update(self.app_root)
        self.assertFalse(result['success'])
        self.assertEqual(result.get('code'), 'MISSING_SERVER_PY')


class TestRollback(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.local_appdata = os.path.join(self.temp.name, 'LocalAppData')
        os.makedirs(self.local_appdata, exist_ok=True)
        self._orig_localappdata = os.environ.get('LOCALAPPDATA')
        os.environ['LOCALAPPDATA'] = self.local_appdata

        self.studytools_root = os.path.join(self.local_appdata, 'StudyTools')
        self.app_root = os.path.join(self.studytools_root, 'app', 'current')
        os.makedirs(self.app_root, exist_ok=True)

        _create_file(self.app_root, 'index.html', 'original')
        _create_version_json(self.app_root, '2026.7.1')

        rdir = os.path.join(self.app_root, '.update_rollback_2026.8.0')
        _create_file(rdir, 'index.html', 'original')
        write_state(self.app_root, {'rollbackPath': rdir})

    def tearDown(self):
        if self._orig_localappdata is not None:
            os.environ['LOCALAPPDATA'] = self._orig_localappdata
        else:
            os.environ.pop('LOCALAPPDATA', None)
        self.temp.cleanup()

    def test_rollback_restores_files(self):
        with open(os.path.join(self.app_root, 'index.html'), 'w') as f:
            f.write('modified')
        result = rollback(self.app_root)
        self.assertTrue(result['rolledBack'])
        with open(os.path.join(self.app_root, 'index.html')) as f:
            self.assertEqual(f.read(), 'original')

    def test_rollback_no_backup(self):
        write_state(self.app_root, {'rollbackPath': None})
        result = rollback(self.app_root)
        self.assertFalse(result['rolledBack'])
        self.assertIn('error', result)


class TestHealthCheck(unittest.TestCase):
    def test_restart_server_no_script(self):
        temp = tempfile.TemporaryDirectory()
        result = restart_server(temp.name)
        self.assertFalse(result)
        temp.cleanup()

    @patch('updater.apply_update.restart_server')
    def test_health_check_success(self, mock_restart):
        mock_restart.return_value = True

        mock_resp = MagicMock()
        mock_resp.status = 200
        mock_resp.read.return_value = json.dumps({'version': '2026.8.0'}).encode()
        mock_resp.__enter__.return_value = mock_resp

        temp_dir = tempfile.TemporaryDirectory()
        with patch('updater.apply_update.urllib.request.urlopen', return_value=mock_resp):
            result = health_check(temp_dir.name, '2026.8.0', timeout=5)
        self.assertTrue(result)
        temp_dir.cleanup()

    @patch('updater.apply_update.restart_server')
    def test_health_check_fail_restart(self, mock_restart):
        mock_restart.return_value = False
        temp = tempfile.TemporaryDirectory()
        result = health_check(temp.name, '2026.8.0', timeout=3)
        self.assertFalse(result)
        temp.cleanup()

class TestSafeProcessTermination(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.app_root = self.temp.name

    def tearDown(self):
        self.temp.cleanup()

    @patch('updater.apply_update._get_process_info')
    @patch('ctypes.windll.kernel32.OpenProcess')
    @patch('ctypes.windll.kernel32.TerminateProcess')
    def test_kill_server_mismatched_creation_time(self, mock_terminate, mock_open_proc, mock_proc_info):
        write_state(self.app_root, {
            'serverPid': 9999,
            'serverCreationTime': 12345678,
        })
        # Mock _get_process_info to return a different creation time
        mock_proc_info.return_value = (87654321, 'C:\\Python310\\python.exe')
        
        from updater.apply_update import _kill_server
        _kill_server(self.app_root)
        
        mock_open_proc.assert_not_called()
        mock_terminate.assert_not_called()

    @patch('updater.apply_update._get_process_info')
    @patch('ctypes.windll.kernel32.OpenProcess')
    @patch('ctypes.windll.kernel32.TerminateProcess')
    def test_kill_server_dev_repo_path(self, mock_terminate, mock_open_proc, mock_proc_info):
        write_state(self.app_root, {
            'serverPid': 9999,
            'serverCreationTime': 12345678,
        })
        # Mock _get_process_info to return dev repo path
        mock_proc_info.return_value = (12345678, 'G:\\项目\\sql-learning-hub\\venv\\Scripts\\python.exe')
        
        from updater.apply_update import _kill_server
        _kill_server(self.app_root)
        
        mock_open_proc.assert_not_called()
        mock_terminate.assert_not_called()

    @patch('updater.apply_update._get_process_info')
    @patch('ctypes.windll.kernel32.OpenProcess')
    @patch('ctypes.windll.kernel32.TerminateProcess')
    def test_kill_server_not_python(self, mock_terminate, mock_open_proc, mock_proc_info):
        write_state(self.app_root, {
            'serverPid': 9999,
            'serverCreationTime': 12345678,
        })
        mock_proc_info.return_value = (12345678, 'C:\\Windows\\notepad.exe')
        
        from updater.apply_update import _kill_server
        _kill_server(self.app_root)
        
        mock_open_proc.assert_not_called()
        mock_terminate.assert_not_called()

    @patch('updater.apply_update._get_process_info')
    @patch('ctypes.windll.kernel32.OpenProcess')
    @patch('ctypes.windll.kernel32.TerminateProcess')
    def test_kill_server_success(self, mock_terminate, mock_open_proc, mock_proc_info):
        write_state(self.app_root, {
            'serverPid': 9999,
            'serverCreationTime': 12345678,
        })
        mock_proc_info.return_value = (12345678, 'C:\\Python310\\python.exe')
        mock_open_proc.return_value = 123  # Mock handle
        
        from updater.apply_update import _kill_server
        _kill_server(self.app_root)
        
        mock_open_proc.assert_called_once_with(1, False, 9999)
        mock_terminate.assert_called_once_with(123, 0)


if __name__ == '__main__':
    unittest.main()
