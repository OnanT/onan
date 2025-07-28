// index.js – Homepage-specific logic

// === Zoom-in Animation on Load ===
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("zoom-in");
});

// === Terminal Interaction ===
(function setupTerminal() {
  const input = document.getElementById('terminalInput');
  const output = document.getElementById('terminalOutput');

  if (!input || !output) return;
    document.getElementById('interactiveTerminal').addEventListener('click', () => {
        input.focus();
    });
    const printLine = (text, className = '') => {
        const div = document.createElement('div');
        div.className = `terminal-line ${className}`;
        div.innerHTML = text.replace(/\n/g, '<br>');
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
    };

  const commands = {
    help: () => printLine("Commands: help, whoami, portfolio, contact, kalinago, greywolf, blog, clear, ascii, cd, ls, sudo rm -rf /"),
    whoami: () => printLine("Visual Designer & Technology Specialist"),
    ls: () => printLine("portfolio  contact  blog  kalinago  greywolf"),
    ascii: () => printLine("⋆⋅☆⋅⋆   O N A N   ⋆⋅☆⋅⋆<br>╰┈➤ ✧･ﾟ: *✧･ﾟ:*  *:･ﾟ✧*:･ﾟ✧"),
    clear: () => { output.innerHTML = ""; },
    "cd greywolf": () => redirect("greywolf.html", "Entering GreyWolf directory..."),
    "cd kalinago": () => redirect("kalinago.html", "Accessing Kalinago project..."),
    "cd portfolio": () => redirect("portfolio.html", "Entering portfolio..."),
    "cd contact": () => redirect("contact.html", "Contacting..."),
    "cd blog": () => redirect("blog.html", "Loading blog posts..."),
    portfolio: () => redirect("portfolio.html", "Opening portfolio..."),
    contact: () => redirect("contact.html", "Redirecting to contact..."),
    blog: () => redirect("blog.html", "Opening blog..."),
    greywolf: () => redirect("greywolf.html", "Launching GreyWolf..."),
    kalinago: () => redirect("kalinago.html", "Loading Kalinago page..."),
    "sudo rm -rf /": () => meltdown()
  };

  const redirect = (url, msg) => {
    printLine(msg);
    printLine("Loading...");
    setTimeout(() => window.location.href = url, 1200);
  };
// MELTDOWN
const meltdown = () => {
    printLine("You really shouldn't have done that...", 'error-text');
    let count = 0;
    const interval = setInterval(() => {
        printLine("!!! SYSTEM FAILURE !!!", 'error-text');
        count++;
        if (count > 8) {
            clearInterval(interval);
            setTimeout(() => {
                printLine("Just kidding. Stay safe out there, hacker 😎", 'success-text');
            }, 500);
        }
    }, 150);
};

// Command history
let commandHistory = [];
let historyIndex = -1;

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (cmd) {
            commandHistory.unshift(cmd);
            if (commandHistory.length > 50) commandHistory.pop();
        }
        historyIndex = -1;
        
        // Display the command
        printLine(`onan@portfolio:~$ ${cmd}`, 'command-line');
        
        // Execute command
        const lowerCmd = cmd.toLowerCase();
        if (commands[lowerCmd]) {
            commands[lowerCmd]();
        } else if (cmd) {
            printLine(`Command not found: ${cmd}`, 'error-text');
            printLine("Type 'help' to see available commands");
        }
        
        input.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex] || '';
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex] || '';
        } else if (historyIndex === 0) {
            historyIndex = -1;
            input.value = '';
        }
    }
});
            // Initial welcome
            setTimeout(() => {
                printLine("System initialized. Ready for input.", 'success-text');
            }, 500);
})();

// === Project Auto Scroll Setup ===
// Enhanced Project Section - EngagingSmoothAutoScroll Class
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
        this.projectCards = this.container.querySelectorAll('.project-card');
        
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
            contextualSpeed: false,
            currentProjectIndex: 0
        };
        
        // Add CSS animations if they don't exist
        this.injectCSS();
        this.init();
    }
    
    injectCSS() {
        if (!document.getElementById('autoscroll-animations')) {
            const style = document.createElement('style');
            style.id = 'autoscroll-animations';
            style.textContent = `
                @keyframes scroll-left-smooth {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                @keyframes scroll-right-smooth {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                
                @keyframes scroll-progressive {
                    0% { transform: translateX(0); opacity: 0.7; }
                    10% { opacity: 1; }
                    25% { transform: translateX(-12.5%); }
                    50% { transform: translateX(-25%); }
                    75% { transform: translateX(-37.5%); }
                    100% { transform: translateX(-50%); }
                }
                
                .project-card.loading {
                    opacity: 0.8;
                    transform: scale(0.98);
                    transition: all 0.3s ease;
                }
                
                .scroll-status.playing {
                    color: #22c55e;
                    animation: pulse 2s ease-in-out infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                
                .progress-dot {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .progress-dot.active {
                    transform: scale(1.2);
                    box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    init() {
        this.duplicateContent();
        this.setupEventListeners();
        this.setupProgressiveStart();
        this.updateStatus('🚀 Progressive starting...');
        this.trackProjectVisibility();
        // Setup intersection observer after starting
        setTimeout(() => {
            this.setupIntersectionObserver();
        }, 1000);
    }
    
    duplicateContent() {
        const cards = Array.from(this.projectCards);
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
        }, 3000);
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Only pause when completely out of view, don't interfere with auto-start
                if (!entry.isIntersecting && this.state.isPlaying) {
                    this.pause();
                } else if (entry.isIntersecting && this.state.isPaused && this.state.isPlaying) {
                    this.resume();
                }
            });
        }, { threshold: [0, 0.1] }); // Lower threshold for better UX
        
        observer.observe(this.container);
    }
    
    // NEW: Track which project is currently visible
    trackProjectVisibility() {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const projectIndex = Array.from(this.projectCards).indexOf(entry.target);
                    if (projectIndex !== -1 && projectIndex !== this.state.currentProjectIndex) {
                        this.state.currentProjectIndex = projectIndex;
                        this.updateProgressDotsAccurate();
                        this.updateStatusWithProject();
                    }
                }
            });
        }, { 
            root: this.scrollElement,
            threshold: 0.5 
        });
        
        this.projectCards.forEach(card => {
            projectObserver.observe(card);
        });
    }
    
    setupCycleListener() {
        let animationCount = 0;
        this.scrollElement.addEventListener('animationiteration', () => {
            animationCount++;
            this.state.cycleCount = animationCount;
            this.handleCycleComplete();
        });
    }
    
    handleCycleComplete() {
        const cycle = this.state.cycleCount;
        
        // Direction reversal every 3 cycles
        if (cycle % 3 === 0 && cycle > 0) {
            this.reverseDirection();
            this.updateStatus(`🔄 Direction reversed (Cycle ${cycle})`);
        }
        
        // Speed boost every 5 cycles
        if (cycle % 5 === 0 && cycle > 0) {
            this.briefPauseAndSpeedUp();
        }
        
        // Smooth speed transitions every 7 cycles
        if (cycle % 7 === 0 && cycle > 0) {
            this.smoothSpeedTransition();
        }
        
        // NEW: Brief spotlight effect every 4 cycles
        if (cycle % 4 === 0 && cycle > 0) {
            this.highlightCurrentProject();
        }
    }
    
    // NEW: Highlight current project
    highlightCurrentProject() {
        const currentCard = this.projectCards[this.state.currentProjectIndex];
        if (currentCard) {
            currentCard.style.transform = 'scale(1.05)';
            currentCard.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            currentCard.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                currentCard.style.transform = '';
                currentCard.style.boxShadow = '';
            }, 2000);
            
            this.updateStatus(`✨ Highlighting: ${currentCard.querySelector('h3')?.textContent || 'Project'}`);
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
                this.updateStatus(`🌊 Speed transition: ${speeds[currentIndex]}s`);
                currentIndex++;
                setTimeout(transitionSpeed, 3000);
            }
        };
        
        transitionSpeed();
    }
    
    setupEventListeners() {
        // Mouse interaction
        this.container.addEventListener('mouseenter', () => {
            this.state.userInteracting = true;
            this.enableContextualSpeed();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.state.userInteracting = false;
            this.disableContextualSpeed();
        });
        
        // Control buttons
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
        
        // NEW: Progress dot navigation
        this.progressDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.jumpToProject(index);
            });
            dot.style.cursor = 'pointer';
            dot.title = `Jump to project ${index + 1}`;
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.isInViewport()) return;
            
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.toggle();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.jumpToProject(Math.max(0, this.state.currentProjectIndex - 1));
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.jumpToProject(Math.min(this.projectCards.length - 1, this.state.currentProjectIndex + 1));
                    break;
                case 'r':
                case 'R':
                    this.reverseDirection();
                    break;
            }
        });
    }
    
    // NEW: Jump to specific project
    jumpToProject(index) {
        if (index >= 0 && index < this.projectCards.length) {
            this.state.currentProjectIndex = index;
            const targetCard = this.projectCards[index];
            
            // Pause animation temporarily
            const wasPlaying = !this.state.isPaused;
            this.pause();
            
            // Scroll to target
            targetCard.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'center' 
            });
            
            // Resume after scroll
            setTimeout(() => {
                if (wasPlaying) this.resume();
                this.updateProgressDotsAccurate();
                this.updateStatusWithProject();
            }, 1000);
        }
    }
    
    enableContextualSpeed() {
        if (!this.state.contextualSpeed) {
            const slowSpeed = Math.min(60, this.state.currentSpeed * 1.8);
            this.changeSpeed(slowSpeed, true);
            this.state.contextualSpeed = true;
            this.updateStatus('🐌 Contextual slow mode');
        }
    }
    
    disableContextualSpeed() {
        if (this.state.contextualSpeed) {
            this.changeSpeed(this.state.baseSpeed, true);
            this.state.contextualSpeed = false;
            this.updateStatusWithProject();
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
        this.updateStatusWithProject();
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
        this.updateStatusWithProject();
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
    
    // NEW: Update status with current project info
    updateStatusWithProject() {
        const currentCard = this.projectCards[this.state.currentProjectIndex];
        const projectName = currentCard?.querySelector('h3')?.textContent || 'Project';
        const status = this.state.isPaused ? '⏸️ Paused' : '▶️ Playing';
        const direction = this.state.direction === 'left' ? '→' : '←';
        
        this.updateStatus(`${status} ${direction} ${projectName} (${this.state.currentProjectIndex + 1}/${this.projectCards.length})`);
    }
    
    // IMPROVED: More accurate progress dots based on actual visibility
    updateProgressDotsAccurate() {
        this.progressDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.state.currentProjectIndex);
        });
    }
    
    // Keeping your original method as fallback
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
        button.style.transition = 'transform 0.15s ease';
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
                directionBtn.style.transition = 'transform 0.3s ease';
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
    
    // NEW: Public method to get current state
    getState() {
        return { ...this.state };
    }
    
    // NEW: Public method to set base speed
    setBaseSpeed(speed) {
        this.state.baseSpeed = speed;
        if (!this.state.contextualSpeed) {
            this.changeSpeed(speed, true);
        }
    }
}

// GREYWOLF Image Rotator (keeping your existing implementation)
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const projectScroller = new EngagingSmoothAutoScroll('.projects');
    setupGreyWolfImageRotator();
    
    // Optional: Expose to global scope for debugging
    window.projectScroller = projectScroller;
});
// === GreyWolf CLI Animation ===
(function setupGreyWolfCLI() {
  const cliBox = document.querySelector("#cli-output");
  if (!cliBox) return;

  const entries = [
    "➜  greywolf ./greywolf scan -d target.com",
    "🔥🔥🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🔥🔥",
    "        🐺 GREY WOLF HUNT 🐺",
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

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      typeCLI();
      observer.disconnect();
    }
  });

  observer.observe(cliBox);

  const typeCLI = () => {
    if (i < entries.length) {
      cliBox.innerHTML += entries[i] + "\n";
      i++;
      setTimeout(typeCLI, 1200);
    }
  };
})();

// === GreyWolf Image Rotator ===
(function setupGreyWolfImageRotator() {
  const images = [
    "assets/images/gallery/greywolf5.png",
    "assets/images/gallery/greywolf6.png",
    "assets/images/gallery/screenshot.png",
    "assets/images/gallery/greywolf6.jpg",
    "assets/images/gallery/greywolf4.jpg",
    "assets/images/gallery/greywolf7.png"
  ];

  let current = 0;
  const el = document.getElementById("greywolf-rotator");

  if (el) {
    setInterval(() => {
      current = (current + 1) % images.length;
      el.src = images[current];
    }, 3500);
  }
})();

// === Hover Particle Effect ===
(function setupParticles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0% { transform: translateY(0) scale(1); opacity: 0.8; }
      100% { transform: translateY(-30px) scale(0); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener('mousemove', (e) => {
    if (e.target.closest('.project-card')) {
      const p = document.createElement('div');
      p.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-green);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        opacity: 0.8;
        animation: particleFloat 1.5s ease-out forwards;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1500);
    }
  });
})();
