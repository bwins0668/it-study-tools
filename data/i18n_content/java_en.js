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

  // Lesson 11: Stringクラス（文字列） — String Class (Text)
  window.CONTENT_I18N["java:11"] = {
    en: {
      title: "String Class (Text)",
      concept: "**String Class (Text)**\n\n`String` is a class type that handles text strings. You can concatenate strings using the `+` operator.\n\n```\nString name = \"Taro\";\nSystem.out.println(\"Hello, \" + name + \"-san\");\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:11:conceptJa"
    }
  };

  // Lesson 12: エスケープシーケンス — Escape Sequences
  window.CONTENT_I18N["java:12"] = {
    en: {
      title: "Escape Sequences",
      concept: "**Escape Sequences**\n\nSpecial characters in strings are represented using escape sequences:\n\n- `\\n` — Newline\n- `\\t` — Tab\n- `\\\"` — Double quote\n- `\\\\` — Backslash",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:12:conceptJa"
    }
  };

  // Lesson 13: 演習：第2章の課題 — Exercise: Chapter 2 Tasks
  window.CONTENT_I18N["java:13"] = {
    en: {
      title: "Exercise: Chapter 2 Tasks",
      concept: "**【Exercise Prompt】**\n\nUse `Scanner` to read your age from keyboard input, then output the message \"You are ○ years old\" based on that value. (Don't forget to import Scanner!)\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:13:conceptJa"
    }
  };

  // Lesson 14: 条件分岐（if文） — Conditional Branching (if Statement)
  window.CONTENT_I18N["java:14"] = {
    en: {
      title: "Conditional Branching (if Statement)",
      concept: "**Conditional Branching (if Statement)**\n\nBranch execution based on conditions:\n\n```\nif (condition) {\n    // Executed when condition is true\n} else if (anotherCondition) {\n    // Executed when another condition is true\n} else {\n    // Executed when none of the above match\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:14:conceptJa"
    }
  };

  // Lesson 15: 関係演算子と論理演算子 — Relational and Logical Operators
  window.CONTENT_I18N["java:15"] = {
    en: {
      title: "Relational and Logical Operators",
      concept: "**Relational and Logical Operators**\n\n| Operator | Meaning | Example |\n|----------|---------|---------|\n| `==` | Equal to | `a == b` |\n| `!=` | Not equal to | `a != b` |\n| `>`, `<` | Greater than, Less than | `a > b` |\n| `&&` | AND | `a > 0 && b > 0` |\n| `||` | OR | `a > 0 || b > 0` |\n| `!` | NOT | `!isStudent` |",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:15:conceptJa"
    }
  };

  // Lesson 16: switch文 — switch Statement
  window.CONTENT_I18N["java:16"] = {
    en: {
      title: "switch Statement",
      concept: "**switch Statement**\n\nBranch execution based on the value of a single variable:\n\n```\nswitch (variable) {\n    case value1: process1; break;\n    case value2: process2; break;\n    default: otherProcess;\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:16:conceptJa"
    }
  };

  // Lesson 17: 繰り返し（for文） — Repetition (for Loop)
  window.CONTENT_I18N["java:17"] = {
    en: {
      title: "Repetition (for Loop)",
      concept: "**Repetition (for Loop)**\n\n```\nfor (initialization; condition; update) {\n    // Repeated process\n}\n// Example: display 1 to 5\nfor (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:17:conceptJa"
    }
  };

  // Lesson 18: 繰り返し（while文・do-while文） — Repetition (while and do-while Loops)
  window.CONTENT_I18N["java:18"] = {
    en: {
      title: "Repetition (while and do-while Loops)",
      concept: "**Repetition (while and do-while Loops)**\n\n```\nwhile (condition) { process; }  // Repeats while condition is true\ndo { process; } while (condition);  // Always executes at least once\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:18:conceptJa"
    }
  };

  // Lesson 19: break と continue — break and continue
  window.CONTENT_I18N["java:19"] = {
    en: {
      title: "break and continue",
      concept: "**break and continue**\n\n- `break` — Exit the loop immediately\n- `continue` — Skip the current iteration and move to the next",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:19:conceptJa"
    }
  };

  // Lesson 20: 配列 — Arrays
  window.CONTENT_I18N["java:20"] = {
    en: {
      title: "Arrays",
      concept: "**Arrays**\n\nManage multiple values of the same type together:\n\n```\nint[] scores = {85, 90, 78, 95, 82};  // Array of 5 elements\nSystem.out.println(scores[0]);  // First element (index starts at 0)\nSystem.out.println(scores.length);  // Array length = 5\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:20:conceptJa"
    }
  };

  // Lesson 21: 演習：第3章の課題 — Exercise: Chapter 3 Tasks
  window.CONTENT_I18N["java:21"] = {
    en: {
      title: "Exercise: Chapter 3 Tasks",
      concept: "**【Exercise Prompt】**\n\nUse a `for` loop to create a loop that outputs integers from 1 to 10. However, skip the output when the number is a multiple of 3 (using `continue`), and terminate the loop when reaching 8 (using `break`).\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:21:conceptJa"
    }
  };

  // Lesson 22: メソッドとは — What is a Method
  window.CONTENT_I18N["java:22"] = {
    en: {
      title: "What is a Method",
      concept: "**What is a Method**\n\nA method is a named block of processing that can be called any number of times. It eliminates the need to write the same code repeatedly and keeps the program organized.\n\n```\nstatic returnType methodName(parameterType parameterName) {\n    process;\n    return returnValue;\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:22:conceptJa"
    }
  };

  // Lesson 23: 引数（パラメータ） — Parameters
  window.CONTENT_I18N["java:23"] = {
    en: {
      title: "Parameters",
      concept: "**Parameters**\n\nValues passed to a method. You specify them when calling the method:\n\n```\nstatic void greet(String name) {\n    System.out.println(\"Hello, \" + name + \"-san\");\n}\n// Call:\ngreet(\"Taro\");  // Hello, Taro-san\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:23:conceptJa"
    }
  };

  // Lesson 24: 戻り値 — Return Values
  window.CONTENT_I18N["java:24"] = {
    en: {
      title: "Return Values",
      concept: "**Return Values**\n\nThe value a method returns as a result of its processing. Use `return` to send it back. When there is no return value, use `void`:\n\n```\nstatic int add(int a, int b) {\n    return a + b;\n}\nint result = add(3, 4);  // result = 7\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:24:conceptJa"
    }
  };

  // Lesson 25: メソッドのオーバーロード — Method Overloading
  window.CONTENT_I18N["java:25"] = {
    en: {
      title: "Method Overloading",
      concept: "**Method Overloading**\n\nYou can define multiple methods with the same name but different parameter types or counts. This is called **overloading**.\n\n```\nstatic int add(int a, int b) { return a + b; }\nstatic double add(double a, double b) { return a + b; }\nstatic int add(int a, int b, int c) { return a + b + c; }\n```\n\nWhen called, the matching method is automatically selected based on the arguments.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:25:conceptJa"
    }
  };

  // Lesson 26: 変数のスコープ — Variable Scope
  window.CONTENT_I18N["java:26"] = {
    en: {
      title: "Variable Scope",
      concept: "**Variable Scope**\n\nThe range (scope) in which a variable can be used is limited to its enclosing block `{}`. Variables declared inside a method cannot be accessed outside that method (they are **local variables**).",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:26:conceptJa"
    }
  };

  // Lesson 27: 演習：第4章の課題 — Exercise: Chapter 4 Tasks
  window.CONTENT_I18N["java:27"] = {
    en: {
      title: "Exercise: Chapter 4 Tasks",
      concept: "**【Exercise Prompt】**\n\nDefine a method `public static int getMax(int a, int b)` that accepts two integers and returns the larger one. Call it from the `main` method and display the result.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:27:conceptJa"
    }
  };

  // Lesson 28: オブジェクト指向とは — What is Object-Oriented Programming
  window.CONTENT_I18N["java:28"] = {
    en: {
      title: "What is Object-Oriented Programming",
      concept: "**What is Object-Oriented Programming**\n\nObject-Oriented Programming (OOP) is a way of modeling real-world \"things\" (objects) in a program. For example, a \"Student\" object has **attributes (fields)** like name and student ID, and **operations (methods)** like studying and taking exams.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:28:conceptJa"
    }
  };

  // Lesson 29: クラスとインスタンス — Classes and Instances
  window.CONTENT_I18N["java:29"] = {
    en: {
      title: "Classes and Instances",
      concept: "**Classes and Instances**\n\n- **Class** — The blueprint or template for an object (like a type)\n- **Instance** — The actual object created from the blueprint\n\n```\n// Class definition (blueprint)\nclass Student {\n    String name;    // Field (attribute)\n    int studentId;\n}\n\n// Creating an instance\nStudent s = new Student();\ns.name = \"Tanaka\";\ns.studentId = 1001;\nSystem.out.println(s.name);\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:29:conceptJa"
    }
  };

  // Lesson 30: 参照型 — Reference Types
  window.CONTENT_I18N["java:30"] = {
    en: {
      title: "Reference Types",
      concept: "**Reference Types**\n\nA class-type variable holds the \"address\" (reference) in memory where the actual data (object) is stored.\n\nWhen you write `Student s2 = s;`, `s2` points to the **same** object as `s` (it's not a copy!).",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:30:conceptJa"
    }
  };

  // Lesson 31: null — null
  window.CONTENT_I18N["java:31"] = {
    en: {
      title: "null",
      concept: "**null**\n\n`null` is a special value that represents \"referring to nothing.\" Accessing a field or method on a null object causes a **NullPointerException**.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:31:conceptJa"
    }
  };

  // Lesson 32: 参照の配列 — Arrays of References
  window.CONTENT_I18N["java:32"] = {
    en: {
      title: "Arrays of References",
      concept: "**Arrays of References**\n\nYou can create arrays of class types too:\n\n```\nStudent[] students = new Student[3];\nstudents[0] = new Student();\nstudents[0].name = \"Sato\";\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:32:conceptJa"
    }
  };

  // Lesson 33: 演習：第5章の課題 — Exercise: Chapter 5 Tasks
  window.CONTENT_I18N["java:33"] = {
    en: {
      title: "Exercise: Chapter 5 Tasks",
      concept: "**【Exercise Prompt】**\n\nCreate a class representing a \"Student,\" with instance variables `String name` and `int age`. Write a sequence of code that assigns values to them and prints the output to the screen.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:33:conceptJa"
    }
  };

  // Lesson 34: コンストラクタ — Constructors
  window.CONTENT_I18N["java:34"] = {
    en: {
      title: "Constructors",
      concept: "**Constructors**\n\nA constructor is a special method automatically called when an instance is created with `new`. It is used to initialize fields.\n\n- Has the same name as the class\n- Does not have a return type\n\n```\nclass Point {\n    int x, y;\n    Point(int x, int y) {  // Constructor\n        this.x = x;\n        this.y = y;\n    }\n}\nPoint p = new Point(3, 5);  // Constructor is called\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:34:conceptJa"
    }
  };

  // Lesson 35: this キーワード — The this Keyword
  window.CONTENT_I18N["java:35"] = {
    en: {
      title: "The this Keyword",
      concept: "**The this Keyword**\n\n`this` refers to \"the current instance itself.\" When a parameter name and a field name are the same, you can use `this.fieldName` to specify the field.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:35:conceptJa"
    }
  };

  // Lesson 36: クラス変数（static フィールド） — Class Variables (static Fields)
  window.CONTENT_I18N["java:36"] = {
    en: {
      title: "Class Variables (static Fields)",
      concept: "**Class Variables (static Fields)**\n\nVariables shared across all instances of a class. Declare them with the `static` keyword:\n\n```\nclass Counter {\n    static int count = 0;  // Class variable (shared across all instances)\n    int id;\n    Counter() {\n        count++;\n        id = count;\n    }\n}\n// Accessible via Counter.count\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:36:conceptJa"
    }
  };

  // Lesson 37: クラスメソッド（static メソッド） — Class Methods (static Methods)
  window.CONTENT_I18N["java:37"] = {
    en: {
      title: "Class Methods (static Methods)",
      concept: "**Class Methods (static Methods)**\n\nMethods that can be called without creating an instance. Examples include `Math.sqrt()` and `System.out.println()`:\n\n```\nclass MathHelper {\n    static double circle(double r) {\n        return Math.PI * r * r;  // Area of a circle\n    }\n}\ndouble area = MathHelper.circle(5.0);\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:37:conceptJa"
    }
  };

  // Lesson 38: 演習：第6章の課題 — Exercise: Chapter 6 Tasks
  window.CONTENT_I18N["java:38"] = {
    en: {
      title: "Exercise: Chapter 6 Tasks",
      concept: "**【Exercise Prompt】**\n\nDefine a constructor `Student(String name, int age)` in the `Student` class so that objects can be created with initial values in one step using `new`. Write a program that creates and displays such an object.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:38:conceptJa"
    }
  };

  // Lesson 39: 継承とは — What is Inheritance
  window.CONTENT_I18N["java:39"] = {
    en: {
      title: "What is Inheritance",
      concept: "**What is Inheritance**\n\nInheritance lets you create a new class (**subclass**/**child class**) that inherits the functionality of an existing class (**superclass**/**parent class**). This makes code reuse easier.\n\n```\nclass Animal {\n    String name;\n    void eat() { System.out.println(name + \" is eating\"); }\n}\n\nclass Dog extends Animal {  // Inherits from Animal\n    void bark() { System.out.println(name + \" is barking\"); }\n}\n// Dog can use both eat() and bark()\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:39:conceptJa"
    }
  };

  // Lesson 40: メソッドのオーバーライド — Method Overriding
  window.CONTENT_I18N["java:40"] = {
    en: {
      title: "Method Overriding",
      concept: "**Method Overriding**\n\nRedefining (overwriting) a superclass method in a subclass:\n\n```\nclass Animal {\n    void speak() { System.out.println(\"...\"); }\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println(\"Woof!\"); }  // Override\n}\nclass Cat extends Animal {\n    @Override\n    void speak() { System.out.println(\"Meow!\"); }\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:40:conceptJa"
    }
  };

  // Lesson 41: ポリモーフィズム（多態性） — Polymorphism
  window.CONTENT_I18N["java:41"] = {
    en: {
      title: "Polymorphism",
      concept: "**Polymorphism**\n\nA superclass-type variable can hold a subclass instance. Which method is called depends on the actual type of the instance at runtime:\n\n```\nAnimal a1 = new Dog();\nAnimal a2 = new Cat();\na1.speak();  // Woof!\na2.speak();  // Meow!\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:41:conceptJa"
    }
  };

  // Lesson 42: super キーワード — The super Keyword
  window.CONTENT_I18N["java:42"] = {
    en: {
      title: "The super Keyword",
      concept: "**The super Keyword**\n\nUsed to call the superclass's constructor or methods:\n\n```\nclass Dog extends Animal {\n    Dog(String name) {\n        super(name);  // Call parent class constructor\n    }\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:42:conceptJa"
    }
  };

  // Lesson 43: Objectクラス — The Object Class
  window.CONTENT_I18N["java:43"] = {
    en: {
      title: "The Object Class",
      concept: "**The Object Class**\n\nEvery class in Java implicitly inherits from the `Object` class.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:43:conceptJa"
    }
  };

  // Lesson 44: 演習：第7章の課題 — Exercise: Chapter 7 Tasks
  window.CONTENT_I18N["java:44"] = {
    en: {
      title: "Exercise: Chapter 7 Tasks",
      concept: "**【Exercise Prompt】**\n\nDefine a superclass `Animal` and a subclass `Dog` that inherits from it. Implement a `run()` method in `Animal` and a `bark()` method in `Dog`. Create a `Dog` instance and call both methods.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:44:conceptJa"
    }
  };

  // Lesson 45: アクセス修飾子 — Access Modifiers
  window.CONTENT_I18N["java:45"] = {
    en: {
      title: "Access Modifiers",
      concept: "**Access Modifiers**\n\n| Modifier | Access Scope |\n|----------|-------------|\n| `public` | Accessible from anywhere |\n| `private` | Only within the same class |\n| `protected` | Same package + subclasses |\n| (none) | Within the same package |\n\n**Encapsulation**: A design pattern where fields are made `private` to prevent direct external access, and accessed through **getter/setter** methods instead.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:45:conceptJa"
    }
  };

  // Lesson 46: final修飾子 — The final Modifier
  window.CONTENT_I18N["java:46"] = {
    en: {
      title: "The final Modifier",
      concept: "**The final Modifier**\n\n- `final` variable — Value cannot be changed (constant)\n- `final` method — Cannot be overridden\n- `final` class — Cannot be inherited (e.g., the String class)",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:46:conceptJa"
    }
  };

  // Lesson 47: 抽象クラス（abstract class） — Abstract Classes
  window.CONTENT_I18N["java:47"] = {
    en: {
      title: "Abstract Classes",
      concept: "**Abstract Classes (abstract class)**\n\nA class that cannot be instantiated directly. It can have **abstract methods** (declaration only, no implementation) that subclasses must implement:\n\n```\nabstract class Animal {\n    abstract void speak();  // Implementation is left to subclasses\n    void breathe() { System.out.println(\"Breathing...\"); }\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println(\"Woof!\"); }\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:47:conceptJa"
    }
  };

  // Lesson 48: インタフェース（interface） — Interfaces
  window.CONTENT_I18N["java:48"] = {
    en: {
      title: "Interfaces",
      concept: "**Interfaces (interface)**\n\nAn interface is a \"contract\" that only declares method signatures. A class can implement multiple interfaces using `implements` (an alternative to multiple inheritance):\n\n```\ninterface Flyable {\n    void fly();  // No implementation\n}\ninterface Swimmable {\n    void swim();\n}\nclass Duck extends Animal implements Flyable, Swimmable {\n    public void fly() { System.out.println(\"Flying\"); }\n    public void swim() { System.out.println(\"Swimming\"); }\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:48:conceptJa"
    }
  };

  // Lesson 49: 演習：第8章の課題 — Exercise: Chapter 8 Tasks
  window.CONTENT_I18N["java:49"] = {
    en: {
      title: "Exercise: Chapter 8 Tasks",
      concept: "**【Exercise Prompt】**\n\nDefine an abstract class `Shape` with an abstract method `void draw()`. Then create a `Circle` class that extends `Shape` and overrides `draw()` to print \"Drawing a circle.\"\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:49:conceptJa"
    }
  };

  // Lesson 50: パッケージとは — What is a Package
  window.CONTENT_I18N["java:50"] = {
    en: {
      title: "What is a Package",
      concept: "**What is a Package**\n\nA mechanism to group related classes together. Think of it like a folder.\n\nExample: `java.util.ArrayList` is the `ArrayList` class located in the `util` subpackage of the `java` package.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:50:conceptJa"
    }
  };

  // Lesson 51: import宣言 — The import Declaration
  window.CONTENT_I18N["java:51"] = {
    en: {
      title: "The import Declaration",
      concept: "**The import Declaration**\n\nTo use classes from other packages, import them with `import`. The `java.lang` package is automatically imported.\n\n```\nimport java.util.ArrayList;     // Specific class\nimport java.util.*;              // All classes in the package\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:51:conceptJa"
    }
  };

  // Lesson 52: Stringクラスの主なメソッド — Main String Class Methods
  window.CONTENT_I18N["java:52"] = {
    en: {
      title: "Main String Class Methods",
      concept: "**Main String Class Methods**\n\n| Method | Description | Example |\n|--------|-------------|---------|\n| `length()` | Character count | `\"Hello\".length()` → 5 |\n| `charAt(i)` | Character at index i | `\"Hello\".charAt(1)` → 'e' |\n| `substring(s,e)` | Substring | `\"Hello\".substring(1,3)` → \"el\" |\n| `indexOf(s)` | Position of string | `\"Hello\".indexOf(\"l\")` → 2 |\n| `equals(s)` | String comparison | `\"abc\".equals(\"abc\")` → true |\n| `toUpperCase()` | Uppercase conversion | `\"hello\".toUpperCase()` → \"HELLO\" |\n| `split(s)` | Split by delimiter | `\"a,b,c\".split(\",\")` → {\"a\",\"b\",\"c\"} |",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:52:conceptJa"
    }
  };

  // Lesson 53: Mathクラスの主なメソッド — Main Math Class Methods
  window.CONTENT_I18N["java:53"] = {
    en: {
      title: "Main Math Class Methods",
      concept: "**Main Math Class Methods**\n\n```\nMath.abs(-5)      // Absolute value = 5\nMath.sqrt(16.0)   // Square root = 4.0\nMath.pow(2, 10)   // Power = 1024.0\nMath.max(3, 7)    // Maximum = 7\nMath.random()     // Random number between 0.0 and 1.0\nMath.PI           // Pi ≈ 3.14159...\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:53:conceptJa"
    }
  };

  // Lesson 54: 演習：第1章の課題 — Exercise: Chapter 1 Tasks (Part 2)
  window.CONTENT_I18N["java:54"] = {
    en: {
      title: "Exercise: Chapter 1 Tasks (Part 2)",
      concept: "**【Exercise Prompt】**\n\nUsing the main methods of the String class, write a program that takes an arbitrary string input from the keyboard and displays its \"character count\" and the \"first 3 characters.\"\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:54:conceptJa"
    }
  };

  // Lesson 55: 例外とは — What are Exceptions
  window.CONTENT_I18N["java:55"] = {
    en: {
      title: "What are Exceptions",
      concept: "**What are Exceptions**\n\nErrors that occur during program execution. Examples include division by zero, accessing an array index that doesn't exist, and calling methods on a null object.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:55:conceptJa"
    }
  };

  // Lesson 56: try〜catch文 — try-catch Statement
  window.CONTENT_I18N["java:56"] = {
    en: {
      title: "try-catch Statement",
      concept: "**try-catch Statement**\n\nWhen an exception occurs, you can \"catch\" it to prevent the program from crashing:\n\n```\ntry {\n    // Code that might throw an exception\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    // Handle the exception\n    System.out.println(\"Error: \" + e.getMessage());\n} finally {\n    // Always executed, with or without an exception\n    System.out.println(\"Processing complete\");\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:56:conceptJa"
    }
  };

  // Lesson 57: 主な例外クラス — Main Exception Classes
  window.CONTENT_I18N["java:57"] = {
    en: {
      title: "Main Exception Classes",
      concept: "**Main Exception Classes**\n\n| Exception Class | When It Occurs |\n|-----------------|----------------|\n| `ArithmeticException` | Division by zero, etc. |\n| `NullPointerException` | Operating on a null object |\n| `ArrayIndexOutOfBoundsException` | Accessing array out of bounds |\n| `NumberFormatException` | Failed number conversion |\n| `IOException` | Input/output error |",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:57:conceptJa"
    }
  };

  // Lesson 58: 例外を投げる（throw） — Throwing Exceptions (throw)
  window.CONTENT_I18N["java:58"] = {
    en: {
      title: "Throwing Exceptions (throw)",
      concept: "**Throwing Exceptions (throw)**\n\n```\nthrow new IllegalArgumentException(\"Negative values not allowed: \" + value);\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:58:conceptJa"
    }
  };

  // Lesson 59: メソッドの外への送出（throws） — Declaring Exceptions (throws)
  window.CONTENT_I18N["java:59"] = {
    en: {
      title: "Declaring Exceptions (throws)",
      concept: "**Declaring Exceptions (throws)**\n\nUse `throws` when a method does not catch an exception itself but leaves it to the caller:\n\n```\nvoid readFile(String path) throws IOException {\n    // Code that may throw IOException\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:59:conceptJa"
    }
  };

  // Lesson 60: 演習：第2章の課題 — Exercise: Chapter 2 Tasks (Part 2)
  window.CONTENT_I18N["java:60"] = {
    en: {
      title: "Exercise: Chapter 2 Tasks (Part 2)",
      concept: "**【Exercise Prompt】**\n\nWrite a program that safely catches an `ArithmeticException` when division by zero occurs and displays `'[Error] Cannot divide by zero.'` on the console, then terminates normally.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:60:conceptJa"
    }
  };

  // Lesson 61: スレッドとは — What is a Thread
  window.CONTENT_I18N["java:61"] = {
    en: {
      title: "What is a Thread",
      concept: "**What is a Thread**\n\nA thread is a flow of program execution. Normal programs run on a single thread (the main thread), but **multithreading** allows multiple processes to run simultaneously.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:61:conceptJa"
    }
  };

  // Lesson 62: スレッドの作成方法①：Threadクラスを継承 — Creating Threads Method 1: Extending Thread
  window.CONTENT_I18N["java:62"] = {
    en: {
      title: "Creating Threads Method 1: Extending Thread",
      concept: "**Creating Threads Method 1: Extending Thread**\n\n```\nclass MyThread extends Thread {\n    @Override\n    public void run() {\n        for (int i = 0; i < 5; i++) {\n            System.out.println(getName() + \": \" + i);\n        }\n    }\n}\nMyThread t = new MyThread();\nt.start();  // Run run() in a separate thread\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:62:conceptJa"
    }
  };

  // Lesson 63: スレッドの作成方法②：Runnableインタフェースを実装 — Creating Threads Method 2: Implementing Runnable
  window.CONTENT_I18N["java:63"] = {
    en: {
      title: "Creating Threads Method 2: Implementing Runnable",
      concept: "**Creating Threads Method 2: Implementing Runnable**\n\n```\nclass MyTask implements Runnable {\n    @Override\n    public void run() { /* processing */ }\n}\nThread t = new Thread(new MyTask());\nt.start();\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:63:conceptJa"
    }
  };

  // Lesson 64: よく使うThreadメソッド — Commonly Used Thread Methods
  window.CONTENT_I18N["java:64"] = {
    en: {
      title: "Commonly Used Thread Methods",
      concept: "**Commonly Used Thread Methods**\n\n- `Thread.sleep(ms)` — Pause the thread for the specified milliseconds\n- `join()` — Wait for a thread to finish\n- `getName()` — Get the thread name",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:64:conceptJa"
    }
  };

  // Lesson 65: 同期（synchronized） — Synchronization (synchronized)
  window.CONTENT_I18N["java:65"] = {
    en: {
      title: "Synchronization (synchronized)",
      concept: "**Synchronization (synchronized)**\n\nWhen multiple threads access the same data simultaneously, inconsistencies can occur. Use the `synchronized` keyword for exclusive control:\n\n```\nsynchronized void increment() {\n    count++;  // Only one thread can execute this method at a time\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:65:conceptJa"
    }
  };

  // Lesson 66: 演習：第3章の課題 — Exercise: Chapter 3 Tasks (Part 2)
  window.CONTENT_I18N["java:66"] = {
    en: {
      title: "Exercise: Chapter 3 Tasks (Part 2)",
      concept: "**【Exercise Prompt】**\n\nCreate a separate thread that implements the `Runnable` interface. Make it output \"Thread has started!\" three times at 1-second intervals, running in parallel with the main thread.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:66:conceptJa"
    }
  };

  // Lesson 67: メモリの種類 — Types of Memory
  window.CONTENT_I18N["java:67"] = {
    en: {
      title: "Types of Memory",
      concept: "**Types of Memory**\n\n- **Stack** — Stores local variables and method call information. Fast but small capacity. Uses LIFO (Last In, First Out).\n- **Heap** — Stores objects created with `new`. Large capacity but slower than the stack.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:67:conceptJa"
    }
  };

  // Lesson 68: ガーベッジコレクション（GC） — Garbage Collection (GC)
  window.CONTENT_I18N["java:68"] = {
    en: {
      title: "Garbage Collection (GC)",
      concept: "**Garbage Collection (GC)**\n\nAn automatic mechanism that frees memory used by objects that are no longer needed (not referenced from anywhere). In Java, programmers do not need to manually free memory (unlike C or C++).",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:68:conceptJa"
    }
  };

  // Lesson 69: GCが実行されるタイミング — When GC Runs
  window.CONTENT_I18N["java:69"] = {
    en: {
      title: "When GC Runs",
      concept: "**When GC Runs**\n\n- When heap memory becomes insufficient\n- When the JVM determines it is appropriate (programmers cannot control it directly)",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:69:conceptJa"
    }
  };

  // Lesson 70: GCの対象になるケース — When Objects Become GC Targets
  window.CONTENT_I18N["java:70"] = {
    en: {
      title: "When Objects Become GC Targets",
      concept: "**When Objects Become GC Targets**\n\n```\nPoint p = new Point(1, 2);\np = new Point(3, 4);  // The first Point(1,2) becomes a GC target\n// Or:\np = null;  // Cutting the reference makes it a GC target\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:70:conceptJa"
    }
  };

  // Lesson 71: メモリの注意点 — Memory Considerations
  window.CONTENT_I18N["java:71"] = {
    en: {
      title: "Memory Considerations",
      concept: "**Memory Considerations**\n\n- **OutOfMemoryError** — Occurs when the heap is insufficient\n- **StackOverflowError** — Occurs when recursive calls are too deep",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:71:conceptJa"
    }
  };

  // Lesson 72: 演習：第4章の課題 — Exercise: Chapter 4 Tasks (Part 2)
  window.CONTENT_I18N["java:72"] = {
    en: {
      title: "Exercise: Chapter 4 Tasks (Part 2)",
      concept: "**【Exercise Prompt】**\n\nAfter generating a large number of unused instances, execute `Runtime.getRuntime().gc()` and create a test program that monitors and displays the change in free memory before and after garbage collection.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:72:conceptJa"
    }
  };

  // Lesson 73: コレクションとは — What are Collections
  window.CONTENT_I18N["java:73"] = {
    en: {
      title: "What are Collections",
      concept: "**What are Collections**\n\nCollection classes that manage multiple objects together. Unlike arrays, their size changes dynamically.\n\nMain collection interfaces:\n- **List** — Ordered, allows duplicates\n- **Set** — No duplicates allowed\n- **Map** — Key-value pairs",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:73:conceptJa"
    }
  };

  // Lesson 74: ArrayList（リスト） — ArrayList
  window.CONTENT_I18N["java:74"] = {
    en: {
      title: "ArrayList",
      concept: "**ArrayList**\n\n```\nimport java.util.ArrayList;\nArrayList<String> list = new ArrayList<>();\nlist.add(\"apple\");       // Add\nlist.add(\"banana\");\nlist.get(0);             // \"apple\" (access by index)\nlist.size();             // 2\nlist.remove(0);          // Remove index 0\nlist.contains(\"banana\"); // true\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:74:conceptJa"
    }
  };

  // Lesson 75: HashMap（マップ） — HashMap
  window.CONTENT_I18N["java:75"] = {
    en: {
      title: "HashMap",
      concept: "**HashMap**\n\n```\nimport java.util.HashMap;\nHashMap<String, Integer> map = new HashMap<>();\nmap.put(\"Tanaka\", 90);\nmap.put(\"Sato\", 85);\nmap.get(\"Tanaka\");        // 90\nmap.containsKey(\"Sato\");  // true\nmap.keySet();             // Set of keys\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:75:conceptJa"
    }
  };

  // Lesson 76: HashSet（セット） — HashSet
  window.CONTENT_I18N["java:76"] = {
    en: {
      title: "HashSet",
      concept: "**HashSet**\n\n```\nimport java.util.HashSet;\nHashSet<String> set = new HashSet<>();\nset.add(\"apple\");\nset.add(\"apple\");  // Duplicates are ignored\nset.size();        // 1\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:76:conceptJa"
    }
  };

  // Lesson 77: 拡張for文（for-each） — Enhanced for Loop (for-each)
  window.CONTENT_I18N["java:77"] = {
    en: {
      title: "Enhanced for Loop (for-each)",
      concept: "**Enhanced for Loop (for-each)**\n\n```\nfor (String item : list) {\n    System.out.println(item);\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:77:conceptJa"
    }
  };

  // Lesson 78: ジェネリクス（Generics） — Generics
  window.CONTENT_I18N["java:78"] = {
    en: {
      title: "Generics",
      concept: "**Generics**\n\nBy specifying a type parameter like `<String>`, you restrict the type of objects that can be stored in a collection. This provides type safety and eliminates the need for casting.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:78:conceptJa"
    }
  };

  // Lesson 79: 演習：第5章の課題 — Exercise: Chapter 5 Tasks (Part 2)
  window.CONTENT_I18N["java:79"] = {
    en: {
      title: "Exercise: Chapter 5 Tasks (Part 2)",
      concept: "**【Exercise Prompt】**\n\nUsing `HashMap`, create a grade book where the key is \"student name (String)\" and the value is \"score (Integer).\" Add data for 3 students, then search for and output a specific student's score.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:79:conceptJa"
    }
  };

  // Lesson 80: 匿名クラスとは — What is an Anonymous Class
  window.CONTENT_I18N["java:80"] = {
    en: {
      title: "What is an Anonymous Class",
      concept: "**What is an Anonymous Class**\n\nYou can define and use a class without a name on the spot. This is often used when implementing interfaces.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:80:conceptJa"
    }
  };

  // Lesson 81: 関数型インタフェース — Functional Interfaces
  window.CONTENT_I18N["java:81"] = {
    en: {
      title: "Functional Interfaces",
      concept: "**Functional Interfaces**\n\nAn interface with exactly one abstract method is called a **functional interface**. Lambda expressions provide a concise way to implement them.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:81:conceptJa"
    }
  };

  // Lesson 82: ラムダ式の書き方 — Lambda Expression Syntax
  window.CONTENT_I18N["java:82"] = {
    en: {
      title: "Lambda Expression Syntax",
      concept: "**Lambda Expression Syntax**\n\n```\n// Normal anonymous class\nRunnable r = new Runnable() {\n    @Override\n    public void run() { System.out.println(\"Hello\"); }\n};\n\n// Lambda expression (concise!)\nRunnable r = () -> System.out.println(\"Hello\");\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:82:conceptJa"
    }
  };

  // Lesson 83: ラムダ式の省略形 — Lambda Expression Shorthand
  window.CONTENT_I18N["java:83"] = {
    en: {
      title: "Lambda Expression Shorthand",
      concept: "**Lambda Expression Shorthand**\n\n```\n// One parameter → parentheses can be omitted\nx -> x * 2\n\n// Single-line body → {} and return can be omitted\n(a, b) -> a + b\n\n// Full form\n(int a, int b) -> { return a + b; }\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:83:conceptJa"
    }
  };

  // Lesson 84: forEach と ラムダ — forEach with Lambda
  window.CONTENT_I18N["java:84"] = {
    en: {
      title: "forEach with Lambda",
      concept: "**forEach with Lambda**\n\n```\nList<String> list = Arrays.asList(\"A\", \"B\", \"C\");\nlist.forEach(s -> System.out.println(s));\n// Or:\nlist.forEach(System.out::println);  // Method reference\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:84:conceptJa"
    }
  };

  // Lesson 85: ラムダ式でのソート — Sorting with Lambda Expressions
  window.CONTENT_I18N["java:85"] = {
    en: {
      title: "Sorting with Lambda Expressions",
      concept: "**Sorting with Lambda Expressions**\n\n```\nlist.sort((a, b) -> a.compareTo(b));  // Ascending\nlist.sort((a, b) -> b.compareTo(a));  // Descending\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:85:conceptJa"
    }
  };

  // Lesson 86: 演習：第6章の課題 — Exercise: Chapter 6 Tasks (Part 2)
  window.CONTENT_I18N["java:86"] = {
    en: {
      title: "Exercise: Chapter 6 Tasks (Part 2)",
      concept: "**【Exercise Prompt】**\n\nUsing lambda expressions and a list, double each element of a list containing 10, 20, 30 and output the results using `forEach` and a lambda expression.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:86:conceptJa"
    }
  };

  // Lesson 87: 標準入出力 — Standard Input/Output
  window.CONTENT_I18N["java:87"] = {
    en: {
      title: "Standard Input/Output",
      concept: "**Standard Input/Output**\n\n- **Standard Output**: `System.out.println()` (display on screen)\n- **Standard Input**: `Scanner scanner = new Scanner(System.in);` (keyboard input)\n\n```\nimport java.util.Scanner;\nScanner sc = new Scanner(System.in);\nSystem.out.print(\"Enter name: \");\nString name = sc.nextLine();     // Read one line\nint age = sc.nextInt();          // Read an integer\nsc.close();\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:87:conceptJa"
    }
  };

  // Lesson 88: ファイルへの書き込み — Writing to Files
  window.CONTENT_I18N["java:88"] = {
    en: {
      title: "Writing to Files",
      concept: "**Writing to Files**\n\n```\nimport java.io.*;\n// Basic writing\nFileWriter fw = new FileWriter(\"test.txt\");\nfw.write(\"Hello, File!\");\nfw.close();\n\n// Buffered writing (faster)\nBufferedWriter bw = new BufferedWriter(new FileWriter(\"test.txt\"));\nbw.write(\"Hello\");\nbw.newLine();\nbw.close();\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:88:conceptJa"
    }
  };

  // Lesson 89: ファイルからの読み込み — Reading from Files
  window.CONTENT_I18N["java:89"] = {
    en: {
      title: "Reading from Files",
      concept: "**Reading from Files**\n\n```\nBufferedReader br = new BufferedReader(new FileReader(\"test.txt\"));\nString line;\nwhile ((line = br.readLine()) != null) {\n    System.out.println(line);\n}\nbr.close();\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:89:conceptJa"
    }
  };

  // Lesson 90: try-with-resources — try-with-resources
  window.CONTENT_I18N["java:90"] = {
    en: {
      title: "try-with-resources",
      concept: "**try-with-resources**\n\nA syntax that automatically closes streams (Java 7 and later):\n\n```\ntry (BufferedWriter bw = new BufferedWriter(new FileWriter(\"test.txt\"))) {\n    bw.write(\"Auto-close\");\n}  // close() is called automatically here\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:90:conceptJa"
    }
  };

  // Lesson 91: シリアライゼーション — Serialization
  window.CONTENT_I18N["java:91"] = {
    en: {
      title: "Serialization",
      concept: "**Serialization**\n\nA mechanism to save and load objects directly to/from files. The class must implement `Serializable`.\n\n```\nimport java.io.Serializable;\nclass Employee implements Serializable {\n    String name;\n    int id;\n}\n```\n\nWriting:\n\n```\nObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(\"emp.dat\"));\noos.writeObject(emp);\noos.close();\n```\n\nReading:\n\n```\nObjectInputStream ois = new ObjectInputStream(new FileInputStream(\"emp.dat\"));\nEmployee emp = (Employee) ois.readObject();\nois.close();\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:91:conceptJa"
    }
  };

  // Lesson 92: 演習：第7章の課題 — Exercise: Chapter 7 Tasks (Part 2)
  window.CONTENT_I18N["java:92"] = {
    en: {
      title: "Exercise: Chapter 7 Tasks (Part 2)",
      concept: "**【Exercise Prompt】**\n\nUsing `ByteArrayOutputStream`, write the string \"Java Advanced Learning Complete\" to memory, then read it back from the byte array and output it to the console.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:92:conceptJa"
    }
  };

  // Lesson 93: GUIとは — What is a GUI
  window.CONTENT_I18N["java:93"] = {
    en: {
      title: "What is a GUI",
      concept: "**What is a GUI**\n\nGUI stands for Graphical User Interface. It refers to applications that use visual components like windows, buttons, and text fields.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:93:conceptJa"
    }
  };

  // Lesson 94: Swingライブラリ — The Swing Library
  window.CONTENT_I18N["java:94"] = {
    en: {
      title: "The Swing Library",
      concept: "**The Swing Library**\n\nJava's standard library for creating GUIs. It is included in the `javax.swing` package.\n\nMain components:\n\n| Class | Description |\n|-------|-------------|\n| `JFrame` | Window frame |\n| `JButton` | Button |\n| `JLabel` | Label (text display) |\n| `JTextField` | Single-line text input |\n| `JPanel` | Panel for grouping components |",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:94:conceptJa"
    }
  };

  // Lesson 95: レイアウトマネージャ — Layout Managers
  window.CONTENT_I18N["java:95"] = {
    en: {
      title: "Layout Managers",
      concept: "**Layout Managers**\n\n- **FlowLayout** — Arranges components horizontally (default)\n- **BorderLayout** — Five areas: top, bottom, left, right, center\n- **GridLayout** — Arranges in a grid pattern",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:95:conceptJa"
    }
  };

  // Lesson 96: イベント処理 — Event Handling
  window.CONTENT_I18N["java:96"] = {
    en: {
      title: "Event Handling",
      concept: "**Event Handling**\n\nThe mechanism for responding to events like button clicks:\n\n```\nJButton btn = new JButton(\"Click\");\nbtn.addActionListener(e -> {\n    System.out.println(\"Button was pressed!\");\n});\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:96:conceptJa"
    }
  };

  // Lesson 97: 注意 — Note
  window.CONTENT_I18N["java:97"] = {
    en: {
      title: "Note",
      concept: "**Note**\n\nGUI programs require a Swing window and cannot be displayed in this sandbox environment. Please run them in your local IDE.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:97:conceptJa"
    }
  };

  // Lesson 98: 演習：第8章の課題 — Exercise: Chapter 8 Tasks
  window.CONTENT_I18N["java:98"] = {
    en: {
      title: "Exercise: Chapter 8 Tasks",
      concept: "**【Exercise Prompt】**\n\nA summary of knowledge about GUI in Swing. Create code that generates and configures the main components (`JFrame`, `JButton`) for building a Java GUI.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:98:conceptJa"
    }
  };

  // Lesson 99: Javaの描画の仕組み — Java's Drawing Mechanism
  window.CONTENT_I18N["java:99"] = {
    en: {
      title: "Java's Drawing Mechanism",
      concept: "**Java's Drawing Mechanism**\n\nDrawing is done by extending Swing's `JPanel` and overriding the `paintComponent(Graphics g)` method:\n\n```\nclass DrawPanel extends JPanel {\n    @Override\n    protected void paintComponent(Graphics g) {\n        super.paintComponent(g);\n        g.setColor(Color.RED);\n        g.fillRect(50, 50, 100, 80);  // Filled rectangle\n        g.drawOval(200, 50, 80, 80);  // Ellipse (outline only)\n        g.drawLine(0, 0, 300, 300);   // Straight line\n    }\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:99:conceptJa"
    }
  };

  // Lesson 100: Graphics2Dクラス — The Graphics2D Class
  window.CONTENT_I18N["java:100"] = {
    en: {
      title: "The Graphics2D Class",
      concept: "**The Graphics2D Class**\n\nBy casting `Graphics` to `Graphics2D`, you can use more advanced drawing features:\n\n```\nGraphics2D g2 = (Graphics2D) g;\ng2.setStroke(new BasicStroke(3));  // Line thickness\ng2.setRenderingHint(RenderingHints.KEY_ANTIALIASING,\n                    RenderingHints.VALUE_ANTIALIAS_ON);  // Anti-aliasing\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:100:conceptJa"
    }
  };

  // Lesson 101: 座標系 — Coordinate System
  window.CONTENT_I18N["java:101"] = {
    en: {
      title: "Coordinate System",
      concept: "**Coordinate System**\n\nThe top-left corner is (0, 0). The X-axis increases to the right, and the Y-axis increases downward.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:101:conceptJa"
    }
  };

  // Lesson 102: マウスイベント — Mouse Events
  window.CONTENT_I18N["java:102"] = {
    en: {
      title: "Mouse Events",
      concept: "**Mouse Events**\n\nThe `MouseListener` interface handles 5 types of events:\n\n- `mouseClicked` — Clicked\n- `mousePressed` — Button pressed\n- `mouseReleased` — Button released\n- `mouseEntered` — Mouse entered the component\n- `mouseExited` — Mouse exited the component",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:102:conceptJa"
    }
  };

  // Lesson 103: 注意 — Note
  window.CONTENT_I18N["java:103"] = {
    en: {
      title: "Note",
      concept: "**Note**\n\nDrawing programs require a GUI window and cannot be executed directly in this sandbox environment. Please use your local IDE.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:103:conceptJa"
    }
  };

  // Lesson 104: 演習：第9章の課題 — Exercise: Chapter 9 Tasks
  window.CONTENT_I18N["java:104"] = {
    en: {
      title: "Exercise: Chapter 9 Tasks",
      concept: "**【Exercise Prompt】**\n\nUsing the `Graphics2D` class, implement the framework for a method that draws a rectangle starting at position (50, 50) with a width of 200 and height of 100.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:104:conceptJa"
    }
  };

  // Lesson 105: Javaのネットワークプログラミング — Java Network Programming
  window.CONTENT_I18N["java:105"] = {
    en: {
      title: "Java Network Programming",
      concept: "**Java Network Programming**\n\nTCP/IP communication can be implemented using the `java.net` package.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:105:conceptJa"
    }
  };

  // Lesson 106: 基本概念 — Basic Concepts
  window.CONTENT_I18N["java:106"] = {
    en: {
      title: "Basic Concepts",
      concept: "**Basic Concepts**\n\n- **IP Address** — The address of a computer on the network\n- **Port Number** — A number that identifies an application within a computer (0 to 65535)\n- **TCP** — A reliable communication protocol (guarantees data delivery)",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:106:conceptJa"
    }
  };

  // Lesson 107: サーバー側 — Server Side
  window.CONTENT_I18N["java:107"] = {
    en: {
      title: "Server Side",
      concept: "**Server Side**\n\n```\nServerSocket serverSocket = new ServerSocket(8080);\nSocket socket = serverSocket.accept();  // Wait for client connection\n\n// Receiving data\nBufferedReader in = new BufferedReader(\n    new InputStreamReader(socket.getInputStream()));\nString message = in.readLine();\n\n// Sending data\nPrintWriter out = new PrintWriter(socket.getOutputStream(), true);\nout.println(\"Hello!\");\n```\n\nClose resources when done:\n\n```\nin.close();\nout.close();\nsocket.close();\nserverSocket.close();\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:107:conceptJa"
    }
  };

  // Lesson 108: クライアント側 — Client Side
  window.CONTENT_I18N["java:108"] = {
    en: {
      title: "Client Side",
      concept: "**Client Side**\n\n```\nSocket socket = new Socket(\"localhost\", 8080);  // Connect to server\n\nPrintWriter out = new PrintWriter(socket.getOutputStream(), true);\nout.println(\"Hello Server!\");  // Send\n\nBufferedReader in = new BufferedReader(\n    new InputStreamReader(socket.getInputStream()));\nString response = in.readLine();  // Receive\n\nin.close();\nout.close();\nsocket.close();\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:108:conceptJa"
    }
  };

  // Lesson 109: 注意 — Note
  window.CONTENT_I18N["java:109"] = {
    en: {
      title: "Note",
      concept: "**Note**\n\nNetwork programs require both a server and a client program. They cannot be executed directly in this sandbox, but you can review the code structure.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:109:conceptJa"
    }
  };

  // Lesson 110: 演習：第10章の課題 — Exercise: Chapter 10 Tasks
  window.CONTENT_I18N["java:110"] = {
    en: {
      title: "Exercise: Chapter 10 Tasks",
      concept: "**【Exercise Prompt】**\n\nUsing socket communication, create a simple client-side connection test that sends a connection request to a specific port on localhost.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:110:conceptJa"
    }
  };

  // Lesson 111: Stream API（Java 8以降） — Stream API (Java 8+)
  window.CONTENT_I18N["java:111"] = {
    en: {
      title: "Stream API (Java 8+)",
      concept: "**Stream API (Java 8+)**\n\nA powerful mechanism for processing collection elements in a functional style:\n\n```\nimport java.util.stream.*;\n\nList<Integer> numbers = Arrays.asList(1,2,3,4,5,6,7,8,9,10);\n\n// Filter even numbers, double them, and sum\nint result = numbers.stream()\n    .filter(n -> n % 2 == 0)     // Intermediate: filter\n    .map(n -> n * 2)             // Intermediate: transform\n    .reduce(0, Integer::sum);    // Terminal: aggregate\nSystem.out.println(result);  // 60\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:111:conceptJa"
    }
  };

  // Lesson 112: 主なStream操作 — Main Stream Operations
  window.CONTENT_I18N["java:112"] = {
    en: {
      title: "Main Stream Operations",
      concept: "**Main Stream Operations**\n\n| Type | Operation | Description |\n|------|-----------|-------------|\n| **Intermediate** | `filter(predicate)` | Filter by condition |\n| **Intermediate** | `map(function)` | Transform elements |\n| **Intermediate** | `sorted()` | Sort |\n| **Terminal** | `collect()` | Convert to List, etc. |\n| **Terminal** | `forEach()` | Process each element |\n| **Terminal** | `count()` / `sum()` | Aggregate |",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:112:conceptJa"
    }
  };

  // Lesson 113: アノテーション（Annotation） — Annotations
  window.CONTENT_I18N["java:113"] = {
    en: {
      title: "Annotations",
      concept: "**Annotations**\n\nA mechanism to add metadata (supplementary information) to code:\n\n- `@Override` — Explicitly indicates method overriding\n- `@Deprecated` — Marks a method as deprecated\n- `@SuppressWarnings` — Suppresses warnings\n- `@FunctionalInterface` — Indicates a functional interface",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:113:conceptJa"
    }
  };

  // Lesson 114: enum（列挙型） — enum (Enumerated Type)
  window.CONTENT_I18N["java:114"] = {
    en: {
      title: "enum (Enumerated Type)",
      concept: "**enum (Enumerated Type)**\n\nA type used to represent a fixed set of choices:\n\n```\nenum Season { SPRING, SUMMER, AUTUMN, WINTER }\nSeason s = Season.SUMMER;\nSystem.out.println(s);  // SUMMER\n```\n\nEnums can also have fields and methods:\n\n```\nenum Color {\n    RED(\"#FF0000\"), GREEN(\"#00FF00\"), BLUE(\"#0000FF\");\n    \n    private String hexCode;\n    Color(String hexCode) { this.hexCode = hexCode; }\n    public String getHexCode() { return hexCode; }\n}\n```",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:114:conceptJa"
    }
  };

  // Lesson 115: 演習：第11章の課題 — Exercise: Chapter 11 Tasks
  window.CONTENT_I18N["java:115"] = {
    en: {
      title: "Exercise: Chapter 11 Tasks",
      concept: "**【Exercise Prompt】**\n\nUsing the Stream API, extract only the even numbers from a list of integers 1 through 10, triple each of them, and calculate the sum using a near-one-line implementation.\n\nLook at the `Main` class template in the editor on the right, then complete the program to satisfy the requirements. Once finished, click the \"Run\" button to verify your output.",
      needsReview: true,
      source: "manual-java-en-v1",
      sourceRef: "data/java_lessons.js:115:conceptJa"
    }
  };

})();
