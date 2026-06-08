with open("it_passport_past_exams.js", "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "itpassportsiken.com" in line and ("img" in line or ".png" in line):
            print(f"Line {idx+1}: {line.strip()}")
