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
    initTechBackground();
});

// Tech Background Particles
function initTechBackground() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'tech-particles';
    document.body.appendChild(particlesContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'tech-particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        // Random color variation
        const colors = [
            'rgba(96, 165, 250, 0.6)',
            'rgba(168, 85, 247, 0.6)', 
            'rgba(34, 197, 94, 0.4)',
            'rgba(251, 191, 36, 0.5)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createParticle(), i * 1000);
    }
    
    // Continuously create new particles
    setInterval(createParticle, 2000);
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
