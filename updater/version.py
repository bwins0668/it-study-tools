#!/usr/bin/env python3
"""
updater/version.py — 完整 semver 解析与比较。

支持格式：
    X.Y.Z
    X.Y.Z-prerelease
    X.Y.Z-prerelease+build
    vX.Y.Z
    vX.Y.Z-r-pc-NNN          （Windows 完整版 build）
    X.Y.Z+build
    YYYY.M.D                  （年.月.日格式）

规则：
    1. v 前缀自动剥离
    2. 核心版本号 (major.minor.patch) 数值比较
    3. 有 prerelease < 无 prerelease (正式版 > prerelease)
    4. 都有 prerelease 则字典序比较
    5. build metadata 仅在核心版本和 prerelease 相同时用于区分
    6. downgrade 拒绝
    7. malformed 拒绝（ValueError）
    8. channel 不匹配不得更新

Public API:
    parse_version(version_str) -> Version
    compare_versions(v1_str, v2_str) -> int
    should_update(current_str, latest_str, current_channel, latest_channel) -> dict
    parse_manifest(manifest_data) -> dict
    current_version_from_file(app_root) -> str
"""

import json
import os
import re

_VERSION_RE = re.compile(
    r'^v?(?P<major>\d+)\.(?P<minor>\d+)\.(?P<patch>\d+)'
    r'(?:[-](?P<prerelease>[0-9A-Za-z._-]+))?'
    r'(?:\+(?P<build>[0-9A-Za-z._-]+))?$'
)

# r-pc-NNN 后缀的数值感知正则（如 r-pc-001、r-pc-999）
# r-pc 是项目的 Windows 完整版 build 标识，NNN 为三位数字序号
# 排序规则：相同核心版本下，r-pc-NNN 按 NNN 数值排序（非字典序）
_RPC_RE = re.compile(r'^r-pc-(\d+)$')

_REQUIRED_MANIFEST_FIELDS = {'version', 'zipName', 'sha256'}

# Channel 排序：stable > beta > dev
_CHANNEL_ORDER = {'stable': 0, 'beta': 1, 'dev': 2}


class Version:
    """不可变的完整 semver 版本对象。"""

    __slots__ = ('major', 'minor', 'patch', 'prerelease', 'build')

    def __init__(self, major: int, minor: int, patch: int,
                 prerelease: str = '', build: str = ''):
        self.major = major
        self.minor = minor
        self.patch = patch
        self.prerelease = prerelease or ''
        self.build = build or ''

    @property
    def core(self):
        return (self.major, self.minor, self.patch)

    def __str__(self):
        s = f'{self.major}.{self.minor}.{self.patch}'
        if self.prerelease:
            s += f'-{self.prerelease}'
        if self.build:
            s += f'+{self.build}'
        return s

    def __repr__(self):
        return f'Version({str(self)})'

    def __eq__(self, other):
        if not isinstance(other, Version):
            return NotImplemented
        return (self.core, self.prerelease, self.build) == \
               (other.core, other.prerelease, other.build)

    def __lt__(self, other):
        if not isinstance(other, Version):
            return NotImplemented
        if self.core != other.core:
            return self.core < other.core
        # 正式版 (无 prerelease) > prerelease
        if not self.prerelease and other.prerelease:
            return False
        if self.prerelease and not other.prerelease:
            return True
        # 都有 prerelease → 数值感知比较
        if self.prerelease != other.prerelease:
            return _compare_prerelease_numeric(self.prerelease, other.prerelease)
        # 都有 build → 数值感知比较
        if self.build != other.build:
            # 先尝试数值比较（r-pc-NNN 可能存在 build 中）
            return _compare_build_numeric(self.build, other.build)
        return False

    def __le__(self, other):
        return self == other or self < other

    def __gt__(self, other):
        return not (self <= other)

    def __ge__(self, other):
        return not (self < other)

    def __hash__(self):
        return hash((self.major, self.minor, self.patch, self.prerelease, self.build))


def _compare_prerelease_numeric(a: str, b: str) -> bool:
    """数值感知的 prerelease 比较。

    对于 r-pc-NNN 格式按 NNN 数值比较（001 < 002 < 010 < 999）。
    其他 prerelease 回退到字典序（如 rc1 < rc9 < rc10）。
    """
    ma = _RPC_RE.match(a)
    mb = _RPC_RE.match(b)
    if ma and mb:
        return int(ma.group(1)) < int(mb.group(1))
    # 一方是 r-pc 另一方不是：r-pc > 其他 prerelease（稳定更新优于测试标记）
    if ma and not mb:
        return False
    if not ma and mb:
        return True
    return a < b


def _compare_build_numeric(a: str, b: str) -> bool:
    """数值感知的 build metadata 比较。

    优先数值比较（如 build1 < build2），否则字典序。
    """
    # 尝试纯数字比较
    if a.isdigit() and b.isdigit():
        return int(a) < int(b)
    if a.isdigit() and not b.isdigit():
        return True  # 数字 build < 字母 build（不一致则字典序）
    if not a.isdigit() and b.isdigit():
        return False
    return a < b


def parse_version(version_str: str) -> Version:
    """解析版本字符串。

    Raises:
        ValueError: 无法解析。
    """
    if not isinstance(version_str, str) or not version_str.strip():
        raise ValueError(f'版本字符串不能为空: {version_str!r}')

    cleaned = version_str.strip()
    if len(cleaned) > 128:
        raise ValueError(f'版本字符串超过最大长度 128 字节: {version_str!r}')

    for ch in ('\x00', '/', '\\', '..'):
        if ch in cleaned:
            raise ValueError(f'版本字符串包含非法字符: {version_str!r}')

    m = _VERSION_RE.match(cleaned)
    if not m:
        raise ValueError(f'无法解析版本字符串: {version_str!r}')

    return Version(
        major=int(m.group('major')),
        minor=int(m.group('minor')),
        patch=int(m.group('patch')),
        prerelease=m.group('prerelease') or '',
        build=m.group('build') or '',
    )


def compare_versions(v1_str: str, v2_str: str) -> int:
    """完整比较两个版本字符串（含 prerelease 和 build）。

    Returns:
        -1: v1 < v2
         0: v1 == v2
         1: v1 > v2
    """
    v1 = parse_version(v1_str)
    v2 = parse_version(v2_str)
    if v1 < v2:
        return -1
    if v1 > v2:
        return 1
    return 0


def should_update(current_str: str, latest_str: str,
                  current_channel: str = 'stable', latest_channel: str = 'stable') -> dict:
    """判断是否应更新。

    规则：
        1. 当前版本 >= 最新版 → 不更新（拒绝降级）
        2. channel 不匹配 → 不更新（stable 不接收 beta 推送）
        3. 同版本但不完全相同（如 -r-pc-001 vs -r-pc-002）→ 更新（build 前进）

    Returns:
        {should_update: bool, reason: str, current_version, latest_version}
    """
    try:
        cur = parse_version(current_str)
        lat = parse_version(latest_str)
    except ValueError as exc:
        return {
            'should_update': False,
            'reason': f'版本号解析失败: {exc}',
            'current_version': current_str,
            'latest_version': latest_str,
        }

    # Channel 检查
    if current_channel != latest_channel:
        return {
            'should_update': False,
            'reason': f'channel 不一致: {current_channel} vs {latest_channel}',
            'current_version': current_str,
            'latest_version': latest_str,
        }

    # stable 渠道不接受 prerelease 版本
    if current_channel == 'stable' and lat.prerelease:
        return {
            'should_update': False,
            'reason': f'stable 渠道不接受 prerelease 版本: {latest_str}',
            'current_version': current_str,
            'latest_version': latest_str,
        }

    # 拒绝降级
    if cur.core > lat.core:
        return {
            'should_update': False,
            'reason': f'拒绝降级: {current_str} > {latest_str}',
            'current_version': current_str,
            'latest_version': latest_str,
        }

    # 同核心版本
    if cur.core == lat.core:
        # 当前是正式版，最新也是同核心 → 不更新（不能从 1.0.0 更新到 1.0.0-rc1）
        if not cur.prerelease and not lat.prerelease:
            # build 不同则更新（1.0.0+build1 → 1.0.0+build2 视为前进）
            if cur.build != lat.build and cur.build < lat.build:
                return {
                    'should_update': True,
                    'reason': f'Build 前进: {current_str} → {latest_str}',
                    'current_version': current_str,
                    'latest_version': latest_str,
                }
            return {
                'should_update': False,
                'reason': f'版本相同: {current_str}',
                'current_version': current_str,
                'latest_version': latest_str,
            }
        # 当前是 prerelease，最新版正式版 → 更新（1.0.0-rc1 → 1.0.0）
        if cur.prerelease and not lat.prerelease:
            return {
                'should_update': True,
                'reason': f'Pre-release → 正式版: {current_str} → {latest_str}',
                'current_version': current_str,
                'latest_version': latest_str,
            }
        # 都是 prerelease，字典序前进 → 更新
        if cur.prerelease and lat.prerelease and cur.prerelease < lat.prerelease:
            return {
                'should_update': True,
                'reason': f'Pre-release 前进: {current_str} → {latest_str}',
                'current_version': current_str,
                'latest_version': latest_str,
            }
        # 都是 prerelease 且相同，build 前进 → 更新
        if cur.prerelease and lat.prerelease and cur.prerelease == lat.prerelease:
            if cur.build != lat.build and cur.build < lat.build:
                return {
                    'should_update': True,
                    'reason': f'Build 前进 (同 prerelease): {current_str} → {latest_str}',
                    'current_version': current_str,
                    'latest_version': latest_str,
                }
            return {
                'should_update': False,
                'reason': f'版本相同或降级: {current_str} vs {latest_str}',
                'current_version': current_str,
                'latest_version': latest_str,
            }
        # 当前正式版，最新是 prerelease → 拒绝
        if not cur.prerelease and lat.prerelease:
            return {
                'should_update': False,
                'reason': f'正式版不被 prerelease 覆盖: {current_str} vs {latest_str}',
                'current_version': current_str,
                'latest_version': latest_str,
            }
        return {
            'should_update': False,
            'reason': f'版本相同或降级: {current_str} vs {latest_str}',
            'current_version': current_str,
            'latest_version': latest_str,
        }

    # 核心版本前进 → 可以更新
    return {
        'should_update': True,
        'reason': f'新版本可用: {current_str} → {latest_str}',
        'current_version': current_str,
        'latest_version': latest_str,
    }


def parse_manifest(manifest_data) -> dict:
    """验证并返回 Release manifest。

    Raises:
        ValueError: 缺少必要字段或格式非法。
    """
    if isinstance(manifest_data, str):
        try:
            manifest_data = json.loads(manifest_data)
        except json.JSONDecodeError as exc:
            raise ValueError(f'manifest JSON 解析失败: {exc}') from exc

    if not isinstance(manifest_data, dict):
        raise ValueError(f'manifest 必须是 dict，收到 {type(manifest_data).__name__}')

    missing = _REQUIRED_MANIFEST_FIELDS - set(manifest_data.keys())
    if missing:
        raise ValueError(f'manifest 缺少必要字段: {", ".join(sorted(missing))}')

    version_str = manifest_data['version']
    parse_version(version_str)

    sha256 = manifest_data['sha256']
    if not isinstance(sha256, str) or not re.match(r'^[0-9a-fA-F]{64}$', sha256):
        raise ValueError(f'sha256 必须是 64 字符 hex 字符串: {sha256!r}')

    return manifest_data


def current_version_from_file(app_root: str) -> str:
    """从 version.json 读取当前版本。"""
    path = os.path.join(app_root, 'version.json')
    if not os.path.isfile(path):
        raise FileNotFoundError(f'version.json 不存在: {path}')
    try:
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except (json.JSONDecodeError, OSError) as exc:
        raise ValueError(f'读取 version.json 失败: {exc}') from exc

    version = data.get('version', '')
    if not version:
        raise ValueError('version.json 缺少 version 字段')
    parse_version(version)
    return version


def channel_from_file(app_root: str) -> str:
    """从 version.json 读取 channel。"""
    path = os.path.join(app_root, 'version.json')
    if not os.path.isfile(path):
        return 'stable'
    try:
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data.get('channel', 'stable')
    except (json.JSONDecodeError, OSError):
        return 'stable'
