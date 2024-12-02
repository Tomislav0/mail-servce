const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send({ error: 'All fields are required.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `NOVA PORUKA SA STRANICE OD ${name}`,
        text: `Name: ${name}\n
        Email: ${email}\n
        Message:\n ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ success: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to send email.' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
