// npm install express
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format
    , express = require('express')
    , cons = require('consolidate')
    , app = express();

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
  var title = '投票系統';
  var collection = db.collection('test_insert');
  app.get('/', function(req, res){
    res.render('create_vote', {
      title: title,
    });
  });
  app.post('/redirect', function(req, res){
    var op_votes = []
    for(var i in req.body.op_names){
      op_votes.push(0)
    }
    collection.insert({
        name: req.body.nametitle,
        op_name: req.body.op_names,
        op_vote: op_votes
    },function(err, docs) {});
    res.redirect('/');
  });


  app.get('/vote_list', function(req, res){
    var titles = []
    collection.find().toArray(function(err, docs) {
      console.log(docs);
      for(var i in docs){
        titles.push({ name: docs[i].name });
      }
      res.render('vote_list', {
        title: '請選擇一個投票活動',
        vote_titles: titles,
        op_votes: req.query.op_votes
      });
    });
  });
  app.get('/new_vote', function(req, res){
    var search = { name : req.query.vote_title };
    collection.find(search).toArray(function(err, docs) {
      res.render('new_vote', {
        title: title,
        vote_title: docs[0].name,
        op_votes: docs[0].op_name,
      });
    });
  });

  app.post('/vote_update', function(req, res){
    var search = { name : req.body.vote_title };
    console.log(req.body)
    collection.find(search).toArray(function(err, docs) {
      var op_votes = docs[0].op_vote;
      for(var i in docs[0].op_name){
        if( docs[0].op_name[i] == req.body.op_vote ){
          docs[0].op_vote[i] = docs[0].op_vote[i]+1;
          console.log(docs[0].op_vote[i])
          collection.update(search, {$set: {op_vote:op_votes}}, function(err) {
            if (err) console.warn(err.message);
            else console.log('成功更新');
          });
        }
      }
    });
    res.redirect('/view_results?vote_title='+req.body.vote_title);
  })

  app.get('/view_results', function(req, res){
    var search = { name : req.query.vote_title };
    collection.find(search).toArray(function(err, docs) {
      var vote_title = docs[0].name
          ,op_names = docs[0].op_name
          ,op_votes = docs[0].op_vote
          ,percents = []
          ,votes = 0;
      for(var i in op_votes){ votes = op_votes[i]+votes}
      for(var i in op_votes){
        if(votes != 0){
          var percent = Math.round(Math.ceil(op_votes[i]/votes*10000)/10000*1000)/10;
          percents.push(percent);
          //percents.push((op_votes[i]/votes*100).toFixed(2));
        }else{
          percents.push(op_votes[i]);
        }
      }

      res.render('view_results', {
        title: title,
        vote_title: vote_title,
        op_names: op_names,
        op_votes: op_votes,
        percents: percents,
        votes: votes
      });
    });
  });
});


app.listen(3000);
console.log('Express server listening on port 3000');

