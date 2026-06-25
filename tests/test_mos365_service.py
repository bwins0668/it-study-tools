import json
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from mos365_service import MOS365Service, MOS365ServiceError


class MOS365ServiceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.service = MOS365Service(Path(__file__).resolve().parents[1], session_root=self.temp.name)

    def tearDown(self):
        self.temp.cleanup()

    def create_session(self, **changes):
        payload = {"mode": "mock", "scenarioId": "retail", "variant": 1}
        payload.update(changes)
        return self.service.create_session(payload)

    def test_creates_scoped_original_workbook_and_fifty_rules(self):
        session = self.create_session()
        self.assertEqual(len(session["tasks"]), 50)
        self.assertEqual(session["fileName"], f"MOS365_{session['sessionId']}.xlsx")
        self.assertTrue(session["environment"]["sandboxWritable"])

        paths = self.service._paths(session["sessionId"])
        self.assertTrue(paths.workbook.is_file())
        self.assertTrue(paths.manifest.is_file())
        self.assertEqual(paths.directory.parent, self.service.root)

        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        self.assertEqual(manifest["examCode"], "MOS365-EXCEL-GENERAL")
        self.assertEqual(len(manifest["taskRules"]), 50)

    def test_score_reads_formula_evidence_from_current_session_file(self):
        session = self.create_session()
        paths = self.service._paths(session["sessionId"])
        with zipfile.ZipFile(paths.workbook, "r") as archive:
            parts = {name: archive.read(name) for name in archive.namelist()}

        workbook = parts["xl/workbook.xml"].decode("utf-8")
        parts["xl/workbook.xml"] = workbook.replace('name="作業用"', 'name="店舗データ"').encode("utf-8")
        first_sheet = parts["xl/worksheets/sheet1.xml"].decode("utf-8")
        parts["xl/worksheets/sheet1.xml"] = first_sheet.replace(
            '<c r="E2" t="inlineStr"><is><t></t></is></c>',
            '<c r="E2"><f>C2*D2</f><v>0</v></c>',
        ).encode("utf-8")

        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            for name, value in parts.items():
                archive.writestr(name, value)

        result = self.service.score_session({"sessionId": session["sessionId"]})
        self.assertEqual(len(result["results"]), 50)
        self.assertEqual(result["results"][0]["status"], "pass")
        self.assertEqual(result["results"][0]["score"], 2)
        self.assertLess(result["percentage"], 100)

    def test_formula_normalization_accepts_optional_sheet_name_quotes(self):
        self.assertEqual(
            self.service._normal_formula("=SUM('店舗データ'!E2:E9)"),
            self.service._normal_formula("SUM(店舗データ!E2:E9)"),
        )

    def test_server_route_source_compiles_and_wires_mos_endpoints(self):
        server_source = (ROOT / "server.py").read_text(encoding="utf-8")
        compile(server_source, "server.py", "exec")
        self.assertIn("/api/mos365/environment", server_source)
        self.assertIn("/api/mos365/sessions", server_source)
        self.assertIn("/api/mos365/launch", server_source)
        self.assertIn("/api/mos365/score", server_source)
        self.assertIn("is_mos_local_request", server_source)

    def test_rejects_path_like_session_ids_and_arbitrary_deletes(self):
        with self.assertRaises(MOS365ServiceError) as invalid:
            self.service.score_session({"sessionId": "../../outside"})
        self.assertEqual(invalid.exception.code, "INVALID_SESSION")

        session = self.create_session()
        with self.assertRaises(MOS365ServiceError) as delete_denied:
            self.service.delete_current_session({
                "sessionId": session["sessionId"],
                "fileName": "C:/Users/example/Desktop/important.xlsx",
            })
        self.assertEqual(delete_denied.exception.code, "DELETE_DENIED")

        deleted = self.service.delete_current_session({
            "sessionId": session["sessionId"],
            "fileName": session["fileName"],
        })
        self.assertTrue(deleted["deleted"])
        self.assertFalse(self.service._paths(session["sessionId"]).workbook.exists())


if __name__ == "__main__":
    unittest.main()
