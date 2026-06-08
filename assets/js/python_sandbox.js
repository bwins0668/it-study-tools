// python_sandbox.js — Python Sandbox Controller
// Handles code execution by calling the local /runpython endpoint
// Provides vocab flashcard logic and keyboard shortcuts for the Python editor

'use strict';

window.PythonSandbox = (() => {

  // ─── State ───────────────────────────────────────────────────────────────
  let currentLesson = null;   // The currently loaded PYTHON_LESSONS entry
  let vocabIndex = 0;
  let isFlipped = false;
  let isRunning = false;

  // ─── DOM refs ────────────────────────────────────────────────────────────
  const getEditor    = () => document.getElementById('python-editor');
  const getOutput    = () => document.getElementById('python-output-content');
  const getStatus    = () => document.getElementById('python-sandbox-status');
  const getRunBtn    = () => document.getElementById('python-run-btn');
  const getLessonLbl = () => document.getElementById('python-sandbox-lesson-title');

  // ─── Load Lesson into Sandbox ────────────────────────────────────────────
  function loadLesson(lesson) {
    currentLesson = lesson;
    vocabIndex = 0;
    isFlipped = false;

    // Update sandbox header label
    const lbl = getLessonLbl();
    if (lbl) lbl.textContent = lesson.titleZh || lesson.titleJa;

    const editor = getEditor();
    const runBtn = getRunBtn();

    if (!lesson.example) {
      if (editor) {
        editor.value = "# 本节为纯概念理论课，无需编写或运行代码。\n# 请阅读左侧的教材讲解，并完成随堂练习！";
        editor.readOnly = true;
        editor.style.opacity = "0.7";
        editor.style.cursor = "not-allowed";
        const lnContainer = document.getElementById('python-line-numbers');
        if (lnContainer) lnContainer.innerHTML = '<span>1</span><span>2</span>';
        const overlay = document.getElementById('python-highlight-overlay');
        if (overlay) overlay.innerHTML = '<span class="hl-comment"># 本节为纯概念理论课，无需编写或运行代码。</span>\n<span class="hl-comment"># 请阅读左侧的教材讲解，并完成随堂练习！</span>\n';
      }
      if (runBtn) {
        runBtn.disabled = true;
        runBtn.style.opacity = "0.4";
        runBtn.style.cursor = "not-allowed";
        runBtn.style.animation = "none";
      }
      setStatus('ready', '理论课免执行 / Concept Lesson');
    } else {
      if (editor) {
        editor.readOnly = false;
        editor.style.opacity = "1";
        editor.style.cursor = "text";
      }
      if (runBtn) {
        runBtn.disabled = false;
        runBtn.style.opacity = "1";
        runBtn.style.cursor = "pointer";
        runBtn.style.animation = "pulse-glow 3s infinite ease-in-out";
      }
      setTemplate(getDefaultTemplate());
      setStatus('ready', '準備完了 / Ready');
    }

    // Load the stdin example into the input textarea (if any)
    const stdinEl = document.getElementById('python-input-content');
    if (stdinEl) {
      stdinEl.value = lesson.stdinExample || "";
    }

    // Reset output
    const out = getOutput();
    if (out) {
      if (!lesson.example) {
        out.textContent = `# ${lesson.titleJa}\n# ${lesson.titleZh}\n\n# 本节为纯概念理论课，无需运行代码。`;
      } else {
        out.textContent = `# ${lesson.titleJa}\n# ${lesson.titleZh}\n\n# 上のコードを編集して「実行」ボタンを押してください\n# 编辑上方代码，然后点击「实行」按钮运行`;
      }
      out.className = 'python-output-content';
    }

    // Render vocab flashcards
    renderVocabCard();
    updateVocabCounter();

    // Update chapter progress in info card
    updateProgressDisplay();
  }

  // ─── Python Syntax Highlighting ───────────────────────────────────────────
  function highlightPythonCode(code) {
    let html = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const placeholders = [];
    
    // Triple-quoted strings (''' or """)
    html = html.replace(/('''[\s\S]*?'''|"""[\s\S]*?""")/g, (match) => {
      placeholders.push(`<span class="hl-string">${match}</span>`);
      return `___PLACEHOLDER_${placeholders.length - 1}___`;
    });

    // Single-line comments (# ...)
    html = html.replace(/#.*/g, (match) => {
      placeholders.push(`<span class="hl-comment">${match}</span>`);
      return `___PLACEHOLDER_${placeholders.length - 1}___`;
    });

    // Double-quoted strings
    html = html.replace(/"(\\.|[^"\\])*"/g, (match) => {
      placeholders.push(`<span class="hl-string">${match}</span>`);
      return `___PLACEHOLDER_${placeholders.length - 1}___`;
    });

    // Single-quoted strings
    html = html.replace(/'(\\.|[^'\\])*'/g, (match) => {
      placeholders.push(`<span class="hl-string">${match}</span>`);
      return `___PLACEHOLDER_${placeholders.length - 1}___`;
    });

    // Keywords
    const keywords = [
      'def', 'class', 'import', 'from', 'as', 'if', 'elif', 'else', 'for', 'while',
      'break', 'continue', 'return', 'pass', 'try', 'except', 'finally', 'raise',
      'assert', 'global', 'nonlocal', 'lambda', 'yield', 'with', 'in', 'is', 'and', 'or',
      'not', 'del', 'None', 'True', 'False'
    ];
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    html = html.replace(keywordRegex, '<span class="hl-keyword">$1</span>');

    // System built-in APIs
    const sysWords = [
      'print', 'input', 'len', 'range', 'int', 'str', 'float', 'list', 'dict', 'set',
      'tuple', 'type', 'open', 'abs', 'round', 'sum', 'min', 'max', 'sorted', 'zip',
      'enumerate', 'map', 'filter', 'append', 'split', 'join', 'replace'
    ];
    const sysRegex = new RegExp(`\\b(${sysWords.join('|')})\\b`, 'g');
    html = html.replace(sysRegex, '<span class="hl-sys">$1</span>');

    // Numbers
    html = html.replace(/\b(\d+)\b/g, '<span class="hl-number">$1</span>');

    // Restore placeholders
    for (let i = placeholders.length - 1; i >= 0; i--) {
      html = html.replace(`___PLACEHOLDER_${i}___`, placeholders[i]);
    }

    return html;
  }

  function updateHighlight() {
    const editor = getEditor();
    const overlay = document.getElementById('python-highlight-overlay');
    if (!editor || !overlay) return;
    overlay.innerHTML = highlightPythonCode(editor.value) + "\n";
    // Sync scroll positions immediately to prevent misalignment
    overlay.scrollTop = editor.scrollTop;
    overlay.scrollLeft = editor.scrollLeft;
  }

  function getBoilerplateTemplate() {
    return `# Write your Python code here\n# ここにPythonコードを入力してください\n\n`;
  }

  function setTemplate(code) {
    const editor = getEditor();
    if (!editor) return;
    editor.value = code;
    updateLineNumbers();
    updateHighlight();
    editor.focus();
  }

  function getDefaultTemplate() {
    if (currentLesson && currentLesson.example) {
      return currentLesson.example;
    }
    return getBoilerplateTemplate();
  }

  function toggleTemplate() {
    const editor = getEditor();
    if (!editor) return;
    const currentVal = editor.value.trim();
    const templateVal = getDefaultTemplate().trim();
    if (currentVal === templateVal) {
      setTemplate(getBoilerplateTemplate());
    } else {
      setTemplate(getDefaultTemplate());
    }
  }

  function clearCode() {
    const editor = getEditor();
    if (!editor) return;
    if (confirm('コードをクリアしますか？/ Clear code?')) {
      setTemplate(getBoilerplateTemplate());
    }
  }

  function copyCode() {
    const editor = getEditor();
    if (!editor) return;
    navigator.clipboard.writeText(editor.value).then(() => {
      const btn = document.querySelector('.python-tool-btn:nth-child(2)');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => { btn.innerHTML = orig; }, 1500);
      }
    });
  }

  // ─── Line Numbers ─────────────────────────────────────────────────────────
  function updateLineNumbers() {
    const editor = getEditor();
    const lnContainer = document.getElementById('python-line-numbers');
    if (!editor || !lnContainer) return;
    const lines = editor.value.split('\n').length;
    let html = '';
    for (let i = 1; i <= lines; i++) {
      html += `<span>${i}</span>`;
    }
    lnContainer.innerHTML = html;
    lnContainer.scrollTop = editor.scrollTop;
  }

  // ─── Run Code via /runpython ─────────────────────────────────────────────
  async function runCode() {
    if (isRunning) return;
    const editor = getEditor();
    const code = editor ? editor.value.trim() : '';

    if (!code) {
      setStatus('error', 'エラー / Error');
      displayOutput('# コードを入力してください / Please enter some code', 'error');
      return;
    }

    // Get standard input value
    const stdinEl = document.getElementById('python-input-content');
    const stdin = stdinEl ? stdinEl.value : '';

    isRunning = true;
    const btn = getRunBtn();
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 実行中...';
    }
    setStatus('running', '実行中... / Running...');
    displayOutput('# 実行中 / Running...\n# しばらくお待ちください / Please wait...', 'idle');

    try {
      const response = await fetch('/runpython', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, stdin }),
        signal: AbortSignal.timeout(25000)
      });

      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      handleRunResult(result);

    } catch (err) {
      if (err.name === 'TimeoutError') {
        setStatus('error', 'タイムアウト / Timeout');
        displayOutput('# タイムアウトエラー / Timeout Error\n# コードの実行が25秒を超えました。\n# 无限循环或输入挂起，请检查代码。', 'error');
      } else if (err.message.includes('fetch') || err.message.includes('Failed')) {
        setStatus('error', 'サーバー未起動 / Server Off');
        displayOutput(
          '# ⚠️ ローカルサーバーが起動していません / Local server not running\n\n' +
          '# アプリを正しく起動してください：\n' +
          '# 1. Launcher.exe または 启动.bat を実行して起動\n' +
          '# 2. ブラウザからアクセス（http://127.0.0.1:PORT）\n\n' +
          '# ※ ブラウザから直接 index.html を開いた場合はサーバー機能が使えません。',
          'error'
        );
      } else {
        setStatus('error', 'エラー / Error');
        displayOutput(`# エラー / Error:\n${err.message}`, 'error');
      }
    } finally {
      isRunning = false;
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span class="sandbox-btn-icon">▶</span> 実行 <kbd>Ctrl+Enter</kbd>';
      }
    }
  }

  function handleRunResult(result) {
    const hasCompileError = result.compileError && result.compileError.trim().length > 0;
    const hasRuntimeError = result.runtimeError && result.runtimeError.trim().length > 0;
    const hasOutput = result.output && result.output.trim().length > 0;

    let outputText = '';
    let outputClass = '';

    if (hasCompileError) {
      setStatus('error', '構文エラー / Syntax Error');
      outputText = '❌ 構文エラー / Syntax Error:\n\n' + result.compileError;
      outputClass = 'error';
    } else if (hasRuntimeError) {
      setStatus('error', '実行エラー / Runtime Error');
      outputText = (hasOutput ? '# 出力 / Output:\n' + result.output + '\n\n' : '') +
                   '⚠️ 実行エラー / Runtime Error:\n' + result.runtimeError;
      outputClass = 'error';
    } else if (hasOutput) {
      setStatus('success', '成功 / Success ✓');
      outputText = result.output;
      outputClass = 'success';
    } else {
      setStatus('success', '完了 / Done ✓');
      outputText = '# プログラムが正常に終了しました（出力なし）\n# Program finished successfully (no output)';
      outputClass = 'success';
    }

    if (result.executionTimeMs != null) {
      outputText += `\n\n# 実行時間 / Time: ${result.executionTimeMs}ms`;
    }

    displayOutput(outputText, outputClass);
    if (window.StudyAI) StudyAI.gradeGeneratedExecution('python', result);
    if (window.StudyAI) {
      StudyAI.track({
        subject: 'python',
        eventType: 'code_run',
        itemId: currentLesson ? currentLesson.id : '',
        topic: currentLesson ? (currentLesson.titleZh || currentLesson.titleJa) : 'Python sandbox',
        success: !hasCompileError && !hasRuntimeError,
        durationMs: result.executionTimeMs,
        errorType: hasCompileError ? 'syntax_error' : (hasRuntimeError ? 'runtime_error' : ''),
        metadata: { error: String(result.compileError || result.runtimeError || '').slice(0, 500) }
      });
    }

    // Handle Stepper tabs visibility and preloading
    const stepperTab = document.getElementById("python-tab-stepper");
    if (stepperTab) {
      stepperTab.style.display = hasCompileError || hasRuntimeError ? "none" : "inline-flex";
    }
    
    if (!hasCompileError && !hasRuntimeError) {
      const code = getEditor().value;
      loadTraceSteps('python', code);
      switchPythonOutputTab('console');
    }

    // Mark lesson as completed if success (update progress)
    if (!hasCompileError && !hasRuntimeError && currentLesson) {
      markLessonProgress(currentLesson.id, 'code_run');
    }
  }

  // ─── Output Display ──────────────────────────────────────────────────────
  function displayOutput(text, type) {
    const out = getOutput();
    if (!out) return;
    out.textContent = text;
    out.className = 'python-output-content';
    
    // Clear/hide AI debugger panel by default
    const debugPanel = document.getElementById('python-ai-debugger');
    if (debugPanel) {
      debugPanel.style.display = 'none';
      debugPanel.innerHTML = '';
    }

    if (type === 'error') {
      out.classList.add('python-output-error');
      
      // Render AI Debugger Button if there is a real error message
      if (debugPanel && text.trim().length > 0 && !text.includes('Please enter some code')) {
        debugPanel.style.display = 'block';
        debugPanel.innerHTML = `
          <div style="margin-top: 12px; text-align: center;">
            <button class="ai-debug-btn" onclick="triggerAiDebug('python', document.getElementById('python-editor').value.trim(), ${JSON.stringify(text).replace(/"/g, '&quot;')})">
              <i class="fa-solid fa-robot"></i> AI 帮我看看
            </button>
          </div>
        `;
      }
    }
    if (type === 'success') out.classList.add('python-output-success');
  }

  // ─── Status Badge ─────────────────────────────────────────────────────────
  function setStatus(type, text) {
    const el = getStatus();
    if (!el) return;
    el.textContent = text;
    el.className = 'python-sandbox-status';
    const classMap = {
      running: 'python-status-running',
      success: 'python-status-success',
      error:   'python-status-error',
      ready:   'python-status-idle'
    };
    if (classMap[type]) el.classList.add(classMap[type]);
  }

  // ─── Vocab Flashcard Logic ───────────────────────────────────────────────
  function renderVocabCard() {
    if (!currentLesson || !currentLesson.vocabList || currentLesson.vocabList.length === 0) {
      hideVocabSection();
      return;
    }

    const vocab = currentLesson.vocabList;
    const section = document.getElementById('python-vocab-section');
    if (section) section.style.display = 'flex';

    const card = vocab[vocabIndex];
    const termEl = document.getElementById('python-card-term');
    const zhEl   = document.getElementById('python-card-zh');
    const descEl = document.getElementById('python-card-desc');

    if (termEl) termEl.textContent = card.term || card.ja;
    if (zhEl)   zhEl.textContent   = card.zh;
    if (descEl) descEl.textContent = card.desc;

    // Reset flip state
    isFlipped = false;
    const flashcard = document.getElementById('python-flashcard');
    if (flashcard) flashcard.classList.remove('flipped');

    updateVocabCounter();
  }

  // ─── Progress Tracking ───────────────────────────────────────────────────
  function markLessonProgress(lessonId, action) {
    if (typeof markPythonProgress === 'function') {
      markPythonProgress(lessonId, action);
    }
  }

  function updateProgressDisplay() {
    const el = document.getElementById('python-chapter-progress');
    if (!el || typeof PYTHON_LESSONS === 'undefined') return;

    const total = PYTHON_LESSONS.length;
    const completed = PYTHON_LESSONS.filter(l => {
      const key = 'python_progress_' + l.id;
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      return data.quizDone || data.codeRun;
    }).length;

    const pct = Math.round((completed / total) * 100);
    el.innerHTML = `全体 ${pct}% (${completed}/${total}) ✓`;
  }

  function hideVocabSection() {
    const section = document.getElementById('python-vocab-section');
    if (section) section.style.display = 'none';
  }

  function updateVocabCounter() {
    const counter = document.getElementById('python-vocab-counter');
    if (!counter || !currentLesson || !currentLesson.vocabList) return;
    counter.textContent = `${vocabIndex + 1} / ${currentLesson.vocabList.length}`;
  }

  function flipCard() {
    const flashcard = document.getElementById('python-flashcard');
    if (!flashcard) return;
    isFlipped = !isFlipped;
    flashcard.classList.toggle('flipped', isFlipped);
  }

  function vocabNext() {
    if (!currentLesson || !currentLesson.vocabList) return;
    vocabIndex = (vocabIndex + 1) % currentLesson.vocabList.length;
    renderVocabCard();
  }

  // ─── Init Keyboard Shortcuts ─────────────────────────────────────────────
  function initKeyboardShortcuts() {
    const editor = getEditor();
    if (!editor) return;

    editor.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
        return;
      }
      // Tab -> 4 spaces
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 4;
        updateLineNumbers();
        updateHighlight();
        return;
      }
      // Enter -> Keep current indentation level
      if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        const val = editor.value;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;

        // Find the start of the current line
        const lastNewLine = val.lastIndexOf('\n', start - 1);
        const lineStart = lastNewLine === -1 ? 0 : lastNewLine + 1;
        const currentLine = val.substring(lineStart, start);

        // Extract leading whitespace
        const indentMatch = currentLine.match(/^\s*/);
        const indent = indentMatch ? indentMatch[0] : '';

        // Check if current line ends with ':'
        const endsWithColon = currentLine.trim().endsWith(':');

        let insertText = '';
        let newCursorPos = start;

        if (endsWithColon) {
          const extraIndent = indent + '    ';
          insertText = '\n' + extraIndent;
          newCursorPos = start + insertText.length;
        } else {
          insertText = '\n' + indent;
          newCursorPos = start + insertText.length;
        }

        editor.value = val.substring(0, start) + insertText + val.substring(end);
        editor.selectionStart = editor.selectionEnd = newCursorPos;

        updateLineNumbers();
        updateHighlight();
        return;
      }
    });

    let highlightTimeout = null;
    function queueHighlightUpdate() {
      if (highlightTimeout) clearTimeout(highlightTimeout);
      highlightTimeout = setTimeout(() => {
        updateHighlight();
      }, 50);
    }

    editor.addEventListener('input', () => {
      updateLineNumbers();
      queueHighlightUpdate();
    });
    editor.addEventListener('scroll', () => {
      const lnContainer = document.getElementById('python-line-numbers');
      if (lnContainer) lnContainer.scrollTop = editor.scrollTop;
      
      const overlay = document.getElementById('python-highlight-overlay');
      if (overlay) {
        overlay.scrollTop = editor.scrollTop;
        overlay.scrollLeft = editor.scrollLeft;
      }
    });
  }

  function init() {
    initKeyboardShortcuts();
    setTemplate(getDefaultTemplate());
    console.log('[PythonSandbox] Initialized. Lessons available:', 
      typeof PYTHON_LESSONS !== 'undefined' ? PYTHON_LESSONS.length : 'N/A');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 50);
  }

  return {
    loadLesson,
    setTemplate,
    getDefaultTemplate,
    clearCode,
    copyCode,
    runCode,
    flipCard,
    vocabNext,
    vocabPrev: () => {
      if (!currentLesson || !currentLesson.vocabList) return;
      vocabIndex = (vocabIndex - 1 + currentLesson.vocabList.length) % currentLesson.vocabList.length;
      renderVocabCard();
    },
    updateProgressDisplay,
    toggleTemplate
  };
})();

// Global bridge functions
function pythonFlipCard()  { PythonSandbox.flipCard(); }
function pythonVocabNext() { PythonSandbox.vocabNext(); }
function pythonVocabPrev() { PythonSandbox.vocabPrev(); }
