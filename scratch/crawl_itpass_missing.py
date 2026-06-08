import os
import re
import time
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Target years for missing IT Passport questions
# Heisei 28 to Reiwa 2
YEARS = {
    "02_aki": "令和2年秋期",
    "01_aki": "令和元年秋期",
    "31_haru": "平成31年春期",
    "30_aki": "平成30年秋期",
    "30_haru": "平成30年春期",
    "29_aki": "平成29年秋期",
    "29_haru": "平成29年春期",
    "28_aki": "平成28年秋期",
    "28_haru": "平成28年春期"
}

BASE_URL = "https://www.itpassportsiken.com/kakomon/"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def sanitize_html(soup_element, base_page_url):
    if not soup_element:
        return ""
    for s in soup_element.find_all(["script", "style", "ins"]):
        s.decompose()
    for img in soup_element.find_all("img"):
        src = img.get("src")
        if src:
            abs_img_url = urljoin(base_page_url, src)
            img["src"] = abs_img_url
    for tag in soup_element.find_all(True):
        if tag.name == "img":
            attrs = {k: v for k, v in tag.attrs.items() if k in ["src", "width", "height", "alt"]}
            tag.attrs = attrs
        elif tag.name == "table":
            tag.attrs = {"class": "table-style"}
        else:
            tag.attrs = {}
    return str(soup_element)

def crawl_exam_index(year_id):
    index_url = f"{BASE_URL}{year_id}/"
    print(f"Fetching index for {YEARS[year_id]} ({index_url})...")
    try:
        res = requests.get(index_url, headers=headers, timeout=15)
        res.encoding = 'utf-8'
        soup = BeautifulSoup(res.text, 'html.parser')
        
        q_meta_map = {}
        qtable = soup.find(class_="qtable")
        if not qtable:
            return q_meta_map
            
        current_category = "テクノロジ系"
        for tr in qtable.find_all("tr"):
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
        return q_meta_map
    except Exception as e:
        print(f"Error fetching index for {year_id}: {e}")
        return {}

def crawl_question(year_id, year_name, q_num, meta):
    q_url = f"{BASE_URL}{year_id}/q{q_num}.html"
    for attempt in range(3):
        try:
            res = requests.get(q_url, headers=headers, timeout=10)
            if res.status_code == 200:
                break
            time.sleep(1)
        except Exception:
            time.sleep(1)
    else:
        return None
        
    res.encoding = 'utf-8'
    soup = BeautifulSoup(res.text, 'html.parser')
    
    mondai = soup.find(id="mondai")
    if not mondai:
        return None
    question_html = sanitize_html(mondai, q_url)
    
    select_list = soup.find(class_="selectList")
    if not select_list:
        return None
        
    options = []
    answer_idx = -1
    for idx, li in enumerate(select_list.find_all("li")):
        btn = li.find("button")
        text_span = li.find("span")
        if not btn or not text_span:
            continue
        if btn.get('id') == 't':
            answer_idx = idx
        opt_html = sanitize_html(text_span, q_url)
        options.append(opt_html)
        
    if answer_idx == -1:
        answer_idx = 0
        
    kaisetsu = soup.find(id="kaisetsu") or soup.find(class_="kaisetsu")
    explanation_html = sanitize_html(kaisetsu, q_url) if kaisetsu else "解説はありません。"
    
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
    # Load existing questions
    existing_file = "it_passport_past_exams.js"
    existing_questions = []
    
    if os.path.exists(existing_file):
        print(f"Reading existing IT Passport database {existing_file}...")
        with open(existing_file, "r", encoding="utf-8") as f:
            content = f.read()
        idx = content.find("[")
        if idx != -1:
            json_str = content[idx:].strip()
            if json_str.endswith(";"):
                json_str = json_str[:-1].strip()
            try:
                existing_questions = json.loads(json_str)
                print(f"Found {len(existing_questions)} existing questions.")
            except Exception as e:
                print(f"Failed to parse existing JSON: {e}")
    
    new_questions = []
    for year_id, year_name in YEARS.items():
        # Check if we already have questions for this year to avoid duplicate crawling
        if any(q.get("yearId") == year_id for q in existing_questions):
            print(f"Year {year_name} ({year_id}) already exists in database. Skipping...")
            continue
            
        meta_map = crawl_exam_index(year_id)
        if not meta_map:
            print(f"Using fallback metadata for {year_id}")
            for q_num in range(1, 101):
                cat = "テクノロジ系"
                if q_num <= 35:
                    cat = "ストラテジ系"
                elif q_num <= 55:
                    cat = "マネジメント系"
                meta_map[q_num] = {"category": cat, "topic": "過去問", "subcategory": "総合"}
                
        print(f"Crawling 100 questions for {year_name}...")
        for q_num in range(1, 101):
            q_data = crawl_question(year_id, year_name, q_num, meta_map.get(q_num, {}))
            if q_data:
                new_questions.append(q_data)
            if q_num % 10 == 0:
                print(f"  Processed Q{q_num}...")
            time.sleep(0.02) # Fast polite sleep
            
    # Combine and save
    all_questions = existing_questions + new_questions
    # Sort all questions by yearId and number if needed, but keeping it simple: just keep them appended.
    print(f"Writing total of {len(all_questions)} questions to {existing_file}...")
    
    js_content = f"// IT Passport Past Exam Questions (H28 - R8)\n// Scraped from https://www.itpassportsiken.com/\n\nconst IT_PASSPORT_PAST_EXAMS = {json.dumps(all_questions, ensure_ascii=False, indent=2)};\n"
    with open(existing_file, "w", encoding="utf-8") as f:
        f.write(js_content)
    print("Successfully completed crawling and merging IT Passport past exams!")

if __name__ == "__main__":
    main()
