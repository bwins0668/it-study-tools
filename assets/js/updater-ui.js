/* updater-ui.js — Study Tools 自动更新前端 UI 组件
 *
 * 状态机: IDLE → CHECKING → UPDATE_AVAILABLE/UP_TO_DATE → DOWNLOADING → READY → APPLYING
 * 在 tools drawer 中显示，通过 /api/updater/* 与 server.py 通信。
 */

(function () {
  'use strict';

  var UPDATER_POLL_INTERVAL = 2000; // ms
  var STARTUP_CHECK_DELAY = 120000; // 2 minutes after load

  var state = {
    currentVersion: '',
    latestVersion: '',
    downloadStage: 'idle',  // idle | checking | downloading | verifying | ready | applying
    downloadProgress: 0,
    updateReady: false,
    updateAvailable: false,
    autoDownload: true,
    lastError: null,
  };

  function getText(key, fallback) {
    if (window.I18n && typeof I18n.t === 'function') {
      return I18n.t('tools.' + key, fallback);
    }
    return fallback;
  }

  function qs(sel) { return document.querySelector(sel); }

  var lastOpener = null;

  function init() {
    // 延迟检查——启动后 2 分钟再检查，不阻塞启动
    setTimeout(function () {
      refreshState();
    }, STARTUP_CHECK_DELAY);

    // 绑定事件
    var checkBtn = document.getElementById('updater-check-btn');
    if (checkBtn) checkBtn.addEventListener('click', onCheckClick);

    var downloadBtn = document.getElementById('updater-download-btn');
    if (downloadBtn) downloadBtn.addEventListener('click', onDownloadClick);

    var applyBtn = document.getElementById('updater-apply-btn');
    if (applyBtn) applyBtn.addEventListener('click', onApplyClick);

    var autoToggle = document.getElementById('updater-auto-download');
    if (autoToggle) autoToggle.addEventListener('change', onAutoToggleChange);

    // P14.1：可退出生命周期——×、返回学习、重试、诊断折叠、Esc
    var closeBtn = document.getElementById('updater-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', close);
    var backBtn = document.getElementById('updater-back-btn');
    if (backBtn) backBtn.addEventListener('click', close);
    var retryBtn = document.getElementById('updater-retry-btn');
    if (retryBtn) retryBtn.addEventListener('click', onRetryClick);
    var diagToggle = document.getElementById('updater-diag-toggle');
    if (diagToggle) diagToggle.addEventListener('click', function () {
      var pre = document.getElementById('updater-diag');
      if (!pre) return;
      pre.hidden = !pre.hidden;
      diagToggle.setAttribute('aria-expanded', pre.hidden ? 'false' : 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var panel = document.getElementById('updater-panel');
      if (panel && !panel.hidden) {
        e.stopPropagation();
        close();
      }
    }, true);
  }

  function open(openerEl) {
    lastOpener = openerEl && openerEl.focus ? openerEl
      : (document.activeElement && document.activeElement !== document.body ? document.activeElement : null);
    refreshState();
    var panel = document.getElementById('updater-panel');
    if (panel) {
      panel.hidden = false;
      var title = document.getElementById('updater-dialog-title');
      if (title) {
        if (!title.hasAttribute('tabindex')) title.setAttribute('tabindex', '-1');
        title.focus({ preventScroll: true });
      }
    }
  }

  function close() {
    var panel = document.getElementById('updater-panel');
    if (panel) panel.hidden = true;
    // 焦点回触发器：更新检查失败绝不锁死学习界面
    if (lastOpener && document.contains(lastOpener)) {
      lastOpener.focus();
    } else {
      var entry = document.getElementById('statusbar-version-entry');
      if (entry) entry.focus();
    }
  }

  function onRetryClick() {
    // 仅重新查询状态与 check；不下载、不 apply；进行中防抖
    var retryBtn = document.getElementById('updater-retry-btn');
    if (retryBtn) retryBtn.disabled = true;
    fetch('/api/updater/state', { method: 'GET' })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (json.success && json.data) updateState(json.data);
      })
      .catch(function () {})
      .finally(function () {
        if (retryBtn) retryBtn.disabled = false;
      });
  }

  function refreshState() {
    fetch('/api/updater/state', { method: 'GET' })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (json.success && json.data) {
          updateState(json.data);
        }
      })
      .catch(function () {
        // 静默失败——更新器不可用
      });
  }

  function updateState(data) {
    state.currentVersion = data.currentVersion || '';
    state.latestVersion = data.latestVersion || '';
    state.downloadStage = data.downloadStage || 'idle';
    state.downloadProgress = data.downloadProgress || 0;
    state.updateReady = !!data.updateReady;
    state.updateAvailable = !!data.updateAvailable;
    state.autoDownload = data.autoDownload !== false;
    state.lastError = data.lastError || null;
    state.signatureConfigured = data.signatureConfigured !== false;

    render();
  }

  function render() {
    // 按钮/状态元素定义
    var checkBtn = document.getElementById('updater-check-btn');
    var downloadBtn = document.getElementById('updater-download-btn');
    var applyBtn = document.getElementById('updater-apply-btn');
    var statusIdle = document.getElementById('updater-status-idle');
    var errorEl = document.getElementById('updater-error');

    // Option C: 签名校验模块不可用时严格 fail-closed（P14.1：securityUnavailable
    // 专用状态——用户可理解、可关闭、可重试、可诊断；学习功能不受影响）
    var securityEl = document.getElementById('updater-security');
    var retryBtn = document.getElementById('updater-retry-btn');
    if (state.signatureConfigured === false) {
      if (statusIdle) statusIdle.hidden = true;
      if (securityEl) securityEl.hidden = false;
      var diag = document.getElementById('updater-diag');
      if (diag) {
        diag.textContent = [
          'errorCode: UPDATER_CRYPTOGRAPHY_UNAVAILABLE',
          'runtime: controlled portable runtime',
          'signatureComponent: unavailable (fail closed)',
          'download: blocked / apply: blocked'
        ].join('\n');
      }
      if (checkBtn) checkBtn.hidden = true;
      if (downloadBtn) downloadBtn.hidden = true;
      if (applyBtn) applyBtn.hidden = true;
      if (retryBtn) retryBtn.hidden = false;
      if (errorEl) errorEl.hidden = true;
      return;
    }
    if (securityEl) securityEl.hidden = true;
    if (retryBtn) retryBtn.hidden = true;

    // 版本信息
    var currentVerEl = document.getElementById('updater-current-version');
    if (currentVerEl) currentVerEl.textContent = state.currentVersion || '—';

    var latestVerEl = document.getElementById('updater-latest-version');
    if (latestVerEl) latestVerEl.textContent = state.latestVersion || '—';

    // 状态区域
    var statusChecking = document.getElementById('updater-status-checking');
    var statusDownloading = document.getElementById('updater-status-downloading');
    var statusUpToDate = document.getElementById('updater-status-uptodate');
    var statusAvailable = document.getElementById('updater-status-available');

    [statusIdle, statusChecking, statusDownloading, statusUpToDate, statusAvailable].forEach(function (el) {
      if (el) el.hidden = true;
    });

    if (state.lastError && state.downloadStage === 'idle') {
      // 显示错误
      if (statusIdle) {
        statusIdle.hidden = false;
        var errEl = document.getElementById('updater-error-text');
        if (errEl) errEl.textContent = state.lastError;
      }
    } else if (state.downloadStage === 'checking') {
      if (statusChecking) statusChecking.hidden = false;
    } else if (state.downloadStage === 'downloading' || state.downloadStage === 'verifying') {
      if (statusDownloading) {
        statusDownloading.hidden = false;
        var bar = document.getElementById('updater-progress-bar');
        if (bar) bar.value = state.downloadProgress;
        var pct = document.getElementById('updater-dl-progress');
        if (pct) pct.textContent = state.downloadProgress + '%';
      }
    } else if (state.downloadStage === 'ready' || state.updateReady) {
      if (statusAvailable) {
        statusAvailable.hidden = false;
        statusAvailable.textContent = getText('updaterDownloadComplete', '下载完成，准备更新');
      }
    } else if (state.latestVersion && !state.updateAvailable) {
      if (statusUpToDate) {
        statusUpToDate.hidden = false;
        statusUpToDate.textContent = getText('updaterUpToDate', '已是最新版本') + ' (v' + state.currentVersion + ')';
      }
    }

    // 按钮可见性
    var checkBtn = document.getElementById('updater-check-btn');
    var downloadBtn = document.getElementById('updater-download-btn');
    var applyBtn = document.getElementById('updater-apply-btn');
    var errorEl = document.getElementById('updater-error');

    if (checkBtn) checkBtn.hidden = (state.downloadStage === 'checking' || state.downloadStage === 'applying');
    if (downloadBtn) downloadBtn.hidden = !(state.updateAvailable && state.downloadStage === 'idle');
    if (applyBtn) applyBtn.hidden = !(state.downloadStage === 'ready' || state.updateReady);
    if (errorEl) errorEl.hidden = !(state.lastError && state.downloadStage === 'idle');

    // 自动下载开关
    var autoToggle = document.getElementById('updater-auto-download');
    if (autoToggle) autoToggle.checked = state.autoDownload;

    // 如果有更新准备就绪，在 tools drawer 上显示徽章
    var badge = document.getElementById('updater-badge');
    if (badge) {
      badge.hidden = !(state.downloadStage === 'ready' || state.updateReady);
    }
  }

  function onCheckClick(e) {
    e.preventDefault();
    setDownloadStage('checking');
    fetch('/api/updater/check', { method: 'POST' })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        refreshState();
        if (json.success && json.data && json.data.updateAvailable) {
          // 如果开启自动下载，开始下载
          if (state.autoDownload) {
            setTimeout(onDownloadClick, 500);
          }
        }
      })
      .catch(function () {
        setDownloadStage('idle');
        showError(getText('updaterNoNetwork', '无法连接到更新服务器'));
      });
  }

  function onDownloadClick() {
    if (!state.updateAvailable) return;
    setDownloadStage('downloading');
    fetch('/api/updater/download', { method: 'POST' })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        refreshState();
        if (!json.success) {
          showError(json.error || getText('updaterDownloadFailed', '下载失败'));
        }
      })
      .catch(function () {
        setDownloadStage('idle');
        showError(getText('updaterNoNetwork', '无法连接到更新服务器'));
      });
  }

  function onApplyClick() {
    setDownloadStage('applying');
    // 先获取 CSRF token，再用它提交 apply
    fetch('/api/updater/csrf-token', { method: 'GET' })
      .then(function (r) { return r.json(); })
      .then(function (csrfJson) {
        if (!csrfJson.success || !csrfJson.data || !csrfJson.data.csrfToken) {
          showError('无法获取安全凭证');
          setDownloadStage('idle');
          return;
        }
        var csrfToken = csrfJson.data.csrfToken;
        return fetch('/api/updater/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ csrfToken: csrfToken }),
        });
      })
      .then(function (r) { return r ? r.json() : null; })
      .then(function (json) {
        if (!json) return;
        if (json.success) {
          // 更新成功，重新加载页面
          window.location.reload();
        } else {
          showError(json.error || getText('updaterApplyFailed', '更新失败'));
          setDownloadStage('idle');
          if (json.rolledBack) {
            showError(getText('updaterRolledBack', '已自动回滚至先前版本'));
          }
        }
      })
      .catch(function () {
        showError(getText('updaterApplyFailed', '更新失败'));
        setDownloadStage('idle');
      });
  }

  function onAutoToggleChange(e) {
    state.autoDownload = e.target.checked;
    // state 写回由 server.py 负责
  }

  function setDownloadStage(stage) {
    state.downloadStage = stage;
    render();
  }

  function showError(msg) {
    state.lastError = msg;
    render();
  }

  // 导出公共 API
  window.StudyUpdater = {
    init: init,
    open: open,
    close: close,
    refresh: refreshState,
  };
})();
