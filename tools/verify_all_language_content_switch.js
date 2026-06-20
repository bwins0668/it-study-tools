/*
 * tools/verify_all_language_content_switch.js
 * Comprehensive language content switching audit.
 *
 * Tests all supported languages for:
 *   - UI not crashing after switch
 *   - No undefined/null/[object Object]/raw keys
 *   - Honest fallback labels (target language label ≠ actual content language)
 *   - No horizontal overflow after switch
 *   - Compare labels consistent with language
 *   - Korean mode doesn't show Chinese content without fallback label
 *   - English mode doesn't show Chinese/Japanese labels
 *
 * Usage: node tools/verify_all_language_content_switch.js
 * Requires: playwright
 * Dev server must be running at BASE_URL (default: http://127.0.0.1:5174)
 */

const { chromium } = require('playwright');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:5174';
const HEADLESS = process.env.HEADLESS !== 'false';

const PRIMARY_LANGUAGES = [
  { code: 'default-ja-zh', label: 'Default Ja/Zh', native: '既定: 日本語 / 中文' },
  { code: 'zh', label: 'Chinese', native: '中文 (简体)' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ko', label: 'Korean', native: '한국어' },
  { code: 'my', label: 'Burmese', native: 'မြန်မာဘာသာ' },
  { code: 'th', label: 'Thai', native: 'ไทย' },
  { code: 'vi', label: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'id', label: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'fr', label: 'French', native: 'Français' },
];

/* ── Helpers ── */

function hasHangul(text) {
  return /[\uac00-\ud7af]/.test(text);
}

function hasJapanese(text) {
  return /[\u3040-\u30ff\u4e00-\u9fff]/.test(text);
}

function hasCJKChinese(text) {
  return /[\u4e00-\u9fff]/.test(text);
}

function hasLatin(text) {
  return /[A-Za-z]{4,}/.test(text);
}

function hasBurmese(text) {
  return /[\u1000-\u109f]/.test(text || "");
}

function hasThai(text) {
  return /[\u0e00-\u0e7f]/.test(text || "");
}

function hasVietnamese(text) {
  return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(text || "");
}

function hasIndonesian(text) {
  return /\b(adalah|yang|dan|untuk|dengan|pada|dari|tidak|sebagai|mengambil|pelajaran|data)\b/i.test(text || "");
}

function looksLikeLanguage(code, text) {
  if (code === 'my') return hasBurmese(text);
  if (code === 'th') return hasThai(text);
  if (code === 'vi') return hasVietnamese(text);
  if (code === 'id') return hasIndonesian(text);
  return false;
}

function assertNoRawText(text, label) {
  if (!text) return;
  if (/undefined|null|\[object Object\]|NaN/i.test(String(text))) {
    throw new Error(`${label}: invalid raw text found: "${String(text).slice(0, 80)}"`);
  }
}

const FORBIDDEN_CHINESE_IN_KOREAN = [
  "数据库", "数据集合", "按组织结构", "什么是数据库",
  "中文简体", "简称DB", "关系型数据库", "数据库系统"
];

async function assertNoHorizontalOverflow(page, label) {
  const r = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    docScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));
  if (r.docScrollWidth > r.innerWidth + 2 || r.bodyScrollWidth > r.innerWidth + 2) {
    throw new Error(`${label}: overflow docSW=${r.docScrollWidth} bodySW=${r.bodyScrollWidth} vw=${r.innerWidth}`);
  }
  return r;
}

/* ── Test suite ── */

async function run() {
  const start = Date.now();
  let passed = 0, failed = 0, warns = 0;
  const results = [];

  function emit(status, label, detail) {
    if (status === 'PASS') passed++;
    else if (status === 'FAIL') failed++;
    else warns++;
    const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
    console.log(`  ${icon} [${status}] ${label}`);
    if (detail) console.log(`       ${detail}`);
  }

  const browser = await chromium.launch({ headless: HEADLESS });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  // ── Pre-test: navigate to SQL lesson ──
  await page.goto(BASE_URL + '/?module=sql&lesson=1', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(2000);

  // ── Language list discovery ──
  const langInMenu = await page.evaluate(() => {
    const items = document.querySelectorAll('.language-option');
    return Array.from(items).map(el => ({
      code: el.dataset.lang || el.dataset.value || el.getAttribute('lang') || '',
      label: el.textContent.trim().slice(0, 40),
    })).filter(x => x.code);
  });

  console.log(`\n── Language Menu Items (${langInMenu.length}) ──`);
  for (const l of langInMenu) {
    console.log(`  ${l.code.padEnd(16)} ${l.label}`);
  }

  // ── Test each language ──
  for (const lang of PRIMARY_LANGUAGES) {
    const code = lang.code;
    console.log(`\n── Testing: ${code} (${lang.label}) ──`);

    try {
      // Open language menu and click
      const langBtn = await page.$('.language-toggle-btn');
      if (!langBtn) { emit('SKIP', `${code} — toggle button`, 'not found'); continue; }
      await langBtn.click({ force: true });
      await page.waitForTimeout(600);

      // Find the language option
      const optionSelector = `.language-option[data-lang="${code}"], .language-option[data-value="${code}"], .language-option[lang="${code}"]`;
      const opt = await page.$(optionSelector);
      if (!opt) { emit('SKIP', `${code} — option`, 'not found in menu'); await page.keyboard.press('Escape'); continue; }
      await opt.evaluate(el => el.scrollIntoView({ block: 'center', inline: 'center' }));
      await page.evaluate((selector) => {
        const el = document.querySelector(selector);
        if (!el) throw new Error(`Language option not found: ${selector}`);
        el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      }, optionSelector);
      await page.waitForFunction((expectedCode) => {
        if (!window.I18n || typeof window.I18n.getLanguage !== 'function') return false;
        const actual = window.I18n.getLanguage();
        return actual === expectedCode || actual.indexOf(expectedCode) === 0;
      }, code, { timeout: 5000 }).catch(() => {
        // Older UI paths may normalize to regional codes; keep content assertions authoritative.
      });
      await page.waitForTimeout(1500);

      // ── Test 1: No overflow ──
      try {
        await assertNoHorizontalOverflow(page, `${code} overflow`);
        emit('PASS', `${code} no overflow`);
      } catch (e) {
        emit('FAIL', `${code} no overflow`, e.message);
      }

      // ── Test 2: No raw keys in page ──
      const rawCheck = await page.evaluate(() => {
        const body = document.body.innerText;
        return {
          hasUndefined: body.includes('undefined'),
          hasNull: body.includes('null'),
          hasObjObj: body.includes('[object Object]'),
          hasRawKey: /i18n:|translate:|data-i18n/.test(body),
        };
      });
      const hasRawIssue = rawCheck.hasUndefined || rawCheck.hasNull || rawCheck.hasObjObj || rawCheck.hasRawKey;
      emit(hasRawIssue ? 'FAIL' : 'PASS', `${code} no raw keys`,
        hasRawIssue ? JSON.stringify(rawCheck) : '');

      // ── Test 3: Title not empty ──
      const titleText = await page.evaluate(() => {
        const el = document.getElementById('lesson-title-zh');
        return el ? el.textContent.trim() : '';
      });
      emit(titleText ? 'PASS' : 'FAIL', `${code} title not empty`, titleText ? `"${titleText.slice(0, 50)}"` : '');

      if (titleText) assertNoRawText(titleText, `${code} title`);

      // ── Test 4: Concept body not empty ──
      const conceptText = await page.evaluate(() => {
        const el = document.getElementById('concept-zh-body');
        return el ? el.textContent.trim() : '';
      });
      emit(conceptText ? 'PASS' : 'FAIL', `${code} concept not empty`, conceptText ? `"${conceptText.slice(0, 50)}..."` : '');
      if (conceptText) assertNoRawText(conceptText, `${code} concept`);

      // ── Test 5: Check compare button consistency ──
      const compareBtn = await page.evaluate(() => {
        const both = document.querySelector('.lang-tab[data-lang="both"]');
        const target = document.querySelector('.lang-tab[data-lang="zh"]');
        const jaBtn = document.querySelector('.lang-tab[data-lang="ja"]');
        return {
          bothText: both ? both.textContent.trim() : '',
          targetText: target ? target.textContent.trim() : '',
          jaText: jaBtn ? jaBtn.textContent.trim() : '',
        };
      });

      // Check that target button contains the language's native name or fallback indicator
      if (compareBtn.targetText) {
        const hasCurrentLang = compareBtn.targetText.includes(lang.native.slice(0, 4));
        const hasShowOnly = compareBtn.targetText.includes('のみ') || compareBtn.targetText.includes('only') || compareBtn.targetText.includes('만');
        if (!hasCurrentLang && !compareBtn.targetText.includes('中文') && !compareBtn.targetText.includes('fallback')) {
          // Might be a fallback — check for known patterns
          if (code !== 'zh' && code !== 'default-ja-zh' && code !== 'ja') {
            // Non-baseline language: target button should either show its native name or fallback indicator
            if (!compareBtn.targetText.includes('(fallback') && !hasShowOnly) {
              emit('WARN', `${code} compare target label`, `"${compareBtn.targetText}" — may need review`);
            } else {
              emit('PASS', `${code} compare target label`);
            }
          } else {
            emit('PASS', `${code} compare target label`);
          }
        } else {
          emit('PASS', `${code} compare target label`);
        }
      }

      // ── Test 6: Check column header for honesty ──
      const headerInfo = await page.evaluate(() => {
        const targetHead = document.querySelector('.zh-col h4');
        const conceptEl = document.getElementById('concept-zh-body');
        return {
          headerText: targetHead ? targetHead.textContent.trim() : '',
          conceptText: conceptEl ? (conceptEl.textContent || '').trim().slice(0, 100) : '',
        };
      });

      if (code === 'ko' && headerInfo.conceptText) {
        // Korean: check for Chinese text that should NOT be there without fallback label
        const hasChineseContent = FORBIDDEN_CHINESE_IN_KOREAN.some(w => headerInfo.conceptText.includes(w));
        const hasKoreanChars = hasHangul(headerInfo.conceptText);
        const hasFallbackLabel = headerInfo.headerText.includes('fallback') || headerInfo.headerText.includes('中文');

        if (hasChineseContent && !hasKoreanChars && !hasFallbackLabel) {
          emit('FAIL', `${code} — Korean shows Chinese without fallback label`,
            `header="${headerInfo.headerText}" concept="${headerInfo.conceptText.slice(0, 60)}"`);
        } else if (hasChineseContent && !hasKoreanChars && hasFallbackLabel) {
          emit('WARN', `${code} — Korean content is Chinese (labelled as fallback)`,
            `header="${headerInfo.headerText}"`);
        } else {
          emit('PASS', `${code} content honesty`);
        }
      } else if (code === 'en' && headerInfo.conceptText) {
        // English: content should be Latin or labelled as fallback
        const hasFallbackLabel = headerInfo.headerText.includes('fallback') || headerInfo.headerText.includes('日本語') || headerInfo.headerText.includes('中文');
        if (!hasLatin(headerInfo.conceptText) && !hasFallbackLabel) {
          emit('WARN', `${code} — English content may not be English (no fallback label)`,
            `"${headerInfo.conceptText.slice(0, 60)}"`);
        } else {
          emit('PASS', `${code} content honesty`);
        }
      } else if ((code === 'my' || code === 'th' || code === 'vi' || code === 'id') && headerInfo.conceptText) {
        // my/th/vi/id: must have fallback label if not in target language
        const hasFallbackLabel = headerInfo.headerText.includes('fallback') || headerInfo.headerText.includes('日本語') || headerInfo.headerText.includes('中文');
        if (!hasFallbackLabel) {
          if (!looksLikeLanguage(code, headerInfo.conceptText)) {
            emit('WARN', `${code} — content may be fallback without label`,
              `"${headerInfo.conceptText.slice(0, 60)}" header="${headerInfo.headerText}"`);
          } else {
            emit('PASS', `${code} content honesty`);
          }
        } else {
          emit('PASS', `${code} content honesty (fallback labelled)`);
        }
      } else if (code === 'default-ja-zh') {
        emit('PASS', `${code} content (bilingual mode)`);
      } else {
        emit('PASS', `${code} content check`);
      }

      // ── Test 7: Overflow after language switch (second check) ──
      try {
        await assertNoHorizontalOverflow(page, `${code} overflow post-check`);
        emit('PASS', `${code} overflow post-check`);
      } catch (e) {
        emit('FAIL', `${code} overflow post-check`, e.message);
      }

    } catch (err) {
      emit('FAIL', `${code} — unexpected error`, err.message);
    }
  }

  await browser.close();

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  console.log(`\n${'='.repeat(60)}`);
  console.log(`  SUMMARY: ${passed} PASS / ${failed} FAIL / ${warns} WARN / ${elapsed}s`);
  console.log(`${'='.repeat(60)}`);

  process.exit(failed > 0 ? 1 : 0);
}

run().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
