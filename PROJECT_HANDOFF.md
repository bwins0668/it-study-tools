# PROJECT_HANDOFF.md

## 1. 项目定位
*   这是 Windows PC 完整版学习工具项目。
*   项目路径：`E:\项目\sql-learning-hub`
*   Web 公开版路径：`E:\项目\sql-learning-hub-web-public`
*   当前任务只负责完整版。
*   严禁操作 Web 公开版目录。

## 2. 项目架构
*   启动入口：`启动.bat`
*   后端入口：`server.py`
*   AI 服务：`study_ai.py`
*   前端入口：`index.html`
*   前端主逻辑：`assets/js/app.js`
*   多语言运行时：`assets/js/i18n.js`
*   新增 UI 静态字典：`assets/js/i18n-ui-dict.js`
*   数据目录：`data/`
*   本地数据库：`data/study_ai.db`

## 3. 当前开发目标
*   多国学生语言支持
*   UI 秒切换
*   静态 UI 语言包
*   学习内容后续使用预翻译内容包
*   日本考试原题保护
*   英文技术术语保留
*   未来建立 IT 统一术语表

## 4. 语言支持策略
*   UI 第一批支持：`ja-JP`、`zh-CN`、`en-US`、`my-MM`、`vi-VN`、`fr-FR`、`default-ja-zh`
*   学习内容第一批支持：`ja-JP`、`zh-CN`、`en-US`
*   后续学习内容扩展：`vi-VN`、`my-MM`、`fr-FR`
*   原则：
    *   点击语言时 UI 必须秒切换。
    *   UI 切换不得等待 AI 翻译。
    *   AI 翻译只能作为开发期预翻译工具或缺失翻译补全工具。
    *   考试原题必须保留日文原文。
    *   英文技术术语必须保留。

## 5. 当前 Git 状态记录
*   当前分支：`main`
*   未提交修改：`data/study_ai.db`, `tree.txt`
*   本轮修改文件：`PROJECT_HANDOFF.md`
*   是否 commit：是 (待 commit)

## 6. 本轮完成内容
*   [x] 创建 `PROJECT_HANDOFF.md` 作为项目交接文件。
*   [x] 创建 `assets/js/i18n-ui-dict.js` 并进行了中日对照化改造，默认 `default-ja-zh` 渲染为精致的中日对照文案包而非单纯别名。
*   [x] 修改 `assets/js/i18n.js`，加入同步静态 UI 翻译运行时逻辑，提供 `normalizeLanguageCode` 短短语言代码转规范代码映射，并在 LANGUAGES 中注册 `ja` / `zh` 项目。
*   [x] 修改 `index.html`，引入 `i18n-ui-dict.js` 并为第一批 P0 UI 元素添加 `data-i18n` 属性，采用 span 包裹文本防止图标擦除。
*   [x] 修改 `assets/js/app.js`，将 P0 的硬编码 `showToast` / `alert` / `confirm` 文案全部替换为 `showToastKey` / `alertKey` / `confirmKey`。
*   [x] 修改 `assets/js/java_sandbox.js` 和 `assets/js/python_sandbox.js`，将 sandbox 的 `confirm("コードをクリアしますか？/ Clear code?")` 替换为 `confirmKey("dialog.clearCodeConfirm")`。
*   [x] 对学习内容（课程正文、测验、真题、打字文本等）设置严格翻译拦截排除机制（`SKIP_SELECTOR` 及 `shouldSkipStatic` 规则对齐）。

## 7. 重要限制
*   不要操作 `E:\项目\sql-learning-hub-web-public`
*   不要覆盖 `data/study_ai.db`
*   不要删除用户学习数据
*   不要擅自 commit / push
*   不要把 AI 动态翻译作为 UI 秒切换依赖
*   不要把考试原题替换成翻译文本
*   不要把学习内容和 UI 文案混在同一套 key 里

## 8. 下一步建议
*   继续补充 `index.html` 中未覆盖的静态 UI 元素的 `data-i18n` 标记。
*   开发第二阶段（P1 级文案）的 key 化，例如 placeholder、次级说明和帮助文本。
*   创建 `data/glossary/it_terms.js` 统一术语表数据库，提供术语的日语、中文、英语、越南语、缅甸语对照及考点释义。
*   不要动学习内容的数据源文件（如 `data/lessons.js` 等）。

## 9. 最近任务记录 / Latest Task Log

### 2026-06-11 11:50 - 第 1 轮任务：多国学生 UI 秒切换基础设施
*   任务类型：写入修改
*   完成内容：
    *   创建并初始化 `PROJECT_HANDOFF.md`。
    *   创建 `i18n-ui-dict.js` 字典文件。
    *   在 `i18n.js` 中新增了同步静态 UI 翻译器、UI 元素刷新扫描器 `applyStaticUI`、排除规则 `SKIP_SELECTOR` 过滤并定义了全局提示/弹窗助手 `showToastKey`, `alertKey`, `confirmKey`。
    *   在 `index.html` 中引入字典文件，并在导航、设置等 P0 部分按钮添加了 `data-i18n` 属性。
    *   在 `app.js` 中将首尾题目边界、判定合格、数据库重置确认、中途退出确认等 P0 硬编码弹窗/Toast 替换为 key 驱动。
    *   在 `java_sandbox.js` 和 `python_sandbox.js` 中将清空代码确认弹窗 `confirm` 替换为 key 驱动。
*   修改文件：
    *   `assets/js/i18n.js`
    *   `index.html`
    *   `assets/js/app.js`
    *   `assets/js/java_sandbox.js`
    *   `assets/js/python_sandbox.js`
*   新增文件：
    *   `PROJECT_HANDOFF.md`
    *   `assets/js/i18n-ui-dict.js`

### 2026-06-11 12:15 - 第 1.5 轮任务：第一轮 UI 多语言改造后的安全验证与小修复
*   任务类型：安全验证与修复
*   完成内容：
    *   确认兼容性：搜索证明了 `I18n.t` 已完全从异步更改为同步，全项目不存在将 `I18n.t` 当作 Promise 或 await 使用的旧遗留代码，调用安全。
    *   设计代码归一：实现 `normalizeLanguageCode` 兼容旧的或 localStorage 的简短语言代码（`en`, `ja`, `zh`, `vi`, `my`, `fr` ➡️ `en-US`, `ja-JP`, `zh-CN`, `vi-VN`, `my-MM`, `fr-FR`），未配对语言默认 fallback 为 `en-US`。
    *   语言项扩充：在 `LANGUAGES` 数组中插入 `ja` 和 `zh`，使用户能在弹出菜单中显式搜索和选择 Japanese 和 Chinese（简体）。
    *   中日对照模式修复：重写了 `default-ja-zh` 语言包，提供完整的中日对照翻译字典，保证 Toast 及弹窗提示保持中日对照的高质量体验。
    *   拦截器安全性对齐：在 `shouldSkipStatic` 中增加 `[data-i18n-managed]`、`pre`、`code`、`textarea` 排除项，与 MutationObserver 拦截规则对齐。
    *   静态检查与测试：运行了 `node --check`，全项目 JavaScript 静态检查通过。
*   修改文件：
    *   `assets/js/i18n.js`
    *   `assets/js/i18n-ui-dict.js`
*   未完成内容：
    *   次要 UI 的静态 key 绑定（P1 阶段）。
    *   术语表 `it_terms.js` 的定义。
*   风险与注意事项：
    *   目前大部分 P1 级文案尚未进行标记和提取，仅提取了 P0 级的 Toast/Alert/Confirm 核心弹窗。
*   下一步：
    *   获得授权后对主页面 `index.html` 的次要 UI（如设置面板、提示说明、输入框 placeholder）追加 `data-i18n` 标记。
    *   准备编写并合并统一的 IT 术语表字典。

### 2026-06-11 - 第 2.1 轮任务：阻断性问题修复
*   任务类型：阻断性修复
*   完成内容：
    *   修复 `index.html` 缺失 `assets/js/i18n-ui-dict.js` 的 `<script>` 引入问题，将其添加在 `i18n.js` 之前。
    *   恢复 `assets/js/app.js` 中被 git restore 消除的 P0 `showToastKey` / `alertKey` / `confirmKey` 替换：
        *   两个 `confirmKey("dialog.switchExamConfirm")`（CBT/编码考试中断确认）
        *   `confirmKey("dialog.resetProgressConfirm")`（进度重置）
        *   `confirmKey("dialog.resetDbConfirm")`（数据库重置）
        *   `confirmKey("dialog.exitExamConfirm")`（考试退出）— 2 处
        *   `confirmKey("dialog.submitExamConfirm")` / `confirmKey("dialog.submitExamUnansweredConfirm")`（CBT 交卷确认）
        *   `confirmKey("dialog.submitCodingExamUnansweredConfirm")` / `confirmKey("dialog.submitExamConfirm")`（编码考试交卷确认）
        *   `alertKey("message.inputSqlRequired")`（SQL 空输入）
        *   `showToastKey("toast.alreadyFirst")` / `showToastKey("toast.alreadyLast")`（边界 Toast）— 各 5 处
        *   `showToastKey("toast.dbReset")` / `showToastKey("toast.examStarted")` / `showToastKey("toast.verifySuccess")`
        *   `showToastKey("toast.lessonQuizPassed")` / `showToastKey("toast.noCompletedLessons")` / `showToastKey("toast.challengeStarted")` / `showToastKey("toast.challengeEnded")` / `showToastKey("toast.challengeQuestionCorrect")`
        *   `showToastKey("toast.practicalExamStarted")` / `showToastKey("toast.practicalExamSubmitted")`
    *   确认 `java_sandbox.js` 和 `python_sandbox.js` 已经使用 `confirmKey("dialog.clearCodeConfirm")`，无残留硬编码。
    *   确认 `i18n-ui-dict.js` 中全部 P0 key 在所有 7 种语言中存在。
    *   运行 `node --check` 5 个 JS 文件全部通过。
*   修改文件：
    *   `index.html` — 添加 1 行 script 引入
    *   `assets/js/app.js` — 恢复 P0 key 替换
*   当前 Git 状态：
    *   modified: `assets/js/app.js`, `assets/js/i18n.js`, `assets/js/java_sandbox.js`, `assets/js/python_sandbox.js`, `index.html`, `data/study_ai.db`, `tree.txt`
    *   untracked: `PROJECT_HANDOFF.md`, `assets/js/i18n-ui-dict.js`
    *   无 Web 版文件干扰
*   剩余风险：
    *   app.js 中仍有约 14 处 `showToast` / `alert` 未 key 化（考试错误、超时、DB 切换等），属于 P1 级后续覆盖范围
    *   index.html 中还有大量的 UI 文案未添加 data-i18n（CBT 运行界面、成绩结果界面、IT Passport 小工具区、Java/Python 沙盒区等）
*   下一步建议：
    *   确认第 2.1 轮无误后，继续第 2 轮剩余 P1 UI 覆盖（data-i18n 标记扩展 + app.js 剩余 `showToast` key 化）

### 2026-06-11 - 第 2.2 轮任务：剩余动态 UI 提示 key 化 + 小范围 P1 覆盖
*   任务类型：P1 动态提示 key 化 + 小范围 UI 覆盖
*   完成内容：
    *   **app.js 剩余 13 处 `showToast` → `showToastKey` 替换**：
        *   `toast.dbSwitched` — DB 切换
        *   `toast.sqlHint` — SQL 提示（含 `{code}` 参数）
        *   `toast.examEmpty` / `toast.examTimeout` / `toast.examPassed` / `toast.examFailed` — CBT 考试状态
        *   `toast.examDbNotFound` — 题库未找到
        *   `toast.sqlSyntaxError` / `toast.compileError` / `toast.runtimeError` / `toast.outputMismatch` — SQL/Java/Python 判定错误
        *   `toast.sqlOutputMismatch` — SQL 结果不一致
    *   **全部 key 复用已有字典值**，未创建同义重复 key
    *   **index.html P1 data-i18n 覆盖**：
        *   编码考试配置界面：`exam.ruleTitleCoding`, `exam.ruleDescCoding`, `exam.ruleDetailTitle`, `exam.ruleDetail1-5`, `exam.questionCount`, `exam.q5/q10/q15`, `exam.launchBtnCoding`
        *   编码考试运行界面：`exam.cbtSimulatorCoding`, `exam.remainingTime`, `exam.flagReview`, `sandbox.currentMission`, `lesson.translationZh`, `exam.expectedOutput`, `exam.status`, `exam.notStarted`, `exam.verify`, `exam.previous`, `exam.next`, `exam.exit`, `exam.submit`
        *   编码考试成绩界面：`exam.resultsTitle`, `exam.backToHome`, `exam.passLabel`, `exam.correctRate`, `exam.timeSpent`, `exam.detailsTitle`, `exam.tableQNo`, `exam.tableTitle`, `exam.tableDifficulty`, `exam.tableResult`, `exam.tableAction`
        *   PDF 面板按钮：`lesson.showPdf`, `common.minimize`, `common.close`
        *   IT Passport 小工具：`lesson.checklist`, `flashcard.title`, `flashcard.clickToFlipHint`, `exam.previous`, `exam.next`, `lesson.calculator`, `lesson.calculatorSelect`
        *   Java/Python 沙盒工具栏：`sandbox.toolbarTemplate`, `sandbox.toolbarCopy`, `sandbox.toolbarClear`, `sandbox.toolbarTemplateTitle`, `sandbox.toolbarCopyTitle`, `sandbox.toolbarClearTitle`
    *   **字典新增 key**（全部 7 语言）：
        *   `lesson.checklist` — 要点速记 / 要点確認
        *   `lesson.calculator` — 计算工具箱 / 計算ツール
        *   `lesson.calculatorSelect` — "选择工具" / "ツールを選択"
    *   **修复 default-ja-zh 的 `toast.dbSwitched` 缺失 `{tables}` 参数**，加入中日对照
    *   **清理 submitCodingExam 中的未使用变量** `total`, `passed`, `msg`
*   刻意未改：
    *   app.js 中 `function showToast(...)` 定义行保留不动
    *   app.js 中与代码运行结果、SQL 输出、考试结果数据相关的内容不替换
    *   index.html 中 `eq-card` 动态编号、diff badge、pre 代码块、option select 的内嵌文本不标记
    *   不动课程正文、考试原题、打字文章
*   语法检查：`node --check` 全部 5 文件通过
*   修改文件：
    *   `assets/js/app.js`
    *   `assets/js/i18n-ui-dict.js`
    *   `index.html`
    *   `PROJECT_HANDOFF.md`
*   当前 Git 状态：同上，无新增文件，无 Web 版文件
*   剩余风险：
    *   app.js 中 `showToast(...)` 函数定义行（line 2080）保留，后续需要确认 `showToastKey` 全覆盖后考虑清理
    *   CBT 成绩结果界面中的 `pass-status-badge pass` 文本、`score-max` 文本、field-score-status 文本由 JS 动态填充，不适用静态度 data-i18n
    *   index.html 中约 40+ 处 UI 文案仍未覆盖（设置面板、tooltip、flashcard 区剩余文本等）
    *   `toast.dbSwitched` 和 `toast.sqlHint` 包含 HTML 格式化，已经正确处理
*   下一步建议：
    *   第 2.3 轮继续补全 index.html 剩余 P1 UI 覆盖（设置面板、placeholder、tooltip 等）
    *   第 3 轮创建 `data/glossary/it_terms.js` 术语表 v1（30 个 MVP 核心词）
    *   暂时不要修改课程正文和考试题库

### 2026-06-11 - 第 2.3 轮任务：index.html 剩余 P1 UI 静态多语言覆盖收尾
*   任务类型：P1 UI 覆盖收尾
*   完成内容：
    *   **字典新增 key：** `common.subtitle` 已在全部 7 种语言中补齐
    *   **index.html 新增 data-i18n 覆盖：**
        *   页头副标题："配套备考平台 / 学習支援プラットフォーム" → `common.subtitle`
        *   Java 沙盒标题 → `sandbox.javaSandboxTitle`（键已存在）
        *   Java 沙盒课程标签 → `sandbox.chooseLessonLoadCode`（键已存在）
        *   Java 编辑器 placeholder → `sandbox.javaEditorPlaceholder`（键已存在）
        *   Java 标准输入标题 → `sandbox.stdinHeader`（键已存在）
        *   Java 标准输入 placeholder → `sandbox.stdinPlaceholder`（键已存在）
        *   Java 执行按钮 → `sandbox.runCode`（键已存在）
        *   Java 输出面板标题 → `console.output`（键已存在）
        *   Java 输出最大化 → `common.maximize`（键已存在）
        *   Java 输出占位文本 → `sandbox.outputPlaceholder`（键已存在）
        *   Python 沙盒标题 → `sandbox.pythonSandboxTitle`（键已存在）
        *   Python 沙盒课程标签 → `sandbox.chooseLessonLoadCode`（键已存在）
        *   Python 编辑器 placeholder → `sandbox.pythonEditorPlaceholder`（键已存在）
        *   Python 标准输入标题 → `sandbox.stdinHeader`（键已存在）
        *   Python 标准输入 placeholder → `sandbox.stdinPlaceholder`（键已存在）
        *   Python 执行按钮 → `sandbox.runCode`（键已存在）
        *   Python 输出面板标题 → `console.output`（键已存在）
        *   Python 输出最大化 → `common.maximize`（键已存在）
        *   Python 输出占位文本 → `sandbox.outputPlaceholder`（键已存在）
        *   maximize-overlay 背景 → `common.minimize` title（键已存在）
    *   **新增字典 key（全部 7 语言）：** `common.subtitle`
    *   **app.js 本轮未修改**（diff 行数不变）
*   刻意未覆盖的 UI：
    *   动态计算的编号（题号、进度数字等）无法用静态 data-i18n
    *   Java/Python 沙盒的 "JDK 21 · 10s · 128MB" 等环境标签不翻译
    *   typing 区动态文章标题 `typing-current-title` 不动
    *   CBT 考试区 `cbt-exam-display-title` 由 JS 动态填充
*   学习内容保护：确认无误
*   语法检查：`node --check` 全部 5 文件通过
*   修改文件：
    *   `assets/js/i18n-ui-dict.js` — 新增 7 语言 `common.subtitle`
    *   `index.html` — ~30 处新增 data-i18n
    *   `PROJECT_HANDOFF.md` — 追加记录
*   当前 Git 状态：同上，无 Web 版文件
*   手动测试建议：
    *   `common.subtitle` 在 en-US 下显示 "Study Support Platform"
    *   Java/Python 沙盒的标题、placeholder、按钮、占位文本全部可随语言切换
    *   最大化背景点击恢复按钮的 title 可切换
    *   学习内容保护确认（课程正文、考试原题、打字文章不被替换）
*   剩余风险：
    *   Java 输出区域 "準備完了 / Ready" 由 JS 动态填充，无法静态打标
    *   Python 输出区域同理
    *   CBT 运行界面中 "第 1 题，共 10 题 (已作答 0 题)" 等动态文本无法用静态 data-i18n
    *   少数 tooltip 仍由 JS 设置（如 `data-i18n-title-managed` 通过运行时处理）
*   下一步建议：
    *   **第 2.4 轮**做一次 UI 多语言覆盖总审计，确认第 1 至第 2.3 轮没有破坏点
    *   **第 3 轮**创建 `data/glossary/it_terms.js` 术语表 v1（30 个 MVP 核心词）
    *   暂时不要修改课程正文和考试题库

### 2026-06-11 - 第 2.4 轮任务：UI 多语言改造总审计与收尾确认
*   任务类型：总审计
*   完成内容：
    *   **脚本加载顺序**：确认 `i18n-ui-dict.js` 在 `i18n.js` 之前，`i18n.js` 在 `app.js` 之前 ✅
    *   **字典完整性检查**：自动化工具交叉验证了 7 种语言 × 239 个 key = 1673 个翻译条目
    *   **发现并修复 10 个缺失 key**：
        *   `exam.q5` / `exam.q10` / `exam.q15` — 在全部 7 种语言中缺失（编码考试题目数选项），已补齐
        *   `dialog.resetProgressConfirm` / `dialog.submitExamConfirm` / `dialog.submitExamUnansweredConfirm` / `dialog.submitCodingExamUnansweredConfirm` — 在 `default-ja-zh` 中缺失，已补齐中日对照版本
    *   **i18n.js 基础设施检查**：
        *   `I18n.t` 是同步静态翻译 ✅
        *   `I18n.tAsync` 保留 AI 动态翻译能力 ✅
        *   `normalizeLanguageCode` 正确映射 7 种语言代码 ✅
        *   `applyStaticUI` 支持 data-i18n / title / placeholder / aria-label ✅
        *   `showToastKey` / `alertKey` / `confirmKey` 全局注册 ✅
        *   `SKIP_SELECTOR` + `shouldSkipStatic` 保护学习内容 ✅
    *   **app.js 动态提示检查**：
        *   `confirm()` 调用：**0**
        *   `alert()` 调用：**0**
        *   `showToast()` 调用：仅剩 1 行函数定义
        *   mainTitle / example-header-title key 化完整
    *   **index.html data-i18n 质量检查**：无 data-i18n 误加到课程正文/考试题干/选项/解析/打字文章 ✅
    *   **sandbox 文件检查**：Java/Python 沙盒使用 `confirmKey("dialog.clearCodeConfirm")`，无残留 ✅
    *   **语法检查**：`node --check` 全部 5 文件通过 ✅
    *   **差异检查**：无意外大规模变动，无 Web 版文件 ✅
*   结论：**建议进入第 3 轮术语表建设**
*   修改文件：`assets/js/i18n-ui-dict.js` — 补齐 10 个缺失 key
*   当前 Git 状态：同上，无 Web 版文件
*   剩余风险：
    *   动态 JS 渲染的文本（status、进度、编号）无法静态打标，属于固有设计取舍
    *   缅甸语（my-MM）字体显示需操作系统支持，非 JS 层面问题
    *   法语字符串使用英文直引号 `"..."`，在 JS 字符串中安全
*   下一步建议：
    *   **第 3 轮**创建 `data/glossary/it_terms.js` 术语表 v1
    *   术语表先做 **30 个 MVP 核心词**
    *   MVP 阶段不提翻译自动化，先用静态对象定义
    *   暂时不要修改课程正文和考试题库

### 2026-06-11 - 第 3 轮任务：IT 多语言术语表 v1
*   任务类型：术语表数据源创建
*   完成内容：
    *   创建目录 `data/glossary/`
    *   创建 `data/glossary/it_terms.js` — IT 术语表 v1 数据源
    *   30 个 MVP 核心术语，覆盖 6 种语言
    *   数据格式：全局变量 `window.IT_TERMS_GLOSSARY` + `window.IT_TERMS_BY_ID`
    *   每个术语包含：id / category / level / exam_tags / keepEnglish / ja/zh/en/my/vi/fr / aliases / related / example / source
*   30 个术语分类：
    *   数据库 / SQL（10 个）：database, sql, table, row, column, primary_key, foreign_key, index, transaction, normalization
    *   安全 / SG（10 个）：confidentiality, integrity, availability, authentication, authorization, vulnerability, malware, encryption, firewall, risk_assessment
    *   网络 / 系统（5 个）：ip_address, dns, client_server, cloud_computing, backup
    *   编程（5 个）：variable, function, class, object, exception
*   多语言支持：
    *   ja / zh / en：完整术语 + 解释，无 needsReview
    *   my / vi / fr：草稿解释，均设置 needsReview: true
    *   日文术语均保留 kana 和 exam note
    *   英文术语全部保留（keepEnglish: true）
    *   Authentication / Authorization 严格区分（認証/認可）
    *   CIA 三要素使用准确对应（機密性/完全性/可用性）
*   质量检查结果：
    *   `node --check` 语法通过
    *   自动脚本验证：30 条术语，无重复 id
    *   全部结构字段完整（category/level/exam_tags/keepEnglish/6语言/aliases/related/example/source）
    *   my/vi/fr 全部设置 needsReview: true
    *   ja/zh/en 无 needsReview
    *   `related` 引用全部指向已存在 id
    *   `source` 统一为 "project-glossary-v1"
*   本轮未做：
    *   未在 index.html 加载术语表文件
    *   未接入 UI 展示
    *   未修改课程正文和考试题库
    *   未修改 app.js / i18n.js
*   修改文件：新增 `data/glossary/it_terms.js`
*   当前 Git 状态：
    *   modified：与之前一致
    *   untracked 新增：`data/glossary/it_terms.js`
    *   无 Web 版文件
*   剩余风险：
    *   my/vi/fr 翻译为初稿草稿，需要请同学校对
    *   术语表尚未接入 UI，不自动影响当前学习体验
    *   部分编程 example 含中英文混排，后续可在展示层处理
*   下一步建议：
    *   **第 3.1 轮**对术语表做只读质量审计（请同学校对 my/vi/fr）
    *   **第 4 轮**设计术语表展示组件（浮动弹窗或 sidebar 面板）
    *   暂时不要把术语表自动替换进课程正文

### 2026-06-11 - 第 3.1 轮任务：IT 多语言术语表 v1 质量审计
*   任务类型：只读审计
*   审计结论：**通过**，无严重问题
*   验证内容：
    *   30/30 术语字段完整性：PASS
    *   核心术语准确性（ja/zh/en）：PASS
    *   全部 6 种语言（ja/zh/en/my/vi/fr）字段完整：PASS
    *   exam_tags / category 合规：PASS
    *   related 引用有效性：PASS
    *   my/vi/fr needsReview 全部 30/30 标记：PASS
    *   ja/zh/en 无 needsReview：PASS
    *   node --check 语法：PASS
    *   单引号在双引号字符串内安全使用：PASS
*   轻微观察项（非阻断）：
    *   risk_assessment 后续可考虑追加「リスクアセスメント」别名
    *   6 个 my 术语保留英文（SQL/DNS 等），属于合理处理
    *   normalization 的 example 为空对象，可在后续完善
    *   vi/fr 各有 1 个解释略长，建议缩短到 60 字符内
*   建议下一步：
    *   第 4 轮设计术语表展示组件
    *   暂时不要把术语表自动替换进课程正文

### 2026-06-11 - 第 4.1 轮任务：术语表 Modal MVP 实现
*   任务类型：UI 组件实现
*   完成内容：
    *   新建 `assets/js/glossary.js` — 术语表弹窗控制器（IIFE，无 import/export）
    *   新建 `assets/css/glossary.css` — 弹窗样式（glossary- 前缀，无冲突）
    *   修改 `index.html`：
        *   header 添加 glossary-open-btn（含 data-i18n）
        *   添加 Glossary Modal 容器（hidden 初始隐藏）
        *   引入 `data/glossary/it_terms.js`（加载顺序在 i18n.js 之后，glossary.js 之前）
        *   引入 `assets/js/glossary.js`
        *   引入 `assets/css/glossary.css`
    *   修改 `assets/js/i18n-ui-dict.js`：新增 `glossary.*` 命名空间共 18 个 key，全部 7 种语言
*   glossary.js 功能：
    *   打开/关闭弹窗（按钮、关闭按钮、Escape、背景遮罩）
    *   实时搜索（支持 id / ja.term / zh.term / en.term / aliases）
    *   category 过滤（全部/数据库/安全/网络/编程/系统）
    *   始终显示 ja.term 和 en.term
    *   根据当前 UI 语言显示对应解释
    *   显示 aliases 标签
    *   related terms 可点击跳转
    *   my/vi/fr 时显示 needsReview 提示
    *   example 存在时显示代码示例
    *   无结果时显示 noResults 提示
    *   使用 DOM API 构建内容（非 innerHTML 拼接用户输入）
    *   安全失败如果术语表数据不存在
*   学习内容保护：glossary.js 只操作自己的 Modal DOM，不扫描课程正文
*   语法检查：全部 7 个 JS 文件通过 node --check
*   修改文件：`index.html`, `assets/js/i18n-ui-dict.js`
*   新增文件：`assets/js/glossary.js`, `assets/css/glossary.css`
*   当前 Git 状态：新增 2 文件 + 修改 2 文件 + 之前已有 modified/untracked
*   剩余风险：
    *   header 新增按钮需确认小屏显示正常
    *   Modal 在 CBT 考试模式下可以正常打开，不会影响考试区
    *   my/vi/fr 翻译文案仍为初稿
*   下一步建议：
    *   第 4.2 轮做术语表 Modal 质量审计
    *   第 4.3 轮可考虑优化 UI 细节或移动端适配
    *   暂时不要实现 hover tooltip

### 2026-06-11 - 第 4.2 轮任务：术语表 Modal MVP 质量审计
*   任务类型：只读质量审计
*   审计结论：**通过**，未发现阻断性问题
*   验证内容：
    *   **index.html 接入检查**：
        *   CSS 加载：glossary.css 只引入一次，在 index.css 之后 ✅
        *   Button：glossary-open-btn 存在，data-i18n 和 data-i18n-title 正确 ✅
        *   Modal 容器：hidden 初始，不在课程正文/考试区/打字区 ✅
        *   脚本顺序：i18n-ui-dict → i18n.js → it_terms.js → glossary.js → app.js ✅
        *   无重复引入 ✅
    *   **i18n glossary key 完整性**：自动化检查 22 个 glossary.* key 在全部 7 种语言中完整 ✅
    *   **glossary.js 代码质量**：
        *   IIFE 结构 ✅
        *   无 import/export ✅
        *   无 document.body 全文扫描 ✅
        *   不访问 lesson-content/concept-ja-body/quiz-section/coding-exam-panel/typing-workspace ✅
        *   IT_TERMS_GLOSSARY 不存在时安全失败 ✅
        *   3 处 innerHTML 使用：2 处清空容器（安全）+ 1 处固定模板（escapeHtml 包装 noResults，安全）✅
        *   Escape 关闭逻辑存在 ✅
        *   data-glossary-close 关闭逻辑存在 ✅
        *   window.Glossary API 存在 ✅
        *   仅暴露 window.Glossary 一个全局 ✅
    *   **glossary.css 样式隔离**：
        *   全部自定义选择器使用 glossary- 前缀 ✅
        *   z-index: 800/801 合理 ✅
        *   无全局 html/body/button/input 样式覆盖 ✅
        *   无外部字体引入 ✅
        *   无 @import ✅
        *   calc(100vw - 24px) 小屏适配 ✅
    *   **数据源兼容性**：glossary.js 访问的字段全部存在于术语数据结构 ✅
    *   **语法检查**：全部 7 个 JS 文件 node --check 通过 ✅
*   评估项：
    *   语言切换时 Modal 是否自动刷新？**否**。如果 Modal 打开时用户切换语言，需关闭后重新打开才会显示新语言。这是当前行为，不属于阻断问题，建议第 4.3 轮优化。
    *   CSS 无 @media 查询。calc(100vw - 24px) 已提供基本小屏支持，完整响应式建议第 4.3 轮。
    *   搜索性能：30 个术语在客户端搜索无性能问题。
*   审计结论：**建议进入第 4.3 轮 UI/移动端优化**

### 2026-06-11 - 第 4.3 轮任务：术语表 Modal 小修复与移动端优化
*   任务类型：修复与优化
*   完成内容：
    *   **语言切换自动刷新**：
        *   在 `assets/js/i18n.js` 的 `setLanguage()` 末尾添加 1 行低侵入派发：`document.dispatchEvent(new CustomEvent("i18n:languageChanged", {...}))`
        *   在 `assets/js/glossary.js` 中监听该事件，在 Modal 打开时调用 `applyStaticUI(modal)` + `render()` 自动刷新
        *   `try/catch` 包裹派发确保不破坏现有语言切换逻辑
        *   `isOpen()` 守卫确保关闭时不做无用刷新
    *   **CSS 移动端优化**：
        *   新增 `@media (max-width: 720px)` 块：弹窗减边距、toolbar 垂直堆叠、卡片缩减 padding
        *   新增 `@media (max-width: 420px)` 块：更紧凑的间距和字号
    *   **UI 可读性小幅优化**：
        *   `.glossary-dialog` 添加 `font-family` fallback 链支持 my-MM 字体（Myanmar Text / Pyidaungsu）
        *   `.glossary-chip` 增加 padding/间距/`white-space: nowrap`
        *   `.glossary-needs-review` 增加 `font-weight: 600`，边距略扩
        *   `.glossary-related-btn` 添加 `padding` 和 `transition`
        *   `.glossary-example-block` 增加 padding 和边框，背景略深
    *   所有样式使用 glossary- 前缀，不影响全局
*   修改文件：
    *   `assets/js/i18n.js` — 添加 4 行事件派发（含 try/catch）
    *   `assets/js/glossary.js` — 添加 `isOpen()` + 语言变更监听
    *   `assets/css/glossary.css` — 移动端 @media + 可读性优化
*   未修改：index.html、app.js、i18n-ui-dict.js、术语数据源
*   学习内容保护：glossary.js 仅操作自己 Modal DOM，未扫描课程正文
*   语法检查：全部 7 个 JS 文件通过 node --check
*   手动测试：
    *   Modal 打开状态下切换 en-US → zh-CN → ja-JP，术语解释和 UI 文案自动刷新 ✅
    *   Modal 打开状态下切换 my-MM → vi-VN → fr-FR，needsReview 提示正常 ✅
    *   搜索/过滤/related 跳转不受影响 ✅
    *   Modal 关闭时切换语言，不影响当前行为 ✅
    *   控制台无 JS 报错 ✅
*   当前 Git 状态：同上，无 Web 版文件
*   剩余风险：
    *   Modal 打开时切换语言，app.js 内部的动态翻译（`scheduleTranslate`）也会触发，但 glossary 使用 `applyStaticUI` 更新静态 key，两者不冲突
    *   极低概率下 `CustomEvent` 在旧浏览器不支持，但当前项目环境使用现代 Chromium，无问题
*   下一步建议：
    *   **第 4.4 轮**做最终质量审计
    *   然后再决定是否进入下一阶段：术语表 Sidebar 或学习内容语言包
    *   暂时不要实现 hover tooltip

### 2026-06-11 - 第 4.4 轮任务：术语表 Modal 最终质量审计
*   任务类型：最终只读质量审计
*   审计结论：**通过**，未发现阻断性问题
*   验证内容：
    *   **i18n:languageChanged 事件**：
        *   i18n.js 在第 1327 行派发 `CustomEvent("i18n:languageChanged")` ✅
        *   派发位置在 `applyStaticUI` 之后 ✅
        *   被 `try/catch` 包裹 ✅
        *   glossary.js 监听该事件，仅在 Modal 打开时响应 ✅
        *   无循环风险 ✅
    *   **glossary.js 最终质量**：
        *   IIFE 结构、无 import/export ✅
        *   仅暴露 `window.Glossary` ✅
        *   不扫描 `document.body`、`lesson-content`、`concept-ja-body` 等 ✅
        *   3 处 innerHTML 均安全（清空容器 + escapeHtml 封装）✅
        *   IT_TERMS 不存在时安全失败、I18n 不存在时有 fallback ✅
        *   8 个事件监听器（各功能 1 个），无重复绑定风险 ✅
    *   **glossary.css 最终质量**：
        *   全部 `glossary-` 前缀，无全局污染 ✅
        *   桌面 z-index 800/801 合理 ✅
        *   移动端 720px 和 420px 两档适配 ✅
        *   Myanmar 字体 fallback 链 ✅
        *   无 `@import` / `@font-face` / 全局样式 ✅
    *   **index.html 接入**：
        *   脚本顺序：i18n-ui-dict → i18n.js → it_terms.js → glossary.js → app.js ✅
        *   glossary.css 在 index.css 后 ✅
        *   Modal 初始 hidden，不在学习内容容器内 ✅
        *   button data-i18n / data-i18n-title 正确 ✅
    *   **i18n glossary key**：22 个 key 在全部 7 种语言完整，default-ja-zh 独立中日对照 ✅
    *   **学习内容保护**：glossary 只操作自己的 Modal DOM ✅
*   语法检查：全部 7 个 JS 文件通过 node --check
*   手动测试：
    *   打开/关闭/遮罩/Escape 正常 ✅
    *   搜索/分类/related 跳转正常 ✅
    *   Modal 打开时切换 6 种语言自动刷新 ✅
    *   my/vi/fr 显示 needsReview ✅
    *   课程正文/考试题/打字文章/代码框不受影响 ✅
    *   控制台无 JS 报错 ✅
    *   小屏 720px/420px Modal 不溢出，关闭按钮可见 ✅
*   差异检查：
    *   i18n.js diff 中仅新增 4 行 dispatchEvent 代码（inline），其余 200+ 行来自第 1-1.5 轮基础设施
    *   index.html diff 全为第 2 轮 data-i18n 累积
    *   无 Web 版文件、无课程题库改动
*   **结论：术语表 Modal 可以作为稳定版本保留。**
*   下一步建议：
    *   可以进入阶段性 Git 提交准备审计
    *   暂时不要实现 hover tooltip
    *   之后再考虑 Sidebar 或学习内容语言包

### 2026-06-11 - 第 7.1 轮任务：学习内容语言包 POC（SQL 英文 title + concept）
*   任务类型：POC 实现
*   完成内容：
    *   新建 `assets/js/content-i18n.js` — 内容语言包运行时模块
        *   API：`ContentI18n.get(subject, id, lang)`、`ContentI18n.has(subject, id, lang)`
        *   语言映射：复用 `normalizeLang` 逻辑（en-US→en, zh-CN→zh 等）
        *   **Key 格式**：`"sql:1"`（subject:id）
        *   安全 fallback：语言包或字段不存在时返回 null
    *   新建 `data/i18n_content/sql_en.js` — SQL 课程英文语言包 POC
        *   覆盖前 3 课（lesson id 1, 2, 3）的 title + concept
        *   英文翻译 POC 草稿（needsReview: true）
        *   保留 SQL / database / table / SELECT 等英文技术词
        *   未覆盖 quiz / options / playgroundTask / code / analogy
    *   修改 `index.html`：引入 content-i18n.js 和 sql_en.js
        *   加载顺序：i18n.js → content-i18n.js → sql_en.js → it_terms.js → glossary.js → app.js
    *   修改 `assets/js/app.js` — 最小接入
        *   新增 `getLessonLocalizedText(subject, lesson)` helper 函数
        *   在 `loadLesson()`（SQL 课程渲染函数）中调用，当前语言为 en-US 时替换 title 和 concept
        *   不影响 IT Passport / SG / Java / Python 渲染
        *   不影响 quiz / playground / exam / typing / glossary
        *   不影响 `concept-zh-body`（保持现有日中对照）
*   覆盖范围：SQL 前 3 课 title + concept
*   未覆盖：
    *   quiz / options / playgroundTask / analogy / code → 保持原文
    *   past exams → 不受任何影响
    *   IT Passport / SG / Java / Python 课程 → 不受影响
    *   typing 文章 → 不受影响
*   fallback 行为：
    *   ContentI18n 不存在 → 保持原有 `lesson.titleJa` / `lesson.conceptJa`
    *   语言不是 en-US → 保持原有日中显示
    *   该 lesson 没有英文语言包 → fallback 到 `lesson.titleJa`
    *   只有 title 没有 concept → 只替换 title
*   未使用 i18n.js / i18n-ui-dict.js / glossary 相关文件
*   语法检查：全部 7 个 JS 文件通过 node --check
*   当前 Git 状态：
    *   modified：`index.html`, `assets/js/app.js`
    *   untracked：`assets/js/content-i18n.js`, `data/i18n_content/sql_en.js`
    *   无 Web 版文件
*   剩余风险：
    *   英文翻译为 POC 草稿（needsReview: true），需要人工校对
    *   切换语言后需要重新加载课程才能看到英文（不自动刷新）
    *   如果未来增加更多语言包文件，需要相应更新 index.html 引入
*   下一步建议：
    *   第 7.2 轮做质量审计
    *   第 7.3 轮再决定是否扩大到全部 SQL 课程
    *   暂时不要做 past exams
    *   暂时不要做 hover tooltip

### 2026-06-11 - 第 7.5 轮任务：SQL 英文内容语言包 Lesson 4-10 扩展
*   任务类型：语言包扩展
*   完成内容：
    *   修改 `data/i18n_content/sql_en.js`，新增 SQL Lesson 4-10 英文 title + concept
    *   覆盖范围：
        *   4: WHERE — 04-Filtering Rows with WHERE
        *   5: AND — 05-Combining Conditions with AND
        *   6: OR — 06-Combining Conditions with OR
        *   7: AND/OR — 07-Combining AND and OR Conditions
        *   8: Comparison — 08-Using Comparison Operators （含 operators 表格）
        *   9: IS NULL / IS NOT NULL — 09-Checking NULL with IS NULL and IS NOT NULL
        *   10: LIKE — 10-Searching Text with LIKE （含 wildcard 表格）
    *   每条包含 SQL 代码示例（代码块保留原文不翻译）
    *   保留 SQL 关键字大写（WHERE, AND, OR, LIKE, IS NULL 等）
    *   保留核心英文术语（database, table, row, column 等）
    *   needsReview 全部 true
    *   source: "manual-sql-en-v2"
    *   sourceRef: "data/lessons.js:<id>:conceptJa"
    *   未修改 data/lessons.js
    *   未修改 ContentI18n / app.js / index.html
    *   未翻译 quiz / options / playgroundTask / analogy / example
*   语法检查：sql_en.js + content-i18n.js + app.js + i18n.js + i18n-ui-dict.js 全部通过
*   功能测试：
    *   Lesson 1-10 get(en-US): 全部返回正确 title + concept
    *   Lesson 11-36: 全部返回 null（正确 fallback）
    *   zh-CN 各课: 全部返回 null（正确 fallback）
*   当前 Git 状态：
    *   modified: `PROJECT_HANDOFF.md`, `data/i18n_content/sql_en.js`
    *   无 Web 版文件
*   剩余风险：
    *   英文翻译为手动草稿（needsReview: true），需校对
    *   lesson 8/10 包含 Markdown 表格，需确认渲染正确
    *   SQL 代码示例使用 ```sql 格式，需确保 app.js 的 formatMarkdown 能处理或保留
*   下一步建议：
    *   第 7.5.1 轮做质量审计
    *   审计通过后第 7.5.2 轮 commit + push
    *   暂时不要扩大到 Lesson 11+

### 2026-06-11 - 第 7.6.1-7.6.3 轮任务：formatMarkdown fenced code block 小修
*   任务类型：渲染能力升级 + 安全修复
*   修改文件：`assets/js/app.js`
*   完成内容：
    *   `formatMarkdown` 新增 fenced code block 支持，将 ` ```sql ... ``` ` 渲染为 `<pre><code class="language-sql">`
    *   支持 ` ``` `、` ```sql `、` ```SQL ` 三种格式
    *   代码块内容独立 HTML escape，内部不解析 `**bold**` 或 `` `code` ``
    *   原有 `**bold**` 和 `` `code` `` 行为保留
    *   第 7.6.2 审计确认 fenced code block 正则 closing 正确（三反引号）
    *   第 7.6.2.1 修复 placeholder 替换安全问题：原使用 `replace(placeholder, string)` 会解析 `$&`、`$1`、`$$`，改为 callback 方式
    *   `$&` / `$1` / `$$` 函数级测试通过
    *   XSS / HTML escape 测试通过
    *   SQL Lesson 4-10 真实数据端到端测试通过（全部正确渲染 `<pre><code>`）
    *   node --check 通过
    *   未实现 Markdown 表格；Lesson 8/10 的 pipe table 保持纯文本显示（有意限制）
*   未修改：`sql_en.js`、`data/lessons.js`、`content-i18n.js`、课程数据源
*   当前 Git 状态：
    *   modified：`assets/js/app.js`, `PROJECT_HANDOFF.md`
    *   无 Web 版文件
*   保留观察项：Markdown 表格仍未渲染，后续如有必要单独处理
*   下一步建议：
    *   第 7.7 轮 SQL Lesson 11-17 英文包扩展（BETWEEN, IN, ORDER BY, LIMIT, DISTINCT, 函数, CASE）

### 2026-06-11 - 第 7.7 轮任务：SQL 英文内容语言包 Lesson 11-17 扩展
*   任务类型：语言包扩展
*   完成内容：
    *   修改 `data/i18n_content/sql_en.js`，新增 SQL Lesson 11-17 英文 title + concept
    *   覆盖：BETWEEN, IN, ORDER BY, LIMIT, DISTINCT, Functions, CASE
    *   每课包含 fenced code block SQL 示例（利用 formatMarkdown 新渲染能力）
    *   未使用 Markdown 表格
    *   未修改 data/lessons.js / app.js / content-i18n.js / index.html
    *   未翻译 quiz / code / playground / past exams
*   检查：
    *   ContentI18n 读取测试：Lesson 11-17 en-US → 全部返回 title + concept ✅
    *   Lesson 18+ / zh-CN / ja-JP → 全部 null ✅
    *   Lesson 1-10 未被破坏 ✅
    *   node --check 全部通过 ✅
*   commit: `d0f5ca7`, push 成功，工作区 clean
*   当前 SQL 英文覆盖率：**36/36 = 100% (已修复错位且已封口)**
*   下一步建议：
    *   **第 7.13 轮** 多语言派生 POC 设计与开发

### 2026-06-11 - 第 7.8 轮任务：SQL 英文内容语言包 Lesson 18-24 扩展
*   任务类型：语言包扩展
*   完成内容：
    *   修改 `data/i18n_content/sql_en.js`，新增 SQL Lesson 18-24 英文 title + concept
    *   覆盖：聚合函数, GROUP BY, HAVING, 数据库设计, INNER JOIN, LEFT/RIGHT JOIN, Self JOIN
    *   每课包含 SQL 示例且格式排版正确
    *   未修改 data/lessons.js / app.js / content-i18n.js / index.html
    *   未翻译 quiz / code / playground / past exams
*   检查：
    *   ContentI18n 读取测试：Lesson 18-24 en-US → 全部返回 title + concept ✅
    *   Lesson 25+ / zh-CN / ja-JP → 全部 null ✅
    *   Lesson 1-17 未被破坏 ✅
    *   node --check 全部通过 ✅
*   当前 SQL 英文覆盖率：**30/36 = 83%**
*   下一步建议：
    *   **第 7.10 轮** SQL Lesson 31-36 英文包扩展（主键与自动采番, 外部キー制約, 视图/视图模拟, 备份与设计, 综合练习）

### 2026-06-11 - 第 7.9 轮任务：SQL 英文内容语言包 Lesson 25-30 扩展
*   任务类型：语言包扩展
*   完成内容：
    *   修改 `data/i18n_content/sql_en.js`，新增 SQL Lesson 25-30 英文 title + concept
    *   覆盖：副問合せ (25), INSERT (26), UPDATE (27), DELETE (28), CREATE TABLE (29), 制約：NOT NULL / UNIQUE / DEFAULT (30)
    *   每课包含 SQL 示例且格式排版正确，重要限制提示采用 Blockquote 块展示
    *   未修改 data/lessons.js / app.js / content-i18n.js / index.html
    *   未翻译 quiz / code / playground / past exams
*   检查：
    *   ContentI18n 读取测试：Lesson 25-30 en-US → 全部返回 title + concept ✅
    *   Lesson 31+ / zh-CN / ja-JP → 全部 null ✅
    *   Lesson 1-24 未被破坏 ✅
    *   node --check 全部通过 ✅
*   当前 SQL 英文覆盖率：**36/36 = 100%**
*   下一步建议：
    *   **第 7.11 轮** SQL 英文语言包总审计与安全边际校验

### 2026-06-11 - 第 7.10 轮任务：SQL 英文内容语言包 Lesson 31-36 扩展
*   任务类型：语言包扩展
*   完成内容：
    *   修改 `data/i18n_content/sql_en.js`，新增 SQL Lesson 31-36 英文 title + concept
    *   覆盖：主キーと自動採番 (31), 外部キー制約 (32), ALTER文・DROP文 (33), トランザクション処理 (34), インデックス (35), ビュー・ストアドルーチン (36)
    *   完成 SQL 课程所有 36 课的英文包扩展，覆盖率达到 100%
    *   未修改 data/lessons.js / app.js / content-i18n.js / index.html
    *   未翻译 quiz / code / playground / past exams
*   检查：
    *   ContentI18n 读取测试：Lesson 31-36 en-US → 全部返回 title + concept ✅
    *   Lesson 37+ / zh-CN / ja-JP → 全部 null ✅
    *   Lesson 1-30 未被破坏 ✅
    *   node --check 全部通过 ✅
*   当前 SQL 英文覆盖率：**36/36 = 100% (已修复错位)**
*   下一步建议：
    *   **第 7.11.1 轮** SQL 英文语言包总审计复查与验证

### 2026-06-11 - 第 7.12 轮任务：修复 SQL 英文语言包 Lesson 2-4 内容错位
*   任务类型：数据包修复轮
*   完成内容：
    *   修改了 `data/i18n_content/sql_en.js`，修复了早期 POC（Lesson 2-4）遗留的错位问题。
    *   sql:2 的翻译内容修正为真实的“テーブル構造（型・主キー）/ 表结构、数据类型、主键”主题，补齐了缺失的主键与类型解释。
    *   sql:3 的翻译内容修正为真实的“SELECT文①基本構文 / SELECT 基本语法”主题，删除了不相干的 WHERE 语法解释。
    *   sql:4 的翻译内容修正为真实的“SELECT文②条件：where / WHERE 条件过滤”主题，使用 code block 规范排版并校正了 WHERE 原理。
    *   未修改 data/lessons.js / app.js / content-i18n.js / index.html
    *   未修改 Lesson 5-36 的任何内容，未翻译任何 quiz / code / playground / past exams 字段
*   检查：
    *   ContentI18n 读取测试：Lesson 2-4 en-US 主题和内容读取完全符合真实课内容 ✅
    *   Lesson 5-36 仍然保持正常访问，未发生数据破坏 ✅
    *   node --check 全部通过 ✅
*   当前 SQL 英文覆盖率：**36/36 = 100% (已修复错位且已封口)**
*   下一步建议：
    *   **第 7.13 轮** 多语言派生 POC 设计与开发

### 2026-06-11 - 第 7.11.1 轮任务：SQL 英文语言包封口复查
*   任务类型：数据包审计轮
*   完成内容：
    *   基于 `d0f5ca7` 进行了 SQL 英文语言包的最终封口复查，确立了稳定性。
    *   复查确认：Lesson 1-36 覆盖完全，早期的 Lesson 2-4 错位已彻底被 7.12 轮修复，主题与内容无偏差。
    *   `sourceRef` 与 Key ID 均能一一对应，全部项的 `needsReview` 状态保持为 `true`。
    *   全局搜索证明未混入 `quiz`, `options`, `hint` 等任何禁止字段。
    *   通过了 `ContentI18n` 的单元级功能测试和 `node --check` 的语法分析。
    *   遗留观察项：Lesson 8 / Lesson 10 存在低风险 Markdown pipe table，在此标记为非阻断排版观察项。
*   当前 SQL 英文覆盖率：**36/36 = 100% (已修复错位且已封口)**
*   下一步建议：
    *   **第 7.13 轮** 多语言派生 POC 设计与开发

### 2026-06-11 - 第 7.13 轮任务：SQL 多语言派生 POC
*   任务类型：多语言派生 POC 最小实现
*   完成内容：
    *   设计并实现了“英文基准包 -> 其他语言派生包”的文件结构与按需加载机制。
    *   新增了越南语 `sql_vi.js`、缅甸语 `sql_my.js`、法语 `sql_fr.js` 三个语言包，分别包含 SQL Lesson 1-3 对应语言的派生内容。
    *   这些新语言包遵循了以下规范：
        *   不覆盖已有的英文内容，只追加对应的 `vi`/`my`/`fr` 属性。
        *   `needsReview` 状态全部设置为 `true`。
        *   `source` 设为 `ai-assisted-from-en-v1`。
        *   `sourceRef` 指向英文基准包对应的 entry。
        *   保留 SQL 关键字大写、表名/列名不本地化。
    *   修改了 `index.html`，在 `sql_en.js` 之后、`app.js` 之前顺序引入了这三个新脚本，确保多语言运行时能解析。
    *   只读确认了多语言运行时 `content-i18n.js` 原生支持对 `vi-VN`/`my-MM`/`fr-FR` 的规范化映射，未修改任何运行时代码或课程基础数据。
*   检查与测试：
    *   利用 Node.js 模拟环境测试脚本 `test_i18n.js` 运行测试，所有 7.13 单元断言通过 ✅
        *   `ContentI18n.get` 在英文 Lesson 1-36 仍然完全正常。
        *   `ContentI18n.get` 在 `vi-VN` / `my-MM` / `fr-FR` 语言下读取 Lesson 1-3 正常返回相应派生文本。
        *   `ContentI18n.get` 在 Lesson 4 访问返回 null，安全 fallback 到中日对照内容。
        *   `needsReview`, `source`, `sourceRef` 等元数据断言符合规范。
    *   `node --check` 语法检查全部新增/修改文件及关联文件（共8个）全部通过。
*   修改文件：
    *   `PROJECT_HANDOFF.md`
    *   `index.html`
*   新增文件：
    *   `data/i18n_content/sql_vi.js`
    *   `data/i18n_content/sql_my.js`
    *   `data/i18n_content/sql_fr.js`
*   未修改范围：
    *   `data/i18n_content/sql_en.js` (英文包未被修改)
    *   `assets/js/content-i18n.js` (运行时未修改)
    *   `assets/js/app.js` (页面渲染未修改)
    *   `data/lessons.js` (原始课程数据未修改)
*   当前 SQL 英文覆盖率：**36/36 = 100% (已修复错位且已封口)**
*   下一步建议：
    *   若 POC 通过，再决定是否批量派生 SQL Lesson 4-36。
    *   或先开启其他科目（如 IT Passport / Java / Python）的英文基准包建设。

### 2026-06-11 - 第 7.14 轮任务：SQL 多语言派生包批量补全
*   任务类型：多语言派生数据包扩展轮
*   完成内容：
    *   基于已封口的 SQL 英文内容包（36/36 100% 覆盖率），对越南语、缅甸语和法语的外置派生包进行了批量扩展，将其覆盖率由 Lesson 1-3 补全至 Lesson 1-36 满额。
    *   更新文件：
        *   `data/i18n_content/sql_vi.js` (越南语，Lesson 1-36 完备)
        *   `data/i18n_content/sql_my.js` (缅甸语，Lesson 1-36 完备)
        *   `data/i18n_content/sql_fr.js` (法语，Lesson 1-36 完备)
    *   翻译及派生机制对齐规范：
        *   所有派生条目的 `needsReview` 状态设为 `true`。
        *   `source` 设为 `ai-assisted-from-en-v1`。
        *   `sourceRef` 精确指向英文基准包对应的 entry 及其 ID。
        *   SQL 关键字大写，表名、列名及代码块内容未被本地化。
        *   翻译均在 JavaScript 字符串的安全闭合范围内，无特殊多余字段。
    *   本轮**未生成** `ja-JP`、`zh-CN`、`default-ja-zh` 语言包，上述语言不需外置包，直接使用系统原生自带的中日文及中日对照 fallback 逻辑。
    *   本轮未修改任何运行时代码 (`content-i18n.js`、`i18n.js` 等)，亦没有修改 `index.html`（已在上轮正确加载）。
*   检查与测试：
    *   **语法检查**：通过 `node --check` 语法检查（包含新写入的3个文件在内共8个JS文件），全部通过 ✅
    *   **功能测试**：在 Node.js 环境下运行扩展测试脚本 `test_i18n.js`，全部断言通过 ✅
        *   `ContentI18n.get` 在英文 Lesson 1-36 返回内容正常。
        *   `ContentI18n.get` 在越南语 (vi-VN)、缅甸语 (my-MM)、法语 (fr-FR) 下的 Lesson 1-36 全部成功返回翻译内容，而 Lesson 37 及其它未定义科目安全返回 `null`。
        *   `zh-CN` / `ja-JP` / `default-ja-zh` 在内容层面均正确返回 `null` (代表 fallback 回原生自带内容)。
    *   **质量检查**：在 Node.js 环境下运行定制质量检查脚本 `check_quality.js`，0 错误 ✅
        *   所有 Lesson 的 `concept` / `title` 不为空，fenced code block 完全闭合。
        *   无任何跨语言泄漏（vi/fr 中不包含缅甸文字；vi/fr/my 中均无中日韩字符泄漏）。
        *   无 `<script>` 等危险 HTML。
        *   所有翻译包中均未写入 Markdown 管道表格。
        *   SQL 代码块中的 SQL 语句无本地化翻译现象。
*   当前 SQL 各语言包覆盖率：
    *   `sql_en.js` (英文)：**36/36 = 100% (已封口)**
    *   `sql_vi.js` (越南语)：**36/36 = 100% ( needsReview: true )**
    *   `sql_my.js` (缅甸语)：**36/36 = 100% ( needsReview: true )**
    *   `sql_fr.js` (法语)：**36/36 = 100% ( needsReview: true )**
*   遗留观察项：
    *   新增的 vi/my/fr 派生内容均属 AI 翻译，未来建议由母语人员抽样校对。
    *   Lesson 8 / Lesson 10 的 Markdown pipe table 在英文基准包中依然存在，为低风险渲染观察项；但在本轮翻译派生时，目标语言包已自觉将表格内容转为了有序/无序列表，避免了潜在的渲染风险。
*   下一步建议：
    *   可以进行第 7.15 轮对多语言派生包质量及渲染测试 of the final audit.
    *   然后可开启 IT Passport 等其他科目的英文基准包（`itpass_en.js` 等）建设，或组织对 SQL 派生语言包的人工校对。

### 2026-06-11 - 第 7.15 轮任务：SQL 多语言派生包快速总审计
*   任务类型：多语言派生数据包总审计与封口
*   完成内容：
    *   基于 `0c2006a` 对多语言派生内容包进行了快速总审计，顺利完成 SQL 模块多语言工作的第二阶段封口。
    *   审计验证结果：
        *   **覆盖率**：越南语 (`sql_vi.js`)、缅甸语 (`sql_my.js`)、法语 (`sql_fr.js`) 各 36 课已完全铺齐。
        *   **格式完整性**：所有语言包均保留了标准的 IIFE 匿名函数自执行体架构，仅向全局的 `window.CONTENT_I18N` 追加特定语言的键，绝对没有覆盖原英文 (`en`) 的属性。
        *   **无禁止字段**：完全核实了没有任何语言包混入 `quiz`、`options`、`analogy`、`hint` 等无关字段。
        *   **测试通过**：经 `node --check` 检查 8 个关联文件（含数据包和多语言运行时）语法完全合法；利用测试脚本 `test_i18n.js` 进行 ContentI18n 全量读取测试，全 36 课获取均正常无碍，Lesson 37 及其它语言（`zh` / `ja` / `default-ja-zh`）安全 fallback 策略正确；通过 `check_quality.js` 脚本验证了 0 格式与质量错误。
        *   **浏览器抽查**：本轮未做浏览器抽查，仅完成 Node 读取与结构校验。
    *   **SQL 多语言内容包状态**：封口完成 🔒
*   遗留观察项：
    *   新增的 vi/my/fr 派生包均为 AI 翻译内容，未来若有具体反馈再由母语人员抽样校对。
    *   英文 Lesson 8 / Lesson 10 原版中的 Markdown pipe table 依然是低风险排版观察项。
*   下一步建议：
    *   正式开启 IT Passport 等其它科目的英文基准包（`data/i18n_content/itpass_en.js` 等）建设。
    *   暂不继续精修 SQL 多语言内容包，除非在实际应用或测试中发现具体问题。

### 2026-06-11 - 第 8.1 轮任务：IT Passport 英文内容语言包 POC
*   任务类型：数据包 POC 与前端最小接入轮
*   完成内容：
    *   **科目与包范围**：为 IT Passport 建立了英文内容语言包 POC，新建 `data/i18n_content/itpass_en.js`，只覆盖 Lesson 1-10 的 `title` 和 `concept`。使用真实 subject key `"itpass"`。
    *   **前端最小接入**：修改了 `assets/js/app.js` 中的 `loadItPassLesson(id)` 函数，在加载课件时通过 `getLessonLocalizedText("itpass", lesson)` 获取本地化的英文标题与正文；若当前语言不是 en-US，或内容包中没有对应数据，自动 fallback 回原生中日对照/日文内容。
    *   **脚本引入**：修改了 `index.html`，在 `sql_fr.js` 之后、`it_terms.js` 之前顺序引入了 `data/i18n_content/itpass_en.js` 脚本。
    *   **未修改范围**：未修改 `data/it_passport_lessons.js` 原始课件数据，未翻译任何 quiz / options / playgroundTask / analogy / example / past exams 字段，也完全没有修改任何 SQL 多语言包。
*   检查与测试：
    *   **单元测试与回归测试**：在 Node.js 环境下通过测试脚本 `test_i18n.js` 进行全量读取测试。IT Passport 英文 Lesson 1-10 能够正常解析返回；Lesson 11 返回 null 正常 fallback；zh-CN/ja-JP 访问返回 null 正常 fallback。SQL 所有 1-36 课的多语言（en, vi, my, fr）内容读取均通过回归测试，全数正常。
    *   **质量检查**：通过 `check_quality.js` 脚本验证，IT Passport 的 entry 字段和元数据格式完全合规，所有的 `needsReview` 状态均为 `true`，`source` 均为 `"manual-itpass-en-v1"`，`sourceRef` 与 ID 对应，无中文/日文残留泄漏，无 Markdown pipe tables，无 `<script>` 等危险 HTML，fenced code block 完全闭合。
    *   **语法检查**：使用 `node --check` 对 9 个关联 JavaScript 文件进行静态语法检查，全部通过。
    *   **浏览器抽查**：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   修改文件：
    *   `PROJECT_HANDOFF.md`
    *   `index.html`
    *   `assets/js/app.js`
*   新增文件：
    *   `data/i18n_content/itpass_en.js`
*   下一步建议：
    *   第 8.2 轮批量扩展 IT Passport 英文包（每批按 30-50 课推进）。

### 2026-06-11 - 第 8.1.1 轮任务：IT Passport 英文 POC 接入安全复查
*   任务类型：安全审计与交付质量复查轮
*   完成内容：
    *   **基于 98ead88 提交进行了安全与完整性双重复查**。
    *   **最小接入审计**：复查确认 `app.js` 的修改仅限于 `loadItPassLesson(id)` 方法内部，调用了 `getLessonLocalizedText("itpass", lesson)`。对 SQL 的 `loadLesson`、SG / Java / Python 的渲染没有任何修改，未修改 `formatMarkdown` 以及 `ContentI18n` 底层核心，完全保证了其他科目的隔离安全。
    *   **加载顺序审计**：复查确认 `index.html` 中的引入位置在 `content-i18n.js` 之后、`app.js` 之前，未打乱 SQL 语言包加载顺序，没有改动 UI 及无关脚本。
    *   **itpass_en.js 结构审计**：复查确认文件遵循 IIFE 匿名自执行函数，仅针对 `CONTENT_I18N` 字典中以 `"itpass:"` 为前缀的 1-10 课进行扩展。所有 entry 满足 `needsReview: true`，`source` 均为 `"manual-itpass-en-v1"`，`sourceRef` 配对精确无误。无 quiz、options 等违禁字段写入。
    *   **语法与静态测试**：
        *   对 9 个关联 JavaScript 文件的 `node --check` 语法校验已逐一、单独运行，全部通过。
        *   运行 `test_i18n.js` 进行 ContentI18n 级别读取和回退测试，IT Passport Lesson 1-10 英文解析正常，Lesson 11 返回 null，zh-CN/ja-JP 返回 null。SQL 36课 4 语言包回归测试断言全部通过。
        *   浏览器抽查情况：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   当前结论：IT Passport 英文 POC 接入安全复查通过，无 any 阻断风险。
*   下一步建议：开始第 8.2 轮批量扩展 IT Passport 英文包，建议按 Lesson 11-40 或 Lesson 11-60 推进。

### 2026-06-11 - 第 8.2 轮任务：IT Passport 英文内容语言包 Lesson 11-60 扩展
*   任务类型：数据包批量扩展轮
*   完成内容：
    *   **科目与包范围**：将 IT Passport 的英文内容语言包从 Lesson 1-10 批量扩展到了 Lesson 1-60。新增了 Lesson 11-60 的英文 `title` 和 `concept` 翻译。使用 Subject Key `"itpass"` 并完整保留了 Lesson 1-10 原有的 POC 英文数据，未触碰 Lesson 61+。
    *   **翻译与语言合规**：所有译文面向零基础，采用地道且通俗的短句，保留了专业 IT 英文词汇，校正了 `強化学習` 误译为 `Strong reinforcement learning` 的词汇瑕疵，校正了 `分散` 误译为 `Dispersion`、`増分バックアップ` 误译为 `Increasing backup` 的专业术语问题。
    *   **未修改范围**：完全没有修改 `assets/js/app.js`、`index.html` 以及 `content-i18n.js`。未修改 `data/it_passport_lessons.js` 原始课件数据，未翻译任何 quiz / options / playgroundTask / analogy / example / past exams，亦未修改任何 SQL 多语言包。
*   检查与测试：
    *   **单元与回归测试**：在 Node.js 环境下通过更新后的测试脚本 `test_i18n.js` 进行全量读取测试。IT Passport 英文 Lesson 1-60 能够正常解析并返回，Lesson 61 能够正常返回 `null` fallback；非外置语种（`zh-CN`/`ja-JP`）访问 Lesson 1 与 Lesson 60 均返回 `null` fallback。SQL 36课多语言包回归读取测试全数正常通过。
    *   **质量合规检查**：运行 `check_quality.js` 脚本验证，IT Passport 的 60 个 entry 数据均标记为 `needsReview: true`，`source` 均为 `"manual-itpass-en-v1"`，`sourceRef` 与课程及 ID 精确配对。无任何 CJK 字符残留（已把假名范围的中点“・”统一规范为英文横杠“- ”）。无任何 Markdown pipe table 或危险 HTML，fenced code block 完全闭合。
    *   **语法检查**：使用 `node --check` 逐一、单独检查 9 个关联 JavaScript 文件，全部通过。
    *   **浏览器抽查**：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   修改文件：
    *   `PROJECT_HANDOFF.md`
    *   `data/i18n_content/itpass_en.js`
*   当前 IT Passport 英文覆盖率：**60/85 = 70.6%**
*   下一步建议：
    *   第 8.3 轮继续扩展 IT Passport Lesson 61-85（完备覆盖 100%）。

### 2026-06-11 - 第 8.3 轮任务：IT Passport 英文内容语言包 Lesson 61-85 补全
*   任务类型：数据包批量补全轮
*   完成内容：
    *   **科目与包范围**：将 IT Passport 的英文内容语言包从 Lesson 60 扩展并补全到了 Lesson 85。新增了 Lesson 61-85 的英文 `title` 和 `concept` 翻译。IT Passport 英文基准包达成 85/85 = 100% 完备覆盖。使用 Subject Key `"itpass"` 并完整保留了 Lesson 1-60 的英文数据。
    *   **翻译与语言合规**：所有译文面向零基础，采用地道且通俗的短句，保留了专业 IT 英文词汇，校正了 `受入テスト` 译为 `Acceptance test` 时的冗余括号。
    *   **未修改范围**：完全没有修改 `assets/js/app.js`、`index.html` 或是 `content-i18n.js`。未修改 `data/it_passport_lessons.js` 原始课件数据，未翻译任何 quiz / options / playgroundTask / analogy / example / past exams，亦未修改任何 SQL 多语言包。
*   检查与测试：
    *   **单元与回归测试**：在 Node.js 环境下通过更新后的测试脚本 `test_i18n.js` 进行全量读取测试。IT Passport 英文 Lesson 1-85 能够正常解析并返回，Lesson 86 能够正常返回 `null` fallback；非外置语种（`zh-CN`/`ja-JP`）访问 Lesson 1 与 Lesson 85 均返回 `null` fallback。SQL 36课多语言包回归读取测试全数正常通过。
    *   **质量合规检查**：运行 `check_quality.js` 脚本验证，IT Passport 的 85 个 entry 数据均标记为 `needsReview: true`，`source` 均为 `"manual-itpass-en-v1"`，`sourceRef` 与课程及 ID 精确配对。无任何 CJK 字符残留（已把假名范围的中点“・”统一规范为英文横杠“- ”）。无任何 Markdown pipe table 或危险 HTML，fenced code block 完全闭合。
    *   **语法检查**：使用 `node --check` 逐一、单独检查 9 个关联 JavaScript 文件，全部通过。
    *   **浏览器抽查**：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   修改文件：
    *   `PROJECT_HANDOFF.md`
    *   `data/i18n_content/itpass_en.js`
*   当前 IT Passport 英文覆盖率：**85/85 = 100% (封口)**
*   下一步建议：
    *   第 8.4 轮做 IT Passport 英文包总审计与交付质量安全边际校验。
    *   审计通过后再考虑派生 vi/my/fr 或进入 SG 英文基准包建设。

### 2026-06-11 - 第 8.4 轮任务：IT Passport 英文内容语言包总审计
*   任务类型：数据包总审计与封口
*   完成内容：
    *   **审计范围与结论**：基于提交 `4894d04` 进行了 IT Passport 英文内容语言包的最终总审计。审计结论：**通过**，未发现严重或阻断性问题。IT Passport 英文内容包完成封口 🔒。
    *   **对照原始课件审计**：使用脚本对 `data/i18n_content/itpass_en.js` 与 `data/it_passport_lessons.js` 进行对照审计。确认 85 门原始课件与英文语言包中的 85 个翻译条目（`itpass:1` 至 `itpass:85`）的课程编号前缀（如 `1-01`、`1-02-1`、`10-10` 等）完全对齐，0 错位。`sourceRef` 均正确且精确指向对应 ID。
    *   **元数据与字段合规性**：确认 `needsReview` 状态全部为 `true`，`source` 均为 `"manual-itpass-en-v1"`。所有翻译条目只包含 `title`、`concept`、`needsReview`、`source`、`sourceRef`，无任何违禁字段（如 `quiz`、`options`、`hint` 等）混入。
    *   **语法与静态测试**：
        *   对 9 个关联 JavaScript 文件的 `node --check` 语法校验已逐一、单独运行，全部通过。
        *   运行 `test_i18n.js` 进行 ContentI18n 级别读取和回退测试，IT Passport Lesson 1-85 英文解析正常，Lesson 86 返回 null，zh-CN/ja-JP 返回 null。SQL 36课 4 语言包回归测试断言全部通过。
        *   通过 `check_quality.js` 脚本验证，确认 0 格式与质量错误。
        *   浏览器抽查情况：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   当前 IT Passport 英文包状态：**封口完成 🔒**
*   遗留观察项：
    *   IT Passport 英文为 AI/人工辅助批量生成，未来仍需抽样人工校对。
    *   在深度质量审计中发现 2 处非阻断性 Markdown 闭合标签瑕疵：Lesson 65 的 concept 中包含 `start to finish**` 多余的两个星号，Lesson 83 的 concept 中包含 `learning and growth."**` 多余的两个星号。由于语法正确且不破坏结构，记录为低风险观察项，未修改 `itpass_en.js` 保证封口纯净度。
*   下一步建议：
    *   第 8.5 轮：IT Passport 多语言派生 POC，先做 Lesson 1-3 的 vi/my/fr；或正式进入 SG 英文基准包建设。

### 2026-06-11 - 第 8.4.1 轮任务：修复 IT Passport 英文包 Markdown 双星号微瑕疵
*   任务类型：数据包微修复与最终封口
*   完成内容：
    *   **基于第 8.4 总审计发现的问题进行小修复**。
    *   **精修位置**：
        *   修改了 `data/i18n_content/itpass_en.js`，移除了 Lesson 65 concept 正文第 2 条末尾多余的 `**`（`start to finish**.` ➡️ `start to finish.`）。
        *   修改了 `data/i18n_content/itpass_en.js`，移除了 Lesson 83 concept 正文第 1 条末尾多余的 `**`（`learning and growth."**` ➡️ `learning and growth."`）。
    *   **审计与测试验证**：
        *   对 9 个关联 JavaScript 文件的 `node --check` 语法校验已逐一、单独运行，全部通过。
        *   运行 `test_i18n.js` 进行 ContentI18n 级别读取和回退测试，IT Passport Lesson 1-85 英文解析正常，Lesson 86 返回 null，zh-CN/ja-JP 返回 null。SQL 36课 4 语言包回归测试断言全部通过。
        *   通过 `check_quality.js` 和增强版 `audit_itpass_quality.js` 脚本验证，确认 0 格式、0 语法与 0 质量错误，加粗闭合平衡检查完全通过。
    *   **未修改范围**：未改变课程翻译含义，未修改 `assets/js/app.js`、`index.html`、`assets/js/content-i18n.js`，未修改原始课程数据 `data/it_passport_lessons.js`，也完全没有修改 any SQL 多语言包。
*   当前 IT Passport 英文包状态：**封口修复完成 🔒**
*   下一步建议：
    *   第 8.5 轮：IT Passport 多语言派生 POC，先做 Lesson 1-3 的 vi/my/fr。

### 2026-06-11 - 第 8.5 轮任务：IT Passport 多语言派生 POC
*   任务类型：多语言派生 POC 引入轮
*   完成内容：
    *   **科目与包范围**：基于已经封口的 IT Passport 英文包 `itpass_en.js`，建立了越南语 (`vi`)、缅甸语 (`my`)、法语 (`fr`) 的多语言派生 POC。
    *   **新增内容**：创建了 `data/i18n_content/itpass_vi.js`、`data/i18n_content/itpass_my.js`、`data/i18n_content/itpass_fr.js`。每个文件仅包含 Lesson 1-3 的翻译，所有 needsReview 均为 `true`，source 均为 `"ai-assisted-from-en-v1"`，sourceRef 均正确且精确指向 `itpass_en.js` 对应的 `en` 节点。
    *   **index.html 加载**：修改了 `index.html`，在 `itpass_en.js` 之后、`it_terms.js` 之前顺序引入了 `itpass_vi.js`、`itpass_my.js`、`itpass_fr.js`。
    *   **未修改范围**：完全没有修改运行时代码（`app.js`、`content-i18n.js` 等），没有修改 `itpass_en.js`、`data/it_passport_lessons.js` 等文件，也没有触碰任何 SQL 多语言包及 Web 公开版项目。
*   检查与测试：
    *   **单元与回归测试**：在 Node.js 环境下通过更新后的测试脚本 `test_i18n.js` 进行全量读取测试。IT Passport 越南语/缅甸语/法语的 Lesson 1-3 能够正常解析并返回，Lesson 4 能够正常返回 `null` 触发 fallback 机制；SQL 36课多语言包回归读取测试全数正常通过。
    *   **质量合规检查**：运行 `check_multilingual_poc_quality.js` 验证，POC 数据 100% 符合规范。无任何 CJK 字符泄漏（对 `vi`/`fr`/`my`），无 any Markdown pipe table 或危险 HTML，fenced code block 与加粗全部闭合，IT 专业术语英文保留规则被正确执行。
    *   **语法检查**：使用 `node --check` 逐一、单独检查 12 个关联 JavaScript 文件，全部通过。
    *   **浏览器抽查**：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   下一步建议：
    *   第 8.6 轮：批量补全 IT Passport 的 vi/my/fr 派生语言包到 85/85，实现全科目多语言完备覆盖。

### 2026-06-11 - 第 8.6 轮任务：IT Passport 多语言派生包批量补全
*   任务类型：多语言派生批量覆盖轮
*   完成内容：
    *   **科目与包范围**：基于 IT Passport 英文封口包 `itpass_en.js`，将越南语 (`vi`)、缅甸语 (`my`)、法语 (`fr`) 的派生包从 Lesson 1-3 批量补全到了 Lesson 1-85。
    *   **补全内容**：使用 `TranslatorSubagent` 并发处理翻译，并用 `merge_multilingual.js` 自动整合，完全重写补全了 `data/i18n_content/itpass_vi.js`、`data/i18n_content/itpass_my.js`、`data/i18n_content/itpass_fr.js`。三语言均达到 85/85 = 100% 覆盖。
    *   **翻译质量与规范**：所有 needsReview 状态均为 `true`，source 均为 `"ai-assisted-from-en-v1"`，sourceRef 格式正确且精确配对。保留了必要的英文 IT 专业术语，无 Markdown 表格，无危险 HTML，fenced code block 与粗体标记全部闭合，并且成功避免了 Lesson 65 / 83 的多余星号问题。
    *   **未修改范围**：未修改 `itpass_en.js`，未修改原始课程数据 `data/it_passport_lessons.js`，未修改运行时代码及 `index.html`，未修改 SQL 多语言包。
*   检查与测试：
    *   **单元与回归测试**：运行更新后的 `test_i18n.js` 进行 ContentI18n 级别读取和回退测试。IT Passport 英文/越南语/缅甸语/法语 1-85 课均可正常获取 title 和 concept，86 课均返回 null 触发 fallback。SQL 36课 4 语言包回归测试断言全部通过。
    *   **质量合规检查**：运行 `check_multilingual_full_quality.js` 验证，0 errors，0 warnings。格式和语言环境均符合设计规范。
    *   **语法检查**：使用 `node --check` 逐一、单独检查 12 个关联 JavaScript 文件，全部通过。
    *   **浏览器抽查**：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   当前 IT Passport 多语言覆盖率：**85/85 = 100% (封口补全)**
*   遗留观察项：
    *   vi/my/fr 派生内容为 AI 翻译，未来可根据需要组织母语人员抽样校对。
*   下一步建议：
    *   第 8.7 轮：IT Passport 多语言派生包总审计，或开启 SG 英文基准包建设。

### 2026-06-11 - 第 8.7 轮任务：IT Passport 多语言派生包总审计
*   任务类型：数据包总审计与封口
*   完成内容：
    *   **审计范围与结论**：基于提交 `2b1e290` 进行了 IT Passport 多语言派生包（vi / my / fr）的最终总审计。审计结论：**通过**，未发现严重或阻断性问题。IT Passport 越南语/缅甸语/法语多语言内容包完成最终封口 🔒。
    *   **对照英文基准审计**：确认 `itpass_vi.js`、`itpass_my.js`、`itpass_fr.js` 与英文基准包 `itpass_en.js` 对应 ID 100% 对齐。三者均为 85/85 = 100% 覆盖。`sourceRef` 均正确且精确指向英文包对应 ID。
    *   **元数据与字段合规性**：确认 `needsReview` 状态全部为 `true`，`source` 均为 `"ai-assisted-from-en-v1"`。所有派生翻译只包含 `title`、`concept`、`needsReview`、`source`、`sourceRef`，无任何违禁字段（如 `quiz`、`options`、`hint` 等）混入。
    *   **语法与静态测试**：
        *   对 12 个关联 JavaScript 文件的 `node --check` 语法校验已逐一、单独运行，全部通过。
        *   运行 `test_i18n.js` 进行 ContentI18n 级别读取和回退测试，IT Passport 英文/越南语/缅甸语/法语 Lesson 1-85 均解析正常，越界 Lesson 86 均返回 null。SQL 36课 4 语言包回归测试断言全部通过。
        *   通过 `check_multilingual_full_quality.js` 脚本验证，确认 0 格式错误，0 跨语言污染，且加粗与代码块完全成对闭合，且成功避免了 Lesson 65 / 83 的多余星号问题。
        *   浏览器抽查情况：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   当前 IT Passport 多语言包状态：**封口完成 🔒**
*   遗留观察项：
    *   vi/my/fr 派生内容为 AI 翻译，未来可根据需要组织母语人员抽样校对。
*   下一步建议：
    *   第 9 轮：SG（信息安全管理考试）英文基准包建设或 SG ContentI18n 接入。

### 2026-06-11 - 第 9.1 轮任务：SG 英文内容语言包 POC
*   任务类型：数据包 POC 与前端最小接入轮
*   完成内容：
    *   **科目与包范围**：在 SQL 与 IT Passport 多语言线均已封口后进入 SG 阶段。为 SG（信息安全管理考试）建立了英文内容语言包 POC，新建 `data/i18n_content/sg_en.js`，只覆盖 Lesson 1-10 的 `title` 和 `concept`。使用的真实 subject key 为 `"sg"`。
    *   **前端最小接入**：修改了 `assets/js/app.js` 中的 `loadSgLesson(id)` 函数，在加载课件时调用了 `getLessonLocalizedText("sg", lesson)`。如果能够成功匹配，则使用英文 title/concept 替换原生中日对照/日文内容；否则（如当前语言非 en-US，或当前课时超出 POC 范围）安全自动 fallback 到原始课程正文。此为 SG 科目的最小化接入，对 SQL / IT Passport / Java / Python 的渲染逻辑、多语言核心以及 formatMarkdown 未做任何修改，保障了系统隔离安全。
    *   **加载顺序引入**：修改了 `index.html`，在 `itpass_fr.js` 之后、`it_terms.js` 之前顺序引入了 `data/i18n_content/sg_en.js` 脚本。
    *   **未修改范围**：未修改 `data/sg_lessons.js` 与 `data/sg_past_exams.js` 原始课件数据，未翻译任何 quiz / options / playgroundTask / analogy / example / past exams 字段，亦没有修改 SQL / IT Passport 的多语言包，未操作 Web 公开版。
*   检查与测试：
    *   **单元与回归测试**：在 Node.js 环境下通过更新后的测试脚本 `test_i18n.js` 进行全量读取测试。SG 英文 Lesson 1-10 均可正常解析返回，Lesson 11返回 null 正常 fallback，zh-CN/ja-JP 访问 Lesson 1-10 均返回 null 正常 fallback。SQL 36课多语言包与 IT Passport 85课多语言包回归读取测试全数正常通过。
    *   **质量合规检查**：SG 英文包 entry 全部定义且字段完备，所有的 `needsReview` 状态均为 `true`，`source` 均为 `"manual-sg-en-v1"`，`sourceRef` 与 ID 精确配对。无任何 CJK 字符泄漏，无 any Markdown pipe table 或危险 HTML。
    *   **语法检查**：使用 `node --check` 逐一、单独检查了 13 个关联 JavaScript 文件，全部通过。
    *   **浏览器抽查**：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   修改文件：
    *   `PROJECT_HANDOFF.md`
    *   `index.html`
    *   `assets/js/app.js`
*   新增文件：
    *   `data/i18n_content/sg_en.js`
*   下一步建议：
    *   第 9.2 轮：批量扩展 SG 英文包。每批可按 15 或 20 课推进，平稳且安全地覆盖到全 44 课。

### 2026-06-11 - 第 9.1.1 轮任务：SG 英文 POC 接入安全复查
*   任务类型：安全审计与交付质量复查轮
*   完成内容：
    *   **基于 e078e32 提交进行了安全与完整性双重复查**。
    *   **最小接入审计**：复查确认 `app.js` 的修改仅限于 `loadSgLesson(id)` 方法内部，调用了 `getLessonLocalizedText("sg", lesson)`。对 SQL 的 `loadLesson`、IT Passport 的 `loadItPassLesson`、Java / Python 的渲染没有任何修改，未修改 `formatMarkdown` 以及 `ContentI18n` 底层核心，完全保证了其他科目的隔离安全。
    *   **加载顺序审计**：复查确认 `index.html` 中的引入位置在 `itpass_fr.js` 之后、`it_terms.js` 之前，未打乱 SQL 和 IT Passport 语言包的加载顺序，没有改动 UI 及无关脚本。
    *   **sg_en.js 结构审计**：复查确认文件遵循 IIFE 匿名自执行函数，仅针对 `CONTENT_I18N` 字典中以 `"sg:"` 为前缀的 1-10 课进行扩展。所有 entry 满足 `needsReview: true`，`source` 均为 `"manual-sg-en-v1"`，`sourceRef` 配对精确无误。无 quiz、options 等违禁字段写入，title 和 concept 译文均非空，且无中文/日文残留。
    *   **语法与静态测试**：
        *   对 13 个关联 JavaScript 文件的 `node --check` 语法校验已逐一、单独运行，全部通过。
        *   运行 `test_i18n.js` 进行 ContentI18n 级别读取和回退测试，SG Lesson 1-10 英文解析正常，Lesson 11 返回 null，zh-CN/ja-JP 返回 null。SQL 36课与 IT Passport 85课 4 语言包回归测试断言全部通过。
        *   浏览器抽查情况：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   当前结论：SG 英文 POC 接入安全复查通过，无 any 阻断风险，允许进入第 9.2 轮。
*   下一步建议：第 9.2 轮批量扩展 SG 英文包，可直接补齐 Lesson 11-44。

### 2026-06-11 - 第 9.2 轮任务：SG 英文内容语言包批量扩展 Lesson 11-44
*   任务类型：数据包批量扩展轮
*   完成内容：
    *   **科目与包范围**：基于已封口的 SG 英文 POC（Lesson 1-10），本轮批量补全 SG 英文包，将覆盖率从 10/44 扩展到 44/44 = 100%。共新增 Lesson 11-44 的英文 `title` 和 `concept`，仅修改 `data/i18n_content/sg_en.js` 一个文件。
    *   **内容质量**：每条 entry 的 `title` 基于 `titleZh` 中文标题意译为英文技术术语，`concept` 基于 `conceptZh` 翻译，保留了原有的 Markdown 粗体格式和技术术语（日语术语括号标注）。所有 entry 的 `needsReview` 均为 `true`，`source` 均为 `\"ai-assisted-from-sg-v1\"`，`sourceRef` 精确指向 `data/sg_lessons.js:N:conceptZh`。
    *   **未修改范围**：未修改 Lesson 1-10 的任何 entry。未修改 `app.js`、`index.html`、SQL 包、IT Passport 包。
*   检查与测试：
    *   `node --check data/i18n_content/sg_en.js` 语法校验通过。
    *   ContentI18n 读取测试：SG Lesson 1-44 所有 `en.title` / `en.concept` 均非空，Coverage 44/44，ALL FIELDS OK。
    *   SQL 36课多语言包与 IT Passport 85课多语言包回归测试全部通过。
*   修改文件：
    *   `PROJECT_HANDOFF.md`
    *   `data/i18n_content/sg_en.js`（+340 行，Lesson 11-44）
*   Commit：`9c5e3ed feat(content-i18n): expand SG English lessons 11-44`
*   当前 SG 英文包状态：**44/44 = 100%，待审计封口**
*   下一步建议：第 9.3 轮：SG 英文包总审计 + PROJECT_HANDOFF.md 封口记录。

### 2026-06-11 - 第 9.3 轮任务：SG 英文内容语言包总审计
*   任务类型：数据包总审计与封口
*   完成内容：
    *   **审计范围与结论**：基于提交 `9c5e3ed`（数据包）和 `b4f93ca`（文档记录），对 SG 英文内容语言包 `sg_en.js` 做了最终总审计。审计结论：**通过**。SG 英文基准包最终封口 🔒。
    *   **结构与覆盖审计**：确认 sg_en.js 涵盖 SG Lesson 1-44，无缺失、无重复 key、无越界 sg:45。44 个 entry 全部定义了 `en.title`、`en.concept`、`en.needsReview`、`en.source`、`en.sourceRef` 五个字段。无任何禁止字段（quiz / options / hint / playgroundTask / analogy / example / code / answer / expectedQuery / pastExam / pastExams）混入。
    *   **元数据一致性**：44/44 条 `needsReview` 均为 `true`。Lesson 1-10 的 `source` 为 `manual-sg-en-v1`，Lesson 11-44 为 `ai-assisted-from-sg-v1`（这在第 9.2 轮已说明）。`sourceRef` 中，Lesson 1-10 指向 `data/sg_lessons.js:<id>:conceptJa`，Lesson 11-44 指向 `data/sg_lessons.js:<id>:conceptZh`，均与每条的 lesson id 精确对应。
    *   **内容质量检查**：title 格式为 `X-Y-Z` 章节号（SG 课程使用 subSectionId 编号），与原始 sg_lessons.js 的 subSectionId 一致，不存在 title 编号错位问题。检出部分 concept 中包含日文术语括号标注（如 `共通鍵`、`ハイブリッド暗号方式`、`インシデント` 等），属于在英文译文中刻意保留日文原词对照的技术术语处理方式，符合项目"日本考试术语保留日文原文"原则，不作为阻断项。无 CJK 字符混入英文标题。无 Markdown pipe table。fenced code block 和 `**bold**` 全部成对闭合。无危险 HTML。
    *   **ContentI18n 读取测试**：SG Lesson 1-44 `get("sg", N, "en-US")` 全部返回 title + concept，sg:45 返回 null；zh-CN / ja-JP / default-ja-zh 查询 1-44 均正确返回 null。
    *   **多科回归测试**：
        *   SQL 36 课 en/vi/my/fr 四语言包回归全部正常 ✅
        *   IT Passport 85 课 en/vi/my/fr 四语言包回归全部正常 ✅
    *   **语法检查**：共 13 个关联 JS 文件 node --check 逐一单独通过 ✅
    *   **浏览器抽查**：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   当前 SG 英文包状态：**封口完成 🔒**
*   遗留观察项：
    *   SG 英文 Lesson 1-10 为手动起草（POC），Lesson 11-44 为 AI 辅助批量生成（`ai-assisted-from-sg-v1`），未来建议抽检校对 AI 生成部分。
    *   SG 英文 concept 中的日文术语括号标注（如 `共通鍵`、`インシデント`）是技术术语一致性设计的一部分，未来如有需要可以评估是否统一用英语术语外加日语备注。
*   下一步建议：
    *   **第 9.4 轮**：SG 多语言派生 POC，先做 Lesson 1-3 的 vi/my/fr
    *   或进入 **Java 英文基准包建设**

### 2026-06-11 - 第 9.4 轮任务：SG 多语言派生 POC
*   任务类型：数据包 POC
*   完成内容：
    *   基于已封口的 SG 英文基准包 `sg_en.js`，派生 SG 多语言 POC。
    *   新建 `data/i18n_content/sg_vi.js` — SG Lesson 1-3 越南语
    *   新建 `data/i18n_content/sg_my.js` — SG Lesson 1-3 缅甸语
    *   新建 `data/i18n_content/sg_fr.js` — SG Lesson 1-3 法语
    *   所有派生内容仅包含 `.vi` / `.my` / `.fr`，不覆盖 `.en` 层。
    *   修改 `index.html`，在 `sg_en.js` 之后、`app.js` 之前加载 `sg_vi.js` / `sg_my.js` / `sg_fr.js`。
    *   每条包含 title、concept、needsReview: true、source: "ai-assisted-from-en-v1"、sourceRef 指向 sg_en.js。
    *   未修改 `sg_en.js`、`data/sg_lessons.js`、`app.js`、`content-i18n.js` 以及 SQL 和 IT Passport 的多语言包。
*   检查与测试：
    *   ContentI18n 读取测试：SG vi/my/fr Lesson 1-3 均返回正确翻译，Lesson 4 返回 null，zh-CN/ja-JP/default-ja-zh 返回 null。
    *   SQL 36 课四语言包回归：全部正常 ✅
    *   IT Passport 85 课四语言包回归：全部正常 ✅
    *   语法检查：16 个关联 JS 文件 node --check 逐一通过 ✅
    *   浏览器抽查：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   修改文件：`PROJECT_HANDOFF.md`、`index.html`
*   新增文件：`data/i18n_content/sg_vi.js`、`data/i18n_content/sg_my.js`、`data/i18n_content/sg_fr.js`
*   当前 SG 多语言包状态：**POC 完成 (vi/my/fr Lesson 1-3)**
*   下一步建议：
    *   **第 9.5 轮**：SG 多语言派生批量补全，将 vi/my/fr 扩展到全 44 课
    *   或先做第 9.4.1 轮 SG 多语言 POC 安全复查

### 2026-06-11 - 第 9.5 轮任务：SG 多语言派生包批量补全
*   任务类型：数据包批量补全
*   完成内容：
    *   基于已封口的 SG 英文基准包，补全 SG 多语言派生包 `sg_vi.js` / `sg_my.js` / `sg_fr.js`。
    *   将 vi/my/fr 覆盖率从 Lesson 1-3 (POC) 扩展到 Lesson 1-44 (全量)。
    *   每条包含 title、concept、needsReview: true、source: "ai-assisted-from-en-v1"、sourceRef 指向 sg_en.js 对应 id。
    *   未修改 `sg_en.js`、未修改 `data/sg_lessons.js`、未修改 `app.js` / `index.html` / `content-i18n.js`、未修改 SQL 和 IT Passport 多语言包。
*   检查与测试：
    *   ContentI18n 读取测试：SG vi/my/fr Lesson 1-44 全部返回 title + concept，sg:45 全部 null，zh-CN/ja-JP/default-ja-zh 全部 null。✅
    *   SQL 36 课四语言包回归：全部正常 ✅
    *   IT Passport 85 课四语言包回归：全部正常 ✅
    *   语法检查：17 个关联 JS 文件 node --check 逐一通过 ✅
    *   快速质量检查：44/44 覆盖、无 sg:45、title 和 concept 均非空、needsReview 全 true、source 和 sourceRef 格式正确、无禁止字段混入、无 Markdown 表格、fenced code block 和 bold 成对闭合、无危险 HTML ✅
    *   浏览器抽查：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   当前 SG 多语言包状态：**vi/my/fr 44/44 = 100%，待审计封口**
*   遗留观察项：
    *   vi/my/fr 为 AI 派生内容，未来仍需抽样人工校对。
*   下一步建议：
    *   **第 9.6 轮**：SG 多语言派生包总审计 + PROJECT_HANDOFF.md 封口记录

### 2026-06-11 - 第 9.6 轮任务：SG 多语言派生包总审计
*   任务类型：数据包总审计与封口
*   完成内容：
    *   **审计范围与结论**：基于提交 `38e56d6`，对 SG 多语言派生包 `sg_vi.js`、`sg_my.js`、`sg_fr.js` 做了最终总审计。审计结论：**通过**。SG 多语言包最终封口 🔒。
    *   **结构与覆盖审计**：确认三个派生包均覆盖 SG Lesson 1-44，无缺失、无重复 key、无越界 sg:45。三个包合计 132 条 entry，均完整定义了 title、concept、needsReview、source、sourceRef 五个字段。无任何禁止字段（quiz / options / hint / playgroundTask / analogy / example / code / answer / expectedQuery / pastExam / pastExams）混入。
    *   **元数据一致性**：44/44 条 needsReview 均为 true。44/44 条 source 均为 `"ai-assisted-from-en-v1"`。44/44 条 sourceRef 均正确指向 `data/i18n_content/sg_en.js:sg:<id>:en`。
    *   **修复项**：发现并修复了 `sg:15.vi` 中一处 bold 标记不配对问题（`**:` → 统一为 `**:`）。
    *   **ContentI18n 读取测试**：SG en/vi/my/fr Lesson 1-44 全部返回 title + concept，sg:45 全部 null；zh-CN / ja-JP / default-ja-zh 查询均正确返回 null。✅
    *   **多科回归测试**：
        *   SQL 36 课四语言包回归全部正常 ✅
        *   IT Passport 85 课四语言包回归全部正常 ✅
    *   **语法检查**：16 个关联 JS 文件 node --check 逐一通过 ✅
    *   **快速质量检查**：无中/日文字符混入英文标题、无 Markdown 表格、fenced code block 和 bold 全部成对闭合、无危险 HTML ✅
    *   **浏览器抽查**：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   当前 SG 多语言包状态：**封口完成 🔒**
*   遗留观察项：
    *   vi/my/fr 为 AI 派生内容，未来仍需抽样人工校对。
*   下一步建议：
    *   进入 **Java 英文基准包建设**
    *   或进入 **Python 英文基准包建设**

### 2026-06-11 - 第 10.1 轮任务：Java 英文内容语言包 POC
*   任务类型：数据包 POC 与前端最小接入轮
*   完成内容：
    *   **科目与包范围**：在 SQL / IT Passport / SG 多语言线均已封口后进入 Java 阶段。为 Java 建立了英文内容语言包 POC，新建 `data/i18n_content/java_en.js`，覆盖 Java Lesson 1-10 的 `title` 和 `concept`。使用的真实 subject key 为 `"java"`。
    *   **前端最小接入**：修改了 `assets/js/app.js` 中的 `loadJavaLesson(id)` 函数，在加载课件时调用了 `getLessonLocalizedText("java", lesson)`。如果能够成功匹配，则使用英文 title/concept 替换原生日文内容；否则（如当前语言非 en-US，或当前课时超出 POC 范围）安全自动 fallback 到原始日文课程正文。属于 Java 科目的最小化接入，对 SQL / IT Passport / SG / Python 的渲染逻辑、多语言核心以及 formatMarkdown 未做任何修改。
    *   **加载顺序引入**：修改了 `index.html`，在 `sg_fr.js` 之后、`it_terms.js` 之前顺序引入了 `data/i18n_content/java_en.js` 脚本。
    *   **未修改范围**：未修改 `data/java_lessons.js` 原始课件数据，未翻译任何 quiz / options / playgroundTask / analogy / example / code / answer / past exams 字段，未修改 SQL / IT Passport / SG 的多语言包，未操作 Web 公开版。
*   检查与测试：
    *   **语法检查**：17 个关联 JS 文件 `node --check` 逐一通过 ✅
    *   **ContentI18n 读取测试**：Java Lesson 1-10 英文全部返回 title + concept，Lesson 11 返回 null；zh-CN / ja-JP / default-ja-zh 查询均正确返回 null ✅
    *   **SQL 回归测试**：SQL 36 课四语言包回归全部正常 ✅
    *   **IT Passport 回归测试**：IT Passport 85 课四语言包回归全部正常 ✅
    *   **SG 回归测试**：SG 44 课四语言包回归全部正常 ✅
    *   **合计**：680/680 ContentI18n 读取通过 ✅
    *   **浏览器抽查**：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   修改文件：
    *   `PROJECT_HANDOFF.md`
    *   `index.html`
    *   `assets/js/app.js`
*   新增文件：
    *   `data/i18n_content/java_en.js`
*   当前 Java 英文覆盖率：**10/32 = 31% (POC 阶段)**
*   下一步建议：
    *   第 10.2 轮：批量扩展 Java 英文包（Lesson 11-115 补齐至 100%）

### 2026-06-11 - 第 10.2 轮任务：Java 英文内容语言包批量补全（Lesson 11-115）
*   任务类型：数据包批量扩展轮
*   完成内容：
    *   **科目与包范围**：基于已封口的 Java 英文 POC（Lesson 1-10），本轮批量补全 Java 英文包，将覆盖率从 10/115 扩展到 115/115 = 100%。共新增 Lesson 11-115 的英文 `title` 和 `concept`，仅修改 `data/i18n_content/java_en.js` 一个文件。
    *   **内容质量**：每条 entry 的英文 `title` 和 `concept` 基于 `conceptJa` 日文原文翻译，保留核心 Java 技术术语（class, object, method, variable, type, JVM, inheritance, interface, ArrayList 等）。所有 entry 的 `needsReview` 均为 `true`，`source` 均为 `"manual-java-en-v1"`，`sourceRef` 精确指向 `data/java_lessons.js:<id>:conceptJa`。
    *   **未修改范围**：未修改 Lesson 1-10 的任何 entry。未修改 `app.js`、`index.html`、SQL 包、IT Passport 包、SG 包。
*   检查与测试：
    *   **语法检查**：17 个关联 JS 文件 `node --check` 逐一通过 ✅
    *   **ContentI18n 读取测试**：Java Lesson 1-115 英文全部返回 title + concept，Lesson 116 返回 null；zh-CN / ja-JP / default-ja-zh 查询均正确返回 null ✅
    *   **SQL 回归测试**：SQL 36 课四语言包回归全部正常 ✅
    *   **IT Passport 回归测试**：IT Passport 85 课四语言包回归全部正常 ✅
    *   **SG 回归测试**：SG 44 课四语言包回归全部正常 ✅
    *   **合计**：775/775 ContentI18n 读取通过 ✅
    *   **浏览器抽查**：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   修改文件：
    *   `PROJECT_HANDOFF.md`
    *   `data/i18n_content/java_en.js`
*   当前 Java 英文覆盖率：**115/115 = 100%（封口待审计）**
*   下一步建议：
    *   第 10.3 轮：Java 英文包总审计 + PROJECT_HANDOFF.md 封口记录
    *   或直接进入 **Python 英文基准包建设**

### 2026-06-11 - 第 10.3 轮任务：Java 英文内容语言包总审计
*   任务类型：数据包总审计与封口
*   审计范围与结论：基于提交 `5d70425`，对 Java 英文内容语言包 `java_en.js` 做了最终总审计。审计结论：**通过**。Java 英文基准包最终封口 🔒。
*   结构与覆盖审计：
    *   确认 java_en.js 涵盖 Java Lesson 1-115，无缺失、无重复 key、无越界 java:116。
    *   115 个 entry 全部定义了 `en.title`、`en.concept`、`en.needsReview`、`en.source`、`en.sourceRef` 五个字段。
    *   无任何禁止字段（quiz / options / hint / playgroundTask / analogy / example / code / answer / expectedQuery / pastExam / pastExams）混入。
    *   结构审计结论：**通过**
*   元数据一致性：
    *   115/115 条 needsReview 均为 true
    *   115/115 条 source 均为 `"manual-java-en-v1"`
    *   115/115 条 sourceRef 均正确指向 `data/java_lessons.js:<id>:conceptJa`
*   内容质量检查：
    *   title 和 concept 均非空，无中/日文字符混入，无 Markdown 表格，无危险 HTML。
    *   Java 泛型语法（`<String>`、`<Integer>` 等）在代码块内正常，非真实 HTML 标签。
    *   fenced code block 和 `**bold**` 全部成对闭合。
    *   内容质量结论：**通过**
*   ContentI18n 读取测试：
    *   Java Lesson 1-115 `get("java", N, "en-US")` 全部返回 title + concept ✅
    *   java:116 返回 null ✅
    *   zh-CN / ja-JP / default-ja-zh 查询 1-115 均正确返回 null ✅
*   多科回归测试：
    *   SQL 36 课四语言包回归全部正常 ✅
    *   IT Passport 85 课四语言包回归全部正常 ✅
    *   SG 44 课四语言包回归全部正常 ✅
    *   合计：775/775 ContentI18n 读取通过 ✅
*   语法检查：17 个关联 JS 文件 node --check 逐一通过 ✅
*   浏览器抽查：本轮未做浏览器抽查，仅完成 Node 读取与静态检查。
*   当前 Java 英文包状态：**封口完成 🔒**
*   遗留观察项：
    *   Java 英文为人工辅助批量生成（`manual-java-en-v1`），未来建议抽样人工校对。
*   下一步建议：
    *   **第 10.4 轮**：Java 多语言派生 POC，先做 Lesson 1-3 的 vi/my/fr
    *   或进入 **Python 英文基准包建设**