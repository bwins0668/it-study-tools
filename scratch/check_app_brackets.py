def check_brackets(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    stack = []
    line_num = 1
    col_num = 1
    errors = []
    
    in_string = False
    string_char = None
    in_comment = False
    comment_type = None  # 'line' or 'block'
    
    i = 0
    while i < len(content):
        char = content[i]
        
        # Track line and column numbers
        if char == '\n':
            line_num += 1
            col_num = 1
        else:
            col_num += 1
            
        # Handle comments
        if in_comment:
            if comment_type == 'line' and char == '\n':
                in_comment = False
            elif comment_type == 'block' and char == '*' and i + 1 < len(content) and content[i+1] == '/':
                in_comment = False
                i += 1
                col_num += 1
            i += 1
            continue
            
        # Handle strings
        if in_string:
            if char == '\\':
                # Skip next char (escaped)
                i += 2
                col_num += 2
                continue
            if char == string_char:
                in_string = False
            i += 1
            continue
            
        # Detect comment start
        if char == '/' and i + 1 < len(content):
            next_char = content[i+1]
            if next_char == '/':
                in_comment = True
                comment_type = 'line'
                i += 2
                col_num += 2
                continue
            elif next_char == '*':
                in_comment = True
                comment_type = 'block'
                i += 2
                col_num += 2
                continue
                
        # Detect string start
        if char in ["'", '"', '`']:
            in_string = True
            string_char = char
            i += 1
            continue
            
        # Handle brackets
        if char in ['(', '[', '{']:
            stack.append((char, line_num, col_num))
        elif char in [')', ']', '}']:
            if not stack:
                errors.append(f"Unmatched closing '{char}' at line {line_num}, col {col_num}")
            else:
                top, l, c = stack.pop()
                if (char == ')' and top != '(') or (char == ']' and top != '[') or (char == '}' and top != '{'):
                    errors.append(f"Mismatched closing '{char}' at line {line_num}, col {col_num} (matches '{top}' from line {l}, col {c})")
                    
        i += 1
        
    while stack:
        top, l, c = stack.pop()
        errors.append(f"Unclosed opening '{top}' from line {l}, col {c}")
        
    if errors:
        print(f"Brackets check failed for {filename}:")
        for err in errors[:10]:
            print(f"  {err}")
    else:
        print(f"Brackets check passed for {filename}!")
        
if __name__ == '__main__':
    check_brackets("app.js")
