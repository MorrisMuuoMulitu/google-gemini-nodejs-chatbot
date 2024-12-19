import express from 'express';
import dotenv from 'dotenv'; // Import dotenv
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Log the current working directory
console.log('Current working directory:', process.cwd());

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Example route for chat
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await getChatbotResponse(userMessage);
        res.json({ reply: response });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Error communicating with AI' });
    }
});

async function getChatbotResponse(message) {
    const apiKey = process.env.GOOGLE_API_KEY; // Access the API key from the environment variable
    console.log('GOOGLE_API_KEY:', apiKey); // Log the API key

    const client = new GoogleGenerativeAI({ apiKey });

    // Log the client to inspect its methods
    console.log(client);

    // Call the API with the user message
    const response = await client.generateContent({ // Update this line based on the actual method name
        model: 'gemini-1.5-pro',
        prompt: message,
    });

    return response;
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
