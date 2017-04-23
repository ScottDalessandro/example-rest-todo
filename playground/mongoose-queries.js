const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '58fd0ca6ceb67d489c9d194e';

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos ', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo ', todo)
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) return console.log('ID not found')
//   console.log('Todo By ID ', todo);
// }).catch((e) => {
//   console.log(e);
// })

User.findById('58fce065ad6b663fb61d3ca2').then((user) => {
  if(!user) return console.log('USER not found');
  console.log('User info ', user)
},(e) => {
  console.log(e);
});