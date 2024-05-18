const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const loginRoutes = require('./routes/login');
const chatRoutes = require('./routes/chat');

app.use(express.urlencoded({extended: false}));
app.use(loginRoutes);
app.use(chatRoutes);

app.use('/', (req, res, next) => {
    res.send('<h2>Page not Found!!</h2>')
})

app.listen(3000);
