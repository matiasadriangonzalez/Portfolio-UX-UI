/* JavaScript vanilla, sin dependencias. Mejora progresiva: el sitio funciona sin este archivo. */
(() => {
  const root = document.documentElement;
  const nav = document.querySelector('[data-nav]');
  const menu = document.getElementById('menu-movil');
  const openBtn = document.querySelector('[data-menu-open]');
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const fab = document.querySelector('[data-fab]');
  const hint = document.querySelector('[data-scroll-hint]');

  /* Barra de navegación: transparente sobre el hero, sólida al scrollear (y vuelve al volver arriba) */
  const sentinel = document.getElementById('nav-sentinel');
  if (nav && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => nav.classList.toggle('is-solid', !e.isIntersecting), { rootMargin: '40px 0px 0px 0px' }).observe(sentinel);
  }

  /* Menú móvil */
  const setMenu = (open) => {
    if (!menu || !openBtn) return;
    menu.hidden = !open;
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector('button, a')?.focus();
    else openBtn.focus();
  };
  openBtn?.addEventListener('click', () => setMenu(true));
  menu?.querySelectorAll('[data-menu-close]').forEach((el) => el.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu && !menu.hidden) setMenu(false); });

  /* Tema claro / oscuro */
  themeBtn?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* sin almacenamiento */ }
  });

  /* Botón de WhatsApp: aparece al salir del hero y se oculta en Contacto y footer, donde ya hay enlace */
  if (fab && 'IntersectionObserver' in window) {
    const hero = document.getElementById('inicio');
    const quiet = [document.getElementById('contacto'), document.querySelector('[data-footer]')].filter(Boolean);
    let pastHero = false;
    let inQuiet = 0;
    const bubble = document.querySelector('[data-fab-bubble]');
    let bubbleDone = false;
    const update = () => {
      const visible = pastHero && inQuiet === 0;
      fab.classList.toggle('is-visible', visible);
      /* El globo se muestra una sola vez por visita: aparece al salir del hero y se retira a los 6 s */
      if (visible && bubble && !bubbleDone) {
        bubbleDone = true;
        setTimeout(() => bubble.classList.add('is-shown'), 700);
        setTimeout(() => bubble.classList.remove('is-shown'), 6700);
      }
    };
    if (hero) new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; update(); }, { rootMargin: '-40% 0px 0px 0px' }).observe(hero);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { inQuiet += e.isIntersecting ? 1 : -1; });
      inQuiet = Math.max(0, inQuiet);
      update();
    });
    quiet.forEach((el) => io.observe(el));
  }

  /* Baldosas de proyecto: inclinación hacia el cursor y brillo que lo sigue.
     Solo con puntero real (hover: hover) y sin prefers-reduced-motion. */
  const canTilt = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)');
  if (canTilt.matches) {
    const MAX = 5; // grados
    document.querySelectorAll('[data-tilt]').forEach((tile) => {
      tile.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const r = tile.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        tile.style.setProperty('--ry', `${((x - 0.5) * 2 * MAX).toFixed(2)}deg`);
        tile.style.setProperty('--rx', `${((0.5 - y) * 2 * MAX).toFixed(2)}deg`);
        tile.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
        tile.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
      });
      tile.addEventListener('pointerleave', () => {
        tile.style.removeProperty('--rx');
        tile.style.removeProperty('--ry');
      });
    });
  }

  /* Botones "imán": se desplazan unos píxeles hacia el cursor mientras está encima */
  if (canTilt.matches) {
    const PULL = 0.22;
    const LIMIT = 8; // px
    const clamp = (v) => Math.max(-LIMIT, Math.min(LIMIT, v));
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', `${clamp((e.clientX - (r.left + r.width / 2)) * PULL).toFixed(1)}px`);
        btn.style.setProperty('--my', `${clamp((e.clientY - (r.top + r.height / 2)) * PULL).toFixed(1)}px`);
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.removeProperty('--mx');
        btn.style.removeProperty('--my');
      });
    });
  }

  /* Avatar del botón de WhatsApp: mira hacia donde está el cursor (solo con puntero y sin reducir movimiento) */
  if (fab && canTilt.matches) {
    let raf = 0;
    let last = null;
    const look = () => {
      raf = 0;
      const r = fab.getBoundingClientRect();
      const vx = last.x - (r.left + r.width / 2);
      const vy = last.y - (r.top + r.height / 2);
      const dist = Math.hypot(vx, vy) || 1;
      const k = Math.min(dist / 220, 1); // cerca del botón mira con más fuerza
      const ux = (vx / dist) * k;
      const uy = (vy / dist) * k;
      fab.style.setProperty('--ex', `${(ux * 2.4).toFixed(2)}px`);
      fab.style.setProperty('--ey', `${(uy * 1.8).toFixed(2)}px`);
      fab.style.setProperty('--hx', `${(ux * 2.2).toFixed(2)}px`);
      fab.style.setProperty('--hy', `${(uy * 1.4).toFixed(2)}px`);
    };
    document.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || !fab.classList.contains('is-visible')) return;
      last = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(look);
    }, { passive: true });
  }

  /* La flecha del hero deja de moverse tras el primer scroll */
  if (hint) {
    const calm = () => { hint.dataset.calm = ''; window.removeEventListener('scroll', calm); };
    window.addEventListener('scroll', calm, { passive: true });
  }
})();
