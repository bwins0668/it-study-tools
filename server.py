#!/usr/bin/env python3
"""
Study Tools - Python Server
Serves static files and handles Java code execution via /runjava endpoint.
Replaces Study-Tools.exe for Java execution support.

Usage: python server.py [port]
Default port: 8080
"""

import sys
import os
import json
import subprocess
import tempfile
import threading
import webbrowser
import time
import re
import urllib.request
from http.server import HTTPServer, SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote

# The portable embedded Python uses an isolated ._pth file and does not add the
# script directory to sys.path automatically. Add it before importing modules
# shipped beside server.py.
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
if APP_ROOT not in sys.path:
    sys.path.insert(0, APP_ROOT)

from study_ai import (
    LearningStore,
    ServiceError,
    build_tutor_messages,
    call_provider,
    generate_question,
    provider_status,
    translate_items,
)

# Reconfigure standard output and error to use UTF-8 to prevent UnicodeEncodeError on Windows console
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
LEARNING_STORE = LearningStore(os.path.join(APP_ROOT, "data", "study_ai.db"))

# Known JDK bin paths to search
KNOWN_JDK_PATHS = [
    r"C:\Program Files\Eclipse Adoptium\jdk-26.0.1.8-hotspot\bin",
    r"C:\Program Files\Eclipse Adoptium\jdk-21.0.5.11-hotspot\bin",
    r"C:\Program Files\Microsoft\jdk-21.0.5.11\bin",
    r"C:\Program Files\Java\jdk-21\bin",
    r"C:\Program Files\Java\jdk-17\bin",
    r"C:\Program Files\Amazon Corretto\jdk21\bin",
    r"C:\Program Files\Amazon Corretto\jdk17\bin",
]

def find_java_bin(exe_name):
    """Find javac.exe or java.exe in known JDK paths."""
    # 0. Check local embedded JDK directory first
    app_root = os.path.dirname(os.path.abspath(__file__))
    local_jdk_root = os.path.join(app_root, "jdk")
    if os.path.isdir(local_jdk_root):
        for root, dirs, files in os.walk(local_jdk_root):
            if exe_name in files:
                return os.path.join(root, exe_name)

    # Check PATH first
    for path_dir in os.environ.get("PATH", "").split(os.pathsep):
        candidate = os.path.join(path_dir, exe_name)
        if os.path.isfile(candidate):
            return candidate
    
    # Check known JDK paths
    for jdk_dir in KNOWN_JDK_PATHS:
        candidate = os.path.join(jdk_dir, exe_name)
        if os.path.isfile(candidate):
            return candidate
    
    # Search Program Files
    for base in [r"C:\Program Files", r"C:\Program Files (x86)"]:
        for sub in ["Eclipse Adoptium", "Java", "Microsoft", "Amazon Corretto"]:
            search_dir = os.path.join(base, sub)
            if os.path.isdir(search_dir):
                for root, dirs, files in os.walk(search_dir):
                    if exe_name in files:
                        return os.path.join(root, exe_name)
    return None

def extract_class_name(code):
    """Extract public class name from Java source code."""
    # Strip comments to prevent false matching
    clean_code = re.sub(r'/\*[\s\S]*?\*/', '', code)
    clean_code = re.sub(r'//.*', '', clean_code)
    
    m = re.search(r'public\s+class\s+(\w+)', clean_code)
    if m:
        return m.group(1)
    m = re.search(r'class\s+(\w+)', clean_code)
    if m:
        return m.group(1)
    return "Main"

def run_java_code(code, stdin_data=""):
    """Compile and run Java code, return dict with compileError, runtimeError, output, executionTimeMs."""
    javac = find_java_bin("javac.exe")
    java_exe = find_java_bin("java.exe")
    
    not_found_msg = "❌ javac not found. Please install JDK.\nSearched:\n" + "\n".join(KNOWN_JDK_PATHS)
    if not javac:
        return {"compileError": not_found_msg, "runtimeError": "", "output": "", "executionTimeMs": None}
    if not java_exe:
        return {"compileError": "❌ java.exe not found.", "runtimeError": "", "output": "", "executionTimeMs": None}
    
    class_name = extract_class_name(code)
    
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as temp_dir:
        java_file = os.path.join(temp_dir, f"{class_name}.java")
        
        with open(java_file, 'w', encoding='utf-8') as f:
            f.write(code)
        
        # Compile
        t0 = time.time()
        try:
            compile_result = subprocess.run(
                [javac, "-encoding", "UTF-8", java_file],
                capture_output=True,
                text=True,
                encoding='utf-8',
                errors='replace',
                timeout=15,
                cwd=temp_dir
            )
        except subprocess.TimeoutExpired:
            return {"compileError": "⏱️ Compilation timed out (>15s).", "runtimeError": "", "output": "", "executionTimeMs": None}
        except Exception as e:
            return {"compileError": f"❌ Compilation exception: {e}", "runtimeError": "", "output": "", "executionTimeMs": None}
        
        if compile_result.returncode != 0:
            err = (compile_result.stderr or compile_result.stdout or "Unknown error").strip()
            return {"compileError": err, "runtimeError": "", "output": "", "executionTimeMs": None}
        
        # Run
        t1 = time.time()
        try:
            run_result = subprocess.run(
                [
                    java_exe,
                    "-Xmx128m",
                    "-Dfile.encoding=UTF-8",
                    "-Dstdout.encoding=UTF-8",
                    "-Dstderr.encoding=UTF-8",
                    "-cp",
                    temp_dir,
                    class_name,
                ],
                capture_output=True,
                text=True,
                encoding='utf-8',
                errors='replace',
                timeout=10,
                cwd=temp_dir,
                input=stdin_data
            )
        except subprocess.TimeoutExpired:
            return {"compileError": "", "runtimeError": "⏱️ Execution timed out (>10s). Infinite loop?", "output": "", "executionTimeMs": None}
        except Exception as e:
            return {"compileError": "", "runtimeError": f"❌ Runtime exception: {e}", "output": "", "executionTimeMs": None}
        
        elapsed_ms = int((time.time() - t1) * 1000)
        stdout = run_result.stdout or ""
        stderr = run_result.stderr or ""
        
        if run_result.returncode != 0:
            return {"compileError": "", "runtimeError": stderr.strip() or f"Exit code {run_result.returncode}", "output": stdout, "executionTimeMs": elapsed_ms}
        
        return {"compileError": "", "runtimeError": "", "output": stdout, "executionTimeMs": elapsed_ms}


def run_python_code(code, stdin_data="", lesson_folder=""):
    """Run Python code, return dict with compileError, runtimeError, output, executionTimeMs."""
    import shutil
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as temp_dir:
        if lesson_folder:
            extracted_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "python_lessons_extracted")
            full_src_dir = os.path.join(extracted_dir, lesson_folder.replace('/', os.sep))
            if os.path.isdir(full_src_dir):
                for item in os.listdir(full_src_dir):
                    s = os.path.join(full_src_dir, item)
                    d = os.path.join(temp_dir, item)
                    try:
                        if os.path.isdir(s):
                            shutil.copytree(s, d, dirs_exist_ok=True)
                        else:
                            shutil.copy2(s, d)
                    except Exception as e:
                        print(f"Error copying {s} to {d}: {e}")
                        
        py_file = os.path.join(temp_dir, "main.py")
        
        with open(py_file, 'w', encoding='utf-8') as f:
            f.write(code)

        child_env = os.environ.copy()
        child_env["PYTHONIOENCODING"] = "utf-8"
        child_env["PYTHONUTF8"] = "1"
            
        t0 = time.time()
        try:
            run_result = subprocess.run(
                [sys.executable, "-u", py_file],
                capture_output=True,
                text=True,
                encoding='utf-8',
                errors='replace',
                timeout=10,
                cwd=temp_dir,
                input=stdin_data,
                env=child_env
            )
        except subprocess.TimeoutExpired:
            return {"compileError": "", "runtimeError": "⏱️ Execution timed out (>10s). Infinite loop?", "output": "", "executionTimeMs": None}
        except Exception as e:
            return {"compileError": "", "runtimeError": f"❌ Runtime exception: {e}", "output": "", "executionTimeMs": None}
            
        elapsed_ms = int((time.time() - t0) * 1000)
        stdout = run_result.stdout or ""
        stderr = run_result.stderr or ""
        
        if run_result.returncode != 0:
            if "SyntaxError" in stderr:
                return {"compileError": stderr.strip(), "runtimeError": "", "output": stdout, "executionTimeMs": elapsed_ms}
            return {"compileError": "", "runtimeError": stderr.strip() or f"Exit code {run_result.returncode}", "output": stdout, "executionTimeMs": elapsed_ms}
            
        return {"compileError": "", "runtimeError": "", "output": stdout, "executionTimeMs": elapsed_ms}


def call_gemini_api(prompt, api_key=None):
    """Call Google Gemini API (gemini-2.5-flash) using urllib."""
    if not api_key:
        api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        return {"error": "API_KEY_MISSING", "message": "未在环境变量或请求中找到 API Key，请点击右上角设置配置。"}
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            if 'candidates' in res_data and len(res_data['candidates']) > 0:
                content = res_data['candidates'][0].get('content', {})
                parts = content.get('parts', [])
                if len(parts) > 0:
                    text = parts[0].get('text', '')
                    return {"success": True, "text": text}
            return {"success": False, "error": f"API 响应格式异常: {json.dumps(res_data)}"}
    except Exception as e:
        if hasattr(e, 'read'):
            try:
                error_body = e.read().decode('utf-8')
                error_json = json.loads(error_body)
                msg = error_json.get('error', {}).get('message', str(e))
                return {"success": False, "error": f"API 错误: {msg}"}
            except Exception:
                pass
        return {"success": False, "error": f"网络或请求失败: {str(e)}"}


# Global variable for heartbeat tracking
LAST_HEARTBEAT = time.time() + 10.0  # 10s grace period for startup

class StudyHubHandler(SimpleHTTPRequestHandler):
    """Handler for IT Study Suite HTTP requests."""
    
    def log_message(self, format, *args):
        """Suppress default log output for cleaner terminal."""
        if args and (str(args[1]) == '200' or '/runjava' in str(args[0]) or '/heartbeat' in str(args[0])):
            # Suppress heartbeat logging to keep terminal clean
            if '/heartbeat' not in str(args[0]):
                print(f"[{self.address_string()}] {format % args}")
    def do_GET(self):
        path = unquote(self.path)
        if path.split('?')[0] == '/api/ai/providers':
            self.send_json(200, {
                "success": True,
                "data": provider_status(),
            })
            return

        if path.split('?')[0] == '/api/learning/dashboard':
            try:
                self.send_json(200, {
                    "success": True,
                    "data": LEARNING_STORE.dashboard(),
                })
            except Exception as exc:
                self.send_service_error(ServiceError(
                    "DATABASE_ERROR", f"读取学习数据失败：{exc}", 500
                ))
            return

        if path.split('?')[0] == '/api/learning/recommendations':
            try:
                self.send_json(200, {
                    "success": True,
                    "data": LEARNING_STORE.recommendations(),
                })
            except Exception as exc:
                self.send_service_error(ServiceError(
                    "DATABASE_ERROR", f"读取学习建议失败：{exc}", 500
                ))
            return

        if path.startswith('/kakomon_img/'):
            # Automatically route legacy/stored image paths to the new location in assets/images/kakomon/
            self.path = self.path.replace('/kakomon_img/', '/assets/images/kakomon/')
            super().do_GET()
            return

        if path.startswith('/getpdf'):
            # Handle PDF textbook fetch dynamically
            from urllib.parse import urlparse, parse_qs
            query = urlparse(path).query
            params = parse_qs(query)
            filename = params.get('file', [''])[0]
            if filename:
                filename = os.path.basename(filename)
                filepath = filename
                if not os.path.isfile(filepath):
                    filepath = os.path.join("textbooks", filename)
                if os.path.isfile(filepath):
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/pdf')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    try:
                        with open(filepath, 'rb') as f:
                            content = f.read()
                        self.send_header('Content-Length', str(len(content)))
                        self.end_headers()
                        self.wfile.write(content)
                        return
                    except Exception as e:
                        print(f"Error reading PDF file: {e}")
            self.send_response(404)
            self.end_headers()
            return
            
        super().do_GET()
    
    def do_POST(self):
        path = unquote(self.path).split('?')[0]

        if path.startswith('/api/'):
            try:
                body = self.read_json_body()
                if path == '/api/learning/events':
                    data = LEARNING_STORE.record_event(body)
                elif path == '/api/learning/import':
                    data = LEARNING_STORE.import_progress(body)
                elif path == '/api/learning/plan/complete':
                    data = LEARNING_STORE.complete_plan(body)
                elif path == '/api/ai/chat':
                    messages = build_tutor_messages(body)
                    result = call_provider(
                        body.get('provider', 'gemini'),
                        body.get('model', ''),
                        messages,
                        body.get('apiKey', ''),
                        body.get('ollamaUrl', ''),
                    )
                    data = {
                        "message": result["text"],
                        "provider": result["provider"],
                        "model": result["model"],
                        "metadata": {"action": body.get("action", "chat")},
                    }
                    context = body.get("context") or {}
                    subject = context.get("subject")
                    if subject in ("sql", "java", "python", "itpass", "sg"):
                        LEARNING_STORE.record_event({
                            "subject": subject,
                            "eventType": "ai_assistance",
                            "itemId": context.get("itemId"),
                            "topic": context.get("topic"),
                            "success": True,
                            "hintCount": 1 if body.get("action") == "hint" else 0,
                            "metadata": {
                                "action": body.get("action", "chat"),
                                "provider": result["provider"],
                                "model": result["model"],
                            },
                        })
                elif path == '/api/ai/questions/generate':
                    data = generate_question(
                        body, LEARNING_STORE, run_java_code, run_python_code
                    )
                elif path == '/api/i18n/translate':
                    data = translate_items(body, LEARNING_STORE)
                else:
                    raise ServiceError("NOT_FOUND", "未找到 API。", 404)
                self.send_json(200, {"success": True, "data": data})
            except ServiceError as exc:
                self.send_service_error(exc)
            except json.JSONDecodeError:
                self.send_service_error(ServiceError(
                    "INVALID_JSON", "请求 JSON 无效。", 400
                ))
            except Exception as exc:
                self.send_service_error(ServiceError(
                    "INTERNAL_ERROR", f"服务器处理失败：{exc}", 500
                ))
            return
        
        if path == '/heartbeat':
            global LAST_HEARTBEAT
            LAST_HEARTBEAT = time.time()
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(b"OK")
            return

        if path == '/runjava':
            content_length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(content_length)
            
            stdin_data = ""
            try:
                body = json.loads(raw_body.decode('utf-8'))
                code = body.get('code', '')
                stdin_data = body.get('stdin', '')
            except Exception:
                code = raw_body.decode('utf-8', errors='replace')
            
            if not code.strip():
                response = {"compileError": "", "runtimeError": "", "output": "⚠️ コードを入力してください (Please enter some code)", "executionTimeMs": None}
            else:
                response = run_java_code(code, stdin_data)
            
            response_bytes = json.dumps(response, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(response_bytes)))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(response_bytes)
            
            has_error = bool(response.get('compileError') or response.get('runtimeError'))
            status = "OK" if not has_error else "ERROR"
            print(f"[Java] {status} {code[:50].strip()!r}...")
            return

        if path == '/runpython':
            content_length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(content_length)
            
            stdin_data = ""
            lesson_folder = ""
            try:
                body = json.loads(raw_body.decode('utf-8'))
                code = body.get('code', '')
                stdin_data = body.get('stdin', '')
                lesson_folder = body.get('lessonFolder', '')
            except Exception:
                code = raw_body.decode('utf-8', errors='replace')
            
            if not code.strip():
                response = {"compileError": "", "runtimeError": "", "output": "⚠️ コードを入力してください (Please enter some code)", "executionTimeMs": None}
            else:
                response = run_python_code(code, stdin_data, lesson_folder)
            
            response_bytes = json.dumps(response, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(response_bytes)))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(response_bytes)
            
            has_error = bool(response.get('compileError') or response.get('runtimeError'))
            status = "OK" if not has_error else "ERROR"
            print(f"[Python] {status} {code[:50].strip()!r}...")
            return

        if path == '/ai/debug':
            content_length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(content_length)
            
            try:
                body = json.loads(raw_body.decode('utf-8'))
                code = body.get('code', '')
                error_msg = body.get('error', '')
                lang = body.get('language', '')
                task = body.get('task', '')
                api_key = body.get('apiKey', '')
            except Exception as e:
                response = {"success": False, "error": f"JSON解析失败: {str(e)}"}
                response_bytes = json.dumps(response, ensure_ascii=False).encode('utf-8')
                self.send_response(400)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Content-Length', str(len(response_bytes)))
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(response_bytes)
                return
            
            prompt = f"""你是一个专业的 SQL 和编程教学助手。当前学生在使用 {lang} 语言写代码。
【当前学习任务描述】
{task}

【学生写的代码】
```
{code}
```

【运行输出的错误/报错信息】
{error_msg}

请针对该报错进行一键纠错与 Code Review。请遵守以下要求：
1. 用亲切、通俗易懂的中文大白话进行解释。
2. 指出是少写了逗号、拼错表名、拼错变量、缩进有误还是逻辑有误。
3. 给出具体的修改思路和提示（比如“你可以检查一下第X行...”，或者“在这个查询中，SELECT语句应该...”）。
4. 不要直接给他们完整的复制粘贴答案，重点是鼓励并引导学生自己修改以加深理解。
"""
            res = call_gemini_api(prompt, api_key)
            response_bytes = json.dumps(res, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(response_bytes)))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(response_bytes)
            return

        if path == '/ai/hint':
            content_length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(content_length)
            
            try:
                body = json.loads(raw_body.decode('utf-8'))
                lang = body.get('language', '')
                step = int(body.get('step', 1))
                code = body.get('code', '')
                task = body.get('task', '')
                ref_code = body.get('referenceCode', '')
                api_key = body.get('apiKey', '')
            except Exception as e:
                response = {"success": False, "error": f"JSON解析失败: {str(e)}"}
                response_bytes = json.dumps(response, ensure_ascii=False).encode('utf-8')
                self.send_response(400)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Content-Length', str(len(response_bytes)))
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(response_bytes)
                return
            
            prompt = f"""你是一个专业的 SQL 和编程教学助手。当前学生在使用 {lang} 进行练习，遇到了困难，请求阶梯式提示。
【当前学习任务描述】
{task}

【学生当前写的代码（可能是不完整或有错误的）】
```
{code}
```

【参考标准答案（供你设计提示使用）】
```
{ref_code}
```

学生请求的是第 {step} 阶段的提示（共有3个阶梯提示，由浅入深）：
- 阶段 1：只提供解题的基本思路或思考方向（例如“尝试使用 WHERE 来过滤日期”，“需要计算每个部门的平均值”），绝对不能包含任何具体的 SQL/代码语法结构、占位符或解决方案，用大白话启发学生思考。
- 阶段 2：给出语法的骨架或结构（例如给出 SQL/代码的大致框架，使用占位符，如 `SELECT ___ FROM ___ WHERE ___` 或 `for ___ in ___:`），展示语法骨骼而不直接给出答案内容。
- 阶段 3：直接给出完整的标准参考答案并附带简要的解析。

请严格根据学生请求的 阶段 {step} 生成提示内容，用亲切易懂的中文输出。
"""
            res = call_gemini_api(prompt, api_key)
            response_bytes = json.dumps(res, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(response_bytes)))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(response_bytes)
            return

        if path == '/ai/generate_variant':
            content_length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(content_length)
            
            try:
                body = json.loads(raw_body.decode('utf-8'))
                task = body.get('task', '')
                sol_query = body.get('solutionQuery', '')
                db_group = body.get('database', 'school')
                api_key = body.get('apiKey', '')
            except Exception as e:
                response = {"success": False, "error": f"JSON解析失败: {str(e)}"}
                response_bytes = json.dumps(response, ensure_ascii=False).encode('utf-8')
                self.send_response(400)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Content-Length', str(len(response_bytes)))
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(response_bytes)
                return
            
            prompt = f"""你是一个专业的 SQL 教学助手。当前学生在进行 SQL 练习，但在下面这道 SQL 挑战题中做错了：
【原错题任务描述】
{task}

【原题参考 SQL 答案】
{sol_query}

请根据该错题的 SQL 知识点，自动即时生成一道极其相似的 SQL 变式练习题，用于帮助学生彻底掌握该知识点。
注意：
1. 新生成的题必须基于数据库群组：{db_group}。
   - 如果数据库群组是 school，则只能使用表：students_mst, departments_mst。
   - 如果数据库群组是 shop，则只能使用表：books, cats, members, orders。
   请绝对不要编造或使用这两个群组之外的任何表或字段！
2. 变式题的难度、考察的知识点（例如：GROUP BY 聚合、JOIN 联查、ORDER BY 排序、WHERE 过滤等）必须与原题极其相似。
3. 请直接以 JSON 格式输出，不要包含任何 markdown 代码块标记（如 ```json），只输出 JSON 字符串，结构如下：
{{
  "task": "新生成的变式题的中文任务描述 (说明需要查询什么、排序要求等，保持描述清晰)",
  "solutionQuery": "该变式题的正确标准 SQL 查询语句",
  "database": "{db_group}"
}}
"""
            res = call_gemini_api(prompt, api_key)
            if res.get('success'):
                text = res['text'].strip()
                if text.startswith("```"):
                    text = re.sub(r'^```(?:json)?\s*', '', text)
                    text = re.sub(r'\s*```$', '', text)
                try:
                    parsed_json = json.loads(text)
                    response = {
                        "success": True,
                        "task": parsed_json.get('task', ''),
                        "solutionQuery": parsed_json.get('solutionQuery', ''),
                        "database": parsed_json.get('database', db_group)
                    }
                except Exception as e:
                    response = {"success": False, "error": f"AI 返回数据解析为 JSON 失败: {str(e)}。AI 原响应: {res['text']}"}
            else:
                response = res
                
            response_bytes = json.dumps(response, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(response_bytes)))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(response_bytes)
            return

        if path == '/ai/trace':
            content_length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(content_length)
            
            try:
                body = json.loads(raw_body.decode('utf-8'))
                code = body.get('code', '')
                lang = body.get('language', '')
                api_key = body.get('apiKey', '')
            except Exception as e:
                response = {"success": False, "error": f"JSON解析失败: {str(e)}"}
                response_bytes = json.dumps(response, ensure_ascii=False).encode('utf-8')
                self.send_response(400)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Content-Length', str(len(response_bytes)))
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(response_bytes)
                return
            
            prompt = f"""你是一个专业的 SQL 和编程教学助手。当前学生在使用 {lang} 语言写代码。
请针对下面的代码进行单步执行（Trace）模拟，并输出其每一步执行后的内存状态。
【学生写的代码】
```
{code}
```

请遵循以下规则生成单步执行轨迹（Trace Steps）：
1. 逐步模拟每一行代码的执行。对于循环、条件判断、数组/列表修改，请真实还原每一行的依次执行。
2. 绝对只能输出 JSON 格式的数组，不要包含任何 markdown 代码块标记（如 ```json），只输出 JSON 字符串，直接以 "[" 开始，以 "]" 结束。
3. 数组中的每个元素代表一个执行步骤，包含以下属性：
   - "line": 整数类型，当前执行的行号（从 1 开始）。注意，这应该是该行执行完或者正在执行的那一时刻。
   - "variables": 字典/对象类型，显示当前局部变量的最新状态值。如果是数组、列表，请输出它们的值（例如 [1, 2, 3]）。如果是基本类型，输出基本类型的值。
   - "stdout": 字符串类型，表示截至当前步骤累计控制台输出的所有内容（没有输出则为空字符串 ""）。
   - "explanation": 字符串类型，用简单易懂的中文大白话，解释这一行代码在做什么（比如“将变量 x 初始化为 10”、“判断 i 是否小于 5，条件成立”、“将数组第 0 个元素修改为 99”）。
4. 确保步数合理，不要跳过循环中的关键步骤，但如果循环次数很多（如超过 20 次循环），可以限制只模拟前几次和最后一次循环，总步骤最好不要超过 50 步。

请直接以 JSON 格式输出，不要包含任何 markdown 代码块标记，只输出 JSON 字符串数组。
"""
            res = call_gemini_api(prompt, api_key)
            if res.get('success'):
                text = res['text'].strip()
                if text.startswith("```"):
                    text = re.sub(r'^```(?:json)?\s*', '', text)
                    text = re.sub(r'\s*```$', '', text)
                try:
                    parsed_json = json.loads(text)
                    response = {
                        "success": True,
                        "steps": parsed_json
                    }
                except Exception as e:
                    response = {"success": False, "error": f"AI 返回数据解析为 JSON 失败: {str(e)}。AI 原响应: {res['text']}"}
            else:
                response = res
                
            response_bytes = json.dumps(response, ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(response_bytes)))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(response_bytes)
            return
        
        self.send_response(404)
        self.end_headers()

    def read_json_body(self):
        content_length = int(self.headers.get('Content-Length', 0))
        raw_body = self.rfile.read(content_length)
        if not raw_body:
            return {}
        return json.loads(raw_body.decode('utf-8'))

    def send_json(self, status, payload):
        response_bytes = json.dumps(payload, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(response_bytes)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(response_bytes)

    def send_service_error(self, error):
        self.send_json(error.status, error.as_dict())
    
    def do_OPTIONS(self):
        """Handle CORS preflight."""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def end_headers(self):
        """Add CORS headers to all responses."""
        self.send_header('Access-Control-Allow-Origin', '*')
        static_path = unquote(self.path).split('?', 1)[0].lower()
        if static_path.endswith(('.html', '.css', '.js')) or static_path in ('/', '/index.html'):
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        super().end_headers()
    
    def guess_type(self, path):
        """Set correct MIME types."""
        mt = super().guess_type(path)
        if path.endswith('.js'):
            return 'application/javascript; charset=utf-8'
        if path.endswith('.css'):
            return 'text/css; charset=utf-8'
        if path.endswith('.html'):
            return 'text/html; charset=utf-8'
        return mt


def open_browser():
    """Open browser after short delay to let server start."""
    time.sleep(0.8)
    url = f"http://127.0.0.1:{PORT}"
    webbrowser.open(url)
    print(f"[Browser] Opened browser: {url}")


def monitor_heartbeat(server):
    """Monitor last heartbeat time and shut down server if inactive."""
    global LAST_HEARTBEAT
    # Wait for initial page load
    time.sleep(12)
    while True:
        time.sleep(3)
        if time.time() - LAST_HEARTBEAT > 45.0:
            print("[Heartbeat] No heartbeat detected for 45 seconds. Shutting down server...")
            # Trigger server shutdown
            server.shutdown()
            break


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print("=" * 60)
    print("  Study Tools — Python Server")
    print("=" * 60)
    
    # Check JDK
    javac = find_java_bin("javac.exe")
    if javac:
        print(f"[JDK] Found JDK: {os.path.dirname(javac)}")
    else:
        print("[JDK] NOT found — Java code execution will be unavailable")
        print(f"    Please install JDK and ensure javac is in PATH")
    
    print(f"[Server] Serving from: {os.getcwd()}")
    print(f"[Server] Server starting on http://127.0.0.1:{PORT}")
    print("   Press Ctrl+C to stop")
    print()
    
    # Only open browser if user ran server.py manually (no --launcher flag passed)
    if "--launcher" not in sys.argv:
        threading.Thread(target=open_browser, daemon=True).start()
    
    server = ThreadingHTTPServer(('127.0.0.1', PORT), StudyHubHandler)
    
    # Start heartbeat monitor thread
    monitor_thread = threading.Thread(target=monitor_heartbeat, args=(server,), daemon=True)
    monitor_thread.start()
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[Server] Stopped.")
