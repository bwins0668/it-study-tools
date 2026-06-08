with open("index.css", "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "table" in line or "th" in line or "td" in line:
            if idx > 1180 and idx < 1400: # Search in the typical zone
                print(f"Line {idx+1}: {line.strip()}")
