const expect = require('expect');
const request = require('supertest');

const {
  app
} = require('./../server');
const {
  Todo
} = require('./../models/Todo');
const {
  ObjectID
} = require('mongodb');

const dummyTodos = [{
  text: 'dummy text1'
}, {
  text: 'dummy text2'
}];
beforeEach((done) => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(dummyTodos);
    })
    .then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({
          text
        }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
  it('should not accept empty body', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  })
});

describe('it should get todos created', () => {
  it('should give 2 todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});
describe('it should get todos/ids created', () => {
  it('should give todo when passed valid id', (done) => {
    //first get id of dummy text 1 and save it

    let text = dummyTodos[0].text;
    Todo.find({
      text
    }).then((todos) => {
      let id = todos[0]._id;
      request(app)
        .get(`/todos/${todos[0]._id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.text).toBe(text);
        })
        .end(done);
    }).catch((e) => done(e));

  });

  it('should give 404 when passed invalid id', (done) => {
    let id = "23";
    request(app)
      .get('/todos/' + id)
      .expect(404)
      .end(done);
  });

  it('should give 400 when passed todo that does not exist', (done) => {
    let id = new ObjectID().toHexString();

    request(app)
      .get('/todos/' + id)
      .expect(400)
      .end(done);
  });
});
