# Round 61.0 测试数据工厂报告

## 目标
生成非敏感 mock 数据，用于 Dashboard / export / import preview / sync validators，不写真实账号，不上传远端。

## 测试数据工厂设计

### 1. 数据结构
```javascript
// tools/test_data_factory.mjs
const mockData = {
  completedLessons: [1, 2, 3, 5, 8],
  quizResults: {
    'sql-basic': { score: 80, total: 10, date: '2026-06-15' },
    'java-basic': { score: 90, total: 10, date: '2026-06-14' }
  },
  wrongBook: [
    { questionId: 'q1', subject: 'sql', addedAt: '2026-06-10' }
  ],
  bookmarks: [
    { termId: 'term1', type: 'glossary', addedAt: '2026-06-10' }
  ],
  typingHistory: [
    { wpm: 30, accuracy: 95, date: '2026-06-15' }
  ],
  examHistory: [
    { score: 85, total: 100, date: '2026-06-15' }
  ],
  dashboardGoals: [
    { id: 'goal1', title: 'Complete SQL basics', target: 10, current: 5 }
  ]
};
```

### 2. 生成脚本功能
- 生成随机测试数据（可配置种子）
- 生成边界测试数据（空数据、最大数据）
- 生成损坏数据（测试错误处理）
- 导出为 JSON（用于 import preview 测试）

### 3. 使用场景
- Dashboard 回归测试
- 导出功能测试
- 导入预览测试
- 同步验证器测试

### 4. 安全注意
- 不包含真实用户名、邮箱、API key
- 不包含真实学习内容（使用占位符）
- 不上传到远端仓库

## 实施步骤
1. 创建 `tools/test_data_factory.mjs`
2. 实现数据生成逻辑
3. 添加 CLI 接口（`node test_data_factory.mjs --output mock.json`）
4. 测试：生成数据，验证格式

## Round 61.0 结论
PASS → 可实施，创建测试数据工厂脚本。
