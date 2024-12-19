// script.js

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    const chatbox = document.getElementById('chatbox');

    if (message) {
        // Create user message element
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = message;
        chatbox.appendChild(userMessage);

        // Clear input
        input.value = '';

        // Show user message with animation
        setTimeout(() => {
            userMessage.classList.add('show');
        }, 10);

        // Send message to the server
        fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(data => {
            // Create bot message element
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot-message';
            botMessage.textContent = data.reply; // Use the response from the server
            chatbox.appendChild(botMessage);

            // Show bot message with animation
            setTimeout(() => {
                botMessage.classList.add('show');
            }, 10);
        });
    }
}
