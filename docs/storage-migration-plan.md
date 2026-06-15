# Round 76.0 存储迁移 Dry-run 设计报告

## 目标
审计 localStorage keys，设计未来 schema migration，不执行迁移，不改数据。

## 设计方案
1. 当前 localStorage keys:
   - study-tools-mini-favorite-terms-v1
   - study-tools-mini-wrong-questions-v1
   - study-tools-mini-quiz-attempts-v1

2. 迁移策略:
   - 版本化 key（v1 → v2）
   - 提供迁移脚本（只读预览）
   - 支持回滚

3. 安全风险:
   - 不上传敏感数据
   - 迁移前创建快照

## 结论
DEFERRED → 设计完成，未来版本实施。
