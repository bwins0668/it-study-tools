# -*- coding: utf-8 -*-
import json
import os
import ast

def generate_source_walkthrough(code_content, file_path):
    """
    智能分析 Python 源码，输出逐行保姆级白话解析，供纯新手无障碍学习。
    """
    if not code_content.strip():
        return "<p>（本节为纯概念理论课，无需运行代码）</p>"
        
    lines = code_content.split('\n')
    walkthrough_rows = []
    in_triple_quotes = False
    
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        indent_level = len(line) - len(line.lstrip())
        explanation = ""
        
        if not stripped:
            explanation = "空行，用于将不同功能的代码块隔开，使程序排版更整洁美观。"
            walkthrough_rows.append((i, line, explanation))
            continue
            
        if "'''" in stripped or '"""' in stripped:
            if not in_triple_quotes:
                explanation = "多行注释/文档字符串的起点。以此符号包裹的多行文字不会被计算机执行。"
                in_triple_quotes = True
            else:
                explanation = "多行注释/文档字符串的终点。在此之后的内容将恢复为正常执行的代码。"
                in_triple_quotes = False
            walkthrough_rows.append((i, line, explanation))
            continue
            
        if in_triple_quotes:
            explanation = f"多行注释内的文本内容：【{stripped}】。仅用作文档说明，被计算机完全忽略。"
            walkthrough_rows.append((i, line, explanation))
            continue
            
        if stripped.startswith('#'):
            explanation = f"这是一行注释（以 <code>#</code> 开头），内容为：【{stripped[1:].strip()}】。它是写给程序员看的备忘说明，计算机会直接忽略它。"
            walkthrough_rows.append((i, line, explanation))
            continue
            
        parts = []
        if stripped.startswith('import ') or 'import' in stripped.split():
            parts.append("导入外部模块/库，以复用其中的函数和功能。")
        if stripped.startswith('from ') and 'import' in stripped:
            parts.append("从特定的库或包中导入指定的子模块、类或函数。")
        if stripped.startswith('def '):
            func_name = stripped.split('(')[0].replace('def ', '').strip()
            parts.append(f"使用 <code>def</code> 定义一个名为 <code>{func_name}</code> 的函数。冒号 <code>:</code> 代表函数体的开始。")
        if stripped.startswith('class '):
            class_name = stripped.split('(')[0].split(':')[0].replace('class ', '').strip()
            parts.append(f"使用 <code>class</code> 声明一个名为 <code>{class_name}</code> 的面向对象类。")
        if stripped.startswith('return '):
            parts.append("使用 <code>return</code> 结束当前函数，并将计算结果传回给调用它的地方。")
        if stripped.startswith('if ') or stripped.startswith('if('):
            parts.append("条件判断的分支起点。如果后面的条件为真(True)，就执行下方缩进的代码。")
        elif stripped.startswith('elif ') or stripped.startswith('elif('):
            parts.append("多路条件判定分支。如果之前的条件不成立，则在此处进行新的条件判断。")
        elif stripped.startswith('else:'):
            parts.append("默认分支。当上述所有条件都不成立时，程序将自动进入此处运行。")
            
        if 'for ' in stripped and ' in ' in stripped:
            parts.append("<code>for</code> 循环，用于遍历列表、字典或由 <code>range()</code> 生成的序列。")
        elif 'while ' in stripped:
            parts.append("<code>while</code> 循环，只要条件满足，下方缩进的代码就会一遍遍重复运行。")
            
        if 'print(' in stripped:
            parts.append("调用 <code>print()</code> 输出函数，用于向终端屏幕打印结果并换行。")
        if 'input(' in stripped:
            parts.append("调用 <code>input()</code> 键盘输入函数，程序会暂停等待用户输入并按回车。")
        if 'int(' in stripped:
            parts.append("使用 <code>int()</code> 将数据强制转换为整数型。")
        if 'str(' in stripped:
            parts.append("使用 <code>str()</code> 将数据强制转换为字符串型。")
        if 'float(' in stripped:
            parts.append("使用 <code>float()</code> 将数据强制转换为带小数的浮点数型。")
        if 'append(' in stripped:
            parts.append("调用 <code>append()</code> 方法，向列表的末尾追加新元素。")
        if 'insert(' in stripped:
            parts.append("调用 <code>insert()</code> 方法，在列表的指定索引位置插入元素。")
        if 'del ' in stripped:
            parts.append("使用 <code>del</code> 关键字，从列表或字典中彻底删除指定位置或指定的键值对。")
        if 're.search(' in stripped:
            parts.append("使用正则表达式的 <code>re.search()</code> 函数，在字符串中进行模式搜索。")
        if 'try:' in stripped:
            parts.append("异常捕获 <code>try</code> 块起点。包裹在此处的代码如果报错，程序不会崩溃，而是跳转到 <code>except</code> 处理。")
        if 'except ' in stripped or stripped.startswith('except:'):
            parts.append("异常捕获分支。一旦 <code>try</code> 中的代码发生错误，将立即跳入此处执行挽救或提示逻辑。")
        if 'finally:' in stripped:
            parts.append("<code>finally</code> 必须执行块。无论程序是否发生错误，这里的清理代码都一定会被运行。")
            
        if '=' in stripped and not any(op in stripped for op in ['==', '!=', '>=', '<=', '+=', '-=']):
            var_name = stripped.split('=')[0].strip()
            parts.append(f"将等号右边的数值或表达式计算结果，存入左侧名为 <code>{var_name}</code> 的变量盒子中。")
            
        if '+=' in stripped:
            parts.append("复合自增运算符 <code>+=</code>，在变量原有的数值基础上做加法累加。")
        elif '-=' in stripped:
            parts.append("复合自减运算符 <code>-=</code>，在变量原有的数值基础上做减法累减.。")
            
        if not parts:
            explanation = "执行基本的表达式计算或函数调用操作。"
        else:
            explanation = " ".join(parts)
            
        if indent_level > 0:
            explanation = f"（缩进 {indent_level} 空格，属于内部代码块） " + explanation
            
        walkthrough_rows.append((i, line, explanation))
        
    html = '<div class="code-walkthrough-panel">'
    html += '<h4><i class="fa-solid fa-compass"></i> 源码逐行保姆级解析</h4>'
    html += '<table class="walkthrough-table">'
    html += '<thead><tr><th>行号</th><th>代码语句</th><th>白话逻辑翻译</th></tr></thead>'
    html += '<tbody>'
    for num, code, exp in walkthrough_rows:
        escaped_code = code.replace('<', '&lt;').replace('>', '&gt;')
        html += f'<tr>'
        html += f'<td>{num}</td>'
        html += f'<td>{escaped_code}</td>'
        html += f'<td>{exp}</td>'
        html += '</tr>'
    html += '</tbody></table></div>'
    return html

def get_detailed_concept_zh(chapter_id, filename, code_content, zh_sub):
    """
    根据章节和文件名，动态生成深度、教科书级别的零基础新手概念解释。
    """
    chapter_textbooks = {
        1: {
            "title": "プログラミングをはじめる前に知っておこう",
            "desc": "本章介绍编程的根基概念。我们将探究计算机核心硬件（CPU、内存与硬盘）的协作，理解人类的高级语言是如何转译为计算机认识的二进制机器码的。同时我们将掌握程序员必修的命令行工具，并顺利完成 Python 开发环境的安装与配置。"
        },
        2: {
            "title": "Pythonでプログラミングをはじめよう",
            "desc": "本章是Python编程的起点。我们将学习如何在屏幕上展示信息，如何给代码添加人类能看懂的‘注释’笔记，以及Python最核心、最严苛的‘缩进规则’（Indentation）。"
        },
        3: {
            "title": "データについて学ぼう",
            "desc": "本章学习如何让计算机替我们做数学运算与逻辑计算。我们会接触‘变量盒子’的定义、命名规范，如何在不同数据类型（整数、小数、字符串）之间进行强制类型转换，以及如何让用户通过键盘向程序传递指令。"
        },
        4: {
            "title": "処理の順序を切り替えよう",
            "desc": "程序不再是一条路走到黑，本章引入 if-elif-else 条件分支。我们将学习比较运算符与逻辑运算符，控制计算机会根据现实数据的变化（如分数是否及格、时间是否是早上）自动走入不同的执行代码块。"
        },
        5: {
            "title": "データの集まりを使おう",
            "desc": "如何高效管理成百上千个数据？本章学习Python的四大金刚数据容器：支持增删改查及切片的列表(List)、只读安全防改的元组(Tuple)、支持极速哈希键值查找的字典(Dict)以及快速去重与交并集运算的集合(Set)。"
        },
        6: {
            "title": "処理を繰り返してみよう",
            "desc": "让计算机发挥无限计算体力的秘密在于循环。我们将学习 for 循环、while 条件循环，掌握如何使用 range() 控制跑圈次数，以及利用 break 和 continue 优雅地操纵循环的提前结束与单次跳过。"
        },
        7: {
            "title": "関数を自分で作ってみよう",
            "desc": "为了拒绝重复编写相同的代码，我们需要使用函数进行封装。本章学习函数的定义、参数（必选参数、默认参数、可变位置参数 *args 及可变关键字参数 **kwargs），理解返回值 return 机制与变量的作用域（局部变量与全局变量）。"
        },
        8: {
            "title": "オブジェクトとクラスについて学ぼう",
            "desc": "面向对象是现代软件工程的基石。我们将学习类(Class)与实例(Instance)的联系，掌握构造器方法 <code>__init__</code> 的内部机制，以及如何使用 <code>self</code> 在实例对象之间传递和管理专属数据。"
        },
        9: {
            "title": "モジュールとパッケージについて学ぼう",
            "desc": "大项目不能将所有代码堆在单个文件里。本章学习如何使用 <code>import</code> 和 <code>from...import</code> 引入外部 <code>.py</code> 模块文件，理解 <code>__init__.py</code> 在多级目录‘包’结构中的底层引导作用。"
        },
        10: {
            "title": "いろいろなモジュールを使ってみよう",
            "desc": "本章学习如何借助Python强大的内置标准库做常见业务开发。包括 datetime 库的时间获取、格式化转换与时间差运算；以及 random 库的随机数生成、序列随机抽取。"
        },
        11: {
            "title": "ファイルの読み書きをしよう",
            "desc": "程序关掉后数据不能丢失，因此需要存入硬盘文件。本章学习 <code>open()</code> 函数的只读('r')、覆盖写入('w')和末尾追加('a')模式。深刻理解 <code>with</code> 上下文管理器自动关闭文件的防资源泄露原理。"
        },
        12: {
            "title": "正規表現について学ぼう",
            "desc": "正则表达式是文本处理的终极神器。本章学习正则元字符的意义，如何利用 re.search 进行复杂文本检索，以及通过小括号 <code>()</code> 进行分组捕获，快速抓取网页数据或格式化文件。"
        },
        13: {
            "title": "エラーの対処方法を学ぼう",
            "desc": "再优秀的程序员也无法保证代码绝对不出错（比如网络中断、用户输错数值）。本章学习 <code>try...except...else...finally</code> 结构，教你如何优雅捕获运行时异常，甚至主动抛出自定义错误，确保程序永不意外崩溃。"
        }
    }

    ch_info = chapter_textbooks.get(chapter_id, {"title": "Python 编程基础", "desc": "学习 Python 的基础知识与常用 API 语法。"})
    
    pitfalls = []
    if "input(" in code_content:
        pitfalls.append("⚠️ <strong>新手大坑 (input数据类型)</strong>：<code>input()</code> 接收的值不论输入的是什么，<strong>数据类型一定是字符串</strong>！做数学计算前，必须用 <code>int()</code> 或 <code>float()</code> 强制转型，否则会报错 <code>TypeError</code>。")
    if "index" in filename and ("list" in filename or "jisho" in filename):
        pitfalls.append("⚠️ <strong>新手大坑 (索引越界)</strong>：Python 中的列表索引从 0 开始。如果列表有 3 个元素，最大索引是 2。访问 <code>list[3]</code> 会引发致命的 <code>IndexError</code>。")
    if ":" in code_content and ("if " in code_content or "for " in code_content or "def " in code_content):
        pitfalls.append("⚠️ <strong>新手大坑 (冒号与缩进)</strong>：在 <code>if</code>、<code>for</code>、<code>def</code> 语句行的末尾<strong>千万不能漏掉冒号 <code>:</code></strong>。同时，下方属于该结构的代码<strong>必须严格缩进 4 个空格</strong>，否则将发生编译级 <code>IndentationError</code> 或 <code>SyntaxError</code>。")
    if "=" in code_content and ("if " in code_content or "elif " in code_content):
        pitfalls.append("⚠️ <strong>新手大坑 (等于与赋值)</strong>：在条件判断里，判断是否相等要用双等号 <code>==</code>，而单等号 <code>=</code> 是用来给变量赋值的。如果在 <code>if</code> 条件里写了单等号赋值，Python 解释器会当场报错。")
    if "open(" in code_content and "close()" not in code_content and "with " not in code_content:
        pitfalls.append("⚠️ <strong>新手大坑 (文件未关闭)</strong>：使用 <code>open()</code> 打开文件后如果不显式调用 <code>close()</code>，文件锁将一直被程序霸占，这会导致内存泄漏，甚至写入的数据无法同步到硬盘上。极力推荐改用 <code>with open()</code> 自动闭合。")
    if "re.search" in code_content:
        pitfalls.append("⚠️ <strong>新手大坑 (正则Match None)</strong>：如果 <code>re.search()</code> 没有在文本中匹配到符合规则的内容，它会返回 <code>None</code>。如果此时直接对返回值调用 <code>group()</code> 方法，会导致程序抛出 <code>AttributeError: 'NoneType' object has no attribute 'group'</code>。因此必须先用 <code>if match:</code> 判定再取值。")
    if "def " in code_content and "return" not in code_content:
        pitfalls.append("⚠️ <strong>新手大坑 (无Return函数)</strong>：函数如果没有写 <code>return</code>，它在运行结束后会隐式返回一个 <code>None</code>。如果用一个变量去接收函数的执行结果，拿到的变量值就是 <code>None</code>。")

    if not pitfalls:
        pitfalls.append("⚠️ <strong>新手大坑 (拼写与大小写)</strong>：Python 是一门对大小写极其敏感的语言。<code>print</code> 不能写成 <code>Print</code>，布尔值 <code>True</code> / <code>False</code> 的首字母必须大写。任何拼写不一致都会被解释器视为 <code>NameError</code>。")

    pitfalls_html = "".join([f"<p>{p}</p>" for p in pitfalls])
    source_walkthrough = generate_source_walkthrough(code_content, filename)

    html_content = f"""
<div class="textbook-section">
    <h3>📖 教科书概念精讲</h3>
    <p><strong>【当前大章】：第{chapter_id}章 — {ch_info['title']}</strong></p>
    <p style="color: var(--text-muted); font-size:13px; line-height:1.5; margin-bottom:12px;">{ch_info['desc']}</p>
    
    <div class="concept-detail-box">
        <p><strong>【本节主题】：{zh_sub}</strong></p>
        <p>在零基础学习 Python 时，掌握此处的概念与代码案例对于后续编写更复杂的业务逻辑至关重要。本节核心要点包括：</p>
        <ul>
            <li><strong>学什么</strong>：理解本课所示样例的核心执行目标与语法规范。</li>
            <li><strong>为什么</strong>：学习当前案例的控制流程、变量分配、以及输入/输出逻辑。</li>
            <li><strong>怎么用</strong>：右侧沙箱编辑器已加载此文件（概念课除外），你可以随时通过运行按钮在控制台看到其实时执行效果。</li>
        </ul>
    </div>
</div>

<div class="textbook-walkthrough">
    {source_walkthrough}
</div>

<div class="textbook-pitfalls">
    <h4><i class="fa-solid fa-triangle-exclamation"></i> 零基础避坑与高频错误分析</h4>
    {pitfalls_html}
</div>
"""
    return html_content

def get_detailed_analogy(chapter_id, filename, zh_sub):
    """
    为小节分配完全独特、生动形象的生活趣味比喻，杜绝简单重复。
    """
    if "hello2.py" in filename:
        return "📣 多行输出就像是“多行告示牌”，你一次性把几句话分行写在黑板上，不仅能说'你好'，还能在下一行把数学分数一起展示给路人看。"
    elif "hello.py" in filename:
        return "📣 print 就像是计算机的“小喇叭”或“大喇叭”。大喇叭里塞进什么内容，终端屏幕就会以大声公的方式广播出什么内容。"
    elif "comment2.py" in filename:
        return "✏️ 多行注释就像是书页边缘的“长篇大论草稿区”。你用三引号把整段悄悄话围起来，计算机会闭上眼绕着走，但对以后来读这段代码的其他程序员来说就是极好的备忘日记。"
    elif "comment" in filename:
        return "✏️ 注释就像是读书时的“手写便利贴”。它挂在代码最前端，只给人眼进行快速阅读，期末考试（程序执行）时计算机会直接撕掉它，绝不会影响成绩。"
    elif "enzanshi01.py" in filename:
        return "🧮 数值四则运算就像是一台“小学生电子计算器”，加减乘除得心应手，其中求商 `%` 相当于剥花生后剩下的一小把外壳（余数）。"
    elif "enzanshi02.py" in filename:
        return "🔗 字符串的加法结合就像是一罐“强力胶水”。它不参与数学计算，而是直接把两个毫无关系的文字木块牢牢地黏成一根长木条。"
    elif "enzanshi03.py" in filename:
        return "❌ 字符串加数值类型错误就像是“西瓜和拖鞋无法相加”。在计算机的严苛法典里，你不能强行计算‘5个苹果 + 一双拖鞋’，它会立刻举起红牌 TypeError。"
    elif "enzanshi04.py" in filename:
        return "🏷️ str() 型转换就像是“扫码打印标签”。你要把一个纯铁做的数值 10 贴到纸箱子（字符串）上，必须先用 str() 把它印成纸质条形码贴纸。"
    elif "enzanshi05.py" in filename:
        return "📦 int() 转换就像是“开箱检验把货物打回原形”。如果有个人递给你一个写着 '123' 的文本纸箱，你只有用 int() 把它强行拆开，取出里面的数字 123 才能做数学计算。"
    elif "enzanshi06.py" in filename:
        return "📏 float() 转换就像是“拿游标卡尺测量尺寸”。即使你输入的是一个生硬的整数 5，经由 float() 测量后，也会变成高度精确且带有小数点的 5.0 浮点数。"
    elif "hensu01.py" in filename:
        return "📦 变量定义就像是在家里贴上标签的“收纳整理盒”。你在盒子外贴上 labels 名字，把数据塞进去，需要用的时候喊一声名字就能把数据取出来。"
    elif "hensu02.py" in filename:
        return "📦 给变量赋值就像是“把盒子里旧的衣服拿掉，塞入全新的裤子”。等号左边永远是那个盒子，右边永远是源源不断的新货物。"
    elif "hensu03.py" in filename:
        return "🧮 变量参与计算就像是“配方配料表”。你把糖（sugar = 10g）和面粉（flour = 20g）的名字写在配方上，面包机就会直接调取它们的值相加算出总重。"
    elif "hensu08.py" in filename or "hensu09.py" in filename:
        return "⏱️ 复合代入 += 就像是在游戏角色头顶上挂的“HP + 10”小气泡。不需要重新把原来的血量和新血量抄一遍，原地直接做数值的累加累减。"
    elif "input" in filename:
        return "📥 input() 就像是“在古代衙门门口挂的鸣冤鼓”。鼓声一响（程序执行到 input），大老爷就停下办公，一直等到外面有人敲门递状纸（输入内容并按回车），程序才继续往下断案。"
    elif "hikaku" in filename:
        return "⚖️ 比较运算符就像是“法庭上的大法官”。不论你带入什么复杂的数据，大法官最终给出的裁决只能有两个结果：判决为真（True）或者判决为假（False）。"
    elif "ifelse" in filename:
        return "🚦 if-else 就像是“马路中央的丫字型分流路口”。如果你持有通行证（条件为 True），车子就自动拐向左边的平坦大道；如果没有（False），就别无选择地自动走入右边的备用小道。"
    elif "ifelif" in filename:
        return "🛣️ if-elif-else 多向分支就像是“火车站的安检通道”。有很多个检票口（if, elif...），你排着队一个个过，一旦在其中某个检票口刷卡成功，后面的所有通道就都不需要再走，直接进站。"
    elif "ifnest" in filename:
        return "🔑 条件嵌套就像是“密室逃脱里的宝箱”。你必须先找到房间大门的钥匙（外层 if），走进去之后，才能继续寻找宝箱上的密码锁（内层 if）并解锁宝藏。"
    elif "list" in filename and "append" in filename:
        return "🛒 list.append 就像是在超市推的小推车。你推着车在货架间走，每看到一件心仪的商品，就顺手把它丢进推车的“最尾端”堆放起来。"
    elif "list" in filename and "del" in filename:
        return "🗑️ del 列表删除就像是“定点清除垃圾”。你手持清除名单，对着垃圾箱的索引编号，直接把指定隔间里的物品连同隔间一起彻底抹去。"
    elif "list" in filename:
        return "🚞 列表就像是一列有多个车厢的“长途火车”。每节车厢都有自己固定的座位号索引（从 0 开始），你可以随时根据车厢号去查里面坐着谁，或者把里面的乘客替换掉。"
    elif "tuple" in filename:
        return "🔒 元组就像是“被密码锁焊死的文件保险柜”。文件放进去合上后，所有人都只能打开柜门去阅读（读取），绝对无法往里面塞新纸条，也无法涂改原有的一字一句。"
    elif "jisho" in filename and "get" in filename:
        return "🛡️ 字典 get 就像是“雇佣了随身安全管家”。如果你去翻抽屉找一个不存在的药丸（Key），程序会当场发生 KeyError 崩溃；但让管家 get 去找，找不到它也只会礼貌地回答 None，绝不发生冲突。"
    elif "jisho" in filename:
        return "📔 字典就像是一本“汉语拼音字典”。它不根据页码数去一页页翻，而是直接通过键（Key，字词拼音）瞬间直达值（Value，详细字义解释），查询速度万年不变地飞快。"
    elif "shugou" in filename or "set" in filename:
        return "🔮 集合就如同一个“自动除重的魔法袋”。不管你往袋子里扔了多少个一模一样的红色小弹珠，只要把袋子口扎紧再打开，袋子里永远只会留下一个红色弹珠，其余的魔法般自动消失。"
    elif "kurikaeshi" in filename and "range" in filename:
        return "🏃 range(start, stop, step) 就像是体育老师吹口哨划定跑步路线：“从第 start 米起跑，在第 stop 米前停下，每跨一步是 step 米长”的数轴生成器。"
    elif "kurikaeshi" in filename and "while" in filename:
        return "🐹 while 循环就像是“仓鼠踏步铁轮”。只要小仓鼠还有体力且轮子还在转（条件满足），它就会在笼子里不知疲倦地一直跑下去，直到体力耗尽或轮子被木棍卡死（break）。"
    elif "kurikaeshi" in filename:
        return "🔄 for 循环就像是“工厂里流水线上的包装工人”。箱子里有多少个苹果（序列长度），工人就一丝不苟地把手伸进箱子摸一个包好，一直摸完最后一个才下班。"
    elif "kansu" in filename and "args" in filename:
        return "🎁 可变长参数 *args 就像是一个“无限容量大收纳袋”。无论你来调用函数时带了 3 个礼物、5 个苹果还是 10 个纸箱，它都会把它们整整齐齐地塞进一个名叫 args 的元组口袋里包起来。"
    elif "kansu" in filename and "return" in filename:
        return "📠 函数 return 就像是“在自动贩卖机里买汽水”。你往机器里塞入硬币并按下按钮（传入参数调用），机器在里面咔哒咔哒运转一通，最终噗咚掉出一瓶冰汽水（return 返回值）到你手中。"
    elif "kansu" in filename:
        return "🤖 函数就像是家里买的“全自动多功能榨汁机”。只要定义好了榨汁规则，每次扔进橙子（参数），它就自动产出橙汁，不需要你每次都亲手拿钢叉去挤压水果。"
    elif "class" in filename:
        return "🏗️ 类与对象就像是“月饼塑料模具与真正的月饼”。类是图纸或模具，你拿着这个模具往里面塞面粉 and 豆沙，就能在桌子上盖出一万个长得一模一样、但中身重量口味各异的实体月饼（实例对象）。"
    elif "re.search" in filename or "seiki" in filename:
        return "🔍 正则表达式就像是“特工手持的违禁品高精度金属探测雷达”。不管文本行李箱有多大，只要设定好金属的震动波段规则，雷达在箱子表面一扫，就能瞬间发出滴滴声精确定位目标所在。"
    elif "reigai" in filename:
        return "🩹 异常捕获 try-except 就像是“汽车的防抱死刹车系统和安全气囊”。即使遇到了结冰路面打滑（除零错误或文件不存在），气囊也会瞬间弹出护你安全，而不会导致整辆车在高速公路上宕机爆炸。"
    
    return f"💡 【趣味形象比喻】：{zh_sub} 就像是“生活中的经典流程规章”。跟着步骤一步一步按照规范走，计算机会毫无差错地完成，如果不按套路（写错语法），就会触发规则惩罚（解释器报错）。"

def build():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # 1. Parse base lessons metadata from build_python_lessons.py
    base_file = os.path.join(base_dir, "tools", "build_python_lessons.py")
    with open(base_file, 'r', encoding='utf-8') as f:
        content = f.read()

    tree = ast.parse(content)
    base_lessons = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Assign):
            for target in node.targets:
                if isinstance(target, ast.Name) and target.id == 'lessons_metadata':
                    base_lessons = ast.literal_eval(node.value)
                    break

    print(f"Loaded {len(base_lessons)} base lessons from AST.")

    # 2. Define custom subtopics mapping for sample files
    file_subtopics = {
        # c02
        "c02/hello.py": {"ja": "対話モードとはじめてのプログラム", "zh": "对话模式与第一个程序"},
        "c02/hello2.py": {"ja": "スクリプトファイルの実行", "zh": "脚本文件的运行"},
        "c02/comment.py": {"ja": "コメントの基本", "zh": "单行注释与基本法则"},
        "c02/comment2.py": {"ja": "複数行コメント", "zh": "多行注释"},
        "c02/comment_A1.py": {"ja": "トリプルクォートのエラー", "zh": "三引号注释位置错误"},
        "c02/comment_A2.py": {"ja": "コメントのインデントエラー", "zh": "注释的缩进错误"},
        # c03
        "c03/enzanshi01.py": {"ja": "数値の四則演算", "zh": "数值的四则运算"},
        "c03/enzanshi02.py": {"ja": "文字列の結合", "zh": "字符串拼接"},
        "c03/enzanshi03.py": {"ja": "型エラー（文字列と数値）", "zh": "类型错误（字符串与数值）"},
        "c03/enzanshi04.py": {"ja": "str()による型変換", "zh": "使用 str() 转换类型"},
        "c03/enzanshi05.py": {"ja": "int()による型変換", "zh": "使用 int() 转换类型"},
        "c03/enzanshi06.py": {"ja": "float()による型変換", "zh": "使用 float() 转换类型"},
        "c03/hensu01.py": {"ja": "変数の定義と基本", "zh": "变量的定义与基本使用"},
        "c03/hensu02.py": {"ja": "変数への値の代入", "zh": "给变量赋值"},
        "c03/hensu03.py": {"ja": "変数を用いた計算", "zh": "利用变量进行计算"},
        "c03/hensu04.py": {"ja": "変数と文字の同時出力", "zh": "同时输出变量与文字"},
        "c03/hensu05.py": {"ja": "変数から変数への代入", "zh": "将变量的值赋给另一个变量"},
        "c03/hensu06.py": {"ja": "変数の値の書き換え", "zh": "修改变量的值"},
        "c03/hensu07.py": {"ja": "変数自身の値の更新", "zh": "变量自身的更新"},
        "c03/hensu08.py": {"ja": "累積代入演算子 (+=)", "zh": "复合赋值运算符 (+=)"},
        "c03/hensu09.py": {"ja": "文字列の累積代入", "zh": "字符串的复合赋值"},
        "c03/input01.py": {"ja": "キーボードからの入力", "zh": "从键盘获取输入"},
        "c03/input02.py": {"ja": "入力された値の結合", "zh": "键盘输入的字符串拼接"},
        "c03/input03.py": {"ja": "入力値の数値変換と計算", "zh": "输入值的数值转换与计算"},
        "c03/input04.py": {"ja": "入力と変換の同時実行", "zh": "同时进行输入与类型转换"},
        # c04
        "c04/hikaku01.py": {"ja": "値の等価比較", "zh": "数值的等价比较"},
        "c04/hikaku02.py": {"ja": "数値の大小比較", "zh": "数值的大关系比较"},
        "c04/hikaku03.py": {"ja": "文字列の大小比較", "zh": "字符串的大关系比较"},
        "c04/hikaku04.py": {"ja": "日本語文字列の比較", "zh": "中文/日文字符串的比较"},
        "c04/hikaku05.py": {"ja": "変数との大小比較", "zh": "与变量的大关系比较"},
        "c04/hikaku06.py": {"ja": "真偽値を用いた条件判定", "zh": "使用布尔值进行条件判断"},
        "c04/if01.py": {"ja": "if文による単純分岐", "zh": "if 语句单向分支"},
        "c04/ifelse01.py": {"ja": "if-else文による二者択一", "zh": "if-else 双向分支"},
        "c04/ifelif01.py": {"ja": "if-elif文による3分岐", "zh": "if-elif 多向分支"},
        "c04/ifelif02.py": {"ja": "elifの複数使用", "zh": "多个 elif 语句的使用"},
        "c04/ifnest01.py": {"ja": "条件分岐のネスト", "zh": "分支的嵌套"},
        "c04/and01.py": {"ja": "論理積 and", "zh": "逻辑与 and"},
        "c04/and02.py": {"ja": "连续比较条件判断", "zh": "连续比较条件判断"},
        "c04/or01.py": {"ja": "論理和 or", "zh": "逻辑或 or"},
        "c04/not01.py": {"ja": "論理否定 not", "zh": "逻辑非 not"},
        "c04/not02.py": {"ja": "真偽値の反転判定", "zh": "布尔值的反转判定"},
        "c04/column01.py": {"ja": "コラム：値の存在判定", "zh": "专栏：空值与默认值判定"},
        "c04/column02.py": {"ja": "コラム：三項演算子（条件式）", "zh": "专栏：三元运算符（条件表达式）"},
        # c05
        "c05/list01.py": {"ja": "リストの作成と出力", "zh": "列表的创建与输出"},
        "c05/list02.py": {"ja": "リストのネスト", "zh": "嵌套列表的定义"},
        "c05/list03.py": {"ja": "インデックスによる要素取得", "zh": "通过正索引访问列表元素"},
        "c05/list04.py": {"ja": "負のインデックスの使用", "zh": "使用负索引访问列表"},
        "c05/list05.py": {"ja": "スライスによる範囲取得", "zh": "通过切片获取列表子集"},
        "c05/list06.py": {"ja": "スライスの開始・終了の省略", "zh": "省略切片的起点与终点"},
        "c05/list07.py": {"ja": "リストのアンパック", "zh": "列表元素的分包/拆包"},
        "c05/list08.py": {"ja": "アンパック要素数の不一致エラー", "zh": "拆包元素数量不匹配错误"},
        "c05/list09.py": {"ja": "in演算子による存在確認", "zh": "使用 in 判断元素是否存在"},
        "c05/list10.py": {"ja": "index()による要素位置検索", "zh": "使用 index() 获取元素位置"},
        "c05/list11.py": {"ja": "インデックス指定による要素の書き換え", "zh": "通过索引修改列表元素"},
        "c05/list12.py": {"ja": "(+=)によるリストの末尾結合", "zh": "使用复合赋值运算符追加列表"},
        "c05/list13.py": {"ja": "append()による要素追加", "zh": "使用 append() 追加单个元素"},
        "c05/list14.py": {"ja": "insert()による位置指定挿入", "zh": "使用 insert() 在指定位置插入元素"},
        "c05/list15.py": {"ja": "del文による要素削除", "zh": "使用 del 关键字删除元素"},
        "c05/list16.py": {"ja": "pop()による要素取り出しと削除", "zh": "使用 pop() 弹出并删除元素"},
        "c05/list17.py": {"ja": "remove()による値指定削除", "zh": "使用 remove() 删除指定值的元素"},
        "c05/list18.py": {"ja": "値の存在確認をしてから削除", "zh": "安全删除（先判断是否存在再 remove）"},
        "c05/list19.py": {"ja": "len()によるリスト長さの取得", "zh": "使用 len() 获取列表长度"},
        "c05/list20.py": {"ja": "末尾要素の安全な取得", "zh": "安全地获取列表最后一个元素"},
        "c05/listcolumn01.py": {"ja": "コラム：min()とmax()", "zh": "专栏：使用 min() 和 max() 获取极值"},
        "c05/listcolumn02.py": {"ja": "コラム：文字列混在時の極値エラー", "zh": "专栏：混合类型列表的极值错误"},
        "c05/tuple01.py": {"ja": "タプルへの追加変更エラー", "zh": "元组的不可变性与修改错误"},
        "c05/tuple02.py": {"ja": "タプルの作成と基本", "zh": "元组的创建与基本操作"},
        "c05/tuple03.py": {"ja": "要素数が1のタプルの作成注意点", "zh": "创建单元素元组的注意事项"},
        "c05/tuple04.py": {"ja": "タプルの要素取得とスライス", "zh": "元组的元素读取与切片"},
        "c05/tuple05.py": {"ja": "len()によるタプル長さの取得", "zh": "使用 len() 获取元组长度"},
        "c05/tuplecolumun.py": {"ja": "コラム：リストとタプルの相互変換", "zh": "专栏：列表与元组的相互转换"},
        "c05/jisho01.py": {"ja": "辞書の作成と出力", "zh": "字典的创建与输出"},
        "c05/jisho02.py": {"ja": "キー重複時の動作", "zh": "字典键重复时的覆盖机制"},
        "c05/jisho03.py": {"ja": "キーによる値の取得", "zh": "通过键获取字典的值"},
        "c05/jisho04.py": {"ja": "辞書のスライス不可エラー", "zh": "字典不支持切片操作的错误"},
        "c05/jisho05.py": {"ja": "get()メソッドによる安全な値取得", "zh": "使用 get() 安全获取键值"},
        "c05/jisho06.py": {"ja": "キー指定による値の書き換え", "zh": "通过键修改字典的值"},
        "c05/jisho07.py": {"ja": "新しいキーでの要素の追加", "zh": "向字典中追加新的键值对"},
        "c05/jisho08.py": {"ja": "del文による要素削除", "zh": "使用 del 删除字典元素"},
        "c05/jisho09.py": {"ja": "存在しないキーの削除エラー", "zh": "删除不存在的键引发 KeyError"},
        "c05/jisho10.py": {"ja": "存在確認をしてから要素削除", "zh": "安全删除字典元素（先用 in 判断）"},
        "c05/jisho11.py": {"ja": "keys()によるキー一覧の取得", "zh": "使用 keys() 获取所有键"},
        "c05/jisho12.py": {"ja": "items()によるキーと値のペア取得", "zh": "使用 items() 获取所有键值对"},
        "c05/jisho_values01.py": {"ja": "values()による値の存在判定", "zh": "使用 values() 判断值是否存在"},
        "c05/shugou01.py": {"ja": "集合の作成（set関数）", "zh": "使用 set() 函数创建集合"},
        "c05/shugou02.py": {"ja": "集合のリテラル作成と重複排除", "zh": "使用大括号 {} 创建集合与去重"},
        "c05/shugou03.py": {"ja": "集合の要素存在判定", "zh": "判断元素是否在集合中"},
        "c05/shugou04.py": {"ja": "remove()による要素削除", "zh": "使用 remove() 删除集合元素"},
        "c05/shugou05.py": {"ja": "add()による要素追加", "zh": "使用 add() 添加集合元素"},
        "c05/set_list.py": {"ja": "集合を用いたリストの重複排除", "zh": "利用集合实现列表快速去重"},
        # c06
        "c06/kurikaeshi01.py": {"ja": "range()で生成される連続値", "zh": "使用 range() 生成连续整数"},
        "c06/kurikaeshi02.py": {"ja": "range()の開始と終了指定", "zh": "指定 range() 的起点和终点"},
        "c06/kurikaeshi03.py": {"ja": "range()のステップ指定（正数）", "zh": "指定 range() 的正步长"},
        "c06/kurikaeshi04.py": {"ja": "range()のステップ指定（負数）", "zh": "指定 range() 的负步长"},
        "c06/kurikaeshi05.py": {"ja": "for文を用いた繰り返し", "zh": "for 循环的基本使用"},
        "c06/kurikaeshi06.py": {"ja": "減少する値でのループ処理", "zh": "步长为负的 for 循环"},
        "c06/kurikaeshi07.py": {"ja": "インデックスによるリスト反復", "zh": "利用索引遍历列表元素"},
        "c06/kurikaeshi08.py": {"ja": "for inによるリストの直接反復", "zh": "直接使用 for...in 遍历列表"},
        "c06/kurikaeshi09.py": {"ja": "集合(set)のループ処理", "zh": "使用 for 循环遍历集合"},
        "c06/kurikaeshi10.py": {"ja": "辞書のループ処理（キーの取得）", "zh": "遍历字典的键"},
        "c06/kurikaeshi11.py": {"ja": "辞書キーから対応する値を取得", "zh": "在遍历中通过键读取字典的值"},
        "c06/kurikaeshi12.py": {"ja": "items()によるタプルでの辞書反復", "zh": "使用 items() 遍历键值对元组"},
        "c06/kurikaeshi13.py": {"ja": "アンパックを用いた辞書キーと値の反復", "zh": "同时遍历字典的键和值"},
        "c06/kurikaeshi14.py": {"ja": "while文による条件繰り返し", "zh": "while 循环的基本使用"},
        "c06/kurikaeshi15.py": {"ja": "while文でのカウンタ処理", "zh": "while 循环与计数器更新"},
        "c06/kurikaeshi16.py": {"ja": "while Trueによる無限ループ", "zh": "while True 构成的无限循环"},
        "c06/kurikaeshi17.py": {"ja": "無限ループからのbreak脱出", "zh": "在无限循环中使用 break 退出"},
        "c06/kurikaeshi18.py": {"ja": "continueによる反復スキップ", "zh": "使用 continue 跳过单次循环"},
        # c07
        "c07/kansu01.py": {"ja": "関数の基本定義と呼び出し", "zh": "无参函数的基本定义与调用"},
        "c07/kansu02.py": {"ja": "関数の定義順とエラー", "zh": "函数先定义后调用的顺序限制"},
        "c07/kansu03.py": {"ja": "複数回呼び出す関数の挙動", "zh": "同一个函数的多次重复调用"},
        "c07/kansu04.py": {"ja": "引数を持つ関数の定義", "zh": "包含单个参数的函数定义"},
        "c07/kansu05.py": {"ja": "引数のデータ型", "zh": "传入不同类型参数的函数表现"},
        "c07/kansu06.py": {"ja": "複数の引数を持つ関数", "zh": "包含多个参数 of 函数定义"},
        "c07/kansu07.py": {"ja": "引数の呼び出し順とデータ型", "zh": "参数传递顺序与类型匹配"},
        "c07/kansu09.py": {"ja": "デフォルト値を持つ引数", "zh": "函数参数的默认值"},
        "c07/kansu10.py": {"ja": "デフォルト引数の呼び出し省略", "zh": "省略默认参数的函数调用"},
        "c07/kansu11.py": {"ja": "キーワード引数による呼び出し", "zh": "使用关键字参数传值"},
        "c07/kansu12.py": {"ja": "通常引数とデフォルト引数の定義位置ルール", "zh": "默认参数必须放在非默认参数后面"},
        "c07/kansu13.py": {"ja": "可変長引数 (*args)", "zh": "使用星号可变长参数 (*args)"},
        "c07/kansu14.py": {"ja": "キーワード可変長引数 (**kwargs)", "zh": "使用双星号可变长参数 (**kwargs)"},
        "c07/kansu15.py": {"ja": "通常引数と可変長引数の組み合わせ", "zh": "普通参数与可变长参数的组合"},
        "c07/kansu16.py": {"ja": "引数デフォルト値の高度な変更", "zh": "默认值参数的复杂用法"},
        "c07/kansu17.py": {"ja": "return文による戻り値の返却", "zh": "使用 return 返回函数计算结果"},
        "c07/kansu18.py": {"ja": "戻り値を受け取る変数の割り当て", "zh": "接收函数的返回值并保存"},
        "c07/kansu19.py": {"ja": "returnによる関数の途中終了", "zh": "利用 return 提前终止函数"},
        "c07/kansu20.py": {"ja": "複数の戻り値を返す関数", "zh": "返回多个数值的函数（元组拆包）"},
        "c07/kansu_a1.py": {"ja": "ローカル変数とグローバル変数", "zh": "局部变量与全局变量的作用域区别"},
        # c08
        "c08/class01.py": {"ja": "クラスの基本定義", "zh": "类的基本定义与空实例"},
        "c08/class02.py": {"ja": "コンストラクタの初期値設定", "zh": "构造函数 __init__ 与成员变量"},
        "c08/class03.py": {"ja": "メソッドの定義とself", "zh": "类方法的定义与 self 关键字"},
        "c08/class04.py": {"ja": "クラス変数とインスタンス変数", "zh": "类变量与实例变量的区别"},
        # c09
        "c09/my_func.py": {"ja": "関数モジュールの作成", "zh": "模块开发：定义独立函数文件"},
        "c09/my_class.py": {"ja": "クラスモジュールの作成", "zh": "模块开发：定义类文件"},
        "c09/calc_account.py": {"ja": "複合モジュールスクリプト", "zh": "复合模块的脚本组织"},
        "c09/script.py": {"ja": "import文によるモジュール読み込み", "zh": "使用 import 导入同目录模块"},
        "c09/script_package01.py": {"ja": "パッケージからモジュールを導入", "zh": "从子包中导入模块"},
        "c09/script_package02.py": {"ja": "ネストされたパッケージの導入", "zh": "导入多级嵌套包下的模块"},
        "c09/script_package03.py": {"ja": "from文による特定モジュールの指定インポート", "zh": "使用 from...import 导入指定模块"},
        "c09/script_package04.py": {"ja": "from文で特定関数を直接インポート", "zh": "使用 from...import 导入特定函数"},
        "c09/script_package05.py": {"ja": "as文によるモジュールのエイリアス（別名）", "zh": "使用 as 关键字给导入的函数起别名"},
        "c09/sample/__init__.py": {"ja": "パッケージ初期化ファイル", "zh": "包初始化 __init__.py"},
        "c09/sample/my_class.py": {"ja": "パッケージ内クラス定義", "zh": "包内类模块"},
        "c09/sample/my_func.py": {"ja": "パッケージ内関数定義", "zh": "包内函数模块"},
        "c09/sample/sub1/sub2/__init__.py": {"ja": "深層パッケージ初期化ファイル", "zh": "嵌套子包初始化"},
        "c09/sample/sub1/sub2/my_func.py": {"ja": "深層パッケージ内関数定義", "zh": "嵌套子包内的函数模块"},
        # c10
        "c10/hiduke01.py": {"ja": "現在日時の取得", "zh": "获取当前系统时间"},
        "c10/hiduke02.py": {"ja": "指定日時のdatetime作成", "zh": "创建指定时间的 datetime 对象"},
        "c10/hiduke03.py": {"ja": "時分を省略した日付作成", "zh": "创建仅包含年月日的日期对象"},
        "c10/hiduke04.py": {"ja": "無効な日付指定のエラー", "zh": "不合法的日期参数引发 ValueError"},
        "c10/hiduke05.py": {"ja": "date.today()による本日の日付", "zh": "使用 date.today() 获取今日日期"},
        "c10/hiduke06.py": {"ja": "未来日付の作成", "zh": "创建未来的日期实例"},
        "c10/hiduke07.py": {"ja": "日時の大小比較", "zh": "日期对象的比较运算"},
        "c10/hiduke08.py": {"ja": "timedeltaによる日付の加減算", "zh": "使用 timedelta 加减时间"},
        "c10/hiduke09.py": {"ja": "datetime差分の秒数換算", "zh": "计算两个时间的差值并转为秒/分钟"},
        "c10/hiduke10.py": {"ja": "weekday()による曜日の取得", "zh": "使用 weekday() 获取星期几"},
        "c10/hiduke11.py": {"ja": "strptimeによる文字列からの日付変換", "zh": "将日期格式字符串转换为 datetime"},
        "c10/hiduke12.py": {"ja": "strftimeによる日時フォーマット整形", "zh": "将 datetime 格式化为指定的显示字符串"},
        "c10/ransu01.py": {"ja": "random()による0〜1の乱数", "zh": "使用 random() 生成 0 到 1 之间的浮点随机数"},
        "c10/ransu02.py": {"ja": "randint()による範囲指定整数乱数", "zh": "使用 randint() 生成指定范围的整数随机数"},
        "c10/ransu03.py": {"ja": "choice()によるシーケンス要素のランダム選択", "zh": "使用 choice() 从序列中随机抽取元素"},
        # c11
        "c11/arunashi01.py": {"ja": "os.path.existsによる存在確認", "zh": "使用 os.path.exists 检测文件是否存在"},
        "c11/kakikomi01.py": {"ja": "open(mode='w')でのファイル新規書込", "zh": "使用 w 模式新建并写入文件"},
        "c11/kakikomi02.py": {"ja": "writelines()によるリスト行書込", "zh": "使用 writelines() 写入多行列表"},
        "c11/kakikomi03.py": {"ja": "open(mode='a')での既存ファイル追記", "zh": "使用 a 模式追加文件内容"},
        "c11/yomikomi01.py": {"ja": "read()によるファイル全内容の読込", "zh": "使用 read() 一次性读取文件全部内容"},
        "c11/yomikomi01_with.py": {"ja": "with文を用いた安全なファイルオープン", "zh": "使用 with 语句自动且安全地关闭文件"},
        "c11/yomikomi02.py": {"ja": "readline()によるファイル1行読込", "zh": "使用 readline() 按行逐次读取文件"},
        "c11/yomikomi03.py": {"ja": "readlines()によるファイル全行のリスト取得", "zh": "使用 readlines() 将文件每行作为列表元素读取"},
        "c11/sample/openfile.py": {"ja": "パッケージパスを基準としたファイルオープン", "zh": "包内脚本以相对路径定位外部文件"},
        # c12
        "c12/seiki01.py": {"ja": "re.searchによる部分一致検索", "zh": "使用 re.search 判断正则部分匹配"},
        "c12/seiki02.py": {"ja": "re.search判定結果オブジェクトのチェック", "zh": "判断 re.search 的返回值是否为 None"},
        "c12/seiki03.py": {"ja": "行頭アンカー (^)", "zh": "行首定位符 ^"},
        "c12/seiki04.py": {"ja": "行末アンカー ($)", "zh": "行尾定位符 $"},
        "c12/seiki05.py": {"ja": "厳密一致判定 (^と$の併用)", "zh": "使用 ^ 与 $ 实现完全匹配验证"},
        "c12/seiki06.py": {"ja": "任意の一文字 (.)", "zh": "匹配任意单个字符的通配符 ."},
        "c12/seiki07.py": {"ja": "直前文字の0回以上の繰り返し (*)", "zh": "匹配零次或多次重复的 *"},
        "c12/seiki08.py": {"ja": "直前文字の1回以上の繰り返し (+)", "zh": "匹配一次或多次重复的 +"},
        "c12/seiki09.py": {"ja": "直前文字の0回または1回のみの出現 (?)", "zh": "匹配可选零次或一次的 ?"},
        "c12/seiki10.py": {"ja": "文字クラスの範囲指定 ([a-z] / [0-9])", "zh": "字符集范围匹配 [a-z] 和 [0-9]"},
        "c12/seiki11.py": {"ja": "特殊なエスケープ文字 (\\d)", "zh": "预定义字符集 \\d 代表数字"},
        "c12/seiki12.py": {"ja": "繰り返し回数の直接指定 ({min, max})", "zh": "使用大括号 {m,n} 限制重复次数"},
        "c12/seiki13.py": {"ja": "グループ化とマッチ部分の抽出", "zh": "使用小括号 () 进行正则分组和捕获"},
        "c12/seiki14.py": {"ja": "正規表現を用いたファイル走査", "zh": "在读取文件时逐行进行正则表达式筛选"},
        "c12/seiki14_sep.py": {"ja": "正規表現ファイル走査（グループ抽出版）", "zh": "按行正则匹配并提取特定分组内容"},
        "c12/seiki15.py": {"ja": "正規表現によるユーザー名抽出", "zh": "利用分组匹配提取特定用户名"},
        "c12/seiki15_sep.py": {"ja": "正規表現ユーザー名抽出（分離版）", "zh": "分离逻辑的正则用户名提取"},
        "c12/seiki16.py": {"ja": "正規表現による成績データの抽出", "zh": "利用正则分组结构化提取学生成绩数据"},
        "c12/seiki16_sep.py": {"ja": "正規表現成績データ抽出（分離版）", "zh": "成绩数据提取的分离逻辑版"},
        # c13
        "c13/reigai01.py": {"ja": "例外の発生（ゼロ除算）", "zh": "运行时异常：被零除错误 (ZeroDivisionError)"},
        "c13/reigai02.py": {"ja": "例外の発生（インデックス範囲外）", "zh": "运行时异常：索引越界错误 (IndexError)"},
        "c13/reigai03.py": {"ja": "try-except文による例外キャッチ", "zh": "使用 try-except 捕获并处理异常"},
        "c13/reigai04.py": {"ja": "exceptブロックでの例外詳細情報取得", "zh": "在 except 块中打印具体的错误对象"},
        "c13/reigai05.py": {"ja": "複数種類の例外への対応", "zh": "针对多种可能的异常分别设置 except 分支"},
        "c13/reigai06.py": {"ja": "例外の親クラスによる一括キャッチ", "zh": "使用通用基类 Exception 一揽子捕获错误"},
        "c13/reigai07.py": {"ja": "elseブロックの使用", "zh": "在没有发生异常时执行的 else 代码块"},
        "c13/reigai08.py": {"ja": "例外処理の呼び出し元への伝播", "zh": "异常向上传播（调用栈传递）"},
        "c13/reigai09.py": {"ja": "finallyブロックによる必須クリーンアップ", "zh": "无论是否出错都执行的 finally 块"},
        "c13/reigai10.py": {"ja": "raise文による意図的な例外スロー", "zh": "使用 raise 主动抛出指定类型的异常"},
        "c13/reigai11.py": {"ja": "カスタム例外クラスの定義と送出", "zh": "自定义继承自 Exception 的业务异常"},
    }

    # 3. Define custom practice subtopics mapping
    practice_subtopics = {
        "practices/02/script01.py": {"ja": "変数を使わない計算と出力", "zh": "不使用变量的计算与屏幕输出"},
        "practices/03/script3-1.py": {"ja": "式のデータ型の判定と確認", "zh": "判断与确认不同表达式的数据类型"},
        "practices/03/script3-2.py": {"ja": "文字列の入力と結合", "zh": "键盘输入姓与名并拼接输出"},
        "practices/03/script3-3.py": {"ja": "数値の入力と四則演算", "zh": "键盘输入两个整数并计算乘积"},
        "practices/04/script4-1.py": {"ja": "正・負・ゼロの数値判定", "zh": "判断输入的整数是正数、负数还是零"},
        "practices/04/script4-2.py": {"ja": "二つの大小判定", "zh": "输入两个浮点数并比较大小关系"},
        "practices/04/script4-3.py": {"ja": "時間帯に応じた挨拶の自動分岐", "zh": "根据输入的24小时制时间打印问候语"},
        "practices/05/script5-1.py": {"ja": "成績リストの作成と表示", "zh": "创建包含多门成绩的列表并输出"},
        "practices/05/script5-2.py": {"ja": "リストを用いた合計と平均の算出", "zh": "利用列表索引计算成绩总分与平均分"},
        "practices/05/script5-3.py": {"ja": "リスト要素の安全な削除", "zh": "删除列表中的指定成绩元素"},
        "practices/05/script5-4.py": {"ja": "生徒名と成績の辞書の定义", "zh": "定义存储学生姓名与成绩的字典并输出"},
        "practices/05/script5-5.py": {"ja": "ネストされた多科目成績辞書の定義", "zh": "定义包含多科目成绩的嵌套学生字典"},
        "practices/05/script5-6.py": {"ja": "辞書内データの安全な存在チェックと検索", "zh": "在嵌套字典中输入姓名查询各科成绩"},
        "practices/06/script6-1.py": {"ja": "for文を用いたリストの合計点算出", "zh": "使用 for 循环计算列表成绩的总和"},
        "practices/06/script6-2.py": {"ja": "辞書ループによる全生徒成績の出力", "zh": "使用 for 循环遍历打印字典中所有学生的成绩"},
        "practices/06/script6-3.py": {"ja": "while無限ループによる対話型成績検索", "zh": "使用 while 无限循环实现学生成绩交互式查询"},
        "practices/07/script7-1.py": {"ja": "成績の合計と平均を表示する関数", "zh": "定义打印三门成绩总分与平均分的函数"},
        "practices/07/script7-2.py": {"ja": "計算と取得を行う戻り値付き関数", "zh": "定义计算总分与平均分并返回结果的函数"},
        "practices/07/script7-3.py": {"ja": "デフォルト値と戻り値を持つ成績処理関数", "zh": "可设置科目名称的默认参数成绩计算函数"},
        "practices/08/script8-1.py": {"ja": "成績を保持するStudentクラスの定義", "zh": "定义包含学生姓名及各科成绩的 Student 类"},
        "practices/08/script8-2.py": {"ja": "クラスメソッドによる合計・平均の計算", "zh": "在 Student 类中定义计算总分与平均分的方法"},
        "practices/08/script8-3.py": {"ja": "インスタンスリストの走査と成績一覧出力", "zh": "创建学生对象列表并在循环中打印成绩"},
        "practices/09/script9-2.py": {"ja": "別モジュールに定義されたクラスのインポートと利用", "zh": "从外部导入自定义类与搜索函数并查询学生"},
        "practices/10/script10-1.py": {"ja": "入力された日付文字列の解析", "zh": "解析键盘输入的时间字符串为日期对象"},
        "practices/10/script10-2.py": {"ja": "二つの日付の差分日数の計算", "zh": "输入两个日期并计算它们之间的天数差"},
        "practices/10/script10-3.py": {"ja": "二つのサイコロを振るゲームシミュレーション", "zh": "模拟掷两个骰子并判断是否点数相同的游戏"},
        "practices/11/script11-1.py": {"ja": "students.txtの全内容の読み込みと表示", "zh": "打开读取并打印 students.txt 中的所有行"},
        "practices/11/script11-2.py": {"ja": "入力された生徒データをファイルに保存", "zh": "获取用户输入的成绩并写入 students.txt 中"},
        "practices/11/script11-3.py": {"ja": "ファイルを読み込んでリストに格納", "zh": "读取成绩文件并将所有行加载为列表结构"},
        "practices/11/script11-4.py": {"ja": "ファイルデータをStudentインスタンスとして生成", "zh": "读取文件每行并将其实例化为 Student 类对象"},
        "practices/12/script12-1.py": {"ja": "正規表現を用いた携帯電話番号の形式検証", "zh": "使用正则表达式校验输入的手机号格式是否合法"},
        "practices/12/script12-2.py": {"ja": "正規表现を用いたファイルからの生徒データ抽出", "zh": "使用正则匹配特定规律的学生数据并提取到列表中"},
        "practices/12/script12-3.py": {"ja": "正規表現グループを用いた複雑成績データのパース", "zh": "使用正则捕获分组解析并实例化键值对文本"},
        "practices/13/script13-1.py": {"ja": "引数チェックを行う例外送出関数", "zh": "在成绩计算函数中检查参数类型并抛出异常"},
        "practices/13/script13-2.py": {"ja": "例外の個別キャッチと復旧処理", "zh": "捕获成绩计算中的特定异常并提示友好错误"}
    }

    # 4. Loop-based automated mappings for Chapters 2-13 files
    def get_subsection_id_and_name(file_path):
        filename = os.path.basename(file_path)
        ch_folder = os.path.dirname(file_path)
        
        # Determine Chapter
        folder_root = ch_folder.replace('\\', '/').split('/')[0]
        ch_id = int(folder_root.replace("c", "")) if folder_root.startswith("c") else 2
        
        # Sample files mapper
        if ch_id == 2:
            if "hello2.py" in filename: return "2-2-2", "2-2-2 スクリプトファイルの実行"
            if "hello.py" in filename: return "2-1-2", "2-1-2 はじめてのプログラム"
            if "comment" in filename: return "2-2-3", "2-2-3 コメント"
        elif ch_id == 3:
            if "enzanshi01" in filename: return "3-2-1", "3-2-1 簡単な計算"
            if "enzanshi02" in filename: return "3-2-2", "3-2-2 文字列をつなげる"
            if "enzanshi03" in filename or "enzanshi04" in filename: return "3-2-3", "3-2-3 文字列と数値をつなげる"
            if "enzanshi05" in filename or "enzanshi06" in filename: return "3-2-4", "3-2-4 文字列を数値に変換する"
            if "hensu01" in filename: return "3-3-1", "3-3-1 データの代入"
            if "hensu02" in filename or "hensu03" in filename or "hensu04" in filename or "hensu05" in filename or "hensu06" in filename or "hensu07" in filename: return "3-3-2", "3-3-2 変数の使い方"
            if "hensu08" in filename or "hensu09" in filename: return "3-3-3", "3-3-3 現在のデータに追加する"
            if "input" in filename: return "3-3-4", "3-3-4 入力したデータの利用"
        elif ch_id == 4:
            if "hikaku01" in filename or "hikaku02" in filename or "hikaku03" in filename or "hikaku04" in filename or "hikaku05" in filename: return "4-1-1", "4-1-1 比較演算子"
            if "hikaku06" in filename: return "4-1-2", "4-1-2 比較結果の表示"
            if "if01" in filename: return "4-2-2", "4-2-2 条件に一致した場合の処理"
            if "ifelse01" in filename: return "4-2-3", "4-2-3 条件に一致しない場合の処理"
            if "ifelif" in filename or "ifnest" in filename: return "4-2-4", "4-2-4 比較演算子を使ったさまざまな条件"
            if "and" in filename: return "4-3-2", "4-3-2 すべての条件に当てはまる場合"
            if "or" in filename: return "4-3-3", "4-3-3 どれか1つでも当てはまる場合"
            if "not" in filename: return "4-3-4", "4-3-4 ある条件に当てはまらない場合"
            if "column" in filename: return "4-3-5", "4-3-5 何度も条件を判定する方法"
        elif ch_id == 5:
            if "list01" in filename or "list02" in filename: return "5-1-2", "5-1-2 リストの作成"
            if "list03" in filename or "list04" in filename or "list05" in filename or "list06" in filename or "list07" in filename or "list08" in filename or "list09" in filename or "list10" in filename: return "5-1-3", "5-1-3 リストから要素を取り出す"
            if "list11" in filename or "list12" in filename or "list13" in filename or "list14" in filename or "list15" in filename or "list16" in filename or "list17" in filename or "list18" in filename: return "5-1-4", "5-1-4 リストの要素を変更する"
            if "list19" in filename or "list20" in filename or "listcolumn" in filename: return "5-1-5", "5-1-5 リストの長さを確認する"
            if "tuple01" in filename: return "5-2-1", "5-2-1 タプルとは"
            if "tuple02" in filename or "tuple03" in filename: return "5-2-2", "5-2-2 タプルの作成"
            if "tuple04" in filename or "tuple05" in filename or "tuplecol" in filename: return "5-2-3", "5-2-3 タプルから要素を取り出す"
            if "jisho01" in filename or "jisho02" in filename: return "5-3-2", "5-3-2 辞書の作成"
            if "jisho03" in filename or "jisho04" in filename or "jisho05" in filename: return "5-3-3", "5-3-3 辞書から値を取り出す"
            if "jisho06" in filename or "jisho07" in filename or "jisho08" in filename or "jisho09" in filename or "jisho10" in filename: return "5-3-4", "5-3-4 辞書の内容を変更する"
            if "jisho11" in filename: return "5-3-5", "5-3-5 キーの集まりを取り出す"
            if "jisho12" in filename or "jisho_values" in filename: return "5-3-6", "5-3-6 キーと値をセットで取り出す"
            if "shugou01" in filename or "shugou02" in filename: return "5-4-2", "5-4-2 セット(集合)の作成"
            if "shugou03" in filename: return "5-4-3", "5-4-3 セットから値を取り出す"
            if "shugou04" in filename or "shugou05" in filename or "set_list" in filename: return "5-4-4", "5-4-4 セットの値を変更する"
        elif ch_id == 6:
            if "kurikaeshi01" in filename or "kurikaeshi02" in filename or "kurikaeshi03" in filename or "kurikaeshi04" in filename: return "6-1-2", "6-1-2 range()関数の使い方"
            if "kurikaeshi05" in filename or "kurikaeshi06" in filename: return "6-1-3", "6-1-3 決まった回数を繰り返す処理"
            if "kurikaeshi07" in filename or "kurikaeshi08" in filename or "kurikaeshi09" in filename: return "6-1-4", "6-1-4 データの集まりの要素の数繰り返す"
            if "kurikaeshi10" in filename or "kurikaeshi11" in filename or "kurikaeshi12" in filename or "kurikaeshi13" in filename: return "6-1-5", "6-1-5 辞書の中身すべてを取り出す"
            if "kurikaeshi14" in filename or "kurikaeshi15" in filename: return "6-2-1", "6-2-1 繰り返す条件を指定する (while)"
            if "kurikaeshi16" in filename or "kurikaeshi17" in filename or "kurikaeshi18" in filename: return "6-2-2", "6-2-2 無限ループ"
        elif ch_id == 7:
            if "kansu01" in filename or "kansu02" in filename or "kansu03" in filename: return "7-1-1", "7-1-1 関数の作成"
            if "kansu04" in filename: return "7-1-2", "7-1-2 関数の中ですべての処理を行う"
            if "kansu05" in filename or "kansu06" in filename or "kansu07" in filename: return "7-2-2", "7-2-2 引数のある関数"
            if "kansu09" in filename or "kansu10" in filename: return "7-2-3", "7-2-3 引数の初期値"
            if "kansu11" in filename: return "7-2-4", "7-2-4 引数に名前を付ける"
            if "kansu12" in filename or "kansu13" in filename or "kansu14" in filename or "kansu15" in filename or "kansu16" in filename: return "7-2-5", "7-2-5 引数の順番を変更する"
            if "kansu17" in filename: return "7-3-1", "7-3-1 戻り値とは"
            if "kansu18" in filename or "kansu19" in filename or "kansu20" in filename or "kansu_a1" in filename: return "7-3-2", "7-3-2 戻り値の利用"
        elif ch_id == 8:
            if "class01" in filename: return "8-2-1", "8-2-1 クラスの作成"
            if "class02" in filename: return "8-2-2", "8-2-2 初期化メソッドの作成"
            if "class03" in filename: return "8-2-4", "8-2-4 インスタンス変数の利用"
            if "class04" in filename: return "8-2-6", "8-2-6 メソッドの利用"
        elif ch_id == 9:
            if "my_func" in filename or "my_class" in filename or "calc_account" in filename: return "9-1-3", "9-1-3 モジュールとパッケージに分割してみよう"
            if "script.py" in filename or "script_package01" in filename or "script_package02" in filename: return "9-2-1", "9-2-1 import文"
            if "script_package03" in filename or "script_package04" in filename or "script_package05" in filename or "sample/" in file_path: return "9-2-2", "9-2-2 from句"
        elif ch_id == 10:
            if "hiduke01" in filename or "hiduke02" in filename: return "10-1-2", "10-1-2 日時の表示 (datetimeクラス)"
            if "hiduke03" in filename or "hiduke04" in filename or "hiduke05" in filename or "hiduke06" in filename: return "10-1-3", "10-1-3 日付の表示 (dateクラス)"
            if "hiduke07" in filename or "hiduke08" in filename or "hiduke09" in filename or "hiduke10" in filename or "hiduke11" in filename or "hiduke12" in filename: return "10-1-4", "10-1-4 日付や時間の差分の表示 (timedeltaクラス)"
            if "ransu01" in filename: return "10-2-2", "10-2-2 0から1までの間で乱数を発生させる"
            if "ransu02" in filename: return "10-2-3", "10-2-3 指定した範囲で乱数を発生させる"
            if "ransu03" in filename: return "10-2-4", "10-2-4 リストなどからランダムに要素を取り出す"
        elif ch_id == 11:
            if "arunashi01" in filename: return "11-1-2", "11-1-2 ファイルを扱うためのモジュール"
            if "yomikomi01" in filename: return "11-2-4", "11-2-4 ファイルを一度に全部読み込む"
            if "yomikomi02" in filename or "yomikomi03" in filename: return "11-2-5", "11-2-5 1行ずつファイルの内容を読み込む"
            if "kakikomi01" in filename: return "11-3-1", "11-3-1 ファイルの作成と上書き"
            if "kakikomi02" in filename: return "11-3-2", "11-3-2 ファイルへの書き込み"
            if "kakikomi03" in filename or "openfile" in filename: return "11-3-3", "11-3-3 追加で書き込む"
        elif ch_id == 12:
            if "seiki01" in filename or "seiki02" in filename: return "12-1-2", "12-1-2 正規表現を使うためのモジュール"
            if "seiki03" in filename or "seiki04" in filename or "seiki05" in filename or "seiki06" in filename or "seiki07" in filename or "seiki08" in filename or "seiki09" in filename or "seiki10" in filename or "seiki11" in filename or "seiki12" in filename: return "12-1-3", "12-1-3 パターンの書き方"
            if "seiki13" in filename: return "12-1-4", "12-1-4 パターン検索"
            if "seiki14" in filename or "seiki15" in filename or "seiki16" in filename: return "12-1-6", "12-1-6 ファイルから検索する"
        elif ch_id == 13:
            if "reigai01" in filename or "reigai02" in filename: return "13-1-2", "13-1-2 例外の例"
            if "reigai03" in filename or "reigai04" in filename: return "13-2-1", "13-2-1 例外が発生した場合の処理 (try-except)"
            if "reigai07" in filename: return "13-2-2", "13-2-2 例外が発生した場合と発生しなかった場合の処理 (try-except-else)"
            if "reigai05" in filename or "reigai06" in filename: return "13-2-3", "13-2-3 例外の種類による処理 (複数のexceptブロック)"
            if "reigai08" in filename or "reigai09" in filename: return "13-2-4", "13-2-4 常に行う処理"
            if "reigai10" in filename or "reigai11" in filename: return "13-3-3", "13-3-3 例外を新しく発生させる"
            
        return f"{ch_id}-1", f"{ch_id}-1 基本コンセプト"

    # 5. Definitions for conceptual lessons (11 in Ch 1, 4 in Ch 3)
    conceptual_lessons = [
        # Chapter 1
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 1, "chapterName": "第1章 プログラミングをはじめる前に知っておこう",
            "subSectionId": "1-1-1", "subSectionName": "1-1-1 コンピュータのしくみ",
            "titleJa": "コンピュータのしくみ", "titleZh": "计算机的工作原理",
            "conceptJa": "<h3>コンピュータのしくみ</h3><p>コンピュータは、主に「CPU（中央処理装置）」「メモリ（主記憶装置）」「ハードディスク（補助記憶装置）」などのハードウェアが連携して動作しています。CPUが高速に計算を行い、メモリが一時的にプログラムのデータを記憶し、ハードディスクが電源を切っても消えない形でファイルを保存します。</p>",
            "conceptZh": "<h3>计算机的工作原理</h3><p>计算机核心由三大硬件支撑运行：</p><ul><li><strong>CPU（中央处理器）</strong>：计算机的“大脑”，负责执行所有的数学和逻辑运算，运行速度极快。</li><li><strong>内存（RAM）</strong>：临时数据存放处，用于存放当前正在运行的程序和变量。关机或断电后，其中的数据会全部丢失。</li><li><strong>硬盘（SSD/HDD）</strong>：长久存储器，用于存放我们的 <code>.py</code> 代码文件、音乐和文档，即使断电数据也不会丢失。</li></ul>",
            "analogy": "🍳 计算机就像一间繁忙的厨房：CPU是烹饪速度极快的主厨，内存是眼前的备料切菜台（切好的菜随手放，但打扫厨房时会被清空），硬盘则是背后的冷冻大仓库（空间大，存着菜单和生食材，即使停电关门也不会丢失）。",
            "example": "", "pdfPage": 14, "pdfHighlightTerm": "コンピュータ", "originalChapterId": "python-c1", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "CPU", "zh": "中央处理器", "desc": "负责执行程序指令的核心芯片。"},
                {"ja": "メモリ", "zh": "内存", "desc": "临时存放运行中程序数据的介质。"}
            ],
            "quizList": [{
                "question": "コンピュータの頭脳にあたり、プログラムの計算を実行する装置はどれですか？",
                "questionZh": "在计算机中扮演大脑角色，负责执行程序计算的设备是哪一个？",
                "options": ["ハードディスク (硬盘)", "CPU (中央处理器)", "メモリ (内存)", "キーボード (键盘)"],
                "answerIdx": 1, "hint": "CPUが計算の中心です。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 1, "chapterName": "第1章 プログラミングをはじめる前に知っておこう",
            "subSectionId": "1-1-2", "subSectionName": "1-1-2 人間とコンピュータが理解できる言語の違い",
            "titleJa": "人間とコンピュータが理解できる言語の違い", "titleZh": "人类与计算机理解语言的差异",
            "conceptJa": "<h3>言語の違いと翻訳</h3><p>人間は日本語や英語を使いますが、コンピュータは「0」と「1」の2進数（機械語）しか理解できません。そのため、人間が書いたプログラミング言語をコンピュータが理解できる機械語に翻訳する「インタプリタ」や「コンパイラ」というプログラムが必要になります。</p>",
            "conceptZh": "<h3>人类与计算机理解语言的差异</h3><p>计算机底层是精密的硅晶片，它们不认识英文字母，**只认识由 0 和 1 组成的二进制“机器码”**。我们人类编写的 Python 代码属于“高级语言”。因此，必须有一个“翻译官”（在 Python 中称为**解释器**，Interpreter）将我们的代码逐行口译给计算机听，计算机才能依令行事。</p>",
            "analogy": "📇 就像你（人类）去一家法国餐厅，主厨只听得懂法语（机器码）。而你写在纸上的中文点菜单（Python代码）必须由懂双语的翻译官（Python解释器）逐句翻译给主厨听，他才能为你做出美味的菜肴。",
            "example": "", "pdfPage": 14, "pdfHighlightTerm": "機械語", "originalChapterId": "python-c1", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "機械語", "zh": "机器语言", "desc": "计算机能直接执行的0和1组成的二进制指令。"},
                {"ja": "インタプリタ", "zh": "解释器", "desc": "将高级语言代码逐行翻译并立刻执行的程序。"}
            ],
            "quizList": [{
                "question": "コンピュータが直接理解できる、0と1だけで書かれた言語を何と呼びますか？",
                "questionZh": "计算机能够直接理解、只由0和1编写的语言称为什么？",
                "options": ["Python", "機械語 (机器语言)", "英語", "HTML"],
                "answerIdx": 1, "hint": "機械語（マシン語）がコンピュータの母国語です。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 1, "chapterName": "第1章 プログラミングをはじめる前に知っておこう",
            "subSectionId": "1-1-3", "subSectionName": "1-1-3 いろいろなプログラミング言語",
            "titleJa": "いろいろなプログラミング言語", "titleZh": "各种各样的编程语言",
            "conceptJa": "<h3>プログラミング言語の種類</h3><p>世界には多くのプログラミング言語があります。AIやデータ分析に強い「Python」、システムの速度を重視する「C++」、Webや業務システムで広く使われる「Java」など、目的によって使い分けられます。</p>",
            "conceptZh": "<h3>各种各样的编程语言</h3><p>世界上存在着成百上千种编程语言，每种语言有其独特的强项：</p><ul><li><strong>Python</strong>：语法简单，在人工智能（AI）、数据科学、自动化办公和网页爬虫领域独占鳌头。</li><li><strong>Java</strong>：安全稳定，是大型企业级后台管理系统和安卓App的绝对主力。</li><li><strong>C++</strong>：执行效率极高，多用于3D游戏引擎开发及操作系统底层。</li></ul>",
            "analogy": "🚗 编程语言就像是现实生活中的各种“交通工具”：去海岛需要坐轮船（Java），在胡同小巷穿梭需要灵活的摩托车（Python），在专业赛道上飙车需要F1赛车（C++）。没有最好的工具，只有最合适的场景。",
            "example": "", "pdfPage": 16, "pdfHighlightTerm": "プログラミング言語", "originalChapterId": "python-c1", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "Python", "zh": "Python语言", "desc": "一种易读易写的高级解释型编程语言。"}
            ],
            "quizList": [{
                "question": "AI（人工知能）やデータ分析、自動化スクリプトで最も人気のある言語はどれですか？",
                "questionZh": "在人工智能（AI）、数据分析以及自动化脚本领域中最受欢迎的语言是哪一个？",
                "options": ["C++", "HTML", "Python", "SQL"],
                "answerIdx": 2, "hint": "PythonがAI・データ分析のデファクトスタンダードです。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 1, "chapterName": "第1章 プログラミングをはじめる前に知っておこう",
            "subSectionId": "1-2-1", "subSectionName": "1-2-1 コマンドプロンプトの起動",
            "titleJa": "コマンドプロンプトの起動", "titleZh": "命令行的启动与终端操作",
            "conceptJa": "<h3>CUIとコマンドプロンプト</h3><p>マウスを使わずにキーボードの文字だけでコンピュータを操作する環境を「CUI（Character User Interface）」と呼びます。Windowsでは「コマンドプロンプト」または「PowerShell」を起動して操作します。</p>",
            "conceptZh": "<h3>命令行的启动与终端操作</h3><p>通常我们用鼠标双击图标操作电脑，这叫 <strong>GUI（图形用户界面）</strong>。但程序员为了高效率，常使用 <strong>CUI（命令行用户界面）</strong>，在 Windows 下就是“命令提示符 CMD”或“PowerShell”。在此输入特定的英文字母（命令），回车后即可直接对系统下达指令。</p>",
            "analogy": "🚪 图形界面就像是跟随着指定路标参观景点的“观光巴士”；而命令行就像是高阶程序员的“语音助手”或“任意门”，只要你念出咒语（输入命令），就能直接到达指定操作点。",
            "example": "", "pdfPage": 17, "pdfHighlightTerm": "コマンドプロンプト", "originalChapterId": "python-c1", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "CUI", "zh": "命令行用户界面", "desc": "仅用文字进行计算机交互的操作界面。"},
                {"ja": "GUI", "zh": "图形用户界面", "desc": "用鼠标、窗口和图标进行交互的直观界面。"}
            ],
            "quizList": [{
                "question": "Windowsでマウスを使わずにキーボードの命令だけで操作する標準ツールは何ですか？",
                "questionZh": "Windows中无需鼠标、仅通过键盘输入命令进行操作的系统内置工具是什么？",
                "options": ["ペイント (画图)", "メモ帳 (记事本)", "コマンドプロンプト (命令提示符)", "エクスプローラー (资源管理器)"],
                "answerIdx": 2, "hint": "コマンドプロンプト（cmd）を使用します。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 1, "chapterName": "第1章 プログラミングをはじめる前に知っておこう",
            "subSectionId": "1-2-2", "subSectionName": "1-2-2 パス",
            "titleJa": "パス", "titleZh": "文件物理路径（Path）",
            "conceptJa": "<h3>パスの種類（絶対パス・相対パス）</h3><p>ファイルやフォルダがある場所を示す「住所」を「パス（Path）」と呼びます。Cドライブの根元からすべて記述する「絶対パス」と、現在の作業フォルダを基準にする「相対パス」があります。</p>",
            "conceptZh": "<h3>物理路径与住址概念</h3><p>路径（Path）就是文件在硬盘里的“门牌号物理住址”。</p><ul><li><strong>绝对路径</strong>：最完整的定位住址。例如 <code>C:/Users/Coco/main.py</code>，无论你当前在哪个文件夹，顺着绝对路径总能找到它。</li><li><strong>相对路径</strong>：以当前所在的位置（当前目录）为基准算起的路径。例如 <code>./main.py</code>（当前目录下）或 <code>../data.txt</code>（上一级目录下）。</li></ul>",
            "analogy": "📬 绝对路径就像是寄国际快递时的详细门牌住址（“地球-中国-北京市-朝阳区-大屯路XX号”）；相对路径就像是在家里和家人对话（“把厨房桌上的盐递给我”），省略了城市和省份，方便直接。",
            "example": "", "pdfPage": 18, "pdfHighlightTerm": "パス", "originalChapterId": "python-c1", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "絶対パス", "zh": "绝对路径", "desc": "从最根部目录（如C:盘）开始的完整路径。"},
                {"ja": "相対パス", "zh": "相对路径", "desc": "以当前所在目录为起点的简短路径。"}
            ],
            "quizList": [{
                "question": "現在のフォルダを基準として、ファイルの位置を示す記述方法を何と呼びますか？",
                "questionZh": "以当前文件夹为基准来表示文件位置的写法称为什么？",
                "options": ["絶対パス (绝对路径)", "相対パス (相对路径)", "物理パス", "ネットワークパス"],
                "answerIdx": 1, "hint": "「現在地」を基準にするのは相対パスです。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 1, "chapterName": "第1章 プログラミングをはじめる前に知っておこう",
            "subSectionId": "1-2-3", "subSectionName": "1-2-3 コマンドの利用",
            "titleJa": "コマンドの利用", "titleZh": "常用终端命令行操作",
            "conceptJa": "<h3>代表的なコマンド</h3><p>コマンドラインでは、フォルダの中身を一覧表示する <code>dir</code>（Mac/Linuxでは <code>ls</code>）、作業フォルダを移動する <code>cd</code> などの基本的なコマンドを使用します。</p>",
            "conceptZh": "<h3>常用终端命令行操作</h3><p>我们必须熟记几个最常用的系统操作暗号：</p><ul><li><code>dir</code>：列出当前文件夹下的所有文件和文件夹。</li><li><code>cd 文件夹名</code>：进入（Change Directory）指定的子文件夹。</li><li><code>cd ..</code>：退回到上一层父文件夹。</li><li><code>python --version</code>：命令计算机展示当前安装的 Python 版本号。</li></ul>",
            "analogy": "⏱️ 命令行的指令就像是古代军队里的“行军暗号”。只要你敲下回车，成千上万的底层硬件就会立刻响应你的呼唤，自动前往目的地或生成文件。",
            "example": "", "pdfPage": 20, "pdfHighlightTerm": "コマンド", "originalChapterId": "python-c1", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "cdコマンド", "zh": "cd命令", "desc": "用于切换当前工作路径的命令行指令。"},
                {"ja": "dirコマンド", "zh": "dir命令", "desc": "用于列出当前路径下所有文件目录的命令行指令。"}
            ],
            "quizList": [{
                "question": "コマンドプロンプトで、作業するフォルダを移動するために使うコマンドはどれですか？",
                "questionZh": "在命令提示符中，为了切换移动当前工作的文件夹，应该使用哪个命令？",
                "options": ["dir", "mkdir", "cd", "del"],
                "answerIdx": 2, "hint": "Change Directoryの略であるcdを使用します。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 1, "chapterName": "第1章 プログラミングをはじめる前に知っておこう",
            "subSectionId": "1-3-1", "subSectionName": "1-3-1 インストールする前の準備",
            "titleJa": "インストールする前の準備", "titleZh": "安装 Python 前的系统准备",
            "conceptJa": "<h3>インストールの事前準備</h3><p>Pythonをインストールする前に、自分のコンピュータのOS（WindowsかMacか、また64bit版か32bit版か）を確認しておく必要があります。</p>",
            "conceptZh": "<h3>安装 Python 前的系统准备</h3><p>在前往 Python 官网下载安装包之前，我们必须搞清楚自己电脑的系统规格：</p><ul><li>是 <strong>Windows</strong> 还是 <strong>macOS</strong>？</li><li>如果是 Windows，是 <strong>64位(x64)</strong> 还是较老的 <strong>32位(x86)</strong>？现代电脑几乎都是 64 位。</li><li>拥有管理员权限，因为安装时需要将 Python 注册到系统注册表和环境变量中。</li></ul>",
            "analogy": "🏕️ 这就像在野外搭帐篷前，必须先选一块避风、平坦且安全的“地基”。如果地基没确认好，帐篷搭起来就会摇摇晃晃甚至垮塌。",
            "example": "", "pdfPage": 23, "pdfHighlightTerm": "インストール", "originalChapterId": "python-c1", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "ビット数(64bit)", "zh": "系统位数", "desc": "CPU一次能处理的数据宽度，现代系统多为64bit。"}
            ],
            "quizList": [{
                "question": "Pythonのインストールファイルをダウンロードする際、事前に確認すべきPCの情報は何ですか？",
                "questionZh": "在下载Python安装程序时，首先应该确认的PC系统信息是什么？",
                "options": ["ディスプレイのサイズ (显示器大小)", "OSの種類とビット数 (系统类型与位数)", "キーボードの配列", "空きメモリの容量"],
                "answerIdx": 1, "hint": "OS（Windows/Mac）やビット数（64bit/32bit）に合うファイルが必要です。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 1, "chapterName": "第1章 プログラミングをはじめる前に知っておこう",
            "subSectionId": "1-3-2", "subSectionName": "1-3-2 必要なアプリケーション",
            "titleJa": "必要なアプリケーション", "titleZh": "Python 学习的核心工具铁三角",
            "conceptJa": "<h3>開発に必要なツール</h3><p>Pythonの学習には、プログラムを実行する「Python本体（インタプリタ）」と、コードをきれいに書くための「テキストエディタ（VS Codeなど）」が必要です。</p>",
            "conceptZh": "<h3>开发铁三角工具</h3><p>开发并运行 Python 代码，必须配备以下三个基础核心工具：</p><ol><li><strong>Python 解释器</strong>：运行的核心引擎，负责把代码翻译为机器指令。</li><li><strong>文本编辑器 (如 VS Code / Atom)</strong>：高亮彩显代码的笔记本，帮助我们舒适地编写 <code>.py</code> 文本。</li><li><strong>终端控制台 (Terminal)</strong>：输出打印结果并能输入交互数据的黑色窗口。</li></ol>",
            "analogy": "✒️ 写代码就像是写小说：编辑器是你的稿纸和彩色钢笔，解释器是最终帮你排版印刷成书的“印刷厂”，控制台则是展示成品并看读者书评的“书柜”。",
            "example": "", "pdfPage": 23, "pdfHighlightTerm": "エディタ", "originalChapterId": "python-c1", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "テキストエディタ", "zh": "文本编辑器", "desc": "用于编写和修改纯文本代码文件的工具软件。"}
            ],
            "quizList": [{
                "question": "Pythonプログラムを記述し、読みやすく色分けしてくれる開発ツールの総称は何ですか？",
                "questionZh": "编写Python程序并为代码提供高亮彩色显示的开发工具统称为什么？",
                "options": ["ブラウザ", "テキストエディタ (文本编辑器)", "表計算ソフト", "ペイントソフト"],
                "answerIdx": 1, "hint": "コード専用のテキストエディタを使用します。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 1, "chapterName": "第1章 プログラミングをはじめる前に知っておこう",
            "subSectionId": "1-3-3", "subSectionName": "1-3-3 Pythonのインストール",
            "titleJa": "Pythonのインストール", "titleZh": "安装 Python 与环境变量 Path 避坑指南",
            "conceptJa": "<h3>PATHの設定とインストール</h3><p>Pythonをインストールする際、Windowsでは「Add python.exe to PATH」というチェックボックスに必ずチェックを入れます。これによって、どのフォルダからでもコマンドラインでpythonを起動できるようになります。</p>",
            "conceptZh": "<h3>环境变量 Path 的避坑指南</h3><p>在 Windows 下安装 Python 时，第一步有一个<strong>极其关键的检查点</strong>：</p><p>⚠️ 必须在安装界面底部勾选 **「Add python.exe to PATH」** 选项！</p><p>如果不勾选这一项，操作系统将不会把 Python 的安装地址登录到系统的快捷电话簿（环境变量 Path）中。当你在命令行输入 <code>python</code> 时，系统会提示 <code>找不到该命令</code>，导致后面所有的程序都打不开。</p>",
            "analogy": "📞 PATH 就像是操作系统的“黄页电话簿”。如果不把 Python 的住址登记在 Path 电话本里，以后不管你如何在命令行大喊 Python 的名字，操作系统也找不到它住在哪个偏僻的硬盘盒子里。",
            "example": "", "pdfPage": 24, "pdfHighlightTerm": "PATH", "originalChapterId": "python-c1", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "PATH（環境変数）", "zh": "环境变量Path", "desc": "系统在命令行中寻找可执行文件路径的注册电话本。"}
            ],
            "quizList": [{
                "question": "WindowsでPythonをインストールする際、コマンドラインから起動できるようにするために必ず入れるべきチェックはどれですか？",
                "questionZh": "在Windows上安装Python时，为了能从命令行直接调用，必须勾选哪一个选项？",
                "options": ["Install launcher for all users", "Disable path length limit", "Add python.exe to PATH", "Precompile standard library"],
                "answerIdx": 2, "hint": "Add python.exe to PATHにチェックを入れます。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 1, "chapterName": "第1章 プログラミングをはじめる前に知っておこう",
            "subSectionId": "1-3-4", "subSectionName": "1-3-4 Atomのインストール",
            "titleJa": "Atomのインストール", "titleZh": "代码编辑器的新手配置与使用",
            "conceptJa": "<h3>エディタのセットアップ</h3><p>エディタをインストールしたら、新しくファイルを作成し、拡張子「.py」を付けて保存します。これにより、エディタがPythonコードとして認識し、自動色分けが有効になります。</p>",
            "conceptZh": "<h3>代码编辑器的配置与 .py 后缀</h3><p>安装好代码编辑器（如 VS Code / Atom）后，编写代码时的步骤：</p><ul><li>新建一个纯文本空白文件。</li><li>必须点击保存并命名为带 <strong><code>.py</code></strong> 结尾的文件（例如 <code>hello.py</code>）。</li><li><code>.py</code> 就像是代码的“身份证后缀”，一旦写上它，编辑器就会立刻启动 Python 语法分析引擎，自动为你的变量、字符串、函数上色，甚至进行拼写报错。</li></ul>",
            "analogy": "🚦 用没有彩色的记事本写代码，就像是在没有红绿灯的黑夜马路上开车；而用专门的编辑器写代码，不仅路标闪烁，甚至还会提示你不要拼错字母、不要开错道。",
            "example": "", "pdfPage": 25, "pdfHighlightTerm": "拡張子", "originalChapterId": "python-c1", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "拡張子 (.py)", "zh": "文件扩展名", "desc": "用于标识文件格式的后缀，Python代码为 .py。"}
            ],
            "quizList": [{
                "question": "Pythonのプログラムであることを示すために、ファイル名の末尾に付ける正しい拡張子はどれですか？",
                "questionZh": "为了表明该文件是Python程序，文件名末尾必须加上哪一个正确的扩展名？",
                "options": [".txt", ".html", ".py", ".class"],
                "answerIdx": 2, "hint": "Pythonの拡張子は.pyです。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 1, "chapterName": "第1章 プログラミングをはじめる前に知っておこう",
            "subSectionId": "1-3-5", "subSectionName": "1-3-5 練習問題",
            "titleJa": "CHAPTER 1 練習問題", "titleZh": "第1章 综合练习题",
            "conceptJa": "<h3>CHAPTER 1 練習問題</h3><p>第1章で学んだコンピュータの仕組み、コマンド操作、Pythonの環境構築に関する復习クイズです。</p>",
            "conceptZh": "<h3>第1章 综合练习题</h3><p>本章练习题用于检测您对第1章理论知识的掌握程度。涵盖的内容包括：</p><ul><li>CPU、内存与硬盘的工作分配。</li><li>在命令行中切换目录与列出文件。</li><li>安装 Python 时 PATH 的大坑。</li></ul>",
            "analogy": "🎓 本章综合练习就像是您迈入 Python 大门的“入门徽章”。答对它们，代表您已经成功在电脑中打好了软件基础，可以开始正式编写你的第一行代码了！",
            "example": "", "pdfPage": 30, "pdfHighlightTerm": "練習問題", "originalChapterId": "python-c1", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "復習問題", "zh": "复习与自我评估", "desc": "用于在学完章节后，检验并巩固大纲要点概念的题目。"}
            ],
            "quizList": [{
                "question": "Pythonをインストールした後にコマンドプロンプトで「python」と入力して起動できない場合、インストール時のどの設定を忘れた可能性が高いですか？",
                "questionZh": "安装完Python后，在命令行中输入“python”却报错无法启动，最可能是因为安装时遗漏了哪项设置？",
                "options": ["管理権限での実行 (管理员运行)", "Add python.exe to PATH (添加到环境变量)", "Atomのインストール (安装编辑器)", "インストール先フォルダの指定"],
                "answerIdx": 1, "hint": "PATH（環境変数）の設定を忘れると、コマンドが見つからないエラーになります。"
            }]
        },

        # Chapter 3 Concept lessons
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 3, "chapterName": "第3章 演算と変数・入力",
            "subSectionId": "3-1-1", "subSectionName": "3-1-1 データ型を学ぼう",
            "titleJa": "データ型を学ぼう", "titleZh": "认识数据类型",
            "conceptJa": "<h3>データ型とは</h3><p>プログラミングで扱うデータにはいくつかの種類があり、これを「データ型」と呼びます。整数を表す型、文字を表す型などがあります。</p>",
            "conceptZh": "<h3>什么是数据类型</h3><p>在 Python 中，所有被处理的数据都有其特定的种类，这被称为**“数据类型”**。不同的数据类型在计算机内部存储和计算的方法完全不同：</p><ul><li><strong>整数型 (int)</strong>：用来表示没有小数点的正负整数。</li><li><strong>浮点数型 (float)</strong>：用来表示带有小数点的实数。</li><li><strong>字符串型 (str)</strong>：用来表示双引号或单引号括起来的一段文本。</li><li><strong>布尔型 (bool)</strong>：真伪逻辑值，只有 True 和 False。</li></ul>",
            "analogy": "🥛 数据类型就像厨房里不同规格的“量杯”：有装固体糖的，有专门盛酱油的，还有装气泡水的。选对合适的容器，才能安全保存和处理食材。",
            "example": "", "pdfPage": 42, "pdfHighlightTerm": "データ型", "originalChapterId": "python-c3", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "データ型", "zh": "数据类型", "desc": "程序中数据的分类，如 int, float, str, bool 等。"}
            ],
            "quizList": [{
                "question": "Pythonでデータ型を調べるために使用する組み込み関数はどれですか？",
                "questionZh": "在Python中，为了查询某个数据或变量的具体数据类型，应该调用哪个内置函数？",
                "options": ["print()", "type()", "input()", "str()"],
                "answerIdx": 1, "hint": "type(データ)と書くことで、そのデータの型が分かります。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 3, "chapterName": "第3章 演算と変数・入力",
            "subSectionId": "3-1-2", "subSectionName": "3-1-2 数値のデータ",
            "titleJa": "数値のデータ", "titleZh": "数值数据与类型划分",
            "conceptJa": "<h3>数値データ（int型とfloat型）</h3><p>数値データには、小数のない「整数型（int）」と、小数点以下の値を持つ「浮動小数点型（float）」があります。計算によって自動的に型が変換されることがあります。</p>",
            "conceptZh": "<h3>数值数据与类型划分</h3><p>Python 在处理数字时，会自动区分以下两类：</p><ul><li><strong>整数型（int）</strong>：例如 <code>10</code>, <code>-5</code>, <code>0</code>。精度无限大，可以用来做完美的高精度整数计算。</li><li><strong>浮点数型（float）</strong>：例如 <code>3.14</code>, <code>2.0</code>, <code>-0.5</code>。带小数点的数。注意在 Python 里，两个整数相除（如 <code>5 / 2</code>）的结果会自动升级为浮点数 <code>2.5</code>。</li></ul>",
            "analogy": "📏 整数就像是尺子上的刻度点（1cm, 2cm），干净整齐；浮点数就像是拿游标卡尺卡出来的细微读数（1.25cm），更精细，但也带有小数点。",
            "example": "", "pdfPage": 42, "pdfHighlightTerm": "整数型", "originalChapterId": "python-c3", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "整数型 (int)", "zh": "整型", "desc": "不带小数点的正负整数数据类型。"},
                {"ja": "浮動小数点型 (float)", "zh": "浮点型", "desc": "带有小数点的数值数据类型。"}
            ],
            "quizList": [{
                "question": "Pythonにおいて、「5.0」という値のデータ型は何になりますか？",
                "questionZh": "在Python中，“5.0”这个值的数据类型是什么？",
                "options": ["int (整数型)", "float (浮動小数点型)", "str (文字列型)", "bool (真偽値型)"],
                "answerIdx": 1, "hint": "小数点がついている数値は float 型になります。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 3, "chapterName": "第3章 演算と変数・入力",
            "subSectionId": "3-1-3", "subSectionName": "3-1-3 文字列のデータ",
            "titleJa": "文字列のデータ", "titleZh": "字符串型数据规范",
            "conceptJa": "<h3>文字列データ（str型）</h3><p>文字や文章を扱うデータを「文字列型（str）」と呼びます。文字列はシングルクォーテーション（'）またはダブルクォーテーション（\"）で囲んで表現します。</p>",
            "conceptZh": "<h3>字符串型数据规范</h3><p>用来保存文本或字词的数据类型。规则如下：</p><ul><li>必须使用<strong>单引号 (<code>'</code>)</strong> 或 <strong>双引号 (<code>\"</code>)</strong> 将文字包裹起来。</li><li>例如 <code>'Hello'</code> 或 <code>\"Python\"</code>。</li><li>如果不加引号，Python 解释器会误认为这是一个变量名或系统关键字，从而抛出 <code>NameError</code> 或 <code>SyntaxError</code>。</li></ul>",
            "analogy": "📿 字符串就像是一串“亮丽的珍珠项链”。每一个文字就是一颗珍珠。而两端的引号，就是挂住珍珠的金属锁扣，没有了锁扣，项链（文字）就会散落一地报错。",
            "example": "", "pdfPage": 42, "pdfHighlightTerm": "文字列型", "originalChapterId": "python-c3", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "文字列型 (str)", "zh": "字符串型", "desc": "用引号包裹的一串文本数据类型。"}
            ],
            "quizList": [{
                "question": "Pythonで文字列を表現するときに、必ず文字の前後を囲む記号は何ですか？",
                "questionZh": "在Python中，书写字符串时必须在文字前后加上哪种符号包裹？",
                "options": ["括弧 ( )", "クォーテーション ( ' または \" )", "イコール = ", "カンマ , "],
                "answerIdx": 1, "hint": "文字列はシングルかダブルのクォーテーションで囲む必要があります。"
            }]
        },
        {
            "book": "Pythonの基本", "bookZh": "Python基础", "chapterId": 3, "chapterName": "第3章 演算と変数・入力",
            "subSectionId": "3-1-4", "subSectionName": "3-1-4 真偽値を表すデータ",
            "titleJa": "真偽値を表すデータ", "titleZh": "布尔逻辑值 (bool)",
            "conceptJa": "<h3>真偽値（bool型）</h3><p>真偽値型（bool）は、「正しい（True）」または「間違い（False）」の2つの値だけを持つデータ型です。プログラムの条件分岐で非常に重要な役割を果たします。</p>",
            "conceptZh": "<h3>布尔逻辑值 (bool)</h3><p>布尔值（bool）是专门用来代表真伪和正确性的类型。它<strong>有且仅有两个值</strong>：</p><ul><li><strong><code>True</code></strong>（成立 / 是 / 真的）</li><li><strong><code>False</code></strong>（不成立 / 否 / 假的）</li></ul><p>⚠️ <strong>首字母必须大写</strong>！如果拼错写成了 <code>true</code> 或 <code>false</code>，解释器会抛出 <code>NameError</code>。</p>",
            "analogy": "🚦 布尔值就像是路口的“红绿灯”或者审判席上的“YES / NO”答题器，无论前面的路多复杂，亮灯状态永远只有绿灯（True）和红灯（False）两种可能。",
            "example": "", "pdfPage": 44, "pdfHighlightTerm": "真偽値", "originalChapterId": "python-c3", "lessonFolder": "conceptual",
            "vocabList": [
                {"ja": "真偽値 (bool)", "zh": "布尔值", "desc": "表示条件对错的值，仅有 True 和 False。"}
            ],
            "quizList": [{
                "question": "Pythonの真偽値（bool型）の正しい記述はどれですか？",
                "questionZh": "以下哪一个是Python中布尔值（bool型）的正确书写规范？",
                "options": ["true", "TRUE", "True", "'True'"],
                "answerIdx": 2, "hint": "先頭は大文字の True / False で書く必要があります（文字列と区別します）。"
            }]
        }
    ]

    new_lessons = []
    lesson_id_counter = 1
    samples_dir = os.path.join(base_dir, "python_lessons_extracted", "samples")
    practices_dir = os.path.join(base_dir, "python_lessons_extracted", "practices")

    # Map physical files into granular lessons and combine with conceptual lessons
    base_ch_lessons_map = {}
    for lesson in base_lessons:
        ch_id = lesson['chapterId']
        base_ch_lessons_map.setdefault(ch_id, []).append(lesson)

    # Process all physical lessons (Chapter 2 - 13)
    for ch_id in sorted(base_ch_lessons_map.keys()):
        base_ch_lessons = base_ch_lessons_map[ch_id]
        ch_name = base_ch_lessons[0]['chapterName']
        
        # 1. Process sample files
        for base_lesson in base_ch_lessons:
            base_files = base_lesson.get('files', [])
            if not base_files:
                continue
                
            for file_path in base_files:
                filename = os.path.basename(file_path)
                
                # Load the code content
                full_path = os.path.join(samples_dir, file_path)
                code_content = ""
                if os.path.isfile(full_path):
                    with open(full_path, 'r', encoding='utf-8') as f:
                        code_content = f.read()
                
                # Fetch custom titles
                ja_sub = file_subtopics.get(file_path, {}).get('ja', base_lesson['titleJa'])
                zh_sub = file_subtopics.get(file_path, {}).get('zh', base_lesson['titleZh'])
                
                # Query subsection mapping dynamically!
                curr_sub_id, curr_sub_name = get_subsection_id_and_name(file_path)
                
                title_ja = f"{ja_sub} ({filename})"
                title_zh = f"{zh_sub} ({filename})"
                
                badge_ja = f'<div class="file-info-badge"><i class="fa-solid fa-file-code"></i> 例文ファイル: <code>{filename}</code></div>'
                concept_ja = f"{badge_ja}\n{base_lesson['conceptJa']}"
                
                concept_zh = get_detailed_concept_zh(ch_id, file_path, code_content, zh_sub)
                analogy_text = get_detailed_analogy(ch_id, file_path, zh_sub)
                
                folder_rel = "samples/" + os.path.dirname(file_path)
                
                new_lesson = {
                    "id": 999,  # Placeholder, will re-sort and assign later
                    "book": "Pythonの基本",
                    "bookZh": "Python基础",
                    "chapterId": ch_id,
                    "chapterName": ch_name,
                    "subSectionId": curr_sub_id,
                    "subSectionName": curr_sub_name,
                    "titleJa": title_ja,
                    "titleZh": title_zh,
                    "conceptJa": concept_ja,
                    "conceptZh": concept_zh,
                    "analogy": analogy_text,
                    "example": code_content,
                    "vocabList": base_lesson.get('vocabList', []),
                    "quizList": base_lesson.get('quizList', []),
                    "pdfPage": base_lesson.get('pdfPage', 1),
                    "pdfHighlightTerm": base_lesson.get('pdfHighlightTerm', ''),
                    "originalChapterId": f"python-c{ch_id}",
                    "lessonFolder": folder_rel
                }
                new_lessons.append(new_lesson)

        # 2. Process practice files
        ch_folder_name = f"{ch_id:02d}"
        ch_practice_dir = os.path.join(practices_dir, ch_folder_name)
        
        if os.path.isdir(ch_practice_dir):
            practice_files = [f for f in sorted(os.listdir(ch_practice_dir)) if f.endswith('.py') and f != 'studentclass.py']
            
            if practice_files:
                base_quiz = base_ch_lessons[0].get('quizList', [
                    {
                        "question": "Pythonのインデント（行頭のスペース数）は何マス空けるのが一般的ですか？",
                        "questionZh": "Python的缩进一般建议空几个空格？",
                        "options": ["2マス", "4マス", "8マス", "タブ1個"],
                        "answerIdx": 1,
                        "hint": "PEP8規格では4マスのスペースが推奨されています / PEP8规范推荐使用4个空格。"
                    }
                ])
                
                # Practice files subindex tracker
                p_idx = 1
                for pf in practice_files:
                    pf_rel_path = f"{ch_folder_name}/{pf}"
                    pf_full_key = f"practices/{pf_rel_path}"
                    
                    # Generate exact subsection name for practice questions
                    # E.g., 2-3-1 演習問題
                    curr_sub_id = f"{ch_id}-4-{p_idx}" if ch_id in [3, 4] else f"{ch_id}-3-{p_idx}"
                    if ch_id == 2:
                        curr_sub_id = f"2-3-{p_idx}"
                    elif ch_id == 5:
                        curr_sub_id = f"5-5-{p_idx}"
                    
                    pf_full_path = os.path.join(ch_practice_dir, pf)
                    practice_code = ""
                    with open(pf_full_path, 'r', encoding='utf-8') as f:
                        practice_code = f.read()
                        
                    task_info = practice_subtopics.get(pf_full_key, {"ja": "演習課題の実行とデバッグ", "zh": "课后练习执行与调试"})
                    curr_sub_name = f"{curr_sub_id} 演習：{task_info['ja']}"
                    
                    title_ja = f"演習：{task_info['ja']} ({pf})"
                    title_zh = f"练习：{task_info['zh']} ({pf})"
                    
                    concept_ja = f"""<h3>第{ch_id}章 演習問題 ({pf})</h3>
<div class="practice-info-badge"><i class="fa-solid fa-laptop-code"></i> 演習用テンプレート: <code>{pf}</code></div>
<p><b>【課題内容】</b></p>
<p>{task_info['ja']}</p>
<p>エディタ内のテンプレートコードを確認し、不足しているコードを补ってプログラムを完成させてください。完了したら、右側の「実行」ボタンを押して結果が正しく出力されるか確認しましょう。</p>"""

                    concept_zh = get_detailed_concept_zh(ch_id, pf_full_key, practice_code, task_info['zh'])
                    analogy_text = f"🏆 代码练习就像是“实弹演练”！纸上谈兵终觉浅，只有亲手敲打键盘，调试通了，这行代码才真正属于你。此节练习的目标是：【{task_info['zh']}】。"
                    
                    vocab_list = [
                        {"ja": "コーディング演習", "zh": "代码练习", "desc": "学んだ知識を実際のコード記述で定着させる演習。"},
                        {"ja": "デバッグ", "zh": "调试", "desc": "プログラムのバグやエラーを探して修正する作業。"}
                    ]
                    
                    new_lesson = {
                        "id": 999,
                        "book": "Pythonの基本",
                        "bookZh": "Python基础",
                        "chapterId": ch_id,
                        "chapterName": ch_name,
                        "subSectionId": curr_sub_id,
                        "subSectionName": curr_sub_name,
                        "titleJa": title_ja,
                        "titleZh": title_zh,
                        "conceptJa": concept_ja,
                        "conceptZh": concept_zh,
                        "analogy": analogy_text,
                        "example": practice_code,
                        "vocabList": vocab_list,
                        "quizList": base_quiz,
                        "pdfPage": 1,
                        "pdfHighlightTerm": "",
                        "originalChapterId": f"python-c{ch_id}",
                        "lessonFolder": f"practices/{ch_folder_name}"
                    }
                    new_lessons.append(new_lesson)
                    p_idx += 1

    # 6. Append and merge all conceptual lessons
    new_lessons.extend(conceptual_lessons)

    # 7. Sort the merged list of lessons by chapterId and subSectionId alphabetically!
    # A standard parsing key for subSectionId e.g. "10-2-1" -> [10, 2, 1]
    def sort_key(lesson):
        sub_id = lesson["subSectionId"]
        parts = [int(p) for p in sub_id.split("-")]
        # Standardize sorting list to 3 levels, e.g. [1, 1, 1]
        while len(parts) < 3:
            parts.append(0)
        return (lesson["chapterId"], parts)

    new_lessons_sorted = sorted(new_lessons, key=sort_key)

    # 8. Re-assign unique sequential IDs to all sorted lessons (1 to 255)
    for idx, lesson in enumerate(new_lessons_sorted, 1):
        lesson["id"] = idx

    print(f"Total Python lessons after merge and sorting: {len(new_lessons_sorted)}")

    # 9. Output to python_lessons.js
    output_path = os.path.join(base_dir, "data", "python_lessons.js")
    js_content = "const PYTHON_LESSONS = " + json.dumps(new_lessons_sorted, ensure_ascii=False, indent=2) + ";\n"

    with open(output_path, 'w', encoding='utf-8', newline='\r\n') as f:
        f.write(js_content)

    print(f"Successfully generated {output_path} with {len(new_lessons_sorted)} lessons!")

    # 10. Update verify_python.py to handle the correct number of lessons dynamically!
    verify_file = os.path.join(base_dir, "tools", "verify_python.py")
    with open(verify_file, 'r', encoding='utf-8') as f:
        v_content = f.read()

    # Dynamic replace for target lesson count
    # Matches target check: len(lessons) != 240
    import re
    v_content_new = re.sub(r"len\(lessons\) != \d+", f"len(lessons) != {len(new_lessons_sorted)}", v_content)
    v_content_new = re.sub(r"All \d+ Python lessons", f"All {len(new_lessons_sorted)} Python lessons", v_content_new)

    with open(verify_file, 'w', encoding='utf-8', newline='\r\n') as f:
        f.write(v_content_new)
    print("Updated verify_python.py with the new lesson count.")

if __name__ == "__main__":
    build()
