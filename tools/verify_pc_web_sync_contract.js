#!/usr/bin/env node
/**
 * PC ↔ Web 同步契约门禁（P15.3）。
 *
 * 在 PC 或 Web 仓库内运行均可（要求两仓库位于同级目录）。检查：
 *  1. 双仓库 pc-web-sync-state.json 内容一致；
 *  2. direct-copy 共享模块逐文件一致（模块映射级校验，非全仓库 hash）；
 *  3. adapted 模块的登记完整性（文件存在 + note 说明）；
 *  4. PC 在记录的 pcSourceCommit 之后是否有触及共享范围的未同步改动
 *     （commit message 带 [PC-ONLY] 或路径全落在 pcOnlyPathPrefixes 时豁免）；
 *  5. Web 未误带 PC 私有运行时（python/、updater/、server.py、native/、bootstrapper）；
 *  6. Web-only 登记文件真实存在。
 *
 * 退出码：0=PASS 1=FAIL（PC 正式 Release 前必须 PASS）
 */
"use strict";
const { execSync } = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function findRepos() {
  const cwd = process.cwd();
  const parent = path.dirname(cwd);
  const candidates = {
    pc: [cwd, path.join(parent, "sql-learning-hub")],
    web: [cwd, path.join(parent, "sql-learning-hub-web-public")],
  };
  const isPc = (d) => fs.existsSync(path.join(d, "server.py")) && fs.existsSync(path.join(d, "updater"));
  const isWeb = (d) => fs.existsSync(path.join(d, "service-worker.js")) && fs.existsSync(path.join(d, "assets", "js", "config.web.js"));
  const pc = candidates.pc.find(isPc);
  const web = candidates.web.find(isWeb);
  if (!pc || !web) throw new Error("无法同时定位 PC 与 Web 仓库（需同级目录）");
  return { pc, web };
}

const results = [];
function check(name, ok, detail) {
  results.push(ok);
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  | " + String(detail).slice(0, 160) : ""}`);
}
function sha256(file) {
  /* EOL 规范化：两仓库均为 autocrlf 环境，CRLF/LF 视为等价（共享模块全部是文本文件） */
  const norm = fs.readFileSync(file).toString("utf8").replace(/\r\n/g, "\n");
  return crypto.createHash("sha256").update(norm).digest("hex").slice(0, 16);
}
function expand(repo, pattern) {
  if (!pattern.includes("*")) return [pattern];
  const dir = path.dirname(pattern);
  const suffix = path.extname(pattern);
  const full = path.join(repo, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => f.endsWith(suffix)).map((f) => path.join(dir, f).replace(/\\/g, "/"));
}

(function main() {
  const { pc, web } = findRepos();
  console.log(`PC:  ${path.basename(pc)}\nWeb: ${path.basename(web)}\n`);

  // 1. 双仓库 state 一致
  const pcStateRaw = fs.readFileSync(path.join(pc, "docs", "pc-web-sync-state.json"), "utf8");
  const webStateRaw = fs.readFileSync(path.join(web, "docs", "pc-web-sync-state.json"), "utf8");
  check("双仓库 sync-state 内容一致", pcStateRaw.trim() === webStateRaw.trim());
  const state = JSON.parse(pcStateRaw);

  // 2. direct-copy 模块逐文件一致
  let mismatches = [];
  Object.entries(state.sharedModules).forEach(([mod, def]) => {
    if (def.mode !== "direct-copy") return;
    def.files.forEach((pattern) => {
      const files = expand(pc, pattern);
      if (!files.length) mismatches.push(`${mod}: ${pattern} 在 PC 无匹配`);
      files.forEach((rel) => {
        const pcFile = path.join(pc, rel);
        const webFile = path.join(web, rel);
        if (!fs.existsSync(webFile)) { mismatches.push(`${mod}: Web 缺 ${rel}`); return; }
        if (sha256(pcFile) !== sha256(webFile)) mismatches.push(`${mod}: ${rel} 内容漂移`);
      });
    });
  });
  check("direct-copy 共享模块逐文件一致", mismatches.length === 0, mismatches.slice(0, 3).join(" ; ") || "all match");

  // 3. adapted 模块登记完整
  let adaptedIssues = [];
  Object.entries(state.sharedModules).forEach(([mod, def]) => {
    if (def.mode === "direct-copy") return;
    if (!def.note) adaptedIssues.push(`${mod}: adapted 缺 note 说明`);
    def.files.forEach((pattern) => {
      expand(pc, pattern).forEach((rel) => {
        if (!fs.existsSync(path.join(web, rel))) adaptedIssues.push(`${mod}: Web 缺 ${rel}`);
      });
    });
  });
  check("adapted 模块登记完整且文件存在", adaptedIssues.length === 0, adaptedIssues.slice(0, 3).join(" ; ") || "ok");

  // 4. PC 未同步的共享范围改动
  const recorded = state.pcSourceCommit;
  const head = execSync("git rev-parse HEAD", { cwd: pc }).toString().trim();
  if (head === recorded) {
    check("PC HEAD 与 sync-state 记录一致（无待同步改动）", true, head.slice(0, 8));
  } else {
    let pendingShared = [];
    try {
      const log = execSync(`git log --format="%H|%s" ${recorded}..HEAD`, { cwd: pc }).toString().trim().split("\n").filter(Boolean);
      const sharedPatterns = Object.values(state.sharedModules).flatMap((d) => d.files)
        .map((p) => p.replace(/\*.*$/, ""));
      const pcOnlyPrefixes = state.pcOnlyPathPrefixes || [];
      for (const line of log) {
        const [sha, subject] = line.split("|");
        if (/\[PC-ONLY\]/i.test(subject)) continue;
        const changed = execSync(`git show --name-only --format= ${sha}`, { cwd: pc }).toString().trim().split("\n").filter(Boolean);
        const sharedTouched = changed.filter((f) =>
          sharedPatterns.some((p) => f.startsWith(p)) && !pcOnlyPrefixes.some((p) => f.startsWith(p)));
        if (sharedTouched.length) pendingShared.push(`${sha.slice(0, 8)} ${subject.slice(0, 40)} → ${sharedTouched[0]}`);
      }
    } catch (e) { pendingShared.push("git 检查失败: " + e.message.slice(0, 60)); }
    check("PC 领先 commits 均为 PC-only（无未同步共享改动）", pendingShared.length === 0,
      pendingShared.slice(0, 2).join(" ; ") || `HEAD 领先但均豁免 (${head.slice(0, 8)})`);
  }

  // 5. Web 未误带 PC 私有运行时
  const forbidden = ["python/python.exe", "updater/sign_verify.py", "server.py", "native", "bootstrapper", "assets/js/updater-ui.js", "assets/js/mos365.js", "assets/js/supabase-config.local.js"];
  const leaked = forbidden.filter((f) => fs.existsSync(path.join(web, f)));
  check("Web 无 PC 私有运行时文件", leaked.length === 0, leaked.join(",") || "clean");

  // 6. Web-only 文件存在
  let webOnlyMissing = [];
  Object.entries(state.webOnly).forEach(([mod, def]) => {
    (def.paths || []).forEach((p) => {
      if (p.endsWith("/")) { if (!fs.existsSync(path.join(web, p))) webOnlyMissing.push(`${mod}:${p}`); }
      else if (!p.includes(" ") && !fs.existsSync(path.join(web, p))) webOnlyMissing.push(`${mod}:${p}`);
    });
  });
  check("Web-only 登记文件真实存在", webOnlyMissing.length === 0, webOnlyMissing.join(",") || "ok");

  const failed = results.filter((r) => !r).length;
  console.log(`\n==== pc-web sync contract: ${results.length - failed}/${results.length} PASS ====`);
  process.exit(failed ? 1 : 0);
})();
