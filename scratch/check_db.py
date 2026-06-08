import re

def main():
    with open('db.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple regex to find tables
    # "table_name": [
    tables = re.findall(r'^\s*\"(\w+)\"\s*:\s*\[', content, re.MULTILINE)
    print("Tables in db.js:")
    for t in tables:
        print(f" - {t}")

if __name__ == '__main__':
    main()
