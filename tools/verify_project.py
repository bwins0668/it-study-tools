import os
import re
import json

def verify_lessons():
    print("=== Testing lessons.js ===")
    with open(os.path.join(os.path.dirname(__file__), "..", "data", "lessons.js"), encoding="utf-8") as f:
        content = f.read()

    # Find the SQL_LESSONS array in JS
    # Since it is a list of dicts, let's extract each object manually or using regex
    # We can parse the array elements using brackets balance or regex blocks
    # Each lesson starts with { and ends with } and is separated by commas.
    # Let's find all `{ id: ..., ... }` blocks.
    # A robust way is to split by `id: ` and then parse each block
    blocks = content.split("id:")[1:]
    
    if len(blocks) != 36:
        print(f"ERROR: Expected 36 lessons, found {len(blocks)}")
        return False

    success = True
    for idx, block in enumerate(blocks):
        lesson_id = idx + 1
        
        # Verify ID sequence
        id_match = re.match(r"\s*(\d+)", block)
        if not id_match or int(id_match.group(1)) != lesson_id:
            print(f"ERROR: Lesson ID mismatch at sequence {lesson_id}")
            success = False
            continue
            
        # Extract example
        example_match = re.search(r"example:\s*([\"'`])(.*?)\1", block, re.DOTALL)
        if not example_match:
            print(f"ERROR: Lesson {lesson_id} has no example code")
            success = False
            continue
        example_code = example_match.group(2).strip()

        # Extract expectedQuery regex
        # format: expectedQuery: /pattern/flags
        regex_match = re.search(r"expectedQuery:\s*/(.*?)/(i|g|ig|gi)?\s*,", block, re.DOTALL)
        if not regex_match:
            print(f"ERROR: Lesson {lesson_id} has no expectedQuery regex")
            success = False
            continue
        pattern = regex_match.group(1)
        flags = regex_match.group(2) or ""

        # Test example code against expectedQuery regex
        # Compile python regex
        re_flags = 0
        if "i" in flags:
            re_flags |= re.IGNORECASE
        
        # Replace JS specific regex escapes to python if needed (usually compatible)
        # JS regex: \s, \*, \w, \., etc. are same in Python.
        # Let's try compiling and matching
        try:
            compiled = re.compile(pattern, re_flags)
            if not compiled.search(example_code):
                print(f"WARNING: Lesson {lesson_id} expectedQuery does NOT match its own example!")
                print(f"  Example: {example_code}")
                print(f"  Pattern: {pattern}")
                success = False
        except Exception as e:
            print(f"ERROR: Lesson {lesson_id} regex failed to compile: {e}")
            success = False

        # Extract quiz answers
        quiz_match = re.search(r"quiz:\s*\{(.*?)\}\s*,", block, re.DOTALL)
        if quiz_match:
            quiz_content = quiz_match.group(1)
            # Find options list
            options_match = re.search(r"options:\s*\[(.*?)\]", quiz_content, re.DOTALL)
            ans_idx_match = re.search(r"answerIdx:\s*(\d+)", quiz_content)
            
            if options_match and ans_idx_match:
                # count options by splitting by comma (simple check)
                options = [o.strip() for o in options_match.group(1).split(",") if o.strip()]
                ans_idx = int(ans_idx_match.group(1))
                if ans_idx >= len(options) or ans_idx < 0:
                    print(f"ERROR: Lesson {lesson_id} quiz answerIdx {ans_idx} is out of bounds for options (count: {len(options)})")
                    success = False
            else:
                print(f"ERROR: Lesson {lesson_id} quiz options or answerIdx is missing")
                success = False
        else:
            print(f"ERROR: Lesson {lesson_id} has no quiz block")
            success = False

    if success:
        print("SUCCESS: All 36 lessons parsed and matched their own examples!")
    return success

def verify_db_js():
    print("\n=== Testing db.js ===")
    with open(os.path.join(os.path.dirname(__file__), "..", "data", "db.js"), encoding="utf-8") as f:
        content = f.read()

    # Search for python capitalization errors
    import re
    matches_true = re.findall(r'\bTrue\b', content)
    matches_false = re.findall(r'\bFalse\b', content)
    matches_none = re.findall(r'\bNone\b', content)

    success = True
    if len(matches_true) > 0 or len(matches_false) > 0 or len(matches_none) > 0:
        print(f"ERROR: Found Python keywords in JS code:")
        print(f"  True count: {len(matches_true)}")
        print(f"  False count: {len(matches_false)}")
        print(f"  None count: {len(matches_none)}")
        success = False
    else:
        print("SUCCESS: No capitalized Python keywords (True/False/None) found in JS code!")

    # Check database objects in DB_DATA
    # Check if DB_DATA contains students_mst and departments_mst
    if "students_mst" not in content:
        print("ERROR: 'students_mst' not found in db.js")
        success = False
    if "departments_mst" not in content:
        print("ERROR: 'departments_mst' not found in db.js")
        success = False

    if success:
        print("SUCCESS: db.js looks clean and properly formatted!")
    return success

if __name__ == "__main__":
    lessons_ok = verify_lessons()
    db_ok = verify_db_js()
    if lessons_ok and db_ok:
        print("\nSUMMARY: Project check passed! Everything is working correctly.")
    else:
        print("\nSUMMARY: Project check failed. Please review errors above.")
