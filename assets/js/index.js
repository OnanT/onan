// Fixed index.js - Resolved JavaScript Issues and Conflicts

// Zoom transition for most pages
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("zoom-in");
});

document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    if (
        href &&
        !href.startsWith('#') &&
        !link.hasAttribute('target') &&
        !href.startsWith('mailto') &&
        !href.startsWith('http')
    ) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const url = this.href;
            document.body.classList.remove("zoom-in");
            document.body.style.transform = "scale(1.1)";
            document.body.style.opacity = "0";
            setTimeout(() => {
                window.location.href = url;
            }, 500);
        });
    }
});

// Animate progress bars on scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress-fill');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
});

// Add click effect
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(43, 167, 69, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.clientX - this.offsetLeft) + 'px';
        ripple.style.top = (e.clientY - this.offsetTop) + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Terminal typewriter effect
const terminalText = document.querySelector('.terminal-content');
if (terminalText) {
    const text = terminalText.innerHTML;
    terminalText.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            terminalText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 20);
        }
    };
    
    typeWriter();
}

// Terminal input
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

if (terminalInput && terminalOutput) {
    const printLine = (text) => {
        terminalOutput.innerHTML += `<div class="terminal-line">> ${text.replace(/\n/g, '<br>')}</div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    const commands = {
        help: () => printLine("Commands: help, whoami, portfolio, contact, kalinago, greywolf, blog, clear, ascii, cd, ls, sudo rm -rf /"),
        whoami: () => printLine("Visual Designer & Technology Specialist"),
        ls: () => printLine("portfolio  contact  blog  kalinago  greywolf"),
        ascii: () => printLine(`
            ⋆⋅☆⋅⋆   O N A N   ⋆⋅☆⋅⋆  
            ╰┈➤ ✧･ﾟ: *✧･ﾟ:*  *:･ﾟ✧*:･ﾟ✧
                `),
        clear: () => { terminalOutput.innerHTML = ""; },
        "cd greywolf": () => redirectWithLoading("greywolf.html", "Entering GreyWolf directory..."),
        "cd kalinago": () => redirectWithLoading("kalinago.html", "Accessing Kalinago project..."),
        "cd portfolio": () => redirectWithLoading("portfolio.html", "Entering portfolio..."),
        "cd contact": () => redirectWithLoading("contact.html", "Contacting..."),
        "cd blog": () => redirectWithLoading("blog.html", "Loading blog posts..."),
        portfolio: () => redirectWithLoading("portfolio.html", "Opening portfolio..."),
        contact: () => redirectWithLoading("contact.html", "Redirecting to contact..."),
        blog: () => redirectWithLoading("blog.html", "Opening blog..."),
        greywolf: () => redirectWithLoading("greywolf.html", "Launching GreyWolf..."),
        kalinago: () => redirectWithLoading("kalinago.html", "Loading Kalinago page..."),
        "sudo rm -rf /": () => triggerMeltdown()
    };

    const redirectWithLoading = (url, message) => {
        printLine(message);
        printLine("Loading...");
        setTimeout(() => {
            window.location.href = url;
        }, 1200);
    };

    const triggerMeltdown = () => {
        printLine("You really shouldn't have done that...");
        let meltdown = 0;
        const interval = setInterval(() => {
            terminalOutput.innerHTML += `<div class="terminal-line" style="color:red;">!!! SYSTEM FAILURE !!!</div>`;
            meltdown++;
            if (meltdown > 10) {
                clearInterval(interval);
                printLine("Just kidding. Stay safe out there, hacker 😎");
            }
        }, 100);
    };

    terminalInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const input = this.value.trim().toLowerCase();
            terminalOutput.innerHTML += `<div class="terminal-line">onan@portfolio:~$ ${input}</div>`;
            
            const handler = commands[input];
            if (handler) {
                handler();
            } else {
                printLine(`Command not found: ${input}`);
            }

            this.value = '';
        }
    });
}

// Project Section - EngagingSmoothAutoScroll Class
class EngagingSmoothAutoScroll {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            console.warn('AutoScroll container not found:', containerSelector);
            return;
        }

        this.scrollElement = this.container.querySelector('.project-scroll');
        this.controlsElement = this.container.querySelector('.scroll-controls');
        this.statusElement = document.getElementById('scroll-status');
        this.progressDots = this.container.querySelectorAll('.progress-dot');
        
        if (!this.scrollElement) {
            console.warn('Scroll element not found in container');
            return;
        }
        
        this.state = {
            isPlaying: false,
            isPaused: false,
            baseSpeed: 35,
            currentSpeed: 35,
            direction: 'left',
            userInteracting: false,
            cycleCount: 0,
            totalCycles: 5,
            contextualSpeed: false
        };
        
        this.init();
    }
    
    init() {
        this.duplicateContent();
        this.setupIntersectionObserver();
        this.setupEventListeners();
        this.setupProgressiveStart();
        this.updateStatus('🚀 Progressive starting...');
    }
    
    duplicateContent() {
        const cards = this.scrollElement.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            const clone = card.cloneNode(true);
            clone.style.animationDelay = `${index * 0.1}s`;
            clone.classList.add('loading');
            this.scrollElement.appendChild(clone);
        });
    }
    
    setupProgressiveStart() {
        this.scrollElement.style.animation = `scroll-progressive 60s ease-out infinite`;
        this.state.isPlaying = true;
        
        setTimeout(() => {
            if (this.state.isPlaying) {
                this.scrollElement.style.animation = `scroll-left-smooth ${this.state.currentSpeed}s linear infinite`;
                this.updateStatus('🎯 Smooth scrolling');
                this.setupCycleListener();
            }
        }, 4000);
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    if (!this.state.isPlaying) {
                        this.start();
                    }
                } else {
                    this.pause();
                }
            });
        }, { threshold: [0, 0.3, 0.7, 1] });
        
        observer.observe(this.container);
    }
    
    setupCycleListener() {
        let animationCount = 0;
        this.scrollElement.addEventListener('animationiteration', () => {
            animationCount++;
            this.state.cycleCount = animationCount;
            this.updateProgressDots();
            this.handleCycleComplete();
        });
    }
    
    handleCycleComplete() {
        const cycle = this.state.cycleCount;
        
        if (cycle % 3 === 0 && cycle > 0) {
            this.reverseDirection();
            this.updateStatus(`🔄 Direction reversed (Cycle ${cycle})`);
        }
        
        if (cycle % 5 === 0 && cycle > 0) {
            this.briefPauseAndSpeedUp();
        }
        
        if (cycle % 7 === 0 && cycle > 0) {
            this.smoothSpeedTransition();
        }
    }
    
    reverseDirection() {
        this.state.direction = this.state.direction === 'left' ? 'right' : 'left';
        const newAnimation = `scroll-${this.state.direction}-smooth ${this.state.currentSpeed}s linear infinite`;
        
        this.scrollElement.style.transition = 'animation 0.8s ease';
        this.scrollElement.style.animation = newAnimation;
        
        setTimeout(() => {
            this.scrollElement.style.transition = '';
        }, 800);
        
        this.updateDirectionButton();
    }
    
    briefPauseAndSpeedUp() {
        this.updateStatus('⏸️ Brief pause...');
        this.scrollElement.style.animationPlayState = 'paused';
        
        setTimeout(() => {
            const fastSpeed = Math.max(15, this.state.currentSpeed - 15);
            this.changeSpeed(fastSpeed, true);
            this.updateStatus('⚡ Speed boost!');
            
            setTimeout(() => {
                this.changeSpeed(this.state.baseSpeed, true);
                this.updateStatus('🎯 Back to normal flow');
            }, 8000);
        }, 1500);
    }
    
    smoothSpeedTransition() {
        const speeds = [25, 40, 30, 35];
        let currentIndex = 0;
        
        const transitionSpeed = () => {
            if (currentIndex < speeds.length) {
                this.changeSpeed(speeds[currentIndex], true);
                this.updateStatus(`🌊 Speed: ${speeds[currentIndex]}s`);
                currentIndex++;
                setTimeout(transitionSpeed, 3000);
            }
        };
        
        transitionSpeed();
    }
    
    setupEventListeners() {
        this.container.addEventListener('mouseenter', () => {
            this.state.userInteracting = true;
            this.enableContextualSpeed();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.state.userInteracting = false;
            this.disableContextualSpeed();
        });
        
        if (this.controlsElement) {
            this.controlsElement.addEventListener('click', (e) => {
                const button = e.target.closest('.scroll-btn');
                if (!button) return;
                
                this.addButtonFeedback(button);
                
                if (button.classList.contains('pause-btn')) {
                    this.toggle();
                    this.updatePauseButton(button);
                }
                
                if (button.classList.contains('speed-btn')) {
                    const speed = parseInt(button.dataset.speed);
                    this.changeSpeed(speed, true);
                    this.highlightActiveSpeed(button);
                    this.updateStatus(`🎯 Speed: ${speed}s`);
                }
                
                if (button.classList.contains('direction-btn')) {
                    this.reverseDirection();
                }
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (!this.isInViewport()) return;
            
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.toggle();
                    break;
                case 'ArrowLeft':
                    this.state.direction = 'right';
                    this.reverseDirection();
                    break;
                case 'ArrowRight':
                    this.state.direction = 'left';
                    this.reverseDirection();
                    break;
            }
        });
    }
    
    enableContextualSpeed() {
        if (!this.state.contextualSpeed) {
            const slowSpeed = this.state.currentSpeed * 1.8;
            this.changeSpeed(slowSpeed, true);
            this.state.contextualSpeed = true;
            this.updateStatus('🐌 Contextual slow mode');
        }
    }
    
    disableContextualSpeed() {
        if (this.state.contextualSpeed) {
            this.changeSpeed(this.state.baseSpeed, true);
            this.state.contextualSpeed = false;
            this.updateStatus('🎯 Normal speed resumed');
        }
    }
    
    changeSpeed(newSpeed, smooth = false) {
        this.state.currentSpeed = newSpeed;
        
        if (smooth) {
            this.scrollElement.style.transition = 'animation-duration 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                this.scrollElement.style.transition = '';
            }, 800);
        }
        
        if (this.state.isPlaying && !this.state.isPaused) {
            this.scrollElement.style.animation = `scroll-${this.state.direction}-smooth ${newSpeed}s linear infinite`;
        }
    }
    
    start() {
        this.state.isPlaying = true;
        this.state.isPaused = false;
        this.scrollElement.style.animation = `scroll-${this.state.direction}-smooth ${this.state.currentSpeed}s linear infinite`;
        this.updateStatus('🎯 Smooth scrolling');
    }
    
    pause() {
        if (!this.state.isPlaying) return;
        this.state.isPaused = true;
        this.scrollElement.style.animationPlayState = 'paused';
        this.updateStatus('⏸️ Paused');
    }
    
    resume() {
        if (!this.state.isPaused) return;
        this.state.isPaused = false;
        this.scrollElement.style.animationPlayState = 'running';
        this.updateStatus('▶️ Resumed');
    }
    
    toggle() {
        this.state.isPaused ? this.resume() : this.pause();
    }
    
    updateStatus(message) {
        if (this.statusElement) {
            this.statusElement.textContent = message;
            this.statusElement.className = `scroll-status ${this.state.isPlaying && !this.state.isPaused ? 'playing' : ''}`;
        }
    }
    
    updateProgressDots() {
        if (this.progressDots.length > 0) {
            const activeIndex = (this.state.cycleCount - 1) % this.progressDots.length;
            this.progressDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }
    }
    
    addButtonFeedback(button) {
        button.style.transform = 'scale(0.9) rotate(-5deg)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
    
    updatePauseButton(button) {
        button.textContent = this.state.isPaused ? '▶️' : '⏸️';
        button.title = this.state.isPaused ? 'Play' : 'Pause';
    }
    
    updateDirectionButton() {
        if (this.controlsElement) {
            const directionBtn = this.controlsElement.querySelector('.direction-btn');
            if (directionBtn) {
                directionBtn.style.transform = 'rotate(180deg)';
                setTimeout(() => {
                    directionBtn.style.transform = '';
                }, 300);
            }
        }
    }
    
    highlightActiveSpeed(activeButton) {
        if (this.controlsElement) {
            this.controlsElement.querySelectorAll('.speed-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            activeButton.classList.add('active');
        }
    }
    
    isInViewport() {
        const rect = this.container.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
}

// GREYWOLF Image Rotator
function setupGreyWolfImageRotator() {
    const images = [
        "assets/images/gallery/greywolf5.png",
        "assets/images/gallery/greywolf6.png",
        "assets/images/gallery/screenshot.png",
        "assets/images/gallery/greywolf6.jpg",
        "assets/images/gallery/greywolf4.jpg",
        "assets/images/gallery/greywolf7.png",
    ];

    let currentImage = 0;
    const imageElement = document.getElementById("greywolf-rotator");

    if (imageElement) {
        setInterval(() => {
            currentImage = (currentImage + 1) % images.length;
            imageElement.src = images[currentImage];
        }, 3500);
    }
}

// GREYWOLF CLI Animation
function setupGreyWolfCLI() {
    const cliBox = document.querySelector("#cli-output");
    if (!cliBox) return;

    const entries = [
        "➜  greywolf ./greywolf scan -d target.com",
        "🔥🔥🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🔥🔥",
        "   ===============================",
        "        🐺 GREY WOLF HUNT 🐺",
        "  =================================",
        " // 🌙 The Silent Hunters 🌙 //",
        "🔥🔥🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🔥🔥",
        "[+] Starting reconnaissance...",
        "[*] Running nuclei templates...",
        "[*] Running ffuf with wordlist: api.txt",
        "[+] Found: https://target.com/api/v1/login",
        "[+] Found: https://target.com/api/v1/reset",
        "[*] Checking CORS policy...",
        "[+] Potential misconfig: wildcard origin allowed",
        "[*] Done. Results saved to /output/target-com.json"
    ];

    let i = 0;

    const observer = new IntersectionObserver((items) => {
        if (items[0].isIntersecting) {
            typeIt();
            observer.disconnect();
        }
    });

    observer.observe(cliBox);

    function typeIt() {
        if (i < entries.length) {
            cliBox.innerHTML += entries[i] + "\n";
            i++;
            setTimeout(typeIt, 1200);
        }
    }
}

// Particle effect on hover
document.addEventListener('mousemove', (e) => {
    if (e.target.closest('.project-card')) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-green);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${x}px;
        top: ${y}px;
        opacity: 0.8;
        animation: particleFloat 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1500);
}

// Add particle animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-30px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize AutoScroll
    const autoScroll = new EngagingSmoothAutoScroll('.project-scroll-container');
    
    // Initialize GreyWolf components
    setupGreyWolfCLI();
    setupGreyWolfImageRotator();
    
    // Add animation delays to project cards
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }, 1000);
});