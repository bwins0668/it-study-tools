with open("index.css", "r", encoding="utf-8") as f:
    for idx, line in enumerate(f, 1):
        if "--python" in line:
            print(f"{idx}: {line.strip()}")
