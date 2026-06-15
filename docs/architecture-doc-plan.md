# Round 63.0 项目架构文档整理报告

## 目标
创建 `docs/ARCHITECTURE.md`，说明模块、数据流、同步、安全边界、导出/导入预览。

## 架构文档大纲

### 1. 项目概述
- 项目名称：Study Tools (学习工具)
- 目标用户：IT 学习者（日语环境）
- 技术栈：纯前端（HTML/JS/CSS），Supabase 后端

### 2. 模块结构
```
assets/js/
├── app.js           # 主应用逻辑、路由、UI 控制
├── version.js       # 版本元数据
├── i18n-ui-dict.js # 多语言翻译字典
├── export-data.js   # 学习数据导出
├── import-preview.js # 备份导入预览（只读）
├── sync-engine.js   # 数据同步引擎
├── dashboard.js     # 学习统计仪表盘
├── glossary.js      # 术语库
├── coding-typing.js # 编程打字练习
└── ...

data/
├── lessons.js       # 课程数据
├── quiz.js          # 测验数据
└── ...
```

### 3. 数据流
```
User Action → localStorage → Sync Engine → Supabase
                ↑                         ↓
                └──── Dashboard ←───────┘
```

### 4. 同步策略
- **触发**：用户登录、手动点击同步、定时同步
- **方向**：双向同步（local → remote, remote → local）
- **冲突处理**：以最新时间戳为准
- **数据安全**：只同步学习数据，不同步密码/API key

### 5. 安全边界
- **前端**：不存储密码、API key、session
- **导出**：递归过滤敏感字段
- **导入预览**：只读，不写入 localStorage
- **同步**：只访问白名单表（learning_progress, quiz_results, etc.）

### 6. 导出/导入预览
- **导出结构**：schemaVersion, exportedAt, appVersion, source, warnings, sections
- **导入预览**：解析备份 → 扫描敏感字段 → 显示预览 → 用户决定是否导入

### 7. 多语言支持
- 4 种语言：zh-CN, ja-JP, en-US, ko-KR
- 翻译文件：`i18n-ui-dict.js`
- 运行时切换：不刷新页面

### 8. 性能优化
- Service Worker 缓存静态资源
- 术语库分块加载（glossary-chunks/）
- 图片优化（WebP）

## 文档维护
- 随代码更新
- 在重大变更时更新
- 包含示例代码和图表（未来）

## Round 63.0 结论
PASS → 可实施，创建项目架构文档。
