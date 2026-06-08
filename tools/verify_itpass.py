import os
import re
import json

def verify_itpass():
    print("=== Testing it_passport_lessons.js ===")
    with open(os.path.join(os.path.dirname(__file__), "..", "data", "it_passport_lessons.js"), encoding="utf-8") as f:
        content = f.read()

    # Locate the IT_PASSPORT_LESSONS array
    # We can match JS objects by split or standard JS-like parsing
    # The structure: const IT_PASSPORT_LESSONS = [ { ... }, { ... } ];
    # Since it is valid JSON if we extract the inside of [...] and format keys to have double quotes.
    # Fortunately, the generated it_passport_lessons.js already has double quotes for keys because it was generated from a Python dict/json block.
    # Let's verify by parsing the array using json.loads after clean up.
    
    # Clean the JS code to make it valid JSON
    idx = content.find("const IT_PASSPORT_LESSONS =")
    if idx == -1:
        print("ERROR: Could not find 'const IT_PASSPORT_LESSONS ='")
        return False
    
    json_str = content[idx + len("const IT_PASSPORT_LESSONS ="):].strip()
    if json_str.endswith(";"):
        json_str = json_str[:-1].strip()

    try:
        lessons = json.loads(json_str)
        print(f"SUCCESS: Loaded {len(lessons)} lessons successfully via json.loads!")
    except Exception as e:
        print(f"ERROR: JSON parsing failed: {e}")
        # Let's print the first part where it failed if possible
        return False

    if len(lessons) != 85:
        print(f"ERROR: Expected 85 lessons, found {len(lessons)}")
        return False

    success = True
    for i, lesson in enumerate(lessons):
        idx = i + 1
        # Check required fields
        for field in ["id", "chapterId", "chapterName", "section", "titleJa", "titleZh", "conceptJa", "conceptZh", "analogy", "example", "quizList", "subSectionId", "subSectionName"]:
            if field not in lesson:
                print(f"ERROR: Lesson {idx} missing field '{field}'")
                success = False
                continue

        if lesson.get("id") != idx:
            print(f"ERROR: Lesson {idx} has invalid ID: {lesson.get('id')}")
            success = False

        chapter_id = lesson.get("chapterId")
        if not (1 <= chapter_id <= 10):
            print(f"ERROR: Lesson {idx} has invalid chapterId: {chapter_id}")
            success = False

        quizzes = lesson.get("quizList", [])
        if not quizzes:
            print(f"ERROR: Lesson {idx} has empty quizList")
            success = False
            continue

        for q_idx, quiz in enumerate(quizzes):
            for q_field in ["question", "options", "answerIdx", "hint"]:
                if q_field not in quiz:
                    print(f"ERROR: Lesson {idx} quiz {q_idx} missing field '{q_field}'")
                    success = False

            options = quiz.get("options", [])
            if len(options) != 4:
                print(f"ERROR: Lesson {idx} quiz {q_idx} does not have exactly 4 options (found {len(options)})")
                success = False

            ans_idx = quiz.get("answerIdx")
            if not isinstance(ans_idx, int) or not (0 <= ans_idx < len(options)):
                print(f"ERROR: Lesson {idx} quiz {q_idx} has invalid answerIdx: {ans_idx}")
                success = False

    if success:
        print("SUCCESS: All 73 IT Passport lessons verified successfully!")
    return success

if __name__ == "__main__":
    if verify_itpass():
        print("IT Passport database verification PASSED.")
    else:
        print("IT Passport database verification FAILED.")
