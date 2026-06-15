# Round 60.0 本地诊断报告功能报告

## 目标
设计本地诊断报告功能，包含版本、缓存、浏览器、localStorage key counts、最近同步摘要，不包含敏感信息，可导出为 JSON 或文本。

## 设计方案

### 1. 诊断报告内容
```json
{
  "version": {
    "webVersion": "v2026.6.15-r60.0",
    "desktopVersion": "v2026.6.15-r60.0",
    "cacheName": "study-tools-web-v2026-6-15-r60-0"
  },
  "browser": {
    "userAgent": "Mozilla/5.0...",
    "language": "zh-CN",
    "onLine": true,
    "cookiesEnabled": true
  },
  "cache": {
    "serviceWorkerRegistered": true,
    "cacheStorage": {
      "study-tools-web-v2026-6-15-r60-0": {
        "keysCount": 15
      }
    }
  },
  "localStorage": {
    "study-tools-mini-favorite-terms-v1": 25,
    "study-tools-mini-wrong-questions-v1": 10,
    "study-tools-mini-quiz-attempts-v1": 50,
    "otherKeys": 3
  },
  "sync": {
    "lastSync": "2026-06-15T10:30:00Z",
    "syncEnabled": true,
    "pendingEvents": 0
  },
  "export": {
    "lastExport": "2026-06-14T08:00:00Z",
    "exportCount": 3
  },
  "safe": true
}
```

### 2. 安全设计
- **不包含**：API key、密码、token、session、cookie、个人身份信息
- **匿名化**：只显示 counts，不显示具体数据
- **可选导出**：用户主动点击"导出诊断报告"按钮

### 3. UI 设计
- 在工具抽屉添加"诊断报告"入口
- 点击后显示诊断信息（只读）
- 添加"导出为 JSON"按钮
- 添加"复制到剪贴板"按钮

### 4. 实现步骤
1. 创建 `assets/js/diagnostics.js`（Web 独有）
2. 添加诊断报告 UI（模态框）
3. 添加导出功能
4. 添加 i18n 键
5. 更新版本号

### 5. 代码修改范围
- **新增**：`assets/js/diagnostics.js`
- **修改**：`index.html`（添加诊断报告模态框）、`assets/js/app.js`（添加入口处理器）
- **i18n**：添加 `tools.diagnostics` 等键（4 语言）

## 实施优先级
1. 高：诊断报告数据收集、UI 显示
2. 中：导出功能、复制到剪贴板
3. 低：历史趋势（未来）

## 验证计划
- 检查诊断报告不包含敏感信息
- 检查导出 JSON 格式正确
- 检查多语言支持
- 检查移动端显示正常

## Round 60.0 结论
PASS → 可实施，输出设计方案。
建议实施为轻量级只读诊断功能。
