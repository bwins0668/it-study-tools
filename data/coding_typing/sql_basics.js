// Coding Typing Practice - SQL Basics
window.CODING_TYPING_DATA_SQL = [
{
  "id": "sql-select-001",
  "language": "sql",
  "category": "select",
  "level": 1,
  "difficulty": 1,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "SELECT 所有列",
    "ja-JP": "SELECT 全列",
    "en-US": "SELECT all columns"
  },
  "explanation": {
    "zh-CN": "* 表示选择所有列。FROM 后面跟表名。",
    "ja-JP": "* は全列を選択します。FROM の後にテーブル名を書きます。",
    "en-US": "* selects all columns. FROM specifies the table name."
  },
  "hint": {
    "zh-CN": "关键字用大写。* 是通配符。",
    "ja-JP": "キーワードは大文字。* は全列を表すワイルドカード。",
    "en-US": "SELECT * returns every column from the table."
  },
  "focus": ["SELECT 关键字", "* 通配符", "FROM 表名", "分号"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["select"],
  "meaning": {
    "zh-CN": "从表中检索数据的语句。",
    "ja-JP": "テーブルからデータを取得する文。",
    "en-US": "Statement to retrieve data from a table."
  },
  "memoryHook": {
    "zh-CN": "SELECT=選ぶ→取得したい列を指定。",
    "ja-JP": "SELECT=選ぶ→取得したい列を指定。",
    "en-US": "SELECT=CHOOSE what columns to retrieve."
  },
  "examPoint": {
    "zh-CN": "SELECT*全列/SELECT列名部分列。ITPassport常考基本構文。",
    "ja-JP": "SELECT*全列/SELECT列名部分列。基本構文が頻出。",
    "en-US": "SELECT*all vs named columns. Know syntax order."
  },
  "commonMistake": {
    "zh-CN": "忘记分号。SELECT/Select皆可(SQL不区分大小写)。",
    "ja-JP": "セミコロン忘れ。大文字小文字区別なし。",
    "en-US": "Forgetting semicolon. SQL is case-insensitive."
  },
  "code": "SELECT * FROM users;",
  "sqlSchema": "DROP TABLE IF EXISTS users;\nCREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT, age INTEGER, email TEXT);",
  "sqlSeed": "INSERT INTO users (id, name, age, email) VALUES (1, 'Alice', 25, 'alice@example.com');\nINSERT INTO users (id, name, age, email) VALUES (2, 'Bob', 31, 'bob@example.com');\nINSERT INTO users (id, name, age, email) VALUES (3, 'Aoi', 22, 'aoi@example.com');",
  "expectedResultNote": {
    "zh-CN": "返回 users 表的全部 3 行。",
    "ja-JP": "users テーブルの全3行を返します。",
    "en-US": "Returns all three rows from users."
  },
  "expectedRows": 3,
  "expectedOutput": "",
  "estimatedTime": 8,
  "source": "builtin",
  "expectedColumns": ["id", "name", "age", "email"]
}
,
{
  "id": "sql-select-002",
  "language": "sql",
  "category": "select",
  "level": 1,
  "difficulty": 1,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "SELECT 指定列",
    "ja-JP": "SELECT 指定列",
    "en-US": "SELECT specific columns"
  },
  "explanation": {
    "zh-CN": "SELECT 后列出列名，用逗号分隔。",
    "ja-JP": "SELECT の後に列名をカンマ区切りで列挙します。",
    "en-US": "List column names after SELECT, separated by commas."
  },
  "hint": {
    "zh-CN": "列名之间用逗号分隔，最后一个列名后不要逗号。",
    "ja-JP": "列名はカンマで区切ります。最後の列名の後ろにはカンマを付けません。",
    "en-US": "Only the named columns will be returned."
  },
  "focus": ["列名列举", "逗号分隔", "多列顺序"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["select"],
  "meaning": {
    "zh-CN": "从表中检索数据的语句。",
    "ja-JP": "テーブルからデータを取得する文。",
    "en-US": "Statement to retrieve data from a table."
  },
  "memoryHook": {
    "zh-CN": "SELECT=選ぶ→取得したい列を指定。",
    "ja-JP": "SELECT=選ぶ→取得したい列を指定。",
    "en-US": "SELECT=CHOOSE what columns to retrieve."
  },
  "examPoint": {
    "zh-CN": "SELECT*全列/SELECT列名部分列。ITPassport常考基本構文。",
    "ja-JP": "SELECT*全列/SELECT列名部分列。基本構文が頻出。",
    "en-US": "SELECT*all vs named columns. Know syntax order."
  },
  "commonMistake": {
    "zh-CN": "忘记分号。SELECT/Select皆可(SQL不区分大小写)。",
    "ja-JP": "セミコロン忘れ。大文字小文字区別なし。",
    "en-US": "Forgetting semicolon. SQL is case-insensitive."
  },
  "code": "SELECT name, age FROM employees;",
  "sqlSchema": "DROP TABLE IF EXISTS employees;\nCREATE TABLE IF NOT EXISTS employees (id INTEGER, name TEXT, age INTEGER, department TEXT, salary INTEGER);",
  "sqlSeed": "INSERT INTO employees (id, name, age, department, salary) VALUES (1, 'Aoi', 24, 'Sales', 42000);\nINSERT INTO employees (id, name, age, department, salary) VALUES (2, 'Ren', 32, 'Engineering', 56000);\nINSERT INTO employees (id, name, age, department, salary) VALUES (3, 'Mika', 28, 'Sales', 47000);",
  "expectedResultNote": {
    "zh-CN": "返回 3 名员工的姓名和年龄。",
    "ja-JP": "3名の従業員の名前と年齢を返します。",
    "en-US": "Returns the names and ages of three employees."
  },
  "expectedRows": 3,
  "expectedOutput": "",
  "estimatedTime": 10,
  "source": "builtin",
  "expectedColumns": ["name", "age"]
}
,
{
  "id": "sql-select-003",
  "language": "sql",
  "category": "select",
  "level": 1,
  "difficulty": 1,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "SELECT DISTINCT",
    "ja-JP": "SELECT DISTINCT",
    "en-US": "SELECT DISTINCT"
  },
  "explanation": {
    "zh-CN": "DISTINCT 去除重复行。",
    "ja-JP": "DISTINCT は重複を除去します。",
    "en-US": "DISTINCT removes duplicate rows from the result."
  },
  "hint": {
    "zh-CN": "DISTINCT 紧跟在 SELECT 后面。",
    "ja-JP": "DISTINCT は SELECT の直後に置きます。",
    "en-US": "DISTINCT applies to all selected columns."
  },
  "focus": ["DISTINCT 位置", "去重效果"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["select"],
  "meaning": {
    "zh-CN": "从表中检索数据的语句。",
    "ja-JP": "テーブルからデータを取得する文。",
    "en-US": "Statement to retrieve data from a table."
  },
  "memoryHook": {
    "zh-CN": "SELECT=選ぶ→取得したい列を指定。",
    "ja-JP": "SELECT=選ぶ→取得したい列を指定。",
    "en-US": "SELECT=CHOOSE what columns to retrieve."
  },
  "examPoint": {
    "zh-CN": "SELECT*全列/SELECT列名部分列。ITPassport常考基本構文。",
    "ja-JP": "SELECT*全列/SELECT列名部分列。基本構文が頻出。",
    "en-US": "SELECT*all vs named columns. Know syntax order."
  },
  "commonMistake": {
    "zh-CN": "忘记分号。SELECT/Select皆可(SQL不区分大小写)。",
    "ja-JP": "セミコロン忘れ。大文字小文字区別なし。",
    "en-US": "Forgetting semicolon. SQL is case-insensitive."
  },
  "code": "SELECT DISTINCT city FROM customers;",
  "sqlSchema": "DROP TABLE IF EXISTS customers;\nCREATE TABLE IF NOT EXISTS customers (id INTEGER, name TEXT, city TEXT);",
  "sqlSeed": "INSERT INTO customers (id, name, city) VALUES (1, 'Alice', 'Tokyo');\nINSERT INTO customers (id, name, city) VALUES (2, 'Bob', 'Osaka');\nINSERT INTO customers (id, name, city) VALUES (3, 'Carol', 'Tokyo');",
  "expectedResultNote": {
    "zh-CN": "去重后返回 Tokyo 和 Osaka。",
    "ja-JP": "重複を除き Tokyo と Osaka を返します。",
    "en-US": "Returns Tokyo and Osaka without duplicates."
  },
  "expectedRows": 2,
  "expectedOutput": "",
  "estimatedTime": 10,
  "source": "builtin",
  "expectedColumns": ["city"]
}
,
{
  "id": "sql-select-004",
  "language": "sql",
  "category": "select",
  "level": 1,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "SELECT 别名 AS",
    "ja-JP": "SELECT 別名 AS",
    "en-US": "SELECT with alias"
  },
  "explanation": {
    "zh-CN": "AS 给列取别名。",
    "ja-JP": "AS で列に別名を付けます。",
    "en-US": "AS gives a column or table an alias (temporary name)."
  },
  "hint": {
    "zh-CN": "AS 写在列名后面，后面跟别名。",
    "ja-JP": "AS は列名の後に書き、その後に別名を書きます。",
    "en-US": "Aliases make output column names more readable."
  },
  "focus": ["AS 关键字", "别名在原名之后"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["select"],
  "meaning": {
    "zh-CN": "从表中检索数据的语句。",
    "ja-JP": "テーブルからデータを取得する文。",
    "en-US": "Statement to retrieve data from a table."
  },
  "memoryHook": {
    "zh-CN": "SELECT=選ぶ→取得したい列を指定。",
    "ja-JP": "SELECT=選ぶ→取得したい列を指定。",
    "en-US": "SELECT=CHOOSE what columns to retrieve."
  },
  "examPoint": {
    "zh-CN": "SELECT*全列/SELECT列名部分列。ITPassport常考基本構文。",
    "ja-JP": "SELECT*全列/SELECT列名部分列。基本構文が頻出。",
    "en-US": "SELECT*all vs named columns. Know syntax order."
  },
  "commonMistake": {
    "zh-CN": "忘记分号。SELECT/Select皆可(SQL不区分大小写)。",
    "ja-JP": "セミコロン忘れ。大文字小文字区別なし。",
    "en-US": "Forgetting semicolon. SQL is case-insensitive."
  },
  "code": "SELECT name AS 名前, age AS 年齢 FROM users;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_prod;\nCREATE TABLE ct_prod (id INTEGER, name TEXT, price REAL);",
  "sqlSeed": "INSERT INTO ct_prod VALUES (1, 'Pen', 1.5);\nINSERT INTO ct_prod VALUES (2, 'Notebook', 2.0);\nINSERT INTO ct_prod VALUES (3, 'Eraser', 0.5);",
  "expectedResultNote": {
    "zh-CN": "返回价格大于1的商品",
    "ja-JP": "価格が1より大きい商品",
    "en-US": "Products with price > 1"
  },
  "expectedRows": "varies",
  "expectedOutput": "返回价格大于1的商品",
  "estimatedTime": 12,
  "source": "builtin",
  "expectedColumns": "varies"
}
,
{
  "id": "sql-where-001",
  "language": "sql",
  "category": "where",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "WHERE 条件过滤",
    "ja-JP": "WHERE 条件フィルター",
    "en-US": "WHERE condition"
  },
  "explanation": {
    "zh-CN": "WHERE 用于过滤记录。",
    "ja-JP": "WHERE はレコードをフィルタリングします。",
    "en-US": "WHERE filters records based on a condition."
  },
  "hint": {
    "zh-CN": "WHERE 写在 FROM 之后。条件中列名在左。",
    "ja-JP": "WHERE は FROM の後に書きます。条件では列名を左に。",
    "en-US": "Only rows that satisfy the condition are returned."
  },
  "focus": ["WHERE 位置（FROM 后）", "比较运算符", "条件表达式"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["where"],
  "meaning": {
    "zh-CN": "用条件过滤数据的子句。",
    "ja-JP": "条件を指定して行を絞り込む句。",
    "en-US": "Clause to filter rows by condition."
  },
  "memoryHook": {
    "zh-CN": "WHERE=どこ→条件で絞るイメージ。",
    "ja-JP": "WHERE=どこ→条件で絞り込む。",
    "en-US": "WHERE=filter condition."
  },
  "examPoint": {
    "zh-CN": "WHERE比較演算子(=<>>=<=)とAND/ORが頻出。",
    "ja-JP": "WHERE比較演算子とAND/OR組合せ頻出。",
    "en-US": "Comparison operators and AND/OR in WHERE."
  },
  "commonMistake": {
    "zh-CN": "用=判断相等不是==。字符串用单引号。",
    "ja-JP": "等価比較は=(==ではない)。文字列はシングルクォート。",
    "en-US": "Use = not == for equality. Strings need quotes."
  },
  "code": "SELECT * FROM products WHERE price > 100;",
  "sqlSchema": "DROP TABLE IF EXISTS products;\nCREATE TABLE IF NOT EXISTS products (id INTEGER, name TEXT, price REAL, stock INTEGER);",
  "sqlSeed": "INSERT INTO products (id, name, price, stock) VALUES (1, 'Keyboard', 120, 8);\nINSERT INTO products (id, name, price, stock) VALUES (2, 'Mouse', 45, 20);\nINSERT INTO products (id, name, price, stock) VALUES (3, 'Monitor', 280, 5);",
  "expectedResultNote": {
    "zh-CN": "返回价格大于 100 的 Keyboard 和 Monitor。",
    "ja-JP": "価格が100より高い Keyboard と Monitor を返します。",
    "en-US": "Returns Keyboard and Monitor, whose prices exceed 100."
  },
  "expectedRows": 2,
  "expectedOutput": "",
  "estimatedTime": 12,
  "source": "builtin"
}
,
{
  "id": "sql-where-002",
  "language": "sql",
  "category": "where",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "WHERE 字符串等值",
    "ja-JP": "WHERE 文字列等価",
    "en-US": "WHERE string equality"
  },
  "explanation": {
    "zh-CN": "SQL 字符串值用单引号。",
    "ja-JP": "SQL では文字列値は一重引用符です。",
    "en-US": "String values in SQL are enclosed in single quotes."
  },
  "hint": {
    "zh-CN": "SQL 中字符串用单引号，不是双引号。",
    "ja-JP": "SQL では文字列は一重引用符、二重引用符ではありません。",
    "en-US": "SQL uses single quotes, not double quotes, for strings."
  },
  "focus": ["单引号字符串", "等号比较"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["where"],
  "meaning": {
    "zh-CN": "用条件过滤数据的子句。",
    "ja-JP": "条件を指定して行を絞り込む句。",
    "en-US": "Clause to filter rows by condition."
  },
  "memoryHook": {
    "zh-CN": "WHERE=どこ→条件で絞るイメージ。",
    "ja-JP": "WHERE=どこ→条件で絞り込む。",
    "en-US": "WHERE=filter condition."
  },
  "examPoint": {
    "zh-CN": "WHERE比較演算子(=<>>=<=)とAND/ORが頻出。",
    "ja-JP": "WHERE比較演算子とAND/OR組合せ頻出。",
    "en-US": "Comparison operators and AND/OR in WHERE."
  },
  "commonMistake": {
    "zh-CN": "用=判断相等不是==。字符串用单引号。",
    "ja-JP": "等価比較は=(==ではない)。文字列はシングルクォート。",
    "en-US": "Use = not == for equality. Strings need quotes."
  },
  "code": "SELECT * FROM users WHERE name = 'Alice';",
  "sqlSchema": "DROP TABLE IF EXISTS users;\nCREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT, age INTEGER);",
  "sqlSeed": "INSERT INTO users (id, name, age) VALUES (1, 'Alice', 25);\nINSERT INTO users (id, name, age) VALUES (2, 'Bob', 31);\nINSERT INTO users (id, name, age) VALUES (3, 'Aoi', 22);",
  "expectedResultNote": {
    "zh-CN": "只返回 Alice。",
    "ja-JP": "Alice の行だけを返します。",
    "en-US": "Returns only Alice."
  },
  "expectedRows": 1,
  "expectedOutput": "",
  "estimatedTime": 10,
  "source": "builtin"
}
,
{
  "id": "sql-where-003",
  "language": "sql",
  "category": "where",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "WHERE AND 多条件",
    "ja-JP": "WHERE AND 複数条件",
    "en-US": "WHERE with AND"
  },
  "explanation": {
    "zh-CN": "AND 连接两个条件，都必须为真。",
    "ja-JP": "AND は2つの条件を結合し、両方とも真である必要があります。",
    "en-US": "AND combines two conditions—both must be true."
  },
  "hint": {
    "zh-CN": "两个条件用 AND 连接，字符串值用单引号。",
    "ja-JP": "2つの条件を AND で接続します。文字列値は一重引用符。",
    "en-US": "Use AND when you need all conditions to match."
  },
  "focus": ["AND 连接", "列名和值匹配"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["where"],
  "meaning": {
    "zh-CN": "用条件过滤数据的子句。",
    "ja-JP": "条件を指定して行を絞り込む句。",
    "en-US": "Clause to filter rows by condition."
  },
  "memoryHook": {
    "zh-CN": "WHERE=どこ→条件で絞るイメージ。",
    "ja-JP": "WHERE=どこ→条件で絞り込む。",
    "en-US": "WHERE=filter condition."
  },
  "examPoint": {
    "zh-CN": "WHERE比較演算子(=<>>=<=)とAND/ORが頻出。",
    "ja-JP": "WHERE比較演算子とAND/OR組合せ頻出。",
    "en-US": "Comparison operators and AND/OR in WHERE."
  },
  "commonMistake": {
    "zh-CN": "用=判断相等不是==。字符串用单引号。",
    "ja-JP": "等価比較は=(==ではない)。文字列はシングルクォート。",
    "en-US": "Use = not == for equality. Strings need quotes."
  },
  "code": "SELECT * FROM orders WHERE amount > 50 AND status = 'shipped';",
  "sqlSchema": "DROP TABLE IF EXISTS orders;\nCREATE TABLE IF NOT EXISTS orders (id INTEGER, customer_id INTEGER, amount REAL, status TEXT);",
  "sqlSeed": "INSERT INTO orders (id, customer_id, amount, status) VALUES (1, 1, 80, 'shipped');\nINSERT INTO orders (id, customer_id, amount, status) VALUES (2, 2, 40, 'shipped');\nINSERT INTO orders (id, customer_id, amount, status) VALUES (3, 1, 120, 'pending');",
  "expectedResultNote": {
    "zh-CN": "返回金额大于 50 且已发货的订单。",
    "ja-JP": "金額が50より大きく発送済みの注文を返します。",
    "en-US": "Returns shipped orders with an amount greater than 50."
  },
  "expectedRows": 1,
  "expectedOutput": "",
  "estimatedTime": 12,
  "source": "builtin"
}
,
{
  "id": "sql-where-004",
  "language": "sql",
  "category": "where",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "WHERE OR 条件",
    "ja-JP": "WHERE OR 条件",
    "en-US": "WHERE with OR"
  },
  "explanation": {
    "zh-CN": "OR 任意一个条件为真即返回。",
    "ja-JP": "OR はどちらかの条件が真の場合に結果を返します。",
    "en-US": "OR returns rows where at least one condition is true."
  },
  "hint": {
    "zh-CN": "每侧都要写完整条件，不要写成 grade='A' OR 'B'。",
    "ja-JP": "各条件は完全に書きます。grade='A' OR 'B' とは書きません。",
    "en-US": "Use OR when any single condition should match."
  },
  "focus": ["OR 连接", "重复列名的写法"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["where"],
  "meaning": {
    "zh-CN": "用条件过滤数据的子句。",
    "ja-JP": "条件を指定して行を絞り込む句。",
    "en-US": "Clause to filter rows by condition."
  },
  "memoryHook": {
    "zh-CN": "WHERE=どこ→条件で絞るイメージ。",
    "ja-JP": "WHERE=どこ→条件で絞り込む。",
    "en-US": "WHERE=filter condition."
  },
  "examPoint": {
    "zh-CN": "WHERE比較演算子(=<>>=<=)とAND/ORが頻出。",
    "ja-JP": "WHERE比較演算子とAND/OR組合せ頻出。",
    "en-US": "Comparison operators and AND/OR in WHERE."
  },
  "commonMistake": {
    "zh-CN": "用=判断相等不是==。字符串用单引号。",
    "ja-JP": "等価比較は=(==ではない)。文字列はシングルクォート。",
    "en-US": "Use = not == for equality. Strings need quotes."
  },
  "code": "SELECT * FROM students WHERE grade = 'A' OR grade = 'B';",
  "sqlSchema": "DROP TABLE IF EXISTS students;\nCREATE TABLE IF NOT EXISTS students (id INTEGER, name TEXT, grade TEXT, score INTEGER);",
  "sqlSeed": "INSERT INTO students (id, name, grade, score) VALUES (1, 'Aoi', 'A', 92);\nINSERT INTO students (id, name, grade, score) VALUES (2, 'Ren', 'B', 81);\nINSERT INTO students (id, name, grade, score) VALUES (3, 'Mika', 'C', 68);",
  "expectedResultNote": {
    "zh-CN": "返回等级为 A 或 B 的两名学生。",
    "ja-JP": "成績が A または B の学生2名を返します。",
    "en-US": "Returns the two students whose grades are A or B."
  },
  "expectedRows": 2,
  "expectedOutput": "",
  "estimatedTime": 12,
  "source": "builtin"
}
,
{
  "id": "sql-order-001",
  "language": "sql",
  "category": "order",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "ORDER BY 排序",
    "ja-JP": "ORDER BY 並び替え",
    "en-US": "ORDER BY sorting"
  },
  "explanation": {
    "zh-CN": "ORDER BY 排序，ASC 升序（默认），DESC 降序。",
    "ja-JP": "ORDER BY は結果を並び替えます。ASC 昇順、DESC 降順。",
    "en-US": "ORDER BY sorts results. ASC is ascending (default), DESC is descending."
  },
  "hint": {
    "zh-CN": "ORDER BY 写在 WHERE 之后。默认升序。",
    "ja-JP": "ORDER BY は WHERE の後に書きます。デフォルトは昇順。",
    "en-US": "Add DESC after the column name for descending order."
  },
  "focus": ["ORDER BY 位置", "DESC 降序", "ASC 升序"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["order_by"],
  "meaning": {
    "zh-CN": "对查询结果排序的子句。",
    "ja-JP": "クエリ結果を並べ替える句。",
    "en-US": "Clause to sort query results."
  },
  "memoryHook": {
    "zh-CN": "ORDER BY=順番→ASC昇順 DESC降順。",
    "ja-JP": "ORDER BY=順番→ASC昇順 DESC降順。",
    "en-US": "ORDER=sort. ASC ascending DESC descending."
  },
  "examPoint": {
    "zh-CN": "ASC/DESC指定と複数列ソート優先順位が頻出。",
    "ja-JP": "ASC/DESC指定と複数列ソート順序が頻出。",
    "en-US": "ASC DESC direction and multi-column sort order."
  },
  "commonMistake": {
    "zh-CN": "默认为ASC(升序)。DESC要显式写。",
    "ja-JP": "デフォルトASC(昇順)。DESCは明示必要。",
    "en-US": "Default ASC. Write DESC explicitly."
  },
  "code": "SELECT * FROM products ORDER BY price DESC;",
  "sqlSchema": "DROP TABLE IF EXISTS products;\nCREATE TABLE IF NOT EXISTS products (id INTEGER, name TEXT, price REAL);",
  "sqlSeed": "INSERT INTO products (id, name, price) VALUES (1, 'Keyboard', 120);\nINSERT INTO products (id, name, price) VALUES (2, 'Mouse', 45);\nINSERT INTO products (id, name, price) VALUES (3, 'Monitor', 280);",
  "expectedResultNote": {
    "zh-CN": "按价格从高到低返回商品。",
    "ja-JP": "商品を価格の高い順に返します。",
    "en-US": "Returns products ordered by price from highest to lowest."
  },
  "expectedRows": 3,
  "expectedOutput": "",
  "estimatedTime": 12,
  "source": "builtin"
}
,
{
  "id": "sql-order-002",
  "language": "sql",
  "category": "order",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "ORDER BY 多列",
    "ja-JP": "ORDER BY 複数列",
    "en-US": "ORDER BY multiple columns"
  },
  "explanation": {
    "zh-CN": "ORDER BY 可以跟多个列，按优先级排序。",
    "ja-JP": "ORDER BY の後に複数の列を優先順に指定できます。",
    "en-US": "ORDER BY can accept multiple columns for sorting priority."
  },
  "hint": {
    "zh-CN": "每列后面可以单独指定 ASC 或 DESC。",
    "ja-JP": "各列の後に ASC または DESC を個別に指定できます。",
    "en-US": "The first column takes the highest priority."
  },
  "focus": ["逗号分隔", "每列独立指定升降序"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["order_by"],
  "meaning": {
    "zh-CN": "对查询结果排序的子句。",
    "ja-JP": "クエリ結果を並べ替える句。",
    "en-US": "Clause to sort query results."
  },
  "memoryHook": {
    "zh-CN": "ORDER BY=順番→ASC昇順 DESC降順。",
    "ja-JP": "ORDER BY=順番→ASC昇順 DESC降順。",
    "en-US": "ORDER=sort. ASC ascending DESC descending."
  },
  "examPoint": {
    "zh-CN": "ASC/DESC指定と複数列ソート優先順位が頻出。",
    "ja-JP": "ASC/DESC指定と複数列ソート順序が頻出。",
    "en-US": "ASC DESC direction and multi-column sort order."
  },
  "commonMistake": {
    "zh-CN": "默认为ASC(升序)。DESC要显式写。",
    "ja-JP": "デフォルトASC(昇順)。DESCは明示必要。",
    "en-US": "Default ASC. Write DESC explicitly."
  },
  "code": "SELECT name, age FROM employees ORDER BY age DESC, name ASC;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_sc;\nCREATE TABLE ct_sc (id INTEGER, student TEXT, score INTEGER);",
  "sqlSeed": "INSERT INTO ct_sc VALUES (1, 'Alice', 92);\nINSERT INTO ct_sc VALUES (2, 'Bob', 78);\nINSERT INTO ct_sc VALUES (3, 'Aoi', 85);\nINSERT INTO ct_sc VALUES (4, 'Ren', 95);",
  "expectedResultNote": {
    "zh-CN": "按分数降序排列",
    "ja-JP": "スコア降順",
    "en-US": "Sorted by score desc"
  },
  "expectedRows": "varies",
  "expectedOutput": "按分数降序排列",
  "estimatedTime": 15,
  "source": "builtin",
  "expectedColumns": "varies"
}
,
{
  "id": "sql-order-003",
  "language": "sql",
  "category": "order",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "WHERE 与 ORDER BY 组合",
    "ja-JP": "WHERE と ORDER BY 組み合わせ",
    "en-US": "WHERE with ORDER BY"
  },
  "explanation": {
    "zh-CN": "WHERE 在前过滤行，ORDER BY 在后排序。",
    "ja-JP": "WHERE が先にフィルター、ORDER BY が後に並び替え。",
    "en-US": "WHERE filters rows first, then ORDER BY sorts the filtered result."
  },
  "hint": {
    "zh-CN": "SQL 子句顺序：SELECT FROM WHERE ORDER BY。",
    "ja-JP": "SQL 句の順序：SELECT FROM WHERE ORDER BY。",
    "en-US": "WHERE always comes before ORDER BY in a query."
  },
  "focus": ["WHERE 在前", "ORDER BY 在最后"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["order_by"],
  "meaning": {
    "zh-CN": "对查询结果排序的子句。",
    "ja-JP": "クエリ結果を並べ替える句。",
    "en-US": "Clause to sort query results."
  },
  "memoryHook": {
    "zh-CN": "ORDER BY=順番→ASC昇順 DESC降順。",
    "ja-JP": "ORDER BY=順番→ASC昇順 DESC降順。",
    "en-US": "ORDER=sort. ASC ascending DESC descending."
  },
  "examPoint": {
    "zh-CN": "ASC/DESC指定と複数列ソート優先順位が頻出。",
    "ja-JP": "ASC/DESC指定と複数列ソート順序が頻出。",
    "en-US": "ASC DESC direction and multi-column sort order."
  },
  "commonMistake": {
    "zh-CN": "默认为ASC(升序)。DESC要显式写。",
    "ja-JP": "デフォルトASC(昇順)。DESCは明示必要。",
    "en-US": "Default ASC. Write DESC explicitly."
  },
  "code": "SELECT * FROM orders WHERE total > 50 ORDER BY created_at DESC;",
  "sqlSchema": "DROP TABLE IF EXISTS orders;\nCREATE TABLE IF NOT EXISTS orders (id INTEGER, total REAL, created_at TEXT);",
  "sqlSeed": "INSERT INTO orders (id, total, created_at) VALUES (1, 80, '2026-06-01');\nINSERT INTO orders (id, total, created_at) VALUES (2, 40, '2026-06-10');\nINSERT INTO orders (id, total, created_at) VALUES (3, 120, '2026-06-12');",
  "expectedResultNote": {
    "zh-CN": "筛选总额大于 50 的订单并按日期降序排列。",
    "ja-JP": "合計が50より大きい注文を日付の降順で返します。",
    "en-US": "Returns orders over 50 sorted by newest date first."
  },
  "expectedRows": 2,
  "expectedOutput": "",
  "estimatedTime": 15,
  "source": "builtin"
}
,
{
  "id": "sql-group-001",
  "language": "sql",
  "category": "group",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "GROUP BY 分组",
    "ja-JP": "GROUP BY グループ化",
    "en-US": "GROUP BY aggregation"
  },
  "explanation": {
    "zh-CN": "GROUP BY 按某列分组，与聚合函数一起使用。",
    "ja-JP": "GROUP BY は列でグループ化し、集約関数と一緒に使います。",
    "en-US": "GROUP BY groups rows that have the same value in a column. It is used with aggregate functions."
  },
  "hint": {
    "zh-CN": "GROUP BY 写在 WHERE 之后。",
    "ja-JP": "GROUP BY は WHERE の後に書きます。",
    "en-US": "COUNT(*) counts the number of rows in each group."
  },
  "focus": ["GROUP BY 位置", "聚合函数 COUNT"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["group_by"],
  "meaning": {
    "zh-CN": "按列分组常与聚合函数一起使用。",
    "ja-JP": "列ごとにグループ化し集計関数と組み合わせる句。",
    "en-US": "Groups rows by col used with aggregate functions."
  },
  "memoryHook": {
    "zh-CN": "GROUP BY=グループ分け→集計してまとめる。",
    "ja-JP": "GROUP BY=グループ分け→集計してまとめる。",
    "en-US": "GROUP BY=group rows for aggregation."
  },
  "examPoint": {
    "zh-CN": "GROUP BY+COUNT/SUM/AVG是SQL最高频考点。",
    "ja-JP": "GROUP BY+集計関数はSQL試験で最も頻出。",
    "en-US": "GROUP BY+aggregate is most common SQL pattern."
  },
  "commonMistake": {
    "zh-CN": "GROUP BY列必须出现在SELECT中。WHERE在前GROUP BY在后。",
    "ja-JP": "GROUP BY列SELECTに含める。WHEREはGROUP BYの前に。",
    "en-US": "GROUP BY cols in SELECT. WHERE before GROUP BY."
  },
  "code": "SELECT department, COUNT(*) FROM employees GROUP BY department;",
  "sqlSchema": "DROP TABLE IF EXISTS employees;\nCREATE TABLE IF NOT EXISTS employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);",
  "sqlSeed": "INSERT INTO employees (id, name, department, salary) VALUES (1, 'Aoi', 'Sales', 42000);\nINSERT INTO employees (id, name, department, salary) VALUES (2, 'Ren', 'Engineering', 56000);\nINSERT INTO employees (id, name, department, salary) VALUES (3, 'Mika', 'Sales', 47000);\nINSERT INTO employees (id, name, department, salary) VALUES (4, 'Ken', 'Engineering', 61000);",
  "expectedResultNote": {
    "zh-CN": "按部门统计员工人数。",
    "ja-JP": "部署ごとの従業員数を集計します。",
    "en-US": "Counts employees in each department."
  },
  "expectedRows": 2,
  "expectedOutput": "",
  "estimatedTime": 18,
  "source": "builtin",
  "expectedColumns": ["department", "COUNT(*)"]
}
,
{
  "id": "sql-group-002",
  "language": "sql",
  "category": "group",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "GROUP BY 多个聚合",
    "ja-JP": "GROUP BY 複数集約",
    "en-US": "Multiple aggregates"
  },
  "explanation": {
    "zh-CN": "一个 GROUP BY 中可以包含多个聚合函数。",
    "ja-JP": "1つの GROUP BY に複数の集約関数を含められます。",
    "en-US": "A single GROUP BY can include multiple aggregate functions."
  },
  "hint": {
    "zh-CN": "COUNT(*) 统计行数，AVG(salary) 计算平均值。",
    "ja-JP": "COUNT(*) は行数、AVG(salary) は平均値を計算します。",
    "en-US": "AVG(), SUM(), COUNT(), MAX(), MIN() can all be used together."
  },
  "focus": ["多聚合函数", "别名"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["group_by"],
  "meaning": {
    "zh-CN": "按列分组常与聚合函数一起使用。",
    "ja-JP": "列ごとにグループ化し集計関数と組み合わせる句。",
    "en-US": "Groups rows by col used with aggregate functions."
  },
  "memoryHook": {
    "zh-CN": "GROUP BY=グループ分け→集計してまとめる。",
    "ja-JP": "GROUP BY=グループ分け→集計してまとめる。",
    "en-US": "GROUP BY=group rows for aggregation."
  },
  "examPoint": {
    "zh-CN": "GROUP BY+COUNT/SUM/AVG是SQL最高频考点。",
    "ja-JP": "GROUP BY+集計関数はSQL試験で最も頻出。",
    "en-US": "GROUP BY+aggregate is most common SQL pattern."
  },
  "commonMistake": {
    "zh-CN": "GROUP BY列必须出现在SELECT中。WHERE在前GROUP BY在后。",
    "ja-JP": "GROUP BY列SELECTに含める。WHEREはGROUP BYの前に。",
    "en-US": "GROUP BY cols in SELECT. WHERE before GROUP BY."
  },
  "code": "SELECT department, COUNT(*) AS emp_count, AVG(salary) AS avg_salary FROM employees GROUP BY department;",
  "sqlSchema": "DROP TABLE IF EXISTS employees;\nCREATE TABLE IF NOT EXISTS employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);",
  "sqlSeed": "INSERT INTO employees (id, name, department, salary) VALUES (1, 'Aoi', 'Sales', 42000);\nINSERT INTO employees (id, name, department, salary) VALUES (2, 'Ren', 'Engineering', 56000);\nINSERT INTO employees (id, name, department, salary) VALUES (3, 'Mika', 'Sales', 48000);\nINSERT INTO employees (id, name, department, salary) VALUES (4, 'Ken', 'Engineering', 64000);",
  "expectedResultNote": {
    "zh-CN": "返回各部门人数与平均工资。",
    "ja-JP": "部署ごとの人数と平均給与を返します。",
    "en-US": "Returns employee count and average salary by department."
  },
  "expectedRows": 2,
  "expectedOutput": "",
  "estimatedTime": 20,
  "source": "builtin"
}
,
{
  "id": "sql-group-003",
  "language": "sql",
  "category": "group",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "GROUP BY 多列",
    "ja-JP": "GROUP BY 複数列",
    "en-US": "GROUP BY multiple columns"
  },
  "explanation": {
    "zh-CN": "GROUP BY 后面可以跟多个列。",
    "ja-JP": "GROUP BY の後に複数の列を指定できます。",
    "en-US": "GROUP BY can group by multiple columns to create sub-groups."
  },
  "hint": {
    "zh-CN": "SELECT 中所有非聚合列必须在 GROUP BY 中。",
    "ja-JP": "SELECT 内のすべての非集約列は GROUP BY に含める必要があります。",
    "en-US": "Each unique combination of the grouped columns forms a group."
  },
  "focus": ["多列分组", "分组层次"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["group_by"],
  "meaning": {
    "zh-CN": "按列分组常与聚合函数一起使用。",
    "ja-JP": "列ごとにグループ化し集計関数と組み合わせる句。",
    "en-US": "Groups rows by col used with aggregate functions."
  },
  "memoryHook": {
    "zh-CN": "GROUP BY=グループ分け→集計してまとめる。",
    "ja-JP": "GROUP BY=グループ分け→集計してまとめる。",
    "en-US": "GROUP BY=group rows for aggregation."
  },
  "examPoint": {
    "zh-CN": "GROUP BY+COUNT/SUM/AVG是SQL最高频考点。",
    "ja-JP": "GROUP BY+集計関数はSQL試験で最も頻出。",
    "en-US": "GROUP BY+aggregate is most common SQL pattern."
  },
  "commonMistake": {
    "zh-CN": "GROUP BY列必须出现在SELECT中。WHERE在前GROUP BY在后。",
    "ja-JP": "GROUP BY列SELECTに含める。WHEREはGROUP BYの前に。",
    "en-US": "GROUP BY cols in SELECT. WHERE before GROUP BY."
  },
  "code": "SELECT city, status, COUNT(*) FROM orders GROUP BY city, status;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_sal;\nCREATE TABLE ct_sal (id INTEGER, product TEXT, amount REAL);",
  "sqlSeed": "INSERT INTO ct_sal VALUES (1,'A',100);\nINSERT INTO ct_sal VALUES (2,'B',200);\nINSERT INTO ct_sal VALUES (3,'A',150);\nINSERT INTO ct_sal VALUES (4,'B',250);\nINSERT INTO ct_sal VALUES (5,'C',300);",
  "expectedResultNote": {
    "zh-CN": "按产品分组汇总",
    "ja-JP": "製品別集計",
    "en-US": "Group by product"
  },
  "expectedRows": "varies",
  "expectedOutput": "按产品分组汇总",
  "estimatedTime": 18,
  "source": "builtin",
  "expectedColumns": "varies"
}
,
{
  "id": "sql-having-001",
  "language": "sql",
  "category": "having",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "HAVING 过滤分组",
    "ja-JP": "HAVING グループフィルター",
    "en-US": "HAVING filter groups"
  },
  "explanation": {
    "zh-CN": "HAVING 过滤分组后的结果。",
    "ja-JP": "HAVING はグループ化後の結果をフィルタリングします。",
    "en-US": "HAVING filters grouped results (similar to WHERE for individual rows)."
  },
  "hint": {
    "zh-CN": "HAVING 只能与 GROUP BY 一起使用。",
    "ja-JP": "HAVING は GROUP BY と一緒にのみ使えます。",
    "en-US": "Use HAVING to filter after GROUP BY, WHERE to filter before it."
  },
  "focus": ["HAVING 位置", "WHERE vs HAVING"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["having"],
  "meaning": {
    "zh-CN": "对GROUP BY后的分组结果筛选的子句。",
    "ja-JP": "GROUP BY集計結果をさらに絞り込む句。",
    "en-US": "Filters grouped results after aggregation."
  },
  "memoryHook": {
    "zh-CN": "HAVING=持ってる→集計結果を条件で絞る。",
    "ja-JP": "HAVING=持っている→集計結果を条件で絞る。",
    "en-US": "HAVING=filter on aggregated data."
  },
  "examPoint": {
    "zh-CN": "WHERE vs HAVING区別必考:WHERE行HAVINGグループ。",
    "ja-JP": "WHEREとHAVING使い分け頻出:WHERE行HAVINGグループ。",
    "en-US": "WHERE filters rows HAVING filters groups."
  },
  "commonMistake": {
    "zh-CN": "HAVING中只能用聚合函数或GROUP BY中的列。",
    "ja-JP": "HAVINGでは集計関数またはGROUP BY列のみ使用可。",
    "en-US": "HAVING uses only aggregates or GROUP BY columns."
  },
  "code": "SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5;",
  "sqlSchema": "DROP TABLE IF EXISTS employees;\nCREATE TABLE IF NOT EXISTS employees (id INTEGER, name TEXT, department TEXT);",
  "sqlSeed": "INSERT INTO employees (id, name, department) VALUES (1, 'Aoi', 'Sales');\nINSERT INTO employees (id, name, department) VALUES (2, 'Ren', 'Sales');\nINSERT INTO employees (id, name, department) VALUES (3, 'Mika', 'Sales');\nINSERT INTO employees (id, name, department) VALUES (4, 'Ken', 'Sales');\nINSERT INTO employees (id, name, department) VALUES (5, 'Yui', 'Sales');\nINSERT INTO employees (id, name, department) VALUES (6, 'Sora', 'Sales');\nINSERT INTO employees (id, name, department) VALUES (7, 'Haru', 'Engineering');",
  "expectedResultNote": {
    "zh-CN": "只返回人数大于 5 的 Sales 部门。",
    "ja-JP": "人数が5人を超える Sales 部署だけを返します。",
    "en-US": "Returns only Sales, the department with more than five employees."
  },
  "expectedRows": 1,
  "expectedOutput": "",
  "estimatedTime": 20,
  "source": "builtin"
}
,
{
  "id": "sql-having-002",
  "language": "sql",
  "category": "having",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "HAVING 多条件",
    "ja-JP": "HAVING 複数条件",
    "en-US": "HAVING multiple conditions"
  },
  "explanation": {
    "zh-CN": "HAVING 支持 AND/OR 连接多个聚合条件。",
    "ja-JP": "HAVING は AND/OR で複数の集約条件を接続できます。",
    "en-US": "HAVING supports AND/OR to combine multiple aggregate conditions."
  },
  "hint": {
    "zh-CN": "HAVING 中的条件只能引用聚合函数或 GROUP BY 中的列。",
    "ja-JP": "HAVING 内の条件は集約関数か GROUP BY 内の列のみ参照できます。",
    "en-US": "You can use AND, OR, and NOT inside HAVING clauses."
  },
  "focus": ["多条件 HAVING", "AND 连接聚合"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["having"],
  "meaning": {
    "zh-CN": "对GROUP BY后的分组结果筛选的子句。",
    "ja-JP": "GROUP BY集計結果をさらに絞り込む句。",
    "en-US": "Filters grouped results after aggregation."
  },
  "memoryHook": {
    "zh-CN": "HAVING=持ってる→集計結果を条件で絞る。",
    "ja-JP": "HAVING=持っている→集計結果を条件で絞る。",
    "en-US": "HAVING=filter on aggregated data."
  },
  "examPoint": {
    "zh-CN": "WHERE vs HAVING区別必考:WHERE行HAVINGグループ。",
    "ja-JP": "WHEREとHAVING使い分け頻出:WHERE行HAVINGグループ。",
    "en-US": "WHERE filters rows HAVING filters groups."
  },
  "commonMistake": {
    "zh-CN": "HAVING中只能用聚合函数或GROUP BY中的列。",
    "ja-JP": "HAVINGでは集計関数またはGROUP BY列のみ使用可。",
    "en-US": "HAVING uses only aggregates or GROUP BY columns."
  },
  "code": "SELECT department, AVG(salary) FROM employees GROUP BY department HAVING AVG(salary) > 40000 AND COUNT(*) >= 3;",
  "sqlSchema": "DROP TABLE IF EXISTS employees;\nCREATE TABLE IF NOT EXISTS employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);",
  "sqlSeed": "INSERT INTO employees (id, name, department, salary) VALUES (1, 'Aoi', 'Sales', 42000);\nINSERT INTO employees (id, name, department, salary) VALUES (2, 'Ren', 'Sales', 48000);\nINSERT INTO employees (id, name, department, salary) VALUES (3, 'Mika', 'Sales', 51000);\nINSERT INTO employees (id, name, department, salary) VALUES (4, 'Ken', 'Support', 33000);\nINSERT INTO employees (id, name, department, salary) VALUES (5, 'Yui', 'Support', 35000);",
  "expectedResultNote": {
    "zh-CN": "返回平均工资大于 40000 且人数不少于 3 的 Sales 部门。",
    "ja-JP": "平均給与が40000を超え、3人以上いる Sales 部署を返します。",
    "en-US": "Returns Sales, whose average salary exceeds 40000 and has at least three employees."
  },
  "expectedRows": 1,
  "expectedOutput": "",
  "estimatedTime": 22,
  "source": "builtin"
}
,
{
  "id": "sql-join-001",
  "language": "sql",
  "category": "join",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "INNER JOIN",
    "ja-JP": "INNER JOIN",
    "en-US": "INNER JOIN"
  },
  "explanation": {
    "zh-CN": "INNER JOIN 返回两个表中匹配的行。",
    "ja-JP": "INNER JOIN は2つのテーブルで一致する行を返します。",
    "en-US": "INNER JOIN returns only the rows that match in both tables."
  },
  "hint": {
    "zh-CN": "JOIN 条件用 ON，不用 WHERE。",
    "ja-JP": "JOIN の条件は ON を使い、WHERE は使いません。",
    "en-US": "Specify the join condition with ON, not WHERE."
  },
  "focus": ["INNER JOIN 语法", "ON 连接条件", "表名.列名"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["inner_join"],
  "meaning": {
    "zh-CN": "将两个表按关联列连接的操作。",
    "ja-JP": "2つのテーブルを関連列で結合する操作。",
    "en-US": "Combines two tables based on a related column."
  },
  "memoryHook": {
    "zh-CN": "JOIN=結合→2つの表をつなぐ。",
    "ja-JP": "JOIN=結合→2つのテーブルをくっつける。",
    "en-US": "JOIN=connect two tables."
  },
  "examPoint": {
    "zh-CN": "INNER/LEFT JOIN区別ON句是多表SQL最高频考点。",
    "ja-JP": "INNER/LEFT JOIN違いON句指定が頻出。",
    "en-US": "INNER vs LEFT JOIN ON clause."
  },
  "commonMistake": {
    "zh-CN": "忘记写ON条件会导致笛卡尔积。",
    "ja-JP": "ON句忘れで直積(デカルト積)になる。",
    "en-US": "Missing ON condition causes Cartesian product."
  },
  "code": "SELECT * FROM orders INNER JOIN customers ON orders.customer_id = customers.id;",
  "sqlSchema": "DROP TABLE IF EXISTS orders;\nDROP TABLE IF EXISTS customers;\nCREATE TABLE IF NOT EXISTS customers (id INTEGER, name TEXT, city TEXT);\nCREATE TABLE IF NOT EXISTS orders (id INTEGER, customer_id INTEGER, amount REAL, status TEXT);",
  "sqlSeed": "INSERT INTO customers (id, name, city) VALUES (1, 'Alice', 'Tokyo');\nINSERT INTO customers (id, name, city) VALUES (2, 'Bob', 'Osaka');\nINSERT INTO orders (id, customer_id, amount, status) VALUES (101, 1, 80, 'shipped');\nINSERT INTO orders (id, customer_id, amount, status) VALUES (102, 2, 45, 'pending');\nINSERT INTO orders (id, customer_id, amount, status) VALUES (103, 1, 120, 'shipped');",
  "expectedResultNote": {
    "zh-CN": "将 3 条订单与对应客户连接。",
    "ja-JP": "3件の注文を対応する顧客と結合します。",
    "en-US": "Joins three orders with their matching customers."
  },
  "expectedRows": 3,
  "expectedOutput": "",
  "estimatedTime": 22,
  "source": "builtin"
}
,
{
  "id": "sql-join-002",
  "language": "sql",
  "category": "join",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "LEFT JOIN",
    "ja-JP": "LEFT JOIN",
    "en-US": "LEFT JOIN"
  },
  "explanation": {
    "zh-CN": "LEFT JOIN 返回左表所有行，不匹配用 NULL。",
    "ja-JP": "LEFT JOIN は左テーブルのすべての行を返します。一致しない場合は NULL。",
    "en-US": "LEFT JOIN returns all rows from the left table and matching rows from the right. Non-matches become NULL."
  },
  "hint": {
    "zh-CN": "LEFT JOIN 左边的表是主表，所有行都会保留。",
    "ja-JP": "LEFT JOIN の左側のテーブルが主テーブルです。",
    "en-US": "LEFT JOIN preserves all rows from the first (left) table."
  },
  "focus": ["LEFT JOIN 关键字", "左表全部保留"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["inner_join"],
  "meaning": {
    "zh-CN": "将两个表按关联列连接的操作。",
    "ja-JP": "2つのテーブルを関連列で結合する操作。",
    "en-US": "Combines two tables based on a related column."
  },
  "memoryHook": {
    "zh-CN": "JOIN=結合→2つの表をつなぐ。",
    "ja-JP": "JOIN=結合→2つのテーブルをくっつける。",
    "en-US": "JOIN=connect two tables."
  },
  "examPoint": {
    "zh-CN": "INNER/LEFT JOIN区別ON句是多表SQL最高频考点。",
    "ja-JP": "INNER/LEFT JOIN違いON句指定が頻出。",
    "en-US": "INNER vs LEFT JOIN ON clause."
  },
  "commonMistake": {
    "zh-CN": "忘记写ON条件会导致笛卡尔积。",
    "ja-JP": "ON句忘れで直積(デカルト積)になる。",
    "en-US": "Missing ON condition causes Cartesian product."
  },
  "code": "SELECT * FROM customers LEFT JOIN orders ON customers.id = orders.customer_id;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_dep;\nCREATE TABLE ct_dep (id INTEGER, dept TEXT);\nDROP TABLE IF EXISTS ct_emp2;\nCREATE TABLE ct_emp2 (id INTEGER, name TEXT, dept_id INTEGER);",
  "sqlSeed": "INSERT INTO ct_dep VALUES (1,'Sales'),(2,'Eng');\nINSERT INTO ct_emp2 VALUES (1,'Alice',1),(2,'Bob',2),(3,'Aoi',1);",
  "expectedResultNote": {
    "zh-CN": "员工与部门关联",
    "ja-JP": "社員と部署の結合",
    "en-US": "Employees with departments"
  },
  "expectedRows": "varies",
  "expectedOutput": "员工与部门关联",
  "estimatedTime": 20,
  "source": "builtin",
  "expectedColumns": "varies"
}
,
{
  "id": "sql-join-003",
  "language": "sql",
  "category": "join",
  "level": 4,
  "difficulty": 4,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "多表 JOIN",
    "ja-JP": "複数テーブル JOIN",
    "en-US": "Multiple table JOIN"
  },
  "explanation": {
    "zh-CN": "可以连续 JOIN 多个表，使用表别名。",
    "ja-JP": "複数のテーブルを連続で JOIN できます。テーブル別名を使用。",
    "en-US": "You can JOIN multiple tables in a single query using table aliases."
  },
  "hint": {
    "zh-CN": "每个 JOIN 都要有自己的 ON 条件。",
    "ja-JP": "各 JOIN には独立した ON 条件が必要です。",
    "en-US": "Use short aliases (e, d) to make JOIN queries more readable."
  },
  "focus": ["多行 SQL 格式", "表别名", "多个 JOIN"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["inner_join"],
  "meaning": {
    "zh-CN": "将两个表按关联列连接的操作。",
    "ja-JP": "2つのテーブルを関連列で結合する操作。",
    "en-US": "Combines two tables based on a related column."
  },
  "memoryHook": {
    "zh-CN": "JOIN=結合→2つの表をつなぐ。",
    "ja-JP": "JOIN=結合→2つのテーブルをくっつける。",
    "en-US": "JOIN=connect two tables."
  },
  "examPoint": {
    "zh-CN": "INNER/LEFT JOIN区別ON句是多表SQL最高频考点。",
    "ja-JP": "INNER/LEFT JOIN違いON句指定が頻出。",
    "en-US": "INNER vs LEFT JOIN ON clause."
  },
  "commonMistake": {
    "zh-CN": "忘记写ON条件会导致笛卡尔积。",
    "ja-JP": "ON句忘れで直積(デカルト積)になる。",
    "en-US": "Missing ON condition causes Cartesian product."
  },
  "code": "SELECT e.name, d.name AS dept\nFROM employees e\nJOIN departments d ON e.dept_id = d.id\nJOIN projects p ON e.id = p.lead_id;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_prj;\nCREATE TABLE ct_prj (id INTEGER, project TEXT, budget REAL);\nDROP TABLE IF EXISTS ct_assign;\nCREATE TABLE ct_assign (id INTEGER, emp TEXT, project_id INTEGER);",
  "sqlSeed": "INSERT INTO ct_prj VALUES (1,'Alpha',50000),(2,'Beta',75000);\nINSERT INTO ct_assign VALUES (1,'Alice',1),(2,'Bob',1),(3,'Aoi',2);",
  "expectedResultNote": {
    "zh-CN": "查询项目及员工",
    "ja-JP": "プロジェクトと担当者",
    "en-US": "Projects and assignees"
  },
  "expectedRows": "varies",
  "expectedOutput": "查询项目及员工",
  "estimatedTime": 30,
  "source": "builtin",
  "expectedColumns": "varies"
}
,
{
  "id": "sql-join-004",
  "language": "sql",
  "category": "join",
  "level": 4,
  "difficulty": 4,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "SELF JOIN 自连接",
    "ja-JP": "SELF JOIN 自己結合",
    "en-US": "SELF JOIN"
  },
  "explanation": {
    "zh-CN": "SELF JOIN 是表与自身连接。使用不同别名。",
    "ja-JP": "SELF JOIN はテーブル自身との結合です。異なる別名を使用。",
    "en-US": "A SELF JOIN joins a table to itself using different aliases."
  },
  "hint": {
    "zh-CN": "同一个表起两个不同的别名。",
    "ja-JP": "同じテーブルに2つの別名を付けます。",
    "en-US": "Give the table two different aliases to distinguish the roles."
  },
  "focus": ["同一表别名 x2", "各自列限定"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["inner_join"],
  "meaning": {
    "zh-CN": "将两个表按关联列连接的操作。",
    "ja-JP": "2つのテーブルを関連列で結合する操作。",
    "en-US": "Combines two tables based on a related column."
  },
  "memoryHook": {
    "zh-CN": "JOIN=結合→2つの表をつなぐ。",
    "ja-JP": "JOIN=結合→2つのテーブルをくっつける。",
    "en-US": "JOIN=connect two tables."
  },
  "examPoint": {
    "zh-CN": "INNER/LEFT JOIN区別ON句是多表SQL最高频考点。",
    "ja-JP": "INNER/LEFT JOIN違いON句指定が頻出。",
    "en-US": "INNER vs LEFT JOIN ON clause."
  },
  "commonMistake": {
    "zh-CN": "忘记写ON条件会导致笛卡尔积。",
    "ja-JP": "ON句忘れで直積(デカルト積)になる。",
    "en-US": "Missing ON condition causes Cartesian product."
  },
  "code": "SELECT e1.name AS employee, e2.name AS manager\nFROM employees e1\nJOIN employees e2 ON e1.manager_id = e2.id;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_cust;\nCREATE TABLE ct_cust (id INTEGER, name TEXT);\nDROP TABLE IF EXISTS ct_ord;\nCREATE TABLE ct_ord (id INTEGER, cust_id INTEGER, total REAL);",
  "sqlSeed": "INSERT INTO ct_cust VALUES (1,'Alice'),(2,'Bob'),(3,'Aoi');\nINSERT INTO ct_ord VALUES (1,1,80),(2,2,45),(3,1,120),(4,3,200);",
  "expectedResultNote": {
    "zh-CN": "按客户统计订单",
    "ja-JP": "顧客別注文集計",
    "en-US": "Orders by customer"
  },
  "expectedRows": "varies",
  "expectedOutput": "按客户统计订单",
  "estimatedTime": 30,
  "source": "builtin",
  "expectedColumns": "varies"
}
,
{
  "id": "sql-insert-001",
  "language": "sql",
  "category": "insert",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "INSERT INTO 插入",
    "ja-JP": "INSERT INTO 挿入",
    "en-US": "INSERT INTO values"
  },
  "explanation": {
    "zh-CN": "INSERT 向表添加新行。字符串值用单引号。",
    "ja-JP": "INSERT はテーブルに新しい行を追加します。文字列値は一重引用符。",
    "en-US": "INSERT adds a new row to a table. String values use single quotes."
  },
  "hint": {
    "zh-CN": "列名写在表名后的括号内，值在 VALUES 后。",
    "ja-JP": "列名はテーブル名の後の括弧内に、値は VALUES の後。",
    "en-US": "List the column names in parentheses, then the VALUES."
  },
  "focus": ["INSERT INTO 语法", "列名列表", "VALUES 关键字"],
  "examRelevance": "medium",
  "examTargets": ["SQL"],
  "glossaryRefs": ["insert"],
  "meaning": {
    "zh-CN": "向表中添加新行的语句。",
    "ja-JP": "テーブルに新しい行を追加する文。",
    "en-US": "Adds new rows to a table."
  },
  "memoryHook": {
    "zh-CN": "INSERT=挿入→表にデータを入れる。",
    "ja-JP": "INSERT=挿入→テーブルにデータを入れる。",
    "en-US": "INSERT=add data to a table."
  },
  "examPoint": {
    "zh-CN": "INSERT構文(列指定とVALUES)は基本。",
    "ja-JP": "INSERT構文(列指定とVALUES)は基本。",
    "en-US": "Basic INSERT column-list and VALUES syntax."
  },
  "commonMistake": {
    "zh-CN": "列名省略時全列値を順に指定。文字列单引号。",
    "ja-JP": "列名省略時全列値指定。文字列シングルクォート。",
    "en-US": "Omitting column list requires all col values."
  },
  "code": "INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com');",
  "sqlSchema": "DROP TABLE IF EXISTS ct_mem;\nCREATE TABLE ct_mem (id INTEGER, name TEXT, age INTEGER);",
  "sqlSeed": "INSERT INTO ct_mem VALUES (1,'Alice',25);\nINSERT INTO ct_mem VALUES (2,'Bob',31);\nINSERT INTO ct_mem VALUES (3,'Aoi',22);",
  "expectedResultNote": {
    "zh-CN": "插入会员数据",
    "ja-JP": "会員データ追加",
    "en-US": "Insert member data"
  },
  "expectedRows": "varies",
  "expectedOutput": "插入会员数据",
  "estimatedTime": 15,
  "source": "builtin",
  "expectedColumns": "varies"
}
,
{
  "id": "sql-insert-002",
  "language": "sql",
  "category": "insert",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "INSERT 全列简写",
    "ja-JP": "INSERT 全列省略形",
    "en-US": "INSERT all columns"
  },
  "explanation": {
    "zh-CN": "不指定列名需要按顺序提供所有列的值。",
    "ja-JP": "列名を指定しない場合、定義順にすべての列の値を提供します。",
    "en-US": "Without column names, you must provide values for all columns in table order."
  },
  "hint": {
    "zh-CN": "不写列名时，值顺序必须与表结构列顺序一致。",
    "ja-JP": "列名省略時は値の順序をテーブル構造に合わせます。",
    "en-US": "The order and number of values must match the table definition exactly."
  },
  "focus": ["无列名简写", "值顺序一致"],
  "examRelevance": "medium",
  "examTargets": ["SQL"],
  "glossaryRefs": ["insert"],
  "meaning": {
    "zh-CN": "向表中添加新行的语句。",
    "ja-JP": "テーブルに新しい行を追加する文。",
    "en-US": "Adds new rows to a table."
  },
  "memoryHook": {
    "zh-CN": "INSERT=挿入→表にデータを入れる。",
    "ja-JP": "INSERT=挿入→テーブルにデータを入れる。",
    "en-US": "INSERT=add data to a table."
  },
  "examPoint": {
    "zh-CN": "INSERT構文(列指定とVALUES)は基本。",
    "ja-JP": "INSERT構文(列指定とVALUES)は基本。",
    "en-US": "Basic INSERT column-list and VALUES syntax."
  },
  "commonMistake": {
    "zh-CN": "列名省略時全列値を順に指定。文字列单引号。",
    "ja-JP": "列名省略時全列値指定。文字列シングルクォート。",
    "en-US": "Omitting column list requires all col values."
  },
  "code": "INSERT INTO users VALUES (1, 'Alice', 'alice@example.com');",
  "sqlSchema": "DROP TABLE IF EXISTS ct_bk;\nCREATE TABLE ct_bk (id INTEGER, title TEXT, price REAL);",
  "sqlSeed": "INSERT INTO ct_bk VALUES (1,'SQL 101',29.9);\nINSERT INTO ct_bk VALUES (2,'Python Guide',39.9);\nINSERT INTO ct_bk VALUES (3,'Java Basics',34.9);",
  "expectedResultNote": {
    "zh-CN": "插入书籍数据",
    "ja-JP": "書籍データ追加",
    "en-US": "Insert book data"
  },
  "expectedRows": "varies",
  "expectedOutput": "插入书籍数据",
  "estimatedTime": 12,
  "source": "builtin",
  "expectedColumns": "varies"
}
,
{
  "id": "sql-insert-003",
  "language": "sql",
  "category": "insert",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "INSERT SELECT",
    "ja-JP": "INSERT SELECT",
    "en-US": "INSERT from SELECT"
  },
  "explanation": {
    "zh-CN": "INSERT SELECT 将查询结果插入目标表。",
    "ja-JP": "INSERT SELECT は検索結果をターゲットテーブルに挿入します。",
    "en-US": "INSERT INTO ... SELECT copies query results into a target table."
  },
  "hint": {
    "zh-CN": "INSERT 和 SELECT 的列必须匹配。",
    "ja-JP": "INSERT と SELECT の列を一致させる必要があります。",
    "en-US": "The source query column types must match the target table."
  },
  "focus": ["SELECT 子查询", "列匹配"],
  "examRelevance": "medium",
  "examTargets": ["SQL"],
  "glossaryRefs": ["insert"],
  "meaning": {
    "zh-CN": "向表中添加新行的语句。",
    "ja-JP": "テーブルに新しい行を追加する文。",
    "en-US": "Adds new rows to a table."
  },
  "memoryHook": {
    "zh-CN": "INSERT=挿入→表にデータを入れる。",
    "ja-JP": "INSERT=挿入→テーブルにデータを入れる。",
    "en-US": "INSERT=add data to a table."
  },
  "examPoint": {
    "zh-CN": "INSERT構文(列指定とVALUES)は基本。",
    "ja-JP": "INSERT構文(列指定とVALUES)は基本。",
    "en-US": "Basic INSERT column-list and VALUES syntax."
  },
  "commonMistake": {
    "zh-CN": "列名省略時全列値を順に指定。文字列单引号。",
    "ja-JP": "列名省略時全列値指定。文字列シングルクォート。",
    "en-US": "Omitting column list requires all col values."
  },
  "code": "INSERT INTO archive_orders\nSELECT * FROM orders WHERE created_at < '2024-01-01';",
  "sqlSchema": "DROP TABLE IF EXISTS ct_lg;\nCREATE TABLE ct_lg (id INTEGER, action TEXT, user_id INTEGER);",
  "sqlSeed": "INSERT INTO ct_lg VALUES (1,'login',1);\nINSERT INTO ct_lg VALUES (2,'view',2);\nINSERT INTO ct_lg VALUES (3,'logout',1);\nINSERT INTO ct_lg VALUES (4,'login',3);",
  "expectedResultNote": {
    "zh-CN": "插入日志数据",
    "ja-JP": "ログデータ追加",
    "en-US": "Insert log data"
  },
  "expectedRows": "varies",
  "expectedOutput": "插入日志数据",
  "estimatedTime": 22,
  "source": "builtin",
  "expectedColumns": "varies"
}
,
{
  "id": "sql-update-001",
  "language": "sql",
  "category": "update",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "UPDATE 更新",
    "ja-JP": "UPDATE 更新",
    "en-US": "UPDATE statement"
  },
  "explanation": {
    "zh-CN": "UPDATE 修改表中的数据。务必写 WHERE！",
    "ja-JP": "UPDATE はテーブルのデータを変更します。必ず WHERE を書きましょう！",
    "en-US": "UPDATE modifies existing data in a table. Always use WHERE!"
  },
  "hint": {
    "zh-CN": "务必写 WHERE 条件，否则会更新全表！",
    "ja-JP": "必ず WHERE 条件を書きましょう！忘れると全テーブルが更新されます！",
    "en-US": "Omitting WHERE updates ALL rows—always double-check."
  },
  "focus": ["UPDATE 表名", "SET 列 = 值", "WHERE 条件"],
  "examRelevance": "medium",
  "examTargets": ["SQL"],
  "glossaryRefs": ["update"],
  "meaning": {
    "zh-CN": "修改表中已有数据的语句。",
    "ja-JP": "テーブルの既存データを更新する文。",
    "en-US": "Modifies existing data in a table."
  },
  "memoryHook": {
    "zh-CN": "UPDATE=更新→データを新しい値に変える。",
    "ja-JP": "UPDATE=更新→データを新しい値に変える。",
    "en-US": "UPDATE=change existing data."
  },
  "examPoint": {
    "zh-CN": "UPDATE必带WHERE。WHERE无则全行更新是重大错误。",
    "ja-JP": "UPDATEにはWHERE必須。無しで全行更新は重大ミス。",
    "en-US": "Always use WHERE with UPDATE."
  },
  "commonMistake": {
    "zh-CN": "UPDATE无WHERE会更新全表！",
    "ja-JP": "WHERE忘れると全行更新の重大ミス。",
    "en-US": "Missing WHERE updates every row!"
  },
  "code": "UPDATE users SET age = 26 WHERE name = 'Alice';",
  "sqlSchema": "DROP TABLE IF EXISTS users;\nCREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT, age INTEGER);",
  "sqlSeed": "INSERT INTO users (id, name, age) VALUES (1, 'Alice', 25);\nINSERT INTO users (id, name, age) VALUES (2, 'Bob', 31);",
  "expectedResultNote": {
    "zh-CN": "将 Alice 的年龄更新为 26。",
    "ja-JP": "Alice の年齢を26に更新します。",
    "en-US": "Updates Alice's age to 26."
  },
  "expectedRows": 1,
  "expectedOutput": "",
  "estimatedTime": 12,
  "source": "builtin"
}
,
{
  "id": "sql-update-002",
  "language": "sql",
  "category": "update",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "UPDATE 多列",
    "ja-JP": "UPDATE 複数列",
    "en-US": "UPDATE multiple columns"
  },
  "explanation": {
    "zh-CN": "UPDATE 可以同时更新多个列。",
    "ja-JP": "UPDATE は複数の列を同時に更新できます。",
    "en-US": "UPDATE can modify multiple columns in a single statement."
  },
  "hint": {
    "zh-CN": "SET 后面可以跟多个列=值对，用逗号分隔。",
    "ja-JP": "SET の後に複数の「列=値」をカンマで区切ります。",
    "en-US": "Separate column assignments with commas."
  },
  "focus": ["SET 多列逗号分隔", "WHERE 定位行"],
  "examRelevance": "medium",
  "examTargets": ["SQL"],
  "glossaryRefs": ["update"],
  "meaning": {
    "zh-CN": "修改表中已有数据的语句。",
    "ja-JP": "テーブルの既存データを更新する文。",
    "en-US": "Modifies existing data in a table."
  },
  "memoryHook": {
    "zh-CN": "UPDATE=更新→データを新しい値に変える。",
    "ja-JP": "UPDATE=更新→データを新しい値に変える。",
    "en-US": "UPDATE=change existing data."
  },
  "examPoint": {
    "zh-CN": "UPDATE必带WHERE。WHERE无则全行更新是重大错误。",
    "ja-JP": "UPDATEにはWHERE必須。無しで全行更新は重大ミス。",
    "en-US": "Always use WHERE with UPDATE."
  },
  "commonMistake": {
    "zh-CN": "UPDATE无WHERE会更新全表！",
    "ja-JP": "WHERE忘れると全行更新の重大ミス。",
    "en-US": "Missing WHERE updates every row!"
  },
  "code": "UPDATE products SET price = 29.99, stock = 100 WHERE id = 5;",
  "sqlSchema": "DROP TABLE IF EXISTS products;\nCREATE TABLE IF NOT EXISTS products (id INTEGER, name TEXT, price REAL, stock INTEGER);",
  "sqlSeed": "INSERT INTO products (id, name, price, stock) VALUES (5, 'Keyboard', 35.5, 20);\nINSERT INTO products (id, name, price, stock) VALUES (6, 'Mouse', 18.0, 50);",
  "expectedResultNote": {
    "zh-CN": "将 id 为 5 的商品价格和库存一起更新。",
    "ja-JP": "id が5の商品について価格と在庫を更新します。",
    "en-US": "Updates both price and stock for product 5."
  },
  "expectedRows": 1,
  "expectedOutput": "",
  "estimatedTime": 12,
  "source": "builtin"
}
,
{
  "id": "sql-delete-001",
  "language": "sql",
  "category": "delete",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "DELETE 删除行",
    "ja-JP": "DELETE 行削除",
    "en-US": "DELETE statement"
  },
  "explanation": {
    "zh-CN": "DELETE 用于删除表中的行。务必写 WHERE！",
    "ja-JP": "DELETE はテーブルの行を削除します。必ず WHERE を書きましょう！",
    "en-US": "DELETE removes rows from a table. Always use WHERE!"
  },
  "hint": {
    "zh-CN": "务必写 WHERE！不写会删除全表！",
    "ja-JP": "必ず WHERE を書きましょう！忘れると全データが削除されます！",
    "en-US": "Without WHERE, DELETE removes every row in the table."
  },
  "focus": ["DELETE FROM 语法", "WHERE 条件"],
  "examRelevance": "medium",
  "examTargets": ["SQL"],
  "glossaryRefs": ["delete"],
  "meaning": {
    "zh-CN": "从表中删除行的语句。",
    "ja-JP": "テーブルから行を削除する文。",
    "en-US": "Removes rows from a table."
  },
  "memoryHook": {
    "zh-CN": "DELETE=削除→データを消す。",
    "ja-JP": "DELETE=削除→データを消す。",
    "en-US": "DELETE=remove rows."
  },
  "examPoint": {
    "zh-CN": "DELETE也需要WHERE。無しで全件削除。",
    "ja-JP": "DELETEにもWHERE必須。無しで全件削除。",
    "en-US": "DELETE needs WHERE too."
  },
  "commonMistake": {
    "zh-CN": "DELETE删行表结构残留。DROP TABLE删整表。",
    "ja-JP": "DELETE行削除テーブル残る。DROP TABLEはテーブルごと削除。",
    "en-US": "DELETE removes rows DROP removes table."
  },
  "code": "DELETE FROM users WHERE id = 10;",
  "sqlSchema": "DROP TABLE IF EXISTS users;\nCREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT);",
  "sqlSeed": "INSERT INTO users (id, name) VALUES (9, 'Aoi');\nINSERT INTO users (id, name) VALUES (10, 'Ren');\nINSERT INTO users (id, name) VALUES (11, 'Mika');",
  "expectedResultNote": {
    "zh-CN": "删除 id 为 10 的一行。",
    "ja-JP": "id が10の1行を削除します。",
    "en-US": "Deletes the row whose id is 10."
  },
  "expectedRows": 1,
  "expectedOutput": "",
  "estimatedTime": 12,
  "source": "builtin"
}
,
{
  "id": "sql-delete-002",
  "language": "sql",
  "category": "delete",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "DELETE 多条件",
    "ja-JP": "DELETE 複数条件",
    "en-US": "DELETE with conditions"
  },
  "explanation": {
    "zh-CN": "DELETE 可以使用 AND/OR 组合条件。",
    "ja-JP": "DELETE は AND/OR で複数の条件を組み合わせられます。",
    "en-US": "DELETE can combine multiple conditions with AND/OR."
  },
  "hint": {
    "zh-CN": "多个条件用 AND 连接，确保只删除目标数据。",
    "ja-JP": "複数の条件を AND で接続し、対象データのみ削除します。",
    "en-US": "Build complex conditions just like in a SELECT WHERE clause."
  },
  "focus": ["AND 多条件", "条件精确性"],
  "examRelevance": "medium",
  "examTargets": ["SQL"],
  "glossaryRefs": ["delete"],
  "meaning": {
    "zh-CN": "从表中删除行的语句。",
    "ja-JP": "テーブルから行を削除する文。",
    "en-US": "Removes rows from a table."
  },
  "memoryHook": {
    "zh-CN": "DELETE=削除→データを消す。",
    "ja-JP": "DELETE=削除→データを消す。",
    "en-US": "DELETE=remove rows."
  },
  "examPoint": {
    "zh-CN": "DELETE也需要WHERE。無しで全件削除。",
    "ja-JP": "DELETEにもWHERE必須。無しで全件削除。",
    "en-US": "DELETE needs WHERE too."
  },
  "commonMistake": {
    "zh-CN": "DELETE删行表结构残留。DROP TABLE删整表。",
    "ja-JP": "DELETE行削除テーブル残る。DROP TABLEはテーブルごと削除。",
    "en-US": "DELETE removes rows DROP removes table."
  },
  "code": "DELETE FROM orders WHERE status = 'cancelled' AND created_at < '2024-01-01';",
  "sqlSchema": "DROP TABLE IF EXISTS orders;\nCREATE TABLE IF NOT EXISTS orders (id INTEGER, status TEXT, created_at TEXT);",
  "sqlSeed": "INSERT INTO orders (id, status, created_at) VALUES (1, 'cancelled', '2023-10-01');\nINSERT INTO orders (id, status, created_at) VALUES (2, 'cancelled', '2024-02-01');\nINSERT INTO orders (id, status, created_at) VALUES (3, 'shipped', '2023-08-01');",
  "expectedResultNote": {
    "zh-CN": "删除 2024 年前已取消的订单。",
    "ja-JP": "2024年より前にキャンセルされた注文を削除します。",
    "en-US": "Deletes cancelled orders created before 2024."
  },
  "expectedRows": 1,
  "expectedOutput": "",
  "estimatedTime": 15,
  "source": "builtin"
}
,
{
  "id": "sql-count-001",
  "language": "sql",
  "category": "count",
  "level": 1,
  "difficulty": 1,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "COUNT 统计行数",
    "ja-JP": "COUNT 行数カウント",
    "en-US": "COUNT rows"
  },
  "explanation": {
    "zh-CN": "COUNT 返回指定列的行数。",
    "ja-JP": "COUNT は指定された列の行数を返します。",
    "en-US": "COUNT returns the number of rows in a column or table."
  },
  "hint": {
    "zh-CN": "COUNT(*) 统计所有行。",
    "ja-JP": "COUNT(*) ですべての行をカウントします。",
    "en-US": "COUNT(*) counts all rows; COUNT(column) counts non-null values."
  },
  "focus": ["COUNT 语法", "括号", "* 代表所有行"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["aggregate_function"],
  "meaning": {
    "zh-CN": "统计行数的聚合函数。",
    "ja-JP": "行数をカウントする集計関数。",
    "en-US": "Aggregate function counting rows."
  },
  "memoryHook": {
    "zh-CN": "COUNT=数える→行数をカウント。",
    "ja-JP": "COUNT=数える→行数をカウント。",
    "en-US": "COUNT=count the number of rows."
  },
  "examPoint": {
    "zh-CN": "COUNT(*)全行vs COUNT(列)非NULL。ITPassport頻出。",
    "ja-JP": "COUNT(*)全行COUNT(列)NULL除外。ITパスポート頻出。",
    "en-US": "COUNT star all rows. COUNT col excludes NULLs."
  },
  "commonMistake": {
    "zh-CN": "COUNT(列)跳过NULL。COUNT(*)包含NULL。",
    "ja-JP": "COUNT(列)NULL除外。COUNT(*)NULL含む。",
    "en-US": "COUNT col skips NULLs. COUNT star counts all."
  },
  "code": "SELECT COUNT(*) FROM students;",
  "sqlSchema": "DROP TABLE IF EXISTS students;\nCREATE TABLE IF NOT EXISTS students (id INTEGER, name TEXT, score INTEGER);",
  "sqlSeed": "INSERT INTO students (id, name, score) VALUES (1, 'Aoi', 92);\nINSERT INTO students (id, name, score) VALUES (2, 'Ren', 81);\nINSERT INTO students (id, name, score) VALUES (3, 'Mika', 68);",
  "expectedResultNote": {
    "zh-CN": "返回学生总数 3。",
    "ja-JP": "学生数3を返します。",
    "en-US": "Returns a student count of three."
  },
  "expectedRows": 1,
  "expectedOutput": "",
  "estimatedTime": 8,
  "source": "builtin",
  "expectedColumns": ["COUNT(*)"]
}
,
{
  "id": "sql-like-001",
  "language": "sql",
  "category": "like",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "LIKE 模糊匹配",
    "ja-JP": "LIKE 曖昧検索",
    "en-US": "LIKE pattern"
  },
  "explanation": {
    "zh-CN": "LIKE 用 % 表示任意字符，_ 表示单个字符。",
    "ja-JP": "LIKE はパターンマッチングに使います。% は任意の文字。",
    "en-US": "LIKE matches patterns: % matches any sequence, _ matches a single character."
  },
  "hint": {
    "zh-CN": "'A%' = 以 A 开头，'%A' = 以 A 结尾。",
    "ja-JP": "'A%' = A で始まる、'%A' = A で終わる。",
    "en-US": "'A%' matches any string starting with A."
  },
  "focus": ["LIKE 关键字", "% 通配符"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport"],
  "glossaryRefs": ["like"],
  "meaning": {
    "zh-CN": "字符串模式匹配运算符。",
    "ja-JP": "文字列のパターンマッチング演算子。",
    "en-US": "String pattern matching operator."
  },
  "memoryHook": {
    "zh-CN": "LIKE=好き→パターン一致。",
    "ja-JP": "LIKE=好き→パターンで検索。",
    "en-US": "LIKE=pattern matching with wildcards."
  },
  "examPoint": {
    "zh-CN": "%(任意文字列)と_(任意1文字)区別ITPassport頻出。",
    "ja-JP": "%(任意文字列)_(任意1文字)区別頻出。",
    "en-US": "Percent any chars underscore single char."
  },
  "commonMistake": {
    "zh-CN": "%表任意字符串_表任意单字符。",
    "ja-JP": "%任意文字列_任意1文字。",
    "en-US": "Percent any string underscore one char."
  },
  "code": "SELECT * FROM users WHERE name LIKE 'A%';",
  "sqlSchema": "DROP TABLE IF EXISTS users;\nCREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT);",
  "sqlSeed": "INSERT INTO users (id, name) VALUES (1, 'Alice');\nINSERT INTO users (id, name) VALUES (2, 'Aoi');\nINSERT INTO users (id, name) VALUES (3, 'Bob');",
  "expectedResultNote": {
    "zh-CN": "返回名字以 A 开头的 Alice 和 Aoi。",
    "ja-JP": "名前が A で始まる Alice と Aoi を返します。",
    "en-US": "Returns Alice and Aoi, whose names begin with A."
  },
  "expectedRows": 2,
  "expectedOutput": "",
  "estimatedTime": 12,
  "source": "builtin"
}
,
{
  "id": "sql-limit-001",
  "language": "sql",
  "category": "limit",
  "level": 1,
  "difficulty": 1,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "LIMIT 限制行数",
    "ja-JP": "LIMIT 行数制限",
    "en-US": "LIMIT clause"
  },
  "explanation": {
    "zh-CN": "LIMIT 限制返回的行数。",
    "ja-JP": "LIMIT は返される行数を制限します。",
    "en-US": "LIMIT restricts the number of rows returned."
  },
  "hint": {
    "zh-CN": "LIMIT 写在所有子句的后面。",
    "ja-JP": "LIMIT は他のすべての句の最後に書きます。",
    "en-US": "LIMIT is written at the very end of the query."
  },
  "focus": ["LIMIT 位置", "数字参数", "与 ORDER BY 结合"],
  "examRelevance": "high",
  "examTargets": ["SQL", "基本情報"],
  "glossaryRefs": ["limit"],
  "meaning": {
    "zh-CN": "限制查询返回行数的子句。",
    "ja-JP": "クエリ結果の行数を制限する句。",
    "en-US": "Limits number of returned rows."
  },
  "memoryHook": {
    "zh-CN": "LIMIT=制限→結果行数を制限。",
    "ja-JP": "LIMIT=制限→結果行数を制限。",
    "en-US": "LIMIT=restrict result rows."
  },
  "examPoint": {
    "zh-CN": "ORDER BY+LIMIT=上位N件。基本情報技術者出題。",
    "ja-JP": "ORDER BY+LIMIT上位N件。基本情報技術者出題。",
    "en-US": "ORDER BY+LIMIT top-N query pattern."
  },
  "commonMistake": {
    "zh-CN": "LIMIT通常在ORDER BY之后。",
    "ja-JP": "LIMITはORDER BYの後に書く。",
    "en-US": "LIMIT goes after ORDER BY."
  },
  "code": "SELECT * FROM products ORDER BY price DESC LIMIT 10;",
  "sqlSchema": "DROP TABLE IF EXISTS products;\nCREATE TABLE IF NOT EXISTS products (id INTEGER, name TEXT, price REAL);",
  "sqlSeed": "INSERT INTO products (id, name, price) VALUES (1, 'P1', 10);\nINSERT INTO products (id, name, price) VALUES (2, 'P2', 20);\nINSERT INTO products (id, name, price) VALUES (3, 'P3', 30);\nINSERT INTO products (id, name, price) VALUES (4, 'P4', 40);\nINSERT INTO products (id, name, price) VALUES (5, 'P5', 50);\nINSERT INTO products (id, name, price) VALUES (6, 'P6', 60);\nINSERT INTO products (id, name, price) VALUES (7, 'P7', 70);\nINSERT INTO products (id, name, price) VALUES (8, 'P8', 80);\nINSERT INTO products (id, name, price) VALUES (9, 'P9', 90);\nINSERT INTO products (id, name, price) VALUES (10, 'P10', 100);\nINSERT INTO products (id, name, price) VALUES (11, 'P11', 110);\nINSERT INTO products (id, name, price) VALUES (12, 'P12', 120);",
  "expectedResultNote": {
    "zh-CN": "按价格降序返回前 10 个商品。",
    "ja-JP": "価格の降順で上位10商品を返します。",
    "en-US": "Returns the ten highest-priced products."
  },
  "expectedRows": 10,
  "expectedOutput": "",
  "estimatedTime": 10,
  "source": "builtin"
}
,
{
  "id": "sql-case-001",
  "language": "sql",
  "category": "case_when",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "CASE WHEN 条件判断",
    "ja-JP": "CASE WHEN 条件分岐",
    "en-US": "CASE WHEN conditional"
  },
  "explanation": {
    "zh-CN": "CASE WHEN 根据条件返回不同值",
    "ja-JP": "条件に応じて異なる値を返す",
    "en-US": "Return values based on conditions"
  },
  "hint": {
    "zh-CN": "CASE WHEN score>=90 THEN A",
    "ja-JP": "CASE WHEN score>=90 THEN A",
    "en-US": "CASE WHEN score>=90 THEN A"
  },
  "focus": ["CASE", "WHEN", "THEN", "END"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["case_when"],
  "meaning": {
    "zh-CN": "实现条件分支逻辑的SQL表达式。",
    "ja-JP": "条件分岐を実現するSQL式。",
    "en-US": "SQL conditional expression."
  },
  "memoryHook": {
    "zh-CN": "CASE=場合→条件ごとに値を分ける。",
    "ja-JP": "CASE=場合→条件によって値を変える。",
    "en-US": "CASE=conditional value based on WHEN."
  },
  "examPoint": {
    "zh-CN": "CASE WHEN THEN ELSE END構文是SQL試験頻出。",
    "ja-JP": "CASE WHEN THEN ELSE END構文SQL試験頻出。",
    "en-US": "CASE WHEN THEN ELSE END syntax."
  },
  "commonMistake": {
    "zh-CN": "ENDで閉じること。ELSE省略時NULL。",
    "ja-JP": "ENDで閉じる。ELSE省略時NULL。",
    "en-US": "Close with END. ELSE defaults to NULL."
  },
  "code": "SELECT name,\n  CASE WHEN score >= 90 THEN 'A'\n       WHEN score >= 80 THEN 'B'\n       ELSE 'C'\n  END AS grade\nFROM ct_sc2;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_sc2;\nCREATE TABLE ct_sc2 (id INTEGER, name TEXT, score INTEGER);",
  "sqlSeed": "INSERT INTO ct_sc2 VALUES (1,'Alice',95);\nINSERT INTO ct_sc2 VALUES (2,'Bob',82);\nINSERT INTO ct_sc2 VALUES (3,'Aoi',67);",
  "expectedResultNote": {
    "zh-CN": "返回姓名和等级",
    "ja-JP": "名前と評価を返す",
    "en-US": "Return names and grades"
  },
  "expectedRows": 3,
  "estimatedTime": 60,
  "source": "builtin",
  "expectedOutput": "Alice|A Bob|B Aoi|C",
  "expectedColumns": "name,grade"
}
,
{
  "id": "sql-case-002",
  "language": "sql",
  "category": "case_when",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "CASE 状态映射",
    "ja-JP": "CASE 状態変換",
    "en-US": "CASE status mapping"
  },
  "explanation": {
    "zh-CN": "CASE 将数值状态转换为文本",
    "ja-JP": "数値ステータスをテキストに変換",
    "en-US": "Map numeric status to text"
  },
  "hint": {
    "zh-CN": "CASE status WHEN 1 THEN Active",
    "ja-JP": "CASE status WHEN 1 THEN Active",
    "en-US": "CASE status WHEN 1 THEN Active"
  },
  "focus": ["CASE", "WHEN", "THEN", "ELSE"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["case_when"],
  "meaning": {
    "zh-CN": "实现条件分支逻辑的SQL表达式。",
    "ja-JP": "条件分岐を実現するSQL式。",
    "en-US": "SQL conditional expression."
  },
  "memoryHook": {
    "zh-CN": "CASE=場合→条件ごとに値を分ける。",
    "ja-JP": "CASE=場合→条件によって値を変える。",
    "en-US": "CASE=conditional value based on WHEN."
  },
  "examPoint": {
    "zh-CN": "CASE WHEN THEN ELSE END構文是SQL試験頻出。",
    "ja-JP": "CASE WHEN THEN ELSE END構文SQL試験頻出。",
    "en-US": "CASE WHEN THEN ELSE END syntax."
  },
  "commonMistake": {
    "zh-CN": "ENDで閉じること。ELSE省略時NULL。",
    "ja-JP": "ENDで閉じる。ELSE省略時NULL。",
    "en-US": "Close with END. ELSE defaults to NULL."
  },
  "code": "SELECT id,\n  CASE status\n    WHEN 1 THEN 'Active'\n    WHEN 2 THEN 'Inactive'\n    ELSE 'Unknown'\n  END AS label\nFROM ct_st;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_st;\nCREATE TABLE ct_st (id INTEGER, status INTEGER);",
  "sqlSeed": "INSERT INTO ct_st VALUES (1,1),(2,2),(3,3);",
  "expectedResultNote": {
    "zh-CN": "显示ID和状态标签",
    "ja-JP": "IDと状態ラベルを表示",
    "en-US": "Show ID and status label"
  },
  "expectedRows": 3,
  "estimatedTime": 60,
  "source": "builtin",
  "expectedOutput": "id|label\n1|Active\n2|Inactive\n3|Unknown",
  "expectedColumns": "id,label"
}
,
{
  "id": "sql-subquery-001",
  "language": "sql",
  "category": "subquery",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "标量子查询",
    "ja-JP": "スカラサブクエリ",
    "en-US": "Scalar subquery"
  },
  "explanation": {
    "zh-CN": "SELECT中嵌入标量子查询",
    "ja-JP": "SELECT内でスカラサブクエリを使用",
    "en-US": "Embed scalar subquery in SELECT"
  },
  "hint": {
    "zh-CN": "SELECT (SELECT MAX(amount) FROM orders)",
    "ja-JP": "SELECT (SELECT MAX(amount) FROM orders)",
    "en-US": "SELECT (SELECT MAX(amount) FROM orders)"
  },
  "focus": ["SELECT", "subquery", "MAX"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["subquery"],
  "meaning": {
    "zh-CN": "嵌套在另一查询内部的查询。",
    "ja-JP": "別のクエリ内部で実行されるクエリ。",
    "en-US": "Query nested inside another query."
  },
  "memoryHook": {
    "zh-CN": "SUBQUERY=副問合せ→クエリの中のクエリ。",
    "ja-JP": "SUBQUERY=副問合せ→メインクエリの中のクエリ。",
    "en-US": "Subquery=query within a query."
  },
  "examPoint": {
    "zh-CN": "WHERE IN/EXISTS/FROMのサブクエリは試験頻出。",
    "ja-JP": "WHERE IN/EXISTS/FROMサブクエリ頻出。",
    "en-US": "Subqueries in WHERE IN EXISTS FROM."
  },
  "commonMistake": {
    "zh-CN": "サブクエリは()で囲むこと。1行返すか複数行か注意。",
    "ja-JP": "サブクエリは()で囲む。単一/複数行戻り値注意。",
    "en-US": "Enclose in parens. Watch for single vs multi-row."
  },
  "code": "SELECT name,\n  (SELECT MAX(amount) FROM ct_os WHERE ct_os.uid = ct_us.id) AS max_ord\nFROM ct_us;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_us;\nCREATE TABLE ct_us (id INTEGER, name TEXT);\nDROP TABLE IF EXISTS ct_os;\nCREATE TABLE ct_os (id INTEGER, uid INTEGER, amount REAL);",
  "sqlSeed": "INSERT INTO ct_us VALUES (1,'Alice'),(2,'Bob');\nINSERT INTO ct_os VALUES (1,1,100),(2,1,200),(3,2,150);",
  "expectedResultNote": {
    "zh-CN": "每位用户的最高订单金额",
    "ja-JP": "各ユーザーの最大注文金額",
    "en-US": "Max order per user"
  },
  "expectedRows": 2,
  "estimatedTime": 90,
  "source": "builtin",
  "expectedOutput": "Alice|200 Bob|150",
  "expectedColumns": "name,max_ord"
}
,
{
  "id": "sql-subquery-002",
  "language": "sql",
  "category": "subquery",
  "level": 4,
  "difficulty": 4,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "IN 子查询",
    "ja-JP": "IN サブクエリ",
    "en-US": "IN subquery"
  },
  "explanation": {
    "zh-CN": "子查询结果作为 IN 条件",
    "ja-JP": "サブクエリ結果をIN条件に",
    "en-US": "Subquery result as IN condition"
  },
  "hint": {
    "zh-CN": "WHERE id IN (SELECT uid FROM orders)",
    "ja-JP": "WHERE id IN (SELECT uid FROM orders)",
    "en-US": "WHERE id IN (SELECT uid FROM orders)"
  },
  "focus": ["IN", "subquery", "WHERE"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["subquery"],
  "meaning": {
    "zh-CN": "嵌套在另一查询内部的查询。",
    "ja-JP": "別のクエリ内部で実行されるクエリ。",
    "en-US": "Query nested inside another query."
  },
  "memoryHook": {
    "zh-CN": "SUBQUERY=副問合せ→クエリの中のクエリ。",
    "ja-JP": "SUBQUERY=副問合せ→メインクエリの中のクエリ。",
    "en-US": "Subquery=query within a query."
  },
  "examPoint": {
    "zh-CN": "WHERE IN/EXISTS/FROMのサブクエリは試験頻出。",
    "ja-JP": "WHERE IN/EXISTS/FROMサブクエリ頻出。",
    "en-US": "Subqueries in WHERE IN EXISTS FROM."
  },
  "commonMistake": {
    "zh-CN": "サブクエリは()で囲むこと。1行返すか複数行か注意。",
    "ja-JP": "サブクエリは()で囲む。単一/複数行戻り値注意。",
    "en-US": "Enclose in parens. Watch for single vs multi-row."
  },
  "code": "SELECT * FROM ct_cs\nWHERE id IN (\n  SELECT uid FROM ct_os2 WHERE amount > 100\n);",
  "sqlSchema": "DROP TABLE IF EXISTS ct_cs;\nCREATE TABLE ct_cs (id INTEGER, name TEXT);\nDROP TABLE IF EXISTS ct_os2;\nCREATE TABLE ct_os2 (id INTEGER, uid INTEGER, amount REAL);",
  "sqlSeed": "INSERT INTO ct_cs VALUES (1,'Alice'),(2,'Bob'),(3,'Aoi');\nINSERT INTO ct_os2 VALUES (1,1,80),(2,1,150),(3,3,200);",
  "expectedResultNote": {
    "zh-CN": "订单超过100的客户",
    "ja-JP": "注文が100超の顧客",
    "en-US": "Customers with orders > 100"
  },
  "expectedRows": 2,
  "estimatedTime": 120,
  "source": "builtin",
  "expectedOutput": "1|Alice 3|Aoi",
  "expectedColumns": "id,name"
}
,
{
  "id": "sql-subquery-003",
  "language": "sql",
  "category": "subquery",
  "level": 4,
  "difficulty": 4,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "EXISTS 子查询",
    "ja-JP": "EXISTS サブクエリ",
    "en-US": "EXISTS subquery"
  },
  "explanation": {
    "zh-CN": "EXISTS 检查子查询是否有行",
    "ja-JP": "EXISTSでサブクエリに行があるか確認",
    "en-US": "EXISTS checks if subquery returns rows"
  },
  "hint": {
    "zh-CN": "WHERE EXISTS (SELECT 1 FROM ...)",
    "ja-JP": "WHERE EXISTS (SELECT 1 FROM ...)",
    "en-US": "WHERE EXISTS (SELECT 1 FROM ...)"
  },
  "focus": ["EXISTS", "WHERE", "correlated"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["subquery"],
  "meaning": {
    "zh-CN": "嵌套在另一查询内部的查询。",
    "ja-JP": "別のクエリ内部で実行されるクエリ。",
    "en-US": "Query nested inside another query."
  },
  "memoryHook": {
    "zh-CN": "SUBQUERY=副問合せ→クエリの中のクエリ。",
    "ja-JP": "SUBQUERY=副問合せ→メインクエリの中のクエリ。",
    "en-US": "Subquery=query within a query."
  },
  "examPoint": {
    "zh-CN": "WHERE IN/EXISTS/FROMのサブクエリは試験頻出。",
    "ja-JP": "WHERE IN/EXISTS/FROMサブクエリ頻出。",
    "en-US": "Subqueries in WHERE IN EXISTS FROM."
  },
  "commonMistake": {
    "zh-CN": "サブクエリは()で囲むこと。1行返すか複数行か注意。",
    "ja-JP": "サブクエリは()で囲む。単一/複数行戻り値注意。",
    "en-US": "Enclose in parens. Watch for single vs multi-row."
  },
  "code": "SELECT name FROM ct_cx c\nWHERE EXISTS (\n  SELECT 1 FROM ct_ox o\n  WHERE o.cid = c.id\n);",
  "sqlSchema": "DROP TABLE IF EXISTS ct_cx;\nCREATE TABLE ct_cx (id INTEGER, name TEXT);\nDROP TABLE IF EXISTS ct_ox;\nCREATE TABLE ct_ox (id INTEGER, cid INTEGER);",
  "sqlSeed": "INSERT INTO ct_cx VALUES (1,'Alice'),(2,'Bob'),(3,'Aoi');\nINSERT INTO ct_ox VALUES (1,1),(2,1),(3,3);",
  "expectedResultNote": {
    "zh-CN": "有订单的客户",
    "ja-JP": "注文履歴がある顧客",
    "en-US": "Customers with orders"
  },
  "expectedRows": 2,
  "estimatedTime": 120,
  "source": "builtin",
  "expectedOutput": "Alice\nAoi",
  "expectedColumns": "name"
}
,
{
  "id": "sql-filter-001",
  "language": "sql",
  "category": "filter",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "IN 多值筛选",
    "ja-JP": "IN 複数値フィルタ",
    "en-US": "IN multi-value filter"
  },
  "explanation": {
    "zh-CN": "IN 匹配多个值中任一",
    "ja-JP": "INで複数値のいずれかに一致",
    "en-US": "IN matches any of multiple values"
  },
  "hint": {
    "zh-CN": "WHERE city IN (Tokyo, Osaka)",
    "ja-JP": "WHERE city IN (Tokyo, Osaka)",
    "en-US": "WHERE city IN (Tokyo, Osaka)"
  },
  "focus": ["IN", "WHERE", "values"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["between", "in", "is_null"],
  "meaning": {
    "zh-CN": "IN/BETWEEN/IS NULL等特殊条件过滤。",
    "ja-JP": "IN/BETWEEN/IS NULL等特殊条件指定。",
    "en-US": "Special filters IN BETWEEN IS NULL."
  },
  "memoryHook": {
    "zh-CN": "BETWEEN=範囲IN=リストIS NULL=NULL判定。",
    "ja-JP": "BETWEEN範囲INリストIS NULLNULL判定。",
    "en-US": "BETWEEN range IN list IS NULL null check."
  },
  "examPoint": {
    "zh-CN": "IN/BETWEEN/IS NULL使い分け基本情報頻出。",
    "ja-JP": "IN/BETWEEN/IS NULL区別基本情報技術者頻出。",
    "en-US": "IN BETWEEN IS NULL common in FE exam."
  },
  "commonMistake": {
    "zh-CN": "BETWEEN上限下限含む。NULL判定はIS NULL必須。",
    "ja-JP": "BETWEEN上限下限含む。NULL判定IS NULL必須。",
    "en-US": "BETWEEN inclusive. Use IS NULL not equal for null."
  },
  "code": "SELECT * FROM ct_shop\nWHERE city IN ('Tokyo', 'Osaka');",
  "sqlSchema": "DROP TABLE IF EXISTS ct_shop;\nCREATE TABLE ct_shop (id INTEGER, name TEXT, city TEXT);",
  "sqlSeed": "INSERT INTO ct_shop VALUES (1,'A','Tokyo'),(2,'B','Osaka'),(3,'C','Nagoya');",
  "expectedResultNote": {
    "zh-CN": "东京和大阪的店铺",
    "ja-JP": "東京と大阪の店舗",
    "en-US": "Stores in Tokyo and Osaka"
  },
  "expectedRows": 2,
  "estimatedTime": 60,
  "source": "builtin",
  "expectedOutput": "1|A|Tokyo\n2|B|Osaka",
  "expectedColumns": "id,name,city"
}
,
{
  "id": "sql-filter-002",
  "language": "sql",
  "category": "filter",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "BETWEEN 范围",
    "ja-JP": "BETWEEN 範囲",
    "en-US": "BETWEEN range"
  },
  "explanation": {
    "zh-CN": "BETWEEN 筛选范围（包含边界）",
    "ja-JP": "BETWEENで範囲フィルタ（境界含む）",
    "en-US": "BETWEEN filters range (inclusive)"
  },
  "hint": {
    "zh-CN": "WHERE price BETWEEN 50 AND 200",
    "ja-JP": "WHERE price BETWEEN 50 AND 200",
    "en-US": "WHERE price BETWEEN 50 AND 200"
  },
  "focus": ["BETWEEN", "AND", "WHERE"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["between", "in", "is_null"],
  "meaning": {
    "zh-CN": "IN/BETWEEN/IS NULL等特殊条件过滤。",
    "ja-JP": "IN/BETWEEN/IS NULL等特殊条件指定。",
    "en-US": "Special filters IN BETWEEN IS NULL."
  },
  "memoryHook": {
    "zh-CN": "BETWEEN=範囲IN=リストIS NULL=NULL判定。",
    "ja-JP": "BETWEEN範囲INリストIS NULLNULL判定。",
    "en-US": "BETWEEN range IN list IS NULL null check."
  },
  "examPoint": {
    "zh-CN": "IN/BETWEEN/IS NULL使い分け基本情報頻出。",
    "ja-JP": "IN/BETWEEN/IS NULL区別基本情報技術者頻出。",
    "en-US": "IN BETWEEN IS NULL common in FE exam."
  },
  "commonMistake": {
    "zh-CN": "BETWEEN上限下限含む。NULL判定はIS NULL必須。",
    "ja-JP": "BETWEEN上限下限含む。NULL判定IS NULL必須。",
    "en-US": "BETWEEN inclusive. Use IS NULL not equal for null."
  },
  "code": "SELECT * FROM ct_pb\nWHERE price BETWEEN 50 AND 200;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_pb;\nCREATE TABLE ct_pb (id INTEGER, name TEXT, price REAL);",
  "sqlSeed": "INSERT INTO ct_pb VALUES (1,'Mouse',45),(2,'Keyboard',120),(3,'Monitor',280),(4,'Headset',80);",
  "expectedResultNote": {
    "zh-CN": "50-200之间的商品",
    "ja-JP": "50-200の間の商品",
    "en-US": "Products priced 50-200"
  },
  "expectedRows": 2,
  "estimatedTime": 60,
  "source": "builtin",
  "expectedOutput": "2|Keyboard|120\n4|Headset|80",
  "expectedColumns": "id,name,price"
}
,
{
  "id": "sql-filter-003",
  "language": "sql",
  "category": "filter",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "IS NULL 空值",
    "ja-JP": "IS NULL 空値",
    "en-US": "IS NULL filter"
  },
  "explanation": {
    "zh-CN": "IS NULL 筛选空值记录",
    "ja-JP": "IS NULLでNULLレコードを抽出",
    "en-US": "IS NULL finds records with NULL"
  },
  "hint": {
    "zh-CN": "WHERE email IS NULL",
    "ja-JP": "WHERE email IS NULL",
    "en-US": "WHERE email IS NULL"
  },
  "focus": ["IS NULL", "WHERE"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["between", "in", "is_null"],
  "meaning": {
    "zh-CN": "IN/BETWEEN/IS NULL等特殊条件过滤。",
    "ja-JP": "IN/BETWEEN/IS NULL等特殊条件指定。",
    "en-US": "Special filters IN BETWEEN IS NULL."
  },
  "memoryHook": {
    "zh-CN": "BETWEEN=範囲IN=リストIS NULL=NULL判定。",
    "ja-JP": "BETWEEN範囲INリストIS NULLNULL判定。",
    "en-US": "BETWEEN range IN list IS NULL null check."
  },
  "examPoint": {
    "zh-CN": "IN/BETWEEN/IS NULL使い分け基本情報頻出。",
    "ja-JP": "IN/BETWEEN/IS NULL区別基本情報技術者頻出。",
    "en-US": "IN BETWEEN IS NULL common in FE exam."
  },
  "commonMistake": {
    "zh-CN": "BETWEEN上限下限含む。NULL判定はIS NULL必須。",
    "ja-JP": "BETWEEN上限下限含む。NULL判定IS NULL必須。",
    "en-US": "BETWEEN inclusive. Use IS NULL not equal for null."
  },
  "code": "SELECT * FROM ct_co\nWHERE email IS NULL;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_co;\nCREATE TABLE ct_co (id INTEGER, name TEXT, email TEXT);",
  "sqlSeed": "INSERT INTO ct_co VALUES (1,'Alice','a@x.com'),(2,'Bob',NULL),(3,'Aoi','ao@x.com'),(4,'Ren',NULL);",
  "expectedResultNote": {
    "zh-CN": "没有邮箱的联系人",
    "ja-JP": "メールなしの連絡先",
    "en-US": "Contacts without email"
  },
  "expectedRows": 2,
  "estimatedTime": 60,
  "source": "builtin",
  "expectedOutput": "2|Bob|NULL\n4|Ren|NULL",
  "expectedColumns": "id,name,email"
}
,
{
  "id": "sql-leftjoin-001",
  "language": "sql",
  "category": "left_join",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "LEFT JOIN 外连接",
    "ja-JP": "LEFT JOIN 外部結合",
    "en-US": "LEFT JOIN outer"
  },
  "explanation": {
    "zh-CN": "LEFT JOIN保留左表全部记录",
    "ja-JP": "LEFT JOINは左テーブル全件保持",
    "en-US": "LEFT JOIN keeps all left table rows"
  },
  "hint": {
    "zh-CN": "FROM t1 LEFT JOIN t2 ON t1.id=t2.id",
    "ja-JP": "FROM t1 LEFT JOIN t2 ON t1.id=t2.id",
    "en-US": "FROM t1 LEFT JOIN t2 ON t1.id=t2.id"
  },
  "focus": ["LEFT JOIN", "ON", "JOIN"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["left_join"],
  "meaning": {
    "zh-CN": "左表保留全部行右表无匹配补NULL。",
    "ja-JP": "左側全行残し右側一致しない場合NULL補う結合。",
    "en-US": "Keeps all left rows NULL where right has no match."
  },
  "memoryHook": {
    "zh-CN": "LEFT=左優先→左側データは全部残る。",
    "ja-JP": "LEFT=左優先→左側データは全部残る。",
    "en-US": "LEFT JOIN keeps all left-table rows."
  },
  "examPoint": {
    "zh-CN": "LEFT vs INNER結果違いは試験頻出。",
    "ja-JP": "LEFT/INNER JOIN結果違い問う問題頻出。",
    "en-US": "LEFT vs INNER JOIN result differences."
  },
  "commonMistake": {
    "zh-CN": "右表複数一致で左表行が増える。",
    "ja-JP": "右テーブル複数一致行で結果行増加。",
    "en-US": "Multiple right matches multiply left rows."
  },
  "code": "SELECT c.name, o.id AS ord_id\nFROM ct_cl c\nLEFT JOIN ct_ol o ON c.id = o.cid;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_cl;\nCREATE TABLE ct_cl (id INTEGER, name TEXT);\nDROP TABLE IF EXISTS ct_ol;\nCREATE TABLE ct_ol (id INTEGER, cid INTEGER);",
  "sqlSeed": "INSERT INTO ct_cl VALUES (1,'Alice'),(2,'Bob'),(3,'Aoi');\nINSERT INTO ct_ol VALUES (1,1),(2,1),(3,3);",
  "expectedResultNote": {
    "zh-CN": "显示所有客户及订单",
    "ja-JP": "全顧客と注文を表示",
    "en-US": "All customers with orders"
  },
  "expectedRows": 4,
  "estimatedTime": 90,
  "source": "builtin",
  "expectedOutput": "Alice|1 Alice|2 Bob|NULL Aoi|3",
  "expectedColumns": "name,ord_id"
}
,
{
  "id": "sql-leftjoin-002",
  "language": "sql",
  "category": "left_join",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "LEFT JOIN 找缺失",
    "ja-JP": "LEFT JOIN 欠損検出",
    "en-US": "LEFT JOIN find missing"
  },
  "explanation": {
    "zh-CN": "LEFT JOIN配合IS NULL找无关联记录",
    "ja-JP": "LEFT JOINとIS NULLで関連なし検出",
    "en-US": "LEFT JOIN with IS NULL to find orphans"
  },
  "hint": {
    "zh-CN": "WHERE right.id IS NULL",
    "ja-JP": "WHERE right.id IS NULL",
    "en-US": "WHERE right.id IS NULL"
  },
  "focus": ["LEFT JOIN", "IS NULL", "WHERE"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["left_join"],
  "meaning": {
    "zh-CN": "左表保留全部行右表无匹配补NULL。",
    "ja-JP": "左側全行残し右側一致しない場合NULL補う結合。",
    "en-US": "Keeps all left rows NULL where right has no match."
  },
  "memoryHook": {
    "zh-CN": "LEFT=左優先→左側データは全部残る。",
    "ja-JP": "LEFT=左優先→左側データは全部残る。",
    "en-US": "LEFT JOIN keeps all left-table rows."
  },
  "examPoint": {
    "zh-CN": "LEFT vs INNER結果違いは試験頻出。",
    "ja-JP": "LEFT/INNER JOIN結果違い問う問題頻出。",
    "en-US": "LEFT vs INNER JOIN result differences."
  },
  "commonMistake": {
    "zh-CN": "右表複数一致で左表行が増える。",
    "ja-JP": "右テーブル複数一致行で結果行増加。",
    "en-US": "Multiple right matches multiply left rows."
  },
  "code": "SELECT c.name\nFROM ct_cl2 c\nLEFT JOIN ct_pu p ON c.id = p.cid\nWHERE p.id IS NULL;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_cl2;\nCREATE TABLE ct_cl2 (id INTEGER, name TEXT);\nDROP TABLE IF EXISTS ct_pu;\nCREATE TABLE ct_pu (id INTEGER, cid INTEGER);",
  "sqlSeed": "INSERT INTO ct_cl2 VALUES (1,'Alice'),(2,'Bob'),(3,'Aoi'),(4,'Ren');\nINSERT INTO ct_pu VALUES (1,1),(2,1),(3,3);",
  "expectedResultNote": {
    "zh-CN": "没有购买记录的客户",
    "ja-JP": "購入履歴がない顧客",
    "en-US": "Customers without purchases"
  },
  "expectedRows": 2,
  "estimatedTime": 90,
  "source": "builtin",
  "expectedOutput": "Bob\nRen",
  "expectedColumns": "name"
}
,
{
  "id": "sql-agg-001",
  "language": "sql",
  "category": "aggregate",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "AVG 平均",
    "ja-JP": "AVG 平均",
    "en-US": "AVG function"
  },
  "explanation": {
    "zh-CN": "AVG 计算列的平均值",
    "ja-JP": "AVGで列の平均値を計算",
    "en-US": "Calculate column average with AVG"
  },
  "hint": {
    "zh-CN": "SELECT AVG(price) FROM products",
    "ja-JP": "SELECT AVG(price) FROM products",
    "en-US": "SELECT AVG(price) FROM products"
  },
  "focus": ["AVG", "AS"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["aggregate_function"],
  "meaning": {
    "zh-CN": "对一组值计算返回单一值的函数。",
    "ja-JP": "複数値計算し1値を返す関数。",
    "en-US": "Functions returning single value from value set."
  },
  "memoryHook": {
    "zh-CN": "AVG平均 SUM合計 MIN最小 MAX最大。",
    "ja-JP": "AVG平均 SUM合計 MIN最小 MAX最大。",
    "en-US": "AVG average SUM total MIN min MAX max."
  },
  "examPoint": {
    "zh-CN": "集計関数NULL除外(COUNT*以外)。GROUP BYと併用基本。",
    "ja-JP": "集計関数NULL除外(COUNT*以外)。GROUP BY併用基本。",
    "en-US": "Aggregates exclude NULLs except COUNT star."
  },
  "commonMistake": {
    "zh-CN": "AVG/SUMはNULL除外して計算。",
    "ja-JP": "AVG/SUMはNULL除外。",
    "en-US": "AVG SUM exclude NULLs."
  },
  "code": "SELECT AVG(price) AS avg_p\nFROM ct_pa;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_pa;\nCREATE TABLE ct_pa (id INTEGER, name TEXT, price REAL);",
  "sqlSeed": "INSERT INTO ct_pa VALUES (1,'A',100),(2,'B',200),(3,'C',150),(4,'D',300);",
  "expectedResultNote": {
    "zh-CN": "商品均价",
    "ja-JP": "商品平均価格",
    "en-US": "Average product price"
  },
  "expectedRows": 1,
  "estimatedTime": 60,
  "source": "builtin",
  "expectedOutput": "avg_p\n187.5",
  "expectedColumns": "avg_p"
}
,
{
  "id": "sql-agg-002",
  "language": "sql",
  "category": "aggregate",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "SUM 求和",
    "ja-JP": "SUM 合計",
    "en-US": "SUM function"
  },
  "explanation": {
    "zh-CN": "SUM 计算列的总和",
    "ja-JP": "SUMで列の合計を計算",
    "en-US": "Calculate column sum with SUM"
  },
  "hint": {
    "zh-CN": "SELECT SUM(amount) FROM sales",
    "ja-JP": "SELECT SUM(amount) FROM sales",
    "en-US": "SELECT SUM(amount) FROM sales"
  },
  "focus": ["SUM", "AS"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["aggregate_function"],
  "meaning": {
    "zh-CN": "对一组值计算返回单一值的函数。",
    "ja-JP": "複数値計算し1値を返す関数。",
    "en-US": "Functions returning single value from value set."
  },
  "memoryHook": {
    "zh-CN": "AVG平均 SUM合計 MIN最小 MAX最大。",
    "ja-JP": "AVG平均 SUM合計 MIN最小 MAX最大。",
    "en-US": "AVG average SUM total MIN min MAX max."
  },
  "examPoint": {
    "zh-CN": "集計関数NULL除外(COUNT*以外)。GROUP BYと併用基本。",
    "ja-JP": "集計関数NULL除外(COUNT*以外)。GROUP BY併用基本。",
    "en-US": "Aggregates exclude NULLs except COUNT star."
  },
  "commonMistake": {
    "zh-CN": "AVG/SUMはNULL除外して計算。",
    "ja-JP": "AVG/SUMはNULL除外。",
    "en-US": "AVG SUM exclude NULLs."
  },
  "code": "SELECT SUM(amount) AS total\nFROM ct_sa;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_sa;\nCREATE TABLE ct_sa (id INTEGER, amount REAL);",
  "sqlSeed": "INSERT INTO ct_sa VALUES (1,100),(2,200),(3,150);",
  "expectedResultNote": {
    "zh-CN": "总销售额",
    "ja-JP": "総売上",
    "en-US": "Total sales"
  },
  "expectedRows": 1,
  "estimatedTime": 60,
  "source": "builtin",
  "expectedOutput": "total\n450",
  "expectedColumns": "total"
}
,
{
  "id": "sql-agg-003",
  "language": "sql",
  "category": "aggregate",
  "level": 2,
  "difficulty": 2,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "MIN/MAX 最值",
    "ja-JP": "MIN/MAX 最大最小",
    "en-US": "MIN/MAX functions"
  },
  "explanation": {
    "zh-CN": "MIN和MAX分别找最小和最大值",
    "ja-JP": "MINとMAXで最小・最大を検索",
    "en-US": "MIN and MAX find smallest and largest"
  },
  "hint": {
    "zh-CN": "SELECT MAX(score), MIN(score)",
    "ja-JP": "SELECT MAX(score), MIN(score)",
    "en-US": "SELECT MAX(score), MIN(score)"
  },
  "focus": ["MAX", "MIN", "AS"],
  "examRelevance": "high",
  "examTargets": ["SQL", "IT Passport", "基本情報"],
  "glossaryRefs": ["aggregate_function"],
  "meaning": {
    "zh-CN": "对一组值计算返回单一值的函数。",
    "ja-JP": "複数値計算し1値を返す関数。",
    "en-US": "Functions returning single value from value set."
  },
  "memoryHook": {
    "zh-CN": "AVG平均 SUM合計 MIN最小 MAX最大。",
    "ja-JP": "AVG平均 SUM合計 MIN最小 MAX最大。",
    "en-US": "AVG average SUM total MIN min MAX max."
  },
  "examPoint": {
    "zh-CN": "集計関数NULL除外(COUNT*以外)。GROUP BYと併用基本。",
    "ja-JP": "集計関数NULL除外(COUNT*以外)。GROUP BY併用基本。",
    "en-US": "Aggregates exclude NULLs except COUNT star."
  },
  "commonMistake": {
    "zh-CN": "AVG/SUMはNULL除外して計算。",
    "ja-JP": "AVG/SUMはNULL除外。",
    "en-US": "AVG SUM exclude NULLs."
  },
  "code": "SELECT MAX(score) AS highest,\n       MIN(score) AS lowest\nFROM ct_ex;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_ex;\nCREATE TABLE ct_ex (id INTEGER, name TEXT, score INTEGER);",
  "sqlSeed": "INSERT INTO ct_ex VALUES (1,'Alice',92),(2,'Bob',67),(3,'Aoi',88),(4,'Ren',95);",
  "expectedResultNote": {
    "zh-CN": "最高分和最低分",
    "ja-JP": "最高点と最低点",
    "en-US": "Highest and lowest scores"
  },
  "expectedRows": 1,
  "estimatedTime": 60,
  "source": "builtin",
  "expectedOutput": "highest|lowest\n95|67",
  "expectedColumns": "highest,lowest"
}
,
{
  "id": "sql-union-001",
  "language": "sql",
  "category": "union",
  "level": 3,
  "difficulty": 3,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "UNION 合并",
    "ja-JP": "UNION 結合",
    "en-US": "UNION merge"
  },
  "explanation": {
    "zh-CN": "UNION合并两个查询结果（去重）",
    "ja-JP": "UNIONで2つのクエリ結果を結合（重複除去）",
    "en-US": "UNION combines two queries (deduplicated)"
  },
  "hint": {
    "zh-CN": "SELECT city FROM a UNION SELECT city FROM b",
    "ja-JP": "SELECT city FROM a UNION SELECT city FROM b",
    "en-US": "SELECT city FROM a UNION SELECT city FROM b"
  },
  "focus": ["UNION", "SELECT"],
  "examRelevance": "high",
  "examTargets": ["SQL", "基本情報"],
  "glossaryRefs": ["union"],
  "meaning": {
    "zh-CN": "合并多个SELECT结果集的运算符。",
    "ja-JP": "複数SELECT結果を結合する演算子。",
    "en-US": "Combines multiple SELECT results."
  },
  "memoryHook": {
    "zh-CN": "UNION=結合→複数結果を1つにまとめる。",
    "ja-JP": "UNION=結合→複数SELECT結果1つに。",
    "en-US": "UNION=combine results vertically."
  },
  "examPoint": {
    "zh-CN": "UNION重複除去UNION ALL重複保持。列数型一致必要。",
    "ja-JP": "UNION重複除去UNION ALL重複保持。列数型一致必要。",
    "en-US": "UNION dedup UNION ALL keep dup. Col/t type match."
  },
  "commonMistake": {
    "zh-CN": "UNION列数とデータ型一致必須。ORDER BYは最後のSELECTのみ。",
    "ja-JP": "UNION列数データ型一致必須。ORDER BYは最終SELECTのみ。",
    "en-US": "Col count and types must match. ORDER BY on last."
  },
  "code": "SELECT city FROM ct_oa\nUNION\nSELECT city FROM ct_ob;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_oa;\nCREATE TABLE ct_oa (city TEXT);\nDROP TABLE IF EXISTS ct_ob;\nCREATE TABLE ct_ob (city TEXT);",
  "sqlSeed": "INSERT INTO ct_oa VALUES ('Tokyo'),('Osaka');\nINSERT INTO ct_ob VALUES ('Osaka'),('Nagoya');",
  "expectedResultNote": {
    "zh-CN": "两个办公室所在城市的并集",
    "ja-JP": "2拠点の都市の和集合",
    "en-US": "Cities from both offices"
  },
  "expectedRows": 3,
  "estimatedTime": 90,
  "source": "builtin",
  "expectedOutput": "Tokyo\nOsaka\nNagoya",
  "expectedColumns": "city"
}
,
{
  "id": "sql-cte-001",
  "language": "sql",
  "category": "cte",
  "level": 4,
  "difficulty": 4,
  "sandboxRunnable": true,
  "title": {
    "zh-CN": "WITH CTE 公共表表达式",
    "ja-JP": "WITH CTE",
    "en-US": "WITH CTE"
  },
  "explanation": {
    "zh-CN": "WITH定义临时视图简化复杂查询",
    "ja-JP": "WITHで一時ビューを定義",
    "en-US": "WITH defines a temporary view"
  },
  "hint": {
    "zh-CN": "WITH avg AS (SELECT ...) SELECT ... FROM avg",
    "ja-JP": "WITH avg AS (SELECT ...) SELECT ... FROM avg",
    "en-US": "WITH avg AS (SELECT ...) SELECT ... FROM avg"
  },
  "focus": ["WITH", "AS", "CTE", "JOIN"],
  "examRelevance": "high",
  "examTargets": ["SQL", "基本情報"],
  "glossaryRefs": ["cte"],
  "meaning": {
    "zh-CN": "WITH子句定义的临时命名结果集。",
    "ja-JP": "WITH句定義の一時的名前付き結果セット。",
    "en-US": "Temporary named result set with WITH."
  },
  "memoryHook": {
    "zh-CN": "CTE=一時テーブル→WITHで使い捨ての表。",
    "ja-JP": "CTE=Common Table Expression→WITHで一時テーブル。",
    "en-US": "CTE=temporary table using WITH."
  },
  "examPoint": {
    "zh-CN": "CTE(WITH句)可読性高く実務多用。基本情報出題。",
    "ja-JP": "CTE(WITH句)サブクエリより可読性高。基本情報出題。",
    "en-US": "CTEs improve readability. Common in FE exam."
  },
  "commonMistake": {
    "zh-CN": "CTE直後のSQLで1回のみ使用可。",
    "ja-JP": "CTE直後のSQLで1回のみ使用可。",
    "en-US": "CTE usable once in following statement."
  },
  "code": "WITH da AS (\n  SELECT dept, AVG(salary) AS avg_sal\n  FROM ct_ec\n  GROUP BY dept\n)\nSELECT e.name, e.dept, e.salary, d.avg_sal\nFROM ct_ec e\nJOIN da d ON e.dept = d.dept;",
  "sqlSchema": "DROP TABLE IF EXISTS ct_ec;\nCREATE TABLE ct_ec (id INTEGER, name TEXT, dept TEXT, salary INTEGER);",
  "sqlSeed": "INSERT INTO ct_ec VALUES (1,'Alice','Sales',50000),(2,'Bob','Sales',60000),(3,'Aoi','Eng',70000),(4,'Ren','Eng',80000);",
  "expectedResultNote": {
    "zh-CN": "员工薪资及部门平均",
    "ja-JP": "従業員給与と部門平均",
    "en-US": "Employee salary vs department avg"
  },
  "expectedRows": 4,
  "estimatedTime": 120,
  "source": "builtin",
  "expectedOutput": "Alice|Sales|50000|55000 Bob|Sales|60000|55000 Aoi|Eng|70000|75000 Ren|Eng|80000|75000",
  "expectedColumns": "name,dept,salary,avg_sal"
}
];
