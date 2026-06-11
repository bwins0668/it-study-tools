/* SQL Lessons English Translation v1 — POC (Lessons 1-3) */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["sql:1"] = {
    en: {
      title: "01-What are SQL and Databases?",
      concept: "A database (DB) is an organized collection of data.\n\nIn most systems, data is managed in the form of tables using a **Relational Database (RDB)**.\n\n**SQL** is the dedicated language used to command the database — telling it to \"retrieve data,\" \"insert data,\" and so on.\n\nIn this lesson, you will learn the most basic data retrieval command by fetching data from your school's student master table.",
      needsReview: true,
      source: "manual-poc-sql-en-v1",
      sourceRef: "data/lessons.js:1:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:2"] = {
    en: {
      title: "02-Table Structure, Data Types, and Primary Keys",
      concept: "A table consists of columns and rows.\n\nEach column is assigned a **data type** (such as number, text, or date), and data that does not match this type cannot be inserted.\n\nAdditionally, a **primary key (Primary Key)** is set for a table as a unique identifier to distinguish each row.\n\nIn your school's database, `department_id` serves as the primary key for the `departments_mst` table.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:2:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:3"] = {
    en: {
      title: "03-Basic SELECT Syntax",
      concept: "The most basic way to retrieve data is using the structure: `SELECT column_name FROM table_name;`.\n\nIf you want to retrieve all columns, specify `*` (asterisk) instead of individual column names.\n\nIf you only need specific columns, list their names separated by commas.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:3:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:4"] = {
    en: {
      title: "04-Filtering Rows with WHERE",
      concept: "To filter data and retrieve only the rows you need, use the **WHERE** clause.\n\nYou write it like: `SELECT column_name FROM table_name WHERE condition;`.\n\nFor example, to find only female students (where gender is '1'), you would write:\n\n```sql\nSELECT * FROM students_mst WHERE gender = '1';\n```\n\nWhen specifying text, you must enclose it in single quotes `'`. The condition can check if columns equal, are greater than, or are less than certain values.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:4:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:5"] = {
    en: {
      title: "05-Combining Conditions with AND",
      concept: "When you need **all conditions to be true at the same time**, use **AND**.\n\nFor example, to find a 24-year-old student in department 1:\n\n```sql\nSELECT * FROM students_mst\nWHERE age = 24 AND department_id = 1;\n```\n\nBoth the age condition AND the department condition must be satisfied. If either one is false, that row is excluded from the results.\n\n**AND** narrows down your search — the more conditions you add, the fewer results you get.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:5:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:6"] = {
    en: {
      title: "06-Combining Conditions with OR",
      concept: "When you need **any one of several conditions to be true**, use **OR**.\n\nFor example, to find students who are in department 1 OR department 2:\n\n```sql\nSELECT * FROM students_mst\nWHERE department_id = 1 OR department_id = 2;\n```\n\nWith OR, as long as at least one condition is true, the row is included.\n\nUnlike AND which narrows results, **OR broadens** your search.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:6:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:7"] = {
    en: {
      title: "07-Combining AND and OR Conditions",
      concept: "You can combine **AND** and **OR** in the same WHERE clause.\n\nHowever, AND and OR have different priorities — **AND is evaluated before OR**, just like multiplication before addition in math.\n\nTo control the evaluation order, use parentheses `()`:\n\n```sql\nSELECT * FROM students_mst\nWHERE (age = 20 OR age = 24) AND gender = '0';\n```\n\nThis finds male students who are either 20 OR 24 years old. Without the parentheses, AND would run first and the result would be different.\n\nAlways use parentheses to make your query's logic clear and correct.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:7:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:8"] = {
    en: {
      title: "08-Using Comparison Operators",
      concept: "Besides equals (`=`), SQL supports several **comparison operators** for more flexible conditions:\n\n| Operator | Meaning |\n|----------|---------|\n| `=` | Equal to |\n| `<>` or `!=` | Not equal to |\n| `>` | Greater than |\n| `<` | Less than |\n| `>=` | Greater than or equal to |\n| `<=` | Less than or equal to |\n\nFor example, to find students with a test score of 90 or higher:\n\n```sql\nSELECT * FROM students_mst WHERE test_score >= 90;\n```\n\nThese operators work with numbers, dates, and even text in some cases.\n\nBe careful: `>= 90` includes 90, while `> 90` does not.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:8:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:9"] = {
    en: {
      title: "09-Checking NULL with IS NULL and IS NOT NULL",
      concept: "When a column has no data entered, its value is **NULL**. NULL is not zero, not an empty string — it means \"no value at all.\"\n\nTo check for NULL, you **cannot** use `= NULL` or `<> NULL`. Instead, use special operators:\n\n```sql\n-- Find students whose delete_at is NULL (not yet deleted)\nSELECT * FROM students_mst WHERE delete_at IS NULL;\n\n-- Find students whose delete_at is NOT NULL (already deleted)\nSELECT * FROM students_mst WHERE delete_at IS NOT NULL;\n```\n\n**IS NULL** checks for missing data. **IS NOT NULL** checks for existing data.\n\nThink of it like checking if a pocket exists (IS NOT NULL) versus checking if the pocket is empty (a different concept entirely).",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:9:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:10"] = {
    en: {
      title: "10-Searching Text with LIKE",
      concept: "When you want to search for a **pattern** rather than an exact match, use **LIKE** with **wildcard characters**:\n\n| Wildcard | Meaning |\n|----------|---------|\n| `%` | Matches any sequence of characters (zero or more) |\n| `_` | Matches exactly one character |\n\nFor example, to find students whose kana name starts with \"Yama\":\n\n```sql\nSELECT * FROM students_mst\nWHERE student_name_kana LIKE 'Yama%';\n```\n\nThis finds 'Yamada', 'Yamamoto', 'Yamashita' — anything starting with 'Yama'.\n\nIf you used `_ama%`, it would match names where the second character is 'a', the third is 'm', the fourth is 'a', followed by anything.\n\nLIKE is case-insensitive in MySQL by default, but behavior may vary with other database systems.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:10:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:11"] = {
    en: {
      title: "11-Filtering Ranges with BETWEEN",
      concept: "To find values that fall **within a specific range**, use **BETWEEN**.\n\nFor example, to find students aged 20 to 25:\n\n```sql\nSELECT * FROM students_mst WHERE age BETWEEN 20 AND 25;\n```\n\nBETWEEN is **inclusive** — it includes both the start and end values. So `BETWEEN 20 AND 25` includes ages 20, 21, 22, 23, 24, and 25.\n\nYou can use BETWEEN with numbers, dates, and even text. It makes range queries clearer and shorter than using `>=` and `<=`.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:11:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:12"] = {
    en: {
      title: "12-Matching Multiple Values with IN",
      concept: "When you want to check if a value matches **any one of several specific values**, use **IN**.\n\nFor example, to find students whose age is 20, 25, or 30:\n\n```sql\nSELECT * FROM students_mst WHERE age IN (20, 25, 30);\n```\n\nThis is much shorter than writing:\n```sql\nWHERE age = 20 OR age = 25 OR age = 30\n```\n\nIN works with numbers and text. You can also use IN with a subquery (a query inside another query).",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:12:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:13"] = {
    en: {
      title: "13-Sorting Rows with ORDER BY",
      concept: "To display your query results in a specific order, use **ORDER BY**.\n\nBy default, sorting is **ascending** (smallest to largest, A to Z). To reverse the order, add **DESC** (descending):\n\n```sql\n-- Sort by age from lowest to highest (ascending)\nSELECT * FROM students_mst ORDER BY age;\n\n-- Sort by age from highest to lowest (descending)\nSELECT * FROM students_mst ORDER BY age DESC;\n```\n\nYou can also sort by multiple columns:\n\n```sql\nSELECT * FROM students_mst ORDER BY department_id, age DESC;\n```\n\nThis sorts first by department, then by age within each department.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:13:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:14"] = {
    en: {
      title: "14-Limiting the Number of Rows with LIMIT",
      concept: "When you only want the **first few rows** of a result, use **LIMIT**.\n\nFor example, to find the top 3 highest-scoring students:\n\n```sql\nSELECT * FROM students_mst\nORDER BY test_score DESC\nLIMIT 3;\n```\n\nThe query first sorts by score descending, then LIMIT keeps only the first 3 rows.\n\nLIMIT is placed at the very end of the query, after ORDER BY.\n\nThis is especially useful when you want a preview of the data or need to implement pagination.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:14:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:15"] = {
    en: {
      title: "15-Removing Duplicates with DISTINCT",
      concept: "When a column contains duplicate values and you want to see **only the unique values**, add **DISTINCT** after SELECT.\n\nFor example, to see which ages exist in your student table (without repeats):\n\n```sql\nSELECT DISTINCT age FROM students_mst;\n```\n\nWithout DISTINCT, you would get the same age listed multiple times — one for each student.\n\nDISTINCT applies to all selected columns. If you write `SELECT DISTINCT age, name`, it shows unique combinations of age AND name together.\n\nDISTINCT is useful for exploring what values actually exist in your data.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:15:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:16"] = {
    en: {
      title: "16-Using SQL String and Date Functions",
      concept: "SQL provides many built-in **functions** to transform, calculate, or extract parts of your data.\n\nCommon string functions:\n- `CHAR_LENGTH(str)` — number of characters in a string\n- `CONCAT(a, b)` — join two strings together\n- `UPPER(str)` / `LOWER(str)` — change letter case\n\nCommon date functions:\n- `CURRENT_DATE` — today's date\n- `YEAR(date)` / `MONTH(date)` — extract part of a date\n\nExample:\n```sql\nSELECT student_name, CHAR_LENGTH(student_name) AS name_length\nFROM students_mst;\n```\n\nFunctions do not modify the original data — they only transform the displayed output.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:16:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:17"] = {
    en: {
      title: "17-Using CASE Expressions for Conditional Logic",
      concept: "**CASE** lets you add **if-then-else logic** directly inside your SQL query.\n\nBasic syntax:\n```sql\nSELECT student_name, age,\n  CASE\n    WHEN age >= 20 THEN 'Adult'\n    ELSE 'Minor'\n  END AS age_group\nFROM students_mst;\n```\n\nCASE checks each WHEN condition in order. The first matching condition wins. If none match, ELSE is used (or NULL if no ELSE).\n\nYou can also use CASE with multiple conditions:\n```sql\nCASE\n  WHEN score >= 80 THEN 'Excellent'\n  WHEN score >= 60 THEN 'Good'\n  ELSE 'Needs Improvement'\nEND\n```\n\nCASE is evaluated for each row, making it a powerful tool for creating calculated columns.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:17:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:18"] = {
    en: {
      title: "18-Aggregate Functions: SUM, AVG, COUNT, etc.",
      concept: "Functions that perform calculations on multiple rows of data together are called **aggregate functions**.\n\n- **COUNT(column)**: Counts the number of rows.\n- **SUM(column)**: Calculates the total value.\n- **AVG(column)**: Calculates the average value.\n- **MAX(column)** / **MIN(column)**: Finds the maximum / minimum value.\n\nUsing aggregate functions allows you to get statistics for the entire group rather than individual rows.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:18:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:19"] = {
    en: {
      title: "19-Grouping Data: GROUP BY",
      concept: "To divide data into groups and perform aggregations on each group, use the **GROUP BY** clause.\n\nYou write it like:\n\n```sql\nSELECT gender, AVG(age) FROM students GROUP BY gender;\n```\n\nThis allows you to calculate statistics like the \"average age of male students\" and the \"average age of female students\" all at once.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:19:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:20"] = {
    en: {
      title: "20-Filtering Groups: HAVING",
      concept: "If you want to filter results **after** they have been aggregated by GROUP BY, use the **HAVING** clause instead of WHERE.\n\nThe WHERE clause filters rows **before** they are grouped, while the HAVING clause filters groups **after** they have been grouped.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:20:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:21"] = {
    en: {
      title: "21-Database Design and Normalization",
      concept: "In database design, data is split into multiple tables to avoid unnecessary duplication and inconsistencies. This process is called **normalization**.\n\nFor example, instead of writing the department name directly in the student table, you only write the \"department ID\" and manage the details in a separate department table.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:21:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:22"] = {
    en: {
      title: "22-Joining Tables: INNER JOIN",
      concept: "**JOINing** is the process of linking separate tables together to retrieve combined information.\n\nAn **INNER JOIN (internal join)** retrieves only the rows where the common keys match in both tables.\n\nYou write it as:\n\n```sql\nFROM table_A INNER JOIN table_B ON table_A.key = table_B.key\n```",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:22:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:23"] = {
    en: {
      title: "23-Joining Tables: LEFT/RIGHT JOIN",
      concept: "An **OUTER JOIN** keeps all data from one table while joining matching data from another table.\n\n- **LEFT JOIN**: Keeps all data from the table written on the left side of the FROM clause.\n- **RIGHT JOIN**: Keeps all data from the table written on the right side.\n\nIf there is no matching record in the other table, it will be filled with `NULL`.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:23:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:24"] = {
    en: {
      title: "24-Self Joins and Multiple Joins",
      concept: "Joining a table to itself is called a **self join**.\n\nThis is useful when you want to extract related pairs from the same table.\n\nYou assign aliases (temporary names) like `students_mst AS s1` and treat it as if it were a separate table.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:24:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:25"] = {
    en: {
      title: "25-Using Subqueries",
      concept: "An SQL query nested inside another SQL query is called a **subquery**.\n\nFor example, if you want \"a list of students whose score is higher than the average score,\" you first calculate the average score using a subquery, and then use that result to filter the rows in the outer SQL query.\n\nYou write the inner SQL query inside parentheses `()`.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:25:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:26"] = {
    en: {
      title: "26-Inserting Rows with INSERT",
      concept: "To register new data into a table, use the **INSERT** statement.\n\nYou write it as:\n\n```sql\nINSERT INTO table_name (column1, column2) VALUES (value1, value2);\n```\n\nThe order of the values must match the order of the specified columns.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:26:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:27"] = {
    en: {
      title: "27-Updating Rows with UPDATE",
      concept: "To modify existing data in a table, use the **UPDATE** statement.\n\nYou write it like:\n\n```sql\nUPDATE table_name SET column_name = new_value WHERE condition;\n```\n\n> [!CAUTION]\n> **Extremely Important**: If you forget to write the WHERE clause, all rows in the table will be updated!",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:27:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:28"] = {
    en: {
      title: "28-Deleting Rows with DELETE",
      concept: "To delete data from a table, use the **DELETE** statement.\n\nYou write it as:\n\n```sql\nDELETE FROM table_name WHERE condition;\n```\n\n> [!CAUTION]\n> **Extremely Important**: Just like with the UPDATE statement, if there is no WHERE clause, all rows in the table will be deleted!",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:28:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:29"] = {
    en: {
      title: "29-Creating Tables with CREATE TABLE",
      concept: "To create a new table, use the **CREATE TABLE** statement.\n\nYou define it like:\n\n```sql\nCREATE TABLE table_name (column_name data_type, column_name data_type, ...);\n```\n\nFor example, to set a column as the primary key, declare it with the \"PRIMARY KEY\" constraint.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:29:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:30"] = {
    en: {
      title: "30-Using Constraints: NOT NULL, UNIQUE, and DEFAULT",
      concept: "You can set rules (constraints) on table columns to maintain data quality:\n\n- **NOT NULL**: Disallows empty spaces (NULL).\n- **UNIQUE**: Disallows duplicate values.\n- **DEFAULT value**: Sets a value that is automatically entered when a value is omitted.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:30:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:31"] = {
    en: {
      title: "31-Primary Keys and Auto-Increment",
      concept: "A table can have only one primary key (PRIMARY KEY).\n\nIn MySQL, specifying **AUTO_INCREMENT** for a primary key automatically assigns sequential numbers like \"1, 2, 3...\" when new data is inserted.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:31:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:32"] = {
    en: {
      title: "32-Foreign Key Constraints",
      concept: "To ensure the relationship and consistency between tables, use a **foreign key (FOREIGN KEY)** constraint.\n\n- For example, you can enforce a rule stating that \"a student's department_id must exist in the department_id column of the departments_mst table.\" This prevents registering department IDs that do not exist.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:32:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:33"] = {
    en: {
      title: "33-Modifying and Deleting Tables with ALTER and DROP",
      concept: "These operations are performed after a table has been created:\n\n- **ALTER TABLE**: Modifies the structure of a table, such as adding or changing columns.\n  - Adding a column: `ALTER TABLE table_name ADD column_name data_type;`\n- **DROP TABLE**: Permanently deletes the table itself.\n  - `DROP TABLE table_name;` (Note: All data inside the table will also be deleted.)",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:33:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:34"] = {
    en: {
      title: "34-Transaction Processing",
      concept: "A mechanism that groups multiple operations and treats them as \"a single unit of work\" is called a **transaction**.\n\n- **COMMIT**: Finalizes and saves all changes.\n- **ROLLBACK**: Reverts all operations back to their state before the transaction started if an error occurs.\n\nThis is essential for processes where partial failures cannot be tolerated, such as bank transfers (deducting money from Account A and depositing it into Account B).",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:34:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:35"] = {
    en: {
      title: "35-Indexes for Fast Searching",
      concept: "A directory created to speed up data retrieval within a table is called an \"index (INDEX)\".\n\nOn tables with large amounts of data, creating an index on specific columns can dramatically improve search speeds.\n\nHowever, having too many indexes has the disadvantage of slowing down data insertions and updates because the index must be maintained.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:35:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:36"] = {
    en: {
      title: "36-Views and Stored Procedures",
      concept: "These are mechanisms to reuse SQL queries and improve operation efficiency:\n\n- **VIEW**: A \"virtual table\" that saves a complex SELECT statement.\n- **Stored Routine (Stored Procedure)**: A program that saves multiple SQL operations and conditional logic directly on the database side, allowing them to be executed by simply calling the program.",
      needsReview: true,
      source: "manual-sql-en-v2",
      sourceRef: "data/lessons.js:36:conceptJa"
    }
  };
})();
