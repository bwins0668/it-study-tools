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
})();
