 var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

  var search = {name: '你媽個逼'};
  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;
    
    collection.update(search1, {$set: {hi: 'boz'}}, {w:1}, function(err) {
      if (err) console.warn(err.message);
      else console.log('成功更新');
    });
  });
