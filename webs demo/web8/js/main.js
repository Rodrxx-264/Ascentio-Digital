/* =============================================
   AURA Beauty Atelier — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => preloader.classList.add('hidden'), 800);
      setTimeout(() => preloader.remove(), 1400);
    }
  });

  /* ---------- Custom Cursor ---------- */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring && window.innerWidth > 768) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
    (function animate() {
      cx += (mx - cx) * 0.12; cy += (my - cy) * 0.12;
      ring.style.left = cx + 'px'; ring.style.top = cy + 'px';
      requestAnimationFrame(animate);
    })();
    document.querySelectorAll('a, button, .gallery-item').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width = '56px'; ring.style.height = '56px'; });
      el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; });
    });
  }

  /* ---------- Navbar Scroll ---------- */
  const navbar = document.querySelector('.navbar-aura');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    });
  }

  /* ---------- AOS ---------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }

  /* ---------- GSAP Hero Animation ---------- */
  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-tagline', { y: 40, opacity: 0, duration: 1, delay: .6 })
      .from('.hero-title', { y: 60, opacity: 0, duration: 1.1 }, '-=.6')
      .from('.hero-sub', { y: 30, opacity: 0, duration: .9 }, '-=.5')
      .from('.hero-btns .btn-aura', { y: 20, opacity: 0, stagger: .15, duration: .7 }, '-=.4')
      .from('.hero-scroll-indicator', { opacity: 0, duration: .8 }, '-=.3');

    /* Parallax hero */
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to('.hero-bg', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      /* Section reveals */
      gsap.utils.toArray('.section-heading').forEach(heading => {
        gsap.from(heading, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
          }
        });
      });
    }
  }

  /* ---------- Swiper — Testimonials ---------- */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-swiper', {
      loop: true,
      speed: 800,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      effect: 'fade',
      fadeEffect: { crossFade: true },
    });
  }

  /* ---------- Gallery Filters ---------- */
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeInUp .5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- Before / After Slider ---------- */
  document.querySelectorAll('.ba-slider-container').forEach(container => {
    const before = container.querySelector('.ba-before');
    const divider = container.querySelector('.ba-divider');
    const handle = container.querySelector('.ba-handle');
    let isDragging = false;

    function updateSlider(x) {
      const rect = container.getBoundingClientRect();
      let pos = ((x - rect.left) / rect.width) * 100;
      pos = Math.max(5, Math.min(95, pos));
      before.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
      divider.style.left = pos + '%';
      handle.style.left = pos + '%';
    }

    container.addEventListener('mousedown', () => isDragging = true);
    container.addEventListener('touchstart', () => isDragging = true, { passive: true });
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('touchend', () => isDragging = false);
    container.addEventListener('mousemove', e => { if (isDragging) updateSlider(e.clientX); });
    container.addEventListener('touchmove', e => { if (isDragging) updateSlider(e.touches[0].clientX); }, { passive: true });
    container.addEventListener('click', e => updateSlider(e.clientX));
  });

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        /* Close mobile nav */
        const navCollapse = document.querySelector('.navbar-collapse');
        if (navCollapse && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  /* ---------- Form Submit (prevent default) ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      btn.textContent = '¡Enviado!';
      btn.style.background = 'var(--gold)';
      btn.style.borderColor = 'var(--gold)';
      btn.style.color = 'var(--black)';
      setTimeout(() => {
        btn.textContent = 'ENVIAR CONSULTA';
        btn.style = '';
        form.reset();
      }, 2500);
    });
  }

  /* ---------- Reveal animation keyframe (for filter) ---------- */
  if (!document.getElementById('aura-keyframes')) {
    const style = document.createElement('style');
    style.id = 'aura-keyframes';
    style.textContent = `@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`;
    document.head.appendChild(style);
  }

});
