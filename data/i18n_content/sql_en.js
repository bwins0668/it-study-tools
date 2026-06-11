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
      title: "02-Retrieving Specific Data with SELECT",
      concept: "Using the SELECT statement, you can retrieve specific columns from a table.\n\nInstead of the wildcard `*` you used in the previous lesson, you specify column names like `name` or `grade` to get only the data you need.\n\nThis lesson will teach you how to write queries that return exactly the columns you want — no more, no less.",
      needsReview: true,
      source: "manual-poc-sql-en-v1",
      sourceRef: "data/lessons.js:2:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:3"] = {
    en: {
      title: "03-Writing Conditions with WHERE",
      concept: "The WHERE clause lets you filter rows based on specific conditions.\n\nFor example, you can retrieve only students whose grade is 'A' or whose name starts with a certain letter.\n\nCombining WHERE with comparison operators (`=`, `>`, `<`, `LIKE`) is one of the most powerful features of SQL.\n\nIn this lesson, you will practice narrowing down results to find exactly the data you're looking for.",
      needsReview: true,
      source: "manual-poc-sql-en-v1",
      sourceRef: "data/lessons.js:3:conceptJa"
    }
  };

  window.CONTENT_I18N["sql:4"] = {
    en: {
      title: "04-Filtering Rows with WHERE",
      concept: "To filter data and get only the rows you need, use the **WHERE** clause.\n\nFor example, if you want to find only female students, you would write:\n\n```sql\nSELECT * FROM students_mst WHERE gender = '1';\n```\n\nThe WHERE clause checks each row in the table and keeps only the rows that match the specified condition.\n\nYou can use WHERE with numbers, text, and even dates. The condition can use operators like `=`, `>`, `<`, `>=`, `<=`.",
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
})();
