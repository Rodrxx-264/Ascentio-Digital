## Plan: Landing TACO FUEGO MX

TL;DR - Crear una landing single-page responsive (mobile-first) en español para "TACO FUEGO MX" que priorice promociones del día, combos destacadas y pedidos rápidos (formulario + WhatsApp). Entrega: `index.html`, `css/styles.css`, `js/app.js`, assets placeholder, y README con instrucciones.

**Steps**
1. Preparación (paralela): elegir fuentes (Google Fonts: Bebas Neue, Poppins), CDN Font Awesome, y decidir origen de imágenes (placeholder/Unsplash o assets del cliente). *depends on decision: assets*
2. Estructura HTML: crear `index.html` con meta SEO, estructura semántica y secciones: hero, combos destacados, menú de tacos, acompañamientos, bebidas, galería, pedidos rápidos (form), promociones semanales, contador de tacos vendidos, ubicación, footer.
3. Estilos base (mobile-first): crear `css/styles.css` con variables de color (paleta dada), tipografías, sistema de grid/flex, y reglas responsive. Incluir animaciones CSS y efectos hover/glow.
4. Componentes UI: implementar tarjetas de combos grandes, tarjetas de menú, galería grid con hover, y botones primarios con animación glow.
5. Interactividad JS: `js/app.js` para ordenar rápido (validación de formulario), contador animado de tacos vendidos, scroll animations (IntersectionObserver), abrir menú/scroll smooth, y botón flotante WhatsApp.
6. Integraciones: agregar enlace de WhatsApp click-to-chat (número variable), Google Maps iframe embed (o instrucciones para API key si prefieres mapa interactivo).
7. Optimización: minificar CSS/JS (ofrecer comandos), lazy-load de imágenes (`loading="lazy"`), optimizar meta tags para SEO y performance (preconnect fonts, critical CSS inline mínimo).
8. Accesibilidad y pruebas: contraste de colores, labels en formulario, focus states, pruebas responsive en móviles y desktop.
9. Documentación: README con cómo desplegar, dónde cambiar número de WhatsApp, dirección, y cómo reemplazar imágenes.
10. Entrega: empaquetar archivos finales y ejemplos de imágenes (placeholder) y los textos listos.

**Verification**
1. Lighthouse (performance, accessibility, best practices) — objetivo: >90 en mobile para el contenido entregado.
2. Prueba de formulario: enviar con datos de prueba y verificar consola/log (simular envío por correo o mostrar confirmación).  
3. WhatsApp: comprobar que el botón click-to-chat abre la app/web con mensaje prellenado.  
4. Map: comprobación del iframe y enlace a Google Maps.  
5. Responsive: inspeccionar en anchos 360px, 768px, 1024px.
6. SEO básico: verificar meta title, description, Open Graph tags y uso de etiquetas semánticas.

**Decisions / Assumptions**
- Idioma de la UI: español.
- Moneda: Quetzales (Q) — todos los precios mostrados con prefijo `Q`.
- Fuentes: Bebas Neue (títulos) + Poppins (texto) vía Google Fonts.
- Iconos: Font Awesome CDN.
- Imágenes: usaré placeholders libres (Unsplash) si el cliente no proporciona imágenes.
- Google Maps: usar iframe público si no hay API key; indicar cómo cambiar a API interactiva.
- WhatsApp: se usará el esquema `https://wa.me/<countrycode><number>?text=...` — necesito número para enlazar.

**Further Considerations**
1. Assets: ¿Tienes logo, fotos o preferencia por imágenes reales vs placeholders? Recomendado: 6-8 fotos de alta calidad (hero, combos, preparación, ingredientes).
2. WhatsApp: ¿Cuál es el número de contacto (con código país) para el botón flotante y mensajes predefinidos?  
3. Mapa: ¿Deseas un iframe (fácil) o un mapa interactivo con API key (requiere clave)?
