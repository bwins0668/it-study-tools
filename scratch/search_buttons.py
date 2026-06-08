import sys

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

def print_line(idx, line):
    line_safe = line.strip().encode('ascii', errors='replace').decode('ascii')
    print(f"Line {idx+1}: {line_safe}")

with open("index.html", "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "btn" in line or "button" in line or "kbd" in line:
            if "run" in line or "exec" in line or "query" in line or "Ctrl" in line:
                print_line(idx, line)
