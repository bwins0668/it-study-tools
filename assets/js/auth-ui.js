/**
 * Study Tools Auth UI — Prototype (Round 17.2)
 *
 * Local-only auth UI prototype for user login/sync status.
 * - No network requests
 * - No Supabase SDK
 * - No real authentication
 * - Mock sign-in for UI development purposes
 *
 * Dependencies: window.StudySync (sync-engine.js)
 * Exposed globally as `window.StudyAuthUI`
 */
(function () {
  "use strict";

  /* ── Storage keys ────────────────────────────────── */
  var KEYS = {
    AUTH_STATE:      "study_tools_auth_state",
    AUTH_MODE:       "study_tools_auth_mode",
    MOCK_USER:       "study_tools_mock_user",
    SYNC_BADGE:      "study_tools_sync_badge_state",
  };

  /* ── Default state ───────────────────────────────── */
  var DEFAULT_STATE = {
    mode:         "local_anonymous",  // "local_anonymous" | "mock_signed_in"
    user_id:      null,
    email:        null,
    display_name: null,
    provider:     null,               // null | "mock"
    sync_enabled: false,
    last_sync_at: null,
    created_at:   new Date().toISOString(),
    updated_at:   new Date().toISOString(),
  };

  var supabaseAdapterLoading = null;

  function ensureSupabaseAdapter() {
    if (window.StudySupabase) return Promise.resolve(window.StudySupabase);
    if (supabaseAdapterLoading) return supabaseAdapterLoading;

    supabaseAdapterLoading = new Promise(function (resolve) {
      var script = document.createElement("script");
      script.src = "assets/js/supabase-client.js";
      script.async = true;
      script.onload = function () {
        if (panelVisible) populateAuthPanel(el("auth-panel"), "status-refresh");
        resolve(window.StudySupabase || null);
      };
      script.onerror = function () { resolve(null); };
      document.head.appendChild(script);
    });
    return supabaseAdapterLoading;
  }

  /* ── Helpers ─────────────────────────────────────── */
  function safeGet(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) { return fallback; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  }
  function safeRemove(key) {
    try { localStorage.removeItem(key); } catch (_) {}
  }

  function el(id) { return document.getElementById(id); }
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }

  function t(key, fallback) {
    if (window.I18n && typeof window.I18n.t === "function") {
      var v = window.I18n.t(key);
      if (v && v !== key) return v;
    }
    // Static fallback (English as base)
    var dict = {
      "auth.localMode": "本地模式",
      "auth.notLoggedIn": "未登录",
      "auth.account": "账号",
      "auth.sync": "同步",
      "auth.syncInDev": "同步功能开发中",
      "auth.continueLocal": "继续本地使用",
      "auth.mockSignIn": "模拟登录状态",
      "auth.mockSignOut": "退出模拟登录",
      "auth.exportSnapshot": "导出本地快照",
      "auth.deviceId": "设备 ID",
      "auth.pendingSync": "待同步",
      "auth.lastSync": "上次同步",
      "auth.noUpload": "不会上传数据",
      "auth.close": "关闭",
      "auth.syncStatus.local": "本地模式",
      "auth.syncStatus.synced": "已同步",
      "auth.syncStatus.syncing": "同步中",
      "auth.syncStatus.offline": "离线",
      "auth.syncStatus.error": "同步错误",
    };
    return dict[key] || fallback || key;
  }

  /* ── Auth state management ───────────────────────── */
  function getLocalAuthState() {
    var state = safeGet(KEYS.AUTH_STATE, null);
    if (!state) {
      // Migrate from old AUTH_MODE if present
      var oldMode = safeGet(KEYS.AUTH_MODE, null);
      if (oldMode) {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        state.mode = oldMode;
        state.updated_at = new Date().toISOString();
        if (oldMode === "mock_signed_in") {
          var mock = safeGet(KEYS.MOCK_USER, null);
          if (mock) {
            state.user_id = mock.user_id || "mock-user";
            state.email = mock.email || "mock@example.com";
            state.display_name = mock.display_name || "模拟用户";
            state.provider = "mock";
          }
        }
        setLocalAuthState(state);
        safeRemove(KEYS.AUTH_MODE);
      } else {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      }
    }
    return state;
  }

  function setLocalAuthState(state) {
    if (!state) return;
    state.updated_at = new Date().toISOString();
    safeSet(KEYS.AUTH_STATE, state);
  }

  function clearLocalAuthState() {
    safeRemove(KEYS.AUTH_STATE);
    safeRemove(KEYS.MOCK_USER);
    safeRemove(KEYS.AUTH_MODE);
    setAnonymousMode();
  }

  function setAnonymousMode() {
    var state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    state.created_at = new Date().toISOString();
    state.updated_at = new Date().toISOString();
    safeSet(KEYS.AUTH_STATE, state);
    renderUserMenu();
    closeAuthPanel();
  }

  function setMockSignedInUser(profile) {
    profile = profile || {};
    var state = {
      mode:         "mock_signed_in",
      user_id:      profile.user_id || "mock-user",
      email:        profile.email || "mock@example.com",
      display_name: profile.display_name || "模拟用户",
      provider:     "mock",
      sync_enabled: true,
      last_sync_at: null,
      created_at:   new Date().toISOString(),
      updated_at:   new Date().toISOString(),
    };
    safeSet(KEYS.AUTH_STATE, state);
    safeSet(KEYS.MOCK_USER, profile);
    renderUserMenu();
    closeAuthPanel();
  }

  function getDisplayUserLabel() {
    var state = getLocalAuthState();
    if (!state || state.mode === "local_anonymous") {
      return t("auth.localMode", "本地模式");
    }
    return state.display_name || state.email || t("auth.account", "账号");
  }

  function getSupabaseStatusLabel() {
    if (!window.StudySupabase || typeof window.StudySupabase.getStatus !== "function") {
      return "SDK 未加载";
    }
    var status = window.StudySupabase.getStatus();
    var labels = {
      not_configured: "未配置",
      sdk_not_loaded: "SDK 未加载",
      disabled: "已禁用",
      initialization_error: "初始化失败",
      ready_to_initialize: "可初始化",
      ready: "已就绪",
    };
    return labels[status.code] || status.message || "未知";
  }

  /* ── Panel ────────────────────────────────────────── */
  var panelVisible = false;

  function openAuthPanel(mode) {
    if (panelVisible) return;
    panelVisible = true;

    var panel = el("auth-panel");
    if (!panel) {
      panel = createAuthPanel();
      document.body.appendChild(panel);
    }
    panel.hidden = false;
    panel.style.display = "block";

    // Populate panel content
    populateAuthPanel(panel, mode || "default");
  }

  function closeAuthPanel() {
    panelVisible = false;
    var panel = el("auth-panel");
    if (panel) {
      panel.hidden = true;
      panel.style.display = "none";
    }
  }

  function createAuthPanel() {
    var backdrop = document.createElement("div");
    backdrop.className = "auth-panel-backdrop";
    backdrop.id = "auth-panel-backdrop";
    backdrop.addEventListener("click", closeAuthPanel);

    var panel = document.createElement("aside");
    panel.className = "auth-panel";
    panel.id = "auth-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "auth-panel-title");
    panel.hidden = true;

    panel.appendChild(backdrop);

    var content = document.createElement("div");
    content.className = "auth-panel-content";
    content.id = "auth-panel-content";
    panel.appendChild(content);

    return panel;
  }

  function populateAuthPanel(panel, mode) {
    var state = getLocalAuthState();
    var content = el("auth-panel-content");
    if (!content) return;

    var syncStatus = window.StudySync ? window.StudySync.getSyncStatus() : null;
    var qSize = syncStatus ? syncStatus.queue_pending : 0;
    var lastSync = syncStatus ? syncStatus.last_sync_at : null;
    var deviceId = syncStatus ? syncStatus.device_id : (window.StudySync ? window.StudySync.getDeviceId() : "—");

    var isAnonymous = state.mode === "local_anonymous";
    var isMock = state.mode === "mock_signed_in";

    content.innerHTML =
      '<div class="auth-panel-header">' +
        '<h3 id="auth-panel-title">' + esc(t("auth.account", "账号")) + '</h3>' +
        '<button class="auth-panel-close-btn" data-auth-action="close" title="' + esc(t("auth.close", "关闭")) + '"><i class="fa-solid fa-xmark"></i></button>' +
      '</div>' +
      '<div class="auth-panel-body">' +
        // Status section
        '<div class="auth-status-section">' +
          '<div class="auth-status-row">' +
            '<span class="auth-label">' + esc(t("auth.syncStatus.local", "状态")) + ':</span>' +
            '<span class="auth-value auth-badge-' + (isAnonymous ? "local" : "synced") + '">' +
              (isAnonymous ? esc(t("auth.localMode", "本地模式")) : esc(t("auth.syncStatus.synced", "已登录"))) +
            '</span>' +
          '</div>' +
          '<div class="auth-status-row">' +
            '<span class="auth-label">Supabase:</span>' +
            '<span class="auth-value" data-i18n-skip="true">' + esc(getSupabaseStatusLabel()) + '</span>' +
          '</div>' +
        '</div>' +

        // Sync development notice
        '<div class="auth-notice">' +
          '<i class="fa-solid fa-info-circle"></i> ' +
          esc(t("auth.syncInDev", "同步功能开发中")) +
        '</div>' +

        // Device info
        '<div class="auth-info-section">' +
          '<div class="auth-info-row"><span class="auth-label">' + esc(t("auth.deviceId", "设备 ID")) + ':</span>' +
          '<span class="auth-value auth-device-id" title="' + esc(deviceId) + '">' + esc(deviceId ? deviceId.slice(0, 20) + "..." : "—") + '</span></div>' +
          '<div class="auth-info-row"><span class="auth-label">' + esc(t("auth.pendingSync", "待同步")) + ':</span>' +
          '<span class="auth-value">' + qSize + '</span></div>' +
          '<div class="auth-info-row"><span class="auth-label">' + esc(t("auth.lastSync", "上次同步")) + ':</span>' +
          '<span class="auth-value">' + (lastSync ? esc(lastSync) : "—") + '</span></div>' +
        '</div>' +

        // Privacy note
        '<div class="auth-privacy-note">' +
          '<i class="fa-solid fa-shield-halved"></i> ' +
          esc(t("auth.noUpload", "不会上传数据")) +
        '</div>' +

        // Action buttons
        '<div class="auth-actions">' +
          (isMock ?
            '<button class="auth-btn auth-btn-secondary" data-auth-action="sign-out">' +
              '<i class="fa-solid fa-sign-out-alt"></i> ' + esc(t("auth.mockSignOut", "退出模拟登录")) +
            '</button>' :
            '<button class="auth-btn auth-btn-primary" data-auth-action="sign-in">' +
              '<i class="fa-solid fa-user"></i> ' + esc(t("auth.mockSignIn", "模拟登录状态")) +
            '</button>'
          ) +
          '<button class="auth-btn auth-btn-secondary" data-auth-action="export">' +
            '<i class="fa-solid fa-download"></i> ' + esc(t("auth.exportSnapshot", "导出本地快照")) +
          '</button>' +
        '</div>' +
      '</div>';

    bindAuthPanelActions(content);
  }

  function bindAuthPanelActions(content) {
    var closeButton = qs('[data-auth-action="close"]', content);
    var signInButton = qs('[data-auth-action="sign-in"]', content);
    var signOutButton = qs('[data-auth-action="sign-out"]', content);
    var exportButton = qs('[data-auth-action="export"]', content);

    if (closeButton) closeButton.addEventListener("click", closeAuthPanel);
    if (signInButton) {
      signInButton.addEventListener("click", function () {
        setMockSignedInUser({ display_name: t("auth.account", "模拟用户") });
      });
    }
    if (signOutButton) signOutButton.addEventListener("click", setAnonymousMode);
    if (exportButton) exportButton.addEventListener("click", exportSnapshotAction);
  }

  function renderUserMenu() {
    var header = qs(".app-header");
    if (!header) return;

    var existing = el("auth-user-btn");
    if (existing) existing.remove();

    var state = getLocalAuthState();
    var isAnonymous = state.mode === "local_anonymous";

    var userBtn = document.createElement("button");
    userBtn.id = "auth-user-btn";
    userBtn.className = "auth-user-btn";
    userBtn.type = "button";
    userBtn.setAttribute("title", t("auth.account", "账号"));
    userBtn.addEventListener("click", function () {
      openAuthPanel();
    });

    var state = getLocalAuthState();
    var isAnonymous = state.mode === "local_anonymous";

    userBtn.innerHTML =
      '<span class="auth-user-icon"><i class="fa-solid fa-' + (isAnonymous ? "user" : "user-check") + '"></i></span>' +
      '<span class="auth-user-label">' + esc(isAnonymous ? t("auth.localMode", "本地模式") : t("auth.syncStatus.synced", "已登录")) + '</span>';

    // Insert before theme-toggle
    var themeBtn = el("theme-toggle-btn");
    if (themeBtn && themeBtn.parentNode) {
      themeBtn.parentNode.insertBefore(userBtn, themeBtn);
    } else {
      header.appendChild(userBtn);
    }
  }

  /* ── Export action ───────────────────────────────── */
  function exportSnapshotAction() {
    if (!window.StudySync || typeof window.StudySync.exportLocalSyncSnapshot !== "function") {
      console.warn("[AuthUI] StudySync not available for export");
      return;
    }
    try {
      var snapshot = window.StudySync.exportLocalSyncSnapshot();
      var blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "study-tools-snapshot-" + new Date().toISOString().slice(0, 10) + ".json";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.warn("[AuthUI] Export failed:", e);
    }
  }

  /* ── Init ─────────────────────────────────────────── */
  function initAuthUI() {
    // Ensure StudySync is available
    if (!window.StudySync) {
      console.warn("[AuthUI] StudySync not found, auth UI will be limited");
    }
    renderUserMenu();
    ensureSupabaseAdapter();
  }

  /* ── Utility esc ─────────────────────────────────── */
  function esc(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ── Public API ──────────────────────────────────── */
  window.StudyAuthUI = {
    initAuthUI:            initAuthUI,
    getLocalAuthState:     getLocalAuthState,
    setLocalAuthState:     setLocalAuthState,
    clearLocalAuthState:   clearLocalAuthState,
    openAuthPanel:         openAuthPanel,
    closeAuthPanel:        closeAuthPanel,
    renderUserMenu:        renderUserMenu,
    setMockSignedInUser:   setMockSignedInUser,
    setAnonymousMode:      setAnonymousMode,
    getDisplayUserLabel:   getDisplayUserLabel,
    exportSnapshotAction:  exportSnapshotAction,
    _keys:                 KEYS,
  };
})();
