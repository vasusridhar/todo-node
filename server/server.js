const bodyparser = require('body-parser');
const express = require('express');
const {
  ObjectID
} = require('mongodb');

var {
  moongoose
} = require('./db/mongoose')
var {
  Todo
} = require('./models/Todo');
var {
  User
} = require('./models/User');

const port = process.env.PORT || 3000;
var app = express();
app.use(bodyparser.json());

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    return res.send({
      todos
    });
  }, (e) => {
    res.sendStatus(400).send(error);
  });
});

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (error) => {
    res.sendStatus(400).send(error);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.sendStatus(404).send();
  }
  Todo.findById(id).then((todos) => {
    if (todos) {
      res.send({
        todos
      });
    } else {
      return res.sendStatus(400).send();
    }

  }, (err) => {
    res.status(400).send();
  });

});

app.listen(port, () => {
  console.log(`started server on port ${port}`);
});

module.exports = {
  app
};
