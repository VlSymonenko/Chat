const ObjectId = require('mongodb').ObjectId;

exports.insertDocuments = (db,data) =>{
  // Get the documents collection
  db.collection('documents').insertOne(data, function(err, result) {
    if(err) throw err;
    console.log("Saved into our database");
    });
  }

exports.close = client =>{
  console.log('End of working');
client.close();
}

exports.findDocumentsById = (id,db,res)=>{
  db.collection('documents').findOne(ObjectId(id) , function(err, docs) {
    if(err) throw err;
    console.log("Found the following records : ");
    console.log(docs);
    res.send(docs);
  });
}

exports.findDocs = db =>{
  db.collection('documents').find({}).toArray(function(err,result){
    if (err) throw err;
    console.log(result);
  });
}
exports.findTen =(numberr,db,res) => {
  const options = {
    "limit": 10,
    "skip": numberr*10
  }
  console.log(`Try to give 10 elements after ${numberr*10}`);
  db.collection('documents').find({},options).toArray(function(err, result) {
   if (err) throw err;
    console.log(result);
    res.send(result);
    //if you want to see only text of message
    /*
    let b = [];
    for(let a = 0; a<result.length;a++)
      b[a] = result[a].message;
    res.send(b);
    */
  });
}
exports.deleteAllData = db => {
  db.collection('documents').drop(function (err , result) {
    if(err) throw err ;
    console.log('Delete');
  })
}
