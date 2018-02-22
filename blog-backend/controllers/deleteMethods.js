var Topic = require('./../db/models/topic');
var SubTopic = require('./../db/models/subtopic');
var Note = require('./../db/models/note');
const mongoose = require('mongoose');

var removeNote = (req, res) => {
  var topicId = req.params.topicid;
  var subTopicId = req.params.subtopicid;
  var noteId = req.params.noteid;

  Note.findByIdAndRemove(noteId)
      .then(
        (note) => {
          res.send();
        }
      ).catch(
        (e) => {
          res.status(400).send(e);
        }
      );
};


var removeSubTopic = (req, res) => {
  var topicId = req.params.topicid;
  var subTopicId = req.params.subtopicid;

  Note.findOne({subtopic: subTopicId})
      .then(
        (subTopic) => {
          if (subTopic != null) {
            throw new Error();
          } else {
             return SubTopic.findByIdAndRemove(subTopicId);
          }
        }
      ).then(
        (item) => {
          res.send({message: 'deleted'})
        }
      ).catch(
        (e) => {
          res.status(400).send({message: 'Cannot delete subtopic. Notes within it have to be deleted first.'});
        }
      );
};


var removeTopic = (req, res) => {
  var topicId = req.params.topicid;

  SubTopic.findOne({topic: topicId})
      .then(
        (topic) => {
          if (topic != null) {
            throw new Error();
          } else {
             return Topic.findByIdAndRemove(topicId);
          }
        }
      ).then(
        (item) => {
          res.send({message: 'deleted'})
        }
      ).catch(
        (e) => {
          res.status(400).send({message: 'Cannot delete topic. Subtopics within it have to be deleted first.'});
        }
      );
};


module.exports = {
  removeTopic,
  removeSubTopic,
  removeNote
};
