#!/usr/bin/env python3
"""
bootstrapper/bootstrap.py — 自包含的原子替换/健康检查/回滚脚本。

位于 app/current/ 之外，不依赖 updater/ 包中的任何模块，
因此可在替换 app/current/ 目录时继续运行。

CLI:
    python bootstrap.py --app-root <path> --version <X.Y.Z> [--timeout <sec>]
    exit 0 = 成功, exit 1 = 失败（错误详情写入 updater-state.json）

工作目录: bootstrapper/（不受 app/current/ 被替换影响）
"""

import json
import os
import shutil
import signal
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.request


# ── 常量 ──────────────────────────────────────────────────────────────

_HEALTH_CHECK_RETRIES = 15
_HEALTH_CHECK_INTERVAL = 1


# ── 状态文件操作（仅 stdlib，不依赖 updater/state.py） ─────────────────

def _read_state(app_root: str) -> dict:
    """读取 updater-state.json（位于 app_root 父级）。"""
    state_path = os.path.join(os.path.dirname(app_root), 'updater-state.json')
    if not os.path.isfile(state_path):
        return {}
    try:
        with open(state_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return {}


def _write_state(app_root: str, updates: dict):
    """部分更新 updater-state.json。"""
    state_path = os.path.join(os.path.dirname(app_root), 'updater-state.json')
    try:
        current = _read_state(app_root)
        current.update(updates)
        tmp = state_path + '.tmp'
        with open(tmp, 'w', encoding='utf-8') as f:
            json.dump(current, f, ensure_ascii=False)
        os.replace(tmp, state_path)
    except OSError as exc:
        # 无法写入状态 — 写 stderr
        print(f'FATAL: 无法写入 state: {exc}', file=sys.stderr)


# ── 目录操作 ──────────────────────────────────────────────────────────

def _resolve_real_path(path: str) -> str:
    """解析真实路径（跟随 symlink/junction）。"""
    try:
        return os.path.realpath(path)
    except (OSError, ValueError):
        return os.path.normpath(path)


def _assert_path_safety(app_root: str):
    """轻量级路径安全断言（仅 stdlib）。

    额外规则（R38.2）：
      1. 拒绝 G:\项目\sql-learning-hub（已知开发仓库）
      2. 拒绝包含 .git 目录的任何路径
      3. 拒绝 path traversal 逃逸
      4. 仅允许 %LOCALAPPDATA%\StudyTools\ 下的路径
    """
    if not app_root or not isinstance(app_root, str):
        raise ValueError('路径不能为空')
    if '..' in app_root.replace('\\', '/').split('/'):
        raise ValueError(f'路径包含 ".." 逃逸: {app_root}')

    # R38.2: 硬编码拒绝已知开发仓库
    DEV_REPO_PATHS = (
        r'G:\项目\sql-learning-hub',
        r'g:\项目\sql-learning-hub',
    )
    norm_root = os.path.normpath(app_root)
    for repo_path in DEV_REPO_PATHS:
        repo_norm = os.path.normpath(repo_path)
        if norm_root.lower().startswith(repo_norm.lower() + os.sep.lower()) or \
           norm_root.lower() == repo_norm.lower():
            raise ValueError(f'拒绝开发仓库目录: {app_root}')

    # R38.2: 拒绝任何含 .git 的路径
    real = _resolve_real_path(app_root)
    parent = real
    seen = set()
    while parent and parent not in seen:
        seen.add(parent)
        git_dir = os.path.join(parent, '.git')
        if os.path.isdir(git_dir):
            raise ValueError(f'路径包含 .git（开发仓库）: {app_root}')
        new_parent = os.path.dirname(parent)
        if new_parent == parent:
            break
        parent = new_parent

    # 检查 LOCALAPPDATA
    local_app_data = os.environ.get('LOCALAPPDATA', '')
    if not local_app_data:
        raise ValueError('%LOCALAPPDATA% 未设置')

    expected_prefix = os.path.normpath(os.path.join(local_app_data, 'StudyTools'))
    if not real.lower().startswith(expected_prefix.lower() + os.sep.lower()):
        raise ValueError(f'路径不在允许的安装根目录内: {app_root}')

    # R38.2: 必须存在 installation.json 作为更新的前提
    installation_json_path = os.path.join(expected_prefix, 'installation.json')
    if not os.path.isfile(installation_json_path):
        raise ValueError('缺少 installation.json 授权文件，拒绝更新')


def _list_files_recursive(directory: str) -> list:
    """递归列出所有文件的相对路径。"""
    result = []
    for root, dirs, files in os.walk(directory):
        for fn in files:
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, directory)
            result.append(rel)
    return result


def _cleanup_dir(directory: str):
    """安全删除目录。"""
    if directory and os.path.isdir(directory):
        try:
            shutil.rmtree(directory)
        except OSError:
            pass


# ── Server 控制 ──────────────────────────────────────────────────────

def _get_process_info(pid: int) -> tuple[int, str] | None:
    """获取 Windows 进程的创建时间与可执行文件路径（stdlib/ctypes）。"""
    if os.name != 'nt':
        return None
    import ctypes
    from ctypes import wintypes
    
    kernel32 = ctypes.windll.kernel32
    PROCESS_QUERY_LIMITED_INFORMATION = 0x1000
    
    class FILETIME(ctypes.Structure):
        _fields_ = [("dwLowDateTime", wintypes.DWORD), ("dwHighDateTime", wintypes.DWORD)]
        
    handle = kernel32.OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, False, pid)
    if not handle:
        return None
    try:
        creation_time = FILETIME()
        exit_time = FILETIME()
        kernel_time = FILETIME()
        user_time = FILETIME()
        if not kernel32.GetProcessTimes(handle, ctypes.byref(creation_time), ctypes.byref(exit_time), ctypes.byref(kernel_time), ctypes.byref(user_time)):
            return None
        
        ct = (creation_time.dwHighDateTime << 32) + creation_time.dwLowDateTime
        
        buf = ctypes.create_unicode_buffer(1024)
        size = wintypes.DWORD(len(buf))
        if not kernel32.QueryFullProcessImageNameW(handle, 0, buf, ctypes.byref(size)):
            image_path = ""
        else:
            image_path = buf.value
            
        return ct, image_path
    finally:
        kernel32.CloseHandle(handle)


def _restart_server(app_root: str, port: int) -> bool:
    """停止旧 server，在指定端口启动新 server。"""
    server_script = os.path.join(app_root, 'server.py')
    if not os.path.isfile(server_script):
        return False

    _kill_server(app_root)
    time.sleep(0.5)

    proc = subprocess.Popen(
        [sys.executable, server_script, str(port)],
        cwd=app_root,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        shell=False,
    )

    # 获取并存储 PID 和进程创建时间，用于后续安全终止
    creation_time = None
    if os.name == 'nt':
        time.sleep(0.1)
        info = _get_process_info(proc.pid)
        if info:
            creation_time = info[0]

    try:
        pid_path = os.path.join(app_root, 'server.pid')
        with open(pid_path, 'w') as f:
            f.write(str(proc.pid))
    except OSError:
        pass

    state_updates = {
        'serverPid': proc.pid,
    }
    if creation_time is not None:
        state_updates['serverCreationTime'] = creation_time
    _write_state(app_root, state_updates)

    time.sleep(0.5)
    return proc.poll() is None


def _health_check(app_root: str, expected_version: str, timeout: int = 15) -> bool:
    """健康检查：在临时端口上验证新 server 可正常响应。"""
    # 分配临时端口
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.bind(('127.0.0.1', 0))
        temp_port = s.getsockname()[1]
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    except OSError:
        s.close()
        return False
    s.close()

    if not _restart_server(app_root, port=temp_port):
        return False

    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            # /index.html 200
            req = urllib.request.Request(f'http://127.0.0.1:{temp_port}/index.html')
            with urllib.request.urlopen(req, timeout=_HEALTH_CHECK_INTERVAL) as resp:
                if resp.status != 200:
                    time.sleep(_HEALTH_CHECK_INTERVAL)
                    continue

            # /version.json 版本匹配
            ver_req = urllib.request.Request(f'http://127.0.0.1:{temp_port}/version.json')
            with urllib.request.urlopen(ver_req, timeout=_HEALTH_CHECK_INTERVAL) as resp:
                if resp.status != 200:
                    time.sleep(_HEALTH_CHECK_INTERVAL)
                    continue
                data = json.loads(resp.read().decode('utf-8'))
                if data.get('version', '') != expected_version:
                    time.sleep(_HEALTH_CHECK_INTERVAL)
                    continue

            # /heartbeat POST 200
            try:
                hb_req = urllib.request.Request(
                    f'http://127.0.0.1:{temp_port}/heartbeat',
                    data=b'{}', method='POST',
                )
                with urllib.request.urlopen(hb_req, timeout=_HEALTH_CHECK_INTERVAL) as hb_resp:
                    if hb_resp.status != 200:
                        time.sleep(_HEALTH_CHECK_INTERVAL)
                        continue
            except (urllib.error.URLError, urllib.error.HTTPError, OSError):
                time.sleep(_HEALTH_CHECK_INTERVAL)
                continue

            # CSS 200
            css_ok = False
            for css_path in ('/assets/css/index.css', '/assets/css/light-theme.css',
                             '/assets/css/ai_learning.css'):
                try:
                    css_req = urllib.request.Request(f'http://127.0.0.1:{temp_port}{css_path}')
                    with urllib.request.urlopen(css_req, timeout=_HEALTH_CHECK_INTERVAL) as css_resp:
                        if css_resp.status == 200:
                            css_ok = True
                            break
                except (urllib.error.URLError, urllib.error.HTTPError, OSError):
                    continue
            if not css_ok:
                time.sleep(_HEALTH_CHECK_INTERVAL)
                continue

            return True

        except (urllib.error.URLError, urllib.error.HTTPError, OSError, json.JSONDecodeError):
            time.sleep(_HEALTH_CHECK_INTERVAL)
            continue

    return False


# ── 核心替换逻辑 ──────────────────────────────────────────────────────

def _kill_server(app_root: str):
    """根据状态记录的 PID 与创建时间，安全终止 server.py 进程（Windows）。"""
    state = _read_state(app_root)
    pid = state.get('serverPid')
    expected_ct = state.get('serverCreationTime')

    if not pid:
        pid_path = os.path.join(app_root, 'server.pid')
        if os.path.isfile(pid_path):
            try:
                with open(pid_path, 'r') as f:
                    pid = int(f.read().strip())
            except ValueError:
                pass

    if not pid:
        return

    if os.name == 'nt':
        info = _get_process_info(pid)
        if not info:
            return

        ct, image_path = info

        # 1. 启动时间比对，防 PID 复用
        if expected_ct is not None and ct != expected_ct:
            return

        # 2. 校验文件路径不属于开发仓库，且属于 python 解释器
        # R38.2: 拒绝已知开发仓库
        DEV_REPO_PATHS = (
            r'G:\项目\sql-learning-hub',
            r'g:\项目\sql-learning-hub',
        )
        norm_image = os.path.normpath(image_path).lower()
        for repo_path in DEV_REPO_PATHS:
            repo_norm = os.path.normpath(repo_path).lower()
            if norm_image.startswith(repo_norm + os.sep) or norm_image == repo_norm:
                return

        # 检查是否包含 .git
        real_image = _resolve_real_path(image_path)
        parent = real_image
        seen = set()
        while parent and parent not in seen:
            seen.add(parent)
            git_dir = os.path.join(parent, '.git')
            if os.path.isdir(git_dir):
                return
            new_parent = os.path.dirname(parent)
            if new_parent == parent:
                break
            parent = new_parent

        if not image_path.lower().endswith('python.exe'):
            return

        import ctypes
        kernel32 = ctypes.windll.kernel32
        PROCESS_TERMINATE = 0x0001
        handle = kernel32.OpenProcess(PROCESS_TERMINATE, False, pid)
        if handle:
            try:
                kernel32.TerminateProcess(handle, 0)
            finally:
                kernel32.CloseHandle(handle)
    else:
        try:
            os.kill(pid, signal.SIGTERM)
            time.sleep(1)
        except OSError:
            pass

    try:
        pid_path = os.path.join(app_root, 'server.pid')
        if os.path.isfile(pid_path):
            os.unlink(pid_path)
    except OSError:
        pass


def _do_swap(app_root: str, staging_dir: str, rollback_dir: str, version: str) -> dict:
    """执行原子替换与回滚保护。"""
    # 杀进程释放文件锁（Windows 不能覆盖运行中的 server.py）
    _kill_server(app_root)

    # 备份 current → rollback
    os.makedirs(rollback_dir, exist_ok=True)
    app_files = _list_files_recursive(app_root)
    for rel_path in app_files:
        src = os.path.join(app_root, rel_path)
        if os.path.isfile(src):
            dst = os.path.join(rollback_dir, rel_path)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copy2(src, dst)

    # 构建完整文件列表（兼顾已有文件 + 新增文件）
    staging_files = _list_files_recursive(staging_dir)
    all_files = list(set(app_files + staging_files))

    # 替换文件（先替换非 version.json，version.json 最后）
    non_version = [f for f in all_files if f != 'version.json']
    version_file = 'version.json' if 'version.json' in all_files else None

    for rel_path in non_version:
        src = os.path.join(staging_dir, rel_path)
        dst = os.path.join(app_root, rel_path)
        if os.path.isfile(src):
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copy2(src, dst)

    if version_file:
        src = os.path.join(staging_dir, version_file)
        dst = os.path.join(app_root, version_file)
        if os.path.isfile(src):
            shutil.copy2(src, dst)

    # 健康检查
    if not _health_check(app_root, version):
        # 回滚前先杀掉刚启动的新 server
        _kill_server(app_root)

        print(f'健康检查失败，执行回滚 (version={version})')
        for rel_path in app_files:
            src = os.path.join(rollback_dir, rel_path)
            dst = os.path.join(app_root, rel_path)
            if os.path.isfile(src):
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy2(src, dst)
        _cleanup_dir(rollback_dir)

        # 重新启动旧 server
        _restart_server(app_root, port=8765)

        return {'success': False, 'rolledBack': True, 'error': '健康检查失败'}

    # 成功：清理
    _cleanup_dir(rollback_dir)

    return {'success': True, 'version': version, 'rolledBack': False}


# ── CLI ────────────────────────────────────────────────────────────────

def main():
    import argparse
    parser = argparse.ArgumentParser(description='StudyTools bootstrapper — 原子更新')
    parser.add_argument('--app-root', required=True, help='app/current/ 绝对路径')
    parser.add_argument('--version', required=True, help='更新目标版本号')
    parser.add_argument('--staging-dir', required=True, help='已提取的新版本文件目录')
    parser.add_argument('--timeout', type=int, default=15, help='健康检查超时秒数')
    args = parser.parse_args()

    app_root = os.path.normpath(args.app_root)
    version = args.version
    staging_extract = os.path.normpath(args.staging_dir)

    # 路径安全断言
    try:
        _assert_path_safety(app_root)
    except ValueError as exc:
        print(f'路径安全拒绝: {exc}', file=sys.stderr)
        _write_state(app_root, {
            'downloadStage': 'idle',
            'lastError': str(exc),
        })
        return 1

    # 读 state 确认 updateReady
    state = _read_state(app_root)
    if not state.get('updateReady', False):
        print('没有待执行的更新', file=sys.stderr)
        return 1

    if not os.path.isdir(staging_extract):
        print(f'staging 提取目录不存在: {staging_extract}', file=sys.stderr)
        return 1

    rollback_dir = os.path.join(os.path.dirname(app_root), f'.bootstrap_rollback_{version}')

    _write_state(app_root, {'downloadStage': 'applying'})

    try:
        result = _do_swap(app_root, staging_extract, rollback_dir, version)

        if result.get('success'):
            _write_state(app_root, {
                'downloadStage': 'idle',
                'downloadProgress': 0,
                'updateReady': False,
                'currentVersion': version,
                'lastError': None,
            })
            print(f'更新成功: {version}')
            return 0
        else:
            _write_state(app_root, {
                'downloadStage': 'idle',
                'downloadProgress': 0,
                'updateReady': False,
                'lastError': result.get('error', '未知错误'),
            })
            if result.get('rolledBack'):
                print(f'更新失败，已回滚: {result.get("error")}', file=sys.stderr)
            else:
                print(f'更新失败: {result.get("error")}', file=sys.stderr)
            return 1

    except Exception as exc:
        print(f'bootstrapper 异常: {exc}', file=sys.stderr)
        _write_state(app_root, {
            'downloadStage': 'idle',
            'lastError': str(exc),
        })
        return 1


if __name__ == '__main__':
    sys.exit(main())
