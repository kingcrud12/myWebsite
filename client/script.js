// Theme Management
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
};

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

initTheme();

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Reveal Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Interactive 3D Tech Particle Constellation (Hero Animation)
const initHeroAnimation = () => {
    const canvas = document.getElementById('hero-animation-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 65;
    let mouse = { x: null, y: null, radius: 100 };

    const resizeCanvas = () => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resizeCanvas);

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            // Setup coordinates in a spherical coordinate system
            const angle = Math.random() * Math.PI * 2;
            const u = Math.random() * 2 - 1;
            const maxRadius = Math.min(width, height) * 0.38;
            const r = (Math.random() * 0.3 + 0.6) * maxRadius;

            this.x3d = r * Math.sqrt(1 - u * u) * Math.cos(angle);
            this.y3d = r * Math.sqrt(1 - u * u) * Math.sin(angle);
            this.z3d = r * u;

            this.baseRadius = Math.random() * 1.5 + 1.2;
            this.radius = this.baseRadius;
            
            // Random internal rotation speeds
            this.rotSpeedX = (Math.random() - 0.5) * 0.002;
            this.rotSpeedY = (Math.random() - 0.5) * 0.003;
        }

        update() {
            // Spin slowly around Y axis
            let cosY = Math.cos(0.003);
            let sinY = Math.sin(0.003);
            let xNew = this.x3d * cosY - this.z3d * sinY;
            let zNew = this.x3d * sinY + this.z3d * cosY;
            this.x3d = xNew;
            this.z3d = zNew;

            // Spin slowly around X axis
            let cosX = Math.cos(0.001);
            let sinX = Math.sin(0.001);
            let yNew = this.y3d * cosX - this.z3d * sinX;
            this.z3d = this.y3d * sinX + this.z3d * cosX;
            this.y3d = yNew;

            // Perspective math
            const fov = 350;
            const scale = fov / (fov + this.z3d);
            this.x = width / 2 + this.x3d * scale;
            this.y = height / 2 + this.y3d * scale;

            // Mouse track repulsion physics
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x += (dx / dist) * force * 12;
                    this.y += (dy / dist) * force * 12;
                }
            }

            this.radius = this.baseRadius * scale;
            // High contrast elegant opacity
            this.opacity = Math.max(0.12, Math.min(0.75, (scale - 0.5) * 1.3));
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(10, 10, 10, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Spawn particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // Connections line drawing
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 78) {
                    const avgOpacity = (particles[i].opacity + particles[j].opacity) / 2;
                    const lineOpacity = ((78 - distance) / 78) * 0.18 * avgOpacity;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(15, 15, 15, ${lineOpacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    };

    animate();
};

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('section, .group');
    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    initHeroAnimation();

    // Contact Booking Form Submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('[data-i18n]');
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.75';
            
            const isFr = window.I18n && window.I18n.lang === 'fr';
            submitText.textContent = isFr ? 'Envoi en cours...' : 'Sending...';

            const actionUrl = bookingForm.getAttribute('action') || 'https://formspree.io/f/xoqgypzo';
            
            const showToast = (message, isSuccess) => {
                const toast = document.createElement('div');
                toast.className = 'fixed bottom-8 right-8 bg-neutral-950 text-white text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-xl shadow-2xl z-50 transition-all duration-500 transform translate-y-8 opacity-0 flex items-center gap-3 border border-neutral-800';
                const icon = isSuccess ? 'check_circle' : 'error';
                const iconColor = isSuccess ? 'text-green-400' : 'text-red-400';
                toast.innerHTML = `
                    <span class="material-symbols-outlined ${iconColor} font-bold">${icon}</span>
                    <span>${message}</span>
                `;
                document.body.appendChild(toast);
                setTimeout(() => {
                    toast.classList.remove('translate-y-8', 'opacity-0');
                }, 100);
                setTimeout(() => {
                    toast.classList.add('translate-y-8', 'opacity-0');
                    setTimeout(() => toast.remove(), 500);
                }, 4000);
            };

            fetch(actionUrl, {
                method: 'POST',
                body: new FormData(bookingForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showToast(isFr 
                        ? 'Demande reçue ! Je vous recontacte très rapidement.' 
                        : 'Request received! I will get back to you very shortly.', true);
                    bookingForm.reset();
                } else {
                    showToast(isFr 
                        ? 'Une erreur est survenue. Veuillez réessayer.' 
                        : 'An error occurred. Please try again.', false);
                }
            })
            .catch(error => {
                showToast(isFr 
                    ? 'Une erreur est survenue. Veuillez réessayer.' 
                    : 'An error occurred. Please try again.', false);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                if (window.I18n) {
                    window.I18n.updateUI();
                }
            });
        });
    }
});
