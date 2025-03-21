const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

const XAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${XAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'grok-beta',
                messages: [{ role: 'user', content: userMessage }],
                max_tokens: 150
            })
        });

        const data = await response.json();
        console.log('xAI API Response:', data); // Debug ke liye
        if (!response.ok) throw new Error(data.error?.message || 'Unknown error');
        const botReply = data.choices[0].message.content;

        res.json({ response: botReply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ response: `Bhai, kuch gadbad ho gaya! (${error.message})` });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
