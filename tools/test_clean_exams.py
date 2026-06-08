import json
import re

def main():
    with open('it_passport_past_exams.js', encoding='utf-8') as f:
        content = f.read()

    idx = content.find('[')
    json_str = content[idx:].strip()
    if json_str.endswith(';'):
        json_str = json_str[:-1].strip()

    exams = json.loads(json_str)
    
    mismatches = 0
    cleaned_examples = []
    
    for i, q in enumerate(exams):
        sub = q.get('subcategory', '')
        if len(sub) > 40:
            # Clean using regex
            clean_sub = re.split(r'問\d+|問[０-９]+', sub)[0].strip()
            # If the clean sub still has some garbage, e.g. ends with a number or contains other questions
            cleaned_examples.append((sub, clean_sub))
            
    print(f"Total long subcategories: {len(cleaned_examples)}")
    print("\nSome examples of cleaning:")
    for orig, clean in cleaned_examples[:20]:
        print(f"Original: {orig[:80]}...")
        print(f"Cleaned : {clean}")
        print("-" * 40)

if __name__ == '__main__':
    main()
