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

    sendCode: function(lang, code, item) {
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
            SB._pendingSqlItem = item && (item.sqlSchema || item.sqlSeed) ? item : null;
            SB._installSqlRunHooks();
            el.value = SB._pendingSqlItem
              ? [item.sqlSchema, item.sqlSeed, code].filter(Boolean).join('\n\n')
              : code;
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
          SB._preparePendingSqlRun();
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

    _pendingSqlItem: null,
    _sqlRunHooksInstalled: false,

    _installSqlRunHooks: function() {
      if (SB._sqlRunHooksInstalled) return;
      SB._sqlRunHooksInstalled = true;

      document.addEventListener('click', function(event) {
        var button = event.target && event.target.closest
          ? event.target.closest('#run-query-btn')
          : null;
        if (button) SB._preparePendingSqlRun();
      }, true);

      document.addEventListener('keydown', function(event) {
        if (event.key !== 'Enter' || (!event.ctrlKey && !event.metaKey)) return;
        if (event.target && event.target.id === 'sql-editor') {
          SB._preparePendingSqlRun();
        }
      }, true);
    },

    _preparePendingSqlRun: function() {
      var item = SB._pendingSqlItem;
      if (!item) return true;

      try {
        if (!SB._applySqlFixture(item)) return false;

        var editor = document.getElementById('sql-editor');
        if (!editor) return false;
        editor.value = String(item.code || '').replace(/\bINNER\s+JOIN\b/gi, 'JOIN');
        editor.dispatchEvent(new Event('input', { bubbles: true }));
        editor.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      } catch (err) {
        console.warn('[SandboxBridge] Failed to prepare SQL fixture:', err);
        return false;
      }
    },

    _applySqlFixture: function(item) {
      if (typeof sqlEngine === 'undefined' || !sqlEngine || !sqlEngine.db) return false;

      String(item.sqlSchema || '').split(';').forEach(function(statement) {
        var sql = statement.trim();
        if (!sql) return;

        var dropMatch = sql.match(/^DROP\s+TABLE\s+IF\s+EXISTS\s+(\w+)$/i);
        if (dropMatch) {
          delete sqlEngine.db[dropMatch[1].toLowerCase()];
          return;
        }

        var createMatch = sql.match(/^CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?\s+(\w+)\s*\(/i);
        if (createMatch) sqlEngine.db[createMatch[1].toLowerCase()] = [];
      });

      String(item.sqlSeed || '').split(';').forEach(function(statement) {
        var sql = statement.trim();
        if (!sql) return;

        var insertMatch = sql.match(/^INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([\s\S]+)\)$/i);
        if (!insertMatch) return;

        var tableName = insertMatch[1].toLowerCase();
        var columns = insertMatch[2].split(',').map(function(column) {
          return column.trim();
        });
        var values = SB._splitSqlValues(insertMatch[3]).map(SB._parseSqlValue);
        var row = {};
        columns.forEach(function(column, index) {
          row[column] = values[index];
        });
        if (!sqlEngine.db[tableName]) sqlEngine.db[tableName] = [];
        sqlEngine.db[tableName].push(row);
      });

      return true;
    },

    _splitSqlValues: function(source) {
      var values = [];
      var current = '';
      var quoted = false;

      for (var i = 0; i < source.length; i += 1) {
        var char = source[i];
        if (char === "'") {
          if (quoted && source[i + 1] === "'") {
            current += "''";
            i += 1;
            continue;
          }
          quoted = !quoted;
        }
        if (char === ',' && !quoted) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      return values;
    },

    _parseSqlValue: function(value) {
      var text = String(value).trim();
      if (/^NULL$/i.test(text)) return null;
      if (/^'.*'$/.test(text)) return text.slice(1, -1).replace(/''/g, "'");
      if (/^-?\d+(?:\.\d+)?$/.test(text)) return Number(text);
      return text;
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
