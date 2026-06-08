import os
import re
import json

def verify_sql():
    print("=== Testing lessons.js (SQL) ===")
    with open(os.path.join(os.path.dirname(__file__), "..", "data", "lessons.js"), encoding="utf-8") as f:
        content = f.read()

    # 提取数组，因为 lessons.js 有 expectedQuery 正则表达式（不是合法 JSON）
    # 我们用正则来解析
    blocks = content.split("id:")[1:]
    
    if len(blocks) != 36:
        print(f"ERROR: Expected 36 SQL lessons, found {len(blocks)}")
        return False

    success = True
    for idx, block in enumerate(blocks):
        lesson_id = idx + 1
        
        # 1. 校验 ID 连续
        id_match = re.match(r"\s*(\d+)", block)
        if not id_match or int(id_match.group(1)) != lesson_id:
            print(f"ERROR: SQL Lesson ID mismatch at sequence {lesson_id}")
            success = False
            continue

        # 2. 校验新增字段
        for field in ["chapterId", "chapterName", "subSectionId", "subSectionName"]:
            # 正则匹配形如 field: value 或 field: "value"
            match = re.search(rf'{field}:\s*([^\n,]+)', block)
            if not match:
                print(f"ERROR: SQL Lesson {lesson_id} missing field '{field}'")
                success = False
            else:
                val = match.group(1).strip().strip('"\'')
                # print(f"Lesson {lesson_id} - {field}: {val}")

        # 3. 校验原有字段
        for field in ["section", "titleJa", "titleZh", "conceptJa", "conceptZh", "analogy", "example", "playgroundTask"]:
            if f"{field}:" not in block:
                print(f"ERROR: SQL Lesson {lesson_id} missing core field '{field}:'")
                success = False

    if success:
        print("SUCCESS: All 36 SQL lessons verified successfully!")
    return success

if __name__ == "__main__":
    if verify_sql():
        print("SQL database verification PASSED.")
    else:
        print("SQL database verification FAILED.")
