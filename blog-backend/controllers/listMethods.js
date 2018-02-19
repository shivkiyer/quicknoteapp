var Topic = require('./../db/models/topic');
var SubTopic = require('./../db/models/subtopic');
var Note = require('./../db/models/note');

var playground = require('./../playground/just_trying_mongo');


var getTopicList = (req, res) => {
  Topic.find()
    .then(
      (items) => {
        res.send(items);
      }
    ).catch(
      (e) => {
        console.log(e);
        res.status(400).send({message: 'Could not fetch topics'});
      }
    );
};


var getSubTopicList = (req, res) => {
  var topicId = req.params.topicid;
  SubTopic.find({
    topic: topicId
  }).then(
    (items) => {
      res.send(items);
    }
  ).catch(
    (e) => {
      console.log(e);
      res.status(400).send({message: 'Could not fetch subtopics'});
    }
  );
};


var getNoteList = (req, res) => {
  var subTopicId = req.params.subtopicid;
  Note.find({
    subtopic: subTopicId
  }).then(
    (items) => {
      res.send(items);
    }
  ).catch(
    (e) => {
      console.log(e);
      res.status(400).send({message: 'Could not fetch notes'});
    }
  );
};


module.exports = {
  getTopicList,
  getSubTopicList,
  getNoteList
};
