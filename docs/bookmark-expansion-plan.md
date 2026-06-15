# Round 54.0 收藏体系扩展设计报告

## 目标
设计 lesson / glossary_term bookmark 的 UI + sync 方案，不新增 Supabase 表。

## 设计方案

### 1. 当前 bookmark 结构
- `bookmarks` 表已有 `type` 字段（'glossary'）
- 可扩展支持 `type: 'lesson'`

### 2. Lesson bookmark UI
- 在课程页面添加"收藏"按钮（星形图标）
- 已收藏显示实心星，未收藏显示空心星
- 点击切换收藏状态
- 工具抽屉添加"收藏课程"入口

### 3. Glossary term bookmark UI
- 当前已有术语收藏功能
- 优化：添加文件夹/标签组织

### 4. 同步方案
- `bookmarks` 表已支持多类型
- sync-engine 已同步 `bookmarks` 表
- 无需修改同步协议

### 5. 数据结构扩展
```javascript
// bookmarks 表新增 type 值
type: 'glossary' | 'lesson' | 'quiz'

// localStorage 结构
bookmarks: {
  glossary: [termId1, termId2],
  lessons: [lessonId1, lessonId2],
  quiz: [quizId1]
}
```

## 实施步骤
1. 扩展 `bookmarks` 表 `type` 字段约束（Supabase）
2. 添加 lesson bookmark UI
3. 扩展 sync-engine 处理 lesson bookmarks
4. 添加"收藏课程"入口到工具抽屉

## 风险
- P1: 需要 Supabase 表修改（需迁移）
- P2: 同步冲突处理（bookmarks 去重）

## Round 54.0 结论
DEFERRED → 设计方案完整，需要 Supabase 表修改，建议在稳定版本后实施。
