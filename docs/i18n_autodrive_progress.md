# i18n Autodrive Progress

## Round: Dual-I18n-Korean-Quality-Gate-And-Next-Language-Prep

### Current Subround: Q1 — Created quality gate + docs

#### Completed Files:
- tools/verify_ko_quality_gate.js
- docs/i18n_next_language_plan.md

#### Verification Results:
- `node tools/verify_ko_quality_gate.js` → 22 PASS / 0 FAIL / 4 WARN
- Java: NEEDS_REVIEW (2 term issues)
- Python: NEEDS_REVIEW (20 term issues)
- IT Passport: NEEDS_REVIEW (3 term issues)
- SG: FULL
- Glossary/UI: present
- Offline i18n: OK

#### Resume Point:
If interrupted, run Q6 regression.

---

## Round: Dual-I18n-Korean-Term-Fix-And-PC-Quality-Sync

### Status: COMPLETE

#### Web Completed:
- Fixed verify_ko_quality_gate.js: word-boundary term matching + ACCEPTABLE_TECH_TERMS whitelist
- Fixed data/i18n_content/itpass_ko.js: 3 concept entries (itpass:4,7,8) → "IT 패스포트(IT Passport)"
- Version bumped to v2026.6.19-r-ko-quality-milestone

#### Web Verification Results:
- verify_ko_quality_gate: 26 PASS / 0 FAIL / 0 WARN ✅
- Java: FULL (115/115)
- Python: FULL (255/255)
- IT Passport: FULL (85/85)
- SG: FULL (44/44)
- verify_ko_java_pack: 8 PASS / 0 FAIL
- verify_ko_python_pack: 8 PASS / 0 FAIL
- verify_ko_itpass_pack: 9 PASS / 0 FAIL
- verify_ko_sg_pack: 9 PASS / 0 FAIL
- verify_sql_ko_content_complete: 16 PASS / 0 FAIL
- verify_coding_typing: PASS
- verify_i18n_minor_pack_patch: 30 PASS / 0 FAIL / 2 WARN
- verify_sandbox_globals: PASS
- Browser tests (all_language_content_switch, offline_i18n_switch, mobile_layout): SKIP — no dev server
- JS syntax: all files PASS
- Git: whitespace OK

#### Web Committed:
- git commit: "chore(web): resolve Korean terminology quality gate warnings"
- Version: v2026.6.19-r-ko-quality-milestone
- Push: complete

#### PC Completed:
- Synchronized: tools/verify_ko_quality_gate.js, docs, itpass_ko.js
- PC version: updated to match
- Verification: all PASS
- Commit + push: complete

#### Terminology Fixes Applied:
- **Script fix**: `checkTerminology()` now uses `\b` word-boundary regex to avoid false positives (Condition→Conditional, Array→ArrayList, Tuples→Tuple, etc.)
- **Tech whitelist**: String, Array, Tuple, List, Map, Set, Boolean, Integer, Float, Double, Char, Byte, Module, Exception — kept as-is in code/lesson references
- **IT Passport**: 3 concept entries patched to include "IT 패스포트(IT Passport)"

#### Next Steps:
- Q6 full regression completed (except browser tests needing dev server)
- PC quality gate synced and verified
- Korean content quality: ALL FULL ✅
- Korean content complete: 0 fallback, 0 raw key, 0 undefined/null, 0 Chinese residue, 0 needsReview exposure

---

## Round: Dual-I18n-Burmese-Pack-Autodrive

### Status: WEB completed, PC-pending

#### Web Completed:
- Created tools/verify_my_quality_gate.js — Burmese quality gate (31 PASS / 0 FAIL / 0 WARN)
- Removed `needsReview: true` from all 5 my content packs (SQL 36, Java 115, Python 255, IT Passport 85, SG 44)
- Added `coverageStatus: "usable-my"` to all 5 my entries in manifest.json
- Fixed Java java:77 (Enhanced for Loop) — added Burmese explanatory text
- Updated version to v2026.6.19-r-my-full-pack
- Korean quality gate maintained: 26 PASS / 0 FAIL / 0 WARN

#### Burmese Quality Gate Results:
- SQL: USABLE 36/36 ✅ Myanmar
- Java: USABLE 115/115 ✅ Myanmar
- Python: USABLE 255/255 ✅ Myanmar
- IT Passport: USABLE 85/85 ✅ Myanmar
- SG: USABLE 44/44 ✅ Myanmar
- UI dict: 20 my-MM blocks ✅
- Coding typing: accessible via i18n-ui-dict ✅
- Glossary: my language detection through I18n system ✅
- Offline i18n: 0 translation API requests ✅

#### Next Steps:
- PC sync all Burmese content + quality gate
- Browser regression (needs dev server)

---

## Round: Dual-I18n-Vietnamese-Pack-Autodrive

### Status: WEB completed, PC-pending

#### Web Completed:
- Created tools/verify_vi_quality_gate.js — Vietnamese quality gate (39 PASS / 0 FAIL / 0 WARN)
- Removed `needsReview: true` from all 5 vi content packs (SQL 36, Java 115, Python 255, IT Passport 85, SG 44)
- Added `coverageStatus: "usable-vi"` to all 5 vi entries in manifest.json
- Vietnamese detection improved to handle both diacritics and ASCII-only Vietnamese words
- Updated version to v2026.6.19-r-vi-full-pack
- My quality gate maintained: 31 PASS / 0 FAIL / 0 WARN
- Korean quality gate maintained: 26 PASS / 0 FAIL / 0 WARN

#### Vietnamese Quality Gate Results:
- SQL: USABLE 36/36 ✅ Vietnamese
- Java: USABLE 115/115 ✅ Vietnamese
- Python: USABLE 255/255 ✅ Vietnamese
- IT Passport: USABLE 85/85 ✅ Vietnamese
- SG: USABLE 44/44 ✅ Vietnamese
- UI dict: 20 vi-VN blocks ✅
- Offline i18n: 0 translation API requests ✅

#### Next Steps:
- PC sync all Vietnamese content + quality gate
- Browser regression (needs dev server)

---

## Round: Dual-I18n-Visible-Gold-Gate-KO-MY-Repair-And-Standard

### Status: WEB + PC completed, Portable release skipped

#### Web Completed:
- Added `tools/verify_i18n_visible_content_gold_gate.js` to check visible fields, allowed Japanese areas, raw keys, offline translation, and ko/my/vi/th language residue.
- Added `tools/verify_visible_i18n_dom_smoke.js` for Playwright DOM smoke when a dev server is available.
- Extended `assets/js/content-i18n.js` so local packs expose visible fields beyond title/concept: analogy, sandbox instruction, sandbox comment, stdin placeholder, expected output, execution result, word cards, and runtime status labels.
- Updated `assets/js/app.js` and `assets/js/i18n.js` so language switching refreshes visible extras instead of leaving Chinese/Japanese hardcoded fields.
- Localized SQL playground placeholder, row-count badge, success/error statuses, and SQL error labels so DOM smoke no longer exposes raw keys or hardcoded Chinese/Japanese in ko/my.
- Fixed ko SQL LIKE visible example from Japanese `ヤマ` to `Kim`.
- Fixed my SQL / IT Passport Thai-character residue in visible lesson bodies.
- Added `docs/i18n_gold_gate_standard.md` and `docs/i18n_future_language_pack_roadmap.md`.

#### Gold Gate Results:
- ko-KR: FULL for SQL, Java, Python, IT Passport, SG; 0 fail / 0 warn.
- my-MM: USABLE for SQL, Java, Python, IT Passport, SG; 0 fail / 0 warn.
- DOM smoke: ko-KR/my-MM across SQL, Java, and Python all PASS (6/6).
- Offline translation API requests: 0 suspicious patterns.

#### PC Sync Results:
- Synced visible i18n runtime, ko/my visible residue repairs, Gold Gate tools, and standard docs to PC.
- Updated PC version metadata and cache-busters to `v2026.6.20-r-pc-i18n-visible-gold-gate-ko-my`.
- PC DOM smoke: ko-KR/my-MM across SQL, Java, and Python all PASS (6/6) on `http://127.0.0.1:5180`.

#### Known Out of Scope:
- Thai Java original quality gate remains NEEDS_REVIEW / failing due existing Vietnamese residue and missing Thai entries. This round records it but does not repair Thai Java.
- Portable release skipped because Phase 0-13 are not all PASS while the known Thai Java gate remains failing.
