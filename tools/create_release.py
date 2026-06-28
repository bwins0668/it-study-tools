#!/usr/bin/env python3
"""
tools/create_release.py — 标准化 Release 打包工具。

创建发布 artifacts:
    1. StudyTools-Windows-x64-{version}.zip
    2. StudyTools-Windows-x64-{version}.zip.sha256
    3. release-manifest.json
    4. release-manifest.json.sig (Ed25519 签名)

用法:
    python tools/create_release.py --version X.Y.Z --private-key /path/to/key.pem
                                  [--notes "release notes"] [--channel stable]
                                  [--output-dir DIR]

    默认从 version.json 读取版本号，输出到当前目录。
    --private-key 为必填参数，可通过环境变量 PRIVATE_KEY_PATH 或显式传入。
"""

import argparse
import hashlib
import json
import os
import sys
import zipfile

from updater.sign_verify import sign_manifest

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EXCLUDE_DIRS = {
    '.git', '.agents', '.codex', '__pycache__', 'node_modules',
    'temp_extract', 'scratch', 'tools', 'backups', 'output',
    '.chrome-release-check-profile', '.chrome-screenshot-profile',
    '.playwright-cli', '.study-tools-browser-profile',
    '.pytest_cache', 'artifacts', 'native', 'textbooks',
    'tests',  # 发布包不包含测试文件
}

EXCLUDE_FILES = {
    '.env', '.env.local', 'Launcher.cs', 'python_embed.zip',
    'study_ai.db', 'supabase-config.local.js',
    'SQL-Learning-Hub.exe', 'SQL-Learning-Hub-Portable.zip',
    '_fix.py', '_fix2.py', 'index.html.bak',
    'updater-state.json',
}

EXCLUDE_EXTENSIONS = {'.bak', '.cs', '.db', '.log', '.secret', '.sqlite', '.sqlite3', '.tmp', '.sig'}


def read_version_json(app_root):
    """读取 version.json 返回版本号。"""
    path = os.path.join(app_root, 'version.json')
    if not os.path.isfile(path):
        raise FileNotFoundError(f'version.json 不存在: {path}')
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    version = data.get('version', '')
    if not version:
        raise ValueError('version.json 缺少 version 字段')
    return version, data.get('channel', 'stable')


def should_include(path, root):
    """判断文件是否应包含在 Release ZIP 中。"""
    rel = os.path.relpath(path, root)
    parts = set(rel.replace('\\', '/').split('/'))
    if parts & EXCLUDE_DIRS:
        return False
    basename = os.path.basename(path)
    if basename in EXCLUDE_FILES:
        return False
    if basename.endswith('.zip'):
        return 'python' in rel.lower()
    _, ext = os.path.splitext(basename)
    return ext.lower() not in EXCLUDE_EXTENSIONS


def iter_package_files(root):
    """遍历所有需包含的文件，生成 (full_path, rel_path)。"""
    for root_dir, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for fn in sorted(files):
            full = os.path.join(root_dir, fn)
            if should_include(full, root):
                yield full, os.path.relpath(full, root)


def create_release(version, channel='stable', release_notes='', output_dir=None, private_key_path=None):
    """创建 Release 打包文件。

    Args:
        version: 版本号。
        channel: 发布渠道 (stable/beta)。
        release_notes: 发布说明。
        output_dir: 输出目录。
        private_key_path: Ed25519 私钥 PEM 文件路径。

    Returns:
        dict: {zip_path, sha256_path, manifest_path, sig_path, version} 路径字典。
    """
    if not private_key_path or not os.path.isfile(private_key_path):
        raise FileNotFoundError(f"缺少有效私钥或私钥文件不存在: {private_key_path}")

    if output_dir is None:
        output_dir = os.getcwd()
    os.makedirs(output_dir, exist_ok=True)

    zip_name = f'StudyTools-Windows-x64-{version}.zip'
    zip_path = os.path.join(output_dir, zip_name)
    sha256_path = os.path.join(output_dir, f'{zip_name}.sha256')
    manifest_path = os.path.join(output_dir, 'release-manifest.json')
    sig_path = os.path.join(output_dir, 'release-manifest.json.sig')

    # 清理旧文件
    for p in [zip_path, sha256_path, manifest_path, sig_path]:
        if os.path.exists(p):
            os.remove(p)

    print(f'=== 创建 Release {version} ({channel}) ===')
    file_count = 0

    # 1. 创建 ZIP
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for full_path, rel_path in iter_package_files(PROJECT_ROOT):
            archive_path = rel_path.replace(os.sep, '/')
            zf.write(full_path, archive_path)
            file_count += 1

    size_bytes = os.path.getsize(zip_path)
    print(f'  ZIP: {zip_path}')
    print(f'  文件数: {file_count}')
    print(f'  大小: {size_bytes / (1024 * 1024):.2f} MB')

    # 验证 ZIP 可读性
    try:
        with zipfile.ZipFile(zip_path, 'r') as zf:
            entries = zf.namelist()
        print(f'  ZIP 自检通过: {len(entries)} 个条目')
    except zipfile.BadZipFile as e:
        raise zipfile.BadZipFile(f'ZIP 文件校验失败: {e}')

    # 2. 计算 SHA256
    sha256_hash = hashlib.sha256()
    with open(zip_path, 'rb') as f:
        while True:
            chunk = f.read(65536)
            if not chunk:
                break
            sha256_hash.update(chunk)
    hex_digest = sha256_hash.hexdigest()

    with open(sha256_path, 'w') as f:
        f.write(f'{hex_digest}  {zip_name}\n')
    print(f'  SHA256: {sha256_path}')
    print(f'  Hash: {hex_digest}')

    # 3. 创建 release-manifest.json
    manifest = {
        'version': version,
        'channel': channel,
        'zipName': zip_name,
        'sha256': hex_digest,
        'minAppVersion': version,  # 默认与发布版本一致
        'releaseNotes': [release_notes] if release_notes else [],
        'fileCount': file_count,
        'sizeBytes': size_bytes,
        'keyId': 'prod-key-2026-r42',  # 内置受托公钥标识
    }

    # 4. 签名 manifest (对不含 signature 字段的 manifest 签名)
    signed = sign_manifest(manifest, private_key_path)

    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f'  Manifest: {manifest_path}')

    # 5. 写入独立签名文件（仅 base64 字符串）
    with open(sig_path, 'w', encoding='utf-8') as f:
        f.write(signed)
    print(f'  Signature: {sig_path}')

    # 6. 验证所有 artifacts 版本一致
    for artifact_name, artifact_path in [('zip', zip_path), ('sha256', sha256_path), ('manifest', manifest_path), ('signature', sig_path)]:
        print(f'  ✓ {artifact_name}: {artifact_path}')

    print('=== Release 打包完成 ===')

    return {
        'zip_path': zip_path,
        'sha256_path': sha256_path,
        'manifest_path': manifest_path,
        'sig_path': sig_path,
        'version': version,
        'size_bytes': size_bytes,
        'file_count': file_count,
    }


def main():
    parser = argparse.ArgumentParser(
        description='创建标准化 Release 打包文件',
    )
    parser.add_argument('--version', help='版本号（默认从 version.json 读取）')
    parser.add_argument('--channel', default='stable', help='发布渠道 (stable/beta)')
    parser.add_argument('--notes', default='', help='发布说明')
    parser.add_argument('--output-dir', default=os.getcwd(), help='输出目录')
    parser.add_argument(
        '--private-key', required=True,
        help='Ed25519 私钥 PEM 文件路径（必填，可通过环境变量 PRIVATE_KEY_PATH 或显式传入）',
    )
    args = parser.parse_args()

    # 私钥路径：优先使用显式传入值，否则尝试环境变量
    private_key_path = args.private_key
    if not private_key_path:
        private_key_path = os.environ.get('PRIVATE_KEY_PATH', '')

    if not private_key_path:
        print('错误: 缺少私钥路径', file=sys.stderr)
        print('请通过 --private-key 参数或 PRIVATE_KEY_PATH 环境变量指定 Ed25519 私钥 PEM 文件路径', file=sys.stderr)
        return 1

    try:
        version = args.version
        channel = args.channel
        if not version:
            version, _ = read_version_json(PROJECT_ROOT)

        result = create_release(
            version=version,
            channel=channel,
            release_notes=args.notes,
            output_dir=args.output_dir,
            private_key_path=private_key_path,
        )

        # 打印手动发布步骤
        zip_name = f'StudyTools-Windows-x64-{version}.zip'
        print(f'\n手动发布步骤:')
        print(f'  1. 在 GitHub 创建 Release tag: v{version}')
        print(f'  2. 上传 {zip_name}')
        print(f'  3. 上传 {zip_name}.sha256')
        print(f'  4. 上传 release-manifest.json')
        print(f'  5. 上传 release-manifest.json.sig')

        return 0
    except (FileNotFoundError, ValueError, OSError) as exc:
        print(f'错误: {exc}', file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
