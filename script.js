// Smooth scrolling for navigation links with enhanced easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced scroll-triggered animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        // Create intersection observer for smooth reveal animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.story-card, .tech-stack, .achievement-item');
        animateElements.forEach(el => observer.observe(el));
    }
}

// Initialize enhanced scroll animations
document.addEventListener('DOMContentLoaded', function() {
    new ScrollAnimations();
});

// Language Toggle Functionality
class LanguageToggle {
    constructor() {
        this.currentLang = 'en';
        this.toggleBtn = document.getElementById('lang-toggle');
        this.init();
    }

    init() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleLanguage());
        }
        
        // Set initial language from localStorage or default to English
        const savedLang = localStorage.getItem('portfolio-language') || 'en';
        this.setLanguage(savedLang);
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'en' ? 'de' : 'en';
        this.setLanguage(newLang);
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('portfolio-language', lang);
        
        // Update all translatable elements
        const translatableElements = document.querySelectorAll(`[data-${lang}]`);
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                element.textContent = translation;
            }
        });

        // Update button appearance
        this.updateToggleButton();
        
        // Update document language and title
        document.documentElement.lang = lang;
        const title = lang === 'en' ? 'Muhammad Ghufran Akbar - Portfolio' : 'Muhammad Ghufran Akbar - Portfolio';
        document.title = title;
    }

    updateToggleButton() {
        if (!this.toggleBtn) return;
        
        const enText = this.toggleBtn.querySelector('.lang-text:first-child');
        const deText = this.toggleBtn.querySelector('.lang-text:last-child');
        
        if (this.currentLang === 'en') {
            enText.classList.remove('inactive');
            deText.classList.add('inactive');
        } else {
            enText.classList.add('inactive');
            deText.classList.remove('inactive');
        }
        
        this.toggleBtn.setAttribute('data-lang', this.currentLang);
    }
}

// Initialize language toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new LanguageToggle();
    
    // Existing button functionality
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

// Optimized scroll handlers combined for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Combined scroll handler for better performance
const optimizedScrollHandler = throttle(() => {
    const scrollY = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    // Navbar background change
    if (scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Parallax removed to fix scrollbar and jump-to-top issues
}, 16);

// Single optimized scroll event listener
window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// On mobile, reduce scroll handler work for buttery smoothness
if (window.innerWidth <= 600) {
    window.removeEventListener('scroll', optimizedScrollHandler);
    window.addEventListener('scroll', throttle(() => {
        // Only navbar background change for mobile
        const scrollY = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        if (scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    }, 32), { passive: true });
}

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

// Interactive Logo Functionality
class InteractiveLogo {
    constructor() {
        this.logo = document.getElementById('logo-text');
        this.nameText = this.logo.querySelector('.name-text');
        this.originalText = 'Muhammad Ghufran Akbar';
        this.techVariations = [
            'pipeline = build_ml_model(data)',
            'from vertex_ai import AutoML',
            'SELECT * FROM bigquery.ml.PREDICT',
            'dbt run --models ml_features',
            'airflow trigger_dag ml_pipeline',
            '{ "role": "ML Engineer" }',
            'terraform apply -auto-approve',
            'agentic_ai.optimize_process()',
            'data_pipeline.transform().load()',
            'console.log("Data Engineer")',
            'kubectl apply -f ai-model.yaml',
            'gcloud compute instances create',
            'docker-compose up -d',
            'git push origin feature/ml-ops',
            'Muhammad Ghufran Akbar'
        ];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.logo.addEventListener('click', () => this.triggerTypewriter());
    }

    async triggerTypewriter() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const randomTech = this.techVariations[Math.floor(Math.random() * (this.techVariations.length - 1))];
        
        // Clear current text
        await this.clearText();
        
        // Type tech message
        await this.typeText(randomTech);
        
        // Wait a moment
        await this.sleep(1500);
        
        // Clear tech message
        await this.clearText();
        
        // Type original name back
        await this.typeText(this.originalText);
        
        this.isAnimating = false;
    }

    async clearText() {
        const currentText = this.nameText.textContent;
        for (let i = currentText.length; i >= 0; i--) {
            this.nameText.textContent = currentText.substring(0, i);
            await this.sleep(30);
        }
    }

    async typeText(text) {
        for (let i = 0; i <= text.length; i++) {
            this.nameText.textContent = text.substring(0, i);
            await this.sleep(50);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize Interactive Logo
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveLogo();
    initAIGame();
});

// AI Mini Game Functionality
let gameState = {
    isOpen: false,
    accuracy: 0,
    epoch: 0,
    nodes: []
};

function initAIGame() {
    createNeuralNodes();
}

function toggleAIGame() {
    const gameContainer = document.getElementById('ai-game');
    const backdrop = document.getElementById('ai-game-backdrop');
    
    if (!gameState.isOpen) {
        // Open game
        backdrop.classList.add('active');
        gameContainer.classList.add('active');
        gameState.isOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add event listeners
        setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('keydown', handleEscKey);
        }, 100);
    } else {
        // Close game
        backdrop.classList.remove('active');
        gameContainer.classList.remove('active');
        gameState.isOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
        
        // Remove event listeners
        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('keydown', handleEscKey);
    }
}

function handleEscKey(event) {
    if (event.key === 'Escape' && gameState.isOpen) {
        toggleAIGame();
    }
}

function handleOutsideClick(event) {
    const gameContainer = document.getElementById('ai-game');
    const profileTitle = document.querySelector('.profile-title');
    const backdrop = document.getElementById('ai-game-backdrop');
    
    // Close if clicking on backdrop
    if (event.target === backdrop) {
        toggleAIGame();
    }
    // Don't close if clicking inside the game or on profile title
    else if (!gameContainer.contains(event.target) && !profileTitle.contains(event.target)) {
        // Optional: uncomment the line below if you want to close on any outside click
        // toggleAIGame();
    }
}

function createNeuralNodes() {
    const nodesContainer = document.getElementById('neural-nodes');
    gameState.nodes = [];
    
    // Clear existing nodes
    nodesContainer.innerHTML = '';
    
    // Create 36 neural nodes (6x6 grid)
    for (let i = 0; i < 36; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        node.dataset.index = i;
        
        // Add click handler for interactive training
        node.addEventListener('click', () => activateNode(i));
        
        nodesContainer.appendChild(node);
        gameState.nodes.push({
            element: node,
            active: false,
            weight: Math.random()
        });
    }
}

function activateNode(index) {
    const node = gameState.nodes[index];
    
    if (!node.active) {
        node.element.classList.add('active');
        node.active = true;
        
        // Cascade activation to nearby nodes
        setTimeout(() => {
            cascadeActivation(index);
        }, 200);
        
        // Update accuracy based on activated nodes
        updateAccuracy();
    }
}

function cascadeActivation(centerIndex) {
    const gridSize = 6;
    const row = Math.floor(centerIndex / gridSize);
    const col = centerIndex % gridSize;
    
    // Activate adjacent nodes with probability
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                const newIndex = newRow * gridSize + newCol;
                
                if (newIndex !== centerIndex && Math.random() < 0.4) {
                    setTimeout(() => {
                        if (!gameState.nodes[newIndex].active) {
                            gameState.nodes[newIndex].element.classList.add('active');
                            gameState.nodes[newIndex].active = true;
                        }
                    }, Math.random() * 300);
                }
            }
        }
    }
}

function trainNetwork() {
    gameState.epoch++;
    document.getElementById('epoch').textContent = gameState.epoch;
    
    // Simulate training with animated progress
    const trainBtn = document.querySelector('.train-btn');
    const originalText = trainBtn.textContent;
    trainBtn.style.pointerEvents = 'none';
    trainBtn.textContent = 'Training...';
    trainBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
    
    // Add training progress indicator
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 2;
        trainBtn.textContent = `Training... ${progress}% `;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 40);
    
    // Activate random nodes during training with better timing
    let activationCount = 0;
    const maxActivations = 12 + Math.floor(Math.random() * 8);
    
    const trainingInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * gameState.nodes.length);
        if (!gameState.nodes[randomIndex].active && Math.random() < 0.4) {
            activateNode(randomIndex);
            activationCount++;
        }
        
        if (activationCount >= maxActivations) {
            clearInterval(trainingInterval);
        }
    }, 120);
    
    // Complete training after 2.5 seconds
    setTimeout(() => {
        clearInterval(trainingInterval);
        clearInterval(progressInterval);
        
        trainBtn.style.pointerEvents = 'auto';
        trainBtn.textContent = originalText;
        trainBtn.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)';
        
        // Boost accuracy with smooth animation
        const targetAccuracy = Math.min(100, gameState.accuracy + Math.floor(Math.random() * 20) + 15);
        animateAccuracy(gameState.accuracy, targetAccuracy);
        
        // Reset some nodes for next training
        if (targetAccuracy >= 95) {
            setTimeout(() => {
                celebrateSuccess();
            }, 800);
        }
    }, 2500);
}

function animateAccuracy(fromValue, toValue) {
    const duration = 1000;
    const startTime = Date.now();
    const accuracyElement = document.getElementById('accuracy');
    
    function updateAccuracy() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(fromValue + (toValue - fromValue) * easedProgress);
        
        accuracyElement.textContent = currentValue;
        accuracyElement.style.transform = `scale(${1 + Math.sin(progress * Math.PI) * 0.1})`;
        
        if (progress < 1) {
            requestAnimationFrame(updateAccuracy);
        } else {
            gameState.accuracy = toValue;
            accuracyElement.style.transform = 'scale(1)';
        }
    }
    
    updateAccuracy();
}

function updateAccuracy() {
    const activeNodes = gameState.nodes.filter(node => node.active).length;
    const totalNodes = gameState.nodes.length;
    
    gameState.accuracy = Math.floor((activeNodes / totalNodes) * 100);
    document.getElementById('accuracy').textContent = gameState.accuracy;
}

function celebrateSuccess() {
    // Create success animation
    const gameContainer = document.getElementById('ai-game');
    gameContainer.style.animation = 'ai-success-celebration 1.5s ease-in-out';
    
    // Add particle effect
    createParticleEffect();
    
    // Show success message with typewriter effect
    const header = document.querySelector('.ai-game-header h3');
    const originalText = header.textContent;
    header.style.color = '#00ff88';
    
    typewriterEffect(header, 'AI Training Complete! Neural Network Optimized! ', 50)
        .then(() => {
            // Restore original state after celebration
            setTimeout(() => {
                header.style.color = '#fbbf24';
                typewriterEffect(header, originalText, 30);
                gameContainer.style.animation = '';
                
                // Reset game for next round
                setTimeout(() => {
                    resetGame();
                }, 1500);
            }, 2500);
        });
}

function typewriterEffect(element, text, speed) {
    return new Promise((resolve) => {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                resolve();
            }
        }, speed);
    });
}

function createParticleEffect() {
    const gameContainer = document.getElementById('ai-game');
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #fbbf24;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1001;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particle-float ${2 + Math.random() * 2}s ease-out forwards;
        `;
        
        gameContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }
}

function resetGame() {
    gameState.nodes.forEach(node => {
        node.element.classList.remove('active');
        node.active = false;
        node.weight = Math.random();
    });
    
    gameState.accuracy = 0;
    document.getElementById('accuracy').textContent = '0';
}
