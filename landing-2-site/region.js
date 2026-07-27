/**
 * v6 — GCC ⇄ Global region module.
 * Exposes window.CVRegion { get(), set(x), onChange(cb) }.
 * Stamps <html data-region="gcc|global"> so CSS can swap
 * [data-region-gcc] / [data-region-global] copy, persists to localStorage,
 * and re-paints the framework marquee live on switch.
 */
(function () {
  const KEY = 'cv-region';
  const VALID = ['gcc', 'global'];
  const fallback = (window.CV && CV.REGION && CV.REGION.default) || 'gcc';

  let current = fallback;
  try {
    const saved = localStorage.getItem(KEY);
    if (VALID.indexOf(saved) !== -1) current = saved;
  } catch (_) {
    /* storage unavailable — session-only */
  }

  const listeners = [];

  /* Stamp immediately (script runs before first paint of dynamic UI) */
  document.documentElement.setAttribute('data-region', current);

  function frameworksFor(region) {
    if (window.CV && CV.REGION && CV.REGION.frameworks && CV.REGION.frameworks[region]) {
      return CV.REGION.frameworks[region];
    }
    return (window.CV && CV.FRAMEWORKS) || [];
  }

  /** Marquee needs an even number of copies so the -50% loop is seamless. */
  function marqueeHTML(list) {
    const copies = list.length <= 8 ? 4 : 2;
    let items = [];
    for (let i = 0; i < copies; i++) items = items.concat(list);
    return items.map((f) => `<span>${f}</span>`).join('');
  }

  function paintMarquee(region, animate) {
    const track = document.getElementById('framework-track');
    if (!track) return;
    const shell = track.closest('.framework-marquee');
    const swap = () => {
      track.innerHTML = marqueeHTML(frameworksFor(region));
    };
    if (animate && shell) {
      shell.classList.add('region-swapping');
      setTimeout(() => {
        swap();
        shell.classList.remove('region-swapping');
      }, 260);
    } else {
      swap();
    }
  }

  function paintToggle(region) {
    document.querySelectorAll('[data-region-set]').forEach((btn) => {
      const on = btn.dataset.regionSet === region;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  }

  function set(region) {
    if (VALID.indexOf(region) === -1 || region === current) return;
    current = region;
    try {
      localStorage.setItem(KEY, region);
    } catch (_) {}
    document.documentElement.setAttribute('data-region', region);
    paintToggle(region);
    paintMarquee(region, true);
    listeners.forEach((cb) => {
      try {
        cb(region);
      } catch (err) {
        console.error('CVRegion listener failed', err);
      }
    });
  }

  window.CVRegion = {
    get: () => current,
    set,
    onChange: (cb) => {
      if (typeof cb === 'function') listeners.push(cb);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-region-set]').forEach((btn) => {
      btn.addEventListener('click', () => set(btn.dataset.regionSet));
    });
    paintToggle(current);
    /* app.js paints the marquee region-aware on load; this covers pages
       that include region.js without app.js marquee support. */
    requestAnimationFrame(() => {
      const track = document.getElementById('framework-track');
      if (track && !track.children.length) paintMarquee(current, false);
    });
  });
})();
