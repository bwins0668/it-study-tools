with open("index.css", "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "java-run-btn" in line or "python-run-btn" in line:
            print(f"Line {idx+1}: {line.strip()}")
