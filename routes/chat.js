const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile('chat-messages.txt', (err, data) => {
        if (err) {
            fs.writeFile('chat-messages.txt', '', (err) => {
                if (err) {
                    console.error('Error creating chat-messages.txt: ', err);
                    return res.status(500).send('Error creating chat-messages.txt');
                }
                renderForm(req, res);
            });
        } else {
            renderForm(req, res, data.toString());
        }
    });
});

function renderForm(req, res, messages = '') {
    const userName = req.query.userName; // Extract the username from the query parameters
    res.send(`
        <html>
            <head>
                <title>Chat</title>
            </head>
            <body>
                <form action="/?userName=${userName}" method="POST"> <!-- Include username in form action -->
                    <input type="hidden" name="userName" value="${userName}"> <!-- Hidden input field for username -->
                    <input type="text" name="message" placeholder="Enter Message">
                    <button type="submit">Add Chat</button>
                </form>
                <p>${messages}</p>
            </body>
        </html>
    `);
}



router.post('/', (req, res) => {
    const message = req.body.message;
    const userName = req.body.userName;

    if (!message) {
        return res.status(400).send('Message cannot be empty');
    }
    fs.appendFile('chat-messages.txt', `${userName} : ${message}\n`, (err) => {
        if (err) {
            console.error('Error appending chat message: ', err);
            return res.status(500).send('Error appending chat message');
        }
        res.redirect('/');
    });
});

module.exports = router;
