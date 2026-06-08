# -*- coding: utf-8 -*-
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

project_root = Path(__file__).resolve().parents[1]
lessons_path = project_root / "data" / "lessons.js"

with lessons_path.open("r", encoding="utf-8") as f:
    content = f.read()

titles = re.findall(r'titleJa:\s*["\'](.*?)["\']', content)
print(f"Total titles found: {len(titles)}")
no_hyphen = [t for t in titles if '-' not in t]
print(f"Titles without hyphen: {len(no_hyphen)}")
for t in no_hyphen:
    print(f"  {t}")
