const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000 // port is defined on heroku

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

app.get('/todos/:id', (req,res) => {
  const id = req.params.id;
  
  if(ObjectID.isValid(id)){    
    Todo.findById(id).then((todo) => {
      if(todo){
        return res.send({todo});
      }
      return res.status(404).send('todo not found');      
      
    }, (err) => {
      console.log(err);
      return res.status(400).send(err);
    });
  } else {
    return res.status(404).send('Not a Valid ID');
  } 
  
  
  
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});



module.exports = {app};