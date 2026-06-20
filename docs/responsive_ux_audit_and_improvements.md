# Responsive UX Audit and Improvements

Round: Dual-Responsive-Gold-UX-FR-Full-Pack-And-Portable-Release
Date: 2026-06-20
Scope: Web first, then PC shared sync

## Audit Scope

Required viewport set:

- Phones: 320x568, 360x800, 375x667, 390x844, 393x852, 412x915, 414x896, 430x932
- Tablets: 768x1024, 820x1180
- Desktops: 1024x768, 1280x720, 1366x768, 1440x900

Required flows:

- Home to course content
- SQL, Java, and Python mobile course directory selection
- Sidebar open, close, directory item selection, and browser Back
- Playground open, close, and browser Back
- Language switcher
- Tools drawer, including settings entry visibility through the drawer
- Tablet and desktop layout checks

## Baseline Findings

| ID | Area | Repro | Finding | Risk |
| --- | --- | --- | --- | --- |
| RUX-01 | Mobile sidebar | 320-430px, open course directory | `#mobile-sidebar-toggle` did not maintain `aria-expanded` | Screen-reader and automated smoke state could not identify drawer state |
| RUX-02 | Mobile playground | 320-820px, open sandbox | `#mobile-playground-toggle` did not maintain `aria-expanded` | Same state problem for the sandbox drawer |
| RUX-03 | Drawer return path | 320-820px, open drawer | Sidebar and playground had no visible in-drawer close/return header | Users had to rely on backdrop or top bar only |
| RUX-04 | Browser Back | 320-430px, open sidebar then Back | Back could leave the app page instead of closing the drawer | Mobile navigation felt unsafe and non-native |
| RUX-05 | Course switching | Open playground, then choose a lesson | Lesson loaders only closed the left sidebar class | Overlay state could remain stale when moving between course content and sandbox |
| RUX-06 | Playground geometry | 320-820px, open sandbox | Fixed drawer inherited `height: 100%`, so `top:64px` pushed the bottom beyond the viewport | Bottom controls could be clipped on small screens |

## Implemented Improvements

| ID | Files | Fix |
| --- | --- | --- |
| RUX-01/RUX-02 | `assets/js/app.js`, `index.html` | Added centralized drawer state sync, `aria-controls`, `aria-expanded`, and `aria-hidden` updates |
| RUX-03 | `index.html`, `assets/css/index.css` | Added mobile-only drawer headers with localized close buttons for sidebar and playground |
| RUX-04 | `assets/js/app.js` | Added drawer history markers so browser Back closes the active mobile drawer without leaving the app |
| RUX-05 | `assets/js/app.js` | Unified SQL, Java, Python, IT Passport, and SG lesson loaders to close all mobile drawers |
| RUX-06 | `assets/css/index.css` | Reset mobile playground drawer height and max-height to fit below the header |
| RUX-07 | `tools/verify_responsive_navigation_smoke.js` | Added real Playwright navigation smoke for required viewports and workflows |
| RUX-08 | `tools/verify_responsive_visual_smoke.js` | Added real Playwright visual smoke for overflow, drawer geometry, and utility popover containment |

## Web Validation

Base URL: `http://127.0.0.1:5173`

- `node tools/verify_responsive_navigation_smoke.js --base-url http://127.0.0.1:5173`
  - Result: PASS
  - Coverage: 14 viewports, SQL/Java/Python mobile course flows, sidebar, playground, Back, language switch, tools drawer
- `node tools/verify_responsive_visual_smoke.js --base-url http://127.0.0.1:5173`
  - Result: PASS
  - Coverage: 14 viewports, SQL/Java/Python layouts, horizontal overflow, drawer geometry, language/tools containment

## PC Validation

Base URL: `http://127.0.0.1:5180`

- `node tools/verify_responsive_navigation_smoke.js --base-url http://127.0.0.1:5180`
  - Result: PASS
  - Coverage: 14 viewports, SQL/Java/Python mobile course flows, sidebar, playground, Back, language switch, tools drawer
- `node tools/verify_responsive_visual_smoke.js --base-url http://127.0.0.1:5180`
  - Result: PASS
  - Coverage: 14 viewports, SQL/Java/Python layouts, horizontal overflow, drawer geometry, language/tools containment

## Notes

- The Stage A changes do not modify service worker cache metadata, asset manifest, network logic, or localStorage persistence behavior.
- Existing Web and PC mobile layout smoke remain part of the final Stage A gate.
