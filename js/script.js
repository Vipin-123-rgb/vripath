console.log("Portfolio Loaded!");

// Project hover effects (if used in projects.html)
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

// Contact form submission and toggle
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.contact form');
    const contactIcon = document.getElementById("contactIcon");
    const contactSection = document.getElementById("contact");

    // Contact toggle functionality
    if (contactIcon && contactSection) {
        contactIcon.addEventListener("click", function() {
            if (contactSection.style.display === "none" || contactSection.style.display === "") {
                contactSection.style.display = "block";
                contactIcon.style.display = "none"; // Hide icon when form opens
            } else {
                contactSection.style.display = "none";
                contactIcon.style.display = "block"; // Show icon when form closes
            }
        });
    }

    // Form submission
    if (contactForm) {
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
                    contactSection.style.display = "none"; // Hide form after submission
                    contactIcon.style.display = "block"; // Show icon again
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

// Chatbot toggle and functionality
document.addEventListener('DOMContentLoaded', function () {
    const chatbotIcon = document.getElementById("chatbotIcon");
    const chatContainer = document.getElementById("chatContainer");

    if (chatbotIcon && chatContainer) {
        chatbotIcon.addEventListener("click", function() {
            if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
                chatContainer.style.display = "block";
                chatbotIcon.style.display = "none"; // Hide icon when chat opens
            } else {
                chatContainer.style.display = "none";
                chatbotIcon.style.display = "block"; // Show icon when chat closes
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

// Send Message Function for Chatbot
function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (!message) return;

    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<div class="message user">You: ${message}</div>`;
    input.value = "";

    fetch("https://chatbot-backend-ex31.onrender.com/chat", {
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
