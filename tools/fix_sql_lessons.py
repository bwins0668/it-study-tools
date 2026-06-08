import os
import shutil

def fix_lessons():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    bak_path = os.path.join(base_dir, "data", "lessons.js.bak")
    target_path = os.path.join(base_dir, "data", "lessons.js")
    
    if not os.path.exists(bak_path):
        print("Error: Backup file lessons.js.bak does not exist.")
        return
        
    with open(bak_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # 查找 [ 符号以定位数组的起点
    array_start = content.find("[")
    if array_start == -1:
        print("Error: Could not find array start in backup.")
        return
        
    header_text = content[:array_start+1]
    
    # 括号匹配算法提取每个独立的课程大对象
    blocks = []
    i = array_start + 1
    while i < len(content):
        # 寻找大对象 {} 块的起点
        if content[i] == '{':
            start = i
            count = 1
            i += 1
            while count > 0 and i < len(content):
                if content[i] == '{':
                    count += 1
                elif content[i] == '}':
                    count -= 1
                i += 1
            end = i
            blocks.append(content[start:end])
        else:
            i += 1
            
    print(f"Extracted {len(blocks)} clean lesson blocks from backup via Bracket Counting.")
    
    # 定义 SQL 章节层级关系映射
    def get_sql_hierarchy(lesson_id):
        if lesson_id in [1, 2]:
            return 1, "1. 关系型数据库与SQL入门", "1-1", "1-1 数据库的基础"
        elif lesson_id in [3, 4, 5, 6, 7, 8]:
            return 2, "2. 数据检索核心 (SELECT)", "2-1", "2-1 基础检索与WHERE过滤"
        elif lesson_id in [9, 10, 11, 12]:
            return 2, "2. 数据检索核心 (SELECT)", "2-2", "2-2 范围与模糊查询"
        elif lesson_id in [13, 14, 15]:
            return 2, "2. 数据检索核心 (SELECT)", "2-3", "2-3 排序与分页限制"
        elif lesson_id in [16, 17]:
            return 3, "3. SQL 函数与高级数据变换", "3-1", "3-1 常用内置函数"
        elif lesson_id in [18, 19, 20, 21]:
            return 3, "3. SQL 函数与高级数据变换", "3-2", "3-2 聚合与分组统计"
        elif lesson_id in [22, 23, 24, 25]:
            return 4, "4. 关联查询与子查询", "4-1", "4-1 表连接基础"
        elif lesson_id in [26, 27, 28, 29]:
            return 4, "4. 关联查询与子查询", "4-2", "4-2 子查询与合并"
        elif lesson_id in [30, 31, 32]:
            return 5, "5. 数据修改与表管理", "5-1", "5-1 写入、更新与删除"
        elif lesson_id == 33:
            return 5, "5. 数据修改与表管理", "5-2", "5-2 事务与锁控制"
        else: # 34, 35, 36
            return 5, "5. 数据修改与表管理", "5-3", "5-3 表结构定义与管理"
            
    # 定义 SQL 词卡映射 (英文名 + 出题考眼 + 新手视角释义)
    sql_vocab_map = {
        1: [
            {"ja": "データベース", "zh": "数据库", "desc": "【英文】Database (DB)\n【出题特征/考点】题干中通常表述为“整理され、検索や加工がしやすいデータの集まり”（整理好的、易于检索加工的数据集合）。\n【释义】按组织结构在磁盘中保存数据的软件容器。"},
            {"ja": "SQL", "zh": "结构化查询语言", "desc": "【英文】Structured Query Language\n【出题特征/考点】用于与关系型数据库（RDB）进行对话、发送查询与更新指令的国际标准专属语言。\n【释义】不同于普通编程语言，它是非过程化的声明式数据交互语言。"}
        ],
        2: [
            {"ja": "RDB (リレーショナルデータベース)", "zh": "关系型数据库", "desc": "【英文】Relational Database (RDB)\n【出题特征/考点】将数据以由“行（Record）”和“列（Field）”构成的“二维表（Table）”形式表达，并通过主键外键关联多个表格的系统。\n【释义】目前软件开发中最常用、最稳健的数据管理模式。"},
            {"ja": "主キー", "zh": "主键", "desc": "【英文】Primary Key\n【出题特征/考点】出题高频三大约束：“一意に識別できる”（唯一标识行）、“重複を許さない”（值不能重复）、“NULLを許さない”（不能为NULL，即非空）。\n【释义】表里用来唯一标识每行记录的特征字段。"}
        ],
        3: [
            {"ja": "SELECT文", "zh": "数据查询语句", "desc": "【英文】SELECT Statement\n【出题特征/考点】SQL中提取指定列的基本语法，格式为 `SELECT 列名 FROM 表名;`。\n【释义】数据查询的基础语句，支持用星号（*）读取所有列。"}
        ],
        4: [
            {"ja": "WHERE句", "zh": "条件过滤子句", "desc": "【英文】WHERE Clause\n【出题特征/考点】写在 FROM 后面，用于按指定条件过滤行数据，如果省略此子句则默认读取表中所有行。\n【释义】相当于 SQL 里的过滤器，只有满足条件的行才能被输出。"}
        ],
        5: [
            {"ja": "比較演算子", "zh": "比较运算符", "desc": "【英文】Comparison Operators\n【出题特征/考点】在 WHERE 子句中用于数值或字符串的大小和相等比较。如 `=`、`!=` 或 `&lt;&gt;`（不等于）。\n【释义】判断两边值大小关系的符号。"}
        ],
        6: [
            {"ja": "NULL", "zh": "空值/未定义", "desc": "【英文】Null\n【出题特征/考点】**核心避坑考眼**：判断 NULL 绝对不能使用“=` 或 `!=`”，必须使用专用谓词 `IS NULL` 或 `IS NOT NULL`！\n【释义】数据库中用来表示单元格没有填入任何值或属于未定义状态的标记。"}
        ],
        7: [
            {"ja": "論理演算子", "zh": "逻辑运算符", "desc": "【英文】Logical Operators\n【出题特征/考点】用于合并多个 WHERE 过滤条件：`AND`（与）、`OR`（或）、`NOT`（非）。\n【释义】根据布尔逻辑进行更高级的数据联合检索。"}
        ],
        8: [
            {"ja": "演算子の優先順位", "zh": "运算符优先级", "desc": "【英文】Operator Precedence\n【出题特征/考点】在逻辑运算中，`AND` 的执行优先级“高于 OR”。若想先运算 OR，必须用圆括号 `( )` 括起来。\n【释义】SQL解析器判定逻辑条件组合先后顺序的规则。"}
        ],
        9: [
            {"ja": "LIKE演算子", "zh": "模糊匹配运算符", "desc": "【英文】LIKE Operator\n【出题特征/考点】用于在 WHERE 子句中进行字符串的前缀、后缀或部分包含模糊查询，必须搭配通配符使用。\n【释义】用于判断文本中是否包含指定关键字的检索方式。"}
        ],
        10: [
            {"ja": "ワイルドカード", "zh": "通配符", "desc": "【英文】Wildcard Characters\n【出题特征/考点】在 LIKE 中使用，百分号 `%` 代表任意个字符（包含0个），下划线 `_` 仅代表精确的1个字符。\n【释义】模糊查询时用来代表不确定字符的特殊占位字符。"}
        ],
        13: [
            {"ja": "ORDER BY句", "zh": "排序子句", "desc": "【英文】ORDER BY Clause\n【出题特征/考点】用于指定查询结果的排序字段，升序写 `ASC`（默认），降序必须写 `DESC`。\n【释义】控制数据显示顺序的子句，写在 SELECT 语句的末尾。"}
        ],
        15: [
            {"ja": "LIMIT句", "zh": "限制行数子句", "desc": "【英文】LIMIT Clause\n【出题特征/考点】用于限制查询返回的记录行数。在分页功能中被大量使用（如 `LIMIT 5 OFFSET 10` 表示跳过10条取5条）。\n【释义】限制结果集输出行数的限定词。"}
        ],
        18: [
            {"ja": "集計関数", "zh": "聚合函数", "desc": "【英文】Aggregate Functions\n【出题特征/考点】对多行数据进行统计计算并输出单行结果的函数，如 `SUM()`、`AVG()`、`COUNT()`（计数）、`MAX()`、`MIN()`。\n【释义】用于进行全局数学统计的内置 SQL 函数。"}
        ],
        20: [
            {"ja": "GROUP BY句", "zh": "分组子句", "desc": "【英文】GROUP BY Clause\n【出题特征/考点】将数据表按照某几列的值拆分为若干个“小组”，通常会与聚合函数联合使用，以对每个小组进行独立统计。\n【释义】对查询结果进行分类归并统计的子句。"}
        ],
        21: [
            {"ja": "HAVING句", "zh": "分组过滤子句", "desc": "【英文】HAVING Clause\n【出题特征/考点】**核心考点**：WHERE 只能过滤原始行，不能对聚合函数的结果进行筛选；如果想要筛选分组后的数据，必须使用 `HAVING`！\n【释义】专门跟在 GROUP BY 后面、对分组统计结果进行条件过滤的子句。"}
        ],
        22: [
            {"ja": "テーブル結合", "zh": "表连接", "desc": "【英文】Table Join\n【出题特征/考点】将两个或多个分散的表格，根据关联列（如主键和外键）拼接成一个临时大表来进行跨表查询的技术。\n【释义】解决关系型数据库数据分散在多表中的核心读取手段。"}
        ],
        23: [
            {"ja": "INNER JOIN", "zh": "内连接", "desc": "【英文】Inner Join\n【出题特征/考点】只保留两个表中关联列数据“完全匹配（两边都有值）”的行。如果某行在另一张表中找不到匹配，就会被剔除。\n【释义】最常用也是最严格的连接方式，结果只保留交集。"}
        ],
        24: [
            {"ja": "LEFT JOIN", "zh": "左外连接", "desc": "【英文】Left Outer Join\n【出题特征/考点】保留“左边主表”的所有行，即使右边表中没有匹配数据也保留（此时右表字段显示为 NULL）。常用于查不完整关联。\n【释义】以左表为基准、右表补充数据的外连接形式。"}
        ],
        25: [
            {"ja": "外部キー", "zh": "外键", "desc": "【英文】Foreign Key (FK)\n【出题特征/考点】子表中的某列，其值必须引用父表的主键列。用于强制建立两张表之间的引用完整性（参照整合性）。\n【释义】在数据库表级别上约束并保持数据关联关系的物理机制。"}
        ],
        26: [
            {"ja": "サブクエリ", "zh": "子查询", "desc": "【英文】Subquery\n【出题特征/考点】嵌套在另一个 SELECT 语句内部的“内层查询”。通常把内层查询查出来的临时结果，作为外层查询的过滤条件使用。\n【释义】实现嵌套、多步复杂数据检索 the SQL 核心写法。"}
        ],
        33: [
            {"ja": "トランザクション", "zh": "事务", "desc": "【英文】Transaction\n【出题特征/考点】将一连串修改数据的操作（如扣款、存款）作为一个不可分割的整体执行。必须严格符合 ACID 特性，遇到任何错误必须回滚。\n【释义】数据库保证数据一致性的最小执行工作逻辑单元。"},
            {"ja": "コミット", "zh": "提交事务", "desc": "【英文】Commit\n【出题特征/考点】执行 `COMMIT` 表示事务内的所有数据修改都被“永久写入磁盘保存”，一旦提交就无法再进行 rollback 回滚撤销。\n【释义】确认并锁定事务修改的终结指令。"},
            {"ja": "ロールバック", "zh": "回滚事务", "desc": "【英文】Rollback\n【出题特征/考点】执行 `ROLLBACK` 表示取消当前事务中已经执行过的所有 SQL 修改操作，数据强制“还原到事务开始前的最初状态”。\n【释义】发生报错或撤销操作时，将数据回退的安全保护指令。"}
        ],
        36: [
            {"ja": "インデックス", "zh": "索引", "desc": "【英文】Index\n【出题特征/考点】出题高频核心考点：旨在“数据検索を高速化する”（使查询高速化），但会因为需要写入索引文件而“降低写入（INSERT/UPDATE）性能”。\n【释义】关系型数据库的目录机制，能显著提升大数据量下的查询效率。"}
        ]
    }
    
    # 重构这 36 个块，完美插入字段，绝无嵌套破坏风险
    new_blocks = []
    for b in blocks:
        # 获取该块的 id 字段
        import re
        id_match = re.search(r'id:\s*(\d+)', b)
        if not id_match:
            new_blocks.append(b)
            continue
            
        lid = int(id_match.group(1))
        ch_id, ch_name, sub_id, sub_name = get_sql_hierarchy(lid)
        
        # 查找本节的词卡
        vocabs = sql_vocab_map.get(lid, [
            {"ja": "SQL", "zh": "结构化查询语言", "desc": "【英文】Structured Query Language\n【出题特征/考点】用于与关系型数据库进行通信的指令语言。\n【释义】国际标准的数据库操控语言，能高效读写数据。"}
        ])
        
        # 将词卡转为 JS 代码段
        vocab_list_str = "[\n"
        for v in vocabs:
            # 替换其中的换行符为 \\n 格式以避免 JS 双模板串混淆，这里使用反引号 ``
            desc_escaped = v["desc"].replace("\n", "\\n")
            vocab_list_str += f'      {{ ja: "{v["ja"]}", zh: "{v["zh"]}", desc: `{desc_escaped}` }},\n'
        vocab_list_str = vocab_list_str.rstrip(",\n") + "\n    ]"
        
        # 插入语句：在 block 最末尾的最后一个 } 之前插入！
        # 我们使用 rfind('}') 来精确定位最外层的大括弧位置
        last_brace_idx = b.rfind('}')
        if last_brace_idx != -1:
            insert_content = f',\n    chapterId: {ch_id},\n    chapterName: "{ch_name}",\n    subSectionId: "{sub_id}",\n    subSectionName: "{sub_name}",\n    vocabList: {vocab_list_str}\n  '
            new_block = b[:last_brace_idx].rstrip() + insert_content + b[last_brace_idx:]
            new_blocks.append(new_block)
        else:
            new_blocks.append(b)
            
    # 合并输出
    output_content = header_text + ",\n\n".join(new_blocks) + "\n];\n"
    
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(output_content)
        
    print(f"Successfully generated a perfectly nested lessons.js with {len(new_blocks)} lessons!")

if __name__ == "__main__":
    fix_lessons()
