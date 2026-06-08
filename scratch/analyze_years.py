import sys
import re

def analyze_years(filename, var_name):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
        
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    idx = content.find(var_name)
    if idx == -1:
        print(f'{filename}: Variable {var_name} not found')
        return
    arr_start = content.find('[', idx)
    
    # We want to find the years in the objects
    years = re.findall(r'year\s*:\s*[\"\'](.*?)[\"\']', content[arr_start:])
    unique_years = sorted(list(set(years)))
    print(f'{filename} unique years ({len(unique_years)}):', unique_years)

if __name__ == '__main__':
    analyze_years('it_passport_past_exams.js', 'const IT_PASSPORT_PAST_EXAMS')
    analyze_years('sg_past_exams.js', 'const SG_PAST_EXAMS')
