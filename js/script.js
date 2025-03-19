console.log("Portfolio Loaded!");

// Project hover effects
document.querySelectorAll('.project').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.backgroundColor = '#f0f0f0';
    });
    item.addEventListener('mouseout', () => {
        item.style.backgroundColor = 'transparent';
    });
});

// Fetch navigation
fetch('nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
    });

// Contact form submission
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.contact form');

    if (contactForm) {  // Check if form exists to avoid errors on other pages
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(this);
            const submitButton = this.querySelector('button');
            submitButton.textContent = 'Sending...';

            fetch('https://formspree.io/f/xqapeezp', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                submitButton.textContent = 'Send Message';
                if (response.ok) {
                    alert('Message sent successfully! Thanks for reaching out.');
                    contactForm.reset();
                } else {
                    alert('Oops! Something went wrong. Please try again.');
                }
            })
            .catch(error => {
                submitButton.textContent = 'Send Message';
                console.error('Error:', error);
                alert('There was a problem sending your message. Please try later.');
            });
        });
    }
});

// Chatbot toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const chatbotIcon = document.getElementById("chatbotIcon");
    const chatContainer = document.getElementById("chatContainer");

    if (chatbotIcon && chatContainer) {  // Check if elements exist
        chatbotIcon.addEventListener("click", function() {
            if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
                chatContainer.style.display = "block";
            } else {
                chatContainer.style.display = "none";
            }
        });

        // Enter key se send karne ke liye
        document.getElementById("userInput").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }
});

function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (!message) return;

    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<div class="message user">You: ${message}</div>`;
    input.value = "";

    fetch("https://YOUR_BACKEND_URL/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        chatBox.innerHTML += `<div class="message bot">Chatbot: ${data.response}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        chatBox.innerHTML += `<div class="message bot">Chatbot: Bhai, kuch gadbad ho gaya!</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}
