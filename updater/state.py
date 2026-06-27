#!/usr/bin/env python3
"""
updater/state.py — updater-state.json 原子读写与损坏恢复。

JSON Schema:
    {
        "schemaVersion": 1,
        "currentVersion": "...",
        "lastCheckAt": null,
        "lastCheckResult": null,         // "up_to_date" | "update_available" | "error"
        "latestVersion": null,
        "latestDownloadUrl": null,
        "etag": null,
        "lastModified": null,
        "downloadStage": "idle",         // "idle" | "downloading" | "verifying" | "ready"
        "downloadProgress": 0,
        "stagedZipPath": null,
        "stagedVersion": null,
        "rollbackPath": null,
        "updateReady": false,
        "updatedAt": null,
        "rolledBackAt": null,
        "autoDownload": true,
        "schedulerInstalled": false,
        "lastError": null
    }
"""

import json
import os
import shutil
import tempfile
from datetime import datetime, timezone

_STATE_FILENAME = 'updater-state.json'
_CURRENT_SCHEMA = 1

_DEFAULT_STATE = {
    'schemaVersion': _CURRENT_SCHEMA,
    'currentVersion': '',
    'lastCheckAt': None,
    'lastCheckResult': None,
    'latestVersion': None,
    'latestDownloadUrl': None,
    'etag': None,
    'lastModified': None,
    'downloadStage': 'idle',
    'downloadProgress': 0,
    'stagedZipPath': None,
    'stagedVersion': None,
    'rollbackPath': None,
    'updateReady': False,
    'updatedAt': None,
    'rolledBackAt': None,
    'autoDownload': True,
    'schedulerInstalled': False,
    'lastError': None,
}


def _state_path(app_root: str) -> str:
    return os.path.join(app_root, _STATE_FILENAME)


def read_state(app_root: str) -> dict:
    """读取 updater-state.json，文件不存在或损坏时返回默认值。"""
    path = _state_path(app_root)
    if not os.path.isfile(path):
        return dict(_DEFAULT_STATE)

    try:
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except (json.JSONDecodeError, OSError):
        # 备份损坏的文件
        _backup_corrupt(path)
        state = dict(_DEFAULT_STATE)
        state['lastError'] = 'state_corrupt_recovered'
        return state

    if not isinstance(data, dict):
        _backup_corrupt(path)
        state = dict(_DEFAULT_STATE)
        state['lastError'] = 'state_not_dict_recovered'
        return state

    # Schema 迁移
    data['schemaVersion'] = data.get('schemaVersion', 1)
    for key, default in _DEFAULT_STATE.items():
        if key not in data:
            data[key] = default

    return data


def write_state(app_root: str, updates: dict) -> dict:
    """原子写入 updater-state.json。返回更新后的完整 state。"""
    current = read_state(app_root)
    current.update(updates)
    path = _state_path(app_root)

    # 原子写入
    fd, tmp_path = tempfile.mkstemp(dir=os.path.dirname(path), suffix='.tmp')
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as f:
            json.dump(current, f, ensure_ascii=False, indent=2)
        os.replace(tmp_path, path)
    except Exception:
        # 清理临时文件
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
        raise

    return current


def reset_state(app_root: str) -> dict:
    """重置为默认状态。"""
    defaults = dict(_DEFAULT_STATE)
    write_state(app_root, defaults)
    return defaults


def get_etag(app_root: str) -> tuple:
    """返回 (etag, last_modified) 或 (None, None)。"""
    state = read_state(app_root)
    return state.get('etag'), state.get('lastModified')


def set_etag(app_root: str, etag, last_modified=None) -> None:
    """持久化 ETag 和 Last-Modified。"""
    updates = {'etag': etag, 'lastModified': last_modified}
    write_state(app_root, updates)


def _backup_corrupt(path):
    """备份损坏的状态文件。"""
    try:
        ts = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S')
        backup_path = f'{path}.corrupt_{ts}'
        shutil.copy2(path, backup_path)
    except OSError:
        pass
