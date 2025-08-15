// Smooth scrolling for navigation links
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

// Ensure buttons are functional without debug styling
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .social-btn');
    
    buttons.forEach((button) => {
        // Just ensure they're clickable, no visual debug
        button.style.pointerEvents = 'auto';
        button.style.zIndex = '50';
        button.style.position = 'relative';
    });
    
    // Force visibility check for buttons at 100% zoom
    function ensureButtonVisibility() {
        const heroButtons = document.querySelector('.hero-buttons');
        const socialLinks = document.querySelector('.social-links');
        
        if (heroButtons) {
            heroButtons.style.display = 'flex';
            heroButtons.style.visibility = 'visible';
            heroButtons.style.opacity = '1';
        }
        
        if (socialLinks) {
            socialLinks.style.display = 'flex';
            socialLinks.style.visibility = 'visible';
            socialLinks.style.opacity = '1';
        }
        
        // Force all buttons to be visible
        buttons.forEach(btn => {
            btn.style.display = 'inline-flex';
            btn.style.visibility = 'visible';
            btn.style.opacity = '1';
        });
    }
    
    // Run on load and resize
    ensureButtonVisibility();
    window.addEventListener('resize', ensureButtonVisibility);
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
});

// Intersection Observer for fade-in animations
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

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat').forEach(el => {
    observer.observe(el);
});

// Typing animation for hero subtitle
const subtitle = document.querySelector('.hero-subtitle');
const subtitleText = subtitle.textContent;
subtitle.textContent = '';

function typeWriter(text, element, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        typeWriter(subtitleText, subtitle, 80);
    }, 1000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'scale(1.1)';
        skill.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
    });
    
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'scale(1)';
        skill.style.boxShadow = 'none';
    });
});

// Contact form validation (if you add a contact form later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Add floating animation to memojis
document.querySelectorAll('.memoji, .section-memoji, .card-memoji, .project-memoji, .skill-memoji, .method-memoji').forEach(memoji => {
    memoji.addEventListener('mouseenter', () => {
        memoji.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    memoji.addEventListener('mouseleave', () => {
        memoji.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Copy email to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show toast notification
        showToast('Email copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add click event to email contact method
document.addEventListener('DOMContentLoaded', () => {
    const emailContact = document.querySelector('a[href^="mailto:"]');
    if (emailContact) {
        emailContact.addEventListener('click', (e) => {
            e.preventDefault();
            const email = emailContact.href.replace('mailto:', '');
            copyToClipboard(email);
        });
    }
});

// Easter egg: Konami code
let konamiCode = [];
const targetCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-targetCode.length);
    
    if (konamiCode.join('') === targetCode.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        showToast('🎉 Konami Code Activated! You found the easter egg!');
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            document.head.removeChild(style);
        }, 4000);
    }
});

// Initialize AOS (Animate On Scroll) if you want to add it later
// AOS.init({
//     duration: 1000,
//     easing: 'ease-in-out',
//     once: true
// });
