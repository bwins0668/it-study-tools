/* Study Tools Web 鐢?Lightweight version metadata (no framework, no app.js dep) */
(function () {
  "use strict";

  window.STUDY_TOOLS_VERSION = {
    webVersion: "v2026.6.20-r-locale-nav-compare-hotfix1",
    desktopVersion: "v2026.6.20-r-pc-locale-nav-compare-hotfix1",
    releaseUrl: "https://github.com/bwins0668/it-study-tools/releases/tag/v2026.6.20-r-pc-locale-nav-compare-hotfix1",
    webUrl: "https://study-tools-web-pages.pages.dev",
    stage: "stable",
    assetVersion: "v2026.6.20-r-locale-nav-compare-hotfix1"
  };

  function applyVersionInfo() {
    var versionEls = document.querySelectorAll("[data-study-tools-version]");
    versionEls.forEach(function (el) {
      if (el === document.documentElement) return;
      el.textContent = window.STUDY_TOOLS_VERSION.webVersion;
    });

    var desktopEls = document.querySelectorAll("[data-study-tools-desktop-version]");
    desktopEls.forEach(function (el) {
      el.textContent = window.STUDY_TOOLS_VERSION.desktopVersion;
    });

    var releaseLinks = document.querySelectorAll("[data-study-tools-release-link]");
    releaseLinks.forEach(function (link) {
      link.setAttribute("href", window.STUDY_TOOLS_VERSION.releaseUrl);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyVersionInfo);
  } else {
    applyVersionInfo();
  }
})();
