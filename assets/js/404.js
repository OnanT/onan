// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992 && navLinks.classList.contains('active') && 
        !e.target.closest('#navLinks') && !e.target.closest('#hamburger')) {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Search Functionality
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

searchButton.addEventListener('click', () => {
    if (searchInput.value.trim() !== '') {
        alert(`Searching for: ${searchInput.value}\n\nThis would initiate a site search in a real implementation.`);
        // In a real site, you would redirect to search results
        // window.location.href = `/search?q=${encodeURIComponent(searchInput.value)}`;
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// Spectrum Animation
const spectrum = document.querySelector('.spectrum');
let position = 0;

function animateSpectrum() {
    position = (position + 0.5) % 100;
    spectrum.style.backgroundPosition = `${position}% 0`;
    requestAnimationFrame(animateSpectrum);
}

animateSpectrum();