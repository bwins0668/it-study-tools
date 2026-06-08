import requests
from bs4 import BeautifulSoup
import re

headers = {"User-Agent": "Mozilla/5.0"}
for q in range(1, 31):
    url = f"https://www.itpassportsiken.com/kakomon/06_haru/q{q}.html"
    try:
        res = requests.get(url, headers=headers, timeout=5)
        res.encoding = 'utf-8'
        soup = BeautifulSoup(res.text, 'html.parser')
        
        mondai = soup.find(id="mondai")
        kaisetsu = soup.find(id="kaisetsu") or soup.find(class_="kaisetsu")
        
        m_imgs = [img.get('src') for img in mondai.find_all('img')] if mondai else []
        k_imgs = [img.get('src') for img in kaisetsu.find_all('img')] if kaisetsu else []
        
        if m_imgs or k_imgs:
            print(f"Question {q} has images:")
            if m_imgs:
                print(f"  In question: {m_imgs}")
            if k_imgs:
                print(f"  In explanation: {k_imgs}")
    except Exception as e:
        print(f"Error Q{q}: {e}")
