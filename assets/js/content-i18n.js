/* Study Tools Content I18n — Lesson Content Translation Lookup v2 (lazy-load) */
(function () {
  "use strict";

  var CONTENT_KEY = "CONTENT_I18N";
  var loadedPacks = {};
  var loadingPacks = {};

  function ensureContentStore() {
    var existing = window[CONTENT_KEY] || {};
    if (existing && existing.__contentI18nMergeStore) return existing;
    if (typeof Proxy === "undefined") {
      window[CONTENT_KEY] = existing;
      return existing;
    }
    var store = new Proxy(existing, {
      set: function (target, key, value) {
        if (
          typeof key === "string" &&
          value &&
          typeof value === "object" &&
          target[key] &&
          typeof target[key] === "object"
        ) {
          target[key] = Object.assign({}, target[key], value);
        } else {
          target[key] = value;
        }
        return true;
      }
    });
    Object.defineProperty(store, "__contentI18nMergeStore", { value: true });
    window[CONTENT_KEY] = store;
    return store;
  }

  ensureContentStore();

  function normalizeLang(code) {
    if (window.I18n && window.I18n.normalizeLang) {
      return window.I18n.normalizeLang(code);
    }
    var c = String(code || "").toLowerCase();
    if (c === "default-ja-zh" || c === "ja-zh") return "default-ja-zh";
    if (c === "zh" || c === "zh-cn") return "zh";
    if (c === "ja" || c === "ja-jp") return "ja";
    if (c === "en" || c === "en-us") return "en";
    if (c === "ko" || c === "ko-kr") return "ko";
    if (c === "my" || c === "my-mm") return "my";
    if (c === "th" || c === "th-th") return "th";
    if (c === "vi" || c === "vi-vn") return "vi";
    if (c === "id" || c === "id-id") return "id";
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

  function hasLoadedContentFor(subject, lang) {
    var dict = window[CONTENT_KEY];
    if (!dict) return false;
    var prefix = String(subject) + ":";
    for (var key in dict) {
      if (Object.prototype.hasOwnProperty.call(dict, key) && key.indexOf(prefix) === 0 && dict[key] && dict[key][lang]) {
        return true;
      }
    }
    return false;
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

    // default-ja-zh: prefer zh content
    if (normalized === "default-ja-zh") {
      var zhContent = entry["zh"];
      if (zhContent) return zhContent;
      var jaContent = entry["ja"];
      if (jaContent) return jaContent;
    }

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

  /**
   * Dynamically load a content language pack.
   * Supports both (subject, lang) and (lang, subject) argument orders.
   * @param {string} subject — "sql" | "itpass" | "sg" | "java" | "python"
   * @param {string} [lang] — language code, defaults to current UI language
   * @param {boolean} [isHighPriority] — if true, sets fetchpriority to high, else low
   * @returns {Promise<boolean>} — true if pack was loaded, false if not needed or failed
   */
  function loadPack(subject, lang, isHighPriority) {
    var subjectsList = ["sql", "itpass", "sg", "java", "python"];
    var langsWithPacks = ["en", "vi", "my", "fr", "ko", "th", "id"];

    // Swap arguments if they are passed in reverse order: (lang, subject)
    if (typeof subject === "string" && typeof lang === "string") {
      var sLower = subject.toLowerCase();
      var lLower = lang.toLowerCase();
      if (subjectsList.indexOf(lLower) !== -1 || langsWithPacks.indexOf(sLower) !== -1 || sLower === "ko" || sLower === "ja" || sLower === "zh") {
        var temp = subject;
        subject = lang;
        lang = temp;
      }
    }

    if (!lang) lang = getCurrentLang();
    var normLang = normalizeLang(lang);

    // Validate subject and language to prevent requesting non-existent files (e.g. ko, ja, zh)
    if (subjectsList.indexOf(subject) === -1) {
      return Promise.resolve(false);
    }
    if (langsWithPacks.indexOf(normLang) === -1) {
      var k = subject + ":" + normLang;
      loadedPacks[k] = true;
      return Promise.resolve(false);
    }

    var key = subject + ":" + normLang;

    // Already present through a static <script> tag in index.html.
    if (hasLoadedContentFor(subject, normLang)) {
      loadedPacks[key] = true;
      return Promise.resolve(true);
    }

    // Already loaded
    if (loadedPacks[key]) {
      return Promise.resolve(true);
    }

    // Currently loading
    if (loadingPacks[key]) {
      return loadingPacks[key];
    }

    loadingPacks[key] = new Promise(function (resolve) {
      var script = document.createElement("script");
      var version = "";
      if (window.STUDY_TOOLS_VERSION && window.STUDY_TOOLS_VERSION.assetVersion) {
        version = "?v=" + encodeURIComponent(window.STUDY_TOOLS_VERSION.assetVersion);
      }
      script.src = "data/i18n_content/" + subject + "_" + normLang + ".js" + version;

      // Set fetch priority if supported
      if (typeof isHighPriority !== "undefined") {
        script.setAttribute("fetchpriority", isHighPriority ? "high" : "low");
      } else {
        script.setAttribute("fetchpriority", "low"); // default to low for background preheat
      }

      script.onload = function () {
        loadedPacks[key] = true;
        delete loadingPacks[key];
        resolve(true);
      };
      script.onerror = function () {
        console.warn("ContentI18n: pack load failed —", subject + "_" + normLang + ".js");
        loadedPacks[key] = true; // mark as loaded so we don't retry
        delete loadingPacks[key];
        resolve(false);
      };
      document.head.appendChild(script);
    });

    return loadingPacks[key];
  }

  /**
   * Check whether a specific content pack (subject:lang) has been loaded.
   */
  function isPackLoaded(subject, lang) {
    var normLang = normalizeLang(lang || getCurrentLang());
    return !!loadedPacks[subject + ":" + normLang];
  }

  /**
   * Preheat all existing content packs in the background.
   */
  function preheatAllPacks() {
    var subjects = ["sql", "itpass", "sg", "java", "python"];
    var langs = ["en", "vi", "my", "fr", "ko", "th", "id"];

    var promises = [];
    for (var i = 0; i < subjects.length; i++) {
      for (var j = 0; j < langs.length; j++) {
        promises.push(loadPack(subjects[i], langs[j], false));
      }
    }

    return Promise.all(promises).then(function () {
      return true;
    }).catch(function (err) {
      console.warn("ContentI18n: preheat failed silently —", err);
      return false;
    });
  }

  // Auto-trigger preheating 1.5 seconds after DOMContentLoaded
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        setTimeout(preheatAllPacks, 1500);
      });
    } else {
      setTimeout(preheatAllPacks, 1500);
    }
  }

  window.ContentI18n = {
    normalizeLang: normalizeLang,
    getCurrentLang: getCurrentLang,
    get: get,
    has: has,
    loadPack: loadPack,
    isPackLoaded: isPackLoaded,
    preheatAllPacks: preheatAllPacks
  };
})();
