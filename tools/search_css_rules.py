with open("index.css", "r", encoding="utf-8") as f:
    for idx, line in enumerate(f, 1):
        if "itpass" in line or "passport" in line or "dojo" in line:
            print(f"{idx}: {line.strip()}")
