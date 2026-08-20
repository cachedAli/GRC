/* Shared page logic: atlas constellation / deep accordion, AI paths, comparison, experience, industry */
(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function getFrameworkList() {
    if (!window.CV || !Array.isArray(CV.FRAMEWORKS)) return [];
    return CV.FRAMEWORKS.map((item, index) => {
      if (typeof item === 'string') {
        const compact = item.replace(/[^A-Za-z0-9]+/g, ' ').trim();
        const acronym = compact.split(' ').map((part) => part[0]).join('').slice(0, 4).toUpperCase() || 'CV';
        return {
          id: compact.toLowerCase().replace(/\s+/g, '-'),
          name: item,
          subtitle: 'Framework coverage',
          acronym,
          accent: index % 2 ? '#12d8ff' : '#0057ff'
        };
      }
      return item;
    });
  }

  function frameworkBadgeHTML(f, cls) {
    if (f.logo) {
      return `<img src="${f.logo}" alt="${f.name}" class="${cls} framework-logo-image" loading="eager" decoding="async" />`;
    }
    return `<span class="${cls}">${f.acronym || f.name.slice(0, 4)}</span>`;
  }

  function isDeepPage() {
    const p = document.body.dataset.page;
    return p && p !== 'home';
  }

  function isPlatformPage() {
    return document.body.dataset.page === 'platform';
  }

  let activePlatformCapability = null;

  function syncPlatformHash(id) {
    if (!isPlatformPage()) return;
    if (id) {
      const hash = '#' + id;
      if (location.hash !== hash) history.replaceState(null, '', hash);
      return;
    }
    if (location.hash) history.replaceState(null, '', location.pathname);
  }

  function closeCapabilityModal(opts) {
    const options = opts || {};
    const shell = qs('#platform-modal');
    if (!shell) return;
    shell.classList.remove('open');
    shell.setAttribute('aria-hidden', 'true');
    activePlatformCapability = null;
    window.setTimeout(() => {
      if (!shell.classList.contains('open')) shell.hidden = true;
    }, 220);
    if (!options.keepHash) syncPlatformHash(null);
  }

  function openCapabilityModal(id) {
    if (!isPlatformPage() || !window.CV) return;
    const c = CV.CAPABILITIES.find((x) => x.id === id);
    if (!c) return;
    const mission = CV.MISSIONS[c.mission] || {};
    const shell = qs('#platform-modal');
    const body = qs('#platform-modal-body');
    const dialog = qs('#platform-modal .platform-modal-dialog');
    if (!shell || !body || !dialog) return;

    activePlatformCapability = id;
    body.innerHTML = `
      <div class="platform-modal-head">
        <div class="platform-modal-meta">
          <span class="platform-modal-num">${c.num}</span>
          <span class="platform-modal-chip" style="border-color:${(mission.color || '#60a5fa')}55;color:${mission.color || '#60a5fa'}">${mission.label || ''}</span>
        </div>
        <p class="platform-modal-kicker">Platform capability</p>
        <h2 id="platform-modal-title">${c.title}</h2>
        <p class="platform-modal-tag">${c.tag}</p>
      </div>
      <div class="platform-modal-section">
        <div class="platform-modal-label">Capabilities</div>
        <ul class="platform-modal-list">${c.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      </div>
      <div class="platform-modal-highlight">
        <div class="platform-modal-label platform-modal-label-accent">AI Support</div>
        <p>${c.ai}</p>
      </div>
      <div class="platform-modal-grid">
        <div class="platform-modal-card">
          <div class="platform-modal-label">Use Case</div>
          <p>${c.useCase}</p>
        </div>
        <div class="platform-modal-card">
          <div class="platform-modal-label">Illustrative Scenario</div>
          <p>${c.example}</p>
        </div>
        <div class="platform-modal-card platform-modal-card-outcome">
          <div class="platform-modal-label platform-modal-label-success">Outcome</div>
          <p>${c.outcome}</p>
        </div>
      </div>`;

    shell.hidden = false;
    shell.setAttribute('aria-hidden', 'false');
    void dialog.offsetWidth;
    shell.classList.add('open');
    syncPlatformHash(id);
    dialog.focus();
  }

  function renderFrameworkStrip() {
    const track = qs('#framework-track');
    if (!track || !window.CV) return;
    /* v6: region-aware when region.js is present (home); CV.FRAMEWORKS otherwise */
    const list =
      window.CVRegion && CV.REGION && CV.REGION.frameworks
        ? CV.REGION.frameworks[CVRegion.get()] || CV.FRAMEWORKS
        : CV.FRAMEWORKS;
    const copies = list.length <= 8 ? 4 : 2; /* even copies keep the -50% loop seamless */
    const normalized = list.map((f, index) => {
      if (typeof f === 'string') return getFrameworkList()[index] || { name: f };
      return f;
    });
    let items = [];
    for (let i = 0; i < copies; i++) items = items.concat(normalized);
    track.innerHTML = items.map((f) => `<span>${f.name}</span>`).join('');
  }

  function renderFrameworkShowcase() {
    const orbit = qs('#framework-orbit');
    const rail = qs('#framework-rail');
    const grid = qs('#framework-grid');
    if (!orbit && !rail && !grid) return;
    const list = getFrameworkList();
    if (!list.length) return;

    if (orbit) {
      const innerRing = list.filter((f) => f.ring === 'inner');
      const outerRing = list.filter((f) => f.ring !== 'inner');

      function orbitItem(f, index, count, radius, ring) {
        const angle = (360 / count) * index;
        return `<button type="button" class="framework-orbit-item" data-ring="${ring}" data-id="${f.id}" style="--angle:${angle}deg;--radius:${radius}px;--accent:${f.accent || '#0057ff'}" aria-label="${f.name}: ${f.subtitle}">
          ${frameworkBadgeHTML(f, 'framework-orbit-badge')}
          <span class="framework-orbit-pill-copy"><strong>${f.name}</strong><small>${f.subtitle || 'Framework coverage'}</small></span>
        </button>`;
      }

      const items =
        innerRing.map((f, i) => orbitItem(f, i, innerRing.length, 220, 'inner')).join('') +
        outerRing.map((f, i) => orbitItem(f, i, outerRing.length, 340, 'outer')).join('');

      orbit.innerHTML = `
        <div class="framework-orbit-ring framework-orbit-ring-outer"></div>
        <div class="framework-orbit-ring framework-orbit-ring-inner"></div>
        <div class="framework-orbit-core">
          <span class="framework-orbit-core-kicker">compliverse</span>
          <strong>Framework Intelligence</strong>
          <div class="framework-orbit-core-stats">
            <span>${list.length} frameworks</span><span>GCC + Global</span><span>Mapped to controls</span>
          </div>
        </div>${items}`;

      qsa('.framework-orbit-item', orbit).forEach((btn) => {
        const activate = () => {
          orbit.classList.add('has-active');
          qsa('.framework-orbit-item', orbit).forEach((b) => b.classList.toggle('is-active', b === btn));
        };
        const deactivate = () => {
          btn.classList.remove('is-active');
          orbit.classList.remove('has-active');
        };
        btn.addEventListener('pointerenter', activate);
        btn.addEventListener('pointerleave', deactivate);
        btn.addEventListener('focus', activate);
        btn.addEventListener('blur', deactivate);
      });
      orbit.addEventListener('pointerleave', () => {
        orbit.classList.remove('has-active');
        qsa('.framework-orbit-item', orbit).forEach((b) => b.classList.remove('is-active'));
      });
    }

    if (rail) {
      const copies = list.length <= 8 ? 3 : 2;
      let items = [];
      for (let i = 0; i < copies; i++) items = items.concat(list);
      rail.innerHTML = items
        .map(
          (f) => `<article class="framework-card" style="--accent:${f.accent || '#0057ff'}"><div class="framework-card-mark-wrap">${frameworkBadgeHTML(f, 'framework-card-mark')}</div><div class="framework-card-copy"><strong>${f.name}</strong><span>${f.subtitle || 'Framework coverage'}</span></div></article>`
        )
        .join('');
    }

    if (grid) {
      grid.innerHTML = list
        .map(
          (f) => `<article class="framework-grid-card reveal" style="--accent:${f.accent || '#0057ff'}" aria-label="${f.name}: ${f.fullName || f.subtitle || 'Framework coverage'}">
            ${frameworkBadgeHTML(f, 'framework-grid-mark')}
            <div class="framework-grid-content">
              <div class="framework-grid-eyebrow"><span>${f.name}</span><span>${f.region || 'Global'}</span></div>
              <h3>${f.fullName || f.name}</h3>
              <div class="framework-grid-meta"><span>${f.category || 'Security'}</span><span>Control-ready</span></div>
            </div>
          </article>`
        )
        .join('');
    }
  }

  function openCapabilityDeep(id) {
    if (isPlatformPage()) {
      openCapabilityModal(id);
      return;
    }
    const c = CV.CAPABILITIES.find((x) => x.id === id);
    if (!c) return;
    qsa('.atlas-item').forEach((el) => el.classList.toggle('open', el.dataset.id === id));
    syncPlatformHash(id);
  }

  function renderAtlas() {
    const filters = qs('#mission-filters');
    const grid = qs('#atlas-grid');
    if (!filters || !grid || !window.CV) return;
    let mission = 'all';
    const deep = grid.dataset.mode === 'deep' || document.body.dataset.page === 'platform';
    const counts = Object.fromEntries(
      Object.keys(CV.MISSIONS).map((key) => [key, CV.CAPABILITIES.filter((c) => c.mission === key).length])
    );
    const totalCount = CV.CAPABILITIES.length;

    filters.innerHTML =
      `<button type="button" data-m="all" class="active"><span class="filter-pill-label">All</span><span class="filter-pill-count">${totalCount}</span></button>` +
      Object.entries(CV.MISSIONS)
        .map(
          ([k, v]) =>
            `<button type="button" data-m="${k}"><span class="filter-pill-dot" style="background:${v.color}"></span><span class="filter-pill-label">${v.label}</span><span class="filter-pill-count">${counts[k]}</span></button>`
        )
        .join('');

    function paint() {
      const list = CV.CAPABILITIES.filter((c) => mission === 'all' || c.mission === mission);

      if (deep) {
        grid.className = 'atlas-grid';
        grid.innerHTML = list
          .map((c) => {
            const m = CV.MISSIONS[c.mission];
            const elev = c.id === 'auditor' ? ' elev' : '';
            return `<article class="atlas-item${elev}" data-id="${c.id}" data-mission="${c.mission}" id="node-${c.id}" style="--mission-color:${m.color}">
              <button type="button" class="atlas-item-head" aria-expanded="false">
                <span class="num">${c.num}</span>
                <span>
                  <h3>${c.title}</h3>
                  <p class="tag">${c.tag}</p>
                </span>
                <span class="mission-chip" style="border-color:${m.color}33;color:${m.color};background:${m.color}12">${m.label}</span>
                <span class="atlas-item-foot"><span>Detail</span><span aria-hidden="true">→</span></span>
              </button>
            </article>`;
          })
          .join('');

        qsa('.atlas-item-head', grid).forEach((btn) => {
          btn.addEventListener('click', () => {
            const item = btn.closest('.atlas-item');
            if (!item) return;
            btn.setAttribute('aria-expanded', 'true');
            openCapabilityDeep(item.dataset.id);
          });
        });
      } else {
        grid.className = 'atlas-constellation';
        grid.innerHTML = list
          .map((c) => {
            const m = CV.MISSIONS[c.mission];
            const elev = c.id === 'auditor' ? ' elev' : '';
            return `<button type="button" class="atlas-node${elev}" data-id="${c.id}" data-mission="${c.mission}" id="node-${c.id}">
              <span class="num">${c.num}</span>
              <span class="node-body">
                <strong>${c.title}</strong>
                <span class="tag">${c.tag}</span>
              </span>
              <span class="mission-chip" style="border-color:${m.color}55;color:${m.color}">${m.label}</span>
            </button>`;
          })
          .join('');

        qsa('.atlas-node', grid).forEach((btn) => {
          btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            if (window.CVWorld) window.CVWorld.focusCapability(id);
            if (window.CVStory) window.CVStory.openCapabilityOverlay(id);
          });
        });
      }

    }

    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      mission = btn.dataset.m;
      qsa('button', filters).forEach((b) => b.classList.toggle('active', b === btn));
      paint();
    });
    paint();
  }

  let aiTimer;
  let currentAI = 'auditor';

  function aiRoleLabel(kicker) {
    if (kicker === 'COMPLYCHAT') return 'ComplyChat';
    return kicker
      .toLowerCase()
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  function renderAIOverview() {
    if (document.body.dataset.page !== 'ai') return;
    const chatCard = qs('#ai-chat-card');
    const principles = qs('#ai-principles');
    if (chatCard) {
      chatCard.innerHTML = `
        <div class="ai-chat-head">ComplyChat</div>
        <div class="ai-chat-bubble ai-chat-bubble-user">Which critical risks sit outside appetite because remediation is overdue?</div>
        <div class="ai-chat-bubble ai-chat-bubble-bot">
          <strong>Current answer:</strong> Two risks remain outside appetite. One is tied to payment vulnerabilities with overdue remediation on critical assets; one is linked to expired evidence on a high-impact control set.
          <div class="ai-chat-sources">
            <span class="ai-chat-source">Risk register</span>
            <span class="ai-chat-source">Vulnerability queue</span>
            <span class="ai-chat-source">Evidence status</span>
          </div>
        </div>
        <div class="ai-chat-flags">
          <span>Tenant-scoped</span>
          <span>Data-grounded</span>
          <span>Source-linked</span>
        </div>`;
    }
    if (principles) {
      principles.innerHTML = [
        {
          title: 'Tenant-scoped',
          text: 'Agents inherit the same permissions and tenant boundary as the user who runs them.'
        },
        {
          title: 'Explainable',
          text: 'Every step stays traceable to source records, relationships, and approvals.'
        },
        {
          title: 'Human-approved',
          text: 'Recommendations become actions only when an accountable owner decides to publish.'
        }
      ]
        .map(
          (item) => `<article class="ai-principle-card"><h3>${item.title}</h3><p>${item.text}</p></article>`
        )
        .join('');
    }
  }

  function paintTwinPath(path) {
    const el = qs('#twin-path');
    if (!el || !path) return;
    const labels = CV.NODE_LABEL || {};
    el.innerHTML =
      `<span class="kicker">Twin path</span>` +
      path
        .map((id, i) => {
          const label = labels[id] || id;
          return `<span class="twin-hop">${label}</span>${i < path.length - 1 ? '<span class="twin-arrow" aria-hidden="true">→</span>' : ''}`;
        })
        .join('');
  }

  function paintAI(key) {
    const stage = qs('#ai-stage-inner') || qs('#ai-stage');
    const tabs = qs('#ai-tabs');
    if (!stage || !window.CV) return;
    currentAI = key;
    const s = CV.AI_SCENARIOS[key];
    if (!s) return;

    if (tabs) {
      qsa('button', tabs).forEach((b) => b.classList.toggle('active', b.dataset.key === key));
    }

    if (document.body.dataset.page === 'ai') {
      stage.innerHTML = `
        <div class="ai-role-panel">
          <div class="ai-role-kicker">${s.kicker}</div>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
          <div class="ai-reference-steps" id="ai-steps">
            ${s.steps
              .map(
                (st, i) => `<article class="ai-reference-step" data-i="${i}">
              <div class="ai-reference-step-label">Step ${i + 1}</div>
              <strong>${st[0]}</strong>
              <span>${st[1]}</span>
              <i aria-hidden="true"></i>
            </article>`
              )
              .join('')}
          </div>
          <div class="ai-human-line"><span></span>Human-in-the-loop. Nothing publishes without an owner decision.</div>
        </div>`;

      clearInterval(aiTimer);
      const steps = qsa('#ai-steps .ai-reference-step');
      let i = 0;
      steps.forEach((el) => el.classList.remove('on'));
      const tick = () => {
        if (!steps.length) return;
        steps.forEach((el, index) => el.classList.toggle('on', index === i % steps.length));
        i++;
      };
      tick();
      aiTimer = setInterval(tick, 1400);
      return;
    }

    const isHome = document.body.dataset.page === 'home';
    const homeHeading = isHome ? '#f5fbff' : '#000414';
    const homeBody = isHome ? '#d7deea' : 'var(--muted)';
    const important = isHome ? ' !important' : '';

    stage.innerHTML = `
      <div>
        <div class="kicker">${s.kicker}</div>
        <h3 style="font-size:1.45rem;margin-bottom:10px;color:${homeHeading}${important}">${s.title}</h3>
        <p style="color:${homeBody}${important};margin:0">${s.text}</p>
        <p class="hint-line" style="margin-top:12px">${
          isDeepPage()
            ? 'Interactive stepper · path lights on the Digital Risk Twin graph'
            : 'Agent path traveling twin edges in the 3D world'
        }</p>
      </div>
      <div>
        <div class="kicker">Agent run</div>
        <div class="stepper" id="ai-steps">
          ${s.steps
            .map(
              (st, i) => `<div class="step" data-i="${i}">
            <div class="idx">${String(i + 1).padStart(2, '0')}</div>
            <div><strong>${st[0]}</strong><span>${st[1]}</span></div>
          </div>`
            )
            .join('')}
        </div>
      </div>`;

    paintTwinPath(s.path);
    if (window.CVWorld && s.path) window.CVWorld.runAgentPath(s.path);

    clearInterval(aiTimer);
    const steps = qsa('#ai-steps .step');
    let i = 0;
    steps.forEach((el) => el.classList.remove('on'));
    const tick = () => {
      if (i >= steps.length) {
        clearInterval(aiTimer);
        return;
      }
      steps[i].classList.add('on');
      i++;
    };
    tick();
    aiTimer = setInterval(tick, 700);
  }

  function renderAI() {
    const tabs = qs('#ai-tabs');
    const stage = qs('#ai-stage-inner') || qs('#ai-stage');
    if (!tabs || !stage || !window.CV) return;
    const keys = Object.keys(CV.AI_SCENARIOS);

    renderAIOverview();

    tabs.innerHTML = keys
      .map(
        (k, i) =>
          `<button type="button" role="tab" data-key="${k}" class="${k === 'auditor' || (i === 0 && !CV.AI_SCENARIOS.auditor) ? 'active' : ''}">${aiRoleLabel(CV.AI_SCENARIOS[k].kicker)}</button>`
      )
      .join('');

    tabs.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn) paintAI(btn.dataset.key);
    });

    paintAI(CV.AI_SCENARIOS.auditor ? 'auditor' : keys[0]);
  }

  function renderIndustry() {
    const tabs = qs('#industry-tabs');
    const panel = qs('#industry-panel');
    if (!tabs || !panel || !window.CV) return;
    const keys = Object.keys(CV.INDUSTRIES);

    function paint(key) {
      const ind = CV.INDUSTRIES[key];
      const isHome = document.body.dataset.page === 'home';
      const bodyTone = isHome ? '#d7deea' : 'var(--muted)';
      const important = isHome ? ' !important' : '';
      qsa('button', tabs).forEach((b) => b.classList.toggle('active', b.dataset.key === key));
      panel.innerHTML = `
        <div>
          <div class="kicker">${ind.label}</div>
          <h3 style="font-size:1.45rem;margin-bottom:10px">${ind.title}</h3>
          <p style="color:${bodyTone}${important};margin:0">${ind.scenario}</p>
          <div class="outcome-box">${ind.result}</div>
        </div>
        <div>
          <div class="kicker">Signal journey</div>
          <ol class="flow-list">${ind.flow.map((s) => `<li style="color:${bodyTone}${important}">${s}</li>`).join('')}</ol>
        </div>`;
    }

    tabs.innerHTML = keys
      .map(
        (k, i) =>
          `<button type="button" data-key="${k}" class="${i === 0 ? 'active' : ''}">${CV.INDUSTRIES[k].label.split('&')[0].trim()}</button>`
      )
      .join('');
    tabs.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn) paint(btn.dataset.key);
    });
    paint(keys[0]);
  }

  function renderCompare() {
    const body = qs('#compareBody');
    const head = qs('#compareHead');
    const filters = qs('#filters');
    const regionSwitch = qs('#compare-region-switch');
    if (!body || !head || !filters || !window.CV) return;

    const categories = CV.COMPARE_CATEGORIES || {};
    let activeCat = 'all';
    let activeRegion =
      (typeof localStorage !== 'undefined' && localStorage.getItem('cv_region')) ||
      (CV.REGION && CV.REGION.default) ||
      'gcc';

    function catShort(cat) {
      return (categories[cat] || cat).slice(0, 4).toUpperCase();
    }

    function markTone(mark) {
      if (mark === '✓') return 'yes';
      if (mark === '◐') return 'partial';
      if (mark === '○') return 'limited';
      return 'absent';
    }

    function paintFilters() {
      const tabs = [{ key: 'all', label: 'All' }].concat(
        Object.entries(categories).map(([key, label]) => ({ key, label }))
      );
      filters.innerHTML = tabs
        .map(
          (tab) =>
            `<button type="button" data-cat="${tab.key}" class="${tab.key === activeCat ? 'active' : ''}">${tab.label}</button>`
        )
        .join('');
    }

    function paintHead() {
      head.innerHTML = `<tr><th>Capability</th>${CV.COMPARE_VENDORS.map(
        (name, i) => `<th class="${i === 0 ? 'vendor-cv' : ''}">${name}</th>`
      ).join('')}</tr>`;
    }

    function paintRows() {
      const rows = CV.COMPARE_ROWS.filter((row) => activeCat === 'all' || row[0] === activeCat);
      body.innerHTML = rows
        .map((row, index) => {
          const cells = row.slice(2).map((mark, cellIndex) => {
            const tone = markTone(mark);
            const cvClass = cellIndex === 0 ? ' cv' : '';
            return `<td class="mark-cell ${tone}${cvClass}"><span class="mark ${tone}">${mark}</span></td>`;
          });
          return `<tr data-cat="${row[0]}" class="${index % 2 ? 'is-striped' : ''}"><td class="capability-cell"><span class="cat-pill">${catShort(row[0])}</span><span class="capability-label">${row[1]}</span></td>${cells.join('')}</tr>`;
        })
        .join('');
    }

    function syncRegionSwitch() {
      if (!regionSwitch) return;
      qsa('button', regionSwitch).forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.region === activeRegion);
      });
    }

    function paint() {
      paintFilters();
      paintHead();
      paintRows();
      syncRegionSwitch();
    }

    paint();

    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      activeCat = btn.dataset.cat || 'all';
      paint();
    });

    if (regionSwitch) {
      regionSwitch.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn || !btn.dataset.region || btn.dataset.region === activeRegion) return;
        activeRegion = btn.dataset.region;
        if (typeof localStorage !== 'undefined') localStorage.setItem('cv_region', activeRegion);
        paint();
      });
    }
  }

  let expCurrent = null;
  let expLive = false;

  function paintIllustrated(route) {
    const label = qs('#illus-label');
    const blurb = qs('#illus-blurb');
    const pathEl = qs('#illus-path');
    const spots = qs('#illus-spots');
    const kpis = qs('#illus-kpis');
    if (label) label.textContent = route.label;
    if (blurb) blurb.textContent = route.blurb || '';
    if (pathEl) pathEl.textContent = route.path;
    if (spots) {
      spots.innerHTML = (route.spots || []).map((s) => `<li>${s}</li>`).join('');
    }
    if (kpis) {
      kpis.innerHTML = (route.kpis || []).map((k) => `<span>${k}</span>`).join('');
    }
  }

  function paintExperience() {
    const list = qs('#route-list');
    const frame = qs('#exp-frame');
    const fallback = qs('#exp-fallback');
    const status = qs('#live-status');
    const title = qs('#exp-title');
    if (!list || !window.CV) return;

    const BASE = 'http://localhost:3000';
    if (!expCurrent) {
      const hash = location.hash.slice(1);
      expCurrent = CV.LIVE_ROUTES.find((r) => r.id === hash) || CV.LIVE_ROUTES[0];
    }

    list.innerHTML = CV.LIVE_ROUTES.map(
      (r) =>
        `<button type="button" data-id="${r.id}" class="${r.id === expCurrent.id ? 'active' : ''}">${r.label}<br><span style="font-size:0.72rem;opacity:.6;font-family:var(--font-mono)">${r.path}</span></button>`
    ).join('');
    if (title && document.body.dataset.page === 'home') {
      /* keep story title on home */
    } else if (title) {
      title.textContent = expCurrent.label;
    }
    paintIllustrated(expCurrent);

    if (expLive && frame) {
      frame.src = BASE + expCurrent.path;
      fallback?.classList.add('hidden');
      status?.classList.add('live');
      if (status) status.textContent = 'Live · localhost:3000' + expCurrent.path;
    } else {
      if (frame) frame.removeAttribute('src');
      fallback?.classList.remove('hidden');
      status?.classList.remove('live');
      if (status) {
        status.textContent = isDeepPage()
          ? 'Illustrated · self-contained product shell'
          : 'Illustrated · 3D product planes';
      }
    }
  }

  function probeLiveApp() {
    return new Promise((resolve) => {
      const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timer = setTimeout(() => {
        try {
          ctrl?.abort();
        } catch (_) {}
        resolve(false);
      }, 900);
      fetch('http://localhost:3000/', {
        mode: 'no-cors',
        cache: 'no-store',
        signal: ctrl?.signal
      })
        .then(() => {
          clearTimeout(timer);
          resolve(true);
        })
        .catch(() => {
          clearTimeout(timer);
          resolve(false);
        });
    });
  }

  function renderExperience() {
    const list = qs('#route-list');
    if (!list || !window.CV) return;

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      expCurrent = CV.LIVE_ROUTES.find((r) => r.id === btn.dataset.id) || expCurrent;
      history.replaceState(null, '', '#' + expCurrent.id);
      paintExperience();
    });

    const toggle = qs('#toggle-live');
    if (toggle) {
      toggle.addEventListener('click', () => {
        expLive = !expLive;
        toggle.textContent = expLive ? 'Use illustrated UI' : 'Try live app';
        paintExperience();
      });
    }

    paintExperience();
    probeLiveApp().then((up) => {
      if (!toggle) return;
      if (up) {
        toggle.disabled = false;
        toggle.title = 'grc-frontend detected on :3000';
        const status = qs('#live-status');
        if (status && !expLive) status.textContent = 'Illustrated · app available on :3000';
      } else {
        toggle.title = 'Start grc-frontend on port 3000 to enable live iframes';
        const status = qs('#live-status');
        if (status && !expLive) {
          status.textContent = isDeepPage()
            ? 'Illustrated · localhost:3000 offline'
            : 'Illustrated · app offline';
        }
      }
    });
  }

  window.CVUI = {
    selectAI: (key) => paintAI(key),
    selectRoute: (id) => {
      if (!window.CV) return;
      expCurrent = CV.LIVE_ROUTES.find((r) => r.id === id) || expCurrent;
      paintExperience();
    },
    selectCapability: (id) => {
      if (window.CVWorld) window.CVWorld.focusCapability(id);
      if (window.CVStory) window.CVStory.openCapabilityOverlay(id);
      if (document.body.dataset.page === 'platform') openCapabilityDeep(id);
    }
  };

  function bindPlatformModal() {
    if (!isPlatformPage()) return;
    const shell = qs('#platform-modal');
    const close = qs('#platform-modal-close');
    if (!shell || !close) return;

    shell.addEventListener('click', (e) => {
      if (e.target.closest('[data-close-modal="true"]')) closeCapabilityModal();
    });
    close.addEventListener('click', () => closeCapabilityModal());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !shell.hidden) closeCapabilityModal();
    });
    window.addEventListener('hashchange', () => {
      if (!isPlatformPage()) return;
      const hash = location.hash.slice(1);
      if (!hash) {
        closeCapabilityModal({ keepHash: true });
        return;
      }
      if (hash === activePlatformCapability) return;
      if (window.CV && CV.CAPABILITIES.some((c) => c.id === hash)) openCapabilityModal(hash);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindPlatformModal();
    renderFrameworkStrip();
    renderFrameworkShowcase();
    renderAtlas();
    renderAI();
    renderIndustry();
    renderCompare();
    renderExperience();
    if (window.CVMotion) window.CVMotion.refreshReveal();
  });
})();
