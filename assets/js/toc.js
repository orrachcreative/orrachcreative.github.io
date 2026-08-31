// Highlights the active jump-nav link as the reader scrolls through sections.
(function () {
  var sections = document.querySelectorAll('.cs-section[id]');
  var links = document.querySelectorAll('.cs-toc a[href^="#"]');
  if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

  var linkByHash = {};
  links.forEach(function (link) {
    linkByHash[link.getAttribute('href')] = link;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var link = linkByHash['#' + entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach(function (section) { observer.observe(section); });
})();
