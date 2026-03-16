/* =============================================
   ORIGEN 1820 COFFEE ATELIER — main.js
   El Café de la Casa · Ciudad de Guatemala
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ---- AOS Init ----
  AOS.init({
    duration: 900,
    once: true,
    easing: 'ease-out-cubic',
    offset: 60
  });

  // ---- GSAP Register ----
  gsap.registerPlugin(ScrollTrigger);

  // ---- Navbar Scroll ----
  const navbar = document.getElementById('mainNavbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // ---- Smooth Scroll for nav links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        // Close mobile nav if open
        const navCollapse = document.getElementById('navMenu');
        if (navCollapse && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- GSAP Hero Entrance ----
  const tl = gsap.timeline({ delay: 0.2 });
  tl.from('#heroContent .hero-badge', { opacity: 0, y: 30, duration: 0.8 })
    .from('#heroTitle', { opacity: 0, y: 40, duration: 1 }, '-=0.4')
    .from('#heroContent .hero-subtitle', { opacity: 0, y: 25, duration: 0.8 }, '-=0.5')
    .from('#heroContent .hero-ctas', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
    .from('#heroContent .hero-trust', { opacity: 0, y: 20, duration: 0.7 }, '-=0.3');

  // ---- GSAP Hero Text Parallax ----
  gsap.to('#heroContent', {
    y: 80,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // ---- GSAP Section Title Reveals ----
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ---- Menu Tabs ----
  const tabs = document.querySelectorAll('.menu-tab');
  const contents = document.querySelectorAll('.menu-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      this.classList.add('active');
      const targetId = 'tab-' + this.dataset.tab;
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
        // Animate items in
        gsap.from(targetContent.querySelectorAll('.menu-item'), {
          opacity: 0,
          y: 20,
          stagger: 0.07,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });
  });

  // ---- Especialidades Swiper ----
  new Swiper('.especialidades-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.especialidades-swiper .swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.especialidades-swiper .swiper-button-next',
      prevEl: '.especialidades-swiper .swiper-button-prev'
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

  // ---- Testimonios Swiper ----
  new Swiper('.testimonios-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.testimonios-swiper .swiper-pagination',
      clickable: true
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });

  // ---- GSAP Brand Bar Marquee Subtle ----
  const brandBar = document.querySelector('.brand-bar-inner');
  if (brandBar) {
    gsap.from(brandBar.children, {
      opacity: 0,
      y: 10,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.brand-bar',
        start: 'top 90%'
      }
    });
  }

  // ---- GSAP Finca Cards Stagger ----
  gsap.from('.finca-card', {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#finca',
      start: 'top 75%'
    }
  });

  // ---- Stats Counter ----
  function animateStat(el) {
    const original = el.innerText.trim();
    const suffix = original.replace(/[\d]/g, '');
    const target = parseInt(original.replace(/\D/g, ''), 10);
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    el.innerText = '0' + suffix;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.innerText = target + suffix;
        clearInterval(timer);
      } else {
        el.innerText = current + suffix;
      }
    }, 24);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(animateStat);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.historia-stats');
  if (statsSection) statsObserver.observe(statsSection);

  // ---- Sensorial Cards Hover Glow ----
  document.querySelectorAll('.sensorial-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(164,113,73,0.1), transparent 60%), rgba(255,255,255,0.02)`;
    });
    card.addEventListener('mouseleave', function () {
      card.style.background = '';
    });
  });

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.navbar-nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // ---- Galería items hover tilt ----
  document.querySelectorAll('.g-item').forEach(item => {
    item.addEventListener('mousemove', function (e) {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      item.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });
    item.addEventListener('mouseleave', function () {
      item.style.transform = '';
      item.style.transition = 'transform 0.5s ease';
    });
    item.addEventListener('mouseenter', function () {
      item.style.transition = 'transform 0.15s ease';
    });
  });

  // ---- GSAP Historia Image Parallax ----
  gsap.to('.historia-img', {
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '#historia',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });

  // ---- GSAP Sensorial Section Entrance ----
  gsap.from('.sensorial-card', {
    opacity: 0,
    scale: 0.9,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#sensorial',
      start: 'top 70%'
    }
  });

  // ---- IG Grid Stagger ----
  gsap.from('.ig-item', {
    opacity: 0,
    scale: 0.85,
    stagger: 0.06,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#instagram',
      start: 'top 75%'
    }
  });

  // ---- Visita Blocks Stagger ----
  gsap.from('.visita-block', {
    opacity: 0,
    x: -30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#visitanos',
      start: 'top 75%'
    }
  });

  // ---- Footer Entrance ----
  gsap.from('.footer-top .col-lg-4, .footer-top .col-lg-2, .footer-top .col-6', {
    opacity: 0,
    y: 30,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.footer-premium',
      start: 'top 85%'
    }
  });

  // ---- Floating WhatsApp Pulse ----
  const waBtn = document.getElementById('whatsapp-btn');
  if (waBtn) {
    setTimeout(() => {
      waBtn.style.opacity = '1';
    }, 2000);
  }

  // ---- Scroll Progress Indicator ----
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; width: 0%;
    background: linear-gradient(90deg, #a47149, #c89860);
    z-index: 10001; transition: width 0.1s ease; pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });

  console.log('%c☕ Origen 1820 Coffee Atelier — El Café de la Casa', 
    'color: #a47149; font-size: 16px; font-weight: bold;');
  console.log('%cCiudad de Guatemala · Zona 4', 'color: #f3e7d9; font-size: 12px;');

});
