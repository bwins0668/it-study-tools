/* Study Tools Content I18n — Lesson Content Translation Lookup v1 */
(function () {
  "use strict";

  var CONTENT_KEY = "CONTENT_I18N";

  function normalizeLang(code) {
    var c = String(code || "").toLowerCase();
    if (c === "default-ja-zh" || c === "zh" || c === "zh-cn") return "zh";
    if (c === "ja" || c === "ja-jp") return "ja";
    if (c === "en" || c === "en-us") return "en";
    if (c === "ko" || c === "ko-kr") return "ko";
    if (c === "my" || c === "my-mm") return "my";
    if (c === "vi" || c === "vi-vn") return "vi";
    if (c === "fr" || c === "fr-fr") return "fr";
    return "en";
  }

  function getCurrentLang() {
    if (window.I18n && typeof window.I18n.getLanguage === "function") {
      return window.I18n.getLanguage();
    }
    return "default-ja-zh";
  }

  function getEntry(subject, id) {
    var key = String(subject) + ":" + String(id);
    var dict = window[CONTENT_KEY];
    if (!dict) return null;
    return dict[key] || null;
  }

  /**
   * Get localized content for a lesson.
   * @param {string} subject — e.g. "sql", "itpass"
   * @param {string|number} id — lesson.id
   * @param {string} [lang] — language code, defaults to current UI language
   * @returns {object|null} — { title, concept, needsReview } or null
   */
  function get(subject, id, lang) {
    var entry = getEntry(subject, id);
    if (!entry) return null;

    var normalized = normalizeLang(lang || getCurrentLang());
    var localized = entry[normalized];
    if (!localized) return null;

    return {
      title: localized.title || null,
      concept: localized.concept || null,
      needsReview: !!localized.needsReview
    };
  }

  /**
   * Check if a localized title or concept exists for the current language.
   */
  function has(subject, id, lang) {
    var result = get(subject, id, lang);
    return result !== null && (result.title !== null || result.concept !== null);
  }

  window.ContentI18n = {
    normalizeLang: normalizeLang,
    getCurrentLang: getCurrentLang,
    get: get,
    has: has
  };
})();
