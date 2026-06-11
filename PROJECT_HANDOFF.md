# PROJECT_HANDOFF.md

## 1. 项目定位
- Windows PC 完整版 IT 学习工具，面向在日学习的多国留学生。
- 项目路径：`E:\项目\sql-learning-hub`
- Web 公开版路径：`E:\项目\sql-learning-hub-web-public`（严禁操作）
- 支持科目：SQL、IT Passport、SG（信息安全管理）、Java、Python
- 支持语言：ja-JP、zh-CN、en-US、vi-VN、my-MM、fr-FR、default-ja-zh（中日对照）

## 2. 项目架构
| 组件 | 路径 |
|------|------|
| 启动入口 | `启动.bat` |
| 后端 | `server.py` |
| AI 服务 | `study_ai.py` |
| 本地数据库 | `data/study_ai.db`（Git 忽略）|
| 前端入口 | `index.html` |
| 前端主逻辑 | `assets/js/app.js`（格式Markdown、课程加载、考试、UI 联动）|
| 多语言 UI 运行时 | `assets/js/i18n.js`（翻译引擎、语言切换、applyStaticUI）|
| UI 字典 | `assets/js/i18n-ui-dict.js`（7 语言 UI 静态文案，239+ key）|
| 内容语言包运行时 | `assets/js/content-i18n.js`（ContentI18n.get/has API）|
| 术语表数据 | `data/glossary/it_terms.js`（30 个 MVP 核心术语）|
| 术语表弹窗 | `assets/js/glossary.js` + `assets/css/glossary.css` |
| 原始课程数据 | `data/lessons.js`、`data/it_passport_lessons.js`、`data/sg_lessons.js`、`data/java_lessons.js`、`data/python_lessons.js` |
| 内容翻译包 | `data/i18n_content/`（每科目 × 4 语言）|

## 3. 语言支持策略
- UI 支持 7 种语言：ja-JP、zh-CN、en-US、my-MM、vi-VN、fr-FR、default-ja-zh（中日对照）
- 学习内容支持 4 种语言：en（基准包）、vi / my / fr（派生包）
- ja-JP / zh-CN 使用原始课程数据中的 `titleJa/conceptJa` 和 `titleZh/conceptZh`
- 原则：UI 秒切换（不依赖 AI）、英文技术术语保留、考试原题保留日文原文

## 4. 核心模块说明

### 4.1 内容国际化系统（ContentI18n）
- 运行时：`assets/js/content-i18n.js`
- API：`ContentI18n.get(subject, id, lang)` 返回 `{ title, concept, needsReview }`
- API：`ContentI18n.has(subject, id, lang)` 返回 boolean
- 语言映射：en-US/en→en, zh-CN/zh→zh, ja-JP/ja→ja, vi-VN/vi→vi, my-MM/my→my, fr-FR/fr→fr, default-ja-zh→zh
- 内容 key 格式：`"subject:id"`（如 `"sql:1"`、`"java:42"`、`"python:255"`）
- 加载失败或语言包不存在时安全返回 null

### 4.2 前端接入函数
所有 5 个科目的课程加载函数均已通过 `getLessonLocalizedText(subject, lesson)` 统一接入：
- `loadLesson(id)` → `"sql"`
- `loadItPassLesson(id)` → `"itpass"`
- `loadSgLesson(id)` → `"sg"`
- `loadJavaLesson(id)` → `"java"`
- `loadPythonLesson(id)` → `"python"`

该函数在 `app.js` 中定义，优先使用 ContentI18n 内容，无内容时自动 fallback 到原始日文课程内容。

### 4.3 index.html 脚本加载顺序
```html
assets/js/i18n-ui-dict.js       ← UI 字典
assets/js/i18n.js               ← UI 运行时
assets/js/content-i18n.js       ← 内容运行时
data/i18n_content/sql_en.js     ← SQL en
data/i18n_content/sql_vi.js     ← SQL vi
data/i18n_content/sql_my.js     ← SQL my
data/i18n_content/sql_fr.js     ← SQL fr
data/i18n_content/itpass_en.js  ← IT Passport en
data/i18n_content/itpass_vi.js  ← IT Passport vi
data/i18n_content/itpass_my.js  ← IT Passport my
data/i18n_content/itpass_fr.js  ← IT Passport fr
data/i18n_content/sg_en.js      ← SG en
data/i18n_content/sg_vi.js      ← SG vi
data/i18n_content/sg_my.js      ← SG my
data/i18n_content/sg_fr.js      ← SG fr
data/i18n_content/java_en.js    ← Java en
data/i18n_content/java_vi.js    ← Java vi
data/i18n_content/java_my.js    ← Java my
data/i18n_content/java_fr.js    ← Java fr
data/i18n_content/python_en.js  ← Python en
data/i18n_content/python_vi.js  ← Python vi
data/i18n_content/python_my.js  ← Python my
data/i18n_content/python_fr.js  ← Python fr
data/glossary/it_terms.js       ← 术语表数据
assets/js/glossary.js           ← 术语表弹窗
assets/js/app.js                ← 主逻辑
```

### 4.4 formatMarkdown 函数
位于 `assets/js/app.js`，支持：
- `**bold**` → `<strong>`
- `` `code` `` → `<code>`
- ` ```sql ` / ` ``` ` fenced code blocks → `<pre><code class="language-sql">`（占位符+回调安全机制，避免 `$&` 注入）
- 不支持 Markdown 管道表格（有意限制）

### 4.5 语言切换事件
`i18n:languageChanged` CustomEvent 在 `i18n.js` 的 `setLanguage()` 末尾派发，glossary.js 和内容刷新机制监听该事件。

## 5. 内容语言包结构

### 5.1英文基准包
每科目有一个英文基准包（如 `sql_en.js`、`python_en.js`），作为其他派生语言（vi/my/fr）的唯一来源。

结构：
```js
window.CONTENT_I18N["subject:id"] = {
  en: {
    title: "...",
    concept: "...",
    needsReview: true,
    source: "manual-{subject}-en-v1",
    sourceRef: "data/{lessons_file}.js:{id}:conceptJa"
  }
};
```

### 5.2 多语言派生包
派生包（`_vi.js`、`_my.js`、`_fr.js`）从英文基准包派生生成。

结构：
```js
window.CONTENT_I18N["subject:id"] = window.CONTENT_I18N["subject:id"] || {};
window.CONTENT_I18N["subject:id"].vi = {
  title: "...",
  concept: "...",
  needsReview: true,
  source: "ai-assisted-from-en-v1",
  sourceRef: "data/i18n_content/{subject}_en.js:{subject}:{id}:en"
};
```

禁止字段：quiz, options, hint, playgroundTask, analogy, example, code, answer, expectedQuery, pastExam, pastExams

## 6. 项目限制
- 严禁操作 `E:\项目\sql-learning-hub-web-public`
- 不要覆盖 `data/study_ai.db`（已被 .gitignore 忽略）
- 不要擅自 commit / push（需授权）
- 不要把 AI 动态翻译作为 UI 秒切换依赖
- 不要把考试原题替换成翻译文本
- 不要把学习内容和 UI 文案混在同一套 key 里
- 不要使用 `git add .` 或 `git add -A`
- 不要修改原始课程数据文件

## 7. 完整文件索引

### 7.1 UI 多语言文件
| 文件 | 说明 |
|------|------|
| `assets/js/i18n.js` | UI 翻译运行时、语言切换、applyStaticUI |
| `assets/js/i18n-ui-dict.js` | 239+ UI key × 7 语言字典 |
| `index.html` | data-i18n 标记（P0+P1 覆盖）|

### 7.2 IT 术语表
| 文件 | 说明 |
|------|------|
| `data/glossary/it_terms.js` | 30 个 MVP 术语（6 语言）|
| `assets/js/glossary.js` | 弹窗控制器 |
| `assets/css/glossary.css` | 弹窗样式 |

### 7.3 内容语言包（4 科目 × 4 语言 = 16 文件）
| 科目 | en | vi | my | fr |
|------|----|----|----|----|
| SQL | `sql_en.js` (36) | `sql_vi.js` (36) | `sql_my.js` (36) | `sql_fr.js` (36) |
| IT Passport | `itpass_en.js` (85) | `itpass_vi.js` (85) | `itpass_my.js` (85) | `itpass_fr.js` (85) |
| SG | `sg_en.js` (44) | `sg_vi.js` (44) | `sg_my.js` (44) | `sg_fr.js` (44) |
| Java | `java_en.js` (115) | `java_vi.js` (115) | `java_my.js` (115) | `java_fr.js` (115) |
| Python | `python_en.js` (255) | `python_vi.js` (255) | `python_my.js` (255) | `python_fr.js` (255) |

总计：535 课 × en + 535 课 × vi + 535 课 × my + 535 课 × fr = 2140 条目

### 7.4 核心运行时代码
| 文件 | 说明 |
|------|------|
| `assets/js/content-i18n.js` | 内容翻译查找运行时 |
| `assets/js/app.js` | 课程加载、formatMarkdown、考试、UI 逻辑 |
| `assets/js/java_sandbox.js` | Java 沙盒 |
| `assets/js/python_sandbox.js` | Python 沙盒 |

## 8. 内容语言包覆盖统计（封口状态）

截至 `35773ce`：

| 科目 | en | vi | my | fr | 封口轮次 |
|------|----|----|----|----|---------|
| SQL | 36/36 | 36/36 | 36/36 | 36/36 | 第 7.15 / 7.14 🔒 |
| IT Passport | 85/85 | 85/85 | 85/85 | 85/85 | 第 8.4 / 8.7 🔒 |
| SG | 44/44 | 44/44 | 44/44 | 44/44 | 第 9.3 / 9.6 🔒 |
| Java | 115/115 | 115/115 | 115/115 | 115/115 | 第 10.3 / 10.6 🔒 |
| Python | 255/255 | 255/255 | 255/255 | 255/255 | 第 11.3 / 11.6 🔒 |
| **全科合计** | **535** | **535** | **535** | **535** | **已闭环 🔒** |

所有派生语言包（vi/my/fr）均使用 `ai-assisted-from-en-v1` 来源，标记为 `needsReview: true`。

## 9. 遗留观察项
1. vi/my/fr 为 AI 派生内容，未来建议组织母语人员抽样人工校对
2. en 基准包也标记了 `needsReview: true`，建议母语校对
3. Java 英文包中存在若干继承性 Markdown 表格（java:15/45/52/57/94/112），为非阻断低风险项
4. Python 英文包中 `**` / `**kwargs` 出现在非代码块中，经确认为 Python 语法，非 bold 缺陷
5. 术语表仅 30 个 MVP 词条，未覆盖全量 IT 术语
6. UI 多语言 key 化未完全覆盖（仍有次要 UI 未加 data-i18n）
7. 缅甸语（my-MM）字体显示依赖操作系统支持
8. 未做过完整浏览器端端到端抽查
9. 项目 git 分支管理尚未完善（当前一直在 main 直接工作）

## 10. 下一步建议
1. **项目级总审计** — 全面检查代码质量、加载性能、XSS 安全
2. **浏览器端端到端抽查** — 在真实浏览器中验证所有语言的学习内容显示
3. **Release 打包** — 准备可发布版本
4. **Web 公开版同步规划** — 与 `sql-learning-hub-web-public` 版本同步
5. **术语表扩展** — 从 30 MVP 扩展到更多 IT 术语
6. **UI 多语言补全** — 覆盖剩余次要 UI 元素
7. **静态资源压缩** — JS/CSS 压缩、缓存策略
8. **git 工作流优化** — 建立分支策略、PR 流程

## 11. 轮次历史摘要

| 轮次 | 范围 | commit |
|------|------|--------|
| 1-2.4 | UI 多语言基础设施、P0/P1 key 化、总审计 | - |
| 3-4.4 | 术语表 v1、Modal 弹窗、移动端适配、最终审计 | - |
| 7.1-7.15 | SQL en 包 + vi/my/fr 派生、formatMarkdown 升级 | `7.12/7.14` |
| 8.1-8.7 | IT Passport en + vi/my/fr 派生及审计 | `8.4.1/8.7` |
| 9.1-9.6 | SG en + vi/my/fr 派生及审计 | `9.3/9.6` |
| 10.1-10.6 | Java en + vi/my/fr 派生及审计 | `10.3/10.6` |
| 11.1-11.6 | Python en + vi/my/fr 派生及审计（全科闭环）| `11.3/11.6` |
