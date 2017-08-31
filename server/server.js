const bodyparser = require('body-parser');
const express = require('express');

var {
    moongoose
} = require('./db/mongoose')
var {
    Todo
} = require('./models/Todo');
var {
    User
} = require('./models/User');

var app = express();
app.use(bodyparser.json());

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        return res.send({
            todos
        });
    }, (e) => {

    });
});

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });
});
app.listen(3000, () => {
    console.log('started server on port 3000');
});

module.exports = {
    app
};