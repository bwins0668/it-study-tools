/* Study Tools Content I18n — Java English Content Language Pack v1 */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  // Lesson 1: プログラムとは — What is a Program
  window.CONTENT_I18N["java:1"] = {
    en: {
      title: "What is a Program",
      concept: "A **program** is a set of step-by-step instructions that tells a computer what to do. Just like a cooking recipe tells you the order of steps to follow, a computer executes program instructions in sequence from top to bottom.\n\nThe specialized language used to write programs is called a **programming language**, and Java is one of the most well-known examples.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:1:conceptJa"
    }
  };

  // Lesson 2: Javaの特徴 — Features of Java
  window.CONTENT_I18N["java:2"] = {
    en: {
      title: "Features of Java",
      concept: "- **Platform Independence**: Programs written in Java can run on Windows, Mac, and Linux (\"Write Once, Run Anywhere\")\n- **Object-Oriented**: You can design programs by modeling real-world \"objects\"\n- **Strongly Typed**: Variable types are strictly enforced, reducing bugs\n- **Rich Standard Library**: Many built-in features are available out of the box",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:2:conceptJa"
    }
  };

  // Lesson 3: Javaプログラムの基本構造 — Basic Structure of a Java Program
  window.CONTENT_I18N["java:3"] = {
    en: {
      title: "Basic Structure of a Java Program",
      concept: "A minimal Java program looks like this:\n\n```\nclass ClassName {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}\n```\n\nEvery Java program must place its code inside a **class**. The `main` method is the entry point — this is where the program starts executing.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:3:conceptJa"
    }
  };

  // Lesson 4: コメント文 — Comments
  window.CONTENT_I18N["java:4"] = {
    en: {
      title: "Comments",
      concept: "Anything from `//` to the end of the line is a **comment** (an annotation). The computer ignores them during execution, so you can use them as notes.\n\nMulti-line comments are enclosed with `/*` and `*/`.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:4:conceptJa"
    }
  };

  // Lesson 5: ブロックとインデント — Blocks and Indentation
  window.CONTENT_I18N["java:5"] = {
    en: {
      title: "Blocks and Indentation",
      concept: "A section enclosed in `{` and `}` is called a **block**. By convention, code inside a block is **indented** (shifted to the right) to make it easier to read.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:5:conceptJa"
    }
  };

  // Lesson 6: 演習：第1章の課題 — Exercise: Chapter 1 Tasks
  window.CONTENT_I18N["java:6"] = {
    en: {
      title: "Exercise: Chapter 1 Tasks",
      concept: "**【Exercise Prompt】**\n\nWrite a program that prints two lines on the screen:\n1. \"Start learning Java!\"\n2. Your own name (e.g., \"Taro Yamada\")\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:6:conceptJa"
    }
  };

  // Lesson 7: 変数とは — What is a Variable
  window.CONTENT_I18N["java:7"] = {
    en: {
      title: "What is a Variable",
      concept: "A **variable** is like a labeled box that temporarily stores a value. Each box has a name (the variable name) and a type that determines what kind of value it can hold.\n\nVariables must be **declared** before use:\n\n```\ntypeName variableName;          // declaration\ntypeName variableName = value; // declaration with initialization\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:7:conceptJa"
    }
  };

  // Lesson 8: Javaの基本データ型 — Java Basic Data Types
  window.CONTENT_I18N["java:8"] = {
    en: {
      title: "Java Basic Data Types",
      concept: "Java has several basic data types for storing different kinds of values:\n\n- **int** — Integer (approx. ±2.1 billion), e.g. `100`, `-5`, `0`\n- **double** — Decimal number (double precision), e.g. `3.14`, `-2.5`\n- **boolean** — True/false value, e.g. `true`, `false`\n- **char** — Single character, e.g. `'A'`, `'あ'`\n- **long** — Large integer, e.g. `1000000000L`\n- **String** — Text string (class type), e.g. `\"Hello\"`",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:8:conceptJa"
    }
  };

  // Lesson 9: 算術演算子 — Arithmetic Operators
  window.CONTENT_I18N["java:9"] = {
    en: {
      title: "Arithmetic Operators",
      concept: "- `+` Addition, `-` Subtraction, `*` Multiplication, `/` Division, `%` Remainder (modulo)\n- Integer division **discards** the fractional part: `7 / 2 = 3`\n- `++` Increment (increase by 1), `--` Decrement (decrease by 1)",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:9:conceptJa"
    }
  };

  // Lesson 10: 型変換（キャスト） — Type Conversion (Cast)
  window.CONTENT_I18N["java:10"] = {
    en: {
      title: "Type Conversion (Cast)",
      concept: "When mixing different types in a calculation, Java automatically converts to the larger type (implicit conversion).\n\nTo explicitly convert a value, use the **cast operator**: `(int) 3.7` yields `3` (the decimal part is truncated).",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:10:conceptJa"
    }
  };

})();
