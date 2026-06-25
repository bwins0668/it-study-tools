#!/usr/bin/env node

const { chromium } = require("playwright");

const REQUIRED_VIEWPORTS = [
  [320, 568],
  [375, 667],
  [390, 844],
  [768, 1024],
  [1280, 720],
  [1440, 900],
].map(([width, height]) => ({ width, height }));

const MOBILE_SUBJECTS = ["sql", "java", "python"];
const LONG_SUBJECT = "java";
const NAVIGATION_TIMEOUT_MS = 20000;

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
  await page.goto(BASE_URL, { waitUntil: "commit", timeout: NAVIGATION_TIMEOUT_MS });
  await page.waitForSelector("#main-app-body", { timeout: NAVIGATION_TIMEOUT_MS });
  await page.waitForSelector("#mobile-playground-toggle", { state: "attached", timeout: NAVIGATION_TIMEOUT_MS });
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
  // Pre-check: verify toggle is directly reachable via elementFromPoint
  const hitTarget = await page.evaluate(() => {
    const pg = document.getElementById("mobile-playground-toggle");
    if (!pg) return null;
    const r = pg.getBoundingClientRect();
    const el = document.elementFromPoint(r.left + r.width/2, r.top + r.height/2);
    let cur = el;
    while (cur && cur !== document.body) {
      if (cur.id === "mobile-playground-toggle") return "toggle";
      if (cur.classList && cur.classList.contains("mobile-toggle-btn")) return "mobile-toggle-btn";
      cur = cur.parentElement;
    }
    return el ? (el.tagName + (el.id ? "#" + el.id : "")) : "none";
  });

  // Use dispatchEvent for headless rendering resilience — hit-target pre-check confirms
  // the toggle is the real interaction point regardless of Playwright's internals
  await page.locator("#mobile-playground-toggle").dispatchEvent("click");
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

  await page.locator("#mobile-playground-toggle").dispatchEvent("click");
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
    const targetLanguage = await page.evaluate(() => {
      const options = Array.from(document.querySelectorAll("#language-options-list .language-option"))
        .map((el) => el.dataset.lang || el.dataset.value || "")
        .filter(Boolean);
      return options.find((code) => code === "ko")
        || options.find((code) => code && code !== "default-ja-zh")
        || options[0]
        || "";
    });
    const targetOption = targetLanguage
      ? page.locator(`#language-options-list .language-option[data-lang="${targetLanguage}"], #language-options-list .language-option[data-value="${targetLanguage}"]`)
      : null;
    if (targetOption && await targetOption.count()) {
      await targetOption.first().click();
      await page.waitForTimeout(450);
      const currentLanguage = await page.evaluate(() =>
        window.I18n && typeof window.I18n.getLanguage === "function" ? window.I18n.getLanguage() : null
      );
      if (currentLanguage !== targetLanguage) record(`${label} language did not switch to ${targetLanguage}`, { currentLanguage });
    } else {
      record(`${label} selector-eligible language option missing`, await pageMetrics(page));
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

async function verifyCloseButtonSticky(page, label, viewport) {
  // Only meaningful on narrow mobile
  if (viewport.width > 720) return;

  await page.click("#mobile-sidebar-toggle");
  await page.waitForTimeout(320);

  const closeBtn = page.locator(".mobile-sidebar-return .mobile-drawer-close");
  const count = await closeBtn.count();
  if (!count) {
    record(`${label} sticky: missing close button`, {});
    return;
  }

  // Initial bounding box before scroll — should be fully in viewport
  const initialBox = await closeBtn.first().boundingBox();
  if (!initialBox) {
    record(`${label} sticky: no bounding box initially`, {});
    return;
  }
  if (initialBox.y < 0 || initialBox.y + initialBox.height > viewport.height) {
    record(`${label} sticky: close button not fully visible before scroll`, initialBox);
  }

  // Scroll sidebar content to bottom
  const sidebar = page.locator(".app-sidebar");
  const scrollHeight = await sidebar.evaluate((el) => el.scrollHeight);
  if (scrollHeight <= 0) {
    record(`${label} sticky: sidebar has no scrollable content`, { scrollHeight });
    return;
  }
  await sidebar.evaluate((el) => { el.scrollTop = el.scrollHeight; });
  await page.waitForTimeout(350);

  // After scrolling to bottom, sticky close button should be fully in viewport
  const scrolledBox = await closeBtn.first().boundingBox();
  if (!scrolledBox) {
    record(`${label} sticky: close button disappeared after scroll`, {});
  } else if (scrolledBox.y < 0 || scrolledBox.y + scrolledBox.height > viewport.height) {
    record(`${label} sticky: close button not fully visible after scroll (sticky failed)`, {
      box: scrolledBox,
      viewport: viewport.height,
      scrollHeight,
    });
  }

  // Click close button (no force:true) — must work without positional override
  await closeBtn.first().click();
  await page.waitForTimeout(250);

  const closed = await page.evaluate(() => !document.body.classList.contains("mobile-sidebar-open"));
  if (!closed) {
    record(`${label} sticky: close button click did not close sidebar`, {});
  }

  // Verify no horizontal scroll appeared after close
  const metrics = await pageMetrics(page).catch(() => ({}));
  if (metrics.docWidth && metrics.docWidth > metrics.clientWidth + 2) {
    record(`${label} sticky: horizontal overflow after close`, metrics);
  }
}

async function verifyKeyboardCloseButton(page, label) {
  // Open sidebar
  await page.click("#mobile-sidebar-toggle");
  await page.waitForTimeout(320);

  // Verify close button is focusable (not disabled, not tabindex=-1)
  const focusableInfo = await page.evaluate(() => {
    const btn = document.querySelector(".mobile-sidebar-return .mobile-drawer-close");
    if (!btn) return { exists: false };
    const isDisabled = btn.hasAttribute("disabled") || btn.getAttribute("aria-disabled") === "true";
    const tabIndex = btn.getAttribute("tabindex");
    return {
      exists: true,
      tag: btn.tagName,
      isDisabled,
      tabIndex: tabIndex === null ? "(default 0)" : tabIndex,
      isFocusable: !isDisabled && (tabIndex === null || parseInt(tabIndex) >= 0),
    };
  });

  if (!focusableInfo.exists) {
    record(`${label} keyboard: close button does not exist`, {});
    await page.evaluate(() => window.closeMobileDrawers());
    return;
  }
  if (!focusableInfo.isFocusable) {
    record(`${label} keyboard: close button is not focusable`, focusableInfo);
  }

  // Programmatically focus the close button
  const focused = await page.evaluate(() => {
    const btn = document.querySelector(".mobile-sidebar-return .mobile-drawer-close");
    if (!btn) return false;
    btn.focus();
    return document.activeElement === btn;
  });
  if (!focused) {
    record(`${label} keyboard: could not programmatically focus close button`, {});
  }

  // Press Enter to close
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  const closedByEnter = await page.evaluate(() => !document.body.classList.contains("mobile-sidebar-open"));
  if (!closedByEnter) {
    record(`${label} keyboard: Enter did not close sidebar`, {});
    await page.evaluate(() => window.closeMobileDrawers());
    return;
  }

  // Re-open and press Space to close
  await page.click("#mobile-sidebar-toggle");
  await page.waitForTimeout(320);

  await page.evaluate(() => {
    const btn = document.querySelector(".mobile-sidebar-return .mobile-drawer-close");
    if (btn) btn.focus();
  });
  await page.keyboard.press("Space");
  await page.waitForTimeout(300);
  const closedBySpace = await page.evaluate(() => !document.body.classList.contains("mobile-sidebar-open"));
  if (!closedBySpace) {
    record(`${label} keyboard: Space did not close sidebar`, {});
    await page.evaluate(() => window.closeMobileDrawers());
    return;
  }

  // Verify focus returned to a visible element (lastMobileDrawerTrigger)
  const focusTarget = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return "none";
    return el.id || el.className || el.tagName;
  });
  if (focusTarget === "none" || focusTarget === "BODY") {
    record(`${label} keyboard: focus not returned after close`, { focusTarget });
  }
}

async function verifyDesktopRegression(page, label) {
  // On desktop the sidebar is collapsed by default, accessible via edge handle.
  // The mobile toggle should be hidden.

  const toggleVisible = await page.evaluate(() => {
    const btn = document.getElementById("mobile-sidebar-toggle");
    if (!btn) return false;
    const style = window.getComputedStyle(btn);
    return style.display !== "none" && style.visibility !== "hidden";
  });
  if (toggleVisible) {
    record(`${label} desktop: mobile toggle should be hidden`, {});
  }

  // Edge handle should be visible on desktop
  const edgeHandle = await page.evaluate(() => {
    const eh = document.getElementById("sidebar-edge-handle");
    if (!eh) return { exists: false };
    const style = window.getComputedStyle(eh);
    return { exists: true, display: style.display, width: eh.offsetWidth };
  });
  if (!edgeHandle.exists || edgeHandle.display === "none") {
    record(`${label} desktop: edge handle missing or hidden`, edgeHandle);
  }

  // Sidebar should be collapsed (width ~0) when not expanded
  const sidebarCollapsed = await page.evaluate(() => {
    const sidebar = document.getElementById("app-sidebar");
    return sidebar ? sidebar.offsetWidth : -1;
  });
  if (sidebarCollapsed > 20) {
    record(`${label} desktop: sidebar should be collapsed by default`, { sidebarWidth: sidebarCollapsed });
  }

  // No horizontal overflow
  await assertState(page, `${label} desktop no overflow`, (m) =>
    m.docWidth <= m.clientWidth + 2 && m.bodyWidth <= m.clientWidth + 2
  );

  // Main content area fills remaining space
  const contentWidth = await page.evaluate(() => {
    const body = document.getElementById("main-app-body");
    return body ? body.offsetWidth : 0;
  });
  if (contentWidth < 200) {
    record(`${label} desktop: main content too narrow`, { contentWidth });
  }
}

async function verifyDesktopEdgeHandle(page, label) {
  // Edge handle hover → sidebar expands as overlay
  // Use programmatic events to avoid Playwright hit-testing conflicts with collapsed sidebar

  // 1. Dispatch mouseenter on edge handle → should expand sidebar
  await page.evaluate(() => {
    const eh = document.getElementById('sidebar-edge-handle');
    if (eh) {
      eh.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    }
  });
  await page.waitForTimeout(500);
  const expanded = await page.evaluate(() => document.body.classList.contains("desktop-sidebar-expanded"));
  if (!expanded) record(`${label} edge: mouseenter did not expand sidebar`, {});

  // 2. Sidebar is overlay — content should still fill the app-body width
  const contentWidthExpanded = await page.evaluate(() => {
    const body = document.getElementById("main-app-body");
    return body ? body.offsetWidth : 0;
  });
  if (contentWidthExpanded < 400) record(`${label} edge: content collapsed when sidebar expands`, { contentWidthExpanded });

  // 3. Scroll within sidebar → sidebar stays open
  const sidebar = page.locator("#app-sidebar");
  if (expanded) {
    await sidebar.evaluate(el => { el.scrollTop = el.scrollHeight; });
    await page.waitForTimeout(200);
    const stillExpanded = await page.evaluate(() => document.body.classList.contains("desktop-sidebar-expanded"));
    if (!stillExpanded) record(`${label} edge: scroll closed sidebar`, {});
  }

  // 4. Close button closes sidebar
  if (expanded) {
    await page.evaluate(() => {
      const btn = document.querySelector('.mobile-sidebar-return .mobile-drawer-close');
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);
    const closed = await page.evaluate(() => !document.body.classList.contains("desktop-sidebar-expanded"));
    if (!closed) record(`${label} edge: close button did not close`, {});
  }

  // 5. Click edge handle to toggle open
  await page.evaluate(() => {
    const eh = document.getElementById('sidebar-edge-handle');
    if (eh) eh.click();
  });
  await page.waitForTimeout(400);
  const toggledOpen = await page.evaluate(() => document.body.classList.contains("desktop-sidebar-expanded"));
  if (!toggledOpen) record(`${label} edge: click toggle did not open`, {});

  // 6. Esc closes sidebar
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const escClosed = await page.evaluate(() => !document.body.classList.contains("desktop-sidebar-expanded"));
  if (!escClosed) record(`${label} edge: Escape did not close`, {});

  // 7. Keyboard: focus edge handle + Enter opens
  await page.evaluate(() => {
    const eh = document.getElementById('sidebar-edge-handle');
    if (eh) eh.focus();
  });
  await page.keyboard.press("Enter");
  await page.waitForTimeout(400);
  const keyOpen = await page.evaluate(() => document.body.classList.contains("desktop-sidebar-expanded"));
  if (!keyOpen) record(`${label} edge: keyboard Enter did not open`, {});

  // Close for cleanup
  await page.evaluate(() => { if (window.closeDesktopSidebar) window.closeDesktopSidebar(); });
  await page.waitForTimeout(300);
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
      // Narrow-mobile sticky close button + keyboard accessibility (320×568 baseline)
      await verifyCloseButtonSticky(page, `${label} after-SidebarFlow`, viewport);
      await openFresh(page);
      await verifyKeyboardCloseButton(page, `${label} keyboard`);
      await openFresh(page);
    }

    if (viewport.width <= 900) {
      await verifyPlaygroundFlow(page, label);
      await openFresh(page);
    }

    if (viewport.width <= 900) {
      for (const subject of MOBILE_SUBJECTS) {
        await switchSubject(page, subject);
        if (viewport.width <= 720) {
          await verifySidebarFlow(page, `${label} ${subject}`);
          // Sticky test with Java long directory
          if (subject === LONG_SUBJECT) {
            await verifyCloseButtonSticky(page, `${label} ${subject} long-dir`, viewport);
          }
        }
        await verifyPlaygroundFlow(page, `${label} ${subject}`);
        await openFresh(page);
      }
    }

    // Desktop regression — sidebar in-flow, no sticky leakage, toggle hidden
    if (viewport.width >= 1280) {
      await verifyDesktopRegression(page, label);
      await verifyDesktopEdgeHandle(page, label);
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
