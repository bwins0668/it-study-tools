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

    def test_r17_workbook_has_blank_c2_no_answer_leak(self):
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
            a2_val = b2_val = c2_f = None
            for cell in calc_root.findall('.//m:c', ns):
                ref = cell.attrib.get("r", "")
                if ref == "A2":
                    v = cell.find("m:v", ns)
                    a2_val = v.text if v is not None else None
                elif ref == "B2":
                    v = cell.find("m:v", ns)
                    b2_val = v.text if v is not None else None
                elif ref == "C2":
                    c2_f = cell.find("m:f", ns)
            self.assertEqual(a2_val, "2")
            self.assertEqual(b2_val, "3")
            self.assertIsNone(c2_f, "C2 must not have <f> in initial template (answer leak)")

    @staticmethod
    def _inject_r17_formula(workbook_path, formula_xml):
        """Replace C2 in the 計算 sheet with the given formula XML fragment."""
        import zipfile
        with zipfile.ZipFile(workbook_path, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        calc_xml = parts["xl/worksheets/sheet2.xml"].decode("utf-8")
        calc_xml = calc_xml.replace(
            '<c r="C2" t="inlineStr"><is><t></t></is></c>',
            f'<c r="C2">{formula_xml}</c>'
        )
        parts["xl/worksheets/sheet2.xml"] = calc_xml.encode("utf-8")
        with zipfile.ZipFile(workbook_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)

    def test_r17_score_correct_formula(self):
        session = self._create_r17_session_with_scored_manifest()
        self._inject_r17_formula(self.service._paths(session["sessionId"]).workbook, '<f>SUM(A2:B2)</f>')
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "correct")
        self.assertEqual(result["assessment"]["earned"], 1)
        self.assertEqual(result["assessment"]["total"], 1)
        self.assertEqual(result["assessment"]["assertions"][0]["result"], "correct")

    def test_r17_score_incorrect_formula(self):
        session = self._create_r17_session_with_scored_manifest()
        self._inject_r17_formula(self.service._paths(session["sessionId"]).workbook, '<f>A2+B2</f>')
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
        self._inject_r17_formula_text(self.service._paths(session["sessionId"]).workbook, "=SUM(A2:B2)")
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "incorrect")
        self.assertEqual(result["assessment"]["earned"], 0)

    @staticmethod
    def _inject_r17_formula_text(workbook_path, text):
        """Replace C2 with an inline string containing the given text (no <f>)."""
        import zipfile
        with zipfile.ZipFile(workbook_path, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        calc_xml = parts["xl/worksheets/sheet2.xml"].decode("utf-8")
        calc_xml = calc_xml.replace(
            '<c r="C2" t="inlineStr"><is><t></t></is></c>',
            f'<c r="C2" t="inlineStr"><is><t>{text}</t></is></c>'
        )
        parts["xl/worksheets/sheet2.xml"] = calc_xml.encode("utf-8")
        with zipfile.ZipFile(workbook_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)

    def test_r17_score_cache_value_isolation(self):
        session = self._create_r17_session_with_scored_manifest()
        self._inject_r17_formula_with_cache(self.service._paths(session["sessionId"]).workbook)
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "correct")
        self.assertEqual(result["assessment"]["earned"], 1)

    @staticmethod
    def _inject_r17_formula_with_cache(workbook_path):
        """Replace C2 with correct formula + wrong cache value."""
        import zipfile
        with zipfile.ZipFile(workbook_path, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        calc_xml = parts["xl/worksheets/sheet2.xml"].decode("utf-8")
        calc_xml = calc_xml.replace(
            '<c r="C2" t="inlineStr"><is><t></t></is></c>',
            '<c r="C2"><f>SUM(A2:B2)</f><v>99999</v></c>'
        )
        parts["xl/worksheets/sheet2.xml"] = calc_xml.encode("utf-8")
        with zipfile.ZipFile(workbook_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for name, value in parts.items():
                zf.writestr(name, value)

    def test_r17_score_shared_formula_indeterminate(self):
        session = self._create_r17_session_with_scored_manifest()
        self._inject_r17_formula(self.service._paths(session["sessionId"]).workbook, '<f t="shared" si="0">SUM(A2:B2)</f>')
        result = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(result["ok"])
        self.assertEqual(result["assessment"]["result"], "incorrect")
        self.assertEqual(result["assessment"]["assertions"][0]["result"], "indeterminate")

    def test_r17_score_empty_f_indeterminate(self):
        session = self._create_r17_session_with_scored_manifest()
        self._inject_r17_formula(self.service._paths(session["sessionId"]).workbook, '<f></f>')
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

    def test_r16_template_b2_blank_no_answer_leak(self):
        """R16 initial workbook must not pre-fill 完了 in B2."""
        session = self.service.create_session({"mode": "r16_static_training"})
        paths = self.service._paths(session["sessionId"])
        import zipfile
        from xml.etree import ElementTree as ET
        NS_MAIN = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
        NS_REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
        NS_PKG = "http://schemas.openxmlformats.org/package/2006/relationships"
        ns = {"m": NS_MAIN, "r": NS_REL, "pr": NS_PKG}
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}
        sx = parts["xl/worksheets/sheet1.xml"].decode("utf-8")
        self.assertNotIn("完了", sx, "R16 initial workbook must not contain 完了")
        root = ET.fromstring(parts["xl/worksheets/sheet1.xml"])
        for cell in root.findall('.//m:c', ns):
            if cell.attrib.get("r") == "B2":
                inline = cell.find("m:is", ns)
                if inline is not None:
                    text = "".join(inline.itertext())
                    self.assertEqual(text, "", "R16 B2 must be empty, not prefilled with answer")
                self.assertIsNone(cell.find("m:f", ns), "R16 B2 must not have formula")
                return
        self.fail("B2 not found in 入力 sheet")

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




    def test_idempotent_session_creation(self):
        """R20: Multiple create_session calls should return same active session."""
        from mos365_service import _LAUNCH_STATE, _LAUNCH_LOCK
        # Reset launch state
        with _LAUNCH_LOCK:
            _LAUNCH_STATE = None
        s1 = self.service.create_session({"mode": "r16_static_training"})
        s2 = self.service.create_session({"mode": "r16_static_training"})
        self.assertEqual(s1["sessionId"], s2["sessionId"], "Second create should return same session")
        self.assertTrue(s2.get("idempotent"), "Second response should mark idempotent")
        with _LAUNCH_LOCK:
            _LAUNCH_STATE = None

    def test_task_display_no_leak(self):
        """R20: Task display must not leak expected or expectedFormula."""
        from mos365_service import _LAUNCH_STATE, _LAUNCH_LOCK
        with _LAUNCH_LOCK:
            _LAUNCH_STATE = None
        for mode in ("r16_static_training", "r17_static_training"):
            s = self.service.create_session({"mode": mode})
            sid = s["sessionId"]
            # Retrieve manifest and session_verify-like debug info
            paths = self.service._paths(sid)
            import json
            manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
            training_mode = manifest.get("trainingMode") or manifest.get("mode", "")
            static_task = manifest.get("staticTask")
            if static_task:
                self.assertNotIn("expected", str(static_task.get("taskId", "")), "Static task taskId should not leak expected")
                # Check that instructionJa and Zh are safe
                self.assertNotIn("=SUM(", static_task.get("instructionJa", ""), "R17 instruction must not leak formula")
        with _LAUNCH_LOCK:
            _LAUNCH_STATE = None

    def test_r16_session_initial_state(self):
        """R20: R16 workbook must have empty B2."""
        from mos365_service import _LAUNCH_STATE, _LAUNCH_LOCK
        with _LAUNCH_LOCK:
            _LAUNCH_STATE = None
        s = self.service.create_session({"mode": "r16_static_training"})
        sid = s["sessionId"]
        paths = self.service._paths(sid)
        import zipfile
        from xml.etree import ElementTree as ET
        ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
        with zipfile.ZipFile(str(paths.workbook), "r") as z:
            sheet = z.read("xl/worksheets/sheet1.xml")
            root = ET.fromstring(sheet)
            for cell in root.findall(".//m:c", ns):
                if cell.attrib.get("r", "") == "B2":
                    cell_type = cell.attrib.get("t", "")
                    is_node = cell.find("m:is", ns)
                    if is_node is not None:
                        val = "".join(is_node.itertext())
                        self.assertEqual(val, "", f"R16 B2 should be empty, got '{val}'")
                    break
        with _LAUNCH_LOCK:
            _LAUNCH_STATE = None

    def test_r17_session_initial_state(self):
        """R20: R17 workbook must have A2=2, B2=3, C2 empty."""
        from mos365_service import _LAUNCH_STATE, _LAUNCH_LOCK
        with _LAUNCH_LOCK:
            _LAUNCH_STATE = None
        s = self.service.create_session({"mode": "r17_static_training"})
        sid = s["sessionId"]
        paths = self.service._paths(sid)
        import zipfile
        from xml.etree import ElementTree as ET
        ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
        with zipfile.ZipFile(str(paths.workbook), "r") as z:
            sheet = z.read("xl/worksheets/sheet2.xml")
            root = ET.fromstring(sheet)
            cells = {}
            for cell in root.findall(".//m:c", ns):
                ref = cell.attrib.get("r", "")
                cell_type = cell.attrib.get("t", "")
                v = cell.find("m:v", ns)
                is_node = cell.find("m:is", ns)
                if v is not None and v.text:
                    cells[ref] = v.text
                elif is_node is not None:
                    cells[ref] = "".join(is_node.itertext())
                else:
                    cells[ref] = ""
            self.assertEqual(cells.get("A2", ""), "2", "R17 A2 should be 2")
            self.assertEqual(cells.get("B2", ""), "3", "R17 B2 should be 3")
            self.assertEqual(cells.get("C2", ""), "", "R17 C2 should be empty")
        with _LAUNCH_LOCK:
            _LAUNCH_STATE = None

    def test_r16_positive_score(self):
        """R16: cell_value_equals scoring for correct answer."""
        from mos365_service import _LAUNCH_STATE, _LAUNCH_LOCK
        with _LAUNCH_LOCK:
            _LAUNCH_STATE = None
        s = self.service.create_session({"mode": "r16_static_training"})
        sid = s["sessionId"]
        paths = self.service._paths(sid)
        # Modify workbook: set B2 to "完了"
        import zipfile, io
        from xml.etree import ElementTree as ET
        ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
        with zipfile.ZipFile(str(paths.workbook), "r") as z:
            sheet = z.read("xl/worksheets/sheet1.xml")
            root = ET.fromstring(sheet)
            for cell in root.findall(".//m:c", ns):
                if cell.attrib.get("r", "") == "B2":
                    cell.clear()
                    cell.set("r", "B2")
                    cell.set("t", "inlineStr")
                    is_elem = ET.SubElement(cell, f'{{{ns["m"]}}}is')
                    t_elem = ET.SubElement(is_elem, f'{{{ns["m"]}}}t')
                    t_elem.text = "完了"
                    break
            modified = ET.tostring(root, encoding="unicode", xml_declaration=True)
        buf = io.BytesIO()
        with zipfile.ZipFile(str(paths.workbook), "r") as z:
            with zipfile.ZipFile(buf, "w", compression=zipfile.ZIP_DEFLATED) as out:
                for item in z.infolist():
                    data = z.read(item.filename)
                    if item.filename == "xl/worksheets/sheet1.xml":
                        out.writestr(item, modified.encode("utf-8"))
                    else:
                        out.writestr(item, data)
        with open(str(paths.workbook), "wb") as f:
            f.write(buf.getvalue())
        # Set manifest state to attached for complete/score flow
        import json
        mf = json.loads(paths.manifest.read_text(encoding="utf-8"))
        mf["state"] = "attached"
        mf["completion"] = {"acknowledged": True, "acknowledgedAt": "2026-06-26T00:00:00+09:00", "acknowledgedPid": 99999}
        paths.manifest.write_text(json.dumps(mf, ensure_ascii=False, indent=2), encoding="utf-8")
        # Complete (required before score)
        self.service.session_complete({"sessionId": sid, "excelPid": 99999})
        # Score
        result = self.service.session_score({"sessionId": sid})
        self.assertEqual(result["assessment"]["result"], "correct", "R16 positive should be correct")
        self.assertEqual(result["assessment"]["earned"], 1, "R16 positive should earn 1")
        self.assertEqual(result["assessment"]["total"], 1, "R16 positive total 1")
        with _LAUNCH_LOCK:
            _LAUNCH_STATE = None


if __name__ == "__main__":
    unittest.main()
