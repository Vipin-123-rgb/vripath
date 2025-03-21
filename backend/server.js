const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// ChatGPT API endpoint
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Yeh daal do

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }],
                max_tokens: 150
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);
        const botReply = data.choices[0].message.content;

        res.json({ response: botReply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ response: 'Bhai, kuch gadbad ho gaya!' });
    }
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
