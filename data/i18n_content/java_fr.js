/* Study Tools Content I18n — Java French Derived Language Pack v1 */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["java:1"] = window.CONTENT_I18N["java:1"] || {};
  window.CONTENT_I18N["java:1"].fr = {
    title: "Qu'est-ce qu'un programme ?",
    concept: "Un **programme** est un ensemble d'instructions étape par étape qui dit à un ordinateur quoi faire. Tout comme une recette de cuisine vous indique l'ordre des étapes à suivre, un ordinateur exécute les instructions du programme dans l'ordre, du début à la fin.\n\nLe langage spécialisé utilisé pour écrire des programmes s'appelle un **langage de programmation**, et Java en est l'un des exemples les plus connus.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:1:en"
  };

  window.CONTENT_I18N["java:2"] = window.CONTENT_I18N["java:2"] || {};
  window.CONTENT_I18N["java:2"].fr = {
    title: "Caractéristiques de Java",
    concept: "- **Indépendance de plateforme** : Les programmes écrits en Java fonctionnent sur Windows, Mac et Linux (\"Write Once, Run Anywhere\")\n- **Orienté objet** : Vous pouvez concevoir des programmes en modélisant des \"objets\" du monde réel\n- **Typage fort** : Les types de variables sont strictement définis, ce qui réduit les bogues\n- **Bibliothèque standard riche** : De nombreuses fonctionnalités sont intégrées et utilisables immédiatement",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:2:en"
  };

  window.CONTENT_I18N["java:3"] = window.CONTENT_I18N["java:3"] || {};
  window.CONTENT_I18N["java:3"].fr = {
    title: "Structure de base d'un programme Java",
    concept: "Un programme Java minimal ressemble à ceci :\n\n```\nclass ClassName {\n    public static void main(String[] args) {\n        // Écrivez votre code ici\n    }\n}\n```\n\nTout programme Java doit placer son code à l'intérieur d'une **classe (class)**. La méthode `main` est le point d'entrée — c'est par là que le programme commence à s'exécuter.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:3:en"
  };

  window.CONTENT_I18N["java:4"] = window.CONTENT_I18N["java:4"] || {};
  window.CONTENT_I18N["java:4"].fr = {
    title: "Commentaires",
    concept: "Tout ce qui suit `//` jusqu'à la fin de la ligne est un **commentaire** (une annotation). L'ordinateur les ignore lors de l'exécution, vous pouvez donc les utiliser comme notes.\n\nLes commentaires multi-lignes sont encadrés par `/*` et `*/`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:4:en"
  };

  window.CONTENT_I18N["java:5"] = window.CONTENT_I18N["java:5"] || {};
  window.CONTENT_I18N["java:5"].fr = {
    title: "Blocs et indentation",
    concept: "Une section délimitée par `{` et `}` s'appelle un **bloc**. Par convention, le code à l'intérieur d'un bloc est **indenté** (décalé vers la droite) pour le rendre plus lisible.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:5:en"
  };

  window.CONTENT_I18N["java:6"] = window.CONTENT_I18N["java:6"] || {};
  window.CONTENT_I18N["java:6"].fr = {
    title: "Exercice : Tâches du chapitre 1",
    concept: "**【Consigne de l'exercice】**\n\nÉcrivez un programme qui affiche deux lignes à l'écran :\n1. \"Start learning Java!\"\n2. Votre propre nom (ex. \"Taro Yamada\")\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:6:en"
  };

  window.CONTENT_I18N["java:7"] = window.CONTENT_I18N["java:7"] || {};
  window.CONTENT_I18N["java:7"].fr = {
    title: "Qu'est-ce qu'une variable ?",
    concept: "Une **variable** est comme une boîte étiquetée qui stocke temporairement une valeur. Chaque boîte a un nom (le nom de la variable) et un type qui détermine quel type de valeur elle peut contenir.\n\nLes variables doivent être **déclarées** avant utilisation :\n\n```\ntypeName variableName;          // déclaration\ntypeName variableName = value; // déclaration avec initialisation\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:7:en"
  };

  window.CONTENT_I18N["java:8"] = window.CONTENT_I18N["java:8"] || {};
  window.CONTENT_I18N["java:8"].fr = {
    title: "Types de données de base en Java",
    concept: "Java dispose de plusieurs types de données de base pour stocker différents types de valeurs :\n\n- **int** — Entier (environ ±2,1 milliards), ex. `100`, `-5`, `0`\n- **double** — Nombre décimal (double précision), ex. `3.14`, `-2.5`\n- **boolean** — Valeur vrai/faux, ex. `true`, `false`\n- **char** — Caractère unique, ex. `'A'`, `'あ'`\n- **long** — Grand entier, ex. `1000000000L`\n- **String** — Chaîne de caractères (type classe), ex. `\"Hello\"`",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:8:en"
  };

  window.CONTENT_I18N["java:9"] = window.CONTENT_I18N["java:9"] || {};
  window.CONTENT_I18N["java:9"].fr = {
    title: "Opérateurs arithmétiques",
    concept: "- `+` Addition, `-` Soustraction, `*` Multiplication, `/` Division, `%` Reste (modulo)\n- La division entière **supprime** la partie fractionnaire : `7 / 2 = 3`\n- `++` Incrémentation (augmentation de 1), `--` Décrémentation (diminution de 1)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:9:en"
  };

  window.CONTENT_I18N["java:10"] = window.CONTENT_I18N["java:10"] || {};
  window.CONTENT_I18N["java:10"].fr = {
    title: "Conversion de type (Cast)",
    concept: "Lorsqu'on mélange différents types dans un calcul, Java convertit automatiquement vers le type le plus grand (conversion implicite).\n\nPour convertir explicitement une valeur, utilisez l'**opérateur de cast** : `(int) 3.7` donne `3` (la partie décimale est tronquée).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:10:en"
  };

  window.CONTENT_I18N["java:11"] = window.CONTENT_I18N["java:11"] || {};
  window.CONTENT_I18N["java:11"].fr = {
    title: "Classe String (chaînes de caractères)",
    concept: "**Classe String (chaînes de caractères)**\n\n`String` est un type classe qui gère les chaînes de caractères. Vous pouvez concaténer des chaînes avec l'opérateur `+`.\n\n```\nString name = \"Taro\";\nSystem.out.println(\"Hello, \" + name + \"-san\");\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:11:en"
  };

  window.CONTENT_I18N["java:12"] = window.CONTENT_I18N["java:12"] || {};
  window.CONTENT_I18N["java:12"].fr = {
    title: "Séquences d'échappement",
    concept: "**Séquences d'échappement**\n\nLes caractères spéciaux dans les chaînes sont représentés par des séquences d'échappement :\n\n- `\\n` — Nouvelle ligne\n- `\\t` — Tabulation\n- `\\\"` — Guillemet double\n- `\\\\` — Antislash",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:12:en"
  };

  window.CONTENT_I18N["java:13"] = window.CONTENT_I18N["java:13"] || {};
  window.CONTENT_I18N["java:13"].fr = {
    title: "Exercice : Tâches du chapitre 2",
    concept: "**【Consigne de l'exercice】**\n\nUtilisez `Scanner` pour lire votre âge depuis l'entrée clavier, puis affichez le message \"Vous avez ○ ans\" basé sur cette valeur. (N'oubliez pas d'importer Scanner !)\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:13:en"
  };

  window.CONTENT_I18N["java:14"] = window.CONTENT_I18N["java:14"] || {};
  window.CONTENT_I18N["java:14"].fr = {
    title: "Branchement conditionnel (instruction if)",
    concept: "**Branchement conditionnel (instruction if)**\n\nExécutez différentes branches selon des conditions :\n\n```\nif (condition) {\n    // Exécuté quand la condition est vraie\n} else if (anotherCondition) {\n    // Exécuté quand une autre condition est vraie\n} else {\n    // Exécuté quand aucune des conditions ci-dessus n'est vraie\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:14:en"
  };

  window.CONTENT_I18N["java:15"] = window.CONTENT_I18N["java:15"] || {};
  window.CONTENT_I18N["java:15"].fr = {
    title: "Opérateurs relationnels et logiques",
    concept: "**Opérateurs relationnels et logiques**\n\n| Opérateur | Signification | Exemple |\n|-----------|---------------|---------|\n| `==` | Égal à | `a == b` |\n| `!=` | Différent de | `a != b` |\n| `>`, `<` | Supérieur à, Inférieur à | `a > b` |\n| `&&` | ET | `a > 0 && b > 0` |\n| `||` | OU | `a > 0 || b > 0` |\n| `!` | NON | `!isStudent` |",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:15:en"
  };

  window.CONTENT_I18N["java:16"] = window.CONTENT_I18N["java:16"] || {};
  window.CONTENT_I18N["java:16"].fr = {
    title: "Instruction switch",
    concept: "**Instruction switch**\n\nExécutez différentes branches selon la valeur d'une seule variable :\n\n```\nswitch (variable) {\n    case value1: process1; break;\n    case value2: process2; break;\n    default: otherProcess;\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:16:en"
  };

  window.CONTENT_I18N["java:17"] = window.CONTENT_I18N["java:17"] || {};
  window.CONTENT_I18N["java:17"].fr = {
    title: "Répétition (boucle for)",
    concept: "**Répétition (boucle for)**\n\n```\nfor (initialization; condition; update) {\n    // Traitement répété\n}\n// Exemple : afficher 1 à 5\nfor (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:17:en"
  };

  window.CONTENT_I18N["java:18"] = window.CONTENT_I18N["java:18"] || {};
  window.CONTENT_I18N["java:18"].fr = {
    title: "Répétition (boucles while et do-while)",
    concept: "**Répétition (boucles while et do-while)**\n\n```\nwhile (condition) { process; }  // Se répète tant que la condition est vraie\ndo { process; } while (condition);  // S'exécute toujours au moins une fois\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:18:en"
  };

  window.CONTENT_I18N["java:19"] = window.CONTENT_I18N["java:19"] || {};
  window.CONTENT_I18N["java:19"].fr = {
    title: "break et continue",
    concept: "**break et continue**\n\n- `break` — Quitte la boucle immédiatement\n- `continue` — Saute l'itération actuelle et passe à la suivante",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:19:en"
  };

  window.CONTENT_I18N["java:20"] = window.CONTENT_I18N["java:20"] || {};
  window.CONTENT_I18N["java:20"].fr = {
    title: "Tableaux",
    concept: "**Tableaux**\n\nGérez plusieurs valeurs du même type ensemble :\n\n```\nint[] scores = {85, 90, 78, 95, 82};  // Tableau de 5 éléments\nSystem.out.println(scores[0]);  // Premier élément (l'index commence à 0)\nSystem.out.println(scores.length);  // Longueur du tableau = 5\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:20:en"
  };

  window.CONTENT_I18N["java:21"] = window.CONTENT_I18N["java:21"] || {};
  window.CONTENT_I18N["java:21"].fr = {
    title: "Exercice : Tâches du chapitre 3",
    concept: "**【Consigne de l'exercice】**\n\nUtilisez une boucle `for` pour créer une boucle qui affiche les entiers de 1 à 10. Cependant, sautez l'affichage quand le nombre est un multiple de 3 (en utilisant `continue`), et terminez la boucle en atteignant 8 (en utilisant `break`).\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:21:en"
  };

  window.CONTENT_I18N["java:22"] = window.CONTENT_I18N["java:22"] || {};
  window.CONTENT_I18N["java:22"].fr = {
    title: "Qu'est-ce qu'une méthode ?",
    concept: "**Qu'est-ce qu'une méthode**\n\nUne méthode est un bloc nommé de traitement qui peut être appelé un nombre illimité de fois. Cela évite d'écrire le même code à plusieurs reprises et garde le programme organisé.\n\n```\nstatic returnType methodName(parameterType parameterName) {\n    process;\n    return returnValue;\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:22:en"
  };

  window.CONTENT_I18N["java:23"] = window.CONTENT_I18N["java:23"] || {};
  window.CONTENT_I18N["java:23"].fr = {
    title: "Paramètres",
    concept: "**Paramètres**\n\nValeurs passées à une méthode. Vous les spécifiez lors de l'appel de la méthode :\n\n```\nstatic void greet(String name) {\n    System.out.println(\"Hello, \" + name + \"-san\");\n}\n// Appel :\ngreet(\"Taro\");  // Hello, Taro-san\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:23:en"
  };

  window.CONTENT_I18N["java:24"] = window.CONTENT_I18N["java:24"] || {};
  window.CONTENT_I18N["java:24"].fr = {
    title: "Valeurs de retour",
    concept: "**Valeurs de retour**\n\nLa valeur qu'une méthode renvoie comme résultat de son traitement. Utilisez `return` pour la renvoyer. Quand il n'y a pas de valeur de retour, utilisez `void` :\n\n```\nstatic int add(int a, int b) {\n    return a + b;\n}\nint result = add(3, 4);  // result = 7\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:24:en"
  };

  window.CONTENT_I18N["java:25"] = window.CONTENT_I18N["java:25"] || {};
  window.CONTENT_I18N["java:25"].fr = {
    title: "Surcharge de méthodes",
    concept: "**Surcharge de méthodes**\n\nVous pouvez définir plusieurs méthodes avec le même nom mais des types ou nombres de paramètres différents. Cela s'appelle la **surcharge**.\n\n```\nstatic int add(int a, int b) { return a + b; }\nstatic double add(double a, double b) { return a + b; }\nstatic int add(int a, int b, int c) { return a + b + c; }\n```\n\nLors de l'appel, la méthode correspondante est automatiquement sélectionnée en fonction des arguments.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:25:en"
  };

  window.CONTENT_I18N["java:26"] = window.CONTENT_I18N["java:26"] || {};
  window.CONTENT_I18N["java:26"].fr = {
    title: "Portée des variables",
    concept: "**Portée des variables**\n\nLa plage (portée) dans laquelle une variable peut être utilisée est limitée au bloc `{}` qui la contient. Les variables déclarées à l'intérieur d'une méthode ne peuvent pas être accédées en dehors de cette méthode (ce sont des **variables locales**).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:26:en"
  };

  window.CONTENT_I18N["java:27"] = window.CONTENT_I18N["java:27"] || {};
  window.CONTENT_I18N["java:27"].fr = {
    title: "Exercice : Tâches du chapitre 4",
    concept: "**【Consigne de l'exercice】**\n\nDéfinissez une méthode `public static int getMax(int a, int b)` qui accepte deux entiers et retourne le plus grand. Appelez-la depuis la méthode `main` et affichez le résultat.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:27:en"
  };

  window.CONTENT_I18N["java:28"] = window.CONTENT_I18N["java:28"] || {};
  window.CONTENT_I18N["java:28"].fr = {
    title: "Qu'est-ce que la programmation orientée objet ?",
    concept: "**Qu'est-ce que la programmation orientée objet**\n\nLa programmation orientée objet (POO) est une façon de modéliser des \"choses\" du monde réel (objets) dans un programme. Par exemple, un objet \"Étudiant\" a des **attributs (champs)** comme le nom et le numéro d'étudiant, et des **opérations (méthodes)** comme étudier et passer des examens.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:28:en"
  };

  window.CONTENT_I18N["java:29"] = window.CONTENT_I18N["java:29"] || {};
  window.CONTENT_I18N["java:29"].fr = {
    title: "Classes et instances",
    concept: "**Classes et instances**\n\n- **Classe** — Le plan ou modèle pour un objet (comme un type)\n- **Instance** — L'objet réel créé à partir du plan\n\n```\n// Définition de la classe (plan)\nclass Student {\n    String name;    // Champ (attribut)\n    int studentId;\n}\n\n// Création d'une instance\nStudent s = new Student();\ns.name = \"Tanaka\";\ns.studentId = 1001;\nSystem.out.println(s.name);\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:29:en"
  };

  window.CONTENT_I18N["java:30"] = window.CONTENT_I18N["java:30"] || {};
  window.CONTENT_I18N["java:30"].fr = {
    title: "Types référence",
    concept: "**Types référence**\n\nUne variable de type classe contient l'\"adresse\" (référence) en mémoire où les données réelles (l'objet) sont stockées.\n\nQuand vous écrivez `Student s2 = s;`, `s2` pointe vers le **même** objet que `s` (ce n'est pas une copie !).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:30:en"
  };

  window.CONTENT_I18N["java:31"] = window.CONTENT_I18N["java:31"] || {};
  window.CONTENT_I18N["java:31"].fr = {
    title: "null",
    concept: "**null**\n\n`null` est une valeur spéciale qui signifie \"ne fait référence à rien.\" Accéder à un champ ou une méthode sur un objet null provoque une **NullPointerException**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:31:en"
  };

  window.CONTENT_I18N["java:32"] = window.CONTENT_I18N["java:32"] || {};
  window.CONTENT_I18N["java:32"].fr = {
    title: "Tableaux de références",
    concept: "**Tableaux de références**\n\nVous pouvez aussi créer des tableaux de types classe :\n\n```\nStudent[] students = new Student[3];\nstudents[0] = new Student();\nstudents[0].name = \"Sato\";\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:32:en"
  };

  window.CONTENT_I18N["java:33"] = window.CONTENT_I18N["java:33"] || {};
  window.CONTENT_I18N["java:33"].fr = {
    title: "Exercice : Tâches du chapitre 5",
    concept: "**【Consigne de l'exercice】**\n\nCréez une classe représentant un \"Étudiant\", avec les variables d'instance `String name` et `int age`. Écrivez une séquence de code qui leur attribue des valeurs et affiche le résultat à l'écran.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:33:en"
  };

  window.CONTENT_I18N["java:34"] = window.CONTENT_I18N["java:34"] || {};
  window.CONTENT_I18N["java:34"].fr = {
    title: "Constructeurs",
    concept: "**Constructeurs**\n\nUn constructeur est une méthode spéciale automatiquement appelée quand une instance est créée avec `new`. Il sert à initialiser les champs.\n\n- A le même nom que la classe\n- N'a pas de type de retour\n\n```\nclass Point {\n    int x, y;\n    Point(int x, int y) {  // Constructeur\n        this.x = x;\n        this.y = y;\n    }\n}\nPoint p = new Point(3, 5);  // Le constructeur est appelé\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:34:en"
  };

  window.CONTENT_I18N["java:35"] = window.CONTENT_I18N["java:35"] || {};
  window.CONTENT_I18N["java:35"].fr = {
    title: "Le mot-clé this",
    concept: "**Le mot-clé this**\n\n`this` fait référence à \"l'instance actuelle elle-même.\" Quand un nom de paramètre et un nom de champ sont identiques, vous pouvez utiliser `this.fieldName` pour spécifier le champ.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:35:en"
  };

  window.CONTENT_I18N["java:36"] = window.CONTENT_I18N["java:36"] || {};
  window.CONTENT_I18N["java:36"].fr = {
    title: "Variables de classe (champs static)",
    concept: "**Variables de classe (champs static)**\n\nVariables partagées entre toutes les instances d'une classe. Déclarez-les avec le mot-clé `static` :\n\n```\nclass Counter {\n    static int count = 0;  // Variable de classe (partagée entre toutes les instances)\n    int id;\n    Counter() {\n        count++;\n        id = count;\n    }\n}\n// Accessible via Counter.count\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:36:en"
  };

  window.CONTENT_I18N["java:37"] = window.CONTENT_I18N["java:37"] || {};
  window.CONTENT_I18N["java:37"].fr = {
    title: "Méthodes de classe (méthodes static)",
    concept: "**Méthodes de classe (méthodes static)**\n\nMéthodes qui peuvent être appelées sans créer d'instance. Les exemples incluent `Math.sqrt()` et `System.out.println()` :\n\n```\nclass MathHelper {\n    static double circle(double r) {\n        return Math.PI * r * r;  // Aire d'un cercle\n    }\n}\ndouble area = MathHelper.circle(5.0);\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:37:en"
  };

  window.CONTENT_I18N["java:38"] = window.CONTENT_I18N["java:38"] || {};
  window.CONTENT_I18N["java:38"].fr = {
    title: "Exercice : Tâches du chapitre 6",
    concept: "**【Consigne de l'exercice】**\n\nDéfinissez un constructeur `Student(String name, int age)` dans la classe `Student` pour que les objets puissent être créés avec des valeurs initiales en une seule étape en utilisant `new`. Écrivez un programme qui crée et affiche un tel objet.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:38:en"
  };

  window.CONTENT_I18N["java:39"] = window.CONTENT_I18N["java:39"] || {};
  window.CONTENT_I18N["java:39"].fr = {
    title: "Qu'est-ce que l'héritage ?",
    concept: "**Qu'est-ce que l'héritage**\n\nL'héritage permet de créer une nouvelle classe (**sous-classe**/**classe fille**) qui hérite des fonctionnalités d'une classe existante (**superclasse**/**classe mère**). Cela facilite la réutilisation du code.\n\n```\nclass Animal {\n    String name;\n    void eat() { System.out.println(name + \" is eating\"); }\n}\n\nclass Dog extends Animal {  // Hérite de Animal\n    void bark() { System.out.println(name + \" is barking\"); }\n}\n// Dog peut utiliser eat() et bark()\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:39:en"
  };

  window.CONTENT_I18N["java:40"] = window.CONTENT_I18N["java:40"] || {};
  window.CONTENT_I18N["java:40"].fr = {
    title: "Redéfinition de méthodes",
    concept: "**Redéfinition de méthodes (Override)**\n\nRedéfinir (réécrire) une méthode de la superclasse dans une sous-classe :\n\n```\nclass Animal {\n    void speak() { System.out.println(\"...\"); }\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println(\"Woof!\"); }  // Redéfinition\n}\nclass Cat extends Animal {\n    @Override\n    void speak() { System.out.println(\"Meow!\"); }\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:40:en"
  };

  window.CONTENT_I18N["java:41"] = window.CONTENT_I18N["java:41"] || {};
  window.CONTENT_I18N["java:41"].fr = {
    title: "Polymorphisme",
    concept: "**Polymorphisme**\n\nUne variable de type superclasse peut contenir une instance de sous-classe. La méthode appelée dépend du type réel de l'instance à l'exécution :\n\n```\nAnimal a1 = new Dog();\nAnimal a2 = new Cat();\na1.speak();  // Woof!\na2.speak();  // Meow!\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:41:en"
  };

  window.CONTENT_I18N["java:42"] = window.CONTENT_I18N["java:42"] || {};
  window.CONTENT_I18N["java:42"].fr = {
    title: "Le mot-clé super",
    concept: "**Le mot-clé super**\n\nUtilisé pour appeler le constructeur ou les méthodes de la superclasse :\n\n```\nclass Dog extends Animal {\n    Dog(String name) {\n        super(name);  // Appel du constructeur de la classe parente\n    }\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:42:en"
  };

  window.CONTENT_I18N["java:43"] = window.CONTENT_I18N["java:43"] || {};
  window.CONTENT_I18N["java:43"].fr = {
    title: "La classe Object",
    concept: "**La classe Object**\n\nToute classe en Java hérite implicitement de la classe `Object`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:43:en"
  };

  window.CONTENT_I18N["java:44"] = window.CONTENT_I18N["java:44"] || {};
  window.CONTENT_I18N["java:44"].fr = {
    title: "Exercice : Tâches du chapitre 7",
    concept: "**【Consigne de l'exercice】**\n\nDéfinissez une superclasse `Animal` et une sous-classe `Dog` qui en hérite. Implémentez une méthode `run()` dans `Animal` et une méthode `bark()` dans `Dog`. Créez une instance de `Dog` et appelez les deux méthodes.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:44:en"
  };

  window.CONTENT_I18N["java:45"] = window.CONTENT_I18N["java:45"] || {};
  window.CONTENT_I18N["java:45"].fr = {
    title: "Modificateurs d'accès",
    concept: "**Modificateurs d'accès**\n\n| Modificateur | Portée d'accès |\n|--------------|----------------|\n| `public` | Accessible depuis n'importe où |\n| `private` | Uniquement dans la même classe |\n| `protected` | Même paquetage + sous-classes |\n| (aucun) | Dans le même paquetage |\n\n**Encapsulation** : Un modèle de conception où les champs sont rendus `private` pour empêcher l'accès externe direct, et sont accessibles via des méthodes **getter/setter**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:45:en"
  };

  window.CONTENT_I18N["java:46"] = window.CONTENT_I18N["java:46"] || {};
  window.CONTENT_I18N["java:46"].fr = {
    title: "Le modificateur final",
    concept: "**Le modificateur final**\n\n- Variable `final` — La valeur ne peut pas être modifiée (constante)\n- Méthode `final` — Ne peut pas être redéfinie\n- Classe `final` — Ne peut pas être héritée (ex. la classe String)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:46:en"
  };

  window.CONTENT_I18N["java:47"] = window.CONTENT_I18N["java:47"] || {};
  window.CONTENT_I18N["java:47"].fr = {
    title: "Classes abstraites (abstract class)",
    concept: "**Classes abstraites (abstract class)**\n\nUne classe qui ne peut pas être instanciée directement. Elle peut avoir des **méthodes abstraites** (déclaration seulement, pas d'implémentation) que les sous-classes doivent implémenter :\n\n```\nabstract class Animal {\n    abstract void speak();  // L'implémentation est laissée aux sous-classes\n    void breathe() { System.out.println(\"Breathing...\"); }\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println(\"Woof!\"); }\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:47:en"
  };

  window.CONTENT_I18N["java:48"] = window.CONTENT_I18N["java:48"] || {};
  window.CONTENT_I18N["java:48"].fr = {
    title: "Interfaces (interface)",
    concept: "**Interfaces (interface)**\n\nUne interface est un \"contrat\" qui déclare uniquement les signatures des méthodes. Une classe peut implémenter plusieurs interfaces avec `implements` (une alternative à l'héritage multiple) :\n\n```\ninterface Flyable {\n    void fly();  // Pas d'implémentation\n}\ninterface Swimmable {\n    void swim();\n}\nclass Duck extends Animal implements Flyable, Swimmable {\n    public void fly() { System.out.println(\"Flying\"); }\n    public void swim() { System.out.println(\"Swimming\"); }\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:48:en"
  };

  window.CONTENT_I18N["java:49"] = window.CONTENT_I18N["java:49"] || {};
  window.CONTENT_I18N["java:49"].fr = {
    title: "Exercice : Tâches du chapitre 8",
    concept: "**【Consigne de l'exercice】**\n\nDéfinissez une classe abstraite `Shape` avec une méthode abstraite `void draw()`. Créez ensuite une classe `Circle` qui étend `Shape` et redéfinit `draw()` pour afficher \"Drawing a circle.\"\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:49:en"
  };

  window.CONTENT_I18N["java:50"] = window.CONTENT_I18N["java:50"] || {};
  window.CONTENT_I18N["java:50"].fr = {
    title: "Qu'est-ce qu'un paquetage ?",
    concept: "**Qu'est-ce qu'un paquetage**\n\nUn mécanisme pour regrouper des classes connexes. Considérez-le comme un dossier.\n\nExemple : `java.util.ArrayList` est la classe `ArrayList` située dans le sous-paquetage `util` du paquetage `java`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:50:en"
  };

  window.CONTENT_I18N["java:51"] = window.CONTENT_I18N["java:51"] || {};
  window.CONTENT_I18N["java:51"].fr = {
    title: "La déclaration import",
    concept: "**La déclaration import**\n\nPour utiliser des classes d'autres paquetages, importez-les avec `import`. Le paquetage `java.lang` est importé automatiquement.\n\n```\nimport java.util.ArrayList;     // Classe spécifique\nimport java.util.*;              // Toutes les classes du paquetage\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:51:en"
  };

  window.CONTENT_I18N["java:52"] = window.CONTENT_I18N["java:52"] || {};
  window.CONTENT_I18N["java:52"].fr = {
    title: "Principales méthodes de la classe String",
    concept: "**Principales méthodes de la classe String**\n\n| Méthode | Description | Exemple |\n|---------|-------------|---------|\n| `length()` | Nombre de caractères | `\"Hello\".length()` → 5 |\n| `charAt(i)` | Caractère à l'index i | `\"Hello\".charAt(1)` → 'e' |\n| `substring(s,e)` | Sous-chaîne | `\"Hello\".substring(1,3)` → \"el\" |\n| `indexOf(s)` | Position d'une chaîne | `\"Hello\".indexOf(\"l\")` → 2 |\n| `equals(s)` | Comparaison de chaînes | `\"abc\".equals(\"abc\")` → true |\n| `toUpperCase()` | Conversion en majuscules | `\"hello\".toUpperCase()` → \"HELLO\" |\n| `split(s)` | Découpage par délimiteur | `\"a,b,c\".split(\",\")` → {\"a\",\"b\",\"c\"} |",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:52:en"
  };

  window.CONTENT_I18N["java:53"] = window.CONTENT_I18N["java:53"] || {};
  window.CONTENT_I18N["java:53"].fr = {
    title: "Principales méthodes de la classe Math",
    concept: "**Principales méthodes de la classe Math**\n\n```\nMath.abs(-5)      // Valeur absolue = 5\nMath.sqrt(16.0)   // Racine carrée = 4.0\nMath.pow(2, 10)   // Puissance = 1024.0\nMath.max(3, 7)    // Maximum = 7\nMath.random()     // Nombre aléatoire entre 0.0 et 1.0\nMath.PI           // Pi ≈ 3.14159...\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:53:en"
  };

  window.CONTENT_I18N["java:54"] = window.CONTENT_I18N["java:54"] || {};
  window.CONTENT_I18N["java:54"].fr = {
    title: "Exercice : Tâches du chapitre 1 (Partie 2)",
    concept: "**【Consigne de l'exercice】**\n\nEn utilisant les principales méthodes de la classe String, écrivez un programme qui prend une chaîne de caractères quelconque depuis le clavier et affiche son \"nombre de caractères\" et les \"3 premiers caractères.\"\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:54:en"
  };

  window.CONTENT_I18N["java:55"] = window.CONTENT_I18N["java:55"] || {};
  window.CONTENT_I18N["java:55"].fr = {
    title: "Que sont les exceptions ?",
    concept: "**Que sont les exceptions**\n\nErreurs qui se produisent pendant l'exécution du programme. Exemples : division par zéro, accès à un index de tableau qui n'existe pas, et appel de méthodes sur un objet null.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:55:en"
  };

  window.CONTENT_I18N["java:56"] = window.CONTENT_I18N["java:56"] || {};
  window.CONTENT_I18N["java:56"].fr = {
    title: "Instruction try-catch",
    concept: "**Instruction try-catch**\n\nQuand une exception se produit, vous pouvez l'\"attraper\" pour empêcher le programme de planter :\n\n```\ntry {\n    // Code qui pourrait lever une exception\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    // Gérer l'exception\n    System.out.println(\"Error: \" + e.getMessage());\n} finally {\n    // Toujours exécuté, avec ou sans exception\n    System.out.println(\"Processing complete\");\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:56:en"
  };

  window.CONTENT_I18N["java:57"] = window.CONTENT_I18N["java:57"] || {};
  window.CONTENT_I18N["java:57"].fr = {
    title: "Principales classes d'exceptions",
    concept: "**Principales classes d'exceptions**\n\n| Classe d'exception | Quand elle se produit |\n|--------------------|-----------------------|\n| `ArithmeticException` | Division par zéro, etc. |\n| `NullPointerException` | Opération sur un objet null |\n| `ArrayIndexOutOfBoundsException` | Accès à un index de tableau hors limites |\n| `NumberFormatException` | Échec de conversion numérique |\n| `IOException` | Erreur d'entrée/sortie |",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:57:en"
  };

  window.CONTENT_I18N["java:58"] = window.CONTENT_I18N["java:58"] || {};
  window.CONTENT_I18N["java:58"].fr = {
    title: "Lever des exceptions (throw)",
    concept: "**Lever des exceptions (throw)**\n\n```\nthrow new IllegalArgumentException(\"Negative values not allowed: \" + value);\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:58:en"
  };

  window.CONTENT_I18N["java:59"] = window.CONTENT_I18N["java:59"] || {};
  window.CONTENT_I18N["java:59"].fr = {
    title: "Déclaration d'exceptions (throws)",
    concept: "**Déclaration d'exceptions (throws)**\n\nUtilisez `throws` quand une méthode n'attrape pas elle-même une exception mais la laisse à l'appelant :\n\n```\nvoid readFile(String path) throws IOException {\n    // Code qui peut lever une IOException\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:59:en"
  };

  window.CONTENT_I18N["java:60"] = window.CONTENT_I18N["java:60"] || {};
  window.CONTENT_I18N["java:60"].fr = {
    title: "Exercice : Tâches du chapitre 2 (Partie 2)",
    concept: "**【Consigne de l'exercice】**\n\nÉcrivez un programme qui intercepte correctement une `ArithmeticException` lorsqu'une division par zéro se produit et affiche `'[Error] Cannot divide by zero.'` sur la console, puis se termine normalement.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:60:en"
  };

  window.CONTENT_I18N["java:61"] = window.CONTENT_I18N["java:61"] || {};
  window.CONTENT_I18N["java:61"].fr = {
    title: "Qu'est-ce qu'un thread ?",
    concept: "**Qu'est-ce qu'un thread**\n\nUn thread est un flux d'exécution d'un programme. Les programmes normaux s'exécutent sur un seul thread (le thread principal), mais le **multithreading** permet à plusieurs processus de s'exécuter simultanément.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:61:en"
  };

  window.CONTENT_I18N["java:62"] = window.CONTENT_I18N["java:62"] || {};
  window.CONTENT_I18N["java:62"].fr = {
    title: "Création de threads Méthode 1 : Étendre Thread",
    concept: "**Création de threads Méthode 1 : Étendre Thread**\n\n```\nclass MyThread extends Thread {\n    @Override\n    public void run() {\n        for (int i = 0; i < 5; i++) {\n            System.out.println(getName() + \": \" + i);\n        }\n    }\n}\nMyThread t = new MyThread();\nt.start();  // Exécute run() dans un thread séparé\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:62:en"
  };

  window.CONTENT_I18N["java:63"] = window.CONTENT_I18N["java:63"] || {};
  window.CONTENT_I18N["java:63"].fr = {
    title: "Création de threads Méthode 2 : Implémenter Runnable",
    concept: "**Création de threads Méthode 2 : Implémenter Runnable**\n\n```\nclass MyTask implements Runnable {\n    @Override\n    public void run() { /* traitement */ }\n}\nThread t = new Thread(new MyTask());\nt.start();\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:63:en"
  };

  window.CONTENT_I18N["java:64"] = window.CONTENT_I18N["java:64"] || {};
  window.CONTENT_I18N["java:64"].fr = {
    title: "Méthodes de Thread couramment utilisées",
    concept: "**Méthodes de Thread couramment utilisées**\n\n- `Thread.sleep(ms)` — Met le thread en pause pendant les millisecondes spécifiées\n- `join()` — Attend la fin d'un thread\n- `getName()` — Obtient le nom du thread",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:64:en"
  };

  window.CONTENT_I18N["java:65"] = window.CONTENT_I18N["java:65"] || {};
  window.CONTENT_I18N["java:65"].fr = {
    title: "Synchronisation (synchronized)",
    concept: "**Synchronisation (synchronized)**\n\nLorsque plusieurs threads accèdent aux mêmes données simultanément, des incohérences peuvent se produire. Utilisez le mot-clé `synchronized` pour le contrôle exclusif :\n\n```\nsynchronized void increment() {\n    count++;  // Un seul thread peut exécuter cette méthode à la fois\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:65:en"
  };

  window.CONTENT_I18N["java:66"] = window.CONTENT_I18N["java:66"] || {};
  window.CONTENT_I18N["java:66"].fr = {
    title: "Exercice : Tâches du chapitre 3 (Partie 2)",
    concept: "**【Consigne de l'exercice】**\n\nCréez un thread séparé qui implémente l'interface `Runnable`. Faites-lui afficher \"Thread has started!\" trois fois à intervalles d'une seconde, en parallèle avec le thread principal.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:66:en"
  };

  window.CONTENT_I18N["java:67"] = window.CONTENT_I18N["java:67"] || {};
  window.CONTENT_I18N["java:67"].fr = {
    title: "Types de mémoire",
    concept: "**Types de mémoire**\n\n- **Stack (pile)** — Stocke les variables locales et les informations d'appel de méthode. Rapide mais de faible capacité. Utilise LIFO (Last In, First Out).\n- **Heap (tas)** — Stocke les objets créés avec `new`. Grande capacité mais plus lent que la pile.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:67:en"
  };

  window.CONTENT_I18N["java:68"] = window.CONTENT_I18N["java:68"] || {};
  window.CONTENT_I18N["java:68"].fr = {
    title: "Garbage Collection (GC)",
    concept: "**Garbage Collection (GC)**\n\nUn mécanisme automatique qui libère la mémoire utilisée par les objets qui ne sont plus nécessaires (non référencés depuis nulle part). En Java, les programmeurs n'ont pas besoin de libérer manuellement la mémoire (contrairement au C ou C++).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:68:en"
  };

  window.CONTENT_I18N["java:69"] = window.CONTENT_I18N["java:69"] || {};
  window.CONTENT_I18N["java:69"].fr = {
    title: "Quand le GC s'exécute-t-il ?",
    concept: "**Quand le GC s'exécute-t-il**\n\n- Quand la mémoire du tas devient insuffisante\n- Quand la JVM le juge approprié (les programmeurs ne peuvent pas le contrôler directement)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:69:en"
  };

  window.CONTENT_I18N["java:70"] = window.CONTENT_I18N["java:70"] || {};
  window.CONTENT_I18N["java:70"].fr = {
    title: "Quand les objets deviennent des cibles du GC",
    concept: "**Quand les objets deviennent des cibles du GC**\n\n```\nPoint p = new Point(1, 2);\np = new Point(3, 4);  // Le premier Point(1,2) devient une cible du GC\n// Ou :\np = null;  // Couper la référence en fait une cible du GC\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:70:en"
  };

  window.CONTENT_I18N["java:71"] = window.CONTENT_I18N["java:71"] || {};
  window.CONTENT_I18N["java:71"].fr = {
    title: "Considérations sur la mémoire",
    concept: "**Considérations sur la mémoire**\n\n- **OutOfMemoryError** — Se produit quand le tas est insuffisant\n- **StackOverflowError** — Se produit quand les appels récursifs sont trop profonds",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:71:en"
  };

  window.CONTENT_I18N["java:72"] = window.CONTENT_I18N["java:72"] || {};
  window.CONTENT_I18N["java:72"].fr = {
    title: "Exercice : Tâches du chapitre 4 (Partie 2)",
    concept: "**【Consigne de l'exercice】**\n\nAprès avoir généré un grand nombre d'instances inutilisées, exécutez `Runtime.getRuntime().gc()` et créez un programme de test qui surveille et affiche le changement de mémoire libre avant et après le garbage collection.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:72:en"
  };

  window.CONTENT_I18N["java:73"] = window.CONTENT_I18N["java:73"] || {};
  window.CONTENT_I18N["java:73"].fr = {
    title: "Que sont les collections ?",
    concept: "**Que sont les collections**\n\nClasses de collection qui gèrent plusieurs objets ensemble. Contrairement aux tableaux, leur taille change dynamiquement.\n\nPrincipales interfaces de collection :\n- **List** — Ordonnée, autorise les doublons\n- **Set** — Aucun doublon autorisé\n- **Map** — Paires clé-valeur",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:73:en"
  };

  window.CONTENT_I18N["java:74"] = window.CONTENT_I18N["java:74"] || {};
  window.CONTENT_I18N["java:74"].fr = {
    title: "ArrayList",
    concept: "**ArrayList**\n\n```\nimport java.util.ArrayList;\nArrayList<String> list = new ArrayList<>();\nlist.add(\"apple\");       // Ajouter\nlist.add(\"banana\");\nlist.get(0);             // \"apple\" (accès par index)\nlist.size();             // 2\nlist.remove(0);          // Supprimer l'index 0\nlist.contains(\"banana\"); // true\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:74:en"
  };

  window.CONTENT_I18N["java:75"] = window.CONTENT_I18N["java:75"] || {};
  window.CONTENT_I18N["java:75"].fr = {
    title: "HashMap",
    concept: "**HashMap**\n\n```\nimport java.util.HashMap;\nHashMap<String, Integer> map = new HashMap<>();\nmap.put(\"Tanaka\", 90);\nmap.put(\"Sato\", 85);\nmap.get(\"Tanaka\");        // 90\nmap.containsKey(\"Sato\");  // true\nmap.keySet();             // Ensemble des clés\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:75:en"
  };

  window.CONTENT_I18N["java:76"] = window.CONTENT_I18N["java:76"] || {};
  window.CONTENT_I18N["java:76"].fr = {
    title: "HashSet",
    concept: "**HashSet**\n\n```\nimport java.util.HashSet;\nHashSet<String> set = new HashSet<>();\nset.add(\"apple\");\nset.add(\"apple\");  // Les doublons sont ignorés\nset.size();        // 1\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:76:en"
  };

  window.CONTENT_I18N["java:77"] = window.CONTENT_I18N["java:77"] || {};
  window.CONTENT_I18N["java:77"].fr = {
    title: "Boucle for améliorée (for-each)",
    concept: "**Boucle for améliorée (for-each)**\n\n```\nfor (String item : list) {\n    System.out.println(item);\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:77:en"
  };

  window.CONTENT_I18N["java:78"] = window.CONTENT_I18N["java:78"] || {};
  window.CONTENT_I18N["java:78"].fr = {
    title: "Génériques (Generics)",
    concept: "**Génériques (Generics)**\n\nEn spécifiant un paramètre de type comme `<String>`, vous restreignez le type d'objets pouvant être stockés dans une collection. Cela assure la sécurité des types et élimine le besoin de transtypage.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:78:en"
  };

  window.CONTENT_I18N["java:79"] = window.CONTENT_I18N["java:79"] || {};
  window.CONTENT_I18N["java:79"].fr = {
    title: "Exercice : Tâches du chapitre 5 (Partie 2)",
    concept: "**【Consigne de l'exercice】**\n\nEn utilisant `HashMap`, créez un carnet de notes où la clé est \"nom d'étudiant (String)\" et la valeur est \"note (Integer).\" Ajoutez les données pour 3 étudiants, puis recherchez et affichez la note d'un étudiant spécifique.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:79:en"
  };

  window.CONTENT_I18N["java:80"] = window.CONTENT_I18N["java:80"] || {};
  window.CONTENT_I18N["java:80"].fr = {
    title: "Qu'est-ce qu'une classe anonyme ?",
    concept: "**Qu'est-ce qu'une classe anonyme**\n\nVous pouvez définir et utiliser une classe sans nom sur place. Cela est souvent utilisé pour implémenter des interfaces.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:80:en"
  };

  window.CONTENT_I18N["java:81"] = window.CONTENT_I18N["java:81"] || {};
  window.CONTENT_I18N["java:81"].fr = {
    title: "Interfaces fonctionnelles",
    concept: "**Interfaces fonctionnelles**\n\nUne interface avec exactement une méthode abstraite est appelée une **interface fonctionnelle**. Les expressions lambda fournissent une manière concise de les implémenter.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:81:en"
  };

  window.CONTENT_I18N["java:82"] = window.CONTENT_I18N["java:82"] || {};
  window.CONTENT_I18N["java:82"].fr = {
    title: "Syntaxe des expressions lambda",
    concept: "**Syntaxe des expressions lambda**\n\n```\n// Classe anonyme normale\nRunnable r = new Runnable() {\n    @Override\n    public void run() { System.out.println(\"Hello\"); }\n};\n\n// Expression lambda (concise !)\nRunnable r = () -> System.out.println(\"Hello\");\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:82:en"
  };

  window.CONTENT_I18N["java:83"] = window.CONTENT_I18N["java:83"] || {};
  window.CONTENT_I18N["java:83"].fr = {
    title: "Raccourcis des expressions lambda",
    concept: "**Raccourcis des expressions lambda**\n\n```\n// Un paramètre → les parenthèses peuvent être omises\nx -> x * 2\n\n// Corps sur une seule ligne → {} et return peuvent être omis\n(a, b) -> a + b\n\n// Forme complète\n(int a, int b) -> { return a + b; }\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:83:en"
  };

  window.CONTENT_I18N["java:84"] = window.CONTENT_I18N["java:84"] || {};
  window.CONTENT_I18N["java:84"].fr = {
    title: "forEach avec lambda",
    concept: "**forEach avec lambda**\n\n```\nList<String> list = Arrays.asList(\"A\", \"B\", \"C\");\nlist.forEach(s -> System.out.println(s));\n// Ou :\nlist.forEach(System.out::println);  // Référence de méthode\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:84:en"
  };

  window.CONTENT_I18N["java:85"] = window.CONTENT_I18N["java:85"] || {};
  window.CONTENT_I18N["java:85"].fr = {
    title: "Tri avec les expressions lambda",
    concept: "**Tri avec les expressions lambda**\n\n```\nlist.sort((a, b) -> a.compareTo(b));  // Croissant\nlist.sort((a, b) -> b.compareTo(a));  // Décroissant\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:85:en"
  };

  window.CONTENT_I18N["java:86"] = window.CONTENT_I18N["java:86"] || {};
  window.CONTENT_I18N["java:86"].fr = {
    title: "Exercice : Tâches du chapitre 6 (Partie 2)",
    concept: "**【Consigne de l'exercice】**\n\nEn utilisant les expressions lambda et une liste, doublez chaque élément d'une liste contenant 10, 20, 30 et affichez les résultats en utilisant `forEach` et une expression lambda.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:86:en"
  };

  window.CONTENT_I18N["java:87"] = window.CONTENT_I18N["java:87"] || {};
  window.CONTENT_I18N["java:87"].fr = {
    title: "Entrée/Sortie standard",
    concept: "**Entrée/Sortie standard**\n\n- **Sortie standard** : `System.out.println()` (affichage à l'écran)\n- **Entrée standard** : `Scanner scanner = new Scanner(System.in);` (saisie clavier)\n\n```\nimport java.util.Scanner;\nScanner sc = new Scanner(System.in);\nSystem.out.print(\"Enter name: \");\nString name = sc.nextLine();     // Lire une ligne\nint age = sc.nextInt();          // Lire un entier\nsc.close();\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:87:en"
  };

  window.CONTENT_I18N["java:88"] = window.CONTENT_I18N["java:88"] || {};
  window.CONTENT_I18N["java:88"].fr = {
    title: "Écrire dans des fichiers",
    concept: "**Écrire dans des fichiers**\n\n```\nimport java.io.*;\n// Écriture basique\nFileWriter fw = new FileWriter(\"test.txt\");\nfw.write(\"Hello, File!\");\nfw.close();\n\n// Écriture avec buffer (plus rapide)\nBufferedWriter bw = new BufferedWriter(new FileWriter(\"test.txt\"));\nbw.write(\"Hello\");\nbw.newLine();\nbw.close();\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:88:en"
  };

  window.CONTENT_I18N["java:89"] = window.CONTENT_I18N["java:89"] || {};
  window.CONTENT_I18N["java:89"].fr = {
    title: "Lire depuis des fichiers",
    concept: "**Lire depuis des fichiers**\n\n```\nBufferedReader br = new BufferedReader(new FileReader(\"test.txt\"));\nString line;\nwhile ((line = br.readLine()) != null) {\n    System.out.println(line);\n}\nbr.close();\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:89:en"
  };

  window.CONTENT_I18N["java:90"] = window.CONTENT_I18N["java:90"] || {};
  window.CONTENT_I18N["java:90"].fr = {
    title: "try-with-resources",
    concept: "**try-with-resources**\n\nUne syntaxe qui ferme automatiquement les flux (Java 7 et versions ultérieures) :\n\n```\ntry (BufferedWriter bw = new BufferedWriter(new FileWriter(\"test.txt\"))) {\n    bw.write(\"Auto-close\");\n}  // close() est appelée automatiquement ici\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:90:en"
  };

  window.CONTENT_I18N["java:91"] = window.CONTENT_I18N["java:91"] || {};
  window.CONTENT_I18N["java:91"].fr = {
    title: "Sérialisation",
    concept: "**Sérialisation**\n\nUn mécanisme pour sauvegarder et charger des objets directement depuis/vers des fichiers. La classe doit implémenter `Serializable`.\n\n```\nimport java.io.Serializable;\nclass Employee implements Serializable {\n    String name;\n    int id;\n}\n```\n\nÉcriture :\n\n```\nObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(\"emp.dat\"));\noos.writeObject(emp);\noos.close();\n```\n\nLecture :\n\n```\nObjectInputStream ois = new ObjectInputStream(new FileInputStream(\"emp.dat\"));\nEmployee emp = (Employee) ois.readObject();\nois.close();\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:91:en"
  };

  window.CONTENT_I18N["java:92"] = window.CONTENT_I18N["java:92"] || {};
  window.CONTENT_I18N["java:92"].fr = {
    title: "Exercice : Tâches du chapitre 7 (Partie 2)",
    concept: "**【Consigne de l'exercice】**\n\nEn utilisant `ByteArrayOutputStream`, écrivez la chaîne \"Java Advanced Learning Complete\" en mémoire, puis relisez-la depuis le tableau d'octets et affichez-la sur la console.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:92:en"
  };

  window.CONTENT_I18N["java:93"] = window.CONTENT_I18N["java:93"] || {};
  window.CONTENT_I18N["java:93"].fr = {
    title: "Qu'est-ce qu'une IGU ?",
    concept: "**Qu'est-ce qu'une IGU**\n\nIGU signifie Interface Graphique Utilisateur (GUI en anglais). Cela désigne les applications qui utilisent des composants visuels comme les fenêtres, les boutons et les champs de texte.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:93:en"
  };

  window.CONTENT_I18N["java:94"] = window.CONTENT_I18N["java:94"] || {};
  window.CONTENT_I18N["java:94"].fr = {
    title: "La bibliothèque Swing",
    concept: "**La bibliothèque Swing**\n\nLa bibliothèque standard de Java pour créer des IGU. Elle est incluse dans le paquetage `javax.swing`.\n\nComposants principaux :\n\n| Classe | Description |\n|--------|-------------|\n| `JFrame` | Fenêtre |\n| `JButton` | Bouton |\n| `JLabel` | Étiquette (affichage de texte) |\n| `JTextField` | Saisie de texte sur une ligne |\n| `JPanel` | Panneau pour regrouper des composants |",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:94:en"
  };

  window.CONTENT_I18N["java:95"] = window.CONTENT_I18N["java:95"] || {};
  window.CONTENT_I18N["java:95"].fr = {
    title: "Gestionnaires de disposition",
    concept: "**Gestionnaires de disposition (Layout Managers)**\n\n- **FlowLayout** — Dispose les composants horizontalement (par défaut)\n- **BorderLayout** — Cinq zones : haut, bas, gauche, droite, centre\n- **GridLayout** — Dispose en grille",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:95:en"
  };

  window.CONTENT_I18N["java:96"] = window.CONTENT_I18N["java:96"] || {};
  window.CONTENT_I18N["java:96"].fr = {
    title: "Gestion des événements",
    concept: "**Gestion des événements**\n\nLe mécanisme pour répondre aux événements comme les clics sur les boutons :\n\n```\nJButton btn = new JButton(\"Click\");\nbtn.addActionListener(e -> {\n    System.out.println(\"Button was pressed!\");\n});\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:96:en"
  };

  window.CONTENT_I18N["java:97"] = window.CONTENT_I18N["java:97"] || {};
  window.CONTENT_I18N["java:97"].fr = {
    title: "Remarque",
    concept: "**Remarque**\n\nLes programmes IGU nécessitent une fenêtre Swing et ne peuvent pas être affichés dans cet environnement bac à sable. Veuillez les exécuter dans votre IDE local.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:97:en"
  };

  window.CONTENT_I18N["java:98"] = window.CONTENT_I18N["java:98"] || {};
  window.CONTENT_I18N["java:98"].fr = {
    title: "Exercice : Tâches du chapitre 8",
    concept: "**【Consigne de l'exercice】**\n\nUn résumé des connaissances sur l'IGU en Swing. Créez du code qui génère et configure les composants principaux (`JFrame`, `JButton`) pour construire une IGU Java.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:98:en"
  };

  window.CONTENT_I18N["java:99"] = window.CONTENT_I18N["java:99"] || {};
  window.CONTENT_I18N["java:99"].fr = {
    title: "Mécanisme de dessin de Java",
    concept: "**Mécanisme de dessin de Java**\n\nLe dessin se fait en étendant le `JPanel` de Swing et en redéfinissant la méthode `paintComponent(Graphics g)` :\n\n```\nclass DrawPanel extends JPanel {\n    @Override\n    protected void paintComponent(Graphics g) {\n        super.paintComponent(g);\n        g.setColor(Color.RED);\n        g.fillRect(50, 50, 100, 80);  // Rectangle rempli\n        g.drawOval(200, 50, 80, 80);  // Ellipse (contour seulement)\n        g.drawLine(0, 0, 300, 300);   // Ligne droite\n    }\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:99:en"
  };

  window.CONTENT_I18N["java:100"] = window.CONTENT_I18N["java:100"] || {};
  window.CONTENT_I18N["java:100"].fr = {
    title: "La classe Graphics2D",
    concept: "**La classe Graphics2D**\n\nEn convertissant `Graphics` en `Graphics2D`, vous pouvez utiliser des fonctionnalités de dessin plus avancées :\n\n```\nGraphics2D g2 = (Graphics2D) g;\ng2.setStroke(new BasicStroke(3));  // Épaisseur de trait\ng2.setRenderingHint(RenderingHints.KEY_ANTIALIASING,\n                    RenderingHints.VALUE_ANTIALIAS_ON);  // Anti-crénelage\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:100:en"
  };

  window.CONTENT_I18N["java:101"] = window.CONTENT_I18N["java:101"] || {};
  window.CONTENT_I18N["java:101"].fr = {
    title: "Système de coordonnées",
    concept: "**Système de coordonnées**\n\nLe coin supérieur gauche est (0, 0). L'axe X augmente vers la droite et l'axe Y augmente vers le bas.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:101:en"
  };

  window.CONTENT_I18N["java:102"] = window.CONTENT_I18N["java:102"] || {};
  window.CONTENT_I18N["java:102"].fr = {
    title: "Événements de souris",
    concept: "**Événements de souris**\n\nL'interface `MouseListener` gère 5 types d'événements :\n\n- `mouseClicked` — Clic\n- `mousePressed` — Bouton enfoncé\n- `mouseReleased` — Bouton relâché\n- `mouseEntered` — Souris entrée dans le composant\n- `mouseExited` — Souris sortie du composant",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:102:en"
  };

  window.CONTENT_I18N["java:103"] = window.CONTENT_I18N["java:103"] || {};
  window.CONTENT_I18N["java:103"].fr = {
    title: "Remarque",
    concept: "**Remarque**\n\nLes programmes de dessin nécessitent une fenêtre IGU et ne peuvent pas être exécutés directement dans cet environnement bac à sable. Veuillez utiliser votre IDE local.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:103:en"
  };

  window.CONTENT_I18N["java:104"] = window.CONTENT_I18N["java:104"] || {};
  window.CONTENT_I18N["java:104"].fr = {
    title: "Exercice : Tâches du chapitre 9",
    concept: "**【Consigne de l'exercice】**\n\nEn utilisant la classe `Graphics2D`, implémentez le cadre d'une méthode qui dessine un rectangle commençant à la position (50, 50) avec une largeur de 200 et une hauteur de 100.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:104:en"
  };

  window.CONTENT_I18N["java:105"] = window.CONTENT_I18N["java:105"] || {};
  window.CONTENT_I18N["java:105"].fr = {
    title: "Programmation réseau en Java",
    concept: "**Programmation réseau en Java**\n\nLa communication TCP/IP peut être implémentée en utilisant le paquetage `java.net`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:105:en"
  };

  window.CONTENT_I18N["java:106"] = window.CONTENT_I18N["java:106"] || {};
  window.CONTENT_I18N["java:106"].fr = {
    title: "Concepts de base",
    concept: "**Concepts de base**\n\n- **Adresse IP** — L'adresse d'un ordinateur sur le réseau\n- **Numéro de port** — Un nombre qui identifie une application dans un ordinateur (0 à 65535)\n- **TCP** — Un protocole de communication fiable (garantit la livraison des données)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:106:en"
  };

  window.CONTENT_I18N["java:107"] = window.CONTENT_I18N["java:107"] || {};
  window.CONTENT_I18N["java:107"].fr = {
    title: "Côté serveur",
    concept: "**Côté serveur**\n\n```\nServerSocket serverSocket = new ServerSocket(8080);\nSocket socket = serverSocket.accept();  // Attendre la connexion client\n\n// Réception de données\nBufferedReader in = new BufferedReader(\n    new InputStreamReader(socket.getInputStream()));\nString message = in.readLine();\n\n// Envoi de données\nPrintWriter out = new PrintWriter(socket.getOutputStream(), true);\nout.println(\"Hello!\");\n```\n\nFermez les ressources quand vous avez terminé :\n\n```\nin.close();\nout.close();\nsocket.close();\nserverSocket.close();\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:107:en"
  };

  window.CONTENT_I18N["java:108"] = window.CONTENT_I18N["java:108"] || {};
  window.CONTENT_I18N["java:108"].fr = {
    title: "Côté client",
    concept: "**Côté client**\n\n```\nSocket socket = new Socket(\"localhost\", 8080);  // Connexion au serveur\n\nPrintWriter out = new PrintWriter(socket.getOutputStream(), true);\nout.println(\"Hello Server!\");  // Envoyer\n\nBufferedReader in = new BufferedReader(\n    new InputStreamReader(socket.getInputStream()));\nString response = in.readLine();  // Recevoir\n\nin.close();\nout.close();\nsocket.close();\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:108:en"
  };

  window.CONTENT_I18N["java:109"] = window.CONTENT_I18N["java:109"] || {};
  window.CONTENT_I18N["java:109"].fr = {
    title: "Remarque",
    concept: "**Remarque**\n\nLes programmes réseau nécessitent à la fois un programme serveur et un programme client. Ils ne peuvent pas être exécutés directement dans ce bac à sable, mais vous pouvez examiner la structure du code.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:109:en"
  };

  window.CONTENT_I18N["java:110"] = window.CONTENT_I18N["java:110"] || {};
  window.CONTENT_I18N["java:110"].fr = {
    title: "Exercice : Tâches du chapitre 10",
    concept: "**【Consigne de l'exercice】**\n\nEn utilisant la communication par socket, créez un test de connexion côté client simple qui envoie une demande de connexion à un port spécifique sur localhost.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:110:en"
  };

  window.CONTENT_I18N["java:111"] = window.CONTENT_I18N["java:111"] || {};
  window.CONTENT_I18N["java:111"].fr = {
    title: "Stream API (Java 8+)",
    concept: "**Stream API (Java 8+)**\n\nUn mécanisme puissant pour traiter des éléments de collection de manière fonctionnelle :\n\n```\nimport java.util.stream.*;\n\nList<Integer> numbers = Arrays.asList(1,2,3,4,5,6,7,8,9,10);\n\n// Filtrer les nombres pairs, les doubler, et les additionner\nint result = numbers.stream()\n    .filter(n -> n % 2 == 0)     // Intermédiaire : filtrer\n    .map(n -> n * 2)             // Intermédiaire : transformer\n    .reduce(0, Integer::sum);    // Terminal : agréger\nSystem.out.println(result);  // 60\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:111:en"
  };

  window.CONTENT_I18N["java:112"] = window.CONTENT_I18N["java:112"] || {};
  window.CONTENT_I18N["java:112"].fr = {
    title: "Principales opérations Stream",
    concept: "**Principales opérations Stream**\n\n| Type | Opération | Description |\n|------|-----------|-------------|\n| **Intermédiaire** | `filter(predicate)` | Filtrer selon une condition |\n| **Intermédiaire** | `map(function)` | Transformer les éléments |\n| **Intermédiaire** | `sorted()` | Trier |\n| **Terminal** | `collect()` | Convertir en List, etc. |\n| **Terminal** | `forEach()` | Traiter chaque élément |\n| **Terminal** | `count()` / `sum()` | Agréger |",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:112:en"
  };

  window.CONTENT_I18N["java:113"] = window.CONTENT_I18N["java:113"] || {};
  window.CONTENT_I18N["java:113"].fr = {
    title: "Annotations",
    concept: "**Annotations**\n\nUn mécanisme pour ajouter des métadonnées (informations supplémentaires) au code :\n\n- `@Override` — Indique explicitement la redéfinition d'une méthode\n- `@Deprecated` — Marque une méthode comme dépréciée\n- `@SuppressWarnings` — Supprime les avertissements\n- `@FunctionalInterface` — Indique une interface fonctionnelle",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:113:en"
  };

  window.CONTENT_I18N["java:114"] = window.CONTENT_I18N["java:114"] || {};
  window.CONTENT_I18N["java:114"].fr = {
    title: "enum (Type énuméré)",
    concept: "**enum (Type énuméré)**\n\nUn type utilisé pour représenter un ensemble fixe de choix :\n\n```\nenum Season { SPRING, SUMMER, AUTUMN, WINTER }\nSeason s = Season.SUMMER;\nSystem.out.println(s);  // SUMMER\n```\n\nLes énumérations peuvent aussi avoir des champs et des méthodes :\n\n```\nenum Color {\n    RED(\"#FF0000\"), GREEN(\"#00FF00\"), BLUE(\"#0000FF\");\n    \n    private String hexCode;\n    Color(String hexCode) { this.hexCode = hexCode; }\n    public String getHexCode() { return hexCode; }\n}\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:114:en"
  };

  window.CONTENT_I18N["java:115"] = window.CONTENT_I18N["java:115"] || {};
  window.CONTENT_I18N["java:115"].fr = {
    title: "Exercice : Tâches du chapitre 11",
    concept: "**【Consigne de l'exercice】**\n\nEn utilisant le Stream API, extrayez uniquement les nombres pairs d'une liste d'entiers de 1 à 10, triplez chacun d'eux, et calculez la somme en utilisant une implémentation quasi-monoline.\n\nRegardez le modèle de la classe `Main` dans l'éditeur à droite, puis complétez le programme pour répondre aux exigences. Une fois terminé, cliquez sur le bouton \"Run\" pour vérifier votre résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:115:en"
  };

})();
