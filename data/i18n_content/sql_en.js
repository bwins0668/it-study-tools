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
})();
