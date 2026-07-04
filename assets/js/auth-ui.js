/**
 * Study Tools Auth UI - Supabase Auth and manual sync controls.
 *
 * Network operations remain explicit user actions and require a configured,
 * authenticated Supabase client. Mock sign-in remains for UI development.
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
    username:     null,
    display_name: null,
    auth_mode:    null,
    provider:     null,               // null | "mock"
    sync_enabled: false,
    last_sync_at: null,
    created_at:   new Date().toISOString(),
    updated_at:   new Date().toISOString(),
  };

  var supabaseAdapterLoading = null;
  var authMessage = "";
  var authMessageKind = "info"; // "info" | "error" | "success"
  var authSubscription = null;
  var syncMessage = "";
  var syncInProgress = false;
  var accountManagementOpen = false;
  var profileUpdateInProgress = false;
  var passwordUpdateInProgress = false;
  /* P15.2 提交状态机：idle | loggingIn | registering（validating 为同步校验，瞬时不驻留） */
  var authFlowState = "idle";
  var lastFocusedTrigger = null;
  var activeAuthTab = "login";

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
      "auth.localMode": "Local Mode",
      "auth.notLoggedIn": "Not logged in",
      "auth.account": "Account",
      "auth.sync": "Sync",
      "auth.syncInDev": "Sync in development",
      "auth.continueLocal": "Continue locally",
      "auth.mockSignIn": "Simulate sign-in",
      "auth.mockSignOut": "Exit simulation",
      "auth.exportSnapshot": "Export local snapshot",
      "auth.deviceId": "Device ID",
      "auth.pendingSync": "Pending sync",
      "auth.lastSync": "Last sync",
      "auth.noUpload": "No data will be uploaded",
      "auth.close": "Close",
      "auth.disabled": "Configured but disabled",
      "auth.initializationError": "Initialization failed",
      "auth.unknown": "Unknown",
      "auth.syncStatus.local": "Local",
      "auth.syncStatus.synced": "Synced",
      "auth.syncStatus.syncing": "Syncing",
      "auth.syncStatus.offline": "Offline",
      "auth.syncStatus.error": "Sync error",
      "auth.loginTitle": "Sign In",
      "auth.registerTitle": "Create Account",
      "auth.username": "Username",
      "auth.usernamePlaceholder": "3-24 letters, numbers, underscores, or hyphens",
      "auth.displayNameOptional": "Display name (optional)",
      "auth.password": "Password",
      "auth.confirmPassword": "Confirm password",
      "auth.loginButton": "Sign In",
      "auth.createAccountButton": "Create Account",
      "auth.usernameRequired": "Please enter a username",
      "auth.usernameTooShort": "Username must be at least 3 characters",
      "auth.usernameTooLong": "Username must be no more than 24 characters",
      "auth.usernameInvalid": "Use only letters, numbers, underscores, and hyphens",
      "auth.passwordRequired": "Please enter a password",
      "auth.passwordTooShort": "Password must be at least 6 characters",
      "auth.passwordMismatch": "Passwords do not match",
      "auth.loginSuccess": "Sign in successful",
      "auth.loginFailed": "Sign in failed",
      "auth.registerSuccess": "Account created",
      "auth.registerFailed": "Registration failed",
      "auth.usernameOrPasswordWrong": "Username or password is incorrect",
      "auth.usernameTaken": "This username is already in use",
      "auth.usernameRegistrationUnavailable": "Username account creation is unavailable. Check the Supabase sign-up and email confirmation settings.",
      "auth.usernameAccount": "Username account",
      "auth.legacyEmailAccount": "Legacy email account",
      "auth.accountType": "Account type",
      "auth.emailConfirmationUsernameWarning": "The account was created, but email confirmation is enabled. Username accounts cannot receive confirmation mail. Disable email confirmation for this project or use an existing test account.",
      "auth.noEmailRequired": "No email required",
      "auth.noEmailRequiredDesc": "Sign in with only your username and password.",
      "auth.tooManyRequests": "Too many requests. Please try again later.",
      "auth.signOut": "Sign Out",
      "auth.currentUser": "Current user",
      "auth.supabaseConnected": "Supabase connected",
      "auth.supabaseNotConfigured": "Supabase not configured",
      "auth.sdkMissing": "SDK not loaded",
      "auth.signInFirst": "Please sign in first",
      "auth.syncNow": "Sync now",
      "auth.syncingNow": "Syncing",
      "auth.syncSuccess": "Sync successful",
      "auth.syncFailed": "Sync failed",
      "auth.syncIntro": "Sync learning progress across devices",
      "auth.syncScope": "Only syncs learning progress and settings",
      "auth.onlySyncTypingBookmarks": "Currently only syncs Japanese typing bookmarks",
      "auth.noAiKeyUpload": "AI keys are not uploaded",
      "auth.noAiCacheUpload": "AI translation cache is not uploaded",
      "auth.noAutoSync": "No automatic sync",
      "auth.deviceAndSyncDetails": "Device and sync details",
      "auth.progressPushed": "Progress uploaded",
      "auth.progressPulled": "Progress downloaded",
      "auth.quizPushed": "Quiz results",
      "auth.bookmarksPushed": "Bookmarks uploaded",
      "auth.bookmarksPulled": "Bookmarks downloaded",
      "auth.bookmarksMerged": "Bookmarks merged",
      "auth.bookmarksDeletedSynced": "Bookmark deletions synced",
      "auth.bookmarksRestored": "Bookmarks restored",
      "auth.bookmarksConflictsResolved": "Bookmark conflicts resolved",
      "auth.wrongBookPushed": "Wrong book uploaded",
      "auth.wrongBookPulled": "Wrong book downloaded",
      "auth.wrongBookMerged": "Wrong book merged",
      "auth.wrongBookSkipped": "Wrong book skipped",
      "auth.wrongBookRetrySettingsPushed": "Retry settings uploaded",
      "auth.wrongBookRetrySettingsPulled": "Retry settings downloaded",
      "auth.wrongBookRetrySettingsMerged": "Retry settings merged",
      "auth.wrongBookRetrySettingsFailed": "Retry settings sync failed",
      "auth.conflictsResolved": "Merged remote progress",
      "auth.syncSummaryTitle": "Sync summary",
      "auth.syncFailedDetail": "Some sync operations failed. Please retry.",
      "auth.accountManagement": "Account management",
      "auth.accountManagementHint": "Update your display name or password.",
      "auth.usernameReadonly": "Username cannot be changed yet.",
      "auth.usernameChangeComingSoon": "Username changes will be available in a future version.",
      "auth.displayName": "Display name",
      "auth.newDisplayName": "New display name",
      "auth.saveDisplayName": "Save display name",
      "auth.displayNameRequired": "Please enter a display name",
      "auth.displayNameTooLong": "Display name must be no more than 32 characters",
      "auth.displayNameUpdated": "Display name updated",
      "auth.displayNameUpdateFailed": "Display name update failed",
      "auth.changePassword": "Change password",
      "auth.newPassword": "New password",
      "auth.confirmNewPassword": "Confirm new password",
      "auth.updatePassword": "Update password",
      "auth.passwordUpdated": "Password updated. Keep it safe.",
      "auth.passwordUpdateFailed": "Password update failed",
      "auth.passwordKeepSafe": "Use a unique password and keep it safe.",
      "auth.accountSecurity": "Account security",
      "auth.currentUsername": "Current username",
      "auth.currentDisplayName": "Current display name",
      "auth.saving": "Saving",
      "auth.panelTitle": "Account & Sync",
      "auth.panelSubtitle": "Sign in to sync learning progress and settings across devices",
      "auth.optional": "optional",
      "auth.showPassword": "Show password",
      "auth.hidePassword": "Hide password",
      "auth.loggingIn": "Signing in",
      "auth.registering": "Creating account",
      "auth.displayNameDefaultHint": "Leave empty to use your username",
      "auth.passwordRuleHint": "At least 6 characters; use a unique password",
      "auth.syncState.signedOutLocalTitle": "Local mode",
      "auth.syncState.signedOutLocalDesc": "Your learning data is stored on this device. Everything works offline. Sign in to enable multi-device sync.",
      "auth.syncState.authenticatingTitle": "Verifying identity",
      "auth.syncState.authenticatingDesc": "Contacting the sync service. Please wait.",
      "auth.syncState.pendingTitle": "Signed in, not synced yet",
      "auth.syncState.pendingDesc": "Nothing syncs automatically. Click “Sync now” to upload and fetch progress.",
      "auth.syncState.syncingTitle": "Syncing",
      "auth.syncState.syncingDesc": "Uploading and fetching learning progress. Please keep this window open.",
      "auth.syncState.syncedTitle": "Synced",
      "auth.syncState.syncedDesc": "Your learning progress and settings are synced to your account.",
      "auth.syncState.mergedTitle": "Synced (merged)",
      "auth.syncState.mergedDesc": "Remote and local progress merged additively — local records are never deleted.",
      "auth.syncState.cloudUnavailableTitle": "Cloud sync unavailable",
      "auth.syncState.cloudUnavailableDesc": "Cannot reach the sync service. Your data is safe on this device and learning is unaffected.",
      "auth.syncState.failedTitle": "Sync failed",
      "auth.syncState.failedDesc": "No local data was lost. You can retry the sync or keep learning locally.",
      "auth.syncState.retrySync": "Retry sync",
      "auth.syncState.retryConnect": "Retry connection",
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

  function setSupabaseSignedInUser(user, displayName) {
    if (!user) return;
    var metadata = user.user_metadata || {};
    var emailPrefix = user.email ? user.email.split("@")[0] : "";
    var username = metadata.username || (metadata.auth_mode === "username" ? emailPrefix : "");
    var authMode = metadata.auth_mode === "username" || /@study-tools\.local$/i.test(user.email || "")
      ? "username"
      : "legacy_email";
    var resolvedName = displayName || metadata.display_name || metadata.nickname || username || emailPrefix || t("auth.account", "账号");
    setLocalAuthState({
      mode: "signed_in",
      user_id: user.id || null,
      email: user.email || null,
      username: username || null,
      display_name: resolvedName,
      auth_mode: authMode,
      provider: "supabase",
      sync_enabled: true,
      last_sync_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    renderUserMenu();
    if (panelVisible) populateAuthPanel(el("auth-panel"), "auth-refresh");
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
      return t("auth.sdkMissing", "SDK 未加载");
    }
    var status = window.StudySupabase.getStatus();
    var labels = {
      not_configured: t("auth.supabaseNotConfigured", "Supabase 未配置"),
      sdk_missing: t("auth.sdkMissing", "SDK 未加载"),
      disabled: t("auth.disabled", "已配置但未启用"),
      initialization_error: t("auth.initializationError", "初始化失败"),
      ready_to_initialize: t("auth.supabaseConnected", "Supabase 已连接"),
      ready: t("auth.supabaseConnected", "Supabase 已连接"),
    };
    return labels[status.code] || status.message || t("auth.unknown", "未知");
  }

  /* ── Panel ────────────────────────────────────────── */
  var panelVisible = false;

  /* P15.2：overlay 打开时背景 inert；关闭必须完全清理（不残留 inert/backdrop） */
  function setBackgroundInert(on) {
    [".app-frame", ".app-statusbar"].forEach(function (sel) {
      var node = document.querySelector(sel);
      if (!node) return;
      if (on) node.setAttribute("inert", "");
      else node.removeAttribute("inert");
    });
  }

  function onAuthPanelKeydown(event) {
    if (!panelVisible) return;
    if (event.key === "Escape") {
      event.stopPropagation();
      closeAuthPanel();
      return;
    }
    if (event.key === "Tab") {
      var panel = el("auth-panel");
      if (!panel || panel.hidden) return;
      var focusables = panel.querySelectorAll('button:not([disabled]), input:not([disabled]), summary, [href], [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function openAuthPanel(mode) {
    if (panelVisible) return;
    panelVisible = true;
    lastFocusedTrigger = document.activeElement;

    var backdrop = el("auth-panel-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "auth-panel-backdrop";
      backdrop.id = "auth-panel-backdrop";
      backdrop.addEventListener("click", closeAuthPanel);
      document.body.appendChild(backdrop);
    }
    backdrop.hidden = false;
    backdrop.style.display = "block";

    var panel = el("auth-panel");
    if (!panel) {
      panel = createAuthPanel();
    }
    panel.hidden = false;
    panel.style.display = "block";

    // Populate panel content
    populateAuthPanel(panel, mode || "default");
    setBackgroundInert(true);
    document.addEventListener("keydown", onAuthPanelKeydown, true);

    var firstFocus = panel.querySelector(".auth-tab.active") || panel.querySelector("input, button");
    if (firstFocus) firstFocus.focus();
  }

  function closeAuthPanel() {
    panelVisible = false;
    authFlowState = "idle";
    document.removeEventListener("keydown", onAuthPanelKeydown, true);
    setBackgroundInert(false);
    var backdrop = el("auth-panel-backdrop");
    if (backdrop) {
      backdrop.hidden = true;
      backdrop.style.display = "none";
    }
    var panel = el("auth-panel");
    if (panel) {
      panel.hidden = true;
      panel.style.display = "none";
    }
    /* 焦点回到账户触发器（任务书：关闭后焦点恢复，无黑幕锁死） */
    var trigger = el("auth-user-btn");
    if (trigger && typeof trigger.focus === "function") trigger.focus();
    else if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") lastFocusedTrigger.focus();
    lastFocusedTrigger = null;
  }

  function createAuthPanel() {
    var panel = document.createElement("aside");
    panel.className = "auth-panel";
    panel.id = "auth-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "auth-panel-title");
    panel.hidden = true;

    var content = document.createElement("div");
    content.className = "auth-panel-content";
    content.id = "auth-panel-content";
    panel.appendChild(content);

    document.body.appendChild(panel);
    return panel;
  }

  /* ── P15.2 同步状态模型 ──────────────────────────────
     推导为真实状态，绝不伪造：未登录不显示已同步；云不可用如实说明；
     失败强调本地数据未丢失；合并策略如实标注（union 只增不删）。 */
  function deriveSyncUiState() {
    if (authFlowState === "loggingIn" || authFlowState === "registering") return "authenticating";
    var state = getLocalAuthState();
    if (!state || state.mode !== "signed_in" || state.provider !== "supabase") return "signedOutLocal";
    var supa = window.StudySupabase && typeof window.StudySupabase.getStatus === "function"
      ? window.StudySupabase.getStatus()
      : { ready: false };
    if (!supa.ready) return "cloudUnavailable";
    if (syncInProgress) return "syncing";
    var summary = window.StudySync && typeof window.StudySync.getSyncSummary === "function"
      ? window.StudySync.getSyncSummary()
      : null;
    if (summary && summary.status === "error") return "syncFailed";
    if (summary && summary.status === "success") {
      var merges = summary.summary && (summary.summary.conflicts_resolved || summary.summary.bookmarks_conflicts_resolved);
      return merges ? "syncedWithMerges" : "synced";
    }
    return "authenticatedSyncPending";
  }

  function syncStateCardHtml() {
    var s = deriveSyncUiState();
    var canSync = !syncInProgress;
    var M = {
      signedOutLocal: {
        icon: "fa-laptop", cls: "is-local",
        title: t("auth.syncState.signedOutLocalTitle", "本地模式"),
        desc: t("auth.syncState.signedOutLocalDesc", "当前学习记录保存在这台设备上，学习功能完全可用。登录后可开启多设备同步。"),
        action: null,
      },
      authenticating: {
        icon: "fa-circle-notch fa-spin", cls: "is-busy",
        title: t("auth.syncState.authenticatingTitle", "正在验证身份"),
        desc: t("auth.syncState.authenticatingDesc", "正在与同步服务通信，请稍候。"),
        action: null,
      },
      authenticatedSyncPending: {
        icon: "fa-cloud-arrow-up", cls: "is-pending",
        title: t("auth.syncState.pendingTitle", "已登录，尚未同步"),
        desc: t("auth.syncState.pendingDesc", "不会自动同步。点击「立即同步」上传并获取学习进度。"),
        action: canSync ? { act: "manual-sync", label: t("auth.syncNow", "立即同步"), icon: "fa-rotate" } : null,
      },
      syncing: {
        icon: "fa-rotate fa-spin", cls: "is-busy",
        title: t("auth.syncState.syncingTitle", "正在同步"),
        desc: t("auth.syncState.syncingDesc", "正在上传或获取学习进度，请不要关闭当前窗口。"),
        action: null,
      },
      synced: {
        icon: "fa-cloud-check", cls: "is-ok",
        title: t("auth.syncState.syncedTitle", "已同步"),
        desc: t("auth.syncState.syncedDesc", "你的学习进度与设置已同步到账户。"),
        action: canSync ? { act: "manual-sync", label: t("auth.syncNow", "立即同步"), icon: "fa-rotate" } : null,
      },
      syncedWithMerges: {
        icon: "fa-code-merge", cls: "is-ok",
        title: t("auth.syncState.mergedTitle", "已同步（含合并）"),
        desc: t("auth.syncState.mergedDesc", "已按「只增不删」策略合并远端与本地进度，本地记录不会被覆盖删除。"),
        action: canSync ? { act: "manual-sync", label: t("auth.syncNow", "立即同步"), icon: "fa-rotate" } : null,
      },
      cloudUnavailable: {
        icon: "fa-cloud-slash", cls: "is-warn",
        title: t("auth.syncState.cloudUnavailableTitle", "云同步不可用"),
        desc: t("auth.syncState.cloudUnavailableDesc", "当前无法连接同步服务。学习记录仍安全保存在本机，学习不受影响。"),
        action: { act: "retry-cloud", label: t("auth.syncState.retryConnect", "重试连接"), icon: "fa-plug" },
      },
      syncFailed: {
        icon: "fa-triangle-exclamation", cls: "is-warn",
        title: t("auth.syncState.failedTitle", "同步失败"),
        desc: t("auth.syncState.failedDesc", "本地记录没有丢失。你可以重试同步，或继续本地学习。"),
        action: canSync ? { act: "manual-sync", label: t("auth.syncState.retrySync", "重试同步"), icon: "fa-rotate-right" } : null,
      },
    };
    var m = M[s] || M.signedOutLocal;
    return '<div class="auth-sync-state ' + m.cls + '" data-sync-ui-state="' + s + '">' +
      '<div class="auth-sync-state__head"><i class="fa-solid ' + m.icon + '" aria-hidden="true"></i>' +
        '<strong>' + esc(m.title) + '</strong></div>' +
      '<div class="auth-sync-state__desc">' + esc(m.desc) + '</div>' +
      (m.action
        ? '<button type="button" class="auth-btn auth-btn-secondary auth-sync-state__action" data-auth-action="' + m.action.act + '">' +
            '<i class="fa-solid ' + m.action.icon + '"></i> ' + esc(m.action.label) + '</button>'
        : '') +
      '</div>';
  }

  /* ── P15.2 语义字段与字段级错误 ── */
  function fieldHtml(opts) {
    var attrs = ' id="' + opts.id + '" class="auth-input" data-auth-input="' + opts.input + '" type="' + opts.type + '"';
    if (opts.autocomplete) attrs += ' autocomplete="' + opts.autocomplete + '"';
    if (opts.maxlength) attrs += ' maxlength="' + opts.maxlength + '"';
    if (opts.type !== "password") attrs += ' autocapitalize="none" spellcheck="false"';
    attrs += ' aria-describedby="' + opts.id + '-error' + (opts.hint ? " " + opts.id + "-hint" : "") + '"';
    return '<div class="auth-field">' +
      '<label class="auth-field-label" for="' + opts.id + '">' + esc(opts.label) +
        (opts.optional ? ' <span class="auth-field-optional">' + esc(t("auth.optional", "可选")) + '</span>' : '') + '</label>' +
      '<div class="auth-input-wrap">' +
        '<input' + attrs + '>' +
        (opts.type === "password"
          ? '<button type="button" class="auth-pw-toggle" data-pw-toggle="' + opts.id + '" aria-pressed="false" aria-label="' + esc(t("auth.showPassword", "显示密码")) + '"><i class="fa-solid fa-eye" aria-hidden="true"></i></button>'
          : '') +
      '</div>' +
      (opts.hint ? '<div class="auth-field-hint" id="' + opts.id + '-hint">' + esc(opts.hint) + '</div>' : '') +
      '<div class="auth-field-error" id="' + opts.id + '-error" data-error-for="' + opts.input + '" hidden></div>' +
    '</div>';
  }

  function clearFieldErrors() {
    var content = el("auth-panel-content");
    if (!content) return;
    content.querySelectorAll(".auth-field-error").forEach(function (node) {
      node.hidden = true;
      node.textContent = "";
    });
    content.querySelectorAll(".auth-input[aria-invalid]").forEach(function (input) {
      input.removeAttribute("aria-invalid");
    });
  }

  /* 字段级错误：不重建表单（保留用户已输入内容），聚焦出错字段 */
  function setFieldError(inputName, message) {
    var content = el("auth-panel-content");
    if (!content) return;
    var node = qs('[data-error-for="' + inputName + '"]', content);
    var input = qs('[data-auth-input="' + inputName + '"]', content);
    if (node) {
      node.textContent = message;
      node.hidden = false;
    }
    if (input) {
      input.setAttribute("aria-invalid", "true");
      input.focus();
    }
  }

  /* 全局通知区更新（不重建表单） */
  function setAuthNotice(message, kind) {
    authMessage = message || "";
    authMessageKind = kind || "info";
    var content = el("auth-panel-content");
    if (!content) return;
    var host = qs(".auth-message-slot", content);
    if (!host) return;
    host.innerHTML = authMessage
      ? '<div class="auth-notice auth-message-notice is-' + authMessageKind + '"><i class="fa-solid ' +
        (authMessageKind === "error" ? "fa-circle-exclamation" : authMessageKind === "success" ? "fa-circle-check" : "fa-circle-info") +
        '"></i> <span>' + esc(authMessage) + '</span></div>'
      : "";
  }

  /* 提交状态机：请求进行中仅禁用相关表单按钮与输入，禁止重复提交 */
  function setFlowState(next) {
    authFlowState = next;
    var content = el("auth-panel-content");
    if (!content) return;
    var busy = next === "loggingIn" || next === "registering";
    var loginBtn = qs('[data-auth-action="password-sign-in"]', content);
    var regBtn = qs('[data-auth-action="register"]', content);
    if (loginBtn) {
      loginBtn.disabled = busy;
      loginBtn.innerHTML = next === "loggingIn"
        ? '<i class="fa-solid fa-circle-notch fa-spin"></i> ' + esc(t("auth.loggingIn", "正在登录"))
        : '<i class="fa-solid fa-right-to-bracket"></i> ' + esc(t("auth.loginButton", "登录"));
    }
    if (regBtn) {
      regBtn.disabled = busy;
      regBtn.innerHTML = next === "registering"
        ? '<i class="fa-solid fa-circle-notch fa-spin"></i> ' + esc(t("auth.registering", "正在创建"))
        : '<i class="fa-solid fa-user-plus"></i> ' + esc(t("auth.createAccountButton", "创建账号"));
    }
    content.querySelectorAll(".auth-login-form input").forEach(function (input) {
      input.disabled = busy;
    });
    var form = qs(".auth-login-section", content);
    if (form) form.setAttribute("aria-busy", busy ? "true" : "false");
    updateSyncStateCard();
  }

  function updateSyncStateCard() {
    var content = el("auth-panel-content");
    if (!content) return;
    var slot = qs(".auth-sync-state-slot", content);
    if (slot) {
      slot.innerHTML = syncStateCardHtml();
      var actionBtn = qs("[data-auth-action]", slot);
      if (actionBtn) actionBtn.addEventListener("click", handleSyncStateAction);
    }
  }

  function handleSyncStateAction(event) {
    var act = event.currentTarget.getAttribute("data-auth-action");
    if (act === "manual-sync") return handleManualSync();
    if (act === "retry-cloud") {
      if (window.StudySupabase && typeof window.StudySupabase.initClient === "function") {
        window.StudySupabase.initClient();
      }
      if (panelVisible) populateAuthPanel(el("auth-panel"), "retry-cloud");
    }
  }

  function populateAuthPanel(panel, mode) {
    var state = getLocalAuthState();
    var content = el("auth-panel-content");
    if (!content) return;

    var syncStatus = window.StudySync ? window.StudySync.getSyncStatus() : null;
    var syncSummary = window.StudySync && typeof window.StudySync.getSyncSummary === "function"
      ? window.StudySync.getSyncSummary()
      : null;
    var qSize = syncStatus ? syncStatus.queue_pending : 0;
    var lastSync = syncStatus ? syncStatus.last_sync_at : null;
    var deviceId = syncStatus ? syncStatus.device_id : (window.StudySync ? window.StudySync.getDeviceId() : "—");

    // Extract sync summary details
    var summaryDetails = syncSummary && syncSummary.summary ? syncSummary.summary : null;
    var hasSyncSummary = Boolean(summaryDetails);
    var progressPushed = summaryDetails ? summaryDetails.progress_pushed : 0;
    var progressPulled = summaryDetails ? summaryDetails.progress_pulled : 0;
    var quizPushed = summaryDetails ? summaryDetails.quiz_pushed : 0;
    var bookmarksPushed = summaryDetails ? summaryDetails.bookmarks_pushed : 0;
    var bookmarksPulled = summaryDetails ? summaryDetails.bookmarks_pulled : 0;
    var bookmarksMerged = summaryDetails ? summaryDetails.bookmarks_merged : 0;
    var bookmarksDeletedPushed = summaryDetails ? summaryDetails.bookmarks_deleted_pushed : 0;
    var bookmarksDeletedPulled = summaryDetails ? summaryDetails.bookmarks_deleted_pulled : 0;
    var bookmarksRestored = summaryDetails ? summaryDetails.bookmarks_restored : 0;
    var bookmarksConflictsResolved = summaryDetails ? summaryDetails.bookmarks_conflicts_resolved : 0;
    var wrongbookPushed = summaryDetails ? summaryDetails.wrongbook_pushed : 0;
    var wrongbookPulled = summaryDetails ? summaryDetails.wrongbook_pulled : 0;
    var wrongbookMerged = summaryDetails ? summaryDetails.wrongbook_merged : 0;
    var wrongbookSkipped = summaryDetails ? summaryDetails.wrongbook_skipped : 0;
    var retrySettingsPushed = summaryDetails ? summaryDetails.wrongbook_retry_settings_pushed : 0;
    var retrySettingsPulled = summaryDetails ? summaryDetails.wrongbook_retry_settings_pulled : 0;
    var retrySettingsMerged = summaryDetails ? summaryDetails.wrongbook_retry_settings_merged : 0;
    var retrySettingsFailed = summaryDetails ? summaryDetails.wrongbook_retry_settings_failed : false;
    var typingPushed = summaryDetails ? summaryDetails.typing_sessions_pushed : 0;
    var typingPulled = summaryDetails ? summaryDetails.typing_sessions_pulled : 0;
    var examPushed = summaryDetails ? summaryDetails.exam_sessions_pushed : 0;
    var examPulled = summaryDetails ? summaryDetails.exam_sessions_pulled : 0;
    var conflictsResolved = summaryDetails ? summaryDetails.conflicts_resolved : 0;
    var warnings = summaryDetails && summaryDetails.warnings ? summaryDetails.warnings : [];
    var syncDuration = summaryDetails ? summaryDetails.duration_ms : 0;

    var isAnonymous = state.mode === "local_anonymous";
    var isMock = state.mode === "mock_signed_in";
    var isSupabaseUser = state.mode === "signed_in" && state.provider === "supabase";
    var accountLabel = state.display_name || state.username || t("auth.account", "账号");
    var accountTypeLabel = state.auth_mode === "username"
      ? t("auth.usernameAccount", "用户名账号")
      : t("auth.legacyEmailAccount", "旧邮箱账号");
    var supabaseReady = window.StudySupabase && window.StudySupabase.getStatus().ready;
    var canManualSync = isSupabaseUser && supabaseReady && !syncInProgress;
    var syncStateLabel = syncInProgress
      ? t("auth.syncingNow", "正在同步")
      : (syncSummary && syncSummary.status === "success"
        ? t("auth.syncSuccess", "同步成功")
        : (syncSummary && syncSummary.status === "error"
          ? t("auth.syncFailed", "同步失败")
          : t("auth.syncStatus.local", "本地模式")));

    // Build sync summary HTML if available (collapsible using details)
    var summaryHtml = "";
    if (hasSyncSummary && syncSummary.status === "success") {
      var detailsList = "";
      if (progressPushed) detailsList += '<li><i class="fa-solid fa-upload"></i> ' + esc(t("auth.progressPushed", "进度上传")) + ': ' + progressPushed + '</li>';
      if (progressPulled) detailsList += '<li><i class="fa-solid fa-download"></i> ' + esc(t("auth.progressPulled", "进度下载")) + ': ' + progressPulled + '</li>';
      if (quizPushed) detailsList += '<li><i class="fa-solid fa-clipboard-question"></i> ' + esc(t("auth.quizPushed", "测验结果")) + ': ' + quizPushed + '</li>';
      if (bookmarksPushed) detailsList += '<li><i class="fa-solid fa-star-of-life"></i> ' + esc(t("auth.bookmarksPushed", "收藏上传")) + ': ' + bookmarksPushed + '</li>';
      if (bookmarksPulled) detailsList += '<li><i class="fa-solid fa-star-half-stroke"></i> ' + esc(t("auth.bookmarksPulled", "收藏下载")) + ': ' + bookmarksPulled + '</li>';
      if (bookmarksMerged) detailsList += '<li><i class="fa-solid fa-star"></i> ' + esc(t("auth.bookmarksMerged", "收藏已合并")) + ': ' + bookmarksMerged + '</li>';
      if (bookmarksDeletedPushed) detailsList += '<li><i class="fa-solid fa-trash-can"></i> ' + esc(t("auth.bookmarksDeletedSynced", "收藏删除已同步")) + ': ' + bookmarksDeletedPushed + '</li>';
      if (bookmarksRestored) detailsList += '<li><i class="fa-solid fa-arrow-rotate-left"></i> ' + esc(t("auth.bookmarksRestored", "收藏已恢复")) + ': ' + bookmarksRestored + '</li>';
      if (bookmarksConflictsResolved) detailsList += '<li><i class="fa-solid fa-code-merge"></i> ' + esc(t("auth.bookmarksConflictsResolved", "收藏冲突已处理")) + ': ' + bookmarksConflictsResolved + '</li>';
      if (wrongbookPushed) detailsList += '<li><i class="fa-solid fa-book-circle-arrow-up"></i> ' + esc(t("auth.wrongBookPushed", "错题上传")) + ': ' + wrongbookPushed + '</li>';
      if (wrongbookPulled) detailsList += '<li><i class="fa-solid fa-book-circle-arrow-down"></i> ' + esc(t("auth.wrongBookPulled", "错题下载")) + ': ' + wrongbookPulled + '</li>';
      if (wrongbookMerged) detailsList += '<li><i class="fa-solid fa-code-merge"></i> ' + esc(t("auth.wrongBookMerged", "错题已合并")) + ': ' + wrongbookMerged + '</li>';
      if (wrongbookSkipped) detailsList += '<li><i class="fa-solid fa-forward"></i> ' + esc(t("auth.wrongBookSkipped", "错题已跳过")) + ': ' + wrongbookSkipped + '</li>';
      if (retrySettingsPushed) detailsList += '<li><i class="fa-solid fa-sliders"></i> ' + esc(t("auth.wrongBookRetrySettingsPushed", "错题重练设置已上传")) + '</li>';
      if (retrySettingsPulled) detailsList += '<li><i class="fa-solid fa-sliders"></i> ' + esc(t("auth.wrongBookRetrySettingsPulled", "错题重练设置已下载")) + '</li>';
      if (retrySettingsMerged) detailsList += '<li><i class="fa-solid fa-sliders"></i> ' + esc(t("auth.wrongBookRetrySettingsMerged", "错题重练设置已合并")) + '</li>';
      if (retrySettingsFailed) detailsList += '<li><i class="fa-solid fa-triangle-exclamation"></i> ' + esc(t("auth.wrongBookRetrySettingsFailed", "错题重练设置同步失败")) + '</li>';
      if (typingPushed) detailsList += '<li><i class="fa-solid fa-keyboard"></i> ' + esc(t("auth.typingSessionsPushed", "打字练习上传")) + ': ' + typingPushed + '</li>';
      if (typingPulled) detailsList += '<li><i class="fa-solid fa-keyboard"></i> ' + esc(t("auth.typingSessionsPulled", "打字练习下载")) + ': ' + typingPulled + '</li>';
      if (examPushed) detailsList += '<li><i class="fa-solid fa-file-circle-check"></i> ' + esc(t("auth.examSessionsPushed", "考试记录上传")) + ': ' + examPushed + '</li>';
      if (examPulled) detailsList += '<li><i class="fa-solid fa-file-circle-check"></i> ' + esc(t("auth.examSessionsPulled", "考试记录下载")) + ': ' + examPulled + '</li>';
      if (conflictsResolved) detailsList += '<li><i class="fa-solid fa-code-merge"></i> ' + esc(t("auth.conflictsResolved", "已合并远端进度")) + ': ' + conflictsResolved + '</li>';

      summaryHtml =
        '<details class="auth-summary-details">' +
          '<summary><i class="fa-solid fa-circle-info"></i> ' + esc(t("auth.syncSummaryTitle", "本次同步摘要")) +
          (syncDuration ? ' (' + (syncDuration / 1000).toFixed(1) + 's)' : '') + '</summary>' +
          '<ul>' + detailsList + '</ul>' +
        '</details>';
    } else if (syncSummary && syncSummary.status === "error") {
      summaryHtml = '<div class="auth-notice sync-error"><i class="fa-solid fa-exclamation-circle"></i> ' + esc(t("auth.syncFailedDetail", "部分同步失败，请重试")) + '</div>';
    }

    // Sync summary details (collapsed)
    var syncDetailsHtml = "";
    if (hasSyncSummary && syncSummary.status === "success") {
      var detailsList = "";
      if (progressPushed) detailsList += '<li><i class="fa-solid fa-upload"></i> ' + esc(t("auth.progressPushed", "进度上传")) + ': ' + progressPushed + '</li>';
      if (progressPulled) detailsList += '<li><i class="fa-solid fa-download"></i> ' + esc(t("auth.progressPulled", "进度下载")) + ': ' + progressPulled + '</li>';
      if (quizPushed) detailsList += '<li><i class="fa-solid fa-clipboard-question"></i> ' + esc(t("auth.quizPushed", "测验结果")) + ': ' + quizPushed + '</li>';
      if (bookmarksPushed) detailsList += '<li><i class="fa-solid fa-star-of-life"></i> ' + esc(t("auth.bookmarksPushed", "收藏上传")) + ': ' + bookmarksPushed + '</li>';
      if (bookmarksPulled) detailsList += '<li><i class="fa-solid fa-star-half-stroke"></i> ' + esc(t("auth.bookmarksPulled", "收藏下载")) + ': ' + bookmarksPulled + '</li>';
      if (bookmarksMerged) detailsList += '<li><i class="fa-solid fa-star"></i> ' + esc(t("auth.bookmarksMerged", "收藏已合并")) + ': ' + bookmarksMerged + '</li>';
      if (wrongbookPushed) detailsList += '<li><i class="fa-solid fa-book-circle-arrow-up"></i> ' + esc(t("auth.wrongBookPushed", "错题上传")) + ': ' + wrongbookPushed + '</li>';
      if (wrongbookPulled) detailsList += '<li><i class="fa-solid fa-book-circle-arrow-down"></i> ' + esc(t("auth.wrongBookPulled", "错题下载")) + ': ' + wrongbookPulled + '</li>';
      if (wrongbookMerged) detailsList += '<li><i class="fa-solid fa-code-merge"></i> ' + esc(t("auth.wrongBookMerged", "错题已合并")) + ': ' + wrongbookMerged + '</li>';
      if (typingPushed) detailsList += '<li><i class="fa-solid fa-keyboard"></i> ' + esc(t("auth.typingSessionsPushed", "打字练习上传")) + ': ' + typingPushed + '</li>';
      if (typingPulled) detailsList += '<li><i class="fa-solid fa-keyboard"></i> ' + esc(t("auth.typingSessionsPulled", "打字练习下载")) + ': ' + typingPulled + '</li>';
      if (examPushed) detailsList += '<li><i class="fa-solid fa-file-circle-check"></i> ' + esc(t("auth.examSessionsPushed", "考试记录上传")) + ': ' + examPushed + '</li>';
      if (examPulled) detailsList += '<li><i class="fa-solid fa-file-circle-check"></i> ' + esc(t("auth.examSessionsPulled", "考试记录下载")) + ': ' + examPulled + '</li>';
      if (conflictsResolved) detailsList += '<li><i class="fa-solid fa-code-merge"></i> ' + esc(t("auth.conflictsResolved", "已合并远端进度")) + ': ' + conflictsResolved + '</li>';
      syncDetailsHtml =
        '<details class="auth-summary-details">' +
          '<summary><i class="fa-solid fa-circle-info"></i> ' + esc(t("auth.syncSummaryTitle", "同步摘要")) +
          (syncDuration ? ' (' + (syncDuration / 1000).toFixed(1) + 's)' : '') + '</summary>' +
          '<ul>' + detailsList + '</ul>' +
        '</details>';
    } else if (syncSummary && syncSummary.status === "error") {
      syncDetailsHtml = '<div class="auth-notice sync-error"><i class="fa-solid fa-exclamation-circle"></i> ' + esc(t("auth.syncFailedDetail", "部分同步失败，请重试")) + '</div>';
    }

    // Device info (collapsed)
    var deviceInfoHtml =
      '<details class="auth-device-details">' +
        '<summary class="auth-details-summary">' +
          '<i class="fa-solid fa-gears"></i> ' + esc(t("auth.deviceAndSyncDetails", "设备与同步详情")) +
        '</summary>' +
        '<div class="auth-info-grid">' +
          '<div class="auth-info-row">' +
            '<span class="auth-label">' + esc(t("auth.pendingSync", "待同步")) + ':</span>' +
            '<span class="auth-value">' + qSize + '</span>' +
          '</div>' +
          '<div class="auth-info-row">' +
            '<span class="auth-label">' + esc(t("auth.lastSync", "上次同步")) + ':</span>' +
            '<span class="auth-value">' + (lastSync ? esc(lastSync) : "—") + '</span>' +
          '</div>' +
          '<div class="auth-info-row">' +
            '<span class="auth-label">' + esc(t("auth.deviceId", "设备 ID")) + ':</span>' +
            '<span class="auth-value auth-device-id" title="' + esc(deviceId) + '">' + esc(deviceId ? deviceId.slice(0, 12) + "..." : "—") + '</span>' +
          '</div>' +
        '</div>' +
      '</details>';

    /* P15.2：同步区不再是含义模糊的折叠条——状态卡直接可见（真实状态模型），
       设备与同步明细保留在 details 内 */
    var syncSectionHtml =
      '<div class="auth-sync-section">' +
        '<div class="auth-sync-state-slot">' + syncStateCardHtml() + '</div>' +
        (syncMessage ? '<div class="auth-notice sync-message-notice"><i class="fa-solid fa-circle-info"></i> ' + esc(syncMessage) + '</div>' : '') +
        '<div class="auth-scope-note">' +
          '<i class="fa-solid fa-shield-halved" aria-hidden="true"></i> ' +
          esc(t("auth.syncScope", "只同步学习进度与设置")) + ' · ' + esc(t("auth.noAiKeyUpload", "AI 密钥不会上传")) +
        '</div>' +
        deviceInfoHtml +
        syncDetailsHtml +
      '</div>';

    var accountManagementHtml =
      '<details class="auth-account-management"' + (accountManagementOpen ? " open" : "") + '>' +
        '<summary class="auth-account-management-summary">' +
          '<i class="fa-solid fa-user-gear"></i> ' + esc(t("auth.accountManagement", "Account management")) +
        '</summary>' +
        '<div class="auth-account-management-body">' +
          '<div class="auth-field-hint auth-account-management-hint">' +
            esc(t("auth.accountManagementHint", "Update your display name or password.")) +
          '</div>' +
          '<div class="auth-profile-grid">' +
            '<div class="auth-profile-row">' +
              '<span class="auth-label">' + esc(t("auth.currentUsername", "Current username")) + '</span>' +
              '<strong class="auth-profile-value">' + esc(state.username || "—") + '</strong>' +
            '</div>' +
            '<div class="auth-profile-row">' +
              '<span class="auth-label">' + esc(t("auth.currentDisplayName", "Current display name")) + '</span>' +
              '<strong class="auth-profile-value">' + esc(accountLabel) + '</strong>' +
            '</div>' +
          '</div>' +
          '<div class="auth-management-block">' +
            '<label class="auth-management-label" for="auth-profile-display-name">' +
              esc(t("auth.displayName", "Display name")) +
            '</label>' +
            '<input id="auth-profile-display-name" class="auth-input" data-auth-input="profile-display-name" type="text" autocomplete="nickname" maxlength="32" value="' + esc(accountLabel) + '" placeholder="' + esc(t("auth.newDisplayName", "New display name")) + '">' +
            '<button class="auth-btn auth-btn-secondary" data-auth-action="save-display-name"' + (profileUpdateInProgress ? " disabled" : "") + '>' +
              '<i class="fa-solid fa-' + (profileUpdateInProgress ? "spinner fa-spin" : "floppy-disk") + '"></i> ' +
              esc(profileUpdateInProgress ? t("auth.saving", "Saving") : t("auth.saveDisplayName", "Save display name")) +
            '</button>' +
          '</div>' +
          '<div class="auth-management-block">' +
            '<div class="auth-management-label">' + esc(t("auth.changePassword", "Change password")) + '</div>' +
            '<input class="auth-input" data-auth-input="new-password" type="password" autocomplete="new-password" placeholder="' + esc(t("auth.newPassword", "New password")) + '">' +
            '<input class="auth-input" data-auth-input="confirm-new-password" type="password" autocomplete="new-password" placeholder="' + esc(t("auth.confirmNewPassword", "Confirm new password")) + '">' +
            '<div class="auth-field-hint">' + esc(t("auth.passwordKeepSafe", "Use a unique password and keep it safe.")) + '</div>' +
            '<button class="auth-btn auth-btn-secondary" data-auth-action="update-password"' + (passwordUpdateInProgress ? " disabled" : "") + '>' +
              '<i class="fa-solid fa-' + (passwordUpdateInProgress ? "spinner fa-spin" : "key") + '"></i> ' +
              esc(passwordUpdateInProgress ? t("auth.saving", "Saving") : t("auth.updatePassword", "Update password")) +
            '</button>' +
          '</div>' +
          '<div class="auth-username-readonly-note">' +
            '<i class="fa-solid fa-circle-info"></i>' +
            '<span>' + esc(t("auth.usernameReadonly", "Username cannot be changed yet.")) + ' ' +
              esc(t("auth.usernameChangeComingSoon", "Username changes will be available in a future version.")) + '</span>' +
          '</div>' +
        '</div>' +
      '</details>';

    var supabaseUnavailableNotice = !supabaseReady
      ? '<div class="auth-notice is-info auth-offline-note"><i class="fa-solid fa-cloud-slash"></i> <span>' +
          esc(getSupabaseStatusLabel()) + ' — ' + esc(t("auth.syncState.cloudUnavailableDesc", "当前无法连接同步服务。学习记录仍安全保存在本机，学习不受影响。")) +
        '</span></div>'
      : "";

    content.innerHTML =
      '<div class="auth-panel-header">' +
        '<div class="auth-panel-heading">' +
          '<h3 id="auth-panel-title">' + esc(t("auth.panelTitle", "账号与同步")) + '</h3>' +
          '<p class="auth-panel-subtitle">' + esc(t("auth.panelSubtitle", "登录后可在多设备同步学习进度与设置")) + '</p>' +
        '</div>' +
        '<button class="auth-panel-close-btn" data-auth-action="close" aria-label="' + esc(t("auth.close", "关闭")) + '" title="' + esc(t("auth.close", "关闭")) + '"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +
      '</div>' +
      '<div class="auth-panel-body">' +
        (isSupabaseUser
          ? // Logged in state
            '<div class="auth-panel-section auth-logged-in-section">' +
              '<div class="auth-user-display">' +
                '<i class="fa-solid fa-user-check"></i> ' +
                '<span class="auth-user-name">' + esc(accountLabel) + '</span>' +
                '<span class="auth-account-type">' + esc(accountTypeLabel) + '</span>' +
              '</div>' +
              '<div class="auth-btn-row" style="margin-top:12px">' +
                '<button class="auth-btn auth-btn-primary" data-auth-action="manual-sync"' + (canManualSync ? "" : " disabled") + '>' +
                  '<i class="fa-solid fa-rotate' + (syncInProgress ? " fa-spin" : "") + '"></i> ' +
                  esc(syncInProgress ? t("auth.syncingNow", "正在同步") : t("auth.syncNow", "立即同步")) +
                '</button>' +
                '<button class="auth-btn auth-btn-danger" data-auth-action="supabase-sign-out">' +
                  '<i class="fa-solid fa-sign-out-alt"></i> ' + esc(t("auth.signOut", "登出")) +
                '</button>' +
              '</div>' +
            '</div>' +
            '<div class="auth-message-slot"></div>' +
            accountManagementHtml +
            syncSectionHtml
          : // Not logged in state
            '<div class="auth-panel-section auth-login-section" aria-busy="false">' +
              '<div class="auth-tabs" role="tablist">' +
                '<button class="auth-tab' + (activeAuthTab === "login" ? " active" : "") + '" role="tab" data-auth-tab="login" aria-selected="' + (activeAuthTab === "login") + '">' +
                  '<i class="fa-solid fa-right-to-bracket"></i> ' + esc(t("auth.loginTitle", "登录")) +
                '</button>' +
                '<button class="auth-tab' + (activeAuthTab === "register" ? " active" : "") + '" role="tab" data-auth-tab="register" aria-selected="' + (activeAuthTab === "register") + '">' +
                  '<i class="fa-solid fa-user-plus"></i> ' + esc(t("auth.registerTitle", "创建账号")) +
                '</button>' +
              '</div>' +
              supabaseUnavailableNotice +

              '<div class="auth-tab-panel" data-auth-panel="login"' + (activeAuthTab === "login" ? "" : ' style="display:none"') + '>' +
                '<div class="auth-login-form">' +
                  fieldHtml({ id: "auth-login-username", input: "login-username", type: "text", autocomplete: "username", maxlength: 24,
                    label: t("auth.username", "用户名"),
                    hint: t("auth.noEmailRequiredDesc", "登录只需用户名和密码，无需邮箱。") }) +
                  fieldHtml({ id: "auth-login-password", input: "login-password", type: "password", autocomplete: "current-password",
                    label: t("auth.password", "密码") }) +
                  '<div class="auth-btn-row">' +
                    '<button class="auth-btn auth-btn-primary" data-auth-action="password-sign-in"' + (supabaseReady ? "" : " disabled") + '>' +
                      '<i class="fa-solid fa-right-to-bracket"></i> ' + esc(t("auth.loginButton", "登录")) +
                    '</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +

              '<div class="auth-tab-panel" data-auth-panel="register"' + (activeAuthTab === "register" ? "" : ' style="display:none"') + '>' +
                '<div class="auth-login-form">' +
                  fieldHtml({ id: "auth-reg-username", input: "reg-username", type: "text", autocomplete: "username", maxlength: 24,
                    label: t("auth.username", "用户名"),
                    hint: t("auth.usernamePlaceholder", "3-24 位字母、数字、下划线或连字符") }) +
                  fieldHtml({ id: "auth-reg-display-name", input: "reg-display-name", type: "text", autocomplete: "nickname", maxlength: 32, optional: true,
                    label: t("auth.displayName", "昵称"),
                    hint: t("auth.displayNameDefaultHint", "留空时使用用户名作为昵称") }) +
                  fieldHtml({ id: "auth-reg-password", input: "reg-password", type: "password", autocomplete: "new-password",
                    label: t("auth.password", "密码"),
                    hint: t("auth.passwordRuleHint", "至少 6 位；建议使用独立密码并妥善保管") }) +
                  fieldHtml({ id: "auth-reg-confirm-password", input: "reg-confirm-password", type: "password", autocomplete: "new-password",
                    label: t("auth.confirmPassword", "确认密码") }) +
                  '<div class="auth-btn-row">' +
                    '<button class="auth-btn auth-btn-primary" data-auth-action="register"' + (supabaseReady ? "" : " disabled") + '>' +
                      '<i class="fa-solid fa-user-plus"></i> ' + esc(t("auth.createAccountButton", "创建账号")) +
                    '</button>' +
                  '</div>' +
                  '<div class="auth-field-hint"><i class="fa-solid fa-envelope-circle-check"></i> ' +
                    esc(t("auth.noEmailRequired", "无需邮箱")) + ' — ' + esc(t("auth.noEmailRequiredDesc", "只需用户名和密码。")) +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="auth-message-slot"></div>' +
            syncSectionHtml
          ) +
      '</div>';

    content.setAttribute("data-i18n-managed", "static");
    bindAuthPanelActions(content);
    if (authMessage) setAuthNotice(authMessage, authMessageKind);
  }

  function bindAuthPanelActions(content) {
    var closeButton = qs('[data-auth-action="close"]', content);
    var signInButton = qs('[data-auth-action="sign-in"]', content);
    var signOutButton = qs('[data-auth-action="sign-out"]', content);
    var exportButton = qs('[data-auth-action="export"]', content);
    var localButton = qs('[data-auth-action="local"]', content);
    var passwordButton = qs('[data-auth-action="password-sign-in"]', content);
    var registerButton = qs('[data-auth-action="register"]', content);
    var supabaseSignOutButton = qs('[data-auth-action="supabase-sign-out"]', content);
    var manualSyncButton = qs('[data-auth-action="manual-sync"]', content);
    var saveDisplayNameButton = qs('[data-auth-action="save-display-name"]', content);
    var updatePasswordButton = qs('[data-auth-action="update-password"]', content);
    var accountManagementDetails = qs(".auth-account-management", content);

    if (closeButton) closeButton.addEventListener("click", closeAuthPanel);
    if (signInButton) {
      signInButton.addEventListener("click", function () {
        setMockSignedInUser({ display_name: t("auth.account", "模拟用户") });
      });
    }
    if (signOutButton) signOutButton.addEventListener("click", setAnonymousMode);
    if (exportButton) exportButton.addEventListener("click", exportSnapshotAction);
    if (localButton) localButton.addEventListener("click", setAnonymousMode);
    if (passwordButton) passwordButton.addEventListener("click", handlePasswordSignIn);
    if (registerButton) registerButton.addEventListener("click", handleRegister);
    if (supabaseSignOutButton) supabaseSignOutButton.addEventListener("click", handleSupabaseSignOut);
    if (manualSyncButton) manualSyncButton.addEventListener("click", handleManualSync);
    if (saveDisplayNameButton) saveDisplayNameButton.addEventListener("click", handleDisplayNameUpdate);
    if (updatePasswordButton) updatePasswordButton.addEventListener("click", handlePasswordUpdate);
    if (accountManagementDetails) {
      accountManagementDetails.addEventListener("toggle", function () {
        accountManagementOpen = accountManagementDetails.open;
      });
    }

    // Tab switching
    var tabs = content.querySelectorAll("[data-auth-tab]");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        if (authFlowState !== "idle") return; // 请求进行中不允许切换（防状态错乱）
        var target = tab.getAttribute("data-auth-tab");
        activeAuthTab = target;
        tabs.forEach(function (t2) {
          t2.classList.remove("active");
          t2.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        var panels = content.querySelectorAll("[data-auth-panel]");
        panels.forEach(function (p) {
          p.style.display = p.getAttribute("data-auth-panel") === target ? "block" : "none";
        });
        clearFieldErrors();
        setAuthNotice("", "info");
      });
    });

    // P15.2：密码显示/隐藏
    content.querySelectorAll("[data-pw-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var input = el(btn.getAttribute("data-pw-toggle"));
        if (!input) return;
        var show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.setAttribute("aria-pressed", String(show));
        btn.setAttribute("aria-label", show ? t("auth.hidePassword", "隐藏密码") : t("auth.showPassword", "显示密码"));
        var icon = btn.querySelector("i");
        if (icon) icon.className = show ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
        input.focus();
      });
    });

    // P15.2：同步状态卡动作（manual-sync / retry-cloud）
    content.querySelectorAll(".auth-sync-state__action").forEach(function (btn) {
      btn.addEventListener("click", handleSyncStateAction);
    });

    // Enter 提交（登录/注册表单内）
    content.querySelectorAll(".auth-login-form input").forEach(function (input) {
      input.addEventListener("keydown", function (event) {
        if (event.key !== "Enter") return;
        event.preventDefault();
        var panelName = input.closest("[data-auth-panel]");
        if (!panelName) return;
        if (panelName.getAttribute("data-auth-panel") === "login") handlePasswordSignIn();
        else handleRegister();
      });
    });
  }

  function getAuthInput(name) {
    var input = qs('[data-auth-input="' + name + '"]', el("auth-panel-content"));
    return input ? input.value.trim() : "";
  }

  function refreshAuthPanel(message) {
    authMessage = message || "";
    if (panelVisible) populateAuthPanel(el("auth-panel"), "auth-message");
  }

  function normalizeUsername(username) {
    if (window.StudySupabase && typeof window.StudySupabase.normalizeUsername === "function") {
      return window.StudySupabase.normalizeUsername(username);
    }
    return String(username || "").trim().toLowerCase();
  }

  function validateUsername(username) {
    var normalized = normalizeUsername(username);
    if (!normalized) return t("auth.usernameRequired", "请输入用户名");
    if (normalized.length < 3) return t("auth.usernameTooShort", "用户名至少 3 位");
    if (normalized.length > 24) return t("auth.usernameTooLong", "用户名最多 24 位");
    if (!/^[a-z0-9_-]+$/.test(normalized)) {
      return t("auth.usernameInvalid", "用户名只能包含字母、数字、下划线和连字符");
    }
    return "";
  }

  async function handlePasswordSignIn() {
    if (authFlowState !== "idle") return; // in-flight 锁：禁止重复提交
    clearFieldErrors();
    setAuthNotice("", "info");
    var content = el("auth-panel-content");
    var username = getAuthInput("login-username");
    var passwordInput = qs('[data-auth-input="login-password"]', content);
    var password = passwordInput ? passwordInput.value : "";
    var usernameError = validateUsername(username);
    if (usernameError) return setFieldError("login-username", usernameError);
    if (!password) return setFieldError("login-password", t("auth.passwordRequired", "请输入密码"));
    if (!window.StudySupabase) return setAuthNotice(t("auth.sdkMissing", "SDK 未加载"), "error");

    setFlowState("loggingIn");
    try {
      var result = await window.StudySupabase.signInWithUsername(username, password);
      password = "";
      if (passwordInput) passwordInput.value = "";
      if (result && result.error) {
        setFlowState("idle");
        setAuthNotice(friendlyAuthError(result.error, "login"), "error");
        return;
      }
      if (result && result.data && result.data.user) {
        authFlowState = "idle";
        authMessage = t("auth.loginSuccess", "登录成功");
        authMessageKind = "success";
        setSupabaseSignedInUser(result.data.user); // 触发登录态全量重绘（含成功通知）
      } else {
        setFlowState("idle");
        setAuthNotice(t("auth.loginFailed", "登录失败"), "error");
      }
    } catch (error) {
      setFlowState("idle");
      setAuthNotice(t("auth.loginFailed", "登录失败") + (error && error.message ? ": " + error.message : ""), "error");
    }
  }

  async function handleRegister() {
    if (authFlowState !== "idle") return; // in-flight 锁：禁止重复提交
    clearFieldErrors();
    setAuthNotice("", "info");
    var content = el("auth-panel-content");
    var username = getAuthInput("reg-username");
    var displayName = getAuthInput("reg-display-name");
    var pwInput = qs('[data-auth-input="reg-password"]', content);
    var cpInput = qs('[data-auth-input="reg-confirm-password"]', content);
    var password = pwInput ? pwInput.value : "";
    var confirmPassword = cpInput ? cpInput.value : "";

    var usernameError = validateUsername(username);
    if (usernameError) return setFieldError("reg-username", usernameError);
    if (displayName && displayName.length > 32) return setFieldError("reg-display-name", t("auth.displayNameTooLong", "昵称最多 32 个字符"));
    if (!password) return setFieldError("reg-password", t("auth.passwordRequired", "请输入密码"));
    if (password.length < 6) return setFieldError("reg-password", t("auth.passwordTooShort", "密码至少 6 位"));
    if (password !== confirmPassword) return setFieldError("reg-confirm-password", t("auth.passwordMismatch", "两次密码不一致"));
    if (!window.StudySupabase) return setAuthNotice(t("auth.sdkMissing", "SDK 未加载"), "error");

    username = normalizeUsername(username);
    displayName = displayName || username;
    setFlowState("registering");
    try {
      var result = await window.StudySupabase.signUpWithUsername(username, password, displayName);
      password = ""; confirmPassword = "";
      if (pwInput) pwInput.value = "";
      if (cpInput) cpInput.value = "";

      if (result && result.error) {
        setFlowState("idle");
        setAuthNotice(friendlyAuthError(result.error, "register"), "error");
        return;
      }
      if (result && result.data && result.data.user) {
        var session = result.data.session;
        if (session) {
          authFlowState = "idle";
          authMessage = t("auth.registerSuccess", "注册成功");
          authMessageKind = "success";
          setSupabaseSignedInUser(result.data.user, displayName);
        } else {
          setFlowState("idle");
          setAuthNotice(t("auth.emailConfirmationUsernameWarning", "账号已创建，但项目启用了邮箱确认。用户名账号无法接收确认邮件，请管理员关闭邮箱确认，或使用现有测试账号。"), "error");
        }
      } else {
        setFlowState("idle");
        setAuthNotice(t("auth.registerFailed", "注册失败"), "error");
      }
    } catch (error) {
      setFlowState("idle");
      setAuthNotice(t("auth.registerFailed", "注册失败") + (error && error.message ? ": " + error.message : ""), "error");
    }
  }

  function friendlyAuthError(error, action) {
    if (!error) return action === "login"
      ? t("auth.usernameOrPasswordWrong", "用户名或密码不正确")
      : t("auth.registerFailed", "注册失败");
    var msg = error.message || "";
    var code = error.code || "";
    /* P15.2：网络级失败如实归类为云不可用——不得误导为"密码不正确" */
    if (/failed to fetch|networkerror|load failed|fetch failed|network request failed|ERR_NAME_NOT_RESOLVED|ERR_INTERNET/i.test(msg) || code === "network_error") {
      return t("auth.syncState.cloudUnavailableTitle", "云同步不可用") + " — " + t("auth.syncState.cloudUnavailableDesc", "当前无法连接同步服务。学习记录仍安全保存在本机，学习不受影响。");
    }
    if (/invalid login credentials/i.test(msg)) return t("auth.usernameOrPasswordWrong", "用户名或密码不正确");
    if (/email not confirmed/i.test(msg)) return t("auth.emailConfirmationUsernameWarning", "项目启用了邮箱确认，用户名账号当前无法完成确认。");
    if (/user already registered/i.test(msg) || /already registered/i.test(msg)) return t("auth.usernameTaken", "该用户名已被使用");
    if (/password.*short/i.test(msg)) return t("auth.passwordTooShort", "密码至少 6 位");
    if (/too many requests/i.test(msg)) return t("auth.tooManyRequests", "请求过于频繁，请稍后再试");
    if (action === "register" && (
      /signup_disabled|email_address_invalid|email_provider_disabled|email_send/i.test(code) ||
      /signups?.*disabled|email address.*invalid|confirmation email/i.test(msg)
    )) {
      return t("auth.usernameRegistrationUnavailable", "当前无法创建用户名账号，请检查 Supabase 的注册与邮箱确认设置。");
    }
    return action === "login"
      ? t("auth.usernameOrPasswordWrong", "用户名或密码不正确")
      : t("auth.usernameRegistrationUnavailable", "当前无法创建用户名账号，请检查 Supabase 的注册与邮箱确认设置。");
  }

  async function handleDisplayNameUpdate() {
    if (profileUpdateInProgress || !window.StudySupabase) return;
    accountManagementOpen = true;
    var displayName = getAuthInput("profile-display-name");
    if (!displayName) return refreshAuthPanel(t("auth.displayNameRequired", "Please enter a display name"));
    if (displayName.length > 32) return refreshAuthPanel(t("auth.displayNameTooLong", "Display name must be no more than 32 characters"));
    profileUpdateInProgress = true;
    populateAuthPanel(el("auth-panel"), "profile-update-start");
    try {
      var result = await window.StudySupabase.updateProfileMetadata({
        display_name: displayName,
        nickname: displayName
      });
      if (result && result.error) {
        authMessage = t("auth.displayNameUpdateFailed", "Display name update failed");
      } else if (result && result.data && result.data.user) {
        setSupabaseSignedInUser(result.data.user, displayName);
        authMessage = t("auth.displayNameUpdated", "Display name updated");
      }
    } catch (_) {
      authMessage = t("auth.displayNameUpdateFailed", "Display name update failed");
    } finally {
      profileUpdateInProgress = false;
      if (panelVisible) populateAuthPanel(el("auth-panel"), "profile-update-finished");
    }
  }

  async function handlePasswordUpdate() {
    if (passwordUpdateInProgress || !window.StudySupabase) return;
    accountManagementOpen = true;
    var passwordInput = qs('[data-auth-input="new-password"]', el("auth-panel-content"));
    var confirmInput = qs('[data-auth-input="confirm-new-password"]', el("auth-panel-content"));
    var newPassword = passwordInput ? passwordInput.value : "";
    var confirmPassword = confirmInput ? confirmInput.value : "";
    if (!newPassword) return refreshAuthPanel(t("auth.passwordRequired", "Please enter a password"));
    if (newPassword.length < 6) return refreshAuthPanel(t("auth.passwordTooShort", "Password must be at least 6 characters"));
    if (newPassword !== confirmPassword) return refreshAuthPanel(t("auth.passwordMismatch", "Passwords do not match"));
    passwordUpdateInProgress = true;
    if (passwordInput) passwordInput.value = "";
    if (confirmInput) confirmInput.value = "";
    populateAuthPanel(el("auth-panel"), "password-update-start");
    try {
      var result = await window.StudySupabase.updatePassword(newPassword);
      newPassword = "";
      confirmPassword = "";
      if (result && result.error) {
        authMessage = t("auth.passwordUpdateFailed", "Password update failed");
      } else {
        authMessage = t("auth.passwordUpdated", "Password updated. Keep it safe.");
        try {
          var currentUser = await window.StudySupabase.getCurrentUser();
          if (currentUser && currentUser.id) {
            setSupabaseSignedInUser(currentUser);
          } else {
            authMessage = t("auth.passwordUpdatedPleaseSignIn", "Password updated. Please sign in again.");
            setAnonymousMode();
          }
        } catch (_) {
          // session check failed — keep original success message
        }
      }
    } catch (_) {
      newPassword = "";
      confirmPassword = "";
      authMessage = t("auth.passwordUpdateFailed", "Password update failed");
    } finally {
      passwordUpdateInProgress = false;
      if (panelVisible) populateAuthPanel(el("auth-panel"), "password-update-finished");
    }
  }

  async function handleSupabaseSignOut() {
    var result = await window.StudySupabase.signOut();
    if (result && result.error) return refreshAuthPanel(result.error.message);
    setAnonymousMode();
  }

  async function handleManualSync() {
    if (syncInProgress || !window.StudySync || typeof window.StudySync.runManualSync !== "function") return;
    syncInProgress = true;
    syncMessage = t("auth.syncingNow", "正在同步");
    populateAuthPanel(el("auth-panel"), "sync-start");
    try {
      var result = await window.StudySync.runManualSync();
      syncMessage = result && result.ok
        ? t("auth.syncSuccess", "同步成功")
        : t("auth.syncFailed", "同步失败") + ": " +
          (result && result.error ? result.error.message : "Unknown error");
    } catch (error) {
      syncMessage = t("auth.syncFailed", "同步失败") + ": " + (error.message || "Unknown error");
    } finally {
      syncInProgress = false;
      if (panelVisible) populateAuthPanel(el("auth-panel"), "sync-finished");
    }
  }

  async function initSupabaseAuth() {
    var api = await ensureSupabaseAdapter();
    if (!api) return;
    if (api.getStatus().code === "ready_to_initialize") api.initClient();
    if (!api.getStatus().ready) return;
    var user = await api.getCurrentUser();
    if (user) setSupabaseSignedInUser(user);
    if (!authSubscription) {
      var listener = api.onAuthStateChange(function (event, session) {
        if (session && session.user) setSupabaseSignedInUser(session.user);
        else if (event === "SIGNED_OUT") setAnonymousMode();
      });
      authSubscription = listener && listener.data ? listener.data.subscription : null;
    }
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
    userBtn.setAttribute("title", t("auth.panelTitle", "账号与同步"));
    userBtn.setAttribute("aria-haspopup", "dialog");
    userBtn.addEventListener("click", function () {
      openAuthPanel();
    });

    userBtn.innerHTML =
      '<span class="auth-user-icon"><i class="fa-solid fa-' + (isAnonymous ? "user" : "user-check") + '"></i></span>' +
      '<span class="auth-user-label">' + esc(isAnonymous ? t("auth.localMode", "本地模式") : getDisplayUserLabel()) + '</span>';

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
    initSupabaseAuth();

    // Listen for language change events to support instant (秒切) translation updates
    document.addEventListener("i18n:languageChanged", function () {
      renderUserMenu();
      if (panelVisible) {
        var panel = el("auth-panel");
        if (panel) populateAuthPanel(panel, "language-change");
      }
    });
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
