// Coding Typing Practice - undefined
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
      "ja-JP": "print は最もよく使われる出力関数です。括弧内に出力したい内容を書きます。",
      "en-US": "print is the most commonly used output function. Write the content you want to display inside the parentheses."
    },
    "focus": [
      "括号",
      "双引号",
      "小写 print"
    ],
    "hint": {
      "zh-CN": "全部使用半角字符。不要忘记括号和引号。",
      "ja-JP": "すべて半角文字を使用してください。括弧と引用符を忘れずに。",
      "en-US": "Use only half-width characters. Do not forget the parentheses and quotation marks."
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
      "ja-JP": "print は数字を直接出力できます。数字は引用符で囲む必要がありません。",
      "en-US": "print can output numbers directly. Numbers do not need quotation marks."
    },
    "focus": [
      "数字不加引号",
      "括号"
    ],
    "hint": {
      "zh-CN": "数字是字面量，不需要引号。",
      "ja-JP": "数字はリテラルなので引用符は不要です。",
      "en-US": "Numbers are literals—no quotation marks needed."
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
      "ja-JP": "print は複数の内容を同時に出力でき、カンマで区切ります。",
      "en-US": "print can output multiple items at once, separated by commas."
    },
    "focus": [
      "逗号分隔",
      "字符串与数字混合"
    ],
    "hint": {
      "zh-CN": "注意字符串用引号，数字不用。",
      "ja-JP": "文字列は引用符で囲み、数字はそのままにします。",
      "en-US": "Separate each item with a comma inside the parentheses."
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
      "ja-JP": "print はデフォルトで出力後に改行します。end パラメータで末尾の文字を指定できます。",
      "en-US": "By default, print adds a newline at the end. The end parameter lets you change the trailing character."
    },
    "focus": [
      "命名参数 end",
      "双引号嵌套"
    ],
    "hint": {
      "zh-CN": "注意 end=\" \" 的写法，等号两边不要空格。",
      "ja-JP": "end=\" \" の書き方に注意してください。",
      "en-US": "Set end=\" \" to print a space instead of a newline."
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
      "ja-JP": "sep パラメータで複数の出力間の区切り文字列を指定できます。",
      "en-US": "The sep parameter specifies the separator string between multiple outputs."
    },
    "focus": [
      "sep 参数",
      "逗号分隔的字符串"
    ],
    "hint": {
      "zh-CN": "sep=\", \" 表示用逗号加空格分隔各参数。",
      "ja-JP": "sep=\", \" は各引数をカンマとスペースで区切ります。",
      "en-US": "Use sep=\", \" to insert a comma and space between items."
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
      "ja-JP": "Python の変数は型宣言が不要で、直接代入できます。",
      "en-US": "Python variables do not need a type declaration—just assign a value directly."
    },
    "focus": [
      "变量名",
      "赋值运算符 =",
      "字符串引号"
    ],
    "hint": {
      "zh-CN": "变量名用小写字母开头，不要用空格。",
      "ja-JP": "変数名は小文字で始めます。",
      "en-US": "Use a single equals sign = to assign a value."
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
      "ja-JP": "整数の代入時は数字を直接書き、引用符は不要です。",
      "en-US": "Assign integers by writing the number directly. No quotation marks needed."
    },
    "focus": [
      "无需引号",
      "整数字面量"
    ],
    "hint": {
      "zh-CN": "数字不要加引号。变量名要见名知意。",
      "ja-JP": "数字には引用符を付けません。",
      "en-US": "Integer values are written as plain numbers."
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
      "ja-JP": "Python は1行で複数の変数に同時に代入できます。",
      "en-US": "Python supports assigning multiple variables on one line."
    },
    "focus": [
      "逗号分隔",
      "左右数量一致"
    ],
    "hint": {
      "zh-CN": "左边变量数量和右边值数量必须一致。",
      "ja-JP": "左側の変数の数と右側の値の数は一致させる必要があります。",
      "en-US": "Separate variables and values with commas: x, y = 1, 2."
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
      "ja-JP": "input 関数はコンソールからユーザー入力を受け取ります。",
      "en-US": "The input function reads user input from the console."
    },
    "focus": [
      "input 函数",
      "提示字符串"
    ],
    "hint": {
      "zh-CN": "提示信息后面加一个空格和冒号更友好。",
      "ja-JP": "プロンプトの後にスペースとコロンを入れると親切です。",
      "en-US": "Write a prompt string inside the parentheses: input(\"prompt: \")."
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
      "ja-JP": "input の結果を変数に代入し、print でその変数を出力します。",
      "en-US": "Assign the result of input to a variable, then use print to display it."
    },
    "focus": [
      "变量赋值",
      "两行代码"
    ],
    "hint": {
      "zh-CN": "第一行获取输入，第二行输出。注意这里不需要缩进。",
      "ja-JP": "1行目で入力を取得し、2行目で出力します。インデントは不要です。",
      "en-US": "Store input() in a variable and print it later."
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
      "ja-JP": "if 文は条件判断に使います。コロンとインデントに注意。",
      "en-US": "The if statement is used for conditional execution. Note the colon and indentation."
    },
    "focus": [
      "冒号 :",
      "4空格缩进",
      "比较运算符"
    ],
    "hint": {
      "zh-CN": "if 行末尾必须有冒号。缩进用 4 个空格。",
      "ja-JP": "if 行の末尾にはコロンが必要です。インデントはスペース4つです。",
      "en-US": "Always end the condition line with a colon :"
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
      "ja-JP": "if/else は条件が偽の場合に else ブロックを実行します。",
      "en-US": "The else clause runs when the if condition is false."
    },
    "focus": [
      "if 缩进",
      "else 对齐 if",
      "else 冒号"
    ],
    "hint": {
      "zh-CN": "else 要和 if 对齐，注意 else 后的冒号。",
      "ja-JP": "else は if と同じインデント位置に置き、else の後にもコロンを付けます。",
      "en-US": "Align else with if, and follow it with a colon."
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
      "ja-JP": "elif は else if の短縮形で、複数条件の判断に使います。",
      "en-US": "elif is short for else if—it lets you check multiple conditions."
    },
    "focus": [
      "elif 写法",
      "多条件链",
      "各分支缩进"
    ],
    "hint": {
      "zh-CN": "elif 和 if、else 对齐。注意冒号。",
      "ja-JP": "elif は if や else と同じ位置に置きます。",
      "en-US": "Use elif for each additional condition before else."
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
      "ja-JP": "if の中にさらに if をネストして、複数層の判断ができます。",
      "en-US": "An if statement can be nested inside another if to create multi-level decisions."
    },
    "focus": [
      "嵌套缩进",
      "模块运算符 %",
      "内外层对齐"
    ],
    "hint": {
      "zh-CN": "内层 if 比外层多缩进 4 个空格。",
      "ja-JP": "内側の if は外側より4スペース多くインデントします。",
      "en-US": "Increase indentation by 4 spaces for each nesting level."
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
      "ja-JP": "range(5) は 0 から 4 までの数値シーケンスを生成します。",
      "en-US": "range(5) generates the sequence 0, 1, 2, 3, 4. The for loop iterates over each number."
    },
    "focus": [
      "for 语法",
      "冒号",
      "range 写法"
    ],
    "hint": {
      "zh-CN": "for 行末尾有冒号，循环体内缩进。",
      "ja-JP": "for 行の末尾にコロンがあり、ループ内はインデントします。",
      "en-US": "range(n) gives numbers from 0 up to n-1."
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
      "ja-JP": "文字列は走査可能で、for ループが1文字ずつアクセスします。",
      "en-US": "Strings can be iterated character by character in a for loop."
    },
    "focus": [
      "字符串可迭代",
      "char 变量名",
      "in 关键字"
    ],
    "hint": {
      "zh-CN": "字符串是序列，可以直接用于 for 循环。",
      "ja-JP": "文字列はシーケンスなので、for ループに直接使えます。",
      "en-US": "Each iteration gives one character from the string."
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
      "ja-JP": "for ループでリストの各要素を走査できます。",
      "en-US": "A for loop can iterate over each element of a list."
    },
    "focus": [
      "列表写法 [ ]",
      "元素用引号",
      "逗号分隔"
    ],
    "hint": {
      "zh-CN": "列表用方括号，字符串元素用引号。",
      "ja-JP": "リストは角括弧、文字列要素は引用符で囲みます。",
      "en-US": "The loop variable takes the value of each list item in turn."
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
      "ja-JP": "enumerate は走査時にインデックスと値を同時に返します。",
      "en-US": "enumerate returns both the index and the value during iteration."
    },
    "focus": [
      "enumerate 函数",
      "双变量接收",
      "索引从0开始"
    ],
    "hint": {
      "zh-CN": "enumerate 返回（索引, 元素）对。",
      "ja-JP": "enumerate は（インデックス, 要素）のペアを返します。",
      "en-US": "Use two variables to receive index and value: for i, v in enumerate(...)."
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
      "ja-JP": "while ループは条件が真の間、繰り返し実行されます。",
      "en-US": "A while loop repeats as long as its condition is true."
    },
    "focus": [
      "while 条件",
      "冒号",
      "循环变量更新"
    ],
    "hint": {
      "zh-CN": "别忘了 count += 1，否则会无限循环！",
      "ja-JP": "count += 1 を忘れないでください。無限ループになります。",
      "en-US": "Make sure the condition eventually becomes false to avoid an infinite loop."
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
      "ja-JP": "while True は無限ループで、break 文に遭遇するまで続きます。",
      "en-US": "while True creates an infinite loop. Use break to exit it."
    },
    "focus": [
      "True 大写",
      "break 关键字",
      "嵌套 if"
    ],
    "hint": {
      "zh-CN": "True 的第一个字母大写。break 跳出循环。",
      "ja-JP": "True の先頭は大文字です。break でループを抜けます。",
      "en-US": "Always provide a break condition inside an infinite loop."
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
      "ja-JP": "while の後の else はループが正常終了（break なし）した場合に実行されます。",
      "en-US": "An else clause after while runs when the loop ends normally (without break)."
    },
    "focus": [
      "else 对齐 while",
      "-= 运算符",
      "else 仅正常结束时运行"
    ],
    "hint": {
      "zh-CN": "else 和 while 对齐。如果被 break 中断则不执行。",
      "ja-JP": "else は while と同じ位置に置きます。",
      "en-US": "The else branch is skipped if the loop is exited via break."
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
      "ja-JP": "def キーワードで関数を定義します。関数本体はインデントします。",
      "en-US": "Use the def keyword to define a function. The function body must be indented."
    },
    "focus": [
      "def 关键字",
      "函数名",
      "冒号和缩进"
    ],
    "hint": {
      "zh-CN": "def 后面加空格，函数名用小写字母开头。",
      "ja-JP": "def の後にスペースを入れ、関数名は小文字で始めます。",
      "en-US": "End the function signature line with a colon."
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
      "ja-JP": "関数は引数を受け取ることができ、カンマで区切ります。return で計算結果を返します。",
      "en-US": "Functions can accept parameters separated by commas. return sends a result back."
    },
    "focus": [
      "参数列表",
      "return 语句",
      "表达式求值"
    ],
    "hint": {
      "zh-CN": "参数之间用逗号分隔。return 后面不加括号。",
      "ja-JP": "引数はカンマで区切ります。return の後に括弧は付けません。",
      "en-US": "Use return to pass a value back to the caller."
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
      "ja-JP": "再帰関数とは自分自身を呼び出す関数です。factorial は古典的な例です。",
      "en-US": "A recursive function calls itself. factorial is a classic example."
    },
    "focus": [
      "递归调用",
      "基线条件",
      "函数名复用"
    ],
    "hint": {
      "zh-CN": "递归必须有一个终止条件（基线条件）。",
      "ja-JP": "再帰には必ず終了条件（ベース条件）が必要です。",
      "en-US": "Always include a base case to stop the recursion."
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
      "ja-JP": "import 文はモジュールをインポートします。インポート後は「モジュール名.関数名」で呼び出します。",
      "en-US": "The import statement loads a module. Use module_name.function_name to call its functions."
    },
    "focus": [
      "import 关键字",
      "模块名",
      "点运算符"
    ],
    "hint": {
      "zh-CN": "先 import，再使用。调用时别忘了模块名前缀。",
      "ja-JP": "最初に import してから使用します。関数呼び出し時には「モジュール名.」を忘れずに。",
      "en-US": "Import modules at the top of your script."
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
      "ja-JP": "from ... import でモジュール内の特定の関数を直接インポートできます。",
      "en-US": "from ... import lets you import a specific function directly."
    },
    "focus": [
      "from 关键字",
      "import 指定名称",
      "直接调用"
    ],
    "hint": {
      "zh-CN": "from 后面是模块名，import 后面是函数名。",
      "ja-JP": "from の後がモジュール名、import の後が関数名です。",
      "en-US": "After this import, you can call sqrt() without the math prefix."
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
      "ja-JP": "append メソッドはリストの末尾に要素を追加します。",
      "en-US": "The append method adds an element to the end of a list."
    },
    "focus": [
      "点运算符调用方法",
      "append 括号参数"
    ],
    "hint": {
      "zh-CN": "调用列表方法用点语法：列表名.方法名(参数)。",
      "ja-JP": "リストのメソッドは「リスト名.メソッド名(引数)」で呼び出します。",
      "en-US": "append modifies the list in place—it does not return a new list."
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
      "ja-JP": "辞書は波括弧で定義し、キーと値のペアをコロンで区切ります。",
      "en-US": "Dictionaries are defined with curly braces. Key-value pairs are separated by colons."
    },
    "focus": [
      "花括号创建",
      "键:值 写法",
      "方括号访问"
    ],
    "hint": {
      "zh-CN": "键后面跟冒号，键值对之间用逗号。",
      "ja-JP": "キーの後にコロン、ペア間はカンマで区切ります。",
      "en-US": "Access a value by its key inside square brackets: dict[\"key\"]."
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
      "ja-JP": "f-string は文字列の前に f を付け、波括弧で変数を挿入します。",
      "en-US": "f-strings let you embed variables inside a string. Prefix the string with f and use curly braces for variables."
    },
    "focus": [
      "f 前缀",
      "花括号插值",
      "字符串引号"
    ],
    "hint": {
      "zh-CN": "注意 f 要在引号前面，变量名放在花括号内。",
      "ja-JP": "f は引用符の前につけます。変数名を波括弧内に入れます。",
      "en-US": "Write f before the opening quote, then {variable_name} inside."
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
      "ja-JP": "# の後ろの内容はコメントで、インタプリタは無視します。",
      "en-US": "Text after # is a comment—the interpreter ignores it."
    },
    "focus": [
      "# 号注释",
      "行首注释",
      "行尾注释"
    ],
    "hint": {
      "zh-CN": "注释以 # 开头，可以单独一行或放在代码后面。",
      "ja-JP": "コメントは # で始まり、単独行にもコードの後にも置けます。",
      "en-US": "Use comments to explain what your code does."
    },
    "sandboxRunnable": true,
    "expectedOutput": "Hello",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "py-listcomp-001",
    "language": "python",
    "category": "list_comprehension",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 60,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "列表推导式基础",
      "ja-JP": "リスト内包表記基礎",
      "en-US": "Basic list comprehension"
    },
    "explanation": {
      "zh-CN": "用列表推导式生成平方数",
      "ja-JP": "リスト内包表記で平方数生成",
      "en-US": "Generate squares with list comprehension"
    },
    "hint": {
      "zh-CN": "[x**2 for x in range(5)]",
      "ja-JP": "[x**2 for x in range(5)]",
      "en-US": "[x**2 for x in range(5)]"
    },
    "focus": [
      "list",
      "comprehension",
      "for"
    ],
    "code": "squares = [x**2 for x in range(5)]\nprint(squares)"
  },
  {
    "id": "py-listcomp-002",
    "language": "python",
    "category": "list_comprehension",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 60,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "条件列表推导式",
      "ja-JP": "条件付き内包表記",
      "en-US": "Conditional comprehension"
    },
    "explanation": {
      "zh-CN": "带if条件的列表推导式",
      "ja-JP": "if条件付きリスト内包表記",
      "en-US": "List comprehension with if filter"
    },
    "hint": {
      "zh-CN": "[x for x in nums if x>0]",
      "ja-JP": "[x for x in nums if x>0]",
      "en-US": "[x for x in nums if x>0]"
    },
    "focus": [
      "list",
      "comprehension",
      "if"
    ],
    "code": "nums = [-1,2,-3,4,0,5]\npos = [x for x in nums if x>0]\nprint(pos)"
  },
  {
    "id": "py-listcomp-003",
    "language": "python",
    "category": "list_comprehension",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 90,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "双层列表推导式",
      "ja-JP": "二重内包表記",
      "en-US": "Nested comprehension"
    },
    "explanation": {
      "zh-CN": "双层for的列表推导式生成坐标",
      "ja-JP": "二重forで座標生成",
      "en-US": "Nested for to generate coordinates"
    },
    "hint": {
      "zh-CN": "[(x,y) for x in range(3) for y in range(2)]",
      "ja-JP": "[(x,y) for x in range(3) for y in range(2)]",
      "en-US": "[(x,y) for x in range(3) for y in range(2)]"
    },
    "focus": [
      "list",
      "comprehension",
      "nested"
    ],
    "code": "coords = [(x,y) for x in range(3) for y in range(2)]\nprint(coords)"
  },
  {
    "id": "py-lambda-001",
    "language": "python",
    "category": "lambda",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 60,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "lambda 函数",
      "ja-JP": "lambda 関数",
      "en-US": "Lambda function"
    },
    "explanation": {
      "zh-CN": "lambda定义匿名函数",
      "ja-JP": "lambdaで無名関数定義",
      "en-US": "Define anonymous function with lambda"
    },
    "hint": {
      "zh-CN": "lambda x: x*2",
      "ja-JP": "lambda x: x*2",
      "en-US": "lambda x: x*2"
    },
    "focus": [
      "lambda",
      "function"
    ],
    "code": "double = lambda x: x*2\nprint(double(5))\nprint(double(7))"
  },
  {
    "id": "py-lambda-002",
    "language": "python",
    "category": "lambda",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 90,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "lambda 与 map",
      "ja-JP": "lambda と map",
      "en-US": "Lambda with map"
    },
    "explanation": {
      "zh-CN": "将lambda传给map处理序列",
      "ja-JP": "lambdaをmapに渡す",
      "en-US": "Pass lambda to map"
    },
    "hint": {
      "zh-CN": "map(lambda x: x.upper(), words)",
      "ja-JP": "map(lambda x: x.upper(), words)",
      "en-US": "map(lambda x: x.upper(), words)"
    },
    "focus": [
      "lambda",
      "map",
      "list"
    ],
    "code": "words = [\"hello\",\"world\",\"python\"]\nup = list(map(lambda w: w.upper(), words))\nprint(up)"
  },
  {
    "id": "py-sorted-001",
    "language": "python",
    "category": "sorted",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 90,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "sorted 自定义排序",
      "ja-JP": "sorted カスタムソート",
      "en-US": "Custom sort sorted"
    },
    "explanation": {
      "zh-CN": "sorted + key函数自定义排序",
      "ja-JP": "sorted+key関数でカスタムソート",
      "en-US": "Custom sort with sorted and key"
    },
    "hint": {
      "zh-CN": "sorted(items, key=lambda x: x[1])",
      "ja-JP": "sorted(items, key=lambda x: x[1])",
      "en-US": "sorted(items, key=lambda x: x[1])"
    },
    "focus": [
      "sorted",
      "key",
      "lambda"
    ],
    "code": "students = [(\"Alice\",85),(\"Bob\",72),(\"Aoi\",91)]\nsorted_by = sorted(students, key=lambda s: s[1], reverse=True)\nprint(sorted_by)"
  },
  {
    "id": "py-try-001",
    "language": "python",
    "category": "try_except",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 90,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "try-except 异常",
      "ja-JP": "try-except 例外",
      "en-US": "Try-except exception"
    },
    "explanation": {
      "zh-CN": "try-except捕获异常",
      "ja-JP": "try-exceptで例外キャッチ",
      "en-US": "Catch exceptions with try-except"
    },
    "hint": {
      "zh-CN": "try:... except ValueError:...",
      "ja-JP": "try:... except ValueError:...",
      "en-US": "try:... except ValueError:..."
    },
    "focus": [
      "try",
      "except",
      "exception"
    ],
    "code": "try:\n    num = int(input(\"Enter: \"))\n    print(10/num)\nexcept ValueError:\n    print(\"Invalid!\")\nexcept ZeroDivisionError:\n    print(\"No zero!\")"
  },
  {
    "id": "py-try-002",
    "language": "python",
    "category": "try_except",
    "level": 4,
    "difficulty": 4,
    "estimatedTime": 120,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "try-except-else-finally",
      "ja-JP": "try-except-else-finally",
      "en-US": "Try-except-else-finally"
    },
    "explanation": {
      "zh-CN": "完整异常处理含else和finally",
      "ja-JP": "elseとfinallyを含む完全な例外処理",
      "en-US": "Complete exception handling with else and finally"
    },
    "hint": {
      "zh-CN": "try:... except:... else:... finally:...",
      "ja-JP": "try:... except:... else:... finally:...",
      "en-US": "try:... except:... else:... finally:..."
    },
    "focus": [
      "try",
      "except",
      "else",
      "finally"
    ],
    "code": "try:\n    f=open(\"data.txt\",\"r\")\n    content=f.read()\nexcept FileNotFoundError:\n    print(\"Not found\")\nelse:\n    print(\"OK\")\nfinally:\n    print(\"Done\")"
  },
  {
    "id": "py-try-003",
    "language": "python",
    "category": "try_except",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 90,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "异常类型捕获",
      "ja-JP": "例外タイプ別処理",
      "en-US": "Exception type handling"
    },
    "explanation": {
      "zh-CN": "捕获特定异常类型",
      "ja-JP": "特定の例外タイプをキャッチ",
      "en-US": "Catch specific exception types"
    },
    "hint": {
      "zh-CN": "except (TypeError,ValueError) as e:",
      "ja-JP": "except (TypeError,ValueError) as e:",
      "en-US": "except (TypeError,ValueError) as e:"
    },
    "focus": [
      "except",
      "as",
      "exception"
    ],
    "code": "vals = [\"10\",\"abc\",\"20\"]\nfor v in vals:\n    try:\n        print(int(v)**2)\n    except ValueError as e:\n        print(f\"Error: {e}\")"
  },
  {
    "id": "py-class-001",
    "language": "python",
    "category": "class",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 120,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "定义类",
      "ja-JP": "クラス定義",
      "en-US": "Define a class"
    },
    "explanation": {
      "zh-CN": "class定义类和方法",
      "ja-JP": "classでクラスとメソッド定義",
      "en-US": "Define a class with methods"
    },
    "hint": {
      "zh-CN": "class Dog:\n    def __init__(self,name):",
      "ja-JP": "class Dog:\n    def __init__(self,name):",
      "en-US": "class Dog:\n    def __init__(self,name):"
    },
    "focus": [
      "class",
      "def",
      "__init__",
      "self"
    ],
    "code": "class Dog:\n    def __init__(self,name):\n        self.name=name\n    def bark(self):\n        return f\"{self.name} says woof!\"\nd=Dog(\"Rex\")\nprint(d.bark())"
  },
  {
    "id": "py-class-002",
    "language": "python",
    "category": "class",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 120,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "类方法",
      "ja-JP": "クラスメソッド",
      "en-US": "Class methods"
    },
    "explanation": {
      "zh-CN": "具有多个方法的类",
      "ja-JP": "複数メソッドを持つクラス",
      "en-US": "Class with multiple methods"
    },
    "hint": {
      "zh-CN": "def __str__(self): return ...",
      "ja-JP": "def __str__(self): return ...",
      "en-US": "def __str__(self): return ..."
    },
    "focus": [
      "class",
      "def",
      "__str__",
      "return"
    ],
    "code": "class Rect:\n    def __init__(self,w,h):\n        self.w=w;self.h=h\n    def area(self):\n        return self.w*self.h\n    def __str__(self):\n        return f\"{self.w}x{self.h} rect\"\nr=Rect(3,4)\nprint(r)\nprint(r.area())"
  },
  {
    "id": "py-class-003",
    "language": "python",
    "category": "class",
    "level": 4,
    "difficulty": 4,
    "estimatedTime": 150,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "类继承",
      "ja-JP": "クラス継承",
      "en-US": "Class inheritance"
    },
    "explanation": {
      "zh-CN": "继承创建子类",
      "ja-JP": "継承で子クラス作成",
      "en-US": "Create subclass with inheritance"
    },
    "hint": {
      "zh-CN": "class Student(Person):\n    super().__init__(name)",
      "ja-JP": "class Student(Person):\n    super().__init__(name)",
      "en-US": "class Student(Person):\n    super().__init__(name)"
    },
    "focus": [
      "class",
      "inheritance",
      "super",
      "__init__"
    ],
    "code": "class Person:\n    def __init__(self,name):\n        self.name=name\nclass Student(Person):\n    def __init__(self,name,grade):\n        super().__init__(name)\n        self.grade=grade\n    def info(self):\n        return f\"{self.name}: {self.grade}\"\ns=Student(\"Alice\",\"A\")\nprint(s.info())"
  },
  {
    "id": "py-tuple-001",
    "language": "python",
    "category": "tuple",
    "level": 1,
    "difficulty": 1,
    "estimatedTime": 30,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "元组",
      "ja-JP": "タプル",
      "en-US": "Tuple"
    },
    "explanation": {
      "zh-CN": "创建和访问元组",
      "ja-JP": "タプルの作成とアクセス",
      "en-US": "Create and access tuples"
    },
    "hint": {
      "zh-CN": "t=(1,2,3); print(t[0])",
      "ja-JP": "t=(1,2,3); print(t[0])",
      "en-US": "t=(1,2,3); print(t[0])"
    },
    "focus": [
      "tuple",
      "()",
      "index"
    ],
    "code": "pt=(3,4)\nprint(pt[0])\nprint(pt[1])"
  },
  {
    "id": "py-tuple-002",
    "language": "python",
    "category": "tuple",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 60,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "元组解包",
      "ja-JP": "タプルアンパック",
      "en-US": "Tuple unpacking"
    },
    "explanation": {
      "zh-CN": "元组值解包到多个变量",
      "ja-JP": "タプルを複数変数にアンパック",
      "en-US": "Unpack tuple into multiple variables"
    },
    "hint": {
      "zh-CN": "x,y=(10,20)",
      "ja-JP": "x,y=(10,20)",
      "en-US": "x,y=(10,20)"
    },
    "focus": [
      "tuple",
      "unpack",
      "="
    ],
    "code": "name,age,score=(\"Alice\",20,85)\nprint(f\"{name} is {age} years old\")\nprint(f\"Score: {score}\")"
  },
  {
    "id": "py-set-001",
    "language": "python",
    "category": "set",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 60,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "集合",
      "ja-JP": "セット",
      "en-US": "Set"
    },
    "explanation": {
      "zh-CN": "创建集合和基本操作",
      "ja-JP": "セット作成と基本操作",
      "en-US": "Create set and basic operations"
    },
    "hint": {
      "zh-CN": "s={1,2,3}; print(1 in s)",
      "ja-JP": "s={1,2,3}; print(1 in s)",
      "en-US": "s={1,2,3}; print(1 in s)"
    },
    "focus": [
      "set",
      "{}",
      "in"
    ],
    "code": "fruits={\"apple\",\"banana\",\"cherry\"}\nfruits.add(\"date\")\nprint(sorted(fruits))"
  }
];
