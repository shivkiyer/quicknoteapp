require('./../config/config');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});
//mongoose.connect(process.env.MONGODB_URI);


var TopicSchema = new mongoose.Schema({
  title: String,
  desc: String
});

var Topic = mongoose.model('Topic', TopicSchema);

var app = express();
var rootPath = path.normalize(__dirname);
var rootPath = path.dirname(path.normalize(__dirname));
var port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static(path.join(rootPath, 'dist')));


app.post('/topicsdb/', (req, res) => {
  console.log(req.body);
  var newTopic = new Topic({
    title: req.body.title,
    desc: req.body.desc
  });
  console.log("Created topic");

  newTopic.save().then((topic) => {
    res.send(topic);
    console.log("Success");
  }, (e) => {
    res.status(400).send(e);
    console.log("Failed");
  });
});


app.get('/topicsdb', (req, res) => {
  Topic.find().then((topics) => {
    res.send(topics);
    console.log(topics);
  }, (e) => {
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
