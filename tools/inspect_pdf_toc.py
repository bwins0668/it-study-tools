import pypdf

def main():
    pdf_path = "令和08年-イメージ-クレバー方式でよくわかる-かやのき先生のITパスポート教室_00.pdf"
    print(f"Reading outline of {pdf_path}...")
    
    try:
        reader = pypdf.PdfReader(pdf_path)
        print(f"Total pages: {len(reader.pages)}")
        
        outline = reader.outline
        if not outline:
            print("No outline (TOC) found in PDF.")
            return
            
        print("Outline found:")
        def print_outline(item, depth=0):
            if isinstance(item, list):
                for sub in item:
                    print_outline(sub, depth + 1)
            else:
                title = item.get('/Title', 'Unknown')
                try:
                    page_num = reader.get_destination_page_number(item) + 1
                    print("  " * depth + f"- {title} (p.{page_num})")
                except Exception:
                    print("  " * depth + f"- {title} (unknown page)")
                
        print_outline(outline)
        
    except Exception as e:
        print("Error reading PDF:", e)

if __name__ == '__main__':
    main()
