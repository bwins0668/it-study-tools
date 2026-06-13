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

## Upcoming Rounds

| Round | Scope |
|:---|:---|
| **17.2** | Auth UI prototype: login/signup page, anonymous indicator, user menu |
| **17.3** | Supabase Auth preparation layer, disabled config template, no-network adapter |
| **17.4** | Manual project/config validation, optional SDK loading slot, RLS draft review |
| **17.5** | Minimal Supabase Auth integration: session, Magic Link, test password login, sign-out |
| **17.6** | Manual device/settings/progress sync foundation |
| **17.7** | Conflict handling and real two-device testing, or 17.6.1 manual-sync UX patch |
| **17.8** | Stable release: Web cache update + Portable repack + tag + Release |
