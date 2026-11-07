# Portfolio web: sitio en código (HTML + CSS + JS vanilla)

**Objetivo:** pasar el diseño aprobado de Figma a un sitio estático (sin frameworks JS) que cumpla el TP: 9 secciones, WCAG 2.2 AA, Lighthouse móvil ≥ 90, deploy HTTPS con auto-deploy desde `main`.
**Fuente del diseño:** Figma https://www.figma.com/design/Tmljy6R7M0EqlpMWRcDYP3 (páginas 03 Design System y 04 Prototipo) y `README.md`.
**Alcance autorizado:** crear/editar archivos del sitio dentro de `portfolio/` (index.html, caso-hoypadel.html, 404.html, css/, js/, assets/img/). No se hacen commits ni push: los hace el autor.
**Rama:** `feat/sitio-base`. **Ruta de implementación:** directa en línea (sin subagentes: el entorno no autoriza delegar sin pedido del usuario).

## Tareas
- [x] **T1 Base:** tokens CSS (claro/oscuro), base, componentes (botón, píldora, marca, WhatsApp), navegación fija transparente→sólida, menú móvil, hero (desktop y móvil), flecha de scroll, tema claro/oscuro. _Verificado con capturas en 1440 y 375; sin errores de JS._
- [ ] **T2 Skills y Proyectos:** tiles tipo bento con el abanico de capturas, efecto de inclinación hacia el cursor (solo `hover: hover`), imágenes WebP.
- [ ] **T3 Métricas, Experiencia, Sobre mí, Contacto y Footer:** timeline, acordeón accesible, formulario con botón de envío, footer pegado abajo con el nombre grande.
- [ ] **T4 Caso HoyPadel (`caso-hoypadel.html`) y `404.html`:** encabezado con ventanas y celular (hover que las separa), Problema/Proceso/Solución/Resultado, carrusel con scroll-snap.
- [ ] **T5 Animaciones:** scroll reveals suaves, rebote de la flecha, `prefers-reduced-motion`.
- [ ] **T6 SEO, accesibilidad y rendimiento:** meta/OG con URL final, favicon, fuentes autoalojadas, WebP, `aria-*`, contraste, Lighthouse ≥ 90 ×4.
- [ ] **T7 Deploy:** plataforma con auto-deploy desde `main`, HTTPS, captura de Lighthouse sobre la URL de producción.

## Decisiones técnicas
- CSS puro con variables (espejo de los tokens de Figma), sin Tailwind: menos dependencias y mejor puntaje.
- Texto "muted" `#4F5A70` (5,9:1 sobre crema) en vez de azul polvo `#626E84` (4,3:1) para cumplir AA en texto chico.
- Las secciones ancla usan `scroll-margin-top` = alto de la barra + 32 px para que el título no quede tapado.
- Hero móvil: `.hero__content { display: contents }` para ordenar la flecha entre la presentación y el pitch.

## Verificación
- T1: capturas headless (Chrome) en 1440×900, 1440 con scroll, 375×812 y 375 con scroll; sin errores en consola.
- Pendiente: Lighthouse móvil, axe/contraste, prueba con teclado y lector de pantalla.

## Próximo paso
T2: sección Skills (bento) y Proyectos con los tiles y las capturas reales ya preparadas.

_Espejo en Engram (`odd/portfolio-sitio/tasks`): pendiente; el guardado falló por el registro de sesión. El archivo local es la fuente._
