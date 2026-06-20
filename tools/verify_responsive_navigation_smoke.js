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

const MOBILE_SUBJECTS = ["sql", "java", "python"];

function readArg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const BASE_URL = readArg("--base-url") || process.env.BASE_URL || "http://127.0.0.1:5173";
const failures = [];

function record(label, details) {
  failures.push({ label, details });
}

async function pageMetrics(page) {
  return page.evaluate(() => ({
    href: location.href,
    viewport: `${innerWidth}x${innerHeight}`,
    docWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    sidebarOpen: document.body.classList.contains("mobile-sidebar-open"),
    playgroundOpen: document.body.classList.contains("mobile-playground-open"),
    sidebarExpanded: document.getElementById("mobile-sidebar-toggle")?.getAttribute("aria-expanded"),
    playgroundExpanded: document.getElementById("mobile-playground-toggle")?.getAttribute("aria-expanded"),
    appPresent: !!document.getElementById("main-app-body"),
    lessonTitle: document.getElementById("lesson-title-ja")?.textContent?.trim() || "",
    navCount: document.querySelectorAll("#lessons-nav .lesson-nav-item").length,
  }));
}

async function assertState(page, label, predicate) {
  const metrics = await pageMetrics(page).catch(() => ({ href: page.url(), appPresent: false }));
  if (!predicate(metrics)) record(label, metrics);
}

async function openFresh(page) {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#main-app-body", { timeout: 15000 });
  await page.waitForSelector("#mobile-playground-toggle", { state: "attached", timeout: 15000 });
  await page.waitForTimeout(500);
}

async function closeDrawers(page) {
  await page.evaluate(() => window.closeMobileDrawers && window.closeMobileDrawers({ skipFocus: true }));
  await page.waitForTimeout(180);
}

async function switchSubject(page, subject) {
  await page.evaluate((nextSubject) => {
    if (typeof window.switchSubject === "function") window.switchSubject(nextSubject);
  }, subject);
  await page.waitForTimeout(650);
}

async function verifySidebarFlow(page, label) {
  await page.click("#mobile-sidebar-toggle");
  await page.waitForTimeout(320);
  await assertState(page, `${label} sidebar opens with aria`, (m) =>
    m.appPresent && m.sidebarOpen && !m.playgroundOpen && m.sidebarExpanded === "true"
  );

  const closeButton = page.locator(".mobile-sidebar-return .mobile-drawer-close");
  if (await closeButton.count()) {
    await closeButton.first().click();
    await page.waitForTimeout(250);
    await assertState(page, `${label} sidebar close button closes`, (m) =>
      m.appPresent && !m.sidebarOpen && m.sidebarExpanded === "false"
    );
  } else {
    record(`${label} missing sidebar close button`, await pageMetrics(page));
  }

  await page.click("#mobile-sidebar-toggle");
  await page.waitForTimeout(250);
  const navItems = page.locator("#lessons-nav .lesson-nav-item");
  const navCount = await navItems.count();
  if (navCount < 1) {
    record(`${label} sidebar has no lesson items`, await pageMetrics(page));
  } else {
    await navItems.nth(navCount > 1 ? 1 : 0).click();
    await page.waitForTimeout(450);
    await assertState(page, `${label} lesson click closes drawers`, (m) =>
      m.appPresent && !m.sidebarOpen && !m.playgroundOpen && m.sidebarExpanded === "false"
    );
  }

  await page.click("#mobile-sidebar-toggle");
  await page.waitForTimeout(250);
  await page.goBack({ waitUntil: "domcontentloaded", timeout: 2000 }).catch(() => null);
  await page.waitForTimeout(350);
  await assertState(page, `${label} browser Back closes sidebar without leaving app`, (m) =>
    m.appPresent && !m.sidebarOpen
  );
}

async function verifyPlaygroundFlow(page, label) {
  await page.click("#mobile-playground-toggle");
  await page.waitForTimeout(320);
  await assertState(page, `${label} playground opens with aria`, (m) =>
    m.appPresent && m.playgroundOpen && !m.sidebarOpen && m.playgroundExpanded === "true"
  );

  const closeButton = page.locator(".mobile-playground-return .mobile-drawer-close");
  if (await closeButton.count()) {
    await closeButton.first().click();
    await page.waitForTimeout(250);
    await assertState(page, `${label} playground close button closes`, (m) =>
      m.appPresent && !m.playgroundOpen && m.playgroundExpanded === "false"
    );
  } else {
    record(`${label} missing playground close button`, await pageMetrics(page));
  }

  await page.click("#mobile-playground-toggle");
  await page.waitForTimeout(250);
  await page.goBack({ waitUntil: "domcontentloaded", timeout: 2000 }).catch(() => null);
  await page.waitForTimeout(350);
  await assertState(page, `${label} browser Back closes playground without leaving app`, (m) =>
    m.appPresent && !m.playgroundOpen
  );
}

async function verifyUtilityEntryPoints(page, label) {
  const languageToggle = page.locator("#language-toggle-btn");
  if (await languageToggle.count()) {
    await languageToggle.first().click();
    await page.waitForTimeout(250);
    const open = await page.locator("#language-popover.open").count();
    if (!open) record(`${label} language popover did not open`, await pageMetrics(page));
    const enOption = page.locator('#language-options-list .language-option[data-lang="en"]');
    if (await enOption.count()) {
      await enOption.first().click();
      await page.waitForTimeout(450);
      const currentLanguage = await page.evaluate(() =>
        window.I18n && typeof window.I18n.getLanguage === "function" ? window.I18n.getLanguage() : null
      );
      if (currentLanguage !== "en") record(`${label} language did not switch to en`, { currentLanguage });
    } else {
      record(`${label} en language option missing`, await pageMetrics(page));
    }
  } else {
    record(`${label} language switcher missing`, await pageMetrics(page));
  }

  const toolsTrigger = page.locator("#tools-trigger-btn");
  if (await toolsTrigger.count()) {
    await toolsTrigger.first().click();
    await page.waitForTimeout(300);
    const drawerOpen = await page.evaluate(() => {
      const drawer = document.getElementById("tools-drawer");
      const trigger = document.getElementById("tools-trigger-btn");
      return {
        hidden: drawer ? drawer.hidden : true,
        expanded: trigger?.getAttribute("aria-expanded"),
      };
    });
    if (drawerOpen.hidden || drawerOpen.expanded !== "true") {
      record(`${label} tools drawer did not open`, drawerOpen);
    }
    await page.locator("#tools-drawer-close").click().catch(() => null);
    await page.waitForTimeout(200);
  } else {
    record(`${label} tools trigger missing`, await pageMetrics(page));
  }

  await closeDrawers(page);
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  for (const viewport of REQUIRED_VIEWPORTS) {
    const label = `${viewport.width}x${viewport.height}`;
    const page = await browser.newPage({ viewport });
    page.setDefaultTimeout(8000);
    page.on("pageerror", (error) => record(`${label} pageerror`, error.message));
    await openFresh(page);

    await assertState(page, `${label} no horizontal overflow on entry`, (m) =>
      m.docWidth <= m.clientWidth + 2 && m.bodyWidth <= m.clientWidth + 2
    );

    if (viewport.width <= 720) {
      await verifySidebarFlow(page, label);
      await openFresh(page);
    }

    if (viewport.width <= 900) {
      await verifyPlaygroundFlow(page, label);
      await openFresh(page);
    }

    if (viewport.width <= 900) {
      for (const subject of MOBILE_SUBJECTS) {
        await switchSubject(page, subject);
        if (viewport.width <= 720) await verifySidebarFlow(page, `${label} ${subject}`);
        await verifyPlaygroundFlow(page, `${label} ${subject}`);
        await openFresh(page);
      }
    }

    if ([320, 390, 768, 1024, 1440].includes(viewport.width)) {
      await verifyUtilityEntryPoints(page, label);
    }

    await page.close();
  }
  await browser.close();

  if (failures.length) {
    console.error(JSON.stringify({ baseUrl: BASE_URL, failures }, null, 2));
    process.exit(1);
  }
  console.log(`PASS responsive navigation smoke: ${REQUIRED_VIEWPORTS.length} viewports, ${MOBILE_SUBJECTS.length} mobile course flows, base ${BASE_URL}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
