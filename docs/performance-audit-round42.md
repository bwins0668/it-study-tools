# Round 42.0 性能与加载体验审计

## 审计日期

2026-06-16

## 首屏加载审计

### HTML 解析阻塞资源

- `assets/css/index.css` — 渲染阻塞（必需）
- `assets/css/light-theme.css` — 渲染阻塞（必需）
- `assets/js/app.js` — 可能阻塞（建议 `defer`）

### 脚本加载顺序

所有 `<script>` 标签在 `<body>` 末尾（1650+ 行），不阻塞渲染。✓

### 建议优化

1. **添加 `defer` 到非关键 JS**
   - `export-data.js` — 仅用户点击时用到，可 `defer`
   - `import-preview.js` — 仅用户点击时用到，可 `defer`

2. **Service Worker 注册延迟**
   - 当前在 `index.html` 底部注册，OK
   - 建议：添加 `pagehide` 事件确保 SW 更新

3. **Glossary 数据分块**
   - `data/glossary.js` 可能较大
   - 建议：首屏仅加载 A-C，滚动时懒加载其余

## 资源体积审计

### JS 文件

| 文件 | 估算大小 | 优化建议 |
|------|----------|------------|
| app.js | ~150KB | 拆分：SQL/IT Passport/Java/Python 按需加载 |
| dashboard.js | ~30KB | OK |
| export-data.js | ~15KB | OK (defer) |
| import-preview.js | ~12KB | OK (defer) |
| i18n-ui-dict.js | ~60KB | 按语言分文件？ |

### CSS 文件

| 文件 | 估算大小 | 优化建议 |
|------|----------|------------|
| index.css | ~250KB | 非常大！建议拆分或压缩 |
| light-theme.css | ~5KB | OK |

### 数据文件

| 文件 | 估算大小 | 优化建议 |
|------|----------|------------|
| lessons.js | ~200KB | 考虑分章懒加载 |
| glossary.js | ~300KB | 必须分块！ |
| java_lessons.js | ~150KB | OK |
| python_lessons.js | ~100KB | OK |

## Service Worker 缓存审计

### CORE_ASSETS（当前）

```javascript
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./app.ico",
  // ... icons
];
```

✓ 核心资源已被缓存

### 问题

- `CACHE_NAME` 每次版本更新会创建新缓存
- 旧缓存会在 `activate` 事件中清理 ✓
- 但没有预缓存数据文件（lessons.js 等）

### 建议

1. **预缓存关键数据文件**
   - `data/lessons.js`（SQL 课程）
   - `data/glossary.js`（术语表）

2. **动态缓存策略**
   - API 请求：`network-first`
   - 静态资源：`cache-first`

## Glossary 分块方案

### 当前问题

`data/glossary.js` 可能非常大（300KB+），导致：
- 首屏加载慢
- 搜索卡顿
- 内存占用高

### 建议方案

1. **按首字母分块**
   ```
   data/glossary-a-c.js
   data/glossary-d-f.js
   ...
   ```

2. **首屏仅加载 A-C**
   - 监听滚动/搜索事件
   - 动态加载其他块

3. **或使用 IndexedDB**
   - 更适合大数据量
   - 支持索引搜索

## JS/CSS 加载顺序验证

### 当前顺序（index.html 1650+ 行）

```html
<script src="assets/js/i18n.js" defer></script>
<script src="assets/js/i18n-ui-dict.js" defer></script>
<script src="assets/js/version.js"></script>
<script src="assets/js/app.js"></script>
<script src="assets/js/dashboard.js"></script>
...
```

✓ 顺序合理：`i18n` → `app.js` → `dashboard.js` → 其他

### 建议

- 为所有 `<script>` 添加 `defer`（除了 `app.js` 可能需要同步）

## 性能预算

| 指标 | 当前 | 目标 | 状态 |
|------|------|------|------|
| First Contentful Paint | ~1.5s | <1.5s | ⚠️ 需测试 |
| Time to Interactive | ~2.5s | <3s | ⚠️ 需测试 |
| Total Blocking Time | ? | <300ms | ⚠️ 需测试 |
| CSS 文件大小 | ~255KB | <100KB | ❌ 需优化 |
| JS 文件大小 | ~270KB | <200KB | ⚠️ 可优化 |
| 离线可用 | ✓ | ✓ | ✓ |

## 结论

### 必须优化

1. **`index.css` 过大（~250KB）**
   - 建议：移除未使用的 CSS
   - 或使用 CSS 压缩

2. **`glossary.js` 过大（~300KB）**
   - 建议：分块或改用 IndexedDB

### 建议优化

1. 为 `export-data.js` 和 `import-preview.js` 添加 `defer`
2. 预缓存关键数据文件
3. 添加性能监控（Real User Metrics）

## 下一步

- Round 42.1: 拆分 `index.css`
- Round 42.2: Glossary 数据分块
- Round 42.3: 添加资源预加载（`<link rel="preload">`）

---
