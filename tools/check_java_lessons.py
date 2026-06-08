import re

def main():
    with open('java_lessons.js', encoding='utf-8') as f:
        content = f.read()

    # Find the JAVA_LESSONS array contents
    # Let's extract each object matching { id: ... }
    # A simple way: find all matches of `id:`
    lessons_raw = re.split(r'id:\s*[\"\']([a-zA-Z0-9_-]+)[\"\']', content)[1:]
    
    if not lessons_raw:
        print("ERROR: Failed to split lessons.")
        return

    mismatches = 0
    for i in range(0, len(lessons_raw), 2):
        lesson_id = lessons_raw[i]
        lesson_body = lessons_raw[i+1]
        
        # Extract conceptJa and conceptZh
        # Since they are multiline template literals using backticks, we search for conceptJa: `...`
        # and conceptZh: `...`
        ja_match = re.search(r'conceptJa:\s*`([\s\S]*?)`', lesson_body)
        zh_match = re.search(r'conceptZh:\s*`([\s\S]*?)`', lesson_body)
        
        if ja_match and zh_match:
            ja_text = ja_match.group(1)
            zh_text = zh_match.group(1)
            
            ja_h3 = len(re.findall(r'<h3>', ja_text))
            zh_h3 = len(re.findall(r'<h3>', zh_text))
            
            if ja_h3 != zh_h3:
                print(f"WARNING: h3 tag count mismatch in {lesson_id}! ja={ja_h3}, zh={zh_h3}")
                mismatches += 1
            else:
                print(f"OK: {lesson_id} (h3 count: {ja_h3})")
        else:
            print(f"WARNING: Could not parse conceptJa/conceptZh for {lesson_id}")
            
    print(f"Validation complete. Mismatches found: {mismatches}")

if __name__ == '__main__':
    main()
