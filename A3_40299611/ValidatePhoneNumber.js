const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'Questions')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Questions', 'Exercise3.html'));
});

app.post('/ValidatePhoneNumber', function(req, res) {

    let name = req.body.name;
    let phone = req.body.phone;

    if (/^\d{3}-\d{3}-\d{4}/.test(phone)) {
        res.send(`Hello, ${name}, your phone number is valid`);
    } else {
        res.send(`Hello, ${name}, your phone number "${phone}" is invalid. Please make sure it follows the proper format.`);
    }
});


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});