/* =========================================================
   CompliVerse AI · Draft 4 v2 · filter.js (core-owned)
   The capabilities filter on ai/capabilities.html.
   [data-filter-module] / [data-filter-approve] buttons narrow the
   [data-module] groups and their .cap[data-approve] items.
   ?module=<slug> and ?approve=confirm|auto preselect; the URL is
   kept in step so a filtered view can be shared.
   Without JS every capability shows, grouped by module.
   ========================================================= */
(function () {
  'use strict';

  var bar = document.querySelector('[data-filter]');
  var list = document.querySelector('[data-filter-list]');
  if (!bar || !list) return;
  var groups = Array.prototype.slice.call(list.querySelectorAll('[data-module]'));
  var count = bar.querySelector('[data-filter-count]');
  var empty = document.querySelector('[data-filter-empty]');
  var params = new URLSearchParams(window.location.search);
  var state = { module: 'all', approve: 'all' };

  function valid(attr, value) {
    return !!bar.querySelector('[data-filter-' + attr + '="' + value + '"]');
  }
  if (params.get('module') && valid('module', params.get('module'))) state.module = params.get('module');
  if (params.get('approve') && valid('approve', params.get('approve'))) state.approve = params.get('approve');

  function apply(updateUrl) {
    var shown = 0;
    ['module', 'approve'].forEach(function (attr) {
      Array.prototype.forEach.call(bar.querySelectorAll('[data-filter-' + attr + ']'), function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-filter-' + attr) === state[attr]));
      });
    });
    groups.forEach(function (g) {
      var caps = Array.prototype.slice.call(g.querySelectorAll('.cap'));
      var inModule = state.module === 'all' || g.getAttribute('data-module') === state.module;
      var visible = 0;
      caps.forEach(function (c) {
        var on = inModule && (state.approve === 'all' || c.getAttribute('data-approve') === state.approve);
        c.hidden = !on;
        if (on) visible += 1;
      });
      // a module with no AI shows only when nothing narrows the list
      var noAi = caps.length === 0 && state.module === 'all' && state.approve === 'all';
      g.hidden = !(visible > 0 || noAi);
      shown += visible;
    });
    if (count) count.textContent = String(shown);
    if (empty) empty.hidden = shown > 0;
    if (updateUrl && window.history.replaceState) {
      var q = new URLSearchParams();
      if (state.module !== 'all') q.set('module', state.module);
      if (state.approve !== 'all') q.set('approve', state.approve);
      var qs = q.toString();
      window.history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
    }
  }

  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-filter-module')) state.module = b.getAttribute('data-filter-module');
    else if (b.hasAttribute('data-filter-approve')) state.approve = b.getAttribute('data-filter-approve');
    else return;
    apply(true);
  });

  apply(false);
})();
