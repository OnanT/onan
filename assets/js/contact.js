// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading spinner
    document.getElementById('submitText').style.display = 'none';
    document.getElementById('spinner').style.display = 'inline';
    
    // Form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // FormSubmit endpoint
    const endpoint = 'https://formsubmit.co/ajax/onanthomas@proton.me';
    
    // AJAX request
    fetch(endpoint, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success === "true") {
            // Show success message
            document.getElementById('thankYouModal').style.display = 'flex';
            
            // Reset form
            document.getElementById('contactForm').reset();
        } else {
            showMessage('Error: ' + data.message, 'error');
        }
    })
    .catch(error => {
        showMessage('Error: ' + error.message, 'error');
    })
    .finally(() => {
        // Hide spinner
        document.getElementById('submitText').style.display = 'inline';
        document.getElementById('spinner').style.display = 'none';
    });
});

function showMessage(text, type) {
    const messageEl = document.getElementById('formMessage');
    messageEl.textContent = text;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 3000);
}

function closeModal() {
    document.getElementById('thankYouModal').style.display = 'none';
}