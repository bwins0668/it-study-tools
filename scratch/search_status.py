with open("app.js", "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "playground-status" in line:
            print(f"Line {idx+1}: {line.strip()}")
