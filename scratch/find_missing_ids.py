import re
import os
import sys

def main():
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
        
    html_file = 'index.html'
    js_file = 'app.js'
    
    if not os.path.isfile(html_file) or not os.path.isfile(js_file):
        print("ERROR: HTML or JS file not found.")
        return
        
    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()
        
    # Regex to find all ids in HTML: id="something" or id='something'
    html_ids = set()
    matches = re.findall(r'\bid\s*=\s*[\"\']([a-zA-Z0-9_-]+)[\"\']', html)
    html_ids.update(matches)
    
    print(f"Found {len(html_ids)} unique IDs in index.html")
    
    with open(js_file, 'r', encoding='utf-8') as f:
        js = f.read()
        
    js_ids = set(re.findall(r'getElementById\(\s*[\"\']([a-zA-Z0-9_-]+)[\"\']\s*\)', js))
    print(f"Found {len(js_ids)} unique IDs accessed via getElementById in app.js")
    
    missing_ids = js_ids - html_ids
    print(f"\nMissing IDs in index.html (accessed in app.js but not defined in index.html): {len(missing_ids)}")
    for mid in sorted(missing_ids):
        print(f"\n- {mid}:")
        lines = js.split('\n')
        count = 0
        for idx, line in enumerate(lines):
            if mid in line:
                print(f"    Line {idx+1}: {line.strip()}")
                count += 1
                if count >= 3:
                    break

if __name__ == '__main__':
    main()
