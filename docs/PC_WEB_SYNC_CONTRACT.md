# PC ↔ Web 同步契约（P15.3 起生效）

本契约在两个仓库中各存一份，内容一致，受版本控制：

- **Canonical Source（PC 完整版）**：`bwins0668/it-study-tools`（本地 `G:\项目\sql-learning-hub`）——共享产品体验、架构、视觉、i18n、账号同步体验的唯一原型。
- **Web adaptation（Web 公开版）**：`bwins0668/study-tools-web`（本地 `G:\项目\sql-learning-hub-web-public`）——PC 共享能力的 Web 适配实现（Cloudflare Pages，master 分支自动部署）。

机器可读状态：`docs/pc-web-sync-state.json`（两仓库同内容）。
门禁工具：`tools/verify_pc_web_sync_contract.js`（两仓库同内容，可在任一仓库运行，要求双仓库位于同级目录）。

## 1. 共享范围（PC 改动必须同步 Web）

Design System token 与全部 `assets/css/ds/*.css`、`index.css`、`light-theme.css`；Global Rail / Brand / Header / Utility Group / Context Sidebar / 目录开关与焦点规则（`shell.js`、`surfaces.js`、`home.js`、index.html 壳层区段）；课程·章节·课时信息架构与学习工作区（`app.js` 本体、`lesson-nav.js`、`practice.js`）；双语模式与 i18n 静态 UI 与 BCP-47 长码边界（`i18n.js`、`i18n-ui-dict.js`、`locale-registry.js`、`content-i18n.js`）；主题与动效；账号与同步 UI 及全部状态（`auth-ui.js`、`sync-engine.js`、`supabase-client.js`、`supabase-config.public.js`）；CBT Preflight / Active Exam 状态层；常规练习 UI；无障碍 / 响应式 / 错误与空状态。

**同步方式分级**（见 sync-state 的 `mode` 字段）：
- `direct-copy`：文件级完全一致，门禁做逐文件比对。
- `adapted`：以 PC 为骨架 + 登记在案的 Web 织入段（`app.js` = PC 本体 + 尾部 SW 注册块；`index.html` = PC 骨架 + Web 引用织入/updater 区段移除）。门禁校验存在性与登记状态，不做盲目 hash。

## 2. PC-only 范围（不同步 Web，Web 用克制降级说明）

`python/` embedded runtime、`bootstrapper/`、`updater/` 与 updater-ui、Portable 打包链（`tools/create_release.py`、`tools/provision_runtime.ps1`、`tools/verify_portable_runtime_proof.ps1`）、Windows 进程控制、本地 Java/Python 沙盒执行链（`server.py` 的 /api/execute 本地实现）、VSTO / Excel 原生宿主（`native/`）、MOS365 实操面板（`assets/js/mos365.js`、`data/mos365_content.js`——依赖本地 Excel 环境）、LocalAppData 安装路径、`tests/`。

Web 端对应处理：MOS365 rail 入口显示「Windows PC 版可用」轻量说明（config.web.js）；更新器替换为真实 GitHub Releases 链接（statusbar 与工具抽屉），不伪造"检查更新"。

## 3. Web-only 范围（不反向污染 PC）

`manifest.webmanifest`、`service-worker.js`（CACHE_NAME 版本控制）、`assets/js/config.web.js`（含 Web 专有 i18n key 运行时注入与平台降级逻辑）、浏览器执行链（`code-runner-api.js`、Web 版 `java_sandbox.js` / `python_sandbox.js`、`sqlite-adapter.js`、`sandbox_bridge.js` 挂钩、`functions/` Cloudflare Functions）、`_headers` 部署配置、公开路由与缓存策略。

**注意**：`java_sandbox.js` / `python_sandbox.js` 在两仓库同名但内容不同（PC=本地执行版，Web=浏览器 API 版）——属于 Web-only 适配，PC 版**不得**覆盖 Web 版。

## 4. 未来变更触发规则

- PC 共享范围改动 → **必须**同步 Web 并更新两仓库的 `pc-web-sync-state.json`（`pcSourceCommit` / `webAdaptationCommit` / `syncedAt`），跑 `verify_pc_web_sync_contract` 通过。
- PC-only 改动 → commit message 含 `[PC-ONLY]` 标记，或改动文件全部落在 sync-state 的 `pcOnlyPathPrefixes` 内（门禁自动豁免），Web 可不动。
- Web-only 改动（PWA/部署/浏览器适配）→ 登记于 sync-state `webOnly`，不回流 PC。

## 5. 发布前门禁

**PC 创建正式 GitHub Release 前必须**：`node tools/verify_pc_web_sync_contract.js` PASS。若本次改动触及共享范围而 Web 未同步 → 禁止 Release；若仅 PC-only（更新器/VSTO/Portable runtime 等）→ 门禁自动豁免放行，不阻断纯 Windows 修复。

验证命令（双仓库同级目录下任一仓库内运行）：

```
node tools/verify_pc_web_sync_contract.js
```
