import re

def search_in_file(filename, query):
    print(f"=== Searching in {filename} for '{query}' ===")
    with open(filename, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            if query in line:
                print(f"Line {idx+1}: {line.strip()}")

search_in_file("app.js", "toggleSchemaDetails")
search_in_file("app.js", "run-query-btn")
search_in_file("index.css", "schema-card")
search_in_file("index.css", "console-footer")
search_in_file("index.css", "run-query-btn")
