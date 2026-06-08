import os
import zipfile

def create_source_backup():
    PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    ZIP_NAME = "Study-Tools-Source-Backup-v0.1.0.zip"
    zip_path = os.path.join(PROJECT_ROOT, ZIP_NAME)
    
    print(f"=== Creating Source Backup: {ZIP_NAME} ===")
    print(f"Project root: {PROJECT_ROOT}")
    
    EXCLUDE_DIRS = {
        ".git",
        ".agents",
        ".codex",
        "__pycache__",
        "node_modules",
        "temp_extract",
        "python", # Embedded python environment (too large, not source code)
        "jdk",    # Embedded JDK environment (too large, not source code)
    }
    
    EXCLUDE_FILES = {
        ZIP_NAME,
        "Study-Tools-Portable.zip",
        "SQL-Learning-Hub-Portable.zip",
        "SQL-Learning-Hub-Portable-Backup-20260604.zip",
        "Study-Tools.exe",
        "SQL-Learning-Hub.exe",
    }
    
    # We want to preserve student coding archives
    PRESERVE_ZIPS = {"practicecode.zip", "samplecode.zip"}
    
    if os.path.exists(zip_path):
        os.remove(zip_path)
        
    copied_count = 0
    
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(PROJECT_ROOT):
            # Exclude folders in-place
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            
            for file_name in files:
                if file_name in EXCLUDE_FILES:
                    continue
                    
                _, ext = os.path.splitext(file_name)
                # Exclude any other ZIP files (which are probably release/backup files)
                if ext.lower() == ".zip" and file_name not in PRESERVE_ZIPS:
                    continue
                # Exclude executables
                if ext.lower() == ".exe":
                    continue
                    
                full_path = os.path.join(root, file_name)
                rel_path = os.path.relpath(full_path, PROJECT_ROOT)
                
                # Write to zip
                zipf.write(full_path, rel_path)
                copied_count += 1
                
    size_bytes = os.path.getsize(zip_path)
    size_mb = size_bytes / (1024 * 1024)
    print(f"\nSUCCESS: Created backup zip at: {zip_path}")
    print(f"  Files backed up: {copied_count}")
    print(f"  Size: {size_bytes} bytes ({size_mb:.2f} MB)")

if __name__ == "__main__":
    create_source_backup()
