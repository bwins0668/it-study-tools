#!/usr/bin/env python3
"""
updater/path_safety.py — 安装路径安全验证。

正式安装根目录：
    %LOCALAPPDATA%\\StudyTools\\
    例: C:\\Users\\<user>\\AppData\\Local\\StudyTools\\

Public API:
    get_installation_root(user_hint=None) -> str | None
    is_authorized_installation_path(path) -> bool
    is_dev_repo(path) -> bool
    resolve_lock_path(mode='download', user_hint=None) -> str
    assert_path_safety(path) -> None
"""

import os


# 允许的子目录结构
_ALLOWED_SUBDIRS = {'app', 'updates', 'logs'}
_DEV_REPO_INDICATORS = {'.git', 'package.json', 'node_modules'}

# R38.2: 硬编码拒绝的开发仓库路径（更新系统绝对不能 touch 的已知目录）
_KNOWN_DEV_REPO_PATHS = {
    r'G:\项目\sql-learning-hub',
}


def get_installation_root(user_hint: str = None) -> str | None:
    """返回 StudyTools 安装根目录。

    优先使用用户提示路径（但仅限 %LOCALAPPDATA% 内），
    否则返回 %LOCALAPPDATA%\\StudyTools\\。
    如果 %LOCALAPPDATA% 不可用则返回 None。
    """
    local_app_data = os.environ.get('LOCALAPPDATA', '')
    if not local_app_data:
        return None

    if user_hint:
        hint = os.path.normpath(user_hint)
        expected_prefix = os.path.normpath(os.path.join(local_app_data, 'StudyTools'))
        if not hint.lower().startswith(expected_prefix.lower() + os.sep.lower()):
            return None
        return hint

    return os.path.join(local_app_data, 'StudyTools')


def _resolve_real_path(path: str) -> str:
    """解析路径的真实路径（跟随 symlink/junction/reparse point）。"""
    try:
        return os.path.realpath(path)
    except (OSError, ValueError):
        return os.path.normpath(path)


def is_dev_repo(path: str) -> bool:
    """检查路径是否是一个开发仓库。

    检测特征：
        - 已知开发仓库路径（R38.2 硬编码列表）
        - 路径中有 .git 目录
        - 路径中有 package.json（Web 开发项目）
    """
    real = _resolve_real_path(path)

    # R38.2: 检查已知开发仓库路径
    for repo_path in _KNOWN_DEV_REPO_PATHS:
        repo_norm = os.path.normpath(repo_path)
        if real.lower().startswith(repo_norm.lower() + os.sep.lower()) or \
           real.lower() == repo_norm.lower():
            return True

    for indicator in _DEV_REPO_INDICATORS:
        indicator_path = os.path.join(real, indicator)
        if os.path.exists(indicator_path):
            return True
    # 检查父级是否有 .git
    parent = os.path.dirname(real)
    seen = set()
    while parent and parent != real and parent not in seen:
        seen.add(parent)
        git_dir = os.path.join(parent, '.git')
        if os.path.isdir(git_dir):
            return True
        parent = os.path.dirname(parent)
    return False


def is_authorized_installation_path(path: str) -> bool:
    """检查路径是否为合法的 StudyTools 安装目录。

    同时满足：
        1. 在 %LOCALAPPDATA%\\StudyTools\\ 下
        2. 不为开发仓库
        3. 路径不含 '..' 逃逸
        4. 不为根目录或父目录
        5. 解析后仍在允许根目录
    """
    if not path or not isinstance(path, str):
        return False

    norm = os.path.normpath(path)
    real = _resolve_real_path(norm)

    # 拒绝空路径和根路径
    if not norm or norm == os.path.normpath(os.sep):
        return False

    # 拒绝 '..' 逃逸（normpath 后不应有 ..）
    if '..' in norm.split(os.sep):
        return False

    local_app_data = os.environ.get('LOCALAPPDATA', '')
    if not local_app_data:
        return False

    expected_prefix = os.path.normpath(os.path.join(local_app_data, 'StudyTools'))

    # 必须在 expected_prefix 下
    if not real.lower().startswith(expected_prefix.lower() + os.sep.lower()):
        return False

    # 拒绝开发仓库
    if is_dev_repo(real):
        return False

    return True


def assert_path_safety(path: str) -> None:
    """严格路径安全断言。

    Raises:
        ValueError: 路径不满足安全要求。
    """
    if not path or not isinstance(path, str):
        raise ValueError(f'路径不能为空')

    # 在 normpath 解析前检查原始路径中的 ".." 逃逸
    raw_parts = path.replace('\\', '/').split('/')
    if '..' in raw_parts:
        raise ValueError(f'路径包含 ".." 逃逸: {path}')

    norm = os.path.normpath(path)
    real = _resolve_real_path(norm)

    if os.name == 'nt':
        for ch in ('<', '>', '"', '|', '?', '*', '\x00'):
            if ch in norm:
                raise ValueError(f'路径包含非法字符: {path!r}')

    if is_dev_repo(real):
        raise ValueError(f'路径是开发仓库，拒绝更新: {path}')

    if not is_authorized_installation_path(real):
        raise ValueError(f'路径不在允许的安装根目录内: {path}')

    # 检测 symlink/junction 逃逸
    if os.path.isdir(norm) and os.path.isdir(real):
        if norm.lower() != real.lower():
            # 检查 real 是否仍在允许范围内
            local_app_data = os.environ.get('LOCALAPPDATA', '')
            expected_prefix = os.path.normpath(os.path.join(local_app_data, 'StudyTools'))
            if not real.lower().startswith(expected_prefix.lower() + os.sep.lower()):
                raise ValueError(f'路径通过 symlink/junction 逃逸: {path} → {real}')


def resolve_lock_path(mode: str = 'download', user_hint: str = None) -> str:
    """返回状态锁文件路径。"""
    root = get_installation_root(user_hint)
    if not root:
        raise RuntimeError('%LOCALAPPDATA% 未设置，无法确定锁文件路径')
    return os.path.join(root, 'updater-state.json')
