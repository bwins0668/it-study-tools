// Study Tools language switcher and AI-backed translation runtime.
(function () {
  "use strict";

  const DEFAULT_LANG = "default-ja-zh";
  const STORAGE_KEY = "study-tools-language";
  const SKIP_SELECTOR = [
    "[data-i18n-skip]",
    "[data-i18n-managed]",
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
    ".output-body",
    ".query-output",
    ".result-table",
    ".data-table",
    ".sql-result-table",
    ".CodeMirror",
  ].join(",");

  const LANGUAGES = [
    { code: DEFAULT_LANG, label: "默认中日双语", native: "既定: 日本語 / 中文", dir: "ltr" },
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

  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  const LAYOUT_FIX_RESET_KEY = "study-tools-i18n-layout-reset-20260608";
  if (currentLang !== DEFAULT_LANG && localStorage.getItem(LAYOUT_FIX_RESET_KEY) !== "done") {
    currentLang = DEFAULT_LANG;
    localStorage.setItem(STORAGE_KEY, DEFAULT_LANG);
    localStorage.setItem(LAYOUT_FIX_RESET_KEY, "done");
  }
  if (!languageByCode.has(currentLang)) currentLang = DEFAULT_LANG;
  let observer = null;
  let scanTimer = null;
  let translating = false;
  let dirty = false;
  let toastCooldown = 0;

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
    const now = Date.now();
    if (now - toastCooldown < 8000) return;
    toastCooldown = now;
    const message = friendlyI18nError(error);
    if (typeof window.showToast === "function") {
      window.showToast(message, "error");
    } else {
      console.warn("[I18n]", error);
    }
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
    return [currentLang, item.sourceLang || "auto", item.format || "text", item.text].join("\u0001");
  }

  async function translateBatch(items) {
    if (!isActive() || !items || !items.length) return {};
    const output = {};
    const missing = [];
    items.forEach((item) => {
      const key = cacheKey(item);
      if (translationCache.has(key)) {
        output[item.id] = translationCache.get(key);
      } else {
        missing.push(item);
      }
    });
    if (!missing.length) return output;

    const config = getAiConfig();
    for (const chunk of splitChunks(missing, 24)) {
      const response = await fetch("/api/i18n/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetLang: currentLang,
          targetLabel: langInfo().label,
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
        const key = cacheKey(source);
        translationCache.set(key, item.text);
        output[item.id] = item.text;
      });
    }
    return output;
  }

  function renderTargetText(original, translated) {
    const source = String(original || "");
    const cleanOriginal = source.replace(/\s+/g, " ").trim();
    const cleanTranslated = String(translated || "").replace(/\s+/g, " ").trim();
    if (!cleanTranslated || cleanTranslated === cleanOriginal) return source || cleanOriginal;
    const leading = source.match(/^\s*/)?.[0] || "";
    const trailing = source.match(/\s*$/)?.[0] || "";
    return `${leading}${cleanTranslated}${trailing}`;
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
    if (titleTargetEl) titleTargetEl.style.display = active ? "none" : "";

    if (active) {
      if (container) container.style.flexDirection = "row";
      if (jaCol) jaCol.style.display = "none";
      if (targetCol) targetCol.style.display = "flex";
      return;
    }

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
    if (!isActive()) {
      tabs.forEach((tab) => {
        if (tab.dataset.i18nDefaultHtml) tab.innerHTML = tab.dataset.i18nDefaultHtml;
      });
      const jaHead = document.querySelector(".ja-col h4");
      const targetHead = document.querySelector(".zh-col h4");
      if (jaHead) jaHead.innerHTML = '<i class="fa-solid fa-graduation-cap"></i> 解説 (日本語)';
      if (targetHead) targetHead.innerHTML = '<i class="fa-solid fa-language"></i> 讲解 (中文)';
      return;
    }

    const both = document.querySelector('.lang-tab[data-lang="both"]');
    const ja = document.querySelector('.lang-tab[data-lang="ja"]');
    const target = document.querySelector('.lang-tab[data-lang="zh"]');
    if (both) both.innerHTML = `<i class="fa-solid fa-columns"></i> 日本語 / ${info.native}`;
    if (ja) ja.textContent = "日本語のみ";
    if (target) target.textContent = info.native;
    const jaHead = document.querySelector(".ja-col h4");
    const targetHead = document.querySelector(".zh-col h4");
    if (jaHead) jaHead.innerHTML = '<i class="fa-solid fa-graduation-cap"></i> 解説 (日本語)';
    if (targetHead) targetHead.innerHTML = `<i class="fa-solid fa-language"></i> Explanation (${info.native})`;
  }

  async function applyLessonTranslation(lesson) {
    if (!lesson) return;
    markManaged();
    updateCourseLabels();
    applyLessonTargetLayout(isActive());

    const titleJaEl = document.getElementById("lesson-title-ja");
    const titleTargetEl = document.getElementById("lesson-title-zh");
    const conceptJaEl = document.getElementById("concept-ja-body");
    const conceptTargetEl = document.getElementById("concept-zh-body");
    if (!titleJaEl || !titleTargetEl || !conceptJaEl || !conceptTargetEl) return;

    titleJaEl.textContent = lesson.titleJa || "";
    conceptJaEl.innerHTML = renderOriginalConcept(lesson.conceptJa || "");

    if (!isActive()) {
      applyLessonTargetLayout(false);
      titleTargetEl.textContent = lesson.titleZh || "";
      conceptTargetEl.innerHTML = renderOriginalConcept(lesson.conceptZh || "");
      return;
    }

    const titleItem = {
      id: "lesson-title",
      key: `lesson:${lesson.id}:title:${currentLang}`,
      sourceLang: "ja",
      targetLang: currentLang,
      text: lesson.titleJa || "",
      format: "text",
      context: "Study lesson title",
    };
    const conceptItem = {
      id: "lesson-concept",
      key: `lesson:${lesson.id}:concept:${currentLang}`,
      sourceLang: "ja",
      targetLang: currentLang,
      text: conceptJaEl.innerHTML,
      format: "html",
      context: "Study lesson body. Preserve HTML tags and technical terms.",
    };

    titleJaEl.textContent = "Translating...";
    titleTargetEl.textContent = "Translating...";
    conceptTargetEl.innerHTML = '<p class="i18n-loading">Translating...</p>';
    try {
      const translated = await translateBatch([titleItem, conceptItem]);
      const translatedTitle = translated["lesson-title"] || lesson.titleZh || lesson.titleJa || "";
      titleJaEl.textContent = translatedTitle;
      titleTargetEl.textContent = translatedTitle;
      conceptTargetEl.innerHTML = sanitizeHtml(translated["lesson-concept"] || renderOriginalConcept(lesson.conceptZh || ""));
    } catch (error) {
      applyLessonTargetLayout(false);
      titleJaEl.textContent = lesson.titleJa || "";
      titleTargetEl.textContent = lesson.titleZh || "";
      conceptTargetEl.innerHTML = renderOriginalConcept(lesson.conceptZh || "");
      resetToDefaultAfterTranslationFailure(error);
      showI18nError(error);
    }
  }

  function restoreGenericTranslations() {
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
          if (lastApplied && current === lastApplied && lastAppliedLang === currentLang) return NodeFilter.FILTER_REJECT;
          if (lastApplied && current !== lastApplied) {
            textOriginals.set(node, current);
          } else if (!textOriginals.has(node)) {
            textOriginals.set(node, current);
          }
          const original = textOriginals.get(node);
          if (!shouldTranslateText(original)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    let count = 0;
    while (walker.nextNode() && count < 160) {
      const node = walker.currentNode;
      const original = textOriginals.get(node);
      jobs.push({
        node,
        item: {
          id: `text-${Date.now()}-${count}`,
          key: "dom-text",
          sourceLang: "auto",
          targetLang: currentLang,
          text: original,
          format: "text",
          context: "Visible UI text in Study Tools",
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
      if (shouldSkip(el) || !isVisible(el)) return;
      attrs.forEach((attr) => {
        if (jobs.length >= 120) return;
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
        jobs.push({
          el,
          attr,
          item: {
            id: `attr-${Date.now()}-${index}-${attr}`,
            key: `dom-attr:${attr}`,
            sourceLang: "auto",
            targetLang: currentLang,
            text: originals[attr],
            format: "text",
            context: `Visible ${attr} attribute in Study Tools`,
          },
        });
      });
    });
    return jobs;
  }

  async function translateVisible(root) {
    if (!isActive() || translating || !document.body) return;
    const targetLang = currentLang;
    translating = true;
    dirty = false;
    let textJobs = [];
    let attrJobs = [];
    try {
      textJobs = collectTextJobs(root || document.body);
      attrJobs = collectAttrJobs(root || document.body);
      const items = [...textJobs.map((job) => job.item), ...attrJobs.map((job) => job.item)];
      if (!items.length) return;
      const translated = await translateBatch(items);
      if (!isActive() || currentLang !== targetLang) {
        dirty = true;
        return;
      }
      textJobs.forEach((job) => {
        if (!job.node.isConnected) return;
        const translatedText = translated[job.item.id];
        if (!translatedText) return;
        const nextValue = renderTargetText(textOriginals.get(job.node), translatedText);
        textApplied.set(job.node, nextValue);
        textAppliedLang.set(job.node, targetLang);
        job.node.nodeValue = nextValue;
      });
      attrJobs.forEach((job) => {
        if (!job.el.isConnected) return;
        const translatedText = translated[job.item.id];
        if (!translatedText) return;
        const original = (attrOriginals.get(job.el) || {})[job.attr] || job.item.text;
        const nextValue = renderTargetText(original, translatedText);
        const applied = attrApplied.get(job.el) || {};
        applied[job.attr] = nextValue;
        attrApplied.set(job.el, applied);
        const appliedLang = attrAppliedLang.get(job.el) || {};
        appliedLang[job.attr] = targetLang;
        attrAppliedLang.set(job.el, appliedLang);
        job.el.setAttribute(job.attr, nextValue);
        job.el.setAttribute("data-i18n-attrs", "true");
      });
    } catch (error) {
      showI18nError(error);
    } finally {
      translating = false;
      if (dirty) scheduleTranslate();
      if (isActive() && (textJobs.length >= 160 || attrJobs.length >= 120)) scheduleTranslate();
    }
  }

  function scheduleTranslate(root) {
    if (!isActive() || !document.body) return;
    if (translating) {
      dirty = true;
      return;
    }
    window.clearTimeout(scanTimer);
    scanTimer = window.setTimeout(() => translateVisible(root || document.body), 260);
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
      button.setAttribute("aria-label", `语言切换: ${info.native}`);
      button.setAttribute("title", `语言切换: ${info.native}`);
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

  async function setLanguage(code) {
    const next = languageByCode.has(code) ? code : DEFAULT_LANG;
    if (next === currentLang) return;
    restoreGenericTranslations();
    currentLang = next;
    localStorage.setItem(STORAGE_KEY, currentLang);
    updateDocumentState();
    updateButton();
    updateCourseLabels();
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
    t: async (key, options = {}) => {
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
      const translated = await window.I18n.t(key, options);
      return renderTargetText(source, translated);
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
