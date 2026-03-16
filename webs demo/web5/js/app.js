/*
  js/app.js — Interacciones: contador, animaciones, formulario y WhatsApp.
*/

document.addEventListener('DOMContentLoaded', function(){
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Simple sold tacos counter animation
  const soldCountEl = document.getElementById('soldCount');
  let soldTarget = 12480; // ejemplo, ajustar según datos reales
  let current = 0;
  const duration = 2200;
  const stepTime = Math.abs(Math.floor(duration / soldTarget));

  function animateCounter(){
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * soldTarget);
      soldCountEl.textContent = value.toLocaleString();
      if(progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }
  animateCounter();

  // IntersectionObserver para animaciones on-scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.fade-up, .card, .gallery-grid img, .promo').forEach(el=>io.observe(el));

  // Nav toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle && navToggle.addEventListener('click', ()=>{
    navLinks.classList.toggle('open');
  });

  // Order buttons that prefill form
  document.querySelectorAll('.btn-order').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const order = e.currentTarget.dataset.order || '';
      const details = document.getElementById('details');
      details.value = order;
      details.focus();
      document.getElementById('pedido').scrollIntoView({behavior:'smooth'});
    });
  });

  // Form handling (simulado) — validar y mostrar mensaje
  const form = document.getElementById('orderForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const details = form.details.value.trim();
    if(!name || !phone || !details){
      formMsg.textContent = 'Por favor completa todos los campos.';
      formMsg.style.color = '#d62828';
      return;
    }
    // Aquí iría la llamada real a backend o servicio. Simulamos envío.
    formMsg.textContent = 'Pedido enviado. Pronto te confirmamos por teléfono.';
    formMsg.style.color = 'var(--cilantro)';
    form.reset();
    setTimeout(()=>formMsg.textContent = '',5000);
  });

  // WhatsApp button — usa número de contacto del href en #whatsappFloat
  const waFloat = document.getElementById('whatsappFloat');
  const waBtn = document.getElementById('waBtn');
  function openWhatsApp(prefill){
    const base = waFloat.getAttribute('href');
    // base contiene el enlace con número; si necesita texto predefinido, lo añadiremos
    let url = base;
    if(prefill){
      // encodeURIComponent y reemplazar texto param
      const idx = url.indexOf('?');
      const prefix = idx>=0? url.substring(0, idx): url;
      const phonePart = prefix.replace('https://wa.me/','');
      const text = encodeURIComponent(prefill);
      url = `https://wa.me/${phonePart}?text=${text}`;
    }
    window.open(url, '_blank');
  }

  waBtn.addEventListener('click', ()=>{
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const details = form.details.value.trim();
    const text = `Hola Taco Fuego MX, mi nombre es ${name || '[Nombre]'} y quiero pedir: ${details || '[Pedido]'} - Tel: ${phone || '[Teléfono]'}`;
    openWhatsApp(text);
  });

  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth'});
    });
  });
});
