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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "IT Passport"
    ],
    "glossaryRefs": [
     "print_function"
    ],
    "meaning": {
     "zh-CN": "print是Python中最基本的输出函数，用于将内容显示到控制台。",
     "ja-JP": "printはPythonで最も基本的な出力関数で、コンソールに内容を表示します。",
     "en-US": "print is the most basic output function in Python, used to display content to the console."
    },
    "memoryHook": {
     "zh-CN": "打印到屏幕 → print",
     "ja-JP": "画面に表示 → print",
     "en-US": "Think: print this to screen"
    },
    "examPoint": {
     "zh-CN": "常考print的逗号分隔多个参数、sep和end参数的使用。",
     "ja-JP": "printのカンマ区切り複数引数、sep・endパラメータが頻出。",
     "en-US": "Commonly tests comma-separated arguments, sep and end parameters."
    },
    "commonMistake": {
     "zh-CN": "忘记括号、字符串忘加引号。",
     "ja-JP": "カッコ忘れ、文字列の引用符忘れ。",
     "en-US": "Forgetting parentheses or quotation marks around strings."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "IT Passport"
    ],
    "glossaryRefs": [
     "print_function"
    ],
    "meaning": {
     "zh-CN": "print是Python中最基本的输出函数，用于将内容显示到控制台。",
     "ja-JP": "printはPythonで最も基本的な出力関数で、コンソールに内容を表示します。",
     "en-US": "print is the most basic output function in Python, used to display content to the console."
    },
    "memoryHook": {
     "zh-CN": "打印到屏幕 → print",
     "ja-JP": "画面に表示 → print",
     "en-US": "Think: print this to screen"
    },
    "examPoint": {
     "zh-CN": "常考print的逗号分隔多个参数、sep和end参数的使用。",
     "ja-JP": "printのカンマ区切り複数引数、sep・endパラメータが頻出。",
     "en-US": "Commonly tests comma-separated arguments, sep and end parameters."
    },
    "commonMistake": {
     "zh-CN": "忘记括号、字符串忘加引号。",
     "ja-JP": "カッコ忘れ、文字列の引用符忘れ。",
     "en-US": "Forgetting parentheses or quotation marks around strings."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "IT Passport"
    ],
    "glossaryRefs": [
     "print_function"
    ],
    "meaning": {
     "zh-CN": "print是Python中最基本的输出函数，用于将内容显示到控制台。",
     "ja-JP": "printはPythonで最も基本的な出力関数で、コンソールに内容を表示します。",
     "en-US": "print is the most basic output function in Python, used to display content to the console."
    },
    "memoryHook": {
     "zh-CN": "打印到屏幕 → print",
     "ja-JP": "画面に表示 → print",
     "en-US": "Think: print this to screen"
    },
    "examPoint": {
     "zh-CN": "常考print的逗号分隔多个参数、sep和end参数的使用。",
     "ja-JP": "printのカンマ区切り複数引数、sep・endパラメータが頻出。",
     "en-US": "Commonly tests comma-separated arguments, sep and end parameters."
    },
    "commonMistake": {
     "zh-CN": "忘记括号、字符串忘加引号。",
     "ja-JP": "カッコ忘れ、文字列の引用符忘れ。",
     "en-US": "Forgetting parentheses or quotation marks around strings."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "IT Passport"
    ],
    "glossaryRefs": [
     "print_function"
    ],
    "meaning": {
     "zh-CN": "print是Python中最基本的输出函数，用于将内容显示到控制台。",
     "ja-JP": "printはPythonで最も基本的な出力関数で、コンソールに内容を表示します。",
     "en-US": "print is the most basic output function in Python, used to display content to the console."
    },
    "memoryHook": {
     "zh-CN": "打印到屏幕 → print",
     "ja-JP": "画面に表示 → print",
     "en-US": "Think: print this to screen"
    },
    "examPoint": {
     "zh-CN": "常考print的逗号分隔多个参数、sep和end参数的使用。",
     "ja-JP": "printのカンマ区切り複数引数、sep・endパラメータが頻出。",
     "en-US": "Commonly tests comma-separated arguments, sep and end parameters."
    },
    "commonMistake": {
     "zh-CN": "忘记括号、字符串忘加引号。",
     "ja-JP": "カッコ忘れ、文字列の引用符忘れ。",
     "en-US": "Forgetting parentheses or quotation marks around strings."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "IT Passport"
    ],
    "glossaryRefs": [
     "print_function"
    ],
    "meaning": {
     "zh-CN": "print是Python中最基本的输出函数，用于将内容显示到控制台。",
     "ja-JP": "printはPythonで最も基本的な出力関数で、コンソールに内容を表示します。",
     "en-US": "print is the most basic output function in Python, used to display content to the console."
    },
    "memoryHook": {
     "zh-CN": "打印到屏幕 → print",
     "ja-JP": "画面に表示 → print",
     "en-US": "Think: print this to screen"
    },
    "examPoint": {
     "zh-CN": "常考print的逗号分隔多个参数、sep和end参数的使用。",
     "ja-JP": "printのカンマ区切り複数引数、sep・endパラメータが頻出。",
     "en-US": "Commonly tests comma-separated arguments, sep and end parameters."
    },
    "commonMistake": {
     "zh-CN": "忘记括号、字符串忘加引号。",
     "ja-JP": "カッコ忘れ、文字列の引用符忘れ。",
     "en-US": "Forgetting parentheses or quotation marks around strings."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "IT Passport",
     "基本情報"
    ],
    "glossaryRefs": [
     "variable",
     "assignment"
    ],
    "meaning": {
     "zh-CN": "变量是用于存储数据的命名容器，Python中不需要声明类型即可赋值。",
     "ja-JP": "変数はデータを格納する名前付きコンテナで、Pythonでは型宣言なしで代入できます。",
     "en-US": "A variable is a named container for storing data; in Python, you can assign without type declaration."
    },
    "memoryHook": {
     "zh-CN": "变量=贴了标签的盒子",
     "ja-JP": "変数=ラベルを貼った箱",
     "en-US": "Variable = a labeled box"
    },
    "examPoint": {
     "zh-CN": "变量命名规则、动态类型、多重赋值。",
     "ja-JP": "変数名の規則、動的型付け、多重代入。",
     "en-US": "Variable naming rules, dynamic typing, multiple assignment."
    },
    "commonMistake": {
     "zh-CN": "变量未定义就使用、混淆赋值=和比较==。",
     "ja-JP": "未定義変数の使用、代入=と比較==の混同。",
     "en-US": "Using undefined variables, confusing = assignment with == comparison."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "IT Passport",
     "基本情報"
    ],
    "glossaryRefs": [
     "variable",
     "assignment"
    ],
    "meaning": {
     "zh-CN": "变量是用于存储数据的命名容器，Python中不需要声明类型即可赋值。",
     "ja-JP": "変数はデータを格納する名前付きコンテナで、Pythonでは型宣言なしで代入できます。",
     "en-US": "A variable is a named container for storing data; in Python, you can assign without type declaration."
    },
    "memoryHook": {
     "zh-CN": "变量=贴了标签的盒子",
     "ja-JP": "変数=ラベルを貼った箱",
     "en-US": "Variable = a labeled box"
    },
    "examPoint": {
     "zh-CN": "变量命名规则、动态类型、多重赋值。",
     "ja-JP": "変数名の規則、動的型付け、多重代入。",
     "en-US": "Variable naming rules, dynamic typing, multiple assignment."
    },
    "commonMistake": {
     "zh-CN": "变量未定义就使用、混淆赋值=和比较==。",
     "ja-JP": "未定義変数の使用、代入=と比較==の混同。",
     "en-US": "Using undefined variables, confusing = assignment with == comparison."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "IT Passport",
     "基本情報"
    ],
    "glossaryRefs": [
     "variable",
     "assignment"
    ],
    "meaning": {
     "zh-CN": "变量是用于存储数据的命名容器，Python中不需要声明类型即可赋值。",
     "ja-JP": "変数はデータを格納する名前付きコンテナで、Pythonでは型宣言なしで代入できます。",
     "en-US": "A variable is a named container for storing data; in Python, you can assign without type declaration."
    },
    "memoryHook": {
     "zh-CN": "变量=贴了标签的盒子",
     "ja-JP": "変数=ラベルを貼った箱",
     "en-US": "Variable = a labeled box"
    },
    "examPoint": {
     "zh-CN": "变量命名规则、动态类型、多重赋值。",
     "ja-JP": "変数名の規則、動的型付け、多重代入。",
     "en-US": "Variable naming rules, dynamic typing, multiple assignment."
    },
    "commonMistake": {
     "zh-CN": "变量未定义就使用、混淆赋值=和比较==。",
     "ja-JP": "未定義変数の使用、代入=と比較==の混同。",
     "en-US": "Using undefined variables, confusing = assignment with == comparison."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "IT Passport"
    ],
    "glossaryRefs": [
     "input_function"
    ],
    "meaning": {
     "zh-CN": "input()函数用于从控制台获取用户输入，始终返回字符串。",
     "ja-JP": "input()関数はコンソールからユーザー入力を受け取り、常に文字列を返します。",
     "en-US": "The input() function reads user input from the console and always returns a string."
    },
    "memoryHook": {
     "zh-CN": "获取输入 → input",
     "ja-JP": "入力を受け取る → input",
     "en-US": "Think: Get input from user"
    },
    "examPoint": {
     "zh-CN": "input始终返回字符串、需要类型转换(int/float)。",
     "ja-JP": "inputは常に文字列を返す、型変換(int/float)が必要。",
     "en-US": "input() always returns a string, needs type conversion (int/float)."
    },
    "commonMistake": {
     "zh-CN": "忘记将input结果转为数字类型进行比较或计算。",
     "ja-JP": "input結果を数値型に変換せずに比較・計算してしまう。",
     "en-US": "Forgetting to convert input() result to numeric type before comparison or calculation."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "IT Passport"
    ],
    "glossaryRefs": [
     "input_function"
    ],
    "meaning": {
     "zh-CN": "input()函数用于从控制台获取用户输入，始终返回字符串。",
     "ja-JP": "input()関数はコンソールからユーザー入力を受け取り、常に文字列を返します。",
     "en-US": "The input() function reads user input from the console and always returns a string."
    },
    "memoryHook": {
     "zh-CN": "获取输入 → input",
     "ja-JP": "入力を受け取る → input",
     "en-US": "Think: Get input from user"
    },
    "examPoint": {
     "zh-CN": "input始终返回字符串、需要类型转换(int/float)。",
     "ja-JP": "inputは常に文字列を返す、型変換(int/float)が必要。",
     "en-US": "input() always returns a string, needs type conversion (int/float)."
    },
    "commonMistake": {
     "zh-CN": "忘记将input结果转为数字类型进行比较或计算。",
     "ja-JP": "input結果を数値型に変換せずに比較・計算してしまう。",
     "en-US": "Forgetting to convert input() result to numeric type before comparison or calculation."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "if_statement",
     "conditional"
    ],
    "meaning": {
     "zh-CN": "if语句根据条件真假决定是否执行特定代码块。",
     "ja-JP": "if文は条件の真偽に応じてコードブロックを実行するかどうかを決定します。",
     "en-US": "The if statement executes a code block based on whether a condition is true or false."
    },
    "memoryHook": {
     "zh-CN": "如果…就… → if",
     "ja-JP": "もし…なら… → if",
     "en-US": "Think: If this is true, do that"
    },
    "examPoint": {
     "zh-CN": "条件表达式、缩进块、elif/else的搭配。",
     "ja-JP": "条件式、インデントブロック、elif/elseの組み合わせ。",
     "en-US": "Condition expressions, indented blocks, elif/else chaining."
    },
    "commonMistake": {
     "zh-CN": "忘记冒号:、缩进不一致、=和==混淆。",
     "ja-JP": "コロン:忘れ、インデント不統一、=と==の混同。",
     "en-US": "Forgetting colon :, inconsistent indentation, confusing = with ==."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "if_statement",
     "conditional"
    ],
    "meaning": {
     "zh-CN": "if语句根据条件真假决定是否执行特定代码块。",
     "ja-JP": "if文は条件の真偽に応じてコードブロックを実行するかどうかを決定します。",
     "en-US": "The if statement executes a code block based on whether a condition is true or false."
    },
    "memoryHook": {
     "zh-CN": "如果…就… → if",
     "ja-JP": "もし…なら… → if",
     "en-US": "Think: If this is true, do that"
    },
    "examPoint": {
     "zh-CN": "条件表达式、缩进块、elif/else的搭配。",
     "ja-JP": "条件式、インデントブロック、elif/elseの組み合わせ。",
     "en-US": "Condition expressions, indented blocks, elif/else chaining."
    },
    "commonMistake": {
     "zh-CN": "忘记冒号:、缩进不一致、=和==混淆。",
     "ja-JP": "コロン:忘れ、インデント不統一、=と==の混同。",
     "en-US": "Forgetting colon :, inconsistent indentation, confusing = with ==."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "if_statement",
     "conditional"
    ],
    "meaning": {
     "zh-CN": "if语句根据条件真假决定是否执行特定代码块。",
     "ja-JP": "if文は条件の真偽に応じてコードブロックを実行するかどうかを決定します。",
     "en-US": "The if statement executes a code block based on whether a condition is true or false."
    },
    "memoryHook": {
     "zh-CN": "如果…就… → if",
     "ja-JP": "もし…なら… → if",
     "en-US": "Think: If this is true, do that"
    },
    "examPoint": {
     "zh-CN": "条件表达式、缩进块、elif/else的搭配。",
     "ja-JP": "条件式、インデントブロック、elif/elseの組み合わせ。",
     "en-US": "Condition expressions, indented blocks, elif/else chaining."
    },
    "commonMistake": {
     "zh-CN": "忘记冒号:、缩进不一致、=和==混淆。",
     "ja-JP": "コロン:忘れ、インデント不統一、=と==の混同。",
     "en-US": "Forgetting colon :, inconsistent indentation, confusing = with ==."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "if_statement",
     "conditional"
    ],
    "meaning": {
     "zh-CN": "if语句根据条件真假决定是否执行特定代码块。",
     "ja-JP": "if文は条件の真偽に応じてコードブロックを実行するかどうかを決定します。",
     "en-US": "The if statement executes a code block based on whether a condition is true or false."
    },
    "memoryHook": {
     "zh-CN": "如果…就… → if",
     "ja-JP": "もし…なら… → if",
     "en-US": "Think: If this is true, do that"
    },
    "examPoint": {
     "zh-CN": "条件表达式、缩进块、elif/else的搭配。",
     "ja-JP": "条件式、インデントブロック、elif/elseの組み合わせ。",
     "en-US": "Condition expressions, indented blocks, elif/else chaining."
    },
    "commonMistake": {
     "zh-CN": "忘记冒号:、缩进不一致、=和==混淆。",
     "ja-JP": "コロン:忘れ、インデント不統一、=と==の混同。",
     "en-US": "Forgetting colon :, inconsistent indentation, confusing = with ==."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "for_loop",
     "iteration"
    ],
    "meaning": {
     "zh-CN": "for循环用于遍历序列（如列表、字符串、range）中的每个元素。",
     "ja-JP": "forループはシーケンス（リスト、文字列、rangeなど）の各要素を反復処理します。",
     "en-US": "A for loop iterates over each element in a sequence such as a list, string, or range."
    },
    "memoryHook": {
     "zh-CN": "对每个元素做一遍 → for",
     "ja-JP": "各要素に対して繰り返す → for",
     "en-US": "Think: For each item, do something"
    },
    "examPoint": {
     "zh-CN": "range()的使用、遍历列表/字典、break/continue。",
     "ja-JP": "range()の使用、リスト/辞書の走査、break/continue。",
     "en-US": "Using range(), iterating lists/dicts, break/continue."
    },
    "commonMistake": {
     "zh-CN": "忘记冒号、缩进错误、循环内修改迭代对象。",
     "ja-JP": "コロン忘れ、インデント誤り、ループ内での反復オブジェクトの変更。",
     "en-US": "Forgetting colon, indentation errors, modifying the iterable inside the loop."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "for_loop",
     "iteration"
    ],
    "meaning": {
     "zh-CN": "for循环用于遍历序列（如列表、字符串、range）中的每个元素。",
     "ja-JP": "forループはシーケンス（リスト、文字列、rangeなど）の各要素を反復処理します。",
     "en-US": "A for loop iterates over each element in a sequence such as a list, string, or range."
    },
    "memoryHook": {
     "zh-CN": "对每个元素做一遍 → for",
     "ja-JP": "各要素に対して繰り返す → for",
     "en-US": "Think: For each item, do something"
    },
    "examPoint": {
     "zh-CN": "range()的使用、遍历列表/字典、break/continue。",
     "ja-JP": "range()の使用、リスト/辞書の走査、break/continue。",
     "en-US": "Using range(), iterating lists/dicts, break/continue."
    },
    "commonMistake": {
     "zh-CN": "忘记冒号、缩进错误、循环内修改迭代对象。",
     "ja-JP": "コロン忘れ、インデント誤り、ループ内での反復オブジェクトの変更。",
     "en-US": "Forgetting colon, indentation errors, modifying the iterable inside the loop."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "for_loop",
     "iteration"
    ],
    "meaning": {
     "zh-CN": "for循环用于遍历序列（如列表、字符串、range）中的每个元素。",
     "ja-JP": "forループはシーケンス（リスト、文字列、rangeなど）の各要素を反復処理します。",
     "en-US": "A for loop iterates over each element in a sequence such as a list, string, or range."
    },
    "memoryHook": {
     "zh-CN": "对每个元素做一遍 → for",
     "ja-JP": "各要素に対して繰り返す → for",
     "en-US": "Think: For each item, do something"
    },
    "examPoint": {
     "zh-CN": "range()的使用、遍历列表/字典、break/continue。",
     "ja-JP": "range()の使用、リスト/辞書の走査、break/continue。",
     "en-US": "Using range(), iterating lists/dicts, break/continue."
    },
    "commonMistake": {
     "zh-CN": "忘记冒号、缩进错误、循环内修改迭代对象。",
     "ja-JP": "コロン忘れ、インデント誤り、ループ内での反復オブジェクトの変更。",
     "en-US": "Forgetting colon, indentation errors, modifying the iterable inside the loop."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "for_loop",
     "iteration"
    ],
    "meaning": {
     "zh-CN": "for循环用于遍历序列（如列表、字符串、range）中的每个元素。",
     "ja-JP": "forループはシーケンス（リスト、文字列、rangeなど）の各要素を反復処理します。",
     "en-US": "A for loop iterates over each element in a sequence such as a list, string, or range."
    },
    "memoryHook": {
     "zh-CN": "对每个元素做一遍 → for",
     "ja-JP": "各要素に対して繰り返す → for",
     "en-US": "Think: For each item, do something"
    },
    "examPoint": {
     "zh-CN": "range()的使用、遍历列表/字典、break/continue。",
     "ja-JP": "range()の使用、リスト/辞書の走査、break/continue。",
     "en-US": "Using range(), iterating lists/dicts, break/continue."
    },
    "commonMistake": {
     "zh-CN": "忘记冒号、缩进错误、循环内修改迭代对象。",
     "ja-JP": "コロン忘れ、インデント誤り、ループ内での反復オブジェクトの変更。",
     "en-US": "Forgetting colon, indentation errors, modifying the iterable inside the loop."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "while_loop",
     "infinite_loop"
    ],
    "meaning": {
     "zh-CN": "while循环在条件为真时反复执行代码块，直到条件变为假。",
     "ja-JP": "whileループは条件が真である間、コードブロックを繰り返し実行します。",
     "en-US": "A while loop repeatedly executes a code block as long as the condition remains true."
    },
    "memoryHook": {
     "zh-CN": "只要…就一直做 → while",
     "ja-JP": "…の間はずっと → while",
     "en-US": "Think: While this is true, keep going"
    },
    "examPoint": {
     "zh-CN": "循环条件、无限循环的避免、break/continue。",
     "ja-JP": "ループ条件、無限ループ回避、break/continue。",
     "en-US": "Loop conditions, avoiding infinite loops, break/continue."
    },
    "commonMistake": {
     "zh-CN": "忘记更新循环变量导致无限循环。",
     "ja-JP": "ループ変数の更新忘れによる無限ループ。",
     "en-US": "Forgetting to update the loop variable, causing an infinite loop."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "while_loop",
     "infinite_loop"
    ],
    "meaning": {
     "zh-CN": "while循环在条件为真时反复执行代码块，直到条件变为假。",
     "ja-JP": "whileループは条件が真である間、コードブロックを繰り返し実行します。",
     "en-US": "A while loop repeatedly executes a code block as long as the condition remains true."
    },
    "memoryHook": {
     "zh-CN": "只要…就一直做 → while",
     "ja-JP": "…の間はずっと → while",
     "en-US": "Think: While this is true, keep going"
    },
    "examPoint": {
     "zh-CN": "循环条件、无限循环的避免、break/continue。",
     "ja-JP": "ループ条件、無限ループ回避、break/continue。",
     "en-US": "Loop conditions, avoiding infinite loops, break/continue."
    },
    "commonMistake": {
     "zh-CN": "忘记更新循环变量导致无限循环。",
     "ja-JP": "ループ変数の更新忘れによる無限ループ。",
     "en-US": "Forgetting to update the loop variable, causing an infinite loop."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "while_loop",
     "infinite_loop"
    ],
    "meaning": {
     "zh-CN": "while循环在条件为真时反复执行代码块，直到条件变为假。",
     "ja-JP": "whileループは条件が真である間、コードブロックを繰り返し実行します。",
     "en-US": "A while loop repeatedly executes a code block as long as the condition remains true."
    },
    "memoryHook": {
     "zh-CN": "只要…就一直做 → while",
     "ja-JP": "…の間はずっと → while",
     "en-US": "Think: While this is true, keep going"
    },
    "examPoint": {
     "zh-CN": "循环条件、无限循环的避免、break/continue。",
     "ja-JP": "ループ条件、無限ループ回避、break/continue。",
     "en-US": "Loop conditions, avoiding infinite loops, break/continue."
    },
    "commonMistake": {
     "zh-CN": "忘记更新循环变量导致无限循环。",
     "ja-JP": "ループ変数の更新忘れによる無限ループ。",
     "en-US": "Forgetting to update the loop variable, causing an infinite loop."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "基本情報"
    ],
    "glossaryRefs": [
     "function_definition",
     "parameter"
    ],
    "meaning": {
     "zh-CN": "def关键字用于定义函数，将可复用的代码块封装起来。",
     "ja-JP": "defキーワードは関数を定義し、再利用可能なコードブロックをカプセル化します。",
     "en-US": "The def keyword defines a function, encapsulating reusable code into a block."
    },
    "memoryHook": {
     "zh-CN": "定义函数 → def",
     "ja-JP": "関数を定義 → def",
     "en-US": "Think: def = define function"
    },
    "examPoint": {
     "zh-CN": "函数定义语法、参数传递、return返回值。",
     "ja-JP": "関数定義の構文、引数渡し、return戻り値。",
     "en-US": "Function definition syntax, argument passing, return values."
    },
    "commonMistake": {
     "zh-CN": "忘记冒号、忘记return、参数顺序混淆。",
     "ja-JP": "コロン忘れ、return忘れ、引数の順序混同。",
     "en-US": "Forgetting colon, missing return, confusing argument order."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "基本情報"
    ],
    "glossaryRefs": [
     "function_definition",
     "parameter"
    ],
    "meaning": {
     "zh-CN": "def关键字用于定义函数，将可复用的代码块封装起来。",
     "ja-JP": "defキーワードは関数を定義し、再利用可能なコードブロックをカプセル化します。",
     "en-US": "The def keyword defines a function, encapsulating reusable code into a block."
    },
    "memoryHook": {
     "zh-CN": "定义函数 → def",
     "ja-JP": "関数を定義 → def",
     "en-US": "Think: def = define function"
    },
    "examPoint": {
     "zh-CN": "函数定义语法、参数传递、return返回值。",
     "ja-JP": "関数定義の構文、引数渡し、return戻り値。",
     "en-US": "Function definition syntax, argument passing, return values."
    },
    "commonMistake": {
     "zh-CN": "忘记冒号、忘记return、参数顺序混淆。",
     "ja-JP": "コロン忘れ、return忘れ、引数の順序混同。",
     "en-US": "Forgetting colon, missing return, confusing argument order."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "基本情報"
    ],
    "glossaryRefs": [
     "function_definition",
     "parameter"
    ],
    "meaning": {
     "zh-CN": "def关键字用于定义函数，将可复用的代码块封装起来。",
     "ja-JP": "defキーワードは関数を定義し、再利用可能なコードブロックをカプセル化します。",
     "en-US": "The def keyword defines a function, encapsulating reusable code into a block."
    },
    "memoryHook": {
     "zh-CN": "定义函数 → def",
     "ja-JP": "関数を定義 → def",
     "en-US": "Think: def = define function"
    },
    "examPoint": {
     "zh-CN": "函数定义语法、参数传递、return返回值。",
     "ja-JP": "関数定義の構文、引数渡し、return戻り値。",
     "en-US": "Function definition syntax, argument passing, return values."
    },
    "commonMistake": {
     "zh-CN": "忘记冒号、忘记return、参数顺序混淆。",
     "ja-JP": "コロン忘れ、return忘れ、引数の順序混同。",
     "en-US": "Forgetting colon, missing return, confusing argument order."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "IT Passport"
    ],
    "glossaryRefs": [
     "import_module"
    ],
    "meaning": {
     "zh-CN": "import语句用于导入模块，以便使用其他文件或库中定义的功能。",
     "ja-JP": "import文はモジュールをインポートして、他のファイルやライブラリで定義された機能を使用します。",
     "en-US": "The import statement loads a module to use functionality defined in other files or libraries."
    },
    "memoryHook": {
     "zh-CN": "导入工具箱 → import",
     "ja-JP": "ツールボックスを読み込む → import",
     "en-US": "Think: Import a toolbox"
    },
    "examPoint": {
     "zh-CN": "import vs from...import、模块搜索路径。",
     "ja-JP": "importとfrom...importの違い、モジュール検索パス。",
     "en-US": "import vs from...import, module search path."
    },
    "commonMistake": {
     "zh-CN": "模块名拼写错误、循环导入。",
     "ja-JP": "モジュール名のスペルミス、循環インポート。",
     "en-US": "Misspelling module names, circular imports."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "IT Passport"
    ],
    "glossaryRefs": [
     "import_module"
    ],
    "meaning": {
     "zh-CN": "import语句用于导入模块，以便使用其他文件或库中定义的功能。",
     "ja-JP": "import文はモジュールをインポートして、他のファイルやライブラリで定義された機能を使用します。",
     "en-US": "The import statement loads a module to use functionality defined in other files or libraries."
    },
    "memoryHook": {
     "zh-CN": "导入工具箱 → import",
     "ja-JP": "ツールボックスを読み込む → import",
     "en-US": "Think: Import a toolbox"
    },
    "examPoint": {
     "zh-CN": "import vs from...import、模块搜索路径。",
     "ja-JP": "importとfrom...importの違い、モジュール検索パス。",
     "en-US": "import vs from...import, module search path."
    },
    "commonMistake": {
     "zh-CN": "模块名拼写错误、循环导入。",
     "ja-JP": "モジュール名のスペルミス、循環インポート。",
     "en-US": "Misspelling module names, circular imports."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "list_type",
     "mutable_sequence"
    ],
    "meaning": {
     "zh-CN": "列表是Python中可变的、有序的序列，可包含不同类型的元素。",
     "ja-JP": "リストはPythonでミュータブルな順序付きシーケンスで、異なる型の要素を含められます。",
     "en-US": "A list is a mutable, ordered sequence that can contain elements of different types."
    },
    "memoryHook": {
     "zh-CN": "方括号[] = 能改的序列",
     "ja-JP": "角かっこ[] = 変更可能な配列",
     "en-US": "Square brackets [] = changeable sequence"
    },
    "examPoint": {
     "zh-CN": "索引访问、切片、append/extend/insert、列表推导式。",
     "ja-JP": "インデックスアクセス、スライス、append/extend/insert、リスト内包表記。",
     "en-US": "Index access, slicing, append/extend/insert, list comprehensions."
    },
    "commonMistake": {
     "zh-CN": "索引从0开始遗忘、sort()原地修改而不返回新列表。",
     "ja-JP": "インデックスが0から始まることの忘れ、sort()は原地更新で新リストを返さない。",
     "en-US": "Forgetting 0-based indexing, sort() modifies in-place and returns None."
    }
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
    "source": "builtin",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport",
     "基本情報"
    ],
    "glossaryRefs": [
     "dict_type",
     "key_value"
    ],
    "meaning": {
     "zh-CN": "字典是键值对的集合，通过键快速查找值。",
     "ja-JP": "辞書はキーと値のペアの集合で、キーから値を高速に検索できます。",
     "en-US": "A dict is a collection of key-value pairs for fast lookup by key."
    },
    "memoryHook": {
     "zh-CN": "花括号{:} = 查字典",
     "ja-JP": "波かっこ{:} = 辞書を引く",
     "en-US": "Curly braces {:} = look it up by key"
    },
    "examPoint": {
     "zh-CN": "键值对操作、keys()/values()/items()、键的唯一性。",
     "ja-JP": "キーと値の操作、keys()/values()/items()、キーの一意性。",
     "en-US": "Key-value operations, keys()/values()/items(), key uniqueness."
    },
    "commonMistake": {
     "zh-CN": "访问不存在的键（用get()避免KeyError）、键必须是不可变类型。",
     "ja-JP": "存在しないキーのアクセス（get()でKeyError回避）、キーは不変型必須。",
     "en-US": "Accessing nonexistent keys (use get()), keys must be immutable types."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python",
     "基本情報"
    ],
    "glossaryRefs": [
     "f_string"
    ],
    "meaning": {
     "zh-CN": "f-string是Python 3.6引入的字符串格式化方式，在字符串前加f并用{}嵌入表达式。",
     "ja-JP": "f-stringはPython 3.6で導入された文字列フォーマットで、fプレフィックスと{}で式を埋め込みます。",
     "en-US": "f-string is a string formatting method introduced in Python 3.6, embedding expressions with {} after an f prefix."
    },
    "memoryHook": {
     "zh-CN": "f前缀 + {}占位 = 直接嵌入变量",
     "ja-JP": "f接頭辞 + {}プレースホルダ = 直接変数埋め込み",
     "en-US": "f prefix + {} placeholder = embed variables directly"
    },
    "examPoint": {
     "zh-CN": "f-string语法、格式化数字、与format()和%格式化的区别。",
     "ja-JP": "f-string構文、数値フォーマット、format()や%書式との違い。",
     "en-US": "f-string syntax, number formatting, differences from format() and % formatting."
    },
    "commonMistake": {
     "zh-CN": "忘记f前缀、花括号内写复杂表达式使代码难读。",
     "ja-JP": "f接頭辞忘れ、{}内に複雑な式を書いて可読性低下。",
     "en-US": "Forgetting the f prefix, writing complex expressions inside {} reducing readability."
    }
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
    "source": "builtin",
    "examRelevance": "medium",
    "examTargets": [
     "Python"
    ],
    "glossaryRefs": [
     "comment"
    ],
    "meaning": {
     "zh-CN": "注释是用#开头对代码进行解释说明的文字，不会被程序执行。",
     "ja-JP": "コメントは#で始まり、コードを説明するための文で、プログラムでは実行されません。",
     "en-US": "Comments starting with # explain code and are not executed by the program."
    },
    "memoryHook": {
     "zh-CN": "# = 写备注",
     "ja-JP": "# = メモ書き",
     "en-US": "Think: # = leave notes in code"
    },
    "examPoint": {
     "zh-CN": "注释的用途、多行注释可以用三重引号。",
     "ja-JP": "コメントの用途、複数行コメントは三重引用符を使用。",
     "en-US": "Purpose of comments, multi-line comments using triple quotes."
    },
    "commonMistake": {
     "zh-CN": "注释过少或过多、注释内容与代码实际行为不一致。",
     "ja-JP": "コメントが少なすぎる/多すぎる、コメントとコードの不一致。",
     "en-US": "Too few or too many comments, comments not matching actual code behavior."
    }
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
    "code": "squares = [x**2 for x in range(5)]\nprint(squares)",
    "examRelevance": "high",
    "examTargets": [
     "Python"
    ],
    "glossaryRefs": [
     "list_comprehension"
    ],
    "meaning": {
     "zh-CN": "列表推导式是简洁地创建列表的语法，格式为[表达式 for 变量 in 可迭代对象 if 条件]。",
     "ja-JP": "リスト内包表記は簡潔にリストを作成する構文で、[式 for 変数 in イテラブル if 条件]の形式です。",
     "en-US": "List comprehension is a concise way to create lists in the form [expression for variable in iterable if condition]."
    },
    "memoryHook": {
     "zh-CN": "循环+筛选+变换 → 一行搞定",
     "ja-JP": "ループ+フィルタ+変換 → 一行で完了",
     "en-US": "Think: Loop + filter + transform in one line"
    },
    "examPoint": {
     "zh-CN": "基本语法、条件筛选、嵌套循环的列表推导式。",
     "ja-JP": "基本構文、条件フィルタ、ネストループのリスト内包表記。",
     "en-US": "Basic syntax, conditional filtering, nested loop comprehensions."
    },
    "commonMistake": {
     "zh-CN": "过度嵌套降低可读性、忘记条件表达式顺序。",
     "ja-JP": "過度なネストによる可読性低下、条件式の順序忘れ。",
     "en-US": "Over-nesting reducing readability, forgetting the order of condition expressions."
    }
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
    "code": "nums = [-1,2,-3,4,0,5]\npos = [x for x in nums if x>0]\nprint(pos)",
    "examRelevance": "high",
    "examTargets": [
     "Python"
    ],
    "glossaryRefs": [
     "list_comprehension"
    ],
    "meaning": {
     "zh-CN": "列表推导式是简洁地创建列表的语法，格式为[表达式 for 变量 in 可迭代对象 if 条件]。",
     "ja-JP": "リスト内包表記は簡潔にリストを作成する構文で、[式 for 変数 in イテラブル if 条件]の形式です。",
     "en-US": "List comprehension is a concise way to create lists in the form [expression for variable in iterable if condition]."
    },
    "memoryHook": {
     "zh-CN": "循环+筛选+变换 → 一行搞定",
     "ja-JP": "ループ+フィルタ+変換 → 一行で完了",
     "en-US": "Think: Loop + filter + transform in one line"
    },
    "examPoint": {
     "zh-CN": "基本语法、条件筛选、嵌套循环的列表推导式。",
     "ja-JP": "基本構文、条件フィルタ、ネストループのリスト内包表記。",
     "en-US": "Basic syntax, conditional filtering, nested loop comprehensions."
    },
    "commonMistake": {
     "zh-CN": "过度嵌套降低可读性、忘记条件表达式顺序。",
     "ja-JP": "過度なネストによる可読性低下、条件式の順序忘れ。",
     "en-US": "Over-nesting reducing readability, forgetting the order of condition expressions."
    }
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
    "code": "coords = [(x,y) for x in range(3) for y in range(2)]\nprint(coords)",
    "examRelevance": "high",
    "examTargets": [
     "Python"
    ],
    "glossaryRefs": [
     "list_comprehension"
    ],
    "meaning": {
     "zh-CN": "列表推导式是简洁地创建列表的语法，格式为[表达式 for 变量 in 可迭代对象 if 条件]。",
     "ja-JP": "リスト内包表記は簡潔にリストを作成する構文で、[式 for 変数 in イテラブル if 条件]の形式です。",
     "en-US": "List comprehension is a concise way to create lists in the form [expression for variable in iterable if condition]."
    },
    "memoryHook": {
     "zh-CN": "循环+筛选+变换 → 一行搞定",
     "ja-JP": "ループ+フィルタ+変換 → 一行で完了",
     "en-US": "Think: Loop + filter + transform in one line"
    },
    "examPoint": {
     "zh-CN": "基本语法、条件筛选、嵌套循环的列表推导式。",
     "ja-JP": "基本構文、条件フィルタ、ネストループのリスト内包表記。",
     "en-US": "Basic syntax, conditional filtering, nested loop comprehensions."
    },
    "commonMistake": {
     "zh-CN": "过度嵌套降低可读性、忘记条件表达式顺序。",
     "ja-JP": "過度なネストによる可読性低下、条件式の順序忘れ。",
     "en-US": "Over-nesting reducing readability, forgetting the order of condition expressions."
    }
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
    "code": "double = lambda x: x*2\nprint(double(5))\nprint(double(7))",
    "examRelevance": "high",
    "examTargets": [
     "Python"
    ],
    "glossaryRefs": [
     "lambda_expression"
    ],
    "meaning": {
     "zh-CN": "lambda是定义匿名函数的关键字，适合简单表达式，通常作为参数传递。",
     "ja-JP": "lambdaは無名関数を定義するキーワードで、簡単な式に適し、引数として渡されます。",
     "en-US": "lambda defines an anonymous function for simple expressions, often passed as an argument."
    },
    "memoryHook": {
     "zh-CN": "一次性函数 → lambda",
     "ja-JP": "一回限りの関数 → lambda",
     "en-US": "Think: lambda = short, inline function"
    },
    "examPoint": {
     "zh-CN": "lambda与sorted/map/filter配合使用、只能写表达式。",
     "ja-JP": "lambdaとsorted/map/filterの併用、式のみ記述可能。",
     "en-US": "Using lambda with sorted/map/filter, only expressions allowed."
    },
    "commonMistake": {
     "zh-CN": "lambda体包含语句而非表达式、忘记lambda需要赋值或立即调用。",
     "ja-JP": "lambda本体に式ではなく文を書いてしまう、代入または即時呼び出しが必要。",
     "en-US": "Using statements instead of expressions, forgetting lambda needs assignment or immediate call."
    }
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
    "code": "words = [\"hello\",\"world\",\"python\"]\nup = list(map(lambda w: w.upper(), words))\nprint(up)",
    "examRelevance": "high",
    "examTargets": [
     "Python"
    ],
    "glossaryRefs": [
     "lambda_expression"
    ],
    "meaning": {
     "zh-CN": "lambda是定义匿名函数的关键字，适合简单表达式，通常作为参数传递。",
     "ja-JP": "lambdaは無名関数を定義するキーワードで、簡単な式に適し、引数として渡されます。",
     "en-US": "lambda defines an anonymous function for simple expressions, often passed as an argument."
    },
    "memoryHook": {
     "zh-CN": "一次性函数 → lambda",
     "ja-JP": "一回限りの関数 → lambda",
     "en-US": "Think: lambda = short, inline function"
    },
    "examPoint": {
     "zh-CN": "lambda与sorted/map/filter配合使用、只能写表达式。",
     "ja-JP": "lambdaとsorted/map/filterの併用、式のみ記述可能。",
     "en-US": "Using lambda with sorted/map/filter, only expressions allowed."
    },
    "commonMistake": {
     "zh-CN": "lambda体包含语句而非表达式、忘记lambda需要赋值或立即调用。",
     "ja-JP": "lambda本体に式ではなく文を書いてしまう、代入または即時呼び出しが必要。",
     "en-US": "Using statements instead of expressions, forgetting lambda needs assignment or immediate call."
    }
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
    "code": "students = [(\"Alice\",85),(\"Bob\",72),(\"Aoi\",91)]\nsorted_by = sorted(students, key=lambda s: s[1], reverse=True)\nprint(sorted_by)",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "基本情報"
    ],
    "glossaryRefs": [
     "sorted_function"
    ],
    "meaning": {
     "zh-CN": "sorted()函数返回一个新的已排序列表，原列表不变，支持自定义排序规则。",
     "ja-JP": "sorted()関数は新しいソート済みリストを返し、元のリストは変更されず、カスタムソートルールもサポートします。",
     "en-US": "The sorted() function returns a new sorted list without modifying the original, supporting custom sort keys."
    },
    "memoryHook": {
     "zh-CN": "排序出新列表 → sorted",
     "ja-JP": "ソートして新リスト → sorted",
     "en-US": "Think: sorted = returns new sorted list"
    },
    "examPoint": {
     "zh-CN": "sorted与list.sort()的区别、key参数和reverse参数。",
     "ja-JP": "sortedとlist.sort()の違い、keyパラメータとreverseパラメータ。",
     "en-US": "Difference between sorted() and list.sort(), key and reverse parameters."
    },
    "commonMistake": {
     "zh-CN": "混淆sorted()和list.sort()（后者原地修改返回None）。",
     "ja-JP": "sorted()とlist.sort()の混同（後者は原地更新でNoneを返す）。",
     "en-US": "Confusing sorted() with list.sort() (the latter is in-place returning None)."
    }
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
    "code": "try:\n    num = int(input(\"Enter: \"))\n    print(10/num)\nexcept ValueError:\n    print(\"Invalid!\")\nexcept ZeroDivisionError:\n    print(\"No zero!\")",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "基本情報"
    ],
    "glossaryRefs": [
     "exception_handling"
    ],
    "meaning": {
     "zh-CN": "try/except用于捕获和处理异常，防止程序因错误而崩溃。",
     "ja-JP": "try/exceptは例外をキャッチして処理し、エラーによるプログラムのクラッシュを防ぎます。",
     "en-US": "try/except catches and handles exceptions to prevent program crashes from errors."
    },
    "memoryHook": {
     "zh-CN": "尝试 + 容错 = try/except",
     "ja-JP": "試す + エラー処理 = try/except",
     "en-US": "Think: try this, handle errors with except"
    },
    "examPoint": {
     "zh-CN": "try/except/finally结构、捕获特定异常类型。",
     "ja-JP": "try/except/finally構造、特定の例外型のキャッチ。",
     "en-US": "try/except/finally structure, catching specific exception types."
    },
    "commonMistake": {
     "zh-CN": "捕获过于宽泛的Exception、忘记finally用于资源释放。",
     "ja-JP": "広すぎる例外キャッチ、finallyによるリソース解放の忘れ。",
     "en-US": "Catching too broad Exception, forgetting finally for resource cleanup."
    }
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
    "code": "try:\n    f=open(\"data.txt\",\"r\")\n    content=f.read()\nexcept FileNotFoundError:\n    print(\"Not found\")\nelse:\n    print(\"OK\")\nfinally:\n    print(\"Done\")",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "基本情報"
    ],
    "glossaryRefs": [
     "exception_handling"
    ],
    "meaning": {
     "zh-CN": "try/except用于捕获和处理异常，防止程序因错误而崩溃。",
     "ja-JP": "try/exceptは例外をキャッチして処理し、エラーによるプログラムのクラッシュを防ぎます。",
     "en-US": "try/except catches and handles exceptions to prevent program crashes from errors."
    },
    "memoryHook": {
     "zh-CN": "尝试 + 容错 = try/except",
     "ja-JP": "試す + エラー処理 = try/except",
     "en-US": "Think: try this, handle errors with except"
    },
    "examPoint": {
     "zh-CN": "try/except/finally结构、捕获特定异常类型。",
     "ja-JP": "try/except/finally構造、特定の例外型のキャッチ。",
     "en-US": "try/except/finally structure, catching specific exception types."
    },
    "commonMistake": {
     "zh-CN": "捕获过于宽泛的Exception、忘记finally用于资源释放。",
     "ja-JP": "広すぎる例外キャッチ、finallyによるリソース解放の忘れ。",
     "en-US": "Catching too broad Exception, forgetting finally for resource cleanup."
    }
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
    "code": "vals = [\"10\",\"abc\",\"20\"]\nfor v in vals:\n    try:\n        print(int(v)**2)\n    except ValueError as e:\n        print(f\"Error: {e}\")",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "基本情報"
    ],
    "glossaryRefs": [
     "exception_handling"
    ],
    "meaning": {
     "zh-CN": "try/except用于捕获和处理异常，防止程序因错误而崩溃。",
     "ja-JP": "try/exceptは例外をキャッチして処理し、エラーによるプログラムのクラッシュを防ぎます。",
     "en-US": "try/except catches and handles exceptions to prevent program crashes from errors."
    },
    "memoryHook": {
     "zh-CN": "尝试 + 容错 = try/except",
     "ja-JP": "試す + エラー処理 = try/except",
     "en-US": "Think: try this, handle errors with except"
    },
    "examPoint": {
     "zh-CN": "try/except/finally结构、捕获特定异常类型。",
     "ja-JP": "try/except/finally構造、特定の例外型のキャッチ。",
     "en-US": "try/except/finally structure, catching specific exception types."
    },
    "commonMistake": {
     "zh-CN": "捕获过于宽泛的Exception、忘记finally用于资源释放。",
     "ja-JP": "広すぎる例外キャッチ、finallyによるリソース解放の忘れ。",
     "en-US": "Catching too broad Exception, forgetting finally for resource cleanup."
    }
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
    "code": "class Dog:\n    def __init__(self,name):\n        self.name=name\n    def bark(self):\n        return f\"{self.name} says woof!\"\nd=Dog(\"Rex\")\nprint(d.bark())",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "Java",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "class_definition",
     "oop"
    ],
    "meaning": {
     "zh-CN": "class关键字用于定义类，类是面向对象编程中创建对象的蓝图。",
     "ja-JP": "classキーワードはクラスを定義し、クラスはオブジェクト指向プログラミングにおけるオブジェクトの設計図です。",
     "en-US": "The class keyword defines a class, which is a blueprint for creating objects in OOP."
    },
    "memoryHook": {
     "zh-CN": "蓝图 → class",
     "ja-JP": "設計図 → class",
     "en-US": "Think: class = blueprint for objects"
    },
    "examPoint": {
     "zh-CN": "类定义、__init__构造方法、self参数、继承。",
     "ja-JP": "クラス定義、__init__コンストラクタ、selfパラメータ、継承。",
     "en-US": "Class definition, __init__ constructor, self parameter, inheritance."
    },
    "commonMistake": {
     "zh-CN": "忘记self参数、方法定义缺少self、构造方法写__init__而不是__init__。",
     "ja-JP": "selfパラメータ忘れ、メソッド定義にselfがない、コンストラクタの書き方間違い。",
     "en-US": "Forgetting self parameter, methods without self, miswriting __init__."
    }
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
    "code": "class Rect:\n    def __init__(self,w,h):\n        self.w=w;self.h=h\n    def area(self):\n        return self.w*self.h\n    def __str__(self):\n        return f\"{self.w}x{self.h} rect\"\nr=Rect(3,4)\nprint(r)\nprint(r.area())",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "Java",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "class_definition",
     "oop"
    ],
    "meaning": {
     "zh-CN": "class关键字用于定义类，类是面向对象编程中创建对象的蓝图。",
     "ja-JP": "classキーワードはクラスを定義し、クラスはオブジェクト指向プログラミングにおけるオブジェクトの設計図です。",
     "en-US": "The class keyword defines a class, which is a blueprint for creating objects in OOP."
    },
    "memoryHook": {
     "zh-CN": "蓝图 → class",
     "ja-JP": "設計図 → class",
     "en-US": "Think: class = blueprint for objects"
    },
    "examPoint": {
     "zh-CN": "类定义、__init__构造方法、self参数、继承。",
     "ja-JP": "クラス定義、__init__コンストラクタ、selfパラメータ、継承。",
     "en-US": "Class definition, __init__ constructor, self parameter, inheritance."
    },
    "commonMistake": {
     "zh-CN": "忘记self参数、方法定义缺少self、构造方法写__init__而不是__init__。",
     "ja-JP": "selfパラメータ忘れ、メソッド定義にselfがない、コンストラクタの書き方間違い。",
     "en-US": "Forgetting self parameter, methods without self, miswriting __init__."
    }
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
    "code": "class Person:\n    def __init__(self,name):\n        self.name=name\nclass Student(Person):\n    def __init__(self,name,grade):\n        super().__init__(name)\n        self.grade=grade\n    def info(self):\n        return f\"{self.name}: {self.grade}\"\ns=Student(\"Alice\",\"A\")\nprint(s.info())",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "Java",
     "SG",
     "基本情報"
    ],
    "glossaryRefs": [
     "class_definition",
     "oop"
    ],
    "meaning": {
     "zh-CN": "class关键字用于定义类，类是面向对象编程中创建对象的蓝图。",
     "ja-JP": "classキーワードはクラスを定義し、クラスはオブジェクト指向プログラミングにおけるオブジェクトの設計図です。",
     "en-US": "The class keyword defines a class, which is a blueprint for creating objects in OOP."
    },
    "memoryHook": {
     "zh-CN": "蓝图 → class",
     "ja-JP": "設計図 → class",
     "en-US": "Think: class = blueprint for objects"
    },
    "examPoint": {
     "zh-CN": "类定义、__init__构造方法、self参数、继承。",
     "ja-JP": "クラス定義、__init__コンストラクタ、selfパラメータ、継承。",
     "en-US": "Class definition, __init__ constructor, self parameter, inheritance."
    },
    "commonMistake": {
     "zh-CN": "忘记self参数、方法定义缺少self、构造方法写__init__而不是__init__。",
     "ja-JP": "selfパラメータ忘れ、メソッド定義にselfがない、コンストラクタの書き方間違い。",
     "en-US": "Forgetting self parameter, methods without self, miswriting __init__."
    }
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
    "code": "pt=(3,4)\nprint(pt[0])\nprint(pt[1])",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "基本情報"
    ],
    "glossaryRefs": [
     "tuple_type",
     "immutable_sequence"
    ],
    "meaning": {
     "zh-CN": "元组是不可变的序列，一旦创建不能修改。",
     "ja-JP": "タプルはイミュータブルなシーケンスで、作成後に変更できません。",
     "en-US": "A tuple is an immutable sequence that cannot be changed after creation."
    },
    "memoryHook": {
     "zh-CN": "圆括号() = 不能改的序列",
     "ja-JP": "丸かっこ() = 変更できない配列",
     "en-US": "Parentheses () = unchangeable sequence"
    },
    "examPoint": {
     "zh-CN": "元组的不可变性、解包赋值、与列表的区别。",
     "ja-JP": "タプルの不変性、アンパック代入、リストとの違い。",
     "en-US": "Tuple immutability, unpacking assignment, differences from lists."
    },
    "commonMistake": {
     "zh-CN": "单元素元组忘记加逗号、(1)不是元组而是整数。",
     "ja-JP": "1要素タプルのカンマ忘れ、(1)はタプルではなく整数。",
     "en-US": "Forgetting comma for single-element tuple, (1) is an integer not a tuple."
    }
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
    "code": "name,age,score=(\"Alice\",20,85)\nprint(f\"{name} is {age} years old\")\nprint(f\"Score: {score}\")",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "基本情報"
    ],
    "glossaryRefs": [
     "tuple_type",
     "immutable_sequence"
    ],
    "meaning": {
     "zh-CN": "元组是不可变的序列，一旦创建不能修改。",
     "ja-JP": "タプルはイミュータブルなシーケンスで、作成後に変更できません。",
     "en-US": "A tuple is an immutable sequence that cannot be changed after creation."
    },
    "memoryHook": {
     "zh-CN": "圆括号() = 不能改的序列",
     "ja-JP": "丸かっこ() = 変更できない配列",
     "en-US": "Parentheses () = unchangeable sequence"
    },
    "examPoint": {
     "zh-CN": "元组的不可变性、解包赋值、与列表的区别。",
     "ja-JP": "タプルの不変性、アンパック代入、リストとの違い。",
     "en-US": "Tuple immutability, unpacking assignment, differences from lists."
    },
    "commonMistake": {
     "zh-CN": "单元素元组忘记加逗号、(1)不是元组而是整数。",
     "ja-JP": "1要素タプルのカンマ忘れ、(1)はタプルではなく整数。",
     "en-US": "Forgetting comma for single-element tuple, (1) is an integer not a tuple."
    }
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
    "code": "fruits={\"apple\",\"banana\",\"cherry\"}\nfruits.add(\"date\")\nprint(sorted(fruits))",
    "examRelevance": "high",
    "examTargets": [
     "Python",
     "IT Passport"
    ],
    "glossaryRefs": [
     "set_type",
     "unique_elements"
    ],
    "meaning": {
     "zh-CN": "集合是无序的、不重复元素的集合，支持数学集合运算。",
     "ja-JP": "集合は順序なしの一意な要素の集まりで、数学的な集合演算をサポートします。",
     "en-US": "A set is an unordered collection of unique elements with mathematical set operations."
    },
    "memoryHook": {
     "zh-CN": "去重 → set",
     "ja-JP": "重複除去 → set",
     "en-US": "Think: Remove duplicates → set"
    },
    "examPoint": {
     "zh-CN": "集合的并/交/差运算、去重特性。",
     "ja-JP": "集合の和/積/差演算、重複除去特性。",
     "en-US": "Union/intersection/difference operations, deduplication."
    },
    "commonMistake": {
     "zh-CN": "{}创建空字典而非空集合（空集用set()）。",
     "ja-JP": "{}は空の辞書、空集合はset()で作成。",
     "en-US": "{} creates an empty dict, not an empty set (use set())."
    }
  }
];
