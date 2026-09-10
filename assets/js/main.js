(function () {
  "use strict";

  // Theme toggle — mechanism only. Light-mode token values are still TODO,
  // so this persists the choice but visually no-ops until that pass lands.
  var root = document.documentElement;
  var stored = localStorage.getItem("aoc-theme");
  if (stored) root.setAttribute("data-theme", stored);

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      var next = current === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("aoc-theme", next);
      btn.setAttribute("aria-pressed", String(next === "light"));
    });
  });

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
