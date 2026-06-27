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

# R8/R11 scoring specs — server-owned, never client-controlled
SCORING_SPECS: dict[str, dict[str, Any]] = {
    "R8_STATIC_SHEET_RENAME_DEMO": {
        "specVersion": 1,
        "taskId": "R8_STATIC_SHEET_RENAME_DEMO",
        "assertions": [{
            "id": "first-sheet-name",
            "type": "first_sheet_name_equals",
            "expected": "練習集計",
            "weight": 1,
            "comparison": "strict_equals",
            "feedback": {
                "correct": {"ja": "1枚目のシート名は「練習集計」です。", "zh": "第 1 个工作表名称正确。"},
                "incorrect": {"ja": "1枚目のシート名を「練習集計」にしてください。", "zh": "请将第 1 个工作表重命名为「練習集計」。"}
            }
        }],
        "resultPolicy": {"mode": "all_or_nothing"}
    },
    "R11_STATIC_WORKSHEET_EXISTS_DEMO": {
        "specVersion": 1,
        "taskId": "R11_STATIC_WORKSHEET_EXISTS_DEMO",
        "assertions": [{
            "id": "worksheet-exists",
            "type": "worksheet_exists",
            "expected": "集計結果",
            "weight": 1,
            "comparison": "strict_equals",
            "feedback": {
                "correct": {"ja": "「集計結果」というワークシートが作成されています。", "zh": "已创建名为「集計結果」的工作表。"},
                "incorrect": {"ja": "「集計結果」という名前のワークシートを作成してください。", "zh": "请创建名为「集計結果」的工作表。"}
            }
        }],
        "resultPolicy": {"mode": "all_or_nothing"}
    },
    "R12_STATIC_DUAL_SHEET_DEMO": {
        "specVersion": 1,
        "taskId": "R12_STATIC_DUAL_SHEET_DEMO",
        "assertions": [
            {
                "id": "first-sheet-name",
                "type": "first_sheet_name_equals",
                "expected": "練習集計",
                "weight": 1,
                "comparison": "strict_equals",
                "feedback": {
                    "correct": {"ja": "1枚目のシート名は「練習集計」です。", "zh": "第 1 个工作表名称正确。"},
                    "incorrect": {"ja": "1枚目のシート名を「練習集計」にしてください。", "zh": "请将第 1 个工作表重命名为「練習集計」。"}
                }
            },
            {
                "id": "worksheet-exists",
                "type": "worksheet_exists",
                "expected": "集計結果",
                "weight": 1,
                "comparison": "strict_equals",
                "feedback": {
                    "correct": {"ja": "「集計結果」というワークシートが作成されています。", "zh": "已创建名为「集計結果」的工作表。"},
                    "incorrect": {"ja": "「集計結果」という名前のワークシートを作成してください。", "zh": "请创建名为「集計結果」的工作表。"}
                }
            }
        ],
        "resultPolicy": {"mode": "weighted_sum", "total": 2, "allowPartialCredit": True}
    },
    "R15_STATIC_SHEET_HIDE_DEMO": {
        "specVersion": 1,
        "taskId": "R15_STATIC_SHEET_HIDE_DEMO",
        "assertions": [{
            "id": "worksheet-visibility",
            "type": "worksheet_visibility_equals",
            "targetName": "データベース",
            "expected": "hidden_or_very_hidden",
            "weight": 1,
            "feedback": {
                "correct": {"ja": "「データベース」シートは非表示になっています。", "zh": "「データベース」工作表已隐藏。"},
                "incorrect": {"ja": "「データベース」シートを非表示にしてください。", "zh": "请隐藏「データベース」工作表。"},
                "indeterminate": {"ja": "対象のシートを確認できませんでした。", "zh": "无法确认目标工作表。"}
            }
        }],
        "resultPolicy": {"mode": "all_or_nothing", "total": 1}
    },
    "R16_STATIC_CELL_VALUE_DEMO": {
        "specVersion": 1,
        "taskId": "R16_STATIC_CELL_VALUE_DEMO",
        "assertions": [{
            "id": "input-b2-value",
            "type": "cell_value_equals",
            "sheetName": "入力",
            "cellRef": "B2",
            "expected": "完了",
            "weight": 1,
            "comparison": "strict_text_equals",
            "feedback": {
                "correct": {"ja": "「入力」シートの B2 セルに「完了」が入力されています。", "zh": "「入力」工作表的 B2 单元格已输入“完了”。"},
                "incorrect": {"ja": "「入力」シートの B2 セルに「完了」と入力してください。", "zh": "请在「入力」工作表的 B2 单元格输入“完了”。"},
                "indeterminate": {"ja": "対象のセルを安全に確認できませんでした。", "zh": "无法安全确认目标单元格。"}
            }
        }],
        "resultPolicy": {"mode": "all_or_nothing", "total": 1}
    },
    "R17_STATIC_FORMULA_TEXT_DEMO": {
        "specVersion": 1,
        "taskId": "R17_STATIC_FORMULA_TEXT_DEMO",
        "assertions": [{
            "id": "calc-c2-formula",
            "type": "cell_formula_equals",
            "sheetName": "計算",
            "cellRef": "C2",
            "expectedFormula": "=SUM(A2:B2)",
            "weight": 1,
            "comparison": "strict_text_equals",
            "feedback": {
                "correct": {"ja": "「計算」シートの C2 セルに、A2 から B2 の合計を求める数式が入力されています。", "zh": "「計算」工作表的 C2 单元格已输入计算 A2 到 B2 总和的公式。"},
                "incorrect": {"ja": "「計算」シートの C2 セルに、A2 から B2 の合計を求める数式を入力してください。", "zh": "请在「計算」工作表的 C2 单元格中，输入计算 A2 到 B2 总和的公式。"},
                "indeterminate": {"ja": "対象のセルを安全に確認できませんでした。", "zh": "无法安全确认目标单元格。"}
            }
        }],
        "resultPolicy": {"mode": "all_or_nothing", "total": 1}
    }
}


MOS_CATALOG: dict[str, dict[str, Any]] = {
    "MOS_GP_001_ENTER_STATUS": {
        "id": "MOS_GP_001_ENTER_STATUS",
        "version": 1,
        "contentProvenance": "original_project_content_r32",
        "tier": "基礎",
        "domain": "セル値の入力",
        "titleJa": "ステータス入力",
        "titleZh": "状态输入",
        "instructionJa": "入力シートの B2 に「完了」と入力してください。",
        "instructionZh": "请在“输入”工作表的 B2 中输入“完了”。",
        "estimatedMinutes": 2,
        "assessment": {
            "type": "cell_value_equals",
            "sheetName": "入力",
            "cellRef": "B2",
            "expected": "完了",
            "feedback": {
                "correct": {"ja": "「入力」シートの B2 セルに「完了」が入力されています。", "zh": "「入力」工作表的 B2 单元格已输入“完了”。"},
                "incorrect": {"ja": "「入力」シートの B2 セルに「完了」と入力してください。", "zh": "请在「入力」工作表的 B2 单元格输入“完了”。"},
                "indeterminate": {"ja": "対象のセルを安全に確認できませんでした。", "zh": "无法安全确认目标单元格。"}
            }
        },
        "legacyAliases": ["R16_STATIC_CELL_VALUE_DEMO"]
    },
    "MOS_GP_002_SUM_TWO_VALUES": {
        "id": "MOS_GP_002_SUM_TWO_VALUES",
        "version": 1,
        "contentProvenance": "original_project_content_r32",
        "tier": "基礎",
        "domain": "SUM関数",
        "titleJa": "数値の合計計算",
        "titleZh": "计算两数之和",
        "instructionJa": "「計算」シートの C2 セルに、A2 から B2 の合計を求める数式を入力してください。",
        "instructionZh": "请在「計算」工作表的 C2 单元格中，输入计算 A2 到 B2 总和 Jun的公式。",
        "estimatedMinutes": 3,
        "assessment": {
            "type": "cell_formula_equals",
            "sheetName": "計算",
            "cellRef": "C2",
            "expectedFormula": "=SUM(A2:B2)",
            "feedback": {
                "correct": {"ja": "「計算」シートの C2 セルに、A2 から B2 の合計を求める数式が入力されています。", "zh": "「計算」工作表的 C2 单元格已输入计算 A2 到 B2 总和的公式。"},
                "incorrect": {"ja": "「計算」シートの C2 セルに、A2 から B2 の合計を求める数式を入力してください。", "zh": "请在「計算」工作表的 C2 单元格中，输入计算 A2 到 B2 总和的公式。"},
                "indeterminate": {"ja": "対象のセルを安全に確認できませんでした。", "zh": "无法安全确认目标单元格。"}
            }
        },
        "legacyAliases": ["R17_STATIC_FORMULA_TEXT_DEMO"]
    },
    "MOS_GP_003_SUM_WEEKLY_SALES": {
        "id": "MOS_GP_003_SUM_WEEKLY_SALES",
        "version": 1,
        "contentProvenance": "original_project_content_r32",
        "tier": "基礎",
        "domain": "SUM関数(連続範囲)",
        "titleJa": "週間売上集計",
        "titleZh": "每周销售汇总",
        "instructionJa": "売上シートの B7 セルに、月曜日から金曜日（B2:B6）までの売上合計を求める数式を入力してください。",
        "instructionZh": "请在“売上”工作表的 B7 单元格中，输入计算星期一至星期五（B2:B6）销售额总和的公式。",
        "estimatedMinutes": 3,
        "assessment": {
            "type": "cell_formula_equals",
            "sheetName": "売上",
            "cellRef": "B7",
            "expectedFormula": "=SUM(B2:B6)",
            "feedback": {
                "correct": {"ja": "売上シートの B7 セルに、月曜日から金曜日までの売上合計を求める数式が入力されています。", "zh": "“売上”工作表的 B7 单元格已输入计算星期一至星期五销售额总和的公式。"},
                "incorrect": {"ja": "売上シートの B7 セルに、SUM関数を使って月曜日から金曜日（B2:B6）までの売上合計を求める数式を入力してください。", "zh": "请在“売上”工作表的 B7 单元格中，使用 SUM 函数计算星期一至星期五（B2:B6）的销售额总和。"},
                "indeterminate": {"ja": "対象のセルを安全に確認できませんでした。", "zh": "无法安全确认目标单元格。"}
            }
        }
    },
    "MOS_GP_004_AVERAGE_SCORE": {
        "id": "MOS_GP_004_AVERAGE_SCORE",
        "version": 1,
        "contentProvenance": "original_project_content_r32",
        "tier": "基礎",
        "domain": "AVERAGE関数",
        "titleJa": "平均成績算出",
        "titleZh": "计算平均成绩",
        "instructionJa": "成績シートの B5 セルに、国語、数学、英語（B2:B4）の平均点を計算する数式を入力してください。",
        "instructionZh": "请在“成績”工作表的 B5 单元格中，输入计算国语、数学、英语（B2:B4）平均分的公式。",
        "estimatedMinutes": 3,
        "assessment": {
            "type": "cell_formula_equals",
            "sheetName": "成績",
            "cellRef": "B5",
            "expectedFormula": "=AVERAGE(B2:B4)",
            "feedback": {
                "correct": {"ja": "成績シートの B5 セルに、平均点を求める数式が入力されています。", "zh": "“成績”工作表的 B5 单元格已输入计算平均分的公式。"},
                "incorrect": {"ja": "成績シートの B5 セルに、AVERAGE関数を使って国語、数学、英語（B2:B4）の平均点を計算する数式を入力してください。", "zh": "请在“成績”工作表的 B5 单元格中，使用 AVERAGE 函数计算国语、数学、英语（B2:B4）的平均分。"},
                "indeterminate": {"ja": "対象のセルを安全に確認できませんでした。", "zh": "无法安全确认目标单元格。"}
            }
        }
    },
    "MOS_GP_005_IF_DELIVERY_STATUS": {
        "id": "MOS_GP_005_IF_DELIVERY_STATUS",
        "version": 1,
        "contentProvenance": "original_project_content_r32",
        "tier": "基礎",
        "domain": "IF関数",
        "titleJa": "配達状況チェック",
        "titleZh": "检查配送状态",
        "instructionJa": "配達シートの C2 セルに、B2セルの値が「完了」の場合は「✓」を表示し、それ以外の場合は「✗」を表示する数式を入力してください。",
        "instructionZh": "请在“配達”工作表的 C2 单元格中，输入一个公式，当 B2 单元格的值为“完了”时显示“✓”，否则显示“✗”。",
        "estimatedMinutes": 4,
        "assessment": {
            "type": "cell_formula_equals",
            "sheetName": "配達",
            "cellRef": "C2",
            "expectedFormula": '=IF(B2="完了","✓","✗")',
            "feedback": {
                "correct": {"ja": "配達シートの C2 セルに、正しい判定を行うIF数式が入力されています。", "zh": "“配達”工作表的 C2 单元格已输入正确的 IF 判定公式。"},
                "incorrect": {"ja": "配達シートの C2 セルに、IF関数を使ってB2の値が「完了」の場合は「✓」、それ以外は「✗」を表示する数式を入力してください。", "zh": "请在“配達”工作表的 C2 单元格中，使用 IF 函数实现当 B2 的值为“完了”时显示“✓”，否则显示“✗”。"},
                "indeterminate": {"ja": "対象のセルを安全に確認できませんでした。", "zh": "无法安全确认目标单元格。"}
            }
        }
    },
    "MOS_GP_006_COUNTA_BOOKS": {
        "id": "MOS_GP_006_COUNTA_BOOKS",
        "version": 1,
        "contentProvenance": "original_project_content_r32",
        "tier": "基礎",
        "domain": "COUNTA関数",
        "titleJa": "書籍データ数カウント",
        "titleZh": "统计已登记书籍数",
        "instructionJa": "新着シートの B1 セルに、A2からA11までの範囲で書籍名が入力されているセル数を求める数式を入力してください。",
        "instructionZh": "请在“新着”工作表的 B1 单元格中，输入计算 A2 到 A11 范围内输入了书名的单元格数量的公式。",
        "estimatedMinutes": 3,
        "assessment": {
            "type": "cell_formula_equals",
            "sheetName": "新着",
            "cellRef": "B1",
            "expectedFormula": "=COUNTA(A2:A11)",
            "feedback": {
                "correct": {"ja": "新着シートの B1 セルに、データの件数をカウントするCOUNTA数式が入力されています。", "zh": "“新着”工作表的 B1 单元格已输入计算数据件数的 COUNTA 公式。"},
                "incorrect": {"ja": "新着シートの B1 セルに、COUNTA関数を使ってA2からA11までの範囲のデータ件数を求める数式を入力してください。", "zh": "请在“新着”工作表的 B1 单元格中，使用 COUNTA 函数计算 A2 到 A11 范围内的已输入数据的单元格数量。"},
                "indeterminate": {"ja": "対象のセルを安全に確認できませんでした。", "zh": "无法安全确认目标单元格。"}
            }
        }
    },
    "MOS_GP_007_MAX_VISITORS": {
        "id": "MOS_GP_007_MAX_VISITORS",
        "version": 1,
        "contentProvenance": "original_project_content_r32",
        "tier": "基礎",
        "domain": "MAX関数",
        "titleJa": "最大来客数算出",
        "titleZh": "计算最高来客数",
        "instructionJa": "来客シートの B9 セルに、月曜日から日曜日（B2:B8）までの期間での最高来客数を求める数式を入力してください。",
        "instructionZh": "请在“来客”工作表的 B9 单元格中，输入计算星期一至星期日（B2:B8）期间最高来客数的公式。",
        "estimatedMinutes": 3,
        "assessment": {
            "type": "cell_formula_equals",
            "sheetName": "来客",
            "cellRef": "B9",
            "expectedFormula": "=MAX(B2:B8)",
            "feedback": {
                "correct": {"ja": "来客シートの B9 セルに、最大値を求めるMAX数式が入力されています。", "zh": "“来客”工作表的 B9 单元格已输入计算最大值的 MAX 公式。"},
                "incorrect": {"ja": "来客シートの B9 セルに、MAX関数を使ってB2からB8の範囲での最大値を計算する数式を入力してください。", "zh": "请在“来客”工作表的 B9 单元格中，使用 MAX 函数计算 B2 到 B8 范围内的最大值。"},
                "indeterminate": {"ja": "対象のセルを安全に確認できませんでした。", "zh": "无法安全确认目标单元格。"}
            }
        }
    },
    "MOS_GP_008_MIN_VISITORS": {
        "id": "MOS_GP_008_MIN_VISITORS",
        "version": 1,
        "contentProvenance": "original_project_content_r32",
        "tier": "基礎",
        "domain": "MIN関数",
        "titleJa": "最低来客数算出",
        "titleZh": "计算最低来客数",
        "instructionJa": "来客シートの B10 セルに、月曜日から日曜日（B2:B8）までの期間での最低来客数を求める数式を入力してください。",
        "instructionZh": "请在“来客”工作表的 B10 单元格中，输入计算星期一至星期日（B2:B8）期间最低来客数的公式。",
        "estimatedMinutes": 3,
        "assessment": {
            "type": "cell_formula_equals",
            "sheetName": "来客",
            "cellRef": "B10",
            "expectedFormula": "=MIN(B2:B8)",
            "feedback": {
                "correct": {"ja": "来客シートの B10 セルに、最小値を求めるMIN数式が入力されています。", "zh": "“来客”工作表的 B10 单元格已输入计算最小值的 MIN 公式。"},
                "incorrect": {"ja": "来客シートの B10 セルに、MIN関数を使ってB2からB8の範囲での最小値を計算する数式を入力してください。", "zh": "请在“来客”工作表的 B10 单元格中，使用 MIN 函数计算 B2 到 B8 范围内的最小值。"},
                "indeterminate": {"ja": "対象のセルを安全に確認できませんでした。", "zh": "无法安全确认目标单元格。"}
            }
        }
    },
    "MOS_GP_009_LEFT_DEPARTMENT_CODE": {
        "id": "MOS_GP_009_LEFT_DEPARTMENT_CODE",
        "version": 1,
        "contentProvenance": "original_project_content_r32",
        "tier": "基礎",
        "domain": "LEFT関数",
        "titleJa": "部門コード抽出",
        "titleZh": "提取部门代码",
        "instructionJa": "社員シートの B2 セルに、社員コード（A2）の左側から2文字の部門コードを取り出す数式を入力してください。",
        "instructionZh": "请在“社員”工作表的 B2 单元格中，输入一个公式，提取员工代码（A2）左侧的 2 位部门代码。",
        "estimatedMinutes": 3,
        "assessment": {
            "type": "cell_formula_equals",
            "sheetName": "社員",
            "cellRef": "B2",
            "expectedFormula": "=LEFT(A2,2)",
            "feedback": {
                "correct": {"ja": "社員シートの B2 セルに、左側の文字列を取り出すLEFT数式が入力されています。", "zh": "“社員”工作表的 B2 单元格已输入提取左侧字符的 LEFT 公式。"},
                "incorrect": {"ja": "社員シートの B2 セルに、LEFT関数を使ってA2の左側から2文字を抽出する数式を入力してください。", "zh": "请在“社員”工作表的 B2 单元格中，使用 LEFT 函数提取 A2 左侧的 2 位字符。"},
                "indeterminate": {"ja": "対象のセルを安全に確認できませんでした。", "zh": "无法安全确认目标单元格。"}
            }
        }
    },
    "MOS_GP_010_TEXTJOIN_PRODUCT_TAG": {
        "id": "MOS_GP_010_TEXTJOIN_PRODUCT_TAG",
        "version": 1,
        "contentProvenance": "original_project_content_r32",
        "tier": "基礎",
        "domain": "TEXTJOIN関数",
        "titleJa": "商品タグ生成",
        "titleZh": "生成商品标签",
        "instructionJa": "商品シートの D2 セルに、TEXTJOIN関数を使って、区切り文字に「/」を指定し、空のセルは無視して、A2からC2までのテキストを結合する数式を入力してください。",
        "instructionZh": "请在“商品”工作表的 D2 单元格中，使用 TEXTJOIN 函数输入公式，指定分隔符为“/”，忽略空单元格，结合 A2 到 C2 的文本内容。",
        "estimatedMinutes": 4,
        "assessment": {
            "type": "cell_formula_equals",
            "sheetName": "商品",
            "cellRef": "D2",
            "expectedFormula": '=TEXTJOIN("/",TRUE,A2:C2)',
            "feedback": {
                "correct": {"ja": "商品シートの D2 セルに、TEXTJOIN数式が正しく入力されています。", "zh": "“商品”工作表的 D2 单元格已正确输入 TEXTJOIN 公式。"},
                "incorrect": {"ja": "商品シートの D2 セルに、TEXTJOIN関数を使って「/」を区切り文字とし、空セルは無視してA2:C2を結合する数式を入力してください。", "zh": "请在“商品”工作表的 D2 单元格中，使用 TEXTJOIN 函数，指定“/”为分隔符并忽略空单元格，将 A2:C2 结合。"},
                "indeterminate": {"ja": "対象のセルを安全に確認できませんでした。", "zh": "无法安全确认目标单元格。"}
            }
        }
    }
}


_LAUNCH_STATE: dict = None
_LAUNCH_LOCK = None


def _foreground_excel_async(pid: int, session_id: str) -> None:
    """Bring the just-launched Excel window to foreground and maximize it.

    Runs in a background thread — never blocks the launch HTTP response.
    Only touches the Excel process started by THIS session.
    """
    import ctypes
    import threading
    import time

    SW_RESTORE = 9
    SW_MAXIMIZE = 3

    def _bring_to_front():
        try:
            user32 = ctypes.windll.user32
            kernel32 = ctypes.windll.kernel32

            # Wait up to 8 seconds for Excel main window to appear
            for _ in range(80):
                hwnd = _find_main_window_for_pid(kernel32, user32, pid)
                if hwnd:
                    # Restore if minimized, then maximize
                    user32.ShowWindow(hwnd, SW_RESTORE)
                    time.sleep(0.1)
                    user32.ShowWindow(hwnd, SW_MAXIMIZE)
                    user32.SetForegroundWindow(hwnd)
                    return True
                time.sleep(0.1)
            return False
        except Exception:
            return False

    def _find_main_window_for_pid(kernel32, user32, target_pid):
        """Find the top-level visible window belonging to the target PID."""
        result = []

        def enum_callback(hwnd, lparam):
            process_id = ctypes.c_ulong()
            user32.GetWindowThreadProcessId(hwnd, ctypes.byref(process_id))
            if process_id.value == target_pid:
                if user32.IsWindowVisible(hwnd):
                    # Prefer the window with a title (main window)
                    length = user32.GetWindowTextLengthW(hwnd)
                    if length > 0:
                        result.append(hwnd)
            return True

        WNDENUMPROC = ctypes.WINFUNCTYPE(ctypes.c_bool, ctypes.c_void_p, ctypes.c_void_p)
        user32.EnumWindows(WNDENUMPROC(enum_callback), 0)
        return result[0] if result else None

    threading.Thread(target=_bring_to_front, daemon=True, name=f"fg-excel-{pid}").start()

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
        global _LAUNCH_STATE, _LAUNCH_LOCK
        if _LAUNCH_LOCK is None:
            import threading
            _LAUNCH_LOCK = threading.Lock()
            _LAUNCH_STATE = None
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
    def _now_iso() -> str:
        return __import__("datetime").datetime.now().astimezone().isoformat()

    def _mark_launch_phase(self, session_id: str, phase: str, state: str | None = None, pid: int | None = None) -> None:
        global _LAUNCH_STATE
        now = self._now_iso()
        with _LAUNCH_LOCK:
            if not _LAUNCH_STATE or _LAUNCH_STATE.get("session_id") != session_id:
                return
            phases = _LAUNCH_STATE.setdefault("phases", {})
            phases[phase] = now
            _LAUNCH_STATE["updated_at"] = now
            if state is not None:
                _LAUNCH_STATE["state"] = state
            if pid is not None:
                _LAUNCH_STATE["pid"] = pid

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
        global _LAUNCH_STATE
        with _LAUNCH_LOCK:
            if _LAUNCH_STATE and _LAUNCH_STATE.get("state") in ("creating","launching","awaiting_attach","ready"):
                existing_id = _LAUNCH_STATE["session_id"]
                try:
                    paths = self._paths(existing_id)
                    import json as _j
                    manifest = _j.loads(paths.manifest.read_text(encoding="utf-8"))
                    return {"sessionId": existing_id, "mode": manifest.get("mode","guided"),
                        "scenarioId": manifest.get("scenarioId","r16_static"), "variant": manifest.get("variant",1),
                        "fileName": paths.workbook.name, "sandboxRoot": str(paths.directory),
                        "staticTask": manifest.get("staticTask"), "tasks": [], "environment": self.environment_status(),
                        "launchState": _LAUNCH_STATE.get("state"), "launchPhases": dict(_LAUNCH_STATE.get("phases", {})), "idempotent": True}
                except Exception:
                    pass
        mode = str(payload.get("mode", "guided"))
        task_id = payload.get("taskId")

        # Alias mapping and legacy compatibility (only resolve if explicit taskId or MOS_GP mode)
        if not task_id and mode.endswith("_static_training"):
            potential_tid = mode[:-16]
            if potential_tid in MOS_CATALOG:
                task_id = potential_tid

        if task_id in MOS_CATALOG:
            task_info = MOS_CATALOG[task_id]
            session_id = secrets.token_urlsafe(24).replace("-", "_")
            now = self._now_iso()
            with _LAUNCH_LOCK:
                _LAUNCH_STATE = {"session_id": session_id, "state": "creating", "created_at": now, "updated_at": now,
                                 "phases": {"click_received": now, "session_created": now}}
            paths = self._paths(session_id, require_exists=False)
            paths.directory.mkdir(mode=0o700, parents=False, exist_ok=False)

            task_data = {
                "taskId": task_info["id"],
                "instructionJa": task_info["instructionJa"],
                "instructionZh": task_info["instructionZh"]
            }
            manifest = {
                "schemaVersion": 1,
                "sessionId": session_id,
                "mode": f"{task_id}_static_training",
                "trainingMode": f"{task_id}_static_training",
                "staticTask": task_data,
                "completion": {"acknowledged": False, "acknowledgedAt": None, "acknowledgedPid": None},
                "workbook": paths.workbook.name,
                "createdAt": self._now_iso()
            }
            self._write_gp_workbook(paths.workbook, task_id)
            paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
            self._mark_launch_phase(session_id, "workbook_ready")
            return {
                "sessionId": session_id,
                "mode": f"{task_id}_static_training",
                "scenarioId": "mos_gp_static",
                "variant": 1,
                "fileName": paths.workbook.name,
                "sandboxRoot": str(paths.directory),
                "staticTask": task_data,
                "tasks": [],
                "environment": self.environment_status()
            }

        # R8 static training: fixed task, no scoring, server-owned
        if mode == "r8_static_training":
            return self._create_r8_session()
        if mode == "r11_static_training":
            return self._create_r11_session()
        if mode == "r12_static_training":
            return self._create_r12_session()
        if mode == "r15_static_training":
            return self._create_r15_session()
        if mode == "r16_static_training":
            return self._create_r16_session()
        if mode == "r17_static_training":
            return self._create_r17_session()

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
        with _LAUNCH_LOCK:
            if _LAUNCH_STATE and _LAUNCH_STATE["session_id"] == session_id:
                _LAUNCH_STATE["state"] = "awaiting_attach"
                _LAUNCH_STATE["pid"] = process.pid
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
        global _LAUNCH_STATE
        existing_pid = None
        existing_state = None
        with _LAUNCH_LOCK:
            if _LAUNCH_STATE and _LAUNCH_STATE["session_id"] == session_id:
                existing_pid = _LAUNCH_STATE.get("pid")
                existing_state = _LAUNCH_STATE.get("state")
                if existing_pid and existing_state in ("launching", "awaiting_attach", "ready"):
                    return {
                        "launched": True,
                        "fileName": self._paths(session_id).workbook.name,
                        "sessionId": session_id,
                        "processId": existing_pid,
                        "launchState": existing_state,
                        "idempotent": True,
                    }
                _LAUNCH_STATE["state"] = "launching"
                _LAUNCH_STATE.setdefault("phases", {})["excel_launch_requested"] = self._now_iso()
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
        self._mark_launch_phase(session_id, "excel_process_started", state="awaiting_attach", pid=process.pid)

        # P0-B: Bring Excel to foreground and maximize (async, never blocks launch response)
        _foreground_excel_async(process.pid, session_id)
        # Update manifest with launch state
        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        manifest["excelPid"] = process.pid
        manifest["launchedAt"] = self._now_iso()
        manifest["state"] = "launched"
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
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

    def session_verify(self, payload: dict[str, Any]) -> dict[str, Any]:
        """Verify a VSTO client bind request against a known session manifest."""
        raw_path = str(payload.get("workbookPath", ""))
        raw_pid = payload.get("excelPid")
        try:
            raw_pid = int(raw_pid) if raw_pid is not None else None
        except (TypeError, ValueError):
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "プロセス ID が無効です。", "进程 ID 无效。")
        if raw_pid is None:
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "プロセス ID が必要です。", "需要提供进程 ID。")
        # Normalize and validate path
        try:
            wb_path = Path(raw_path).resolve()
        except OSError:
            raise MOS365ServiceError("SESSION_PATH_REJECTED", "ワークブックのパスが無効です。", "工作簿路径无效。")
        if not self._within(wb_path, self.root):
            raise MOS365ServiceError("SESSION_PATH_REJECTED", "このワークブックはセッション外です。", "此工作簿不位于会话目录内。")
        # Find matching session by workbook path
        matched_session = None
        for child in self.root.iterdir():
            if not child.is_dir():
                continue
            mf = child / "session_manifest.json"
            if not mf.is_file():
                continue
            try:
                mf_data = json.loads(mf.read_text(encoding="utf-8"))
            except (OSError, json.JSONDecodeError):
                continue
            expected = (child / mf_data.get("workbook", "")).resolve()
            try:
                if wb_path == expected:
                    matched_session = (child, mf_data)
                    break
            except OSError:
                continue
        if matched_session is None:
            raise MOS365ServiceError("SESSION_NOT_FOUND", "このワークブックに一致するセッションが見つかりません。", "未找到与此工作簿匹配的会话。", 404)
        session_dir, manifest = matched_session
        session_id = manifest.get("sessionId", "")
        state = manifest.get("state", "created")

        # Bridge revision check — reject old/unpatched VSTO builds
        EXPECTED_REVISION = "R30_RUNTIME_PROOF_1"
        received_revision = str(payload.get("bridgeRevision", ""))
        if received_revision != EXPECTED_REVISION:
            raise MOS365ServiceError(
                "BRIDGE_REVISION_MISMATCH",
                "トレーニングパネルが古いバージョンです。Excel を完全に閉じてからもう一度お試しください。",
                "训练面板版本过旧。请完全关闭 Excel 后重新尝试。",
            )
        # PID check
        server_pid = manifest.get("excelPid")
        if server_pid is not None and server_pid != raw_pid:
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "セッションのプロセス ID が一致しません。", "会话进程 ID 不匹配。")
        # State check
        if state not in ("launched", "attached"):
            raise MOS365ServiceError("SESSION_STATE_REJECTED", f"セッション状態が '{state}' のため検証できません。", f"会话状态为 '{state}'，无法验证。")
        # Update state to attached (idempotent)
        if state == "launched":
            manifest["state"] = "attached"
            manifest["attachedAt"] = self._now_iso()
            manifest["attachedPid"] = raw_pid
            mf_path = session_dir / "session_manifest.json"
            mf_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        result = {"ok": True, "session": {"sessionId": session_id, "state": "attached", "excelPid": raw_pid, "createdAt": manifest.get("createdAt", "")}}
        # For R8 sessions, include training task
        STATIC_MODES = {"r8_static_training", "r11_static_training", "r12_static_training", "r15_static_training", "r16_static_training", "r17_static_training"}
        training_mode = manifest.get("trainingMode", "")
        is_static = training_mode in STATIC_MODES or (isinstance(training_mode, str) and training_mode.endswith("_static_training"))
        if is_static:
            task = manifest.get("staticTask", {})
            comp = manifest.get("completion", {})
            result["session"]["training"] = {
                "mode": training_mode,
                "taskId": task.get("taskId", ""),
                "instructionJa": task.get("instructionJa", ""),
                "instructionZh": task.get("instructionZh", ""),
                "completionAcknowledged": comp.get("acknowledged", False)
            }
        self._mark_launch_phase(session_id, "excel_window_visible", state="ready", pid=raw_pid)
        self._mark_launch_phase(session_id, "vsto_attached", state="ready", pid=raw_pid)
        if is_static:
            self._mark_launch_phase(session_id, "task_rendered", state="ready", pid=raw_pid)
        return result

    def _create_r8_session(self) -> dict[str, Any]:
        """Create a server-owned R8 static training session — no scoring, no quiz."""
        session_id = secrets.token_urlsafe(24).replace("-", "_")
        paths = self._paths(session_id, require_exists=False)
        paths.directory.mkdir(mode=0o700, parents=False, exist_ok=False)
        task_data = {
            "taskId": "R8_STATIC_SHEET_RENAME_DEMO",
            "instructionJa": "練習用：1枚目のシート名を「練習集計」に変更してください。",
            "instructionZh": "练习用：请将第1个工作表重命名为「練習集計」。"
        }
        manifest = {
            "schemaVersion": 1,
            "sessionId": session_id,
            "mode": "r8_static_training",
            "trainingMode": "r8_static_training",
            "staticTask": task_data,
            "completion": {"acknowledged": False, "acknowledgedAt": None, "acknowledgedPid": None},
            "workbook": paths.workbook.name,
            "createdAt": __import__("datetime").datetime.now().astimezone().isoformat(),
        }
        self._write_original_workbook(paths.workbook, "retail", 1)
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        return {
            "sessionId": session_id,
            "mode": "r8_static_training",
            "scenarioId": "r8_static",
            "variant": 1,
            "fileName": paths.workbook.name,
            "sandboxRoot": str(paths.directory),
            "staticTask": task_data,
            "tasks": [],
            "environment": self.environment_status(),
        }

    def session_complete(self, payload: dict[str, Any]) -> dict[str, Any]:
        """Record a completion acknowledgement — no scoring."""
        session_id = self._safe_session_id(str(payload.get("sessionId", "")))
        raw_pid = payload.get("excelPid")
        try:
            raw_pid = int(raw_pid) if raw_pid is not None else None
        except (TypeError, ValueError):
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "プロセス ID が無効です。", "进程 ID 无效。")
        if raw_pid is None:
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "プロセス ID が必要です。", "需要提供进程 ID。")
        paths = self._paths(session_id)
        if not paths.manifest.is_file():
            raise MOS365ServiceError("SESSION_NOT_FOUND", "セッションが見つかりません。", "未找到会话。", 404)
        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        mode = manifest.get("trainingMode", manifest.get("mode", ""))
        STATIC_MODES = {"r8_static_training", "r11_static_training", "r12_static_training", "r15_static_training", "r16_static_training", "r17_static_training"}
        if mode not in STATIC_MODES and not (isinstance(mode, str) and mode.endswith("_static_training")):
            raise MOS365ServiceError("SESSION_MODE_REJECTED", "練習セッションではありません。", "不是练习会话。")
        state = manifest.get("state", "created")
        if state != "attached":
            raise MOS365ServiceError("SESSION_STATE_REJECTED", "セッションが接続されていません。", "会话未连接。")
        server_pid = manifest.get("excelPid")
        if server_pid is not None and server_pid != raw_pid:
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "セッションのプロセス ID が一致しません。", "会话进程 ID 不匹配。")
        attached_pid = manifest.get("attachedPid")
        if attached_pid is not None and attached_pid != raw_pid:
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "バインドされたプロセス ID が一致しません。", "绑定进程 ID 不匹配。")

        comp = manifest.get("completion", {})
        if comp.get("acknowledged"):
            return {"ok": True, "session": {"sessionId": session_id, "state": "attached", "completionAcknowledged": True, "completionAcknowledgedAt": comp.get("acknowledgedAt")},
                    "message": {"ja": "既に完了が記録されています。", "zh": "已完成记录，无需重复操作。"}}
        now = self._now_iso()
        comp["acknowledged"] = True
        comp["acknowledgedAt"] = now
        comp["acknowledgedPid"] = raw_pid
        manifest["completion"] = comp
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        return {"ok": True, "session": {"sessionId": session_id, "state": "attached", "completionAcknowledged": True, "completionAcknowledgedAt": now},
                "message": {"ja": "完了を記録しました。採点はまだ行われません。", "zh": "已记录完成确认，当前不会评分。"}}

    def session_score(self, payload: dict[str, Any]) -> dict[str, Any]:
        """Score the first sheet name for R8 static training sessions."""
        session_id = self._safe_session_id(str(payload.get("sessionId", "")))
        raw_pid = payload.get("excelPid")
        try:
            raw_pid = int(raw_pid) if raw_pid is not None else None
        except (TypeError, ValueError):
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "プロセス ID が無効です。", "进程 ID 无效。")
        paths = self._paths(session_id)
        if not paths.manifest.is_file():
            raise MOS365ServiceError("SESSION_NOT_FOUND", "セッションが見つかりません。", "未找到会话。", 404)
        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        mode = manifest.get("trainingMode", manifest.get("mode", ""))
        STATIC_MODES = {"r8_static_training", "r11_static_training", "r12_static_training", "r15_static_training", "r16_static_training", "r17_static_training"}
        if mode not in STATIC_MODES and not (isinstance(mode, str) and mode.endswith("_static_training")):
            raise MOS365ServiceError("SESSION_MODE_REJECTED", "練習セッションではありません。", "不是练习会话。")
        state = manifest.get("state", "created")
        if state != "attached":
            raise MOS365ServiceError("SESSION_STATE_REJECTED", "セッションが接続されていません。", "会话未连接。")
        server_pid = manifest.get("excelPid")
        if server_pid is not None and server_pid != raw_pid:
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "セッションのプロセス ID が一致しません。", "会话进程 ID 不匹配。")
        comp = manifest.get("completion", {})
        if not comp.get("acknowledged"):
            raise MOS365ServiceError("SESSION_COMPLETION_REQUIRED", "先に完了を記録してください。", "请先记录完成确认。")

        if not paths.workbook.is_file():
            raise MOS365ServiceError("WORKBOOK_MISSING", "練習ファイルが見つかりません。", "未找到练习文件。", 404)

        # Read workbook.xml once
        try:
            with zipfile.ZipFile(str(paths.workbook), 'r') as zf:
                wb_xml = zf.read('xl/workbook.xml').decode('utf-8')
            root = ET.fromstring(wb_xml)
        except (zipfile.BadZipFile, KeyError, ET.ParseError, OSError) as exc:
            raise MOS365ServiceError("WORKBOOK_PARSE_FAILED", "練習ファイルを読み取れませんでした。", "无法读取练习文件。") from exc

        # Score using spec
        task_id = manifest.get("staticTask", {}).get("taskId", "")
        spec = SCORING_SPECS.get(task_id)
        if not spec and task_id in MOS_CATALOG:
            task_info = MOS_CATALOG[task_id]
            spec = {
                "specVersion": task_info["version"],
                "taskId": task_info["id"],
                "assertions": [
                    {
                        "id": task_info["id"] + "-assertion",
                        "type": task_info["assessment"]["type"],
                        "sheetName": task_info["assessment"]["sheetName"],
                        "cellRef": task_info["assessment"].get("cellRef"),
                        "expected": task_info["assessment"].get("expected"),
                        "expectedFormula": task_info["assessment"].get("expectedFormula"),
                        "weight": 1,
                        "comparison": "strict_text_equals",
                        "feedback": task_info["assessment"]["feedback"]
                    }
                ],
                "resultPolicy": {"mode": "all_or_nothing"}
            }
        if not spec:
            raise MOS365ServiceError("SCORING_SPEC_NOT_FOUND", "このタスクの採点ルールが見つかりません。", "未找到此任务的评分规则。")

        assertion_results = []
        for assertion in spec["assertions"]:
            atype = assertion["type"]
            if atype == "first_sheet_name_equals":
                r = self._assert_first_sheet_name(root, assertion, NS)
            elif atype == "worksheet_exists":
                r = self._assert_worksheet_exists(root, assertion, NS)
            elif atype == "worksheet_visibility_equals":
                r = self._assert_worksheet_visibility(root, assertion, NS)
            elif atype == "cell_value_equals":
                r = self._assert_cell_value_equals(str(paths.workbook), assertion, NS)
            elif atype == "cell_formula_equals":
                r = self._assert_cell_formula_equals(str(paths.workbook), assertion, NS)
            else:
                raise MOS365ServiceError("SCORING_ASSERTION_UNSUPPORTED", f"未対応のアサーション: {atype}", f"不支持的断言类型: {atype}")
            assertion_results.append(r)

        total = sum(a["total"] for a in assertion_results)
        earned = sum(a["earned"] for a in assertion_results)
        all_correct = all(a["result"] == "correct" for a in assertion_results)
        any_correct = any(a["result"] == "correct" for a in assertion_results)

        if all_correct:
            overall = "correct"
        elif any_correct:
            overall = "partial"
        else:
            overall = "incorrect"

        assessment = {
            "specVersion": spec["specVersion"],
            "attemptedAt": __import__("datetime").datetime.now().astimezone().isoformat(),
            "excelPid": raw_pid,
            "result": overall,
            "earned": earned,
            "total": total,
            "assertions": assertion_results
        }
        manifest["assessment"] = assessment
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

        # Build bilingual feedback: result header + per-assertion details
        header_map = {"correct": ("結果：正解", "结果：正确"), "partial": ("結果：一部完了", "结果：部分完成"), "incorrect": ("結果：未完了", "结果：未完成")}
        hja, hzh = header_map[overall]
        lines_ja = [f"{hja}（{earned} / {total}）"]
        lines_zh = [f"{hzh}（{earned} / {total}）"]
        for a in assertion_results:
            fb = None
            for sa in spec["assertions"]:
                if sa["id"] == a["id"]:
                    fb = sa.get("feedback", {}); break
            if fb:
                key = "correct" if a["result"] == "correct" else "incorrect"
                lines_ja.append(fb.get(key, {}).get("ja", ""))
                lines_zh.append(fb.get(key, {}).get("zh", ""))
        result_ja = "\n".join(lines_ja)
        result_zh = "\n".join(lines_zh)
        return {"ok": True, "assessment": assessment,
                "resultJa": result_ja, "resultZh": result_zh}

    @staticmethod
    def _assert_first_sheet_name(root, assertion, ns):
        first_sheet = root.find('.//m:sheets/m:sheet', ns)
        if first_sheet is None:
            return {"id": assertion["id"], "type": assertion["type"], "result": "incorrect", "earned": 0, "total": assertion["weight"]}
        correct = first_sheet.get('name', '') == assertion["expected"]
        return {"id": assertion["id"], "type": assertion["type"], "result": "correct" if correct else "incorrect", "earned": assertion["weight"] if correct else 0, "total": assertion["weight"]}

    @staticmethod
    def _assert_worksheet_visibility(root, assertion, ns):
        target = assertion.get("targetName", "")
        sheets = root.findall('.//m:sheets/m:sheet', ns)
        for sheet in sheets:
            if sheet.get('name', '') == target:
                state = sheet.get('state', 'visible')
                if state in ('hidden', 'veryHidden'):
                    return {"id": assertion["id"], "type": assertion["type"], "result": "correct", "earned": assertion["weight"], "total": assertion["weight"]}
                elif state in ('visible', ''):
                    return {"id": assertion["id"], "type": assertion["type"], "result": "incorrect", "earned": 0, "total": assertion["weight"]}
                else:
                    return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
        return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}

    @staticmethod
    def _assert_cell_value_equals(workbook_path: str, assertion, ns):
        """Score cell_value_equals — read cell from worksheet, reject formulas/unsupported types."""
        target_sheet = assertion.get("sheetName", "")
        target_ref = assertion.get("cellRef", "")
        expected = assertion.get("expected", "")
        try:
            with zipfile.ZipFile(workbook_path, "r") as archive:
                names = set(archive.namelist())
                # Find sheet path from workbook.xml + rels
                wb_root = ET.fromstring(archive.read("xl/workbook.xml"))
                rels_root = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
                sheet_rel_id = None
                for sheet in wb_root.findall('.//m:sheets/m:sheet', ns):
                    if sheet.get('name', '') == target_sheet:
                        sheet_rel_id = sheet.attrib.get('{' + ns['r'] + '}id', sheet.attrib.get('r:id', ''))
                        break
                if not sheet_rel_id:
                    return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                target = ""
                for rel in rels_root.findall('pr:Relationship', ns):
                    if rel.attrib.get('Id', '') == sheet_rel_id:
                        target = rel.attrib.get('Target', '')
                        break
                if not target:
                    return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                normalized = target.lstrip('/')
                if not normalized.startswith('xl/'):
                    normalized = 'xl/' + normalized
                if not normalized.startswith('xl/worksheets/'):
                    return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                if normalized not in names:
                    return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                sheet_root = ET.fromstring(archive.read(normalized))
                for cell in sheet_root.findall('.//m:c', ns):
                    if cell.attrib.get('r', '') != target_ref:
                        continue
                    # Reject formula cells
                    if cell.find('m:f', ns) is not None:
                        return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                    cell_type = cell.attrib.get('t', '')
                    # Shared string
                    if cell_type == 's':
                        try: idx = int((cell.find('m:v', ns).text or '0')) if cell.find('m:v', ns) is not None else 0
                        except: return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                        shared = []
                        if 'xl/sharedStrings.xml' in names:
                            ss_root = ET.fromstring(archive.read('xl/sharedStrings.xml'))
                            shared = ["".join(si.itertext()) for si in ss_root.findall('m:si', ns)]
                        if idx < 0 or idx >= len(shared):
                            return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                        val = shared[idx]
                    # Inline string
                    elif cell_type == 'inlineStr':
                        is_node = cell.find('m:is', ns)
                        if is_node is None: return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                        val = "".join(is_node.itertext())
                    # Plain text (t=str or no t)
                    else:
                        v_node = cell.find('m:v', ns)
                        val = v_node.text if v_node is not None else ""
                    correct = (val == expected)
                    return {"id": assertion["id"], "type": assertion["type"], "result": "correct" if correct else "incorrect", "earned": assertion["weight"] if correct else 0, "total": assertion["weight"]}
                # Cell not found
                return {"id": assertion["id"], "type": assertion["type"], "result": "incorrect", "earned": 0, "total": assertion["weight"]}
        except (zipfile.BadZipFile, KeyError, ET.ParseError, OSError):
            return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}

    @staticmethod
    def _assert_worksheet_exists(root, assertion, ns):
        sheets = root.findall('.//m:sheets/m:sheet', ns)
        for sheet in sheets:
            if sheet.get('name', '') == assertion["expected"]:
                return {"id": assertion["id"], "type": assertion["type"], "result": "correct", "earned": assertion["weight"], "total": assertion["weight"]}
        return {"id": assertion["id"], "type": assertion["type"], "result": "incorrect", "earned": 0, "total": assertion["weight"]}

    def _create_r11_session(self) -> dict[str, Any]:
        """Create a server-owned R11 static training session."""
        session_id = secrets.token_urlsafe(24).replace("-", "_")
        paths = self._paths(session_id, require_exists=False)
        paths.directory.mkdir(mode=0o700, parents=False, exist_ok=False)
        task_data = {
            "taskId": "R11_STATIC_WORKSHEET_EXISTS_DEMO",
            "instructionJa": "練習用：新しいワークシートを追加し、「集計結果」という名前にしてください。",
            "instructionZh": "练习用：请新建一个工作表，并命名为「集計結果」。"
        }
        manifest = {
            "schemaVersion": 1, "sessionId": session_id,
            "mode": "r11_static_training", "trainingMode": "r11_static_training",
            "staticTask": task_data,
            "completion": {"acknowledged": False, "acknowledgedAt": None, "acknowledgedPid": None},
            "workbook": paths.workbook.name,
            "createdAt": __import__("datetime").datetime.now().astimezone().isoformat(),
        }
        self._write_original_workbook(paths.workbook, "retail", 1)
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        return {"sessionId": session_id, "mode": "r11_static_training", "scenarioId": "r11_static", "variant": 1,
                "fileName": paths.workbook.name, "sandboxRoot": str(paths.directory),
                "staticTask": task_data, "tasks": [], "environment": self.environment_status()}

    def _create_r12_session(self) -> dict[str, Any]:
        """Create a server-owned R12 dual-assertion training session."""
        session_id = secrets.token_urlsafe(24).replace("-", "_")
        paths = self._paths(session_id, require_exists=False)
        paths.directory.mkdir(mode=0o700, parents=False, exist_ok=False)
        task_data = {
            "taskId": "R12_STATIC_DUAL_SHEET_DEMO",
            "instructionJa": "練習用：\n1. 1枚目のシート名を「練習集計」に変更してください。\n2. 新しいワークシートを追加し、「集計結果」という名前にしてください。",
            "instructionZh": "练习用：\n1. 请将第 1 个工作表重命名为「練習集計」。\n2. 请新建一个工作表，并命名为「集計結果」。"
        }
        manifest = {
            "schemaVersion": 1, "sessionId": session_id,
            "mode": "r12_static_training", "trainingMode": "r12_static_training",
            "staticTask": task_data,
            "completion": {"acknowledged": False, "acknowledgedAt": None, "acknowledgedPid": None},
            "workbook": paths.workbook.name,
            "createdAt": __import__("datetime").datetime.now().astimezone().isoformat(),
        }
        self._write_original_workbook(paths.workbook, "retail", 1)
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        return {"sessionId": session_id, "mode": "r12_static_training", "scenarioId": "r12_static", "variant": 1,
                "fileName": paths.workbook.name, "sandboxRoot": str(paths.directory),
                "staticTask": task_data, "tasks": [], "environment": self.environment_status()}

    def launch_status(self) -> dict[str, Any]:
        """Return current active launch state."""
        global _LAUNCH_STATE
        with _LAUNCH_LOCK:
            if _LAUNCH_STATE is None:
                return {"active": False, "state": None}
            return {"active": True, "sessionId": _LAUNCH_STATE["session_id"],
                "state": _LAUNCH_STATE["state"], "createdAt": _LAUNCH_STATE.get("created_at"),
                "updatedAt": _LAUNCH_STATE.get("updated_at"),
                "pid": _LAUNCH_STATE.get("pid"), "phases": dict(_LAUNCH_STATE.get("phases", {}))}

    def clear_launch(self) -> dict[str, Any]:
        """Clear active launch state for retry."""
        global _LAUNCH_STATE
        with _LAUNCH_LOCK:
            prev = _LAUNCH_STATE
            _LAUNCH_STATE = None
            if prev:
                return {"cleared": True, "previousState": prev.get("state"), "sessionId": prev.get("session_id")}
            return {"cleared": True, "previousState": None}

    def end_session(self, payload: dict[str, Any]) -> dict[str, Any]:
        """End one training session without deleting files or touching other Excel workbooks."""
        session_id = self._safe_session_id(str(payload.get("sessionId", "")))
        raw_pid = payload.get("excelPid")
        try:
            raw_pid = int(raw_pid) if raw_pid is not None else None
        except (TypeError, ValueError):
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "プロセス ID が無効です。", "进程 ID 无效。")
        if raw_pid is None:
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "プロセス ID が必要です。", "需要提供进程 ID。")
        paths = self._paths(session_id)
        if not paths.manifest.is_file():
            raise MOS365ServiceError("SESSION_NOT_FOUND", "セッションが見つかりません。", "未找到会话。", 404)
        manifest = json.loads(paths.manifest.read_text(encoding="utf-8"))
        server_pid = manifest.get("excelPid")
        attached_pid = manifest.get("attachedPid")
        if server_pid is not None and server_pid != raw_pid:
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "セッションのプロセス ID が一致しません。", "会话进程 ID 不匹配。")
        if attached_pid is not None and attached_pid != raw_pid:
            raise MOS365ServiceError("SESSION_PID_MISMATCH", "バインドされたプロセス ID が一致しません。", "绑定进程 ID 不匹配。")
        now = self._now_iso()
        manifest["state"] = "ended"
        manifest["endedAt"] = now
        manifest["endedPid"] = raw_pid
        manifest["endReason"] = "user_exit"
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        self._mark_launch_phase(session_id, "session_ended", state="ended", pid=raw_pid)
        return {"ok": True, "session": {"sessionId": session_id, "state": "ended", "endedAt": now, "excelPid": raw_pid}}

    def _create_r15_session(self) -> dict[str, Any]:
        """Create a server-owned R15 visibility training session with データベース sheet."""
        session_id = secrets.token_urlsafe(24).replace("-", "_")
        paths = self._paths(session_id, require_exists=False)
        paths.directory.mkdir(mode=0o700, parents=False, exist_ok=False)
        task_data = {
            "taskId": "R15_STATIC_SHEET_HIDE_DEMO",
            "instructionJa": "練習用：「データベース」シートを非表示にしてください。",
            "instructionZh": "练习用：请隐藏「データベース」工作表。"
        }
        manifest = {
            "schemaVersion": 1, "sessionId": session_id,
            "mode": "r15_static_training", "trainingMode": "r15_static_training",
            "staticTask": task_data,
            "completion": {"acknowledged": False, "acknowledgedAt": None, "acknowledgedPid": None},
            "workbook": paths.workbook.name,
            "createdAt": __import__("datetime").datetime.now().astimezone().isoformat(),
        }
        self._write_r15_workbook(paths.workbook)
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        return {"sessionId": session_id, "mode": "r15_static_training", "scenarioId": "r15_static", "variant": 1,
                "fileName": paths.workbook.name, "sandboxRoot": str(paths.directory),
                "staticTask": task_data, "tasks": [], "environment": self.environment_status()}

    def _write_r15_workbook(self, destination: Path) -> None:
        """Write a minimal workbook with a visible データベース sheet for R15."""
        sheets = ["作業用", "データベース"]
        rows = [["項目", "値"], ["", ""]]
        sheet_xml = [self._sheet_xml(rows) for _ in sheets]
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

    def _create_r16_session(self) -> dict[str, Any]:
        """Create a server-owned R16 cell value training session with 入力 sheet."""
        session_id = secrets.token_urlsafe(24).replace("-", "_")
        global _LAUNCH_STATE
        now = self._now_iso()
        with _LAUNCH_LOCK:
            _LAUNCH_STATE = {"session_id": session_id, "state": "creating", "created_at": now, "updated_at": now,
                             "phases": {"click_received": now, "session_created": now}}
        paths = self._paths(session_id, require_exists=False)
        paths.directory.mkdir(mode=0o700, parents=False, exist_ok=False)
        task_data = {
            "taskId": "R16_STATIC_CELL_VALUE_DEMO",
            "instructionJa": "練習用：「入力」シートの B2 セルに「完了」と入力してください。",
            "instructionZh": "练习用：请在「入力」工作表的 B2 单元格输入「完了」。"
        }
        manifest = {"schemaVersion": 1, "sessionId": session_id, "mode": "r16_static_training", "trainingMode": "r16_static_training",
            "staticTask": task_data, "completion": {"acknowledged": False, "acknowledgedAt": None, "acknowledgedPid": None},
            "workbook": paths.workbook.name, "createdAt": self._now_iso()}
        self._write_r16_workbook(paths.workbook)
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        self._mark_launch_phase(session_id, "workbook_ready")
        return {"sessionId": session_id, "mode": "r16_static_training", "scenarioId": "r16_static", "variant": 1,
                "fileName": paths.workbook.name, "sandboxRoot": str(paths.directory),
                "staticTask": task_data, "tasks": [], "environment": self.environment_status()}

    def _write_r16_workbook(self, destination: Path) -> None:
        """Write a minimal workbook with 入力 sheet and empty B2 for R16."""
        sheets = ["入力"]
        rows = [["項目", "値"], ["", ""]]
        sx = self._sheet_xml(rows)
        ws = f'<sheet name="{self._xml_escape(sheets[0])}" sheetId="1" r:id="rId1"/>'
        wb = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="{NS_MAIN}" xmlns:r="{NS_REL}"><sheets>{ws}</sheets></workbook>'
        wbr = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="{NS_PKG_REL}"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'
        ct = ['<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>', '<Default Extension="xml" ContentType="application/xml"/>', '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>', '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>', '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>']
        rr = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="{NS_PKG_REL}"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'
        st = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="0"/><fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs></styleSheet>'
        with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            archive.writestr("[Content_Types].xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' + "".join(ct) + "</Types>")
            archive.writestr("_rels/.rels", rr)
            archive.writestr("xl/workbook.xml", wb)
            archive.writestr("xl/_rels/workbook.xml.rels", wbr)
            archive.writestr("xl/styles.xml", st)
            archive.writestr("xl/worksheets/sheet1.xml", sx)

    def _create_r17_session(self) -> dict[str, Any]:
        """Create a server-owned R17 formula text training session with 計算 sheet."""
        session_id = secrets.token_urlsafe(24).replace("-", "_")
        global _LAUNCH_STATE
        now = self._now_iso()
        with _LAUNCH_LOCK:
            _LAUNCH_STATE = {"session_id": session_id, "state": "creating", "created_at": now, "updated_at": now,
                             "phases": {"click_received": now, "session_created": now}}
        paths = self._paths(session_id, require_exists=False)
        paths.directory.mkdir(mode=0o700, parents=False, exist_ok=False)
        task_data = {
            "taskId": "R17_STATIC_FORMULA_TEXT_DEMO",
            "instructionJa": "「計算」シートの C2 セルに、A2 から B2 の合計を求める数式を入力してください。",
            "instructionZh": "请在「計算」工作表的 C2 单元格中，输入计算 A2 到 B2 总和的公式。"
        }
        manifest = {"schemaVersion": 1, "sessionId": session_id, "mode": "r17_static_training", "trainingMode": "r17_static_training",
            "staticTask": task_data, "completion": {"acknowledged": False, "acknowledgedAt": None, "acknowledgedPid": None},
            "workbook": paths.workbook.name, "createdAt": self._now_iso()}
        self._write_r17_workbook(paths.workbook)
        paths.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
        self._mark_launch_phase(session_id, "workbook_ready")
        return {"sessionId": session_id, "mode": "r17_static_training", "scenarioId": "r17_static", "variant": 1,
                "fileName": paths.workbook.name, "sandboxRoot": str(paths.directory),
                "staticTask": task_data, "tasks": [], "environment": self.environment_status()}

    def _write_r17_workbook(self, destination: Path) -> None:
        """Write a minimal workbook with 入力 + 計算 sheets, C2 blank for R17."""
        sheets = ["入力", "計算"]
        input_rows = [["項目", "値"], ["", ""]]
        calc_rows = [["", "", ""], [2, 3, ""]]
        input_sx = self._sheet_xml(input_rows)
        calc_sx = self._sheet_xml_calc()
        ws1 = f'<sheet name="{self._xml_escape(sheets[0])}" sheetId="1" r:id="rId1"/>'
        ws2 = f'<sheet name="{self._xml_escape(sheets[1])}" sheetId="2" r:id="rId2"/>'
        wb = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="{NS_MAIN}" xmlns:r="{NS_REL}"><sheets>{ws1}{ws2}</sheets></workbook>'
        wbr = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="{NS_PKG_REL}"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'
        ct = ['<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>', '<Default Extension="xml" ContentType="application/xml"/>', '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>', '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>', '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>', '<Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>']
        rr = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="{NS_PKG_REL}"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'
        st = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="0"/><fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs></styleSheet>'
        with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            archive.writestr("[Content_Types].xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' + "".join(ct) + "</Types>")
            archive.writestr("_rels/.rels", rr)
            archive.writestr("xl/workbook.xml", wb)
            archive.writestr("xl/_rels/workbook.xml.rels", wbr)
            archive.writestr("xl/styles.xml", st)
            archive.writestr("xl/worksheets/sheet1.xml", input_sx)
            archive.writestr("xl/worksheets/sheet2.xml", calc_sx)

    @staticmethod
    def _xml_escape_attr(value: str) -> str:
        """Escape XML attribute value (double-quote safe)."""
        return (str(value)
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace('"', "&quot;"))

    def _safe_metadata_custom_xml(self, task_id: str) -> str:
        """Build docProps/custom.xml with safe task metadata.

        Fields written (safe, no answers):
          MOS_TASK_ID, MOS_TITLE_JA, MOS_TITLE_ZH,
          MOS_INSTRUCTION_JA, MOS_INSTRUCTION_ZH,
          MOS_SHEET_LABEL, MOS_TARGET_LABEL.

        Fields never written:
          expectedFormula, expectedValue, scoringSpec, assessmentType.
        """
        info = MOS_CATALOG.get(task_id)
        if not info:
            return ""
        assessment = info.get("assessment", {})
        sheet_label  = assessment.get("sheetName", "")
        target_label = assessment.get("cellRef", "")

        def prop(pid: int, name: str, value: str) -> str:
            esc_name  = self._xml_escape_attr(name)
            esc_value = self._xml_escape_attr(value)
            return (f'<vt:property fmtid="{{D5CDD505-2E9C-101B-9397-08002B2CF9AE}}"'
                    f' pid="{pid}" name="{esc_name}">'
                    f'<vt:lpwstr>{esc_value}</vt:lpwstr>'
                    f'</vt:property>')

        props = [
            prop(2,  "MOS_TASK_ID",       task_id),
            prop(3,  "MOS_TITLE_JA",      info.get("titleJa",       "")),
            prop(4,  "MOS_TITLE_ZH",      info.get("titleZh",       "")),
            prop(5,  "MOS_INSTRUCTION_JA",info.get("instructionJa", "")),
            prop(6,  "MOS_INSTRUCTION_ZH",info.get("instructionZh", "")),
            prop(7,  "MOS_SHEET_LABEL",   sheet_label),
            prop(8,  "MOS_TARGET_LABEL",  target_label),
            prop(9,  "MOS_TIER",          info.get("tier",          "基礎")),
            prop(10, "MOS_ESTIMATED_MINUTES", str(info.get("estimatedMinutes", 3))),
        ]
        ns = "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties"
        vt = "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
        return (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            f'<Properties xmlns="{ns}" xmlns:vt="{vt}">'
            + "".join(props)
            + "</Properties>"
        )

    def _write_gp_workbook(self, destination: Path, task_id: str) -> None:
        """Write a minimal original workbook configured for the specific MOS task_id."""
        # R33: Safe metadata for VSTO immediate display (no answers written)
        custom_props_xml = self._safe_metadata_custom_xml(task_id)
        if task_id in ("MOS_GP_001_ENTER_STATUS", "R16_STATIC_CELL_VALUE_DEMO"):
            sheets = ["入力"]
            sheet_data = {
                "入力": [["項目", "値"], ["", ""]]
            }
        elif task_id in ("MOS_GP_002_SUM_TWO_VALUES", "R17_STATIC_FORMULA_TEXT_DEMO"):
            sheets = ["入力", "計算"]
            sheet_data = {
                "入力": [["項目", "値"], ["", ""]],
                "計算": [["", "", ""], [2, 3, ""]]
            }
        elif task_id == "MOS_GP_003_SUM_WEEKLY_SALES":
            sheets = ["売上"]
            sheet_data = {
                "売上": [
                    ["曜日", "売上高"],
                    ["月", 12000],
                    ["火", 8500],
                    ["水", 16200],
                    ["木", 7300],
                    ["金", 9400],
                    ["合計", ""]
                ]
            }
        elif task_id == "MOS_GP_004_AVERAGE_SCORE":
            sheets = ["成績"]
            sheet_data = {
                "成績": [
                    ["教科", "得点"],
                    ["国語", 78],
                    ["数学", 85],
                    ["英語", 92],
                    ["平均", ""]
                ]
            }
        elif task_id == "MOS_GP_005_IF_DELIVERY_STATUS":
            sheets = ["配達"]
            sheet_data = {
                "配達": [
                    ["配送先", "配送ステータス", "チェック結果"],
                    ["配送先A", "完了", ""]
                ]
            }
        elif task_id == "MOS_GP_006_COUNTA_BOOKS":
            sheets = ["新着"]
            sheet_data = {
                "新着": [
                    ["書籍名", ""],
                    ["Python入門", ""],
                    ["Javaの基本", ""],
                    ["", ""],
                    ["SQL超入門", ""],
                    ["", ""],
                    ["HTML/CSS基本", ""],
                    ["ネットワーク基礎", ""],
                    ["情報セキュリティ", ""],
                    ["", ""],
                    ["アルゴリズム解説", ""]
                ]
            }
        elif task_id in ("MOS_GP_007_MAX_VISITORS", "MOS_GP_008_MIN_VISITORS"):
            sheets = ["来客"]
            sheet_data = {
                "来客": [
                    ["曜日", "来客数"],
                    ["月", 42],
                    ["火", 35],
                    ["水", 68],
                    ["木", 29],
                    ["金", 55],
                    ["土", 91],
                    ["日", 47],
                    ["最大来客数", ""],
                    ["最小来客数", ""]
                ]
            }
        elif task_id == "MOS_GP_009_LEFT_DEPARTMENT_CODE":
            sheets = ["社員"]
            sheet_data = {
                "社員": [
                    ["社員コード", "部門コード"],
                    ["SA0381", ""]
                ]
            }
        elif task_id == "MOS_GP_010_TEXTJOIN_PRODUCT_TAG":
            sheets = ["商品"]
            sheet_data = {
                "商品": [
                    ["商品名", "型番", "カラー", "商品タグ"],
                    ["ノート", "A5", "紺", ""]
                ]
            }
        else:
            raise MOS365ServiceError("TASK_NOT_FOUND", "タスクが見つかりません。", "任务未找到。")

        sheet_xml = [self._sheet_xml(sheet_data[name]) for name in sheets]
        workbook_sheets = "".join(f'<sheet name="{self._xml_escape(name)}" sheetId="{idx + 1}" r:id="rId{idx + 1}"/>' for idx, name in enumerate(sheets))
        workbook_xml = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="{NS_MAIN}" xmlns:r="{NS_REL}"><sheets>{workbook_sheets}</sheets></workbook>'
        rels = "".join(f'<Relationship Id="rId{idx + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{idx + 1}.xml"/>' for idx in range(len(sheets)))
        workbook_rels = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="{NS_PKG_REL}">{rels}<Relationship Id="rId{len(sheets) + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'
        content_types = ['<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>', '<Default Extension="xml" ContentType="application/xml"/>', '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>', '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>']
        content_types += [f'<Override PartName="/xl/worksheets/sheet{idx + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' for idx in range(len(sheets))]
        root_rels = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="{NS_PKG_REL}"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'
        styles = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="0"/><fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs></styleSheet>'

        # R33: Include custom doc properties for VSTO immediate metadata display
        if custom_props_xml:
            content_types.append(
                '<Override PartName="/docProps/custom.xml"'
                ' ContentType="application/vnd.openxmlformats-officedocument.custom-properties+xml"/>'
            )
            # Add custom.xml relationship to root .rels
            root_rels = (
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
                f'<Relationships xmlns="{NS_PKG_REL}">'
                '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
                '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties" Target="docProps/custom.xml"/>'
                '</Relationships>'
            )

        with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            archive.writestr("[Content_Types].xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' + "".join(content_types) + "</Types>")
            archive.writestr("_rels/.rels", root_rels)
            archive.writestr("xl/workbook.xml", workbook_xml)
            archive.writestr("xl/_rels/workbook.xml.rels", workbook_rels)
            archive.writestr("xl/styles.xml", styles)
            for index, content in enumerate(sheet_xml, start=1):
                archive.writestr(f"xl/worksheets/sheet{index}.xml", content)
            if custom_props_xml:
                archive.writestr("docProps/custom.xml", custom_props_xml)

    @staticmethod
    def _normal_formula_comparer(actual: str, expected: str) -> bool:
        def normalize(f: str) -> str:
            f = str(f or "").strip()
            if not f.startswith("="):
                f = "=" + f
            f = re.sub(r"\s+", "", f).upper()
            return f
        return normalize(actual) == normalize(expected)

    @staticmethod
    def _sheet_xml_calc() -> str:
        """Write 計算 sheet: A2=2, B2=3, C2 blank (answer must be user-entered)."""
        return (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
            '<sheetData>'
            '<row r="1"><c r="A1" t="inlineStr"><is><t></t></is></c>'
            '<c r="B1" t="inlineStr"><is><t></t></is></c>'
            '<c r="C1" t="inlineStr"><is><t></t></is></c></row>'
            '<row r="2"><c r="A2"><v>2</v></c>'
            '<c r="B2"><v>3</v></c>'
            '<c r="C2" t="inlineStr"><is><t></t></is></c></row>'
            '</sheetData></worksheet>'
        )

    @staticmethod
    def _assert_cell_formula_equals(workbook_path: str, assertion, ns):
        """Score cell_formula_equals — read only <f> from target cell, reject unsupported types."""
        target_sheet = assertion.get("sheetName", "")
        target_ref = assertion.get("cellRef", "")
        expected = assertion.get("expectedFormula", "")
        try:
            with zipfile.ZipFile(workbook_path, "r") as archive:
                names = set(archive.namelist())
                wb_root = ET.fromstring(archive.read("xl/workbook.xml"))
                rels_root = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
                sheet_rel_id = None
                for sheet in wb_root.findall('.//m:sheets/m:sheet', ns):
                    if sheet.get('name', '') == target_sheet:
                        sheet_rel_id = sheet.attrib.get('{' + ns['r'] + '}id', sheet.attrib.get('r:id', ''))
                        break
                if not sheet_rel_id:
                    return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                target = ""
                for rel in rels_root.findall('pr:Relationship', ns):
                    if rel.attrib.get('Id', '') == sheet_rel_id:
                        target = rel.attrib.get('Target', '')
                        break
                if not target:
                    return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                normalized = target.lstrip('/')
                if not normalized.startswith('xl/'):
                    normalized = 'xl/' + normalized
                if not normalized.startswith('xl/worksheets/'):
                    return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                if normalized not in names:
                    return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                sheet_root = ET.fromstring(archive.read(normalized))
                for cell in sheet_root.findall('.//m:c', ns):
                    if cell.attrib.get('r', '') != target_ref:
                        continue
                    f_node = cell.find('m:f', ns)
                    if f_node is None:
                        return {"id": assertion["id"], "type": assertion["type"], "result": "incorrect", "earned": 0, "total": assertion["weight"]}
                    f_text = f_node.text
                    if f_text is None or not f_text.strip():
                        return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                    f_type = f_node.attrib.get('t', '')
                    if f_type == 'shared':
                        return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}
                    actual_formula = "=" + f_text.strip()
                    correct = MOS365Service._normal_formula_comparer(actual_formula, expected)
                    return {"id": assertion["id"], "type": assertion["type"], "result": "correct" if correct else "incorrect", "earned": assertion["weight"] if correct else 0, "total": assertion["weight"]}
                return {"id": assertion["id"], "type": assertion["type"], "result": "incorrect", "earned": 0, "total": assertion["weight"]}
        except (zipfile.BadZipFile, KeyError, ET.ParseError, OSError):
            return {"id": assertion["id"], "type": assertion["type"], "result": "indeterminate", "earned": 0, "total": assertion["weight"]}

    @staticmethod
    def _normal_formula(value: Any) -> str:
        # Excel may omit syntactically optional single quotes around a sheet name
        # when serializing a formula to Open XML. Quotes do not change the reference.
        return MOS365Service._normal(value).replace("'", "")

    @staticmethod
    def _normal(value: Any) -> str:
        return re.sub(r"\s+", "", str(value or "")).upper().lstrip("=")

