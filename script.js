// Cursor effects. Skipped entirely if the visitor prefers reduced motion.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const root = document.documentElement;

  // Page-wide glow that trails the cursor with a little lag (the "liquid" feel)
  let x = window.innerWidth * 0.7, y = window.innerHeight * 0.3;
  let tx = x, ty = y;

  window.addEventListener('pointermove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  (function follow() {
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    root.style.setProperty('--cx', x + 'px');
    root.style.setProperty('--cy', y + 'px');
    requestAnimationFrame(follow);
  })();

  // Light inside each card that follows the cursor
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
    // Fade sections in as they scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -12% 0px' });

  document.querySelectorAll('section').forEach((s) => {
    s.classList.add('reveal');
    observer.observe(s);
  });
}
