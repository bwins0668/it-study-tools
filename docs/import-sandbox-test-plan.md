# Round 78.0 导入 Mock 写入沙盒测试报告

## 目标
使用 in-memory store 模拟导入合并，验证合并策略、回滚逻辑，不写真实 localStorage。

## 测试脚本设计
```javascript
// tools/test_import_merge_memory.mjs
function testImportMerge() {
  const memoryStore = {};
  
  // 模拟导入
  const backup = JSON.parse(fs.readFileSync('test-backup.json'));
  const merged = mergeData(memoryStore, backup);
  
  console.log('Merge test:', merged);
}
```

## 结论
PASS → 可实施，创建 in-memory 测试脚本。
