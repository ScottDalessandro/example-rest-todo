const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) return console.log('Unable to connect to MongoDB server');

  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID("58fc25a2cc94f9345aa74c6a")
  // }, {
  //   $set: {
  //     completed: true
  //     }  
  // }, {
  //   returnOriginal: false
  //   }
  // ).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("58fc262200f2f2347100ae33")
  },
  { $set: {
      name: 'Scott D\'Alessandro'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.close();
});
