 var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

  var result;
  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;
    var collection = db.collection('test_insert');
    
	  collection.remove( { type : "food" })
      //使用find找到的所有資料
      var sss = collection.find({ass:'蕭'}).limit(2).toArray(function(err, docs) {
        console.dir(docs[0].ass);
        result = docs[0].ass
      //  db.close();
    });
    
    collection.update({name: '你媽個逼'}, {$set: {hi: 'there'}}, {w:1}, function(err) {
      console.log('successfully updated');
      if (err) console.warn(err.message);
      else console.log('successfully updated');
    });
  });
  console.log(result)
