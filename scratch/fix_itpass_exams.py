import json
import os
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

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

def fix_question(q):
    year_id = q["yearId"]
    q_num = q["number"]
    q_url = f"{BASE_URL}{year_id}/q{q_num}.html"
    
    print(f"Refetching {q['id']} ({q_url})...")
    for attempt in range(3):
        try:
            res = requests.get(q_url, headers=headers, timeout=10)
            if res.status_code == 200:
                break
            time.sleep(1)
        except Exception:
            time.sleep(1)
    else:
        print(f"Failed to fetch {q['id']}")
        return q
        
    res.encoding = 'utf-8'
    soup = BeautifulSoup(res.text, 'html.parser')
    
    mondai = soup.find(id="mondai")
    if not mondai:
        print(f"No question body found for {q['id']}")
        return q
    question_html = sanitize_html(mondai, q_url)
    
    select_list = soup.find(class_="selectList")
    if not select_list:
        print(f"No choice list found for {q['id']}")
        return q
        
    options = []
    answer_idx = -1
    
    buttons = select_list.find_all("button")
    li_tags = select_list.find_all("li")
    
    if len(buttons) > len(li_tags):
        # Case where buttons are inline in a single li (combination questions)
        for idx, btn in enumerate(buttons):
            if btn.get('id') == 't':
                answer_idx = idx
            options.append(btn.get_text(strip=True))
    else:
        for idx, li in enumerate(li_tags):
            btn = li.find("button")
            text_span = li.find("span")
            if not btn:
                continue
            if btn.get('id') == 't':
                answer_idx = idx
            
            if text_span:
                opt_html = sanitize_html(text_span, q_url)
            else:
                opt_html = btn.get_text(strip=True)
            options.append(opt_html)
            
    if answer_idx == -1:
        answer_idx = 0
        
    kaisetsu = soup.find(id="kaisetsu") or soup.find(class_="kaisetsu")
    explanation_html = sanitize_html(kaisetsu, q_url) if kaisetsu else "解説はありません。"
    
    # Update question dict
    q["question"] = question_html
    q["options"] = options
    q["answer"] = answer_idx
    q["explanation"] = explanation_html
    print(f"  Fixed {q['id']} with {len(options)} options. Answer index: {answer_idx}")
    return q

def main():
    filepath = "it_passport_past_exams.js"
    if not os.path.exists(filepath):
        print("Database file not found.")
        return
        
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    idx = content.find("const IT_PASSPORT_PAST_EXAMS =")
    if idx == -1:
        print("Variable declaration not found.")
        return
        
    json_str = content[idx + len("const IT_PASSPORT_PAST_EXAMS ="):].strip()
    if json_str.endswith(";"):
        json_str = json_str[:-1].strip()
        
    exams = json.loads(json_str)
    print(f"Loaded {len(exams)} questions.")
    
    fixed_count = 0
    for q in exams:
        options = q.get("options", [])
        if len(options) == 0:
            fix_question(q)
            fixed_count += 1
            time.sleep(0.05) # Polite sleep
            
    print(f"Fixed {fixed_count} questions.")
    
    if fixed_count > 0:
        js_content = f"// IT Passport Past Exam Questions (H28 - R8)\n// Scraped from https://www.itpassportsiken.com/\n\nconst IT_PASSPORT_PAST_EXAMS = {json.dumps(exams, ensure_ascii=False, indent=2)};\n"
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(js_content)
        print("Updated database file.")
    else:
        print("No questions needed fixing.")

if __name__ == "__main__":
    main()
