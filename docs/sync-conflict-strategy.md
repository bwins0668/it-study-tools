# Round 79.0 同步冲突策略文档报告

## 目标
文档化 learning_progress / quiz / wrong_book / bookmarks / typing / exam 的冲突策略，不改 sync-engine。

## 冲突策略

### 1. learning_progress
- 以最新时间戳为准
- 服务器端优先（如果用户主动同步）

### 2. quiz_results
- 保留所有记录（不覆盖）
- 按日期排序

### 3. wrong_book
- 合并数组（去重）
- 以最新添加时间为准

### 4. bookmarks
- 合并数组（去重）
- 保留所有书签

### 5. typing_sessions
- 保留所有记录
- 按日期排序

### 6. exam_sessions
- 保留所有记录
- 按日期排序

## 实施
无需修改代码，策略已由 sync-engine 实现。

## 结论
PASS → 冲突策略已文档化。
