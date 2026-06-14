// Coding Typing Practice - undefined
window.CODING_TYPING_DATA_SYMBOLS = [
  {
    "id": "sym-paren-001",
    "language": "symbol",
    "level": 1,
    "category": "parentheses",
    "title": {
      "zh-CN": "圆括号 () 函数调用",
      "ja-JP": "丸括弧 () 関数呼び出し",
      "en-US": "Parentheses for function calls"
    },
    "code": "print(\"Hello\")",
    "explanation": {
      "zh-CN": "圆括号用于函数调用。括号总是成对出现。",
      "ja-JP": "丸括弧は関数呼び出しに使います。括弧は常にペアで使います。",
      "en-US": "Parentheses are used for function calls. They always come in pairs."
    },
    "focus": [
      "左括号 (",
      "右括号 )"
    ],
    "hint": {
      "zh-CN": "括号要成对输入。",
      "ja-JP": "括弧はペアで入力します。",
      "en-US": "Every opening parenthesis needs a matching closing parenthesis."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "sym-paren-002",
    "language": "symbol",
    "level": 1,
    "category": "parentheses",
    "title": {
      "zh-CN": "圆括号 数学运算",
      "ja-JP": "丸括弧 数式の優先順位",
      "en-US": "Parentheses for precedence"
    },
    "code": "result = (a + b) * c",
    "explanation": {
      "zh-CN": "圆括号改变运算优先级。",
      "ja-JP": "丸括弧は演算子の優先順位を変更できます。",
      "en-US": "Parentheses change the order of evaluation in arithmetic."
    },
    "focus": [
      "成对括号",
      "括号内表达式"
    ],
    "hint": {
      "zh-CN": "数学运算中括号改变优先级。",
      "ja-JP": "数式では括弧が優先順位を変更します。",
      "en-US": "Operations inside parentheses are evaluated first."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "sym-paren-003",
    "language": "symbol",
    "level": 2,
    "category": "parentheses",
    "title": {
      "zh-CN": "圆括号 条件表达式",
      "ja-JP": "丸括弧 条件式",
      "en-US": "Parentheses in conditions"
    },
    "code": "if (x > 0 && y < 10) {",
    "explanation": {
      "zh-CN": "控制语句中条件必须用圆括号包裹。",
      "ja-JP": "制御文では条件式を丸括弧で囲む必要があります。",
      "en-US": "Control structures like if and while require parentheses around the condition."
    },
    "focus": [
      "if 后括号",
      "条件表达式"
    ],
    "hint": {
      "zh-CN": "if 后面紧跟圆括号，不要空格。",
      "ja-JP": "if の直後に丸括弧を置き、スペースを入れません。",
      "en-US": "The condition goes inside parentheses, the body goes in braces."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sym-brace-001",
    "language": "symbol",
    "level": 1,
    "category": "braces",
    "title": {
      "zh-CN": "花括号 {} 代码块",
      "ja-JP": "波括弧 {} コードブロック",
      "en-US": "Braces for code blocks"
    },
    "code": "if (x > 0) {\n    System.out.println(\"OK\");\n}",
    "explanation": {
      "zh-CN": "花括号定义代码块。在 Java/C 等语言中使用。",
      "ja-JP": "波括弧はコードブロックを定義します。Java/C などの言語で使用。",
      "en-US": "Curly braces define code blocks in Java, C, JavaScript, and similar languages."
    },
    "focus": [
      "左花括号 {",
      "右花括号 }"
    ],
    "hint": {
      "zh-CN": "花括号成对出现。左花括号在行尾，右花括号独占一行。",
      "ja-JP": "波括弧はペアで使います。左波括弧は行末に、右波括弧は単独行に。",
      "en-US": "Every opening brace needs a matching closing brace."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sym-brace-002",
    "language": "symbol",
    "level": 2,
    "category": "braces",
    "title": {
      "zh-CN": "花括号 Python 字典",
      "ja-JP": "波括弧 Python 辞書",
      "en-US": "Braces in Python dict"
    },
    "code": "user = {\"name\": \"Alice\", \"age\": 25}",
    "explanation": {
      "zh-CN": "Python 中花括号创建字典。",
      "ja-JP": "Python では波括弧で辞書を作成します。",
      "en-US": "In Python, curly braces create a dictionary with key-value pairs."
    },
    "focus": [
      "花括号包裹",
      "键冒号值"
    ],
    "hint": {
      "zh-CN": "字典的键和值用冒号连接，键值对之间用逗号。",
      "ja-JP": "辞書のキーと値はコロンで接続し、ペア間はカンマ。",
      "en-US": "Write key:value pairs separated by commas inside the braces."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sym-bracket-001",
    "language": "symbol",
    "level": 1,
    "category": "brackets",
    "title": {
      "zh-CN": "方括号 [] 列表/数组",
      "ja-JP": "角括弧 [] リスト/配列",
      "en-US": "Brackets for lists/arrays"
    },
    "code": "fruits = [\"apple\", \"banana\", \"cherry\"]",
    "explanation": {
      "zh-CN": "方括号定义列表(Python)或数组(Java/JS)。",
      "ja-JP": "角括弧はリスト(Python)や配列(Java/JS)の定義に使います。",
      "en-US": "Square brackets define a list in Python (or an array in Java/JavaScript)."
    },
    "focus": [
      "左方括号 [",
      "右方括号 ]"
    ],
    "hint": {
      "zh-CN": "方括号成对输入。元素之间用逗号分隔。",
      "ja-JP": "角括弧はペアで入力します。要素間はカンマで区切ります。",
      "en-US": "Separate elements with commas inside the brackets."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "sym-bracket-002",
    "language": "symbol",
    "level": 1,
    "category": "brackets",
    "title": {
      "zh-CN": "方括号 索引访问",
      "ja-JP": "角括弧 インデックスアクセス",
      "en-US": "Brackets for index access"
    },
    "code": "first = names[0]",
    "explanation": {
      "zh-CN": "方括号用于访问序列中的元素，索引从0开始。",
      "ja-JP": "角括弧はシーケンスの要素アクセスに使います。インデックスは0から。",
      "en-US": "Square brackets access an element by its index. Indexing starts at 0."
    },
    "focus": [
      "变量名后括号",
      "索引数字"
    ],
    "hint": {
      "zh-CN": "变量名紧接方括号，中间不留空格。",
      "ja-JP": "変数名の直後に角括弧を置き、間にスペースを入れません。",
      "en-US": "The first element is at index 0, the second at index 1, and so on."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "sym-semicolon-001",
    "language": "symbol",
    "level": 1,
    "category": "semicolon",
    "title": {
      "zh-CN": "分号 ; 语句结束",
      "ja-JP": "セミコロン ; 文の終わり",
      "en-US": "Semicolon ends statements"
    },
    "code": "int x = 5;",
    "explanation": {
      "zh-CN": "分号表示语句结束。Java/JS/C 等必须加分号。",
      "ja-JP": "セミコロンは文の終わりを示します。Java/JS/C で必須。",
      "en-US": "A semicolon marks the end of a statement in Java, JavaScript, C, and similar languages."
    },
    "focus": [
      "分号位置",
      "语句结尾"
    ],
    "hint": {
      "zh-CN": "分号在语句末尾，不要在行首。",
      "ja-JP": "セミコロンは文の末尾に置き、行頭には置きません。",
      "en-US": "Every complete statement ends with a semicolon."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 6,
    "source": "builtin"
  },
  {
    "id": "sym-semicolon-002",
    "language": "symbol",
    "level": 2,
    "category": "semicolon",
    "title": {
      "zh-CN": "分号 for 循环",
      "ja-JP": "セミコロン for ループ",
      "en-US": "Semicolons in for loops"
    },
    "code": "for (int i = 0; i < 10; i++) {",
    "explanation": {
      "zh-CN": "for 循环括号内用两个分号分隔三部分。",
      "ja-JP": "for ループ括弧内では2つのセミコロンで3つの部分を区切ります。",
      "en-US": "In a for loop, two semicolons separate the three parts inside the parentheses."
    },
    "focus": [
      "分号分隔三部分",
      "for 语法"
    ],
    "hint": {
      "zh-CN": "for 括号内有两个分号。第三段后面没有分号。",
      "ja-JP": "for 括弧内には2つのセミコロン。3つ目はセミコロン不要。",
      "en-US": "The three parts are: initialization; condition; update."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sym-quotes-001",
    "language": "symbol",
    "level": 1,
    "category": "quotes",
    "title": {
      "zh-CN": "双引号",
      "ja-JP": "二重引用符",
      "en-US": "Double quotes"
    },
    "code": "str = \"Hello, world!\"",
    "explanation": {
      "zh-CN": "双引号包裹字符串。成对使用。",
      "ja-JP": "二重引用符は文字列リテラルを囲みます。ペアで使用。",
      "en-US": "Double quotes enclose strings in most programming languages."
    },
    "focus": [
      "左双引号",
      "右双引号"
    ],
    "hint": {
      "zh-CN": "双引号成对输入。字符串内容写在引号之间。",
      "ja-JP": "二重引用符はペアで入力します。文字列の内容を引用符の間に。",
      "en-US": "Always use matching pairs of double quotes."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "sym-quotes-002",
    "language": "symbol",
    "level": 1,
    "category": "quotes",
    "title": {
      "zh-CN": "单引号",
      "ja-JP": "一重引用符",
      "en-US": "Single quotes"
    },
    "code": "grade = 'A'",
    "explanation": {
      "zh-CN": "单引号在 SQL 中用于字符串，Python 中与双引号等价。",
      "ja-JP": "一重引用符は SQL で文字列に使います。Python では二重引用符と同等。",
      "en-US": "Single quotes are used for strings in SQL, and are interchangeable with double quotes in Python."
    },
    "focus": [
      "左单引号",
      "右单引号"
    ],
    "hint": {
      "zh-CN": "注意单引号不要打成了反引号。",
      "ja-JP": "一重引用符をバッククォートと間違えないように注意。",
      "en-US": "Be consistent—do not mix single and double quotes in the same project."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 6,
    "source": "builtin"
  },
  {
    "id": "sym-equals-001",
    "language": "symbol",
    "level": 2,
    "category": "equals",
    "title": {
      "zh-CN": "相等 == 和 赋值 =",
      "ja-JP": "等価 == と 代入 =",
      "en-US": "Equality vs assignment"
    },
    "code": "if (x == 5) {",
    "explanation": {
      "zh-CN": "== 是比较是否相等。= 是赋值。初学者最容易混淆。",
      "ja-JP": "== は比較演算子、= は代入演算子。初心者が混同しやすい。",
      "en-US": "== checks for equality. = is for assignment. Beginners often confuse these."
    },
    "focus": [
      "双等号 ==",
      "条件判断"
    ],
    "hint": {
      "zh-CN": "判断相等要用 ==，不是 =。",
      "ja-JP": "等しいかどうかの判断には == を使います。",
      "en-US": "Read == as 'is equal to' and = as 'gets the value of'."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "sym-equals-002",
    "language": "symbol",
    "level": 2,
    "category": "equals",
    "title": {
      "zh-CN": "不等于 !=",
      "ja-JP": "不等価 !=",
      "en-US": "Not equal !="
    },
    "code": "if (status != \"pending\") {",
    "explanation": {
      "zh-CN": "!= 比较两个值是否不相等。",
      "ja-JP": "!= は2つの値が等しくないかを比較します。",
      "en-US": "!= checks if two values are not equal."
    },
    "focus": [
      "感叹号在前",
      "等号在后"
    ],
    "hint": {
      "zh-CN": "!= 先写感叹号再写等号，中间不留空格。",
      "ja-JP": "!= は先に感嘆符、次に等号。間にスペースを入れません。",
      "en-US": "!= is the opposite of ==—it is true when values differ."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "sym-logical-001",
    "language": "symbol",
    "level": 2,
    "category": "logical",
    "title": {
      "zh-CN": "逻辑与 &&",
      "ja-JP": "論理積 &&",
      "en-US": "Logical AND &&"
    },
    "code": "if (x > 0 && y < 10) {",
    "explanation": {
      "zh-CN": "&& 逻辑与，两个条件都为真时结果才为真。",
      "ja-JP": "&& は論理積、両方の条件が真の場合のみ結果が真。",
      "en-US": "&& is logical AND—both conditions must be true for the result to be true."
    },
    "focus": [
      "两个 & 号",
      "左右条件各完整"
    ],
    "hint": {
      "zh-CN": "&& 是两个连续的 & 符号。",
      "ja-JP": "&& は & 記号を2つ続けます。",
      "en-US": "Use && when you need every condition to hold."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "sym-logical-002",
    "language": "symbol",
    "level": 2,
    "category": "logical",
    "title": {
      "zh-CN": "逻辑或 ||",
      "ja-JP": "論理和 ||",
      "en-US": "Logical OR ||"
    },
    "code": "if (age < 18 || age >= 65) {",
    "explanation": {
      "zh-CN": "|| 逻辑或，任意一个条件为真结果就为真。",
      "ja-JP": "|| は論理和、どちらかの条件が真であれば結果は真。",
      "en-US": "|| is logical OR—the result is true if at least one condition is true."
    },
    "focus": [
      "两个竖线 ||"
    ],
    "hint": {
      "zh-CN": "|| 是两个连续的竖线符号。",
      "ja-JP": "|| は縦棒を2つ続けます。",
      "en-US": "Use || when any single condition is enough."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "sym-indent-001",
    "language": "symbol",
    "level": 2,
    "category": "indent",
    "title": {
      "zh-CN": "Python 缩进",
      "ja-JP": "Python インデント",
      "en-US": "Python indentation"
    },
    "code": "def hello():\n    print(\"Hello\")\n    print(\"World\")",
    "explanation": {
      "zh-CN": "Python 用缩进表示代码块。同一代码块缩进量一致。",
      "ja-JP": "Python はインデントでコードブロックを表現します。",
      "en-US": "Python uses indentation to define code blocks. All lines in the same block must align."
    },
    "focus": [
      "4个空格缩进",
      "对齐一致性"
    ],
    "hint": {
      "zh-CN": "Python 中同一代码块内的缩进必须一致。",
      "ja-JP": "Python では同じブロック内のインデントは統一する必要があります。",
      "en-US": "The standard indentation is 4 spaces (not tabs)."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sym-indent-002",
    "language": "symbol",
    "level": 3,
    "category": "indent",
    "title": {
      "zh-CN": "缩进保持对齐",
      "ja-JP": "インデントの整合性",
      "en-US": "Consistent indentation"
    },
    "code": "if x > 0:\n    if x % 2 == 0:\n        print(\"Even\")\n    else:\n        print(\"Odd\")",
    "explanation": {
      "zh-CN": "嵌套结构中的缩进需要逐层增加。",
      "ja-JP": "ネスト構造ではインデントを階層ごとに増やします。",
      "en-US": "Nested structures need deeper indentation at each level."
    },
    "focus": [
      "逐层缩进",
      "else 对齐 if"
    ],
    "hint": {
      "zh-CN": "每嵌套一层多缩进 4 个空格。",
      "ja-JP": "1階層ネストごとに4スペース多くインデント。",
      "en-US": "Each nesting level adds another 4 spaces of indentation."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 20,
    "source": "builtin"
  },
  {
    "id": "sym-comment-001",
    "language": "symbol",
    "level": 1,
    "category": "comment",
    "title": {
      "zh-CN": "注释符号 //",
      "ja-JP": "コメント記号 //",
      "en-US": "Comment symbol //"
    },
    "code": "// This is a comment",
    "explanation": {
      "zh-CN": "// 是单行注释（Java/C/C++/JS/Go）。",
      "ja-JP": "// は単行コメント（Java/C/C++/JS/Go）。",
      "en-US": "// starts a single-line comment in Java, C, C++, JavaScript, and Go."
    },
    "focus": [
      "// 注释符号",
      "注释内容"
    ],
    "hint": {
      "zh-CN": "// 后的所有内容都是注释，直到行尾。",
      "ja-JP": "// の後ろから行末まですべてコメント。",
      "en-US": "Everything after // on the same line is ignored by the compiler."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 6,
    "source": "builtin"
  },
  {
    "id": "sym-dot-001",
    "language": "symbol",
    "level": 1,
    "category": "dot",
    "title": {
      "zh-CN": "点操作符 .",
      "ja-JP": "ドット演算子 .",
      "en-US": "Dot operator"
    },
    "code": "System.out.println(\"Hello\");",
    "explanation": {
      "zh-CN": "点操作符访问对象的成员（方法或属性）。",
      "ja-JP": "ドット演算子はオブジェクトのメンバーにアクセスします。",
      "en-US": "The dot operator accesses members (methods or properties) of an object."
    },
    "focus": [
      "点分隔",
      "链式调用"
    ],
    "hint": {
      "zh-CN": "点符号连接对象和成员，从左到右访问。",
      "ja-JP": "ドット記号でオブジェクトとメンバーを接続。左から右へ。",
      "en-US": "Write object.member to call a method or access a property."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "sym-comma-001",
    "language": "symbol",
    "level": 1,
    "category": "dot",
    "title": {
      "zh-CN": "逗号 ,",
      "ja-JP": "カンマ ,",
      "en-US": "Comma separator"
    },
    "code": "print(\"x =\", x, \"y =\", y)",
    "explanation": {
      "zh-CN": "逗号分隔函数参数、列表元素等。",
      "ja-JP": "カンマは関数の引数、リスト要素などを区切ります。",
      "en-US": "Commas separate function arguments, list elements, and more."
    },
    "focus": [
      "逗号分隔",
      "不用于行尾"
    ],
    "hint": {
      "zh-CN": "逗号放在元素之间，最后一个后面不加逗号。",
      "ja-JP": "カンマは要素間に置き、最後の後ろには付けません。",
      "en-US": "Put a comma between each item, but not after the last one."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "sym-arrow-001",
    "language": "symbol",
    "category": "arrow",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 30,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "箭头函数",
      "ja-JP": "アロー関数",
      "en-US": "Arrow function"
    },
    "explanation": {
      "zh-CN": "箭头符号 => 用于箭头函数",
      "ja-JP": "アロー関数の => 記号",
      "en-US": "Arrow symbol => for arrow functions"
    },
    "hint": {
      "zh-CN": "const fn = () => {}",
      "ja-JP": "const fn = () => {}",
      "en-US": "const fn = () => {}"
    },
    "focus": [
      "=>",
      "arrow",
      "function"
    ],
    "code": "const add = (a, b) => a + b;"
  },
  {
    "id": "sym-arrow-002",
    "language": "symbol",
    "category": "arrow",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 30,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "箭头函数简写",
      "ja-JP": "アロー関数省略形",
      "en-US": "Arrow function shorthand"
    },
    "explanation": {
      "zh-CN": "单参数可省略括号",
      "ja-JP": "引数1つなら括弧省略可",
      "en-US": "Single parameter can omit parentheses"
    },
    "hint": {
      "zh-CN": "const double = x => x * 2",
      "ja-JP": "const double = x => x * 2",
      "en-US": "const double = x => x * 2"
    },
    "focus": [
      "=>",
      "arrow",
      "shorthand"
    ],
    "code": "const double = x => x * 2;"
  },
  {
    "id": "sym-regex-001",
    "language": "symbol",
    "category": "regex",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 60,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "正则表达式",
      "ja-JP": "正規表現",
      "en-US": "Regular expression"
    },
    "explanation": {
      "zh-CN": "/pattern/ 正则表达式符号",
      "ja-JP": "/パターン/ 正規表現記号",
      "en-US": "/pattern/ regular expression syntax"
    },
    "hint": {
      "zh-CN": "/^[A-Z]+$/i",
      "ja-JP": "/^[A-Z]+$/i",
      "en-US": "/^[A-Z]+$/i"
    },
    "focus": [
      "/",
      "regex",
      "pattern",
      "flags"
    ],
    "code": "const emailRegex = /^[\\w.-]+@[\\w.-]+\\.\\w+$/;"
  },
  {
    "id": "sym-json-001",
    "language": "symbol",
    "category": "json",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 30,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "JSON 语法",
      "ja-JP": "JSON 構文",
      "en-US": "JSON syntax"
    },
    "explanation": {
      "zh-CN": "JSON 键值对和数组表示法",
      "ja-JP": "JSONのキー値ペアと配列表記",
      "en-US": "JSON key-value pairs and array notation"
    },
    "hint": {
      "zh-CN": "{\"name\": \"value\", \"items\": []}",
      "ja-JP": "{\"name\": \"value\", \"items\": []}",
      "en-US": "{\"name\": \"value\", \"items\": []}"
    },
    "focus": [
      "\"",
      "",
      "[]",
      "JSON"
    ],
    "code": "{\"name\": \"Alice\", \"age\": 25, \"skills\": [\"JS\", \"SQL\"]}"
  },
  {
    "id": "sym-template-001",
    "language": "symbol",
    "category": "template",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 30,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "模板字符串",
      "ja-JP": "テンプレート文字列",
      "en-US": "Template literal"
    },
    "explanation": {
      "zh-CN": "反引号 ` 和 ${} 模板插值",
      "ja-JP": "バッククォート`と${}テンプレート補間",
      "en-US": "Backtick ` and ${} template interpolation"
    },
    "hint": {
      "zh-CN": "`Hello, ${name}!`",
      "ja-JP": "`Hello, ${name}!`",
      "en-US": "`Hello, ${name}!`"
    },
    "focus": [
      "`",
      "${}",
      "template",
      "string"
    ],
    "code": "const message = `Hello, ${user}! Welcome to ${site}.`;"
  }
];
