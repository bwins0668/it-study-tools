import sys
sys.stdout.reconfigure(encoding='utf-8')
with open("index.html", "r", encoding="utf-8") as f:
    for idx, line in enumerate(f, 1):
        if "python-editor" in line or "python-sandbox" in line or "python-play" in line or "python-console" in line:
            print(f"{idx}: {line.strip()}")
