import json
import os

def generate_sql_questions():
    questions = []
    q_id = 1
    
    # ------------------ 1 Star Questions (★☆☆) ------------------
    # Projection (SELECT columns) - 10 questions
    proj_templates = [
        ("students_mst", ["student_id", "student_name"], "学生IDと氏名", "学号（student_id）和姓名（student_name）", "SELECT student_id, student_name FROM students_mst;"),
        ("students_mst", ["student_name", "age"], "学生の氏名と年齢", "学生的姓名（student_name）和年龄（age）", "SELECT student_name, age FROM students_mst;"),
        ("students_mst", ["student_number", "test_score"], "学生の学籍番号とテスト得点", "学生的学籍编号（student_number）和测试成绩（test_score）", "SELECT student_number, test_score FROM students_mst;"),
        ("departments_mst", ["department_id", "department_name"], "全学科のIDと学科名", "所有科系的ID（department_id）和科系名称（department_name）", "SELECT department_id, department_name FROM departments_mst;"),
        ("books", ["title", "price"], "すべての書籍のタイトルと価格", "所有书籍的标题（title）和价格（price）", "SELECT title, price FROM books;"),
        ("members", ["name", "email"], "すべての会員の名前とメールアドレス", "所有会员的姓名（name）和电子邮件（email）", "SELECT name, email FROM members;"),
        ("orders", ["ord_id", "total"], "すべての注文の注文IDと合計金額", "所有订单的订单ID（ord_id）和总金额（total）", "SELECT ord_id, total FROM orders;"),
        ("books", ["book_id", "title", "cat_id"], "書籍のID、タイトル、カテゴリID", "书籍的ID（book_id）、标题（title）和分类ID（cat_id）", "SELECT book_id, title, cat_id FROM books;"),
        ("members", ["mem_id", "address"], "会員の会員IDと住所", "会员的会员ID（mem_id）和地址（address）", "SELECT mem_id, address FROM members;"),
        ("orders", ["mem_id", "book_id", "qty"], "注文の会員ID、書籍ID、数量", "订单的会员ID（mem_id）、书籍ID（book_id）和数量（qty）", "SELECT mem_id, book_id, qty FROM orders;")
    ]
    
    for tbl, cols, title_ja, title_zh, query in proj_templates:
        db_group = 'shop' if tbl in ['books', 'cats', 'members', 'orders'] else 'school'
        col_list_ja = "、".join(cols)
        col_list_zh = "、".join(cols)
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": f"{title_ja}の取得",
            "taskJa": f"{tbl} テーブルから、すべてのレコードの {col_list_ja} を取得しなさい。",
            "taskZh": f"从 {tbl} 表中查询所有记录的 {col_list_zh} 字段。",
            "solutionQuery": query,
            "hint": f"SELECT {', '.join(cols)} FROM {tbl}; を入力してください。"
        })
        q_id += 1

    # Simple WHERE Filters - 28 questions
    ages = [20, 22, 25, 28, 30, 35, 40, 45, 50, 55, 60]
    for age in ages:
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "dbGroup": "school",
            "titleJa": f"年齢が {age} 歳以上の学生",
            "taskJa": f"students_mst テーブルから、年齢（age）が {age} 歳以上の学生の氏名（student_name）と年齢（age）を取得しなさい。",
            "taskZh": f"从 students_mst 表中，查询所有年龄（age）大于等于 {age} 岁的学生的姓名（student_name）和年龄（age）。",
            "solutionQuery": f"SELECT student_name, age FROM students_mst WHERE age >= {age};",
            "hint": f"WHERE age >= {age} を追加してください。"
        })
        q_id += 1
        
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "dbGroup": "school",
            "titleJa": f"年齢が {age} 歳未満の学生",
            "taskJa": f"students_mst テーブルから、年齢（age）が {age} 歳未満のすべての学生の情報を取得しなさい。",
            "taskZh": f"从 students_mst 表中，查询所有年龄（age）小于 {age} 岁的学生的所有字段。",
            "solutionQuery": f"SELECT * FROM students_mst WHERE age < {age};",
            "hint": f"WHERE age < {age} を使用して絞り込みます。"
        })
        q_id += 1

    scores = [40, 50, 60, 70, 80, 90]
    for sc in scores:
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "dbGroup": "school",
            "titleJa": f"得点が {sc} 点以上の学生",
            "taskJa": f"students_mst テーブルから、テスト得点（test_score）が {sc} 点以上の学生の氏名（student_name）と得点（test_score）を取得しなさい。",
            "taskZh": f"从 students_mst 表中，查询测试得分（test_score）大于等于 {sc} 分的学生的姓名（student_name）和得分（test_score）。",
            "solutionQuery": f"SELECT student_name, test_score FROM students_mst WHERE test_score >= {sc};",
            "hint": f"WHERE test_score >= {sc} を使用します。"
        })
        q_id += 1
        
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "dbGroup": "school",
            "titleJa": f"得点が {sc} 点以下の学生",
            "taskJa": f"students_mst テーブルから、テスト得点（test_score）が {sc} 点以下の学生のすべての情報を取得しなさい。",
            "taskZh": f"从 students_mst 表中，查询测试得分（test_score）小于等于 {sc} 分的学生的全部信息。",
            "solutionQuery": f"SELECT * FROM students_mst WHERE test_score <= {sc};",
            "hint": f"WHERE test_score <= {sc} を使用します。"
        })
        q_id += 1

    prices = [1000, 1500, 2000, 2500, 3000]
    for pr in prices:
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "dbGroup": "shop",
            "titleJa": f"価格が {pr} 円以上の書籍",
            "taskJa": f"books テーブルから、価格（price）が {pr} 円以上の書籍のタイトル（title）と価格（price）を取得しなさい。",
            "taskZh": f"从 books 表中，查询所有价格（price）大于等于 {pr} 日元的书籍的书名（title）和价格（price）。",
            "solutionQuery": f"SELECT title, price FROM books WHERE price >= {pr};",
            "hint": f"WHERE price >= {pr} を指定します。"
        })
        q_id += 1
        
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "dbGroup": "shop",
            "titleJa": f"価格が {pr} 円未満の書籍",
            "taskJa": f"books テーブルから、価格（price）が {pr} 円未満の書籍のタイトル（title）を取得しなさい。",
            "taskZh": f"从 books 表中，查询所有价格（price）小于 {pr} 日元的书籍的书名（title）。",
            "solutionQuery": f"SELECT title FROM books WHERE price < {pr};",
            "hint": f"WHERE price < {pr} を指定します。"
        })
        q_id += 1

    # Logical combinations (AND/OR/NOT) - 8 questions
    logical_params = [
        ("students_mst", "gender = 0 AND age >= 30", "30歳以上の男性学生", "30岁及以上的男生信息", "SELECT * FROM students_mst WHERE gender = 0 AND age >= 30;"),
        ("students_mst", "gender = 1 AND age < 25", "25歳未満の女性学生", "25岁以下的女生信息", "SELECT * FROM students_mst WHERE gender = 1 AND age < 25;"),
        ("students_mst", "test_score >= 80 AND age <= 30", "30歳以下で80点以上の学生", "30岁及以下且成绩在80分及以上的学生信息", "SELECT * FROM students_mst WHERE test_score >= 80 AND age <= 30;"),
        ("students_mst", "department_id = 2 OR department_id = 4", "学科IDが2または4の学生", "科系ID为2或者4的学生信息", "SELECT * FROM students_mst WHERE department_id = 2 OR department_id = 4;"),
        ("books", "cat_id = 1 AND price <= 2500", "カテゴリ1で2500円以下の書籍", "分类为1且价格小于等于2500日元的书籍", "SELECT * FROM books WHERE cat_id = 1 AND price <= 2500;"),
        ("books", "cat_id = 2 OR price >= 3000", "カテゴリ2または3000円以上の書籍", "分类为2或者价格大于等于3000日元的书籍", "SELECT * FROM books WHERE cat_id = 2 OR price >= 3000;"),
        ("orders", "qty >= 2 AND total >= 5000", "数量2以上かつ合計5000円以上の注文", "订购数量大于等于2且总金额大于等于5000日元的订单", "SELECT * FROM orders WHERE qty >= 2 AND total >= 5000;"),
        ("students_mst", "NOT (test_score >= 60)", "得点が60点未満（非60点以上）の学生", "成绩小于60分（即非60分及以上）的学生", "SELECT * FROM students_mst WHERE NOT (test_score >= 60);")
    ]
    for tbl, cond, title_ja, title_zh, query in logical_params:
        db_group = 'shop' if tbl in ['books', 'cats', 'members', 'orders'] else 'school'
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": title_ja,
            "taskJa": f"{tbl} テーブルから、{title_ja}のすべての情報を取得しなさい。",
            "taskZh": f"从 {tbl} 表中，查询符合条件：“{title_zh}”的记录的所有字段值。",
            "solutionQuery": query,
            "hint": f"WHERE {cond} のように条件を組み合わせます。"
        })
        q_id += 1

    # Sorting & Limits - 10 questions
    sort_params = [
        ("students_mst", "age ASC", "年齢の昇順", "按年龄从低到高（升序）", "SELECT * FROM students_mst ORDER BY age ASC;"),
        ("students_mst", "test_score DESC", "得点の降順", "按成绩从高到低（降序）", "SELECT * FROM students_mst ORDER BY test_score DESC;"),
        ("books", "price DESC", "価格の高い順", "按价格从高到低（降序）", "SELECT * FROM books ORDER BY price DESC;"),
        ("books", "title ASC", "タイトルのアルファベット順", "按标题字母表顺序（升序）", "SELECT * FROM books ORDER BY title ASC;"),
        ("orders", "total DESC", "注文金額の多い順", "按订单金额从大到小（降序）", "SELECT * FROM orders ORDER BY total DESC;")
    ]
    for tbl, sort_expr, title_ja, title_zh, query in sort_params:
        db_group = 'shop' if tbl in ['books', 'cats', 'members', 'orders'] else 'school'
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": f"{tbl}データのソート（{title_ja}）",
            "taskJa": f"{tbl} テーブルから、すべてのデータを取得し、{title_ja}に並べ替えなさい。",
            "taskZh": f"从 {tbl} 表中查询所有记录，并{title_zh}进行排序。",
            "solutionQuery": query,
            "hint": f"ORDER BY {sort_expr} を末尾に記述します。"
        })
        q_id += 1

    limit_params = [
        ("students_mst", "test_score DESC", 3, "得点の高い学生トップ3", "成绩最高的前3名学生", "SELECT * FROM students_mst ORDER BY test_score DESC LIMIT 3;"),
        ("students_mst", "age ASC", 5, "最も若い学生5名", "年龄最小的前5名学生", "SELECT * FROM students_mst ORDER BY age ASC LIMIT 5;"),
        ("books", "price DESC", 3, "最も高価な書籍トップ3", "价格最高的前3本书籍", "SELECT * FROM books ORDER BY price DESC LIMIT 3;"),
        ("books", "price ASC", 1, "最も安い書籍", "价格最便宜的1本书籍", "SELECT * FROM books ORDER BY price ASC LIMIT 1;"),
        ("orders", "total DESC", 5, "高額注文トップ5", "订单金额最高的前5个订单", "SELECT * FROM orders ORDER BY total DESC LIMIT 5;")
    ]
    for tbl, sort_expr, lim, title_ja, title_zh, query in limit_params:
        db_group = 'shop' if tbl in ['books', 'cats', 'members', 'orders'] else 'school'
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": title_ja,
            "taskJa": f"{tbl} テーブルから、{title_ja}を取得しなさい。",
            "taskZh": f"从 {tbl} 表中，查询并输出{title_zh}的信息。",
            "solutionQuery": query,
            "hint": f"ORDER BY {sort_expr} LIMIT {lim} を組み合わせます。"
        })
        q_id += 1

    # Extra 1-star variations - 70 questions
    for i in range(1, 71):
        dep_id = (i % 13) + 1
        questions.append({
            "id": q_id,
            "difficulty": "★☆☆",
            "type": "implement",
            "dbGroup": "school",
            "titleJa": f"学科ID {dep_id} に所属する学生リスト",
            "taskJa": f"students_mst テーブルから、所属学科ID（department_id）が {dep_id} の学生の氏名（student_name）とテスト得点（test_score）を取得しなさい。",
            "taskZh": f"从 students_mst 表中，查询所属学科ID（department_id）为 {dep_id} 的学生的姓名（student_name）和测试成绩（test_score）。",
            "solutionQuery": f"SELECT student_name, test_score FROM students_mst WHERE department_id = {dep_id};",
            "hint": f"WHERE department_id = {dep_id} を使用します。"
        })
        q_id += 1


    # ------------------ 2 Stars Questions (★★☆) ------------------
    # LIKE Pattern matching - 8 questions
    names = [("山本", "山本%"), ("山田", "山田%"), ("新田", "新田%"), ("田中", "田中%"), ("田", "%田%"), ("子", "%子"), ("太郎", "%太郎"), ("郎", "%郎")]
    for j, (name_prefix, pattern) in enumerate(names):
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "dbGroup": "school",
            "titleJa": f"部分一致検索（{name_prefix}）",
            "taskJa": f"students_mst テーブルから、氏名（student_name）に「{name_prefix}」を含むレコード（部分一致）のすべての情報を取得しなさい。",
            "taskZh": f"从 students_mst 表中，查询所有姓名（student_name）包含“{name_prefix}”的学生信息。",
            "solutionQuery": f"SELECT * FROM students_mst WHERE student_name LIKE '{pattern}';",
            "hint": f"LIKE '{pattern}' を WHERE 句で使用してください。"
        })
        q_id += 1

    # BETWEEN and IN - 10 questions
    between_params = [
        ("students_mst", "age", 20, 30, "年齢が20代（20〜30歳）の学生", "年龄在20到30岁之间的学生"),
        ("students_mst", "age", 30, 50, "年齢が30〜50歳の学生", "年龄在30到50岁之间的学生"),
        ("students_mst", "test_score", 60, 80, "得点が60〜80点の学生", "考试成绩在60到80分之间的学生"),
        ("students_mst", "test_score", 80, 100, "得点が80〜100点（優秀層）の学生", "考试成绩在80到100分之间的学生"),
        ("books", "price", 1000, 2000, "価格が1000〜2000円の書籍", "价格在1000到2000日元之间的书籍"),
        ("books", "price", 2000, 4000, "価格が2000〜4000円の書籍", "价格在2000到4000日元之间的书籍")
    ]
    for tbl, col, v1, v2, title_ja, title_zh in between_params:
        db_group = 'shop' if tbl in ['books', 'cats', 'members', 'orders'] else 'school'
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": title_ja,
            "taskJa": f"{tbl} テーブルから、{title_ja}のすべての情報を取得しなさい。範囲の判定には BETWEEN を使用すること。",
            "taskZh": f"从 {tbl} 表中，查询符合“{title_zh}”条件的所有记录。请在 WHERE 子句中使用 BETWEEN 运算符。",
            "solutionQuery": f"SELECT * FROM {tbl} WHERE {col} BETWEEN {v1} AND {v2};",
            "hint": f"WHERE {col} BETWEEN {v1} AND {v2} を指定します。"
        })
        q_id += 1

    in_params = [
        ("students_mst", "department_id", [1, 3, 5], "学科IDが1, 3, 5のいずれかの学生", "所属学科ID为1, 3, 5之一的学生"),
        ("students_mst", "department_id", [2, 4, 6], "学科IDが2, 4, 6のいずれかの学生", "所属学科ID为2, 4, 6之一的学生"),
        ("books", "cat_id", [1, 3], "カテゴリIDが1または3 of 書籍", "分类ID为1或3的书籍"),
        ("orders", "qty", [1, 3, 5], "注文数量が1, 3, 5のいずれかの注文", "订购数量为1, 3, 5之一的订单")
    ]
    for tbl, col, vals, title_ja, title_zh in in_params:
        db_group = 'shop' if tbl in ['books', 'cats', 'members', 'orders'] else 'school'
        val_str = ", ".join(map(str, vals))
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": title_ja,
            "taskJa": f"{tbl} テーブルから、{title_ja}のすべての情報を取得しなさい。複数値の比較には IN を使用すること。",
            "taskZh": f"从 {tbl} 表中，查询符合“{title_zh}”条件的所有记录。请在 WHERE 子句中使用 IN 关键字。",
            "solutionQuery": f"SELECT * FROM {tbl} WHERE {col} IN ({val_str});",
            "hint": f"WHERE {col} IN ({val_str}) を記述します。"
        })
        q_id += 1

    # NULL checks - 4 questions
    null_params = [
        ("students_mst", "student_number", True, "学籍番号が未入力の学生の氏名", "学籍编号为空（NULL）的学生的姓名", "SELECT student_name FROM students_mst WHERE student_number IS NULL;"),
        ("students_mst", "student_number", False, "学籍番号が入力済みの学生の氏名", "学籍编号不为空（IS NOT NULL）的学生的姓名", "SELECT student_name FROM students_mst WHERE student_number IS NOT NULL;"),
        ("students_mst", "delete_at", True, "削除フラグ(delete_at)が未設定の学生", "未被逻辑删除（delete_at为空）的学生信息", "SELECT * FROM students_mst WHERE delete_at IS NULL;"),
        ("students_mst", "delete_at", False, "削除フラグ(delete_at)が設定済みの学生", "已被逻辑删除（delete_at不为空）的学生信息", "SELECT * FROM students_mst WHERE delete_at IS NOT NULL;")
    ]
    for tbl, col, is_null, title_ja, title_zh, query in null_params:
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "dbGroup": "school",
            "titleJa": title_ja,
            "taskJa": f"{tbl} テーブルから、{title_ja}を取得しなさい。",
            "taskZh": f"从 {tbl} 表中，查询满足“{title_zh}”的记录数据。",
            "solutionQuery": query,
            "hint": f"IS NULL または IS NOT NULL を使用して判定します。"
        })
        q_id += 1

    # Aggregations - 8 questions
    agg_params = [
        ("students_mst", "COUNT(*)", "total_count", "全学生の総人数", "全校学生的总人数（重命名为total_count）", "SELECT COUNT(*) AS total_count FROM students_mst;"),
        ("students_mst", "AVG(test_score)", "avg_score", "学生のテスト得点の平均値", "所有学生的平均考试成绩（重命名为avg_score）", "SELECT AVG(test_score) AS avg_score FROM students_mst;"),
        ("students_mst", "SUM(test_score)", "total_score", "全学生のテスト得点の合計値", "所有学生的考试总成绩之和（重命名为total_score）", "SELECT SUM(test_score) AS total_score FROM students_mst;"),
        ("students_mst", "MAX(test_score)", "max_score", "テストの最高点", "所有学生中的最高考试成绩（重命名为max_score）", "SELECT MAX(test_score) AS max_score FROM students_mst;"),
        ("students_mst", "MIN(test_score)", "min_score", "テストの最低点", "所有学生中的最低考试成绩（重命名为min_score）", "SELECT MIN(test_score) AS min_score FROM students_mst;"),
        ("books", "AVG(price)", "avg_price", "書籍の平均価格", "书籍的平均价格（重命名为avg_price）", "SELECT AVG(price) AS avg_price FROM books;"),
        ("books", "SUM(price)", "total_price", "書籍の総価格（在庫価値）", "所有书籍的价格总和（重命名为total_price）", "SELECT SUM(price) AS total_price FROM books;"),
        ("orders", "SUM(total)", "revenue", "すべての注文の売上総額", "所有订单的总收入金额（重命名为revenue）", "SELECT SUM(total) AS revenue FROM orders;")
    ]
    for tbl, expr, alias, title_ja, title_zh, query in agg_params:
        db_group = 'shop' if tbl in ['books', 'cats', 'members', 'orders'] else 'school'
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": title_ja,
            "taskJa": f"{tbl} テーブルから、{title_ja}を取得しなさい。出力カラム名は「{alias}」とすること。",
            "taskZh": f"从 {tbl} 表中，计算并获取{title_zh}。输出字段名命名为“{alias}”。",
            "solutionQuery": query,
            "hint": f"集計関数と AS 句を使用します。例: SELECT {expr} AS {alias} FROM {tbl};"
        })
        q_id += 1

    # GROUP BY & HAVING - 9 questions
    group_params = [
        ("students_mst", "department_id", "department_id, COUNT(*) AS student_count", "学科ごとの所属学生数", "按学科分组统计所属人数（列名student_count）", "SELECT department_id, COUNT(*) AS student_count FROM students_mst GROUP BY department_id;"),
        ("students_mst", "gender", "gender, AVG(test_score) AS avg_score", "性別ごとのテスト平均点", "按性别分组计算平均考试分数（列名avg_score）", "SELECT gender, AVG(test_score) AS avg_score FROM students_mst GROUP BY gender;"),
        ("books", "cat_id", "cat_id, COUNT(*) AS book_count", "カテゴリごとの書籍数", "按分类ID分组统计书籍数量（列名book_count）", "SELECT cat_id, COUNT(*) AS book_count FROM books GROUP BY cat_id;"),
        ("books", "cat_id", "cat_id, AVG(price) AS avg_price", "カテゴリごとの平均価格", "按分类ID分组计算书籍的平均价格（列名avg_price）", "SELECT cat_id, AVG(price) AS avg_price FROM books GROUP BY cat_id;"),
        ("orders", "mem_id", "mem_id, SUM(total) AS total_spent", "会員ごとの合計購入金額", "按会员ID分组计算每个人的累计订购金额（列名total_spent）", "SELECT mem_id, SUM(total) AS total_spent FROM orders GROUP BY mem_id;")
    ]
    for tbl, group_col, select_expr, title_ja, title_zh, query in group_params:
        db_group = 'shop' if tbl in ['books', 'cats', 'members', 'orders'] else 'school'
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": title_ja,
            "taskJa": f"{tbl} テーブルから、{title_ja}を集計しなさい。",
            "taskZh": f"从 {tbl} 表中，以 {group_col} 为组，进行{title_zh}的统计查询。",
            "solutionQuery": query,
            "hint": f"GROUP BY {group_col} を記述してください。"
        })
        q_id += 1

    having_params = [
        ("students_mst", "department_id", "department_id, COUNT(*) AS student_count", "COUNT(*) >= 2", "学生が2名以上所属する学科IDと人数", "所属学生人数大于等于 2 名的学科ID和人数", "SELECT department_id, COUNT(*) AS student_count FROM students_mst GROUP BY department_id HAVING COUNT(*) >= 2;"),
        ("students_mst", "department_id", "department_id, AVG(test_score) AS avg_score", "AVG(test_score) >= 50", "平均点が50点以上の学科IDと平均点", "平均分在 50 分及以上の学科IDと平均分", "SELECT department_id, AVG(test_score) AS avg_score FROM students_mst GROUP BY department_id HAVING AVG(test_score) >= 50;"),
        ("books", "cat_id", "cat_id, COUNT(*) AS book_count", "COUNT(*) >= 3", "登録書籍が3冊以上のカテゴリと書籍数", "书籍数量在 3 本及以上の分类IDと书本数", "SELECT cat_id, COUNT(*) AS book_count FROM books GROUP BY cat_id HAVING COUNT(*) >= 3;"),
        ("orders", "mem_id", "mem_id, SUM(total) AS total_spent", "SUM(total) >= 5000", "購入額が合計5000円以上の会員IDと総額", "累计购买总金额大于等于 5000 日元的会员ID及消费总金额", "SELECT mem_id, SUM(total) AS total_spent FROM orders GROUP BY mem_id HAVING SUM(total) >= 5000;")
    ]
    for tbl, group_col, select_expr, having_cond, title_ja, title_zh, query in having_params:
        db_group = 'shop' if tbl in ['books', 'cats', 'members', 'orders'] else 'school'
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": title_ja,
            "taskJa": f"{tbl} テーブルから、{title_ja}を集計しなさい。",
            "taskZh": f"从 {tbl} 表中，按 {group_col} 分组，并且筛选满足条件：“{title_zh}”的分组数据。",
            "solutionQuery": query,
            "hint": f"GROUP BY {group_col} HAVING {having_cond} のように HAVING 句を使用します。"
        })
        q_id += 1

    # Single JOIN - 4 questions
    join_params = [
        ("students_mst s JOIN departments_mst d ON s.department_id = d.department_id", "s.student_name, d.department_name", "学生名と所属学科名の対応表", "学生的姓名（student_name）和所属学科名称（department_name）", "SELECT s.student_name, d.department_name FROM students_mst s JOIN departments_mst d ON s.department_id = d.department_id;"),
        ("books b JOIN cats c ON b.cat_id = c.cat_id", "b.title, c.cat_name, b.price", "書籍名とカテゴリ名、価格のリスト", "书籍的名称（title）、所属的分类名（cat_name）以及价格（price）", "SELECT b.title, c.cat_name, b.price FROM books b JOIN cats c ON b.cat_id = c.cat_id;"),
        ("orders o JOIN members m ON o.mem_id = m.mem_id", "o.ord_id, m.name, o.total", "注文ID、注文者名、合計金額の一覧", "订单ID（ord_id）、订购者姓名（name）以及订单合计金额（total）", "SELECT o.ord_id, m.name, o.total FROM orders o JOIN members m ON o.mem_id = m.mem_id;"),
        ("orders o JOIN books b ON o.book_id = b.book_id", "o.ord_id, b.title, o.qty", "注文ID、注文された書籍名、数量", "订单ID（ord_id）、所购书籍名（title）以及数量（qty）", "SELECT o.ord_id, b.title, o.qty FROM orders o JOIN books b ON o.book_id = b.book_id;")
    ]
    for tbl_expr, cols, title_ja, title_zh, query in join_params:
        db_group = 'shop' if 'books' in tbl_expr or 'orders' in tbl_expr else 'school'
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": title_ja,
            "taskJa": f"2つのテーブルを結合し、{title_ja}を取得しなさい。",
            "taskZh": f"结合两个关联表，查询输出{title_zh}的信息列表。",
            "solutionQuery": query,
            "hint": f"JOIN と ON 句を利用してテーブルを結合します。"
        })
        q_id += 1

    # Extra 2-star variations - 80 questions
    for i in range(1, 81):
        val = 50 + (i % 40)
        questions.append({
            "id": q_id,
            "difficulty": "★★☆",
            "type": "implement",
            "dbGroup": "school",
            "titleJa": f"テスト点数 {val} 点超の学生と学科名",
            "taskJa": f"students_mst テーブルと departments_mst テーブルを結合し、得点（test_score）が {val} 点より高い学生の氏名（student_name）、得点（test_score）、および学科名（department_name）を取得しなさい。",
            "taskZh": f"将 students_mst 和 departments_mst 联接，查询得分（test_score）大于 {val} 分的学生的姓名（student_name）、得分（test_score）和学科名（department_name）。",
            "solutionQuery": f"SELECT s.student_name, s.test_score, d.department_name FROM students_mst s JOIN departments_mst d ON s.department_id = d.department_id WHERE s.test_score > {val};",
            "hint": f"JOIN s ON s.department_id = d.department_id WHERE test_score > {val} のように作成します。"
        })
        q_id += 1


    # ------------------ 3 Stars Questions (★★★) ------------------
    # Three-table joins - 2 questions
    three_joins = [
        ("orders o JOIN members m ON o.mem_id = m.mem_id JOIN books b ON o.book_id = b.book_id", "m.name, b.title, o.qty, o.total", "注文会員名、書籍名、数量、合計額の対応表", "购买会员名（name）、购买书名（title）、购买数量（qty）以及订单合计额（total）", "SELECT m.name, b.title, o.qty, o.total FROM orders o JOIN members m ON o.mem_id = m.mem_id JOIN books b ON o.book_id = b.book_id;"),
        ("orders o JOIN members m ON o.mem_id = m.mem_id JOIN books b ON o.book_id = b.book_id JOIN cats c ON b.cat_id = c.cat_id", "m.name, b.title, c.cat_name", "会員が注文した書籍のタイトルとカテゴリ名", "购买会员姓名（name）、所购书名（title）及其所属分类名（cat_name）", "SELECT m.name, b.title, c.cat_name FROM orders o JOIN members m ON o.mem_id = m.mem_id JOIN books b ON o.book_id = b.book_id JOIN cats c ON b.cat_id = c.cat_id;")
    ]
    for tbl_expr, cols, title_ja, title_zh, query in three_joins:
        questions.append({
            "id": q_id,
            "difficulty": "★★★",
            "type": "implement",
            "dbGroup": "shop",
            "titleJa": f"3テーブル結合：{title_ja}",
            "taskJa": f"関連するテーブルを結合して、{title_ja}を取得しなさい。",
            "taskZh": f"关联多张表，查询并输出{title_zh}的结果。",
            "solutionQuery": query,
            "hint": f"FROM orders o JOIN members m ON ... JOIN books b ON ... のように複数回 JOIN を記述します。"
        })
        q_id += 1

    # Subqueries - 4 questions
    subquery_params = [
        ("students_mst", "test_score", "AVG(test_score)", ">", "平均点を超える得点の学生", "成绩大于平均分的所有学生", "SELECT * FROM students_mst WHERE test_score > (SELECT AVG(test_score) FROM students_mst);"),
        ("students_mst", "test_score", "MAX(test_score)", "=", "最高得点を獲得した学生の情報", "获得最高考试成绩的学生的完整信息", "SELECT * FROM students_mst WHERE test_score = (SELECT MAX(test_score) FROM students_mst);"),
        ("books", "price", "AVG(price)", "<", "平均価格より安い書籍", "价格低于平均单价的所有书籍", "SELECT * FROM books WHERE price < (SELECT AVG(price) FROM books);"),
        ("books", "price", "MAX(price)", "=", "最も高価な書籍の情報", "单价最高的书籍的完整记录信息", "SELECT * FROM books WHERE price = (SELECT MAX(price) FROM books);")
    ]
    for tbl, col, expr, op, title_ja, title_zh, query in subquery_params:
        db_group = 'shop' if tbl in ['books', 'cats', 'members', 'orders'] else 'school'
        questions.append({
            "id": q_id,
            "difficulty": "★★★",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": f"サブクエリ（{title_ja}）",
            "taskJa": f"{tbl} テーブルから、{title_ja}を取得しなさい。サブクエリを使用すること。",
            "taskZh": f"从 {tbl} 表中，使用子查询查找并输出“{title_zh}”的记录。",
            "solutionQuery": query,
            "hint": f"WHERE {col} {op} (SELECT {expr} FROM {tbl}) のような形で記述します。"
        })
        q_id += 1

    # IN Subqueries - 4 questions
    in_subqueries = [
        ("members", "mem_id", "SELECT mem_id FROM orders", "注文履歴がある会員", "有购买订单记录的所有会员信息", "SELECT * FROM members WHERE mem_id IN (SELECT mem_id FROM orders);"),
        ("members", "mem_id", "SELECT mem_id FROM orders", "注文履歴が一度もない会員", "没有任何购买订单记录的所有会员信息", "SELECT * FROM members WHERE mem_id NOT IN (SELECT mem_id FROM orders);"),
        ("books", "book_id", "SELECT book_id FROM orders", "一度でも注文された書籍", "至少被订购过一次的所有书籍记录", "SELECT * FROM books WHERE book_id IN (SELECT book_id FROM orders);"),
        ("books", "book_id", "SELECT book_id FROM orders", "一度も注文されていない書籍", "从未被购买订购过的所有书籍记录", "SELECT * FROM books WHERE book_id NOT IN (SELECT book_id FROM orders);")
    ]
    for tbl, col, sub_q, title_ja, title_zh, query in in_subqueries:
        questions.append({
            "id": q_id,
            "difficulty": "★★★",
            "type": "implement",
            "dbGroup": "shop",
            "titleJa": f"サブクエリ（{title_ja}）",
            "taskJa": f"{tbl} テーブルから、{title_ja}を、サブクエリ(IN)を使用して取得しなさい。",
            "taskZh": f"从 {tbl} 表中，使用含有 IN 的子查询，查询符合“{title_zh}”条件的所有记录。",
            "solutionQuery": query,
            "hint": f"WHERE {col} IN ({sub_q}) または NOT IN を使用します。"
        })
        q_id += 1

    # CASE WHEN - 3 questions
    case_queries = [
        ("students_mst", "SELECT student_name, test_score, CASE WHEN test_score >= 80 THEN 'A' WHEN test_score >= 60 THEN 'B' ELSE 'C' END AS evaluation FROM students_mst;", "学生成績のランク評価", "学生的成绩级别评估（重命名为 evaluation：>=80为A，>=60为B，其余为C）", "SELECT student_name, test_score, CASE WHEN test_score >= 80 THEN 'A' WHEN test_score >= 60 THEN 'B' ELSE 'C' END AS evaluation FROM students_mst;"),
        ("students_mst", "SELECT student_name, CASE WHEN gender = 0 THEN '男性' ELSE '女性' END AS gender_name FROM students_mst;", "性別の日本語表記変換", "学生的性别文本名称输出（重命名为 gender_name：0为男性，1为女性）", "SELECT student_name, CASE WHEN gender = 0 THEN '男性' ELSE '女性' END AS gender_name FROM students_mst;"),
        ("books", "SELECT title, price, CASE WHEN price >= 3000 THEN '高価格' WHEN price >= 1500 THEN '中価格' ELSE '低価格' END AS price_range FROM books;", "書籍価格帯の分類表示", "书籍价格区间的分类显示（重命名为 price_range：>=3000为高价格，>=1500为中价格，其余为低价格）", "SELECT title, price, CASE WHEN price >= 3000 THEN '高価格' WHEN price >= 1500 THEN '中価格' ELSE '低価格' END AS price_range FROM books;")
    ]
    for tbl, query, title_ja, title_zh, sol in case_queries:
        db_group = 'shop' if tbl == 'books' else 'school'
        questions.append({
            "id": q_id,
            "difficulty": "★★★",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": title_ja,
            "taskJa": f"{tbl} テーブルから、{title_ja}を出力するSQLを作成しなさい。CASE WHEN 構文を使用すること。",
            "taskZh": f"从 {tbl} 表中，使用 CASE WHEN 语法，编写查询以实现“{title_zh}”。",
            "solutionQuery": sol,
            "hint": f"SELECT 列名, CASE WHEN 条件 THEN 値 ELSE 値 END AS 別名 FROM テーブル名; を指定します。"
        })
        q_id += 1

    # String functions - 3 questions
    str_fns = [
        ("students_mst", "SELECT UPPER(student_name_kana) FROM students_mst;", "大文字変換", "学生拼音名（student_name_kana）转换为大写", "SELECT UPPER(student_name_kana) FROM students_mst;"),
        ("students_mst", "SELECT SUBSTR(student_name, 1, 2) FROM students_mst;", "氏名の頭2文字", "所有学生姓名的前两个字符（SUBSTR）", "SELECT SUBSTR(student_name, 1, 2) FROM students_mst;"),
        ("books", "SELECT title, LENGTH(title) AS title_len FROM books;", "タイトル文字数のカウント", "所有书籍的标题（title）及其对应的字符长度（LENGTH，重命名为title_len）", "SELECT title, LENGTH(title) AS title_len FROM books;")
    ]
    for tbl, query, title_ja, title_zh, sol in str_fns:
        db_group = 'shop' if tbl == 'books' else 'school'
        questions.append({
            "id": q_id,
            "difficulty": "★★★",
            "type": "implement",
            "dbGroup": db_group,
            "titleJa": f"文字列関数（{title_ja}）",
            "taskJa": f"{tbl} テーブルから、{title_zh} を取得しなさい。適切な文字列関数を使用すること。",
            "taskZh": f"从 {tbl} 表中，使用相应的字符串处理函数，查询并输出{title_zh}。",
            "solutionQuery": sol,
            "hint": f"UPPER(), SUBSTR(), LENGTH() などの組み込みSQL関数を使用します。"
        })
        q_id += 1

    # Extra 3-star variations - 80 questions
    for i in range(1, 81):
        val = 1000 + (i * 50)
        questions.append({
            "id": q_id,
            "difficulty": "★★★",
            "type": "implement",
            "dbGroup": "shop",
            "titleJa": f"カテゴリ別平均価格が {val} 円超のグループ",
            "taskJa": f"books テーブルから、カテゴリID（cat_id）ごとの平均価格を算出し、平均価格が {val} 円を超えるカテゴリIDと平均価格（avg_price）を取得しなさい。",
            "taskZh": f"从 books 表中，按分类ID（cat_id）分组求平均单价，并筛选出平均价格（重命名为 avg_price）大于 {val} 日元的分类及其平均价格。",
            "solutionQuery": f"SELECT cat_id, AVG(price) AS avg_price FROM books GROUP BY cat_id HAVING AVG(price) > {val};",
            "hint": f"GROUP BY cat_id HAVING AVG(price) > {val} を使用します。"
        })
        q_id += 1

    print(f"Generated {len(questions)} SQL questions.")
    
    # Write to target js file
    output_js = os.path.join(os.getcwd(), "sql_exam_questions.js")
    with open(output_js, "w", encoding="utf-8") as f:
        f.write("// SQL Mock Exam Questions Database (300+ questions)\n")
        f.write("// Automatically generated by scratch/generate_sql_exams.py\n\n")
        f.write("const SQL_EXAM_QUESTIONS = ")
        f.write(json.dumps(questions, ensure_ascii=False, indent=2))
        f.write(";\n")
    print(f"Wrote to {output_js}")

if __name__ == '__main__':
    generate_sql_questions()
