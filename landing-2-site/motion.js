/* Deep-page motion: ambient canvas + reveal + reduced-motion respect */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initAmbient() {
    const host = document.querySelector('.ambient-field');
    if (!host || reduce) return;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let raf = 0;
    const dots = Array.from({ length: 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.00025,
      vy: (Math.random() - 0.5) * 0.00025,
      a: 0.15 + Math.random() * 0.35
    }));

    function resize() {
      w = canvas.width = window.innerWidth * devicePixelRatio;
      h = canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(18,216,255,${d.a})`;
        ctx.arc(d.x * cw, d.y * ch, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    frame();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else frame();
    });
  }

  function refreshReveal() {
    const nodes = document.querySelectorAll('.reveal');
    if (!nodes.length) return;
    if (reduce) {
      nodes.forEach((n) => n.classList.add('in'));
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
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    nodes.forEach((n) => io.observe(n));
  }

  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  window.CVMotion = { refreshReveal, reduce };

  document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.page !== 'home') {
      initAmbient();
      initNav();
      refreshReveal();
    }
  });
})();
