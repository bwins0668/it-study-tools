/**
 * Study Tools Dashboard - Round 26.0 MVP
 *
 * Read-only learning statistics from localStorage & sync status.
 * Zero writes. All reads try/catch-protected.
 */
(function () {
  "use strict";

  /* ── Safe localStorage reader ────────────────────── */
  function safeRead(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (_) { return fallback; }
  }

  function safeArr(key) { return safeRead(key, []); }
  function safeObj(key) { return safeRead(key, {}); }

  /* ── Helpers ─────────────────────────────────────── */
  function nowISO() { return new Date().toISOString(); }
  function fmtDate(iso) {
    if (!iso) return null;
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return null;
      return d.toLocaleDateString(void 0, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch (_) { return null; }
  }
  function fmtAgo(iso) {
    if (!iso) return null;
    try {
      var diff = Date.now() - new Date(iso).getTime();
      if (diff < 0) return null;
      var mins = Math.floor(diff / 60000);
      if (mins < 1) return "just now";
      if (mins < 60) return mins + "m ago";
      var hours = Math.floor(mins / 60);
      if (hours < 24) return hours + "h ago";
      var days = Math.floor(hours / 24);
      return days + "d ago";
    } catch (_) { return null; }
  }

  /* ── Data collectors ─────────────────────────────── */

  /** Count completed lessons per subject */
  function getCourseStats() {
    var subjects = ["sql", "itpass", "sg", "java", "python"];
    var keys = {
      sql: "sql_hub_completed",
      itpass: "itpass_completed_lessons",
      sg: "sg_completed_lessons",
      java: "java_completed_lessons",
      python: "python_completed_lessons"
    };
    var result = {};
    var total = 0;
    subjects.forEach(function (subj) {
      var arr = safeArr(keys[subj]);
      result[subj] = Array.isArray(arr) ? arr.length : 0;
      total += result[subj];
    });
    result.total = total;
    return result;
  }

  /** Count quiz completions across all subjects */
  function getQuizStats() {
    var subjects = ["sql", "itpass", "sg", "java", "python"];
    var totalQuizCompletions = 0;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (!key) continue;
        // Match pattern: {subject}_quiz_completed_{id}
        var match = key.match(/^(sql|itpass|sg|java|python)_quiz_completed_(\d+)$/);
        if (match) {
          var indices = safeArr(key);
          if (indices.length > 0) totalQuizCompletions++;
        }
      }
    } catch (_) {}
    return { totalQuizCompletions: totalQuizCompletions };
  }

  /** Wrong book stats */
  function getWrongBookStats() {
    var items = safeArr("study-tools-exam-wrong-book-v1");
    var count = Array.isArray(items) ? items.length : 0;
    // Find latest item
    var latest = null;
    if (count > 0) {
      try {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (!item) continue;
          var at = item.updatedAt || item.addedAt;
          if (at && (!latest || at > latest)) latest = at;
        }
      } catch (_) {}
    }
    return { count: count, latestAt: latest || null };
  }

  /** Bookmarks / favorites stats */
  function getBookmarkStats() {
    // Typing bookmarks (sync)
    var typingBm = safeObj("study-tools-typing-bookmarks-sync-v1");
    var typingBmCount = 0;
    if (typingBm && typingBm.items) {
      try {
        typingBmCount = typingBm.items.filter(function (x) { return x && !x.deleted_at; }).length;
      } catch (_) {}
    }
    // Japanese typing favorites
    var jpTyping = safeObj("study-tools-japanese-typing-v1");
    var jpFavCount = 0;
    if (jpTyping && Array.isArray(jpTyping.favorites)) {
      jpFavCount = jpTyping.favorites.length;
    }
    return { typingBookmarks: typingBmCount, japaneseFavorites: jpFavCount, total: typingBmCount + jpFavCount };
  }

  /** Exam history stats */
  function getExamStats() {
    var history = safeArr("study-tools-exam-history-v1");
    if (!Array.isArray(history) || history.length === 0) {
      return { count: 0, avgAccuracy: null, latestAt: null };
    }
    var total = history.length;
    var sumAcc = 0;
    var accCount = 0;
    var latest = null;
    try {
      for (var i = 0; i < history.length; i++) {
        var h = history[i];
        if (!h) continue;
        if (typeof h.accuracy === "number") { sumAcc += h.accuracy; accCount++; }
        var at = h.startedAt || h.completedAt;
        if (at && (!latest || at > latest)) latest = at;
      }
    } catch (_) {}
    return {
      count: total,
      avgAccuracy: accCount > 0 ? Math.round(sumAcc / accCount) : null,
      latestAt: latest || null
    };
  }

  /** Typing practice stats */
  function getTypingStats() {
    // Japanese typing
    var jp = safeObj("study-tools-japanese-typing-v1");
    var jpHistory = (jp && Array.isArray(jp.history)) ? jp.history : [];
    var jpLatest = null;
    if (jpHistory.length > 0) {
      try {
        for (var i = 0; i < jpHistory.length; i++) {
          var jh = jpHistory[i];
          if (!jh) continue;
          var at = jh.completedAt || jh.date;
          if (at && (!jpLatest || at > jpLatest)) jpLatest = at;
        }
      } catch (_) {}
    }

    // Coding typing
    var ctHistory = safeArr("study-tools-coding-typing-history-v1");
    var ctCount = Array.isArray(ctHistory) ? ctHistory.length : 0;
    var ctLatest = null;
    var ctSumCpm = 0, ctSumAcc = 0, ctBestCpm = 0;
    if (ctCount > 0) {
      try {
        for (var j = 0; j < ctHistory.length; j++) {
          var ct = ctHistory[j];
          if (!ct) continue;
          if (ct.completedAt && (!ctLatest || ct.completedAt > ctLatest)) ctLatest = ct.completedAt;
          ctSumCpm += ct.cpm || 0;
          ctSumAcc += ct.accuracy || 0;
          if ((ct.cpm || 0) > ctBestCpm) ctBestCpm = ct.cpm || 0;
        }
      } catch (_) {}
    }

    return {
      japaneseCount: jpHistory.length,
      japaneseLatest: jpLatest,
      codingCount: ctCount,
      codingLatest: ctLatest,
      codingAvgCpm: ctCount > 0 ? Math.round(ctSumCpm / ctCount) : null,
      codingAvgAcc: ctCount > 0 ? Math.round(ctSumAcc / ctCount) : null,
      codingBestCpm: ctBestCpm > 0 ? ctBestCpm : null,
      totalTyping: jpHistory.length + ctCount
    };
  }

  /** Sync status */
  function getSyncStatus() {
    var lastAt = safeRead("study_tools_last_sync_at", null);
    var result = safeRead("study_tools_last_sync_result", null);
    var enabled = safeRead("study_tools_sync_enabled", false);

    // Login check
    var loggedIn = false;
    try {
      if (window.StudySupabase && typeof window.StudySupabase.getCurrentUser === "function") {
        var user = window.StudySupabase.getCurrentUser();
        loggedIn = !!(user && user.id);
      }
    } catch (_) {}

    // Parse last sync result summary
    var summary = null;
    if (result && result.ok !== undefined) {
      summary = { success: result.ok, message: "" };
      if (result.data) {
        var d = result.data;
        var parts = [];
        if (typeof d.typing_sessions_pushed === "number") parts.push("Typing\u2191" + d.typing_sessions_pushed);
        if (typeof d.typing_sessions_pulled === "number") parts.push("Typing\u2193" + d.typing_sessions_pulled);
        if (typeof d.exam_sessions_pushed === "number") parts.push("Exam\u2191" + d.exam_sessions_pushed);
        if (typeof d.exam_sessions_pulled === "number") parts.push("Exam\u2193" + d.exam_sessions_pulled);
        if (typeof d.progress_pushed === "number") parts.push("Progress\u2191" + d.progress_pushed);
        summary.message = parts.join(" ");
      } else if (result.error) {
        summary.message = result.error.message || "Error";
      }
    }

    return {
      loggedIn: loggedIn,
      syncEnabled: enabled,
      lastSyncAt: lastAt,
      lastSyncResult: summary
    };
  }

  /* ── Build complete dashboard data ───────────────── */
  function buildDashboardData() {
    var courses = getCourseStats();
    var quizzes = getQuizStats();
    var wrongBook = getWrongBookStats();
    var bookmarks = getBookmarkStats();
    var exams = getExamStats();
    var typing = getTypingStats();
    var sync = getSyncStatus();

    return {
      collectedAt: nowISO(),
      courses: courses,
      quizzes: quizzes,
      wrongBook: wrongBook,
      bookmarks: bookmarks,
      exams: exams,
      typing: typing,
      sync: sync
    };
  }

  /* ── i18n helper (mirrors app pattern) ──────────── */
  function DT(k, fallback) {
    if (window.I18n && I18n.t) {
      var v = I18n.t("dashboard." + k);
      if (v && v !== "dashboard." + k) return v;
    }
    try {
      var lang = document.documentElement.lang || "zh-Hans";
      var dict = window.I18nUiDict;
      if (dict && dict[lang] && dict[lang].dashboard && dict[lang].dashboard[k]) return dict[lang].dashboard[k];
      if (dict && dict["ja-JP"] && dict["ja-JP"].dashboard && dict["ja-JP"].dashboard[k]) return dict["ja-JP"].dashboard[k];
      if (dict && dict["zh-CN"] && dict["zh-CN"].dashboard && dict["zh-CN"].dashboard[k]) return dict["zh-CN"].dashboard[k];
    } catch (_) {}
    return fallback || k;
  }

  function esc(s) { return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* ── Render ──────────────────────────────────────── */
  function renderStatCard(label, value, sub) {
    sub = sub || "";
    return '<div class="db-stat-card">' +
      '<span class="db-stat-value">' + esc(value) + '</span>' +
      '<span class="db-stat-label">' + esc(label) + '</span>' +
      (sub ? '<span class="db-stat-sub">' + esc(sub) + '</span>' : '') +
      '</div>';
  }

  function renderModuleRow(name, count) {
    return '<div class="db-module-row">' +
      '<span class="db-module-name">' + esc(name) + '</span>' +
      '<div class="db-module-bar-wrap"><div class="db-module-bar" style="width:' + Math.min(count * 8, 100) + '%"></div></div>' +
      '<span class="db-module-count">' + count + '</span>' +
      '</div>';
  }

  function renderDashboard(data) {
    var d = data;

    // Pick descriptions based on language
    var lang = (document.documentElement.lang || "zh-Hans");
    var nbsp = "\u00A0";

    function noData() { return '<span class="db-no-data">' + DT("noData", "\u6682\u65E0\u6570\u636E") + '</span>'; }

    var html = "";

    /* ── Section 1: Overview ──────────────────────── */
    html += '<div class="db-section">';
    html += '<h3 class="db-section-title">' + DT("overview", "\u603B\u89C8") + '</h3>';
    html += '<div class="db-stat-grid">';
    html += renderStatCard(DT("completedLessons", "\u5DF2\u5B8C\u6210\u8BFE\u7A0B"), d.courses.total);
    html += renderStatCard(DT("wrongBook", "\u9519\u9898"), d.wrongBook.count);
    html += renderStatCard(DT("bookmarks", "\u6536\u85CF"), d.bookmarks.total);
    html += renderStatCard(DT("typingPractice", "\u6253\u5B57\u7EC3\u4E60"), d.typing.totalTyping);
    html += renderStatCard(DT("examHistory", "\u6A21\u62DF\u8003\u8BD5"), d.exams.count);
    html += renderStatCard(DT("quizCompleted", "\u6D4B\u9A8C\u5B8C\u6210"), d.quizzes.totalQuizCompletions);
    html += '</div>';
    html += '</div>';

    /* ── Section 2: Learning Progress ─────────────── */
    html += '<div class="db-section">';
    html += '<h3 class="db-section-title">' + DT("learningProgress", "\u5B66\u4E60\u8FDB\u5EA6") + '</h3>';
    html += '<div class="db-module-list">';
    html += renderModuleRow("SQL", d.courses.sql);
    html += renderModuleRow("Java", d.courses.java);
    html += renderModuleRow("Python", d.courses.python);
    html += renderModuleRow("IT Passport", d.courses.itpass);
    html += renderModuleRow("SG (" + DT("infoSec", "\u60C5\u5831\u30BB\u30AD\u30E5\u30EA\u30C6\u30A3") + ")", d.courses.sg);
    html += '</div>';
    html += '</div>';

    /* ── Section 3: Wrong Book & Bookmarks ────────── */
    html += '<div class="db-section">';
    html += '<h3 class="db-section-title">' + DT("wrongBookAndBookmarks", "\u9519\u9898\u4E0E\u6536\u85CF") + '</h3>';
    html += '<div class="db-stat-grid db-stat-grid--2">';

    var wbSub = d.wrongBook.latestAt ? DT("latestAdded", "\u6700\u65B0\u6DFB\u52A0") + ": " + fmtDate(d.wrongBook.latestAt) : "";
    html += renderStatCard(DT("wrongBookCount", "\u9519\u9898\u6570"), d.wrongBook.count, wbSub);

    var bmSub = "";
    if (d.bookmarks.typingBookmarks > 0) bmSub += DT("typingArticles", "\u6253\u5B57\u6587\u7AE0") + ":" + d.bookmarks.typingBookmarks + " ";
    if (d.bookmarks.japaneseFavorites > 0) bmSub += DT("japaneseFavorites", "\u65E5\u8BED\u6536\u85CF") + ":" + d.bookmarks.japaneseFavorites;
    html += renderStatCard(DT("bookmarkCount", "\u6536\u85CF\u6570"), d.bookmarks.total, bmSub);
    html += '</div>';
    html += '</div>';

    /* ── Section 4: Quiz & Exam ───────────────────── */
    html += '<div class="db-section">';
    html += '<h3 class="db-section-title">' + DT("quizAndExam", "\u6D4B\u9A8C\u4E0E\u8003\u8BD5") + '</h3>';
    html += '<div class="db-stat-grid db-stat-grid--3">';
    html += renderStatCard(DT("examCount", "\u6A21\u62DF\u8003\u8BD5\u6B21\u6570"), d.exams.count);

    var accText = d.exams.avgAccuracy !== null ? d.exams.avgAccuracy + "%" : noData();
    html += renderStatCard(DT("avgAccuracy", "\u5E73\u5747\u6B63\u786E\u7387"), accText);

    var examSub = d.exams.latestAt ? fmtDate(d.exams.latestAt) : noData();
    html += renderStatCard(DT("latestExam", "\u6700\u8FD1\u8003\u8BD5"), "", examSub);
    html += '</div>';
    html += '</div>';

    /* ── Section 5: Typing Practice ───────────────── */
    html += '<div class="db-section">';
    html += '<h3 class="db-section-title">' + DT("typingPractice", "\u6253\u5B57\u7EC3\u4E60") + '</h3>';
    html += '<div class="db-stat-grid db-stat-grid--2">';

    var jpSub = d.typing.japaneseLatest ? fmtDate(d.typing.japaneseLatest) : noData();
    html += renderStatCard(DT("japaneseTyping", "\u65E5\u8BED\u6253\u5B57"), d.typing.japaneseCount, jpSub);

    var ctSub = [];
    if (d.typing.codingLatest) ctSub.push(fmtDate(d.typing.codingLatest));
    if (d.typing.codingAvgCpm) ctSub.push("avg " + d.typing.codingAvgCpm + " CPM");
    html += renderStatCard(DT("codingTyping", "\u7F16\u7A0B\u6253\u5B57"), d.typing.codingCount, ctSub.join(" " + nbsp + "\u00B7" + nbsp + " "));
    html += '</div>';

    if (d.typing.codingBestCpm) {
      html += '<div class="db-extra-row">';
      html += '<span class="db-extra-label">' + DT("bestCpm", "\u6700\u9AD8 CPM") + ':</span>';
      html += '<strong>' + d.typing.codingBestCpm + '</strong>';
      html += '</div>';
    }
    html += '</div>';

    /* ── Section 6: Sync Status ───────────────────── */
    html += '<div class="db-section">';
    html += '<h3 class="db-section-title">' + DT("syncStatus", "\u540C\u6B65\u72B6\u6001") + '</h3>';
    html += '<div class="db-sync-status">';

    // Login status
    var loginClass = d.sync.loggedIn ? "db-status-ok" : "db-status-off";
    var loginText = d.sync.loggedIn ? DT("loggedIn", "\u5DF2\u767B\u5F55") : DT("notLoggedIn", "\u672A\u767B\u5F55");
    html += '<div class="db-sync-row"><span>' + DT("loginStatus", "\u767B\u5F55\u72B6\u6001") + '</span><span class="' + loginClass + '">' + loginText + '</span></div>';

    // Last sync
    var syncAgo = d.sync.lastSyncAt ? fmtAgo(d.sync.lastSyncAt) : null;
    var syncDate = d.sync.lastSyncAt ? fmtDate(d.sync.lastSyncAt) : null;
    html += '<div class="db-sync-row"><span>' + DT("lastSync", "\u4E0A\u6B21\u540C\u6B65") + '</span><span>' + (syncAgo || syncDate || noData()) + '</span></div>';

    // Sync result
    if (d.sync.lastSyncResult) {
      var srClass = d.sync.lastSyncResult.success ? "db-status-ok" : "db-status-err";
      var srText = d.sync.lastSyncResult.success ? DT("syncSuccess", "\u540C\u6B65\u6210\u529F") : DT("syncFailed", "\u540C\u6B65\u5931\u8D25");
      if (d.sync.lastSyncResult.message) srText += " (" + d.sync.lastSyncResult.message + ")";
      html += '<div class="db-sync-row"><span>' + DT("lastSyncResult", "\u540C\u6B65\u7ED3\u679C") + '</span><span class="' + srClass + '">' + srText + '</span></div>';
    }

    html += '</div>';
    html += '</div>';

    /* ── Footer ───────────────────────────────────── */
    html += '<div class="db-footer">';
    html += '<span class="db-collected-at">' + DT("collectedAt", "\u6570\u636E\u91C7\u96C6\u65F6\u95F4") + ': ' + fmtDate(d.collectedAt) + '</span>';
    html += '<button class="db-refresh-btn" onclick="window.StudyDashboard.refresh()">' + DT("refreshStats", "\u5237\u65B0\u7EDF\u8BA1") + '</button>';
    html += '</div>';

    return html;
  }

  /* ── Open / Close / Refresh ──────────────────────── */
  function openPanel() {
    // Build or get panel
    var panel = document.getElementById("dashboard-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "dashboard-panel";
      panel.className = "dashboard-panel";
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "true");
      panel.setAttribute("hidden", "");

      // Backdrop
      var backdrop = document.createElement("div");
      backdrop.className = "dashboard-panel__backdrop";
      backdrop.addEventListener("click", closePanel);
      panel.appendChild(backdrop);

      // Content wrapper
      var content = document.createElement("div");
      content.className = "dashboard-panel__content";

      // Header
      var header = document.createElement("div");
      header.className = "dashboard-panel__header";
      var title = document.createElement("strong");
      title.id = "dashboard-title";
      title.textContent = DT("dashboard", "\u5B66\u4E60\u7EDF\u8BA1");
      var closeBtn = document.createElement("button");
      closeBtn.className = "dashboard-panel__close";
      closeBtn.innerHTML = "&times;";
      closeBtn.setAttribute("aria-label", "Close");
      closeBtn.addEventListener("click", closePanel);
      header.appendChild(title);
      header.appendChild(closeBtn);
      content.appendChild(header);

      // Body
      var body = document.createElement("div");
      body.className = "dashboard-panel__body";
      body.id = "dashboard-body";
      content.appendChild(body);

      panel.appendChild(content);
      document.body.appendChild(panel);
    }

    // Render fresh data
    refresh();
    panel.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  }

  function closePanel() {
    var panel = document.getElementById("dashboard-panel");
    if (panel) panel.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  function refresh() {
    var body = document.getElementById("dashboard-body");
    if (!body) return;
    try {
      var data = buildDashboardData();
      body.innerHTML = renderDashboard(data);
      // Update title for i18n
      var title = document.getElementById("dashboard-title");
      if (title) title.textContent = DT("dashboard", "\u5B66\u4E60\u7EDF\u8BA1");
    } catch (e) {
      body.innerHTML = '<div class="db-error">' + DT("loadError", "\u52A0\u8F7D\u7EDF\u8BA1\u6570\u636E\u5931\u8D25") + '</div>';
      console.warn("[Dashboard] Render error:", e);
    }
  }

  /* ── Exports ─────────────────────────────────────── */
  window.StudyDashboard = {
    open: openPanel,
    close: closePanel,
    refresh: refresh,
    getData: buildDashboardData,
  };

})();
