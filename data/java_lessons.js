const JAVA_LESSONS = [
  {
    "id": 1,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 1,
    "chapterName": "第1章 Java言語に触れる",
    "subSectionId": "1-1",
    "subSectionName": "1-1 プログラムとは",
    "section": "入門編 第1章 Java言語に触れる",
    "titleJa": "プログラムとは",
    "titleZh": "什么是程序",
    "conceptJa": "<h3>プログラムとは</h3>\n<p>コンピュータに「何をするか」を命令する手順書のことです。日常生活のレシピや料理手順書と同じように、コンピュータはプログラムに書かれた命令を上から順番に実行します。</p>\n<p>プログラムを書くための専用言語を<strong>プログラミング言語</strong>と言い、Javaはその代表的な一つです。</p>\n\n",
    "conceptZh": "<h3>什么是程序</h3>\n<p>什么是程序是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.4）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "☕ Java就像一个备受赞誉的“全语种翻译官”：你用Java语言编写的代码在任何平台上都能无缝演奏，极易学习！",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}",
    "vocabList": [
      {
        "term": "JVM",
        "zh": "Java虚拟机",
        "desc": "Java Virtual Machine。Javaのバイトコードを実行する仮想コンピュータ。"
      }
    ],
    "quizList": [
      {
        "question": "Javaプログラムの入り口（最初に実行されるメソッド）は何ですか？",
        "questionZh": "Java程序的入口（最先执行的方法）叫什么？",
        "options": [
          "class",
          "main",
          "public",
          "println"
        ],
        "answerIdx": 1,
        "hint": "プログラムはここから始まります / 程序从这里开始执行。"
      },
      {
        "question": "Javaプログラムでコメントを書くときに使う記号はどれですか？",
        "questionZh": "在Java中用于写单行注释的符号是什么？",
        "options": [
          "##",
          "//",
          "--",
          "**"
        ],
        "answerIdx": 1,
        "hint": "この記号から行末まではコンピュータが無視します / 计算机会忽略这个符号到行末的内容。"
      },
      {
        "question": "Javaの特徴として正しいものはどれですか？",
        "questionZh": "以下哪项是Java的特点？",
        "options": [
          "Windowsでしか動かない",
          "型がなく自由に変数が使える",
          "Write Once, Run Anywhere",
          "コンパイルが不要"
        ],
        "answerIdx": 2,
        "hint": "JVMのおかげで、複数のOSで同じプログラムが動きます / 因为有JVM，同一程序可在多个操作系统上运行。"
      }
    ],
    "pdfPage": 4,
    "pdfHighlightTerm": "プログラムとは",
    "originalChapterId": "nyumon-1"
  },
  {
    "id": 2,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 1,
    "chapterName": "第1章 Java言語に触れる",
    "subSectionId": "1-2",
    "subSectionName": "1-2 Javaの特徴",
    "section": "入門編 第1章 Java言語に触れる",
    "titleJa": "Javaの特徴",
    "titleZh": "Java的特点",
    "conceptJa": "<h3>Javaの特徴</h3>\n<ul>\n  <li><strong>プラットフォーム非依存</strong>：Javaで書いたプログラムは、WindowsでもMacでもLinuxでも動作します（「Write Once, Run Anywhere」）</li>\n  <li><strong>オブジェクト指向</strong>：現実世界の「もの（オブジェクト）」を模してプログラムを設計できます</li>\n  <li><strong>強い型付け</strong>：変数の種類（型）を厳密に決めるため、バグが少なくなります</li>\n  <li><strong>豊富なライブラリ</strong>：標準で多くの機能が付属しており、すぐに使えます</li>\n</ul>\n\n",
    "conceptZh": "<h3>Java的特点</h3>\n<ul>\n  <li><strong>跨平台性</strong>：Java写的程序在Windows、Mac、Linux上都能运行（\"一次编写，到处运行\"）</li>\n  <li><strong>面向对象</strong>：用「对象」来模拟现实世界中的事物来设计程序</li>\n  <li><strong>强类型语言</strong>：变量必须指定类型，减少错误</li>\n  <li><strong>丰富的类库</strong>：自带大量现成功能，直接可用</li>\n</ul>\n\n",
    "analogy": "☕ Java就像一个备受赞誉的“全语种翻译官”：你用Java语言编写的代码在任何平台上都能无缝演奏，极易学习！",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}",
    "vocabList": [
      {
        "term": "JVM",
        "zh": "Java虚拟机",
        "desc": "Java Virtual Machine。Javaのバイトコードを実行する仮想コンピュータ。"
      }
    ],
    "quizList": [
      {
        "question": "Javaプログラムの入り口（最初に実行されるメソッド）は何ですか？",
        "questionZh": "Java程序的入口（最先执行的方法）叫什么？",
        "options": [
          "class",
          "main",
          "public",
          "println"
        ],
        "answerIdx": 1,
        "hint": "プログラムはここから始まります / 程序从这里开始执行。"
      },
      {
        "question": "Javaプログラムでコメントを書くときに使う記号はどれですか？",
        "questionZh": "在Java中用于写单行注释的符号是什么？",
        "options": [
          "##",
          "//",
          "--",
          "**"
        ],
        "answerIdx": 1,
        "hint": "この記号から行末まではコンピュータが無視します / 计算机会忽略这个符号到行末的内容。"
      },
      {
        "question": "Javaの特徴として正しいものはどれですか？",
        "questionZh": "以下哪项是Java的特点？",
        "options": [
          "Windowsでしか動かない",
          "型がなく自由に変数が使える",
          "Write Once, Run Anywhere",
          "コンパイルが不要"
        ],
        "answerIdx": 2,
        "hint": "JVMのおかげで、複数のOSで同じプログラムが動きます / 因为有JVM，同一程序可在多个操作系统上运行。"
      }
    ],
    "pdfPage": 7,
    "pdfHighlightTerm": "Javaの特徴",
    "originalChapterId": "nyumon-1"
  },
  {
    "id": 3,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 1,
    "chapterName": "第1章 Java言語に触れる",
    "subSectionId": "1-3",
    "subSectionName": "1-3 Javaプログラムの基本構造",
    "section": "入門編 第1章 Java言語に触れる",
    "titleJa": "Javaプログラムの基本構造",
    "titleZh": "Java程序的基本结构",
    "conceptJa": "<h3>Javaプログラムの基本構造</h3>\n<p>最もシンプルなJavaプログラムはこのような形をしています：</p>\n<pre><code>class クラス名 {\n    public static void main(String[] args) {\n        // ここに処理を書く\n    }\n}</code></pre>\n<p>このように、Javaプログラムは必ず<strong>クラス</strong>の中に処理を書きます。<code>main</code>メソッドが、プログラムの入り口（エントリーポイント）です。</p>\n\n",
    "conceptZh": "<h3>Java程序的基本结构</h3>\n<p>最简单的Java程序长这样：</p>\n<pre><code>class 类名 {\n    public static void main(String[] args) {\n        // 在这里写处理逻辑\n    }\n}</code></pre>\n<p>Java程序必须写在<strong>类（class）</strong>中，<code>main</code>方法是程序的入口点，程序从这里开始执行。</p>\n\n",
    "analogy": "☕ Java就像一个备受赞誉的“全语种翻译官”：你用Java语言编写的代码在任何平台上都能无缝演奏，极易学习！",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}",
    "vocabList": [
      {
        "term": "クラス (class)",
        "zh": "类",
        "desc": "Javaプログラムの基本単位。データと処理をひとまとめにしたもの。"
      },
      {
        "term": "メソッド (method)",
        "zh": "方法/函数",
        "desc": "処理のまとまり（手順）。mainメソッドがプログラムの入り口。"
      },
      {
        "term": "JVM",
        "zh": "Java虚拟机",
        "desc": "Java Virtual Machine。Javaのバイトコードを実行する仮想コンピュータ。"
      }
    ],
    "quizList": [
      {
        "question": "Javaプログラムの入り口（最初に実行されるメソッド）は何ですか？",
        "questionZh": "Java程序的入口（最先执行的方法）叫什么？",
        "options": [
          "class",
          "main",
          "public",
          "println"
        ],
        "answerIdx": 1,
        "hint": "プログラムはここから始まります / 程序从这里开始执行。"
      },
      {
        "question": "Javaプログラムでコメントを書くときに使う記号はどれですか？",
        "questionZh": "在Java中用于写单行注释的符号是什么？",
        "options": [
          "##",
          "//",
          "--",
          "**"
        ],
        "answerIdx": 1,
        "hint": "この記号から行末まではコンピュータが無視します / 计算机会忽略这个符号到行末的内容。"
      },
      {
        "question": "Javaの特徴として正しいものはどれですか？",
        "questionZh": "以下哪项是Java的特点？",
        "options": [
          "Windowsでしか動かない",
          "型がなく自由に変数が使える",
          "Write Once, Run Anywhere",
          "コンパイルが不要"
        ],
        "answerIdx": 2,
        "hint": "JVMのおかげで、複数のOSで同じプログラムが動きます / 因为有JVM，同一程序可在多个操作系统上运行。"
      }
    ],
    "pdfPage": 4,
    "pdfHighlightTerm": "Javaプログラムの基本構造",
    "originalChapterId": "nyumon-1"
  },
  {
    "id": 4,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 1,
    "chapterName": "第1章 Java言語に触れる",
    "subSectionId": "1-4",
    "subSectionName": "1-4 コメント文",
    "section": "入門編 第1章 Java言語に触れる",
    "titleJa": "コメント文",
    "titleZh": "注释",
    "conceptJa": "<h3>コメント文</h3>\n<p><code>//</code>から行末までがコメント（注釈）です。コンピュータは実行時に無視するので、メモ書きとして使います。</p>\n<p>複数行のコメントは <code>/* ～ */</code> で囲みます。</p>\n\n",
    "conceptZh": "<h3>注释</h3>\n<p>注释是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.11）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "☕ Java就像一个备受赞誉的“全语种翻译官”：你用Java语言编写的代码在任何平台上都能无缝演奏，极易学习！",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 这是单行注释\n        /* 这是\n           多行注释 */\n        System.out.println(\"演示注释用法\");\n    }\n}",
    "vocabList": [
      {
        "term": "JVM",
        "zh": "Java虚拟机",
        "desc": "Java Virtual Machine。Javaのバイトコードを実行する仮想コンピュータ。"
      }
    ],
    "quizList": [
      {
        "question": "Javaプログラムの入り口（最初に実行されるメソッド）は何ですか？",
        "questionZh": "Java程序的入口（最先执行的方法）叫什么？",
        "options": [
          "class",
          "main",
          "public",
          "println"
        ],
        "answerIdx": 1,
        "hint": "プログラムはここから始まります / 程序从这里开始执行。"
      },
      {
        "question": "Javaプログラムでコメントを書くときに使う記号はどれですか？",
        "questionZh": "在Java中用于写单行注释的符号是什么？",
        "options": [
          "##",
          "//",
          "--",
          "**"
        ],
        "answerIdx": 1,
        "hint": "この記号から行末まではコンピュータが無視します / 计算机会忽略这个符号到行末的内容。"
      },
      {
        "question": "Javaの特徴として正しいものはどれですか？",
        "questionZh": "以下哪项是Java的特点？",
        "options": [
          "Windowsでしか動かない",
          "型がなく自由に変数が使える",
          "Write Once, Run Anywhere",
          "コンパイルが不要"
        ],
        "answerIdx": 2,
        "hint": "JVMのおかげで、複数のOSで同じプログラムが動きます / 因为有JVM，同一程序可在多个操作系统上运行。"
      }
    ],
    "pdfPage": 11,
    "pdfHighlightTerm": "コメント文",
    "originalChapterId": "nyumon-1"
  },
  {
    "id": 5,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 1,
    "chapterName": "第1章 Java言語に触れる",
    "subSectionId": "1-5",
    "subSectionName": "1-5 ブロックとインデント",
    "section": "入門編 第1章 Java言語に触れる",
    "titleJa": "ブロックとインデント",
    "titleZh": "代码块与缩进",
    "conceptJa": "<h3>ブロックとインデント</h3>\n<p><code>{</code>と<code>}</code>で囲まれた部分を<strong>ブロック</strong>と言います。ブロックの内側はインデント（字下げ）して読みやすくする慣習があります。</p>",
    "conceptZh": "<h3>代码块与缩进</h3>\n<p>代码块与缩进是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.10）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "☕ Java就像一个备受赞誉的“全语种翻译官”：你用Java语言编写的代码在任何平台上都能无缝演奏，极易学习！",
    "example": "public class Main {\n    public static void main(String[] args) {\n        {\n            System.out.println(\"这是内部块中的代码\");\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "JVM",
        "zh": "Java虚拟机",
        "desc": "Java Virtual Machine。Javaのバイトコードを実行する仮想コンピュータ。"
      }
    ],
    "quizList": [
      {
        "question": "Javaプログラムの入り口（最初に実行されるメソッド）は何ですか？",
        "questionZh": "Java程序的入口（最先执行的方法）叫什么？",
        "options": [
          "class",
          "main",
          "public",
          "println"
        ],
        "answerIdx": 1,
        "hint": "プログラムはここから始まります / 程序从这里开始执行。"
      },
      {
        "question": "Javaプログラムでコメントを書くときに使う記号はどれですか？",
        "questionZh": "在Java中用于写单行注释的符号是什么？",
        "options": [
          "##",
          "//",
          "--",
          "**"
        ],
        "answerIdx": 1,
        "hint": "この記号から行末まではコンピュータが無視します / 计算机会忽略这个符号到行末的内容。"
      },
      {
        "question": "Javaの特徴として正しいものはどれですか？",
        "questionZh": "以下哪项是Java的特点？",
        "options": [
          "Windowsでしか動かない",
          "型がなく自由に変数が使える",
          "Write Once, Run Anywhere",
          "コンパイルが不要"
        ],
        "answerIdx": 2,
        "hint": "JVMのおかげで、複数のOSで同じプログラムが動きます / 因为有JVM，同一程序可在多个操作系统上运行。"
      }
    ],
    "pdfPage": 10,
    "pdfHighlightTerm": "ブロックとインデント",
    "originalChapterId": "nyumon-1"
  },
  {
    "id": 6,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 1,
    "chapterName": "第1章 Java言語に触れる",
    "subSectionId": "1-E",
    "subSectionName": "1-E 演習問題 (课后练习)",
    "section": "入門編 第1章 Java言語に触れる",
    "titleJa": "演習：第1章の課題",
    "titleZh": "练习：第1章的课后练习",
    "conceptJa": "<h3>第1章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>画面に「Javaの学習を始めます！」と、自分の名前（例：「山田太郎」）の2行のテキストを出力するプログラムを作成してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第1章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>在 Main 类的 main 方法中，使用 `System.out.println()` 在控制台上输出两行文本：第一行输出你的名字，第二行输出“开始学习 Java 啦！”。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第1章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第1章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 11,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "nyumon-1"
  },
  {
    "id": 7,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 2,
    "chapterName": "第2章 Java言語の基本",
    "subSectionId": "2-1",
    "subSectionName": "2-1 変数とは",
    "section": "入門編 第2章 Java言語の基本",
    "titleJa": "変数とは",
    "titleZh": "什么是变量",
    "conceptJa": "<h3>変数とは</h3>\n<p>値を一時的に保存する「箱」のようなものです。箱には名前（変数名）と、入れられる値の種類（型）があります。</p>\n<p>変数を使う前に<strong>宣言</strong>が必要です：</p>\n<pre><code>型名 変数名;          // 宣言\n型名 変数名 = 値;     // 宣言と同時に初期化</code></pre>\n\n",
    "conceptZh": "<h3>什么是变量</h3>\n<p>什么是变量是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.21）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "📦 变量与数据类型是内存里的“置物架”：你需要把东西分类摆放好，并在架子外面贴上名字（变量名），贴上可放物品的尺寸说明（类型）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int age = 18;\n        System.out.println(\"年龄是: \" + age);\n    }\n}",
    "vocabList": [
      {
        "term": "変数 (variable)",
        "zh": "变量",
        "desc": "値を記憶するための名前付きの格納場所。"
      }
    ],
    "quizList": [
      {
        "question": "整数を扱うJavaの型はどれですか？",
        "questionZh": "Java中用于处理整数的类型是哪个？",
        "options": [
          "double",
          "boolean",
          "int",
          "String"
        ],
        "answerIdx": 2,
        "hint": "integer（整数）の略です / 是integer（整数）的缩写。"
      },
      {
        "question": "int型同士の計算 7 / 2 の結果はどれですか？",
        "questionZh": "int类型计算 7 / 2 的结果是什么？",
        "options": [
          "3.5",
          "3",
          "4",
          "エラー"
        ],
        "answerIdx": 1,
        "hint": "整数同士の割り算は小数点以下が切り捨てられます / 整数除法会截断小数部分。"
      },
      {
        "question": "文字列 \\",
        "questionZh": "字符串 \\",
        "options": [
          "HelloWorld",
          "Hello World",
          "Hello+World",
          "エラー"
        ],
        "answerIdx": 0,
        "hint": "Javaの+演算子は文字列同士を結合します / Java的+运算符可以连接字符串。"
      }
    ],
    "pdfPage": 21,
    "pdfHighlightTerm": "変数とは",
    "originalChapterId": "nyumon-2"
  },
  {
    "id": 8,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 2,
    "chapterName": "第2章 Java言語の基本",
    "subSectionId": "2-2",
    "subSectionName": "2-2 Javaの基本データ型",
    "section": "入門編 第2章 Java言語の基本",
    "titleJa": "Javaの基本データ型",
    "titleZh": "Java的基本数据类型",
    "conceptJa": "<h3>Javaの基本データ型</h3>\n<table border=\"1\" style=\"border-collapse:collapse;width:100%\">\n<tr><th>型名</th><th>内容</th><th>例</th></tr>\n<tr><td>int</td><td>整数（約±21億）</td><td>100, -5, 0</td></tr>\n<tr><td>double</td><td>小数点数（倍精度）</td><td>3.14, -2.5</td></tr>\n<tr><td>boolean</td><td>真偽値</td><td>true, false</td></tr>\n<tr><td>char</td><td>1文字</td><td>'A', 'あ'</td></tr>\n<tr><td>long</td><td>大きな整数</td><td>1000000000L</td></tr>\n<tr><td>String</td><td>文字列（クラス型）</td><td>\"Hello\"</td></tr>\n</table>\n\n",
    "conceptZh": "<h3>Java的基本数据类型</h3>\n<table border=\"1\" style=\"border-collapse:collapse;width:100%\">\n<tr><th>类型</th><th>说明</th><th>示例</th></tr>\n<tr><td>int</td><td>整数（约±21亿）</td><td>100, -5, 0</td></tr>\n<tr><td>double</td><td>小数（双精度浮点）</td><td>3.14, -2.5</td></tr>\n<tr><td>boolean</td><td>布尔值（真/假）</td><td>true, false</td></tr>\n<tr><td>char</td><td>单个字符</td><td>'A', 'あ'</td></tr>\n<tr><td>long</td><td>大整数</td><td>1000000000L</td></tr>\n<tr><td>String</td><td>字符串（类类型）</td><td>\"Hello\"</td></tr>\n</table>\n\n",
    "analogy": "📦 变量与数据类型是内存里的“置物架”：你需要把东西分类摆放好，并在架子外面贴上名字（变量名），贴上可放物品的尺寸说明（类型）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int i = 100;\n        double d = 99.9;\n        boolean b = true;\n        System.out.println(\"int=\" + i + \", double=\" + d + \", boolean=\" + b);\n    }\n}",
    "vocabList": [
      {
        "term": "データ型 (data type)",
        "zh": "数据类型",
        "desc": "変数に入れられる値の種類（int, double, String など）。"
      }
    ],
    "quizList": [
      {
        "question": "整数を扱うJavaの型はどれですか？",
        "questionZh": "Java中用于处理整数的类型是哪个？",
        "options": [
          "double",
          "boolean",
          "int",
          "String"
        ],
        "answerIdx": 2,
        "hint": "integer（整数）の略です / 是integer（整数）的缩写。"
      },
      {
        "question": "int型同士の計算 7 / 2 の結果はどれですか？",
        "questionZh": "int类型计算 7 / 2 的结果是什么？",
        "options": [
          "3.5",
          "3",
          "4",
          "エラー"
        ],
        "answerIdx": 1,
        "hint": "整数同士の割り算は小数点以下が切り捨てられます / 整数除法会截断小数部分。"
      },
      {
        "question": "文字列 \\",
        "questionZh": "字符串 \\",
        "options": [
          "HelloWorld",
          "Hello World",
          "Hello+World",
          "エラー"
        ],
        "answerIdx": 0,
        "hint": "Javaの+演算子は文字列同士を結合します / Java的+运算符可以连接字符串。"
      }
    ],
    "pdfPage": 17,
    "pdfHighlightTerm": "Javaの基本データ型",
    "originalChapterId": "nyumon-2"
  },
  {
    "id": 9,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 2,
    "chapterName": "第2章 Java言語の基本",
    "subSectionId": "2-3",
    "subSectionName": "2-3 算術演算子",
    "section": "入門編 第2章 Java言語の基本",
    "titleJa": "算術演算子",
    "titleZh": "算术运算符",
    "conceptJa": "<h3>算術演算子</h3>\n<ul>\n  <li><code>+</code> 加算　<code>-</code> 減算　<code>*</code> 乗算　<code>/</code> 除算　<code>%</code> 余り</li>\n  <li>整数同士の割り算は小数点以下が切り捨てられます：<code>7/2 = 3</code></li>\n  <li><code>++</code> インクリメント（1増加）　<code>--</code> デクリメント（1減少）</li>\n</ul>\n\n",
    "conceptZh": "<h3>算术运算符</h3>\n<ul>\n  <li><code>+</code>加法 <code>-</code>减法 <code>*</code>乘法 <code>/</code>除法 <code>%</code>取余</li>\n  <li>整数除法会丢弃小数部分：<code>7/2 = 3</code></li>\n  <li><code>++</code> 自增1，<code>--</code> 自减1</li>\n</ul>\n\n",
    "analogy": "📦 变量与数据类型是内存里的“置物架”：你需要把东西分类摆放好，并在架子外面贴上名字（变量名），贴上可放物品的尺寸说明（类型）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int result = 5 / 2;\n        System.out.println(\"5 / 2 = \" + result); // 结果为2\n        System.out.println(\"5.0 / 2 = \" + (5.0 / 2)); // 结果为2.5\n    }\n}",
    "vocabList": [
      {
        "term": "変数 (variable)",
        "zh": "变量",
        "desc": "値を記憶するための名前付きの格納場所。"
      },
      {
        "term": "データ型 (data type)",
        "zh": "数据类型",
        "desc": "変数に入れられる値の種類（int, double, String など）。"
      },
      {
        "term": "キャスト (cast)",
        "zh": "强制类型转换",
        "desc": "(型名) を付けて強制的に型を変換すること。例: (int) 3.7 → 3"
      },
      {
        "term": "インクリメント (++)",
        "zh": "自增",
        "desc": "変数の値を1増やす演算子。i++ または ++i と書く。"
      }
    ],
    "quizList": [
      {
        "question": "整数を扱うJavaの型はどれですか？",
        "questionZh": "Java中用于处理整数的类型是哪个？",
        "options": [
          "double",
          "boolean",
          "int",
          "String"
        ],
        "answerIdx": 2,
        "hint": "integer（整数）の略です / 是integer（整数）的缩写。"
      },
      {
        "question": "int型同士の計算 7 / 2 の結果はどれですか？",
        "questionZh": "int类型计算 7 / 2 的结果是什么？",
        "options": [
          "3.5",
          "3",
          "4",
          "エラー"
        ],
        "answerIdx": 1,
        "hint": "整数同士の割り算は小数点以下が切り捨てられます / 整数除法会截断小数部分。"
      },
      {
        "question": "文字列 \\",
        "questionZh": "字符串 \\",
        "options": [
          "HelloWorld",
          "Hello World",
          "Hello+World",
          "エラー"
        ],
        "answerIdx": 0,
        "hint": "Javaの+演算子は文字列同士を結合します / Java的+运算符可以连接字符串。"
      }
    ],
    "pdfPage": 26,
    "pdfHighlightTerm": "算術演算子",
    "originalChapterId": "nyumon-2"
  },
  {
    "id": 10,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 2,
    "chapterName": "第2章 Java言語の基本",
    "subSectionId": "2-4",
    "subSectionName": "2-4 型変換（キャスト）",
    "section": "入門編 第2章 Java言語の基本",
    "titleJa": "型変換（キャスト）",
    "titleZh": "类型转换（Cast）",
    "conceptJa": "<h3>型変換（キャスト）</h3>\n<p>異なる型を混ぜた計算では、自動的に大きい型へ変換されます（暗黙の型変換）。</p>\n<p>明示的に変換したい場合は<strong>キャスト演算子</strong>を使います：<code>(int) 3.7</code> → 3</p>\n\n",
    "conceptZh": "<h3>类型转换（Cast）</h3>\n<p>类型转换（Cast）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.166）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "📦 变量与数据类型是内存里的“置物架”：你需要把东西分类摆放好，并在架子外面贴上名字（变量名），贴上可放物品的尺寸说明（类型）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int i = 100;\n        double d = 99.9;\n        boolean b = true;\n        System.out.println(\"int=\" + i + \", double=\" + d + \", boolean=\" + b);\n    }\n}",
    "vocabList": [
      {
        "term": "キャスト (cast)",
        "zh": "强制类型转换",
        "desc": "(型名) を付けて強制的に型を変換すること。例: (int) 3.7 → 3"
      }
    ],
    "quizList": [
      {
        "question": "整数を扱うJavaの型はどれですか？",
        "questionZh": "Java中用于处理整数的类型是哪个？",
        "options": [
          "double",
          "boolean",
          "int",
          "String"
        ],
        "answerIdx": 2,
        "hint": "integer（整数）の略です / 是integer（整数）的缩写。"
      },
      {
        "question": "int型同士の計算 7 / 2 の結果はどれですか？",
        "questionZh": "int类型计算 7 / 2 的结果是什么？",
        "options": [
          "3.5",
          "3",
          "4",
          "エラー"
        ],
        "answerIdx": 1,
        "hint": "整数同士の割り算は小数点以下が切り捨てられます / 整数除法会截断小数部分。"
      },
      {
        "question": "文字列 \\",
        "questionZh": "字符串 \\",
        "options": [
          "HelloWorld",
          "Hello World",
          "Hello+World",
          "エラー"
        ],
        "answerIdx": 0,
        "hint": "Javaの+演算子は文字列同士を結合します / Java的+运算符可以连接字符串。"
      }
    ],
    "pdfPage": 166,
    "pdfHighlightTerm": "型変換（キャスト）",
    "originalChapterId": "nyumon-2"
  },
  {
    "id": 11,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 2,
    "chapterName": "第2章 Java言語の基本",
    "subSectionId": "2-5",
    "subSectionName": "2-5 Stringクラス（文字列）",
    "section": "入門編 第2章 Java言語の基本",
    "titleJa": "Stringクラス（文字列）",
    "titleZh": "String字符串",
    "conceptJa": "<h3>Stringクラス（文字列）</h3>\n<p><code>String</code>は文字列を扱うクラス型です。<code>+</code>演算子で文字列を連結できます。</p>\n<pre><code>String name = \"太郎\";\nSystem.out.println(\"こんにちは\" + name + \"さん\");</code></pre>\n\n",
    "conceptZh": "<h3>String字符串</h3>\n<p>String字符串是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.40）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "📦 变量与数据类型是内存里的“置物架”：你需要把东西分类摆放好，并在架子外面贴上名字（变量名），贴上可放物品的尺寸说明（类型）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        String name = \"Java\";\n        System.out.println(\"Hello, \" + name + \"!\");\n    }\n}",
    "vocabList": [
      {
        "term": "変数 (variable)",
        "zh": "变量",
        "desc": "値を記憶するための名前付きの格納場所。"
      },
      {
        "term": "データ型 (data type)",
        "zh": "数据类型",
        "desc": "変数に入れられる値の種類（int, double, String など）。"
      },
      {
        "term": "キャスト (cast)",
        "zh": "强制类型转换",
        "desc": "(型名) を付けて強制的に型を変換すること。例: (int) 3.7 → 3"
      },
      {
        "term": "インクリメント (++)",
        "zh": "自增",
        "desc": "変数の値を1増やす演算子。i++ または ++i と書く。"
      }
    ],
    "quizList": [
      {
        "question": "整数を扱うJavaの型はどれですか？",
        "questionZh": "Java中用于处理整数的类型是哪个？",
        "options": [
          "double",
          "boolean",
          "int",
          "String"
        ],
        "answerIdx": 2,
        "hint": "integer（整数）の略です / 是integer（整数）的缩写。"
      },
      {
        "question": "int型同士の計算 7 / 2 の結果はどれですか？",
        "questionZh": "int类型计算 7 / 2 的结果是什么？",
        "options": [
          "3.5",
          "3",
          "4",
          "エラー"
        ],
        "answerIdx": 1,
        "hint": "整数同士の割り算は小数点以下が切り捨てられます / 整数除法会截断小数部分。"
      },
      {
        "question": "文字列 \\",
        "questionZh": "字符串 \\",
        "options": [
          "HelloWorld",
          "Hello World",
          "Hello+World",
          "エラー"
        ],
        "answerIdx": 0,
        "hint": "Javaの+演算子は文字列同士を結合します / Java的+运算符可以连接字符串。"
      }
    ],
    "pdfPage": 40,
    "pdfHighlightTerm": "Stringクラス（文字列）",
    "originalChapterId": "nyumon-2"
  },
  {
    "id": 12,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 2,
    "chapterName": "第2章 Java言語の基本",
    "subSectionId": "2-6",
    "subSectionName": "2-6 エスケープシーケンス",
    "section": "入門編 第2章 Java言語の基本",
    "titleJa": "エスケープシーケンス",
    "titleZh": "转义字符",
    "conceptJa": "<h3>エスケープシーケンス</h3>\n<p>文字列内で特別な文字を表す方法：</p>\n<ul>\n  <li><code>\\\\n</code>：改行　<code>\\\\t</code>：タブ　<code>\\\\\"</code>：ダブルクォート　<code>\\\\\\\\</code>：バックスラッシュ</li>\n</ul>",
    "conceptZh": "<h3>转义字符</h3>\n<p>转义字符是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.19）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "📦 变量与数据类型是内存里的“置物架”：你需要把东西分类摆放好，并在架子外面贴上名字（变量名），贴上可放物品的尺寸说明（类型）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"换行:\\n第一行\\n第二行\");\n        System.out.println(\"制表符:\\tA\\tB\");\n    }\n}",
    "vocabList": [
      {
        "term": "変数 (variable)",
        "zh": "变量",
        "desc": "値を記憶するための名前付きの格納場所。"
      },
      {
        "term": "データ型 (data type)",
        "zh": "数据类型",
        "desc": "変数に入れられる値の種類（int, double, String など）。"
      },
      {
        "term": "キャスト (cast)",
        "zh": "强制类型转换",
        "desc": "(型名) を付けて強制的に型を変換すること。例: (int) 3.7 → 3"
      },
      {
        "term": "インクリメント (++)",
        "zh": "自增",
        "desc": "変数の値を1増やす演算子。i++ または ++i と書く。"
      }
    ],
    "quizList": [
      {
        "question": "整数を扱うJavaの型はどれですか？",
        "questionZh": "Java中用于处理整数的类型是哪个？",
        "options": [
          "double",
          "boolean",
          "int",
          "String"
        ],
        "answerIdx": 2,
        "hint": "integer（整数）の略です / 是integer（整数）的缩写。"
      },
      {
        "question": "int型同士の計算 7 / 2 の結果はどれですか？",
        "questionZh": "int类型计算 7 / 2 的结果是什么？",
        "options": [
          "3.5",
          "3",
          "4",
          "エラー"
        ],
        "answerIdx": 1,
        "hint": "整数同士の割り算は小数点以下が切り捨てられます / 整数除法会截断小数部分。"
      },
      {
        "question": "文字列 \\",
        "questionZh": "字符串 \\",
        "options": [
          "HelloWorld",
          "Hello World",
          "Hello+World",
          "エラー"
        ],
        "answerIdx": 0,
        "hint": "Javaの+演算子は文字列同士を結合します / Java的+运算符可以连接字符串。"
      }
    ],
    "pdfPage": 19,
    "pdfHighlightTerm": "エスケープシーケンス",
    "originalChapterId": "nyumon-2"
  },
  {
    "id": 13,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 2,
    "chapterName": "第2章 Java言語の基本",
    "subSectionId": "2-E",
    "subSectionName": "2-E 演習問題 (课后练习)",
    "section": "入門編 第2章 Java言語の基本",
    "titleJa": "演習：第2章の課題",
    "titleZh": "练习：第2章的课后练习",
    "conceptJa": "<h3>第2章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>Scannerを使用して、キーボードからあなたの年齢を入力させ、その値を元に「あなたは○才です」と出力するプログラムを完成させてください。（※Scannerのインポートを忘れないようにしましょう）</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第2章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>使用 Scanner 类，通过 `new Scanner(\"25\")` 模拟或用 System.in 接收一个键盘输入的年龄，并在屏幕上打印：“你的年龄是: ○ 岁”。不要忘记导包！</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第2章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第2章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 20,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "nyumon-2"
  },
  {
    "id": 14,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 3,
    "chapterName": "第3章 条件分岐と繰り返し",
    "subSectionId": "3-1",
    "subSectionName": "3-1 条件分岐（if文）",
    "section": "入門編 第3章 条件分岐と繰り返し",
    "titleJa": "条件分岐（if文）",
    "titleZh": "条件判断（if语句）",
    "conceptJa": "<h3>条件分岐（if文）</h3>\n<p>条件によって処理を分岐させます。</p>\n<pre><code>if (条件式) {\n    // 条件がtrueのとき実行\n} else if (別の条件) {\n    // 別の条件がtrueのとき\n} else {\n    // どれも当てはまらないとき\n}</code></pre>\n\n",
    "conceptZh": "<h3>条件判断（if语句）</h3>\n<p>条件判断（if语句）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.44）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🚦 流程控制与数组就像是“火车站的调度中心”：它决定了火车（执行流）是走 A 股道（if）、在回转线转圈（loop）、还是停靠在某个特定的车位（数组）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int score = 85;\n        if (score >= 90) {\n            System.out.println(\"优秀\");\n        } else {\n            System.out.println(\"合格或不合格\");\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "条件分岐 (conditional branch)",
        "zh": "条件分支",
        "desc": "条件が真か偽かによって実行する処理を切り替えること。"
      }
    ],
    "quizList": [
      {
        "question": "for(int i=0; i<3; i++) の繰り返し回数は？",
        "questionZh": "for(int i=0; i<3; i++) 会循环几次？",
        "options": [
          "2回",
          "3回",
          "4回",
          "無限"
        ],
        "answerIdx": 1,
        "hint": "i=0, i=1, i=2 の3回実行されます / i=0, i=1, i=2共3次。"
      },
      {
        "question": "break文の働きは何ですか？",
        "questionZh": "break语句的作用是什么？",
        "options": [
          "ループを一時停止する",
          "ループを途中で終了する",
          "次の繰り返しに飛ぶ",
          "プログラムを終了する"
        ],
        "answerIdx": 1,
        "hint": "continueは次の繰り返しにスキップ、breakは完全に抜け出します / continue跳到下次循环，break完全退出。"
      }
    ],
    "pdfPage": 44,
    "pdfHighlightTerm": "条件分岐（if文）",
    "originalChapterId": "nyumon-3"
  },
  {
    "id": 15,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 3,
    "chapterName": "第3章 条件分岐と繰り返し",
    "subSectionId": "3-2",
    "subSectionName": "3-2 関係演算子と論理演算子",
    "section": "入門編 第3章 条件分岐と繰り返し",
    "titleJa": "関係演算子と論理演算子",
    "titleZh": "关系运算符和逻辑运算符",
    "conceptJa": "<h3>関係演算子と論理演算子</h3>\n<table border=\"1\" style=\"border-collapse:collapse;width:100%\">\n<tr><th>演算子</th><th>意味</th><th>例</th></tr>\n<tr><td>==</td><td>等しい</td><td>a == b</td></tr>\n<tr><td>!=</td><td>等しくない</td><td>a != b</td></tr>\n<tr><td>&gt;, &lt;</td><td>大なり・小なり</td><td>a > b</td></tr>\n<tr><td>&amp;&amp;</td><td>かつ（AND）</td><td>a>0 &amp;&amp; b>0</td></tr>\n<tr><td>||</td><td>または（OR）</td><td>a>0 || b>0</td></tr>\n<tr><td>!</td><td>否定（NOT）</td><td>!isStudent</td></tr>\n</table>\n\n",
    "conceptZh": "<h3>关系运算符和逻辑运算符</h3>\n<table border=\"1\" style=\"border-collapse:collapse;width:100%\">\n<tr><th>运算符</th><th>含义</th><th>示例</th></tr>\n<tr><td>==</td><td>等于</td><td>a == b</td></tr>\n<tr><td>!=</td><td>不等于</td><td>a != b</td></tr>\n<tr><td>&gt;, &lt;</td><td>大于、小于</td><td>a > b</td></tr>\n<tr><td>&amp;&amp;</td><td>且（AND）</td><td>a>0 &amp;&amp; b>0</td></tr>\n<tr><td>||</td><td>或（OR）</td><td>a>0 || b>0</td></tr>\n<tr><td>!</td><td>非（NOT）</td><td>!isStudent</td></tr>\n</table>\n\n",
    "analogy": "🚦 流程控制与数组就像是“火车站的调度中心”：它决定了火车（执行流）是走 A 股道（if）、在回转线转圈（loop）、还是停靠在某个特定的车位（数组）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"循环演示\");\n    }\n}",
    "vocabList": [
      {
        "term": "条件分岐 (conditional branch)",
        "zh": "条件分支",
        "desc": "条件が真か偽かによって実行する処理を切り替えること。"
      },
      {
        "term": "ループ (loop)",
        "zh": "循环",
        "desc": "同じ処理を繰り返す仕組み。for, while, do-while がある。"
      },
      {
        "term": "配列 (array)",
        "zh": "数组",
        "desc": "同じ型のデータを連続して管理するデータ構造。インデックスで各要素にアクセス。"
      },
      {
        "term": "インデックス (index)",
        "zh": "下标/索引",
        "desc": "配列の各要素の位置を表す番号。0から始まる。"
      }
    ],
    "quizList": [
      {
        "question": "for(int i=0; i<3; i++) の繰り返し回数は？",
        "questionZh": "for(int i=0; i<3; i++) 会循环几次？",
        "options": [
          "2回",
          "3回",
          "4回",
          "無限"
        ],
        "answerIdx": 1,
        "hint": "i=0, i=1, i=2 の3回実行されます / i=0, i=1, i=2共3次。"
      }
    ],
    "pdfPage": 45,
    "pdfHighlightTerm": "関係演算子と論理演算子",
    "originalChapterId": "nyumon-3"
  },
  {
    "id": 16,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 3,
    "chapterName": "第3章 条件分岐と繰り返し",
    "subSectionId": "3-3",
    "subSectionName": "3-3 switch文",
    "section": "入門編 第3章 条件分岐と繰り返し",
    "titleJa": "switch文",
    "titleZh": "switch语句",
    "conceptJa": "<h3>switch文</h3>\n<p>一つの変数の値に応じて処理を分岐します。</p>\n<pre><code>switch (変数) {\n    case 値1: 処理1; break;\n    case 値2: 処理2; break;\n    default: その他の処理;\n}</code></pre>\n\n",
    "conceptZh": "<h3>switch语句</h3>\n<p>switch语句是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.55）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🚦 流程控制与数组就像是“火车站的调度中心”：它决定了火车（执行流）是走 A 股道（if）、在回转线转圈（loop）、还是停靠在某个特定的车位（数组）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int rank = 1;\n        switch(rank) {\n            case 1: System.out.println(\"第一名\"); break;\n            case 2: System.out.println(\"第二名\"); break;\n            default: System.out.println(\"其他\"); break;\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "条件分岐 (conditional branch)",
        "zh": "条件分支",
        "desc": "条件が真か偽かによって実行する処理を切り替えること。"
      },
      {
        "term": "ループ (loop)",
        "zh": "循环",
        "desc": "同じ処理を繰り返す仕組み。for, while, do-while がある。"
      },
      {
        "term": "配列 (array)",
        "zh": "数组",
        "desc": "同じ型のデータを連続して管理するデータ構造。インデックスで各要素にアクセス。"
      },
      {
        "term": "インデックス (index)",
        "zh": "下标/索引",
        "desc": "配列の各要素の位置を表す番号。0から始まる。"
      }
    ],
    "quizList": [
      {
        "question": "for(int i=0; i<3; i++) の繰り返し回数は？",
        "questionZh": "for(int i=0; i<3; i++) 会循环几次？",
        "options": [
          "2回",
          "3回",
          "4回",
          "無限"
        ],
        "answerIdx": 1,
        "hint": "i=0, i=1, i=2 の3回実行されます / i=0, i=1, i=2共3次。"
      }
    ],
    "pdfPage": 55,
    "pdfHighlightTerm": "switch文",
    "originalChapterId": "nyumon-3"
  },
  {
    "id": 17,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 3,
    "chapterName": "第3章 条件分岐と繰り返し",
    "subSectionId": "3-4",
    "subSectionName": "3-4 繰り返し（for文）",
    "section": "入門編 第3章 条件分岐と繰り返し",
    "titleJa": "繰り返し（for文）",
    "titleZh": "for循环",
    "conceptJa": "<h3>繰り返し（for文）</h3>\n<pre><code>for (初期化; 条件; 更新) {\n    // 繰り返す処理\n}\n// 例：1から5まで表示\nfor (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}</code></pre>\n\n",
    "conceptZh": "<h3>for循环</h3>\n<p>for循环是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.67）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🚦 流程控制与数组就像是“火车站的调度中心”：它决定了火车（执行流）是走 A 股道（if）、在回转线转圈（loop）、还是停靠在某个特定的车位（数组）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i < 3; i++) {\n            System.out.println(\"i = \" + i);\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "条件分岐 (conditional branch)",
        "zh": "条件分支",
        "desc": "条件が真か偽かによって実行する処理を切り替えること。"
      },
      {
        "term": "ループ (loop)",
        "zh": "循环",
        "desc": "同じ処理を繰り返す仕組み。for, while, do-while がある。"
      },
      {
        "term": "配列 (array)",
        "zh": "数组",
        "desc": "同じ型のデータを連続して管理するデータ構造。インデックスで各要素にアクセス。"
      },
      {
        "term": "インデックス (index)",
        "zh": "下标/索引",
        "desc": "配列の各要素の位置を表す番号。0から始まる。"
      }
    ],
    "quizList": [
      {
        "question": "for(int i=0; i<3; i++) の繰り返し回数は？",
        "questionZh": "for(int i=0; i<3; i++) 会循环几次？",
        "options": [
          "2回",
          "3回",
          "4回",
          "無限"
        ],
        "answerIdx": 1,
        "hint": "i=0, i=1, i=2 の3回実行されます / i=0, i=1, i=2共3次。"
      }
    ],
    "pdfPage": 67,
    "pdfHighlightTerm": "繰り返し（for文）",
    "originalChapterId": "nyumon-3"
  },
  {
    "id": 18,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 3,
    "chapterName": "第3章 条件分岐と繰り返し",
    "subSectionId": "3-5",
    "subSectionName": "3-5 繰り返し（while文・do-while文）",
    "section": "入門編 第3章 条件分岐と繰り返し",
    "titleJa": "繰り返し（while文・do-while文）",
    "titleZh": "while循环与do-while",
    "conceptJa": "<h3>繰り返し（while文・do-while文）</h3>\n<pre><code>while (条件) { 処理; }  // 条件が真の間繰り返す\ndo { 処理; } while (条件);  // 必ず1回は実行</code></pre>\n\n",
    "conceptZh": "<h3>while循环与do-while</h3>\n<p>while循环与do-while是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.75）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🚦 流程控制与数组就像是“火车站的调度中心”：它决定了火车（执行流）是走 A 股道（if）、在回转线转圈（loop）、还是停靠在某个特定的车位（数组）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int i = 0;\n        while (i < 3) {\n            System.out.println(\"while i = \" + i);\n            i++;\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "条件分岐 (conditional branch)",
        "zh": "条件分支",
        "desc": "条件が真か偽かによって実行する処理を切り替えること。"
      },
      {
        "term": "ループ (loop)",
        "zh": "循环",
        "desc": "同じ処理を繰り返す仕組み。for, while, do-while がある。"
      },
      {
        "term": "配列 (array)",
        "zh": "数组",
        "desc": "同じ型のデータを連続して管理するデータ構造。インデックスで各要素にアクセス。"
      },
      {
        "term": "インデックス (index)",
        "zh": "下标/索引",
        "desc": "配列の各要素の位置を表す番号。0から始まる。"
      }
    ],
    "quizList": [
      {
        "question": "for(int i=0; i<3; i++) の繰り返し回数は？",
        "questionZh": "for(int i=0; i<3; i++) 会循环几次？",
        "options": [
          "2回",
          "3回",
          "4回",
          "無限"
        ],
        "answerIdx": 1,
        "hint": "i=0, i=1, i=2 の3回実行されます / i=0, i=1, i=2共3次。"
      }
    ],
    "pdfPage": 75,
    "pdfHighlightTerm": "繰り返し（while文・do-while文）",
    "originalChapterId": "nyumon-3"
  },
  {
    "id": 19,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 3,
    "chapterName": "第3章 条件分岐と繰り返し",
    "subSectionId": "3-6",
    "subSectionName": "3-6 break と continue",
    "section": "入門編 第3章 条件分岐と繰り返し",
    "titleJa": "break と continue",
    "titleZh": "break与continue",
    "conceptJa": "<h3>break と continue</h3>\n<ul>\n  <li><code>break</code>：ループを途中で抜け出す</li>\n  <li><code>continue</code>：今のループの繰り返しをスキップして次へ</li>\n</ul>\n\n",
    "conceptZh": "<h3>break与continue</h3>\n<p>break与continue是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.76）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🚦 流程控制与数组就像是“火车站的调度中心”：它决定了火车（执行流）是走 A 股道（if）、在回转线转圈（loop）、还是停靠在某个特定的车位（数组）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        for(int i=0; i<10; i++) {\n            if (i == 3) continue;\n            if (i == 6) break;\n            System.out.println(\"i=\" + i);\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "ループ (loop)",
        "zh": "循环",
        "desc": "同じ処理を繰り返す仕組み。for, while, do-while がある。"
      }
    ],
    "quizList": [
      {
        "question": "for(int i=0; i<3; i++) の繰り返し回数は？",
        "questionZh": "for(int i=0; i<3; i++) 会循环几次？",
        "options": [
          "2回",
          "3回",
          "4回",
          "無限"
        ],
        "answerIdx": 1,
        "hint": "i=0, i=1, i=2 の3回実行されます / i=0, i=1, i=2共3次。"
      }
    ],
    "pdfPage": 76,
    "pdfHighlightTerm": "break と continue",
    "originalChapterId": "nyumon-3"
  },
  {
    "id": 20,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 3,
    "chapterName": "第3章 条件分岐と繰り返し",
    "subSectionId": "3-7",
    "subSectionName": "3-7 配列",
    "section": "入門編 第3章 条件分岐と繰り返し",
    "titleJa": "配列",
    "titleZh": "数组",
    "conceptJa": "<h3>配列</h3>\n<p>同じ型の値を複数まとめて管理します。</p>\n<pre><code>int[] scores = {85, 90, 78, 95, 82};  // 5要素の配列\nSystem.out.println(scores[0]);  // 最初の要素（インデックス0から始まる）\nSystem.out.println(scores.length);  // 配列の長さ = 5</code></pre>",
    "conceptZh": "<h3>数组</h3>\n<p>用来存储同一类型的多个值，下标从0开始：</p>\n<pre><code>int[] scores = {85, 90, 78, 95, 82};\nSystem.out.println(scores[0]);    // 85\nSystem.out.println(scores.length); // 5（数组长度）</code></pre>",
    "analogy": "🚦 流程控制与数组就像是“火车站的调度中心”：它决定了火车（执行流）是走 A 股道（if）、在回转线转圈（loop）、还是停靠在某个特定的车位（数组）。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int[] numbers = {10, 20, 30};\n        System.out.println(\"数组长度: \" + numbers.length);\n        System.out.println(\"第一个元素: \" + numbers[0]);\n    }\n}",
    "vocabList": [
      {
        "term": "配列 (array)",
        "zh": "数组",
        "desc": "同じ型のデータを連続して管理するデータ構造。インデックスで各要素にアクセス。"
      },
      {
        "term": "インデックス (index)",
        "zh": "下标/索引",
        "desc": "配列の各要素の位置を表す番号。0から始まる。"
      }
    ],
    "quizList": [
      {
        "question": "for(int i=0; i<3; i++) の繰り返し回数は？",
        "questionZh": "for(int i=0; i<3; i++) 会循环几次？",
        "options": [
          "2回",
          "3回",
          "4回",
          "無限"
        ],
        "answerIdx": 1,
        "hint": "i=0, i=1, i=2 の3回実行されます / i=0, i=1, i=2共3次。"
      },
      {
        "question": "break文の働きは何ですか？",
        "questionZh": "break语句的作用是什么？",
        "options": [
          "ループを一時停止する",
          "ループを途中で終了する",
          "次の繰り返しに飛ぶ",
          "プログラムを終了する"
        ],
        "answerIdx": 1,
        "hint": "continueは次の繰り返しにスキップ、breakは完全に抜け出します / continue跳到下次循环，break完全退出。"
      }
    ],
    "pdfPage": 81,
    "pdfHighlightTerm": "配列",
    "originalChapterId": "nyumon-3"
  },
  {
    "id": 21,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 3,
    "chapterName": "第3章 条件分岐と繰り返し",
    "subSectionId": "3-E",
    "subSectionName": "3-E 演習問題 (课后练习)",
    "section": "入門編 第3章 条件分岐と繰り返し",
    "titleJa": "演習：第3章の課題",
    "titleZh": "练习：第3章的课后练习",
    "conceptJa": "<h3>第3章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>for文を使用して、1から10までの整数を出力するループを作成してください。ただし、数字が3の倍数のときは出力をスキップ(continue)し、8に達したらループを終了(break)させてください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第3章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>使用 for 循环结构，让数字 i 从 1 循环到 10。在循环体中判定：如果数字是 3 的倍数，则跳过本次输出（continue）；如果数字是 8，则立刻终止退出循环（break）。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第3章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第3章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 82,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "nyumon-3"
  },
  {
    "id": 22,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 4,
    "chapterName": "第4章 メソッド",
    "subSectionId": "4-1",
    "subSectionName": "4-1 メソッドとは",
    "section": "入門編 第4章 メソッド",
    "titleJa": "メソッドとは",
    "titleZh": "什么是方法（Method）",
    "conceptJa": "<h3>メソッドとは</h3>\n<p>処理のまとまりに名前を付けて、何度でも呼び出せるようにしたものです。同じ処理を繰り返し書く必要がなくなり、プログラムが整理されます。</p>\n<pre><code>static 戻り値の型 メソッド名(引数の型 引数名) {\n    処理;\n    return 戻り値;\n}</code></pre>\n\n",
    "conceptZh": "<h3>什么是方法（Method）</h3>\n<p>什么是方法（Method）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.88）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "⚙️ 方法就像是“微型流水线车间”：你只要给它入料口塞入零件，它就能产出成品。它的作用域就像保密车间，里面的图纸绝不能带到外面去。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        run();\n    }\n    public static void run() {\n        System.out.println(\"方法调用成功！\");\n    }\n}",
    "vocabList": [
      {
        "term": "メソッド (method)",
        "zh": "方法",
        "desc": "処理のまとまりに名前をつけたもの。何度でも呼び出せる。"
      },
      {
        "term": "戻り値 (return value)",
        "zh": "返回值",
        "desc": "メソッドが処理の結果として返す値。returnキーワードで返す。"
      }
    ],
    "quizList": [
      {
        "question": "戻り値がないメソッドの戻り値の型は何ですか？",
        "questionZh": "没有返回值的方法，返回类型写什么？",
        "options": [
          "null",
          "empty",
          "void",
          "none"
        ],
        "answerIdx": 2,
        "hint": "「空」を意味する英単語です / 意思是「空」的英文单词。"
      },
      {
        "question": "メソッドのオーバーロードとは何ですか？",
        "questionZh": "方法重载是什么？",
        "options": [
          "メソッドを上書きすること",
          "同じ名前で引数の異なるメソッドを複数定義すること",
          "メソッドを削除すること",
          "メソッドを別のクラスにコピーすること"
        ],
        "answerIdx": 1,
        "hint": "同じ名前で引数の型や数が違うメソッドを複数持てます / 同名但参数类型或数量不同的多个方法。"
      }
    ],
    "pdfPage": 88,
    "pdfHighlightTerm": "メソッドとは",
    "originalChapterId": "nyumon-4"
  },
  {
    "id": 23,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 4,
    "chapterName": "第4章 メソッド",
    "subSectionId": "4-2",
    "subSectionName": "4-2 引数（パラメータ）",
    "section": "入門編 第4章 メソッド",
    "titleJa": "引数（パラメータ）",
    "titleZh": "参数（Parameters）",
    "conceptJa": "<h3>引数（パラメータ）</h3>\n<p>メソッドに渡す値のことです。呼び出すときに値を指定します。</p>\n<pre><code>static void greet(String name) {\n    System.out.println(\"こんにちは、\" + name + \"さん\");\n}\n// 呼び出し\ngreet(\"太郎\");  // こんにちは、太郎さん</code></pre>\n\n",
    "conceptZh": "<h3>参数（Parameters）</h3>\n<p>参数（Parameters）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.89）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "⚙️ 方法就像是“微型流水线车间”：你只要给它入料口塞入零件，它就能产出成品。它的作用域就像保密车间，里面的图纸绝不能带到外面去。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        greet(\"山田\");\n    }\n    public static void greet(String name) {\n        System.out.println(\"你好, \" + name + \"先生/小姐\");\n    }\n}",
    "vocabList": [
      {
        "term": "メソッド (method)",
        "zh": "方法",
        "desc": "処理のまとまりに名前をつけたもの。何度でも呼び出せる。"
      }
    ],
    "quizList": [
      {
        "question": "戻り値がないメソッドの戻り値の型は何ですか？",
        "questionZh": "没有返回值的方法，返回类型写什么？",
        "options": [
          "null",
          "empty",
          "void",
          "none"
        ],
        "answerIdx": 2,
        "hint": "「空」を意味する英単語です / 意思是「空」的英文单词。"
      },
      {
        "question": "メソッドのオーバーロードとは何ですか？",
        "questionZh": "方法重载是什么？",
        "options": [
          "メソッドを上書きすること",
          "同じ名前で引数の異なるメソッドを複数定義すること",
          "メソッドを削除すること",
          "メソッドを別のクラスにコピーすること"
        ],
        "answerIdx": 1,
        "hint": "同じ名前で引数の型や数が違うメソッドを複数持てます / 同名但参数类型或数量不同的多个方法。"
      }
    ],
    "pdfPage": 89,
    "pdfHighlightTerm": "引数（パラメータ）",
    "originalChapterId": "nyumon-4"
  },
  {
    "id": 24,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 4,
    "chapterName": "第4章 メソッド",
    "subSectionId": "4-3",
    "subSectionName": "4-3 戻り値",
    "section": "入門編 第4章 メソッド",
    "titleJa": "戻り値",
    "titleZh": "返回值（Return Value）",
    "conceptJa": "<h3>戻り値</h3>\n<p>メソッドが処理の結果として返す値です。<code>return</code>で返します。戻り値がない場合は<code>void</code>を使います。</p>\n<pre><code>static int add(int a, int b) {\n    return a + b;\n}\nint result = add(3, 4);  // result = 7</code></pre>\n\n",
    "conceptZh": "<h3>返回值（Return Value）</h3>\n<p>方法处理完毕后返回的结果，用<code>return</code>关键字返回。如果不返回任何值，类型写<code>void</code>。</p>\n<pre><code>static int add(int a, int b) {\n    return a + b;\n}\nint result = add(3, 4);  // result = 7</code></pre>\n\n",
    "analogy": "⚙️ 方法就像是“微型流水线车间”：你只要给它入料口塞入零件，它就能产出成品。它的作用域就像保密车间，里面的图纸绝不能带到外面去。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int res = add(5, 7);\n        System.out.println(\"5+7 = \" + res);\n    }\n    public static int add(int a, int b) {\n        return a + b;\n    }\n}",
    "vocabList": [
      {
        "term": "メソッド (method)",
        "zh": "方法",
        "desc": "処理のまとまりに名前をつけたもの。何度でも呼び出せる。"
      },
      {
        "term": "戻り値 (return value)",
        "zh": "返回值",
        "desc": "メソッドが処理の結果として返す値。returnキーワードで返す。"
      }
    ],
    "quizList": [
      {
        "question": "戻り値がないメソッドの戻り値の型は何ですか？",
        "questionZh": "没有返回值的方法，返回类型写什么？",
        "options": [
          "null",
          "empty",
          "void",
          "none"
        ],
        "answerIdx": 2,
        "hint": "「空」を意味する英単語です / 意思是「空」的英文单词。"
      },
      {
        "question": "メソッドのオーバーロードとは何ですか？",
        "questionZh": "方法重载是什么？",
        "options": [
          "メソッドを上書きすること",
          "同じ名前で引数の異なるメソッドを複数定義すること",
          "メソッドを削除すること",
          "メソッドを別のクラスにコピーすること"
        ],
        "answerIdx": 1,
        "hint": "同じ名前で引数の型や数が違うメソッドを複数持てます / 同名但参数类型或数量不同的多个方法。"
      }
    ],
    "pdfPage": 99,
    "pdfHighlightTerm": "戻り値",
    "originalChapterId": "nyumon-4"
  },
  {
    "id": 25,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 4,
    "chapterName": "第4章 メソッド",
    "subSectionId": "4-4",
    "subSectionName": "4-4 メソッドのオーバーロード",
    "section": "入門編 第4章 メソッド",
    "titleJa": "メソッドのオーバーロード",
    "titleZh": "方法重载（Overload）",
    "conceptJa": "<h3>メソッドのオーバーロード</h3>\n<p>同じメソッド名で引数の型や数が異なるメソッドを複数定義できます。これを<strong>オーバーロード（多重定義）</strong>と言います。</p>\n<pre><code>static int add(int a, int b) { return a + b; }\nstatic double add(double a, double b) { return a + b; }\nstatic int add(int a, int b, int c) { return a + b + c; }</code></pre>\n<p>呼び出す際、引数に合ったメソッドが自動的に選ばれます。</p>\n\n",
    "conceptZh": "<h3>方法重载（Overload）</h3>\n<p>同一个方法名，但参数的类型或数量不同，这叫<strong>重载</strong>。Java会根据传入参数自动选择对应的方法。</p>\n<pre><code>static int add(int a, int b) { return a + b; }\nstatic double add(double a, double b) { return a + b; }\nstatic int add(int a, int b, int c) { return a + b + c; }</code></pre>\n\n",
    "analogy": "⚙️ 方法就像是“微型流水线车间”：你只要给它入料口塞入零件，它就能产出成品。它的作用域就像保密车间，里面的图纸绝不能带到外面去。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        print(100);\n        print(\"文字\");\n    }\n    public static void print(int x) { System.out.println(\"整数: \" + x); }\n    public static void print(String s) { System.out.println(\"文字列: \" + s); }\n}",
    "vocabList": [
      {
        "term": "メソッド (method)",
        "zh": "方法",
        "desc": "処理のまとまりに名前をつけたもの。何度でも呼び出せる。"
      },
      {
        "term": "オーバーロード (overload)",
        "zh": "重载",
        "desc": "同じメソッド名で引数の型や数が異なるメソッドを複数定義すること。"
      }
    ],
    "quizList": [
      {
        "question": "戻り値がないメソッドの戻り値の型は何ですか？",
        "questionZh": "没有返回值的方法，返回类型写什么？",
        "options": [
          "null",
          "empty",
          "void",
          "none"
        ],
        "answerIdx": 2,
        "hint": "「空」を意味する英単語です / 意思是「空」的英文单词。"
      },
      {
        "question": "メソッドのオーバーロードとは何ですか？",
        "questionZh": "方法重载是什么？",
        "options": [
          "メソッドを上書きすること",
          "同じ名前で引数の異なるメソッドを複数定義すること",
          "メソッドを削除すること",
          "メソッドを別のクラスにコピーすること"
        ],
        "answerIdx": 1,
        "hint": "同じ名前で引数の型や数が違うメソッドを複数持てます / 同名但参数类型或数量不同的多个方法。"
      }
    ],
    "pdfPage": 105,
    "pdfHighlightTerm": "メソッドのオーバーロード",
    "originalChapterId": "nyumon-4"
  },
  {
    "id": 26,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 4,
    "chapterName": "第4章 メソッド",
    "subSectionId": "4-5",
    "subSectionName": "4-5 変数のスコープ",
    "section": "入門編 第4章 メソッド",
    "titleJa": "変数のスコープ",
    "titleZh": "变量作用域（Scope）",
    "conceptJa": "<h3>変数のスコープ</h3>\n<p>変数が使える範囲（スコープ）はブロック<code>{}</code>の中に限られます。メソッド内で宣言した変数は、そのメソッドの外からは使えません（ローカル変数）。</p>",
    "conceptZh": "<h3>变量作用域（Scope）</h3>\n<p>变量作用域（Scope）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.72）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "⚙️ 方法就像是“微型流水线车间”：你只要给它入料口塞入零件，它就能产出成品。它的作用域就像保密车间，里面的图纸绝不能带到外面去。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        run();\n    }\n    public static void run() {\n        System.out.println(\"方法调用成功！\");\n    }\n}",
    "vocabList": [
      {
        "term": "メソッド (method)",
        "zh": "方法",
        "desc": "処理のまとまりに名前をつけたもの。何度でも呼び出せる。"
      }
    ],
    "quizList": [
      {
        "question": "戻り値がないメソッドの戻り値の型は何ですか？",
        "questionZh": "没有返回值的方法，返回类型写什么？",
        "options": [
          "null",
          "empty",
          "void",
          "none"
        ],
        "answerIdx": 2,
        "hint": "「空」を意味する英単語です / 意思是「空」的英文单词。"
      },
      {
        "question": "メソッドのオーバーロードとは何ですか？",
        "questionZh": "方法重载是什么？",
        "options": [
          "メソッドを上書きすること",
          "同じ名前で引数の異なるメソッドを複数定義すること",
          "メソッドを削除すること",
          "メソッドを別のクラスにコピーすること"
        ],
        "answerIdx": 1,
        "hint": "同じ名前で引数の型や数が違うメソッドを複数持てます / 同名但参数类型或数量不同的多个方法。"
      }
    ],
    "pdfPage": 72,
    "pdfHighlightTerm": "変数のスコープ",
    "originalChapterId": "nyumon-4"
  },
  {
    "id": 27,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 4,
    "chapterName": "第4章 メソッド",
    "subSectionId": "4-E",
    "subSectionName": "4-E 演習問題 (课后练习)",
    "section": "入門編 第4章 メソッド",
    "titleJa": "演習：第4章の課題",
    "titleZh": "练习：第4章的课后练习",
    "conceptJa": "<h3>第4章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>2つの整数を引数として受け取り、その「大きい方の値」を戻り値として返すメソッド「public static int getMax(int a, int b)」を定義し、mainメソッドから呼び出して結果を表示してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第4章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>定义一个自定义类方法 `public static int getMax(int a, int b)`，接收两个整数参数并返回它们的最大值。在 main 方法中调用它并输出“最大值是: ○”进行验证。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第4章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第4章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 73,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "nyumon-4"
  },
  {
    "id": 28,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 5,
    "chapterName": "第5章 クラスの基本",
    "subSectionId": "5-1",
    "subSectionName": "5-1 オブジェクト指向とは",
    "section": "入門編 第5章 クラスの基本",
    "titleJa": "オブジェクト指向とは",
    "titleZh": "什么是面向对象（OOP）",
    "conceptJa": "<h3>オブジェクト指向とは</h3>\n<p>現実世界の「もの（オブジェクト）」をプログラムで表現する考え方です。例えば「学生」というオブジェクトには、名前・学籍番号という<strong>属性（フィールド）</strong>と、勉強する・試験を受けるという<strong>操作（メソッド）</strong>があります。</p>\n\n",
    "conceptZh": "<h3>什么是面向对象（OOP）</h3>\n<p>什么是面向对象（OOP）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.109）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🏗️ 面向对象与类就像是“汽车制造厂的设计图纸”：在没有买下真实的汽车（new实例）前，图纸只代表构想。通过引用遥控器，我们可以安全驾驭它。",
    "example": "public class Main {\n    static class StudentCard {\n        String name;\n        int grade;\n    }\n    public static void main(String[] args) {\n        StudentCard sc = new StudentCard();\n        sc.name = \"山田太郎\";\n        sc.grade = 3;\n        System.out.println(\"学生姓名: \" + sc.name + \", 年级: \" + sc.grade);\n    }\n}",
    "vocabList": [
      {
        "term": "フィールド (field)",
        "zh": "字段/成员变量",
        "desc": "クラスが持つデータ（属性）。"
      },
      {
        "term": "null",
        "zh": "空引用",
        "desc": "何も参照していない状態を表す特別な値。"
      }
    ],
    "quizList": [
      {
        "question": "nullのオブジェクトのメソッドを呼び出すと何が起きますか？",
        "questionZh": "对null对象调用方法会发生什么？",
        "options": [
          "何も起きない",
          "0が返される",
          "NullPointerExceptionが発生する",
          "自動的にnewされる"
        ],
        "answerIdx": 2,
        "hint": "nullは「何も参照していない」状態です / null表示「不引用任何对象」。"
      }
    ],
    "pdfPage": 109,
    "pdfHighlightTerm": "オブジェクト指向とは",
    "originalChapterId": "nyumon-5"
  },
  {
    "id": 29,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 5,
    "chapterName": "第5章 クラスの基本",
    "subSectionId": "5-2",
    "subSectionName": "5-2 クラスとインスタンス",
    "section": "入門編 第5章 クラスの基本",
    "titleJa": "クラスとインスタンス",
    "titleZh": "类与实例",
    "conceptJa": "<h3>クラスとインスタンス</h3>\n<ul>\n  <li><strong>クラス</strong>：オブジェクトの設計図・ひな形。型のようなもの。</li>\n  <li><strong>インスタンス</strong>：設計図から作られた実際のオブジェクト。</li>\n</ul>\n<pre><code>// クラスの定義（設計図）\nclass Student {\n    String name;    // フィールド（属性）\n    int studentId;\n}\n\n// インスタンスの生成\nStudent s = new Student();\ns.name = \"田中\";\ns.studentId = 1001;\nSystem.out.println(s.name);</code></pre>\n\n",
    "conceptZh": "<h3>类与实例</h3>\n<ul>\n  <li><strong>类（Class）</strong>：对象的设计图/模板</li>\n  <li><strong>实例（Instance）</strong>：根据设计图创建出来的具体对象</li>\n</ul>\n<pre><code>// 定义类（设计图）\nclass Student {\n    String name;     // 字段（属性）\n    int studentId;\n}\n// 创建实例\nStudent s = new Student();\ns.name = \"田中\";\ns.studentId = 1001;\nSystem.out.println(s.name);</code></pre>\n\n",
    "analogy": "🏗️ 面向对象与类就像是“汽车制造厂的设计图纸”：在没有买下真实的汽车（new实例）前，图纸只代表构想。通过引用遥控器，我们可以安全驾驭它。",
    "example": "public class Main {\n    static class StudentCard {\n        String name;\n        int grade;\n    }\n    public static void main(String[] args) {\n        StudentCard sc = new StudentCard();\n        sc.name = \"山田太郎\";\n        sc.grade = 3;\n        System.out.println(\"学生姓名: \" + sc.name + \", 年级: \" + sc.grade);\n    }\n}",
    "vocabList": [
      {
        "term": "クラス (class)",
        "zh": "类",
        "desc": "オブジェクトの設計図。フィールドとメソッドをまとめたもの。"
      },
      {
        "term": "インスタンス (instance)",
        "zh": "实例",
        "desc": "クラスから生成された具体的なオブジェクト。"
      },
      {
        "term": "フィールド (field)",
        "zh": "字段/成员变量",
        "desc": "クラスが持つデータ（属性）。"
      },
      {
        "term": "null",
        "zh": "空引用",
        "desc": "何も参照していない状態を表す特別な値。"
      }
    ],
    "quizList": [
      {
        "question": "クラスとインスタンスの関係で正しいものはどれですか？",
        "questionZh": "类与实例的关系，哪项描述正确？",
        "options": [
          "クラスが実物で、インスタンスが設計図",
          "クラスが設計図で、インスタンスが実物",
          "どちらも同じ意味",
          "クラスはメソッドのみを含む"
        ],
        "answerIdx": 1,
        "hint": "家を建てる例で考えましょう / 用建房子来类比思考。"
      },
      {
        "question": "nullのオブジェクトのメソッドを呼び出すと何が起きますか？",
        "questionZh": "对null对象调用方法会发生什么？",
        "options": [
          "何も起きない",
          "0が返される",
          "NullPointerExceptionが発生する",
          "自動的にnewされる"
        ],
        "answerIdx": 2,
        "hint": "nullは「何も参照していない」状態です / null表示「不引用任何对象」。"
      }
    ],
    "pdfPage": 111,
    "pdfHighlightTerm": "クラスとインスタンス",
    "originalChapterId": "nyumon-5"
  },
  {
    "id": 30,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 5,
    "chapterName": "第5章 クラスの基本",
    "subSectionId": "5-3",
    "subSectionName": "5-3 参照型",
    "section": "入門編 第5章 クラスの基本",
    "titleJa": "参照型",
    "titleZh": "引用类型（Reference Type）",
    "conceptJa": "<h3>参照型</h3>\n<p>クラス型の変数は、実際のデータ（オブジェクト）が置かれているメモリの「住所（参照）」を持ちます。</p>\n<p><code>Student s2 = s;</code> とすると、s2 も同じオブジェクトを指します（コピーではない！）。</p>\n\n",
    "conceptZh": "<h3>引用类型（Reference Type）</h3>\n<p>引用类型（Reference Type）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.117）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🏗️ 面向对象与类就像是“汽车制造厂的设计图纸”：在没有买下真实的汽车（new实例）前，图纸只代表构想。通过引用遥控器，我们可以安全驾驭它。",
    "example": "public class Main {\n    static class Card {\n        String name;\n    }\n    public static void main(String[] args) {\n        Card c1 = new Card();\n        c1.name = \"山田\";\n        Card c2 = c1; // 复制引用\n        c2.name = \"佐藤\";\n        System.out.println(\"c1的名字是: \" + c1.name); // 也是佐藤！\n    }\n}",
    "vocabList": [
      {
        "term": "クラス (class)",
        "zh": "类",
        "desc": "オブジェクトの設計図。フィールドとメソッドをまとめたもの。"
      },
      {
        "term": "参照 (reference)",
        "zh": "引用",
        "desc": "オブジェクトのメモリ上の場所を指す情報。"
      },
      {
        "term": "null",
        "zh": "空引用",
        "desc": "何も参照していない状態を表す特別な値。"
      }
    ],
    "quizList": [
      {
        "question": "クラスとインスタンスの関係で正しいものはどれですか？",
        "questionZh": "类与实例的关系，哪项描述正确？",
        "options": [
          "クラスが実物で、インスタンスが設計図",
          "クラスが設計図で、インスタンスが実物",
          "どちらも同じ意味",
          "クラスはメソッドのみを含む"
        ],
        "answerIdx": 1,
        "hint": "家を建てる例で考えましょう / 用建房子来类比思考。"
      },
      {
        "question": "nullのオブジェクトのメソッドを呼び出すと何が起きますか？",
        "questionZh": "对null对象调用方法会发生什么？",
        "options": [
          "何も起きない",
          "0が返される",
          "NullPointerExceptionが発生する",
          "自動的にnewされる"
        ],
        "answerIdx": 2,
        "hint": "nullは「何も参照していない」状態です / null表示「不引用任何对象」。"
      }
    ],
    "pdfPage": 117,
    "pdfHighlightTerm": "参照型",
    "originalChapterId": "nyumon-5"
  },
  {
    "id": 31,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 5,
    "chapterName": "第5章 クラスの基本",
    "subSectionId": "5-4",
    "subSectionName": "5-4 null",
    "section": "入門編 第5章 クラスの基本",
    "titleJa": "null",
    "titleZh": "null",
    "conceptJa": "<h3>null</h3>\n<p><code>null</code>は「何も参照していない」状態を表す特別な値です。nullのオブジェクトのフィールドやメソッドにアクセスすると <strong>NullPointerException</strong> が発生します。</p>\n\n",
    "conceptZh": "<h3>null</h3>\n<p>null是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.123）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🏗️ 面向对象与类就像是“汽车制造厂的设计图纸”：在没有买下真实的汽车（new实例）前，图纸只代表构想。通过引用遥控器，我们可以安全驾驭它。",
    "example": "public class Main {\n    static class StudentCard {\n        String name;\n        int grade;\n    }\n    public static void main(String[] args) {\n        StudentCard sc = new StudentCard();\n        sc.name = \"山田太郎\";\n        sc.grade = 3;\n        System.out.println(\"学生姓名: \" + sc.name + \", 年级: \" + sc.grade);\n    }\n}",
    "vocabList": [
      {
        "term": "フィールド (field)",
        "zh": "字段/成员变量",
        "desc": "クラスが持つデータ（属性）。"
      },
      {
        "term": "参照 (reference)",
        "zh": "引用",
        "desc": "オブジェクトのメモリ上の場所を指す情報。"
      },
      {
        "term": "null",
        "zh": "空引用",
        "desc": "何も参照していない状態を表す特別な値。"
      }
    ],
    "quizList": [
      {
        "question": "nullのオブジェクトのメソッドを呼び出すと何が起きますか？",
        "questionZh": "对null对象调用方法会发生什么？",
        "options": [
          "何も起きない",
          "0が返される",
          "NullPointerExceptionが発生する",
          "自動的にnewされる"
        ],
        "answerIdx": 2,
        "hint": "nullは「何も参照していない」状態です / null表示「不引用任何对象」。"
      }
    ],
    "pdfPage": 123,
    "pdfHighlightTerm": "null",
    "originalChapterId": "nyumon-5"
  },
  {
    "id": 32,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 5,
    "chapterName": "第5章 クラスの基本",
    "subSectionId": "5-5",
    "subSectionName": "5-5 参照の配列",
    "section": "入門編 第5章 クラスの基本",
    "titleJa": "参照の配列",
    "titleZh": "引用类型数组",
    "conceptJa": "<h3>参照の配列</h3>\n<p>クラス型の配列を作ることもできます：</p>\n<pre><code>Student[] students = new Student[3];\nstudents[0] = new Student();\nstudents[0].name = \"佐藤\";</code></pre>",
    "conceptZh": "<h3>引用类型数组</h3>\n<p>引用类型数组是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.121）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🏗️ 面向对象与类就像是“汽车制造厂的设计图纸”：在没有买下真实的汽车（new实例）前，图纸只代表构想。通过引用遥控器，我们可以安全驾驭它。",
    "example": "public class Main {\n    static class Card {\n        String name;\n    }\n    public static void main(String[] args) {\n        Card c1 = new Card();\n        c1.name = \"山田\";\n        Card c2 = c1; // 复制引用\n        c2.name = \"佐藤\";\n        System.out.println(\"c1的名字是: \" + c1.name); // 也是佐藤！\n    }\n}",
    "vocabList": [
      {
        "term": "クラス (class)",
        "zh": "类",
        "desc": "オブジェクトの設計図。フィールドとメソッドをまとめたもの。"
      },
      {
        "term": "参照 (reference)",
        "zh": "引用",
        "desc": "オブジェクトのメモリ上の場所を指す情報。"
      },
      {
        "term": "null",
        "zh": "空引用",
        "desc": "何も参照していない状態を表す特別な値。"
      }
    ],
    "quizList": [
      {
        "question": "クラスとインスタンスの関係で正しいものはどれですか？",
        "questionZh": "类与实例的关系，哪项描述正确？",
        "options": [
          "クラスが実物で、インスタンスが設計図",
          "クラスが設計図で、インスタンスが実物",
          "どちらも同じ意味",
          "クラスはメソッドのみを含む"
        ],
        "answerIdx": 1,
        "hint": "家を建てる例で考えましょう / 用建房子来类比思考。"
      },
      {
        "question": "nullのオブジェクトのメソッドを呼び出すと何が起きますか？",
        "questionZh": "对null对象调用方法会发生什么？",
        "options": [
          "何も起きない",
          "0が返される",
          "NullPointerExceptionが発生する",
          "自動的にnewされる"
        ],
        "answerIdx": 2,
        "hint": "nullは「何も参照していない」状態です / null表示「不引用任何对象」。"
      }
    ],
    "pdfPage": 121,
    "pdfHighlightTerm": "参照の配列",
    "originalChapterId": "nyumon-5"
  },
  {
    "id": 33,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 5,
    "chapterName": "第5章 クラスの基本",
    "subSectionId": "5-E",
    "subSectionName": "5-E 演習問題 (课后练习)",
    "section": "入門編 第5章 クラスの基本",
    "titleJa": "演習：第5章の課題",
    "titleZh": "练习：第5章的课后练习",
    "conceptJa": "<h3>第5章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>『学生(Student)』を表すクラスを作成してください。インスタンス変数として String name と int age を持ち、それらに値を代入して画面に出力する一連のコードを作成してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第5章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>创建一个独立的类 `Student`，定义成员变量 `String name` 和 `int age`。在 Main 类中创建 Student 实例，给其姓名和年龄赋值，并成功在控制台打印输出该学生信息。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第5章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第5章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 122,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "nyumon-5"
  },
  {
    "id": 34,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 6,
    "chapterName": "第6章 クラスの一歩進んだ使い方",
    "subSectionId": "6-1",
    "subSectionName": "6-1 コンストラクタ",
    "section": "入門編 第6章 クラスの一歩進んだ使い方",
    "titleJa": "コンストラクタ",
    "titleZh": "构造器（Constructor）",
    "conceptJa": "<h3>コンストラクタ</h3>\n<p>インスタンス生成時（<code>new</code>のとき）に自動的に呼ばれる特別なメソッドです。フィールドの初期化に使います。</p>\n<ul>\n  <li>クラスと同じ名前</li>\n  <li>戻り値の型は書かない</li>\n</ul>\n<pre><code>class Point {\n    int x, y;\n    Point(int x, int y) {  // コンストラクタ\n        this.x = x;\n        this.y = y;\n    }\n}\nPoint p = new Point(3, 5);  // コンストラクタが呼ばれる</code></pre>\n\n",
    "conceptZh": "<h3>构造器（Constructor）</h3>\n<p>构造器是在<code>new</code>创建实例时自动调用的特殊方法，用于初始化字段。</p>\n<ul>\n  <li>名称与类名相同</li>\n  <li>没有返回值类型</li>\n</ul>\n<pre><code>class Point {\n    int x, y;\n    Point(int x, int y) {  // 构造器\n        this.x = x;\n        this.y = y;\n    }\n}\nPoint p = new Point(3, 5);  // 自动调用构造器</code></pre>\n\n",
    "analogy": "🧱 构造器与 static 就像是“小区的公共绿地与私有阳台”：static 是公共的（全区共享一份），构造器是私有的出厂装修，帮你一入住就通网通电。",
    "example": "public class Main {\n    static class Book {\n        String title;\n        Book(String t) {\n            title = t;\n        }\n    }\n    public static void main(String[] args) {\n        Book b = new Book(\"Java入門\");\n        System.out.println(\"书名: \" + b.title);\n    }\n}",
    "vocabList": [
      {
        "term": "コンストラクタ (constructor)",
        "zh": "构造器",
        "desc": "インスタンス生成時に自動呼び出しされる初期化用メソッド。"
      },
      {
        "term": "this",
        "zh": "自身引用",
        "desc": "現在のインスタンス自身を指すキーワード。"
      },
      {
        "term": "static",
        "zh": "静态的",
        "desc": "クラスに属し、インスタンスで共有されることを示す修飾子。"
      }
    ],
    "quizList": [
      {
        "question": "コンストラクタはいつ呼ばれますか？",
        "questionZh": "构造器在什么时候被调用？",
        "options": [
          "クラスを定義したとき",
          "newでインスタンスを生成したとき",
          "メソッドを呼び出したとき",
          "プログラムが終了するとき"
        ],
        "answerIdx": 1,
        "hint": "new クラス名() のタイミングです / 在 new 类名() 时调用。"
      },
      {
        "question": "static フィールドの特徴は何ですか？",
        "questionZh": "static字段的特点是什么？",
        "options": [
          "各インスタンスが個別に持つ",
          "全インスタンスで共有される",
          "読み取り専用になる",
          "外部からアクセスできなくなる"
        ],
        "answerIdx": 1,
        "hint": "staticは「クラスに属する」という意味です / static表示「属于类」。"
      },
      {
        "question": "thisキーワードが指すものは何ですか？",
        "questionZh": "this关键字指的是什么？",
        "options": [
          "クラス自体",
          "現在のインスタンス（自分自身）",
          "親クラス",
          "staticフィールド"
        ],
        "answerIdx": 1,
        "hint": "「このインスタンス」という意味です / 意思是「这个实例」。"
      }
    ],
    "pdfPage": 128,
    "pdfHighlightTerm": "コンストラクタ",
    "originalChapterId": "nyumon-6"
  },
  {
    "id": 35,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 6,
    "chapterName": "第6章 クラスの一歩進んだ使い方",
    "subSectionId": "6-2",
    "subSectionName": "6-2 this キーワード",
    "section": "入門編 第6章 クラスの一歩進んだ使い方",
    "titleJa": "this キーワード",
    "titleZh": "this关键字",
    "conceptJa": "<h3>this キーワード</h3>\n<p><code>this</code>は「自分自身のインスタンス」を指します。引数名とフィールド名が同じとき、<code>this.フィールド名</code>でフィールドを指定できます。</p>\n\n",
    "conceptZh": "<h3>this关键字</h3>\n<p>this关键字是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.55）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🧱 构造器与 static 就像是“小区的公共绿地与私有阳台”：static 是公共的（全区共享一份），构造器是私有的出厂装修，帮你一入住就通网通电。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"面向对象进阶\");\n    }\n}",
    "vocabList": [
      {
        "term": "this",
        "zh": "自身引用",
        "desc": "現在のインスタンス自身を指すキーワード。"
      },
      {
        "term": "static",
        "zh": "静态的",
        "desc": "クラスに属し、インスタンスで共有されることを示す修飾子。"
      }
    ],
    "quizList": [
      {
        "question": "static フィールドの特徴は何ですか？",
        "questionZh": "static字段的特点是什么？",
        "options": [
          "各インスタンスが個別に持つ",
          "全インスタンスで共有される",
          "読み取り専用になる",
          "外部からアクセスできなくなる"
        ],
        "answerIdx": 1,
        "hint": "staticは「クラスに属する」という意味です / static表示「属于类」。"
      },
      {
        "question": "thisキーワードが指すものは何ですか？",
        "questionZh": "this关键字指的是什么？",
        "options": [
          "クラス自体",
          "現在のインスタンス（自分自身）",
          "親クラス",
          "staticフィールド"
        ],
        "answerIdx": 1,
        "hint": "「このインスタンス」という意味です / 意思是「这个实例」。"
      }
    ],
    "pdfPage": 55,
    "pdfHighlightTerm": "this キーワード",
    "originalChapterId": "nyumon-6"
  },
  {
    "id": 36,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 6,
    "chapterName": "第6章 クラスの一歩進んだ使い方",
    "subSectionId": "6-3",
    "subSectionName": "6-3 クラス変数（static フィールド）",
    "section": "入門編 第6章 クラスの一歩進んだ使い方",
    "titleJa": "クラス変数（static フィールド）",
    "titleZh": "类变量（static字段）",
    "conceptJa": "<h3>クラス変数（static フィールド）</h3>\n<p>全インスタンスで共有される変数です。<code>static</code>をつけて宣言します。</p>\n<pre><code>class Counter {\n    static int count = 0;  // クラス変数（全インスタンスで共有）\n    int id;\n    Counter() {\n        count++;\n        id = count;\n    }\n}\n// Counter.count でアクセスできる</code></pre>\n\n",
    "conceptZh": "<h3>类变量（static字段）</h3>\n<p>类变量（static字段）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.134）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🧱 构造器与 static 就像是“小区的公共绿地与私有阳台”：static 是公共的（全区共享一份），构造器是私有的出厂装修，帮你一入住就通网通电。",
    "example": "public class Main {\n    static class Counter {\n        static int count = 0;\n        Counter() { count++; }\n    }\n    public static void main(String[] args) {\n        new Counter();\n        new Counter();\n        System.out.println(\"共享静态计数器: \" + Counter.count);\n    }\n}",
    "vocabList": [
      {
        "term": "this",
        "zh": "自身引用",
        "desc": "現在のインスタンス自身を指すキーワード。"
      },
      {
        "term": "static",
        "zh": "静态的",
        "desc": "クラスに属し、インスタンスで共有されることを示す修飾子。"
      }
    ],
    "quizList": [
      {
        "question": "static フィールドの特徴は何ですか？",
        "questionZh": "static字段的特点是什么？",
        "options": [
          "各インスタンスが個別に持つ",
          "全インスタンスで共有される",
          "読み取り専用になる",
          "外部からアクセスできなくなる"
        ],
        "answerIdx": 1,
        "hint": "staticは「クラスに属する」という意味です / static表示「属于类」。"
      },
      {
        "question": "thisキーワードが指すものは何ですか？",
        "questionZh": "this关键字指的是什么？",
        "options": [
          "クラス自体",
          "現在のインスタンス（自分自身）",
          "親クラス",
          "staticフィールド"
        ],
        "answerIdx": 1,
        "hint": "「このインスタンス」という意味です / 意思是「这个实例」。"
      }
    ],
    "pdfPage": 134,
    "pdfHighlightTerm": "クラス変数（static フィールド）",
    "originalChapterId": "nyumon-6"
  },
  {
    "id": 37,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 6,
    "chapterName": "第6章 クラスの一歩進んだ使い方",
    "subSectionId": "6-4",
    "subSectionName": "6-4 クラスメソッド（static メソッド）",
    "section": "入門編 第6章 クラスの一歩進んだ使い方",
    "titleJa": "クラスメソッド（static メソッド）",
    "titleZh": "类方法（static方法）",
    "conceptJa": "<h3>クラスメソッド（static メソッド）</h3>\n<p>インスタンスを作らなくても呼び出せるメソッドです。<code>Math.sqrt()</code> や <code>System.out.println()</code> のようなものがこれに当たります。</p>\n<pre><code>class MathHelper {\n    static double circle(double r) {\n        return Math.PI * r * r;  // 円の面積\n    }\n}\ndouble area = MathHelper.circle(5.0);</code></pre>",
    "conceptZh": "<h3>类方法（static方法）</h3>\n<p>类方法（static方法）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.140）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🧱 构造器与 static 就像是“小区的公共绿地与私有阳台”：static 是公共的（全区共享一份），构造器是私有的出厂装修，帮你一入住就通网通电。",
    "example": "public class Main {\n    static class Counter {\n        static int count = 0;\n        Counter() { count++; }\n    }\n    public static void main(String[] args) {\n        new Counter();\n        new Counter();\n        System.out.println(\"共享静态计数器: \" + Counter.count);\n    }\n}",
    "vocabList": [
      {
        "term": "this",
        "zh": "自身引用",
        "desc": "現在のインスタンス自身を指すキーワード。"
      },
      {
        "term": "static",
        "zh": "静态的",
        "desc": "クラスに属し、インスタンスで共有されることを示す修飾子。"
      },
      {
        "term": "クラスメソッド",
        "zh": "类方法/静态方法",
        "desc": "staticが付いたメソッド。インスタンスなしで呼び出せる。"
      }
    ],
    "quizList": [
      {
        "question": "static フィールドの特徴は何ですか？",
        "questionZh": "static字段的特点是什么？",
        "options": [
          "各インスタンスが個別に持つ",
          "全インスタンスで共有される",
          "読み取り専用になる",
          "外部からアクセスできなくなる"
        ],
        "answerIdx": 1,
        "hint": "staticは「クラスに属する」という意味です / static表示「属于类」。"
      },
      {
        "question": "thisキーワードが指すものは何ですか？",
        "questionZh": "this关键字指的是什么？",
        "options": [
          "クラス自体",
          "現在のインスタンス（自分自身）",
          "親クラス",
          "staticフィールド"
        ],
        "answerIdx": 1,
        "hint": "「このインスタンス」という意味です / 意思是「这个实例」。"
      }
    ],
    "pdfPage": 140,
    "pdfHighlightTerm": "クラスメソッド（static メソッド）",
    "originalChapterId": "nyumon-6"
  },
  {
    "id": 38,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 6,
    "chapterName": "第6章 クラスの一歩進んだ使い方",
    "subSectionId": "6-E",
    "subSectionName": "6-E 演習問題 (课后练习)",
    "section": "入門編 第6章 クラスの一歩進んだ使い方",
    "titleJa": "演習：第6章の課題",
    "titleZh": "练习：第6章的课后练习",
    "conceptJa": "<h3>第6章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>Studentクラスに、コンストラクタ「Student(String name, int age)」を定義し、newする際に初期値を一発で設定してオブジェクトを生成し、表示するプログラムを記述してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第6章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>为 `Student` 类编写带有参数的构造方法 `Student(String name, int age)`。在实例化该对象时直接传入参数完成初始化配置，并输出该对象的数据。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第6章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第6章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 141,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "nyumon-6"
  },
  {
    "id": 39,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 7,
    "chapterName": "第7章 継承",
    "subSectionId": "7-1",
    "subSectionName": "7-1 継承とは",
    "section": "入門編 第7章 継承",
    "titleJa": "継承とは",
    "titleZh": "什么是继承（Inheritance）",
    "conceptJa": "<h3>継承とは</h3>\n<p>既存のクラス（スーパークラス/親クラス）の機能を引き継いで、新しいクラス（サブクラス/子クラス）を作ることです。コードの再利用が容易になります。</p>\n<pre><code>class Animal {\n    String name;\n    void eat() { System.out.println(name + \"が食べる\"); }\n}\n\nclass Dog extends Animal {  // Animalを継承\n    void bark() { System.out.println(name + \"が吠える\"); }\n}\n// Dog は eat() と bark() の両方が使える</code></pre>\n\n",
    "conceptZh": "<h3>什么是继承（Inheritance）</h3>\n<p>继承是让新类（子类/SubClass）自动拥有已有类（父类/SuperClass）的所有字段和方法的机制，实现代码复用。</p>\n<pre><code>class Animal {\n    String name;\n    void eat() { System.out.println(name + \"在吃\"); }\n}\nclass Dog extends Animal {  // 继承Animal\n    void bark() { System.out.println(name + \"在叫\"); }\n}\n// Dog 可以用 eat() 和 bark() 两个方法</code></pre>\n\n",
    "analogy": "👨‍👦 继承与多态就像是“乐器世家”：儿子不仅继承了父亲的琴行和拉琴手艺，还能青出于蓝（重写），并以不同乐器的姿态（多态）登台献艺。",
    "example": "public class Main {\n    static class Animal {\n        void run() { System.out.println(\"奔跑...\"); }\n    }\n    static class Dog extends Animal {\n        void bark() { System.out.println(\"汪汪！\"); }\n    }\n    public static void main(String[] args) {\n        Dog dog = new Dog();\n        dog.run(); // 继承了父类的方法\n        dog.bark();\n    }\n}",
    "vocabList": [
      {
        "term": "継承 (inheritance)",
        "zh": "继承",
        "desc": "既存クラスの機能を引き継いで新しいクラスを作ること。"
      },
      {
        "term": "スーパークラス (superclass)",
        "zh": "父类/超类",
        "desc": "継承元のクラス（親クラス）。"
      },
      {
        "term": "サブクラス (subclass)",
        "zh": "子类",
        "desc": "継承先のクラス（子クラス）。"
      }
    ],
    "quizList": [
      {
        "question": "Javaで継承を行うキーワードはどれですか？",
        "questionZh": "Java中实现继承使用的关键字是什么？",
        "options": [
          "implements",
          "extends",
          "super",
          "inherit"
        ],
        "answerIdx": 1,
        "hint": "「拡張する」という意味の英単語です / 意思是「扩展」的英文单词。"
      }
    ],
    "pdfPage": 145,
    "pdfHighlightTerm": "継承とは",
    "originalChapterId": "nyumon-7"
  },
  {
    "id": 40,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 7,
    "chapterName": "第7章 継承",
    "subSectionId": "7-2",
    "subSectionName": "7-2 メソッドのオーバーライド",
    "section": "入門編 第7章 継承",
    "titleJa": "メソッドのオーバーライド",
    "titleZh": "方法覆盖（Override）",
    "conceptJa": "<h3>メソッドのオーバーライド</h3>\n<p>スーパークラスのメソッドを子クラスで再定義（上書き）することです。</p>\n<pre><code>class Animal {\n    void speak() { System.out.println(\"...\"); }\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println(\"ワン！\"); }  // 上書き\n}\nclass Cat extends Animal {\n    @Override\n    void speak() { System.out.println(\"ニャー！\"); }\n}</code></pre>\n\n",
    "conceptZh": "<h3>方法覆盖（Override）</h3>\n<p>方法覆盖（Override）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.152）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "👨‍👦 继承与多态就像是“乐器世家”：儿子不仅继承了父亲的琴行和拉琴手艺，还能青出于蓝（重写），并以不同乐器的姿态（多态）登台献艺。",
    "example": "public class Main {\n    static class Animal {\n        void sound() { System.out.println(\"发出叫声...\"); }\n    }\n    static class Cat extends Animal {\n        @Override\n        void sound() { System.out.println(\"喵喵~\"); }\n    }\n    public static void main(String[] args) {\n        Animal a = new Cat();\n        a.sound(); // 多态调用重写方法\n    }\n}",
    "vocabList": [
      {
        "term": "スーパークラス (superclass)",
        "zh": "父类/超类",
        "desc": "継承元のクラス（親クラス）。"
      },
      {
        "term": "オーバーライド (override)",
        "zh": "方法覆盖",
        "desc": "スーパークラスのメソッドをサブクラスで再定義すること。"
      }
    ],
    "quizList": [
      {
        "question": "Javaで継承を行うキーワードはどれですか？",
        "questionZh": "Java中实现继承使用的关键字是什么？",
        "options": [
          "implements",
          "extends",
          "super",
          "inherit"
        ],
        "answerIdx": 1,
        "hint": "「拡張する」という意味の英単語です / 意思是「扩展」的英文单词。"
      },
      {
        "question": "@Overrideアノテーションの目的は何ですか？",
        "questionZh": "@Override注解的目的是什么？",
        "options": [
          "新しいメソッドを作る",
          "スーパークラスのメソッドを上書きすることをコンパイラに知らせる",
          "メソッドを削除する",
          "staticメソッドにする"
        ],
        "answerIdx": 1,
        "hint": "コンパイラがミスを検出できるようになります / 让编译器能检测到错误。"
      },
      {
        "question": "ポリモーフィズムとは何ですか？",
        "questionZh": "多态性（Polymorphism）是什么？",
        "options": [
          "一つのクラスに複数のコンストラクタを持つこと",
          "スーパークラス型の変数でサブクラスインスタンスを扱えること",
          "メソッドのオーバーロードのこと",
          "クラスを継承しないこと"
        ],
        "answerIdx": 1,
        "hint": "「多態」は「多くの形を取れる」という意味です / 多态意思是「可以有多种形态」。"
      }
    ],
    "pdfPage": 152,
    "pdfHighlightTerm": "メソッドのオーバーライド",
    "originalChapterId": "nyumon-7"
  },
  {
    "id": 41,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 7,
    "chapterName": "第7章 継承",
    "subSectionId": "7-3",
    "subSectionName": "7-3 ポリモーフィズム（多態性）",
    "section": "入門編 第7章 継承",
    "titleJa": "ポリモーフィズム（多態性）",
    "titleZh": "多态性（Polymorphism）",
    "conceptJa": "<h3>ポリモーフィズム（多態性）</h3>\n<p>スーパークラス型の変数でサブクラスのインスタンスを受け取れます。どのメソッドが呼ばれるかは実際のインスタンスの型で決まります。</p>\n<pre><code>Animal a1 = new Dog();\nAnimal a2 = new Cat();\na1.speak();  // ワン！\na2.speak();  // ニャー！</code></pre>\n\n",
    "conceptZh": "<h3>多态性（Polymorphism）</h3>\n<p>父类类型的变量可以引用子类实例。调用方法时，根据实际对象的类型来决定执行哪个方法。</p>\n<pre><code>Animal a1 = new Dog();\nAnimal a2 = new Cat();\na1.speak();  // ワン！（调用Dog的speak）\na2.speak();  // ニャー！（调用Cat的speak）</code></pre>\n\n",
    "analogy": "👨‍👦 继承与多态就像是“乐器世家”：儿子不仅继承了父亲的琴行和拉琴手艺，还能青出于蓝（重写），并以不同乐器的姿态（多态）登台献艺。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"继承与多态\");\n    }\n}",
    "vocabList": [
      {
        "term": "スーパークラス (superclass)",
        "zh": "父类/超类",
        "desc": "継承元のクラス（親クラス）。"
      },
      {
        "term": "サブクラス (subclass)",
        "zh": "子类",
        "desc": "継承先のクラス（子クラス）。"
      },
      {
        "term": "ポリモーフィズム (polymorphism)",
        "zh": "多态性",
        "desc": "同じ型の変数でも、実際のインスタンスに応じて異なるメソッドが呼ばれる性質。"
      }
    ],
    "quizList": [
      {
        "question": "ポリモーフィズムとは何ですか？",
        "questionZh": "多态性（Polymorphism）是什么？",
        "options": [
          "一つのクラスに複数のコンストラクタを持つこと",
          "スーパークラス型の変数でサブクラスインスタンスを扱えること",
          "メソッドのオーバーロードのこと",
          "クラスを継承しないこと"
        ],
        "answerIdx": 1,
        "hint": "「多態」は「多くの形を取れる」という意味です / 多态意思是「可以有多种形态」。"
      }
    ],
    "pdfPage": 163,
    "pdfHighlightTerm": "ポリモーフィズム（多態性）",
    "originalChapterId": "nyumon-7"
  },
  {
    "id": 42,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 7,
    "chapterName": "第7章 継承",
    "subSectionId": "7-4",
    "subSectionName": "7-4 super キーワード",
    "section": "入門編 第7章 継承",
    "titleJa": "super キーワード",
    "titleZh": "super关键字",
    "conceptJa": "<h3>super キーワード</h3>\n<p>スーパークラスのコンストラクタやメソッドを呼び出すときに使います。</p>\n<pre><code>class Dog extends Animal {\n    Dog(String name) {\n        super(name);  // 親クラスのコンストラクタ呼び出し\n    }\n}</code></pre>\n\n",
    "conceptZh": "<h3>super关键字</h3>\n<p>super关键字是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.164）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "👨‍👦 继承与多态就像是“乐器世家”：儿子不仅继承了父亲的琴行和拉琴手艺，还能青出于蓝（重写），并以不同乐器的姿态（多态）登台献艺。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"继承与多态\");\n    }\n}",
    "vocabList": [
      {
        "term": "スーパークラス (superclass)",
        "zh": "父类/超类",
        "desc": "継承元のクラス（親クラス）。"
      }
    ],
    "quizList": [
      {
        "question": "Javaで継承を行うキーワードはどれですか？",
        "questionZh": "Java中实现继承使用的关键字是什么？",
        "options": [
          "implements",
          "extends",
          "super",
          "inherit"
        ],
        "answerIdx": 1,
        "hint": "「拡張する」という意味の英単語です / 意思是「扩展」的英文单词。"
      },
      {
        "question": "@Overrideアノテーションの目的は何ですか？",
        "questionZh": "@Override注解的目的是什么？",
        "options": [
          "新しいメソッドを作る",
          "スーパークラスのメソッドを上書きすることをコンパイラに知らせる",
          "メソッドを削除する",
          "staticメソッドにする"
        ],
        "answerIdx": 1,
        "hint": "コンパイラがミスを検出できるようになります / 让编译器能检测到错误。"
      },
      {
        "question": "ポリモーフィズムとは何ですか？",
        "questionZh": "多态性（Polymorphism）是什么？",
        "options": [
          "一つのクラスに複数のコンストラクタを持つこと",
          "スーパークラス型の変数でサブクラスインスタンスを扱えること",
          "メソッドのオーバーロードのこと",
          "クラスを継承しないこと"
        ],
        "answerIdx": 1,
        "hint": "「多態」は「多くの形を取れる」という意味です / 多态意思是「可以有多种形态」。"
      }
    ],
    "pdfPage": 164,
    "pdfHighlightTerm": "super キーワード",
    "originalChapterId": "nyumon-7"
  },
  {
    "id": 43,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 7,
    "chapterName": "第7章 継承",
    "subSectionId": "7-5",
    "subSectionName": "7-5 Objectクラス",
    "section": "入門編 第7章 継承",
    "titleJa": "Objectクラス",
    "titleZh": "Object类",
    "conceptJa": "<h3>Objectクラス</h3>\n<p>Javaの全クラスは<code>Object</code>クラスを暗黙的に継承しています。</p>",
    "conceptZh": "<h3>Object类</h3>\n<p>Object类是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.150）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "👨‍👦 继承与多态就像是“乐器世家”：儿子不仅继承了父亲的琴行和拉琴手艺，还能青出于蓝（重写），并以不同乐器的姿态（多态）登台献艺。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"继承与多态\");\n    }\n}",
    "vocabList": [
      {
        "term": "継承 (inheritance)",
        "zh": "继承",
        "desc": "既存クラスの機能を引き継いで新しいクラスを作ること。"
      }
    ],
    "quizList": [
      {
        "question": "Javaで継承を行うキーワードはどれですか？",
        "questionZh": "Java中实现继承使用的关键字是什么？",
        "options": [
          "implements",
          "extends",
          "super",
          "inherit"
        ],
        "answerIdx": 1,
        "hint": "「拡張する」という意味の英単語です / 意思是「扩展」的英文单词。"
      }
    ],
    "pdfPage": 150,
    "pdfHighlightTerm": "Objectクラス",
    "originalChapterId": "nyumon-7"
  },
  {
    "id": 44,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 7,
    "chapterName": "第7章 継承",
    "subSectionId": "7-E",
    "subSectionName": "7-E 演習問題 (课后练习)",
    "section": "入門編 第7章 継承",
    "titleJa": "演習：第7章の課題",
    "titleZh": "练习：第7章的课后练习",
    "conceptJa": "<h3>第7章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>スーパークラス『Animal』と、それを継承したサブクラス『Dog』を定義してください。Animalに「run()」メソッドを、Dogに「bark()」メソッドを実装し、Dogのインスタンスから両方を呼び出してみましょう。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第7章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>设计父类 `Animal`（包含 run() 方法）与子类 `Dog`（继承 Animal 并包含专属的 bark() 叫声方法）。实例化 Dog 对象，测试继承自父类的方法以及它自己的方法是否都能执行。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第7章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第7章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 151,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "nyumon-7"
  },
  {
    "id": 45,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 8,
    "chapterName": "第8章 抽象クラスとインタフェース",
    "subSectionId": "8-1",
    "subSectionName": "8-1 アクセス修飾子",
    "section": "入門編 第8章 抽象クラスとインタフェース",
    "titleJa": "アクセス修飾子",
    "titleZh": "访问修饰符",
    "conceptJa": "<h3>アクセス修飾子</h3>\n<table border=\"1\" style=\"border-collapse:collapse;width:100%\">\n<tr><th>修飾子</th><th>アクセス範囲</th></tr>\n<tr><td>public</td><td>どこからでもアクセス可</td></tr>\n<tr><td>private</td><td>同じクラス内のみ</td></tr>\n<tr><td>protected</td><td>同じパッケージ + サブクラス</td></tr>\n<tr><td>（なし）</td><td>同じパッケージ内</td></tr>\n</table>\n<p><strong>カプセル化</strong>：フィールドを<code>private</code>にして外部から直接アクセスさせず、<code>getter/setter</code>メソッドを通じてアクセスさせる設計パターン。</p>\n\n",
    "conceptZh": "<h3>访问修饰符</h3>\n<table border=\"1\" style=\"border-collapse:collapse;width:100%\">\n<tr><th>修饰符</th><th>访问范围</th></tr>\n<tr><td>public</td><td>任何地方都可访问</td></tr>\n<tr><td>private</td><td>只有同一个类内部</td></tr>\n<tr><td>protected</td><td>同包 + 子类</td></tr>\n<tr><td>（无）</td><td>同一个包内</td></tr>\n</table>\n<p><strong>封装（Encapsulation）</strong>：将字段设为<code>private</code>，通过<code>getter/setter</code>方法访问，保护数据不被随意修改。</p>\n\n",
    "analogy": "🔐 接口与抽象类就像是“建筑规范与招商规范”：访问修饰符是你的门禁系统，抽象类给你建好了主体地基，而接口则规定了所有入驻商户必须安装统一的电源接头。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"抽象类与接口\");\n    }\n}",
    "vocabList": [
      {
        "term": "カプセル化 (encapsulation)",
        "zh": "封装",
        "desc": "データを隠蔽してgetterやsetterを通じてアクセスさせる設計原則。"
      },
      {
        "term": "final",
        "zh": "最终的/不可变",
        "desc": "変数・メソッド・クラスを変更不可にする修飾子。"
      }
    ],
    "quizList": [
      {
        "question": "インタフェースを実装するキーワードはどれですか？",
        "questionZh": "实现接口使用的关键字是什么？",
        "options": [
          "extends",
          "implements",
          "interface",
          "abstract"
        ],
        "answerIdx": 1,
        "hint": "「実装する」という英単語です / 意思是「实现」的英文单词。"
      },
      {
        "question": "privateフィールドの特徴は何ですか？",
        "questionZh": "private字段的特点是什么？",
        "options": [
          "どこからでもアクセスできる",
          "同じクラス内からのみアクセスできる",
          "サブクラスからアクセスできる",
          "staticである"
        ],
        "answerIdx": 1,
        "hint": "カプセル化（データ隠蔽）のために使います / 用于封装（数据隐藏）。"
      },
      {
        "question": "抽象クラスについて正しい説明はどれですか？",
        "questionZh": "关于抽象类，哪个描述正确？",
        "options": [
          "インスタンスを直接作れる",
          "全てのメソッドが抽象メソッドである必要がある",
          "直接インスタンス化できず、サブクラスで実装する",
          "final修飾子が必須"
        ],
        "answerIdx": 2,
        "hint": "abstractクラスはnewで生成できません / abstract类不能用new直接创建。"
      }
    ],
    "pdfPage": 168,
    "pdfHighlightTerm": "アクセス修飾子",
    "originalChapterId": "nyumon-8"
  },
  {
    "id": 46,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 8,
    "chapterName": "第8章 抽象クラスとインタフェース",
    "subSectionId": "8-2",
    "subSectionName": "8-2 final修飾子",
    "section": "入門編 第8章 抽象クラスとインタフェース",
    "titleJa": "final修飾子",
    "titleZh": "final修饰符",
    "conceptJa": "<h3>final修飾子</h3>\n<ul>\n  <li><code>final</code>変数：値を変更できない定数</li>\n  <li><code>final</code>メソッド：オーバーライドできない</li>\n  <li><code>final</code>クラス：継承できない（例：Stringクラス）</li>\n</ul>\n\n",
    "conceptZh": "<h3>final修饰符</h3>\n<p>final修饰符是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.172）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🔐 接口与抽象类就像是“建筑规范与招商规范”：访问修饰符是你的门禁系统，抽象类给你建好了主体地基，而接口则规定了所有入驻商户必须安装统一的电源接头。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"抽象类与接口\");\n    }\n}",
    "vocabList": [
      {
        "term": "final",
        "zh": "最终的/不可变",
        "desc": "変数・メソッド・クラスを変更不可にする修飾子。"
      }
    ],
    "quizList": [
      {
        "question": "インタフェースを実装するキーワードはどれですか？",
        "questionZh": "实现接口使用的关键字是什么？",
        "options": [
          "extends",
          "implements",
          "interface",
          "abstract"
        ],
        "answerIdx": 1,
        "hint": "「実装する」という英単語です / 意思是「实现」的英文单词。"
      },
      {
        "question": "privateフィールドの特徴は何ですか？",
        "questionZh": "private字段的特点是什么？",
        "options": [
          "どこからでもアクセスできる",
          "同じクラス内からのみアクセスできる",
          "サブクラスからアクセスできる",
          "staticである"
        ],
        "answerIdx": 1,
        "hint": "カプセル化（データ隠蔽）のために使います / 用于封装（数据隐藏）。"
      },
      {
        "question": "抽象クラスについて正しい説明はどれですか？",
        "questionZh": "关于抽象类，哪个描述正确？",
        "options": [
          "インスタンスを直接作れる",
          "全てのメソッドが抽象メソッドである必要がある",
          "直接インスタンス化できず、サブクラスで実装する",
          "final修飾子が必須"
        ],
        "answerIdx": 2,
        "hint": "abstractクラスはnewで生成できません / abstract类不能用new直接创建。"
      }
    ],
    "pdfPage": 172,
    "pdfHighlightTerm": "final修飾子",
    "originalChapterId": "nyumon-8"
  },
  {
    "id": 47,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 8,
    "chapterName": "第8章 抽象クラスとインタフェース",
    "subSectionId": "8-3",
    "subSectionName": "8-3 抽象クラス（abstract class）",
    "section": "入門編 第8章 抽象クラスとインタフェース",
    "titleJa": "抽象クラス（abstract class）",
    "titleZh": "抽象类（abstract class）",
    "conceptJa": "<h3>抽象クラス（abstract class）</h3>\n<p>インスタンスを直接作れないクラスです。サブクラスで実装すべき<strong>抽象メソッド</strong>（処理なし・宣言のみ）を持てます。</p>\n<pre><code>abstract class Animal {\n    abstract void speak();  // 実装はサブクラスに任せる\n    void breathe() { System.out.println(\"呼吸中...\"); }\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println(\"ワン！\"); }\n}</code></pre>\n\n",
    "conceptZh": "<h3>抽象类（abstract class）</h3>\n<p>抽象类（abstract class）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.175）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🔐 接口与抽象类就像是“建筑规范与招商规范”：访问修饰符是你的门禁系统，抽象类给你建好了主体地基，而接口则规定了所有入驻商户必须安装统一的电源接头。",
    "example": "public class Main {\n    static abstract class Shape {\n        abstract void draw();\n    }\n    static class Circle extends Shape {\n        void draw() { System.out.println(\"画一个圆\"); }\n    }\n    public static void main(String[] args) {\n        Shape s = new Circle();\n        s.draw();\n    }\n}",
    "vocabList": [
      {
        "term": "抽象クラス (abstract class)",
        "zh": "抽象类",
        "desc": "インスタンス化できないクラス。抽象メソッドを含む可能性がある。"
      },
      {
        "term": "final",
        "zh": "最终的/不可变",
        "desc": "変数・メソッド・クラスを変更不可にする修飾子。"
      }
    ],
    "quizList": [
      {
        "question": "抽象クラスについて正しい説明はどれですか？",
        "questionZh": "关于抽象类，哪个描述正确？",
        "options": [
          "インスタンスを直接作れる",
          "全てのメソッドが抽象メソッドである必要がある",
          "直接インスタンス化できず、サブクラスで実装する",
          "final修飾子が必須"
        ],
        "answerIdx": 2,
        "hint": "abstractクラスはnewで生成できません / abstract类不能用new直接创建。"
      }
    ],
    "pdfPage": 175,
    "pdfHighlightTerm": "抽象クラス（abstract class）",
    "originalChapterId": "nyumon-8"
  },
  {
    "id": 48,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 8,
    "chapterName": "第8章 抽象クラスとインタフェース",
    "subSectionId": "8-4",
    "subSectionName": "8-4 インタフェース（interface）",
    "section": "入門編 第8章 抽象クラスとインタフェース",
    "titleJa": "インタフェース（interface）",
    "titleZh": "接口（interface）",
    "conceptJa": "<h3>インタフェース（interface）</h3>\n<p>メソッドの宣言のみを持つ「規約・契約書」です。クラスは<code>implements</code>で複数のインタフェースを実装できます（多重継承の代替）。</p>\n<pre><code>interface Flyable {\n    void fly();  // 実装なし\n}\ninterface Swimmable {\n    void swim();\n}\nclass Duck extends Animal implements Flyable, Swimmable {\n    public void fly() { System.out.println(\"飛ぶ\"); }\n    public void swim() { System.out.println(\"泳ぐ\"); }\n}</code></pre>",
    "conceptZh": "<h3>接口（interface）</h3>\n<p>接口（interface）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.181）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🔐 接口与抽象类就像是“建筑规范与招商规范”：访问修饰符是你的门禁系统，抽象类给你建好了主体地基，而接口则规定了所有入驻商户必须安装统一的电源接头。",
    "example": "public class Main {\n    interface Runnable {\n        void run();\n    }\n    static class Runner implements Runnable {\n        public void run() { System.out.println(\"奔跑中...\"); }\n    }\n    public static void main(String[] args) {\n        Runnable r = new Runner();\n        r.run();\n    }\n}",
    "vocabList": [
      {
        "term": "インタフェース (interface)",
        "zh": "接口",
        "desc": "メソッドの宣言のみを持つ規約。classはimplementsで実装する。"
      },
      {
        "term": "final",
        "zh": "最终的/不可变",
        "desc": "変数・メソッド・クラスを変更不可にする修飾子。"
      }
    ],
    "quizList": [
      {
        "question": "インタフェースを実装するキーワードはどれですか？",
        "questionZh": "实现接口使用的关键字是什么？",
        "options": [
          "extends",
          "implements",
          "interface",
          "abstract"
        ],
        "answerIdx": 1,
        "hint": "「実装する」という英単語です / 意思是「实现」的英文单词。"
      }
    ],
    "pdfPage": 181,
    "pdfHighlightTerm": "インタフェース（interface）",
    "originalChapterId": "nyumon-8"
  },
  {
    "id": 49,
    "book": "入門編",
    "bookZh": "入门篇",
    "chapterId": 8,
    "chapterName": "第8章 抽象クラスとインタフェース",
    "subSectionId": "8-E",
    "subSectionName": "8-E 演習問題 (课后练习)",
    "section": "入門編 第8章 抽象クラスとインタフェース",
    "titleJa": "演習：第8章の課題",
    "titleZh": "练习：第8章的课后练习",
    "conceptJa": "<h3>第8章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>抽象クラス『Shape』を定義し、その中に抽象メソッド『void draw()』を宣言してください。さらに、Shapeを継承した『Circle』クラスを作成し、draw()メソッドを具体的にオーバーライドして「円を描きます」と出力するコードを完成させてください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第8章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>声明抽象类 `Shape`（含抽象方法 draw()）及它的具体子类 `Circle`。在 Circle 中实现重写 draw() 方法并输出“开始画圆”，在 Main 中使用多态形式 `Shape s = new Circle(); s.draw();` 运行。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第8章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第8章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 182,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "nyumon-8"
  },
  {
    "id": 50,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 1,
    "chapterName": "実践編 第1章 パッケージとJava API",
    "subSectionId": "1-1",
    "subSectionName": "1-1 パッケージとは",
    "section": "実践編 実践編 第1章 パッケージとJava API",
    "titleJa": "パッケージとは",
    "titleZh": "什么是包（Package）",
    "conceptJa": "<h3>パッケージとは</h3>\n<p>関連するクラスをグループにまとめる仕組みです。フォルダに例えると分かりやすいです。</p>\n<p>例：<code>java.util.ArrayList</code> は、<code>java</code>パッケージの<code>util</code>サブパッケージにある<code>ArrayList</code>クラスです。</p>\n\n",
    "conceptZh": "<h3>什么是包（Package）</h3>\n<p>什么是包（Package）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.11）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "📦 包与常用 API 就像是“宜家的货架索引分类与附赠的多功能工具包”：通过 import 可以瞬间把工具拿到手边使用，免去自己手打工具的烦恼。",
    "example": "package com.example;\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"包 com.example 运行成功！\");\n    }\n}",
    "vocabList": [
      {
        "term": "パッケージ (package)",
        "zh": "包",
        "desc": "関連するクラスをグループにまとめる仕組み。フォルダに相当。"
      },
      {
        "term": "import",
        "zh": "导入",
        "desc": "他のパッケージのクラスを使えるようにする宣言。"
      },
      {
        "term": "API (Application Programming Interface)",
        "zh": "应用程序接口",
        "desc": "他者が提供するプログラムの使い方の仕様。Javaには標準APIが豊富。"
      }
    ],
    "quizList": [
      {
        "question": "文字列の内容を比較するとき、正しい方法はどれですか？",
        "questionZh": "比较字符串内容时，正确的方法是什么？",
        "options": [
          "== を使う",
          ".equals() を使う",
          ".compare() を使う",
          ".match() を使う"
        ],
        "answerIdx": 1,
        "hint": "==は参照（アドレス）を比較します。文字列の中身を比べるにはequalsです / ==比较地址，内容比较用equals。"
      },
      {
        "question": "\\",
        "questionZh": "\\",
        "options": [
          "4",
          "5",
          "6",
          "エラー"
        ],
        "answerIdx": 1,
        "hint": "H-e-l-l-o の5文字です / H-e-l-l-o共5个字符。"
      },
      {
        "question": "Math.random()が返す値の範囲は？",
        "questionZh": "Math.random()返回值的范围是？",
        "options": [
          "0〜100",
          "0.0以上1.0未満",
          "-1.0〜1.0",
          "0〜Integer.MAX_VALUE"
        ],
        "answerIdx": 1,
        "hint": "0.0以上1.0未満の小数です / 大于等于0.0小于1.0的小数。"
      }
    ],
    "pdfPage": 11,
    "pdfHighlightTerm": "パッケージとは",
    "originalChapterId": "jissen-1"
  },
  {
    "id": 51,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 1,
    "chapterName": "実践編 第1章 パッケージとJava API",
    "subSectionId": "1-2",
    "subSectionName": "1-2 import宣言",
    "section": "実践編 実践編 第1章 パッケージとJava API",
    "titleJa": "import宣言",
    "titleZh": "import声明",
    "conceptJa": "<h3>import宣言</h3>\n<p>他のパッケージのクラスを使うときは<code>import</code>で読み込みます。<code>java.lang</code>パッケージは自動でインポートされます。</p>\n<pre><code>import java.util.ArrayList;     // 特定のクラス\nimport java.util.*;              // パッケージ内の全クラス</code></pre>\n\n",
    "conceptZh": "<h3>import声明</h3>\n<p>要使用其他包中的类，需要用<code>import</code>声明。<code>java.lang</code>包会自动导入。</p>\n<pre><code>import java.util.ArrayList;   // 导入特定类\nimport java.util.*;            // 导入整个包的所有类</code></pre>\n\n",
    "analogy": "📦 包与常用 API 就像是“宜家的货架索引分类与附赠的多功能工具包”：通过 import 可以瞬间把工具拿到手边使用，免去自己手打工具的烦恼。",
    "example": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>();\n        list.add(\"Java\");\n        System.out.println(\"Imported: \" + list);\n    }\n}",
    "vocabList": [
      {
        "term": "パッケージ (package)",
        "zh": "包",
        "desc": "関連するクラスをグループにまとめる仕組み。フォルダに相当。"
      },
      {
        "term": "import",
        "zh": "导入",
        "desc": "他のパッケージのクラスを使えるようにする宣言。"
      },
      {
        "term": "API (Application Programming Interface)",
        "zh": "应用程序接口",
        "desc": "他者が提供するプログラムの使い方の仕様。Javaには標準APIが豊富。"
      }
    ],
    "quizList": [
      {
        "question": "文字列の内容を比較するとき、正しい方法はどれですか？",
        "questionZh": "比较字符串内容时，正确的方法是什么？",
        "options": [
          "== を使う",
          ".equals() を使う",
          ".compare() を使う",
          ".match() を使う"
        ],
        "answerIdx": 1,
        "hint": "==は参照（アドレス）を比較します。文字列の中身を比べるにはequalsです / ==比较地址，内容比较用equals。"
      },
      {
        "question": "\\",
        "questionZh": "\\",
        "options": [
          "4",
          "5",
          "6",
          "エラー"
        ],
        "answerIdx": 1,
        "hint": "H-e-l-l-o の5文字です / H-e-l-l-o共5个字符。"
      },
      {
        "question": "Math.random()が返す値の範囲は？",
        "questionZh": "Math.random()返回值的范围是？",
        "options": [
          "0〜100",
          "0.0以上1.0未満",
          "-1.0〜1.0",
          "0〜Integer.MAX_VALUE"
        ],
        "answerIdx": 1,
        "hint": "0.0以上1.0未満の小数です / 大于等于0.0小于1.0的小数。"
      }
    ],
    "pdfPage": 7,
    "pdfHighlightTerm": "import宣言",
    "originalChapterId": "jissen-1"
  },
  {
    "id": 52,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 1,
    "chapterName": "実践編 第1章 パッケージとJava API",
    "subSectionId": "1-3",
    "subSectionName": "1-3 Stringクラスの主なメソッド",
    "section": "実践編 実践編 第1章 パッケージとJava API",
    "titleJa": "Stringクラスの主なメソッド",
    "titleZh": "String类的主要方法",
    "conceptJa": "<h3>Stringクラスの主なメソッド</h3>\n<table border=\"1\" style=\"border-collapse:collapse;width:100%\">\n<tr><th>メソッド</th><th>説明</th><th>例</th></tr>\n<tr><td>length()</td><td>文字数</td><td>\"Hello\".length() → 5</td></tr>\n<tr><td>charAt(i)</td><td>i番目の文字</td><td>\"Hello\".charAt(1) → 'e'</td></tr>\n<tr><td>substring(s,e)</td><td>部分文字列</td><td>\"Hello\".substring(1,3) → \"el\"</td></tr>\n<tr><td>indexOf(s)</td><td>文字列の位置</td><td>\"Hello\".indexOf(\"l\") → 2</td></tr>\n<tr><td>equals(s)</td><td>文字列比較</td><td>\"abc\".equals(\"abc\") → true</td></tr>\n<tr><td>toUpperCase()</td><td>大文字変換</td><td>\"hello\".toUpperCase() → \"HELLO\"</td></tr>\n<tr><td>split(s)</td><td>分割</td><td>\"a,b,c\".split(\",\") → {\"a\",\"b\",\"c\"}</td></tr>\n</table>\n\n",
    "conceptZh": "<h3>String类的主要方法</h3>\n<p>String类的主要方法是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.16）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "📦 包与常用 API 就像是“宜家的货架索引分类与附赠的多功能工具包”：通过 import 可以瞬间把工具拿到手边使用，免去自己手打工具的烦恼。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        String text = \"  Java Programming  \";\n        System.out.println(\"原始: [\" + text + \"]\");\n        System.out.println(\"去空: [\" + text.trim() + \"]\");\n        System.out.println(\"大写: \" + text.toUpperCase());\n    }\n}",
    "vocabList": [
      {
        "term": "import",
        "zh": "导入",
        "desc": "他のパッケージのクラスを使えるようにする宣言。"
      },
      {
        "term": "API (Application Programming Interface)",
        "zh": "应用程序接口",
        "desc": "他者が提供するプログラムの使い方の仕様。Javaには標準APIが豊富。"
      }
    ],
    "quizList": [
      {
        "question": "文字列の内容を比較するとき、正しい方法はどれですか？",
        "questionZh": "比较字符串内容时，正确的方法是什么？",
        "options": [
          "== を使う",
          ".equals() を使う",
          ".compare() を使う",
          ".match() を使う"
        ],
        "answerIdx": 1,
        "hint": "==は参照（アドレス）を比較します。文字列の中身を比べるにはequalsです / ==比较地址，内容比较用equals。"
      },
      {
        "question": "\\",
        "questionZh": "\\",
        "options": [
          "4",
          "5",
          "6",
          "エラー"
        ],
        "answerIdx": 1,
        "hint": "H-e-l-l-o の5文字です / H-e-l-l-o共5个字符。"
      },
      {
        "question": "Math.random()が返す値の範囲は？",
        "questionZh": "Math.random()返回值的范围是？",
        "options": [
          "0〜100",
          "0.0以上1.0未満",
          "-1.0〜1.0",
          "0〜Integer.MAX_VALUE"
        ],
        "answerIdx": 1,
        "hint": "0.0以上1.0未満の小数です / 大于等于0.0小于1.0的小数。"
      }
    ],
    "pdfPage": 16,
    "pdfHighlightTerm": "Stringクラスの主なメソッド",
    "originalChapterId": "jissen-1"
  },
  {
    "id": 53,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 1,
    "chapterName": "実践編 第1章 パッケージとJava API",
    "subSectionId": "1-4",
    "subSectionName": "1-4 Mathクラスの主なメソッド",
    "section": "実践編 実践編 第1章 パッケージとJava API",
    "titleJa": "Mathクラスの主なメソッド",
    "titleZh": "Math类的主要方法",
    "conceptJa": "<h3>Mathクラスの主なメソッド</h3>\n<pre><code>Math.abs(-5)      // 絶対値 = 5\nMath.sqrt(16.0)   // 平方根 = 4.0\nMath.pow(2, 10)   // 累乗 = 1024.0\nMath.max(3, 7)    // 最大値 = 7\nMath.random()     // 0.0〜1.0の乱数\nMath.PI           // 円周率 ≈ 3.14159...</code></pre>",
    "conceptZh": "<h3>Math类的主要方法</h3>\n<p>Math类的主要方法是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.21）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "📦 包与常用 API 就像是“宜家的货架索引分类与附赠的多功能工具包”：通过 import 可以瞬间把工具拿到手边使用，免去自己手打工具的烦恼。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        double num = 16.0;\n        System.out.println(\"16的平方根: \" + Math.sqrt(num));\n        System.out.println(\"绝对值: \" + Math.abs(-10));\n        System.out.println(\"随机数 (0~1): \" + Math.random());\n    }\n}",
    "vocabList": [
      {
        "term": "import",
        "zh": "导入",
        "desc": "他のパッケージのクラスを使えるようにする宣言。"
      },
      {
        "term": "API (Application Programming Interface)",
        "zh": "应用程序接口",
        "desc": "他者が提供するプログラムの使い方の仕様。Javaには標準APIが豊富。"
      }
    ],
    "quizList": [
      {
        "question": "文字列の内容を比較するとき、正しい方法はどれですか？",
        "questionZh": "比较字符串内容时，正确的方法是什么？",
        "options": [
          "== を使う",
          ".equals() を使う",
          ".compare() を使う",
          ".match() を使う"
        ],
        "answerIdx": 1,
        "hint": "==は参照（アドレス）を比較します。文字列の中身を比べるにはequalsです / ==比较地址，内容比较用equals。"
      },
      {
        "question": "\\",
        "questionZh": "\\",
        "options": [
          "4",
          "5",
          "6",
          "エラー"
        ],
        "answerIdx": 1,
        "hint": "H-e-l-l-o の5文字です / H-e-l-l-o共5个字符。"
      },
      {
        "question": "Math.random()が返す値の範囲は？",
        "questionZh": "Math.random()返回值的范围是？",
        "options": [
          "0〜100",
          "0.0以上1.0未満",
          "-1.0〜1.0",
          "0〜Integer.MAX_VALUE"
        ],
        "answerIdx": 1,
        "hint": "0.0以上1.0未満の小数です / 大于等于0.0小于1.0的小数。"
      }
    ],
    "pdfPage": 21,
    "pdfHighlightTerm": "Mathクラスの主なメソッド",
    "originalChapterId": "jissen-1"
  },
  {
    "id": 54,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 1,
    "chapterName": "実践編 第1章 パッケージとJava API",
    "subSectionId": "1-E",
    "subSectionName": "1-E 演習問題 (课后练习)",
    "section": "実践編 実践編 第1章 パッケージとJava API",
    "titleJa": "演習：第1章の課題",
    "titleZh": "练习：第1章的课后练习",
    "conceptJa": "<h3>第1章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>Stringクラスの主要メソッドを使用して、キーボードから入力された任意の文字列の「文字数」と「先頭から3文字」を取得して表示するプログラムを作成してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第1章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>使用 String 类的主要方法，接收一个从键盘输入的字符串，输出该字符串的“总字符数”和“前三个字符”。如果字符串不足三个字，则输出提示。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第1章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第1章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 22,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "jissen-1"
  },
  {
    "id": 55,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 2,
    "chapterName": "実践編 第2章 例外処理",
    "subSectionId": "2-1",
    "subSectionName": "2-1 例外とは",
    "section": "実践編 実践編 第2章 例外処理",
    "titleJa": "例外とは",
    "titleZh": "什么是异常（Exception）",
    "conceptJa": "<h3>例外とは</h3>\n<p>プログラム実行中に発生するエラーのことです。例えば、0での割り算、存在しない配列のインデックスへのアクセス、nullのメソッド呼び出しなどがあります。</p>\n\n",
    "conceptZh": "<h3>什么是异常（Exception）</h3>\n<p>什么是异常（Exception）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.31）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🏥 异常处理就像是“赛车跑道上的撞击缓冲墙和全时救护车（try-catch）”：它能极大程度保证整场赛车（程序运行）在失控时不会车毁人亡，而是安全善后。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        try {\n            int[] arr = new int[2];\n            System.out.println(arr[5]);\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println(\"捕获到数组越界异常！\");\n        } finally {\n            System.out.println(\"不管出不出错，此处代码必执行！\");\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "例外 (exception)",
        "zh": "异常",
        "desc": "プログラム実行中に発生するエラー。"
      },
      {
        "term": "throw",
        "zh": "抛出",
        "desc": "プログラマが意図的に例外を投げる（発生させる）こと。"
      },
      {
        "term": "finally",
        "zh": "最终",
        "desc": "例外の有無にかかわらず必ず実行されるブロック。"
      }
    ],
    "quizList": [
      {
        "question": "finallyブロックが実行されるのはいつですか？",
        "questionZh": "finally块在什么情况下执行？",
        "options": [
          "例外が発生したときだけ",
          "例外が発生しなかったときだけ",
          "例外の有無にかかわらず常に",
          "catchが成功したときだけ"
        ],
        "answerIdx": 2,
        "hint": "finallyは「最終的に」という意味で、必ず実行されます / finally意思是「最终」，总是会执行。"
      },
      {
        "question": "0での割り算が起きたときに発生する例外は？",
        "questionZh": "除以零时会发生什么异常？",
        "options": [
          "NullPointerException",
          "ArithmeticException",
          "NumberFormatException",
          "IOException"
        ],
        "answerIdx": 1,
        "hint": "算術（Arithmetic）に関する例外です / 与算术（Arithmetic）相关的异常。"
      },
      {
        "question": "throwsキーワードの目的は？",
        "questionZh": "throws关键字的目的是什么？",
        "options": [
          "例外をキャッチする",
          "例外を直接処理する",
          "メソッドが例外を発生させる可能性があることを宣言する",
          "finallyブロックを実行する"
        ],
        "answerIdx": 2,
        "hint": "呼び出し元に例外処理を任せる宣言です / 声明此方法可能抛出异常，让调用者处理。"
      }
    ],
    "pdfPage": 31,
    "pdfHighlightTerm": "例外とは",
    "originalChapterId": "jissen-2"
  },
  {
    "id": 56,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 2,
    "chapterName": "実践編 第2章 例外処理",
    "subSectionId": "2-2",
    "subSectionName": "2-2 try〜catch文",
    "section": "実践編 実践編 第2章 例外処理",
    "titleJa": "try〜catch文",
    "titleZh": "try-catch-finally语句",
    "conceptJa": "<h3>try〜catch文</h3>\n<p>例外が発生した場合に、プログラムが停止しないよう処理を「捕捉（キャッチ）」します。</p>\n<pre><code>try {\n    // 例外が発生する可能性のある処理\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    // 例外をキャッチして対処\n    System.out.println(\"エラー: \" + e.getMessage());\n} finally {\n    // 例外の有無に関わらず必ず実行\n    System.out.println(\"処理終了\");\n}</code></pre>\n\n",
    "conceptZh": "<h3>try-catch-finally语句</h3>\n<p>用于捕获异常，防止程序崩溃：</p>\n<pre><code>try {\n    // 可能产生异常的代码\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    // 捕获并处理异常\n    System.out.println(\"错误: \" + e.getMessage());\n} finally {\n    // 无论是否发生异常，都会执行\n    System.out.println(\"处理结束\");\n}</code></pre>\n\n",
    "analogy": "🏥 异常处理就像是“赛车跑道上的撞击缓冲墙和全时救护车（try-catch）”：它能极大程度保证整场赛车（程序运行）在失控时不会车毁人亡，而是安全善后。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        try {\n            int result = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println(\"捕获到除以0的异常: \" + e.getMessage());\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "例外 (exception)",
        "zh": "异常",
        "desc": "プログラム実行中に発生するエラー。"
      },
      {
        "term": "throw",
        "zh": "抛出",
        "desc": "プログラマが意図的に例外を投げる（発生させる）こと。"
      },
      {
        "term": "finally",
        "zh": "最终",
        "desc": "例外の有無にかかわらず必ず実行されるブロック。"
      }
    ],
    "quizList": [
      {
        "question": "finallyブロックが実行されるのはいつですか？",
        "questionZh": "finally块在什么情况下执行？",
        "options": [
          "例外が発生したときだけ",
          "例外が発生しなかったときだけ",
          "例外の有無にかかわらず常に",
          "catchが成功したときだけ"
        ],
        "answerIdx": 2,
        "hint": "finallyは「最終的に」という意味で、必ず実行されます / finally意思是「最终」，总是会执行。"
      },
      {
        "question": "0での割り算が起きたときに発生する例外は？",
        "questionZh": "除以零时会发生什么异常？",
        "options": [
          "NullPointerException",
          "ArithmeticException",
          "NumberFormatException",
          "IOException"
        ],
        "answerIdx": 1,
        "hint": "算術（Arithmetic）に関する例外です / 与算术（Arithmetic）相关的异常。"
      },
      {
        "question": "throwsキーワードの目的は？",
        "questionZh": "throws关键字的目的是什么？",
        "options": [
          "例外をキャッチする",
          "例外を直接処理する",
          "メソッドが例外を発生させる可能性があることを宣言する",
          "finallyブロックを実行する"
        ],
        "answerIdx": 2,
        "hint": "呼び出し元に例外処理を任せる宣言です / 声明此方法可能抛出异常，让调用者处理。"
      }
    ],
    "pdfPage": 35,
    "pdfHighlightTerm": "try〜catch文",
    "originalChapterId": "jissen-2"
  },
  {
    "id": 57,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 2,
    "chapterName": "実践編 第2章 例外処理",
    "subSectionId": "2-3",
    "subSectionName": "2-3 主な例外クラス",
    "section": "実践編 実践編 第2章 例外処理",
    "titleJa": "主な例外クラス",
    "titleZh": "主要异常类",
    "conceptJa": "<h3>主な例外クラス</h3>\n<table border=\"1\" style=\"border-collapse:collapse;width:100%\">\n<tr><th>例外クラス</th><th>発生場面</th></tr>\n<tr><td>ArithmeticException</td><td>0での割り算など</td></tr>\n<tr><td>NullPointerException</td><td>nullのオブジェクト操作</td></tr>\n<tr><td>ArrayIndexOutOfBoundsException</td><td>配列の範囲外アクセス</td></tr>\n<tr><td>NumberFormatException</td><td>数値変換の失敗</td></tr>\n<tr><td>IOException</td><td>入出力エラー</td></tr>\n</table>\n\n",
    "conceptZh": "<h3>主要异常类</h3>\n<p>主要异常类是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.42）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🏥 异常处理就像是“赛车跑道上的撞击缓冲墙和全时救护车（try-catch）”：它能极大程度保证整场赛车（程序运行）在失控时不会车毁人亡，而是安全善后。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        try {\n            int[] arr = new int[2];\n            System.out.println(arr[5]);\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println(\"捕获到数组越界异常！\");\n        } finally {\n            System.out.println(\"不管出不出错，此处代码必执行！\");\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "例外 (exception)",
        "zh": "异常",
        "desc": "プログラム実行中に発生するエラー。"
      },
      {
        "term": "try-catch",
        "zh": "异常捕获",
        "desc": "例外が発生する可能性のある処理を囲んで、例外をキャッチする構文。"
      },
      {
        "term": "throw",
        "zh": "抛出",
        "desc": "プログラマが意図的に例外を投げる（発生させる）こと。"
      },
      {
        "term": "finally",
        "zh": "最终",
        "desc": "例外の有無にかかわらず必ず実行されるブロック。"
      }
    ],
    "quizList": [
      {
        "question": "finallyブロックが実行されるのはいつですか？",
        "questionZh": "finally块在什么情况下执行？",
        "options": [
          "例外が発生したときだけ",
          "例外が発生しなかったときだけ",
          "例外の有無にかかわらず常に",
          "catchが成功したときだけ"
        ],
        "answerIdx": 2,
        "hint": "finallyは「最終的に」という意味で、必ず実行されます / finally意思是「最终」，总是会执行。"
      },
      {
        "question": "0での割り算が起きたときに発生する例外は？",
        "questionZh": "除以零时会发生什么异常？",
        "options": [
          "NullPointerException",
          "ArithmeticException",
          "NumberFormatException",
          "IOException"
        ],
        "answerIdx": 1,
        "hint": "算術（Arithmetic）に関する例外です / 与算术（Arithmetic）相关的异常。"
      },
      {
        "question": "throwsキーワードの目的は？",
        "questionZh": "throws关键字的目的是什么？",
        "options": [
          "例外をキャッチする",
          "例外を直接処理する",
          "メソッドが例外を発生させる可能性があることを宣言する",
          "finallyブロックを実行する"
        ],
        "answerIdx": 2,
        "hint": "呼び出し元に例外処理を任せる宣言です / 声明此方法可能抛出异常，让调用者处理。"
      }
    ],
    "pdfPage": 42,
    "pdfHighlightTerm": "主な例外クラス",
    "originalChapterId": "jissen-2"
  },
  {
    "id": 58,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 2,
    "chapterName": "実践編 第2章 例外処理",
    "subSectionId": "2-4",
    "subSectionName": "2-4 例外を投げる（throw）",
    "section": "実践編 実践編 第2章 例外処理",
    "titleJa": "例外を投げる（throw）",
    "titleZh": "抛出异常（throw）",
    "conceptJa": "<h3>例外を投げる（throw）</h3>\n<pre><code>throw new IllegalArgumentException(\"負の値は不可: \" + value);</code></pre>\n\n",
    "conceptZh": "<h3>抛出异常（throw）</h3>\n<p>抛出异常（throw）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.43）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🏥 异常处理就像是“赛车跑道上的撞击缓冲墙和全时救护车（try-catch）”：它能极大程度保证整场赛车（程序运行）在失控时不会车毁人亡，而是安全善后。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        try {\n            checkAge(15);\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"自定义异常捕获: \" + e.getMessage());\n        }\n    }\n    public static void checkAge(int age) {\n        if (age < 18) {\n            throw new IllegalArgumentException(\"未满18岁不允许注册！\");\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "例外 (exception)",
        "zh": "异常",
        "desc": "プログラム実行中に発生するエラー。"
      },
      {
        "term": "throw",
        "zh": "抛出",
        "desc": "プログラマが意図的に例外を投げる（発生させる）こと。"
      },
      {
        "term": "finally",
        "zh": "最终",
        "desc": "例外の有無にかかわらず必ず実行されるブロック。"
      }
    ],
    "quizList": [
      {
        "question": "finallyブロックが実行されるのはいつですか？",
        "questionZh": "finally块在什么情况下执行？",
        "options": [
          "例外が発生したときだけ",
          "例外が発生しなかったときだけ",
          "例外の有無にかかわらず常に",
          "catchが成功したときだけ"
        ],
        "answerIdx": 2,
        "hint": "finallyは「最終的に」という意味で、必ず実行されます / finally意思是「最终」，总是会执行。"
      },
      {
        "question": "0での割り算が起きたときに発生する例外は？",
        "questionZh": "除以零时会发生什么异常？",
        "options": [
          "NullPointerException",
          "ArithmeticException",
          "NumberFormatException",
          "IOException"
        ],
        "answerIdx": 1,
        "hint": "算術（Arithmetic）に関する例外です / 与算术（Arithmetic）相关的异常。"
      },
      {
        "question": "throwsキーワードの目的は？",
        "questionZh": "throws关键字的目的是什么？",
        "options": [
          "例外をキャッチする",
          "例外を直接処理する",
          "メソッドが例外を発生させる可能性があることを宣言する",
          "finallyブロックを実行する"
        ],
        "answerIdx": 2,
        "hint": "呼び出し元に例外処理を任せる宣言です / 声明此方法可能抛出异常，让调用者处理。"
      }
    ],
    "pdfPage": 43,
    "pdfHighlightTerm": "例外を投げる（throw）",
    "originalChapterId": "jissen-2"
  },
  {
    "id": 59,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 2,
    "chapterName": "実践編 第2章 例外処理",
    "subSectionId": "2-5",
    "subSectionName": "2-5 メソッドの外への送出（throws）",
    "section": "実践編 実践編 第2章 例外処理",
    "titleJa": "メソッドの外への送出（throws）",
    "titleZh": "方法声明异常（throws）",
    "conceptJa": "<h3>メソッドの外への送出（throws）</h3>\n<p>メソッド内で例外をキャッチせず、呼び出し元に任せるときに使います。</p>\n<pre><code>void readFile(String path) throws IOException {\n    // IOExceptionが発生する可能性がある処理\n}</code></pre>",
    "conceptZh": "<h3>方法声明异常（throws）</h3>\n<p>方法声明异常（throws）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.44）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🏥 异常处理就像是“赛车跑道上的撞击缓冲墙和全时救护车（try-catch）”：它能极大程度保证整场赛车（程序运行）在失控时不会车毁人亡，而是安全善后。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        try {\n            checkAge(15);\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"自定义异常捕获: \" + e.getMessage());\n        }\n    }\n    public static void checkAge(int age) {\n        if (age < 18) {\n            throw new IllegalArgumentException(\"未满18岁不允许注册！\");\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "例外 (exception)",
        "zh": "异常",
        "desc": "プログラム実行中に発生するエラー。"
      },
      {
        "term": "throw",
        "zh": "抛出",
        "desc": "プログラマが意図的に例外を投げる（発生させる）こと。"
      },
      {
        "term": "finally",
        "zh": "最终",
        "desc": "例外の有無にかかわらず必ず実行されるブロック。"
      }
    ],
    "quizList": [
      {
        "question": "finallyブロックが実行されるのはいつですか？",
        "questionZh": "finally块在什么情况下执行？",
        "options": [
          "例外が発生したときだけ",
          "例外が発生しなかったときだけ",
          "例外の有無にかかわらず常に",
          "catchが成功したときだけ"
        ],
        "answerIdx": 2,
        "hint": "finallyは「最終的に」という意味で、必ず実行されます / finally意思是「最终」，总是会执行。"
      },
      {
        "question": "0での割り算が起きたときに発生する例外は？",
        "questionZh": "除以零时会发生什么异常？",
        "options": [
          "NullPointerException",
          "ArithmeticException",
          "NumberFormatException",
          "IOException"
        ],
        "answerIdx": 1,
        "hint": "算術（Arithmetic）に関する例外です / 与算术（Arithmetic）相关的异常。"
      },
      {
        "question": "throwsキーワードの目的は？",
        "questionZh": "throws关键字的目的是什么？",
        "options": [
          "例外をキャッチする",
          "例外を直接処理する",
          "メソッドが例外を発生させる可能性があることを宣言する",
          "finallyブロックを実行する"
        ],
        "answerIdx": 2,
        "hint": "呼び出し元に例外処理を任せる宣言です / 声明此方法可能抛出异常，让调用者处理。"
      }
    ],
    "pdfPage": 44,
    "pdfHighlightTerm": "メソッドの外への送出（throws）",
    "originalChapterId": "jissen-2"
  },
  {
    "id": 60,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 2,
    "chapterName": "実践編 第2章 例外処理",
    "subSectionId": "2-E",
    "subSectionName": "2-E 演習問題 (课后练习)",
    "section": "実践編 実践編 第2章 例外処理",
    "titleJa": "演習：第2章の課題",
    "titleZh": "练习：第2章的课后练习",
    "conceptJa": "<h3>第2章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>0による除算が発生した場合に ArithmeticException を安全にキャッチし、'【エラー】0で割ることはできません。'とコンソールに表示して正常終了するプログラムを作成してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第2章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>模拟并捕获 `ArithmeticException`（例如除以0），在 catch 块中打印友好报错：'【错误】不能除以0。'，并保证程序能正常执行完 finally 块的输出。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第2章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第2章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 45,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "jissen-2"
  },
  {
    "id": 61,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 3,
    "chapterName": "実践編 第3章 スレッド",
    "subSectionId": "3-1",
    "subSectionName": "3-1 スレッドとは",
    "section": "実践編 実践編 第3章 スレッド",
    "titleJa": "スレッドとは",
    "titleZh": "什么是线程（Thread）",
    "conceptJa": "<h3>スレッドとは</h3>\n<p>プログラムの実行の流れのことです。通常のプログラムは1つのスレッド（メインスレッド）で動きますが、<strong>マルチスレッド</strong>を使うと複数の処理を同時に進められます。</p>\n\n",
    "conceptZh": "<h3>什么是线程（Thread）</h3>\n<p>什么是线程（Thread）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.47）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🧵 多线程就像是“厨房里雇了 5 个厨师同时切菜、洗碗、下锅（并发）”：为了不发生打架抢占砧板的悲剧，需要用 synchronized 给砧板门上插销锁起来。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        Thread thread = new Thread(() -> {\n            System.out.println(\"新线程开始执行...\");\n        });\n        thread.start();\n    }\n}",
    "vocabList": [
      {
        "term": "スレッド (thread)",
        "zh": "线程",
        "desc": "プログラムの実行の流れの単位。"
      },
      {
        "term": "マルチスレッド",
        "zh": "多线程",
        "desc": "複数のスレッドを同時に実行すること。"
      },
      {
        "term": "synchronized",
        "zh": "同步/互斥",
        "desc": "複数スレッドが同時にメソッドやブロックを実行しないよう制御すること。"
      },
      {
        "term": "join()",
        "zh": "等待线程结束",
        "desc": "あるスレッドの終了を待つメソッド。"
      }
    ],
    "quizList": [
      {
        "question": "スレッドを開始するメソッドはどれですか？",
        "questionZh": "启动线程的方法是哪个？",
        "options": [
          "run()",
          "start()",
          "execute()",
          "begin()"
        ],
        "answerIdx": 1,
        "hint": "run()を直接呼ぶと同じスレッドで実行されます / 直接调run()会在同一线程执行，不会新建线程。"
      },
      {
        "question": "synchronizedの目的は何ですか？",
        "questionZh": "synchronized的目的是什么？",
        "options": [
          "スレッドを高速化する",
          "複数スレッドの同時アクセスを排他制御する",
          "スレッドを停止する",
          "スレッドを複製する"
        ],
        "answerIdx": 1,
        "hint": "複数スレッドが同時にデータを操作するときの整合性を保ちます / 保证多线程同时访问数据时的一致性。"
      }
    ],
    "pdfPage": 47,
    "pdfHighlightTerm": "スレッドとは",
    "originalChapterId": "jissen-3"
  },
  {
    "id": 62,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 3,
    "chapterName": "実践編 第3章 スレッド",
    "subSectionId": "3-2",
    "subSectionName": "3-2 スレッドの作成方法①：Threadクラスを継承",
    "section": "実践編 実践編 第3章 スレッド",
    "titleJa": "スレッドの作成方法①：Threadクラスを継承",
    "titleZh": "创建线程的方法①：继承Thread类",
    "conceptJa": "<h3>スレッドの作成方法①：Threadクラスを継承</h3>\n<pre><code>class MyThread extends Thread {\n    @Override\n    public void run() {\n        for (int i = 0; i < 5; i++) {\n            System.out.println(getName() + \": \" + i);\n        }\n    }\n}\nMyThread t = new MyThread();\nt.start();  // run()を別スレッドで実行</code></pre>\n\n",
    "conceptZh": "<h3>创建线程的方法①：继承Thread类</h3>\n<pre><code>class MyThread extends Thread {\n    @Override\n    public void run() {\n        // 在新线程中执行的代码\n    }\n}\nMyThread t = new MyThread();\nt.start();  // 启动新线程执行run()</code></pre>\n\n",
    "analogy": "🧵 多线程就像是“厨房里雇了 5 个厨师同时切菜、洗碗、下锅（并发）”：为了不发生打架抢占砧板的悲剧，需要用 synchronized 给砧板门上插销锁起来。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        Thread thread = new Thread(() -> {\n            System.out.println(\"新线程开始执行...\");\n        });\n        thread.start();\n    }\n}",
    "vocabList": [
      {
        "term": "スレッド (thread)",
        "zh": "线程",
        "desc": "プログラムの実行の流れの単位。"
      },
      {
        "term": "synchronized",
        "zh": "同步/互斥",
        "desc": "複数スレッドが同時にメソッドやブロックを実行しないよう制御すること。"
      },
      {
        "term": "join()",
        "zh": "等待线程结束",
        "desc": "あるスレッドの終了を待つメソッド。"
      }
    ],
    "quizList": [
      {
        "question": "スレッドを開始するメソッドはどれですか？",
        "questionZh": "启动线程的方法是哪个？",
        "options": [
          "run()",
          "start()",
          "execute()",
          "begin()"
        ],
        "answerIdx": 1,
        "hint": "run()を直接呼ぶと同じスレッドで実行されます / 直接调run()会在同一线程执行，不会新建线程。"
      },
      {
        "question": "synchronizedの目的は何ですか？",
        "questionZh": "synchronized的目的是什么？",
        "options": [
          "スレッドを高速化する",
          "複数スレッドの同時アクセスを排他制御する",
          "スレッドを停止する",
          "スレッドを複製する"
        ],
        "answerIdx": 1,
        "hint": "複数スレッドが同時にデータを操作するときの整合性を保ちます / 保证多线程同时访问数据时的一致性。"
      }
    ],
    "pdfPage": 48,
    "pdfHighlightTerm": "スレッドの作成方法①：Threadクラスを継承",
    "originalChapterId": "jissen-3"
  },
  {
    "id": 63,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 3,
    "chapterName": "実践編 第3章 スレッド",
    "subSectionId": "3-3",
    "subSectionName": "3-3 スレッドの作成方法②：Runnableインタフェースを実装",
    "section": "実践編 実践編 第3章 スレッド",
    "titleJa": "スレッドの作成方法②：Runnableインタフェースを実装",
    "titleZh": "创建线程的方法②：实现Runnable接口",
    "conceptJa": "<h3>スレッドの作成方法②：Runnableインタフェースを実装</h3>\n<pre><code>class MyTask implements Runnable {\n    @Override\n    public void run() { /* 処理 */ }\n}\nThread t = new Thread(new MyTask());\nt.start();</code></pre>\n\n",
    "conceptZh": "<h3>创建线程的方法②：实现Runnable接口</h3>\n<p>创建线程的方法②：实现Runnable接口是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.48）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🧵 多线程就像是“厨房里雇了 5 个厨师同时切菜、洗碗、下锅（并发）”：为了不发生打架抢占砧板的悲剧，需要用 synchronized 给砧板门上插销锁起来。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        Runnable r = new Runnable() {\n            @Override\n            public void run() {\n                System.out.println(\"Runnable 线程正在执行...\");\n            }\n        };\n        Thread t = new Thread(r);\n        t.start();\n    }\n}",
    "vocabList": [
      {
        "term": "スレッド (thread)",
        "zh": "线程",
        "desc": "プログラムの実行の流れの単位。"
      },
      {
        "term": "synchronized",
        "zh": "同步/互斥",
        "desc": "複数スレッドが同時にメソッドやブロックを実行しないよう制御すること。"
      },
      {
        "term": "join()",
        "zh": "等待线程结束",
        "desc": "あるスレッドの終了を待つメソッド。"
      }
    ],
    "quizList": [
      {
        "question": "スレッドを開始するメソッドはどれですか？",
        "questionZh": "启动线程的方法是哪个？",
        "options": [
          "run()",
          "start()",
          "execute()",
          "begin()"
        ],
        "answerIdx": 1,
        "hint": "run()を直接呼ぶと同じスレッドで実行されます / 直接调run()会在同一线程执行，不会新建线程。"
      },
      {
        "question": "synchronizedの目的は何ですか？",
        "questionZh": "synchronized的目的是什么？",
        "options": [
          "スレッドを高速化する",
          "複数スレッドの同時アクセスを排他制御する",
          "スレッドを停止する",
          "スレッドを複製する"
        ],
        "answerIdx": 1,
        "hint": "複数スレッドが同時にデータを操作するときの整合性を保ちます / 保证多线程同时访问数据时的一致性。"
      }
    ],
    "pdfPage": 48,
    "pdfHighlightTerm": "スレッドの作成方法②：Runnableインタフェースを実装",
    "originalChapterId": "jissen-3"
  },
  {
    "id": 64,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 3,
    "chapterName": "実践編 第3章 スレッド",
    "subSectionId": "3-4",
    "subSectionName": "3-4 よく使うThreadメソッド",
    "section": "実践編 実践編 第3章 スレッド",
    "titleJa": "よく使うThreadメソッド",
    "titleZh": "常用Thread方法",
    "conceptJa": "<h3>よく使うThreadメソッド</h3>\n<ul>\n  <li><code>Thread.sleep(ms)</code>：指定ミリ秒間スレッドを停止</li>\n  <li><code>join()</code>：スレッドの終了を待つ</li>\n  <li><code>getName()</code>：スレッド名を取得</li>\n</ul>\n\n",
    "conceptZh": "<h3>常用Thread方法</h3>\n<p>常用Thread方法是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.50）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🧵 多线程就像是“厨房里雇了 5 个厨师同时切菜、洗碗、下锅（并发）”：为了不发生打架抢占砧板的悲剧，需要用 synchronized 给砧板门上插销锁起来。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        Thread thread = new Thread(() -> {\n            System.out.println(\"新线程开始执行...\");\n        });\n        thread.start();\n    }\n}",
    "vocabList": [
      {
        "term": "スレッド (thread)",
        "zh": "线程",
        "desc": "プログラムの実行の流れの単位。"
      },
      {
        "term": "synchronized",
        "zh": "同步/互斥",
        "desc": "複数スレッドが同時にメソッドやブロックを実行しないよう制御すること。"
      },
      {
        "term": "join()",
        "zh": "等待线程结束",
        "desc": "あるスレッドの終了を待つメソッド。"
      }
    ],
    "quizList": [
      {
        "question": "スレッドを開始するメソッドはどれですか？",
        "questionZh": "启动线程的方法是哪个？",
        "options": [
          "run()",
          "start()",
          "execute()",
          "begin()"
        ],
        "answerIdx": 1,
        "hint": "run()を直接呼ぶと同じスレッドで実行されます / 直接调run()会在同一线程执行，不会新建线程。"
      },
      {
        "question": "synchronizedの目的は何ですか？",
        "questionZh": "synchronized的目的是什么？",
        "options": [
          "スレッドを高速化する",
          "複数スレッドの同時アクセスを排他制御する",
          "スレッドを停止する",
          "スレッドを複製する"
        ],
        "answerIdx": 1,
        "hint": "複数スレッドが同時にデータを操作するときの整合性を保ちます / 保证多线程同时访问数据时的一致性。"
      }
    ],
    "pdfPage": 50,
    "pdfHighlightTerm": "よく使うThreadメソッド",
    "originalChapterId": "jissen-3"
  },
  {
    "id": 65,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 3,
    "chapterName": "実践編 第3章 スレッド",
    "subSectionId": "3-5",
    "subSectionName": "3-5 同期（synchronized）",
    "section": "実践編 実践編 第3章 スレッド",
    "titleJa": "同期（synchronized）",
    "titleZh": "同步（synchronized）",
    "conceptJa": "<h3>同期（synchronized）</h3>\n<p>複数スレッドが同時に同じデータを操作すると不整合が起きます。<code>synchronized</code>キーワードで排他制御します。</p>\n<pre><code>synchronized void increment() {\n    count++;  // このメソッドは同時に1スレッドしか実行できない\n}</code></pre>",
    "conceptZh": "<h3>同步（synchronized）</h3>\n<p>同步（synchronized）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.51）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🧵 多线程就像是“厨房里雇了 5 个厨师同时切菜、洗碗、下锅（并发）”：为了不发生打架抢占砧板的悲剧，需要用 synchronized 给砧板门上插销锁起来。",
    "example": "public class Main {\n    private static int counter = 0;\n    public static synchronized void increment() {\n        counter++;\n    }\n    public static void main(String[] args) throws InterruptedException {\n        Thread t1 = new Thread(() -> { for(int i=0; i<100; i++) increment(); });\n        Thread t2 = new Thread(() -> { for(int i=0; i<100; i++) increment(); });\n        t1.start(); t2.start();\n        t1.join(); t2.join();\n        System.out.println(\"安全计数器值: \" + counter);\n    }\n}",
    "vocabList": [
      {
        "term": "スレッド (thread)",
        "zh": "线程",
        "desc": "プログラムの実行の流れの単位。"
      },
      {
        "term": "synchronized",
        "zh": "同步/互斥",
        "desc": "複数スレッドが同時にメソッドやブロックを実行しないよう制御すること。"
      },
      {
        "term": "join()",
        "zh": "等待线程结束",
        "desc": "あるスレッドの終了を待つメソッド。"
      }
    ],
    "quizList": [
      {
        "question": "スレッドを開始するメソッドはどれですか？",
        "questionZh": "启动线程的方法是哪个？",
        "options": [
          "run()",
          "start()",
          "execute()",
          "begin()"
        ],
        "answerIdx": 1,
        "hint": "run()を直接呼ぶと同じスレッドで実行されます / 直接调run()会在同一线程执行，不会新建线程。"
      },
      {
        "question": "synchronizedの目的は何ですか？",
        "questionZh": "synchronized的目的是什么？",
        "options": [
          "スレッドを高速化する",
          "複数スレッドの同時アクセスを排他制御する",
          "スレッドを停止する",
          "スレッドを複製する"
        ],
        "answerIdx": 1,
        "hint": "複数スレッドが同時にデータを操作するときの整合性を保ちます / 保证多线程同时访问数据时的一致性。"
      }
    ],
    "pdfPage": 51,
    "pdfHighlightTerm": "同期（synchronized）",
    "originalChapterId": "jissen-3"
  },
  {
    "id": 66,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 3,
    "chapterName": "実践編 第3章 スレッド",
    "subSectionId": "3-E",
    "subSectionName": "3-E 演習問題 (课后练习)",
    "section": "実践編 実践編 第3章 スレッド",
    "titleJa": "演習：第3章の課題",
    "titleZh": "练习：第3章的课后练习",
    "conceptJa": "<h3>第3章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>Runnableインタフェースを実装した別スレッドを作成し、メインスレッドと並行して「スレッドが動き始めました！」と1秒おきに3回出力する並行処理を実装してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第3章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>使用多线程（Runnable 接口或 Thread 类），让一个新线程与 main 主线程并行运作，子线程每隔 1 秒在控制台输出一次“子线程工作完成！”共输出三次。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第3章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第3章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 52,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "jissen-3"
  },
  {
    "id": 67,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 4,
    "chapterName": "実践編 第4章 GCとメモリ管理",
    "subSectionId": "4-1",
    "subSectionName": "4-1 メモリの種類",
    "section": "実践編 実践編 第4章 GCとメモリ管理",
    "titleJa": "メモリの種類",
    "titleZh": "内存的种类",
    "conceptJa": "<h3>メモリの種類</h3>\n<ul>\n  <li><strong>スタック（Stack）</strong>：ローカル変数やメソッドの呼び出し情報が保存される。高速だが容量が小さい。LIFO（後入れ先出し）方式。</li>\n  <li><strong>ヒープ（Heap）</strong>：<code>new</code>で生成したオブジェクトが保存される。容量が大きいが速度はスタックより遅い。</li>\n</ul>\n\n",
    "conceptZh": "<h3>内存的种类</h3>\n<p>内存的种类是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.52）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🧹 垃圾回收（GC）与内存就像是“贴心的扫街机器人”：它总是能趁你不注意把地上无用的断线风筝（失去引用的垃圾对象）全部收走，保证道路开阔。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 演示垃圾回收与堆内存机制\n        Runtime runtime = Runtime.getRuntime();\n        System.out.println(\"总内存: \" + runtime.totalMemory() + \" 字节\");\n        System.out.println(\"空闲内存: \" + runtime.freeMemory() + \" 字节\");\n        System.gc(); // 建议 JVM 垃圾回收\n    }\n}",
    "vocabList": [
      {
        "term": "スタック (stack)",
        "zh": "栈",
        "desc": "ローカル変数やメソッド呼び出し情報を保存するメモリ領域。LIFO構造。"
      },
      {
        "term": "ヒープ (heap)",
        "zh": "堆",
        "desc": "newで生成したオブジェクトが保存されるメモリ領域。GCが管理する。"
      },
      {
        "term": "GC (Garbage Collection)",
        "zh": "垃圾回收",
        "desc": "不要になったオブジェクトのメモリを自動回収する仕組み。"
      }
    ],
    "quizList": [
      {
        "question": "ガーベッジコレクションの目的は何ですか？",
        "questionZh": "垃圾回收的目的是什么？",
        "options": [
          "プログラムの速度を上げる",
          "不要になったオブジェクトのメモリを自動解放する",
          "エラーを修正する",
          "プログラムを再起動する"
        ],
        "answerIdx": 1,
        "hint": "プログラマが手動でメモリを解放する必要がなくなります / 程序员不需要手动释放内存。"
      }
    ],
    "pdfPage": 52,
    "pdfHighlightTerm": "メモリの種類",
    "originalChapterId": "jissen-4"
  },
  {
    "id": 68,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 4,
    "chapterName": "実践編 第4章 GCとメモリ管理",
    "subSectionId": "4-2",
    "subSectionName": "4-2 ガーベッジコレクション（GC）",
    "section": "実践編 実践編 第4章 GCとメモリ管理",
    "titleJa": "ガーベッジコレクション（GC）",
    "titleZh": "垃圾回收（GC）",
    "conceptJa": "<h3>ガーベッジコレクション（GC）</h3>\n<p>使わなくなったオブジェクト（どこからも参照されていないオブジェクト）のメモリを自動的に解放する仕組みです。Javaではプログラマが手動でメモリ解放をする必要がありません（CやC++とは異なる）。</p>\n\n",
    "conceptZh": "<h3>垃圾回收（GC）</h3>\n<p>垃圾回收（GC）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.67）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🧹 垃圾回收（GC）与内存就像是“贴心的扫街机器人”：它总是能趁你不注意把地上无用的断线风筝（失去引用的垃圾对象）全部收走，保证道路开阔。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 演示垃圾回收与堆内存机制\n        Runtime runtime = Runtime.getRuntime();\n        System.out.println(\"总内存: \" + runtime.totalMemory() + \" 字节\");\n        System.out.println(\"空闲内存: \" + runtime.freeMemory() + \" 字节\");\n        System.gc(); // 建议 JVM 垃圾回收\n    }\n}",
    "vocabList": [
      {
        "term": "GC (Garbage Collection)",
        "zh": "垃圾回收",
        "desc": "不要になったオブジェクトのメモリを自動回収する仕組み。"
      }
    ],
    "quizList": [
      {
        "question": "ガーベッジコレクションの目的は何ですか？",
        "questionZh": "垃圾回收的目的是什么？",
        "options": [
          "プログラムの速度を上げる",
          "不要になったオブジェクトのメモリを自動解放する",
          "エラーを修正する",
          "プログラムを再起動する"
        ],
        "answerIdx": 1,
        "hint": "プログラマが手動でメモリを解放する必要がなくなります / 程序员不需要手动释放内存。"
      }
    ],
    "pdfPage": 67,
    "pdfHighlightTerm": "ガーベッジコレクション（GC）",
    "originalChapterId": "jissen-4"
  },
  {
    "id": 69,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 4,
    "chapterName": "実践編 第4章 GCとメモリ管理",
    "subSectionId": "4-3",
    "subSectionName": "4-3 GCが実行されるタイミング",
    "section": "実践編 実践編 第4章 GCとメモリ管理",
    "titleJa": "GCが実行されるタイミング",
    "titleZh": "GC触发时机",
    "conceptJa": "<h3>GCが実行されるタイミング</h3>\n<ul>\n  <li>ヒープのメモリが不足したとき</li>\n  <li>JVMが適切と判断したとき（プログラマは制御できない）</li>\n</ul>\n\n",
    "conceptZh": "<h3>GC触发时机</h3>\n<p>GC触发时机是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.70）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🧹 垃圾回收（GC）与内存就像是“贴心的扫街机器人”：它总是能趁你不注意把地上无用的断线风筝（失去引用的垃圾对象）全部收走，保证道路开阔。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 演示垃圾回收与堆内存机制\n        Runtime runtime = Runtime.getRuntime();\n        System.out.println(\"总内存: \" + runtime.totalMemory() + \" 字节\");\n        System.out.println(\"空闲内存: \" + runtime.freeMemory() + \" 字节\");\n        System.gc(); // 建议 JVM 垃圾回收\n    }\n}",
    "vocabList": [
      {
        "term": "ヒープ (heap)",
        "zh": "堆",
        "desc": "newで生成したオブジェクトが保存されるメモリ領域。GCが管理する。"
      },
      {
        "term": "GC (Garbage Collection)",
        "zh": "垃圾回收",
        "desc": "不要になったオブジェクトのメモリを自動回収する仕組み。"
      }
    ],
    "quizList": [
      {
        "question": "ガーベッジコレクションの目的は何ですか？",
        "questionZh": "垃圾回收的目的是什么？",
        "options": [
          "プログラムの速度を上げる",
          "不要になったオブジェクトのメモリを自動解放する",
          "エラーを修正する",
          "プログラムを再起動する"
        ],
        "answerIdx": 1,
        "hint": "プログラマが手動でメモリを解放する必要がなくなります / 程序员不需要手动释放内存。"
      }
    ],
    "pdfPage": 70,
    "pdfHighlightTerm": "GCが実行されるタイミング",
    "originalChapterId": "jissen-4"
  },
  {
    "id": 70,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 4,
    "chapterName": "実践編 第4章 GCとメモリ管理",
    "subSectionId": "4-4",
    "subSectionName": "4-4 GCの対象になるケース",
    "section": "実践編 実践編 第4章 GCとメモリ管理",
    "titleJa": "GCの対象になるケース",
    "titleZh": "什么对象会被GC回收",
    "conceptJa": "<h3>GCの対象になるケース</h3>\n<pre><code>Point p = new Point(1, 2);\np = new Point(3, 4);  // 最初のPoint(1,2)はGCの対象に\n// または\np = null;  // 参照を切ることでGCの対象に</code></pre>\n\n",
    "conceptZh": "<h3>什么对象会被GC回收</h3>\n<p>没有任何引用指向的对象会被标记为「垃圾」等待回收。</p>\n<pre><code>Point p = new Point(1, 2);\np = new Point(3, 4);  // 原来的Point(1,2)变成垃圾\np = null;             // p引用的对象也变成垃圾</code></pre>\n\n",
    "analogy": "🧹 垃圾回收（GC）与内存就像是“贴心的扫街机器人”：它总是能趁你不注意把地上无用的断线风筝（失去引用的垃圾对象）全部收走，保证道路开阔。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 演示垃圾回收与堆内存机制\n        Runtime runtime = Runtime.getRuntime();\n        System.out.println(\"总内存: \" + runtime.totalMemory() + \" 字节\");\n        System.out.println(\"空闲内存: \" + runtime.freeMemory() + \" 字节\");\n        System.gc(); // 建议 JVM 垃圾回收\n    }\n}",
    "vocabList": [
      {
        "term": "GC (Garbage Collection)",
        "zh": "垃圾回收",
        "desc": "不要になったオブジェクトのメモリを自動回収する仕組み。"
      }
    ],
    "quizList": [
      {
        "question": "ガーベッジコレクションの目的は何ですか？",
        "questionZh": "垃圾回收的目的是什么？",
        "options": [
          "プログラムの速度を上げる",
          "不要になったオブジェクトのメモリを自動解放する",
          "エラーを修正する",
          "プログラムを再起動する"
        ],
        "answerIdx": 1,
        "hint": "プログラマが手動でメモリを解放する必要がなくなります / 程序员不需要手动释放内存。"
      }
    ],
    "pdfPage": 71,
    "pdfHighlightTerm": "GCの対象になるケース",
    "originalChapterId": "jissen-4"
  },
  {
    "id": 71,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 4,
    "chapterName": "実践編 第4章 GCとメモリ管理",
    "subSectionId": "4-5",
    "subSectionName": "4-5 メモリの注意点",
    "section": "実践編 実践編 第4章 GCとメモリ管理",
    "titleJa": "メモリの注意点",
    "titleZh": "内存注意事项",
    "conceptJa": "<h3>メモリの注意点</h3>\n<ul>\n  <li><strong>OutOfMemoryError</strong>：ヒープが不足すると発生</li>\n  <li><strong>StackOverflowError</strong>：再帰呼び出しが深すぎると発生</li>\n</ul>",
    "conceptZh": "<h3>内存注意事项</h3>\n<p>内存注意事项是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.72）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🧹 垃圾回收（GC）与内存就像是“贴心的扫街机器人”：它总是能趁你不注意把地上无用的断线风筝（失去引用的垃圾对象）全部收走，保证道路开阔。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 演示垃圾回收与堆内存机制\n        Runtime runtime = Runtime.getRuntime();\n        System.out.println(\"总内存: \" + runtime.totalMemory() + \" 字节\");\n        System.out.println(\"空闲内存: \" + runtime.freeMemory() + \" 字节\");\n        System.gc(); // 建议 JVM 垃圾回收\n    }\n}",
    "vocabList": [
      {
        "term": "ヒープ (heap)",
        "zh": "堆",
        "desc": "newで生成したオブジェクトが保存されるメモリ領域。GCが管理する。"
      },
      {
        "term": "GC (Garbage Collection)",
        "zh": "垃圾回收",
        "desc": "不要になったオブジェクトのメモリを自動回収する仕組み。"
      }
    ],
    "quizList": [
      {
        "question": "ガーベッジコレクションの目的は何ですか？",
        "questionZh": "垃圾回收的目的是什么？",
        "options": [
          "プログラムの速度を上げる",
          "不要になったオブジェクトのメモリを自動解放する",
          "エラーを修正する",
          "プログラムを再起動する"
        ],
        "answerIdx": 1,
        "hint": "プログラマが手動でメモリを解放する必要がなくなります / 程序员不需要手动释放内存。"
      }
    ],
    "pdfPage": 72,
    "pdfHighlightTerm": "メモリの注意点",
    "originalChapterId": "jissen-4"
  },
  {
    "id": 72,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 4,
    "chapterName": "実践編 第4章 GCとメモリ管理",
    "subSectionId": "4-E",
    "subSectionName": "4-E 演習問題 (课后练习)",
    "section": "実践編 実践編 第4章 GCとメモリ管理",
    "titleJa": "演習：第4章の課題",
    "titleZh": "练习：第4章的课后练习",
    "conceptJa": "<h3>第4章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>使用されなくなった多数のインスタンスを生成後、Runtime.getRuntime().gc()を実行して、メモリ回収前後での空きメモリの変動を監視して表示するテストコードを作成してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第4章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>在循环中创建大量的临时无引用对象，通过 System.gc() 建议 JVM 垃圾回收，并使用 Runtime 类的 freeMemory() 打印回收前后的内存空闲对比。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第4章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第4章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 73,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "jissen-4"
  },
  {
    "id": 73,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 5,
    "chapterName": "実践編 第5章 コレクション",
    "subSectionId": "5-1",
    "subSectionName": "5-1 コレクションとは",
    "section": "実践編 実践編 第5章 コレクション",
    "titleJa": "コレクションとは",
    "titleZh": "什么是集合框架（Collections Framework）",
    "conceptJa": "<h3>コレクションとは</h3>\n<p>複数のオブジェクトをまとめて管理するクラス群です。配列と異なり、サイズが動的に変わります。</p>\n<p>主なコレクションインタフェース：<strong>List</strong>（順序あり・重複あり）、<strong>Set</strong>（重複なし）、<strong>Map</strong>（キーと値のペア）</p>\n\n",
    "conceptZh": "<h3>什么是集合框架（Collections Framework）</h3>\n<p>用于管理多个对象的类库。与数组不同，集合的大小可以动态变化。</p>\n<ul>\n  <li><strong>List</strong>：有序、可重复（如ArrayList）</li>\n  <li><strong>Set</strong>：无序、不重复（如HashSet）</li>\n  <li><strong>Map</strong>：键值对（如HashMap）</li>\n</ul>\n\n",
    "analogy": "🗃️ 集合框架就像是“分类极其严谨的高级仓储系统”：它包含有序的 ArrayList、无重复的 HashSet 和依靠唯一编号提取物品的 HashMap 柜子，容量无限伸缩。",
    "example": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> list = new ArrayList<>();\n        list.add(10);\n        list.add(20);\n        for(int x : list) {\n            System.out.println(\"值: \" + x);\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "コレクション (collection)",
        "zh": "集合/容器",
        "desc": "複数のオブジェクトをまとめて管理するクラス。List, Set, Mapがある。"
      },
      {
        "term": "ArrayList",
        "zh": "动态数组列表",
        "desc": "サイズが動的に変わるリスト。インデックスでアクセス。重複あり。"
      },
      {
        "term": "HashMap",
        "zh": "哈希映射",
        "desc": "キーと値のペアでデータを管理。キーで高速検索。"
      },
      {
        "term": "HashSet",
        "zh": "哈希集合",
        "desc": "重複要素を持たないコレクション。"
      }
    ],
    "quizList": [
      {
        "question": "ArrayListとHashSetの最大の違いは何ですか？",
        "questionZh": "ArrayList和HashSet最大的区别是什么？",
        "options": [
          "ArrayListは数値のみ、HashSetは文字列のみ",
          "ArrayListは重複を許可、HashSetは重複を許可しない",
          "ArrayListは順序なし、HashSetは順序あり",
          "ArrayListはキーと値のペアを持つ"
        ],
        "answerIdx": 1,
        "hint": "Set（集合）は数学の集合と同じで、同じ要素は1つしか持てません / Set与数学的集合一样，不允许重复元素。"
      },
      {
        "question": "HashMapのデータアクセス方法は？",
        "questionZh": "HashMap访问数据的方法是什么？",
        "options": [
          "インデックス（数値）でアクセス",
          "キー（任意のオブジェクト）でアクセス",
          "ランダムにアクセス",
          "先頭から順番にアクセスのみ"
        ],
        "answerIdx": 1,
        "hint": "MapはKey-Valueペアです。get(key)でvalueを取得します / Map是键值对，用get(key)获取value。"
      },
      {
        "question": "ArrayList<String> のジェネリクス<String>の目的は？",
        "questionZh": "ArrayList<String> 中 <String> 泛型的目的是什么？",
        "options": [
          "ArrayListのサイズを制限する",
          "String以外の型を追加しようとするとコンパイルエラーにする",
          "ArrayListを高速化する",
          "文字列を自動でソートする"
        ],
        "answerIdx": 1,
        "hint": "型安全（type-safe）を保証するためです / 用于保证类型安全。"
      }
    ],
    "pdfPage": 71,
    "pdfHighlightTerm": "コレクションとは",
    "originalChapterId": "jissen-5"
  },
  {
    "id": 74,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 5,
    "chapterName": "実践編 第5章 コレクション",
    "subSectionId": "5-2",
    "subSectionName": "5-2 ArrayList（リスト）",
    "section": "実践編 実践編 第5章 コレクション",
    "titleJa": "ArrayList（リスト）",
    "titleZh": "ArrayList（列表）",
    "conceptJa": "<h3>ArrayList（リスト）</h3>\n<pre><code>import java.util.ArrayList;\nArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();\nlist.add(\"りんご\");       // 追加\nlist.add(\"バナナ\");\nlist.get(0);             // \"りんご\"（インデックスでアクセス）\nlist.size();             // 2\nlist.remove(0);          // インデックス0を削除\nlist.contains(\"バナナ\"); // true</code></pre>\n\n",
    "conceptZh": "<h3>ArrayList（列表）</h3>\n<p>ArrayList（列表）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.78）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🗃️ 集合框架就像是“分类极其严谨的高级仓储系统”：它包含有序的 ArrayList、无重复的 HashSet 和依靠唯一编号提取物品的 HashMap 柜子，容量无限伸缩。",
    "example": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> list = new ArrayList<>();\n        list.add(\"Apple\");\n        list.add(\"Banana\");\n        System.out.println(\"列表大小: \" + list.size());\n        System.out.println(\"元素: \" + list.get(1));\n    }\n}",
    "vocabList": [
      {
        "term": "ArrayList",
        "zh": "动态数组列表",
        "desc": "サイズが動的に変わるリスト。インデックスでアクセス。重複あり。"
      },
      {
        "term": "HashMap",
        "zh": "哈希映射",
        "desc": "キーと値のペアでデータを管理。キーで高速検索。"
      },
      {
        "term": "HashSet",
        "zh": "哈希集合",
        "desc": "重複要素を持たないコレクション。"
      }
    ],
    "quizList": [
      {
        "question": "ArrayListとHashSetの最大の違いは何ですか？",
        "questionZh": "ArrayList和HashSet最大的区别是什么？",
        "options": [
          "ArrayListは数値のみ、HashSetは文字列のみ",
          "ArrayListは重複を許可、HashSetは重複を許可しない",
          "ArrayListは順序なし、HashSetは順序あり",
          "ArrayListはキーと値のペアを持つ"
        ],
        "answerIdx": 1,
        "hint": "Set（集合）は数学の集合と同じで、同じ要素は1つしか持てません / Set与数学的集合一样，不允许重复元素。"
      },
      {
        "question": "HashMapのデータアクセス方法は？",
        "questionZh": "HashMap访问数据的方法是什么？",
        "options": [
          "インデックス（数値）でアクセス",
          "キー（任意のオブジェクト）でアクセス",
          "ランダムにアクセス",
          "先頭から順番にアクセスのみ"
        ],
        "answerIdx": 1,
        "hint": "MapはKey-Valueペアです。get(key)でvalueを取得します / Map是键值对，用get(key)获取value。"
      },
      {
        "question": "ArrayList<String> のジェネリクス<String>の目的は？",
        "questionZh": "ArrayList<String> 中 <String> 泛型的目的是什么？",
        "options": [
          "ArrayListのサイズを制限する",
          "String以外の型を追加しようとするとコンパイルエラーにする",
          "ArrayListを高速化する",
          "文字列を自動でソートする"
        ],
        "answerIdx": 1,
        "hint": "型安全（type-safe）を保証するためです / 用于保证类型安全。"
      }
    ],
    "pdfPage": 78,
    "pdfHighlightTerm": "ArrayList（リスト）",
    "originalChapterId": "jissen-5"
  },
  {
    "id": 75,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 5,
    "chapterName": "実践編 第5章 コレクション",
    "subSectionId": "5-3",
    "subSectionName": "5-3 HashMap（マップ）",
    "section": "実践編 実践編 第5章 コレクション",
    "titleJa": "HashMap（マップ）",
    "titleZh": "HashMap（映射/字典）",
    "conceptJa": "<h3>HashMap（マップ）</h3>\n<pre><code>import java.util.HashMap;\nHashMap&lt;String, Integer&gt; map = new HashMap&lt;&gt;();\nmap.put(\"田中\", 90);\nmap.put(\"佐藤\", 85);\nmap.get(\"田中\");        // 90\nmap.containsKey(\"佐藤\"); // true\nmap.keySet();           // キーの集合</code></pre>\n\n",
    "conceptZh": "<h3>HashMap（映射/字典）</h3>\n<p>HashMap（映射/字典）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.79）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🗃️ 集合框架就像是“分类极其严谨的高级仓储系统”：它包含有序的 ArrayList、无重复的 HashSet 和依靠唯一编号提取物品的 HashMap 柜子，容量无限伸缩。",
    "example": "import java.util.HashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        HashMap<String, Integer> map = new HashMap<>();\n        map.put(\"Java\", 100);\n        map.put(\"Python\", 90);\n        System.out.println(\"Java 分数: \" + map.get(\"Java\"));\n    }\n}",
    "vocabList": [
      {
        "term": "ArrayList",
        "zh": "动态数组列表",
        "desc": "サイズが動的に変わるリスト。インデックスでアクセス。重複あり。"
      },
      {
        "term": "HashMap",
        "zh": "哈希映射",
        "desc": "キーと値のペアでデータを管理。キーで高速検索。"
      },
      {
        "term": "HashSet",
        "zh": "哈希集合",
        "desc": "重複要素を持たないコレクション。"
      }
    ],
    "quizList": [
      {
        "question": "ArrayListとHashSetの最大の違いは何ですか？",
        "questionZh": "ArrayList和HashSet最大的区别是什么？",
        "options": [
          "ArrayListは数値のみ、HashSetは文字列のみ",
          "ArrayListは重複を許可、HashSetは重複を許可しない",
          "ArrayListは順序なし、HashSetは順序あり",
          "ArrayListはキーと値のペアを持つ"
        ],
        "answerIdx": 1,
        "hint": "Set（集合）は数学の集合と同じで、同じ要素は1つしか持てません / Set与数学的集合一样，不允许重复元素。"
      },
      {
        "question": "HashMapのデータアクセス方法は？",
        "questionZh": "HashMap访问数据的方法是什么？",
        "options": [
          "インデックス（数値）でアクセス",
          "キー（任意のオブジェクト）でアクセス",
          "ランダムにアクセス",
          "先頭から順番にアクセスのみ"
        ],
        "answerIdx": 1,
        "hint": "MapはKey-Valueペアです。get(key)でvalueを取得します / Map是键值对，用get(key)获取value。"
      },
      {
        "question": "ArrayList<String> のジェネリクス<String>の目的は？",
        "questionZh": "ArrayList<String> 中 <String> 泛型的目的是什么？",
        "options": [
          "ArrayListのサイズを制限する",
          "String以外の型を追加しようとするとコンパイルエラーにする",
          "ArrayListを高速化する",
          "文字列を自動でソートする"
        ],
        "answerIdx": 1,
        "hint": "型安全（type-safe）を保証するためです / 用于保证类型安全。"
      }
    ],
    "pdfPage": 79,
    "pdfHighlightTerm": "HashMap（マップ）",
    "originalChapterId": "jissen-5"
  },
  {
    "id": 76,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 5,
    "chapterName": "実践編 第5章 コレクション",
    "subSectionId": "5-4",
    "subSectionName": "5-4 HashSet（セット）",
    "section": "実践編 実践編 第5章 コレクション",
    "titleJa": "HashSet（セット）",
    "titleZh": "HashSet（集合）",
    "conceptJa": "<h3>HashSet（セット）</h3>\n<pre><code>import java.util.HashSet;\nHashSet&lt;String&gt; set = new HashSet&lt;&gt;();\nset.add(\"apple\");\nset.add(\"apple\");  // 重複は無視される\nset.size();        // 1</code></pre>\n\n",
    "conceptZh": "<h3>HashSet（集合）</h3>\n<p>HashSet（集合）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.80）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🗃️ 集合框架就像是“分类极其严谨的高级仓储系统”：它包含有序的 ArrayList、无重复的 HashSet 和依靠唯一编号提取物品的 HashMap 柜子，容量无限伸缩。",
    "example": "import java.util.HashSet;\n\npublic class Main {\n    public static void main(String[] args) {\n        HashSet<String> set = new HashSet<>();\n        set.add(\"A\");\n        set.add(\"B\");\n        set.add(\"A\"); // 重复项被自动去重\n        System.out.println(\"去重集合大小: \" + set.size());\n    }\n}",
    "vocabList": [
      {
        "term": "ArrayList",
        "zh": "动态数组列表",
        "desc": "サイズが動的に変わるリスト。インデックスでアクセス。重複あり。"
      },
      {
        "term": "HashMap",
        "zh": "哈希映射",
        "desc": "キーと値のペアでデータを管理。キーで高速検索。"
      },
      {
        "term": "HashSet",
        "zh": "哈希集合",
        "desc": "重複要素を持たないコレクション。"
      }
    ],
    "quizList": [
      {
        "question": "ArrayListとHashSetの最大の違いは何ですか？",
        "questionZh": "ArrayList和HashSet最大的区别是什么？",
        "options": [
          "ArrayListは数値のみ、HashSetは文字列のみ",
          "ArrayListは重複を許可、HashSetは重複を許可しない",
          "ArrayListは順序なし、HashSetは順序あり",
          "ArrayListはキーと値のペアを持つ"
        ],
        "answerIdx": 1,
        "hint": "Set（集合）は数学の集合と同じで、同じ要素は1つしか持てません / Set与数学的集合一样，不允许重复元素。"
      },
      {
        "question": "HashMapのデータアクセス方法は？",
        "questionZh": "HashMap访问数据的方法是什么？",
        "options": [
          "インデックス（数値）でアクセス",
          "キー（任意のオブジェクト）でアクセス",
          "ランダムにアクセス",
          "先頭から順番にアクセスのみ"
        ],
        "answerIdx": 1,
        "hint": "MapはKey-Valueペアです。get(key)でvalueを取得します / Map是键值对，用get(key)获取value。"
      },
      {
        "question": "ArrayList<String> のジェネリクス<String>の目的は？",
        "questionZh": "ArrayList<String> 中 <String> 泛型的目的是什么？",
        "options": [
          "ArrayListのサイズを制限する",
          "String以外の型を追加しようとするとコンパイルエラーにする",
          "ArrayListを高速化する",
          "文字列を自動でソートする"
        ],
        "answerIdx": 1,
        "hint": "型安全（type-safe）を保証するためです / 用于保证类型安全。"
      }
    ],
    "pdfPage": 80,
    "pdfHighlightTerm": "HashSet（セット）",
    "originalChapterId": "jissen-5"
  },
  {
    "id": 77,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 5,
    "chapterName": "実践編 第5章 コレクション",
    "subSectionId": "5-5",
    "subSectionName": "5-5 拡張for文（for-each）",
    "section": "実践編 実践編 第5章 コレクション",
    "titleJa": "拡張for文（for-each）",
    "titleZh": "增强for循环（for-each）",
    "conceptJa": "<h3>拡張for文（for-each）</h3>\n<pre><code>for (String item : list) {\n    System.out.println(item);\n}</code></pre>\n\n",
    "conceptZh": "<h3>增强for循环（for-each）</h3>\n<p>增强for循环（for-each）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.88）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🗃️ 集合框架就像是“分类极其严谨的高级仓储系统”：它包含有序的 ArrayList、无重复的 HashSet 和依靠唯一编号提取物品的 HashMap 柜子，容量无限伸缩。",
    "example": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> list = new ArrayList<>();\n        list.add(10);\n        list.add(20);\n        for(int x : list) {\n            System.out.println(\"值: \" + x);\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "ArrayList",
        "zh": "动态数组列表",
        "desc": "サイズが動的に変わるリスト。インデックスでアクセス。重複あり。"
      },
      {
        "term": "HashMap",
        "zh": "哈希映射",
        "desc": "キーと値のペアでデータを管理。キーで高速検索。"
      },
      {
        "term": "HashSet",
        "zh": "哈希集合",
        "desc": "重複要素を持たないコレクション。"
      }
    ],
    "quizList": [
      {
        "question": "ArrayListとHashSetの最大の違いは何ですか？",
        "questionZh": "ArrayList和HashSet最大的区别是什么？",
        "options": [
          "ArrayListは数値のみ、HashSetは文字列のみ",
          "ArrayListは重複を許可、HashSetは重複を許可しない",
          "ArrayListは順序なし、HashSetは順序あり",
          "ArrayListはキーと値のペアを持つ"
        ],
        "answerIdx": 1,
        "hint": "Set（集合）は数学の集合と同じで、同じ要素は1つしか持てません / Set与数学的集合一样，不允许重复元素。"
      },
      {
        "question": "HashMapのデータアクセス方法は？",
        "questionZh": "HashMap访问数据的方法是什么？",
        "options": [
          "インデックス（数値）でアクセス",
          "キー（任意のオブジェクト）でアクセス",
          "ランダムにアクセス",
          "先頭から順番にアクセスのみ"
        ],
        "answerIdx": 1,
        "hint": "MapはKey-Valueペアです。get(key)でvalueを取得します / Map是键值对，用get(key)获取value。"
      },
      {
        "question": "ArrayList<String> のジェネリクス<String>の目的は？",
        "questionZh": "ArrayList<String> 中 <String> 泛型的目的是什么？",
        "options": [
          "ArrayListのサイズを制限する",
          "String以外の型を追加しようとするとコンパイルエラーにする",
          "ArrayListを高速化する",
          "文字列を自動でソートする"
        ],
        "answerIdx": 1,
        "hint": "型安全（type-safe）を保証するためです / 用于保证类型安全。"
      }
    ],
    "pdfPage": 88,
    "pdfHighlightTerm": "拡張for文（for-each）",
    "originalChapterId": "jissen-5"
  },
  {
    "id": 78,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 5,
    "chapterName": "実践編 第5章 コレクション",
    "subSectionId": "5-6",
    "subSectionName": "5-6 ジェネリクス（Generics）",
    "section": "実践編 実践編 第5章 コレクション",
    "titleJa": "ジェネリクス（Generics）",
    "titleZh": "泛型（Generics）",
    "conceptJa": "<h3>ジェネリクス（Generics）</h3>\n<p><code>&lt;String&gt;</code>のように型パラメータを指定することで、コレクションに入れられる型を制限します。型安全になり、キャスト不要。</p>",
    "conceptZh": "<h3>泛型（Generics）</h3>\n<p>泛型（Generics）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.74）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🗃️ 集合框架就像是“分类极其严谨的高级仓储系统”：它包含有序的 ArrayList、无重复的 HashSet 和依靠唯一编号提取物品的 HashMap 柜子，容量无限伸缩。",
    "example": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> list = new ArrayList<>();\n        list.add(10);\n        list.add(20);\n        for(int x : list) {\n            System.out.println(\"值: \" + x);\n        }\n    }\n}",
    "vocabList": [
      {
        "term": "コレクション (collection)",
        "zh": "集合/容器",
        "desc": "複数のオブジェクトをまとめて管理するクラス。List, Set, Mapがある。"
      },
      {
        "term": "ArrayList",
        "zh": "动态数组列表",
        "desc": "サイズが動的に変わるリスト。インデックスでアクセス。重複あり。"
      },
      {
        "term": "HashMap",
        "zh": "哈希映射",
        "desc": "キーと値のペアでデータを管理。キーで高速検索。"
      },
      {
        "term": "HashSet",
        "zh": "哈希集合",
        "desc": "重複要素を持たないコレクション。"
      },
      {
        "term": "ジェネリクス (generics)",
        "zh": "泛型",
        "desc": "<T>のように型パラメータを指定し、型安全なコレクションを実現する仕組み。"
      }
    ],
    "quizList": [
      {
        "question": "ArrayListとHashSetの最大の違いは何ですか？",
        "questionZh": "ArrayList和HashSet最大的区别是什么？",
        "options": [
          "ArrayListは数値のみ、HashSetは文字列のみ",
          "ArrayListは重複を許可、HashSetは重複を許可しない",
          "ArrayListは順序なし、HashSetは順序あり",
          "ArrayListはキーと値のペアを持つ"
        ],
        "answerIdx": 1,
        "hint": "Set（集合）は数学の集合と同じで、同じ要素は1つしか持てません / Set与数学的集合一样，不允许重复元素。"
      },
      {
        "question": "HashMapのデータアクセス方法は？",
        "questionZh": "HashMap访问数据的方法是什么？",
        "options": [
          "インデックス（数値）でアクセス",
          "キー（任意のオブジェクト）でアクセス",
          "ランダムにアクセス",
          "先頭から順番にアクセスのみ"
        ],
        "answerIdx": 1,
        "hint": "MapはKey-Valueペアです。get(key)でvalueを取得します / Map是键值对，用get(key)获取value。"
      },
      {
        "question": "ArrayList<String> のジェネリクス<String>の目的は？",
        "questionZh": "ArrayList<String> 中 <String> 泛型的目的是什么？",
        "options": [
          "ArrayListのサイズを制限する",
          "String以外の型を追加しようとするとコンパイルエラーにする",
          "ArrayListを高速化する",
          "文字列を自動でソートする"
        ],
        "answerIdx": 1,
        "hint": "型安全（type-safe）を保証するためです / 用于保证类型安全。"
      }
    ],
    "pdfPage": 74,
    "pdfHighlightTerm": "ジェネリクス（Generics）",
    "originalChapterId": "jissen-5"
  },
  {
    "id": 79,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 5,
    "chapterName": "実践編 第5章 コレクション",
    "subSectionId": "5-E",
    "subSectionName": "5-E 演習問題 (课后练习)",
    "section": "実践編 実践編 第5章 コレクション",
    "titleJa": "演習：第5章の課題",
    "titleZh": "练习：第5章的课后练习",
    "conceptJa": "<h3>第5章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>HashMapを使用して、キーを『学生の名前(String)』、値を『得点(Integer)』とした成績簿を作成し、3人分のデータを追加して、特定の学生の点数を検索して出力するコードを記述してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第5章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>使用 HashMap 存储 3 个人的姓名（String）和他们的成绩（Integer），并编写逻辑：根据指定的姓名查询其对应的成绩并打印输出。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第5章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第5章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 75,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "jissen-5"
  },
  {
    "id": 80,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 6,
    "chapterName": "実践編 第6章 ラムダ式",
    "subSectionId": "6-1",
    "subSectionName": "6-1 匿名クラスとは",
    "section": "実践編 実践編 第6章 ラムダ式",
    "titleJa": "匿名クラスとは",
    "titleZh": "什么是Lambda表达式",
    "conceptJa": "<h3>匿名クラスとは</h3>\n<p>名前のないクラスをその場で定義して使うことができます。インタフェースを実装する際によく使います。</p>\n\n",
    "conceptZh": "<h3>什么是Lambda表达式</h3>\n<p>什么是Lambda表达式是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.98）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "⚡ Lambda 与函数式接口就像是“电工的超快接头暗号”：它抹去了所有复杂的接线盒盖板（样板匿名类），一笔画过去就能让电路通电运转。",
    "example": "public class Main {\n    interface Greeting {\n        void greet(String message);\n    }\n    public static void main(String[] args) {\n        // 使用 Lambda 表达式定义函数式接口\n        Greeting g = msg -> System.out.println(\"你好: \" + msg);\n        g.greet(\"Lambda！\");\n    }\n}",
    "vocabList": [
      {
        "term": "ラムダ式 (lambda expression)",
        "zh": "Lambda表达式",
        "desc": "関数型インタフェースを簡潔に実装する記法。(引数) -> 処理 の形。"
      },
      {
        "term": "関数型インタフェース",
        "zh": "函数式接口",
        "desc": "抽象メソッドが1つだけのインタフェース。ラムダ式で実装できる。"
      },
      {
        "term": "メソッド参照 (method reference)",
        "zh": "方法引用",
        "desc": "ClassName::methodName の形でメソッドをラムダ式として渡す記法。"
      }
    ],
    "quizList": [
      {
        "question": "ラムダ式が使えるインタフェースの条件は何ですか？",
        "questionZh": "可以使用Lambda表达式的接口需要满足什么条件？",
        "options": [
          "全てのインタフェース",
          "抽象メソッドが1つだけの関数型インタフェース",
          "staticメソッドを持つインタフェース",
          "Runnableを継承しているもの"
        ],
        "answerIdx": 1,
        "hint": "@FunctionalInterfaceアノテーションで明示することもできます / 可以用@FunctionalInterface注解来标记。"
      },
      {
        "question": "ラムダ式 x -> x * 2 の意味は？",
        "questionZh": "Lambda表达式 x -> x * 2 的含义是什么？",
        "options": [
          "xを宣言して2を掛ける変数",
          "xを受け取ってx*2を返す関数",
          "2つの引数xを受け取る",
          "xが2以上かどうかを判定する"
        ],
        "answerIdx": 1,
        "hint": "-> の左が引数、右が処理（戻り値）です / ->左边是参数，右边是处理（返回值）。"
      }
    ],
    "pdfPage": 98,
    "pdfHighlightTerm": "匿名クラスとは",
    "originalChapterId": "jissen-6"
  },
  {
    "id": 81,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 6,
    "chapterName": "実践編 第6章 ラムダ式",
    "subSectionId": "6-2",
    "subSectionName": "6-2 関数型インタフェース",
    "section": "実践編 実践編 第6章 ラムダ式",
    "titleJa": "関数型インタフェース",
    "titleZh": "函数式接口（Functional Interface）",
    "conceptJa": "<h3>関数型インタフェース</h3>\n<p>メソッドが1つだけのインタフェースを<strong>関数型インタフェース</strong>と呼びます。ラムダ式はこれを簡潔に書く方法です。</p>\n\n",
    "conceptZh": "<h3>函数式接口（Functional Interface）</h3>\n<p>函数式接口（Functional Interface）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.100）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "⚡ Lambda 与函数式接口就像是“电工的超快接头暗号”：它抹去了所有复杂的接线盒盖板（样板匿名类），一笔画过去就能让电路通电运转。",
    "example": "import java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = Arrays.asList(\"A\", \"B\", \"C\");\n        list.forEach(item -> System.out.println(\"元素: \" + item));\n    }\n}",
    "vocabList": [
      {
        "term": "ラムダ式 (lambda expression)",
        "zh": "Lambda表达式",
        "desc": "関数型インタフェースを簡潔に実装する記法。(引数) -> 処理 の形。"
      },
      {
        "term": "関数型インタフェース",
        "zh": "函数式接口",
        "desc": "抽象メソッドが1つだけのインタフェース。ラムダ式で実装できる。"
      }
    ],
    "quizList": [
      {
        "question": "ラムダ式が使えるインタフェースの条件は何ですか？",
        "questionZh": "可以使用Lambda表达式的接口需要满足什么条件？",
        "options": [
          "全てのインタフェース",
          "抽象メソッドが1つだけの関数型インタフェース",
          "staticメソッドを持つインタフェース",
          "Runnableを継承しているもの"
        ],
        "answerIdx": 1,
        "hint": "@FunctionalInterfaceアノテーションで明示することもできます / 可以用@FunctionalInterface注解来标记。"
      },
      {
        "question": "ラムダ式 x -> x * 2 の意味は？",
        "questionZh": "Lambda表达式 x -> x * 2 的含义是什么？",
        "options": [
          "xを宣言して2を掛ける変数",
          "xを受け取ってx*2を返す関数",
          "2つの引数xを受け取る",
          "xが2以上かどうかを判定する"
        ],
        "answerIdx": 1,
        "hint": "-> の左が引数、右が処理（戻り値）です / ->左边是参数，右边是处理（返回值）。"
      }
    ],
    "pdfPage": 100,
    "pdfHighlightTerm": "関数型インタフェース",
    "originalChapterId": "jissen-6"
  },
  {
    "id": 82,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 6,
    "chapterName": "実践編 第6章 ラムダ式",
    "subSectionId": "6-3",
    "subSectionName": "6-3 ラムダ式の書き方",
    "section": "実践編 実践編 第6章 ラムダ式",
    "titleJa": "ラムダ式の書き方",
    "titleZh": "Lambda表达式语法",
    "conceptJa": "<h3>ラムダ式の書き方</h3>\n<pre><code>// 通常の匿名クラス\nRunnable r = new Runnable() {\n    @Override\n    public void run() { System.out.println(\"Hello\"); }\n};\n\n// ラムダ式（簡潔！）\nRunnable r = () -> System.out.println(\"Hello\");</code></pre>\n\n",
    "conceptZh": "<h3>Lambda表达式语法</h3>\n<pre><code>// 传统匿名类（冗长）\nRunnable r = new Runnable() {\n    @Override\n    public void run() { System.out.println(\"Hello\"); }\n};\n\n// Lambda表达式（简洁）\nRunnable r = () -> System.out.println(\"Hello\");</code></pre>\n\n",
    "analogy": "⚡ Lambda 与函数式接口就像是“电工的超快接头暗号”：它抹去了所有复杂的接线盒盖板（样板匿名类），一笔画过去就能让电路通电运转。",
    "example": "public class Main {\n    interface Greeting {\n        void greet(String message);\n    }\n    public static void main(String[] args) {\n        // 使用 Lambda 表达式定义函数式接口\n        Greeting g = msg -> System.out.println(\"你好: \" + msg);\n        g.greet(\"Lambda！\");\n    }\n}",
    "vocabList": [
      {
        "term": "ラムダ式 (lambda expression)",
        "zh": "Lambda表达式",
        "desc": "関数型インタフェースを簡潔に実装する記法。(引数) -> 処理 の形。"
      }
    ],
    "quizList": [
      {
        "question": "ラムダ式が使えるインタフェースの条件は何ですか？",
        "questionZh": "可以使用Lambda表达式的接口需要满足什么条件？",
        "options": [
          "全てのインタフェース",
          "抽象メソッドが1つだけの関数型インタフェース",
          "staticメソッドを持つインタフェース",
          "Runnableを継承しているもの"
        ],
        "answerIdx": 1,
        "hint": "@FunctionalInterfaceアノテーションで明示することもできます / 可以用@FunctionalInterface注解来标记。"
      },
      {
        "question": "ラムダ式 x -> x * 2 の意味は？",
        "questionZh": "Lambda表达式 x -> x * 2 的含义是什么？",
        "options": [
          "xを宣言して2を掛ける変数",
          "xを受け取ってx*2を返す関数",
          "2つの引数xを受け取る",
          "xが2以上かどうかを判定する"
        ],
        "answerIdx": 1,
        "hint": "-> の左が引数、右が処理（戻り値）です / ->左边是参数，右边是处理（返回值）。"
      }
    ],
    "pdfPage": 101,
    "pdfHighlightTerm": "ラムダ式の書き方",
    "originalChapterId": "jissen-6"
  },
  {
    "id": 83,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 6,
    "chapterName": "実践編 第6章 ラムダ式",
    "subSectionId": "6-4",
    "subSectionName": "6-4 ラムダ式の省略形",
    "section": "実践編 実践編 第6章 ラムダ式",
    "titleJa": "ラムダ式の省略形",
    "titleZh": "Lambda的各种写法",
    "conceptJa": "<h3>ラムダ式の省略形</h3>\n<pre><code>// 引数1つ → カッコ省略可\nx -> x * 2\n\n// 処理が1行 → {}とreturn省略可\n(a, b) -> a + b\n\n// 完全形\n(int a, int b) -> { return a + b; }</code></pre>\n\n",
    "conceptZh": "<h3>Lambda的各种写法</h3>\n<pre><code>// 无参数\n() -> System.out.println(\"Hello\")\n// 一个参数（可省略括号）\nx -> x * 2\n// 两个参数\n(a, b) -> a + b\n// 多行代码\n(x) -> {\n    int result = x * 2;\n    return result;\n}</code></pre>\n\n",
    "analogy": "⚡ Lambda 与函数式接口就像是“电工的超快接头暗号”：它抹去了所有复杂的接线盒盖板（样板匿名类），一笔画过去就能让电路通电运转。",
    "example": "public class Main {\n    interface Greeting {\n        void greet(String message);\n    }\n    public static void main(String[] args) {\n        // 使用 Lambda 表达式定义函数式接口\n        Greeting g = msg -> System.out.println(\"你好: \" + msg);\n        g.greet(\"Lambda！\");\n    }\n}",
    "vocabList": [
      {
        "term": "ラムダ式 (lambda expression)",
        "zh": "Lambda表达式",
        "desc": "関数型インタフェースを簡潔に実装する記法。(引数) -> 処理 の形。"
      }
    ],
    "quizList": [
      {
        "question": "ラムダ式が使えるインタフェースの条件は何ですか？",
        "questionZh": "可以使用Lambda表达式的接口需要满足什么条件？",
        "options": [
          "全てのインタフェース",
          "抽象メソッドが1つだけの関数型インタフェース",
          "staticメソッドを持つインタフェース",
          "Runnableを継承しているもの"
        ],
        "answerIdx": 1,
        "hint": "@FunctionalInterfaceアノテーションで明示することもできます / 可以用@FunctionalInterface注解来标记。"
      },
      {
        "question": "ラムダ式 x -> x * 2 の意味は？",
        "questionZh": "Lambda表达式 x -> x * 2 的含义是什么？",
        "options": [
          "xを宣言して2を掛ける変数",
          "xを受け取ってx*2を返す関数",
          "2つの引数xを受け取る",
          "xが2以上かどうかを判定する"
        ],
        "answerIdx": 1,
        "hint": "-> の左が引数、右が処理（戻り値）です / ->左边是参数，右边是处理（返回值）。"
      }
    ],
    "pdfPage": 103,
    "pdfHighlightTerm": "ラムダ式の省略形",
    "originalChapterId": "jissen-6"
  },
  {
    "id": 84,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 6,
    "chapterName": "実践編 第6章 ラムダ式",
    "subSectionId": "6-5",
    "subSectionName": "6-5 forEach と ラムダ",
    "section": "実践編 実践編 第6章 ラムダ式",
    "titleJa": "forEach と ラムダ",
    "titleZh": "forEach与Lambda",
    "conceptJa": "<h3>forEach と ラムダ</h3>\n<pre><code>List&lt;String&gt; list = Arrays.asList(\"A\", \"B\", \"C\");\nlist.forEach(s -> System.out.println(s));\n// または\nlist.forEach(System.out::println);  // メソッド参照</code></pre>\n\n",
    "conceptZh": "<h3>forEach与Lambda</h3>\n<p>forEach与Lambda是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.106）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "⚡ Lambda 与函数式接口就像是“电工的超快接头暗号”：它抹去了所有复杂的接线盒盖板（样板匿名类），一笔画过去就能让电路通电运转。",
    "example": "import java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = Arrays.asList(\"A\", \"B\", \"C\");\n        list.forEach(item -> System.out.println(\"元素: \" + item));\n    }\n}",
    "vocabList": [
      {
        "term": "メソッド参照 (method reference)",
        "zh": "方法引用",
        "desc": "ClassName::methodName の形でメソッドをラムダ式として渡す記法。"
      }
    ],
    "quizList": [
      {
        "question": "ラムダ式が使えるインタフェースの条件は何ですか？",
        "questionZh": "可以使用Lambda表达式的接口需要满足什么条件？",
        "options": [
          "全てのインタフェース",
          "抽象メソッドが1つだけの関数型インタフェース",
          "staticメソッドを持つインタフェース",
          "Runnableを継承しているもの"
        ],
        "answerIdx": 1,
        "hint": "@FunctionalInterfaceアノテーションで明示することもできます / 可以用@FunctionalInterface注解来标记。"
      },
      {
        "question": "ラムダ式 x -> x * 2 の意味は？",
        "questionZh": "Lambda表达式 x -> x * 2 的含义是什么？",
        "options": [
          "xを宣言して2を掛ける変数",
          "xを受け取ってx*2を返す関数",
          "2つの引数xを受け取る",
          "xが2以上かどうかを判定する"
        ],
        "answerIdx": 1,
        "hint": "-> の左が引数、右が処理（戻り値）です / ->左边是参数，右边是处理（返回值）。"
      },
      {
        "question": "list.forEach(System.out::println) の :: は何を表しますか？",
        "questionZh": "list.forEach(System.out::println) 中的 :: 是什么？",
        "options": [
          "パッケージの区切り",
          "メソッド参照（Method Reference）",
          "エラーの発生",
          "変数の宣言"
        ],
        "answerIdx": 1,
        "hint": "メソッド参照はラムダ式をさらに短く書く方法です / 方法引用是Lambda表达式的更简洁写法。"
      }
    ],
    "pdfPage": 106,
    "pdfHighlightTerm": "forEach と ラムダ",
    "originalChapterId": "jissen-6"
  },
  {
    "id": 85,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 6,
    "chapterName": "実践編 第6章 ラムダ式",
    "subSectionId": "6-6",
    "subSectionName": "6-6 ラムダ式でのソート",
    "section": "実践編 実践編 第6章 ラムダ式",
    "titleJa": "ラムダ式でのソート",
    "titleZh": "使用Lambda进行排序",
    "conceptJa": "<h3>ラムダ式でのソート</h3>\n<pre><code>list.sort((a, b) -> a.compareTo(b));  // 昇順\nlist.sort((a, b) -> b.compareTo(a));  // 降順</code></pre>",
    "conceptZh": "<h3>使用Lambda进行排序</h3>\n<p>使用Lambda进行排序是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.101）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "⚡ Lambda 与函数式接口就像是“电工的超快接头暗号”：它抹去了所有复杂的接线盒盖板（样板匿名类），一笔画过去就能让电路通电运转。",
    "example": "public class Main {\n    interface Greeting {\n        void greet(String message);\n    }\n    public static void main(String[] args) {\n        // 使用 Lambda 表达式定义函数式接口\n        Greeting g = msg -> System.out.println(\"你好: \" + msg);\n        g.greet(\"Lambda！\");\n    }\n}",
    "vocabList": [
      {
        "term": "ラムダ式 (lambda expression)",
        "zh": "Lambda表达式",
        "desc": "関数型インタフェースを簡潔に実装する記法。(引数) -> 処理 の形。"
      }
    ],
    "quizList": [
      {
        "question": "ラムダ式が使えるインタフェースの条件は何ですか？",
        "questionZh": "可以使用Lambda表达式的接口需要满足什么条件？",
        "options": [
          "全てのインタフェース",
          "抽象メソッドが1つだけの関数型インタフェース",
          "staticメソッドを持つインタフェース",
          "Runnableを継承しているもの"
        ],
        "answerIdx": 1,
        "hint": "@FunctionalInterfaceアノテーションで明示することもできます / 可以用@FunctionalInterface注解来标记。"
      },
      {
        "question": "ラムダ式 x -> x * 2 の意味は？",
        "questionZh": "Lambda表达式 x -> x * 2 的含义是什么？",
        "options": [
          "xを宣言して2を掛ける変数",
          "xを受け取ってx*2を返す関数",
          "2つの引数xを受け取る",
          "xが2以上かどうかを判定する"
        ],
        "answerIdx": 1,
        "hint": "-> の左が引数、右が処理（戻り値）です / ->左边是参数，右边是处理（返回值）。"
      }
    ],
    "pdfPage": 101,
    "pdfHighlightTerm": "ラムダ式でのソート",
    "originalChapterId": "jissen-6"
  },
  {
    "id": 86,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 6,
    "chapterName": "実践編 第6章 ラムダ式",
    "subSectionId": "6-E",
    "subSectionName": "6-E 演習問題 (课后练习)",
    "section": "実践編 実践編 第6章 ラムダ式",
    "titleJa": "演習：第6章の課題",
    "titleZh": "练习：第6章的课后练习",
    "conceptJa": "<h3>第6章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>Lambda式とリストを使用して、10, 20, 30 の入ったリストの各要素を forEach とラムダ式を用いてそれぞれ2倍にして画面に出力する記述を完成させてください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第6章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>结合 Lambda 表达式，定义一个 `List<Integer>` 数组，并使用 `forEach` 结合箭头语法 `n -> ...`，将每个元素乘以 2 并进行屏幕输出。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第6章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第6章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 102,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "jissen-6"
  },
  {
    "id": 87,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 7,
    "chapterName": "実践編 第7章 入出力（I/O）",
    "subSectionId": "7-1",
    "subSectionName": "7-1 標準入出力",
    "section": "実践編 実践編 第7章 入出力（I/O）",
    "titleJa": "標準入出力",
    "titleZh": "标准输入输出",
    "conceptJa": "<h3>標準入出力</h3>\n<ul>\n  <li><strong>標準出力</strong>：<code>System.out.println()</code>（画面への出力）</li>\n  <li><strong>標準入力</strong>：<code>Scanner scanner = new Scanner(System.in);</code>（キーボードからの入力）</li>\n</ul>\n<pre><code>import java.util.Scanner;\nScanner sc = new Scanner(System.in);\nSystem.out.print(\"名前を入力: \");\nString name = sc.nextLine();     // 1行読み込み\nint age = sc.nextInt();          // 整数読み込み\nsc.close();</code></pre>\n\n",
    "conceptZh": "<h3>标准输入输出</h3>\n<p>标准输入输出是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.111）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "💾 输入输出（I/O）与序列化就像是“跨越时空的数据快递管道”：能把内存里鲜活的乐高城堡拆散打成数据包，寄送出去再组装还原出来。",
    "example": "import java.io.ByteArrayOutputStream;\nimport java.io.IOException;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        ByteArrayOutputStream out = new ByteArrayOutputStream();\n        out.write(\"Hello I/O Stream!\".getBytes());\n        System.out.println(\"写入缓冲区数据: \" + out.toString());\n    }\n}",
    "vocabList": [
      {
        "term": "Scanner",
        "zh": "扫描器/输入读取器",
        "desc": "標準入力やファイルから値を読み込むクラス。"
      }
    ],
    "quizList": [
      {
        "question": "キーボードから1行入力を読み込むScannerのメソッドは？",
        "questionZh": "用Scanner从键盘读取一行输入的方法是什么？",
        "options": [
          "readLine()",
          "next()",
          "nextLine()",
          "read()"
        ],
        "answerIdx": 2,
        "hint": "1行まるごと読むのはnextLine()、単語だけならnext()です / 读一行用nextLine()，读一个词用next()。"
      }
    ],
    "pdfPage": 111,
    "pdfHighlightTerm": "標準入出力",
    "originalChapterId": "jissen-7"
  },
  {
    "id": 88,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 7,
    "chapterName": "実践編 第7章 入出力（I/O）",
    "subSectionId": "7-2",
    "subSectionName": "7-2 ファイルへの書き込み",
    "section": "実践編 実践編 第7章 入出力（I/O）",
    "titleJa": "ファイルへの書き込み",
    "titleZh": "文件写入",
    "conceptJa": "<h3>ファイルへの書き込み</h3>\n<pre><code>import java.io.*;\n// 基本的な書き込み\nFileWriter fw = new FileWriter(\"test.txt\");\nfw.write(\"Hello, File!\");\nfw.close();\n\n// バッファを使った書き込み（高速）\nBufferedWriter bw = new BufferedWriter(new FileWriter(\"test.txt\"));\nbw.write(\"こんにちは\");\nbw.newLine();\nbw.close();</code></pre>\n\n",
    "conceptZh": "<h3>文件写入</h3>\n<p>使用<code>FileWriter</code>或带缓冲的<code>BufferedWriter</code>（速度更快）。</p>\n<pre><code>// 基本写入\nFileWriter fw = new FileWriter(\"test.txt\");\nfw.write(\"Hello\");\nfw.close();  // 必须关闭！否则数据可能丢失</code></pre>\n\n",
    "analogy": "💾 输入输出（I/O）与序列化就像是“跨越时空的数据快递管道”：能把内存里鲜活的乐高城堡拆散打成数据包，寄送出去再组装还原出来。",
    "example": "import java.io.ByteArrayOutputStream;\nimport java.io.IOException;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        ByteArrayOutputStream out = new ByteArrayOutputStream();\n        out.write(\"Hello I/O Stream!\".getBytes());\n        System.out.println(\"写入缓冲区数据: \" + out.toString());\n    }\n}",
    "vocabList": [
      {
        "term": "バッファ (buffer)",
        "zh": "缓冲区",
        "desc": "データを一時的に蓄えておく領域。効率的なI/Oを実現する。"
      },
      {
        "term": "Scanner",
        "zh": "扫描器/输入读取器",
        "desc": "標準入力やファイルから値を読み込むクラス。"
      }
    ],
    "quizList": [
      {
        "question": "キーボードから1行入力を読み込むScannerのメソッドは？",
        "questionZh": "用Scanner从键盘读取一行输入的方法是什么？",
        "options": [
          "readLine()",
          "next()",
          "nextLine()",
          "read()"
        ],
        "answerIdx": 2,
        "hint": "1行まるごと読むのはnextLine()、単語だけならnext()です / 读一行用nextLine()，读一个词用next()。"
      }
    ],
    "pdfPage": 114,
    "pdfHighlightTerm": "ファイルへの書き込み",
    "originalChapterId": "jissen-7"
  },
  {
    "id": 89,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 7,
    "chapterName": "実践編 第7章 入出力（I/O）",
    "subSectionId": "7-3",
    "subSectionName": "7-3 ファイルからの読み込み",
    "section": "実践編 実践編 第7章 入出力（I/O）",
    "titleJa": "ファイルからの読み込み",
    "titleZh": "文件读取",
    "conceptJa": "<h3>ファイルからの読み込み</h3>\n<pre><code>BufferedReader br = new BufferedReader(new FileReader(\"test.txt\"));\nString line;\nwhile ((line = br.readLine()) != null) {\n    System.out.println(line);\n}\nbr.close();</code></pre>\n\n",
    "conceptZh": "<h3>文件读取</h3>\n<p>文件读取是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.118）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "💾 输入输出（I/O）与序列化就像是“跨越时空的数据快递管道”：能把内存里鲜活的乐高城堡拆散打成数据包，寄送出去再组装还原出来。",
    "example": "import java.io.ByteArrayOutputStream;\nimport java.io.IOException;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        ByteArrayOutputStream out = new ByteArrayOutputStream();\n        out.write(\"Hello I/O Stream!\".getBytes());\n        System.out.println(\"写入缓冲区数据: \" + out.toString());\n    }\n}",
    "vocabList": [
      {
        "term": "Scanner",
        "zh": "扫描器/输入读取器",
        "desc": "標準入力やファイルから値を読み込むクラス。"
      }
    ],
    "quizList": [
      {
        "question": "キーボードから1行入力を読み込むScannerのメソッドは？",
        "questionZh": "用Scanner从键盘读取一行输入的方法是什么？",
        "options": [
          "readLine()",
          "next()",
          "nextLine()",
          "read()"
        ],
        "answerIdx": 2,
        "hint": "1行まるごと読むのはnextLine()、単語だけならnext()です / 读一行用nextLine()，读一个词用next()。"
      }
    ],
    "pdfPage": 118,
    "pdfHighlightTerm": "ファイルからの読み込み",
    "originalChapterId": "jissen-7"
  },
  {
    "id": 90,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 7,
    "chapterName": "実践編 第7章 入出力（I/O）",
    "subSectionId": "7-4",
    "subSectionName": "7-4 try-with-resources",
    "section": "実践編 実践編 第7章 入出力（I/O）",
    "titleJa": "try-with-resources",
    "titleZh": "try-with-resources",
    "conceptJa": "<h3>try-with-resources</h3>\n<p>ストリームを自動的にcloseする書き方（Java 7以降）：</p>\n<pre><code>try (BufferedWriter bw = new BufferedWriter(new FileWriter(\"test.txt\"))) {\n    bw.write(\"自動クローズ\");\n}  // ここで自動的にclose()される</code></pre>\n\n",
    "conceptZh": "<h3>try-with-resources</h3>\n<p>Java 7引入的语法，自动关闭流，不需要手动调用<code>close()</code>，更安全。</p>\n<pre><code>try (BufferedReader br = new BufferedReader(new FileReader(\"test.txt\"))) {\n    String line;\n    while ((line = br.readLine()) != null) {\n        System.out.println(line);\n    }\n}  // 自动关闭，不需要br.close()</code></pre>\n\n",
    "analogy": "💾 输入输出（I/O）与序列化就像是“跨越时空的数据快递管道”：能把内存里鲜活的乐高城堡拆散打成数据包，寄送出去再组装还原出来。",
    "example": "import java.io.ByteArrayOutputStream;\nimport java.io.IOException;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        ByteArrayOutputStream out = new ByteArrayOutputStream();\n        out.write(\"Hello I/O Stream!\".getBytes());\n        System.out.println(\"写入缓冲区数据: \" + out.toString());\n    }\n}",
    "vocabList": [
      {
        "term": "ストリーム (stream)",
        "zh": "流",
        "desc": "データの流れを表す概念。入力ストリームと出力ストリームがある。"
      },
      {
        "term": "Scanner",
        "zh": "扫描器/输入读取器",
        "desc": "標準入力やファイルから値を読み込むクラス。"
      }
    ],
    "quizList": [
      {
        "question": "キーボードから1行入力を読み込むScannerのメソッドは？",
        "questionZh": "用Scanner从键盘读取一行输入的方法是什么？",
        "options": [
          "readLine()",
          "next()",
          "nextLine()",
          "read()"
        ],
        "answerIdx": 2,
        "hint": "1行まるごと読むのはnextLine()、単語だけならnext()です / 读一行用nextLine()，读一个词用next()。"
      }
    ],
    "pdfPage": 177,
    "pdfHighlightTerm": "try-with-resources",
    "originalChapterId": "jissen-7"
  },
  {
    "id": 91,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 7,
    "chapterName": "実践編 第7章 入出力（I/O）",
    "subSectionId": "7-5",
    "subSectionName": "7-5 シリアライゼーション",
    "section": "実践編 実践編 第7章 入出力（I/O）",
    "titleJa": "シリアライゼーション",
    "titleZh": "序列化（Serialization）",
    "conceptJa": "<h3>シリアライゼーション</h3>\n<p>オブジェクトをそのままファイルに保存・読み込みする仕組み。クラスに<code>implements Serializable</code>が必要。</p>",
    "conceptZh": "<h3>序列化（Serialization）</h3>\n<p>序列化（Serialization）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.120）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "💾 输入输出（I/O）与序列化就像是“跨越时空的数据快递管道”：能把内存里鲜活的乐高城堡拆散打成数据包，寄送出去再组装还原出来。",
    "example": "import java.io.ByteArrayOutputStream;\nimport java.io.IOException;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        ByteArrayOutputStream out = new ByteArrayOutputStream();\n        out.write(\"Hello I/O Stream!\".getBytes());\n        System.out.println(\"写入缓冲区数据: \" + out.toString());\n    }\n}",
    "vocabList": [
      {
        "term": "シリアライゼーション (serialization)",
        "zh": "序列化",
        "desc": "オブジェクトをバイト列に変換してファイルに保存する仕組み。"
      },
      {
        "term": "Scanner",
        "zh": "扫描器/输入读取器",
        "desc": "標準入力やファイルから値を読み込むクラス。"
      }
    ],
    "quizList": [
      {
        "question": "キーボードから1行入力を読み込むScannerのメソッドは？",
        "questionZh": "用Scanner从键盘读取一行输入的方法是什么？",
        "options": [
          "readLine()",
          "next()",
          "nextLine()",
          "read()"
        ],
        "answerIdx": 2,
        "hint": "1行まるごと読むのはnextLine()、単語だけならnext()です / 读一行用nextLine()，读一个词用next()。"
      }
    ],
    "pdfPage": 120,
    "pdfHighlightTerm": "シリアライゼーション",
    "originalChapterId": "jissen-7"
  },
  {
    "id": 92,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 7,
    "chapterName": "実践編 第7章 入出力（I/O）",
    "subSectionId": "7-E",
    "subSectionName": "7-E 演習問題 (课后练习)",
    "section": "実践編 実践編 第7章 入出力（I/O）",
    "titleJa": "演習：第7章の課題",
    "titleZh": "练习：第7章的课后练习",
    "conceptJa": "<h3>第7章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>ByteArrayOutputStream を用いて、メモリ上に「Java実践編の学習完了」という文字列を書き込み、再度それをバイト配列から読み出してコンソールに出力するプログラムを作成してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第7章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>利用 Java I/O 流中的内存流，向内存字节流中写入一行中日文字符串，接着再把该流的数据读取并还原为完整的文本在终端输出。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第7章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第7章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 121,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "jissen-7"
  },
  {
    "id": 93,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 8,
    "chapterName": "実践編 第8章 GUIアプリケーション",
    "subSectionId": "8-1",
    "subSectionName": "8-1 GUIとは",
    "section": "実践編 実践編 第8章 GUIアプリケーション",
    "titleJa": "GUIとは",
    "titleZh": "什么是GUI",
    "conceptJa": "<h3>GUIとは</h3>\n<p>Graphical User Interface（グラフィカルユーザインタフェース）の略。ウィンドウ、ボタン、テキストフィールドなどの視覚的な部品（コンポーネント）を使ったアプリです。</p>\n\n",
    "conceptZh": "<h3>什么是GUI</h3>\n<p>什么是GUI是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.126）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🖼️ Swing 与 GUI 就像是“用积木拼装出来的精美桌面窗口”：通过各种布局管理器 and 事件监听器（Listener），能让静态的积木和用户互动起来。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"抽象类与接口\");\n    }\n}",
    "vocabList": [
      {
        "term": "GUI",
        "zh": "图形用户界面",
        "desc": "ウィンドウやボタンなどのグラフィカルな部品を使ったユーザインタフェース。"
      },
      {
        "term": "コンポーネント (component)",
        "zh": "组件",
        "desc": "GUIを構成する部品（JButton, JLabel, JTextField など）。"
      }
    ],
    "quizList": [
      {
        "question": "JFrameとは何ですか？",
        "questionZh": "JFrame是什么？",
        "options": [
          "ボタンコンポーネント",
          "アプリケーションのウィンドウフレーム",
          "テキスト入力フィールド",
          "レイアウトマネージャ"
        ],
        "answerIdx": 1,
        "hint": "GUIアプリの「箱」の役割をします / 是GUI应用程序的「窗口容器」。"
      },
      {
        "question": "BorderLayoutが分割する領域の数は？",
        "questionZh": "BorderLayout将窗口分为多少个区域？",
        "options": [
          "3",
          "4",
          "5",
          "9"
        ],
        "answerIdx": 2,
        "hint": "North, South, East, West, Center の5エリアです / 分为North, South, East, West, Center共5个区域。"
      },
      {
        "question": "ボタンクリックのイベントを処理するインタフェースは？",
        "questionZh": "处理按钮点击事件的接口是什么？",
        "options": [
          "ClickListener",
          "ActionListener",
          "MouseListener",
          "EventHandler"
        ],
        "answerIdx": 1,
        "hint": "addActionListener()メソッドで登録します / 通过addActionListener()方法注册。"
      }
    ],
    "pdfPage": 126,
    "pdfHighlightTerm": "GUIとは",
    "originalChapterId": "jissen-8"
  },
  {
    "id": 94,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 8,
    "chapterName": "実践編 第8章 GUIアプリケーション",
    "subSectionId": "8-2",
    "subSectionName": "8-2 Swingライブラリ",
    "section": "実践編 実践編 第8章 GUIアプリケーション",
    "titleJa": "Swingライブラリ",
    "titleZh": "Swing库",
    "conceptJa": "<h3>Swingライブラリ</h3>\n<p>JavaのGUI作成に使う標準ライブラリです。<code>javax.swing</code>パッケージに含まれます。</p>\n<p>主なコンポーネント：</p>\n<table border=\"1\" style=\"border-collapse:collapse;width:100%\">\n<tr><th>クラス</th><th>説明</th></tr>\n<tr><td>JFrame</td><td>ウィンドウの枠</td></tr>\n<tr><td>JButton</td><td>ボタン</td></tr>\n<tr><td>JLabel</td><td>ラベル（テキスト表示）</td></tr>\n<tr><td>JTextField</td><td>1行テキスト入力</td></tr>\n<tr><td>JPanel</td><td>コンポーネントのまとめ用パネル</td></tr>\n</table>\n\n",
    "conceptZh": "<h3>Swing库</h3>\n<p>Java标准的GUI库，在<code>javax.swing</code>包中。主要组件：</p>\n<ul>\n  <li><code>JFrame</code>：窗口框架</li>\n  <li><code>JButton</code>：按钮</li>\n  <li><code>JLabel</code>：标签（显示文字）</li>\n  <li><code>JTextField</code>：单行文本输入</li>\n</ul>\n\n",
    "analogy": "🖼️ Swing 与 GUI 就像是“用积木拼装出来的精美桌面窗口”：通过各种布局管理器 and 事件监听器（Listener），能让静态的积木和用户互动起来。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"抽象类与接口\");\n    }\n}",
    "vocabList": [
      {
        "term": "GUI",
        "zh": "图形用户界面",
        "desc": "ウィンドウやボタンなどのグラフィカルな部品を使ったユーザインタフェース。"
      },
      {
        "term": "コンポーネント (component)",
        "zh": "组件",
        "desc": "GUIを構成する部品（JButton, JLabel, JTextField など）。"
      }
    ],
    "quizList": [
      {
        "question": "JFrameとは何ですか？",
        "questionZh": "JFrame是什么？",
        "options": [
          "ボタンコンポーネント",
          "アプリケーションのウィンドウフレーム",
          "テキスト入力フィールド",
          "レイアウトマネージャ"
        ],
        "answerIdx": 1,
        "hint": "GUIアプリの「箱」の役割をします / 是GUI应用程序的「窗口容器」。"
      },
      {
        "question": "BorderLayoutが分割する領域の数は？",
        "questionZh": "BorderLayout将窗口分为多少个区域？",
        "options": [
          "3",
          "4",
          "5",
          "9"
        ],
        "answerIdx": 2,
        "hint": "North, South, East, West, Center の5エリアです / 分为North, South, East, West, Center共5个区域。"
      },
      {
        "question": "ボタンクリックのイベントを処理するインタフェースは？",
        "questionZh": "处理按钮点击事件的接口是什么？",
        "options": [
          "ClickListener",
          "ActionListener",
          "MouseListener",
          "EventHandler"
        ],
        "answerIdx": 1,
        "hint": "addActionListener()メソッドで登録します / 通过addActionListener()方法注册。"
      }
    ],
    "pdfPage": 127,
    "pdfHighlightTerm": "Swingライブラリ",
    "originalChapterId": "jissen-8"
  },
  {
    "id": 95,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 8,
    "chapterName": "実践編 第8章 GUIアプリケーション",
    "subSectionId": "8-3",
    "subSectionName": "8-3 レイアウトマネージャ",
    "section": "実践編 実践編 第8章 GUIアプリケーション",
    "titleJa": "レイアウトマネージャ",
    "titleZh": "布局管理器（Layout Manager）",
    "conceptJa": "<h3>レイアウトマネージャ</h3>\n<ul>\n  <li><strong>FlowLayout</strong>：横に並べる（デフォルト）</li>\n  <li><strong>BorderLayout</strong>：上下左右中央の5エリア</li>\n  <li><strong>GridLayout</strong>：格子状に並べる</li>\n</ul>\n\n",
    "conceptZh": "<h3>布局管理器（Layout Manager）</h3>\n<p>控制组件在窗口中的排列方式：</p>\n<ul>\n  <li><strong>FlowLayout</strong>：从左到右排列</li>\n  <li><strong>BorderLayout</strong>：上下左右中五个区域</li>\n  <li><strong>GridLayout</strong>：网格排列</li>\n</ul>\n\n",
    "analogy": "🖼️ Swing 与 GUI 就像是“用积木拼装出来的精美桌面窗口”：通过各种布局管理器 and 事件监听器（Listener），能让静态的积木和用户互动起来。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"抽象类与接口\");\n    }\n}",
    "vocabList": [
      {
        "term": "GUI",
        "zh": "图形用户界面",
        "desc": "ウィンドウやボタンなどのグラフィカルな部品を使ったユーザインタフェース。"
      },
      {
        "term": "レイアウトマネージャ",
        "zh": "布局管理器",
        "desc": "コンポーネントの配置方法を管理するクラス（FlowLayout, BorderLayout など）。"
      }
    ],
    "quizList": [
      {
        "question": "JFrameとは何ですか？",
        "questionZh": "JFrame是什么？",
        "options": [
          "ボタンコンポーネント",
          "アプリケーションのウィンドウフレーム",
          "テキスト入力フィールド",
          "レイアウトマネージャ"
        ],
        "answerIdx": 1,
        "hint": "GUIアプリの「箱」の役割をします / 是GUI应用程序的「窗口容器」。"
      },
      {
        "question": "BorderLayoutが分割する領域の数は？",
        "questionZh": "BorderLayout将窗口分为多少个区域？",
        "options": [
          "3",
          "4",
          "5",
          "9"
        ],
        "answerIdx": 2,
        "hint": "North, South, East, West, Center の5エリアです / 分为North, South, East, West, Center共5个区域。"
      },
      {
        "question": "ボタンクリックのイベントを処理するインタフェースは？",
        "questionZh": "处理按钮点击事件的接口是什么？",
        "options": [
          "ClickListener",
          "ActionListener",
          "MouseListener",
          "EventHandler"
        ],
        "answerIdx": 1,
        "hint": "addActionListener()メソッドで登録します / 通过addActionListener()方法注册。"
      }
    ],
    "pdfPage": 135,
    "pdfHighlightTerm": "レイアウトマネージャ",
    "originalChapterId": "jissen-8"
  },
  {
    "id": 96,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 8,
    "chapterName": "実践編 第8章 GUIアプリケーション",
    "subSectionId": "8-4",
    "subSectionName": "8-4 イベント処理",
    "section": "実践編 実践編 第8章 GUIアプリケーション",
    "titleJa": "イベント処理",
    "titleZh": "事件处理（Event Handling）",
    "conceptJa": "<h3>イベント処理</h3>\n<p>ボタンクリックなどのイベントに応答するための仕組みです。</p>\n<pre><code>JButton btn = new JButton(\"クリック\");\nbtn.addActionListener(e -> {\n    System.out.println(\"ボタンが押されました！\");\n});</code></pre>\n\n",
    "conceptZh": "<h3>事件处理（Event Handling）</h3>\n<p>用<code>ActionListener</code>监听按钮点击等用户操作，通过Lambda表达式简化代码：</p>\n<pre><code>button.addActionListener(e -> {\n    System.out.println(\"按钮被点击了！\");\n});</code></pre>\n\n",
    "analogy": "🖼️ Swing 与 GUI 就像是“用积木拼装出来的精美桌面窗口”：通过各种布局管理器 and 事件监听器（Listener），能让静态的积木和用户互动起来。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"抽象类与接口\");\n    }\n}",
    "vocabList": [
      {
        "term": "GUI",
        "zh": "图形用户界面",
        "desc": "ウィンドウやボタンなどのグラフィカルな部品を使ったユーザインタフェース。"
      },
      {
        "term": "イベント (event)",
        "zh": "事件",
        "desc": "ボタンクリックやキー入力など、ユーザの操作によって発生するもの。"
      }
    ],
    "quizList": [
      {
        "question": "ボタンクリックのイベントを処理するインタフェースは？",
        "questionZh": "处理按钮点击事件的接口是什么？",
        "options": [
          "ClickListener",
          "ActionListener",
          "MouseListener",
          "EventHandler"
        ],
        "answerIdx": 1,
        "hint": "addActionListener()メソッドで登録します / 通过addActionListener()方法注册。"
      }
    ],
    "pdfPage": 140,
    "pdfHighlightTerm": "イベント処理",
    "originalChapterId": "jissen-8"
  },
  {
    "id": 97,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 8,
    "chapterName": "実践編 第8章 GUIアプリケーション",
    "subSectionId": "8-5",
    "subSectionName": "8-5 注意",
    "section": "実践編 実践編 第8章 GUIアプリケーション",
    "titleJa": "注意",
    "titleZh": "注意",
    "conceptJa": "<h3>注意</h3>\n<p>GUIプログラムはSwingウィンドウを必要とするため、このサンドボックスでは表示できません。ローカルのIDEで実行してください。</p>",
    "conceptZh": "<h3>注意</h3>\n<p>注意是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.141）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🖼️ Swing 与 GUI 就像是“用积木拼装出来的精美桌面窗口”：通过各种布局管理器 and 事件监听器（Listener），能让静态的积木和用户互动起来。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"抽象类与接口\");\n    }\n}",
    "vocabList": [
      {
        "term": "GUI",
        "zh": "图形用户界面",
        "desc": "ウィンドウやボタンなどのグラフィカルな部品を使ったユーザインタフェース。"
      }
    ],
    "quizList": [
      {
        "question": "JFrameとは何ですか？",
        "questionZh": "JFrame是什么？",
        "options": [
          "ボタンコンポーネント",
          "アプリケーションのウィンドウフレーム",
          "テキスト入力フィールド",
          "レイアウトマネージャ"
        ],
        "answerIdx": 1,
        "hint": "GUIアプリの「箱」の役割をします / 是GUI应用程序的「窗口容器」。"
      },
      {
        "question": "BorderLayoutが分割する領域の数は？",
        "questionZh": "BorderLayout将窗口分为多少个区域？",
        "options": [
          "3",
          "4",
          "5",
          "9"
        ],
        "answerIdx": 2,
        "hint": "North, South, East, West, Center の5エリアです / 分为North, South, East, West, Center共5个区域。"
      },
      {
        "question": "ボタンクリックのイベントを処理するインタフェースは？",
        "questionZh": "处理按钮点击事件的接口是什么？",
        "options": [
          "ClickListener",
          "ActionListener",
          "MouseListener",
          "EventHandler"
        ],
        "answerIdx": 1,
        "hint": "addActionListener()メソッドで登録します / 通过addActionListener()方法注册。"
      }
    ],
    "pdfPage": 141,
    "pdfHighlightTerm": "注意",
    "originalChapterId": "jissen-8"
  },
  {
    "id": 98,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 8,
    "chapterName": "実践編 第8章 GUIアプリケーション",
    "subSectionId": "8-E",
    "subSectionName": "8-E 演習問題 (课后练习)",
    "section": "実践編 実践編 第8章 GUIアプリケーション",
    "titleJa": "演習：第8章の課題",
    "titleZh": "练习：第8章的课后练习",
    "conceptJa": "<h3>第8章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>SwingなどのGUIに関する知識のまとめ。今回は、JavaでGUIを構築する際の主なコンポーネント（JFrame, JButton）を生成して基本設定するコードを作成してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第8章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>基于 Java Swing 基础，编写一段创建 JFrame 窗口、并在窗体中添加一个 JButton 按钮的完整 Java 类初始化与布局设置代码。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第8章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第8章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 142,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "jissen-8"
  },
  {
    "id": 99,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 9,
    "chapterName": "実践編 第9章 図形描画とマウスイベント",
    "subSectionId": "9-1",
    "subSectionName": "9-1 Javaの描画の仕組み",
    "section": "実践編 実践編 第9章 図形描画とマウスイベント",
    "titleJa": "Javaの描画の仕組み",
    "titleZh": "Java绘图机制",
    "conceptJa": "<h3>Javaの描画の仕組み</h3>\n<p>SwingのJPanelを拡張して<code>paintComponent(Graphics g)</code>をオーバーライドすることで描画を行います。</p>\n<pre><code>class DrawPanel extends JPanel {\n    @Override\n    protected void paintComponent(Graphics g) {\n        super.paintComponent(g);\n        g.setColor(Color.RED);\n        g.fillRect(50, 50, 100, 80);  // 塗りつぶし四角形\n        g.drawOval(200, 50, 80, 80);  // 楕円（枠のみ）\n        g.drawLine(0, 0, 300, 300);   // 直線\n    }\n}</code></pre>\n\n",
    "conceptZh": "<h3>Java绘图机制</h3>\n<p>Java绘图机制是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.142）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🎨 绘图与鼠标事件就像是“在数字画布上的尽情作画”：拿到 Graphics2D 神笔，利用左上角坐标系统和鼠标移动传感器，可以写出极其生动的小游戏。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Runner 沙盒准备就绪！\");\n    }\n}",
    "vocabList": [
      {
        "term": "paintComponent",
        "zh": "绘图方法",
        "desc": "JPanel を継承して描画するためにオーバーライドするメソッド。"
      },
      {
        "term": "Graphics2D",
        "zh": "2D图形对象",
        "desc": "Graphicsの拡張版。より高機能な描画ができる。"
      },
      {
        "term": "MouseListener",
        "zh": "鼠标监听器",
        "desc": "マウスイベント（クリック、移動など）を処理するインタフェース。"
      }
    ],
    "quizList": [
      {
        "question": "Java Swingで描画を行うために override するメソッドは？",
        "questionZh": "在Java Swing中，用于绘图需要覆盖的方法是？",
        "options": [
          "draw()",
          "paintComponent(Graphics g)",
          "render()",
          "display()"
        ],
        "answerIdx": 1,
        "hint": "JPanelを継承したクラスでこのメソッドをオーバーライドします / 在继承JPanel的类中覆盖此方法。"
      },
      {
        "question": "Javaの画面座標で、Y軸の正方向はどちらですか？",
        "questionZh": "Java屏幕坐标中，Y轴正方向是哪里？",
        "options": [
          "上向き",
          "下向き",
          "右向き",
          "左向き"
        ],
        "answerIdx": 1,
        "hint": "左上が原点(0,0)で、Y軸は下方向が正です（数学とは逆！）/ 左上为原点，Y轴向下为正（与数学坐标系相反！）"
      },
      {
        "question": "g.fillRect(10, 20, 100, 50) で塗りつぶされる形状は？",
        "questionZh": "g.fillRect(10, 20, 100, 50) 填充的是什么形状？",
        "options": [
          "円",
          "三角形",
          "四角形（幅100、高さ50）",
          "直線"
        ],
        "answerIdx": 2,
        "hint": "fillRect(x, y, 幅, 高さ) / fillRect(x, y, 宽度, 高度)"
      }
    ],
    "pdfPage": 142,
    "pdfHighlightTerm": "Javaの描画の仕組み",
    "originalChapterId": "jissen-9"
  },
  {
    "id": 100,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 9,
    "chapterName": "実践編 第9章 図形描画とマウスイベント",
    "subSectionId": "9-2",
    "subSectionName": "9-2 Graphics2Dクラス",
    "section": "実践編 実践編 第9章 図形描画とマウスイベント",
    "titleJa": "Graphics2Dクラス",
    "titleZh": "常用绘图方法",
    "conceptJa": "<h3>Graphics2Dクラス</h3>\n<p>GraphicsをキャストしてGraphics2Dにすることで、より多彩な描画が可能：</p>\n<pre><code>Graphics2D g2 = (Graphics2D) g;\ng2.setStroke(new BasicStroke(3));  // 線の太さ\ng2.setRenderingHint(RenderingHints.KEY_ANTIALIASING,\n                    RenderingHints.VALUE_ANTIALIAS_ON);  // アンチエイリアス</code></pre>\n\n",
    "conceptZh": "<h3>常用绘图方法</h3>\n<table border=\"1\" style=\"border-collapse:collapse;width:100%\">\n<tr><th>方法</th><th>说明</th></tr>\n<tr><td>drawLine(x1,y1,x2,y2)</td><td>画直线</td></tr>\n<tr><td>drawRect(x,y,w,h)</td><td>画矩形边框</td></tr>\n<tr><td>fillRect(x,y,w,h)</td><td>填充矩形</td></tr>\n<tr><td>drawOval(x,y,w,h)</td><td>画椭圆边框</td></tr>\n<tr><td>fillOval(x,y,w,h)</td><td>填充椭圆</td></tr>\n<tr><td>drawString(s,x,y)</td><td>在(x,y)画文字</td></tr>\n</table>\n\n",
    "analogy": "🎨 绘图与鼠标事件就像是“在数字画布上的尽情作画”：拿到 Graphics2D 神笔，利用左上角坐标系统和鼠标移动传感器，可以写出极其生动的小游戏。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Runner 沙盒准备就绪！\");\n    }\n}",
    "vocabList": [
      {
        "term": "paintComponent",
        "zh": "绘图方法",
        "desc": "JPanel を継承して描画するためにオーバーライドするメソッド。"
      },
      {
        "term": "Graphics2D",
        "zh": "2D图形对象",
        "desc": "Graphicsの拡張版。より高機能な描画ができる。"
      },
      {
        "term": "MouseListener",
        "zh": "鼠标监听器",
        "desc": "マウスイベント（クリック、移動など）を処理するインタフェース。"
      }
    ],
    "quizList": [
      {
        "question": "Java Swingで描画を行うために override するメソッドは？",
        "questionZh": "在Java Swing中，用于绘图需要覆盖的方法是？",
        "options": [
          "draw()",
          "paintComponent(Graphics g)",
          "render()",
          "display()"
        ],
        "answerIdx": 1,
        "hint": "JPanelを継承したクラスでこのメソッドをオーバーライドします / 在继承JPanel的类中覆盖此方法。"
      },
      {
        "question": "Javaの画面座標で、Y軸の正方向はどちらですか？",
        "questionZh": "Java屏幕坐标中，Y轴正方向是哪里？",
        "options": [
          "上向き",
          "下向き",
          "右向き",
          "左向き"
        ],
        "answerIdx": 1,
        "hint": "左上が原点(0,0)で、Y軸は下方向が正です（数学とは逆！）/ 左上为原点，Y轴向下为正（与数学坐标系相反！）"
      },
      {
        "question": "g.fillRect(10, 20, 100, 50) で塗りつぶされる形状は？",
        "questionZh": "g.fillRect(10, 20, 100, 50) 填充的是什么形状？",
        "options": [
          "円",
          "三角形",
          "四角形（幅100、高さ50）",
          "直線"
        ],
        "answerIdx": 2,
        "hint": "fillRect(x, y, 幅, 高さ) / fillRect(x, y, 宽度, 高度)"
      }
    ],
    "pdfPage": 153,
    "pdfHighlightTerm": "Graphics2Dクラス",
    "originalChapterId": "jissen-9"
  },
  {
    "id": 101,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 9,
    "chapterName": "実践編 第9章 図形描画とマウスイベント",
    "subSectionId": "9-3",
    "subSectionName": "9-3 座標系",
    "section": "実践編 実践編 第9章 図形描画とマウスイベント",
    "titleJa": "座標系",
    "titleZh": "坐标系",
    "conceptJa": "<h3>座標系</h3>\n<p>左上が(0,0)で、右がX軸正方向、下がY軸正方向です。</p>\n\n",
    "conceptZh": "<h3>坐标系</h3>\n<p>坐标系是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.150）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🎨 绘图与鼠标事件就像是“在数字画布上的尽情作画”：拿到 Graphics2D 神笔，利用左上角坐标系统和鼠标移动传感器，可以写出极其生动的小游戏。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Runner 沙盒准备就绪！\");\n    }\n}",
    "vocabList": [
      {
        "term": "paintComponent",
        "zh": "绘图方法",
        "desc": "JPanel を継承して描画するためにオーバーライドするメソッド。"
      },
      {
        "term": "MouseListener",
        "zh": "鼠标监听器",
        "desc": "マウスイベント（クリック、移動など）を処理するインタフェース。"
      }
    ],
    "quizList": [
      {
        "question": "Java Swingで描画を行うために override するメソッドは？",
        "questionZh": "在Java Swing中，用于绘图需要覆盖的方法是？",
        "options": [
          "draw()",
          "paintComponent(Graphics g)",
          "render()",
          "display()"
        ],
        "answerIdx": 1,
        "hint": "JPanelを継承したクラスでこのメソッドをオーバーライドします / 在继承JPanel的类中覆盖此方法。"
      },
      {
        "question": "Javaの画面座標で、Y軸の正方向はどちらですか？",
        "questionZh": "Java屏幕坐标中，Y轴正方向是哪里？",
        "options": [
          "上向き",
          "下向き",
          "右向き",
          "左向き"
        ],
        "answerIdx": 1,
        "hint": "左上が原点(0,0)で、Y軸は下方向が正です（数学とは逆！）/ 左上为原点，Y轴向下为正（与数学坐标系相反！）"
      },
      {
        "question": "g.fillRect(10, 20, 100, 50) で塗りつぶされる形状は？",
        "questionZh": "g.fillRect(10, 20, 100, 50) 填充的是什么形状？",
        "options": [
          "円",
          "三角形",
          "四角形（幅100、高さ50）",
          "直線"
        ],
        "answerIdx": 2,
        "hint": "fillRect(x, y, 幅, 高さ) / fillRect(x, y, 宽度, 高度)"
      }
    ],
    "pdfPage": 150,
    "pdfHighlightTerm": "座標系",
    "originalChapterId": "jissen-9"
  },
  {
    "id": 102,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 9,
    "chapterName": "実践編 第9章 図形描画とマウスイベント",
    "subSectionId": "9-4",
    "subSectionName": "9-4 マウスイベント",
    "section": "実践編 実践編 第9章 図形描画とマウスイベント",
    "titleJa": "マウスイベント",
    "titleZh": "鼠标事件（MouseListener）",
    "conceptJa": "<h3>マウスイベント</h3>\n<p><code>MouseListener</code>インタフェースで5つのイベントを処理できます：</p>\n<ul>\n  <li><code>mouseClicked</code>：クリック</li>\n  <li><code>mousePressed</code>：ボタンを押した</li>\n  <li><code>mouseReleased</code>：ボタンを離した</li>\n  <li><code>mouseEntered</code>：コンポーネントにマウスが入った</li>\n  <li><code>mouseExited</code>：コンポーネントからマウスが出た</li>\n</ul>\n\n",
    "conceptZh": "<h3>鼠标事件（MouseListener）</h3>\n<p>鼠标事件（MouseListener）是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.154）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🎨 绘图与鼠标事件就像是“在数字画布上的尽情作画”：拿到 Graphics2D 神笔，利用左上角坐标系统和鼠标移动传感器，可以写出极其生动的小游戏。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Runner 沙盒准备就绪！\");\n    }\n}",
    "vocabList": [
      {
        "term": "paintComponent",
        "zh": "绘图方法",
        "desc": "JPanel を継承して描画するためにオーバーライドするメソッド。"
      },
      {
        "term": "MouseListener",
        "zh": "鼠标监听器",
        "desc": "マウスイベント（クリック、移動など）を処理するインタフェース。"
      }
    ],
    "quizList": [
      {
        "question": "Java Swingで描画を行うために override するメソッドは？",
        "questionZh": "在Java Swing中，用于绘图需要覆盖的方法是？",
        "options": [
          "draw()",
          "paintComponent(Graphics g)",
          "render()",
          "display()"
        ],
        "answerIdx": 1,
        "hint": "JPanelを継承したクラスでこのメソッドをオーバーライドします / 在继承JPanel的类中覆盖此方法。"
      },
      {
        "question": "Javaの画面座標で、Y軸の正方向はどちらですか？",
        "questionZh": "Java屏幕坐标中，Y轴正方向是哪里？",
        "options": [
          "上向き",
          "下向き",
          "右向き",
          "左向き"
        ],
        "answerIdx": 1,
        "hint": "左上が原点(0,0)で、Y軸は下方向が正です（数学とは逆！）/ 左上为原点，Y轴向下为正（与数学坐标系相反！）"
      },
      {
        "question": "g.fillRect(10, 20, 100, 50) で塗りつぶされる形状は？",
        "questionZh": "g.fillRect(10, 20, 100, 50) 填充的是什么形状？",
        "options": [
          "円",
          "三角形",
          "四角形（幅100、高さ50）",
          "直線"
        ],
        "answerIdx": 2,
        "hint": "fillRect(x, y, 幅, 高さ) / fillRect(x, y, 宽度, 高度)"
      }
    ],
    "pdfPage": 154,
    "pdfHighlightTerm": "マウスイベント",
    "originalChapterId": "jissen-9"
  },
  {
    "id": 103,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 9,
    "chapterName": "実践編 第9章 図形描画とマウスイベント",
    "subSectionId": "9-5",
    "subSectionName": "9-5 注意",
    "section": "実践編 実践編 第9章 図形描画とマウスイベント",
    "titleJa": "注意",
    "titleZh": "注意",
    "conceptJa": "<h3>注意</h3>\n<p>描画プログラムはGUIウィンドウが必要なため、このサンドボックスでは直接実行できません。ローカルIDEをご利用ください。</p>",
    "conceptZh": "<h3>注意</h3>\n<p>注意是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.155）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "🎨 绘图与鼠标事件就像是“在数字画布上的尽情作画”：拿到 Graphics2D 神笔，利用左上角坐标系统和鼠标移动传感器，可以写出极其生动的小游戏。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Runner 沙盒准备就绪！\");\n    }\n}",
    "vocabList": [
      {
        "term": "paintComponent",
        "zh": "绘图方法",
        "desc": "JPanel を継承して描画するためにオーバーライドするメソッド。"
      },
      {
        "term": "MouseListener",
        "zh": "鼠标监听器",
        "desc": "マウスイベント（クリック、移動など）を処理するインタフェース。"
      }
    ],
    "quizList": [
      {
        "question": "Java Swingで描画を行うために override するメソッドは？",
        "questionZh": "在Java Swing中，用于绘图需要覆盖的方法是？",
        "options": [
          "draw()",
          "paintComponent(Graphics g)",
          "render()",
          "display()"
        ],
        "answerIdx": 1,
        "hint": "JPanelを継承したクラスでこのメソッドをオーバーライドします / 在继承JPanel的类中覆盖此方法。"
      },
      {
        "question": "Javaの画面座標で、Y軸の正方向はどちらですか？",
        "questionZh": "Java屏幕坐标中，Y轴正方向是哪里？",
        "options": [
          "上向き",
          "下向き",
          "右向き",
          "左向き"
        ],
        "answerIdx": 1,
        "hint": "左上が原点(0,0)で、Y軸は下方向が正です（数学とは逆！）/ 左上为原点，Y轴向下为正（与数学坐标系相反！）"
      },
      {
        "question": "g.fillRect(10, 20, 100, 50) で塗りつぶされる形状は？",
        "questionZh": "g.fillRect(10, 20, 100, 50) 填充的是什么形状？",
        "options": [
          "円",
          "三角形",
          "四角形（幅100、高さ50）",
          "直線"
        ],
        "answerIdx": 2,
        "hint": "fillRect(x, y, 幅, 高さ) / fillRect(x, y, 宽度, 高度)"
      }
    ],
    "pdfPage": 155,
    "pdfHighlightTerm": "注意",
    "originalChapterId": "jissen-9"
  },
  {
    "id": 104,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 9,
    "chapterName": "実践編 第9章 図形描画とマウスイベント",
    "subSectionId": "9-E",
    "subSectionName": "9-E 演習問題 (课后练习)",
    "section": "実践編 実践編 第9章 図形描画とマウスイベント",
    "titleJa": "演習：第9章の課題",
    "titleZh": "练习：第9章的课后练习",
    "conceptJa": "<h3>第9章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>Graphics2Dクラスを使用して、画面の(50, 50)から幅200、高さ100の長方形を描画するメソッドの枠組みを実装してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第9章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>模拟 Java 2D 绘图。使用 Graphics 对象的 drawRect 方法，在窗口坐标为 (50, 50) 的位置画一个宽 200、高 100 的矩形。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第9章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第9章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 156,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "jissen-9"
  },
  {
    "id": 105,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 10,
    "chapterName": "実践編 第10章 ネットワーク",
    "subSectionId": "10-1",
    "subSectionName": "10-1 Javaのネットワークプログラミング",
    "section": "実践編 実践編 第10章 ネットワーク",
    "titleJa": "Javaのネットワークプログラミング",
    "titleZh": "Java网络编程",
    "conceptJa": "<h3>Javaのネットワークプログラミング</h3>\n<p><code>java.net</code>パッケージを使ってTCP/IP通信を実装できます。</p>\n\n",
    "conceptZh": "<h3>Java网络编程</h3>\n<p>Java网络编程是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.162）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "📞 网络编程与 Socket 就像是“在两台天南海北的电话机之间接通直连电话”：客户端主动呼叫，服务端阻塞等待，接通后通过管道进行数据收发。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Runner 沙盒准备就绪！\");\n    }\n}",
    "vocabList": [
      {
        "term": "Socket",
        "zh": "套接字",
        "desc": "ネットワーク通信の端点。SocketはクライアントとサーバーのTCP接続を表す。"
      },
      {
        "term": "ServerSocket",
        "zh": "服务器套接字",
        "desc": "クライアントからの接続を待ち受けるサーバー側のクラス。"
      },
      {
        "term": "TCP",
        "zh": "传输控制协议",
        "desc": "信頼性の高い通信プロトコル。データの到達順序と完全性を保証する。"
      }
    ],
    "quizList": [
      {
        "question": "ServerSocket.accept()の役割は何ですか？",
        "questionZh": "ServerSocket.accept()的作用是什么？",
        "options": [
          "サーバーを終了する",
          "クライアントからの接続を待ち、Socket を返す",
          "データを送信する",
          "ポートを変更する"
        ],
        "answerIdx": 1,
        "hint": "クライアントが接続するまでブロックして待ちます / 阻塞等待直到客户端连接，然后返回Socket。"
      },
      {
        "question": "TCPとUDPの違いについて正しいものは？",
        "questionZh": "关于TCP和UDP的区别，哪项正确？",
        "options": [
          "TCPは高速だが信頼性が低い",
          "TCPは信頼性が高く、UDPは高速だが信頼性が低い",
          "TCPとUDPに性能差はない",
          "UDPはWebで広く使われる"
        ],
        "answerIdx": 1,
        "hint": "TCPは順番通りにデータが届くことを保証します / TCP保证数据按顺序可靠到达。"
      }
    ],
    "pdfPage": 162,
    "pdfHighlightTerm": "Javaのネットワークプログラミング",
    "originalChapterId": "jissen-10"
  },
  {
    "id": 106,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 10,
    "chapterName": "実践編 第10章 ネットワーク",
    "subSectionId": "10-2",
    "subSectionName": "10-2 基本概念",
    "section": "実践編 実践編 第10章 ネットワーク",
    "titleJa": "基本概念",
    "titleZh": "基本概念",
    "conceptJa": "<h3>基本概念</h3>\n<ul>\n  <li><strong>IPアドレス</strong>：ネットワーク上のコンピュータの住所</li>\n  <li><strong>ポート番号</strong>：同じコンピュータ内でアプリを識別する番号（0〜65535）</li>\n  <li><strong>TCP</strong>：信頼性の高い通信プロトコル（データの到達を保証）</li>\n</ul>\n\n",
    "conceptZh": "<h3>基本概念</h3>\n<p>基本概念是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.163）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "📞 网络编程与 Socket 就像是“在两台天南海北的电话机之间接通直连电话”：客户端主动呼叫，服务端阻塞等待，接通后通过管道进行数据收发。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Runner 沙盒准备就绪！\");\n    }\n}",
    "vocabList": [
      {
        "term": "Socket",
        "zh": "套接字",
        "desc": "ネットワーク通信の端点。SocketはクライアントとサーバーのTCP接続を表す。"
      },
      {
        "term": "ServerSocket",
        "zh": "服务器套接字",
        "desc": "クライアントからの接続を待ち受けるサーバー側のクラス。"
      },
      {
        "term": "ポート番号 (port)",
        "zh": "端口号",
        "desc": "同一コンピュータ内でアプリケーションを識別する番号（0〜65535）。"
      },
      {
        "term": "TCP",
        "zh": "传输控制协议",
        "desc": "信頼性の高い通信プロトコル。データの到達順序と完全性を保証する。"
      }
    ],
    "quizList": [
      {
        "question": "ServerSocket.accept()の役割は何ですか？",
        "questionZh": "ServerSocket.accept()的作用是什么？",
        "options": [
          "サーバーを終了する",
          "クライアントからの接続を待ち、Socket を返す",
          "データを送信する",
          "ポートを変更する"
        ],
        "answerIdx": 1,
        "hint": "クライアントが接続するまでブロックして待ちます / 阻塞等待直到客户端连接，然后返回Socket。"
      },
      {
        "question": "TCPとUDPの違いについて正しいものは？",
        "questionZh": "关于TCP和UDP的区别，哪项正确？",
        "options": [
          "TCPは高速だが信頼性が低い",
          "TCPは信頼性が高く、UDPは高速だが信頼性が低い",
          "TCPとUDPに性能差はない",
          "UDPはWebで広く使われる"
        ],
        "answerIdx": 1,
        "hint": "TCPは順番通りにデータが届くことを保証します / TCP保证数据按顺序可靠到达。"
      }
    ],
    "pdfPage": 163,
    "pdfHighlightTerm": "基本概念",
    "originalChapterId": "jissen-10"
  },
  {
    "id": 107,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 10,
    "chapterName": "実践編 第10章 ネットワーク",
    "subSectionId": "10-3",
    "subSectionName": "10-3 サーバー側",
    "section": "実践編 実践編 第10章 ネットワーク",
    "titleJa": "サーバー側",
    "titleZh": "服务器端",
    "conceptJa": "<h3>サーバー側</h3>\n<pre><code>ServerSocket serverSocket = new ServerSocket(8080);\nSocket socket = serverSocket.accept();  // クライアントの接続を待つ\n\n// データの受信\nBufferedReader in = new BufferedReader(\n    new InputStreamReader(socket.getInputStream()));\nString message = in.readLine();\n\n// データの送信\nPrintWriter out = new PrintWriter(socket.getOutputStream(), true);\nout.println(\"こんにちは！\");</code></pre>\n\n",
    "conceptZh": "<h3>服务器端</h3>\n<pre><code>ServerSocket serverSocket = new ServerSocket(8080);\nSocket socket = serverSocket.accept();  // 等待客户端连接\n\n// 接收数据\nBufferedReader in = new BufferedReader(\n    new InputStreamReader(socket.getInputStream()));\nString message = in.readLine();\n\n// 发送数据\nPrintWriter out = new PrintWriter(socket.getOutputStream(), true);\nout.println(\"你好！\");</code></pre>\n\n",
    "analogy": "📞 网络编程与 Socket 就像是“在两台天南海北的电话机之间接通直连电话”：客户端主动呼叫，服务端阻塞等待，接通后通过管道进行数据收发。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Runner 沙盒准备就绪！\");\n    }\n}",
    "vocabList": [
      {
        "term": "Socket",
        "zh": "套接字",
        "desc": "ネットワーク通信の端点。SocketはクライアントとサーバーのTCP接続を表す。"
      },
      {
        "term": "ServerSocket",
        "zh": "服务器套接字",
        "desc": "クライアントからの接続を待ち受けるサーバー側のクラス。"
      },
      {
        "term": "TCP",
        "zh": "传输控制协议",
        "desc": "信頼性の高い通信プロトコル。データの到達順序と完全性を保証する。"
      }
    ],
    "quizList": [
      {
        "question": "ServerSocket.accept()の役割は何ですか？",
        "questionZh": "ServerSocket.accept()的作用是什么？",
        "options": [
          "サーバーを終了する",
          "クライアントからの接続を待ち、Socket を返す",
          "データを送信する",
          "ポートを変更する"
        ],
        "answerIdx": 1,
        "hint": "クライアントが接続するまでブロックして待ちます / 阻塞等待直到客户端连接，然后返回Socket。"
      },
      {
        "question": "TCPとUDPの違いについて正しいものは？",
        "questionZh": "关于TCP和UDP的区别，哪项正确？",
        "options": [
          "TCPは高速だが信頼性が低い",
          "TCPは信頼性が高く、UDPは高速だが信頼性が低い",
          "TCPとUDPに性能差はない",
          "UDPはWebで広く使われる"
        ],
        "answerIdx": 1,
        "hint": "TCPは順番通りにデータが届くことを保証します / TCP保证数据按顺序可靠到达。"
      }
    ],
    "pdfPage": 161,
    "pdfHighlightTerm": "サーバー側",
    "originalChapterId": "jissen-10"
  },
  {
    "id": 108,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 10,
    "chapterName": "実践編 第10章 ネットワーク",
    "subSectionId": "10-4",
    "subSectionName": "10-4 クライアント側",
    "section": "実践編 実践編 第10章 ネットワーク",
    "titleJa": "クライアント側",
    "titleZh": "客户端",
    "conceptJa": "<h3>クライアント側</h3>\n<pre><code>Socket socket = new Socket(\"localhost\", 8080);  // サーバーに接続\n\nPrintWriter out = new PrintWriter(socket.getOutputStream(), true);\nout.println(\"Hello Server!\");  // 送信\n\nBufferedReader in = new BufferedReader(\n    new InputStreamReader(socket.getInputStream()));\nString response = in.readLine();  // 受信</code></pre>\n\n",
    "conceptZh": "<h3>客户端</h3>\n<pre><code>Socket socket = new Socket(\"localhost\", 8080);  // 连接到服务器\n\nPrintWriter out = new PrintWriter(socket.getOutputStream(), true);\nout.println(\"Hello Server!\");  // 发送\n\nBufferedReader in = new BufferedReader(\n    new InputStreamReader(socket.getInputStream()));\nString response = in.readLine();  // 接收</code></pre>\n\n",
    "analogy": "📞 网络编程与 Socket 就像是“在两台天南海北的电话机之间接通直连电话”：客户端主动呼叫，服务端阻塞等待，接通后通过管道进行数据收发。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Runner 沙盒准备就绪！\");\n    }\n}",
    "vocabList": [
      {
        "term": "Socket",
        "zh": "套接字",
        "desc": "ネットワーク通信の端点。SocketはクライアントとサーバーのTCP接続を表す。"
      },
      {
        "term": "ServerSocket",
        "zh": "服务器套接字",
        "desc": "クライアントからの接続を待ち受けるサーバー側のクラス。"
      },
      {
        "term": "TCP",
        "zh": "传输控制协议",
        "desc": "信頼性の高い通信プロトコル。データの到達順序と完全性を保証する。"
      }
    ],
    "quizList": [
      {
        "question": "ServerSocket.accept()の役割は何ですか？",
        "questionZh": "ServerSocket.accept()的作用是什么？",
        "options": [
          "サーバーを終了する",
          "クライアントからの接続を待ち、Socket を返す",
          "データを送信する",
          "ポートを変更する"
        ],
        "answerIdx": 1,
        "hint": "クライアントが接続するまでブロックして待ちます / 阻塞等待直到客户端连接，然后返回Socket。"
      },
      {
        "question": "TCPとUDPの違いについて正しいものは？",
        "questionZh": "关于TCP和UDP的区别，哪项正确？",
        "options": [
          "TCPは高速だが信頼性が低い",
          "TCPは信頼性が高く、UDPは高速だが信頼性が低い",
          "TCPとUDPに性能差はない",
          "UDPはWebで広く使われる"
        ],
        "answerIdx": 1,
        "hint": "TCPは順番通りにデータが届くことを保証します / TCP保证数据按顺序可靠到达。"
      }
    ],
    "pdfPage": 162,
    "pdfHighlightTerm": "クライアント側",
    "originalChapterId": "jissen-10"
  },
  {
    "id": 109,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 10,
    "chapterName": "実践編 第10章 ネットワーク",
    "subSectionId": "10-5",
    "subSectionName": "10-5 注意",
    "section": "実践編 実践編 第10章 ネットワーク",
    "titleJa": "注意",
    "titleZh": "注意",
    "conceptJa": "<h3>注意</h3>\n<p>ネットワークプログラムはサーバーとクライアントの2つのプログラムが必要です。このサンドボックスでは直接実行できませんが、コード構造を確認できます。</p>",
    "conceptZh": "<h3>注意</h3>\n<p>注意是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>\n<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>\n<p>原书在此页（p.163）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>",
    "analogy": "📞 网络编程与 Socket 就像是“在两台天南海北的电话机之间接通直连电话”：客户端主动呼叫，服务端阻塞等待，接通后通过管道进行数据收发。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Runner 沙盒准备就绪！\");\n    }\n}",
    "vocabList": [
      {
        "term": "Socket",
        "zh": "套接字",
        "desc": "ネットワーク通信の端点。SocketはクライアントとサーバーのTCP接続を表す。"
      },
      {
        "term": "ServerSocket",
        "zh": "服务器套接字",
        "desc": "クライアントからの接続を待ち受けるサーバー側のクラス。"
      },
      {
        "term": "TCP",
        "zh": "传输控制协议",
        "desc": "信頼性の高い通信プロトコル。データの到達順序と完全性を保証する。"
      }
    ],
    "quizList": [
      {
        "question": "ServerSocket.accept()の役割は何ですか？",
        "questionZh": "ServerSocket.accept()的作用是什么？",
        "options": [
          "サーバーを終了する",
          "クライアントからの接続を待ち、Socket を返す",
          "データを送信する",
          "ポートを変更する"
        ],
        "answerIdx": 1,
        "hint": "クライアントが接続するまでブロックして待ちます / 阻塞等待直到客户端连接，然后返回Socket。"
      },
      {
        "question": "TCPとUDPの違いについて正しいものは？",
        "questionZh": "关于TCP和UDP的区别，哪项正确？",
        "options": [
          "TCPは高速だが信頼性が低い",
          "TCPは信頼性が高く、UDPは高速だが信頼性が低い",
          "TCPとUDPに性能差はない",
          "UDPはWebで広く使われる"
        ],
        "answerIdx": 1,
        "hint": "TCPは順番通りにデータが届くことを保証します / TCP保证数据按顺序可靠到达。"
      }
    ],
    "pdfPage": 163,
    "pdfHighlightTerm": "注意",
    "originalChapterId": "jissen-10"
  },
  {
    "id": 110,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 10,
    "chapterName": "実践編 第10章 ネットワーク",
    "subSectionId": "10-E",
    "subSectionName": "10-E 演習問題 (课后练习)",
    "section": "実践編 実践編 第10章 ネットワーク",
    "titleJa": "演習：第10章の課題",
    "titleZh": "练习：第10章的课后练习",
    "conceptJa": "<h3>第10章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>Socket通信を使用して、ローカルホストの特定ポートに対して接続要求を送信するクライアント側のシンプルな接続テストコードを作成してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第10章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>编写一段简易的 Socket 网络通信客户端连接代码，测试尝试连接本机的指定端口，并处理可能发生连接拒绝的异常。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第10章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第10章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 164,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "jissen-10"
  },
  {
    "id": 111,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 11,
    "chapterName": "実践編 第11章 一歩進んだJava",
    "subSectionId": "11-1",
    "subSectionName": "11-1 Stream API（Java 8以降）",
    "section": "実践編 実践編 第11章 一歩進んだJava",
    "titleJa": "Stream API（Java 8以降）",
    "titleZh": "Stream API（Java 8+）",
    "conceptJa": "<h3>Stream API（Java 8以降）</h3>\n<p>コレクションの要素を関数型スタイルで処理する強力な仕組みです。</p>\n<pre><code>import java.util.stream.*;\n\nList&lt;Integer&gt; numbers = Arrays.asList(1,2,3,4,5,6,7,8,9,10);\n\n// 偶数のみフィルタして2倍にして合計\nint result = numbers.stream()\n    .filter(n -> n % 2 == 0)     // 中間操作：フィルタ\n    .map(n -> n * 2)             // 中間操作：変換\n    .reduce(0, Integer::sum);    // 終端操作：集計\nSystem.out.println(result);  // 60</code></pre>\n\n",
    "conceptZh": "<h3>Stream API（Java 8+）</h3>\n<p>对集合元素进行函数式风格处理的强大机制，链式调用多个操作：</p>\n<pre><code>List<Integer> numbers = Arrays.asList(1,2,3,4,5,6,7,8,9,10);\n\n// 筛选偶数，乘以2，求总和\nint result = numbers.stream()\n    .filter(n -> n % 2 == 0)   // 中间操作：过滤\n    .map(n -> n * 2)            // 中间操作：映射\n    .reduce(0, Integer::sum);   // 终端操作：归约\nSystem.out.println(result);  // 60</code></pre>\n\n",
    "analogy": "🥒 Stream API 与枚举注解就像是“全自动的拍黄瓜流水线与商品的防伪说明标签”：让你的集合处理像流水线一样丝滑，让代码更具可读性。",
    "example": "import java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);\n        int sum = numbers.stream()\n                         .filter(n -> n % 2 != 0) // 过滤出奇数\n                         .mapToInt(n -> n * 2)    // 乘以2\n                         .sum();\n        System.out.println(\"流处理奇数乘积和: \" + sum);\n    }\n}",
    "vocabList": [
      {
        "term": "Stream API",
        "zh": "流API",
        "desc": "コレクションをパイプライン方式で処理するJava 8以降の機能。"
      },
      {
        "term": "filter()",
        "zh": "过滤",
        "desc": "Streamで条件に合う要素だけを残す中間操作。"
      },
      {
        "term": "map()",
        "zh": "映射/转换",
        "desc": "Streamで各要素を別の値に変換する中間操作。"
      },
      {
        "term": "enum (enumeration)",
        "zh": "枚举",
        "desc": "決まった選択肢（定数の集合）を表すための型。"
      }
    ],
    "quizList": [
      {
        "question": "Stream の filter() は何をしますか？",
        "questionZh": "Stream的filter()方法做什么？",
        "options": [
          "要素を並び替える",
          "条件に合う要素だけを残す",
          "要素を変換する",
          "要素を削除する"
        ],
        "answerIdx": 1,
        "hint": "filterは「フィルタリング（絞り込み）」です / filter的意思是「筛选/过滤」。"
      }
    ],
    "pdfPage": 164,
    "pdfHighlightTerm": "Stream API（Java 8以降）",
    "originalChapterId": "jissen-11"
  },
  {
    "id": 112,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 11,
    "chapterName": "実践編 第11章 一歩進んだJava",
    "subSectionId": "11-2",
    "subSectionName": "11-2 主なStream操作",
    "section": "実践編 実践編 第11章 一歩進んだJava",
    "titleJa": "主なStream操作",
    "titleZh": "常用Stream操作",
    "conceptJa": "<h3>主なStream操作</h3>\n<table border=\"1\" style=\"border-collapse:collapse;width:100%\">\n<tr><th>種類</th><th>操作</th><th>説明</th></tr>\n<tr><td rowspan=\"3\">中間操作</td><td>filter(predicate)</td><td>条件でフィルタリング</td></tr>\n<tr><td>map(function)</td><td>要素を変換</td></tr>\n<tr><td>sorted()</td><td>並び替え</td></tr>\n<tr><td rowspan=\"3\">終端操作</td><td>collect()</td><td>Listなどに変換</td></tr>\n<tr><td>forEach()</td><td>各要素に処理</td></tr>\n<tr><td>count() / sum()</td><td>集計</td></tr>\n</table>\n\n",
    "conceptZh": "<h3>常用Stream操作</h3>\n<table border=\"1\" style=\"border-collapse:collapse;width:100%\">\n<tr><th>种类</th><th>操作</th><th>说明</th></tr>\n<tr><td rowspan=\"3\">中间操作</td><td>filter(predicate)</td><td>条件过滤</td></tr>\n<tr><td>map(function)</td><td>转换元素</td></tr>\n<tr><td>sorted()</td><td>排序</td></tr>\n<tr><td rowspan=\"3\">终端操作</td><td>collect()</td><td>收集为List等</td></tr>\n<tr><td>forEach()</td><td>对每个元素进行处理</td></tr>\n<tr><td>count() / sum()</td><td>统计/求和</td></tr>\n</table>\n\n",
    "analogy": "🥒 Stream API 与枚举注解就像是“全自动的拍黄瓜流水线与商品的防伪说明标签”：让你的集合处理像流水线一样丝滑，让代码更具可读性。",
    "example": "import java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);\n        int sum = numbers.stream()\n                         .filter(n -> n % 2 != 0) // 过滤出奇数\n                         .mapToInt(n -> n * 2)    // 乘以2\n                         .sum();\n        System.out.println(\"流处理奇数乘积和: \" + sum);\n    }\n}",
    "vocabList": [
      {
        "term": "Stream API",
        "zh": "流API",
        "desc": "コレクションをパイプライン方式で処理するJava 8以降の機能。"
      },
      {
        "term": "filter()",
        "zh": "过滤",
        "desc": "Streamで条件に合う要素だけを残す中間操作。"
      },
      {
        "term": "map()",
        "zh": "映射/转换",
        "desc": "Streamで各要素を別の値に変換する中間操作。"
      },
      {
        "term": "enum (enumeration)",
        "zh": "枚举",
        "desc": "決まった選択肢（定数の集合）を表すための型。"
      }
    ],
    "quizList": [
      {
        "question": "Stream の filter() は何をしますか？",
        "questionZh": "Stream的filter()方法做什么？",
        "options": [
          "要素を並び替える",
          "条件に合う要素だけを残す",
          "要素を変換する",
          "要素を削除する"
        ],
        "answerIdx": 1,
        "hint": "filterは「フィルタリング（絞り込み）」です / filter的意思是「筛选/过滤」。"
      }
    ],
    "pdfPage": 165,
    "pdfHighlightTerm": "主なStream操作",
    "originalChapterId": "jissen-11"
  },
  {
    "id": 113,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 11,
    "chapterName": "実践編 第11章 一歩進んだJava",
    "subSectionId": "11-3",
    "subSectionName": "11-3 アノテーション（Annotation）",
    "section": "実践編 実践編 第11章 一歩進んだJava",
    "titleJa": "アノテーション（Annotation）",
    "titleZh": "注解（Annotation）",
    "conceptJa": "<h3>アノテーション（Annotation）</h3>\n<p>コードにメタデータ（付加情報）を記述する仕組みです。</p>\n<ul>\n  <li><code>@Override</code>：メソッドのオーバーライドを明示</li>\n  <li><code>@Deprecated</code>：非推奨のメソッドを示す</li>\n  <li><code>@SuppressWarnings</code>：警告を抑制</li>\n  <li><code>@FunctionalInterface</code>：関数型インタフェースを明示</li>\n</ul>\n\n",
    "conceptZh": "<h3>注解（Annotation）</h3>\n<p>给代码添加元数据的机制，以<code>@</code>开头：</p>\n<ul>\n  <li><code>@Override</code>：标记覆盖父类方法</li>\n  <li><code>@Deprecated</code>：标记已废弃的方法</li>\n  <li><code>@FunctionalInterface</code>：标记函数式接口</li>\n</ul>\n\n",
    "analogy": "🥒 Stream API 与枚举注解就像是“全自动的拍黄瓜流水线与商品的防伪说明标签”：让你的集合处理像流水线一样丝滑，让代码更具可读性。",
    "example": "public class Main {\n    @Override\n    public String toString() {\n        return \"这是重写了 toString 的注解展示！\";\n    }\n    public static void main(String[] args) {\n        System.out.println(new Main());\n    }\n}",
    "vocabList": [
      {
        "term": "Stream API",
        "zh": "流API",
        "desc": "コレクションをパイプライン方式で処理するJava 8以降の機能。"
      },
      {
        "term": "filter()",
        "zh": "过滤",
        "desc": "Streamで条件に合う要素だけを残す中間操作。"
      },
      {
        "term": "map()",
        "zh": "映射/转换",
        "desc": "Streamで各要素を別の値に変換する中間操作。"
      },
      {
        "term": "アノテーション (annotation)",
        "zh": "注解",
        "desc": "@Overrideのように、コードにメタデータを付加する仕組み。"
      },
      {
        "term": "enum (enumeration)",
        "zh": "枚举",
        "desc": "決まった選択肢（定数の集合）を表すための型。"
      }
    ],
    "quizList": [
      {
        "question": "Stream の filter() は何をしますか？",
        "questionZh": "Stream的filter()方法做什么？",
        "options": [
          "要素を並び替える",
          "条件に合う要素だけを残す",
          "要素を変換する",
          "要素を削除する"
        ],
        "answerIdx": 1,
        "hint": "filterは「フィルタリング（絞り込み）」です / filter的意思是「筛选/过滤」。"
      },
      {
        "question": "@Override アノテーションの目的は？",
        "questionZh": "@Override注解的目的是什么？",
        "options": [
          "新しいメソッドを作る",
          "メソッドのオーバーライドであることをコンパイラに知らせる",
          "メソッドを削除する",
          "メソッドを非公開にする"
        ],
        "answerIdx": 1,
        "hint": "スペルミスなどのバグをコンパイル時に検出できます / 可以在编译时检测拼写错误等bug。"
      }
    ],
    "pdfPage": 176,
    "pdfHighlightTerm": "アノテーション（Annotation）",
    "originalChapterId": "jissen-11"
  },
  {
    "id": 114,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 11,
    "chapterName": "実践編 第11章 一歩進んだJava",
    "subSectionId": "11-4",
    "subSectionName": "11-4 enum（列挙型）",
    "section": "実践編 実践編 第11章 一歩進んだJava",
    "titleJa": "enum（列挙型）",
    "titleZh": "枚举（enum）",
    "conceptJa": "<h3>enum（列挙型）</h3>\n<p>決まった選択肢の値を表すための型です。</p>\n<pre><code>enum Season { SPRING, SUMMER, AUTUMN, WINTER }\nSeason s = Season.SUMMER;\nSystem.out.println(s);  // SUMMER</code></pre>",
    "conceptZh": "<h3>枚举（enum）</h3>\n<p>用于定义一组固定的常量值，比用int更安全易读：</p>\n<pre><code>enum Season { SPRING, SUMMER, AUTUMN, WINTER }\nSeason s = Season.SUMMER;\n// switch语句与enum配合使用\nswitch (s) {\n    case SPRING: System.out.println(\"春\"); break;\n    case SUMMER: System.out.println(\"夏\"); break;\n}</code></pre>",
    "analogy": "🥒 Stream API 与枚举注解就像是“全自动的拍黄瓜流水线与商品的防伪说明标签”：让你的集合处理像流水线一样丝滑，让代码更具可读性。",
    "example": "public class Main {\n    enum Level {\n        LOW, MEDIUM, HIGH\n    }\n    public static void main(String[] args) {\n        Level lvl = Level.MEDIUM;\n        System.out.println(\"当前枚举等级是: \" + lvl);\n    }\n}",
    "vocabList": [
      {
        "term": "Stream API",
        "zh": "流API",
        "desc": "コレクションをパイプライン方式で処理するJava 8以降の機能。"
      },
      {
        "term": "filter()",
        "zh": "过滤",
        "desc": "Streamで条件に合う要素だけを残す中間操作。"
      },
      {
        "term": "map()",
        "zh": "映射/转换",
        "desc": "Streamで各要素を別の値に変換する中間操作。"
      },
      {
        "term": "enum (enumeration)",
        "zh": "枚举",
        "desc": "決まった選択肢（定数の集合）を表すための型。"
      }
    ],
    "quizList": [
      {
        "question": "Stream の filter() は何をしますか？",
        "questionZh": "Stream的filter()方法做什么？",
        "options": [
          "要素を並び替える",
          "条件に合う要素だけを残す",
          "要素を変換する",
          "要素を削除する"
        ],
        "answerIdx": 1,
        "hint": "filterは「フィルタリング（絞り込み）」です / filter的意思是「筛选/过滤」。"
      }
    ],
    "pdfPage": 178,
    "pdfHighlightTerm": "enum（列挙型）",
    "originalChapterId": "jissen-11"
  },
  {
    "id": 115,
    "book": "実践編",
    "bookZh": "实践篇",
    "chapterId": 11,
    "chapterName": "実践編 第11章 一歩進んだJava",
    "subSectionId": "11-E",
    "subSectionName": "11-E 演習問題 (课后练习)",
    "section": "実践編 実践編 第11章 一歩進んだJava",
    "titleJa": "演習：第11章の課題",
    "titleZh": "练习：第11章的课后练习",
    "conceptJa": "<h3>第11章 演習問題</h3>\n<p><b>【演習の課題内容】</b></p>\n<p>Stream APIを使用して、1から10までの整数リストから、偶数のみを抽出し、それらをそれぞれ3倍した値の合計値をワンラインに近い記述で算出してください。</p>\n<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>",
    "conceptZh": "<h3>第11章 课后练习 (编程演练)</h3>\n<p><b>【练习要求】</b></p>\n<p>使用 Java 8 的 Stream API，对 1 到 10 的整数列表进行流式处理：过滤出所有偶数、将它们分别乘以 3、最后计算并输出其累加总和。</p>\n<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>",
    "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
    "example": "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}",
    "vocabList": [
      {
        "term": "演習問題",
        "zh": "课后练习/编程演练",
        "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"
      },
      {
        "term": "サンドボックス",
        "zh": "沙盒环境",
        "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"
      }
    ],
    "quizList": [
      {
        "question": "第11章の演習課題を完成させ、沙箱で正常に実行させましたか？",
        "questionZh": "你已经完成了第11章的课后演习要求，并成功在沙盒中编译运行了吗？",
        "options": [
          "はい、完成しました！ (是的，完成了！)",
          "まだです、もう一度試します (还没有，再试试)"
        ],
        "answerIdx": 0,
        "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
      }
    ],
    "pdfPage": 179,
    "pdfHighlightTerm": "演習",
    "originalChapterId": "jissen-11"
  }
];
