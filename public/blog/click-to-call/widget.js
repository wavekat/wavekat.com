/* Interactive widgets for the click-to-call deep dive (/blog/how-click-to-call-works/).
 *
 *   1. Parser playground  [data-wk-parser]   — a faithful port of the app's
 *      parseDialUrl(), instrumented to report every stage it runs, so a reader
 *      can feed it a hostile string and watch exactly where it dies.
 *   2. Delivery pipeline  [data-wk-pipeline] — walks a clicked URL from the
 *      browser to the New Call sheet along whichever of the three OS delivery
 *      paths is selected.
 *
 * This script writes NO user-visible prose. Stage names, step names, button
 * labels and payloads all live in the post's HTML; the handful of fragments
 * the script does have to compose (a removed-character count, a verdict line)
 * come from data-* attributes on the widget root. A translated post therefore
 * translates its own markup and reuses this file untouched.
 *
 * Vanilla and dependency-free on purpose: it's loaded with a plain <script src>
 * from a markdown file, so Astro never bundles or transforms it.
 */
(function () {
  'use strict';

  /** Mirrors DIAL_URL_MAX_LENGTH in the app's dial-url.ts. */
  var MAX_LENGTH = 512;
  var SCHEME_RE = /^(tel|sip|sips):(.*)$/i;
  var CONTROL_RE = /[\u0000-\u001f\u007f]/g;

  /** Every stage id the trace can report, in display order. */
  var STAGE_IDS = [
    'length',
    'control',
    'scheme',
    'sipshape',
    'params',
    'decode',
    'separators',
    'shape',
  ];

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Read the widget's translatable word list, with English fallbacks. */
  function words(root) {
    return {
      none: root.getAttribute('data-w-none') || 'none',
      removed: root.getAttribute('data-w-removed') || 'removed {n}',
      rejected: root.getAttribute('data-w-rejected') || 'rejected',
      pass: root.getAttribute('data-msg-pass') || 'Dials',
      fail: root.getAttribute('data-msg-fail') || 'Dropped. Nothing is dialed.',
    };
  }

  /* ── Parser ───────────────────────────────────────────────────────── */

  /**
   * Run the parse, recording each stage's outcome.
   *
   * Stage order is the code's order, not a tidied-up teaching order: the
   * cheapest rejections (length, control characters) run before anything
   * touches the string's meaning. Returns { stages, result }, where result is
   * the dial string or null — the same value parseDialUrl() returns.
   */
  function trace(raw, w) {
    var stages = {};
    function set(id, status, detail) {
      stages[id] = { status: status, detail: detail == null ? '' : String(detail) };
    }
    function done(result) {
      for (var i = 0; i < STAGE_IDS.length; i++) {
        if (!stages[STAGE_IDS[i]]) set(STAGE_IDS[i], 'skip', '');
      }
      return { stages: stages, result: result };
    }

    if (typeof raw !== 'string' || raw.length === 0 || raw.length > MAX_LENGTH) {
      set('length', 'fail', (raw ? raw.length : 0) + ' / ' + MAX_LENGTH);
      return done(null);
    }
    set('length', 'pass', raw.length + ' / ' + MAX_LENGTH);

    // Control characters can't appear in a legitimate phone link. Strip rather
    // than reject, so a stray \r from a shell relay doesn't kill a valid URL.
    var found = raw.match(CONTROL_RE);
    var cleaned = raw.replace(CONTROL_RE, '').trim();
    set(
      'control',
      'pass',
      found ? w.removed.replace('{n}', String(found.length)) : w.none,
    );

    var m = SCHEME_RE.exec(cleaned);
    if (!m) {
      set('scheme', 'fail', w.rejected);
      return done(null);
    }
    var scheme = (m[1] || '').toLowerCase();
    // Windows shell relays are known to append a trailing slash to protocol
    // URLs ("tel:+123/"); it's never meaningful in a phone link.
    var rest = (m[2] || '').replace(/\/+$/, '');
    set('scheme', 'pass', scheme);

    if (scheme === 'sip' || scheme === 'sips') {
      // Pass the URI through whole — the daemon already accepts
      // sip:alice@example.com — but require a user@host shape first, so a bare
      // "sip:" or "sip:;evil" doesn't get through.
      if (!/^[^@\s;]+@[^@\s;]+/.test(rest)) {
        set('sipshape', 'fail', rest || w.none);
        return done(null);
      }
      set('sipshape', 'pass', rest);
      return done(scheme + ':' + rest);
    }

    // tel: — cut RFC 3966 parameters, percent-decode, then drop the visual
    // separators phone books use. Same normalization the dial field applies.
    var number = rest.split(';')[0] || '';
    set('params', 'pass', number || w.none);

    try {
      number = decodeURIComponent(number);
    } catch (e) {
      // Malformed percent-encoding — keep the raw text and let the shape check
      // below reject it if it isn't dialable as-is.
    }
    set('decode', 'pass', number || w.none);

    number = number.replace(/[\s\-().]/g, '');
    set('separators', 'pass', number || w.none);

    // Optional leading +, then digits plus the * / # service-code characters,
    // and at least one actual digit.
    if (!/^\+?[0-9*#]+$/.test(number) || !/[0-9]/.test(number)) {
      set('shape', 'fail', number || w.none);
      return done(null);
    }
    set('shape', 'pass', number);
    return done(number);
  }

  function initParser(root) {
    var input = root.querySelector('[data-wk-input]');
    var stageEls = root.querySelectorAll('[data-stage]');
    var verdict = root.querySelector('[data-wk-verdict]');
    var verdictValue = root.querySelector('[data-wk-verdict-value]');
    var verdictText = root.querySelector('[data-wk-verdict-text]');
    var presets = root.querySelectorAll('[data-wk-presets] button');
    if (!input || !verdict) return;
    var w = words(root);

    function paint() {
      var out = trace(input.value, w);

      for (var i = 0; i < stageEls.length; i++) {
        var li = stageEls[i];
        var stage = out.stages[li.getAttribute('data-stage')];
        var mark = li.querySelector('.wk-st-mark');
        var val = li.querySelector('.wk-st-val');
        li.classList.remove('is-pass', 'is-fail', 'is-skip');
        if (!stage || stage.status === 'skip') {
          li.classList.add('is-skip');
          if (mark) mark.textContent = '·';
          if (val) val.textContent = '';
        } else {
          li.classList.add('is-' + stage.status);
          if (mark) mark.textContent = stage.status === 'pass' ? '✓' : '✗';
          if (val) val.textContent = stage.detail;
        }
      }

      var ok = out.result !== null;
      verdict.classList.toggle('is-pass', ok);
      verdict.classList.toggle('is-fail', !ok);
      if (verdictText) verdictText.textContent = ok ? w.pass : w.fail;
      if (verdictValue) verdictValue.textContent = ok ? out.result : '';

      // Mark whichever preset matches what's currently in the field.
      for (var p = 0; p < presets.length; p++) {
        presets[p].setAttribute(
          'aria-pressed',
          presets[p].getAttribute('data-v') === input.value ? 'true' : 'false',
        );
      }
    }

    input.addEventListener('input', paint);
    for (var p = 0; p < presets.length; p++) {
      presets[p].addEventListener('click', function () {
        input.value = this.getAttribute('data-v') || '';
        paint();
        input.focus();
      });
    }

    root.classList.remove('wk-nojs');
    paint();
  }

  /* ── Pipeline ─────────────────────────────────────────────────────── */

  function initPipeline(root) {
    var tracks = root.querySelectorAll('[data-wk-tracks] button');
    var run = root.querySelector('[data-wk-run]');
    var steps = root.querySelectorAll('[data-step]');
    var payload = root.querySelector('[data-wk-payload]');
    if (!run || !steps.length) return;

    var timers = [];
    var current =
      (tracks[0] && tracks[0].getAttribute('data-track')) || 'macos';

    function visible() {
      var out = [];
      for (var i = 0; i < steps.length; i++) {
        var on = (steps[i].getAttribute('data-tracks') || '').split(/\s+/);
        if (on.indexOf(current) !== -1) out.push(steps[i]);
      }
      return out;
    }

    function reset() {
      for (var t = 0; t < timers.length; t++) clearTimeout(timers[t]);
      timers = [];
      for (var i = 0; i < steps.length; i++) {
        steps[i].classList.remove('is-active', 'is-done', 'is-last');
        steps[i].hidden = true;
      }
      var shown = visible();
      for (var j = 0; j < shown.length; j++) {
        shown[j].hidden = false;
        var dot = shown[j].querySelector('.wk-dot');
        if (dot) dot.textContent = String(j + 1);
      }
      if (shown.length) shown[shown.length - 1].classList.add('is-last');
      if (payload) payload.textContent = payload.getAttribute('data-idle') || '—';
      run.disabled = false;
    }

    function play() {
      reset();
      var shown = visible();
      run.disabled = true;
      var step = reduceMotion ? 0 : 620;

      shown.forEach(function (li, i) {
        timers.push(
          setTimeout(function () {
            if (i > 0) {
              shown[i - 1].classList.remove('is-active');
              shown[i - 1].classList.add('is-done');
            }
            li.classList.add('is-active');
            var p = li.getAttribute('data-payload');
            if (payload && p !== null) payload.textContent = p;
          }, step * i),
        );
      });

      timers.push(
        setTimeout(
          function () {
            var last = shown[shown.length - 1];
            if (last) {
              last.classList.remove('is-active');
              last.classList.add('is-done');
            }
            run.disabled = false;
          },
          step * shown.length + (reduceMotion ? 0 : 200),
        ),
      );
    }

    for (var i = 0; i < tracks.length; i++) {
      tracks[i].addEventListener('click', function () {
        current = this.getAttribute('data-track') || current;
        for (var k = 0; k < tracks.length; k++) {
          tracks[k].setAttribute(
            'aria-pressed',
            tracks[k] === this ? 'true' : 'false',
          );
        }
        reset();
      });
    }
    run.addEventListener('click', play);

    root.classList.remove('wk-nojs');
    reset();
  }

  /* ── Boot ─────────────────────────────────────────────────────────── */

  function boot() {
    var p = document.querySelectorAll('[data-wk-parser]');
    for (var i = 0; i < p.length; i++) initParser(p[i]);
    var q = document.querySelectorAll('[data-wk-pipeline]');
    for (var j = 0; j < q.length; j++) initPipeline(q[j]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
