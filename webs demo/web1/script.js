/**
 * Clínica Médica Prados VH - Main Script
 * Handles interactivity, animations, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-btn');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('active');
        // Prevent body scrolling when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- 3. Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // --- 4. 3D Tilt Effect on Service Cards ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    // Disable on touch devices for better performance
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    if (!isTouchDevice) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate rotation (max 10 degrees)
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Add soft glare effect
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                
                card.style.background = `
                    radial-gradient(
                        circle at ${glareX}% ${glareY}%, 
                        rgba(255, 255, 255, 0.8) 0%, 
                        var(--white) 50%
                    )
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.background = 'var(--white)';
                
                // Smooth return transition
                card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.5s ease';
                setTimeout(() => {
                    card.style.transition = 'var(--transition)';
                }, 500);
            });
        });
    }

    // --- 5. Form Submission Handling ---
    const appointmentForm = document.getElementById('appointmentForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Visual feedback for processing
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ph-bold ph-spinner ph-spin" style="animation: spin 1s linear infinite;"></i> Procesando...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;
            
            // Validate form (basic)
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            
            if (name && phone && service) {
                // Simulate API call and latency
                setTimeout(() => {
                    appointmentForm.reset();
                    submitBtn.innerHTML = originalBtnHtml;
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                    
                    formSuccess.classList.remove('hidden');
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.add('hidden');
                    }, 5000);
                    
                }, 1500);
            }
        });
    }
});

// Add spin animation via JS for the loading icon
const style = document.createElement('style');
style.innerHTML = `
    @keyframes spin {
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
