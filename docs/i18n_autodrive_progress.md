# I18n Autodrive Progress

更新时间：2026-06-19 23:10 JST

当前小轮次：
- Subround 1：PC 等价韩语覆盖率矩阵增强

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

已验证：
- Web `node --check`：67 个 JS 文件 PASS。
- Web `node tools/verify_i18n_coverage_matrix.js`：39 PASS / 0 FAIL / 34 WARN。
- Web browser i18n：`verify_all_language_content_switch.js` 70 PASS / 0 FAIL / 0 WARN。
- Web offline i18n：翻译 API 请求 0。
- Web mobile layout：12 PASS / 0 FAIL。
- PC `node --check`：76 个 JS 文件 PASS。
- PC `node tools/verify_i18n_coverage_matrix.js`：39 PASS / 0 FAIL / 34 WARN。
- PC browser i18n：`verify_all_language_content_switch.js` 70 PASS / 0 FAIL / 0 WARN。
- PC offline i18n：翻译 API 请求 0，仍有 3 个 th fallback WARN。

已 commit：
- Web 覆盖矩阵提交：`3939d89 test(web): strengthen i18n coverage matrix`
- PC 覆盖矩阵提交：`27329d8 test(pc): strengthen i18n coverage matrix`
- 进度文档：随本文件提交记录。

已 push：
- 本轮提交后推送到远端；恢复时以 `git status --short --branch` 无 ahead 为准。

下一小轮次：
- Subround 2：Web 韩语 SQL 终审。

未完成原因：
- 本次只推进到 Subround 1，后续内容包终审/补齐尚未开始。
- Web 韩语 Java / Python / IT Passport / SG 仍为 STARTER。
- PC 韩语 Java / Python / IT Passport / SG 仍为 FALLBACK。
- Korean Coding typing UI 仍为 STARTER：80/91 keys，11 missing。

恢复命令：
```powershell
Set-Location "G:\项目\sql-learning-hub-web-public"
git status --short --branch
node tools/verify_i18n_coverage_matrix.js

Set-Location "G:\项目\sql-learning-hub"
git status --short --branch
node tools/verify_i18n_coverage_matrix.js
```
