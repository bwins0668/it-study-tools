#!/usr/bin/env python3
"""Test suite for updater/check_update.py"""

import json
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import ANY, MagicMock, patch, mock_open

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from updater.check_update import check_for_update, download_update, _find_zip_asset, _find_sha256_asset


SAMPLE_RELEASE = {
    'tag_name': 'v2026.8.0',
    'published_at': '2026-07-15T00:00:00Z',
    'body': 'Bug fixes and improvements',
    'assets': [
        {
            'name': 'StudyTools-Windows-x64.zip',
            'browser_download_url': 'https://github.com/owner/repo/releases/download/v2026.8.0/StudyTools-Windows-x64.zip',
            'size': 5000000,
        },
        {
            'name': 'StudyTools-Windows-x64.zip.sha256',
            'browser_download_url': 'https://github.com/owner/repo/releases/download/v2026.8.0/StudyTools-Windows-x64.zip.sha256',
            'size': 100,
        },
        {
            'name': 'release-manifest.json',
            'browser_download_url': 'https://github.com/owner/repo/releases/download/v2026.8.0/release-manifest.json',
            'size': 200,
        },
        {
            'name': 'release-manifest.json.sig',
            'browser_download_url': 'https://github.com/owner/repo/releases/download/v2026.8.0/release-manifest.json.sig',
            'size': 100,
        },
    ],
}


def _write_version(app_root, version='2026.7.1'):
    path = os.path.join(app_root, 'version.json')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump({'version': version}, f)


class TestAssetFinder(unittest.TestCase):
    def test_find_zip_asset(self):
        assets = [
            {'name': 'StudyTools-Windows-x64.zip'},
            {'name': 'release-manifest.json'},
        ]
        result = _find_zip_asset(assets)
        self.assertEqual(result['name'], 'StudyTools-Windows-x64.zip')

    def test_find_zip_asset_not_found(self):
        assets = [{'name': 'other-file.zip'}]
        self.assertIsNone(_find_zip_asset(assets))

    def test_find_sha256_asset(self):
        assets = [
            {'name': 'StudyTools-Windows-x64.zip.sha256'},
            {'name': 'release-manifest.json'},
        ]
        result = _find_sha256_asset(assets, 'StudyTools-Windows-x64.zip')
        self.assertEqual(result['name'], 'StudyTools-Windows-x64.zip.sha256')

    def test_find_sha256_asset_not_found(self):
        self.assertIsNone(_find_sha256_asset([], 'test.zip'))


@patch('updater.check_update.is_signature_configured', return_value=True)
@patch('updater.check_update.verify_manifest_signature', return_value=True)
class TestCheckForUpdate(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        _write_version(self.temp.name, '2026.7.1')

        # Mock urllib urlopen
        self.urlopen_patcher = patch('urllib.request.urlopen')
        self.mock_urlopen = self.urlopen_patcher.start()

        # Default urlopen responses for manifest and sig
        self.mock_manifest_resp = MagicMock()
        self.mock_manifest_resp.__enter__.return_value = self.mock_manifest_resp
        self.mock_manifest_resp.read.return_value = json.dumps({
            'version': '2026.8.0',
            'channel': 'stable',
            'zipName': 'StudyTools-Windows-x64.zip',
            'sha256': 'a' * 64,
            'keyId': 'prod-key-2026',
        }).encode('utf-8')
        
        self.mock_sig_resp = MagicMock()
        self.mock_sig_resp.__enter__.return_value = self.mock_sig_resp
        self.mock_sig_resp.read.return_value = b'mock-signature-base64'

        def _side_effect(req, **kwargs):
            url = req.full_url if hasattr(req, 'full_url') else req
            if 'release-manifest.json.sig' in url:
                return self.mock_sig_resp
            elif 'release-manifest.json' in url:
                return self.mock_manifest_resp
            return MagicMock()

        self.mock_urlopen.side_effect = _side_effect

    def tearDown(self):
        self.urlopen_patcher.stop()
        self.temp.cleanup()

    @patch('updater.check_update._github_request')
    def test_new_version_available(self, mock_request, mock_verify, mock_sig_config):
        mock_request.return_value = (200, {'ETag': '"abc123"', 'Last-Modified': 'Mon, 15 Jul 2026'}, json.dumps(SAMPLE_RELEASE).encode())
        result = check_for_update(self.temp.name)
        self.assertTrue(result['updateAvailable'])
        self.assertEqual(result['latestVersion'], '2026.8.0')
        self.assertEqual(result['currentVersion'], '2026.7.1')

    @patch('updater.check_update._github_request')
    def test_up_to_date(self, mock_request, mock_verify, mock_sig_config):
        # Same version as latest
        _write_version(self.temp.name, '2026.8.0')
        mock_request.return_value = (200, {}, json.dumps(SAMPLE_RELEASE).encode())
        result = check_for_update(self.temp.name)
        self.assertFalse(result['updateAvailable'])

    @patch('updater.check_update._github_request')
    def test_not_modified_304(self, mock_request, mock_verify, mock_sig_config):
        mock_request.return_value = (304, {}, b'')
        result = check_for_update(self.temp.name)
        self.assertFalse(result['updateAvailable'])
        self.assertEqual(result['currentVersion'], '2026.7.1')

    @patch('updater.check_update._github_request')
    def test_rate_limited(self, mock_request, mock_verify, mock_sig_config):
        mock_request.return_value = (403, {}, b'{}')
        result = check_for_update(self.temp.name)
        self.assertFalse(result['updateAvailable'])
        self.assertIn('error', result)

    @patch('updater.check_update._github_request')
    def test_network_error(self, mock_request, mock_verify, mock_sig_config):
        mock_request.side_effect = ConnectionError('connection refused')
        result = check_for_update(self.temp.name)
        self.assertFalse(result['updateAvailable'])
        self.assertIn('error', result)

    @patch('updater.check_update._github_request')
    def test_no_version_file(self, mock_request, mock_verify, mock_sig_config):
        empty_temp = tempfile.TemporaryDirectory()
        result = check_for_update(empty_temp.name)
        self.assertFalse(result['updateAvailable'])
        self.assertIn('error', result)
        empty_temp.cleanup()

    @patch('updater.check_update._github_request')
    def test_no_zip_asset_in_response(self, mock_request, mock_verify, mock_sig_config):
        no_zip_release = dict(SAMPLE_RELEASE)
        no_zip_release['assets'] = [
            {'name': 'release-manifest.json', 'browser_download_url': '...'},
            {'name': 'release-manifest.json.sig', 'browser_download_url': '...'},
        ]
        mock_request.return_value = (200, {}, json.dumps(no_zip_release).encode())
        result = check_for_update(self.temp.name)
        self.assertFalse(result['updateAvailable'])
        self.assertIn('error', result)


@patch('updater.check_update.is_signature_configured', return_value=True)
@patch('updater.check_update.verify_manifest_signature', return_value=True)
class TestDownloadUpdate(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        _write_version(self.temp.name, '2026.7.1')

    def tearDown(self):
        self.temp.cleanup()

    def test_missing_version_or_url(self, mock_verify, mock_sig_config):
        result = download_update(self.temp.name, {})
        self.assertFalse(result['success'])

        result = download_update(self.temp.name, {'latestVersion': '1.0.0'})
        self.assertFalse(result['success'])

    @patch('updater.check_update._download_file')
    @patch('updater.check_update._verify_sha256')
    def test_successful_download(self, mock_verify_sha, mock_dl, mock_verify, mock_sig_config):
        mock_verify_sha.return_value = True

        def _fake_download(url, target, app_root):
            os.makedirs(os.path.dirname(target), exist_ok=True)
            if target.endswith('release-manifest.json'):
                with open(target, 'w', encoding='utf-8') as f:
                    json.dump({
                        'version': '2026.8.0',
                        'channel': 'stable',
                        'zipName': 'StudyTools-Windows-x64.zip',
                        'sha256': 'a' * 64,
                        'keyId': 'prod-key-2026',
                    }, f)
            elif target.endswith('release-manifest.json.sig'):
                with open(target, 'w', encoding='utf-8') as f:
                    f.write('mock-signature-base64')
            else:
                with open(target, 'w') as f:
                    f.write('zip contents')

        mock_dl.side_effect = _fake_download

        latest_info = {
            'latestVersion': '2026.8.0',
            'downloadUrl': 'https://github.com/owner/repo/releases/download/v2026.8.0/StudyTools-Windows-x64.zip',
        }
        result = download_update(self.temp.name, latest_info)
        self.assertTrue(result['success'])
        self.assertEqual(result['stagedVersion'], '2026.8.0')
        self.assertIn('stagedZipPath', result)
        self.assertTrue(os.path.isdir(os.path.join(self.temp.name, '.update_staging_2026.8.0')))

    @patch('updater.check_update._download_file')
    @patch('updater.check_update._verify_sha256')
    def test_sha256_mismatch(self, mock_verify_sha, mock_dl, mock_verify, mock_sig_config):
        mock_verify_sha.return_value = False

        def _fake_download(url, target, app_root):
            os.makedirs(os.path.dirname(target), exist_ok=True)
            if target.endswith('release-manifest.json'):
                with open(target, 'w', encoding='utf-8') as f:
                    json.dump({
                        'version': '2026.8.0',
                        'channel': 'stable',
                        'zipName': 'StudyTools-Windows-x64.zip',
                        'sha256': 'a' * 64,
                        'keyId': 'prod-key-2026',
                    }, f)
            elif target.endswith('release-manifest.json.sig'):
                with open(target, 'w', encoding='utf-8') as f:
                    f.write('mock-signature-base64')
            else:
                with open(target, 'w') as f:
                    f.write('zip contents')
        mock_dl.side_effect = _fake_download

        latest_info = {
            'latestVersion': '2026.8.0',
            'downloadUrl': 'https://github.com/owner/repo/releases/download/v2026.8.0/StudyTools-Windows-x64.zip',
        }
        result = download_update(self.temp.name, latest_info)
        self.assertFalse(result['success'])
        self.assertIn('error', result)

    @patch('updater.check_update._download_file')
    def test_download_connection_error(self, mock_dl, mock_verify, mock_sig_config):
        mock_dl.side_effect = ConnectionError('network error')
        latest_info = {
            'latestVersion': '2026.8.0',
            'downloadUrl': 'https://github.com/owner/repo/releases/download/v2026.8.0/StudyTools-Windows-x64.zip',
        }
        result = download_update(self.temp.name, latest_info)
        self.assertFalse(result['success'])

    @patch('updater.check_update._download_file')
    @patch('updater.check_update._verify_sha256', return_value=True)
    def test_staging_dir_created(self, mock_verify_sha, mock_dl, mock_verify, mock_sig_config):
        def _fake_download(url, target, app_root):
            os.makedirs(os.path.dirname(target), exist_ok=True)
            if target.endswith('release-manifest.json'):
                with open(target, 'w', encoding='utf-8') as f:
                    json.dump({
                        'version': '2026.8.0',
                        'channel': 'stable',
                        'zipName': 'StudyTools-Windows-x64.zip',
                        'sha256': 'a' * 64,
                        'keyId': 'prod-key-2026',
                    }, f)
            elif target.endswith('release-manifest.json.sig'):
                with open(target, 'w', encoding='utf-8') as f:
                    f.write('mock-signature-base64')
            else:
                with open(target, 'w') as f:
                    f.write('zip contents')
        mock_dl.side_effect = _fake_download

        latest_info = {
            'latestVersion': '2026.8.0',
            'downloadUrl': 'https://github.com/owner/repo/releases/download/v2026.8.0/StudyTools-Windows-x64.zip',
        }
        download_update(self.temp.name, latest_info)
        staging = os.path.join(self.temp.name, '.update_staging_2026.8.0')
        self.assertTrue(os.path.isdir(staging))


if __name__ == '__main__':
    unittest.main()
