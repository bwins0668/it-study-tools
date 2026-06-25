#!/usr/bin/env node
'use strict';

const { spawn, fork } = require('child_process');
const http = require('http');
const net = require('net');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PYTHON = path.join(ROOT, 'python', 'python.exe');

function reservePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

function request(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve({ status: response.statusCode }));
    }).once('error', reject);
  });
}

async function waitForServer(baseUrl) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    try {
      const r = await request(`${baseUrl}/`);
      if (r.status === 200) return;
    } catch (_) {}
    await new Promise(r => setTimeout(r, 250));
  }
  throw new Error('Server did not start');
}

async function main() {
  const port = await reservePort();
  const baseUrl = `http://127.0.0.1:${port}`;

  const server = spawn(PYTHON, ['server.py', String(port)], {
    cwd: ROOT,
    windowsHide: true,
    stdio: 'ignore',
  });

  server.on('exit', (code) => {
    if (code !== null && code !== 0) {
      console.error(`Server exited with code ${code}`);
    }
  });

  await waitForServer(baseUrl);

  // Fork the test as a child node process — preserves process group and env
  const testChild = fork(
    path.join(ROOT, 'tools', 'verify_responsive_navigation_smoke.js'),
    ['--base-url', `${baseUrl}/`],
    { cwd: ROOT, silent: true, timeout: 120000 }
  );

  let stdout = '';
  let stderr = '';
  testChild.stdout.on('data', (chunk) => { stdout += chunk; });
  testChild.stderr.on('data', (chunk) => { stderr += chunk; });

  await new Promise((resolve, reject) => {
    testChild.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr.trim() || stdout.trim() || `Exit code ${code}`));
    });
    testChild.on('error', reject);
  });

  if (stdout.trim()) console.log(stdout.trim());
  server.kill();
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
