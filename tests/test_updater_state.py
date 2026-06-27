#!/usr/bin/env python3
"""Test suite for updater/state.py"""

import json
import os
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from updater.state import read_state, write_state, reset_state, get_etag, set_etag


class TestReadState(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()

    def tearDown(self):
        self.temp.cleanup()

    def test_file_not_exists_returns_defaults(self):
        state = read_state(self.temp.name)
        self.assertEqual(state['schemaVersion'], 1)
        self.assertEqual(state['downloadStage'], 'idle')
        self.assertEqual(state['autoDownload'], True)
        self.assertIsNone(state['lastCheckAt'])
        self.assertIsNone(state['lastError'])

    def test_valid_state_file(self):
        path = os.path.join(self.temp.name, 'updater-state.json')
        with open(path, 'w', encoding='utf-8') as f:
            json.dump({
                'schemaVersion': 1,
                'currentVersion': '2026.7.1',
                'downloadStage': 'ready',
                'autoDownload': False,
            }, f)
        state = read_state(self.temp.name)
        self.assertEqual(state['currentVersion'], '2026.7.1')
        self.assertEqual(state['downloadStage'], 'ready')
        self.assertEqual(state['autoDownload'], False)

    def test_corrupt_json_recovers(self):
        path = os.path.join(self.temp.name, 'updater-state.json')
        with open(path, 'w', encoding='utf-8') as f:
            f.write('{corrupt}')
        state = read_state(self.temp.name)
        self.assertEqual(state['lastError'], 'state_corrupt_recovered')
        self.assertEqual(state['downloadStage'], 'idle')

    def test_not_dict_recovers(self):
        path = os.path.join(self.temp.name, 'updater-state.json')
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(['list', 'not', 'dict'], f)
        state = read_state(self.temp.name)
        self.assertEqual(state['lastError'], 'state_not_dict_recovered')

    def test_missing_keys_filled(self):
        path = os.path.join(self.temp.name, 'updater-state.json')
        with open(path, 'w', encoding='utf-8') as f:
            json.dump({'schemaVersion': 1}, f)  # minimal
        state = read_state(self.temp.name)
        self.assertIn('autoDownload', state)
        self.assertIn('updateReady', state)
        self.assertIn('downloadStage', state)
        self.assertEqual(state['downloadStage'], 'idle')


class TestWriteState(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()

    def tearDown(self):
        self.temp.cleanup()

    def test_writes_and_merges(self):
        result = write_state(self.temp.name, {'currentVersion': '2026.7.1'})
        self.assertEqual(result['currentVersion'], '2026.7.1')
        # Verify on disk
        state = read_state(self.temp.name)
        self.assertEqual(state['currentVersion'], '2026.7.1')

    def test_atomic_write_leaves_backup_on_crash(self):
        write_state(self.temp.name, {'currentVersion': '2026.7.1'})
        state = read_state(self.temp.name)
        self.assertEqual(state['currentVersion'], '2026.7.1')

    def test_overwrites_previous_values(self):
        write_state(self.temp.name, {'downloadStage': 'downloading'})
        write_state(self.temp.name, {'downloadStage': 'ready'})
        state = read_state(self.temp.name)
        self.assertEqual(state['downloadStage'], 'ready')


class TestResetState(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()

    def tearDown(self):
        self.temp.cleanup()

    def test_resets_to_defaults(self):
        write_state(self.temp.name, {
            'currentVersion': '2026.7.1',
            'downloadStage': 'ready',
        })
        reset_state(self.temp.name)
        state = read_state(self.temp.name)
        self.assertEqual(state['currentVersion'], '')
        self.assertEqual(state['downloadStage'], 'idle')

    def test_schema_version_preserved(self):
        reset_state(self.temp.name)
        state = read_state(self.temp.name)
        self.assertEqual(state['schemaVersion'], 1)


class TestEtag(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()

    def tearDown(self):
        self.temp.cleanup()

    def test_default_none(self):
        etag, lm = get_etag(self.temp.name)
        self.assertIsNone(etag)
        self.assertIsNone(lm)

    def test_set_and_get(self):
        set_etag(self.temp.name, '"abc123"', 'Mon, 01 Jan 2026 00:00:00 GMT')
        etag, lm = get_etag(self.temp.name)
        self.assertEqual(etag, '"abc123"')
        self.assertEqual(lm, 'Mon, 01 Jan 2026 00:00:00 GMT')

    def test_set_none(self):
        set_etag(self.temp.name, None, None)
        etag, lm = get_etag(self.temp.name)
        self.assertIsNone(etag)
        self.assertIsNone(lm)


if __name__ == '__main__':
    unittest.main()
