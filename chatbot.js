const apiKey = "AIzaSyBzd-xoqwpoO5_UCA8qk5MbAbFwfx1A7o4"; // Replace with your API key
const apiEndpoint = "http://localhost:3000/chat"; // Replace with the correct endpoint

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;

    if (!userInput) return alert("Please type a message!");
    document.getElementById("user-input").value = ""; // Clear input

    // Append user message to hat
    appendMessage(userInput, "user");

    // Call the chatbot API
    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput }) // Modify payload as per API docs
        });

        const data = await response.json();
        console.log(data);

        // Append bot response to chat
        if (data) {
            appendMessage("Bot : " + data, "bot");
        } else {
            appendMessage("Sorry, I didn't understand that.", "bot");
        }
    } catch (error) {
        appendMessage("Error connecting to chatbot!", "bot");
        console.error("API Error:", error);
    }
}

function appendMessage(message, sender) {
    const messagesDiv = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to bottom
}
