var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('webber', mongodbServer);

/* open db */
db.open(function() {
    /* Select 'contact' collection */
    db.collection('contact', function(err, collection) {
        /* Insert a data */
        collection.insert({
            vote_name: 'fff',
            vote_options: ['aaa','bbb'],
            vote_number: '20'
        }, function(err, data) {
            if (data) {
                console.log('Successfully Insert');
            } else {
                console.log('Failed to Insert');
            }
        });

        /* Querying */
        collection.find({ name: 'fff' }, function(err, data) {
            /* Found this People */
            if (data) {
                console.log('vote-Name: ' + data.vote_name + ', vote-Number: ' + data.vote_number);
            } else {
                console.log('Cannot found');
            }
        });
    });
});
