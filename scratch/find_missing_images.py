import re
import os

with open("it_passport_past_exams.js", "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for any occurrences of "itpassportsiken" in the file
matches = re.findall(r'[^\s"\'<>]*(?:itpassportsiken)[^\s"\'<>]*', content)
print(f"Found {len(matches)} matches:")
for m in matches[:10]:
    print(" -", m)
