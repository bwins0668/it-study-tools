/* Study Tools Content I18n — Python French Derived Language Pack v1 */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["python:1"] = window.CONTENT_I18N["python:1"] || {};
  window.CONTENT_I18N["python:1"].fr = {
    title: "Comment fonctionne un ordinateur",
    concept: "Un ordinateur fonctionne grâce à la coordination de ses principaux composants matériels :\n\n- **CPU (Processeur)** — Le \"cerveau\" de l'ordinateur qui effectue les calculs à grande vitesse\n- **Mémoire (RAM)** — Stocke temporairement les données du programme en cours d'exécution (effacée à l'extinction)\n- **Disque dur (SSD/HDD)** — Stocke les fichiers de façon permanente, même après l'extinction de l'ordinateur",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:1:en"
  };

  window.CONTENT_I18N["python:2"] = window.CONTENT_I18N["python:2"] || {};
  window.CONTENT_I18N["python:2"].fr = {
    title: "Langage humain et langage machine",
    concept: "Les humains communiquent dans des langues naturelles, mais les ordinateurs ne comprennent que le **binaire** (0 et 1), appelé **langage machine**. Le code écrit par les humains doit être traduit en langage machine par un **interpréteur** ou un **compilateur**. Python utilise un interpréteur pour traduire le code ligne par ligne.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:2:en"
  };

  window.CONTENT_I18N["python:3"] = window.CONTENT_I18N["python:3"] || {};
  window.CONTENT_I18N["python:3"].fr = {
    title: "Différents langages de programmation",
    concept: "Il existe de nombreux langages de programmation dans le monde, chacun adapté à des objectifs différents :\n\n- **Python** — Syntaxe simple, idéal pour l'IA, l'analyse de données et l'automatisation\n- **Java** — Stable et largement utilisé dans les systèmes d'entreprise et les applications Android\n- **C++** — Haute performance, utilisé dans les moteurs de jeu et la programmation système\n\nAucun langage n'est le meilleur ; choisissez l'outil adapté à la tâche.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:3:en"
  };

  window.CONTENT_I18N["python:4"] = window.CONTENT_I18N["python:4"] || {};
  window.CONTENT_I18N["python:4"].fr = {
    title: "Lancer l'invite de commandes",
    concept: "Une **CUI (Interface Utilisateur en Ligne de Commande)** vous permet d'utiliser un ordinateur en tapant des commandes au lieu d'utiliser une souris. Sous Windows, vous pouvez utiliser l'**Invite de commandes** ou **PowerShell**. C'est essentiel pour exécuter des programmes Python en ligne de commande.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:4:en"
  };

  window.CONTENT_I18N["python:5"] = window.CONTENT_I18N["python:5"] || {};
  window.CONTENT_I18N["python:5"].fr = {
    title: "Chemins de fichiers (absolus et relatifs)",
    concept: "Un **chemin (path)** est l'\"adresse\" qui indique où se trouve un fichier ou un dossier :\n\n- **Chemin absolu** — Le chemin complet depuis la racine (ex. `C:/Utilisateurs/Coco/main.py`). Il fonctionne peu importe où vous êtes.\n- **Chemin relatif** — Un chemin relatif à votre répertoire de travail courant (ex. `./main.py` ou `../data.txt`)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:5:en"
  };

  window.CONTENT_I18N["python:6"] = window.CONTENT_I18N["python:6"] || {};
  window.CONTENT_I18N["python:6"].fr = {
    title: "Utiliser les commandes en ligne de commande",
    concept: "Commandes courantes pour la ligne de commande :\n\n- `dir` — Liste les fichiers et dossiers (Windows)\n- `ls` — Liste les fichiers et dossiers (Mac/Linux)\n- `cd nomDossier` — Changer de répertoire vers un sous-dossier\n- `cd ..` — Revenir au dossier parent\n- `python --version` — Vérifier la version de Python installée",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:6:en"
  };

  window.CONTENT_I18N["python:7"] = window.CONTENT_I18N["python:7"] || {};
  window.CONTENT_I18N["python:7"].fr = {
    title: "Préparation avant l'installation",
    concept: "Avant d'installer Python, vérifiez les informations système de votre ordinateur :\n\n- Est-ce **Windows** ou **macOS** ?\n- Si Windows, est-ce **64 bits** ou **32 bits** ? (La plupart des ordinateurs modernes sont en 64 bits)\n- Assurez-vous d'avoir les privilèges d'administrateur",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:7:en"
  };

  window.CONTENT_I18N["python:8"] = window.CONTENT_I18N["python:8"] || {};
  window.CONTENT_I18N["python:8"].fr = {
    title: "Applications nécessaires",
    concept: "Pour commencer à apprendre Python, vous avez besoin de trois outils essentiels :\n\n1. **Interpréteur Python** — Le moteur qui exécute votre code\n2. **Éditeur de texte (VS Code, Atom, etc.)** — Pour écrire des fichiers `.py` avec coloration syntaxique\n3. **Terminal/Console** — Pour exécuter des scripts et voir les résultats",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:8:en"
  };

  window.CONTENT_I18N["python:9"] = window.CONTENT_I18N["python:9"] || {};
  window.CONTENT_I18N["python:9"].fr = {
    title: "Installer Python",
    concept: "Lors de l'installation de Python sur Windows, il y a une étape cruciale :\n\n⚠️ **Cochez \"Add python.exe to PATH\"** dans l'installateur !\n\nCela enregistre l'emplacement de Python dans la variable d'environnement PATH du système, vous permettant d'exécuter `python` depuis n'importe quel dossier dans la ligne de commande. Sans cela, taper `python` donnera une erreur \"command not found\".",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:9:en"
  };

  window.CONTENT_I18N["python:10"] = window.CONTENT_I18N["python:10"] || {};
  window.CONTENT_I18N["python:10"].fr = {
    title: "Installer un éditeur de code",
    concept: "Après avoir installé un éditeur de code (comme VS Code ou Atom), suivez ces étapes :\n\n1. Créez un nouveau fichier\n2. Enregistrez-le avec l'extension `.py` (ex. `hello.py`)\n3. L'éditeur le reconnaîtra comme du code Python et activera la coloration syntaxique (texte en couleurs)\n\nL'extension `.py` agit comme une carte d'identité — elle indique à l'éditeur de démarrer l'analyse Python, de surligner les mots-clés et même de signaler les erreurs potentielles.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:10:en"
  };

  window.CONTENT_I18N["python:11"] = window.CONTENT_I18N["python:11"] || {};
  window.CONTENT_I18N["python:11"].fr = {
    title: "Exercices de révision du Chapitre 1",
    concept: "Ceci est un quiz de révision couvrant ce que vous avez appris au Chapitre 1 : comment fonctionnent les ordinateurs, les opérations en ligne de commande et la configuration de l'environnement Python.\n\nLes questions testent votre compréhension de :\n- Comment le CPU, la mémoire et le disque dur travaillent ensemble\n- Comment naviguer dans les répertoires et lister les fichiers en ligne de commande\n- L'étape cruciale de cocher \"Add python.exe to PATH\" lors de l'installation de Python",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:11:en"
  };

  window.CONTENT_I18N["python:12"] = window.CONTENT_I18N["python:12"] || {};
  window.CONTENT_I18N["python:12"].fr = {
    title: "Mode interactif et premier programme (hello.py)",
    concept: "Pour afficher du texte à l'écran en Python, utilisez la fonction `print()`.\n\nPlacez le texte à afficher entre guillemets simples (`'`) ou doubles (`\"`) et écrivez `print('Bonjour')`.\n\n**Erreur fréquente des débutants :** Python est sensible à la casse. `print` doit être écrit en minuscules — `Print` provoquera une `NameError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:12:en"
  };

  window.CONTENT_I18N["python:13"] = window.CONTENT_I18N["python:13"] || {};
  window.CONTENT_I18N["python:13"].fr = {
    title: "Exécuter des fichiers script (hello2.py)",
    concept: "Utilisez la fonction `print()` pour afficher du texte à l'écran. Placez le texte entre guillemets simples (`'`) ou doubles (`\"`), par exemple `print('Bonjour')`.\n\nUn fichier script peut contenir plusieurs instructions `print()`, et chacune produira une ligne dans l'ordre. Vous pouvez afficher des chaînes, des nombres et même des résultats de calcul comme `print(3+4)`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:13:en"
  };

  window.CONTENT_I18N["python:14"] = window.CONTENT_I18N["python:14"] || {};
  window.CONTENT_I18N["python:14"].fr = {
    title: "Les bases des commentaires (comment.py)",
    concept: "Un **commentaire** est une note dans votre code qui n'affecte pas l'exécution du programme. Écrivez un commentaire sur une seule ligne en plaçant `#` au début de la ligne. Vous pouvez aussi utiliser les triples guillemets (`'''`) pour les commentaires multi-lignes.\n\nLes commentaires sont ignorés par l'interpréteur Python et sont uniquement destinés aux lecteurs humains.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:14:en"
  };

  window.CONTENT_I18N["python:15"] = window.CONTENT_I18N["python:15"] || {};
  window.CONTENT_I18N["python:15"].fr = {
    title: "Commentaires multi-lignes (comment2.py)",
    concept: "En plus des commentaires sur une seule ligne avec `#`, vous pouvez écrire des **commentaires multi-lignes** en plaçant le texte entre triples guillemets (`'''`).\n\nTout ce qui se trouve entre les triples guillemets ouvrants `'''` et fermants `'''` est traité comme un commentaire et ne sera pas exécuté par Python.\n\nC'est utile pour des explications longues ou pour désactiver temporairement des blocs de code.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:15:en"
  };

  window.CONTENT_I18N["python:16"] = window.CONTENT_I18N["python:16"] || {};
  window.CONTENT_I18N["python:16"].fr = {
    title: "Erreur d'indentation avec triples guillemets (comment_A1.py)",
    concept: "Python vérifie strictement l'**indentation** (espaces au début des lignes) dans le cadre de ses règles syntaxiques. Même les lignes de commentaire peuvent provoquer une `IndentationError` si elles ont des espaces de début inappropriés.\n\nSi un bloc de commentaire avec triples guillemets commence avec une indentation inattendue, Python peut lever une `IndentationError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:16:en"
  };

  window.CONTENT_I18N["python:17"] = window.CONTENT_I18N["python:17"] || {};
  window.CONTENT_I18N["python:17"].fr = {
    title: "Erreur d'indentation de commentaire (comment_A2.py)",
    concept: "Python vérifie strictement l'**indentation** (espaces au début des lignes). Même une ligne de commentaire `#` avec des espaces de début inappropriés provoquera une `IndentationError`.\n\nAssurez-vous que votre indentation est cohérente, même sur les lignes que Python ignorera (comme les commentaires).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:17:en"
  };

  window.CONTENT_I18N["python:18"] = window.CONTENT_I18N["python:18"] || {};
  window.CONTENT_I18N["python:18"].fr = {
    title: "Exercice : Calcul et sortie sans variables (script01.py)",
    concept: "**Exercice pratique — Chapitre 2 (script01.py)**\n\nTâche : Effectuez des calculs et affichez les résultats sans utiliser de variables.\n\nVérifiez le code modèle dans l'éditeur et remplissez les parties manquantes pour compléter le programme. Appuyez sur le bouton Exécuter à droite pour vérifier le résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:18:en"
  };

  window.CONTENT_I18N["python:19"] = window.CONTENT_I18N["python:19"] || {};
  window.CONTENT_I18N["python:19"].fr = {
    title: "Découvrir les types de données",
    concept: "Un **type de données** définit la nature d'une valeur. Python possède plusieurs types de base :\n\n- **int** — Nombres entiers (sans virgule), comme `10` ou `-5`\n- **float** — Nombres à virgule flottante (avec décimales), comme `3.14` ou `2.0`\n- **str** — Chaînes de texte entre guillemets, comme `'Bonjour'`\n- **bool** — Valeurs booléennes, soit `True` soit `False`\n\nUtilisez `type()` pour vérifier le type de données d'une valeur.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:19:en"
  };

  window.CONTENT_I18N["python:20"] = window.CONTENT_I18N["python:20"] || {};
  window.CONTENT_I18N["python:20"].fr = {
    title: "Données numériques (int et float)",
    concept: "Les données numériques existent en deux types principaux :\n\n- **int (entier)** — Nombres entiers sans décimales, ex. `10`, `-5`, `0`\n- **float (virgule flottante)** — Nombres avec un point décimal, ex. `3.14`, `2.0`, `-0.5`\n\nPython convertit automatiquement les types lors des calculs. Par exemple, diviser deux entiers avec `/` renvoie toujours un float (ex. `5 / 2` donne `2.5`).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:20:en"
  };

  window.CONTENT_I18N["python:21"] = window.CONTENT_I18N["python:21"] || {};
  window.CONTENT_I18N["python:21"].fr = {
    title: "Les chaînes de caractères (str)",
    concept: "Une **chaîne de caractères (str)** est une donnée qui représente du texte. Les chaînes doivent être placées entre guillemets simples (`'`) ou doubles (`\"`).\n\nPar exemple : `'Bonjour'` ou `\"Python\"`.\n\nSi vous oubliez les guillemets, Python essaiera d'interpréter le texte comme un nom de variable ou un mot-clé, ce qui provoquera une `NameError` ou une `SyntaxError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:21:en"
  };

  window.CONTENT_I18N["python:22"] = window.CONTENT_I18N["python:22"] || {};
  window.CONTENT_I18N["python:22"].fr = {
    title: "Les données booléennes (bool)",
    concept: "Le type **bool (booléen)** n'a que deux valeurs possibles : `True` (vrai/oui) ou `False` (faux/non). Les booléens jouent un rôle crucial dans les branchements conditionnels (instructions if).\n\n**Important :** `True` et `False` doivent être capitalisés. Écrire `true` ou `false` (en minuscules) provoquera une `NameError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:22:en"
  };

  window.CONTENT_I18N["python:23"] = window.CONTENT_I18N["python:23"] || {};
  window.CONTENT_I18N["python:23"].fr = {
    title: "Opérations arithmétiques (enzanshi01.py)",
    concept: "Python prend en charge plusieurs opérateurs arithmétiques : `+` (addition), `-` (soustraction), `*` (multiplication), `/` (division), `//` (division entière), `%` (modulo/reste) et `**` (exponentiation).\n\nAttention : additionner directement un nombre et une chaîne provoquera une `TypeError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:23:en"
  };

  window.CONTENT_I18N["python:24"] = window.CONTENT_I18N["python:24"] || {};
  window.CONTENT_I18N["python:24"].fr = {
    title: "Concaténation de chaînes (enzanshi02.py)",
    concept: "Vous pouvez joindre (concaténer) des chaînes ensemble en utilisant l'opérateur `+`. Par exemple, `'Bonjour!' + 'Python'` produit `'Bonjour!Python'`.\n\nL'utilisation de triples guillemets (`'''`) vous permet de créer des chaînes multi-lignes qui incluent des sauts de ligne.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:24:en"
  };

  window.CONTENT_I18N["python:25"] = window.CONTENT_I18N["python:25"] || {};
  window.CONTENT_I18N["python:25"].fr = {
    title: "Erreur de type (chaîne et nombre) (enzanshi03.py)",
    concept: "Python utilise `+`, `-`, `*`, `/`, `//`, `%` et `**` pour l'arithmétique. Si vous essayez d'additionner un nombre et une chaîne directement (ex. `'Nombre : ' + 5`), Python lèvera une `TypeError` car vous ne pouvez pas combiner des types de données différents sans conversion explicite.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:25:en"
  };

  window.CONTENT_I18N["python:26"] = window.CONTENT_I18N["python:26"] || {};
  window.CONTENT_I18N["python:26"].fr = {
    title: "Conversion de type avec str() (enzanshi04.py)",
    concept: "Pour combiner un nombre avec une chaîne, convertissez le nombre en chaîne en utilisant `str()`. Par exemple, `'Valeur : ' + str(5)` fonctionne correctement.\n\nPrécédence des opérateurs : la multiplication `*` et la division `/` sont évaluées avant l'addition `+` et la soustraction `-`. Utilisez les parenthèses `()` pour changer l'ordre d'évaluation.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:26:en"
  };

  window.CONTENT_I18N["python:27"] = window.CONTENT_I18N["python:27"] || {};
  window.CONTENT_I18N["python:27"].fr = {
    title: "Conversion de type avec int() (enzanshi05.py)",
    concept: "Utilisez `int()` pour convertir une chaîne en entier. Par exemple, `5 + int('3')` produit `8`.\n\nLa multiplication `*` et la division `/` ont une précédence plus élevée que l'addition `+` et la soustraction `-`. Utilisez les parenthèses `()` pour contrôler l'ordre des opérations.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:27:en"
  };

  window.CONTENT_I18N["python:28"] = window.CONTENT_I18N["python:28"] || {};
  window.CONTENT_I18N["python:28"].fr = {
    title: "Conversion de type avec float() (enzanshi06.py)",
    concept: "Utilisez `float()` pour convertir une chaîne en nombre à virgule flottante. Par exemple, `5 + float('3.000')` produit `8.0`.\n\nVous pouvez enchaîner les conversions : `int(float('3.000'))` convertit d'abord la chaîne en float, puis en entier, produisant `3`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:28:en"
  };

  window.CONTENT_I18N["python:29"] = window.CONTENT_I18N["python:29"] || {};
  window.CONTENT_I18N["python:29"].fr = {
    title: "Définir et utiliser des variables (hensu01.py)",
    concept: "Une **variable** est un conteneur nommé qui stocke une valeur. Utilisez `=` pour attribuer une valeur, comme `x = 10`. Les variables peuvent être réaffectées avec une nouvelle valeur.\n\n**Règles pour les noms de variables :** Doivent commencer par une lettre ou un tiret bas, ne peuvent pas commencer par un chiffre. Par exemple, `1num` est invalide.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:29:en"
  };

  window.CONTENT_I18N["python:30"] = window.CONTENT_I18N["python:30"] || {};
  window.CONTENT_I18N["python:30"].fr = {
    title: "Attribuer des valeurs aux variables (hensu02.py)",
    concept: "Une **variable** stocke une valeur et peut être réaffectée. Utilisez `nom_variable = valeur` pour stocker des données. La valeur à droite du `=` est stockée dans la variable à gauche.\n\nLes variables peuvent contenir différents types de données et peuvent être réaffectées avec un type complètement différent (ex. d'un nombre à une chaîne).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:30:en"
  };

  window.CONTENT_I18N["python:31"] = window.CONTENT_I18N["python:31"] || {};
  window.CONTENT_I18N["python:31"].fr = {
    title: "Calculs avec des variables (hensu03.py)",
    concept: "Une **variable** est un conteneur nommé qui stocke des valeurs. Attribuez une valeur avec `x = 10`. La valeur peut être modifiée par réaffectation.\n\nLes variables peuvent être utilisées dans des expressions arithmétiques. Par exemple, si `num1 = 5` et `num2 = 3`, vous pouvez écrire `resultat = num1 + num2` pour calculer et stocker la somme. Utilisez `type()` pour vérifier le type de données d'une variable.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:31:en"
  };

  window.CONTENT_I18N["python:32"] = window.CONTENT_I18N["python:32"] || {};
  window.CONTENT_I18N["python:32"].fr = {
    title: "Afficher variables et texte ensemble (hensu04.py)",
    concept: "Python prend en charge les **opérateurs d'affectation composés** qui combinent une opération avec une affectation. Par exemple, `a = a + 1` peut s'écrire plus concisément comme `a += 1`.\n\nVous pouvez aussi attribuer la même valeur à plusieurs variables à la fois : `a = b = c = 0`.\n\nUtilisez des virgules dans `print()` pour afficher plusieurs éléments : `print(msg, num1)`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:32:en"
  };

  window.CONTENT_I18N["python:33"] = window.CONTENT_I18N["python:33"] || {};
  window.CONTENT_I18N["python:33"].fr = {
    title: "Réécrire les valeurs des variables (hensu06.py)",
    concept: "Utilisez les opérateurs d'affectation composés comme `+=` pour mettre à jour concisément la valeur d'une variable. Par exemple, `num1 += 3` ajoute 3 à `num1`.\n\nVous pouvez aussi attribuer la même valeur initiale à plusieurs variables : `a = b = c = 0`.\n\nLorsqu'une variable est assignée depuis une autre (`num2 = num1`), `num2` reçoit une copie de la valeur. Modifier `num1` par la suite n'affecte PAS `num2`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:33:en"
  };

  window.CONTENT_I18N["python:34"] = window.CONTENT_I18N["python:34"] || {};
  window.CONTENT_I18N["python:34"].fr = {
    title: "Assigner une variable à une autre (hensu05.py)",
    concept: "Pour concaténer un nombre avec une chaîne, convertissez le nombre en chaîne en utilisant `str()` (transtypage). Alternativement, utilisez une **f-string** : `f'La valeur est {val}'` permet d'intégrer des variables directement dans une chaîne en utilisant les accolades `{}`.\n\nLorsque vous assignez une variable à une autre (`num2 = num1`), `num2` copie la valeur actuelle de `num1`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:34:en"
  };

  window.CONTENT_I18N["python:35"] = window.CONTENT_I18N["python:35"] || {};
  window.CONTENT_I18N["python:35"].fr = {
    title: "Mettre à jour la valeur d'une variable (hensu07.py)",
    concept: "Pour concaténer un nombre avec une chaîne, utilisez `str()` pour convertir le nombre en chaîne. Une autre approche consiste à utiliser les f-strings : `f'La valeur est {val}'` pour intégrer directement les variables.\n\nUne variable peut être mise à jour en utilisant sa propre valeur actuelle : `num1 = num1 + 3` lit l'ancienne valeur, ajoute 3, et stocke le résultat dans `num1`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:35:en"
  };

  window.CONTENT_I18N["python:36"] = window.CONTENT_I18N["python:36"] || {};
  window.CONTENT_I18N["python:36"].fr = {
    title: "Opérateur d'affectation composé (+=) (hensu08.py)",
    concept: "Les opérateurs d'affectation composés raccourcissent le code lors de la mise à jour des variables. Par exemple :\n- `num1 += 3` est un raccourci pour `num1 = num1 + 3`\n- `num1 -= 3` est un raccourci pour `num1 = num1 - 3`\n- `num1 *= 3` est un raccourci pour `num1 = num1 * 3`",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:36:en"
  };

  window.CONTENT_I18N["python:37"] = window.CONTENT_I18N["python:37"] || {};
  window.CONTENT_I18N["python:37"].fr = {
    title: "Affectation composée avec chaînes (hensu09.py)",
    concept: "Les opérateurs d'affectation composés fonctionnent aussi avec les chaînes :\n- `str1 += 'def'` ajoute 'def' à la chaîne actuelle (équivalent à `str1 = str1 + 'def'`)\n- `str1 *= 3` répète la chaîne 3 fois (équivalent à `str1 = str1 * 3`)\n\nUtilisez `str()` pour convertir des nombres en chaînes, et les f-strings (`f'texte {var}'`) pour une intégration plus propre des variables.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:37:en"
  };

  window.CONTENT_I18N["python:38"] = window.CONTENT_I18N["python:38"] || {};
  window.CONTENT_I18N["python:38"].fr = {
    title: "Saisie clavier (input01.py)",
    concept: "Utilisez `input()` pour obtenir une entrée de l'utilisateur via le clavier. La valeur retournée par `input()` est **toujours une chaîne (str)**, même si l'utilisateur tape un nombre.\n\nPour utiliser l'entrée dans des calculs numériques, vous devez la convertir en utilisant `int()` ou `float()`, par exemple `int(input())`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:38:en"
  };

  window.CONTENT_I18N["python:39"] = window.CONTENT_I18N["python:39"] || {};
  window.CONTENT_I18N["python:39"].fr = {
    title: "Concaténer des valeurs saisies (input02.py)",
    concept: "Utilisez `input()` pour accepter une saisie clavier. La valeur retournée est **toujours une chaîne (str)**.\n\nSi vous demandez deux nombres à l'utilisateur et utilisez `+` directement, cela **concaténera les chaînes** plutôt que de les additionner numériquement. Par exemple, saisir 5 et 3 donne `'5' + '3' = '53'`, pas `8`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:39:en"
  };

  window.CONTENT_I18N["python:40"] = window.CONTENT_I18N["python:40"] || {};
  window.CONTENT_I18N["python:40"].fr = {
    title: "Convertir les entrées en nombres et calculer (input03.py)",
    concept: "Utilisez `input()` pour recevoir une saisie clavier. Comme `input()` renvoie toujours une chaîne, vous devez la convertir avec `int()` ou `float()` avant de l'utiliser dans des calculs numériques.\n\nExemple :\n```\nstr1 = input('Entrez le nombre 1 : ')\nnum1 = int(str1)\nstr2 = input('Entrez le nombre 2 : ')\nnum2 = int(str2)\nprint(num1 + num2)\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:40:en"
  };

  window.CONTENT_I18N["python:41"] = window.CONTENT_I18N["python:41"] || {};
  window.CONTENT_I18N["python:41"].fr = {
    title: "Saisie et conversion simultanées (input04.py)",
    concept: "Vous pouvez combiner `input()` et `int()` en une seule ligne par souci de concision :\n```\nnum1 = int(input('Entrez le nombre 1 : '))\nnum2 = int(input('Entrez le nombre 2 : '))\nprint(num1 + num2)\n```\n\nRappelez-vous : `input()` renvoie toujours une chaîne. Vous devez la convertir avec `int()` ou `float()` avant les opérations numériques.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:41:en"
  };

  window.CONTENT_I18N["python:42"] = window.CONTENT_I18N["python:42"] || {};
  window.CONTENT_I18N["python:42"].fr = {
    title: "Exercice : Déterminer et confirmer les types d'expressions (script3-1.py)",
    concept: "**Exercice pratique — Chapitre 3 (script3-1.py)**\n\nTâche : Déterminez et confirmez le type de données de diverses expressions.\n\nVérifiez le code modèle dans l'éditeur et remplissez les parties manquantes. Utilisez `type()` dans `print()` pour révéler le type de données de chaque expression, comme `print(type(1 + 2))`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:42:en"
  };

  window.CONTENT_I18N["python:43"] = window.CONTENT_I18N["python:43"] || {};
  window.CONTENT_I18N["python:43"].fr = {
    title: "Exercice : Saisie et concaténation de chaînes (script3-2.py)",
    concept: "**Exercice pratique — Chapitre 3 (script3-2.py)**\n\nTâche : Saisissez un nom de famille et un prénom, puis concaténez-les et affichez-les.\n\nVérifiez le code modèle et remplissez les parties manquantes. Utilisez `input()` pour lire le nom et le prénom de l'utilisateur, puis combinez-les avec `+` et affichez le résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:43:en"
  };

  window.CONTENT_I18N["python:44"] = window.CONTENT_I18N["python:44"] || {};
  window.CONTENT_I18N["python:44"].fr = {
    title: "Exercice : Saisie numérique et opérations arithmétiques (script3-3.py)",
    concept: "**Exercice pratique — Chapitre 3 (script3-3.py)**\n\nTâche : Saisissez deux entiers et calculez leur produit.\n\nVérifiez le code modèle et remplissez les parties manquantes. Utilisez `int()` pour convertir les chaînes saisies en entiers, puis effectuez l'addition, la soustraction et affichez les résultats formatés en utilisant la concaténation de chaînes.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:44:en"
  };

  window.CONTENT_I18N["python:45"] = window.CONTENT_I18N["python:45"] || {};
  window.CONTENT_I18N["python:45"].fr = {
    title: "Comparaison d'égalité de valeurs (hikaku01.py)",
    concept: "Les **opérateurs de comparaison** comparent deux valeurs et retournent un résultat booléen (`True` ou `False`) :\n- `==` — Égal à\n- `!=` — Différent de\n- `>` — Supérieur à\n- `<` — Inférieur à\n- `>=` — Supérieur ou égal à\n- `<=` — Inférieur ou égal à\n\n**Piège courant :** Utilisez `==` pour la comparaison (double égal). Un seul `=` sert à l'affectation et provoquera une erreur dans une condition `if`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:45:en"
  };

  window.CONTENT_I18N["python:46"] = window.CONTENT_I18N["python:46"] || {};
  window.CONTENT_I18N["python:46"].fr = {
    title: "Comparaison de grandeurs numériques (hikaku02.py)",
    concept: "Les opérateurs de comparaison comparent deux valeurs et retournent `True` ou `False`. Opérateurs disponibles : `==`, `!=`, `>`, `<`, `>=`, `<=`.\n\n**Pièges courants :**\n- Mettez toujours un deux-points `:` à la fin d'une instruction `if`\n- Indentez toujours le bloc de code en dessous avec 4 espaces\n- L'absence de deux-points ou une mauvaise indentation provoque `IndentationError` ou `SyntaxError`",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:46:en"
  };

  window.CONTENT_I18N["python:47"] = window.CONTENT_I18N["python:47"] || {};
  window.CONTENT_I18N["python:47"].fr = {
    title: "Comparaison de chaînes (hikaku03.py)",
    concept: "Les opérateurs de comparaison fonctionnent aussi avec les chaînes. Python compare les chaînes lexicographiquement (ordre alphabétique basé sur les codes de caractères Unicode).\n\nPar exemple, `'a' < 'c'` donne `True` car 'a' vient avant 'c' alphabétiquement.\n\nIncluez toujours le deux-points `:` après `if`, et indentez le corps avec 4 espaces.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:47:en"
  };

  window.CONTENT_I18N["python:48"] = window.CONTENT_I18N["python:48"] || {};
  window.CONTENT_I18N["python:48"].fr = {
    title: "Comparaison de chaînes avec caractères accentués (hikaku04.py)",
    concept: "Les opérateurs de comparaison fonctionnent aussi avec les caractères non anglais. Python les compare en fonction de leurs points de code Unicode.\n\nCet exemple utilise une structure `if-else` :\n- Le bloc `if` s'exécute quand la condition est `True`\n- Le bloc `else` s'exécute quand la condition est `False`\n\nN'oubliez jamais le deux-points `:` et l'indentation correcte !",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:48:en"
  };

  window.CONTENT_I18N["python:49"] = window.CONTENT_I18N["python:49"] || {};
  window.CONTENT_I18N["python:49"].fr = {
    title: "Comparer des valeurs avec des variables (hikaku05.py)",
    concept: "Les opérateurs de comparaison peuvent comparer des variables et des valeurs. Par exemple :\n```\na = 10\nb = 10\nif a >= b:\n    print('a est supérieur ou égal à b')\n```\n\n**Pièges courants :**\n- Utilisez `==` pour la comparaison d'égalité, pas `=`\n- Mettez toujours `:` à la fin des lignes `if`\n- Indentez le bloc if avec 4 espaces",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:49:en"
  };

  window.CONTENT_I18N["python:50"] = window.CONTENT_I18N["python:50"] || {};
  window.CONTENT_I18N["python:50"].fr = {
    title: "Condition avec valeurs booléennes (hikaku06.py)",
    concept: "Vous pouvez utiliser une variable booléenne directement dans une condition `if`. Par exemple :\n```\nb = True\nif b:\n    print('b est True')\n```\n\nIl n'est pas nécessaire d'écrire `if b == True` — `if b :` suffit.\n\n**Pièges courants :** N'oubliez pas le deux-points `:` et l'indentation de 4 espaces.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:50:en"
  };

  window.CONTENT_I18N["python:51"] = window.CONTENT_I18N["python:51"] || {};
  window.CONTENT_I18N["python:51"].fr = {
    title: "Branchement simple avec if (if01.py)",
    concept: "Utilisez l'instruction `if` pour créer un branchement basé sur une condition. Quand la condition est `True`, le bloc indenté (4 espaces) est exécuté.\n\n```\nif condition:\n    # code à exécuter si True\n```\n\nSi la condition est `False`, le bloc indenté est ignoré et l'exécution continue après le bloc if.\n\n**Pièges courants :** N'oubliez pas le deux-points `:` et l'indentation de 4 espaces.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:51:en"
  };

  window.CONTENT_I18N["python:52"] = window.CONTENT_I18N["python:52"] || {};
  window.CONTENT_I18N["python:52"].fr = {
    title: "Branchement à trois voies avec if-elif (ifelif01.py)",
    concept: "Pour créer trois branches ou plus, utilisez `elif` (abréviation de \"else if\"). Les conditions sont évaluées de haut en bas, et seul le premier bloc dont la condition est `True` s'exécute.\n\n```\nif condition1:\n    # s'exécute si condition1 est True\nelif condition2:\n    # s'exécute si condition2 est True (et condition1 était False)\nelse:\n    # s'exécute si aucune condition n'était True\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:52:en"
  };

  window.CONTENT_I18N["python:53"] = window.CONTENT_I18N["python:53"] || {};
  window.CONTENT_I18N["python:53"].fr = {
    title: "Branchement à deux voies avec if-else (ifelse01.py)",
    concept: "Utilisez `if-else` pour gérer les deux possibilités : un bloc s'exécute quand la condition est `True`, et un bloc différent s'exécute quand elle est `False`.\n\n```\nif condition:\n    # s'exécute si True\nelse:\n    # s'exécute si False\n```\n\n**Pièges courants :** N'oubliez pas le deux-points `:` après `if` et `else`. Utilisez une indentation de 4 espaces pour les deux blocs.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:53:en"
  };

  window.CONTENT_I18N["python:54"] = window.CONTENT_I18N["python:54"] || {};
  window.CONTENT_I18N["python:54"].fr = {
    title: "Utiliser plusieurs elif (ifelif02.py)",
    concept: "Vous pouvez enchaîner plusieurs instructions `elif` pour gérer de nombreuses conditions possibles. Python les évalue de haut en bas et exécute seulement le premier bloc correspondant.\n\n```\nif condition1:\n    ...\nelif condition2:\n    ...\nelif condition3:\n    ...\nelse:\n    # s'exécute si aucune des conditions ci-dessus n'est vraie\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:54:en"
  };

  window.CONTENT_I18N["python:55"] = window.CONTENT_I18N["python:55"] || {};
  window.CONTENT_I18N["python:55"].fr = {
    title: "Conditionnels imbriqués (ifnest01.py)",
    concept: "Vous pouvez placer une instruction `if` à l'intérieur d'une autre instruction `if`. Cela s'appelle l'**imbrication**. Chaque niveau d'imbrication ajoute 4 espaces d'indentation supplémentaires.\n\n```\nif condition_externe:\n    # +4 espaces\n    if condition_interne:\n        # +8 espaces\n        print('Les deux conditions sont remplies')\n```\n\nL'imbrication permet de vérifier plusieurs conditions en séquence, comme déverrouiller une porte avant d'ouvrir une boîte à l'intérieur.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:55:en"
  };

  window.CONTENT_I18N["python:56"] = window.CONTENT_I18N["python:56"] || {};
  window.CONTENT_I18N["python:56"].fr = {
    title: "ET logique (and) (and01.py)",
    concept: "L'opérateur `and` combine plusieurs conditions. Le résultat global est `True` seulement quand **les deux** conditions sont `True`.\n\n```\nif a < 10 and a >= 0:\n    print('a est entre 0 et 9')\n```\n\nCela équivaut à écrire deux instructions `if` imbriquées, mais c'est plus concis.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:56:en"
  };

  window.CONTENT_I18N["python:57"] = window.CONTENT_I18N["python:57"] || {};
  window.CONTENT_I18N["python:57"].fr = {
    title: "Comparaison chaînée (and02.py)",
    concept: "Python permet les **comparaisons chaînées** pour un code plus propre. Au lieu d'écrire `if a < 10 and a >= 0`, vous pouvez écrire :\n\n```\nif 0 <= a < 10:\n    print('a est entre 0 et 9')\n```\n\nCela se lit naturellement comme une inégalité mathématique et est plus lisible que d'utiliser `and`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:57:en"
  };

  window.CONTENT_I18N["python:58"] = window.CONTENT_I18N["python:58"] || {};
  window.CONTENT_I18N["python:58"].fr = {
    title: "OU logique (or) (or01.py)",
    concept: "L'opérateur `or` combine plusieurs conditions. Le résultat global est `True` si **au moins une** des conditions est `True`.\n\n```\nif a > 10 or a <= 0:\n    print('a est en dehors de l'intervalle 0-10')\n```\n\n`or` est `True` quand l'un des côtés (ou les deux) est `True`. Il est `False` seulement quand les deux côtés sont `False`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:58:en"
  };

  window.CONTENT_I18N["python:59"] = window.CONTENT_I18N["python:59"] || {};
  window.CONTENT_I18N["python:59"].fr = {
    title: "NON logique (not) (not01.py)",
    concept: "L'opérateur `not` **inverse** une valeur booléenne. `not True` devient `False`, et `not False` devient `True`.\n\n```\nif not a < 10:\n    print('a N'est PAS inférieur à 10')\n```\n\n`not` est un opérateur unaire — il agit sur une seule condition ou valeur, inversant sa valeur de vérité.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:59:en"
  };

  window.CONTENT_I18N["python:60"] = window.CONTENT_I18N["python:60"] || {};
  window.CONTENT_I18N["python:60"].fr = {
    title: "Inversion booléenne (not02.py)",
    concept: "Utilisez `not` pour inverser une valeur booléenne stockée dans une variable :\n\n```\nb = False\nif not b:\n    print('b n'est pas True')\n```\n\nComme `not False` est égal à `True`, le bloc `if` s'exécute.\n\n**Pièges courants :** N'oubliez pas le deux-points `:` après la ligne `if`, et utilisez une indentation de 4 espaces pour le bloc de code.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:60:en"
  };
  window.CONTENT_I18N["python:61"] = window.CONTENT_I18N["python:61"] || {};
  window.CONTENT_I18N["python:61"].fr = {
    title: "Chronique : Vérification d'existence de valeur (column01.py)",
    concept: "L'opérateur `not` inverse le résultat d'une condition. `not True` devient `False`, et `not False` devient `True`. Cette chronique aborde également l'évaluation de la véracité des valeurs numériques dans les expressions conditionnelles.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:61:en"
  };

  window.CONTENT_I18N["python:62"] = window.CONTENT_I18N["python:62"] || {};
  window.CONTENT_I18N["python:62"].fr = {
    title: "Chronique : Opérateur ternaire (Expression conditionnelle) (column02.py)",
    concept: "L'opérateur `not` inverse le résultat d'une condition. `not True` devient `False`, et `not False` devient `True`. Cette chronique aborde l'utilisation des expressions conditionnelles (opérateur ternaire) pour une assignation de valeur concise basée sur une condition.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:62:en"
  };

  window.CONTENT_I18N["python:63"] = window.CONTENT_I18N["python:63"] || {};
  window.CONTENT_I18N["python:63"].fr = {
    title: "Exercice : Positif, négatif ou zéro (script4-1.py)",
    concept: "**Exercice pratique du Chapitre 4 (script4-1.py)**\n\nTâche : Déterminer si un entier est positif, négatif ou nul.\n\nConsultez le code modèle dans l'éditeur et remplissez les parties manquantes pour compléter le programme. Appuyez sur le bouton Exécuter à droite pour vérifier le résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:63:en"
  };

  window.CONTENT_I18N["python:64"] = window.CONTENT_I18N["python:64"] || {};
  window.CONTENT_I18N["python:64"].fr = {
    title: "Exercice : Comparer deux nombres (script4-2.py)",
    concept: "**Exercice pratique du Chapitre 4 (script4-2.py)**\n\nTâche : Saisir deux nombres à virgule flottante et comparer leurs grandeurs.\n\nConsultez le code modèle dans l'éditeur et remplissez les parties manquantes pour compléter le programme. Appuyez sur le bouton Exécuter à droite pour vérifier le résultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:64:en"
  };

  window.CONTENT_I18N["python:65"] = window.CONTENT_I18N["python:65"] || {};
  window.CONTENT_I18N["python:65"].fr = {
    title: "Exercice : Salutation automatique selon l'heure (script4-3.py)",
    concept: "**Exercice pratique du Chapitre 4 (script4-3.py)**\n\nTâche : Afficher une salutation basée sur une saisie d'heure au format 24h.\n\nConsultez le code modèle dans l'éditeur et remplissez les parties manquantes. Utilisez des comparaisons chaînées et `or` pour vérifier plusieurs plages horaires.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:65:en"
  };

  window.CONTENT_I18N["python:66"] = window.CONTENT_I18N["python:66"] || {};
  window.CONTENT_I18N["python:66"].fr = {
    title: "Créer et afficher une liste (list01.py)",
    concept: "Une **liste** est une collection qui stocke plusieurs valeurs ensemble, comme un tableau. Créez une liste en utilisant des crochets `[]` avec des éléments séparés par des virgules. Accédez aux éléments avec `liste[index]`. Rappelez-vous que **l'indexation commence à 0**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:66:en"
  };

  window.CONTENT_I18N["python:67"] = window.CONTENT_I18N["python:67"] || {};
  window.CONTENT_I18N["python:67"].fr = {
    title: "Listes imbriquées (list02.py)",
    concept: "Une **liste** est une collection qui stocke plusieurs valeurs ensemble. Les listes peuvent être **imbriquées** — une liste peut contenir une autre liste comme élément. Créez des listes avec des crochets `[]`. Les éléments sont accessibles via `liste[index]`, et **l'indexation commence à 0**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:67:en"
  };

  window.CONTENT_I18N["python:68"] = window.CONTENT_I18N["python:68"] || {};
  window.CONTENT_I18N["python:68"].fr = {
    title: "Accéder aux éléments par index (list03.py)",
    concept: "Une **liste** stocke plusieurs valeurs entre crochets `[]`. Accédez aux éléments individuels avec `liste[index]`. **L'indexation commence à 0**, donc `liste[0]` donne le premier élément, `liste[1]` le deuxième, et ainsi de suite.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:68:en"
  };

  window.CONTENT_I18N["python:69"] = window.CONTENT_I18N["python:69"] || {};
  window.CONTENT_I18N["python:69"].fr = {
    title: "Utiliser les indices négatifs (list04.py)",
    concept: "Une **liste** stocke plusieurs valeurs entre crochets `[]`. Python prend en charge **l'indexation négative** : `liste[-1]` renvoie le dernier élément, `liste[-2]` renvoie l'avant-dernier, etc. C'est un moyen pratique d'accéder aux éléments depuis la fin d'une liste.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:69:en"
  };

  window.CONTENT_I18N["python:70"] = window.CONTENT_I18N["python:70"] || {};
  window.CONTENT_I18N["python:70"].fr = {
    title: "Tranche : Obtenir une plage d'éléments (list05.py)",
    concept: "Une **liste** stocke plusieurs valeurs entre crochets `[]`. Utilisez le **tranchage** (`liste[debut:fin]`) pour extraire une sous-liste. L'index de debut est inclus, mais l'index de fin est **exclu**. Par exemple, `lst[1:3]` renvoie les elements aux positions 1 et 2.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:70:en"
  };

  window.CONTENT_I18N["python:71"] = window.CONTENT_I18N["python:71"] || {};
  window.CONTENT_I18N["python:71"].fr = {
    title: "Omettre le debut et la fin d'une tranche (list06.py)",
    concept: "Une **liste** stocke plusieurs valeurs entre crochets `[]`. Dans une tranche `liste[debut:fin]`, vous pouvez **omettre** l'index de debut ou de fin. `lst[:2]` prend les elements du debut jusqu'a (sans inclure) l'index 2. `lst[1:]` prend les elements de l'index 1 jusqu'a la fin.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:71:en"
  };

  window.CONTENT_I18N["python:72"] = window.CONTENT_I18N["python:72"] || {};
  window.CONTENT_I18N["python:72"].fr = {
    title: "Depaquetage de liste (list07.py)",
    concept: "Les operations courantes sur les listes incluent :\n\n- `append(valeur)` — Ajouter a la fin\n- `insert(position, valeur)` — Insérer a une position specifique\n- `pop(position)` — Supprimer et retourner un element a une position\n- `remove(valeur)` — Supprimer le premier element correspondant\n- `del liste[position]` — Supprimer par position\n\nLe **depaquetage** assigne chaque element de la liste a une variable : `a, b, c = lst`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:72:en"
  };

  window.CONTENT_I18N["python:73"] = window.CONTENT_I18N["python:73"] || {};
  window.CONTENT_I18N["python:73"].fr = {
    title: "Erreur de non-correspondance du nombre d'elements lors du depaquetage (list08.py)",
    concept: "Les operations courantes sur les listes incluent `append()`, `insert()`, `pop()`, `remove()` et `del`. Lors du depaquetage d'une liste en variables, le nombre de variables **doit correspondre** au nombre d'elements. Si vous ecrivez `a, b = lst` mais que `lst` a 3 elements, Python leve une **ValueError**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:73:en"
  };

  window.CONTENT_I18N["python:74"] = window.CONTENT_I18N["python:74"] || {};
  window.CONTENT_I18N["python:74"].fr = {
    title: "Vérifier l'existence avec `in` (list09.py)",
    concept: "Les operations courantes sur les listes incluent `append()`, `insert()`, `pop()`, `remove()` et `del`. Utilisez l'operateur `in` pour vérifier si une valeur existe dans une liste : `'abc' in lst` renvoie `True` ou `False`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:74:en"
  };

  window.CONTENT_I18N["python:75"] = window.CONTENT_I18N["python:75"] || {};
  window.CONTENT_I18N["python:75"].fr = {
    title: "Trouver la position d'un element avec index() (list10.py)",
    concept: "Les operations courantes sur les listes incluent `append()`, `insert()`, `pop()`, `remove()` et `del`. Utilisez `liste.index(valeur)` pour trouver la position d'un element specifique. Si l'element n'existe pas, Python leve une **ValueError**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:75:en"
  };

  window.CONTENT_I18N["python:76"] = window.CONTENT_I18N["python:76"] || {};
  window.CONTENT_I18N["python:76"].fr = {
    title: "Modifier les elements par index (list11.py)",
    concept: "Les operations courantes sur les listes incluent `append()`, `insert()`, `pop()`, `remove()` et `del`. Vous pouvez modifier un element de liste en assignant une nouvelle valeur a un index : `lst[1] = 6.2`. Les listes sont **mutables**, ce qui signifie que leur contenu peut etre modifie apres la creation.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:76:en"
  };

  window.CONTENT_I18N["python:77"] = window.CONTENT_I18N["python:77"] || {};
  window.CONTENT_I18N["python:77"].fr = {
    title: "Concaténer des listes avec += (list12.py)",
    concept: "Les operations courantes sur les listes incluent `append()`, `insert()`, `pop()`, `remove()` et `del`. Utilisez l'operateur `+=` pour étendre une liste avec des elements d'une autre liste : `lst += [20]` ajoute 20 a la fin de `lst`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:77:en"
  };

  window.CONTENT_I18N["python:78"] = window.CONTENT_I18N["python:78"] || {};
  window.CONTENT_I18N["python:78"].fr = {
    title: "Ajouter des elements avec append() (list13.py)",
    concept: "Les operations courantes sur les listes incluent `append()`, `insert()`, `pop()`, `remove()` et `del`. Utilisez `liste.append(valeur)` pour ajouter un seul element a la **fin** d'une liste. C'est la façon la plus courante de faire croître une liste dynamiquement.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:78:en"
  };

  window.CONTENT_I18N["python:79"] = window.CONTENT_I18N["python:79"] || {};
  window.CONTENT_I18N["python:79"].fr = {
    title: "Insérer des elements a une position avec insert() (list14.py)",
    concept: "Les operations avancees sur les listes incluent la recherche, le tri et la copie :\n\n- `index(valeur)` — Obtenir l'index d'une valeur\n- `count(valeur)` — Compter les elements correspondants\n- `sort()` — Trier par ordre croissant\n- `reverse()` — Inverser l'ordre\n- `copy()` — Créer une copie superficielle\n\nUtilisez `insert(position, valeur)` pour insérer a un index specifique.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:79:en"
  };

  window.CONTENT_I18N["python:80"] = window.CONTENT_I18N["python:80"] || {};
  window.CONTENT_I18N["python:80"].fr = {
    title: "Supprimer des elements avec del (list15.py)",
    concept: "Les operations avancees sur les listes incluent `index()`, `count()`, `sort()`, `reverse()` et `copy()`. Utilisez `del liste[index]` pour supprimer definitivement un element a une position specifique d'une liste ou d'un dictionnaire.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:80:en"
  };

  window.CONTENT_I18N["python:81"] = window.CONTENT_I18N["python:81"] || {};
  window.CONTENT_I18N["python:81"].fr = {
    title: "Extraire et supprimer des elements avec pop() (list16.py)",
    concept: "Les operations avancees sur les listes incluent `index()`, `count()`, `sort()`, `reverse()` et `copy()`. Utilisez `liste.pop(index)` pour **supprimer et retourner** un element a une position donnee. Si aucun index n'est fourni, `pop()` supprime et retourne le **dernier** element.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:81:en"
  };

  window.CONTENT_I18N["python:82"] = window.CONTENT_I18N["python:82"] || {};
  window.CONTENT_I18N["python:82"].fr = {
    title: "Supprimer par valeur avec remove() (list17.py)",
    concept: "Les operations avancees sur les listes incluent `index()`, `count()`, `sort()`, `reverse()` et `copy()`. Utilisez `liste.remove(valeur)` pour supprimer la **premiere occurrence** d'une valeur specifique de la liste. Si la valeur n'est pas trouvee, Python leve une **ValueError**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:82:en"
  };

  window.CONTENT_I18N["python:83"] = window.CONTENT_I18N["python:83"] || {};
  window.CONTENT_I18N["python:83"].fr = {
    title: "Suppression securisee en verifiant l'existence d'abord (list18.py)",
    concept: "Les operations avancees sur les listes incluent `index()`, `count()`, `sort()`, `reverse()` et `copy()`. Pour eviter les erreurs lors de la suppression, verifiez d'abord si la valeur existe en utilisant `in` : `if 'XYZ' in lst:` avant d'appeler `lst.remove('XYZ')`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:83:en"
  };

  window.CONTENT_I18N["python:84"] = window.CONTENT_I18N["python:84"] || {};
  window.CONTENT_I18N["python:84"].fr = {
    title: "Obtenir la longueur d'une liste avec len() (list19.py)",
    concept: "Les operations avancees sur les listes incluent `index()`, `count()`, `sort()`, `reverse()` et `copy()`. Utilisez `len(liste)` pour obtenir le nombre d'elements dans une liste. `len()` est une fonction integree Python qui fonctionne sur les listes, tuples, chaines et autres collections.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:84:en"
  };

  window.CONTENT_I18N["python:85"] = window.CONTENT_I18N["python:85"] || {};
  window.CONTENT_I18N["python:85"].fr = {
    title: "Obtenir le dernier element en toute securite (list20.py)",
    concept: "Les operations avancees sur les listes incluent `index()`, `count()`, `sort()`, `reverse()` et `copy()`. Pour obtenir le dernier element en toute securite, utilisez `liste[len(liste) - 1]`. Vous pouvez aussi utiliser l'indexation negative : `liste[-1]` est plus simple et plus courant.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:85:en"
  };

  window.CONTENT_I18N["python:86"] = window.CONTENT_I18N["python:86"] || {};
  window.CONTENT_I18N["python:86"].fr = {
    title: "Chronique : min() et max() (listcolumn01.py)",
    concept: "Les operations avancees sur les listes incluent `index()`, `count()`, `sort()`, `reverse()` et `copy()`. Utilisez `min(liste)` pour obtenir la plus petite valeur et `max(liste)` pour obtenir la plus grande valeur. Ces fonctions integrees fonctionnent sur tout iterable d'elements comparables.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:86:en"
  };

  window.CONTENT_I18N["python:87"] = window.CONTENT_I18N["python:87"] || {};
  window.CONTENT_I18N["python:87"].fr = {
    title: "Chronique : Erreur d'extremum avec types mixtes (listcolumn02.py)",
    concept: "Les operations avancees sur les listes incluent `index()`, `count()`, `sort()`, `reverse()` et `copy()`. `min()` et `max()` ne **fonctionnent pas** sur les listes contenant des types mixtes (ex. nombres et chaines). Essayer de comparer des types incompatibles leve une **TypeError**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:87:en"
  };

  window.CONTENT_I18N["python:88"] = window.CONTENT_I18N["python:88"] || {};
  window.CONTENT_I18N["python:88"].fr = {
    title: "Erreur de modification de tuple (tuple01.py)",
    concept: "Un **tuple** est similaire a une liste, mais ses elements **ne peuvent pas etre modifies, ajoutes ou supprimes** apres la creation. Creez un tuple avec des parentheses `()`. Utilisez les tuples lorsque vous voulez proteger les donnees contre les modifications accidentelles.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:88:en"
  };

  window.CONTENT_I18N["python:89"] = window.CONTENT_I18N["python:89"] || {};
  window.CONTENT_I18N["python:89"].fr = {
    title: "Creer et utiliser des tuples (tuple02.py)",
    concept: "Un **tuple** est similaire a une liste, mais ses elements **ne peuvent pas etre modifies, ajoutes ou supprimes** apres la creation. Creez un tuple avec des parentheses `()`. Les tuples sont **immuables** — utilisez-les lorsque les donnees doivent rester constantes tout au long du programme.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:89:en"
  };

  window.CONTENT_I18N["python:90"] = window.CONTENT_I18N["python:90"] || {};
  window.CONTENT_I18N["python:90"].fr = {
    title: "Creer des tuples a un seul element (tuple03.py)",
    concept: "Un **tuple** est une collection immuable creee avec des parentheses `()`. Pour creer un tuple avec un element, vous **devez** inclure une virgule finale : `(10,)`. Ecrire `(10)` sans la virgule cree un entier, pas un tuple.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:90:en"
  };

  window.CONTENT_I18N["python:91"] = window.CONTENT_I18N["python:91"] || {};
  window.CONTENT_I18N["python:91"].fr = {
    title: "Acceder aux elements et decouper les tuples (tuple04.py)",
    concept: "Un **tuple** est une collection immuable creee avec des parentheses `()`. Meme si les tuples ne peuvent pas etre modifies, vous **pouvez** lire les elements en utilisant l'indexation (`tpl[1]`) et le decoupage (`tpl[1:3]`) — tout comme les listes.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:91:en"
  };

  window.CONTENT_I18N["python:92"] = window.CONTENT_I18N["python:92"] || {};
  window.CONTENT_I18N["python:92"].fr = {
    title: "Obtenir la longueur d'un tuple avec len() (tuple05.py)",
    concept: "Un **tuple** est une collection immuable creee avec des parentheses `()`. Utilisez `len(tuple)` pour obtenir le nombre d'elements. L'operateur `in` fonctionne aussi avec les tuples : `3.14 in tpl` retourne `True` ou `False`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:92:en"
  };

  window.CONTENT_I18N["python:93"] = window.CONTENT_I18N["python:93"] || {};
  window.CONTENT_I18N["python:93"].fr = {
    title: "Chronique : Conversion entre listes et tuples (tuplecolumun.py)",
    concept: "Un **tuple** est une collection immuable. Convertissez un tuple en liste avec `list(tuple)` pour le rendre mutable. Convertissez une liste en tuple avec `tuple(liste)` pour la rendre immuable. Cette conversion est utile lorsque vous devez modifier temporairement des donnees d'un tuple.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:93:en"
  };

  window.CONTENT_I18N["python:94"] = window.CONTENT_I18N["python:94"] || {};
  window.CONTENT_I18N["python:94"].fr = {
    title: "Creer et afficher un dictionnaire (jisho01.py)",
    concept: "Un **dictionnaire (dict)** stocke des paires cle-valeur. Creez un dictionnaire avec des accolades `{}` en utilisant la syntaxe `{cle: valeur}`. Accedez aux elements par leur cle en utilisant `dict[cle]`, pas par index numerique. Les cles sont uniques et offrent des recherches rapides.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:94:en"
  };

  window.CONTENT_I18N["python:95"] = window.CONTENT_I18N["python:95"] || {};
  window.CONTENT_I18N["python:95"].fr = {
    title: "Comportement en cas de duplication de cles (jisho02.py)",
    concept: "Un **dictionnaire (dict)** stocke des paires cle-valeur en utilisant des accolades `{}`. Les cles du dictionnaire doivent etre **uniques**. Si vous specifiez la meme cle deux fois, la **derniere valeur ecrase** la precedente. Aucune erreur n'est levee — la valeur de la cle dupliquee est simplement remplacee.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:95:en"
  };

  window.CONTENT_I18N["python:96"] = window.CONTENT_I18N["python:96"] || {};
  window.CONTENT_I18N["python:96"].fr = {
    title: "Obtenir des valeurs par cle (jisho03.py)",
    concept: "Un **dictionnaire (dict)** stocke des paires cle-valeur. Recuperez une valeur par sa cle en utilisant la notation par crochets : `dct[cle]`. Si la cle n'existe pas, Python leve une **KeyError**. Contrairement aux listes, les dictionnaires n'utilisent pas d'indices numeriques.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:96:en"
  };

  window.CONTENT_I18N["python:97"] = window.CONTENT_I18N["python:97"] || {};
  window.CONTENT_I18N["python:97"].fr = {
    title: "Erreur de decoupage non pris en charge pour les dictionnaires (jisho04.py)",
    concept: "Un **dictionnaire (dict)** stocke des paires cle-valeur. Les dictionnaires **ne prennent pas en charge le decoupage** comme les listes. Essayer d'utiliser la notation de tranche comme `dct[:2]` sur un dictionnaire leve une **TypeError**, car les dictionnaires ne sont pas ordonnes et sont accedes par cle, pas par position.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:97:en"
  };

  window.CONTENT_I18N["python:98"] = window.CONTENT_I18N["python:98"] || {};
  window.CONTENT_I18N["python:98"].fr = {
    title: "Recuperation securisee avec get() (jisho05.py)",
    concept: "Un **dictionnaire (dict)** stocke des paires cle-valeur. Utilisez `dict.get(cle)` pour un acces securise — il retourne `None` (ou une valeur par defaut) si la cle n'existe pas, au lieu de lever une **KeyError**. Par exemple, `dct.get(999, 'non trouve')` retourne `'non trouve'` si la cle 999 est manquante.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:98:en"
  };

  window.CONTENT_I18N["python:99"] = window.CONTENT_I18N["python:99"] || {};
  window.CONTENT_I18N["python:99"].fr = {
    title: "Mettre a jour les valeurs par cle (jisho06.py)",
    concept: "Les operations sur les dictionnaires incluent :\n\n- `d[nouvelle_cle] = valeur` — Ajouter une nouvelle paire cle-valeur\n- `d[cle_existante] = valeur` — Mettre a jour une valeur existante\n- `d.get(cle)` — Recuperer une valeur en toute securite\n- `d.pop(cle)` — Supprimer une cle et retourner sa valeur\n- `d.keys()` — Obtenir toutes les cles, `d.values()` — Obtenir toutes les valeurs",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:99:en"
  };

  window.CONTENT_I18N["python:100"] = window.CONTENT_I18N["python:100"] || {};
  window.CONTENT_I18N["python:100"].fr = {
    title: "Ajouter de nouvelles paires cle-valeur (jisho07.py)",
    concept: "Les operations sur les dictionnaires incluent l'ajout, la mise a jour et la suppression d'entrees. Pour ajouter une nouvelle paire cle-valeur, assignez une valeur a une nouvelle cle : `dct[201] = 'ABC'`. Si la cle existe deja, la valeur sera **mise a jour** a la place.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:100:en"
  };

  window.CONTENT_I18N["python:101"] = window.CONTENT_I18N["python:101"] || {};
  window.CONTENT_I18N["python:101"].fr = {
    title: "Supprimer des elements du dictionnaire avec del (jisho08.py)",
    concept: "Les operations sur les dictionnaires incluent l'ajout, la mise a jour et la suppression d'entrees. Utilisez `del dict[cle]` pour supprimer une paire cle-valeur specifique. Si la cle n'existe pas, Python leve une **KeyError**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:101:en"
  };

  window.CONTENT_I18N["python:102"] = window.CONTENT_I18N["python:102"] || {};
  window.CONTENT_I18N["python:102"].fr = {
    title: "Erreur lors de la suppression d'une cle inexistante (jisho09.py)",
    concept: "Les operations sur les dictionnaires incluent l'ajout, la mise a jour et la suppression d'entrees. Utiliser `del dict[cle]` sur une cle qui **n'existe pas** leve une **KeyError**. Verifiez toujours l'existence avec `in` ou utilisez la methode `pop()` pour gerer les cles manquantes en toute securite.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:102:en"
  };

  window.CONTENT_I18N["python:103"] = window.CONTENT_I18N["python:103"] || {};
  window.CONTENT_I18N["python:103"].fr = {
    title: "Suppression securisee en verifiant l'existence d'abord (jisho10.py)",
    concept: "Les operations sur les dictionnaires incluent l'ajout, la mise a jour et la suppression d'entrees. Pour supprimer en toute securite, verifiez d'abord si la cle existe avec `in` : `if 999 in dct:` avant d'appeler `del dct[999]`. Cela empeche une **KeyError**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:103:en"
  };

  window.CONTENT_I18N["python:104"] = window.CONTENT_I18N["python:104"] || {};
  window.CONTENT_I18N["python:104"].fr = {
    title: "Obtenir toutes les cles avec keys() (jisho11.py)",
    concept: "Les operations sur les dictionnaires incluent l'ajout, la mise a jour et la suppression d'entrees. Utilisez `dict.keys()` pour obtenir une vue dynamique de toutes les cles. Les modifications du dictionnaire sont reflechies dans la vue des cles. Utilisez `list(dict.keys())` pour la convertir en liste.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:104:en"
  };

  window.CONTENT_I18N["python:105"] = window.CONTENT_I18N["python:105"] || {};
  window.CONTENT_I18N["python:105"].fr = {
    title: "Obtenir les paires cle-valeur avec items() (jisho12.py)",
    concept: "Les operations sur les dictionnaires incluent l'ajout, la mise a jour et la suppression d'entrees. Utilisez `dict.items()` pour obtenir une vue dynamique de toutes les paires cle-valeur sous forme de tuples. Les modifications du dictionnaire sont reflechies dans la vue des elements.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:105:en"
  };

  window.CONTENT_I18N["python:106"] = window.CONTENT_I18N["python:106"] || {};
  window.CONTENT_I18N["python:106"].fr = {
    title: "Verifier l'existence d'une valeur avec values() (jisho_values01.py)",
    concept: "Les operations sur les dictionnaires incluent l'ajout, la mise a jour et la suppression d'entrees. Utilisez `dict.values()` pour obtenir une vue de toutes les valeurs. Combine avec `in`, vous pouvez verifier si une valeur existe : `if 'xyz' in dct.values():`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:106:en"
  };

  window.CONTENT_I18N["python:107"] = window.CONTENT_I18N["python:107"] || {};
  window.CONTENT_I18N["python:107"].fr = {
    title: "Creer des ensembles avec set() (shugou01.py)",
    concept: "Un **ensemble (set)** est une collection qui **ne contient aucun element duplique** et **n'a pas d'ordre defini**. Creez un ensemble en utilisant des accolades `{}` ou la fonction `set()`. Les ensembles prennent en charge les operations mathematiques comme **l'intersection** (`&`) et **l'union** (`|`).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:107:en"
  };

  window.CONTENT_I18N["python:108"] = window.CONTENT_I18N["python:108"] || {};
  window.CONTENT_I18N["python:108"].fr = {
    title: "Creer des ensembles avec des litteraux et deduplication (shugou02.py)",
    concept: "Un **ensemble (set)** **ne contient aucun element duplique** et **n'a pas d'ordre defini**. Creez un ensemble directement avec des accolades : `{10, 3.14, 'abc', 10}`. Les valeurs dupliquees comme 10 sont automatiquement supprimees — l'ensemble les deduplique.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:108:en"
  };

  window.CONTENT_I18N["python:109"] = window.CONTENT_I18N["python:109"] || {};
  window.CONTENT_I18N["python:109"].fr = {
    title: "Verifier l'existence d'un element dans un ensemble (shugou03.py)",
    concept: "Un **ensemble (set)** **ne contient aucun element duplique** et **n'a pas d'ordre defini**. Utilisez l'operateur `in` pour verifier si une valeur existe dans un ensemble : `if 3.14 in st:`. Le test d'appartenance a un ensemble est tres rapide (moyenne O(1)).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:109:en"
  };

  window.CONTENT_I18N["python:110"] = window.CONTENT_I18N["python:110"] || {};
  window.CONTENT_I18N["python:110"].fr = {
    title: "Supprimer des elements avec remove() (shugou04.py)",
    concept: "Un **ensemble (set)** **ne contient aucun element duplique** et **n'a pas d'ordre defini**. Utilisez `set.remove(valeur)` pour supprimer un element. Si l'element n'existe pas, `remove()` leve une **KeyError**. Utilisez `set.discard(valeur)` a la place pour supprimer en toute securite sans erreur.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:110:en"
  };

  window.CONTENT_I18N["python:111"] = window.CONTENT_I18N["python:111"] || {};
  window.CONTENT_I18N["python:111"].fr = {
    title: "Ajouter des elements avec add() (shugou05.py)",
    concept: "Un ensemble est une collection qui ne contient aucun element duplique et n'a pas d'ordre defini. Creez un ensemble en utilisant des accolades `{}` ou la fonction `set()`. Les ensembles prennent en charge les operations mathematiques comme l'intersection (`&`) et l'union (`|`). Pour ajouter un element a un ensemble, utilisez `set.add(valeur)`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:111:en"
  };

  window.CONTENT_I18N["python:112"] = window.CONTENT_I18N["python:112"] || {};
  window.CONTENT_I18N["python:112"].fr = {
    title: "Dedupliquer une liste en utilisant un ensemble (set_list.py)",
    concept: "Pour supprimer les doublons d'une liste, une technique Python courante consiste a convertir la liste en ensemble avec `set()` (qui supprime automatiquement les doublons), puis la reconvertir en liste avec `list()`. C'est un moyen rapide et concis de dedupliquer des donnees.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:112:en"
  };

  window.CONTENT_I18N["python:113"] = window.CONTENT_I18N["python:113"] || {};
  window.CONTENT_I18N["python:113"].fr = {
    title: "Exercice : Creer et afficher une liste de scores (script5-1.py)",
    concept: "**Exercice pratique du Chapitre 5 (script5-1.py)**\n\nTache : Creer une liste de scores et l'afficher.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:113:en"
  };

  window.CONTENT_I18N["python:114"] = window.CONTENT_I18N["python:114"] || {};
  window.CONTENT_I18N["python:114"].fr = {
    title: "Exercice : Calculer le total et la moyenne en utilisant les index de liste (script5-2.py)",
    concept: "**Exercice pratique du Chapitre 5 (script5-2.py)**\n\nTache : Calculer le total et la moyenne des scores en accedant aux elements de la liste par index.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:114:en"
  };

  window.CONTENT_I18N["python:115"] = window.CONTENT_I18N["python:115"] || {};
  window.CONTENT_I18N["python:115"].fr = {
    title: "Exercice : Supprimer des elements de liste en toute securite (script5-3.py)",
    concept: "**Exercice pratique du Chapitre 5 (script5-3.py)**\n\nTache : Supprimer des elements d'une liste en toute securite.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:115:en"
  };


  window.CONTENT_I18N["python:116"] = window.CONTENT_I18N["python:116"] || {};
  window.CONTENT_I18N["python:116"].fr = {
    title: "Exercice : Definir un dictionnaire de noms d'etudiants et de notes (script5-4.py)",
    concept: "**Exercice pratique du Chapitre 5 (script5-4.py)**\n\nTache : Definir un dictionnaire stockant les noms des etudiants et leurs notes.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:116:en"
  };

  window.CONTENT_I18N["python:117"] = window.CONTENT_I18N["python:117"] || {};
  window.CONTENT_I18N["python:117"].fr = {
    title: "Exercice : Definir un dictionnaire imbrique pour plusieurs matieres (script5-5.py)",
    concept: "**Exercice pratique du Chapitre 5 (script5-5.py)**\n\nTache : Definir un dictionnaire imbrique qui stocke les notes des etudiants dans plusieurs matieres.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:117:en"
  };

  window.CONTENT_I18N["python:118"] = window.CONTENT_I18N["python:118"] || {};
  window.CONTENT_I18N["python:118"].fr = {
    title: "Exercice : Recherche securisee dans un dictionnaire imbrique (script5-6.py)",
    concept: "**Exercice pratique du Chapitre 5 (script5-6.py)**\n\nTache : Saisir un nom d'etudiant pour consulter ses notes par matiere dans un dictionnaire imbrique.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes. Utilisez `in` pour verifier l'existence de la cle avant d'acceder au dictionnaire afin d'eviter KeyError.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:118:en"
  };

  window.CONTENT_I18N["python:119"] = window.CONTENT_I18N["python:119"] || {};
  window.CONTENT_I18N["python:119"].fr = {
    title: "Generer des valeurs consecutives avec range() (kurikaeshi01.py)",
    concept: "Utilisez la boucle `for` pour repeter un processus un nombre de fois specifie. `for i in range(5):` assigne les entiers de 0 a 4 a la variable `i` et se repete 5 fois. `range(start, stop)` definit un debut et une fin exclusive. `range(start, stop, step)` ajoute une valeur de pas.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:119:en"
  };

  window.CONTENT_I18N["python:120"] = window.CONTENT_I18N["python:120"] || {};
  window.CONTENT_I18N["python:120"].fr = {
    title: "Specifier le debut et la fin de range() (kurikaeshi02.py)",
    concept: "Utilisez la boucle `for` pour repeter un processus un nombre de fois specifie. `for i in range(5):` assigne les entiers de 0 a 4 a la variable `i`. `range(3, 5)` produit 3 a 4 (la valeur de fin est exclusive). Utilisez `range(start, stop)` pour controler les points de debut et de fin.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:120:en"
  };

  window.CONTENT_I18N["python:121"] = window.CONTENT_I18N["python:121"] || {};
  window.CONTENT_I18N["python:121"].fr = {
    title: "Specifier un pas positif dans range() (kurikaeshi03.py)",
    concept: "Utilisez la boucle `for` pour repeter un processus un nombre de fois specifie. `range(1, 5, 2)` produit 1, 3 — le troisieme argument (pas) controle l'increment entre les valeurs. `range(start, stop, step)` genere une progression arithmetique.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:121:en"
  };

  window.CONTENT_I18N["python:122"] = window.CONTENT_I18N["python:122"] || {};
  window.CONTENT_I18N["python:122"].fr = {
    title: "Specifier un pas negatif dans range() (kurikaeshi04.py)",
    concept: "Utilisez la boucle `for` pour repeter un processus un nombre de fois specifie. `range(10, 4, -2)` produit 10, 8, 6 — un pas negatif cree une sequence decroissante. La valeur de depart doit etre superieure a la valeur de fin lors de l'utilisation d'un pas negatif.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:122:en"
  };

  window.CONTENT_I18N["python:123"] = window.CONTENT_I18N["python:123"] || {};
  window.CONTENT_I18N["python:123"].fr = {
    title: "Repeter avec la boucle for (kurikaeshi05.py)",
    concept: "Utilisez la boucle `for` pour repeter un processus un nombre de fois specifie. `for i in range(3):` assigne 0, 1, 2 a la variable `i` sequentiellement, executant le bloc indent a chaque fois. Incluez toujours les deux-points `:` et une indentation de 4 espaces.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:123:en"
  };

  window.CONTENT_I18N["python:124"] = window.CONTENT_I18N["python:124"] || {};
  window.CONTENT_I18N["python:124"].fr = {
    title: "Boucler avec des valeurs decroissantes (kurikaeshi06.py)",
    concept: "Avec une boucle `for`, vous pouvez parcourir une collection en extrayant les elements du debut a la fin. `for item in list:` traite chaque element. Appliquee a un dictionnaire, la boucle extrait les cles par defaut. Un pas negatif dans `range()` cree une boucle decroissante.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:124:en"
  };

  window.CONTENT_I18N["python:125"] = window.CONTENT_I18N["python:125"] || {};
  window.CONTENT_I18N["python:125"].fr = {
    title: "Parcourir une liste par index (kurikaeshi07.py)",
    concept: "Avec une boucle `for`, vous pouvez parcourir une collection en extrayant les elements du debut a la fin. `for i in range(len(lst)):` permet de parcourir une liste en utilisant son index, accedant a chaque element avec `lst[i]`. Les deux-points `:` et l'indentation de 4 espaces sont requis.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:125:en"
  };

  window.CONTENT_I18N["python:126"] = window.CONTENT_I18N["python:126"] || {};
  window.CONTENT_I18N["python:126"].fr = {
    title: "Parcourir directement une liste avec for...in (kurikaeshi08.py)",
    concept: "Avec une boucle `for`, vous pouvez parcourir une collection en extrayant les elements du debut a la fin. `for v in lst:` donne directement chaque element de la liste sans avoir besoin d'un index. Appliquee a un dictionnaire, la boucle extrait les cles par defaut.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:126:en"
  };

  window.CONTENT_I18N["python:127"] = window.CONTENT_I18N["python:127"] || {};
  window.CONTENT_I18N["python:127"].fr = {
    title: "Parcourir un ensemble (set) avec une boucle for (kurikaeshi09.py)",
    concept: "Avec une boucle `for`, vous pouvez parcourir une collection en extrayant les elements du debut a la fin. `for v in st:` fonctionne aussi avec les ensembles, iterant sur chaque element. Rappelez-vous que les ensembles ne sont pas ordonnes, donc l'ordre d'iteration n'est pas garanti. Incluez toujours les deux-points `:` et une indentation correcte.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:127:en"
  };

  window.CONTENT_I18N["python:128"] = window.CONTENT_I18N["python:128"] || {};
  window.CONTENT_I18N["python:128"].fr = {
    title: "Parcourir les cles d'un dictionnaire (kurikaeshi10.py)",
    concept: "Avec une boucle `for`, vous pouvez parcourir une collection en extrayant les elements du debut a la fin. `for k in dct:` itere sur les cles d'un dictionnaire par defaut. Utilisez `dct[k]` a l'interieur de la boucle pour acceder aux valeurs correspondantes.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:128:en"
  };

  window.CONTENT_I18N["python:129"] = window.CONTENT_I18N["python:129"] || {};
  window.CONTENT_I18N["python:129"].fr = {
    title: "Lire les valeurs d'un dictionnaire par cle dans une boucle (kurikaeshi11.py)",
    concept: "Une boucle `while` se repete tant qu'une condition reste `True`. Quand la condition devient `False`, la boucle se termine. Attention a mettre a jour la condition a l'interieur de la boucle, sinon elle deviendra une boucle infinie qui ne s'arrete jamais.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:129:en"
  };

  window.CONTENT_I18N["python:130"] = window.CONTENT_I18N["python:130"] || {};
  window.CONTENT_I18N["python:130"].fr = {
    title: "Parcourir les paires cle-valeur d'un dictionnaire avec items() (kurikaeshi12.py)",
    concept: "Une boucle `while` se repete tant qu'une condition reste `True`. Utilisez `dict.items()` pour obtenir une vue des paires cle-valeur sous forme de tuples. `for kv in dct.items():` itere sur chaque tuple cle-valeur, qui peut ensuite etre depaquete ou accede par index.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:130:en"
  };

  window.CONTENT_I18N["python:131"] = window.CONTENT_I18N["python:131"] || {};
  window.CONTENT_I18N["python:131"].fr = {
    title: "Parcourir les cles et valeurs d'un dictionnaire avec depaquetage (kurikaeshi13.py)",
    concept: "Une boucle `while` se repete tant qu'une condition reste `True`. Utilisez le depaquetage de tuple dans une boucle `for` : `for k, v in dct.items():` assigne chaque cle et valeur directement aux variables `k` et `v`, rendant le code plus propre et plus lisible.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:131:en"
  };

  window.CONTENT_I18N["python:132"] = window.CONTENT_I18N["python:132"] || {};
  window.CONTENT_I18N["python:132"].fr = {
    title: "Boucle conditionnelle avec while (kurikaeshi14.py)",
    concept: "Quand une instruction `break` est executee a l'interieur d'une boucle, elle termine la boucle immediatement, et l'execution continue avec le code apres la boucle. `break` est couramment combine avec une instruction `if` pour sortir d'une boucle quand une condition est remplie.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:132:en"
  };

  window.CONTENT_I18N["python:133"] = window.CONTENT_I18N["python:133"] || {};
  window.CONTENT_I18N["python:133"].fr = {
    title: "Compteur avec while (kurikaeshi15.py)",
    concept: "Quand une instruction `break` est executee a l'interieur d'une boucle, elle termine la boucle immediatement. Une boucle `while` avec une variable compteur est un motif courant : mettez a jour le compteur a l'interieur de la boucle pour que la condition devienne eventuellement `False` et que la boucle se termine naturellement.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:133:en"
  };

  window.CONTENT_I18N["python:134"] = window.CONTENT_I18N["python:134"] || {};
  window.CONTENT_I18N["python:134"].fr = {
    title: "Boucle infinie avec while True (kurikaeshi16.py)",
    concept: "Quand une instruction `continue` est executee, le code restant de l'iteration en cours est ignore, et l'execution passe a l'iteration suivante (le haut de la boucle). Comprenez la difference : `break` quitte toute la boucle, tandis que `continue` ne saute que le tour courant.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:134:en"
  };

  window.CONTENT_I18N["python:135"] = window.CONTENT_I18N["python:135"] || {};
  window.CONTENT_I18N["python:135"].fr = {
    title: "Sortir d'une boucle infinie avec break (kurikaeshi17.py)",
    concept: "Quand une instruction `continue` est executee, le code restant de l'iteration en cours est ignore. Utilisez `break` a l'interieur d'une boucle infinie `while True` pour sortir quand une certaine condition est remplie. Ce motif est courant pour les programmes pilotes par menu ou l'utilisateur decide quand quitter.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:135:en"
  };

  window.CONTENT_I18N["python:136"] = window.CONTENT_I18N["python:136"] || {};
  window.CONTENT_I18N["python:136"].fr = {
    title: "Sauter des iterations avec continue (kurikaeshi18.py)",
    concept: "Quand une instruction `continue` est executee, le code restant de l'iteration en cours est ignore, et l'execution passe en haut de la boucle pour l'iteration suivante. `continue` est utile pour ignorer des valeurs indesirables tout en maintenant la boucle active.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:136:en"
  };

  window.CONTENT_I18N["python:137"] = window.CONTENT_I18N["python:137"] || {};
  window.CONTENT_I18N["python:137"].fr = {
    title: "Exercice : Utiliser une boucle for pour additionner les notes d'une liste (script6-1.py)",
    concept: "**Exercice pratique du Chapitre 6 (script6-1.py)**\n\nTache : Calculer le total et la moyenne des notes stockees dans une liste en utilisant une boucle `for`.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:137:en"
  };

  window.CONTENT_I18N["python:138"] = window.CONTENT_I18N["python:138"] || {};
  window.CONTENT_I18N["python:138"].fr = {
    title: "Exercice : Afficher toutes les notes des etudiants avec une boucle sur dictionnaire (script6-2.py)",
    concept: "**Exercice pratique du Chapitre 6 (script6-2.py)**\n\nTache : Utiliser une boucle `for` avec `items()` pour parcourir un dictionnaire et afficher tous les noms des etudiants et leurs notes.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:138:en"
  };

  window.CONTENT_I18N["python:139"] = window.CONTENT_I18N["python:139"] || {};
  window.CONTENT_I18N["python:139"].fr = {
    title: "Exercice : Recherche interactive de notes avec boucle while infinie (script6-3.py)",
    concept: "**Exercice pratique du Chapitre 6 (script6-3.py)**\n\nTache : Implementer une recherche interactive de notes d'etudiant en utilisant une boucle infinie `while True` avec `break`.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:139:en"
  };

  window.CONTENT_I18N["python:140"] = window.CONTENT_I18N["python:140"] || {};
  window.CONTENT_I18N["python:140"].fr = {
    title: "Definir et appeler une fonction sans parametre (kansu01.py)",
    concept: "Une **fonction** est une unite de programme independante qui regroupe plusieurs instructions. Definissez une fonction avec `def nom_fonction():`, indentez le corps, et appelez-la avec `nom_fonction()`. Les fonctions aident a eviter de repeter le meme code.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:140:en"
  };

  window.CONTENT_I18N["python:141"] = window.CONTENT_I18N["python:141"] || {};
  window.CONTENT_I18N["python:141"].fr = {
    title: "Ordre de definition des fonctions et erreurs (kansu02.py)",
    concept: "Une **fonction** est une unite de programme independante qui regroupe plusieurs instructions. En Python, une fonction doit etre **definie avant d'etre appelee**. Si vous appelez une fonction avant de la definir, Python leve une `NameError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:141:en"
  };

  window.CONTENT_I18N["python:142"] = window.CONTENT_I18N["python:142"] || {};
  window.CONTENT_I18N["python:142"].fr = {
    title: "Appeler la meme fonction plusieurs fois (kansu03.py)",
    concept: "Une **fonction** est une unite de programme independante qui regroupe plusieurs instructions. Vous pouvez appeler la meme fonction plusieurs fois, y compris a l'interieur d'une boucle. Chaque appel execute le corps de la fonction depuis le debut, rendant le code reutilisable.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:142:en"
  };

  window.CONTENT_I18N["python:143"] = window.CONTENT_I18N["python:143"] || {};
  window.CONTENT_I18N["python:143"].fr = {
    title: "Definir une fonction avec un seul parametre (kansu04.py)",
    concept: "Une **fonction** est une unite de programme independante qui regroupe plusieurs instructions. Definissez une fonction avec des parametres a l'interieur des parentheses : `def nom_fonction(param):`. Le parametre agit comme une variable qui recoit la valeur passee lors de l'appel de la fonction.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:143:en"
  };

  window.CONTENT_I18N["python:144"] = window.CONTENT_I18N["python:144"] || {};
  window.CONTENT_I18N["python:144"].fr = {
    title: "Passer differents types de donnees comme arguments (kansu05.py)",
    concept: "Une **fonction** est une unite de programme independante qui regroupe plusieurs instructions. Les parametres peuvent accepter des arguments de differents types de donnees. La fonction traite la valeur passee, tant que les operations a l'interieur sont compatibles avec le type de donnees.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:144:en"
  };

  window.CONTENT_I18N["python:145"] = window.CONTENT_I18N["python:145"] || {};
  window.CONTENT_I18N["python:145"].fr = {
    title: "Definir une fonction avec plusieurs parametres (kansu06.py)",
    concept: "Un **parametre** est une information passee a une fonction depuis l'exterieur lors de son appel. Definissez-le a l'interieur des parentheses comme `def cuire(aliment):`. Les fonctions peuvent avoir plusieurs parametres separes par des virgules. L'ordre des arguments doit correspondre a l'ordre des parametres.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:145:en"
  };

  window.CONTENT_I18N["python:146"] = window.CONTENT_I18N["python:146"] || {};
  window.CONTENT_I18N["python:146"].fr = {
    title: "Ordre de passage des arguments et correspondance de type (kansu07.py)",
    concept: "Un **parametre** est une information passee a une fonction depuis l'exterieur lors de son appel. Les arguments sont assignes aux parametres de maniere positionnelle — le premier argument va au premier parametre, et ainsi de suite. L'utilisation de variables comme arguments fonctionne de la meme maniere.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:146:en"
  };

  window.CONTENT_I18N["python:147"] = window.CONTENT_I18N["python:147"] || {};
  window.CONTENT_I18N["python:147"].fr = {
    title: "Parametres de fonction avec valeurs par defaut (kansu09.py)",
    concept: "Un **parametre** est une information passee a une fonction depuis l'exterieur lors de son appel. Les parametres peuvent avoir des valeurs par defaut assignees avec `=`, comme `def cuire(nom='Curry'):`. Quand l'argument est omis, la valeur par defaut est utilisee automatiquement.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:147:en"
  };

  window.CONTENT_I18N["python:148"] = window.CONTENT_I18N["python:148"] || {};
  window.CONTENT_I18N["python:148"].fr = {
    title: "Omettre les arguments par defaut (kansu10.py)",
    concept: "Un **parametre** est une information passee a une fonction depuis l'exterieur lors de son appel. Si un parametre a une valeur par defaut, vous pouvez omettre cet argument lors de l'appel de la fonction. Vous pouvez toujours remplacer la valeur par defaut en passant explicitement une valeur differente.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:148:en"
  };

  window.CONTENT_I18N["python:149"] = window.CONTENT_I18N["python:149"] || {};
  window.CONTENT_I18N["python:149"].fr = {
    title: "Utiliser les arguments nommes (kansu11.py)",
    concept: "Une **valeur de retour** est le resultat qu'une fonction renvoie a l'appelant en utilisant `return valeur`. Quand `return` est execute, la fonction se termine immediatement et renvoie la valeur. Les arguments nommes permettent de specifier quel parametre recoit quelle valeur par son nom.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:149:en"
  };

  window.CONTENT_I18N["python:150"] = window.CONTENT_I18N["python:150"] || {};
  window.CONTENT_I18N["python:150"].fr = {
    title: "Les parametres par defaut doivent venir apres les parametres sans defaut (kansu12.py)",
    concept: "Une **valeur de retour** est le resultat qu'une fonction renvoie a l'appelant en utilisant `return valeur`. En Python, les parametres avec valeurs par defaut doivent etre definis **apres** tous les parametres sans valeur par defaut. Sinon, une `SyntaxError` est levee.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:150:en"
  };

  window.CONTENT_I18N["python:151"] = window.CONTENT_I18N["python:151"] || {};
  window.CONTENT_I18N["python:151"].fr = {
    title: "Arguments de longueur variable (*args) (kansu13.py)",
    concept: "Une **valeur de retour** est le resultat qu'une fonction renvoie a l'appelant en utilisant `return valeur`. Utilisez `*args` pour accepter un nombre variable d'arguments positionnels. `args` devient un tuple a l'interieur de la fonction. Ceci est utile quand vous ne savez pas combien d'arguments seront passes.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:151:en"
  };

  window.CONTENT_I18N["python:152"] = window.CONTENT_I18N["python:152"] || {};
  window.CONTENT_I18N["python:152"].fr = {
    title: "Arguments nommes de longueur variable (**kwargs) (kansu14.py)",
    concept: "Une **valeur de retour** est le resultat qu'une fonction renvoie a l'appelant en utilisant `return valeur`. Utilisez `**kwargs` pour accepter un nombre variable d'arguments nommes. `kwargs` devient un dictionnaire a l'interieur de la fonction, avec les noms de parametres comme cles et les valeurs passees comme valeurs.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:152:en"
  };

  window.CONTENT_I18N["python:153"] = window.CONTENT_I18N["python:153"] || {};
  window.CONTENT_I18N["python:153"].fr = {
    title: "Combiner arguments reguliers et de longueur variable (kansu15.py)",
    concept: "Une **valeur de retour** est le resultat qu'une fonction renvoie a l'appelant en utilisant `return valeur`. Vous pouvez combiner des parametres reguliers, `*args` et `**kwargs` dans une seule definition de fonction. Les parametres reguliers viennent en premier, puis `*args`, puis `**kwargs`. Les arguments nommes peuvent etre passes dans n'importe quel ordre.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:153:en"
  };

  window.CONTENT_I18N["python:154"] = window.CONTENT_I18N["python:154"] || {};
  window.CONTENT_I18N["python:154"].fr = {
    title: "Utilisation avancee des parametres par defaut (kansu16.py)",
    concept: "Lors de la definition d'une fonction, vous pouvez definir des valeurs par defaut pour les parametres comme `def saluer(nom='Invite'):`. Si l'argument est omis lors de l'appel, la valeur par defaut est utilisee. Vous pouvez melanger parametres par defaut et sans defaut, mais tous les parametres par defaut doivent venir apres ceux sans defaut.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:154:en"
  };

  window.CONTENT_I18N["python:155"] = window.CONTENT_I18N["python:155"] || {};
  window.CONTENT_I18N["python:155"].fr = {
    title: "Retourner des valeurs avec return (kansu17.py)",
    concept: "Lors de la definition d'une fonction, vous pouvez definir des valeurs par defaut pour les parametres comme `def saluer(nom='Invite'):`. L'instruction `return` renvoie une valeur de la fonction a l'appelant. Des que `return` est execute, la fonction se termine immediatement. La valeur retournee peut etre stockee dans une variable.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:155:en"
  };

  window.CONTENT_I18N["python:156"] = window.CONTENT_I18N["python:156"] || {};
  window.CONTENT_I18N["python:156"].fr = {
    title: "Exercice : Une fonction pour afficher le total et la moyenne des notes (script7-1.py)",
    concept: "**Exercice pratique du Chapitre 7 (script7-1.py)**\n\nTache : Definir une fonction qui accepte trois notes et affiche leur total et leur moyenne.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:156:en"
  };

  window.CONTENT_I18N["python:157"] = window.CONTENT_I18N["python:157"] || {};
  window.CONTENT_I18N["python:157"].fr = {
    title: "Recevoir une valeur de retour dans une variable (kansu18.py)",
    concept: "Lors de la definition d'une fonction, vous pouvez definir des valeurs par defaut pour les parametres comme `def saluer(nom='Invite'):`. Une fonction peut retourner une valeur qui est capturee par l'appelant. Le code ecrit apres `return` a l'interieur de la fonction n'est jamais execute car `return` quitte la fonction immediatement.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:157:en"
  };

  window.CONTENT_I18N["python:158"] = window.CONTENT_I18N["python:158"] || {};
  window.CONTENT_I18N["python:158"].fr = {
    title: "Terminaison anticipee d'une fonction avec return (kansu19.py)",
    concept: "Lors de la definition d'une fonction, vous pouvez definir des valeurs par defaut pour les parametres comme `def saluer(nom='Invite'):`. L'instruction `return` peut etre utilisee pour quitter une fonction de maniere anticipee. Tout code apres `return` est ignore. Ceci est utile pour les clauses de garde qui valident les entrees en haut d'une fonction.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:158:en"
  };

  window.CONTENT_I18N["python:159"] = window.CONTENT_I18N["python:159"] || {};
  window.CONTENT_I18N["python:159"].fr = {
    title: "Retourner plusieurs valeurs depuis une fonction (depaquetage de tuple) (kansu20.py)",
    concept: "Lors de la definition d'une fonction, vous pouvez definir des valeurs par defaut pour les parametres comme `def saluer(nom='Invite'):`. Python permet de retourner plusieurs valeurs en les separant par des virgules dans l'instruction `return`. Elles sont retournees sous forme de tuple, qui peut etre depaquete en variables separees.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:159:en"
  };

  window.CONTENT_I18N["python:160"] = window.CONTENT_I18N["python:160"] || {};
  window.CONTENT_I18N["python:160"].fr = {
    title: "Variables locales vs variables globales (kansu_a1.py)",
    concept: "Une variable definie a l'interieur d'une fonction est une **variable locale** — elle ne peut etre accedee qu'a l'interieur de cette fonction. Essayer d'utiliser une variable locale en dehors de sa fonction leve une `NameError`. Les variables definies en dehors de toute fonction sont des **variables globales** et peuvent etre accedees depuis n'importe ou.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:160:en"
  };

  window.CONTENT_I18N["python:161"] = window.CONTENT_I18N["python:161"] || {};
  window.CONTENT_I18N["python:161"].fr = {
    title: "Exercice : Une fonction avec valeurs de retour pour le calcul et la recuperation (script7-2.py)",
    concept: "**Exercice pratique du Chapitre 7 (script7-2.py)**\n\nTache : Definir une fonction avec valeurs de retour qui effectue des calculs et recupere des resultats.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:161:en"
  };

  window.CONTENT_I18N["python:162"] = window.CONTENT_I18N["python:162"] || {};
  window.CONTENT_I18N["python:162"].fr = {
    title: "Exercice : Fonction de traitement des notes avec valeurs par defaut et valeurs de retour (script7-3.py)",
    concept: "**Exercice pratique du Chapitre 7 (script7-3.py)**\n\nTache : Definir une fonction de traitement des notes avec des valeurs de parametres par defaut et des valeurs de retour.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:162:en"
  };

  window.CONTENT_I18N["python:163"] = window.CONTENT_I18N["python:163"] || {};
  window.CONTENT_I18N["python:163"].fr = {
    title: "Definition de classe de base et instance vide (class01.py)",
    concept: "Une **classe** est un plan pour creer des objets. Definissez une classe avec `class NomClasse:` et definissez des **variables d'instance (attributs)** a l'interieur pour stocker des donnees. Une instance est creee en appelant la classe comme une fonction : `etu1 = Etudiant()`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:163:en"
  };

  window.CONTENT_I18N["python:164"] = window.CONTENT_I18N["python:164"] || {};
  window.CONTENT_I18N["python:164"].fr = {
    title: "Definition des valeurs initiales du constructeur (class02.py)",
    concept: "Le **constructeur** (methode `__init__` en Python) est automatiquement execute lors de la creation d'un objet a partir d'une classe. Le premier parametre est toujours `self`, qui fait reference a l'instance elle-meme. Les parametres de `__init__` peuvent definir les valeurs initiales des attributs.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:164:en"
  };

  window.CONTENT_I18N["python:165"] = window.CONTENT_I18N["python:165"] || {};
  window.CONTENT_I18N["python:165"].fr = {
    title: "Definir des methodes et le mot-cle self (class03.py)",
    concept: "Les fonctions definies a l'interieur d'une classe sont appelees **methodes**. Le premier parametre de chaque methode est `self`, qui fait reference a l'instance courante. Accedez aux variables d'instance avec `self.nom_variable`. Les methodes peuvent acceder et modifier les donnees d'un objet.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:165:en"
  };

  window.CONTENT_I18N["python:166"] = window.CONTENT_I18N["python:166"] || {};
  window.CONTENT_I18N["python:166"].fr = {
    title: "Variables de classe vs variables d'instance (class04.py)",
    concept: "Une **variable de classe** est partagee entre toutes les instances d'une classe (definie directement dans le corps de la classe). Une **variable d'instance** est unique a chaque instance (definie dans `__init__` en utilisant `self`). Une classe peut contenir plusieurs methodes : certaines affichent des donnees, d'autres retournent des valeurs calculees, et d'autres modifient des attributs.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:166:en"
  };

  window.CONTENT_I18N["python:167"] = window.CONTENT_I18N["python:167"] || {};
  window.CONTENT_I18N["python:167"].fr = {
    title: "Exercice : Definir une classe Etudiant qui contient les notes (script8-1.py)",
    concept: "**Exercice pratique du Chapitre 8 (script8-1.py)**\n\nTache : Definir une classe Etudiant qui contient les noms des etudiants et les notes par matiere.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:167:en"
  };

  window.CONTENT_I18N["python:168"] = window.CONTENT_I18N["python:168"] || {};
  window.CONTENT_I18N["python:168"].fr = {
    title: "Exercice : Calculer le total et la moyenne avec des methodes de classe (script8-2.py)",
    concept: "**Exercice pratique du Chapitre 8 (script8-2.py)**\n\nTache : Ajouter des methodes a la classe Etudiant pour calculer le total et la moyenne des notes.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:168:en"
  };

  window.CONTENT_I18N["python:169"] = window.CONTENT_I18N["python:169"] || {};
  window.CONTENT_I18N["python:169"].fr = {
    title: "Exercice : Parcourir une liste d'instances et afficher les notes (script8-3.py)",
    concept: "**Exercice pratique du Chapitre 8 (script8-3.py)**\n\nTache : Creer une liste d'objets etudiants et afficher les notes en utilisant une boucle.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:169:en"
  };

  window.CONTENT_I18N["python:170"] = window.CONTENT_I18N["python:170"] || {};
  window.CONTENT_I18N["python:170"].fr = {
    title: "Creer un module de fonctions (my_func.py)",
    concept: "Un fichier `.py` independant contenant du code Python est appele un **module**. Utilisez `import nom_module` pour importer les fonctions et classes definies dans d'autres fichiers dans votre code pour les reutiliser.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:170:en"
  };

  window.CONTENT_I18N["python:171"] = window.CONTENT_I18N["python:171"] || {};
  window.CONTENT_I18N["python:171"].fr = {
    title: "Creer un module de classe (my_class.py)",
    concept: "Un fichier `.py` independant contenant du code Python est appele un **module**. Utilisez `import nom_module` pour importer les fonctions et classes definies dans d'autres fichiers dans votre code pour les reutiliser.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:171:en"
  };

  window.CONTENT_I18N["python:172"] = window.CONTENT_I18N["python:172"] || {};
  window.CONTENT_I18N["python:172"].fr = {
    title: "Script de module composite (calc_account.py)",
    concept: "Un fichier `.py` independant contenant du code Python est appele un **module**. Utilisez `import nom_module` pour importer les fonctions et classes definies dans d'autres fichiers dans votre code pour les reutiliser.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:172:en"
  };

  window.CONTENT_I18N["python:173"] = window.CONTENT_I18N["python:173"] || {};
  window.CONTENT_I18N["python:173"].fr = {
    title: "Definition de classe dans un paquet (my_class.py)",
    concept: "Un dossier contenant plusieurs modules (fichiers) est appele un **paquet**. Un dossier de paquet doit contenir un fichier special `__init__.py` qui s'execute lors de l'initialisation du paquet.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:173:en"
  };

  window.CONTENT_I18N["python:174"] = window.CONTENT_I18N["python:174"] || {};
  window.CONTENT_I18N["python:174"].fr = {
    title: "Definition de fonction dans un paquet (my_func.py)",
    concept: "Un dossier contenant plusieurs modules (fichiers) est appele un **paquet**. Un dossier de paquet doit contenir un fichier special `__init__.py` qui s'execute lors de l'initialisation du paquet.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:174:en"
  };

  window.CONTENT_I18N["python:175"] = window.CONTENT_I18N["python:175"] || {};
  window.CONTENT_I18N["python:175"].fr = {
    title: "Definition de fonction dans un sous-paquet imbrique (my_func.py)",
    concept: "Quand `nom_module.nom_fonction` est trop long, utilisez `from nom_module import nom_fonction` pour omettre le nom du module. Vous pouvez aussi utiliser `as` pour creer un alias : `import bibliotheque as lib`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:175:en"
  };

  window.CONTENT_I18N["python:176"] = window.CONTENT_I18N["python:176"] || {};
  window.CONTENT_I18N["python:176"].fr = {
    title: "Chargement de modules avec import (script.py)",
    concept: "Un fichier `.py` independant contenant du code Python est appele un **module**. Utilisez `import nom_module` pour importer les fonctions et classes definies dans d'autres fichiers dans votre code pour les reutiliser.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:176:en"
  };

  window.CONTENT_I18N["python:177"] = window.CONTENT_I18N["python:177"] || {};
  window.CONTENT_I18N["python:177"].fr = {
    title: "Importer un module depuis un paquet (script_package01.py)",
    concept: "Un dossier contenant plusieurs modules (fichiers) est appele un **paquet**. Un dossier de paquet doit contenir un fichier special `__init__.py` qui s'execute lors de l'initialisation du paquet.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:177:en"
  };

  window.CONTENT_I18N["python:178"] = window.CONTENT_I18N["python:178"] || {};
  window.CONTENT_I18N["python:178"].fr = {
    title: "Importer depuis un paquet imbrique (script_package02.py)",
    concept: "Un dossier contenant plusieurs modules (fichiers) est appele un **paquet**. Un dossier de paquet doit contenir un fichier special `__init__.py` qui s'execute lors de l'initialisation du paquet.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:178:en"
  };

  window.CONTENT_I18N["python:179"] = window.CONTENT_I18N["python:179"] || {};
  window.CONTENT_I18N["python:179"].fr = {
    title: "Fichier d'initialisation de paquet (__init__.py)",
    concept: "Un dossier contenant plusieurs modules (fichiers) est appele un **paquet**. Un dossier de paquet doit contenir un fichier special `__init__.py` qui s'execute lors de l'initialisation du paquet.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:179:en"
  };

  window.CONTENT_I18N["python:180"] = window.CONTENT_I18N["python:180"] || {};
  window.CONTENT_I18N["python:180"].fr = {
    title: "Importer un module specifique avec from (script_package03.py)",
    concept: "Quand `nom_module.nom_fonction` est trop long, utilisez `from nom_module import nom_fonction` pour omettre le nom du module. Vous pouvez aussi utiliser `as` pour creer un alias : `import bibliotheque as lib`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:180:en"
  };

  window.CONTENT_I18N["python:181"] = window.CONTENT_I18N["python:181"] || {};
  window.CONTENT_I18N["python:181"].fr = {
    title: "Importer des fonctions specifiques directement avec from (script_package04.py)",
    concept: "Quand `nom_module.nom_fonction` est trop long, utilisez `from nom_module import nom_fonction` pour omettre le nom du module. Vous pouvez aussi utiliser `as` pour creer un alias : `import bibliotheque as lib`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:181:en"
  };

  window.CONTENT_I18N["python:182"] = window.CONTENT_I18N["python:182"] || {};
  window.CONTENT_I18N["python:182"].fr = {
    title: "Creer des alias de module avec as (script_package05.py)",
    concept: "Quand `nom_module.nom_fonction` est trop long, utilisez `from nom_module import nom_fonction` pour omettre le nom du module. Vous pouvez aussi utiliser `as` pour creer un alias : `import bibliotheque as lib`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:182:en"
  };

  window.CONTENT_I18N["python:183"] = window.CONTENT_I18N["python:183"] || {};
  window.CONTENT_I18N["python:183"].fr = {
    title: "Initialisation de sous-paquet imbrique (__init__.py)",
    concept: "Quand `nom_module.nom_fonction` est trop long, utilisez `from nom_module import nom_fonction` pour omettre le nom du module. Vous pouvez aussi utiliser `as` pour creer un alias : `import bibliotheque as lib`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:183:en"
  };

  window.CONTENT_I18N["python:184"] = window.CONTENT_I18N["python:184"] || {};
  window.CONTENT_I18N["python:184"].fr = {
    title: "Exercice : Importer et utiliser une classe definie dans un autre module (script9-2.py)",
    concept: "**Exercice pratique du Chapitre 9 (script9-2.py)**\n\nTache : Importer une classe personnalisee et une fonction de recherche depuis des modules externes pour rechercher un etudiant.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:184:en"
  };

  window.CONTENT_I18N["python:185"] = window.CONTENT_I18N["python:185"] || {};
  window.CONTENT_I18N["python:185"].fr = {
    title: "Obtenir la date et l'heure actuelles (hiduke01.py)",
    concept: "Pour manipuler les dates et heures en Python, utilisez le module standard `datetime`. Appelez `datetime.now()` pour obtenir rapidement l'objet date-heure actuel.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:185:en"
  };

  window.CONTENT_I18N["python:186"] = window.CONTENT_I18N["python:186"] || {};
  window.CONTENT_I18N["python:186"].fr = {
    title: "Creer un datetime avec une date et heure specifiques (hiduke02.py)",
    concept: "Pour manipuler les dates et heures en Python, utilisez le module standard `datetime`. Appelez `datetime.now()` pour obtenir rapidement l'objet date-heure actuel.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:186:en"
  };

  window.CONTENT_I18N["python:187"] = window.CONTENT_I18N["python:187"] || {};
  window.CONTENT_I18N["python:187"].fr = {
    title: "Creer un objet date sans heure (hiduke03.py)",
    concept: "Pour manipuler les dates et heures en Python, utilisez le module standard `datetime`. Appelez `datetime.now()` pour obtenir rapidement l'objet date-heure actuel.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:187:en"
  };

  window.CONTENT_I18N["python:188"] = window.CONTENT_I18N["python:188"] || {};
  window.CONTENT_I18N["python:188"].fr = {
    title: "Erreur de specification de date invalide (hiduke04.py)",
    concept: "Pour manipuler les dates et heures en Python, utilisez le module standard `datetime`. Passer une date invalide (ex. mois 2 jour 30) leve une `ValueError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:188:en"
  };

  window.CONTENT_I18N["python:189"] = window.CONTENT_I18N["python:189"] || {};
  window.CONTENT_I18N["python:189"].fr = {
    title: "Obtenir la date d'aujourd'hui avec date.today() (hiduke05.py)",
    concept: "Pour manipuler les dates et heures en Python, utilisez le module standard `datetime`. Appelez `date.today()` pour obtenir la date courante.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:189:en"
  };

  window.CONTENT_I18N["python:190"] = window.CONTENT_I18N["python:190"] || {};
  window.CONTENT_I18N["python:190"].fr = {
    title: "Creer une date future (hiduke06.py)",
    concept: "Pour manipuler les dates et heures en Python, utilisez le module standard `datetime`. Vous pouvez creer une date future en passant l'annee, le mois et le jour a `date()`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:190:en"
  };

  window.CONTENT_I18N["python:191"] = window.CONTENT_I18N["python:191"] || {};
  window.CONTENT_I18N["python:191"].fr = {
    title: "Comparer des dates (hiduke07.py)",
    concept: "Soustraire deux dates produit un objet `timedelta` representant la difference de temps. Pour afficher un objet date-heure dans un format de chaine arbitraire (ex. `2026/06/04`), utilisez la methode `strftime()`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:191:en"
  };

  window.CONTENT_I18N["python:192"] = window.CONTENT_I18N["python:192"] || {};
  window.CONTENT_I18N["python:192"].fr = {
    title: "Additionner et soustraire des dates avec timedelta (hiduke08.py)",
    concept: "Soustraire deux dates produit un objet `timedelta` representant la difference de temps. Utilisez `timedelta(jours=N)` pour ajouter ou soustraire des jours. Accedez a la difference en jours avec `.days` ou en secondes avec `.seconds`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:192:en"
  };

  window.CONTENT_I18N["python:193"] = window.CONTENT_I18N["python:193"] || {};
  window.CONTENT_I18N["python:193"].fr = {
    title: "Convertir la difference datetime en secondes (hiduke09.py)",
    concept: "Utilisez `strptime()` pour analyser une chaine de date en objet `datetime`. Specifiez le format avec des directives comme `%Y`, `%m`, `%d`. Accedez a la difference en jours avec `.days` ou en secondes avec `.seconds`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:193:en"
  };

  window.CONTENT_I18N["python:194"] = window.CONTENT_I18N["python:194"] || {};
  window.CONTENT_I18N["python:194"].fr = {
    title: "Obtenir le jour de la semaine avec weekday() (hiduke10.py)",
    concept: "Soustraire deux dates produit un objet `timedelta` representant la difference de temps. Utilisez `date.weekday()` pour obtenir le jour de la semaine sous forme d'entier (lundi est 0, dimanche est 6).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:194:en"
  };

  window.CONTENT_I18N["python:195"] = window.CONTENT_I18N["python:195"] || {};
  window.CONTENT_I18N["python:195"].fr = {
    title: "Analyser une chaine de date avec strptime (hiduke11.py)",
    concept: "Soustraire deux dates produit un objet `timedelta`. Utilisez `datetime.strptime(chaine, format)` pour convertir une chaine de date en objet `datetime` en specifiant le format avec des directives comme `%Y`, `%m`, `%d`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:195:en"
  };

  window.CONTENT_I18N["python:196"] = window.CONTENT_I18N["python:196"] || {};
  window.CONTENT_I18N["python:196"].fr = {
    title: "Formater un datetime avec strftime (hiduke12.py)",
    concept: "Soustraire deux dates produit un objet `timedelta`. Utilisez `datetime.strftime(format)` pour afficher un objet date-heure sous forme de chaine formatee. Codes de format courants : `%Y` (annee), `%m` (mois), `%d` (jour), `%H` (heure), `%M` (minute).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:196:en"
  };

  window.CONTENT_I18N["python:197"] = window.CONTENT_I18N["python:197"] || {};
  window.CONTENT_I18N["python:197"].fr = {
    title: "Generer un float aleatoire entre 0 et 1 avec random() (ransu01.py)",
    concept: "Utilisez le module `random` pour generer des valeurs aleatoires :\n- `random.random()` — Un float entre 0.0 et 1.0\n- `random.randint(a, b)` — Un entier entre a et b (inclus)\n- `random.shuffle(liste)` — Melange aleatoirement une liste sur place",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:197:en"
  };

  window.CONTENT_I18N["python:198"] = window.CONTENT_I18N["python:198"] || {};
  window.CONTENT_I18N["python:198"].fr = {
    title: "Generer un entier aleatoire dans une plage avec randint() (ransu02.py)",
    concept: "Utilisez le module `random` pour generer des valeurs aleatoires :\n- `random.random()` — Un float entre 0.0 et 1.0\n- `random.randint(a, b)` — Un entier entre a et b (inclus)\n- `random.shuffle(liste)` — Melange aleatoirement une liste sur place",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:198:en"
  };

  window.CONTENT_I18N["python:199"] = window.CONTENT_I18N["python:199"] || {};
  window.CONTENT_I18N["python:199"].fr = {
    title: "Selectionner aleatoirement un element d'une sequence avec choice() (ransu03.py)",
    concept: "Utilisez le module `random` pour generer des valeurs aleatoires. `random.choice(sequence)` selectionne et retourne aleatoirement un element d'une liste ou d'une autre sequence.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:199:en"
  };

  window.CONTENT_I18N["python:200"] = window.CONTENT_I18N["python:200"] || {};
  window.CONTENT_I18N["python:200"].fr = {
    title: "Exercice : Analyser une chaine de date saisie par l'utilisateur (script10-1.py)",
    concept: "**Exercice pratique du Chapitre 10 (script10-1.py)**\n\nTache : Analyser une chaine de date saisie par l'utilisateur en un objet datetime.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:200:en"
  };

  window.CONTENT_I18N["python:201"] = window.CONTENT_I18N["python:201"] || {};
  window.CONTENT_I18N["python:201"].fr = {
    title: "Exercice : Calculer la difference en jours entre deux dates (script10-2.py)",
    concept: "**Exercice pratique du Chapitre 10 (script10-2.py)**\n\nTache : Saisir deux dates et calculer le nombre de jours entre elles.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:201:en"
  };

  window.CONTENT_I18N["python:202"] = window.CONTENT_I18N["python:202"] || {};
  window.CONTENT_I18N["python:202"].fr = {
    title: "Exercice : Simulation de jeu de lancer de des (script10-3.py)",
    concept: "**Exercice pratique du Chapitre 10 (script10-3.py)**\n\nTache : Simuler le lancer de des et verifier si leur somme est paire ou impaire.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:202:en"
  };

  window.CONTENT_I18N["python:203"] = window.CONTENT_I18N["python:203"] || {};
  window.CONTENT_I18N["python:203"].fr = {
    title: "Fermeture automatique de fichier avec l'instruction with (sample.txt)",
    concept: "Si une erreur survient lors du traitement d'un fichier, `close()` peut ne pas s'executer, laissant le fichier ouvert. Utiliser `with open(...) as f:` **ferme automatiquement le fichier** quand le bloc se termine (meme en cas d'erreur), rendant le code plus sur et plus concis.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:203:en"
  };

  window.CONTENT_I18N["python:204"] = window.CONTENT_I18N["python:204"] || {};
  window.CONTENT_I18N["python:204"].fr = {
    title: "Verifier l'existence d'un fichier avec os.path.exists (arunashi01.py)",
    concept: "Pour ecrire des donnees dans un fichier, ouvrez-le avec `open('fichier', 'w', encoding='utf-8')`. Utilisez `write()` pour ecrire du texte, et appelez toujours `close()` a la fin. Utilisez `os.path.exists()` pour verifier si un fichier existe avant d'operer dessus.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:204:en"
  };

  window.CONTENT_I18N["python:205"] = window.CONTENT_I18N["python:205"] || {};
  window.CONTENT_I18N["python:205"].fr = {
    title: "Lire le contenu entier d'un fichier avec read() (yomikomi01.py)",
    concept: "Pour lire un fichier, ouvrez-le en mode `'r'` (lecture). `read()` lit tout le fichier en une seule grande chaine. `readlines()` lit toutes les lignes dans une liste, un element par ligne.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:205:en"
  };

  window.CONTENT_I18N["python:206"] = window.CONTENT_I18N["python:206"] || {};
  window.CONTENT_I18N["python:206"].fr = {
    title: "Ouverture securisee de fichier avec l'instruction with (yomikomi01_with.py)",
    concept: "Si une erreur survient lors du traitement d'un fichier, `close()` peut ne pas s'executer, laissant le fichier ouvert. Utiliser `with open(...) as f:` **ferme automatiquement le fichier** quand le bloc se termine (meme en cas d'erreur), rendant le code plus sur et plus concis.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:206:en"
  };

  window.CONTENT_I18N["python:207"] = window.CONTENT_I18N["python:207"] || {};
  window.CONTENT_I18N["python:207"].fr = {
    title: "Lire un fichier ligne par ligne avec readline() (yomikomi02.py)",
    concept: "Pour lire un fichier, ouvrez-le en mode `'r'` (lecture). `read()` lit tout le fichier en une seule grande chaine. `readlines()` lit toutes les lignes dans une liste. Utilisez `readline()` dans une boucle pour lire une ligne a la fois jusqu'a la fin du fichier.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:207:en"
  };

  window.CONTENT_I18N["python:208"] = window.CONTENT_I18N["python:208"] || {};
  window.CONTENT_I18N["python:208"].fr = {
    title: "Lire toutes les lignes dans une liste avec readlines() (yomikomi03.py)",
    concept: "Pour lire un fichier, ouvrez-le en mode `'r'` (lecture). `read()` lit tout le fichier en une seule grande chaine. `readlines()` lit toutes les lignes dans une liste, un element par ligne (incluant les caracteres de nouvelle ligne).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:208:en"
  };

  window.CONTENT_I18N["python:209"] = window.CONTENT_I18N["python:209"] || {};
  window.CONTENT_I18N["python:209"].fr = {
    title: "Creer et ecrire dans un fichier avec le mode w (kakikomi01.py)",
    concept: "Pour ecrire des donnees dans un fichier, ouvrez-le avec `open('fichier', 'w', encoding='utf-8')`. Utilisez `write()` pour ecrire du texte, et appelez toujours `close()` a la fin. Utilisez `os.path.exists()` pour verifier si un fichier existe avant d'operer dessus.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:209:en"
  };

  window.CONTENT_I18N["python:210"] = window.CONTENT_I18N["python:210"] || {};
  window.CONTENT_I18N["python:210"].fr = {
    title: "Exercice : Lire et afficher tout le contenu de students.txt (script11-1.py)",
    concept: "**Exercice pratique du Chapitre 11 (script11-1.py)**\n\nTache : Ouvrir, lire et afficher toutes les lignes de students.txt.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:210:en"
  };

  window.CONTENT_I18N["python:211"] = window.CONTENT_I18N["python:211"] || {};
  window.CONTENT_I18N["python:211"].fr = {
    title: "Ecrire plusieurs lignes depuis une liste avec writelines() (kakikomi02.py)",
    concept: "Pour ecrire des donnees dans un fichier, ouvrez-le avec `open('fichier', 'w', encoding='utf-8')`. Utilisez `write()` pour ecrire une chaine, et appelez toujours `close()` a la fin. Pour ecrire plusieurs lignes depuis une liste d'un coup, utilisez `f.writelines(liste)`. Utilisez `os.path.exists()` pour verifier si un fichier existe.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:211:en"
  };

  window.CONTENT_I18N["python:212"] = window.CONTENT_I18N["python:212"] || {};
  window.CONTENT_I18N["python:212"].fr = {
    title: "Exercice : Enregistrer les donnees etudiantes saisies dans un fichier (script11-2.py)",
    concept: "**Exercice pratique du Chapitre 11 (script11-2.py)**\n\nTache : Enregistrer les donnees etudiantes saisies par l'utilisateur dans un fichier.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:212:en"
  };

  window.CONTENT_I18N["python:213"] = window.CONTENT_I18N["python:213"] || {};
  window.CONTENT_I18N["python:213"].fr = {
    title: "Ajouter a un fichier existant avec le mode append (kakikomi03.py)",
    concept: "Pour ecrire des donnees dans un fichier, ouvrez-le avec `open('fichier', 'w', encoding='utf-8')`. Utilisez `write()` pour ecrire une chaine, et appelez toujours `close()` a la fin. Pour ajouter du contenu a un fichier existant sans ecraser, ouvrez-le en mode ajout `'a'`. Utilisez `os.path.exists()` pour verifier l'existence.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:213:en"
  };

  window.CONTENT_I18N["python:214"] = window.CONTENT_I18N["python:214"] || {};
  window.CONTENT_I18N["python:214"].fr = {
    title: "Ouvrir un fichier relativement au chemin du paquet (openfile.py)",
    concept: "Lors de la lecture d'un fichier depuis un programme, la position relative (chemin) entre le repertoire d'execution et le fichier cible est importante. Le meme chemin relatif peut echouer si le programme est execute depuis un repertoire de travail different, provoquant une `FileNotFoundError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:214:en"
  };

  window.CONTENT_I18N["python:215"] = window.CONTENT_I18N["python:215"] || {};
  window.CONTENT_I18N["python:215"].fr = {
    title: "Exercice : Lire un fichier et stocker ses lignes dans une liste (script11-3.py)",
    concept: "**Exercice pratique du Chapitre 11 (script11-3.py)**\n\nTache : Lire un fichier et stocker son contenu dans une liste.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:215:en"
  };

  window.CONTENT_I18N["python:216"] = window.CONTENT_I18N["python:216"] || {};
  window.CONTENT_I18N["python:216"].fr = {
    title: "Exercice : Creer des instances Student a partir de donnees de fichier (script11-4.py)",
    concept: "**Exercice pratique du Chapitre 11 (script11-4.py)**\n\nTache : Generer des instances Student a partir de donnees de fichier.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:216:en"
  };

  window.CONTENT_I18N["python:217"] = window.CONTENT_I18N["python:217"] || {};
  window.CONTENT_I18N["python:217"].fr = {
    title: "Correspondance regex par lots sur le contenu d'un fichier (aaa.txt)",
    concept: "Apres avoir lu un fichier, vous pouvez appliquer `re.search()` ligne par ligne pour extraire seulement les lignes qui correspondent a un motif specifique. Ceci est utile pour filtrer des fichiers journaux ou des donnees textuelles structurees en utilisant des expressions regulieres.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:217:en"
  };

  window.CONTENT_I18N["python:218"] = window.CONTENT_I18N["python:218"] || {};
  window.CONTENT_I18N["python:218"].fr = {
    title: "Correspondance regex par lots sur le contenu d'un fichier (bbb.txt)",
    concept: "Apres avoir lu un fichier, vous pouvez appliquer `re.search()` ligne par ligne pour extraire seulement les lignes qui correspondent a un motif specifique. Ceci est utile pour filtrer des fichiers journaux ou des donnees textuelles structurees en utilisant des expressions regulieres.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:218:en"
  };

  window.CONTENT_I18N["python:219"] = window.CONTENT_I18N["python:219"] || {};
  window.CONTENT_I18N["python:219"].fr = {
    title: "Correspondance regex par lots sur le contenu d'un fichier (ccc.txt)",
    concept: "Apres avoir lu un fichier, vous pouvez appliquer `re.search()` ligne par ligne pour extraire seulement les lignes qui correspondent a un motif specifique. Ceci est utile pour filtrer des fichiers journaux ou des donnees textuelles structurees en utilisant des expressions regulieres.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:219:en"
  };

  window.CONTENT_I18N["python:220"] = window.CONTENT_I18N["python:220"] || {};
  window.CONTENT_I18N["python:220"].fr = {
    title: "Correspondance regex par lots sur le contenu d'un fichier (test-result.txt)",
    concept: "Apres avoir lu un fichier, vous pouvez appliquer `re.search()` ligne par ligne pour extraire seulement les lignes qui correspondent a un motif specifique. Ceci est utile pour filtrer des fichiers journaux ou des donnees textuelles structurees en utilisant des expressions regulieres.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:220:en"
  };

  window.CONTENT_I18N["python:221"] = window.CONTENT_I18N["python:221"] || {};
  window.CONTENT_I18N["python:221"].fr = {
    title: "Recherche de correspondance partielle avec re.search (seiki01.py)",
    concept: "Une **expression reguliere** est un mecanisme pour specifier des motifs de chaine complexes (ex. 3 chiffres suivis d'un trait d'union et 4 chiffres) pour rechercher dans du texte. En Python, importez le module `re` et utilisez `re.search(motif, chaine)`. Les metacharacteres courants incluent `^` pour le debut de chaîne et `$` pour la fin de chaîne.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:221:en"
  };

  window.CONTENT_I18N["python:222"] = window.CONTENT_I18N["python:222"] || {};
  window.CONTENT_I18N["python:222"].fr = {
    title: "Verifier l'objet resultat de re.search (seiki02.py)",
    concept: "Une **expression reguliere** est un mecanisme pour specifier des motifs de chaine complexes. En Python, importez le module `re` et utilisez `re.search(motif, chaine)`. Les metacharacteres courants incluent `^` pour le debut de chaîne et `$` pour la fin de chaîne.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:222:en"
  };

  window.CONTENT_I18N["python:223"] = window.CONTENT_I18N["python:223"] || {};
  window.CONTENT_I18N["python:223"].fr = {
    title: "Ancre de debut de ligne (^) (seiki03.py)",
    concept: "Une **expression reguliere** est un mecanisme pour specifier des motifs de chaine complexes. En Python, importez le module `re` et utilisez `re.search(motif, chaine)`. Les metacharacteres courants incluent `^` pour le debut de chaîne et `$` pour la fin de chaîne.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:223:en"
  };

  window.CONTENT_I18N["python:224"] = window.CONTENT_I18N["python:224"] || {};
  window.CONTENT_I18N["python:224"].fr = {
    title: "Ancre de fin de ligne ($) (seiki04.py)",
    concept: "Une **expression reguliere** est un mecanisme pour specifier des motifs de chaine complexes. En Python, importez le module `re` et utilisez `re.search(motif, chaine)`. Les metacharacteres courants incluent `^` pour le debut de chaîne et `$` pour la fin de chaîne.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:224:en"
  };

  window.CONTENT_I18N["python:225"] = window.CONTENT_I18N["python:225"] || {};
  window.CONTENT_I18N["python:225"].fr = {
    title: "Correspondance exacte avec ^ et $ combines (seiki05.py)",
    concept: "Une **expression reguliere** est un mecanisme pour specifier des motifs de chaine complexes. En Python, importez le module `re` et utilisez `re.search(motif, chaine)`. Les metacharacteres courants incluent `^` pour le debut de chaîne et `$` pour la fin de chaîne.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:225:en"
  };

  window.CONTENT_I18N["python:226"] = window.CONTENT_I18N["python:226"] || {};
  window.CONTENT_I18N["python:226"].fr = {
    title: "Joker : Un seul caractere (.) (seiki06.py)",
    concept: "Metacharacteres et quantificateurs regex courants :\n- `.` — N'importe quel caractere unique\n- `*` — Zero ou plusieurs repetitions du motif precedent\n- `+` — Une ou plusieurs repetitions du motif precedent\n- `[a-z]` — N'importe quelle lettre minuscule de a a z\n- `\\d` — N'importe quel chiffre (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:226:en"
  };

  window.CONTENT_I18N["python:227"] = window.CONTENT_I18N["python:227"] || {};
  window.CONTENT_I18N["python:227"].fr = {
    title: "Zero ou plusieurs repetitions (*) (seiki07.py)",
    concept: "Metacharacteres et quantificateurs regex courants :\n- `.` — N'importe quel caractere unique\n- `*` — Zero ou plusieurs repetitions du motif precedent\n- `+` — Une ou plusieurs repetitions du motif precedent\n- `[a-z]` — N'importe quelle lettre minuscule de a a z\n- `\\d` — N'importe quel chiffre (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:227:en"
  };

  window.CONTENT_I18N["python:228"] = window.CONTENT_I18N["python:228"] || {};
  window.CONTENT_I18N["python:228"].fr = {
    title: "Une ou plusieurs repetitions (+) (seiki08.py)",
    concept: "Metacharacteres et quantificateurs regex courants :\n- `.` — N'importe quel caractere unique\n- `*` — Zero ou plusieurs repetitions du motif precedent\n- `+` — Une ou plusieurs repetitions du motif precedent\n- `[a-z]` — N'importe quelle lettre minuscule de a a z\n- `\\d` — N'importe quel chiffre (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:228:en"
  };

  window.CONTENT_I18N["python:229"] = window.CONTENT_I18N["python:229"] || {};
  window.CONTENT_I18N["python:229"].fr = {
    title: "Zero ou une occurrence (optionnelle) (?) (seiki09.py)",
    concept: "Metacharacteres et quantificateurs regex courants :\n- `.` — N'importe quel caractere unique\n- `*` — Zero ou plusieurs repetitions du motif precedent\n- `+` — Une ou plusieurs repetitions du motif precedent\n- `[a-z]` — N'importe quelle lettre minuscule de a a z\n- `\\d` — N'importe quel chiffre (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:229:en"
  };

  window.CONTENT_I18N["python:230"] = window.CONTENT_I18N["python:230"] || {};
  window.CONTENT_I18N["python:230"].fr = {
    title: "Correspondance de plage de classes de caracteres [a-z] et [0-9] (seiki10.py)",
    concept: "Metacharacteres et quantificateurs regex courants :\n- `.` — N'importe quel caractere unique\n- `*` — Zero ou plusieurs repetitions du motif precedent\n- `+` — Une ou plusieurs repetitions du motif precedent\n- `[a-z]` — N'importe quelle lettre minuscule de a a z\n- `\\d` — N'importe quel chiffre (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:230:en"
  };

  window.CONTENT_I18N["python:231"] = window.CONTENT_I18N["python:231"] || {};
  window.CONTENT_I18N["python:231"].fr = {
    title: "Ensemble de caracteres predefini \\d pour les chiffres (seiki11.py)",
    concept: "Motifs de validation courants du monde reel :\n- Code postal (3-4 chiffres) : `^\\d{3}-\\d{4}$`\n- Numero de telephone : `^\\d{2,4}-\\d{2,4}-\\d{4}$`\n- Pour specifier directement le nombre de repetitions, utilisez `{compteur}` ou `{min, max}`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:231:en"
  };

  window.CONTENT_I18N["python:232"] = window.CONTENT_I18N["python:232"] || {};
  window.CONTENT_I18N["python:232"].fr = {
    title: "Specifier le nombre de repetitions avec des accolades {m,n} (seiki12.py)",
    concept: "Motifs de validation courants du monde reel :\n- Code postal (3-4 chiffres) : `^\\d{3}-\\d{4}$`\n- Numero de telephone : `^\\d{2,4}-\\d{2,4}-\\d{4}$`\n- Pour specifier directement le nombre de repetitions, utilisez `{compteur}` ou `{min, max}`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:232:en"
  };

  window.CONTENT_I18N["python:233"] = window.CONTENT_I18N["python:233"] || {};
  window.CONTENT_I18N["python:233"].fr = {
    title: "Groupement et capture regex avec parentheses (seiki13.py)",
    concept: "Motifs de validation courants du monde reel :\n- Code postal (3-4 chiffres) : `^\\d{3}-\\d{4}$`\n- Numero de telephone : `^\\d{2,4}-\\d{2,4}-\\d{4}$`\n- Pour specifier directement le nombre de repetitions, utilisez `{compteur}` ou `{min, max}`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:233:en"
  };

  window.CONTENT_I18N["python:234"] = window.CONTENT_I18N["python:234"] || {};
  window.CONTENT_I18N["python:234"].fr = {
    title: "Parcourir un fichier avec des expressions regulieres (seiki14.py)",
    concept: "Apres avoir lu un fichier, vous pouvez appliquer `re.search()` ligne par ligne pour extraire seulement les lignes qui correspondent a un motif specifique. Ceci est utile pour filtrer des fichiers journaux ou des donnees textuelles structurees en utilisant des expressions regulieres.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:234:en"
  };

  window.CONTENT_I18N["python:235"] = window.CONTENT_I18N["python:235"] || {};
  window.CONTENT_I18N["python:235"].fr = {
    title: "Parcours regex de fichier avec extraction de groupes (seiki14_sep.py)",
    concept: "Apres avoir lu un fichier, vous pouvez appliquer `re.search()` ligne par ligne pour extraire seulement les lignes qui correspondent a un motif specifique. Ceci est utile pour filtrer des fichiers journaux ou des donnees textuelles structurees en utilisant des expressions regulieres.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:235:en"
  };

  window.CONTENT_I18N["python:236"] = window.CONTENT_I18N["python:236"] || {};
  window.CONTENT_I18N["python:236"].fr = {
    title: "Extraire des noms d'utilisateur avec regex (seiki15.py)",
    concept: "Apres avoir lu un fichier, vous pouvez appliquer `re.search()` ligne par ligne pour extraire seulement les lignes qui correspondent a un motif specifique. Ceci est utile pour filtrer des fichiers journaux ou des donnees textuelles structurees en utilisant des expressions regulieres.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:236:en"
  };

  window.CONTENT_I18N["python:237"] = window.CONTENT_I18N["python:237"] || {};
  window.CONTENT_I18N["python:237"].fr = {
    title: "Extraction regex de noms d'utilisateur (version separee) (seiki15_sep.py)",
    concept: "Apres avoir lu un fichier, vous pouvez appliquer `re.search()` ligne par ligne pour extraire seulement les lignes qui correspondent a un motif specifique. Ceci est utile pour filtrer des fichiers journaux ou des donnees textuelles structurees en utilisant des expressions regulieres.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:237:en"
  };

  window.CONTENT_I18N["python:238"] = window.CONTENT_I18N["python:238"] || {};
  window.CONTENT_I18N["python:238"].fr = {
    title: "Extraire des donnees de notes avec des groupes regex (seiki16.py)",
    concept: "Apres avoir lu un fichier, vous pouvez appliquer `re.search()` ligne par ligne pour extraire seulement les lignes qui correspondent a un motif specifique. Ceci est utile pour filtrer des fichiers journaux ou des donnees textuelles structurees en utilisant des expressions regulieres.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:238:en"
  };

  window.CONTENT_I18N["python:239"] = window.CONTENT_I18N["python:239"] || {};
  window.CONTENT_I18N["python:239"].fr = {
    title: "Extraction regex de donnees de notes (version separee) (seiki16_sep.py)",
    concept: "Apres avoir lu un fichier, vous pouvez appliquer `re.search()` ligne par ligne pour extraire seulement les lignes qui correspondent a un motif specifique. Ceci est utile pour filtrer des fichiers journaux ou des donnees textuelles structurees en utilisant des expressions regulieres.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:239:en"
  };

  window.CONTENT_I18N["python:240"] = window.CONTENT_I18N["python:240"] || {};
  window.CONTENT_I18N["python:240"].fr = {
    title: "Exercice : Valider le format d'un numero de telephone avec regex (script12-1.py)",
    concept: "**Exercice pratique du Chapitre 12 (script12-1.py)**\n\nTache : Valider le format d'un numero de telephone mobile en utilisant des expressions regulieres.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:240:en"
  };

  window.CONTENT_I18N["python:241"] = window.CONTENT_I18N["python:241"] || {};
  window.CONTENT_I18N["python:241"].fr = {
    title: "Exercice : Extraire des donnees etudiantes d'un fichier avec regex (script12-2.py)",
    concept: "**Exercice pratique du Chapitre 12 (script12-2.py)**\n\nTache : Extraire des donnees etudiantes d'un fichier en utilisant des expressions regulieres.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:241:en"
  };

  window.CONTENT_I18N["python:242"] = window.CONTENT_I18N["python:242"] || {};
  window.CONTENT_I18N["python:242"].fr = {
    title: "Exercice : Analyser des donnees de notes complexes avec des groupes regex (script12-3.py)",
    concept: "**Exercice pratique du Chapitre 12 (script12-3.py)**\n\nTache : Analyser des donnees de notes complexes en utilisant des groupes de capture regex.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:242:en"
  };

  window.CONTENT_I18N["python:243"] = window.CONTENT_I18N["python:243"] || {};
  window.CONTENT_I18N["python:243"].fr = {
    title: "Exception d'execution : Division par zero (ZeroDivisionError) (reigai01.py)",
    concept: "Les erreurs qui surviennent lors de l'execution du programme sont appelees **exceptions**. Quand une exception se produit, le programme se termine normalement de maniere forcee. Pour gerer les erreurs en toute securite, placez le code normal dans le bloc `try` et le code de gestion d'erreur dans le bloc `except`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:243:en"
  };

  window.CONTENT_I18N["python:244"] = window.CONTENT_I18N["python:244"] || {};
  window.CONTENT_I18N["python:244"].fr = {
    title: "Exception d'execution : Index hors limites (IndexError) (reigai02.py)",
    concept: "Les erreurs qui surviennent lors de l'execution du programme sont appelees **exceptions**. Quand une exception se produit, le programme se termine normalement de maniere forcee. Pour gerer les erreurs en toute securite, placez le code normal dans le bloc `try` et le code de gestion d'erreur dans le bloc `except`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:244:en"
  };

  window.CONTENT_I18N["python:245"] = window.CONTENT_I18N["python:245"] || {};
  window.CONTENT_I18N["python:245"].fr = {
    title: "Attraper des exceptions avec try-except (reigai03.py)",
    concept: "Les erreurs qui surviennent lors de l'execution du programme sont appelees **exceptions**. Quand une exception se produit, le programme se termine normalement de maniere forcee. Pour gerer les erreurs en toute securite, placez le code normal dans le bloc `try` et le code de gestion d'erreur dans le bloc `except`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:245:en"
  };

  window.CONTENT_I18N["python:246"] = window.CONTENT_I18N["python:246"] || {};
  window.CONTENT_I18N["python:246"].fr = {
    title: "Obtenir les details d'exception dans le bloc except (reigai04.py)",
    concept: "Les erreurs qui surviennent lors de l'execution du programme sont appelees **exceptions**. Quand une exception se produit, le programme se termine normalement de maniere forcee. Pour gerer les erreurs en toute securite, placez le code normal dans le bloc `try` et le code de gestion d'erreur dans le bloc `except`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:246:en"
  };

  window.CONTENT_I18N["python:247"] = window.CONTENT_I18N["python:247"] || {};
  window.CONTENT_I18N["python:247"].fr = {
    title: "Utiliser le bloc else (aucune exception) (reigai07.py)",
    concept: "Les erreurs ont des types specifiques comme `ZeroDivisionError` (division par zero), `ValueError` (conversion numerique invalide) et `IndexError` (index de liste hors limites). En specifiant le type comme `except ValueError:`, vous pouvez ecrire une gestion differente pour chaque type d'erreur.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:247:en"
  };

  window.CONTENT_I18N["python:248"] = window.CONTENT_I18N["python:248"] || {};
  window.CONTENT_I18N["python:248"].fr = {
    title: "Gerer plusieurs types d'exceptions (reigai05.py)",
    concept: "Les erreurs ont des types specifiques comme `ZeroDivisionError` (division par zero), `ValueError` (conversion numerique invalide) et `IndexError` (index de liste hors limites). En specifiant le type comme `except ValueError:`, vous pouvez ecrire une gestion differente pour chaque type d'erreur.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:248:en"
  };

  window.CONTENT_I18N["python:249"] = window.CONTENT_I18N["python:249"] || {};
  window.CONTENT_I18N["python:249"].fr = {
    title: "Attraper toutes les exceptions avec la classe parent Exception (reigai06.py)",
    concept: "Les erreurs ont des types specifiques comme `ZeroDivisionError` (division par zero), `ValueError` (conversion numerique invalide) et `IndexError` (index de liste hors limites). En specifiant le type comme `except ValueError:`, vous pouvez ecrire une gestion differente pour chaque type d'erreur.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:249:en"
  };

  window.CONTENT_I18N["python:250"] = window.CONTENT_I18N["python:250"] || {};
  window.CONTENT_I18N["python:250"].fr = {
    title: "Propagation de l'exception a l'appelant (reigai08.py)",
    concept: "Les erreurs ont des types specifiques comme `ZeroDivisionError` (division par zero), `ValueError` (conversion numerique invalide) et `IndexError` (index de liste hors limites). En specifiant le type comme `except ValueError:`, vous pouvez ecrire une gestion differente pour chaque type d'erreur.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:250:en"
  };

  window.CONTENT_I18N["python:251"] = window.CONTENT_I18N["python:251"] || {};
  window.CONTENT_I18N["python:251"].fr = {
    title: "Nettoyage obligatoire avec le bloc finally (reigai09.py)",
    concept: "Utilisez le bloc `finally:` pour le code qui **doit toujours s'executer** qu'une exception se soit produite ou non. Ceci est utile pour les operations de fermeture de fichier. De plus, utilisez le mot-cle `raise` pour lancer intentionnellement une exception.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:251:en"
  };

  window.CONTENT_I18N["python:252"] = window.CONTENT_I18N["python:252"] || {};
  window.CONTENT_I18N["python:252"].fr = {
    title: "Exercice : Une fonction avec validation d'arguments et levee d'exception (script13-1.py)",
    concept: "**Exercice pratique du Chapitre 13 (script13-1.py)**\n\nTache : Creer une fonction qui verifie les arguments et leve des exceptions.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:252:en"
  };

  window.CONTENT_I18N["python:253"] = window.CONTENT_I18N["python:253"] || {};
  window.CONTENT_I18N["python:253"].fr = {
    title: "Exercice : Attraper des exceptions specifiques et mise en œuvre de la recuperation (script13-2.py)",
    concept: "**Exercice pratique du Chapitre 13 (script13-2.py)**\n\nTache : Attraper des exceptions specifiques et implementer une gestion de recuperation.\n\nConsultez le code modele dans l'editeur et remplissez les parties manquantes pour completer le programme. Appuyez sur le bouton Executer a droite pour verifier le resultat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:253:en"
  };

  window.CONTENT_I18N["python:254"] = window.CONTENT_I18N["python:254"] || {};
  window.CONTENT_I18N["python:254"].fr = {
    title: "Lancer intentionnellement une exception avec raise (reigai10.py)",
    concept: "Utilisez le bloc `finally:` pour le code qui **doit toujours s'executer** qu'une exception se soit produite ou non. Ceci est utile pour les operations de fermeture de fichier. De plus, utilisez le mot-cle `raise` pour lancer intentionnellement une exception.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:254:en"
  };

  window.CONTENT_I18N["python:255"] = window.CONTENT_I18N["python:255"] || {};
  window.CONTENT_I18N["python:255"].fr = {
    title: "Definir et lever des classes d'exception personnalisees (reigai11.py)",
    concept: "Utilisez le bloc `finally:` pour le code qui **doit toujours s'executer** qu'une exception se soit produite ou non. Ceci est utile pour les operations de fermeture de fichier. De plus, utilisez le mot-cle `raise` pour lancer intentionnellement une exception.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:255:en"
  };

})();
