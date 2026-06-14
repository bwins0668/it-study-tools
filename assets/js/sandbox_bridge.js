(function() {
  'use strict';

  var SB = {
    detectAvailability: function(lang) {
      if (lang === 'python') {
        return !!(window.PythonSandbox && typeof window.PythonSandbox.setTemplate === 'function');
      }
      if (lang === 'java') {
        return !!(window.JavaSandbox && typeof window.JavaSandbox.setTemplate === 'function');
      }
      if (lang === 'sql') return !!document.getElementById('sql-editor');
      return false;
    },

    canItemRunInSandbox: function(item) {
      if (!item) return false;
      if (!item.sandboxRunnable) return false;
      if (item.language === 'symbol') return false;
      return SB.detectAvailability(item.language);
    },

    sendCode: function(lang, code) {
      if (!code || !SB.detectAvailability(lang)) return Promise.resolve(false);

      return SB.openSandboxPanel(lang).then(function(opened) {
        if (!opened) return false;

        try {
          if (lang === 'python') {
            window.PythonSandbox.setTemplate(code);
          } else if (lang === 'java') {
            window.JavaSandbox.setTemplate(code);
          } else if (lang === 'sql') {
            var el = document.getElementById('sql-editor');
            if (!el) return false;
            el.value = code;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.focus();
          } else {
            return false;
          }
          return true;
        } catch (err) {
          console.warn('[SandboxBridge] Failed to inject code:', err);
          return false;
        }
      }).catch(function(err) {
        console.warn('[SandboxBridge] Failed to open sandbox:', err);
        return false;
      });
    },

    runCode: function(lang) {
      if (lang === 'python') {
        if (typeof window.PythonSandbox !== 'undefined') {
          PythonSandbox.runCode();
          return true;
        }
      } else if (lang === 'java') {
        if (typeof window.JavaSandbox !== 'undefined') {
          JavaSandbox.runCode();
          return true;
        }
      } else if (lang === 'sql') {
        if (typeof window.runPlaygroundQuery === 'function') {
          runPlaygroundQuery();
          return true;
        }
      }
      return false;
    },

    openSandboxPanel: function(lang) {
      if (['python', 'java', 'sql'].indexOf(lang) === -1) return Promise.resolve(false);

      var switchAvailable = typeof window.switchSubject === 'function';
      try {
        if (switchAvailable) window.switchSubject(lang);
      } catch (err) {
        console.warn('[SandboxBridge] Subject switch unavailable:', err);
      }

      return new Promise(function(resolve) {
        var schedule = window.requestAnimationFrame || function(callback) {
          return window.setTimeout(callback, 0);
        };
        schedule(function() {
          schedule(function() {
            var tab = document.getElementById('subject-tab-' + lang);
            if (switchAvailable && tab && !tab.classList.contains('active')) {
              resolve(false);
              return;
            }

            SB._showLanguageWidgets(lang);
            SB._ensurePlaygroundVisible();

            var editor = SB._getEditor(lang);
            if (editor && typeof editor.focus === 'function') editor.focus();
            resolve(!!editor);
          });
        });
      });
    },

    _getEditor: function(lang) {
      return document.getElementById(lang + '-editor');
    },

    _showLanguageWidgets: function(lang) {
      ['sql', 'java', 'python'].forEach(function(widgetLang) {
        document.querySelectorAll('.' + widgetLang + '-widget').forEach(function(el) {
          el.style.display = widgetLang === lang ? '' : 'none';
        });
      });
    },

    _ensurePlaygroundVisible: function() {
      var playground = document.getElementById('playground-section');
      if (!playground) return false;

      if (window.innerWidth <= 900) {
        document.body.classList.add('mobile-playground-open');
        document.body.classList.remove('mobile-sidebar-open');
      }
      return true;
    }
  };

  window.StudyToolsSandboxBridge = SB;
})();
