const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

app.use(bodyParser.json()); // req.body now accessible

/* Example w/o body-parser
app.post('/todos', (req, res) => {
  var body = [];
  req.on('data', (chunk) => {
    body.push(chunk);    
  })
  .on('end', () => {
    console.log(body);
    body = body.join(' ').toString();
    console.log(body);
  });  
});
*/

app.post('/todos', (req, res) => {
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text    
  });

  todo.save().then((doc) => {
    res.json(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

app.get('/todos', (req, res, next) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});


app.listen(3000, () => {
  console.log('Started on port 3000');
});



module.exports = {app};