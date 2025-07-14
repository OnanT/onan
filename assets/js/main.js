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