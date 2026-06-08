import os
import json
import re

def verify_sg_lessons():
    print("=== Testing sg_lessons.js ===")
    with open(os.path.join(os.path.dirname(__file__), "..", "data", "sg_lessons.js"), encoding="utf-8") as f:
        content = f.read()

    # Locate the SG_LESSONS array
    idx = content.find("const SG_LESSONS =")
    if idx == -1:
        print("ERROR: Could not find 'const SG_LESSONS ='")
        return False
    
    json_str = content[idx + len("const SG_LESSONS ="):].strip()
    if json_str.endswith(";"):
        json_str = json_str[:-1].strip()

    try:
        lessons = json.loads(json_str)
        print(f"SUCCESS: Loaded {len(lessons)} SG lessons successfully via json.loads!")
    except Exception as e:
        print(f"ERROR: JSON parsing failed: {e}")
        return False

    success = True
    for i, lesson in enumerate(lessons):
        idx_expected = i + 1
        # Check required fields
        required_fields = ["id", "chapterId", "chapterName", "section", "titleJa", "titleZh", "conceptJa", "conceptZh", "analogy", "example", "quizList", "subSectionId", "subSectionName"]
        for field in required_fields:
            if field not in lesson:
                print(f"ERROR: Lesson {idx_expected} missing field '{field}'")
                success = False
                continue

        if len(lessons) != 44:
            print(f"ERROR: Expected 44 lessons, found {len(lessons)}")
            success = False

        if lesson.get("id") != idx_expected:
            print(f"ERROR: Lesson {idx_expected} has invalid ID: {lesson.get('id')}")
            success = False

        quizzes = lesson.get("quizList", [])
        if not quizzes:
            print(f"ERROR: Lesson {idx_expected} has empty quizList")
            success = False
            continue

        for q_idx, quiz in enumerate(quizzes):
            for q_field in ["question", "options", "answerIdx", "hint"]:
                if q_field not in quiz:
                    print(f"ERROR: Lesson {idx_expected} quiz {q_idx} missing field '{q_field}'")
                    success = False

            options = quiz.get("options", [])
            if len(options) < 2:
                print(f"ERROR: Lesson {idx_expected} quiz {q_idx} has too few options (found {len(options)})")
                success = False

            ans_idx = quiz.get("answerIdx")
            if not isinstance(ans_idx, int) or not (0 <= ans_idx < len(options)):
                print(f"ERROR: Lesson {idx_expected} quiz {q_idx} has invalid answerIdx: {ans_idx}")
                success = False

    if success:
        print("SUCCESS: All SG lessons verified successfully!")
    return success

def verify_sg_past_exams():
    print("\n=== Testing sg_past_exams.js ===")
    with open(os.path.join(os.path.dirname(__file__), "..", "data", "sg_past_exams.js"), encoding="utf-8") as f:
        content = f.read()

    # Locate the SG_PAST_EXAMS array
    idx = content.find("const SG_PAST_EXAMS =")
    if idx == -1:
        print("ERROR: Could not find 'const SG_PAST_EXAMS ='")
        return False
    
    json_str = content[idx + len("const SG_PAST_EXAMS ="):].strip()
    if json_str.endswith(";"):
        json_str = json_str[:-1].strip()

    try:
        exams = json.loads(json_str)
        print(f"SUCCESS: Loaded {len(exams)} SG past exam questions successfully via json.loads!")
    except Exception as e:
        print(f"ERROR: JSON parsing failed: {e}")
        return False

    success = True
    for idx_expected, q in enumerate(exams):
        # Check required fields
        required_fields = ["id", "year", "yearId", "number", "category", "topic", "subcategory", "question", "options", "answer", "explanation"]
        for field in required_fields:
            if field not in q:
                print(f"ERROR: Question at index {idx_expected} (ID: {q.get('id', 'unknown')}) missing field '{field}'")
                success = False
                continue

        options = q.get("options", [])
        if len(options) < 2 or len(options) > 10:
            print(f"ERROR: Question {q['id']} has invalid options count: {len(options)}")
            success = False

        ans = q.get("answer")
        if not isinstance(ans, int) or not (0 <= ans < len(options)):
            print(f"ERROR: Question {q['id']} has invalid answer index: {ans}")
            success = False

    if success:
        print("SUCCESS: All SG past exam questions verified successfully!")
    return success

if __name__ == "__main__":
    lessons_ok = verify_sg_lessons()
    exams_ok = verify_sg_past_exams()
    if lessons_ok and exams_ok:
        print("\nSUMMARY: SG verification PASSED!")
    else:
        print("\nSUMMARY: SG verification FAILED!")
