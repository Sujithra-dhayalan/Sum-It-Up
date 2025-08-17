import { useState } from 'react';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MainPage.css';

const MainPage = () => {

    const [transcript, setTranscript] = useState('');
    const [prompt, setPrompt] = useState('Summarize in bullet points for executives');
    const [summary, setSummary] = useState('');
    const [recipients, setRecipients] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);

    // ---Function to summarize the content---
    const handleGenerateSummary = async () => {

        if (!transcript) {
            toast.error('Please provide a transcript.');
            return;
        }

        setIsLoading(true);

        const data = { transcript, prompt };
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/summarize`, data, {
                headers: { 'Content-Type': 'application/json' }
            });

            setSummary(response.data.summary);
            toast.success('Summary generated successfully!');

        } catch (error) {
            toast.error('Error: Could not generate summary.');

        } finally {
            setIsLoading(false);
        }
    };

    // ---Function to handle the emails---
    const handleShareEmail = async () => {

        if (!summary || !recipients) {
            toast.error('Please generate a summary and provide recipient emails.');
            return;
        }
        toast.info('Sending email...');
        setIsSending(true);
        const data = {summary, recipients}
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/share`, data, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status !== 200) {
                toast.error('Could not send email.');
            }

            toast.success('Email sent successfully!');
            setIsSending(false);
            setRecipients('');
            setSummary('');
            setTranscript('');

        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>AI Meeting Notes Summarizer 🤖</h1>

                <div className="container">
                    {/* Left Side: Inputs */}
                    <div className="panel">
                        <h2>1. Input Transcript</h2>
                        <textarea
                            value={transcript}
                            onChange={(e) => setTranscript(e.target.value)}
                            placeholder="Paste your meeting transcript here..."
                            rows="15"
                        />

                        <h2>2. Custom Instruction</h2>
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., Highlight only action items"
                        />

                        <button onClick={handleGenerateSummary} disabled={isLoading || isSending}>
                            {isLoading ? 'Generating...' : 'Generate Summary'}
                        </button>
                    </div>

                    {/* Right Side: Output and Sharing */}
                    <div className="panel">
                        <h2>3. Generated Summary (Editable)</h2>
                        <textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            placeholder="Your AI-generated summary will appear here..."
                            rows="15"
                        />

                        <h2>4. Share via Email</h2>
                        <input
                            type="email"
                            value={recipients}
                            onChange={(e) => setRecipients(e.target.value)}
                            placeholder="recipient1@example.com, recipient2@example.com"
                        />
                        <button onClick={handleShareEmail} style={{ opacity: isSending ? 0.5 : 1 }} disabled={isSending}>
                            {isSending ? 'Sending...' : 'Share Summary'}
                        </button>
                    </div>
                </div>
            </header>
            <ToastContainer />
        </div>
    );
}

export default MainPage;