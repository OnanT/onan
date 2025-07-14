// GreyWolf Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
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
});