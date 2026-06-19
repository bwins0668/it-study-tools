# I18n Autodrive Progress

更新时间：2026-06-20 00:16 JST

当前小轮次：
- Subround 8：双端韩语覆盖率回归验收

已完成：
- Subround 0：双端只读基线审计完成，Web/PC 均已 `git pull --ff-only` 且远端同步。
- Subround 1：增强 `tools/verify_i18n_coverage_matrix.js`，新增韩语专项明细：
  - SQL / Java / Python / IT Passport / SG
  - Glossary
  - Coding typing
  - Japanese typing
  - Tools Dashboard
  - Account / Settings / Tools
  - Toast / aria / title
- Subround 2：同步 Web 稳定韩语 SQL 内容包：
  - 36 课 `playgroundTask`
  - 36 课 `practicalExamTitle`
  - 36 课 `practicalExamDescription`
  - 运行时 `pickLessonLocalText` 会优先读取 lesson locale，再读取离线内容包字段，避免韩语 SQL 练习/实战考试文案回退到中文。
  - 版本同步到 `v2026.6.19-r-pc-ko-sql-final`，并刷新 i18n manifest hash。
- Subround 3：同步 Web 稳定 Java 韩语内容包到 PC：
  - 115 课本地韩语 `title` / `subtitle` / `concept`
  - 115 课 `practiceIntro` / `sandboxInstruction` / `examIntro` / `challengeIntro`
  - 每课至少 3 条 `keyPoints`
  - PC 新增 `data/i18n_content/java_ko.js` 并在 `index.html` 加载
  - `coverageStatus` 标为 `usable-ko`，不再依赖日语 fallback
  - 覆盖矩阵新增 `USABLE` 状态，避免把可用但未人工终审的内容误标为 FULL。
  - 新增 `tools/verify_ko_java_pack.js`。
- Subround 4：同步 Web 稳定 Python 韩语内容包到 PC：
  - 255 课本地韩语 `title` / `subtitle` / `concept`
  - 255 课 `practiceIntro` / `sandboxInstruction` / `examIntro` / `challengeIntro`
  - 每课至少 3 条 `keyPoints`
  - PC 新增 `data/i18n_content/python_ko.js` 并在 `index.html` 加载
  - `coverageStatus` 标为 `usable-ko`，不再依赖日语 fallback
  - 新增 `tools/verify_ko_python_pack.js`。
- Subround 5：同步 Web 稳定 Coding Typing 韩语 UI：
  - 补齐 `examInsight` / `examRelevance` / `examTargets` / `relatedTerms`
  - 补齐 `meaning` / `memoryHook` / `examPoint` / `commonMistake`
  - 补齐 `high` / `medium` / `low`
  - 修复 `sendToSandbox` / `runInSandbox` 英文遗留
  - PC 版本同步到 `v2026.6.19-r-pc-ko-coding-typing-ui`。
- Subround 6：同步 Web 稳定 IT Passport 韩语 USABLE 内容包：
  - 85 课本地韩语 `title` / `subtitle` / `concept`
  - 85 课 `practiceIntro` / `sandboxInstruction` / `examIntro` / `challengeIntro`
  - 每课至少 3 条 `keyPoints`
  - PC 新增 `data/i18n_content/itpass_ko.js` 并在 `index.html` 加载
  - `coverageStatus` 标为 `usable-ko`，不再依赖日语 fallback
  - 新增 `tools/verify_ko_itpass_pack.js`。
- Subround 7：同步 Web 稳定 SG 韩语 USABLE 内容包：
  - 44 课本地韩语 `title` / `subtitle` / `concept`
  - 44 课 `practiceIntro` / `sandboxInstruction` / `examIntro` / `challengeIntro`
  - 每课至少 3 条 `keyPoints`
  - PC 新增 `data/i18n_content/sg_ko.js` 并在 `index.html` 加载
  - 覆盖信息安全基础、风险管理、访问控制、认证、授权、加密、哈希、网络安全、日志、备份、事故响应与考试练习说明。
  - `coverageStatus` 标为 `usable-ko`，不再依赖日语 fallback
  - 新增 `tools/verify_ko_sg_pack.js`。
- Subround 8：双端韩语覆盖率回归验收完成：
  - Web / PC 全量 JS 语法检查 PASS。
  - Web / PC 覆盖矩阵均为 40 PASS / 0 FAIL / 33 WARN。
  - SQL / Java / Python / IT Passport / SG 韩语专项验证均 PASS。
  - Coding Typing ko UI 维持 FULL，91/91 keys。
  - 双端离线 i18n 翻译 API 请求均为 0。
  - Web mobile layout 12 PASS / 0 FAIL。

已验证：
- 双端自定义韩语 SQL 内容审计：36 lessons / 36 ko rows / 0 issues。
- PC Subround 2 `node --check`：`assets/js/app.js`、`data/i18n_content/sql_ko.js`、`assets/js/version.js` PASS。
- PC `git diff --check`：PASS。
- PC `node tools/verify_sql_ko_content_complete.js`：5 PASS / 0 FAIL。
- PC `node tools/verify_i18n_coverage_matrix.js`：39 PASS / 0 FAIL / 34 WARN。
- PC `node tools/verify_i18n_minor_pack_patch.js`：15 PASS / 0 FAIL / 0 WARN。
- PC `node tools/verify_coding_typing.js`：PASS。
- PC `node tools/verify_sandbox_globals.mjs`：PASS，保留既有 inline handler / script order / cache WARN。
- PC Subround 4 `node --check`：`data/i18n_content/python_ko.js`、`tools/verify_ko_python_pack.js`、`tools/verify_i18n_coverage_matrix.js`、`assets/js/version.js` PASS。
- PC Subround 4 `git diff --check`：PASS。
- PC `node tools/verify_ko_python_pack.js`：8 PASS / 0 FAIL。
- PC `node tools/verify_i18n_coverage_matrix.js`：Python ko = USABLE，255/255 local，0/255 fallback。
- PC `node tools/verify_all_language_content_switch.js`：70 PASS / 0 FAIL / 0 WARN。
- PC `node tools/verify_offline_i18n_switch.js`：翻译 API 请求 0。
- PC `node tools/verify_coding_typing.js`：PASS。
- PC `node tools/verify_sandbox_globals.mjs`：PASS，保留既有 inline handler / script order / cache WARN。
- PC Subround 5 `node --check`：`assets/js/i18n-ui-dict.js`、`assets/js/version.js` PASS。
- PC Subround 5 `git diff --check`：PASS（仅保留既有 CRLF 提示）。
- PC Subround 5 `node tools/verify_i18n_coverage_matrix.js`：Coding typing = FULL，91/91 keys，40 PASS / 0 FAIL / 33 WARN。
- PC Subround 5 `node tools/verify_i18n_minor_pack_patch.js`：15 PASS / 0 FAIL / 0 WARN。
- PC Subround 5 `node tools/verify_coding_typing.js`：PASS。
- PC Subround 5 `node tools/verify_all_language_content_switch.js`：70 PASS / 0 FAIL / 0 WARN。
- PC Subround 5 `node tools/verify_offline_i18n_switch.js`：翻译 API 请求 0，所有目标语言 local content PASS。
- PC Subround 5 `node tools/verify_sandbox_globals.mjs`：PASS，保留既有 inline handler / script order / cache WARN。
- PC Subround 6 `node --check`：`data/i18n_content/itpass_ko.js`、`tools/verify_ko_itpass_pack.js`、`assets/js/version.js` PASS。
- PC Subround 6 `git diff --check`：PASS（仅保留既有 CRLF 提示）。
- PC Subround 6 `node tools/verify_ko_itpass_pack.js`：9 PASS / 0 FAIL。
- PC Subround 6 `node tools/verify_i18n_coverage_matrix.js`：IT Passport ko = USABLE，85/85 local，0/85 fallback，40 PASS / 0 FAIL / 33 WARN。
- PC Subround 6 `node tools/verify_i18n_minor_pack_patch.js`：15 PASS / 0 FAIL / 0 WARN。
- PC Subround 6 `node tools/verify_coding_typing.js`：PASS。
- PC Subround 6 `node tools/verify_all_language_content_switch.js`：70 PASS / 0 FAIL / 0 WARN。
- PC Subround 6 `node tools/verify_offline_i18n_switch.js`：翻译 API 请求 0，所有目标语言 local content PASS。
- PC Subround 6 `node tools/verify_sandbox_globals.mjs`：PASS，保留既有 inline handler / script order / cache WARN。
- Web Subround 7 `node --check`：`data/i18n_content/sg_ko.js`、`tools/verify_ko_sg_pack.js`、`assets/js/version.js`、`service-worker.js` PASS。
- Web Subround 7 `git diff --check`：PASS（仅保留既有 CRLF 提示）。
- Web Subround 7 `node tools/verify_ko_sg_pack.js`：9 PASS / 0 FAIL。
- Web Subround 7 `node tools/verify_i18n_coverage_matrix.js`：SG ko = USABLE，44/44 local，0/44 fallback，40 PASS / 0 FAIL / 33 WARN。
- Web Subround 7 `node tools/verify_i18n_minor_pack_patch.js`：30 PASS / 0 FAIL / 2 WARN。
- PC Subround 7 `node --check`：`data/i18n_content/sg_ko.js`、`tools/verify_ko_sg_pack.js`、`assets/js/version.js` PASS。
- PC Subround 7 `git diff --check`：PASS（仅保留既有 CRLF 提示）。
- PC Subround 7 `node tools/verify_ko_sg_pack.js`：9 PASS / 0 FAIL。
- PC Subround 7 `node tools/verify_i18n_coverage_matrix.js`：SG ko = USABLE，44/44 local，0/44 fallback，40 PASS / 0 FAIL / 33 WARN。
- PC Subround 7 `node tools/verify_i18n_minor_pack_patch.js`：15 PASS / 0 FAIL / 0 WARN。
- Web Subround 8 `git status --short --branch`：`## master...origin/master`。
- Web Subround 8 `git diff --check`：PASS。
- Web Subround 8 全量 `node --check`：`assets/js`、`data/i18n_content`、`tools` PASS。
- Web Subround 8 覆盖矩阵：40 PASS / 0 FAIL / 33 WARN。
- Web Subround 8 minor pack：30 PASS / 0 FAIL / 2 WARN。
- Web Subround 8 SQL ko：16 PASS / 0 FAIL / 0 WARN。
- Web Subround 8 browser i18n：70 PASS / 0 FAIL / 0 WARN。
- Web Subround 8 offline i18n：翻译 API 请求 0，所有目标语言 local content PASS。
- Web Subround 8 mobile layout：12 PASS / 0 FAIL。
- Web Subround 8 coding typing：PASS。
- Web Subround 8 sandbox globals：PASS，保留既有 inline handler / script order WARN。
- Web Subround 8 Java/Python/IT Passport/SG 韩语专项：8/8、8/8、9/9、9/9 PASS。
- PC Subround 8 `git status --short --branch`：`## main...origin/main`。
- PC Subround 8 `git diff --check`：PASS。
- PC Subround 8 全量 `node --check`：`assets/js`、`data`、`tools` PASS。
- PC Subround 8 覆盖矩阵：40 PASS / 0 FAIL / 33 WARN。
- PC Subround 8 SQL ko：5 PASS / 0 FAIL。
- PC Subround 8 minor pack：15 PASS / 0 FAIL / 0 WARN。
- PC Subround 8 browser i18n：70 PASS / 0 FAIL / 0 WARN。
- PC Subround 8 offline i18n：翻译 API 请求 0，所有目标语言 local content PASS。
- PC Subround 8 coding typing：PASS。
- PC Subround 8 sandbox globals：PASS，保留既有 inline handler / script order / cache WARN。
- PC Subround 8 Java/Python/IT Passport/SG 韩语专项：8/8、8/8、9/9、9/9 PASS。
- PC offline i18n：翻译 API 请求 0，所有目标语言 local content PASS。
- PC browser i18n：`verify_all_language_content_switch.js` 70 PASS / 0 FAIL / 0 WARN。
- Web `node --check`：67 个 JS 文件 PASS。
- Web `node tools/verify_i18n_coverage_matrix.js`：39 PASS / 0 FAIL / 34 WARN。
- Web browser i18n：`verify_all_language_content_switch.js` 70 PASS / 0 FAIL / 0 WARN。
- Web offline i18n：翻译 API 请求 0。
- Web mobile layout：12 PASS / 0 FAIL。
- PC `node --check`：76 个 JS 文件 PASS。
- PC `node tools/verify_i18n_coverage_matrix.js`：39 PASS / 0 FAIL / 34 WARN。
- PC browser i18n：`verify_all_language_content_switch.js` 70 PASS / 0 FAIL / 0 WARN。
- PC offline i18n：翻译 API 请求 0，仍有 3 个 th fallback WARN。
- PC Subround 3 `node --check`：`data/i18n_content/java_ko.js`、`tools/verify_ko_java_pack.js`、`tools/verify_i18n_coverage_matrix.js`、`assets/js/version.js` PASS。
- PC Subround 3 `git diff --check`：PASS。
- PC `node tools/verify_ko_java_pack.js`：8 PASS / 0 FAIL。
- PC `node tools/verify_i18n_coverage_matrix.js`：Java ko = USABLE，115/115 local，0/115 fallback。
- PC `node tools/verify_all_language_content_switch.js`：70 PASS / 0 FAIL / 0 WARN。
- PC `node tools/verify_offline_i18n_switch.js`：翻译 API 请求 0。
- PC `node tools/verify_coding_typing.js`：PASS。
- PC `node tools/verify_sandbox_globals.mjs`：PASS，保留既有 inline handler / script order / cache WARN。

已 commit：
- Web 覆盖矩阵提交：`3939d89 test(web): strengthen i18n coverage matrix`
- PC 覆盖矩阵提交：`27329d8 test(pc): strengthen i18n coverage matrix`
- Web 韩语 SQL 终审提交：`8380e5f chore(web): polish Korean SQL lesson pack`
- PC 韩语 SQL 同步提交：`66393f8 chore(pc): sync Korean SQL lesson polish`
- Web Java 提交：`c68e464 feat(web): complete Korean Java lesson pack`
- PC Java 提交：`2d12a38 feat(pc): sync Korean Java lesson pack`
- Web Python 提交：`4d20679 feat(web): complete Korean Python lesson pack`
- PC Python 提交：`f225ffb feat(pc): sync Korean Python lesson pack`
- Web Coding Typing UI 提交：`2444fcf fix(web): complete Korean coding typing UI`
- PC Coding Typing UI 提交：`ca996f0 fix(pc): sync Korean coding typing UI`
- Web IT Passport 提交：`ec28184 feat(web): expand Korean IT Passport content pack`
- PC IT Passport 提交：`98170a2 feat(pc): sync Korean IT Passport baseline`
- Web SG 提交：`fbebda8 feat(web): expand Korean SG content pack`
- PC SG 提交：`3c6f28f feat(pc): sync Korean SG baseline`
- Subround 8 进度文档提交：待本文件提交后记录。

已 push：
- 本轮提交后推送到远端；恢复时以 `git status --short --branch` 无 ahead 为准。

下一小轮次：
- 可选 Subround 9：Glossary 韩语核心术语深化，或转入 vi / th / id 语言包。

未完成原因：
- Subround 3～8 已完成。
- 可选 Subround 9 Glossary 深化未执行。

## Round: Dual-I18n-Korean-Term-Fix-And-PC-Quality-Sync

### Status: COMPLETE

#### PC Sync Completed:
- tools/verify_ko_quality_gate.js — copied from Web (word-boundary term matching + ACCEPTABLE_TECH_TERMS)
- docs/i18n_next_language_plan.md — copied from Web
- docs/i18n_autodrive_progress.md — updated
- data/i18n_content/itpass_ko.js — 3 concept entries (itpass:4,7,8) → "IT 패스포트(IT Passport)"
- PC version: v2026.6.19-r-pc-ko-quality-milestone
- index.html cache-busters updated

#### Verification Results:
- verify_ko_quality_gate: 26 PASS / 0 FAIL / 0 WARN
- All 4 subjects: FULL (Java/Python/IT Passport/SG)
- JS syntax: PASS
- coverage matrix: PASS
- Individual pack verifications: PASS
- Offline i18n: 0 translation API requests
- No raw key, undefined/null, Chinese residue, needsReview exposure

#### Committed:
- PC commit: "chore(pc): sync Korean terminology quality gate fixes"
- Push: complete

## 恢复命令：
```powershell
Set-Location "G:\项目\sql-learning-hub-web-public"
git status --short --branch
node tools/verify_ko_quality_gate.js

Set-Location "G:\项目\sql-learning-hub"
git status --short --branch
node tools/verify_ko_quality_gate.js
```
