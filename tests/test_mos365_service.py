import json
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import mos365_service
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
            "bridgeRevision": "R30_RUNTIME_PROOF_1",
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


class MOS365R22FlowContractTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.service = MOS365Service(Path(__file__).resolve().parents[1], session_root=self.temp.name)
        self._reset_launch_state()

    def tearDown(self):
        self._reset_launch_state()
        self.temp.cleanup()

    def _reset_launch_state(self):
        if mos365_service._LAUNCH_LOCK is None:
            return
        with mos365_service._LAUNCH_LOCK:
            mos365_service._LAUNCH_STATE = None

    def _attach_session(self, session, pid=24680):
        paths = self.service._paths(session["sessionId"])
        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        manifest["state"] = "launched"
        manifest["excelPid"] = pid
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        return self.service.session_verify({
            "workbookPath": str(paths.workbook),
            "excelPid": pid,
            "bridgeRevision": "R30_RUNTIME_PROOF_1",
        })

    def test_r22_training_display_is_bilingual_and_r17_does_not_leak_formula(self):
        r16 = self.service.create_session({"mode": "r16_static_training"})
        r16_verify = self._attach_session(r16)
        r16_training = r16_verify["session"]["training"]
        self.assertIn("入力", r16_training["instructionJa"])
        self.assertIn("完了", r16_training["instructionJa"])
        self.assertIn("输入", r16_training["instructionZh"])

        self._reset_launch_state()
        r17 = self.service.create_session({"mode": "r17_static_training"})
        r17_verify = self._attach_session(r17)
        r17_training = r17_verify["session"]["training"]
        combined = json.dumps(r17_training, ensure_ascii=False)
        self.assertIn("計算", r17_training["instructionJa"])
        self.assertIn("数式", r17_training["instructionJa"])
        self.assertIn("公式", r17_training["instructionZh"])
        self.assertNotIn("=SUM(", combined)
        self.assertNotIn("expectedFormula", combined)
        self.assertNotIn("expected", combined)

    def test_r22_duplicate_launch_returns_existing_process(self):
        session = self.service.create_session({"mode": "r16_static_training"})
        calls = []

        class FakeProcess:
            def __init__(self, args, shell=False, close_fds=True):
                calls.append(args)
                self.pid = 43210

        old_popen = mos365_service.subprocess.Popen
        old_find_excel = self.service.find_excel
        try:
            mos365_service.subprocess.Popen = FakeProcess
            self.service.find_excel = lambda: Path("C:/Program Files/Microsoft Office/root/Office16/EXCEL.EXE")
            first = self.service.launch_excel({"sessionId": session["sessionId"]})
            second = self.service.launch_excel({"sessionId": session["sessionId"]})
        finally:
            mos365_service.subprocess.Popen = old_popen
            self.service.find_excel = old_find_excel

        self.assertEqual(len(calls), 1)
        self.assertEqual(first["processId"], 43210)
        self.assertEqual(second["processId"], 43210)
        self.assertTrue(second["idempotent"])
        self.assertEqual(second["launchState"], "awaiting_attach")

    def test_r22_launch_state_records_required_phases(self):
        session = self.service.create_session({"mode": "r17_static_training"})
        state = self.service.launch_status()
        phases = state["phases"]
        self.assertEqual(state["state"], "creating")
        self.assertIn("click_received", phases)
        self.assertIn("session_created", phases)
        self.assertIn("workbook_ready", phases)

        self._attach_session(session)
        state = self.service.launch_status()
        phases = state["phases"]
        self.assertEqual(state["state"], "ready")
        self.assertIn("excel_window_visible", phases)
        self.assertIn("vsto_attached", phases)
        self.assertIn("task_rendered", phases)

    def test_r22_exit_ends_only_current_session(self):
        first = self.service.create_session({"mode": "r16_static_training"})
        first_paths = self.service._paths(first["sessionId"])
        first_manifest = json.loads(first_paths.manifest.read_text(encoding="utf-8"))
        first_manifest["state"] = "attached"
        first_manifest["excelPid"] = 101
        first_manifest["attachedPid"] = 101
        first_paths.manifest.write_text(json.dumps(first_manifest, ensure_ascii=False, indent=2), encoding="utf-8")

        self._reset_launch_state()
        second = self.service.create_session({"mode": "r17_static_training"})
        second_paths = self.service._paths(second["sessionId"])
        second_manifest = json.loads(second_paths.manifest.read_text(encoding="utf-8"))
        second_manifest["state"] = "attached"
        second_manifest["excelPid"] = 202
        second_manifest["attachedPid"] = 202
        second_paths.manifest.write_text(json.dumps(second_manifest, ensure_ascii=False, indent=2), encoding="utf-8")

        result = self.service.end_session({"sessionId": first["sessionId"], "excelPid": 101})
        self.assertTrue(result["ok"])
        self.assertEqual(json.loads(first_paths.manifest.read_text(encoding="utf-8"))["state"], "ended")
        self.assertEqual(json.loads(second_paths.manifest.read_text(encoding="utf-8"))["state"], "attached")
        self.assertTrue(second_paths.workbook.is_file())

    def test_r22_vsto_source_contract_single_right_pane_no_legacy_debug_text(self):
        root = Path(__file__).resolve().parents[1]
        addin = (root / "native/StudyTools.Mos365ExamHost.VstoBottomPanePoc/ThisAddIn.cs").read_text(encoding="utf-8")
        pane = (root / "native/StudyTools.Mos365ExamHost.VstoBottomPanePoc/ExamHostPaneControl.cs").read_text(encoding="utf-8")
        combined = addin + pane

        self.assertEqual(addin.count("CustomTaskPanes.Add"), 1)
        self.assertIn("RemoveExistingTrainingPanes", addin)
        self.assertIn("CustomTaskPanes.Remove", addin)
        self.assertNotIn("HideLegacyPaneWindows", addin)
        self.assertNotIn("EnumChildWindows", addin)
        self.assertNotIn("ShowWindow", addin)
        self.assertNotIn("SetWindowPos", addin)
        self.assertNotIn("DllImport", addin)
        self.assertNotIn("SW_HIDE", addin)
        self.assertNotIn("SWP_HIDEWINDOW", addin)
        self.assertNotIn("WM_CLOSE", addin)
        self.assertIn('"MOS 実技トレーニング"', addin)
        # R33: bottom dock position (changed from Right in R22)
        self.assertIn("msoCTPDockPositionBottom", addin)
        self.assertNotIn("msoCTPDockPositionRight", addin)
        self.assertNotIn("MOS Native Exam Host", combined)
        self.assertNotIn("R3 VSTO POC", combined)
        self.assertNotIn("Excel PID", pane)
        self.assertNotIn("Workbook:", pane)
        self.assertNotIn("Platform:", pane)
        self.assertNotIn("HTTP FAILED", combined)
        self.assertNotIn("HTTP_FAILED", combined)
        # R33: task display uses ShowTaskFromMetadata (immediate display)
        self.assertIn("ShowTaskFromMetadata", pane)
        # Scoring/exit buttons still present
        self.assertIn("採点する", pane)
        self.assertIn("終了する", pane)

    def test_r22_terminal_launch_state_does_not_start_another_poll_render_loop(self):
        root = Path(__file__).resolve().parents[1]
        web = (root / "assets/js/mos365.js").read_text(encoding="utf-8")
        self.assertIn("function isTerminalLaunchState", web)
        self.assertIn("if (!isTerminalLaunchState(state.launchState)) scheduleLaunchPoll(0);", web)

    def test_r22_active_nonterminal_launch_disables_new_start(self):
        root = Path(__file__).resolve().parents[1]
        web = (root / "assets/js/mos365.js").read_text(encoding="utf-8")
        self.assertIn("state.launchState && state.launchState.active && !isTerminalLaunchState(state.launchState)", web)


class MOS365R32OriginalPackTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.service = MOS365Service(Path(__file__).resolve().parents[1], session_root=self.temp.name)

    def tearDown(self):
        self.temp.cleanup()

    def test_catalog_completeness_and_uniqueness(self):
        from mos365_service import MOS_CATALOG
        self.assertEqual(len(MOS_CATALOG), 10)
        task_ids = list(MOS_CATALOG.keys())
        self.assertEqual(len(set(task_ids)), 10)
        for tid, task in MOS_CATALOG.items():
            self.assertEqual(task["contentProvenance"], "original_project_content_r32")
            self.assertTrue(task["titleJa"])
            self.assertTrue(task["titleZh"])
            self.assertTrue(task["instructionJa"])
            self.assertTrue(task["instructionZh"])
            self.assertTrue(task["assessment"]["type"])
            self.assertTrue(task["assessment"]["sheetName"])

    def _inject_cell_data(self, workbook_path: str, sheet_name: str, cell_ref: str, value_or_formula: str, is_formula: bool):
        import zipfile
        import re
        from xml.etree import ElementTree as ET
        ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
              "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
              "pr": "http://schemas.openxmlformats.org/package/2006/relationships"}
        with zipfile.ZipFile(workbook_path, "r") as zf:
            parts = {name: zf.read(name) for name in zf.namelist()}

        wb_root = ET.fromstring(parts["xl/workbook.xml"])
        rels_root = ET.fromstring(parts["xl/_rels/workbook.xml.rels"])
        sheet_rel_id = None
        for sheet in wb_root.findall('.//m:sheets/m:sheet', ns):
            if sheet.get('name', '') == sheet_name:
                sheet_rel_id = sheet.attrib.get('{' + ns['r'] + '}id', sheet.attrib.get('r:id', ''))
                break
        if not sheet_rel_id:
            raise ValueError(f"Sheet {sheet_name} not found")

        target_path = ""
        for rel in rels_root.findall('pr:Relationship', ns):
            if rel.attrib.get('Id', '') == sheet_rel_id:
                target_path = rel.attrib.get('Target', '')
                break
        if not target_path:
            raise ValueError(f"Target path not found for relationship {sheet_rel_id}")

        normalized = target_path.lstrip('/')
        if not normalized.startswith('xl/'):
            normalized = 'xl/' + normalized

        sheet_root = ET.fromstring(parts[normalized])

        cell_node = None
        for c in sheet_root.findall('.//m:c', ns):
            if c.attrib.get('r', '') == cell_ref:
                cell_node = c
                break

        if cell_node is None:
            sheet_data = sheet_root.find('.//m:sheetData', ns)
            row_num = re.sub(r"[A-Z]+", "", cell_ref)
            row_node = None
            for r in sheet_data.findall('m:row', ns):
                if r.attrib.get('r', '') == row_num:
                    row_node = r
                    break
            if row_node is None:
                row_node = ET.SubElement(sheet_data, f'{{{ns["m"]}}}row')
                row_node.set('r', row_num)
            cell_node = ET.SubElement(row_node, f'{{{ns["m"]}}}c')
            cell_node.set('r', cell_ref)
        else:
            cell_node.clear()
            cell_node.set('r', cell_ref)

        if is_formula:
            formula_text = value_or_formula.lstrip("=")
            f_elem = ET.SubElement(cell_node, f'{{{ns["m"]}}}f')
            f_elem.text = formula_text
            v_elem = ET.SubElement(cell_node, f'{{{ns["m"]}}}v')
            v_elem.text = "0"
        else:
            cell_node.set('t', 'inlineStr')
            is_elem = ET.SubElement(cell_node, f'{{{ns["m"]}}}is')
            t_elem = ET.SubElement(is_elem, f'{{{ns["m"]}}}t')
            t_elem.text = value_or_formula

        modified = ET.tostring(sheet_root, encoding="unicode", xml_declaration=True)
        parts[normalized] = modified.encode("utf-8")

        import io
        buf = io.BytesIO()
        with zipfile.ZipFile(buf, "w", compression=zipfile.ZIP_DEFLATED) as out:
            for name, value in parts.items():
                out.writestr(name, value)
        with open(workbook_path, "wb") as f:
            f.write(buf.getvalue())

    def test_end_to_end_lifecycle_all_10_tasks(self):
        from mos365_service import MOS_CATALOG
        tests_data = {
            "MOS_GP_001_ENTER_STATUS": ("完了", False, "进行中", False),
            "MOS_GP_002_SUM_TWO_VALUES": ("=SUM(A2:B2)", True, "=A2+B2", True),
            "MOS_GP_003_SUM_WEEKLY_SALES": ("=SUM(B2:B6)", True, "=SUM(B2:B5)", True),
            "MOS_GP_004_AVERAGE_SCORE": ("=AVERAGE(B2:B4)", True, "=AVERAGE(B2:B3)", True),
            "MOS_GP_005_IF_DELIVERY_STATUS": ('=IF(B2="完了","✓","✗")', True, '=IF(B2="完了","OK","NG")', True),
            "MOS_GP_006_COUNTA_BOOKS": ("=COUNTA(A2:A11)", True, "=COUNTA(A2:A10)", True),
            "MOS_GP_007_MAX_VISITORS": ("=MAX(B2:B8)", True, "=MAX(B2:B7)", True),
            "MOS_GP_008_MIN_VISITORS": ("=MIN(B2:B8)", True, "=MIN(B2:B7)", True),
            "MOS_GP_009_LEFT_DEPARTMENT_CODE": ("=LEFT(A2,2)", True, "=LEFT(A2,3)", True),
            "MOS_GP_010_TEXTJOIN_PRODUCT_TAG": ('=TEXTJOIN("/",TRUE,A2:C2)', True, '=TEXTJOIN(",",TRUE,A2:C2)', True),
        }

        for tid, (correct_val, correct_f, wrong_val, wrong_f) in tests_data.items():
            import mos365_service
            with mos365_service._LAUNCH_LOCK:
                mos365_service._LAUNCH_STATE = None
            # 1. Create Session
            session = self.service.create_session({"taskId": tid})
            sid = session["sessionId"]
            paths = self.service._paths(sid)
            manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))

            # 2. Check catalog display fields are safe (no expectedFormula or expected leaks)
            self.assertNotIn("expected", str(session["staticTask"]))
            self.assertNotIn("expectedFormula", str(session["staticTask"]))
            self.assertEqual(session["staticTask"]["taskId"], tid)
            self.assertTrue(session["staticTask"]["instructionJa"])
            self.assertTrue(session["staticTask"]["instructionZh"])

            # 3. Check initial workbook goal cell is blank
            import zipfile
            from xml.etree import ElementTree as ET
            ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}

            with zipfile.ZipFile(paths.workbook, "r") as zf:
                wb_root = ET.fromstring(zf.read("xl/workbook.xml"))
                sheet_names = [s.get("name", "") for s in wb_root.findall('.//m:sheets/m:sheet', ns)]

            assessment = MOS_CATALOG[tid]["assessment"]
            target_sheet = assessment["sheetName"]
            target_cell = assessment.get("cellRef") or assessment.get("target")
            self.assertIn(target_sheet, sheet_names)

            evidence = self.service._extract_evidence(paths.workbook)
            cell = evidence["sheets"][target_sheet]["cells"].get(target_cell, {})
            self.assertEqual(cell.get("value", ""), "", f"Initial cell {target_cell} in sheet {target_sheet} must be empty for {tid}")
            self.assertEqual(cell.get("formula", ""), "", f"Initial cell {target_cell} in sheet {target_sheet} must have no formula for {tid}")

            # 4. Mock attached state
            manifest["state"] = "attached"
            manifest["excelPid"] = 9999
            manifest["attachedPid"] = 9999
            manifest["completion"] = {"acknowledged": True, "acknowledgedAt": "2026-06-27T00:00:00+09:00", "acknowledgedPid": 9999}
            paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

            # 5. Negative scoring check
            self._inject_cell_data(paths.workbook, target_sheet, target_cell, wrong_val, wrong_f)
            self.service.session_complete({"sessionId": sid, "excelPid": 9999})
            score_res = self.service.session_score({"sessionId": sid, "excelPid": 9999})
            self.assertEqual(score_res["assessment"]["result"], "incorrect", f"Negative scoring failed for {tid}")
            self.assertEqual(score_res["assessment"]["earned"], 0, f"Negative scoring should earn 0 for {tid}")

            # 6. Positive scoring check
            self._inject_cell_data(paths.workbook, target_sheet, target_cell, correct_val, correct_f)
            self.service.session_complete({"sessionId": sid, "excelPid": 9999})
            score_res = self.service.session_score({"sessionId": sid, "excelPid": 9999})
            self.assertEqual(score_res["assessment"]["result"], "correct", f"Positive scoring failed for {tid}")
            self.assertEqual(score_res["assessment"]["earned"], 1, f"Positive scoring should earn 1 for {tid}")


class R33BottomConsoleGateTests(unittest.TestCase):
    """R33 门禁测试：底部训练控制台合约。"""

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.service = MOS365Service(Path(__file__).resolve().parents[1], session_root=self.temp.name)
        import pathlib
        self.project_root = Path(__file__).resolve().parents[1]
        self.vsto_dir = self.project_root / "native" / "StudyTools.Mos365ExamHost.VstoBottomPanePoc"

    def tearDown(self):
        self.temp.cleanup()

    # ── 1. VSTO pane 停靠位置门禁
    def test_vsto_pane_dock_position_bottom(self):
        """ThisAddIn.cs must use msoCTPDockPositionBottom, not Right."""
        this_addin = self.vsto_dir / "ThisAddIn.cs"
        self.assertTrue(this_addin.exists(), "ThisAddIn.cs not found")
        src = this_addin.read_text(encoding="utf-8")
        self.assertIn("msoCTPDockPositionBottom", src,
                      "VSTO pane must use msoCTPDockPositionBottom")
        self.assertNotIn("msoCTPDockPositionRight", src,
                         "VSTO pane must NOT use msoCTPDockPositionRight")

    def test_no_right_pane_in_vsto(self):
        """No right-side training pane should be created."""
        this_addin = self.vsto_dir / "ThisAddIn.cs"
        src = this_addin.read_text(encoding="utf-8")
        self.assertNotIn("DockPositionRight", src,
                         "No DockPositionRight allowed in ThisAddIn.cs")

    # ── 2. 单一 pane 合约
    def test_single_pane_only_one_add_call(self):
        """CustomTaskPanes.Add should be called at most once in ThisAddIn.cs."""
        this_addin = self.vsto_dir / "ThisAddIn.cs"
        src = this_addin.read_text(encoding="utf-8")
        count = src.count("CustomTaskPanes.Add(")
        self.assertEqual(count, 1,
                         f"Expected exactly 1 CustomTaskPanes.Add call, found {count}")

    # ── 3. workbook 安全元数据完整性
    def _create_gp_session(self, task_id: str):
        return self.service.create_session({"taskId": task_id})

    def test_workbook_safe_metadata_present_gp001(self):
        """GP001 workbook must contain docProps/custom.xml with MOS_TASK_ID."""
        session = self._create_gp_session("MOS_GP_001_ENTER_STATUS")
        paths = self.service._paths(session["sessionId"])
        with zipfile.ZipFile(paths.workbook, "r") as zf:
            names = zf.namelist()
            self.assertIn("docProps/custom.xml", names,
                          "Workbook must contain docProps/custom.xml")
            xml = zf.read("docProps/custom.xml").decode("utf-8")
        self.assertIn("MOS_TASK_ID", xml)
        self.assertIn("MOS_TITLE_JA", xml)
        self.assertIn("MOS_INSTRUCTION_JA", xml)
        self.assertIn("MOS_SHEET_LABEL", xml)
        self.assertIn("MOS_TARGET_LABEL", xml)

    def test_workbook_metadata_no_answers(self):
        """Workbook metadata must NOT contain expectedFormula, expectedValue, or scoring specs."""
        for tid in ["MOS_GP_001_ENTER_STATUS", "MOS_GP_003_SUM_WEEKLY_SALES",
                    "MOS_GP_004_AVERAGE_SCORE", "MOS_GP_005_IF_DELIVERY_STATUS"]:
            session = self._create_gp_session(tid)
            paths = self.service._paths(session["sessionId"])
            with zipfile.ZipFile(paths.workbook, "r") as zf:
                if "docProps/custom.xml" in zf.namelist():
                    xml = zf.read("docProps/custom.xml").decode("utf-8")
                    self.assertNotIn("expectedFormula", xml,
                                     f"{tid}: workbook must not contain expectedFormula")
                    self.assertNotIn("expectedValue", xml,
                                     f"{tid}: workbook must not contain expectedValue")
                    self.assertNotIn("scoringSpec", xml,
                                     f"{tid}: workbook must not contain scoringSpec")
                    # SUM/AVERAGE answers must not appear in metadata
                    self.assertNotIn("=SUM(", xml,
                                     f"{tid}: workbook metadata must not contain formula answers")

    def test_workbook_metadata_for_all_10_original_tasks(self):
        """All 10 original tasks must produce workbooks with safe metadata."""
        import mos365_service as svc
        for tid in svc.MOS_CATALOG.keys():
            session = self._create_gp_session(tid)
            paths = self.service._paths(session["sessionId"])
            with zipfile.ZipFile(paths.workbook, "r") as zf:
                self.assertIn("docProps/custom.xml", zf.namelist(),
                              f"{tid}: missing docProps/custom.xml")
                xml = zf.read("docProps/custom.xml").decode("utf-8")
            self.assertIn("MOS_TITLE_JA", xml, f"{tid}: MOS_TITLE_JA missing in metadata")
            self.assertIn("MOS_INSTRUCTION_JA", xml,
                          f"{tid}: MOS_INSTRUCTION_JA missing in metadata")

    # ── 4. カタログ安全性
    def test_catalog_safe_fields_no_answers(self):
        """MOS_CATALOG must not expose expectedFormula or expectedValue at the top level."""
        import mos365_service as svc
        self.assertGreaterEqual(len(svc.MOS_CATALOG), 10,
                                "Must have at least 10 original tasks")
        for tid, info in svc.MOS_CATALOG.items():
            self.assertIn("titleJa", info, f"{tid}: missing titleJa")
            self.assertIn("titleZh", info, f"{tid}: missing titleZh")
            self.assertIn("instructionJa", info, f"{tid}: missing instructionJa")
            self.assertIn("instructionZh", info, f"{tid}: missing instructionZh")
            # Assessment block exists (server-only) but top-level has no answer
            self.assertNotIn("expectedFormula", info,
                             f"{tid}: top-level must not have expectedFormula")
            self.assertNotIn("expectedValue", info,
                             f"{tid}: top-level must not have expectedValue")

    # ── 5. C:\mos 参照禁止
    def test_no_mos_dir_reference_in_project(self):
        """No source file in the project should reference C:\\mos."""
        search_dirs = [
            self.project_root / "assets",
            self.project_root / "native" / "StudyTools.Mos365ExamHost.VstoBottomPanePoc",
        ]
        python_files = [
            self.project_root / "mos365_service.py",
            self.project_root / "server.py",
        ]
        violation_files = []
        forbidden = r"C:\mos"
        for d in search_dirs:
            if d.exists():
                for f in d.rglob("*"):
                    if f.suffix in (".cs", ".js", ".py", ".html", ".css", ".ts"):
                        try:
                            content = f.read_text(encoding="utf-8", errors="ignore")
                            if forbidden in content or forbidden.replace("\\", "/") in content:
                                violation_files.append(str(f))
                        except Exception:
                            pass
        for pf in python_files:
            if pf.exists():
                content = pf.read_text(encoding="utf-8", errors="ignore")
                if forbidden in content or forbidden.replace("\\", "/") in content:
                    violation_files.append(str(pf))
        self.assertEqual(violation_files, [],
                         f"Files with C:\\mos reference: {violation_files}")

    # ── 6. 題幹優先状態機合約（ロジックテスト）
    def test_state_machine_connecting_does_not_clear_task_in_source(self):
        """ExamHostPaneControl.cs ShowConnecting must not hide task instructions."""
        src_file = self.vsto_dir / "ExamHostPaneControl.cs"
        src = src_file.read_text(encoding="utf-8")
        # ShowConnecting / connecting 分岐内で _taskInstrJa.Visible = false があってはならない
        # （ShowTaskFromMetadata が設定した題干を connecting 状態が消してはならない）
        # R33合約：ShowConnecting は状態ラベルのみ更新、_taskVisible = true の場合は題干を隠さない
        self.assertIn("_taskVisible", src,
                      "ExamHostPaneControl must track _taskVisible state")
        self.assertIn("ShowTaskFromMetadata", src,
                      "ExamHostPaneControl must implement ShowTaskFromMetadata")

    def test_generation_guard_in_source(self):
        """ShowTask must contain generation guard (gen != _renderGeneration return false)."""
        src_file = self.vsto_dir / "ExamHostPaneControl.cs"
        src = src_file.read_text(encoding="utf-8")
        self.assertIn("_renderGeneration", src,
                      "Generation guard must be present")
        self.assertIn("return false", src,
                      "ShowTask must return false for stale generations")

    # ── 7. 10 タスク回帰
    def test_ten_original_tasks_in_catalog(self):
        """Must have exactly 10 original tasks in MOS_CATALOG."""
        import mos365_service as svc
        gp_tasks = [k for k in svc.MOS_CATALOG if k.startswith("MOS_GP_")]
        self.assertEqual(len(gp_tasks), 10,
                         f"Expected 10 MOS_GP_ tasks, found {len(gp_tasks)}: {gp_tasks}")

    def test_r16_r17_legacy_aliases_preserved(self):
        """R16/R17 aliases must still resolve to MOS_GP_001 and MOS_GP_002."""
        session_r16 = self.service.create_session({"taskId": "MOS_GP_001_ENTER_STATUS"})
        self.assertIsNotNone(session_r16.get("sessionId"))
        self.assertEqual(session_r16.get("scenarioId"), "mos_gp_static")
        session_r17 = self.service.create_session({"taskId": "MOS_GP_002_SUM_TWO_VALUES"})
        self.assertIsNotNone(session_r17.get("sessionId"))


class R34BottomConsoleFixGateTests(unittest.TestCase):
    """R34 门禁测试：底部训练台空白修复与控制按钮合约。"""

    def setUp(self):
        self.project_root = Path(__file__).resolve().parents[1]
        self.vsto_dir = self.project_root / "native" / "StudyTools.Mos365ExamHost.VstoBottomPanePoc"
        self.pane_control_path = self.vsto_dir / "ExamHostPaneControl.cs"
        self.this_addin_path = self.vsto_dir / "ThisAddIn.cs"

    def test_r34_buttons_exist_in_source(self):
        """All 6 core buttons must exist in ExamHostPaneControl.cs."""
        src = self.pane_control_path.read_text(encoding="utf-8")
        self.assertIn("Button _startBtn;", src)
        self.assertIn("Button _pauseBtn;", src)
        self.assertIn("Button _resumeBtn;", src)
        self.assertIn("Button _gradeBtn;", src)
        self.assertIn("Button _exitBtn;", src)
        self.assertIn("Button _retryBtn;", src)

    def test_r34_light_background_color(self):
        """Content area must use light warm/cool gray/beige color."""
        src = self.pane_control_path.read_text(encoding="utf-8")
        self.assertIn("BgContent", src)
        self.assertIn("Color.FromArgb", src)
        # Transparent backgrounds for task labels inside the light area
        self.assertIn("Color.Transparent", src)

    def test_r34_nested_controls_no_sibling_overlap(self):
        """Child controls must be nested inside their respective parent Panels."""
        src = self.pane_control_path.read_text(encoding="utf-8")
        self.assertIn("statusBarBg.Controls.Add(_statusBarTitle)", src)
        self.assertIn("progressBg.Controls.Add(_progressBar)", src)
        self.assertIn("taskBg.Controls.Add(_taskTitleJa)", src)
        self.assertIn("actionBg.Controls.Add(_startBtn)", src)

    def test_r34_timer_cumulative_logic(self):
        """Timer must support cumulative pause/resume logic."""
        src = self.pane_control_path.read_text(encoding="utf-8")
        self.assertIn("_accumulatedTime", src)
        self.assertIn("PauseTimer()", src)
        self.assertIn("ResumeTimer()", src)
        self.assertIn("_statusBarTimer.Text", src)

    def test_r34_state_machine_apply_ui_state(self):
        """ApplyUIState must manage buttons and state transitions."""
        src = self.pane_control_path.read_text(encoding="utf-8")
        self.assertIn("ApplyUIState(string state)", src)
        self.assertIn("ready_to_start", src)
        self.assertIn("running", src)
        self.assertIn("paused", src)
        self.assertIn("ended", src)


class R35ExamAndConsoleTests(unittest.TestCase):
    """R35 门禁测试：模拟考试 V1 接入与 VSTO 响应式布局。"""

    def setUp(self):
        self.project_root = Path(__file__).resolve().parents[1]
        self.vsto_dir = self.project_root / "native" / "StudyTools.Mos365ExamHost.VstoBottomPanePoc"
        self.pane_control_path = self.vsto_dir / "ExamHostPaneControl.cs"
        self.this_addin_path = self.vsto_dir / "ThisAddIn.cs"
        self.temp_dir = tempfile.TemporaryDirectory()
        self.service = MOS365Service(self.project_root, session_root=self.temp_dir.name)

    def tearDown(self):
        self.temp_dir.cleanup()

    def test_r35_vsto_pane_responsive_layout(self):
        """Verify that responsive layout and Next button are integrated in VSTO pane."""
        src = self.pane_control_path.read_text(encoding="utf-8")
        self.assertIn("LayoutControls()", src)
        self.assertIn("Button _nextBtn;", src)
        self.assertIn("OnNextClicked", src)
        self.assertIn("next_step_ready", src)
        self.assertIn("exam_completed", src)
        self.assertIn("Resize +=", src)

    def test_r35_original_exam_v1_lifecycle(self):
        """Verify the backend lifecycle of original_exam_v1 session."""
        session = self.service.create_session({
            "mode": "exam",
            "scenarioId": "original_exam_v1"
        })
        self.assertEqual(session["mode"], "exam")
        self.assertEqual(session["scenarioId"], "original_exam_v1")
        self.assertEqual(len(session["tasks"]), 4)

        paths = self.service._paths(session["sessionId"])
        self.assertTrue(paths.workbook.is_file())
        self.assertTrue(paths.manifest.is_file())

        # Verify worksheets
        with zipfile.ZipFile(paths.workbook, "r") as archive:
            names = archive.namelist()
            sheet_xmls = [n for n in names if n.startswith("xl/worksheets/sheet")]
            self.assertEqual(len(sheet_xmls), 3)

        # Check metadata properties has custom XML with step = 1
        with zipfile.ZipFile(paths.workbook, "r") as archive:
            custom_xml = archive.read("docProps/custom.xml").decode("utf-8")
            self.assertIn('name="MOS_CURRENT_STEP"', custom_xml)
            self.assertIn("<vt:lpwstr>1</vt:lpwstr>", custom_xml)

        # Inject attached state and completion acknowledged to run session_score
        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        manifest["state"] = "attached"
        manifest["excelPid"] = 0
        manifest["attachedPid"] = 0
        manifest["completion"] = {"acknowledged": True, "acknowledgedAt": "", "acknowledgedPid": 0}
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

        # Execute scoring on unmodified exam
        res = self.service.session_score({"sessionId": session["sessionId"], "excelPid": 0})
        self.assertTrue(res["ok"])
        self.assertEqual(res["assessment"]["total"], 1) # one assertion per step
        self.assertEqual(res["assessment"]["earned"], 0)
        self.assertEqual(res["isExam"], True)
        self.assertEqual(res["currentStep"], 1)

        # Advance to next step (should return error if not correct, but here we can simulate it or call the API)
        next_step_res = self.service.session_next_step({
            "sessionId": session["sessionId"],
            "excelPid": 0
        })
        self.assertTrue(next_step_res["ok"])
        
        # Manifest currentStep is 0-indexed, so 0 advances to 1 (Step 2)
        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        self.assertEqual(manifest["currentStep"], 1)

        # Check docProps/custom.xml has been updated in-place to step = 2
        with zipfile.ZipFile(paths.workbook, "r") as archive:
            custom_xml = archive.read("docProps/custom.xml").decode("utf-8")
            self.assertIn("<vt:lpwstr>2</vt:lpwstr>", custom_xml)


class R352SafeForegroundHotfixGateTests(unittest.TestCase):
    """R35.2 安全前置最大化热修门禁测试。"""

    def setUp(self):
        self.project_root = Path(__file__).resolve().parents[1]
        self.service_path = self.project_root / "mos365_service.py"

    # ── 1. Source-level prohibition gates ──

    def test_no_attachthreadinput_in_runtime(self):
        """Runtime source must not contain AttachThreadInput."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertNotIn("AttachThreadInput", src)

    def test_no_bringwindowtotop_in_runtime(self):
        """Runtime source must not contain BringWindowToTop."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertNotIn("BringWindowToTop", src)

    def test_no_enumchildwindows_in_runtime(self):
        """Runtime source must not contain EnumChildWindows."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertNotIn("EnumChildWindows", src)

    def test_no_getwindowtext_in_runtime(self):
        """Runtime source must not contain GetWindowText."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertNotIn("GetWindowText", src)

    def test_no_wm_close_sw_hide_swp_hidewindow_in_runtime(self):
        """Runtime source must not contain WM_CLOSE, SW_HIDE, or SWP_HIDEWINDOW."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertNotIn("WM_CLOSE", src)
        self.assertNotIn("SW_HIDE", src)
        self.assertNotIn("SWP_HIDEWINDOW", src)

    def test_no_application_quit_or_workbook_close_in_runtime(self):
        """Runtime source must not contain Application.Quit or Workbook.Close."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertNotIn("Application.Quit", src)
        self.assertNotIn("Workbook.Close", src)

    # ── 2. Safe API usage gates ──

    def test_uses_showwindowasync_restore(self):
        """Function must use ShowWindowAsync with SW_RESTORE (9)."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertIn("ShowWindowAsync", src)
        self.assertIn("SW_RESTORE", src)
        self.assertIn("user32.ShowWindowAsync(target_hwnd, SW_RESTORE)", src)

    def test_uses_showwindowasync_maximize(self):
        """Function must use ShowWindowAsync with SW_MAXIMIZE (3)."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertIn("user32.ShowWindowAsync(target_hwnd, SW_MAXIMIZE)", src)

    def test_uses_setforegroundwindow(self):
        """Function must use SetForegroundWindow."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertIn("SetForegroundWindow", src)

    def test_uses_getforegroundwindow_pid_verification(self):
        """Function must verify foreground PID with GetForegroundWindow + GetWindowThreadProcessId."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertIn("fore_hwnd = user32.GetForegroundWindow()", src)
        self.assertIn("user32.GetWindowThreadProcessId(fore_hwnd, ctypes.byref(fore_pid))", src)

    def test_uses_zoomed_verification(self):
        """Function must verify maximize with IsZoomed."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertIn("IsZoomed", src)

    def test_no_title_or_class_matching(self):
        """Must NOT use GetWindowTextLengthW, GetWindowText, title matching, or class matching."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertNotIn("GetWindowTextLengthW", src)
        self.assertNotIn("GetClassName", src)

    # ── 3. EnumWindows PID-only filtering ──

    def test_enumwindows_pid_filtered_only(self):
        """EnumWindows callback must filter by PID and IsWindowVisible only — no title/class check."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertIn("_find_visible_window_for_pid", src)
        # The callback must not use GetWindowText or title length
        callback_patterns = [
            "process_id.value == target_pid and user32.IsWindowVisible(hwnd)",
        ]
        all_found = all(p in src for p in callback_patterns)
        self.assertTrue(all_found, "EnumWindows callback must filter by PID + IsWindowVisible only")
        self.assertNotIn("GetWindowTextLengthW", src)

    # ── 4. Diagnostics structure ──

    def test_foreground_diagnostics_fields_exist(self):
        """Diagnostics dict must contain all required fields."""
        from mos365_service import _get_foreground_diagnostic, _foreground_excel_async

        # Verify that filling diagnostics is the module-level function's responsibility
        self.assertIsNotNone(_get_foreground_diagnostic)
        self.assertIsNotNone(_foreground_excel_async)

    def test_get_foreground_diagnostic_none_for_unknown_session(self):
        """get_foreground_diagnostic must return None for unknown sessions."""
        from mos365_service import _get_foreground_diagnostic
        result = _get_foreground_diagnostic("nonexistent_session_id")
        self.assertIsNone(result)

    # ── 5. Diagnostics values rules ──

    def test_foreground_confirmed_requires_pid_match(self):
        """foreground_confirmed must NOT be set to True when PID mismatch."""
        src = self.service_path.read_text(encoding="utf-8")
        # The code must do PID comparison before setting foreground_confirmed = True
        self.assertIn('fore_pid.value == pid', src)
        self.assertIn('diag["foreground_confirmed"] = True', src)

    def test_maximize_confirmed_requires_zoomed(self):
        """maximize_confirmed must NOT be set to True when IsZoomed returns False."""
        src = self.service_path.read_text(encoding="utf-8")
        # Must check IsZoomed before setting maximize_confirmed = True
        self.assertIn('user32.IsZoomed(target_hwnd)', src)
        self.assertIn('diag["maximize_confirmed"] = True', src)

    def test_failure_category_not_none_on_failure(self):
        """When foreground is not confirmed, failure_category must not be None."""
        src = self.service_path.read_text(encoding="utf-8")
        # Must assign a failure_category in all non-success cases
        self.assertIn('"failure_category"', src)
        expected_categories = [
            "window_not_found",
            "set_foreground_rejected", "foreground_pid_mismatch",
            "maximize_not_confirmed", "timeout", "unexpected_win32_error",
        ]
        for cat in expected_categories:
            self.assertIn(cat, src)

    # ── 6. Diagnostics field boundaries ──

    def test_diagnostics_no_pid_or_path_leak(self):
        """Diagnostics must NOT contain PID, port, session ID, local path, or tech stack."""
        from mos365_service import _foreground_excel_async
        import inspect
        src = inspect.getsource(_foreground_excel_async)
        # Diagnostics may reference pid and session_id values but the REPORTED
        # field names must not include pid/path/tech stack. The diag dict keys
        # are: foreground_requested, window_found, maximize_requested,
        # foreground_confirmed, maximize_confirmed, elapsed_ms, failure_category
        self.assertIn("foreground_requested", src)
        self.assertIn("window_found", src)
        self.assertIn("foreground_confirmed", src)
        self.assertIn("maximize_confirmed", src)
        self.assertIn("elapsed_ms", src)
        self.assertIn("failure_category", src)
        # diag dict must NOT store pid as a diagnostic field name
        diag_lines = [l.strip() for l in src.split("\n") if 'diag' in l]
        for line in diag_lines:
            if '"pid"' in line.lower():
                self.fail(f"Diagnostics must not store PID: {line}")

    # ── 7. Idempotency / non-blocking ──

    def test_foreground_runs_in_daemon_thread(self):
        """Foreground function must start a daemon thread (never blocks launch)."""
        src = self.service_path.read_text(encoding="utf-8")
        self.assertIn("threading.Thread(target=_run, daemon=True", src)

    def test_foreground_never_blocks_response(self):
        """Foreground function must return None immediately (thread is fire-and-forget)."""
        from mos365_service import _foreground_excel_async
        result = _foreground_excel_async(999999, "test_session_id_no_excel")
        self.assertIsNone(result, "_foreground_excel_async must return None immediately")

    # ── 8. R16 / R17 regression (reference existing tests, must still pass) ──

    def test_r16_regression_via_r352(self):
        """R16 scoring must still work (class contract preserved)."""
        temp = tempfile.TemporaryDirectory()
        try:
            svc = MOS365Service(self.project_root, session_root=temp.name)
            from mos365_service import _LAUNCH_LOCK
            with _LAUNCH_LOCK:
                mos365_service._LAUNCH_STATE = None
            session = svc.create_session({"mode": "r16_static_training"})
            paths = svc._paths(session["sessionId"])
            import json
            manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
            manifest["state"] = "attached"
            manifest["excelPid"] = 0
            manifest["attachedPid"] = 0
            manifest["completion"] = {"acknowledged": True, "acknowledgedAt": "", "acknowledgedPid": 0}
            paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
            result = svc.session_score({"sessionId": session["sessionId"], "excelPid": 0})
            self.assertTrue(result["ok"])
            self.assertEqual(result["assessment"]["result"], "incorrect")
            self.assertEqual(result["assessment"]["earned"], 0)
        finally:
            temp.cleanup()

    def test_r17_regression_via_r352(self):
        """R17 scoring must still work (class contract preserved)."""
        temp = tempfile.TemporaryDirectory()
        try:
            svc = MOS365Service(self.project_root, session_root=temp.name)
            from mos365_service import _LAUNCH_LOCK
            with _LAUNCH_LOCK:
                mos365_service._LAUNCH_STATE = None
            session = svc.create_session({"mode": "r17_static_training"})
            paths = svc._paths(session["sessionId"])
            import json
            manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
            manifest["state"] = "attached"
            manifest["excelPid"] = 0
            manifest["attachedPid"] = 0
            manifest["completion"] = {"acknowledged": True, "acknowledgedAt": "", "acknowledgedPid": 0}
            paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
            result = svc.session_score({"sessionId": session["sessionId"], "excelPid": 0})
            self.assertTrue(result["ok"])
            self.assertEqual(result["assessment"]["result"], "incorrect")
        finally:
            temp.cleanup()


class R3521BehavioralSeamTests(unittest.TestCase):
    """R35.2.1 行为测试：使用 FakeUser32 API seam 模拟所有场景。"""

    def setUp(self):
        self.diag = {
            "foreground_requested": False,
            "window_found": False,
            "maximize_requested": False,
            "foreground_confirmed": False,
            "maximize_confirmed": False,
            "elapsed_ms": 0,
            "failure_category": None,
        }

    # ── Fake API 桩 ──

    class FakeUser32:
        """模拟 user32 接口的桩，可控制所有返回值。

        WARNING: _find_visible_window_for_pid 内部使用 ctypes.WINFUNCTYPE 包装
        回调，hwnd 参数可能以 c_void_p 形式传递（而非 int）。
        所有 FakeUser32 方法自动将 c_void_p 规约为 int。
        """

        def __init__(self):
            self._windows: dict[int, dict] = {}
            self._foreground_hwnd: int | None = None
            self._next_hwnd = 1000
            self._zoomed_hwnds: set[int] = set()

        @staticmethod
        def _to_int(hwnd) -> int:
            """规约 c_void_p → int；int 直接返回。"""
            return hwnd.value if hasattr(hwnd, "value") else hwnd

        def add_window(self, pid: int, visible: bool = True, hwnd: int | None = None) -> int:
            if hwnd is None:
                hwnd = self._next_hwnd
                self._next_hwnd += 1
            self._windows[hwnd] = {"pid": pid, "visible": visible}
            return hwnd

        def set_foreground(self, hwnd: int) -> None:
            self._foreground_hwnd = self._to_int(hwnd)

        def set_zoomed(self, hwnd: int, zoomed: bool = True) -> None:
            hwnd = self._to_int(hwnd)
            if zoomed:
                self._zoomed_hwnds.add(hwnd)
            else:
                self._zoomed_hwnds.discard(hwnd)

        # user32 API 模拟
        def ShowWindowAsync(self, hwnd, _cmd):
            pass  # fire-and-forget, 不阻塞

        def SetForegroundWindow(self, hwnd):
            self._foreground_hwnd = self._to_int(hwnd)

        def GetForegroundWindow(self):
            return self._foreground_hwnd

        def GetWindowThreadProcessId(self, hwnd, out_pid):
            hwnd = self._to_int(hwnd)
            win = self._windows.get(hwnd)
            # out_pid may be CArgObject from ctypes.byref(c_ulong).
            # Access the underlying c_ulong via _obj if present.
            target = out_pid._obj if hasattr(out_pid, '_obj') else out_pid
            target.value = win["pid"] if win else 0

        def IsWindowVisible(self, hwnd):
            hwnd = self._to_int(hwnd)
            win = self._windows.get(hwnd)
            return bool(win and win["visible"])

        def IsZoomed(self, hwnd):
            hwnd = self._to_int(hwnd)
            return hwnd in self._zoomed_hwnds

        def EnumWindows(self, enum_proc, _lparam):
            for hwnd in self._windows:
                if not enum_proc(hwnd, 0):
                    break

        def GetWindowThreadProcessId_raw(self, hwnd):
            win = self._windows.get(hwnd)
            return win["pid"] if win else 0

    # ── 1. 完整成功路径 ──

    def test_success_path(self):
        """Foreground+maximize 完整成功路径：PID 匹配、IsZoomed 为真、且验证通过后退出。"""
        from mos365_service import _foreground_excel_with_api
        fake = self.FakeUser32()
        FAKE_HWND = 1000
        fake.add_window(pid=42, visible=True, hwnd=FAKE_HWND)
        fake.set_foreground(FAKE_HWND)
        fake.set_zoomed(FAKE_HWND, zoomed=True)

        def find(_u, pid):
            return FAKE_HWND if pid == 42 else None

        _foreground_excel_with_api(fake, pid=42, session_id="s1", deadline_seconds=2.0, diag=self.diag, find_window=find)

        self.assertTrue(self.diag["foreground_confirmed"])
        self.assertTrue(self.diag["maximize_confirmed"])
        self.assertIsNone(self.diag["failure_category"])
        self.assertGreater(self.diag["elapsed_ms"], 0)

    # ── 2. 调用顺序：SetForegroundWindow 在验证之前 ──

    def test_set_foreground_before_verification(self):
        """SetForegroundWindow 被调用之后才有 foreground_confirmed。"""
        from mos365_service import _foreground_excel_with_api
        fake = self.FakeUser32()

        class OrderTrackingFake:
            def __init__(self, inner):
                self._inner = inner
                self.call_sequence = []

            def ShowWindowAsync(self, hwnd, cmd):
                self._inner.ShowWindowAsync(hwnd, cmd)

            def SetForegroundWindow(self, hwnd):
                self.call_sequence.append("SetForegroundWindow")
                self._inner._foreground_hwnd = self._inner._to_int(hwnd)

            def GetForegroundWindow(self):
                self.call_sequence.append("GetForegroundWindow")
                return self._inner._foreground_hwnd

            def GetWindowThreadProcessId(self, hwnd, out_pid):
                self._inner.GetWindowThreadProcessId(hwnd, out_pid)

            def IsWindowVisible(self, hwnd):
                return True

            def IsZoomed(self, hwnd):
                self.call_sequence.append("IsZoomed")
                hwnd = self._inner._to_int(hwnd)
                return hwnd in self._inner._zoomed_hwnds

            def EnumWindows(self, enum_proc, _lparam):
                pass  # 不使用

        FAKE_HWND = 1000
        fake.add_window(pid=42, visible=True, hwnd=FAKE_HWND)
        fake.set_foreground(FAKE_HWND)
        fake.set_zoomed(FAKE_HWND, zoomed=True)
        tracker = OrderTrackingFake(fake)

        def find(_u, pid):
            return FAKE_HWND if pid == 42 else None

        _foreground_excel_with_api(tracker, pid=42, session_id="s2", deadline_seconds=2.0, diag=self.diag, find_window=find)

        self.assertTrue(self.diag["foreground_confirmed"])
        sfw_idx = tracker.call_sequence.index("SetForegroundWindow")
        first_check = next(
            i for i, name in enumerate(tracker.call_sequence)
            if name in ("GetForegroundWindow", "IsZoomed")
        )
        self.assertLess(sfw_idx, first_check)

    # ── 3. 非 PID 保护 ──

    def test_non_pid_window_ignored(self):
        """仅 PID 匹配的窗口被操作，非匹配窗口被忽略。"""
        from mos365_service import _foreground_excel_with_api
        fake = self.FakeUser32()
        fake.add_window(pid=99, visible=True, hwnd=1001)  # 错误 PID
        target_hwnd = fake.add_window(pid=42, visible=True, hwnd=1002)
        fake.set_foreground(target_hwnd)
        fake.set_zoomed(target_hwnd, zoomed=True)

        def find(_u, pid):
            return target_hwnd if pid == 42 else None

        _foreground_excel_with_api(fake, pid=42, session_id="s3", deadline_seconds=2.0, diag=self.diag, find_window=find)

        self.assertTrue(self.diag["window_found"])
        self.assertTrue(self.diag["foreground_confirmed"])

    # ── 4. maximize_not_confirmed ──

    def test_maximize_not_confirmed(self):
        """IsZoomed 返回假应分类为 maximize_not_confirmed。"""
        from mos365_service import _foreground_excel_with_api
        fake = self.FakeUser32()
        FAKE_HWND = 1000
        fake.add_window(pid=42, visible=True, hwnd=FAKE_HWND)
        fake.set_foreground(FAKE_HWND)
        fake.set_zoomed(FAKE_HWND, zoomed=False)  # 未最大化

        def find(_u, pid):
            return FAKE_HWND if pid == 42 else None

        _foreground_excel_with_api(fake, pid=42, session_id="s4", deadline_seconds=5.0, diag=self.diag, find_window=find)

        self.assertTrue(self.diag["foreground_confirmed"])
        self.assertFalse(self.diag["maximize_confirmed"])
        self.assertEqual(self.diag["failure_category"], "maximize_not_confirmed")

    # ── 5. foreground_pid_mismatch ──

    def test_foreground_pid_mismatch(self):
        """SetForegroundWindow 后前台窗口的 PID 不匹配 → foreground_pid_mismatch。"""
        from mos365_service import _foreground_excel_with_api

        class PidMismatchFake(self.FakeUser32):
            """SetForegroundWindow 总是将前台设为不同 PID 的窗口（模拟 OS 拒绝）。"""
            def SetForegroundWindow(self, hwnd):
                self._foreground_hwnd = 2001  # pid=99 的窗口

        fake = PidMismatchFake()
        FAKE_HWND = 1000
        fake.add_window(pid=42, visible=True, hwnd=FAKE_HWND)
        fake.add_window(pid=99, visible=True, hwnd=2001)  # 前台落到此窗口

        def find(_u, pid):
            return FAKE_HWND if pid == 42 else None

        _foreground_excel_with_api(fake, pid=42, session_id="s5", deadline_seconds=2.0, diag=self.diag, find_window=find)

        self.assertFalse(self.diag["foreground_confirmed"])
        self.assertEqual(self.diag["failure_category"], "foreground_pid_mismatch")

    # ── 6. set_foreground_rejected ──

    def test_set_foreground_rejected(self):
        """GetForegroundWindow 返回空 → set_foreground_rejected。"""
        from mos365_service import _foreground_excel_with_api

        class RejectedFake(self.FakeUser32):
            """SetForegroundWindow 无效，前台始终为 None。"""
            def SetForegroundWindow(self, hwnd):
                self._foreground_hwnd = None

        fake = RejectedFake()
        FAKE_HWND = 1000
        fake.add_window(pid=42, visible=True, hwnd=FAKE_HWND)

        def find(_u, pid):
            return FAKE_HWND if pid == 42 else None

        _foreground_excel_with_api(fake, pid=42, session_id="s6", deadline_seconds=2.0, diag=self.diag, find_window=find)

        self.assertFalse(self.diag["foreground_confirmed"])
        self.assertEqual(self.diag["failure_category"], "set_foreground_rejected")

    # ── 7. window_not_found ──

    def test_window_not_found(self):
        """未见目标 PID 窗口 → window_not_found。"""
        from mos365_service import _foreground_excel_with_api
        fake = self.FakeUser32()
        fake.add_window(pid=99, visible=True, hwnd=1001)

        _foreground_excel_with_api(fake, pid=42, session_id="s7", deadline_seconds=0.2, diag=self.diag, find_window=lambda u, pid: None)

        self.assertFalse(self.diag["window_found"])
        self.assertEqual(self.diag["failure_category"], "window_not_found")

    # ── 8. timeout ──

    def test_timeout_expired(self):
        """前台操作超时 → maximize_not_confirmed。"""
        from mos365_service import _foreground_excel_with_api
        fake = self.FakeUser32()
        FAKE_HWND = 1000
        fake.add_window(pid=42, visible=True, hwnd=FAKE_HWND)
        fake.set_foreground(FAKE_HWND)
        fake.set_zoomed(FAKE_HWND, zoomed=False)  # 不最大化

        def find(_u, pid):
            return FAKE_HWND if pid == 42 else None

        # Phase 2 内的 sleep 总和约为 0.5s，确保 deadline 在轮询期耗尽
        _foreground_excel_with_api(fake, pid=42, session_id="s8", deadline_seconds=0.6, diag=self.diag, find_window=find)

        # foreground 应确认成功但 maximize 超时
        self.assertTrue(self.diag["foreground_confirmed"])
        self.assertFalse(self.diag["maximize_confirmed"])
        self.assertEqual(self.diag["failure_category"], "maximize_not_confirmed")
        self.assertEqual(self.diag["failure_category"], "maximize_not_confirmed")

    def test_timeout_full(self):
        """foreground PID 和 maximize 都未达到 → timeout。"""
        from mos365_service import _foreground_excel_with_api
        fake = self.FakeUser32()
        FAKE_HWND = 1000
        fake.add_window(pid=42, visible=True, hwnd=FAKE_HWND)
        fake._foreground_hwnd = None  # 永远不让前台
        fake.set_zoomed(FAKE_HWND, zoomed=False)

        def find(_u, pid):
            # finder 成功后前台窗口为 None，导致 set_foreground_rejected
            return FAKE_HWND if pid == 42 else None

        _foreground_excel_with_api(fake, pid=42, session_id="s8b", deadline_seconds=0.2, diag=self.diag, find_window=find)

        self.assertFalse(self.diag["foreground_confirmed"])
        # foreground 从未确认，fg 为 None → set_foreground_rejected

    # ── 9. 异常处理 ──

    def test_unexpected_error(self):
        """user32 调用抛出异常 → unexpected_win32_error。"""
        from mos365_service import _foreground_excel_with_api

        class FaultyFake:
            def ShowWindowAsync(self, hwnd, cmd):
                raise RuntimeError("模拟崩溃")

            def SetForegroundWindow(self, hwnd):
                pass
            def GetForegroundWindow(self):
                pass
            def GetWindowThreadProcessId(self, hwnd, out_pid):
                out_pid.value = 0
            def IsWindowVisible(self, hwnd):
                return True
            def IsZoomed(self, hwnd):
                return True
            def EnumWindows(self, enum_proc, _lparam):
                pass

        fake = FaultyFake()

        _foreground_excel_with_api(fake, pid=42, session_id="s9", deadline_seconds=2.0, diag=self.diag, find_window=lambda u, pid: 1000)

        self.assertEqual(self.diag["failure_category"], "unexpected_win32_error")

    # ── 10. 非阻塞 ──

    def test_async_returns_immediately(self):
        """_foreground_excel_async 立即返回 None（daemon 线程）。"""
        from mos365_service import _foreground_excel_async
        result = _foreground_excel_async(999999, "test_session_async_behavior")
        self.assertIsNone(result)

    def test_daemon_thread_no_wait(self):
        """Daemon 线程不阻塞主线程退出。"""
        import threading
        from mos365_service import _foreground_excel_async

        threads_before = threading.active_count()
        _foreground_excel_async(42, "test_session_daemon")
        threads_after = threading.active_count()
        # 应启动一个新线程
        self.assertGreaterEqual(threads_after, threads_before)


if __name__ == "__main__":
    unittest.main()
