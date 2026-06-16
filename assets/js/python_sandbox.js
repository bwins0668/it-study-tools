// python_sandbox.js — Python Sandbox Controller
// Handles code execution through the WebCodeRunner adapter
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
        if (lnContainer) { lnContainer.replaceChildren(); var _s1=document.createElement("span"); _s1.textContent="1"; lnContainer.appendChild(_s1); var _s2=document.createElement("span"); _s2.textContent="2"; lnContainer.appendChild(_s2); }
        const overlay = document.getElementById('python-highlight-overlay');
        if (overlay) { overlay.replaceChildren(); overlay.insertAdjacentHTML("beforeend", "<span class=\"hl-comment\"># 本节为纯概念理论课，无需编写或运行代码。</span>\n<span class=\"hl-comment\"># 请阅读左侧的教材讲解，并完成随堂练习！</span>\n"); }
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
    overlay.replaceChildren();
    overlay.insertAdjacentHTML("beforeend", highlightPythonCode(editor.value) + "\n");
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
      var _btn = document.querySelector(".python-tool-btn:nth-child(2)");
      if (_btn) {
        var _origIconClass = (_btn.querySelector("i") && _btn.querySelector("i").className) || "";
        var _origText = _btn.childNodes.length > 1 ? (_btn.childNodes[1].textContent || "") : "";
        _btn.replaceChildren();
        _btn.insertAdjacentHTML("beforeend", "<i class=\"fa-solid fa-check\"></i> Copied!");
        setTimeout(function() {
          _btn.replaceChildren();
          _btn.insertAdjacentHTML("beforeend", "<i class=\"" + _origIconClass + "\"></i> " + _origText);
        }, 1500);
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
    lnContainer.replaceChildren();
    lnContainer.insertAdjacentHTML("beforeend", html);
    lnContainer.scrollTop = editor.scrollTop;
  }

  // ─── Python Environment Diagnostics ─────────────────────────────────
  function diagnosePythonEnvironment() {
    const diagnostics = {
      isWebSafeMode: false,
      isServerReachable: false,
      pythonInstalled: false,
      recommendations: []
    };

    // Check if we're in web safe mode
    if (location.protocol === 'file:' || location.hostname === '') {
      diagnostics.isWebSafeMode = true;
      diagnostics.recommendations.push('当前为 Web 安全模式，完整功能需下载 Windows 客户端');
    }

    // Check server reachability
    if (typeof window.WebCodeRunner !== 'undefined') {
      diagnostics.isServerReachable = true;
    } else {
      diagnostics.recommendations.push('WebCodeRunner 适配器未加载，请检查 index.html 中的脚本引用');
    }

    return diagnostics;
  }

  function showPythonDiagnostics() {
    const diag = diagnosePythonEnvironment();
    let message = '# Python 环境诊断报告 / Python Environment Diagnostics\n\n';

    if (diag.isWebSafeMode) {
      message += '⚠️ Web 安全模式检测\n';
      message += '   当前浏览器直接打开 HTML 文件，无法调用本地 Python。\n\n';
    }

    if (diag.recommendations.length > 0) {
      message += '📋 建议操作：\n';
      diag.recommendations.forEach((rec, i) => {
        message += `   ${i + 1}. ${rec}\n`;
      });
      message += '\n';
    }

    message += '🔗 下载完整版：https://github.com/bwins0668/it-study-tools/releases/latest\n';
    message += '📖 离线环境配置指南：docs/offline-environment-setup.md\n';

    displayOutput(message, 'error');
    setStatus('error', '环境诊断 / Diagnostics');
  }

  // ─── Run Code via WebCodeRunner ──────────────────────────────────────────
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
      btn.replaceChildren();
      btn.insertAdjacentHTML("beforeend", "<i class=\"fa-solid fa-spinner fa-spin\"></i> 実行中...");
    }
    setStatus('running', '実行中... / Running...');
    displayOutput('# 実行中 / Running...\n# しばらくお待ちください / Please wait...', 'idle');

    try {
      if (!window.WebCodeRunner || typeof window.WebCodeRunner.runPython !== 'function') {
        throw new Error('ONLINE_EXECUTION_SERVICE_UNAVAILABLE');
      }
      const result = await window.WebCodeRunner.runPython(code, stdin);
      handleRunResult(result);

    } catch (err) {
      const message = String(err && err.message || '');
      if (
        message === 'ONLINE_EXECUTION_SERVICE_UNAVAILABLE' ||
        message.includes('尚未配置') ||
        message.includes('未配置') ||
        message.includes('503') ||
        message.includes('Service Unavailable')
      ) {
        setStatus('warning', '在线执行服务暂不可用 / Online service unavailable');
        displayOutput(
          '# 在线执行服务暂不可用，请稍后再试或使用 Windows 完整版本地运行。\n' +
          '# オンライン実行サービスは現在利用できません。しばらくしてから再試行するか、Windows 完整版でローカル実行してください。\n' +
          '# The online execution service is currently unavailable. Try again later or use the Windows full version for local execution.\n' +
          '# 온라인 실행 서비스를 현재 사용할 수 없습니다. 나중에 다시 시도하거나 Windows 정식 버전에서 로컬 실행을 사용하세요。',
          'error'
        );
        return;
      }
      if (err.name === 'TimeoutError') {
        setStatus('error', 'タイムアウト / Timeout');
        displayOutput('# タイムアウトエラー / Timeout Error\n# コードの実行が25秒を超えました。\n# 无限循环或输入挂起，请检查代码。\n\n💡 提示：尝试减小循环次数或检查递归深度', 'error');
      } else if (err.message.includes('fetch') || err.message.includes('Failed')) {
        setStatus('error', 'サーバー未起動 / Server Off');
        const errorMsg = 
          '# ⚠️ ローカルサーバーが起動していません / Local server not running\n\n' +
          '# アプリを正しく起動してください：\n' +
          '# 1. Launcher.exe または 启动.bat を実行して起動\n' +
          '# 2. ブラウザからアクセス（http://127.0.0.1:PORT）\n\n' +
          '# ※ ブラウザから直接 index.html を開いた場合はサーバー機能が使えません。\n\n' +
          '💡 下载完整版：https://github.com/bwins0668/it-study-tools/releases/latest\n';
        displayOutput(errorMsg, 'error');
      } else if (err.message.includes('Python') && err.message.includes('not found')) {
        setStatus('error', 'Python未安装 / Python Not Found');
        const errorMsg =
          '# ⚠️ ローカル環境に Python が見つかりません / Python not found\n\n' +
          '# 解决方案 / Solutions：\n' +
          '# 1. 安装 Python：https://www.python.org/downloads/\n' +
          '# 2. 确保 python.exe 在 PATH 环境变量中\n' +
          '# 3. 重启应用使环境变量生效\n\n' +
          '# 检查命令：在命令行输入 python --version\n';
        displayOutput(errorMsg, 'error');
      } else {
        setStatus('error', 'エラー / Error');
        displayOutput(`# エラー / Error:\n${err.message}\n\n💡 如需要详细诊断，请点击「環境診断」按钮`, 'error');
      }
    } finally {
      isRunning = false;
      if (btn) {
        btn.disabled = false;
        btn.replaceChildren();
        btn.insertAdjacentHTML("beforeend", "<span class=\"sandbox-btn-icon\">▶</span> 実行 <kbd>Ctrl+Enter</kbd>");
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
      if (typeof switchPythonOutputTab === 'function') {
              switchPythonOutputTab('console');
      }
    }

    // Mark lesson as completed if success (update progress)
    if (!hasCompileError && !hasRuntimeError && currentLesson) {
      markLessonProgress(currentLesson.id, 'code_run');
    }
  }


  // ─── Output Tab Switching ─────────────────────────────────────────
  function switchPythonOutputTab(tabName) {
    // Ensure output card is visible
    const outputCard = document.getElementById('python-output-card');
    if (outputCard) outputCard.style.display = '';
    
    // Switch between tabs if they exist
    const tabs = ['console', 'stepper', 'ai-debugger'];
    tabs.forEach(tab => {
      const tabEl = document.getElementById('python-tab-' + tab);
      const panelEl = document.getElementById('python-panel-' + tab);
      if (tabEl) tabEl.classList.toggle('active', tab === tabName);
      if (panelEl) panelEl.style.display = tab === tabName ? '' : 'none';
    });
  }

  window.switchPythonOutputTab = switchPythonOutputTab;
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
      debugPanel.textContent = '';
    }

    if (type === 'error') {
      out.classList.add('python-output-error');
      
      // Render AI Debugger Button if there is a real error message
      if (debugPanel && text.trim().length > 0 && !text.includes('Please enter some code')) {
        debugPanel.style.display = 'block';
        debugPanel.replaceChildren();
        var _dbgDiv = document.createElement("div");
        _dbgDiv.style.cssText = "margin-top:12px;text-align:center;";
        var _dbgBtn = document.createElement("button");
        _dbgBtn.className = "ai-debug-btn";
        var _safeCode = document.getElementById("python-editor") ? document.getElementById("python-editor").value.trim() : "";
        var _safeText = text;
        _dbgBtn.addEventListener("click", function() {
          triggerAiDebug("python", _safeCode, _safeText);
        });
        var _dbgIcon = document.createElement("i");
        _dbgIcon.className = "fa-solid fa-robot";
        _dbgBtn.appendChild(_dbgIcon);
        _dbgBtn.appendChild(document.createTextNode(" AI 帮我看看"));
        _dbgDiv.appendChild(_dbgBtn);
        debugPanel.appendChild(_dbgDiv);
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
    el.textContent = "全体 " + pct + "% (" + completed + "/" + total + ") ✓";
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
    toggleTemplate,
    showDiagnostics: showPythonDiagnostics
  };
})();

// Global bridge functions
function pythonFlipCard()  { PythonSandbox.flipCard(); }
function pythonVocabNext() { PythonSandbox.vocabNext(); }
function pythonVocabPrev() { PythonSandbox.vocabPrev(); }
