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

// Page load animation
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
    new ScrollAnimations();
    initTechBackground();
});

// Tech Background Particles - Disabled for clean professional look
function initTechBackground() {
    // Particle animations disabled for a cleaner, more professional appearance
    return;
}

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
        
        // Update document language and title
        document.documentElement.lang = lang;
        const title = lang === 'en' ? 'Muhammad Ghufran Akbar - Portfolio' : 'Muhammad Ghufran Akbar - Portfolio';
        document.title = title;
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

// Delete and rewrite typewriter effect for "Ready to build intelligent solutions!"
function initContactTypewriter() {
    const typingElement = document.querySelector('.typing-animation .string');
    if (!typingElement) return;
    
    const messages = [
        "Ready to build intelligent solutions!",
        "Passionate about ML Engineering!",
        "Expert in Data Pipeline Architecture!",
        "Specialized in Agentic AI Systems!",
        "Ready to build intelligent solutions!"
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
    initTicTacToe();
});

// Tic Tac Toe Game Functionality
let gameState = {
    isOpen: false,
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameOver: false,
    playerScore: 0,
    aiScore: 0
};

function initTicTacToe() {
    const cells = document.querySelectorAll('.board-cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    updateScoreDisplay();
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
}

function handleCellClick(event) {
    const cellIndex = parseInt(event.target.dataset.index);
    
    if (gameState.board[cellIndex] !== '' || gameState.gameOver) {
        return;
    }
    
    // Player move
    makeMove(cellIndex, 'X');
    
    if (!gameState.gameOver) {
        // AI move after a short delay
        setTimeout(() => {
            const aiMove = getBestMove();
            if (aiMove !== -1) {
                makeMove(aiMove, 'O');
            }
        }, 500);
    }
}

function makeMove(index, player) {
    gameState.board[index] = player;
    const cell = document.querySelector(`[data-index="${index}"]`);
    cell.textContent = player;
    cell.classList.add(player === 'X' ? 'player-x' : 'player-o');
    
    const winner = checkWinner();
    if (winner) {
        gameState.gameOver = true;
        handleGameEnd(winner);
    } else if (gameState.board.every(cell => cell !== '')) {
        gameState.gameOver = true;
        handleGameEnd('tie');
    }
}

function checkWinner() {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    for (let line of lines) {
        const [a, b, c] = line;
        if (gameState.board[a] && gameState.board[a] === gameState.board[b] && gameState.board[a] === gameState.board[c]) {
            // Highlight winning cells
            line.forEach(index => {
                document.querySelector(`[data-index="${index}"]`).classList.add('winning');
            });
            return gameState.board[a];
        }
    }
    return null;
}

function handleGameEnd(result) {
    const statusElement = document.getElementById('game-status');
    const gameContainer = document.getElementById('ai-game');
    
    if (result === 'X') {
        statusElement.textContent = '🎉 You won! Great job!';
        statusElement.style.color = '#60a5fa';
        gameState.playerScore++;
        gameContainer.style.animation = 'gameWin 1s ease-in-out';
    } else if (result === 'O') {
        statusElement.textContent = '🤖 AI wins! Try again!';
        statusElement.style.color = '#f59e0b';
        gameState.aiScore++;
    } else {
        statusElement.textContent = '🤝 It\'s a tie! Good game!';
        statusElement.style.color = '#22c55e';
    }
    
    updateScoreDisplay();
    
    setTimeout(() => {
        gameContainer.style.animation = '';
    }, 1000);
}

function getBestMove() {
    // Simple AI with minimax algorithm
    let bestScore = -Infinity;
    let bestMove = -1;
    
    for (let i = 0; i < 9; i++) {
        if (gameState.board[i] === '') {
            gameState.board[i] = 'O';
            let score = minimax(gameState.board, 0, false);
            gameState.board[i] = '';
            
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    
    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    const winner = checkWinnerForMinimax(board);
    
    if (winner === 'O') return 1;
    if (winner === 'X') return -1;
    if (board.every(cell => cell !== '')) return 0;
    
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinnerForMinimax(board) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function resetGame() {
    gameState.board = Array(9).fill('');
    gameState.gameOver = false;
    
    const cells = document.querySelectorAll('.board-cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('player-x', 'player-o', 'winning');
    });
    
    document.getElementById('game-status').textContent = 'Your turn! Click a square to play.';
    document.getElementById('game-status').style.color = '#fbbf24';
}

function resetScore() {
    gameState.playerScore = 0;
    gameState.aiScore = 0;
    updateScoreDisplay();
    resetGame();
}

function updateScoreDisplay() {
    document.getElementById('player-score').textContent = gameState.playerScore;
    document.getElementById('ai-score').textContent = gameState.aiScore;
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

// Add hover effects to tech tags
function initTechTagInteractions() {
    const techTags = document.querySelectorAll('.tech-tags span');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
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
    initTechTagInteractions();
    initMetricCardAnimations();
    initRippleEffect();
    initSmoothScrolling();
    initProjectCardInteractions();
    initResponsiveOptimizations();
    initMobileNavigation();
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

// Add ripple effect to interactive elements
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.pipeline-stage, .metric-card, .agent-node, .dag-task, .tech-detail-card, .project-card');
    
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(96, 165, 250, 0.4);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: rippleEffect 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Smooth scrolling for all anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Enhanced project card interactions
function initProjectCardInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 60px rgba(96, 165, 250, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
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
