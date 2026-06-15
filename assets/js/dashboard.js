/**
 * Study Tools Dashboard - Round 27.0
 *
 * Read-only learning statistics from localStorage & sync status.
 * Weekly learning trend + local learning goals (MVP).
 * Zero writes (except goals – local-only, no sync).
 * All reads try/catch-protected.
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

  /** Get a date-only ISO string (YYYY-MM-DD) from a datetime ISO */
  function dateOnly(iso) {
    if (!iso) return null;
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return null;
      return d.getFullYear() + "-" +
        String(d.getMonth() + 1).padStart(2, "0") + "-" +
        String(d.getDate()).padStart(2, "0");
    } catch (_) { return null; }
  }

  /** Build array of last 7 days as {label, date} */
  function last7Days() {
    var days = [];
    var now = new Date();
    for (var i = 6; i >= 0; i--) {
      var d = new Date(now);
      d.setDate(d.getDate() - i);
      var iso = d.getFullYear() + "-" +
        String(d.getMonth() + 1).padStart(2, "0") + "-" +
        String(d.getDate()).padStart(2, "0");
      var label = d.toLocaleDateString(void 0, { weekday: "short", month: "numeric", day: "numeric" });
      days.push({ label: label, date: iso, exams: 0, jpTyping: 0, codingTyping: 0, wrongBook: 0, total: 0 });
    }
    return days;
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
    var totalQuizCompletions = 0;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (!key) continue;
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

  /** Bookmarks / favorites stats — Round 29.1: use favorites as source-of-truth */
  function getBookmarkStats() {
    var jpTyping = safeObj("study-tools-japanese-typing-v1");
    var jpFavCount = 0;
    if (jpTyping && Array.isArray(jpTyping.favorites)) {
      jpFavCount = jpTyping.favorites.length;
    }
    // typingBookmarks = same underlying data (typing_article bookmarks === favorites)
    // Round 29.1: removed dependency on sync-state `.items` (never backfilled)
    return { typingBookmarks: jpFavCount, japaneseFavorites: jpFavCount, total: jpFavCount };
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

  /** ── NEW: Weekly learning trend ─────────────────── */
  function collectWeeklyTrend() {
    var days = last7Days();
    var maxTotal = 0;

    try {
      // Exam history
      var exams = safeArr("study-tools-exam-history-v1");
      if (Array.isArray(exams)) {
        for (var i = 0; i < exams.length; i++) {
          var ex = exams[i];
          if (!ex) continue;
          var d = dateOnly(ex.startedAt || ex.completedAt);
          if (!d) continue;
          for (var j = 0; j < days.length; j++) {
            if (days[j].date === d) { days[j].exams++; days[j].total++; if (days[j].total > maxTotal) maxTotal = days[j].total; break; }
          }
        }
      }
    } catch (_) {}

    try {
      // Japanese typing history
      var jp = safeObj("study-tools-japanese-typing-v1");
      var jpHist = (jp && Array.isArray(jp.history)) ? jp.history : [];
      for (var k = 0; k < jpHist.length; k++) {
        var jh = jpHist[k];
        if (!jh) continue;
        var jd = dateOnly(jh.completedAt || jh.date);
        if (!jd) continue;
        for (var m = 0; m < days.length; m++) {
          if (days[m].date === jd) { days[m].jpTyping++; days[m].total++; if (days[m].total > maxTotal) maxTotal = days[m].total; break; }
        }
      }
    } catch (_) {}

    try {
      // Coding typing history
      var ct = safeArr("study-tools-coding-typing-history-v1");
      if (Array.isArray(ct)) {
        for (var n = 0; n < ct.length; n++) {
          var c = ct[n];
          if (!c) continue;
          var cd = dateOnly(c.completedAt);
          if (!cd) continue;
          for (var p = 0; p < days.length; p++) {
            if (days[p].date === cd) { days[p].codingTyping++; days[p].total++; if (days[p].total > maxTotal) maxTotal = days[p].total; break; }
          }
        }
      }
    } catch (_) {}

    try {
      // Wrong book additions
      var wb = safeArr("study-tools-exam-wrong-book-v1");
      if (Array.isArray(wb)) {
        for (var q = 0; q < wb.length; q++) {
          var w = wb[q];
          if (!w) continue;
          var wd = dateOnly(w.addedAt || w.updatedAt);
          if (!wd) continue;
          for (var r = 0; r < days.length; r++) {
            if (days[r].date === wd) { days[r].wrongBook++; days[r].total++; if (days[r].total > maxTotal) maxTotal = days[r].total; break; }
          }
        }
      }
    } catch (_) {}

    // Calculate this-week totals for goals
    var weekExams = 0, weekTyping = 0, weekTotal = 0;
    for (var s = 0; s < days.length; s++) {
      weekExams += days[s].exams;
      weekTyping += days[s].jpTyping + days[s].codingTyping;
      weekTotal += days[s].total;
    }

    return {
      days: days,
      maxValue: maxTotal > 0 ? maxTotal : 1,
      weekExams: weekExams,
      weekTyping: weekTyping,
      weekTotal: weekTotal
    };
  }

  /** ── NEW: Learning goals ─────────────────────────── */
  var GOALS_KEY = "study-tools-dashboard-goals-v1";
  var DEFAULT_GOALS = { weeklyActivities: 7, weeklyTyping: 3, weeklyExams: 1 };

  function collectGoals() {
    var goals = safeRead(GOALS_KEY, null);
    var parsed = null;
    if (goals && typeof goals === "object" && !Array.isArray(goals)) {
      parsed = {};
      parsed.weeklyActivities = clampGoal(goals.weeklyActivities, DEFAULT_GOALS.weeklyActivities);
      parsed.weeklyTyping = clampGoal(goals.weeklyTyping, DEFAULT_GOALS.weeklyTyping);
      parsed.weeklyExams = clampGoal(goals.weeklyExams, DEFAULT_GOALS.weeklyExams);
    } else {
      parsed = {
        weeklyActivities: DEFAULT_GOALS.weeklyActivities,
        weeklyTyping: DEFAULT_GOALS.weeklyTyping,
        weeklyExams: DEFAULT_GOALS.weeklyExams
      };
    }
    return parsed;
  }

  function clampGoal(val, def) {
    if (typeof val !== "number" || isNaN(val) || !isFinite(val)) return def;
    var n = Math.round(val);
    if (n < 0) return 0;
    if (n > 999) return 999;
    return n;
  }

  function saveGoals(goalsObj) {
    try {
      var clean = {
        weeklyActivities: clampGoal(goalsObj.weeklyActivities, DEFAULT_GOALS.weeklyActivities),
        weeklyTyping: clampGoal(goalsObj.weeklyTyping, DEFAULT_GOALS.weeklyTyping),
        weeklyExams: clampGoal(goalsObj.weeklyExams, DEFAULT_GOALS.weeklyExams)
      };
      localStorage.setItem(GOALS_KEY, JSON.stringify(clean));
      return true;
    } catch (_) { return false; }
  }

  function resetGoals() {
    try { localStorage.removeItem(GOALS_KEY); return true; } catch (_) { return false; }
  }

  /** Sync status */
  function getSyncStatus() {
    var lastAt = safeRead("study_tools_last_sync_at", null);
    var result = safeRead("study_tools_last_sync_result", null);
    var enabled = safeRead("study_tools_sync_enabled", false);

    var loggedIn = false;
    try {
      if (window.StudySupabase && typeof window.StudySupabase.getCurrentUser === "function") {
        var user = window.StudySupabase.getCurrentUser();
        loggedIn = !!(user && user.id);
      }
    } catch (_) {}

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
    var trend = collectWeeklyTrend();
    var goals = collectGoals();

    // Merge current week counts into goals
    goals._currentActivities = trend.weekTotal;
    goals._currentTyping = trend.weekTyping;
    goals._currentExams = trend.weekExams;

    return {
      collectedAt: nowISO(),
      courses: courses,
      quizzes: quizzes,
      wrongBook: wrongBook,
      bookmarks: bookmarks,
      exams: exams,
      typing: typing,
      sync: sync,
      trend: trend,
      goals: goals
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

  /* ── Render helpers ──────────────────────────────── */
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

  /** ── NEW: Weekly trend bar chart ────────────────── */
  function renderBarValue(v) { return v > 0 ? v : ""; }

  function renderTrendBars(days, maxVal) {
    var html = "";
    for (var i = 0; i < days.length; i++) {
      var d = days[i];
      var heightPct = maxVal > 0 ? Math.round((d.total / maxVal) * 100) : 0;
      var barClass = d.total > 0 ? "db-bar--active" : "db-bar--zero";
      // Color code to show which activities contributed
      var tooltipParts = [];
      if (d.exams > 0) tooltipParts.push(DT("examsShort", "Exams") + ":" + d.exams);
      if (d.jpTyping > 0) tooltipParts.push(DT("jpTypingShort", "JP") + ":" + d.jpTyping);
      if (d.codingTyping > 0) tooltipParts.push(DT("ctTypingShort", "CT") + ":" + d.codingTyping);
      if (d.wrongBook > 0) tooltipParts.push(DT("wbShort", "WB") + ":" + d.wrongBook);
      var tooltip = tooltipParts.length > 0 ? tooltipParts.join(" ") : DT("noActivity", "\u7121\u6D3B\u52D5");

      html += '<div class="db-bar-col">' +
        '<span class="db-bar-value">' + renderBarValue(d.total) + '</span>' +
        '<div class="db-bar-track">' +
        '<div class="db-bar-fill ' + barClass + '" style="height:' + heightPct + '%" title="' + esc(tooltip) + '"></div>' +
        '</div>' +
        '<span class="db-bar-label">' + esc(d.label) + '</span>' +
        '</div>';
    }
    return html;
  }

  /** ── NEW: Learning goals section ────────────────── */
  function renderGoalRow(data, labelKey, current, goal, fieldName) {
    var pct = goal > 0 ? Math.min(Math.round((current / goal) * 100), 100) : 0;
    var colorClass = pct >= 80 ? "db-goal-bar--high" : (pct >= 40 ? "db-goal-bar--mid" : "db-goal-bar--low");
    return '<div class="db-goal-row">' +
      '<div class="db-goal-header">' +
      '<span class="db-goal-label">' + DT(labelKey, labelKey) + '</span>' +
      '<span class="db-goal-stats">' +
      '<span class="db-goal-current">' + current + '</span>' +
      '<span class="db-goal-sep">/</span>' +
      '<input type="number" class="db-goal-input" value="' + goal + '" min="0" max="999" data-goal-field="' + fieldName + '" aria-label="' + DT(labelKey, labelKey) + '" />' +
      '</span>' +
      '</div>' +
      '<div class="db-goal-bar-wrap">' +
      '<div class="db-goal-bar ' + colorClass + '" style="width:' + pct + '%"></div>' +
      '</div>' +
      '<span class="db-goal-pct">' + pct + '%</span>' +
      '</div>';
  }

  function renderGoals(goals) {
    var html = "";
    html += renderGoalRow(
      "goalActivities", "weeklyActivities",
      goals._currentActivities || 0, goals.weeklyActivities, "weeklyActivities"
    );
    html += renderGoalRow(
      "goalTyping", "weeklyTyping",
      goals._currentTyping || 0, goals.weeklyTyping, "weeklyTyping"
    );
    html += renderGoalRow(
      "goalExams", "weeklyExams",
      goals._currentExams || 0, goals.weeklyExams, "weeklyExams"
    );

    html += '<div class="db-goal-actions">' +
      '<button class="db-goal-save-btn" id="db-goal-save">' + DT("saveGoals", "\u4FDD\u5B58\u76EE\u6807") + '</button>' +
      '<button class="db-goal-reset-btn" id="db-goal-reset">' + DT("resetGoals", "\u30EA\u30BB\u30C3\u30C8") + '</button>' +
      '<span class="db-goal-msg" id="db-goal-msg" style="display:none"></span>' +
      '</div>';

    return html;
  }

  /* ── Main render ─────────────────────────────────── */
  function renderDashboard(data) {
    var d = data;
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

    /* ── Section 3: Weekly Learning Trend ─────────── */
    html += '<div class="db-section">';
    html += '<h3 class="db-section-title">' + DT("weeklyTrend", "\u5468\u5B66\u4E60\u8D8B\u52BF") + '</h3>';
    if (d.trend && d.trend.days && d.trend.maxValue > 0) {
      var hasAnyActivity = false;
      for (var ti = 0; ti < d.trend.days.length; ti++) {
        if (d.trend.days[ti].total > 0) { hasAnyActivity = true; break; }
      }
      // Even if maxValue is 1 (no actual activity), show bars with zero
      html += '<div class="db-bar-chart">';
      html += renderTrendBars(d.trend.days, d.trend.maxValue);
      html += '</div>';
      // Legend
      html += '<div class="db-bar-legend">';
      html += '<span class="db-legend-item"><span class="db-legend-dot db-legend-dot--exam"></span>' + DT("examsShort", "Exams") + '</span>';
      html += '<span class="db-legend-item"><span class="db-legend-dot db-legend-dot--jp"></span>' + DT("jpTypingShort", "JP") + '</span>';
      html += '<span class="db-legend-item"><span class="db-legend-dot db-legend-dot--ct"></span>' + DT("ctTypingShort", "CT") + '</span>';
      html += '<span class="db-legend-item"><span class="db-legend-dot db-legend-dot--wb"></span>' + DT("wbShort", "WB") + '</span>';
      html += '</div>';
    } else {
      html += '<div class="db-empty-state">' + DT("noTrendData", "\u6682\u65E0\u8D8B\u52BF\u6570\u636E") + '</div>';
    }
    html += '</div>';

    /* ── Section 4: Learning Goals ────────────────── */
    html += '<div class="db-section">';
    html += '<h3 class="db-section-title">' + DT("learningGoals", "\u5B66\u4E60\u76EE\u6807") + '</h3>';
    html += '<div class="db-goals-wrap">';
    html += renderGoals(d.goals);
    html += '</div>';
    html += '</div>';

    /* ── Section 5: Wrong Book & Bookmarks ────────── */
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

    /* ── Section 6: Quiz & Exam ───────────────────── */
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

    /* ── Section 7: Typing Practice ───────────────── */
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

    /* ── Section 8: Sync Status ───────────────────── */
    html += '<div class="db-section">';
    html += '<h3 class="db-section-title">' + DT("syncStatus", "\u540C\u6B65\u72B6\u6001") + '</h3>';

    // Round 29.1: sync freshness hint
    html += renderSyncFreshnessHint(d.sync);

    html += '<div class="db-sync-status">';

    var loginClass = d.sync.loggedIn ? "db-status-ok" : "db-status-off";
    var loginText = d.sync.loggedIn ? DT("loggedIn", "\u5DF2\u767B\u5F55") : DT("notLoggedIn", "\u672A\u767B\u5F55");
    html += '<div class="db-sync-row"><span>' + DT("loginStatus", "\u767B\u5F55\u72B6\u6001") + '</span><span class="' + loginClass + '">' + loginText + '</span></div>';

    var syncAgo = d.sync.lastSyncAt ? fmtAgo(d.sync.lastSyncAt) : null;
    var syncDate = d.sync.lastSyncAt ? fmtDate(d.sync.lastSyncAt) : null;
    html += '<div class="db-sync-row"><span>' + DT("lastSync", "\u4E0A\u6B21\u540C\u6B65") + '</span><span>' + (syncAgo || syncDate || noData()) + '</span></div>';

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

  /* ── Goal event delegation ───────────────────────── */
  function bindGoalEvents() {
    var saveBtn = document.getElementById("db-goal-save");
    var resetBtn = document.getElementById("db-goal-reset");
    var msgEl = document.getElementById("db-goal-msg");

    function showMsg(text, ok) {
      if (!msgEl) return;
      msgEl.textContent = text;
      msgEl.className = "db-goal-msg" + (ok ? " db-goal-msg--ok" : " db-goal-msg--err");
      msgEl.style.display = "";
      setTimeout(function () { if (msgEl) msgEl.style.display = "none"; }, 2500);
    }

    if (saveBtn) {
      saveBtn.onclick = function () {
        var inputs = document.querySelectorAll(".db-goal-input");
        var goals = {};
        var ok = true;
        for (var i = 0; i < inputs.length; i++) {
          var inp = inputs[i];
          var field = inp.getAttribute("data-goal-field");
          var val = parseInt(inp.value, 10);
          if (isNaN(val) || val < 0) { val = 0; ok = false; }
          if (val > 999) val = 999;
          goals[field] = val;
          inp.value = val;
        }
        saveGoals(goals);
        showMsg(DT("goalsSaved", "\u76EE\u6807\u5DF2\u4FDD\u5B58"), true);
        // Re-render to update progress bars
        window.StudyDashboard.refresh();
      };
    }

    if (resetBtn) {
      resetBtn.onclick = function () {
        resetGoals();
        showMsg(DT("goalsReset", "\u76EE\u6807\u5DF2\u91CD\u7F6E"), true);
        window.StudyDashboard.refresh();
      };
    }
  }

  /* ── Round 29.1: Sync freshness hint ─────────────── */
  /** Returns hint HTML if sync data may be incomplete, otherwise empty string */
  function renderSyncFreshnessHint(sync) {
    var loggedIn = sync.loggedIn;
    var lastSyncAt = sync.lastSyncAt;

    // Not logged in: show login prompt (non-intrusive)
    if (!loggedIn) {
      return '<div class="db-sync-hint db-sync-hint--info">' +
        '<span class="db-sync-hint-icon">&#9432;</span>' +
        '<span>' + DT("loginToSyncHint", "Login to sync data across devices") + '</span>' +
        '</div>';
    }

    // Logged in, never synced → P1 warning
    if (!lastSyncAt) {
      return '<div class="db-sync-hint db-sync-hint--warn">' +
        '<span class="db-sync-hint-icon">&#9888;</span>' +
        '<span>' + DT("dataIncompleteHint", "Data may be incomplete. Sync first to update this device.") + '</span>' +
        '<button class="db-sync-hint-btn" id="db-sync-refresh-btn">' +
        DT("syncAndRefresh", "Sync & Refresh") +
        '</button>' +
        '<span class="db-sync-hint-msg" id="db-sync-hint-msg" style="display:none"></span>' +
        '</div>';
    }

    // Logged in, last sync > 24h ago → weak suggestion
    try {
      var diffH = (Date.now() - new Date(lastSyncAt).getTime()) / 3600000;
      if (diffH > 24 && diffH > 0) {
        return '<div class="db-sync-hint db-sync-hint--info">' +
          '<span class="db-sync-hint-icon">&#9432;</span>' +
          '<span>' + DT("dataIncompleteHint", "Your data may be stale. Consider syncing.") + '</span>' +
          '<button class="db-sync-hint-btn" id="db-sync-refresh-btn">' +
          DT("syncAndRefresh", "Sync & Refresh") +
          '</button>' +
          '<span class="db-sync-hint-msg" id="db-sync-hint-msg" style="display:none"></span>' +
          '</div>';
      }
    } catch (_) {}

    return "";
  }

  /** Handle sync + refresh button click */
  function handleSyncAndRefresh() {
    var btn = document.getElementById("db-sync-refresh-btn");
    var msgEl = document.getElementById("db-sync-hint-msg");
    if (!btn) return;

    if (!window.StudySync || typeof window.StudySync.runManualSync !== "function") {
      if (msgEl) {
        msgEl.textContent = DT("syncFailedHint", "Sync unavailable");
        msgEl.className = "db-sync-hint-msg db-sync-hint-msg--err";
        msgEl.style.display = "";
      }
      return;
    }

    btn.disabled = true;
    btn.textContent = DT("syncing", "Syncing…");
    if (msgEl) { msgEl.textContent = ""; msgEl.style.display = "none"; }

    window.StudySync.runManualSync().then(function (result) {
      btn.disabled = false;
      if (result && result.ok) {
        btn.textContent = DT("syncComplete", "Sync complete");
        if (msgEl) {
          msgEl.textContent = DT("syncComplete", "Sync complete");
          msgEl.className = "db-sync-hint-msg db-sync-hint-msg--ok";
          msgEl.style.display = "";
        }
      } else {
        btn.textContent = DT("syncAndRefresh", "Sync & Refresh");
        var errMsg = (result && result.error && result.error.message) || DT("syncFailedHint", "Sync failed");
        if (msgEl) {
          msgEl.textContent = errMsg;
          msgEl.className = "db-sync-hint-msg db-sync-hint-msg--err";
          msgEl.style.display = "";
        }
      }
      // Always refresh Dashboard after sync attempt
      if (window.StudyDashboard && window.StudyDashboard.refresh) {
        window.StudyDashboard.refresh();
      }
    }).catch(function (err) {
      btn.disabled = false;
      btn.textContent = DT("syncAndRefresh", "Sync & Refresh");
      if (msgEl) {
        msgEl.textContent = DT("syncFailedHint", "Sync failed") + ": " + (err.message || "");
        msgEl.className = "db-sync-hint-msg db-sync-hint-msg--err";
        msgEl.style.display = "";
      }
    });
  }

  /** Bind sync hint events (call after render) */
  function bindSyncHintEvents() {
    var btn = document.getElementById("db-sync-refresh-btn");
    if (btn) {
      btn.onclick = handleSyncAndRefresh;
    }
  }

  /* ── Open / Close / Refresh ──────────────────────── */
  function openPanel() {
    var panel = document.getElementById("dashboard-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "dashboard-panel";
      panel.className = "dashboard-panel";
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "true");
      panel.setAttribute("hidden", "");

      var backdrop = document.createElement("div");
      backdrop.className = "dashboard-panel__backdrop";
      backdrop.addEventListener("click", closePanel);
      panel.appendChild(backdrop);

      var content = document.createElement("div");
      content.className = "dashboard-panel__content";

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

      var body = document.createElement("div");
      body.className = "dashboard-panel__body";
      body.id = "dashboard-body";
      content.appendChild(body);

      panel.appendChild(content);
      document.body.appendChild(panel);
    }

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
      bindGoalEvents();
      bindSyncHintEvents();
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
    saveGoals: saveGoals,
    resetGoals: resetGoals,
    collectGoals: collectGoals,
  };

})();
