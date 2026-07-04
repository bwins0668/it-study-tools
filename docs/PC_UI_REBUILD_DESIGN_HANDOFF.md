# PC UI 重建设计交接文档（P1–P9）

分支 `feat/pc-ui-rebuild`｜基线 `1827f8c`｜P9 视觉纠偏完成于 2026-07-04
本文档是桌面端 UI 重建的唯一设计事实源。上会话遗失的原设计计划由本文档取代。
**P9 起视觉方向为 Quiet Technical Workspace**（安静、精确、低刺激的专业学习工具），详见 §16。

---

## 1. 重建设计目标

- 把"卡片墙 + 多套并存导航"的旧界面收敛为**桌面优先的学习工作台**：一条常驻 Nav Rail、一个可召唤的学習ワークスペース、安静的高密度信息层。
- 视觉：深色「炭绯」（Charcoal × Scarlet）默认，浅色「暖纸」（Warm Paper）；红系 accent 只用于选中/主行动/焦点，danger 与 accent 明确分离。
- 一切改动**复用既有真实能力**（switchSubject / load*Lesson / StudyDashboard / MOS365 注入入口 / 工具抽屉 / toggleTheme / i18n），不伪造状态、不重写课程数据、不触碰评分与安全逻辑。
- 新逻辑一律以**叠加层/委托层/观察层**实现（shell.js / home.js / lesson-nav.js / practice.js / surfaces.js），旧代码回归面最小化。

## 2. 信息架构

```
app-frame
├─ nav-rail（56px，z-sticky）
│   Home｜SQL Java Python ITパス SG｜タイピング 编程打字｜MOS365｜工具 主题
├─ app-frame__body（position:relative）
│   ├─ app-container（旧 UI：header / sub-headers / main-app-body(sidebar+workspace)）
│   └─ home-workspace（overlay，z-sticky，DOM 在 app-container 之后 → 同层胜出）
└─ app-statusbar（28px：状态点 + 版本 + updater 徽标位 + 快捷键）
全屏层：typing-hub / coding-typing-hub（避让 rail+statusbar）；mos365-shell（有意全屏，z:10060）
```

- **模块导航唯一化（P6）**：桌面(≥721px) rail 是唯一模块导航；旧 brand 下拉面板隐藏、箭头移除，brand 点击/Enter 重定向到工作台。移动(≤720) rail 隐藏，brand 下拉照常（唯一模块导航）。`#module-switch-panel` DOM 保留——MOS365 注入入口 `#module-switch-option-mos365` 经 JS `click()` 触发，不依赖可见性。
- **学習ワークスペース（P2）**：overlay 模式不触碰 `main-app-body` 显示状态机；打开时对 `app-container` 加 `inert` 防被盖层焦点泄漏；任何 `switchSubject` 调用自动关闭（shell.js 钩子）。

## 3. 视觉规范与 Token（tokens.css 为唯一来源）

| 类别 | Token | 深色（炭绯） | 浅色（暖纸） |
|---|---|---|---|
| 背景 4 层 | `--bg-0..3` | #121213 / #171718 / #1D1D1F / #252528 | #F4EFE6 / #FAF6EE / #FFFEFA / #ECE5D6 |
| 文本 4 层 | `--tx-1..3, --tx-disabled` | #ECEAE8 / #B0ADA9 / #787571 / #55524E | #2A251C / #5C5546 / #8C8371 / #B3AA98 |
| 边框 | `--bd-1/2` | 白 7%/14% | 墨 11%/20% |
| 强调 | `--accent`(+hover/press/subtle/on) | 砖红 #B4544C（P9 降饱和） | 氧化红 #9E5049（P9 金棕退役） |
| 状态 | `--ok/--warn/--danger`(+subtle) | #56A56C / #D9A13B / #C03A30 | #4E7A46 / #A87817 / #B5433A |
| 字号 | `--fs-12..28` | 12/13/14/16/18/22/28px | 同 |
| 行高 | `--lh-cjk/ui/code` | 1.75 / 1.4 / 1.6 | 同 |
| 间距 | `--sp-1..9`（4px 基数） | 4→48px | 同 |
| 圆角 | `--r-1..4` | 4/6/8/12px | 同 |
| 阴影 | `--shadow-1/2` | 深色以边框分层为主 | 浅色卡片用阴影 |
| 层级 | `--z-raised/sticky/dropdown/overlay/modal/toast` | 10/100/200/300/400/500 | 同 |
| 动效 | `--dur-1/2/3` + `--ease` | 120/180/240ms cubic-bezier(0.2,0,0,1) | 同 |
| 壳层 | `--rail-w/header-h/ctx-w/aside-w/statusbar-h` | 56/48/260/420/28px | 同 |

规则：业务样式只引用 token，禁裸色值；danger 必须伴随图标与文案；`ds-` 前缀组件只引用 tokens。

## 4. 组件规范（components.css）

`ds-btn`（primary/secondary/ghost/danger × sm/lg）、`ds-iconbtn`、`ds-spinner`、`ds-input/select` + field-hint、`ds-tabs/tab`、`ds-card`（禁卡中卡）、`ds-list/list-item`、`ds-badge/dot`、`ds-progress`（**display:block**——P2 修复 inline 塌陷）、`ds-modal`、`ds-empty`、`ds-error-strip`、`ds-skeleton`、`ds-toast`、`ds-kbd`、`ds-ja/zh-aux`（双语层）、`ds-visually-hidden`。

## 5. 页面地图（P2–P6 迁移范围）

| 模块 | 层 | 文件 |
|---|---|---|
| 壳层（rail/statusbar/skip-link） | P1 | shell.css / shell.js |
| 学習ワークスペース（继续学习/五科进度/快捷行动/空状态） | P2 | home.css / home.js |
| 课时导航（前の課/次の課/完成徽标/焦点管理） | P2 | lesson.css / lesson-nav.js |
| 练习状态层（键盘可达/正误标注/边界禁用/溢出保护） | P3 | practice.css / practice.js |
| 表面一致性（AI inert/MOS 高亮恢复/brand 收口） | P4/P6 | surfaces.js |
| 遮罩策略/主题事实源 | P5 | app.js（最小两处）/ shell.js |

数据契约（全部只读复用）：课程数组 `SQL_LESSONS/JAVA_LESSONS/PYTHON_LESSONS/IT_PASSPORT_LESSONS/SG_LESSONS`（顶层 const，跨脚本以裸 `typeof` 探测）；完成状态 `sql_hub_completed / *_completed_lessons`（写入仅由 quiz/任务行为经 `saveProgress()`）；继续学习 = `max(completed)+1`。

## 6. 导航与键盘规则

- Tab 首跳 = skip-link（shell.js 首键拦截，对抗既有脚本抢占顺序焦点起点）→ 二跳进 rail → skip-link Enter 直达 `#main-app-body`。
- focus-visible：ds 范围统一 2px accent 描边；`:focus { outline:none }` 仅限 `.ds-scope` 内。
- quiz 选项：radiogroup/radio + Enter/Space 激活；课时切换后焦点回标题（`tabindex=-1` + focus）。
- off-canvas / 被盖层不得保留可 Tab 焦点：AI 抽屉与 AI 模态无 `.open` 时 `inert`（surfaces.js 观察）；workspace 打开时 `app-container` inert；工具抽屉关闭即 `hidden`（既有健全行为）。
- 快捷键：P1 预留 statusbar 提示（Ctrl Shift /），全局接管计划见 §12。

## 7. 响应式规则（全站 4 档）

`≥1280`：完整布局。`1024–1279`：rail 保持，home 概览列收窄。`721–1023`：go 提示隐藏。`≤720`：rail/statusbar 隐藏，复用既有 mobile 抽屉；brand 下拉恢复为唯一模块导航；workspace 单列 + 右上关闭按钮。全档零横向溢出（smoke 断言）。

## 8. 主题规则（P9 收口后架构）

浅色由三层构成，全部以 token 为值来源：
1. **tokens.css**：`body[data-theme="light"]` 变量翻转（唯一颜色定义点）；
2. **quiet.css**：旧全局变量重映射（`--bg-primary/--text-main/--neon-*` → token；`:root` 深色 + `body[data-theme="light"]` 浅色两段）；
3. **runtime 主题层（app.js `RUNTIME_LIGHT_THEME_CSS`）**：对未迁移旧区域的兜底——通配段只管文字/边线/阴影（不碰背景，背景由变量重映射自动适配），面层/凹陷层/主行动/正误语义分段与通配同特异性、按源序分层；`.ds-scope` 区整体排除。
- **light-theme.css 已卸载**（index.html 注释了 link；文件保留仅作历史参考）；其"高对比核弹段"已删除。
- ds 文件不再携带任何浅色防御块（P9 删除，净减一层 `!important`）。
- 主题图标以 `body[data-theme]` MutationObserver 为唯一同步源（P5）。

## 9. i18n 规则

- UI 词典 `i18n-ui-dict.js`：新增 `home.*`、`lessonNav.*`（ja-JP/zh-CN/en-US/fr-FR 四语，其余 locale 走既有 fallback 链）。
- 动态渲染文本 = `I18n.t(key, fallback)` 取值 + 元素挂 `data-i18n`（运行时切换由 i18n 扫描自动重翻，P4 实测 rail aria/docLang 即时同步）。
- 属性翻译用 `data-i18n-aria-label`；日文为主学习层（`data-i18n-policy="source-ja"`），中文仅辅助解释层。
- 模板占位符替换必须全局（`replace(/\{id\}/g, …)`——双语模板含多个占位符，P2 实修）。

## 10. 无障碍规则

已落地：skip-link 首跳、focus-visible accent、reduced-motion 归零（`!important`，防同特异性组件规则覆盖——P1 实修）、quiz radio 语义、状态"文字+视觉"双表达（✓正解/✗不正解 + 反馈条 role=status）、inert 焦点治理（AI/workspace）、rail tooltip 复用 aria-label、按钮均有文字通道（tooltip/aria/可见文字）。

## 11. 关键交互状态

- 継続学習：空进度 → 「学習を始める」（SQL 第 1 課）；有进度 → 「続きから学習 · 第N課」；全完成 → 「最初から復習」。
- 课时完成：只读徽标（未完了·課題クリアで完了 ↔ 完了済み ✓），**不提供手动标记**——完成由 quiz/任务判定驱动，手动标记会绕过学习验证语义。
- quiz：选中（accent）→ 提交 → 所选项 ok/danger 标注 + 反馈条图标文字 → 重选即清除、可再答。
- MOS365：全屏考试遮罩为有意设计（覆盖 rail/statusbar，须経閉じる退出）；关闭后 rail 高亮自动恢复。
- 沉浸遮罩 = 全屏邀请（requestFullscreen 需手势）：跳过一次即持久化不再弹；选择全屏的用户保留每会话弹出。

## 12. 截图索引（`docs/ui-rebuild-baseline/`、`docs/ui-rebuild-evidence/`，均被 .gitignore 忽略）

- baseline（smoke 产出，两档矩阵）：`{home,sql,itpass,sg,java,python,typing,coding-typing,mos365}-{dark,light}-1440`、`*-dark-{1280,1024,390}`、`focus-chain.json`、`report.json`
- evidence（交互脚本 + 矩阵）：P1 `evidence-{rail-clicks,theme-light,tools-drawer,720-degrade,reduced-motion,mos365-open}`；P2 `evidence-p2-{home-empty,home-progress,dashboard,lesson-footer,home-light}`；P3 `evidence-p3-{quiz-correct,playground}`；P4 `evidence-p4-ai-drawer-open`；P5 `evidence-p5-home-390`；P6 `evidence-p6-mobile-panel`；矩阵 `matrix-{lesson-bilingual-both,lesson-ja-only,lesson-zh-only,quiz-initial,quiz-selected,quiz-wrong,playground-error,ai-settings-modal,updater-panel,home-zh-cn,lesson-light-1440,home-light-390,skiplink-focused}`
- 验证脚本本体：`interactive_p1..p6_check.js`、`evidence_matrix.js`、`probe_focus*.js`（可随时重放）

## 13. 真实验证结果（最终态）

- `node tools/verify_pc_ui_smoke.js`（基础/`--full`）：PASS（console 零 error、网络零 4xx/5xx、四视口零横向溢出、焦点链 skip-link→rail 起步）
- 交互验证 P1–P6：全部 PASS（P1 36 项、P2 20 项、P3 12 项、P4 10 项、P5 6 项、P6 5 项）
- `npm test`：pretest 内容校验 + 94 个 MOS365 服务测试 OK（与基线一致，无新增失败）
- `npm run test:responsive-nav`：基线固有失败（见 §15）

## 14. 已修复 bug（根因 → 最小修复）

| # | 问题 | 根因 | 修复 |
|---|---|---|---|
| 1 | reduced-motion 失效 | 归零规则与组件 transition 同特异性且加载在前 | base.css 归零加 `!important` |
| 2 | 浅色壳层被刷白 | 旧 runtime override 全局 `!important` | 新区域防御块（§8） |
| 3 | skip-link 永拿不到首跳 | 既有脚本抢占顺序焦点起点 | shell.js 首键一次性拦截 |
| 4 | smoke 浅色截图全被 MOS 面板污染 | MOS 为 overlay，switchSubject 不关它 | 截图后 reload 清态 |
| 5 | `--full` 视口矩阵命名 dark 实为 light | 主题循环以 light 结束未归位 | 矩阵前 setTheme(dark) |
| 6 | ds-progress 不可见 | span 容器中 inline 塌陷 | 组件级 `display:block` |
| 7 | 継続学習文案 `第{id}課` 残留 | 双语模板多占位符仅替换首个 | 全局正则替换 |
| 8 | home 被旧 header 盖住 | 同 z-index(100) DOM 先序落败 | workspace 移至 app-container 后 + inert |
| 9 | quiz 选项键盘不可达 | div 渲染无语义 | practice.js 委托补 radio 语义 |
| 10 | 多题导航末题静默 no-op | 边界不禁用 | 进度文本解析同步 disabled |
| 11 | AI 抽屉 off-canvas 焦点泄漏 | transform 移出不阻 Tab | surfaces.js inert 生命周期 |
| 12 | MOS 关闭后 rail 高亮残留 | overlay 与 rail 状态无同步 | is-open 观察 → 高亮恢复 |
| 13 | 旧主题按钮切换 rail 图标不跟随 | 仅 rail 点击时同步 | body[data-theme] 观察为唯一事实源 |
| 14 | 沉浸遮罩每次启动强制弹出 | 仅 sessionStorage 记忆 | skip 持久化 localStorage（§11） |
| 15 | 桌面双主导航抢焦点 | brand 下拉与 rail 全量重复 | P6 收口（§2） |

## 15. 未处理但确认不阻塞的风险

- **内容区浅色仍为强制白 override**：既有行为，可读性有保障；移除路线见 §8。
- **`verify_responsive_navigation_smoke` 深层断言失败**：基线固有（该测试 6-25 后未随 UI 演进维护；本轮已修复其遮罩拦截使其恢复可运行，深层失败点在移动抽屉关闭按钮旧断言，与本分支改动面无交集；移动端核心路径由本轮交互验证独立覆盖）。
- 旧 CSS 的 19 处 `transition:all`、`.quiz-option` 多处 mode 定义、`.subject-tab` 遗留 DOM（源码注明 legacy 依赖）：工作正常、未与新壳冲突，按"不为干净而删"原则保留。
- `#statusbar-update-badge` 待 updater 正式接管（P1 预留位，现 hidden 无害）。
- 小字号 `--tx-3` 在深色下对比度约 4.5:1 边缘，正文层级未受影响；后续微调建议提亮至 #82807B。

## 16. P9 视觉纠偏纪要（Quiet Technical Workspace）

**推翻的 P1–P8 假设**：
- "旧界面 + 新 token 叠加层"不构成视觉验收——P1–P8 的功能与交互成果保留，但视觉被判定为"旧界面套壳"（方框税/双导航/浅色刺眼/深色颜色失控四项反例）。
- "炭绯 + 暖纸"的字面延续被重置为 Quiet Technical Workspace：中性灰为默认，砖红/氧化红仅当前选中与主行动，语义色只表达真实状态。
- "防御块 + !important 对抗"路线被废弃：改为来源收口（light-theme 卸载、漂白段 token 化、变量重映射）。

**P9 关键修复（根因 → 处置）**：
| 问题 | 根因 | 处置 |
|---|---|---|
| 打字页红墙 | P1 token 泄漏：旧组件 `var(--accent, #6366f1)` 被全局 `--accent` 灌红 | 作用域重定义 + 选中态弱底左条；主行动让位「在沙盒中运行」 |
| 浅色白底黑框线框感 | app.js runtime 核弹（#fff/#000/#111）+ light-theme"高对比段"双源 | runtime 重写为暖纸石墨低对比线；高对比段删除；light-theme 卸载 |
| 主行动白色大按钮 | index.css 两处"漂白轮"`background:#ffffff !important` | 值 token 化（accent），不新增层 |
| 右列深壳/结果区纯黑 | `.playground-card` 半透深底、"Sinking"纯黑段、`.app-container` 近黑渐变（全 `!important`） | 全部值 token 化 |
| 双语列灰块 | `.concept-body` 半透黑（浅色下成灰卡） | 透明化，排版留白分层 |
| 模式 tab/子头浮起框 | 两处漂白 active 段白框白底 | 弱 accent 底、无框无影 |
| lang-tabs 三枚描边按钮 | 多级旧选择器特异性 | 下划线式 tab（`body .content-card` 链压平） |
| 霓虹变量残留 | `--neon-cyan:#fff` 等旧变量体系 | quiet.css `:root` + 浅色两段全部重映射到 token |

**边框预算实施**：正文区（concept/analogy/lang-tabs/quiz-question）零边框化，以留白、字阶、细分隔线分层；仅可操作容器（编辑器/选项行/输入区）与一层 surface 保留低对比边线；全站禁"描边+阴影+高对比填充"三叠加（视觉 smoke 断言把守）。

**已知遗留（不阻塞）**：
- light-theme.css 文件保留在仓库（已卸载、未删除），确认无回访需求后可物理删除；
- 沉浸遮罩视觉未重设计（功能正常，P5 已治理弹出策略）；
- itpass 词卡/工具箱等右栏组件仍带旧卡片边框（低对比可接受，后续可按边框预算继续瘦身）；
- coding-typing 的类别 chips 悬停背景来自旧 CSS（灰阶已合规）。

## 17. P10 可用性收口纪要

**导航与目录**：目录触发器从 16px hover 竖条重做为 44×44 图标按钮（`#context-nav-toggle`，shell.js 驱动）：click/键盘开合、aria-expanded 同步、展开时滑至目录右上内侧成收起把手、焦点入当前课时/Esc 后回按钮；旧竖条桌面退役（≤720 仍由汉堡+抽屉承担）。根因修复：`openDesktopSidebar` 此前从未导出到 window，一切编程式打开均静默失效。

**MOS365 启动体验（web 层）**：真实诊断确认 Excel 启动成功（pid+相位时间戳完整）、卡死点为 `awaiting_attach`（VSTO Exam Host 未安装则永不连接）。现为：4 步 stepper（全部由 `launch/state` 真实相位驱动）→ 20s 未连接出现 stall 引导（含 `tools/install_mos365_exam_host.ps1` 安装指引）→ 取消/重试（记忆 taskId）/診断情報（sessionId·pid·全相位 JSON）/返回工作台；轮询按状态签名 diff 重绘防闪。**技术边界**：运行中 Excel 内的训练面板形态属 native VSTO 宿主（`native/`，未部署的历史产物），web 层无法重塑；Companion 形态改造记为后续 native 工作。

**图标体系**：UI 控件统一 fa-solid 线性体系；工具抽屉 9 枚 emoji 与沙盒 ▶ 字符全部退役；smoke 断言 emoji 图标数为 0、仅图标按钮必须有 aria/tooltip。

**smoke 新增规则**：目录触发器 ≥44×44 + aria、未命名图标按钮=0、emoji 图标=0（连同 P9 规则组成视觉质量门）。

**训练面板高度（P12.1 追记）**：底部 CustomTaskPane 高度必须 ≥ 内容各段合计（281px）+ Excel CTP 标题条（~30px）；现值 340（`VstoBottomPanePoc/ThisAddIn.cs`）。改 native 面板后用 VS18 MSBuild 重建 Release 即可（`vstolocal` 清单免重注册）；验证方式=真实启动链 ready 后 DPI 感知截取 Excel 主窗口。

**工作簿 schema 修复（P10 追记）**：用户实测 Excel 打开训练工作簿弹"内容有问题"修复对话框——根因是 `docProps/custom.xml` 属性元素误写为 `<vt:property>`（应为默认命名空间 `<property>`，仅 `vt:lpwstr` 属 vt），另 5 处 styles 含空 `<numFmts count="0"/>`。经 Excel COM A/B 消融 + 对照组定位，修复后 Excel 打开无对话框、另存往返元数据保留（Excel 规范化输出与修复形态一致）。教训：手写 Open XML 必须以"Excel 往返（打开→另存→diff）"为验收，不能只看 zip 能否解析。

## 18. P11 视觉凝聚纪要

- **目录机制终形态**：触发按钮（44×44，收起态可见）↔ 目录头部行收起按钮（展开态，结构的一部分）；触发按钮展开时淡出而非位移；收起态目录 `display:none`（无幽灵槽），开合动画由 app.js 先置内联 display 再切 class 的既有机制保障。
- **留白预算**：rail→正文死带 87px→~33px（幽灵槽 1px + 让位 64→16px）；双语列 gap 32px。
- **沙盒统一**：java/python 沙盒的结构性变量全部收编 token（品牌色仅存语法高亮）；运行按钮 = 区域唯一 Primary；stdin 行 bg-1。
- **品牌 monogram**：内联 SVG（`brand-mark__plate/fold/line--main/line--sub` 四类 token 着色），折角=accent 记忆点，深浅自适配；模块图标由 rail 唯一承担。
- **更新入口**：教训级缺陷——`display` 显式声明会压过 `hidden` 的 UA 样式（`[hidden]{display:none}` 特异性仅 0,1,0），P1 的"检查更新"色块因此意外显示五轮；修复后凡带 display 的组件必须补 `[hidden]` 分支。版本号即更新入口（`#statusbar-version-entry`→StudyUpdater.open）。
- **动效**：`--transition-smooth` 全局收紧至 160ms 统一曲线。

## 19. 未来维护原则

1. 新增界面一律引用 tokens；禁 `transition:all`、裸色值、`!important`（浅色防御块为唯一豁免且随 override 一起退役）。
2. hover 只在 `(hover:hover) and (pointer:fine)` 下启用；动效只用 transform/opacity；新增动效必须过 reduced-motion。
3. 新交互层沿用叠加/委托/观察模式，不直接改写 app.js 渲染函数；跨脚本读取顶层 const 用裸 `typeof`。
4. 每次壳层/导航/主题改动必须跑：`node tools/verify_pc_ui_smoke.js --full` + 相关 `interactive_p*_check.js`；截图证据入 evidence 目录（不提交二进制）。
5. i18n 新键至少覆盖 ja/zh/en/fr；动态节点同时给 `data-i18n` 与 `t()` 初值。
6. MOS365 / updater / 签名 / bootstrapper / server.py 属安全与发布链，UI 层只经既有公开入口调用。
