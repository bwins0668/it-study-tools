#!/usr/bin/env python3
"""
updater/apply_update.py — 原子替换、健康检查、回滚。

架构变更（R38.2）：
    原子替换操作委托给 bootstrapper/bootstrap.py（位于 app/current/ 外执行），
    确保替换 current 目录时不覆盖正在运行的更新逻辑。

Public API:
    apply_update(app_root) -> dict
    rollback(app_root) -> dict
    health_check(app_root, expected_version, timeout=15) -> bool
    restart_server(app_root, port=8765) -> bool
"""

import json
import os
import shutil
import signal
import subprocess
import sys
import time
import urllib.request
import urllib.error

from .state import read_state, write_state
from .zip_safe import safe_extract
from .path_safety import assert_path_safety, is_authorized_installation_path


def _get_bootstrap_path() -> str:
    """返回 bootstrapper 脚本的绝对路径。

    bootstrapper 位于 app/current/ 外，因此不随替换被覆盖。
    搜索顺序：1) 项目根 bootstrapper/bootstrap.py  2) 开发仓库 bootstrapper/
    """
    # 从当前文件位置向上搜索
    here = os.path.dirname(os.path.abspath(__file__))
    for candidate in (
        os.path.join(here, '..', 'bootstrapper', 'bootstrap.py'),
        os.path.join(here, '..', '..', 'bootstrapper', 'bootstrap.py'),
    ):
        path = os.path.normpath(candidate)
        if os.path.isfile(path):
            return path
    return os.path.normpath(os.path.join(here, '..', 'bootstrapper', 'bootstrap.py'))


def apply_update(app_root: str) -> dict:
    """执行原子更新（委托给 bootstrapper 进程）。

    流程:
        1. read_state + path safety assertions
        2. 创建 staging 提取目录
        3. 解压 staging ZIP（由 updater/zip_safe 执行）
        4. 启动独立 bootstrapper 进程执行原子替换
        5. bootstrapper 返回后检查结果
    """
    # === 路径安全与授权校验 ===
    local_appdata = os.environ.get('LOCALAPPDATA', '')
    if not local_appdata:
        return {'success': False, 'error': 'LOCALAPPDATA 环境变量未设置', 'code': 'LOCALAPPDATA_MISSING'}

    install_root = os.path.join(local_appdata, 'StudyTools')
    installation_json_path = os.path.join(install_root, 'installation.json')
    if not os.path.isfile(installation_json_path):
        return {'success': False, 'error': '更新拒绝：缺失 installation.json 授权文件', 'code': 'INSTALLATION_JSON_MISSING'}

    try:
        assert_path_safety(app_root)
    except ValueError as exc:
        return {'success': False, 'error': str(exc), 'code': 'PATH_SAFETY_FAILED'}

    if not is_authorized_installation_path(app_root):
        return {'success': False, 'error': f'未授权的安装路径: {app_root}', 'code': 'UNAUTHORIZED_PATH'}

    state = read_state(app_root)
    if not state.get('updateReady', False) and not state.get('downloadStage') == 'ready':
        return {'success': False, 'error': '没有待执行的更新', 'code': 'NO_PENDING_UPDATE'}

    staged_zip = state.get('stagedZipPath', '')
    staged_version = state.get('stagedVersion', '')
    if not staged_zip or not os.path.isfile(staged_zip):
        return {'success': False, 'error': '暂存的 ZIP 文件不存在', 'code': 'STAGED_ZIP_MISSING'}

    if not staged_version:
        return {'success': False, 'error': '缺少暂存版本号', 'code': 'NO_STAGED_VERSION'}

    write_state(app_root, {'downloadStage': 'applying', 'lastError': None})

    # 提取 staging ZIP
    staging_extract = os.path.join(os.path.dirname(staged_zip), 'extracted')
    try:
        safe_extract(staged_zip, staging_extract)
    except (ValueError, OSError) as exc:
        write_state(app_root, {
            'downloadStage': 'idle',
            'lastError': f'解压失败: {exc}',
        })
        return {'success': False, 'error': f'解压 staging ZIP 失败: {exc}', 'code': 'EXTRACT_FAILED'}

    # 检查提取出的文件是否包含 server.py
    has_server = os.path.isfile(os.path.join(staging_extract, 'server.py'))
    if not has_server:
        shutil.rmtree(staging_extract, ignore_errors=True)
        write_state(app_root, {
            'downloadStage': 'idle',
            'lastError': '更新包缺少 server.py',
        })
        return {'success': False, 'error': '更新包缺少 server.py', 'code': 'MISSING_SERVER_PY'}

    # 委托给 bootstrapper 进程
    bootstrap_script = _get_bootstrap_path()
    if not os.path.isfile(bootstrap_script):
        shutil.rmtree(staging_extract, ignore_errors=True)
        write_state(app_root, {
            'downloadStage': 'idle',
            'lastError': f'bootstrapper 不可用: {bootstrap_script}',
        })
        return {'success': False, 'error': 'bootstrapper 不可用', 'code': 'BOOTSTRAPPER_MISSING'}

    try:
        proc = subprocess.run(
            [sys.executable, bootstrap_script,
             '--app-root', app_root,
             '--version', staged_version,
             '--staging-dir', staging_extract,
             '--timeout', '15'],
            capture_output=True, text=True, shell=False,
            timeout=120,
        )
    except subprocess.TimeoutExpired:
        write_state(app_root, {
            'downloadStage': 'idle',
            'lastError': 'bootstrapper 超时',
        })
        return {'success': False, 'error': 'bootstrapper 超时', 'code': 'BOOTSTRAPPER_TIMEOUT'}

    # 清理 staging 提取
    shutil.rmtree(staging_extract, ignore_errors=True)
    shutil.rmtree(os.path.dirname(staged_zip), ignore_errors=True)

    if proc.returncode == 0:
        write_state(app_root, {
            'downloadStage': 'idle',
            'downloadProgress': 0,
            'stagedZipPath': None,
            'stagedVersion': None,
            'updateReady': False,
            'currentVersion': staged_version,
            'updatedAt': time.strftime('%Y-%m-%dT%H:%M:%S%z'),
            'lastError': None,
        })
        return {'success': True, 'version': staged_version, 'rolledBack': False}
    else:
        # bootstrapper 失败（含回滚），强制重置 state
        write_state(app_root, {
            'downloadStage': 'idle',
            'downloadProgress': 0,
            'updateReady': False,
        })
        new_state = read_state(app_root)
        err = new_state.get('lastError', proc.stderr.strip() or 'bootstrapper 执行失败')
        rolled_back = '回滚' in proc.stderr or 'rolledBack' in proc.stderr or err
        return {'success': False, 'error': err, 'rolledBack': bool(rolled_back)}


def rollback(app_root: str, error_reason: str = '', original_state: dict = None) -> dict:
    """手动或自动回滚到最后一次备份。"""
    state = read_state(app_root)
    rollback_dir = state.get('rollbackPath', '')
    if not rollback_dir or not os.path.isdir(rollback_dir):
        return {'success': False, 'error': '没有可用的回滚备份', 'rolledBack': False}

    rolled_back_files = _list_files_recursive(rollback_dir)
    for rel_path in rolled_back_files:
        src = os.path.join(rollback_dir, rel_path)
        dst = os.path.join(app_root, rel_path)
        if os.path.isfile(src):
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copy2(src, dst)

    _cleanup_dir(rollback_dir)

    state_updates = {
        'downloadStage': 'idle',
        'downloadProgress': 0,
        'stagedZipPath': None,
        'stagedVersion': None,
        'rollbackPath': None,
        'updateReady': False,
        'rolledBackAt': time.strftime('%Y-%m-%dT%H:%M:%S%z'),
        'lastError': error_reason or 'rolled_back',
    }
    if original_state:
        original_state.update(state_updates)
        write_state(app_root, original_state)
    else:
        write_state(app_root, state_updates)

    return {'success': True, 'error': error_reason, 'rolledBack': True}


def health_check(app_root: str, expected_version: str, timeout: int = 15) -> bool:
    """健康检查（代理到 bootstrapper 实现）。"""
    import socket

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.bind(('127.0.0.1', 0))
        temp_port = s.getsockname()[1]
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    except OSError as exc:
        s.close()
        return False
    s.close()

    if not restart_server(app_root, port=temp_port):
        return False

    deadline = time.time() + timeout
    interval = 1

    while time.time() < deadline:
        try:
            req = urllib.request.Request(f'http://127.0.0.1:{temp_port}/index.html')
            with urllib.request.urlopen(req, timeout=interval) as resp:
                if resp.status != 200:
                    time.sleep(interval)
                    continue

            ver_req = urllib.request.Request(f'http://127.0.0.1:{temp_port}/version.json')
            with urllib.request.urlopen(ver_req, timeout=interval) as resp:
                if resp.status != 200:
                    time.sleep(interval)
                    continue
                data = json.loads(resp.read().decode('utf-8'))
                if data.get('version', '') != expected_version:
                    time.sleep(interval)
                    continue

            hb_req = urllib.request.Request(
                f'http://127.0.0.1:{temp_port}/heartbeat',
                data=b'{}', method='POST',
            )
            with urllib.request.urlopen(hb_req, timeout=interval) as hb_resp:
                if hb_resp.status != 200:
                    time.sleep(interval)
                    continue

            css_ok = False
            for css_path in ('/assets/css/index.css', '/assets/css/light-theme.css',
                             '/assets/css/ai_learning.css'):
                try:
                    css_req = urllib.request.Request(f'http://127.0.0.1:{temp_port}{css_path}')
                    with urllib.request.urlopen(css_req, timeout=interval) as css_resp:
                        if css_resp.status == 200:
                            css_ok = True
                            break
                except (urllib.error.URLError, urllib.error.HTTPError, OSError):
                    continue
            if not css_ok:
                time.sleep(interval)
                continue

            return True

        except (urllib.error.URLError, urllib.error.HTTPError, OSError, json.JSONDecodeError):
            time.sleep(interval)
            continue

    return False


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


def _kill_server(app_root: str):
    """根据状态记录的 PID 与创建时间，安全终止 server.py 进程。"""
    state = read_state(app_root)
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
        from .path_safety import is_dev_repo
        if is_dev_repo(image_path) or is_dev_repo(app_root):
            return
            
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


def restart_server(app_root: str, port: int = 8765) -> bool:
    """停止旧 server.py，在指定端口启动新 server.py。"""
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
        with open(os.path.join(app_root, 'server.pid'), 'w') as f:
            f.write(str(proc.pid))
    except OSError:
        pass

    state_updates = {
        'serverPid': proc.pid,
    }
    if creation_time is not None:
        state_updates['serverCreationTime'] = creation_time
    write_state(app_root, state_updates)

    time.sleep(0.5)
    poll_result = proc.poll()
    if poll_result is not None:
        return False

    return True


def _list_files_recursive(directory: str) -> list:
    """递归列出目录下所有相对路径（仅文件）。"""
    result = []
    for root, dirs, files in os.walk(directory):
        for fn in files:
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, directory)
            result.append(rel)
    return result


def _cleanup_dir(directory: str):
    if directory and os.path.isdir(directory):
        try:
            shutil.rmtree(directory)
        except OSError:
            pass
