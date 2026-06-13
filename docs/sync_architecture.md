# Study Tools — Cross-Device Sync Architecture

## Overview

This document describes the architecture, data model, and roadmap for adding user login and cross-device sync to the Study Tools project.

## Round 17.1 Goal

Establish the **local-only sync foundation**: device ID, sync queue, local progress snapshot, and Supabase SQL DDL draft.  
No real login, no cloud sync, no UI changes.

## Round 17.3: Supabase Auth Preparation Layer

Round 17.3 only prepares a safe browser boundary for a future Supabase Auth integration.

- **No-network by default:** empty or disabled configuration returns local status/error values before a client can be created.
- **Local-first:** the existing auth UI, mock sign-in, localStorage state, snapshot export, lessons, and glossary continue to work without Supabase.
- **Configuration strategy:** commit only `supabase-config.example.js`; keep real values in ignored `supabase-config.local.js`.
- **SDK boundary:** `window.StudySupabase` is the only app-facing adapter. Feature code must not call the Supabase SDK directly.
- **Security red lines:** never commit `service_role`, database passwords, JWT secrets, user passwords, sessions, or tokens. Never put `service_role` in browser code.
- **No cloud sync yet:** the sync queue remains local and no auth/sync network request is implemented.

Preparation files:

| File | Role |
|:---|:---|
| `assets/js/supabase-config.example.js` | Empty, disabled configuration template |
| `assets/js/supabase-config.local.js` | Developer-only real configuration; ignored by Git |
| `assets/js/supabase-client.js` | Fail-closed client adapter exposed as `window.StudySupabase` |
| `docs/supabase_setup.md` | Beginner setup and RLS safety guide |

## Round 17.4: Manual Setup Validation

- No real Supabase project was created or contacted during repository validation.
- `index.html` contains only commented optional slots for local config and the SDK CDN; external loading remains disabled.
- The committed client loads locally and reports `not_configured`, `disabled`, `sdk_missing`, or `ready_to_initialize` without throwing.
- A complete local config with `enabled: false` is recognized but cannot initialize a client.
- The SQL draft now enables RLS on all seven user-owned tables and uses both `USING` and `WITH CHECK` with `auth.uid() = user_id`.
- Real login UI and cloud synchronization remain outside this round.

## Authentication Strategy

We **do not self-host passwords**. Auth is delegated to **Supabase Auth** (built-in):

### Round 17.5 Minimal Auth Boundary

- Auth-only SDK calls are allowed after explicit local configuration and SDK loading.
- Supported operations: session/user detection, Magic Link, test email/password sign-in, auth-state listener, and sign-out.
- Passwords are never persisted by Study Tools; sessions remain owned by the Supabase SDK.
- A real authenticated user maps to local auth mode `signed_in` with `sync_enabled: false`.
- No learning table is queried or mutated, and the local sync queue is not pushed or pulled.

### Round 17.6 Manual Learning Sync

Round 17.6 adds an optional, user-triggered P0 synchronization path.

- Sync starts only from the account panel's **Sync now** button.
- A valid Supabase configuration, loaded SDK, initialized client, and authenticated user are required before table access.
- The device is registered or updated before data synchronization.
- `user_settings` synchronizes only the language and theme whitelist. Remote settings use last-write-wins timestamps and invalid values fall back to local safe defaults.
- `learning_progress` is pulled and union-merged into local course completions and quiz indices before the merged local snapshot is pushed.
- `quiz_results` is push-only in this round and uses a deterministic conflict key to avoid duplicate manual-sync rows.
- Pull never removes local completion data and never performs destructive deletes.
- Errors stop the current manual run and return friendly local result objects.
- There is no timer, background listener, login-triggered sync, or automatic retry.

The synchronization payload explicitly excludes AI API keys, AI provider/model settings, Ollama URLs, AI translation caches, chat messages, user translations, bookmarks, and service-worker data.

### Round 17.9 Sync Conflict Handling & UX Patch

Round 17.9 improves the manual sync reliability and user feedback without changing the sync strategy.

**Conflict handling rules:**

- **Course completion** (is_completed): union merge — local and remote completions are merged. Remote `is_completed: false` does NOT remove local completion.
- **Quiz indices** (quiz_completed_indices): union merge — both local and remote completed question indices are combined. Empty remote array does NOT clear local non-empty array.
- **Per-lesson detail** (quizDone, codeRun): OR merge — only adds flags, never clears them.
- **User settings** (language, theme): LWW (last-write-wins) by `updated_at` timestamp. Invalid/empty remote values do NOT overwrite valid local values.
- **Quiz results**: push-only with upsert conflict key `(user_id, subject, lesson_id, quiz_index, device_id)`.

**Manual sync UX improvements:**

- **Double-click protection**: calling `runManualSync()` while a sync is in progress returns `{error: {code: "already_syncing"}}` immediately.
- **Sync summary**: after completion, the account panel shows structured summary: progress pushed/pulled count, quiz results count, conflicts resolved, duration in seconds.
- **Partial failure**: if one step fails (e.g. quiz_push), remaining steps still complete. Warnings are collected and shown.
- **Timing**: `started_at`, `finished_at`, `duration_ms` are recorded.
- **last_sync_at**: updated on successful full sync only; partial failures do NOT update it.
- **No data loss**: sync never removes local progress. Pull is `IS NULL` filtered for `deleted_at`.

**i18n additions (Round 17.9):**

- `alreadySyncing` — "Syncing, please wait"
- `syncFailedDetail` — "Some sync steps failed, please retry"
- `progressPushed`, `progressPulled`, `quizPushed` — sync step counts
- `conflictsResolved` — "Merged remote progress"
- `mergedRemote`, `localKept` — merge feedback
- `noDataToSync` — "No data to sync"
- `syncSummaryTitle` — "Sync summary"
- `noAiDataUpload` — "AI data is never uploaded"

### Round 17.10: Localized Auth UI & Layout Slimming

Round 17.10 optimizes the Auth UI and sync panel layout for all 7 supported languages.

- **Full Internationalization**: All user-visible strings are mapped to keys in `i18n-ui-dict.js` across 7 locales (`zh-CN`, `ja-JP`, `en-US`, `vi-VN`, `fr-FR`, `my-MM`, `ko-KR`).
- **Instant Language Switching**: Listens to the `i18n:languageChanged` event. When the user changes the app's language, the auth panel header, buttons, badges, and sync summary immediately repaint in the new language without requiring page refresh or re-login.
- **Layout Slimming**: Reorganizes the panel into 4 concise zones:
  - **A. Status**: Current user email, Supabase SDK state, sync mode (local/synced).
  - **B. Syncing**: Manual sync button, pending queue size, last synced timestamp, truncated Device ID, and a collapsible `<details>` panel for the recent sync summary.
  - **C. Login**: Single email field sharing Magic Link and Test Password Login, Sign Out button (active only when logged in), and secondary actions (mock sign-in, snapshot export, continue local).
  - **D. Privacy**: A clear bulleted list highlighting security guarantees (no automatic sync, only syncs progress and settings, never uploads AI keys).
- **Responsive & Dark Mode**: Responsive adjustments for mobile view (hiding labels in header user button, limiting width, scrollable panel height), and high-contrast styling compatible with dark mode.

All 7 languages (zh-CN, ja-JP, en-US, vi-VN, fr-FR, my-MM, ko-KR) are covered.

**Not implemented yet (Round 19.1):**
- Automatic/background sync (by design — manual only)
- `user_translations` sync (not wired)
- Two-device sync testing

### Round 19.0: User Translations & Bookmarks Sync Audit
Round 19.0 performs a read-only architecture audit of user-defined translations and favorites/bookmarks. It concludes that:
- `user_translations` has no UI yet, so sync is postponed.
- `bookmarks` currently only exists as a "Favorites" list in the Japanese Typing module (stored in localStorage key `study-tools-japanese-typing-v1`).
- Syncing bookmarks is safe and feasible via manual union merge without destructive deletion.

### Round 19.1: Typing Bookmarks Manual Sync
Round 19.1 implements manual sync for Japanese typing favorites (bookmarks) under a union merge strategy.
- **Data Source**: Stored locally in localStorage under the key `study-tools-japanese-typing-v1`, as the `favorites` array of strings or numbers.
- **Supabase Table Mapping**: Map local favorites to rows in the `bookmarks` table with `bookmark_type = 'typing_article'` and `reference_id = favorite_id`.
- **Merge Strategy**: Union Merge (并集合并).
  - Local favorites + remote bookmarks are combined and de-duplicated.
  - Numbers and strings are normalized to prevent type mismatches.
  - Remote empty array does NOT clear the local active list, ensuring local data safety.
- **Integration**: Placed into the manual sync pipeline via `pullBookmarks` and `pushBookmarks`. Results are recorded in the Auth Panel sync summary details.

### Round 19.2: UI Decluttering & Mobile Layout Optimization
Round 19.2 optimizes the visual layout and declutters the workspace:
- **Header Actions Grouping**: Consolidated top-right header buttons into a single flex container, hiding labels on smaller screen widths.
- **Off-Canvas Drawers**: Shifted left sidebar (directory) and right SQL Playground to off-canvas drawers on mobile/tablet viewports (breakpoints <= 720px and <= 900px).
- **Softer Borders & Shadows**: Reduced border weights and applied subtle, semi-transparent glows for improved dark mode aesthetics.
- **Auth Panel Slimming**: Wrapped test password login and device/sync metadata in folding `<details>` elements for a cleaner account modal.

### Round 19.3.1: SQL Playground Desktop Width Regression Fix
Round 19.3.1 resolves desktop UI regressions introduced in Round 19.2:
- **Desktop Squeeze Fix**: Splitting `min-width: 901px` into range-specific queries:
  - `901px - 1199px`: Sidebar clamp to `200px - 240px`, SQL Playground clamp to `360px - 420px` (min-width `360px`).
  - `>= 1200px`: Sidebar clamp to `220px - 280px`, SQL Playground clamp to `400px - 560px` (min-width `400px`).
- **SQL Editor Heights**: Ensured `.editor-container` minimum height is at least `150px` (using `!important` to override animation overrides), and console cards have a minimum height of `280px` to guarantee execute button visibility.
- **Title Wrapping Prevention**: Applied `white-space: nowrap`, `overflow: hidden`, and `text-overflow: ellipsis` to playground headers to stop character-by-character vertical text wrapping under narrow viewports. Protected button flex shrinking via `flex-shrink: 0`.

1. **Anonymous local mode** (default, no change from today)  
   - All data in `localStorage`  
   - No account, no sync, fully offline

2. **Anonymous cloud mode** (optional upgrade)  
   - Supabase `signInAnonymously()`  
   - Sync starts automatically  
   - User can upgrade later to permanent account

3. **Permanent account** (optional upgrade)  
   - Email + password, Google OAuth, or GitHub OAuth  
   - Anonymous data linked to permanent identity  
   - Full cross-device sync

### Data Sync Scope

| Sync | Data | Strategy |
|:---|:---|:---|
| **Sync** | Lesson completions, quiz results, per-lesson progress | LWW + Union Merge |
| **Sync** | Language preference, theme | LWW |
| **Later** | Bookmarks / favorites | Not included in Round 17.6 |
| **Later** | Japanese typing history | Not included in Round 17.6 |
| **Later** | User custom translations | Not included in Round 17.6 |
| **Do NOT sync** | AI API key (sessionStorage) | Never uploaded |
| **Do NOT sync** | AI provider config (provider, model, Ollama URL) | Per-device |
| **Do NOT sync** | AI translation cache (~500KB) | Regeneratable |
| **Do NOT sync** | Active exam state (in-memory) | Ephemeral |
| **Do NOT sync** | Service Worker cache | Auto-managed |
| **Do NOT sync** | Local SQLite analytics (mastery %) | Recomputable from raw events |

## localStorage Sync Queue Structure

### Keys

| Key | Type | Purpose |
|:---|:---|:---|
| `study_tools_device_id` | UUID string | Unique device identifier, generated once |
| `study_tools_sync_queue` | JSON array | Pending/failed sync events |
| `study_tools_last_sync_at` | ISO 8601 string | Last successful full sync timestamp |
| `study_tools_sync_enabled` | boolean | Whether cloud sync is enabled for this device |

### Queue Event Schema

```json
{
  "id": "evt-1718200000-a1b2c3",
  "type": "progress_update",
  "payload": { "subject": "sql", "lesson_id": 12, "is_completed": true },
  "device_id": "st-550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2026-06-13T10:00:00.000Z",
  "updated_at": "2026-06-13T10:00:00.000Z",
  "status": "pending",
  "retry_count": 0,
  "schema_version": 1,
  "priority": 0
}
```

Status values: `pending` | `done` | `failed`

## Supabase Tables

| Table | Purpose | Key FK |
|:---|:---|:---|
| `devices` | Registered user devices | `user_id → auth.users` |
| `user_settings` | UI preferences | `user_id → auth.users` (PK) |
| `learning_progress` | Per-lesson completion state | `(user_id, subject, lesson_id)` unique |
| `quiz_results` | Raw per-question results | `user_id → auth.users` |
| `user_translations` | User-customised dictionary | `(user_id, source_text, target_lang)` unique |
| `bookmarks` | User favorites | `(user_id, type, ref)` unique |
| `sync_log` | Operation audit trail | `user_id → auth.users` |

Full DDL: `tools/init_supabase.sql`

## File Map

### Windows (E:\项目\sql-learning-hub)

| File | Role |
|:---|:---|
| `assets/js/sync-engine.js` | Local-first engine with explicit manual P0 sync |
| `tools/init_supabase.sql` | Supabase DDL draft |
| `docs/sync_architecture.md` | This document |

### Web (E:\项目\sql-learning-hub-web-public)

| File | Role |
|:---|:---|
| `assets/js/sync-engine.js` | Local-first engine with explicit manual P0 sync |
| `docs/sync_architecture.md` | This document |

## Upcoming Rounds / Release History

| Round | Scope | Status |
|:---|:---|:---|
| **17.5** | Minimal Supabase Auth integration: session, Magic Link, test password login, sign-out | Released |
| **17.6** | Manual device/settings/progress sync foundation | Released |
| **17.9** | Sync conflict handling and UX patch | Released |
| **17.10** | Localized Auth UI & Layout Slimming | Released |
| **18.0** | Stable release: Web cache update + Portable repack + tag + Release | Released |
| **19.0** | User translations & bookmarks sync architecture audit | Completed |
| **19.1** | Typing bookmarks manual sync | Released |
| **19.2** | UI Decluttering & Mobile Layout Optimization | Released |
| **19.3.1** | SQL Playground desktop width regression fix | Released |

### Round 19.5: Typing Bookmarks Delete Sync (Tombstone)

Round 19.5 implements soft-delete synchronization for Japanese typing article bookmarks using a tombstone strategy.

#### Sync State Key

A new localStorage key study-tools-typing-bookmarks-sync-v1 tracks the sync state:

`json
{
  "knownFavorites": ["id1", "id2"],
  "deletedFavorites": { "id1": "2026-06-13T00:00:00Z" },
  "lastSyncedAt": "2026-06-13T00:00:00Z",
  "version": 1
}
`

- knownFavorites: snapshot of favorites at last sync, used to detect deletions.
- deletedFavorites: map of bookmark ID �� ISO timestamp of deletion (tombstones).
- lastSyncedAt: timestamp of last successful bookmark sync.

#### Soft-Delete Strategy

- Deleted bookmarks are NOT physically removed from the Supabase ookmarks table.
- Instead, deleted_at is set to the deletion timestamp.
- Physical deletion is never performed (safe-guard against data loss).

#### Conflict Resolution Rules

| Scenario | Resolution |
|---|---|
| Local add, remote absent | Push active bookmark (deleted_at = null) |
| Remote add, local absent | Pull active bookmark into local favorites |
| Local delete | Push tombstone (deleted_at = timestamp) |
| Remote delete newer than local activity | Remove from local favorites |
| Local re-add after remote delete | Remove tombstone, push restore (sets deleted_at back to null) |
| Later delete wins (newer timestamp) | The more recent deleted_at takes precedence |
| Remote empty array | Never clears local favorites |

#### New Functions in sync-engine.js

| Function | Description |
|---|---|
| getTypingBookmarkSyncState() | Read sync state from localStorage |
| setTypingBookmarkSyncState(state) | Write sync state to localStorage |
| detectTypingBookmarkDeletions(current, state) | Compare current favorites with knownFavorites, record tombstones |
| pushBookmarkTombstones(ctx) | Upsert deleted bookmarks to Supabase with deleted_at set |
| pullBookmarkTombstones(ctx) | Fetch remote rows with deleted_at IS NOT NULL for 	yping_article |
| pplyTypingBookmarkDeletes(state, tombstones, local) | Apply remote tombstones to local favorites |
| mergeBookmarksWithTombstones(ctx) | Unified operation: push tombstones �� pull tombstones �� apply deletes �� pull active �� merge |

#### Integration

- detectTypingBookmarkDeletions is called before the sync step loop starts.
- mergeBookmarksWithTombstones replaces the old pullBookmarks step.
- pushBookmarks still pushes active favorites (unchanged).
- All bookmark sync errors are non-fatal: single-step failure does not abort settings/progress/quiz sync.

#### Sync Summary Fields

New summary counters reported in the Auth Panel:

- ookmarks_deleted_pushed: Number of tombstone entries pushed to remote.
- ookmarks_deleted_pulled: Number of remote tombstone entries processed.
- ookmarks_restored: Number of bookmarks restored (re-added after remote delete).
- ookmarks_conflicts_resolved: Number of active bookmarks merged from remote.

#### Scope Limitations

- Only applies to 	yping_article bookmark type.
- Does NOT sync course/term/wrong-question bookmarks.
- Does NOT physically delete remote rows.
- Does NOT sync AI translation cache or API keys.
| **19.5** | Bookmark delete sync (tombstone) | Released |
