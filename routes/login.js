const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.send(`<form onsubmit="saveToLocalStorage(event)" action="/login" method="POST">
    <input  id="username" type="text" name="userName" placeholder="Username">
    <button type="submit">Login</button>
    </form>
    <script>
    function saveToLocalStorage(event) {
        const userName = document.getElementById('username').value;
        const obj = {userName: userName}; 
        const newObj = JSON.stringify(obj);
        localStorage.setItem(userName,newObj);
    }
    </script>`);
})

router.post('/login', (req, res, next) => {
    console.log(req.body);
    //res.redirect('/');
    const userName = req.body.userName;
    if (!userName) {
        return res.status(400).send('Username is required');
    }
    // Redirect to a new URL with the username appended as a query parameter
    res.redirect(`/?userName=${userName}`);
})

module.exports = router;