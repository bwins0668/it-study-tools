(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["itpass:1"] = window.CONTENT_I18N["itpass:1"] || {};
  window.CONTENT_I18N["itpass:1"].fr = {
    title: "1-01 Théorie de l'information (Information Theory)",
    concept: "L'information est représentée de deux manières principales : **Analog** (analogique), qui consiste en des valeurs changeant continuellement (sans interruption, comme la hauteur d'un toboggan), et **Digital** (numérique), qui divise les valeurs continues en valeurs numériques discrètes et discontinues de 0 et 1. Les données numériques (Digital data) ont l'avantage d'être faciles à traiter et à éditer, très résistantes au bruit et moins sujettes à la dégradation.\n\n**Pourquoi les ordinateurs utilisent-ils le numérique (binaire) ?**\nLes circuits électroniques des ordinateurs ne peuvent distinguer que deux états : \"ON (tension élevée)\" et \"OFF (tension basse)\". Par conséquent, représenter toutes les informations sous forme de combinaisons de 0 et de 1 (numérique) est la méthode la plus fiable avec le moins d'erreurs.\n\nLa plus petite unité d'information est un **bit** (représentant soit 0 soit 1), et un groupe de 8 bits est appelé un **Byte** (octet). Les unités auxiliaires pour représenter de grandes capacités comprennent **KB** (10^3), **MB** (10^6), **GB** (10^9), **TB** (10^12) et **PB** (10^15). Pour vous préparer à l'examen, assurez-vous de mémoriser l'ordre de ces unités et la règle de calcul selon laquelle 1 Byte est égal à 8 bits.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:1:en"
  };

  window.CONTENT_I18N["itpass:2"] = window.CONTENT_I18N["itpass:2"] || {};
  window.CONTENT_I18N["itpass:2"].fr = {
    title: "1-02 Architecture de l'ordinateur et CPU (Computer Architecture and CPU)",
    concept: "Les ordinateurs sont constitués de composants de base connus sous le nom de **Five Core Devices** (Cinq périphériques clés) :\n\n1. **Input Device** (Périphérique d'entrée) : Périphériques utilisés pour saisir des informations, tels que les claviers et les souris.\n2. **Output Device** (Périphérique de sortie) : Périphériques utilisés pour afficher ou sortir des informations, tels que les écrans et les imprimantes.\n3. **Memory/Storage Device** (Périphérique de mémoire/stockage) : Périphériques utilisés pour stocker des programmes et des données (divisés en mémoire principale et stockage auxiliaire).\n4. **Control Device** (Périphérique de contrôle) : Périphériques qui interprètent les instructions et émettent des commandes vers d'autres composants.\n5. **Arithmetic Logic Device** (Périphérique logique arithmétique) : Périphériques qui effectuent des opérations arithmétiques et logiques.\n\nParmi ceux-ci, la puce qui intègre le périphérique de contrôle et le périphérique logique arithmétique est le **CPU (Central Processing Unit)**, qui agit comme le « cerveau » de l'ordinateur.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:2:en"
  };

  window.CONTENT_I18N["itpass:3"] = window.CONTENT_I18N["itpass:3"] || {};
  window.CONTENT_I18N["itpass:3"].fr = {
    title: "1-02-1 Métriques de performance du CPU (CPU Performance Metrics)",
    concept: "**Métriques de performance du CPU (CPU Performance Metrics) :**\n- **Clock Frequency** (Fréquence d'horloge) : Le nombre de signaux électriques générés par seconde (Hz). Plus la valeur est élevée, plus la vitesse de traitement est rapide.\n- **CPI (Cycles Per Instruction)** : Le nombre de cycles d'horloge requis pour exécuter une seule instruction. Plus la valeur est basse, meilleure est l'efficacité du traitement.\n- **Multi-core Processor** (Processeur multicœur) : Une puce CPU unique qui contient plusieurs « cœurs » de traitement. Le traitement en parallèle améliore les performances globales et les capacités.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:3:en"
  };

  window.CONTENT_I18N["itpass:4"] = window.CONTENT_I18N["itpass:4"] || {};
  window.CONTENT_I18N["itpass:4"].fr = {
    title: "1-03 Main Memory et Auxiliary Storage",
    concept: "Les périphériques de stockage sont classés en **Main Memory** (RAM), avec laquelle le CPU interagit directement en lecture et en écriture, et **Auxiliary Storage** (comme les HDD et SSD), qui stocke de manière permanente de grandes quantités de données.\n\n**Différence entre Main Memory et Auxiliary Storage (Pour les débutants) :**\nLa main memory est comme votre « espace de bureau ». Plus le bureau est grand, plus vous pouvez ouvrir de documents et travailler dessus en même temps, mais lorsque vous éteignez l'appareil, le bureau est vidé (volatile). L'auxiliary storage est comme un « classeur ou une bibliothèque ». Il faut plus de temps pour récupérer un livre, mais le contenu reste même lorsque l'appareil est éteint (non-volatile).\n\n**Rôle de la Cache Memory :**\nLa vitesse de traitement d'un CPU est extrêmement rapide, mais la vitesse de lecture/écriture de la main memory est relativement lente, ce qui oblige le CPU à attendre (idle loss). C'est pourquoi une **Cache Memory** de petite capacité mais ultra-rapide est placée entre le CPU et la main memory. En y copiant les données fréquemment utilisées, elle réduit les accès à la main memory et accélère l'ensemble du système.\n\nLa probabilité que les données requises par le CPU se trouvent dans la cache memory est appelée le **Hit Rate**. Plus le hit rate est élevé, plus le temps d'accès effectif est court.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:4:en"
  };

  window.CONTENT_I18N["itpass:5"] = window.CONTENT_I18N["itpass:5"] || {};
  window.CONTENT_I18N["itpass:5"].fr = {
    title: "1-04 Semiconductor Memory",
    concept: "La semiconductor memory est classée en **Volatile Memory**, où les données stockées sont perdues lorsque l'alimentation est coupée, et en **Non-volatile Memory**, qui conserve son contenu même sans alimentation.\n\n**1. RAM (Random Access Memory) - Volatile :**\n- **DRAM (Dynamic RAM)** : Stocke les informations en accumulant des charges électriques dans des condensateurs. Étant donné que les charges fuient avec le temps, une **Refresh Operation** pour réalimenter la mémoire est essentielle pour conserver les données. Elle est bon marché et peut être fabriquée en grande capacité, c'est pourquoi elle est utilisée comme **Main Memory** du PC.\n- **SRAM (Static RAM)** : Stocke les informations en utilisant des circuits électriques appelés flip-flops. Elle ne nécessite pas de refresh operations et est nettement plus rapide que la DRAM, mais elle est structurellement complexe, coûteuse et a une faible capacité. Elle est utilisée pour la **Cache Memory**.\n\n**2. ROM (Read Only Memory) - Non-volatile :**\n- **Flash Memory** : Un type de non-volatile memory qui peut être réécrit électriquement. N'ayant pas de pièces mobiles et étant résistante aux chocs physiques, elle est largement utilisée dans les SSD, les clés USB, les cartes SD et le stockage des smartphones.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:5:en"
  };

  window.CONTENT_I18N["itpass:6"] = window.CONTENT_I18N["itpass:6"] || {};
  window.CONTENT_I18N["itpass:6"].fr = {
    title: "1-05 Input/Output Devices",
    concept: "Les périphériques d'entrée et de sortie (input/output devices) sont des interfaces matérielles utilisées pour échanger des informations entre l'unité centrale de l'ordinateur et le monde extérieur.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:6:en"
  };

  window.CONTENT_I18N["itpass:7"] = window.CONTENT_I18N["itpass:7"] || {};
  window.CONTENT_I18N["itpass:7"].fr = {
    title: "1-05-1 1. Input Devices",
    concept: "**1. Input Devices :**\nOutre les claviers et les souris, ceux-ci comprennent les **Scanners** pour lire les images, les **Touch Panels** pour spécifier des positions avec un doigt et les **Barcode Readers** pour lire les codes de produits.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:7:en"
  };

  window.CONTENT_I18N["itpass:8"] = window.CONTENT_I18N["itpass:8"] || {};
  window.CONTENT_I18N["itpass:8"].fr = {
    title: "1-05-2 2. Output Devices",
    concept: "**2. Output Devices :**\n- **Liquid Crystal Display (LCD)** : Affiche des écrans en bloquant ou en transmettant la lumière d'un rétroéclairage à l'aide d'éléments à cristaux liquides.\n- **Organic EL Display (OLED)** : Utilise des composés organiques spéciaux (éléments) qui émettent de la lumière lorsqu'une tension est appliquée. Comme aucun rétroéclairage n'est requis, il peut être rendu beaucoup plus **Fin (Thinner)** que les LCD, permettant une représentation fidèle du noir (rapport de contraste élevé) et des vitesses de réponse rapides.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:8:en"
  };

  window.CONTENT_I18N["itpass:9"] = window.CONTENT_I18N["itpass:9"] || {};
  window.CONTENT_I18N["itpass:9"].fr = {
    title: "1-05-3 3. Resolution Units",
    concept: "**3. Resolution Units :**\n**dpi** (dots per inch) est utilisé comme indice pour représenter la résolution des écrans et de l'impression. Il indique le nombre de points (dots) disposés par pouce (environ 2,54 cm). Plus la valeur est élevée, plus la résolution est grande et plus l'affichage est beau.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:9:en"
  };

  window.CONTENT_I18N["itpass:10"] = window.CONTENT_I18N["itpass:10"] || {};
  window.CONTENT_I18N["itpass:10"].fr = {
    title: "1-06 Input/Output Interfaces",
    concept: "Les interfaces d'entrée/sortie (input/output interfaces) sont des termes généraux désignant les normes et les connecteurs utilisés pour connecter l'ordinateur à des périphériques (tels que des claviers, des imprimantes et des HDD externes).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:10:en"
  };

  window.CONTENT_I18N["itpass:11"] = window.CONTENT_I18N["itpass:11"] || {};
  window.CONTENT_I18N["itpass:11"].fr = {
    title: "1-06-1 1. Wired Interfaces",
    concept: "**1. Wired interface :**\n- **USB (Universal Serial Bus)** : L'interface de transfert série (méthode d'envoi de données un bit à la fois sur une seule voie) la plus typique. Jusqu'à **127 units** peuvent be connectées via un hub USB. Il dispose de la fonctionnalité **Hot Plug** qui permet de connecter et de retirer des câbles pendant que le PC est allumé, et de la fonctionnalité **Bus Power** qui alimente les périphériques via le câble.\n- **HDMI (High-Definition Multimedia Interface)** : Une norme qui transmet des signaux vidéo numériques et des signaux audio numériques ensemble sur un seul câble. Largement utilisé dans les téléviseurs et les moniteurs PC.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:11:en"
  };

  window.CONTENT_I18N["itpass:12"] = window.CONTENT_I18N["itpass:12"] || {};
  window.CONTENT_I18N["itpass:12"].fr = {
    title: "1-06-2 2. Wireless Interfaces",
    concept: "**2. Wireless interface :**\n- **Bluetooth** : Une norme de communication sans fil à courte portée qui connecte des périphériques tels que des claviers, des souris et des écouteurs sans fil dans un rayon étroit de quelques mètres à quelques dizaines de mètres.\n- **Wi-Fi** : Une norme de communication pour connecter sans fil des PC et des smartphones à Internet (LAN).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:12:en"
  };

  window.CONTENT_I18N["itpass:13"] = window.CONTENT_I18N["itpass:13"] || {};
  window.CONTENT_I18N["itpass:13"].fr = {
    title: "1-07 AI",
    concept: "Le machine learning et le deep learning sont les technologies qui soutiennent le développement de l'intelligence artificielle (AI).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:13:en"
  };

  window.CONTENT_I18N["itpass:14"] = window.CONTENT_I18N["itpass:14"] || {};
  window.CONTENT_I18N["itpass:14"].fr = {
    title: "1-07-1 1. Machine Learning",
    concept: "**1. Machine Learning :**\nIl s'agit d'une méthode consistant à fournir une grande quantité de données (big data) à un ordinateur et à lui faire apprendre de manière autonome les modèles et les règles cachés dans ces données. Il existe trois méthodes d'apprentissage :\n- **Supervised learning** : Les données d'entrée et la « réponse correcte (label) » sont fournies sous forme de paire pour l'apprentissage. Par exemple, nous ajoutons le tag correct « chat » à une image (**annotation**) et laissons l'AI apprendre à partir de celle-ci. Il est utilisé pour la classification automatique des spams, etc.\n- **Unsupervised learning** : Analyse les caractéristiques des données elles-mêmes et divise les données en groupes (clustering) sans fournir de réponses correctes. Il est utilisé pour analyser les modèles de comportement d'achat des clients.\n- **Reinforcement learning** : L'AI elle-même répète des essais et des erreurs (trial and error) et, en attribuant une « récompense (score)/reward » au meilleur comportement, elle apprend le modèle de comportement optimal. Il est utilisé dans les AI pour le Go et le Shogi, et dans la conduite autonome.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:14:en"
  };

  window.CONTENT_I18N["itpass:15"] = window.CONTENT_I18N["itpass:15"] || {};
  window.CONTENT_I18N["itpass:15"].fr = {
    title: "1-07-2 2. Deep learning",
    concept: "**2. Deep learning :**\nIl s'agit d'une technologie avancée de machine learning dans laquelle un ordinateur analyse en profondeur et apprend lui-même les caractéristiques des données en superposant plusieurs couches (profondes) de réseaux de neurones (**neural networks**) qui imitent la structure des cellules nerveuses (neurones) du cerveau humain.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:15:en"
  };

  window.CONTENT_I18N["itpass:16"] = window.CONTENT_I18N["itpass:16"] || {};
  window.CONTENT_I18N["itpass:16"].fr = {
    title: "1-08 Probability and Statistics",
    concept: "Ce sont des indicateurs de valeurs représentatives et de dispersion qui forment la base de l'analyse des données et de la prise de décision de gestion.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:16:en"
  };

  window.CONTENT_I18N["itpass:17"] = window.CONTENT_I18N["itpass:17"] || {};
  window.CONTENT_I18N["itpass:17"].fr = {
    title: "1-08-1 1. Representative Values",
    concept: "**1. Representative value indicating the center of data :**\n- **Average value** (Valeur moyenne) : Valeur obtenue en divisant la somme de toutes les valeurs numériques par le nombre d'éléments de données. Elle a pour faiblesse d'être facilement affectée par des valeurs extrêmement grandes ou petites (outliers - valeurs aberrantes).\n- **Median** (Médiane) : La valeur située exactement au milieu lorsque les données sont classées par ordre de taille. S'il y a un nombre pair, la moyenne des deux valeurs centrales sera utilisée. Sa force est d'être moins sensible aux outliers.\n- **Mode** : La valeur qui apparaît le plus fréquemment dans les données.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:17:en"
  };

  window.CONTENT_I18N["itpass:18"] = window.CONTENT_I18N["itpass:18"] || {};
  window.CONTENT_I18N["itpass:18"].fr = {
    title: "1-08-2 2. Measures of Dispersion",
    concept: "**2. Indicator showing data dispersion (dispersion) :**\n- **Dispersion** (Variance) : Valeur moyenne de la distance entre chaque donnée et la valeur moyenne. Plus la valeur est élevée, plus les données sont dispersées.\n- **Standard deviation** (Écart-type) : La racine carrée de la variance. Il est facile à manipuler car ses unités correspondent aux données d'origine, et il est également utilisé pour calculer la « valeur de déviation » (deviation value) pour les examens d'entrée.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:18:en"
  };

  window.CONTENT_I18N["itpass:19"] = window.CONTENT_I18N["itpass:19"] || {};
  window.CONTENT_I18N["itpass:19"].fr = {
    title: "1-09 Radix Conversion (Base Conversion)",
    concept: "À l'intérieur d'un ordinateur, tous les nombres sont traités sous forme de nombres binaires (binary numbers), 0 et 1, mais pour faciliter la compréhension humaine, on utilise des nombres décimaux (decimal numbers) et des nombres hexadécimaux (hexadecimal numbers), qui sont des versions raccourcies des nombres binaires.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:19:en"
  };

  window.CONTENT_I18N["itpass:20"] = window.CONTENT_I18N["itpass:20"] || {};
  window.CONTENT_I18N["itpass:20"].fr = {
    title: "1-09-1 1. Characteristics of Number Systems",
    concept: "**1. Characteristics of each number system (Caractéristiques de chaque système de numération) :**\n- **Decimal number** (Nombre décimal) : Un système de numération que nous utilisons tous les jours, utilisant 10 caractères de 0 à 9, et progressant par puissances de 10.\n- **Binary number** (Nombre binaire) : Un système de numération qui utilise seulement deux caractères, 0 et 1, et progresse par puissances de 2. En partant de l'extrémité droite, les chiffres sont « position 2^0 (position des 1) », « position 2^1 (position des 2) », « position 2^2 (position des 4) », « position 2^3 (position des 8) ».\n- **Hexadecimal number** (Nombre hexadécimal) : Un système de numération qui utilise un total de 16 caractères, de 0 à 9 et de A à F (A=10, B=11, C=12, D=13, E=14, F=15) représentant 10 à 15, et progressant par puissances de 16. Quatre chiffres en binaire peuvent être représentés par un seul chiffre en hexadécimal, c'est pourquoi il est souvent utilisé pour représenter la mémoire de l'ordinateur.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:20:en"
  };

  window.CONTENT_I18N["itpass:21"] = window.CONTENT_I18N["itpass:21"] || {};
  window.CONTENT_I18N["itpass:21"].fr = {
    title: "1-09-2 2. Decimal to Binary Conversion",
    concept: "**2. Conversion from decimal to binary (Sudare calculation) :**\nContinuez à diviser le nombre décimal par « 2 » et organisez les restes dans l'ordre en partant du bas. Pour vous préparer à l'examen, entraînez-vous à faire rapidement des calculs inverses simples de nombres binaires en décimaux (en multipliant et en ajoutant le poids de chaque chiffre).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:21:en"
  };

  window.CONTENT_I18N["itpass:22"] = window.CONTENT_I18N["itpass:22"] || {};
  window.CONTENT_I18N["itpass:22"].fr = {
    title: "2-01 Software",
    concept: "Le logiciel (software) est largement divisé en « System Software (OS) », « Application Software » et « middleware », qui se situe entre les deux, en fonction de son rôle.\n\n**1. Basic software (OS - Operating System) :**\nC'est le logiciel qui fait fonctionner le matériel et constitue le fondement de tous les logiciels, gérant les entrées clavier, les sorties écran et la gestion de la mémoire. Windows, macOS, Linux, iOS, Android, etc.\n\n**2. Applied software (application) :**\nLogiciel qui permet aux utilisateurs de réaliser des tâches spécifiques (travail ou divertissement), telles que la création de documents (Word), les feuilles de calcul (Excel) et les navigateurs Web.\n\n**3. OSS (Open Source Software) :**\nIl s'agit de logiciels dont le code source (blueprint du programme) est accessible au public gratuitement, et que chacun peut utiliser, améliorer et redistribuer librement. L'utilisation commerciale est possible à condition de respecter les règles de licence.\n- **OSS représentatifs** : Linux (OS), Apache (web server), MySQL/PostgreSQL (database), Android (mobile OS), etc.\n- **Non-OSS** : Windows, Microsoft Office (licence commerciale dont le code source n'est pas divulgué).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:22:en"
  };

  window.CONTENT_I18N["itpass:23"] = window.CONTENT_I18N["itpass:23"] || {};
  window.CONTENT_I18N["itpass:23"].fr = {
    title: "2-02 File Management and Paths",
    concept: "L'OS gère les données sous forme d'unités appelées **files**, et les dossiers qui classent les fichiers sont appelés **directories**. Le répertoire a une structure hiérarchique (structure en arbre).\n\nIl existe deux expressions pour indiquer l'emplacement d'un fichier :\n1. **Absolute path** : Une méthode dans laquelle tout est écrit en partant du répertoire racine (root directory) le plus élevé.\n2. **Relative path** : Une méthode d'écriture en partant du répertoire courant (current directory) (un niveau supérieur est représenté par « .. »).\n\n**Points for IT beginners :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés ainsi que des scénarios d'utilisation pratiques (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:23:en"
  };

  window.CONTENT_I18N["itpass:24"] = window.CONTENT_I18N["itpass:24"] || {};
  window.CONTENT_I18N["itpass:24"].fr = {
    title: "2-03 Backup Strategies",
    concept: "La sauvegarde (backup) de données consiste à stocker les données en double en cas de panne d'équipement ou de corruption des données.\n\n1. **Full Backup** : Sauvegarde toutes les données cibles à chaque fois. La récupération (recovery) est la plus rapide, mais cela prend du temps.\n2. **Differential backup** : Sauvegarde les données qui ont changé depuis la première sauvegarde complète à chaque fois.\n3. **Incremental backup** : Sauvegarde uniquement la partie qui a augmenté depuis la sauvegarde précédente (quel que soit son type). Bien que le temps de sauvegarde soit court, la récupération est compliquée.\n\n**Points for IT beginners :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés ainsi que des scénarios d'utilisation pratiques (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:24:en"
  };

  window.CONTENT_I18N["itpass:25"] = window.CONTENT_I18N["itpass:25"] || {};
  window.CONTENT_I18N["itpass:25"].fr = {
    title: "2-04 Spreadsheets: Relative and Absolute References",
    concept: "Lors de la copie (glissement) de formules vers d'autres cellules dans un tableur (Excel, etc.), spécifiez les règles de déplacement des cellules référencées.\n\n1. **Relative reference** : La position de la cellule référencée est automatiquement déplacée en fonction de la direction dans laquelle la formule est copiée (par exemple `A1`).\n2. **Absolute Reference** : Référez-vous toujours à une cellule spécifique, peu importe où vous copiez la formule. Ajoutez `$` devant le numéro de ligne ou la lettre de colonne (par exemple `$A$1`).\n\n**Points for IT beginners :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés ainsi que des scénarios d'utilisation pratiques (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:25:en"
  };

  window.CONTENT_I18N["itpass:26"] = window.CONTENT_I18N["itpass:26"] || {};
  window.CONTENT_I18N["itpass:26"].fr = {
    title: "2-05 Spreadsheets: Basic Functions",
    concept: "Cette fonction vous permet d'effectuer facilement des calculs complexes à l'aide d'un tableur. Les fonctions de base qui apparaissent fréquemment dans l'examen IT Passport sont les suivantes.\n\n- **SUM** : Calcule la somme des nombres dans la plage spécifiée.\n- **AVERAGE** : Calcule la valeur moyenne des valeurs numériques dans la plage spécifiée.\n- **MAX / MIN** : Trouve la valeur maximale / minimale dans la plage spécifiée.\n- **IF** : « IF (condition, si vrai, si faux) » modifie la valeur de sortie selon que la condition est remplie ou non.\n\n**Points for IT beginners :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés ainsi que des scénarios d'utilisation pratiques (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:26:en"
  };

  window.CONTENT_I18N["itpass:27"] = window.CONTENT_I18N["itpass:27"] || {};
  window.CONTENT_I18N["itpass:27"].fr = {
    title: "2-06 Spreadsheets: Advanced Functions",
    concept: "Il s'agit d'une fonction appliquée utilisée pour l'extraction de données pratiques.\n\n- **VLOOKUP** : Recherche verticalement dans une autre table en fonction de la clé spécifiée et récupère les données spécifiées de la ligne correspondante. Spécifiez sous la forme « VLOOKUP(valeur recherchée, plage, numéro de colonne, méthode de recherche) ».\n- **HLOOKUP** : Recherche horizontalement dans une autre table.\n- **CONCAT (CONCATENATE)** : Combine plusieurs chaînes de caractères en une seule.\n\n**Points for IT beginners :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés ainsi que des scénarios d'utilisation pratiques (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:27:en"
  };

  window.CONTENT_I18N["itpass:28"] = window.CONTENT_I18N["itpass:28"] || {};
  window.CONTENT_I18N["itpass:28"].fr = {
    title: "2-07 User Interfaces (UI/UX)",
    concept: "Un système d'échange d'informations entre un utilisateur et un ordinateur.\n\n1. **GUI** : Un écran d'opération intuitif qui vous permet d'opérer visuellement à l'aide d'icônes et d'une souris.\n2. **CUI** : Un écran qui est utilisé en saisissant des commandes textuelles au clavier.\n3. **Related indicators** : L'**Usability** (utilisabilité) fait référence à la facilité d'utilisation, l'**UX (User Experience)** fait référence à la valeur d'expérience obtenue via un produit, et le **Universal Design** (conception universelle) fait référence à la conception de produits faciles à utiliser pour tout le monde, indépendamment de l'âge ou du handicap.\n\n**Points for IT beginners :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés ainsi que des scénarios d'utilisation pratiques (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:28:en"
  };

  window.CONTENT_I18N["itpass:29"] = window.CONTENT_I18N["itpass:29"] || {};
  window.CONTENT_I18N["itpass:29"].fr = {
    title: "2-08 Multimedia",
    concept: "Une technologie qui gère plusieurs médias tels que les images, l'audio et les vidéos sous forme de données numériques.\n\n1. **Still image format** : **JPEG** (pour les photos, compression avec perte/lossy compression), **PNG** (pour les illustrations, transparent, compression sans perte/lossless compression), **GIF** (256 couleurs, animation possible).\n2. **Video format** : **MP4** (très populaire pour la distribution sur Internet).\n3. **Audio format** : **MP3** (compressé en supprimant les parties difficiles à entendre pour l'oreille humaine), **MIDI** (une norme qui enregistre les informations d'interprétation et les données de partition, mais ne contient pas le son lui-même).\n\n**Points for IT beginners :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés ainsi que des scénarios d'utilisation pratiques (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:29:en"
  };

  window.CONTENT_I18N["itpass:30"] = window.CONTENT_I18N["itpass:30"] || {};
  window.CONTENT_I18N["itpass:30"].fr = {
    title: "3-01 System Architectures",
    concept: "Il s'agit de la forme d'installation et d'exploitation du système.\n\n1. **Client-server system** : Une configuration divisée en un « client » qui demande un traitement et un « serveur » qui fournit ce traitement.\n2. **Cloud computing** : Une forme d'utilisation de ressources telles que des serveurs virtuels uniquement selon les besoins via Internet. Les modèles de prestation de services incluent **SaaS** (mise à disposition d'applications), **PaaS** (plateforme de développement) et **IaaS** (infrastructure virtuelle).\n3. **Grid computing** : Une forme de connexion d'un grand nombre d'ordinateurs sur un réseau pour les faire fonctionner comme un ordinateur virtuel à très haute performance.\n\n**Points for IT beginners :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés ainsi que des scénarios d'utilisation pratiques (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:30:en"
  };

  window.CONTENT_I18N["itpass:31"] = window.CONTENT_I18N["itpass:31"] || {};
  window.CONTENT_I18N["itpass:31"].fr = {
    title: "3-02 High Availability Configurations",
    concept: "Il s'agit d'une technologie de configuration qui augmente la fault tolerance du système.\n\n1. **Duplex system** : Préparez une machine de production et une machine de secours. L'état dans lequel un appareil de secours peut être activé immédiatement (standby) est appelé **Hot Standby**, et l'état de préparation tel que la mise hors tension est appelé **Cold Standby**.\n2. **Dual System** : Deux ordinateurs exécutent toujours le même processus en même temps et comparent les résultats. Le plus sûr, mais coûteux.\n3. **RAID** : Technologie de combinaison de plusieurs disques. **RAID 0** (striping : vitesse plus rapide avec écriture distribuée, pas de fault tolerance), **RAID 1** (mirroring : double écriture des mêmes données), **RAID 5** (enregistrement distribué de parité - parity).\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:31:en"
  };

  window.CONTENT_I18N["itpass:32"] = window.CONTENT_I18N["itpass:32"] || {};
  window.CONTENT_I18N["itpass:32"].fr = {
    title: "3-03 System Reliability (Availability)",
    concept: "Il s'agit d'un indice d'évaluation qui montre le pourcentage de systèmes qui continuent de fonctionner sans panne.\n\n- **MTBF** : Temps moyen de bon fonctionnement (temps de fonctionnement entre les pannes. Plus il est long, mieux c'est).\n- **MTTR** : Temps moyen de réparation (temps nécessaire pour réparer. Plus il est court, mieux c'est).\n- **Operating rate (availability)** : Probabilité que le système fonctionne normalement. La formule est :\n  `Operating rate = MTBF / (MTBF + MTTR)`\n- **Series connection** : Les deux appareils doivent fonctionner. Taux d'utilisation global = `R1 × R2`\n- **Parallel connection** : Un seul doit fonctionner. Utilisation globale = `1 - (1 - R1) × (1 - R2)`\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:32:en"
  };

  window.CONTENT_I18N["itpass:33"] = window.CONTENT_I18N["itpass:33"] || {};
  window.CONTENT_I18N["itpass:33"].fr = {
    title: "3-04 System Performance Evaluation",
    concept: "Il s'agit d'une norme permettant d'évaluer objectivement les performances du système.\n\n1. **Response time** : Le temps écoulé entre le moment où l'utilisateur envoie une instruction et celui où le système renvoie la première réponse.\n2. **Throughput** : La quantité de travail qu'un système peut traiter par unité de temps (capacité de traitement).\n3. **Benchmark test** : Un test qui mesure et compare la vitesse effective d'un système en exécutant un programme de mesure standard.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:33:en"
  };

  window.CONTENT_I18N["itpass:34"] = window.CONTENT_I18N["itpass:34"] || {};
  window.CONTENT_I18N["itpass:34"].fr = {
    title: "3-05 IoT and Embedded Systems",
    concept: "1. **Embedded system** : Un système informatique dédié intégré aux appareils électroménagers, aux automobiles, etc., qui effectue des contrôles spécifiques. Des performances en temps réel sont requises.\n2. **IoT system** : Technologie qui connecte des objets à Internet. Il se compose d'un **sensor** qui détecte des informations physiques et d'un **actuator** qui fonctionne physiquement en réponse à un signal de commande.\nUne configuration qui réduit les délais de communication en effectuant le traitement primaire à proximité du terminal est appelée **edge computing**.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:34:en"
  };

  window.CONTENT_I18N["itpass:35"] = window.CONTENT_I18N["itpass:35"] || {};
  window.CONTENT_I18N["itpass:35"].fr = {
    title: "3-06 IT Solutions and Outsourcing",
    concept: "Il s'agit d'une forme de service IT qui résout les problèmes de gestion d'entreprise.\n\n1. **ASP (SaaS)** : Un fournisseur de services qui permet d'utiliser un logiciel applicatif via un réseau.\n2. **System Integration (SI)** : Un service qui prend en charge collectivement la planification, le développement, la mise en œuvre et la maintenance du système.\n3. **Housing (colocation)** : Service dans lequel une entreprise loue ses propres lignes de communication et espaces de construction et stocke les équipements des clients. Le client est propriétaire du matériel (alors que l'hébergement loue également le matériel).\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:35:en"
  };

  window.CONTENT_I18N["itpass:36"] = window.CONTENT_I18N["itpass:36"] || {};
  window.CONTENT_I18N["itpass:36"].fr = {
    title: "4-01 Network Devices and Topologies",
    concept: "Il s'agit du rôle des équipements matériels qui connectent les réseaux.\n\n1. **LAN / WAN** : Un réseau limité au sein des locaux (LAN) et un réseau étendu (WAN) utilisant des lignes publiques.\n2. **Hub (L2 switch)** : Un appareil qui relaye les données en fonction de l'adresse MAC au sein du même réseau.\n3. **Router** : Appareil qui connecte différents réseaux (par exemple LAN et Internet) et relaie (**routing**) les données vers la meilleure route en fonction de l'adresse IP.\n4. **Gateway** : Appareil qui connecte des réseaux avec différents protocoles de communication et convertit mutuellement les données.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:36:en"
  };

  window.CONTENT_I18N["itpass:37"] = window.CONTENT_I18N["itpass:37"] || {};
  window.CONTENT_I18N["itpass:37"].fr = {
    title: "4-02 Wireless LAN (Wi-Fi)",
    concept: "Un LAN qui utilise des ondes radio pour se connecter sans utiliser de câbles. Le nom standard est IEEE 802.11, communément appelé **Wi-Fi**.\n\n1. **SSID** : Un nom pour identifier le point d'accès sans fil auquel se connecter.\n2. **Encryption Standard** : La communication est cryptée pour empêcher les fuites de données dues à l'interception des ondes radio. Le WEP, faible, est désormais remplacé par le **WPA2** et le tout dernier **WPA3**.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:37:en"
  };

  window.CONTENT_I18N["itpass:38"] = window.CONTENT_I18N["itpass:38"] || {};
  window.CONTENT_I18N["itpass:38"].fr = {
    title: "4-03 Communication Protocols",
    concept: "Il s'agit de « règles communes » permettant aux ordinateurs de communiquer entre eux via un réseau. La norme représentative est le **TCP/IP**.\n\n1. **TCP** : Un protocole fiable orienté connexion (« connection-oriented ») qui vérifie l'arrivée des données et retransmet les paquets perdus.\n2. **UDP** : Un protocole sans connexion (« connectionless ») qui privilégie la vitesse et continue d'envoyer des données unilatéralement sans confirmer l'arrivée (utilisé pour la diffusion vidéo en temps réel, etc.).\n3. **Port number** : Un numéro pour identifier le type d'application (HTTP : numéro 80, HTTPS : numéro 443, etc.).\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:38:en"
  };

  window.CONTENT_I18N["itpass:39"] = window.CONTENT_I18N["itpass:39"] || {};
  window.CONTENT_I18N["itpass:39"].fr = {
    title: "4-04 How the Internet Works",
    concept: "Un mécanisme d'attribution d'adresses et de résolution de noms sur Internet.\n\n1. **IP Address** : L'adresse Internet de votre ordinateur. Il existe l'**IPv4** 32 bits (avec des problèmes d'épuisement) et l'**IPv6** 128 bits.\n2. **DNS** : Système qui convertit mutuellement (résolution de noms) les noms de domaine tels que « www.ipa.go.jp » et les adresses IP traitées par les machines telles que « 210.146.x.x ».\n3. **DHCP** : Protocole qui attribue automatiquement une adresse IP à un appareil lors de sa connexion à un réseau.\n4. **NAT (NAPT)** : Technologie qui convertit mutuellement les adresses IP privées et les adresses IP globales et connecte plusieurs appareils à Internet avec une seule adresse globale.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:39:en"
  };

  window.CONTENT_I18N["itpass:40"] = window.CONTENT_I18N["itpass:40"] || {};
  window.CONTENT_I18N["itpass:40"].fr = {
    title: "4-05 Network Communication Services",
    concept: "Il s'agit d'un service de ligne d'infrastructure pour se connecter à Internet.\n\n1. **FTTH** : Communication filaire ultra-rapide qui amène la fibre optique directement dans votre maison.\n2. **VPN (Virtual Private Network)** : Une technologie qui utilise le cryptage et d'autres technologies pour créer un tunnel sécurisé sur la ligne Internet publique, donnant l'impression qu'il s'agit d'une ligne privée pour votre entreprise.\n3. **MVNO** : Un opérateur qui ne possède pas son propre réseau de lignes et loue des lignes à d'autres entreprises (grands opérateurs) pour fournir des services de communication SIM bon marché.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:40:en"
  };

  window.CONTENT_I18N["itpass:41"] = window.CONTENT_I18N["itpass:41"] || {};
  window.CONTENT_I18N["itpass:41"].fr = {
    title: "4-06 Web Page Technologies",
    concept: "Une technologie pour visualiser et créer des sites Web.\n\n1. **HTML** : Un langage de balisage qui décrit la structure de base d'une page Web.\n2. **HTTP / HTTPS** : Un protocole d'échange de données entre un navigateur Web et un serveur Web. HTTPS crypte le contenu des communications (SSL/TLS) pour empêcher les écoutes clandestines.\n3. **Cookie** : Données textuelles qu'un site Web stocke temporairement du côté du navigateur afin de sauvegarder l'identification de l'utilisateur, l'état de connexion, les informations du panier, etc.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:41:en"
  };

  window.CONTENT_I18N["itpass:42"] = window.CONTENT_I18N["itpass:42"] || {};
  window.CONTENT_I18N["itpass:42"].fr = {
    title: "4-07 Email Protocols",
    concept: "Un ensemble de protocoles pour l'envoi et la réception de courriers électroniques sur Internet.\n\n1. **SMTP** : Un protocole pour l'envoi et le transfert d'e-mails entre serveurs de messagerie.\n2. **POP3** : Un protocole qui télécharge et gère les e-mails qui vous sont adressés et qui arrivent sur le serveur de messagerie vers votre PC ou autre terminal (par défaut, ils sont supprimés du serveur après avoir été téléchargés).\n3. **IMAP** : Un protocole qui vous permet de lire, d'écrire et de gérer des dossiers directement sur le serveur de messagerie sans télécharger d'e-mails sur votre propre appareil (peut être synchronisé sur plusieurs appareils).\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:42:en"
  };

  window.CONTENT_I18N["itpass:43"] = window.CONTENT_I18N["itpass:43"] || {};
  window.CONTENT_I18N["itpass:43"].fr = {
    title: "5-01 Security Triad and Threats",
    concept: "1. **Trois éléments de la sécurité de l'information (CIA)** :\n   - **Confidentiality** : Seules les personnes autorisées peuvent accéder aux informations.\n   - **Integrity** : Les informations n'ont pas été altérées et sont exactes.\n   - **Availability** : La disponibilité des informations chaque fois qu'elles sont nécessaires.\n2. **Principaux logiciels malveillants (Malware)** :\n   - **Ransomware** : Crypte les données sans autorisation et exige une rançon.\n   - **Trojan Horse** : Se fait passer pour une application utile et fait des choses malveillantes en coulisses.\n   - **Worm** : Se réplique lui-même et se propage via le réseau.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:43:en"
  };

  window.CONTENT_I18N["itpass:44"] = window.CONTENT_I18N["itpass:44"] || {};
  window.CONTENT_I18N["itpass:44"].fr = {
    title: "5-02 Common Cyberattacks",
    concept: "Il s'agit d'une méthode d'attaque réseau utilisée par un tiers malveillant.\n\n1. **DoS (DDoS) attack** : Une attaque qui envoie un grand nombre de requêtes pour surcharger un serveur et le mettre hors service.\n2. **SQL injection** : Une attaque qui manipule frauduleusement la database en saisissant du SQL malveillant dans le champ de saisie d'un site Web.\n3. **Cross-site scripting (XSS)** : Une attaque qui intègre un script malveillant dans un site Web vulnérable et l'exécute sur le navigateur d'un tiers qui le consulte pour voler des cookies et d'autres informations.\n4. **Phishing** : L'acte d'envoyer un e-mail frauduleux prétendant provenir d'une banque, etc., vous menant vers un faux site Web qui ressemble exactement au vrai, et vous incitant à donner vos informations personnelles.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:44:en"
  };

  window.CONTENT_I18N["itpass:45"] = window.CONTENT_I18N["itpass:45"] || {};
  window.CONTENT_I18N["itpass:45"].fr = {
    title: "5-03 Information Security Management",
    concept: "Système par lequel une organisation maintient et améliore la sécurité de l'information de manière planifiée. La norme représentative est appelée **ISMS (Information Security Management System)**.\n\nNous formulons la **Information Security Policy**, qui constitue la norme de sécurité la plus élevée au sein de l'organisation, et définissons les « Normes de mesures de sécurité de l'information », qui sont des règles de conduite spécifiques. Les opérations de gestion seront continuellement améliorées selon le cycle PDCA (Plan -> Do -> Check -> Act).\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:45:en"
  };

  window.CONTENT_I18N["itpass:46"] = window.CONTENT_I18N["itpass:46"] || {};
  window.CONTENT_I18N["itpass:46"].fr = {
    title: "5-04 Risk Management",
    concept: "Il s'agit du processus d'identification et d'analyse des risques et de sélection des contre-mesures appropriées.\n\n1. **Risk avoidance** : Éliminer les opérations risquées elles-mêmes.\n2. **Risk reduction** : Réduire la probabilité d'occurrence et l'impact grâce à l'introduction de logiciels de sécurité et à l'éducation.\n3. **Risk Transfer** : Transférer le risque à quelqu'un d'autre (par exemple en souscrivant une assurance, en externalisant un système).\n4. **Risk acceptance (retention)** : Le coût des contre-mesures est plus élevé, le risque est donc accepté en l'état.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:46:en"
  };

  window.CONTENT_I18N["itpass:47"] = window.CONTENT_I18N["itpass:47"] || {};
  window.CONTENT_I18N["itpass:47"].fr = {
    title: "5-05 User Authentication",
    concept: "Il s'agit d'une technologie qui vérifie que la personne tentant de se connecter au système est bien celle qu'elle prétend être.\n\n1. **Trois facteurs d'authentification** : **Knowledge** (quelque chose que la personne sait : mot de passe), **Possession** (quelque chose que la personne possède : carte IC, jeton de mot de passe à usage unique), **Biometric information** (caractéristiques physiques de la personne : empreintes digitales, visage, veines). La combinaison de deux ou plusieurs de ces éléments est appelée **multi-factor authentication**.\n2. **Single Sign-On (SSO)** : Un mécanisme qui permet de se connecter automatiquement à plusieurs systèmes et services liés avec une seule authentification.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:47:en"
  };

  window.CONTENT_I18N["itpass:48"] = window.CONTENT_I18N["itpass:48"] || {};
  window.CONTENT_I18N["itpass:48"].fr = {
    title: "5-06 Network Security",
    concept: "Il s'agit d'une mesure de défense visant à prévenir les attaques provenant de réseaux externes.\n\n1. **Firewall** : Un mur qui inspecte l'adresse IP et le numéro de port (port number) des paquets de communication et bloque les communications inappropriées.\n2. **DMZ (Demilitarized Zone)** : Une zone isolée séparée du LAN interne (sécurité) et d'Internet (dangereux) pour localiser les serveurs destinés à la publication externe (web, email, etc.).\n3. **WAF** : Un pare-feu qui inspecte le contenu des paquets (partie de données HTTP) pour empêcher les attaques de vulnérabilité telles que l'injection SQL (SQL injection) dans les applications Web.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:48:en"
  };

  window.CONTENT_I18N["itpass:49"] = window.CONTENT_I18N["itpass:49"] || {};
  window.CONTENT_I18N["itpass:49"].fr = {
    title: "5-07 Encryption Technologies",
    concept: "Il s'agit d'une technologie qui convertit les données afin qu'elles ne puissent pas être déchiffrées même si elles sont interceptées par un tiers.\n\n1. **Common key cryptography** : Utilise la même clé pour le cryptage et le décryptage. Bien qu'il soit rapide, il existe un problème de distribution des clés (difficulté à transmettre la clé en toute sécurité au partenaire de communication) (exemple typique : **AES**).\n2. **Public key cryptography** : Utilise une paire de « clé publique » que tout le monde peut utiliser et de « clé privée » que seul l'utilisateur possède. Il n'y a pas de problème de distribution de clés, mais le processus est lent. Cryptez avec la **clé publique du destinataire** et décryptez avec la **clé privée du destinataire** (exemple typique : **RSA**).\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:49:en"
  };

  window.CONTENT_I18N["itpass:50"] = window.CONTENT_I18N["itpass:50"] || {};
  window.CONTENT_I18N["itpass:50"].fr = {
    title: "5-08 Digital Signatures and Certificate Authorities",
    concept: "Il s'agit d'une technologie qui prouve l'expéditeur et empêche l'altération.\n\n1. **Electronic signature (digital signature)** : L'expéditeur calcule une valeur de hachage (hash) à partir des données et la crypte (signe) avec la **clé privée de l'expéditeur**. Le destinataire la décrypte et la vérifie avec la clé publique de l'expéditeur. Cela permet la « prévention de l'usurpation d'identité de l'expéditeur » et la « détection de l'altération des données (preuve d'intégrité - integrity) ».\n2. **Certificate Authority (CA)** : Une organisation tierce qui délivre un « certificat numérique » attestant qu'une clé publique appartient au titulaire.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:50:en"
  };

  window.CONTENT_I18N["itpass:51"] = window.CONTENT_I18N["itpass:51"] || {};
  window.CONTENT_I18N["itpass:51"].fr = {
    title: "6-01 Databases and SQL Basics",
    concept: "Un système qui organise et gère efficacement de grandes quantités de données sans duplication est appelé **DBMS (database management system)**, et la tendance actuelle est la **relational database (RDB)**, qui gère les données sous forme de tableau (table).\n\n**SQL**, le langage standard pour la manipulation de données, possède la syntaxe principale suivante :\n- **SELECT** : Extraire des données (référence)\n- **INSERT** : Ajouter des données\n- **UPDATE** : Mettre à jour des données\n- **DELETE** : Supprimer des données\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:51:en"
  };

  window.CONTENT_I18N["itpass:52"] = window.CONTENT_I18N["itpass:52"] || {};
  window.CONTENT_I18N["itpass:52"].fr = {
    title: "6-02 Database Design and ER Models",
    concept: "Il s'agit d'une procédure de conception pour créer une database. L'**E-R diagram** est utilisé comme méthode pour organiser les structures de données dans le monde réel.\n\n1. **Entity** : L'entité gérée (par exemple « customer », « product »). Représentée par un rectangle.\n2. **Relationship** : Association entre entités (par exemple « buy »). Connectez-les par une ligne pour indiquer une relation un-à-plusieurs (cardinalité).\n3. **Key** : Définissez la **Primary Key** qui identifie de manière unique l'enregistrement et la **Foreign Key** qui s'associe à d'autres tables.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:52:en"
  };

  window.CONTENT_I18N["itpass:53"] = window.CONTENT_I18N["itpass:53"] || {};
  window.CONTENT_I18N["itpass:53"].fr = {
    title: "6-03 Database Normalization",
    concept: "Il s'agit du processus de partitionnement des tables et d'élimination de la duplication des données pour éviter les erreurs de cohérence (incohérences).\n\n1. **First normalization** : Éliminer les valeurs multiples dans les cellules du tableau et les réduire à une seule valeur (valeur atomique).\n2. **Second normalization** : Lorsque la clé primaire comporte plusieurs colonnes (clé composite), séparez les éléments qui dépendent uniquement d'une partie de la clé primaire dans une table distincte (élimination des dépendances fonctionnelles partielles).\n3. **Third normalization** : Séparez les éléments qui dépendent d'éléments autres que la clé primaire dans une table distincte (élimination des dépendances fonctionnelles transitives).\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:53:en"
  };

  window.CONTENT_I18N["itpass:54"] = window.CONTENT_I18N["itpass:54"] || {};
  window.CONTENT_I18N["itpass:54"].fr = {
    title: "6-04 SQL Data Filtering and Logic",
    concept: "Utilisez la clause SQL `WHERE` pour filtrer les données avec des conditions complexes.\n\n- **AND** : Extrait lorsque les conditions de gauche et de droite sont « true ».\n- **OR** : Extrait lorsque la condition de gauche ou de droite est « true ».\n- **NOT** : Inverse le « true » et le « false » de la condition spécifiée.\nL'ordre de priorité des opérations est `NOT` > `AND` > `OR`. L'utilisation des parenthèses `( )` donne la priorité la plus élevée à l'opération à l'intérieur des parenthèses.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:54:en"
  };

  window.CONTENT_I18N["itpass:55"] = window.CONTENT_I18N["itpass:55"] || {};
  window.CONTENT_I18N["itpass:55"].fr = {
    title: "6-05 SQL Sorting and Aggregation",
    concept: "Il s'agit de la syntaxe pour trier les résultats obtenus et les regrouper par groupe.\n\n1. **ORDER BY** : Trier les résultats. Spécifiez **ASC** (ordre croissant : le plus petit en premier) ou **DESC** (ordre décroissant : le plus grand en premier).\n2. **GROUP BY** : Regrouper les enregistrements qui ont la même valeur dans une colonne particulière.\n3. **Aggregation functions** : Utilisez une combinaison de **SUM** (somme), **AVG** (moyenne), **COUNT** (nombre de lignes), **MAX** / **MIN**, etc.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:55:en"
  };

  window.CONTENT_I18N["itpass:56"] = window.CONTENT_I18N["itpass:56"] || {};
  window.CONTENT_I18N["itpass:56"].fr = {
    title: "6-06 Transaction Processing and ACID",
    concept: "Une série d'unités de traitement atomiques dans une base de données est appelée une transaction. Les propriétés que les transactions doivent satisfaire sont les **caractéristiques ACID**.\n\n- **A (Atomic)** : Le traitement se termine soit par « toutes les exécutions », soit par « aucune exécution ».\n- **C (Consistency)** : L'incohérence des données ne se produit pas avant et après le traitement.\n- **I (Independence/Isolation)** : Même si plusieurs processus sont exécutés en même temps, ils ne seront pas perturbés par d'autres.\n- **D (Durability)** : Les résultats de traitement terminés ne sont pas perdus même s'il y a une panne.\nUn **Lock** (contrôle exclusif) est effectué pour éviter les collisions de données lors de l'exécution simultanée.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:56:en"
  };

  window.CONTENT_I18N["itpass:57"] = window.CONTENT_I18N["itpass:57"] || {};
  window.CONTENT_I18N["itpass:57"].fr = {
    title: "7-01 Algorithms and Data Structures",
    concept: "1. **Algorithm** : Une procédure claire pour résoudre un problème particulier. Un **Flowchart**, etc. sont utilisés pour la description. Les exemples typiques incluent le **linear search** (recherche linéaire), le **binary search** (recherche binaire) et le **bubble sort** (tri à bulles).\n2. **Data structure** : Une structure qui gère efficacement les données en mémoire. Il en existe deux types : **Stack** (pile - LIFO : last in, first out ; image d'assiettes empilées) et **Queue** (file d'attente - FIFO : first in, first out ; image d'une file d'attente à la caisse).\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:57:en"
  };

  window.CONTENT_I18N["itpass:58"] = window.CONTENT_I18N["itpass:58"] || {};
  window.CONTENT_I18N["itpass:58"].fr = {
    title: "7-02 Pseudo-language",
    concept: "Il s'agit d'une norme de notation commune pour les programmes qui apparaissent à l'examen IT Passport. Elle combine trois structures de contrôle de base (séquentielle, sélection et répétition).\n\n- **Variable** : Une boîte pour sauvegarder temporairement des données.\n- **Array** (Tableau) : Plusieurs éléments de données disposés consécutivement (spécifiés par un numéro d'index). Faites attention au début de l'indice (s'il commence par 0 ou 1).\n- **Iteration** (Boucle) : Quitte la boucle lorsque la condition de fin de boucle est remplie.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:58:en"
  };

  window.CONTENT_I18N["itpass:59"] = window.CONTENT_I18N["itpass:59"] || {};
  window.CONTENT_I18N["itpass:59"].fr = {
    title: "7-03 Programming and Markup Languages",
    concept: "Il s'agit d'un langage de création de systèmes et de pages Web.\n\n1. **Programming languages** : **Java** (fonctionne indépendamment de l'OS), **Python** (incontournable pour le développement de l'IA et l'analyse de données, syntaxe simple), **langage C** (haute vitesse, contrôlable par le matériel).\n2. **Compiler and interpreter** : Une méthode qui convertit la source en langage machine et l'exécute (compilateur - compiler), et une méthode qui l'exécute tout en l'interprétant ligne par ligne (interprète - interpreter).\n3. **Markup language** : Un langage qui structure les données en les entourant de balises (tags). **HTML** (pour l'affichage web), **XML** (les utilisateurs peuvent définir leurs propres balises et sont utilisées pour l'échange de données).\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:59:en"
  };

  window.CONTENT_I18N["itpass:60"] = window.CONTENT_I18N["itpass:60"] || {};
  window.CONTENT_I18N["itpass:60"].fr = {
    title: "8-01 Planning and Requirements Definition",
    concept: "Il s'agit de la première étape du développement de systèmes.\n\n1. **System planning process** : Développer un concept de systématisation basé sur la stratégie de gestion.\n2. **Requirements definition process** : Le processus de clarification des fonctions, des performances et des normes de sécurité requises pour le système et d'accord avec les utilisateurs (le plus important).\n3. **RFP (Request for Proposal)** : Un document dans lequel le donneur d'ordre (l'entreprise) demande au fournisseur de développement (l'entreprise IT) de créer une proposition pour la construction d'un système spécifique. En présentant un RFP, une sélection équitable et précise des fournisseurs est possible.\n\n**Points pour les débutants en IT :**\nCe domaine est très souvent abordé dans l'examen IT Passport, le raccourci pour réussir l'examen consiste donc non seulement à définir les mots-clés, mais également à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:60:en"
  };

  window.CONTENT_I18N["itpass:61"] = window.CONTENT_I18N["itpass:61"] || {};
  window.CONTENT_I18N["itpass:61"].fr = {
    title: "8-02 Processus de développement (Development Process)",
    concept: "Il s'agit du processus de construction et de vérification du système (SLCP).\n\n1. **Design**: Déterminer les écrans et les formats de données en fonction des exigences. Il existe un « external design » qui détermine ce qui est visible pour les utilisateurs, et un « internal design » pour les développeurs.\n2. **Types et ordre de test**:\n   - **Unit test**: Un test effectué sur la plus petite unité de composant (module) d'un programme.\n   - **Integration test**: Un test qui vérifie l'interface en reliant plusieurs parties.\n   - **System testing**: Un test dans lequel le développeur intègre toutes les fonctions et confirme que l'ensemble du système fonctionne comme requis.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:61:en"
  };

  window.CONTENT_I18N["itpass:62"] = window.CONTENT_I18N["itpass:62"] || {};
  window.CONTENT_I18N["itpass:62"].fr = {
    title: "8-03 Méthodes de test, exploitation et maintenance (Test Methods, Operation and Maintenance)",
    concept: "Il s'agit d'une méthode de test pour l'exploitation/la maintenance après la mise en service du système, et pour les réparations.\n\n1. **Regression test**: Un test de « prévention de régression » qui vérifie que lorsqu'une partie du système est modifiée, aucun défaut inattendu (bugs) ne se produit dans d'autres parties non liées.\n2. **Acceptance test**: Un test final au cours duquel l'utilisateur (le client) ayant commandé le système utilise réellement le système développé pour confirmer qu'il fonctionne conformément au contrat.\n3. **Maintenance**: Travail continu pour corriger les bugs et s'adapter aux changements de l'environnement (mises à niveau de version du OS, etc.).\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:62:en"
  };

  window.CONTENT_I18N["itpass:63"] = window.CONTENT_I18N["itpass:63"] || {};
  window.CONTENT_I18N["itpass:63"].fr = {
    title: "8-04 Méthodologies de développement logiciel (Software Development Methodologies)",
    concept: "Il s'agit d'une approche pour procéder au développement de logiciels.\n\n1. **Waterfall model**: Une méthode robuste qui progresse de la définition des exigences à la conception et aux tests dans un ordre linéaire comme une rivière, et ne permet aucun retour aux étapes précédentes. Adapté au développement à grande échelle avec des spécifications établies.\n2. **Agile model**: Diviser la période de développement en unités courtes (**iterations** ou sprints) et répéter les livraisons par petites unités fonctionnelles. Une méthode capable de s'adapter de manière flexible aux changements de spécifications.\n3. **DevOps**: Une culture et des activités dans lesquelles le développement et les opérations collaborent étroitement pour obtenir à la fois une livraison rapide du système et un fonctionnement stable.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:63:en"
  };

  window.CONTENT_I18N["itpass:64"] = window.CONTENT_I18N["itpass:64"] || {};
  window.CONTENT_I18N["itpass:64"].fr = {
    title: "8-05 Gestion de projet (Project Management)",
    concept: "Il s'agit d'une méthode de gestion (PMBOK, etc.) permettant de mener à bien un projet dans les délais, le budget rapporté et avec la qualité requise.\n\n- **WBS (Work Breakdown Structure)**: Un schéma de configuration qui subdivise hiérarchiquement le travail de l'ensemble du projet. Il permet d'éviter les omissions de tâches et sert de base à la planification du calendrier et à l'estimation du budget. L'unité de travail minimale dans le WBS est appelée **work package**.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:64:en"
  };

  window.CONTENT_I18N["itpass:65"] = window.CONTENT_I18N["itpass:65"] || {};
  window.CONTENT_I18N["itpass:65"].fr = {
    title: "8-06 Gestion du temps (Time Management)",
    concept: "Une méthode de gestion des calendriers.\n\n1. **Arrow diagram (PERT diagram)**: Un schéma réseau reliant l'ordre des tâches par des flèches. Indique le temps nécessaire pour chaque tâche.\n2. **Critical path**: Dans un schéma réseau, le chemin qui prend le plus grand nombre de jours du début à la fin. Tout retard dans une tâche sur ce chemin retardera également l'achèvement de l'ensemble du projet.\n3. **Gantt chart**: Un diagramme représentant visuellement l'état d'avancement sous forme de barres, avec le temps sur l'axe horizontal et les tâches sur l'axe vertical.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:65:en"
  };

  window.CONTENT_I18N["itpass:66"] = window.CONTENT_I18N["itpass:66"] || {};
  window.CONTENT_I18N["itpass:66"].fr = {
    title: "8-07 Gestion des services IT (IT Service Management)",
    concept: "Il s'agit d'une méthode de gestion de l'exploitation permettant de fournir des services IT stables et de haute qualité aux clients après la mise en service du système (il existe un ensemble de meilleures pratiques appelé **ITIL**).\n\n- **SLA (Service Level Agreement)**: Un document qui spécifie les niveaux de qualité de service (temps de disponibilité, etc.) convenus entre un fournisseur de services et un client.\n- **Service Desk**: Le premier point de contact (point de contact unique) pour les problèmes et les questions des utilisateurs.\n- **Incident management**: Activités visant à « rétablir les services le plus rapidement possible » en utilisant des solutions temporaires lorsqu'une défaillance survient (la recherche de la cause profonde relève de la gestion des problèmes - problem management).\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:66:en"
  };

  window.CONTENT_I18N["itpass:67"] = window.CONTENT_I18N["itpass:67"] || {};
  window.CONTENT_I18N["itpass:67"].fr = {
    title: "8-08 Audits de système (System Audits)",
    concept: "Il s'agit d'une activité par laquelle un tiers objectif (system auditor) évalue et vérifie de manière approfondie, d'un point de vue indépendant, si les systèmes d'information sont conformes aux politiques de gestion et s'ils sont gérés et exploités de manière sûre et appropriée.\n\nL'auditeur soumet un rapport d'audit au département audité et formule des recommandations d'amélioration en cas de problème. Pour préserver leur indépendance, les auditeurs ne doivent pas être responsables du fonctionnement du département audité.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:67:en"
  };

  window.CONTENT_I18N["itpass:68"] = window.CONTENT_I18N["itpass:68"] || {};
  window.CONTENT_I18N["itpass:68"].fr = {
    title: "9-01 États financiers (Financial Statements)",
    concept: "Il s'agit d'un rapport financier destiné à divulguer la situation financière et les performances d'une entreprise au monde extérieur.\n\n1. **Balance Sheet (B/S)**: Un tableau présentant la situation financière d'une entreprise à un moment donné. Les **assets** (trésorerie et dépôts, créances clients, etc.) figurent à gauche, tandis que les **liabilities** (emprunts, dettes fournisseurs, etc.) et les **net assets** (capital, bénéfices non distribués, etc.) figurent à droite. L'équation « Assets = Liabilities + Net Assets » est toujours vérifiée.\n2. **P/L - Profit and Loss statement**: Un tableau montrant les résultats de l'entreprise (bénéfices) sur une certaine période. Soustrait les différentes dépenses des ventes pour trouver le « net income » final.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:68:en"
  };

  window.CONTENT_I18N["itpass:69"] = window.CONTENT_I18N["itpass:69"] || {};
  window.CONTENT_I18N["itpass:69"].fr = {
    title: "9-02 Seuil de rentabilité et gestion des actifs (Break-Even Point and Asset Management)",
    concept: "Il s'agit d'un indicateur pour la planification des affaires et le calcul des coûts.\n\n1. **Break-even point**: Le volume de ventes pour lequel les ventes et les coûts totaux sont exactement égaux et le bénéfice est nul. Si vous dépassez ce seuil, vous réalisez un bénéfice.\n   - **Fixed costs**: Dépenses qui restent constantes indépendamment des ventes (loyer, salaire de base, etc.).\n   - **Variable costs**: Coûts qui augmentent ou diminuent proportionnellement aux ventes (coûts des matières premières, coûts d'achat, etc.).\n   - **Formule**: `Break-even sales = fixed costs / (1 - variable cost rate)` (où variable cost rate = variable costs / sales)\n2. **Depreciation**: Procédure par laquelle le coût d'acquisition d'actifs fixes tels que des ordinateurs est réparti en charges en fonction de leur durée d'utilité.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:69:en"
  };

  window.CONTENT_I18N["itpass:70"] = window.CONTENT_I18N["itpass:70"] || {};
  window.CONTENT_I18N["itpass:70"].fr = {
    title: "9-03 Droits de propriété intellectuelle (Intellectual Property Rights)",
    concept: "Droits sur les produits issus d'activités de création intellectuelle.\n\n1. **Droits de propriété industrielle (demande et enregistrement auprès de l'Office des brevets requis)**:\n   - **Patent rights** (Brevets): Protègent les technologies et les inventions (idées avancées, brevets commerciaux, etc.). La durée est de 20 ans à compter de la date de demande.\n   - **Utility model right** (Modèles d'utilité): Invention de la forme d'un objet (petite invention). La durée est de 10 ans à compter de la date de demande.\n   - **Design Rights** (Dessins et modèles): La conception esthétique d'un produit. La durée est de 25 ans à compter de l'enregistrement.\n   - **Trademark rights** (Marques déposées): Noms de marque et logos. Renouvelables tous les 10 ans.\n2. **Copyright** (Droit d'auteur): Protège l'expression créative des pensées et des sentiments (s'applique également au code de programme). **Aucun enregistrement de demande requis**, il est généré automatiquement dès que l'œuvre est achevée (**système non formel - non-formal system**). Les algorithmes (algorithms) et les langages de programmation (programming languages) eux-mêmes ne sont pas protégés.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:70:en"
  };

  window.CONTENT_I18N["itpass:71"] = window.CONTENT_I18N["itpass:71"] || {};
  window.CONTENT_I18N["itpass:71"].fr = {
    title: "9-04 Réglementations sur la sécurité et les informations personnelles (Security and Personal Information Regulations)",
    concept: "Il s'agit d'une loi sur les activités IT sûres et appropriées.\n\n1. **Unauthorized Access Prohibition Act** (Loi sur l'interdiction des accès non autorisés): Loi qui interdit le fait de se connecter en utilisant l'identifiant et le mot de passe de quelqu'un d'autre sans autorisation, et le fait de fournir illégalement des informations d'identifiant à des tiers.\n2. **Personal Information Protection Act** (Loi sur la protection des informations personnelles): Loi qui régit le traitement approprié des informations permettant d'identifier des individus. Les informations concernant les **individus vivants** sont couvertes (les personnes décédées ne sont pas couvertes). En principe, il est interdit de fournir des informations personnelles à des tiers sans le consentement de la personne concernée.\n3. **Unfair Competition Prevention Act** (Loi sur la prévention de la concurrence déloyale): Loi qui interdit l'acquisition et l'utilisation illégales de **trade secrets** (secrets d'affaires) tels que la technologie et la liste de clients d'une entreprise. Pour être reconnu comme un secret d'affaires, il doit répondre à trois exigences : « secrecy controllability » (contrôlabilité du secret), « usefulness » (utilité) et « non-public knowledge » (non-publicité).\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:71:en"
  };

  window.CONTENT_I18N["itpass:72"] = window.CONTENT_I18N["itpass:72"] || {};
  window.CONTENT_I18N["itpass:72"].fr = {
    title: "9-05 Réglementations sur le travail et les transactions (Labor and Transaction Regulations)",
    concept: "Les lois sur le travail et les contrats sont les plus importantes dans le développement de systèmes.\n\n1. **Contract** (Contrat de sous-traitance): Un contrat dans lequel l'entreprise de développement (le sous-traitant) s'engage à achever le système (livraison des livrables). **L'entreprise mandataire** détient le droit de commander et diriger les travailleurs. Le donneur d'ordre ne doit pas donner d'instructions directes aux travailleurs du sous-traitant (ce qui constituerait un « **double dispatch (disguised contracting)** » illégal - faux sous-traitance).\n2. **Worker dispatch contract** (Contrat de mise à disposition de travailleurs): Un contrat de détachement de ressources humaines. Le droit de commander et de diriger les travailleurs appartient à l'entreprise utilisatrice (le donneur d'ordre).\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:72:en"
  };

  window.CONTENT_I18N["itpass:73"] = window.CONTENT_I18N["itpass:73"] || {};
  window.CONTENT_I18N["itpass:73"].fr = {
    title: "9-06 Analyse d'affaires (Business Analysis)",
    concept: "Il s'agit d'un outil qui visualise la situation actuelle d'une entreprise et ses problèmes de qualité.\n\n1. **SWOT analysis**: Une méthode pour analyser l'environnement de votre entreprise selon quatre axes : **Strengths (S)** (Forces), **Weaknesses (W)** (Faiblesses) (environnement interne), et **Opportunities (O)** (Opportunités) et **Threats (T)** (Menaces) (environnement externe).\n2. **3C analysis**: Une méthode d'analyse de l'environnement du marché sous trois angles : **Customer** (Client), **Competitor** (Concurrent) et **Company** (Entreprise) lors de la formulation des stratégies commerciales.\n3. **7 Quality Control (QC) Tools** (7 outils de contrôle qualité) :\n   - **Pareto Chart** (Diagramme de Pareto) : Un graphique qui combine un histogramme (classant les données par ordre décroissant) et une courbe représentant les pourcentages cumulés. Utilisé pour cibler les éléments de gestion importants (règle des 80:20).\n   - **Cause-effect diagram** (Diagramme de cause à effet) : Un diagramme en forme d'arête de poisson montrant la relation entre les résultats (problèmes, etc.) et les causes (facteurs).\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:73:en"
  };

  window.CONTENT_I18N["itpass:74"] = window.CONTENT_I18N["itpass:74"] || {};
  window.CONTENT_I18N["itpass:74"].fr = {
    title: "9-07 Utilisation des données et résolution de problèmes (Data Utilization and Problem Solving)",
    concept: "Il s'agit d'une méthode permettant d'extraire des connaissances utiles à la gestion à partir des mégadonnées (big data).\n\n1. **Regression analysis** (Analyse de régression) : Une méthode de prévision du futur en exprimant la relation de cause à effet entre une variable (ex. la température) et une autre variable (ex. les ventes de bière) dans une formule mathématique basée sur des données passées.\n2. **Correlation** (Corrélation) : Une relation dans laquelle deux groupes de données sont liés (par exemple, si l'un augmente, l'autre augmente également). Cependant, la corrélation ne signifie pas nécessairement une causalité.\n3. **Data mining** (Exploration de données) : Une technologie qui utilise des méthodes statistiques et le machine learning pour « miner » des régularités et des corrélations cachées à partir de grandes quantités de données.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:74:en"
  };

  window.CONTENT_I18N["itpass:75"] = window.CONTENT_I18N["itpass:75"] || {};
  window.CONTENT_I18N["itpass:75"].fr = {
    title: "9-08 Normalisation (Standardization)",
    concept: "Il s'agit d'une activité visant à unifier les produits et les normes de communication afin d'accroître la compatibilité et la commodité.\n\n1. **Organismes de normalisation** :\n   - **ISO** : Organisation internationale de normalisation.\n   - **IEC** : Normes internationales dans le domaine de l'électricité.\n   - **IEEE** : Normes de l'association d'ingénierie électrique et électronique, y compris les normes LAN.\n   - **JIS** : Normes industrielles japonaises.\n2. **Normes de code** :\n   - **JAN code** : Code-barres de produit commun au Japon.\n   - **QR code** : Code bidimensionnel. Il contient des données dans les directions verticale et horizontale, peut enregistrer plus d'informations que le code JAN code et peut être partiellement restauré même s'il est endommagé.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:75:en"
  };

  window.CONTENT_I18N["itpass:76"] = window.CONTENT_I18N["itpass:76"] || {};
  window.CONTENT_I18N["itpass:76"].fr = {
    title: "10-01 La quatrième révolution industrielle et le Big Data (The Fourth Industrial Revolution and Big Data)",
    concept: "Nous vivons à l'ère de l'innovation numérique qui modifiera considérablement les structures industrielles et les modes de vie en utilisant le IoT, l'AI et le big data.\n\n- **Big Data**: Groupes de données volumineux, diversifiés et à haute fréquence (en temps réel - real-time) qui ne peuvent pas être traités par les systèmes conventionnels.\n- **Sharing Economy** (Économie collaborative) : Un système dans lequel des actifs tels que des chambres d'amis et des voitures sont loués entre particuliers via une plateforme Internet (ex. autopartage, hébergement privé).\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:76:en"
  };

  window.CONTENT_I18N["itpass:77"] = window.CONTENT_I18N["itpass:77"] || {};
  window.CONTENT_I18N["itpass:77"].fr = {
    title: "10-02 Activités de l'entreprise (Corporate Activities)",
    concept: "Il s'agit du rôle que les entreprises doivent jouer pour viser une société durable.\n\n1. **CSR (Corporate Social Responsibility)** (Responsabilité sociale des entreprises) : L'idée selon laquelle les entreprises ne doivent pas seulement rechercher le profit, mais aussi assumer leurs responsabilités sociales sous l'angle de la protection de l'environnement, de la contribution sociale et du respect des lois.\n2. **SDGs (Sustainable Development Goals)** (Objectifs de développement durable) : Objectifs de développement durable fixés par les Nations Unies et comprenant 17 objectifs à atteindre d'ici 2030.\n3. **Green IT** (Informatique éco-responsable) : Efforts visant à réduire l'impact environnemental en diminuant la consommation d'énergie et en dématérialisant les systèmes.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:77:en"
  };

  window.CONTENT_I18N["itpass:78"] = window.CONTENT_I18N["itpass:78"] || {};
  window.CONTENT_I18N["itpass:78"].fr = {
    title: "10-03 Gouvernance d'entreprise et contrôle interne (Corporate Governance and Internal Control)",
    concept: "Il s'agit d'un système destiné à prévenir la fraude au sein des entreprises et à garantir une gestion saine.\n\n1. **Corporate Governance** (Gouvernance d'entreprise) : Un système dans lequel les actionnaires et les administrateurs externes surveillent la gestion, préviennent les scandales et améliorent l'efficacité de la gestion.\n2. **Internal Control** (Contrôle interne) : Règles et processus établis au sein d'une entreprise pour garantir le bon déroulement des opérations commerciales. L'objectif est d'assurer la fiabilité de l'information financière et la conformité légale.\n3. **Compliance** (Conformité) : Respecter non seulement les lois et réglementations, mais aussi les règles qui incluent l'éthique de l'entreprise et le bon sens social.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:78:en"
  };

  window.CONTENT_I18N["itpass:79"] = window.CONTENT_I18N["itpass:79"] || {};
  window.CONTENT_I18N["itpass:79"].fr = {
    title: "10-04 Stratégie de gestion (Management Strategy)",
    concept: "Il s'agit d'une méthode de gestion pour survivre à la concurrence et maximiser la croissance.\n\n1. **Core Competence** (Compétence clé) : Forces fondamentales uniques (technologie et savoir-faire) propres à votre entreprise et qui ne peuvent pas être imitées par d'autres.\n2. **M&A** (Fusions et acquisitions) : Fusions et acquisitions d'entreprises. Le délai de pénétration d'un nouveau marché peut être considérablement raccourci.\n3. **Alliance** (Partenariat) : Une alliance dans laquelle plusieurs entreprises se complètent mutuellement en termes de technologie et de canaux de vente sur un pied d'égalité.\n4. **OEM** (Fabricant d'équipement d'origine) : Fabrication d'un produit sous le nom de marque de l'équipement d'origine. Les fabricants peuvent augmenter le taux d'utilisation de leur usine et les acheteurs peuvent vendre des produits sans posséder d'usine.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:79:en"
  };

  window.CONTENT_I18N["itpass:80"] = window.CONTENT_I18N["itpass:80"] || {};
  window.CONTENT_I18N["itpass:80"].fr = {
    title: "10-05 Stratégie des systèmes d'information et processus d'affaires (Information System Strategy and Business Processes)",
    concept: "Il s'agit d'une stratégie de systématisation qui utilise le IT pour rationaliser et transformer les affaires.\n\n1. **EA (Enterprise Architecture)** (Architecture d'entreprise) : Une méthode de modélisation de l'image globale de l'organisation, des processus d'affaires, des systèmes et des données d'une grande entreprise, afin d'obtenir une optimisation globale.\n2. **BPR (Business Process Redesign)** (Réingénierie des processus d'affaires) : **Réévaluer fondamentalement, concevoir radicalement et reconstruire** les organisations et les processus d'affaires existants afin d'obtenir des résultats spectaculaires.\n3. **BPM (Business Process Management)** (Gestion des processus d'affaires) : Activités visant à surveiller et à améliorer en permanence le flux des affaires.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:80:en"
  };

  window.CONTENT_I18N["itpass:81"] = window.CONTENT_I18N["itpass:81"] || {};
  window.CONTENT_I18N["itpass:81"].fr = {
    title: "10-06 Stratégie marketing (Marketing Strategy)",
    concept: "Il s'agit d'une méthode visant à maximiser les ventes en incitant les clients à choisir un produit.\n\n1. **STP** : Une méthode d'analyse pour segmenter le marché (**S**egment), cibler (**T**arget) et positionner votre entreprise (**P**osition).\n2. **4P** : Un marketing mix qui combine les quatre éléments du point de vue du vendeur : **Product** (Produit), **Price** (Prix), **Place** (Distribution) et **Promotion** (Promotion des ventes).\n3. **Upselling/Cross-selling** (Vente incitative / Vente croisée) : Recommander un produit plus cher (up) / Inciter les gens à acheter des produits connexes ensemble (cross).\n4. **RFM analysis** (Analyse RFM) : Une méthode d'évaluation de la valeur client selon trois axes : **Recency** (date du dernier achat), **Frequency** (fréquence d'achat) et **Monetary** (montant de l'achat).\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:81:en"
  };

  window.CONTENT_I18N["itpass:82"] = window.CONTENT_I18N["itpass:82"] || {};
  window.CONTENT_I18N["itpass:82"].fr = {
    title: "10-07 Stratégie technologique (Technology Strategy)",
    concept: "Il s'agit d'une stratégie visant à obtenir un avantage concurrentiel durable en plaçant la technologie au centre.\n\n1. **MOT (Management of Technology)** (Gestion de la technologie) : Une stratégie de gestion qui relie efficacement les résultats du développement technologique à l'activité commerciale et accroît la création de valeur de l'entreprise.\n2. **Technology roadmap** (Feuille de route technologique) : Un calendrier schématisant les prévisions et les objectifs d'évolution technologique et de développement de nouveaux produits, avec le temps sur l'axe horizontal et les éléments technologiques et lignes de produits sur l'axe vertical.\n3. **Innovation Dilemma** (Dilemme de l'innovateur) : Phénomène par lequel les entreprises prospères existantes écoutent les clients et s'en tiennent à des produits conventionnels de haute qualité, mais perdent leur marché au profit de nouvelles entreprises qui créent des innovations perturbatrices à faible technologie et à bas coût.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:82:en"
  };

  window.CONTENT_I18N["itpass:83"] = window.CONTENT_I18N["itpass:83"] || {};
  window.CONTENT_I18N["itpass:83"].fr = {
    title: "10-08 Évaluation des performances et systèmes de gestion (Performance Evaluation and Management Systems)",
    concept: "Un outil de gestion qui visualise les performances de l'entreprise et centralise les ressources.\n\n1. **BSC (Balanced Scorecard)** (Tableau de bord équilibré) : Une méthode pour évaluer les performances et exécuter la stratégie de manière équilibrée, non seulement à partir d'indicateurs financiers, mais aussi sous quatre angles : « finance », « client », « processus d'affaires » et « apprentissage et croissance ».\n2. **KPI** : Indicateur clé de performance (Key performance indicator). Valeur cible intermédiaire (le CSF est un facteur clé de succès - key success factor) pour mesurer les progrès accomplis vers la réalisation de la stratégie.\n3. **Principaux systèmes de gestion d'entreprise** :\n   - **ERP** : Un système d'information intégré qui gère de manière centralisée les ressources humaines, matérielles, financières et d'information d'une entreprise pour une optimisation globale.\n   - **SCM** : Connecter la chaîne depuis l'approvisionnement en matières premières jusqu'à la vente et minimiser les stocks.\n   - **CRM** : Centraliser les informations clients, approfondir les relations et augmenter la fidélisation des clients.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:83:en"
  };

  window.CONTENT_I18N["itpass:84"] = window.CONTENT_I18N["itpass:84"] || {};
  window.CONTENT_I18N["itpass:84"].fr = {
    title: "10-09 Systèmes d'entreprise et ingénierie (Business Systems and Engineering)",
    concept: "Il s'agit d'un système IT qui augmente l'efficacité de la production dans l'industrie manufacturière.\n\n1. **CAD / CAM** (CAO / FAO) : Conception assistée par ordinateur (CAD) et fabrication assistée par ordinateur (CAM) utilisant les données de conception pour contrôler les machines-outils et produire automatiquement.\n2. **Concurrent Engineering** (Ingénierie concourante) : Dans le développement de produits, méthode qui raccourcit considérablement la période de développement en **procédant en parallèle** plutôt qu'en effectuant chaque processus tel que la conception, le prototypage et la fabrication de manière indépendante.\n3. **JIT (Just in Time)** (Juste à temps) : Méthode signature de Toyota consistant à produire et à fournir ce qui est nécessaire, quand c'est nécessaire et dans la quantité nécessaire. Réduit les encours de fabrication et les stocks au strict minimum.\n\n**Points pour les débutants in IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:84:en"
  };

  window.CONTENT_I18N["itpass:85"] = window.CONTENT_I18N["itpass:85"] || {};
  window.CONTENT_I18N["itpass:85"].fr = {
    title: "10-10 E-Business",
    concept: "Il s'agit d'une forme d'activité commerciale qui utilise Internet.\n\n1. **Transaction type** (Type de transaction) : **B2C** (business-to-consumer/commerce électronique, etc.), **B2B** (transactions de business-to-business), **C2C** (applications de vente entre particuliers, etc.).\n2. **O2O (Online to Offline)** : Une méthode pour encourager les clients à visiter et à acheter dans des magasins physiques (offline) via des activités en ligne (distribution de coupons, etc.).\n3. **Smart contract** (Contrat de type intelligent / contrat autonome) : Un mécanisme qui exécute automatiquement les contrats conformément à des règles prédéfinies sur la blockchain. Des transactions sûres et extrêmement difficiles à falsifier sont possibles sans intermédiaires.\n\n**Points pour les débutants en IT:**\nCe domaine est très souvent abordé dans l'examen IT Passport, donc le raccourci pour réussir l'examen consiste non seulement à définir les mots-clés (keywords), mais aussi à organiser les termes associés avec des scénarios d'utilisation pratique (exemples).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:85:en"
  };
})();
