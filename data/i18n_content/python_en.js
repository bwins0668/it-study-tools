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

  // Lesson 11: CHAPTER 1 練習問題 — Chapter 1 Review Exercises
  window.CONTENT_I18N["python:11"] = {
    en: {
      title: "Chapter 1 Review Exercises",
      concept: "This is a review quiz covering what you learned in Chapter 1: how computers work, command-line operations, and Python environment setup.\n\nThe questions test your understanding of:\n- How the CPU, memory, and hard disk work together\n- How to navigate directories and list files in the command line\n- The critical step of checking \"Add python.exe to PATH\" when installing Python",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:11:conceptJa"
    }
  };

  // Lesson 12: 対話モードとはじめてのプログラム (hello.py) — Interactive Mode and First Program (hello.py)
  window.CONTENT_I18N["python:12"] = {
    en: {
      title: "Interactive Mode and First Program (hello.py)",
      concept: "To display text on the screen in Python, use the `print()` function.\n\nWrap the text you want to display in single quotes (`'`) or double quotes (`\"`) and write it like `print('Hello')`.\n\n**Common beginner mistake:** Python is case-sensitive. `print` must be written in lowercase — `Print` will cause a `NameError`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:12:conceptJa"
    }
  };

  // Lesson 13: スクリプトファイルの実行 (hello2.py) — Running Script Files (hello2.py)
  window.CONTENT_I18N["python:13"] = {
    en: {
      title: "Running Script Files (hello2.py)",
      concept: "Use the `print()` function to display text on the screen. Enclose the text in single quotes (`'`) or double quotes (`\"`), for example `print('Hello')`.\n\nA script file can contain multiple `print()` statements, and each one will output a line in order. You can print strings, numbers, and even calculation results like `print(3+4)`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:13:conceptJa"
    }
  };

  // Lesson 14: コメントの基本 (comment.py) — Comments Basics (comment.py)
  window.CONTENT_I18N["python:14"] = {
    en: {
      title: "Comments Basics (comment.py)",
      concept: "A **comment** is a note in your code that does not affect how the program runs. Write a single-line comment by putting `#` at the beginning of the line. You can also use triple quotes (`'''`) for multi-line comments.\n\nComments are ignored by the Python interpreter and are only for human readers.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:14:conceptJa"
    }
  };

  // Lesson 15: 複数行コメント (comment2.py) — Multi-line Comments (comment2.py)
  window.CONTENT_I18N["python:15"] = {
    en: {
      title: "Multi-line Comments (comment2.py)",
      concept: "In addition to single-line comments with `#`, you can write **multi-line comments** by wrapping text in triple quotes (`'''`).\n\nEverything between the opening `'''` and closing `'''` is treated as a comment and will not be executed by Python.\n\nThis is useful for longer explanations or temporarily disabling blocks of code.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:15:conceptJa"
    }
  };

  // Lesson 16: トリプルクォートのエラー (comment_A1.py) — Triple-quote Indentation Error (comment_A1.py)
  window.CONTENT_I18N["python:16"] = {
    en: {
      title: "Triple-quote Indentation Error (comment_A1.py)",
      concept: "Python strictly checks **indentation** (spaces at the beginning of lines) as part of its syntax rules. Even comment lines can cause an `IndentationError` if they have inappropriate leading spaces.\n\nIf a triple-quoted comment block starts with unexpected indentation, Python may raise an `IndentationError`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:16:conceptJa"
    }
  };

  // Lesson 17: コメントのインデントエラー (comment_A2.py) — Comment Indentation Error (comment_A2.py)
  window.CONTENT_I18N["python:17"] = {
    en: {
      title: "Comment Indentation Error (comment_A2.py)",
      concept: "Python strictly checks **indentation** (spaces at the beginning of lines). Even a `#` comment line with inappropriate leading spaces will raise an `IndentationError`.\n\nMake sure your indentation is consistent, even on lines that Python will ignore (like comments).",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:17:conceptJa"
    }
  };

  // Lesson 18: 演習：変数を使わない計算と出力 (script01.py) — Exercise: Calculation and Output Without Variables (script01.py)
  window.CONTENT_I18N["python:18"] = {
    en: {
      title: "Exercise: Calculation and Output Without Variables (script01.py)",
      concept: "**Practice Exercise — Chapter 2 (script01.py)**\n\nTask: Perform calculations and output results without using variables.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:18:conceptJa"
    }
  };

  // Lesson 19: データ型を学ぼう — Learning About Data Types
  window.CONTENT_I18N["python:19"] = {
    en: {
      title: "Learning About Data Types",
      concept: "A **data type** defines what kind of data a value is. Python has several basic types:\n\n- **int** — Integer numbers (no decimal point), like `10` or `-5`\n- **float** — Floating-point numbers (with decimals), like `3.14` or `2.0`\n- **str** — Strings of text enclosed in quotes, like `'Hello'`\n- **bool** — Boolean values, either `True` or `False`\n\nUse `type()` to check the data type of any value.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:19:conceptJa"
    }
  };

  // Lesson 20: 数値のデータ — Numeric Data
  window.CONTENT_I18N["python:20"] = {
    en: {
      title: "Numeric Data (int and float)",
      concept: "Numeric data comes in two main types:\n\n- **int (integer)** — Whole numbers without decimals, e.g., `10`, `-5`, `0`\n- **float (floating-point)** — Numbers with a decimal point, e.g., `3.14`, `2.0`, `-0.5`\n\nPython automatically converts types during calculations. For example, dividing two integers with `/` always returns a float (e.g., `5 / 2` gives `2.5`).",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:20:conceptJa"
    }
  };

  // Lesson 21: 文字列のデータ — String Data (str)
  window.CONTENT_I18N["python:21"] = {
    en: {
      title: "String Data (str)",
      concept: "A **string (str)** is data that represents text. Strings must be enclosed in single quotes (`'`) or double quotes (`\"`).\n\nFor example: `'Hello'` or `\"Python\"`.\n\nIf you forget the quotes, Python will try to interpret the text as a variable name or keyword, which will cause a `NameError` or `SyntaxError`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:21:conceptJa"
    }
  };

  // Lesson 22: 真偽値を表すデータ — Boolean Data (bool)
  window.CONTENT_I18N["python:22"] = {
    en: {
      title: "Boolean Data (bool)",
      concept: "The **bool (boolean)** type has only two possible values: `True` (correct/yes) or `False` (incorrect/no). Booleans play a crucial role in conditional branching (if statements).\n\n**Important:** `True` and `False` must be capitalized. Writing `true` or `false` (lowercase) will cause a `NameError`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:22:conceptJa"
    }
  };

  // Lesson 23: 数値の四則演算 (enzanshi01.py) — Numeric Arithmetic (enzanshi01.py)
  window.CONTENT_I18N["python:23"] = {
    en: {
      title: "Numeric Arithmetic (enzanshi01.py)",
      concept: "Python supports several arithmetic operators: `+` (addition), `-` (subtraction), `*` (multiplication), `/` (division), `//` (integer division), `%` (modulo/remainder), and `**` (exponentiation).\n\nBe careful: adding a number and a string directly will raise a `TypeError`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:23:conceptJa"
    }
  };

  // Lesson 24: 文字列の結合 (enzanshi02.py) — String Concatenation (enzanshi02.py)
  window.CONTENT_I18N["python:24"] = {
    en: {
      title: "String Concatenation (enzanshi02.py)",
      concept: "You can join (concatenate) strings together using the `+` operator. For example, `'Hello!' + 'Python'` produces `'Hello!Python'`.\n\nUsing triple quotes (`'''`) lets you create multi-line strings that include line breaks.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:24:conceptJa"
    }
  };

  // Lesson 25: 型エラー（文字列と数値） (enzanshi03.py) — Type Error (String and Number) (enzanshi03.py)
  window.CONTENT_I18N["python:25"] = {
    en: {
      title: "Type Error (String and Number) (enzanshi03.py)",
      concept: "Python uses `+`, `-`, `*`, `/`, `//`, `%`, and `**` for arithmetic. If you try to add a number and a string directly (e.g., `'Number: ' + 5`), Python will raise a `TypeError` because you cannot combine different data types without explicit conversion.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:25:conceptJa"
    }
  };

  // Lesson 26: str()による型変換 (enzanshi04.py) — Type Conversion with str() (enzanshi04.py)
  window.CONTENT_I18N["python:26"] = {
    en: {
      title: "Type Conversion with str() (enzanshi04.py)",
      concept: "To combine a number with a string, convert the number to a string using `str()`. For example, `'Value: ' + str(5)` works correctly.\n\nOperator precedence: multiplication `*` and division `/` are evaluated before addition `+` and subtraction `-`. Use parentheses `()` to change the order of evaluation.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:26:conceptJa"
    }
  };

  // Lesson 27: int()による型変換 (enzanshi05.py) — Type Conversion with int() (enzanshi05.py)
  window.CONTENT_I18N["python:27"] = {
    en: {
      title: "Type Conversion with int() (enzanshi05.py)",
      concept: "Use `int()` to convert a string to an integer. For example, `5 + int('3')` produces `8`.\n\nMultiplication `*` and division `/` have higher precedence than addition `+` and subtraction `-`. Use parentheses `()` to control the order of operations.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:27:conceptJa"
    }
  };

  // Lesson 28: float()による型変換 (enzanshi06.py) — Type Conversion with float() (enzanshi06.py)
  window.CONTENT_I18N["python:28"] = {
    en: {
      title: "Type Conversion with float() (enzanshi06.py)",
      concept: "Use `float()` to convert a string to a floating-point number. For example, `5 + float('3.000')` produces `8.0`.\n\nYou can chain conversions: `int(float('3.000'))` first converts the string to a float, then to an integer, producing `3`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:28:conceptJa"
    }
  };

  // Lesson 29: 変数の定義と基本 (hensu01.py) — Defining and Using Variables (hensu01.py)
  window.CONTENT_I18N["python:29"] = {
    en: {
      title: "Defining and Using Variables (hensu01.py)",
      concept: "A **variable** is a named container that stores a value. Use `=` to assign a value, like `x = 10`. Variables can be reassigned with a new value.\n\n**Rules for variable names:** Must start with a letter or underscore, cannot start with a digit. For example, `1num` is invalid.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:29:conceptJa"
    }
  };

  // Lesson 30: 変数への値の代入 (hensu02.py) — Assigning Values to Variables (hensu02.py)
  window.CONTENT_I18N["python:30"] = {
    en: {
      title: "Assigning Values to Variables (hensu02.py)",
      concept: "A **variable** stores a value and can be reassigned. Use `variable_name = value` to store data. The value on the right side of `=` is stored into the variable on the left.\n\nVariables can hold different types of data and can be reassigned with a completely different type (e.g., from a number to a string).",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:30:conceptJa"
    }
  };

  // Lesson 31: 変数を用いた計算 (hensu03.py) — Calculations Using Variables (hensu03.py)
  window.CONTENT_I18N["python:31"] = {
    en: {
      title: "Calculations Using Variables (hensu03.py)",
      concept: "A **variable** is a named container that stores values. Assign a value with `x = 10`. The value can be changed through reassignment.\n\nVariables can be used in arithmetic expressions. For example, if `num1 = 5` and `num2 = 3`, you can write `result = num1 + num2` to calculate and store the sum. Use `type()` to check the data type of a variable.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:31:conceptJa"
    }
  };

  // Lesson 32: 変数と文字の同時出力 (hensu04.py) — Outputting Variables and Text Together (hensu04.py)
  window.CONTENT_I18N["python:32"] = {
    en: {
      title: "Outputting Variables and Text Together (hensu04.py)",
      concept: "Python supports **compound assignment operators** that combine an operation with assignment. For example, `a = a + 1` can be written more concisely as `a += 1`.\n\nYou can also assign the same value to multiple variables at once: `a = b = c = 0`.\n\nUse commas in `print()` to output multiple items: `print(msg, num1)`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:32:conceptJa"
    }
  };

  // Lesson 33: 変数の値の書き換え (hensu06.py) — Rewriting Variable Values (hensu06.py)
  window.CONTENT_I18N["python:33"] = {
    en: {
      title: "Rewriting Variable Values (hensu06.py)",
      concept: "Use compound assignment operators like `+=` to update a variable's value concisely. For example, `num1 += 3` adds 3 to `num1`.\n\nYou can also assign the same initial value to multiple variables: `a = b = c = 0`.\n\nWhen one variable is assigned from another (`num2 = num1`), `num2` gets a copy of the value. Changing `num1` afterward does NOT affect `num2`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:33:conceptJa"
    }
  };

  // Lesson 34: 変数から変数への代入 (hensu05.py) — Assigning One Variable to Another (hensu05.py)
  window.CONTENT_I18N["python:34"] = {
    en: {
      title: "Assigning One Variable to Another (hensu05.py)",
      concept: "To concatenate a number with a string, convert the number to a string using `str()` (type casting). Alternatively, use an **f-string**: `f'Value is {val}'` lets you embed variables directly inside a string using curly braces `{}`.\n\nWhen you assign one variable to another (`num2 = num1`), `num2` copies the current value of `num1`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:34:conceptJa"
    }
  };

  // Lesson 35: 変数自身の値の更新 (hensu07.py) — Updating a Variable's Own Value (hensu07.py)
  window.CONTENT_I18N["python:35"] = {
    en: {
      title: "Updating a Variable's Own Value (hensu07.py)",
      concept: "To concatenate a number with a string, use `str()` to cast the number to a string. Another approach is using f-strings: `f'The value is {val}'` to embed variables directly.\n\nA variable can be updated using its own current value: `num1 = num1 + 3` reads the old value, adds 3, and stores the result back into `num1`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:35:conceptJa"
    }
  };

  // Lesson 36: 累積代入演算子 (+=) (hensu08.py) — Compound Assignment Operator (+=) (hensu08.py)
  window.CONTENT_I18N["python:36"] = {
    en: {
      title: "Compound Assignment Operator (+=) (hensu08.py)",
      concept: "Compound assignment operators shorten code when updating variables. For example:\n- `num1 += 3` is shorthand for `num1 = num1 + 3`\n- `num1 -= 3` is shorthand for `num1 = num1 - 3`\n- `num1 *= 3` is shorthand for `num1 = num1 * 3`",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:36:conceptJa"
    }
  };

  // Lesson 37: 文字列の累積代入 (hensu09.py) — String Compound Assignment (hensu09.py)
  window.CONTENT_I18N["python:37"] = {
    en: {
      title: "String Compound Assignment (hensu09.py)",
      concept: "Compound assignment operators also work with strings:\n- `str1 += 'def'` appends 'def' to the current string (equivalent to `str1 = str1 + 'def'`)\n- `str1 *= 3` repeats the string 3 times (equivalent to `str1 = str1 * 3`)\n\nUse `str()` to convert numbers to strings, and f-strings (`f'text {var}'`) for cleaner embedding of variables.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:37:conceptJa"
    }
  };

  // Lesson 38: キーボードからの入力 (input01.py) — Keyboard Input (input01.py)
  window.CONTENT_I18N["python:38"] = {
    en: {
      title: "Keyboard Input (input01.py)",
      concept: "Use `input()` to get input from the user via the keyboard. The value returned by `input()` is **always a string (str)**, even if the user types a number.\n\nTo use the input in numeric calculations, you must convert it using `int()` or `float()`, for example `int(input())`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:38:conceptJa"
    }
  };

  // Lesson 39: 入力された値の結合 (input02.py) — Concatenating Input Values (input02.py)
  window.CONTENT_I18N["python:39"] = {
    en: {
      title: "Concatenating Input Values (input02.py)",
      concept: "Use `input()` to accept keyboard input. The return value is **always a string (str)**.\n\nIf you ask the user for two numbers and use `+` directly, it will **concatenate them as strings** rather than adding them numerically. For example, inputting 5 and 3 gives `'5' + '3' = '53'`, not `8`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:39:conceptJa"
    }
  };

  // Lesson 40: 入力値の数値変換と計算 (input03.py) — Converting Input to Numbers and Calculating (input03.py)
  window.CONTENT_I18N["python:40"] = {
    en: {
      title: "Converting Input to Numbers and Calculating (input03.py)",
      concept: "Use `input()` to receive keyboard input. Since `input()` always returns a string, you must cast it with `int()` or `float()` before using it in numeric calculations.\n\nExample:\n```\nstr1 = input('Enter number 1: ')\nnum1 = int(str1)\nstr2 = input('Enter number 2: ')\nnum2 = int(str2)\nprint(num1 + num2)\n```",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:40:conceptJa"
    }
  };

  // Lesson 41: 入力と変換の同時実行 (input04.py) — Simultaneous Input and Conversion (input04.py)
  window.CONTENT_I18N["python:41"] = {
    en: {
      title: "Simultaneous Input and Conversion (input04.py)",
      concept: "You can combine `input()` and `int()` in one line for brevity:\n```\nnum1 = int(input('Enter number 1: '))\nnum2 = int(input('Enter number 2: '))\nprint(num1 + num2)\n```\n\nRemember: `input()` always returns a string. You must convert it with `int()` or `float()` before numeric operations.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:41:conceptJa"
    }
  };

  // Lesson 42: 演習：式のデータ型の判定と確認 (script3-1.py) — Exercise: Determine and Confirm Expression Data Types (script3-1.py)
  window.CONTENT_I18N["python:42"] = {
    en: {
      title: "Exercise: Determine and Confirm Expression Data Types (script3-1.py)",
      concept: "**Practice Exercise — Chapter 3 (script3-1.py)**\n\nTask: Determine and confirm the data type of various expressions.\n\nCheck the template code in the editor and fill in the missing parts. Use `type()` inside `print()` to reveal the data type of each expression, such as `print(type(1 + 2))`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:42:conceptJa"
    }
  };

  // Lesson 43: 演習：文字列の入力と結合 (script3-2.py) — Exercise: String Input and Concatenation (script3-2.py)
  window.CONTENT_I18N["python:43"] = {
    en: {
      title: "Exercise: String Input and Concatenation (script3-2.py)",
      concept: "**Practice Exercise — Chapter 3 (script3-2.py)**\n\nTask: Input a surname and given name, then concatenate and output them.\n\nCheck the template code and fill in the missing parts. Use `input()` to read the user's family name and given name, then combine them with `+` and print the result.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:43:conceptJa"
    }
  };

  // Lesson 44: 演習：数値の入力と四則演算 (script3-3.py) — Exercise: Numeric Input and Arithmetic (script3-3.py)
  window.CONTENT_I18N["python:44"] = {
    en: {
      title: "Exercise: Numeric Input and Arithmetic (script3-3.py)",
      concept: "**Practice Exercise — Chapter 3 (script3-3.py)**\n\nTask: Input two integers and calculate their product.\n\nCheck the template code and fill in the missing parts. Use `int()` to convert input strings to integers, then perform addition, subtraction, and display formatted results using string concatenation.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:44:conceptJa"
    }
  };

  // Lesson 45: 値の等価比較 (hikaku01.py) — Value Equality Comparison (hikaku01.py)
  window.CONTENT_I18N["python:45"] = {
    en: {
      title: "Value Equality Comparison (hikaku01.py)",
      concept: "**Comparison operators** compare two values and return a boolean result (`True` or `False`):\n- `==` — Equal to\n- `!=` — Not equal to\n- `>` — Greater than\n- `<` — Less than\n- `>=` — Greater than or equal to\n- `<=` — Less than or equal to\n\n**Common pitfall:** Use `==` for comparison (double equals). A single `=` is for assignment and will cause an error inside an `if` condition.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:45:conceptJa"
    }
  };

  // Lesson 46: 数値の大小比較 (hikaku02.py) — Numeric Magnitude Comparison (hikaku02.py)
  window.CONTENT_I18N["python:46"] = {
    en: {
      title: "Numeric Magnitude Comparison (hikaku02.py)",
      concept: "Comparison operators compare two values and return `True` or `False`. Available operators: `==`, `!=`, `>`, `<`, `>=`, `<=`.\n\n**Common pitfalls:**\n- Always put a colon `:` at the end of an `if` statement\n- Always indent the code block below with 4 spaces\n- Missing colon or wrong indentation causes `IndentationError` or `SyntaxError`",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:46:conceptJa"
    }
  };

  // Lesson 47: 文字列の大小比較 (hikaku03.py) — String Comparison (hikaku03.py)
  window.CONTENT_I18N["python:47"] = {
    en: {
      title: "String Comparison (hikaku03.py)",
      concept: "Comparison operators also work with strings. Python compares strings lexicographically (alphabetical order based on Unicode character codes).\n\nFor example, `'a' < 'c'` evaluates to `True` because 'a' comes before 'c' alphabetically.\n\nAlways include the colon `:` after `if`, and indent the body with 4 spaces.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:47:conceptJa"
    }
  };

  // Lesson 48: 日本語文字列の比較 (hikaku04.py) — Japanese String Comparison (hikaku04.py)
  window.CONTENT_I18N["python:48"] = {
    en: {
      title: "Japanese String Comparison (hikaku04.py)",
      concept: "Comparison operators also work with non-English characters like Japanese kanji. Python compares them based on their Unicode code points.\n\nThis example uses an `if-else` structure:\n- `if` block runs when the condition is `True`\n- `else` block runs when the condition is `False`\n\nAlways remember the colon `:` and proper indentation!",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:48:conceptJa"
    }
  };

  // Lesson 49: 変数との大小比較 (hikaku05.py) — Comparing Values with Variables (hikaku05.py)
  window.CONTENT_I18N["python:49"] = {
    en: {
      title: "Comparing Values with Variables (hikaku05.py)",
      concept: "Comparison operators can compare variables and values. For example:\n```\na = 10\nb = 10\nif a >= b:\n    print('a is greater than or equal to b')\n```\n\n**Common pitfalls:**\n- Use `==` for equality comparison, not `=`\n- Always put `:` at the end of `if` lines\n- Indent the if-block with 4 spaces",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:49:conceptJa"
    }
  };

  // Lesson 50: 真偽値を用いた条件判定 (hikaku06.py) — Conditional Judgment with Boolean Values (hikaku06.py)
  window.CONTENT_I18N["python:50"] = {
    en: {
      title: "Conditional Judgment with Boolean Values (hikaku06.py)",
      concept: "You can use a boolean variable directly in an `if` condition. For example:\n```\nb = True\nif b:\n    print('b is True')\n```\n\nThere is no need to write `if b == True` — just `if b:` is sufficient.\n\n**Common pitfalls:** Don't forget the colon `:` and 4-space indentation.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:50:conceptJa"
    }
  };

  // Lesson 51: if文による単純分岐 (if01.py) — Simple if Branch (if01.py)
  window.CONTENT_I18N["python:51"] = {
    en: {
      title: "Simple if Branch (if01.py)",
      concept: "Use the `if` statement to branch based on a condition. When the condition is `True`, the indented block (4 spaces) is executed.\n\n```\nif condition:\n    # code to run when True\n```\n\nIf the condition is `False`, the indented block is skipped and execution continues after the if-block.\n\n**Common pitfalls:** Don't forget the colon `:` and 4-space indentation.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:51:conceptJa"
    }
  };

  // Lesson 52: if-elif文による3分岐 (ifelif01.py) — Three-way Branch with if-elif (ifelif01.py)
  window.CONTENT_I18N["python:52"] = {
    en: {
      title: "Three-way Branch with if-elif (ifelif01.py)",
      concept: "To create three or more branches, use `elif` (short for \"else if\"). Conditions are evaluated from top to bottom, and only the first block whose condition is `True` will execute.\n\n```\nif condition1:\n    # runs if condition1 is True\nelif condition2:\n    # runs if condition2 is True (and condition1 was False)\nelse:\n    # runs if neither condition was True\n```",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:52:conceptJa"
    }
  };

  // Lesson 53: if-else文による二者択一 (ifelse01.py) — Two-way Branch with if-else (ifelse01.py)
  window.CONTENT_I18N["python:53"] = {
    en: {
      title: "Two-way Branch with if-else (ifelse01.py)",
      concept: "Use `if-else` to handle both possibilities: one block executes when the condition is `True`, and a different block executes when it is `False`.\n\n```\nif condition:\n    # runs when True\nelse:\n    # runs when False\n```\n\n**Common pitfalls:** Don't forget the colon `:` after both `if` and `else`. Use 4-space indentation for both blocks.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:53:conceptJa"
    }
  };

  // Lesson 54: elifの複数使用 (ifelif02.py) — Using Multiple elif Statements (ifelif02.py)
  window.CONTENT_I18N["python:54"] = {
    en: {
      title: "Using Multiple elif Statements (ifelif02.py)",
      concept: "You can chain multiple `elif` statements to handle many possible conditions. Python evaluates them from top to bottom and executes only the first matching block.\n\n```\nif condition1:\n    ...\nelif condition2:\n    ...\nelif condition3:\n    ...\nelse:\n    # runs if none of the above matched\n```",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:54:conceptJa"
    }
  };

  // Lesson 55: 条件分岐のネスト (ifnest01.py) — Nested Conditionals (ifnest01.py)
  window.CONTENT_I18N["python:55"] = {
    en: {
      title: "Nested Conditionals (ifnest01.py)",
      concept: "You can place an `if` statement inside another `if` statement. This is called **nesting**. Each nesting level adds another 4 spaces of indentation.\n\n```\nif outer_condition:\n    # +4 spaces\n    if inner_condition:\n        # +8 spaces\n        print('Both conditions met')\n```\n\nNesting allows you to check multiple conditions in sequence, like unlocking a door before opening a box inside.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:55:conceptJa"
    }
  };

  // Lesson 56: 論理積 and (and01.py) — Logical AND (and01.py)
  window.CONTENT_I18N["python:56"] = {
    en: {
      title: "Logical AND (and01.py)",
      concept: "The `and` operator combines multiple conditions. The overall result is `True` only when **both** conditions are `True`.\n\n```\nif a < 10 and a >= 0:\n    print('a is between 0 and 9')\n```\n\nThis is equivalent to writing two separate `if` statements nested, but is more concise.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:56:conceptJa"
    }
  };

  // Lesson 57: 连续比较条件判断 (and02.py) — Chained Comparison (and02.py)
  window.CONTENT_I18N["python:57"] = {
    en: {
      title: "Chained Comparison (and02.py)",
      concept: "Python allows **chained comparisons** for cleaner code. Instead of `if a < 10 and a >= 0`, you can write:\n\n```\nif 0 <= a < 10:\n    print('a is between 0 and 9')\n```\n\nThis reads naturally like a mathematical inequality and is more readable than using `and`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:57:conceptJa"
    }
  };

  // Lesson 58: 論理和 or (or01.py) — Logical OR (or01.py)
  window.CONTENT_I18N["python:58"] = {
    en: {
      title: "Logical OR (or01.py)",
      concept: "The `or` operator combines multiple conditions. The overall result is `True` if **at least one** of the conditions is `True`.\n\n```\nif a > 10 or a <= 0:\n    print('a is outside the range 0-10')\n```\n\n`or` is `True` when either side (or both) is `True`. It is `False` only when both sides are `False`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:58:conceptJa"
    }
  };

  // Lesson 59: 論理否定 not (not01.py) — Logical NOT (not01.py)
  window.CONTENT_I18N["python:59"] = {
    en: {
      title: "Logical NOT (not01.py)",
      concept: "The `not` operator **inverts** a boolean value. `not True` becomes `False`, and `not False` becomes `True`.\n\n```\nif not a < 10:\n    print('a is NOT less than 10')\n```\n\n`not` is a unary operator — it works on a single condition or value, flipping its truth value.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:59:conceptJa"
    }
  };

  // Lesson 60: 真偽値の反転判定 (not02.py) — Boolean Inversion (not02.py)
  window.CONTENT_I18N["python:60"] = {
    en: {
      title: "Boolean Inversion (not02.py)",
      concept: "Use `not` to invert a boolean value stored in a variable:\n\n```\nb = False\nif not b:\n    print('b is not True')\n```\n\nSince `not False` equals `True`, the `if` block executes.\n\n**Common pitfalls:** Don't forget the colon `:` after the `if` line, and use 4-space indentation for the code block.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:60:conceptJa"
    }
  };

  // Lesson 61: コラム：値の存在判定 (column01.py) — Column: Value Existence Check (column01.py)
  window.CONTENT_I18N["python:61"] = {
    en: {
      title: "Column: Value Existence Check (column01.py)",
      concept: "The `not` operator inverts the result of a condition. `not True` becomes `False`, and `not False` becomes `True`. This column also covers truthiness evaluation of numeric values within conditional expressions.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:61:conceptJa"
    }
  };

  // Lesson 62: コラム：三項演算子（条件式） (column02.py) — Column: Ternary Operator (Conditional Expression) (column02.py)
  window.CONTENT_I18N["python:62"] = {
    en: {
      title: "Column: Ternary Operator (Conditional Expression) (column02.py)",
      concept: "The `not` operator inverts the result of a condition. `not True` becomes `False`, and `not False` becomes `True`. This column covers using conditional expressions (ternary operator) for concise value assignment based on a condition.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:62:conceptJa"
    }
  };

  // Lesson 63: 演習：正・負・ゼロの数値判定 (script4-1.py) — Exercise: Positive, Negative, or Zero (script4-1.py)
  window.CONTENT_I18N["python:63"] = {
    en: {
      title: "Exercise: Positive, Negative, or Zero (script4-1.py)",
      concept: "**Chapter 4 Practice Exercise (script4-1.py)**\n\nTask: Determine whether an integer is positive, negative, or zero.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:63:conceptJa"
    }
  };

  // Lesson 64: 演習：二つの大小判定 (script4-2.py) — Exercise: Comparing Two Numbers (script4-2.py)
  window.CONTENT_I18N["python:64"] = {
    en: {
      title: "Exercise: Comparing Two Numbers (script4-2.py)",
      concept: "**Chapter 4 Practice Exercise (script4-2.py)**\n\nTask: Input two floating-point numbers and compare their magnitudes.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:64:conceptJa"
    }
  };

  // Lesson 65: 演習：時間帯に応じた挨拶の自動分岐 (script4-3.py) — Exercise: Automatic Greeting by Time of Day (script4-3.py)
  window.CONTENT_I18N["python:65"] = {
    en: {
      title: "Exercise: Automatic Greeting by Time of Day (script4-3.py)",
      concept: "**Chapter 4 Practice Exercise (script4-3.py)**\n\nTask: Print a greeting based on a 24-hour time input.\n\nCheck the template code in the editor and fill in the missing parts. Use chained comparisons and `or` to check multiple time ranges.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:65:conceptJa"
    }
  };

  // Lesson 66: リストの作成と出力 (list01.py) — Creating and Outputting a List (list01.py)
  window.CONTENT_I18N["python:66"] = {
    en: {
      title: "Creating and Outputting a List (list01.py)",
      concept: "A **list** is a collection that stores multiple values together, like an array. Create a list using square brackets `[]` with elements separated by commas. Access elements with `list[index]`. Remember that **indexing starts at 0**.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:66:conceptJa"
    }
  };

  // Lesson 67: リストのネスト (list02.py) — Nested Lists (list02.py)
  window.CONTENT_I18N["python:67"] = {
    en: {
      title: "Nested Lists (list02.py)",
      concept: "A **list** is a collection that stores multiple values together. Lists can be **nested** — a list can contain another list as an element. Create lists with square brackets `[]`. Elements are accessed using `list[index]`, and **indexing starts at 0**.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:67:conceptJa"
    }
  };

  // Lesson 68: インデックスによる要素取得 (list03.py) — Accessing Elements by Index (list03.py)
  window.CONTENT_I18N["python:68"] = {
    en: {
      title: "Accessing Elements by Index (list03.py)",
      concept: "A **list** stores multiple values in square brackets `[]`. Access individual elements using `list[index]`. **Indexing starts at 0**, so `list[0]` gives the first element, `list[1]` gives the second, and so on.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:68:conceptJa"
    }
  };

  // Lesson 69: 負のインデックスの使用 (list04.py) — Using Negative Indices (list04.py)
  window.CONTENT_I18N["python:69"] = {
    en: {
      title: "Using Negative Indices (list04.py)",
      concept: "A **list** stores multiple values in square brackets `[]`. Python supports **negative indexing**: `list[-1]` returns the last element, `list[-2]` returns the second-to-last, and so on. This is a convenient way to access elements from the end of a list.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:69:conceptJa"
    }
  };

  // Lesson 70: スライスによる範囲取得 (list05.py) — Slicing: Getting a Range of Elements (list05.py)
  window.CONTENT_I18N["python:70"] = {
    en: {
      title: "Slicing: Getting a Range of Elements (list05.py)",
      concept: "A **list** stores multiple values in square brackets `[]`. Use **slicing** (`list[start:end]`) to extract a sublist. The start index is included, but the end index is **excluded**. For example, `lst[1:3]` returns elements at positions 1 and 2.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:70:conceptJa"
    }
  };

  // Lesson 71: スライスの開始・終了の省略 (list06.py) — Omitting Slice Start and End (list06.py)
  window.CONTENT_I18N["python:71"] = {
    en: {
      title: "Omitting Slice Start and End (list06.py)",
      concept: "A **list** stores multiple values in square brackets `[]`. In a slice `list[start:end]`, you can **omit** the start or end index. `lst[:2]` gets elements from the beginning up to (but not including) index 2. `lst[1:]` gets elements from index 1 to the end.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:71:conceptJa"
    }
  };

  // Lesson 72: リストのアンパック (list07.py) — List Unpacking (list07.py)
  window.CONTENT_I18N["python:72"] = {
    en: {
      title: "List Unpacking (list07.py)",
      concept: "Common list operations include:\n\n- `append(value)` — Add to the end\n- `insert(position, value)` — Insert at a specific position\n- `pop(position)` — Remove and return an element at a position\n- `remove(value)` — Remove the first matching element\n- `del list[position]` — Delete by position\n\n**Unpacking** assigns each list element to a variable: `a, b, c = lst`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:72:conceptJa"
    }
  };

  // Lesson 73: アンパック要素数の不一致エラー (list08.py) — Unpacking Element Count Mismatch Error (list08.py)
  window.CONTENT_I18N["python:73"] = {
    en: {
      title: "Unpacking Element Count Mismatch Error (list08.py)",
      concept: "Common list operations include `append()`, `insert()`, `pop()`, `remove()`, and `del`. When unpacking a list into variables, the number of variables **must match** the number of elements. If you write `a, b = lst` but `lst` has 3 elements, Python raises a **ValueError**.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:73:conceptJa"
    }
  };

  // Lesson 74: in演算子による存在確認 (list09.py) — Checking Existence with `in` (list09.py)
  window.CONTENT_I18N["python:74"] = {
    en: {
      title: "Checking Existence with `in` (list09.py)",
      concept: "Common list operations include `append()`, `insert()`, `pop()`, `remove()`, and `del`. Use the `in` operator to check whether a value exists in a list: `'abc' in lst` returns `True` or `False`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:74:conceptJa"
    }
  };

  // Lesson 75: index()による要素位置検索 (list10.py) — Finding Element Position with index() (list10.py)
  window.CONTENT_I18N["python:75"] = {
    en: {
      title: "Finding Element Position with index() (list10.py)",
      concept: "Common list operations include `append()`, `insert()`, `pop()`, `remove()`, and `del`. Use `list.index(value)` to find the index position of a specific element. If the element does not exist, Python raises a **ValueError**.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:75:conceptJa"
    }
  };

  // Lesson 76: インデックス指定による要素の書き換え (list11.py) — Modifying Elements by Index (list11.py)
  window.CONTENT_I18N["python:76"] = {
    en: {
      title: "Modifying Elements by Index (list11.py)",
      concept: "Common list operations include `append()`, `insert()`, `pop()`, `remove()`, and `del`. You can modify a list element by assigning a new value to an index: `lst[1] = 6.2`. Lists are **mutable**, meaning their contents can be changed after creation.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:76:conceptJa"
    }
  };

  // Lesson 77: (+=)によるリストの末尾結合 (list12.py) — Appending Lists with += (list12.py)
  window.CONTENT_I18N["python:77"] = {
    en: {
      title: "Appending Lists with += (list12.py)",
      concept: "Common list operations include `append()`, `insert()`, `pop()`, `remove()`, and `del`. Use the `+=` operator to extend a list with elements from another list: `lst += [20]` appends 20 to the end of `lst`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:77:conceptJa"
    }
  };

  // Lesson 78: append()による要素追加 (list13.py) — Adding Elements with append() (list13.py)
  window.CONTENT_I18N["python:78"] = {
    en: {
      title: "Adding Elements with append() (list13.py)",
      concept: "Common list operations include `append()`, `insert()`, `pop()`, `remove()`, and `del`. Use `list.append(value)` to add a single element to the **end** of a list. This is the most common way to grow a list dynamically.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:78:conceptJa"
    }
  };

  // Lesson 79: insert()による位置指定挿入 (list14.py) — Inserting Elements at a Position with insert() (list14.py)
  window.CONTENT_I18N["python:79"] = {
    en: {
      title: "Inserting Elements at a Position with insert() (list14.py)",
      concept: "Advanced list operations include searching, sorting, and copying:\n\n- `index(value)` — Get the index of a value\n- `count(value)` — Count matching elements\n- `sort()` — Sort in ascending order\n- `reverse()` — Reverse the order\n- `copy()` — Create a shallow copy\n\nUse `insert(position, value)` to insert at a specific index.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:79:conceptJa"
    }
  };

  // Lesson 80: del文による要素削除 (list15.py) — Deleting Elements with del (list15.py)
  window.CONTENT_I18N["python:80"] = {
    en: {
      title: "Deleting Elements with del (list15.py)",
      concept: "Advanced list operations include `index()`, `count()`, `sort()`, `reverse()`, and `copy()`. Use `del list[index]` to permanently delete an element at a specific position from a list or dictionary.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:80:conceptJa"
    }
  };

  // Lesson 81: pop()による要素取り出しと削除 (list16.py) — Popping and Removing Elements with pop() (list16.py)
  window.CONTENT_I18N["python:81"] = {
    en: {
      title: "Popping and Removing Elements with pop() (list16.py)",
      concept: "Advanced list operations include `index()`, `count()`, `sort()`, `reverse()`, and `copy()`. Use `list.pop(index)` to **remove and return** an element at a given position. If no index is given, `pop()` removes and returns the **last** element.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:81:conceptJa"
    }
  };

  // Lesson 82: remove()による値指定削除 (list17.py) — Deleting by Value with remove() (list17.py)
  window.CONTENT_I18N["python:82"] = {
    en: {
      title: "Deleting by Value with remove() (list17.py)",
      concept: "Advanced list operations include `index()`, `count()`, `sort()`, `reverse()`, and `copy()`. Use `list.remove(value)` to delete the **first occurrence** of a specific value from the list. If the value is not found, Python raises a **ValueError**.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:82:conceptJa"
    }
  };

  // Lesson 83: 値の存在確認をしてから削除 (list18.py) — Safe Deletion by Checking Existence First (list18.py)
  window.CONTENT_I18N["python:83"] = {
    en: {
      title: "Safe Deletion by Checking Existence First (list18.py)",
      concept: "Advanced list operations include `index()`, `count()`, `sort()`, `reverse()`, and `copy()`. To avoid errors when deleting, first check if the value exists using `in`: `if 'XYZ' in lst:` before calling `lst.remove('XYZ')`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:83:conceptJa"
    }
  };

  // Lesson 84: len()によるリスト長さの取得 (list19.py) — Getting List Length with len() (list19.py)
  window.CONTENT_I18N["python:84"] = {
    en: {
      title: "Getting List Length with len() (list19.py)",
      concept: "Advanced list operations include `index()`, `count()`, `sort()`, `reverse()`, and `copy()`. Use `len(list)` to get the number of elements in a list. `len()` is a built-in Python function that works on lists, tuples, strings, and other collections.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:84:conceptJa"
    }
  };

  // Lesson 85: 末尾要素の安全な取得 (list20.py) — Safely Getting the Last Element (list20.py)
  window.CONTENT_I18N["python:85"] = {
    en: {
      title: "Safely Getting the Last Element (list20.py)",
      concept: "Advanced list operations include `index()`, `count()`, `sort()`, `reverse()`, and `copy()`. To safely get the last element, use `list[len(list) - 1]`. You can also use negative indexing: `list[-1]` is simpler and more common.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:85:conceptJa"
    }
  };

  // Lesson 86: コラム：min()とmax() (listcolumn01.py) — Column: min() and max() (listcolumn01.py)
  window.CONTENT_I18N["python:86"] = {
    en: {
      title: "Column: min() and max() (listcolumn01.py)",
      concept: "Advanced list operations include `index()`, `count()`, `sort()`, `reverse()`, and `copy()`. Use `min(list)` to get the smallest value and `max(list)` to get the largest value. These built-in functions work on any iterable of comparable elements.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:86:conceptJa"
    }
  };

  // Lesson 87: コラム：文字列混在時の極値エラー (listcolumn02.py) — Column: Extremum Error with Mixed Types (listcolumn02.py)
  window.CONTENT_I18N["python:87"] = {
    en: {
      title: "Column: Extremum Error with Mixed Types (listcolumn02.py)",
      concept: "Advanced list operations include `index()`, `count()`, `sort()`, `reverse()`, and `copy()`. `min()` and `max()` do **not** work on lists that contain mixed types (e.g., numbers and strings). Trying to compare incompatible types raises a **TypeError**.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:87:conceptJa"
    }
  };

  // Lesson 88: タプルへの追加変更エラー (tuple01.py) — Tuple Modification Error (tuple01.py)
  window.CONTENT_I18N["python:88"] = {
    en: {
      title: "Tuple Modification Error (tuple01.py)",
      concept: "A **tuple** is similar to a list, but its elements **cannot be changed, added, or removed** after creation. Create a tuple with parentheses `()`. Use tuples when you want to protect data from accidental modification.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:88:conceptJa"
    }
  };

  // Lesson 89: タプルの作成と基本 (tuple02.py) — Creating and Using Tuples (tuple02.py)
  window.CONTENT_I18N["python:89"] = {
    en: {
      title: "Creating and Using Tuples (tuple02.py)",
      concept: "A **tuple** is similar to a list, but its elements **cannot be changed, added, or removed** after creation. Create a tuple with parentheses `()`. Tuples are **immutable** — use them when data should remain constant throughout the program.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:89:conceptJa"
    }
  };

  // Lesson 90: 要素数が1のタプルの作成注意点 (tuple03.py) — Creating Single-Element Tuples (tuple03.py)
  window.CONTENT_I18N["python:90"] = {
    en: {
      title: "Creating Single-Element Tuples (tuple03.py)",
      concept: "A **tuple** is an immutable collection created with parentheses `()`. To create a tuple with one element, you **must** include a trailing comma: `(10,)`. Writing `(10)` without the comma creates an integer, not a tuple.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:90:conceptJa"
    }
  };

  // Lesson 91: タプルの要素取得とスライス (tuple04.py) — Accessing and Slicing Tuples (tuple04.py)
  window.CONTENT_I18N["python:91"] = {
    en: {
      title: "Accessing and Slicing Tuples (tuple04.py)",
      concept: "A **tuple** is an immutable collection created with parentheses `()`. Even though tuples cannot be modified, you **can** read elements using indexing (`tpl[1]`) and slicing (`tpl[1:3]`) — just like lists.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:91:conceptJa"
    }
  };

  // Lesson 92: len()によるタプル長さの取得 (tuple05.py) — Getting Tuple Length with len() (tuple05.py)
  window.CONTENT_I18N["python:92"] = {
    en: {
      title: "Getting Tuple Length with len() (tuple05.py)",
      concept: "A **tuple** is an immutable collection created with parentheses `()`. Use `len(tuple)` to get the number of elements. The `in` operator also works with tuples: `3.14 in tpl` returns `True` or `False`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:92:conceptJa"
    }
  };

  // Lesson 93: コラム：リストとタプルの相互変換 (tuplecolumun.py) — Column: Converting Between Lists and Tuples (tuplecolumun.py)
  window.CONTENT_I18N["python:93"] = {
    en: {
      title: "Column: Converting Between Lists and Tuples (tuplecolumun.py)",
      concept: "A **tuple** is an immutable collection. Convert a tuple to a list with `list(tuple)` to make it mutable. Convert a list to a tuple with `tuple(list)` to make it immutable. This conversion is useful when you need to temporarily modify tuple data.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:93:conceptJa"
    }
  };

  // Lesson 94: 辞書の作成と出力 (jisho01.py) — Creating and Outputting a Dictionary (jisho01.py)
  window.CONTENT_I18N["python:94"] = {
    en: {
      title: "Creating and Outputting a Dictionary (jisho01.py)",
      concept: "A **dictionary (dict)** stores key-value pairs. Create a dictionary with curly braces `{}` using the syntax `{key: value}`. Access elements by their key using `dict[key]`, not by numeric index. Keys are unique and provide fast lookups.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:94:conceptJa"
    }
  };

  // Lesson 95: キー重複時の動作 (jisho02.py) — Behavior When Keys Are Duplicated (jisho02.py)
  window.CONTENT_I18N["python:95"] = {
    en: {
      title: "Behavior When Keys Are Duplicated (jisho02.py)",
      concept: "A **dictionary (dict)** stores key-value pairs using curly braces `{}`. Dictionary keys must be **unique**. If you specify the same key twice, the **last value overwrites** the earlier one. No error is raised — the duplicate key's value is simply replaced.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:95:conceptJa"
    }
  };

  // Lesson 96: キーによる値の取得 (jisho03.py) — Getting Values by Key (jisho03.py)
  window.CONTENT_I18N["python:96"] = {
    en: {
      title: "Getting Values by Key (jisho03.py)",
      concept: "A **dictionary (dict)** stores key-value pairs. Retrieve a value by its key using bracket notation: `dct[key]`. If the key does not exist, Python raises a **KeyError**. Unlike lists, dictionaries do not use numeric indices.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:96:conceptJa"
    }
  };

  // Lesson 97: 辞書のスライス不可エラー (jisho04.py) — Dictionary Slice Not Supported Error (jisho04.py)
  window.CONTENT_I18N["python:97"] = {
    en: {
      title: "Dictionary Slice Not Supported Error (jisho04.py)",
      concept: "A **dictionary (dict)** stores key-value pairs. Dictionaries **do not support slicing** like lists do. Trying to use slice notation like `dct[:2]` on a dictionary raises a **TypeError**, because dictionaries are unordered and accessed by key, not position.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:97:conceptJa"
    }
  };

  // Lesson 98: get()メソッドによる安全な値取得 (jisho05.py) — Safe Value Retrieval with get() (jisho05.py)
  window.CONTENT_I18N["python:98"] = {
    en: {
      title: "Safe Value Retrieval with get() (jisho05.py)",
      concept: "A **dictionary (dict)** stores key-value pairs. Use `dict.get(key)` for safe access — it returns `None` (or a default value) if the key doesn't exist, instead of raising a **KeyError**. For example, `dct.get(999, 'not found')` returns `'not found'` if key 999 is missing.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:98:conceptJa"
    }
  };

  // Lesson 99: キー指定による値の書き換え (jisho06.py) — Updating Values by Key (jisho06.py)
  window.CONTENT_I18N["python:99"] = {
    en: {
      title: "Updating Values by Key (jisho06.py)",
      concept: "Dictionary operations include:\n\n- `d[new_key] = value` — Add a new key-value pair\n- `d[existing_key] = value` — Update an existing value\n- `d.get(key)` — Safely get a value\n- `d.pop(key)` — Remove a key and return its value\n- `d.keys()` — Get all keys, `d.values()` — Get all values",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:99:conceptJa"
    }
  };

  // Lesson 100: 新しいキーでの要素の追加 (jisho07.py) — Adding New Key-Value Pairs (jisho07.py)
  window.CONTENT_I18N["python:100"] = {
    en: {
      title: "Adding New Key-Value Pairs (jisho07.py)",
      concept: "Dictionary operations include adding, updating, and deleting entries. To add a new key-value pair, assign a value to a new key: `dct[201] = 'ABC'`. If the key already exists, the value will be **updated** instead.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:100:conceptJa"
    }
  };

  // Lesson 101: del文による要素削除 (jisho08.py) — Deleting Dictionary Elements with del (jisho08.py)
  window.CONTENT_I18N["python:101"] = {
    en: {
      title: "Deleting Dictionary Elements with del (jisho08.py)",
      concept: "Dictionary operations include adding, updating, and deleting entries. Use `del dict[key]` to delete a specific key-value pair. If the key does not exist, Python raises a **KeyError**.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:101:conceptJa"
    }
  };

  // Lesson 102: 存在しないキーの削除エラー (jisho09.py) — Error When Deleting a Non-Existent Key (jisho09.py)
  window.CONTENT_I18N["python:102"] = {
    en: {
      title: "Error When Deleting a Non-Existent Key (jisho09.py)",
      concept: "Dictionary operations include adding, updating, and deleting entries. Using `del dict[key]` on a key that does **not exist** raises a **KeyError**. Always check for existence with `in` or use the `pop()` method to handle missing keys safely.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:102:conceptJa"
    }
  };

  // Lesson 103: 存在確認をしてから要素削除 (jisho10.py) — Safe Deletion by Checking Existence First (jisho10.py)
  window.CONTENT_I18N["python:103"] = {
    en: {
      title: "Safe Deletion by Checking Existence First (jisho10.py)",
      concept: "Dictionary operations include adding, updating, and deleting entries. To safely delete, first check if the key exists using `in`: `if 999 in dct:` before calling `del dct[999]`. This prevents **KeyError**.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:103:conceptJa"
    }
  };

  // Lesson 104: keys()によるキー一覧の取得 (jisho11.py) — Getting All Keys with keys() (jisho11.py)
  window.CONTENT_I18N["python:104"] = {
    en: {
      title: "Getting All Keys with keys() (jisho11.py)",
      concept: "Dictionary operations include adding, updating, and deleting entries. Use `dict.keys()` to get a dynamic view of all keys. Changes to the dictionary are reflected in the keys view. Use `list(dict.keys())` to convert it to a list.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:104:conceptJa"
    }
  };

  // Lesson 105: items()によるキーと値のペア取得 (jisho12.py) — Getting Key-Value Pairs with items() (jisho12.py)
  window.CONTENT_I18N["python:105"] = {
    en: {
      title: "Getting Key-Value Pairs with items() (jisho12.py)",
      concept: "Dictionary operations include adding, updating, and deleting entries. Use `dict.items()` to get a dynamic view of all key-value pairs as tuples. Changes to the dictionary are reflected in the items view.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:105:conceptJa"
    }
  };

  // Lesson 106: values()による値の存在判定 (jisho_values01.py) — Checking Value Existence with values() (jisho_values01.py)
  window.CONTENT_I18N["python:106"] = {
    en: {
      title: "Checking Value Existence with values() (jisho_values01.py)",
      concept: "Dictionary operations include adding, updating, and deleting entries. Use `dict.values()` to get a view of all values. Combined with `in`, you can check if a value exists: `if 'xyz' in dct.values():`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:106:conceptJa"
    }
  };

  // Lesson 107: 集合の作成（set関数） (shugou01.py) — Creating Sets with set() (shugou01.py)
  window.CONTENT_I18N["python:107"] = {
    en: {
      title: "Creating Sets with set() (shugou01.py)",
      concept: "A **set** is a collection that **contains no duplicate elements** and has **no defined order**. Create a set using curly braces `{}` or the `set()` function. Sets support mathematical operations like **intersection** (`&`) and **union** (`|`).",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:107:conceptJa"
    }
  };

  // Lesson 108: 集合のリテラル作成と重複排除 (shugou02.py) — Creating Sets with Literals and Deduplication (shugou02.py)
  window.CONTENT_I18N["python:108"] = {
    en: {
      title: "Creating Sets with Literals and Deduplication (shugou02.py)",
      concept: "A **set** contains **no duplicate elements** and has **no defined order**. Create a set directly with curly braces: `{10, 3.14, 'abc', 10}`. Duplicate values like 10 are automatically removed — the set deduplicates them.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:108:conceptJa"
    }
  };

  // Lesson 109: 集合の要素存在判定 (shugou03.py) — Checking Element Existence in a Set (shugou03.py)
  window.CONTENT_I18N["python:109"] = {
    en: {
      title: "Checking Element Existence in a Set (shugou03.py)",
      concept: "A **set** contains **no duplicate elements** and has **no defined order**. Use the `in` operator to check whether a value exists in a set: `if 3.14 in st:`. Set membership testing is very fast (O(1) average).",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:109:conceptJa"
    }
  };

  // Lesson 110: remove()による要素削除 (shugou04.py) — Removing Elements with remove() (shugou04.py)
  window.CONTENT_I18N["python:110"] = {
    en: {
      title: "Removing Elements with remove() (shugou04.py)",
      concept: "A **set** contains **no duplicate elements** and has **no defined order**. Use `set.remove(value)` to delete an element. If the element does not exist, `remove()` raises a **KeyError**. Use `set.discard(value)` instead to remove safely without error.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:110:conceptJa"
    }
  };

  // Lesson 111: add()による要素追加 (shugou05.py) — Adding Elements with add() (shugou05.py)
  window.CONTENT_I18N["python:111"] = {
    en: {
      title: "Adding Elements with add() (shugou05.py)",
      concept: "A set is a collection that contains no duplicate elements and has no defined order. Create a set using curly braces `{}` or the `set()` function. Sets support mathematical operations like intersection (`&`) and union (`|`). To add an element to a set, use `set.add(value)`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:111:conceptJa"
    }
  };

  // Lesson 112: 集合を用いたリストの重複排除 (set_list.py) — Deduplicating a List Using a Set (set_list.py)
  window.CONTENT_I18N["python:112"] = {
    en: {
      title: "Deduplicating a List Using a Set (set_list.py)",
      concept: "To remove duplicates from a list, a common Python technique is to convert the list to a set with `set()` (which automatically removes duplicates), then convert it back to a list with `list()`. This is a fast and concise way to deduplicate data.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:112:conceptJa"
    }
  };

  // Lesson 113: 演習：成績リストの作成と表示 (script5-1.py) — Exercise: Create and Display a Score List (script5-1.py)
  window.CONTENT_I18N["python:113"] = {
    en: {
      title: "Exercise: Create and Display a Score List (script5-1.py)",
      concept: "**Chapter 5 Practice Exercise (script5-1.py)**\n\nTask: Create a score list and display it.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:113:conceptJa"
    }
  };

  // Lesson 114: 演習：リストを用いた合計と平均の算出 (script5-2.py) — Exercise: Calculate Total and Average Using List Indexes (script5-2.py)
  window.CONTENT_I18N["python:114"] = {
    en: {
      title: "Exercise: Calculate Total and Average Using List Indexes (script5-2.py)",
      concept: "**Chapter 5 Practice Exercise (script5-2.py)**\n\nTask: Calculate the total and average score by accessing list elements by index.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:114:conceptJa"
    }
  };

  // Lesson 115: 演習：リスト要素の安全な削除 (script5-3.py) — Exercise: Safely Deleting List Elements (script5-3.py)
  window.CONTENT_I18N["python:115"] = {
    en: {
      title: "Exercise: Safely Deleting List Elements (script5-3.py)",
      concept: "**Chapter 5 Practice Exercise (script5-3.py)**\n\nTask: Safely delete elements from a list.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:115:conceptJa"
    }
  };

  // Lesson 116: 演習：生徒名と成績の辞書の定义 (script5-4.py) — Exercise: Define a Dictionary of Student Names and Scores (script5-4.py)
  window.CONTENT_I18N["python:116"] = {
    en: {
      title: "Exercise: Define a Dictionary of Student Names and Scores (script5-4.py)",
      concept: "**Chapter 5 Practice Exercise (script5-4.py)**\n\nTask: Define a dictionary storing student names and their scores.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:116:conceptJa"
    }
  };

  // Lesson 117: 演習：ネストされた多科目成績辞書の定義 (script5-5.py) — Exercise: Define a Nested Dictionary for Multiple Subjects (script5-5.py)
  window.CONTENT_I18N["python:117"] = {
    en: {
      title: "Exercise: Define a Nested Dictionary for Multiple Subjects (script5-5.py)",
      concept: "**Chapter 5 Practice Exercise (script5-5.py)**\n\nTask: Define a nested dictionary that stores student scores across multiple subjects.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:117:conceptJa"
    }
  };

  // Lesson 118: 演習：辞書内データの安全な存在チェックと検索 (script5-6.py) — Exercise: Safe Lookup in a Nested Dictionary (script5-6.py)
  window.CONTENT_I18N["python:118"] = {
    en: {
      title: "Exercise: Safe Lookup in a Nested Dictionary (script5-6.py)",
      concept: "**Chapter 5 Practice Exercise (script5-6.py)**\n\nTask: Enter a student name to look up their subject scores in a nested dictionary.\n\nCheck the template code in the editor and fill in the missing parts. Use `in` to check key existence before accessing the dictionary to avoid KeyError.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:118:conceptJa"
    }
  };

  // Lesson 119: range()で生成される連続値 (kurikaeshi01.py) — Generating Consecutive Values with range() (kurikaeshi01.py)
  window.CONTENT_I18N["python:119"] = {
    en: {
      title: "Generating Consecutive Values with range() (kurikaeshi01.py)",
      concept: "Use the `for` loop to repeat a process a specified number of times. `for i in range(5):` assigns integers from 0 to 4 to variable `i` and repeats 5 times. `range(start, stop)` defines a start and exclusive end. `range(start, stop, step)` adds a step value.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:119:conceptJa"
    }
  };

  // Lesson 120: range()の開始と終了指定 (kurikaeshi02.py) — Specifying the Start and End of range() (kurikaeshi02.py)
  window.CONTENT_I18N["python:120"] = {
    en: {
      title: "Specifying the Start and End of range() (kurikaeshi02.py)",
      concept: "Use the `for` loop to repeat a process a specified number of times. `for i in range(5):` assigns integers from 0 to 4 to variable `i`. `range(3, 5)` produces 3 to 4 (the end value is exclusive). Use `range(start, stop)` to control the start and end points.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:120:conceptJa"
    }
  };

  // Lesson 121: range()のステップ指定（正数） (kurikaeshi03.py) — Specifying a Positive Step in range() (kurikaeshi03.py)
  window.CONTENT_I18N["python:121"] = {
    en: {
      title: "Specifying a Positive Step in range() (kurikaeshi03.py)",
      concept: "Use the `for` loop to repeat a process a specified number of times. `range(1, 5, 2)` produces 1, 3 — the third argument (step) controls the increment between values. `range(start, stop, step)` generates an arithmetic progression.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:121:conceptJa"
    }
  };

  // Lesson 122: range()のステップ指定（負数） (kurikaeshi04.py) — Specifying a Negative Step in range() (kurikaeshi04.py)
  window.CONTENT_I18N["python:122"] = {
    en: {
      title: "Specifying a Negative Step in range() (kurikaeshi04.py)",
      concept: "Use the `for` loop to repeat a process a specified number of times. `range(10, 4, -2)` produces 10, 8, 6 — a negative step creates a decreasing sequence. The start value must be greater than the end value when using a negative step.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:122:conceptJa"
    }
  };

  // Lesson 123: for文を用いた繰り返し (kurikaeshi05.py) — Repeating with the for Loop (kurikaeshi05.py)
  window.CONTENT_I18N["python:123"] = {
    en: {
      title: "Repeating with the for Loop (kurikaeshi05.py)",
      concept: "Use the `for` loop to repeat a process a specified number of times. `for i in range(3):` assigns 0, 1, 2 to variable `i` sequentially, running the indented block each time. Always include the colon `:` and 4-space indentation.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:123:conceptJa"
    }
  };

  // Lesson 124: 減少する値でのループ処理 (kurikaeshi06.py) — Looping with Decreasing Values (kurikaeshi06.py)
  window.CONTENT_I18N["python:124"] = {
    en: {
      title: "Looping with Decreasing Values (kurikaeshi06.py)",
      concept: "Using a `for` loop, you can iterate through a collection by extracting elements from start to end. `for item in list:` processes each element. When applied to a dictionary, the loop extracts keys by default. A negative step in `range()` creates a decreasing loop.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:124:conceptJa"
    }
  };

  // Lesson 125: インデックスによるリスト反復 (kurikaeshi07.py) — Iterating a List by Index (kurikaeshi07.py)
  window.CONTENT_I18N["python:125"] = {
    en: {
      title: "Iterating a List by Index (kurikaeshi07.py)",
      concept: "Using a `for` loop, you can iterate through a collection by extracting elements from start to end. `for i in range(len(lst)):` lets you traverse a list using its index, accessing each element with `lst[i]`. The colon `:` and 4-space indentation are required.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:125:conceptJa"
    }
  };

  // Lesson 126: for inによるリストの直接反復 (kurikaeshi08.py) — Directly Iterating a List with for...in (kurikaeshi08.py)
  window.CONTENT_I18N["python:126"] = {
    en: {
      title: "Directly Iterating a List with for...in (kurikaeshi08.py)",
      concept: "Using a `for` loop, you can iterate through a collection by extracting elements from start to end. `for v in lst:` directly gives each element in the list without needing an index. When applied to a dictionary, the loop extracts keys by default.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:126:conceptJa"
    }
  };

  // Lesson 127: 集合(set)のループ処理 (kurikaeshi09.py) — Iterating a Set with a for Loop (kurikaeshi09.py)
  window.CONTENT_I18N["python:127"] = {
    en: {
      title: "Iterating a Set with a for Loop (kurikaeshi09.py)",
      concept: "Using a `for` loop, you can iterate through a collection by extracting elements from start to end. `for v in st:` works with sets too, iterating over each element. Remember that sets are unordered, so the iteration order is not guaranteed. Always include the colon `:` and proper indentation.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:127:conceptJa"
    }
  };

  // Lesson 128: 辞書のループ処理（キーの取得） (kurikaeshi10.py) — Iterating Dictionary Keys (kurikaeshi10.py)
  window.CONTENT_I18N["python:128"] = {
    en: {
      title: "Iterating Dictionary Keys (kurikaeshi10.py)",
      concept: "Using a `for` loop, you can iterate through a collection by extracting elements from start to end. `for k in dct:` iterates over the keys of a dictionary by default. Use `dct[k]` inside the loop to access the corresponding values.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:128:conceptJa"
    }
  };

  // Lesson 129: 辞書キーから対応する値を取得 (kurikaeshi11.py) — Reading Dictionary Values by Key in a Loop (kurikaeshi11.py)
  window.CONTENT_I18N["python:129"] = {
    en: {
      title: "Reading Dictionary Values by Key in a Loop (kurikaeshi11.py)",
      concept: "A `while` loop repeats as long as a condition remains `True`. When the condition becomes `False`, the loop exits. Be careful to update the condition within the loop, or it will become an infinite loop that never ends.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:129:conceptJa"
    }
  };

  // Lesson 130: items()によるタプルでの辞書反復 (kurikaeshi12.py) — Iterating Dictionary Key-Value Tuples with items() (kurikaeshi12.py)
  window.CONTENT_I18N["python:130"] = {
    en: {
      title: "Iterating Dictionary Key-Value Tuples with items() (kurikaeshi12.py)",
      concept: "A `while` loop repeats as long as a condition remains `True`. Use `dict.items()` to get a view of key-value pairs as tuples. `for kv in dct.items():` iterates over each key-value tuple, which can then be unpacked or accessed by index.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:130:conceptJa"
    }
  };

  // Lesson 131: アンパックを用いた辞書キーと値の反復 (kurikaeshi13.py) — Iterating Dictionary Keys and Values with Unpacking (kurikaeshi13.py)
  window.CONTENT_I18N["python:131"] = {
    en: {
      title: "Iterating Dictionary Keys and Values with Unpacking (kurikaeshi13.py)",
      concept: "A `while` loop repeats as long as a condition remains `True`. Use tuple unpacking in a `for` loop: `for k, v in dct.items():` assigns each key and value directly to variables `k` and `v`, making the code cleaner and more readable.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:131:conceptJa"
    }
  };

  // Lesson 132: while文による条件繰り返し (kurikaeshi14.py) — Conditional Looping with while (kurikaeshi14.py)
  window.CONTENT_I18N["python:132"] = {
    en: {
      title: "Conditional Looping with while (kurikaeshi14.py)",
      concept: "When a `break` statement is executed inside a loop, it forcefully terminates the loop immediately, and execution continues with the code after the loop. `break` is commonly combined with an `if` statement to exit a loop when a condition is met.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:132:conceptJa"
    }
  };

  // Lesson 133: while文でのカウンタ処理 (kurikaeshi15.py) — Counter Processing with while (kurikaeshi15.py)
  window.CONTENT_I18N["python:133"] = {
    en: {
      title: "Counter Processing with while (kurikaeshi15.py)",
      concept: "When a `break` statement is executed inside a loop, it forcefully terminates the loop immediately. A `while` loop with a counter variable is a common pattern: update the counter inside the loop so the condition eventually becomes `False` and the loop ends naturally.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:133:conceptJa"
    }
  };

  // Lesson 134: while Trueによる無限ループ (kurikaeshi16.py) — Infinite Loop with while True (kurikaeshi16.py)
  window.CONTENT_I18N["python:134"] = {
    en: {
      title: "Infinite Loop with while True (kurikaeshi16.py)",
      concept: "When a `continue` statement is executed, the remaining code in the current iteration is skipped, and execution jumps to the next iteration (the top of the loop). Understand the difference: `break` exits the entire loop, while `continue` only skips the current round.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:134:conceptJa"
    }
  };

  // Lesson 135: 無限ループからのbreak脱出 (kurikaeshi17.py) — Exiting an Infinite Loop with break (kurikaeshi17.py)
  window.CONTENT_I18N["python:135"] = {
    en: {
      title: "Exiting an Infinite Loop with break (kurikaeshi17.py)",
      concept: "When a `continue` statement is executed, the remaining code in the current iteration is skipped. Use `break` inside an infinite `while True` loop to exit when a certain condition is met. This pattern is common for menu-driven programs where the user decides when to quit.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:135:conceptJa"
    }
  };

  // Lesson 136: continueによる反復スキップ (kurikaeshi18.py) — Skipping Iterations with continue (kurikaeshi18.py)
  window.CONTENT_I18N["python:136"] = {
    en: {
      title: "Skipping Iterations with continue (kurikaeshi18.py)",
      concept: "When a `continue` statement is executed, the remaining code in the current iteration is skipped, and execution jumps to the top of the loop for the next iteration. `continue` is useful for skipping unwanted values while keeping the loop running.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:136:conceptJa"
    }
  };

  // Lesson 137: 演習：for文を用いたリストの合計点算出 (script6-1.py) — Exercise: Using for Loop to Sum List Scores (script6-1.py)
  window.CONTENT_I18N["python:137"] = {
    en: {
      title: "Exercise: Using for Loop to Sum List Scores (script6-1.py)",
      concept: "**Chapter 6 Practice Exercise (script6-1.py)**\n\nTask: Calculate the total and average of scores stored in a list using a `for` loop.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:137:conceptJa"
    }
  };

  // Lesson 138: 演習：辞書ループによる全生徒成績の出力 (script6-2.py) — Exercise: Printing All Student Scores with a Dictionary Loop (script6-2.py)
  window.CONTENT_I18N["python:138"] = {
    en: {
      title: "Exercise: Printing All Student Scores with a Dictionary Loop (script6-2.py)",
      concept: "**Chapter 6 Practice Exercise (script6-2.py)**\n\nTask: Use a `for` loop with `items()` to iterate over a dictionary and print all student names and their scores.\n\nCheck the template code in the editor and fill in the missing parts. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:138:conceptJa"
    }
  };

  // Lesson 139: 演習：while無限ループによる対話型成績検索 (script6-3.py) — Exercise: Interactive Score Lookup with while Infinite Loop (script6-3.py)
  window.CONTENT_I18N["python:139"] = {
    en: {
      title: "Exercise: Interactive Score Lookup with while Infinite Loop (script6-3.py)",
      concept: "**Chapter 6 Practice Exercise (script6-3.py)**\n\nTask: Implement an interactive student score lookup using a `while True` infinite loop with `break`.\n\nCheck the template code in the editor and fill in the missing parts. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:139:conceptJa"
    }
  };

  // Lesson 140: 関数の基本定義と呼び出し (kansu01.py) — Defining and Calling a Function Without Parameters (kansu01.py)
  window.CONTENT_I18N["python:140"] = {
    en: {
      title: "Defining and Calling a Function Without Parameters (kansu01.py)",
      concept: "A **function** is an independent program unit that bundles multiple statements together. Define a function with `def function_name():`, indent the body, and call it with `function_name()`. Functions help avoid repeating the same code.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:140:conceptJa"
    }
  };

  // Lesson 141: 関数の定義順とエラー (kansu02.py) — Function Definition Order and Errors (kansu02.py)
  window.CONTENT_I18N["python:141"] = {
    en: {
      title: "Function Definition Order and Errors (kansu02.py)",
      concept: "A **function** is an independent program unit that bundles multiple statements together. In Python, a function must be **defined before it is called**. If you call a function before defining it, Python raises a `NameError`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:141:conceptJa"
    }
  };

  // Lesson 142: 複数回呼び出す関数の挙動 (kansu03.py) — Calling the Same Function Multiple Times (kansu03.py)
  window.CONTENT_I18N["python:142"] = {
    en: {
      title: "Calling the Same Function Multiple Times (kansu03.py)",
      concept: "A **function** is an independent program unit that bundles multiple statements together. You can call the same function multiple times, including inside a loop. Each call executes the function body from the beginning, making code reusable.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:142:conceptJa"
    }
  };

  // Lesson 143: 引数を持つ関数の定義 (kansu04.py) — Defining a Function with a Single Parameter (kansu04.py)
  window.CONTENT_I18N["python:143"] = {
    en: {
      title: "Defining a Function with a Single Parameter (kansu04.py)",
      concept: "A **function** is an independent program unit that bundles multiple statements together. Define a function with parameters inside the parentheses: `def function_name(param):`. The parameter acts as a variable that receives the value passed when the function is called.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:143:conceptJa"
    }
  };

  // Lesson 144: 引数のデータ型 (kansu05.py) — Passing Different Data Types as Arguments (kansu05.py)
  window.CONTENT_I18N["python:144"] = {
    en: {
      title: "Passing Different Data Types as Arguments (kansu05.py)",
      concept: "A **function** is an independent program unit that bundles multiple statements together. Parameters can accept arguments of different data types. The function processes whatever value is passed, as long as the operations inside are compatible with the data type.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:144:conceptJa"
    }
  };

  // Lesson 145: 複数の引数を持つ関数 (kansu06.py) — Defining a Function with Multiple Parameters (kansu06.py)
  window.CONTENT_I18N["python:145"] = {
    en: {
      title: "Defining a Function with Multiple Parameters (kansu06.py)",
      concept: "A **parameter** is information passed into a function from outside when calling it. Define it inside the parentheses like `def cook(food):`. Functions can have multiple parameters separated by commas. The order of arguments must match the parameter order.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:145:conceptJa"
    }
  };

  // Lesson 146: 引数の呼び出し順とデータ型 (kansu07.py) — Argument Passing Order and Type Matching (kansu07.py)
  window.CONTENT_I18N["python:146"] = {
    en: {
      title: "Argument Passing Order and Type Matching (kansu07.py)",
      concept: "A **parameter** is information passed into a function from outside when calling it. Arguments are assigned to parameters positionally — the first argument goes to the first parameter, and so on. Using variables as arguments works the same way.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:146:conceptJa"
    }
  };

  // Lesson 147: デフォルト値を持つ引数 (kansu09.py) — Function Parameters with Default Values (kansu09.py)
  window.CONTENT_I18N["python:147"] = {
    en: {
      title: "Function Parameters with Default Values (kansu09.py)",
      concept: "A **parameter** is information passed into a function from outside when calling it. Parameters can have default values assigned with `=`, like `def cook(name='Curry'):`. When the argument is omitted, the default value is used automatically.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:147:conceptJa"
    }
  };

  // Lesson 148: デフォルト引数の呼び出し省略 (kansu10.py) — Omitting Default Arguments (kansu10.py)
  window.CONTENT_I18N["python:148"] = {
    en: {
      title: "Omitting Default Arguments (kansu10.py)",
      concept: "A **parameter** is information passed into a function from outside when calling it. If a parameter has a default value, you can omit that argument when calling the function. You can still override the default by explicitly passing a different value.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:148:conceptJa"
    }
  };

  // Lesson 149: キーワード引数による呼び出し (kansu11.py) — Using Keyword Arguments (kansu11.py)
  window.CONTENT_I18N["python:149"] = {
    en: {
      title: "Using Keyword Arguments (kansu11.py)",
      concept: "A **return value** is the result that a function sends back to the caller using `return value`. When `return` is executed, the function immediately exits and sends the value back. Keyword arguments let you specify which parameter gets which value by name.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:149:conceptJa"
    }
  };

  // Lesson 150: 通常引数とデフォルト引数の定義位置ルール (kansu12.py) — Default Parameters Must Come After Non-Default Parameters (kansu12.py)
  window.CONTENT_I18N["python:150"] = {
    en: {
      title: "Default Parameters Must Come After Non-Default Parameters (kansu12.py)",
      concept: "A **return value** is the result that a function sends back to the caller using `return value`. In Python, parameters with default values must be defined **after** all parameters without default values. Otherwise, a `SyntaxError` is raised.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:150:conceptJa"
    }
  };

  // Lesson 151: 可変長引数 (*args) (kansu13.py) — Variable-Length Arguments (*args) (kansu13.py)
  window.CONTENT_I18N["python:151"] = {
    en: {
      title: "Variable-Length Arguments (*args) (kansu13.py)",
      concept: "A **return value** is the result that a function sends back to the caller using `return value`. Use `*args` to accept a variable number of positional arguments. `args` becomes a tuple inside the function. This is useful when you don't know how many arguments will be passed.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:151:conceptJa"
    }
  };

  // Lesson 152: キーワード可変長引数 (**kwargs) (kansu14.py) — Keyword Variable-Length Arguments (**kwargs) (kansu14.py)
  window.CONTENT_I18N["python:152"] = {
    en: {
      title: "Keyword Variable-Length Arguments (**kwargs) (kansu14.py)",
      concept: "A **return value** is the result that a function sends back to the caller using `return value`. Use `**kwargs` to accept a variable number of keyword arguments. `kwargs` becomes a dictionary inside the function, with parameter names as keys and passed values as values.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:152:conceptJa"
    }
  };

  // Lesson 153: 通常引数と可変長引数の組み合わせ (kansu15.py) — Combining Regular and Variable-Length Arguments (kansu15.py)
  window.CONTENT_I18N["python:153"] = {
    en: {
      title: "Combining Regular and Variable-Length Arguments (kansu15.py)",
      concept: "A **return value** is the result that a function sends back to the caller using `return value`. You can combine regular parameters, `*args`, and `**kwargs` in a single function definition. Regular parameters come first, then `*args`, then `**kwargs`. Keyword arguments can be passed in any order.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:153:conceptJa"
    }
  };

  // Lesson 154: 引数デフォルト値の高度な変更 (kansu16.py) — Advanced Default Parameter Usage (kansu16.py)
  window.CONTENT_I18N["python:154"] = {
    en: {
      title: "Advanced Default Parameter Usage (kansu16.py)",
      concept: "When defining a function, you can set default values for parameters like `def greet(name='Guest'):`. If the argument is omitted when calling, the default value is used. You can mix default and non-default parameters, but all default parameters must come after non-default ones.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:154:conceptJa"
    }
  };

  // Lesson 155: return文による戻り値の返却 (kansu17.py) — Returning Values with return (kansu17.py)
  window.CONTENT_I18N["python:155"] = {
    en: {
      title: "Returning Values with return (kansu17.py)",
      concept: "When defining a function, you can set default values for parameters like `def greet(name='Guest'):`. The `return` statement sends a value back from the function to the caller. Once `return` executes, the function exits immediately. The returned value can be stored in a variable.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:155:conceptJa"
    }
  };

  // Lesson 156: 演習：成績の合計と平均を表示する関数 (script7-1.py) — Exercise: A Function to Print Total and Average Scores (script7-1.py)
  window.CONTENT_I18N["python:156"] = {
    en: {
      title: "Exercise: A Function to Print Total and Average Scores (script7-1.py)",
      concept: "**Chapter 7 Practice Exercise (script7-1.py)**\n\nTask: Define a function that accepts three scores and prints their total and average.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:156:conceptJa"
    }
  };

  // Lesson 157: 戻り値を受け取る変数の割り当て (kansu18.py) — Receiving a Return Value in a Variable (kansu18.py)
  window.CONTENT_I18N["python:157"] = {
    en: {
      title: "Receiving a Return Value in a Variable (kansu18.py)",
      concept: "When defining a function, you can set default values for parameters like `def greet(name='Guest'):`. A function can return a value that is captured by the caller. Code written after `return` inside the function is never executed because `return` exits the function immediately.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:157:conceptJa"
    }
  };

  // Lesson 158: returnによる関数の途中終了 (kansu19.py) — Early Termination of a Function with return (kansu19.py)
  window.CONTENT_I18N["python:158"] = {
    en: {
      title: "Early Termination of a Function with return (kansu19.py)",
      concept: "When defining a function, you can set default values for parameters like `def greet(name='Guest'):`. The `return` statement can be used to exit a function early. Any code after `return` is skipped. This is useful for guard clauses that validate inputs at the top of a function.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:158:conceptJa"
    }
  };

  // Lesson 159: 複数の戻り値を返す関数 (kansu20.py) — Returning Multiple Values from a Function (Tuple Unpacking) (kansu20.py)
  window.CONTENT_I18N["python:159"] = {
    en: {
      title: "Returning Multiple Values from a Function (Tuple Unpacking) (kansu20.py)",
      concept: "When defining a function, you can set default values for parameters like `def greet(name='Guest'):`. Python allows returning multiple values by separating them with commas in the `return` statement. They are returned as a tuple, which can be unpacked into separate variables.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:159:conceptJa"
    }
  };

  // Lesson 160: ローカル変数とグローバル変数 (kansu_a1.py) — Local Variables vs Global Variables (kansu_a1.py)
  window.CONTENT_I18N["python:160"] = {
    en: {
      title: "Local Variables vs Global Variables (kansu_a1.py)",
      concept: "A variable defined inside a function is a **local variable** — it can only be accessed within that function. Trying to use a local variable outside its function raises a `NameError`. Variables defined outside any function are **global variables** and can be accessed from anywhere.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:160:conceptJa"
    }
  };

  // Lesson 161: 演習：計算と取得を行う戻り値付き関数 (script7-2.py) — Exercise: A Function with Return Values for Calculation and Retrieval (script7-2.py)
  window.CONTENT_I18N["python:161"] = {
    en: {
      title: "Exercise: A Function with Return Values for Calculation and Retrieval (script7-2.py)",
      concept: "**Chapter 7 Practice Exercise (script7-2.py)**\n\nTask: Define a function with return values that performs calculations and retrieves results.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:161:conceptJa"
    }
  };

  // Lesson 162: 演習：デフォルト値と戻り値を持つ成績処理関数 (script7-3.py) — Exercise: Grade Processing Function with Default Values and Return Values (script7-3.py)
  window.CONTENT_I18N["python:162"] = {
    en: {
      title: "Exercise: Grade Processing Function with Default Values and Return Values (script7-3.py)",
      concept: "**Chapter 7 Practice Exercise (script7-3.py)**\n\nTask: Define a grade processing function with default parameter values and return values.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:162:conceptJa"
    }
  };

  // Lesson 163: クラスの基本定義 (class01.py) — Basic Class Definition and Empty Instance (class01.py)
  window.CONTENT_I18N["python:163"] = {
    en: {
      title: "Basic Class Definition and Empty Instance (class01.py)",
      concept: "A **class** is a blueprint for creating objects. Define a class with `class ClassName:` and define **instance variables (attributes)** inside it to hold data. An instance is created by calling the class like a function: `stu1 = Student()`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:163:conceptJa"
    }
  };

  // Lesson 164: コンストラクタの初期値設定 (class02.py) — Constructor Initial Value Setting (class02.py)
  window.CONTENT_I18N["python:164"] = {
    en: {
      title: "Constructor Initial Value Setting (class02.py)",
      concept: "The **constructor** (`__init__` method in Python) is automatically executed when creating an object from a class. The first parameter is always `self`, which refers to the instance itself. Parameters to `__init__` can set initial attribute values.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:164:conceptJa"
    }
  };

  // Lesson 165: メソッドの定義とself (class03.py) — Defining Methods and the self Keyword (class03.py)
  window.CONTENT_I18N["python:165"] = {
    en: {
      title: "Defining Methods and the self Keyword (class03.py)",
      concept: "Functions defined inside a class are called **methods**. The first parameter of every method is `self`, which refers to the current instance. Access instance variables with `self.variable_name`. Methods can access and modify an object's data.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:165:conceptJa"
    }
  };

  // Lesson 166: クラス変数とインスタンス変数 (class04.py) — Class Variables vs Instance Variables (class04.py)
  window.CONTENT_I18N["python:166"] = {
    en: {
      title: "Class Variables vs Instance Variables (class04.py)",
      concept: "A **class variable** is shared across all instances of a class (defined directly in the class body). An **instance variable** is unique to each instance (defined in `__init__` using `self`). A class can contain multiple methods: some display data, some return computed values, and some modify attributes.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:166:conceptJa"
    }
  };

  // Lesson 167: 演習：成績を保持するStudentクラスの定義 (script8-1.py) — Exercise: Define a Student Class That Holds Scores (script8-1.py)
  window.CONTENT_I18N["python:167"] = {
    en: {
      title: "Exercise: Define a Student Class That Holds Scores (script8-1.py)",
      concept: "**Chapter 8 Practice Exercise (script8-1.py)**\n\nTask: Define a Student class that holds student names and subject scores.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:167:conceptJa"
    }
  };

  // Lesson 168: 演習：クラスメソッドによる合計・平均の計算 (script8-2.py) — Exercise: Calculate Total and Average with Class Methods (script8-2.py)
  window.CONTENT_I18N["python:168"] = {
    en: {
      title: "Exercise: Calculate Total and Average with Class Methods (script8-2.py)",
      concept: "**Chapter 8 Practice Exercise (script8-2.py)**\n\nTask: Add methods to the Student class for calculating total and average scores.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:168:conceptJa"
    }
  };

  // Lesson 169: 演習：インスタンスリストの走査と成績一覧出力 (script8-3.py) — Exercise: Iterate Over an Instance List and Print Scores (script8-3.py)
  window.CONTENT_I18N["python:169"] = {
    en: {
      title: "Exercise: Iterate Over an Instance List and Print Scores (script8-3.py)",
      concept: "**Chapter 8 Practice Exercise (script8-3.py)**\n\nTask: Create a list of student objects and print scores using a loop.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:169:conceptJa"
    }
  };

  // Lesson 170: 関数モジュールの作成 (my_func.py) — Creating a Function Module (my_func.py)
  window.CONTENT_I18N["python:170"] = {
    en: {
      title: "Creating a Function Module (my_func.py)",
      concept: "An independent `.py` file containing Python code is called a **module**. Use `import module_name` to bring functions and classes defined in other files into your code for reuse.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:170:conceptJa"
    }
  };

  // Lesson 171: クラスモジュールの作成 (my_class.py) — Creating a Class Module (my_class.py)
  window.CONTENT_I18N["python:171"] = {
    en: {
      title: "Creating a Class Module (my_class.py)",
      concept: "An independent `.py` file containing Python code is called a **module**. Use `import module_name` to bring functions and classes defined in other files into your code for reuse.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:171:conceptJa"
    }
  };

  // Lesson 172: 複合モジュールスクリプト (calc_account.py) — Composite Module Script (calc_account.py)
  window.CONTENT_I18N["python:172"] = {
    en: {
      title: "Composite Module Script (calc_account.py)",
      concept: "An independent `.py` file containing Python code is called a **module**. Use `import module_name` to bring functions and classes defined in other files into your code for reuse.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:172:conceptJa"
    }
  };

  // Lesson 173: パッケージ内クラス定義 (my_class.py) — Class Definition Inside a Package (my_class.py)
  window.CONTENT_I18N["python:173"] = {
    en: {
      title: "Class Definition Inside a Package (my_class.py)",
      concept: "A folder containing multiple modules (files) is called a **package**. A package folder must contain a special file `__init__.py` that runs when the package is initialized.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:173:conceptJa"
    }
  };

  // Lesson 174: パッケージ内関数定義 (my_func.py) — Function Definition Inside a Package (my_func.py)
  window.CONTENT_I18N["python:174"] = {
    en: {
      title: "Function Definition Inside a Package (my_func.py)",
      concept: "A folder containing multiple modules (files) is called a **package**. A package folder must contain a special file `__init__.py` that runs when the package is initialized.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:174:conceptJa"
    }
  };

  // Lesson 175: 深層パッケージ内関数定義 (my_func.py) — Function Definition Inside a Nested Sub-Package (my_func.py)
  window.CONTENT_I18N["python:175"] = {
    en: {
      title: "Function Definition Inside a Nested Sub-Package (my_func.py)",
      concept: "When writing `module_name.function_name` is too long, use `from module_name import function_name` to omit the module name. You can also use `as` to create an alias: `import library as lib`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:175:conceptJa"
    }
  };

  // Lesson 176: import文によるモジュール読み込み (script.py) — Loading Modules with import (script.py)
  window.CONTENT_I18N["python:176"] = {
    en: {
      title: "Loading Modules with import (script.py)",
      concept: "An independent `.py` file containing Python code is called a **module**. Use `import module_name` to bring functions and classes defined in other files into your code for reuse.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:176:conceptJa"
    }
  };

  // Lesson 177: パッケージからモジュールを導入 (script_package01.py) — Importing a Module from a Package (script_package01.py)
  window.CONTENT_I18N["python:177"] = {
    en: {
      title: "Importing a Module from a Package (script_package01.py)",
      concept: "A folder containing multiple modules (files) is called a **package**. A package folder must contain a special file `__init__.py` that runs when the package is initialized.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:177:conceptJa"
    }
  };

  // Lesson 178: ネストされたパッケージの導入 (script_package02.py) — Importing from a Nested Package (script_package02.py)
  window.CONTENT_I18N["python:178"] = {
    en: {
      title: "Importing from a Nested Package (script_package02.py)",
      concept: "A folder containing multiple modules (files) is called a **package**. A package folder must contain a special file `__init__.py` that runs when the package is initialized.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:178:conceptJa"
    }
  };

  // Lesson 179: パッケージ初期化ファイル (__init__.py) — Package Initialization File (__init__.py)
  window.CONTENT_I18N["python:179"] = {
    en: {
      title: "Package Initialization File (__init__.py)",
      concept: "A folder containing multiple modules (files) is called a **package**. A package folder must contain a special file `__init__.py` that runs when the package is initialized.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:179:conceptJa"
    }
  };

  // Lesson 180: from文による特定モジュールの指定インポート (script_package03.py) — Importing a Specific Module with from (script_package03.py)
  window.CONTENT_I18N["python:180"] = {
    en: {
      title: "Importing a Specific Module with from (script_package03.py)",
      concept: "When writing `module_name.function_name` is too long, use `from module_name import function_name` to omit the module name. You can also use `as` to create an alias: `import library as lib`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:180:conceptJa"
    }
  };

  // Lesson 181: from文で特定関数を直接インポート (script_package04.py) — Importing Specific Functions Directly with from (script_package04.py)
  window.CONTENT_I18N["python:181"] = {
    en: {
      title: "Importing Specific Functions Directly with from (script_package04.py)",
      concept: "When writing `module_name.function_name` is too long, use `from module_name import function_name` to omit the module name. You can also use `as` to create an alias: `import library as lib`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:181:conceptJa"
    }
  };

  // Lesson 182: as文によるモジュールのエイリアス（別名） (script_package05.py) — Creating Module Aliases with as (script_package05.py)
  window.CONTENT_I18N["python:182"] = {
    en: {
      title: "Creating Module Aliases with as (script_package05.py)",
      concept: "When writing `module_name.function_name` is too long, use `from module_name import function_name` to omit the module name. You can also use `as` to create an alias: `import library as lib`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:182:conceptJa"
    }
  };

  // Lesson 183: 深層パッケージ初期化ファイル (__init__.py) — Nested Sub-Package Initialization (__init__.py)
  window.CONTENT_I18N["python:183"] = {
    en: {
      title: "Nested Sub-Package Initialization (__init__.py)",
      concept: "When writing `module_name.function_name` is too long, use `from module_name import function_name` to omit the module name. You can also use `as` to create an alias: `import library as lib`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:183:conceptJa"
    }
  };

  // Lesson 184: 演習：別モジュールに定義されたクラスのインポートと利用 (script9-2.py) — Exercise: Import and Use a Class Defined in Another Module (script9-2.py)
  window.CONTENT_I18N["python:184"] = {
    en: {
      title: "Exercise: Import and Use a Class Defined in Another Module (script9-2.py)",
      concept: "**Chapter 9 Practice Exercise (script9-2.py)**\n\nTask: Import a custom class and search function from external modules to look up a student.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:184:conceptJa"
    }
  };

  // Lesson 185: 現在日時の取得 (hiduke01.py) — Getting the Current Date and Time (hiduke01.py)
  window.CONTENT_I18N["python:185"] = {
    en: {
      title: "Getting the Current Date and Time (hiduke01.py)",
      concept: "To handle dates and times in Python, use the standard library `datetime` module. Call `datetime.now()` to quickly get the current date-time object.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:185:conceptJa"
    }
  };

  // Lesson 186: 指定日時のdatetime作成 (hiduke02.py) — Creating a datetime with a Specific Date and Time (hiduke02.py)
  window.CONTENT_I18N["python:186"] = {
    en: {
      title: "Creating a datetime with a Specific Date and Time (hiduke02.py)",
      concept: "To handle dates and times in Python, use the standard library `datetime` module. Call `datetime.now()` to quickly get the current date-time object.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:186:conceptJa"
    }
  };

  // Lesson 187: 時分を省略した日付作成 (hiduke03.py) — Creating a Date Object Without Time (hiduke03.py)
  window.CONTENT_I18N["python:187"] = {
    en: {
      title: "Creating a Date Object Without Time (hiduke03.py)",
      concept: "To handle dates and times in Python, use the standard library `datetime` module. Call `datetime.now()` to quickly get the current date-time object.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:187:conceptJa"
    }
  };

  // Lesson 188: 無効な日付指定のエラー (hiduke04.py) — Invalid Date Specification Error (hiduke04.py)
  window.CONTENT_I18N["python:188"] = {
    en: {
      title: "Invalid Date Specification Error (hiduke04.py)",
      concept: "To handle dates and times in Python, use the standard library `datetime` module. Passing an invalid date (e.g., month 2 day 30) raises a `ValueError`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:188:conceptJa"
    }
  };

  // Lesson 189: date.today()による本日の日付 (hiduke05.py) — Getting Today's Date with date.today() (hiduke05.py)
  window.CONTENT_I18N["python:189"] = {
    en: {
      title: "Getting Today's Date with date.today() (hiduke05.py)",
      concept: "To handle dates and times in Python, use the standard library `datetime` module. Call `date.today()` to get the current date.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:189:conceptJa"
    }
  };

  // Lesson 190: 未来日付の作成 (hiduke06.py) — Creating a Future Date (hiduke06.py)
  window.CONTENT_I18N["python:190"] = {
    en: {
      title: "Creating a Future Date (hiduke06.py)",
      concept: "To handle dates and times in Python, use the standard library `datetime` module. You can create a future date by passing year, month, and day to `date()`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:190:conceptJa"
    }
  };

  // Lesson 191: 日時の大小比較 (hiduke07.py) — Comparing Dates (hiduke07.py)
  window.CONTENT_I18N["python:191"] = {
    en: {
      title: "Comparing Dates (hiduke07.py)",
      concept: "Subtracting two dates produces a `timedelta` object representing the time difference. To output a date-time object in an arbitrary string format (e.g., `2026/06/04`), use the `strftime()` method.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:191:conceptJa"
    }
  };

  // Lesson 192: timedeltaによる日付の加減算 (hiduke08.py) — Adding and Subtracting Dates with timedelta (hiduke08.py)
  window.CONTENT_I18N["python:192"] = {
    en: {
      title: "Adding and Subtracting Dates with timedelta (hiduke08.py)",
      concept: "Subtracting two dates produces a `timedelta` object representing the time difference. Use `timedelta(days=N)` to add or subtract days. Access the difference in days with `.days` or in seconds with `.seconds`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:192:conceptJa"
    }
  };

  // Lesson 193: datetime差分の秒数換算 (hiduke09.py) — Converting datetime Difference to Seconds (hiduke09.py)
  window.CONTENT_I18N["python:193"] = {
    en: {
      title: "Converting datetime Difference to Seconds (hiduke09.py)",
      concept: "Use `strptime()` to parse a datetime string into a `datetime` object. Specify the format with directives like `%Y`, `%m`, `%d`. Access the difference in days with `.days` or in seconds with `.seconds`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:193:conceptJa"
    }
  };

  // Lesson 194: weekday()による曜日の取得 (hiduke10.py) — Getting the Day of the Week with weekday() (hiduke10.py)
  window.CONTENT_I18N["python:194"] = {
    en: {
      title: "Getting the Day of the Week with weekday() (hiduke10.py)",
      concept: "Subtracting two dates produces a `timedelta` object representing the time difference. Use `date.weekday()` to get the day of the week as an integer (Monday is 0, Sunday is 6).",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:194:conceptJa"
    }
  };

  // Lesson 195: strptimeによる文字列からの日付変換 (hiduke11.py) — Parsing a Date String with strptime (hiduke11.py)
  window.CONTENT_I18N["python:195"] = {
    en: {
      title: "Parsing a Date String with strptime (hiduke11.py)",
      concept: "Subtracting two dates produces a `timedelta` object. Use `datetime.strptime(string, format)` to convert a date string into a `datetime` object by specifying the format with directives like `%Y`, `%m`, `%d`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:195:conceptJa"
    }
  };

  // Lesson 196: strftimeによる日時フォーマット整形 (hiduke12.py) — Formatting a datetime with strftime (hiduke12.py)
  window.CONTENT_I18N["python:196"] = {
    en: {
      title: "Formatting a datetime with strftime (hiduke12.py)",
      concept: "Subtracting two dates produces a `timedelta` object. Use `datetime.strftime(format)` to output a date-time object as a formatted string. Common format codes: `%Y` (year), `%m` (month), `%d` (day), `%H` (hour), `%M` (minute).",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:196:conceptJa"
    }
  };

  // Lesson 197: random()による0〜1の乱数 (ransu01.py) — Generating a Random Float Between 0 and 1 with random() (ransu01.py)
  window.CONTENT_I18N["python:197"] = {
    en: {
      title: "Generating a Random Float Between 0 and 1 with random() (ransu01.py)",
      concept: "Use the `random` module to generate random values:\n- `random.random()` — A float between 0.0 and 1.0\n- `random.randint(a, b)` — An integer between a and b (inclusive)\n- `random.shuffle(list)` — Randomly shuffles a list in place",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:197:conceptJa"
    }
  };

  // Lesson 198: randint()による範囲指定整数乱数 (ransu02.py) — Generating a Random Integer in a Range with randint() (ransu02.py)
  window.CONTENT_I18N["python:198"] = {
    en: {
      title: "Generating a Random Integer in a Range with randint() (ransu02.py)",
      concept: "Use the `random` module to generate random values:\n- `random.random()` — A float between 0.0 and 1.0\n- `random.randint(a, b)` — An integer between a and b (inclusive)\n- `random.shuffle(list)` — Randomly shuffles a list in place",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:198:conceptJa"
    }
  };

  // Lesson 199: choice()によるシーケンス要素のランダム選択 (ransu03.py) — Randomly Selecting an Element from a Sequence with choice() (ransu03.py)
  window.CONTENT_I18N["python:199"] = {
    en: {
      title: "Randomly Selecting an Element from a Sequence with choice() (ransu03.py)",
      concept: "Use the `random` module to generate random values. `random.choice(sequence)` randomly selects and returns one element from a list or other sequence.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:199:conceptJa"
    }
  };

  // Lesson 200: 演習：入力された日付文字列の解析 (script10-1.py) — Exercise: Parse a User-Entered Date String (script10-1.py)
  window.CONTENT_I18N["python:200"] = {
    en: {
      title: "Exercise: Parse a User-Entered Date String (script10-1.py)",
      concept: "**Chapter 10 Practice Exercise (script10-1.py)**\n\nTask: Parse a date string entered by the user into a datetime object.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:200:conceptJa"
    }
  };

  // Lesson 201: 演習：二つの日付の差分日数の計算 (script10-2.py) — Exercise: Calculate Difference in Days Between Two Dates (script10-2.py)
  window.CONTENT_I18N["python:201"] = {
    en: {
      title: "Exercise: Calculate Difference in Days Between Two Dates (script10-2.py)",
      concept: "**Chapter 10 Practice Exercise (script10-2.py)**\n\nTask: Enter two dates and calculate the number of days between them.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:201:conceptJa"
    }
  };

  // Lesson 202: 演習：二つのサイコロを振るゲームシミュレーション (script10-3.py) — Exercise: Dice Rolling Game Simulation (script10-3.py)
  window.CONTENT_I18N["python:202"] = {
    en: {
      title: "Exercise: Dice Rolling Game Simulation (script10-3.py)",
      concept: "**Chapter 10 Practice Exercise (script10-3.py)**\n\nTask: Simulate rolling dice and check if their sum is even or odd.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:202:conceptJa"
    }
  };

  // Lesson 203: with文による自動closeファイル処理 (sample.txt) — Automatic File Close with the with Statement (sample.txt)
  window.CONTENT_I18N["python:203"] = {
    en: {
      title: "Automatic File Close with the with Statement (sample.txt)",
      concept: "If an error occurs during file processing, `close()` may not execute, leaving the file open. Using `with open(...) as f:` **automatically closes the file** when the block exits (even if an error occurs), making code safer and more concise.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:203:conceptJa"
    }
  };

  // Lesson 204: os.path.existsによる存在確認 (arunashi01.py) — Checking File Existence with os.path.exists (arunashi01.py)
  window.CONTENT_I18N["python:204"] = {
    en: {
      title: "Checking File Existence with os.path.exists (arunashi01.py)",
      concept: "To write data to a file, open it with `open('filename', 'w', encoding='utf-8')`. Use `write()` to write text, and always call `close()` when done. Use `os.path.exists()` to check whether a file exists before operating on it.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:204:conceptJa"
    }
  };

  // Lesson 205: read()によるファイル全内容の読込 (yomikomi01.py) — Reading Entire File Contents with read() (yomikomi01.py)
  window.CONTENT_I18N["python:205"] = {
    en: {
      title: "Reading Entire File Contents with read() (yomikomi01.py)",
      concept: "To read a file, open it in `'r'` (read) mode. `read()` reads the entire file as one large string. `readlines()` reads all lines into a list, one line per element.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:205:conceptJa"
    }
  };

  // Lesson 206: with文を用いた安全なファイルオープン (yomikomi01_with.py) — Safe File Opening with the with Statement (yomikomi01_with.py)
  window.CONTENT_I18N["python:206"] = {
    en: {
      title: "Safe File Opening with the with Statement (yomikomi01_with.py)",
      concept: "If an error occurs during file processing, `close()` may not execute, leaving the file open. Using `with open(...) as f:` **automatically closes the file** when the block exits (even if an error occurs), making code safer and more concise.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:206:conceptJa"
    }
  };

  // Lesson 207: readline()によるファイル1行読込 (yomikomi02.py) — Reading a File Line by Line with readline() (yomikomi02.py)
  window.CONTENT_I18N["python:207"] = {
    en: {
      title: "Reading a File Line by Line with readline() (yomikomi02.py)",
      concept: "To read a file, open it in `'r'` (read) mode. `read()` reads the entire file as one large string. `readlines()` reads all lines into a list. Use `readline()` in a loop to read one line at a time until the end of the file.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:207:conceptJa"
    }
  };

  // Lesson 208: readlines()によるファイル全行のリスト取得 (yomikomi03.py) — Reading All Lines into a List with readlines() (yomikomi03.py)
  window.CONTENT_I18N["python:208"] = {
    en: {
      title: "Reading All Lines into a List with readlines() (yomikomi03.py)",
      concept: "To read a file, open it in `'r'` (read) mode. `read()` reads the entire file as one large string. `readlines()` reads all lines into a list, one line per element (including newline characters).",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:208:conceptJa"
    }
  };

  // Lesson 209: open(mode='w')でのファイル新規書込 (kakikomi01.py) — Creating and Writing to a File with w Mode (kakikomi01.py)
  window.CONTENT_I18N["python:209"] = {
    en: {
      title: "Creating and Writing to a File with w Mode (kakikomi01.py)",
      concept: "To write data to a file, open it with `open('filename', 'w', encoding='utf-8')`. Use `write()` to write text, and always call `close()` when done. Use `os.path.exists()` to check whether a file exists before operating on it.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:209:conceptJa"
    }
  };

  // Lesson 210: 演習：students.txtの全内容の読み込みと表示 (script11-1.py) — Exercise: Read and Display All Contents of students.txt (script11-1.py)
  window.CONTENT_I18N["python:210"] = {
    en: {
      title: "Exercise: Read and Display All Contents of students.txt (script11-1.py)",
      concept: "**Chapter 11 Practice Exercise (script11-1.py)**\n\nTask: Open, read, and print all lines from students.txt.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:210:conceptJa"
    }
  };

  // Lesson 211: writelines()によるリスト行書込 (kakikomi02.py) — Writing Multiple Lines from a List with writelines()
  window.CONTENT_I18N["python:211"] = {
    en: {
      title: "Writing Multiple Lines from a List with writelines() (kakikomi02.py)",
      concept: "To write data to a file, open it with `open('filename', 'w', encoding='utf-8')`. Use `write()` to write a string, and always call `close()` when done. To write multiple lines from a list at once, use `f.writelines(list)`. Use `os.path.exists()` to check whether a file exists before operating on it.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:211:conceptJa"
    }
  };

  // Lesson 212: 演習：入力された生徒データをファイルに保存 (script11-2.py) — Exercise: Save User-Entered Student Data to a File (script11-2.py)
  window.CONTENT_I18N["python:212"] = {
    en: {
      title: "Exercise: Save User-Entered Student Data to a File (script11-2.py)",
      concept: "**Chapter 11 Practice Exercise (script11-2.py)**\n\nTask: Save user-entered student data to a file.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:212:conceptJa"
    }
  };

  // Lesson 213: open(mode='a')での既存ファイル追記 (kakikomi03.py) — Appending to an Existing File with Append Mode (kakikomi03.py)
  window.CONTENT_I18N["python:213"] = {
    en: {
      title: "Appending to an Existing File with Append Mode (kakikomi03.py)",
      concept: "To write data to a file, open it with `open('filename', 'w', encoding='utf-8')`. Use `write()` to write a string, and always call `close()` when done. To add content to an existing file without overwriting, open it in append mode `'a'`. Use `os.path.exists()` to check whether a file exists.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:213:conceptJa"
    }
  };

  // Lesson 214: パッケージパスを基準としたファイルオープン (openfile.py) — Opening a File Relative to the Package Path (openfile.py)
  window.CONTENT_I18N["python:214"] = {
    en: {
      title: "Opening a File Relative to the Package Path (openfile.py)",
      concept: "When reading a file from a program, the relative position (path) between the execution directory and the target file is important. The same relative path may break if the program is run from a different working directory, causing a `FileNotFoundError`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:214:conceptJa"
    }
  };

  // Lesson 215: 演習：ファイルを読み込んでリストに格納 (script11-3.py) — Exercise: Read a File and Store Its Lines in a List (script11-3.py)
  window.CONTENT_I18N["python:215"] = {
    en: {
      title: "Exercise: Read a File and Store Its Lines in a List (script11-3.py)",
      concept: "**Chapter 11 Practice Exercise (script11-3.py)**\n\nTask: Read a file and store its contents in a list.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:215:conceptJa"
    }
  };

  // Lesson 216: 演習：ファイルデータをStudentインスタンスとして生成 (script11-4.py) — Exercise: Create Student Instances from File Data (script11-4.py)
  window.CONTENT_I18N["python:216"] = {
    en: {
      title: "Exercise: Create Student Instances from File Data (script11-4.py)",
      concept: "**Chapter 11 Practice Exercise (script11-4.py)**\n\nTask: Generate Student instances from file data.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:216:conceptJa"
    }
  };

  // Lesson 217: ファイル内文字列の一括正規表現マッチ (aaa.txt) — Batch Regex Matching on File Contents (aaa.txt)
  window.CONTENT_I18N["python:217"] = {
    en: {
      title: "Batch Regex Matching on File Contents (aaa.txt)",
      concept: "After reading a file, you can apply `re.search()` line by line to extract only the lines that match a specific pattern. This is useful for filtering log files or structured text data using regular expressions.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:217:conceptJa"
    }
  };

  // Lesson 218: ファイル内文字列の一括正規表現マッチ (bbb.txt) — Batch Regex Matching on File Contents (bbb.txt)
  window.CONTENT_I18N["python:218"] = {
    en: {
      title: "Batch Regex Matching on File Contents (bbb.txt)",
      concept: "After reading a file, you can apply `re.search()` line by line to extract only the lines that match a specific pattern. This is useful for filtering log files or structured text data using regular expressions.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:218:conceptJa"
    }
  };

  // Lesson 219: ファイル内文字列の一括正規表現マッチ (ccc.txt) — Batch Regex Matching on File Contents (ccc.txt)
  window.CONTENT_I18N["python:219"] = {
    en: {
      title: "Batch Regex Matching on File Contents (ccc.txt)",
      concept: "After reading a file, you can apply `re.search()` line by line to extract only the lines that match a specific pattern. This is useful for filtering log files or structured text data using regular expressions.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:219:conceptJa"
    }
  };

  // Lesson 220: ファイル内文字列の一括正規表現マッチ (test-result.txt) — Batch Regex Matching on File Contents (test-result.txt)
  window.CONTENT_I18N["python:220"] = {
    en: {
      title: "Batch Regex Matching on File Contents (test-result.txt)",
      concept: "After reading a file, you can apply `re.search()` line by line to extract only the lines that match a specific pattern. This is useful for filtering log files or structured text data using regular expressions.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:220:conceptJa"
    }
  };

  // Lesson 221: re.searchによる部分一致検索 (seiki01.py) — Partial Match Searching with re.search (seiki01.py)
  window.CONTENT_I18N["python:221"] = {
    en: {
      title: "Partial Match Searching with re.search (seiki01.py)",
      concept: "A **regular expression** is a mechanism for specifying complex string patterns (e.g., 3 digits followed by a hyphen and 4 digits) to search within text. In Python, import the `re` module and use `re.search(pattern, string)`. Common metacharacters include `^` for start-of-string and `$` for end-of-string.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:221:conceptJa"
    }
  };

  // Lesson 222: re.search判定結果オブジェクトのチェック (seiki02.py) — Checking the re.search Result Object (seiki02.py)
  window.CONTENT_I18N["python:222"] = {
    en: {
      title: "Checking the re.search Result Object (seiki02.py)",
      concept: "A **regular expression** is a mechanism for specifying complex string patterns. In Python, import the `re` module and use `re.search(pattern, string)`. Common metacharacters include `^` for start-of-string and `$` for end-of-string.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:222:conceptJa"
    }
  };

  // Lesson 223: 行頭アンカー (^) (seiki03.py) — Start-of-Line Anchor (^) (seiki03.py)
  window.CONTENT_I18N["python:223"] = {
    en: {
      title: "Start-of-Line Anchor (^) (seiki03.py)",
      concept: "A **regular expression** is a mechanism for specifying complex string patterns. In Python, import the `re` module and use `re.search(pattern, string)`. Common metacharacters include `^` for start-of-string and `$` for end-of-string.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:223:conceptJa"
    }
  };

  // Lesson 224: 行末アンカー ($) (seiki04.py) — End-of-Line Anchor ($) (seiki04.py)
  window.CONTENT_I18N["python:224"] = {
    en: {
      title: "End-of-Line Anchor ($) (seiki04.py)",
      concept: "A **regular expression** is a mechanism for specifying complex string patterns. In Python, import the `re` module and use `re.search(pattern, string)`. Common metacharacters include `^` for start-of-string and `$` for end-of-string.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:224:conceptJa"
    }
  };

  // Lesson 225: 厳密一致判定 (^と$の併用) (seiki05.py) — Exact Match Using ^ and $ Together (seiki05.py)
  window.CONTENT_I18N["python:225"] = {
    en: {
      title: "Exact Match Using ^ and $ Together (seiki05.py)",
      concept: "A **regular expression** is a mechanism for specifying complex string patterns. In Python, import the `re` module and use `re.search(pattern, string)`. Common metacharacters include `^` for start-of-string and `$` for end-of-string.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:225:conceptJa"
    }
  };

  // Lesson 226: 任意の一文字 (.) (seiki06.py) — Wildcard: Any Single Character (.) (seiki06.py)
  window.CONTENT_I18N["python:226"] = {
    en: {
      title: "Wildcard: Any Single Character (.) (seiki06.py)",
      concept: "Common regex metacharacters and quantifiers:\n- `.` — Any single character\n- `*` — Zero or more repetitions of the preceding pattern\n- `+` — One or more repetitions of the preceding pattern\n- `[a-z]` — Any single lowercase letter from a to z\n- `\\d` — Any single digit (0-9)",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:226:conceptJa"
    }
  };

  // Lesson 227: 直前文字の0回以上の繰り返し (*) (seiki07.py) — Zero or More Repetitions (*) (seiki07.py)
  window.CONTENT_I18N["python:227"] = {
    en: {
      title: "Zero or More Repetitions (*) (seiki07.py)",
      concept: "Common regex metacharacters and quantifiers:\n- `.` — Any single character\n- `*` — Zero or more repetitions of the preceding pattern\n- `+` — One or more repetitions of the preceding pattern\n- `[a-z]` — Any single lowercase letter from a to z\n- `\\d` — Any single digit (0-9)",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:227:conceptJa"
    }
  };

  // Lesson 228: 直前文字の1回以上の繰り返し (+) (seiki08.py) — One or More Repetitions (+) (seiki08.py)
  window.CONTENT_I18N["python:228"] = {
    en: {
      title: "One or More Repetitions (+) (seiki08.py)",
      concept: "Common regex metacharacters and quantifiers:\n- `.` — Any single character\n- `*` — Zero or more repetitions of the preceding pattern\n- `+` — One or more repetitions of the preceding pattern\n- `[a-z]` — Any single lowercase letter from a to z\n- `\\d` — Any single digit (0-9)",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:228:conceptJa"
    }
  };

  // Lesson 229: 直前文字の0回または1回のみの出現 (?) (seiki09.py) — Zero or One Occurrence (Optional) (?) (seiki09.py)
  window.CONTENT_I18N["python:229"] = {
    en: {
      title: "Zero or One Occurrence (Optional) (?) (seiki09.py)",
      concept: "Common regex metacharacters and quantifiers:\n- `.` — Any single character\n- `*` — Zero or more repetitions of the preceding pattern\n- `+` — One or more repetitions of the preceding pattern\n- `[a-z]` — Any single lowercase letter from a to z\n- `\\d` — Any single digit (0-9)",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:229:conceptJa"
    }
  };

  // Lesson 230: 文字クラスの範囲指定 ([a-z] / [0-9]) (seiki10.py) — Character Class Range Matching (seiki10.py)
  window.CONTENT_I18N["python:230"] = {
    en: {
      title: "Character Class Range Matching [a-z] and [0-9] (seiki10.py)",
      concept: "Common regex metacharacters and quantifiers:\n- `.` — Any single character\n- `*` — Zero or more repetitions of the preceding pattern\n- `+` — One or more repetitions of the preceding pattern\n- `[a-z]` — Any single lowercase letter from a to z\n- `\\d` — Any single digit (0-9)",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:230:conceptJa"
    }
  };

  // Lesson 231: 特殊なエスケープ文字 (\\d) (seiki11.py) — Predefined Character Set \\d for Digits (seiki11.py)
  window.CONTENT_I18N["python:231"] = {
    en: {
      title: "Predefined Character Set \\d for Digits (seiki11.py)",
      concept: "Common real-world validation patterns:\n- Postal code (3-4 digits): `^\\d{3}-\\d{4}$`\n- Phone number: `^\\d{2,4}-\\d{2,4}-\\d{4}$`\n- To specify repetition count directly, use `{count}` or `{min, max}`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:231:conceptJa"
    }
  };

  // Lesson 232: 繰り返し回数の直接指定 ({min, max}) (seiki12.py) — Specifying Repetition Count with Curly Braces (seiki12.py)
  window.CONTENT_I18N["python:232"] = {
    en: {
      title: "Specifying Repetition Count with Curly Braces {m,n} (seiki12.py)",
      concept: "Common real-world validation patterns:\n- Postal code (3-4 digits): `^\\d{3}-\\d{4}$`\n- Phone number: `^\\d{2,4}-\\d{2,4}-\\d{4}$`\n- To specify repetition count directly, use `{count}` or `{min, max}`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:232:conceptJa"
    }
  };

  // Lesson 233: グループ化とマッチ部分の抽出 (seiki13.py) — Regex Grouping and Capturing with Parentheses (seiki13.py)
  window.CONTENT_I18N["python:233"] = {
    en: {
      title: "Regex Grouping and Capturing with Parentheses (seiki13.py)",
      concept: "Common real-world validation patterns:\n- Postal code (3-4 digits): `^\\d{3}-\\d{4}$`\n- Phone number: `^\\d{2,4}-\\d{2,4}-\\d{4}$`\n- To specify repetition count directly, use `{count}` or `{min, max}`.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:233:conceptJa"
    }
  };

  // Lesson 234: 正規表現を用いたファイル走査 (seiki14.py) — Scanning a File with Regular Expressions (seiki14.py)
  window.CONTENT_I18N["python:234"] = {
    en: {
      title: "Scanning a File with Regular Expressions (seiki14.py)",
      concept: "After reading a file, you can apply `re.search()` line by line to extract only the lines that match a specific pattern. This is useful for filtering log files or structured text data using regular expressions.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:234:conceptJa"
    }
  };

  // Lesson 235: 正規表現ファイル走査（グループ抽出版） (seiki14_sep.py) — Regex File Scan with Group Extraction (seiki14_sep.py)
  window.CONTENT_I18N["python:235"] = {
    en: {
      title: "Regex File Scan with Group Extraction (seiki14_sep.py)",
      concept: "After reading a file, you can apply `re.search()` line by line to extract only the lines that match a specific pattern. This is useful for filtering log files or structured text data using regular expressions.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:235:conceptJa"
    }
  };

  // Lesson 236: 正規表現によるユーザー名抽出 (seiki15.py) — Extracting Usernames with Regex (seiki15.py)
  window.CONTENT_I18N["python:236"] = {
    en: {
      title: "Extracting Usernames with Regex (seiki15.py)",
      concept: "After reading a file, you can apply `re.search()` line by line to extract only the lines that match a specific pattern. This is useful for filtering log files or structured text data using regular expressions.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:236:conceptJa"
    }
  };

  // Lesson 237: 正規表現ユーザー名抽出（分離版） (seiki15_sep.py) — Separated Regex Username Extraction (seiki15_sep.py)
  window.CONTENT_I18N["python:237"] = {
    en: {
      title: "Separated Regex Username Extraction (seiki15_sep.py)",
      concept: "After reading a file, you can apply `re.search()` line by line to extract only the lines that match a specific pattern. This is useful for filtering log files or structured text data using regular expressions.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:237:conceptJa"
    }
  };

  // Lesson 238: 正規表現による成績データの抽出 (seiki16.py) — Extracting Score Data with Regex Groups (seiki16.py)
  window.CONTENT_I18N["python:238"] = {
    en: {
      title: "Extracting Score Data with Regex Groups (seiki16.py)",
      concept: "After reading a file, you can apply `re.search()` line by line to extract only the lines that match a specific pattern. This is useful for filtering log files or structured text data using regular expressions.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:238:conceptJa"
    }
  };

  // Lesson 239: 正規表現成績データ抽出（分離版） (seiki16_sep.py) — Separated Regex Score Data Extraction (seiki16_sep.py)
  window.CONTENT_I18N["python:239"] = {
    en: {
      title: "Separated Regex Score Data Extraction (seiki16_sep.py)",
      concept: "After reading a file, you can apply `re.search()` line by line to extract only the lines that match a specific pattern. This is useful for filtering log files or structured text data using regular expressions.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:239:conceptJa"
    }
  };

  // Lesson 240: 演習：正規表現を用いた携帯電話番号の形式検証 (script12-1.py) — Exercise: Validate Phone Number Format with Regex (script12-1.py)
  window.CONTENT_I18N["python:240"] = {
    en: {
      title: "Exercise: Validate Phone Number Format with Regex (script12-1.py)",
      concept: "**Chapter 12 Practice Exercise (script12-1.py)**\n\nTask: Validate the format of a mobile phone number using regular expressions.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:240:conceptJa"
    }
  };

  // Lesson 241: 演習：正規表现を用いたファイルからの生徒データ抽出 (script12-2.py) — Exercise: Extract Student Data from a File Using Regex (script12-2.py)
  window.CONTENT_I18N["python:241"] = {
    en: {
      title: "Exercise: Extract Student Data from a File Using Regex (script12-2.py)",
      concept: "**Chapter 12 Practice Exercise (script12-2.py)**\n\nTask: Extract student data from a file using regular expressions.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:241:conceptJa"
    }
  };

  // Lesson 242: 演習：正規表現グループを用いた複雑成績データのパース (script12-3.py) — Exercise: Parse Complex Score Data Using Regex Groups (script12-3.py)
  window.CONTENT_I18N["python:242"] = {
    en: {
      title: "Exercise: Parse Complex Score Data Using Regex Groups (script12-3.py)",
      concept: "**Chapter 12 Practice Exercise (script12-3.py)**\n\nTask: Parse complex score data using regex capture groups.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:242:conceptJa"
    }
  };

  // Lesson 243: 例外の発生（ゼロ除算） (reigai01.py) — Runtime Exception: Division by Zero (ZeroDivisionError) (reigai01.py)
  window.CONTENT_I18N["python:243"] = {
    en: {
      title: "Runtime Exception: Division by Zero (ZeroDivisionError) (reigai01.py)",
      concept: "Errors that occur during program execution are called **exceptions**. When an exception occurs, the program normally terminates forcefully. To handle errors safely, place normal code in the `try` block and error-handling code in the `except` block.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:243:conceptJa"
    }
  };

  // Lesson 244: 例外の発生（インデックス範囲外） (reigai02.py) — Runtime Exception: Index Out of Range (IndexError) (reigai02.py)
  window.CONTENT_I18N["python:244"] = {
    en: {
      title: "Runtime Exception: Index Out of Range (IndexError) (reigai02.py)",
      concept: "Errors that occur during program execution are called **exceptions**. When an exception occurs, the program normally terminates forcefully. To handle errors safely, place normal code in the `try` block and error-handling code in the `except` block.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:244:conceptJa"
    }
  };

  // Lesson 245: try-except文による例外キャッチ (reigai03.py) — Catching Exceptions with try-except (reigai03.py)
  window.CONTENT_I18N["python:245"] = {
    en: {
      title: "Catching Exceptions with try-except (reigai03.py)",
      concept: "Errors that occur during program execution are called **exceptions**. When an exception occurs, the program normally terminates forcefully. To handle errors safely, place normal code in the `try` block and error-handling code in the `except` block.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:245:conceptJa"
    }
  };

  // Lesson 246: exceptブロックでの例外詳細情報取得 (reigai04.py) — Getting Exception Details in the except Block (reigai04.py)
  window.CONTENT_I18N["python:246"] = {
    en: {
      title: "Getting Exception Details in the except Block (reigai04.py)",
      concept: "Errors that occur during program execution are called **exceptions**. When an exception occurs, the program normally terminates forcefully. To handle errors safely, place normal code in the `try` block and error-handling code in the `except` block.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:246:conceptJa"
    }
  };

  // Lesson 247: elseブロックの使用 (reigai07.py) — Using the else Block (No Exception Occurred) (reigai07.py)
  window.CONTENT_I18N["python:247"] = {
    en: {
      title: "Using the else Block (No Exception Occurred) (reigai07.py)",
      concept: "Errors have specific types such as `ZeroDivisionError` (division by zero), `ValueError` (invalid numeric conversion), and `IndexError` (list index out of range). By specifying the type like `except ValueError:`, you can write different handling for each error type.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:247:conceptJa"
    }
  };

  // Lesson 248: 複数種類の例外への対応 (reigai05.py) — Handling Multiple Exception Types (reigai05.py)
  window.CONTENT_I18N["python:248"] = {
    en: {
      title: "Handling Multiple Exception Types (reigai05.py)",
      concept: "Errors have specific types such as `ZeroDivisionError` (division by zero), `ValueError` (invalid numeric conversion), and `IndexError` (list index out of range). By specifying the type like `except ValueError:`, you can write different handling for each error type.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:248:conceptJa"
    }
  };

  // Lesson 249: 例外の親クラスによる一括キャッチ (reigai06.py) — Catching All Exceptions with the Parent Exception Class (reigai06.py)
  window.CONTENT_I18N["python:249"] = {
    en: {
      title: "Catching All Exceptions with the Parent Exception Class (reigai06.py)",
      concept: "Errors have specific types such as `ZeroDivisionError` (division by zero), `ValueError` (invalid numeric conversion), and `IndexError` (list index out of range). By specifying the type like `except ValueError:`, you can write different handling for each error type.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:249:conceptJa"
    }
  };

  // Lesson 250: 例外処理の呼び出し元への伝播 (reigai08.py) — Exception Propagation to the Caller (reigai08.py)
  window.CONTENT_I18N["python:250"] = {
    en: {
      title: "Exception Propagation to the Caller (reigai08.py)",
      concept: "Errors have specific types such as `ZeroDivisionError` (division by zero), `ValueError` (invalid numeric conversion), and `IndexError` (list index out of range). By specifying the type like `except ValueError:`, you can write different handling for each error type.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:250:conceptJa"
    }
  };

  // Lesson 251: finallyブロックによる必須クリーンアップ (reigai09.py) — Mandatory Cleanup with the finally Block (reigai09.py)
  window.CONTENT_I18N["python:251"] = {
    en: {
      title: "Mandatory Cleanup with the finally Block (reigai09.py)",
      concept: "Use the `finally:` block for code that **must always execute** regardless of whether an exception occurred. This is useful for file close operations. Additionally, use the `raise` keyword to intentionally throw an exception.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:251:conceptJa"
    }
  };

  // Lesson 252: 演習：引数チェックを行う例外送出関数 (script13-1.py) — Exercise: A Function with Argument Validation and Exception Raising (script13-1.py)
  window.CONTENT_I18N["python:252"] = {
    en: {
      title: "Exercise: A Function with Argument Validation and Exception Raising (script13-1.py)",
      concept: "**Chapter 13 Practice Exercise (script13-1.py)**\n\nTask: Create a function that checks arguments and raises exceptions.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:252:conceptJa"
    }
  };

  // Lesson 253: 演習：例外の個別キャッチと復旧処理 (script13-2.py) — Exercise: Catching Specific Exceptions and Recovery (script13-2.py)
  window.CONTENT_I18N["python:253"] = {
    en: {
      title: "Exercise: Catching Specific Exceptions and Recovery (script13-2.py)",
      concept: "**Chapter 13 Practice Exercise (script13-2.py)**\n\nTask: Catch specific exceptions and implement recovery handling.\n\nCheck the template code in the editor and fill in the missing parts to complete the program. Press the Run button on the right to verify the output.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:253:conceptJa"
    }
  };

  // Lesson 254: raise文による意図的な例外スロー (reigai10.py) — Intentionally Throwing an Exception with raise (reigai10.py)
  window.CONTENT_I18N["python:254"] = {
    en: {
      title: "Intentionally Throwing an Exception with raise (reigai10.py)",
      concept: "Use the `finally:` block for code that **must always execute** regardless of whether an exception occurred. This is useful for file close operations. Additionally, use the `raise` keyword to intentionally throw an exception.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:254:conceptJa"
    }
  };

  // Lesson 255: カスタム例外クラスの定義と送出 (reigai11.py) — Defining and Raising Custom Exception Classes (reigai11.py)
  window.CONTENT_I18N["python:255"] = {
    en: {
      title: "Defining and Raising Custom Exception Classes (reigai11.py)",
      concept: "Use the `finally:` block for code that **must always execute** regardless of whether an exception occurred. This is useful for file close operations. Additionally, use the `raise` keyword to intentionally throw an exception.",
      needsReview: true,
      source: "manual-python-en-v1",
      sourceRef: "data/python_lessons.js:255:conceptJa"
    }
  };

})();
