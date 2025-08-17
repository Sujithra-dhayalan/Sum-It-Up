const nodemailer = require('nodemailer');
require('dotenv').config();

// ---- Email Sender Controller ----
const emailSender = async (req, res) => {
    const { summary, recipients } = req.body;

    if (!summary || !recipients) {
        return res.status(400).json({ error: 'Summary and recipients are required.' });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {

        const info = await transporter.sendMail({
            from: `${process.env.EMAIL_USER}`,
            to: recipients,
            subject: 'Your AI-Generated Meeting Summary',
            text: 'Here is your meeting summary:',
            html: `<pre>${summary}</pre>`,
        });

        res.status(200).json({
            message: 'Email sent successfully!'
        });

    } catch (error) {
        console.error('!!! FAILED TO SEND EMAIL !!!');
        console.log(error);
        res.status(500).json({
            error: 'Failed to send email.'
        });
    }
};

module.exports = emailSender;
