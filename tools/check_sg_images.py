import os
import re
import json
import requests

# Read sg_past_exams.js and extract the JSON array.
with open("sg_past_exams.js", "r", encoding="utf-8") as f:
    content = f.read()

# Match the json array
json_match = re.search(r"const\s+SG_PAST_EXAMS\s*=\s*(\[[\s\S]*\]);?\s*$", content)
if not json_match:
    print("Could not find SG_PAST_EXAMS array in JS file!")
    exit(1)

questions = json.loads(json_match.group(1))
print(f"Loaded {len(questions)} questions.")

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

# Directory to save images
IMG_DIR = "kakomon_img"
if not os.path.exists(IMG_DIR):
    os.makedirs(IMG_DIR)

updated_count = 0
download_count = 0

def download_and_rewrite_image(html, year_id, q_number):
    global download_count
    if not html:
        return html
    
    # Match src="..." or src='...'
    img_tags = re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', html)
    
    for src in img_tags:
        if src.startswith("kakomon_img/"):
            continue
            
        clean_year_id = year_id.replace("sg_", "")
        
        # Original URL
        # E.g., src is "img/13_3.png"
        abs_img_url = f"https://www.sg-siken.com/kakomon/{clean_year_id}/{src}"
        
        # Determine local filename
        ext = os.path.splitext(src)[1]
        if not ext:
            ext = ".png"
        filename_safe = src.replace("/", "_").replace("\\", "_")
        local_filename = f"sg_{clean_year_id}_q{q_number}_{filename_safe}"
        local_filepath = os.path.join(IMG_DIR, local_filename)
        
        try:
            print(f"Downloading image {abs_img_url} to {local_filepath}...")
            res = requests.get(abs_img_url, headers=headers, timeout=10)
            if res.status_code == 200:
                with open(local_filepath, "wb") as img_file:
                    img_file.write(res.content)
                new_src = f"kakomon_img/{local_filename}"
                html = html.replace(f'src="{src}"', f'src="{new_src}"')
                html = html.replace(f"src='{src}'", f"src='{new_src}'")
                download_count += 1
                print(f"  Successfully downloaded and rewrote: {src} -> {new_src}")
            else:
                print(f"  Failed: status {res.status_code}")
        except Exception as e:
            print(f"  Error downloading {abs_img_url}: {e}")
            
    return html

# Perform scan and update
for idx, q in enumerate(questions):
    year_id = q["yearId"]
    q_number = q["number"]
    
    orig_q = q["question"]
    orig_exp = q["explanation"]
    
    q["question"] = download_and_rewrite_image(q["question"], year_id, q_number)
    q["explanation"] = download_and_rewrite_image(q["explanation"], year_id, q_number)
    
    if q["question"] != orig_q or q["explanation"] != orig_exp:
        updated_count += 1

print(f"Total updated questions: {updated_count}")
print(f"Total downloaded images: {download_count}")

# Write back if there were changes
if updated_count > 0:
    print("Writing back to sg_past_exams.js...")
    js_content = f"// SG Past Exam Questions (H28 - R7)\n// Scraped from https://www.sg-siken.com/\n\nconst SG_PAST_EXAMS = {json.dumps(questions, ensure_ascii=False, indent=2)};\n"
    with open("sg_past_exams.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    print("sg_past_exams.js updated successfully.")
else:
    print("No changes needed in sg_past_exams.js.")
