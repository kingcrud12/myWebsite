// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Smooth scroll and active nav link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');

        // Only prevent default if it's an anchor link on the same page
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }

        // Close mobile menu
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections and project cards
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const projectCards = document.querySelectorAll('.project-card');

    sections.forEach(section => {
        observer.observe(section);
    });

    projectCards.forEach(card => {
        observer.observe(card);
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const btnSubmit = contactForm.querySelector('.btn-submit');
const btnText = btnSubmit.querySelector('.btn-text');
const btnLoader = btnSubmit.querySelector('.btn-loader');

// Protection contre les envois multiples
let isSubmitting = false;

// Regex Patterns for Security
const securityPatterns = {
    // Name: Letters, spaces, hyphens, apostrophes. 2-50 chars.
    name: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,

    // Email: Standard email validation
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,

    // Text: Reject HTML tags, script tags, and common injection patterns
    // We look for malicious patterns and return FALSE if found (to reject)
    unsafe: /<[^>]*>|javascript:|data:|vbscript:|on\w+=/i
};

function validateInput(data) {
    // 1. Validate Name
    if (!securityPatterns.name.test(data.name)) {
        return {
            valid: false,
            message: "Le nom contient des caractères non autorisés (lettres, espaces et tirets uniquement)."
        };
    }

    // 2. Validate Email
    if (!securityPatterns.email.test(data.email)) {
        return {
            valid: false,
            message: "L'adresse email n'est pas valide."
        };
    }

    // 3. Check for XSS/Injection in Subject and Message
    if (securityPatterns.unsafe.test(data.subject) || securityPatterns.unsafe.test(data.message)) {
        return {
            valid: false,
            message: "Votre message contient des caractères ou du code non autorisés."
        };
    }

    return { valid: true };
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Empêcher les envois multiples
    if (isSubmitting) {
        console.log('Form submission already in progress, ignoring duplicate submit');
        return;
    }

    isSubmitting = true;

    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Security Validation
    const validation = validateInput(formData);
    if (!validation.valid) {
        showError(validation.message);
        isSubmitting = false;
        return;
    }

    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    btnSubmit.disabled = true;

    // Hide previous messages
    formMessage.style.display = 'none';
    formMessage.className = 'form-message';

    try {
        // Préparer les données en JSON
        const jsonData = {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
        };

        // Utiliser l'endpoint Formspree
        const response = await fetch('https://formspree.io/f/manrbred', {
            method: 'POST',
            body: JSON.stringify(jsonData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });



        // Vérifier que la réponse est valide
        if (!response.ok) {
            let errorText = '';
            let errorJson = null;

            try {
                errorText = await response.text();
                // Essayer de parser comme JSON
                try {
                    errorJson = JSON.parse(errorText);
                } catch (e) {
                    // Ce n'est pas du JSON, garder le texte brut
                }
            } catch (e) {
                errorText = 'Impossible de lire la réponse du serveur';
            }

            console.error('Server error:', {
                status: response.status,
                statusText: response.statusText,
                errorText: errorText,
                errorJson: errorJson
            });

            const errorMessage = errorJson?.message || errorText || `Erreur serveur: ${response.status}`;
            throw new Error(errorMessage);
        }

        // Vérifier que la réponse est du JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Non-JSON response:', {
                contentType: contentType,
                text: text,
                status: response.status
            });
            throw new Error('Réponse invalide du serveur');
        }

        const result = await response.json();
        console.log('Form submission success:', result);

        if (result.ok) {
            showSuccess('Message envoyé avec succès! Je vous répondrai bientôt.');
            contactForm.reset();
        } else {
            showError(result.error || 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
        }

    } catch (error) {
        console.error('Form submission error:', error);

        let errorMessage = 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou m\'envoyer un email directement à dipitay@gmail.com';

        if (error.name === 'AbortError') {
            errorMessage = 'La requête a pris trop de temps. Veuillez réessayer ou m\'envoyer un email directement à dipitay@gmail.com';
            console.error('Request timeout:', error);
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
            errorMessage = 'Impossible de contacter le serveur. Veuillez vérifier votre connexion ou m\'envoyer un email directement à dipitay@gmail.com';
            console.error('Network error:', error);
        } else if (error.message) {
            // Utiliser le message d'erreur du serveur s'il est disponible
            errorMessage = error.message;
            // Si le message contient des détails techniques, les logger mais ne pas les afficher
            if (error.error) {
                console.error('Server error details:', error.error);
            }
        }

        showError(errorMessage);
    } finally {
        // Reset button state
        isSubmitting = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        btnSubmit.disabled = false;
    }
});

function showSuccess(message = 'Message envoyé avec succès!') {
    formMessage.textContent = message;
    formMessage.className = 'form-message success';
    formMessage.style.display = 'block';

    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(message) {
    formMessage.textContent = message;
    formMessage.className = 'form-message error';
    formMessage.style.display = 'block';

    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Alternative: Simple form submission using Formspree or similar service
// You can also use this approach by replacing the form action:
/*
contactForm.addEventListener('submit', (e) => {
    // Form will submit to Formspree endpoint
    // Make sure to add: action="https://formspree.io/f/YOUR_FORM_ID" method="POST" to form tag
});
*/

// Add smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.project-card, .about-content, .contact-content');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});


// Typewriter Effect
const heroBg = document.querySelector('.hero-bg');
const heroDescription = document.querySelector('.hero-description');
const originalText = "Bienvenue dans mon monde numérique. Ici on parle de développement web, mobile et automatisation.";

// Clear text initially
heroDescription.textContent = originalText;

function typeWriter(text, element, speed = 50) {
    element.textContent = '';
    element.classList.add('typing-cursor');

    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Typing finished
            // Keep cursor for a while then remove if needed, or keep blinking
        }
    }
    type();
}

// Synchronize with CSS animation
if (heroBg && heroDescription) {
    // Initial state
    heroDescription.style.opacity = '1';

    // Listen for animation iteration to sync
    heroBg.addEventListener('animationiteration', () => {
        runTypingCycle();
    });

    // Also start the cycle initially (sync with the first run of CSS animation)
    // The CSS animation starts immediately. We need to match the timing.
    // Cycle is 20s.
    // 0-35% (0-7s): Visible
    // 35-45% (7-9s): Fade Out
    // 45% (9s): Start Typing

    runTypingCycle();
}

function runTypingCycle() {
    // Cycle is 30s
    // 0-10s: Purple BG (Visible)
    // 10-20s: Dark Theme (Typewriter)
    // 20-30s: Rabbit Scene (Text should be hidden or visible? Let's hide it to focus on rabbit)

    // Reset
    heroDescription.style.transition = 'none';
    heroDescription.style.opacity = '1';
    heroDescription.textContent = originalText;
    heroDescription.classList.remove('typing-cursor');

    // Schedule Fade Out at 10s (33%) - Transition to Dark Theme
    setTimeout(() => {
        heroDescription.style.transition = 'opacity 1s ease';
        heroDescription.style.opacity = '0';
    }, 10000);

    // Schedule Typing Start at 12s (40%) - On Dark Theme
    setTimeout(() => {
        heroDescription.style.transition = 'none';
        heroDescription.style.opacity = '1';
        typeWriter(originalText, heroDescription, 50);
    }, 12000);

    // Schedule Fade Out at 20s (66%) - Transition to Rabbit Scene
    setTimeout(() => {
        heroDescription.style.transition = 'opacity 1s ease';
        heroDescription.style.opacity = '0';
    }, 20000);

    // Text remains hidden during Rabbit Scene (20-30s)
    // Will reset at 30s (0s) by the next cycle call
}

// Project Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    // Guard clause in case carousel elements don't exist
    if (!track) return;

    const slides = Array.from(track.children);
    const dotsNav = document.querySelector('.carousel-dots');
    const dots = Array.from(dotsNav.children);

    let currentIndex = 0;
    let autoPlayInterval;

    // Update slide position
    const updateSlidePosition = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Update dots
    const updateDots = (index) => {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    };

    // Move to next slide
    const moveToNextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
        updateDots(currentIndex);
    };

    // Auto Play
    const startAutoPlay = () => {
        stopAutoPlay(); // Clear existing interval
        autoPlayInterval = setInterval(moveToNextSlide, 5000); // Change slide every 5 seconds
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    // Event Listeners
    dotsNav.addEventListener('click', (e) => {
        const targetDot = e.target.closest('.dot');
        if (!targetDot) return;

        const targetIndex = parseInt(targetDot.dataset.index);
        currentIndex = targetIndex;
        updateSlidePosition();
        updateDots(currentIndex);
        startAutoPlay();
    });

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Initial Start
    startAutoPlay();
});
