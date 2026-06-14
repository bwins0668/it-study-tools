// Coding Typing Practice - undefined
window.CODING_TYPING_DATA_JAVA = [
  {
    "id": "java-class-001",
    "language": "java",
    "level": 1,
    "category": "class",
    "title": {
      "zh-CN": "public class 声明",
      "ja-JP": "public class 宣言",
      "en-US": "Public class declaration"
    },
    "code": "public class Main {\n    \n}",
    "explanation": {
      "zh-CN": "Java 程序由类组成。类名必须与文件名一致。",
      "ja-JP": "Java プログラムはクラスで構成されます。クラス名はファイル名と一致させる必要があります。",
      "en-US": "A Java program is made up of classes. The class name must match the file name."
    },
    "focus": [
      "public class 关键字",
      "类名首字母大写",
      "花括号匹配"
    ],
    "hint": {
      "zh-CN": "类名用大驼峰命名法（首字母大写）。",
      "ja-JP": "クラス名はアッパーキャメルケース（先頭大文字）です。",
      "en-US": "Save this file as Main.java (class name + .java extension)."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "java-main-001",
    "language": "java",
    "level": 1,
    "category": "main",
    "title": {
      "zh-CN": "main 方法声明",
      "ja-JP": "main メソッド宣言",
      "en-US": "Main method declaration"
    },
    "code": "public static void main(String[] args) {\n    \n}",
    "explanation": {
      "zh-CN": "main 是 Java 程序的入口方法。",
      "ja-JP": "main は Java プログラムのエントリーポイントメソッドです。",
      "en-US": "The main method is the entry point of every Java application."
    },
    "focus": [
      "public static void 顺序",
      "String[] args",
      "花括号"
    ],
    "hint": {
      "zh-CN": "记住固定写法：public static void main(String[] args)。",
      "ja-JP": "固定の書き方を覚えましょう。",
      "en-US": "The signature must be exactly: public static void main(String[] args)."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "java-main-002",
    "language": "java",
    "level": 2,
    "category": "main",
    "title": {
      "zh-CN": "完整类和 main 方法",
      "ja-JP": "完全なクラスと main",
      "en-US": "Full class with main"
    },
    "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello\");\n    }\n}",
    "explanation": {
      "zh-CN": "这是 Java 程序最基础的结构。",
      "ja-JP": "これは Java プログラムの最も基本的な構造です。",
      "en-US": "This is the most basic structure of a Java program—a class wrapping a main method."
    },
    "focus": [
      "类和方法嵌套",
      "花括号多层",
      "分号"
    ],
    "hint": {
      "zh-CN": "注意花括号的配对。每层缩进 4 个空格。",
      "ja-JP": "波括弧の対応に注意。各階層は 4 スペースでインデントします。",
      "en-US": "Every executable Java program needs both a class and a main method."
    },
    "sandboxRunnable": true,
    "expectedOutput": "Hello",
    "difficulty": 2,
    "estimatedTime": 20,
    "source": "builtin"
  },
  {
    "id": "java-println-001",
    "language": "java",
    "level": 1,
    "category": "println",
    "title": {
      "zh-CN": "System.out.println 输出",
      "ja-JP": "System.out.println 出力",
      "en-US": "System.out.println output"
    },
    "code": "System.out.println(\"Hello, world!\");",
    "explanation": {
      "zh-CN": "println 是最常用的输出语句，注意分号结尾。",
      "ja-JP": "println は最もよく使われる出力文です。セミコロンで終わります。",
      "en-US": "println is the most common output statement. Note the semicolon at the end."
    },
    "focus": [
      "System 大写 S",
      "out.println 点链",
      "字符串双引号",
      "分号"
    ],
    "hint": {
      "zh-CN": "System 的 S 大写，out.println 全部小写。",
      "ja-JP": "System の S は大文字、out.println はすべて小文字です。",
      "en-US": "Every statement in Java ends with a semicolon."
    },
    "sandboxRunnable": true,
    "expectedOutput": "Hello, world!",
    "difficulty": 1,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "java-println-002",
    "language": "java",
    "level": 2,
    "category": "println",
    "title": {
      "zh-CN": "输出变量",
      "ja-JP": "変数出力",
      "en-US": "Print a variable"
    },
    "code": "int x = 5;\nSystem.out.println(x);",
    "explanation": {
      "zh-CN": "先声明变量再输出。输出变量不需要引号。",
      "ja-JP": "最初に変数を宣言してから出力します。変数出力時は引用符は不要です。",
      "en-US": "Declare a variable first, then output it. Variables do not need quotes in println."
    },
    "focus": [
      "变量声明 int",
      "变量不加引号",
      "分号"
    ],
    "hint": {
      "zh-CN": "变量前面要写类型。输出变量名不加引号。",
      "ja-JP": "変数名の前に型を書きます。変数を出力するときは引用符を付けません。",
      "en-US": "To print a variable, write its name directly inside println()."
    },
    "sandboxRunnable": true,
    "expectedOutput": "5",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "java-println-003",
    "language": "java",
    "level": 2,
    "category": "println",
    "title": {
      "zh-CN": "字符串拼接输出",
      "ja-JP": "文字列連結出力",
      "en-US": "String concatenation"
    },
    "code": "System.out.println(\"Sum: \" + (3 + 4));",
    "explanation": {
      "zh-CN": "+ 运算符可以拼接字符串和数字。",
      "ja-JP": "+ 演算子で文字列と数値を連結できます。",
      "en-US": "The + operator can concatenate (join) strings and numbers."
    },
    "focus": [
      "+ 拼接",
      "括号优先级"
    ],
    "hint": {
      "zh-CN": "字符串用引号，数字不用。运算部分用括号。",
      "ja-JP": "文字列は引用符、数値はそのままです。",
      "en-US": "String concatenation with + works between any types."
    },
    "sandboxRunnable": true,
    "expectedOutput": "Sum: 7",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "java-variable-001",
    "language": "java",
    "level": 1,
    "category": "variable",
    "title": {
      "zh-CN": "整数变量声明",
      "ja-JP": "整数変数宣言",
      "en-US": "Integer variable"
    },
    "code": "int age = 25;",
    "explanation": {
      "zh-CN": "Java 声明变量时必须指定类型。int 表示整数。",
      "ja-JP": "Java の変数宣言時には型を指定する必要があります。int は整数型です。",
      "en-US": "In Java, you must declare the type of every variable. int stands for integer."
    },
    "focus": [
      "类型在前",
      "变量名",
      "分号"
    ],
    "hint": {
      "zh-CN": "先写类型 int，再写变量名，再写 = 值。",
      "ja-JP": "最初に型 int、次に変数名、次に = 値です。",
      "en-US": "Write the type before the variable name: int age = 25;"
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "java-variable-002",
    "language": "java",
    "level": 1,
    "category": "variable",
    "title": {
      "zh-CN": "字符串变量声明",
      "ja-JP": "文字列変数宣言",
      "en-US": "String variable"
    },
    "code": "String name = \"Alice\";",
    "explanation": {
      "zh-CN": "String 首字母大写。字符串值用双引号包裹。",
      "ja-JP": "String の先頭は大文字です。文字列の値は二重引用符で囲みます。",
      "en-US": "String starts with a capital letter. String values must be enclosed in double quotes."
    },
    "focus": [
      "String 大写 S",
      "双引号值",
      "分号"
    ],
    "hint": {
      "zh-CN": "String 的 S 要大写，这是类名。",
      "ja-JP": "String の S は大文字です。クラス名なので大文字です。",
      "en-US": "String is a class, not a primitive type—hence the capital S."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "java-variable-003",
    "language": "java",
    "level": 1,
    "category": "variable",
    "title": {
      "zh-CN": "浮点数变量",
      "ja-JP": "浮動小数点変数",
      "en-US": "Floating-point variable"
    },
    "code": "double pi = 3.14159;",
    "explanation": {
      "zh-CN": "double 是双精度浮点数类型。",
      "ja-JP": "double は倍精度浮動小数点型です。",
      "en-US": "double is the type for double-precision floating-point numbers."
    },
    "focus": [
      "double 类型",
      "小数点",
      "精度"
    ],
    "hint": {
      "zh-CN": "浮点数直接写小数点，不要用逗号。",
      "ja-JP": "浮動小数点数は小数点を直接書き、カンマは使いません。",
      "en-US": "Use double for decimal numbers. The decimal separator is a dot."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "java-if-001",
    "language": "java",
    "level": 2,
    "category": "if",
    "title": {
      "zh-CN": "Java if 语句",
      "ja-JP": "Java if 文",
      "en-US": "Java if statement"
    },
    "code": "if (x > 0) {\n    System.out.println(\"Positive\");\n}",
    "explanation": {
      "zh-CN": "if 条件必须放在括号内。",
      "ja-JP": "if の条件は括弧内に置きます。",
      "en-US": "The if condition must be placed inside parentheses."
    },
    "focus": [
      "条件括号 ()",
      "花括号 {}",
      "语句分号"
    ],
    "hint": {
      "zh-CN": "if 后面紧跟括号，括号后是花括号。",
      "ja-JP": "if の直後に括弧、括弧の後に波括弧です。",
      "en-US": "Put the condition in parentheses and the body in curly braces."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "java-if-002",
    "language": "java",
    "level": 2,
    "category": "if",
    "title": {
      "zh-CN": "Java if/else 语句",
      "ja-JP": "Java if/else 文",
      "en-US": "Java if/else"
    },
    "code": "if (x >= 0) {\n    System.out.println(\"Non-negative\");\n} else {\n    System.out.println(\"Negative\");\n}",
    "explanation": {
      "zh-CN": "else 与 if 的右花括号在同一行。",
      "ja-JP": "else は if の閉じ波括弧と同じ行に置きます。",
      "en-US": "else goes on the same line as the closing brace of the if block."
    },
    "focus": [
      "else 位置",
      "花括号匹配",
      "缩进"
    ],
    "hint": {
      "zh-CN": "else 写在 if 右花括号之后、同一行。",
      "ja-JP": "else は if の閉じ波括弧の後、同じ行に書きます。",
      "en-US": "Write } else { on one line, without line breaks."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 18,
    "source": "builtin"
  },
  {
    "id": "java-if-003",
    "language": "java",
    "level": 3,
    "category": "if",
    "title": {
      "zh-CN": "Java if/else if/else",
      "ja-JP": "Java else if 連鎖",
      "en-US": "Java else if chain"
    },
    "code": "if (score >= 90) {\n    grade = \"A\";\n} else if (score >= 60) {\n    grade = \"B\";\n} else {\n    grade = \"C\";\n}",
    "explanation": {
      "zh-CN": "Java 使用 else if 实现多条件判断。",
      "ja-JP": "Java では else if で複数条件の判断を実現します。",
      "en-US": "Java uses else if for multi-condition branching."
    },
    "focus": [
      "else if 空格",
      "逐级条件",
      "花括号包裹"
    ],
    "hint": {
      "zh-CN": "else 和 if 之间有一个空格。不要写成 elseif。",
      "ja-JP": "else と if の間にはスペースが1つあります。",
      "en-US": "else if is written as two separate words."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 20,
    "source": "builtin"
  },
  {
    "id": "java-for-001",
    "language": "java",
    "level": 2,
    "category": "for",
    "title": {
      "zh-CN": "Java for 循环",
      "ja-JP": "Java for ループ",
      "en-US": "Java for loop"
    },
    "code": "for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}",
    "explanation": {
      "zh-CN": "for 循环有三部分：初始化、条件、更新。",
      "ja-JP": "for ループには三つの部分があります：初期化、条件、更新。",
      "en-US": "A for loop has three parts: initialization, condition, and update."
    },
    "focus": [
      "for 括号语法",
      "分号分隔三部分",
      "i++ 增量"
    ],
    "hint": {
      "zh-CN": "for 括号内用两个分号分成三段。",
      "ja-JP": "for 括弧内は2つのセミコロンで3つの部分に分けます。",
      "en-US": "Separate the three parts with semicolons inside the parentheses."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 18,
    "source": "builtin"
  },
  {
    "id": "java-for-002",
    "language": "java",
    "level": 3,
    "category": "for",
    "title": {
      "zh-CN": "增强 for 循环",
      "ja-JP": "拡張 for ループ",
      "en-US": "Enhanced for loop"
    },
    "code": "for (int num : numbers) {\n    System.out.println(num);\n}",
    "explanation": {
      "zh-CN": "增强 for 循环遍历数组或集合。",
      "ja-JP": "拡張 for ループは配列やコレクションの走査に使います。",
      "en-US": "The enhanced for loop iterates over an array or collection."
    },
    "focus": [
      "冒号 : 写法",
      "类型与变量"
    ],
    "hint": {
      "zh-CN": "冒号前面写元素类型和变量名。",
      "ja-JP": "コロンの前に要素の型と変数名を書きます。",
      "en-US": "Declare the element type and a variable name, then a colon and the collection."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "java-for-003",
    "language": "java",
    "level": 3,
    "category": "for",
    "title": {
      "zh-CN": "嵌套 for 循环",
      "ja-JP": "ネスト for ループ",
      "en-US": "Nested for loops"
    },
    "code": "for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
    "explanation": {
      "zh-CN": "for 内部可以嵌套另一个 for 循环。",
      "ja-JP": "for ループの中に別の for ループをネストできます。",
      "en-US": "For loops can be nested—one loop inside another."
    },
    "focus": [
      "内外层变量不同",
      "缩进层次"
    ],
    "hint": {
      "zh-CN": "内层循环变量名不要和外层重复。",
      "ja-JP": "内側のループ変数名は外側と重複させないでください。",
      "en-US": "Use different loop variable names for inner and outer loops."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 25,
    "source": "builtin"
  },
  {
    "id": "java-while-001",
    "language": "java",
    "level": 2,
    "category": "while",
    "title": {
      "zh-CN": "Java while 循环",
      "ja-JP": "Java while ループ",
      "en-US": "Java while loop"
    },
    "code": "while (count < 5) {\n    System.out.println(count);\n    count++;\n}",
    "explanation": {
      "zh-CN": "while 循环在条件为真时重复执行。",
      "ja-JP": "while ループは条件が真の間繰り返し実行されます。",
      "en-US": "A while loop repeats as long as its condition is true."
    },
    "focus": [
      "条件括号",
      "count++ 更新"
    ],
    "hint": {
      "zh-CN": "while 括号内写条件。循环体内要更新变量。",
      "ja-JP": "while の括弧内に条件を書きます。ループ内で変数を更新します。",
      "en-US": "Put the condition in parentheses; update the variable inside the loop body."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "java-while-002",
    "language": "java",
    "level": 3,
    "category": "while",
    "title": {
      "zh-CN": "do/while 循环",
      "ja-JP": "do/while ループ",
      "en-US": "Do/while loop"
    },
    "code": "do {\n    System.out.println(n);\n    n--;\n} while (n > 0);",
    "explanation": {
      "zh-CN": "do/while 先执行一次再判断条件。",
      "ja-JP": "do/while は最初に実行してから条件を判断します。",
      "en-US": "do/while executes the body once before checking the condition."
    },
    "focus": [
      "do 关键字",
      "while 在最后",
      "分号结尾"
    ],
    "hint": {
      "zh-CN": "do 后直接跟花括号，while 写在花括号后分号前。",
      "ja-JP": "do の直後に波括弧、波括弧の後に while を書き、最後にセミコロン。",
      "en-US": "The body runs at least once regardless of the condition."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 18,
    "source": "builtin"
  },
  {
    "id": "java-scanner-001",
    "language": "java",
    "level": 2,
    "category": "scanner",
    "title": {
      "zh-CN": "Scanner 输入",
      "ja-JP": "Scanner 入力",
      "en-US": "Scanner input"
    },
    "code": "Scanner sc = new Scanner(System.in);\nint n = sc.nextInt();",
    "explanation": {
      "zh-CN": "Scanner 用于读取用户输入。记得导入 java.util.Scanner。",
      "ja-JP": "Scanner はユーザー入力の読み取りに使います。java.util.Scanner のインポートを忘れずに。",
      "en-US": "Scanner reads user input. Remember to import java.util.Scanner."
    },
    "focus": [
      "new Scanner()",
      "System.in 参数",
      "nextInt() 方法"
    ],
    "hint": {
      "zh-CN": "Scanner 的 S 大写。new 关键字创建对象。",
      "ja-JP": "Scanner の S は大文字です。new キーワードでオブジェクトを作成します。",
      "en-US": "Add import java.util.Scanner; at the top of your file."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 18,
    "source": "builtin"
  },
  {
    "id": "java-comment-001",
    "language": "java",
    "level": 1,
    "category": "comment",
    "title": {
      "zh-CN": "Java 注释",
      "ja-JP": "Java コメント",
      "en-US": "Java comments"
    },
    "code": "// Single-line comment\n/* Block comment */\n/** Javadoc */",
    "explanation": {
      "zh-CN": "Java 有三种注释：//、/* */、/** */。",
      "ja-JP": "Java には三種類のコメントがあります：//、/* */、/** */。",
      "en-US": "Java has three comment styles: single-line //, block /* * /, and Javadoc /** */."
    },
    "focus": [
      "// 单行",
      "/* */ 多行",
      "/** */ 文档"
    ],
    "hint": {
      "zh-CN": "单行注释用 //，多行注释用 /* */。",
      "ja-JP": "単行コメントは //、複数行コメントは /* */ です。",
      "en-US": "Use // for short notes and /** */ for documentation comments."
    },
    "sandboxRunnable": false,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "java-string-001",
    "language": "java",
    "level": 2,
    "category": "string",
    "title": {
      "zh-CN": "String 比较",
      "ja-JP": "String 比較",
      "en-US": "String comparison"
    },
    "code": "if (name.equals(\"Alice\")) {\n    System.out.println(\"Hello Alice\");\n}",
    "explanation": {
      "zh-CN": "String 比较不能用 ==，要用 equals 方法。",
      "ja-JP": "String の比較は == ではなく equals メソッドを使います。",
      "en-US": "Strings must be compared with .equals(), not ==."
    },
    "focus": [
      "equals 方法",
      "点调用",
      "if 条件"
    ],
    "hint": {
      "zh-CN": "字符串比较用 equals，不是 ==。== 比较的是引用。",
      "ja-JP": "文字列比較は equals を使います。== は参照を比較します。",
      "en-US": "== compares references, while .equals() compares actual content."
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 18,
    "source": "builtin"
  },
  {
    "id": "java-array-001",
    "language": "java",
    "category": "array",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 90,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "数组声明初始化",
      "ja-JP": "配列宣言初期化",
      "en-US": "Array init"
    },
    "explanation": {
      "zh-CN": "声明和初始化一维数组",
      "ja-JP": "一次元配列の宣言と初期化",
      "en-US": "Declare and init 1D array"
    },
    "hint": {
      "zh-CN": "int[] nums = {1,2,3};",
      "ja-JP": "int[] nums = {1,2,3};",
      "en-US": "int[] nums = {1,2,3};"
    },
    "focus": [
      "int[]",
      "array",
      "{}"
    ],
    "code": "int[] nums = {10,20,30,40,50};\nSystem.out.println(nums[0]);\nSystem.out.println(nums.length);"
  },
  {
    "id": "java-array-002",
    "language": "java",
    "category": "array",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 90,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "数组遍历",
      "ja-JP": "配列走査",
      "en-US": "Array loop"
    },
    "explanation": {
      "zh-CN": "for循环遍历数组",
      "ja-JP": "forループで配列走査",
      "en-US": "Traverse array with for"
    },
    "hint": {
      "zh-CN": "for(int i=0; i<arr.length; i++)",
      "ja-JP": "for(int i=0; i<arr.length; i++)",
      "en-US": "for(int i=0; i<arr.length; i++)"
    },
    "focus": [
      "for",
      "array",
      "length"
    ],
    "code": "int[] sc = {85,90,78,92};\nint sum=0;\nfor(int i=0;i<sc.length;i++){sum+=sc[i];}\nSystem.out.println(\"Sum: \"+sum);"
  },
  {
    "id": "java-array-003",
    "language": "java",
    "category": "array",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 120,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "增强 for 循环",
      "ja-JP": "拡張forループ",
      "en-US": "Enhanced for"
    },
    "explanation": {
      "zh-CN": "增强for循环遍历数组",
      "ja-JP": "拡張forループで配列走査",
      "en-US": "Enhanced for-each loop"
    },
    "hint": {
      "zh-CN": "for(int n : numbers)",
      "ja-JP": "for(int n : numbers)",
      "en-US": "for(int n : numbers)"
    },
    "focus": [
      "for",
      ":",
      "array"
    ],
    "code": "int[] vals = {2,4,6,8,10};\nfor(int v : vals){\n    System.out.println(v*v);\n}"
  },
  {
    "id": "java-switch-001",
    "language": "java",
    "category": "switch",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 90,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "switch 分支",
      "ja-JP": "switch 分岐",
      "en-US": "Switch branch"
    },
    "explanation": {
      "zh-CN": "switch根据值分支",
      "ja-JP": "switchで値に応じた分岐",
      "en-US": "Branch by value with switch"
    },
    "hint": {
      "zh-CN": "switch(day){case 1:...break;}",
      "ja-JP": "switch(day){case 1:...break;}",
      "en-US": "switch(day){case 1:...break;}"
    },
    "focus": [
      "switch",
      "case",
      "break",
      "default"
    ],
    "code": "int d=3; String name;\nswitch(d){\n    case 1: name=\"Mon\"; break;\n    case 2: name=\"Tue\"; break;\n    case 3: name=\"Wed\"; break;\n    default: name=\"?\";\n}\nSystem.out.println(name);"
  },
  {
    "id": "java-switch-002",
    "language": "java",
    "category": "switch",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 90,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "switch 多值",
      "ja-JP": "switch 複数値",
      "en-US": "Multi-case switch"
    },
    "explanation": {
      "zh-CN": "多个case共享逻辑",
      "ja-JP": "複数caseで同じ処理",
      "en-US": "Multiple cases share logic"
    },
    "hint": {
      "zh-CN": "case 'A': case 'B':",
      "ja-JP": "case 'A': case 'B':",
      "en-US": "case 'A': case 'B':"
    },
    "focus": [
      "switch",
      "case",
      "break"
    ],
    "code": "char g='B';\nswitch(g){\n    case 'A': case 'B':\n        System.out.println(\"Pass\"); break;\n    case 'F':\n        System.out.println(\"Fail\");\n}"
  },
  {
    "id": "java-switch-003",
    "language": "java",
    "category": "switch",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 120,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "switch 字符串",
      "ja-JP": "switch 文字列",
      "en-US": "Switch string"
    },
    "explanation": {
      "zh-CN": "switch匹配字符串",
      "ja-JP": "switchで文字列一致",
      "en-US": "Switch with string matching"
    },
    "hint": {
      "zh-CN": "switch(cmd.toLowerCase())",
      "ja-JP": "switch(cmd.toLowerCase())",
      "en-US": "switch(cmd.toLowerCase())"
    },
    "focus": [
      "switch",
      "String",
      "toLowerCase"
    ],
    "code": "String cmd=\"start\";\nswitch(cmd.toLowerCase()){\n    case \"start\": System.out.println(\"Start\"); break;\n    case \"stop\": System.out.println(\"Stop\"); break;\n    default: System.out.println(\"?\");\n}"
  },
  {
    "id": "java-trycatch-001",
    "language": "java",
    "category": "try_catch",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 120,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "try-catch",
      "ja-JP": "try-catch",
      "en-US": "Try-catch"
    },
    "explanation": {
      "zh-CN": "try-catch捕获数组越界",
      "ja-JP": "try-catchで配列範囲外をキャッチ",
      "en-US": "Catch array index exception"
    },
    "hint": {
      "zh-CN": "try{...}catch(ArrayIndexOutOfBoundsException e){...}",
      "ja-JP": "try{...}catch(ArrayIndexOutOfBoundsException e){...}",
      "en-US": "try{...}catch(ArrayIndexOutOfBoundsException e){...}"
    },
    "focus": [
      "try",
      "catch",
      "Exception"
    ],
    "code": "try{\n    int[] n={1,2,3};\n    System.out.println(n[5]);\n}catch(ArrayIndexOutOfBoundsException e){\n    System.out.println(\"Out!\");\n}"
  },
  {
    "id": "java-trycatch-002",
    "language": "java",
    "category": "try_catch",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 120,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "多异常捕获",
      "ja-JP": "複数例外キャッチ",
      "en-US": "Multi-catch"
    },
    "explanation": {
      "zh-CN": "捕获不同类型的异常",
      "ja-JP": "異なる例外タイプをキャッチ",
      "en-US": "Catch different exception types"
    },
    "hint": {
      "zh-CN": "catch(NullPointerException|ArithmeticException e)",
      "ja-JP": "catch(NullPointerException|ArithmeticException e)",
      "en-US": "catch(NullPointerException|ArithmeticException e)"
    },
    "focus": [
      "try",
      "catch",
      "|"
    ],
    "code": "try{\n    String s=null;\n    System.out.println(s.length());\n    int r=10/0;\n}catch(NullPointerException e){\n    System.out.println(\"Null!\");\n}catch(ArithmeticException e){\n    System.out.println(\"Math!\");\n}"
  },
  {
    "id": "java-trycatch-003",
    "language": "java",
    "category": "try_catch",
    "level": 4,
    "difficulty": 4,
    "estimatedTime": 150,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "try-with-resources",
      "ja-JP": "try-with-resources",
      "en-US": "Try with resources"
    },
    "explanation": {
      "zh-CN": "try-with-resources自动关闭",
      "ja-JP": "リソース自動クローズ",
      "en-US": "Auto-close resources"
    },
    "hint": {
      "zh-CN": "try(Scanner sc=new Scanner(file))",
      "ja-JP": "try(Scanner sc=new Scanner(file))",
      "en-US": "try(Scanner sc=new Scanner(file))"
    },
    "focus": [
      "try",
      "Scanner",
      "File"
    ],
    "code": "import java.util.*;\nimport java.io.*;\ntry(Scanner sc=new Scanner(new File(\"d.txt\"))){\n    while(sc.hasNextLine())\n        System.out.println(sc.nextLine());\n}catch(FileNotFoundException e){\n    System.out.println(\"No file\");\n}"
  },
  {
    "id": "java-arraylist-001",
    "language": "java",
    "category": "arraylist",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 90,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "ArrayList",
      "ja-JP": "ArrayList",
      "en-US": "ArrayList"
    },
    "explanation": {
      "zh-CN": "创建ArrayList添加元素",
      "ja-JP": "ArrayList作成と要素追加",
      "en-US": "Create ArrayList and add"
    },
    "hint": {
      "zh-CN": "ArrayList<String> list=new ArrayList<>(); list.add(\"hi\");",
      "ja-JP": "ArrayList<String> list=new ArrayList<>(); list.add(\"hi\");",
      "en-US": "ArrayList<String> list=new ArrayList<>(); list.add(\"hi\");"
    },
    "focus": [
      "ArrayList",
      "add",
      "get"
    ],
    "code": "import java.util.ArrayList;\nArrayList<String> n=new ArrayList<>();\nn.add(\"Alice\"); n.add(\"Bob\");\nSystem.out.println(n.get(0));\nSystem.out.println(n.size());"
  },
  {
    "id": "java-arraylist-002",
    "language": "java",
    "category": "arraylist",
    "level": 2,
    "difficulty": 2,
    "estimatedTime": 90,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "ArrayList 遍历",
      "ja-JP": "ArrayList 走査",
      "en-US": "ArrayList loop"
    },
    "explanation": {
      "zh-CN": "增强for遍历ArrayList",
      "ja-JP": "拡張forでArrayListを走査",
      "en-US": "Traverse ArrayList with for"
    },
    "hint": {
      "zh-CN": "for(int s : scores)",
      "ja-JP": "for(int s : scores)",
      "en-US": "for(int s : scores)"
    },
    "focus": [
      "ArrayList",
      "for",
      ":"
    ],
    "code": "import java.util.ArrayList;\nArrayList<Integer> s=new ArrayList<>();\ns.add(85); s.add(90); s.add(78);\nint sum=0;\nfor(int v:s){sum+=v;}\nSystem.out.println(\"Avg: \"+sum/s.size());"
  },
  {
    "id": "java-arraylist-003",
    "language": "java",
    "category": "arraylist",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 120,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "ArrayList 方法",
      "ja-JP": "ArrayList メソッド",
      "en-US": "ArrayList methods"
    },
    "explanation": {
      "zh-CN": "ArrayList的remove/contains等方法",
      "ja-JP": "ArrayListのremove/containsなどのメソッド",
      "en-US": "ArrayList remove and contains"
    },
    "hint": {
      "zh-CN": "list.remove(0); list.contains(\"k\");",
      "ja-JP": "list.remove(0); list.contains(\"k\");",
      "en-US": "list.remove(0); list.contains(\"k\");"
    },
    "focus": [
      "ArrayList",
      "remove",
      "contains",
      "isEmpty"
    ],
    "code": "import java.util.ArrayList;\nArrayList<String> it=new ArrayList<>();\nit.add(\"A\"); it.add(\"B\"); it.add(\"C\");\nit.remove(\"B\");\nSystem.out.println(it.contains(\"A\"));\nSystem.out.println(it.isEmpty());\nSystem.out.println(it.size());"
  },
  {
    "id": "java-map-001",
    "language": "java",
    "category": "map",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 120,
    "source": "builtin",
    "sandboxRunnable": true,
    "title": {
      "zh-CN": "HashMap 基础",
      "ja-JP": "HashMap 基礎",
      "en-US": "HashMap basics"
    },
    "explanation": {
      "zh-CN": "创建HashMap存储键值对",
      "ja-JP": "HashMap作成とキー値保存",
      "en-US": "Create HashMap and store K-V"
    },
    "hint": {
      "zh-CN": "HashMap<String,Integer> m=new HashMap<>(); m.put(\"k\",1);",
      "ja-JP": "HashMap<String,Integer> m=new HashMap<>(); m.put(\"k\",1);",
      "en-US": "HashMap<String,Integer> m=new HashMap<>(); m.put(\"k\",1);"
    },
    "focus": [
      "HashMap",
      "put",
      "get",
      "containsKey"
    ],
    "code": "import java.util.HashMap;\nHashMap<String,Integer> a=new HashMap<>();\na.put(\"Alice\",25); a.put(\"Bob\",30);\nSystem.out.println(a.get(\"Alice\"));\nSystem.out.println(a.containsKey(\"Bob\"));"
  },
  {
    "id": "java-map-002",
    "language": "java",
    "category": "map",
    "level": 3,
    "difficulty": 3,
    "estimatedTime": 120,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "HashMap 遍历",
      "ja-JP": "HashMap 走査",
      "en-US": "HashMap iteration"
    },
    "explanation": {
      "zh-CN": "用keySet遍历HashMap",
      "ja-JP": "keySetでHashMapを走査",
      "en-US": "Iterate HashMap with keySet"
    },
    "hint": {
      "zh-CN": "for(String k:map.keySet())",
      "ja-JP": "for(String k:map.keySet())",
      "en-US": "for(String k:map.keySet())"
    },
    "focus": [
      "HashMap",
      "keySet",
      "for"
    ],
    "code": "import java.util.HashMap;\nHashMap<String,Integer> s=new HashMap<>();\ns.put(\"Alice\",85); s.put(\"Bob\",72); s.put(\"Aoi\",91);\nfor(String n:s.keySet()){\n    System.out.println(n+\": \"+s.get(n));\n}"
  },
  {
    "id": "java-map-003",
    "language": "java",
    "category": "map",
    "level": 4,
    "difficulty": 4,
    "estimatedTime": 150,
    "source": "builtin",
    "sandboxRunnable": false,
    "title": {
      "zh-CN": "HashMap 统计",
      "ja-JP": "HashMap 集計",
      "en-US": "HashMap counting"
    },
    "explanation": {
      "zh-CN": "用HashMap统计频率",
      "ja-JP": "HashMapで頻度集計",
      "en-US": "Count frequency with HashMap"
    },
    "hint": {
      "zh-CN": "map.put(k,map.getOrDefault(k,0)+1)",
      "ja-JP": "map.put(k,map.getOrDefault(k,0)+1)",
      "en-US": "map.put(k,map.getOrDefault(k,0)+1)"
    },
    "focus": [
      "HashMap",
      "getOrDefault",
      "put"
    ],
    "code": "import java.util.HashMap;\nString[] w={\"a\",\"b\",\"a\",\"c\",\"b\",\"a\"};\nHashMap<String,Integer> f=new HashMap<>();\nfor(String x:w){\n    f.put(x,f.getOrDefault(x,0)+1);\n}\nfor(String k:f.keySet()){\n    System.out.println(k+\": \"+f.get(k));\n}"
  }
];
