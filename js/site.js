/* =========================================================
   CompliVerse AI · Draft 4 v2 · site.js (core-owned, every page)
   1. Nav: solid edge once the page scrolls; the nav CTA is blue only
      while no other blue primary button is on screen
   2. Dropdown menus (AI, Platform, Services, Resources):
      click or Enter/Space toggles, Escape closes and returns
      focus, focus leaving closes, hover opens on desktop
   3. Mobile sheet (≤ 1023px): the Menu button toggles it;
      Escape closes it; the menus inside act as accordions
   Vanilla JS, no dependencies, works from file://. Without JS
   the menus open on hover and focus (CSS) and every link works.
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  var nav = document.querySelector('[data-nav]');
  if (!nav) return;

  /* 1. solid edge after scrolling */
  var ticking = false;
  function sync() { ticking = false; nav.classList.toggle('is-solid', window.pageYOffset > 8); }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(sync); }
  }, { passive: true });
  sync();

  /* 1b. one blue pill per viewport: the nav CTA turns blue only while no
     other primary button on the page is visible */
  var primaries = document.querySelectorAll('main .btn--primary');
  if ('IntersectionObserver' in window) {
    var seen = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) seen.add(en.target); else seen.delete(en.target); });
      nav.classList.toggle('cta-free', seen.size === 0);
    });
    each(primaries, function (b) { io.observe(b); });
    if (!primaries.length) nav.classList.add('cta-free');
  } else {
    nav.classList.add('cta-free');
  }

  /* 2. dropdowns */
  var items = Array.prototype.slice.call(nav.querySelectorAll('[data-dd]'));
  var desktop = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  var hoverTimer = 0;

  function setOpen(item, open) {
    var btn = item.querySelector('[data-dd-btn]');
    item.classList.toggle('is-open', open);
    if (btn) btn.setAttribute('aria-expanded', String(open));
  }
  function closeAll(except) {
    items.forEach(function (it) { if (it !== except) setOpen(it, false); });
  }

  items.forEach(function (item) {
    var btn = item.querySelector('[data-dd-btn]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var open = !item.classList.contains('is-open');
      closeAll(item);
      setOpen(item, open);
    });
    item.addEventListener('focusout', function (e) {
      if (e.relatedTarget && !item.contains(e.relatedTarget)) setOpen(item, false);
    });
    item.addEventListener('mouseenter', function () {
      if (!desktop.matches) return;
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(function () { closeAll(item); setOpen(item, true); }, 80);
    });
    item.addEventListener('mouseleave', function () {
      if (!desktop.matches) return;
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(function () {
        if (!item.contains(document.activeElement)) setOpen(item, false);
      }, 200);
    });
  });

  /* 3. mobile sheet */
  var menuBtn = nav.querySelector('[data-menu]');
  var panel = nav.querySelector('[data-nav-panel]');
  function setSheet(open) {
    if (!menuBtn || !panel) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('is-open', open);
    root.classList.toggle('sheet-open', open);
    if (!open) closeAll(null);
  }
  if (menuBtn && panel) {
    menuBtn.addEventListener('click', function () { setSheet(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) { if (mq.matches) setSheet(false); });
  }

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) { closeAll(null); setSheet(false); return; }
    if (e.target.closest('a')) { closeAll(null); setSheet(false); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = items.filter(function (it) { return it.classList.contains('is-open'); })[0];
    if (open) {
      setOpen(open, false);
      var b = open.querySelector('[data-dd-btn]');
      if (b) b.focus();
      return;
    }
    if (menuBtn && menuBtn.getAttribute('aria-expanded') === 'true') { setSheet(false); menuBtn.focus(); }
  });
})();
