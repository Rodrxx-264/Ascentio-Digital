TACO FUEGO MX — Sitio estático

Archivos principales:
- index.html
- css/styles.css
- js/app.js

Instrucciones rápidas:
1. Abrir `index.html` en un navegador (sitio estático).
2. Cambia el número de WhatsApp en `index.html` (elemento `#whatsappFloat` href) y en el iframe de `wa.me` si aplica.
3. Reemplaza las imágenes por tus propias fotos en la carpeta `images/` (no incluida). Las imágenes actuales usan Unsplash como placeholders.

Personalización importante:
- WhatsApp: reemplaza `https://wa.me/50212345678?text=...` con tu número real (usar +502 sin signos). Ej: `https://wa.me/50271234567`.
- Dirección y teléfono: actualiza la sección "Ubicación" en `index.html`.

Optimización / deploy:
- Comprime imágenes y usa WebP si es posible.
- Minifica `css/styles.css` y `js/app.js` para producción.
- Para un deploy rápido puedes subir a Netlify, Vercel o GitHub Pages.

Notas técnicas:
- Mobile-first. Fuentes: Google Fonts (Bebas Neue para títulos, Poppins para texto).
- Iconos: Font Awesome CDN.
- Animaciones: IntersectionObserver para animaciones al hacer scroll.

Siguientes pasos sugeridos:
- Conectar un backend o servicio de formularios para recibir pedidos.
- Añadir seguimiento de conversiones y análisis (Google Analytics, pixel).
- Revisión de accesibilidad y contraste en contexto real de imágenes.
