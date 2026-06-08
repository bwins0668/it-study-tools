import sys

def count_questions(filename, var_name):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
        
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    idx = content.find(var_name)
    if idx == -1:
        print(f'{filename}: Variable {var_name} not found')
        return
    arr_start = content.find('[', idx)
    
    braces = 0
    in_str = False
    str_char = None
    count = 0
    i = arr_start
    while i < len(content):
        char = content[i]
        if in_str:
            if char == '\\':
                i += 2
                continue
            if char == str_char:
                in_str = False
        else:
            if char in ["'", '"', '`']:
                in_str = True
                str_char = char
            elif char == '{':
                if braces == 0:
                    count += 1
                braces += 1
            elif char == '}':
                braces -= 1
        i += 1
    print(f'{filename}: Found {count} questions')

if __name__ == '__main__':
    count_questions('it_passport_past_exams.js', 'IT_PASSPORT_PAST_EXAMS')
    count_questions('sg_past_exams.js', 'SG_PAST_EXAMS')
