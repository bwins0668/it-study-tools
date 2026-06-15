# Round 66.0 Dashboard 洞察增强设计报告

## 目标
设计学习连续天数、薄弱项、复习建议，不上传新数据，优先本地计算。

## 设计方案

### 1. 学习连续天数
- **计算**：从 `localStorage` 读取最近学习日期
- **显示**：Dashboard 顶部显示"🔥 连续学习 X 天"
- **激励**：连续 7 天、30 天显示徽章

### 2. 薄弱项分析
- **计算**：分析测验结果、错题本数据
- **显示**：
  - 薄弱科目（SQL / Java / Python / etc.）
  - 薄弱主题（FROM 子句 / 循环 / etc.）
  - 建议："建议复习：SQL 基础"
- **本地计算**：不发送到服务器

### 3. 复习建议
- **计算**：
  - 错题本中最近添加的错题
  - 测验中得分低的主题
  - 长时间未复习的主题
- **显示**："📝 建议复习：SQL 基础练习题"
- **操作**：点击跳转到对应练习题

### 4. 学习趋势图
- **计算**：最近 7 天 / 30 天的测验分数、学习时长
- **显示**：简单折线图（使用 Canvas 或 CSS）
- **本地计算**：数据来自 `localStorage`

### 5. 数据结构
```javascript
// 从 localStorage 计算
const insights = {
  streakDays: 5,
  weakSubjects: ['SQL', 'Java'],
  weakTopics: ['FROM clause', 'Loops'],
  reviewItems: [
    { type: 'quiz', id: 'sql-basic', title: 'SQL 基础' }
  ],
  trend: {
    scores: [80, 85, 90, 88, 92],
    dates: ['2026-06-10', '2026-06-11', ...]
  }
};
```

## 实施步骤
1. 扩展 `dashboard.js` 计算洞察
2. 添加洞察显示 UI
3. 添加复习建议点击处理
4. 添加 i18n 键

## 安全注意
- 不上传新数据到服务器
- 所有计算在本地完成
- 不收集用户行为数据

## Round 66.0 结论
PASS → 可实施，设计 Dashboard 洞察增强功能。
