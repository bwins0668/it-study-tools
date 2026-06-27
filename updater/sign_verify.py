#!/usr/bin/env python3
"""
updater/sign_verify.py — Ed25519 manifest 签名验证。

使用 `cryptography` 库的 Ed25519 实现。
生产环境公钥内嵌于此模块，私钥仅由发布者持有。

Public API:
    sign_manifest(manifest_data, private_key_path) -> str
    verify_manifest_signature(manifest_data, signature_b64, public_key_pem=None) -> bool
    get_embedded_public_key() -> bytes
    generate_dev_keypair() -> tuple[bytes, bytes]
"""

import base64
import json
import os

HAS_CRYPTOGRAPHY = False
try:
    from cryptography.exceptions import InvalidSignature
    from cryptography.hazmat.primitives import serialization
    from cryptography.hazmat.primitives.asymmetric import ed25519
    HAS_CRYPTOGRAPHY = True
except ModuleNotFoundError:
    pass

# 内嵌生产公钥（PEM 格式）
_EMBEDDED_PUBLIC_KEY_PEM = b"""\
-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA+maLXkHz3xhW80D67SjYZH4tlvhaFSDXLhNfZvaacEM=
-----END PUBLIC KEY-----"""

# 受托公钥注册表
_AUTHORIZED_PUBLIC_KEYS = {
    'prod-key-2026': _EMBEDDED_PUBLIC_KEY_PEM
}


def get_embedded_public_key() -> bytes:
    """返回嵌入式生产 Ed25519 公钥（PEM 字节）。"""
    return _EMBEDDED_PUBLIC_KEY_PEM


def load_public_key(pem_data: bytes = None) -> 'ed25519.Ed25519PublicKey':
    """加载 Ed25519 公钥。默认使用内嵌公钥。"""
    if not HAS_CRYPTOGRAPHY:
        raise RuntimeError("cryptography module is not available")
    if pem_data is None:
        pem_data = _EMBEDDED_PUBLIC_KEY_PEM
    return serialization.load_pem_public_key(pem_data)


def load_private_key(path: str) -> 'ed25519.Ed25519PrivateKey':
    """从 PEM 文件加载 Ed25519 私钥。"""
    if not HAS_CRYPTOGRAPHY:
        raise RuntimeError("cryptography module is not available")
    if not os.path.isfile(path):
        raise FileNotFoundError(f'私钥文件不存在: {path}')
    with open(path, 'rb') as f:
        return serialization.load_pem_private_key(f.read(), password=None)


def sign_manifest(manifest_data: dict, private_key_path: str) -> str:
    """对 manifest 数据进行 Ed25519 签名。

    签名内容为 manifest 规范化的 JSON 字节（key 排序，无多余空白）。
    返回 base64 编码的签名。

    Raises:
        FileNotFoundError: 私钥文件不存在。
        ValueError: 签名失败。
    """
    if not HAS_CRYPTOGRAPHY:
        raise RuntimeError("cryptography module is not available")
    private_key = load_private_key(private_key_path)
    # 剥离 signature 字段以防万一
    verify_data = dict(manifest_data)
    verify_data.pop('signature', None)
    canonical = json.dumps(verify_data, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode('utf-8')
    signature = private_key.sign(canonical)
    return base64.b64encode(signature).decode('ascii')


def verify_manifest_signature(manifest_data: dict, signature_b64: str, public_key_pem: bytes = None) -> bool:
    """验证 manifest 的 Ed25519 签名。

    注意：manifest_data 可能包含 'signature' 键（从旧版或兼容性 JSON 读取时），
    签名规范化时会自动剥离该键。

    Returns:
        True 签名有效，False 签名缺失/无效/公钥不可用（fail-closed）。
    """
    if not HAS_CRYPTOGRAPHY:
        return False

    # 未提供签名 → fail-closed
    if not signature_b64 or not isinstance(signature_b64, str):
        return False

    # 客户端通过 keyId 选择内置公钥
    key_id = manifest_data.get('keyId')
    if public_key_pem is None:
        if not key_id:
            return False
        public_key_pem = _AUTHORIZED_PUBLIC_KEYS.get(key_id)

    if not public_key_pem:
        return False

    try:
        public_key = load_public_key(public_key_pem)
    except Exception:
        return False

    try:
        signature = base64.b64decode(signature_b64)
    except (base64.binascii.Error, ValueError):
        return False

    # 剥离 'signature' 键
    verify_data = dict(manifest_data)
    verify_data.pop('signature', None)
    canonical = json.dumps(verify_data, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode('utf-8')

    try:
        public_key.verify(signature, canonical)
        return True
    except InvalidSignature:
        return False


def generate_dev_keypair() -> tuple:
    """生成开发测试用 Ed25519 密钥对。

    Returns:
        (public_key_pem_bytes, private_key_pem_bytes)
    """
    if not HAS_CRYPTOGRAPHY:
        raise RuntimeError("cryptography module is not available")
    private_key = ed25519.Ed25519PrivateKey.generate()
    public_key = private_key.public_key()

    pub_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo,
    )
    priv_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    )
    return pub_pem, priv_pem


def is_signature_configured() -> bool:
    """检查签名验证是否已配置（公钥可用且 cryptography 可用）。"""
    if not HAS_CRYPTOGRAPHY:
        return False
    try:
        load_public_key()
        return True
    except Exception:
        return False

