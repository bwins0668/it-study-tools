# Round 82.0 长期维护文档报告

## 目标
创建 `docs/MAINTENANCE.md`，说明如何跑验证、如何发布、如何回滚、如何处理 Supabase、如何处理 Cloudflare Pages。

## 维护文档大纲

### 1. 如何跑验证
```bash
node tools/verify_release_ready.mjs
```

### 2. 如何发布
1. 更新 version.js
2. 更新 service-worker.js CACHE_NAME
3. 提交并推送
4. 等待 Cloudflare Pages 部署
5. 验证线上版本

### 3. 如何回滚
- Git 回滚：`git revert HEAD`
- Cloudflare Pages 回滚：在 Dashboard 点击"回滚"

### 4. 如何处理 Supabase
- 备份数据库（每天）
- 迁移脚本写在 `docs/supabase-migrations/`

### 5. 如何处理 Cloudflare Pages
- 查看部署日志
- 手动触发部署
- 回滚到之前版本

## 结论
PASS → 可实施，创建维护文档。
