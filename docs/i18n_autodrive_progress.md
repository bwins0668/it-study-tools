# I18n Autodrive Progress

更新时间：2026-06-20 00:05 JST

当前小轮次：
- Subround 6：IT Passport 韩语内容包扩展 + PC 同步

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
- Subround 6 IT Passport 提交：待本文件提交后记录。
- 进度文档：随本文件提交记录。

已 push：
- 本轮提交后推送到远端；恢复时以 `git status --short --branch` 无 ahead 为准。

下一小轮次：
- Subround 7：SG 韩语 starter -> USABLE + PC 同步。

未完成原因：
- Web 韩语 SG 仍为 STARTER。
- PC 韩语 SG 仍为 FALLBACK。

恢复命令：
```powershell
Set-Location "G:\项目\sql-learning-hub-web-public"
git status --short --branch
node tools/verify_i18n_coverage_matrix.js

Set-Location "G:\项目\sql-learning-hub"
git status --short --branch
node tools/verify_i18n_coverage_matrix.js
```
