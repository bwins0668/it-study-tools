import os
import re
import time
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# Target years for crawling
YEARS = {
    "08_haru": "令和8年",
    "07_haru": "令和7年",
    "06_haru": "令和6年",
    "05_haru": "令和5年",
    "04_haru": "令和4年",
    "03_haru": "令和3年"
}

BASE_URL = "https://www.itpassportsiken.com/kakomon/"
IMG_DIR = "kakomon_img"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

if not os.path.exists(IMG_DIR):
    os.makedirs(IMG_DIR)

def sanitize_html(soup_element, year_id, q_num, base_page_url):
    """
    Cleans up HTML element, removes ads, formatting wraps, and downloads images to local directory.
    Replaces img src with local paths.
    """
    if not soup_element:
        return ""
    
    # Remove ads or scripts
    for s in soup_element.find_all(["script", "style", "ins"]):
        s.decompose()
        
    # Process images
    img_idx = 0
    for img in soup_element.find_all("img"):
        src = img.get("src")
        if not src:
            continue
        
        # Build absolute image URL
        abs_img_url = urljoin(base_page_url, src)
        
        # Generate local file name
        ext = os.path.splitext(urlparse(abs_img_url).path)[1]
        if not ext:
            ext = ".png"
        local_filename = f"{year_id}_q{q_num}_{img_idx}{ext}"
        local_filepath = os.path.join(IMG_DIR, local_filename)
        
        # Download image
        try:
            print(f"Downloading image {abs_img_url} to {local_filepath}...")
            img_res = requests.get(abs_img_url, headers=headers, timeout=10)
            if img_res.status_code == 200:
                with open(local_filepath, "wb") as img_file:
                    img_file.write(img_res.content)
                # Replace src in HTML
                img["src"] = f"kakomon_img/{local_filename}"
                img_idx += 1
            else:
                print(f"Failed to download image {abs_img_url}: status {img_res.status_code}")
        except Exception as e:
            print(f"Error downloading image {abs_img_url}: {e}")
            
    # Clean up attributes on tags (remove class, style except width/height if set)
    for tag in soup_element.find_all(True):
        if tag.name == "img":
            # keep src, width, height, alt
            attrs = {k: v for k, v in tag.attrs.items() if k in ["src", "width", "height", "alt"]}
            tag.attrs = attrs
        elif tag.name == "table":
            tag.attrs = {"class": "table-style"}
        else:
            tag.attrs = {}
            
    return str(soup_element)

def crawl_exam_index(year_id):
    """
    Parses the year's index page to extract category, topic and subcategory for each question.
    """
    index_url = f"{BASE_URL}{year_id}/"
    print(f"Fetching index for {YEARS[year_id]} ({index_url})...")
    
    res = requests.get(index_url, headers=headers, timeout=15)
    res.encoding = 'utf-8'
    soup = BeautifulSoup(res.text, 'html.parser')
    
    q_meta_map = {}
    
    qtable = soup.find(class_="qtable")
    if not qtable:
        print(f"Could not find qtable for {year_id}")
        return q_meta_map
        
    current_category = "テクノロジ系" # default fallback
    
    for tr in qtable.find_all("tr"):
        # Check if header row indicating category
        th_header = tr.find("th", colspan="4")
        if th_header:
            text = th_header.get_text(strip=True)
            if "ストラテジ" in text:
                current_category = "ストラテジ系"
            elif "マネジメント" in text:
                current_category = "マネジメント系"
            elif "テクノロジ" in text:
                current_category = "テクノロジ系"
            continue
            
        tds = tr.find_all("td")
        if len(tds) >= 3:
            # Column 0: e.g. <a href="q1.html">問1</a>
            a_tag = tds[0].find("a")
            if not a_tag:
                continue
            href = a_tag.get("href")
            q_num_match = re.search(r"q(\d+)\.html", href)
            if not q_num_match:
                continue
            q_num = int(q_num_match.group(1))
            
            topic = tds[1].get_text(strip=True)
            subcategory = tds[2].get_text(strip=True)
            
            q_meta_map[q_num] = {
                "category": current_category,
                "topic": topic,
                "subcategory": subcategory
            }
            
    print(f"Found metadata for {len(q_meta_map)} questions in {year_id}")
    return q_meta_map

def crawl_question(year_id, year_name, q_num, meta):
    """
    Fetches and parses a single question page.
    """
    q_url = f"{BASE_URL}{year_id}/q{q_num}.html"
    print(f"  Fetching Q{q_num} ({q_url})...")
    
    # Retry logic
    for attempt in range(3):
        try:
            res = requests.get(q_url, headers=headers, timeout=10)
            if res.status_code == 200:
                break
            time.sleep(1)
        except Exception as e:
            print(f"    Attempt {attempt+1} failed: {e}")
            time.sleep(1)
    else:
        print(f"    Failed to fetch {q_url} after 3 attempts.")
        return None
        
    res.encoding = 'utf-8'
    soup = BeautifulSoup(res.text, 'html.parser')
    
    # Parse question body
    mondai = soup.find(id="mondai")
    if not mondai:
        print(f"    Warning: No question body found for Q{q_num}")
        return None
        
    question_html = sanitize_html(mondai, year_id, q_num, q_url)
    
    # Parse choices
    select_list = soup.find(class_="selectList")
    if not select_list:
        print(f"    Warning: No choice list found for Q{q_num}")
        return None
        
    options = []
    answer_idx = -1
    
    for idx, li in enumerate(select_list.find_all("li")):
        btn = li.find("button")
        text_span = li.find("span")
        if not btn or not text_span:
            continue
            
        # Check correct answer (ID is 't' for target/true)
        if btn.get('id') == 't':
            answer_idx = idx
            
        opt_html = sanitize_html(text_span, year_id, q_num, q_url)
        options.append(opt_html)
        
    if answer_idx == -1:
        print(f"    Warning: Could not identify correct answer for Q{q_num}")
        # Default to a random one, but log it
        answer_idx = 0
        
    # Parse explanation
    kaisetsu = soup.find(id="kaisetsu") or soup.find(class_="kaisetsu")
    explanation_html = sanitize_html(kaisetsu, year_id, q_num, q_url) if kaisetsu else "解説はありません。"
    
    return {
        "id": f"{year_id.upper()}_Q{q_num}",
        "year": year_name,
        "yearId": year_id,
        "number": q_num,
        "category": meta.get("category", "テクノロジ系"),
        "topic": meta.get("topic", ""),
        "subcategory": meta.get("subcategory", ""),
        "question": question_html,
        "options": options,
        "answer": answer_idx,
        "explanation": explanation_html
    }

def main():
    questions = []
    
    for year_id, year_name in YEARS.items():
        # First crawl index metadata
        meta_map = crawl_exam_index(year_id)
        
        # If meta_map is empty, fill with default range values to avoid failing
        if not meta_map:
            print(f"Using default index structure for {year_id}")
            for q_num in range(1, 101):
                if q_num <= 35:
                    cat = "ストラテジ系"
                elif q_num <= 55:
                    cat = "マネジメント系"
                else:
                    cat = "テクノロジ系"
                meta_map[q_num] = {"category": cat, "topic": "真题", "subcategory": "综合"}
                
        # Crawl each of the 100 questions
        for q_num in range(1, 101):
            q_data = crawl_question(year_id, year_name, q_num, meta_map.get(q_num, {}))
            if q_data:
                questions.append(q_data)
            
            # Politeness delay
            time.sleep(0.1)
            
        print(f"Completed {year_name}. Current total questions: {len(questions)}")
        
    # Write to it_passport_past_exams.js
    output_filepath = "it_passport_past_exams.js"
    print(f"Writing {len(questions)} questions to {output_filepath}...")
    
    # Format as valid JS code
    js_content = f"// IT Passport Past Exam Questions (R3 - R8)\n// Scraped from https://www.itpassportsiken.com/\n\nconst IT_PASSPORT_PAST_EXAMS = {json.dumps(questions, ensure_ascii=False, indent=2)};\n"
    
    with open(output_filepath, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print("Success! Past exam database created successfully.")

if __name__ == "__main__":
    main()
