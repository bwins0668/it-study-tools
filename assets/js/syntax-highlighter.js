/**
 * Syntax Highlighting Improvements for Java/Python Sandbox
 * Round 110.0 - Enhanced syntax highlighting and code preprocessing
 * Round 136.0 - Ported from archive (safe: innerHTML renders pre-escaped code only)
 */

(function() {
  'use strict';

  const SyntaxHighlighter = {
    keywords: {
      python: ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'import', 'from', 'return', 'yield', 'try', 'except', 'finally', 'with', 'as', 'pass', 'break', 'continue', 'lambda', 'and', 'or', 'not', 'in', 'is', 'None', 'True', 'False'],
      java: ['public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw', 'throws', 'new', 'this', 'super', 'import', 'package', 'void', 'int', 'double', 'float', 'boolean', 'char', 'long', 'short', 'byte', 'String', 'null', 'true', 'false']
    },

    /**
     * Initialize syntax highlighter
     */
    init() {
      console.log('[SyntaxHighlighter] Initialized');
      this.enhanceHighlighting();
    },

    /**
     * Enhance existing highlighting
     */
    enhanceHighlighting() {
      setTimeout(() => {
        const pythonEditor = document.getElementById('python-editor');
        const javaEditor = document.getElementById('java-editor');

        if (pythonEditor) {
          pythonEditor.addEventListener('input', () => this.updateHighlight('python'));
        }

        if (javaEditor) {
          javaEditor.addEventListener('input', () => this.updateHighlight('java'));
        }
      }, 1000);
    },

    /**
     * Update syntax highlight overlay (no-op if overlay elements don't exist)
     */
    updateHighlight(language) {
      const editor = language === 'python'
        ? document.getElementById('python-editor')
        : document.getElementById('java-editor');

      const highlight = language === 'python'
        ? document.getElementById('python-highlight-overlay')
        : document.getElementById('java-highlight-overlay');

      if (!editor || !highlight) return;

      const code = editor.value;
      const highlighted = this.highlight(code, language);
      highlight.innerHTML = highlighted;
    },

    /**
     * Highlight code — escapes HTML first, then wraps tokens in spans.
     * Safe: user code is always HTML-escaped before any span insertion.
     */
    highlight(code, language) {
      let html = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      const keywords = this.keywords[language] || [];
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        html = html.replace(regex, `<span class="syntax-keyword">${keyword}</span>`);
      });

      html = html.replace(/(["'])(?:(?!\1|\\).|\\.|\n)*\1/g, '<span class="syntax-string">$&</span>');

      if (language === 'python') {
        html = html.replace(/(#.*)$/gm, '<span class="syntax-comment">$1</span>');
      } else if (language === 'java') {
        html = html.replace(/(\/\/.*)$/gm, '<span class="syntax-comment">$1</span>');
        html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syntax-comment">$1</span>');
      }

      html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="syntax-number">$1</span>');
      html = html.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');

      return html;
    },

    /**
     * Add syntax highlighting CSS
     */
    addStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .syntax-keyword { color: #569cd6; font-weight: bold; }
        .syntax-string { color: #ce9178; }
        .syntax-comment { color: #6a9955; font-style: italic; }
        .syntax-number { color: #b5cea8; }
      `;
      document.head.appendChild(style);
    }
  };

  window.SyntaxHighlighter = SyntaxHighlighter;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      try { SyntaxHighlighter.addStyles(); SyntaxHighlighter.init(); } catch(e) { console.warn('[SyntaxHighlighter]', e); }
    });
  } else {
    try { SyntaxHighlighter.addStyles(); SyntaxHighlighter.init(); } catch(e) { console.warn('[SyntaxHighlighter]', e); }
  }
})();
