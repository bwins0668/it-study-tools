import json
from pathlib import Path

def main():
    project_root = Path(__file__).resolve().parents[1]
    exam_path = project_root / "data" / "it_passport_past_exams.js"

    with exam_path.open(encoding='utf-8') as f:
        content = f.read()

    # Find [
    idx = content.find('[')
    json_str = content[idx:].strip()
    if json_str.endswith(';'):
        json_str = json_str[:-1].strip()

    try:
        exams = json.loads(json_str)
        print(f"Loaded {len(exams)} questions.")
        for i in range(min(120, len(exams))):
            q = exams[i]
            # print if subcategory is very long, or print first 100 characters
            sub = q.get('subcategory', '')
            if len(sub) > 50:
                print(f"Index {i} (ID: {q.get('id')}): Subcategory length is {len(sub)}")
                print(f"  Snippet: {sub[:150]}...")
    except Exception as e:
        print("JSON parse error:", e)

if __name__ == '__main__':
    main()
