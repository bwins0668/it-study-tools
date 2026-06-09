import json
import os
import sys
import tempfile
import unittest
from unittest import mock

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from study_ai import (
    LearningStore,
    ServiceError,
    _translate_missing_with_public,
    build_tutor_messages,
    call_provider,
    validate_question,
)


class LearningStoreTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.store = LearningStore(os.path.join(self.temp_dir.name, "study.db"))

    def tearDown(self):
        self.temp_dir.cleanup()

    def test_import_is_idempotent_and_dashboard_has_five_subjects(self):
        result = self.store.import_progress(
            {"progress": {"sql": [1, 2], "java": [1], "python": [1]}}
        )
        self.assertTrue(result["imported"])
        self.assertFalse(
            self.store.import_progress({"progress": {"sql": [3]}})["imported"]
        )
        dashboard = self.store.dashboard()
        self.assertEqual(5, len(dashboard["subjects"]))
        self.assertEqual(3, len(dashboard["todayPlan"]))

    def test_event_and_plan_completion(self):
        self.store.record_event(
            {
                "subject": "sql",
                "eventType": "quiz_answer",
                "itemId": "1",
                "topic": "SELECT",
                "success": False,
                "score": 0,
            }
        )
        dashboard = self.store.dashboard()
        self.assertEqual("SELECT", dashboard["weakTopics"][0]["topic"])
        plan_id = dashboard["todayPlan"][0]["id"]
        self.store.complete_plan({"id": plan_id})
        refreshed = self.store.dashboard()
        completed = [item for item in refreshed["todayPlan"] if item["id"] == plan_id]
        self.assertTrue(completed[0]["completed_at"])


class ValidationTests(unittest.TestCase):
    def test_sql_question_executes_against_fixture(self):
        result = validate_question(
            "sql",
            {
                "titleZh": "学生查询",
                "titleJa": "学生検索",
                "dbGroup": "school",
                "solutionQuery": "SELECT student_id FROM students_mst",
            },
            None,
            None,
        )
        self.assertTrue(result["executable"])

    def test_choice_question_requires_four_unique_options(self):
        with self.assertRaises(ServiceError):
            validate_question(
                "itpass",
                {
                    "titleZh": "题",
                    "titleJa": "問題",
                    "questionZh": "问题",
                    "questionJa": "問題",
                    "optionsZh": ["A", "A", "C", "D"],
                    "optionsJa": ["A", "B", "C", "D"],
                    "answer": 0,
                    "explanationZh": "解释",
                    "explanationJa": "解説",
                },
                None,
                None,
            )

    def test_hint_level_one_prohibits_answer_code(self):
        messages = build_tutor_messages(
            {
                "action": "hint",
                "hintLevel": 1,
                "messages": [{"role": "user", "content": "给提示"}],
                "context": {"subject": "python"},
            }
        )
        self.assertIn("禁止代码答案", messages[0]["content"])


class ProviderTests(unittest.TestCase):
    @mock.patch("study_ai._request_json")
    def test_openai_response(self, request_json):
        request_json.return_value = {"output_text": "OpenAI response"}
        result = call_provider(
            "openai",
            "gpt-5-mini",
            [{"role": "user", "content": "Hello"}],
            api_key="session-key",
        )
        self.assertEqual("OpenAI response", result["text"])
        self.assertEqual("openai", result["provider"])

    @mock.patch("study_ai._request_json")
    def test_gemini_response(self, request_json):
        request_json.return_value = {
            "candidates": [
                {"content": {"parts": [{"text": "Gemini response"}]}}
            ]
        }
        result = call_provider(
            "gemini",
            "gemini-2.5-flash",
            [{"role": "user", "content": "Hello"}],
            api_key="session-key",
        )
        self.assertEqual("Gemini response", result["text"])
        self.assertEqual("gemini", result["provider"])

    @mock.patch("study_ai._request_json")
    def test_ollama_response(self, request_json):
        request_json.return_value = {
            "message": {"content": "Ollama response"}
        }
        result = call_provider(
            "ollama",
            "qwen3:latest",
            [{"role": "user", "content": "Hello"}],
        )
        self.assertEqual("Ollama response", result["text"])
        self.assertEqual("ollama", result["provider"])

    def test_missing_key_is_distinct_error(self):
        with mock.patch.dict(os.environ, {}, clear=True):
            with self.assertRaises(ServiceError) as context:
                call_provider(
                    "openai",
                    "gpt-5-mini",
                    [{"role": "user", "content": "Hello"}],
                )
        self.assertEqual("API_KEY_MISSING", context.exception.code)


class TranslationBatchTests(unittest.TestCase):
    @mock.patch("study_ai._public_translate_chunk")
    def test_public_text_items_are_translated_in_one_batch(self, translate_chunk):
        translate_chunk.side_effect = lambda text, *_args: (
            text.replace("First label", "Premier libelle")
            .replace("Second label", "Deuxieme libelle")
        )
        items = [
            {
                "id": "first",
                "key": "first",
                "source_lang": "en",
                "source_hash": "hash-first",
                "format": "text",
                "text": "First label",
            },
            {
                "id": "second",
                "key": "second",
                "source_lang": "en",
                "source_hash": "hash-second",
                "format": "text",
                "text": "Second label",
            },
        ]

        records = _translate_missing_with_public("fr", items)

        self.assertEqual(1, translate_chunk.call_count)
        self.assertEqual(
            {
                "hash-first": "Premier libelle",
                "hash-second": "Deuxieme libelle",
            },
            {
                record["source_hash"]: record["translated_text"]
                for record in records
            },
        )

    @mock.patch("study_ai._public_translate_chunk")
    def test_public_batch_falls_back_to_individual_items(self, translate_chunk):
        translate_chunk.side_effect = [
            "Batch response without markers",
            "Premier libelle",
            "Deuxieme libelle",
        ]
        items = [
            {
                "id": "first",
                "key": "first",
                "source_lang": "en",
                "source_hash": "hash-first",
                "format": "text",
                "text": "First label",
            },
            {
                "id": "second",
                "key": "second",
                "source_lang": "en",
                "source_hash": "hash-second",
                "format": "text",
                "text": "Second label",
            },
        ]

        records = _translate_missing_with_public("fr", items)

        self.assertEqual(3, translate_chunk.call_count)
        self.assertEqual(
            ["Premier libelle", "Deuxieme libelle"],
            [record["translated_text"] for record in records],
        )


if __name__ == "__main__":
    unittest.main()
