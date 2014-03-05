  var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;    

  // Custom factory (need to provide a 12 byte array);
  CustomPKFactory = function() {}
  CustomPKFactory.prototype = new Object();
  CustomPKFactory.createPk = function() {
    return new ObjectID("aaaaaaaaaaaa");
  }
  MongoClient.connect('mongodb://127.0.0.1:27017/test', {'pkFactory':CustomPKFactory}, function(err, db) {
    if(err) throw err;

    db.dropDatabase(function(err, done) {

      db.createCollection('test_custom_key', function(err, collection) {

        collection.insert({'a':1}, function(err, docs) {

          collection.find({'_id':new ObjectID("aaaaaaaaaaaa")}).toArray(function(err, items) {
            console.dir(items);
            // Let's close the db
            db.close();
          });
        });
      });
    });
  });
