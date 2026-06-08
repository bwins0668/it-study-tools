import os
import re
import urllib.request
import urllib.parse

# User-Agent to make Google Fonts return woff2 formats
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def download_file(url, filepath):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    req = urllib.request.Request(url, headers=HEADERS)
    print(f"Downloading: {url} -> {filepath}...")
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        print("  [OK] Success")
        return True
    except Exception as e:
        print(f"  [ERROR] Failed: {e}")
        return False

def setup_font_awesome():
    print("--- Setting up FontAwesome 6.4.0 ---")
    css_url = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    local_css_path = "lib/font-awesome/css/all.min.css"
    
    # Download CSS
    if not download_file(css_url, local_css_path):
        print("Failed to download FontAwesome CSS!")
        return False
        
    with open(local_css_path, 'r', encoding='utf-8') as f:
        css_content = f.read()
        
    # Find all referenced font files
    # FontAwesome references look like: url(../webfonts/fa-solid-900.woff2)
    font_urls = re.findall(r'url\(([^)]+)\)', css_content)
    downloaded_fonts = set()
    
    base_css_url = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/"
    
    for relative_url in font_urls:
        # Clean query parameters or hashes like #iefix or ?v=6.4.0
        clean_rel_url = relative_url.split('?')[0].split('#')[0]
        # Remove surrounding quotes if any
        clean_rel_url = clean_rel_url.strip('\'"')
        
        if 'webfonts/' in clean_rel_url:
            # Reconstruct absolute URL
            abs_url = urllib.parse.urljoin(base_css_url, relative_url.strip('\'"'))
            # Local path
            local_filename = os.path.basename(clean_rel_url)
            local_font_path = os.path.join("lib/font-awesome/webfonts", local_filename)
            
            if local_font_path not in downloaded_fonts:
                download_file(abs_url, local_font_path)
                downloaded_fonts.add(local_font_path)
                
    print("FontAwesome local setup completed successfully.\n")
    return True

def setup_google_fonts():
    print("--- Setting up Google Fonts (Outfit, Noto Sans JP, Fira Code) ---")
    google_fonts_url = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&family=Fira+Code:wght@400;500&display=swap"
    local_css_path = "lib/google-fonts/css/google-fonts.css"
    
    # Fetch CSS
    req = urllib.request.Request(google_fonts_url, headers=HEADERS)
    try:
        print(f"Fetching Google Fonts CSS from API...")
        with urllib.request.urlopen(req, timeout=10) as response:
            css_content = response.read().decode('utf-8')
    except Exception as e:
        print(f"Failed to fetch Google Fonts CSS: {e}")
        return False
        
    # Extract gstatic URLs
    # Example: src: url(https://fonts.gstatic.com/s/outfit/v11/q3sA_O0t4Onw0q2h31w3.woff2) format('woff2');
    font_urls = re.findall(r'url\((https://fonts\.gstatic\.com/[^)]+)\)', css_content)
    
    rewritten_css_content = css_content
    downloaded_fonts = {}
    
    for idx, remote_url in enumerate(font_urls):
        # Extract name from URL to make a unique clean filename
        # E.g. https://fonts.gstatic.com/s/outfit/v11/q3sA_O0t4Onw0q2h31w3.woff2 -> outfit_v11_q3sA.woff2
        parsed_path = urllib.parse.urlparse(remote_url).path
        parts = parsed_path.strip('/').split('/')
        # Typically ['s', 'fontname', 'version', 'filename.woff2']
        if len(parts) >= 4:
            font_family = parts[1]
            font_version = parts[2]
            filename = parts[3]
            local_filename = f"{font_family}_{font_version}_{filename}"
        else:
            local_filename = f"font_{idx}.woff2"
            
        local_font_path = os.path.join("lib/google-fonts/webfonts", local_filename)
        
        # Download font if not already downloaded
        if local_font_path not in downloaded_fonts:
            if download_file(remote_url, local_font_path):
                downloaded_fonts[local_font_path] = local_filename
            else:
                print(f"Warning: Failed to download font: {remote_url}")
                
        # Rewrite URL in CSS
        # Relative path from lib/google-fonts/css/ to lib/google-fonts/webfonts/
        relative_path_for_css = f"../webfonts/{local_filename}"
        rewritten_css_content = rewritten_css_content.replace(remote_url, relative_path_for_css)
        
    # Save the rewritten CSS
    os.makedirs(os.path.dirname(local_css_path), exist_ok=True)
    with open(local_css_path, 'w', encoding='utf-8') as f:
        f.write(rewritten_css_content)
        
    print("Google Fonts local setup completed successfully.\n")
    return True

if __name__ == "__main__":
    # Change CWD to script directory parent to ensure relative pathing works
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    os.makedirs("lib", exist_ok=True)
    fa_ok = setup_font_awesome()
    gf_ok = setup_google_fonts()
    
    if fa_ok and gf_ok:
        print("Success: All web assets successfully downloaded locally in 'lib/'")
    else:
        print("Error: Some downloads failed. Check the output above.")
