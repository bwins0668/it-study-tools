import json
import re
import os

def clean_text(text):
    if not text:
        return ""
    # Split by 問 followed by digits or full-width digits
    parts = re.split(r'問\d+|問[０-９]+', text)
    return parts[0].strip()

def main():
    db_file = 'it_passport_past_exams.js'
    print(f"Reading {db_file}...")
    with open(db_file, encoding='utf-8') as f:
        content = f.read()

    idx = content.find('[')
    if idx == -1:
        print("ERROR: Could not find start of array.")
        return

    prefix = content[:idx]
    json_str = content[idx:].strip()
    if json_str.endswith(';'):
        json_str = json_str[:-1].strip()

    try:
        exams = json.loads(json_str)
        print(f"Successfully loaded {len(exams)} questions.")
    except Exception as e:
        print("JSON parse error:", e)
        return

    cleaned_sub_count = 0
    cleaned_topic_count = 0

    for q in exams:
        sub = q.get('subcategory', '')
        topic = q.get('topic', '')

        # Clean subcategory
        if len(sub) > 40:
            cleaned_sub = clean_text(sub)
            if cleaned_sub != sub:
                q['subcategory'] = cleaned_sub
                cleaned_sub_count += 1

        # Clean topic
        if len(topic) > 40:
            cleaned_topic = clean_text(topic)
            if cleaned_topic != topic:
                q['topic'] = cleaned_topic
                cleaned_topic_count += 1

    print(f"Cleaned {cleaned_sub_count} subcategories and {cleaned_topic_count} topics.")

    # Write back to JS file
    print("Writing back to database file...")
    # Format with indentation for readability, keeping double quotes
    new_json = json.dumps(exams, ensure_ascii=False, indent=2)
    
    with open(db_file, 'w', encoding='utf-8') as f:
        f.write(prefix + new_json + ";\n")

    print("SUCCESS: Database file successfully cleaned and written!")

if __name__ == '__main__':
    main()
