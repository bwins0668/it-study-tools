with open("app.js", "r", encoding="utf-8") as f:
    for idx, line in enumerate(f, 1):
        if line.strip().startswith("function "):
            print(f"{idx}: {line.strip()}")
