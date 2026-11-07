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

  /* Tema claro / oscuro, con efecto: el ícono gira y el nuevo tema se "revela" en círculo desde el botón
     (View Transitions API donde exista; en el resto, el giro del ícono y el cambio normal). */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const applyTheme = (next) => {
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* sin almacenamiento */ }
  };
  themeBtn?.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
  themeBtn?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    themeBtn.classList.remove('is-spinning');
    void themeBtn.offsetWidth; // reinicia la animación si se toca rápido
    themeBtn.classList.add('is-spinning');
    themeBtn.setAttribute('aria-pressed', String(next === 'dark'));

    if (!document.startViewTransition || reduceMotion.matches) {
      applyTheme(next);
      return;
    }
    const r = themeBtn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => applyTheme(next));
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
  });
  themeBtn?.addEventListener('animationend', () => themeBtn.classList.remove('is-spinning'));

  /* Avatar de WhatsApp: siempre visible. El globo "¿Hablamos? Escribime" aparece unos segundos al cargar
     y vuelve al pasar el mouse o enfocar el avatar (solo CSS). */
  const bubble = document.querySelector('[data-fab-bubble]');
  if (bubble) {
    setTimeout(() => bubble.classList.add('is-shown'), 1500);
    setTimeout(() => bubble.classList.remove('is-shown'), 7500);
  }

  /* Aparición suave al scrollear (solo con JS; con "reducir movimiento" se muestra todo de una) */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window && !reduceMotion.matches) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        ro.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach((el) => {
      const group = el.closest('[data-reveal-group]');
      if (group) el.style.setProperty('--d', `${[...group.querySelectorAll('[data-reveal]')].indexOf(el) * 90}ms`);
      ro.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* Métricas: los números cuentan hasta su valor al entrar en pantalla */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window && !reduceMotion.matches) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        const el = e.target;
        const end = Number(el.dataset.count);
        const t0 = performance.now();
        const dur = 1100;
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        el.textContent = '0';
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  }

  /* Skills: el brillo de cada baldosa sigue al cursor */
  if (window.matchMedia('(hover: hover)').matches && !reduceMotion.matches) {
    document.querySelectorAll('.skill, [data-glow]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--gx', `${e.clientX - r.left}px`);
        card.style.setProperty('--gy', `${e.clientY - r.top}px`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--gx');
        card.style.removeProperty('--gy');
      });
    });
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

  /* Principios de "Sobre mí": acordeón con un solo ítem abierto, accesible por teclado */
  document.querySelectorAll('[data-accordion]').forEach((acc) => {
    const buttons = [...acc.querySelectorAll('.acc__btn')];
    const toggle = (btn) => {
      const willOpen = btn.getAttribute('aria-expanded') !== 'true';
      buttons.forEach((b) => {
        const open = b === btn && willOpen;
        b.setAttribute('aria-expanded', String(open));
        document.getElementById(b.getAttribute('aria-controls')).hidden = !open;
      });
    };
    buttons.forEach((b) => b.addEventListener('click', () => toggle(b)));

    /* Reserva el alto del caso más alto (un ítem abierto) para que al expandir no se mueva nada de lo que está debajo */
    const reserve = () => {
      const state = buttons.map((b) => b.getAttribute('aria-expanded') === 'true');
      acc.style.minHeight = '0px';
      let tallest = 0;
      buttons.forEach((open) => {
        buttons.forEach((b) => { document.getElementById(b.getAttribute('aria-controls')).hidden = b !== open; });
        tallest = Math.max(tallest, acc.offsetHeight);
      });
      buttons.forEach((b, i) => { document.getElementById(b.getAttribute('aria-controls')).hidden = !state[i]; });
      acc.style.minHeight = `${tallest}px`;
    };
    reserve();
    window.addEventListener('resize', reserve);
    if (document.fonts?.ready) document.fonts.ready.then(reserve);
  });

  /* El botón "Escribime" del footer lleva al formulario y deja el cursor listo en el campo Nombre */
  document.querySelectorAll('[data-goto-form]').forEach((a) => {
    a.addEventListener('click', () => {
      const field = document.getElementById('f-nombre');
      if (field) setTimeout(() => field.focus({ preventScroll: true }), reduceMotion.matches ? 0 : 800);
    });
  });

  /* Formulario de contacto: validación accesible y envío sin recargar (Netlify Forms) */
  const form = document.querySelector('[data-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    const rules = {
      nombre: (v) => (v.trim().length >= 2 ? '' : 'Escribí tu nombre (mínimo 2 letras).'),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Escribí un email válido, por ejemplo nombre@correo.com.'),
      mensaje: (v) => (v.trim().length >= 10 ? '' : 'Contame un poco más (mínimo 10 caracteres).'),
    };
    const check = (field) => {
      const msg = rules[field.name](field.value);
      const out = document.getElementById(`e-${field.name}`);
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
      out.textContent = msg;
      out.hidden = !msg;
      return !msg;
    };
    const fields = [...form.querySelectorAll('input[name], textarea[name]')].filter((f) => rules[f.name]);
    fields.forEach((f) => f.addEventListener('blur', () => check(f)));
    fields.forEach((f) => f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') check(f); }));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const invalid = fields.filter((f) => !check(f));
      if (invalid.length) {
        status.textContent = 'Revisá los campos marcados.';
        invalid[0].focus();
        return;
      }
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      status.textContent = 'Enviando…';
      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString(),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        fields.forEach((f) => f.removeAttribute('aria-invalid'));
        status.textContent = '¡Gracias! Recibí tu mensaje y te respondo pronto.';
      } catch (err) {
        status.innerHTML = 'No pude enviar el mensaje. Escribime por <a href="https://wa.me/543442670050" target="_blank" rel="noopener">WhatsApp</a> o a <a href="mailto:matiasadriangonzalez23@gmail.com">matiasadriangonzalez23@gmail.com</a>.';
      } finally {
        btn.disabled = false;
      }
    });
  }

  /* La flecha del hero se anima suavemente hasta el primer scroll y después se queda quieta */
  if (hint) {
    const calm = () => { hint.dataset.calm = ''; window.removeEventListener('scroll', calm); };
    window.addEventListener('scroll', calm, { passive: true });
  }

  /* Sobre mí: la foto se mueve apenas hacia el cursor (parallax suave) */
  const figure = document.querySelector('.about__figure');
  if (figure && window.matchMedia('(hover: hover)').matches && !reduceMotion.matches) {
    figure.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = figure.getBoundingClientRect();
      figure.style.setProperty('--px', `${(((e.clientX - r.left) / r.width - 0.5) * -14).toFixed(1)}px`);
      figure.style.setProperty('--py', `${(((e.clientY - r.top) / r.height - 0.5) * -14).toFixed(1)}px`);
    });
    figure.addEventListener('pointerleave', () => {
      figure.style.removeProperty('--px');
      figure.style.removeProperty('--py');
    });
  }


  /* Pantalla de entrada: se retira cuando la página cargó (y, la primera vez, cuando el logo terminó de escribirse, ~1,1 s).
     Si se llegó por la cortina, sale enseguida. */
  if (root.classList.contains('pt-arriving')) {
    const SHOW = root.classList.contains('pt-wipe') ? 0 : 1100;
    const done = () => setTimeout(() => root.classList.add('pt-done'), Math.max(0, SHOW - performance.now()));
    if (document.readyState === 'complete') done();
    else {
      window.addEventListener('load', done, { once: true });
      setTimeout(done, 2000);
    }
  }

  /* Cambio de página (inicio ↔ caso de estudio): la cortina entra con el logo ya hecho y recién después se navega.
     Con movimiento reducido, teclas modificadoras o pestaña nueva, el enlace funciona normal. */
  (() => {
    let leaving = false;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* Volver con "atrás" desde el caché: no dejar la cortina puesta */
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        leaving = false;
        root.classList.remove('pt-leaving');
      }
    });

    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || leaving || calm.matches || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== '_self') return;
      if (a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.protocol !== location.protocol || url.host !== location.host) return;
      if (url.pathname === location.pathname) return;
      e.preventDefault();
      leaving = true;
      root.classList.remove('pt-arriving', 'pt-wipe', 'pt-done');
      root.classList.add('pt-leaving');
      setTimeout(() => {
        try { sessionStorage.setItem('pt-wipe', '1'); } catch (err) { /* sin storage, igual cambia */ }
        location.href = url.href;
      }, 400);
    });
  })();
})();
