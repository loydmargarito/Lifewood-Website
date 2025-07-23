document.addEventListener('DOMContentLoaded', () => {

    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const messagesContainer = document.getElementById('chat-messages');
    const optionsContainer = document.getElementById('chat-options');

    // --- The Static Conversation Tree ---
    // This object defines the entire conversation flow.
    const conversation = {
        'start': {
            text: "Hello! I'm the Lifewood Assistant. How can I help you today?",
            options: [
                { text: "Tell me about your services", next: 'services' },
                { text: "How can I contact support?", next: 'contact' },
                { text: "What is Lifewood?", next: 'about' }
            ]
        },
        'services': {
            text: "We specialize in Adaptive AI, Global Platforms, and Digital Transformation. Which would you like to know more about?",
            options: [
                { text: "Adaptive AI", next: 'ai_details' },
                { text: "Global Platforms", next: 'platforms_details' },
                { text: "Back to start", next: 'start' }
            ]
        },
        'contact': {
            text: "You can reach our team via the contact form on our website or by emailing support@lifewood.dev. We're always on!",
            options: [
                { text: "Thanks!", next: 'end' },
                { text: "Back to start", next: 'start' }
            ]
        },
        'about': {
            text: "Lifewood is a global technology partner, building intelligent systems that empower businesses to lead change. We engineer the future, today.",
            options: [
                { text: "Explore services", next: 'services' },
                { text: "Thanks!", next: 'end' }
            ]
        },
        'ai_details': {
            text: "Our AI systems learn from data to predict outcomes and automate complex decisions, giving our clients a competitive edge.",
            options: [
                { text: "Back to services", next: 'services' },
                { text: "Back to start", next: 'start' }
            ]
        },
        'platforms_details': {
            text: "We build robust, secure, and scalable infrastructures that perform flawlessly across global markets.",
            options: [
                { text: "Back to services", next: 'services' },
                { text: "Back to start", next: 'start' }
            ]
        },
        'end': {
            text: "You're welcome! Is there anything else I can help with?",
            options: [
                { text: "Yes, take me to the start", next: 'start' }
            ]
        }
    };

    // --- Chatbot Functions ---

    // Toggles the chat window's visibility
    chatBubble.addEventListener('click', () => {
        chatWindow.classList.toggle('show');
    });

    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.remove('show');
    });

    // Function to display a message in the chat
    function displayMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        // Scroll to the latest message
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Function to display the user's options
    function displayOptions(options) {
        optionsContainer.innerHTML = ''; // Clear old options
        if (!options) return;

        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option.text;
            button.addEventListener('click', () => handleOptionClick(option));
            optionsContainer.appendChild(button);
        });
    }

    // Handles what happens when a user clicks an option
    function handleOptionClick(option) {
        // Display the user's choice
        displayMessage(option.text, 'user');
        
        // Move to the next step in the conversation
        const nextStepId = option.next;
        
        // Use a slight delay for the bot's response to feel more natural
        setTimeout(() => {
            const nextStep = conversation[nextStepId];
            displayMessage(nextStep.text, 'bot');
            displayOptions(nextStep.options);
        }, 500);
    }

    // --- Initialize Chatbot ---
    function startChat() {
        const startStep = conversation['start'];
        displayMessage(startStep.text, 'bot');
        displayOptions(startStep.options);
    }

    startChat();
});