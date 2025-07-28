        class LogoBanner {
            constructor() {
                this.logoTrack = document.getElementById('logoTrack');
                this.speedButtons = document.querySelectorAll('.speed-btn[data-speed]');
                this.pauseButton = document.getElementById('pauseBtn');
                this.currentSpeed = 25;
                this.isPaused = false;
                
                this.init();
            }
            
            init() {
                this.setupEventListeners();
                this.setAnimationSpeed(this.currentSpeed);
            }
            
            setupEventListeners() {
                // Speed control buttons
                this.speedButtons.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const speed = parseInt(e.target.dataset.speed);
                        this.setAnimationSpeed(speed);
                        this.updateActiveButton(e.target);
                    });
                });
                
                // Pause/resume button
                this.pauseButton.addEventListener('click', () => {
                    this.togglePause();
                });
                
                // Keyboard controls
                document.addEventListener('keydown', (e) => {
                    switch(e.key) {
                        case ' ':
                            e.preventDefault();
                            this.togglePause();
                            break;
                        case '1':
                            this.setAnimationSpeed(15);
                            this.updateActiveButton(document.querySelector('[data-speed="15"]'));
                            break;
                        case '2':
                            this.setAnimationSpeed(25);
                            this.updateActiveButton(document.querySelector('[data-speed="25"]'));
                            break;
                        case '3':
                            this.setAnimationSpeed(40);
                            this.updateActiveButton(document.querySelector('[data-speed="40"]'));
                            break;
                    }
                });
            }
            
            setAnimationSpeed(speed) {
                this.currentSpeed = speed;
                this.logoTrack.style.animationDuration = `${speed}s`;
                
                if (!this.isPaused) {
                    this.logoTrack.style.animationPlayState = 'running';
                }
            }
            
            togglePause() {
                this.isPaused = !this.isPaused;
                
                if (this.isPaused) {
                    this.logoTrack.style.animationPlayState = 'paused';
                    this.pauseButton.textContent = '▶️ Play';
                    this.pauseButton.classList.add('active');
                } else {
                    this.logoTrack.style.animationPlayState = 'running';
                    this.pauseButton.textContent = '⏸️ Pause';
                    this.pauseButton.classList.remove('active');
                }
            }
            
            updateActiveButton(activeBtn) {
                // Remove active class from all speed buttons
                this.speedButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                if (activeBtn && activeBtn.dataset.speed) {
                    activeBtn.classList.add('active');
                }
            }
        }
        
        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new LogoBanner();
        });
        
        // Add some interactive effects
        document.addEventListener('DOMContentLoaded', () => {
            const logoItems = document.querySelectorAll('.logo-item');
            
            logoItems.forEach((item, index) => {
                item.addEventListener('mouseenter', () => {
                    // Slight pause on hover for better UX
                    item.closest('.logo-track').style.animationPlayState = 'paused';
                });
                
                item.addEventListener('mouseleave', () => {
                    // Resume animation
                    setTimeout(() => {
                        item.closest('.logo-track').style.animationPlayState = 'running';
                    }, 200);
                });
            });
        });