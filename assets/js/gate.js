(function () {
  "use strict";

  // Lightweight client-side preview gate — not real security, just keeps the
  // WIP site off casual passersby while it's still in progress. Anyone who
  // reads this source can find the password; that's an accepted tradeoff for
  // a static-hosting preview gate.
  //
  // To change the password: in a browser console run
  //   crypto.subtle.digest("SHA-256", new TextEncoder().encode("NEW_PASSWORD"))
  //     .then(b => console.log(Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,"0")).join("")))
  // and swap the hex string below.
  var PASSWORD_HASH = "255467ca2489cb6a048bf23e2e4db4236eac70f2dc6eba9e802194c21eeaa133";
  var STORAGE_KEY = "aoc-preview-unlocked";

  var root = document.documentElement;

  function reveal() {
    root.classList.remove("gate-locked");
    var overlay = document.getElementById("preview-gate");
    if (overlay) overlay.remove();
  }

  if (sessionStorage.getItem(STORAGE_KEY) === "1") {
    reveal();
    return;
  }

  async function hash(text) {
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.prototype.map
      .call(new Uint8Array(buf), function (b) {
        return b.toString(16).padStart(2, "0");
      })
      .join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("preview-gate-form");
    var input = document.getElementById("preview-gate-input");
    var error = document.getElementById("preview-gate-error");
    if (!form) {
      reveal();
      return;
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var attempt = await hash(input.value);
      if (attempt === PASSWORD_HASH) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        reveal();
      } else {
        error.hidden = false;
        input.value = "";
        input.focus();
      }
    });
  });
})();
