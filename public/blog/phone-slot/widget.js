/* The one interactive figure for /blog/why-phone-links-dont-work/.
 *
 * All it does: switch device panels, and pre-select the panel matching the
 * visitor's own OS (with a small "yours" badge on that chip, text supplied by
 * the markup via data-w-yours). Every visible word lives in the post's HTML,
 * so a translated post localizes its own markup and reuses this file.
 *
 * Vanilla and dependency-free: loaded with a plain <script src> from a
 * markdown file, so Astro never bundles or transforms it.
 */
(function () {
  'use strict';

  /** Best-effort OS detection — only used to pick the starting panel. */
  function detectOs() {
    var ua = navigator.userAgent || '';
    if (/iPhone|Android.+Mobile/i.test(ua)) return 'phone';
    if (/Macintosh|Mac OS X/i.test(ua)) return 'mac';
    if (/Windows/i.test(ua)) return 'windows';
    if (/Linux|X11/i.test(ua)) return 'linux';
    return null;
  }

  function initSlot(root) {
    var chips = [].slice.call(root.querySelectorAll('[data-wk-os-chips] button'));
    var panels = [].slice.call(root.querySelectorAll('[data-os-panel]'));
    if (!chips.length || !panels.length) return;

    function select(os) {
      for (var i = 0; i < chips.length; i++) {
        chips[i].setAttribute(
          'aria-pressed',
          chips[i].getAttribute('data-os') === os ? 'true' : 'false',
        );
      }
      for (var j = 0; j < panels.length; j++) {
        panels[j].hidden = panels[j].getAttribute('data-os-panel') !== os;
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        select(chip.getAttribute('data-os'));
      });
    });

    // Start on the visitor's own device when we recognise it, and say so.
    var mine = detectOs();
    var yoursLabel = root.getAttribute('data-w-yours');
    var start = chips[0].getAttribute('data-os');
    if (mine) {
      for (var k = 0; k < chips.length; k++) {
        if (chips[k].getAttribute('data-os') === mine) {
          start = mine;
          if (yoursLabel) {
            var b = document.createElement('span');
            b.className = 'yours';
            b.textContent = yoursLabel;
            chips[k].appendChild(b);
          }
          break;
        }
      }
    }

    root.classList.remove('wk-nojs');
    select(start);
  }

  function boot() {
    var els = document.querySelectorAll('[data-wk-slot]');
    for (var i = 0; i < els.length; i++) initSlot(els[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
