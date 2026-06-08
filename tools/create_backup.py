import os
import shutil
import zipfile
import time

def main():
    # Set src_dir to the project root (parent of tools)
    tools_dir = os.path.dirname(os.path.abspath(__file__))
    src_dir = os.path.dirname(tools_dir)
    
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    backup_name = f"Study-Tools-source-backup-{timestamp}"
    
    # Store backup files in the backups/ folder inside the project root
    backups_root = os.path.join(src_dir, "backups")
    os.makedirs(backups_root, exist_ok=True)
    
    backup_dir = os.path.join(backups_root, backup_name)
    backup_zip = os.path.join(backups_root, f"{backup_name}.zip")
    
    print(f"=== Creating Backup: {backup_name} ===")
    print(f"Source: {src_dir}")
    print(f"Target folder: {backup_dir}")
    print(f"Target zip: {backup_zip}")
    
    EXCLUDE_DIRS = {
        ".git",
        ".agents",
        ".codex",
        ".chrome-release-check-profile",
        ".chrome-screenshot-profile",
        ".playwright-cli",
        ".study-tools-browser-profile",
        "__pycache__",
        "node_modules",
        "temp_extract",
        "backups",
        "output",
        "python",
        "jdk",
        "python_lessons_extracted",
        "scratch",
    }
    
    EXCLUDE_EXTS = {
        ".db",
        ".log",
        ".sqlite",
        ".sqlite3",
        ".zip",
        ".exe",
        ".tmp",
    }
    
    # 1. Create backup folder structure and copy files
    copied_count = 0
    total_size = 0
    
    os.makedirs(backup_dir, exist_ok=True)
    
    for root, dirs, files in os.walk(src_dir):
        # Exclude directories in-place
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file_name in files:
            ext = os.path.splitext(file_name)[1].lower()
            if ext in EXCLUDE_EXTS:
                continue
            
            src_file = os.path.join(root, file_name)
            rel_path = os.path.relpath(src_file, src_dir)
            dest_file = os.path.join(backup_dir, rel_path)
            
            os.makedirs(os.path.dirname(dest_file), exist_ok=True)
            shutil.copy2(src_file, dest_file)
            copied_count += 1
            total_size += os.path.getsize(src_file)
            
    print(f"Copied {copied_count} files to backup folder. Total size: {total_size / (1024*1024):.2f} MB")
    
    # 2. Create zip archive from the backup folder
    print("Creating ZIP archive...")
    with zipfile.ZipFile(backup_zip, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(backup_dir):
            for file_name in files:
                file_path = os.path.join(root, file_name)
                rel_path = os.path.relpath(file_path, backup_dir)
                zipf.write(file_path, rel_path)
                
    zip_size = os.path.getsize(backup_zip)
    print(f"SUCCESS: Created ZIP archive. Size: {zip_size / (1024*1024):.2f} MB")
    
    # 3. Clean up the copied backup folder, keeping only the ZIP
    try:
        shutil.rmtree(backup_dir)
        print("Cleaned up temporary backup folder.")
    except Exception as e:
        print(f"Warning: failed to remove temporary folder {backup_dir}: {e}")

if __name__ == '__main__':
    main()
