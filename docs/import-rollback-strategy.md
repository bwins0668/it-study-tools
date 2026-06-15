# Round 47.0 导入前快照与回滚策略设计

## 目标

为未来的"真实导入"功能设计安全机制：
1. 导入前自动快照
2. 导入失败自动回滚
3. 用户手动回滚
4. 快照过期策略
5. 敏感字段排除

## 1. 导入前快照设计

### 快照触发时机

在用户点击"确认导入"后、实际写入 localStorage 前：

```
用户点击"确认导入"
  ↓
显示二次确认对话框（列出将导入/覆盖的数据）
  ↓
用户点击"确认"
  ↓
【快照】保存当前 localStorage 关键 key
  ↓
【导入】合并数据到 localStorage
  ↓
【验证】验证导入后数据完整性
  ↓
成功 → 清除快照（可选）
失败 → 自动回滚
```

### 快照存储位置

**方案 A：localStorage（推荐）**

```javascript
// 快照 key
const SNAPSHOT_KEY = 'study_tools_import_snapshot';
const SNAPSHOT_META_KEY = 'study_tools_import_snapshot_meta';

// 保存快照
function saveSnapshot() {
  const snapshot = {
    timestamp: new Date().toISOString(),
    version: '1.0',
    keys: {}
  };

  // 备份所有可导入的 key
  const keysToBackup = [
    'study_tools_completed_lessons',
    'study_tools_quiz_results',
    'study_tools_wrong_book',
    'study_tools_bookmarks',
    'study_tools_typing_history',
    'study_tools_exam_history',
    'study_tools_dashboard_goals'
  ];

  keysToBackup.forEach(key => {
    const val = localStorage.getItem(key);
    if (val) snapshot.keys[key] = JSON.parse(val);
  });

  localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshot));
  localStorage.setItem(SNAPSHOT_META_KEY, JSON.stringify({
    timestamp: snapshot.timestamp,
    size: JSON.stringify(snapshot).length
  }));
}
```

**方案 B：sessionStorage（临时）**

- 优点：关闭标签页后自动清除
- 缺点：无法跨 session 回滚

**推荐**：方案 A（localStorage），带过期策略。

### 快照大小限制

- 警告：快照 > 5MB
- 阻止：快照 > 10MB（建议用户先清理数据）

---

## 2. 回滚策略设计

### 自动回滚（导入失败时）

```javascript
function importWithRollback(backupData) {
  try {
    // 1. 保存快照
    saveSnapshot();

    // 2. 执行导入
    const result = mergeAndImport(backupData);

    // 3. 验证
    if (!validateImport(result)) {
      throw new Error('Import validation failed');
    }

    // 4. 成功
    showSuccess('Import successful');
    // 可选：清除快照
    // clearSnapshot();
  } catch (err) {
    // 5. 失败 → 自动回滚
    rollbackSnapshot();
    showError(`Import failed, rolled back: ${err.message}`);
  }
}
```

### 手动回滚（用户触发）

在"学习统计"页面添加"回滚到上次导入前"按钮：

```html
<button id="rollback-btn" style="display:none;">
  ⏪ 回滚到导入前
</button>
```

```javascript
// 检查是否有可用快照
function checkSnapshot() {
  const meta = localStorage.getItem('study_tools_import_snapshot_meta');
  if (meta) {
    const { timestamp } = JSON.parse(meta);
    const ageMs = Date.now() - new Date(timestamp).getTime();
    const ageDays = ageMs / 86400000;

    if (ageDays <= 7) { // 7 天内可回滚
      document.getElementById('rollback-btn').style.display = 'block';
    }
  }
}

function rollbackSnapshot() {
  const snapshotStr = localStorage.getItem('study_tools_import_snapshot');
  if (!snapshotStr) {
    showError('No snapshot available');
    return;
  }

  const snapshot = JSON.parse(snapshotStr);

  // 恢复所有 key
  Object.keys(snapshot.keys).forEach(key => {
    localStorage.setItem(key, JSON.stringify(snapshot.keys[key]));
  });

  showSuccess('Rollback successful');
  clearSnapshot();
}
```

---

## 3. 快照过期策略

### 自动过期

- **7 天**：快照超过 7 天自动清除
- **导入成功**：可选保留或清除
- **新快照**：覆盖旧快照

```javascript
function clearExpiredSnapshots() {
  const metaStr = localStorage.getItem('study_tools_import_snapshot_meta');
  if (!metaStr) return;

  const { timestamp } = JSON.parse(metaStr);
  const ageMs = Date.now() - new Date(timestamp).getTime();
  const ageDays = ageMs / 86400000;

  if (ageDays > 7) {
    clearSnapshot();
    console.log('[Import] Cleared expired snapshot');
  }
}
```

### 手动清除

在"设置"页面添加"清除导入快照"按钮。

---

## 4. 敏感字段排除策略

### 快照时排除

```javascript
function saveSnapshot() {
  const snapshot = { /* ... */ };

  // 排除敏感字段
  const SENSITIVE_KEYS = [
    'study_tools_ai_provider',
    'study_tools_gemini_api_key',
    'study_tools_settings' // 可能包含 API key
  ];

  SENSITIVE_KEYS.forEach(key => {
    delete snapshot.keys[key];
  });

  localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshot));
}
```

### 导入时排除

（已在 Round 33.0 `export-data.js` 实现）

---

## 5. 导入合并策略（回顾）

基于 Round 34.0 `docs/backup-import-strategy.md`：

| 数据类型 | 合并策略 | 理由 |
|---------|---------|-------|
| completedLessons | Union（合并去重） | 保留所有学习记录 |
| quizResults | 按 key 去重 | 避免重复测验记录 |
| wrongBook | 按 key 去重 | 错题本需要准确 |
| bookmarks | 按 key 去重 | 收藏需要准确 |
| typingHistory | 按 key 去重 | 打字记录需要准确 |
| examHistory | 按 key 去重 | 考试记录需要准确 |
| dashboardGoals | 覆盖（opt-in） | 目标是个人的 |
| userSettings | 覆盖（opt-in） | 设置是个人的 |
| syncSummary | 不导入 | 同步状态不应导入 |

---

## 6. 实现优先级

### P0（必须）

1. ✅ 导入前快照保存
2. ✅ 自动回滚（导入失败时）
3. ✅ 快照过期清除

### P1（重要）

1. ⚠️ 手动回滚 UI
2. ⚠️ 快照大小检查
3. ⚠️ 二次确认对话框

### P2（可选）

1. 💡 快照差异对比（导入前 vs 导入后）
2. 💡 选择性回滚（只回滚某些 key）
3. 💡 快照导出（备份快照）

---

## 7. 安全约束

### 不自动导入

- 默认关闭导入功能
- 需要用户手动二次确认
- 不得自动执行导入

### 不上传快照

- 快照仅保存在本地 localStorage
- 不上传到 Supabase
- 不导出到备份文件

### 不输出敏感信息

- 快照内容不输出到 console（生产环境）
- 回滚日志不包含敏感字段

---

## 8. 下一步

1. **Round 47.1**：实现快照保存/恢复逻辑
2. **Round 47.2**：实现自动回滚
3. **Round 47.3**：实现手动回滚 UI
4. **Round 47.4**：实现快照过期清除

---

## 9. 测试计划

### 单元测试

```javascript
// tools/test_import_snapshot.mjs
- 测试快照保存
- 测试快照恢复
- 测试自动回滚
- 测试过期清除
```

### E2E 测试

```javascript
// tools/test_import_rollback_e2e.mjs
- 模拟导入失败 → 验证自动回滚
- 模拟用户手动回滚 → 验证数据恢复
- 模拟快照过期 → 验证自动清除
```

---

**文档状态**：设计完成，待实现  
**预计实现轮次**：Round 47.1 ~ 47.4
