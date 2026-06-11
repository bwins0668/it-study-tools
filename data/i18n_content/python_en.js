/* Study Tools Content I18n — Python English Content Language Pack v1 */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  // Lesson 1: コンピュータのしくみ — How Computers Work
  window.CONTENT_I18N["python:1"] = {
    en: {
      title: "How Computers Work",
      concept: "A computer works through the coordination of its main hardware components:\n\n- **CPU (Central Processing Unit)** — The \"brain\" of the computer that performs calculations at high speed\n- **Memory (RAM)** — Temporarily stores program data while running (erased when power is off)\n- **Hard Disk (SSD/HDD)** — Stores files permanently, even after the computer is turned off",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:1:conceptJa"
    }
  };

  // Lesson 2: 人間とコンピュータが理解できる言語の違い — Human Language vs Machine Language
  window.CONTENT_I18N["python:2"] = {
    en: {
      title: "Human Language vs Machine Language",
      concept: "Humans communicate in languages like English or Japanese, but computers only understand **binary** (0s and 1s), called **machine language**. The code that humans write must be translated into machine language by an **interpreter** or **compiler**. Python uses an interpreter to translate code line by line.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:2:conceptJa"
    }
  };

  // Lesson 3: いろいろなプログラミング言語 — Various Programming Languages
  window.CONTENT_I18N["python:3"] = {
    en: {
      title: "Various Programming Languages",
      concept: "There are many programming languages in the world, each suited for different purposes:\n\n- **Python** — Simple syntax, great for AI, data analysis, and automation\n- **Java** — Stable and widely used in enterprise systems and Android apps\n- **C++** — High performance, used in game engines and system programming\n\nNo single language is the best; choose the right tool for the right job.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:3:conceptJa"
    }
  };

  // Lesson 4: コマンドプロンプトの起動 — Starting the Command Prompt
  window.CONTENT_I18N["python:4"] = {
    en: {
      title: "Starting the Command Prompt",
      concept: "A **CUI (Character User Interface)** lets you operate a computer by typing commands instead of using a mouse. On Windows, you can use **Command Prompt** or **PowerShell**. This is essential for running Python programs from the command line.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:4:conceptJa"
    }
  };

  // Lesson 5: パス — File Paths
  window.CONTENT_I18N["python:5"] = {
    en: {
      title: "File Paths (Absolute and Relative)",
      concept: "A **path** is the \"address\" that shows where a file or folder is located:\n\n- **Absolute Path** — The full path starting from the root (e.g., `C:/Users/Coco/main.py`). It works no matter where you are.\n- **Relative Path** — A path relative to your current working directory (e.g., `./main.py` or `../data.txt`)",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:5:conceptJa"
    }
  };

  // Lesson 6: コマンドの利用 — Using Commands
  window.CONTENT_I18N["python:6"] = {
    en: {
      title: "Using Command Line Commands",
      concept: "Common commands for the command line:\n\n- `dir` — List files and folders (Windows)\n- `ls` — List files and folders (Mac/Linux)\n- `cd folderName` — Change directory to a subfolder\n- `cd ..` — Go back to the parent folder\n- `python --version` — Check your installed Python version",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:6:conceptJa"
    }
  };

  // Lesson 7: インストールする前の準備 — Preparation Before Installation
  window.CONTENT_I18N["python:7"] = {
    en: {
      title: "Preparation Before Installation",
      concept: "Before installing Python, check your computer's system information:\n\n- Is it **Windows** or **macOS**?\n- If Windows, is it **64-bit** or **32-bit**? (Most modern computers are 64-bit)\n- Make sure you have administrator privileges",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:7:conceptJa"
    }
  };

  // Lesson 8: 必要なアプリケーション — Required Applications
  window.CONTENT_I18N["python:8"] = {
    en: {
      title: "Required Applications",
      concept: "To start learning Python, you need three core tools:\n\n1. **Python Interpreter** — The engine that runs your code\n2. **Text Editor (VS Code, Atom, etc.)** — For writing `.py` files with syntax highlighting\n3. **Terminal/Console** — For running scripts and seeing output",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:8:conceptJa"
    }
  };

  // Lesson 9: Pythonのインストール — Installing Python
  window.CONTENT_I18N["python:9"] = {
    en: {
      title: "Installing Python",
      concept: "When installing Python on Windows, there is one critical step:\n\n⚠️ **Check \"Add python.exe to PATH\"** in the installer!\n\nThis registers Python's location in the system's PATH environment variable, so you can run `python` from any folder in the command line. Without this, typing `python` will give a \"command not found\" error.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:9:conceptJa"
    }
  };

  // Lesson 10: Atomのインストール — Installing a Code Editor
  window.CONTENT_I18N["python:10"] = {
    en: {
      title: "Installing a Code Editor",
      concept: "After installing a code editor (like VS Code or Atom), follow these steps:\n\n1. Create a new file\n2. Save it with a `.py` extension (e.g., `hello.py`)\n3. The editor will recognize it as Python code and enable syntax highlighting (color-coded text)\n\nThe `.py` extension acts as an ID card — it tells the editor to start Python analysis, highlight keywords, and even flag potential errors.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:10:conceptJa"
    }
  };

})();
