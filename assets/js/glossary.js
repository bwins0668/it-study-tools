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

  function getTerms() {
    return Array.isArray(window.IT_TERMS_GLOSSARY) ? window.IT_TERMS_GLOSSARY : [];
  }

  function getTermById(id) {
    if (window.IT_TERMS_BY_ID && window.IT_TERMS_BY_ID[id]) {
      return window.IT_TERMS_BY_ID[id];
    }
    return getTerms().filter(function (t) { return t.id === id; })[0] || null;
  }

  /* ---- Filtering & Search ---- */

  function filterTerms(terms, query, category) {
    var needle = String(query || "").toLowerCase().trim();
    return terms.filter(function (term) {
      if (category !== "all" && term.category !== category) return false;
      if (!needle) return true;
      if (term.id.toLowerCase().includes(needle)) return true;
      if (term.ja && term.ja.term && term.ja.term.toLowerCase().includes(needle)) return true;
      if (term.zh && term.zh.term && term.zh.term.toLowerCase().includes(needle)) return true;
      if (term.en && term.en.term && term.en.term.toLowerCase().includes(needle)) return true;
      if (Array.isArray(term.aliases)) {
        for (var i = 0; i < term.aliases.length; i++) {
          if (term.aliases[i].toLowerCase().includes(needle)) return true;
        }
      }
      return false;
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
    render();

    /* Focus search input */
    var search = document.getElementById("glossary-search");
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
    if (search) {
      search.addEventListener("input", function (e) {
        state.query = e.target.value;
        state.selectedId = null;
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
