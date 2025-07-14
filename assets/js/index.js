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
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
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

