// java_sandbox.js — Java Sandbox Controller

// Handles code execution through the WebCodeRunner adapter
// Provides vocab flashcard logic and keyboard shortcuts for the Java editor



'use strict';



window.JavaSandbox = (() => {



  // ─── State ───────────────────────────────────────────────────────────────

  let currentLesson = null;   // The currently loaded JAVA_LESSONS entry

  let vocabIndex = 0;

  let isFlipped = false;

  let isRunning = false;

  let currentJavaBook = 'nyumon';  // 'nyumon' or 'jissen'



  // ─── DOM refs ────────────────────────────────────────────────────────────

  const getEditor    = () => document.getElementById('java-editor');

  const getOutput    = () => document.getElementById('java-output-content');

  const getStatus    = () => document.getElementById('java-sandbox-status');

  const getRunBtn    = () => document.getElementById('java-run-btn');

  const getLessonLbl = () => document.getElementById('java-sandbox-lesson-title');

  function getVisiblePack(lesson) {
    if (!lesson || !window.ContentI18n || typeof window.ContentI18n.get !== 'function') return null;
    const lang = window.I18n && typeof window.I18n.getLanguage === 'function' ? window.I18n.getLanguage() : 'default-ja-zh';
    return window.ContentI18n.get('java', lesson.id, lang);
  }

  function visibleText(pack, key, fallback) {
    return pack && pack[key] ? pack[key] : (fallback || '');
  }



  // ─── Load Lesson into Sandbox ────────────────────────────────────────────

  function loadLesson(lesson) {

    currentLesson = lesson;

    vocabIndex = 0;

    isFlipped = false;
    const pack = getVisiblePack(lesson);



    // Update sandbox header label

    const lbl = getLessonLbl();

    if (lbl) lbl.textContent = visibleText(pack, 'title', lesson.titleZh || lesson.titleJa);



    // User request: blank sandbox by default (boilerplate skeleton)

    setTemplate(getBoilerplateTemplate(visibleText(pack, 'sandboxComment', '')));



    // Load the stdin example into the input textarea

    const stdinEl = document.getElementById('java-input-content');

    if (stdinEl) {

      stdinEl.value = lesson.stdinExample || "";
      stdinEl.setAttribute('placeholder', visibleText(pack, 'stdinPlaceholder', 'Input data for the program...'));

    }



    // Reset output

    const out = getOutput();

    if (out) {

      out.textContent = `${visibleText(pack, 'sandboxComment', '// Edit the code above and run it.')}\n${visibleText(pack, 'resultExplanation', '// Compare the output with the expected result.')}`;

      out.className = 'java-output-content';

    }

    setStatus('ready', visibleText(pack, 'readyStatus', 'Ready'));



    // Render vocab flashcards

    renderVocabCard();

    updateVocabCounter();



    // Update chapter progress in info card

    updateProgressDisplay();

  }



  // ─── Editor template ─────────────────────────────────────────────────────

  

  // ─── Java Syntax Highlighting ───────────────────────────────────────────

  function highlightJavaCode(code) {

    let html = code

      .replace(/&/g, '&amp;')

      .replace(/</g, '&lt;')

      .replace(/>/g, '&gt;');



    const placeholders = [];

    

    // Multi-line comments

    html = html.replace(/\/\*[\s\S]*?\*\//g, (match) => {

      placeholders.push(`<span class="hl-comment">${match}</span>`);

      return `___PLACEHOLDER_${placeholders.length - 1}___`;

    });

    

    // Single-line comments

    html = html.replace(/\/\/.*/g, (match) => {

      placeholders.push(`<span class="hl-comment">${match}</span>`);

      return `___PLACEHOLDER_${placeholders.length - 1}___`;

    });



    // Double-quoted strings

    html = html.replace(/"(\\.|[^"\\])*"/g, (match) => {

      placeholders.push(`<span class="hl-string">${match}</span>`);

      return `___PLACEHOLDER_${placeholders.length - 1}___`;

    });



    // Single-quoted char literals

    html = html.replace(/'(\\.|[^'\\])*'/g, (match) => {

      placeholders.push(`<span class="hl-string">${match}</span>`);

      return `___PLACEHOLDER_${placeholders.length - 1}___`;

    });



    // Keywords

    const keywords = [

      'public', 'private', 'protected', 'class', 'interface', 'extends', 'implements',

      'static', 'void', 'int', 'double', 'boolean', 'char', 'float', 'long', 'short',

      'byte', 'if', 'else', 'switch', 'case', 'default', 'break', 'continue', 'for',

      'while', 'do', 'new', 'return', 'import', 'package', 'null', 'true', 'false',

      'this', 'super', 'try', 'catch', 'finally', 'throw', 'throws'

    ];

    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');

    html = html.replace(keywordRegex, '<span class="hl-keyword">$1</span>');



    // System APIs

    const sysWords = [

      'System', 'out', 'print', 'println', 'Scanner', 'String', 'Main', 'args', 'in'

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

    const overlay = document.getElementById('java-highlight-overlay');

    if (!editor || !overlay) return;

    overlay.replaceChildren();
    overlay.insertAdjacentHTML("beforeend", highlightJavaCode(editor.value) + "\n");

    // Sync scroll positions immediately to prevent misalignment

    overlay.scrollTop = editor.scrollTop;

    overlay.scrollLeft = editor.scrollLeft;

  }



  function getLocalizedSandboxComment() {

    const pack = getVisiblePack(currentLesson);

    return visibleText(pack, 'sandboxComment', '// Edit the code above and run it.');

  }



  function getBoilerplateTemplate(commentText) {

    const comment = String(commentText || '').trim();

    return `${comment ? comment + "\n" : ""}public class Main {

    public static void main(String[] args) {

        

    }

}`;

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

    if (currentLesson && currentLesson.codeExample) {

      return currentLesson.codeExample;

    }

    return getBoilerplateTemplate(getLocalizedSandboxComment());

  }



    function toggleTemplate() {

    const editor = getEditor();

    if (!editor) return;

    const currentVal = editor.value.trim();

    const templateVal = getDefaultTemplate().trim();

    if (currentVal === templateVal) {

      setTemplate(getBoilerplateTemplate(getLocalizedSandboxComment()));

    } else {

      setTemplate(getDefaultTemplate());

    }

  }



  function clearCode() {

    const editor = getEditor();

    if (!editor) return;

    if (confirm('コードをクリアしますか？/ Clear code?')) {

      setTemplate(getBoilerplateTemplate(getLocalizedSandboxComment()));

    }

  }



  function copyCode() {

    const editor = getEditor();

    if (!editor) return;

    navigator.clipboard.writeText(editor.value).then(() => {

      const _btn2 = document.querySelector('.java-tool-btn:nth-child(2)');

      if (_btn2) {
        var _origIconClass2 = (_btn2.querySelector("i") && _btn2.querySelector("i").className) || "";
        var _origText2 = _btn2.childNodes.length > 1 ? (_btn2.childNodes[1].textContent || "") : "";
        _btn2.replaceChildren();
        _btn2.insertAdjacentHTML("beforeend", "<i class=\"fa-solid fa-check\"></i> Copied!");
        setTimeout(function() {
          _btn2.replaceChildren();
          _btn2.insertAdjacentHTML("beforeend", "<i class=\"" + _origIconClass2 + "\"></i> " + _origText2);
        }, 1500);
      }


    });

  }



  // ─── Line Numbers ─────────────────────────────────────────────────────────

  function updateLineNumbers() {

    const editor = getEditor();

    const lnContainer = document.getElementById('java-line-numbers');

    if (!editor || !lnContainer) return;

    const lines = editor.value.split('\n').length;

    let html = '';

    for (let i = 1; i <= lines; i++) {

      html += `<span>${i}</span>`;

    }

    lnContainer.replaceChildren();
    lnContainer.insertAdjacentHTML("beforeend", html);

    // Sync scroll position immediately to prevent misalignment

    lnContainer.scrollTop = editor.scrollTop;

  }



  // ─── Run Code via WebCodeRunner ──────────────────────────────────────────
  async function runCode() {

    if (isRunning) return;

    const editor = getEditor();

    const code = editor ? editor.value.trim() : '';



    if (!code) {

      setStatus('error', 'エラー / Error');

      displayOutput('// コードを入力してください / Please enter some code', 'error');

      return;

    }



    // Get standard input value

    const stdinEl = document.getElementById('java-input-content');

    const stdin = stdinEl ? stdinEl.value : '';



    isRunning = true;

    const btn = getRunBtn();

    if (btn) {

      btn.disabled = true;

      btn.replaceChildren();
      btn.insertAdjacentHTML("beforeend", "<i class=\"fa-solid fa-spinner fa-spin\"></i> コンパイル中...");

    }

    setStatus('running', '実行中... / Running...');

    displayOutput('// コンパイル中 / Compiling...\n// しばらくお待ちください / Please wait...', 'idle');



    try {
      if (!window.WebCodeRunner || typeof window.WebCodeRunner.runJava !== 'function') {
        throw new Error('ONLINE_EXECUTION_SERVICE_UNAVAILABLE');
      }
      const result = await window.WebCodeRunner.runJava(code, stdin);
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
          '// 在线执行服务暂不可用，请稍后再试或使用 Windows 完整版本地运行。\n' +
          '// オンライン実行サービスは現在利用できません。しばらくしてから再試行するか、Windows 完整版でローカル実行してください。\n' +
          '// The online execution service is currently unavailable. Try again later or use the Windows full version for local execution.\n' +
          '// 온라인 실행 서비스를 현재 사용할 수 없습니다. 나중에 다시 시도하거나 Windows 정식 버전에서 로컬 실행을 사용하세요。',
          'error'
        );
        return;
      }
      if (err.name === 'TimeoutError') {

        setStatus('error', 'タイムアウト / Timeout');

        displayOutput('// タイムアウトエラー / Timeout Error\n// コードの実行が25秒を超えました。\n// 無限ループなどがないか確認してください。\n// 代码执行超过25秒，请检查是否有死循环。', 'error');

      } else if (err.message.includes('fetch') || err.message.includes('Failed')) {

        setStatus('error', 'サーバー未起動 / Server Off');

        displayOutput(

          '// ⚠️ ローカルサーバーが起動していません / Local server not running\n\n' +

          '// アプリを正しく起動してください：\n' +

          '// 1. Launcher.exe をダブルクリックして起動\n' +

          '// 2. ブラウザからアクセス（http://127.0.0.1:PORT）\n\n' +

          '// ※ ブラウザから直接 index.html を开いた場合はサーバー機能が使えません。',

          'error'

        );

      } else {

        setStatus('error', 'エラー / Error');

        displayOutput(`// エラー / Error:\n${err.message}`, 'error');

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

      setStatus('error', 'コンパイルエラー / Compile Error');

      outputText = '❌ コンパイルエラー / Compile Error:\n\n' + result.compileError;

      outputClass = 'error';

    } else if (hasRuntimeError) {

      setStatus('error', '実行エラー / Runtime Error');

      outputText = (hasOutput ? '// 出力 / Output:\n' + result.output + '\n\n' : '') +

                   '⚠️ 実行エラー / Runtime Error:\n' + result.runtimeError;

      outputClass = 'error';

    } else if (hasOutput) {

      setStatus('success', '成功 / Success ✓');

      outputText = result.output;

      outputClass = 'success';

    } else {

      setStatus('success', '完了 / Done ✓');

      outputText = '// プログラムが正常に終了しました（出力なし）\n// Program finished successfully (no output)';

      outputClass = 'success';

    }



    // Show timing info if available

    if (result.executionTimeMs != null) {

      outputText += `\n\n// 実行時間 / Time: ${result.executionTimeMs}ms`;

    }



    displayOutput(outputText, outputClass);
    if (window.StudyAI) StudyAI.gradeGeneratedExecution('java', result);
    if (window.StudyAI) {
      StudyAI.track({
        subject: 'java',
        eventType: 'code_run',
        itemId: currentLesson ? currentLesson.id : '',
        topic: currentLesson ? (currentLesson.titleZh || currentLesson.titleJa) : 'Java sandbox',
        success: !hasCompileError && !hasRuntimeError,
        durationMs: result.executionTimeMs,
        errorType: hasCompileError ? 'compile_error' : (hasRuntimeError ? 'runtime_error' : ''),
        metadata: { error: String(result.compileError || result.runtimeError || '').slice(0, 500) }
      });
    }


    // Handle Stepper tabs visibility and preloading

    const stepperTab = document.getElementById("java-tab-stepper");

    if (stepperTab) {

      stepperTab.style.display = hasCompileError || hasRuntimeError ? "none" : "inline-flex";

    }

    

    if (!hasCompileError && !hasRuntimeError) {

      const code = getEditor().value;

      loadTraceSteps('java', code);

      if (typeof switchJavaOutputTab === 'function') {
        switchJavaOutputTab('console');
      }

    }



    // Mark lesson as completed if success (update progress)

    if (!hasCompileError && !hasRuntimeError && currentLesson) {

      markLessonProgress(currentLesson.id, 'code_run');

    }

  }




  // ─── Output Tab Switching ─────────────────────────────────────────
  function switchJavaOutputTab(tabName) {
    // Ensure output card is visible
    const outputCard = document.getElementById('java-output-card');
    if (outputCard) outputCard.style.display = '';
    
    // Switch between tabs if they exist
    const tabs = ['console', 'stepper', 'ai-debugger'];
    tabs.forEach(tab => {
      const tabEl = document.getElementById('java-tab-' + tab);
      const panelEl = document.getElementById('java-panel-' + tab);
      if (tabEl) tabEl.classList.toggle('active', tab === tabName);
      if (panelEl) panelEl.style.display = tab === tabName ? '' : 'none';
    });
  }

  window.switchJavaOutputTab = switchJavaOutputTab;
  // ─── Output Display ──────────────────────────────────────────────────────
  function displayOutput(text, type) {

    const out = getOutput();

    if (!out) return;

    out.textContent = text;

    out.className = 'java-output-content';

    

    // Clear/hide AI debugger panel by default

    const debugPanel = document.getElementById('java-ai-debugger');

    if (debugPanel) {

      debugPanel.style.display = 'none';

      debugPanel.textContent = '';

    }



    if (type === 'error') {

      out.classList.add('java-output-error');

      

      // Render AI Debugger Button if there is a real error message

      if (debugPanel && text.trim().length > 0 && !text.includes('Please enter some code')) {

        debugPanel.style.display = 'block';

        debugPanel.replaceChildren();
        var _dbgDiv2 = document.createElement("div");
        _dbgDiv2.style.cssText = "margin-top:12px;text-align:center;";
        var _dbgBtn2 = document.createElement("button");
        _dbgBtn2.className = "ai-debug-btn";
        var _safeCode2 = document.getElementById("java-editor") ? document.getElementById("java-editor").value.trim() : "";
        var _safeText2 = text;
        _dbgBtn2.addEventListener("click", function() {
          triggerAiDebug("java", _safeCode2, _safeText2);
        });
        var _dbgIcon2 = document.createElement("i");
        _dbgIcon2.className = "fa-solid fa-robot";
        _dbgBtn2.appendChild(_dbgIcon2);
        _dbgBtn2.appendChild(document.createTextNode(" AI \u5e2e\u6211\u770b\u770b"));
        _dbgDiv2.appendChild(_dbgBtn2);
        debugPanel.appendChild(_dbgDiv2);

      }

    }

    if (type === 'success') out.classList.add('java-output-success');

  }



  // ─── Status Badge ─────────────────────────────────────────────────────────

  function setStatus(type, text) {

    const el = getStatus();

    if (!el) return;

    el.textContent = text;

    el.className = 'java-sandbox-status';

    const classMap = {

      running: 'java-status-running',

      success: 'java-status-success',

      error:   'java-status-error',

      ready:   'java-status-idle'

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

    const section = document.getElementById('java-vocab-section');

    if (section) section.style.display = 'flex';



    const card = vocab[vocabIndex];

    const termEl = document.getElementById('java-card-term');

    const zhEl   = document.getElementById('java-card-zh');

    const descEl = document.getElementById('java-card-desc');



    if (termEl) termEl.textContent = card.term;

    if (zhEl)   zhEl.textContent   = card.zh;

    if (descEl) descEl.textContent = card.desc;



    // Reset flip state

    isFlipped = false;

    const flashcard = document.getElementById('java-flashcard');

    if (flashcard) flashcard.classList.remove('flipped');



    updateVocabCounter();

  }



  // ─── Progress Tracking ───────────────────────────────────────────────────

  function markLessonProgress(lessonId, action) {

    if (typeof markJavaProgress === 'function') {

      markJavaProgress(lessonId, action);

    }

  }



  function updateProgressDisplay() {

    const el = document.getElementById('java-chapter-progress');

    if (!el || typeof JAVA_LESSONS === 'undefined') return;



    const total = JAVA_LESSONS.length;

    const completed = JAVA_LESSONS.filter(l => {

      const key = 'java_progress_' + l.id;

      const data = JSON.parse(localStorage.getItem(key) || '{}');

      return data.quizDone || data.codeRun;

    }).length;



    const pct = Math.round((completed / total) * 100);

    const nyumonDone = JAVA_LESSONS.filter(l => l.book === '入門編' &&

      JSON.parse(localStorage.getItem('java_progress_' + l.id) || '{}').quizDone).length;

    const jissenDone = JAVA_LESSONS.filter(l => l.book === '実践編' &&

      JSON.parse(localStorage.getItem('java_progress_' + l.id) || '{}').quizDone).length;



        el.replaceChildren();
    el.appendChild(document.createTextNode("\u5168\u4f53 " + pct + "% (" + completed + "/" + total + ") \u2713"));
    el.appendChild(document.createElement("br"));
    el.appendChild(document.createTextNode("\u5165\u9580\u7de8 Quiz\u5b8c\u4e86: " + nyumonDone + "/8 \u7ae0"));
    el.appendChild(document.createElement("br"));
    el.appendChild(document.createTextNode("\u5b9f\u7df4\u7de8 Quiz\u5b8c\u4e86: " + jissenDone + "/11 \u7ae0"));


  }



  function hideVocabSection() {

    const section = document.getElementById('java-vocab-section');

    if (section) section.style.display = 'none';

  }



  function updateVocabCounter() {

    const counter = document.getElementById('java-vocab-counter');

    if (!counter || !currentLesson || !currentLesson.vocabList) return;

    counter.textContent = `${vocabIndex + 1} / ${currentLesson.vocabList.length}`;

  }



  function flipCard() {

    const flashcard = document.getElementById('java-flashcard');

    if (!flashcard) return;

    isFlipped = !isFlipped;

    flashcard.classList.toggle('flipped', isFlipped);

  }



  function vocabNext() {

    if (!currentLesson || !currentLesson.vocabList) return;

    vocabIndex = (vocabIndex + 1) % currentLesson.vocabList.length;

    renderVocabCard();

  }



  function vocabPrev() {

    if (!currentLesson || !currentLesson.vocabList) return;

    vocabIndex = (vocabIndex - 1 + currentLesson.vocabList.length) % currentLesson.vocabList.length;

    renderVocabCard();

  }



  // ─── Init Keyboard Shortcuts ─────────────────────────────────────────────

  function initKeyboardShortcuts() {

    const editor = getEditor();

    if (!editor) return;



    // Ctrl+Enter to run, Tab/Enter auto-indentation and formatting

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

      // Enter -> Auto-indentation

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



        // Check if current line ends with '{'

        const endsWithBrace = currentLine.trim().endsWith('{');



        // Check if next character is '}'

        const isNextBrace = val.charAt(start) === '}';



        let insertText = '';

        let newCursorPos = start;



        if (endsWithBrace) {

          if (isNextBrace) {

            // Insert newline with extra indent, then another newline with base indent

            const extraIndent = indent + '    ';

            insertText = '\n' + extraIndent + '\n' + indent;

            newCursorPos = start + 1 + extraIndent.length;

          } else {

            const extraIndent = indent + '    ';

            insertText = '\n' + extraIndent;

            newCursorPos = start + insertText.length;

          }

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



    // Update line numbers and highlight on input

    editor.addEventListener('input', () => {

      updateLineNumbers();

      queueHighlightUpdate();

    });

    editor.addEventListener('scroll', () => {

      const lnContainer = document.getElementById('java-line-numbers');

      if (lnContainer) lnContainer.scrollTop = editor.scrollTop;

      

      const overlay = document.getElementById('java-highlight-overlay');

      if (overlay) {

        overlay.scrollTop = editor.scrollTop;

        overlay.scrollLeft = editor.scrollLeft;

      }

    });

    editor.addEventListener('focus', () => {

      const card = document.getElementById('java-sandbox-card');

      if (card) card.scrollTop = 0;

      const body = document.querySelector('.java-sandbox-body');

      if (body) body.scrollTop = 0;

    });

  }



  // ─── Init ─────────────────────────────────────────────────────────────────

  function init() {

    initKeyboardShortcuts();



    // Set initial template

    setTemplate(getDefaultTemplate());



    console.log('[JavaSandbox] Initialized. Lessons available:', 

      typeof JAVA_LESSONS !== 'undefined' ? JAVA_LESSONS.length : 'N/A');

  }



  // Auto-init when DOM is ready

  if (document.readyState === 'loading') {

    document.addEventListener('DOMContentLoaded', init);

  } else {

    setTimeout(init, 50);

  }



  // ─── Public API ──────────────────────────────────────────────────────────

  return {

    loadLesson,

    setTemplate,

    getDefaultTemplate,

    clearCode,

    copyCode,

    runCode,

    flipCard,

    vocabNext,

    vocabPrev,

    updateProgressDisplay,

    toggleTemplate,

    getCurrentBook: () => currentJavaBook,

    setCurrentBook: (book) => { currentJavaBook = book; }

  };

})();



// ─── Global bridge functions (called from HTML onclick attrs) ─────────────────

function javaFlipCard()  { JavaSandbox.flipCard(); }

function javaVocabNext() { JavaSandbox.vocabNext(); }

function javaVocabPrev() { JavaSandbox.vocabPrev(); }

