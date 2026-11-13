/* =========================================================
   CompliVerse AI · Draft 4 v2 · demo.js (pages builder)
   The demo request form on request-demo.html. Client-side only:
   nothing is sent anywhere.
   1. ?interest=<slug> preselects "What would you like to see?"
      (13 module slugs, 9 service slugs, ai, studio, ai-trust);
      ?framework=<slug> ticks a framework. Unknown
      values are ignored.
   2. The framework picker: a toggle opens a searchable checkbox
      list; ticked items show as removable chips; "n selected"
      and "Clear all". Without JS the list is always open.
   3. Validation on submit (then live): work email, first name,
      last name and company are required; the email must look
      like one. Errors sit under each field and in a summary.
   4. A valid submit swaps the form for a confirmation, in place,
      that says plainly nothing was sent, with a summary built
      with textContent only. "Edit the request" swaps back.
   ========================================================= */
(function () {
  'use strict';

  var form = document.querySelector('[data-demo]');
  var done = document.querySelector('[data-demo-done]');
  if (!form || !done) return;
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  var params = new URLSearchParams(window.location.search);

  /* 1. preselect */
  var interest = form.querySelector('#dm-interest');
  var help = form.querySelector('[data-interest-help]');
  var wanted = params.get('interest');
  if (interest && wanted) {
    var match = Array.prototype.filter.call(interest.options, function (o) { return o.value === wanted; })[0];
    if (match) {
      interest.value = wanted;
      if (help) help.textContent = 'Preselected from the page you came from. Change it if you like.';
    }
  }

  /* 2. framework picker */
  var fw = form.querySelector('[data-fw]');
  var toggle = fw.querySelector('[data-fw-toggle]');
  var panel = fw.querySelector('[data-fw-panel]');
  var search = fw.querySelector('[data-fw-search]');
  var items = fw.querySelectorAll('[data-fw-item]');
  var boxes = fw.querySelectorAll('input[type="checkbox"]');
  var chips = fw.querySelector('[data-fw-chips]');
  var count = fw.querySelector('[data-fw-n]');
  var empty = fw.querySelector('[data-fw-empty]');
  var label = fw.querySelector('[data-fw-label]');
  var clear = fw.querySelector('[data-fw-clear]');

  var wantedFw = params.get('framework');
  if (wantedFw) each(boxes, function (b) { if (b.value === wantedFw) b.checked = true; });

  function setOpen(open) {
    panel.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (open && search) search.focus();
  }
  function selected() { return Array.prototype.filter.call(boxes, function (b) { return b.checked; }); }
  function renderChips() {
    var list = selected();
    while (chips.firstChild) chips.removeChild(chips.firstChild);
    list.forEach(function (b) {
      var name = b.getAttribute('data-fw-label-text');
      var li = document.createElement('li');
      li.className = 'dm-chip';
      var span = document.createElement('span');
      span.textContent = name;
      var x = document.createElement('button');
      x.type = 'button';
      x.setAttribute('data-fw-remove', b.value);
      x.setAttribute('aria-label', 'Remove ' + name);
      x.textContent = '×';
      li.appendChild(span);
      li.appendChild(x);
      chips.appendChild(li);
    });
    count.textContent = String(list.length);
    label.textContent = list.length ? list.length + ' selected · add or remove' : 'Search and select frameworks…';
  }
  function filter() {
    var q = search.value.trim().toLowerCase();
    var shown = 0;
    each(items, function (it) {
      var on = !q || it.getAttribute('data-fw-name').indexOf(q) !== -1;
      it.hidden = !on;
      if (on) shown += 1;
    });
    empty.hidden = shown > 0;
  }
  toggle.addEventListener('click', function () { setOpen(!panel.classList.contains('is-open')); });
  search.addEventListener('input', filter);
  search.addEventListener('keydown', function (e) { if (e.key === 'Enter') e.preventDefault(); });
  fw.addEventListener('change', renderChips);
  fw.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
  chips.addEventListener('click', function (e) {
    var b = e.target.closest('[data-fw-remove]');
    if (!b) return;
    each(boxes, function (x) { if (x.value === b.getAttribute('data-fw-remove')) x.checked = false; });
    renderChips();
    toggle.focus();
  });
  clear.addEventListener('click', function () { each(boxes, function (b) { b.checked = false; }); renderChips(); });
  renderChips();

  /* 3. validation */
  var errs = form.querySelector('[data-demo-errs]');
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var rules = [
    ['dm-email', function (v) { return !v ? 'Enter your work email.' : (EMAIL.test(v) ? '' : 'Enter an email address like you@company.com.'); }],
    ['dm-first', function (v) { return v ? '' : 'Enter your first name.'; }],
    ['dm-last', function (v) { return v ? '' : 'Enter your last name.'; }],
    ['dm-company', function (v) { return v ? '' : 'Enter your company.'; }],
  ];
  var tried = false;
  function check(id, rule) {
    var input = form.querySelector('#' + id);
    var msg = rule(input.value.trim());
    var out = form.querySelector('#' + id + '-err');
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    out.textContent = msg;
    out.hidden = !msg;
    return msg ? input : null;
  }
  function validate() {
    var bad = rules.map(function (r) { return check(r[0], r[1]); }).filter(Boolean);
    if (bad.length) {
      errs.textContent = bad.length === 1 ? 'Check the highlighted field.' : 'Check the ' + bad.length + ' highlighted fields.';
      errs.hidden = false;
    } else {
      errs.hidden = true;
      errs.textContent = '';
    }
    return bad;
  }
  rules.forEach(function (r) {
    form.querySelector('#' + r[0]).addEventListener('input', function () { if (tried) validate(); });
  });

  /* 4. submit: confirm in place, send nothing */
  var nameOut = done.querySelector('[data-done-name]');
  var summary = done.querySelector('[data-done-summary]');
  function row(k, v) {
    if (!v) return;
    var dt = document.createElement('dt');
    dt.textContent = k;
    var dd = document.createElement('dd');
    dd.textContent = v;
    summary.appendChild(dt);
    summary.appendChild(dd);
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    tried = true;
    var bad = validate();
    if (bad.length) { bad[0].focus(); return; }
    var val = function (id) { return form.querySelector('#' + id).value.trim(); };
    while (summary.firstChild) summary.removeChild(summary.firstChild);
    row('Name', val('dm-first') + ' ' + val('dm-last'));
    row('Work email', val('dm-email'));
    row('Company', val('dm-company'));
    var team = form.querySelector('#dm-team');
    row('Team size', team.value);
    row('Start with', interest.value ? interest.options[interest.selectedIndex].text : 'A general tour');
    row('Frameworks', selected().map(function (b) { return b.getAttribute('data-fw-label-text'); }).join(', '));
    row('Notes', val('dm-notes'));
    nameOut.textContent = ', ' + val('dm-first');
    setOpen(false);
    form.hidden = true;
    done.hidden = false;
    done.focus();
  });
  done.querySelector('[data-demo-edit]').addEventListener('click', function () {
    done.hidden = true;
    form.hidden = false;
    form.querySelector('#dm-email').focus();
  });
})();
