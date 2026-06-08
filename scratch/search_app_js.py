with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# Search for the function rendering lessons or editing area
idx = content.find("function loadLesson")
if idx != -1:
    print("Found loadLesson around char:", idx)
    print(content[idx:idx+1500])
else:
    print("loadLesson not found. Let's search for lesson switch logic.")
    idx2 = content.find("currentSubject")
    if idx2 != -1:
        print("Found currentSubject at char:", idx2)
        print(content[idx2:idx2+800])
