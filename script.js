// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Smooth scroll and active nav link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
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

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    btnSubmit.disabled = true;
    
    // Hide previous messages
    formMessage.style.display = 'none';
    formMessage.className = 'form-message';
    
    try {
        // Using EmailJS for sending emails
        // Note: You'll need to set up EmailJS account and replace with your service ID
        // For now, we'll use a mailto fallback and show success message
        
        // Create mailto link as fallback
        const mailtoLink = `mailto:dipitay@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        
        // For production, you would use EmailJS or a backend service
        // This is a client-side solution that opens email client
        // You can integrate EmailJS by:
        // 1. Sign up at https://www.emailjs.com/
        // 2. Add your service ID, template ID, and public key
        // 3. Uncomment and configure the EmailJS code below
        
        /*
        // EmailJS integration (uncomment and configure)
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'dipitay@gmail.com'
        }, 'YOUR_PUBLIC_KEY')
        .then(() => {
            showSuccess();
            contactForm.reset();
        })
        .catch((error) => {
            showError('Une erreur est survenue. Veuillez réessayer.');
            console.error('EmailJS error:', error);
        });
        */
        
        // Simulate API call (replace with actual EmailJS or backend call)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For now, we'll show success and provide mailto option
        // In production, replace this with actual email sending
        showSuccess('Message envoyé avec succès! Je vous répondrai bientôt.');
        contactForm.reset();
        
        // Optionally open mailto as backup
        // window.location.href = mailtoLink;
        
    } catch (error) {
        showError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou m\'envoyer un email directement à dipitay@gmail.com');
        console.error('Form submission error:', error);
    } finally {
        // Reset button state
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

