#!/usr/bin/env python3
"""
updater/zip_safe.py — Zip Slip 防护提取、SHA-256 校验。

Public API:
    safe_extract(zip_path, target_dir) -> list[str]
    verify_sha256(file_path, expected_hash) -> bool
    compute_sha256(file_path) -> str
"""

import hashlib
import hmac
import os
import zipfile
import stat

_MAX_ENTRIES = 5000
_MAX_TOTAL_SIZE = 1 * 1024 * 1024 * 1024  # 1 GB
_MAX_COMPRESSION_RATIO = 100
_MAX_FILE_SIZE = 500 * 1024 * 1024  # 500 MB 单个文件上限

# Unix symlink 模式常量
_IS_SYMLINK = 0o170000  # S_IFMT 掩码匹配的值

# Windows 保留文件名（不区分大小写）
_WINDOWS_RESERVED = frozenset({
    'CON', 'PRN', 'AUX', 'NUL',
    'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
    'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9',
})


def _is_symlink_entry(entry: zipfile.ZipInfo) -> bool:
    """检查 ZIP 条目是否为符号链接 (Unix attr / link name)。"""
    # 方式 1: 通过 external_attr 中的 Unix 权限位判断
    if entry.create_system == 3:  # Unix
        mode = (entry.external_attr >> 16) & 0xFFFF
        # 检查 S_IFMT 是否匹配 symlink
        if mode & 0xF000 == 0xA000:  # S_IFLNK = 0xA000
            return True
        # 备用检查: 0o170000
        if (mode & _IS_SYMLINK) == _IS_SYMLINK:
            return True
    # 方式 2: 检查 link_name 属性 (Python 3.12+)
    if hasattr(entry, 'link_name') and entry.link_name:
        return True
    return False


def _is_safe_path(entry_path: str, target_dir: str) -> bool:
    """检查 ZIP 条目是否安全（无路径穿越、无绝对路径、无保留名）。"""
    # 空字符
    if '\x00' in entry_path:
        return False

    # 标准化路径分隔符
    normalized = entry_path.replace('\\', '/')

    # 绝对路径
    if normalized.startswith('/'):
        return False

    # Windows 盘符绝对路径
    if len(normalized) >= 2 and normalized[1] == ':':
        return False

    # 路径穿越（.. 作为路径段）
    parts = normalized.split('/')
    for part in parts:
        if part == '..':
            return False

    # Windows 保留文件名
    stem = os.path.splitext(os.path.basename(normalized))[0].upper()
    if stem in _WINDOWS_RESERVED:
        return False

    # 检查最终路径在 target_dir 之下
    abs_target = os.path.normpath(os.path.join(target_dir, normalized))
    if not abs_target.startswith(os.path.normpath(target_dir) + os.sep):
        return False

    return True


def safe_extract(zip_path: str, target_dir: str) -> list[str]:
    """安全解压 ZIP 文件，阻止 Zip Slip。

    Args:
        zip_path: ZIP 文件路径。
        target_dir: 解压目标目录（必须存在）。

    Returns:
        已提取文件的相对路径列表。

    Raises:
        ValueError: 检测到路径穿越、压缩包炸弹、符号链接、重复路径等。
        zipfile.BadZipFile: ZIP 文件损坏。
    """
    if not os.path.isfile(zip_path):
        raise FileNotFoundError(f'ZIP 文件不存在: {zip_path}')
    os.makedirs(target_dir, exist_ok=True)

    extracted = []
    extracted_lower: set[str] = set()  # 用于检查重复路径（不区分大小写）
    total_uncompressed = 0

    with zipfile.ZipFile(zip_path, 'r') as zf:
        entries = zf.infolist()

        if len(entries) > _MAX_ENTRIES:
            raise ValueError(f'ZIP 条目数 {len(entries)} 超过上限 {_MAX_ENTRIES}')

        for entry in entries:
            # NUL 字节检查
            if '\x00' in entry.filename:
                raise ValueError(f'NUL 字节被阻止: {entry.filename!r}')

            # 符号链接检测
            if _is_symlink_entry(entry):
                raise ValueError(f'symlink entry rejected: {entry.filename!r}')

            # 跳过目录条目
            if entry.filename.endswith('/'):
                continue

            if not _is_safe_path(entry.filename, target_dir):
                raise ValueError(f'路径穿越/非法路径被阻止: {entry.filename!r}')

            # 重复路径检测（不区分大小写，Windows 友好）
            entry_lower = entry.filename.lower().replace('\\', '/')
            if entry_lower in extracted_lower:
                raise ValueError(f'duplicate path detected: {entry.filename!r}')
            extracted_lower.add(entry_lower)

            # 单个文件大小检查
            if entry.file_size > _MAX_FILE_SIZE:
                raise ValueError(
                    f'单个文件超过 {_MAX_FILE_SIZE} 字节上限: '
                    f'{entry.filename!r} ({entry.file_size} 字节)'
                )

            # 压缩比检查（压缩包炸弹防护）
            if entry.compress_size > 0:
                ratio = entry.file_size / entry.compress_size
                if ratio > _MAX_COMPRESSION_RATIO:
                    raise ValueError(
                        f'压缩比 {ratio:.1f}:1 超过上限 {_MAX_COMPRESSION_RATIO}:1 '
                        f'—— 可能是压缩包炸弹: {entry.filename!r}'
                    )

            # 总大小检查
            total_uncompressed += entry.file_size
            if total_uncompressed > _MAX_TOTAL_SIZE:
                raise ValueError(f'解压总大小超过 {_MAX_TOTAL_SIZE} 字节上限')

            target_path = os.path.normpath(os.path.join(target_dir, entry.filename))

            # 确保父目录存在
            os.makedirs(os.path.dirname(target_path), exist_ok=True)

            # 提取（跳过 symlink，创建为空文件）
            if entry.is_dir():
                os.makedirs(target_path, exist_ok=True)
            else:
                with zf.open(entry) as src, open(target_path, 'wb') as dst:
                    while True:
                        chunk = src.read(65536)
                        if not chunk:
                            break
                        dst.write(chunk)

            extracted.append(entry.filename)

    # 边界检查（Stage 5）：确认所有提取路径都在 target_dir 之下
    for rel_path in extracted:
        abs_path = os.path.normpath(os.path.join(target_dir, rel_path))
        if not abs_path.startswith(os.path.normpath(target_dir) + os.sep):
            raise ValueError(
                f'提取后路径边界检查失败（路径不在目标目录下）: {rel_path!r}'
            )

    return extracted


def verify_sha256(file_path: str, expected_hash: str) -> bool:
    """校验文件 SHA-256。

    注意：此函数执行的是恒定时间 HASH COMPARISON（hmac.compare_digest），
    而非数字签名验证。如果需要对下载的文件进行签名验证，请使用
    updater/sign_verify.py 中的 verify_signature() 函数。

    Args:
        file_path: 文件路径。
        expected_hash: 预期 64 字符 hex 字符串（大小写不敏感）。

    Returns:
        匹配返回 True，否则 False。
    """
    if not isinstance(expected_hash, str) or len(expected_hash) != 64:
        return False
    try:
        int(expected_hash, 16)  # 验证 hex 格式
    except ValueError:
        return False

    actual = compute_sha256(file_path)
    # 恒定时间比较
    return hmac.compare_digest(actual.lower(), expected_hash.lower())


def compute_sha256(file_path: str) -> str:
    """计算文件 SHA-256（流式，64KB 块）。"""
    h = hashlib.sha256()
    with open(file_path, 'rb') as f:
        while True:
            chunk = f.read(65536)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()
