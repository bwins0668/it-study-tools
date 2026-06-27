#!/usr/bin/env python3
"""Test suite for updater/path_safety.py"""

import os
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from updater.path_safety import (
    assert_path_safety,
    get_installation_root,
    is_authorized_installation_path,
    is_dev_repo,
)


_ORIG_LOCALAPPDATA = os.environ.get('LOCALAPPDATA', '')


class TestIsDevRepo(unittest.TestCase):
    """is_dev_repo 识别开发仓库路径"""

    def test_dev_repo_has_dotgit(self):
        """当前开发仓库（含 .git）返回 True"""
        result = is_dev_repo(str(ROOT))
        self.assertTrue(result)

    def test_non_dev_repo_no_dotgit(self):
        """没有 .git 的临时目录返回 False"""
        with tempfile.TemporaryDirectory() as tmpdir:
            result = is_dev_repo(tmpdir)
            self.assertFalse(result)


class TestIsAuthorizedInstallationPath(unittest.TestCase):
    """is_authorized_installation_path 路径授权检查"""

    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self._fake_local = os.path.join(self._tmp.name, 'Local')
        os.makedirs(self._fake_local, exist_ok=True)
        os.environ['LOCALAPPDATA'] = self._fake_local

        # 创建合法的安装根目录结构
        self._study_root = os.path.join(self._fake_local, 'StudyTools')
        self._app_current = os.path.join(self._study_root, 'app', 'current')
        os.makedirs(self._app_current, exist_ok=True)

    def tearDown(self):
        os.environ['LOCALAPPDATA'] = _ORIG_LOCALAPPDATA
        self._tmp.cleanup()

    def test_under_studytools_returns_true(self):
        """路径在 %LOCALAPPDATA%\\StudyTools\\ 下返回 True"""
        path = os.path.join(self._study_root, 'app', 'current')
        result = is_authorized_installation_path(path)
        self.assertTrue(result)

    def test_outside_localappdata_returns_false(self):
        """路径在 %LOCALAPPDATA% 外返回 False"""
        outside = os.path.join(self._tmp.name, 'Outside', 'some.exe')
        os.makedirs(os.path.dirname(outside), exist_ok=True)
        result = is_authorized_installation_path(outside)
        self.assertFalse(result)

    def test_root_path_returns_false(self):
        """根路径返回 False"""
        result = is_authorized_installation_path(os.sep)
        self.assertFalse(result)

    def test_empty_path_returns_false(self):
        """空路径返回 False"""
        result = is_authorized_installation_path('')
        self.assertFalse(result)

    def test_path_traversal_returns_false(self):
        """含 '..' 逃逸的路径返回 False"""
        bad = os.path.join(self._study_root, 'app', '..', '..', 'outside')
        result = is_authorized_installation_path(bad)
        self.assertFalse(result)

    def test_dev_repo_path_returns_false(self):
        """开发仓库路径返回 False"""
        with tempfile.TemporaryDirectory() as tmpdir:
            os.environ['LOCALAPPDATA'] = tmpdir
            os.makedirs(os.path.join(tmpdir, 'StudyTools', 'app'), exist_ok=True)
            os.makedirs(os.path.join(tmpdir, 'StudyTools', '.git'), exist_ok=True)
            path = os.path.join(tmpdir, 'StudyTools', 'app')
            result = is_authorized_installation_path(path)
            self.assertFalse(result)

    def test_none_path_returns_false(self):
        """None 作为路径返回 False"""
        result = is_authorized_installation_path(None)
        self.assertFalse(result)

    def test_not_string_path_returns_false(self):
        """非字符串路径返回 False"""
        result = is_authorized_installation_path(123)
        self.assertFalse(result)


class TestAssertPathSafety(unittest.TestCase):
    """assert_path_safety 异常行为"""

    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self._fake_local = os.path.join(self._tmp.name, 'Local')
        os.makedirs(self._fake_local, exist_ok=True)
        os.environ['LOCALAPPDATA'] = self._fake_local

        self._study_root = os.path.join(self._fake_local, 'StudyTools')
        self._app_current = os.path.join(self._study_root, 'app', 'current')
        os.makedirs(self._app_current, exist_ok=True)

    def tearDown(self):
        os.environ['LOCALAPPDATA'] = _ORIG_LOCALAPPDATA
        self._tmp.cleanup()

    def test_valid_path_no_exception(self):
        """合法路径不抛异常"""
        path = os.path.join(self._study_root, 'app', 'current')
        try:
            assert_path_safety(path)
        except ValueError:
            self.fail('assert_path_safety 对合法路径抛出了 ValueError')

    def test_dev_repo_raises_valueerror(self):
        """开发仓库路径抛出 ValueError"""
        os.makedirs(os.path.join(self._study_root, '.git'), exist_ok=True)
        with self.assertRaises(ValueError) as ctx:
            assert_path_safety(os.path.join(self._study_root, 'app', 'current'))
        self.assertIn('开发仓库', str(ctx.exception))

    def test_path_traversal_raises_valueerror(self):
        """'..' 逃逸路径抛出 ValueError"""
        bad = os.path.join(self._study_root, 'app', '..', '..', 'outside')
        with self.assertRaises(ValueError) as ctx:
            assert_path_safety(bad)
        self.assertIn('逃逸', str(ctx.exception))

    def test_empty_string_raises_valueerror(self):
        """空字符串抛出 ValueError"""
        with self.assertRaises(ValueError) as ctx:
            assert_path_safety('')
        self.assertIn('不能为空', str(ctx.exception))

    def test_none_path_raises_valueerror(self):
        """None 抛出 ValueError"""
        with self.assertRaises(ValueError):
            assert_path_safety(None)

    def test_path_with_null_byte_raises_valueerror(self):
        """含 null byte 的路径抛出 ValueError"""
        if os.name == 'nt':
            with self.assertRaises(ValueError) as ctx:
                assert_path_safety(os.path.join(self._study_root, 'bad\x00file'))
            self.assertIn('非法字符', str(ctx.exception))

    def test_path_outside_allowed_raises_valueerror(self):
        """路径在 %LOCALAPPDATA%\\StudyTools 外抛出 ValueError"""
        outside = os.path.join(self._tmp.name, 'OtherDir')
        os.makedirs(outside, exist_ok=True)
        with self.assertRaises(ValueError) as ctx:
            assert_path_safety(outside)
        self.assertIn('允许的安装根目录', str(ctx.exception))


class TestGetInstallationRoot(unittest.TestCase):
    """get_installation_root 安装根目录解析"""

    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self._fake_local = os.path.join(self._tmp.name, 'Local')
        os.makedirs(self._fake_local, exist_ok=True)
        os.environ['LOCALAPPDATA'] = self._fake_local

        self._study_root = os.path.join(self._fake_local, 'StudyTools')
        os.makedirs(self._study_root, exist_ok=True)

    def tearDown(self):
        os.environ['LOCALAPPDATA'] = _ORIG_LOCALAPPDATA
        self._tmp.cleanup()

    def test_returns_studytools_path(self):
        """%LOCALAPPDATA% 设置时返回 %LOCALAPPDATA%\\StudyTools"""
        expected = os.path.join(self._fake_local, 'StudyTools')
        result = get_installation_root()
        self.assertEqual(result, expected)

    def test_user_hint_inside_returns_hint(self):
        """user_hint 在 %LOCALAPPDATA%\\StudyTools 内时返回 hint"""
        hint = os.path.join(self._study_root, 'app', 'current')
        result = get_installation_root(user_hint=hint)
        self.assertEqual(result, hint)

    def test_user_hint_outside_returns_none(self):
        """user_hint 在 %LOCALAPPDATA%\\StudyTools 外时返回 None"""
        hint = os.path.join(self._tmp.name, 'Somewhere', 'else')
        result = get_installation_root(user_hint=hint)
        self.assertIsNone(result)

    def test_missing_localappdata_returns_none(self):
        """%LOCALAPPDATA% 未设置时返回 None"""
        os.environ.pop('LOCALAPPDATA', None)
        result = get_installation_root()
        self.assertIsNone(result)

    def test_user_hint_inside_with_missing_localappdata_returns_none(self):
        """%LOCALAPPDATA% 未设置时即使有 hint 也返回 None"""
        os.environ.pop('LOCALAPPDATA', None)
        hint = r'C:\Users\test\AppData\Local\StudyTools\app'
        result = get_installation_root(user_hint=hint)
        self.assertIsNone(result)


if __name__ == '__main__':
    unittest.main()
