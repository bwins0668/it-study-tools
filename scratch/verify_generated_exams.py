import re
import json

def verify_js_file(filepath, var_name, expected_fields):
    print(f"Verifying {filepath}...")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    idx = content.find(f"const {var_name} =")
    if idx == -1:
        print(f"ERROR: Could not find 'const {var_name} =' in {filepath}")
        return False
        
    json_str = content[idx + len(f"const {var_name} ="):].strip()
    if json_str.endswith(";"):
        json_str = json_str[:-1].strip()
        
    try:
        data = json.loads(json_str)
        print(f"SUCCESS: Loaded {len(data)} items successfully.")
    except Exception as e:
        print(f"ERROR: JSON parsing failed: {e}")
        return False
        
    if len(data) < 300:
        print(f"ERROR: Expected at least 300 items, found {len(data)}")
        return False
        
    # Check fields of the first few items
    success = True
    for i, item in enumerate(data):
        for field in expected_fields:
            if field not in item:
                print(f"ERROR: Item {i+1} (ID: {item.get('id')}) is missing field '{field}'")
                success = False
                
    if success:
        print(f"SUCCESS: All {len(data)} items in {filepath} verified successfully!")
    return success

def main():
    sql_ok = verify_js_file(
        "sql_exam_questions.js", 
        "SQL_EXAM_QUESTIONS", 
        ["id", "difficulty", "type", "dbGroup", "titleJa", "taskJa", "taskZh", "solutionQuery", "hint"]
    )
    java_ok = verify_js_file(
        "java_exam_questions.js", 
        "JAVA_EXAM_QUESTIONS", 
        ["id", "difficulty", "type", "titleJa", "taskJa", "taskZh", "stdinExample", "expectedOutput", "solutionCode", "templateCode", "hint"]
    )
    python_ok = verify_js_file(
        "python_exam_questions.js", 
        "PYTHON_EXAM_QUESTIONS", 
        ["id", "difficulty", "type", "titleJa", "taskJa", "taskZh", "expectedOutput", "solutionCode", "hint", "templateCode"]
    )
    
    if sql_ok and java_ok and python_ok:
        print("\nALL GENERATED MOCK EXAMS VERIFIED SUCCESSFULLY!")
    else:
        print("\nSOME EXAMS FAILED VERIFICATION.")

if __name__ == "__main__":
    main()
