/**
 * v6 — Auto-play cinematic intro (~7.5s, hands-off).
 * Brand lockup builds → veil lifts and the world ignites (a gentle camera
 * dolly along the engine's own rail) → the Executive Dashboard panel docks →
 * control hands back to scroll.
 *
 * Guards: prefers-reduced-motion (static hero instantly), deep-link hashes,
 * missing WebGL/GSAP. Skip: button, Escape, or Enter/Space on the button.
 * While active it sets window.CVIntroActive so scroll-story yields progress
 * writes; scroll is locked and restored on finish.
 */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    const world = window.CVWorld;
    const gsap = window.gsap;
    const deepLink = !!location.hash;

    /* Static hero instantly — no auto-motion */
    if (reduced || deepLink || !world || !gsap) {
      overlay.remove();
      return;
    }

    const docEl = document.documentElement;
    const skipBtn = document.getElementById('intro-skip');
    let finished = false;

    docEl.classList.add('cv-intro-lock', 'cv-intro-brand-active');
    window.scrollTo(0, 0);
    window.CVIntroActive = true;
    overlay.classList.add('play'); /* triggers CSS keyframe build */

    const prog = { v: 0 };
    const setProg = () => world.setProgress(prog.v);

    function finish(fast) {
      if (finished) return;
      finished = true;
      window.CVIntroActive = false;
      if (window.CVScreenDock) CVScreenDock.introRelease();
      docEl.classList.remove('cv-intro-lock', 'cv-intro-brand-active');
      window.scrollTo(0, 0);
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      document.removeEventListener('keydown', onKey);
      gsap.to(overlay, {
        opacity: 0,
        duration: fast ? 0.25 : 0.6,
        ease: 'power2.out',
        onComplete: () => overlay.remove()
      });
      /* One quiet nudge, then gone */
      const nudge = document.createElement('div');
      nudge.className = 'intro-nudge';
      nudge.setAttribute('aria-hidden', 'true');
      nudge.textContent = 'Scroll — the camera follows you';
      document.body.appendChild(nudge);
      setTimeout(() => nudge.remove(), 4200);
    }

    const tl = gsap.timeline({ onComplete: () => finish(false) });

    /* 0.0–1.6s lockup builds over a deep veil (CSS animates the words) */
    tl.to({}, { duration: 1.5 });

    /* 1.5–2.4s veil thins — the atrium becomes visible */
    tl.to('#intro-overlay .intro-veil', { opacity: 0.18, duration: 1.0, ease: 'power2.inOut' }, 1.5);

    /* 1.7–4.6s world ignites: dolly forward along the rail */
    tl.to(prog, { v: 0.085, duration: 2.9, ease: 'power1.inOut', onUpdate: setProg }, 1.7);

    /* 3.6s first product screen docks (Executive Dashboard) */
    tl.add(() => {
      if (window.CVScreenDock) CVScreenDock.introDock('dashboard');
    }, 3.6);

    /* 4.6–6.9s settle back toward the hero waypoint while the screen holds */
    tl.to(prog, { v: 0.004, duration: 2.3, ease: 'power2.inOut', onUpdate: setProg }, 4.6);

    /* Clear the brand lockup before the hero headline becomes dominant. */
    tl.to('#intro-overlay .intro-core', {
      autoAlpha: 0,
      y: -26,
      duration: 0.65,
      ease: 'power2.in',
      onComplete: () => docEl.classList.remove('cv-intro-brand-active')
    }, 4.05);

    /* 6.6s release the docked screen; 6.5–7.4s overlay fades fully */
    tl.add(() => {
      if (window.CVScreenDock) CVScreenDock.introRelease();
    }, 6.6);
    tl.to('#intro-overlay .intro-veil', { opacity: 0, duration: 0.9, ease: 'power1.out' }, 6.5);

    function skip() {
      tl.kill();
      gsap.killTweensOf(prog);
      world.setProgress(0);
      finish(true);
    }

    function onKey(e) {
      if (e.key === 'Escape') skip();
    }

    if (skipBtn) skipBtn.addEventListener('click', skip);
    document.addEventListener('keydown', onKey);
  });
})();
