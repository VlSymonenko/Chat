const datebasefunc = require('./db');
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const sockets = require('./socket')
const port = process.env.PORT || 8080;


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const url = 'mongodb://localhost:27017';
const dbName = 'chatroom';

MongoClient.connect(url,{ useNewUrlParser: true } , function(err, client) {
  if(err) throw err;
    console.log("Connected successfully to server");
    const db = client.db(dbName);

  app.post('/user', (req, res) => {
    console.log('Data that was send from react app : Name: ' + req.body.name +', Message: '+ req.body.message +' , Email: '+req.body.email + 'Date:' + req.body.date);
    if(!req.body.message || req.body.message.length > 100 || !req.body.email ){
      res.status(400).send({error: 'Name and email are require and names length cannot be greater than 1024'});
      return;
    }
  datebasefunc.insertDocuments(db , req.body);
});

app.get('/api/messages/list/:number',(req, res)=>datebasefunc.findTen(parseInt(req.params.number),db,res));
app.get('/api/messages/single/:id', (req, res)=>datebasefunc.findDocumentsById(req.params.id,db,res));

const server = app.listen(port, function(){
    console.log(`server is running on port ${port}`)
  });
let io = socket(server);
    sockets.soc(io);
  });
