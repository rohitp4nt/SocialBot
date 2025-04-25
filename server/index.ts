import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package

dotenv.config(); // Load .env variables

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins (you can configure this if needed)
app.use(bodyParser.json());

// Gemini API
const GEMINI_API_URL= ''
const GEMINI_API_KEY = ''

// Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  const userMessage: string = req.body.message;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: userMessage }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Log the bot's reply
    const botReply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't understand that.";

    res.json({ reply: botReply });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res
      .status(500)
      .json({ reply: 'There was an error processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
