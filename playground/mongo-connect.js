//const MongoClient = require('mongodb').MongoClient;
const {
  MongoClient,
  ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to db');
  }
  console.log('Connected to MongoDB');

  //update statements
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID("59a51c3dd9d6aabf258d86cf")
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log("result", result);
  // });

  db.collection('Users').findOneAndUpdate({
    name: 'Vasu shabari'
  }, {
    $set: {
      name: 'Vasu shabarinath'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log("result", result);
  });


  //find one and delete it and return what was deleted
  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({
  //   text: "Walk the dog"
  // }).then((result) => {
  //   console.log(result);
  // });

  // //delete first one only
  // db.collection('Todos').deleteOne({
  //   text: "Something to do"
  // }).then((result) => {
  //   console.log(result);
  // });


  //delete many
  // db.collection('Todos').deleteMany({
  //   text: "Something to do"
  // }).then((result) => {
  //   console.log(result);
  // });


  // find({
  //   _id: new ObjectID("59a3807d4c42bc1fe087ea39"),
  //   completed: true
  // })
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`count is ${count}`);
  // }, (err) => {
  //   console.log('unable to fetcht the todos', err);
  // });


  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to do insert', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Vasu shabari',
  //   location: 'Melbourne, Victoria',
  //   age: 30
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to do insert user', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  //  db.close();
});
