# Backup Import Strategy — Merge Design & Safety Model

> **Round 34.0** — Pre-audit and merge strategy design only.
> **No runtime import code is implemented in this Round.**

**Author**: Senior Developer
**Audit date**: 2026-06-16
**Source baseline**: Round 33.0 (v2026.6.15-r33.0, export-data.js schema v1)

---

## 1. Background

Round 32.0 delivered a learning-data export MVP (`export-data.js`).
Round 33.0 hardened it with recursive sensitive-field filtering, schema versioning, and cross-device
export verification.

Users now have `.json` backup files on disk that they may wish to restore onto a different device
(e.g. from Windows to a phone browser, or after clearing localStorage). A read-only **preview** and
a safe, opt-in **import** workflow are the natural next steps.

This document designs the full import strategy so that:

- Round 35.0 implements a **read-only preview** (no writes, no uploads).
- A future Round (37.0+) implements **actual import** following this design.

---

## 2. Current Export Structure (schemaVersion 1)

```json
{
  "schemaVersion": 1,
  "exportedAt":   "2026-06-15T12:34:56.789Z",
  "appVersion":   "v2026.6.15-r33.0",
  "source":       "study-tools-local-backup",
  "warnings":     ["quizResults"],
  "sections": {
    "completedLessons": {
      "sql_hub_completed":     ["lesson-01", ...],
      "itpass_completed_lessons": [...],
      "sg_completed_lessons":     [...],
      "python_completed_lessons": [...],
      "java_completed_lessons":   [...]
    },
    "quizResults": {
      "sql_quiz_completed_12":   [...],
      "itpass_progress_03":      {...},
      ...
    },
    "wrongBook": [
      {"itemKey": "it-sql-injection", "exam": "itpass", "wrongCount": 3, ...},
      ...
    ],
    "bookmarks": [
      {"type": "typing_article", "reference_id": "article-01", ...},
      ...
    ],
    "typingHistory": {
      "study-tools-japanese-typing-v1":     {...},
      "study-tools-coding-typing-history-v1": [...]
    },
    "examHistory": [
      {"sessionId": "exam-20260615-001", "exam": "itpass", ...},
      ...
    ],
    "dashboardGoals": null,
    "syncSummary": {
      "lastSyncAt":    "2026-06-15T10:00:00Z",
      "lastSyncResult": "success"
    },
    "userSettings": {
      "language": "zh-CN",
      "theme": "dark",
      "wrongBookRetrySettings": {...}
    }
  }
}
```

### Sensitive-field denylist (applied recursively by `export-data.js`)

Any key whose lowercase form **contains** one of these substrings is stripped:

`supabase`, `sb-`, `workbuddy`, `codebuddy`, `ai_provider`, `openai`,
`anthropic`, `gemini`, `deepseek`, `ai_`, `ai_api`, `api_key`, `apikey`,
`token`, `session`, `jwt`, `cookie`, `password`, `credential`,
`private_key`, `secret`, `auth_token`, `device_id`, `deviceid`,
`installation_id`, `installationid`

Plus exact-denied localStorage keys:

`study-tools-sync-queue`, `study-tools-sync-enabled`,
`study-tools-queue-version`, `study-tools-typing-synced-keys`,
`study-tools-exam-synced-keys`, `study-tools-typing-bookmarks-sync-v1`,
`study-tools-wrong-book-sync-meta-v1`

---

## 3. Importable vs Non-Importable Sections

| Section              | Importable? | Reasoning |
|----------------------|-------------|-----------|
| `completedLessons`   | ✅ YES      | Union-merge only add; never delete local completions. |
| `quizResults`        | ✅ YES      | Dedup by `subject + lesson_id + quiz_index`, keep newer/better. |
| `wrongBook`          | ✅ YES      | Merge by `itemKey`, `wrongCount` take max, dates take newer. |
| `bookmarks`          | ✅ YES      | Union-merge by `type + reference_id`, never delete local. |
| `typingHistory`      | ✅ YES      | Merge without duplicate sessions. Skip entries with bad timestamps. |
| `examHistory`        | ✅ YES      | Merge by `sessionId`. Skip entries without `sessionId`. |
| `dashboardGoals`     | ⚠️ OPT-IN   | Never auto-import. User must explicitly check a box. |
| `syncSummary`        | ❌ NO       | Never import. These values must only come from actual sync. |
| `userSettings`       | ⚠️ OPT-IN   | Language/theme optional. Not imported by default. |

### Explicitly NEVER imported (hard block)

- `syncSummary` fields — must always reflect real sync state
- Any field matching the denylist (even if somehow present in the backup)
- `source`, `exportedAt`, `appVersion` (metadata only)
- Any `device_id` or installation identifier

---

## 4. Per-Section Merge Strategy

### 4.1 completedLessons / learning_progress

**Merge mode**: Union-only add

```
For each subject in backup:
  local_set  = set of completed lesson_ids from localStorage
  backup_set = set of completed lesson_ids from backup
  merged     = local_set ∪ backup_set  (union, no deletion)
```
- A lesson once completed in localStorage **stays completed**.
- The backup cannot "un-complete" a lesson.
- If the user has deliberately reset progress, that intent is preserved.

### 4.2 quizResults

**Merge mode**: Deduplicate by `(subject, lesson_id, quiz_index)`, keep better

```
For each quiz key in backup:
  local_entries  = parse localStorage[key] || []
  backup_entries = backup.sections.quizResults[key] || []
  For each backup entry:
    Find local entry with same quiz_index
    If not found → append
    If found AND backup entry has newer answered_at → replace
    If found AND backup entry has equal/newer correct status → replace
    Otherwise → keep local
```

**Rationale**: A user may have answered the same quiz question on two devices.
The newer answer (higher timestamp) or the correct answer wins.

### 4.3 wrongBook

**Merge mode**: Merge by `itemKey`

```
local  = Map of itemKey → wrong_book item
backup = Map of itemKey → wrong_book item

For each backup item:
  If itemKey not in local → insert
  If itemKey in local:
    merged.wrongCount   = Math.max(local.wrongCount, backup.wrongCount)
    merged.lastWrongAt   = newer(local.lastWrongAt, backup.lastWrongAt)
    merged.lastPracticedAt = newer(local.lastPracticedAt, backup.lastPracticedAt)
    If backup.archived XOR local.archived → flag as CONFLICT, keep local, warn user
```

**Rationale**:
- `wrongCount` uses `max()` because the user may have accumulated errors on either device; the
  higher count better reflects total practice needs.
- Dates use `newer()` because the more recent activity is more relevant.
- `archived` conflicts are the only case where auto-resolution is unsafe — the user must decide.

### 4.4 bookmarks

**Merge mode**: Union by `(type || "typing_article", reference_id)`

```
local_ids  = Set of "type::reference_id" from localStorage
backup_ids = Set of "type::reference_id" from backup

For each backup bookmark:
  If composite_id not in local_ids → insert
  If composite_id in local_ids → skip (keep local)
```

- Bookmarks are never **deleted** by import.
- If a bookmark was removed locally, it stays removed (tombstone logic does NOT apply to import).
- Bookmarks without a `reference_id` field are skipped with a warning.

### 4.5 typingHistory

**Merge mode**: Merge arrays/objects, skip duplicates

```
Local Japanese typing:  parse "study-tools-japanese-typing-v1"
Backup Japanese typing: backup.sections.typingHistory["study-tools-japanese-typing-v1"]

For backup jpTyping.sessions:
  If session has no completedAt AND no date → SKIP with warning
  If same session_id OR (same title + completedAt) exists locally → SKIP
  Otherwise → append

Local Coding typing:  parse "study-tools-coding-typing-history-v1"
Backup Coding typing: backup.sections.typingHistory["study-tools-coding-typing-history-v1"]

For backup coding entries:
  IF no completedAt → SKIP with warning
  If duplicate by (title, completedAt) → SKIP
  Otherwise → append
```

### 4.6 examHistory

**Merge mode**: Merge by `sessionId`

```
local  = Map of sessionId → exam entry
backup = Map of sessionId → exam entry (skip entries without sessionId)

For each backup entry:
  If sessionId not in local → insert
  If sessionId in local → skip (keep local), count as duplicate
```

- Entries without `sessionId` are skipped (with warning). For Round 35.0 preview only:
  the recommended fix for a future import is to generate a stable hash from
  `(exam, startedAt, completedAt, correctCount, totalQuestions)` and treat that as
  the dedup key. DO NOT generate hashes in the preview — just flag them.

### 4.7 dashboardGoals

**Merge mode**: NEVER auto-import

```
dashboardGoals is OPT-IN only.
User must explicitly check a box labeled "Import learning goals" (unchecked by default).
If checked:
  - Overwrite localStorage "study-tools-dashboard-goals-v1" with backup value
  - Validate goal ranges (0-999, integer)
  - Validate goal keys are known (weeklyExams, weeklyTyping, weeklyCoding)
```

**Rationale**: Goals are local-only, no sync. Importing them silently would be surprising.

### 4.8 userSettings

**Merge mode**: NEVER auto-import

```
userSettings.language  → OPT-IN checkbox, default OFF
userSettings.theme     → OPT-IN checkbox (same as language, bundled)
userSettings.wrongBookRetrySettings → OPT-IN checkbox (separate, default OFF)
```

- Sync-state (`syncSummary`) is never imported.
- Language/theme overwrite can be jarring — must be opt-in.

### 4.9 syncSummary — HARD BLOCK

**Always blocked.** The values `lastSyncAt` and `lastSyncResult` must only ever be set by
actual sync operations (`sync-engine.js`). Importing them would trick the system into
believing a sync occurred when it did not.

---

## 5. Risk Model

### P0 (Import must be blocked or aborted)

| Risk | Mitigation |
|------|------------|
| Import overwrites local data | Union-merge only. Pre-import snapshot is auto-created. |
| Malicious JSON triggers XSS | All values rendered via `textContent`. No `innerHTML`. No `eval`. |
| Sensitive fields enter localStorage | Same denylist as export, applied to every value before `setItem`. |
| Import triggers auto-sync | Sync is NEVER triggered by import. User must manually sync after review. |
| Import breaks sync-engine dedup | Import does NOT touch `synced_keys`, `sync-queue`, or `push=0` state. |

### P1 (User must be warned)

| Risk | Mitigation |
|------|------------|
| Duplicate wrong_book / history entries | Dedup by key fields. Preview shows "duplicates: N" before import. |
| Old backup overwrites newer data | Date comparison in merge logic. Preview shows "conflicts: N". |
| Cross-device timestamp skew | `lastWrongAt > now()` → flag as warning, use `min(value, now)`. |
| Dashboard numbers become inconsistent | Dashboard recalculates from data on next open. This is normal. |
| Schema version mismatch | Preview blocks import if `schemaVersion > current`. Warns if `schemaVersion < current`. |

### P2 (Cosmetic or edge-case)

| Risk | Mitigation |
|------|------------|
| Some sections not importable | Preview clearly labels non-importable sections. |
| Timestamps missing on some entries | Skipped with warning count shown in preview. |
| User settings overwrite surprise | Opt-in checkboxes, clearly labeled. |
| File > 5 MB causes lag | Reject before parsing. Show "file too large" message. |

---

## 6. UX Flow

```
 ┌──────────────────┐
 │ 1. Select file    │  <input type="file" accept=".json">
 └──────┬───────────┘
        ▼
 ┌──────────────────┐
 │ 2. Parse JSON     │  JSON.parse() in try/catch
 └──────┬───────────┘
        ▼  (parse failed → error toast, STOP)
 ┌──────────────────┐
 │ 3. Security scan  │  Recursive denylist check
 └──────┬───────────┘
        ▼  (sensitive found → "blocked: N sensitive fields", preview may still show counts)
 ┌──────────────────┐
 │ 4. Schema check   │  Compare schemaVersion with supported range
 └──────┬───────────┘
        ▼  (incompatible → error, STOP)
 ┌──────────────────┐
 │ 5. Size check     │  JSON string length > 5 MB → reject
 └──────┬───────────┘
        ▼
 ┌───────────────────────────────────────────────┐
 │ 6. Build preview report                        │
 │    ┌──────────────────────────────────────┐    │
 │    │ Section        │ New │ Conflict │ Skip│    │
 │    │ completedLessons│  3  │    0     │  0  │    │
 │    │ quizResults    │  12  │    5     │  1  │    │
 │    │ wrongBook      │   2  │    1     │  0  │    │
 │    │ bookmarks      │   5  │    0     │  0  │    │
 │    │ typingHistory  │   3  │    0     │  2  │    │
 │    │ examHistory    │   7  │    0     │  1  │    │
 │    │ dashboardGoals │   —  │    —     │  —  │    │
 │    │ userSettings   │   —  │    —     │  —  │    │
 │    │ syncSummary    │   —  │    —     │  —  │    │
 │    └──────────────────────────────────────┘    │
 │    Warnings: 2 damaged entries skipped          │
 │    Blocked: 0 sensitive fields detected         │
 │    Schema: v1 (compatible)                      │
 │    Exported: 2026-06-15 (3 days ago)            │
 └──────┬────────────────────────────────────────┘
        ▼
 ┌───────────────────────────────────────┐
 │ 7. User action                          │
 │    [ ] Import dashboard goals (OFF)     │
 │    [ ] Import settings (OFF)            │
 │    [Cancel]  [Preview Only — Close]     │
 │                                          │
 │    (Round 35.0: NO "Confirm Import")     │
 │    (Future Round: [Confirm & Import])    │
 └───────────────────────────────────────┘
        ▼  (user closes preview)
 ┌──────────────────┐
 │ 8. Clean up       │  Reset preview state. No localStorage writes occurred.
 └──────────────────┘
```

### Key UX principles

1. **Default to safe**: Everything is preview-only. Import is opt-in.
2. **Clear language**: "只读预览，不会修改当前数据" in all 4 languages.
3. **No auto-sync**: After import (future), the user must manually trigger sync.
4. **Snapshot before import**: Create a pre-import backup key `study-tools-pre-import-snapshot`
   before any write begins.
5. **Rollback possible**: If import fails mid-way, restore from snapshot.

---

## 7. Security Strategy

### 7.1 Recursive sensitive-field scan (apply on import, too)

The **same denylist** used in `export-data.js` MUST be applied to every key and value
before writing to localStorage during import.

```
function isSensitiveKey(key) {
  // Same DENY_PARTS + DENY_EXACT as export-data.js
}

function sanitizeImportValue(obj) {
  // Recursively strip any key matching the denylist
}
```

### 7.2 Content rendering safety

- All backup content displayed in the preview panel MUST use `textContent`, never `innerHTML`.
- No `eval`, no `new Function`, no `document.write`.
- File name displayed as `textContent` (could contain XSS payload).
- Numbers displayed via `Number(value).toString()` to prevent NaN/Infinity rendering.

### 7.3 File handling

- `FileReader.readAsText()` — safe, browser-managed.
- `JSON.parse()` — safe within try/catch.
- `URL.createObjectURL()` — only if needed for download (not for preview).
- File size checked BEFORE parsing: `file.size > 5 * 1024 * 1024` → reject.

### 7.4 Storage isolation

- Import MUST NOT call `StudySync.*` or any Supabase operation.
- Import MUST NOT create sync queue events.
- Import MUST NOT modify `study-tools-sync-*` keys.
- Import MUST NOT modify `study_tools_device_id`.
- Import MUST NOT call `StudySync.runManualSync()` or `StudySync.enqueueSyncEvent()`.

---

## 8. Rollback Strategy

### 8.1 Pre-import snapshot

Before any import write begins, create:

```
localStorage key: study-tools-pre-import-snapshot
Value: {
  createdAt: ISO timestamp,
  keys: {
    "sql_hub_completed": <deep copy>,
    "study-tools-exam-wrong-book-v1": <deep copy>,
    ...
  }
}
```

Only snapshot the keys that WILL be modified by import (not all of localStorage).

### 8.2 Rollback procedure

If import fails mid-way (e.g. writes to 3 of 8 keys then throws):

1. Log the failure with the key that caused it.
2. Restore ALL snapshotted keys from `study-tools-pre-import-snapshot`.
3. Show error: "导入失败，数据已回滚到导入前状态。"
4. Keep the snapshot for 1 hour, then auto-delete.

### 8.3 Success cleanup

On successful import:
1. Clear `study-tools-pre-import-snapshot`.
2. Write import log: `study-tools-last-import-log` with summary (new/conflict/skip counts).
3. Refresh Dashboard if open.

---

## 9. Verification Plan

### 9.1 Round 35.0 preview tests (no writes)

| Test | Expected |
|------|----------|
| Empty backup | "No importable data found" |
| Normal backup | Table shows new/conflict/skip counts |
| Corrupt JSON | "File parse failed" toast |
| Missing schemaVersion | "Unknown backup format" |
| Future schemaVersion (999) | "Incompatible backup version" |
| Sensitive field in backup | "Blocked: N fields", field values hidden |
| XSS payload in title | Rendered as text, not executed |
| File > 5 MB | "File too large" rejected |
| Duplicate data | Counted as "conflict" |
| localStorage before/after | Identical (verified by reading all keys) |
| Sync engine not called | Verified via spy/mock |
| No network requests | Verified via browser devtools |
| Mobile 390px / 430px | Preview panel fits, no horizontal scroll |
| Close preview | Panel dismissed, DOM cleaned |

### 9.2 Future Round import tests (with writes)

| Test | Expected |
|------|----------|
| Pre-import snapshot exists | Verified before any write |
| Union merge (lessons) | local + backup = merged |
| Dedup (quiz) | No duplicate quiz_index entries |
| Max wrongCount | wrongCount = max(local, backup) |
| Newer dates win | lastWrongAt = more recent |
| archived conflict | Warning shown, user chooses |
| Bookmarks union | No duplicates, no deletions |
| Typing session dedup | No duplicate sessions |
| Exam sessionId merge | No duplicate sessionIds |
| Rollback on failure | Data restored to pre-import state |
| Post-import Dashboard | Numbers consistent with merged data |
| No sync triggered | sync queue unchanged |

---

## 10. Round 35.0 Implementation Notes

### 10.1 What to implement

A single new JS module: `assets/js/import-preview.js`

**Functions** (exposed via `window.ImportPreview`):

| Function | Description |
|----------|-------------|
| `readBackupFile(file)` | Read `File` via `FileReader`, return text. Reject if > 5 MB. |
| `parseBackupJson(text)` | `JSON.parse` in try/catch. Return object or null. |
| `scanSensitiveFields(obj)` | Recursive denylist scan. Return count of blocked fields. |
| `validateBackupSchema(obj)` | Check `schemaVersion` exists and ≤ current (1). Return `{ok, reason}`. |
| `buildImportPreview(backup)` | Compare backup sections against current `localStorage`. Return preview object. |
| `renderImportPreview(preview)` | Render HTML table in preview panel. `textContent` only. |
| `clearImportPreview()` | Reset state, remove DOM nodes. |
| `neverWriteLocalStorage()` | Assertion function — called after every operation to verify 0 writes. |

### 10.2 Entry point

Add to Tools Drawer (in `index.html`), between export-data and dashboard:

```html
<button type="button" class="tools-drawer-item" data-action="import-preview">
  <span class="tools-drawer-item__icon">📥</span>
  <span class="tools-drawer-item__text">
    <strong data-i18n="tools.importPreview">预览导入备份</strong>
    <small data-i18n="tools.importPreviewDesc">只读预览，不会修改当前数据</small>
  </span>
</button>
```

### 10.3 app.js handler

```javascript
if (action === 'import-preview') {
  closeDrawer();
  if (window.ImportPreview && typeof window.ImportPreview.openPreview === 'function') {
    window.ImportPreview.openPreview();
  }
  return;
}
```

### 10.4 i18n keys (all 4 languages)

| Key | zh-CN | ja-JP | en-US | ko-KR |
|-----|-------|-------|-------|-------|
| `tools.importPreview` | 预览导入备份 | バックアップインポートのプレビュー | Preview Backup Import | 백업 가져오기 미리보기 |
| `tools.importPreviewDesc` | 只读预览，不会修改当前数据 | 読み取り専用プレビュー、データは変更されません | Read-only preview, no data will be modified | 읽기 전용 미리보기, 데이터가 수정되지 않음 |
| `tools.importSelectFile` | 选择备份文件 | バックアップファイルを選択 | Select backup file | 백업 파일 선택 |
| `tools.importParseFailed` | 文件解析失败 | ファイル解析に失敗しました | File parse failed | 파일 구문 분석 실패 |
| `tools.importSensitiveBlocked` | 检测到敏感字段，已阻止 | 機密フィールドが検出され、ブロックされました | Sensitive fields detected, blocked | 민감한 필드가 감지되어 차단됨 |
| `tools.importImportable` | 可导入数据 | インポート可能なデータ | Importable data | 가져오기 가능한 데이터 |
| `tools.importNew` | 新增 | 新規 | New | 신규 |
| `tools.importConflict` | 冲突 | 競合 | Conflict | 충돌 |
| `tools.importSkipped` | 跳过 | スキップ | Skipped | 건너뜀 |
| `tools.importIncompatibleVersion` | 不兼容的备份版本 | 互換性のないバックアップバージョン | Incompatible backup version | 호환되지 않는 백업 버전 |
| `tools.importFileTooLarge` | 文件过大 | ファイルが大きすぎます | File too large | 파일이 너무 큽니다 |
| `tools.importClosePreview` | 关闭预览 | プレビューを閉じる | Close preview | 미리보기 닫기 |
| `tools.importSummary` | 导入摘要 | インポート概要 | Import summary | 가져오기 요약 |
| `tools.importNoData` | 无可导入数据 | インポート可能なデータがありません | No importable data | 가져오기 가능한 데이터 없음 |

### 10.5 File size limit

- **5 MB** (5,242,880 bytes) — checked on `file.size` before `readAsText`.
- Rationale: localStorage total is ~5-10 MB per origin. A backup that imports > 5 MB of data
  would risk exceeding the quota. The preview file itself may be slightly larger due to
  whitespace/formatting, so the limit is on `file.size` not parsed data size.

### 10.6 Web version bump

If runtime code is added:
- `v2026.6.15-r33.0` → `v2026.6.15-r35.0` (skipping r34.0 since it's doc-only)
- CACHE_NAME → `study-tools-web-v2026-6-15-r35-0`
- All version query params updated

---

## 11. Declarations

- ✅ Round 34.0 does NOT implement any import functionality.
- ✅ Round 34.0 does NOT modify any runtime code.
- ✅ Round 34.0 does NOT write to localStorage.
- ✅ Round 34.0 does NOT contact any remote server.
- ✅ Round 34.0 does NOT create new Supabase tables or run SQL.
- ✅ This document is the sole deliverable of Round 34.0.
- ✅ Round 35.0 will implement the **read-only preview only** (no writes).
- ✅ Actual import (with writes) is deferred to a future Round (37.0+).

---

## Appendix A: Relevant localStorage Keys (Complete Inventory)

### Core learning data (exported & importable)
| Key | Type | Section |
|-----|------|---------|
| `sql_hub_completed` | Array | completedLessons |
| `itpass_completed_lessons` | Array | completedLessons |
| `sg_completed_lessons` | Array | completedLessons |
| `python_completed_lessons` | Array | completedLessons |
| `java_completed_lessons` | Array | completedLessons |
| `*_quiz_completed_*` | Array | quizResults |
| `*_progress_*` | Object | quizResults |
| `study-tools-exam-wrong-book-v1` | Array | wrongBook |
| `study-tools-japanese-typing-v1` | Object | typingHistory + bookmarks |
| `study-tools-coding-typing-history-v1` | Array | typingHistory |
| `study-tools-exam-history-v1` | Array | examHistory |
| `study-tools-dashboard-goals-v1` | Object | dashboardGoals |
| `study-tools-language` | String | userSettings |
| `study-tools-theme` | String | userSettings |
| `study-tools-wrong-book-retry-settings-v1` | Object | userSettings |
| `study_tools_last_sync_at` | String | syncSummary |
| `study_tools_last_sync_result` | String | syncSummary |

### Sync/internal (never exported, never imported)
| Key | Purpose |
|-----|---------|
| `study_tools_device_id` | Device identity |
| `study_tools_sync_queue` | Pending sync events |
| `study_tools_sync_enabled` | Sync toggle |
| `study_tools_queue_version` | Queue schema version |
| `study_tools_settings_updated_at` | Settings timestamp |
| `study_tools_typing_synced_keys` | Typing sync tracker |
| `study_tools_exam_synced_keys` | Exam sync tracker |
| `study-tools-sync-queue` | (alias) |
| `study-tools-sync-enabled` | (alias) |
| `study-tools-queue-version` | (alias) |
| `study-tools-typing-synced-keys` | (alias) |
| `study-tools-exam-synced-keys` | (alias) |
| `study-tools-typing-bookmarks-sync-v1` | Bookmark sync meta |
| `study-tools-wrong-book-sync-meta-v1` | Wrong book sync meta |

### Sensitive (never exported, never imported)
| Key pattern | Content |
|-------------|---------|
| `sb-*` | Supabase auth tokens |
| `workbuddy*` | IDE state |
| `codebuddy*` | IDE state |
| `ai_provider*` | AI config |
| Any key containing `token`, `key`, `secret`, `password` | Credentials |
