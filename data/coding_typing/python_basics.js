// Coding Typing Practice - Python Basics (30 items)
window.CODING_TYPING_DATA_PYTHON = [
  {
    "id": "py-print-001",
    "language": "python",
    "level": 1,
    "category": "print",
    "title": {
      "zh-CN": "print 基本输出",
      "ja-JP": "print 基本出力",
      "en-US": "Basic print output"
    },
    "code": "print(\"Hello, world!\")",
    "explanation": {
      "zh-CN": "print 是最常用的输出函数。括号内写入要输出的内容。",
      "ja-JP": "print は最もよく使われる出力関数です。括弧内に出力したい内容を書きます。"
    },
    "focus": [
      "括号",
      "双引号",
      "小写 print"
    ],
    "hint": {
      "zh-CN": "全部使用半角字符。不要忘记括号和引号。",
      "ja-JP": "すべて半角文字を使用してください。括弧と引用符を忘れずに。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "Hello, world!",
    "difficulty": 1,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "py-print-002",
    "language": "python",
    "level": 1,
    "category": "print",
    "title": {
      "zh-CN": "print 输出数字",
      "ja-JP": "print 数字出力",
      "en-US": "Print a number"
    },
    "code": "print(42)",
    "explanation": {
      "zh-CN": "print 可以直接输出数字，数字不需要引号包裹。",
      "ja-JP": "print は数字を直接出力できます。数字は引用符で囲む必要がありません。"
    },
    "focus": [
      "数字不加引号",
      "括号"
    ],
    "hint": {
      "zh-CN": "数字是字面量，不需要引号。",
      "ja-JP": "数字はリテラルなので引用符は不要です。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "42",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "py-print-003",
    "language": "python",
    "level": 1,
    "category": "print",
    "title": {
      "zh-CN": "print 多个参数",
      "ja-JP": "print 複数引数",
      "en-US": "Print multiple arguments"
    },
    "code": "print(\"Sum:\", 3 + 4)",
    "explanation": {
      "zh-CN": "print 可以同时输出多个内容，用逗号分隔。",
      "ja-JP": "print は複数の内容を同時に出力でき、カンマで区切ります。"
    },
    "focus": [
      "逗号分隔",
      "字符串与数字混合"
    ],
    "hint": {
      "zh-CN": "注意字符串用引号，数字不用。",
      "ja-JP": "文字列は引用符で囲み、数字はそのままにします。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "Sum: 7",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "py-print-004",
    "language": "python",
    "level": 1,
    "category": "print",
    "title": {
      "zh-CN": "print 换行与 end",
      "ja-JP": "print 改行と end",
      "en-US": "Print with custom end"
    },
    "code": "print(\"Hello\", end=\" \")",
    "explanation": {
      "zh-CN": "print 默认输出后换行。通过 end 参数可以指定结尾字符。",
      "ja-JP": "print はデフォルトで出力後に改行します。end パラメータで末尾の文字を指定できます。"
    },
    "focus": [
      "命名参数 end",
      "双引号嵌套"
    ],
    "hint": {
      "zh-CN": "注意 end=\" \" 的写法，等号两边不要空格。",
      "ja-JP": "end=\" \" の書き方に注意してください。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "Hello ",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "py-print-005",
    "language": "python",
    "level": 2,
    "category": "print",
    "title": {
      "zh-CN": "print 格式化输出",
      "ja-JP": "print フォーマット出力",
      "en-US": "Formatted print with sep"
    },
    "code": "print(\"apple\", \"banana\", \"cherry\", sep=\", \")",
    "explanation": {
      "zh-CN": "sep 参数可以指定多个输出之间的分隔字符串。",
      "ja-JP": "sep パラメータで複数の出力間の区切り文字列を指定できます。"
    },
    "focus": [
      "sep 参数",
      "逗号分隔的字符串"
    ],
    "hint": {
      "zh-CN": "sep=\", \" 表示用逗号加空格分隔各参数。",
      "ja-JP": "sep=\", \" は各引数をカンマとスペースで区切ります。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "apple, banana, cherry",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "py-variable-001",
    "language": "python",
    "level": 1,
    "category": "variable",
    "title": {
      "zh-CN": "字符串变量赋值",
      "ja-JP": "文字列変数代入",
      "en-US": "String variable assignment"
    },
    "code": "name = \"Alice\"",
    "explanation": {
      "zh-CN": "Python 变量不需要声明类型，直接赋值即可。",
      "ja-JP": "Python の変数は型宣言が不要で、直接代入できます。"
    },
    "focus": [
      "变量名",
      "赋值运算符 =",
      "字符串引号"
    ],
    "hint": {
      "zh-CN": "变量名用小写字母开头，不要用空格。",
      "ja-JP": "変数名は小文字で始めます。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "py-variable-002",
    "language": "python",
    "level": 1,
    "category": "variable",
    "title": {
      "zh-CN": "整数变量赋值",
      "ja-JP": "整数変数代入",
      "en-US": "Integer variable assignment"
    },
    "code": "age = 25",
    "explanation": {
      "zh-CN": "整数赋值时直接写数字，不需要引号。",
      "ja-JP": "整数の代入時は数字を直接書き、引用符は不要です。"
    },
    "focus": [
      "无需引号",
      "整数字面量"
    ],
    "hint": {
      "zh-CN": "数字不要加引号。变量名要见名知意。",
      "ja-JP": "数字には引用符を付けません。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 6,
    "source": "builtin"
  },
  {
    "id": "py-variable-003",
    "language": "python",
    "level": 2,
    "category": "variable",
    "title": {
      "zh-CN": "多重赋值",
      "ja-JP": "多重代入",
      "en-US": "Multiple assignment"
    },
    "code": "x, y, z = 1, 2, 3",
    "explanation": {
      "zh-CN": "Python 支持一行同时给多个变量赋值。",
      "ja-JP": "Python は1行で複数の変数に同時に代入できます。"
    },
    "focus": [
      "逗号分隔",
      "左右数量一致"
    ],
    "hint": {
      "zh-CN": "左边变量数量和右边值数量必须一致。",
      "ja-JP": "左側の変数の数と右側の値の数は一致させる必要があります。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "py-input-001",
    "language": "python",
    "level": 1,
    "category": "input",
    "title": {
      "zh-CN": "input 基本输入",
      "ja-JP": "input 基本入力",
      "en-US": "Basic input prompt"
    },
    "code": "input(\"Enter your name: \")",
    "explanation": {
      "zh-CN": "input 函数用于从控制台获取用户输入。",
      "ja-JP": "input 関数はコンソールからユーザー入力を受け取ります。"
    },
    "focus": [
      "input 函数",
      "提示字符串"
    ],
    "hint": {
      "zh-CN": "提示信息后面加一个空格和冒号更友好。",
      "ja-JP": "プロンプトの後にスペースとコロンを入れると親切です。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "py-input-002",
    "language": "python",
    "level": 2,
    "category": "input",
    "title": {
      "zh-CN": "input 赋值并打印",
      "ja-JP": "input 代入と表示",
      "en-US": "Store and print input"
    },
    "code": "name = input(\"Name: \")\nprint(name)",
    "explanation": {
      "zh-CN": "将 input 的结果赋值给变量，然后使用 print 输出。",
      "ja-JP": "input の結果を変数に代入し、print でその変数を出力します。"
    },
    "focus": [
      "变量赋值",
      "两行代码"
    ],
    "hint": {
      "zh-CN": "第一行获取输入，第二行输出。注意这里不需要缩进。",
      "ja-JP": "1行目で入力を取得し、2行目で出力します。インデントは不要です。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "py-if-001",
    "language": "python",
    "level": 2,
    "category": "if",
    "title": {
      "zh-CN": "if 条件判断",
      "ja-JP": "if 条件分岐",
      "en-US": "If conditional statement"
    },
    "code": "if x > 0:\n    print(\"Positive\")",
    "explanation": {
      "zh-CN": "if 语句用于条件判断。注意冒号和缩进。",
      "ja-JP": "if 文は条件判断に使います。コロンとインデントに注意。"
    },
    "focus": [
      "冒号 :",
      "4空格缩进",
      "比较运算符"
    ],
    "hint": {
      "zh-CN": "if 行末尾必须有冒号。缩进用 4 个空格。",
      "ja-JP": "if 行の末尾にはコロンが必要です。インデントはスペース4つです。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "py-if-002",
    "language": "python",
    "level": 2,
    "category": "if",
    "title": {
      "zh-CN": "if / else",
      "ja-JP": "if / else",
      "en-US": "If / else statement"
    },
    "code": "if x > 0:\n    print(\"Positive\")\nelse:\n    print(\"Not positive\")",
    "explanation": {
      "zh-CN": "if/else 在条件为假时执行 else 分支。",
      "ja-JP": "if/else は条件が偽の場合に else ブロックを実行します。"
    },
    "focus": [
      "if 缩进",
      "else 对齐 if",
      "else 冒号"
    ],
    "hint": {
      "zh-CN": "else 要和 if 对齐，注意 else 后的冒号。",
      "ja-JP": "else は if と同じインデント位置に置き、else の後にもコロンを付けます。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 20,
    "source": "builtin"
  },
  {
    "id": "py-if-003",
    "language": "python",
    "level": 3,
    "category": "if",
    "title": {
      "zh-CN": "if / elif / else",
      "ja-JP": "if / elif / else",
      "en-US": "If / elif / else chain"
    },
    "code": "if score >= 90:\n    grade = \"A\"\nelif score >= 60:\n    grade = \"B\"\nelse:\n    grade = \"C\"",
    "explanation": {
      "zh-CN": "elif 是 else if 的缩写，用于多条件判断。",
      "ja-JP": "elif は else if の短縮形で、複数条件の判断に使います。"
    },
    "focus": [
      "elif 写法",
      "多条件链",
      "各分支缩进"
    ],
    "hint": {
      "zh-CN": "elif 和 if、else 对齐。注意冒号。",
      "ja-JP": "elif は if や else と同じ位置に置きます。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 25,
    "source": "builtin"
  },
  {
    "id": "py-if-004",
    "language": "python",
    "level": 3,
    "category": "if",
    "title": {
      "zh-CN": "嵌套 if",
      "ja-JP": "ネストした if",
      "en-US": "Nested if statements"
    },
    "code": "if x > 0:\n    if x % 2 == 0:\n        print(\"Even\")\n    else:\n        print(\"Odd\")",
    "explanation": {
      "zh-CN": "if 内部可以嵌套另一个 if，形成多层判断。",
      "ja-JP": "if の中にさらに if をネストして、複数層の判断ができます。"
    },
    "focus": [
      "嵌套缩进",
      "模块运算符 %",
      "内外层对齐"
    ],
    "hint": {
      "zh-CN": "内层 if 比外层多缩进 4 个空格。",
      "ja-JP": "内側の if は外側より4スペース多くインデントします。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 25,
    "source": "builtin"
  },
  {
    "id": "py-for-001",
    "language": "python",
    "level": 2,
    "category": "for",
    "title": {
      "zh-CN": "for 循环 range",
      "ja-JP": "for ループ range",
      "en-US": "For loop with range"
    },
    "code": "for i in range(5):\n    print(i)",
    "explanation": {
      "zh-CN": "range(5) 生成从 0 到 4 的数字序列。",
      "ja-JP": "range(5) は 0 から 4 までの数値シーケンスを生成します。"
    },
    "focus": [
      "for 语法",
      "冒号",
      "range 写法"
    ],
    "hint": {
      "zh-CN": "for 行末尾有冒号，循环体内缩进。",
      "ja-JP": "for 行の末尾にコロンがあり、ループ内はインデントします。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "py-for-002",
    "language": "python",
    "level": 2,
    "category": "for",
    "title": {
      "zh-CN": "for 遍历字符串",
      "ja-JP": "for 文字列走査",
      "en-US": "For loop over characters"
    },
    "code": "for char in \"hello\":\n    print(char)",
    "explanation": {
      "zh-CN": "字符串可以被遍历，每次取出一个字符。",
      "ja-JP": "文字列は走査可能で、for ループが1文字ずつアクセスします。"
    },
    "focus": [
      "字符串可迭代",
      "char 变量名",
      "in 关键字"
    ],
    "hint": {
      "zh-CN": "字符串是序列，可以直接用于 for 循环。",
      "ja-JP": "文字列はシーケンスなので、for ループに直接使えます。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "py-for-003",
    "language": "python",
    "level": 2,
    "category": "for",
    "title": {
      "zh-CN": "for 遍历列表",
      "ja-JP": "for リスト走査",
      "en-US": "For loop through a list"
    },
    "code": "for fruit in [\"apple\", \"banana\", \"cherry\"]:\n    print(fruit)",
    "explanation": {
      "zh-CN": "for 循环可以遍历列表中的每个元素。",
      "ja-JP": "for ループでリストの各要素を走査できます。"
    },
    "focus": [
      "列表写法 [ ]",
      "元素用引号",
      "逗号分隔"
    ],
    "hint": {
      "zh-CN": "列表用方括号，字符串元素用引号。",
      "ja-JP": "リストは角括弧、文字列要素は引用符で囲みます。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "py-for-004",
    "language": "python",
    "level": 3,
    "category": "for",
    "title": {
      "zh-CN": "enumerate 遍历",
      "ja-JP": "enumerate 走査",
      "en-US": "Enumerate with index"
    },
    "code": "for i, val in enumerate([\"a\", \"b\", \"c\"]):\n    print(i, val)",
    "explanation": {
      "zh-CN": "enumerate 在遍历时同时返回索引和值。",
      "ja-JP": "enumerate は走査時にインデックスと値を同時に返します。"
    },
    "focus": [
      "enumerate 函数",
      "双变量接收",
      "索引从0开始"
    ],
    "hint": {
      "zh-CN": "enumerate 返回（索引, 元素）对。",
      "ja-JP": "enumerate は（インデックス, 要素）のペアを返します。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 18,
    "source": "builtin"
  },
  {
    "id": "py-while-001",
    "language": "python",
    "level": 2,
    "category": "while",
    "title": {
      "zh-CN": "while 循环",
      "ja-JP": "while ループ",
      "en-US": "While loop"
    },
    "code": "while count < 5:\n    print(count)\n    count += 1",
    "explanation": {
      "zh-CN": "while 循环在条件为真时重复执行。",
      "ja-JP": "while ループは条件が真の間、繰り返し実行されます。"
    },
    "focus": [
      "while 条件",
      "冒号",
      "循环变量更新"
    ],
    "hint": {
      "zh-CN": "别忘了 count += 1，否则会无限循环！",
      "ja-JP": "count += 1 を忘れないでください。無限ループになります。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "py-while-002",
    "language": "python",
    "level": 3,
    "category": "while",
    "title": {
      "zh-CN": "while True / break",
      "ja-JP": "while True / break",
      "en-US": "While loop with break"
    },
    "code": "while True:\n    cmd = input(\"> \")\n    if cmd == \"quit\":\n        break",
    "explanation": {
      "zh-CN": "while True 会无限循环，直到遇到 break 语句。",
      "ja-JP": "while True は無限ループで、break 文に遭遇するまで続きます。"
    },
    "focus": [
      "True 大写",
      "break 关键字",
      "嵌套 if"
    ],
    "hint": {
      "zh-CN": "True 的第一个字母大写。break 跳出循环。",
      "ja-JP": "True の先頭は大文字です。break でループを抜けます。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 20,
    "source": "builtin"
  },
  {
    "id": "py-while-003",
    "language": "python",
    "level": 3,
    "category": "while",
    "title": {
      "zh-CN": "while / else 组合",
      "ja-JP": "while / else 組み合わせ",
      "en-US": "While with else clause"
    },
    "code": "while n > 0:\n    print(n)\n    n -= 1\nelse:\n    print(\"Done\")",
    "explanation": {
      "zh-CN": "while 后面的 else 在循环正常结束（没有 break）时执行。",
      "ja-JP": "while の後の else はループが正常終了（break なし）した場合に実行されます。"
    },
    "focus": [
      "else 对齐 while",
      "-= 运算符",
      "else 仅正常结束时运行"
    ],
    "hint": {
      "zh-CN": "else 和 while 对齐。如果被 break 中断则不执行。",
      "ja-JP": "else は while と同じ位置に置きます。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 20,
    "source": "builtin"
  },
  {
    "id": "py-def-001",
    "language": "python",
    "level": 2,
    "category": "def",
    "title": {
      "zh-CN": "定义函数 无参数",
      "ja-JP": "関数定義 引数なし",
      "en-US": "Define function no parameters"
    },
    "code": "def greet():\n    print(\"Hello!\")",
    "explanation": {
      "zh-CN": "用 def 关键字定义函数，函数体需要缩进。",
      "ja-JP": "def キーワードで関数を定義します。関数本体はインデントします。"
    },
    "focus": [
      "def 关键字",
      "函数名",
      "冒号和缩进"
    ],
    "hint": {
      "zh-CN": "def 后面加空格，函数名用小写字母开头。",
      "ja-JP": "def の後にスペースを入れ、関数名は小文字で始めます。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "py-def-002",
    "language": "python",
    "level": 2,
    "category": "def",
    "title": {
      "zh-CN": "定义函数 带参数和返回值",
      "ja-JP": "関数定義 引数と戻り値",
      "en-US": "Function with parameters and return"
    },
    "code": "def add(a, b):\n    return a + b",
    "explanation": {
      "zh-CN": "函数可以接受参数，用逗号分隔。return 返回计算结果。",
      "ja-JP": "関数は引数を受け取ることができ、カンマで区切ります。return で計算結果を返します。"
    },
    "focus": [
      "参数列表",
      "return 语句",
      "表达式求值"
    ],
    "hint": {
      "zh-CN": "参数之间用逗号分隔。return 后面不加括号。",
      "ja-JP": "引数はカンマで区切ります。return の後に括弧は付けません。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "py-def-003",
    "language": "python",
    "level": 3,
    "category": "def",
    "title": {
      "zh-CN": "定义函数 递归",
      "ja-JP": "関数定義 再帰",
      "en-US": "Recursive function"
    },
    "code": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)",
    "explanation": {
      "zh-CN": "递归函数即调用自身的函数。factorial 是经典例子。",
      "ja-JP": "再帰関数とは自分自身を呼び出す関数です。factorial は古典的な例です。"
    },
    "focus": [
      "递归调用",
      "基线条件",
      "函数名复用"
    ],
    "hint": {
      "zh-CN": "递归必须有一个终止条件（基线条件）。",
      "ja-JP": "再帰には必ず終了条件（ベース条件）が必要です。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 4,
    "estimatedTime": 25,
    "source": "builtin"
  },
  {
    "id": "py-import-001",
    "language": "python",
    "level": 2,
    "category": "import",
    "title": {
      "zh-CN": "import 模块",
      "ja-JP": "import モジュール",
      "en-US": "Import a module"
    },
    "code": "import math\nprint(math.sqrt(16))",
    "explanation": {
      "zh-CN": "import 语句用于导入模块。导入后使用 模块名.函数名 调用。",
      "ja-JP": "import 文はモジュールをインポートします。インポート後は「モジュール名.関数名」で呼び出します。"
    },
    "focus": [
      "import 关键字",
      "模块名",
      "点运算符"
    ],
    "hint": {
      "zh-CN": "先 import，再使用。调用时别忘了模块名前缀。",
      "ja-JP": "最初に import してから使用します。関数呼び出し時には「モジュール名.」を忘れずに。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "4.0",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "py-import-002",
    "language": "python",
    "level": 2,
    "category": "import",
    "title": {
      "zh-CN": "from import 指定函数",
      "ja-JP": "from import 特定関数",
      "en-US": "Import specific function"
    },
    "code": "from math import sqrt\nprint(sqrt(25))",
    "explanation": {
      "zh-CN": "from ... import 可以直接导入模块中的特定函数。",
      "ja-JP": "from ... import でモジュール内の特定の関数を直接インポートできます。"
    },
    "focus": [
      "from 关键字",
      "import 指定名称",
      "直接调用"
    ],
    "hint": {
      "zh-CN": "from 后面是模块名，import 后面是函数名。",
      "ja-JP": "from の後がモジュール名、import の後が関数名です。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "5.0",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "py-list-001",
    "language": "python",
    "level": 2,
    "category": "list",
    "title": {
      "zh-CN": "列表添加元素",
      "ja-JP": "リスト要素追加",
      "en-US": "Append to a list"
    },
    "code": "fruits = [\"apple\", \"banana\"]\nfruits.append(\"cherry\")",
    "explanation": {
      "zh-CN": "append 方法在列表末尾添加一个元素。",
      "ja-JP": "append メソッドはリストの末尾に要素を追加します。"
    },
    "focus": [
      "点运算符调用方法",
      "append 括号参数"
    ],
    "hint": {
      "zh-CN": "调用列表方法用点语法：列表名.方法名(参数)。",
      "ja-JP": "リストのメソッドは「リスト名.メソッド名(引数)」で呼び出します。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "py-dict-001",
    "language": "python",
    "level": 2,
    "category": "dict",
    "title": {
      "zh-CN": "字典键值对",
      "ja-JP": "辞書キーと値",
      "en-US": "Dictionary key-value pair"
    },
    "code": "person = {\"name\": \"Alice\", \"age\": 25}\nprint(person[\"name\"])",
    "explanation": {
      "zh-CN": "字典用花括号定义，键值对之间用冒号分隔。",
      "ja-JP": "辞書は波括弧で定義し、キーと値のペアをコロンで区切ります。"
    },
    "focus": [
      "花括号创建",
      "键:值 写法",
      "方括号访问"
    ],
    "hint": {
      "zh-CN": "键后面跟冒号，键值对之间用逗号。",
      "ja-JP": "キーの後にコロン、ペア間はカンマで区切ります。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "Alice",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "py-fstring-001",
    "language": "python",
    "level": 3,
    "category": "f-string",
    "title": {
      "zh-CN": "f-string 格式化",
      "ja-JP": "f-string フォーマット",
      "en-US": "F-string formatting"
    },
    "code": "name = \"Alice\"\nprint(f\"Hello, {name}!\")",
    "explanation": {
      "zh-CN": "f-string 在字符串前加 f，用花括号插入变量。",
      "ja-JP": "f-string は文字列の前に f を付け、波括弧で変数を挿入します。"
    },
    "focus": [
      "f 前缀",
      "花括号插值",
      "字符串引号"
    ],
    "hint": {
      "zh-CN": "注意 f 要在引号前面，变量名放在花括号内。",
      "ja-JP": "f は引用符の前につけます。変数名を波括弧内に入れます。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "Hello, Alice!",
    "difficulty": 3,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "py-comment-001",
    "language": "python",
    "level": 1,
    "category": "comment",
    "title": {
      "zh-CN": "Python 注释",
      "ja-JP": "Python コメント",
      "en-US": "Python comments"
    },
    "code": "# This is a comment\nprint(\"Hello\")  # Inline comment",
    "explanation": {
      "zh-CN": "# 号后面的内容是注释，解释器会忽略。",
      "ja-JP": "# の後ろの内容はコメントで、インタプリタは無視します。"
    },
    "focus": [
      "# 号注释",
      "行首注释",
      "行尾注释"
    ],
    "hint": {
      "zh-CN": "注释以 # 开头，可以单独一行或放在代码后面。",
      "ja-JP": "コメントは # で始まり、単独行にもコードの後にも置けます。"
    },
    "sandboxRunnable": true,
    "expectedOutput": "Hello",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  }
];
