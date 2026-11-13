/* marquee.js: the pause button on the frameworks marquee (tools/marquee.mjs).
   Anything that moves for more than five seconds needs a way to stop it (WCAG 2.2.2);
   hover and focus pause it in CSS, and this button holds it paused. */
(() => {
  for (const root of document.querySelectorAll('[data-marquee]')) {
    const toggle = root.querySelector('[data-marquee-toggle]');
    if (!toggle) continue;
    toggle.addEventListener('click', () => {
      const paused = toggle.getAttribute('aria-pressed') !== 'true';
      toggle.setAttribute('aria-pressed', String(paused));
      root.classList.toggle('is-paused', paused);
    });
  }
})();
