# Java/Python 本地运行时安装说明

**Round 104.0 交付**：Java/Python 本地运行时安装和配置说明

## Windows 完整版

### 快速启动

1. 运行 `启动.bat`
2. 脚本自动检测 Python（优先内嵌版，然后系统 PATH）
3. 如果未找到 Python，显示错误提示并退出
4. 找到 Python 后，后台启动 `server.py`
5. 等待服务器就绪（检测端口 LISTENING）
6. 打开浏览器访问 `http://127.0.0.1:<port>/index.html`

### Java 运行环境

**要求**：JDK 21+（推荐 Eclipse Adoptium Temurin）

**安装步骤**：

1. 访问 https://adoptium.net/releases/
2. 下载 Windows x64 版本（.msi 安装包）
3. 安装时勾选 "Set JAVA_HOME variable"

**验证**：

```powershell
.\tools\check_local_runtimes.ps1
```

**如果系统安装了 JDK 但不在 `server.py` 的 `KNOWN_JDK_PATHS` 列表中**：

编辑 `server.py`，在 `KNOWN_JDK_PATHS` 中添加你的 JDK 路径：

```python
KNOWN_JDK_PATHS = [
    # ... 现有路径 ...
    r"C:\Your\Custom\JDK\Path\bin",  # 添加你的路径
]
```

### Python 运行环境

**要求**：Python 3.10+（推荐 Python 3.12）

**安装步骤**：

1. 访问 https://www.python.org/downloads/
2. 下载 Windows installer
3. 安装时勾选 "Add Python to PATH"

**验证**：

```powershell
python --version
```

### 常见问题

#### Q: Java 沙盒显示 "JDK 未找到"

**A**: 安装 JDK 或在 `server.py` 的 `KNOWN_JDK_PATHS` 中添加路径

#### Q: Python 执行报错

**A**: 检查 `server.py` 是否正在运行，或运行 `启动.bat`

#### Q: Web 公开版无法执行 Java/Python

**A**: Web 公开版需要本地服务器支持。请：
1. 启动 Windows 完整版的 `server.py`
2. 通过 `http://127.0.0.1:<port>` 访问（不能直接打开 `index.html`）

## Web 公开版

### 本地 API 服务器

Web 公开版通过 `fetch('/api/execute')` 调用本地 API。

如果需要 Web 公开版支持本地 Java/Python 执行，需要：
1. 启动 Windows 完整版的 `server.py`
2. 通过 `http://127.0.0.1:<port>` 访问（不能直接打开 `index.html`）

### Safe Mode

如果本地服务器未运行，Web 公开版显示 "Web 安全模式" 提示，不真实执行代码。

## 诊断脚本

### Windows 本地运行环境探测

```powershell
.\tools\check_local_runtimes.ps1
```

输出：
- Java 是否可用（`java -version`）
- Python 是否可用（`python --version`）
- 内嵌版运行时是否存在
- 本地服务器是否运行
- 端口是否开放

### Web 本地 API 服务器检测

```javascript
// 在浏览器控制台运行
fetch('/api/execute', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ language: 'python', code: 'print("hello")', stdin: '' })
}).then(r => r.json()).then(console.log)
```

## 当前状态（Round 104.0）

- [x] `switchJavaOutputTab` 函数已定义（Round 85.0）
- [x] `switchPythonOutputTab` 函数已定义（Round 85.0）
- [x] Windows 本地运行环境架构已文档化（Round 87.0）
- [x] 诊断脚本 `check_local_runtimes.ps1` 已创建（Round 87.0）
- [x] `server.py` 的 `KNOWN_JDK_PATHS` 已扩展（Round 88.0）
- [x] JDK 未找到时的错误消息已改进（Round 88.0）
- [x] Portable 打包脚本 `package_portable.ps1` 已创建（Round 103.0）

## 下一轮建议

- **Round 105.0**: Java/Python 执行超时与中断机制审计
- **Round 106.0**: Java/Python 安全边界审计
- **Round 107.0**: Java/Python 沙盒错误分类
- **Round 108.0**: Java/Python 历史记录本地保存设计
