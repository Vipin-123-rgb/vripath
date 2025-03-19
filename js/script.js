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

// Enter key se bhi send karne ke liye
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
