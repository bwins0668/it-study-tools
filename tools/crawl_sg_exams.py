import os
import re
import time
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import copy

# Target years for SG crawling
YEARS = {
    "07_haru": "令和7年",
    "06_haru": "令和6年",
    "05_haru": "令和5年",
    "01_aki": "令和元年秋",
    "31_haru": "平成31年春",
    "30_aki": "平成30年秋",
    "30_haru": "平成30年春",
    "29_aki": "平成29年秋",
    "29_haru": "平成29年春",
    "28_aki": "平成28年秋",
    "28_haru": "平成28年春"
}

BASE_URL = "https://www.sg-siken.com/kakomon/"
IMG_DIR = "kakomon_img"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

if not os.path.exists(IMG_DIR):
    os.makedirs(IMG_DIR)

def clean_text(text):
    if not text:
        return ""
    # Split by 問 followed by digits
    parts = re.split(r'問\d+|問[０-９]+', text)
    return parts[0].strip()

def sanitize_html(soup_element, year_id, q_label, base_page_url):
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
        
        abs_img_url = urljoin(base_page_url, src)
        ext = os.path.splitext(urlparse(abs_img_url).path)[1]
        if not ext:
            ext = ".png"
        local_filename = f"sg_{year_id}_{q_label}_{img_idx}{ext}"
        local_filepath = os.path.join(IMG_DIR, local_filename)
        
        try:
            print(f"Downloading image {abs_img_url} to {local_filepath}...")
            img_res = requests.get(abs_img_url, headers=headers, timeout=10)
            if img_res.status_code == 200:
                with open(local_filepath, "wb") as img_file:
                    img_file.write(img_res.content)
                img["src"] = f"kakomon_img/{local_filename}"
                img_idx += 1
            else:
                print(f"Failed to download image {abs_img_url}: status {img_res.status_code}")
        except Exception as e:
            print(f"Error downloading image {abs_img_url}: {e}")
            
    for tag in soup_element.find_all(True):
        if tag.name == "img":
            attrs = {k: v for k, v in tag.attrs.items() if k in ["src", "width", "height", "alt"]}
            tag.attrs = attrs
        elif tag.name == "table":
            tag.attrs = {"class": "table-style"}
        else:
            tag.attrs = {}
            
    return str(soup_element)

def get_major_category(subcategory, href):
    if href.startswith("b") or "科目B" in subcategory:
        return "科目B"
        
    tech_keywords = [
        "対策", "技術", "暗号", "認証", "データベース", "データ通信", 
        "ネットワーク", "システム構成", "ソフトウェア", "ハードウェア"
    ]
    mgmt_keywords = [
        "管理", "監査", "サービスマネジメント", "プロジェクト", "プロセス", "開発", "改善"
    ]
    strat_keywords = [
        "法規", "知的財産", "法務", "経営", "組織", "企画", "調達", "戦略", "企業"
    ]
    
    for kw in strat_keywords:
        if kw in subcategory:
            return "ストラテジ系"
    for kw in mgmt_keywords:
        if kw in subcategory:
            return "マネジメント系"
    for kw in tech_keywords:
        if kw in subcategory:
            return "テクノロジ系"
            
    if "セキュリティ" in subcategory:
        if "管理" in subcategory or "規程" in subcategory or "組織" in subcategory:
            return "マネジメント系"
        return "テクノロジ系"
        
    return "テクノロジ系"

def crawl_exam_index(year_id):
    index_url = f"{BASE_URL}{year_id}/"
    print(f"Fetching index for {YEARS[year_id]} ({index_url})...")
    
    res = requests.get(index_url, headers=headers, timeout=15)
    res.encoding = 'utf-8'
    soup = BeautifulSoup(res.text, 'html.parser')
    
    q_links = []
    qtable = soup.find(class_="qtable")
    if not qtable:
        print(f"Could not find qtable for {year_id}")
        return q_links
        
    # We find all elements in pre-order traversal
    for tag in qtable.find_all(True):
        if tag.name == "a":
            href = tag.get("href")
            if href and (href.startswith("a") or href.startswith("b") or href.startswith("q")) and href.endswith(".html"):
                label = tag.get_text(strip=True)
                
                td_link = tag.find_parent("td")
                if not td_link:
                    continue
                
                topic_td = td_link.find("td")
                if not topic_td:
                    continue
                
                sub_td = topic_td.find("td")
                if not sub_td:
                    continue
                
                topic_copy = copy.copy(topic_td)
                for child in topic_copy.find_all(["td", "tr"]):
                    child.decompose()
                topic = clean_text(topic_copy.text.strip())
                
                sub_copy = copy.copy(sub_td)
                for child in sub_copy.find_all(["td", "tr"]):
                    child.decompose()
                subcategory = clean_text(sub_copy.text.strip())
                
                major_category = get_major_category(subcategory, href)
                
                q_links.append({
                    "label": label,
                    "href": href,
                    "category": major_category,
                    "topic": topic,
                    "subcategory": subcategory
                })
                
    print(f"Found {len(q_links)} questions in {year_id}")
    return q_links

def crawl_question(year_id, year_name, item):
    q_label = item["label"]
    href = item["href"]
    q_url = f"{BASE_URL}{year_id}/{href}"
    print(f"  Fetching {q_label} ({q_url})...")
    
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
    
    mondai = soup.find(id="mondai")
    if not mondai:
        print(f"    Warning: No question body found for {q_label}")
        return None
        
    question_html = sanitize_html(mondai, year_id, q_label, q_url)
    
    select_list = soup.find(class_="selectList")
    if not select_list:
        print(f"    Warning: No choice list found for {q_label}")
        return None
        
    options = []
    answer_idx = -1
    
    buttons = select_list.find_all("button")
    li_tags = select_list.find_all("li")
    
    if len(buttons) > len(li_tags):
        # Subject B
        for idx, btn in enumerate(buttons):
            if btn.get('id') == 't':
                answer_idx = idx
            options.append(btn.get_text(strip=True))
            
        # Append images in selectList to question body
        for img in select_list.find_all("img"):
            img_html = sanitize_html(img, year_id, q_label, q_url)
            question_html += "<br><div class='select-images'>" + img_html + "</div>"
    else:
        # Subject A
        for idx, li in enumerate(li_tags):
            btn = li.find("button")
            text_span = li.find("span")
            if btn and btn.get('id') == 't':
                answer_idx = idx
            
            if text_span:
                opt_html = sanitize_html(text_span, year_id, q_label, q_url)
            else:
                opt_html = btn.get_text(strip=True) if btn else ""
            options.append(opt_html)
            
    if answer_idx == -1:
        print(f"    Warning: Could not identify correct answer for {q_label}")
        answer_idx = 0
        
    kaisetsu = soup.find(id="kaisetsu") or soup.find(class_="kaisetsu")
    explanation_html = sanitize_html(kaisetsu, year_id, q_label, q_url) if kaisetsu else "解説はありません。"
    
    # Get question numeric number
    num_match = re.search(r"\d+", q_label)
    q_num = int(num_match.group(0)) if num_match else 1
    
    return {
        "id": f"SG_{year_id.upper()}_{q_label.upper()}",
        "year": year_name,
        "yearId": f"sg_{year_id}",
        "number": q_num,
        "category": item["category"],
        "topic": item["topic"],
        "subcategory": item["subcategory"],
        "question": question_html,
        "options": options,
        "answer": answer_idx,
        "explanation": explanation_html
    }

def main():
    questions = []
    
    for year_id, year_name in YEARS.items():
        q_links = crawl_exam_index(year_id)
        
        for item in q_links:
            q_data = crawl_question(year_id, year_name, item)
            if q_data:
                questions.append(q_data)
            time.sleep(0.05)
            
        print(f"Completed {year_name}. Current total questions: {len(questions)}")
        
    output_filepath = "sg_past_exams.js"
    print(f"Writing {len(questions)} questions to {output_filepath}...")
    
    js_content = f"// SG Past Exam Questions (H28 - R7)\n// Scraped from https://www.sg-siken.com/\n\nconst SG_PAST_EXAMS = {json.dumps(questions, ensure_ascii=False, indent=2)};\n"
    
    with open(output_filepath, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print("Success! SG Past exam database created successfully.")

if __name__ == "__main__":
    main()
