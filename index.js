const express = require('express');
const app = express();
const { Webhook } = require('discord-webhook-node');
const djiot = process.env['djiot']

app.set('view engine', 'ejs');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

var channel = {
    djiot: djiot
}

var comments = ["We've got someone's confession", "Someone opened their heart", "One more confession", "A new confession"]

function sendMessage(webHookURL, message) {
    let hook = new Webhook(webHookURL);
    hook.setUsername('Pope Frankis');
    hook.setAvatar("https://cdn.pixabay.com/photo/2014/04/03/10/01/pope-309611_1280.png");
    hook.send(message);
}

app.get('/admindjiot', (req, res) => {
    res.render('home');
});

app.post("/admindjiot", (req, res) => {
    sendMessage(channel.djiot, req.body.message)
    res.render('thankyou');
})

app.get('/adminblueink', (req, res) => {
    res.render('home');
});

app.post("/adminblueink", (req, res) => {
    sendMessage(channel.blueink, req.body.message)
    res.render('thankyou');
})

app.get('/djiot', (req, res) => {
    res.render('home');
});


app.post("/djiot", (req, res) => {
    let random = Math.floor(Math.random() * comments.length);
    sendMessage(channel.djiot, comments[random] + "\n\n" + "**" + req.body.message + "**")
    res.render('thankyou');
})

app.get('/blueink', (req, res) => {
    res.render('home');
});


app.post("/blueink", (req, res) => {
    let random = Math.floor(Math.random() * comments.length);
    sendMessage(channel.blueink, comments[random] + "\n\n" + "**" + req.body.message + "**")
    res.render('thankyou');
})

app.listen(3000, () => {
    console.log('server started');
});
