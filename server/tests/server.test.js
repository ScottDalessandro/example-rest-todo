const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server'); // needed to pass into supertest
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'first test todo'
}, {
  _id: new ObjectID(),
  text: 'second test todo'
}];

// drops everything in db so length is accurate.
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);    
  }).then((todos) => {
    done()
  })
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text}) // post request with req.body of text
      .expect(200) // res should be 200 
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) return done(err);

        Todo.find({text: text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create a todo with invalid data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err) return done(err);

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {

  it('should return todo doc', (done) => {
    
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {        
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    var id = new ObjectID().toHexString();
    console.log(typeof id);
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .expect((res) => {
        expect(res.text).toBe('todo not found');
      })
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .expect((res) => {
        expect(res.text).toBe('Not a Valid ID');
      })
      .end(done);
  })
});