import os
import json
import re

def verify_java():
    print("=== Testing java_lessons.js ===")
    with open(os.path.join(os.path.dirname(__file__), "..", "data", "java_lessons.js"), encoding="utf-8") as f:
        content = f.read()

    idx = content.find("const JAVA_LESSONS =")
    if idx == -1:
        print("ERROR: Could not find 'const JAVA_LESSONS ='")
        return False
    
    json_str = content[idx + len("const JAVA_LESSONS ="):].strip()
    if json_str.endswith(";"):
        json_str = json_str[:-1].strip()

    try:
        lessons = json.loads(json_str)
        print(f"SUCCESS: Loaded {len(lessons)} Java lessons successfully via json.loads!")
    except Exception as e:
        print(f"ERROR: JSON parsing failed: {e}")
        return False

    if len(lessons) != 115:
        print(f"ERROR: Expected 96 lessons, found {len(lessons)}")
        return False

    success = True
    for i, lesson in enumerate(lessons):
        idx_expected = i + 1
        
        # 字段校验
        required_fields = [
            "id", "book", "bookZh", "chapterId", "chapterName",
            "subSectionId", "subSectionName", "titleJa", "titleZh",
            "conceptJa", "conceptZh", "analogy", "example",
            "vocabList", "quizList", "pdfPage", "pdfHighlightTerm"
        ]
        
        for field in required_fields:
            if field not in lesson:
                print(f"ERROR: Lesson {idx_expected} missing field '{field}'")
                success = False
                continue

        if lesson.get("id") != idx_expected:
            print(f"ERROR: Lesson {idx_expected} has invalid ID: {lesson.get('id')}")
            success = False

        # 校验页码
        pdf_page = lesson.get("pdfPage")
        if not isinstance(pdf_page, int) or pdf_page <= 0:
            print(f"ERROR: Lesson {idx_expected} has invalid pdfPage: {pdf_page}")
            success = False

        # 校验词卡和测验非空
        vocab = lesson.get("vocabList", [])
        quizzes = lesson.get("quizList", [])
        
        if not vocab:
            print(f"ERROR: Lesson {idx_expected} has empty vocabList")
            success = False
            
        if not quizzes:
            print(f"ERROR: Lesson {idx_expected} has empty quizList")
            success = False

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
        print("SUCCESS: All 115 Java lessons verified successfully!")
    return success

if __name__ == "__main__":
    if verify_java():
        print("Java database verification PASSED.")
    else:
        print("Java database verification FAILED.")
