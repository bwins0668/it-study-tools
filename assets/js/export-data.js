/**
 * Study Tools learning-data export.
 *
 * Reads only the explicitly supported local learning-data keys and downloads
 * a JSON backup. It never writes storage, uploads data, or contacts Supabase.
 */
(function () {
  "use strict";

  var SCHEMA_VERSION = 1;
  var SOURCE = "study-tools-local-backup";
  var APP_VERSION = "v2026.6.15-r33.0";

  var DENY_PARTS = [
    "supabase", "sb-", "workbuddy", "codebuddy",
    "ai_provider", "openai", "anthropic", "gemini",
    "deepseek", "ai_", "ai_api", "api_key", "apikey",
    "token", "session", "jwt", "cookie", "password",
    "credential", "private_key", "secret", "auth_token",
    "device_id", "deviceid", "installation_id", "installationid"
  ];

  var DENY_EXACT = [
    "study-tools-sync-queue",
    "study-tools-sync-enabled",
    "study-tools-queue-version",
    "study-tools-typing-synced-keys",
    "study-tools-exam-synced-keys",
    "study-tools-typing-bookmarks-sync-v1",
    "study-tools-wrong-book-sync-meta-v1"
  ];

  function isDenied(key) {
    var lower = String(key || "").toLowerCase();
    if (DENY_EXACT.indexOf(lower) !== -1) return true;
    for (var i = 0; i < DENY_PARTS.length; i++) {
      if (lower.indexOf(DENY_PARTS[i]) !== -1) return true;
    }
    return false;
  }

  function addWarning(warnings, section) {
    if (warnings.indexOf(section) === -1) warnings.push(section);
  }

  function sanitize(value) {
    if (Array.isArray(value)) {
      return value.map(sanitize);
    }
    if (!value || typeof value !== "object") {
      return value;
    }

    var clean = {};
    Object.keys(value).forEach(function (key) {
      if (!isDenied(key)) clean[key] = sanitize(value[key]);
    });
    return clean;
  }

  function safeGet(key, fallback, section, warnings) {
    try {
      var raw = localStorage.getItem(key);
      return raw !== null ? sanitize(JSON.parse(raw)) : fallback;
    } catch (_) {
      addWarning(warnings, section);
      return fallback;
    }
  }

  function collectData() {
    var warnings = [];
    var sections = {
      completedLessons: {},
      quizResults: {},
      wrongBook: [],
      bookmarks: [],
      typingHistory: {},
      examHistory: [],
      dashboardGoals: null,
      syncSummary: {},
      userSettings: {}
    };

    [
      "sql_hub_completed",
      "itpass_completed_lessons",
      "sg_completed_lessons",
      "python_completed_lessons",
      "java_completed_lessons"
    ].forEach(function (key) {
      var value = safeGet(key, null, "completedLessons", warnings);
      if (value !== null) sections.completedLessons[key] = value;
    });

    try {
      for (var i = 0; i < localStorage.length; i++) {
        var quizKey = localStorage.key(i);
        if (quizKey && quizKey.indexOf("_quiz_completed_") !== -1 && !isDenied(quizKey)) {
          var quizValue = safeGet(quizKey, null, "quizResults", warnings);
          if (quizValue !== null) sections.quizResults[quizKey] = quizValue;
        }
      }

      for (var j = 0; j < localStorage.length; j++) {
        var progressKey = localStorage.key(j);
        if (progressKey && progressKey.indexOf("_progress_") !== -1 && !isDenied(progressKey)) {
          var progressValue = safeGet(progressKey, null, "quizResults", warnings);
          if (progressValue !== null) sections.quizResults[progressKey] = progressValue;
        }
      }
    } catch (_) {
      addWarning(warnings, "quizResults");
    }

    sections.wrongBook = safeGet(
      "study-tools-exam-wrong-book-v1",
      [],
      "wrongBook",
      warnings
    );

    var typingData = safeGet(
      "study-tools-japanese-typing-v1",
      {},
      "typingHistory",
      warnings
    );
    sections.bookmarks = Array.isArray(typingData.favorites)
      ? sanitize(typingData.favorites)
      : [];

    [
      "study-tools-japanese-typing-v1",
      "study-tools-coding-typing-history-v1"
    ].forEach(function (key) {
      var value = safeGet(key, null, "typingHistory", warnings);
      if (value !== null) sections.typingHistory[key] = value;
    });

    sections.examHistory = safeGet(
      "study-tools-exam-history-v1",
      [],
      "examHistory",
      warnings
    );
    sections.dashboardGoals = safeGet(
      "study-tools-dashboard-goals-v1",
      null,
      "dashboardGoals",
      warnings
    );
    sections.syncSummary.lastSyncAt = safeGet(
      "study_tools_last_sync_at",
      null,
      "syncSummary",
      warnings
    );
    sections.syncSummary.lastSyncResult = safeGet(
      "study_tools_last_sync_result",
      null,
      "syncSummary",
      warnings
    );

    try {
      var language = localStorage.getItem("study-tools-language");
      if (language) sections.userSettings.language = language;
      var theme = localStorage.getItem("study-tools-theme");
      if (theme) sections.userSettings.theme = theme;
    } catch (_) {
      addWarning(warnings, "userSettings");
    }

    var retrySettings = safeGet(
      "study-tools-wrong-book-retry-settings-v1",
      null,
      "userSettings",
      warnings
    );
    if (retrySettings !== null) {
      sections.userSettings.wrongBookRetrySettings = retrySettings;
    }

    // Round 45.0: add manifest with counts
    var manifest = {
      counts: {
        completedLessons: sections.completedLessons ? Object.keys(sections.completedLessons).length : 0,
        quizResults: sections.quizResults ? Object.keys(sections.quizResults).length : 0,
        wrongBook: sections.wrongBook ? sections.wrongBook.length : 0,
        bookmarks: sections.bookmarks ? sections.bookmarks.length : 0,
        typingHistory: sections.typingHistory ? sections.typingHistory.length : 0,
        examHistory: sections.examHistory ? sections.examHistory.length : 0,
        dashboardGoals: sections.dashboardGoals ? sections.dashboardGoals.length : 0,
      },
      checksum: null // TODO: add SHA-1 hash in future round
    };

    return {
      schemaVersion: SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      appVersion: (
        window.STUDY_TOOLS_VERSION &&
        window.STUDY_TOOLS_VERSION.webVersion
      ) || APP_VERSION,
      source: SOURCE,
      manifest: manifest,
      warnings: warnings,
      sections: sections
    };
  }

  function fmtDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    return year + month + day;
  }

  function t(key, fallback) {
    try {
      if (window.I18n && typeof window.I18n.t === "function") {
        var translated = window.I18n.t(key);
        return translated && translated !== key ? translated : fallback;
      }
    } catch (_) {}
    return fallback;
  }

  function showExportToast(type, message) {
    if (typeof window.showToast === "function") {
      window.showToast(message, type);
    } else {
      try {
        window.alert(message);
      } catch (_) {}
    }
  }

  function exportData() {
    var data;
    var json;
    var blob;

    try {
      data = collectData();
      json = JSON.stringify(data, null, 2);
      blob = new Blob([json], { type: "application/json" });
    } catch (error) {
      showExportToast(
        "error",
        t("tools.exportFailed", "Export failed") +
          ": " +
          (error && error.message ? error.message : "unknown error")
      );
      return;
    }

    var filename = "study-tools-backup-" + fmtDate() + ".json";
    var url;
    var link;

    try {
      url = URL.createObjectURL(blob);
      link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      showExportToast(
        "error",
        t("tools.exportFailed", "Export failed") +
          ": " +
          (error && error.message ? error.message : "cannot create file")
      );
      return;
    } finally {
      if (link && link.parentNode) link.parentNode.removeChild(link);
      if (url) {
        setTimeout(function () {
          URL.revokeObjectURL(url);
        }, 1000);
      }
    }

    var messageKey = data.warnings.length
      ? "tools.exportPartialSuccess"
      : "tools.exportSuccess";
    var fallback = data.warnings.length
      ? "Exported with some damaged data skipped"
      : "Export successful";
    showExportToast("success", t(messageKey, fallback) + " - " + filename);
  }

  function getExportInfo() {
    return {
      schemaVersion: SCHEMA_VERSION,
      source: SOURCE,
      scope: [
        "completedLessons",
        "quizResults",
        "wrongBook",
        "bookmarks",
        "typingHistory",
        "examHistory",
        "dashboardGoals",
        "syncSummary (non-sensitive)",
        "userSettings (language, theme, retry settings)"
      ],
      excluded: [
        "passwords, tokens, JWTs, sessions",
        "Supabase keys, API keys",
        "AI provider keys",
        "device identifiers",
        "auth sessions, cookies",
        "sync queue internals",
        "synced-keys metadata"
      ]
    };
  }

  window.StudyExport = {
    exportData: exportData,
    getExportInfo: getExportInfo
  };
})();
