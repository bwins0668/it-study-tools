// Coding Typing Practice - SQL Basics (30 items)
window.CODING_TYPING_DATA_SQL = [
  {
    "id": "sql-select-001",
    "language": "sql",
    "level": 1,
    "category": "select",
    "title": {
      "zh-CN": "SELECT 所有列",
      "ja-JP": "SELECT 全列",
      "en-US": "SELECT all columns"
    },
    "code": "SELECT * FROM users;",
    "explanation": {
      "zh-CN": "* 表示选择所有列。FROM 后面跟表名。",
      "ja-JP": "* は全列を選択します。FROM の後にテーブル名を書きます。",
      "en-US": "* selects all columns. FROM specifies the table name.",
    },
    "focus": [
      "SELECT 关键字",
      "* 通配符",
      "FROM 表名",
      "分号"
    ],
    "hint": {
      "zh-CN": "关键字用大写。* 是通配符。",
      "ja-JP": "キーワードは大文字。* は全列を表すワイルドカード。",
      "en-US": "SELECT * returns every column from the table.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "sql-select-002",
    "language": "sql",
    "level": 1,
    "category": "select",
    "title": {
      "zh-CN": "SELECT 指定列",
      "ja-JP": "SELECT 指定列",
      "en-US": "SELECT specific columns"
    },
    "code": "SELECT name, age FROM employees;",
    "explanation": {
      "zh-CN": "SELECT 后列出列名，用逗号分隔。",
      "ja-JP": "SELECT の後に列名をカンマ区切りで列挙します。",
      "en-US": "List column names after SELECT, separated by commas.",
    },
    "focus": [
      "列名列举",
      "逗号分隔",
      "多列顺序"
    ],
    "hint": {
      "zh-CN": "列名之间用逗号分隔，最后一个列名后不要逗号。",
      "ja-JP": "列名はカンマで区切ります。最後の列名の後ろにはカンマを付けません。",
      "en-US": "Only the named columns will be returned.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "sql-select-003",
    "language": "sql",
    "level": 1,
    "category": "select",
    "title": {
      "zh-CN": "SELECT DISTINCT",
      "ja-JP": "SELECT DISTINCT",
      "en-US": "SELECT DISTINCT"
    },
    "code": "SELECT DISTINCT city FROM customers;",
    "explanation": {
      "zh-CN": "DISTINCT 去除重复行。",
      "ja-JP": "DISTINCT は重複を除去します。",
      "en-US": "DISTINCT removes duplicate rows from the result.",
    },
    "focus": [
      "DISTINCT 位置",
      "去重效果"
    ],
    "hint": {
      "zh-CN": "DISTINCT 紧跟在 SELECT 后面。",
      "ja-JP": "DISTINCT は SELECT の直後に置きます。",
      "en-US": "DISTINCT applies to all selected columns.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "sql-select-004",
    "language": "sql",
    "level": 1,
    "category": "select",
    "title": {
      "zh-CN": "SELECT 别名 AS",
      "ja-JP": "SELECT 別名 AS",
      "en-US": "SELECT with alias"
    },
    "code": "SELECT name AS 名前, age AS 年齢 FROM users;",
    "explanation": {
      "zh-CN": "AS 给列取别名。",
      "ja-JP": "AS で列に別名を付けます。",
      "en-US": "AS gives a column or table an alias (temporary name).",
    },
    "focus": [
      "AS 关键字",
      "别名在原名之后"
    ],
    "hint": {
      "zh-CN": "AS 写在列名后面，后面跟别名。",
      "ja-JP": "AS は列名の後に書き、その後に別名を書きます。",
      "en-US": "Aliases make output column names more readable.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sql-where-001",
    "language": "sql",
    "level": 2,
    "category": "where",
    "title": {
      "zh-CN": "WHERE 条件过滤",
      "ja-JP": "WHERE 条件フィルター",
      "en-US": "WHERE condition"
    },
    "code": "SELECT * FROM products WHERE price > 100;",
    "explanation": {
      "zh-CN": "WHERE 用于过滤记录。",
      "ja-JP": "WHERE はレコードをフィルタリングします。",
      "en-US": "WHERE filters records based on a condition.",
    },
    "focus": [
      "WHERE 位置（FROM 后）",
      "比较运算符",
      "条件表达式"
    ],
    "hint": {
      "zh-CN": "WHERE 写在 FROM 之后。条件中列名在左。",
      "ja-JP": "WHERE は FROM の後に書きます。条件では列名を左に。",
      "en-US": "Only rows that satisfy the condition are returned.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sql-where-002",
    "language": "sql",
    "level": 2,
    "category": "where",
    "title": {
      "zh-CN": "WHERE 字符串等值",
      "ja-JP": "WHERE 文字列等価",
      "en-US": "WHERE string equality"
    },
    "code": "SELECT * FROM users WHERE name = 'Alice';",
    "explanation": {
      "zh-CN": "SQL 字符串值用单引号。",
      "ja-JP": "SQL では文字列値は一重引用符です。",
      "en-US": "String values in SQL are enclosed in single quotes.",
    },
    "focus": [
      "单引号字符串",
      "等号比较"
    ],
    "hint": {
      "zh-CN": "SQL 中字符串用单引号，不是双引号。",
      "ja-JP": "SQL では文字列は一重引用符、二重引用符ではありません。",
      "en-US": "SQL uses single quotes, not double quotes, for strings.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 10,
    "source": "builtin"
  },
  {
    "id": "sql-where-003",
    "language": "sql",
    "level": 2,
    "category": "where",
    "title": {
      "zh-CN": "WHERE AND 多条件",
      "ja-JP": "WHERE AND 複数条件",
      "en-US": "WHERE with AND"
    },
    "code": "SELECT * FROM orders WHERE amount > 50 AND status = 'shipped';",
    "explanation": {
      "zh-CN": "AND 连接两个条件，都必须为真。",
      "ja-JP": "AND は2つの条件を結合し、両方とも真である必要があります。",
      "en-US": "AND combines two conditions—both must be true.",
    },
    "focus": [
      "AND 连接",
      "列名和值匹配"
    ],
    "hint": {
      "zh-CN": "两个条件用 AND 连接，字符串值用单引号。",
      "ja-JP": "2つの条件を AND で接続します。文字列値は一重引用符。",
      "en-US": "Use AND when you need all conditions to match.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sql-where-004",
    "language": "sql",
    "level": 2,
    "category": "where",
    "title": {
      "zh-CN": "WHERE OR 条件",
      "ja-JP": "WHERE OR 条件",
      "en-US": "WHERE with OR"
    },
    "code": "SELECT * FROM students WHERE grade = 'A' OR grade = 'B';",
    "explanation": {
      "zh-CN": "OR 任意一个条件为真即返回。",
      "ja-JP": "OR はどちらかの条件が真の場合に結果を返します。",
      "en-US": "OR returns rows where at least one condition is true.",
    },
    "focus": [
      "OR 连接",
      "重复列名的写法"
    ],
    "hint": {
      "zh-CN": "每侧都要写完整条件，不要写成 grade='A' OR 'B'。",
      "ja-JP": "各条件は完全に書きます。grade='A' OR 'B' とは書きません。",
      "en-US": "Use OR when any single condition should match.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sql-order-001",
    "language": "sql",
    "level": 2,
    "category": "order",
    "title": {
      "zh-CN": "ORDER BY 排序",
      "ja-JP": "ORDER BY 並び替え",
      "en-US": "ORDER BY sorting"
    },
    "code": "SELECT * FROM products ORDER BY price DESC;",
    "explanation": {
      "zh-CN": "ORDER BY 排序，ASC 升序（默认），DESC 降序。",
      "ja-JP": "ORDER BY は結果を並び替えます。ASC 昇順、DESC 降順。",
      "en-US": "ORDER BY sorts results. ASC is ascending (default), DESC is descending.",
    },
    "focus": [
      "ORDER BY 位置",
      "DESC 降序",
      "ASC 升序"
    ],
    "hint": {
      "zh-CN": "ORDER BY 写在 WHERE 之后。默认升序。",
      "ja-JP": "ORDER BY は WHERE の後に書きます。デフォルトは昇順。",
      "en-US": "Add DESC after the column name for descending order.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sql-order-002",
    "language": "sql",
    "level": 2,
    "category": "order",
    "title": {
      "zh-CN": "ORDER BY 多列",
      "ja-JP": "ORDER BY 複数列",
      "en-US": "ORDER BY multiple columns"
    },
    "code": "SELECT name, age FROM employees ORDER BY age DESC, name ASC;",
    "explanation": {
      "zh-CN": "ORDER BY 可以跟多个列，按优先级排序。",
      "ja-JP": "ORDER BY の後に複数の列を優先順に指定できます。",
      "en-US": "ORDER BY can accept multiple columns for sorting priority.",
    },
    "focus": [
      "逗号分隔",
      "每列独立指定升降序"
    ],
    "hint": {
      "zh-CN": "每列后面可以单独指定 ASC 或 DESC。",
      "ja-JP": "各列の後に ASC または DESC を個別に指定できます。",
      "en-US": "The first column takes the highest priority.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "sql-order-003",
    "language": "sql",
    "level": 2,
    "category": "order",
    "title": {
      "zh-CN": "WHERE 与 ORDER BY 组合",
      "ja-JP": "WHERE と ORDER BY 組み合わせ",
      "en-US": "WHERE with ORDER BY"
    },
    "code": "SELECT * FROM orders WHERE total > 50 ORDER BY created_at DESC;",
    "explanation": {
      "zh-CN": "WHERE 在前过滤行，ORDER BY 在后排序。",
      "ja-JP": "WHERE が先にフィルター、ORDER BY が後に並び替え。",
      "en-US": "WHERE filters rows first, then ORDER BY sorts the filtered result.",
    },
    "focus": [
      "WHERE 在前",
      "ORDER BY 在最后"
    ],
    "hint": {
      "zh-CN": "SQL 子句顺序：SELECT FROM WHERE ORDER BY。",
      "ja-JP": "SQL 句の順序：SELECT FROM WHERE ORDER BY。",
      "en-US": "WHERE always comes before ORDER BY in a query.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "sql-group-001",
    "language": "sql",
    "level": 3,
    "category": "group",
    "title": {
      "zh-CN": "GROUP BY 分组",
      "ja-JP": "GROUP BY グループ化",
      "en-US": "GROUP BY aggregation"
    },
    "code": "SELECT department, COUNT(*) FROM employees GROUP BY department;",
    "explanation": {
      "zh-CN": "GROUP BY 按某列分组，与聚合函数一起使用。",
      "ja-JP": "GROUP BY は列でグループ化し、集約関数と一緒に使います。",
      "en-US": "GROUP BY groups rows that have the same value in a column. It is used with aggregate functions.",
    },
    "focus": [
      "GROUP BY 位置",
      "聚合函数 COUNT"
    ],
    "hint": {
      "zh-CN": "GROUP BY 写在 WHERE 之后。",
      "ja-JP": "GROUP BY は WHERE の後に書きます。",
      "en-US": "COUNT(*) counts the number of rows in each group.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 18,
    "source": "builtin"
  },
  {
    "id": "sql-group-002",
    "language": "sql",
    "level": 3,
    "category": "group",
    "title": {
      "zh-CN": "GROUP BY 多个聚合",
      "ja-JP": "GROUP BY 複数集約",
      "en-US": "Multiple aggregates"
    },
    "code": "SELECT department, COUNT(*) AS emp_count, AVG(salary) AS avg_salary FROM employees GROUP BY department;",
    "explanation": {
      "zh-CN": "一个 GROUP BY 中可以包含多个聚合函数。",
      "ja-JP": "1つの GROUP BY に複数の集約関数を含められます。",
      "en-US": "A single GROUP BY can include multiple aggregate functions.",
    },
    "focus": [
      "多聚合函数",
      "别名"
    ],
    "hint": {
      "zh-CN": "COUNT(*) 统计行数，AVG(salary) 计算平均值。",
      "ja-JP": "COUNT(*) は行数、AVG(salary) は平均値を計算します。",
      "en-US": "AVG(), SUM(), COUNT(), MAX(), MIN() can all be used together.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 20,
    "source": "builtin"
  },
  {
    "id": "sql-group-003",
    "language": "sql",
    "level": 3,
    "category": "group",
    "title": {
      "zh-CN": "GROUP BY 多列",
      "ja-JP": "GROUP BY 複数列",
      "en-US": "GROUP BY multiple columns"
    },
    "code": "SELECT city, status, COUNT(*) FROM orders GROUP BY city, status;",
    "explanation": {
      "zh-CN": "GROUP BY 后面可以跟多个列。",
      "ja-JP": "GROUP BY の後に複数の列を指定できます。",
      "en-US": "GROUP BY can group by multiple columns to create sub-groups.",
    },
    "focus": [
      "多列分组",
      "分组层次"
    ],
    "hint": {
      "zh-CN": "SELECT 中所有非聚合列必须在 GROUP BY 中。",
      "ja-JP": "SELECT 内のすべての非集約列は GROUP BY に含める必要があります。",
      "en-US": "Each unique combination of the grouped columns forms a group.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 18,
    "source": "builtin"
  },
  {
    "id": "sql-having-001",
    "language": "sql",
    "level": 3,
    "category": "having",
    "title": {
      "zh-CN": "HAVING 过滤分组",
      "ja-JP": "HAVING グループフィルター",
      "en-US": "HAVING filter groups"
    },
    "code": "SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5;",
    "explanation": {
      "zh-CN": "HAVING 过滤分组后的结果。",
      "ja-JP": "HAVING はグループ化後の結果をフィルタリングします。",
      "en-US": "HAVING filters grouped results (similar to WHERE for individual rows).",
    },
    "focus": [
      "HAVING 位置",
      "WHERE vs HAVING"
    ],
    "hint": {
      "zh-CN": "HAVING 只能与 GROUP BY 一起使用。",
      "ja-JP": "HAVING は GROUP BY と一緒にのみ使えます。",
      "en-US": "Use HAVING to filter after GROUP BY, WHERE to filter before it.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 20,
    "source": "builtin"
  },
  {
    "id": "sql-having-002",
    "language": "sql",
    "level": 3,
    "category": "having",
    "title": {
      "zh-CN": "HAVING 多条件",
      "ja-JP": "HAVING 複数条件",
      "en-US": "HAVING multiple conditions"
    },
    "code": "SELECT department, AVG(salary) FROM employees GROUP BY department HAVING AVG(salary) > 40000 AND COUNT(*) >= 3;",
    "explanation": {
      "zh-CN": "HAVING 支持 AND/OR 连接多个聚合条件。",
      "ja-JP": "HAVING は AND/OR で複数の集約条件を接続できます。",
      "en-US": "HAVING supports AND/OR to combine multiple aggregate conditions.",
    },
    "focus": [
      "多条件 HAVING",
      "AND 连接聚合"
    ],
    "hint": {
      "zh-CN": "HAVING 中的条件只能引用聚合函数或 GROUP BY 中的列。",
      "ja-JP": "HAVING 内の条件は集約関数か GROUP BY 内の列のみ参照できます。",
      "en-US": "You can use AND, OR, and NOT inside HAVING clauses.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 22,
    "source": "builtin"
  },
  {
    "id": "sql-join-001",
    "language": "sql",
    "level": 3,
    "category": "join",
    "title": {
      "zh-CN": "INNER JOIN",
      "ja-JP": "INNER JOIN",
      "en-US": "INNER JOIN"
    },
    "code": "SELECT * FROM orders INNER JOIN customers ON orders.customer_id = customers.id;",
    "explanation": {
      "zh-CN": "INNER JOIN 返回两个表中匹配的行。",
      "ja-JP": "INNER JOIN は2つのテーブルで一致する行を返します。",
      "en-US": "INNER JOIN returns only the rows that match in both tables.",
    },
    "focus": [
      "INNER JOIN 语法",
      "ON 连接条件",
      "表名.列名"
    ],
    "hint": {
      "zh-CN": "JOIN 条件用 ON，不用 WHERE。",
      "ja-JP": "JOIN の条件は ON を使い、WHERE は使いません。",
      "en-US": "Specify the join condition with ON, not WHERE.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 22,
    "source": "builtin"
  },
  {
    "id": "sql-join-002",
    "language": "sql",
    "level": 3,
    "category": "join",
    "title": {
      "zh-CN": "LEFT JOIN",
      "ja-JP": "LEFT JOIN",
      "en-US": "LEFT JOIN"
    },
    "code": "SELECT * FROM customers LEFT JOIN orders ON customers.id = orders.customer_id;",
    "explanation": {
      "zh-CN": "LEFT JOIN 返回左表所有行，不匹配用 NULL。",
      "ja-JP": "LEFT JOIN は左テーブルのすべての行を返します。一致しない場合は NULL。",
      "en-US": "LEFT JOIN returns all rows from the left table and matching rows from the right. Non-matches become NULL.",
    },
    "focus": [
      "LEFT JOIN 关键字",
      "左表全部保留"
    ],
    "hint": {
      "zh-CN": "LEFT JOIN 左边的表是主表，所有行都会保留。",
      "ja-JP": "LEFT JOIN の左側のテーブルが主テーブルです。",
      "en-US": "LEFT JOIN preserves all rows from the first (left) table.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 20,
    "source": "builtin"
  },
  {
    "id": "sql-join-003",
    "language": "sql",
    "level": 4,
    "category": "join",
    "title": {
      "zh-CN": "多表 JOIN",
      "ja-JP": "複数テーブル JOIN",
      "en-US": "Multiple table JOIN"
    },
    "code": "SELECT e.name, d.name AS dept\nFROM employees e\nJOIN departments d ON e.dept_id = d.id\nJOIN projects p ON e.id = p.lead_id;",
    "explanation": {
      "zh-CN": "可以连续 JOIN 多个表，使用表别名。",
      "ja-JP": "複数のテーブルを連続で JOIN できます。テーブル別名を使用。",
      "en-US": "You can JOIN multiple tables in a single query using table aliases.",
    },
    "focus": [
      "多行 SQL 格式",
      "表别名",
      "多个 JOIN"
    ],
    "hint": {
      "zh-CN": "每个 JOIN 都要有自己的 ON 条件。",
      "ja-JP": "各 JOIN には独立した ON 条件が必要です。",
      "en-US": "Use short aliases (e, d) to make JOIN queries more readable.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 4,
    "estimatedTime": 30,
    "source": "builtin"
  },
  {
    "id": "sql-join-004",
    "language": "sql",
    "level": 4,
    "category": "join",
    "title": {
      "zh-CN": "SELF JOIN 自连接",
      "ja-JP": "SELF JOIN 自己結合",
      "en-US": "SELF JOIN"
    },
    "code": "SELECT e1.name AS employee, e2.name AS manager\nFROM employees e1\nJOIN employees e2 ON e1.manager_id = e2.id;",
    "explanation": {
      "zh-CN": "SELF JOIN 是表与自身连接。使用不同别名。",
      "ja-JP": "SELF JOIN はテーブル自身との結合です。異なる別名を使用。",
      "en-US": "A SELF JOIN joins a table to itself using different aliases.",
    },
    "focus": [
      "同一表别名 x2",
      "各自列限定"
    ],
    "hint": {
      "zh-CN": "同一个表起两个不同的别名。",
      "ja-JP": "同じテーブルに2つの別名を付けます。",
      "en-US": "Give the table two different aliases to distinguish the roles.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 4,
    "estimatedTime": 30,
    "source": "builtin"
  },
  {
    "id": "sql-insert-001",
    "language": "sql",
    "level": 2,
    "category": "insert",
    "title": {
      "zh-CN": "INSERT INTO 插入",
      "ja-JP": "INSERT INTO 挿入",
      "en-US": "INSERT INTO values"
    },
    "code": "INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com');",
    "explanation": {
      "zh-CN": "INSERT 向表添加新行。字符串值用单引号。",
      "ja-JP": "INSERT はテーブルに新しい行を追加します。文字列値は一重引用符。",
      "en-US": "INSERT adds a new row to a table. String values use single quotes.",
    },
    "focus": [
      "INSERT INTO 语法",
      "列名列表",
      "VALUES 关键字"
    ],
    "hint": {
      "zh-CN": "列名写在表名后的括号内，值在 VALUES 后。",
      "ja-JP": "列名はテーブル名の後の括弧内に、値は VALUES の後。",
      "en-US": "List the column names in parentheses, then the VALUES.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "sql-insert-002",
    "language": "sql",
    "level": 2,
    "category": "insert",
    "title": {
      "zh-CN": "INSERT 全列简写",
      "ja-JP": "INSERT 全列省略形",
      "en-US": "INSERT all columns"
    },
    "code": "INSERT INTO users VALUES (1, 'Alice', 'alice@example.com');",
    "explanation": {
      "zh-CN": "不指定列名需要按顺序提供所有列的值。",
      "ja-JP": "列名を指定しない場合、定義順にすべての列の値を提供します。",
      "en-US": "Without column names, you must provide values for all columns in table order.",
    },
    "focus": [
      "无列名简写",
      "值顺序一致"
    ],
    "hint": {
      "zh-CN": "不写列名时，值顺序必须与表结构列顺序一致。",
      "ja-JP": "列名省略時は値の順序をテーブル構造に合わせます。",
      "en-US": "The order and number of values must match the table definition exactly.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sql-insert-003",
    "language": "sql",
    "level": 3,
    "category": "insert",
    "title": {
      "zh-CN": "INSERT SELECT",
      "ja-JP": "INSERT SELECT",
      "en-US": "INSERT from SELECT"
    },
    "code": "INSERT INTO archive_orders\nSELECT * FROM orders WHERE created_at < '2024-01-01';",
    "explanation": {
      "zh-CN": "INSERT SELECT 将查询结果插入目标表。",
      "ja-JP": "INSERT SELECT は検索結果をターゲットテーブルに挿入します。",
      "en-US": "INSERT INTO ... SELECT copies query results into a target table.",
    },
    "focus": [
      "SELECT 子查询",
      "列匹配"
    ],
    "hint": {
      "zh-CN": "INSERT 和 SELECT 的列必须匹配。",
      "ja-JP": "INSERT と SELECT の列を一致させる必要があります。",
      "en-US": "The source query column types must match the target table.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 3,
    "estimatedTime": 22,
    "source": "builtin"
  },
  {
    "id": "sql-update-001",
    "language": "sql",
    "level": 2,
    "category": "update",
    "title": {
      "zh-CN": "UPDATE 更新",
      "ja-JP": "UPDATE 更新",
      "en-US": "UPDATE statement"
    },
    "code": "UPDATE users SET age = 26 WHERE name = 'Alice';",
    "explanation": {
      "zh-CN": "UPDATE 修改表中的数据。务必写 WHERE！",
      "ja-JP": "UPDATE はテーブルのデータを変更します。必ず WHERE を書きましょう！",
      "en-US": "UPDATE modifies existing data in a table. Always use WHERE!",
    },
    "focus": [
      "UPDATE 表名",
      "SET 列 = 值",
      "WHERE 条件"
    ],
    "hint": {
      "zh-CN": "务必写 WHERE 条件，否则会更新全表！",
      "ja-JP": "必ず WHERE 条件を書きましょう！忘れると全テーブルが更新されます！",
      "en-US": "Omitting WHERE updates ALL rows—always double-check.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sql-update-002",
    "language": "sql",
    "level": 2,
    "category": "update",
    "title": {
      "zh-CN": "UPDATE 多列",
      "ja-JP": "UPDATE 複数列",
      "en-US": "UPDATE multiple columns"
    },
    "code": "UPDATE products SET price = 29.99, stock = 100 WHERE id = 5;",
    "explanation": {
      "zh-CN": "UPDATE 可以同时更新多个列。",
      "ja-JP": "UPDATE は複数の列を同時に更新できます。",
      "en-US": "UPDATE can modify multiple columns in a single statement.",
    },
    "focus": [
      "SET 多列逗号分隔",
      "WHERE 定位行"
    ],
    "hint": {
      "zh-CN": "SET 后面可以跟多个列=值对，用逗号分隔。",
      "ja-JP": "SET の後に複数の「列=値」をカンマで区切ります。",
      "en-US": "Separate column assignments with commas.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sql-delete-001",
    "language": "sql",
    "level": 2,
    "category": "delete",
    "title": {
      "zh-CN": "DELETE 删除行",
      "ja-JP": "DELETE 行削除",
      "en-US": "DELETE statement"
    },
    "code": "DELETE FROM users WHERE id = 10;",
    "explanation": {
      "zh-CN": "DELETE 用于删除表中的行。务必写 WHERE！",
      "ja-JP": "DELETE はテーブルの行を削除します。必ず WHERE を書きましょう！",
      "en-US": "DELETE removes rows from a table. Always use WHERE!",
    },
    "focus": [
      "DELETE FROM 语法",
      "WHERE 条件"
    ],
    "hint": {
      "zh-CN": "务必写 WHERE！不写会删除全表！",
      "ja-JP": "必ず WHERE を書きましょう！忘れると全データが削除されます！",
      "en-US": "Without WHERE, DELETE removes every row in the table.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sql-delete-002",
    "language": "sql",
    "level": 2,
    "category": "delete",
    "title": {
      "zh-CN": "DELETE 多条件",
      "ja-JP": "DELETE 複数条件",
      "en-US": "DELETE with conditions"
    },
    "code": "DELETE FROM orders WHERE status = 'cancelled' AND created_at < '2024-01-01';",
    "explanation": {
      "zh-CN": "DELETE 可以使用 AND/OR 组合条件。",
      "ja-JP": "DELETE は AND/OR で複数の条件を組み合わせられます。",
      "en-US": "DELETE can combine multiple conditions with AND/OR.",
    },
    "focus": [
      "AND 多条件",
      "条件精确性"
    ],
    "hint": {
      "zh-CN": "多个条件用 AND 连接，确保只删除目标数据。",
      "ja-JP": "複数の条件を AND で接続し、対象データのみ削除します。",
      "en-US": "Build complex conditions just like in a SELECT WHERE clause.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 15,
    "source": "builtin"
  },
  {
    "id": "sql-count-001",
    "language": "sql",
    "level": 1,
    "category": "count",
    "title": {
      "zh-CN": "COUNT 统计行数",
      "ja-JP": "COUNT 行数カウント",
      "en-US": "COUNT rows"
    },
    "code": "SELECT COUNT(*) FROM students;",
    "explanation": {
      "zh-CN": "COUNT 返回指定列的行数。",
      "ja-JP": "COUNT は指定された列の行数を返します。",
      "en-US": "COUNT returns the number of rows in a column or table.",
    },
    "focus": [
      "COUNT 语法",
      "括号",
      "* 代表所有行"
    ],
    "hint": {
      "zh-CN": "COUNT(*) 统计所有行。",
      "ja-JP": "COUNT(*) ですべての行をカウントします。",
      "en-US": "COUNT(*) counts all rows; COUNT(column) counts non-null values.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 8,
    "source": "builtin"
  },
  {
    "id": "sql-like-001",
    "language": "sql",
    "level": 2,
    "category": "like",
    "title": {
      "zh-CN": "LIKE 模糊匹配",
      "ja-JP": "LIKE 曖昧検索",
      "en-US": "LIKE pattern"
    },
    "code": "SELECT * FROM users WHERE name LIKE 'A%';",
    "explanation": {
      "zh-CN": "LIKE 用 % 表示任意字符，_ 表示单个字符。",
      "ja-JP": "LIKE はパターンマッチングに使います。% は任意の文字。",
      "en-US": "LIKE matches patterns: % matches any sequence, _ matches a single character.",
    },
    "focus": [
      "LIKE 关键字",
      "% 通配符"
    ],
    "hint": {
      "zh-CN": "'A%' = 以 A 开头，'%A' = 以 A 结尾。",
      "ja-JP": "'A%' = A で始まる、'%A' = A で終わる。",
      "en-US": "'A%' matches any string starting with A.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 2,
    "estimatedTime": 12,
    "source": "builtin"
  },
  {
    "id": "sql-limit-001",
    "language": "sql",
    "level": 1,
    "category": "limit",
    "title": {
      "zh-CN": "LIMIT 限制行数",
      "ja-JP": "LIMIT 行数制限",
      "en-US": "LIMIT clause"
    },
    "code": "SELECT * FROM products ORDER BY price DESC LIMIT 10;",
    "explanation": {
      "zh-CN": "LIMIT 限制返回的行数。",
      "ja-JP": "LIMIT は返される行数を制限します。",
      "en-US": "LIMIT restricts the number of rows returned.",
    },
    "focus": [
      "LIMIT 位置",
      "数字参数",
      "与 ORDER BY 结合"
    ],
    "hint": {
      "zh-CN": "LIMIT 写在所有子句的后面。",
      "ja-JP": "LIMIT は他のすべての句の最後に書きます。",
      "en-US": "LIMIT is written at the very end of the query.",
    },
    "sandboxRunnable": true,
    "expectedOutput": "",
    "difficulty": 1,
    "estimatedTime": 10,
    "source": "builtin"
  }
];

(function () {
  var fixtures = {
    "sql-select-001": {
      sqlSchema: "DROP TABLE IF EXISTS users;\nCREATE TABLE users (id INTEGER, name TEXT, age INTEGER, email TEXT);",
      sqlSeed: "INSERT INTO users (id, name, age, email) VALUES (1, 'Alice', 25, 'alice@example.com');\nINSERT INTO users (id, name, age, email) VALUES (2, 'Bob', 31, 'bob@example.com');\nINSERT INTO users (id, name, age, email) VALUES (3, 'Aoi', 22, 'aoi@example.com');",
      expectedRows: 3,
      expectedColumns: ["id", "name", "age", "email"],
      expectedResultNote: { "zh-CN": "返回 users 表的全部 3 行。", "ja-JP": "users テーブルの全3行を返します。", "en-US": "Returns all three rows from users." }
    },
    "sql-select-002": {
      sqlSchema: "DROP TABLE IF EXISTS employees;\nCREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, department TEXT, salary INTEGER);",
      sqlSeed: "INSERT INTO employees (id, name, age, department, salary) VALUES (1, 'Aoi', 24, 'Sales', 42000);\nINSERT INTO employees (id, name, age, department, salary) VALUES (2, 'Ren', 32, 'Engineering', 56000);\nINSERT INTO employees (id, name, age, department, salary) VALUES (3, 'Mika', 28, 'Sales', 47000);",
      expectedRows: 3,
      expectedColumns: ["name", "age"],
      expectedResultNote: { "zh-CN": "返回 3 名员工的姓名和年龄。", "ja-JP": "3名の従業員の名前と年齢を返します。", "en-US": "Returns the names and ages of three employees." }
    },
    "sql-select-003": {
      sqlSchema: "DROP TABLE IF EXISTS customers;\nCREATE TABLE customers (id INTEGER, name TEXT, city TEXT);",
      sqlSeed: "INSERT INTO customers (id, name, city) VALUES (1, 'Alice', 'Tokyo');\nINSERT INTO customers (id, name, city) VALUES (2, 'Bob', 'Osaka');\nINSERT INTO customers (id, name, city) VALUES (3, 'Carol', 'Tokyo');",
      expectedRows: 2,
      expectedColumns: ["city"],
      expectedResultNote: { "zh-CN": "去重后返回 Tokyo 和 Osaka。", "ja-JP": "重複を除き Tokyo と Osaka を返します。", "en-US": "Returns Tokyo and Osaka without duplicates." }
    },
    "sql-where-001": {
      sqlSchema: "DROP TABLE IF EXISTS products;\nCREATE TABLE products (id INTEGER, name TEXT, price REAL, stock INTEGER);",
      sqlSeed: "INSERT INTO products (id, name, price, stock) VALUES (1, 'Keyboard', 120, 8);\nINSERT INTO products (id, name, price, stock) VALUES (2, 'Mouse', 45, 20);\nINSERT INTO products (id, name, price, stock) VALUES (3, 'Monitor', 280, 5);",
      expectedRows: 2,
      expectedResultNote: { "zh-CN": "返回价格大于 100 的 Keyboard 和 Monitor。", "ja-JP": "価格が100より高い Keyboard と Monitor を返します。", "en-US": "Returns Keyboard and Monitor, whose prices exceed 100." }
    },
    "sql-where-002": {
      sqlSchema: "DROP TABLE IF EXISTS users;\nCREATE TABLE users (id INTEGER, name TEXT, age INTEGER);",
      sqlSeed: "INSERT INTO users (id, name, age) VALUES (1, 'Alice', 25);\nINSERT INTO users (id, name, age) VALUES (2, 'Bob', 31);\nINSERT INTO users (id, name, age) VALUES (3, 'Aoi', 22);",
      expectedRows: 1,
      expectedResultNote: { "zh-CN": "只返回 Alice。", "ja-JP": "Alice の行だけを返します。", "en-US": "Returns only Alice." }
    },
    "sql-where-003": {
      sqlSchema: "DROP TABLE IF EXISTS orders;\nCREATE TABLE orders (id INTEGER, customer_id INTEGER, amount REAL, status TEXT);",
      sqlSeed: "INSERT INTO orders (id, customer_id, amount, status) VALUES (1, 1, 80, 'shipped');\nINSERT INTO orders (id, customer_id, amount, status) VALUES (2, 2, 40, 'shipped');\nINSERT INTO orders (id, customer_id, amount, status) VALUES (3, 1, 120, 'pending');",
      expectedRows: 1,
      expectedResultNote: { "zh-CN": "返回金额大于 50 且已发货的订单。", "ja-JP": "金額が50より大きく発送済みの注文を返します。", "en-US": "Returns shipped orders with an amount greater than 50." }
    },
    "sql-where-004": {
      sqlSchema: "DROP TABLE IF EXISTS students;\nCREATE TABLE students (id INTEGER, name TEXT, grade TEXT, score INTEGER);",
      sqlSeed: "INSERT INTO students (id, name, grade, score) VALUES (1, 'Aoi', 'A', 92);\nINSERT INTO students (id, name, grade, score) VALUES (2, 'Ren', 'B', 81);\nINSERT INTO students (id, name, grade, score) VALUES (3, 'Mika', 'C', 68);",
      expectedRows: 2,
      expectedResultNote: { "zh-CN": "返回等级为 A 或 B 的两名学生。", "ja-JP": "成績が A または B の学生2名を返します。", "en-US": "Returns the two students whose grades are A or B." }
    },
    "sql-order-001": {
      sqlSchema: "DROP TABLE IF EXISTS products;\nCREATE TABLE products (id INTEGER, name TEXT, price REAL);",
      sqlSeed: "INSERT INTO products (id, name, price) VALUES (1, 'Keyboard', 120);\nINSERT INTO products (id, name, price) VALUES (2, 'Mouse', 45);\nINSERT INTO products (id, name, price) VALUES (3, 'Monitor', 280);",
      expectedRows: 3,
      expectedResultNote: { "zh-CN": "按价格从高到低返回商品。", "ja-JP": "商品を価格の高い順に返します。", "en-US": "Returns products ordered by price from highest to lowest." }
    },
    "sql-order-003": {
      sqlSchema: "DROP TABLE IF EXISTS orders;\nCREATE TABLE orders (id INTEGER, total REAL, created_at TEXT);",
      sqlSeed: "INSERT INTO orders (id, total, created_at) VALUES (1, 80, '2026-06-01');\nINSERT INTO orders (id, total, created_at) VALUES (2, 40, '2026-06-10');\nINSERT INTO orders (id, total, created_at) VALUES (3, 120, '2026-06-12');",
      expectedRows: 2,
      expectedResultNote: { "zh-CN": "筛选总额大于 50 的订单并按日期降序排列。", "ja-JP": "合計が50より大きい注文を日付の降順で返します。", "en-US": "Returns orders over 50 sorted by newest date first." }
    },
    "sql-group-001": {
      sqlSchema: "DROP TABLE IF EXISTS employees;\nCREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);",
      sqlSeed: "INSERT INTO employees (id, name, department, salary) VALUES (1, 'Aoi', 'Sales', 42000);\nINSERT INTO employees (id, name, department, salary) VALUES (2, 'Ren', 'Engineering', 56000);\nINSERT INTO employees (id, name, department, salary) VALUES (3, 'Mika', 'Sales', 47000);\nINSERT INTO employees (id, name, department, salary) VALUES (4, 'Ken', 'Engineering', 61000);",
      expectedRows: 2,
      expectedColumns: ["department", "COUNT(*)"],
      expectedResultNote: { "zh-CN": "按部门统计员工人数。", "ja-JP": "部署ごとの従業員数を集計します。", "en-US": "Counts employees in each department." }
    },
    "sql-group-002": {
      sqlSchema: "DROP TABLE IF EXISTS employees;\nCREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);",
      sqlSeed: "INSERT INTO employees (id, name, department, salary) VALUES (1, 'Aoi', 'Sales', 42000);\nINSERT INTO employees (id, name, department, salary) VALUES (2, 'Ren', 'Engineering', 56000);\nINSERT INTO employees (id, name, department, salary) VALUES (3, 'Mika', 'Sales', 48000);\nINSERT INTO employees (id, name, department, salary) VALUES (4, 'Ken', 'Engineering', 64000);",
      expectedRows: 2,
      expectedResultNote: { "zh-CN": "返回各部门人数与平均工资。", "ja-JP": "部署ごとの人数と平均給与を返します。", "en-US": "Returns employee count and average salary by department." }
    },
    "sql-having-001": {
      sqlSchema: "DROP TABLE IF EXISTS employees;\nCREATE TABLE employees (id INTEGER, name TEXT, department TEXT);",
      sqlSeed: "INSERT INTO employees (id, name, department) VALUES (1, 'Aoi', 'Sales');\nINSERT INTO employees (id, name, department) VALUES (2, 'Ren', 'Sales');\nINSERT INTO employees (id, name, department) VALUES (3, 'Mika', 'Sales');\nINSERT INTO employees (id, name, department) VALUES (4, 'Ken', 'Sales');\nINSERT INTO employees (id, name, department) VALUES (5, 'Yui', 'Sales');\nINSERT INTO employees (id, name, department) VALUES (6, 'Sora', 'Sales');\nINSERT INTO employees (id, name, department) VALUES (7, 'Haru', 'Engineering');",
      expectedRows: 1,
      expectedResultNote: { "zh-CN": "只返回人数大于 5 的 Sales 部门。", "ja-JP": "人数が5人を超える Sales 部署だけを返します。", "en-US": "Returns only Sales, the department with more than five employees." }
    },
    "sql-having-002": {
      sqlSchema: "DROP TABLE IF EXISTS employees;\nCREATE TABLE employees (id INTEGER, name TEXT, department TEXT, salary INTEGER);",
      sqlSeed: "INSERT INTO employees (id, name, department, salary) VALUES (1, 'Aoi', 'Sales', 42000);\nINSERT INTO employees (id, name, department, salary) VALUES (2, 'Ren', 'Sales', 48000);\nINSERT INTO employees (id, name, department, salary) VALUES (3, 'Mika', 'Sales', 51000);\nINSERT INTO employees (id, name, department, salary) VALUES (4, 'Ken', 'Support', 33000);\nINSERT INTO employees (id, name, department, salary) VALUES (5, 'Yui', 'Support', 35000);",
      expectedRows: 1,
      expectedResultNote: { "zh-CN": "返回平均工资大于 40000 且人数不少于 3 的 Sales 部门。", "ja-JP": "平均給与が40000を超え、3人以上いる Sales 部署を返します。", "en-US": "Returns Sales, whose average salary exceeds 40000 and has at least three employees." }
    },
    "sql-join-001": {
      sqlSchema: "DROP TABLE IF EXISTS orders;\nDROP TABLE IF EXISTS customers;\nCREATE TABLE customers (id INTEGER, name TEXT, city TEXT);\nCREATE TABLE orders (id INTEGER, customer_id INTEGER, amount REAL, status TEXT);",
      sqlSeed: "INSERT INTO customers (id, name, city) VALUES (1, 'Alice', 'Tokyo');\nINSERT INTO customers (id, name, city) VALUES (2, 'Bob', 'Osaka');\nINSERT INTO orders (id, customer_id, amount, status) VALUES (101, 1, 80, 'shipped');\nINSERT INTO orders (id, customer_id, amount, status) VALUES (102, 2, 45, 'pending');\nINSERT INTO orders (id, customer_id, amount, status) VALUES (103, 1, 120, 'shipped');",
      expectedRows: 3,
      expectedResultNote: { "zh-CN": "将 3 条订单与对应客户连接。", "ja-JP": "3件の注文を対応する顧客と結合します。", "en-US": "Joins three orders with their matching customers." }
    },
    "sql-update-001": {
      sqlSchema: "DROP TABLE IF EXISTS users;\nCREATE TABLE users (id INTEGER, name TEXT, age INTEGER);",
      sqlSeed: "INSERT INTO users (id, name, age) VALUES (1, 'Alice', 25);\nINSERT INTO users (id, name, age) VALUES (2, 'Bob', 31);",
      expectedRows: 1,
      expectedResultNote: { "zh-CN": "将 Alice 的年龄更新为 26。", "ja-JP": "Alice の年齢を26に更新します。", "en-US": "Updates Alice's age to 26." }
    },
    "sql-update-002": {
      sqlSchema: "DROP TABLE IF EXISTS products;\nCREATE TABLE products (id INTEGER, name TEXT, price REAL, stock INTEGER);",
      sqlSeed: "INSERT INTO products (id, name, price, stock) VALUES (5, 'Keyboard', 35.5, 20);\nINSERT INTO products (id, name, price, stock) VALUES (6, 'Mouse', 18.0, 50);",
      expectedRows: 1,
      expectedResultNote: { "zh-CN": "将 id 为 5 的商品价格和库存一起更新。", "ja-JP": "id が5の商品について価格と在庫を更新します。", "en-US": "Updates both price and stock for product 5." }
    },
    "sql-delete-001": {
      sqlSchema: "DROP TABLE IF EXISTS users;\nCREATE TABLE users (id INTEGER, name TEXT);",
      sqlSeed: "INSERT INTO users (id, name) VALUES (9, 'Aoi');\nINSERT INTO users (id, name) VALUES (10, 'Ren');\nINSERT INTO users (id, name) VALUES (11, 'Mika');",
      expectedRows: 1,
      expectedResultNote: { "zh-CN": "删除 id 为 10 的一行。", "ja-JP": "id が10の1行を削除します。", "en-US": "Deletes the row whose id is 10." }
    },
    "sql-delete-002": {
      sqlSchema: "DROP TABLE IF EXISTS orders;\nCREATE TABLE orders (id INTEGER, status TEXT, created_at TEXT);",
      sqlSeed: "INSERT INTO orders (id, status, created_at) VALUES (1, 'cancelled', '2023-10-01');\nINSERT INTO orders (id, status, created_at) VALUES (2, 'cancelled', '2024-02-01');\nINSERT INTO orders (id, status, created_at) VALUES (3, 'shipped', '2023-08-01');",
      expectedRows: 1,
      expectedResultNote: { "zh-CN": "删除 2024 年前已取消的订单。", "ja-JP": "2024年より前にキャンセルされた注文を削除します。", "en-US": "Deletes cancelled orders created before 2024." }
    },
    "sql-count-001": {
      sqlSchema: "DROP TABLE IF EXISTS students;\nCREATE TABLE students (id INTEGER, name TEXT, score INTEGER);",
      sqlSeed: "INSERT INTO students (id, name, score) VALUES (1, 'Aoi', 92);\nINSERT INTO students (id, name, score) VALUES (2, 'Ren', 81);\nINSERT INTO students (id, name, score) VALUES (3, 'Mika', 68);",
      expectedRows: 1,
      expectedColumns: ["COUNT(*)"],
      expectedResultNote: { "zh-CN": "返回学生总数 3。", "ja-JP": "学生数3を返します。", "en-US": "Returns a student count of three." }
    },
    "sql-like-001": {
      sqlSchema: "DROP TABLE IF EXISTS users;\nCREATE TABLE users (id INTEGER, name TEXT);",
      sqlSeed: "INSERT INTO users (id, name) VALUES (1, 'Alice');\nINSERT INTO users (id, name) VALUES (2, 'Aoi');\nINSERT INTO users (id, name) VALUES (3, 'Bob');",
      expectedRows: 2,
      expectedResultNote: { "zh-CN": "返回名字以 A 开头的 Alice 和 Aoi。", "ja-JP": "名前が A で始まる Alice と Aoi を返します。", "en-US": "Returns Alice and Aoi, whose names begin with A." }
    },
    "sql-limit-001": {
      sqlSchema: "DROP TABLE IF EXISTS products;\nCREATE TABLE products (id INTEGER, name TEXT, price REAL);",
      sqlSeed: "INSERT INTO products (id, name, price) VALUES (1, 'P1', 10);\nINSERT INTO products (id, name, price) VALUES (2, 'P2', 20);\nINSERT INTO products (id, name, price) VALUES (3, 'P3', 30);\nINSERT INTO products (id, name, price) VALUES (4, 'P4', 40);\nINSERT INTO products (id, name, price) VALUES (5, 'P5', 50);\nINSERT INTO products (id, name, price) VALUES (6, 'P6', 60);\nINSERT INTO products (id, name, price) VALUES (7, 'P7', 70);\nINSERT INTO products (id, name, price) VALUES (8, 'P8', 80);\nINSERT INTO products (id, name, price) VALUES (9, 'P9', 90);\nINSERT INTO products (id, name, price) VALUES (10, 'P10', 100);\nINSERT INTO products (id, name, price) VALUES (11, 'P11', 110);\nINSERT INTO products (id, name, price) VALUES (12, 'P12', 120);",
      expectedRows: 10,
      expectedResultNote: { "zh-CN": "按价格降序返回前 10 个商品。", "ja-JP": "価格の降順で上位10商品を返します。", "en-US": "Returns the ten highest-priced products." }
    }
  };

  window.CODING_TYPING_DATA_SQL.forEach(function (item) {
    var fixture = fixtures[item.id];
    if (!fixture) return;
    fixture.sqlSchema = fixture.sqlSchema.replace(
      /\bCREATE TABLE (?!IF NOT EXISTS)/gi,
      "CREATE TABLE IF NOT EXISTS "
    );
    Object.assign(item, fixture);
  });
})();
