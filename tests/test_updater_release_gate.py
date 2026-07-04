#!/usr/bin/env python3
"""P14.1 Release gate 测试：受控 runtime 缺签名依赖时打包必须失败（fail closed）。"""

import importlib.util
import os
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

_spec = importlib.util.spec_from_file_location(
    'create_release', str(ROOT / 'tools' / 'create_release.py'))
create_release_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(create_release_mod)


class TestReleaseGate(unittest.TestCase):
    """verify_runtime_signature_dependency 的三个分支。"""

    def test_gate_passes_with_provisioned_runtime(self):
        """已装配的受控 runtime（本仓库 python\\）必须通过 gate。"""
        create_release_mod.verify_runtime_signature_dependency()  # 不 raise 即通过

    def test_gate_fails_when_runtime_missing(self):
        """runtime 不存在 → RuntimeError（禁止打出无 runtime 的包）。"""
        with self.assertRaises(RuntimeError) as ctx:
            create_release_mod.verify_runtime_signature_dependency(
                runtime_py=str(ROOT / 'python' / 'no-such-python.exe'))
        self.assertIn('不存在', str(ctx.exception))

    def test_gate_fails_when_dependency_missing(self):
        """runtime 可执行但 import cryptography 失败 → RuntimeError（禁止半成品）。
        用系统 where.exe 冒充 runtime：能执行、立即退出、必然不打印 ok。"""
        fake_runtime = os.path.join(os.environ.get('SystemRoot', r'C:\Windows'),
                                    'System32', 'where.exe')
        if not os.path.isfile(fake_runtime):
            self.skipTest('无 where.exe 可用作伪 runtime')
        with self.assertRaises(RuntimeError) as ctx:
            create_release_mod.verify_runtime_signature_dependency(runtime_py=fake_runtime)
        self.assertIn('缺少签名验证依赖', str(ctx.exception))

    def test_python_runtime_dir_is_packaged(self):
        """打包规则必须包含 python/ 目录（site-packages 依赖随包分发）。"""
        probe = str(ROOT / 'python' / 'Lib' / 'site-packages' /
                    'cryptography' / '__init__.py')
        self.assertTrue(os.path.isfile(probe), 'runtime 未装配 cryptography')
        self.assertTrue(create_release_mod.should_include(probe, str(ROOT)),
                        'python/Lib/site-packages 被打包规则排除——依赖不会随包分发')


if __name__ == '__main__':
    unittest.main()
