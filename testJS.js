// Navbar functionality
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const section = link.getAttribute('data-section');
        
        if (!section) return;
        
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        
        // Show/hide sections
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.toggle('active', sec.id === section);
        });
        
        // Close mobile menu
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Add scrolled class to navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Set first link as active
navLinks[0].classList.add('active');

// Typing effect
const typingText = document.querySelector('.typing-text');
const phrases = ['Computer Systems Engineer', 'Embedded Systems Developer', 'PCB Designer', 'Software Engineer'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Start typing effect after page load
setTimeout(typeEffect, 1000);

// Smooth scroll for CTA buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = href.substring(1);
            
            // Find the corresponding nav link and trigger it
            navLinks.forEach(link => {
                if (link.getAttribute('data-section') === target) {
                    link.click();
                }
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .about-card, .timeline-item, .skill-category').forEach(el => {
    observer.observe(el);
});