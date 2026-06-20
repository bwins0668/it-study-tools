/* Study Tools Locale Support Registry — Single source of truth for supported languages.
   Only languages with complete UI dictionary + usable content packs + navigation are eligible
   for the language selector. Unsupported languages are completely removed from all UI. */
(function () {
  "use strict";

  var SUPPORTED_LOCALES = [
    {
      code: "default-ja-zh",
      tag: "ja-Hans",
      label: "默认中日双语",
      native: "既定: 日本語 / 中文",
      dir: "ltr",
      uiStatus: "full",
      courseStatus: "full",
      navigationStatus: "full",
      glossaryStatus: "full",
      selectorEligible: true,
      compareEligible: false,
      supportLevel: "built-in",
      reason: "Built-in bilingual mode with embedded lesson data"
    },
    {
      code: "ja",
      tag: "ja-JP",
      label: "Japanese",
      native: "日本語",
      dir: "ltr",
      uiStatus: "full",
      courseStatus: "full",
      navigationStatus: "full",
      glossaryStatus: "full",
      selectorEligible: true,
      compareEligible: false,
      supportLevel: "built-in",
      reason: "Primary language — all content natively available"
    },
    {
      code: "zh",
      tag: "zh-CN",
      label: "Chinese (Simplified)",
      native: "中文 (简体)",
      dir: "ltr",
      uiStatus: "full",
      courseStatus: "full",
      navigationStatus: "full",
      glossaryStatus: "full",
      selectorEligible: true,
      compareEligible: true,
      supportLevel: "built-in",
      reason: "Built-in bilingual — titleZh/conceptZh embedded in all lessons"
    },
    {
      code: "ko",
      tag: "ko-KR",
      label: "Korean",
      native: "한국어",
      dir: "ltr",
      uiStatus: "full",
      courseStatus: "full",
      navigationStatus: "full",
      glossaryStatus: "full",
      selectorEligible: true,
      compareEligible: true,
      supportLevel: "full",
      reason: "Full offline packs for all 5 subjects (635 lessons)"
    },
    {
      code: "my",
      tag: "my-MM",
      label: "Burmese",
      native: "မြန်မာဘာသာ",
      dir: "ltr",
      uiStatus: "full",
      courseStatus: "usable",
      navigationStatus: "full",
      glossaryStatus: "usable",
      selectorEligible: true,
      compareEligible: true,
      supportLevel: "usable",
      reason: "AI-assisted offline packs for all 5 subjects"
    },
    {
      code: "vi",
      tag: "vi-VN",
      label: "Vietnamese",
      native: "Tiếng Việt",
      dir: "ltr",
      uiStatus: "full",
      courseStatus: "usable",
      navigationStatus: "full",
      glossaryStatus: "usable",
      selectorEligible: true,
      compareEligible: true,
      supportLevel: "usable",
      reason: "AI-assisted offline packs for all 5 subjects"
    },
    {
      code: "th",
      tag: "th-TH",
      label: "Thai",
      native: "ไทย",
      dir: "ltr",
      uiStatus: "full",
      courseStatus: "usable",
      navigationStatus: "full",
      glossaryStatus: "usable",
      selectorEligible: true,
      compareEligible: true,
      supportLevel: "usable",
      reason: "AI-assisted offline packs for all 5 subjects"
    },
    {
      code: "fr",
      tag: "fr-FR",
      label: "French",
      native: "Français",
      dir: "ltr",
      uiStatus: "full",
      courseStatus: "usable",
      navigationStatus: "full",
      glossaryStatus: "usable",
      selectorEligible: true,
      compareEligible: true,
      supportLevel: "usable",
      qualityNote: "AI-assisted — recommend native review",
      reason: "AI-assisted offline packs, complete coverage, needs native review"
    }
  ];

  var SUPPORTED_CODES = SUPPORTED_LOCALES.map(function (l) { return l.code; });
  var CODE_MAP = {};
  SUPPORTED_LOCALES.forEach(function (l) { CODE_MAP[l.code] = l; });

  /* Migration: unsupported language codes → fallback */
  var MIGRATION_MAP = {
    "en": "default-ja-zh",
    "id": "default-ja-zh",
    "ms": "default-ja-zh",
    "tl": "default-ja-zh"
  };

  window.LOCALE_REGISTRY = {
    SUPPORTED: SUPPORTED_LOCALES,
    SUPPORTED_CODES: SUPPORTED_CODES,

    getSupported: function () {
      return SUPPORTED_LOCALES.slice();
    },

    getEligible: function () {
      return SUPPORTED_LOCALES.filter(function (l) { return l.selectorEligible; });
    },

    isSupported: function (code) {
      return SUPPORTED_CODES.indexOf(code) >= 0;
    },

    getByCode: function (code) {
      return CODE_MAP[code] || null;
    },

    getMigrationTarget: function (oldCode) {
      if (MIGRATION_MAP[oldCode]) return MIGRATION_MAP[oldCode];
      if (SUPPORTED_CODES.indexOf(oldCode) >= 0) return oldCode;
      return "default-ja-zh";
    },

    /* Return only languages eligible for the language selector */
    getSelectorCandidates: function () {
      return SUPPORTED_LOCALES.filter(function (l) { return l.selectorEligible; });
    },

    /* Normalize short codes to registry codes */
    normalizeCode: function (code) {
      if (!code) return "default-ja-zh";
      var c = String(code).toLowerCase().trim();
      if (c === "default-ja-zh" || c === "ja-zh") return "default-ja-zh";
      if (c === "ja" || c === "ja-jp") return "ja";
      if (c === "zh" || c === "zh-cn") return "zh";
      if (c === "ko" || c === "ko-kr") return "ko";
      if (c === "my" || c === "my-mm") return "my";
      if (c === "vi" || c === "vi-vn") return "vi";
      if (c === "th" || c === "th-th") return "th";
      if (c === "fr" || c === "fr-fr") return "fr";
      return c;
    },

    /* Localized migration toast messages */
    getMigrationToast: function (targetCode) {
      var messages = {
        "default-ja-zh": "当前语言包暂不可用，已切换至默认双语模式。",
        "ja": "現在の言語パックは利用できません。デフォルトに切り替えました。",
        "zh": "当前语言包暂不可用，已切换至默认双语模式。"
      };
      return messages[targetCode] || messages["default-ja-zh"];
    }
  };
})();

/* ── Display Mode State Manager ──
   target-only: lesson content shows only current language
   ja-compare:  lesson content shows Japanese + current language side-by-side */
(function () {
  "use strict";

  var STORAGE_KEY = "study-tools-display-mode";
  var VALID_MODES = ["target-only", "ja-compare"];
  var DEFAULT_MODE = "target-only";

  function get() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v && VALID_MODES.indexOf(v) >= 0) return v;
    } catch (e) {}
    return DEFAULT_MODE;
  }

  function set(mode) {
    if (VALID_MODES.indexOf(mode) < 0) mode = DEFAULT_MODE;
    try { localStorage.setItem(STORAGE_KEY, mode); } catch (e) {}
    return mode;
  }

  function toggle() {
    var cur = get();
    var next = (cur === "target-only") ? "ja-compare" : "target-only";
    return set(next);
  }

  /* ja and default-ja-zh always use target-only (no compare needed) */
  function isCompareEligible(langCode) {
    if (!langCode) return false;
    var c = String(langCode).toLowerCase().trim();
    if (c === "ja" || c === "default-ja-zh" || c === "ja-zh") return false;
    return true;
  }

  /* Effective mode: if language is ja or default-ja-zh, always target-only */
  function getEffective(langCode) {
    if (!isCompareEligible(langCode)) return "target-only";
    return get();
  }

  function getLocalizedLabels() {
    return {
      "default-ja-zh": { targetOnly: "纯当前语言", jaCompare: "日语对照", toggleLabel: "显示模式" },
      "ja": { targetOnly: "現在の言語のみ", jaCompare: "—", toggleLabel: "表示モード" },
      "zh": { targetOnly: "纯当前语言", jaCompare: "日语对照", toggleLabel: "显示模式" },
      "ko": { targetOnly: "현재 언어만", jaCompare: "일본어 대조", toggleLabel: "표시 모드" },
      "my": { targetOnly: "လက်ရှိဘာသာသာ", jaCompare: "ဂျပန် နှိုင်းယှဉ်", toggleLabel: "ပြသမုဒ်" },
      "vi": { targetOnly: "Chỉ ngôn ngữ hiện tại", jaCompare: "So sánh tiếng Nhật", toggleLabel: "Chế độ hiển thị" },
      "th": { targetOnly: "เฉพาะภาษาปัจจุบัน", jaCompare: "เทียบภาษาญี่ปุ่น", toggleLabel: "โหมดแสดงผล" },
      "fr": { targetOnly: "Langue actuelle uniquement", jaCompare: "Comparer avec japonais", toggleLabel: "Mode d'affichage" }
    };
  }

  function getLabel(mode, langCode) {
    var short = (langCode || "default-ja-zh").toLowerCase().trim();
    var labels = getLocalizedLabels();
    var langLabels = labels[short] || labels["default-ja-zh"];
    return mode === "ja-compare" ? langLabels.jaCompare : langLabels.targetOnly;
  }

  window.DisplayMode = {
    STORAGE_KEY: STORAGE_KEY,
    DEFAULT_MODE: DEFAULT_MODE,
    get: get,
    set: set,
    toggle: toggle,
    isCompareEligible: isCompareEligible,
    getEffective: getEffective,
    getLabel: getLabel,
    getLocalizedLabels: getLocalizedLabels
  };
})();
