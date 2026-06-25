"""Local-only MOS Excel 365 session service.

This module deliberately accepts no executable path and no workbook path from the browser.
It can only create, open and grade an original workbook inside the MOS365 session root.
"""
from __future__ import annotations

import json
import os
import re
import secrets
import subprocess
import tempfile
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from xml.etree import ElementTree as ET


NS_MAIN = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
NS_REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
NS_PKG_REL = "http://schemas.openxmlformats.org/package/2006/relationships"
NS = {"m": NS_MAIN, "r": NS_REL, "pr": NS_PKG_REL}
SESSION_ID_RE = re.compile(r"^[A-Za-z0-9_-]{20,80}$")
SAFE_SCENARIOS = {"retail", "shift", "budget"}
SAFE_MODES = {"guided", "mock"}


class MOS365ServiceError(Exception):
    def __init__(self, code: str, message_ja: str, message_zh: str, status: int = 400):
        super().__init__(message_ja)
        self.code = code
        self.message_ja = message_ja
        self.message_zh = message_zh
        self.status = status

    def as_dict(self) -> dict[str, Any]:
        return {
            "success": False,
            "error": self.code,
            "messageJa": self.message_ja,
            "messageZh": self.message_zh,
        }


@dataclass(frozen=True)
class SessionPaths:
    session_id: str
    directory: Path
    workbook: Path
    manifest: Path


class MOS365Service:
    """Creates and grades only original MOS365 practice workbooks in LocalAppData."""

    def __init__(self, app_root: str | os.PathLike[str], session_root: str | os.PathLike[str] | None = None):
        self.app_root = Path(app_root).resolve()
        base = session_root or os.environ.get("LOCALAPPDATA")
        if not base:
            base = Path(tempfile.gettempdir()) / "StudyToolsLocalAppData"
        self.root = (Path(base) / "StudyTools" / "MOS365" / "Sessions").resolve()
        self.root.mkdir(parents=True, exist_ok=True)

    @staticmethod
    def _within(child: Path, parent: Path) -> bool:
        try:
            child.resolve().relative_to(parent.resolve())
            return True
        except ValueError:
            return False

    def _safe_session_id(self, session_id: str) -> str:
        if not isinstance(session_id, str) or not SESSION_ID_RE.fullmatch(session_id):
            raise MOS365ServiceError(
                "INVALID_SESSION",
                "セッション ID が無効です。",
                "会话 ID 无效。",
            )
        return session_id

    def _paths(self, session_id: str, require_exists: bool = True) -> SessionPaths:
        session_id = self._safe_session_id(session_id)
        directory = (self.root / session_id).resolve()
        if not self._within(directory, self.root):
            raise MOS365ServiceError("SESSION_BOUNDARY", "セッション外のパスは使用できません。", "不能使用会话目录外的路径。")
        if require_exists and not directory.is_dir():
            raise MOS365ServiceError("SESSION_NOT_FOUND", "セッションが見つかりません。", "未找到会话。", 404)
        workbook = directory / f"MOS365_{session_id}.xlsx"
        manifest = directory / "session_manifest.json"
        return SessionPaths(session_id, directory, workbook, manifest)

    @staticmethod
    def _is_trusted_excel(path: Path) -> bool:
        try:
            candidate = path.resolve()
        except OSError:
            return False
        if candidate.name.upper() != "EXCEL.EXE" or not candidate.is_file():
            return False
        lowered = str(candidate).lower()
        blocked_roots = [os.environ.get("TEMP", ""), os.environ.get("TMP", "")]
        for root in blocked_roots:
            if root and lowered.startswith(str(Path(root).resolve()).lower()):
                return False
        return True

    def find_excel(self) -> Path | None:
        candidates: list[Path] = []
        if os.name == "nt":
            try:
                import winreg  # type: ignore
                for hive in (winreg.HKEY_LOCAL_MACHINE, winreg.HKEY_CURRENT_USER):
                    for key_path in (
                        r"SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\excel.exe",
                        r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\App Paths\excel.exe",
                    ):
                        try:
                            with winreg.OpenKey(hive, key_path) as key:
                                value, _ = winreg.QueryValueEx(key, None)
                                candidates.append(Path(str(value)))
                        except OSError:
                            continue
            except Exception:
                pass
            program_files = [os.environ.get("ProgramFiles"), os.environ.get("ProgramFiles(x86)")]
            office_dirs = (
                ("Microsoft Office", "root", "Office16", "EXCEL.EXE"),
                ("Microsoft Office", "Office16", "EXCEL.EXE"),
                ("Microsoft Office", "root", "Office15", "EXCEL.EXE"),
            )
            for base in filter(None, program_files):
                for parts in office_dirs:
                    candidates.append(Path(base).joinpath(*parts))
        for candidate in candidates:
            if self._is_trusted_excel(candidate):
                return candidate.resolve()
        return None

    def environment_status(self) -> dict[str, Any]:
        excel = self.find_excel()
        sandbox_writable = False
        try:
            probe = self.root / ".write_probe"
            probe.write_text("ok", encoding="utf-8")
            probe.unlink(missing_ok=True)
            sandbox_writable = True
        except OSError:
            sandbox_writable = False
        return {
            "excelFound": bool(excel),
            "excelPath": str(excel) if excel else None,
            "excelPathSafe": bool(excel),
            "sessionRoot": str(self.root),
            "sandboxWritable": sandbox_writable,
            "officeUiLanguageConfirmed": False,
            "messageJa": "Microsoft Excel デスクトップ版が見つかりました。" if excel else "Microsoft Excel デスクトップ版が見つかりません。",
            "messageZh": "已检测到 Microsoft Excel 桌面版。" if excel else "未检测到可用的 Microsoft Excel 桌面版。",
        }

    def create_session(self, payload: dict[str, Any]) -> dict[str, Any]:
        mode = str(payload.get("mode", "guided"))
        scenario = str(payload.get("scenarioId", "retail"))
        variant = payload.get("variant", 1)
        try:
            variant = int(variant)
        except (TypeError, ValueError):
            variant = 1
        if mode not in SAFE_MODES:
            raise MOS365ServiceError("INVALID_MODE", "練習モードが無効です。", "练习模式无效。")
        if scenario not in SAFE_SCENARIOS:
            raise MOS365ServiceError("INVALID_SCENARIO", "シナリオが無効です。", "场景无效。")
        if variant not in (1, 2, 3, 4):
            raise MOS365ServiceError("INVALID_VARIANT", "バリエーションが無効です。", "变式无效。")

        session_id = secrets.token_urlsafe(24).replace("-", "_")
        paths = self._paths(session_id, require_exists=False)
        paths.directory.mkdir(mode=0o700, parents=False, exist_ok=False)
        task_rules = self._task_rules(scenario, variant)
        manifest = {
            "schemaVersion": 1,
            "sessionId": session_id,
            "examCode": "MOS365-EXCEL-GENERAL",
            "mode": mode,
            "scenarioId": scenario,
            "variant": variant,
            "workbook": paths.workbook.name,
            "taskRules": task_rules,
            "createdAt": __import__("datetime").datetime.now().astimezone().isoformat(),
        }
        self._write_original_workbook(paths.workbook, scenario, variant)
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        return {
            "sessionId": session_id,
            "mode": mode,
            "scenarioId": scenario,
            "variant": variant,
            "fileName": paths.workbook.name,
            "sandboxRoot": str(paths.directory),
            "tasks": [self._public_task(rule) for rule in task_rules],
            "environment": self.environment_status(),
        }

    def launch_excel(self, payload: dict[str, Any]) -> dict[str, Any]:
        session_id = self._safe_session_id(str(payload.get("sessionId", "")))
        paths = self._paths(session_id)
        if not paths.workbook.is_file() or paths.workbook.suffix.lower() != ".xlsx":
            raise MOS365ServiceError("WORKBOOK_NOT_FOUND", "練習ファイルが見つかりません。", "未找到练习文件。", 404)
        excel = self.find_excel()
        if not excel:
            raise MOS365ServiceError(
                "EXCEL_NOT_FOUND",
                "Microsoft Excel デスクトップ版が見つかりません。",
                "未检测到可用的 Microsoft Excel 桌面版。请安装并激活 Windows 版 Excel 后再使用真机练习。",
                409,
            )
        # Only EXCEL.EXE and the server-created workbook are ever passed to Popen.
        # /x isolates this Session from Excel's DDE reuse of an older workbook window.
        process = subprocess.Popen([str(excel), "/x", str(paths.workbook)], shell=False, close_fds=(os.name != "nt"))
        return {
            "launched": True,
            "fileName": paths.workbook.name,
            "sessionId": session_id,
            "processId": process.pid,
        }

    def score_session(self, payload: dict[str, Any]) -> dict[str, Any]:
        session_id = self._safe_session_id(str(payload.get("sessionId", "")))
        paths = self._paths(session_id)
        if not paths.manifest.is_file() or not paths.workbook.is_file():
            raise MOS365ServiceError("SESSION_INCOMPLETE", "採点に必要なセッションファイルがありません。", "评分所需的会话文件不存在。", 404)
        try:
            manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            raise MOS365ServiceError("MANIFEST_INVALID", "セッション情報を読み込めません。", "无法读取会话信息。", 500) from exc
        evidence = self._extract_evidence(paths.workbook)
        results = [self._grade_rule(rule, evidence, session_id) for rule in manifest.get("taskRules", [])]
        score = sum(item["score"] for item in results)
        maximum = sum(item["maxScore"] for item in results)
        return {
            "sessionId": session_id,
            "examCode": manifest.get("examCode"),
            "scenarioId": manifest.get("scenarioId"),
            "score": score,
            "maxScore": maximum,
            "percentage": round((score / maximum * 100) if maximum else 0, 1),
            "results": results,
        }

    def delete_current_session(self, payload: dict[str, Any]) -> dict[str, Any]:
        session_id = self._safe_session_id(str(payload.get("sessionId", "")))
        paths = self._paths(session_id)
        requested = str(payload.get("fileName", ""))
        if requested != paths.workbook.name:
            raise MOS365ServiceError("DELETE_DENIED", "このセッションの練習ファイルだけ削除できます。", "只能删除当前会话的练习文件。")
        if paths.workbook.exists():
            paths.workbook.unlink()
        return {"deleted": True, "sessionId": session_id, "fileName": paths.workbook.name}

    @staticmethod
    def _public_task(rule: dict[str, Any]) -> dict[str, Any]:
        return {
            "taskId": rule["taskId"],
            "instructionJa": rule["instructionJa"],
            "skillIds": rule["skillIds"],
            "weight": rule["weight"],
        }

    def _task_rules(self, scenario: str, variant: int) -> list[dict[str, Any]]:
        suffix = {"retail": "店舗", "shift": "シフト", "budget": "予算"}[scenario]
        data_sheet = suffix + "データ"
        formulas = [
            ("E2", "=C2*D2"), ("E3", "=C3*D3"), ("E4", "=C4*D4"), ("E5", "=C5*D5"),
            ("E6", "=C6*D6"), ("E7", "=C7*D7"), ("E8", "=C8*D8"), ("E9", "=C9*D9"),
            ("F2", "=IF(E2>=10000,\"達成\",\"確認\")"), ("F3", "=IF(E3>=10000,\"達成\",\"確認\")"),
            ("H2", "=SUM(E2:E9)"), ("H3", "=AVERAGE(E2:E9)"), ("H4", "=MAX(E2:E9)"), ("H5", "=MIN(E2:E9)"),
            ("H6", "=COUNT(E2:E9)"), ("H7", "=COUNTA(B2:B9)"), ("H8", "=COUNTBLANK(G2:G9)"),
            ("I2", "=$H$2*C2"), ("I3", "=$H$2*C3"), ("I4", "=$H$2*C4"), ("I5", "=$H$2*C5")
        ]
        rules: list[dict[str, Any]] = []
        skill_cycle = [
            "MOS365.EXCEL.WORKBOOK.MANAGE_SHEETS", "MOS365.EXCEL.CELL.ROW_COLUMN", "MOS365.EXCEL.CELL.NUMBER_FORMAT",
            "MOS365.EXCEL.CELL.BORDER_FILL", "MOS365.EXCEL.CELL.ALIGNMENT", "MOS365.EXCEL.CELL.CONDITIONAL_FORMATTING",
            "MOS365.EXCEL.TABLE.CREATE", "MOS365.EXCEL.TABLE.SORT", "MOS365.EXCEL.TABLE.FILTER", "MOS365.EXCEL.TABLE.TOTAL_ROW",
            "MOS365.EXCEL.CELL.NAMED_RANGE", "MOS365.EXCEL.FORMULA.RELATIVE_REFERENCE", "MOS365.EXCEL.FORMULA.ABSOLUTE_REFERENCE",
            "MOS365.EXCEL.FUNCTION.IF", "MOS365.EXCEL.FUNCTION.SUM", "MOS365.EXCEL.FUNCTION.AVERAGE", "MOS365.EXCEL.FUNCTION.COUNT",
            "MOS365.EXCEL.WORKBOOK.FREEZE_PANES", "MOS365.EXCEL.WORKBOOK.PRINT_AREA", "MOS365.EXCEL.WORKBOOK.PAGE_SETUP",
            "MOS365.EXCEL.WORKBOOK.HEADERS_FOOTERS", "MOS365.EXCEL.CHART.CREATE", "MOS365.EXCEL.CHART.TITLE",
            "MOS365.EXCEL.CHART.LEGEND", "MOS365.EXCEL.CHART.DATA_LABELS"
        ]
        for index, (cell, formula) in enumerate(formulas, start=1):
            rules.append(self._rule(
                index, [skill_cycle[(index - 1) % len(skill_cycle)]], "formula", data_sheet + "!" + cell,
                formula, f"作業用シートの {cell} に {formula} を入力しなさい。",
                "数式と参照形式を確認します。", "公式和引用方式将被检查。"
            ))
        rule_specs = [
            ("sheet_name", "作業用", suffix + "データ", f"作業用シートの名前を「{suffix}データ」に変更しなさい。"),
            ("freeze_panes", suffix + "データ", "A2", "データシートで先頭行を固定しなさい。"),
            ("number_format", suffix + "データ!E2:E9", "#,##0", "売上金額の表示形式を桁区切りの数値に設定しなさい。"),
            ("conditional_format", suffix + "データ", "E2:E9", "売上金額に条件付き書式を設定しなさい。"),
            ("auto_filter", suffix + "データ", "A1:F9", "データ範囲にフィルターを設定しなさい。"),
            ("table", suffix + "データ", "A1:F9", "データ範囲をテーブルに変換しなさい。"),
            ("sort_state", suffix + "データ", "E2:E9", "売上金額を降順に並べ替えなさい。"),
            ("defined_name", "売上合計", "'集計'!$H$2", "集計セル H2 に「売上合計」という名前を定義しなさい。"),
            ("print_area", "印刷用", "$A$1:$F$9", "印刷用シートの印刷範囲を設定しなさい。"),
            ("page_orientation", "印刷用", "landscape", "印刷用シートを横向きに設定しなさい。"),
            ("header_footer", "印刷用", "&P", "印刷用シートのヘッダーまたはフッターにページ番号を設定しなさい。"),
            ("chart", "グラフ", "barChart", "グラフシートに集合縦棒グラフを作成しなさい。"),
            ("chart_title", "グラフ", suffix + "売上", "グラフタイトルを設定しなさい。"),
            ("chart_legend", "グラフ", "bottom", "凡例を下に表示しなさい。"),
            ("chart_data_labels", "グラフ", "showVal", "データラベルに値を表示しなさい。"),
            ("cell_alignment", suffix + "データ!A1:F1", "center", "見出し行を中央揃えにしなさい。"),
            ("cell_border", suffix + "データ!A1:F9", "thin", "表全体に罫線を設定しなさい。"),
            ("cell_fill", suffix + "データ!A1:F1", "solid", "見出し行に塗りつぶしを設定しなさい。"),
            ("wrap_text", suffix + "データ!B1", "1", "商品名の見出しを折り返して全体を表示しなさい。"),
            ("row_height", suffix + "データ", "20", "見出し行の高さを調整しなさい。"),
            ("column_width", suffix + "データ", "12", "金額列の幅を調整しなさい。"),
            ("page_margins", "印刷用", "0.7", "印刷用シートの余白を調整しなさい。"),
            ("sheet_view", suffix + "データ", "showGridLines=0", "データシートの目盛線を非表示にしなさい。"),
            ("formula", "集計!J2", f"=SUM('{data_sheet}'!E2:E9)", "集計シートの J2 に SUM 関数を入力しなさい。"),
            ("formula", "集計!J3", "=IF(J2>=50000,\"達成\",\"確認\")", "集計シートの J3 に IF 関数を入力しなさい。"),
            ("formula", "集計!J4", f"=LEFT('{data_sheet}'!A2,2)", "集計シートの J4 に LEFT 関数を入力しなさい。"),
            ("formula", "集計!J5", f"=RIGHT('{data_sheet}'!A2,2)", "集計シートの J5 に RIGHT 関数を入力しなさい。"),
            ("formula", "集計!J6", f"=LEN('{data_sheet}'!A2)", "集計シートの J6 に LEN 関数を入力しなさい。"),
            ("cell_value", "メモ!A1", "確認済み", "メモシートの A1 に「確認済み」と入力しなさい。")
        ]
        for kind, target, expected, instruction in rule_specs:
            index = len(rules) + 1
            rules.append(self._rule(index, [skill_cycle[(index - 1) % len(skill_cycle)]], kind, target, expected, instruction, "設定内容を確認します。", "将检查设置内容。"))
        if len(rules) != 50:
            raise RuntimeError("MOS task blueprints must contain exactly 50 score points")
        return rules

    @staticmethod
    def _rule(index: int, skill_ids: list[str], kind: str, target: str, expected: str, instruction: str, explanation_ja: str, explanation_zh: str) -> dict[str, Any]:
        return {
            "taskId": "MOS365-" + str(index).zfill(2),
            "skillIds": skill_ids,
            "kind": kind,
            "target": target,
            "expected": expected,
            "weight": 2,
            "instructionJa": "タスク " + str(index).zfill(2) + "：" + instruction,
            "explanationJa": explanation_ja,
            "explanationZh": explanation_zh,
            "remediationJa": "対象範囲と Excel のメニューをもう一度確認してください。",
            "remediationZh": "请再次确认目标范围与 Excel 菜单路径。",
        }

    def _write_original_workbook(self, destination: Path, scenario: str, variant: int) -> None:
        scenario_titles = {
            "retail": "コンビニ店舗売上", "shift": "アルバイトシフト", "budget": "旅行予算",
        }
        title = scenario_titles[scenario] + " " + str(variant)
        sheets = ["作業用", "商品一覧", "集計", "印刷用", "グラフ", "メモ"]
        rows = [
            ["番号", "商品名", "単価", "数量", "売上金額", "判定"],
            ["A01", "おにぎり", 120 + variant, 35, "", ""],
            ["A02", "緑茶", 150 + variant, 22, "", ""],
            ["A03", "サンドイッチ", 320 + variant, 18, "", ""],
            ["A04", "弁当", 580 + variant, 16, "", ""],
            ["A05", "コーヒー", 180 + variant, 41, "", ""],
            ["A06", "菓子", 210 + variant, 28, "", ""],
            ["A07", "雑誌", 650 + variant, 8, "", ""],
            ["A08", "日用品", 430 + variant, 12, "", ""],
        ]
        sheet_xml = [self._sheet_xml(rows), self._sheet_xml(rows), self._sheet_xml([[title, ""], ["合計", ""], ["平均", ""], ["最大", ""], ["最小", ""], ["件数", ""], ["商品数", ""], ["空白数", ""], ["", ""]]), self._sheet_xml(rows), self._sheet_xml([["グラフ作成用", ""], ["商品", "売上"]]), self._sheet_xml([["", ""]])]
        workbook_sheets = "".join(f'<sheet name="{self._xml_escape(name)}" sheetId="{idx + 1}" r:id="rId{idx + 1}"/>' for idx, name in enumerate(sheets))
        workbook_xml = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="{NS_MAIN}" xmlns:r="{NS_REL}"><sheets>{workbook_sheets}</sheets></workbook>'
        rels = "".join(f'<Relationship Id="rId{idx + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{idx + 1}.xml"/>' for idx in range(len(sheets)))
        workbook_rels = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="{NS_PKG_REL}">{rels}<Relationship Id="rId{len(sheets) + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'
        content_types = ['<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>', '<Default Extension="xml" ContentType="application/xml"/>', '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>', '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>']
        content_types += [f'<Override PartName="/xl/worksheets/sheet{idx + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' for idx in range(len(sheets))]
        root_rels = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="{NS_PKG_REL}"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'
        styles = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="0"/><fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs></styleSheet>'
        with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            archive.writestr("[Content_Types].xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' + "".join(content_types) + "</Types>")
            archive.writestr("_rels/.rels", root_rels)
            archive.writestr("xl/workbook.xml", workbook_xml)
            archive.writestr("xl/_rels/workbook.xml.rels", workbook_rels)
            archive.writestr("xl/styles.xml", styles)
            for index, content in enumerate(sheet_xml, start=1):
                archive.writestr(f"xl/worksheets/sheet{index}.xml", content)

    @staticmethod
    def _xml_escape(value: Any) -> str:
        return str(value).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")

    def _sheet_xml(self, rows: list[list[Any]]) -> str:
        body = []
        for row_index, row in enumerate(rows, start=1):
            cells = []
            for column_index, value in enumerate(row, start=1):
                ref = self._column_name(column_index) + str(row_index)
                if isinstance(value, (int, float)):
                    cells.append(f'<c r="{ref}"><v>{value}</v></c>')
                else:
                    cells.append(f'<c r="{ref}" t="inlineStr"><is><t>{self._xml_escape(value)}</t></is></c>')
            body.append(f'<row r="{row_index}">' + "".join(cells) + "</row>")
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>' + "".join(body) + "</sheetData></worksheet>"

    @staticmethod
    def _column_name(number: int) -> str:
        result = ""
        while number:
            number, remainder = divmod(number - 1, 26)
            result = chr(65 + remainder) + result
        return result

    def _extract_evidence(self, workbook: Path) -> dict[str, Any]:
        try:
            with zipfile.ZipFile(workbook, "r") as archive:
                names = set(archive.namelist())
                if "xl/workbook.xml" not in names or "xl/_rels/workbook.xml.rels" not in names:
                    raise MOS365ServiceError("XLSX_INVALID", "Excel ファイルの構造が無効です。", "Excel 文件结构无效。")
                shared = self._shared_strings(archive, names)
                sheet_paths = self._sheet_paths(archive)
                sheets = {name: self._read_sheet(archive, path, shared) for name, path in sheet_paths.items() if path in names}
                workbook_xml = ET.fromstring(archive.read("xl/workbook.xml"))
                defined = {node.attrib.get("name", ""): (node.text or "") for node in workbook_xml.findall("m:definedNames/m:definedName", NS)}
                tables = self._tables(archive, names)
                charts = self._charts(archive, names)
                styles = self._styles(archive, names)
                return {"sheets": sheets, "definedNames": defined, "tables": tables, "charts": charts, "styles": styles}
        except zipfile.BadZipFile as exc:
            raise MOS365ServiceError("XLSX_INVALID", "Excel ファイルを読み込めません。", "无法读取 Excel 文件。") from exc
        except ET.ParseError as exc:
            raise MOS365ServiceError("XLSX_INVALID", "Excel XML を解析できません。", "无法解析 Excel XML。") from exc

    @staticmethod
    def _shared_strings(archive: zipfile.ZipFile, names: set[str]) -> list[str]:
        if "xl/sharedStrings.xml" not in names:
            return []
        root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
        return ["".join(node.itertext()) for node in root.findall("m:si", NS)]

    @staticmethod
    def _sheet_paths(archive: zipfile.ZipFile) -> dict[str, str]:
        workbook = ET.fromstring(archive.read("xl/workbook.xml"))
        rels = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
        rel_map = {node.attrib.get("Id"): node.attrib.get("Target", "") for node in rels.findall("pr:Relationship", NS)}
        result = {}
        for sheet in workbook.findall("m:sheets/m:sheet", NS):
            rel_id = sheet.attrib.get("{" + NS_REL + "}id")
            target = rel_map.get(rel_id, "")
            if target:
                path = "xl/" + target.lstrip("/") if not target.startswith("/") else target.lstrip("/")
                result[sheet.attrib.get("name", "")] = path
        return result

    def _read_sheet(self, archive: zipfile.ZipFile, path: str, shared: list[str]) -> dict[str, Any]:
        root = ET.fromstring(archive.read(path))
        cells = {}
        for cell in root.findall(".//m:c", NS):
            ref = cell.attrib.get("r", "")
            formula_node = cell.find("m:f", NS)
            value_node = cell.find("m:v", NS)
            inline = cell.find("m:is", NS)
            value = ""
            if inline is not None:
                value = "".join(inline.itertext())
            elif value_node is not None:
                value = value_node.text or ""
                if cell.attrib.get("t") == "s":
                    try:
                        value = shared[int(value)]
                    except (ValueError, IndexError):
                        pass
            cells[ref] = {
                "value": value,
                "formula": formula_node.text if formula_node is not None else "",
                "style": cell.attrib.get("s", "0"),
            }
        pane = root.find("m:sheetViews/m:sheetView/m:pane", NS)
        page_setup = root.find("m:pageSetup", NS)
        header_footer = root.find("m:headerFooter", NS)
        return {
            "cells": cells,
            "autoFilter": (root.find("m:autoFilter", NS).attrib if root.find("m:autoFilter", NS) is not None else {}),
            "sortState": root.find(".//m:sortState", NS) is not None,
            "conditional": root.find("m:conditionalFormatting", NS) is not None,
            "tableParts": root.find("m:tableParts", NS) is not None,
            "pane": pane.attrib if pane is not None else {},
            "pageSetup": page_setup.attrib if page_setup is not None else {},
            "headerFooter": "".join(header_footer.itertext()) if header_footer is not None else "",
            "printOptions": (root.find("m:printOptions", NS).attrib if root.find("m:printOptions", NS) is not None else {}),
            "sheetView": (root.find("m:sheetViews/m:sheetView", NS).attrib if root.find("m:sheetViews/m:sheetView", NS) is not None else {}),
            "raw": ET.tostring(root, encoding="unicode"),
        }

    @staticmethod
    def _styles(archive: zipfile.ZipFile, names: set[str]) -> dict[str, Any]:
        if "xl/styles.xml" not in names:
            return {"xfs": [], "numFmts": {}}
        root = ET.fromstring(archive.read("xl/styles.xml"))
        custom_formats = {}
        for node in root.findall("m:numFmts/m:numFmt", NS):
            try:
                custom_formats[int(node.attrib.get("numFmtId", "0"))] = node.attrib.get("formatCode", "")
            except ValueError:
                continue
        xfs = []
        for xf in root.findall("m:cellXfs/m:xf", NS):
            item = dict(xf.attrib)
            alignment = xf.find("m:alignment", NS)
            item["alignment"] = dict(alignment.attrib) if alignment is not None else {}
            xfs.append(item)
        return {"xfs": xfs, "numFmts": custom_formats}

    @staticmethod
    def _tables(archive: zipfile.ZipFile, names: set[str]) -> list[str]:
        values = []
        for name in names:
            if name.startswith("xl/tables/") and name.endswith(".xml"):
                root = ET.fromstring(archive.read(name))
                values.append(root.attrib.get("ref", ""))
        return values

    @staticmethod
    def _charts(archive: zipfile.ZipFile, names: set[str]) -> list[str]:
        values = []
        for name in names:
            if name.startswith("xl/charts/") and name.endswith(".xml"):
                values.append(archive.read(name).decode("utf-8", errors="replace"))
        return values

    def _grade_rule(self, rule: dict[str, Any], evidence: dict[str, Any], session_id: str) -> dict[str, Any]:
        kind, target, expected = rule["kind"], rule["target"], rule["expected"]
        passed, actual = self._evaluate(kind, target, expected, evidence)
        score = rule["weight"] if passed else 0
        return {
            "sessionId": session_id,
            "examCode": "MOS365-EXCEL-GENERAL",
            "scenarioId": None,
            "taskId": rule["taskId"],
            "skillIds": rule["skillIds"],
            "status": "pass" if passed else "fail",
            "score": score,
            "maxScore": rule["weight"],
            "expected": expected,
            "actual": actual,
            "evidence": f"{kind}: {target}",
            "explanationJa": rule["explanationJa"],
            "explanationZh": rule["explanationZh"],
            "remediationJa": rule["remediationJa"],
            "remediationZh": rule["remediationZh"],
        }

    @staticmethod
    def _style_for_target(target: str, evidence: dict[str, Any]) -> dict[str, Any]:
        if "!" not in target:
            return {}
        sheet_name, range_ref = target.split("!", 1)
        first_cell = range_ref.split(":", 1)[0]
        style_text = evidence.get("sheets", {}).get(sheet_name, {}).get("cells", {}).get(first_cell, {}).get("style", "0")
        try:
            style_index = int(style_text)
        except (TypeError, ValueError):
            return {}
        styles = evidence.get("styles", {}).get("xfs", [])
        return styles[style_index] if 0 <= style_index < len(styles) else {}

    def _evaluate(self, kind: str, target: str, expected: str, evidence: dict[str, Any]) -> tuple[bool, str]:
        sheets = evidence["sheets"]
        if kind in {"formula", "cell_value"}:
            sheet_name, cell_ref = target.split("!", 1)
            cell = sheets.get(sheet_name, {}).get("cells", {}).get(cell_ref, {})
            actual = cell.get("formula", "") if kind == "formula" else cell.get("value", "")
            normalizer = self._normal_formula if kind == "formula" else self._normal
            return normalizer(actual) == normalizer(expected), str(actual)
        if kind == "sheet_name":
            return expected in sheets, ", ".join(sheets.keys())
        if kind == "freeze_panes":
            pane = sheets.get(target, {}).get("pane", {})
            actual = pane.get("topLeftCell", "") or pane.get("ySplit", "")
            return bool(actual), str(actual)
        if kind == "number_format":
            style = self._style_for_target(target, evidence)
            format_id = style.get("numFmtId", "0")
            try:
                numeric_format_id = int(format_id)
            except ValueError:
                numeric_format_id = 0
            format_code = evidence.get("styles", {}).get("numFmts", {}).get(numeric_format_id, "")
            numeric_with_separator = numeric_format_id in {3, 4, 43, 44}
            actual = format_code or str(numeric_format_id)
            return expected in format_code or numeric_with_separator, actual
        if kind == "conditional_format":
            value = sheets.get(target, {}).get("conditional", False)
            return bool(value), str(value)
        if kind == "auto_filter":
            sheet_name = target
            actual = sheets.get(sheet_name, {}).get("autoFilter", {}).get("ref", "")
            return bool(actual), actual
        if kind == "table":
            actual = ", ".join(evidence.get("tables", []))
            return bool(evidence.get("tables")), actual
        if kind == "sort_state":
            actual = sheets.get(target, {}).get("sortState", False)
            return bool(actual), str(actual)
        if kind == "defined_name":
            actual = evidence.get("definedNames", {}).get(target, "")
            return self._normal(actual) == self._normal(expected), actual
        if kind == "print_area":
            actual = evidence.get("definedNames", {}).get("_xlnm.Print_Area", "")
            return expected.replace("$", "") in actual.replace("$", ""), actual
        if kind == "page_orientation":
            actual = sheets.get(target, {}).get("pageSetup", {}).get("orientation", "")
            return actual == expected, actual
        if kind == "header_footer":
            actual = sheets.get(target, {}).get("headerFooter", "")
            return expected in actual, actual
        if kind == "chart":
            actual = "\n".join(evidence.get("charts", []))
            return expected in actual, "chart XML found" if actual else ""
        if kind == "chart_title":
            actual = "\n".join(evidence.get("charts", []))
            return expected in actual, "chart title found" if expected in actual else ""
        if kind == "chart_legend":
            actual = "\n".join(evidence.get("charts", []))
            return expected in actual, "legend position found" if expected in actual else ""
        if kind == "chart_data_labels":
            actual = "\n".join(evidence.get("charts", []))
            return expected in actual, "data labels found" if expected in actual else ""
        if kind in {"cell_alignment", "cell_border", "cell_fill", "wrap_text"}:
            style = self._style_for_target(target, evidence)
            if kind == "cell_alignment":
                actual = style.get("alignment", {}).get("horizontal", "")
                return actual == "center", actual
            if kind == "cell_border":
                actual = style.get("borderId", "0")
                return actual not in {"", "0"}, actual
            if kind == "cell_fill":
                actual = style.get("fillId", "0")
                return actual not in {"", "0", "1"}, actual
            actual = style.get("alignment", {}).get("wrapText", "")
            return actual in {"1", "true", "True"}, actual
        if kind in {"row_height", "column_width", "page_margins", "sheet_view"}:
            sheet_name = target.split("!", 1)[0]
            raw = sheets.get(sheet_name, {}).get("raw", "")
            terms = {
                "row_height": ("ht=",), "column_width": ("width=",),
                "page_margins": ("pageMargins",), "sheet_view": ("showGridLines=\"0\"",),
            }[kind]
            passed = all(term in raw for term in terms)
            return passed, "sheet setting found" if passed else ""
        return False, "unsupported rule"

    @staticmethod
    def _normal_formula(value: Any) -> str:
        # Excel may omit syntactically optional single quotes around a sheet name
        # when serializing a formula to Open XML. Quotes do not change the reference.
        return MOS365Service._normal(value).replace("'", "")

    @staticmethod
    def _normal(value: Any) -> str:
        return re.sub(r"\s+", "", str(value or "")).upper().lstrip("=")
