import sys

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

def print_around(filename, line_num, margin=5):
    print(f"=== {filename} around line {line_num} ===")
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    start = max(0, line_num - margin - 1)
    end = min(len(lines), line_num + margin)
    for idx in range(start, end):
        line_safe = lines[idx].strip().encode('ascii', errors='replace').decode('ascii')
        print(f"{idx+1}: {line_safe}")

print_around("app.js", 1962)
print_around("app.js", 2021)
print_around("app.js", 2094)
print_around("app.js", 2447)
print_around("app.js", 4108)
