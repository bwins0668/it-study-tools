with open("upgrade_lessons.py", encoding="utf-8") as f:
    content = f.read()

import re
matches = [m.start() for m in re.finditer(r'assigned_quiz = \[\]', content)]
for pos in matches:
    start_line = content.rfind('\n', 0, pos) + 1
    end_line = content.find('\n', pos)
    line = content[start_line:end_line]
    line_num = content[:pos].count('\n') + 1
    print(f"Line {line_num}: {line.strip()}")
