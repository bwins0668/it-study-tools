// verify_sandbox_globals.mjs — Verify Java/Python sandbox global handlers
// Round 86.0 deliverable: Audit sandbox loading chain and undefined function risks

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

function read(relPath) {
  try {
    return readFileSync(resolve(ROOT, relPath), 'utf8');
  } catch {
    return '';
  }
}

function warn(label, detail) {
  console.warn(`[WARN] ${label}: ${detail}`);
}

function pass(label) {
  console.log(`[PASS] ${label}`);
}

// ─── Check 1: switchJavaOutputTab / switchPythonOutputTab defined ───
console.log('\n=== Check 1: Output tab switch functions ===');
const javaSandbox = read('assets/js/java_sandbox.js');
const pythonSandbox = read('assets/js/python_sandbox.js');

if (javaSandbox.includes('function switchJavaOutputTab(')) {
  pass('switchJavaOutputTab is defined in java_sandbox.js');
} else {
  warn('JAVA', 'switchJavaOutputTab function NOT found in java_sandbox.js');
}

if (pythonSandbox.includes('function switchPythonOutputTab(')) {
  pass('switchPythonOutputTab is defined in python_sandbox.js');
} else {
  warn('PYTHON', 'switchPythonOutputTab function NOT found in python_sandbox.js');
}

// ─── Check 2: typeof guard before calling undefined functions ───
console.log('\n=== Check 2: typeof guards for risky calls ===');
const javaMatch = javaSandbox.match(/switchJavaOutputTab\(/g);
if (javaMatch) {
  if (javaSandbox.includes('typeof switchJavaOutputTab')) {
    pass('java_sandbox.js has typeof guard for switchJavaOutputTab');
  } else {
    warn('JAVA', 'No typeof guard before switchJavaOutputTab call');
  }
}

const pyMatch = pythonSandbox.match(/switchPythonOutputTab\(/g);
if (pyMatch) {
  if (pythonSandbox.includes('typeof switchPythonOutputTab')) {
    pass('python_sandbox.js has typeof guard for switchPythonOutputTab');
  } else {
    warn('PYTHON', 'No typeof guard before switchPythonOutputTab call');
  }
}

// ─── Check 3: HTML inline handlers vs defined functions ───
console.log('\n=== Check 3: HTML inline handlers audit ===');
const html = read('index.html');
const onclickRegex = /onclick="([^"]+)"/g;
const riskyCalls = [];
let m;
while ((m = onclickRegex.exec(html)) !== null) {
  const call = m[1].split('(')[0].trim();
  if (call && !call.includes('.') && call !== 'event.stopPropagation') {
    riskyCalls.push(call);
  }
}
console.log(`Found ${riskyCalls.length} risky global function calls in HTML onclick handlers`);
riskyCalls.forEach(call => {
  const foundInJs = javaSandbox.includes(`function ${call}`) ||
                        pythonSandbox.includes(`function ${call}`) ||
                        read('assets/js/app.js').includes(`function ${call}`) ||
                        read('assets/js/ai_assistant.js').includes(`function ${call}`);
  if (!foundInJs) {
    warn('HTML', `onclick="${call}()" might be undefined (not found in common JS files)`);
  }
});

// ─── Check 4: Script loading order ───
console.log('\n=== Check 4: Script loading order ===');
const scriptOrder = [];
const scriptRegex = /<script\s+[^>]*src="([^"]+)"[^>]*>/g;
while ((m = scriptRegex.exec(html)) !== null) {
  scriptOrder.push(m[1]);
}
console.log('Script loading order:');
scriptOrder.forEach((src, i) => console.log(`  ${i + 1}. ${src}`));

// Check if java_sandbox.js loads after app.js (which defines helper functions)
const appJsIdx = scriptOrder.findIndex(s => s.includes('app.js'));
const javaJsIdx = scriptOrder.findIndex(s => s.includes('java_sandbox.js'));
const pythonJsIdx = scriptOrder.findIndex(s => s.includes('python_sandbox.js'));
if (appJsIdx < javaJsIdx && appJsIdx < pythonJsIdx) {
  pass('Script order: app.js before java_sandbox.js and python_sandbox.js');
} else {
  warn('ORDER', 'Unexpected script loading order');
}

// ─── Check 5: Service worker cache risk ───
console.log('\n=== Check 5: Service worker cache risk ===');
const swContent = read('service-worker.js');
const versionContent = read('assets/js/version.js');
const versionMatch = versionContent.match(/webVersion:\s*"([^"]+)"/);
if (versionMatch) {
  const currentVersion = versionMatch[1];
  console.log(`Current version: ${currentVersion}`);
  if (swContent.includes(currentVersion)) {
    pass('Service worker CACHE_NAME matches current version');
  } else {
    warn('CACHE', `Service worker CACHE_NAME might be outdated (current: ${currentVersion})`);
  }
}

// ─── Summary ───
console.log('\n=== Summary ===');
console.log('Sandbox globals audit complete. Check warnings above.');
process.exit(0);
