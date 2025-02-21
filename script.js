// Replace 'YOUR_API_KEY' with your actual Gemini API key
const API_KEY = '*********';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

function addMessage(message, isUser) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, true);
    userInput.value = '';

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            const botResponse = data.candidates[0].content.parts[0].text;
            addMessage(botResponse, false);
        } else {
            addMessage("Sorry, I couldn't process that request.", false);
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage("Sorry, there was an error processing your request.", false);
    }
}

// Allow sending message with Enter key
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 