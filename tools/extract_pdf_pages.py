import pypdf

def extract_pages(pdf_path, start_page, end_page):
    print(f"Extracting pages {start_page} to {end_page} from {pdf_path}...")
    reader = pypdf.PdfReader(pdf_path)
    
    # decrypt if needed
    if reader.is_encrypted:
        try:
            reader.decrypt("")
        except:
            pass
            
    for page_num in range(start_page - 1, min(end_page, len(reader.pages))):
        print(f"\n================ PAGE {page_num + 1} ================")
        text = reader.pages[page_num].extract_text()
        print(text)

if __name__ == '__main__':
    extract_pages("情報セキュリティー.pdf", 36, 42)
