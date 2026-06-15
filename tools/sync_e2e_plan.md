# Sync E2E Test Plan

## Overview

This document describes the end-to-end testing plan for the Study Tools sync system
(`sync-engine.js`). The sync system uses Supabase for cross-device data synchronization.

## Architecture

```
Local Storage (per-device)
  ↓ enqueueSyncEvent()
Sync Queue (localStorage)
  ↓ push*() functions
Supabase Tables:
  - learning_progress
  - quiz_results
  - typing_sessions
  - exam_sessions
  - bookmarks
  - wrong_book
  - sync_log
```

## Sync Scope

### Data Synced

| Table | Payload Keys | Sensitive? |
|-------|--------------|------------|
| learning_progress | lesson_id, completed, score, updated_at | No |
| quiz_results | lesson_id, question_id, correct, answer, updated_at | No |
| typing_sessions | article_title, wpm, accuracy, duration, completed_at | No |
| exam_sessions | exam_id, score, total, correct, completed_at | No |
| bookmarks | lesson_id, bookmark_type, created_at | No |
| wrong_book | lesson_id, question_id, source, last_wrong_at | No |

### Data NOT Synced (Local Only)

- Dashboard goals (localStorage `study_tools_goals`)
- UI preferences (theme, language)
- Export/import history
- AI provider keys (filtered by export, should not be in sync)

## E2E Test Scenarios

### 1. First Sync (New Device)

1. User logs in on Device A
2. Complete some lessons
3. Trigger sync
4. Verify data appears in Supabase
5. Log in on Device B
6. Trigger sync
7. Verify data appears on Device B

### 2. Conflict Resolution

1. Edit data on Device A (offline)
2. Edit same data on Device B (offline)
3. Sync Device A
4. Sync Device B
5. Verify conflict resolution (last-write-wins or merge)

### 3. Sensitive Data Leakage Test

1. Add sensitive data to localStorage (fake API keys, passwords)
2. Trigger sync
3. Verify sensitive data is NOT in sync payload
4. Check Supabase logs for sensitive data

### 4. Sync Queue Persistence

1. Add items to sync queue
2. Close browser
3. Reopen browser
4. Verify queue persisted
5. Complete sync

### 5. Sync Error Recovery

1. Disconnect network
2. Trigger sync
3. Verify queue unchanged
4. Reconnect network
5. Retry sync
6. Verify success

### 6. Bookmark Tombstone Sync

1. Create bookmark on Device A
2. Sync
3. Delete bookmark on Device A
4. Sync (tombstone created)
5. Sync on Device B
6. Verify bookmark deleted on Device B

## Mock/S仿真 Testing

Since we cannot run real E2E tests without:
- Real Supabase instance
- Multiple browser instances
- Real user accounts

We provide mock testing approach:

### Mock Sync Engine

Create `tools/mock_sync_engine.mjs` that:
- Intercepts `enqueueSyncEvent` calls
- Records payloads to a mock queue
- Verifies payload safety (no sensitive data)
- Simulates Supabase responses

### Static Verification

Run `tools/verify_sync_boundaries.mjs`:
- Scan `sync-engine.js` for sensitive field access
- Verify only whitelisted fields are synced
- Check no API keys/passwords in payload

Run `tools/verify_no_sensitive_sync.mjs`:
- Create mock sensitive data in localStorage
- Run sync preparation logic
- Verify sensitive data excluded from payload

## Running E2E Tests

### Prerequisites

1. Supabase project with sync tables created
2. Test user accounts (non-production)
3. Browser automation tool (Playwright/Selenium)

### Commands

```bash
# Run mock sync verification
node tools/verify_sync_boundaries.mjs

# Run sensitive data check
node tools/verify_no_sensitive_sync.mjs

# Run full E2E (requires browser + Supabase)
node tools/run_sync_e2e.mjs --supabase-url=... --test-user=...
```

## Safety Requirements

- NEVER run E2E tests against production Supabase
- NEVER use real user accounts
- NEVER sync real sensitive data
- ALWAYS use test/backUP data
- ALWAYS clean up test data after E2E

## Test Data

Use `tools/test_data_factory.mjs` (Round 61.0) to generate:
- Mock learning progress
- Mock quiz results
- Mock typing sessions
- Mock bookmarks

## Status

- [x] Sync engine implemented (Round 25.x)
- [x] Sync boundaries documented (this file)
- [ ] Mock sync verification script
- [ ] Sensitive data verification script
- [ ] Full E2E test automation

## Next Steps

1. Create `tools/verify_sync_boundaries.mjs`
2. Create `tools/verify_no_sensitive_sync.mjs`
3. Document sync conflict resolution strategy
4. Set up CI/CD for sync verification
