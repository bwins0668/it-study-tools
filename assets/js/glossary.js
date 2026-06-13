/* Study Tools Glossary Modal Controller v1 */
(function () {
  "use strict";

  /* ---- Utilities ---- */

  function t(key, params) {
    if (window.I18n && typeof window.I18n.t === "function") {
      return window.I18n.t(key, params);
    }
    return key;
  }

  function getLanguage() {
    if (window.I18n && typeof window.I18n.getLanguage === "function") {
      return window.I18n.getLanguage();
    }
    return "default-ja-zh";
  }

  function normalizeLang(lang) {
    var code = String(lang || "").toLowerCase();
    if (code === "default-ja-zh" || code === "zh" || code === "zh-cn") return "zh";
    if (code === "ja" || code === "ja-jp") return "ja";
    if (code === "en" || code === "en-us") return "en";
    if (code === "ko" || code === "ko-kr") return "ko";
    if (code === "my" || code === "my-mm") return "my";
    if (code === "vi" || code === "vi-vn") return "vi";
    if (code === "fr" || code === "fr-fr") return "fr";
    return "en";
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ---- State ---- */

  var state = {
    query: "",
    category: "all",
    selectedId: null
  };

  /* ---- Data Access ---- */

  /**
   * normalizeTerm(term) — 术语表兼容层
   * 将旧结构 (v1) 自动补齐到新结构 (v2) 的缺省字段。
   * 纯函数：返回新对象，不修改原始 term。
   * 旧结构：exam_tags, ja/zh/en/my/vi/fr(term+kana+note/explanation), aliases, related, category, level, example
   * 新结构：schemaVersion, subcategory, examTags, skillTags, searchBoost, updatedAt, ko
   */
  function normalizeTerm(term) {
    if (!term || typeof term !== "object") return term || {};
    var normalized = {};

    // 逐字段拷贝，避免直接 ...spread 在旧引擎上可能漏自有属性
    var keys = Object.keys(term);
    for (var i = 0; i < keys.length; i++) {
      normalized[keys[i]] = term[keys[i]];
    }

    // ── 元数据 ──
    normalized.schemaVersion = term.schemaVersion || "v1";
    normalized.source = term.source || "project-glossary-v1";
    normalized.updatedAt = term.updatedAt || "";

    // ── 分类 ──
    normalized.category = term.category || "uncategorized";
    normalized.subcategory = term.subcategory || "";
    normalized.level = term.level || "basic";

    // ── 标签 ──
    normalized.exam_tags = Array.isArray(term.exam_tags) ? term.exam_tags.slice() : [];
    normalized.examTags = Array.isArray(term.examTags)
      ? term.examTags.slice()
      : normalized.exam_tags.slice();
    normalized.skillTags = Array.isArray(term.skillTags) ? term.skillTags.slice() : [];

    // ── 别名与关联 ──
    normalized.aliases = Array.isArray(term.aliases) ? term.aliases.slice() : [];
    normalized.related = Array.isArray(term.related) ? term.related.slice() : [];

    // ── 搜索权重（留值，本轮不启用排序） ──
    normalized.searchBoost = Number.isFinite(term.searchBoost) ? term.searchBoost : 1;

    // ── 多语言 ──
    // ja / zh / en / my / vi / fr 保留原结构不变
    // ko 若存在则保留，不强行补空

    return normalized;
  }

  function normalizeTerms(terms) {
    if (!Array.isArray(terms)) return [];
    return terms.map(normalizeTerm);
  }

  function getTerms() {
    var rawTerms = Array.isArray(window.IT_TERMS_GLOSSARY) ? window.IT_TERMS_GLOSSARY : [];
    return normalizeTerms(rawTerms);
  }

  function getTermById(id) {
    if (window.IT_TERMS_BY_ID && window.IT_TERMS_BY_ID[id]) {
      return normalizeTerm(window.IT_TERMS_BY_ID[id]);
    }
    return getTerms().filter(function (t) { return t.id === id; })[0] || null;
  }

  /* ---- Filtering & Search ---- */

  /**
   * normalizeSearchToken(value) — 搜索标记规范化
   * 将连字符和下划线视为等价的单词分隔符，
   * 使 primary_key 可以被 primary-key 命中，反之亦然。
   */
  function normalizeSearchToken(value) {
    return String(value || "").toLowerCase().replace(/[_-]/g, " ");
  }

  /**
   * collectSearchFields(term) — 收集 term 中所有可搜索字段值
   * 返回一个扁平字符串数组，每项都是小写。
   * 保留原匹配字段：id, ja.term, zh.term, en.term, aliases
   * 新增匹配字段：category, subcategory, level, exam_tags, examTags, skillTags, related(id)
   */
  function collectSearchFields(term) {
    if (!term || typeof term !== "object") return [];
    var fields = [];

    function push(val) {
      if (val != null && val !== "") {
        var norm = normalizeSearchToken(val).normalize("NFC");
        fields.push(norm);
        var noSpaces = norm.replace(/\s+/g, "");
        if (noSpaces !== norm) {
          fields.push(noSpaces);
        }
      }
    }

    // ── id ──
    push(term.id);

    // ── 多语言 term & explanation ──
    var langs = ["ja", "zh", "en", "ko", "my", "vi", "fr"];
    for (var i = 0; i < langs.length; i++) {
      var langBlock = term[langs[i]];
      if (langBlock) {
        if (langBlock.term) push(langBlock.term);
        if (langBlock.explanation) push(langBlock.explanation);
        if (langBlock.note) push(langBlock.note);
      }
    }

    // ── aliases ──
    if (Array.isArray(term.aliases)) {
      for (var a = 0; a < term.aliases.length; a++) {
        push(term.aliases[a]);
      }
    }

    // ── category & subcategory & level ──
    push(term.category);
    push(term.subcategory);
    push(term.level);

    // ── exam_tags & examTags ──
    if (Array.isArray(term.exam_tags)) {
      for (var et = 0; et < term.exam_tags.length; et++) {
        push(term.exam_tags[et]);
      }
    }
    if (Array.isArray(term.examTags)) {
      for (var et2 = 0; et2 < term.examTags.length; et2++) {
        push(term.examTags[et2]);
      }
    }

    // ── skillTags ──
    if (Array.isArray(term.skillTags)) {
      for (var st = 0; st < term.skillTags.length; st++) {
        push(term.skillTags[st]);
      }
    }

    // ── related (仅匹配 id 字符串) ──
    if (Array.isArray(term.related)) {
      for (var r = 0; r < term.related.length; r++) {
        push(term.related[r]);
      }
    }

    return fields;
  }

  /**
   * termMatchesQuery(term, needle) — 检查术语是否匹配搜索词
   * needle 已过 toLowerCase().trim().normalize('NFC')
   */
  function termMatchesQuery(term, needle) {
    if (!needle) return true;
    var fields = collectSearchFields(term);
    var cleanNeedle = needle.replace(/\s+/g, "");
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (f.indexOf(needle) !== -1) return true;
      if (cleanNeedle && f.replace(/\s+/g, "").indexOf(cleanNeedle) !== -1) return true;
    }
    return false;
  }

  /**
   * getSearchBoost(term) — 读取搜索权重
   * 预留函数，本轮不启用排序。
   */
  function getSearchBoost(term) {
    var boost = term && term.searchBoost;
    return Number.isFinite(boost) ? boost : 1;
  }

  function filterTerms(terms, query, category) {
    var needle = String(query || "").toLowerCase().trim().normalize("NFC");
    var filtered = terms.filter(function (term) {
      if (category !== "all" && term.category !== category) return false;
      if (!needle) return true;
      return termMatchesQuery(term, needle);
    });

    if (!needle) return filtered;

    var cleanNeedle = needle.replace(/\s+/g, "");

    // Calculate score and sort
    var scored = filtered.map(function (term) {
      var score = 0;

      // 1. Exact ID or clean ID match
      var cleanId = String(term.id || "").toLowerCase().replace(/[_-]/g, " ");
      if (cleanId === needle) {
        score += 100;
      } else if (cleanId.indexOf(needle) !== -1) {
        score += 40;
      }

      // 2. Term matches (exact vs substring vs space-removed)
      var langs = ["ja", "zh", "en", "ko"];
      for (var l = 0; l < langs.length; l++) {
        var langBlock = term[langs[l]];
        if (langBlock && langBlock.term) {
          var tVal = String(langBlock.term).toLowerCase().normalize("NFC");
          var cleanT = tVal.replace(/\s+/g, "");
          if (tVal === needle) {
            score += 80;
          } else if (tVal.indexOf(needle) !== -1 || (cleanNeedle && cleanT.indexOf(cleanNeedle) !== -1)) {
            score += 30;
          }
        }
      }

      // 3. Alias matches
      if (Array.isArray(term.aliases)) {
        for (var a = 0; a < term.aliases.length; a++) {
          var aliasVal = String(term.aliases[a]).toLowerCase().normalize("NFC");
          var cleanA = aliasVal.replace(/\s+/g, "");
          if (aliasVal === needle) {
            score += 60;
          } else if (aliasVal.indexOf(needle) !== -1 || (cleanNeedle && cleanA.indexOf(cleanNeedle) !== -1)) {
            score += 25;
          }
        }
      }

      // 4. Explanation matches
      for (var l = 0; l < langs.length; l++) {
        var langBlock = term[langs[l]];
        if (langBlock && langBlock.explanation) {
          var eVal = String(langBlock.explanation).toLowerCase().normalize("NFC");
          var cleanE = eVal.replace(/\s+/g, "");
          if (eVal.indexOf(needle) !== -1 || (cleanNeedle && cleanE.indexOf(cleanNeedle) !== -1)) {
            score += 10;
          }
        }
      }

      // Apply searchBoost
      var boost = Number(term.searchBoost);
      var searchBoost = Number.isFinite(boost) ? boost : 1;
      score = score * searchBoost;

      return { term: term, score: score };
    });

    scored.sort(function (a, b) {
      return b.score - a.score;
    });

    return scored.map(function (item) {
      return item.term;
    });
  }

  /* ---- Rendering ---- */

  function buildTermCard(term) {
    /* ---- Info section ---- */
    var lang = normalizeLang(getLanguage());
    var langData = term[lang];
    var card = document.createElement("div");
    card.className = "glossary-card";
    card.setAttribute("data-term-id", term.id);

    /* needsReview badge */
    if (langData && langData.needsReview) {
      var reviewBadge = document.createElement("div");
      reviewBadge.className = "glossary-needs-review";
      reviewBadge.textContent = t("glossary.needsReview");
      card.appendChild(reviewBadge);
    }

    /* ja term */
    var jaMain = document.createElement("div");
    jaMain.className = "glossary-term-main";
    jaMain.textContent = (term.ja && term.ja.term) || term.id;
    card.appendChild(jaMain);

    /* en term */
    var enMain = document.createElement("div");
    enMain.className = "glossary-term-en";
    enMain.textContent = (term.en && term.en.term) || "";
    card.appendChild(enMain);

    /* current lang explanation */
    if (langData && langData.explanation) {
      var expRow = document.createElement("div");
      expRow.className = "glossary-lang-row";
      var expLabel = document.createElement("span");
      expLabel.className = "glossary-lang-label";
      expLabel.textContent = t("glossary.currentLanguage") + ": ";
      expRow.appendChild(expLabel);
      expRow.appendChild(document.createTextNode(langData.explanation));
      card.appendChild(expRow);
    }

    /* aliases */
    if (Array.isArray(term.aliases) && term.aliases.length > 0) {
      var aliasRow = document.createElement("div");
      aliasRow.className = "glossary-lang-row";
      var aliasLabel = document.createElement("span");
      aliasLabel.className = "glossary-lang-label";
      aliasLabel.textContent = t("glossary.aliases") + ": ";
      aliasRow.appendChild(aliasLabel);
      term.aliases.forEach(function (a, i) {
        var chip = document.createElement("span");
        chip.className = "glossary-chip";
        chip.textContent = a;
        aliasRow.appendChild(chip);
      });
      card.appendChild(aliasRow);
    }

    /* related terms */
    if (Array.isArray(term.related) && term.related.length > 0) {
      var relRow = document.createElement("div");
      relRow.className = "glossary-lang-row";
      var relLabel = document.createElement("span");
      relLabel.className = "glossary-lang-label";
      relLabel.textContent = t("glossary.relatedTerms") + ": ";
      relRow.appendChild(relLabel);
      term.related.forEach(function (r, i) {
        var relatedTerm = getTermById(r);
        if (relatedTerm) {
          var btn = document.createElement("button");
          btn.className = "glossary-related-btn";
          btn.textContent = (relatedTerm.ja && relatedTerm.ja.term) || r;
          btn.addEventListener("click", function () {
            state.selectedId = r;
            state.query = "";
            render();
          });
          relRow.appendChild(btn);
          if (i < term.related.length - 1) {
            relRow.appendChild(document.createTextNode(", "));
          }
        }
      });
      card.appendChild(relRow);
    }

    /* example */
    if (term.example && typeof term.example === "object") {
      var exampleText = term.example.sql || term.example.java || term.example.python || term.example.text || "";
      if (exampleText) {
        var exTitle = document.createElement("div");
        exTitle.className = "glossary-lang-row";
        exTitle.style.marginTop = "6px";
        exTitle.style.fontWeight = "600";
        exTitle.style.fontSize = "12px";
        exTitle.style.color = "var(--neon-purple, #a78bfa)";
        exTitle.textContent = t("glossary.example") + ":";
        card.appendChild(exTitle);

        var exBlock = document.createElement("div");
        exBlock.className = "glossary-example-block";
        exBlock.textContent = exampleText;
        card.appendChild(exBlock);
      }
    }

    return card;
  }

  function render() {
    var container = document.getElementById("glossary-results");
    var countEl = document.getElementById("glossary-count");
    if (!container) return;

    var terms = getTerms();
    if (terms.length === 0) {
      container.innerHTML = "";
      if (countEl) countEl.textContent = "";
      return;
    }

    /* If selectedId is set, scroll to that card */
    if (state.selectedId) {
      /* temporarily override query + category to show the selected term */
      /* actually we keep the filter but may scroll */
    }

    var filtered = filterTerms(terms, state.query, state.category);

    if (countEl) {
      countEl.textContent = t("glossary.resultCount", { count: String(filtered.length) });
    }

    if (filtered.length === 0) {
      container.innerHTML = "<div class=\"glossary-empty\">" + escapeHtml(t("glossary.noResults")) + "</div>";
      return;
    }

    /* Build all cards */
    container.innerHTML = "";
    filtered.forEach(function (term) {
      container.appendChild(buildTermCard(term));
    });

    /* Scroll to selected if needed */
    if (state.selectedId) {
      var target = container.querySelector("[data-term-id=\"" + state.selectedId + "\"]");
      if (target) {
        target.scrollIntoView({ block: "nearest", behavior: "smooth" });
        target.style.borderColor = "var(--neon-cyan, #22d3ee)";
        setTimeout(function () {
          target.style.borderColor = "";
        }, 2000);
      }
      state.selectedId = null;
    }
  }

  /* ---- Open / Close ---- */

  function open() {
    var modal = document.getElementById("glossary-modal");
    if (!modal) return;
    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    state.query = "";
    state.category = "all";
    state.selectedId = null;

    var search = document.getElementById("glossary-search");
    if (search) search.value = "";
    var clearBtn = document.getElementById("glossary-search-clear");
    if (clearBtn) clearBtn.style.display = "none";

    render();

    /* Focus search input */
    if (search) setTimeout(function () { search.focus(); }, 100);
  }

  function close() {
    var modal = document.getElementById("glossary-modal");
    if (!modal) return;
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  function isOpen() {
    var modal = document.getElementById("glossary-modal");
    return modal && modal.hasAttribute ? !modal.hasAttribute("hidden") : false;
  }

  /* ---- Init ---- */

  function init() {
    /* Check data exists */
    if (!window.IT_TERMS_GLOSSARY || !Array.isArray(window.IT_TERMS_GLOSSARY)) {
      console.warn("[Glossary] IT_TERMS_GLOSSARY not available — glossary disabled");
      return;
    }

    /* Open button */
    var openBtn = document.getElementById("glossary-open-btn");
    if (openBtn) {
      openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        open();
      });
    }

    /* Close triggers */
    var closeTriggers = document.querySelectorAll("[data-glossary-close]");
    for (var i = 0; i < closeTriggers.length; i++) {
      closeTriggers[i].addEventListener("click", function (e) {
        close();
      });
    }

    /* Escape */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var modal = document.getElementById("glossary-modal");
        if (modal && !modal.hasAttribute("hidden")) {
          close();
        }
      }
    });

    /* Search input */
    var search = document.getElementById("glossary-search");
    var clearBtn = document.getElementById("glossary-search-clear");

    function updateClearButtonVisibility() {
      if (clearBtn) {
        clearBtn.style.display = (search && search.value) ? "flex" : "none";
      }
    }

    if (search) {
      search.addEventListener("input", function (e) {
        state.query = e.target.value;
        state.selectedId = null;
        updateClearButtonVisibility();
        render();
      });
      search.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && search.value) {
          e.stopPropagation();
          search.value = "";
          state.query = "";
          state.selectedId = null;
          updateClearButtonVisibility();
          render();
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        if (search) {
          search.value = "";
          search.focus();
        }
        state.query = "";
        state.selectedId = null;
        updateClearButtonVisibility();
        render();
      });
    }

    /* Category filter */
    var filter = document.getElementById("glossary-category-filter");
    if (filter) {
      filter.addEventListener("change", function (e) {
        state.category = e.target.value;
        state.selectedId = null;
        render();
      });
    }

    /* Language change: re-render Modal and apply static UI if open */
    document.addEventListener("i18n:languageChanged", function () {
      if (!isOpen()) return;
      if (window.I18n && typeof window.I18n.applyStaticUI === "function") {
        window.I18n.applyStaticUI(document.getElementById("glossary-modal"));
      }
      render();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* Expose public API */
  window.Glossary = {
    open: open,
    close: close,
    render: render
  };
})();
