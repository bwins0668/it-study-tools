(function () {
  'use strict';

  var content = window.MOS365Content;
  if (!content || document.getElementById('mos365-shell')) return;

  var STORAGE_KEY = 'study-tools.mos365.v1.records';
  var state = { view: 'dashboard', session: null, examTimer: null, environment: null, launchState: null, mvpInProgress: false, launchPollTimer: null };

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char];
    });
  }

  function readRecords() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (_) { return []; }
  }

  function saveRecords(records) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(-100)));
  }

  function api(path, body, method) {
    return window.fetch(path, {
      method: method || 'POST',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'same-origin'
    }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (payload) {
        if (!response.ok || payload.success === false) {
          var error = new Error(payload.messageJa || payload.messageZh || 'Request failed');
          error.payload = payload;
          throw error;
        }
        return payload.data;
      });
    });
  }

  function scheduleLaunchPoll(delay) {
    if (state.launchPollTimer) return;
    state.launchPollTimer = window.setTimeout(function () {
      state.launchPollTimer = null;
      pollLaunchState();
    }, delay);
  }

  function addStyles() {
    var style = document.createElement('style');
    style.textContent = [
      '#mos365-shell{position:fixed;inset:0;z-index:10060;display:none;background:rgba(20,28,25,.55);padding:28px;box-sizing:border-box}',
      '#mos365-shell.is-open{display:block}',
      '.mos365-panel{height:100%;max-width:1320px;margin:0 auto;display:flex;flex-direction:column;overflow:hidden;background:#fbfbf7;color:#20322b;border-radius:18px;box-shadow:0 20px 80px rgba(0,0,0,.35);font-family:system-ui,-apple-system,"Segoe UI","Noto Sans JP",sans-serif}',
      '.mos365-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:19px 24px;background:#174735;color:#fff}.mos365-head h2{font-size:19px;margin:0}.mos365-head small{opacity:.82}.mos365-close{color:#fff;background:transparent;border:1px solid rgba(255,255,255,.55);border-radius:8px;padding:7px 10px;cursor:pointer}',
      '.mos365-body{min-height:0;display:flex;flex:1}.mos365-nav{width:224px;overflow-y:auto;padding:16px;background:#f0f4f0;border-right:1px solid #d8e0d9}.mos365-nav button{display:block;width:100%;padding:10px 12px;margin:0 0 5px;text-align:left;border:0;border-radius:8px;background:transparent;color:#264236;cursor:pointer;font-weight:650}.mos365-nav button:hover,.mos365-nav button.active{background:#d7e9de;color:#0e5638}',
      '.mos365-main{flex:1;overflow:auto;padding:26px}.mos365-main h3{margin:0 0 8px;font-size:24px}.mos365-muted{color:#587065}.mos365-grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));margin:18px 0}.mos365-card{border:1px solid #d7dfd8;border-radius:12px;background:#fff;padding:16px}.mos365-card h4{margin:0 0 8px;font-size:16px}.mos365-card p{margin:6px 0;line-height:1.55}.mos365-kpi{font-size:27px;font-weight:750;color:#174735}.mos365-domain{display:grid;grid-template-columns:minmax(155px,1fr) 2fr 50px;gap:10px;align-items:center;margin:10px 0}.mos365-bar{height:10px;background:#e6ece7;border-radius:8px;overflow:hidden}.mos365-bar i{display:block;height:100%;background:#23794f;border-radius:8px}',
      '.mos365-btn{border:0;border-radius:8px;background:#1d6745;color:#fff;padding:9px 13px;cursor:pointer;font-weight:700}.mos365-btn.secondary{background:#e5ece7;color:#244232}.mos365-btn.danger{background:#9a3a35}.mos365-btn[disabled]{opacity:.55;cursor:wait}.mos365-actions{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}.mos365-list{display:grid;gap:10px}.mos365-item{border:1px solid #dce4dd;background:#fff;border-radius:10px;padding:13px}.mos365-item h4{margin:0 0 6px}.mos365-item p{margin:5px 0;line-height:1.5}.mos365-tag{display:inline-block;padding:2px 7px;margin-right:5px;border-radius:999px;background:#e8f2eb;color:#24563b;font-size:12px}.mos365-lesson-detail{white-space:pre-line}',
      '.mos365-question button{display:block;width:100%;text-align:left;border:1px solid #d1dbd3;background:#fff;border-radius:8px;padding:10px;margin:8px 0;cursor:pointer}.mos365-question button.correct{border-color:#1d7c45;background:#e4f5e8}.mos365-question button.wrong{border-color:#ab3933;background:#fdeceb}.mos365-notice{border-left:4px solid #1e714b;background:#edf6ef;padding:11px 13px;margin:14px 0;line-height:1.5}.mos365-error{border-left-color:#b33b36;background:#fff0ee}.mos365-exam{max-width:1000px;margin:0 auto}.mos365-exam-top{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #dbe2dc;padding-bottom:14px;margin-bottom:18px}.mos365-exam-task{font-size:18px;line-height:1.7;padding:17px;border:1px solid #d8e0d9;border-radius:12px;background:#fff;margin:12px 0}.mos365-exam-list{max-height:300px;overflow:auto}.mos365-results table{width:100%;border-collapse:collapse;font-size:13px}.mos365-results th,.mos365-results td{border-bottom:1px solid #dce4dd;padding:8px;text-align:left;vertical-align:top}',
      '@media(max-width:760px){#mos365-shell{padding:0}.mos365-panel{border-radius:0}.mos365-body{display:block}.mos365-nav{width:auto;display:flex;overflow-x:auto;padding:8px;border-right:0;border-bottom:1px solid #d8e0d9}.mos365-nav button{width:auto;white-space:nowrap;margin:0 4px 0 0}.mos365-main{padding:18px}.mos365-head{padding:14px}.mos365-head h2{font-size:16px}.mos365-domain{grid-template-columns:1fr 2fr 42px}.mos365-results{overflow:auto}.mos365-results table{min-width:760px}}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildShell() {
    var shell = document.createElement('section');
    shell.id = 'mos365-shell';
    shell.setAttribute('aria-hidden', 'true');
    shell.innerHTML = '<div class="mos365-panel" role="dialog" aria-modal="true" aria-label="MOS Excel 365"><header class="mos365-head"><div><h2>MOS Excel 365（日语版）合格作战中心</h2><small>Microsoft Excel 365 一般 / 日本語版トレーニング</small></div><button class="mos365-close" type="button">閉じる</button></header><div class="mos365-body"><nav class="mos365-nav" aria-label="MOS navigation"></nav><main class="mos365-main"></main></div></div>';
    shell.querySelector('.mos365-close').addEventListener('click', close);
    shell.addEventListener('click', function (event) { if (event.target === shell) close(); });
    document.body.appendChild(shell);
  }

  function buildModuleEntry() {
    var panel = document.getElementById('module-switch-panel');
    var body = panel && panel.querySelector('.module-switch-panel__body');
    if (!body || document.getElementById('module-switch-option-mos365')) return;

    var entry = document.createElement('button');
    entry.id = 'module-switch-option-mos365';
    entry.className = 'module-switch-option';
    entry.type = 'button';
    entry.dataset.module = 'mos365';
    entry.setAttribute('aria-haspopup', 'dialog');
    entry.innerHTML = '<span class="module-switch-option__icon"><i class="fa-solid fa-file-excel"></i></span>' +
      '<span class="module-switch-option__text"><strong>MOS Excel 365</strong><small>Excel 365 日本語版トレーニング</small></span>';
    entry.addEventListener('click', function () {
      var closeButton = panel.querySelector('.module-switch-close');
      if (closeButton) closeButton.click();
      open();
    });
    body.appendChild(entry);
  }

  function open() {
    document.getElementById('mos365-shell').classList.add('is-open');
    document.getElementById('mos365-shell').setAttribute('aria-hidden', 'false');
    render();
  }

  function close() {
    stopExamTimer();
    document.getElementById('mos365-shell').classList.remove('is-open');
    document.getElementById('mos365-shell').setAttribute('aria-hidden', 'true');
  }

  var navItems = [
    ['dashboard', '考试目标与进度'], ['learn', '从零开始学'], ['dictionary', '功能・函数词典'], ['practice', '考点专项练习'],
    ['guided', '指导式实机练习'], ['mvp', 'MOS 実技トレーニング（MVP）'], ['mock', '50分钟真机模拟'], ['wrong', '错题与薄弱项'], ['readiness', '报名准备度'], ['environment', '実機環境チェック']
  ];

  function renderNavigation() {
    var nav = document.querySelector('.mos365-nav');
    if (state.view === 'exam' || state.view === 'mvp') {
      nav.innerHTML = '';
      nav.style.display = 'none';
      return;
    }
    nav.style.display = '';
    nav.innerHTML = navItems.map(function (item) {
      return '<button type="button" data-view="' + item[0] + '" class="' + (state.view === item[0] ? 'active' : '') + '">' + item[1] + '</button>';
    }).join('');
    nav.querySelectorAll('button').forEach(function (button) {
      button.addEventListener('click', function () { state.view = button.dataset.view; render(); });
    });
  }

  function render() {
    var headerTitle = document.querySelector('.mos365-head h2');
    var headerSub = document.querySelector('.mos365-head small');
    if (state.view === 'exam') {
      headerTitle.textContent = 'MOS Excel 365 実機模擬トレーニング'; if (state.view === 'mvp') { headerTitle.textContent = 'MOS 実技トレーニング（MVP）'; headerSub.textContent = '原创学习与训练内容 / オリジナル学習コンテンツ'; }
      headerSub.textContent = 'オリジナル学習・練習コンテンツ';
    } else {
      headerTitle.textContent = 'MOS Excel 365（日语版）合格作战中心';
      headerSub.textContent = 'Microsoft Excel 365 一般 / 日本語版トレーニング';
    }
    renderNavigation();
    var main = document.querySelector('.mos365-main');
    var views = {
      dashboard: renderDashboard, learn: renderLearn, dictionary: renderDictionary, practice: renderPractice,
      guided: renderGuided, mvp: renderMvp, mock: renderMock, wrong: renderWrong, readiness: renderReadiness, environment: renderEnvironment,
      exam: renderExam, review: renderReview
    };
    (views[state.view] || renderDashboard)(main);
  }

  function recordsFor(type) {
    return readRecords().filter(function (item) { return !type || item.type === type; });
  }

  function skillScore(skillId) {
    var hits = [];
    readRecords().forEach(function (record) {
      (record.results || []).forEach(function (result) { if ((result.skillIds || []).indexOf(skillId) !== -1) hits.push(result); });
    });
    if (!hits.length) return null;
    var score = hits.reduce(function (sum, item) { return sum + (item.maxScore ? item.score / item.maxScore : 0); }, 0) / hits.length;
    return Math.round(score * 100);
  }

  function readiness() {
    var valid = recordsFor('mock').filter(function (record) {
      return record.completed && record.scored && record.noHints && record.fullJapanese && record.durationMinutes >= 50;
    }).slice(-3);
    return { valid: valid, ready: valid.length === 3 && valid.every(function (record) { return record.percentage >= 90; }) };
  }

  function renderDashboard(main) {
    var records = readRecords();
    var mockRecords = recordsFor('mock');
    var best = mockRecords.reduce(function (current, item) { return Math.max(current, item.percentage || 0); }, 0);
    var learned = new Set(records.filter(function (x) { return x.type === 'lesson'; }).map(function (x) { return x.skillId; }));
    var readinessState = readiness();
    var domainHtml = content.domains.map(function (domain) {
      var domainSkills = content.skills.filter(function (skill) { return skill.domainId === domain.id; });
      var values = domainSkills.map(function (skill) { return skillScore(skill.id); }).filter(function (value) { return value != null; });
      var percent = values.length ? Math.round(values.reduce(function (a, b) { return a + b; }, 0) / values.length) : 0;
      return '<div class="mos365-domain"><span>' + escapeHtml(domain.zh) + '<br><small>' + escapeHtml(domain.ja) + '</small></span><span class="mos365-bar"><i style="width:' + percent + '%"></i></span><strong>' + percent + '%</strong></div>';
    }).join('');
    main.innerHTML = '<h3>目标考试：MOS Excel 365（一般）日本語版</h3><p class="mos365-muted">从中日双语学习开始，再逐步进入全日文、无提示的 50 分钟原创真机模拟。</p>' +
      '<div class="mos365-grid"><article class="mos365-card"><h4>已掌握技能</h4><div class="mos365-kpi">' + learned.size + ' / ' + content.skills.length + '</div></article><article class="mos365-card"><h4>普通练习正确率</h4><div class="mos365-kpi">' + practiceAccuracy() + '%</div></article><article class="mos365-card"><h4>模拟最高分</h4><div class="mos365-kpi">' + best + '%</div></article><article class="mos365-card"><h4>连续 3 次 90%+</h4><div class="mos365-kpi">' + (readinessState.ready ? '達成' : readinessState.valid.length + ' / 3') + '</div></article></div>' +
      '<section class="mos365-card"><h4>五大领域掌握度</h4>' + domainHtml + '</section>' +
      '<div class="mos365-notice">受験準備度は学習上の目安であり、公式試験の合格を保証するものではありません。<br>“报名准备度”仅为学习系统训练建议，不代表官方合格保证。</div>';
  }

  function markLesson(skillId) {
    var records = readRecords();
    records.push({ type: 'lesson', skillId: skillId, completedAt: new Date().toISOString() });
    saveRecords(records);
  }

  function renderLearn(main) {
    main.innerHTML = '<h3>从零开始学</h3><p class="mos365-muted">日文主内容 + 中文辅助。每节都包含菜单、步骤、快捷键、例子、易错点和理解检查。</p><div class="mos365-list">' + content.lessons.map(function (lesson, index) {
      return '<article class="mos365-item"><h4>' + escapeHtml(lesson.titleJa) + '</h4><p><strong>中文：</strong>' + escapeHtml(lesson.titleZh) + '</p><p><strong>日本語：</strong>' + escapeHtml(lesson.conceptJa) + '</p><p><strong>中文：</strong>' + escapeHtml(lesson.conceptZh) + '</p><div class="mos365-actions"><button class="mos365-btn secondary" data-lesson="' + index + '">查看课程</button><button class="mos365-btn" data-complete="' + escapeHtml(lesson.skillId) + '">标记已学</button></div><div class="mos365-lesson-detail" id="moslesson-' + index + '"></div></article>';
    }).join('') + '</div>';
    main.querySelectorAll('[data-lesson]').forEach(function (button) { button.addEventListener('click', function () {
      var lesson = content.lessons[Number(button.dataset.lesson)];
      document.getElementById('moslesson-' + button.dataset.lesson).innerHTML = '<p><strong>日文菜单：</strong>' + escapeHtml(lesson.menuJa) + '</p><p><strong>操作：</strong>' + lesson.stepsJa.map(escapeHtml).join(' → ') + '</p><p><strong>中文说明：</strong>' + lesson.stepsZh.map(escapeHtml).join(' → ') + '</p><p><strong>快捷键：</strong>' + escapeHtml(lesson.keyboardJa) + '</p><p><strong>容易犯错：</strong>' + escapeHtml(lesson.mistakeZh) + '</p><p><strong>理解检查：</strong>' + escapeHtml(lesson.checkJa) + '<br>' + escapeHtml(lesson.checkZh) + '</p>';
    }); });
    main.querySelectorAll('[data-complete]').forEach(function (button) { button.addEventListener('click', function () { markLesson(button.dataset.complete); button.textContent = '已记录'; button.disabled = true; }); });
  }

  function renderDictionary(main) {
    main.innerHTML = '<h3>功能・函数词典</h3><p class="mos365-muted">主力考点与实务扩展分开标注，不把扩展函数混成核心备考范围。</p><div class="mos365-list">' + content.dictionary.map(function (entry) {
      return '<article class="mos365-item"><h4>' + escapeHtml(entry.name) + ' <span class="mos365-tag">' + escapeHtml(entry.tier) + '</span></h4><p><strong>日文：</strong>' + escapeHtml(entry.descriptionJa) + '<br><strong>中文：</strong>' + escapeHtml(entry.descriptionZh) + '</p><p><code>' + escapeHtml(entry.syntax) + '</code></p><p><strong>メニュー：</strong>' + escapeHtml(entry.menuJa) + '<br><strong>中文入口：</strong>' + escapeHtml(entry.menuZh) + '</p><p><strong>常见错误：</strong>' + escapeHtml(entry.errorsZh) + '</p><p><strong>关联技能：</strong>' + entry.skillIds.map(escapeHtml).join('、') + '</p></article>';
    }).join('') + '</div>';
  }

  function practiceAccuracy() {
    var attempts = recordsFor('practice');
    if (!attempts.length) return 0;
    return Math.round(attempts.reduce(function (sum, item) { return sum + (item.correct ? 100 : 0); }, 0) / attempts.length);
  }

  function renderPractice(main) {
    var question = content.exercises[Math.floor(Math.random() * content.exercises.length)];
    main.innerHTML = '<h3>考点专项练习</h3><p class="mos365-muted">日文题目在前，中文辅助在后。这里记录理解确认、公式、错误诊断与日文任务句理解。</p><section class="mos365-card mos365-question"><span class="mos365-tag">' + escapeHtml(question.type) + '</span><h4>' + escapeHtml(question.promptJa) + '</h4><p><strong>中文辅助：</strong>' + escapeHtml(question.promptZh) + '</p><div id="mos-practice-options">' + question.optionsJa.map(function (option, index) { return '<button type="button" data-answer="' + index + '">' + String.fromCharCode(65 + index) + '. ' + escapeHtml(option) + '</button>'; }).join('') + '</div><div id="mos-practice-result"></div></section>';
    main.querySelectorAll('[data-answer]').forEach(function (button) { button.addEventListener('click', function () {
      var chosen = Number(button.dataset.answer); var correct = chosen === question.answerIndex;
      main.querySelectorAll('[data-answer]').forEach(function (item) { item.disabled = true; });
      button.classList.add(correct ? 'correct' : 'wrong');
      var answer = main.querySelector('[data-answer="' + question.answerIndex + '"]'); if (answer) answer.classList.add('correct');
      var records = readRecords(); records.push({ type: 'practice', skillId: question.skillId, correct: correct, completedAt: new Date().toISOString() }); saveRecords(records);
      document.getElementById('mos-practice-result').innerHTML = '<div class="mos365-notice"><strong>' + (correct ? '正解 / 正确' : 'もう一度 / 再试一次') + '</strong><br>' + escapeHtml(question.explanationJa) + '<br>' + escapeHtml(question.explanationZh) + '</div>';
    }); });
  }

  function renderGuided(main) {
    main.innerHTML = '<h3>指导式实机练习</h3><p class="mos365-muted">使用真实本机 Excel；说明、步骤与提示保持中日双语。不计时，可保存后回到这里自动评分。</p><div class="mos365-list">' + content.guidedPractices.map(function (item, index) {
      return '<article class="mos365-item"><h4>' + escapeHtml(item.titleJa) + '</h4><p><strong>中文：</strong>' + escapeHtml(item.titleZh) + '</p><p><strong>任务：</strong>' + escapeHtml(item.taskJa) + '<br>' + escapeHtml(item.taskZh) + '</p><details><summary>ヒント / 提示</summary><p>' + item.hintsJa.map(escapeHtml).join('<br>') + '<br><br>' + item.hintsZh.map(escapeHtml).join('<br>') + '</p></details><div class="mos365-actions"><button class="mos365-btn" data-guided="' + index + '">创建练习文件</button></div></article>';
    }).join('') + '</div>';
    main.querySelectorAll('[data-guided]').forEach(function (button) { button.addEventListener('click', function () { startGuided(Number(button.dataset.guided), button); }); });
  }

  function startGuided(index, button) {
    var item = content.guidedPractices[index];
    button.disabled = true; button.textContent = '创建中…';
    api('/api/mos365/sessions', { mode: 'guided', scenarioId: 'retail', variant: (index % 4) + 1 }).then(function (session) {
      state.session = session;
      button.disabled = false; button.textContent = '已创建';
      var container = button.closest('.mos365-item');
      var extra = document.createElement('div');
      extra.innerHTML = '<div class="mos365-notice"><strong>练习文件已创建</strong><br>仅位于本次 LocalAppData 会话沙盒中：' + escapeHtml(session.fileName) + '</div><div class="mos365-actions"><button class="mos365-btn" data-open-excel>Excel で開く / 在 Excel 打开</button><button class="mos365-btn secondary" data-grade>保存後に採点 / 保存后评分</button></div><div data-guided-output></div>';
      container.appendChild(extra);
      extra.querySelector('[data-open-excel]').addEventListener('click', function () { launchCurrent(extra.querySelector('[data-guided-output]')); });
      extra.querySelector('[data-grade]').addEventListener('click', function () { gradeCurrent('guided', false, extra.querySelector('[data-guided-output]')); });
    }).catch(function (error) { button.disabled = false; button.textContent = '创建练习文件'; alert(error.message); });
  }

  function renderMock(main) {
    main.innerHTML = '<h3>MOS Excel 365 実機模擬トレーニング</h3><p class="mos365-muted">原创学习与训练内容。Microsoft、Certiport、GMetrix 等の公式試験クライアントではありません。</p><div class="mos365-notice">開始後は、問題・状態・操作ボタンを含めて日本語のみで表示します。中国語の翻訳、ヒント、正解、メニュー経路は試験中に表示されません。</div><div class="mos365-list">' + content.mockBlueprints.map(function (blueprint, index) {
      return '<article class="mos365-item"><h4>' + escapeHtml(blueprint.titleJa) + '</h4><p><strong>中文场景：</strong>' + escapeHtml(blueprint.titleZh) + '</p><p>50 分 / 全日文 / 无提示 / ' + blueprint.tasks.length + ' 个自动评分点 / 4 个可复现变式</p><div class="mos365-actions"><select data-variant="' + index + '"><option value="1">変式 1</option><option value="2">変式 2</option><option value="3">変式 3</option><option value="4">変式 4</option></select><button class="mos365-btn" data-mock="' + index + '">模擬を開始する</button></div></article>';
    }).join('') + '</div>';
    main.querySelectorAll('[data-mock]').forEach(function (button) { button.addEventListener('click', function () {
      var index = Number(button.dataset.mock); var variant = Number(main.querySelector('[data-variant="' + index + '"]').value); startMock(index, variant, button);
    }); });
  }

  function startMock(index, variant, button) {
    button.disabled = true; button.textContent = '準備中…';
    var blueprint = content.mockBlueprints[index];
    api('/api/mos365/sessions', { mode: 'mock', scenarioId: blueprint.scenarioId, variant: variant }).then(function (session) {
      state.session = session;
      state.session.startedAt = Date.now();
      state.session.durationMinutes = 50;
      state.view = 'exam';
      render();
      startExamTimer();
    }).catch(function (error) { button.disabled = false; button.textContent = '模擬を開始する'; alert(error.message); });
  }

  function renderExam(main) {
    var session = state.session;
    if (!session) { state.view = 'mock'; render(); return; }
    main.innerHTML = '<section class="mos365-exam"><div class="mos365-exam-top"><div><strong>MOS Excel 365 実機模擬トレーニング</strong><br><small>オリジナル学習・練習コンテンツ</small></div><div><strong id="mos-exam-clock">50:00</strong></div></div><p>Excel の保存後、この画面に戻って提出してください。</p><div class="mos365-actions"><button class="mos365-btn" data-exam-open>Excel でファイルを開く</button><button class="mos365-btn danger" data-exam-submit>提出して採点する</button></div><div class="mos365-exam-list">' + session.tasks.map(function (task) { return '<article class="mos365-exam-task"><strong>' + escapeHtml(task.instructionJa) + '</strong></article>'; }).join('') + '</div></section>';
    main.querySelector('[data-exam-open]').addEventListener('click', function () { launchCurrent(null, true); });
    main.querySelector('[data-exam-submit]').addEventListener('click', function () {
      if (window.confirm('提出後、ファイルを採点します。続けますか？')) gradeCurrent('mock', true, null);
    });
  }

  function startExamTimer() {
    stopExamTimer();
    state.examTimer = window.setInterval(function () {
      var label = document.getElementById('mos-exam-clock');
      if (!label || !state.session) return;
      var elapsed = Math.floor((Date.now() - state.session.startedAt) / 1000);
      var remaining = Math.max(0, 50 * 60 - elapsed);
      label.textContent = String(Math.floor(remaining / 60)).padStart(2, '0') + ':' + String(remaining % 60).padStart(2, '0');
      if (!remaining) { stopExamTimer(); label.textContent = '00:00'; }
    }, 1000);
  }

  function stopExamTimer() { if (state.examTimer) { window.clearInterval(state.examTimer); state.examTimer = null; } }

  function launchCurrent(output, japaneseOnly) {
    if (!state.session) return;
    api('/api/mos365/launch', { sessionId: state.session.sessionId }).then(function (launchData) {
      state.session.processId = launchData.processId;
      if (output) output.innerHTML = '<div class="mos365-notice">'
        + (japaneseOnly ? 'Excel を起動しました（PID: ' + launchData.processId + '）。VSTO パネルが接続中です…' : '已启动 Excel（PID: ' + launchData.processId + '）。正在连接 VSTO 本地面板…')
        + '</div>';
    }).catch(function (error) {
      if (output) output.innerHTML = '<div class="mos365-notice mos365-error">' + escapeHtml(japaneseOnly ? (error.payload && error.payload.messageJa || error.message) : (error.payload && error.payload.messageZh || error.message)) + '</div>';
      else alert(error.message);
    });
  }

  function gradeCurrent(type, japaneseOnly, output) {
    if (!state.session) return;
    api('/api/mos365/score', { sessionId: state.session.sessionId }).then(function (result) {
      var elapsed = Math.max(0, Math.floor((Date.now() - (state.session.startedAt || Date.now())) / 60000));
      var records = readRecords();
      records.push({ type: type, sessionId: state.session.sessionId, completed: true, scored: true, noHints: type === 'mock', fullJapanese: type === 'mock', durationMinutes: elapsed, percentage: result.percentage, results: result.results, completedAt: new Date().toISOString() });
      saveRecords(records);
      stopExamTimer();
      state.session.result = result;
      if (type === 'mock') { state.view = 'review'; render(); }
      else if (output) { output.innerHTML = resultSummary(result); }
    }).catch(function (error) {
      if (output) output.innerHTML = '<div class="mos365-notice mos365-error">' + escapeHtml(error.payload && error.payload.messageZh || error.message) + '</div>';
      else alert(error.message);
    });
  }

  function resultSummary(result) {
    return '<div class="mos365-notice"><strong>评分完成：' + result.percentage + '%</strong><br>已按本次 session 文件的 Open XML 内容评分，而非仅按“文件存在”给分。<br>採点結果：' + result.score + ' / ' + result.maxScore + '</div>';
  }

  function renderReview(main) {
    var result = state.session && state.session.result;
    if (!result) { state.view = 'mock'; render(); return; }
    var failed = result.results.filter(function (item) { return item.status !== 'pass'; });
    main.innerHTML = '<h3>採点結果 / 评分结果：' + result.percentage + '%</h3>' + resultSummary(result) + '<div class="mos365-notice">日文原题、中文题意、实际结果与复习建议已恢复显示。弱项会回流到课程和专项练习。</div><div class="mos365-actions"><button class="mos365-btn" data-review-mock>模擬一覧へ</button><button class="mos365-btn secondary" data-review-wrong>薄弱項を見る</button></div><section class="mos365-results"><table><thead><tr><th>任务</th><th>结果</th><th>解释 / 解析</th><th>复习</th></tr></thead><tbody>' + result.results.map(function (item) {
      return '<tr><td>' + escapeHtml(item.taskId) + '<br><small>' + escapeHtml(item.evidence) + '</small></td><td>' + (item.status === 'pass' ? '合格 / 通过' : '未达成 / 未通过') + '<br>' + item.score + '/' + item.maxScore + '</td><td><strong>日：</strong>' + escapeHtml(item.explanationJa) + '<br><strong>中：</strong>' + escapeHtml(item.explanationZh) + '</td><td><strong>日：</strong>' + escapeHtml(item.remediationJa) + '<br><strong>中：</strong>' + escapeHtml(item.remediationZh) + '</td></tr>';
    }).join('') + '</tbody></table></section>';
    main.querySelector('[data-review-mock]').addEventListener('click', function () { state.view = 'mock'; render(); });
    main.querySelector('[data-review-wrong]').addEventListener('click', function () { state.view = 'wrong'; render(); });
  }

  function renderWrong(main) {
    var weak = content.skills.map(function (skill) { return { skill: skill, percent: skillScore(skill.id) }; }).filter(function (item) { return item.percent != null; }).sort(function (a, b) { return a.percent - b.percent; }).slice(0, 16);
    main.innerHTML = '<h3>错题与薄弱项</h3><p class="mos365-muted">你不是“Excel 不行”，而是可以定位到具体技能并回到对应课程、专项练习和实机练习。</p>' + (weak.length ? '<div class="mos365-list">' + weak.map(function (item) { return '<article class="mos365-item"><h4>' + escapeHtml(item.skill.titleJa) + ' <span class="mos365-tag">' + item.percent + '%</span></h4><p>' + escapeHtml(item.skill.titleZh) + '</p><div class="mos365-actions"><button class="mos365-btn secondary" data-weak-learn="' + escapeHtml(item.skill.id) + '">复习课程</button><button class="mos365-btn secondary" data-weak-practice="' + escapeHtml(item.skill.id) + '">专项练习</button></div></article>'; }).join('') + '</div>' : '<div class="mos365-notice">完成专项练习或真机模拟后，这里会显示具体薄弱技能。</div>');
    main.querySelectorAll('[data-weak-learn]').forEach(function (button) { button.addEventListener('click', function () { state.view = 'learn'; render(); }); });
    main.querySelectorAll('[data-weak-practice]').forEach(function (button) { button.addEventListener('click', function () { state.view = 'practice'; render(); }); });
  }

  function renderReadiness(main) {
    var status = readiness();
    main.innerHTML = '<h3>报名准备度</h3><p class="mos365-muted">有效记录条件：正式真机模拟、全日文、未使用提示、50 分钟、已完成评分、90% 以上。</p><section class="mos365-card"><h4>受験準備度：' + (status.ready ? '目標達成' : '未達成') + '</h4><p class="mos365-kpi">' + (status.ready ? '3 / 3' : status.valid.filter(function (item) { return item.percentage >= 90; }).length + ' / 3') + '</p><p>この表示は学習上の目安であり、公式試験の合格を保証するものではありません。<br>此状态只是训练建议，不代表官方合格保证。</p></section><div class="mos365-list">' + (status.valid.length ? status.valid.map(function (record, index) { return '<article class="mos365-item"><strong>' + (index + 1) + '. ' + escapeHtml(record.completedAt) + '</strong><br>スコア：' + record.percentage + '% / 有効：' + (record.percentage >= 90 ? 'はい' : 'いいえ') + '</article>'; }).join('') : '<div class="mos365-notice">まだ有効な正式真机模拟记录はありません。</div>') + '</div>';
  }

  function isTerminalLaunchState(launchState) {
    return !!(launchState && launchState.active &&
      (launchState.state === 'ready' || launchState.state === 'failed' || launchState.state === 'ended'));
  }

  function renderMvp(main) {
    var isCreating = state.mvpInProgress ||
      (state.launchState && state.launchState.active && !isTerminalLaunchState(state.launchState));
    var ls = state.launchState;
    var statusHtml = '';
    if (isCreating || (ls && ls.active)) {
      var statusText = '正在创建训练';
      if (ls && ls.active) {
        var stateMap = {
          creating: '正在创建训练 / トレーニングを作成中',
          launching: '正在打开 Excel / Excel を起動中',
          awaiting_attach: '正在连接训练面板 / トレーニングパネルへ接続中',
          ready: '已开始答题 / Excel で問題を解いてください',
          ended: '训练已结束 / トレーニングを終了しました',
          failed: '启动失败，可安全重试 / 起動に失敗しました'
        };
        statusText = stateMap[ls.state] || ls.state;
      }
      statusHtml = '<div class="mos365-notice"><strong>' + statusText + '</strong></div>';
    }
    main.innerHTML = '<h3>MOS 実技トレーニング</h3><p class="mos365-muted">本物の Excel を使って操作を練習します。评分系统は実際の Open XML 分析に基づきます。</p>' +
      '<div class="mos365-list">' +
      '<article class="mos365-item"><h4>R16: セルに値を入力する</h4><p>「入力」シートの B2 セルに「完了」と入力する練習。</p><div class="mos365-actions"><button class="mos365-btn" data-mvp-start="r16" ' + (isCreating ? 'disabled' : '') + '>開始する（R16）</button></div></article>' +
      '<article class="mos365-item"><h4>R17: 数式を入力する</h4><p>「計算」シートの C2 セルに、A2 から B2 の合計を求める数式を入力する練習。</p><div class="mos365-actions"><button class="mos365-btn" data-mvp-start="r17" ' + (isCreating ? 'disabled' : '') + '>開始する（R17）</button></div></article>' +
      '</div>' + statusHtml +
      '<div id="mos-mvp-output"></div><div class="mos365-actions">' +
      '<button class="mos365-btn danger" data-mvp-clear>重新开始 / リセット</button></div>';
    main.querySelector('[data-mvp-start]') && main.querySelectorAll('[data-mvp-start]').forEach(function (btn) {
      btn.addEventListener('click', function () { startMvpTraining(btn.dataset.mvpStart); });
    });
    main.querySelector('[data-mvp-clear]') && main.querySelector('[data-mvp-clear]').addEventListener('click', function () {
      api('/api/mos365/clear-launch', {}).then(function () { state.mvpInProgress = false; state.launchState = null; render(); });
    });
    if (!isTerminalLaunchState(state.launchState)) scheduleLaunchPoll(0);
  }

  function pollLaunchState() {
    if (state.view !== 'mvp') return;
    api('/api/mos365/launch/state', null, 'GET').then(function (data) {
      if (data && data.active) {
        state.launchState = data;
        if (data.state === 'ready' || data.state === 'failed' || data.state === 'ended') { state.mvpInProgress = false; render(); }
        else { render(); scheduleLaunchPoll(1000); }
      } else if (state.mvpInProgress) {
        scheduleLaunchPoll(1000);
      }
    }).catch(function () { scheduleLaunchPoll(2000); });
  }

  function startMvpTraining(mode) {
    if (state.mvpInProgress) return;
    state.mvpInProgress = true;
    state.launchState = { active: true, state: 'creating' };
    render();
    api('/api/mos365/sessions', { mode: mode + '_static_training' }).then(function (session) {
      state.session = session;
      state.launchState = { active: true, state: 'creating', sessionId: session.sessionId };
      render();
      return api('/api/mos365/launch', { sessionId: session.sessionId });
    }).then(function (launchData) {
      state.session.processId = launchData.processId;
      state.launchState = { active: true, state: launchData.launchState || 'launching' };
      render();
      scheduleLaunchPoll(500);
    }).catch(function (error) {
      state.mvpInProgress = false;
      state.launchState = { active: true, state: 'failed' };
      var output = document.getElementById('mos-mvp-output');
      if (output) output.innerHTML = '<div class="mos365-notice mos365-error">' + escapeHtml(error.payload && error.payload.messageJa || error.message || '起動に失敗しました') + '</div>';
      render();
    });
  }

  function renderEnvironment(main) {
    main.innerHTML = '<h3>実機環境チェック</h3><p class="mos365-muted">本功能不扫描桌面、文档、下载、OneDrive、最近文件或任何 session 外文件。</p><div id="mos-env-output" class="mos365-notice">確認中…</div><div class="mos365-actions"><button class="mos365-btn" data-refresh-env>再チェック</button></div>';
    function load() {
      api('/api/mos365/environment', null, 'GET').then(function (data) {
        state.environment = data;
        document.getElementById('mos-env-output').innerHTML = '<p><strong>Excel：</strong>' + (data.excelFound ? '検出済み / 已检测' : '未検出 / 未检测') + '</p><p><strong>安全な実行ファイル：</strong>' + (data.excelPathSafe ? '確認済み / 已验证' : '未確認 / 未确认') + '</p>' + (data.excelPath ? '<p><strong>実行ファイル：</strong><code>' + escapeHtml(data.excelPath) + '</code></p>' : '') + '<p><strong>LocalAppData sandbox：</strong>' + (data.sandboxWritable ? '書き込み可能 / 可写入' : '書き込み不可 / 不可写入') + '</p><p><strong>Office UI 日本語：</strong>ユーザー確認待ち / 等待用户确认</p><p>' + escapeHtml(data.messageJa) + '<br>' + escapeHtml(data.messageZh) + '</p>';
      }).catch(function (error) { document.getElementById('mos-env-output').classList.add('mos365-error'); document.getElementById('mos-env-output').textContent = error.message; });
    }
    main.querySelector('[data-refresh-env]').addEventListener('click', load); load();
  }

  addStyles();
  buildShell();
  buildModuleEntry();
})();
