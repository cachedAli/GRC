/* =========================================================
   CompliVerse AI · Draft 4 v2 · explorer.js (core-owned, shared)
   1. Explorers ([data-xp]): Drop 01's module explorer, generalised.
      Wide: vertical tabs (arrow keys, Home/End, hover, click).
      Narrow: accordion. ?<param>=N opens item N on load
      (?ai=N for "Where the AI works", ?m=N for modules).
   2. Preview interactions, by delegation:
      [data-pick]     one-of-many buttons; sets data-<name> on the
                      closest [data-pick-scope] and shows the
                      matching [data-pick-panel="name:key"]
      [data-confirm]  Link / Linked toggles; updates
                      [data-confirm-count] in [data-confirm-scope]
      [data-stepper]  steps through [data-step-item] nodes
   Without JS every panel shows and the buttons are inert.
   ========================================================= */
(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var small = window.matchMedia('(max-width: 900px)');
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ---------------- 1. Explorers ---------------- */
  function initExplorer(xp) {
    var list = xp.querySelector('[data-xp-list]');
    var panelsWrap = xp.querySelector('[data-xp-panels]');
    if (!list || !panelsWrap) return;
    var rows = Array.prototype.slice.call(list.querySelectorAll('.xp-row'));
    var panels = Array.prototype.slice.call(panelsWrap.querySelectorAll('.xp-panel'));
    if (!rows.length || rows.length !== panels.length) return;
    var current = 0;
    var hoverTimer = 0;

    var n = Number(params.get(xp.getAttribute('data-xp-param')));
    if (n >= 1 && n <= rows.length) current = n - 1;

    function mode() { return xp.getAttribute('data-mode'); }

    function select(i, focusRow) {
      current = i;
      rows.forEach(function (r, k) {
        var on = k === i;
        r.classList.toggle('is-on', on);
        r.setAttribute('aria-selected', String(on));
        r.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (p, k) { p.classList.toggle('is-on', k === i); });
      if (focusRow) rows[i].focus();
    }

    function toggleOpen(i) {
      var open = rows[i].getAttribute('aria-expanded') !== 'true';
      rows.forEach(function (r, k) {
        var isOpen = k === i ? open : false;
        r.setAttribute('aria-expanded', String(isOpen));
        r.classList.toggle('is-on', isOpen);
        panels[k].classList.toggle('is-open', isOpen);
      });
      if (open) current = i;
    }

    function applyMode() {
      if (small.matches) {
        xp.setAttribute('data-mode', 'accordion');
        list.setAttribute('role', 'group');
        list.removeAttribute('aria-orientation');
        rows.forEach(function (r, i) {
          r.removeAttribute('role');
          r.removeAttribute('aria-selected');
          r.tabIndex = 0;
          r.setAttribute('aria-controls', panels[i].id);
          r.after(panels[i]);
          panels[i].removeAttribute('role');
          panels[i].removeAttribute('tabindex');
          panels[i].classList.remove('is-on');
          r.setAttribute('aria-expanded', 'false');
        });
        toggleOpen(current);
      } else {
        xp.setAttribute('data-mode', 'tabs');
        list.setAttribute('role', 'tablist');
        list.setAttribute('aria-orientation', 'vertical');
        rows.forEach(function (r, i) {
          r.setAttribute('role', 'tab');
          r.setAttribute('aria-controls', panels[i].id);
          r.removeAttribute('aria-expanded');
          panels[i].setAttribute('role', 'tabpanel');
          panels[i].setAttribute('aria-labelledby', r.id);
          panels[i].tabIndex = -1;
          panels[i].classList.remove('is-open');
          panelsWrap.append(panels[i]);
        });
        select(current);
      }
    }

    rows.forEach(function (r, i) {
      r.addEventListener('click', function () {
        if (mode() === 'accordion') toggleOpen(i); else select(i);
      });
      r.addEventListener('mouseenter', function () {
        if (mode() !== 'tabs' || !canHover.matches) return;
        window.clearTimeout(hoverTimer);
        hoverTimer = window.setTimeout(function () { select(i); }, 70);
      });
      r.addEventListener('mouseleave', function () { window.clearTimeout(hoverTimer); });
      r.addEventListener('keydown', function (e) {
        if (mode() !== 'tabs') return;
        var last = rows.length - 1;
        var next = null;
        if (e.key === 'ArrowDown') next = i === last ? 0 : i + 1;
        else if (e.key === 'ArrowUp') next = i === 0 ? last : i - 1;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = last;
        else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          select(i);
          panels[i].focus();
          return;
        }
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });

    applyMode();
    if (small.addEventListener) small.addEventListener('change', applyMode);
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-xp]'), initExplorer);

  /* ---------------- 2. Preview interactions ---------------- */
  function pick(btn) {
    var group = btn.closest('[data-pick]');
    var scope = btn.closest('[data-pick-scope]');
    if (!group || !scope) return;
    var name = group.getAttribute('data-pick');
    var key = btn.getAttribute('data-pick-key');
    Array.prototype.forEach.call(group.querySelectorAll('[data-pick-key]'), function (b) {
      b.setAttribute('aria-pressed', String(b === btn));
    });
    scope.setAttribute('data-' + name, key);
    Array.prototype.forEach.call(scope.querySelectorAll('[data-pick-panel^="' + name + ':"]'), function (p) {
      p.classList.toggle('is-on', p.getAttribute('data-pick-panel') === name + ':' + key);
    });
  }

  function confirmLink(btn) {
    var on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(on));
    var scope = btn.closest('[data-confirm-scope]');
    if (!scope) return;
    var count = scope.querySelectorAll('[data-confirm][aria-pressed="true"]').length;
    Array.prototype.forEach.call(scope.querySelectorAll('[data-confirm-count]'), function (c) {
      c.textContent = String(count);
    });
  }

  function step(btn) {
    var scope = btn.closest('[data-stepper]');
    if (!scope) return;
    var items = scope.querySelectorAll('[data-step-item]');
    var at = Number(scope.getAttribute('data-at') || -1) + 1;
    if (at >= items.length) at = -1;
    scope.setAttribute('data-at', String(at));
    Array.prototype.forEach.call(items, function (it, k) {
      it.classList.toggle('is-on', k === at);
      it.classList.toggle('is-past', at >= 0 && k < at);
    });
    btn.textContent = at === -1 ? 'Step through' : at === items.length - 1 ? 'Start again' : 'Next step';
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    var b = t.closest('[data-pick] [data-pick-key]');
    if (b) { pick(b); return; }
    b = t.closest('[data-confirm]');
    if (b) { confirmLink(b); return; }
    b = t.closest('[data-step-next]');
    if (b) step(b);
  });
})();
