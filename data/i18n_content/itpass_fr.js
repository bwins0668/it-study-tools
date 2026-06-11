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
})();
