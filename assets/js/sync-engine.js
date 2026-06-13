/**
 * Study Tools Sync Engine — v0.1 (Round 17.1)
 *
 * Local-only sync foundation:
 *  - device ID generation & persistence
 *  - sync queue management (localStorage-backed)
 *  - local progress snapshot & export
 *  - no network calls, no Supabase dependency
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
    _keys:                KEYS,
  };

  // Auto-init device ID on load
  getOrCreateDeviceId();

  // Expose globally
  window.StudySync = window.StudySync || SyncEngine;

})();
