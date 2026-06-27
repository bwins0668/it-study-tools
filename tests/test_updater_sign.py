#!/usr/bin/env python3
"""Test suite for updater/sign_verify.py"""

import json
import os
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from updater.sign_verify import (
    generate_dev_keypair,
    get_embedded_public_key,
    is_signature_configured,
    load_public_key,
    sign_manifest,
    verify_manifest_signature,
)


class TestSignVerify(unittest.TestCase):
    """Test the core sign/verify cycle and edge cases."""

    def setUp(self):
        # Generate a dev keypair for each test
        self.pub_key_pem, self.priv_key_pem = generate_dev_keypair()

        # Write the private key to a temp file for sign_manifest()
        self.temp_dir = tempfile.TemporaryDirectory()
        self.priv_key_path = os.path.join(self.temp_dir.name, "dev_private.pem")
        with open(self.priv_key_path, "wb") as f:
            f.write(self.priv_key_pem)

        # A sample manifest
        self.manifest = {
            "version": "2.0.0",
            "release_date": "2026-06-27",
            "description": "Test release",
            "files": ["app.exe", "data.db"],
        }

    def tearDown(self):
        self.temp_dir.cleanup()

    def test_generate_dev_keypair_returns_valid_pem(self):
        """generate_dev_keypair() returns PEM bytes that can be loaded."""
        pub, priv = self.pub_key_pem, self.priv_key_pem
        # Both should be non-empty bytes
        self.assertIsInstance(pub, bytes)
        self.assertIsInstance(priv, bytes)
        self.assertTrue(pub.startswith(b"-----BEGIN PUBLIC KEY-----"))
        self.assertTrue(priv.startswith(b"-----BEGIN PRIVATE KEY-----"))

        # Should be loadable by cryptography
        key = load_public_key(pub)
        self.assertIsNotNone(key)

    def test_sign_manifest_returns_base64_string(self):
        """sign_manifest() returns a base64-encoded ASCII string."""
        sig = sign_manifest(self.manifest, self.priv_key_path)
        self.assertIsInstance(sig, str)

        # Verify it's valid base64 (no exception on decode)
        import base64
        raw = base64.b64decode(sig)
        # Ed25519 signatures are 64 bytes
        self.assertEqual(len(raw), 64)

    def test_verify_valid_signature_returns_true(self):
        """verify_manifest_signature() returns True for a valid signature."""
        sig = sign_manifest(self.manifest, self.priv_key_path)
        result = verify_manifest_signature(self.manifest, sig, self.pub_key_pem)
        self.assertTrue(result)

    def test_tampered_manifest_returns_false(self):
        """Tampering with manifest data causes verification to fail."""
        sig = sign_manifest(self.manifest, self.priv_key_path)

        # Tamper with a value
        tampered = dict(self.manifest)
        tampered["version"] = "9.9.9"
        result = verify_manifest_signature(tampered, sig, self.pub_key_pem)
        self.assertFalse(result)

    def test_tampered_signature_returns_false(self):
        """Tampering with the signature string causes verification to fail."""
        sig = sign_manifest(self.manifest, self.priv_key_path)

        # Flip one char in the base64 signature
        mangled_sig = list(sig)
        mangled_sig[0] = "A" if mangled_sig[0] != "A" else "B"
        mangled_sig = "".join(mangled_sig)

        result = verify_manifest_signature(self.manifest, mangled_sig, self.pub_key_pem)
        self.assertFalse(result)

    def test_empty_signature_returns_false(self):
        """Empty string as signature returns False (fail-closed)."""
        sig = sign_manifest(self.manifest, self.priv_key_path)
        result = verify_manifest_signature(self.manifest, "", self.pub_key_pem)
        self.assertFalse(result)

    def test_none_signature_returns_false(self):
        """None as signature returns False (fail-closed)."""
        result = verify_manifest_signature(self.manifest, None, self.pub_key_pem)
        self.assertFalse(result)

    def test_missing_signature_field_returns_false(self):
        """When signature field is missing, verify aborts — treat as if None."""
        result = verify_manifest_signature(self.manifest, "", self.pub_key_pem)
        self.assertFalse(result)

    def test_bad_base64_signature_returns_false(self):
        """Non-base64 signature string returns False."""
        result = verify_manifest_signature(
            self.manifest, "!!!not-base64!!!", self.pub_key_pem
        )
        self.assertFalse(result)

    def test_wrong_public_key_returns_false(self):
        """Verification with a different public key returns False."""
        sig = sign_manifest(self.manifest, self.priv_key_path)

        # Generate a different keypair — the verification should fail
        other_pub, _ = generate_dev_keypair()
        result = verify_manifest_signature(self.manifest, sig, other_pub)
        self.assertFalse(result)


class TestEmbeddedPublicKey(unittest.TestCase):
    """Tests for the built-in embedded public key."""

    def test_get_embedded_public_key_returns_pem(self):
        """get_embedded_public_key() returns valid PEM bytes."""
        pem = get_embedded_public_key()
        self.assertIsInstance(pem, bytes)
        self.assertTrue(pem.startswith(b"-----BEGIN PUBLIC KEY-----"))

    def test_embedded_key_is_loadable(self):
        """The embedded public key can be loaded by cryptography."""
        pem = get_embedded_public_key()
        key = load_public_key(pem)
        self.assertIsNotNone(key)

    def test_is_signature_configured_returns_true(self):
        """is_signature_configured() returns True when embedded key is valid."""
        self.assertTrue(is_signature_configured())


class TestSignedManifestRoundTrip(unittest.TestCase):
    """Simulates the full create_release flow: sign then verify."""

    def setUp(self):
        self.manifest = {
            "version": "3.1.0",
            "release_date": "2026-07-01",
            "description": "Round-trip release",
            "files": ["installer.exe", "checksums.txt"],
            "notes": "This is a test",
        }
        self.temp_dir = tempfile.TemporaryDirectory()
        self.priv_key_path = os.path.join(self.temp_dir.name, "release_key.pem")

        # Generate dev keypair and persist the private key
        self.pub_pem, priv_pem = generate_dev_keypair()
        with open(self.priv_key_path, "wb") as f:
            f.write(priv_pem)

    def tearDown(self):
        self.temp_dir.cleanup()

    def test_full_round_trip(self):
        """Sign a manifest, attach signature, and verify successfully."""
        sig = sign_manifest(self.manifest, self.priv_key_path)

        # Add the signature to the manifest (as the real app would)
        manifest_with_sig = dict(self.manifest)
        manifest_with_sig["signature"] = sig

        # Verify against the signature value (not the 'signature' key in data)
        result = verify_manifest_signature(self.manifest, sig, self.pub_pem)
        self.assertTrue(result)

    def test_verify_fails_without_signature_field(self):
        """After removing signature, verification returns False."""
        sig = sign_manifest(self.manifest, self.priv_key_path)

        # Remove the signature — verify_manifest_signature expects empty/None
        result = verify_manifest_signature(self.manifest, "", self.pub_pem)
        self.assertFalse(result)

    def test_verify_fails_after_version_modified(self):
        """Modifying version in the manifest causes verification to fail."""
        sig = sign_manifest(self.manifest, self.priv_key_path)

        # Mutate the manifest
        modified = dict(self.manifest)
        modified["version"] = "999.999.999"
        result = verify_manifest_signature(modified, sig, self.pub_pem)
        self.assertFalse(result)

    def test_verify_realistic_manifest_with_embedded_signature(self):
        """模拟真实发布流程：manifest 内嵌 'signature' 键后仍能通过验证。

        这是 create_release.py 和 check_update.py 的真实数据流：
          sign_manifest(data, key) → data['signature'] = sig → json.dump(data, file)
          读取时 json.load(file) → verify_manifest_signature(data, data['signature'])
        """
        sig = sign_manifest(self.manifest, self.priv_key_path)

        # 模拟真实 manifest（内嵌 signature 键）
        realistic = dict(self.manifest)
        realistic['signature'] = sig

        # 验证时使用 data['signature']（而非分离传入的 sig）
        result = verify_manifest_signature(realistic, realistic['signature'], self.pub_pem)
        self.assertTrue(result,
                        '内嵌 signature 的 manifest 验证应该通过（verify 应自动剥离 signature 键）')


if __name__ == "__main__":
    unittest.main()
