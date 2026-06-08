import subprocess
import sys

def main():
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
        
    print("=== Checking running SQL-Learning-Hub and python processes ===")
    
    ps_cmd = "Get-CimInstance Win32_Process -Filter \"name = 'SQL-Learning-Hub.exe' or name = 'python.exe'\" | Select-Object Name, ProcessId, ExecutablePath, CommandLine | Format-List"
    try:
        result = subprocess.run(['powershell', '-Command', ps_cmd], capture_output=True, text=True, encoding='utf-8', errors='ignore')
        print(result.stdout)
    except Exception as e:
        print(f"Error running PowerShell: {e}")
        
    print("=============================================================")

if __name__ == '__main__':
    main()
