import requests
from bs4 import BeautifulSoup

url = "https://www.itpassportsiken.com/kakomon/06_haru/q1.html"
headers = {"User-Agent": "Mozilla/5.0"}
res = requests.get(url, headers=headers)
res.encoding = 'utf-8'
soup = BeautifulSoup(res.text, 'html.parser')

print("--- QUESTION ---")
mondai = soup.find(id="mondai")
if mondai:
    print(mondai.get_text(strip=True))

print("--- CHOICES ---")
select_list = soup.find(class_="selectList")
if select_list:
    for li in select_list.find_all("li"):
        btn = li.find("button")
        text = li.find("span")
        if btn and text:
            print(f"{btn.get_text(strip=True)}: {text.get_text(strip=True)}")

print("--- CORRECT ANSWER ---")
# The correct answer is usually indicated by a button with id="t" or similar
# Let's inspect buttons inside selectList
if select_list:
    for li in select_list.find_all("li"):
        btn = li.find("button")
        if btn and btn.get('id') == 't':
            print(f"Correct answer is {btn.get_text(strip=True)}")

print("--- EXPLANATION ---")
# Let's find the explanation section
# It is often inside a div with class="kaisetsu" or id="kaisetsu"
# Let's check elements around content
kaisetsu = soup.find(id="kaisetsu") or soup.find(class_="kaisetsu")
if kaisetsu:
    print(kaisetsu.get_text(strip=True)[:500])
else:
    # Let's search for headers or div containing kaisetsu
    for div in soup.find_all("div"):
        if div.get('id') and 'kaisetsu' in div.get('id').lower():
            print(f"Found div id={div.get('id')}: {div.get_text(strip=True)[:200]}")
        if div.get('class') and any('kaisetsu' in c.lower() for c in div.get('class')):
            print(f"Found div class={div.get('class')}: {div.get_text(strip=True)[:200]}")
    # Let's print all h3 texts to see where the explanation section header is
    for h3 in soup.find_all("h3"):
        print(f"h3: {h3.get_text(strip=True)}")
