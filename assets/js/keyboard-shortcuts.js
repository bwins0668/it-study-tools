/**
 * Keyboard Shortcuts Help Dialog
 * Round 108.0 - Keyboard shortcuts reference and help system
 * Round 136.0 - Ported from archive, innerHTML replaced with safe DOM API
 * Round 136.1 - Centralized UI strings via SHORTCUT_LABELS + i18n fallback
 */

(function() {
  "use strict";

  var SHORTCUT_LABELS = {
    title: "Keyboard Shortcuts",
    hintPress: "Press ",
    hintSuffix: " anytime to show this dialog",
    closeButton: "Got it!"
  };

  function getShortcutLabel(key) {
    if (window.I18n && typeof window.I18n.t === "function") {
      var val = window.I18n.t("keyboardShortcuts." + key);
      if (val && val !== ("keyboardShortcuts." + key)) return val;
    }
    return SHORTCUT_LABELS[key] || key;
  }

  var KeyboardShortcuts = {
    shortcuts: [
      { category: "General", key: "Ctrl + /", descriptionKey: "toggleTools" },
      { category: "General", key: "Esc", descriptionKey: "closeDialogs" },
      { category: "General", key: "Ctrl + S", descriptionKey: "saveProgress" },
      { category: "Python Sandbox", key: "Ctrl + Enter", descriptionKey: "runPython" },
      { category: "Python Sandbox", key: "Ctrl + L", descriptionKey: "clearPython" },
      { category: "Python Sandbox", key: "Ctrl + C", descriptionKey: "copyPython" },
      { category: "Python Sandbox", key: "Ctrl + T", descriptionKey: "togglePythonTmpl" },
      { category: "Java Sandbox", key: "Ctrl + Enter", descriptionKey: "runJava" },
      { category: "Java Sandbox", key: "Ctrl + L", descriptionKey: "clearJava" },
      { category: "Java Sandbox", key: "Ctrl + C", descriptionKey: "copyJava" },
      { category: "Java Sandbox", key: "Ctrl + T", descriptionKey: "toggleJavaTmpl" },
      { category: "Navigation", key: "Ctrl + 1", descriptionKey: "switchSql" },
      { category: "Navigation", key: "Ctrl + 2", descriptionKey: "switchItTerm" },
      { category: "Navigation", key: "Ctrl + 3", descriptionKey: "switchPython" },
      { category: "Navigation", key: "Ctrl + 4", descriptionKey: "switchJava" },
      { category: "Navigation", key: "Ctrl + 5", descriptionKey: "switchTyping" },
      { category: "Study", key: "Ctrl + Shift + N", descriptionKey: "nextLesson" },
      { category: "Study", key: "Ctrl + Shift + P", descriptionKey: "prevLesson" },
      { category: "Study", key: "Ctrl + Shift + Q", descriptionKey: "startQuiz" }
    ],

    init: function() {
      document.addEventListener("keydown", function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === "/") {
          e.preventDefault();
          KeyboardShortcuts.showHelpDialog();
        }
      });

      console.log("[KeyboardShortcuts] Initialized.");
    },

    getCategoryLabel: function(cat) {
      var catKey = cat.toLowerCase().replace(/\s+/g, "");
      var i18nKey = "keyboardShortcuts.cat." + catKey;
      if (window.I18n && typeof window.I18n.t === "function") {
        var val = window.I18n.t(i18nKey);
        if (val && val !== i18nKey) return val;
      }
      return cat;
    },

    getDescription: function(s) {
      var i18nKey = "keyboardShortcuts.desc." + s.descriptionKey;
      if (window.I18n && typeof window.I18n.t === "function") {
        var val = window.I18n.t(i18nKey);
        if (val && val !== i18nKey) return val;
      }
      return s.descriptionKey
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, function(m) { return m.toUpperCase(); })
        .trim();
    },

    showHelpDialog: function() {
      var overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;";

      var dialog = document.createElement("div");
      dialog.style.cssText = "background:#1e1e1e;color:#d4d4d4;padding:20px;border-radius:8px;max-width:600px;max-height:80vh;overflow:auto;font-family:monospace;";

      var title = document.createElement("h3");
      title.style.cssText = "margin-top:0;color:#569cd6;";
      title.textContent = getShortcutLabel("title");
      dialog.appendChild(title);

      var hint = document.createElement("p");
      hint.style.cssText = "color:#858585;margin-bottom:15px;";
      hint.appendChild(document.createTextNode(getShortcutLabel("hintPress")));
      var hintKbd = document.createElement("kbd");
      hintKbd.style.cssText = "background:#3c3c3c;padding:2px 6px;border-radius:3px;";
      hintKbd.textContent = "Ctrl+Shift+/";
      hint.appendChild(hintKbd);
      hint.appendChild(document.createTextNode(getShortcutLabel("hintSuffix")));
      dialog.appendChild(hint);

      var categories = {};
      this.shortcuts.forEach(function(s) {
        if (!categories[s.category]) categories[s.category] = [];
        categories[s.category].push(s);
      });

      Object.keys(categories).forEach(function(cat) {
        var catTitle = document.createElement("h4");
        catTitle.style.cssText = "color:#4ec9b0;margin:15px 0 10px 0;";
        catTitle.textContent = KeyboardShortcuts.getCategoryLabel(cat);
        dialog.appendChild(catTitle);

        var wrap = document.createElement("div");
        wrap.style.marginLeft = "10px";

        categories[cat].forEach(function(s) {
          var row = document.createElement("div");
          row.style.cssText = "display:flex;justify-content:space-between;margin-bottom:8px;padding:5px;border-bottom:1px solid #3c3c3c;";

          var keySpan = document.createElement("span");
          keySpan.style.cssText = "color:#9cdcfe;font-size:12px;";
          var kbd = document.createElement("kbd");
          kbd.style.cssText = "background:#3c3c3c;padding:2px 6px;border-radius:3px;";
          kbd.textContent = s.key;
          keySpan.appendChild(kbd);

          var descSpan = document.createElement("span");
          descSpan.style.cssText = "color:#d4d4d4;font-size:12px;flex:1;margin-left:15px;";
          descSpan.textContent = KeyboardShortcuts.getDescription(s);

          row.appendChild(keySpan);
          row.appendChild(descSpan);
          wrap.appendChild(row);
        });

        dialog.appendChild(wrap);
      });

      var btnWrap = document.createElement("div");
      btnWrap.style.cssText = "margin-top:20px;display:flex;gap:10px;justify-content:flex-end;";
      var closeBtn = document.createElement("button");
      closeBtn.style.cssText = "padding:8px 16px;background:#0e639c;color:white;border:none;border-radius:4px;cursor:pointer;";
      closeBtn.textContent = getShortcutLabel("closeButton");
      closeBtn.addEventListener("click", function() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      });
      btnWrap.appendChild(closeBtn);
      dialog.appendChild(btnWrap);

      overlay.appendChild(dialog);

      overlay.addEventListener("click", function(e) {
        if (e.target === overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      });

      var escHandler = function(e) {
        if (e.key === "Escape" && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
          document.removeEventListener("keydown", escHandler);
        }
      };
      document.addEventListener("keydown", escHandler);

      document.body.appendChild(overlay);
    },

    register: function(shortcut) {
      this.shortcuts.push(shortcut);
    }
  };

  window.KeyboardShortcuts = KeyboardShortcuts;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      try { KeyboardShortcuts.init(); } catch(e) { console.warn("[KeyboardShortcuts]", e); }
    });
  } else {
    try { KeyboardShortcuts.init(); } catch(e) { console.warn("[KeyboardShortcuts]", e); }
  }
})();
