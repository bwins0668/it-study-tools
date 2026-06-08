import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

path = r"C:\Users\lvgua\.gemini\antigravity\scratch\sql-learning-hub\index.html"
with open(path, "rb") as f:
    data = f.read()

if data[:3] == b"\xef\xbb\xbf":
    data = data[3:]

decoded = data.decode("utf-8")

# Add http-equiv Content-Type meta right after <head>
old = '<head>\n  <meta charset="UTF-8">'
new = '<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'
if "http-equiv" not in decoded:
    decoded = decoded.replace(old, new, 1)

# Write with BOM
with open(path, "w", encoding="utf-8-sig") as f:
    f.write(decoded)

with open(path, "rb") as f:
    b = f.read(10)
print("Has BOM:", b[:3] == b"\xef\xbb\xbf")
print("Has http-equiv:", b"http-equiv" in open(path, "rb").read())
