import os
import re

def verify_html():
    print("Checking index.html...")
    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read()
        
    # Check for any external links in critical resource loading tags (script, link, img, iframe)
    external_resources = []
    
    # Check <script src="..."
    scripts = re.findall(r'<script[^>]+src=["\'](https?://[^"\']+)["\']', content)
    external_resources.extend([("script", url) for url in scripts])
    
    # Check <link href="..."
    links = re.findall(r'<link[^>]+href=["\'](https?://[^"\']+)["\']', content)
    # Ignore any stylesheet that might be a preconnect if we missed it, but report it
    external_resources.extend([("link", url) for url in links])
    
    # Check <img src="..."
    imgs = re.findall(r'<img[^>]+src=["\'](https?://[^"\']+)["\']', content)
    external_resources.extend([("img", url) for url in imgs])
    
    if external_resources:
        print("[FAIL] Found external resources in index.html:")
        for tag, url in external_resources:
            print(f"  - <{tag}>: {url}")
        return False
    else:
        print("[OK] No external resources in index.html")
        return True

def verify_js_files():
    js_files = [
        'it_passport_past_exams.js',
        'sg_past_exams.js',
        'java_exam_questions.js',
        'python_exam_questions.js',
        'sql_exam_questions.js',
        'app.js',
        'db.js',
        'lessons.js',
        'it_passport_lessons.js',
        'sg_lessons.js',
        'java_lessons.js',
        'python_lessons.js'
    ]
    
    all_ok = True
    
    for fn in js_files:
        if not os.path.exists(fn):
            continue
        print(f"Checking {fn} for external images...")
        with open(fn, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Search for <img src="http..." or src='http...'
        remote_imgs = re.findall(r'<img[^>]+src=["\'](https?://[^"\']+)["\']', content)
        # Search for standalone absolute URL references to images in strings
        remote_img_urls = re.findall(r'https?://[^\s\"\'\>]+(?:\.png|\.jpg|\.jpeg|\.gif|\.svg)', content)
        
        found = list(set(remote_imgs + remote_img_urls))
        if found:
            print(f"[FAIL] Found {len(found)} remote image references in {fn}:")
            for u in found[:5]:
                print(f"  - {u}")
            if len(found) > 5:
                print(f"  - ... and {len(found) - 5} more")
            all_ok = False
        else:
            print(f"[OK] {fn} has no remote image references")
            
    return all_ok

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    html_ok = verify_html()
    js_ok = verify_js_files()
    
    print("\n=== Final Verification Results ===")
    if html_ok and js_ok:
        print("[SUCCESS] Project is 100% ready for offline deployment!")
    else:
        print("[FAIL] Some online references remain. Please inspect logs.")
