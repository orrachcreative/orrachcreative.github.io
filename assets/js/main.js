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

  // Full-screen slide-out menu
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var menuIcon = document.querySelector("[data-menu-icon]");
  var menu = document.querySelector("[data-site-menu]");
  var backdrop = document.querySelector("[data-menu-backdrop]");
  var header = document.querySelector(".site-header");

  var MENU_OPEN_INNER =
    '<span class="menu-toggle__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" stroke-linecap="round"/></svg></span>' +
    '<span class="menu-toggle__label">Menu</span>';
  var MENU_CLOSE_INNER =
    '<span class="menu-toggle__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke-linecap="round"/></svg></span>';

  if (menuToggle && menuIcon && menu && header) {
    var isMenuOpen = false;

    var openMenu = function () {
      isMenuOpen = true;
      menu.classList.add("is-open");
      menu.removeAttribute("inert");
      header.classList.add("is-menu-open");
      menuToggle.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close menu");
      menuIcon.innerHTML = MENU_CLOSE_INNER;
      if (backdrop) backdrop.classList.add("is-open");
      document.body.classList.add("menu-open");
    };

    var closeMenu = function () {
      isMenuOpen = false;
      menu.classList.remove("is-open");
      menu.setAttribute("inert", "");
      header.classList.remove("is-menu-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      menuIcon.innerHTML = MENU_OPEN_INNER;
      if (backdrop) backdrop.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };

    menuToggle.addEventListener("click", function () {
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (backdrop) backdrop.addEventListener("click", closeMenu);

    menu.querySelectorAll(".site-menu__link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isMenuOpen) closeMenu();
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
