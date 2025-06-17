const N8N_WEBHOOK_URL = 'https://n8n.digiquarter.com/webhook/3f7390b9-5d24-482d-bade-2ea71ec5055f';

// Session management
let sessionId = localStorage.getItem('novaSessionId') || generateSessionId();
localStorage.setItem('novaSessionId', sessionId);

function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// DOM elements
const chatMessages = document.querySelector('.chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
let isProcessing = false;

// Initialize chat
function initChat() {
    setTimeout(() => {
        const systemMessage = document.querySelector('.message.system');
        if (systemMessage) {
            systemMessage.querySelector('p').textContent = 'Welcome! How can I assist you today?';
            systemMessage.classList.remove('system');
            systemMessage.classList.add('bot');
        }
    }, 1500);
}

// Add message to chat
function addMessage(content, sender = 'user') {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = content;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot');
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = `
        <div class="typing-indicator">
            <span></span><span></span><span></span>
        </div>
    `;
    
    typingDiv.appendChild(contentDiv);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
}

// FIXED: Send message with correct field names
async function sendMessage() {
    if (isProcessing || !userInput.value.trim()) return;

    const message = userInput.value.trim();
    userInput.value = '';
    isProcessing = true;
    
    // Add user message
    addMessage(message, 'user');
    
    // Show typing indicator
    const typingIndicator = showTyping();
    
    try {
        // FIXED: Send with chatInput field name (matches AI Agent expectation)
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatInput: message,      // CHANGED: from 'message' to 'chatInput'
                sessionId: sessionId,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle different response formats
        let botResponse = '';
        if (data.output) {
            botResponse = data.output;
        } else if (data.response) {
            botResponse = data.response;
        } else if (data.message) {
            botResponse = data.message;
        } else if (typeof data === 'string') {
            botResponse = data;
        } else {
            botResponse = "I received your message but couldn't process it properly. Please try again.";
        }

        // Update session ID if provided
        if (data.sessionId) {
            sessionId = data.sessionId;
            localStorage.setItem('novaSessionId', sessionId);
        }

        // Remove typing indicator and add bot response
        typingIndicator.remove();
        addMessage(botResponse, 'bot');
        
    } catch (error) {
        console.error('Error sending message:', error);
        typingIndicator.remove();
        addMessage("Sorry, I'm having trouble connecting right now. Please try again in a moment.", 'bot');
    } finally {
        isProcessing = false;
        userInput.focus();
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Initialize
initChat();
console.log('Stella AI initialized with sessionId:', sessionId);