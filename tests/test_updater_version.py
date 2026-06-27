#!/usr/bin/env python3
"""Test suite for updater/version.py — 完整版本比较"""

import json
import os
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from updater.version import (
    Version,
    parse_version,
    compare_versions,
    should_update,
    parse_manifest,
    current_version_from_file,
    channel_from_file,
)


class TestVersionClass(unittest.TestCase):
    def test_str(self):
        self.assertEqual(str(Version(1, 2, 3)), '1.2.3')
        self.assertEqual(str(Version(1, 2, 3, 'rc1')), '1.2.3-rc1')
        self.assertEqual(str(Version(1, 2, 3, 'rc1', 'b1')), '1.2.3-rc1+b1')

    def test_eq(self):
        self.assertEqual(Version(1, 0, 0), Version(1, 0, 0))
        self.assertNotEqual(Version(1, 0, 0), Version(1, 0, 1))
        self.assertEqual(Version(1, 0, 0, '', 'b1'), Version(1, 0, 0, '', 'b1'))
        self.assertNotEqual(Version(1, 0, 0, '', 'b1'), Version(1, 0, 0))

    def test_core_property(self):
        v = Version(2026, 7, 1)
        self.assertEqual(v.core, (2026, 7, 1))

    def test_lt_prerelease_vs_release(self):
        """prerelease < 正式版（核心版相同）"""
        self.assertLess(Version(1, 0, 0, 'rc1'), Version(1, 0, 0))
        self.assertFalse(Version(1, 0, 0) < Version(1, 0, 0, 'rc1'))

    def test_lt_core_version_dominates(self):
        self.assertLess(Version(1, 0, 0), Version(2, 0, 0))
        self.assertGreater(Version(2, 0, 0), Version(1, 9, 9))

    def test_lt_build_distinguishes(self):
        """有 build 且 build 字典序排序"""
        self.assertLess(Version(1, 0, 0, '', 'b1'), Version(1, 0, 0, '', 'b2'))
        # 无 build < 有 build
        self.assertLess(Version(1, 0, 0), Version(1, 0, 0, '', 'a'))
        self.assertFalse(Version(1, 0, 0, '', 'a') < Version(1, 0, 0))

    def test_hash(self):
        s = {Version(1, 0, 0), Version(1, 0, 0)}
        self.assertEqual(len(s), 1)

    def test_not_implemented(self):
        self.assertEqual(Version(1, 0, 0).__eq__('x'), NotImplemented)

    def test_repr(self):
        r = repr(Version(1, 2, 3, 'rc1'))
        self.assertIn('1.2.3-rc1', r)


class TestParseVersion(unittest.TestCase):
    def test_standard(self):
        v = parse_version('1.2.3')
        self.assertEqual(v, Version(1, 2, 3))

    def test_v_prefix(self):
        v = parse_version('v2026.7.1')
        self.assertEqual(v, Version(2026, 7, 1))

    def test_prerelease(self):
        v = parse_version('1.0.0-rc1')
        self.assertEqual(v.prerelease, 'rc1')

    def test_build(self):
        v = parse_version('1.0.0+build123')
        self.assertEqual(v.build, 'build123')

    def test_prerelease_and_build(self):
        v = parse_version('1.0.0-rc1+build5')
        self.assertEqual(v.prerelease, 'rc1')
        self.assertEqual(v.build, 'build5')

    def test_r_pc_format(self):
        v = parse_version('v2026.6.20-r-pc-001')
        self.assertEqual(v.core, (2026, 6, 20))
        self.assertEqual(v.prerelease, 'r-pc-001')

    def test_stable_tag_as_prerelease(self):
        v = parse_version('v25.1.3-stable')
        self.assertEqual(v.prerelease, 'stable')

    def test_whitespace_strip(self):
        v = parse_version('  2026.7.1  ')
        self.assertEqual(v, Version(2026, 7, 1))

    def test_empty_raises(self):
        with self.assertRaises(ValueError):
            parse_version('')
        with self.assertRaises(ValueError):
            parse_version('   ')

    def test_path_separator_rejected(self):
        with self.assertRaises(ValueError):
            parse_version('../../etc/passwd')

    def test_garbage_raises(self):
        with self.assertRaises(ValueError):
            parse_version('not.a.version')

    def test_null_byte_rejected(self):
        with self.assertRaises(ValueError):
            parse_version('1.0\x00.0')


class TestCompareVersions(unittest.TestCase):
    def test_equal(self):
        self.assertEqual(compare_versions('2026.7.1', '2026.7.1'), 0)

    def test_prerelease_matters(self):
        """正式版 > prerelease：compare_versions 现在区分"""
        self.assertEqual(compare_versions('2026.7.1', '2026.7.1-rc1'), 1)
        self.assertEqual(compare_versions('2026.7.1-rc1', '2026.7.1'), -1)

    def test_build_distinguishes(self):
        self.assertEqual(compare_versions('1.0.0+b1', '1.0.0+b2'), -1)
        self.assertEqual(compare_versions('1.0.0+b2', '1.0.0+b1'), 1)

    def test_newer_core(self):
        self.assertEqual(compare_versions('2026.7.1', '2026.8.0'), -1)

    def test_older_core(self):
        self.assertEqual(compare_versions('2026.8.0', '2026.7.1'), 1)

    def test_r_pc_format_ordering(self):
        """r-pc-001 < r-pc-002（同核心版本时 prerelease 字典序）"""
        self.assertEqual(compare_versions('2026.6.20-r-pc-001', '2026.6.20-r-pc-002'), -1)

    def test_r_pc_vs_plain_release(self):
        """正式版 > r-pc build：正式版更大"""
        self.assertEqual(compare_versions('2026.6.20', '2026.6.20-r-pc-001'), 1)

    def test_v_prefix_ignored(self):
        self.assertEqual(compare_versions('v2026.7.1', '2026.7.2'), -1)


class TestShouldUpdate(unittest.TestCase):
    """核心版本更新决策逻辑"""

    def test_new_version_available(self):
        result = should_update('2026.6.20', '2026.7.1')
        self.assertTrue(result['should_update'])
        self.assertIn('reason', result)

    def test_downgrade_rejected(self):
        result = should_update('2026.7.1', '2026.6.20')
        self.assertFalse(result['should_update'])
        self.assertIn('拒绝降级', result['reason'])

    def test_same_version_no_update(self):
        result = should_update('2026.7.1', '2026.7.1')
        self.assertFalse(result['should_update'])

    def test_stable_not_overwritten_by_prerelease(self):
        """正式版 >= 同核心 prerelease → 不更新"""
        result = should_update('2026.7.1', '2026.7.1-rc1',
                               current_channel='beta', latest_channel='beta')
        self.assertFalse(result['should_update'])
        self.assertIn('正式版不被 prerelease 覆盖', result['reason'])

    def test_prerelease_to_stable(self):
        """prerelease → 同核心正式版 → 更新"""
        result = should_update('2026.7.1-rc1', '2026.7.1',
                               current_channel='beta', latest_channel='beta')
        self.assertTrue(result['should_update'])

    def test_build_advance(self):
        """r-pc-001 → r-pc-002 视为前进"""
        result = should_update('2026.6.20-r-pc-001', '2026.6.20-r-pc-002',
                               current_channel='beta', latest_channel='beta')
        self.assertTrue(result['should_update'])

    def test_identical_rpc_versions(self):
        result = should_update('2026.6.20-r-pc-001', '2026.6.20-r-pc-001',
                               current_channel='beta', latest_channel='beta')
        self.assertFalse(result['should_update'])

    def test_malformed_rejected(self):
        result = should_update('bad', '2026.7.1')
        self.assertFalse(result['should_update'])
        self.assertIn('解析失败', result['reason'])

    def test_stable_channel_blocks_beta(self):
        """stable channel 不能接收 beta channel 的更新"""
        result = should_update('2026.7.1', '2026.8.0',
                               current_channel='stable', latest_channel='beta')
        self.assertFalse(result['should_update'])

    def test_beta_can_update_to_stable(self):
        """beta channel 不能接收 stable channel（channel 不一致 | 拒绝）"""
        result = should_update('2026.7.1', '2026.8.0',
                               current_channel='beta', latest_channel='stable')
        self.assertFalse(result['should_update'])

    def test_same_channel_allows_update(self):
        result = should_update('2026.7.1', '2026.8.0',
                               current_channel='stable', latest_channel='stable')
        self.assertTrue(result['should_update'])

    def test_new_prerelease_advance(self):
        """pre-release 序列前进：rc1 → rc2"""
        result = should_update('2026.7.1-rc1', '2026.7.1-rc2',
                               current_channel='beta', latest_channel='beta')
        self.assertTrue(result['should_update'])

    def test_rpc_numeric_ordering(self):
        """r-pc-NNN 数值排序（非字典序）: 001 < 002 < 010 < 999"""
        self.assertEqual(compare_versions('2026.6.20-r-pc-001', '2026.6.20-r-pc-010'), -1,
                         'r-pc-001 < r-pc-010（数值非字典序）')
        self.assertEqual(compare_versions('2026.6.20-r-pc-009', '2026.6.20-r-pc-010'), -1,
                         'r-pc-009 < r-pc-010')
        self.assertEqual(compare_versions('2026.6.20-r-pc-099', '2026.6.20-r-pc-100'), -1,
                         'r-pc-099 < r-pc-100')
        self.assertEqual(compare_versions('2026.6.20-r-pc-010', '2026.6.20-r-pc-001'), 1,
                         'r-pc-010 > r-pc-001')
        self.assertEqual(compare_versions('2026.6.20-r-pc-999', '2026.6.20-r-pc-1000'), -1,
                         'r-pc-999 < r-pc-1000')

    def test_rpc_across_core_versions(self):
        """不同核心版本时不管 r-pc 后缀"""
        self.assertEqual(compare_versions('2026.6.20-r-pc-999', '2026.7.1-r-pc-001'), -1,
                         '2026.6.20-r-pc-999 < 2026.7.1-r-pc-001（核心版本占优）')
        self.assertEqual(should_update('2026.6.20-r-pc-999', '2026.7.1-r-pc-001',
                                       current_channel='beta', latest_channel='beta')['should_update'], True,
                         '跨核心版本 r-pc 应更新')

    def test_stable_vs_rpc(self):
        """正式版 vs 同核心 r-pc：正式版更高（不降级到 r-pc）"""
        result = should_update('2026.7.1', '2026.7.1-r-pc-001',
                               current_channel='beta', latest_channel='beta')
        self.assertFalse(result['should_update'],
                         '正式版不应被同核心 r-pc 覆盖')

    def test_version_too_long(self):
        long_ver = '1.' * 65 + '0'
        with self.assertRaises(ValueError):
            parse_version(long_ver)



class TestParseManifest(unittest.TestCase):
    def test_valid(self):
        m = parse_manifest({
            'version': '2026.7.1',
            'zipName': 'test.zip',
            'sha256': 'a' * 64,
        })
        self.assertEqual(m['version'], '2026.7.1')

    def test_missing_fields(self):
        with self.assertRaises(ValueError):
            parse_manifest({'version': '1.0.0'})

    def test_bad_sha256(self):
        with self.assertRaises(ValueError):
            parse_manifest({
                'version': '1.0.0',
                'zipName': 'test.zip',
                'sha256': 'abc',
            })

    def test_bad_version(self):
        with self.assertRaises(ValueError):
            parse_manifest({
                'version': 'bad',
                'zipName': 'test.zip',
                'sha256': 'a' * 64,
            })

    def test_json_string(self):
        data = json.dumps({
            'version': '1.0.0',
            'zipName': 'test.zip',
            'sha256': 'a' * 64,
        })
        result = parse_manifest(data)
        self.assertEqual(result['version'], '1.0.0')

    def test_list_rejected(self):
        with self.assertRaises(ValueError):
            parse_manifest([])


class TestCurrentVersionFromFile(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()

    def tearDown(self):
        self.temp.cleanup()

    def test_reads_version(self):
        with open(os.path.join(self.temp.name, 'version.json'), 'w') as f:
            json.dump({'version': '2026.7.1'}, f)
        self.assertEqual(current_version_from_file(self.temp.name), '2026.7.1')

    def test_not_found(self):
        with self.assertRaises(FileNotFoundError):
            current_version_from_file(self.temp.name)

    def test_bad_json(self):
        with open(os.path.join(self.temp.name, 'version.json'), 'w') as f:
            f.write('corrupt')
        with self.assertRaises(ValueError):
            current_version_from_file(self.temp.name)


class TestChannelFromFile(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()

    def tearDown(self):
        self.temp.cleanup()

    def test_default_channel(self):
        self.assertEqual(channel_from_file('/nonexistent'), 'stable')

    def test_reads_channel(self):
        with open(os.path.join(self.temp.name, 'version.json'), 'w') as f:
            json.dump({'version': '1.0.0', 'channel': 'beta'}, f)
        self.assertEqual(channel_from_file(self.temp.name), 'beta')


if __name__ == '__main__':
    unittest.main()
