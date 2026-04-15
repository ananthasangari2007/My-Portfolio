// ==================== PARTICLES BACKGROUND ====================
const particlesContainer = document.getElementById('particles');
const particleCount = 100;

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 2;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animation = `float-particles ${duration}s infinite`;
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Add floating animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particles {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

createParticles();

// ==================== SCROLL PROGRESS BAR ====================
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress-bar').style.width = scrolled + '%';
});

// ==================== SCROLL TO TOP BUTTON ====================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== HAMBURGER MENU ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('tabindex', '0');
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');

    const closeMobileMenu = () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    const toggleMobileMenu = () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    hamburger.addEventListener('click', () => {
        toggleMobileMenu();
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    hamburger.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return;
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

// ==================== ACTIVE NAVIGATION LINK ====================
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fade-in 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all elements with animations
document.querySelectorAll('.glass-card, .project-card, .cert-card, .vision-card, .strength-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== ANIMATED SKILL PROGRESS BARS ====================
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.animation = `progress-fill 1.5s ease-out forwards`;
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => barObserver.observe(bar));
};

animateSkillBars();

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== TYPING ANIMATION ====================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    
    let index = 0;
    const typeText = () => {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 50);
        }
    };
    
    // Start typing after page loads
    setTimeout(typeText, 1000);
}

// ==================== HOVER GLOW EFFECT ON CARDS ====================
document.querySelectorAll('.glass-card, .project-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
});

// ==================== BUTTON RIPPLE EFFECT ====================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== CUSTOM CURSOR ====================
const customCursor = document.createElement('div');
customCursor.className = 'custom-cursor';
document.body.appendChild(customCursor);

let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    customCursor.style.left = cursorX + 'px';
    customCursor.style.top = cursorY + 'px';
});

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger animations for visible elements
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('animated');
    });
});

// ==================== SECTION VISIBILITY CHECK ====================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.7 && section.style.opacity !== '1') {
            section.style.opacity = '1';
        }
    });
});

// ==================== RESPONSIVE NAVIGATION ====================
if (window.innerWidth <= 768) {
    // Mobile menu close on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset;
        if (scrollTop > lastScrollTop) {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
        lastScrollTop = scrollTop;
    });
}

// ==================== LAZY LOAD IMAGES ====================
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ==================== DYNAMIC TIME BASED MESSAGE ====================
const updateGreeting = () => {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';
    
    console.log(`%c${greeting}! Welcome to ANANTHA's Portfolio`, 'color: #00d4ff; font-size: 16px; font-weight: bold;');
};

updateGreeting();

// ==================== SMOOTH REVEAL ON SCROLL ====================
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.glass-card, .project-card, .vision-card');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// ==================== NOTIFICATION SYSTEM ====================
const notifyUser = (message, duration = 3000) => {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 212, 255, 0.2);
        border: 1px solid #00d4ff;
        color: #00d4ff;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 9999;
        animation: fadeInOut 0.5s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOutUp 0.5s ease-in-out';
        setTimeout(() => notification.remove(), 500);
    }, duration);
};

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + / for quick navigation
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        notifyUser('Navigation shortcuts enabled!');
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape' && navMenu) {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll animations here
            ticking = false;
        });
        ticking = true;
    }
});

// ==================== DARK MODE BY DEFAULT ====================
document.documentElement.style.colorScheme = 'dark';

// ==================== ACCESSIBILITY IMPROVEMENTS ====================
document.querySelectorAll('.btn, .nav-link, .social-icon').forEach(element => {
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');
    
    element.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
        }
    });
});

// ==================== MEMORY OPTIMIZATION ====================
window.addEventListener('beforeunload', () => {
    // Clean up observers
    observer.disconnect();
    imageObserver.disconnect();
});

// ==================== THEME PERSISTENCE ====================
const saveTheme = () => {
    localStorage.setItem('theme', 'dark');
};

const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
        document.body.classList.remove('light-mode');
    }
};

loadTheme();
saveTheme();

// ==================== CONSOLE MESSAGE ====================
console.log('%c🚀 Welcome to ANANTHA SANGARI P\'s Portfolio', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cMADE WITH ❤️ AND CODE', 'color: #ff006e; font-size: 16px; font-weight: bold;');
console.log('%cPowered by Modern Web Technologies', 'color: #a855f7; font-size: 12px;');
