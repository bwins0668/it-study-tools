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
        print(f"Warning: {txt_path} not found.")
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
# 模糊匹配最相似的页码
# =========================================================================
def find_best_page(h3_title, pages, prev_page):
    def clean(s):
        s = re.sub(r'[\s\(\)\（\）\?\？\:\：\-\/\.\,\，]', '', s)
        s = s.replace("とは", "").replace("について", "").replace("文", "").replace("編", "")
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
# 手动提取 JS 里的对象字段和数组
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
        # 匹配无引号的纯数字，如 chapter: 1,
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
# Java 数据库重构逻辑
# =========================================================================
def upgrade_java_lessons():
    print("=== Upgrading Java lessons ===")
    
    # 还原并备份
    if os.path.exists("java_lessons.js.bak"):
        shutil.copy2("java_lessons.js.bak", "java_lessons.js")
    else:
        shutil.copy2("java_lessons.js", "java_lessons.js.bak")
        print("Backup created: java_lessons.js.bak")
    
    with open("java_lessons.js", "r", encoding="utf-8") as f:
        content = f.read()
        
    chapter_blocks = []
    matches = list(re.finditer(r'id:\s*"(nyumon-\d+|jissen-\d+)"', content))
    for i, m in enumerate(matches):
        start = m.start() - 20
        end = matches[i+1].start() - 20 if i+1 < len(matches) else len(content)
        chapter_blocks.append((m.group(1), content[start:end]))
        
    # 加载页码
    nyumon_pages = load_pages("入門編_pages.txt")
    jissen_pages = load_pages("実践編_pages.txt")
    
    upgraded_lessons = []
    global_id = 1
    
    prev_page = 0
    
    for ch_id, block in chapter_blocks:
        book = extract_field(block, "book")
        book_zh = extract_field(block, "bookZh")
        chapter = int(extract_field(block, "chapter"))
        title_ja = extract_field(block, "titleJa")
        title_zh = extract_field(block, "titleZh")
        subtitle_ja = extract_field(block, "subtitleJa")
        subtitle_zh = extract_field(block, "subtitleZh")
        analogy = extract_field(block, "analogy")
        code_example = extract_field(block, "codeExample", is_backtick=True) or extract_field(block, "codeExample")
        code_title = extract_field(block, "codeTitle")
        
        vocab_list = parse_vocab_list_manually(block)
        quiz_list = parse_quiz_list_manually(block)
        
        concept_ja = extract_field(block, "conceptJa", is_backtick=True)
        concept_zh = extract_field(block, "conceptZh", is_backtick=True)
        
        parts_ja = concept_ja.split("<h3>")
        parts_zh = concept_zh.split("<h3>")
        
        valid_ja = [p for p in parts_ja if p.strip()]
        valid_zh = [p for p in parts_zh if p.strip()]
        
        if len(valid_ja) != len(valid_zh):
            print(f"Error: Mismatched Split Size for Java chapter {ch_id}. JA: {len(valid_ja)}, ZH: {len(valid_zh)}")
            valid_ja = [concept_ja]
            valid_zh = [concept_zh]
            
        sub_count = len(valid_ja)
        pages_ref = nyumon_pages if "入門" in book else jissen_pages
        
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
                
            new_lesson = {
                "id": global_id,
                "book": book,
                "bookZh": book_zh,
                "chapterId": chapter,
                "chapterName": title_ja,
                "subSectionId": f"{chapter}-{idx+1}",
                "subSectionName": title_ja,
                "section": f"{book} {title_ja}",
                "titleJa": sub_title_ja,
                "titleZh": sub_title_zh,
                "conceptJa": sec_body_ja,
                "conceptZh": sec_body_zh,
                "analogy": analogy if idx == 0 else "前文の比喩とコード例を参照して、深く理解しましょう。",
                "example": code_example,
                "vocabList": assigned_vocab,
                "quizList": assigned_quiz,
                "pdfPage": page,
                "pdfHighlightTerm": sub_title_ja,
                "originalChapterId": ch_id
            }
            
            upgraded_lessons.append(new_lesson)
            global_id += 1
            
    print(f"Java upgrade complete. Total new lessons: {len(upgraded_lessons)}")
    
    pretty_json = json.dumps(upgraded_lessons, ensure_ascii=False, indent=2)
    with open("java_lessons.js", "w", encoding="utf-8") as f:
        f.write(f"const JAVA_LESSONS = {pretty_json};\n")
        
    return upgraded_lessons

# =========================================================================
# SQL 数据库重构逻辑 (纯正则修改原生文件)
# =========================================================================
def upgrade_sql_lessons():
    print("\n=== Upgrading SQL lessons ===")
    
    # 还原并重新备份
    if os.path.exists("lessons.js.bak"):
        shutil.copy2("lessons.js.bak", "lessons.js")
    else:
        shutil.copy2("lessons.js", "lessons.js.bak")
        print("Backup created: lessons.js.bak")
        
    with open("lessons.js", "r", encoding="utf-8") as f:
        content = f.read()
        
    # 定义映射规则
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

    pattern = r'\{\s*id:\s*(\d+)\b.*?\}'
    
    def repl(match):
        block = match.group(0)
        lesson_id = int(match.group(1))
        ch_id, ch_name, sub_id, sub_name = get_sql_hierarchy(lesson_id)
        
        insert_text = f',\n    chapterId: {ch_id},\n    chapterName: "{ch_name}",\n    subSectionId: "{sub_id}",\n    subSectionName: "{sub_name}"\n}}'
        
        if block.strip().endswith('},'):
            insert_text = f',\n    chapterId: {ch_id},\n    chapterName: "{ch_name}",\n    subSectionId: "{sub_id}",\n    subSectionName: "{sub_name}"\n}},'
            new_block = block.rstrip()
            if new_block.endswith('},'):
                new_block = new_block[:-2] + insert_text
        else:
            new_block = block.rstrip()
            if new_block.endswith('}'):
                new_block = new_block[:-1] + insert_text
                
        return new_block

    new_content = re.sub(r'\{\s*id:\s*(\d+)\b.*?\}', repl, content, flags=re.DOTALL)
    
    with open("lessons.js", "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print("SQL upgrade complete. Upgraded lessons.js file.")

# =========================================================================
# 主入口
# =========================================================================
if __name__ == "__main__":
    upgrade_java_lessons()
    upgrade_sql_lessons()
    print("\nALL UPGRADES COMPLETED SUCCESSFULY!")
