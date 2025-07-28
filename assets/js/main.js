// main.js – Site-wide behavior (used across all pages)

document.addEventListener('DOMContentLoaded', function () {
  // === Mobile Menu Toggle ===
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('show'); // Use class instead of inline styles
    });
  }

  // === Smooth Scrolling for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // === Page Zoom Transition for Internal Navigation ===
  document.body.classList.add("zoom-in");

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    const isInternalLink =
      href &&
      !href.startsWith('#') &&
      !link.hasAttribute('target') &&
      !href.startsWith('mailto') &&
      !href.startsWith('http');

    if (isInternalLink) {
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

  // === Live Chat Script (Smartsupp) ===
  const chatScript = document.createElement('script');
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
