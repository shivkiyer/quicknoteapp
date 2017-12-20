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

var SubTopicSchema = new mongoose.Schema({
  title: String,
  desc: String,
  topic: String
})

var SubTopic = mongoose.model('SubTopic', SubTopicSchema);

var NoteSchema = new mongoose.Schema({
  title: String,
  topic: String,
  subTopic: String,
  contents: [{
    itemType: String,
    itemData: String
  }]
});

var Note = mongoose.model('Note', NoteSchema);


var app = express();
var rootPath = path.normalize(__dirname);
var rootPath = path.dirname(path.normalize(__dirname));
var port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static(path.join(rootPath, 'dist')));

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, Authorization, sid');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/topicsdb/', (req, res) => {
  var newTopic = new Topic({
    title: req.body.title,
    desc: req.body.desc
  });

  newTopic.save().then((topic) => {
    res.send(topic);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.get('/topicsdb', (req, res) => {
  Topic.find().then((topics) => {
    res.send(topics);
  }, (e) => {
    res.status(400).send();
  });
});


app.get('/topicsdb/:id', (req, res) => {
  var topicId = req.params.id;
  Topic.findById(topicId).then((topic) => {
    return SubTopic.find({
      topic: topic.title
    })
  }).then((subTopics) => {
    res.send(subTopics);
  }).catch((e) => {
    res.status(400).send('Topic not found');
  });
});


app.post('/subtopicsdb', (req, res) => {
  var subTopicData = req.body;
  var subTopic = {}

  if (Object.keys(subTopicData).indexOf("subTopic")>-1) {
    if (Object.keys(subTopicData.subTopic).indexOf("title")>-1) {
      subTopic.title = subTopicData.subTopic.title;
    }
    if (Object.keys(subTopicData.subTopic).indexOf("desc")>-1) {
      subTopic.desc = subTopicData.subTopic.desc;
    }
  }

  if (Object.keys(subTopicData).indexOf("topic")>-1) {
    if (Object.keys(subTopicData.topic).indexOf("title")>-1) {
      subTopic.topic = subTopicData.topic.title;
    }
  }

  var newSubTopic = new SubTopic(subTopic);

  newSubTopic.save().then((subTopic) => {
    res.send({
      title: subTopic.title,
      desc: subTopic.desc,
      topic: subTopic.topic,
      _id: subTopic._id
    });
  }, (e) => {
    res.status(400).send(e);
  });

});



app.post('/notedb', (req, res) => {
  var noteData = {};
  noteData.title = req.body.note.title;
  noteData.topic = req.body.topic;
  noteData.subTopic = req.body.subTopic;

  noteData.contents = [];
  var noteTags = Object.keys(req.body.note);
  var itemType;
  if (noteTags.length>-1) {
    noteTags.forEach((noteTagKey) => {
      if (noteTagKey.slice(0, 4)==='text') {
        itemType = 'text';
      } else if (noteTagKey.slice(0, 4)==='code') {
        itemType = 'code';
      } else {
        itemType = 'title';
      }

      if (itemType==='text' || itemType==='code'){
        noteData.contents.push({
          itemType: itemType,
          itemData: req.body.note[noteTagKey]
        });
      }
    });
  }

  var newNote = new Note(noteData);
  newNote.save().then(
    (note) => {
      res.send(note);
    }
  ).catch(
    (e) => {
      console.log(e);
      res.status(400).send(e);
    }
  );
});


app.get('/notedb/:id/:subid', (req, res) => {
  var topicId = req.params['id'];
  var subTopicId = req.params['subid'];
  var topicTitle, subTopicTitle;

  Topic.findById(topicId).then(
    (topic) => {
      topicTitle = topic.title;
      return SubTopic.findById(subTopicId);
    }
  ).then(
    (subTopic) => {
      subTopicTitle = subTopic.title;
      return Note.find({
        topic: topicTitle,
        subTopic: subTopicTitle
      });
    }
  ).then(
    (noteData) => {
      console.log(noteData);
    }
  ).catch(
    (e) => {
      console.log(e);
    }
  );

  // SubTopic.findById(subTopicId).then(
  //   (subTopic) => {
  //     console.log(subTopic);
  //   }
  // ).catch(
  //   (e) => {
  //     console.log(e);
  //   }
  // );

});


app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
