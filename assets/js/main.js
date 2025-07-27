// main.js - Shared JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Page transition effect
  document.body.classList.add("zoom-in");
  
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !link.hasAttribute('target') && 
        !href.startsWith('mailto') && !href.startsWith('http')) {
      link.addEventListener('click', function(e) {
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
});

    // Smartsupp Live Chat script
// main.js - Alternative approach
document.addEventListener('DOMContentLoaded', function() {
    // Create and inject chat script
    var chatScript = document.createElement('script');
    chatScript.type = 'text/javascript';
    chatScript.innerHTML = `
        var _smartsupp = _smartsupp || {};
        _smartsupp.key = '97a7e1e509fd751e6deb295735119e2631f29bdd';
        window.smartsupp||(function(d) {
            var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
            s=d.getElementsByTagName('script')[0];c=d.createElement('script');
            c.type='text/javascript';c.charset='utf-8';c.async=true;
            c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
        })(document);
    `;
    document.head.appendChild(chatScript);
});

        function matrixEffect(e) {
            const button = e.target;
            const originalText = button.textContent;
            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            let iterations = 0;
            
            const interval = setInterval(() => {
                button.textContent = originalText.split('').map((char, index) => {
                    if (index < iterations) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
                
                if (iterations >= originalText.length) clearInterval(interval);
                iterations += 1/3;
            }, 30);
            
            addRipple(e);
        }