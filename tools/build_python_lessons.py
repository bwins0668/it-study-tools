# -*- coding: utf-8 -*-
import json
import os

# Define the lessons metadata
lessons_metadata = [
    # === Chapter 2 ===
    {
        "id": 1,
        "chapterId": 2,
        "chapterName": "第2章 Pythonプログラムの作成と実行",
        "subSectionId": "2-1",
        "subSectionName": "画面出力 (hello.py / hello2.py)",
        "titleJa": "画面への文字出力",
        "titleZh": "在屏幕上输出文字",
        "conceptJa": "<h3>画面への文字出力</h3><p>Pythonで画面に文字を表示するには、<code>print()</code> 関数を使用します。</p><p>表示したい文字列をシングルクォーテーション（'）またはダブルクォーテーション（\"）で囲んで、<code>print('Hello')</code> のように記述します。</p>",
        "conceptZh": "<h3>在屏幕上输出文字</h3><p>在 Python 中，要在屏幕上显示文字，我们需要使用 <code>print()</code> 函数。</p><p>我们将想要显示的文字用单引号（'）或双引号（\"）包裹起来，比如 <code>print('Hello')</code>。</p>",
        "analogy": "📢 `print` 就像是计算机的“小喇叭”或“公告板”，你塞给它什么内容，它就会大声向屏幕广播出来。",
        "files": ["c02/hello.py", "c02/hello2.py"],
        "vocabList": [
            {"ja": "print関数", "zh": "print函数", "desc": "【考点】最基本的输出命令，用于在控制台打印并换行。"},
            {"ja": "文字列", "zh": "字符串", "desc": "【考点】文本数据。用单引号 ' 或双引号 \" 包裹。"}
        ],
        "quizList": [
            {
                "question": "Pythonで「Hello」という文字を画面に表示するための正しい記述はどれですか？",
                "questionZh": "在Python中，要在屏幕上显示“Hello”，正确的写法是哪一个？",
                "options": ["print(Hello)", "print('Hello')", "echo 'Hello'", "System.out.print('Hello')"],
                "answerIdx": 1,
                "hint": "文字列はクォーテーションで囲む必要があります / 字符串必须用引号包裹。"
            }
        ],
        "pdfPage": 10,
        "pdfHighlightTerm": "print"
    },
    {
        "id": 2,
        "chapterId": 2,
        "chapterName": "第2章 Pythonプログラムの作成と実行",
        "subSectionId": "2-2",
        "subSectionName": "コメント (comment.py / comment2.py)",
        "titleJa": "プログラムへのメモ書き（コメント）",
        "titleZh": "在程序中写备忘录（注释）",
        "conceptJa": "<h3>コメントの書き方</h3><p>プログラムの動作に影響を与えないメモ書きをコメントと呼びます。行頭に <code>#</code> を記述するか、トリプルクォーテーション（'''）で囲みます。</p>",
        "conceptZh": "<h3>注释的写法</h3><p>不影响程序运行的说明文字被称为注释。单行使用 <code>#</code> 符号，多行使用三个单引号（'''）或三个双引号（\"\"\"）将其包裹起来。</p>",
        "analogy": "✏️ 注释就像是书本空白处的“手写笔记”。它是写给程序员看的，计算机会完全忽略它们。",
        "files": ["c02/comment.py", "c02/comment2.py"],
        "vocabList": [
            {"ja": "コメント", "zh": "注释", "desc": "【考点】单行注释以 # 开头，多行注释用三引号包裹。"}
        ],
        "quizList": [
            {
                "question": "Pythonで1行のコメントを書くために行頭に置く記号はどれですか？",
                "questionZh": "在Python中，为了写单行注释，在行首应该放哪个符号？",
                "options": ["//", "/*", "#", "--"],
                "answerIdx": 2,
                "hint": "ハッシュ記号を使用します / 使用井号（#）字符。"
            }
        ],
        "pdfPage": 15,
        "pdfHighlightTerm": "コメント"
    },
    {
        "id": 3,
        "chapterId": 2,
        "chapterName": "第2章 Pythonプログラムの作成と実行",
        "subSectionId": "2-3",
        "subSectionName": "コメントとインデント (comment_A1.py / comment_A2.py)",
        "titleJa": "インデントとコメントの位置エラー",
        "titleZh": "缩进与注释位置导致的出错",
        "conceptJa": "<h3>コメントとインデント位置</h3><p>Pythonはインデント（行頭のスペース）が構文規則として厳密にチェックされます。コメント行であっても不適切なスペースは <code>IndentationError</code> の原因になります。</p>",
        "conceptZh": "<h3>注释与缩进位置</h3><p>Python 严格检查行首的空格（缩进）。即使是注释行，如果在不恰当的地方加入了空格，也可能会触发 <code>IndentationError</code>。</p>",
        "analogy": "📐 缩进就像是段落大纲的层级结构。格式必须对齐，如果某一行突然无故缩进，解析器就会报错。",
        "files": ["c02/comment_A1.py", "c02/comment_A2.py"],
        "vocabList": [
            {"ja": "インデント", "zh": "缩进", "desc": "【考点】行首的空格。Python用它来划分代码块，必须对齐。"},
            {"ja": "IndentationError", "zh": "缩进错误", "desc": "【考点】当行首空格数量不对齐时，Python抛出的错误。"}
        ],
        "quizList": [
            {
                "question": "Pythonプログラムで不必要なスペースを行頭に入れるとどうなりますか？",
                "questionZh": "如果在Python程序的行首无故加入不必要的空格，会发生什么？",
                "options": ["正常に動く", "自動的に削除される", "IndentationErrorになる", "警告が出る"],
                "answerIdx": 2,
                "hint": "Pythonではインデントが厳密に判定されます / Python中缩进是语法的一部分。"
            }
        ],
        "pdfPage": 18,
        "pdfHighlightTerm": "インデント"
    },

    # === Chapter 3 ===
    {
        "id": 4,
        "chapterId": 3,
        "chapterName": "第3章 演算と変数・入力",
        "subSectionId": "3-1",
        "subSectionName": "数値の基本演算 (enzanshi01.py / enzanshi03.py)",
        "titleJa": "数値の四則演算と型エラー",
        "titleZh": "数值的四则运算与类型错误",
        "conceptJa": "<h3>数値演算と型エラー</h3><p>Pythonでは、<code>+</code>、<code>-</code>、<code>*</code>、<code>/</code>、<code>//</code>、<code>%</code> を使って計算します。数値と文字列を直接足し合わせると <code>TypeError</code> が発生します。</p>",
        "conceptZh": "<h3>数值运算与类型错误</h3><p>在 Python 中使用 <code>+</code>、<code>-</code>、<code>*</code>、<code>/</code>、<code>//</code>、<code>%</code> 进行四则计算。将数字和字符串直接相加会报错 <code>TypeError</code>。</p>",
        "analogy": "🍎 算术运算就像是水果分类：你不能把 5 个苹果和“3”这个汉字放在一起做数学相加。",
        "files": ["c03/enzanshi01.py", "c03/enzanshi03.py"],
        "vocabList": [
            {"ja": "TypeError", "zh": "类型错误", "desc": "【考点】对不合适的数据类型进行操作时抛出的错误。"},
            {"ja": "整数除算 (//)", "zh": "整除 (//)", "desc": "【考点】除法只保留整数商部分，舍弃余数。"}
        ],
        "quizList": [
            {
                "question": "Pythonで「5 // 2」を実行した結果はどうなりますか？",
                "questionZh": "在Python中执行“5 // 2”的结果是什么？",
                "options": ["2.5", "2", "1", "TypeError"],
                "answerIdx": 1,
                "hint": "整数除算は商の整数部分だけを返します / 整除运算只保留商的整数部分。"
            }
        ],
        "pdfPage": 25,
        "pdfHighlightTerm": "TypeError"
    },
    {
        "id": 5,
        "chapterId": 3,
        "chapterName": "第3章 演算と変数・入力",
        "subSectionId": "3-2",
        "subSectionName": "文字列の演算 (enzanshi02.py)",
        "titleJa": "文字列の結合とトリプルクォート",
        "titleZh": "字符串拼接与多行字符串",
        "conceptJa": "<h3>文字列の結合</h3><p>文字列同士を <code>+</code> で繋ぐことで結合できます。トリプルクォート（'''）を使うと改行を含んだ複数行の文字列を作成できます。</p>",
        "conceptZh": "<h3>字符串的运算</h3><p>使用 <code>+</code> 运算符将两个字符串拼接。三单引号（'''）用于直接编写并打印包含换行格式的文本。</p>",
        "analogy": "🔗 字符串的 `+` 就像是一条“粘合剂”，把两块文字木头拼接成一个长长的新木块。",
        "files": ["c03/enzanshi02.py"],
        "vocabList": [
            {"ja": "文字列結合", "zh": "字符串拼接", "desc": "【考点】使用 + 连接两个或多个字符串。"}
        ],
        "quizList": [
            {
                "question": "「'Hello' + 'World'」を実行した結果はどれですか？",
                "questionZh": "执行“'Hello' + 'World'”的结果是哪一个？",
                "options": ["'Hello World'", "'HelloWorld'", "TypeErrorになる", "'Hello\\nWorld'"],
                "answerIdx": 1,
                "hint": "スペースは自動的には入りません / 拼接时不会自动产生空格。"
            }
        ],
        "pdfPage": 28,
        "pdfHighlightTerm": "文字列"
    },
    {
        "id": 6,
        "chapterId": 3,
        "chapterName": "第3章 演算と変数・入力",
        "subSectionId": "3-3",
        "subSectionName": "演算の優先順位と変数演算 (enzanshi04.py ~ enzanshi06.py)",
        "titleJa": "演算の優先度と変数を用いた計算",
        "titleZh": "运算的优先级与利用变量计算",
        "conceptJa": "<h3>演算の優先順位</h3><p>乗算 <code>*</code> や除算 <code>/</code> は、加算 <code>+</code> や減算 <code>-</code> より先に計算されます。優先順位を変えたいときは <code>()</code> を使用します。また、計算式内で変数を使用可能です。</p>",
        "conceptZh": "<h3>运算符优先级</h3><p>乘除法 <code>*</code> / <code>/</code> 会优先于加减法 <code>+</code> / <code>-</code> 计算。想改变优先级需使用圆括号 <code>()</code>。计算式中支持使用变量代替数字。</p>",
        "analogy": "🔢 括号 `()` 就像是“VIP特权通道”，凡是放在括号里的部分都会被最优先算完。",
        "files": ["c03/enzanshi04.py", "c03/enzanshi05.py", "c03/enzanshi06.py"],
        "vocabList": [
            {"ja": "優先順位", "zh": "优先级", "desc": "【考点】括号优先级最高，其次是乘除，最后是加减。"}
        ],
        "quizList": [
            {
                "question": "「5 + 3 * 2」の実行結果はどうなりますか？",
                "questionZh": "“5 + 3 * 2”的执行结果是多少？",
                "options": ["16", "11", "13", "10"],
                "answerIdx": 1,
                "hint": "掛け算が先に計算されます / 乘法优于加法。"
            }
        ],
        "pdfPage": 31,
        "pdfHighlightTerm": "優先度"
    },
    {
        "id": 7,
        "chapterId": 3,
        "chapterName": "第3章 演算と変数・入力",
        "subSectionId": "3-4",
        "subSectionName": "変数の定義と再代入 (hensu01.py ~ hensu03.py)",
        "titleJa": "変数の作成と名前付けルール",
        "titleZh": "变量的创建与命名规则",
        "conceptJa": "<h3>変数の定義</h3><p>変数とは値を記憶しておくための「名前のついた箱」です。<code>x = 10</code> で代入します。値は再代入で書き換え可能です。先頭が数字の変数名は無効です。</p>",
        "conceptZh": "<h3>变量的定义</h3><p>变量就是用来存储数据的“命名盒子”。写 <code>x = 10</code> 进行赋值。变量值可随时被覆盖更新。注意变量名开头绝对不能为数字。</p>",
        "analogy": "📦 变量就像贴了标签的盒子，你在上面贴了名字，就可以把数据收纳进盒子里，以后还可以随时替换它。",
        "files": ["c03/hensu01.py", "c03/hensu02.py", "c03/hensu03.py"],
        "vocabList": [
            {"ja": "代入 (=)", "zh": "赋值 (=)", "desc": "【考点】把等号右边的值存入左侧变量盒子的操作。"},
            {"ja": "再代入", "zh": "重新赋值", "desc": "【考点】用新数据替换变量中旧值的过程。"}
        ],
        "quizList": [
            {
                "question": "次のうち、Pythonの変数名として無効（エラー）なものはどれですか？",
                "questionZh": "以下哪一个是Python中无效的非法变量名？",
                "options": ["num_1", "num1", "_num", "1num"],
                "answerIdx": 3,
                "hint": "数字から始まる名前は変数に使えません / 变量名开头不能是数字。"
            }
        ],
        "pdfPage": 35,
        "pdfHighlightTerm": "変数"
    },
    {
        "id": 8,
        "chapterId": 3,
        "chapterName": "第3章 演算と変数・入力",
        "subSectionId": "3-5",
        "subSectionName": "複合代入と多重代入 (hensu04.py, hensu06.py)",
        "titleJa": "複合代入と複数の同時代入",
        "titleZh": "复合赋值运算符与多重赋值",
        "conceptJa": "<h3>便利な代入演算子</h3><p><code>a = a + 1</code> は <code>a += 1</code> と簡潔に書くことができます（複合代入）。また、<code>a = b = c = 0</code> のように複数の変数に同時に同じ値を格納できます。</p>",
        "conceptZh": "<h3>复合赋值与快捷赋值</h3><p><code>a = a + 1</code> 可以简写成 <code>a += 1</code>。这被称为复合赋值。<code>a = b = c = 0</code> 可以用来把同一个值同时赋予给多个变量。</p>",
        "analogy": "⏱️ `a += 1` 就像游戏里的“自增一”动作，直接累加，不需要把原有数值写出来加一遍。",
        "files": ["c03/hensu04.py", "c03/hensu06.py"],
        "vocabList": [
            {"ja": "複合代入演算子", "zh": "复合赋值运算符", "desc": "【考点】在自身原有基础上做增减乘除的运算符，如 +=, -= 等。"}
        ],
        "quizList": [
            {
                "question": "変数 a が 5 のとき「a += 3」を実行すると a は何になりますか？",
                "questionZh": "当变量 a 初始值为 5 时，执行“a += 3”后，a 的值是多少？",
                "options": ["3", "5", "8", "15"],
                "answerIdx": 2,
                "hint": "a = a + 3 の短縮形です / 相当于 a = a + 3。"
            }
        ],
        "pdfPage": 40,
        "pdfHighlightTerm": "複合代入"
    },
    {
        "id": 9,
        "chapterId": 3,
        "chapterName": "第3章 演算と変数・入力",
        "subSectionId": "3-6",
        "subSectionName": "型変換と出力フォーマット (hensu05.py, hensu07.py ~ hensu09.py)",
        "titleJa": "データ型変換とf文字列の出力",
        "titleZh": "数据类型转换与格式化输出",
        "conceptJa": "<h3>型変換とフォーマット出力</h3><p>数値と文字列を連結するには <code>str()</code> で数値を文字列にキャストします。また、<code>f文字列</code> (例: <code>f'値は{val}'</code>) を使うと文字列に変数を直接埋め込めます。</p>",
        "conceptZh": "<h3>类型转换与f-string</h3><p>拼接数字与字符串时，需用 <code>str()</code> 将数字转为字符类型。使用 <code>f-string</code> (如 <code>f'数字是{val}'</code>) 可以轻松在字符串中嵌入变量。</p>",
        "analogy": "🏷️ `str(18)` 就像是把卡片上的金属标价牌通过扫描打印成纸贴纸，这样才能和普通的文字粘贴到一起去。",
        "files": ["c03/hensu05.py", "c03/hensu07.py", "c03/hensu08.py", "c03/hensu09.py"],
        "vocabList": [
            {"ja": "キャスト", "zh": "强制转换/转型", "desc": "【考点】将一种类型数据强制转换为另一种。如 str(10) 转为文字列。"},
            {"ja": "f文字列 (f-string)", "zh": "f-string格式化", "desc": "【考点】在字符串头部加 f 前缀，使用大括号 {} 包含变量的输出方式。"}
        ],
        "quizList": [
            {
                "question": "変数 val が 10 のとき「print(f'値:{val}')」の出力は何になりますか？",
                "questionZh": "当变量 val 值为 10 时，运行“print(f'值:{val}')”的输出是多少？",
                "options": ["値:val", "値:10", "値:{val}", "エラー"],
                "answerIdx": 1,
                "hint": "f文字列内の波括弧は変数の中身に置換されます / f-string大括号里的变量会被替换为实际的值。"
            }
        ],
        "pdfPage": 45,
        "pdfHighlightTerm": "f文字列"
    },
    {
        "id": 10,
        "chapterId": 3,
        "chapterName": "第3章 演算と変数・入力",
        "subSectionId": "3-7",
        "subSectionName": "キーボード入力 (input01.py ~ input04.py)",
        "titleJa": "input関数によるユーザー入力と型",
        "titleZh": "input函数获取用户输入与数据类型",
        "conceptJa": "<h3>ユーザー入力と注意点</h3><p>キーボードからユーザーに値を入力させるには <code>input()</code> を使います。<code>input()</code> が取得した値は<strong>すべて文字列型(str)</strong>として返されるため、数値計算に使う場合は <code>int(input())</code> などのキャストが必要です。</p>",
        "conceptZh": "<h3>获取键盘输入及转型</h3><p>使用 <code>input()</code> 函数挂起程序等待键盘输入。<code>input()</code> 读入的数据**默认一定是字符串类型**，要做数学计算必须强转成 <code>int(input())</code> 或 <code>float(input())</code>。</p>",
        "analogy": "📥 `input()` 就像你收到一个封好的“文本信封”，不管里面装的是数字还是文字，都要撕开信封（用 `int()`）把数字当数字使用。",
        "files": ["c03/input01.py", "c03/input02.py", "c03/input03.py", "c03/input04.py"],
        "vocabList": [
            {"ja": "input関数", "zh": "input函数", "desc": "【考点】挂起程序，接收控制台键入的文本并以字符串形式返回。"}
        ],
        "quizList": [
            {
                "question": "「a = input('入力->')」で「5」と入力された時、a のデータ型は何になりますか？",
                "questionZh": "执行“a = input('输入->')”并录入“5”时，变量 a 的数据类型是什么？",
                "options": ["int（整数型）", "str（文字列型）", "float（浮点数型）", "bool（真偽値型）"],
                "answerIdx": 1,
                "hint": "input()は中身が数字であっても文字列として値を返します / input()读入的内容不论是什么，数据类型都是字符串。"
            }
        ],
        "pdfPage": 50,
        "pdfHighlightTerm": "input"
    },

    # === Chapter 4 ===
    {
        "id": 11,
        "chapterId": 4,
        "chapterName": "第4章 条件分岐",
        "subSectionId": "4-1",
        "subSectionName": "比較演算子 (hikaku01.py ~ hikaku06.py)",
        "titleJa": "比較演算子と真偽値(bool)",
        "titleZh": "比较运算符与布尔值",
        "conceptJa": "<h3>比較演算子</h3><p>二つの値を比較し、結果を <code>True</code> または <code>False</code> の真偽値（bool）で返します。<code>==</code> (等しい)、<code>!=</code> (等しくない)、<code>&gt;</code>、<code>&lt;</code>、<code>&gt;=</code>、<code>&lt;=</code> があります。</p>",
        "conceptZh": "<h3>比较运算符</h3><p>用于对比两个值，计算结果会返回 <code>True</code> 或 <code>False</code> 的布尔值（bool）。包含 <code>==</code>（等于）、<code>!=</code>（不等于）、<code>&gt;</code>、<code>&lt;</code>、<code>&gt;=</code>、<code>&lt;=</code>。</p>",
        "analogy": "⚖️ 比较运算符就像是一个天平或裁判，每次对比完只给出两种判决结果：“对”（True）或“错”（False）。",
        "files": ["c04/hikaku01.py", "c04/hikaku02.py", "c04/hikaku03.py", "c04/hikaku04.py", "c04/hikaku05.py", "c04/hikaku06.py"],
        "vocabList": [
            {"ja": "真偽値 (bool)", "zh": "布尔值/真伪值", "desc": "【考点】只有 True 和 False 两种可能取值的逻辑类型。首字母必须大写。"},
            {"ja": "比較演算子 (==, !=)", "zh": "等价比较运算符", "desc": "【考点】== 用于判断是否相等，!= 判断是否不等。"}
        ],
        "quizList": [
            {
                "question": "Pythonで「3 != 5」を実行した結果はどうなりますか？",
                "questionZh": "在Python中执行“3 != 5”的结果是什么？",
                "options": ["True", "False", "TypeError", "SyntaxError"],
                "answerIdx": 0,
                "hint": "!= は「等しくない」ことを表すため、3と5は等しくないので True になります / != 表示不等，3确实不等于5，所以是 True。"
            }
        ],
        "pdfPage": 58,
        "pdfHighlightTerm": "比較演算子"
    },
    {
        "id": 12,
        "chapterId": 4,
        "chapterName": "第4章 条件分岐",
        "subSectionId": "4-2",
        "subSectionName": "条件分岐 if と ifelse (if01.py / ifelse01.py)",
        "titleJa": "if文とelseによる基本の条件分岐",
        "titleZh": "if 与 else 实现的基本分支",
        "conceptJa": "<h3>条件分岐の基本</h3><p>条件によって処理を分けるには <code>if</code> 文を使用します。条件が <code>True</code> のときに実行する処理を、インデント（スペース4つ）を下げて記述します。条件を満たさない（<code>False</code>）のときの処理は <code>else:</code> に記述します。</p>",
        "conceptZh": "<h3>基本条件分支</h3><p>根据条件来切换执行不同代码的操作使用 <code>if</code>。当条件为 <code>True</code> 时，执行向内缩进的代码块。如果不满足条件（<code>False</code>），执行 <code>else:</code> 后缩进的代码块。</p>",
        "analogy": "🛣️ 条件分支就像是路口的“岔路分流道”：满足条件走左边，不满足则走右边（else）。",
        "files": ["c04/if01.py", "c04/ifelse01.py"],
        "vocabList": [
            {"ja": "if文", "zh": "if分支语句", "desc": "【考点】根据条件是否成立决定是否执行某段缩进代码的条件控制流。"}
        ],
        "quizList": [
            {
                "question": "if文の条件式の行末に必要な記号はどれですか？",
                "questionZh": "在 if 语句的条件声明行末，必须写哪个符号？",
                "options": [";", ":", ",", "."],
                "answerIdx": 1,
                "hint": "Pythonの制御構文（ifやforなど）の行末はコロン「:」が必要です / Python控制结构（如if、for）的行末必须放冒音“:”。"
            }
        ],
        "pdfPage": 63,
        "pdfHighlightTerm": "if"
    },
    {
        "id": 13,
        "chapterId": 4,
        "chapterName": "第4章 条件分岐",
        "subSectionId": "4-3",
        "subSectionName": "複数分岐 if-elif (ifelif01.py / ifelif02.py)",
        "titleJa": "elifによる多方向への条件分岐",
        "titleZh": "使用 elif 实现的多向分支",
        "conceptJa": "<h3>多方向分岐</h3><p>3つ以上の分岐を作りたい場合は <code>elif</code>（else if の略）を使用します。上から順に条件が判定され、最初に <code>True</code> になったブロックだけが実行されます。</p>",
        "conceptZh": "<h3>多向分支</h3><p>想要分出 3 个或更多分支时，我们需要配合使用 <code>elif</code>（else if 的缩写）。计算机会自上而下评判条件，第一个为 <code>True</code> 的代码块会被执行，其余忽略。</p>",
        "analogy": "🚦 就像是考试成绩评定：90分以上是优，否则80分以上是良（elif），否则70分以上是中（elif），最后是不及格（else）。",
        "files": ["c04/ifelif01.py", "c04/ifelif02.py"],
        "vocabList": [
            {"ja": "elif", "zh": "elif关键字", "desc": "【考点】用于 if 后，代表“否则如果满足另一个条件...”。"}
        ],
        "quizList": [
            {
                "question": "elif文についての説明として正しいものはどれですか？",
                "questionZh": "以下关于 elif 语句的描述中，正确的是哪一个？",
                "options": ["いくつでも並べて書くことができる", "if文なしで単独で使用できる", "elseの後にしか記述できない", "インデントを下げる必要はない"],
                "answerIdx": 0,
                "hint": "ifとelseの間に、追加条件として複数並べることができます / 可以在if和else之间并列写任意多个elif追加条件。"
            }
        ],
        "pdfPage": 68,
        "pdfHighlightTerm": "elif"
    },
    {
        "id": 14,
        "chapterId": 4,
        "chapterName": "第4章 条件分岐",
        "subSectionId": "4-4",
        "subSectionName": "ネストされた条件分岐 (ifnest01.py)",
        "titleJa": "if文のネスト（入れ子）構造",
        "titleZh": "if 语句的嵌套（嵌套）结构",
        "conceptJa": "<h3>条件分岐のネスト</h3><p>if文のブロックの中に、さらに別のif文を入れることを「ネスト（入れ子）」と呼びます。ネストした部分は、さらにインデントを下げて記述する必要があります。</p>",
        "conceptZh": "<h3>嵌套条件分支</h3><p>在 if 语句缩进的代码块内部，再次写进另一个 if 语句，这被称为“嵌套（入れ子）”。嵌套内部的代码块必须进一步向内缩进。</p>",
        "analogy": "🗂️ 嵌套就像是“文件夹里的子文件夹”：你得先打开第一个文件夹，才能进入里面看到并打开第二个文件夹。",
        "files": ["c04/ifnest01.py"],
        "vocabList": [
            {"ja": "ネスト (Nest)", "zh": "嵌套", "desc": "【考点】在控制结构（如分支、循环）内部包裹同级或另一控制结构的编码模式。"}
        ],
        "quizList": [
            {
                "question": "ネストされたif文を記述するとき、インデントのスペース数はどうなりますか？",
                "questionZh": "编写嵌套的 if 语句时，内层代码的行首缩进空格数会怎么样？",
                "options": ["外側と同じスペース数", "さらにインデントを下げる（通常+4つ）", "インデントを下げる必要はない", "タブ文字しか使えなくなる"],
                "answerIdx": 1,
                "hint": "階層が深くなるにつれて、インデントもさらに深くする必要があります / 层级越深，缩进也必须相应地更深。"
            }
        ],
        "pdfPage": 71,
        "pdfHighlightTerm": "ネスト"
    },
    {
        "id": 15,
        "chapterId": 4,
        "chapterName": "第4章 条件分岐",
        "subSectionId": "4-5",
        "subSectionName": "論理演算子 and / or (and01.py / and02.py / or01.py)",
        "titleJa": "and・orによる複数条件の組み合わせ",
        "titleZh": "利用 and 和 or 组合多个条件",
        "conceptJa": "<h3>論理演算子 (and, or)</h3><p>複数の条件を組み合わせる演算子です。<code>and</code> は左右の条件が<strong>両方ともTrue</strong>のとき全体がTrueになります。<code>or</code> は左右の条件の<strong>少なくとも片方がTrue</strong>のときに全体がTrueになります。</p>",
        "conceptZh": "<h3>逻辑运算符 (and, or)</h3><p>用于组合多个条件判定。<code>and</code> 要求左右两边的条件**必须全部为True**，整体才判定为True；<code>or</code> 只要左右两边**至少有一个条件为True**，整体即判定为True。</p>",
        "analogy": "🤝 `and` 就像必须提供“身份证 AND 登机牌”才能登机；`or` 则是刷“微信 OR 支付宝”都可以结账支付。",
        "files": ["c04/and01.py", "c04/and02.py", "c04/or01.py"],
        "vocabList": [
            {"ja": "and (かつ)", "zh": "逻辑与 and", "desc": "【考点】当且仅当左右两端条件都是 True 时返回 True 的运算符。"},
            {"ja": "or (または)", "zh": "逻辑或 or", "desc": "【考点】只要左右有一端为 True 就返回 True 的运算符。"}
        ],
        "quizList": [
            {
                "question": "「x = 5」のとき、「x > 0 and x < 10」の判定結果はどうなりますか？",
                "questionZh": "当变量 x 的值为 5 时，计算表达式“x > 0 and x < 10”的结果是什么？",
                "options": ["True", "False", "None", "Error"],
                "answerIdx": 0,
                "hint": "5は0より大きく、かつ10より小さいので、両方の条件が成立します / 5大于0，并且5也小于10，两边条件均成立。"
            }
        ],
        "pdfPage": 75,
        "pdfHighlightTerm": "and"
    },
    {
        "id": 16,
        "chapterId": 4,
        "chapterName": "第4章 条件分岐",
        "subSectionId": "4-6",
        "subSectionName": "論理演算子 not とコラム (not01.py / not02.py / column01.py / column02.py)",
        "titleJa": "条件の否定(not)と変数の真偽変換コラム",
        "titleZh": "条件的否定(not)与变量值判断コラム",
        "conceptJa": "<h3>notによる条件の否定</h3><p><code>not</code> 演算子は、条件の判定結果を反転させます。<code>not True</code> は <code>False</code> になり、<code>not False</code> は <code>True</code> になります。コラムでは条件式内での数値の真偽判定について扱います。</p>",
        "conceptZh": "<h3>使用 not 取反</h3><p><code>not</code> 运算符用于将条件的真假结果颠倒反转。<code>not True</code> 会变为 <code>False</code>，而 <code>not False</code> 会变成 <code>True</code>。在本节コラム中，还会探究非布尔值在if条件中的隐式真假变换规律。</p>",
        "analogy": "🔄 `not` 就像是一个“反话过滤器”，把对的说成错的，把错的说成对的。",
        "files": ["c04/not01.py", "c04/not02.py", "c04/column01.py", "c04/column02.py"],
        "vocabList": [
            {"ja": "not (～ではない)", "zh": "逻辑非 not", "desc": "【考点】将布尔值反转的单目运算符。"}
        ],
        "quizList": [
            {
                "question": "「not (3 > 5)」の判定結果はどうなりますか？",
                "questionZh": "计算“not (3 > 5)”的结果是什么？",
                "options": ["True", "False", "Error", "None"],
                "answerIdx": 0,
                "hint": "3 > 5 は False なので、それを not で否定すると True になります / 3 > 5 是 False，前面用 not 取反即得 True。"
            }
        ],
        "pdfPage": 80,
        "pdfHighlightTerm": "not"
    },

    # === Chapter 5 ===
    {
        "id": 17,
        "chapterId": 5,
        "chapterName": "第5章 コレクション",
        "subSectionId": "5-1",
        "subSectionName": "リストの基本 (list01.py ~ list06.py)",
        "titleJa": "リストの作成とインデックスアクセス",
        "titleZh": "列表的创建与索引获取",
        "conceptJa": "<h3>リストの基本</h3><p>複数のデータをまとめて管理する配列のような仕組みを<strong>リスト（list）</strong>と呼びます。角括弧 <code>[]</code> を使い、要素をカンマで区切って作成します。要素を取り出すときは <code>list[インデックス]</code> と記述し、インデックスは <strong>0から始まる</strong>ことに注意してください。</p>",
        "conceptZh": "<h3>列表的声明与索引读取</h3><p>用于集中有序管理多个数据的一种容器结构被称为<strong>列表（list）</strong>。使用方括号 <code>[]</code> 声明，元素间用逗号分隔。提取元素时写成 <code>list[索引]</code>，需要牢记<strong>索引是从0开始数起</strong>的。</p>",
        "analogy": "🏨 列表就像是一栋公寓，每个房间（元素）都有一个门牌号（索引）。一楼最左边的房间门牌号是 0 号，住户可以直接通过 0 号房提取或放置物品。",
        "files": ["c05/list01.py", "c05/list02.py", "c05/list03.py", "c05/list04.py", "c05/list05.py", "c05/list06.py"],
        "vocabList": [
            {"ja": "リスト (List)", "zh": "列表", "desc": "【考点】用于存储有序元素集合的容器。用方括号 [] 表示。"},
            {"ja": "インデックス", "zh": "索引/下标", "desc": "【考点】元素在列表中的序号。从 0 开始。支持负数索引（如 -1 代表最后一个）。"}
        ],
        "quizList": [
            {
                "question": "リスト a = [10, 20, 30] のとき、a[1] の値は何ですか？",
                "questionZh": "当列表 a = [10, 20, 30] 时，a[1] 的数值是多少？",
                "options": ["10", "20", "30", "エラー"],
                "answerIdx": 1,
                "hint": "インデックスは0から始まります / 索引是从0开始算的，所以 a[0]是10，a[1]是20。"
            }
        ],
        "pdfPage": 88,
        "pdfHighlightTerm": "リスト"
    },
    {
        "id": 18,
        "chapterId": 5,
        "chapterName": "第5章 コレクション",
        "subSectionId": "5-2",
        "subSectionName": "リストの変更と追加・削除 (list07.py ~ list13.py)",
        "titleJa": "リスト要素の更新・追加・削除メソッド",
        "titleZh": "列表元素的更新、追加与删除",
        "conceptJa": "<h3>リストの操作</h3><p>リストの要素を操作する代表的な方法です。</p><ul><li><code>append(値)</code>：末尾に追加</li><li><code>insert(位置, 値)</code>：指定位置に挿入</li><li><code>pop(位置)</code>：指定位置を取り出して削除</li><li><code>remove(値)</code>：指定した値と一致する要素を削除</li><li><code>del リスト[位置]</code>：指定位置を削除</li></ul>",
        "conceptZh": "<h3>修改、追加与删除列表</h3><p>操作列表元素的常用语法与方法：</p><ul><li><code>append(值)</code>：在列表末尾追加新元素。</li><li><code>insert(位置, 值)</code>：在指定的索引位置插入新元素。</li><li><code>pop(位置)</code>：取出并删除指定索引位置的元素。</li><li><code>remove(值)</code>：直接根据匹配的元素值进行删除。</li><li><code>del 列表[索引]</code>：直接删除指定索引上的数据。</li></ul>",
        "analogy": "🏬 列表操作就像是排队买咖啡：`append` 是来了一个新顾客排在队尾；`insert` 是有人插队排到了第2个位置；`pop` 是收银员处理完了队伍里某个人并让他离队。",
        "files": ["c05/list07.py", "c05/list08.py", "c05/list09.py", "c05/list10.py", "c05/list11.py", "c05/list12.py", "c05/list13.py"],
        "vocabList": [
            {"ja": "append()", "zh": "append方法", "desc": "【考点】极其重要，在列表最尾端追加一个元素。"},
            {"ja": "remove()", "zh": "remove方法", "desc": "【考点】直接通过数值内容匹配删除，只删第一个匹配的元素。"}
        ],
        "quizList": [
            {
                "question": "リスト a = [1, 2] に要素 3 を末尾に追加する正しい記述はどれですか？",
                "questionZh": "要在列表 a = [1, 2] 的末尾追加元素 3，正确的写法是哪一个？",
                "options": ["a.add(3)", "a.append(3)", "a.insert(3)", "a.push(3)"],
                "answerIdx": 1,
                "hint": "Pythonのリストでは append メソッドを使用します / Python列表中追加末尾元素用 append 方法。"
            }
        ],
        "pdfPage": 95,
        "pdfHighlightTerm": "append"
    },
    {
        "id": 19,
        "chapterId": 5,
        "chapterName": "第5章 コレクション",
        "subSectionId": "5-3",
        "subSectionName": "リストの検索とソート (list14.py ~ list20.py, listcolumn01.py ~ listcolumn02.py)",
        "titleJa": "リストの検索、並び替え、コピー",
        "titleZh": "列表的搜索、排序与浅拷贝",
        "conceptJa": "<h3>リストの応用操作</h3><p>リストのデータ検索や並び替えを行います。</p><ul><li><code>index(値)</code>：値のインデックスを取得</li><li><code>count(値)</code>：一致する要素の数を取得</li><li><code>sort()</code>：昇順に並び替え</li><li><code>reverse()</code>：順序を反転</li><li><code>copy()</code>：リストをコピー（浅いコピー）</li></ul>",
        "conceptZh": "<h3>列表的搜索与排序</h3><p>对列表内的数据进行检索和整理：</p><ul><li><code>index(值)</code>：查找指定元素第一次出现的索引位置。</li><li><code>count(值)</code>：统计指定元素在列表中出现的次数。</li><li><code>sort()</code>：将列表元素按升序（从小到大）进行原地排序。</li><li><code>reverse()</code>：颠倒反转列表内所有元素的物理顺序。</li><li><code>copy()</code>：浅拷贝生成一份新的列表副本。</li></ul>",
        "analogy": "📊 `sort` 就像是排队时教官一声令下“按身高从矮到高站队”；`reverse` 则是让整个队列“向后转”。",
        "files": ["c05/list14.py", "c05/list15.py", "c05/list16.py", "c05/list17.py", "c05/list18.py", "c05/list19.py", "c05/list20.py", "c05/listcolumn01.py", "c05/listcolumn02.py"],
        "vocabList": [
            {"ja": "sort()", "zh": "sort方法", "desc": "【考点】原地排序列表，默认升序。如果是字母，则按ASCII码排序。"},
            {"ja": "copy()", "zh": "copy方法", "desc": "【考点】复制列表。如果不复制直接赋值（a = b），修改b也会改变a。"}
        ],
        "quizList": [
            {
                "question": "リスト a = [3, 1, 2] に対して「a.sort()」を実行した後の a の中身はどうなりますか？",
                "questionZh": "对列表 a = [3, 1, 2] 运行“a.sort()”后，a 的元素顺序变成什么？",
                "options": ["[3, 1, 2]", "[2, 1, 3]", "[1, 2, 3]", "[3, 2, 1]"],
                "answerIdx": 2,
                "hint": "sort() はリストを昇順（小さい順）に並び替えます / sort() 会将列表按从小到大的升序重新排列。"
            }
        ],
        "pdfPage": 105,
        "pdfHighlightTerm": "sort"
    },
    {
        "id": 20,
        "chapterId": 5,
        "chapterName": "第5章 コレクション",
        "subSectionId": "5-4",
        "subSectionName": "タプルの基本操作 (tuple01.py ~ tuple05.py, tuplecolumun.py)",
        "titleJa": "更新できないリストとしてのタプル",
        "titleZh": "不可修改的列表：元组",
        "conceptJa": "<h3>タプル（tuple）とは</h3><p>リストに似ていますが、<strong>後から要素を変更・追加・削除できない</strong>コレクションです。丸括弧 <code>()</code> を使って作成します。プログラム内で意図せずデータを書き換えられたくない場合に使用します。</p>",
        "conceptZh": "<h3>元组的定义与只读特性</h3><p><strong>元组（tuple）</strong>是一种非常类似于列表，但<strong>在创建后绝对不允许修改、追加或删除任何元素</strong>的只读集合。使用圆括号 <code>()</code> 进行定义。适用于在程序中防止配置数据被意外篡改的场景。</p>",
        "analogy": "🔒 元组就像是一张“塑封胶印好的证书”，上面的内容被死死固化在纸里，你只能阅读，不可能去擦除或贴上新的贴纸。",
        "files": ["c05/tuple01.py", "c05/tuple02.py", "c05/tuple03.py", "c05/tuple04.py", "c05/tuple05.py", "c05/tuplecolumun.py"],
        "vocabList": [
            {"ja": "タプル (Tuple)", "zh": "元组", "desc": "【考点】只读集合。不支持 append、remove、pop 等修改操作。用 () 表示。"},
            {"ja": "イミュータブル (Immutable)", "zh": "不可变性", "desc": "【考点】元组的属性，指对象的值一旦创建即无法被改变。"}
        ],
        "quizList": [
            {
                "question": "タプル a = (10, 20) に対して「a[0] = 30」と値を変更しようとするとどうなりますか？",
                "questionZh": "试图对元组 a = (10, 20) 进行“a[0] = 30”修改操作时，会发生什么？",
                "options": ["値が30に変更される", "エラー（TypeError）になる", "警告が出るが無視される", "新しい要素として追加される"],
                "answerIdx": 1,
                "hint": "タプルはイミュータブルであるため、要素の書き換えはエラーになります / 元组是不可变的，任何写入或修改操作都会引发 TypeError 错误。"
            }
        ],
        "pdfPage": 115,
        "pdfHighlightTerm": "タプル"
    },
    {
        "id": 21,
        "chapterId": 5,
        "chapterName": "第5章 コレクション",
        "subSectionId": "5-5",
        "subSectionName": "辞書の基本とキーの取得 (jisho01.py ~ jisho05.py)",
        "titleJa": "辞書(dict)の作成とキーを用いたアクセス",
        "titleZh": "字典的创建与键关联获取",
        "conceptJa": "<h3>辞書の基本</h3><p>キー（Key）と値（Value）をペアで格納するコレクションを<strong>辞書（dictionary/dict）</strong>と呼びます。波括弧 <code>{}</code> を使い、<code>{キー: 値}</code> のように記述します。要素を取り出すときは <code>dict[キー]</code> と指定し、インデント番号（0, 1）の代わりに名前でアクセスします。</p>",
        "conceptZh": "<h3>字典的创建与键值存取</h3><p>用于存储键（Key）和值（Value）映射对的集合被称为<strong>字典（dictionary/dict）</strong>。使用花括号 <code>{}</code>，写成 <code>{键: 值}</code> 格式。获取元素时使用 <code>dict[键]</code> 代替数字索引，直接使用“名字”进行存取。</p>",
        "analogy": "📒 字典就像是一本“学生名册”，每个人（值）都关联着唯一的学号（键）。教官喊学号，对应的学生就会站出来答到。",
        "files": ["c05/jisho01.py", "c05/jisho02.py", "c05/jisho03.py", "c05/jisho04.py", "c05/jisho05.py"],
        "vocabList": [
            {"ja": "辞書 (dictionary)", "zh": "字典", "desc": "【考点】存取键值对的哈希表结构。使用花括号 {}，键必须唯一。"},
            {"ja": "キー (Key) / 値 (Value)", "zh": "键 / 值", "desc": "【考点】字典中的映射关系。通过键找值，反过来不行。"}
        ],
        "quizList": [
            {
                "question": "辞書 d = {'name': 'Alice', 'age': 20} から年齢（20）を取得するための正しい記述はどれですか？",
                "questionZh": "从字典 d = {'name': 'Alice', 'age': 20} 中取出年龄（20），正确的写法是哪一个？",
                "options": ["d[0]", "d.get(1)", "d['age']", "d[age]"],
                "answerIdx": 2,
                "hint": "辞書はインデックスではなく「キー」で指定します / 字典必须使用对应的“键”作为字符串键值进行指定。"
            }
        ],
        "pdfPage": 120,
        "pdfHighlightTerm": "辞書"
    },
    {
        "id": 22,
        "chapterId": 5,
        "chapterName": "第5章 コレクション",
        "subSectionId": "5-6",
        "subSectionName": "辞書の操作と値の処理 (jisho06.py ~ jisho12.py, jisho_values01.py)",
        "titleJa": "辞書の要素追加・更新・削除と安全な取得",
        "titleZh": "字典的更新、修改、删除与安全获取",
        "conceptJa": "<h3>辞書の操作とメソッド</h3><p>辞書の更新や削除には以下の操作を行います。</p><ul><li><code>d[新しいキー] = 値</code>：要素の追加</li><li><code>d[既存のキー] = 値</code>：値の更新</li><li><code>d.get(キー)</code>：存在しないキーでもエラーを発生させずに安全に値を取得</li><li><code>d.pop(キー)</code>：キーを削除</li><li><code>d.keys()</code>：全キーを取得、<code>d.values()</code>：全値を取得</li></ul>",
        "conceptZh": "<h3>字典的方法与高级操作</h3><p>更新或维护字典键值数据：</p><ul><li><code>d[新键] = 值</code>：在字典中新增一个键值对。</li><li><code>d[已有键] = 值</code>：更新该键对应的数值内容。</li><li><code>d.get(键)</code>：<strong>极为重要</strong>，安全地获取数据。若键不存在会返回 None，而不会像 <code>d[键]</code> 那样直接崩掉程序。</li><li><code>d.pop(键)</code>：弹出并删除指定键值。</li><li><code>d.keys()</code> / <code>d.values()</code>：获取包含全部键 / 值的集合视图。</li></ul>",
        "analogy": "📞 `get` 就像是向查号台打电话询问“张三的电话”：如果是张三就告诉你电话，如果是没有记录的人，它会礼貌地回复“查无此人”，而不会把电话系统弄崩溃。",
        "files": ["c05/jisho06.py", "c05/jisho07.py", "c05/jisho08.py", "c05/jisho09.py", "c05/jisho10.py", "c05/jisho11.py", "c05/jisho12.py", "c05/jisho_values01.py"],
        "vocabList": [
            {"ja": "get()", "zh": "get方法", "desc": "【考点】字典的安全提取方法。找不到键时不会报错，可设置默认值。"}
        ],
        "quizList": [
            {
                "question": "辞書に存在しないキーを d['wrong_key'] のように指定して取り出そうとするとどうなりますか？",
                "questionZh": "如果直接使用 d['wrong_key'] 读取字典中不存在的键，会发生什么？",
                "options": ["Noneが返る", "KeyErrorエラーになる", "自動的にキーが作られる", "空の文字列が返る"],
                "answerIdx": 1,
                "hint": "直指定だと KeyError が発生しプログラムが強制終了します。get()を使えば回避できます / 直接使用方括号会报 KeyError，而使用 get() 则可以避免崩溃。"
            }
        ],
        "pdfPage": 128,
        "pdfHighlightTerm": "KeyError"
    },
    {
        "id": 23,
        "chapterId": 5,
        "chapterName": "第5章 コレクション",
        "subSectionId": "5-7",
        "subSectionName": "集合の基本と演算 (shugou01.py ~ shugou05.py)",
        "titleJa": "重複を持たない集合(set)と集合演算",
        "titleZh": "去重的集合与交并集数学运算",
        "conceptJa": "<h3>集合（set）の特徴</h3><p>集合とは、<strong>重複した値を持たず、順序もない</strong>コレクションです。波括弧 <code>{}</code> または <code>set()</code> を使って作成します。数学の集合演算と同様に、積集合（交わり <code>&amp;</code>）や和集合（結び <code>|</code>）を簡単に計算できます。</p>",
        "conceptZh": "<h3>集合的特征与运算</h3><p><strong>集合（set）</strong>是一种<strong>内部元素无序且绝对不允许有重复值</strong>的容器。使用花括号 <code>{}</code>（无键值对）或 <code>set()</code> 声明。支持数学集合运算：交集（<code>&amp;</code>）、并集（<code>|</code>）、差集（<code>-</code>）。</p>",
        "analogy": "🎟️ 集合就像是一个“检票箱”：无论你塞进几张相同的门票（重复值），箱子里最终只会留下一张有效票（自动去重）。",
        "files": ["c05/shugou01.py", "c05/shugou02.py", "c05/shugou03.py", "c05/shugou04.py", "c05/shugou05.py"],
        "vocabList": [
            {"ja": "集合 (set)", "zh": "集合", "desc": "【考点】不重复且无序的元素容器。常用于对数据去重。"},
            {"ja": "和集合 (|)", "zh": "并集 (|)", "desc": "【考点】两个集合的所有元素合并（自动去重）。"},
            {"ja": "積集合 (&)", "zh": "交集 (&)", "desc": "【考点】只保留两个集合中都共同存在的元素。"}
        ],
        "quizList": [
            {
                "question": "集合 a = {1, 2, 2, 3} の要素数（len(a)）はいくつになりますか？",
                "questionZh": "集合 a = {1, 2, 2, 3} 的实际元素个数（len(a)）是多少？",
                "options": ["4", "3", "2", "エラーになる"],
                "answerIdx": 1,
                "hint": "集合は重複を許さないため、2つある「2」は1つにまとめられます / 集合不允许重复，两个“2”会被合并成一个，集合内实际元素为 {1, 2, 3}。"
            }
        ],
        "pdfPage": 135,
        "pdfHighlightTerm": "集合"
    },
    {
        "id": 24,
        "chapterId": 5,
        "chapterName": "第5章 コレクション",
        "subSectionId": "5-8",
        "subSectionName": "集合とリストの変換 (set_list.py)",
        "titleJa": "集合とリストの相互変換による重複除去",
        "titleZh": "集合与列表的相互转换及元素去重",
        "conceptJa": "<h3>リストと集合の変換</h3><p>リストから重複を取り除きたい場合、一度 <code>set()</code> を使って集合に変換し、再び <code>list()</code> でリストに戻すという手法がPythonではよく用いられます。</p>",
        "conceptZh": "<h3>列表与集合的格式转换</h3><p>如果想快速剔除一个列表中所有重复出现的垃圾数据，最快捷高效的 Python 写法是：先用 <code>set(列表)</code> 强转为集合去重，再用 <code>list(集合)</code> 强转回列表重新使用。</p>",
        "analogy": "🧹 这就像是洗碗：把一堆脏乱有重复的筷子扔进消毒柜（转为集合，去除了坏的/重复的），烘干后再拿出来摆回筷子笼（转回列表使用）。",
        "files": ["c05/set_list.py"],
        "vocabList": [
            {"ja": "set()による型変換", "zh": "set()转换", "desc": "【考点】可以将列表转换成集合格式，起到自动去重的效力。"}
        ],
        "quizList": [
            {
                "question": "リスト a = [1, 1, 2] から重複を排除して [1, 2] にするための最も簡単な変換式はどれですか？",
                "questionZh": "要将含有重复元素的列表 a = [1, 1, 2] 快速去重变成 [1, 2]，最简便的转换语句是哪一个？",
                "options": ["a = list(set(a))", "a = set(list(a))", "a.distinct()", "a.sort()"],
                "answerIdx": 0,
                "hint": "setで重複を消してから、もう一度listに戻します / 先使用set去重，再用list还原回列表。"
            }
        ],
        "pdfPage": 138,
        "pdfHighlightTerm": "変換"
    },

    # === Chapter 6 ===
    {
        "id": 25,
        "chapterId": 6,
        "chapterName": "第6章 繰り返し処理",
        "subSectionId": "6-1",
        "subSectionName": "for文とrange関数の基本 (kurikaeshi01.py ~ kurikaeshi05.py)",
        "titleJa": "for文による指定回数ループとrange",
        "titleZh": "for循环结构与指定范围循环",
        "conceptJa": "<h3>for文とrange</h3><p>同じ処理を指定回数繰り返すには <code>for</code> 文を使用します。<code>for i in range(5):</code> のように書くと、変数 <code>i</code> に 0 から 4 までの整数が順に代入されながら5回繰り返されます。</p><ul><li><code>range(3, 5)</code>：3から4まで</li><li><code>range(1, 5, 2)</code>：1から3まで2刻み</li></ul>",
        "conceptZh": "<h3>for 循环与 range 范围</h3><p>当需要重复执行相同代码时，我们使用 <code>for</code> 循环。写成 <code>for i in range(5):</code> 会使变量 <code>i</code> 从 0 开始，依次自增到 4，循环跑 5 次。</p><ul><li><code>range(3, 5)</code>：取值从 3 到 4（不含5）。</li><li><code>range(1, 5, 2)</code>：步长为2，取值 1 和 3（不含5）。</li></ul>",
        "analogy": "🔁 `for i in range(5)` 就像是操场跑圈：老师发给你 5 张打卡券（0,1,2,3,4），你跑完一圈就刷一张券，手里的打卡券全部刷完，你就可以停下来休息了。",
        "files": ["c06/kurikaeshi01.py", "c06/kurikaeshi02.py", "c06/kurikaeshi03.py", "c06/kurikaeshi04.py", "c06/kurikaeshi05.py"],
        "vocabList": [
            {"ja": "for文", "zh": "for循环", "desc": "【考点】用于遍历某个范围或序列的循环结构。"},
            {"ja": "range()関数", "zh": "range函数", "desc": "【考点】生成等差整数序列的迭代器函数。如 range(start, stop, step)。"}
        ],
        "quizList": [
            {
                "question": "「range(1, 4)」が生成する整数の並びとして正しいものはどれですか？",
                "questionZh": "“range(1, 4)”生成的整数序列是哪一个？",
                "options": ["1, 2, 3, 4", "1, 2, 3", "0, 1, 2, 3", "2, 3, 4"],
                "answerIdx": 1,
                "hint": "最後の数（ストップ値）自身は含まれません / 生成序列不包含右边界数字自身。"
            }
        ],
        "pdfPage": 142,
        "pdfHighlightTerm": "for"
    },
    {
        "id": 26,
        "chapterId": 6,
        "chapterName": "第6章 繰り返し処理",
        "subSectionId": "6-2",
        "subSectionName": "コレクションに対するループ (kurikaeshi06.py ~ kurikaeshi10.py)",
        "titleJa": "リストや辞書の中身を反復処理するループ",
        "titleZh": "遍历列表与字典中的元素",
        "conceptJa": "<h3>コレクションのループ</h3><p>for文を使うと、リストの要素を先頭から順に取り出して処理できます（<code>for item in list:</code>）。辞書に対して適用した場合は、デフォルトで**キー（鍵）**が順に取り出されます。</p>",
        "conceptZh": "<h3>遍历容器集合</h3><p>使用 <code>for</code> 可以轻松把列表中的元素按顺序一次取出一个并执行操作（如 <code>for item in 列表:</code>）。如果是遍历字典，默认会逐个提取出字典的**键（Key）**。</p>",
        "analogy": "📦 遍历列表就像是快递员派件：三轮车（列表）里装了 3 件快递（元素），快递员顺着顺序，一件一件取出来敲门送给客户。",
        "files": ["c06/kurikaeshi06.py", "c06/kurikaeshi07.py", "c06/kurikaeshi08.py", "c06/kurikaeshi09.py", "c06/kurikaeshi10.py"],
        "vocabList": [
            {"ja": "イテレータ", "zh": "可迭代对象", "desc": "【考点】可以被 for 循环逐个取出元素进行反复遍历的对象，如列表、元组、字典。"}
        ],
        "quizList": [
            {
                "question": "辞書 d = {'a': 1, 'b': 2} に対して「for k in d:」を実行した時、変数 k に代入されるものは何ですか？",
                "questionZh": "对于字典 d = {'a': 1, 'b': 2}，执行“for k in d:”时，变量 k 中依次被代入的是什么？",
                "options": ["値（1, 2）", "キー（'a', 'b'）", "キーと値のペア", "インデックス番号"],
                "answerIdx": 1,
                "hint": "辞書のループでは、デフォルトで「キー」が順に取り出されます / 字典被for循环直接遍历时，默认吐出的是“键（Key）”。"
            }
        ],
        "pdfPage": 150,
        "pdfHighlightTerm": "反復処理"
    },
    {
        "id": 27,
        "chapterId": 6,
        "chapterName": "第6章 繰り返し処理",
        "subSectionId": "6-3",
        "subSectionName": "while文によるループ (kurikaeshi11.py ~ kurikaeshi13.py)",
        "titleJa": "while文による条件指定のループ",
        "titleZh": "while 语句实现条件控制循环",
        "conceptJa": "<h3>while文</h3><p>指定した条件式が <code>True</code> である間、処理を繰り返す構文です。条件が <code>False</code> になるとループを抜けます。条件式の変更を忘れると、永遠にループが終了しない「無限ループ」に陥るため注意が必要です。</p>",
        "conceptZh": "<h3>while 循环</h3><p>只要指定的条件算式计算结果为 <code>True</code>，就会不断重复执行缩进块内的代码。一旦条件变为了 <code>False</code>，循环立即终止。注意：如果在循环体内不修改判断条件，会导致程序陷入永远停不下来的“死循环”。</p>",
        "analogy": "🛟 `while` 就像是水上滑滑梯的警示灯：只要水位没有排空（条件为True），你就得一直在滑梯里滑行（循环），直到水漏干了才能走出去。",
        "files": ["c06/kurikaeshi11.py", "c06/kurikaeshi12.py", "c06/kurikaeshi13.py"],
        "vocabList": [
            {"ja": "while文", "zh": "while语句", "desc": "【考点】当条件成立时反复执行指令的循环机制。"},
            {"ja": "無限ループ (死ループ)", "zh": "死循环/无限循环", "desc": "【考点】因为条件始终满足而无法正常结束的异常循环状态。"}
        ],
        "quizList": [
            {
                "question": "while文のループを抜ける契機として正しいものはどれですか？",
                "questionZh": "以下哪项是正常跳出 while 循环的条件？",
                "options": ["条件式がTrueになったとき", "条件式がFalseになったとき", "変数の値が0になったとき", "規定回数（10回）動いたとき"],
                "answerIdx": 1,
                "hint": "条件式がFalse（偽）になるとwhileループは終了します / 当条件表达式被计算为 False 时，while 循环立即宣告结束。"
            }
        ],
        "pdfPage": 158,
        "pdfHighlightTerm": "while"
    },
    {
        "id": 28,
        "chapterId": 6,
        "chapterName": "第6章 繰り返し処理",
        "subSectionId": "6-4",
        "subSectionName": "ループ制御 break (kurikaeshi14.py ~ kurikaeshi15.py)",
        "titleJa": "break文による繰り返し処理の強制中断",
        "titleZh": "使用 break 语句强制终止循环",
        "conceptJa": "<h3>break文</h3><p>ループの途中であっても、<code>break</code> 文が実行されると、その時点で繰り返し処理を<strong>強制的に終了（中断）</strong>し、ループの外側の処理へ進みます。if文と組み合わせて使用するのが一般的です。</p>",
        "conceptZh": "<h3>break 强行跳出</h3><p>在循环执行中途，一旦遭遇并执行了 <code>break</code> 语句，计算机会无条件地**强行瞬间关闭并逃离当前这一层循环**，转去执行循环体下方的其他后续代码。通常与 if 分支结构配合使用。</p>",
        "analogy": "🚨 `break` 就像是火灾发生时的“火警紧急断电拉闸按钮”，一按下去，整条传送带（循环）立即死锁停下。",
        "files": ["c06/kurikaeshi14.py", "c06/kurikaeshi15.py"],
        "vocabList": [
            {"ja": "break", "zh": "break关键字", "desc": "【考点】极度常用，用于直接跳出并强制终结当前循环体。"}
        ],
        "quizList": [
            {
                "question": "ループ処理における「break」の役割として正しいものはどれですか？",
                "questionZh": "在循环控制中，“break”语句的效用是什么？",
                "options": ["次の周回へスキップする", "プログラム自体を終了する", "ループ処理をその場で強制終了する", "エラーを発生させる"],
                "answerIdx": 2,
                "hint": "ループ処理を完全に終わらせて外に抜けます / 瞬间打断并彻底终结当前循环的全部后续动作。"
            }
        ],
        "pdfPage": 162,
        "pdfHighlightTerm": "break"
    },
    {
        "id": 29,
        "chapterId": 6,
        "chapterName": "第6章 繰り返し処理",
        "subSectionId": "6-5",
        "subSectionName": "ループ制御 continue (kurikaeshi16.py ~ kurikaeshi18.py)",
        "titleJa": "continue文による次の周回へのスキップ",
        "titleZh": "使用 continue 语句跳过本次迭代",
        "conceptJa": "<h3>continue文</h3><p><code>continue</code> 文が実行されると、今回の周回の残りの処理をスキップして、<strong>次の周回の判定（ループの先頭）</strong>へ進みます。ループ全体を抜ける <code>break</code> との違いをしっかりと理解しましょう。</p>",
        "conceptZh": "<h3>continue 跳过单次</h3><p>当在循环体内执行到 <code>continue</code> 时，计算机会瞬间**放弃执行它下方缩进区内尚未执行的代码**，而是像按了快速传送键一样，直接飞回循环的头部开始下一轮的条件判断和循环动作。请注意与 break 的区别。</p>",
        "analogy": "⏭️ `continue` 就像是排队打疫苗，轮到某人时发现他没有带表格，医生说“你先别打了，下一位（continue）！”，这个人离开，排在他后面的人继续上前接受检查。",
        "files": ["c06/kurikaeshi16.py", "c06/kurikaeshi17.py", "c06/kurikaeshi18.py"],
        "vocabList": [
            {"ja": "continue", "zh": "continue关键字", "desc": "【考点】用于跳过当前这一轮循环中剩余的代码，直接开始新的一轮。"}
        ],
        "quizList": [
            {
                "question": "breakとcontinueの違いについて正しいものはどれですか？",
                "questionZh": "关于 break 与 continue 的差异，以下哪种说法是正确的？",
                "options": [
                    "breakはループを完全に抜け、continueは次の周に進む",
                    "continueはループを完全に抜け、breakは次の周に進む",
                    "両者ともにループを抜け出す動作は同じである",
                    "breakはエラー時に使い、continueは正常時に使う"
                ],
                "answerIdx": 0,
                "hint": "breakは完全終了、continueは1回スキップです / break是彻底告退，continue只是本轮摸鱼跳过、下轮照干。"
            }
        ],
        "pdfPage": 166,
        "pdfHighlightTerm": "continue"
    },

    # === Chapter 7 ===
    {
        "id": 30,
        "chapterId": 7,
        "chapterName": "第7章 関数",
        "subSectionId": "7-1",
        "subSectionName": "関数の基本定義 (kansu01.py ~ kansu05.py)",
        "titleJa": "defによる関数の定義と呼び出し",
        "titleZh": "使用 def 关键字声明与调用函数",
        "conceptJa": "<h3>関数の基本</h3><p>複数の処理を1つにまとめた独立したプログラム単位を<strong>関数（function）</strong>と呼びます。<code>def 関数名():</code> と記述して中身をインデントして定義し、<code>関数名()</code> で実行（呼び出し）します。</p>",
        "conceptZh": "<h3>函数的基本声明</h3><p>将一组反复要用到的关联操作打包封装在一起的独立代码模块，被称为<strong>函数（function）</strong>。通过 <code>def 函数名():</code> 进行定义，编写缩进功能块，需要使用时直接调用 <code>函数名()</code> 即可运行。</p>",
        "analogy": "🧱 函数就像是工厂的“独立加工车间”。一旦建造好（def定义），你不需要知道车间里怎么运作，只要拍一下车间的门（调用），它就会自动跑一遍流水线。",
        "files": ["c07/kansu01.py", "c07/kansu02.py", "c07/kansu03.py", "c07/kansu04.py", "c07/kansu05.py"],
        "vocabList": [
            {"ja": "関数 (Function)", "zh": "函数", "desc": "【考点】具有特定功能的代码块。通过 def 定义，提高代码的复用性。"},
            {"ja": "def", "zh": "def关键字", "desc": "【考点】用于开始定义函数的专属关键字，英文 define（定义）的缩写。"}
        ],
        "quizList": [
            {
                "question": "Pythonで新しい関数を定義し始めるために用いるキーワードはどれですか？",
                "questionZh": "在Python中，为了开始定义一个函数，应该使用哪个关键字？",
                "options": ["function", "def", "func", "define"],
                "answerIdx": 1,
                "hint": "define の略である def を使用します / 使用缩写 def 关键字。"
            }
        ],
        "pdfPage": 178,
        "pdfHighlightTerm": "def"
    },
    {
        "id": 31,
        "chapterId": 7,
        "chapterName": "第7章 関数",
        "subSectionId": "7-2",
        "subSectionName": "引数を持つ関数 (kansu06.py ~ kansu10.py)",
        "titleJa": "関数へのパラメータ(引数)の受け渡し",
        "titleZh": "向函数传递参数（引数）",
        "conceptJa": "<h3>関数の引数</h3><p>関数を呼び出す際に、外部から関数に渡す情報を<strong>引数（ひきすう / parameter）</strong>と呼びます。<code>def cook(food):</code> のように括弧内に入力用の変数名を定義します。</p>",
        "conceptZh": "<h3>函数的参数传递</h3><p>在调用函数时，我们从外面塞进函数内部加工的原材料和信息被称为<strong>参数（日语称为：引数 / ひきすう）</strong>。在 <code>def cook(食材):</code> 定义的括号内，我们会规定接收哪些原材料变量。</p>",
        "analogy": "🧃 函数参数就像是自动榨汁机上方的“投料口”：你从外面扔进去橙子，榨汁机就会给你榨橙汁；你扔进去苹果，它就会榨出苹果汁。",
        "files": ["c07/kansu06.py", "c07/kansu07.py", "c07/kansu09.py", "c07/kansu10.py"],
        "vocabList": [
            {"ja": "引数 (ひきすう)", "zh": "参数/引数", "desc": "【考点】调用函数时传进函数体内部提供支持计算的数据变量。"}
        ],
        "quizList": [
            {
                "question": "「def show(name):」と定義された関数を実行するために「show('Alice')」と呼ぶとき、「'Alice'」は何と呼ばれますか？",
                "questionZh": "定义有“def show(name):”，在执行时调用“show('Alice')”，这里的“'Alice'”被称为函数的什么？",
                "options": ["引数（パラメータ）", "戻り値（リターン）", "ローカル変数", "グローバル変数"],
                "answerIdx": 0,
                "hint": "関数に渡される値のことです / 指被传入函数的数据，称为参数（引数）。"
            }
        ],
        "pdfPage": 185,
        "pdfHighlightTerm": "引数"
    },
    {
        "id": 32,
        "chapterId": 7,
        "chapterName": "第7章 関数",
        "subSectionId": "7-3",
        "subSectionName": "戻り値を持つ関数 (kansu11.py ~ kansu15.py)",
        "titleJa": "return文による関数の戻り値",
        "titleZh": "使用 return 语句输出函数的返回值",
        "conceptJa": "<h3>関数の戻り値</h3><p>関数内の処理結果を呼び出し元に返す仕組みを<strong>戻り値（返り値 / return value）</strong>と呼びます。関数の中で <code>return 値</code> を実行すると、関数はその値を手土産として持って呼び出し元に戻ります。</p>",
        "conceptZh": "<h3>函数的返回值</h3><p>将函数内部算完得到的成果传输出去交给外面调用的语法被称为<strong>返回值（戻り値 / 返り値）</strong>。在函数体内使用 <code>return 结果</code> 指令，函数就会抱着这个结果回到被调用的地方。",
        "analogy": "🏧 返回值就像是自动柜员机：你插卡输密码（参数输入），机器在内部进行一系列数据验证和算账，最后从出钞口吐出来的纸钞就是“返回值”。",
        "files": ["c07/kansu11.py", "c07/kansu12.py", "c07/kansu13.py", "c07/kansu14.py", "c07/kansu15.py"],
        "vocabList": [
            {"ja": "戻り値 (返り値)", "zh": "返回值", "desc": "【考点】函数计算结果的回传信息。使用 return 返回，执行 return 时函数运行会当即结束。"},
            {"ja": "return", "zh": "return关键字", "desc": "【考点】用于指定函数的返回值并退出函数。"}
        ],
        "quizList": [
            {
                "question": "関数から呼び出し元に値を戻すために使用するキーワードはどれですか？",
                "questionZh": "为了将函数结果回传给外部调用处，应该使用哪个关键字？",
                "options": ["output", "send", "return", "back"],
                "answerIdx": 2,
                "hint": "returnキーワードを使って値を返します / 使用 return 关键字带回结果。"
            }
        ],
        "pdfPage": 192,
        "pdfHighlightTerm": "return"
    },
    {
        "id": 33,
        "chapterId": 7,
        "chapterName": "第7章 関数",
        "subSectionId": "7-4",
        "subSectionName": "引数のデフォルト値と応用 (kansu16.py ~ kansu20.py)",
        "titleJa": "引数のデフォルト設定とキーワード引数",
        "titleZh": "默认参数值与关键字参数传递",
        "conceptJa": "<h3>デフォルト引数</h3><p>関数の定義時に <code>def greet(name='ゲスト'):</code> のように初期値を設定しておくと、呼び出し時に引数を省略した場合はその初期値（デフォルト値）が自動的に適用されます。</p>",
        "conceptZh": "<h3>默认参数</h3><p>在定义函数时，我们可以写成 <code>def greet(name='嘉宾'):</code> 为参数预设初始值。如果调用时没有填入这个参数，程序就会自动把预设的默认值带入使用。</p>",
        "analogy": "🍔 默认参数就像是去快餐店买汉堡套餐，配菜默认给你可乐和薯条（默认值）。如果你自己指定要换成雪碧，服务员才会给你换成雪碧（传递实参）。",
        "files": ["c07/kansu16.py", "c07/kansu17.py", "c07/kansu18.py", "c07/kansu19.py", "c07/kansu20.py"],
        "vocabList": [
            {"ja": "デフォルト値", "zh": "默认值/缺省值", "desc": "【考点】定义参数时赋予的初始值。省略时作为兜底使用。"}
        ],
        "quizList": [
            {
                "question": "「def show(x=10): print(x)」に対して「show()」を呼び出すと何が表示されますか？",
                "questionZh": "对于函数“def show(x=10): print(x)”，调用“show()”后控制台会显示什么？",
                "options": ["None", "0", "10", "エラー（引数不足）"],
                "answerIdx": 2,
                "hint": "引数を省略した場合は、デフォルト値の10が使われます / 省略实参时，会采用预设的默认值 10。"
            }
        ],
        "pdfPage": 198,
        "pdfHighlightTerm": "デフォルト"
    },
    {
        "id": 34,
        "chapterId": 7,
        "chapterName": "第7章 関数",
        "subSectionId": "7-5",
        "subSectionName": "ローカル変数とインデント注意 (kansu_a1.py)",
        "titleJa": "変数のスコープと関数内のインデント",
        "titleZh": "变量作用域与函数缩进规范",
        "conceptJa": "<h3>変数のスコープとバグ</h3><p>関数の中で定義された変数は、その関数の中からしかアクセスできません。これを<strong>ローカル変数</strong>と呼びます。関数外でその変数を使おうとすると <code>NameError</code> になるため注意しましょう。</p>",
        "conceptZh": "<h3>局部变量与作用域</h3><p>在函数内部创建并定义的变量，仅能在这个函数的内部代码块里被读写。这被称为<strong>局部变量（ローカル変数）</strong>。如果试图在函数体外部去获取局部变量，程序会报错 <code>NameError</code>（变量名未定义错误）。</p>",
        "analogy": "🔒 局部变量就像是“公司办公室内部的保密电脑”：只有在办公室里工作的人（函数内部）才能看；出了办公室，外面的路人一律不知道也摸不到这台电脑。",
        "files": ["c07/kansu_a1.py"],
        "vocabList": [
            {"ja": "ローカル変数", "zh": "局部变量", "desc": "【考点】声明在函数内部、只在函数体内生效的变量。"},
            {"ja": "NameError", "zh": "变量名未定义错误", "desc": "【考点】访问了一个不存在、拼写错或者已经超出了作用域（Scope）无法触达的变量名。"}
        ],
        "quizList": [
            {
                "question": "次のコードの実行結果はどうなりますか？\ndef test():\n    val = 100\ntest()\nprint(val)",
                "questionZh": "运行以下代码的结果是什么？\ndef test():\n    val = 100\ntest()\nprint(val)",
                "options": ["100", "0", "None", "NameError（エラー）"],
                "answerIdx": 3,
                "hint": "val は test関数内のローカル変数なので、関数の外からは参照できません / val是局部变量，出了函数后就被销毁，外面拿不到。"
            }
        ],
        "pdfPage": 202,
        "pdfHighlightTerm": "ローカル変数"
    },

    # === Chapter 8 ===
    {
        "id": 35,
        "chapterId": 8,
        "chapterName": "第8章 クラス",
        "subSectionId": "8-1",
        "subSectionName": "クラスの定義と属性 (class01.py / class02.py)",
        "titleJa": "classによる設計図の作成とメンバ変数",
        "titleZh": "使用 class 编写设计图与类的属性",
        "conceptJa": "<h3>クラスの基本</h3><p>オブジェクトを生成するための設計図を<strong>クラス（class）</strong>と呼びます。<code>class クラス名:</code> のように定義し、その中に持たせたいデータである<strong>インスタンス変数（属性）</strong>を定義します。</p>",
        "conceptZh": "<h3>类的定义与属性</h3><p>用于在程序中大批量生产同类型实体对象的蓝本和设计图被称为<strong>类（class）</strong>。以 <code>class 类名:</code> 格式进行声明，可以在其内部绑定各种需要维护的特征数据，这被称为<strong>实例变量或属性（属性 / メンバ変数）</strong>。</p>",
        "analogy": "📐 类就像是汽车工厂里的“3D打印工程图纸”，而实例（对象）则是根据这张图纸实际打印并造出来的、能上路行驶的一辆辆“实体小轿车”。",
        "files": ["c08/class01.py", "c08/class02.py"],
        "vocabList": [
            {"ja": "クラス (Class)", "zh": "类", "desc": "【考点】面向对象编程的基石，用于规定对象结构与动作的模板。"},
            {"ja": "インスタンス変数", "zh": "实例变量/属性", "desc": "【考点】隶属于特定对象自身的变量。通过 self.变量名 来存取。"}
        ],
        "quizList": [
            {
                "question": "Pythonでクラスを定義するために用いるキーワードはどれですか？",
                "questionZh": "在Python中，为了开始定义一个类，应该使用哪个关键字？",
                "options": ["def", "class", "object", "struct"],
                "answerIdx": 1,
                "hint": "classキーワードを使用します / 使用 class 关键字进行类声明。"
            }
        ],
        "pdfPage": 210,
        "pdfHighlightTerm": "クラス"
    },
    {
        "id": 36,
        "chapterId": 8,
        "chapterName": "第8章 クラス",
        "subSectionId": "8-2",
        "subSectionName": "コンストラクタとメソッド (class03.py / class04.py)",
        "titleJa": "初期化子 __init__ とインスタンスメソッド",
        "titleZh": "构造方法 __init__ 与实例方法的编写",
        "conceptJa": "<h3>__init__ とメソッド</h3><p>クラスからオブジェクトを作成する際に、自動的に実行される初期化用メソッドを<strong>コンストラクタ</strong>（Pythonでは <code>__init__</code> メソッド）と呼びます。第1引数には常にインスタンス自身を指す <code>self</code> を指定します。また、クラス内に記述する関数を<strong>メソッド</strong>と呼びます。</p>",
        "conceptZh": "<h3>初始化与实例方法</h3><p>在调用类生产新对象时，计算机会自动率先执行一段设置默认值的特殊方法，这称为构造器（初始化子），在 Python 中命名为 <code>__init__</code>。<strong>其第一个参数必须是代表对象自身的 <code>self</code></strong>。而在类内部定义的、供对象调用的函数被称为<strong>方法（method）</strong>。</p>",
        "analogy": "🤖 `__init__` 就像是机器人刚出厂时刷入的“出厂默认设定程序”：开机第一秒设定它的名字（self.name）、电量。而 `self` 就像机器人说话时的“我自己”。",
        "files": ["c08/class03.py", "c08/class04.py"],
        "vocabList": [
            {"ja": "__init__メソッド", "zh": "初始化器/构造方法", "desc": "【考点】双下划线开头的特殊初始化函数，用于对象实例化时自动进行成员变量赋值。"},
            {"ja": "self", "zh": "self参数", "desc": "【考点】指代当前对象实例自身的参数变量。必须作为类内部方法的第一个参数。"}
        ],
        "quizList": [
            {
                "question": "Pythonのクラスメソッド定義において、メソッドの第一引数に必ず記述する必要がある変数はどれですか？",
                "questionZh": "在Python的类内部方法定义时，首个参数必须声明为什么变量名？",
                "options": ["this", "cls", "self", "me"],
                "answerIdx": 2,
                "hint": "インスタンス自身を指す self を記述します / 使用 self 表示自身实体的代称。"
            }
        ],
        "pdfPage": 218,
        "pdfHighlightTerm": "__init__"
    },

    # === Chapter 9 ===
    {
        "id": 37,
        "chapterId": 9,
        "chapterName": "第9章 モジュールとパッケージ",
        "subSectionId": "9-1",
        "subSectionName": "モジュールの作成とインポート (my_func.py / script.py)",
        "titleJa": "自作Pythonファイルをモジュールとして取り込む",
        "titleZh": "导入自定义 Python 文件为模块",
        "conceptJa": "<h3>モジュールの利用</h3><p>Pythonコードが書かれた独立した <code>.py</code> ファイルを<strong>モジュール</strong>と呼びます。<code>import モジュール名</code> を実行することで、他のファイルで定義された関数やクラスを自分のコード内に取り込んで再利用することができます。</p>",
        "conceptZh": "<h3>导入模块</h3><p>一个独立的 <code>.py</code> 代码文件在 Python 中就被称为一个<strong>模块（module）</strong>。通过 <code>import 模块文件名</code> 语句，我们能直接拉取并执行别的文件里写好的函数或类，实现代码的异地复用。</p>",
        "analogy": "🔌 模块就像是“可拔插的拓展外接显卡”：当你觉得电脑性能不够（需要特定功能），你不需要自己组装显卡，直接买一块插上去（import）就能用了。",
        "files": ["c09/my_func.py", "c09/my_class.py", "c09/calc_account.py", "c09/script.py"],
        "vocabList": [
            {"ja": "モジュール (Module)", "zh": "模块", "desc": "【考点】以 .py 结尾的Python代码文件。使用 import 导入。"},
            {"ja": "import", "zh": "import关键字", "desc": "【考点】引入其他模块或包的核心指令。"}
        ],
        "quizList": [
            {
                "question": "「my_lib.py」に書かれた関数をインポートするための正しい記述はどれですか？",
                "questionZh": "要导入写在文件“my_lib.py”中的功能，正确的语句是哪一个？",
                "options": ["include my_lib", "import my_lib", "using my_lib", "require my_lib"],
                "answerIdx": 1,
                "hint": "拡張子 .py を除いたファイル名を import で指定します / 去除后缀名 .py 后使用 import 关键字导入。"
            }
        ],
        "pdfPage": 230,
        "pdfHighlightTerm": "import"
    },
    {
        "id": 38,
        "chapterId": 9,
        "chapterName": "第9章 モジュールとパッケージ",
        "subSectionId": "9-2",
        "subSectionName": "パッケージの基本 (sample/my_class.py / script_package01.py)",
        "titleJa": "パッケージディレクトリと __init__.py",
        "titleZh": "包文件夹与初始化文件 __init__.py",
        "conceptJa": "<h3>パッケージとは</h3><p>複数のモジュール（ファイル）を整理して格納したフォルダを<strong>パッケージ</strong>と呼びます。パッケージとなるフォルダ内には、そのパッケージが初期化される際に動く <code>__init__.py</code> という特別なファイルを置くルールがあります。</p>",
        "conceptZh": "<h3>包的定义与结构</h3><p>将多个模块（代码文件）分门别类整理存放的物理文件夹被称为<strong>包（package）</strong>。一个合法的包文件夹内部，通常应当包含一个名为 <code>__init__.py</code> 的特殊文件，用于指示 Python 在引入该包时进行初始化设置。</p>",
        "analogy": "📦 模块就像是散装的书；而包就像是“装满书的纸箱”。箱子里第一页的装箱明细单就是 `__init__.py`，教你如何开箱取书。",
        "files": ["c09/sample/__init__.py", "c09/sample/my_class.py", "c09/sample/my_func.py", "c09/script_package01.py", "c09/script_package02.py"],
        "vocabList": [
            {"ja": "パッケージ (Package)", "zh": "包", "desc": "【考点】包含 __init__.py 的文件夹，是模块的集合目录。"},
            {"ja": "__init__.py", "zh": "包初始化文件", "desc": "【考点】包目录下的必需文件。在导入包时最先被静默执行。"}
        ],
        "quizList": [
            {
                "question": "Pythonのパッケージとしてフォルダを認識させるために、フォルダ内に作成する必要がある特殊なファイル名はどれですか？",
                "questionZh": "为了让 Python 将某个文件夹识别为一个可导入的包，文件夹下必须创建什么名字的特殊文件？",
                "options": ["main.py", "__init__.py", "config.txt", "package.json"],
                "answerIdx": 1,
                "hint": "アンダースコア2つで囲まれた init ファイルです / 用双下划线包裹的 init.py 文件。"
            }
        ],
        "pdfPage": 238,
        "pdfHighlightTerm": "__init__"
    },
    {
        "id": 39,
        "chapterId": 9,
        "chapterName": "第9章 モジュールとパッケージ",
        "subSectionId": "9-3",
        "subSectionName": "パッケージの応用インポート (script_package03.py ~ script_package05.py)",
        "titleJa": "fromを用いた特定メンバのインポートとエイリアス",
        "titleZh": "使用 from 导入特定成员与 as 别名",
        "conceptJa": "<h3>高度なインポート</h3><p>モジュール名.関数名 と書くのが長い場合、<code>from モジュール名 import 関数名</code> と記述すると、モジュール名を省略して関数を使えます。また <code>as</code> を使って <code>import library as lib</code> のように別名（エイリアス）を設定することもできます。</p>",
        "conceptZh": "<h3>高级导入语法</h3><p>如果不希望每次都写出长长的“模块名.方法名”，可以使用 <code>from 模块名 import 函数名</code>，这样就能省略前缀直接用。此外还可以通过 <code>as</code> 指令为长名字设置好读好写的缩写代称，例如 <code>import library as lib</code>。</p>",
        "analogy": "🏷️ `as` 就像是外号：你的中文名叫“爱新觉罗·玄烨”（长类名），你让别人直接叫你的英文简称“KangXi”（别名 as），方便称呼。",
        "files": ["c09/script_package03.py", "c09/script_package04.py", "c09/script_package05.py", "c09/sample/sub1/sub2/__init__.py", "c09/sample/sub1/sub2/my_func.py"],
        "vocabList": [
            {"ja": "from", "zh": "from关键字", "desc": "【考点】定位数据来源模块，配合 import 使用以跳过冗长的前缀输入。"},
            {"ja": "as", "zh": "as关键字/别名", "desc": "【考点】重命名导入的模块或函数以简化拼写，避免命名冲突。"}
        ],
        "quizList": [
            {
                "question": "「import pandas as pd」としたとき、pandas内のread_csv関数を呼び出すための記述はどれですか？",
                "questionZh": "使用“import pandas as pd”后，调用 pandas 内 read_csv 函数的简易写法是哪一个？",
                "options": ["pandas.read_csv()", "pd.read_csv()", "read_csv()", "pd::read_csv()"],
                "answerIdx": 1,
                "hint": "設定した別名 pd に置き換えて呼び出します / 将模块名替换成设置好的别名 pd。"
            }
        ],
        "pdfPage": 245,
        "pdfHighlightTerm": "as"
    },

    # === Chapter 10 ===
    {
        "id": 40,
        "chapterId": 10,
        "chapterName": "第10章 標準ライブラリ",
        "subSectionId": "10-1",
        "subSectionName": "datetimeによる日付と時刻 (hiduke01.py ~ hiduke06.py)",
        "titleJa": "日付・時刻データの操作とdatetimeモジュール",
        "titleZh": "日期与时间数据的获取与 datetime 模块",
        "conceptJa": "<h3>日付と時刻の操作</h3><p>Pythonで日付や時刻を扱うには、標準ライブラリの <code>datetime</code> モジュールを使用します。<code>datetime.now()</code> を呼び出すと、現在の日時オブジェクトを素早く取得できます。</p>",
        "conceptZh": "<h3>获取与操作日期时间</h3><p>在 Python 中要获取或操作时间数据，我们依靠标准库附带的 <code>datetime</code> 模块。直接调用 <code>datetime.now()</code> 可以快速抓取当前精准系统时间的年月日及分秒对象。</p>",
        "analogy": "📅 `datetime` 模块就像是计算机内部的“多功能万年历”，你可以向它询问今天是几号，或者生成指定时间点的虚拟日历卡片。",
        "files": ["c10/hiduke01.py", "c10/hiduke02.py", "c10/hiduke03.py", "c10/hiduke04.py", "c10/hiduke05.py", "c10/hiduke06.py"],
        "vocabList": [
            {"ja": "datetimeモジュール", "zh": "datetime模块", "desc": "【考点】用于解析、计算和格式化显示日期与时间的标准库模块。"}
        ],
        "quizList": [
            {
                "question": "Pythonのdatetimeモジュールで、現在のローカル日時を取得する関数はどれですか？",
                "questionZh": "在 Python 的 datetime 模块中，用于获取当前本地日期时间的方法是哪个？",
                "options": ["datetime.today()", "datetime.now()", "datetime.current()", "datetime.present()"],
                "answerIdx": 1,
                "hint": "now()関数を使って現在の瞬間を取得します / 使用 now() 方法返回当前的年月日时间。"
            }
        ],
        "pdfPage": 255,
        "pdfHighlightTerm": "datetime"
    },
    {
        "id": 41,
        "chapterId": 10,
        "chapterName": "第10章 標準ライブラリ",
        "subSectionId": "10-2",
        "subSectionName": "日付の計算と書式化 (hiduke07.py ~ hiduke12.py)",
        "titleJa": "日時の引き算とstrftimeによる文字列変換",
        "titleZh": "时间跨度计算与 strftime 格式化输出",
        "conceptJa": "<h3>日時の計算とフォーマット</h3><p>日付同士を引き算すると、時間差を表す <code>timedelta</code> オブジェクトが得られます。また、日時オブジェクトを任意の文字列形式（例: <code>2026/06/04</code>）で出力したい場合は <code>strftime()</code> メソッドを使用します。</p>",
        "conceptZh": "<h3>时间的加减法与格式输出</h3><p>对两个 datetime 日期进行减法运算，会产生一个表示时间差段的 <code>timedelta</code> 实例。若想把日期对象以个性化的格式（如 <code>2026/06/04</code>）转为文本打印，使用 <code>strftime()</code> 函数进行转换格式。</p>",
        "analogy": "⏰ 日期减法得出来的 `timedelta` 就像是“倒计时沙漏”，记录的不是具体日期，而是“还剩下 10 天”这段持续的时间差。",
        "files": ["c10/hiduke07.py", "c10/hiduke08.py", "c10/hiduke09.py", "c10/hiduke10.py", "c10/hiduke11.py", "c10/hiduke12.py"],
        "vocabList": [
            {"ja": "timedelta", "zh": "时间差对象", "desc": "【考点】表示两个日期或时间之间的物理跨度。"},
            {"ja": "strftime()", "zh": "strftime方法", "desc": "【考点】String Format Time。将日期格式化输出为可读字符串（如 %Y-%m-%d 表示年-月-日）。"}
        ],
        "quizList": [
            {
                "question": "datetimeオブジェクトを「2026-06-04」のような年-月-日の形式の文字列に変換するために使う書式指定子で正しいものはどれですか？",
                "questionZh": "要将 datetime 日期对象转换成“2026-06-04”形式的字符串，strftime 应该传入什么格式化代号？",
                "options": ["%Y-%m-%d", "%y-%M-%D", "%Year-%Month-%Day", "%Y/%m/%d"],
                "answerIdx": 0,
                "hint": "4桁の西暦年は %Y、2桁の月は %m、日は %d を使用します / 四位年是大写 %Y，两位月是小写 %m，日是小写 %d。"
            }
        ],
        "pdfPage": 262,
        "pdfHighlightTerm": "strftime"
    },
    {
        "id": 42,
        "chapterId": 10,
        "chapterName": "第10章 標準ライブラリ",
        "subSectionId": "10-3",
        "subSectionName": "randomモジュールによる乱数 (ransu01.py ~ ransu03.py)",
        "titleJa": "ランダム値の生成とリストのシャッフル",
        "titleZh": "随机数生成与洗牌乱序",
        "conceptJa": "<h3>乱数の生成</h3><p>不規則な値（乱数）を生成するには <code>random</code> モジュールを使用します。</p><ul><li><code>random.random()</code>：0.0以上1.0未満の小数</li><li><code>random.randint(a, b)</code>：a以上b以下の整数</li><li><code>random.shuffle(リスト)</code>：リストの要素順をランダムに並べ替え</li></ul>",
        "conceptZh": "<h3>随机数与洗牌功能</h3><p>生成随机和不可预测的数值，依靠 <code>random</code> 模块：</p><ul><li><code>random.random()</code>：生成 0.0 到 1.0 之间的随机小数。</li><li><code>random.randint(a, b)</code>：生成 a 到 b 之间（含两端）的随机整数。</li><li><code>random.shuffle(列表)</code>：直接将列表里的元素物理顺序完全打乱（洗牌）。</li></ul>",
        "analogy": "🎲 `randint(1, 6)` 就像是在桌上掷一个标准的“六面色子”，随机落地得到一个 1 到 6 的整数。",
        "files": ["c10/ransu01.py", "c10/ransu02.py", "c10/ransu03.py"],
        "vocabList": [
            {"ja": "randomモジュール", "zh": "random模块", "desc": "【考点】用于数学随机计算的内置标准库。"},
            {"ja": "shuffle()", "zh": "shuffle方法", "desc": "【考点】对传入的可变序列（如列表）进行就地无序打乱的洗牌操作。"}
        ],
        "quizList": [
            {
                "question": "「random.randint(1, 10)」が生成する整数の範囲として正しいものはどれですか？",
                "questionZh": "“random.randint(1, 10)”生成整数的正确取值范围是什么？",
                "options": ["1以上10未満", "1以上10以下（10を含む）", "0以上10未満", "2以上9以下"],
                "answerIdx": 1,
                "hint": "randint(a, b)は右端のbも含むため、1から10までの値がランダムで出ます / randint 和 range 不同，它包括右边界的 10。"
            }
        ],
        "pdfPage": 270,
        "pdfHighlightTerm": "randint"
    },

    # === Chapter 11 ===
    {
        "id": 43,
        "chapterId": 11,
        "chapterName": "第11章 ファイル操作",
        "subSectionId": "11-1",
        "subSectionName": "ファイルの存在確認と書込 (arunashi01.py / kakikomi01.py ~ kakikomi03.py)",
        "titleJa": "ファイル書き込みとos.path.exists",
        "titleZh": "文件写入与检测路径是否存在",
        "conceptJa": "<h3>ファイルの書き込み</h3><p>ファイルにデータを書き出すには <code>open('ファイル名', 'w', encoding='utf-8')</code> でファイルを開きます。<code>write()</code> メソッドで文字を書き込み、最後は必ず <code>close()</code> でファイルを閉じます。<code>os.path.exists()</code> を使うと、指定ファイルがディスク上に存在するか事前に判定できます。</p>",
        "conceptZh": "<h3>文件的写入与路径检测</h3><p>将程序数据存入硬盘文件：使用 <code>open('文件名', 'w', encoding='utf-8')</code> 以写模式打开文件，通过 <code>write()</code> 写入文本内容。**操作完毕必须使用 <code>close()</code> 关闭释放句柄**。配合 <code>os.path.exists()</code> 可提前探知目标路径是否存在。</p>",
        "analogy": "💾 写入文件就像是去图书馆借了本空白登记薄来填写：你必须先在柜台“借出并翻开”（open w），拿起笔“写字”（write），写完后必须“合上并还给柜台”（close），别人才能再次读写它。",
        "files": ["c11/arunashi01.py", "c11/kakikomi01.py", "c11/kakikomi02.py", "c11/kakikomi03.py"],
        "vocabList": [
            {"ja": "open()", "zh": "open函数", "desc": "【考点】开启文件通道的函数。'w' 代表覆盖写入模式，'r' 代表只读，'a' 代表追加。"},
            {"ja": "close()", "zh": "close方法", "desc": "【考点】关闭已开启的文件指针通道，向磁盘提交所有缓存以防内容丢失。"}
        ],
        "quizList": [
            {
                "question": "ファイルを書き込みモード（新規作成・上書き）で開くときのモード指定子はどれですか？",
                "questionZh": "以“写入模式（创建/覆盖）”打开文件时，open 的第二个参数（模式字符）应该写什么？",
                "options": ["'r'", "'w'", "'a'", "'x'"],
                "answerIdx": 1,
                "hint": "writeの頭文字である 'w' を使用します / 使用 write 的首字母 'w' 表示写模式。"
            }
        ],
        "pdfPage": 280,
        "pdfHighlightTerm": "open"
    },
    {
        "id": 44,
        "chapterId": 11,
        "chapterName": "第11章 ファイル操作",
        "subSectionId": "11-2",
        "subSectionName": "ファイルの読込基本 (yomikomi01.py ~ yomikomi03.py)",
        "titleJa": "readとreadlinesによるファイル読み込み",
        "titleZh": "使用 read 和 readlines 读入文件",
        "conceptJa": "<h3>ファイルの読み込み</h3><p>ファイルを読み込むには <code>open()</code> を <code>'r'</code>（読み込みモード）で開きます。</p><ul><li><code>read()</code>：ファイル全体を1つの大きな文字列として読み込む</li><li><code>readlines()</code>：各行を要素とするリストとして一行ずつ読み込む</li></ul>",
        "conceptZh": "<h3>文件的读取操作</h3><p>将硬盘文件里的字符加载到程序中：使用只读模式 <code>'r'</code> 打开文件：</p><ul><li><code>read()</code>：一口气把整个文件的所有内容全部打包成一个长字符串读入。</li><li><code>readlines()</code>：将文件的每一行作为独立成员，生成并返回一个列表。</li></ul>",
        "analogy": "📖 `read()` 就像是一口气读完整本小说，在大脑里留下整篇印象；`readlines()` 就像是把小说一页一页撕下来，装进一个标了页号的塑料夹（列表）里供你查看。",
        "files": ["c11/yomikomi01.py", "c11/yomikomi02.py", "c11/yomikomi03.py"],
        "vocabList": [
            {"ja": "readlines()", "zh": "readlines方法", "desc": "【考点】按行读取文件，返回包含各行字符串的列表。每行末尾保留换行符 \\n。"}
        ],
        "quizList": [
            {
                "question": "ファイルの全内容を行ごとのリストとして読み出すメソッドはどれですか？",
                "questionZh": "将文件的全部内容直接读取并按行返回为“列表”格式的方法是哪一个？",
                "options": ["read()", "readline()", "readlines()", "split()"],
                "answerIdx": 2,
                "hint": "複数形の s が付いている readlines メソッドを使用します / 使用带复数 s 后缀的 readlines() 方法。"
            }
        ],
        "pdfPage": 288,
        "pdfHighlightTerm": "readlines"
    },
    {
        "id": 45,
        "chapterId": 11,
        "chapterName": "第11章 ファイル操作",
        "subSectionId": "11-3",
        "subSectionName": "with文による安全なクローズ (yomikomi01_with.py / sample.txt)",
        "titleJa": "with文による自動closeファイル処理",
        "titleZh": "利用 with 语句实现文件自动关闭",
        "conceptJa": "<h3>with文のメリット</h3><p>ファイル処理の途中でエラーが起きると <code>close()</code> が実行されず、ファイルが開きっぱなしになる危険があります。</p><p><code>with open(...) as f:</code> と記述すると、ブロックを抜けた際（エラー発生時も含む）に<strong>自動的にファイルをクローズ</strong>してくれるため、安全で簡潔なコードになります。</p>",
        "conceptZh": "<h3>with 语句的妙用</h3><p>如果普通的读写中途发生故障报错，程序崩溃会导致 <code>close()</code> 无法被触发执行，这会造成系统句柄被强占开辟。</p><p>使用 <code>with open(...) as f:</code> 语法，Python 能够确保**在代码离开 with 块时（哪怕由于报错崩溃），自动帮我们将文件关闭释放**，安全防损，也是行业公认的最佳实践规范。</p>",
        "analogy": "🛡️ `with` 就像是一个带有“红外线感应安全防夹装置的电子闸门”，无论你是正常走出来，还是摔倒被抬出来，门在检测到你离开后，都绝对会自动稳稳锁上门。",
        "files": ["c11/yomikomi01_with.py", "c11/sample.txt"],
        "vocabList": [
            {"ja": "with文", "zh": "with语句", "desc": "【考点】上下文管理器。用于管理各种必须最终妥善释放的系统资源，确保自动执行关闭。"}
        ],
        "quizList": [
            {
                "question": "with文を使用してファイルを開いた場合、ファイルのクローズ処理（close）はどうなりますか？",
                "questionZh": "当使用 with 语句打开并操作文件时，关于文件关闭（close()）处理的描述正确的是？",
                "options": [
                    "手動で f.close() を呼ぶ必要がある",
                    "ブロックを抜けると自動的にクローズされる",
                    "クローズ処理自体が不要になる",
                    "エラー時のみ手動で呼ぶ"
                ],
                "answerIdx": 1,
                "hint": "with文のブロックを抜けた瞬間に自動的に f.close() が呼び出されます / 离开with作用域的那一刻，Python后台会自动静默执行关闭。"
            }
        ],
        "pdfPage": 292,
        "pdfHighlightTerm": "with"
    },
    {
        "id": 46,
        "chapterId": 11,
        "chapterName": "第11章 ファイル操作",
        "subSectionId": "11-4",
        "subSectionName": "パッケージ構造でのファイルアクセス (sample/openfile.py)",
        "titleJa": "別ディレクトリからの相対パスアクセス",
        "titleZh": "跨文件夹目录下的文件相对路径存取",
        "conceptJa": "<h3>パスの扱い</h3><p>プログラムからファイルを読み込む際、実行ディレクトリとターゲットファイルの相対的な位置関係（パス）が重要です。実行場所によって参照先がズレる危険を理解しましょう。</p>",
        "conceptZh": "<h3>相对路径与运行位置</h3><p>在跨文件夹进行模块调用读写文件时，定位目标文本相对路径（Relative Path）会受到当前命令终端执行目录（Cwd）的直接牵连。需在代码中注意定位逻辑。</p>",
        "analogy": "📍 这就像是你给送快递的留下一张纸条写着“直走10米有一间便利店（相对路径）”：如果快递员是在你的写字楼看纸条，直走是前台；如果他是在校门口看纸条，直走就走进了人工湖。",
        "files": ["c11/sample/openfile.py"],
        "vocabList": [
            {"ja": "相対パス", "zh": "相对路径", "desc": "【考点】相对于当前执行位置（而不是从 C: 盘根目录开始）的路径。"}
        ],
        "quizList": [
            {
                "question": "プログラムを実行する場所（カレントディレクトリ）を変更すると、相対パスで記述したファイル読み込みはどうなりますか？",
                "questionZh": "改变了程序的运行执行路径（当前工作目录）后，代码中写死的“相对路径”读写文件操作会怎么样？",
                "options": ["自動的に正しい場所に補正される", "ファイルが見つからずエラー（FileNotFoundError）になる可能性がある", "絶対パスに変換される", "問題なく同じファイルを指し続ける"],
                "answerIdx": 1,
                "hint": "カレントディレクトリ起点で相対パスが解決されるため、エラーになることがあります / 相对路径是以执行工作路径为起点解析的，换地方跑容易找不到文件。"
            }
        ],
        "pdfPage": 298,
        "pdfHighlightTerm": "パス"
    },

    # === Chapter 12 ===
    {
        "id": 47,
        "chapterId": 12,
        "chapterName": "第12章 正規表現",
        "subSectionId": "12-1",
        "subSectionName": "正規表現の基本 re.search (seiki01.py ~ seiki05.py)",
        "titleJa": "reモジュールと文字パターンの検索",
        "titleZh": "re 模块与基本的正则模式检索",
        "conceptJa": "<h3>正規表現の基本</h3><p>複雑な文字列のパターン（例: 数字3桁-4桁）を指定して検索する仕組みを<strong>正規表現（Regular Expression）</strong>と呼びます。Pythonでは <code>re</code> モジュールをインポートし、<code>re.search(パターン, 文字列)</code> でマッチするか調べます。行頭を表す <code>^</code> や行末を表す <code>$</code> などを使用します。</p>",
        "conceptZh": "<h3>正则检索与匹配判断</h3><p>用于在海量字符串中匹配并抓取特定构成规则数据（例如：三位数字-四位数字）的模板式语法被称为<strong>正则表达式（Regular Expression）</strong>。在 Python 中引入 <code>re</code> 模块，调用 <code>re.search(正则, 文本)</code> 进行匹配。<code>^</code> 匹配开头，<code>$</code> 匹配结尾。</p>",
        "analogy": "🔍 正则表达式就像是“通缉画像特征单”：你不指定具体的坏人名字，只写“左眉有一颗痣，身高180（特征模式）”，警官就会对照着去抓符合该特征的所有可疑人员。",
        "files": ["c12/seiki01.py", "c12/seiki02.py", "c12/seiki03.py", "c12/seiki04.py", "c12/seiki05.py"],
        "vocabList": [
            {"ja": "reモジュール", "zh": "re模块", "desc": "【考点】Python中处理正则表达式搜索、替换、分割的核心标准库。"},
            {"ja": "re.search()", "zh": "search方法", "desc": "【考点】在整段文本中扫描匹配指定正则规则，若找到第一个匹配即返回 Match 对象，找不到返回 None。"}
        ],
        "quizList": [
            {
                "question": "正規表現において、文字列の「先頭」とマッチさせるためのメタ文字はどれですか？",
                "questionZh": "在正则表达式语法中，用于锚定匹配“字符串开头”的元字符是哪个？",
                "options": ["$", "^", "*", "+"],
                "answerIdx": 1,
                "hint": "ハット記号（キャレット）を使用します / 使用脱字符（^）。"
            }
        ],
        "pdfPage": 310,
        "pdfHighlightTerm": "re.search"
    },
    {
        "id": 48,
        "chapterId": 12,
        "chapterName": "第12章 正規表現",
        "subSectionId": "12-2",
        "subSectionName": "メタ文字と繰り返し表現 (seiki06.py ~ seiki10.py)",
        "titleJa": "ワイルドカードと繰り返し・文字クラス",
        "titleZh": "通配符、重复运算符与字符集范围",
        "conceptJa": "<h3>メタ文字と量指定子</h3><p>正規表現の代表的な記号です。</p><ul><li><code>.</code>：任意の1文字</li><li><code>*</code>：直前のパターンの0回以上の繰り返し</li><li><code>+</code>：直前のパターンの1回以上の繰り返し</li><li><code>[a-z]</code>：aからzまでの任意のアルファベット1文字</li><li><code>\d</code>：任意の数字1文字</li></ul>",
        "conceptZh": "<h3>元字符与重复数量词</h3><p>正则表达式的核心量词与规则字符：</p><ul><li><code>.</code>：匹配除换行符以外的任意单个字符。</li><li><code>*</code>：匹配前面的正则模式重复 0 次及以上。</li><li><code>+</code>：匹配前面的正则模式重复 1 次及以上（至少1次）。</li><li><code>[a-z]</code>：代表任意一个 a 到 z 范围内的英文字母。</li><li><code>\d</code>：匹配任意一位十进制数字（同 [0-9]）。</li></ul>",
        "analogy": "🎰 `+` 就像是游戏里的“至少连击一次”（1,2,3次都行，0次不行），而 `*` 则是“连击多次或者干脆没打出来都算成立”。",
        "files": ["c12/seiki06.py", "c12/seiki07.py", "c12/seiki08.py", "c12/seiki09.py", "c12/seiki10.py"],
        "vocabList": [
            {"ja": "メタ文字", "zh": "元字符", "desc": "【考点】在正则中被赋予了特殊控制功能（如代表范围、位置或数量）的符号。"},
            {"ja": "\\d", "zh": "数字匹配符", "desc": "【考点】反斜杠+d，等价于匹配任意一个 0-9 范围内的整数。"}
        ],
        "quizList": [
            {
                "question": "正規表現パターン「ab+」にマッチする文字列はどれですか？",
                "questionZh": "对于正则表达式模式“ab+”，以下哪一个字符串能够被成功匹配？",
                "options": ["a", "ac", "abbb", "a.b"],
                "answerIdx": 2,
                "hint": "bが「1回以上繰り返される」必要があります / b必须出现至少一次（或多次），如 ab、abb、abbb等。"
            }
        ],
        "pdfPage": 318,
        "pdfHighlightTerm": "メタ文字"
    },
    {
        "id": 49,
        "chapterId": 12,
        "chapterName": "第12章 正規表現",
        "subSectionId": "12-3",
        "subSectionName": "実用的な正規表現マッチ (seiki11.py ~ seiki13.py)",
        "titleJa": "郵便番号やメールアドレスのパターンチェック",
        "titleZh": "邮政编码与电子邮件地址的格式校验",
        "conceptJa": "<h3>実務に役立つパターン</h3><p>実務で頻出する入力バリデーションのパターン例です。</p><ul><li>郵便番号（3桁-4桁）: <code>^\d{3}-\d{4}$</code></li><li>電話番号（例）: <code>^\d{2,4}-\d{2,4}-\d{4}$</code></li><li>繰り返し回数を直接指定する場合は <code>{数}</code> または <code>{最小, 最大}</code> を使用します。</li></ul>",
        "conceptZh": "<h3>实战校验正则表达式</h3><p>在日常工作与开发中最高频出现的格式合理性拦截校验正则：</p><ul><li>邮政编码（三位-四位数字）：<code>^\d{3}-\d{4}$</code></li><li>电话号码：<code>^\d{2,4}-\d{2,4}-\d{4}$</code></li><li>如果限制出现次数，写成 <code>{具体次数}</code> 或 <code>{最少, 最多}</code>，例如 <code>\d{3}</code> 限定连写三位数字。</li></ul>",
        "analogy": "🔒 网页注册时的“邮箱格式不合法报错”就是后台有一个正则表达式过滤器，看你填写的文本里有没有包含类似 `@` 和 `.` 以及合理的域名格式。",
        "files": ["c12/seiki11.py", "c12/seiki12.py", "c12/seiki13.py"],
        "vocabList": [
            {"ja": "バリデーション", "zh": "格式合法性验证", "desc": "【考点】使用正则检测用户的录入数据是否合法（防范越界或注入安全隐患）。"}
        ],
        "quizList": [
            {
                "question": "「\\d{3}-\\d{4}」という正規表現がマッチする文字列として最も適切なものはどれですか？",
                "questionZh": "正则表达式“\\d{3}-\\d{4}”最适合匹配以下哪一个字符串？",
                "options": ["12-34567", "123-4567", "abc-defg", "1234-567"],
                "answerIdx": 1,
                "hint": "数字3桁、ハイフン、数字4桁の並びです / 3位数字、连字符、4位数字的顺序排列。"
            }
        ],
        "pdfPage": 325,
        "pdfHighlightTerm": "バリデーション"
    },
    {
        "id": 50,
        "chapterId": 12,
        "chapterName": "第12章 正規表現",
        "subSectionId": "12-4",
        "subSectionName": "ファイルデータへの正規表現適用 (seiki14.py ~ seiki16.py)",
        "titleJa": "ファイル内文字列の一括正規表現マッチ",
        "titleZh": "在读取文件数据时进行批量正则筛选",
        "conceptJa": "<h3>ファイル操作と正規表現</h3><p>ファイルを読み込んだ中身のデータに対して、行ごとに <code>re.search()</code> を適用することで、ファイル内から特定のパターンに合致する特定の行だけを抽出して表示することが可能です。</p>",
        "conceptZh": "<h3>文件与正则联手筛选</h3><p>将文件读取（file read）与正则匹配结合：逐行读入文本，对每一行使用 <code>re.search()</code> 校验。如果发现匹配，就把该行数据打印出来，起到批量过滤或日志提取的作用。</p>",
        "analogy": "🗃️ 相当于把一个厚重的文件夹（数据文件）放进自动检索机，机器以每秒万行的速度高速通读（readlines 循环），只帮你把带有“红色印章（正则匹配）”的文件抽取出来给你看。",
        "files": ["c12/seiki14.py", "c12/seiki14_sep.py", "c12/seiki15.py", "c12/seiki15_sep.py", "c12/seiki16.py", "c12/seiki16_sep.py", "c12/sub01/aaa.txt", "c12/sub01/sub02/bbb.txt", "c12/sub01/sub02/sub03/ccc.txt", "c12/test-result.txt"],
        "vocabList": [
            {"ja": "ログ抽出", "zh": "日志提取过滤", "desc": "【考点】在大容量文本或日志中，利用正则筛选特定操作或报错行（如包含 ERROR[0-9]{3} 的行）的技术。"}
        ],
        "quizList": [
            {
                "question": "ファイルから1行ずつ読み込みながら正規表現で検索し、マッチした行のみを出力したい。この時のループ処理として最も一般的な構成はどれですか？",
                "questionZh": "要在逐行读取文件时，利用正则匹配并仅打印匹配行。最标准的代码框架是哪一个？",
                "options": [
                    "for line in file: inside check with re.search",
                    "file.read() inside while loop",
                    "re.match() directly on file object",
                    "try...except directly on open()"
                ],
                "answerIdx": 0,
                "hint": "ファイルをforループで回すと1行ずつ取り出すことができ、そこでre.search()をかけます / 遍历文件对象可以逐行拿到文本，在此处挂载 re.search 进行过滤。"
            }
        ],
        "pdfPage": 332,
        "pdfHighlightTerm": "ログ"
    },

    # === Chapter 13 ===
    {
        "id": 51,
        "chapterId": 13,
        "chapterName": "第13章 例外処理",
        "subSectionId": "13-1",
        "subSectionName": "例外処理の基本 try-except (reigai01.py ~ reigai04.py)",
        "titleJa": "プログラム実行時エラーとtry-except",
        "titleZh": "运行期错误与 try-except 异常捕获",
        "conceptJa": "<h3>例外処理の基本</h3><p>プログラム実行中に発生するエラーを<strong>例外（exception）</strong>と呼びます。例外が発生すると通常プログラムは強制終了します。</p><p>これを防ぎ、安全にエラー処理を行うには <code>try</code> ブロックの中に通常処理を書き、<code>except</code> ブロックの中にエラー発生時の逃げ道処理を記述します。</p>",
        "conceptZh": "<h3>异常捕获基础 try-except</h3><p>程序在运行期间遭遇的致命错误被称为<strong>异常（exception）</strong>。如果不做处理，异常会引发程序直接被迫中断终止。</p><p>为了避免闪退，我们要使用 <code>try-except</code> 保护机制：将有可能报错的敏感操作写在 <code>try:</code> 块内，将一旦发生错误时的善后补救方案写在 <code>except:</code> 块中。</p>",
        "analogy": "🧗 捕获异常就像是攀岩运动员身上绑着的“安全保护绳”：如果正常攀爬（try）没有失误一切顺利；如果一旦脚踩空滑倒坠落（发生报错），保护绳（except）会瞬间锁死拉住你，不让你摔在地上（程序不会闪退崩溃）。",
        "files": ["c13/reigai01.py", "c13/reigai02.py", "c13/reigai03.py", "c13/reigai04.py"],
        "vocabList": [
            {"ja": "例外 (Exception)", "zh": "异常/运行期错误", "desc": "【考点】运行中发生的故障，如除以 0、文件不存在、数组越界等。"},
            {"ja": "try-except文", "zh": "异常捕获控制结构", "desc": "【考点】捕获并处理异常的安全防护结构。"}
        ],
        "quizList": [
            {
                "question": "Pythonの例外処理において、エラーが発生したときに実行させたいコードブロックを指定するキーワードはどれですか？",
                "questionZh": "在 Python 的异常捕获中，用于承接“发生报错时需要处理的善后逻辑”的关键字是哪个？",
                "options": ["catch", "except", "error", "handle"],
                "answerIdx": 1,
                "hint": "JavaやC#では catch ですが、Pythonでは except キーワードを使用します / Java等使用catch，Python独树一帜使用 except 关键字。"
            }
        ],
        "pdfPage": 344,
        "pdfHighlightTerm": "例外処理"
    },
    {
        "id": 52,
        "chapterId": 13,
        "chapterName": "第13章 例外処理",
        "subSectionId": "13-2",
        "subSectionName": "エラーの種類と個別キャッチ (reigai05.py ~ reigai08.py)",
        "titleJa": "特定の例外クラスと個別の分岐処理",
        "titleZh": "捕获特定异常类实现精确防范",
        "conceptJa": "<h3>特定のエラーのキャッチ</h3><p>エラーには <code>ZeroDivisionError</code>（0除算）、<code>ValueError</code>（無効な数値変換）、<code>IndexError</code>（リスト範囲外指定）などの種類があります。<code>except ValueError:</code> のように指定することで、エラーの種類に応じて個別の処理を記述できます。</p>",
        "conceptZh": "<h3>分类捕获具体异常</h3><p>Python 拥有许多不同类型的异常名，如 <code>ZeroDivisionError</code>（除以0）、<code>ValueError</code>（类型转换失败，如把字母转int）、<code>IndexError</code>（列表越界）。写成 <code>except ValueError:</code> 就可以对症下药，针对不同报错实施不同的急救措施。</p>",
        "analogy": "🏥 这就像是医院的分科会诊：被毒蛇咬伤送进“蛇毒专科”（except ValueError），吃坏肚子送进“消化内科”（except ZeroDivisionError）。",
        "files": ["c13/reigai05.py", "c13/reigai06.py", "c13/reigai07.py", "c13/reigai08.py"],
        "vocabList": [
            {"ja": "ZeroDivisionError", "zh": "零除错误", "desc": "【考点】数值计算中被除数分母设定为了 0 触发的错误。"},
            {"ja": "ValueError", "zh": "数值/参数内容错误", "desc": "【考点】传入了类型正确但值不合法的参数。如 int('abc') 无法转换为整数。"}
        ],
        "quizList": [
            {
                "question": "「int('abc')」を実行した時に発生する代表的な例外エラーの種類はどれですか？",
                "questionZh": "运行“int('abc')”强转失败时，Python 抛出的具体异常类名是哪一个？",
                "options": ["ZeroDivisionError", "IndexError", "ValueError", "TypeError"],
                "answerIdx": 2,
                "hint": "無効な値（文字列）を変換しようとしたため ValueError が発生します / 强转不合规范的数值文本时触发 ValueError。"
            }
        ],
        "pdfPage": 352,
        "pdfHighlightTerm": "ValueError"
    },
    {
        "id": 53,
        "chapterId": 13,
        "chapterName": "第13章 例外処理",
        "subSectionId": "13-3",
        "subSectionName": "finallyブロックと意図的な例外発生 raise (reigai09.py ~ reigai11.py)",
        "titleJa": "finallyによる必ず通る処理とraiseの利用",
        "titleZh": "必须执行的 finally 块与 raise 主动抛出异常",
        "conceptJa": "<h3>finally と raise</h3><p>例外の発生有無に関わらず、最後に<strong>必ず実行したい処理</strong>がある場合は <code>finally:</code> ブロックを使用します。ファイルクローズ処理などに便利です。また、<code>raise</code> キーワードを使うと、意図的にエラー（例外）を自ら発生させることができます。</p>",
        "conceptZh": "<h3>无论如何都运行的 finally 与 raise</h3><p>无论 `try` 块内是否发生崩溃，都**必须百分百保证最终被强制执行**的安全清场善后代码写在 <code>finally:</code> 块中（常用于关闭文件或连接）。而使用 <code>raise</code> 关键字可以主动抛出一个异常，诱发程序报错中断。</p>",
        "analogy": "🚪 `finally` 就像是公司下班清扫：“无论今天营业额大赚（正常结束）还是停电火灾紧急疏散（异常报错），出门前都必须把电源总闸给拉断（finally强制清理）”。",
        "files": ["c13/reigai09.py", "c13/reigai10.py", "c13/reigai11.py"],
        "vocabList": [
            {"ja": "finally", "zh": "finally块", "desc": "【考点】无论异常发生与否，一定会被保障触发执行的末端结构。"},
            {"ja": "raise", "zh": "raise关键字", "desc": "【考点】用于在代码中手动并故意扔出一个异常报错，以强制抛出逻辑异常。"}
        ],
        "quizList": [
            {
                "question": "例外処理において、エラーの発生有無に関係なく、必ず最後に実行させたいコードブロックを示すキーワードはどれですか？",
                "questionZh": "在异常捕获语法中，用于包裹“无论报错与否都必须绝对执行完毕”的代码块的关键字是？",
                "options": ["else", "except", "finally", "ensure"],
                "answerIdx": 2,
                "hint": "最後に実行される「finally」を使用します / 使用 finally 宣告末端必定执行块。"
            }
        ],
        "pdfPage": 358,
        "pdfHighlightTerm": "finally"
    }
]

# We need to construct the full examples content dynamically
samples_dir = 'python_lessons_extracted/samples'

print("Loading raw files and building JSON...")
for lesson in lessons_metadata:
    # Read each file and combine them
    combined_code = ""
    for rel_path in lesson["files"]:
        full_path = os.path.join(samples_dir, rel_path)
        if os.path.isfile(full_path):
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                combined_code += f"# === {rel_path} ===\n"
                combined_code += content + "\n\n"
            except Exception as e:
                print(f"Error reading {full_path}: {e}")
        else:
            print(f"WARNING: File {full_path} not found!")
    
    lesson["example"] = combined_code.strip()
    # Add book metadata
    lesson["book"] = "Pythonの基本"
    # Wait, let's map book to "Python基礎" or "Pythonの基本" depending on the chapter if needed, but since it is a unified curriculum, "Pythonの基本" / "Python基础" is perfect.
    lesson["bookZh"] = "Python基础"
    # Add simple originalChapterId mapping
    lesson["originalChapterId"] = f"python-c{lesson['chapterId']}"
    # Remove temporary 'files' field
    del lesson["files"]

# Save as python_lessons.js
output_path = 'python_lessons.js'
js_content = "const PYTHON_LESSONS = " + json.dumps(lessons_metadata, ensure_ascii=False, indent=2) + ";\n"

with open(output_path, 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(js_content)

print(f"Successfully generated {output_path} with {len(lessons_metadata)} granular lessons.")
