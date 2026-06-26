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


class MOS365R17FormulaTextTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.service = MOS365Service(Path(__file__).resolve().parents[1], session_root=self.temp.name)

    def tearDown(self):
        self.temp.cleanup()

    def _create_r17_session_with_scored_manifest(self):
        session = self.service.create_session({"mode": "r17_static_training"})
        paths = self.service._paths(session["sessionId"])
        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        manifest["state"] = "attached"
        manifest["excelPid"] = 0
        manifest["attachedPid"] = 0
        manifest["completion"] = {"acknowledged": True, "acknowledgedAt": "", "acknowledgedPid": 0}
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        return session

    def test_r17_create_session(self):
        session = self.service.create_session({"mode": "r17_static_training"})
        self.assertEqual(session["mode"], "r17_static_training")
        self.assertEqual(session["staticTask"]["taskId"], "R17_STATIC_FORMULA_TEXT_DEMO")
        paths = self.service._paths(session["sessionId"])
        self.assertTrue(paths.workbook.is_file())
        self.assertTrue(paths.manifest.is_file())

    def test_r17_workbook_structure(self):
        session = self.service.create_session({"mode": "r17_static_training"})
        paths = self.service._paths(session["sessionId"])
        import zipfile
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            names = set(zf.namelist())
        self.assertIn("xl/workbook.xml", names)
        self.assertIn("xl/_rels/workbook.xml.rels", names)
        self.assertIn("xl/worksheets/sheet1.xml", names)
        self.assertIn("xl/worksheets/sheet2.xml", names)
        self.assertNotIn("xl/sharedStrings.xml", names)

    def test_r17_workbook_contains_expected_sheets_and_formula(self):
        session = self.service.create_session({"mode": "r17_static_training"})
        paths = self.service._paths(session["sessionId"])
        import zipfile
        from xml.etree import ElementTree as ET
        NS_MAIN = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
        NS_REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
        NS_PKG = "http://schemas.openxmlformats.org/package/2006/relationships"
        ns = {"m": NS_MAIN, "r": NS_REL, "pr": NS_PKG}
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            wb_root = ET.fromstring(zf.read("xl/workbook.xml"))
            sheet_names = [s.get("name", "") for s in wb_root.findall('.//m:sheets/m:sheet', ns)]
            self.assertIn("入力", sheet_names)
            self.assertIn("計算", sheet_names)
            calc_idx = sheet_names.index("計算") + 1
            calc_xml = zf.read(f"xl/worksheets/sheet{calc_idx}.xml")
            calc_root = ET.fromstring(calc_xml)
            for cell in calc_root.findall('.//m:c', ns):
                if cell.attrib.get("r") == "C2":
                    f_node = cell.find("m:f", ns)
                    self.assertIsNotNone(f_node)
                    self.assertEqual(f_node.text, "SUM(A2:B2)")
                    return
            self.fail("C2 not found in 計算 sheet")

    def test_r17_score_correct_formula(self):
        session = self._create_r17_session_with_scored_manifest()
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "correct")
        self.assertEqual(result["assessment"]["earned"], 1)
        self.assertEqual(result["assessment"]["total"], 1)
        self.assertEqual(result["assessment"]["assertions"][0]["result"], "correct")

    def test_r17_score_incorrect_formula(self):
        session = self._create_r17_session_with_scored_manifest()
        paths = self.service._paths(session["sessionId"])
        import zipfile
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        calc_xml = parts["xl/worksheets/sheet2.xml"].decode("utf-8")
        parts["xl/worksheets/sheet2.xml"] = calc_xml.replace(
            '<f>SUM(A2:B2)</f>', '<f>A2+B2</f>'
        ).encode("utf-8")
        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "incorrect")
        self.assertEqual(result["assessment"]["earned"], 0)
        self.assertEqual(result["assessment"]["assertions"][0]["result"], "incorrect")

    def test_r17_score_empty_cell(self):
        session = self._create_r17_session_with_scored_manifest()
        paths = self.service._paths(session["sessionId"])
        import zipfile
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        calc_xml = parts["xl/worksheets/sheet2.xml"].decode("utf-8")
        import re
        calc_xml = re.sub(r'<c r="C2">.*?</c>', '<c r="C2" t="inlineStr"><is><t></t></is></c>', calc_xml, flags=re.DOTALL)
        parts["xl/worksheets/sheet2.xml"] = calc_xml.encode("utf-8")
        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "incorrect")
        self.assertEqual(result["assessment"]["earned"], 0)

    def test_r17_score_text_formula_no_f_node(self):
        session = self._create_r17_session_with_scored_manifest()
        paths = self.service._paths(session["sessionId"])
        import zipfile
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        calc_xml = parts["xl/worksheets/sheet2.xml"].decode("utf-8")
        import re
        calc_xml = re.sub(r'<c r="C2">.*?</c>',
            '<c r="C2" t="inlineStr"><is><t>=SUM(A2:B2)</t></is></c>', calc_xml, flags=re.DOTALL)
        parts["xl/worksheets/sheet2.xml"] = calc_xml.encode("utf-8")
        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "incorrect")
        self.assertEqual(result["assessment"]["earned"], 0)

    def test_r17_score_cache_value_isolation(self):
        session = self._create_r17_session_with_scored_manifest()
        paths = self.service._paths(session["sessionId"])
        import zipfile
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        calc_xml = parts["xl/worksheets/sheet2.xml"].decode("utf-8")
        calc_xml = calc_xml.replace(
            '<c r="C2"><f>SUM(A2:B2)</f></c>',
            '<c r="C2"><f>SUM(A2:B2)</f><v>99999</v></c>'
        )
        parts["xl/worksheets/sheet2.xml"] = calc_xml.encode("utf-8")
        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "correct")
        self.assertEqual(result["assessment"]["earned"], 1)

    def test_r17_score_shared_formula_indeterminate(self):
        session = self._create_r17_session_with_scored_manifest()
        paths = self.service._paths(session["sessionId"])
        import zipfile
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        calc_xml = parts["xl/worksheets/sheet2.xml"].decode("utf-8")
        calc_xml = calc_xml.replace(
            '<c r="C2"><f>SUM(A2:B2)</f></c>',
            '<c r="C2"><f t="shared" si="0">SUM(A2:B2)</f></c>'
        )
        parts["xl/worksheets/sheet2.xml"] = calc_xml.encode("utf-8")
        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "incorrect")
        self.assertEqual(result["assessment"]["assertions"][0]["result"], "indeterminate")

    def test_r17_score_empty_f_indeterminate(self):
        session = self._create_r17_session_with_scored_manifest()
        paths = self.service._paths(session["sessionId"])
        import zipfile
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        calc_xml = parts["xl/worksheets/sheet2.xml"].decode("utf-8")
        calc_xml = calc_xml.replace(
            '<c r="C2"><f>SUM(A2:B2)</f></c>',
            '<c r="C2"><f></f></c>'
        )
        parts["xl/worksheets/sheet2.xml"] = calc_xml.encode("utf-8")
        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "incorrect")
        self.assertEqual(result["assessment"]["assertions"][0]["result"], "indeterminate")

    def test_r17_score_missing_sheet_indeterminate(self):
        session = self._create_r17_session_with_scored_manifest()
        paths = self.service._paths(session["sessionId"])
        import zipfile
        from xml.etree import ElementTree as ET
        NS_MAIN = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
        NS_REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
        NS_PKG = "http://schemas.openxmlformats.org/package/2006/relationships"
        ns = {"m": NS_MAIN, "r": NS_REL, "pr": NS_PKG}
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        wb_xml = parts["xl/workbook.xml"].decode("utf-8")
        wb_xml = wb_xml.replace('name="計算"', 'name="計算XX"')
        parts["xl/workbook.xml"] = wb_xml.encode("utf-8")
        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["assertions"][0]["result"], "indeterminate")

    def test_r17_score_corrupt_zip_indeterminate(self):
        session = self._create_r17_session_with_scored_manifest()
        paths = self.service._paths(session["sessionId"])
        paths.workbook.write_bytes(b"not a zip file at all")
        with self.assertRaises(MOS365ServiceError) as ctx:
            self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertEqual(ctx.exception.code, "WORKBOOK_PARSE_FAILED")

    def test_r17_score_corrupt_xml_indeterminate(self):
        session = self._create_r17_session_with_scored_manifest()
        paths = self.service._paths(session["sessionId"])
        import zipfile
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        parts["xl/worksheets/sheet2.xml"] = b"<not valid xml><><<"
        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["assertions"][0]["result"], "indeterminate")

    def test_r17_score_relationship_escape_indeterminate(self):
        session = self._create_r17_session_with_scored_manifest()
        paths = self.service._paths(session["sessionId"])
        import zipfile
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        rels_xml = parts["xl/_rels/workbook.xml.rels"].decode("utf-8")
        rels_xml = rels_xml.replace('Target="worksheets/sheet2.xml"', 'Target="../secret/data.xml"')
        parts["xl/_rels/workbook.xml.rels"] = rels_xml.encode("utf-8")
        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["assertions"][0]["result"], "indeterminate")

    def test_r17_score_absolute_ref_incorrect(self):
        session = self._create_r17_session_with_scored_manifest()
        paths = self.service._paths(session["sessionId"])
        import zipfile
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        calc_xml = parts["xl/worksheets/sheet2.xml"].decode("utf-8")
        calc_xml = calc_xml.replace('<f>SUM(A2:B2)</f>', '<f>SUM($A$2:$B$2)</f>')
        parts["xl/worksheets/sheet2.xml"] = calc_xml.encode("utf-8")
        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["assertions"][0]["result"], "incorrect")
        self.assertEqual(result["assessment"]["earned"], 0)

    def test_r17_regression_r16_inline_str(self):
        """R16 regression: inlineStr '完了' in B2 scores 1/1."""
        session = self.service.create_session({"mode": "r16_static_training"})
        paths = self.service._paths(session["sessionId"])
        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        manifest["state"] = "attached"
        manifest["excelPid"] = 0
        manifest["attachedPid"] = 0
        manifest["completion"] = {"acknowledged": True, "acknowledgedAt": "", "acknowledgedPid": 0}
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        import zipfile
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        sx = parts["xl/worksheets/sheet1.xml"].decode("utf-8")
        sx = sx.replace('<c r="B2" t="inlineStr"><is><t></t></is></c>',
                        '<c r="B2" t="inlineStr"><is><t>完了</t></is></c>')
        parts["xl/worksheets/sheet1.xml"] = sx.encode("utf-8")
        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "correct")
        self.assertEqual(result["assessment"]["earned"], 1)

    def test_r17_regression_r16_empty_b2(self):
        """R16 regression: empty B2 scores 0/1."""
        session = self.service.create_session({"mode": "r16_static_training"})
        paths = self.service._paths(session["sessionId"])
        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        manifest["state"] = "attached"
        manifest["excelPid"] = 0
        manifest["attachedPid"] = 0
        manifest["completion"] = {"acknowledged": True, "acknowledgedAt": "", "acknowledgedPid": 0}
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "incorrect")
        self.assertEqual(result["assessment"]["earned"], 0)

    def test_r17_regression_r16_formula_cell_indeterminate(self):
        """R16 regression: formula cell in B2 scores indeterminate."""
        session = self.service.create_session({"mode": "r16_static_training"})
        paths = self.service._paths(session["sessionId"])
        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        manifest["state"] = "attached"
        manifest["excelPid"] = 0
        manifest["attachedPid"] = 0
        manifest["completion"] = {"acknowledged": True, "acknowledgedAt": "", "acknowledgedPid": 0}
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        import zipfile
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        sx = parts["xl/worksheets/sheet1.xml"].decode("utf-8")
        sx = sx.replace('<c r="B2" t="inlineStr"><is><t></t></is></c>',
                        '<c r="B2"><f>A1+1</f><v>0</v></c>')
        parts["xl/worksheets/sheet1.xml"] = sx.encode("utf-8")
        with zipfile.ZipFile(paths.workbook, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["assertions"][0]["result"], "indeterminate")

    def test_r17_client_cannot_override_spec(self):
        """Client cannot override workbookPath, sheetName, cellRef, expectedFormula."""
        session = self._create_r17_session_with_scored_manifest()
        payload = {
            "sessionId": session["sessionId"],
            "excelPid": 0,
            "sheetName": "入力",
            "cellRef": "A1",
            "expectedFormula": "=A1",
        }
        result = self.service.session_score(payload)
        self.assertTrue(result["ok"])
        assertion = result["assessment"]["assertions"][0]
        self.assertEqual(assertion["id"], "calc-c2-formula")
        self.assertEqual(assertion["type"], "cell_formula_equals")

    def test_r17_session_verify_includes_r17(self):
        session = self.service.create_session({"mode": "r17_static_training"})
        paths = self.service._paths(session["sessionId"])
        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        manifest["state"] = "launched"
        manifest["excelPid"] = 12345
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        result = self.service.session_verify({
            "sessionId": session["sessionId"],
            "workbookPath": str(paths.workbook),
            "excelPid": 12345,
        })
        self.assertTrue(result["ok"])
        self.assertEqual(result["session"]["training"]["mode"], "r17_static_training")
        self.assertEqual(result["session"]["training"]["taskId"], "R17_STATIC_FORMULA_TEXT_DEMO")


if __name__ == "__main__":
    unittest.main()
