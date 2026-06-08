import os
import hashlib
import subprocess
import tempfile
import time
import zipfile


PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VERSION_TAG = os.environ.get("STUDY_TOOLS_VERSION", f"v{time.strftime('%Y.%m.%d')}")
SAFE_VERSION_TAG = VERSION_TAG.strip().replace("/", "-").replace("\\", "-")
PACKAGE_NAME = f"Study-Tools-Portable-{SAFE_VERSION_TAG}"
ZIP_NAME = f"{PACKAGE_NAME}.zip"
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "backups")

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
    "scratch",
    "tools",
    "backups",
    "output",
}

EXCLUDE_FILES = {
    ZIP_NAME,
    "Launcher.cs",
    "python_embed.zip",
    "study_ai.db",
    "SQL-Learning-Hub.exe",
    "SQL-Learning-Hub-Portable.zip",
    "_fix.py",
    "_fix2.py",
    "index.html.bak",
}

EXCLUDE_EXTENSIONS = {
    ".bak",
    ".cs",
    ".db",
    ".sqlite",
    ".sqlite3",
    ".tmp",
}


def is_within(path, parent):
    try:
        return os.path.commonpath([os.path.abspath(path), os.path.abspath(parent)]) == os.path.abspath(parent)
    except ValueError:
        return False


def has_non_ascii(path):
    return any(ord(ch) > 127 for ch in path)


def ascii_safe_jdk_bin_dir(bin_dir):
    bin_dir = os.path.abspath(bin_dir)
    if os.name != "nt" or not has_non_ascii(bin_dir):
        return bin_dir

    jdk_home = os.path.dirname(bin_dir)
    digest = hashlib.sha1(jdk_home.encode("utf-8")).hexdigest()[:12]
    link_home = os.path.join(tempfile.gettempdir(), f"study-tools-jdk-{digest}")
    link_bin = os.path.join(link_home, "bin")
    if os.path.isfile(os.path.join(link_bin, "java.exe")):
        return link_bin

    try:
        subprocess.run(
            ["cmd", "/c", "mklink", "/J", link_home, jdk_home],
            capture_output=True,
            text=True,
            timeout=10,
        )
    except Exception:
        return bin_dir

    if os.path.isfile(os.path.join(link_bin, "java.exe")):
        return link_bin
    return bin_dir


def jdk_bin_is_usable(bin_dir):
    bin_dir = ascii_safe_jdk_bin_dir(bin_dir)
    java_exe = os.path.join(bin_dir, "java.exe")
    javac_exe = os.path.join(bin_dir, "javac.exe")
    if not os.path.isfile(java_exe) or not os.path.isfile(javac_exe):
        return False
    env = os.environ.copy()
    env["JAVA_HOME"] = os.path.dirname(os.path.abspath(bin_dir))
    env.pop("JRE_HOME", None)
    env["PATH"] = bin_dir + os.pathsep + env.get("PATH", "")
    try:
        result = subprocess.run(
            [java_exe, "-version"],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=8,
            env=env,
        )
        return result.returncode == 0
    except Exception:
        return False


def find_usable_local_jdk_root():
    jdk_root = os.path.join(PROJECT_ROOT, "jdk")
    if not os.path.isdir(jdk_root):
        return None
    for root, dirs, files in os.walk(jdk_root):
        dirs.sort()
        if "java.exe" in files and "javac.exe" in files and jdk_bin_is_usable(root):
            return os.path.dirname(root)
    return None


def should_include_file(path, selected_jdk_root=None):
    rel_path = os.path.relpath(path, PROJECT_ROOT)
    parts = set(rel_path.split(os.sep))
    if parts & EXCLUDE_DIRS:
        return False

    if rel_path == "jdk" or rel_path.startswith("jdk" + os.sep):
        return selected_jdk_root is not None and is_within(path, selected_jdk_root)

    basename = os.path.basename(path)
    if basename in EXCLUDE_FILES:
        return False

    if basename.endswith(".zip"):
        is_allowed = "python" in path.lower() or basename in {
            "practicecode.zip",
            "samplecode.zip",
        }
        if not is_allowed:
            return False

    _, ext = os.path.splitext(basename)
    return ext.lower() not in EXCLUDE_EXTENSIONS


def iter_package_files(selected_jdk_root=None):
    start_path = os.path.join(PROJECT_ROOT, "启动.bat")
    if os.path.exists(start_path):
        yield start_path, "启动.bat"

    for root, dirs, files in os.walk(PROJECT_ROOT):
        dirs[:] = [directory for directory in dirs if directory not in EXCLUDE_DIRS]
        for file_name in sorted(files):
            if file_name == "启动.bat":
                continue
            full_path = os.path.join(root, file_name)
            if should_include_file(full_path, selected_jdk_root):
                yield full_path, os.path.relpath(full_path, PROJECT_ROOT)


def package_project():
    required_files = [
        "启动.bat",
        "index.html",
        "server.py",
        "Study-Tools.exe",
        "study_ai.py",
        "AI模块使用说明.md",
        "可用版本说明.txt",
        os.path.join("assets", "css", "index.css"),
        os.path.join("assets", "css", "light-theme.css"),
        os.path.join("assets", "css", "japanese-typing.css"),
        os.path.join("assets", "css", "ai_learning.css"),
        os.path.join("assets", "js", "app.js"),
        os.path.join("assets", "js", "ai_assistant.js"),
        os.path.join("assets", "js", "java_sandbox.js"),
        os.path.join("assets", "js", "python_sandbox.js"),
        os.path.join("assets", "js", "japanese_typing.js"),
        os.path.join("data", "db.js"),
        os.path.join("data", "lessons.js"),
        os.path.join("data", "japanese_typing_library.js"),
        os.path.join("data", "japanese_typing_expansion.js"),
        os.path.join("data", "it_passport_lessons.js"),
        os.path.join("data", "it_passport_past_exams.js"),
        os.path.join("data", "sg_lessons.js"),
        os.path.join("data", "sg_past_exams.js"),
        os.path.join("data", "java_lessons.js"),
        os.path.join("data", "java_exam_questions.js"),
        os.path.join("data", "python_lessons.js"),
        os.path.join("data", "python_exam_questions.js"),
        os.path.join("data", "sql_exam_questions.js"),
        os.path.join("python", "python.exe"),
    ]

    missing = [
        rel_path
        for rel_path in required_files
        if not os.path.exists(os.path.join(PROJECT_ROOT, rel_path))
    ]
    if missing:
        print("ERROR: Missing required files:")
        for rel_path in missing:
            print(f"  - {rel_path}")
        return False

    selected_jdk_root = find_usable_local_jdk_root()
    if not selected_jdk_root:
        print("ERROR: No usable local JDK found under jdk/.")
        print("       The portable package must include a JDK with working java.exe and javac.exe.")
        return False

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    zip_path = os.path.join(OUTPUT_DIR, ZIP_NAME)
    if os.path.exists(zip_path):
        os.remove(zip_path)

    print(f"=== Creating portable package: {ZIP_NAME} ===")
    print(f"Using JDK: {selected_jdk_root}")
    file_count = 0
    try:
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zip_file:
            for full_path, rel_path in iter_package_files(selected_jdk_root):
                archive_path = os.path.join(PACKAGE_NAME, rel_path).replace(os.sep, "/")
                zip_file.write(full_path, archive_path)
                file_count += 1

        size_bytes = os.path.getsize(zip_path)
        print(f"SUCCESS: Created {zip_path}")
        print(f"  Files: {file_count}")
        print(f"  Size: {size_bytes / (1024 * 1024):.2f} MB")
        return True
    except Exception as exc:
        print(f"ERROR during packaging: {exc}")
        return False


if __name__ == "__main__":
    raise SystemExit(0 if package_project() else 1)
