import zipfile
import os

def extract_and_convert(zip_path, target_dir):
    os.makedirs(target_dir, exist_ok=True)
    with zipfile.ZipFile(zip_path) as z:
        for info in z.infolist():
            # Get decoded filename
            try:
                filename = info.filename.encode('cp437').decode('cp932')
            except Exception:
                filename = info.filename
            
            # Avoid directory entries
            if filename.endswith('/') or not filename:
                continue
            
            # Read content
            content_bytes = z.read(info.filename)
            
            # Try to decode content
            content = None
            for enc in ['cp932', 'utf-8', 'utf-8-sig', 'euc-jp']:
                try:
                    content = content_bytes.decode(enc)
                    break
                except UnicodeDecodeError:
                    continue
            
            if content is None:
                content = content_bytes.decode('utf-8', errors='replace')
            
            # Construct target path
            target_path = os.path.join(target_dir, filename)
            os.makedirs(os.path.dirname(target_path), exist_ok=True)
            
            # Write as UTF-8
            with open(target_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Extracted: {filename}")

extract_and_convert('samplecode.zip', 'python_lessons_extracted/samples')
extract_and_convert('practicecode.zip', 'python_lessons_extracted/practices')
print("Extraction complete!")
