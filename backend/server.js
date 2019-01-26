//import {deleteAllData,findTen,findDocs,findDocumentsById,insertDocuments,close} from 'db';
// const { check } = require('express-validator/check');
const Verifier = require("email-verifier");
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;



const app = express();

//const api_key ='https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_6tTDf7O8E7CyAzDyNFwOPzcuBgDqd&emailAddress=support@whoisxmlapi.com'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//передать в пост данные из сокета
// Connection URL

let info ;

const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'chatroom';
// Use connect method to connect to the server
MongoClient.connect(url,{ useNewUrlParser: true } , function(err, client) {
  if(err) throw err;
  console.log("Connected successfully to server");
    const db = client.db(dbName);

    app.get('/api/messages/list/:number', function(req, res) {
      findTen(parseInt(req.params.number),db,res);
  }
);

  app.post('/user', (req, res) => {

      console.log('Data that was send from react app ' + req.body.name + req.body.message + req.body.email + req.body.date);
    if(!req.body.message || req.body.message.length > 100 || !req.body.email ){
  res.status(400).send({error: 'Name is require and length cannot be greater than 1024'});
  return;
}


  info = req.body;
  //res.send(req.body.message);

    //text: req.body.text,
  insertDocuments(db , req.body);
  //.then(user => res.json(user));
  findDocs(db);
});

  app.get('/api/messages/single/:id', function(req, res) {
//try{
 findDocumentsById(req.params.id,db,res)
  //res.send(a());

  //}catch(error){
  //  res.sendStatus(400).json({
  //        error: '​ Internal Server Error '
    //  })
  //  }
  })
});


 const server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});
//let io = socket('http://localhost:8080');

let io = socket(server);

 io.on('connection', (socket) => {
    socket.on('SEND_MESSAGE', function(data){
      console.log(data);
        //info = data;
        io.emit('RECEIVE_MESSAGE', data);
        return data;
    })
  });


//ToDelete
const insertDocuments = (db,data) =>{
  // Get the documents collection
  db.collection('documents').insertOne(data, function(err, result) {
    if(err) throw err;
    console.log("Inserted 1 document into the collection");
    });
  }

const close = client =>{
client.close();
}

let findDocumentsById = (id,db,res)=>{
  // Find some documents
  db.collection('documents').findOne(ObjectId(id) , function(err, docs) {
    if(err) throw err;
    console.log("Found the following records");
    console.log(docs);
    res.send(docs);
    //return("hi, there");
  });
}

const findDocs = db =>{
  db.collection('documents').find({}).toArray(function(err,result){
    if (err) throw err;
    console.log(result);
  });
}
const findTen =(numberr,db,res) => {
  const options = {
    "limit": 10,
    "skip": numberr*10
  }
  console.log(`Try to give 10 elements after ${numberr*10}`);
  db.collection('documents').find({},options).toArray(function(err, result) {
   if (err) throw err;
    console.log(result);
    let b = [];
    for(let a = 0; a<result.length;a++)
      b[a] = result[a].message;

    res.send(b);
  });
}
const deleteAllData = db => {
  db.collection('documents').drop(function (err , result) {
    if(err) throw err ;
    console.log('Delete');
  })
}
