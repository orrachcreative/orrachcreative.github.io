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
    '<svg width="48" height="49" viewBox="0 0 48 49" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M6.47114 29.8268C5.77098 29.8268 5.18409 29.59 4.71045 29.1163C4.23682 28.6427 4 28.0558 4 27.3557C4 26.6555 4.23682 26.0686 4.71045 25.595C5.18409 25.1213 5.77098 24.8845 6.47114 24.8845L41.5289 24.6786C42.229 24.6786 42.8159 24.9105 43.2895 25.3742C43.7632 25.838 44 26.4127 44 27.0982C44 27.7838 43.7632 28.3585 43.2895 28.8223C42.8159 29.286 42.229 29.5179 41.5289 29.5179L6.47114 29.8268ZM6.47114 17.4711C5.77098 17.4711 5.18409 17.2343 4.71045 16.7606C4.23682 16.287 4 15.7001 4 14.9999C4 14.2998 4.23682 13.7129 4.71045 13.2393C5.18409 12.7656 5.77098 12.5288 6.47114 12.5288L41.5289 12.5803C42.229 12.5803 42.8159 12.8122 43.2895 13.2759C43.7632 13.7397 44 14.3144 44 14.9999C44 15.6855 43.7632 16.2602 43.2895 16.724C42.8159 17.1877 42.229 17.4196 41.5289 17.4196L6.47114 17.4711ZM6.47114 5.11538C5.77098 5.11538 5.18409 4.87856 4.71045 4.40493C4.23682 3.93129 4 3.34439 4 2.64424C4 1.94408 4.23682 1.35718 4.71045 0.883549C5.18409 0.409913 5.77098 0.173096 6.47114 0.173096L41.5289 0.481987C42.229 0.481987 42.8159 0.713871 43.2895 1.17764C43.7632 1.64141 44 2.21608 44 2.90165C44 3.58722 43.7632 4.16189 43.2895 4.62565C42.8159 5.08942 42.229 5.32131 41.5289 5.32131L6.47114 5.11538Z" fill="#E7C642"/><path d="M2.11725 47.8269V36.6269H6.03725L7.97325 46.3869H8.26125L10.1973 36.6269H14.1173V47.8269H12.0693V38.1789H11.7813L9.86125 47.8269H6.37325L4.45325 38.1789H4.16525V47.8269H2.11725ZM16.7066 47.8269V36.6269H23.9066V38.5469H18.8186V41.2189H23.4586V43.1389H18.8186V45.9069H24.0026V47.8269H16.7066ZM26.046 47.8269V36.6269H30.062L32.286 46.3869H32.574V36.6269H34.654V47.8269H30.638L28.414 38.0669H28.126V47.8269H26.046ZM41.5648 48.0509C40.6474 48.0509 39.8581 47.8856 39.1968 47.5549C38.5461 47.2136 38.0448 46.7336 37.6928 46.1149C37.3514 45.4856 37.1808 44.7442 37.1808 43.8909V36.6269H39.2928V43.9549C39.2928 44.6376 39.4848 45.1762 39.8688 45.5709C40.2634 45.9656 40.8288 46.1629 41.5648 46.1629C42.3008 46.1629 42.8608 45.9656 43.2448 45.5709C43.6394 45.1762 43.8368 44.6376 43.8368 43.9549V36.6269H45.9488V43.8909C45.9488 44.7442 45.7728 45.4856 45.4208 46.1149C45.0794 46.7336 44.5781 47.2136 43.9168 47.5549C43.2661 47.8856 42.4821 48.0509 41.5648 48.0509Z" fill="#E7C642"/></svg>';
  var MENU_CLOSE_INNER =
    '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="46" height="46" rx="7" stroke="#E7C642" stroke-width="2"/><path d="M24 26.1293L16.5475 33.5817C16.2687 33.8606 15.9138 34 15.4829 34C15.052 34 14.6971 33.8606 14.4183 33.5817C14.1394 33.3029 14 32.948 14 32.5171C14 32.0862 14.1394 31.7313 14.4183 31.4525L21.8707 24L14.4183 16.5475C14.1394 16.2687 14 15.9138 14 15.4829C14 15.052 14.1394 14.6971 14.4183 14.4183C14.6971 14.1394 15.052 14 15.4829 14C15.9138 14 16.2687 14.1394 16.5475 14.4183L24 21.8707L31.4525 14.4183C31.7313 14.1394 32.0862 14 32.5171 14C32.948 14 33.3029 14.1394 33.5817 14.4183C33.8606 14.6971 34 15.052 34 15.4829C34 15.9138 33.8606 16.2687 33.5817 16.5475L26.1293 24L33.5817 31.4525C33.8606 31.7313 34 32.0862 34 32.5171C34 32.948 33.8606 33.3029 33.5817 33.5817C33.3029 33.8606 32.948 34 32.5171 34C32.0862 34 31.7313 33.8606 31.4525 33.5817L24 26.1293Z" fill="#E7C642"/></svg>';

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

  // Motion: page crossfade, scroll-reveal, and background parallax.
  // Everything here is skipped for reduced-motion users — root.classList
  // only carries "js-anim" when the head script already found no
  // reduced-motion preference, so this whole block simply never runs for
  // them (the CSS behind it is also gated the same way as a second layer).
  if (root.classList.contains("js-anim")) {
    var mainEl = document.querySelector("main");

    if (mainEl) {
      requestAnimationFrame(function () {
        mainEl.classList.add("is-visible");
      });
    }

    document.addEventListener("click", function (e) {
      var link = e.target.closest("a[href]");
      if (!link) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      var href = link.getAttribute("href");
      if (!href || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) return;

      var url;
      try {
        url = new URL(link.href, window.location.href);
      } catch (err) {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;

      e.preventDefault();
      document.body.classList.add("page-leaving");
      setTimeout(function () {
        window.location.href = link.href;
      }, 200);
    });

    // Scroll-reveal: tag common content blocks and fade/slide each in the
    // first time it enters the viewport. Deliberately excludes case-study
    // body content (.case-section / .decision-block / .compare): those are
    // reached via the case-sidebar's anchor links, whose jump is instant
    // (no scroll-behavior: smooth), so a section can get skipped over
    // entirely without ever intersecting the viewport and stay invisible
    // forever. This selector only covers content reached by ordinary
    // top-to-bottom scrolling, where that failure mode can't happen.
    var revealEls = document.querySelectorAll(
      ".work-card, .about-row, .logo-grid__item, .closing-cta, .gallery-scroll > .work-card__media"
    );

    if (revealEls.length && "IntersectionObserver" in window) {
      var groupCounts = new Map();
      revealEls.forEach(function (el) {
        el.setAttribute("data-reveal", "");
        var parent = el.parentElement;
        var idx = groupCounts.get(parent) || 0;
        el.style.transitionDelay = Math.min(idx, 4) * 0.12 + "s";
        groupCounts.set(parent, idx + 1);
      });

      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var el = entry.target;
              // Once the fade-in genuinely finishes, drop data-reveal so
              // the element's own (fast) transition governs hover again
              // instead of staying locked to this slow entrance duration.
              el.addEventListener("transitionend", function onEnd(ev) {
                if (ev.propertyName !== "opacity") return;
                el.removeEventListener("transitionend", onEnd);
                el.removeAttribute("data-reveal");
              });
              el.classList.add("is-revealed");
              io.unobserve(el);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );

      revealEls.forEach(function (el) {
        io.observe(el);
      });
    }

    // Safety net: any same-page anchor jump (like the case-sidebar links)
    // is instant, so it can skip over a data-reveal element without ever
    // intersecting it. Force-reveal everything the moment such a link is
    // used, since a visitor jumping around non-linearly should never find
    // content stuck invisible.
    if (sidebarLinks.length) {
      sidebarLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          document.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach(function (el) {
            el.classList.add("is-revealed");
          });
        });
      });
    }

    // Subtle parallax on any section carrying its own background-image
    // (the About hero, and <main> on the home page).
    var parallaxEls = Array.prototype.slice.call(document.querySelectorAll(".bg-image-section"));
    if (mainEl && mainEl.style.backgroundImage) parallaxEls.push(mainEl);
    parallaxEls = parallaxEls.filter(function (el) {
      return !!el.style.backgroundImage;
    });

    if (parallaxEls.length) {
      var ticking = false;
      var updateParallax = function () {
        parallaxEls.forEach(function (el) {
          var offset = el.getBoundingClientRect().top * 0.15;
          el.style.backgroundPosition = "center calc(50% + " + -offset + "px)";
        });
        ticking = false;
      };
      document.addEventListener(
        "scroll",
        function () {
          if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
          }
        },
        { passive: true }
      );
      updateParallax();
    }
  }
})();
