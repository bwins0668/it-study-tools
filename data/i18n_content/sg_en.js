(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["sg:1"] = {
    en: {
      title: "1-1-1 What is Information Security?",
      concept: "Common examples of information security breaches include malware infections and ransomware attacks.",
      needsReview: true,
      source: "manual-sg-en-v1",
      sourceRef: "data/sg_lessons.js:1:conceptJa"
    }
  };

  window.CONTENT_I18N["sg:2"] = {
    en: {
      title: "1-1-2 Case Study 1: Malware Infection",
      concept: "**1. Malware Infection and Threats:**\nMalware infects users' computers or smartphones to steal confidential information or perform unauthorized operations. It spreads mainly through email attachments, malicious websites, or USB flash drives.",
      needsReview: true,
      source: "manual-sg-en-v1",
      sourceRef: "data/sg_lessons.js:2:conceptJa"
    }
  };

  window.CONTENT_I18N["sg:3"] = {
    en: {
      title: "1-1-3 Case Study 2: Ransomware and Backups",
      concept: "**2. Ransomware Attacks and the Importance of Backups:**\nRansomware is a malicious virus that encrypts data and demands a ransom for decryption. Recently, double extortion (encrypting data and threatening to release it if the ransom is not paid) has increased. Paying the ransom does not guarantee data recovery. Therefore, regularly taking **offline backups** that are non-volatile and physically isolated from the network is the only effective defense strategy.",
      needsReview: true,
      source: "manual-sg-en-v1",
      sourceRef: "data/sg_lessons.js:3:conceptJa"
    }
  };

  window.CONTENT_I18N["sg:4"] = {
    en: {
      title: "1-2-1 Objectives and Concepts of Information Security",
      concept: "The foundation of information security is maintaining the three major elements: Confidentiality, Integrity, and Availability (known as the CIA triad).",
      needsReview: true,
      source: "manual-sg-en-v1",
      sourceRef: "data/sg_lessons.js:4:conceptJa"
    }
  };

  window.CONTENT_I18N["sg:5"] = {
    en: {
      title: "1-2-2 Basics of Information Security",
      concept: "**1. The CIA Triad:**\n* **Confidentiality**: Ensuring that only authorized individuals can access information (e.g., through encryption and access controls).\n* **Integrity**: Ensuring that information is not modified or destroyed unauthorizedly, and remains accurate (e.g., through digital signatures and hash verification).\n* **Availability**: Ensuring that authorized users can access and use information or systems when needed (e.g., through server redundancy and UPS installation).",
      needsReview: true,
      source: "manual-sg-en-v1",
      sourceRef: "data/sg_lessons.js:5:conceptJa"
    }
  };

  window.CONTENT_I18N["sg:6"] = {
    en: {
      title: "1-2-3 Types of Threats",
      concept: "**2. Additional Security Elements:**\nIn recent years, other elements are also emphasized: authenticity (preventing impersonation), accountability (storing audit logs), non-repudiation (proving actions), and reliability.",
      needsReview: true,
      source: "manual-sg-en-v1",
      sourceRef: "data/sg_lessons.js:6:conceptJa"
    }
  };

  window.CONTENT_I18N["sg:7"] = {
    en: {
      title: "2-1-1 Attacks on Passwords",
      concept: "Attackers use various methods to compromise systems or disrupt services through cyberattacks.",
      needsReview: true,
      source: "manual-sg-en-v1",
      sourceRef: "data/sg_lessons.js:7:conceptJa"
    }
  };

  window.CONTENT_I18N["sg:8"] = {
    en: {
      title: "2-1-2 Attacks on Websites",
      concept: "**1. Password Attacks:**\n* **Brute-Force Attack**: An attack that systematically tries every possible character combination to guess a password.\n* **Dictionary Attack**: An attack that tries words from a dictionary or commonly used strings in order.\n* **Password List Attack**: An attack that uses a list of IDs and passwords leaked from other websites to attempt login. It exploits the **bad habit of reusing passwords** across multiple sites.",
      needsReview: true,
      source: "manual-sg-en-v1",
      sourceRef: "data/sg_lessons.js:8:conceptJa"
    }
  };

  window.CONTENT_I18N["sg:9"] = {
    en: {
      title: "2-1-3 Attacks on Communications",
      concept: "**2. Attacks on Websites and Communications:**\n* **SQL Injection**: Injecting malicious SQL commands into input fields to unauthorizedly manipulate the database.\n* **Cross-Site Scripting (XSS)**: Embedding malicious scripts in vulnerable websites, causing them to execute in the visitor's browser to steal cookies or session IDs.\n* **DoS / DDoS Attack**: Sending a massive amount of traffic to overload a server and suspend its service.",
      needsReview: true,
      source: "manual-sg-en-v1",
      sourceRef: "data/sg_lessons.js:9:conceptJa"
    }
  };

  window.CONTENT_I18N["sg:10"] = {
    en: {
      title: "2-2-1 Encryption Technology",
      concept: "Technology used to transmit information securely and prevent impersonation.",
      needsReview: true,
      source: "manual-sg-en-v1",
      sourceRef: "data/sg_lessons.js:10:conceptJa"
    }
  };

  window.CONTENT_I18N["sg:11"] = {
    en: {
      title: "2-2-2 Authentication Technology & Digital Signatures",
      concept: "**1. Two Classic Encryption Methods — Core Exam Topics:**\n- **Symmetric Encryption (Shared Key / 共通鍵)**: Encryption and decryption use the **same key** (representative algorithm: AES). Very fast, suitable for large data; however, the key must be securely delivered to the other party — this is called the \"key distribution problem (鍵配送問題)\".\n- **Asymmetric Encryption (Public Key / 公開鍵)**: Uses a **pair of keys** (representative algorithm: RSA) — a public key shared with everyone, and a private key kept only by the owner.\n  - **Encryption rule**: Encrypt with the **recipient's public key**; only the **recipient's private key** can decrypt. There is no key distribution problem, but computation is slower.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:11:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:12"] = {
    en: {
      title: "2-2-3 Multi-Factor Authentication & Biometric Technology",
      concept: "**2. Hybrid Encryption (ハイブリッド暗号方式):**\nCombines the strengths of both symmetric and asymmetric encryption. Large data is encrypted with a symmetric key, and then that symmetric key is securely wrapped using asymmetric (public key) encryption. This is the foundation of HTTPS / TLS used on the web today.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:12:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:13"] = {
    en: {
      title: "2-2-4 Public Key Infrastructure (PKI) & Certificate Authorities (CA)",
      concept: "**3. Digital Signatures & PKI:**\n- **Digital Signature**: Created by the sender using their **private key** to encrypt a hash of the data. The recipient verifies it using the sender's **public key**. Guarantees: 1. Data was not tampered with in transit (tamper detection); 2. Confirmed to come from the sender — cannot be denied (non-repudiation).\n- **CA (Certificate Authority)**: Issues digital certificates to prove that a public key genuinely belongs to the stated owner, preventing public key spoofing by attackers.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:13:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:14"] = {
    en: {
      title: "3-1-1 Information Security Management Policy",
      concept: "Information security is not purely a technical matter — it requires an organizational management system with full participation from all staff and executive leadership.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:14:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:15"] = {
    en: {
      title: "3-1-2 Core Requirements of Security Policy Hierarchy",
      concept: "**1. Information Security Policy (情報セキュリティ方針) — Pyramid Structure:**\nA guiding policy document formulated by **company management (経営陣)** that declares the company's highest stance on security. Typically structured top-down as:\n  - **Basic Policy (基本方針)**: A declaration of principles open to the public and all employees.\n  - **Control Standards (対策基準)**: Specific rules for particular business areas.\n  - **Implementation Procedures (実施手順)**: Detailed work instructions for front-line staff.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:15:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:16"] = {
    en: {
      title: "3-1-3 Information Security Management System (ISMS) & PDCA Cycle",
      concept: "**2. ISMS (Information Security Management System) & PDCA Cycle — Major Exam Topic:**\nISMS is a continuous process designed to systematically maintain the CIA triad. It must iterate continuously through the **PDCA Cycle**:\n- **Plan**: Conduct asset inventory and risk assessment; formulate security plans and policies.\n- **Do**: Implement security configurations and conduct organization-wide security training.\n- **Check**: Verify through internal audits or log reviews whether the plan is being followed and assess effectiveness.\n- **Act**: Implement corrective actions and improvements for issues identified during audits.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:16:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:17"] = {
    en: {
      title: "3-2-1 Information Asset Inventory, Classification & Value Assessment",
      concept: "A closed-loop process of analyzing the threats and vulnerabilities facing information assets, and then applying appropriate control measures.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:17:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:18"] = {
    en: {
      title: "3-2-2 Risk Value Estimation (Threat Level × Vulnerability × Asset Value)",
      concept: "**1. Three Mandatory Steps in Risk Assessment (リスクアセスメント):**\n- **Risk Identification (リスク特定)**: Identify the organization's information assets (servers, data) and list all potential hazards.\n- **Risk Analysis (リスク分析)**: Estimate the \"likelihood\" and \"impact (損失額)\" of each hazard occurring; multiply them to compute a risk level score.\n- **Risk Evaluation (リスク評価)**: Compare the computed risk against the company's \"acceptance threshold (リスク受容基準)\" and prioritize which risks to mitigate.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:18:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:19"] = {
    en: {
      title: "3-2-3 Complete Phases of Information Security Risk Assessment",
      concept: "**2. Four Risk Response Strategies — Must Distinguish Completely:**\n- **Risk Reduction (リスク低減)**: Install firewalls and encrypt hard drives to reduce the likelihood or impact of incidents.\n- **Risk Avoidance (リスク回避)**: Completely stop high-risk activities or abandon high-risk systems (e.g., \"prohibit all staff from using USB drives\").\n- **Risk Transfer (リスク移転)**: Shift financial losses to a third party (e.g., purchase cyber insurance, outsource servers to a cloud provider).\n- **Risk Acceptance/Retention (リスク保有)**: If a vulnerability's harm is minimal and fixing it costs more than the potential loss, the company chooses to do nothing and tolerate it.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:19:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:20"] = {
    en: {
      title: "3-3-1 Security Incident Response Organizations & Teams (CSIRT/SOC/JPCERT)",
      concept: "Professional departments for handling security incidents and external standards for evaluating IT product security:\n- **CSIRT (Computer Security Incident Response Team)**: A specialized emergency response team set up within an enterprise to rapidly respond to security incidents (hacker intrusions, malware infections, data breaches) — conducting technical investigations and restoring business operations.\n- **SOC (Security Operations Center)**: Monitors network traffic and system logs 24 hours a day to proactively detect signs of potential attacks.\n- **IPA**: The official sponsor of this exam; responsible for setting and promoting national IT security standards in Japan.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:20:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:21"] = {
    en: {
      title: "3-3-2 International Standard for IT Security Evaluation (ISO 15408 CC)",
      concept: "**1. Cybersecurity Emergency & Coordination Organizations — Common Exam Content:**\n- **CSIRT**: An enterprise's internal specialized rescue team that responds quickly when security incidents (インシデント) such as hacker intrusions, trojans, and data leaks occur.\n- **SOC**: Responsible for 24-hour monitoring of network flows and system logs to proactively identify potential attack indicators.\n- **IPA (Information-technology Promotion Agency)**: The official organizer of this exam, responsible for formulating and promoting national information security standards.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:21:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:22"] = {
    en: {
      title: "3-3-3 Chapter Practice Problems",
      concept: "**2. Common Criteria for IT Security Evaluation (ISO/IEC 15408):**\n- Also known as **Common Criteria (CC)**. It is an internationally recognized standard for neutrally and objectively evaluating and certifying the security defense functions of hardware (e.g., IC cards) or software systems. Certifications are divided into multiple Evaluation Assurance Levels (EAL).",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:22:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:23"] = {
    en: {
      title: "4-1-1 Human Security Measures & Countering Social Engineering",
      concept: "The biggest weak point in information security is often not technical vulnerabilities but human carelessness itself.\n\n**1. Social Engineering Attacks (ソーシャルエンジニアリング) — High-Frequency Conceptual Exam Content:**\nAttacks that exploit human weaknesses, negligence, or deception to obtain accounts or business secrets — without using any advanced code or exploits:\n- **Shoulder Surfing (ショルダーハック)**: Standing behind a victim to peek at their screen or observe their keyboard input. Defense: Cover when entering passwords; apply privacy screen filters.\n- **Dumpster Diving (スカベンジング)**: Rummaging through discarded paper or old hard drives from office bins for notes with passwords or confidential blueprints. Defense: All discarded documents must be shredded.\n- **Impersonation (なりすまし電話)**: Pretending to be an IT support employee and using a phone call to trick users into revealing their login passwords.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:23:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:24"] = {
    en: {
      title: "4-1-2 Chapter Practice Problems",
      concept: "**2. Defensive Mechanisms Against Human Threats:**\n- **Screen Lock on Absence (画面ロック)**: Develop the habit of pressing the lock shortcut the moment you leave your seat, preventing colleagues or outsiders from snooping.\n- **Security Education & Phishing Drills**: Companies regularly send simulated phishing emails to train employees' ability to identify fraud.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:24:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:25"] = {
    en: {
      title: "4-2-1 Perimeter Defense (Firewall Packet Filtering & DMZ)",
      concept: "Software and hardware isolation and protection measures for network and application systems.\n\n**1. Firewall & Packet Filtering (パケットフィルタリング):**\nFirewalls are placed at the boundary between the corporate intranet and the internet. The most basic control technique is **Packet Filtering** — decisions on whether to allow traffic are made solely based on the packet header's: **source/destination IP address** and **port number**. The actual content is not inspected.\n\n**2. DMZ (Demilitarized Zone) — Major Exam Hotspot:**\nThe DMZ is an independent isolated area between the internet and the company's internal network. **All servers that need to be publicly accessible (e.g., Web servers, mail servers) must be placed in the DMZ**. Even if a web server is compromised, hackers cannot directly penetrate the internal network where confidential financial data is stored.\n\n**3. WAF (Web Application Firewall) — Comparison Exam Point:**\nOrdinary firewalls cannot block web attack traffic that enters legitimately through ports 80/443. **WAF specifically monitors the \"actual business content\" of HTTP/HTTPS requests** and can precisely block SQL injection or cross-site scripting attacks targeting web pages.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:25:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:26"] = {
    en: {
      title: "4-2-2 Malware Defense & Sandbox Isolation Monitoring",
      concept: "**1. Firewall & Packet Filtering:**\nA firewall is placed at the boundary between the corporate intranet and the internet. The most basic control technique is \"**Packet Filtering**\" — deciding whether to allow traffic based only on the packet header's **source/destination IP address** and **port number**. The content is not inspected.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:26:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:27"] = {
    en: {
      title: "4-2-3 Mobile Device & Wireless LAN Security Encryption Protocols (WPA3)",
      concept: "**2. DMZ (Demilitarized Zone / 非武装地帯) — Major Exam Hotspot:**\nThe DMZ is an independent isolated zone between the internet and the corporate LAN. **All servers that need to be publicly accessible over the internet (such as Web servers and mail servers) must be placed in the DMZ**. Even if a web server is unfortunately compromised by hackers, they cannot follow the trail to directly intrude into the corporate intranet storing confidential financial data.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:27:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:28"] = {
    en: {
      title: "4-2-4 Digital Forensics & Evidence Preservation (Forensics)",
      concept: "**3. WAF (Web Application Firewall) — Comparison Exam Point:**\nOrdinary firewalls cannot block web attack traffic that legitimately enters through ports 80/443. **WAF specifically monitors the \"actual business content\" of HTTP/HTTPS requests**, able to precisely intercept SQL injection or cross-site scripting attacks targeting web pages.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:28:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:29"] = {
    en: {
      title: "4-3-1 Physical Access Control & Anti-Tailgating Interlocked Security Doors",
      concept: "Physical security measures applied to the office or data center where hardware equipment and servers are stored.\n\n**1. Physical Access Control & Anti-Tailgating (共連れ防止) — High-Frequency Exam Content:**\nTo prevent unauthorized personnel from entering the server room, card and fingerprint access systems are required. The key vulnerability here is guarding against **tailgating (共連れ)** — where only one person swipes a card but several others sneak in behind. The most effective countermeasure against tailgating is:\n- **Interlocked Double-Door Gate (インターロックゲート)**: The two doors cannot both be open simultaneously. Only after the first door closes, the chamber detects only one person inside, and that person completes identity verification, does the second door open.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:29:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:30"] = {
    en: {
      title: "4-3-2 Chapter Practice Problems",
      concept: "**1. Access Management & Anti-Tailgating (共連れ防止) — High-Frequency Exam Content:**\nTo prevent unauthorized personnel from entering the server room, card and fingerprint access systems are required. The key vulnerability is guarding against **tailgating (共連れ)** — only one person swiped but others followed in. The most effective countermeasure:\n- **Interlocked Double-Door Gate (インターロックゲート)**: Prevents multiple people from passing through at once. Also called an \"anti-tailgating turnstile.\"",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:30:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:31"] = {
    en: {
      title: "4-3-3 Chapter Practice Problems",
      concept: "**2. Physical Equipment Protection Measures:**\n- Conduct blind-spot surveys for surveillance cameras, lock PCs with security cables, lock server racks (ラック), and use shredders to physically destroy sensitive media.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:31:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:32"] = {
    en: {
      title: "4-4-1 Secure Protocols (SSL/TLS, HTTPS, SSH, IPsec)",
      concept: "Security hardening protocols and networking technologies at the network communication level to prevent data eavesdropping and tampering.\n\n**1. Common Secure Communication Protocols — Frequently Tested Comparisons:**\n- **SSL / TLS**: Primarily operates at the transport layer to encrypt the entire HTTP data stream (i.e., the HTTPS protocol, typically port 443). Uses server certificates to **verify that the visited website is not a phishing impersonator**.\n- **SSH**: Replaces the insecure Telnet protocol for remote command-line management, strongly encrypting all operation instructions and login credentials.\n- **IPsec**: Implements high-strength encryption directly at the underlying IP network layer for all data packets; commonly used for cross-regional corporate networking (VPN tunnel construction).\n\n**2. Virtual Private Network (VPN):**\nUsing public internet lines, an encrypted \"dedicated virtual tunnel\" is established so that remote offices or branches can securely access internal network resources as if they were on a local area network.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:32:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:33"] = {
    en: {
      title: "5-1-1 Japan Cybersecurity Basic Act Framework",
      concept: "The legal foundation governing network behavior, combating cybercrime, and protecting citizens' privacy.\n\n**1. Unauthorized Computer Access Prohibition Act (不正アクセス禁止法) — High-Frequency Exam Approach:**\nStrictly penalizes criminal intrusion into others' network systems. The key to being identified as illegal is whether \"**access control (アクセス制御)**\" was bypassed. Main prohibited acts include:\n  - **Illegal Login**: Stealing or guessing others' account credentials to forcibly log in, or exploiting system security vulnerabilities to bypass the login process.\n  - **Illegal Provision/Acquisition**: Privately telling others' passwords to third parties, or obtaining others' passwords through phishing websites (even without logging in, it is illegal!).\n\n**2. Personal Information Protection Act (個人情報保護法):**\n- **Protected subjects**: All information that **can identify a specific living natural person** (including name, date of birth, fingerprint features, passport number, ID number, etc.).\n- **Applicable entities**: Regardless of company size, any company that collects and processes personal data is a \"personal information handler (個人情報取扱事業者)\" and must comply.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:33:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:34"] = {
    en: {
      title: "5-2-1 Intellectual Property Rights (Patent/Copyright/Trademark)",
      concept: "Intellectual property law and compliance regulations that must be strictly observed in production and engineering development.\n\n**1. Intellectual Property System — Must-Compare Exam Content:**\n- **Copyright Law (著作権法)**: Protects software source code, novels, music, and other intellectual creations. The core principle is \"**No-formality doctrine (無方式主義)**\" — **copyright is automatically granted the moment a work is created, without any registration**. Note: Programming languages themselves and algorithms themselves are NOT protected by copyright.\n- **Patent Law (特許法)**: Protects patent rights for technical inventions; must be applied for and approved by the Patent Office before taking effect.\n- **Unfair Competition Prevention Act (不正競争防止法)**: Protects a company's \"trade secrets\". Must satisfy **three criteria** to receive protection: 1. **Secrecy management** (locked with a password); 2. **Usefulness** (beneficial to business); 3. **Non-public knowledge** (outsiders can't find it).\n\n**2. Contract for Work & Disguised Subcontracting (偽装請負):**\n- **Contract for Work (請負契約)**: Party B is only responsible for delivering results. **The command authority over project personnel is 100% with Party B**. If Party A's managers directly order Party B's employees to work, it constitutes the illegal \"**Disguised Subcontracting (偽装請負)**\".",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:34:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:35"] = {
    en: {
      title: "6-1-1 System Audit Objectives, Process & Third-Party Evaluation Principles",
      concept: "An independent third-party expert, separate from the system development/operations department, objectively reviews and evaluates the security and financial compliance of a company's systems.\n\n**1. Auditor Independence (独立性) — High-Frequency Exam Redline:**\nSystem auditors must have no conflicts of interest with the audited system or department. **If a system was designed, written, or operated by you, you absolutely cannot audit it** (objectivity cannot be guaranteed).\n\n**2. System Audit Workflow & Authority:**\nSystem auditors collect \"logs and evidence (監査証跡)\", compare against \"evaluation criteria\", write an audit report and submit it to **the CEO/Board of Directors (経営陣)**. If problems are found, they issue \"**Improvement Recommendations (改善勧告/指摘)**\", but auditors **have no authority and absolutely must not directly modify system code or regulations**.\n\n**3. Internal Controls (内部統制):**\nApproval and supervision mechanisms that companies establish themselves to prevent employee fraud and system manipulation in daily operations.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:35:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:36"] = {
    en: {
      title: "6-2-1 IT Service Management Golden Rules (ITIL Framework & SLA Metrics)",
      concept: "The management process for ensuring that IT systems, once operational, are stably provided to end users with promised quality.\n\n**1. ITIL Best Practices:**\nA set of industry-recognized guidelines summarizing global best practices for IT service management.\n\n**2. SLA (Service Level Agreement) — Common Exam Definition:**\nA formally signed contract between **service provider and client** that **quantifies IT service quality**. For example, committing to: server monthly uptime of 99.9% or higher, incident response within 2 hours. If targets are not met, compensation is provided.\n\n**3. Incident Management vs. Problem Management — Must Distinguish These High-Frequency Exam Points:**\n- **Incident Management (インシデント管理)**: When a failure occurs, don't rush to analyze deep root causes. **The only goal is to immediately restore service to normal (応急処置)**. E.g., if a server freezes, force restart to restore access first.\n- **Problem Management (問題管理)**: Responsible for investigating **\"why does it keep freezing\" (根本原因の追究)**. Proposes permanent solutions such as modifying configuration or replacing hardware to prevent recurrence.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:36:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:37"] = {
    en: {
      title: "6-3-1 Project Management Core: PMBOK Nine Knowledge Areas",
      concept: "A management methodology for achieving specific objectives (such as system completion) within deadline and budget constraints.\n\n**1. Schedule Management & Critical Path (クリティカルパス) — High-Frequency Calculation Exam Content:**\nUse **Arrow Diagrams (アローダイアグラム)** to describe dependencies between sub-tasks.\n- **Critical Path (クリティカルパス)**: The **longest path** from project start to finish among all possible routes.\n- **Key characteristic**: Because the critical path is the project's bottleneck, **any task on the critical path delayed by 1 day will necessarily delay the final delivery date by 1 day (total float = 0)**. The project manager must strictly guard the critical path.\n\n**2. Project Constraint Triangle**: Scope (スコープ), Time (時間/納期), and Cost (コスト). The three are mutually constraining — it is impossible to add unlimited new requirements without increasing costs or extending deadlines.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:37:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:38"] = {
    en: {
      title: "7-1-1 System Configuration & Multi-CPU Parallel Systems",
      concept: "A classic theoretical framework for evaluating the overall quality and reliability of computer hardware and network systems.\n\n**1. Five Reliability Elements — RASIS Indicator Model (Must Memorize Each Initial Letter):**\n- **R (Reliability / 信頼性)**: The system is unlikely to break down. Measured by **MTBF** (Mean Time Between Failures; longer is better).\n- **A (Availability / 可用性)**: Can be used anytime, anywhere. Measured by **Uptime Rate (稼働率)**.\n- **S (Serviceability / 保守性)**: Extremely easy to repair when it breaks. Measured by **MTTR** (Mean Time To Repair; shorter is better).\n- **I (Integrity / 保全性)**: Data is unlikely to be lost or become inconsistent.\n- **S (Security / 安全性)**: Defensive strength against hacker intrusion.\n\n**2. Mandatory Uptime Calculation Formula:**\n`Uptime Rate = MTBF / (MTBF + MTTR)`",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:38:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:39"] = {
    en: {
      title: "7-2-1 Database Schema Design (External/Conceptual/Internal Schema)",
      concept: "Structured query architecture for massive data and concurrency control theory for ensuring data accuracy.\n\n**1. Relational Database (RDB) Core Design:**\n- **Table structure**: Data is organized in tables consisting of horizontal rows (Records) and vertical columns (Fields/Columns).\n- **Primary Key (主キー / Primary Key)**: A special field used to uniquely distinguish each row of records. Primary key values must never be duplicated and cannot be null.\n- **Normalization (正規化)**: Splitting large tables and eliminating redundant fields to ensure that data does not produce contradictions during insertions, deletions, or updates.\n\n**2. Database Transaction Properties (ACID Properties) — Required Exam Details:**\nA transaction is an indivisible logical unit of operation. To prevent server crashes causing account discrepancies, transactions must follow **ACID principles**:\n- **Atomicity**: All update steps in the transaction **either all succeed and commit, or all are undone and rolled back** — cannot remain in an awkward intermediate state.\n- **Consistency**: Data always satisfies predefined constraints before and after the transaction.\n- **Isolation**: Multiple concurrent transactions do not interfere with each other.\n- **Durability**: Once successfully committed, data modifications are never lost even if the server loses power.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:39:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:40"] = {
    en: {
      title: "7-3-1 Network Topology & Hardware Devices (NIC/Router/Switch)",
      concept: "The technical logic for computers to locate each other and reliably transmit data across LANs and WANs.\n\n**1. Classic TCP/IP Layered Protocol Architecture — Frequently Tested Layer Alignment:**\n- **Application Layer**: Directly faces specific software formats. Secure web (HTTPS/port 443), email sending (SMTP), email receiving (POP3/IMAP), automatic IP assignment (DHCP).\n- **Transport Layer**: Controls delivery:\n  - **TCP Protocol**: Pursues 100% delivery. Requires a \"three-way handshake\" to establish connection before data transfer; retransmits lost packets; assembles in order. Slower but highly reliable.\n  - **UDP Protocol**: Just sends outward, does not confirm receipt, does not retransmit lost packets. Unreliable but extremely fast without handshake delays — suitable for video streaming and real-time calls.\n- **Network Layer**: Handles routing. Based on target **IP address**, routers perform optimal path selection (routing).\n\n**2. DNS (Domain Name System) — Classic Exam Definition:**\n- Computers in internet communication only recognize IP addresses, but humans can only remember domain names. **The core function of DNS is to translate human-readable \"domain names\" into computer-readable \"IP addresses\"**.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:40:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:41"] = {
    en: {
      title: "8-1-1 Modern Corporate Management Structures & Analysis Frameworks (SWOT/3C)",
      concept: "Quantitative analysis frameworks used for strategic planning and daily business management.\n\n**1. Business Process Reengineering (BPR) — Exam Comparison:**\n- **BPR**: A **fundamental redesign and disruptive reconstruction (抜本的な再設計)** of existing organizational structures, job positions, and business processes to achieve dramatic improvements in cost, quality, and delivery time. Note: It is not minor tweaking but \"demolish and rebuild.\"\n\n**2. Balanced Scorecard (BSC) — Very Popular Concept:**\nTraditional financial metrics (how much money was made) are lagging indicators. **BSC innovatively introduces non-financial indicators, advocating evaluating corporate performance in a balanced way across four interrelated dimensions**:\n- **Financial Dimension (財務の視点)**: How do shareholders see us? (e.g., revenue growth rate, profit margin)\n- **Customer Dimension (顧客の視点)**: How do customers see us? (e.g., customer satisfaction, repeat purchase rate)\n- **Internal Business Process Dimension (業務プロセスの視点)**: What must we excel at? (e.g., shorten production cycle, reduce defect rate)\n- **Learning & Growth Dimension (学習と成長の視点)**: Can we continue to improve and create value? (e.g., number of certified employees, training hours)",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:41:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:42"] = {
    en: {
      title: "8-2-1 Information System Strategy Planning, Enterprise Architecture & KPIs",
      concept: "Methods for planning and evaluating how to introduce and use IT systems to enhance business value based on the company's overall strategic direction.\n\n**1. On-Premises vs. Cloud Computing — High-Frequency Exam Comparison:**\n- **On-Premises**: The company purchases its own servers, dedicated lines, and builds its own data center. Initial capital expenditure (CapEx) is extremely high and maintenance requires specialists; however, data confidentiality is high.\n- **Cloud**: Rent cloud server resources on demand online. Low initial investment, operational expenses (OpEx) are pay-as-you-go, with flexible horizontal scaling (Scalability); however, external data security risks exist.\n\n**2. ROI (Return on Investment / 費用対効果) Evaluation:**\nAfter introducing an information system, regularly calculate the ratio of net benefits to total costs to assess whether the expected value has been achieved.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:42:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:43"] = {
    en: {
      title: "8-3-1 Information System Planning & Feasibility Assessment",
      concept: "The process by which a company as the requester organizes its ideas and procures through external software vendor tendering before writing any code.\n\n**1. Request for Information (RFI) vs. Request for Proposal (RFP) — Important Distinction Exam Point:**\n- **RFI (Request for Information / 情報提供依頼書)**: Sent to multiple developers when the company itself is not yet sure \"what technologies are available.\" **Used to collect external developers' latest solutions, past cases, and technical capabilities**.\n- **RFP (Request for Proposal / 提案依頼書)**: The company has already clarified what kind of system to build, so it writes a detailed requirements document and sends it to developers. **Requires developers to submit their \"development proposals\" and \"price quotations (見積書)\" for these specific requirements within a specified time**.\n\n**2. Standard Information System Procurement Tendering Process:**\nSend RFI to collect technical intelligence → Confirm requirements → Send RFP to vendors → Vendors bid → Evaluate bids and sign contract.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:43:conceptZh"
    }
  };

  window.CONTENT_I18N["sg:44"] = {
    en: {
      title: "9-1-1 Subject B Exam Strategy & Key Points",
      concept: "Subject B is a comprehensive long-form case analysis exam that tests practical information security skills and logical thinking ability through pseudocode (疑似言語).\n\n**1. Characteristics & Approach for Information Security Practical Long-Form Questions:**\nThe questions provide background material for a specific company. You need to read through the material to identify security loopholes in the policies or predict potential data breach risks. When answering, firmly apply CIA principles and the scientific combination of physical, technical, and management measures to find the most reasonable and safest practical solution.\n\n**2. Pseudocode (疑似言語) Reading Practice:**\nThe exam provides policy control logic written in pseudocode (e.g., algorithms for counting the frequency of denial of access from an IP based on access logs, determining whether automatic lockout is needed).\n\n**🎯 Exam Tips**: When reading pseudocode, pay close attention to:\n- Boundary conditions of loop structures (While / For).\n- Array indices (Japan's exam convention typically starts at 1, not the usual programming language starting point of 0 — this is an extremely common trap!).\n- How variables change incrementally within loops. Writing a table to perform a Dry Run simulation is the most efficient method for full marks.",
      needsReview: true,
      source: "ai-assisted-from-sg-v1",
      sourceRef: "data/sg_lessons.js:44:conceptZh"
    }
  };
})();
