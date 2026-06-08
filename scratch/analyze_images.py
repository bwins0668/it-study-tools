import re
import os

files = ['it_passport_past_exams.js', 'sg_past_exams.js']
all_img_sources = set()

for fn in files:
    if not os.path.exists(fn):
        continue
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Let's search for image sources inside img tags or strings, like kakomon/../../img/.. or similar
    # In Javascript files, image sources are often referenced in HTML strings like <img src="https://www.itpassportsiken.com/kakomon/28_haru/img/33.png" ...>
    # or src="kakomon_img/..."
    # Let's find any occurrences of itpassportsiken.com or sg-siken.com or kakomon/../img/.. or similar
    urls = re.findall(r'https?://[^\s\"\'\>]+', content)
    for u in urls:
        # Normalize and remove any trailing characters like backslash or quote from regex match
        u_clean = u.rstrip('\\"\'')
        if any(ext in u_clean.lower() for ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg']):
            all_img_sources.add((fn, u_clean))

print(f"Found {len(all_img_sources)} unique image URLs in past exam JS files:")
for idx, (fn, u) in enumerate(sorted(list(all_img_sources))[:20]):
    print(f"[{fn}] {u}")
if len(all_img_sources) > 20:
    print(f"... and {len(all_img_sources) - 20} more.")
