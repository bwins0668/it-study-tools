#!/usr/bin/env python3
"""Test suite for updater/zip_safe.py"""

import hashlib
import os
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from updater.zip_safe import safe_extract, verify_sha256, compute_sha256


def _make_zip(zip_path, entries):
    """Create a ZIP file with given entries. Each entry is (name, content)."""
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for name, content in entries:
            zf.writestr(name, content)


class TestSafeExtract(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()

    def tearDown(self):
        self.temp.cleanup()

    def test_normal_extract(self):
        zip_path = os.path.join(self.temp.name, 'test.zip')
        target = os.path.join(self.temp.name, 'out')
        _make_zip(zip_path, [
            ('file1.txt', 'hello'),
            ('sub/file2.txt', 'world'),
        ])
        extracted = safe_extract(zip_path, target)
        self.assertEqual(len(extracted), 2)
        self.assertTrue(os.path.isfile(os.path.join(target, 'file1.txt')))
        self.assertTrue(os.path.isfile(os.path.join(target, 'sub', 'file2.txt')))
        with open(os.path.join(target, 'file1.txt')) as f:
            self.assertEqual(f.read(), 'hello')

    def test_path_traversal_simple(self):
        zip_path = os.path.join(self.temp.name, 'evil.zip')
        target = os.path.join(self.temp.name, 'out')
        _make_zip(zip_path, [
            ('../../etc/passwd', 'evil'),
        ])
        with self.assertRaises(ValueError):
            safe_extract(zip_path, target)

    def test_path_traversal_windows(self):
        zip_path = os.path.join(self.temp.name, 'evil2.zip')
        target = os.path.join(self.temp.name, 'out')
        _make_zip(zip_path, [
            ('..\\..\\windows\\system32\\evil.dll', 'evil'),
        ])
        with self.assertRaises(ValueError):
            safe_extract(zip_path, target)

    def test_absolute_path(self):
        zip_path = os.path.join(self.temp.name, 'abs.zip')
        target = os.path.join(self.temp.name, 'out')
        _make_zip(zip_path, [
            ('/etc/passwd', 'evil'),
        ])
        with self.assertRaises(ValueError):
            safe_extract(zip_path, target)

    def test_windows_absolute_drive(self):
        zip_path = os.path.join(self.temp.name, 'drive.zip')
        target = os.path.join(self.temp.name, 'out')
        _make_zip(zip_path, [
            ('C:\\Windows\\evil.dll', 'evil'),
        ])
        with self.assertRaises(ValueError):
            safe_extract(zip_path, target)

    def test_null_byte(self):
        """ZIP format does not allow null bytes in filenames at entry level;
        safe_extract on a real ZIP with an entry created via writestr
        should either raise for the resulting mangled path or succeed harmlessly.
        In either case it must NOT extract outside the target directory."""
        zip_path = os.path.join(self.temp.name, 'null.zip')
        target = os.path.join(self.temp.name, 'out')
        os.makedirs(target, exist_ok=True)
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
            zf.writestr('file\x00.txt', 'content')
        # Should not leave files outside target
        try:
            safe_extract(zip_path, target)
        except (ValueError, zipfile.BadZipFile):
            pass
        # Verify no files leaked outside target
        for root, dirs, files in os.walk(self.temp.name):
            for fn in files:
                full = os.path.join(root, fn)
                self.assertTrue(full.startswith(os.path.normpath(target) + os.sep) or full == zip_path,
                                f'File leaked outside target: {full}')

    def test_windows_reserved_name(self):
        zip_path = os.path.join(self.temp.name, 'reserved.zip')
        target = os.path.join(self.temp.name, 'out')
        _make_zip(zip_path, [
            ('CON.txt', 'reserved'),
        ])
        with self.assertRaises(ValueError):
            safe_extract(zip_path, target)

    def test_compression_bomb(self):
        zip_path = os.path.join(self.temp.name, 'bomb.zip')
        target = os.path.join(self.temp.name, 'out')
        # Create a highly compressible entry
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
            zf.writestr('bomb.txt', 'A' * 100 * 1024 * 1024)  # ~100 MB of same byte
        # Should raise due to compression ratio
        with self.assertRaises(ValueError):
            safe_extract(zip_path, target)

    def test_too_many_entries(self):
        zip_path = os.path.join(self.temp.name, 'many.zip')
        target = os.path.join(self.temp.name, 'out')
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
            for i in range(5001):
                zf.writestr(f'file{i}.txt', 'x')
        with self.assertRaises(ValueError):
            safe_extract(zip_path, target)

    def test_file_not_found(self):
        with self.assertRaises(FileNotFoundError):
            safe_extract('/nonexistent/path.zip', self.temp.name)

    def test_bad_zip_file(self):
        zip_path = os.path.join(self.temp.name, 'bad.zip')
        with open(zip_path, 'wb') as f:
            f.write(b'not a zip file')
        with self.assertRaises(zipfile.BadZipFile):
            safe_extract(zip_path, self.temp.name)

    def test_empty_directory_skipped(self):
        zip_path = os.path.join(self.temp.name, 'empty.zip')
        target = os.path.join(self.temp.name, 'out')
        _make_zip(zip_path, [
            ('empty_dir/', ''),  # zip directory entry
            ('real_file.txt', 'hello'),
        ])
        extracted = safe_extract(zip_path, target)
        self.assertEqual(len(extracted), 1)
        self.assertIn('real_file.txt', extracted)


class TestSha256(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()

    def tearDown(self):
        self.temp.cleanup()

    def test_compute_sha256(self):
        path = os.path.join(self.temp.name, 'test.bin')
        data = b'hello world'
        with open(path, 'wb') as f:
            f.write(data)
        expected = hashlib.sha256(data).hexdigest()
        actual = compute_sha256(path)
        self.assertEqual(actual, expected)

    def test_verify_match(self):
        path = os.path.join(self.temp.name, 'test.bin')
        data = b'test data'
        with open(path, 'wb') as f:
            f.write(data)
        h = hashlib.sha256(data).hexdigest()
        self.assertTrue(verify_sha256(path, h))

    def test_verify_mismatch(self):
        path = os.path.join(self.temp.name, 'test.bin')
        with open(path, 'wb') as f:
            f.write(b'real data')
        with open(path, 'ab') as f:
            f.write(b'tampered')
        wrong_hash = hashlib.sha256(b'real data').hexdigest()
        self.assertFalse(verify_sha256(path, wrong_hash))

    def test_verify_case_insensitive(self):
        path = os.path.join(self.temp.name, 'test.bin')
        data = b'some data'
        with open(path, 'wb') as f:
            f.write(data)
        h = hashlib.sha256(data).hexdigest()
        self.assertTrue(verify_sha256(path, h.upper()))

    def test_verify_bad_hash_format(self):
        path = os.path.join(self.temp.name, 'test.bin')
        with open(path, 'wb') as f:
            f.write(b'x')
        self.assertFalse(verify_sha256(path, 'too-short'))
        self.assertFalse(verify_sha256(path, 'g' + '0' * 63))  # invalid hex char
        self.assertFalse(verify_sha256(path, ''))
        self.assertFalse(verify_sha256(path, 12345))


if __name__ == '__main__':
    unittest.main()
