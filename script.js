// ===== Particles Animation =====
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Menu Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// ===== Typewriter Effect =====
const typewriterElement = document.getElementById('typewriter');
const words = ['Full Stack Developer', 'Python Expert', 'AI Enthusiast', 'Cyber Security Graduate'];
let wordIndex = 0, charIndex = 0, isDeleting = false;
function typeWriter() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }
    setTimeout(typeWriter, typeSpeed);
}

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000, step = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// ===== Skills Animation =====
function animateSkills() {
    const skillCards = document.querySelectorAll('.skill-card');
    const skillSection = document.querySelector('.skills');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                        const progress = card.querySelector('.skill-progress');
                        if (progress) progress.style.width = progress.getAttribute('data-progress') + '%';
                    }, index * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    observer.observe(skillSection);
}

// ===== Stats Animation on Scroll =====
function initStatsAnimation() {
    const statsSection = document.querySelector('.stats-container');
    let animated = false;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    if (statsSection) observer.observe(statsSection);
}

// ===== Form Handling =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
            btn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== Parallax Effect on Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    typeWriter();
    animateSkills();
    initStatsAnimation();
});
