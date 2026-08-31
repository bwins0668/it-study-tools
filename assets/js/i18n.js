// Study Tools language switcher and AI-backed translation runtime.
(function () {
  "use strict";

  // Remote translation overlay is intentionally disabled for core content.
  // Lesson/course/glossary/exam rendering must use built-in local data only.
  var OFFICIAL_ONLY = (function () {
    try {
      var p = new URLSearchParams(window.location.search);
      if (p.get('officialOnly') === '1') { sessionStorage.setItem('study-tools-official-only', '1'); return true; }
      if (p.get('officialOnly') === '0') { sessionStorage.removeItem('study-tools-official-only'); return false; }
      return sessionStorage.getItem('study-tools-official-only') === '1';
    } catch (e) { return false; }
  })();
  var DISABLE_TRANSLATION_OVERLAY = true;


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
    ".CodeMirror"
  ].join(",");

  /* LANGUAGES populated from LOCALE_REGISTRY (loaded before i18n.js).
     Only selectorEligible languages appear in the language switcher. */
  const LANGUAGES = (function () {
    if (window.LOCALE_REGISTRY && typeof window.LOCALE_REGISTRY.getSelectorCandidates === "function") {
      return window.LOCALE_REGISTRY.getSelectorCandidates().map(function (l) {
        return { code: l.code, label: l.label, native: l.native, dir: l.dir || "ltr" };
      });
    }
    /* Fallback if registry not loaded — minimal safe list */
    return [
      { code: DEFAULT_LANG, label: "默认中日双语", native: "既定: 日本語 / 中文", dir: "ltr" },
      { code: "ja", label: "Japanese", native: "日本語", dir: "ltr" },
      { code: "zh", label: "Chinese (Simplified)", native: "中文 (简体)", dir: "ltr" },
      { code: "ko", label: "Korean", native: "한국어", dir: "ltr" },
      { code: "my", label: "Burmese", native: "မြန်မာဘာသာ", dir: "ltr" },
      { code: "vi", label: "Vietnamese", native: "Tiếng Việt", dir: "ltr" },
      { code: "th", label: "Thai", native: "ไทย", dir: "ltr" },
      { code: "fr", label: "French", native: "Français", dir: "ltr" }
    ];
  })();

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

    /* Migration: auto-migrate unsupported language settings to a supported one */
  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  if (!languageByCode.has(currentLang)) {
    var migratedTarget = DEFAULT_LANG;
    if (window.LOCALE_REGISTRY && typeof window.LOCALE_REGISTRY.getMigrationTarget === "function") {
      migratedTarget = window.LOCALE_REGISTRY.getMigrationTarget(currentLang);
    }
    if (!languageByCode.has(migratedTarget)) migratedTarget = DEFAULT_LANG;
    console.warn("[I18n] Migrating unsupported language '" + currentLang + "' → '" + migratedTarget + "'");
    currentLang = migratedTarget;
    localStorage.setItem(STORAGE_KEY, currentLang);
    /* Schedule migration toast (shown after UI is ready) */
    window.__i18nMigrationToast = true;
  }
  let observer = null;
  let scanTimer = null;
  let translating = false;
  let dirty = false;
  let translationRunId = 0;
  let translationOverlayUnavailable = false;
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
    if (DISABLE_TRANSLATION_OVERLAY) return "";
    const key = cacheKey(item);
    return translationCache.get(key) || "";
  }

  function rememberTranslation(item, translatedText) {
    if (DISABLE_TRANSLATION_OVERLAY) return;
    const clean = String(translatedText || "").trim();
    if (!clean) return;
    translationCache.set(cacheKey(item), clean);
    persistCacheSoon();
  }

  function safeRememberTranslation(item, translatedText) {
    if (!isCleanTranslationText(translatedText)) {
      console.warn("[I18n] Skipping corrupted translation cache entry (mojibake or tag leak)");
      return;
    }
    rememberTranslation(item, translatedText);
  }

  loadPersistentCache();

  // [R22.11] Prevent mojibake in translation cache
  var MOJIBAKE_RE = /[\uFFFD\u9AEB\u9AEF\u9B2F\u90B5\u9666\u8B41\u8373\u9B06\u90B1\u7E67\u87E2\u9A52\u87E0\u9A53\u9A54\u90E6\u8D8A\u8E0A\u9A57\u9A5A\u9A5B\u90E8\u8EAC\u9A58\u8B10\u8ADF\u8B21\u8B20\u90AA\u9A4D\u9A4E\u9A4F\u9A50\u8B3E\u8B3C\u8B3A\u8B3B\u8E9E\u8EA2\u9AAB\u9AAA\u9AA9\u9AA8]/;

  function isMojibakeFree(text) {
    return text && typeof text === "string" ? !MOJIBAKE_RE.test(text) : true;
  }

  function hasLeakedHtmlTagText(value) {
    if (typeof value !== "string") return false;
    return /\x3C\/(?:span|button|div|i|section|article|header|footer|main|pre|code|textarea|label|input|select|option|p|h[1-6]|a|ul|ol|li|br|hr|table|tr|td|th|form|nav|aside)>/i.test(value);
  }

  function isCleanTranslationText(value) {
    return isMojibakeFree(value) && !hasLeakedHtmlTagText(value);
  }

  function clearAllBadCaches() {
    var totalCleaned = 0;
    var reaped = 0;

    // 1) Clean translation cache
    translationCache.forEach(function(value, key) {
      if (!isCleanTranslationText(value)) {
        translationCache.delete(key);
        totalCleaned++;
      }
    });
    if (totalCleaned > 0) persistCacheSoon();

    // 2) Clean user translations
    try {
      var utRaw = localStorage.getItem(USER_TRANSLATIONS_KEY);
      if (utRaw) {
        var ut = JSON.parse(utRaw);
        var dirty = false;
        Object.keys(ut).forEach(function(k) {
          var v = ut[k];
          if (v && v.translatedText && !isCleanTranslationText(v.translatedText)) {
            delete ut[k];
            totalCleaned++;
            dirty = true;
          }
        });
        if (dirty) {
          localStorage.setItem(USER_TRANSLATIONS_KEY, JSON.stringify(ut));
        }
      }
    } catch (e) {}

    // 3) Unregister broken Service Workers (optional, safe)
    if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) {
      navigator.serviceWorker.getRegistrations().then(function(regs) {
        regs.forEach(function(reg) {
          if (reg.active && reg.active.scriptURL) {
            reg.unregister().then(function(ok) {
              if (ok) { reaped++; console.log("[I18n] Unregistered old SW:", reg.active.scriptURL); }
            });
          }
        });
      });
    }

    // 4) Delete old caches
    if (typeof caches !== "undefined") {
      caches.keys().then(function(keys) {
        keys.forEach(function(key) {
          if (key.indexOf("study-tools-web-") === 0) {
            caches.delete(key).then(function(ok) {
              if (ok) console.log("[I18n] Deleted cache:", key);
            });
          }
        });
      });
    }

    if (totalCleaned > 0) {
      console.log("[I18n] Cleaned " + totalCleaned + " corrupted cache entries total");
    }
  }

  function clearBadI18nCache() {
    // Legacy - calls the full version
    clearAllBadCaches();
  }
  // [R22.11-Hotfix2] Emergency cache cleaning via URL param
  (function checkClearBadCacheParam() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.has("clearBadCache") && params.get("clearBadCache") === "1") {
        clearAllBadCaches();
        // Clean & reload
        if (window.history && window.history.replaceState) {
          var cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, "", cleanUrl);
        }
        console.log("[I18n] clearBadCache=1: caches cleaned, redirecting...");
        // Unregister SW and clear all caches
        if (navigator.serviceWorker) {
          navigator.serviceWorker.getRegistrations().then(function(regs) {
            Promise.all(regs.map(function(reg) { return reg.unregister(); })).then(function() {
              if (typeof caches !== "undefined") {
                caches.keys().then(function(keys) {
                  Promise.all(keys.filter(function(k) {
                    return k.indexOf("study-tools-web-") === 0 || k.indexOf("study-tools-i18n-") === 0;
                  }).map(function(k) { return caches.delete(k); })).then(function() {
DISABLE_TRANSLATION_OVERLAY = true;
                            window.location.reload(true);
                  });
                });
              } else {
                window.location.reload(true);
              }
            });
          });
        } else {
          window.location.reload(true);
        }
      }
    } catch(e) {
      console.warn("[I18n] clearBadCache param check failed:", e);
    }
  })();

  clearAllBadCaches();


  function langInfo(code = currentLang) {
    return languageByCode.get(code) || languageByCode.get(DEFAULT_LANG);
  }

  function getNativeName(code) {
    if (!code) return "";
    var info = languageByCode.get(code);
    return info ? info.native : "";
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
    return {};
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
      return source;
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
      return source;
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
      "lesson-section-badge",
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

  function applyLessonTargetLayout(active, hideJaCol) {
    const tabs = document.querySelector(".lang-tabs");
    const container = document.getElementById("concept-container");
    const jaCol = document.querySelector(".ja-col");
    const targetCol = document.querySelector(".zh-col");
    const titleTargetEl = document.getElementById("lesson-title-zh");
    const titleJaEl = document.getElementById("lesson-title-ja");

    if (tabs) tabs.style.display = active ? "none" : "";
    if (titleTargetEl) titleTargetEl.style.display = "";

    /* target-only mode: hide Japanese column completely */
    if (active && hideJaCol) {
      if (container) container.style.flexDirection = "column";
      if (jaCol) jaCol.style.display = "none";
      if (targetCol) { targetCol.style.display = "flex"; targetCol.style.order = ""; }
      if (titleJaEl) titleJaEl.style.display = "none";
      return;
    }
    if (titleJaEl) titleJaEl.style.display = "";

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

    // Column headers with fallback awareness
    if (jaHead) jaHead.innerHTML = '<i class="fa-solid fa-graduation-cap"></i> 解説 (日本語)';

    // Check if target content is actually a fallback
    var short = normalizeLangShort(currentLang);
    var isFallback = false;
    var actualLang = short;
    var conceptContainer = document.querySelector(".concept-container");
    if (conceptContainer) {
      var fb = conceptContainer.getAttribute("data-is-fallback");
      if (fb === "true") {
        isFallback = true;
        actualLang = conceptContainer.getAttribute("data-actual-lang") || short;
      }
    }

    if (short === "default-ja-zh" || short === "zh") {
      if (targetHead) targetHead.innerHTML = '<i class="fa-solid fa-language"></i> 讲解 (中文)';
    } else if (short === "ja") {
      if (targetHead) targetHead.innerHTML = '<i class="fa-solid fa-language"></i> 解説 (日本語)';
    } else if (isFallback) {
      // Honest fallback label: show the actual language being shown
      var fbName = getNativeName(actualLang);
      if (targetHead) targetHead.innerHTML = `<i class="fa-solid fa-language"></i> ${fbName} <span style="opacity:0.55;font-size:0.85em">(fallback)</span>`;
    } else {
      if (targetHead) targetHead.innerHTML = `<i class="fa-solid fa-language"></i> ${info.native}`;
    }
  }

  function getActiveSubject() {
    if (document.getElementById("subject-tab-sql")?.classList.contains("active")) return "sql";
    if (document.getElementById("subject-tab-itpass")?.classList.contains("active")) return "itpass";
    if (document.getElementById("subject-tab-java")?.classList.contains("active")) return "java";
    if (document.getElementById("subject-tab-sg")?.classList.contains("active")) return "sg";
    if (document.getElementById("subject-tab-python")?.classList.contains("active")) return "python";
    var activeModule = document.querySelector(".module-switch-option.active[data-module]");
    var moduleName = activeModule ? activeModule.getAttribute("data-module") : "";
    if (["sql", "itpass", "java", "sg", "python"].indexOf(moduleName) !== -1) return moduleName;
    if (typeof currentSubject !== "undefined" && ["sql", "itpass", "java", "sg", "python"].indexOf(currentSubject) !== -1) {
      return currentSubject;
    }
    return null;
  }

  function setLessonFallbackState(actualLang, isFallback) {
    var conceptContainer = document.querySelector(".concept-container");
    if (!conceptContainer) return;
    conceptContainer.setAttribute("data-actual-lang", actualLang || "");
    conceptContainer.setAttribute("data-is-fallback", isFallback ? "true" : "false");
  }

  function pickLessonLocaleValue(lesson, field, lang) {
    if (!lesson || !lesson.locales || lesson.locales[field] == null) return null;
    return pickLocalizedValue(lesson.locales[field], lang || currentLang);
  }

  function textFromLessonLocale(lesson, field, lang, fallbackText) {
    var picked = pickLessonLocaleValue(lesson, field, lang);
    if (picked && !picked.missing && picked.text) return picked.text;
    return fallbackText || "";
  }

  function updateLessonBadge(lesson, lang) {
    var badge = document.getElementById("lesson-section-badge");
    if (!badge) return;
    var targetLang = lang || currentLang;
    var pack = getVisibleContentPack(getActiveSubject(), lesson, targetLang);
    if (pack && pack.subtitle) {
      badge.textContent = pack.subtitle;
      return;
    }
    var picked = pickLessonLocaleValue(lesson, "subtitle", targetLang);
    if (picked && !picked.missing && picked.text) {
      badge.textContent = picked.text;
      return;
    }
    var short = normalizeLangShort(targetLang);
    var fallback = {
      "default-ja-zh": "カテゴリー",
      ja: "カテゴリー",
      zh: "学习重点",
      ko: "학습 요점",
      my: "သင်ခန်းစာအချက်များ",
      vi: "Trọng tâm bài học",
      th: "ประเด็นการเรียนรู้",
      fr: "Points clés"
    };
    badge.textContent = fallback[short] || "Lesson focus";
  }

  function updateFlashcardSummaryText() {
    var desc = document.querySelector(".flashcard-desc-box [data-i18n=\"flashcard.clickToFlip\"]");
    if (!desc || !window.I18n || typeof window.I18n.t !== "function") return;
    desc.textContent = window.I18n.t("flashcard.clickToFlip", "Click the card to view the term details:");
  }

  function refreshDynamicLessonUi() {
    updateFlashcardSummaryText();
    if (typeof loadItPassChapterQuiz === "function" && getActiveSubject() === "itpass") {
      loadItPassChapterQuiz();
    }
    if (typeof loadSgChapterQuiz === "function" && getActiveSubject() === "sg") {
      loadSgChapterQuiz();
    }
  }

  function getVisibleContentPack(subject, lesson, lang) {
    if (!subject || !lesson || !window.ContentI18n || typeof window.ContentI18n.get !== "function") return null;
    return window.ContentI18n.get(subject, lesson.id, lang || currentLang);
  }

  function updateLessonVisibleExtras(lesson, lang) {
    var subject = getActiveSubject();
    var pack = getVisibleContentPack(subject, lesson, lang);
    var analogyEl = document.getElementById("lesson-analogy");
    if (analogyEl) {
      analogyEl.textContent = pack && pack.analogy ? pack.analogy : (lesson.analogy || "");
    }
    if (
      typeof initFlashcards === "function" &&
      (subject === "sql" || subject === "itpass" || subject === "sg") &&
      lesson &&
      lesson.id != null
    ) {
      initFlashcards(lesson.id);
    }
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

    var short = normalizeLangShort(currentLang);

    // 1. Determine what display mode to use
    // default-ja-zh: show bilingual (ja + zh columns)
    // zh: show zh-only (single column)
    // ja: show ja-only (single column)
    // Other: try target language, fallback with label

    if (short === "default-ja-zh") {
      // Bilingual: full display
      applyLessonTargetLayout(false); // false = two-column
      updateLessonBadge(lesson, "zh");
      titleJaEl.textContent = textFromLessonLocale(lesson, "title", "ja", lesson.titleJa || "");
      conceptJaEl.innerHTML = renderOriginalConcept(textFromLessonLocale(lesson, "concept", "ja", lesson.conceptJa || ""));
      titleTargetEl.textContent = textFromLessonLocale(lesson, "title", "zh", lesson.titleZh || "");
      conceptTargetEl.innerHTML = renderOriginalConcept(textFromLessonLocale(lesson, "concept", "zh", lesson.conceptZh || ""));
      setLessonFallbackState("zh", false);
    updateCourseLabels();
    updateLessonVisibleExtras(lesson, "default-ja-zh");
    refreshDynamicLessonUi();
    if (typeof wrapAllTablesWithScrollWrapper === "function") wrapAllTablesWithScrollWrapper();
    return;
    }

    if (short === "ja") {
      applyLessonTargetLayout(true); // true = single column (hide target, show ja)
      updateLessonBadge(lesson, "ja");
      var jaTitle = textFromLessonLocale(lesson, "title", "ja", lesson.titleJa || "");
      var jaConcept = textFromLessonLocale(lesson, "concept", "ja", lesson.conceptJa || "");
      titleTargetEl.textContent = jaTitle;
      conceptTargetEl.innerHTML = renderOriginalConcept(jaConcept);
      titleJaEl.textContent = jaTitle;
      conceptJaEl.innerHTML = renderOriginalConcept(jaConcept);
      setLessonFallbackState("ja", false);
      updateCourseLabels();
      updateLessonVisibleExtras(lesson, "ja");
      refreshDynamicLessonUi();
      if (typeof wrapAllTablesWithScrollWrapper === "function") wrapAllTablesWithScrollWrapper();
      return;
    }

    if (short === "zh") {
      var dmZh = (window.DisplayMode && typeof window.DisplayMode.getEffective === "function")
        ? window.DisplayMode.getEffective(currentLang) : "target-only";
      updateLessonBadge(lesson, "zh");
      titleTargetEl.textContent = textFromLessonLocale(lesson, "title", "zh", lesson.titleZh || "");
      conceptTargetEl.innerHTML = renderOriginalConcept(textFromLessonLocale(lesson, "concept", "zh", lesson.conceptZh || ""));
      titleJaEl.textContent = textFromLessonLocale(lesson, "title", "ja", lesson.titleJa || "");
      conceptJaEl.innerHTML = renderOriginalConcept(textFromLessonLocale(lesson, "concept", "ja", lesson.conceptJa || ""));
      applyLessonTargetLayout(dmZh === "ja-compare" ? false : true, dmZh !== "ja-compare");
      setLessonFallbackState("zh", false);
      updateCourseLabels();
      updateLessonVisibleExtras(lesson, "zh");
      refreshDynamicLessonUi();
      if (typeof wrapAllTablesWithScrollWrapper === "function") wrapAllTablesWithScrollWrapper();
      return;
    }

    // 3. Secondary languages: try local fields, then static ContentI18n packs.
    var subject = getActiveSubject();
    var titleText = "";
    var conceptHtml = "";
    var actualLang = short;
    var isFallback = false;

    updateLessonBadge(lesson, short);

    // Prefer local structured lesson fields when present.
    var localTitle = pickLessonLocaleValue(lesson, "title", short);
    var localConcept = pickLessonLocaleValue(lesson, "concept", short);
    var fallbackTitleText = "";
    var fallbackConceptHtml = "";
    var fallbackActualLang = "";
    var fallbackIsFallback = false;
    if (localTitle && !localTitle.missing && localTitle.text) {
      if (localTitle.isFallback) {
        fallbackTitleText = localTitle.text;
        fallbackActualLang = localTitle.actualLang || short;
        fallbackIsFallback = true;
      } else {
        titleText = localTitle.text;
        actualLang = localTitle.actualLang || short;
        isFallback = false;
      }
    }
    if (localConcept && !localConcept.missing && localConcept.text) {
      if (localConcept.isFallback) {
        fallbackConceptHtml = renderOriginalConcept(localConcept.text);
        fallbackActualLang = localConcept.actualLang || fallbackActualLang || short;
        fallbackIsFallback = true;
      } else {
        conceptHtml = renderOriginalConcept(localConcept.text);
        actualLang = localConcept.actualLang || actualLang;
        isFallback = false;
      }
    }

    // Try ContentI18n (local static packs for en, vi, my, fr etc.)
    if ((!titleText || !conceptHtml) && subject && window.ContentI18n && typeof window.ContentI18n.get === "function") {
      var fbOrder = getFallbackOrder(short);
      for (var f = 0; f < fbOrder.length; f++) {
        var tryLang = fbOrder[f];
        if (tryLang === "default-ja-zh") continue; // skip compound key

        var localized = window.ContentI18n.get(subject, lesson.id, tryLang);
        if (localized && (localized.title || localized.concept)) {
          if (!titleText && localized.title) {
            titleText = localized.title;
            actualLang = tryLang;
            isFallback = (tryLang !== short);
          }
          if (!conceptHtml && localized.concept) {
            conceptHtml = renderOriginalConcept(localized.concept);
            actualLang = tryLang;
            isFallback = (tryLang !== short);
          }
          break;
        }
      }
    }

    if (!titleText && fallbackTitleText) {
      titleText = fallbackTitleText;
      actualLang = fallbackActualLang || actualLang;
      isFallback = fallbackIsFallback;
    }
    if (!conceptHtml && fallbackConceptHtml) {
      conceptHtml = fallbackConceptHtml;
      actualLang = fallbackActualLang || actualLang;
      isFallback = fallbackIsFallback;
    }

    // Fallback to structured lesson data (zh/ja fields)
    if (!titleText && !conceptHtml) {
      var fbOrder = getFallbackOrder(short);
      for (var f = 0; f < fbOrder.length; f++) {
        var tryLang = fbOrder[f];
        if (tryLang === "default-ja-zh") {
          if (lesson.titleZh) { titleText = lesson.titleZh; actualLang = "zh"; isFallback = (short !== "zh"); break; }
          if (lesson.titleJa) { titleText = lesson.titleJa; actualLang = "ja"; isFallback = (short !== "ja"); break; }
          continue;
        }
        if (tryLang === "en" && lesson.titleEn) { titleText = lesson.titleEn; actualLang = "en"; isFallback = (short !== "en"); break; }
      }
      if (!titleText) {
        titleText = lesson.titleZh || lesson.titleJa || "";
        actualLang = lesson.titleZh ? "zh" : "ja";
        isFallback = true;
      }
      conceptHtml = renderOriginalConcept(lesson.conceptZh || lesson.conceptJa || "");
    }

    // Render with fallback status — respect display mode
    var dmEffective = (window.DisplayMode && typeof window.DisplayMode.getEffective === "function")
      ? window.DisplayMode.getEffective(currentLang) : "target-only";

    if (dmEffective === "ja-compare") {
      /* ja-compare: show Japanese + target side by side */
      applyLessonTargetLayout(false);
      titleJaEl.textContent = lesson.titleJa || "";
      conceptJaEl.innerHTML = renderOriginalConcept(lesson.conceptJa || "") || "";
      titleTargetEl.textContent = titleText || "";
      conceptTargetEl.innerHTML = conceptHtml || "";
    } else {
      /* target-only: hide Japanese column, show only target */
      applyLessonTargetLayout(true, true);
      titleTargetEl.textContent = titleText || "";
      conceptTargetEl.innerHTML = conceptHtml || "";
      titleJaEl.textContent = lesson.titleJa || "";
      conceptJaEl.innerHTML = renderOriginalConcept(lesson.conceptJa || "") || "";
    }

    setLessonFallbackState(actualLang, isFallback);
    updateCourseLabels();
    updateLessonVisibleExtras(lesson, short);
    refreshDynamicLessonUi();

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
    if (DISABLE_TRANSLATION_OVERLAY || !isActive() || translating || translationOverlayUnavailable || !document.body) return;
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
        /* User translation DISABLED by DISABLE_TRANSLATION_OVERLAY */
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
      translationOverlayUnavailable = true;
      dirty = false;
      restoreGenericTranslations();
      updateDocumentState();
      updateButton();
      updateCourseLabels();
      applyStaticUI(document.body);
    } finally {
      if (runId !== translationRunId) return;
      translating = false;
      if (dirty) scheduleTranslate();
    }
  }

  function scheduleTranslate(root) {
    if (!document.body) return;

    // Unconditionally apply static UI dictionary overrides first
    applyStaticUI(root || document.body);

    if (DISABLE_TRANSLATION_OVERLAY || !isActive() || translationOverlayUnavailable) return;
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
          <small>选择学习语言，课程内容离线切换。</small>
        </div>
        <div class="language-options-list" id="language-options-list" data-i18n-skip="true"></div>
        <div class="display-mode-divider" id="display-mode-divider" data-i18n-skip="true" style="display:none;border-top:1px solid rgba(255,255,255,0.08);margin:6px 0;padding:6px 0;">
          <div style="font-size:11px;color:var(--text-muted,#94a3b8);margin-bottom:4px;padding:0 8px;" id="display-mode-label">显示模式</div>
          <button type="button" id="display-mode-toggle" style="width:100%;padding:6px 10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:var(--text-main,#e2e8f0);font-size:12px;cursor:pointer;text-align:left;display:flex;align-items:center;gap:6px;">
            <i class="fa-solid fa-columns" id="display-mode-icon"></i>
            <span id="display-mode-text">纯当前语言</span>
          </button>
        </div>
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
        renderOptions("");
      }
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

    /* Display mode toggle handler */
    var dmToggle = document.getElementById("display-mode-toggle");
    if (dmToggle) {
      dmToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        if (!window.DisplayMode) return;
        var next = window.DisplayMode.toggle();
        updateDisplayModeUI();
        /* Instant re-render: re-apply current lesson with new display mode */
        if (typeof window.refreshI18nForCurrentLesson === "function") {
          window.refreshI18nForCurrentLesson();
        }
      });
    }

    updateButton();
    updateDisplayModeUI();
  }

  function shouldSkipStatic(el) {
    if (!el) return true;
    // Explicitly do not skip elements marked for translation unless they are raw script/style tags
    if (el.hasAttribute("data-i18n") || el.hasAttribute("data-i18n-placeholder")) {
      const tag = el.tagName.toLowerCase();
      if (tag === "script" || tag === "style" || tag === "noscript") return true;
      return false;
    }
    const STATIC_SKIP_SELECTOR = [
      "[data-i18n-skip]",
      "[data-i18n-managed=\"lesson\"]",
      "script",
      "style",
      "noscript",
      "pre",
      "code",
      "textarea"
    ].join(",");
    return el.closest(STATIC_SKIP_SELECTOR);
  }

  /* Update display mode toggle button UI */
  function updateDisplayModeUI() {
    var divider = document.getElementById("display-mode-divider");
    var label = document.getElementById("display-mode-label");
    var text = document.getElementById("display-mode-text");
    var icon = document.getElementById("display-mode-icon");
    if (!divider || !window.DisplayMode) return;

    var eligible = window.DisplayMode.isCompareEligible(currentLang);
    divider.style.display = eligible ? "" : "none";
    if (!eligible) return;

    var mode = window.DisplayMode.get();
    var langLabels = window.DisplayMode.getLocalizedLabels();
    var short = normalizeLangShort(currentLang);
    var langL = langLabels[short] || langLabels["default-ja-zh"];

    if (label) label.textContent = langL.toggleLabel || "显示模式";
    if (text) text.textContent = mode === "ja-compare" ? langL.jaCompare : langL.targetOnly;
    if (icon) icon.className = mode === "ja-compare" ? "fa-solid fa-columns" : "fa-solid fa-file-lines";
  }

  /* Expose for setLanguage to call */
  window.__updateDisplayModeUI = updateDisplayModeUI;

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
    if (clean === "th" || clean === "th-th" || clean.startsWith("th-")) return "th-TH";
    if (clean === "id" || clean === "id-id" || clean.startsWith("id-")) return "id-ID";
    if (clean === "fr" || clean === "fr-fr" || clean.startsWith("fr-")) return "fr-FR";
    return "en-US";
  }

  /**
   * Unified language code normalizer — returns short codes.
   * Used by content-i18n, lesson rendering, and compare labels.
   */
  function normalizeLangShort(code) {
    if (!code) return "zh";
    const c = String(code).trim().toLowerCase();
    if (c === "default-ja-zh" || c === "ja-zh") return "default-ja-zh";
    if (["zh","zh-cn","zh_cn","cn","chinese","chinese-simplified","中文","中文简体"].includes(c)) return "zh";
    if (["ja","ja-jp","ja_jp","jp","japanese","日本語"].includes(c)) return "ja";
    if (["en","en-us","en_us","english"].includes(c)) return "en";
    if (["ko","ko-kr","ko_kr","korean","한국어"].includes(c)) return "ko";
    if (["my","my-mm","burmese","myanmar","မြန်မာ"].includes(c)) return "my";
    if (["th","th-th","thai","ไทย"].includes(c)) return "th";
    if (["vi","vi-vn","vietnamese","tiếng việt","tiengviet"].includes(c)) return "vi";
    if (["id","id-id","indonesian","bahasa indonesia","bahasa"].includes(c)) return "id";
    if (["fr","fr-fr","french","français","francais"].includes(c)) return "fr";
    return c;
  }

  /**
   * Per-language fallback order for lesson content.
   * The first item is the requested language itself.
   */
  function getFallbackOrder(lang) {
    var short = normalizeLangShort(lang);
    switch (short) {
      case "default-ja-zh": return ["default-ja-zh", "ja", "zh", "en"];
      case "zh": return ["zh", "ja", "en"];
      case "ja": return ["ja", "zh", "en"];
      case "en": return ["en", "ja", "zh"];
      case "ko": return ["ko", "ja", "zh", "en"];
      case "my": return ["my", "ja", "zh", "en"];
      case "th": return ["th", "ja", "zh", "en"];
      case "vi": return ["vi", "ja", "zh", "en"];
      case "id": return ["id", "ja", "zh", "en"];
      case "fr": return ["fr", "en", "ja", "zh"];
      default: return [short, "ja", "zh", "en"];
    }
  }

  /**
   * Pick a localized value from a lesson object with fallback chain.
   * Returns { text, actualLang, requestedLang, isFallback, missing }
   */
  function pickLocalizedValue(value, lang, options) {
    options = options || {};
    var normalized = normalizeLangShort(lang || currentLang);
    var fallbackOrder = options.fallbackOrder || getFallbackOrder(normalized);

    if (value == null) {
      return { text: "", actualLang: null, requestedLang: normalized, isFallback: false, missing: true };
    }

    if (typeof value === "string") {
      return { text: value, actualLang: "legacy", requestedLang: normalized, isFallback: normalized !== "legacy", missing: false };
    }

    if (typeof value === "object") {
      // First try exact match in fallback order
      for (var i = 0; i < fallbackOrder.length; i++) {
        var key = fallbackOrder[i];
        if (key === "default-ja-zh") {
          if (value["zh"]) return { text: value["zh"], actualLang: "zh", requestedLang: normalized, isFallback: normalized !== "zh", missing: false };
          if (value["ja"]) return { text: value["ja"], actualLang: "ja", requestedLang: normalized, isFallback: normalized !== "ja", missing: false };
          continue;
        }
        if (value[key]) {
          return { text: value[key], actualLang: key, requestedLang: normalized, isFallback: normalized !== key, missing: false };
        }
      }

      // Try zh and ja as final fallbacks
      if (value["zh"]) return { text: value["zh"], actualLang: "zh", requestedLang: normalized, isFallback: true, missing: false };
      if (value["ja"]) return { text: value["ja"], actualLang: "ja", requestedLang: normalized, isFallback: true, missing: false };
    }

    return { text: "", actualLang: null, requestedLang: normalized, isFallback: false, missing: true };
  }

  function translateStatic(key, params, defaultValue) {
    if (!key) return "";

    // Support I18n.t(key, defaultValue)
    if (typeof params === "string") {
      defaultValue = params;
      params = null;
    }

    const lang = normalizeLanguageCode(currentLang);
    // For Thai/Indonesian, prefer English as the first fallback (these users are
    // more likely to read English than Japanese/Chinese when their own dict key is missing).
    const fallbackChain = (lang === "th-TH" || lang === "id-ID")
      ? [lang, "en-US", "ja-JP", "zh-CN"]
      : [lang, "ja-JP", "zh-CN", "en-US"];
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
      if (window.I18n) {
        if (!window.I18n.missingKeys) window.I18n.missingKeys = [];
        if (!window.I18n.missingKeys.includes(key)) {
          window.I18n.missingKeys.push(key);
        }
      }
      // Emit observable warning for missing keys — never silently display key as UI text in future releases
      if (typeof console !== "undefined" && console.warn) {
        console.warn("[I18n] Missing UI key:", key, "for lang:", lang, "fallback chain:", fallbackChain.join(","));
      }
      translated = defaultValue !== undefined ? defaultValue : key;
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
    /* Boundary rule: registry keys are short codes (zh/ja/...) while callers may
       pass BCP-47 long codes (zh-CN/ja-JP/...) — normalize before lookup, and an
       unrecognized code falls back to DEFAULT_LANG with a visible warn, never
       silently. Empty input must NOT reach normalizeLangShort (it maps "" → "zh"). */
    const raw = typeof code === "string" ? code.trim() : "";
    const wanted = languageByCode.has(raw) ? raw : (raw ? normalizeLangShort(raw) : "");
    if (!languageByCode.has(wanted) && typeof console !== "undefined" && console.warn) {
      console.warn(`[I18n] setLanguage: unsupported code "${raw}" → fallback "${DEFAULT_LANG}"`);
    }
    const next = languageByCode.has(wanted) ? wanted : DEFAULT_LANG;
    if (next === currentLang) return;
    translationRunId += 1;
    translating = false;
    dirty = false;
    restoreGenericTranslations();
    currentLang = next;
    localStorage.setItem(STORAGE_KEY, currentLang);
    updateDocumentState();
    updateButton();
    updateDisplayModeUI();
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
      if (DISABLE_TRANSLATION_OVERLAY) {
        if (!startObserver.pending) {
          startObserver.pending = true;
          requestAnimationFrame(() => {
            applyStaticUI(document.body);
            startObserver.pending = false;
          });
        }
        return;
      }
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

  function showMigrationToast() {
    if (!window.__i18nMigrationToast) return;
    window.__i18nMigrationToast = false;
    var msg = (window.LOCALE_REGISTRY && typeof window.LOCALE_REGISTRY.getMigrationToast === "function")
      ? window.LOCALE_REGISTRY.getMigrationToast(currentLang)
      : "当前语言包暂不可用，已切换至可用语言。";
    var toast = document.createElement("div");
    toast.className = "i18n-migration-toast";
    toast.setAttribute("role", "alert");
    toast.textContent = msg;
    toast.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1e293b;color:#f1f5f9;padding:12px 24px;border-radius:8px;font-size:14px;z-index:var(--z-toast,99999);box-shadow:0 4px 12px rgba(0,0,0,.3);transition:opacity .4s;max-width:90vw;text-align:center;";
    document.body.appendChild(toast);
    setTimeout(function () { toast.style.opacity = "0"; setTimeout(function () { toast.remove(); }, 500); }, 4000);
  }

  function init() {
    createMenu();
    updateDocumentState();
    updateCourseLabels();
    applyStaticUI(document.body);
    startObserver();
    showMigrationToast();
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
    isTranslationOverlayDisabled: () => DISABLE_TRANSLATION_OVERLAY,
    t: translateStatic,
    missingKeys: [],
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
    // New unified API
    normalizeLang: normalizeLangShort,
    getFallbackOrder: getFallbackOrder,
    pickLocalizedValue: pickLocalizedValue,
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
  // [R22.11-Hotfix3] Emergency factory reset for i18n caches
  (function checkFactoryResetParam() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.has("factoryResetI18n") && params.get("factoryResetI18n") === "1") {
        console.log("[I18n] factoryResetI18n=1: Cleaning ALL translation caches...");
        var keysToRemove = [];
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (!k) continue;
          var lk = k.toLowerCase();
          if (lk.indexOf("i18n") >= 0 || lk.indexOf("translat") >= 0 || lk.indexOf("ai-cache") >= 0 || lk.indexOf("ai_cache") >= 0 || lk.indexOf("cache-v") >= 0) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach(function(k) { localStorage.removeItem(k); console.log("  removed", k); });
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, "", window.location.origin + window.location.pathname);
        }
        if (navigator.serviceWorker) {
          navigator.serviceWorker.getRegistrations().then(function(regs) {
            Promise.all(regs.map(function(r) { return r.unregister(); })).then(function() {
              if (typeof caches !== "undefined") {
                caches.keys().then(function(keys) {
                  Promise.all(keys.filter(function(k) { return k.indexOf("study-tools") >= 0; }).map(function(k) { return caches.delete(k); })).then(function() {
                    window.location.reload(true);
                  });
                });
              } else { window.location.reload(true); }
            });
          });
        } else { window.location.reload(true); }
      }
    } catch(e) { console.warn("[I18n] factoryResetI18n error:", e); }
  })();
