import subprocess
import time
import sys
import json
import os
import urllib.parse
import urllib.request


PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def request(method, url, payload=None, timeout=5):
    data = None
    headers = {}
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
        headers["Content-Type"] = "application/json; charset=utf-8"

    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        body = resp.read()
        return {
            "status_code": resp.status,
            "headers": dict(resp.headers.items()),
            "content": body,
            "json": lambda: json.loads(body.decode("utf-8")),
        }

def main():
    print("=== Testing server.py API endpoints ===")
    
    # Launch python server on port 8999 with --launcher
    proc = subprocess.Popen(
        [sys.executable, os.path.join(PROJECT_ROOT, "server.py"), "8999", "--launcher"],
        cwd=PROJECT_ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    # Wait for server to start
    time.sleep(2.0)
    
    try:
        # Test 1: GET /getpdf
        pdf_file = "令和08年-イメージ-クレバー方式でよくわかる-かやのき先生のITパスポート教室_00.pdf"
        print("Test 1: Fetching PDF...")
        url_pdf = "http://127.0.0.1:8999/getpdf?file=" + urllib.parse.quote(pdf_file)
        r_pdf = request("GET", url_pdf, timeout=5)
        print(f"  Status code: {r_pdf['status_code']}")
        print(f"  Content-Type: {r_pdf['headers'].get('Content-Type')}")
        assert r_pdf["status_code"] == 200, "PDF endpoint failed!"
        assert "application/pdf" in r_pdf["headers"].get('Content-Type', '').lower(), "Invalid PDF Content-Type!"
        print("  -> PASSED")
        
        # Test 2: POST /runjava with comments containing class keyword
        print("Test 2: Compiling Java with comments...")
        java_code = """
        // This is a comment containing class keyword class Foo
        public class Main {
            public static void main(String[] args) {
                System.out.println("Hello Antigravity!");
            }
        }
        """
        url_java = "http://127.0.0.1:8999/runjava"
        r_java = request("POST", url_java, {"code": java_code, "stdin": ""}, timeout=10)
        print(f"  Status code: {r_java['status_code']}")
        res = r_java["json"]()
        print(f"  compileError: {res.get('compileError')}")
        print(f"  runtimeError: {res.get('runtimeError')}")
        print(f"  output: {res.get('output')}")
        print(f"  executionTimeMs: {res.get('executionTimeMs')}")
        
        assert r_java["status_code"] == 200
        assert not res.get("compileError"), "Compilation failed!"
        assert not res.get("runtimeError"), "Runtime failed!"
        assert "Hello Antigravity!" in res.get("output"), "Output does not match!"
        assert isinstance(res.get("executionTimeMs"), int), "executionTimeMs is not an integer!"
        print("  -> PASSED")
        
        # Test 3: POST /runjava with compile error
        print("Test 3: Testing compilation failure...")
        invalid_code = "public class Main { syntax error }"
        r_invalid = request("POST", url_java, {"code": invalid_code, "stdin": ""}, timeout=10)
        res_invalid = r_invalid["json"]()
        print(f"  compileError (expected): {res_invalid.get('compileError')[:60]}...")
        assert res_invalid.get("compileError"), "Expected compile error but succeeded!"
        print("  -> PASSED")
        
        print("\nAll API tests completed successfully! No issues found.")
        
    except Exception as e:
        print(f"\nTEST FAILED: {e}")
        proc.terminate()
        sys.exit(1)
        
    finally:
        print("Shutting down test server...")
        proc.terminate()
        proc.wait()
        print("Test server shut down.")

if __name__ == '__main__':
    main()
