from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)

client = OpenAI(
    api_key="YOUR_XAI_API_KEY",  # Yaha xAI ki key daal
    base_url="https://api.x.ai/v1"
)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')

    try:
        response = client.chat.completions.create(
            model="grok-beta",
            messages=[{"role": "user", "content": user_message}],
            max_tokens=150
        )
        bot_reply = response.choices[0].message.content
        return jsonify({"response": bot_reply})
    except Exception as e:
        return jsonify({"response": f"Bhai, kuch gadbad ho gaya! ({str(e)})"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
