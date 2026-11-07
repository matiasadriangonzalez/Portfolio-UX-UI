# Portfolio web: sitio en código (HTML + CSS + JS vanilla)

**Objetivo:** pasar el diseño aprobado de Figma a un sitio estático (sin frameworks JS) que cumpla el TP: 9 secciones, WCAG 2.2 AA, Lighthouse móvil ≥ 90, deploy HTTPS con auto-deploy desde `main`.
**Fuente del diseño:** Figma https://www.figma.com/design/Tmljy6R7M0EqlpMWRcDYP3 (páginas 03 Design System y 04 Prototipo) y `README.md`.
**Alcance autorizado:** crear/editar archivos del sitio dentro de `portfolio/` (index.html, caso-hoypadel.html, 404.html, css/, js/, assets/img/). No se hacen commits ni push: los hace el autor.
**Rama:** `feat/sitio-base`. **Ruta de implementación:** directa en línea (sin subagentes: el entorno no autoriza delegar sin pedido del usuario).

## Tareas
- [x] **T1 Base:** tokens CSS (claro/oscuro), base, componentes (botón, píldora, marca, WhatsApp), navegación fija transparente→sólida, menú móvil, hero (desktop y móvil), flecha de scroll, tema claro/oscuro. _Verificado con capturas en 1440 y 375; sin errores de JS._
- [x] **T2 Skills y Proyectos:** 4 baldosas de skills y 4 de proyectos (marino/piedra) con abanico de capturas WebP (12 imágenes, 200 KB), inclinación y brillo hacia el cursor (solo `hover: hover` y sin `prefers-reduced-motion`), abanico que se abre también con foco de teclado. _Verificado con capturas en 1440 y 375, tema claro y oscuro, y hover; sin errores de JS ni overflow. El enlace de HoyPadel apunta a `caso-hoypadel.html` (T4, todavía no existe)._
- [x] **T3 Métricas, Experiencia, Sobre mí, Contacto y Footer:** timeline, acordeón accesible, formulario con botón de envío, footer pegado abajo con el nombre grande. _Hecho y verificado con capturas en 1440 y 375 (sin overflow ni errores de JS); validación del formulario probada. Datos nuevos del autor: Concepción del Uruguay, EET N.º 1, inglés básico a intermedio, 21 años. Pendiente: emisores y años de los certificados (llegan en 24 h), y publicar en Netlify para que el formulario envíe de verdad (Netlify Forms)._
- [x] **T4 Caso HoyPadel (`caso-hoypadel.html`) y `404.html`:** encabezado con ventanas y celular (hover que las separa), Problema/Proceso/Solución/Resultado, carrusel con scroll-snap. _Hecho: `caso-hoypadel.html` (medidas y textos del prototipo; ventanas que se separan en hover, carrusel de 8 capturas con botones y teclado), `404.html` (rutas absolutas para funcionar en cualquier URL), `css/caso.css`, `js/caso.js`, capturas en `assets/img/hoypadel/`. Verificado en 1440, 820 y 375: sin overflow ni errores; 404 probado vía servidor local._
- [ ] **T5 Animaciones:** scroll reveals suaves, rebote de la flecha, `prefers-reduced-motion`.
- [ ] **T6 SEO, accesibilidad y rendimiento:** meta/OG con URL final, favicon, fuentes autoalojadas, WebP, `aria-*`, contraste, Lighthouse ≥ 90 ×4.
  - [x] Favicon (SVG + PNG + ICO + apple-touch), fuentes autoalojadas (Archivo Black e Inter, subconjunto latino, `font-display: swap`, con preload), `fetchpriority` en las imágenes principales, lista de capturas sin `role` que rompía la semántica. _Lighthouse mobile local (localhost, sin red real): inicio 98/100/100/100, caso 96/100/100/100, CLS 0. Baseline antes de los cambios: inicio 95/100/100/100, caso 93/96/100/100._
  - [ ] Pendiente: `og:image` y `canonical` con URL absoluta (hace falta el dominio final) + imagen 1200×630; pruebas de teclado y lector de pantalla; medir Lighthouse en producción.
- [ ] **T7 Deploy:** plataforma con auto-deploy desde `main`, HTTPS, captura de Lighthouse sobre la URL de producción.

- [x] **T2b Ajustes pedidos por el autor:** capturas de Coffea y Cubrí rehechas en 1440×900 sin el cartel de Netlify; botones "imán" (`.btn` se corre hasta 8 px hacia el cursor, solo con mouse y sin reducir movimiento); el botón de WhatsApp pasa a ser un avatar SVG con auriculares cuyas pupilas y cabeza siguen al cursor (parpadea, enlaza a `wa.me`). _Verificado: transform 8 px/0 al entrar/salir, pupilas a izquierda y derecha, sin errores de JS._

- [x] **T3b Rehecho contra el prototipo:** el autor señaló que T3 (y los textos de T2) no coincidían con Figma. Se compararon, sección por sección y en desktop y mobile, los frames reales (`78:769…78:1049` y `80:398…80:674`) contra capturas del sitio y se rehicieron Skills, Proyectos, Métricas, Experiencia, Sobre mí, Contacto y Footer con las medidas, textos y colores del prototipo. Lo que Figma dejaba como "(a completar)" se llenó con datos reales. Desvíos conscientes: Archivo ExtraBold → Archivo Black (máx. 2 familias tipográficas), "Formulario (bonus)" → "Enviame un mensaje", ítem extra "Idiomas", textos de los principios 02 y 03 escritos por mí (el prototipo solo definía el 01). **Pendiente de verificar antes de entregar: "90+ Lighthouse" y "5 proyectos UX/UI" son cifras del prototipo, aún sin medir/confirmar.** _Los clones temporales usados para capturar el prototipo se borraron (14, por ID)._

- [x] **T3c Mejoras pedidas por el autor:** avatar de WhatsApp siempre visible (globo temporal como antes); botón de tema con giro, anillo y revelado circular (View Transitions, con respaldo y sin movimiento si se reduce); Skills con más herramientas reales del CV, brillo que sigue al cursor y aparición escalonada; Métricas con números que cuentan; Experiencia y formación en dos columnas con línea de tiempo y tarjetas. _Verificado: avatar visible arriba, en Contacto y en el footer; tema alterna y guarda; sin errores de JS._

- [x] **T3d Segunda ronda de mejoras:** flecha del hero con salto periódico hasta el primer scroll; Métricas como sección con título, aire y una línea de contexto por cifra; Sobre mí con datos rápidos, botones CV/Escribime, stickers que flotan y foto con parallax; Contacto con disponibilidad, "en qué ayudo" y brillo que sigue al cursor; Footer con bloque "Quién soy" en el medio. _Verificado en 1440 y 375 (sin overflow ni errores de JS); salto de la flecha y contadores probados._ Textos de "en qué ayudo" y "Quién soy" escritos por Claude: revisar.

- [x] **T3e Tercera ronda:** footer con "Quién soy", Navegación y Redes a la misma distancia (69 px medidos); flecha del hero rediseñada (arco que gira, flecha que cae y texto con destello, más el salto); Contacto sin "Escribime por email" (queda CV y canales en pastillas) y formulario de la misma altura que el texto; acordeón de Sobre mí reserva su alto máximo y no mueve lo de abajo (posición de "Ahora" y Contacto idéntica al abrir/cerrar, en desktop y mobile); foto nueva (mate frente al río) probada en el hero: `hero-desktop-mate.webp` y `hero-mobile-mate.webp` (las anteriores siguen en `assets/img/`). El PNG original pasó a `assets/fotos/originales/hero-mate-mar.png`.

- [x] **T3f:** flecha del hero con una sola animación suave; botón "Escribime" del footer lleva al formulario de Contacto y deja el foco en Nombre; canales de contacto (y GH/in del hero) con logos reales en círculos en vez de nombres. _Verificado: foco en el formulario, sin pestaña nueva, sin errores de JS._

- [x] **T3g Responsive:** hero en celular con la foto del mate más baja y el texto debajo (ya no pisa el mate); hero en tablet 768–1099 con retrato al 48 % y texto sin superposición; Skills en 2 columnas iguales hasta 1099 y Métricas en 2 columnas hasta 1099; footer apilado en 640–1199. Revisado en 360, 375, 414, 768, 1024, 1280 y 1440 (sin overflow horizontal).

## Decisiones técnicas
- CSS puro con variables (espejo de los tokens de Figma), sin Tailwind: menos dependencias y mejor puntaje.
- Texto "muted" `#4F5A70` (5,9:1 sobre crema) en vez de azul polvo `#626E84` (4,3:1) para cumplir AA en texto chico.
- Las secciones ancla usan `scroll-margin-top` = alto de la barra + 32 px para que el título no quede tapado.
- Hero móvil: `.hero__content { display: contents }` para ordenar la flecha entre la presentación y el pitch.

## Verificación
- T1: capturas headless (Chrome) en 1440×900, 1440 con scroll, 375×812 y 375 con scroll; sin errores en consola.
- Pendiente: Lighthouse móvil, axe/contraste, prueba con teclado y lector de pantalla.

## Próximo paso
Definir plataforma y dominio (Netlify recomendado) → completar OG/canonical → T7 deploy y Lighthouse en producción. Pendiente de T6: pruebas de teclado y lector de pantalla.

_Espejo en Engram (`odd/portfolio-sitio/tasks`): pendiente; el guardado falló por el registro de sesión. El archivo local es la fuente._
