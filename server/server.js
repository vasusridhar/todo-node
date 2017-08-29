const bodyparser = require('body-parser');
const express = require('express');

const { moongoose } = require('./db/mongoose')
const { Todo } = require('./models/Todo');
const { User } = require('./models/User');

var app = express();
app.use(bodyparser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => { res.send(doc); }, (error) => { res.status(400).send(error); });
});
app.listen(3000, () => {
    console.log('started server on port 3000');
});
