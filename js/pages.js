/* =========================================================
   CompliVerse AI · Draft 4 v2 · pages.js (pages builder)
   1. Glossary filter ([data-gl]): narrows [data-gl-term] by the
      text in [data-gl-input]; hides empty letters; ?q= presets.
   2. Integrations filter ([data-ig]): category pills
      [data-ig-cat] (aria-pressed) plus a search box narrow the
      [data-ig-item] cards; ?category= presets.
   Without JS every term and connector shows.
   ========================================================= */
(function () {
  'use strict';

  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  var params = new URLSearchParams(window.location.search);

  /* 1. glossary */
  var gl = document.querySelector('[data-gl]');
  if (gl) {
    var glInput = gl.querySelector('[data-gl-input]');
    var glTerms = document.querySelectorAll('[data-gl-term]');
    var glLetters = document.querySelectorAll('[data-gl-letter]');
    var glCount = gl.querySelector('[data-gl-count]');
    var glEmpty = document.querySelector('[data-gl-empty]');
    var glQ = document.querySelector('[data-gl-q]');
    var glClear = document.querySelector('[data-gl-clear]');

    var applyGlossary = function () {
      var q = glInput.value.trim().toLowerCase();
      var shown = 0;
      each(glTerms, function (t) {
        var on = !q || t.getAttribute('data-gl-text').indexOf(q) !== -1;
        t.hidden = !on;
        if (on) shown += 1;
      });
      each(glLetters, function (l) { l.hidden = !l.querySelector('[data-gl-term]:not([hidden])'); });
      each(gl.querySelectorAll('.gl-az a'), function (a) {
        var target = document.getElementById(a.getAttribute('href').slice(1));
        a.classList.toggle('is-off', !!(target && target.hidden));
      });
      if (glCount) glCount.textContent = String(shown);
      if (glQ) glQ.textContent = glInput.value.trim();
      if (glEmpty) glEmpty.hidden = shown > 0;
    };
    if (params.get('q')) glInput.value = params.get('q');
    glInput.addEventListener('input', applyGlossary);
    if (glClear) glClear.addEventListener('click', function () { glInput.value = ''; applyGlossary(); glInput.focus(); });
    applyGlossary();
  }

  /* 2. integrations */
  var ig = document.querySelector('[data-ig]');
  if (ig) {
    var igInput = ig.querySelector('[data-ig-input]');
    var igPills = ig.querySelectorAll('[data-ig-cat]');
    var igItems = document.querySelectorAll('[data-ig-item]');
    var igCount = ig.querySelector('[data-ig-count]');
    var igEmpty = document.querySelector('[data-ig-empty]');
    var igQ = document.querySelector('[data-ig-q]');
    var igReset = document.querySelector('[data-ig-reset]');
    var cat = 'all';
    var valid = function (c) { return !!ig.querySelector('[data-ig-cat="' + c + '"]'); };
    if (params.get('category') && valid(params.get('category'))) cat = params.get('category');

    var applyIntegrations = function () {
      var q = igInput.value.trim().toLowerCase();
      var shown = 0;
      each(igPills, function (p) { p.setAttribute('aria-pressed', String(p.getAttribute('data-ig-cat') === cat)); });
      each(igItems, function (it) {
        var inCat = cat === 'all' || (' ' + it.getAttribute('data-ig-cats') + ' ').indexOf(' ' + cat + ' ') !== -1;
        var on = inCat && (!q || it.getAttribute('data-ig-text').indexOf(q) !== -1);
        it.hidden = !on;
        if (on) shown += 1;
      });
      if (igCount) igCount.textContent = String(shown);
      if (igQ) igQ.textContent = igInput.value.trim() || 'that';
      if (igEmpty) igEmpty.hidden = shown > 0;
    };
    ig.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ig-cat]');
      if (!b) return;
      cat = b.getAttribute('data-ig-cat');
      applyIntegrations();
    });
    igInput.addEventListener('input', applyIntegrations);
    if (igReset) igReset.addEventListener('click', function () { cat = 'all'; igInput.value = ''; applyIntegrations(); igInput.focus(); });
    applyIntegrations();
  }
})();
