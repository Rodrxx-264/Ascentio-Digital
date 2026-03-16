/**
 * Taller Mecánico - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. STICKY HEADER
       ========================================================================= */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =========================================================================
       2. MOBILE MENU TOGGLE
       ========================================================================= */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const icon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Toggle icon between bars and times (X)
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* =========================================================================
       3. SCROLL SPY & SMOOTH SCROLLING
       ========================================================================= */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            // Offset for sticky header
            const sectionTop = section.offsetTop - 100;
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if current exists to avoid errors on pages without sections matching the links
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
        
        // Highlight "Inicio" when scrolled to the very top
        if(scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('.nav-link[href="#inicio"]').classList.add('active');
        }
    });

    /* =========================================================================
       4. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
       ========================================================================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* =========================================================================
       5. APPOINTMENT FORM HANDLING
       ========================================================================= */
    const appointmentForm = document.getElementById('appointmentForm');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get Button
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // UI Feedback
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
            btn.disabled = true;
            
            // Simulate API Call / sending
            setTimeout(() => {
                alert('¡Gracias por tu solicitud! Hemos recibido tus datos. Nos pondremos en contacto contigo a la brevedad para confirmar tu cita.');
                appointmentForm.reset();
                
                // Restore button
                btn.innerHTML = '<i class="fas fa-check"></i> Solicitud Enviada';
                btn.classList.replace('btn-primary', 'btn-whatsapp');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.replace('btn-whatsapp', 'btn-primary');
                }, 3000);
                
            }, 1500);
        });
    }
});
