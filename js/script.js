console.log("Portfolio Loaded!");


document.querySelectorAll('.project').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.backgroundColor = '#f0f0f0';
    });
    item.addEventListener('mouseout', () => {
        item.style.backgroundColor = 'transparent';
    });
});


fetch('nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
    });


document.addEventListener('DOMContentLoaded', function () {
    // Form ko select karo
    const contactForm = document.querySelector('.contact form');

    // Submit event listener add karo
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Default form submission rok do (page reload nahi hoga)

        // Form data collect karo
        const formData = new FormData(this);

        
        fetch('https://formspree.io/f/xqapeezp', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json' 
            }
        })
        .then(response => {
            if (response.ok) {
                
                alert('Message sent successfully! Thanks for reaching out.');
                contactForm.reset(); // 
            } else {
              
                alert('Oops! Something went wrong. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem sending your message. Please try later.');
        });
    });
});



const submitButton = contactForm.querySelector('button');
submitButton.textContent = 'Sending...';
fetch('https://formspree.io/f/xqapeezp', { ... })
    .then(response => {
        submitButton.textContent = 'Send Message'; 
        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        }
    });
