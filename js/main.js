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
    const update = () => fab.classList.toggle('is-visible', pastHero && inQuiet === 0);
    if (hero) new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; update(); }, { rootMargin: '-40% 0px 0px 0px' }).observe(hero);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { inQuiet += e.isIntersecting ? 1 : -1; });
      inQuiet = Math.max(0, inQuiet);
      update();
    });
    quiet.forEach((el) => io.observe(el));
  }

  /* La flecha del hero deja de moverse tras el primer scroll */
  if (hint) {
    const calm = () => { hint.dataset.calm = ''; window.removeEventListener('scroll', calm); };
    window.addEventListener('scroll', calm, { passive: true });
  }
})();
