import os
import re

files_to_check = [
    'it_passport_past_exams.js',
    'sg_past_exams.js',
    'java_exam_questions.js',
    'python_exam_questions.js',
    'sql_exam_questions.js',
    'index.html',
    'app.js',
    'db.js'
]

for fn in files_to_check:
    if not os.path.exists(fn):
        print(f"File {fn} does not exist")
        continue
        
    print('==' * 20)
    print('File:', fn)
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Search for URLs starting with http or https
    urls = re.findall(r'https?://[^\s\"\'\>]+', content)
    print('Found', len(urls), 'URLs in total.')
    
    unique_urls = sorted(list(set(urls)))
    print(f'Unique URLs count: {len(unique_urls)}')
    
    # Filter for image URLs
    img_urls = [u for u in unique_urls if any(u.lower().endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg'])]
    print(f'Image URLs count: {len(img_urls)}')
    
    # Print a sample of 20 URLs (including images)
    print('Sample 10 Image URLs:')
    for u in img_urls[:10]:
        print('  ', u)
        
    non_img_urls = [u for u in unique_urls if u not in img_urls]
    print('Sample 10 Non-Image URLs:')
    for u in non_img_urls[:10]:
        print('  ', u)
