(function () {
  'use strict';

  var content = window.MOS365Content;
  if (!content || document.getElementById('mos365-shell')) return;

  var STORAGE_KEY = 'study-tools.mos365.v1.records';
  var ORIGINAL_TASKS = [
    { taskId: "MOS_GP_001_ENTER_STATUS", titleJa: "ステータス入力", titleZh: "状态输入", descJa: "入力シートの B2 に「完了」と入力してください。", descZh: "请在“输入”工作表的 B2 中输入“完了”。", domain: "セル値の入力", tier: "基礎", time: 2 },
    { taskId: "MOS_GP_002_SUM_TWO_VALUES", titleJa: "数値の合計計算", titleZh: "计算两数之和", descJa: "「計算」シートの C2 セルに、A2 から B2 の合計を求める数式を入力してください。", descZh: "请在「計算」工作表的 C2 单元格中，输入计算 A2 到 B2 总和的公式。", domain: "SUM関数", tier: "基礎", time: 3 },
    { taskId: "MOS_GP_003_SUM_WEEKLY_SALES", titleJa: "週間売上集計", titleZh: "每周销售汇总", descJa: "売上シートの B7 セルに、月曜日から金曜日（B2:B6）までの売上合計を求める数式を入力してください。", descZh: "请在“売上”工作表的 B7 单元格中，输入计算星期一至星期五（B2:B6）销售额总和的公式。", domain: "SUM関数(連続范围)", tier: "基礎", time: 3 },
    { taskId: "MOS_GP_004_AVERAGE_SCORE", titleJa: "平均成績算出", titleZh: "计算平均成绩", descJa: "成績シートの B5 セルに、国語、数学、英語（B2:B4）の平均点を計算する数式を入力してください。", descZh: "请在“成績”工作表的 B5 单元格中，输入计算国语、数学、英语（B2:B4）平均分的公式。", domain: "AVERAGE関数", tier: "基礎", time: 3 },
    { taskId: "MOS_GP_005_IF_DELIVERY_STATUS", titleJa: "配達状況チェック", titleZh: "检查配送状态", descJa: "配達シートの C2 セルに、B2セルの値が「完了」の場合は「✓」を表示し、それ以外の場合は「✗」を表示する数式を入力してください。", descZh: "请在“配達”工作表的 C2 单元格中，输入一个公式，当 B2 单元格的值为“完了”时显示“✓”，否则显示“✗”。", domain: "IF関数", tier: "基礎", time: 4 },
    { taskId: "MOS_GP_006_COUNTA_BOOKS", titleJa: "書籍データ数カウント", titleZh: "统计已登记书籍数", descJa: "新着シートの B1 セルに、A2からA11までの範囲で書籍名が入力されているセル数を求める数式を入力してください。", descZh: "请在“新着”工作表的 B1 单元格中，输入计算 A2 到 A11 范围内输入了书名的单元格数量的公式。", domain: "COUNTA関数", tier: "基礎", time: 3 },
    { taskId: "MOS_GP_007_MAX_VISITORS", titleJa: "最大来客数算出", titleZh: "计算最高来客数", descJa: "来客シートの B9 セルに、月曜日から日曜日（B2:B8）までの期間での最高来客数を求める数式を入力してください。", descZh: "请在“来客”工作表的 B9 单元格中，输入计算星期一至星期日（B2:B8）期间最高来客数的公式。", domain: "MAX関数", tier: "基礎", time: 3 },
    { taskId: "MOS_GP_008_MIN_VISITORS", titleJa: "最低来客数算出", titleZh: "计算最低来客数", descJa: "来客シートの B10 セルに、月曜日から日曜日（B2:B8）までの期間での最低来客数を求める数式を入力してください。", descZh: "请在“来客”工作表的 B10 单元格中，输入计算星期一至星期日（B2:B8）期间最低来客数的公式。", domain: "MIN関数", tier: "基礎", time: 3 },
    { taskId: "MOS_GP_009_LEFT_DEPARTMENT_CODE", titleJa: "部門コード抽出", titleZh: "提取部门代码", descJa: "社員シートの B2 セルに、社員コード（A2）の左側から2文字の部門コードを取り出す数式を入力してください。", descZh: "请在“社員”工作表的 B2 单元格中，输入一个公式，提取员工代码（A2）左侧的 2 位部门代码。", domain: "LEFT関数", tier: "基礎", time: 3 },
    { taskId: "MOS_GP_010_TEXTJOIN_PRODUCT_TAG", titleJa: "商品タグ生成", titleZh: "生成商品标签", descJa: "商品シートの D2 セルに、TEXTJOIN関数を使って、区切り文字に「/」を指定し、空のセルは無視して、A2からC2までのテキストを結合する数式を入力してください。", descZh: "请在“商品”工作表的 D2 单元格中，使用 TEXTJOIN 函数输入公式，指定分隔符为“/”，忽略空单元格，将 A2 到 C2 的文本进行结合。", domain: "TEXTJOIN関数", tier: "基礎", time: 4 }
  ];
  var state = { view: 'mvp', session: null, examTimer: null, environment: null, launchState: null, mvpInProgress: false, launchPollTimer: null };

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
      // ── MOS シェル基盤
      '#mos365-shell{position:fixed;inset:0;z-index:10060;display:none;background:rgba(10,12,15,.65);padding:20px;box-sizing:border-box}',
      '#mos365-shell.is-open{display:block}',
      // ── パネル
      '.mos365-panel{height:100%;max-width:min(96vw,1680px);margin:0 auto;display:flex;flex-direction:column;overflow:hidden;background:#15171A;color:#F3F4F6;border-radius:10px;box-shadow:0 24px 80px rgba(0,0,0,.6);font-family:system-ui,-apple-system,"Segoe UI","Noto Sans JP",sans-serif;border:1px solid #34383E}',
      // ── ヘッダ
      '.mos365-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 20px;background:#202328;color:#F3F4F6;border-bottom:1px solid #34383E}.mos365-head h2{font-size:15px;margin:0;font-weight:700;color:#F3F4F6}.mos365-head small{opacity:.6;font-size:11px;color:#A9AFB8}.mos365-close{color:#A9AFB8;background:transparent;border:1px solid #34383E;border-radius:6px;padding:5px 10px;cursor:pointer;font-size:12px;transition:border-color .2s}.mos365-close:hover{border-color:#A9AFB8;color:#F3F4F6}',
      // ── ナビ
      '.mos365-body{min-height:0;display:flex;flex:1}.mos365-nav{width:230px;overflow-y:auto;padding:12px 8px;background:#0E1013;border-right:1px solid #34383E}.mos365-nav button{display:block;width:100%;padding:8px 12px;margin:0 0 2px;text-align:left;border:0;border-radius:6px;background:transparent;color:#A9AFB8;cursor:pointer;font-size:12.5px;font-weight:500;transition:background .15s,color .15s}.mos365-nav button:hover,.mos365-nav button.active{background:#282C32;color:#F3F4F6}',
      // ── 辞書グリッド・カード（R35 宽屏高对比度浅色内容面）
      '.mos365-dict-grid{display:grid;gap:16px;grid-template-columns:1fr;margin-top:14px}@media(min-width:1240px){.mos365-dict-grid{grid-template-columns:repeat(2,1fr)}}',
      '.mos365-dict-card{border:1px solid #D5D9DE;border-radius:8px;background:#FAF9F6;color:#1C2228;padding:16px;line-height:1.6;box-shadow:0 2px 8px rgba(0,0,0,.15)}',
      '.mos365-dict-card h4{margin:0 0 8px;font-size:15px;color:#1C2228;font-weight:700;display:flex;justify-content:space-between;align-items:center}',
      '.mos365-dict-card p{margin:6px 0;font-size:12.5px;color:#59616A}',
      '.mos365-dict-card code{display:block;font-family:Consolas,Monaco,monospace;background:#E9ECEF;color:#1E293B;padding:6px 10px;border-radius:4px;margin:8px 0;font-size:12px;font-weight:500;border:1px solid #D5D9DE}',
      '.mos365-dict-group{margin-top:10px;border-top:1px dashed #D5D9DE;padding-top:8px}',
      '.mos365-dict-group-title{font-size:11.5px;font-weight:bold;color:#1C2228;margin-bottom:2px}',
      // ── メインエリア
      '.mos365-main{flex:1;overflow:auto;padding:20px}.mos365-main h3{margin:0 0 6px;font-size:18px;color:#F3F4F6;font-weight:700}.mos365-muted{color:#727984;font-size:12.5px;margin:0 0 16px}',
      // ── グリッド・カード
      '.mos365-grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));margin:14px 0}.mos365-card{border:1px solid #34383E;border-radius:8px;background:#202328;padding:14px}.mos365-card h4{margin:0 0 6px;font-size:13px;color:#A9AFB8;font-weight:600}.mos365-kpi{font-size:24px;font-weight:700;color:#F3F4F6}.mos365-domain{display:grid;grid-template-columns:minmax(130px,1fr) 2fr 44px;gap:8px;align-items:center;margin:8px 0;font-size:12px}.mos365-bar{height:6px;background:#282C32;border-radius:4px;overflow:hidden}.mos365-bar i{display:block;height:100%;background:#6B7280;border-radius:4px}',
      // ── ボタン系
      '.mos365-btn{border:0;border-radius:6px;background:#3B3F46;color:#F3F4F6;padding:7px 12px;cursor:pointer;font-weight:600;font-size:12.5px;transition:background .15s}.mos365-btn:hover{background:#4A4F58}.mos365-btn.secondary{background:#282C32;color:#A9AFB8}.mos365-btn.secondary:hover{background:#34383E;color:#F3F4F6}.mos365-btn.danger{background:#463B3B;color:#FCA5A5}.mos365-btn.danger:hover{background:#5A4545}.mos365-btn[disabled]{opacity:.4;cursor:wait}.mos365-actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}',
      // ── リスト・アイテム
      '.mos365-list{display:grid;gap:8px}.mos365-item{border:1px solid #34383E;background:#202328;border-radius:8px;padding:12px 14px}.mos365-item h4{margin:0 0 4px;font-size:13.5px;color:#F3F4F6;font-weight:700}.mos365-item p{margin:3px 0;line-height:1.5;font-size:12px;color:#A9AFB8}.mos365-tag{display:inline-block;padding:2px 7px;margin-right:4px;border-radius:999px;background:#282C32;color:#727984;font-size:11px;border:1px solid #34383E}',
      // ── タスクカード（実技トレーニング専用）
      '.mos365-task-card{border:1px solid #34383E;background:#202328;border-radius:8px;padding:0;display:grid;grid-template-columns:1fr auto;align-items:stretch;overflow:hidden;transition:border-color .2s}.mos365-task-card:hover{border-color:#4A4F58}.mos365-task-card-body{padding:12px 14px}.mos365-task-card-action{display:flex;align-items:center;padding:0 16px;border-left:1px solid #34383E;background:#15171A}.mos365-task-title-ja{font-size:14px;font-weight:700;color:#F3F4F6;margin:0 0 2px}.mos365-task-title-zh{font-size:11.5px;color:#727984;margin:0 0 6px}.mos365-task-meta{display:flex;gap:6px;flex-wrap:wrap;margin:0}',
      // ── ノーティス・エラー
      '.mos365-notice{border-left:3px solid #4A4F58;background:#202328;padding:10px 12px;margin:12px 0;line-height:1.5;font-size:12.5px;color:#A9AFB8;border-radius:0 6px 6px 0}.mos365-error{border-left-color:#FCA5A5;color:#FCA5A5}',
      // ── 試験・レビュー
      '.mos365-exam{max-width:960px;margin:0 auto}.mos365-exam-top{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #34383E;padding-bottom:12px;margin-bottom:16px}.mos365-exam-task{font-size:14px;line-height:1.7;padding:14px;border:1px solid #34383E;border-radius:8px;background:#202328;margin:10px 0;color:#F3F4F6}.mos365-exam-list{max-height:260px;overflow:auto}.mos365-results table{width:100%;border-collapse:collapse;font-size:12px}.mos365-results th,.mos365-results td{border-bottom:1px solid #34383E;padding:7px;text-align:left;vertical-align:top;color:#A9AFB8}.mos365-results th{color:#727984}',
      // ── 問題UI
      '.mos365-question button{display:block;width:100%;text-align:left;border:1px solid #34383E;background:#202328;border-radius:6px;padding:9px 12px;margin:6px 0;cursor:pointer;color:#A9AFB8;font-size:12.5px;transition:border-color .15s,background .15s}.mos365-question button:hover{border-color:#4A4F58;background:#282C32}.mos365-question button.correct{border-color:#6EE7B7;background:#1A2820;color:#6EE7B7}.mos365-question button.wrong{border-color:#FCA5A5;background:#2A1A1A;color:#FCA5A5}',
      // ── レスポンシブ
      '@media(max-width:760px){#mos365-shell{padding:0}.mos365-panel{border-radius:0}.mos365-body{display:block}.mos365-nav{width:auto;display:flex;overflow-x:auto;padding:8px;border-right:0;border-bottom:1px solid #34383E}.mos365-nav button{width:auto;white-space:nowrap;margin:0 3px 0 0}.mos365-main{padding:14px}.mos365-head{padding:12px}.mos365-head h2{font-size:13px}.mos365-task-card{grid-template-columns:1fr;}.mos365-task-card-action{border-left:0;border-top:1px solid #34383E;padding:12px}}'
    ].join('');
    document.head.appendChild(style);
  }

  var popstateHandlerAttached = false;

  function handlePopState(e) {
    var shell = document.getElementById('mos365-shell');
    if (!shell || !shell.classList.contains('is-open')) return;
    if (e.state && e.state.mosView) {
      state.view = e.state.mosView;
      if (e.state.mosMvpInProgress !== undefined) {
        state.mvpInProgress = e.state.mosMvpInProgress;
      }
      render();
    } else {
      if (state.view === 'exam' || state.view === 'review') {
        state.view = 'mock';
        render();
      } else if (state.view === 'mvp' && state.mvpInProgress) {
        state.mvpInProgress = false;
        render();
      } else {
        close();
      }
    }
  }

  function transitionToView(nextView, callback) {
    var main = document.querySelector('.mos365-main');
    if (!main || window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.webdriver) {
      state.view = nextView;
      if (callback) callback();
      if (window.history && window.history.pushState) {
        window.history.pushState({ mosView: state.view, mosMvpInProgress: state.mvpInProgress }, '', window.location.href);
      }
      render();
      return;
    }

    var isCurrently3rd = state.view === 'exam' || state.view === 'review' || (state.view === 'mvp' && state.mvpInProgress);
    if (!isCurrently3rd) {
      state.lastScrollTop = main.scrollTop;
    }

    var oldContent = main.firstElementChild;
    if (oldContent) {
      oldContent.style.transition = 'transform 120ms ease, opacity 120ms ease';
      oldContent.style.opacity = '0';
      oldContent.style.transform = 'translate3d(-8px, 0, 0)';

      setTimeout(function() {
        state.view = nextView;
        if (callback) callback();

        if (window.history && window.history.pushState) {
          window.history.pushState({ mosView: state.view, mosMvpInProgress: state.mvpInProgress }, '', window.location.href);
        }

        render();

        var newContent = main.firstElementChild;
        if (newContent) {
          newContent.style.transition = 'none';
          newContent.style.opacity = '0';
          newContent.style.transform = 'translate3d(8px, 0, 0)';
          newContent.offsetHeight; // reflow
          newContent.style.transition = 'transform 180ms cubic-bezier(.22, 1, .36, 1), opacity 180ms cubic-bezier(.22, 1, .36, 1)';
          newContent.style.opacity = '1';
          newContent.style.transform = 'translate3d(0, 0, 0)';
        }
      }, 120);
    } else {
      state.view = nextView;
      if (callback) callback();
      if (window.history && window.history.pushState) {
        window.history.pushState({ mosView: state.view, mosMvpInProgress: state.mvpInProgress }, '', window.location.href);
      }
      render();
    }
  }

  function buildShell() {
    var shell = document.createElement('section');
    shell.id = 'mos365-shell';
    shell.setAttribute('aria-hidden', 'true');
    shell.innerHTML = '<div class="mos365-panel" role="dialog" aria-modal="true" aria-label="MOS Excel 365">' +
      '<header class="mos365-head">' +
        '<div class="mos365-head-left">' +
          '<button class="mos365-back-btn" id="mos365-back-btn" type="button" style="display: none;">← MOS に戻る / 返回 MOS</button>' +
          '<div class="mos365-head-titles">' +
            '<h2>MOS Excel 365（日语版）合格作战中心</h2>' +
            '<small>Microsoft Excel 365 一般 / 日本語版トレーニング</small>' +
          '</div>' +
        '</div>' +
        '<div class="mos365-head-right">' +
          '<button class="mos365-immersive-btn" id="mos365-immersive-btn" type="button" title="切换沉浸模式"><i class="fa-solid fa-expand"></i></button>' +
          '<button class="mos365-close" type="button">閉じる</button>' +
        '</div>' +
      '</header>' +
      '<div class="mos365-body">' +
        '<nav class="mos365-nav" aria-label="MOS navigation"></nav>' +
        '<main class="mos365-main"></main>' +
      '</div>' +
    '</div>';

    shell.querySelector('.mos365-close').addEventListener('click', close);
    shell.addEventListener('click', function (event) { if (event.target === shell) close(); });

    var backBtn = shell.querySelector('#mos365-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', function() {
        if (window.history.state && window.history.state.mosView && window.history.state.mosView !== state.view) {
          window.history.back();
        } else {
          if (state.view === 'exam' || state.view === 'review') {
            transitionToView('mock');
          } else if (state.view === 'mvp') {
            transitionToView('mvp', function() {
              state.mvpInProgress = false;
            });
          } else {
            close();
          }
        }
      });
    }

    var immersiveBtn = shell.querySelector('#mos365-immersive-btn');
    if (immersiveBtn) {
      immersiveBtn.addEventListener('click', function() {
        if (window.toggleImmersiveFullscreen) {
          window.toggleImmersiveFullscreen();
        }
      });
    }

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
    if (!popstateHandlerAttached) {
      window.addEventListener('popstate', handlePopState);
      popstateHandlerAttached = true;
    }
    if (window.history && window.history.replaceState) {
      window.history.replaceState({ mosView: state.view, mosMvpInProgress: state.mvpInProgress }, '', window.location.href);
    }
    render();
  }

  function close() {
    stopExamTimer();
    document.getElementById('mos365-shell').classList.remove('is-open');
    document.getElementById('mos365-shell').setAttribute('aria-hidden', 'true');
    if (popstateHandlerAttached) {
      window.removeEventListener('popstate', handlePopState);
      popstateHandlerAttached = false;
    }
  }

  var navItems = [
    ['mvp', '実技トレーニング'],
    ['dashboard', '進捗ダッシュボード'], ['learn', '学習コンテンツ'], ['dictionary', '機能・関数辞典'], ['practice', '考点練習'],
    ['guided', '指導式実機練習'], ['mock', '練習ブループリント(プレビュー)'], ['wrong', '弱点・間違い項目'], ['readiness', '受験準備度'], ['environment', '実機環境チェック']
  ];

  function renderNavigation() {
    var nav = document.querySelector('.mos365-nav');
    var is3rdLevel = state.view === 'exam' || state.view === 'review' || (state.view === 'mvp' && state.mvpInProgress);
    if (is3rdLevel) {
      nav.innerHTML = '';
      nav.style.display = 'none';
      return;
    }
    nav.style.display = '';
    nav.innerHTML = navItems.map(function (item) {
      return '<button type="button" data-view="' + item[0] + '" class="' + (state.view === item[0] ? 'active' : '') + '">' + item[1] + '</button>';
    }).join('');
    nav.querySelectorAll('button').forEach(function (button) {
      button.addEventListener('click', function () { transitionToView(button.dataset.view); });
    });
  }

  function render() {
    var headerTitle = document.querySelector('.mos365-head h2');
    var headerSub = document.querySelector('.mos365-head small');
    var backBtn = document.getElementById('mos365-back-btn');

    var is3rdLevel = state.view === 'exam' || state.view === 'review' || (state.view === 'mvp' && state.mvpInProgress);

    if (backBtn) {
      backBtn.style.display = is3rdLevel ? 'block' : 'none';
    }

    if (state.view === 'exam') {
      if (headerTitle) headerTitle.textContent = '练习蓝图 · 计时中';
      if (headerSub) headerSub.textContent = '独立工作簿 · 非 pane 联动';
    } else if (state.view === 'mvp' && state.mvpInProgress) {
      if (headerTitle) headerTitle.textContent = 'MOS 実技トレーニング';
      if (headerSub) headerSub.textContent = '当前训练进行中 / トレーニング実施中';
    } else {
      if (headerTitle) headerTitle.textContent = 'MOS Excel 365  実技トレーニング / 实操训练';
      if (headerSub) headerSub.textContent = 'Microsoft Excel 365 一般 / 原创基礎トレーニング';
    }

    renderNavigation();
    var main = document.querySelector('.mos365-main');
    var views = {
      dashboard: renderDashboard, learn: renderLearn, dictionary: renderDictionary, practice: renderPractice,
      guided: renderGuided, mvp: renderMvp, mock: renderMock, wrong: renderWrong, readiness: renderReadiness, environment: renderEnvironment,
      exam: renderExam, review: renderReview
    };
    (views[state.view] || renderDashboard)(main);

    if (!is3rdLevel && state.lastScrollTop !== undefined && main) {
      main.scrollTop = state.lastScrollTop;
      state.lastScrollTop = 0;
    }

    if (state.lastTriggerElement && typeof state.lastTriggerElement.focus === 'function') {
      (function(el) {
        setTimeout(function() { el.focus(); }, 150);
      })(state.lastTriggerElement);
      state.lastTriggerElement = null;
    }

    var mosFsBtn = document.getElementById('mos365-immersive-btn');
    if (mosFsBtn) {
      var isFS = !!document.fullscreenElement;
      var icon = mosFsBtn.querySelector('i');
      if (icon) {
        icon.className = isFS ? 'fa-solid fa-compress' : 'fa-solid fa-expand';
      }
      mosFsBtn.title = isFS ? '退出沉浸模式' : '进入沉浸模式';
    }
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
    main.innerHTML = '<h3>功能・函数词典</h3><p class="mos365-muted">主力考点与实务扩展分开标注，不把扩展函数混成核心备考范围。</p><div class="mos365-dict-grid">' + content.dictionary.map(function (entry) {
      return '<article class="mos365-dict-card">' +
        '<h4>' + escapeHtml(entry.name) + ' <span class="mos365-tag" style="background:#E9ECEF;color:#59616A;border-color:#D5D9DE;">' + escapeHtml(entry.tier) + '</span></h4>' +
        '<div style="margin-bottom:8px;">' +
          '<div style="font-size:13.5px;font-weight:600;color:#1C2228;">' + escapeHtml(entry.descriptionJa) + '</div>' +
          '<div style="font-size:12px;color:#727984;margin-top:1px;">' + escapeHtml(entry.descriptionZh) + '</div>' +
        '</div>' +
        '<code>' + escapeHtml(entry.syntax) + '</code>' +
        '<div class="mos365-dict-group">' +
          '<div class="mos365-dict-group-title">メニューパス / 菜单路径：</div>' +
          '<div style="font-size:12px;color:#59616A;">' + escapeHtml(entry.menuJa) + '<br><span style="color:#727984;font-size:11.5px;">（中文入口：' + escapeHtml(entry.menuZh) + '）</span></div>' +
        '</div>' +
        '<div class="mos365-dict-group">' +
          '<div class="mos365-dict-group-title">常见错误：</div>' +
          '<div style="font-size:12px;color:#991B1B;font-weight:500;">' + escapeHtml(entry.errorsZh) + '</div>' +
        '</div>' +
        '<div class="mos365-dict-group">' +
          '<div class="mos365-dict-group-title">关联技能：</div>' +
          '<div style="font-size:12px;color:#59616A;">' + entry.skillIds.map(function(s) { return '<span class="mos365-tag" style="margin-right:4px;">' + escapeHtml(s) + '</span>'; }).join('') + '</div>' +
        '</div>' +
      '</article>';
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
    main.innerHTML = '<h3>模擬試験 / 模拟考试 (VSTO 联动)</h3>' +
      '<p class="mos365-muted">Excel 底部コントロール台と完全に連動した模擬試験です。練習時の時間配分や操作手順の確認にご利用ください。</p>' +
      '<div class="mos365-list">' +
        '<article class="mos365-item" style="border: 1px solid #34383E; background: #202328;">' +
          '<h4>オリジナル実技模擬試験 V1 <span class="mos365-tag" style="background:#105B3E;color:#FFF;border:0;">本番联动</span></h4>' +
          '<p><strong>中文场景：</strong>原创模拟考试 V1 — 多步骤真实 Excel 实操模拟考试</p>' +
          '<p>50 分 / 4 个评分步骤 / 自动 Excel 前置最大化 / 底部控制台 wizard 导航 / 完全支持评分与下一步跳转</p>' +
          '<div class="mos365-actions">' +
            '<button class="mos365-btn" data-exam-start-v1 style="background:#E2E8F0;color:#1E293B;">模擬試験を開始する / 开始模拟考试</button>' +
          '</div>' +
        '</article>' +
      '</div>' +
      '<h3 style="margin-top:28px;">その他の模擬試験（近日公開 / 敬请期待）</h3>' +
      '<p class="mos365-muted">以下模擬試験は将来のリリースにて提供される予定です。</p>' +
      '<div class="mos365-list">' + content.mockBlueprints.map(function (blueprint, index) {
        return '<article class="mos365-item" style="opacity: 0.6;"><h4>' + escapeHtml(blueprint.titleJa) + ' <span class="mos365-tag">近日公開</span></h4><p><strong>中文场景：</strong>' + escapeHtml(blueprint.titleZh) + '</p><p>50 分 / 全日文 / 无提示 / ' + blueprint.tasks.length + ' 个自动评分点</p></article>';
      }).join('') + '</div>';

    var startBtn = main.querySelector('[data-exam-start-v1]');
    if (startBtn) {
      startBtn.addEventListener('click', function () {
        startOriginalExamV1(this);
      });
    }
  }

  function startOriginalExamV1(button) {
    button.disabled = true; button.textContent = '準備中…';
    api('/api/mos365/sessions', { mode: 'exam', scenarioId: 'original_exam_v1' }).then(function (session) {
      state.session = session;
      state.session.startedAt = Date.now();
      button.disabled = false;
      button.textContent = '模擬試験を開始する / 开始模拟考试';
      
      // Update sidebar active button to "mock"
      var nav = document.querySelector('.mos365-nav');
      if (nav) {
        nav.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
        var mockNavBtn = Array.prototype.slice.call(nav.querySelectorAll('button')).find(function (b) { return b.textContent.indexOf('模擬試験') >= 0; });
        if (mockNavBtn) mockNavBtn.classList.add('active');
      }

      // Automatically launch Excel!
      launchCurrent(null, false);
    }).catch(function (error) { 
      button.disabled = false; 
      button.textContent = '模擬試験を開始する / 开始模拟考试'; 
      alert(error.message); 
    });
  }

  function startMock(index, variant, button) {
    button.disabled = true; button.textContent = '準備中…';
    state.lastTriggerElement = button;
    var blueprint = content.mockBlueprints[index];
    api('/api/mos365/sessions', { mode: 'mock', scenarioId: blueprint.scenarioId, variant: variant }).then(function (session) {
      state.session = session;
      state.session.startedAt = Date.now();
      state.session.durationMinutes = 50;
      transitionToView('exam', function() {
        startExamTimer();
      });
    }).catch(function (error) { button.disabled = false; button.textContent = '模擬を開始する'; alert(error.message); });
  }

  function renderExam(main) {
    var session = state.session;
    if (!session) { transitionToView('mock'); return; }
    main.innerHTML = '<section class="mos365-exam"><div class="mos365-exam-top"><div><strong>练习蓝图 · 计时中</strong><br><small>独立工作簿 · 非 VSTO pane 联动</small></div><div><strong id="mos-exam-clock">50:00</strong></div></div><p>Excel の保存後、この画面に戻ってファイルを提出してください。（本模块与右侧训练面板独立，评分仅基于 Open XML 文件分析。）</p><div class="mos365-actions"><button class="mos365-btn" data-exam-open>Excel で開く</button><button class="mos365-btn danger" data-exam-submit>ファイルを提出して採点</button></div><div class="mos365-exam-list">' + session.tasks.map(function (task) { return '<article class="mos365-exam-task"><strong>' + escapeHtml(task.instructionJa) + '</strong></article>'; }).join('') + '</div></section>';
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
      if (type === 'mock') { transitionToView('review'); }
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
    if (!result) { transitionToView('mock'); return; }
    var failed = result.results.filter(function (item) { return item.status !== 'pass'; });
    main.innerHTML = '<h3>採点結果 / 评分结果：' + result.percentage + '%</h3>' + resultSummary(result) + '<div class="mos365-notice">日文原题、中文题意、实际结果与复习建议已恢复显示。弱项会回流到课程 and 专项练习。</div><div class="mos365-actions"><button class="mos365-btn" data-review-mock>模擬一覧へ</button><button class="mos365-btn secondary" data-review-wrong>薄弱項を見る</button></div><section class="mos365-results"><table><thead><tr><th>任务</th><th>结果</th><th>解释 / 解析</th><th>复习</th></tr></thead><tbody>' + result.results.map(function (item) {
      return '<tr><td>' + escapeHtml(item.taskId) + '<br><small>' + escapeHtml(item.evidence) + '</small></td><td>' + (item.status === 'pass' ? '合格 / 通过' : '未达成 / 未通过') + '<br>' + item.score + '/' + item.maxScore + '</td><td><strong>日：</strong>' + escapeHtml(item.explanationJa) + '<br><strong>中：</strong>' + escapeHtml(item.explanationZh) + '</td><td><strong>日：</strong>' + escapeHtml(item.remediationJa) + '<br><strong>中：</strong>' + escapeHtml(item.remediationZh) + '</td></tr>';
    }).join('') + '</tbody></table></section>';
    main.querySelector('[data-review-mock]').addEventListener('click', function () { transitionToView('mock'); });
    main.querySelector('[data-review-wrong]').addEventListener('click', function () { transitionToView('wrong'); });
  }

  function renderWrong(main) {
    var weak = content.skills.map(function (skill) { return { skill: skill, percent: skillScore(skill.id) }; }).filter(function (item) { return item.percent != null; }).sort(function (a, b) { return a.percent - b.percent; }).slice(0, 16);
    main.innerHTML = '<h3>错题与薄弱项</h3><p class="mos365-muted">你不是“Excel 不行”，而是可以定位到具体技能并回到对应课程、专项练习和实机练习。</p>' + (weak.length ? '<div class="mos365-list">' + weak.map(function (item) { return '<article class="mos365-item"><h4>' + escapeHtml(item.skill.titleJa) + ' <span class="mos365-tag">' + item.percent + '%</span></h4><p>' + escapeHtml(item.skill.titleZh) + '</p><div class="mos365-actions"><button class="mos365-btn secondary" data-weak-learn="' + escapeHtml(item.skill.id) + '">复习课程</button><button class="mos365-btn secondary" data-weak-practice="' + escapeHtml(item.skill.id) + '">专项练习</button></div></article>'; }).join('') + '</div>' : '<div class="mos365-notice">完成专项练习或真机模拟后，这里会显示具体薄弱技能。</div>');
    main.querySelectorAll('[data-weak-learn]').forEach(function (button) { button.addEventListener('click', function () { transitionToView('learn'); }); });
    main.querySelectorAll('[data-weak-practice]').forEach(function (button) { button.addEventListener('click', function () { transitionToView('practice'); }); });
  }

  function renderReadiness(main) {
    var status = readiness();
    main.innerHTML = '<h3>报名准备度</h3><p class="mos365-muted">有效记录条件：正式真机模拟、全日文、未使用提示、50 分钟、已完成评分、90% 以上。</p><section class="mos365-card"><h4>受験準備度：' + (status.ready ? '目標達成' : '未達成') + '</h4><p class="mos365-kpi">' + (status.ready ? '3 / 3' : status.valid.filter(function (item) { return item.percentage >= 90; }).length + ' / 3') + '</p><p>この表示は学習上の目安であり、公式試験の合格を保証するものではありません。<br>此状态只是训练建议，不代表官方合格保证。</p></section><div class="mos365-list">' + (status.valid.length ? status.valid.map(function (record, index) { return '<article class="mos365-item"><strong>' + (index + 1) + '. ' + escapeHtml(record.completedAt) + '</strong><br>スコア：' + record.percentage + '% / 有効：' + (record.percentage >= 90 ? 'はい' : 'いいえ') + '</article>'; }).join('') : '<div class="mos365-notice">まだ有効な正式真机模拟记录はありません。</div>') + '</div>';
  }

  function isTerminalLaunchState(launchState) {
    return !!(launchState && launchState.active &&
      (launchState.state === 'ready' || launchState.state === 'failed' || launchState.state === 'ended'));
  }

  /* P10：启动步骤模型——全部来自 launch/state 的真实相位时间戳，绝不伪造 */
  function launchStepsModel(ls) {
    var phases = (ls && ls.phases) || {};
    var st = ls && ls.state;
    var defs = [
      { key: 'session_created', label: 'セッション作成 / 创建训练会话' },
      { key: 'workbook_ready', label: 'ワークブック準備 / 准备练习文件' },
      { key: 'excel_process_started', label: 'Excel 起動 / 启动 Excel' },
      { key: 'panel_attached', label: 'トレーニングパネル接続 / 连接训练面板' }
    ];
    var activeAssigned = false;
    return defs.map(function (def) {
      var s = 'pending';
      if (def.key === 'panel_attached') {
        if (st === 'ready' || st === 'ended') s = 'done';
        else if (st === 'failed') s = 'error';
        else if (st === 'awaiting_attach') s = 'active';
      } else if (phases[def.key]) {
        s = 'done';
      } else if (st === 'failed') {
        s = activeAssigned ? 'pending' : 'error';
        activeAssigned = true;
      } else if (!activeAssigned) {
        s = 'active';
        activeAssigned = true;
      }
      return { key: def.key, label: def.label, state: s };
    });
  }

  var ATTACH_STALL_MS = 20000;
  function launchStalled(ls) {
    if (!ls || ls.state !== 'awaiting_attach') return false;
    var started = ls.phases && ls.phases.excel_process_started;
    if (!started) return false;
    return (Date.now() - Date.parse(started)) > ATTACH_STALL_MS;
  }

  function renderMvp(main) {
    var isCreating = state.mvpInProgress ||
      (state.launchState && state.launchState.active && !isTerminalLaunchState(state.launchState));
    var ls = state.launchState;
    var statusHtml = '';
    if (isCreating || (ls && ls.active)) {
      var steps = launchStepsModel(ls);
      var stalled = launchStalled(ls);
      var headline = {
        ready: 'Excel で問題を解いてください / 已就绪，请在 Excel 中作答',
        ended: 'トレーニングを終了しました / 训练已结束',
        failed: '起動に失敗しました。安全に再試行できます / 启动失败，可安全重试'
      }[ls && ls.state] || 'トレーニングを準備しています / 正在准备训练';

      statusHtml = '<section class="mos365-launch" aria-live="polite">' +
        '<h4 class="mos365-launch__title">' + escapeHtml(headline) + '</h4>' +
        '<ol class="mos365-launch-steps">' + steps.map(function (s) {
          return '<li class="mos365-step" data-step-state="' + s.state + '">' +
            '<span class="mos365-step__dot" aria-hidden="true"></span>' +
            '<span class="mos365-step__label">' + escapeHtml(s.label) + '</span>' +
            '<span class="mos365-step__state">' + ({ done: '完了', active: '進行中…', error: '失敗', pending: '' }[s.state] || '') + '</span>' +
          '</li>';
        }).join('') + '</ol>' +
        (stalled
          ? '<div class="mos365-launch-stall"><strong>トレーニングパネルが接続されていません / 训练面板未连接。</strong><br>' +
            'Excel は起動済みですが、Excel 側のトレーニングアドイン（Exam Host）が応答していません。' +
            'アドインが未インストールの場合は <code>tools/install_mos365_exam_host.ps1</code> で導入できます。<br>' +
            '中文：Excel 已启动，但训练插件未响应。若尚未安装插件，可运行上述脚本安装后重试；也可以取消本次训练安全返回。</div>'
          : '') +
        '<div class="mos365-actions mos365-launch-actions">' +
          '<button class="mos365-btn secondary" data-launch-cancel>キャンセル / 取消</button>' +
          (ls && (ls.state === 'failed' || stalled) ? '<button class="mos365-btn" data-launch-retry>再試行 / 重试</button>' : '') +
          '<button class="mos365-btn secondary" data-launch-diag aria-expanded="' + (state.launchDiagOpen ? 'true' : 'false') + '">診断情報 / 诊断</button>' +
          '<button class="mos365-btn secondary" data-launch-back>学習に戻る / 返回工作台</button>' +
        '</div>' +
        '<pre class="mos365-launch-diag"' + (state.launchDiagOpen ? '' : ' hidden') + '>' +
          escapeHtml(JSON.stringify({ sessionId: ls && ls.sessionId, pid: ls && ls.pid, state: ls && ls.state, updatedAt: ls && ls.updatedAt, phases: ls && ls.phases }, null, 2)) +
        '</pre>' +
      '</section>';
    }
    main.innerHTML = '<h3>MOS 実技トレーニング</h3><p class="mos365-muted">本物の Excel を使って操作を練習します。评分系统は実際の Open XML 分析に基づきます。</p>' +
      statusHtml +
      '<div class="mos365-list">' +
      ORIGINAL_TASKS.map(function (task) {
        return '<article class="mos365-item">' +
          '<h4>' + escapeHtml(task.titleJa) + '</h4>' +
          '<p><strong>中文辅助：</strong>' + escapeHtml(task.titleZh) + '</p>' +
          '<p><strong>タスク：</strong>' + escapeHtml(task.descJa) + '<br><strong>说明：</strong>' + escapeHtml(task.descZh) + '</p>' +
          '<p>' +
            '<span class="mos365-tag">領域: ' + escapeHtml(task.domain) + '</span>' +
            '<span class="mos365-tag">難易度: ' + escapeHtml(task.tier) + '</span>' +
            '<span class="mos365-tag">目安: ' + task.time + '分</span>' +
          '</p>' +
          '<div class="mos365-actions">' +
            '<button class="mos365-btn" data-mvp-start="' + escapeHtml(task.taskId) + '" ' + (isCreating ? 'disabled' : '') + '>開始する</button>' +
          '</div>' +
        '</article>';
      }).join('') +
      '</div>' +
      '<div id="mos-mvp-output"></div><div class="mos365-actions">' +
      '<button class="mos365-btn danger" data-mvp-clear>重新开始 / リセット</button></div>';
    main.querySelectorAll('[data-mvp-start]').forEach(function (btn) {
      btn.addEventListener('click', function () { startMvpTraining(btn.dataset.mvpStart, btn); });
    });
    function clearLaunch(afterClear) {
      api('/api/mos365/clear-launch', {}).then(function () {
        transitionToView('mvp', function() {
          state.mvpInProgress = false;
          state.launchState = null;
          state.lastLaunchSig = null;
          if (afterClear) afterClear();
        });
      });
    }
    main.querySelector('[data-mvp-clear]') && main.querySelector('[data-mvp-clear]').addEventListener('click', function () { clearLaunch(); });
    main.querySelector('[data-launch-cancel]') && main.querySelector('[data-launch-cancel]').addEventListener('click', function () { clearLaunch(); });
    main.querySelector('[data-launch-retry]') && main.querySelector('[data-launch-retry]').addEventListener('click', function () {
      var taskId = state.lastMvpTaskId;
      clearLaunch(function () {
        if (taskId) window.setTimeout(function () { startMvpTraining(taskId, null); }, 200);
      });
    });
    main.querySelector('[data-launch-diag]') && main.querySelector('[data-launch-diag]').addEventListener('click', function () {
      state.launchDiagOpen = !state.launchDiagOpen;
      var pre = main.querySelector('.mos365-launch-diag');
      var b = main.querySelector('[data-launch-diag]');
      if (pre) pre.hidden = !state.launchDiagOpen;
      if (b) b.setAttribute('aria-expanded', state.launchDiagOpen ? 'true' : 'false');
    });
    main.querySelector('[data-launch-back]') && main.querySelector('[data-launch-back]').addEventListener('click', function () {
      close();
    });
    if (!isTerminalLaunchState(state.launchState)) scheduleLaunchPoll(0);
  }

  function pollLaunchState() {
    if (state.view !== 'mvp') return;
    api('/api/mos365/launch/state', null, 'GET').then(function (data) {
      if (data && data.active) {
        state.launchState = data;
        if (data.state === 'failed' || data.state === 'ended') {
          transitionToView('mvp', function() {
            state.mvpInProgress = false;
          });
        }
        else {
          // P10：仅状态签名变化时重绘（消除每秒 innerHTML 重建的闪烁，
          // 并保留诊断展开等本地 UI 状态）；stall 跨阈值也计入签名
          var sig = JSON.stringify([data.state, data.updatedAt, launchStalled(data)]);
          if (sig !== state.lastLaunchSig) {
            state.lastLaunchSig = sig;
            render();
          }
          scheduleLaunchPoll(1000);
        }
      } else if (state.mvpInProgress) {
        transitionToView('mvp', function() {
          state.mvpInProgress = false;
          state.launchState = null;
          state.lastLaunchSig = null;
        });
      }
    }).catch(function () { scheduleLaunchPoll(2000); });
  }

  function startMvpTraining(mode, btn) {
    if (state.mvpInProgress) return;
    state.lastTriggerElement = btn;
    state.lastMvpTaskId = mode; // P10：供失败/卡住时一键重试
    transitionToView('mvp', function() {
      state.mvpInProgress = true;
      state.launchState = { active: true, state: 'creating' };
      state.lastLaunchSig = null;
    });
    var taskId = mode;
    if (taskId === 'r16') taskId = 'MOS_GP_001_ENTER_STATUS';
    if (taskId === 'r17') taskId = 'MOS_GP_002_SUM_TWO_VALUES';

    api('/api/mos365/sessions', { taskId: taskId }).then(function (session) {
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
      transitionToView('mvp', function() {
        state.mvpInProgress = false;
        state.launchState = { active: true, state: 'failed' };
      });
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
