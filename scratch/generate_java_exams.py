import json
import os

def generate_java_questions():
    questions = []
    q_id = 1

    # ------------------ 1 Star Questions (★☆☆) ------------------
    # 1. Hello World and Print String variations (15 questions)
    for i in range(1, 16):
        msg = f"Java Exercise {i}"
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "titleJa": f"メッセージの出力 Vol.{i}",
            "taskJa": f"画面に「{msg}」と改行付きで出力するプログラムを作成しなさい。クラス名は Main としなさい。",
            "taskZh": f"编写一个程序，在屏幕上输出并换行“{msg}”。使用 Main 作为类名。",
            "stdinExample": "",
            "expectedOutput": f"{msg}",
            "solutionCode": f"public class Main {{\n    public static void main(String[] args) {{\n        System.out.println(\"{msg}\");\n    }}\n}}",
            "templateCode": "public class Main {\n    public static void main(String[] args) {\n        // ここにコードを書いてください\n    }\n}",
            "hint": f"System.out.println(\"{msg}\"); を使用してください。"
        })
        q_id += 1

    # 2. Scanner Arithmetic (25 questions)
    for i in range(1, 26):
        factor = i * 2
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "titleJa": f"標準入力の乗算 Vol.{i}",
            "taskJa": f"標準入力から整数を1つ受け取り、その数を {factor} 倍した結果を「結果: [計算結果]」の形式で出力しなさい。\\n入力例：5\\n期待出力：結果: {5 * factor}",
            "taskZh": f"从标准输入（Scanner）读取一个整数，并以“结果: [计算结果]”的格式输出它乘以 {factor} 的结果。\\n输入示例：5\\n期待输出：結果: {5 * factor}",
            "stdinExample": "5",
            "expectedOutput": f"結果: {5 * factor}",
            "solutionCode": f"import java.util.Scanner;\n\npublic class Main {{\n    public static void main(String[] args) {{\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(\"結果: \" + (n * {factor}));\n    }}\n}}",
            "templateCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // ここにコードを書いてください\n    }\n}",
            "hint": "sc.nextInt() で入力を取得し、乗算して出力します。"
        })
        q_id += 1

    # 3. Simple IF/ELSE checks (35 questions)
    for i in range(1, 36):
        threshold = 50 + i
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "titleJa": f"合否判定の出力 Vol.{i}",
            "taskJa": f"標準入力から点数（整数）を受け取り、それが {threshold} 点以上であれば「合格です」を、そうでなければ「不合格です」と出力しなさい。\\n入力例：{threshold + 5}\\n期待出力：合格です",
            "taskZh": f"从标准输入读取一个成绩分数（整数），如果大于等于 {threshold} 分，输出“合格です”，否则输出“不合格です”。\\n输入示例：{threshold + 5}\\n期待输出：合格です",
            "stdinExample": f"{threshold + 5}",
            "expectedOutput": "合格です",
            "solutionCode": f"import java.util.Scanner;\n\npublic class Main {{\n    public static void main(String[] args) {{\n        Scanner sc = new Scanner(System.in);\n        int score = sc.nextInt();\n        if (score >= {threshold}) {{\n            System.out.println(\"合格です\");\n        }} else {{\n            System.out.println(\"不合格です\");\n        }}\n    }}\n}}",
            "templateCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // ここにコードを書いてください\n    }\n}",
            "hint": f"if (score >= {threshold}) で条件分岐を行います。"
        })
        q_id += 1

    # 4. Simple Loops (45 questions)
    for i in range(1, 46):
        limit = 5 + i
        expected_sum = sum(range(1, limit + 1))
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "titleJa": f"1からNまでの合計 Vol.{i}",
            "taskJa": f"標準入力から整数 N を受け取り、1からNまでの合計値を出力しなさい。\\n入力例：{limit}\\n期待出力：{expected_sum}",
            "taskZh": f"从标准输入读取一个整数 N，计算并输出从 1 到 N 的所有整数之和。\\n输入示例：{limit}\\n期待输出：{expected_sum}",
            "stdinExample": f"{limit}",
            "expectedOutput": f"{expected_sum}",
            "solutionCode": f"import java.util.Scanner;\n\npublic class Main {{\n    public static void main(String[] args) {{\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int sum = 0;\n        for (int i = 1; i <= n; i++) {{\n            sum += i;\n        }}\n        System.out.println(sum);\n    }}\n}}",
            "templateCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // ここにコードを書いてください\n    }\n}",
            "hint": "forループを使用して、変数 sum に 1 から N までの値を加算します。"
        })
        q_id += 1


    # ------------------ 2 Stars Questions (★★☆) ------------------
    # 1. Array Manipulations (40 questions)
    for i in range(1, 41):
        num_elements = 3 + (i % 5)
        # Find min/max/sum options
        op_type = "最大値" if i % 2 == 0 else "合計"
        stdin_val = " ".join(str(x * 3) for x in range(1, num_elements + 1))
        expected_ans = (num_elements * 3) if op_type == "最大値" else sum(x * 3 for x in range(1, num_elements + 1))
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "titleJa": f"配列要素の{op_type}探索 Vol.{i}",
            "taskJa": f"標準入力から配列の要素数 N と、それに続く N 個の整数を受け取り、それらの{op_type}を出力しなさい。\\n入力例：{num_elements} {stdin_val}\\n期待出力：{expected_ans}",
            "taskZh": f"从标准输入读取数组长度 N 及 N 个整数，计算并输出它们的{op_type}。\\n输入示例：{num_elements} {stdin_val}\\n期待输出：{expected_ans}",
            "stdinExample": f"{num_elements} {stdin_val}",
            "expectedOutput": f"{expected_ans}",
            "solutionCode": f"import java.util.Scanner;\n\npublic class Main {{\n    public static void main(String[] args) {{\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) {{\n            arr[i] = sc.nextInt();\n        }}\n        if (\"{op_type}\".equals(\"最大値\")) {{\n            int max = Integer.MIN_VALUE;\n            for (int val : arr) {{\n                if (val > max) max = val;\n            }}\n            System.out.println(max);\n        }} else {{\n            int sum = 0;\n            for (int val : arr) {{\n                sum += val;\n            }}\n            System.out.println(sum);\n        }}\n    }}\n}}",
            "templateCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // ここにコードを書いてください\n    }\n}",
            "hint": "配列を定義し、for ループで値を読み込んでから、探索を行います。"
        })
        q_id += 1

    # 2. String methods (40 questions)
    for i in range(1, 41):
        target_char = "a" if i % 2 == 0 else "e"
        stdin_str = f"applejuice{i}" if i % 2 == 0 else f"elephant{i}"
        expected_count = stdin_str.count(target_char)
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "titleJa": f"文字列内の文字カウント Vol.{i}",
            "taskJa": f"標準入力から文字列を受け取り、その中の文字「{target_char}」が何文字含まれるかをカウントして出力しなさい。\\n入力例：{stdin_str}\\n期待出力：{expected_count}",
            "taskZh": f"从标准输入读取一个字符串，统计并输出其中包含的字符「{target_char}」的个数。\\n输入示例：{stdin_str}\\n期待输出：{expected_count}",
            "stdinExample": f"{stdin_str}",
            "expectedOutput": f"{expected_count}",
            "solutionCode": f"import java.util.Scanner;\n\npublic class Main {{\n    public static void main(String[] args) {{\n        Scanner sc = new Scanner(System.in);\n        String text = sc.next();\n        int count = 0;\n        for (int i = 0; i < text.length(); i++) {{\n            if (text.charAt(i) == '{target_char}') {{\n                count++;\n            }}\n        }}\n        System.out.println(count);\n    }}\n}}",
            "templateCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // ここにコードを書いてください\n    }\n}",
            "hint": "String.length() と String.charAt(index) を使って1文字ずつ確認します。"
        })
        q_id += 1

    # 3. Simple Classes & Objects (40 questions)
    for i in range(1, 41):
        val_x = 5 + i
        val_y = 10 + i
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "titleJa": f"長方形クラスの面積計算 Vol.{i}",
            "taskJa": f"Mainクラスのほかに Rectangleクラスを作成しなさい。Rectangleクラスは privateメンバとして width と height (ともにint型) を持ち、コンストラクタで初期化でき、area()メソッドで面積を計算して返すようにしなさい。Main クラスでは、Rectangle({val_x}, {val_y}) インスタンスを生成し、面積を出力しなさい。\\n期待出力：{val_x * val_y}",
            "taskZh": f"在 Main 类之外定义一个 Rectangle 类。Rectangle 类具有私有成员变量 width 和 height (皆为int)，提供构造函数，以及计算并返回面积的 area() 方法。在 Main 类的 main 中实例化 Rectangle({val_x}, {val_y}) 并输出面积。\\n期待输出：{val_x * val_y}",
            "stdinExample": "",
            "expectedOutput": f"{val_x * val_y}",
            "solutionCode": f"class Rectangle {{\n    private int width;\n    private int height;\n    public Rectangle(int w, int h) {{\n        this.width = w;\n        this.height = h;\n    }}\n    public int area() {{\n        return this.width * this.height;\n    }}\n}}\n\npublic class Main {{\n    public static void main(String[] args) {{\n        Rectangle r = new Rectangle({val_x}, {val_y});\n        System.out.println(r.area());\n    }}\n}}",
            "templateCode": "public class Main {\n    public static void main(String[] args) {\n        // ここにコードを書いてください\n    }\n}\n// 必要に応じてここにクラスを追加してください",
            "hint": "同じファイル内に public でないクラス Rectangle を定義できます。"
        })
        q_id += 1


    # ------------------ 3 Stars Questions (★★★) ------------------
    # 1. Try-Catch & Exceptions (25 questions)
    for i in range(1, 26):
        divider = (i % 5)
        stdin_val = f"100 {divider}"
        expected_output = f"{100 // divider}" if divider != 0 else "ゼロ除算エラー"
        questions.append({
            "id": q_id,
            "difficulty": "★★★",
            "type": "implement",
            "titleJa": f"ゼロ除算の例外処理 Vol.{i}",
            "taskJa": f"標準入力から2つの整数 A と B を受け取り、A / B の結果を出力しなさい。ただし、Bが0の場合は ArithmeticException をキャッチして「ゼロ除算エラー」と出力しなさい。\\n入力例：{stdin_val}\\n期待出力：{expected_output}",
            "taskZh": f"从标准输入读取两个整数 A 和 B，计算并输出 A / B 的结果。如果 B 为 0，使用 try-catch 捕获 ArithmeticException 并输出“ゼロ除算エラー”。\\n输入示例：{stdin_val}\\n期待输出：{expected_output}",
            "stdinExample": stdin_val,
            "expectedOutput": expected_output,
            "solutionCode": f"import java.util.Scanner;\n\npublic class Main {{\n    public static void main(String[] args) {{\n        Scanner sc = new Scanner(System.in);\n        try {{\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            System.out.println(a / b);\n        }} catch (ArithmeticException e) {{\n            System.out.println(\"ゼロ除算エラー\");\n        }}\n    }}\n}}",
            "templateCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // ここにコードを書いてください\n    }\n}",
            "hint": "除算処理を try ブロックで囲み、catch (ArithmeticException e) で処理します。"
        })
        q_id += 1

    # 2. Inheritance & Polymorphism (25 questions)
    for i in range(1, 26):
        sound = f"ワン{i}！"
        questions.append({
            "id": q_id,
            "difficulty": "★★★",
            "type": "implement",
            "titleJa": f"クラスの継承とメソッド上書き Vol.{i}",
            "taskJa": f"Animal クラスと、それを継承する Dog クラスを定義しなさい。Animal クラスは speak() メソッドで「鳴き声」と出力し、Dog クラスは speak() メソッドをオーバーライドして「{sound}」と出力させなさい。Main の main メソッド内で Dog インスタンスを Animal 型の変数に格納して speak() を呼び出しなさい。\\n期待出力：{sound}",
            "taskZh": f"定义 Animal 类以及继承它的 Dog 类。Animal 具有 speak() 输出“鳴き声”，Dog 重写 speak() 输出“{sound}”。在 Main 中，实例化 Dog 并将其赋给 Animal 类型的变量，然后调用 speak()。\\n期待输出：{sound}",
            "stdinExample": "",
            "expectedOutput": sound,
            "solutionCode": f"class Animal {{\n    public void speak() {{\n        System.out.println(\"鳴き声\");\n    }}\n}}\n\nclass Dog extends Animal {{\n    @Override\n    public void speak() {{\n        System.out.println(\"{sound}\");\n    }}\n}}\n\npublic class Main {{\n    public static void main(String[] args) {{\n        Animal pet = new Dog();\n        pet.speak();\n    }}\n}}",
            "templateCode": "public class Main {\n    public static void main(String[] args) {\n        // ここにコードを書いてください\n    }\n}\n// 親クラスと子クラスを定義してください",
            "hint": "extends キーワードを使用して Dog クラスを Animal クラスのサブクラスとして定義します。"
        })
        q_id += 1

    # 3. Recursion & Overloading (20 questions)
    for i in range(1, 21):
        num_val = 3 + (i % 4)
        def fact(n):
            return 1 if n <= 1 else n * fact(n-1)
        expected_fact = fact(num_val)
        questions.append({
            "id": q_id,
            "difficulty": "★★★",
            "type": "implement",
            "titleJa": f"再帰による階乗計算 Vol.{i}",
            "taskJa": f"標準入力から整数 N を受け取り、再帰関数(recursive function)を使ってその階乗(N!)を計算して出力しなさい。\\n入力例：{num_val}\\n期待出力：{expected_fact}",
            "taskZh": f"从标准输入读取整数 N，利用递归函数计算并输出 N 的阶乘（N!）。\\n输入示例：{num_val}\\n期待输出：{expected_fact}",
            "stdinExample": str(num_val),
            "expectedOutput": str(expected_fact),
            "solutionCode": f"import java.util.Scanner;\n\npublic class Main {{\n    public static int factorial(int n) {{\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }}\n    public static void main(String[] args) {{\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(factorial(n));\n    }}\n}}",
            "templateCode": "import java.util.Scanner;\n\npublic class Main {\n    // ここに再帰メソッドを定義してください\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // ここにコードを書いてください\n    }\n}",
            "hint": "自己を呼び出す再帰処理では、終了条件（n <= 1 のときに 1 を返す）を設定することが不可欠です。"
        })
        q_id += 1

    print(f"Generated {len(questions)} Java questions.")

    # Write to target js file
    output_js = os.path.join(os.getcwd(), "java_exam_questions.js")
    with open(output_js, "w", encoding="utf-8") as f:
        f.write("// Java Mock Exam Questions Database (300+ questions)\n")
        f.write("// Automatically generated by scratch/generate_java_exams.py\n\n")
        f.write("const JAVA_EXAM_QUESTIONS = ")
        f.write(json.dumps(questions, ensure_ascii=False, indent=2))
        f.write(";\n")
    print(f"Wrote to {output_js}")

if __name__ == '__main__':
    generate_java_questions()
