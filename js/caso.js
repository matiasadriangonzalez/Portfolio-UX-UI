/* Página del caso de estudio: carrusel de capturas con botones (el desplazamiento nativo y el teclado ya funcionan sin JS). */
(() => {
  const track = document.querySelector('[data-shots]');
  const prev = document.querySelector('[data-shots-prev]');
  const next = document.querySelector('[data-shots-next]');
  if (!track || !prev || !next) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const step = () => {
    const card = track.querySelector('.shot');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
  };
  const go = (dir) => track.scrollBy({ left: dir * step(), behavior: reduce.matches ? 'auto' : 'smooth' });
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

  /* Los botones se desactivan en los extremos */
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  };
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
