/* =========================================================
   CompliVerse AI · Draft 4 v2 · loop.js (core-owned)
   The 360° loop on index.html and platform/index.html.
   Without JS (or on small screens / reduced motion) the loop is a
   static sequence. Debug params: ?step=N (0-6) forces station N;
   ?static forces the static layout; ?step=N&solo hides the rest.
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  var params = new URLSearchParams(window.location.search);
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  function smoothstep(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  function listen(mq, fn) { if (mq.addEventListener) mq.addEventListener('change', fn); else if (mq.addListener) mq.addListener(fn); }

  /* ---------- The 360° loop (from Drop 03) ----------
     t = how far the tall section has scrolled past the top (0..1),
     mapped to a station position 0..6 with dwell at both ends and a
     hold at each station. No scroll-jacking: the page scrolls
     natively and we only read the position on rAF. */
  function initLoop() {
    var loop = document.querySelector('[data-loop]');
    if (!loop) return;

    var LAST = 6;
    var PAD = 0.45;
    var HOLD = 0.3;
    var CENTER = [
      ['Framework', 'demands → Policy'],
      ['Policy', 'implements → Control'],
      ['Control', 'proven by → Evidence'],
      ['Evidence', 'exposes → Risk'],
      ['Risk', 'tested in → Audit'],
      ['Audit', 'closes back to → Framework'],
      ['Framework', 'loop closed ↺ and around again']
    ];

    var steps = loop.querySelectorAll('.loop-step');
    var progress = loop.querySelector('.ring-progress');
    var record = loop.querySelector('.ring-record');
    var dots = loop.querySelectorAll('.ring-station');
    var verbs = loop.querySelectorAll('.ring-verb');
    var labels = loop.querySelectorAll('.ring-label');
    var pagers = loop.querySelectorAll('.pager-btn');
    var rcWord = loop.querySelector('[data-rc-word]');
    var rcNext = loop.querySelector('[data-rc-next]');

    var pinMQ = window.matchMedia('(min-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)');
    var stepParam = params.get('step');
    var forced = stepParam !== null && /^[0-6]$/.test(stepParam) ? Number(stepParam) : null;
    var forceStatic = params.has('static');
    var pinned = false;
    var active = -1;
    var ticking = false;

    function travel() { return Math.max(1, loop.offsetHeight - window.innerHeight); }
    function loopTop() { return loop.getBoundingClientRect().top + window.pageYOffset; }
    function posFromScroll() {
      var t = clamp(-loop.getBoundingClientRect().top / travel(), 0, 1);
      var raw = clamp(t * (LAST + 2 * PAD) - PAD, 0, LAST);
      var i = Math.min(Math.floor(raw), LAST - 1);
      return i + smoothstep(HOLD, 1 - HOLD, raw - i);
    }
    function yForStep(n) { return loopTop() + ((n + PAD) / (LAST + 2 * PAD)) * travel(); }

    function setActive(n) {
      if (n === active) return;
      active = n;
      each(steps, function (s, k) { s.classList.toggle('is-active', k === n); });
      each(pagers, function (b) {
        var g = Number(b.getAttribute('data-goto'));
        if (g === n) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
        b.classList.toggle('is-past', g < n);
      });
      each(labels, function (b) {
        var g = Number(b.getAttribute('data-goto'));
        if (g === n % 6) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
      if (rcWord && rcNext) {
        rcWord.textContent = CENTER[n][0];
        rcNext.textContent = CENTER[n][1];
        [rcWord, rcNext].forEach(function (el) {
          el.classList.remove('rc-swap');
          void el.offsetWidth;
          el.classList.add('rc-swap');
        });
      }
    }

    function render(pos) {
      progress.style.strokeDashoffset = String(600 - pos * 100);
      record.setAttribute('transform', 'rotate(' + (pos * 60).toFixed(2) + ' 500 500)');
      each(dots, function (d, k) { d.classList.toggle('is-reached', pos >= k - 0.02); });
      each(verbs, function (v, k) { v.classList.toggle('is-lit', pos > k + 0.02); });
      setActive(Math.round(pos));
    }

    function update() {
      ticking = false;
      if (!pinned) return;
      var r = loop.getBoundingClientRect();
      root.classList.toggle('in-loop', r.top <= 1 && r.bottom >= window.innerHeight - 1);
      render(forced !== null ? forced : posFromScroll());
    }
    function onScroll() {
      if (pinned && !ticking) { ticking = true; window.requestAnimationFrame(update); }
    }
    function setMode() {
      pinned = pinMQ.matches && !forceStatic;
      loop.classList.toggle('loop--pinned', pinned);
      active = -1;
      if (pinned) update(); else root.classList.remove('in-loop');
    }
    function goTo(n) {
      forced = null;
      var behavior = reduceMQ.matches ? 'auto' : 'smooth';
      if (!pinned) {
        var el = document.getElementById('loop-step-' + n);
        if (el) el.scrollIntoView({ behavior: behavior, block: 'start' });
        return;
      }
      window.scrollTo({ top: yForStep(n), behavior: behavior });
    }

    loop.addEventListener('click', function (e) {
      var b = e.target.closest('[data-goto]');
      if (b) goTo(Number(b.getAttribute('data-goto')));
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    listen(pinMQ, setMode);
    setMode();

    if (forced !== null && params.has('solo')) root.classList.add('loop-solo');
    if (forced !== null) {
      var jump = function () {
        if (forced === null) return;
        if (pinned) {
          window.scrollTo({ top: yForStep(forced), behavior: 'instant' });
          render(forced);
        } else {
          var el = document.getElementById('loop-step-' + forced);
          if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
        }
      };
      jump();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(jump);
    }
  }

  initLoop();
})();
