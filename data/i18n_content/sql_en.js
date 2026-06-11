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
})();
