# Portfolio personal · Matías Gonzalez

Trabajo final de **Diseño UX-UI 2026** · Licenciatura en Sistemas de Información · UADER FCyT.

> Estado: en construcción. Este README se completa a medida que avanza el proyecto.

## Enlaces

| Qué | Dónde |
|---|---|
| Sitio publicado | _Pendiente de deploy_ |
| Figma (research, wireframes, design system y prototipo) | https://www.figma.com/design/Tmljy6R7M0EqlpMWRcDYP3 |
| Reporte Lighthouse (mobile) | _Pendiente_ |

## Stack

- HTML5 semántico + CSS3 (variables CSS para el design system) + JavaScript vanilla.
- Sin frameworks JS ni constructores visuales, como pide la consigna.
- _A confirmar:_ CSS puro o Tailwind compilado con CLI.

## Proceso UX

1. **Usuario objetivo:** proto-persona (Carolina, reclutadora IT) y escenario de uso.
2. **Benchmark:** 3 portfolios de referencia más inspiración visual adicional.
3. **Moodboard y concepto:** palabras clave _autodidacta_, _práctico_ y _en evolución_, traducidas a color, tipografía e imágenes.
4. **Arquitectura de información:** sitemap y card sorting.
5. **Wireframes, design system y prototipo:** en Figma _(en curso)_.
6. **Validación:** test de usabilidad con al menos 3 personas _(pendiente)_.

_Las imágenes son grandes: hacé clic en cada una para verla a tamaño completo._

### Investigación

[![Investigación: usuario, benchmark y moodboard](docs/investigacion.png)](docs/investigacion.png)

### Arquitectura de información

Una sola página con anclas, más un caso de estudio interno y una página 404. Proyectos va antes que Skills porque el usuario objetivo necesita ver un proyecto real en menos de 30 segundos (la consigna permite cambiar el orden si se justifica).

| # | Sección | Ancla |
|---|---|---|
| 01 | Header / Navegación | global |
| 02 | Hero | `#inicio` |
| 03 | Métricas | `#metricas` |
| 04 | Proyectos | `#proyectos` |
| 05 | Skills | `#skills` |
| 06 | Experiencia / Formación | `#experiencia` |
| 07 | Sobre mí (con "Cómo trabajo") | `#sobre-mi` |
| 08 | Contacto | `#contacto` |
| 09 | Footer | global |

Páginas adicionales: `caso-hoypadel.html` (caso de estudio) y `404.html`.

[![Sitemap](docs/arquitectura-sitemap.png)](docs/arquitectura-sitemap.png)

[![Card sorting](docs/arquitectura-card-sorting.png)](docs/arquitectura-card-sorting.png)

## Design system (resumen)

- **Colores (4):** marino `#233245`, piedra `#DED6CA`, lino `#C9BEAE` y azul polvo `#626E84`, más tintes derivados.
- **Temas:** claro por defecto y oscuro, con contraste de texto mínimo de 4.5:1 en ambos.
- **Tipografía (2 familias):** Archivo para títulos e Inter para texto.
- **Estados:** error y éxito se comunican con ícono, texto y borde, nunca solo con color.

## Fuentes, recursos y créditos

- Tipografías: [Archivo](https://fonts.google.com/specimen/Archivo) e [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts).
- Referencias de inspiración, sin copiar su estilo: portfolio del docente (Ernesto Ledesma), Joaquín Gonzalez Calderón, Folioblox, Dos Orillas Estudio, y tableros de Behance de Raagav Sundar y Cuong Nguyen.
- Referencias de paleta: moodboard de materiales de Stylingentrends y Chroma by Donna.
- No se usa ningún template de código como base.

## Uso de inteligencia artificial

Se usó **Claude (Anthropic)** como asistente durante el proceso. Qué se generó y cómo se revisó:

- Borradores en Figma: tablero de investigación, sitemap, card sorting y variables del design system.
- Cálculo de contrastes de color (WCAG) y análisis de los portfolios de referencia.
- Las **decisiones de concepto** (palabras clave, paleta, tipografía, orden de secciones y contenido) las tomó el autor, que revisó y corrigió cada propuesta.
- _Se completa a medida que se genere código o texto con asistencia._

## Despliegue

_Pendiente: se documentará la plataforma elegida, la conexión con este repositorio y el deploy automático en cada push a `main`._
