/**
 * Keyboard Shortcuts Help Dialog
 * Round 108.0 - Keyboard shortcuts reference and help system
 * Round 136.0 - Ported from archive, innerHTML replaced with safe DOM API
 */

(function() {
  'use strict';

  const KeyboardShortcuts = {
    shortcuts: [
      { category: 'General', key: 'Ctrl + /', description: 'Toggle tools drawer' },
      { category: 'General', key: 'Esc', description: 'Close dialogs / Cancel' },
      { category: 'General', key: 'Ctrl + S', description: 'Save progress (export data)' },
      { category: 'Python Sandbox', key: 'Ctrl + Enter', description: 'Run Python code' },
      { category: 'Python Sandbox', key: 'Ctrl + L', description: 'Clear Python editor' },
      { category: 'Python Sandbox', key: 'Ctrl + C', description: 'Copy Python code' },
      { category: 'Python Sandbox', key: 'Ctrl + T', description: 'Toggle Python template' },
      { category: 'Java Sandbox', key: 'Ctrl + Enter', description: 'Run Java code' },
      { category: 'Java Sandbox', key: 'Ctrl + L', description: 'Clear Java editor' },
      { category: 'Java Sandbox', key: 'Ctrl + C', description: 'Copy Java code' },
      { category: 'Java Sandbox', key: 'Ctrl + T', description: 'Toggle Java template' },
      { category: 'Navigation', key: 'Ctrl + 1', description: 'Switch to SQL mode' },
      { category: 'Navigation', key: 'Ctrl + 2', description: 'Switch to IT Terminology mode' },
      { category: 'Navigation', key: 'Ctrl + 3', description: 'Switch to Python mode' },
      { category: 'Navigation', key: 'Ctrl + 4', description: 'Switch to Java mode' },
      { category: 'Navigation', key: 'Ctrl + 5', description: 'Switch to Typing mode' },
      { category: 'Study', key: 'Ctrl + Shift + N', description: 'Next lesson' },
      { category: 'Study', key: 'Ctrl + Shift + P', description: 'Previous lesson' },
      { category: 'Study', key: 'Ctrl + Shift + Q', description: 'Start quiz' }
    ],

    init() {
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === '/') {
          e.preventDefault();
          this.showHelpDialog();
        }
      });

      console.log('[KeyboardShortcuts] Initialized. Press Ctrl+Shift+/ to show help.');
    },

    /**
     * Show help dialog — uses createElement / textContent only (no innerHTML).
     */
    showHelpDialog() {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;';

      const dialog = document.createElement('div');
      dialog.style.cssText = 'background:#1e1e1e;color:#d4d4d4;padding:20px;border-radius:8px;max-width:600px;max-height:80vh;overflow:auto;font-family:monospace;';

      // Title
      const title = document.createElement('h3');
      title.style.cssText = 'margin-top:0;color:#569cd6;';
      title.textContent = 'Keyboard Shortcuts';
      dialog.appendChild(title);

      // Hint
      const hint = document.createElement('p');
      hint.style.cssText = 'color:#858585;margin-bottom:15px;';
      hint.textContent = 'Press ';
      const hintKbd = document.createElement('kbd');
      hintKbd.style.cssText = 'background:#3c3c3c;padding:2px 6px;border-radius:3px;';
      hintKbd.textContent = 'Ctrl+Shift+/';
      hint.appendChild(hintKbd);
      hint.appendChild(document.createTextNode(' anytime to show this dialog'));
      dialog.appendChild(hint);

      // Group by category
      const categories = {};
      this.shortcuts.forEach(s => {
        if (!categories[s.category]) categories[s.category] = [];
        categories[s.category].push(s);
      });

      Object.keys(categories).forEach(cat => {
        const catTitle = document.createElement('h4');
        catTitle.style.cssText = 'color:#4ec9b0;margin:15px 0 10px 0;';
        catTitle.textContent = cat;
        dialog.appendChild(catTitle);

        const wrap = document.createElement('div');
        wrap.style.marginLeft = '10px';

        categories[cat].forEach(s => {
          const row = document.createElement('div');
          row.style.cssText = 'display:flex;justify-content:space-between;margin-bottom:8px;padding:5px;border-bottom:1px solid #3c3c3c;';

          const keySpan = document.createElement('span');
          keySpan.style.cssText = 'color:#9cdcfe;font-size:12px;';
          const kbd = document.createElement('kbd');
          kbd.style.cssText = 'background:#3c3c3c;padding:2px 6px;border-radius:3px;';
          kbd.textContent = s.key;
          keySpan.appendChild(kbd);

          const descSpan = document.createElement('span');
          descSpan.style.cssText = 'color:#d4d4d4;font-size:12px;flex:1;margin-left:15px;';
          descSpan.textContent = s.description;

          row.appendChild(keySpan);
          row.appendChild(descSpan);
          wrap.appendChild(row);
        });

        dialog.appendChild(wrap);
      });

      // Close button
      const btnWrap = document.createElement('div');
      btnWrap.style.cssText = 'margin-top:20px;display:flex;gap:10px;justify-content:flex-end;';
      const closeBtn = document.createElement('button');
      closeBtn.style.cssText = 'padding:8px 16px;background:#0e639c;color:white;border:none;border-radius:4px;cursor:pointer;';
      closeBtn.textContent = 'Got it!';
      closeBtn.addEventListener('click', () => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      });
      btnWrap.appendChild(closeBtn);
      dialog.appendChild(btnWrap);

      overlay.appendChild(dialog);

      // Click overlay to close
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      });

      // Esc to close
      const escHandler = (e) => {
        if (e.key === 'Escape' && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);

      document.body.appendChild(overlay);
    },

    register(shortcut) {
      this.shortcuts.push(shortcut);
    }
  };

  window.KeyboardShortcuts = KeyboardShortcuts;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      try { KeyboardShortcuts.init(); } catch(e) { console.warn('[KeyboardShortcuts]', e); }
    });
  } else {
    try { KeyboardShortcuts.init(); } catch(e) { console.warn('[KeyboardShortcuts]', e); }
  }
})();
