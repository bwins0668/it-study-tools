# Windows 本地离线运行环境架构文档

**Round 87.0 产出**：Windows 完整版 Java/Python 本地运行链路说明

## 本地运行环境架构

### 启动流程

1. **运行 `启动.bat`**（或手动运行 `server.py`）
2. 脚本自动检测 Python 运行环境：
   - 优先使用内嵌版：`python\python.exe`
   - 其次检测系统 PATH 中的 `python.exe` / `python3.exe`
   - 最后扫描常见安装路径（如 `C:\Python312` 等）
3. 如果未找到 Python，显示错误提示并退出
4. 找到 Python 后，后台启动 `server.py <port>`
5. 等待服务器就绪（检测端口 LISTENING）
6. 打开浏览器访问 `http://127.0.0.1:<port>/index.html`

### 端口

- 默认端口：**8765**
- 可在 `启动.bat` 中修改 `set "PORT=8765"`
- 或手动运行 `python server.py <port>`

### Java 运行环境检测

`server.py` 中的 `KNOWN_JDK_PATHS` 列表：

```python
KNOWN_JDK_PATHS = [
    r"C:\Program Files\Eclipse Adoptium\jdk-26.0.1.8-hotspot\bin",
    r"C:\Program Files\Eclipse Adoptium\jdk-21.0.5.11-hotspot\bin",
    r"C:\Program Files\Microsoft\jdk-21.0.5.11\bin",
    r"C:\Program Files\Java\jdk-21\bin",
    r"C:\Program Files\Java\jdk-17\bin",
    r"C:\Program Files\Amazon Corretto\jdk21\bin",
    r"C:\Program Files\Amazon Corretto\jdk17\bin",
]
```

如果系统安装了 JDK 但不在上述路径，需要手动添加到 `KNOWN_JDK_PATHS`。

### Python 运行环境检测

- 使用系统 Python（由 `启动.bat` 检测）
- 或内嵌版 Python（`python\python.exe`）

### Web 公开版配合本地服务器

Web 公开版 `WebCodeRunner` 通过 `fetch('/api/execute')` 调用本地 API。

如果需要 Web 公开版支持本地 Java/Python 执行，需要：
1. 启动 Windows 完整版的 `server.py`
2. 通过 `http://127.0.0.1:<port>` 访问 Web 公开版（不能直接双击打开 `index.html`）

## 诊断脚本

### Windows 本地运行环境检测

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

## 常见问题

### Q1: Java 沙盒显示 `switchJavaOutputTab is not defined`

**A**: 已在 Round 85.0 修复。如果仍出现，请强制刷新浏览器（Ctrl+F5）清除缓存。

### Q2: Java/Python 执行按钮报错

**可能原因**：
1. `server.py` 未启动
2. JDK/Python 未安装或不在预期路径
3. 端口被占用

**解决方法**：
1. 运行 `启动.bat`
2. 检查 JDK 是否安装，路径是否在 `KNOWN_JDK_PATHS` 中
3. 运行 `tools\check_local_runtimes.ps1` 诊断

### Q3: Web 公开版无法执行 Java/Python

**A**: Web 公开版需要本地服务器支持。请：
1. 启动 Windows 完整版的 `server.py`
2. 通过 `http://127.0.0.1:<port>` 访问（不能直接打开 `index.html`）

## 当前状态（Round 87.0）

- [x] `switchJavaOutputTab` 函数已定义（Round 85.0）
- [x] `switchPythonOutputTab` 函数已定义（Round 85.0）
- [x] Windows 本地运行环境架构已文档化
- [x] 诊断脚本 `check_local_runtimes.ps1` 已创建
- [ ] `server.py` 的 `KNOWN_JDK_PATHS` 可能需要根据用户实际安装路径扩展
- [ ] Web 公开版 Safe Mode 提示可以更清晰

## 下一轮建议

- **Round 88.0**: 修复 Windows Java 本地离线执行链（扩展 `KNOWN_JDK_PATHS`、改进错误提示）
- **Round 89.0**: 修复 Windows Python 本地离线执行链
- **Round 90.0**: 统一 Java/Python 执行适配器
