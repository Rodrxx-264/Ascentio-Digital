/*
 * ASCENTIO DIGITAL - MAIN JAVASCRIPT (Enhanced v2)
 * ------------------------------------------------------------------
 * 1. Header scroll behavior
 * 2. Mobile navigation
 * 3. Scroll management (progress, back-to-top, spy)
 * 4. Smooth scroll
 * 5. Scroll reveal animations
 * 6. Animated counters
 * 7. Typing effect
 * 8. FAQ accordion
 * 9. Exit intent modal
 * 10. Cursor glow effect (desktop)
 * 11. Toast notification
 * 12. Contact form feedback
 * 13. Particle canvas (hero)
 * ------------------------------------------------------------------
 */

// ==================================================================
// 1. HEADER SCROLL BEHAVIOR
// ==================================================================
const header = document.querySelector('header');

const updateHeader = () => {
    if (!header) return;
    if (window.pageYOffset > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();


// ==================================================================
// 2. MOBILE NAVIGATION
// ==================================================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
            document.body.style.overflow = '';
        });
    });

    // Close on backdrop click
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
            document.body.style.overflow = '';
        }
    });
}


// ==================================================================
// 3. SCROLL MANAGEMENT
// ==================================================================
const scrollProgress = document.querySelector('.scroll-progress');
const backToTopBtn = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');

let scrollTicking = false;
let lastSpyTime = 0;

function updateScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const now = Date.now();

    // Scroll Spy
    if (now - lastSpyTime > 100) {
        lastSpyTime = now;
        let currentSection = '';
        sections.forEach(section => {
            if (scrollTop >= section.offsetTop - 160) {
                currentSection = section.getAttribute('id');
            }
        });
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Progress bar
    if (scrollProgress && totalHeight > 0) {
        scrollProgress.style.width = `${(scrollTop / totalHeight) * 100}%`;
    }

    // Back to top
    if (backToTopBtn) {
        backToTopBtn.classList.toggle('visible', scrollTop > 500);
    }

    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(updateScroll);
        scrollTicking = true;
    }
}, { passive: true });

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// ==================================================================
// 4. SMOOTH SCROLL
// ==================================================================
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger && hamburger.classList.remove('toggle');
                document.body.style.overflow = '';
            }
        }
    }
});


// ==================================================================
// 5. SCROLL REVEAL
// ==================================================================
const revealAll = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealAll.forEach(el => revealObserver.observe(el));


// ==================================================================
// 6. ANIMATED COUNTERS
// ==================================================================
const counters = document.querySelectorAll('[data-target]');

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1200;
        const isFloat = !Number.isInteger(target);
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = target * eased;
            counter.textContent = (isFloat ? current.toFixed(1) : Math.ceil(current)) + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else counter.textContent = target + suffix;
        };
        requestAnimationFrame(step);
        observer.unobserve(counter);
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));


// ==================================================================
// 7. TYPING EFFECT
// ==================================================================
const heroTitle = document.getElementById('hero-title');

if (heroTitle) {
    const lang = document.documentElement.lang;
    const phrases = lang === 'es'
        ? ['Landing Pages de Alto Impacto', 'Sitios Web que Convierten', 'Diseño que Impulsa tu Negocio']
        : ['High-Impact Landing Pages', 'Websites that Actually Convert', 'Design that Drives Business'];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    heroTitle.innerHTML = '<span class="typing-text"></span><span class="typing-cursor"></span>';
    const textSpan = heroTitle.querySelector('.typing-text');

    function typeEffect() {
        const phrase = phrases[phraseIndex];
        textSpan.textContent = phrase.substring(0, charIndex);

        if (!isDeleting) {
            charIndex++;
            if (charIndex > phrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1800);
                return;
            }
            setTimeout(typeEffect, 55);
        } else {
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, 400);
                return;
            }
            setTimeout(typeEffect, 35);
        }
    }
    setTimeout(typeEffect, 600);
}


// ==================================================================
// 8. FAQ ACCORDION
// ==================================================================
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item').forEach(other => {
            other.classList.remove('active');
            const ans = other.querySelector('.faq-answer');
            if (ans) ans.style.maxHeight = null;
        });

        // Open clicked if it was closed
        if (!isActive) {
            item.classList.add('active');
            const answer = item.querySelector('.faq-answer');
            if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});


// ==================================================================
// 9. EXIT INTENT MODAL
// ==================================================================
const modal = document.getElementById('exitModal');
const closeModal = document.querySelector('.modal-close');
const modalBtn = document.querySelector('.modal-btn');
let modalShown = false;

if (modal && !sessionStorage.getItem('exitModalClosed')) {
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !modalShown) {
            modal.classList.add('active');
            modalShown = true;
        }
    });

    const hideModal = () => {
        modal.classList.remove('active');
        sessionStorage.setItem('exitModalClosed', 'true');
    };

    if (closeModal) closeModal.addEventListener('click', hideModal);
    if (modalBtn) modalBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideModal();
    });
}


// ==================================================================
// 10. CURSOR GLOW (Desktop only)
// ==================================================================
if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursor);
    };
    animateCursor();
}


// ==================================================================
// 11. TOAST NOTIFICATION
// ==================================================================
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}


// ==================================================================
// 12. CONTACT FORM FEEDBACK
// ==================================================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        // Visual validation to ensure all required fields are filled
        let isValid = true;
        contactForm.querySelectorAll('input[required], textarea[required]').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--text-danger, #ef4444)';
                // Reset border after 3s
                setTimeout(() => input.style.borderColor = '', 3000);
            }
        });

        if (!isValid) {
            e.preventDefault();
            showToast('Por favor, completa los campos requeridos.');
            return;
        }

        const btn = contactForm.querySelector('button[type="submit"]');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = '⏳ Sending...';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = '✓ Sent!';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        }
    });
}


// ==================================================================
// 13. PARTICLE CANVAS (Hero section)
// ==================================================================
(function initParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute; inset: 0; width: 100%; height: 100%;
        pointer-events: none; z-index: 1; opacity: 0.45;
    `;
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');
    let w, h, particles;

    const resize = () => {
        w = canvas.width = hero.offsetWidth;
        h = canvas.height = hero.offsetHeight;
    };

    class Particle {
        constructor() { this.reset(true); }
        reset(initial) {
            this.x = Math.random() * w;
            this.y = initial ? Math.random() * h : h + 10;
            this.size = Math.random() * 1.5 + 0.3;
            this.speedY = Math.random() * 0.4 + 0.1;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            if (this.y < -10) this.reset(false);
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // Changed from blue/cyan to Gold/Beige variations
            ctx.fillStyle = `rgba(163, 145, 120, ${this.opacity})`;
            ctx.fill();
        }
    }

    const init = () => {
        resize();
        const count = Math.min(Math.floor((w * h) / 12000), 80);
        particles = Array.from({ length: count }, () => new Particle());
    };

    const animate = () => {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => { resize(); });
    init();
    animate();
})();


// ==================================================================
// 13.5 MAGNETIC BUTTONS (Premium Feel)
// ==================================================================
const defaultButtons = document.querySelectorAll('.btn:not(.floating-wa)');
defaultButtons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        if (window.innerWidth < 768) return; // Only desktop
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Intensity of the magnetic pull
        this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', function() {
        if (window.innerWidth < 768) return;
        this.style.transform = `translate(0px, 0px) scale(1)`;
    });
});
// ==================================================================
// 14. LANGUAGE SWITCH (for pages using data-i18n attributes)
// ==================================================================
function switchLanguage(lang) {
    // Redirect to language version
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || 'index.html';

    let newFile;
    if (lang === 'en') {
        newFile = fileName.replace('.html', '-en.html').replace('index-en-en', 'index-en');
        if (!fileName.includes('-en')) newFile = fileName.replace('.html', '-en.html');
        else newFile = fileName;
    } else {
        newFile = fileName.replace('-en.html', '.html');
    }

    if (newFile !== fileName) window.location.href = newFile;
}
