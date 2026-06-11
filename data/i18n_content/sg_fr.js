/* SG Lessons French Translation v1 — Full Coverage (Lessons 1-44) */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["sg:1"] = window.CONTENT_I18N["sg:1"] || {};
  window.CONTENT_I18N["sg:1"].fr = {
    title: "1-1-1 Qu'est-ce que la sécurité de l'information ?",
    concept: "Les exemples courants de violations de la sécurité de l'information incluent les infections par des logiciels malveillants (malware) et les attaques par ransomware.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:1:en"
  };

  window.CONTENT_I18N["sg:2"] = window.CONTENT_I18N["sg:2"] || {};
  window.CONTENT_I18N["sg:2"].fr = {
    title: "1-1-2 Étude de cas 1 : Infection par un logiciel malveillant",
    concept: "**1. Infection par un logiciel malveillant (Malware) et menaces :**\nLes logiciels malveillants infiltrent les ordinateurs ou smartphones des utilisateurs pour voler des informations confidentielles ou effectuer des opérations non autorisées. Ils se propagent principalement par des pièces jointes d'emails, des sites web malveillants ou des clés USB.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:2:en"
  };

  window.CONTENT_I18N["sg:3"] = window.CONTENT_I18N["sg:3"] || {};
  window.CONTENT_I18N["sg:3"].fr = {
    title: "1-1-3 Étude de cas 2 : Ransomware et sauvegardes",
    concept: "**2. Attaques par ransomware et importance des sauvegardes :**\nUn ransomware est un virus malveillant qui crypte les données et exige une rançon pour les décrypter. Récemment, la double extorsion (crypter les données et menacer de les divulguer si la rançon n'est pas payée) s'est développée. Payer la rançon ne garantit pas la récupération des données. Par conséquent, effectuer régulièrement des **sauvegardes hors ligne (offline backups)** — non volatiles et physiquement isolées du réseau — est la seule stratégie de défense efficace.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:3:en"
  };

  window.CONTENT_I18N["sg:4"] = window.CONTENT_I18N["sg:4"] || {};
  window.CONTENT_I18N["sg:4"].fr = {
    title: "1-2-1 Objectifs et concepts de la sécurité de l'information",
    concept: "Le fondement de la sécurité de l'information est le maintien des trois éléments principaux : la Confidentialité, l'Intégrité et la Disponibilité (connus sous le nom de la triade CIA).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:4:en"
  };

  window.CONTENT_I18N["sg:5"] = window.CONTENT_I18N["sg:5"] || {};
  window.CONTENT_I18N["sg:5"].fr = {
    title: "1-2-2 Bases de la sécurité de l'information",
    concept: "**1. La triade CIA :**\n* **Confidentialité** : Garantir que seules les personnes autorisées peuvent accéder aux informations (ex. via le chiffrement et les contrôles d'accès).\n* **Intégrité** : Garantir que les informations ne sont pas modifiées ou détruites de manière non autorisée et restent exactes (ex. via les signatures numériques et la vérification de hachage).\n* **Disponibilité** : Garantir que les utilisateurs autorisés peuvent accéder aux informations ou systèmes quand ils en ont besoin (ex. via la redondance des serveurs et l'installation d'onduleurs).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:5:en"
  };

  window.CONTENT_I18N["sg:6"] = window.CONTENT_I18N["sg:6"] || {};
  window.CONTENT_I18N["sg:6"].fr = {
    title: "1-2-3 Types de menaces",
    concept: "**Menaces principales pour la sécurité de l'information :**\n* **Logiciels malveillants (Malware)** : Virus, vers, chevaux de Troie, ransomware, spyware.\n* **Cyberattaques** : Attaques DoS/DDoS, attaques de l'homme du milieu (MITM), injections SQL.\n* **Menaces internes** : Fuites d'informations par des employés ou partenaires internes.\n* **Ingénierie sociale** : Emails de phishing, usurpation d'identité, appels téléphoniques frauduleux.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:6:en"
  };

  window.CONTENT_I18N["sg:7"] = window.CONTENT_I18N["sg:7"] || {};
  window.CONTENT_I18N["sg:7"].fr = {
    title: "2-1-1 Attaques sur les mots de passe",
    concept: "**Attaques courantes sur les mots de passe :**\n* **Attaque par force brute** : Essayer toutes les combinaisons possibles de mots de passe jusqu'à trouver le bon.\n* **Attaque par dictionnaire** : Utiliser une liste de mots courants pour deviner le mot de passe.\n* **Attaque par table arc-en-ciel (Rainbow Table)** : Utiliser une table de correspondance précalculée pour inverser le hachage du mot de passe.\n* **Keylogging** : Enregistrer les frappes au clavier pour voler les mots de passe.\n**Contre-mesures** : Mots de passe forts, MFA, verrouillage après tentatives échouées, politique de mots de passe.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:7:en"
  };

  window.CONTENT_I18N["sg:8"] = window.CONTENT_I18N["sg:8"] || {};
  window.CONTENT_I18N["sg:8"].fr = {
    title: "2-1-2 Attaques sur les sites web",
    concept: "**Attaques courantes sur les sites web :**\n* **Injection SQL** : Insérer du code SQL malveillant dans les champs de saisie pour accéder ou modifier illégalement la base de données.\n* **Cross-Site Scripting (XSS)** : Insérer un script malveillant dans une page web pour voler des informations de session ou rediriger les utilisateurs.\n* **Cross-Site Request Forgery (CSRF)** : Forcer un utilisateur à effectuer des actions non désirées sur un site web où il est authentifié.\n**Contre-mesures** : Validation des entrées, requêtes paramétrées, jetons CSRF, politique de sécurité du contenu (CSP).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:8:en"
  };

  window.CONTENT_I18N["sg:9"] = window.CONTENT_I18N["sg:9"] || {};
  window.CONTENT_I18N["sg:9"].fr = {
    title: "2-1-3 Attaques sur les communications",
    concept: "**Attaques courantes sur les communications :**\n* **Attaque Man-in-the-Middle (MITM)** : L'attaquant s'interpose entre deux parties communicantes pour écouter ou falsifier les informations.\n* **Attaque par déni de service (DoS/DDoS)** : Surcharger un serveur ou un réseau avec un trafic factice, rendant le service indisponible.\n* **Détournement de session** : Voler un cookie de session pour usurper l'identité d'un utilisateur authentifié.\n* **Attaque par rejeu (Replay Attack)** : Intercepter et rejouer des données transmises pour tromper le système.\n**Contre-mesures** : Chiffrement (TLS/SSL), authentification mutuelle, timeout de session, nonces et horodatage.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:9:en"
  };

  window.CONTENT_I18N["sg:10"] = window.CONTENT_I18N["sg:10"] || {};
  window.CONTENT_I18N["sg:10"].fr = {
    title: "2-2-1 Technologie de chiffrement",
    concept: "**Le chiffrement (Encryption)** est le processus de conversion des données dans un format illisible (texte chiffré) à l'aide d'un algorithme et d'une clé.\n\n* **Chiffrement symétrique** : Utilise la même clé pour le chiffrement et le déchiffrement (ex. AES, DES). Rapide mais pose un problème de distribution des clés.\n* **Chiffrement asymétrique** : Utilise une paire de clés publique/privée (ex. RSA, ECC). Résout le problème de distribution des clés mais est plus lent.\n* **Fonctions de hachage** : Fonctions unidirectionnelles qui produisent une valeur de hachage de longueur fixe à partir de données d'entrée (ex. SHA-256).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:10:en"
  };

  window.CONTENT_I18N["sg:11"] = window.CONTENT_I18N["sg:11"] || {};
  window.CONTENT_I18N["sg:11"].fr = {
    title: "2-2-2 Technologie d'authentification et signature numérique",
    concept: "**L'authentification (Authentication)** vérifie l'identité d'un utilisateur par :\n* **Ce que l'utilisateur sait** : Mot de passe, code PIN.\n* **Ce que l'utilisateur possède** : Carte à puce, jeton matériel.\n* **Ce que l'utilisateur est (biométrie)** : Empreinte digitale, reconnaissance faciale, scan de l'iris.\n\n**Signature numérique (Digital Signature)** : Utilise le chiffrement asymétrique pour garantir l'authenticité et la non-répudiation. L'expéditeur signe avec sa clé privée ; le destinataire vérifie avec la clé publique.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:11:en"
  };

  window.CONTENT_I18N["sg:12"] = window.CONTENT_I18N["sg:12"] || {};
  window.CONTENT_I18N["sg:12"].fr = {
    title: "2-2-3 Authentification multi-facteurs et technologie biométrique",
    concept: "**MFA** : Combinaison de deux facteurs d'authentification ou plus de types différents. Exemple : mot de passe + code OTP du téléphone ou empreinte digitale.\n\n**Technologie biométrique :**\n* Reconnaissance d'empreintes digitales, faciale, de l'iris, vocale.\n* Avantage : Ne peut pas être perdu ou oublié.\n* Inconvénient : Impossible à modifier en cas de compromission ; taux de faux rejet (FRR) et taux de fausse acceptation (FAR).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:12:en"
  };

  window.CONTENT_I18N["sg:13"] = window.CONTENT_I18N["sg:13"] || {};
  window.CONTENT_I18N["sg:13"].fr = {
    title: "2-2-4 Infrastructure à clé publique (PKI) et certificats numériques",
    concept: "**PKI** : Système de gestion des certificats numériques et des paires de clés publique/privée.\n\n**Composants principaux :**\n* **CA (Autorité de Certification)** : Organisme qui délivre et gère les certificats numériques.\n* **RA (Autorité d'Enregistrement)** : Vérifie l'identité avant la délivrance du certificat.\n* **Certificat numérique** : Document électronique contenant la clé publique et les informations du propriétaire, signé par l'AC.\n\nLa PKI est le fondement de SSL/TLS, des emails chiffrés et des signatures numériques.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:13:en"
  };

  window.CONTENT_I18N["sg:14"] = window.CONTENT_I18N["sg:14"] || {};
  window.CONTENT_I18N["sg:14"].fr = {
    title: "3-1-1 Politique de gestion de la sécurité de l'information",
    concept: "**La politique de sécurité de l'information (PSSI)** est un document de haut niveau qui définit comment une organisation gère et protège ses actifs informationnels. Elle établit les règles, responsabilités et attentes pour tous les utilisateurs.\n\nLes composants principaux incluent :\n* Le périmètre d'application et les objectifs de sécurité.\n* La structure organisationnelle et la répartition des responsabilités.\n* Les processus de gestion des risques et de réponse aux incidents.\n* Les programmes de formation et de sensibilisation.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:14:en"
  };

  window.CONTENT_I18N["sg:15"] = window.CONTENT_I18N["sg:15"] || {};
  window.CONTENT_I18N["sg:15"].fr = {
    title: "3-1-2 Exigences fondamentales de la hiérarchie des politiques de sécurité",
    concept: "**Hiérarchie des politiques de sécurité — Structure pyramidale :**\n* **Politique** : Directive de gestion de haut niveau définissant l'orientation et les objectifs de sécurité de l'organisation.\n* **Normes** : Règles obligatoires spécifiques soutenant la politique (ex. normes de chiffrement, normes de mots de passe).\n* **Procédures** : Instructions détaillées étape par étape pour mettre en œuvre les normes.\n* **Directives** : Recommandations flexibles pour les meilleures pratiques.\n* **Application** : Mécanismes assurant la conformité par le biais d'audits et de mesures disciplinaires.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:15:en"
  };

  window.CONTENT_I18N["sg:16"] = window.CONTENT_I18N["sg:16"] || {};
  window.CONTENT_I18N["sg:16"].fr = {
    title: "3-1-3 Système de management de la sécurité de l'information (SMSI)",
    concept: "**SMSI (ISMS)** : Approche systématique pour gérer les informations sensibles, incluant les personnes, les processus et les systèmes IT.\n\nMise en œuvre selon le cycle PDCA :\n* **Planifier** : Définir le périmètre, évaluer les risques, sélectionner les contrôles.\n* **Faire** : Mettre en œuvre les contrôles et processus de sécurité.\n* **Vérifier** : Surveiller, mesurer et évaluer l'efficacité.\n* **Agir** : Améliorer en continu sur la base des résultats.\n\nNorme internationale : ISO/IEC 27001.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:16:en"
  };

  window.CONTENT_I18N["sg:17"] = window.CONTENT_I18N["sg:17"] || {};
  window.CONTENT_I18N["sg:17"].fr = {
    title: "3-2-1 Inventaire des actifs informationnels, classification et gestion",
    concept: "**Inventaire des actifs informationnels :**\nLa première étape de la gestion de la sécurité de l'information consiste à identifier et classer tous les actifs informationnels de l'organisation.\n\n**Catégories :**\n* Actifs de données : Bases de données, documents, dossiers clients.\n* Actifs logiciels : Systèmes d'exploitation, applications, code source.\n* Actifs matériels : Serveurs, postes de travail, équipements réseau.\n* Actifs de services : Services cloud, services tiers.\n\n**Classification par niveau de sensibilité :** Public, Interne, Sensible, Confidentiel.\nChaque niveau a des exigences de contrôle de sécurité différents.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:17:en"
  };

  window.CONTENT_I18N["sg:18"] = window.CONTENT_I18N["sg:18"] || {};
  window.CONTENT_I18N["sg:18"].fr = {
    title: "3-2-2 Estimation de la valeur du risque",
    concept: "**L'évaluation des risques (Risk Assessment)** quantifie le risque par la formule :\n\n**Risque = Niveau de menace × Niveau de vulnérabilité × Valeur de l'actif**\nou **Risque = Probabilité × Impact**\n\n**Étapes de l'évaluation des risques :**\n1. **Identifier les actifs** : Lister tous les actifs informationnels.\n2. **Identifier les menaces** : Qui ou quoi peut nuire aux actifs ?\n3. **Identifier les vulnérabilités** : Quelles faiblesses peuvent être exploitées ?\n4. **Calculer le risque** : Combiner menace, vulnérabilité et valeur de l'actif.\n5. **Évaluer le niveau d'acceptation** : Le risque est-il dans la tolérance ?\n6. **Traiter le risque** : Réduire, transférer, éviter ou accepter.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:18:en"
  };

  window.CONTENT_I18N["sg:19"] = window.CONTENT_I18N["sg:19"] || {};
  window.CONTENT_I18N["sg:19"].fr = {
    title: "3-2-3 Phases complètes de la gestion des risques de sécurité",
    concept: "**La gestion des risques de sécurité de l'information (IS Risk Management)** est un processus continu :\n\n1. **Établir le contexte** : Définir le périmètre, les critères de risque et le niveau d'acceptation.\n2. **Identifier les risques** : Repérer les risques potentiels pour les actifs informationnels.\n3. **Analyser les risques** : Déterminer la probabilité et l'impact de chaque risque.\n4. **Évaluer les risques** : Comparer le niveau de risque avec les critères d'acceptation.\n5. **Traiter les risques** : Choisir les mesures : réduire, transférer (ex. assurance), éviter ou accepter.\n6. **Surveiller et réviser** : Suivre l'efficacité et ajuster si nécessaire.\n\nC'est un cycle continu — les risques évoluent avec le temps, donc une réévaluation périodique est cruciale.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:19:en"
  };

  window.CONTENT_I18N["sg:20"] = window.CONTENT_I18N["sg:20"] || {};
  window.CONTENT_I18N["sg:20"].fr = {
    title: "3-3-1 Organisations de réponse aux incidents de sécurité et CSIRT",
    concept: "**CSIRT** — Équipe chargée de recevoir, analyser et répondre aux incidents de sécurité informatique.\n\n**Processus de réponse aux incidents :**\n1. **Préparation** : Mettre en place les outils, processus et formations.\n2. **Identification** : Détecter et confirmer l'incident.\n3. **Confinement** : Isoler le système affecté pour éviter la propagation des dommages.\n4. **Éradication** : Éliminer la cause racine de l'incident.\n5. **Récupération** : Restaurer le système à un état de fonctionnement normal.\n6. **Retour d'expérience** : Analyser et améliorer les processus.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:20:en"
  };

  window.CONTENT_I18N["sg:21"] = window.CONTENT_I18N["sg:21"] || {};
  window.CONTENT_I18N["sg:21"].fr = {
    title: "3-3-2 Norme internationale pour l'évaluation de la sécurité IT",
    concept: "**Normes internationales pour l'évaluation de la sécurité IT :**\n\n* **ISO/IEC 15408 (Critères communs)** : Norme internationale pour l'évaluation et la certification de la sécurité des produits IT.\n\n* **Niveaux d'assurance d'évaluation (EAL)** : De EAL1 (testé fonctionnellement) à EAL7 (conception vérifiée et testée formellement).\n\n* **Profil de protection (PP)** : Ensemble d'exigences de sécurité indépendantes de l'implémentation pour un type de produit.\n\n* **Cible de sécurité (ST)** : Exigences et spécifications de sécurité pour un produit spécifique.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:21:en"
  };

  window.CONTENT_I18N["sg:22"] = window.CONTENT_I18N["sg:22"] || {};
  window.CONTENT_I18N["sg:22"].fr = {
    title: "3-3-3 Exercices de fin de chapitre",
    concept: "Exercices de fin de chapitre — révision des concepts clés appris dans le chapitre 3, incluant la gestion de la sécurité de l'information, la gestion des risques, la réponse aux incidents et les normes internationales.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:22:en"
  };

  window.CONTENT_I18N["sg:23"] = window.CONTENT_I18N["sg:23"] || {};
  window.CONTENT_I18N["sg:23"].fr = {
    title: "4-1-1 Mesures de sécurité humaine et contre-ingénierie sociale",
    concept: "**Mesures de sécurité humaine :**\n\n* **Sensibilisation** : Former les employés aux menaces de sécurité et aux pratiques sûres.\n* **Processus d'embauche sécurisé** : Vérification des antécédents, accord de confidentialité (NDA).\n* **Gestion des départs** : Révoquer les accès, récupérer le matériel.\n\n**Contre-ingénierie sociale :**\nLes méthodes d'attaque exploitent la psychologie humaine plutôt que la technologie. Les contre-mesures incluent la vérification d'identité, les procédures de signalement, et le refus de partager des informations sensibles par téléphone ou email non sollicités.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:23:en"
  };

  window.CONTENT_I18N["sg:24"] = window.CONTENT_I18N["sg:24"] || {};
  window.CONTENT_I18N["sg:24"].fr = {
    title: "4-1-2 Exercices de fin de chapitre",
    concept: "Exercices de fin de chapitre — révision des mesures de sécurité humaine et de l'ingénierie sociale apprises dans le chapitre 4.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:24:en"
  };

  window.CONTENT_I18N["sg:25"] = window.CONTENT_I18N["sg:25"] || {};
  window.CONTENT_I18N["sg:25"].fr = {
    title: "4-2-1 Défense périmétrique (filtrage de paquets par pare-feu)",
    concept: "**Défense périmétrique (Perimeter Defense) :**\n\n* **Pare-feu (Firewall)** : Dispositif ou logiciel qui surveille et contrôle le trafic réseau selon des règles de sécurité prédéfinies.\n* **Zone démilitarisée (DMZ)** : Sous-réseau intermédiaire entre le réseau interne et externe contenant les serveurs publics (web, email).\n* **Système de détection/prévention d'intrusion (IDS/IPS)** : Surveille le trafic réseau pour détecter et bloquer les activités malveillantes.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:25:en"
  };

  window.CONTENT_I18N["sg:26"] = window.CONTENT_I18N["sg:26"] || {};
  window.CONTENT_I18N["sg:26"].fr = {
    title: "4-2-2 Défense anti-malware et surveillance par isolation en sandbox",
    concept: "**Défense anti-malware :**\n\n* **Antivirus** : Détecte et supprime les logiciels malveillants par analyse de fichiers et comparaison avec une base de signatures virales.\n* **Gestion des correctifs (Patch Management)** : Mettre à jour régulièrement l'OS et les applications pour corriger les vulnérabilités.\n* **Analyse comportementale** : Détecter les malwares basés sur leur comportement plutôt que sur leur signature.\n\n**Isolation en sandbox** : Exécuter des fichiers suspects dans un environnement isolé et sécurisé pour analyser leur comportement sans affecter le système principal.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:26:en"
  };

  window.CONTENT_I18N["sg:27"] = window.CONTENT_I18N["sg:27"] || {};
  window.CONTENT_I18N["sg:27"].fr = {
    title: "4-2-3 Sécurité des appareils mobiles et du réseau LAN sans fil",
    concept: "**Sécurité des appareils mobiles :**\n* Verrouillage d'écran et chiffrement de l'appareil.\n* Gestion des appareils mobiles (MDM) — gestion centralisée.\n* Effacement à distance en cas de perte.\n\n**Sécurité du réseau LAN sans fil :**\n* **WPA3** : Dernier protocole de sécurité Wi-Fi offrant un chiffrement renforcé.\n* **DMZ sans fil** : Séparer le Wi-Fi invité du réseau interne.\n* **Filtrage d'adresses MAC** : N'autoriser que les appareils avec des adresses MAC autorisées.\n* **VPN** : Chiffrer les connexions distantes au réseau interne.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:27:en"
  };

  window.CONTENT_I18N["sg:28"] = window.CONTENT_I18N["sg:28"] || {};
  window.CONTENT_I18N["sg:28"].fr = {
    title: "4-2-4 Investigation numérique et préservation des preuves (informatique légale)",
    concept: "**Informatique légale (Digital Forensics) :**\nDomaine qui enquête sur les incidents de sécurité en collectant, analysant et préservant les preuves numériques.\n\n**Processus d'investigation :**\n1. **Collecte** : Rassembler les données des appareils concernés (copie bit-à-bit, photographie de la scène).\n2. **Préservation** : Maintenir l'intégrité des preuves (utilisation de write blocker, calcul de hachage).\n3. **Analyse** : Analyser les données pour trouver des preuves d'activités illicites.\n4. **Rapport** : Rédiger un rapport d'expertise légalement recevable.\n\n**Principe important** : La chaîne de conservation (Chain of Custody) doit être maintenue pour garantir la valeur légale des preuves.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:28:en"
  };

  window.CONTENT_I18N["sg:29"] = window.CONTENT_I18N["sg:29"] || {};
  window.CONTENT_I18N["sg:29"].fr = {
    title: "4-3-1 Contrôle d'accès physique et anti-filature",
    concept: "**Contrôle d'accès physique :**\nProtéger les actifs informationnels en contrôlant l'accès physique aux installations et aux serves serveurs.\n\n**Méthodes :**\n* Lecteur de carte / carte à puce.\n* Authentification biométrique (empreinte digitale, iris).\n* Code PIN / mot de passe.\n\n**Anti-filature (Anti-Tailgating) :**\nLe filature est une technique où un attaquant suit un utilisateur autorisé à travers une porte sécurisée sans s'authentifier. Les contre-mesures incluent : tourniquets, portes à verrouillage interdépendant (interlocking door), agents de sécurité, et formation des employés à ne pas tenir la porte aux inconnus.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:29:en"
  };

  window.CONTENT_I18N["sg:30"] = window.CONTENT_I18N["sg:30"] || {};
  window.CONTENT_I18N["sg:30"].fr = {
    title: "4-3-2 Exercices de fin de chapitre",
    concept: "Exercices de fin de chapitre — révision des mesures de sécurité physique et de contrôle d'accès apprises dans le chapitre 4.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:30:en"
  };

  window.CONTENT_I18N["sg:31"] = window.CONTENT_I18N["sg:31"] || {};
  window.CONTENT_I18N["sg:31"].fr = {
    title: "4-3-3 Exercices de fin de chapitre",
    concept: "Exercices de fin de chapitre — révision supplémentaire sur le contrôle d'accès physique et les mesures de sécurité.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:31:en"
  };

  window.CONTENT_I18N["sg:32"] = window.CONTENT_I18N["sg:32"] || {};
  window.CONTENT_I18N["sg:32"].fr = {
    title: "4-4-1 Protocoles de sécurité (SSL/TLS, HTTPS, SSH, IPsec)",
    concept: "**Protocoles de sécurité courants :**\n\n* **SSL/TLS et HTTPS** : Chiffrent les communications entre le navigateur web et le serveur. Utilisent des certificats numériques et le chiffrement hybride.\n* **SSH (Secure Shell)** : Connexion distante sécurisée aux serveurs, remplaçant Telnet non chiffré.\n* **IPsec (IP Security)** : Chiffre et authentifie tout le trafic IP entre deux points réseau. Souvent utilisé pour les VPN.\n* **S/MIME et PGP** : Chiffrement et signature numérique des emails.\n* **SET** : Protocole sécurisé pour les transactions par carte de crédit en ligne (moins utilisé aujourd'hui).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:32:en"
  };

  window.CONTENT_I18N["sg:33"] = window.CONTENT_I18N["sg:33"] || {};
  window.CONTENT_I18N["sg:33"].fr = {
    title: "5-1-1 Loi cadre japonaise sur la cybersécurité",
    concept: "**Cadre législatif japonais sur la cybersécurité :**\n\n* **Loi fondamentale sur la cybersécurité (Cybersecurity Basic Act)** : Loi-cadre définissant la politique nationale de cybersécurité du Japon, créant le NISC.\n* **Loi sur la protection des informations personnelles (APPI)** : Réglemente le traitement des informations personnelles par les entreprises.\n* **Loi interdisant les accès non autorisés** : Interdit l'accès non autorisé aux ordinateurs et réseaux.\n\n**Organisations concernées :** NISC (coordination), JPCERT/CC (centre de réponse aux incidents), IPA (Agence de sécurité IT du Japon).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:33:en"
  };

  window.CONTENT_I18N["sg:34"] = window.CONTENT_I18N["sg:34"] || {};
  window.CONTENT_I18N["sg:34"].fr = {
    title: "5-2-1 Droits de propriété intellectuelle (brevet/droit d'auteur)",
    concept: "**Droits de propriété intellectuelle :**\n\n* **Droit d'auteur (Copyright)** : Protège les œuvres littéraires, artistiques et les logiciels. Naît automatiquement à la création.\n* **Brevet (Patent)** : Protège les inventions. Durée limitée (généralement 20 ans).\n* **Marque déposée (Trademark)** : Protège les noms de marque et logos.\n* **Secret commercial (Trade Secret)** : Protège les informations commerciales confidentielles.\n\n**Utilisation légale des logiciels** : Respecter les licences. La copie non autorisée et la violation du droit d'auteur sont illégales.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:34:en"
  };

  window.CONTENT_I18N["sg:35"] = window.CONTENT_I18N["sg:35"] || {};
  window.CONTENT_I18N["sg:35"].fr = {
    title: "6-1-1 Objectifs de l'audit système, processus et audit par tiers",
    concept: "**Audit système (System Audit) :**\nProcessus d'évaluation systématique pour déterminer si les contrôles et processus du système d'information sont conçus et fonctionnent efficacement.\n\n**Objectifs :**\n* Vérifier l'efficacité des contrôles de sécurité.\n* Identifier les vulnérabilités et faiblesses.\n* Évaluer la conformité aux politiques et réglementations.\n\n**Processus d'audit :**\n1. **Planification** : Définir le périmètre et les objectifs.\n2. **Exécution** : Collecter et analyser les preuves.\n3. **Rapport** : Rapporter les résultats et recommandations.\n4. **Suivi** : Confirmer la mise en œuvre des corrections.\n\n**Audit par un tiers** : Audit indépendant réalisé par un organisme externe pour garantir l'objectivité.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:35:en"
  };

  window.CONTENT_I18N["sg:36"] = window.CONTENT_I18N["sg:36"] || {};
  window.CONTENT_I18N["sg:36"].fr = {
    title: "6-2-1 Règles d'or de la gestion des services IT (cadre ITIL)",
    concept: "**ITIL (IT Infrastructure Library) :**\nEnsemble de bonnes pratiques largement utilisé pour la gestion des services IT (ITSM).\n\n**Processus ITIL principaux :**\n* **Gestion des incidents** : Rétablir le service normal le plus rapidement possible après un incident.\n* **Gestion des problèmes** : Identifier la cause racine des incidents.\n* **Gestion des changements** : Gérer les changements du système IT de manière contrôlée.\n* **Gestion des mises en production** : Planifier et contrôler le déploiement.\n* **Gestion des configurations** : Maintenir une base de données de gestion des configurations (CMDB).\n* **SLA (Accord de niveau de service)** : Définit le niveau de service convenu entre le fournisseur et le client.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:36:en"
  };

  window.CONTENT_I18N["sg:37"] = window.CONTENT_I18N["sg:37"] || {};
  window.CONTENT_I18N["sg:37"].fr = {
    title: "6-3-1 Cœur de la gestion de projet : les neuf domaines de connaissances PMBOK",
    concept: "**Les neuf domaines de connaissances PMBOK :**\n1. **Gestion du périmètre** : Définir le travail à réaliser.\n2. **Gestion du temps** : Planifier et suivre l'avancement.\n3. **Gestion des coûts** : Budgétiser et contrôler les dépenses.\n4. **Gestion de la qualité** : Garantir que les résultats répondent aux exigences.\n5. **Gestion des ressources humaines** : Organiser et gérer l'équipe projet.\n6. **Gestion des communications** : Échanger efficacement les informations.\n7. **Gestion des risques** : Identifier et gérer les risques du projet.\n8. **Gestion des achats** : Acquérir biens et services.\n9. **Gestion de l'intégration** : Coordonner tous les domaines.\n\n**Diagramme de Gantt** : Outil de visualisation du calendrier du projet.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:37:en"
  };

  window.CONTENT_I18N["sg:38"] = window.CONTENT_I18N["sg:38"] || {};
  window.CONTENT_I18N["sg:38"].fr = {
    title: "7-1-1 Configuration système et systèmes parallèles multi-CPU",
    concept: "**Configurations système :**\n\n* **Système duplex (Duplex System)** : Deux systèmes identiques fonctionnent en parallèle. L'un traite les tâches, l'autre est en veille. Si l'un tombe en panne, l'autre prend le relais immédiatement. Haute fiabilité mais coût élevé.\n* **Système de secours (Standby System)** : Le système de secours ne s'active qu'en cas de panne du système principal. Coût moindre mais temps de basculement plus long.\n* **RAID (Redundant Array of Independent Disks)** : Combiner plusieurs disques pour améliorer les performances et/ou la redondance.\n  * **RAID 0 (Striping)** : Améliore les performances, pas de redondance.\n  * **RAID 1 (Mirroring)** : Duplique les données sur deux disques.\n  * **RAID 5** : Redondance avec parité, efficace en capacité.\n  * **RAID 6** : Double redondance, résiste à deux pannes de disques.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:38:en"
  };

  window.CONTENT_I18N["sg:39"] = window.CONTENT_I18N["sg:39"] || {};
  window.CONTENT_I18N["sg:39"].fr = {
    title: "7-2-1 Conception de schéma de base de données (externe/conceptuel/physique)",
    concept: "**Conception de schéma de base de données :**\n\n**Architecture à trois niveaux de schéma :**\n1. **Schéma externe** : Comment les utilisateurs finaux voient les données (vues).\n2. **Schéma conceptuel** : Structure logique globale de toute la base de données.\n3. **Schéma physique** : Comment les données sont réellement stockées sur le support.\n\n**Concepts importants :**\n* **Clé primaire (Primary Key)** : Identifie de manière unique chaque enregistrement.\n* **Clé étrangère (Foreign Key)** : Lie les tables entre elles.\n* **Normalisation** : Réduire la redondance des données et garantir l'intégrité.\n* **Diagramme ER** : Modéliser les relations entre entités.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:39:en"
  };

  window.CONTENT_I18N["sg:40"] = window.CONTENT_I18N["sg:40"] || {};
  window.CONTENT_I18N["sg:40"].fr = {
    title: "7-3-1 Topologie réseau et dispositifs matériels",
    concept: "**Topologies réseau :**\n* **Étoile (Star)** : Tous les appareils sont connectés à un point central (hub/switch). La plus courante.\n* **Anneau (Ring)** : Chaque appareil est connecté à deux autres, formant un anneau.\n* **Bus** : Tous les appareils partagent une ligne de transmission commune.\n* **Maillage (Mesh)** : Chaque appareil est connecté à plusieurs autres — redondance maximale.\n\n**Principaux équipements réseau :**\n* **NIC (Carte réseau)** : Connecte un ordinateur au réseau.\n* **Switch** : Achemine les données au sein d'un même LAN.\n* **Routeur** : Connecte différents réseaux et achemine les données entre eux.\n* **Passerelle (Gateway)** : Connecte des réseaux utilisant des protocoles différents.\n* **Pont (Bridge)** : Connecte deux LAN similaires.\n* **Répéteur** : Amplifie le signal pour étendre la portée du réseau.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:40:en"
  };

  window.CONTENT_I18N["sg:41"] = window.CONTENT_I18N["sg:41"] || {};
  window.CONTENT_I18N["sg:41"].fr = {
    title: "8-1-1 Structures modernes de gestion d'entreprise et analyse",
    concept: "**Structures modernes de gestion d'entreprise :**\n\n* **Organigramme** : Structure hiérarchique des départements et relations hiérarchiques.\n* **Analyse SWOT** : Forces, Faiblesses, Opportunités, Menaces.\n* **Analyse PPM** : Évaluer les projets selon leur priorité et leurs ressources.\n* **Matrice BCG** : Classer les unités commerciales selon leur part de marché et leur croissance.\n\n**Gouvernance d'entreprise (Corporate Governance)** : Système de règles, pratiques et processus pour diriger et contrôler l'entreprise.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:41:en"
  };

  window.CONTENT_I18N["sg:42"] = window.CONTENT_I18N["sg:42"] || {};
  window.CONTENT_I18N["sg:42"].fr = {
    title: "8-2-1 Planification stratégique du système d'information, entreprise",
    concept: "**Planification stratégique du système d'information :**\n\n* **Modèle d'entreprise tridimensionnel :**\n  * Stratégie : Vision, mission, objectifs.\n  * Processus : Processus métier principaux.\n  * Système : Systèmes d'information soutenant les processus.\n* **Analyse coûts-bénéfices** : Évaluer les bénéfices par rapport aux coûts.\n* **ROI** : Retour sur investissement.\n\n**Principaux systèmes d'entreprise :**\n* **ERP** : Gestion des ressources de l'entreprise.\n* **SCM** : Gestion de la chaîne d'approvisionnement.\n* **CRM** : Gestion de la relation client.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:42:en"
  };

  window.CONTENT_I18N["sg:43"] = window.CONTENT_I18N["sg:43"] || {};
  window.CONTENT_I18N["sg:43"].fr = {
    title: "8-3-1 Planification du système d'information et étude de faisabilité",
    concept: "**Planification du système d'information et étude de faisabilité :**\n\n**Phase d'enquête préliminaire :**\n* **RFI** : Recueillir des informations auprès des fournisseurs.\n* **RFP** : Demander des propositions détaillées et des devis.\n* **RFQ** : Demander un devis spécifique.\n\n**Étude de faisabilité :**\n* **Faisabilité technique** : La technologie est-elle disponible et adaptée ?\n* **Faisabilité économique** : Les bénéfices dépassent-ils les coûts ? (Analyse coûts-bénéfices, ROI).\n* **Faisabilité opérationnelle** : Les utilisateurs vont-ils accepter et utiliser le système ?\n* **Faisabilité juridique** : Respecte-t-elle les réglementations ?\n* **Faisabilité calendaire** : Peut-elle être achevée dans les délais ?",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:43:en"
  };

  window.CONTENT_I18N["sg:44"] = window.CONTENT_I18N["sg:44"] || {};
  window.CONTENT_I18N["sg:44"].fr = {
    title: "9-1-1 Stratégie d'examen du sujet B et points clés",
    concept: "**Stratégie d'examen du sujet B (Subject B) et points clés :**\n\nLe sujet B de l'examen SG se concentre sur des questions de mise en situation nécessitant des compétences d'analyse et d'application des connaissances.\n\n1. **Maîtriser les connaissances fondamentales** : Comprendre la triade CIA, la gestion des risques, les contrôles de sécurité.\n2. **S'entraîner aux questions de mise en situation** : Se familiariser avec les différents types de cas pratiques.\n3. **Gérer son temps d'examen** : Répartir le temps de manière équilibrée entre les questions.\n4. **Réviser la terminologie clé** : Mémoriser les définitions et concepts importants.\n5. **Faire des examens blancs** : S'entraîner avec des sujets d'examen pour se familiariser avec la structure.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sg_en.js:sg:44:en"
  };
})();
