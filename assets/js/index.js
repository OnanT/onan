// Index Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Terminal commands
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

    // Initialize terminal functionality
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');

    if (terminalInput && terminalOutput) {
        terminalInput.addEventListener('keydown', function(e) {
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

    // Helper functions
    function printLine(text) {
        const messageEl = document.createElement('div');
        messageEl.className = 'terminal-line';
        messageEl.textContent = text;
        terminalOutput.appendChild(messageEl);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function redirectWithLoading(url, message) {
        printLine(message);
        printLine("Loading...");
        setTimeout(() => {
            window.location.href = url;
        }, 1200);
    }

    function triggerMeltdown() {
        printLine("You really shouldn't have done that...");
        let meltdown = 0;
        const interval = setInterval(() => {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.style.color = 'red';
            line.textContent = "!!! SYSTEM FAILURE !!!";
            terminalOutput.appendChild(line);
            meltdown++;
            if (meltdown > 10) {
                clearInterval(interval);
                printLine("Just kidding. Stay safe out there, hacker 😎");
            }
        }, 100);
    }
});