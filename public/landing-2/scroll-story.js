/**
 * Scroll-driven storytelling — GSAP ScrollTrigger scrub + soft chapter UI
 * Camera progress, depth veil, edge lighting sync, reduced-motion fallback
 */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function smoothstep(t) {
    const x = Math.max(0, Math.min(1, t));
    return x * x * (3 - 2 * x);
  }

  function damp(current, target, lambda, dt) {
    return current + (target - current) * (1 - Math.exp(-lambda * dt));
  }

  function chapterFromHash() {
    const raw = (location.hash || '').replace(/^#/, '');
    if (!raw) return null;
    const map = {
      platform: 'atlas',
      atlas: 'atlas',
      'chapter-atlas': 'atlas',
      ai: 'ai',
      'chapter-ai': 'ai',
      compare: 'compare',
      comparison: 'compare',
      'chapter-compare': 'compare',
      experience: 'experience',
      'chapter-experience': 'experience',
      twin: 'twin',
      'chapter-twin': 'twin',
      industry: 'industry',
      'chapter-industry': 'industry',
      auditor: 'atlas'
    };
    return map[raw] || (raw.startsWith('chapter-') ? raw.slice(8) : null);
  }

  function initStory() {
    const track = document.getElementById('story-track');
    const chapters = Array.from(document.querySelectorAll('.story-chapter'));
    const progressBar = document.getElementById('journey-progress');
    const chapterLabel = document.getElementById('journey-label');
    const veil = document.getElementById('depth-veil');
    if (!track || !chapters.length) return;

    let world = null;
    const canvas = document.getElementById('world-canvas');
    let scrubProgress = 0;
    let displayProgress = 0;
    let activeIndex = 0;
    let targetActive = 0;
    let chapterWeights = chapters.map(() => 0);
    let lastTs = performance.now();
    let scrollTrigger = null;
    let rafUi = 0;

    function openCapabilityOverlay(id) {
      const cap = window.CV && CV.CAPABILITIES.find((c) => c.id === id);
      const panel = document.getElementById('feature-overlay');
      if (!cap || !panel) return;
      const mission = CV.MISSIONS[cap.mission];
      document.getElementById('overlay-num').textContent = cap.num;
      document.getElementById('overlay-mission').textContent =
        mission.label + (cap.id === 'auditor' ? ' · elevated' : '');
      document.getElementById('overlay-title').textContent = cap.title;
      document.getElementById('overlay-tag').textContent = cap.tag;
      document.getElementById('overlay-features').innerHTML = cap.features
        .map((f) => `<li>${f}</li>`)
        .join('');
      document.getElementById('overlay-meta').innerHTML = `
        <div><strong>AI</strong>${cap.ai}</div>
        <div><strong>Use case</strong>${cap.useCase}</div>
        <div><strong>Example</strong>${cap.example}</div>
        <div><strong>Outcome</strong>${cap.outcome}</div>`;
      panel.hidden = false;
      // Force reflow so open transition plays
      void panel.offsetWidth;
      panel.classList.add('open');

      document.querySelectorAll('#atlas-grid .atlas-node').forEach((el) => {
        el.classList.toggle('active', el.dataset.id === id);
      });
    }

    function closeOverlay() {
      const panel = document.getElementById('feature-overlay');
      if (!panel) return;
      if (!panel.classList.contains('open')) {
        panel.hidden = true;
        return;
      }
      panel.classList.remove('open');
      const hide = () => {
        if (!panel.classList.contains('open')) panel.hidden = true;
      };
      panel.addEventListener('transitionend', hide, { once: true });
      setTimeout(hide, 400);
      if (world) world.clearFocus();
    }

    document.getElementById('overlay-close')?.addEventListener('click', closeOverlay);

    if (canvas && window.ComplyWorld && window.THREE) {
      const focus = chapterFromHash();
      const focusMeta = focus && CV.CHAPTER_FOCUS ? CV.CHAPTER_FOCUS[focus] : null;
      world = new window.ComplyWorld(canvas, {
        initialProgress: focusMeta ? focusMeta.progress : 0,
        onStationSelect: (id) => {
          openCapabilityOverlay(id);
          const el = document.getElementById('chapter-atlas');
          if (el && !el.classList.contains('is-active')) {
            el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
          }
        },
        onScreenSelect: (data) => {
          if (data.id === 'auditor' || (data.kind === 'holo' && data.id === 'auditor')) {
            world.focusCapability('auditor');
            openCapabilityOverlay('auditor');
            document
              .getElementById('chapter-atlas')
              ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
          } else if (data.chapter === 'ai' || data.id === 'complychat') {
            document
              .getElementById('chapter-ai')
              ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
            if (window.CVUI) window.CVUI.selectAI('chat');
          } else if (data.kind === 'experience') {
            document
              .getElementById('chapter-experience')
              ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
            if (window.CVUI) window.CVUI.selectRoute(data.id);
          } else if (data.id === 'controls') {
            world.focusCapability('controls');
            openCapabilityOverlay('controls');
          }
        }
      });
      window.CVWorld = world;
      scrubProgress = focusMeta ? focusMeta.progress : 0;
      displayProgress = scrubProgress;
    }

    function computeScrollProgress() {
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      return total > 0 ? scrolled / total : 0;
    }

    function measureChapters() {
      const vh = window.innerHeight;
      let best = 0;
      let bestScore = -1;
      chapters.forEach((ch, i) => {
        const r = ch.getBoundingClientRect();
        const mid = r.top + r.height * 0.32;
        // Soft visibility score centered around upper viewport
        const dist = (mid - vh * 0.42) / (vh * 0.55);
        const score = Math.max(0, 1 - Math.abs(dist));
        chapterWeights[i] = score;
        if (score > bestScore) {
          bestScore = score;
          best = i;
        }
      });
      targetActive = best;
      return best;
    }

    function applyProgress(t) {
      scrubProgress = Math.max(0, Math.min(1, t));
      if (reduced && world) {
        world.setProgress(scrubProgress);
        displayProgress = scrubProgress;
      }
    }

    function syncVeilAndLighting(t) {
      // Depth veil breathes with story arc — synced to twin energy, no hard snaps
      const twinPeak = smoothstep((t - 0.08) / 0.2) * (1 - smoothstep((t - 0.45) / 0.25));
      const late = smoothstep((t - 0.7) / 0.28);
      const veilTarget = 0.18 + twinPeak * 0.2 + Math.sin(t * Math.PI) * 0.1 + late * 0.08;
      if (veil) {
        const cur = parseFloat(veil.style.opacity || '0.3') || 0.3;
        // Only set CSS var path; rAF loop damps visual opacity
        veil.dataset.targetOpacity = String(veilTarget);
        if (reduced) veil.style.opacity = String(veilTarget);
        else if (!veil.dataset.inited) {
          veil.style.opacity = String(cur);
          veil.dataset.inited = '1';
        }
      }
      document.documentElement.style.setProperty('--story-t', String(t.toFixed(4)));
      document.documentElement.style.setProperty(
        '--edge-glow',
        String((0.2 + twinPeak * 0.55 + late * 0.25).toFixed(3))
      );
    }

    function updateChapterPanels() {
      chapters.forEach((ch, i) => {
        const w = chapterWeights[i] || 0;
        const panel = ch.querySelector('.chapter-panel');
        const on = i === targetActive;
        ch.classList.toggle('is-active', on);
        if (panel && !reduced) {
          // Soft CSS custom props driven by continuous weight (no binary opacity pop)
          const opacity = 0.42 + w * 0.58;
          const blur = Math.max(0, (1 - w) * 1.4);
          const ty = (1 - w) * 18;
          panel.style.setProperty('--panel-opacity', opacity.toFixed(3));
          panel.style.setProperty('--panel-blur', blur.toFixed(2) + 'px');
          panel.style.setProperty('--panel-ty', ty.toFixed(2) + 'px');
        }
      });

      if (chapterLabel && window.CV && CV.STORY[targetActive]) {
        chapterLabel.textContent = CV.STORY[targetActive].kicker;
      }

      const id = chapters[targetActive]?.id || '';
      if (id !== 'chapter-atlas') closeOverlay();

      document.querySelectorAll('.nav-links a').forEach((a) => {
        const href = a.getAttribute('href') || '';
        a.classList.toggle('active', href === '#' + id);
      });

      if (world && CV.STORY[targetActive]?.id === 'ai' && !world.agentActive) {
        const scen = CV.AI_SCENARIOS && CV.AI_SCENARIOS.auditor;
        if (scen) world.runAgentPath(scen.path);
      }
    }

    function uiTick(now) {
      rafUi = requestAnimationFrame(uiTick);
      const dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      if (!reduced) {
        displayProgress = damp(displayProgress, scrubProgress, 12, dt);
        // v6: yield progress writes to intro.js while the cinematic intro runs
        if (world && !window.CVIntroActive) world.setProgress(displayProgress);

        if (progressBar) {
          progressBar.style.transform = `scaleX(${displayProgress})`;
        }

        if (veil && veil.dataset.targetOpacity) {
          const target = parseFloat(veil.dataset.targetOpacity);
          const cur = parseFloat(veil.style.opacity || '0.3') || 0.3;
          veil.style.opacity = String(damp(cur, target, 5, dt));
        }
      } else if (progressBar) {
        progressBar.style.transform = `scaleX(${scrubProgress})`;
      }

      measureChapters();
      // Soften active index flips
      if (activeIndex !== targetActive) {
        activeIndex = targetActive;
        updateChapterPanels();
      } else if (!reduced) {
        updateChapterPanels();
      }

      syncVeilAndLighting(reduced ? scrubProgress : displayProgress);
    }

    // Fill chapter shells from CV.STORY
    if (window.CV && CV.STORY) {
      chapters.forEach((ch, i) => {
        const s = CV.STORY[i];
        if (!s) return;
        const k = ch.querySelector('[data-kicker]');
        const h = ch.querySelector('[data-title]');
        const b = ch.querySelector('[data-body]');
        const c = ch.querySelector('[data-cta]');
        if (k) k.textContent = s.kicker;
        if (h && !h.id) h.textContent = s.title;
        else if (h && h.id === 'exp-title') h.textContent = s.title;
        if (b) b.textContent = s.body;
        if (c) {
          if (s.cta) {
            c.hidden = false;
            c.style.display = '';
            c.href = s.cta.href;
            c.textContent = s.cta.label;
          } else {
            c.hidden = true;
            c.style.display = 'none';
            c.textContent = '';
            c.removeAttribute('href');
          }
        }
      });
    }

    function setupScrollDriver() {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      if (!reduced && gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        scrollTrigger = ScrollTrigger.create({
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            applyProgress(self.progress);
          }
        });

        // Ease progress mapping slightly with expo mid-curve via onUpdate already scrubbed
        const onRefresh = () => {
          ScrollTrigger.refresh();
          applyProgress(computeScrollProgress());
          measureChapters();
          updateChapterPanels();
        };

        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(onRefresh, 120);
        });

        // Images / fonts / late layout
        window.addEventListener('load', () => {
          ScrollTrigger.refresh();
        });

        applyProgress(computeScrollProgress());
      } else {
        // Native fallback (also used for reduced motion)
        const onScroll = () => {
          applyProgress(computeScrollProgress());
          if (reduced) {
            measureChapters();
            updateChapterPanels();
            syncVeilAndLighting(scrubProgress);
            if (progressBar) progressBar.style.transform = `scaleX(${scrubProgress})`;
          }
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(onScroll, 100);
        });
      }
    }

    setupScrollDriver();
    measureChapters();
    updateChapterPanels();
    syncVeilAndLighting(scrubProgress);

    if (!reduced) {
      rafUi = requestAnimationFrame(uiTick);
    }

    const skip = document.getElementById('skip-journey');
    if (skip) {
      skip.addEventListener('click', () => {
        document.getElementById('chapter-arrive')?.scrollIntoView({
          behavior: reduced ? 'auto' : 'smooth'
        });
      });
    }

    function jumpToFocus() {
      const focus = chapterFromHash();
      if (!focus) return;
      const el =
        document.getElementById('chapter-' + focus) || document.getElementById(focus);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
          if (window.ScrollTrigger) window.ScrollTrigger.refresh();
          if (focus === 'atlas' && location.hash.includes('auditor')) {
            setTimeout(() => {
              if (world) world.focusCapability('auditor');
              openCapabilityOverlay('auditor');
            }, 450);
          }
        });
      }
    }
    jumpToFocus();
    window.addEventListener('hashchange', jumpToFocus);

    window.CVStory = {
      openCapabilityOverlay,
      closeOverlay,
      getWorld: () => world,
      refresh: () => {
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        applyProgress(computeScrollProgress());
      }
    };
  }

  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!els.length) return;
    if (reduced) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
  }

  window.CVMotion = { refreshReveal: initReveal };

  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initStory();
    initReveal();
  });
})();
