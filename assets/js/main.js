(function () {
  "use strict";

  // Theme toggle. The initial data-theme attribute is already applied by
  // an inline script in <head> (before first paint) — this just wires up
  // the click handler and keeps the toggle icon/aria state in sync.
  var root = document.documentElement;

  function syncToggleUI() {
    var isLight = root.getAttribute("data-theme") === "light";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(isLight));
      var icon = btn.querySelector("[data-theme-icon]");
      if (icon) icon.innerHTML = isLight ? SUN_SVG : MOON_SVG;
    });
  }

  var MOON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 14.2A8.5 8.5 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2z"/></svg>';
  var SUN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2.5 12H5M19 12h2.5M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke-linecap="round"/></svg>';

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      var next = current === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("aoc-theme", next);
      } catch (e) {}
      syncToggleUI();
    });
  });

  syncToggleUI();

  // Mobile menu drawer
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var drawer = document.querySelector("[data-mobile-drawer]");
  if (menuToggle && drawer) {
    menuToggle.addEventListener("click", function () {
      var isOpen = drawer.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Case-study sidebar: highlight the section in view
  var sidebarLinks = document.querySelectorAll(".case-sidebar a");
  if (sidebarLinks.length) {
    var sections = Array.prototype.map.call(sidebarLinks, function (link) {
      return document.querySelector(link.getAttribute("href"));
    });

    var setActive = function () {
      var pos = window.scrollY + window.innerHeight * 0.3;
      var activeIndex = 0;
      sections.forEach(function (section, i) {
        if (section && section.offsetTop <= pos) activeIndex = i;
      });
      sidebarLinks.forEach(function (link, i) {
        link.classList.toggle("is-active", i === activeIndex);
      });
    };

    document.addEventListener("scroll", setActive, { passive: true });
    setActive();
  }
})();
