/**
 * Study Tools Sync Engine - Round 17.6.
 *
 * Local-first sync foundation:
 *  - device ID generation & persistence
 *  - sync queue management (localStorage-backed)
 *  - local progress snapshot & export
 *  - explicit manual Supabase sync for P0 learning data
 *
 * Exposed globally as `window.StudySync`.
 */
(function () {
  "use strict";

  /* ── Storage keys ────────────────────────────────── */
  var KEYS = {
    DEVICE_ID:      "study_tools_device_id",
    SYNC_QUEUE:     "study_tools_sync_queue",
    LAST_SYNC_AT:   "study_tools_last_sync_at",
    SYNC_ENABLED:   "study_tools_sync_enabled",
    QUEUE_VERSION:  "study_tools_queue_version",
    SETTINGS_UPDATED_AT: "study_tools_settings_updated_at",
    LAST_SYNC_RESULT: "study_tools_last_sync_result",
  };

  var SCHEMA_VERSION = 1;
  var MAX_QUEUE      = 1000;

  /* ── Helpers ─────────────────────────────────────── */
  function safeGet(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch (_) { return fallback; }
  }

  function safeSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  }

  function safeRemove(key) {
    try { localStorage.removeItem(key); } catch (_) {}
  }

  function safeSetRaw(key, value) {
    try { localStorage.setItem(key, String(value)); } catch (_) {}
  }

  function nowISO() {
    return new Date().toISOString();
  }

  /* ── Device ID ───────────────────────────────────── */
  function getOrCreateDeviceId() {
    var id = getDeviceId();
    if (!id) {
      id = "st-" + crypto.randomUUID();
      safeSet(KEYS.DEVICE_ID, id);
    }
    return id;
  }

  function getDeviceId() {
    return safeGet(KEYS.DEVICE_ID, null);
  }

  /* ── Sync Queue ──────────────────────────────────── */
  function getSyncQueue() {
    var q = safeGet(KEYS.SYNC_QUEUE, []);
    // prune schema-stale entries
    q = q.filter(function (e) { return e && e.schema_version === SCHEMA_VERSION; });
    return q;
  }

  function saveSyncQueue(queue) {
    safeSet(KEYS.SYNC_QUEUE, queue);
  }

  function enqueueSyncEvent(type, payload, options) {
    options = options || {};
    var q = getSyncQueue();
    if (q.length >= MAX_QUEUE) {
      console.warn("[StudySync] Queue full (" + MAX_QUEUE + "), dropping oldest event.");
      q.shift();
    }
    var ev = {
      id:             "evt-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      type:           type,
      payload:        payload || {},
      device_id:      getOrCreateDeviceId(),
      created_at:     nowISO(),
      updated_at:     nowISO(),
      status:         "pending",
      retry_count:    0,
      schema_version: SCHEMA_VERSION,
      priority:       options.priority || 0,
    };
    // Insert sorted by priority (higher first), then created_at
    var idx = q.findIndex(function (e) { return e.priority < ev.priority; });
    if (idx === -1) q.push(ev); else q.splice(idx, 0, ev);
    saveSyncQueue(q);
    return ev.id;
  }

  function markSyncEventDone(eventId) {
    var q = getSyncQueue();
    var found = false;
    q = q.filter(function (e) {
      if (e.id === eventId) {
        found = true;
        return false; // remove from pending queue
      }
      return true;
    });
    if (found) saveSyncQueue(q);
    return found;
  }

  function markSyncEventFailed(eventId, error) {
    var q = getSyncQueue();
    var updated = false;
    q = q.map(function (e) {
      if (e.id === eventId) {
        updated = true;
        return {
          id:             e.id,
          type:           e.type,
          payload:        e.payload,
          device_id:      e.device_id,
          created_at:     e.created_at,
          updated_at:     nowISO(),
          status:         "failed",
          retry_count:    (e.retry_count || 0) + 1,
          last_error:     String(error || "unknown"),
          schema_version: SCHEMA_VERSION,
          priority:       e.priority || 0,
        };
      }
      return e;
    });
    if (updated) saveSyncQueue(q);
    return updated;
  }

  function clearSyncQueue() {
    safeSet(KEYS.SYNC_QUEUE, []);
  }

  /* ── Helper functions (Round 17.2 additions) ────── */

  function getSyncQueueSize() {
    return getSyncQueue().length;
  }

  function getLastSyncAt() {
    return safeGet(KEYS.LAST_SYNC_AT, null);
  }

  function setSyncEnabledLocal(enabled) {
    safeSet(KEYS.SYNC_ENABLED, !!enabled);
  }

  function isSyncEnabled() {
    return safeGet(KEYS.SYNC_ENABLED, false);
  }

  function getDeviceSummary() {
    return {
      device_id:      getDeviceId(),
      sync_enabled:   isSyncEnabled(),
      last_sync_at:   getLastSyncAt(),
      queue_size:     getSyncQueueSize(),
    };
  }

  /* ── Progress & settings readers (read-only) ─────── */

  function safeReadLS(key) {
    try {
      var v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : null;
    } catch (_) { return null; }
  }

  /**
   * Build a read-only snapshot of all local learning progress.
   * Does NOT modify any localStorage keys.
   */
  function getAllLocalProgress() {
    return {
      courses: {
        sql:      safeReadLS("sql_hub_completed")              || [],
        itpass:   safeReadLS("itpass_completed_lessons")       || [],
        sg:       safeReadLS("sg_completed_lessons")           || [],
        java:     safeReadLS("java_completed_lessons")         || [],
        python:   safeReadLS("python_completed_lessons")       || [],
      },
      quizzes: {
        sql:      safeReadLS("sql_quiz_completed")             || [],
        itpass:   safeReadLS("itpass_quiz_completed")          || [],
        sg:       safeReadLS("sg_quiz_completed")              || [],
        java:     safeReadLS("java_quiz_completed")            || [],
        python:   safeReadLS("python_quiz_completed")          || [],
      },
      lessons: {
        java:     safeReadLS("java_progress")                  || {},
        python:   safeReadLS("python_progress")                || {},
      },
      typing:   safeReadLS("study-tools-japanese-typing-v1")   || null,
      // Bookmarks/glossary — currently none stored, placeholder for future
      // glossary: safeReadLS("study-tools-glossary-bookmarks") || [],
    };
  }

  /**
   * Read user settings from localStorage (excludes AI API key & provider config).
   */
  function getLocalUserSettings() {
    var lang = null;
    try { lang = localStorage.getItem("study-tools-language"); } catch (_) {}

    var theme = null;
    try { theme = localStorage.getItem("study-tools-theme"); } catch (_) {}

    return {
      language: lang || "default-ja-zh",
      theme:    theme || "dark",
    };
  }

  /**
   * Get sync status summary.
   */
  function getSyncStatus() {
    var q = getSyncQueue();
    var pending = q.filter(function (e) { return e.status === "pending"; });
    var failed  = q.filter(function (e) { return e.status === "failed"; });
    return {
      device_id:          getDeviceId(),
      last_sync_at:       safeGet(KEYS.LAST_SYNC_AT, null),
      sync_enabled:       safeGet(KEYS.SYNC_ENABLED, false),
      queue_total:        q.length,
      queue_pending:      pending.length,
      queue_failed:       failed.length,
      schema_version:     SCHEMA_VERSION,
    };
  }

  /**
   * Export a JSON-serialisable local snapshot for debugging / manual backup.
   *
   * NEVER includes:
   *  - AI API keys (sessionStorage)
   *  - AI provider configs (provider, model, Ollama URL)
   *  - AI translation cache (~500 kB, wasteful)
   */
  function exportLocalSyncSnapshot() {
    return {
      exported_at:   nowISO(),
      device_id:     getOrCreateDeviceId(),
      settings:      getLocalUserSettings(),
      progress:      getAllLocalProgress(),
      sync_status:   getSyncStatus(),
      user_agent:    typeof navigator !== "undefined" ? navigator.userAgent : null,
      metadata: {
        app:   "Study Tools",
        round: "17.1",
        type:  typeof window !== "undefined" && window.STUDY_TOOLS_WEB_PUBLIC ? "web" : "windows",
      },
    };
  }

  function setLastSyncAt(iso) {
    safeSet(KEYS.LAST_SYNC_AT, iso || nowISO());
  }

  function setSyncEnabled(enabled) {
    safeSet(KEYS.SYNC_ENABLED, !!enabled);
  }

  var manualSyncRunning = false;
  var runtimeStatus = "idle";

  function syncError(code, message, details) {
    return {
      ok: false,
      error: {
        name: "StudySyncError",
        code: code,
        message: message,
        details: details || null,
      },
    };
  }

  function syncSuccess(data) {
    return { ok: true, data: data || {} };
  }

  function friendlyRemoteError(error, fallbackCode) {
    return {
      code: error && error.code ? error.code : fallbackCode,
      message: error && error.message ? error.message : "Supabase sync failed.",
    };
  }

  async function getRemoteContext() {
    var api = window.StudySupabase;
    if (!api || typeof api.getCurrentUser !== "function") {
      return syncError("not_configured", "Supabase is not configured.");
    }

    var user = await api.getCurrentUser();
    var status = typeof api.getStatus === "function"
      ? api.getStatus()
      : { code: "not_configured", ready: false };
    if (status.code === "not_configured") return syncError("not_configured", "Supabase is not configured.");
    if (status.code === "disabled") return syncError("disabled", "Supabase is disabled.");
    if (status.code === "sdk_missing") return syncError("sdk_missing", "Supabase SDK is not loaded.");
    if (!status.ready && status.code === "ready_to_initialize" && typeof api.initClient === "function") {
      api.initClient();
      status = api.getStatus();
    }
    if (!status.ready) return syncError(status.code || "not_ready", status.message || "Supabase is not ready.");
    if (!user) return syncError("not_authenticated", "Please sign in before syncing.");

    var client = api.getClient();
    if (!client || typeof client.from !== "function") {
      return syncError("client_unavailable", "Supabase client is unavailable.");
    }
    return syncSuccess({ api: api, client: client, user: user });
  }

  function getRemoteDeviceId() {
    var localId = getOrCreateDeviceId();
    return localId.indexOf("st-") === 0 ? localId.slice(3) : localId;
  }

  function getDeviceType() {
    return window.STUDY_TOOLS_WEB_PUBLIC ? "web" : "windows";
  }

  async function registerDeviceRemote(context) {
    var ctx = context;
    if (!ctx || !ctx.client) {
      var checked = await getRemoteContext();
      if (!checked.ok) return checked;
      ctx = checked.data;
    }
    try {
      var timestamp = nowISO();
      var result = await ctx.client.from("devices").upsert({
        id: getRemoteDeviceId(),
        user_id: ctx.user.id,
        device_name: getDeviceType() + " browser",
        device_type: getDeviceType(),
        last_sync_at: timestamp,
        updated_at: timestamp,
        is_deleted: false,
        deleted_at: null,
      }, { onConflict: "id" });
      if (result && result.error) return syncError("device_register_failed", result.error.message, result.error);
      return syncSuccess({ device_id: getRemoteDeviceId() });
    } catch (error) {
      var friendly = friendlyRemoteError(error, "device_register_failed");
      return syncError(friendly.code, friendly.message);
    }
  }

  function normalizeSettings(settings) {
    settings = settings || {};
    return {
      language: typeof settings.language === "string" && settings.language
        ? settings.language
        : "default-ja-zh",
      theme: settings.theme === "light" ? "light" : "dark",
    };
  }

  async function pushUserSettings(context) {
    var ctx = context;
    if (!ctx || !ctx.client) {
      var checked = await getRemoteContext();
      if (!checked.ok) return checked;
      ctx = checked.data;
    }
    var settings = normalizeSettings(getLocalUserSettings());
    var timestamp = nowISO();
    try {
      var result = await ctx.client.from("user_settings").upsert({
        user_id: ctx.user.id,
        language: settings.language,
        theme: settings.theme,
        updated_at: timestamp,
        sync_version: SCHEMA_VERSION,
      }, { onConflict: "user_id" });
      if (result && result.error) return syncError("settings_push_failed", result.error.message, result.error);
      safeSet(KEYS.SETTINGS_UPDATED_AT, timestamp);
      return syncSuccess({ count: 1, updated_at: timestamp });
    } catch (error) {
      var friendly = friendlyRemoteError(error, "settings_push_failed");
      return syncError(friendly.code, friendly.message);
    }
  }

  async function pullUserSettings(context) {
    var ctx = context;
    if (!ctx || !ctx.client) {
      var checked = await getRemoteContext();
      if (!checked.ok) return checked;
      ctx = checked.data;
    }
    try {
      var result = await ctx.client.from("user_settings")
        .select("language,theme,updated_at")
        .eq("user_id", ctx.user.id)
        .maybeSingle();
      if (result && result.error) return syncError("settings_pull_failed", result.error.message, result.error);
      if (!result || !result.data) return syncSuccess({ count: 0, merged: false });

      var remote = normalizeSettings(result.data);
      var remoteAt = result.data.updated_at || "";
      var localAt = safeGet(KEYS.SETTINGS_UPDATED_AT, null) || "";
      if (!localAt || remoteAt > localAt) {
        safeSetRaw("study-tools-language", remote.language);
        safeSetRaw("study-tools-theme", remote.theme);
        safeSet(KEYS.SETTINGS_UPDATED_AT, remoteAt || nowISO());
        return syncSuccess({ count: 1, merged: true });
      }
      return syncSuccess({ count: 1, merged: false });
    } catch (error) {
      var friendly = friendlyRemoteError(error, "settings_pull_failed");
      return syncError(friendly.code, friendly.message);
    }
  }

  var COURSE_KEYS = {
    sql: "sql_hub_completed",
    itpass: "itpass_completed_lessons",
    sg: "sg_completed_lessons",
    java: "java_completed_lessons",
    python: "python_completed_lessons",
  };

  function unionValues(left, right) {
    var seen = {};
    return (left || []).concat(right || []).filter(function (value) {
      var key = String(value);
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  function toInteger(value) {
    var parsed = Number(value);
    return Number.isInteger(parsed) ? parsed : null;
  }

  function newProgressRow(userId, subject, lessonId) {
    return {
      user_id: userId,
      subject: subject,
      lesson_id: lessonId,
      is_completed: false,
      quiz_done: false,
      code_run: false,
      quiz_completed_indices: [],
      device_id: getRemoteDeviceId(),
      deleted_at: null,
    };
  }

  function collectProgressRows(userId) {
    var rows = {};
    Object.keys(COURSE_KEYS).forEach(function (subject) {
      var completed = safeReadLS(COURSE_KEYS[subject]) || [];
      completed.forEach(function (lessonId) {
        var id = toInteger(lessonId);
        if (id === null) return;
        var key = subject + ":" + id;
        rows[key] = rows[key] || newProgressRow(userId, subject, id);
        rows[key].is_completed = true;
      });
    });

    try {
      for (var index = 0; index < localStorage.length; index += 1) {
        var storageKey = localStorage.key(index);
        var quizMatch = storageKey && storageKey.match(/^(sql|itpass|sg|java|python)_quiz_completed_(\d+)$/);
        if (quizMatch) {
          var quizSubject = quizMatch[1];
          var quizLessonId = Number(quizMatch[2]);
          var quizRowKey = quizSubject + ":" + quizLessonId;
          rows[quizRowKey] = rows[quizRowKey] || newProgressRow(userId, quizSubject, quizLessonId);
          rows[quizRowKey].quiz_completed_indices = unionValues(
            rows[quizRowKey].quiz_completed_indices,
            safeReadLS(storageKey) || []
          );
          rows[quizRowKey].quiz_done = rows[quizRowKey].quiz_completed_indices.length > 0;
        }

        var detailMatch = storageKey && storageKey.match(/^(java|python)_progress_(\d+)$/);
        if (detailMatch) {
          var detailSubject = detailMatch[1];
          var detailLessonId = Number(detailMatch[2]);
          var detailRowKey = detailSubject + ":" + detailLessonId;
          var detail = safeReadLS(storageKey) || {};
          rows[detailRowKey] = rows[detailRowKey] || newProgressRow(userId, detailSubject, detailLessonId);
          rows[detailRowKey].quiz_done = rows[detailRowKey].quiz_done || detail.quizDone === true;
          rows[detailRowKey].code_run = detail.codeRun === true;
        }
      }
    } catch (_) {}

    return Object.keys(rows).map(function (key) {
      rows[key].updated_at = nowISO();
      return rows[key];
    });
  }

  async function pushLearningProgress(context) {
    var ctx = context;
    if (!ctx || !ctx.client) {
      var checked = await getRemoteContext();
      if (!checked.ok) return checked;
      ctx = checked.data;
    }
    var rows = collectProgressRows(ctx.user.id);
    if (!rows.length) return syncSuccess({ count: 0 });
    try {
      var result = await ctx.client.from("learning_progress").upsert(rows, {
        onConflict: "user_id,subject,lesson_id",
      });
      if (result && result.error) return syncError("progress_push_failed", result.error.message, result.error);
      return syncSuccess({ count: rows.length });
    } catch (error) {
      var friendly = friendlyRemoteError(error, "progress_push_failed");
      return syncError(friendly.code, friendly.message);
    }
  }

  function mergeRemoteProgress(rows) {
    var merged = 0;
    var warnings = [];
    (rows || []).forEach(function (row) {
      if (!row || !COURSE_KEYS[row.subject] || row.deleted_at) return;
      var lessonId = toInteger(row.lesson_id);
      if (lessonId === null) return;

      if (row.is_completed) {
        var completed = safeReadLS(COURSE_KEYS[row.subject]) || [];
        safeSet(COURSE_KEYS[row.subject], unionValues(completed, [lessonId]));
        merged += 1;
      }
      // Remote is_completed=false: do NOT remove local completion
      // union merge only adds, never removes

      var indices = Array.isArray(row.quiz_completed_indices) ? row.quiz_completed_indices : [];
      if (indices.length) {
        var quizKey = row.subject + "_quiz_completed_" + lessonId;
        var localIndices = safeReadLS(quizKey) || [];
        safeSet(quizKey, unionValues(localIndices, indices));
        merged += 1;
      }

      if (row.subject === "java" || row.subject === "python") {
        var detailKey = row.subject + "_progress_" + lessonId;
        var detail = safeReadLS(detailKey) || {};
        // Only OR remote state — never clear local
        detail.quizDone = detail.quizDone === true || row.quiz_done === true;
        detail.codeRun = detail.codeRun === true || row.code_run === true;
        safeSet(detailKey, detail);
      }
    });
    return { merged: merged, warnings: warnings };
  }

  async function pullLearningProgress(context) {
    var ctx = context;
    if (!ctx || !ctx.client) {
      var checked = await getRemoteContext();
      if (!checked.ok) return checked;
      ctx = checked.data;
    }
    try {
      var result = await ctx.client.from("learning_progress")
        .select("subject,lesson_id,is_completed,quiz_done,code_run,quiz_completed_indices,updated_at,deleted_at")
        .eq("user_id", ctx.user.id)
        .is("deleted_at", null);
      if (result && result.error) return syncError("progress_pull_failed", result.error.message, result.error);
      var data = result && result.data ? result.data : [];
      var mergeResult = mergeRemoteProgress(data);
      return syncSuccess({ count: data.length, merged: mergeResult.merged, warnings: mergeResult.warnings });
    } catch (error) {
      var friendly = friendlyRemoteError(error, "progress_pull_failed");
      return syncError(friendly.code, friendly.message);
    }
  }

  /**
   * Build quiz rows from local progress for remote upsert.
   * Uses push-and-continue rather than push-or-fail.
   */
  function collectQuizRows(userId) {
    var timestamp = nowISO();
    var rows = [];
    collectProgressRows(userId).forEach(function (row) {
      (row.quiz_completed_indices || []).forEach(function (quizIndex) {
        var parsedIndex = toInteger(quizIndex);
        if (parsedIndex === null) return;
        rows.push({
          user_id: userId,
          subject: row.subject,
          lesson_id: row.lesson_id,
          quiz_index: parsedIndex,
          is_correct: true,
          attempt_count: 1,
          answered_at: timestamp,
          updated_at: timestamp,
          device_id: getRemoteDeviceId(),
          deleted_at: null,
        });
      });
    });
    return rows;
  }

  async function pushQuizResults(context) {
    var ctx = context;
    if (!ctx || !ctx.client) {
      var checked = await getRemoteContext();
      if (!checked.ok) return checked;
      ctx = checked.data;
    }
    var quizRows = collectQuizRows(ctx.user.id);
    if (!quizRows.length) return syncSuccess({ count: 0 });
    try {
      var result = await ctx.client.from("quiz_results").upsert(quizRows, {
        onConflict: "user_id,subject,lesson_id,quiz_index,device_id",
      });
      if (result && result.error) return syncError("quiz_push_failed", result.error.message, result.error);
      return syncSuccess({ count: quizRows.length });
    } catch (error) {
      var friendly = friendlyRemoteError(error, "quiz_push_failed");
      return syncError(friendly.code, friendly.message);
    }
  }

  /* ── Bookmarks Sync (Round 19.1) ─────────────────── */
  function getTypingFavorites() {
    try {
      var key = "study-tools-japanese-typing-v1";
      var saved = JSON.parse(localStorage.getItem(key) || "{}");
      return Array.isArray(saved.favorites) ? saved.favorites : [];
    } catch (_) {
      return [];
    }
  }

  function setTypingFavorites(favorites) {
    try {
      var key = "study-tools-japanese-typing-v1";
      var saved = {};
      try {
        saved = JSON.parse(localStorage.getItem(key) || "{}");
      } catch (_) {}
      saved.favorites = Array.isArray(favorites) ? favorites : [];
      localStorage.setItem(key, JSON.stringify(saved));
    } catch (_) {}
  }

  function collectBookmarksForSync(userId) {
    var favorites = getTypingFavorites();
    var timestamp = nowISO();
    return favorites.map(function (id) {
      return {
        user_id: userId,
        bookmark_type: "typing_article",
        reference_id: String(id),
        label: "",
        created_at: timestamp,
        updated_at: timestamp,
        deleted_at: null,
      };
    });
  }

  async function pushBookmarks(context) {
    var ctx = context;
    if (!ctx || !ctx.client) {
      var checked = await getRemoteContext();
      if (!checked.ok) return checked;
      ctx = checked.data;
    }
    var rows = collectBookmarksForSync(ctx.user.id);
    if (!rows.length) return syncSuccess({ count: 0 });
    try {
      var result = await ctx.client.from("bookmarks").upsert(rows, {
        onConflict: "user_id,bookmark_type,reference_id",
      });
      if (result && result.error) return syncError("bookmarks_push_failed", result.error.message, result.error);
      return syncSuccess({ count: rows.length });
    } catch (error) {
      var friendly = friendlyRemoteError(error, "bookmarks_push_failed");
      return syncError(friendly.code, friendly.message);
    }
  }

  function mergeBookmarks(remoteBookmarks) {
    var local = getTypingFavorites();
    var seen = {};
    var merged = [];
    local.forEach(function (id) {
      var sid = String(id);
      if (!seen[sid]) {
        seen[sid] = true;
        merged.push(id);
      }
    });

    var remoteAdded = 0;
    (remoteBookmarks || []).forEach(function (row) {
      if (!row || row.bookmark_type !== "typing_article" || row.deleted_at) return;
      var rid = String(row.reference_id);
      if (!seen[rid]) {
        seen[rid] = true;
        var num = Number(rid);
        if (!isNaN(num) && String(num) === rid) {
          merged.push(num);
        } else {
          merged.push(rid);
        }
        remoteAdded += 1;
      }
    });

    if (remoteAdded > 0) {
      setTypingFavorites(merged);
    }
    return { count: remoteBookmarks.length, merged: remoteAdded };
  }

  async function pullBookmarks(context) {
    var ctx = context;
    if (!ctx || !ctx.client) {
      var checked = await getRemoteContext();
      if (!checked.ok) return checked;
      ctx = checked.data;
    }
    try {
      var result = await ctx.client.from("bookmarks")
        .select("bookmark_type,reference_id,deleted_at")
        .eq("user_id", ctx.user.id)
        .is("deleted_at", null);
      if (result && result.error) return syncError("bookmarks_pull_failed", result.error.message, result.error);
      var data = result && result.data ? result.data : [];
      var mergeResult = mergeBookmarks(data);
      return syncSuccess({ count: data.length, merged: mergeResult.merged });
    } catch (error) {
      var friendly = friendlyRemoteError(error, "bookmarks_pull_failed");
      return syncError(friendly.code, friendly.message);
    }
  }

 
 /* Bookmark delete sync (tombstone) state management */
 var TYPING_BOOKMARK_SYNC_KEY = "study-tools-typing-bookmarks-sync-v1";
 
 function getTypingBookmarkSyncState() {
   try {
     var raw = localStorage.getItem(TYPING_BOOKMARK_SYNC_KEY);
     if (raw) {
       var parsed = JSON.parse(raw);
       if (parsed && typeof parsed === "object" && parsed.version === 1) {
         return parsed;
       }
     }
   } catch (_) {}
   return { knownFavorites: [], deletedFavorites: {}, lastSyncedAt: null, version: 1 };
 }
 
 function setTypingBookmarkSyncState(state) {
   try {
     localStorage.setItem(TYPING_BOOKMARK_SYNC_KEY, JSON.stringify(state));
   } catch (_) {}
 }
 
 function detectTypingBookmarkDeletions(currentFavorites, syncState) {
   if (!Array.isArray(currentFavorites)) currentFavorites = [];
   if (!syncState || typeof syncState !== "object") syncState = { knownFavorites: [], deletedFavorites: {} };
   if (!Array.isArray(syncState.knownFavorites)) syncState.knownFavorites = [];
   if (!syncState.deletedFavorites || typeof syncState.deletedFavorites !== "object") syncState.deletedFavorites = {};
   var now = new Date().toISOString();
   var currentSet = {};
   currentFavorites.forEach(function (id) { currentSet[String(id)] = true; });
   (syncState.knownFavorites || []).forEach(function (id) {
     var sid = String(id);
     if (!currentSet[sid] && !syncState.deletedFavorites[sid]) {
       syncState.deletedFavorites[sid] = now;
     }
   });
   currentFavorites.forEach(function (id) {
     var sid = String(id);
     if (syncState.deletedFavorites[sid]) {
       delete syncState.deletedFavorites[sid];
     }
   });
   syncState.knownFavorites = currentFavorites.slice();
   return syncState;
 }
 
 async function pushBookmarkTombstones(context) {
   var ctx = context;
   if (!ctx || !ctx.client) {
     var checked = await getRemoteContext();
     if (!checked.ok) return checked;
     ctx = checked.data;
   }
   var syncState = getTypingBookmarkSyncState();
   var deleteIds = Object.keys(syncState.deletedFavorites || {});
   if (!deleteIds.length) return syncSuccess({ count: 0 });
   var timestamp = nowISO();
   var rows = deleteIds.map(function (id) {
     return {
       user_id: ctx.user.id,
       bookmark_type: "typing_article",
       reference_id: String(id),
       label: "",
       created_at: timestamp,
       updated_at: timestamp,
       deleted_at: syncState.deletedFavorites[id] || timestamp,
     };
   });
   try {
     var result = await ctx.client.from("bookmarks").upsert(rows, {
       onConflict: "user_id,bookmark_type,reference_id",
     });
     if (result && result.error) return syncError("bookmarks_tombstone_push_failed", result.error.message, result.error);
     return syncSuccess({ count: rows.length });
   } catch (error) {
     var friendly = friendlyRemoteError(error, "bookmarks_tombstone_push_failed");
     return syncError(friendly.code, friendly.message);
   }
 }
 
 async function pullBookmarkTombstones(context) {
   var ctx = context;
   if (!ctx || !ctx.client) {
     var checked = await getRemoteContext();
     if (!checked.ok) return checked;
     ctx = checked.data;
   }
   try {
     var result = await ctx.client.from("bookmarks")
       .select("reference_id,deleted_at")
       .eq("user_id", ctx.user.id)
       .eq("bookmark_type", "typing_article")
       .not("deleted_at", "is", null);
     if (result && result.error) return syncError("bookmarks_tombstone_pull_failed", result.error.message, result.error);
     var data = result && result.data ? result.data : [];
     return syncSuccess({ count: data.length, data: data });
   } catch (error) {
     var friendly = friendlyRemoteError(error, "bookmarks_tombstone_pull_failed");
     return syncError(friendly.code, friendly.message);
   }
 }
 
 function applyTypingBookmarkDeletes(syncState, remoteTombstones, localFavorites) {
   if (!Array.isArray(localFavorites)) localFavorites = [];
   var removed = 0;
   var restored = 0;
   var newFavorites = localFavorites.slice();
   if (!remoteTombstones || !Array.isArray(remoteTombstones)) remoteTombstones = [];
   if (!syncState || typeof syncState !== "object") syncState = { deletedFavorites: {} };
   if (!syncState.deletedFavorites || typeof syncState.deletedFavorites !== "object") syncState.deletedFavorites = {};
   remoteTombstones.forEach(function (row) {
     if (!row || !row.reference_id || !row.deleted_at) return;
     var rid = String(row.reference_id);
     var idx = -1;
     for (var i = 0; i < newFavorites.length; i++) {
       if (String(newFavorites[i]) === rid) { idx = i; break; }
     }
     if (idx >= 0) {
       var localFav = getTypingFavorites();
       var inLocalFavs = false;
       for (var k = 0; k < localFav.length; k++) {
         if (String(localFav[k]) === rid) { inLocalFavs = true; break; }
       }
       if (inLocalFavs) {
         newFavorites.splice(idx, 1);
         removed++;
         syncState.deletedFavorites[rid] = row.deleted_at;
       }
     } else {
       if (!syncState.deletedFavorites[rid]) {
         syncState.deletedFavorites[rid] = row.deleted_at;
       }
     }
   });
   (getTypingFavorites() || []).forEach(function (id) {
     var sid = String(id);
     if (syncState.deletedFavorites[sid]) {
       delete syncState.deletedFavorites[sid];
       restored++;
     }
   });
   remoteTombstones.forEach(function (row) {
     if (!row || !row.reference_id || !row.deleted_at) return;
     var rid = String(row.reference_id);
     var inLocal = false;
     var localFav = getTypingFavorites();
     for (var i = 0; i < localFav.length; i++) {
       if (String(localFav[i]) === rid) { inLocal = true; break; }
     }
     if (inLocal && syncState.deletedFavorites[rid]) {
       delete syncState.deletedFavorites[rid];
       restored++;
     }
   });
   return { favorites: newFavorites, removed: removed, restored: restored };
 }
 
 async function mergeBookmarksWithTombstones(context) {
   var ctx = context;
   if (!ctx || !ctx.client) {
     var checked = await getRemoteContext();
     if (!checked.ok) return checked;
     ctx = checked.data;
   }
   var syncState = getTypingBookmarkSyncState();
   var localFavorites = getTypingFavorites();
   var out = { deleted_pushed: 0, deleted_pulled: 0, restored: 0, conflicts_resolved: 0 };
   try {
     var pushResult = await pushBookmarkTombstones(ctx);
     if (pushResult.ok) out.deleted_pushed = (pushResult.data && pushResult.data.count) || 0;
     var pullResult = await pullBookmarkTombstones(ctx);
     if (pullResult.ok) {
       var remoteTombstones = (pullResult.data && pullResult.data) || [];
       out.deleted_pulled = remoteTombstones.length;
       var applyResult = applyTypingBookmarkDeletes(syncState, remoteTombstones, localFavorites);
       if (applyResult.removed > 0 || applyResult.restored > 0) {
         setTypingFavorites(applyResult.favorites);
         out.restored = applyResult.restored;
       }
     }
     var pullActiveResult = await ctx.client.from("bookmarks")
       .select("bookmark_type,reference_id,deleted_at")
       .eq("user_id", ctx.user.id)
       .eq("bookmark_type", "typing_article")
       .is("deleted_at", null);
     if (!pullActiveResult || pullActiveResult.error) {
       /* Non-fatal */
     } else {
       var activeData = pullActiveResult.data || [];
       var mergeResult = mergeBookmarks(activeData);
       if (mergeResult && mergeResult.merged > 0) out.conflicts_resolved = mergeResult.merged;
     }
     syncState.lastSyncedAt = new Date().toISOString();
     setTypingBookmarkSyncState(syncState);
     return syncSuccess(out);
   } catch (error) {
     var friendly = friendlyRemoteError(error, "bookmarks_merge_tombstones_failed");
     return syncError(friendly.code, friendly.message);
   }
 }
 
 function getSyncSummary() {
    var status = getSyncStatus();
    var lastResult = safeGet(KEYS.LAST_SYNC_RESULT, null);
    var summary = lastResult && lastResult.ok ? lastResult.data : null;
    return {
      status: runtimeStatus,
      running: manualSyncRunning,
      last_sync_at: status.last_sync_at,
      pending_count: status.queue_pending,
      failed_count: status.queue_failed,
      last_result: lastResult,
      summary: summary ? {
        started_at: summary.started_at,
        finished_at: summary.finished_at,
        duration_ms: summary.duration_ms,
        device_registered: summary.device_registered || false,
        settings_pushed: summary.settings_pushed || false,
        settings_pulled: summary.settings_pulled || false,
        progress_pushed: summary.progress_pushed || 0,
        progress_pulled: summary.progress_pulled || 0,
        quiz_pushed: summary.quiz_pushed || 0,
        bookmarks_pushed: summary.bookmarks_pushed || 0,
        bookmarks_pulled: summary.bookmarks_pulled || 0,
        bookmarks_merged: summary.bookmarks_merged || 0,
        conflicts_detected: summary.conflicts_detected || 0,
        conflicts_resolved: summary.conflicts_resolved || 0,
         bookmarks_deleted_pushed: summary.bookmarks_deleted_pushed || 0,
         bookmarks_deleted_pulled: summary.bookmarks_deleted_pulled || 0,
         bookmarks_restored: summary.bookmarks_restored || 0,
         bookmarks_conflicts_resolved: summary.bookmarks_conflicts_resolved || 0,
        warnings: summary.warnings || [],
      } : null,
      scope: ["user_settings", "learning_progress", "quiz_results", "bookmarks"],
      automatic_sync: false,
    };
  }

  async function runManualSync() {
    if (manualSyncRunning) return syncError("already_syncing", "A manual sync is already running. Please wait.");
    manualSyncRunning = true;
    runtimeStatus = "syncing";
    var startedAt = nowISO();
    try {
      var checked = await getRemoteContext();
      if (!checked.ok) {
        runtimeStatus = "error";
        safeSet(KEYS.LAST_SYNC_RESULT, checked);
        return checked;
      }

      var context = checked.data;
      var warnings = [];
      var conflictsDetected = 0;
      var conflictsResolved = 0;
      var results = {};
       // Detect bookmark deletions before sync starts
       detectTypingBookmarkDeletions(getTypingFavorites(), getTypingBookmarkSyncState());
      var stepKeys = [
        ["device", registerDeviceRemote],
        ["settings_pull", pullUserSettings],
        ["progress_pull", pullLearningProgress],
        ["bookmarks_sync", mergeBookmarksWithTombstones],
        ["settings_push", pushUserSettings],
        ["progress_push", pushLearningProgress],
        ["quiz_push", pushQuizResults],
        ["bookmarks_push", pushBookmarks],
      ];

      var lastError = null;
      for (var index = 0; index < stepKeys.length; index += 1) {
        var stepName = stepKeys[index][0];
        var stepFn = stepKeys[index][1];
        var stepResult = await stepFn(context);
        results[stepName] = stepResult;
        if (!stepResult.ok) {
          lastError = stepResult.error;
          warnings.push(stepName + ": " + (stepResult.error.message || "failed"));
          // Continue remaining steps despite failure — don't abort mid-sync
        }
      }

      var finishedAt = nowISO();
      var durationMs = new Date(finishedAt).getTime() - new Date(startedAt).getTime();

      // Count conflicts in progress merge
      if (results.progress_pull && results.progress_pull.ok && results.progress_pull.data) {
        conflictsDetected = results.progress_pull.data.count || 0;
        conflictsResolved = results.progress_pull.data.merged || 0;
      }

      var summaryData = {
        started_at: startedAt,
        finished_at: finishedAt,
        duration_ms: durationMs,
        device_registered: results.device && results.device.ok,
        settings_pushed: results.settings_push && results.settings_push.ok,
        settings_pulled: results.settings_pull && results.settings_pull.ok,
        progress_pushed: results.progress_push && results.progress_push.ok ? (results.progress_push.data && results.progress_push.data.count) || 0 : 0,
        progress_pulled: results.progress_pull && results.progress_pull.ok ? (results.progress_pull.data && results.progress_pull.data.count) || 0 : 0,
        quiz_pushed: results.quiz_push && results.quiz_push.ok ? (results.quiz_push.data && results.quiz_push.data.count) || 0 : 0,
        bookmarks_pushed: results.bookmarks_push && results.bookmarks_push.ok ? (results.bookmarks_push.data && results.bookmarks_push.data.count) || 0 : 0,
        bookmarks_pulled: results.bookmarks_sync && results.bookmarks_sync.ok ? (results.bookmarks_sync.data && results.bookmarks_sync.data.deleted_pulled) || 0 : 0,
        bookmarks_merged: results.bookmarks_sync && results.bookmarks_sync.ok ? (results.bookmarks_sync.data && results.bookmarks_sync.data.conflicts_resolved) || 0 : 0,
        bookmarks_deleted_pushed: results.bookmarks_sync && results.bookmarks_sync.ok ? (results.bookmarks_sync.data && results.bookmarks_sync.data.deleted_pushed) || 0 : 0,
        bookmarks_deleted_pulled: results.bookmarks_sync && results.bookmarks_sync.ok ? (results.bookmarks_sync.data && results.bookmarks_sync.data.deleted_pulled) || 0 : 0,
        bookmarks_restored: results.bookmarks_sync && results.bookmarks_sync.ok ? (results.bookmarks_sync.data && results.bookmarks_sync.data.restored) || 0 : 0,
        bookmarks_conflicts_resolved: results.bookmarks_sync && results.bookmarks_sync.ok ? (results.bookmarks_sync.data && results.bookmarks_sync.data.conflicts_resolved) || 0 : 0,
        conflicts_detected: conflictsDetected,
        conflicts_resolved: conflictsResolved,
        warnings: warnings,
      };

      if (lastError) {
        runtimeStatus = "error";
        var partial = syncError("sync_partial_failure", "Sync completed with errors.", {
          step: null,
          results: results,
          summary: summaryData,
        });
        safeSet(KEYS.LAST_SYNC_RESULT, partial);
        return partial;
      }

      setLastSyncAt(finishedAt);
      setSyncEnabled(true);
      runtimeStatus = "success";
      var success = syncSuccess(summaryData);
      safeSet(KEYS.LAST_SYNC_RESULT, success);
      return success;
    } catch (error) {
      runtimeStatus = "error";
      var friendly = friendlyRemoteError(error, "manual_sync_failed");
      var failed = syncError(friendly.code, friendly.message, { started_at: startedAt });
      safeSet(KEYS.LAST_SYNC_RESULT, failed);
      return failed;
    } finally {
      manualSyncRunning = false;
    }
  }

  /* ── Public API ──────────────────────────────────── */
  var SyncEngine = {
    getOrCreateDeviceId:  getOrCreateDeviceId,
    getDeviceId:          getDeviceId,
    getSyncQueue:         getSyncQueue,
    enqueueSyncEvent:     enqueueSyncEvent,
    markSyncEventDone:    markSyncEventDone,
    markSyncEventFailed:  markSyncEventFailed,
    clearSyncQueue:       clearSyncQueue,
    getAllLocalProgress:  getAllLocalProgress,
    getLocalUserSettings: getLocalUserSettings,
    getSyncStatus:        getSyncStatus,
    exportLocalSyncSnapshot: exportLocalSyncSnapshot,
    setLastSyncAt:        setLastSyncAt,
    setSyncEnabled:       setSyncEnabled,
    getSyncQueueSize:     getSyncQueueSize,
    getLastSyncAt:        getLastSyncAt,
    setSyncEnabledLocal:  setSyncEnabledLocal,
    isSyncEnabled:        isSyncEnabled,
    getDeviceSummary:     getDeviceSummary,
    registerDeviceRemote: registerDeviceRemote,
    pushUserSettings:     pushUserSettings,
    pullUserSettings:     pullUserSettings,
    pushLearningProgress: pushLearningProgress,
    pullLearningProgress: pullLearningProgress,
    pushQuizResults:      pushQuizResults,
    pushBookmarks:        pushBookmarks,
    pullBookmarks:        pullBookmarks,
    mergeBookmarks:       mergeBookmarks,
    getTypingBookmarkSyncState: getTypingBookmarkSyncState,
    detectTypingBookmarkDeletions: detectTypingBookmarkDeletions,
    pushBookmarkTombstones: pushBookmarkTombstones,
    pullBookmarkTombstones: pullBookmarkTombstones,
    applyTypingBookmarkDeletes: applyTypingBookmarkDeletes,
    mergeBookmarksWithTombstones: mergeBookmarksWithTombstones,
    runManualSync:        runManualSync,
    getSyncSummary:       getSyncSummary,
    _keys:                KEYS,
  };

  // Auto-init device ID on load
  getOrCreateDeviceId();

  // Expose globally
  window.StudySync = window.StudySync || SyncEngine;

})();
