import os
import re
import json
import urllib.request
import urllib.parse
import ssl

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

# Create local image directory if it doesn't exist
IMG_DIR = "kakomon_img"
os.makedirs(IMG_DIR, exist_ok=True)

def download_image(url, local_path):
    # Setup SSL context that bypasses cert validation if needed, to prevent SSL errors on some systems
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=10, context=ctx) as response:
            if response.status == 200:
                with open(local_path, "wb") as f:
                    f.write(response.read())
                return True
            else:
                print(f"  [ERROR] HTTP Status: {response.status} for {url}")
    except Exception as e:
        print(f"  [ERROR] Failed to download {url}: {e}")
    return False

def main():
    print("Reading it_passport_past_exams.js...")
    with open("it_passport_past_exams.js", "r", encoding="utf-8") as f:
        content = f.read()

    # Find the JSON array
    json_match = re.search(r"const\s+IT_PASSPORT_PAST_EXAMS\s*=\s*(\[[\s\S]*\]);?\s*$", content)
    if not json_match:
        print("[ERROR] Could not find IT_PASSPORT_PAST_EXAMS array in the JS file!")
        return

    questions = json.loads(json_match.group(1))
    print(f"Loaded {len(questions)} questions.")

    downloaded = 0
    updated_questions = 0
    errors = 0

    # Pattern to match remote images
    # Example: https://www.itpassportsiken.com/kakomon/01_aki/img/01.png
    remote_pattern = r'https://www\.itpassportsiken\.com/kakomon/([^/]+)/img/([^"\'\s>\\#?]+)'

    # Cache of already downloaded URLs to avoid duplicate requests
    url_to_local_cache = {}

    for idx, q in enumerate(questions):
        year_id = q.get("yearId", "unknown")
        q_num = q.get("number", 0)
        q_id = q.get("id", f"{year_id}_Q{q_num}")
        
        # Check question, explanation, and options HTML strings
        targets = []
        if q.get("question"):
            targets.append(("question", None, q["question"]))
        if q.get("explanation"):
            targets.append(("explanation", None, q["explanation"]))
        if q.get("options"):
            for o_idx, opt in enumerate(q["options"]):
                targets.append(("options", o_idx, opt))
                
        q_updated = False
        for field, opt_idx, html in targets:
            # Find all remote images in this HTML
            matches = re.findall(remote_pattern, html)
            if not matches:
                continue
                
            new_html = html
            for year, filename in matches:
                remote_url = f"https://www.itpassportsiken.com/kakomon/{year}/img/{filename}"
                
                # Make local filename safe
                filename_safe = filename.replace("/", "_").replace("\\", "_")
                local_filename = f"ip_{year}_img_{filename_safe}"
                local_path = os.path.join(IMG_DIR, local_filename)
                local_rel_path = f"kakomon_img/{local_filename}"
                
                # Download if not already in cache or local file doesn't exist
                if remote_url not in url_to_local_cache:
                    if os.path.exists(local_path):
                        # File already downloaded previously
                        url_to_local_cache[remote_url] = local_rel_path
                    else:
                        print(f"[{q_id}] Downloading {remote_url}...")
                        if download_image(remote_url, local_path):
                            url_to_local_cache[remote_url] = local_rel_path
                            downloaded += 1
                        else:
                            errors += 1
                            continue # Skip replacement if download failed
                
                # Perform the replacement in HTML string
                new_html = new_html.replace(remote_url, local_rel_path)
                # Also replace the escaped format if it exists
                escaped_remote_url = remote_url.replace("/", "\\/")
                escaped_local_path = local_rel_path.replace("/", "\\/")
                new_html = new_html.replace(escaped_remote_url, escaped_local_path)
                
            if new_html != html:
                if field == "options":
                    q["options"][opt_idx] = new_html
                else:
                    q[field] = new_html
                q_updated = True
                
        if q_updated:
            updated_questions += 1

    print("--- Download summary ---")
    print(f"Total downloaded images: {downloaded}")
    print(f"Total download errors: {errors}")
    print(f"Total questions updated: {updated_questions}")

    if downloaded > 0 or updated_questions > 0:
        print("Writing updated questions back to it_passport_past_exams.js...")
        # Recreate the file content
        js_content = f"// IT Passport Past Exam Questions (H28 - R8)\n// Scraped from https://www.itpassportsiken.com/\n\nconst IT_PASSPORT_PAST_EXAMS = {json.dumps(questions, ensure_ascii=False, indent=2)};\n"
        with open("it_passport_past_exams.js", "w", encoding="utf-8") as f:
            f.write(js_content)
        print("it_passport_past_exams.js updated successfully.")
    else:
        print("No changes required in it_passport_past_exams.js.")

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    main()
