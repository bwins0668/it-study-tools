// Study Tools language switcher and AI-backed translation runtime.
(function () {
  "use strict";

  const DEFAULT_LANG = "default-ja-zh";
  const STORAGE_KEY = "study-tools-language";
  const CACHE_STORAGE_KEY = "study-tools-i18n-cache-v4";
  const SKIP_SELECTOR = [
    "[data-i18n-skip]",
    "[data-i18n-managed]",
    "[data-i18n]",
    "[data-i18n-placeholder]",
    "[data-i18n-title]",
    "[data-i18n-aria-label]",
    "script",
    "style",
    "noscript",
    "pre",
    "code",
    "textarea",
    "input",
    "select",
    "option",
    "canvas",
    "svg",
    ".java-output-content",
    ".python-output-content",
    ".result-table",
    ".data-table",
    ".sql-result-table",
    ".CodeMirror",
    ".quiz-section",
    ".coding-exam-panel",
    ".eq-body-area",
    ".typing-workspace",
    "[data-content-type=\"lesson\"]",
    "[data-content-type=\"exam-question\"]",
    "[data-content-type=\"explanation\"]"
  ].join(",");

  const LANGUAGES = [
    { code: DEFAULT_LANG, label: "默认中日双语", native: "既定: 日本語 / 中文", dir: "ltr" },
    { code: "ja", label: "Japanese", native: "日本語", dir: "ltr" },
    { code: "zh", label: "Chinese (Simplified)", native: "中文 (简体)", dir: "ltr" },
    { code: "en", label: "English", native: "English", dir: "ltr" },
    { code: "my", label: "Burmese", native: "မြန်မာဘာသာ", dir: "ltr" },
    { code: "th", label: "Thai", native: "ไทย", dir: "ltr" },
    { code: "ko", label: "Korean", native: "한국어", dir: "ltr" },
    { code: "vi", label: "Vietnamese", native: "Tiếng Việt", dir: "ltr" },
    { code: "id", label: "Indonesian", native: "Bahasa Indonesia", dir: "ltr" },
    { code: "ms", label: "Malay", native: "Bahasa Melayu", dir: "ltr" },
    { code: "tl", label: "Filipino", native: "Filipino", dir: "ltr" },
    { code: "hi", label: "Hindi", native: "हिन्दी", dir: "ltr" },
    { code: "bn", label: "Bengali", native: "বাংলা", dir: "ltr" },
    { code: "ur", label: "Urdu", native: "اردو", dir: "rtl" },
    { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
    { code: "fa", label: "Persian", native: "فارسی", dir: "rtl" },
    { code: "he", label: "Hebrew", native: "עברית", dir: "rtl" },
    { code: "tr", label: "Turkish", native: "Türkçe", dir: "ltr" },
    { code: "fr", label: "French", native: "Français", dir: "ltr" },
    { code: "de", label: "German", native: "Deutsch", dir: "ltr" },
    { code: "es", label: "Spanish", native: "Español", dir: "ltr" },
    { code: "pt", label: "Portuguese", native: "Português", dir: "ltr" },
    { code: "it", label: "Italian", native: "Italiano", dir: "ltr" },
    { code: "ru", label: "Russian", native: "Русский", dir: "ltr" },
    { code: "uk", label: "Ukrainian", native: "Українська", dir: "ltr" },
    { code: "pl", label: "Polish", native: "Polski", dir: "ltr" },
    { code: "nl", label: "Dutch", native: "Nederlands", dir: "ltr" },
    { code: "sv", label: "Swedish", native: "Svenska", dir: "ltr" },
    { code: "da", label: "Danish", native: "Dansk", dir: "ltr" },
    { code: "fi", label: "Finnish", native: "Suomi", dir: "ltr" },
    { code: "no", label: "Norwegian", native: "Norsk", dir: "ltr" },
    { code: "el", label: "Greek", native: "Ελληνικά", dir: "ltr" },
    { code: "ro", label: "Romanian", native: "Română", dir: "ltr" },
    { code: "hu", label: "Hungarian", native: "Magyar", dir: "ltr" },
    { code: "cs", label: "Czech", native: "Čeština", dir: "ltr" },
    { code: "sk", label: "Slovak", native: "Slovenčina", dir: "ltr" },
    { code: "bg", label: "Bulgarian", native: "Български", dir: "ltr" },
    { code: "sr", label: "Serbian", native: "Српски", dir: "ltr" },
    { code: "hr", label: "Croatian", native: "Hrvatski", dir: "ltr" },
    { code: "sl", label: "Slovenian", native: "Slovenščina", dir: "ltr" },
    { code: "sw", label: "Swahili", native: "Kiswahili", dir: "ltr" },
    { code: "am", label: "Amharic", native: "አማርኛ", dir: "ltr" },
    { code: "zu", label: "Zulu", native: "isiZulu", dir: "ltr" },
    { code: "af", label: "Afrikaans", native: "Afrikaans", dir: "ltr" },
    { code: "ne", label: "Nepali", native: "नेपाली", dir: "ltr" },
    { code: "si", label: "Sinhala", native: "සිංහල", dir: "ltr" },
    { code: "ta", label: "Tamil", native: "தமிழ்", dir: "ltr" },
    { code: "te", label: "Telugu", native: "తెలుగు", dir: "ltr" },
    { code: "kn", label: "Kannada", native: "ಕನ್ನಡ", dir: "ltr" },
    { code: "ml", label: "Malayalam", native: "മലയാളം", dir: "ltr" },
    { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ", dir: "ltr" },
    { code: "gu", label: "Gujarati", native: "ગુજરાતી", dir: "ltr" },
    { code: "mr", label: "Marathi", native: "मराठी", dir: "ltr" },
    { code: "km", label: "Khmer", native: "ខ្មែរ", dir: "ltr" },
    { code: "lo", label: "Lao", native: "ລາວ", dir: "ltr" },
    { code: "mn", label: "Mongolian", native: "Монгол", dir: "ltr" },
    { code: "ka", label: "Georgian", native: "ქართული", dir: "ltr" },
    { code: "hy", label: "Armenian", native: "Հայերեն", dir: "ltr" },
    { code: "az", label: "Azerbaijani", native: "Azərbaycan", dir: "ltr" },
    { code: "kk", label: "Kazakh", native: "Қазақ", dir: "ltr" },
    { code: "uz", label: "Uzbek", native: "Oʻzbek", dir: "ltr" },
    { code: "ky", label: "Kyrgyz", native: "Кыргызча", dir: "ltr" },
    { code: "la", label: "Latin", native: "Latina", dir: "ltr" },
    { code: "eo", label: "Esperanto", native: "Esperanto", dir: "ltr" },
  ];

  const languageByCode = new Map(LANGUAGES.map((lang) => [lang.code, lang]));
  const textOriginals = new WeakMap();
  const textApplied = new WeakMap();
  const textAppliedLang = new WeakMap();
  const attrOriginals = new WeakMap();
  const attrApplied = new WeakMap();
  const attrAppliedLang = new WeakMap();
  const translationCache = new Map();
  const STATIC_UI_TRANSLATIONS = {
    ko: {
      "SQL 学习": "SQL 학습",
      "SQL / MySQL 学习": "SQL / MySQL 학습",
      "Java 学習": "Java 학습",
      "Python 学习": "Python 학습",
      "ITパスポート 备考": "IT 패스포트 대비",
      "SG 备考": "SG 대비",
      "日本語タイピング": "일본어 타자",
      "综合随机挑战": "랜덤 도전",
      "语言": "언어",
      "重置进度": "초기화",
      "教材书与演练沙盒 (テキスト・演習)": "교재와 연습 샌드박스",
      "教科书与演练沙盒 (テキスト・演習)": "교재 연습",
      "教科书章节学习 (テキスト学習)": "교재 학습",
      "实操模拟考试 (実技模擬試験)": "실전 모의시험",
      "进捗状況 (学习进度)": "진행 상황",
      "単元リスト (课程目录)": "단원 목록",
      "数据库的基础": "데이터베이스 기초",
      "关系型数据库与SQL入门": "관계형 데이터베이스와 SQL 입문",
      "数据检索核心 (SELECT)": "데이터 검색 핵심",
      "SQL 函数与高级数据变换": "SQL 함수와 고급 데이터 변환",
      "关联查询与子查询": "조인 조회와 서브쿼리",
      "数据修改与表管理": "데이터 수정과 테이블 관리",
      "データベース構造(DB 表结构参考)": "데이터베이스 구조",
      "データベース構造 (DB 表结构参考)": "데이터베ース 구조",
      "データベース構造(DB 表结构参考)": "데이터베이스 구조",
      "データベース構造 (DB 表结构参考)": "데이터베이스 구조",
      "学校DB": "학교 DB",
      "书店DB": "서점 DB",
      "SQL プレイグラウンド (演练沙盒)": "SQL 플레이그라운드",
      "ヒント (提示)": "힌트",
      "DBリセット (重置DB)": "DB 초기화",
      "ミッション(当前任务)": "미션",
      "ミッション (当前任务)": "미션",
      "随机指令练习": "랜덤 지시 연습",
      "実行結果 (执行结果)": "실행 결과",
      "最大化": "최대화",
      "查询学生主表 (students_mst) 的所有列和所有行的数据。": "학생 마스터(students_mst)의 모든 열과 모든 행을 조회하세요.",
      "请在此处输入 SQL 语句 ...": "여기에 SQL 문을 입력하세요...",
      "ここにSQLを入力してください ...": "여기에 SQL을 입력하세요..."
    },
    en: {
      "SQL 学习": "SQL Learning",
      "SQL / MySQL 学习": "SQL / MySQL Learning",
      "Java 学習": "Java Learning",
      "Python 学习": "Python Learning",
      "ITパスポート 备考": "IT Passport Prep",
      "SG 备考": "SG Prep",
      "日本語タイピング": "Japanese Typing",
      "综合随机挑战": "Random Challenge",
      "语言": "Language",
      "重置进度": "Reset",
      "教材书与演练沙盒 (テキスト・演習)": "Textbook and Practice Sandbox",
      "教科书与演练沙盒 (テキスト・演習)": "Textbook Practice",
      "教科书章节学习 (テキスト学習)": "Textbook Learning",
      "实操模拟考试 (実技模擬試験)": "Practical Mock Exam",
      "进捗状況 (学习进度)": "Progress",
      "単元リスト (课程目录)": "Unit List",
      "数据库的基础": "Database Basics",
      "データベース構造(DB 表结构参考)": "Database Structure",
      "データベース構造 (DB 表结构参考)": "Database Structure",
      "学校DB": "School DB",
      "书店DB": "Bookstore DB",
      "SQL プレイグラウンド (演练沙盒)": "SQL Playground",
      "ヒント (提示)": "Hint",
      "DBリセット (重置DB)": "Reset DB",
      "ミッション(当前任务)": "Mission",
      "ミッション (当前任务)": "Mission",
      "随机指令练习": "Random Practice",
      "実行結果 (执行结果)": "Results",
      "最大化": "Maximize"
    }
  };
  const STATIC_JA_FALLBACKS = {
    "SQL 学习": "SQL 学習",
    "SQL / MySQL 学习": "SQL / MySQL 学習",
    "Java 学習": "Java 学習",
    "Python 学习": "Python 学習",
    "ITパスポート 备考": "ITパスポート 備考",
    "SG 备考": "SG 備考",
    "综合随机挑战": "総合ランダム挑戦",
    "语言": "言語",
    "重置进度": "進度をリセット",
    "教材书与演练沙盒 (テキスト・演習)": "テキスト・演習",
    "教科书与演练沙盒 (テキスト・演習)": "テキスト・演習",
    "教科书章节学习 (テキスト学習)": "テキスト学習",
    "实操模拟考试 (実技模擬試験)": "実技模擬試験",
    "进捗状況 (学习进度)": "進捗状況",
    "単元リスト (课程目录)": "単元リスト",
    "关系型数据库与SQL入门": "関係型データベースとSQL入門",
    "数据检索核心 (SELECT)": "データ検索核心 (SELECT)",
    "SQL 函数与高级数据变换": "SQL関数と高度なデータ変換",
    "关联查询与子查询": "結合問合せとサブクエリ",
    "数据修改与表管理": "データ変更と表管理",
    "数据库的基础": "データベースの基礎",
    "データベース構造(DB 表结构参考)": "データベース構造",
    "データベース構造 (DB 表结构参考)": "データベース構造",
    "学校DB": "学校DB",
    "书店DB": "書店DB",
    "SQL プレイグラウンド (演练沙盒)": "SQLプレイグラウンド",
    "ヒント (提示)": "ヒント",
    "DBリセット (重置DB)": "DBリセット",
    "ミッション(当前任务)": "ミッション",
    "ミッション (当前任务)": "ミッション",
    "随机指令练习": "ランダム指令練習",
    "実行結果 (执行结果)": "実行結果",
    "最大化": "最大化",
    "查询学生主表 (students_mst) 的所有列和所有行的数据。": "学生マスタ(students_mst)のすべての列と行を取得してください。",
    "请在此处输入 SQL 语句 ...": "ここにSQL文を入力してください...",
    "ここにSQLを入力してください ...": "ここにSQLを入力してください..."
  };

  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  if (!languageByCode.has(currentLang)) currentLang = DEFAULT_LANG;
  let observer = null;
  let scanTimer = null;
  let translating = false;
  let dirty = false;
  let translationRunId = 0;
  let toastCooldown = 0;

  function normalizeText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function loadPersistentCache() {
    try {
      const raw = localStorage.getItem(CACHE_STORAGE_KEY);
      if (!raw) return;
      const entries = JSON.parse(raw);
      if (!Array.isArray(entries)) return;
      entries.forEach(([key, value]) => {
        if (typeof key === "string" && typeof value === "string") {
          translationCache.set(key, value);
        }
      });
    } catch (error) {
      console.warn("[I18n] Failed to load translation cache", error);
    }
  }

  function persistCacheSoon() {
    window.clearTimeout(persistCacheSoon.timer);
    persistCacheSoon.timer = window.setTimeout(() => {
      try {
        const entries = [...translationCache.entries()].slice(-5000);
        localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(entries));
      } catch (error) {
        console.warn("[I18n] Failed to persist translation cache", error);
      }
    }, 250);
  }

  function staticTranslation(text, language = currentLang) {
    const table = STATIC_UI_TRANSLATIONS[language];
    if (!table) return "";
    const compact = normalizeText(text);
    return table[compact] || table[String(text || "").trim()] || "";
  }

  function staticJapaneseFallback(text) {
    const compact = normalizeText(text);
    if (STATIC_JA_FALLBACKS[compact]) return STATIC_JA_FALLBACKS[compact];
    const parenJa = compact.match(/[（(]([^()（）]*[\u3040-\u30ff\u31f0-\u31ff][^()（）]*)[）)]/);
    if (parenJa) return parenJa[1].trim();
    const slashParts = compact.split(/\s*[/／]\s*/).filter(Boolean);
    const jaPart = slashParts.find((part) => /[\u3040-\u30ff\u31f0-\u31ff]/.test(part));
    if (jaPart) return jaPart.trim();
    if (/[\u3040-\u30ff\u31f0-\u31ff]/.test(compact)) {
      return compact
        .replace(/\s*[（(][^()（）]*[\u3400-\u9fff][^()（）]*[）)]\s*$/g, "")
        .trim();
    }
    return "";
  }

  function translationSource(text, explicitSourceLang = "") {
    const source = normalizeText(text);
    const japanese = staticJapaneseFallback(source);
    if (japanese) return { text: japanese, sourceLang: "ja" };
    if (explicitSourceLang) return { text: source, sourceLang: explicitSourceLang };
    if (/[\u3400-\u9fff]/.test(source)) return { text: source, sourceLang: "zh-CN" };
    return { text: source, sourceLang: "auto" };
  }

  const COMPACT_PAIR_SELECTOR = [
    ".app-header",
    ".header-logo",
    ".subject-tab",
    ".sub-header-tab",
    ".sidebar-title",
    ".sidebar-chapter-header",
    ".lesson-nav-item",
    ".chapter-progress-badge",
    ".lesson-badge",
    ".lang-tabs",
    ".lang-tab",
    ".schema-header",
    ".console-header",
    ".output-header",
    ".schema-tab",
    ".db-group-tab",
    ".console-btn",
    ".maximize-btn",
    ".reset-all-btn",
    ".header-challenge-btn-start",
    ".language-toggle-btn",
    ".language-option",
    ".settings-btn",
    ".theme-toggle-btn",
    ".ai-settings-btn",
    ".quiz-submit-btn",
    ".cbt-btn-action",
  ].join(",");

  const STACKED_PAIR_SELECTOR = [
    ".playground-task-desc",
    ".analogy-card .card-content",
    ".quiz-question",
    ".quiz-feedback",
    ".ai-message",
    ".review-kaisetsu-text",
  ].join(",");

  function closestElement(el, selector) {
    return el && el.nodeType === 1 && typeof el.closest === "function" ? el.closest(selector) : null;
  }

  function isCompactPairContext(el) {
    return Boolean(closestElement(el, COMPACT_PAIR_SELECTOR));
  }

  function isStackedPairContext(el, translated, jaText) {
    if (closestElement(el, STACKED_PAIR_SELECTOR)) return true;
    return normalizeText(translated).length + normalizeText(jaText).length > 42;
  }

  function compactVisibleText(text) {
    const compact = normalizeText(text);
    return compact.replace(/\s*[（(][^()（）]{2,90}[）)]\s*$/g, "").trim() || compact;
  }

  function setCompactPairHint(el, translated, jaText) {
    const host = closestElement(el, "button,[role='button'],.lesson-nav-item,.sidebar-chapter-header,.schema-header,.console-header,.output-header,.header-logo") || el;
    if (!host || !jaText || jaText === translated) return;
    const pair = `${translated} / ${jaText}`;
    host.setAttribute("data-i18n-compact-pair", pair);
    if (!host.getAttribute("title") || host.getAttribute("data-i18n-title-managed") === "true") {
      host.setAttribute("title", pair);
      host.setAttribute("data-i18n-title-managed", "true");
    }
  }

  function getCachedTranslation(item) {
    const fixed = staticTranslation(item.text, item.targetLang || currentLang);
    if (fixed) return fixed;
    const key = cacheKey(item);
    return translationCache.get(key) || "";
  }

  function rememberTranslation(item, translatedText) {
    const clean = String(translatedText || "").trim();
    if (!clean) return;
    translationCache.set(cacheKey(item), clean);
    persistCacheSoon();
  }

  loadPersistentCache();

  function langInfo(code = currentLang) {
    return languageByCode.get(code) || languageByCode.get(DEFAULT_LANG);
  }

  function isActive() {
    return currentLang !== DEFAULT_LANG;
  }

  function shouldTranslateText(text) {
    const compact = String(text || "").replace(/\s+/g, " ").trim();
    if (compact.length < 2 || compact.length > 1200) return false;
    if (/^[\d\s.,:;()[\]{}+\-*/=<>_%#|\\'"`~!?，。！？、·•…-]+$/.test(compact)) return false;
    if (/^(https?:|\/|\.\/|[A-Z]:\\)/i.test(compact)) return false;
    return /[\p{Letter}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(compact);
  }

  function shouldSkip(el) {
    return !el || el.closest(SKIP_SELECTOR);
  }

  function isVisible(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.hidden || el.getAttribute("aria-hidden") === "true") return false;
    const style = window.getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden";
  }

  function translationPriority(el, attribute = false) {
    if (!el) return 20;
    const rect = el.getBoundingClientRect();
    const onScreen = rect.width > 0
      && rect.height > 0
      && rect.bottom >= 0
      && rect.right >= 0
      && rect.top <= window.innerHeight
      && rect.left <= window.innerWidth;
    if (onScreen) return attribute ? -2 : 0;
    return attribute ? 8 : 10;
  }

  function getAiConfig() {
    return {
      provider: localStorage.getItem("study-ai-provider") || "gemini",
      model: localStorage.getItem("study-ai-model") || "",
      ollamaUrl: localStorage.getItem("study-ai-ollama-url") || "http://127.0.0.1:11434",
      apiKey: sessionStorage.getItem("study-ai-api-key") || "",
    };
  }

  function friendlyI18nError(error) {
    const code = error && error.code;
    const message = String((error && error.message) || "");
    if (
      ["API_KEY_MISSING", "AUTH_FAILED", "INVALID_PROVIDER", "MODEL_NOT_FOUND"].includes(code) ||
      /invalid authentication|OAuth|credential|API Key|api key|auth/i.test(message)
    ) {
      return "自动翻译暂不可用，已恢复默认中日显示。";
    }
    return "自动翻译暂不可用，已恢复默认中日显示。";
  }

  function showI18nError(error) {
    console.warn("[I18n] Translation failed (silent fallback applied):", error);
  }

  function resetToDefaultAfterTranslationFailure(error) {
    currentLang = DEFAULT_LANG;
    localStorage.setItem(STORAGE_KEY, DEFAULT_LANG);
    updateDocumentState();
    updateButton();
    updateCourseLabels();
  }

  function splitChunks(items, size) {
    const chunks = [];
    for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
    return chunks;
  }

  function cacheKey(item) {
    return [item.targetLang || currentLang, item.sourceLang || "auto", item.format || "text", item.text].join("\u0001");
  }

  async function translateBatch(items, onProgress) {
    if (!isActive() || !items || !items.length) return {};
    const requestTargetLang = items[0]?.targetLang || currentLang;
    const requestTargetInfo = langInfo(requestTargetLang);
    const requestTargetLabel = requestTargetLang === "ja" ? "Japanese" : requestTargetInfo.label;
    const output = {};
    const missing = [];
    items.forEach((item) => {
      const cached = getCachedTranslation(item);
      if (cached) {
        output[item.id] = cached;
      } else {
        missing.push(item);
      }
    });
    if (!missing.length) return output;

    const config = getAiConfig();
    for (const chunk of splitChunks(missing, 80)) {
      const response = await fetch("/api/i18n/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetLang: requestTargetLang,
          targetLabel: requestTargetLabel,
          items: chunk,
          ...config,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.success) {
        const err = payload.error && (payload.error.message || payload.error.code);
        const failure = new Error(err || `HTTP ${response.status}`);
        failure.code = payload.error && payload.error.code;
        throw failure;
      }
      (payload.data.items || []).forEach((item) => {
        const source = chunk.find((candidate) => candidate.id === item.id);
        if (!source) return;
        rememberTranslation(source, item.text);
        output[item.id] = item.text;
      });
      if (typeof onProgress === "function") {
        const partial = {};
        (payload.data.items || []).forEach((item) => {
          partial[item.id] = item.text;
        });
        onProgress(partial);
      }
    }
    return output;
  }

  function renderPendingText(original, contextEl) {
    const source = String(original || "");
    const cleanOriginal = normalizeText(source);
    const jaText = staticJapaneseFallback(cleanOriginal);
    const leading = source.match(/^\s*/)?.[0] || "";
    const trailing = source.match(/\s*$/)?.[0] || "";
    if (jaText && jaText !== cleanOriginal) {
      return `${leading}${jaText}${trailing}`;
    }
    if (/[\u3040-\u30ff\u31f0-\u31ff]/.test(cleanOriginal)) {
      return `${leading}${compactVisibleText(cleanOriginal)}${trailing}`;
    }
    if (/[\u3400-\u9fff]/.test(cleanOriginal)) {
      return `${leading}${isCompactPairContext(contextEl) ? "…" : "翻訳中…"}${trailing}`;
    }
    return source;
  }

  function renderPendingAttribute(original, attr) {
    const source = String(original || "");
    const cleanOriginal = normalizeText(source);
    const jaText = staticJapaneseFallback(cleanOriginal);
    if (jaText && jaText !== cleanOriginal) return jaText;
    if (/[\u3040-\u30ff\u31f0-\u31ff]/.test(cleanOriginal)) return source;
    if (/[\u3400-\u9fff]/.test(cleanOriginal)) {
      return attr === "placeholder" ? "入力…" : "翻訳中…";
    }
    return source;
  }

  function renderTargetText(original, translated, contextEl, options = {}) {
    const source = String(original || "");
    const cleanOriginal = source.replace(/\s+/g, " ").trim();
    const cleanTranslated = String(translated || "").replace(/\s+/g, " ").trim();
    if (!cleanTranslated || cleanTranslated === cleanOriginal) return source || cleanOriginal;
    const jaText = normalizeText(options.jaText || staticJapaneseFallback(cleanOriginal));
    const leading = source.match(/^\s*/)?.[0] || "";
    const trailing = source.match(/\s*$/)?.[0] || "";
    if (!jaText || jaText === cleanTranslated) return `${leading}${cleanTranslated}${trailing}`;
    if (options.attr === "placeholder") return `${leading}${cleanTranslated}${trailing}`;
    if (options.attr === "title" || options.attr === "aria-label") {
      return `${leading}${cleanTranslated} / ${jaText}${trailing}`;
    }
    if (isCompactPairContext(contextEl)) {
      const visibleText = compactVisibleText(cleanTranslated);
      setCompactPairHint(contextEl, visibleText, jaText);
      return `${leading}${visibleText}${trailing}`;
    }
    if (isStackedPairContext(contextEl, cleanTranslated, jaText)) {
      return `${leading}${cleanTranslated}\n${jaText}${trailing}`;
    }
    return `${leading}${cleanTranslated}（${jaText}）${trailing}`;
  }

  function sanitizeHtml(html) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = String(html || "");
    wrapper.querySelectorAll("script,style,iframe,object,embed").forEach((node) => node.remove());
    wrapper.querySelectorAll("*").forEach((node) => {
      [...node.attributes].forEach((attr) => {
        if (/^on/i.test(attr.name) || /javascript:/i.test(attr.value)) {
          node.removeAttribute(attr.name);
        }
      });
    });
    return wrapper.innerHTML;
  }

  function renderOriginalConcept(text) {
    const source = String(text || "");
    if (/<[a-z][\s\S]*>/i.test(source)) return source;
    if (typeof window.formatMarkdown === "function") return window.formatMarkdown(source);
    return source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>");
  }

  function markManaged() {
    [
      "lesson-title-ja",
      "lesson-title-zh",
      "concept-container",
      "concept-ja-body",
      "concept-zh-body",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute("data-i18n-managed", "lesson");
    });
  }

  function applyLessonTargetLayout(active) {
    const tabs = document.querySelector(".lang-tabs");
    const container = document.getElementById("concept-container");
    const jaCol = document.querySelector(".ja-col");
    const targetCol = document.querySelector(".zh-col");
    const titleTargetEl = document.getElementById("lesson-title-zh");

    if (tabs) tabs.style.display = active ? "none" : "";
    if (titleTargetEl) titleTargetEl.style.display = "";

    if (active) {
      if (container) container.style.flexDirection = "column";
      if (jaCol) {
        jaCol.style.display = "flex";
        jaCol.style.order = "2";
      }
      if (targetCol) {
        targetCol.style.display = "flex";
        targetCol.style.order = "1";
      }
      return;
    }

    if (jaCol) jaCol.style.order = "";
    if (targetCol) targetCol.style.order = "";

    const selected = document.querySelector(".lang-tab.active")?.dataset.lang || "both";
    if (selected === "both") {
      if (container) container.style.flexDirection = "row";
      if (jaCol) jaCol.style.display = "flex";
      if (targetCol) targetCol.style.display = "flex";
    } else if (selected === "ja") {
      if (jaCol) jaCol.style.display = "flex";
      if (targetCol) targetCol.style.display = "none";
    } else {
      if (jaCol) jaCol.style.display = "none";
      if (targetCol) targetCol.style.display = "flex";
    }
  }

  function updateCourseLabels() {
    const info = langInfo();
    const tabs = document.querySelectorAll(".lang-tab");
    tabs.forEach((tab) => {
      if (!tab.dataset.i18nDefaultHtml) tab.dataset.i18nDefaultHtml = tab.innerHTML;
    });

    const jaHead = document.querySelector(".ja-col h4");
    const targetHead = document.querySelector(".zh-col h4");
    if (!isActive()) {
      tabs.forEach((tab) => {
        if (tab.dataset.i18nDefaultHtml) tab.innerHTML = tab.dataset.i18nDefaultHtml;
      });
      if (jaHead) jaHead.innerHTML = '<i class="fa-solid fa-graduation-cap"></i> 解説 (日本語)';
      if (targetHead) targetHead.innerHTML = '<i class="fa-solid fa-language"></i> 讲解 (中文)';
      return;
    }

    const both = document.querySelector('.lang-tab[data-lang="both"]');
    const ja = document.querySelector('.lang-tab[data-lang="ja"]');
    const target = document.querySelector('.lang-tab[data-lang="zh"]');
    if (both) both.innerHTML = `<i class="fa-solid fa-columns"></i> ${info.native} / 日本語`;
    if (ja) ja.textContent = "日本語のみ";
    if (target) target.textContent = info.native;
    if (jaHead) jaHead.innerHTML = '<i class="fa-solid fa-graduation-cap"></i> 解説 (日本語)';
    if (targetHead) targetHead.innerHTML = `<i class="fa-solid fa-language"></i> Explanation (${info.native})`;
  }

  function getActiveSubject() {
    if (document.getElementById("subject-tab-sql")?.classList.contains("active")) return "sql";
    if (document.getElementById("subject-tab-itpass")?.classList.contains("active")) return "itpass";
    if (document.getElementById("subject-tab-java")?.classList.contains("active")) return "java";
    if (document.getElementById("subject-tab-sg")?.classList.contains("active")) return "sg";
    if (document.getElementById("subject-tab-python")?.classList.contains("active")) return "python";
    return null;
  }

  async function applyLessonTranslation(lesson) {
    if (!lesson) return;
    markManaged();
    updateCourseLabels();

    const titleJaEl = document.getElementById("lesson-title-ja");
    const titleTargetEl = document.getElementById("lesson-title-zh");
    const conceptJaEl = document.getElementById("concept-ja-body");
    const conceptTargetEl = document.getElementById("concept-zh-body");
    if (!titleJaEl || !titleTargetEl || !conceptJaEl || !conceptTargetEl) return;

    const normLang = normalizeLanguageCode(currentLang);

    // 1. If baseline language (ja, zh, default-ja-zh), directly render and return
    if (normLang === "ja-JP" || normLang === "zh-CN" || normLang === "default-ja-zh") {
      applyLessonTargetLayout(normLang !== "default-ja-zh");
      if (normLang === "ja-JP") {
        titleTargetEl.textContent = lesson.titleJa || "";
        conceptTargetEl.innerHTML = renderOriginalConcept(lesson.conceptJa || "");
      } else {
        titleTargetEl.textContent = lesson.titleZh || "";
        conceptTargetEl.innerHTML = renderOriginalConcept(lesson.conceptZh || "");
      }
      titleJaEl.textContent = lesson.titleJa || "";
      conceptJaEl.innerHTML = renderOriginalConcept(lesson.conceptJa || "");
      if (typeof wrapAllTablesWithScrollWrapper === "function") wrapAllTablesWithScrollWrapper();
      return;
    }

    // 2. Prefer static ContentI18n package content if available
    const subject = getActiveSubject();
    let titleText = "";
    let conceptHtml = "";
    let found = false;

    if (subject && window.ContentI18n && typeof window.ContentI18n.get === "function") {
      const hasLoadPack = typeof window.ContentI18n.isPackLoaded === "function";

      // A. Try target language pack
      const isLoaded = !hasLoadPack || window.ContentI18n.isPackLoaded(subject, currentLang);
      if (isLoaded) {
        const localized = window.ContentI18n.get(subject, lesson.id, currentLang);
        if (localized && (localized.title || localized.concept)) {
          titleText = localized.title || "";
          conceptHtml = renderOriginalConcept(localized.concept || "");
          found = true;
        }
      } else {
        // Pack is not loaded yet (Web dynamic load fallback). Show loading and return
        applyLessonTargetLayout(true);
        const loadingText = (window.I18n && typeof window.I18n.t === "function" ? window.I18n.t("common.loading") : "") || "Loading...";
        titleTargetEl.textContent = loadingText;
        conceptTargetEl.innerHTML = `<div style="opacity: 0.6; padding: 20px; text-align: center;">${loadingText}</div>`;
        titleJaEl.textContent = lesson.titleJa || "";
        conceptJaEl.innerHTML = renderOriginalConcept(lesson.conceptJa || "");
        return;
      }

      // B. If not found in target language, fallback to "en" pack (only if loaded/exists)
      if (!found && normLang !== "en-US") {
        const enLoaded = !hasLoadPack || window.ContentI18n.isPackLoaded(subject, "en");
        if (enLoaded) {
          const enLocalized = window.ContentI18n.get(subject, lesson.id, "en");
          if (enLocalized && (enLocalized.title || enLocalized.concept)) {
            titleText = enLocalized.title || "";
            conceptHtml = renderOriginalConcept(enLocalized.concept || "");
            found = true;
          }
        }
      }
    }

    if (found) {
      applyLessonTargetLayout(true); // Single language layout
      titleTargetEl.textContent = titleText || lesson.titleZh || lesson.titleJa || "";
      conceptTargetEl.innerHTML = conceptHtml || renderOriginalConcept(lesson.conceptZh || lesson.conceptJa || "");
      titleJaEl.textContent = lesson.titleJa || "";
      conceptJaEl.innerHTML = renderOriginalConcept(lesson.conceptJa || "");
    } else {
      // C. Fallback immediately to default-ja-zh (bilingual layout)
      applyLessonTargetLayout(false);
      titleTargetEl.textContent = lesson.titleZh || "";
      conceptTargetEl.innerHTML = renderOriginalConcept(lesson.conceptZh || "");
      titleJaEl.textContent = lesson.titleJa || "";
      conceptJaEl.innerHTML = renderOriginalConcept(lesson.conceptJa || "");
    }

    if (typeof wrapAllTablesWithScrollWrapper === "function") wrapAllTablesWithScrollWrapper();
  }

  function restoreGenericTranslations() {
    document.querySelectorAll("[data-i18n-compact-pair]").forEach((el) => {
      el.removeAttribute("data-i18n-compact-pair");
      if (el.getAttribute("data-i18n-title-managed") === "true") {
        el.removeAttribute("title");
        el.removeAttribute("data-i18n-title-managed");
      }
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const original = textOriginals.get(node);
      if (original != null) {
        node.nodeValue = original;
        textApplied.delete(node);
        textAppliedLang.delete(node);
      }
    }
    document.querySelectorAll("[data-i18n-attrs]").forEach((el) => {
      const originals = attrOriginals.get(el);
      if (originals) {
        Object.entries(originals).forEach(([attr, value]) => el.setAttribute(attr, value));
      }
      attrApplied.delete(el);
      attrAppliedLang.delete(el);
      el.removeAttribute("data-i18n-attrs");
    });
  }

  function collectTextJobs(root) {
    const jobs = [];
    const walker = document.createTreeWalker(
      root || document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || shouldSkip(parent) || !isVisible(parent)) return NodeFilter.FILTER_REJECT;
          const current = node.nodeValue || "";
          const lastApplied = textApplied.get(node);
          const lastAppliedLang = textAppliedLang.get(node);
          const sourceHost = parent.closest("[data-i18n-source-text]");
          if (sourceHost) {
            textOriginals.set(node, sourceHost.getAttribute("data-i18n-source-text") || current);
          }
          if (lastApplied && current === lastApplied && lastAppliedLang === currentLang) return NodeFilter.FILTER_REJECT;
          if (!sourceHost && lastApplied && current !== lastApplied) {
            textOriginals.set(node, current);
          } else if (!sourceHost && !textOriginals.has(node)) {
            textOriginals.set(node, current);
          }
          const original = textOriginals.get(node);
          if (!shouldTranslateText(original)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    let count = 0;
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const original = textOriginals.get(node);
      const sourceHost = node.parentElement?.closest("[data-i18n-source-text]");
      const preparedSource = translationSource(
        original,
        sourceHost?.dataset.i18nSourceLang || ""
      );
      jobs.push({
        node,
        item: {
          id: `text-${Date.now()}-${count}`,
          key: "dom-text",
          sourceLang: preparedSource.sourceLang,
          targetLang: currentLang,
          text: preparedSource.text,
          format: "text",
          context: sourceHost?.dataset.i18nContext || "Visible UI text in Study Tools",
          priority: translationPriority(node.parentElement),
        },
      });
      count += 1;
    }
    return jobs;
  }

  function collectAttrJobs(root) {
    const jobs = [];
    const attrs = ["title", "aria-label", "placeholder"];
    const elements = [...(root || document.body).querySelectorAll("*")];
    elements.forEach((el, index) => {
      const formControl = el.matches("input,textarea,select,option");
      if ((!formControl && shouldSkip(el)) || !isVisible(el)) return;
      attrs.forEach((attr) => {
        if (attr === "title" && el.getAttribute("data-i18n-title-managed") === "true") return;
        const value = el.getAttribute(attr);
        if (!value || !shouldTranslateText(value)) return;
        const applied = attrApplied.get(el) || {};
        const appliedLang = attrAppliedLang.get(el) || {};
        if (applied[attr] && value === applied[attr] && appliedLang[attr] === currentLang) return;
        const originals = attrOriginals.get(el) || {};
        if (!originals[attr] || (applied[attr] && value !== applied[attr])) {
          originals[attr] = value;
          attrOriginals.set(el, originals);
        }
        const preparedSource = translationSource(originals[attr]);
        jobs.push({
          el,
          attr,
          item: {
            id: `attr-${Date.now()}-${index}-${attr}`,
            key: `dom-attr:${attr}`,
            sourceLang: preparedSource.sourceLang,
            targetLang: currentLang,
            text: preparedSource.text,
            format: "text",
            context: `Visible ${attr} attribute in Study Tools`,
            priority: translationPriority(el, true),
          },
        });
      });
    });
    return jobs;
  }

  async function translateVisible(root) {
    if (!isActive() || translating || !document.body) return;
    const targetLang = currentLang;
    const runId = ++translationRunId;
    translating = true;
    dirty = false;
    let textJobs = [];
    let attrJobs = [];
    try {
      textJobs = collectTextJobs(root || document.body);
      attrJobs = collectAttrJobs(root || document.body);
      const items = [...textJobs.map((job) => job.item), ...attrJobs.map((job) => job.item)]
        .sort((a, b) => (a.priority || 0) - (b.priority || 0));
      if (!items.length) return;
      const jobsById = new Map([
        ...textJobs.map((job) => [job.item.id, { type: "text", job }]),
        ...attrJobs.map((job) => [job.item.id, { type: "attr", job }]),
      ]);
      const japaneseCompanions = [];
      const companionByTargetId = new Map();
      items.forEach((item) => {
        const source = normalizeText(item.text);
        if (
          item.targetLang === "ja"
          || staticJapaneseFallback(source)
          || !/[\u3400-\u9fff]/.test(source)
        ) {
          return;
        }
        const companion = {
          ...item,
          id: `ja-${item.id}`,
          key: `${item.key}:ja`,
          targetLang: "ja",
          context: `${item.context || "Visible UI text"} Japanese companion`,
        };
        japaneseCompanions.push(companion);
        companionByTargetId.set(item.id, companion);
      });
      const targetTranslations = {};
      const japaneseTranslations = {};
      const japaneseTextFor = (item) => {
        const fixed = staticJapaneseFallback(item.text);
        if (fixed) return fixed;
        const companion = companionByTargetId.get(item.id);
        if (!companion) return "";
        return japaneseTranslations[companion.id] || getCachedTranslation(companion);
      };

      const applyTextJob = (job, translatedText, japaneseText = "") => {
        if (!job.node.isConnected) return;
        /* Check user translation first — highest display priority */
        var guardEl = job.node.parentElement;
        var guardOrig = textOriginals.get(job.node) || "";
        if (guardOrig && guardEl && job.item) {
          var guardCtx = (job.item && job.item.context) || "general";
          var guardSaved = getUserTranslationItem(guardOrig, currentLang, currentLang, guardCtx);
          if (guardSaved && guardSaved.translatedText && !guardSaved.deletedAt) {
            job.node.nodeValue = guardSaved.translatedText;
            textApplied.set(job.node, guardSaved.translatedText);
            textAppliedLang.set(job.node, targetLang);
            attachUserTranslationControl(guardEl, guardOrig, guardSaved.translatedText, guardCtx);
            return;
          }
        }
        const nextValue = translatedText
          ? renderTargetText(
              textOriginals.get(job.node),
              translatedText,
              job.node.parentElement,
              { jaText: japaneseText }
            )
          : japaneseText
            ? renderPendingText(japaneseText, job.node.parentElement)
          : renderPendingText(textOriginals.get(job.node), job.node.parentElement);
        textApplied.set(job.node, nextValue);
        textAppliedLang.set(job.node, translatedText ? targetLang : `pending:${targetLang}`);
        job.node.nodeValue = nextValue;
        if (translatedText && job.node.parentElement && job.item) {
          var origText = textOriginals.get(job.node) || "";
          var ctx = (job.item && job.item.context) || "general";
          attachUserTranslationControl(job.node.parentElement, origText, translatedText, ctx);
        }
      };
      const applyAttrJob = (job, translatedText, japaneseText = "") => {
        if (!job.el.isConnected) return;
        const original = (attrOriginals.get(job.el) || {})[job.attr] || job.item.text;
        const nextValue = translatedText
          ? renderTargetText(original, translatedText, job.el, {
              attr: job.attr,
              jaText: japaneseText,
            })
          : japaneseText
            ? japaneseText
          : renderPendingAttribute(original, job.attr);
        const applied = attrApplied.get(job.el) || {};
        applied[job.attr] = nextValue;
        attrApplied.set(job.el, applied);
        const appliedLang = attrAppliedLang.get(job.el) || {};
        appliedLang[job.attr] = translatedText ? targetLang : `pending:${targetLang}`;
        attrAppliedLang.set(job.el, appliedLang);
        job.el.setAttribute(job.attr, nextValue);
        job.el.setAttribute("data-i18n-attrs", "true");
      };

      textJobs.forEach((job) => {
        const cached = getCachedTranslation(job.item);
        if (cached) targetTranslations[job.item.id] = cached;
        applyTextJob(job, cached, japaneseTextFor(job.item));
      });
      attrJobs.forEach((job) => {
        const cached = getCachedTranslation(job.item);
        if (cached) targetTranslations[job.item.id] = cached;
        applyAttrJob(job, cached, japaneseTextFor(job.item));
      });

      const applyTranslations = (translations) => {
        if (!translations || !isActive() || currentLang !== targetLang || runId !== translationRunId) return;
        Object.assign(targetTranslations, translations);
        Object.entries(translations).forEach(([id, translatedText]) => {
          const entry = jobsById.get(id);
          if (!entry) return;
          const japaneseText = japaneseTextFor(entry.job.item);
          if (entry.type === "text") {
            applyTextJob(entry.job, translatedText, japaneseText);
          } else {
            applyAttrJob(entry.job, translatedText, japaneseText);
          }
        });
      };

      const applyJapaneseTranslations = (translations) => {
        if (!translations || !isActive() || currentLang !== targetLang || runId !== translationRunId) return;
        Object.assign(japaneseTranslations, translations);
        companionByTargetId.forEach((companion, targetId) => {
          const japaneseText = translations[companion.id];
          if (!japaneseText) return;
          const entry = jobsById.get(targetId);
          if (!entry) return;
          const translatedText = targetTranslations[targetId] || getCachedTranslation(entry.job.item);
          if (entry.type === "text") {
            applyTextJob(entry.job, translatedText, japaneseText);
          } else {
            applyAttrJob(entry.job, translatedText, japaneseText);
          }
        });
      };

      const [translated] = await Promise.all([
        translateBatch(items, applyTranslations),
        japaneseCompanions.length
          ? translateBatch(japaneseCompanions, applyJapaneseTranslations)
          : Promise.resolve({}),
      ]);
      if (!isActive() || currentLang !== targetLang) {
        dirty = true;
        return;
      }
      applyTranslations(translated);
    } catch (error) {
      showI18nError(error);
    } finally {
      if (runId !== translationRunId) return;
      translating = false;
      if (dirty) scheduleTranslate();
    }
  }

  function scheduleTranslate(root) {
    if (!isActive() || !document.body) return;
    if (translating) {
      dirty = true;
      return;
    }
    window.clearTimeout(scanTimer);
    scanTimer = window.setTimeout(() => translateVisible(root || document.body), 0);
  }

  function updateDocumentState() {
    const info = langInfo();
    document.documentElement.lang = isActive() ? info.code : "zh-Hans";
    document.documentElement.dir = "ltr";
    document.body.classList.toggle("i18n-active", isActive());
    document.body.setAttribute("data-language", currentLang);
    document.body.setAttribute("data-i18n-dir", info.dir || "ltr");
  }

  function renderOptions(filter = "") {
    const list = document.getElementById("language-options-list");
    if (!list) return;
    const needle = filter.trim().toLowerCase();
    const candidates = LANGUAGES.filter((lang) => {
      if (!needle) return true;
      return [lang.code, lang.label, lang.native].some((value) => value.toLowerCase().includes(needle));
    }).slice(0, 120);
    list.innerHTML = candidates.map((lang) => `
      <button type="button" class="language-option${lang.code === currentLang ? " active" : ""}" data-lang="${lang.code}">
        <span class="language-option-main">${lang.native}</span>
        <small>${lang.label} · ${lang.code}</small>
      </button>
    `).join("");
  }

  function updateButton() {
    const label = document.getElementById("language-current-label");
    const button = document.getElementById("language-toggle-btn");
    const info = langInfo();
    if (label) label.textContent = isActive() ? info.native : "中日";
    if (button) {
      const labelText = isActive() ? `${info.native} / 日本語` : info.native;
      button.setAttribute("aria-label", `Language: ${labelText}`);
      button.setAttribute("title", `Language: ${labelText}`);
    }
    renderOptions(document.getElementById("language-search-input")?.value || "");
  }

  function closeMenu() {
    const popover = document.getElementById("language-popover");
    const button = document.getElementById("language-toggle-btn");
    if (popover) popover.classList.remove("open");
    if (button) button.setAttribute("aria-expanded", "false");
  }

  function createMenu() {
    if (document.getElementById("language-switcher") || !document.querySelector(".app-header")) return;
    const switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.id = "language-switcher";
    switcher.innerHTML = `
      <button type="button" class="language-toggle-btn" id="language-toggle-btn" aria-expanded="false" aria-controls="language-popover">
        <i class="fa-solid fa-globe"></i>
        <span class="language-toggle-text">语言</span>
        <strong id="language-current-label" data-i18n-skip="true">中日</strong>
      </button>
      <div class="language-popover" id="language-popover" role="menu">
        <div class="language-popover-head">
          <strong>语言切换</strong>
          <small>默认保持现有中日双语；选择其他语言后显示日本語 + 目标语。</small>
        </div>
        <div class="language-search-wrap">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input id="language-search-input" type="search" placeholder="搜索语言或地区代码">
        </div>
        <div class="language-options-list" id="language-options-list" data-i18n-skip="true"></div>
      </div>
    `;
    const header = document.querySelector(".app-header");
    const themeButton = document.getElementById("theme-toggle-btn");
    header.insertBefore(switcher, themeButton || header.lastElementChild);

    document.getElementById("language-toggle-btn").addEventListener("click", (event) => {
      event.stopPropagation();
      const popover = document.getElementById("language-popover");
      const open = !popover.classList.contains("open");
      popover.classList.toggle("open", open);
      event.currentTarget.setAttribute("aria-expanded", String(open));
      if (open) {
        renderOptions(document.getElementById("language-search-input").value || "");
        document.getElementById("language-search-input").focus();
      }
    });
    document.getElementById("language-search-input").addEventListener("input", (event) => {
      renderOptions(event.target.value);
    });
    document.getElementById("language-options-list").addEventListener("click", (event) => {
      const option = event.target.closest("[data-lang]");
      if (!option) return;
      setLanguage(option.dataset.lang);
      closeMenu();
    });
    document.addEventListener("click", (event) => {
      if (!switcher.contains(event.target)) closeMenu();
    });
    updateButton();
  }

  function shouldSkipStatic(el) {
    if (!el) return true;
    const STATIC_SKIP_SELECTOR = [
      "[data-i18n-skip]",
      "[data-i18n-managed=\"lesson\"]",
      "script",
      "style",
      "noscript",
      "pre",
      "code",
      "textarea",
      ".quiz-section",
      ".coding-exam-panel",
      ".eq-body-area",
      ".typing-workspace",
      "[data-content-type=\"lesson\"]",
      "[data-content-type=\"exam-question\"]",
      "[data-content-type=\"explanation\"]"
    ].join(",");
    return el.closest(STATIC_SKIP_SELECTOR);
  }

  function normalizeLanguageCode(code) {
    if (!code) return "default-ja-zh";
    const clean = code.trim().toLowerCase();
    if (clean === "default-ja-zh") return "default-ja-zh";
    if (clean === "en" || clean === "en-us" || clean.startsWith("en-")) return "en-US";
    if (clean === "ja" || clean === "ja-jp" || clean.startsWith("ja-")) return "ja-JP";
    if (clean === "zh" || clean === "zh-cn" || clean.startsWith("zh-")) return "zh-CN";
    if (clean === "vi" || clean === "vi-vn" || clean.startsWith("vi-")) return "vi-VN";
    if (clean === "my" || clean === "my-mm" || clean.startsWith("my-")) return "my-MM";
    if (clean === "ko" || clean === "ko-kr" || clean.startsWith("ko-")) return "ko-KR";
    if (clean === "fr" || clean === "fr-fr" || clean.startsWith("fr-")) return "fr-FR";
    return "en-US";
  }

  function translateStatic(key, params) {
    if (!key) return "";
    const lang = normalizeLanguageCode(currentLang);
    const fallbackChain = [lang, "ja-JP", "zh-CN", "en-US"];
    let translated = null;

    function getNestedValue(obj, path) {
      if (!obj) return null;
      const parts = path.split(".");
      let val = obj;
      for (const part of parts) {
        if (val[part] === undefined) return null;
        val = val[part];
      }
      return val;
    }

    if (window.I18nUiDict) {
      for (const l of fallbackChain) {
        const dict = window.I18nUiDict[l];
        if (dict) {
          const val = getNestedValue(dict, key);
          if (val !== null && val !== undefined) {
            translated = val;
            break;
          }
        }
      }
    }

    if (translated === null || translated === undefined) {
      translated = key;
    }

    if (params && typeof params === "object") {
      let text = String(translated);
      for (const k in params) {
        if (Object.prototype.hasOwnProperty.call(params, k)) {
          text = text.replace(new RegExp(`{${k}}`, "g"), params[k]);
        }
      }
      return text;
    }

    return String(translated);
  }

  function applyStaticUI(root) {
    const container = root || document.body;
    if (!container) return;

    const isDefault = (currentLang === DEFAULT_LANG);

    // 1. data-i18n
    container.querySelectorAll("[data-i18n]").forEach((el) => {
      if (shouldSkipStatic(el)) return;
      const key = el.getAttribute("data-i18n");
      
      let original = el.getAttribute("data-i18n-original-text");
      if (original === null) {
        original = el.textContent || "";
        el.setAttribute("data-i18n-original-text", original);
      }

      if (isDefault) {
        el.textContent = original;
        el.removeAttribute("data-i18n-managed");
      } else {
        const val = translateStatic(key);
        if (val) {
          el.textContent = val;
          el.setAttribute("data-i18n-managed", "static");
        }
      }
    });

    // 2. data-i18n-placeholder
    container.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      if (shouldSkipStatic(el)) return;
      const key = el.getAttribute("data-i18n-placeholder");
      
      let original = el.getAttribute("data-i18n-original-placeholder");
      if (original === null) {
        original = el.getAttribute("placeholder") || "";
        el.setAttribute("data-i18n-original-placeholder", original);
      }

      if (isDefault) {
        if (original) el.setAttribute("placeholder", original);
        else el.removeAttribute("placeholder");
        el.removeAttribute("data-i18n-managed");
      } else {
        const val = translateStatic(key);
        if (val) {
          el.setAttribute("placeholder", val);
          el.setAttribute("data-i18n-managed", "static");
        }
      }
    });

    // 3. data-i18n-title
    container.querySelectorAll("[data-i18n-title]").forEach((el) => {
      if (shouldSkipStatic(el)) return;
      const key = el.getAttribute("data-i18n-title");
      
      let original = el.getAttribute("data-i18n-original-title");
      if (original === null) {
        original = el.getAttribute("title") || "";
        el.setAttribute("data-i18n-original-title", original);
      }

      if (isDefault) {
        if (original) el.setAttribute("title", original);
        else el.removeAttribute("title");
        el.removeAttribute("data-i18n-managed");
      } else {
        const val = translateStatic(key);
        if (val) {
          el.setAttribute("title", val);
          el.setAttribute("data-i18n-managed", "static");
        }
      }
    });

    // 4. data-i18n-aria-label
    container.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      if (shouldSkipStatic(el)) return;
      const key = el.getAttribute("data-i18n-aria-label");
      
      let original = el.getAttribute("data-i18n-original-aria-label");
      if (original === null) {
        original = el.getAttribute("aria-label") || "";
        el.setAttribute("data-i18n-original-aria-label", original);
      }

      if (isDefault) {
        if (original) el.setAttribute("aria-label", original);
        else el.removeAttribute("aria-label");
        el.removeAttribute("data-i18n-managed");
      } else {
        const val = translateStatic(key);
        if (val) {
          el.setAttribute("aria-label", val);
          el.setAttribute("data-i18n-managed", "static");
        }
      }
    });
  }

  async function setLanguage(code) {
    const next = languageByCode.has(code) ? code : DEFAULT_LANG;
    if (next === currentLang) return;
    translationRunId += 1;
    translating = false;
    dirty = false;
    restoreGenericTranslations();
    currentLang = next;
    localStorage.setItem(STORAGE_KEY, currentLang);
    updateDocumentState();
    updateButton();
    updateCourseLabels();
    
    // Apply static UI translations
    applyStaticUI(document.body);

    // Notify glossary and other components of language change
    try {
      document.dispatchEvent(new CustomEvent("i18n:languageChanged", { detail: { language: currentLang } }));
    } catch (_e) { /* ignore dispatch errors */ }

    if (typeof window.refreshI18nForCurrentLesson === "function") {
      window.refreshI18nForCurrentLesson();
    }
    scheduleTranslate(document.body);
  }

  function startObserver() {
    if (observer || !document.body) return;
    observer = new MutationObserver((mutations) => {
      if (!isActive()) return;
      if (mutations.some((mutation) => mutation.target && !shouldSkip(mutation.target.nodeType === 1 ? mutation.target : mutation.target.parentElement))) {
        scheduleTranslate(document.body);
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["class", "style", "hidden", "aria-hidden", "title", "aria-label", "placeholder"],
    });
  }

  function init() {
    createMenu();
    updateDocumentState();
    updateCourseLabels();
    applyStaticUI(document.body);
    startObserver();
    if (typeof window.refreshI18nForCurrentLesson === "function") {
      window.refreshI18nForCurrentLesson();
    }
    scheduleTranslate(document.body);
  }

  window.I18n = {
    DEFAULT_LANG,
    LANGUAGES,
    isActive,
    getLanguage: () => currentLang,
    getLanguageInfo: () => langInfo(),
    setLanguage,
    translateBatch,
    applyLessonTranslation,
    scheduleTranslate,
    applyStaticUI,
    t: translateStatic,
    tAsync: async (key, options = {}) => {
      const text = options.ja || options.source || "";
      if (!isActive() || !text) return text;
      const id = `manual-${key || Date.now()}`;
      const result = await translateBatch([{
        id,
        key,
        sourceLang: options.sourceLang || "ja",
        targetLang: currentLang,
        text,
        format: options.format || "text",
        context: options.context || "Manual UI string",
      }]);
      return result[id] || text;
    },
    renderPair: async (key, options = {}) => {
      const source = options.ja || options.source || "";
      const translated = await window.I18n.tAsync(key, options);
      return renderTargetText(source, translated);
    },
  };
 
   /* User translation local storage (Round 20.1 prototype) */
   var USER_TRANSLATIONS_KEY = "study-tools-user-translations-v1";
 
   function getUserTranslationsData() {
     try {
       return JSON.parse(localStorage.getItem(USER_TRANSLATIONS_KEY) || "{}");
     } catch (_) { return {}; }
   }
 
   function saveUserTranslationItem(sourceText, sourceLang, targetLang, translatedText, context) {
     var all = getUserTranslationsData();
     var key = String(sourceText) + "|" + String(sourceLang) + "|" + String(targetLang) + "|" + String(context || "");
     all[key] = {
  sourceText: String(sourceText),
  sourceTextHash: simpleHash(String(sourceText)),
  sourceLang: String(sourceLang),
  targetLang: String(targetLang),
  translatedText: String(translatedText),
  context: String(context || ""),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
  syncVersion: 1,
  origin: "user"
};
     try { localStorage.setItem(USER_TRANSLATIONS_KEY, JSON.stringify(all)); } catch (_) {}
   }
 
   function deleteUserTranslationItem(sourceText, sourceLang, targetLang, context) {
     var all = getUserTranslationsData();
     var key = String(sourceText) + "|" + String(sourceLang) + "|" + String(targetLang) + "|" + String(context || "");
     var now = new Date().toISOString();
     var existing = all[key] || {};
     all[key] = {
       sourceText: String(existing.sourceText || sourceText),
       sourceTextHash: existing.sourceTextHash || simpleHash(String(sourceText)),
       sourceLang: String(existing.sourceLang || sourceLang),
       targetLang: String(existing.targetLang || targetLang),
       translatedText: String(existing.translatedText || ""),
       context: String(existing.context || context || ""),
       updatedAt: now,
       deletedAt: now,
       syncVersion: 1,
       origin: "user"
     };
     try { localStorage.setItem(USER_TRANSLATIONS_KEY, JSON.stringify(all)); } catch (_) {}
   }
 
   function getUserTranslationItem(sourceText, sourceLang, targetLang, context) {
     var all = getUserTranslationsData();
     var key = String(sourceText) + "|" + String(sourceLang) + "|" + String(targetLang) + "|" + String(context || "");
     var item = all[key] || null;
     return item && !item.deletedAt ? item : null;
   }
 
   function getUserTranslationCount() {
     var all = getUserTranslationsData();
     return Object.keys(all).length;
   }
 
   window.getUserTranslationsData = getUserTranslationsData;
   window.saveUserTranslationItem = saveUserTranslationItem;
   window.deleteUserTranslationItem = deleteUserTranslationItem;
   window.getUserTranslationItem = getUserTranslationItem;
   window.getUserTranslationCount = getUserTranslationCount;

  ﻿function simpleHash(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

/* User translation UI controls (Round 20.2) */
var UT_ATTR = "data-ut-attached";

function isUtEligible(el) {
  if (!el || !el.parentNode) return false;
  var t = el.tagName;
  if (t === 'BUTTON' || t === 'INPUT' || t === 'SELECT' || t === 'TEXTAREA') return false;
  if (el.closest('.app-header') || el.closest('.app-sidebar') || el.closest('.auth-panel')) return false;
  if (el.closest('.glossary-modal') || el.closest('.ut-wrapper')) return false;
  return true;
}

function attachUserTranslationControl(el, origText, transText, ctx) {
  if (!el || !document.body.contains(el)) return;
  if (!isUtEligible(el) || !origText || origText.length < 10) return;
  /* Always re-apply saved user translation, even when already attached */
  applySavedUserTrans(el, origText, ctx || 'general');
  if (el.hasAttribute(UT_ATTR)) return;
  el.setAttribute(UT_ATTR, "true");
  var wrapper = document.createElement('span');
  wrapper.className = 'ut-wrapper';
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
  var btn = document.createElement('button');
  btn.className = 'ut-edit-btn';
  btn.type = 'button';
  btn.title = (typeof translateStatic === 'function' ? translateStatic('auth.userTranslationEdit') : null) || 'Edit';
  btn.textContent = '\u270E';
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    openUtEditor(el, origText, transText, ctx || 'general');
  });
  wrapper.appendChild(btn);
}

function applySavedUserTrans(el, origText, ctx) {
  var saved = getUserTranslationItem(origText, currentLang, currentLang, ctx);
  if (saved && saved.translatedText && !saved.deletedAt) {
    el.textContent = saved.translatedText;
    if (!el.parentNode.querySelector('.ut-badge')) {
      var badge = document.createElement('span');
      badge.className = 'ut-badge';
      badge.textContent = '\u2605';
      el.parentNode.insertBefore(badge, el.nextSibling);
    }
  }
}

function openUtEditor(el, origText, transText, ctx) {
  var pop = document.querySelector('.ut-popup');
  if (pop) pop.remove();
  var saved = getUserTranslationItem(origText, currentLang, currentLang, ctx);
  var curText = (saved && !saved.deletedAt) ? saved.translatedText : transText;
  var i18nT = function(k, fb) {
    if (typeof translateStatic === 'function') {
      var v = translateStatic(k);
      if (v) return v;
    }
    return fb || k;
  };
  pop = document.createElement('div');
  pop.className = 'ut-popup';
  pop.setAttribute('data-i18n-skip', 'true');
  var tp = i18nT('auth.userTranslationTextareaPlaceholder', 'Your translation');
  var sl = i18nT('auth.userTranslationSave', 'Save');
  var cl = i18nT('auth.userTranslationCancel', 'Cancel');
  pop.innerHTML =
    '<div class=\"ut-backdrop\"></div>' +
    '<div class=\"ut-box\">' +
      '<textarea class=\"ut-ta\" maxlength=\"2000\" placeholder=\"' + tp + '\">' + (curText || '') + '</textarea>' +
      '<div class=\"ut-actions\">' +
        '<button class=\"ut-save\" type=\"button\">' + sl + '</button>' +
        '<button class=\"ut-cancel\" type=\"button\">' + cl + '</button>' +
        ((saved && !saved.deletedAt) ? '<button class=\"ut-reset\" type=\"button\">' + i18nT('auth.userTranslationReset', 'Reset') + '</button>' : '') +
      '</div>' +
    '</div>';
  document.body.appendChild(pop);
  pop.querySelector('.ut-cancel').addEventListener('click', function() { pop.remove(); });
  pop.querySelector('.ut-save').addEventListener('click', function() {
    var ta = pop.querySelector('.ut-ta');
    var val = (ta.value || '').trim();
    if (!val) { alert(i18nT('auth.userTranslationInvalid', 'Cannot be empty')); return; }
    if (origText.length > 500) { alert(i18nT('auth.userTranslationTooLong', 'Source too long (max 500 chars)')); return; }
    if (val.length > 2000) { alert(i18nT('auth.userTranslationTooLong', 'Too long')); return; }
    saveUserTranslationItem(origText, currentLang, currentLang, val, ctx);
    el.textContent = val;
    if (!el.parentNode.querySelector('.ut-badge')) {
      var b = document.createElement('span');
      b.className = 'ut-badge';
      b.textContent = '\u2605';
      el.parentNode.insertBefore(b, el.nextSibling);
    }
    pop.remove();
  });
  var resetBtn = pop.querySelector('.ut-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      deleteUserTranslationItem(origText, currentLang, currentLang, ctx);
      el.textContent = transText;
      var badge = el.parentNode.querySelector('.ut-badge');
      if (badge) badge.remove();
      pop.remove();
    });
  }
}


// Global helper functions
  window.showToastKey = function (key, type = "info", params = null) {
    const msg = window.I18n ? window.I18n.t(key, params) : key;
    if (typeof window.showToast === "function") {
      window.showToast(msg, type);
    } else {
      console.log(`[Toast] [${type}] ${msg}`);
    }
  };

  window.alertKey = function (key, params = null) {
    const msg = window.I18n ? window.I18n.t(key, params) : key;
    window.alert(msg);
  };

  window.confirmKey = function (key, params = null) {
    const msg = window.I18n ? window.I18n.t(key, params) : key;
    return window.confirm(msg);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
