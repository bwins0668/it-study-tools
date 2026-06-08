with open("index.css", "r", encoding="utf-8") as f:
    lines = f.readlines()

selectors_to_find = [
    ".subject-tab", ".lesson-nav-item", "btn", "run", "execute", "play", "active", "header", "card", "progress"
]

for idx, line in enumerate(lines, 1):
    matched = [s for s in selectors_to_find if s in line]
    if matched and "{" in line and idx < 1200:
        # Only print first few selectors
        print(f"Line {idx}: {line.strip()}")
