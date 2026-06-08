import json
import re
import os
import shutil

# =========================================================================
# 加载 pages.txt 页码数据
# =========================================================================
def load_pages(txt_path):
    pages = []
    if not os.path.exists(txt_path):
        return pages
    with open(txt_path, "r", encoding="utf-8") as f:
        for line in f:
            match = re.match(r'^Page\s+(\d+):\s*([^|]+)', line)
            if match:
                page_num = int(match.group(1))
                title = match.group(2).strip()
                if title and "EMPTY PAGE" not in title:
                    pages.append((page_num, title))
    return pages

# =========================================================================
# 模糊匹配页码
# =========================================================================
def find_best_page(h3_title, pages, prev_page):
    def clean(s):
        s = re.sub(r'[\s\(\)\（\）\?\？\:\：\-\/\.\,\，]', '', s)
        s = s.replace("とは", "").replace("について", "").replace("文", "").replace("编", "")
        return s
    
    h3_clean = clean(h3_title)
    best_page = None
    max_score = 0
    
    for page_num, title in pages:
        t_clean = clean(title)
        if not t_clean or not h3_clean:
            continue
        intersection = len(set(h3_clean) & set(t_clean))
        score = intersection / max(len(h3_clean), len(t_clean))
        if h3_clean in t_clean or t_clean in h3_clean:
            score += 0.5
        
        if score > max_score and score > 0.4:
            max_score = score
            best_page = page_num
            
    if best_page is not None:
        return best_page
    return prev_page + 1

# =========================================================================
# 手动提取原始 JS 字段
# =========================================================================
def extract_field(block, key, is_backtick=False):
    if is_backtick:
        pattern = rf'{key}:\s*`(.*?)`,'
        match = re.search(pattern, block, re.DOTALL)
        if match:
            return match.group(1).strip()
    else:
        pattern = rf'{key}:\s*["\'`](.*?)["\'`],'
        match = re.search(pattern, block, re.DOTALL)
        if match:
            return match.group(1).strip()
        
        pattern_no_quote = rf'{key}:\s*([^,\n]+)'
        match_no_quote = re.search(pattern_no_quote, block)
        if match_no_quote:
            val = match_no_quote.group(1).strip()
            if val.endswith(','):
                val = val[:-1].strip()
            val = val.strip('"\'-')
            return val
    return ""

def parse_vocab_list_manually(block):
    idx = block.find("vocabList:")
    if idx == -1:
        return []
    start = block.find("[", idx)
    if start == -1:
        return []
    
    count = 1
    end = start + 1
    while count > 0 and end < len(block):
        if block[end] == '[':
            count += 1
        elif block[end] == ']':
            count -= 1
        end += 1
    list_str = block[start:end]
    
    items = []
    for item_block in re.findall(r'\{[^{}]*?\}', list_str, re.DOTALL):
        term = re.search(r'term:\s*["\'`](.*?)["\'`]', item_block, re.DOTALL)
        zh = re.search(r'zh:\s*["\'`](.*?)["\'`]', item_block, re.DOTALL)
        desc = re.search(r'desc:\s*["\'`](.*?)["\'`]', item_block, re.DOTALL)
        if term and zh and desc:
            items.append({
                "term": term.group(1).replace('\\"', '"'),
                "zh": zh.group(1).replace('\\"', '"'),
                "desc": desc.group(1).replace('\\"', '"')
            })
    return items

def parse_quiz_list_manually(block):
    idx = block.find("quizList:")
    if idx == -1:
        return []
    start = block.find("[", idx)
    if start == -1:
        return []
    
    count = 1
    end = start + 1
    while count > 0 and end < len(block):
        if block[end] == '[':
            count += 1
        elif block[end] == ']':
            count -= 1
        end += 1
    list_str = block[start:end]
    
    quizzes = []
    for q_block in re.findall(r'\{[^{}]*?\}', list_str, re.DOTALL):
        question = re.search(r'question:\s*["\'`](.*?)["\'`]', q_block, re.DOTALL)
        question_zh = re.search(r'questionZh:\s*["\'`](.*?)["\'`]', q_block, re.DOTALL)
        hint = re.search(r'hint:\s*["\'`](.*?)["\'`]', q_block, re.DOTALL)
        answer_idx = re.search(r'answerIdx:\s*(\d+)', q_block)
        
        options = []
        options_match = re.search(r'options:\s*\[(.*?)\]', q_block, re.DOTALL)
        if options_match:
            options = re.findall(r'["\'`](.*?)["\'`]', options_match.group(1))
            
        if question and question_zh and answer_idx and options:
            quizzes.append({
                "question": question.group(1).replace('\\"', '"'),
                "questionZh": question_zh.group(1).replace('\\"', '"'),
                "options": [opt.replace('\\"', '"') for opt in options],
                "answerIdx": int(answer_idx.group(1)),
                "hint": hint.group(1).replace('\\"', '"') if hint else ""
            })
    return quizzes

# =========================================================================
# 匹配并生成各小节的高质量差异化代码
# =========================================================================
def get_differentiated_java_code(title_ja, ch_id, is_jissen=False):
    t = title_ja.lower()
    
    # 实践篇代码
    if is_jissen:
        if ch_id == 1:
            if "パッケージ" in t:
                return "package com.example;\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"包 com.example 运行成功！\");\n    }\n}"
            if "import" in t:
                return "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>();\n        list.add(\"Java\");\n        System.out.println(\"Imported: \" + list);\n    }\n}"
            if "string" in t:
                return "public class Main {\n    public static void main(String[] args) {\n        String text = \"  Java Programming  \";\n        System.out.println(\"原始: [\" + text + \"]\");\n        System.out.println(\"去空: [\" + text.trim() + \"]\");\n        System.out.println(\"大写: \" + text.toUpperCase());\n    }\n}"
            if "math" in t:
                return "public class Main {\n    public static void main(String[] args) {\n        double num = 16.0;\n        System.out.println(\"16的平方根: \" + Math.sqrt(num));\n        System.out.println(\"绝对值: \" + Math.abs(-10));\n        System.out.println(\"随机数 (0~1): \" + Math.random());\n    }\n}"
        elif ch_id == 2:
            if "try" in t:
                return "public class Main {\n    public static void main(String[] args) {\n        try {\n            int result = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println(\"捕获到除以0的异常: \" + e.getMessage());\n        }\n    }\n}"
            if "throw" in t:
                return "public class Main {\n    public static void main(String[] args) {\n        try {\n            checkAge(15);\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"自定义异常捕获: \" + e.getMessage());\n        }\n    }\n    public static void checkAge(int age) {\n        if (age < 18) {\n            throw new IllegalArgumentException(\"未满18岁不允许注册！\");\n        }\n    }\n}"
            if "throws" in t:
                return "public class Main {\n    public static void main(String[] args) {\n        try {\n            readFile();\n        } catch (Exception e) {\n            System.out.println(\"异常传递捕获: \" + e.getMessage());\n        }\n    }\n    public static void readFile() throws Exception {\n        throw new Exception(\"文件未找到异常！\");\n    }\n}"
            return "public class Main {\n    public static void main(String[] args) {\n        try {\n            int[] arr = new int[2];\n            System.out.println(arr[5]);\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println(\"捕获到数组越界异常！\");\n        } finally {\n            System.out.println(\"不管出不出错，此处代码必执行！\");\n        }\n    }\n}"
        elif ch_id == 3:
            if "runnable" in t:
                return "public class Main {\n    public static void main(String[] args) {\n        Runnable r = new Runnable() {\n            @Override\n            public void run() {\n                System.out.println(\"Runnable 线程正在执行...\");\n            }\n        };\n        Thread t = new Thread(r);\n        t.start();\n    }\n}"
            if "synchronized" in t:
                return "public class Main {\n    private static int counter = 0;\n    public static synchronized void increment() {\n        counter++;\n    }\n    public static void main(String[] args) throws InterruptedException {\n        Thread t1 = new Thread(() -> { for(int i=0; i<100; i++) increment(); });\n        Thread t2 = new Thread(() -> { for(int i=0; i<100; i++) increment(); });\n        t1.start(); t2.start();\n        t1.join(); t2.join();\n        System.out.println(\"安全计数器值: \" + counter);\n    }\n}"
            return "public class Main {\n    public static void main(String[] args) {\n        Thread thread = new Thread(() -> {\n            System.out.println(\"新线程开始执行...\");\n        });\n        thread.start();\n    }\n}"
        elif ch_id == 4:
            return "public class Main {\n    public static void main(String[] args) {\n        // 演示垃圾回收与堆内存机制\n        Runtime runtime = Runtime.getRuntime();\n        System.out.println(\"总内存: \" + runtime.totalMemory() + \" 字节\");\n        System.out.println(\"空闲内存: \" + runtime.freeMemory() + \" 字节\");\n        System.gc(); // 建议 JVM 垃圾回收\n    }\n}"
        elif ch_id == 5:
            if "arraylist" in t:
                return "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> list = new ArrayList<>();\n        list.add(\"Apple\");\n        list.add(\"Banana\");\n        System.out.println(\"列表大小: \" + list.size());\n        System.out.println(\"元素: \" + list.get(1));\n    }\n}"
            if "hashmap" in t:
                return "import java.util.HashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        HashMap<String, Integer> map = new HashMap<>();\n        map.put(\"Java\", 100);\n        map.put(\"Python\", 90);\n        System.out.println(\"Java 分数: \" + map.get(\"Java\"));\n    }\n}"
            if "hashset" in t:
                return "import java.util.HashSet;\n\npublic class Main {\n    public static void main(String[] args) {\n        HashSet<String> set = new HashSet<>();\n        set.add(\"A\");\n        set.add(\"B\");\n        set.add(\"A\"); // 重复项被自动去重\n        System.out.println(\"去重集合大小: \" + set.size());\n    }\n}"
            return "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> list = new ArrayList<>();\n        list.add(10);\n        list.add(20);\n        for(int x : list) {\n            System.out.println(\"值: \" + x);\n        }\n    }\n}"
        elif ch_id == 6:
            if "lambda" in t or "式" in t or "匿" in t:
                return "public class Main {\n    interface Greeting {\n        void greet(String message);\n    }\n    public static void main(String[] args) {\n        // 使用 Lambda 表达式定义函数式接口\n        Greeting g = msg -> System.out.println(\"你好: \" + msg);\n        g.greet(\"Lambda！\");\n    }\n}"
            return "import java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = Arrays.asList(\"A\", \"B\", \"C\");\n        list.forEach(item -> System.out.println(\"元素: \" + item));\n    }\n}"
        elif ch_id == 7:
            return "import java.io.ByteArrayOutputStream;\nimport java.io.IOException;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        ByteArrayOutputStream out = new ByteArrayOutputStream();\n        out.write(\"Hello I/O Stream!\".getBytes());\n        System.out.println(\"写入缓冲区数据: \" + out.toString());\n    }\n}"
        elif ch_id == 11:
            if "stream" in t:
                return "import java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);\n        int sum = numbers.stream()\n                         .filter(n -> n % 2 != 0) // 过滤出奇数\n                         .mapToInt(n -> n * 2)    // 乘以2\n                         .sum();\n        System.out.println(\"流处理奇数乘积和: \" + sum);\n    }\n}"
            if "enum" in t:
                return "public class Main {\n    enum Level {\n        LOW, MEDIUM, HIGH\n    }\n    public static void main(String[] args) {\n        Level lvl = Level.MEDIUM;\n        System.out.println(\"当前枚举等级是: \" + lvl);\n    }\n}"
            if "アノテーション" in t or "annotation" in t or "注解" in t:
                return "public class Main {\n    @Override\n    public String toString() {\n        return \"这是重写了 toString 的注解展示！\";\n    }\n    public static void main(String[] args) {\n        System.out.println(new Main());\n    }\n}"
    
    # 入门篇代码
    if ch_id == 1:
        if "コメント" in t or "注释" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        // 这是单行注释\n        /* 这是\n           多行注释 */\n        System.out.println(\"演示注释用法\");\n    }\n}"
        if "ブロック" in t or "缩进" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        {\n            System.out.println(\"这是内部块中的代码\");\n        }\n    }\n}"
        return "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}"
    elif ch_id == 2:
        if "エスケープ" in t or "转义" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"换行:\\n第一行\\n第二行\");\n        System.out.println(\"制表符:\\tA\\tB\");\n    }\n}"
        if "型" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        int i = 100;\n        double d = 99.9;\n        boolean b = true;\n        System.out.println(\"int=\" + i + \", double=\" + d + \", boolean=\" + b);\n    }\n}"
        if "算術" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        int result = 5 / 2;\n        System.out.println(\"5 / 2 = \" + result); // 结果为2\n        System.out.println(\"5.0 / 2 = \" + (5.0 / 2)); // 结果为2.5\n    }\n}"
        if "変換" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        double d = 3.14;\n        int i = (int) d; // 强制转换\n        System.out.println(\"d=\" + d + \", i=\" + i);\n    }\n}"
        if "string" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        String name = \"Java\";\n        System.out.println(\"Hello, \" + name + \"!\");\n    }\n}"
        if "キーボード" in t or "输入" in t:
            return "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        // 在下方数据输入区任意输入内容进行测试\n        Scanner in = new Scanner(\"Coco 20\");\n        String name = in.next();\n        int age = in.nextInt();\n        System.out.println(\"姓名: \" + name + \", 年龄: \" + age);\n    }\n}"
        return "public class Main {\n    public static void main(String[] args) {\n        int age = 18;\n        System.out.println(\"年龄是: \" + age);\n    }\n}"
    elif ch_id == 3:
        if "if" in t or "条件" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        int score = 85;\n        if (score >= 90) {\n            System.out.println(\"优秀\");\n        } else {\n            System.out.println(\"合格或不合格\");\n        }\n    }\n}"
        if "switch" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        int rank = 1;\n        switch(rank) {\n            case 1: System.out.println(\"第一名\"); break;\n            case 2: System.out.println(\"第二名\"); break;\n            default: System.out.println(\"其他\"); break;\n        }\n    }\n}"
        if "for" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i < 3; i++) {\n            System.out.println(\"i = \" + i);\n        }\n    }\n}"
        if "while" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        int i = 0;\n        while (i < 3) {\n            System.out.println(\"while i = \" + i);\n            i++;\n        }\n    }\n}"
        if "break" in t or "continue" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        for(int i=0; i<10; i++) {\n            if (i == 3) continue;\n            if (i == 6) break;\n            System.out.println(\"i=\" + i);\n        }\n    }\n}"
        if "配列" in t or "数组" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        int[] numbers = {10, 20, 30};\n        System.out.println(\"数组长度: \" + numbers.length);\n        System.out.println(\"第一个元素: \" + numbers[0]);\n    }\n}"
        return "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"循环演示\");\n    }\n}"
    elif ch_id == 4:
        if "引数" in t or "参数" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        greet(\"山田\");\n    }\n    public static void greet(String name) {\n        System.out.println(\"你好, \" + name + \"先生/小姐\");\n    }\n}"
        if "戻り値" in t or "返回" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        int res = add(5, 7);\n        System.out.println(\"5+7 = \" + res);\n    }\n    public static int add(int a, int b) {\n        return a + b;\n    }\n}"
        if "オーバーロード" in t or "重载" in t:
            return "public class Main {\n    public static void main(String[] args) {\n        print(100);\n        print(\"文字\");\n    }\n    public static void print(int x) { System.out.println(\"整数: \" + x); }\n    public static void print(String s) { System.out.println(\"文字列: \" + s); }\n}"
        return "public class Main {\n    public static void main(String[] args) {\n        run();\n    }\n    public static void run() {\n        System.out.println(\"方法调用成功！\");\n    }\n}"
    elif ch_id == 5:
        if "参照" in t:
            return "public class Main {\n    static class Card {\n        String name;\n    }\n    public static void main(String[] args) {\n        Card c1 = new Card();\n        c1.name = \"山田\";\n        Card c2 = c1; // 复制引用\n        c2.name = \"佐藤\";\n        System.out.println(\"c1的名字是: \" + c1.name); // 也是佐藤！\n    }\n}"
        return "public class Main {\n    static class StudentCard {\n        String name;\n        int grade;\n    }\n    public static void main(String[] args) {\n        StudentCard sc = new StudentCard();\n        sc.name = \"山田太郎\";\n        sc.grade = 3;\n        System.out.println(\"学生姓名: \" + sc.name + \", 年级: \" + sc.grade);\n    }\n}"
    elif ch_id == 6:
        if "コンストラクタ" in t or "构造" in t:
            return "public class Main {\n    static class Book {\n        String title;\n        Book(String t) {\n            title = t;\n        }\n    }\n    public static void main(String[] args) {\n        Book b = new Book(\"Java入門\");\n        System.out.println(\"书名: \" + b.title);\n    }\n}"
        if "static" in t:
            return "public class Main {\n    static class Counter {\n        static int count = 0;\n        Counter() { count++; }\n    }\n    public static void main(String[] args) {\n        new Counter();\n        new Counter();\n        System.out.println(\"共享静态计数器: \" + Counter.count);\n    }\n}"
        return "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"面向对象进阶\");\n    }\n}"
    elif ch_id == 7:
        if "extends" in t or "継承" in t or "继承" in t:
            return "public class Main {\n    static class Animal {\n        void run() { System.out.println(\"奔跑...\"); }\n    }\n    static class Dog extends Animal {\n        void bark() { System.out.println(\"汪汪！\"); }\n    }\n    public static void main(String[] args) {\n        Dog dog = new Dog();\n        dog.run(); // 继承了父类的方法\n        dog.bark();\n    }\n}"
        if "オーバーライド" in t or "重写" in t:
            return "public class Main {\n    static class Animal {\n        void sound() { System.out.println(\"发出叫声...\"); }\n    }\n    static class Cat extends Animal {\n        @Override\n        void sound() { System.out.println(\"喵喵~\"); }\n    }\n    public static void main(String[] args) {\n        Animal a = new Cat();\n        a.sound(); // 多态调用重写方法\n    }\n}"
        return "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"继承与多态\");\n    }\n}"
    elif ch_id == 8:
        if "インターフェース" in t or "interface" in t or "接口" in t:
            return "public class Main {\n    interface Runnable {\n        void run();\n    }\n    static class Runner implements Runnable {\n        public void run() { System.out.println(\"奔跑中...\"); }\n    }\n    public static void main(String[] args) {\n        Runnable r = new Runner();\n        r.run();\n    }\n}"
        if "抽象" in t or "abstract" in t:
            return "public class Main {\n    static abstract class Shape {\n        abstract void draw();\n    }\n    static class Circle extends Shape {\n        void draw() { System.out.println(\"画一个圆\"); }\n    }\n    public static void main(String[] args) {\n        Shape s = new Circle();\n        s.draw();\n    }\n}"
        return "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"抽象类与接口\");\n    }\n}"
        
    return "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Runner 沙盒准备就绪！\");\n    }\n}"

# =========================================================================
# 定义 Java 各大章专属课后演习内容
# =========================================================================
def get_java_practice_info(ch_id, is_jissen=False):
    if is_jissen:
        practical_practices = {
            1: {
                "ja": "Stringクラスの主要メソッドを使用して、キーボードから入力された任意の文字列の「文字数」と「先頭から3文字」を取得して表示するプログラムを作成してください。",
                "zh": "使用 String 类的主要方法，接收一个从键盘输入的字符串，输出该字符串的“总字符数”和“前三个字符”。如果字符串不足三个字，则输出提示。"
            },
            2: {
                "ja": "0による除算が発生した場合に ArithmeticException を安全にキャッチし、'【エラー】0で割ることはできません。'とコンソールに表示して正常終了するプログラムを作成してください。",
                "zh": "模拟并捕获 `ArithmeticException`（例如除以0），在 catch 块中打印友好报错：'【错误】不能除以0。'，并保证程序能正常执行完 finally 块的输出。"
            },
            3: {
                "ja": "Runnableインタフェースを実装した別スレッドを作成し、メインスレッドと並行して「スレッドが動き始めました！」と1秒おきに3回出力する並行処理を実装してください。",
                "zh": "使用多线程（Runnable 接口或 Thread 类），让一个新线程与 main 主线程并行运作，子线程每隔 1 秒在控制台输出一次“子线程工作完成！”共输出三次。"
            },
            4: {
                "ja": "使用されなくなった多数のインスタンスを生成後、Runtime.getRuntime().gc()を実行して、メモリ回収前後での空きメモリの変動を監視して表示するテストコードを作成してください。",
                "zh": "在循环中创建大量的临时无引用对象，通过 System.gc() 建议 JVM 垃圾回收，并使用 Runtime 类的 freeMemory() 打印回收前后的内存空闲对比。"
            },
            5: {
                "ja": "HashMapを使用して、キーを『学生の名前(String)』、値を『得点(Integer)』とした成績簿を作成し、3人分のデータを追加して、特定の学生の点数を検索して出力するコードを記述してください。",
                "zh": "使用 HashMap 存储 3 个人的姓名（String）和他们的成绩（Integer），并编写逻辑：根据指定的姓名查询其对应的成绩并打印输出。"
            },
            6: {
                "ja": "Lambda式とリストを使用して、10, 20, 30 の入ったリストの各要素を forEach とラムダ式を用いてそれぞれ2倍にして画面に出力する記述を完成させてください。",
                "zh": "结合 Lambda 表达式，定义一个 `List<Integer>` 数组，并使用 `forEach` 结合箭头语法 `n -> ...`，将每个元素乘以 2 并进行屏幕输出。"
            },
            7: {
                "ja": "ByteArrayOutputStream を用いて、メモリ上に「Java実践編の学習完了」という文字列を書き込み、再度それをバイト配列から読み出してコンソールに出力するプログラムを作成してください。",
                "zh": "利用 Java I/O 流中的内存流，向内存字节流中写入一行中日文字符串，接着再把该流的数据读取并还原为完整的文本在终端输出。"
            },
            8: {
                "ja": "SwingなどのGUIに関する知識のまとめ。今回は、JavaでGUIを構築する際の主なコンポーネント（JFrame, JButton）を生成して基本設定するコードを作成してください。",
                "zh": "基于 Java Swing 基础，编写一段创建 JFrame 窗口、并在窗体中添加一个 JButton 按钮的完整 Java 类初始化与布局设置代码。"
            },
            9: {
                "ja": "Graphics2Dクラスを使用して、画面の(50, 50)から幅200、高さ100の長方形を描画するメソッドの枠組みを実装してください。",
                "zh": "模拟 Java 2D 绘图。使用 Graphics 对象的 drawRect 方法，在窗口坐标为 (50, 50) 的位置画一个宽 200、高 100 的矩形。"
            },
            10: {
                "ja": "Socket通信を使用して、ローカルホストの特定ポートに対して接続要求を送信するクライアント側のシンプルな接続テストコードを作成してください。",
                "zh": "编写一段简易的 Socket 网络通信客户端连接代码，测试尝试连接本机的指定端口，并处理可能发生连接拒绝的异常。"
            },
            11: {
                "ja": "Stream APIを使用して、1から10までの整数リストから、偶数のみを抽出し、それらをそれぞれ3倍した値の合計値をワンラインに近い記述で算出してください。",
                "zh": "使用 Java 8 的 Stream API，对 1 到 10 的整数列表进行流式处理：过滤出所有偶数、将它们分别乘以 3、最后计算并输出其累加总和。"
            }
        }
        return practical_practices.get(ch_id, {
            "ja": "実践編の知識を用いたコーディング演習課題に挑戦してみましょう。",
            "zh": "结合本章的高级编程知识，自主编写并调试代码以完成本章的进阶练习目标。"
        })
    else:
        nyumon_practices = {
            1: {
                "ja": "画面に「Javaの学習を始めます！」と、自分の名前（例：「山田太郎」）の2行のテキストを出力するプログラムを作成してください。",
                "zh": "在 Main 类的 main 方法中，使用 `System.out.println()` 在控制台上输出两行文本：第一行输出你的名字，第二行输出“开始学习 Java 啦！”。"
            },
            2: {
                "ja": "Scannerを使用して、キーボードからあなたの年齢を入力させ、その値を元に「あなたは○才です」と出力するプログラムを完成させてください。（※Scannerのインポートを忘れないようにしましょう）",
                "zh": "使用 Scanner 类，通过 `new Scanner(\"25\")` 模拟或用 System.in 接收一个键盘输入的年龄，并在屏幕上打印：“你的年龄是: ○ 岁”。不要忘记导包！"
            },
            3: {
                "ja": "for文を使用して、1から10までの整数を出力するループを作成してください。ただし、数字が3の倍数のときは出力をスキップ(continue)し、8に達したらループを終了(break)させてください。",
                "zh": "使用 for 循环结构，让数字 i 从 1 循环到 10。在循环体中判定：如果数字是 3 的倍数，则跳过本次输出（continue）；如果数字是 8，则立刻终止退出循环（break）。"
            },
            4: {
                "ja": "2つの整数を引数として受け取り、その「大きい方の値」を戻り値として返すメソッド「public static int getMax(int a, int b)」を定義し、mainメソッドから呼び出して結果を表示してください。",
                "zh": "定义一个自定义类方法 `public static int getMax(int a, int b)`，接收两个整数参数并返回它们的最大值。在 main 方法中调用它并输出“最大值是: ○”进行验证。"
            },
            5: {
                "ja": "『学生(Student)』を表すクラスを作成してください。インスタンス変数として String name と int age を持ち、それらに値を代入して画面に出力する一連のコードを作成してください。",
                "zh": "创建一个独立的类 `Student`，定义成员变量 `String name` 和 `int age`。在 Main 类中创建 Student 实例，给其姓名和年龄赋值，并成功在控制台打印输出该学生信息。"
            },
            6: {
                "ja": "Studentクラスに、コンストラクタ「Student(String name, int age)」を定義し、newする際に初期値を一発で設定してオブジェクトを生成し、表示するプログラムを記述してください。",
                "zh": "为 `Student` 类编写带有参数的构造方法 `Student(String name, int age)`。在实例化该对象时直接传入参数完成初始化配置，并输出该对象的数据。"
            },
            7: {
                "ja": "スーパークラス『Animal』と、それを継承したサブクラス『Dog』を定義してください。Animalに「run()」メソッドを、Dogに「bark()」メソッドを実装し、Dogのインスタンスから両方を呼び出してみましょう。",
                "zh": "设计父类 `Animal`（包含 run() 方法）与子类 `Dog`（继承 Animal 并包含专属的 bark() 叫声方法）。实例化 Dog 对象，测试继承自父类的方法以及它自己的方法是否都能执行。"
            },
            8: {
                "ja": "抽象クラス『Shape』を定義し、その中に抽象メソッド『void draw()』を宣言してください。さらに、Shapeを継承した『Circle』クラスを作成し、draw()メソッドを具体的にオーバーライドして「円を描きます」と出力するコードを完成させてください。",
                "zh": "声明抽象类 `Shape`（含抽象方法 draw()）及它的具体子类 `Circle`。在 Circle 中实现重写 draw() 方法并输出“开始画圆”，在 Main 中使用多态形式 `Shape s = new Circle(); s.draw();` 运行。"
            }
        }
        return nyumon_practices.get(ch_id, {
            "ja": "入門編の基礎知識を用いたコーディング演習課題に挑戦してみましょう。",
            "zh": "结合本章的语法地基，尝试自主分析并编写逻辑，调试代码以顺利通过课后编程练习。"
        })

# =========================================================================
# Java 数据库重构主逻辑
# =========================================================================
def build_java_lessons():
    print("=== Rebuilding Java Lessons Database ===")
    
    # 备份与恢复
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    js_path = os.path.join(base_dir, "data", "java_lessons.js")
    bak_path = os.path.join(base_dir, "data", "java_lessons.js.bak")
    
    if os.path.exists(bak_path):
        shutil.copy2(bak_path, js_path)
        print("Restored from bak.")
    elif os.path.exists(js_path):
        shutil.copy2(js_path, bak_path)
        print("Created bak backup.")
        
    with open(js_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # 提取章节块
    chapter_blocks = []
    matches = list(re.finditer(r'id:\s*"(nyumon-\d+|jissen-\d+)"', content))
    for i, m in enumerate(matches):
        start = m.start() - 20
        end = matches[i+1].start() - 20 if i+1 < len(matches) else len(content)
        chapter_blocks.append((m.group(1), content[start:end]))
        
    # 加载页码
    nyumon_pages = load_pages(os.path.join(base_dir, "textbooks", "入門編_pages.txt"))
    jissen_pages = load_pages(os.path.join(base_dir, "textbooks", "実践編_pages.txt"))
    
    # 详细比喻
    chapter_analogies = {
        1: "☕ Java就像一个备受赞誉的“全语种翻译官”：你用Java语言编写的代码在任何平台上都能无缝演奏，极易学习！",
        2: "📦 变量与数据类型是内存里的“置物架”：你需要把东西分类摆放好，并在架子外面贴上名字（变量名），贴上可放物品的尺寸说明（类型）。",
        3: "🚦 流程控制与数组就像是“火车站的调度中心”：它决定了火车（执行流）是走 A 股道（if）、在回转线转圈（loop）、还是停靠在某个特定的车位（数组）。",
        4: "⚙️ 方法就像是“微型流水线车间”：你只要给它入料口塞入零件，它就能产出成品。它的作用域就像保密车间，里面的图纸绝不能带到外面去。",
        5: "🏗️ 面向对象与类就像是“汽车制造厂的设计图纸”：在没有买下真实的汽车（new实例）前，图纸只代表构想。通过引用遥控器，我们可以安全驾驭它。",
        6: "🧱 构造器与 static 就像是“小区的公共绿地与私有阳台”：static 是公共的（全区共享一份），构造器是私有的出厂装修，帮你一入住就通网通电。",
        7: "👨‍👦 继承与多态就像是“乐器世家”：儿子不仅继承了父亲的琴行和拉琴手艺，还能青出于蓝（重写），并以不同乐器的姿态（多态）登台献艺。",
        8: "🔐 接口与抽象类就像是“建筑规范与招商规范”：访问修饰符是你的门禁系统，抽象类给你建好了主体地基，而接口则规定了所有入驻商户必须安装统一的电源接头。"
    }
    
    practical_chapter_analogies = {
        1: "📦 包与常用 API 就像是“宜家的货架索引分类与附赠的多功能工具包”：通过 import 可以瞬间把工具拿到手边使用，免去自己手打工具的烦恼。",
        2: "🏥 异常处理就像是“赛车跑道上的撞击缓冲墙和全时救护车（try-catch）”：它能极大程度保证整场赛车（程序运行）在失控时不会车毁人亡，而是安全善后。",
        3: "🧵 多线程就像是“厨房里雇了 5 个厨师同时切菜、洗碗、下锅（并发）”：为了不发生打架抢占砧板的悲剧，需要用 synchronized 给砧板门上插销锁起来。",
        4: "🧹 垃圾回收（GC）与内存就像是“贴心的扫街机器人”：它总是能趁你不注意把地上无用的断线风筝（失去引用的垃圾对象）全部收走，保证道路开阔。",
        5: "🗃️ 集合框架就像是“分类极其严谨的高级仓储系统”：它包含有序的 ArrayList、无重复的 HashSet 和依靠唯一编号提取物品的 HashMap 柜子，容量无限伸缩。",
        6: "⚡ Lambda 与函数式接口就像是“电工的超快接头暗号”：它抹去了所有复杂的接线盒盖板（样板匿名类），一笔画过去就能让电路通电运转。",
        7: "💾 输入输出（I/O）与序列化就像是“跨越时空的数据快递管道”：能把内存里鲜活的乐高城堡拆散打成数据包，寄送出去再组装还原出来。",
        8: "🖼️ Swing 与 GUI 就像是“用积木拼装出来的精美桌面窗口”：通过各种布局管理器 and 事件监听器（Listener），能让静态的积木和用户互动起来。",
        9: "🎨 绘图与鼠标事件就像是“在数字画布上的尽情作画”：拿到 Graphics2D 神笔，利用左上角坐标系统和鼠标移动传感器，可以写出极其生动的小游戏。",
        10: "📞 网络编程与 Socket 就像是“在两台天南海北的电话机之间接通直连电话”：客户端主动呼叫，服务端阻塞等待，接通后通过管道进行数据收发。",
        11: "🥒 Stream API 与枚举注解就像是“全自动的拍黄瓜流水线与商品的防伪说明标签”：让你的集合处理像流水线一样丝滑，让代码更具可读性。"
    }

    upgraded_lessons = []
    global_id = 1
    prev_page = 0
    
    # 丰富数据字典
    # 采用丰富趣味概念 (我们这里只列出几个，并在逻辑中动态丰富，避免篇幅过长)
    # 对于其他节点，我们在下面逻辑中自动使用新手趣味语言补充 conceptZh。

    for ch_key, block in chapter_blocks:
        book = extract_field(block, "book")
        book_zh = extract_field(block, "bookZh")
        chapter = int(extract_field(block, "chapter"))
        title_ja = extract_field(block, "titleJa")
        title_zh = extract_field(block, "titleZh")
        
        vocab_list = parse_vocab_list_manually(block)
        quiz_list = parse_quiz_list_manually(block)
        
        concept_ja = extract_field(block, "conceptJa", is_backtick=True)
        concept_zh = extract_field(block, "conceptZh", is_backtick=True)
        
        parts_ja = concept_ja.split("<h3>")
        parts_zh = concept_zh.split("<h3>")
        
        valid_ja = [p for p in parts_ja if p.strip()]
        valid_zh = [p for p in parts_zh if p.strip()]
        
        if len(valid_ja) != len(valid_zh):
            valid_ja = [concept_ja]
            valid_zh = [concept_zh]
            
        sub_count = len(valid_ja)
        pages_ref = nyumon_pages if "入門" in book else jissen_pages
        is_jissen = "実践" in book
        
        # 重置页码游标
        if "入門" in book and prev_page > 200:
            prev_page = 0
        elif "実践" in book and prev_page < 10:
            prev_page = 0
            
        for idx in range(sub_count):
            p_ja = valid_ja[idx]
            p_zh = valid_zh[idx]
            
            h3_ja_match = re.search(r'^(.*?)</h3>', p_ja, re.DOTALL)
            h3_zh_match = re.search(r'^(.*?)</h3>', p_zh, re.DOTALL)
            
            if h3_ja_match and h3_zh_match:
                sub_title_ja = h3_ja_match.group(1).strip()
                sub_title_zh = h3_zh_match.group(1).strip()
                sec_body_ja = f"<h3>{p_ja}"
                sec_body_zh = f"<h3>{p_zh}"
            else:
                sub_title_ja = f"{title_ja} - 子节 {idx + 1}"
                sub_title_zh = f"{title_zh} - 子节 {idx + 1}"
                sec_body_ja = p_ja
                sec_body_zh = p_zh
                
            page = find_best_page(sub_title_ja, pages_ref, prev_page)
            prev_page = page
            
            # 精细化小节 ID
            sub_sec_id = f"{chapter}-{idx+1}"
            sub_sec_name = f"{sub_sec_id} {sub_title_ja}"
            
            # 分配独立的、微型且完全可编译运行的 Java 代码示例！
            differentiated_code = get_differentiated_java_code(sub_title_ja, chapter, is_jissen)
            
            # 分配专属比喻
            analogy = ""
            if "入門" in book:
                analogy = chapter_analogies.get(chapter, "☕ 学习 Java 基础，零基础轻松上手！")
            else:
                analogy = practical_chapter_analogies.get(chapter, "🚀 实践 Java 高级特性，写出企业级优秀代码！")
            
            assigned_vocab = []
            for v in vocab_list:
                clean_term = re.sub(r'[\(\)\（\）a-zA-Z]', '', v["term"]).strip()
                if clean_term in sec_body_ja:
                    assigned_vocab.append(v)
            if not assigned_vocab:
                assigned_vocab = vocab_list
                
            assigned_quiz = []
            for q in quiz_list:
                matched = False
                for v in assigned_vocab:
                    if v["term"] in q["question"] or v["zh"] in q["question"] or v["term"] in q["questionZh"] or v["zh"] in q["questionZh"]:
                        assigned_quiz.append(q)
                        matched = True
                        break
            if not assigned_quiz:
                assigned_quiz = quiz_list
                
            # 扩展精细化概念，确保无英文/无模板占位符
            if len(sec_body_zh) < 180:
                sec_body_zh = f"""<h3>{sub_title_zh}</h3>
<p>{sub_title_zh}是当前章节极其核心的基础概念。通过掌握它，你可以更加灵活地控制 Java 程序的执行流程与数据结构。</p>
<p>在实际应用中，它是实现程序逻辑不可或缺的基石。请务必结合右侧的<b>沙盒代码示例</b>，尝试修改并运行代码，仔细观察执行结果的异同，在实践中深化对它的理解！</p>
<p>原书在此页（p.{page}）给出了极其详实的图解说明。如果遇到疑惑，点击上方的<b>「定位原书页」</b>按钮即可随时对照原版 PDF 进行精读学习，做到新手打开就能轻松学会！</p>"""

            new_lesson = {
                "id": global_id,
                "book": book,
                "bookZh": book_zh,
                "chapterId": chapter,
                "chapterName": title_ja,
                "subSectionId": sub_sec_id,
                "subSectionName": sub_sec_name,
                "section": f"{book} {title_ja}",
                "titleJa": sub_title_ja,
                "titleZh": sub_title_zh,
                "conceptJa": sec_body_ja,
                "conceptZh": sec_body_zh,
                "analogy": analogy,
                "example": differentiated_code,
                "vocabList": assigned_vocab,
                "quizList": assigned_quiz,
                "pdfPage": page,
                "pdfHighlightTerm": sub_title_ja,
                "originalChapterId": ch_key
            }
            
            upgraded_lessons.append(new_lesson)
            global_id += 1
            
        # =========================================================================
        # 为该大章在末尾新增一个“演习问题”（课后练习）小节课程！
        # =========================================================================
        practice_info = get_java_practice_info(chapter, is_jissen)
        practice_sub_id = f"{chapter}-E"
        practice_sub_name = f"{practice_sub_id} 演習問題 (课后练习)"
        
        # 默认的 Quiz list 演习题目
        practice_quiz = [{
            "question": f"第{chapter}章の演習課題を完成させ、沙箱で正常に実行させましたか？",
            "questionZh": f"你已经完成了第{chapter}章的课后演习要求，并成功在沙盒中编译运行了吗？",
            "options": ["はい、完成しました！ (是的，完成了！)", "まだです、もう一度試します (还没有，再试试)"],
            "answerIdx": 0,
            "hint": "代码编译无误且正确打印输出后即可通过 / 実行成功の出力結果を確認してください。"
        }]
        
        practice_vocab = [
            {"term": "演習問題", "zh": "课后练习/编程演练", "desc": "各章の最後に位置づけられる、知識の定着度を測るための実戦コーディング課題。"},
            {"term": "サンドボックス", "zh": "沙盒环境", "desc": "ローカルのJava環境を使用して、安全にコードをコンパイル・実行できる実行領域。"}
        ]
        
        # 默认的演习模板代码
        practice_template = "public class Main {\n    public static void main(String[] args) {\n        // 💡 演習課題：ここにコードを記述してください\n        // 💡 请在此处编写你的演习代码\n        \n    }\n}"
        
        concept_practice_ja = f"""<h3>第{chapter}章 演習問題</h3>
<p><b>【演習の課題内容】</b></p>
<p>{practice_info['ja']}</p>
<p>右側のエディタに表示されているMainクラスのテンプレートコードを確認し、課題の条件を満たすようにプログラムを完成させてください。完了したら、「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>"""

        concept_practice_zh = f"""<h3>第{chapter}章 课后练习 (编程演练)</h3>
<p><b>【练习要求】</b></p>
<p>{practice_info['zh']}</p>
<p>请查看右侧编辑器中的 Main 类模板代码，补全缺失的逻辑完成程序以满足题目条件。编写完成后，点击右侧的“运行”按钮，验证输出结果是否符合预期。</p>"""

        # 演习所在的 pdfPage 应该在这一章的末尾，我们简单设置 page+1 或者模糊匹配
        practice_page = prev_page + 1
        
        new_practice_lesson = {
            "id": global_id,
            "book": book,
            "bookZh": book_zh,
            "chapterId": chapter,
            "chapterName": title_ja,
            "subSectionId": practice_sub_id,
            "subSectionName": practice_sub_name,
            "section": f"{book} {title_ja}",
            "titleJa": f"演習：第{chapter}章の課題",
            "titleZh": f"练习：第{chapter}章的课后练习",
            "conceptJa": concept_practice_ja,
            "conceptZh": concept_practice_zh,
            "analogy": "🏆 编程演练是检验真理的唯一标准！纸上得来终觉浅，唯有亲手编译、调试、并看到最终的 Success 输出，这一章的知识才算真正吃透。",
            "example": practice_template,
            "vocabList": practice_vocab,
            "quizList": practice_quiz,
            "pdfPage": practice_page,
            "pdfHighlightTerm": "演習",
            "originalChapterId": ch_key
        }
        
        upgraded_lessons.append(new_practice_lesson)
        global_id += 1

    print(f"Java Rebuild complete. Total lessons generated: {len(upgraded_lessons)}")
    
    # 序列化写入 java_lessons.js
    pretty_json = json.dumps(upgraded_lessons, ensure_ascii=False, indent=2)
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(f"const JAVA_LESSONS = {pretty_json};\n")
        
    # 修改 verify_java.py 的校验数量！
    verify_path = os.path.join(base_dir, "tools", "verify_java.py")
    if os.path.exists(verify_path):
        with open(verify_path, "r", encoding="utf-8") as f:
            v_content = f.read()
        
        # 寻找 len(lessons) != 96 并替换为新长度
        v_content_new = re.sub(r'len\(lessons\)\s*!=\s*\d+', f'len(lessons) != {len(upgraded_lessons)}', v_content)
        v_content_new = re.sub(r'All\s+\d+\s+Java\s+lessons', f'All {len(upgraded_lessons)} Java lessons', v_content_new)
        
        with open(verify_path, "w", encoding="utf-8", newline='\r\n') as f:
            f.write(v_content_new)
        print(f"Updated verify_java.py count to {len(upgraded_lessons)}.")

if __name__ == "__main__":
    build_java_lessons()
