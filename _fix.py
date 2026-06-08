import re, os

base = r"C:\Users\lvgua\.gemini\antigravity\scratch\sql-learning-hub"

# ---- Step 3: Add theme-toggle CSS to index.css ----
css_path = os.path.join(base, "assets", "css", "index.css")
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

theme_css = """
/* ---- Theme Toggle Button ---- */
.theme-toggle-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-muted);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: var(--transition-smooth);
  height: 30px;
}

.theme-toggle-btn:hover {
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.3);
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.12);
}

"""

# Insert after .ai-settings-btn i block (or at end of file if not found)
if ".ai-settings-btn i" in css:
    css = css.replace(".ai-settings-btn i {", theme_css + ".ai-settings-btn i {")
else:
    css += theme_css

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css)

print("index.css: theme-toggle CSS added")

# ---- Step 4: Add toggle functions to app.js ----
js_path = os.path.join(base, "assets", "js", "app.js")
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

theme_js = """
/* ====================================================
   Theme Toggle (Dark / Light)
   ==================================================== */

function toggleTheme() {
  const body = document.body;
  const isLight = body.getAttribute("data-theme") === "light";
  const btn = document.getElementById("theme-toggle-btn");
  const icon = btn ? btn.querySelector("i") : null;

  if (isLight) {
    body.removeAttribute("data-theme");
    localStorage.setItem("study-tools-theme", "dark");
    if (icon) icon.className = "fa-solid fa-sun";
  } else {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("study-tools-theme", "light");
    if (icon) icon.className = "fa-solid fa-moon";
  }
}

function initTheme() {
  const saved = localStorage.getItem("study-tools-theme");
  const btn = document.getElementById("theme-toggle-btn");
  const icon = btn ? btn.querySelector("i") : null;

  if (saved === "light") {
    document.body.setAttribute("data-theme", "light");
    if (icon) icon.className = "fa-solid fa-moon";
  } else {
    document.body.removeAttribute("data-theme");
    if (icon) icon.className = "fa-solid fa-sun";
  }
}

"""

js += theme_js

# Step 5: Add initTheme() call in DOMContentLoaded
js = js.replace("  switchSubject('sql');\n});", "  switchSubject('sql');\n  initTheme();\n});")

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("app.js: theme functions added")

# ---- Final verification ----
print("\n=== Final Verification ===")

with open(html_path := os.path.join(base, "index.html"), "r", encoding="utf-8") as f:
    html = f.read()
print(f"light-theme.css in HTML: {'light-theme' in html}")
print(f"theme-toggle in HTML: {'theme-toggle' in html}")
opens = len(re.findall(r"<div[^>]*>", html))
closes = len(re.findall(r"</div>", html))
print(f"HTML div opens: {opens}, closes: {closes}, diff: {opens - closes}")

with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()
print(f"theme-toggle-btn CSS: {'.theme-toggle-btn' in css}")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()
print(f"toggleTheme function: {'function toggleTheme' in js}")
print(f"initTheme function: {'function initTheme' in js}")
print(f"initTheme() called: {'initTheme();' in js}")
