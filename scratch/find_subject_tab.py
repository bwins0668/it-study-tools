with open("index.css", "r", encoding="utf-8") as f:
    for idx, line in enumerate(f, 1):
        if "subject-tab" in line or "subject-selector" in line or "run-query" in line or "run-btn" in line:
            print(f"{idx}: {line.strip()}")
