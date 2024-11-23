const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = "AIzaSyBzd-xoqwpoO5_UCA8qk5MbAbFwfx1A7o4"; // Securely store your API key

app.post("/chat", async (req, res) => {
    const { message } = req.body;


    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(message);
        const response = (result.response.text());
        console.log(response);
        res.json(response);
    } catch (error) {
        console.error("Error from API:", error.response?.data || error.message);
        res.status(500).send("Error communicating with chatbot API");
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
