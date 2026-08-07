/* The one interactive figure for /blog/the-space-that-broke-our-app/.
 *
 * Takes "the first word" of a line the way the real checker does — splitting on
 * whitespace without honouring quotes — and shows what that produces for our
 * app's location versus the same location without a space in it.
 *
 * Writes no user-visible prose. Labels live in the post's HTML; the few words
 * it has to choose between (found / not found, and the two verdicts) come from
 * data-* attributes on the widget. A translated post therefore translates its
 * own markup and reuses this file untouched.
 *
 * Vanilla and dependency-free: it's loaded with a plain <script src> from a
 * markdown file, so Astro never bundles or transforms it.
 */
(function () {
  'use strict';

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * The bug, in one function: split on whitespace and take the first piece,
   * with no idea that a quote is supposed to hold a path together.
   */
  function firstWord(line) {
    return line.trim().split(/\s+/)[0] || '';
  }

  /**
   * How the packaging tool writes the Exec line. A path that isn't purely
   * [/0-9A-Za-z._-] gets wrapped in quotes — which is correct for a shell, and
   * invisible to a splitter that doesn't parse quotes.
   */
  function execLine(path) {
    var safe = /^[/0-9A-Za-z._-]+$/.test(path);
    return 'Exec=' + (safe ? path : '"' + path + '"') + ' %U';
  }

  function initSplit(root) {
    var chips = root.querySelectorAll('[data-wk-paths] button');
    var lineEl = root.querySelector('[data-wk-line]');
    var run = root.querySelector('[data-wk-run]');
    var rows = root.querySelectorAll('[data-wk-out] li');
    if (!lineEl || !run || !rows.length) return;

    var w = {
      notFound: root.getAttribute('data-w-notfound') || 'no such file or directory',
      found: root.getAttribute('data-w-found') || 'found',
      fail: root.getAttribute('data-w-fail') || 'reports failure',
      ok: root.getAttribute('data-w-ok') || 'reports success',
    };

    var path =
      (chips[0] && chips[0].getAttribute('data-path')) ||
      '/opt/WaveKat Voice/@wavekatvoice-desktop';
    var timers = [];

    function slot(name) {
      var li = root.querySelector('[data-out="' + name + '"]');
      return { li: li, val: li && li.querySelector('[data-slot]') };
    }

    function reset() {
      timers.forEach(clearTimeout);
      timers = [];
      root.classList.remove('ran');

      // Render the line as: prefix + first token + the rest, so the token can
      // be highlighted in place and the remainder dimmed.
      var line = execLine(path);
      var tok = firstWord(line.slice('Exec='.length));
      var head = 'Exec=';
      var rest = line.slice(head.length + tok.length);
      var broke = tok !== '"' + path + '"' && tok !== path;

      lineEl.textContent = '';
      lineEl.appendChild(document.createTextNode(head));
      var tokEl = document.createElement('span');
      tokEl.className = 'tok ' + (broke ? 'bad' : 'good');
      tokEl.textContent = tok;
      lineEl.appendChild(tokEl);
      var restEl = document.createElement('span');
      restEl.className = 'rest';
      restEl.textContent = rest;
      lineEl.appendChild(restEl);

      for (var i = 0; i < rows.length; i++) {
        rows[i].classList.remove('shown', 'is-pass', 'is-fail');
        var v = rows[i].querySelector('[data-slot]');
        if (v) v.textContent = '';
        var m = rows[i].querySelector('.mk');
        if (m) m.textContent = '·';
      }
      run.disabled = false;
      return { tok: tok, broke: broke };
    }

    function play() {
      var state = reset();
      run.disabled = true;
      root.classList.add('ran');

      var steps = [
        function () {
          var s = slot('split');
          if (s.val) s.val.textContent = state.tok;
          s.li.classList.add('shown', state.broke ? 'is-fail' : 'is-pass');
          s.li.querySelector('.mk').textContent = state.broke ? '✗' : '✓';
        },
        function () {
          var s = slot('which');
          if (s.val) {
            s.val.textContent = state.broke
              ? state.tok + ': ' + w.notFound
              : state.tok + ': ' + w.found;
          }
          s.li.classList.add('shown', state.broke ? 'is-fail' : 'is-pass');
          s.li.querySelector('.mk').textContent = state.broke ? '✗' : '✓';
        },
        function () {
          var s = slot('verdict');
          if (s.val) s.val.textContent = state.broke ? w.fail : w.ok;
          s.li.classList.add('shown', state.broke ? 'is-fail' : 'is-pass');
          s.li.querySelector('.mk').textContent = state.broke ? '✗' : '✓';
          run.disabled = false;
        },
      ];

      var gap = reduceMotion ? 0 : 700;
      steps.forEach(function (fn, i) {
        timers.push(setTimeout(fn, gap * (i + 1)));
      });
    }

    for (var i = 0; i < chips.length; i++) {
      chips[i].addEventListener('click', function () {
        path = this.getAttribute('data-path') || path;
        for (var k = 0; k < chips.length; k++) {
          chips[k].setAttribute(
            'aria-pressed',
            chips[k] === this ? 'true' : 'false',
          );
        }
        reset();
      });
    }
    run.addEventListener('click', play);

    root.classList.remove('wk-nojs');
    reset();
  }

  function boot() {
    var els = document.querySelectorAll('[data-wk-split]');
    for (var i = 0; i < els.length; i++) initSplit(els[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
