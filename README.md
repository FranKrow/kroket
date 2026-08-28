# Kroket K — Clínica Veterinaria y Pet Shop

Sitio web de página única (estático) para **Kroket K**, clínica veterinaria para perros y gatos con venta de alimento y accesorios en Celaya, Guanajuato, México.

- **Dirección:** Av. Paseo de los Flamingos 193, Fracc. Rinconada los Álamos, C.P. 38024, Celaya, Gto.
- **Stack:** HTML, CSS y JavaScript vanilla. Sin frameworks, sin backend, sin build tools.
- **Idioma:** Español (es-MX).

---

## 📁 Estructura de archivos

| Archivo | Descripción |
|---|---|
| `index.html` | Página única con todas las secciones, SEO y datos estructurados (JSON-LD). |
| `css/styles.css` | Sistema de diseño (tokens), estilos Claymorphism, responsive. |
| `js/main.js` | Lógica: menú móvil, filtros de tienda, envíos a WhatsApp y animaciones. |
| `favicon.svg` | Icono del sitio (huella de pata en colores de marca). |
| `logo.jpg` | Logotipo de Kroket K (se usa en header y footer). |

---

## 🎨 Sistema de diseño

**Estilo:** Claymorphism — tarjetas con bordes gruesos (3–4 px), esquinas redondeadas (16–24 px), doble sombra y efecto de "presión" al hacer clic.

### Colores de marca (tokens CSS en `css/styles.css:root`)

| Token | Hex | Uso |
|---|---|---|
| `--brand-blue` | `#3894c7` | Primario |
| `--brand-raspberry` | `#c93771` | CTAs y destacados |
| `--brand-sky` | `#92c0d5` | Tintes y superficies acento |
| `--brand-pink` | `#e592b3` | Acento secundario |
| `--white` | `#ffffff` | Superficies |
| `--bg` | `#f6fafd` | Fondo de página |
| `--text` | `#1f3344` | Texto principal |
| `--muted` | `#e8f2f8` | Paneles atenuados |

> Regla de contraste: texto blanco solo sobre `--brand-raspberry` y superficies oscuras; texto oscuro sobre azul, celeste, rosa y blanco.

### Tipografía
- **Fredoka** (500, 600, 700) — encabezados.
- **Nunito** (400, 600, 700, 800) — cuerpo.
- Cargadas desde Google Fonts con `preconnect` y `display=swap`.

### Iconos e imágenes
- Iconos UI: SVG inline con estilo de trazo consistente (sin emojis como iconos).
- Fotos de perros y gatos: Unsplash (URLs estables, licencia gratuita).
- Fotos de productos: catálogos reales de retailers mexicanos y marcas (ver sección Tienda).
- Las imágenes remotas usan `referrerpolicy="no-referrer"` y `loading="lazy"` para evitar bloqueos por hotlinking y reducir carga.

---

## 🧩 Secciones

1. **Header fijo** — logo, navegación ancla y menú hamburguesa en móvil.
2. **Hero** — titular, CTAs, fotos reales de perro y gato, badges de horario/ubicación/WhatsApp.
3. **Servicios** — 6 tarjetas: Consulta general, Vacunación, Cirugía, Estética y peluquería, Urgencias, Odontología. Cada una enlaza a WhatsApp.
4. **Con cariño** — galería de fotos reales (consulta veterinaria, croquetas, mascotas con su familia).
5. **Tienda** — 12 productos reales con foto, descripción y precio en MXN; filtros por categoría (Perros / Gatos / Accesorios / Juguetes) y botón "Pedir por WhatsApp" por producto.
6. **Contacto** — datos de contacto, horarios y mapa de Google (embed sin API key).
7. **Footer** + **botón flotante de WhatsApp** con animación de pulso.

---

## ⚙️ Configuración obligatoria antes de publicar

Datos de contacto y pendientes por publicar:

| Qué | Dónde | Valor actual |
|---|---|---|
| Número de WhatsApp | `js/main.js:1` y 8 enlaces `wa.me/` en `index.html` | `524423058052` |
| Teléfono | `index.html` (contacto, footer y JSON-LD) | `(442) 305 8052` / `tel:+524423058052` |
| Correo ⚠️ | `index.html` (contacto, footer y JSON-LD) | `hola@kroketk.mx` |
| Dominio ⚠️ | `index.html` (canonical, Open Graph, JSON-LD) | `www.kroketk.mx` |

**Formato del número de WhatsApp:** solo dígitos con código de país (México = `52` + número de 10 dígitos), sin `+`, espacios ni guiones. Ej.: `524611234567`.

> Pista: el número de WhatsApp y el teléfono ya están configurados con los datos reales. Solo quedan por reemplazar `hola@kroketk.mx` y `kroketk.mx` en `index.html` (contacto, footer, canonical, Open Graph y JSON-LD).

---

## 🛒 Cómo agregar o editar productos

Cada producto es un `<article class="product-card">` dentro de `#products-grid` en `index.html`. Atributos:

- `data-category` — categoría para los filtros: `perros`, `gatos`, `accesorios` o `juguetes`.
- `data-name` — nombre del producto (se usa en el mensaje de WhatsApp).
- `data-product-name` (botón) — nombre que se envía por WhatsApp.

Estructura mínima:

```html
<article class="product-card" data-category="gatos" data-name="Nombre del producto">
  <div class="product-art">
    <img src="https://…/imagen.jpg" alt="Descripción" loading="lazy" width="600" height="600" referrerpolicy="no-referrer">
  </div>
  <div class="product-body">
    <span class="product-tag">Gatos</span>
    <h3 class="product-name">Nombre del producto</h3>
    <p class="product-desc">Descripción breve.</p>
    <p class="product-price">$999 <span class="product-size">· 3 kg</span></p>
    <button class="btn btn--raspberry product-wa" type="button" data-product-name="Nombre del producto">Pedir por WhatsApp</button>
  </div>
</article>
```

Los filtros se definen en `.filter-row` (botones con `data-filter`); añadir uno nuevo requiere un botón extra y que existan productos con ese `data-category`.

---

## ✉️ Cómo funciona el envío a WhatsApp

- Todo el envío se hace con enlaces `https://wa.me/<número>?text=<mensaje_urlencoded>`.
- La constante `WHATSAPP_NUMBER` en `js/main.js:1` centraliza el número para los botones de producto y los CTAs del sitio.

---

## 🔍 SEO y datos estructurados

- `lang="es"`, `<title>`, meta description, canonical y Open Graph (`og:locale=es_MX`).
- JSON-LD en `<script type="application/ld+json">` con dos entidades:
  - `VeterinaryCare` (clínica veterinaria).
  - `Store` (pet shop).
- Incluye dirección, teléfono, horarios y precios; ambas apuntan al mismo negocio.
- Verificar después de publicar en la [Rich Results Test](https://search.google.com/test/rich-results) de Google.

---

## ♿ Accesibilidad

- Skip link ("Saltar al contenido") visible al enfocar.
- Landmarks semánticos (`header`, `nav`, `main`, `footer`).
- Anillos de foco visibles (`:focus-visible`).
- Menú móvil accesible (`aria-expanded`, `aria-controls`, cierre con `Esc`).
- Filtros de tienda con `aria-pressed`.
- `alt` descriptivo en todas las imágenes; iconos decorativos con `aria-hidden`.
- `@media (prefers-reduced-motion: reduce)` desactiva animaciones.
- Objetivos táctiles ≥ 44 px.

---

## 🚀 Cómo ejecutar localmente

No requiere instalación. Desde la carpeta del proyecto:

```bash
python3 -m http.server 8421
```

Abrir <http://localhost:8421> en el navegador.

## ☁️ Publicación

Es un sitio 100% estático: se puede desplegar en cualquier hosting (Netlify, Vercel, GitHub Pages, Hostinger, cPanel, etc.) subiendo el contenido de esta carpeta. No hay pasos de build.

---

## 📝 Notas

- Los precios de los productos son **referenciales** (tiendas online MX, 2026) y deben confirmarse con el proveedor.
- Las fotos de productos provienen de catálogos de retailers (Amazon, Mister Mascotas, Animall, Petstop, KONG, Multipet). Si alguna imagen deja de cargar, revisar que la URL siga activa o reemplazarla.
- El mapa usa el embed de Google Maps sin API key; si cambia la dirección, actualizar `src` del `<iframe>` y el texto de contacto.
