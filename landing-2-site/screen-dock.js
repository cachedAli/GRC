/**
 * v6 — Screen dock: projects invisible 3D anchors to 2D and drives the
 * floating product panels (position, perspective tilt, cursor parallax,
 * chapter-windowed fade). Panels stay crisp interactive HTML — never textures.
 *
 * Anchors are computed from the engine's own camera rail: for each panel we
 * sample world.sampleRail(pc) at the chapter's center progress and place the
 * anchor dist units along the camera's forward axis, offset laterally, so the
 * panel is guaranteed on-frame at its docking moment and drifts past with
 * genuine parallax before/after. Runs its own rAF, read-only against
 * ComplyWorld — it never writes progress, so it cannot fight ScrollTrigger.
 *
 * Fallbacks: reduced motion, viewports < 960px, or missing WebGL all switch
 * CVScreens to 'inline' mode (panels stack inside their chapters) and this
 * module stays dormant.
 */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mqNarrow = window.matchMedia('(max-width: 959px)');

  let world = null;
  let anchors = null;
  let raf = 0;
  let intro = null; /* panel id force-docked by intro.js */
  const state = {}; /* per-panel damped display values */

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }
  function smooth(t) {
    const x = clamp(t, 0, 1);
    return x * x * (3 - 2 * x);
  }
  function damp(cur, target, lambda, dt) {
    return cur + (target - cur) * (1 - Math.exp(-lambda * dt));
  }

  function computeAnchors() {
    if (!world || !window.THREE || !window.CVScreens) return;
    const up = new THREE.Vector3(0, 1, 0);
    anchors = {};
    Object.keys(CVScreens.dock).forEach((id) => {
      const d = CVScreens.dock[id];
      const { pos, look } = world.sampleRail(d.pc);
      const fwd = look.clone().sub(pos).normalize();
      const right = new THREE.Vector3().crossVectors(fwd, up).normalize();
      anchors[id] = {
        v: pos
          .clone()
          .add(fwd.multiplyScalar(d.dist))
          .add(right.multiplyScalar(d.lateral))
          .add(up.clone().multiplyScalar(d.vertical)),
        refDist: d.dist
      };
      state[id] = { x: innerWidth / 2, y: innerHeight / 2, s: 0.9, rx: 0, ry: 0, a: 0, shown: false };
    });
  }

  const proj = { v: null };
  let lastTs = 0;

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (document.hidden || !anchors) return;
    const dt = Math.min((now - lastTs) / 1000 || 0.016, 0.05);
    lastTs = now;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const p = world.progress;
    const mx = world.mouse ? world.mouse.x : 0; /* engine-damped cursor */
    const my = world.mouse ? world.mouse.y : 0;
    if (!proj.v) proj.v = new THREE.Vector3();

    Object.keys(anchors).forEach((id) => {
      const panel = CVScreens.panels[id];
      if (!panel) return;
      const el = panel.el;
      const st = state[id];
      const dock = CVScreens.dock[id];
      const isIntro = intro === id;

      let tx, ty, ts, ta, trx, tryy;

      if (isIntro) {
        /* Hero docking pose during the auto-play intro */
        tx = vw * 0.63;
        ty = vh * 0.47;
        ts = 1;
        ta = 1;
        trx = 3.5;
        tryy = -8;
      } else {
        proj.v.copy(anchors[id].v).project(world.camera);
        const behind = proj.v.z > 1;
        tx = (proj.v.x * 0.5 + 0.5) * vw;
        ty = (-proj.v.y * 0.5 + 0.5) * vh;

        /* Chapter window fade (feathered both ends) */
        const f = 0.03;
        const w = dock.window;
        ta = behind ? 0 : smooth((p - w[0]) / f) * smooth((w[1] - p) / f);

        /* Gentle keep-in-frame clamp so a docked panel never hides under nav/HUD */
        tx = clamp(tx, vw * 0.16, vw * 0.84);
        ty = clamp(ty, vh * 0.2, vh * 0.72);

        /* Perspective scale from true camera distance */
        const dist = world.camera.position.distanceTo(anchors[id].v);
        ts = clamp(anchors[id].refDist / Math.max(dist, 0.01), 0.6, 1.12);

        /* Tilt: face slightly toward screen center + cursor drift */
        tryy = ((tx - vw / 2) / vw) * -16 + mx * -3.2;
        trx = ((ty - vh / 2) / vh) * 10 + my * 2.6;
        tx += mx * 12;
        ty += my * -8;
      }

      /* Damp everything — bridges intro release and scroll spikes smoothly */
      st.x = damp(st.x, tx, 11, dt);
      st.y = damp(st.y, ty, 11, dt);
      st.s = damp(st.s, ts, 9, dt);
      st.a = damp(st.a, ta, isIntro ? 6 : 10, dt);
      st.rx = damp(st.rx, trx, 9, dt);
      st.ry = damp(st.ry, tryy, 9, dt);

      const visible = st.a > 0.02;
      if (visible !== st.shown) {
        st.shown = visible;
        el.classList.toggle('is-docked', visible);
      }
      if (visible) {
        el.style.opacity = st.a.toFixed(3);
        el.style.transform =
          `translate3d(${st.x.toFixed(1)}px, ${st.y.toFixed(1)}px, 0) translate(-50%, -50%) ` +
          `perspective(1000px) rotateX(${st.rx.toFixed(2)}deg) rotateY(${st.ry.toFixed(2)}deg) ` +
          `scale(${st.s.toFixed(3)})`;
      }

      /* Chapter-live state with hysteresis (hotspot pulse, chat agent run) */
      if (ta > 0.55 && !panel.active) CVScreens.setActive(id, true);
      else if (ta < 0.28 && panel.active && !isIntro) CVScreens.setActive(id, false);
    });
  }

  function currentMode() {
    return reduced || mqNarrow.matches || !world ? 'inline' : 'float';
  }

  function applyMode() {
    if (!window.CVScreens) return;
    const m = currentMode();
    CVScreens.setMode(m);
    if (m === 'float') {
      if (!anchors) computeAnchors();
      if (!raf) raf = requestAnimationFrame(frame);
    } else if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function start() {
    world = window.CVWorld || null;
    applyMode();
    if (mqNarrow.addEventListener) {
      mqNarrow.addEventListener('change', applyMode);
    } else if (mqNarrow.addListener) {
      mqNarrow.addListener(applyMode); /* older Safari */
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    /* scroll-story creates CVWorld in its own DOMContentLoaded handler which
       registers first — but wait a few frames in case of slow init, then
       fall back to inline mode gracefully (no WebGL / no THREE). */
    let tries = 0;
    (function waitWorld() {
      if (window.CVWorld || tries > 40) {
        start();
        return;
      }
      tries++;
      requestAnimationFrame(waitWorld);
    })();
  });

  window.CVScreenDock = {
    introDock(id) {
      if (currentMode() !== 'float' || !state[id]) return false;
      intro = id;
      return true;
    },
    introRelease() {
      intro = null;
    },
    refresh: computeAnchors
  };
})();
