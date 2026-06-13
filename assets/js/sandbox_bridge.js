(function() {
  'use strict';

  var SB = {
    detectAvailability: function(lang) {
      if (lang === 'python') return typeof window.PythonSandbox !== 'undefined';
      if (lang === 'java') return typeof window.JavaSandbox !== 'undefined';
      if (lang === 'sql') return true; // SQL is always available via DOM
      return false;
    },

    canItemRunInSandbox: function(item) {
      if (!item) return false;
      if (!item.sandboxRunnable) return false;
      if (item.language === 'symbol') return false;
      return SB.detectAvailability(item.language);
    },

    sendCode: function(lang, code) {
      if (!code) return;
      if (lang === 'python') {
        if (typeof window.PythonSandbox !== 'undefined') {
          PythonSandbox.setTemplate(code);
          SB.openSandboxPanel('python');
        } else {
          console.warn('PythonSandbox not available');
        }
      } else if (lang === 'java') {
        if (typeof window.JavaSandbox !== 'undefined') {
          JavaSandbox.setTemplate(code);
          SB.openSandboxPanel('java');
        } else {
          console.warn('JavaSandbox not available');
        }
      } else if (lang === 'sql') {
        var el = document.getElementById('sql-editor');
        if (el) {
          el.value = code;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          SB.openSandboxPanel('sql');
        }
      }
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
      // Try to switch to the correct subject tab so sandbox is visible
      if (lang === 'python') {
        // Python sandbox cards have class python-widget
        var cards = document.querySelectorAll('.python-widget');
        cards.forEach(function(el) { el.style.display = ''; });
        // Collapse others
        document.querySelectorAll('.sql-widget').forEach(function(el) { el.style.display = 'none'; });
        document.querySelectorAll('.java-widget').forEach(function(el) { el.style.display = 'none'; });
        // If in coding typing mode, try to show sandbox area
        if (document.body.classList.contains('mode-coding-typing')) {
          SB._ensurePlaygroundVisible();
        }
      } else if (lang === 'java') {
        document.querySelectorAll('.java-widget').forEach(function(el) { el.style.display = ''; });
        document.querySelectorAll('.sql-widget').forEach(function(el) { el.style.display = 'none'; });
        document.querySelectorAll('.python-widget').forEach(function(el) { el.style.display = 'none'; });
        if (document.body.classList.contains('mode-coding-typing')) {
          SB._ensurePlaygroundVisible();
        }
      } else if (lang === 'sql') {
        document.querySelectorAll('.sql-widget').forEach(function(el) { el.style.display = ''; });
        document.querySelectorAll('.java-widget').forEach(function(el) { el.style.display = 'none'; });
        document.querySelectorAll('.python-widget').forEach(function(el) { el.style.display = 'none'; });
        if (document.body.classList.contains('mode-coding-typing')) {
          SB._ensurePlaygroundVisible();
        }
      }
    },

    _ensurePlaygroundVisible: function() {
      // Temporarily exit full coding-typing mode to allow play area to be visible
      var hub = document.getElementById('coding-typing-hub');
      if (hub) {
        hub.style.display = 'block';
        hub.classList.add('is-active');
      }
      // Open mobile playground drawer if on mobile
      if (typeof toggleMobilePlayground === 'function') {
        // Check if mobile by viewport width
        if (window.innerWidth < 768) {
          toggleMobilePlayground();
        }
      }
    }
  };

  window.StudyToolsSandboxBridge = SB;
})();
