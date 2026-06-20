#!/usr/bin/env node

const { chromium } = require("playwright");

const REQUIRED_VIEWPORTS = [
  [320, 568],
  [360, 800],
  [375, 667],
  [390, 844],
  [393, 852],
  [412, 915],
  [414, 896],
  [430, 932],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1280, 720],
  [1366, 768],
  [1440, 900],
].map(([width, height]) => ({ width, height }));

const SUBJECTS = ["sql", "java", "python"];

function readArg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const BASE_URL = readArg("--base-url") || process.env.BASE_URL || "http://127.0.0.1:5173";
const failures = [];

function record(label, details) {
  failures.push({ label, details });
}

async function snapshot(page) {
  return page.evaluate(() => {
    function rect(selector) {
      const el = document.querySelector(selector);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        left: Math.round(r.left),
        top: Math.round(r.top),
        right: Math.round(r.right),
        bottom: Math.round(r.bottom),
        width: Math.round(r.width),
        height: Math.round(r.height),
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
      };
    }

    return {
      href: location.href,
      viewport: `${innerWidth}x${innerHeight}`,
      docWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
      header: rect(".app-header"),
      body: rect("#main-app-body"),
      sidebar: rect("#app-sidebar"),
      content: rect(".lesson-content"),
      playground: rect("#playground-section"),
      sidebarToggle: rect("#mobile-sidebar-toggle"),
      playgroundToggle: rect("#mobile-playground-toggle"),
      sidebarClose: rect(".mobile-sidebar-return .mobile-drawer-close"),
      playgroundClose: rect(".mobile-playground-return .mobile-drawer-close"),
      languagePopover: rect("#language-popover"),
      toolsPanel: rect(".tools-drawer__panel"),
      sidebarOpen: document.body.classList.contains("mobile-sidebar-open"),
      playgroundOpen: document.body.classList.contains("mobile-playground-open"),
      theme: document.documentElement.getAttribute("data-theme") || "",
      appPresent: !!document.getElementById("main-app-body"),
    };
  });
}

function insideViewport(box, width, height, tolerance = 2) {
  return box &&
    box.left >= -tolerance &&
    box.top >= -tolerance &&
    box.right <= width + tolerance &&
    box.bottom <= height + tolerance;
}

async function expect(page, label, predicate) {
  const data = await snapshot(page).catch(() => ({ href: page.url(), appPresent: false }));
  if (!predicate(data)) record(label, data);
}

async function openFresh(page) {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#main-app-body", { timeout: 15000 });
  await page.waitForSelector("#playground-section", { state: "attached", timeout: 15000 });
  await page.waitForTimeout(600);
}

async function switchSubject(page, subject) {
  await page.evaluate((nextSubject) => {
    if (typeof window.switchSubject === "function") window.switchSubject(nextSubject);
  }, subject);
  await page.waitForTimeout(650);
}

async function closeDrawers(page) {
  await page.evaluate(() => window.closeMobileDrawers && window.closeMobileDrawers({ skipFocus: true }));
  await page.waitForTimeout(180);
}

async function verifyClosedLayout(page, viewport, label) {
  await expect(page, `${label} no document horizontal overflow`, (s) =>
    s.appPresent && s.docWidth <= s.clientWidth + 2 && s.bodyWidth <= s.clientWidth + 2
  );
  await expect(page, `${label} main content visible`, (s) =>
    s.content && s.content.width > Math.min(240, viewport.width - 24) && s.content.height > 240
  );

  if (viewport.width <= 720) {
    await expect(page, `${label} mobile sidebar is closed off canvas`, (s) =>
      s.sidebar && s.sidebar.right <= 8 && !s.sidebarOpen
    );
    await expect(page, `${label} sidebar toggle has practical touch target`, (s) =>
      s.sidebarToggle && s.sidebarToggle.width >= 40 && s.sidebarToggle.height >= 40
    );
  }

  if (viewport.width <= 900) {
    await expect(page, `${label} mobile playground is closed off canvas`, (s) =>
      s.playground && s.playground.left >= viewport.width - 8 && !s.playgroundOpen
    );
    await expect(page, `${label} playground toggle has practical touch target`, (s) =>
      s.playgroundToggle && s.playgroundToggle.width >= 40 && s.playgroundToggle.height >= 40
    );
  }

  if (viewport.width > 900) {
    await expect(page, `${label} desktop sidebar and playground visible`, (s) =>
      s.sidebar && s.playground && s.sidebar.width >= 180 && s.playground.width >= 360 &&
      s.sidebar.left >= -2 && s.playground.right <= viewport.width + 2
    );
  }
}

async function verifyOpenDrawerGeometry(page, viewport, label) {
  if (viewport.width <= 720) {
    await page.click("#mobile-sidebar-toggle");
    await page.waitForTimeout(320);
    await expect(page, `${label} open sidebar contained in viewport`, (s) =>
      s.sidebarOpen && insideViewport(s.sidebar, viewport.width, viewport.height)
    );
    await expect(page, `${label} sidebar drawer close target visible`, (s) => {
      const r = s.sidebarClose;
      return r && r.width >= 40 && r.height >= 40 && r.right <= viewport.width + 2;
    });
    await closeDrawers(page);
  }

  if (viewport.width <= 900) {
    await page.click("#mobile-playground-toggle");
    await page.waitForTimeout(320);
    await expect(page, `${label} open playground contained in viewport`, (s) =>
      s.playgroundOpen && insideViewport(s.playground, viewport.width, viewport.height)
    );
    await expect(page, `${label} playground drawer close target visible`, (s) => {
      const r = s.playgroundClose;
      return r && r.width >= 40 && r.height >= 40 && r.left >= -2 && r.right <= viewport.width + 2;
    });
    await closeDrawers(page);
  }
}

async function verifyPopoverContainment(page, viewport, label) {
  if (![320, 390, 768, 820].includes(viewport.width)) return;

  const languageToggle = page.locator("#language-toggle-btn");
  if (await languageToggle.count()) {
    await languageToggle.first().click();
    await page.waitForTimeout(250);
    await expect(page, `${label} language popover contained`, (s) =>
      !s.languagePopover || insideViewport(s.languagePopover, viewport.width, viewport.height)
    );
    await page.keyboard.press("Escape").catch(() => null);
    await page.mouse.click(1, 1).catch(() => null);
    await page.waitForTimeout(150);
  }

  const toolsTrigger = page.locator("#tools-trigger-btn");
  if (await toolsTrigger.count()) {
    await toolsTrigger.first().click();
    await page.waitForTimeout(300);
    await expect(page, `${label} tools drawer panel contained`, (s) =>
      s.toolsPanel && insideViewport(s.toolsPanel, viewport.width, viewport.height)
    );
    await page.locator("#tools-drawer-close").click().catch(() => null);
    await page.waitForTimeout(180);
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  for (const viewport of REQUIRED_VIEWPORTS) {
    const label = `${viewport.width}x${viewport.height}`;
    const page = await browser.newPage({ viewport });
    page.setDefaultTimeout(8000);
    page.on("pageerror", (error) => record(`${label} pageerror`, error.message));

    await openFresh(page);
    await verifyClosedLayout(page, viewport, label);
    await verifyOpenDrawerGeometry(page, viewport, label);
    await verifyPopoverContainment(page, viewport, label);

    for (const subject of SUBJECTS) {
      await switchSubject(page, subject);
      await verifyClosedLayout(page, viewport, `${label} ${subject}`);
      if (viewport.width <= 900) await verifyOpenDrawerGeometry(page, viewport, `${label} ${subject}`);
    }

    await page.close();
  }
  await browser.close();

  if (failures.length) {
    console.error(JSON.stringify({ baseUrl: BASE_URL, failures }, null, 2));
    process.exit(1);
  }
  console.log(`PASS responsive visual smoke: ${REQUIRED_VIEWPORTS.length} viewports, ${SUBJECTS.length} subject layouts, base ${BASE_URL}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
