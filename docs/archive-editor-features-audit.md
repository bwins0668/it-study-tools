# Archive 编辑器大功能拆分审计文档

> Round 135.0 | 2026-06-16 | Game Laptop

---

## 背景

Round 85–134 期间，Web 公开版在 `archive/round85-134-editor-overreach` 分支上积累了大量编辑器增强功能。
这些功能从未合入 master，也从未部署到生产环境。
本轮（135.0）目标：对该 archive 分支进行只读审计，产出模块分类与风险评估，为后续 Round 136+ 安全移植做准备。

---

## Archive 分支信息

| 项目 | 值 |
|---|---|
| 分支名 | `archive/round85-134-editor-overreach` |
| HEAD | `9733076b40465735752f5f0592584a5c9f686004` |
| 预期 HEAD | `9733076b40465735752f5f0592584a5c9f686004` |
| 是否匹配 | ✅ 一致 |
| 是否已 merge 到 master | ❌ 未 merge |
| 是否已 push 到远端 | ❌ 未 push |
| master HEAD | `1fe276f029db22918ccaae2ca3ba84cf193e6f84` |
| origin/master | `1fe276f029db22918ccaae2ca3ba84cf193e6f84` |
| master 工作区 | clean |

### Archive Commit 历史（master..archive，共 17 个 commit）

| Commit | 说明 |
|--------|------|
| 9733076 | Round 131.0-134.0: Auto Save + Template Engine + Smart Paste + Format Preview |
| 2017400 | Round 128.0-130.0: Smart Rename + Bracket Colorizer + Region Folding |
| 9bd62a7 | Round 125.0-127.0: Emmet Abbreviations + Multi-Cursor + Diff View |
| 1e4a92e | Round 121.0-124.0: Code Navigation + Hover Tooltips + Outline View + Quick Fix |
| 0491742 | Round 117.0-120.0: Bracket Matching + Smart Indent + Snippets + Collaborative Editing |
| f1b6c56 | Round 112.0-116.0: IntelliSense + Search/Replace + Tab Manager + Code Folding + Minimap |
| d11a3a1 | Round 110.0-111.0: Syntax highlighting + Code formatting |
| 8d2126f | Round 109.0: Code sharing and export/import |
| 720ba22 | Round 108.0: Keyboard shortcuts help |
| e7742e6 | Round 107.0: Code template library |
| f759de7 | Round 106.0: Execution history viewer |
| 0f2a073 | Round 105.0: Performance monitoring system |
| f9a6039 | Round 104.0: Error logging system |
| 1fdc58b | Round 103.5: Fix Python sandbox syntax error |
| 7614adc | Round 103.0: Improve WebCodeRunner adapter |
| 4bbcc11 | Round 102.0: Improve Java sandbox error handling |
| 0cb33ee | Round 101.0: Fix cache & version consistency |

---

## 差异统计

| 指标 | 值 |
|------|-----|
| 总变更文件数 | 41 |
| 新增 JS 文件 | 35 |
| 修改 JS 文件 | 6（app.js, code-runner-api.js, coding_typing.js, java_sandbox.js, python_sandbox.js, version.js） |
| CSS 文件 | 0 |
| HTML 文件 | 1（index.html，修改） |
| 工具/其他 | 2（tools/audit_sw_cache_version.mjs 新增，service-worker.js 修改） |
| Insertions | 12,311 |
| Deletions | 757 |

### 新增 JS 文件清单（35 个）

| 文件名 | 行数 | 来源批次 |
|--------|------|----------|
| advanced-search-replace.js | 454 | R112-116 |
| auto-save-restore.js | 401 | R131-134 |
| bracket-matching.js | 325 | R117-120 |
| bracket-pair-colorizer.js | 295 | R128-130 |
| code-diff-view.js | 381 | R125-127 |
| code-folding.js | 402 | R112-116 |
| code-formatter.js | 169 | R110-111 |
| code-navigation.js | 545 | R121-124 |
| code-outline.js | 472 | R121-124 |
| code-region-folding.js | 446 | R128-130 |
| code-sharing.js | 208 | R109 |
| code-template-engine.js | 599 | R131-134 |
| code-template-library.js | 290 | R107 |
| collaborative-editing.js | 384 | R117-120 |
| emmet-abbreviations.js | 258 | R125-127 |
| error-logger.js | 211 | R104 |
| execution-history.js | 205 | R106 |
| format-preview.js | 381 | R131-134 |
| hover-tooltips.js | 472 | R121-124 |
| intellisense-autocomplete.js | 411 | R112-116 |
| japanese-typing-helpers.js | 167 | — |
| keyboard-shortcuts.js | 119 | R108 |
| minimap-navigator.js | 294 | R112-116 |
| multi-cursor-editing.js | 353 | R125-127 |
| performance-monitor.js | 314 | R105 |
| quick-fix.js | 442 | R121-124 |
| smart-indent.js | 367 | R117-120 |
| smart-paste.js | 412 | R131-134 |
| smart-rename.js | 336 | R128-130 |
| snippets-manager.js | 580 | R117-120 |
| syntax-highlighter.js | 128 | R110-111 |
| tab-manager.js | 484 | R112-116 |

---

## 风险扫描结果

### 总览

| 关键词类型 | 命中数量 | 涉及文件数 | 风险等级 |
|-----------|------:|------:|------|
| innerHTML | 88 | 26 | 🟡 中（需逐文件替换） |
| eval / new Function | 0 | 0 | 🟢 无 |
| WebSocket / EventSource | 1 | 1 | 🔴 高（仅 collaborative-editing.js） |
| fetch() | 2 | 1 | 🟢 低（code-runner-api.js，已有模块） |
| localStorage.setItem / sessionStorage.setItem | 13 | 8 | 🟡 中（需补 schema + 清除策略） |
| token / jwt / secret / apiKey | 0 | 0 | 🟢 无 |
| collaborative / realtime / socket | 11 | 1 | 🔴 高（仅 collaborative-editing.js） |
| password / cookie / session | 1 | 1 | 🟢 无（仅 navigator.cookieEnabled，无害） |

### innerHTML 命中文件明细

| 文件 | 命中数 | 风险 |
|------|------:|------|
| java_sandbox.js | 21 | 🔴 高（已有文件，大量变更） |
| code-template-engine.js | 11 | 🔴 高 |
| code-navigation.js | 11 | 🔴 高 |
| code-region-folding.js | 5 | 🟡 中 |
| format-preview.js | 5 | 🟡 中 |
| snippets-manager.js | 5 | 🟡 中 |
| code-outline.js | 4 | 🟡 中 |
| bracket-pair-colorizer.js | 2 | 🟢 低 |
| code-diff-view.js | 2 | 🟢 低 |
| code-template-library.js | 2 | 🟢 低 |
| execution-history.js | 2 | 🟢 低 |
| hover-tooltips.js | 2 | 🟢 低 |
| quick-fix.js | 2 | 🟢 低 |
| tab-manager.js | 2 | 🟢 低 |
| 其余 12 文件各 1 处 | 12 | 🟢 低 |

### localStorage.setItem 命中文件明细

| 文件 | 命中数 |
|------|------:|
| auto-save-restore.js | 4 |
| advanced-search-replace.js | 2 |
| performance-monitor.js | 2 |
| code-diff-view.js | 1 |
| code-template-engine.js | 1 |
| error-logger.js | 1 |
| smart-paste.js | 1 |
| snippets-manager.js | 1 |

---

## 模块分类

### 第一类：立即可保留的小补丁（7 个）

标准：小范围、不引入网络、不写 localStorage（或低量有 schema）、不使用 innerHTML（或可轻松替换）、不影响执行模型、可独立测试回滚。

| 文件 | 行数 | innerHTML | localStorage | 网络 | 备注 |
|------|-----:|--------:|-----------:|------|------|
| syntax-highlighter.js | 128 | 0 | 0 | 0 | 纯语法高亮，无风险 |
| code-formatter.js | 169 | 1 | 0 | 0 | 1 处 innerHTML 可轻松替换 |
| keyboard-shortcuts.js | 119 | 1 | 0 | 0 | 1 处 innerHTML 可轻松替换 |
| japanese-typing-helpers.js | 167 | 0 | 0 | 0 | 纯逻辑，无风险 |
| code-sharing.js | 208 | 1 | 0 | 0 | 1 处 innerHTML 可轻松替换 |
| execution-history.js | 205 | 2 | 0 | 0 | 2 处 innerHTML 可轻松替换 |
| error-logger.js | 211 | 1 | 1 | 0 | 低量 localStorage，有 schema |

**合计：** 1,207 行 | innerHTML 6 处 | localStorage 1 处

### 第二类：可重构后进入主线的候选功能（13 个）

前提：必须重写 innerHTML 为 textContent/createElement、localStorage 写入必须补 schema + 清除策略、必须补 i18n、必须补移动端测试。

| 文件 | 行数 | innerHTML | localStorage | 重构重点 |
|------|-----:|--------:|-----------:|----------|
| advanced-search-replace.js | 454 | 1 | 2 | 替换 innerHTML + 补 schema |
| bracket-matching.js | 325 | 0 | 0 | 仅 i18n + 移动端测试 |
| smart-indent.js | 367 | 0 | 0 | 仅 i18n + 移动端测试 |
| snippets-manager.js | 580 | 5 | 1 | 重写 DOM + 补 schema |
| format-preview.js | 381 | 5 | 0 | 替换为 textContent/createElement |
| code-folding.js | 402 | 1 | 0 | 少量替换 |
| bracket-pair-colorizer.js | 295 | 2 | 0 | 少量替换 |
| auto-save-restore.js | 401 | 0 | 4 | 需 schema + 清除策略 |
| smart-paste.js | 412 | 1 | 1 | 需双修 |
| code-template-library.js | 290 | 2 | 0 | 少量替换 |
| code-region-folding.js | 446 | 5 | 0 | 需替换 |
| code-diff-view.js | 381 | 2 | 1 | 需双修 |
| emmet-abbreviations.js | 258 | 0 | 0 | 仅 i18n + 测试 |

**合计：** 4,992 行 | innerHTML 24 处 | localStorage 9 处

### 第三类：必须延后的大功能（10 个）

原因：复杂度高、架构影响大、需要完整设计后再移植。

| 文件 | 行数 | innerHTML | 说明 |
|------|-----:|--------:|------|
| intellisense-autocomplete.js | 411 | 1 | 自动补全，复杂度高 |
| tab-manager.js | 484 | 2 | 多文件标签，架构影响大 |
| multi-cursor-editing.js | 353 | 1 | 多光标编辑 |
| smart-rename.js | 336 | 0 | 智能重命名 |
| quick-fix.js | 442 | 2 | 快速修复建议 |
| code-outline.js | 472 | 4 | 代码大纲视图 |
| minimap-navigator.js | 294 | 0 | 迷你地图 |
| code-navigation.js | 545 | 11 | 跳转定义，大量 innerHTML |
| hover-tooltips.js | 472 | 2 | 悬停提示 |
| code-template-engine.js | 599 | 11 | 模板引擎，大量 innerHTML |

**合计：** 4,408 行 | innerHTML 34 处

### 第四类：必须丢弃或完全重写的风险模块（1 个）

| 文件 | 行数 | 风险 | 说明 |
|------|-----:|------|------|
| collaborative-editing.js | 384 | 🔴 极高 | 10 处 collaborative/realtime/socket 关键词 + 1 WebSocket 引用 + 1 innerHTML；实时协作半成品，引入网络依赖，当前项目无此需求 |

**处理建议：** 直接丢弃，不合入。如未来需要协作编辑，必须从零设计。

---

## 推荐执行路线

### Round 136.0：安全小补丁第一批移植

从第一类（7 个小补丁）中选择 3–5 个最实用的模块：

1. `syntax-highlighter.js` — 零风险，直接移植
2. `code-formatter.js` — 替换 1 处 innerHTML 后移植
3. `keyboard-shortcuts.js` — 替换 1 处 innerHTML 后移植
4. `japanese-typing-helpers.js` — 零风险，直接移植
5. `error-logger.js` — 确认 localStorage schema 后移植

每个模块：
- 单独 PR / 单独 commit
- 补 i18n（中/英/日）
- 补移动端冒烟测试
- 确保可独立回滚

### Round 137.0：重构候选第一批

从第二类（13 个候选）中选择低风险模块：

1. `bracket-matching.js` — 无 innerHTML/存储，仅补 i18n
2. `smart-indent.js` — 无风险关键词，仅补 i18n
3. `emmet-abbreviations.js` — 无风险关键词，仅补 i18n
4. `code-folding.js` — 替换 1 处 innerHTML

### Round 138.0：重构候选第二批

继续第二类中较高风险模块：

1. `bracket-pair-colorizer.js` — 替换 2 处 innerHTML
2. `code-template-library.js` — 替换 2 处 innerHTML
3. `auto-save-restore.js` — 补 localStorage schema + 清除策略
4. `format-preview.js` — 替换 5 处 innerHTML

### Round 139+：视情况决定

- 第三类大功能需完整设计文档后再议
- 第四类 collaborative-editing.js 永久不合入

---

## 安全声明

- ✅ archive 分支未 merge 到 master
- ✅ archive 分支未 push 到远端
- ✅ collaborative-editing.js 未发布到任何环境
- ✅ Web 大功能未发布到生产环境
- ✅ 本文档不含 token / password / API key / session / cookie
- ✅ 本文档不含大段源码（仅统计和分类）
- ✅ 无 SQL 执行
- ✅ 无 Supabase / RLS / Auth 修改
- ✅ 无敏感信息泄露
