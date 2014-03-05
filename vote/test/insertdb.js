var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

var nametitle = '你媽個逼',
	op_name = ['s','d','f'],
	op_vote = [45,1,53]

  MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('test_insert');
	  collection.insert({
		name: nametitle,
		voteoptions:{
		  op_name: op_name,
		  op_vote: op_vote
		}
		  
      },function(err, docs) {});
      //資料庫共有幾筆
      collection.count(function(err, count) {
        console.log(format("count = %s", count));
        db.close();
      });
  });
