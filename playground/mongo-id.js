// const {
//     ObjectID
// } = require('mongodb');

// const {
//     mongoose
// } = require("./../server/db/mongoose");

// const {
//     Todo
// } = require('./../server/models/Todo');

const ObjectID = require('mongodb').ObjectID;
const {
    mongoose
} = require("./../server/db/mongoose");

const {
    Todo
} = require('./../server/models/Todo');

var id = '34543';

if (!ObjectID.isValid(id)) {
    console.log('not valid')
}

Todo.find({
    _id: id
}).then((todos) => {

    console.log(todos);
}, (err) => {
    console.log('invalid id');
});