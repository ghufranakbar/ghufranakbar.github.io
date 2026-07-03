// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Set theme from localStorage or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = root.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Page load animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links with enhanced easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length <= 1) return;
        e.preventDefault();
        const target = document.querySelector(href);
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

// Page load animation
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
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
                // Only update if content is actually different (case-insensitive comparison)
                // This prevents unnecessary updates of technical terms that are same in both languages
                const currentText = element.textContent.trim();
                const newText = translation.trim();
                
                if (currentText.toLowerCase() !== newText.toLowerCase()) {
                    element.textContent = translation;
                }
            }
        });

        // Update project link texts
        this.updateProjectLinks(lang);
        
        // Update certification texts
        this.updateCertificationTexts(lang);

        // Update button appearance
        this.updateToggleButton();

        // Update document language (title stays as the SEO-optimized <title>)
        document.documentElement.lang = lang;
    }

    updateProjectLinks(lang) {
        const translations = {
            en: {
                'Live Demo': 'Live Demo',
                'GitHub': 'GitHub',
                'Repo': 'Repo',
                'Code': 'Code',
                'Internal': 'Internal'
            },
            de: {
                'Live Demo': 'Live-Demo',
                'GitHub': 'GitHub',
                'Repo': 'Repository',
                'Code': 'Code',
                'Internal': 'Intern'
            }
        };

        // Update all project link texts
        document.querySelectorAll('.project-link').forEach(link => {
            const text = link.textContent.trim().replace(/\s+/g, ' ');
            for (const [en, de] of Object.entries(translations.en)) {
                if (text.includes(en)) {
                    const icon = link.querySelector('i');
                    const iconHtml = icon ? icon.outerHTML : '';
                    link.innerHTML = iconHtml + ' ' + (lang === 'en' ? en : translations.de[en]);
                    break;
                }
            }
        });
    }

    updateCertificationTexts(lang) {
        const translations = {
            en: {
                'View Certificate': 'View Certificate',
                'Issued': 'Issued',
                'Credential ID': 'Credential ID',
                'Certified': 'Certified'
            },
            de: {
                'View Certificate': 'Zertifikat ansehen',
                'Issued': 'Ausgestellt',
                'Credential ID': 'Zertifikats-ID',
                'Certified': 'Zertifiziert'
            }
        };

        // Update certification links
        document.querySelectorAll('.cert-link').forEach(link => {
            if (link.textContent.includes('View Certificate')) {
                const icon = link.querySelector('i');
                const iconHtml = icon ? icon.outerHTML : '';
                link.innerHTML = iconHtml + ' ' + translations[lang]['View Certificate'];
            }
        });

        // Update certification date texts
        document.querySelectorAll('.cert-date').forEach(elem => {
            const text = elem.textContent;
            if (lang === 'de') {
                elem.textContent = text.replace('Issued', translations.de['Issued']);
            } else {
                elem.textContent = text.replace('Ausgestellt', translations.en['Issued']);
            }
        });

        // Update credential ID texts
        document.querySelectorAll('.cert-id').forEach(elem => {
            const text = elem.textContent;
            if (lang === 'de') {
                elem.textContent = text.replace('Credential ID', translations.de['Credential ID']);
            } else {
                elem.textContent = text.replace('Zertifikats-ID', translations.en['Credential ID']);
            }
        });

        // Update certification status texts
        document.querySelectorAll('.cert-status').forEach(elem => {
            if (elem.textContent.trim() === 'Certified' || elem.textContent.trim() === 'Zertifiziert') {
                elem.textContent = translations[lang]['Certified'];
            }
        });
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

// Mobile navigation is handled by initMobileNavigation() function below

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
    // CSS variables handle theming automatically
    
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
        // CSS variables handle theming automatically
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

// Delete and rewrite typewriter effect for "Ready to build intelligent solutions!"
function initContactTypewriter() {
    const typingElement = document.querySelector('.typing-animation .string');
    if (!typingElement) return;
    
    const messages = [
        "Ready to build intelligent solutions!",
        "Data Engineering @ PUMA Group!",
        "Expert in Data Pipeline Architecture!",
        "Building ETL/ELT workflows on GCP!",
        "Specialized in Agentic AI Systems!"
    ];
    
    let currentMessageIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let typeSpeed = 100;
    
    function typeEffect() {
        const fullMessage = messages[currentMessageIndex];
        
        if (isDeleting) {
            currentText = fullMessage.substring(0, currentText.length - 1);
            typeSpeed = 50; // Faster deletion
        } else {
            currentText = fullMessage.substring(0, currentText.length + 1);
            typeSpeed = 100; // Normal typing speed
        }
        
        typingElement.textContent = `"${currentText}"`;
        
        if (!isDeleting && currentText === fullMessage) {
            // Pause at the end of the message
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentMessageIndex = (currentMessageIndex + 1) % messages.length;
            typeSpeed = 500; // Pause before typing next message
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start the effect after a delay
    setTimeout(typeEffect, 2000);
}

// Initialize the contact typewriter effect
document.addEventListener('DOMContentLoaded', initContactTypewriter);

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
        this.originalText = this.nameText.textContent;
        this.techVariations = [
            'pipeline = build_etl_workflow(data)',
            'from vertex_ai import AutoML',
            'SELECT * FROM bigquery.ml.PREDICT',
            'dbt run --models marketing_marts',
            'composer trigger_dag marketing_elt',
            '{ "role": "Data Engineer" }',
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
    buildDagBoard();
});

// ========================================
// ON-CALL: FIX THE DAG — pipeline incident mini-game
// Tasks randomly fail (turn red); tap them to retry before the SLA
// drains to zero. Survive the 45-second shift.
// ========================================
var gameState = {
    isOpen: false
};

const DAG_TASKS = [
    'extract_orders', 'dq_check', 'dbt_run',
    'load_bigquery', 'sync_sap', 'api_ingest',
    'dedupe_rows', 'backfill_run', 'publish_marts',
    'schema_check', 'export_gcs', 'alert_router'
];

const DAG_SHIFT_SECONDS = 45;

var dagGame = {
    running: false,
    sla: 100,
    fixed: 0,
    timeLeft: DAG_SHIFT_SECONDS,
    spawnDelay: 1500,
    tickTimer: null,
    spawnTimer: null,
    best: 0
};

function buildDagBoard() {
    const board = document.getElementById('dag-board');
    if (!board || board.children.length) return;

    DAG_TASKS.forEach(task => {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'dag-cell is-idle';
        cell.innerHTML = '<span class="dc-dot"></span><span class="dc-name">' + task + '</span>';
        cell.addEventListener('click', () => fixDagTask(cell));
        board.appendChild(cell);
    });

    try {
        dagGame.best = parseInt(localStorage.getItem('dag-best') || '0', 10) || 0;
    } catch (e) { /* storage unavailable — best stays session-local */ }
    updateDagHud();
}

function setDagStatus(text) {
    const el = document.getElementById('game-status');
    if (el) el.textContent = text;
}

function updateDagHud() {
    const slaEl = document.getElementById('dag-sla');
    const fixedEl = document.getElementById('dag-fixed');
    const timeEl = document.getElementById('dag-time');
    const bestEl = document.getElementById('dag-best');
    const fillEl = document.getElementById('sla-fill');

    if (slaEl) slaEl.textContent = Math.max(0, Math.round(dagGame.sla)) + '%';
    if (fixedEl) fixedEl.textContent = dagGame.fixed;
    if (timeEl) timeEl.textContent = dagGame.timeLeft + 's';
    if (bestEl) bestEl.textContent = dagGame.best;

    if (fillEl) {
        fillEl.style.width = Math.max(0, dagGame.sla) + '%';
        fillEl.classList.toggle('warn', dagGame.sla <= 66 && dagGame.sla > 33);
        fillEl.classList.toggle('crit', dagGame.sla <= 33);
    }
}

function stopDagTimers() {
    clearInterval(dagGame.tickTimer);
    clearTimeout(dagGame.spawnTimer);
    dagGame.tickTimer = null;
    dagGame.spawnTimer = null;
}

function startDagGame() {
    stopDagTimers();
    dagGame.running = true;
    dagGame.sla = 100;
    dagGame.fixed = 0;
    dagGame.timeLeft = DAG_SHIFT_SECONDS;
    dagGame.spawnDelay = 1500;

    document.querySelectorAll('.dag-cell').forEach(cell => {
        cell.className = 'dag-cell is-ok';
    });

    const startBtn = document.getElementById('dag-start');
    if (startBtn) startBtn.textContent = 'Restart shift';

    setDagStatus('Shift started. All systems green… for now.');
    updateDagHud();

    // 1s heartbeat: countdown + every failed task drains the SLA
    dagGame.tickTimer = setInterval(() => {
        dagGame.timeLeft--;
        const failing = document.querySelectorAll('.dag-cell.is-failed').length;
        dagGame.sla -= failing * 1.4;

        if (dagGame.sla <= 0) {
            dagGame.sla = 0;
            updateDagHud();
            endDagGame(false);
            return;
        }
        if (dagGame.timeLeft <= 0) {
            dagGame.timeLeft = 0;
            updateDagHud();
            endDagGame(true);
            return;
        }
        updateDagHud();
    }, 1000);

    scheduleDagFailure();
}

function scheduleDagFailure() {
    dagGame.spawnTimer = setTimeout(() => {
        if (!dagGame.running) return;

        const healthy = document.querySelectorAll('.dag-cell.is-ok');
        if (healthy.length) {
            const victim = healthy[Math.floor(Math.random() * healthy.length)];
            victim.className = 'dag-cell is-failed';
        }

        // escalation: failures come faster as the shift wears on
        dagGame.spawnDelay = Math.max(520, dagGame.spawnDelay - 45);
        scheduleDagFailure();
    }, dagGame.spawnDelay);
}

function fixDagTask(cell) {
    if (!dagGame.running || !cell.classList.contains('is-failed')) return;

    cell.className = 'dag-cell is-fixing';
    dagGame.fixed++;
    if (dagGame.fixed > dagGame.best) {
        dagGame.best = dagGame.fixed;
        try { localStorage.setItem('dag-best', String(dagGame.best)); } catch (e) { /* ignore */ }
    }
    updateDagHud();

    setTimeout(() => {
        if (cell.classList.contains('is-fixing')) {
            cell.className = 'dag-cell is-ok';
        }
    }, 350);
}

function endDagGame(survived) {
    dagGame.running = false;
    stopDagTimers();
    updateDagHud();

    if (survived) {
        setDagStatus('Shift survived — SLA held at ' + Math.round(dagGame.sla) + '% with ' +
            dagGame.fixed + ' tasks recovered. The warehouse lives to load another day. exit 0');
    } else {
        setDagStatus('SLA breached — the pipeline went down with ' + dagGame.fixed +
            ' tasks recovered. Grab a coffee and restart the shift. exit 1');
    }

    const startBtn = document.getElementById('dag-start');
    if (startBtn) startBtn.textContent = 'Start shift';
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

        // Pause the incident shift when the pager is put down
        if (dagGame.running) {
            dagGame.running = false;
            stopDagTimers();
            setDagStatus('Shift abandoned — the DAG waits for your return. Press "Start shift" to go back on call.');
            const startBtn = document.getElementById('dag-start');
            if (startBtn) startBtn.textContent = 'Start shift';
        }

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
    const backdrop = document.getElementById('ai-game-backdrop');

    // Close if clicking on backdrop
    if (event.target === backdrop) {
        toggleAIGame();
    }
}

// Scroll to Top Button Functionality
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// ========================================
// VISUALIZATION INTERACTIVITY
// ========================================

// Pipeline Stage Interactions
function initPipelineInteractions() {
    const pipelineStages = document.querySelectorAll('.pipeline-stage');
    const metricCards = document.querySelectorAll('.metric-card');
    
    pipelineStages.forEach((stage, index) => {
        // Hover effect - highlight connected stages
        stage.addEventListener('mouseenter', () => {
            pipelineStages.forEach((s, i) => {
                if (Math.abs(i - index) <= 1) {
                    s.style.opacity = '1';
                } else {
                    s.style.opacity = '0.5';
                }
            });
        });
        
        stage.addEventListener('mouseleave', () => {
            pipelineStages.forEach(s => {
                s.style.opacity = '1';
            });
        });
        
        // Click effect - show stage details
        stage.addEventListener('click', () => {
            showStageTooltip(stage, index);
        });
        
        // Add cursor pointer
        stage.style.cursor = 'pointer';
    });
    
    // Metric cards counter animation
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const valueElement = card.querySelector('.metric-value');
            const originalValue = valueElement.textContent;
            
            // Add pulse effect
            valueElement.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                valueElement.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

function showStageTooltip(stage, index) {
    const existingTooltip = document.querySelector('.pipeline-tooltip');
    if (existingTooltip) existingTooltip.remove();
    
    const stageTitle = stage.querySelector('h3').textContent;
    const stageDesc = stage.querySelector('p').textContent;
    const techTags = Array.from(stage.querySelectorAll('.tech-tags span'))
        .map(tag => tag.textContent)
        .join(', ');
    
    const stageInfo = [
        { title: 'Unified Data Collection', details: 'Eliminated data silos by integrating 20+ sources into a centralized platform, reducing data inconsistency by 85%' },
        { title: 'Scalable Analytics', details: 'Enabled instant business intelligence with sub-second query performance on 10TB+ datasets, empowering data-driven decisions' },
        { title: 'Data Quality & Consistency', details: 'Implemented automated data validation across 500+ models, ensuring 99.9% data accuracy for critical business metrics' },
        { title: 'Intelligent Automation', details: 'Built self-monitoring workflows that detect and resolve 95% of issues automatically, minimizing manual intervention' },
        { title: 'Predictive Intelligence', details: 'Deployed ML models that forecast demand patterns and optimize inventory, reducing stockouts by 30%' },
        { title: 'Zero-Downtime Delivery', details: 'Achieved continuous deployment with automated health checks and instant rollback, maintaining 99.99% uptime' }
    ];
    
    const isMobile = window.innerWidth <= 768;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'pipeline-tooltip';
    tooltip.innerHTML = `
        <div style="background: rgba(15, 23, 42, 0.98); border: 2px solid rgba(96, 165, 250, 0.6); 
                    border-radius: 16px; padding: ${isMobile ? '15px' : '20px'}; color: #e2e8f0; font-size: ${isMobile ? '0.85rem' : '0.95rem'};
                    box-shadow: 0 20px 60px rgba(0,0,0,0.6); backdrop-filter: blur(20px);
                    position: fixed; z-index: 10000; max-width: ${isMobile ? '90vw' : '350px'}; animation: tooltipFadeIn 0.3s ease;">
            <div style="font-weight: 700; margin-bottom: 10px; color: #60a5fa; font-size: ${isMobile ? '1rem' : '1.1rem'};">
                <i class="fas fa-${getStageIcon(index)}"></i> ${stageTitle}
            </div>
            <div style="font-size: ${isMobile ? '0.85rem' : '0.9rem'}; color: #cbd5e1; margin-bottom: 12px; line-height: 1.6;">
                ${stageInfo[index].details}
            </div>
            <div style="padding-top: 10px; border-top: 1px solid rgba(96, 165, 250, 0.2);">
                <div style="font-size: 0.85rem; color: #94a3b8; font-weight: 600; margin-bottom: 6px;">
                    Technologies:
                </div>
                <div style="font-size: 0.85rem; color: #60a5fa;">
                    ${techTags}
                </div>
            </div>
            ${isMobile ? '<div style="margin-top: 10px; text-align: center; font-size: 0.75rem; color: #64748b;">Tap to close</div>' : ''}
        </div>
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const tooltipElement = tooltip.firstElementChild;
    const rect = stage.getBoundingClientRect();
    
    if (isMobile) {
        // Center on mobile
        tooltipElement.style.top = '50%';
        tooltipElement.style.left = '50%';
        tooltipElement.style.transform = 'translate(-50%, -50%)';
    } else {
        tooltipElement.style.top = `${rect.top + window.scrollY - 20}px`;
        tooltipElement.style.left = `${rect.right + 20}px`;
        
        // Adjust if tooltip goes off-screen
        setTimeout(() => {
            const tooltipRect = tooltipElement.getBoundingClientRect();
            if (tooltipRect.right > window.innerWidth) {
                tooltipElement.style.left = `${rect.left - tooltipRect.width - 20}px`;
            }
        }, 0);
    }
    
    // Auto-remove after 4 seconds or on click
    const removeTooltip = () => tooltip.remove();
    setTimeout(removeTooltip, isMobile ? 5000 : 4000);
    tooltip.addEventListener('click', removeTooltip);
}

function getStageIcon(index) {
    const icons = ['database', 'warehouse', 'code-branch', 'project-diagram', 'brain', 'rocket'];
    return icons[index] || 'cog';
}

// Agentic AI Node Interactions
function initAgenticInteractions() {
    const agentNodes = document.querySelectorAll('.agent-node');
    const connectionPaths = document.querySelectorAll('.connection-path');
    
    agentNodes.forEach((node, index) => {
        node.addEventListener('mouseenter', () => {
            // Animate connection lines
            connectionPaths.forEach((path, pathIndex) => {
                if (pathIndex === index - 1) {
                    path.style.strokeWidth = '3';
                    path.style.opacity = '1';
                } else {
                    path.style.opacity = '0.3';
                }
            });
        });
        
        node.addEventListener('mouseleave', () => {
            connectionPaths.forEach(path => {
                path.style.strokeWidth = '2';
                path.style.opacity = '0.6';
            });
        });
    });
}

// DAG Task Interactions with Status Simulation
function initDAGInteractions() {
    const dagTasks = document.querySelectorAll('.dag-task');
    
    dagTasks.forEach(task => {
        task.addEventListener('click', () => {
            const taskStatus = task.querySelector('.task-status');
            const currentStatus = taskStatus.classList.contains('running') ? 'running' :
                                 taskStatus.classList.contains('pending') ? 'pending' :
                                 taskStatus.classList.contains('success') ? 'success' : 'failed';
            
            // Create tooltip with task details
            showTaskTooltip(task, currentStatus);
        });
    });
    
    // Simulate DAG execution flow
    if (document.querySelector('.dag-workflow')) {
        setTimeout(() => animateDAGFlow(), 2000);
    }
}

function showTaskTooltip(task, status) {
    const existingTooltip = document.querySelector('.dag-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const taskTitle = task.querySelector('.task-title').textContent;
    const taskTime = task.querySelector('.task-time').textContent;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'dag-tooltip';
    tooltip.innerHTML = `
        <div style="background: rgba(15, 23, 42, 0.95); border: 2px solid rgba(96, 165, 250, 0.5); 
                    border-radius: 12px; padding: 15px; color: #e2e8f0; font-size: 0.9rem;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5); backdrop-filter: blur(10px);
                    position: absolute; z-index: 1000; min-width: 200px;">
            <div style="font-weight: 600; margin-bottom: 8px; color: #60a5fa;">${taskTitle}</div>
            <div style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 5px;">
                <i class="fas fa-clock"></i> Duration: ${taskTime}
            </div>
            <div style="font-size: 0.85rem; color: #94a3b8;">
                <i class="fas fa-info-circle"></i> Status: ${status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
        </div>
    `;
    
    task.appendChild(tooltip);
    
    const tooltipElement = tooltip.firstElementChild;
    const taskRect = task.getBoundingClientRect();
    tooltipElement.style.top = '-120px';
    tooltipElement.style.left = '50%';
    tooltipElement.style.transform = 'translateX(-50%)';
    
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}

function animateDAGFlow() {
    const tasks = document.querySelectorAll('.dag-task');
    const statuses = ['running', 'pending', 'success', 'failed'];
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
        if (currentIndex >= tasks.length) {
            clearInterval(interval);
            return;
        }
        
        const task = tasks[currentIndex];
        const statusIndicator = task.querySelector('.task-status');
        
        // Remove all status classes
        statusIndicator.classList.remove('success', 'running', 'pending', 'failed');
        
        // Add running status
        statusIndicator.classList.add('running');
        
        // After a delay, mark as success
        setTimeout(() => {
            statusIndicator.classList.remove('running');
            statusIndicator.classList.add('success');
        }, 1500);
        
        currentIndex++;
    }, 2000);
}

// Scroll-triggered animations for visualizations
function initVisualizationScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on section
                if (entry.target.classList.contains('pipeline-viz-section')) {
                    animatePipelineStages();
                }
                
                if (entry.target.classList.contains('agentic-viz-section')) {
                    animateAgentNodes();
                }
                
                if (entry.target.classList.contains('dag-viz-section')) {
                    animateDAGTasks();
                }
            }
        });
    }, observerOptions);
    
    // Observe all visualization sections
    document.querySelectorAll('.pipeline-viz-section, .agentic-viz-section, .dag-viz-section').forEach(section => {
        observer.observe(section);
    });
}

function animatePipelineStages() {
    const stages = document.querySelectorAll('.pipeline-stage');
    stages.forEach((stage, index) => {
        setTimeout(() => {
            stage.style.opacity = '1';
            stage.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function animateAgentNodes() {
    const nodes = document.querySelectorAll('.agent-node');
    nodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
        }, index * 150);
    });
}

function animateDAGTasks() {
    const tasks = document.querySelectorAll('.dag-task');
    tasks.forEach((task, index) => {
        setTimeout(() => {
            task.style.opacity = '1';
            task.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Add pulse animation to metric cards
function initMetricCardAnimations() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const value = entry.target.querySelector('.metric-value');
                if (value) {
                    // Animate number counting
                    animateValue(value);
                }
            }
        });
    }, { threshold: 0.5 });
    
    metricCards.forEach(card => observer.observe(card));
}

function animateValue(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const number = parseInt(text.replace(/\D/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += stepValue;
        if (current >= number) {
            element.textContent = isPercentage ? `${number}%` : text;
            clearInterval(timer);
        } else {
            element.textContent = isPercentage ? `${Math.floor(current)}%` : Math.floor(current);
        }
    }, duration / steps);
}

// Initialize all visualization interactions
document.addEventListener('DOMContentLoaded', () => {
    initPipelineInteractions();
    initAgenticInteractions();
    initDAGInteractions();
    initVisualizationScrollAnimations();
    initMetricCardAnimations();
    initResponsiveOptimizations();
    initMobileNavigation();
    initPipelineRun();
});

// Mobile Navigation Enhancement
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Responsive Optimizations
function initResponsiveOptimizations() {
    let isMobile = window.innerWidth <= 768;
    let isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // Disable some animations on mobile for better performance
    if (isMobile) {
        // Simplify tooltips for touch devices
        document.querySelectorAll('.pipeline-stage').forEach(stage => {
            stage.addEventListener('touchend', (e) => {
                e.preventDefault();
                const existingTooltip = document.querySelector('.pipeline-tooltip');
                if (existingTooltip) {
                    existingTooltip.remove();
                } else {
                    const index = Array.from(document.querySelectorAll('.pipeline-stage')).indexOf(stage);
                    showStageTooltip(stage, index);
                }
            });
        });
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            isMobile = window.innerWidth <= 768;
            isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
            
            // Re-adjust layout
            document.querySelectorAll('.pipeline-tooltip, .dag-tooltip').forEach(tooltip => {
                tooltip.remove();
            });
        }, 200);
    });
    
    // Optimize scroll performance on mobile
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (isMobile) {
            document.body.classList.add('scrolling');
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('scrolling');
            }, 100);
        }
    }, { passive: true });
}

// Add mobile touch support for visualizations
if ('ontouchstart' in window) {
    document.querySelectorAll('.pipeline-stage, .agent-node, .dag-task').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}
// Tech Radar Interactions
function initTechRadarInteractions() {
    const radarPoints = document.querySelectorAll('.radar-point');
    const techCards = document.querySelectorAll('.tech-detail-card');
    
    radarPoints.forEach(point => {
        const skillType = point.getAttribute('data-skill');
        
        point.addEventListener('mouseenter', () => {
            techCards.forEach(card => {
                if (card.classList.contains(skillType)) {
                    card.style.transform = 'translateY(-8px) scale(1.02)';
                    card.style.borderColor = 'rgba(96, 165, 250, 0.6)';
                    card.style.boxShadow = '0 15px 50px rgba(96, 165, 250, 0.3)';
                } else {
                    card.style.opacity = '0.5';
                }
            });
        });
        
        point.addEventListener('mouseleave', () => {
            techCards.forEach(card => {
                card.style.transform = '';
                card.style.borderColor = '';
                card.style.boxShadow = '';
                card.style.opacity = '1';
            });
        });
    });
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const cardClass = Array.from(card.classList).find(c => 
                ['ml', 'cloud', 'data', 'devops', 'backend', 'frontend'].includes(c)
            );
            
            if (cardClass) {
                const correspondingPoint = document.querySelector(`.radar-point[data-skill="${cardClass}"]`);
                if (correspondingPoint) {
                    correspondingPoint.setAttribute('r', '9');
                }
            }
        });
        
        card.addEventListener('mouseleave', () => {
            radarPoints.forEach(point => {
                point.setAttribute('r', '6');
            });
        });
    });
}

// Update DOMContentLoaded to include tech radar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (typeof initTechRadarInteractions === 'function') {
            initTechRadarInteractions();
        }
    }, 500);
});

// ========================================
// PIPELINE RUN — "a day in the life"
// Drives the run-progress bar, the shift clock, and flips each
// section's task status QUEUED -> RUNNING -> SUCCESS as you scroll.
// ========================================
function initPipelineRun() {
    const fill = document.getElementById('pipeline-progress-fill');
    const clock = document.getElementById('nav-clock');
    const metas = Array.from(document.querySelectorAll('.task-meta'));
    const navLinks = Array.from(document.querySelectorAll('.nav-menu .nav-link'));
    const STATUS_LABELS = { queued: 'QUEUED', running: 'RUNNING', success: 'SUCCESS' };
    let runPct = 0;

    function tickClock() {
        if (!clock) return;
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        clock.textContent = 'run ' + Math.round(runPct) + '% · ' + hh + ':' + mm;
    }
    setInterval(tickClock, 30000);

    function update() {
        const scrollY = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        runPct = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)) : 0;
        if (fill) {
            fill.style.width = runPct + '%';
        }
        tickClock();

        // The "execution line": a point 45% down the viewport decides
        // which task is currently running.
        const line = scrollY + window.innerHeight * 0.45;

        metas.forEach(meta => {
            const section = meta.closest('section');
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const top = rect.top + scrollY;
            const bottom = top + rect.height;
            let status = 'queued';
            if (line >= bottom) status = 'success';
            else if (line >= top) status = 'running';
            if (meta.getAttribute('data-task-status') !== status) {
                meta.setAttribute('data-task-status', status);
                const chip = meta.querySelector('.tm-status');
                if (chip) chip.textContent = STATUS_LABELS[status];
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            if (href.length < 2 || href[0] !== '#') return;
            const section = document.querySelector(href);
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const bottom = rect.top + scrollY + rect.height;
            link.classList.toggle('is-done', line >= bottom);
        });
    }

    update();
    window.addEventListener('scroll', throttle(update, 100), { passive: true });
    window.addEventListener('resize', throttle(update, 250));
}
