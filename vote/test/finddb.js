var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

var search = {name:'你媽個逼'};

  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('test_insert');
    collection.find(search)
      .limit(100) //最多顯示10筆資料
      .toArray(function(err, docs) {
        console.dir(docs);
    });
  });
