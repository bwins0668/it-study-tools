# Round 58.0 Windows Portable 打包流程自动化报告

## 目标
自动生成 Portable ZIP、校验必需文件、校验禁入文件、生成 SHA256、生成中文 Release 摘要。

## 自动化脚本设计

### 1. 打包脚本功能
```bash
# tools/package_portable.mjs
function packagePortable() {
  // 1. 读取 version.js 获取版本号
  // 2. 创建临时目录
  // 3. 复制必需文件（index.html, assets/, data/, etc.）
  // 4. 排除禁入文件（.git, .bak, node_modules, etc.）
  // 5. 生成 ZIP
  // 6. 计算 SHA256
  // 7. 生成 Release 摘要（中文）
}
```

### 2. 校验脚本功能
```bash
# tools/verify_portable.mjs
function verifyPortable(zipPath) {
  // 1. 检查必需文件存在
  const required = [
    'index.html',
    'assets/js/app.js',
    'assets/js/version.js',
    'assets/css/index.css',
    'data/lessons.js'
  ];
  
  // 2. 检查禁入文件不存在
  const forbidden = [
    '.git',
    '.bak',
    'node_modules',
    '.env',
    '*.log'
  ];
  
  // 3. 计算 SHA256 并对比
  // 4. 输出校验报告
}
```

### 3. Release 摘要生成
```markdown
# Study Tools Portable v2026.6.15-r58.0

## 文件信息
- 文件名：Study-Tools-Portable-v2026.6.15-r58.0.zip
- 大小：302,693,087 字节
- SHA256：d538da214cdb883392f5236aa3c9c05b88876b9fde3e07ffb4717293329fbb6c
- 文件数：1819

## 包含内容
- 完整学习工具（HTML/JS/CSS）
- 课程数据（SQL/Java/Python/IT Passport/SG）
- 术语库（中日英韩）
- 打字练习数据

## 使用方法
1. 解压 ZIP 到任意目录
2. 双击 index.html 打开
3. 开始学习！

## 校验
请使用以下命令校验 SHA256：
```bash
certutil -hashfile "Study-Tools-Portable-v2026.6.15-r58.0.zip" SHA256
```
```

## 实施步骤
1. 创建 `tools/package_portable.mjs`
2. 创建 `tools/verify_portable.mjs`
3. 测试：打包当前版本，验证 ZIP
4. 集成到发布流程（手动运行或 CI/CD）

## 依赖
- Node.js 内置模块：`fs`, `path`, `crypto`, `child_process`
- 可能需要：`archiver` (ZIP 生成) 或系统 `zip` 命令

## Round 58.0 结论
PASS → 可实施，创建自动化脚本。
