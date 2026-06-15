# Round 56.0 i18n 覆盖率自动化报告

## 目标
自动检查 zh-CN / ja-JP / en-US / ko-KR key 覆盖，检查 raw key、undefined、翻訳中。

## 自动化脚本设计

### 1. 检查内容
- **覆盖检查**：确保 4 种语言都有相同的 key
- **Raw key 检查**：确保 UI 不显示 i18n key（如 `tools.dashboard`）
- **Undefined 检查**：确保没有 `undefined` 或 `null` 翻译
- **翻訳中检查**：检查是否有"翻訳中"、"翻译中"、"Translating..."等占位符

### 2. 脚本功能
```javascript
// tools/verify_i18n_runtime.mjs
async function verifyI18N() {
  // 1. Load i18n-ui-dict.js
  // 2. Check all keys exist in 4 languages
  // 3. Check no raw keys in HTML/JS
  // 4. Output report
}
```

### 3. 集成到发布流程
- 在 `tools/verify_release_ready.mjs` 中调用
- 在 CI/CD 中添加（未来）
- 在开发模式下显示警告（console.warn）

### 4. 修复建议
- 自动修复：添加缺失的 key（从 zh-CN 复制）
- 手动修复：标记需要翻译的 key

## 实施步骤
1. 创建 `tools/verify_i18n_runtime.mjs`
2. 集成到 `verify_release_ready.mjs`
3. 测试：故意添加错误，验证脚本能捕获

## 预期输出
```
=== i18n Coverage Report ===
✓ zh-CN: 1250 keys
✓ ja-JP: 1248 keys (missing: 2)
✗ en-US: 1200 keys (missing: 50)
✓ ko-KR: 1250 keys
⚠ 3 raw keys found in HTML
⚠ 2 "翻訳中" placeholders found
```

## Round 56.0 结论
PASS → 可实施，创建自动化脚本。
