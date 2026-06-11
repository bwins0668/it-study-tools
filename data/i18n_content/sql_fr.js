(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["sql:1"] = window.CONTENT_I18N["sql:1"] || {};
  window.CONTENT_I18N["sql:1"].fr = {
    title: "01-Qu'est-ce que SQL et les bases de données ?",
    concept: "Une base de données (DB) est une collection organisée de données.\n\nDans la plupart des systèmes, les données sont gérées sous forme de tables à l'aide d'une **base de données relationnelle (RDB)**.\n\n**SQL** est le langage dédié utilisé pour commander la base de données — lui disant de \"récupérer des données\", \"insérer des données\", et ainsi de suite.\n\nDans cette leçon, vous apprendrez la commande de récupération de données la plus basique en extrayant des données de la table principale des étudiants (student master table) de votre école.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:1:en"
  };

  window.CONTENT_I18N["sql:2"] = window.CONTENT_I18N["sql:2"] || {};
  window.CONTENT_I18N["sql:2"].fr = {
    title: "02-Structure de table, types de données et clés primaires",
    concept: "Une table se compose de colonnes et de lignes.\n\nChaque colonne se voit attribuer un **type de données (data type)** (tel que nombre, texte ou date), et les données qui ne correspondent pas à ce type ne peuvent pas être insérées.\n\nDe plus, une **clé primaire (Primary Key)** est définie pour une table en tant qu'identifiant unique afin de distinguer chaque ligne.\n\nDans la base de données de votre école, `department_id` sert de clé primaire pour la table `departments_mst`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:2:en"
  };

  window.CONTENT_I18N["sql:3"] = window.CONTENT_I18N["sql:3"] || {};
  window.CONTENT_I18N["sql:3"].fr = {
    title: "03-Syntaxe SELECT de base",
    concept: "La façon la plus basique de récupérer des données consiste à utiliser la structure : `SELECT column_name FROM table_name;`.\n\nSi vous souhaitez récupérer toutes les colonnes, spécifiez `*` (astérisque) au lieu des noms de colonnes individuels.\n\nSi vous n'avez besoin que de colonnes spécifiques, listez leurs noms séparés par des virgules.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:3:en"
  };

  window.CONTENT_I18N["sql:4"] = window.CONTENT_I18N["sql:4"] || {};
  window.CONTENT_I18N["sql:4"].fr = {
    title: "04-Filtrer les lignes avec WHERE",
    concept: "Pour filtrer les données et ne récupérer que les lignes dont vous avez besoin, utilisez la clause **WHERE**.\n\nVous l'écrivez ainsi : `SELECT column_name FROM table_name WHERE condition;`.\n\nPar exemple, pour ne trouver que les étudiantes (où le genre est '1'), vous écririez :\n\n```sql\nSELECT * FROM students_mst WHERE gender = '1';\n```\n\nLorsque vous spécifiez du texte, vous devez l'entourer de guillemets simples `'`. La condition peut vérifier si les colonnes sont égales, supérieures ou inférieures à certaines valeurs.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:4:en"
  };

  window.CONTENT_I18N["sql:5"] = window.CONTENT_I18N["sql:5"] || {};
  window.CONTENT_I18N["sql:5"].fr = {
    title: "05-Combiner les conditions avec AND",
    concept: "Lorsque vous avez besoin que **toutes les conditions soient vraies en même temps**, utilisez **AND**.\n\nPar exemple, pour trouver un étudiant de 24 ans dans le département 1 :\n\n```sql\nSELECT * FROM students_mst\nWHERE age = 24 AND department_id = 1;\n```\n\nLa condition d'âge ET la condition de département doivent toutes deux être satisfaites. Si l'une d'elles est fausse, la ligne est exclue des résultats.\n\n**AND** restreint votre recherche — plus vous ajoutez de conditions, moins vous obtenez de résultats.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:5:en"
  };

  window.CONTENT_I18N["sql:6"] = window.CONTENT_I18N["sql:6"] || {};
  window.CONTENT_I18N["sql:6"].fr = {
    title: "06-Combiner les conditions avec OR",
    concept: "Lorsque vous avez besoin qu'**au moins une des conditions soit vraie**, utilisez **OR**.\n\nPar exemple, pour trouver les étudiants qui sont dans le département 1 OU le département 2 :\n\n```sql\nSELECT * FROM students_mst\nWHERE department_id = 1 OR department_id = 2;\n```\n\nAvec OR, tant qu'au moins une condition est vraie, la ligne est incluse.\n\nContrairement à AND qui restreint les résultats, **OR élargit** votre recherche.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:6:en"
  };

  window.CONTENT_I18N["sql:7"] = window.CONTENT_I18N["sql:7"] || {};
  window.CONTENT_I18N["sql:7"].fr = {
    title: "07-Combiner les conditions AND et OR",
    concept: "Vous pouvez combiner **AND** et **OR** dans la même clause WHERE.\n\nCependant, AND et OR ont des priorités différentes — **AND est évalué avant OR**, tout comme la multiplication avant l'addition en mathématiques.\n\nPour contrôler l'ordre d'évaluation, utilisez des parenthèses `()` :\n\n```sql\nSELECT * FROM students_mst\nWHERE (age = 20 OR age = 24) AND gender = '0';\n```\n\nCeci trouve les étudiants masculins qui ont soit 20 OU 24 ans. Sans les parenthèses, le AND s'exécuterait en premier et le résultat serait différent.\n\nUtilisez toujours des parenthèses pour rendre la logique de votre requête claire et correcte.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:7:en"
  };

  window.CONTENT_I18N["sql:8"] = window.CONTENT_I18N["sql:8"] || {};
  window.CONTENT_I18N["sql:8"].fr = {
    title: "08-Utiliser les opérateurs de comparaison",
    concept: "En plus de l'égalité (`=`), SQL prend en charge plusieurs **opérateurs de comparaison** pour des conditions plus flexibles :\n\n- `=` : Égal à\n- `<>` ou `!=` : Différent de\n- `>` : Supérieur à\n- `<` : Inférieur à\n- `>=` : Supérieur ou égal à\n- `<=` : Inférieur ou égal à\n\nPar exemple, pour trouver les étudiants ayant un score d'examen de 90 ou plus :\n\n```sql\nSELECT * FROM students_mst WHERE test_score >= 90;\n```\n\nCes opérateurs fonctionnent avec les nombres, les dates et même le texte dans certains cas.\n\nAttention : `>= 90` inclut 90, tandis que `> 90` ne l'inclut pas.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:8:en"
  };

  window.CONTENT_I18N["sql:9"] = window.CONTENT_I18N["sql:9"] || {};
  window.CONTENT_I18N["sql:9"].fr = {
    title: "09-Vérifier NULL avec IS NULL et IS NOT NULL",
    concept: "Lorsqu'une colonne n'a pas de données saisies, sa valeur est **NULL**. NULL n'est pas zéro, ce n'est pas une chaîne vide — cela signifie \"aucune valeur du tout\".\n\nPour vérifier NULL, vous **ne pouvez pas** utiliser `= NULL` ou `<> NULL`. À la place, utilisez des opérateurs spéciaux :\n\n```sql\n-- Trouver les étudiants dont delete_at est NULL (pas encore supprimés)\nSELECT * FROM students_mst WHERE delete_at IS NULL;\n\n-- Trouver les étudiants dont delete_at n'est pas NULL (déjà supprimés)\nSELECT * FROM students_mst WHERE delete_at IS NOT NULL;\n```\n\n**IS NULL** vérifie les données manquantes. **IS NOT NULL** vérifie les données existantes.\n\nPensez-y comme vérifier si une poche existe (IS NOT NULL) par rapport à vérifier si la poche est vide (un concept entièrement différent).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:9:en"
  };

  window.CONTENT_I18N["sql:10"] = window.CONTENT_I18N["sql:10"] || {};
  window.CONTENT_I18N["sql:10"].fr = {
    title: "10-Rechercher du texte avec LIKE",
    concept: "Lorsque vous souhaitez rechercher un **motif (pattern)** plutôt qu'une correspondance exacte, utilisez **LIKE** avec des **caractères génériques (wildcards)** :\n\n- `%` : Correspond à n'importe quelle séquence de caractères (zéro ou plus)\n- `_` : Correspond à exactement un caractère\n\nPar exemple, pour trouver les étudiants dont le nom en kana commence par \"Yama\" :\n\n```sql\nSELECT * FROM students_mst\nWHERE student_name_kana LIKE 'Yama%';\n```\n\nCeci trouve 'Yamada', 'Yamamoto', 'Yamashita' — tout ce qui commence par 'Yama'.\n\nSi vous utilisiez `_ama%`, cela correspondrait aux noms dont le deuxième caractère est 'a', le troisième est 'm', le quatrième est 'a', suivi de n'importe quoi.\n\nLIKE est insensible à la casse dans MySQL par défaut, mais le comportement peut varier avec d'autres systèmes de gestion de base de données.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:10:en"
  };

  window.CONTENT_I18N["sql:11"] = window.CONTENT_I18N["sql:11"] || {};
  window.CONTENT_I18N["sql:11"].fr = {
    title: "11-Filtrer les plages avec BETWEEN",
    concept: "Pour trouver des valeurs qui se situent **dans une plage spécifique**, utilisez **BETWEEN**.\n\nPar exemple, pour trouver les étudiants âgés de 20 à 25 ans :\n\n```sql\nSELECT * FROM students_mst WHERE age BETWEEN 20 AND 25;\n```\n\nBETWEEN est **inclusif** — il inclut à la fois la valeur de début et la valeur de fin. Ainsi, `BETWEEN 20 AND 25` inclut les âges 20, 21, 22, 23, 24 et 25.\n\nVous pouvez utiliser BETWEEN avec des nombres, des dates et même du texte. Cela rend les requêtes de plage plus claires et plus courtes que l'utilisation de `>=` et `<=`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:11:en"
  };

  window.CONTENT_I18N["sql:12"] = window.CONTENT_I18N["sql:12"] || {};
  window.CONTENT_I18N["sql:12"].fr = {
    title: "12-Faire correspondre plusieurs valeurs avec IN",
    concept: "Lorsque vous souhaitez vérifier si une valeur correspond à **l'une de plusieurs valeurs spécifiques**, utilisez **IN**.\n\nPar exemple, pour trouver les étudiants dont l'âge est 20, 25 ou 30 :\n\n```sql\nSELECT * FROM students_mst WHERE age IN (20, 25, 30);\n```\n\nC'est beaucoup plus court que d'écrire :\n```sql\nWHERE age = 20 OR age = 25 OR age = 30\n```\n\nIN fonctionne avec les nombres et le texte. Vous pouvez également utiliser IN avec une sous-requête (une requête à l'intérieur d'une autre requête).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:12:en"
  };

  window.CONTENT_I18N["sql:13"] = window.CONTENT_I18N["sql:13"] || {};
  window.CONTENT_I18N["sql:13"].fr = {
    title: "13-Trier les lignes avec ORDER BY",
    concept: "Pour afficher les résultats de votre requête dans un ordre spécifique, utilisez **ORDER BY**.\n\nPar défaut, le tri est **ascendant** (du plus petit au plus grand, de A à Z). Pour inverser l'ordre, ajoutez **DESC** (descendant) :\n\n```sql\n-- Trier par âge du plus bas au plus élevé (ascendant)\nSELECT * FROM students_mst ORDER BY age;\n\n-- Trier par âge du plus élevé au plus bas (descendant)\nSELECT * FROM students_mst ORDER BY age DESC;\n```\n\nVous pouvez également trier par plusieurs colonnes :\n\n```sql\nSELECT * FROM students_mst ORDER BY department_id, age DESC;\n```\n\nCeci trie d'abord par département, puis par âge décroissant au sein de chaque département.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:13:en"
  };

  window.CONTENT_I18N["sql:14"] = window.CONTENT_I18N["sql:14"] || {};
  window.CONTENT_I18N["sql:14"].fr = {
    title: "14-Limiter le nombre de lignes avec LIMIT",
    concept: "Lorsque vous ne voulez que les **premières lignes** d'un résultat, utilisez **LIMIT**.\n\nPar exemple, pour trouver les 3 étudiants ayant les scores les plus élevés :\n\n```sql\nSELECT * FROM students_mst\nORDER BY test_score DESC\nLIMIT 3;\n```\n\nLa requête trie d'abord par score décroissant, puis LIMIT ne conserve que les 3 premières lignes.\n\nLIMIT est placé à la toute fin de la requête, après ORDER BY.\n\nC'est particulièrement utile lorsque vous souhaitez avoir un aperçu des données ou si vous devez implémenter une pagination.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:14:en"
  };

  window.CONTENT_I18N["sql:15"] = window.CONTENT_I18N["sql:15"] || {};
  window.CONTENT_I18N["sql:15"].fr = {
    title: "15-Supprimer les doublons avec DISTINCT",
    concept: "Lorsqu'une colonne contient des valeurs en double et que vous souhaitez voir **uniquement les valeurs uniques**, ajoutez **DISTINCT** après SELECT.\n\nPar exemple, pour voir quels âges existent dans votre table d'étudiants (sans répétitions) :\n\n```sql\nSELECT DISTINCT age FROM students_mst;\n```\n\nSans DISTINCT, vous obtiendriez le même âge répertorié plusieurs fois — une fois pour chaque étudiant.\n\nDISTINCT s'applique à toutes les colonnes sélectionnées. Si vous écrivez `SELECT DISTINCT age, name`, cela montre les combinaisons uniques d'âge ET de nom ensemble.\n\nDISTINCT est utile pour explorer quelles valeurs existent réellement dans vos données.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:15:en"
  };

  window.CONTENT_I18N["sql:16"] = window.CONTENT_I18N["sql:16"] || {};
  window.CONTENT_I18N["sql:16"].fr = {
    title: "16-Utiliser les fonctions de chaîne et de date SQL",
    concept: "SQL fournit de nombreuses **fonctions** intégrées pour transformer, calculer ou extraire des parties de vos données.\n\nFonctions de chaîne courantes :\n- `CHAR_LENGTH(str)` — nombre de caractères dans une chaîne\n- `CONCAT(a, b)` — joint deux chaînes de caractères\n- `UPPER(str)` / `LOWER(str)` — change la casse des lettres\n\nFonctions de date courantes :\n- `CURRENT_DATE` — date d'aujourd'hui\n- `YEAR(date)` / `MONTH(date)` — extrait une partie d'une date\n\nExemple :\n```sql\nSELECT student_name, CHAR_LENGTH(student_name) AS name_length\nFROM students_mst;\n```\n\nLes fonctions ne modifient pas les données d'origine — elles transforment uniquement la sortie affichée.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:16:en"
  };

  window.CONTENT_I18N["sql:17"] = window.CONTENT_I18N["sql:17"] || {};
  window.CONTENT_I18N["sql:17"].fr = {
    title: "17-Utiliser les expressions CASE pour la logique conditionnelle",
    concept: "**CASE** vous permet d'ajouter une **logique de type si-alors-sinon (if-then-else)** directement à l'intérieur de votre requête SQL.\n\nSyntaxe de base :\n```sql\nSELECT student_name, age,\n  CASE\n    WHEN age >= 20 THEN 'Adult'\n    ELSE 'Minor'\n  END AS age_group\nFROM students_mst;\n```\n\nCASE vérifie chaque condition WHEN dans l'ordre. La première condition qui correspond l'emporte. Si aucune ne correspond, ELSE est utilisé (ou NULL s'il n'y a pas de ELSE).\n\nVous pouvez également utiliser CASE avec plusieurs conditions :\n```sql\nCASE\n  WHEN score >= 80 THEN 'Excellent'\n  WHEN score >= 60 THEN 'Good'\n  ELSE 'Needs Improvement'\nEND\n```\n\nCASE est évalué pour chaque ligne, ce qui en fait un outil puissant pour créer des colones calculées.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:17:en"
  };

  window.CONTENT_I18N["sql:18"] = window.CONTENT_I18N["sql:18"] || {};
  window.CONTENT_I18N["sql:18"].fr = {
    title: "18-Fonctions d'agrégation : SUM, AVG, COUNT, etc.",
    concept: "Les fonctions qui effectuent des calculs sur plusieurs lignes de données ensemble sont appelées **fonctions d'agrégation**.\n\n- **COUNT(column)** : Compte le nombre de lignes.\n- **SUM(column)** : Calcule la valeur totale.\n- **AVG(column)** : Calcule la valeur moyenne.\n- **MAX(column)** / **MIN(column)** : Trouve la valeur maximale / minimale.\n\nL'utilisation de fonctions d'agrégation vous permet d'obtenir des statistiques pour l'ensemble du groupe plutôt que pour des lignes individuelles.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:18:en"
  };

  window.CONTENT_I18N["sql:19"] = window.CONTENT_I18N["sql:19"] || {};
  window.CONTENT_I18N["sql:19"].fr = {
    title: "19-Grouper les données : GROUP BY",
    concept: "Pour diviser les données en groupes et effectuer des agrégations sur chaque groupe, utilisez la clause **GROUP BY**.\n\nVous l'écrivez ainsi :\n\n```sql\nSELECT gender, AVG(age) FROM students GROUP BY gender;\n```\n\nCela vous permet de calculer des statistiques comme \"l'âge moyen des étudiants masculins\" et \"l'âge moyen des étudiantes\" en même temps.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:19:en"
  };

  window.CONTENT_I18N["sql:20"] = window.CONTENT_I18N["sql:20"] || {};
  window.CONTENT_I18N["sql:20"].fr = {
    title: "20-Filtrer les groupes : HAVING",
    concept: "Si vous souhaitez filtrer les résultats **après** qu'ils ont été agrégés par GROUP BY, utilisez la clause **HAVING** au lieu de WHERE.\n\nLa clause WHERE filtre les lignes **avant** qu'elles ne soient groupées, tandis que la clause HAVING filtre les groupes **après** qu'ils ont été groupés.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:20:en"
  };

  window.CONTENT_I18N["sql:21"] = window.CONTENT_I18N["sql:21"] || {};
  window.CONTENT_I18N["sql:21"].fr = {
    title: "21-Conception de base de données et normalisation",
    concept: "Dans la conception de bases de données, les données sont réparties dans plusieurs tables pour éviter les duplications inutiles et les incohérences. Ce processus est appelé **normalisation**.\n\nPar exemple, au lieu d'écrire le nom du département directement dans la table des étudiants, vous écrivez uniquement \"l'ID du département\" et gérez les détails dans une table de département distincte.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:21:en"
  };

  window.CONTENT_I18N["sql:22"] = window.CONTENT_I18N["sql:22"] || {};
  window.CONTENT_I18N["sql:22"].fr = {
    title: "22-Joindre des tables : INNER JOIN",
    concept: "La **jointure (JOIN)** est le processus consistant à lier des tables distinctes pour récupérer des informations combinées.\n\nUne **INNER JOIN (jointure interne)** ne récupère que les lignes où les clés communes correspondent dans les deux tables.\n\nVous l'écrivez ainsi :\n\n```sql\nFROM table_A INNER JOIN table_B ON table_A.key = table_B.key\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:22:en"
  };

  window.CONTENT_I18N["sql:23"] = window.CONTENT_I18N["sql:23"] || {};
  window.CONTENT_I18N["sql:23"].fr = {
    title: "23-Joindre des tables : LEFT/RIGHT JOIN",
    concept: "Une **jointure externe (OUTER JOIN)** conserve toutes les données d'une table tout en joignant les données correspondantes d'une autre table.\n\n- **LEFT JOIN** : Conserve toutes les données de la table écrite à gauche de la clause FROM.\n- **RIGHT JOIN** : Conserve toutes les données de la table écrite à droite.\n\nS'il n'y a pas d'enregistrement correspondant dans l'autre table, il sera rempli avec `NULL`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:23:en"
  };

  window.CONTENT_I18N["sql:24"] = window.CONTENT_I18N["sql:24"] || {};
  window.CONTENT_I18N["sql:24"].fr = {
    title: "24-Auto-jointures et jointures multiples",
    concept: "Joindre une table à elle-même est appelé une **auto-jointure (self join)**.\n\nC'est utile lorsque vous souhaitez extraire des paires liées de la même table.\n\nVous attribuez des alias (noms temporaires) comme `students_mst AS s1` et la traitez comme s'il s'agissait d'une table distincte.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:24:en"
  };

  window.CONTENT_I18N["sql:25"] = window.CONTENT_I18N["sql:25"] || {};
  window.CONTENT_I18N["sql:25"].fr = {
    title: "25-Utiliser des sous-requêtes",
    concept: "Une requête SQL imbriquée dans une autre requête SQL est appelée une **sous-requête (subquery)**.\n\nPar exemple, si vous souhaitez obtenir \"une liste des étudiants dont le score est supérieur au score moyen\", vous calculez d'abord le score moyen à l'aide d'une sous-requête, puis vous utilisez ce résultat pour filtrer les lignes de la requête SQL externe.\n\nVous écrivez la requête SQL interne entre parenthèses `()`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:25:en"
  };

  window.CONTENT_I18N["sql:26"] = window.CONTENT_I18N["sql:26"] || {};
  window.CONTENT_I18N["sql:26"].fr = {
    title: "26-Insérer des lignes avec INSERT",
    concept: "Pour enregistrer de nouvelles données dans une table, utilisez l'instruction **INSERT**.\n\nVous l'écrivez ainsi :\n\n```sql\nINSERT INTO table_name (column1, column2) VALUES (value1, value2);\n```\n\nL'ordre des valeurs doit correspondre à l'ordre des colonnes spécifiées.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:26:en"
  };

  window.CONTENT_I18N["sql:27"] = window.CONTENT_I18N["sql:27"] || {};
  window.CONTENT_I18N["sql:27"].fr = {
    title: "27-Mettre à jour des lignes avec UPDATE",
    concept: "Pour modifier des données existantes dans une table, utilisez l'instruction **UPDATE**.\n\nVous l'écrivez ainsi :\n\n```sql\nUPDATE table_name SET column_name = new_value WHERE condition;\n```\n\n> [!CAUTION]\n> **Extrêmement important** : Si vous oubliez d'écrire la clause WHERE, toutes les lignes de la table seront mises à jour !",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:27:en"
  };

  window.CONTENT_I18N["sql:28"] = window.CONTENT_I18N["sql:28"] || {};
  window.CONTENT_I18N["sql:28"].fr = {
    title: "28-Supprimer des lignes avec DELETE",
    concept: "Pour supprimer des données d'une table, utilisez l'instruction **DELETE**.\n\nVous l'écrivez ainsi :\n\n```sql\nDELETE FROM table_name WHERE condition;\n```\n\n> [!CAUTION]\n> **Extrêmement important** : Tout comme avec l'instruction UPDATE, s'il n'y a pas de clause WHERE, toutes les lignes de la table seront supprimées !",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:28:en"
  };

  window.CONTENT_I18N["sql:29"] = window.CONTENT_I18N["sql:29"] || {};
  window.CONTENT_I18N["sql:29"].fr = {
    title: "29-Créer des tables avec CREATE TABLE",
    concept: "Pour créer une nouvelle table, utilisez l'instruction **CREATE TABLE**.\n\nVous la définissez ainsi :\n\n```sql\nCREATE TABLE table_name (column_name data_type, column_name data_type, ...);\n```\n\nPar exemple, pour définir une colonne comme clé primaire, déclarez-la avec la contrainte \"PRIMARY KEY\".",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:29:en"
  };

  window.CONTENT_I18N["sql:30"] = window.CONTENT_I18N["sql:30"] || {};
  window.CONTENT_I18N["sql:30"].fr = {
    title: "30-Utiliser des contraintes : NOT NULL, UNIQUE et DEFAULT",
    concept: "Vous pouvez définir des règles (contraintes) sur les colonnes de table pour maintenir la qualité des données :\n\n- **NOT NULL** : Interdit les espaces vides (NULL).\n- **UNIQUE** : Interdit les valeurs en double.\n- **DEFAULT value** : Définit une valeur qui est automatiquement saisie lorsqu'une valeur est omise.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:30:en"
  };

  window.CONTENT_I18N["sql:31"] = window.CONTENT_I18N["sql:31"] || {};
  window.CONTENT_I18N["sql:31"].fr = {
    title: "31-Clés primaires et auto-incrémentation",
    concept: "Une table ne peut avoir qu'une seule clé primaire (PRIMARY KEY).\n\nDans MySQL, spécifier **AUTO_INCREMENT** pour une clé primaire attribue automatiquement des numéros séquentiels comme \"1, 2, 3...\" lors de l'insertion de nouvelles données.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:31:en"
  };

  window.CONTENT_I18N["sql:32"] = window.CONTENT_I18N["sql:32"] || {};
  window.CONTENT_I18N["sql:32"].fr = {
    title: "32-Contraintes de clé étrangère",
    concept: "Pour garantir la relation et la cohérence entre les tables, utilisez une contrainte de **clé étrangère (FOREIGN KEY)**.\n\n- Par exemple, vous pouvez appliquer une règle stipulant que \"le department_id d'un étudiant doit exister dans la colonne department_id de la table departments_mst.\" Cela empêche l'enregistrement d'ID de département qui n'existent pas.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:32:en"
  };

  window.CONTENT_I18N["sql:33"] = window.CONTENT_I18N["sql:33"] || {};
  window.CONTENT_I18N["sql:33"].fr = {
    title: "33-Modifier et supprimer des tables avec ALTER et DROP",
    concept: "Ces opérations sont effectuées après la création d'une table :\n\n- **ALTER TABLE** : Modifie la structure d'une table, comme l'ajout ou la modification de colonnes.\n  - Ajouter une colonne : `ALTER TABLE table_name ADD column_name data_type;`\n- **DROP TABLE** : Supprime définitivement la table elle-même.\n  - `DROP TABLE table_name;` (Remarque : toutes les données à l'intérieur de la table seront également supprimées.)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:33:en"
  };

  window.CONTENT_I18N["sql:34"] = window.CONTENT_I18N["sql:34"] || {};
  window.CONTENT_I18N["sql:34"].fr = {
    title: "34-Traitement des transactions",
    concept: "Un mécanisme qui regroupe plusieurs opérations et les traite comme \"une seule unité de travail\" est appelé une **transaction**.\n\n- **COMMIT** : Finalise et enregistre toutes les modifications.\n- **ROLLBACK** : Annule toutes les opérations et les ramène à leur état initial avant le début de la transaction si une erreur survient.\n\nC'est essentiel pour les processus où des défaillances partielles ne peuvent être tolérées, comme les transferts bancaires (débiter de l'argent du compte A et le déposer sur le compte B).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:34:en"
  };

  window.CONTENT_I18N["sql:35"] = window.CONTENT_I18N["sql:35"] || {};
  window.CONTENT_I18N["sql:35"].fr = {
    title: "35-Index pour une recherche rapide",
    concept: "Un répertoire créé pour accélérer la récupération des données au sein d'une table est appelé un \"index (INDEX)\".\n\nSur les tables contenant de grandes quantités de données, la création d'un index sur des colonnes spécifiques peut améliorer considérablement les vitesses de recherche.\n\nCependant, avoir trop d'index présente l'inconvénient de ralentir les insertions et les mises à jour de données car l'index doit être maintenu.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:35:en"
  };

  window.CONTENT_I18N["sql:36"] = window.CONTENT_I18N["sql:36"] || {};
  window.CONTENT_I18N["sql:36"].fr = {
    title: "36-Vues et procédures stockées",
    concept: "Ce sont des mécanismes pour réutiliser les requêtes SQL et améliorer l'efficacité des opérations :\n\n- **VIEW** : Une \"table virtuelle\" qui enregistre une instruction SELECT complexe.\n- **Stored Routine (Stored Procedure)** : Un programme qui enregistre plusieurs opérations SQL et de la logique conditionnelle directement côté base de données, permettant de les exécuter par simple appel du programme.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:36:en"
  };
})();
