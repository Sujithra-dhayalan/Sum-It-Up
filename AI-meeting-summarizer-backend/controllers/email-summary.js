const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// ---- Email Summary Controller ----
const emailSummaryController = async (req, res) => {
    const { transcript, prompt } = req.body;

    if (!transcript || !prompt) {
        return res.status(400).json({
            error: 'Transcript and prompt are required.'
        });
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that summarizes meeting transcripts based on user instructions.',
                },
                {
                    role: 'user',
                    content: `Instruction: "${prompt}". \n\nTranscript to summarize:\n${transcript}`,
                },
            ],
            model: 'llama3-8b-8192',
        });

        const summary = chatCompletion.choices[0]?.message?.content || 'Sorry, I could not generate a summary.';

        res.status(200).json({
            summary
        });

    } catch (error) {

        console.error('Error with Groq API:', error);
        res.status(500).json({
            error: 'Failed to generate summary.'
        });
    }
}

module.exports = emailSummaryController;