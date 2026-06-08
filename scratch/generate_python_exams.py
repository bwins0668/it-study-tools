import json
import os

def generate_python_questions():
    questions = []
    q_id = 1

    # ------------------ 1 Star Questions (★☆☆) ------------------
    # 1. Print and String formatting (15 questions)
    for i in range(1, 16):
        msg = f"Python Exercise {i}"
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "titleJa": f"メッセージの出力 Vol.{i}",
            "taskJa": f"画面に「{msg}」と出力するプログラムを作成しなさい。",
            "taskZh": f"编写程序在屏幕上输出“{msg}”。",
            "expectedOutput": f"{msg}",
            "solutionCode": f"print(\"{msg}\")",
            "hint": f"print(\"{msg}\") を実行しましょう。",
            "timeLimit": 1200,
            "templateCode": "# ここにコードを書いてください\n"
        })
        q_id += 1

    # 2. Scanner-like / Input / Arithmetic (25 questions)
    for i in range(1, 26):
        factor = i * 3
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "titleJa": f"入力値の乗算 Vol.{i}",
            "taskJa": f"標準入力から整数を1つ受け取り、その数を {factor} 倍した結果を出力するプログラムを作成しなさい。\\n入力例：4\\n期待出力：{4 * factor}",
            "taskZh": f"从标准输入读取一个整数，并输出它乘以 {factor} 的结果。\\n输入示例：4\\n期待输出：{4 * factor}",
            "stdinExample": "4",
            "expectedOutput": f"{4 * factor}",
            "solutionCode": f"val = int(input())\nprint(val * {factor})",
            "hint": f"input() で取得した値を int() で数値に変換し、{factor} を掛けます。",
            "timeLimit": 1200,
            "templateCode": "# ここにコードを書いてください\n"
        })
        q_id += 1

    # 3. Simple IF/ELSE checks (35 questions)
    for i in range(1, 36):
        limit = 40 + i
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "titleJa": f"しきい値判定の出力 Vol.{i}",
            "taskJa": f"標準入力から整数を受け取り、それが {limit} 以上であれば「合格」を、そうでなければ「不合格」と出力しなさい。\\n入力例：{limit + 3}\\n期待出力：合格",
            "taskZh": f"从标准输入读取一个整数，如果大于等于 {limit}，输出“合格”，否则输出“不合格”。\\n输入示例：{limit + 3}\\n期待输出：合格",
            "stdinExample": f"{limit + 3}",
            "expectedOutput": "合格",
            "solutionCode": f"score = int(input())\nif score >= {limit}:\n    print(\"合格\")\nelse:\n    print(\"不合格\")",
            "hint": f"if score >= {limit}: 条件分岐を使用します。",
            "timeLimit": 1200,
            "templateCode": "# ここにコードを書いてください\n"
        })
        q_id += 1

    # 4. Simple Loops (45 questions)
    for i in range(1, 46):
        num = 4 + i
        expected_sum = sum(range(1, num + 1))
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "titleJa": f"1からNまでの合計 Vol.{i}",
            "taskJa": f"標準入力から整数 N を受け取り、1からNまでの整数の合計値を出力するプログラムを作成しなさい。\\n入力例：{num}\\n期待出力：{expected_sum}",
            "taskZh": f"从标准输入读取整数 N，计算并输出从 1 到 N 的所有整数之和。\\n输入示例：{num}\\n期待输出：{expected_sum}",
            "stdinExample": f"{num}",
            "expectedOutput": f"{expected_sum}",
            "solutionCode": f"n = int(input())\ntotal = 0\nfor i in range(1, n + 1):\n    total += i\nprint(total)",
            "hint": "range(1, n + 1) と for ループを組み合わせて加算します。",
            "timeLimit": 1200,
            "templateCode": "# ここにコードを書いてください\n"
        })
        q_id += 1


    # ------------------ 2 Stars Questions (★★☆) ------------------
    # 1. List Filtering and Reduction (40 questions)
    for i in range(1, 41):
        num_elements = 3 + (i % 5)
        op_name = "最大値" if i % 2 == 0 else "合計値"
        elements = [x * 4 for x in range(1, num_elements + 1)]
        stdin_val = " ".join(map(str, elements))
        expected_val = max(elements) if op_name == "最大値" else sum(elements)
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "titleJa": f"リスト要素の{op_name}計算 Vol.{i}",
            "taskJa": f"標準入力からスペース区切りの整数列を受け取り、リストに変換して、その{op_name}を出力するプログラムを作成しなさい。\\n入力例：{stdin_val}\\n期待出力：{expected_val}",
            "taskZh": f"从标准输入读取以空格分隔的一组整数，转换为列表，然后输出其中的{op_name}。\\n输入示例：{stdin_val}\\n期待输出：{expected_val}",
            "stdinExample": stdin_val,
            "expectedOutput": f"{expected_val}",
            "solutionCode": f"numbers = list(map(int, input().split()))\nif \"{op_name}\" == \"最大値\":\n    print(max(numbers))\nelse:\n    print(sum(numbers))",
            "hint": "input().split() と list(map(int, ...)) で入力を整数リストに変換します。",
            "timeLimit": 1200,
            "templateCode": "# ここにコードを書いてください\n"
        })
        q_id += 1

    # 2. String helpers (40 questions)
    for i in range(1, 41):
        target_char = "o" if i % 2 == 0 else "i"
        word = f"pineapple{i}" if i % 2 == 0 else f"delicious{i}"
        expected_cnt = word.count(target_char)
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "titleJa": f"文字列内の文字出現回数 Vol.{i}",
            "taskJa": f"標準入力から文字列を受け取り、その文字列に含まれる文字「{target_char}」の個数を出力するプログラムを作成しなさい。\\n入力例：{word}\\n期待出力：{expected_cnt}",
            "taskZh": f"从标准输入读取一个字符串，统计并输出其中包含字符「{target_char}」的出现次数。\\n输入示例：{word}\\n期待输出：{expected_cnt}",
            "stdinExample": word,
            "expectedOutput": f"{expected_cnt}",
            "solutionCode": f"text = input()\nprint(text.count('{target_char}'))",
            "hint": "Pythonの文字列型には .count(sub) メソッドが用意されています。",
            "timeLimit": 1200,
            "templateCode": "# ここにコードを書いてください\n"
        })
        q_id += 1

    # 3. List Comprehensions & Simple functions (40 questions)
    for i in range(1, 41):
        power_factor = 2 if i % 2 == 0 else 3
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "titleJa": f"リスト内包表記での累乗計算 Vol.{i}",
            "taskJa": f"リスト内包表記を使用し、1から5までの各整数の {power_factor} 乗を含むリストを作成し、そのリストを出力しなさい。\\n期待出力：{[x**power_factor for x in range(1, 6)]}",
            "taskZh": f"使用列表推导式，创建一个包含 1 到 5 中各个整数的 {power_factor} 次幂的列表并输出。\\n期待输出：{[x**power_factor for x in range(1, 6)]}",
            "stdinExample": "",
            "expectedOutput": str([x**power_factor for x in range(1, 6)]),
            "solutionCode": f"squares = [x ** {power_factor} for x in range(1, 6)]\nprint(squares)",
            "hint": f"[x ** {power_factor} for x in range(1, 6)] のようにリスト内包表記を作成します。",
            "timeLimit": 1200,
            "templateCode": "# ここにコードを書いてください\n"
        })
        q_id += 1


    # ------------------ 3 Stars Questions (★★★) ------------------
    # 1. OOP Classes and Objects (25 questions)
    for i in range(1, 26):
        val_w = 4 + i
        val_h = 6 + i
        questions.append({
            "id": q_id,
            "difficulty": "★★★",
            "type": "implement",
            "titleJa": f"Rectangle クラスの定義 Vol.{i}",
            "taskJa": f"幅 width と高さ height を初期化するコンストラクタを持ち、面積を返す area() メソッドを持つ Rectangle クラスを定義しなさい。その後、Rectangle({val_w}, {val_h}) インスタンスを作成し、面積を出力しなさい。\\n期待出力：{val_w * val_h}",
            "taskZh": f"定义一个 Rectangle 类，其构造函数接收 width 与 height，并定义计算并返回面积的 area() 方法。然后创建 Rectangle({val_w}, {val_h}) 的实例并输出其面积。\\n期待输出：{val_w * val_h}",
            "stdinExample": "",
            "expectedOutput": f"{val_w * val_h}",
            "solutionCode": f"class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    def area(self):\n        return self.width * self.height\n\nr = Rectangle({val_w}, {val_h})\nprint(r.area())",
            "hint": "class Rectangle: を定義し、def __init__(self, width, height) でメンバ変数を初期化します。",
            "timeLimit": 1200,
            "templateCode": "# ここにコードを書いてください\n"
        })
        q_id += 1

    # 2. Inheritance & Overrides (25 questions)
    for i in range(1, 26):
        name = f"タロウ{i}"
        sound = f"ワンワン{i}！"
        questions.append({
            "id": q_id,
            "difficulty": "★★★",
            "type": "implement",
            "titleJa": f"クラスの継承とメソッド上書き Vol.{i}",
            "taskJa": f"Animal クラスと、それを継承する Dog クラスを定義しなさい。Animal クラスは name を受け取るコンストラクタと speak() メソッド（「動物が鳴いています」と出力）を持ち、Dog クラスは speak() をオーバーライドして「[name]が{sound}」と出力させなさい。Main 内で Dog(\"{name}\") のインスタンスを生成して speak() を呼び出しなさい。\\n期待出力：{name}が{sound}",
            "taskZh": f"定义 Animal 类以及继承它的 Dog 类。Animal 类在初始化时接受 name 属性，拥有 speak() 输出“动物在叫”，Dog 重写 speak() 输出“[name]が{sound}”。然后实例化 Dog(\"{name}\") 并调用 speak()。\\n期待输出：{name}が{sound}",
            "stdinExample": "",
            "expectedOutput": f"{name}が{sound}",
            "solutionCode": f"class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print(\"動物が鳴いています\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(f\"{{self.name}}が{sound}\")\n\nd = Dog(\"{name}\")\nd.speak()",
            "hint": "class Dog(Animal): を使用して継承関係を構築し、speak(self) をオーバーライドします。",
            "timeLimit": 1200,
            "templateCode": "# ここにコードを書いてください\n"
        })
        q_id += 1

    # 3. Recursion & Advanced loops (20 questions)
    for i in range(1, 21):
        num_val = 3 + (i % 4)
        def calc_fact(n):
            return 1 if n <= 1 else n * calc_fact(n-1)
        expected_val = calc_fact(num_val)
        questions.append({
            "id": q_id,
            "difficulty": "★★★",
            "type": "implement",
            "titleJa": f"再帰による階乗の計算 Vol.{i}",
            "taskJa": f"標準入力から整数 N を受け取り、再帰関数(recursive function)を使ってその階乗(N!)を計算して出力するプログラムを作成しなさい。\\n入力例：{num_val}\\n期待出力：{expected_val}",
            "taskZh": f"从标准输入读取一个整数 N，利用递归函数计算并输出 N 的阶乘（N!）。\\n输入示例：{num_val}\\n期待输出：{expected_val}",
            "stdinExample": str(num_val),
            "expectedOutput": str(expected_val),
            "solutionCode": f"def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nn = int(input())\nprint(factorial(n))",
            "hint": "再帰関数では終了条件 (if n <= 1: return 1) を正しく定義することが最も重要です。",
            "timeLimit": 1200,
            "templateCode": "# ここにコードを書いてください\n"
        })
        q_id += 1

    print(f"Generated {len(questions)} Python questions.")

    # Write to target js file
    output_js = os.path.join(os.getcwd(), "python_exam_questions.js")
    with open(output_js, "w", encoding="utf-8") as f:
        f.write("// Python Mock Exam Questions Database (300+ questions)\n")
        f.write("// Automatically generated by scratch/generate_python_exams.py\n\n")
        f.write("const PYTHON_EXAM_QUESTIONS = ")
        f.write(json.dumps(questions, ensure_ascii=False, indent=2))
        f.write(";\n")
    print(f"Wrote to {output_js}")

if __name__ == '__main__':
    generate_python_questions()
