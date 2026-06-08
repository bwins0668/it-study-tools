import json
import re
import os
import shutil

# =========================================================================
# SG 备考板块三级大纲及页码硬编码字典 (基于 PDF 官方大纲)
# =========================================================================
SG_TOC = {
    "1-1": [
        ("1-1-1 情報セキュリティとは", 36),
        ("1-1-2 【事例1】マルウェア感染", 38),
        ("1-1-3 【事例2】ランサムウェアとバックアップ", 43)
    ],
    "1-2": [
        ("1-2-1 情報セキュリティの目的と考え方", 47),
        ("1-2-2 情報セキュリティの基本", 51),
        ("1-2-3 脅威の種類", 53),
        ("1-2-4 マルウェア・不正プログラム", 55),
        ("1-2-5 不正と攻撃のメカニズム", 58),
        ("1-2-6 演習問題", 62)
    ],
    "2-1": [
        ("2-1-1 パスワードに関する攻撃", 70),
        ("2-1-2 Webサイトに関する攻撃", 72),
        ("2-1-3 通信に関する攻撃", 76),
        ("2-1-4 標的型攻撃・その他", 80),
        ("2-1-5 演習問題", 85)
    ],
    "2-2": [
        ("2-2-1 暗号化技術", 94),
        ("2-2-2 認証技術", 104),
        ("2-2-3 利用者認証・生体認証", 110),
        ("2-2-4 公開鍵基盤", 117),
        ("2-2-5 演習問題", 122)
    ],
    "3-1": [
        ("3-1-1 情報セキュリティ管理", 134),
        ("3-1-2 情報セキュリティ諸規程", 138),
        ("3-1-3 情報セキュリティマネジメントシステム", 140),
        ("3-1-4 情報セキュリティ継続", 147),
        ("3-1-5 演習問題", 149)
    ],
    "3-2": [
        ("3-2-1 情報資産の調査・分類", 155),
        ("3-2-2 リスクの種類", 156),
        ("3-2-3 情報セキュリティリスクアセスメント", 158),
        ("3-2-4 情報セキュリティリスク対応", 161),
        ("3-2-5 演習問題", 164)
    ],
    "3-3": [
        ("3-3-1 情報セキュリティ組織・機関", 170),
        ("3-3-2 セキュリティ評価", 178),
        ("3-3-3 演習問題", 185)
    ],
    "4-1": [
        ("4-1-1 人的セキュリティ対策", 192),
        ("4-1-2 演習問題", 198)
    ],
    "4-2": [
        ("4-2-1 クラッキング・不正アクセス対策", 204),
        ("4-2-2 マルウェア・不正プログラム対策", 209),
        ("4-2-3 携帯端末・无线LANのセキュリティ対策", 213),
        ("4-2-4 デジタルフォレンジックス・証拠保全対策", 217),
        ("4-2-5 その他の技術的セキュリティ対策", 219),
        ("4-2-6 演習問題", 225)
    ],
    "4-3": [
        ("4-3-1 物理的セキュリティ対策", 235),
        ("4-3-2 演習問題", 240)
    ],
    "4-4": [
        ("4-4-1 セキュアプロトコル", 244),
        ("4-4-2 認証技術", 246),
        ("4-4-3 ネットワークセキュリティ", 248),
        ("4-4-4 データベースセキュリティ", 252),
        ("4-4-5 アプリケーションセキュリティ", 254),
        ("4-4-6 演習問題", 256)
    ],
    "5-1": [
        ("5-1-1 サイバーセキュリティ基本法", 264),
        ("5-1-2 不正アクセス禁止法", 266),
        ("5-1-3 個人情報保護法", 268),
        ("5-1-4 刑法", 273),
        ("5-1-5 その他のセキュリティ関連法規・基準", 275),
        ("5-1-6 演習問題", 279)
    ],
    "5-2": [
        ("5-2-1 知的財産権", 287),
        ("5-2-2 労働関連・取引関連法規", 290),
        ("5-2-3 その他の法律・ガイドライン・技術者倫理", 294),
        ("5-2-4 标准化関連", 297),
        ("5-2-5 演習問題", 299)
    ],
    "6-1": [
        ("6-1-1 システム監査", 308),
        ("6-1-2 内部統制", 316),
        ("6-1-3 演習問題", 319)
    ],
    "6-2": [
        ("6-2-1 サービスマネジメント", 329),
        ("6-2-2 サービスマネジメントシステムの計画及び運用", 333),
        ("6-2-3 パフォーマンス評価及び改善", 340),
        ("6-2-4 サービスの運用", 342),
        ("6-2-5 ファシリティマネジメント", 345),
        ("6-2-6 演習問題", 346)
    ],
    "6-3": [
        ("6-3-1 プロジェクトマネジメント", 353),
        ("6-3-2 プロジェクトの統合", 357),
        ("6-3-3 プロジェクトのステークホルダ", 358),
        ("6-3-4 プロジェクトのスコープ", 359),
        ("6-3-5 プロジェクトの資源", 361),
        ("6-3-6 プロジェクトの時間", 362),
        ("6-3-7 プロジェクトのコスト", 365),
        ("6-3-8 プロジェクトのリスク", 367),
        ("6-3-9 プロジェクトの品質", 369),
        ("6-3-10 プロジェクトの調達", 371),
        ("6-3-11 プロジェクトのコミュニケーション", 372),
        ("6-3-12 演習問題", 373)
    ],
    "7-1": [
        ("7-1-1 システムの構成", 380),
        ("7-1-2 システムの評価指標", 389),
        ("7-1-3 演習問題", 392)
    ],
    "7-2": [
        ("7-2-1 データベース方式", 397),
        ("7-2-2 データベース設計", 399),
        ("7-2-3 データ操作", 401),
        ("7-2-4 トランザクション処理", 404),
        ("7-2-5 データベース応用", 409),
        ("7-2-6 演習問題", 411)
    ],
    "7-3": [
        ("7-3-1 ネットワーク方式", 415),
        ("7-3-2 データ通信と制御", 417),
        ("7-3-3 通信プロトコル", 422),
        ("7-3-4 ネットワーク管理", 429),
        ("7-3-5 ネットワーク応用", 430),
        ("7-3-6 演習問題", 435)
    ],
    "8-1": [
        ("8-1-1 経営・組織論", 440),
        ("8-1-2 業務分析・データ利活用", 445),
        ("8-1-3 会計・財務", 450),
        ("8-1-4 演習問題", 453)
    ],
    "8-2": [
        ("8-2-1 情報システム戦略", 459),
        ("8-2-2 業務プロセス", 462),
        ("8-2-3 ソリューションビジネス", 464),
        ("8-2-4 システム活用促進・評価", 466),
        ("8-2-5 演習問題", 468)
    ],
    "8-3": [
        ("8-3-1 システム化計画", 473),
        ("8-3-2 要件定義", 475),
        ("8-3-3 調達計画・実施", 477),
        ("8-3-4 演習問題", 481)
    ],
    "9-1": [
        ("9-1-1 科目B問題のポイント", 486),
        ("9-1-2 科目B問題の解き方", 493)
    ],
    "9-2": [
        ("9-2-1 演習問題", 497),
        ("9-2-2 演習問題の解説", 519)
    ]
}

# =========================================================================
# SG 正文高级切分规则
# =========================================================================
SG_SPLIT_RULES = {
    1: (["**1. マルウェア", "**2. ランサムウェア"], ["**1. 恶意软件", "**2. 勒索软件"]),
    2: (["**1. 3大要素", "**2. その他の追加要素"], ["**1. 信息安全三大要素", "**2. 其他四个衍生要素"]),
    3: (["**1. パスワード", "**2. Webサイト"], ["**1. 密码破解", "**2. 应用层漏洞"]),
    4: (["**1. 暗号化技術の種類", "**2. ハイブリッド暗号方式", "**3. デジタル署名と公開鍵基盤"], 
        ["**1. 两大经典加密方式", "**2. 混合加密方式", "**3. 数字签名"]),
    5: (["**1. 情報セキュリティ方針", "**2. ISMS"], ["**1. 信息安全方针", "**2. ISMS"]),
    6: (["**1. リスクアセスメント", "**2. 4つのリスク対応"], ["**1. 风险评估", "**2. 四大风险应对策略"]),
    7: (["**1. セキュリティ関連組織", "**2. セキュリティ評価"], ["**1. 网络安全应急与统筹组织", "**2. 信息技术安全评估通用准则"]),
    8: (["**2. 人的セキュリティ対策"], ["**2. 针对人的防御机制"]),
    9: (["**1. ファイアウォールと", "**2. 境界防御の高度化：**\n・**DMZ", "・**WAF"], 
        ["**1. 防火墙与分组过滤", "**2. DMZ", "**3. WAF"]),
    10: (["**1. 入退室管理システム", "**2. 物理設備対策"], ["**1. 入退室管理与防尾随", "**2. 物理设备的防护对策"]),
    11: (["**1. サイバーセキュリティ関連法規", "**2. その他の法規・標準"], ["**1. 日本核心安全法规", "**2. 其它相关法律与标准"]),
    12: (["**1. 知的財産権の保護", "**2. 労働・取引関連法規"], ["**1. 知识产权保护范围", "**2. 劳动与合规交易法规"]),
    13: (["**1. システム監査", "**2. 内部統制"], ["**1. 系统审计流程与规范", "**2. 内部控制的基本要素"]),
    14: (["**1. サービスマネジメントの基本", "**2. ITILとSLA"], ["**1. 什么是服务管理", "**2. ITIL框架与SLA服务等级协议"]),
    15: (["**1. プロジェクトマネジメントのプロセス", "**2. WBSと進捗管理"], ["**1. 项目管理的核心过程", "**2. WBS工作分解与进度管理工具"]),
    16: (["**1. システム構成と信頼性", "**2. システム評価指標"], ["**1. 经典计算机系统结构", "**2. 系统的可用性计算公式"]),
    17: (["**1. データベースの基本", "**2. データベース設計と正規化"], ["**1. 关系型数据库与基本操作", "**2. 数据库设计与范式化重构"]),
    18: (["**1. ネットワーク構成", "**2. TCP/IPとプロトコル"], ["**1. 计算机网络基础与拓扑", "**2. TCP/IP分层模型与核心协议"]),
    19: (["**1. 経営戦略の手法", "**2. マーケティングとビジネスシステム"], ["**1. 经典企业经营分析模型", "**2. 市场营销组合与商业系统"]),
    20: (["**1. システム戦略とシステム企画", "**2. 要件定義と調達"], ["**1. 信息系统战略与系统规划", "**2. 需求定义与供应商采购流程"]),
    21: (["**1. 科目B試験の特徴"], ["**1. 科目B大纲特征与学习目标"]),
    22: (["**1. アルゴリズムと疑似言語"], ["**1. 伪代码阅读与算法基础"]),
    23: (["**1. 情報セキュリティ対策のケーススタディ"], ["**1. 信息安全综合案例演练"])
}

# =========================================================================
# 加载与保存 JS 辅助函数
# =========================================================================
def load_js_array(filepath, var_name):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    idx = content.find(f"const {var_name} =")
    if idx == -1:
        raise ValueError(f"Could not find variable {var_name} in {filepath}")
    json_str = content[idx + len(f"const {var_name} ="):].strip()
    if json_str.endswith(";"):
        json_str = json_str[:-1].strip()
    return json.loads(json_str)

def save_js_array(filepath, var_name, data):
    pretty_json = json.dumps(data, ensure_ascii=False, indent=2)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(f"const {var_name} = {pretty_json};\n")

# =========================================================================
# 正文高保真分块切分器
# =========================================================================
def split_concept_by_rules(concept, rules):
    if not rules:
        return [concept]
    
    parts = []
    current_text = concept
    
    for rule in rules:
        idx = current_text.find(rule)
        if idx == -1:
            clean_rule = rule.replace("\n", "").strip()
            found = False
            for line in current_text.split("\n"):
                if clean_rule in line:
                    idx = current_text.find(line)
                    found = True
                    break
            if not found:
                continue
        
        parts.append(current_text[:idx].strip())
        current_text = current_text[idx:].strip()
    
    parts.append(current_text)
    return parts

# =========================================================================
# SG 升级重构逻辑
# =========================================================================
def upgrade_sg(original_lessons):
    print("Upgrading SG lessons...")
    upgraded = []
    global_id = 1
    
    for lesson in original_lessons:
        orig_id = lesson["id"]
        prefix_match = re.match(r"^(\d+-\d+)", lesson["titleJa"])
        if not prefix_match:
            print(f"Warning: could not extract section prefix from {lesson['titleJa']}")
            continue
        sec_prefix = prefix_match.group(1)
        
        toc_items = SG_TOC.get(sec_prefix, [])
        if not toc_items:
            print(f"Warning: no TOC items for {sec_prefix}")
            toc_items = [(lesson["titleJa"], lesson["pdfPage"])]
            
        rules_ja, rules_zh = SG_SPLIT_RULES.get(orig_id, ([], []))
        
        parts_ja = split_concept_by_rules(lesson["conceptJa"], rules_ja)
        parts_zh = split_concept_by_rules(lesson["conceptZh"], rules_zh)
        
        if len(parts_ja) != len(parts_zh):
            print(f"Error: Mismatched split size for SG lesson {orig_id}. JA: {len(parts_ja)}, ZH: {len(parts_zh)}")
            max_len = max(len(parts_ja), len(parts_zh))
            parts_ja += [""] * (max_len - len(parts_ja))
            parts_zh += [""] * (max_len - len(parts_zh))
            
        sub_count = len(parts_ja)
        
        for idx in range(sub_count):
            part_ja = parts_ja[idx]
            part_zh = parts_zh[idx]
            
            if idx < len(toc_items):
                sub_title, page = toc_items[idx]
            else:
                sub_title = f"{sec_prefix}-{idx+1} 演習問題"
                page = toc_items[-1][1] if toc_items else lesson["pdfPage"]
            
            title_ja = sub_title
            title_zh = sub_title
            
            title_zh_mapping = {
                "1-1-1 情報セキュリティとは": "1-1-1 什么是信息安全",
                "1-1-2 【事例1】マルウェア感染": "1-1-2 案例一：恶意软件感染与威胁",
                "1-1-3 【事例2】ランサムウェアとバックアップ": "1-1-3 案例二：勒索软件与网络隔离备份",
                "1-2-1 情報セキュリティの目的と考え方": "1-2-1 信息安全的根本目的与思考方式",
                "1-2-2 情報セキュリティの基本": "1-2-2 信息安全三要素 (CIA) 与衍生要素",
                "1-2-3 脅威の種類": "1-2-3 安全威胁的分类 (人为/物理/技术)",
                "1-2-4 マルウェア・不正プログラム": "1-2-4 常见病毒与恶意程序的行为机制",
                "1-2-5 不正と攻撃のメカニズム": "1-2-5 攻击成因：不正之三角与脆弱性分析",
                "1-2-6 演習問題": "1-2-6 课后本章历年真题演练",
                
                "2-1-1 パスワードに関する攻撃": "2-1-1 针对密码的典型破解攻击 (暴力/字典/列表)",
                "2-1-2 Webサイトに関する攻撃": "2-1-2 针对网站应用的攻击漏洞 (SQL注入/XSS/命令行注入)",
                "2-1-3 通信に関する攻撃": "2-1-3 针对网络通信的攻击方式 (窃听/DoS/DDoS/中间人)",
                "2-1-4 標的型攻撃・その他": "2-1-4 针对特定企业和人群的定向攻击与社会工程学",
                "2-1-5 演習問題": "2-1-5 课后本章历年真题演练",
                
                "2-2-1 暗号化技術": "2-2-1 加密技术详解 (对称加密 AES 与非对称加密 RSA)",
                "2-2-2 認証技術": "2-2-2 身份认证技术与数字签名 (改动检测与抗抵赖)",
                "2-2-3 利用者認証・生体認証": "2-2-3 多要素认证与生物识别技术 (指纹/虹膜/静脉)",
                "2-2-4 公開鍵基盤": "2-2-4 公钥基础设施 (PKI) 与数字证书机构 (CA)",
                "2-2-5 演習問題": "2-2-5 课后本章历年真题演练",
                
                "3-1-1 情報セキュリティ管理": "3-1-1 信息安全方针金字塔与规章制度",
                "3-1-2 情報セキュリティ諸規程": "3-1-2 各层级安全管理规定的核心要求",
                "3-1-3 情報セキュリティマネジメントシステム": "3-1-3 信息安全管理体系 (ISMS) 与 PDCA 循环改善",
                "3-1-4 情報セキュリティ継続": "3-1-4 灾难突发与信息安全业务连续性计划 (BCP)",
                "3-1-5 演習問題": "3-1-5 课后本章历年真题演练",
                
                "3-2-1 情報資産の調査・分類": "3-2-1 组织资产盘点、等级划分与价值评估",
                "3-2-2 リスクの種類": "3-2-2 风险值估算 (威胁度 × 脆弱性 × 资产价值)",
                "3-2-3 情報セキュリティリスクアセスメント": "3-2-3 信息安全风险评估的完整阶段 (识别/分析/评价)",
                "3-2-4 情報セキュリティリスク対応": "3-2-4 四大风险应对策略 (降低/规避/转移/保留)",
                "3-2-5 演習問題": "3-2-5 课后本章历年真题演练",
                
                "3-3-1 情報セキュリティ組織・機関": "3-3-1 安全事件应急协调机构与团队 (CSIRT/SOC/JPCERT)",
                "3-3-2 セキュリティ評価": "3-3-2 信息技术安全评估通用国际标准 (ISO 15408 CC)",
                "3-3-3 演習問題": "3-3-3 课后本章历年真题演练",
                
                "4-1-1 人的セキュリティ対策": "4-1-1 人的安全对策与防范社会工程学欺骗",
                "4-1-2 演習問題": "4-1-2 课后本章历年真题演练",
                
                "4-2-1 クラッキング・不正アクセス対策": "4-2-1 边界防御技术 (防火墙包过滤过滤机制与DMZ非武装区)",
                "4-2-2 マルウェア・不正プログラム対策": "4-2-2 恶意软件防范技术与沙箱隔离监测 (Sandbox)",
                "4-2-3 携帯端末・无线LANのセキュリティ対策": "4-2-3 移动终端与无线局域网安全加密协议 (WPA3)",
                "4-2-4 デジタルフォレンジックス・証拠保全対策": "4-2-4 计算机司法取证与事故数字取证保全机制 (Forensics)",
                "4-2-5 その他の技術的セキュリティ対策": "4-2-5 其它技术安全手段 (WAF应用防火墙与入侵防御)",
                "4-2-6 演習問題": "4-2-6 课后本章历年真题演练",
                
                "4-3-1 物理的セキュリティ対策": "4-3-1 机房入退室门禁管理与防尾随互锁安全门",
                "4-3-2 演習問題": "4-3-2 课后本章历年真题演练",
                
                "4-4-1 セキュアプロトコル": "4-4-1 安全传输协议详解 (SSL/TLS, HTTPS, SSH, IPsec)",
                "4-4-2 認証技術": "4-4-2 网络单点登录 (SSO) 与安全认证框架 (RADIUS)",
                "4-4-3 ネットワークセキュリティ": "4-4-3 虚拟专用网 (VPN) 隧道技术与无线加密标准",
                "4-4-4 データベースセキュリティ": "4-4-4 数据库安全审计、访问控制与权限脱敏",
                "4-4-5 アプリケーションセキュリティ": "4-4-5 网页应用防跨站攻击与恶意代码沙盒检测",
                "4-4-6 演習問題": "4-4-6 课后本章历年真题演练",
                
                "5-1-1 サイバーセキュリティ基本法": "5-1-1 日本网络安全基本法基本框架",
                "5-1-2 不正アクセス禁止法": "5-1-2 禁止非法访问法禁止行为与处罚机制",
                "5-1-3 個人情報保護法": "5-1-3 个人信息保护法中个人隐私安全合规准则",
                "5-1-4 刑法": "5-1-4 刑法中对于破坏计算机罪、制造病毒罪的惩处",
                "5-1-5 その他のセキュリティ関連法規・基準": "5-1-5 其它信息安全法规 (不正竞争防止法/特定电子邮件法)",
                "5-1-6 演習問題": "5-1-6 课后本章历年真题演练",
                
                "5-2-1 知的財産権": "5-2-1 知识产权分类保护 (专利权/著作权/商标权)",
                "5-2-2 労働関連・取引関連法規": "5-2-2 劳动合同、信息产品外包与劳务派遣合规制度",
                "5-2-3 その他の法律・ガイドライン・技術者倫理": "5-2-3 IT技术人员的职业道德、合规披露与反洗钱法",
                "5-2-4 标准化関連": "5-2-4 标准化组织与体系 (ISO, IEC, JIS, ANSI, IEEE)",
                "5-2-5 演習問題": "5-2-5 课后本章历年真题演练",
                
                "6-1-1 システム監査": "6-1-1 系统审计的目的、审计流程与第三方评估原则",
                "6-1-2 内部統制": "6-1-2 内部控制体系与信息系统审计合规保障",
                "6-1-3 演習問題": "6-1-3 课后本章历年真题演练",
                
                "6-2-1 サービスマネジメント": "6-2-1 IT 服务管理的金科玉律 (ITIL框架与SLA协议指标)",
                "6-2-2 サービスマネジメントシステムの計画及び運用": "6-2-2 服务规划实施流程、可用性指标与故障管理",
                "6-2-3 パフォーマンス評価及び改善": "6-2-3 IT 服务质量考核度量与持续性服务改善",
                "6-2-4 サービスの運用": "6-2-4 故障服务台设置与突发性事故应对机制",
                "6-2-5 ファシリティマネジメント": "6-2-5 机房物理设施灾防监控与设备备件维护",
                "6-2-6 演習問題": "6-2-6 课后本章历年真题演练",
                
                "6-3-1 プロジェクトマネジメント": "6-3-1 项目管理核心：PMBOK 九大知识领域概述",
                "6-3-2 プロジェクトの統合": "6-3-2 项目章程起草与整体集成管理",
                "6-3-3 プロジェクトのステークホルダ": "6-3-3 干系人识别与沟通期望平衡",
                "6-3-4 プロジェクトのスコープ": "6-3-4 项目范围管理与 WBS 工作分解结构构建",
                "6-3-5 プロジェクトの資源": "6-3-5 人力资源盘点与团队成员培训管理",
                "6-3-6 プロジェクトの時間": "6-3-6 关键路径法 (CPM) 算法与进度甘特图解析",
                "6-3-7 プロジェクトのコスト": "6-3-7 预算概算编制、挣值管理法与成本基准",
                "6-3-8 プロジェクトのリスク": "6-3-8 潜在风险排查、应急响应计划与风险分级",
                "6-3-9 プロジェクトの品質": "6-3-9 项目测试管理、质量控制与过程审计",
                "6-3-10 プロジェクトの調達": "6-3-10 供货商选拔、合同起草与外包服务质量监管",
                "6-3-11 プロジェクトのコミュニケーション": "6-3-11 沟通汇报频率规划与涉密信息保管机制",
                "6-3-12 演習問題": "6-3-12 课后本章历年真题演练",
                
                "7-1-1 システムの構成": "7-1-1 典型计算机构成与多CPU并行系统",
                "7-1-2 システムの評価指標": "7-1-2 系统的可靠性计算公式 (串联与并联 MTBF/MTTR)",
                "7-1-3 演習問題": "7-1-3 课后本章历年真题演练",
                
                "7-2-1 データベース方式": "7-2-1 数据库模式设计 (外模式/概念模式/内模式)",
                "7-2-2 データベース設計": "7-2-2 E-R 概念结构图绘制与关系映射",
                "7-2-3 数据操作": "7-2-3 关系数据库代数运算与 SQL 查询表达",
                "7-2-4 トランザクション処理": "7-2-5 事务四大特性 (ACID) 与并发冲突锁控制",
                "7-2-5 データベース応用": "7-2-5 数据仓库构建、分布式同步与数据挖掘",
                "7-2-6 演習問題": "7-2-6 课后本章历年真题演练",
                
                "7-3-1 ネットワーク方式": "7-3-1 计算机网络拓扑与硬件设备 (网卡/路由器/交换机)",
                "7-3-2 データ通信と制御": "7-3-2 数据链路传输控制 (滑动窗口协议与流量监测)",
                "7-3-3 通信プロトコル": "7-3-3 传输控制协议 TCP 与无连接传输用户数据包协议 UDP",
                "7-3-4 ネットワーク管理": "7-3-4 简单网络管理协议 SNMP 与诊断检测工具 ping",
                "7-3-5 ネットワーク応用": "7-3-5 互联网关键服务应用 (DNS域名系统, DHCP, FTP)",
                "7-3-6 演習問題": "7-3-6 课后本章历年真题演练",
                
                "8-1-1 経営・組織論": "8-1-1 现代企业管理结构与经营分析手法 (SWOT/3C)",
                "8-1-2 業務分析・データ利活用": "8-1-2 业务流程改进、多维数据可视分析与决策支持",
                "8-1-3 会計・財務": "8-1-3 资产负债表 B/S 与损益表 P/L 核心计算",
                "8-1-4 演習問題": "8-1-4 课后本章历年真题演练",
                
                "8-2-1 情報システム戦略": "8-2-1 信息系统策略规划、总体架构与关键绩效指标",
                "8-2-2 業務プロセス": "8-2-2 业务流程重构 (BPR) 与信息化系统的业务契合",
                "8-2-3 ソリューションビジネス": "8-2-3 企业云服务方案选型与系统部署实施模式",
                "8-2-4 システム活用促進・評価": "8-2-4 信息系统上线培训、利用效率反馈与最终验收评估",
                "8-2-5 演習問題": "8-2-5 课后本章历年真题演练",
                
                "8-3-1 システム化計画": "8-3-1 信息系统化初期规划与可行性评估编制",
                "8-3-2 要件定義": "8-3-2 功能需求、非功能需求设计与干系人确认",
                "8-3-3 調達計画・実施": "8-3-3 供应商招标书 (RFP) 拟定与服务意向合同签订",
                "8-3-4 演習問題": "8-3-4 课后本章历年真题演练"
            }
            
            assigned_vocab = []
            for v in lesson.get("vocabList", []):
                if v["ja"] in part_ja:
                    assigned_vocab.append(v)
            if idx == 0 and not assigned_vocab:
                assigned_vocab = lesson.get("vocabList", [])
                
            assigned_quiz = []
            if "演習問題" in title_ja or "演習" in title_ja:
                assigned_quiz = lesson.get("quizList", [])
            else:
                for q in lesson.get("quizList", []):
                    matched = False
                    for v in assigned_vocab:
                        if v["ja"] in q["question"] or v["zh"] in q["question"]:
                            assigned_quiz.append(q)
                            matched = True
                            break
            # 若子小节没有分配到专属测验，则默认包含该二级大节的全部测验
            if not assigned_quiz:
                assigned_quiz = lesson.get("quizList", [])
            
            new_lesson = {
                "id": global_id,
                "chapterId": lesson["chapterId"],
                "chapterName": lesson["chapterName"],
                "subSectionId": sec_prefix,
                "subSectionName": lesson["titleJa"],
                "section": lesson["section"],
                "titleJa": title_ja,
                "titleZh": title_zh_mapping.get(title_ja, title_ja.replace("演習問題", "课后历年真题演习")),
                "conceptJa": part_ja,
                "conceptZh": part_zh,
                "analogy": lesson["analogy"] if idx == 0 else "参考前文的生动比喻进行关联记忆。",
                "example": lesson["example"],
                "quizList": assigned_quiz,
                "vocabList": assigned_vocab if assigned_vocab else lesson.get("vocabList", []),
                "pdfPage": page,
                "pdfHighlightTerm": title_ja
            }
            
            upgraded.append(new_lesson)
            global_id += 1
            
    print(f"SG lessons upgraded successfully. Total new lessons: {len(upgraded)}")
    return upgraded

# =========================================================================
# IT Passport 升级重构逻辑
# =========================================================================
def upgrade_itpass(original_lessons):
    print("Upgrading IT Passport lessons...")
    upgraded = []
    global_id = 1
    
    pages_map = {}
    for i, lesson in enumerate(original_lessons):
        curr_page = lesson.get("pdfPage", 17)
        if i + 1 < len(original_lessons):
            next_page = original_lessons[i+1].get("pdfPage", curr_page + 4)
            pages_map[lesson["id"]] = max(1, next_page - curr_page)
        else:
            pages_map[lesson["id"]] = 4
            
    for lesson in original_lessons:
        orig_id = lesson["id"]
        sec_prefix = lesson["titleJa"].split(" ")[0]
        
        ja_concepts = lesson["conceptJa"]
        zh_concepts = lesson["conceptZh"]
        
        titles_ja = re.findall(r'\n\n\*\*(.*?)\*\*', ja_concepts)
        titles_zh = re.findall(r'\n\n\*\*(.*?)\*\*', zh_concepts)
        
        titles_ja = [t for t in titles_ja if len(t) > 3]
        titles_zh = [t for t in titles_zh if len(t) > 3]
        
        split_ja = [f"**{t}**" for t in titles_ja]
        split_zh = [f"**{t}**" for t in titles_zh]
        
        parts_ja = split_concept_by_rules(ja_concepts, split_ja)
        parts_zh = split_concept_by_rules(zh_concepts, split_zh)
        
        if len(parts_ja) != len(parts_zh):
            parts_ja = [ja_concepts]
            parts_zh = [zh_concepts]
            titles_ja = []
            titles_zh = []
            
        sub_count = len(parts_ja)
        total_pages = pages_map.get(orig_id, 4)
        start_page = lesson.get("pdfPage", 17)
        
        for idx in range(sub_count):
            part_ja = parts_ja[idx]
            part_zh = parts_zh[idx]
            
            if idx == 0:
                name_ja = lesson["titleJa"]
                name_zh = lesson["titleZh"]
            else:
                # 重新修正加粗的标题符号
                clean_name_ja = titles_ja[idx-1].replace("：", "").replace(":", "").strip()
                clean_name_zh = titles_zh[idx-1].replace("：", "").replace(":", "").replace("（", "(").replace("）", ")").strip()
                name_ja = f"{sec_prefix}-{idx} {clean_name_ja}"
                name_zh = f"{sec_prefix}-{idx} {clean_name_zh}"
                
            page_offset = int((idx / sub_count) * total_pages)
            page = start_page + page_offset
            
            assigned_vocab = []
            for v in lesson.get("vocabList", []):
                if v["ja"] in part_ja:
                    assigned_vocab.append(v)
            if idx == 0 and not assigned_vocab:
                assigned_vocab = lesson.get("vocabList", [])
                
            assigned_quiz = []
            if idx == sub_count - 1:
                assigned_quiz = lesson.get("quizList", [])
            else:
                for q in lesson.get("quizList", []):
                    matched = False
                    for v in assigned_vocab:
                        if v["ja"] in q["question"] or v["zh"] in q["question"]:
                            assigned_quiz.append(q)
                            matched = True
                            break
            
            new_lesson = {
                "id": global_id,
                "chapterId": lesson["chapterId"],
                "chapterName": lesson["chapterName"],
                "subSectionId": sec_prefix,
                "subSectionName": lesson["titleJa"],
                "section": lesson["section"],
                "titleJa": name_ja,
                "titleZh": name_zh,
                "conceptJa": part_ja,
                "conceptZh": part_zh,
                "analogy": lesson["analogy"] if idx == 0 else "参考前文的生动比喻进行关联记忆。",
                "example": lesson["example"],
                "quizList": assigned_quiz if assigned_quiz else lesson.get("quizList", []),
                "vocabList": assigned_vocab if assigned_vocab else lesson.get("vocabList", []),
                "pdfPage": page,
                "pdfHighlightTerm": name_ja
            }
            
            upgraded.append(new_lesson)
            global_id += 1
            
    print(f"IT Passport lessons upgraded successfully. Total new lessons: {len(upgraded)}")
    return upgraded

# =========================================================================
# 主函数
# =========================================================================
def main():
    # 优先从备份目录还原原始干净的数据
    backup_dir = "../sql-learning-hub-backup-20260604_042017"
    if os.path.exists(backup_dir):
        print(f"Restoring clean lessons data from backup directory: {backup_dir}")
        shutil.copy2(os.path.join(backup_dir, "sg_lessons.js"), "sg_lessons.js")
        shutil.copy2(os.path.join(backup_dir, "it_passport_lessons.js"), "it_passport_lessons.js")
    else:
        print("Warning: Backup directory not found, running directly on workspace files.")

    # 升级 SG
    try:
        sg_orig = load_js_array("sg_lessons.js", "SG_LESSONS")
        sg_new = upgrade_sg(sg_orig)
        save_js_array("sg_lessons.js", "SG_LESSONS", sg_new)
    except Exception as e:
        print(f"Failed to upgrade SG lessons: {e}")
        import traceback
        traceback.print_exc()
        
    # 升级 IT Passport
    try:
        itpass_orig = load_js_array("it_passport_lessons.js", "IT_PASSPORT_LESSONS")
        itpass_new = upgrade_itpass(itpass_orig)
        save_js_array("it_passport_lessons.js", "IT_PASSPORT_LESSONS", itpass_new)
    except Exception as e:
        print(f"Failed to upgrade IT Passport lessons: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
