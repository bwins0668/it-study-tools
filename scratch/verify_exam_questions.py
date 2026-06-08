import re
import json
import os

def check_file(filename, var_name, required_fields):
    print(f"Checking {filename} for variable {var_name}...")
    if not os.path.isfile(filename):
        print(f"ERROR: {filename} does not exist!")
        return False
        
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    idx = content.find(f"const {var_name} =")
    if idx == -1:
        idx = content.find(f"let {var_name} =")
    if idx == -1:
        idx = content.find(f"var {var_name} =")
    if idx == -1:
        # Fallback to just finding the array name
        idx = content.find(var_name)
        
    if idx == -1:
        print(f"ERROR: Variable {var_name} not found in {filename}!")
        return False
        
    # Extract the JS array
    # A simple parser that finds the matching opening bracket [ and closing bracket ]
    arr_start = content.find("[", idx)
    if arr_start == -1:
        print(f"ERROR: Could not find array start '[' in {filename}!")
        return False
        
    # Find the matching closing bracket by counting nesting levels
    nesting = 0
    arr_end = -1
    for i in range(arr_start, len(content)):
        char = content[i]
        if char == '[':
            nesting += 1
        elif char == ']':
            nesting -= 1
            if nesting == 0:
                arr_end = i
                break
                
    if arr_end == -1:
        print(f"ERROR: Could not find matching closing bracket ']' in {filename}!")
        return False
        
    js_array_str = content[arr_start:arr_end+1]
    
    # We can turn it into JSON by:
    # 1. Handling single quotes and backticks (replacing them with double quotes or removing them)
    # But wait, it's easier to parse key-value pairs using regular expressions for a quick sanity check,
    # or write a small JS evaluation using Python, or parse using a robust python-js parser.
    # Since it's a simple JS file with standard formatting, let's extract each object matching `{ ... }`
    # and find their fields using regex.
    
    # Let's split by the `{` and `}` boundaries
    # We can do nesting counts for `{` and `}` to extract objects
    objects = []
    nesting = 0
    obj_start = -1
    for i in range(arr_start, arr_end+1):
        char = content[i]
        if char == '{':
            if nesting == 0:
                obj_start = i
            nesting += 1
        elif char == '}':
            nesting -= 1
            if nesting == 0 and obj_start != -1:
                objects.append(content[obj_start:i+1])
                obj_start = -1
                
    print(f"Found {len(objects)} questions in {filename}.")
    if len(objects) == 0:
        print("ERROR: No questions found!")
        return False
        
    success = True
    for idx, obj in enumerate(objects):
        q_num = idx + 1
        # Extract fields using regex
        # Pattern: fieldName: 'value' or fieldName: "value" or fieldName: `value` or fieldName: value
        fields_found = {}
        
        # Match keys (unquoted keys or single/double quoted keys)
        # e.g., id: 1, difficulty: '★☆☆', dbGroup: "school"
        # We can find all keys followed by a colon
        # Let's extract key-value pairs by parsing lines or using a regex
        # We can find occurrences of key: followed by value
        # A simple approach: search for key: in the object string
        for field in required_fields:
            # We want to match: field: followed by value
            # It could have spaces or newlines: field \s* :
            pattern = rf"\b{field}\s*:"
            match = re.search(pattern, obj)
            if not match:
                print(f"  [Q {q_num}] ERROR: Missing field '{field}'!")
                success = False
            else:
                fields_found[field] = True
                
        # Also check ID value
        id_match = re.search(r"\bid\s*:\s*(\d+)", obj)
        if id_match:
            qid = int(id_match.group(1))
            if qid != q_num:
                print(f"  [Q {q_num}] WARNING: ID field value is {qid}, expected {q_num} (based on position)")
                
    if success:
        print(f"SUCCESS: {filename} looks correct and has all required fields!")
    return success

if __name__ == '__main__':
    sql_ok = check_file("sql_exam_questions.js", "SQL_EXAM_QUESTIONS", 
                        ["id", "difficulty", "type", "dbGroup", "titleJa", "taskJa", "taskZh", "solutionQuery", "hint"])
    java_ok = check_file("java_exam_questions.js", "JAVA_EXAM_QUESTIONS", 
                         ["id", "difficulty", "type", "titleJa", "taskJa", "taskZh", "stdinExample", "expectedOutput", "solutionCode", "templateCode", "hint"])
    python_ok = check_file("python_exam_questions.js", "PYTHON_EXAM_QUESTIONS", 
                           ["id", "difficulty", "type", "titleJa", "taskJa", "taskZh", "expectedOutput", "solutionCode", "hint", "templateCode"])
                           
    if sql_ok and java_ok and python_ok:
        print("\nALL EXAM QUESTION POOLS ARE VALID AND WELL-FORMED!")
    else:
        print("\nSOME EXAM QUESTION POOLS HAVE VALIDATION ERRORS!")
