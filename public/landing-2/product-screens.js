/**
 * v6 — Floating live product screens ("the star of the movie").
 * Builds the 4 illustrated product shells as crisp HTML/CSS DOM (no textures,
 * no iframes, no images) inside #screen-layer, and exposes window.CVScreens:
 *   panels        — { id: { el, dock } }
 *   setMode(m)    — 'float' (3D-docked, driven by screen-dock.js)
 *                   'inline' (stacked inside their chapter panels — mobile,
 *                   reduced motion, or no-WebGL fallback)
 *   setActive(id, on) — chapter-live state: hotspot pulse, chat agent run
 *   applyRegion(r)    — re-paint region-dependent bits (readiness bars)
 *
 * Dock geometry (pc = journey progress at which the panel is centered) is
 * consumed by screen-dock.js; chapter is the inline-mode host section.
 */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const DOCK = {
    dashboard: { pc: 0.24, window: [0.115, 0.305], lateral: 1.55, vertical: 0.12, dist: 4.3, chapter: 'chapter-twin', screenX: 0.73, screenY: 0.49 },
    auditor: { pc: 0.35, window: [0.302, 0.418], lateral: 1.5, vertical: 0.1, dist: 4.4, chapter: 'chapter-atlas' },
    vulns: { pc: 0.46, window: [0.42, 0.522], lateral: -1.45, vertical: 0.1, dist: 4.3, chapter: 'chapter-secure' },
    chat: { pc: 0.575, window: [0.527, 0.648], lateral: 1.5, vertical: 0.12, dist: 4.4, chapter: 'chapter-ai' }
  };

  const panels = {};
  let mode = null;
  let chatTimer = 0;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function kpiTiles(kpis) {
    return (kpis || [])
      .map((k) => {
        const m = /^([\d.,]+[%k]?)\s*(.*)$/.exec(k);
        const val = m ? m[1] : k;
        const label = m && m[2] ? m[2] : '';
        return `<div class="ps-kpi"><strong>${esc(val)}</strong><span>${esc(label)}</span></div>`;
      })
      .join('');
  }

  function chrome(path, badge) {
    return `<div class="ps-chrome" aria-hidden="true">
      <span class="ps-dots"></span>
      <span class="ps-path">${esc(path)}</span>
      <span class="ps-live">${esc(badge || 'LIVE TWIN')}</span>
    </div>`;
  }

  function hotspot(cap, label) {
    return `<button type="button" class="ps-hotspot" data-cap="${esc(cap)}" aria-label="${esc(label)}"><i aria-hidden="true"></i></button>`;
  }

  /* —— 1 · Executive Dashboard + 5×5 heatmap —— */
  function buildDashboard(d) {
    const route = (window.CV && CV.LIVE_ROUTES.find((r) => r.id === 'dashboard')) || {};
    const bands = (score) => (score >= 15 ? 5 : score >= 10 ? 4 : score >= 5 ? 3 : score >= 3 ? 2 : 1);
    let cells = '';
    for (let r = 0; r < 5; r++) {
      const impact = 5 - r;
      cells += `<span class="heat-axis-y" aria-hidden="true">${impact}</span>`;
      for (let c = 0; c < 5; c++) {
        const likelihood = c + 1;
        const score = impact * likelihood;
        const count = d.heat[r][c];
        const marks =
          (d.inherent[0] === r && d.inherent[1] === c ? '<i class="heat-mark inh" aria-hidden="true"></i>' : '') +
          (d.residual[0] === r && d.residual[1] === c ? '<i class="heat-mark res" aria-hidden="true"></i>' : '');
        cells += `<div class="heat-cell hb${bands(score)}${count === 0 ? ' zero' : ''}" role="img"
          aria-label="Impact ${impact}, likelihood ${likelihood}: ${count} risks"
          title="Impact ${impact} × Likelihood ${likelihood} · score ${score} · ${count} risks">${count || ''}${marks}</div>`;
      }
    }
    const axisX = ['', 1, 2, 3, 4, 5]
      .map((n, i) => `<span class="heat-axis-x" aria-hidden="true">${i === 0 ? '' : n}</span>`)
      .join('');

    return `
      ${chrome(d.path)}
      <header class="ps-head">
        <h3>${esc(d.title)}</h3>
        <p class="ps-sub"><span data-region-gcc>${esc(CV.REGION.scope.gcc)}</span><span data-region-global>${esc(CV.REGION.scope.global)}</span></p>
      </header>
      <div class="ps-kpis">${kpiTiles(route.kpis)}</div>
      <div class="ps-block">
        <div class="ps-block-title">Inherent → residual · 5×5</div>
        <div class="ps-heat">${cells}${axisX}</div>
        <div class="heat-legend">
          <span><i class="heat-mark inh"></i> inherent</span>
          <span><i class="heat-mark res"></i> residual</span>
          <span class="heat-scale" aria-hidden="true"><i class="hb1"></i><i class="hb2"></i><i class="hb3"></i><i class="hb4"></i><i class="hb5"></i></span>
          <span>impact ↑ · likelihood →</span>
        </div>
      </div>
      <div class="ps-block">
        <div class="ps-block-title">Framework readiness</div>
        <div class="ps-readiness" data-slot="readiness"></div>
      </div>
      <div class="ps-block">
        <div class="ps-block-title">Open actions</div>
        <ul class="ps-actions">
          ${d.actions.map((a) => `<li><span>${esc(a[0])}</span><em class="${/overdue|SLA/.test(a[1]) ? 'hot' : ''}">${esc(a[1])}</em></li>`).join('')}
        </ul>
      </div>
      ${hotspot(d.capability, 'Open Enterprise Risk Management detail')}`;
  }

  function paintReadiness(region) {
    const host = panels.dashboard && panels.dashboard.el.querySelector('[data-slot="readiness"]');
    if (!host || !window.CV || !CV.REGION) return;
    const rows = CV.REGION.readiness[region] || [];
    host.innerHTML = rows
      .map(
        ([label, pct]) => `<div class="ps-bar">
          <span class="ps-bar-label">${esc(label)}</span>
          <span class="ps-bar-track"><i style="width:${pct}%"></i></span>
          <span class="ps-bar-val">${pct}%</span>
        </div>`
      )
      .join('');
  }

  /* —— 2 · Auditor Portal + Evidence (the moat) —— */
  function buildAuditor(d) {
    const gauge = ([label, pct]) => `
      <div class="ps-gauge" role="img" aria-label="${esc(label)} readiness ${pct} percent">
        <div class="ps-gauge-ring" style="--val:${pct}"><b>${pct}<i>%</i></b></div>
        <span>${esc(label)}</span>
      </div>`;
    return `
      ${chrome(d.path, 'TENANT-SCOPED')}
      <header class="ps-head">
        <h3>${esc(d.title)}</h3>
        <p class="ps-sub">${esc(d.journey)} · ${d.inScope} in scope · <b class="ps-pending" data-slot="pending">${d.pending}</b> pending</p>
      </header>
      <div class="ps-gauges">${d.gauges.map(gauge).join('')}</div>
      <div class="ps-block">
        <div class="ps-block-title">Controls spine</div>
        <ul class="ps-spine">
          ${d.spine
            .map(
              ([id, app, pct, req]) => `<li>
              <span class="spine-id">${esc(id)}</span>
              <span class="spine-app ${app === 'Applicable' ? 'ok' : 'part'}">${esc(app)}</span>
              <span class="spine-impl"><span class="impl-track"><i style="width:${pct}%"></i></span><b>${pct}%</b></span>
              <span class="spine-req">${esc(req)}</span>
            </li>`
            )
            .join('')}
        </ul>
      </div>
      <div class="ps-block">
        <div class="ps-block-title">Evidence queue · OCR-scored</div>
        <ul class="ps-evidence">
          ${d.evidence
            .map(
              ([id, label, ocr]) => `<li data-ev="${esc(id)}">
              <span class="ev-meta"><b>${esc(id)}</b> ${esc(label)}<em>OCR ${ocr.toFixed(2)}</em></span>
              <span class="ev-actions">
                <button type="button" class="ev-approve" data-decide="approve" aria-label="Approve ${esc(id)}">Approve</button>
                <button type="button" class="ev-reject" data-decide="reject" aria-label="Reject ${esc(id)}">Reject</button>
              </span>
              <span class="ev-done" aria-hidden="true"></span>
            </li>`
            )
            .join('')}
        </ul>
      </div>
      ${hotspot(d.capability, 'Open Auditor Portal detail')}`;
  }

  function wireEvidence(el, d) {
    let pending = d.pending;
    const counter = el.querySelector('[data-slot="pending"]');
    el.querySelectorAll('.ps-evidence li').forEach((li) => {
      li.querySelectorAll('button[data-decide]').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (li.dataset.decided) return;
          const verdict = btn.dataset.decide;
          li.dataset.decided = verdict;
          li.classList.add('decided', verdict === 'approve' ? 'approved' : 'rejected');
          li.querySelector('.ev-done').textContent = verdict === 'approve' ? '✓ Approved' : '✕ Rejected';
          pending = Math.max(0, pending - 1);
          if (counter) counter.textContent = String(pending);
        });
      });
    });
  }

  /* —— 3 · ComplyChat + agent path —— */
  function buildChat(d) {
    return `
      ${chrome(d.path, 'SOURCE-LINKED')}
      <header class="ps-head">
        <h3>${esc(d.title)}</h3>
        <p class="ps-sub">Tenant-scoped · SQL-grounded · role-aware</p>
      </header>
      <div class="ps-chat">
        <div class="chat-bubble user"><span class="chat-who">CRO</span>${esc(d.question)}</div>
        <div class="chat-bubble bot">
          <span class="chat-who">ComplyChat</span>
          ${esc(d.answer)}
          <div class="chat-sources">
            ${d.sources.map((s) => `<button type="button" class="chat-source" aria-label="Open source ${esc(s)}">${esc(s)}</button>`).join('')}
          </div>
        </div>
      </div>
      <div class="ps-block">
        <div class="ps-block-title">Agent path · twin edges</div>
        <ol class="ps-agent" data-slot="agent">
          ${d.steps.map((s, i) => `<li class="${i === 0 ? 'on' : ''}"><b>${String(i + 1).padStart(2, '0')}</b>${esc(s)}</li>`).join('')}
        </ol>
        <p class="ps-agent-note">${esc(d.stepNote)}</p>
      </div>
      ${hotspot(d.capability, 'Open ComplyChat detail')}`;
  }

  function runChatSteps(el, on) {
    clearInterval(chatTimer);
    const steps = Array.from(el.querySelectorAll('.ps-agent li'));
    if (!steps.length) return;
    if (reduced || !on) {
      steps.forEach((s) => s.classList.add('on'));
      return;
    }
    let i = 0;
    steps.forEach((s) => s.classList.remove('on'));
    chatTimer = setInterval(() => {
      if (i < steps.length) {
        steps[i].classList.add('on');
        i++;
      } else {
        i = 0;
        steps.forEach((s) => s.classList.remove('on'));
      }
    }, 760);
  }

  /* —— 4 · Vulnerabilities (EPSS) + Assets —— */
  function buildVulns(d) {
    const assets = (window.CV && CV.LIVE_ROUTES.find((r) => r.id === 'assets')) || {};
    return `
      ${chrome(d.path, 'DEDUPED')}
      <header class="ps-head">
        <h3>${esc(d.title)}</h3>
        <p class="ps-sub">Multi-scanner ingest · EPSS × asset criticality · SLA clocks</p>
      </header>
      <div class="ps-tablewrap">
        <table class="ps-table">
          <thead><tr><th>CVE</th><th>Scanner</th><th>CVSS</th><th>EPSS</th><th>CIA</th><th>SLA</th></tr></thead>
          <tbody>
            ${d.rows
              .map(
                ([cve, scanner, cvss, epss, cia, sla, sev, dedup]) => `<tr class="sev-${sev}">
                <td class="mono">${esc(cve)}</td>
                <td>${esc(scanner)}${dedup ? '<span class="dedup" title="2 findings normalized to 1 record">2→1</span>' : ''}</td>
                <td class="mono">${esc(cvss)}</td>
                <td class="mono epss"><i style="width:${epss}%"></i><b>${epss}%</b></td>
                <td class="mono cia">${esc(cia)}</td>
                <td class="mono sla">${esc(sla)}</td>
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
      <p class="ps-note">${esc(d.note)}</p>
      <div class="ps-block">
        <div class="ps-block-title">Asset context</div>
        <div class="ps-kpis">${kpiTiles(assets.kpis)}</div>
      </div>
      ${hotspot(d.capability, 'Open Vulnerability Governance detail')}`;
  }

  /* —— assembly —— */
  function build() {
    const layer = document.getElementById('screen-layer');
    if (!layer || !window.CV || !CV.PRODUCT_SCREENS) return;
    const S = CV.PRODUCT_SCREENS;
    const builders = {
      dashboard: buildDashboard,
      auditor: buildAuditor,
      chat: buildChat,
      vulns: buildVulns
    };

    Object.keys(DOCK).forEach((id) => {
      const el = document.createElement('article');
      el.className = 'ps-panel ps-' + id;
      el.id = 'panel-' + id;
      el.setAttribute('role', 'group');
      el.setAttribute('aria-label', S[id].title + ' — product preview');
      el.innerHTML = builders[id](S[id]);
      layer.appendChild(el);
      panels[id] = { el, dock: DOCK[id], active: false };
    });

    paintReadiness(window.CVRegion ? CVRegion.get() : 'gcc');
    wireEvidence(panels.auditor.el, S.auditor);

    /* Hotspots — open the capability overlay (reuse .feature-overlay) */
    layer.addEventListener('click', (e) => {
      const spot = e.target.closest('.ps-hotspot');
      if (spot && window.CVStory) {
        CVStory.openCapabilityOverlay(spot.dataset.cap);
        return;
      }
      const src = e.target.closest('.chat-source');
      if (src && window.CVStory) CVStory.openCapabilityOverlay('complychat');
    });

    if (window.CVRegion) CVRegion.onChange((r) => paintReadiness(r));
  }

  /* —— float ⇄ inline placement —— */
  let io = null;
  function setMode(next) {
    if (next === mode || !panels.dashboard) return;
    mode = next;
    if (io) {
      io.disconnect();
      io = null;
    }
    const layer = document.getElementById('screen-layer');
    Object.keys(panels).forEach((id) => {
      const { el, dock } = panels[id];
      el.classList.toggle('is-inline', mode === 'inline');
      el.style.cssText = ''; /* clear float transforms */
      if (mode === 'inline') {
        const host = document.querySelector('#' + dock.chapter + ' .chapter-panel');
        (host || layer).appendChild(el);
      } else {
        layer.appendChild(el);
      }
    });

    if (mode === 'inline') {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            const id = en.target.id.replace('panel-', '');
            setActive(id, en.isIntersecting && en.intersectionRatio > 0.3);
          }),
        { threshold: [0, 0.35] }
      );
      Object.keys(panels).forEach((id) => io.observe(panels[id].el));
    }

    if (window.CVStory) CVStory.refresh();
    else if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  function setActive(id, on) {
    const p = panels[id];
    if (!p || p.active === on) return;
    p.active = on;
    p.el.classList.toggle('is-live', on);
    if (id === 'chat') {
      runChatSteps(p.el, on);
      if (on && window.CVWorld && window.CV && CV.AI_SCENARIOS && CV.AI_SCENARIOS.regulatory) {
        CVWorld.runAgentPath(CV.AI_SCENARIOS.regulatory.path);
      }
    }
  }

  window.CVScreens = {
    panels,
    dock: DOCK,
    setMode,
    setActive,
    applyRegion: paintReadiness
  };

  document.addEventListener('DOMContentLoaded', build);
})();
