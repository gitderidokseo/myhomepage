// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active'); // Optional: transform icon
});

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header height
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Reveal only once
        }
    });
};

const revealOptions = {
    threshold: 0.15,
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false; // Flag to run once

const animateStats = () => {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const increment = target / 200; // Speed control
        
        const updateCount = () => {
            const count = +stat.innerText;
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                stat.innerText = target;
            }
        };
        updateCount();
    });
};

// Trigger Stats Animation when "About" section is visible
const aboutSection = document.querySelector('#about');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateStats();
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });
if (aboutSection) {
    statsObserver.observe(aboutSection);
}
