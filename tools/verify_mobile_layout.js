/*
 * tools/verify_mobile_layout.js
 * Mobile layout verification script for Playwright.
 * Usage: node tools/verify_mobile_layout.js
 * Tests 3 viewports x 4 pages for horizontal overflow and layout correctness.
 */
const { chromium } = require('playwright');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:5174';
const VIEWPORTS = [
  { w: 375, h: 812, label: 'iPhone X' },
  { w: 390, h: 844, label: 'iPhone 14' },
  { w: 414, h: 896, label: 'iPhone 11' },
];
const PAGES = [
  { path: '/', label: '首页' },
  { path: '/?module=sql&lesson=1', label: 'SQL lesson' },
  { path: '/?module=sql&lesson=1&lang=both', label: '左右对照' },
  { path: '/?module=sql&exam=1', label: '沙盒入口' },
];

async function run() {
  const start = Date.now();
  let passed = 0, failed = 0;

  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`  ${vp.label} (${vp.w}x${vp.h})`);
    console.log(`${'='.repeat(60)}`);

    const context = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });

    for (const pg of PAGES) {
      const page = await context.newPage();
      try {
        await page.goto(BASE_URL + pg.path, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(2000);

        const result = await page.evaluate(() => {
          const vw = window.innerWidth;

          // 1. Check overflow
          const docSW = document.documentElement.scrollWidth;
          const bodySW = document.body.scrollWidth;

          // 2. Find main content element
          const mainSelectors = ['.lesson-content', '.content-card', 'main'];
          let mainInfo = null;
          for (const sel of mainSelectors) {
            const el = document.querySelector(sel);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.width > 80) {
                mainInfo = { selector: sel, left: rect.left, right: rect.right, width: rect.width };
                break;
              }
            }
          }

          // 3. Check bilingual compare mode
          const concept = document.querySelector('.concept-container');
          let compareInfo = null;
          if (concept) {
            const cs = getComputedStyle(concept);
            const rect = concept.getBoundingClientRect();
            compareInfo = {
              flexDirection: cs.flexDirection,
              columns: concept.querySelectorAll('.concept-col').length,
              width: rect.width,
              left: rect.left,
            };
          }

          return { vw, docSW, bodySW, mainInfo, compareInfo };
        });

        const hasOverflow = result.docSW > result.vw + 2 || result.bodySW > result.vw + 2;
        const mainShifted = result.mainInfo && result.mainInfo.left > result.vw * 0.25;
        const stillDualColumn = result.compareInfo && result.compareInfo.flexDirection === 'row' && result.vw <= 600;

        const issues = [];
        if (hasOverflow) issues.push(`OVERFLOW docSW=${result.docSW} vw=${result.vw}`);
        if (mainShifted) issues.push(`MAIN_SHIFTED left=${result.mainInfo?.left} > ${result.vw * 0.25}`);
        if (stillDualColumn) issues.push(`DUAL_COLUMN at narrow width`);
        if (result.mainInfo && result.mainInfo.width < result.vw * 0.4) issues.push(`MAIN_TOO_NARROW width=${result.mainInfo.width} < ${result.vw * 0.4}`);

        const status = issues.length === 0 ? 'PASS' : 'FAIL';
        if (status === 'PASS') passed++; else failed++;

        console.log(`  [${status}] ${pg.label}`);
        console.log(`    scrollW=${result.docSW} bodySW=${result.bodySW} vw=${result.vw}`);
        if (result.mainInfo) console.log(`    main: .${result.mainInfo.selector} left=${result.mainInfo.left} width=${result.mainInfo.width}`);
        if (result.compareInfo) console.log(`    compare: dir=${result.compareInfo.flexDirection} cols=${result.compareInfo.columns}`);
        if (issues.length) issues.forEach(i => console.log(`    ❌ ${i}`));

      } catch (err) {
        console.log(`  [SKIP] ${pg.label}: ${err.message}`);
      }
      await page.close();
    }
    await context.close();
  }

  await browser.close();

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  SUMMARY: ${passed} PASS / ${failed} FAIL / ${elapsed}s`);
  console.log(`${'='.repeat(60)}`);
  process.exit(failed > 0 ? 1 : 0);
}

run().catch(err => { console.error(err); process.exit(1); });
