# Round 81.0 Release Package 复核报告

## 目标
复核 Windows Portable、Web deployment、GitHub assets、Release notes、SHA、禁入文件。

## 复核清单

### 1. Windows Portable
- [ ] ZIP 文件存在
- [ ] SHA256 匹配
- [ ] 必需文件齐全
- [ ] 禁入文件 0

### 2. Web Deployment
- [ ] 线上版本正确
- [ ] CACHE_NAME 匹配
- [ ] 所有资源可访问

### 3. GitHub Assets
- [ ] Release notes 完整
- [ ] ZIP 已上传
- [ ] SHA256 在 Release notes 中

### 4. 禁入文件检查
- [ ] 无 .bak 文件
- [ ] 无 .log 文件
- [ ] 无敏感文件

## 结论
TODO → 每次发布前运行此复核清单。
