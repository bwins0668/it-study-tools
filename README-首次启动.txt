╔══════════════════════════════════════════════════════════╗
║     Study Tools Portable v2026.8.0 — 首次启动指南      ║
╚══════════════════════════════════════════════════════════╝

📦 本包为独立便携版，无需安装即可运行。

🚀 启动方式：

  1. 双击运行 python/python.exe server.py
     或
     双击 Study-Tools.exe 快捷方式（如已创建）

  2. 浏览器自动打开 http://127.0.0.1:8080

  3. 首次启动会自动创建安装记录和用户数据目录：
     %LOCALAPPDATA%\StudyTools\

⚠️ 重要提示：

  • 请勿将本包放置于中文路径或需要管理员权限的目录
  • 用户数据保存在 %LOCALAPPDATA%\StudyTools\ 下
  • 更新包自动下载到 updates/staging/
  • 所有更新均经过 Ed25519 数字签名验证

📋 系统要求：

  • Windows 10/11 x64
  • 无需额外安装 Python、Node.js 或 Git
  • 内嵌 Python 3.12 运行时

🔐 安全特性：

  • Ed25519 签名验证（prod-key-2026-r42）
  • SHA-256 校验
  • 路径安全守卫
  • 自动回滚保护

📖 更多信息：

  项目仓库：https://github.com/bwins0668/it-study-tools
  版本：v2026.8.0 stable
