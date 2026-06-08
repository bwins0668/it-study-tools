import json
import os

def main():
    filepath = "it_passport_past_exams.js"
    print(f"Verifying {filepath}...")
    
    if not os.path.exists(filepath):
        print(f"ERROR: File {filepath} does not exist.")
        return
        
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    idx = content.find("const IT_PASSPORT_PAST_EXAMS =")
    if idx == -1:
        print("ERROR: Could not find variable declaration.")
        return
        
    json_str = content[idx + len("const IT_PASSPORT_PAST_EXAMS ="):].strip()
    if json_str.endswith(";"):
        json_str = json_str[:-1].strip()
        
    try:
        exams = json.loads(json_str)
        print(f"SUCCESS: Loaded {len(exams)} questions.")
        
        # Check required fields
        required_fields = ["id", "year", "yearId", "number", "category", "topic", "subcategory", "question", "options", "answer", "explanation"]
        success = True
        
        for i, q in enumerate(exams):
            for field in required_fields:
                if field not in q:
                    print(f"ERROR: Question at index {i} (ID: {q.get('id', 'unknown')}) missing field '{field}'")
                    success = False
            
            options = q.get("options", [])
            if not (2 <= len(options) <= 10):
                print(f"ERROR: Question {q.get('id')} has invalid options count: {len(options)}")
                success = False
                
            ans = q.get("answer")
            if not isinstance(ans, int) or not (0 <= ans < len(options)):
                print(f"ERROR: Question {q.get('id')} has invalid answer index: {ans}")
                success = False
                
        if len(exams) < 1500:
            print(f"WARNING: Expected at least 1500 questions, found {len(exams)}")
            success = False
            
        if success:
            print("SUCCESS: All IT Passport past exams verified successfully!")
        else:
            print("FAILED: Some verification checks failed.")
            
    except Exception as e:
        print(f"ERROR: JSON parsing failed: {e}")

if __name__ == "__main__":
    main()
