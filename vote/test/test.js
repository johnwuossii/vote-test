var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('mydb', mongodbServer);

/* open db */
db.open(function() {
    /* Select 'contact' collection */
    db.collection('contact', function(err, collection) {
        /* Insert a data */
        collection.insert({
            name: 'Fred Chien',
            vote:{
				v_name:['安安','妹子','阿哥'],
				v_number:[5,6,8]				
			}
        }, function(err, data) {
            if (data) {
                console.log('Successfully Insert');
            } else {
                console.log('Failed to Insert');
            }
        });

        /* Querying */
        collection.find({ name: 'Fred Chien' }, function(err, data) {
            /* Found this People */
            if (data) {
                console.log('Name: ' + data.name + ', email: ' + data.email);
            } else {
                console.log('Cannot found');
            }
        });
    });
});
