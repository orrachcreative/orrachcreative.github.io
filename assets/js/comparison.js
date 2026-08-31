// Progressive enhancement for the reject/ship comparison component.
// Baseline (no JS): both images shown side by side with captions — fully accessible.
// Enhanced: a toggle reveals a drag slider (real <input type="range">) that overlays them.
(function () {
  document.querySelectorAll('[data-compare]').forEach(function (compare) {
    var toggle = compare.querySelector('[data-compare-toggle]');
    var slider = compare.querySelector('[data-compare-slider]');
    var shipPane = compare.querySelector('.compare-pane--ship');
    if (!toggle || !slider || !shipPane) return;

    function setClip(value) {
      shipPane.style.clipPath = 'inset(0 ' + (100 - value) + '% 0 0)';
    }

    toggle.addEventListener('click', function () {
      var active = compare.classList.toggle('is-sliding');
      toggle.setAttribute('aria-pressed', String(active));
      toggle.textContent = active ? 'View side by side' : 'Compare with slider';
      if (active) {
        setClip(slider.value);
        slider.focus();
      } else {
        shipPane.style.clipPath = '';
      }
    });

    slider.addEventListener('input', function () {
      setClip(slider.value);
    });
  });
})();
