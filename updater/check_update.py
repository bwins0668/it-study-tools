#!/usr/bin/env python3
"""
updater/check_update.py — GitHub Release 检测与下载。

Public API:
    check_for_update(app_root, silent=False) -> dict
    download_update(app_root, latest_info) -> dict
"""

import json
import os
import tempfile
import time
import urllib.request
import urllib.error
from datetime import datetime, timezone

from .version import should_update, parse_manifest, current_version_from_file, channel_from_file
from .state import read_state, write_state, get_etag, set_etag
from .zip_safe import verify_sha256 as _verify_sha256
from .sign_verify import verify_manifest_signature, is_signature_configured

_GITHUB_API = 'https://api.github.com/repos/bwins0668/it-study-tools/releases/latest'
_USER_AGENT = 'StudyTools-Updater/1.0'
_REDIRECT_MAX = 5
_ALLOWED_HOSTS = {'github.com', 'github-releases.githubusercontent.com', 'objects.githubusercontent.com'}
_DOWNLOAD_TIMEOUT_CONNECT = 30
_DOWNLOAD_TIMEOUT_READ = 60
_MAX_DOWNLOAD_SIZE = 500 * 1024 * 1024  # 500 MB
_RETRY_DELAYS = [30, 60, 120, 300]  # 指数退避


def _github_request(url, etag=None, last_modified=None):
    """发送 GitHub API 请求。返回 (status, headers, data)。"""
    req = urllib.request.Request(url)
    req.add_header('Accept', 'application/vnd.github.v3+json')
    req.add_header('User-Agent', _USER_AGENT)
    if etag:
        req.add_header('If-None-Match', etag)
    if last_modified:
        req.add_header('If-Modified-Since', last_modified)

    try:
        with urllib.request.urlopen(req, timeout=_DOWNLOAD_TIMEOUT_CONNECT) as resp:
            data = resp.read()
            return resp.status, resp.headers, data
    except urllib.error.HTTPError as exc:
        return exc.code, exc.headers, exc.read() if hasattr(exc, 'read') else b''
    except urllib.error.URLError as exc:
        raise ConnectionError(f'网络错误: {exc.reason}') from exc
    except TimeoutError as exc:
        raise ConnectionError(f'请求超时: {exc}') from exc


def _resolve_redirect(url: str) -> str:
    """追踪 HTTP 重定向，返回最终 URL。

    验证最终 host 在 _ALLOWED_HOSTS 中。
    Raises ConnectionError 如果重定向次数超限或 host 不在白名单。
    """
    from urllib.parse import urlparse
    for _ in range(_REDIRECT_MAX):
        parsed = urlparse(url)
        if parsed.scheme != 'https':
            raise ConnectionError(f'仅允许 HTTPS 协议: {url}')
        req = urllib.request.Request(url, method='HEAD')
        req.add_header('User-Agent', _USER_AGENT)
        try:
            with urllib.request.urlopen(req, timeout=_DOWNLOAD_TIMEOUT_CONNECT) as resp:
                final_url = resp.geturl()
                if urlparse(final_url).scheme != 'https':
                    raise ConnectionError(f'仅允许 HTTPS 协议: {final_url}')
                break
        except urllib.error.HTTPError as exc:
            if exc.code in (301, 302, 303, 307, 308):
                url = exc.headers.get('Location', '')
                if not url:
                    raise ConnectionError('重定向响应缺少 Location 头') from exc
                continue
            # 非重定向状态码 — 使用最终 URL
            final_url = exc.geturl() or url
            break
        except urllib.error.URLError as exc:
            raise ConnectionError(f'重定向跟踪失败: {exc.reason}') from exc
    else:
        raise ConnectionError(f'重定向次数超过上限 ({_REDIRECT_MAX})')

    from urllib.parse import urlparse
    host = urlparse(final_url).hostname or ''
    if host not in _ALLOWED_HOSTS:
        raise ConnectionError(f'不允许的下载来源: {host}')
    return final_url


def _find_zip_asset(assets):
    """在 assets 列表中查找 StudyTools-Windows-x64.zip。"""
    for asset in assets:
        name = asset.get('name', '')
        if name.startswith('StudyTools-Windows-x64') and name.endswith('.zip'):
            return asset
    return None


def _find_sha256_asset(assets, zip_name):
    """在 assets 列表中查找对应 SHA256 文件。"""
    sha_name = f'{zip_name}.sha256'
    for asset in assets:
        if asset.get('name', '') == sha_name:
            return asset
    return None


def _find_sig_asset(assets):
    """在 assets 列表中查找 .sig 文件。"""
    for asset in assets:
        name = asset.get('name', '')
        if name.endswith('.sig'):
            return asset
    return None


def check_for_update(app_root: str, silent: bool = False) -> dict:
    """检查 GitHub Releases 是否有更新。

    Returns:
        包含 updateAvailable、currentVersion 等信息的 dict。
    """
    state = read_state(app_root)
    current_ver = state.get('currentVersion', '')
    if not current_ver:
        try:
            current_ver = current_version_from_file(app_root)
            write_state(app_root, {'currentVersion': current_ver})
        except (FileNotFoundError, ValueError) as exc:
            write_state(app_root, {'lastCheckResult': 'error', 'lastError': str(exc)})
            return {'updateAvailable': False, 'currentVersion': '', 'error': str(exc)}

    # 获取当前 channel
    current_channel = channel_from_file(app_root)

    etag, last_modified = get_etag(app_root)

    try:
        status, headers, data = _github_request(_GITHUB_API, etag, last_modified)
    except ConnectionError as exc:
        err_msg = str(exc)
        write_state(app_root, {'lastCheckResult': 'error', 'lastError': err_msg})
        return {'updateAvailable': False, 'currentVersion': current_ver, 'error': err_msg}

    if status == 304:
        # 未修改
        write_state(app_root, {
            'lastCheckAt': datetime.now(timezone.utc).isoformat(),
            'lastCheckResult': 'up_to_date',
            'lastError': None,
        })
        return {'updateAvailable': False, 'currentVersion': current_ver}

    if status == 403 or status == 401:
        err_msg = f'GitHub API 限制 ({status})'
        write_state(app_root, {'lastCheckResult': 'error', 'lastError': err_msg})
        return {'updateAvailable': False, 'currentVersion': current_ver, 'error': err_msg}

    if status != 200:
        err_msg = f'GitHub API 返回 {status}'
        write_state(app_root, {'lastCheckResult': 'error', 'lastError': err_msg})
        return {'updateAvailable': False, 'currentVersion': current_ver, 'error': err_msg}

    # 保存 ETag
    new_etag = headers.get('ETag')
    new_last_modified = headers.get('Last-Modified')
    if new_etag:
        set_etag(app_root, new_etag, new_last_modified)

    # 解析响应
    try:
        release = json.loads(data)
    except json.JSONDecodeError as exc:
        write_state(app_root, {'lastCheckResult': 'error', 'lastError': f'JSON 解析失败: {exc}'})
        return {'updateAvailable': False, 'currentVersion': current_ver, 'error': str(exc)}

    tag_name = release.get('tag_name', '')
    latest_ver = tag_name.lstrip('v')

    # 获取最新发布的 channel（默认 stable）
    # 在 check_for_update 中执行严格的 manifest 与签名下载校验
    assets = release.get('assets', [])
    manifest_asset = None
    sig_asset = None
    for asset in assets:
        name = asset.get('name', '')
        if name == 'release-manifest.json':
            manifest_asset = asset
        elif name == 'release-manifest.json.sig':
            sig_asset = asset

    if not manifest_asset or not sig_asset:
        err_msg = '缺少 release-manifest.json 或 .sig 签名文件'
        write_state(app_root, {'lastCheckResult': 'error', 'lastError': err_msg})
        return {'updateAvailable': False, 'currentVersion': current_ver, 'error': err_msg}

    # 签名验证配置校验
    if not is_signature_configured():
        write_state(app_root, {'lastCheckResult': 'error', 'lastError': 'signature not configured'})
        return {'updateAvailable': False, 'currentVersion': current_ver, 'latestVersion': latest_ver, 'error': 'signature not configured'}

    manifest_url = manifest_asset.get('browser_download_url', '')
    sig_url = sig_asset.get('browser_download_url', '')

    try:
        # Validate HTTPS scheme
        from urllib.parse import urlparse
        if urlparse(manifest_url).scheme != 'https' or urlparse(sig_url).scheme != 'https':
            raise ConnectionError('仅允许 HTTPS 协议')

        # Verify hosts
        if urlparse(manifest_url).hostname not in _ALLOWED_HOSTS or urlparse(sig_url).hostname not in _ALLOWED_HOSTS:
            raise ConnectionError('不允许的下载来源')

        req_manifest = urllib.request.Request(manifest_url, headers={'User-Agent': _USER_AGENT})
        with urllib.request.urlopen(req_manifest, timeout=_DOWNLOAD_TIMEOUT_CONNECT) as resp:
            manifest_data = json.loads(resp.read().decode('utf-8'))

        req_sig = urllib.request.Request(sig_url, headers={'User-Agent': _USER_AGENT})
        with urllib.request.urlopen(req_sig, timeout=_DOWNLOAD_TIMEOUT_CONNECT) as resp:
            manifest_sig = resp.read().decode('utf-8').strip()
    except Exception as exc:
        err_msg = f'下载验证文件失败: {exc}'
        write_state(app_root, {'lastCheckResult': 'error', 'lastError': err_msg})
        return {'updateAvailable': False, 'currentVersion': current_ver, 'error': err_msg}

    # 校验 manifest 签名
    if not verify_manifest_signature(manifest_data, manifest_sig):
        err_msg = '签名验证失败'
        write_state(app_root, {'lastCheckResult': 'error', 'lastError': err_msg})
        return {'updateAvailable': False, 'currentVersion': current_ver, 'error': err_msg}

    try:
        parse_manifest(manifest_data)
    except ValueError as exc:
        err_msg = f'manifest 格式无效: {exc}'
        write_state(app_root, {'lastCheckResult': 'error', 'lastError': err_msg})
        return {'updateAvailable': False, 'currentVersion': current_ver, 'error': err_msg}

    manifest_channel = manifest_data.get('channel', 'stable')
    manifest_version = manifest_data.get('version', '')

    if manifest_version != latest_ver:
        err_msg = f'manifest 版本 ({manifest_version}) 与 tag 版本 ({latest_ver}) 不匹配'
        write_state(app_root, {'lastCheckResult': 'error', 'lastError': err_msg})
        return {'updateAvailable': False, 'currentVersion': current_ver, 'error': err_msg}

    # 版本与 channel 检查
    update_check = should_update(current_ver, latest_ver, current_channel, manifest_channel)
    if not update_check['should_update']:
        write_state(app_root, {
            'lastCheckAt': datetime.now(timezone.utc).isoformat(),
            'lastCheckResult': 'up_to_date',
            'latestVersion': latest_ver,
            'lastError': None,
        })
        return {
            'updateAvailable': False,
            'currentVersion': current_ver,
            'latestVersion': latest_ver,
            'error': update_check.get('reason', ''),
        }

    # 查找 ZIP asset
    zip_asset = _find_zip_asset(assets)
    if not zip_asset:
        write_state(app_root, {'lastCheckResult': 'error', 'lastError': 'Release 无 ZIP asset'})
        return {'updateAvailable': False, 'currentVersion': current_ver, 'error': '找不到 ZIP 文件'}

    download_url = zip_asset.get('browser_download_url', '')
    release_date = release.get('published_at', '')
    release_body = release.get('body', '')

    result = {
        'updateAvailable': True,
        'currentVersion': current_ver,
        'latestVersion': latest_ver,
        'downloadUrl': download_url,
        'releaseDate': release_date,
        'changelog': release_body,
        'zipSize': zip_asset.get('size', 0),
        'channel': manifest_channel,
    }

    write_state(app_root, {
        'lastCheckAt': datetime.now(timezone.utc).isoformat(),
        'lastCheckResult': 'update_available',
        'latestVersion': latest_ver,
        'latestChannel': manifest_channel,
        'latestDownloadUrl': download_url,
        'lastError': None,
    })

    return result


def download_update(app_root: str, latest_info: dict) -> dict:
    """下载更新 ZIP + SHA256 + manifest + .sig。

    Args:
        app_root: 应用根目录。
        latest_info: check_for_update 返回的 dict。

    Returns:
        {success, stagedVersion, stagedZipPath, message}
    """
    version = latest_info.get('latestVersion', '')
    download_url = latest_info.get('downloadUrl', '')

    if not version or not download_url:
        return {'success': False, 'error': '缺少版本或下载 URL'}

    # 并发互斥锁校验
    state = read_state(app_root)
    if state.get('downloadStage') in ('downloading', 'applying'):
        return {'success': False, 'error': '已有更新任务正在运行中'}

    staging_dir = os.path.join(app_root, f'.update_staging_{version}')
    os.makedirs(staging_dir, exist_ok=True)

    write_state(app_root, {
        'downloadStage': 'downloading',
        'downloadProgress': 0,
        'stagedVersion': version,
    })

    zip_path = os.path.join(staging_dir, f'StudyTools-Windows-x64-{version}.zip')
    sha_path = os.path.join(staging_dir, f'StudyTools-Windows-x64-{version}.zip.sha256')
    manifest_path = os.path.join(staging_dir, 'release-manifest.json')
    sig_path = os.path.join(staging_dir, 'release-manifest.json.sig')

    try:
        zip_url_parts = download_url.rsplit('/', 1)
        base_url = zip_url_parts[0] if len(zip_url_parts) > 1 else ''
        zip_name = zip_url_parts[1] if len(zip_url_parts) > 1 else ''
        sha_url = f'{base_url}/{zip_name}.sha256' if base_url else ''
        manifest_url = f'{base_url}/release-manifest.json' if base_url else ''
        sig_url = f'{base_url}/release-manifest.json.sig' if base_url else ''

        # 下载 ZIP
        _download_file(download_url, zip_path, app_root)
        write_state(app_root, {'downloadStage': 'verifying', 'downloadProgress': 50})

        # 下载 SHA256 (若存在)
        if sha_url:
            try:
                _download_file(sha_url, sha_path, app_root)
            except (ConnectionError, OSError):
                sha_path = None
        else:
            sha_path = None

        # 下载 manifest (硬性依赖，失败直接 fail-closed)
        if not manifest_url:
            raise ConnectionError('manifest URL 缺失')
        _download_file(manifest_url, manifest_path, app_root)

        # 下载 .sig 文件 (硬性依赖，失败直接 fail-closed)
        if not sig_url:
            raise ConnectionError('签名 URL 缺失')
        _download_file(sig_url, sig_path, app_root)

        # 验证 manifest 格式与签名
        with open(manifest_path, 'r', encoding='utf-8') as f:
            manifest_data = json.load(f)

        try:
            parse_manifest(manifest_data)
        except ValueError as exc:
            raise ValueError(f'manifest 格式无效: {exc}')

        if manifest_data.get('version') != version:
            raise ValueError('manifest 版本与暂存版本不一致')

        with open(sig_path, 'r', encoding='utf-8') as f:
            manifest_sig = f.read().strip()

        if not verify_manifest_signature(manifest_data, manifest_sig):
            raise ValueError('manifest 签名验证失败')

        # 验证 ZIP SHA256 — 使用已签名的 manifest 中哈希值作为可信源
        expected_hash = manifest_data.get('sha256', '')
        if not _verify_sha256(zip_path, expected_hash):
            raise ValueError('ZIP 哈希校验与 manifest 不匹配')

        write_state(app_root, {
            'downloadStage': 'ready',
            'downloadProgress': 100,
            'stagedZipPath': zip_path,
            'stagedVersion': version,
            'updateReady': True,
            'lastError': None,
        })

        return {
            'success': True,
            'stagedVersion': version,
            'stagedZipPath': zip_path,
            'message': '更新下载完成',
        }

    except (ConnectionError, OSError, ValueError) as exc:
        _cleanup_partial(staging_dir)
        write_state(app_root, {
            'downloadStage': 'idle',
            'downloadProgress': 0,
            'stagedVersion': None,
            'updateReady': False,
            'lastError': str(exc),
        })
        return {'success': False, 'error': str(exc)}


def _cleanup_partial(directory: str):
    """删除部分下载的 staging 目录。"""
    try:
        import shutil
        shutil.rmtree(directory, ignore_errors=True)
    except OSError:
        pass


def _download_file(url: str, target_path: str, app_root: str):
    """下载文件到本地路径。

    仅接受通过 GitHub API 获取的 URL（拒绝任意用户指定 URL）。
    使用 _DOWNLOAD_TIMEOUT_CONNECT / _DOWNLOAD_TIMEOUT_READ 超时。
    """
    # 验证 host 在白名单中 — 仅允许 GitHub 生态域名
    from urllib.parse import urlparse
    host = urlparse(url).hostname or ''
    if host and host not in _ALLOWED_HOSTS:
        raise ConnectionError(f'不允许的下载来源: {host}')

    # 创建 timeout 对象（连接超时、读取超时）
    timeout = (_DOWNLOAD_TIMEOUT_CONNECT, _DOWNLOAD_TIMEOUT_READ)

    req = urllib.request.Request(url, headers={'User-Agent': _USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            final_url = resp.geturl()
            final_host = urlparse(final_url).hostname or ''
            if final_host not in _ALLOWED_HOSTS:
                raise ConnectionError(f'不允许的下载来源: {final_host}')

            total = int(resp.headers.get('Content-Length', 0))
            downloaded = 0
            with open(target_path, 'wb') as f:
                while True:
                    chunk = resp.read(65536)
                    if not chunk:
                        break
                    f.write(chunk)
                    downloaded += len(chunk)
                    if total > 0:
                        pct = min(95, int(downloaded / total * 100))
                        write_state(app_root, {'downloadProgress': pct})
                    if downloaded > _MAX_DOWNLOAD_SIZE:
                        # 删除部分下载的文件
                        try:
                            os.unlink(target_path)
                        except OSError:
                            pass
                        raise OSError(f'下载超过大小限制 {_MAX_DOWNLOAD_SIZE / 1024 / 1024:.0f} MB')
    except (ConnectionError, OSError, TimeoutError, urllib.error.URLError) as exc:
        # 删除部分下载的文件
        try:
            if os.path.isfile(target_path):
                os.unlink(target_path)
        except OSError:
            pass
        raise ConnectionError(f'下载失败: {exc}') from exc
