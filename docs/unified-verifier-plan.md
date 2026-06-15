# Round 62.0 验证器统一入口报告

## 目标
把现有 validators 聚合到一个命令，输出统一 PASS/FAIL 表，方便未来 release。

## 统一验证器设计

### 1. 现有验证器
- `tools/verify_glossary.js`
- `tools/verify_coding_typing.js`
- `tools/verify_wrong_book_schema.js`
- `tools/verify_wrong_book_sync.js`
- `tools/smoke_mobile.mjs`
- `tools/smoke_dashboard.mjs`
- `tools/smoke_export_import_preview.mjs`
- `tools/smoke_core_routes.mjs`
- `tools/verify_release_ready.mjs`
- `tools/verify_sync_boundaries.mjs`
- `tools/verify_no_sensitive_sync.mjs`
- `tools/verify_content_integrity.mjs`
- `tools/verify_i18n_coverage.mjs`
- `tools/verify_routes_integrity.mjs`
- `tools/scan_sensitive_files.mjs`

### 2. 统一入口脚本
```javascript
// tools/verify_all.mjs
import { runAllVerifiers } from './verify_all.mjs';

const results = await runAllVerifiers();

console.log('=== Unified Verification Report ===');
results.forEach((r) => {
  console.log(`${r.pass ? '✓' : '✗'} ${r.name}: ${r.details}`);
});

console.log(`\nTotal: ${results.filter(r => r.pass).length}/${results.length} PASS`);
```

### 3. 输出格式
```
=== Unified Verification Report ===
✓ Glossary validator: PASS
✓ Coding typing validator: PASS
✗ Wrong book schema: FAIL (2 errors)
✓ Sync boundaries: PASS
...
Total: 13/15 PASS
```

### 4. 集成到发布流程
- 在 `tools/release_checklist.mjs` 中调用
- 在手动发布前运行
- 在 CI/CD 中运行（未来）

## 实施步骤
1. 创建 `tools/verify_all.mjs`
2. 集成所有现有验证器
3. 统一输出格式
4. 测试：运行所有验证器

## Round 62.0 结论
PASS → 可实施，创建统一验证器入口。
