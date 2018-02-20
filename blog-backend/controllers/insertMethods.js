var Topic = require('./../db/models/topic');
var SubTopic = require('./../db/models/subtopic');
var Note = require('./../db/models/note');

var addNewTopic = (req, res) => {
  var topicTitle = req.body.title;
  var topicDesc = req.body.desc;

  var newTopic = new Topic({
    title: topicTitle,
    desc: topicDesc
  });
  newTopic.save()
    .then(
      () => {
        res.send(newTopic);
      }
    ).catch(
      (e) => {
        console.log(e);
        res.status(400).send({message: 'Could not save topic'});
      }
    );
};


var addNewSubTopic = (req, res) => {
  var topicId = req.params.topicid;
  var subTopicTitle = req.body.title;
  var subTopicDesc = req.body.desc;
  var topic;
  var newSubTopic;

  Topic.findById(topicId).then(
    (topicItem) => {
      topic = topicItem;
      newSubTopic = new SubTopic(
        {
          title: subTopicTitle,
          desc: subTopicDesc,
          topic: topicItem
        }
      );
      return newSubTopic.save();
    }
  ).then(
    () => {
      res.send(newSubTopic);
    }
  ).catch(
    (e) => {
      console.log(e);
      res.status(400).send({message: 'Could not save subtopic'});
    }
  );
};


var addNewNote = (req, res) => {
  var topicId = req.params.topicid;
  var subTopicId = req.params.subtopicid;
  var noteTitle = req.body.title;
  var noteLabels = Object.keys(req.body);
  var noteContents = [];
  noteLabels.forEach((item) => {
    if (item.slice(0, 4) === 'text' || item.slice(0, 4) === 'code') {
      noteContents.push({});
    }
  });
  noteLabels.forEach((item) => {
    if (item.slice(0, 4)==='text') {
      let iIndex = parseInt(item.slice(4, 5));
      noteContents[iIndex]['itemType'] = 'text';
      noteContents[iIndex]['itemData'] = req.body[item];
    }
    if (item.slice(0, 4)==='code') {
      let iIndex = parseInt(item.slice(4, 5));
      noteContents[iIndex]['itemType'] = 'code';
      noteContents[iIndex]['itemData'] = req.body[item];
    }
  });
  var newNote = new Note({
    title: noteTitle,
    subtopic: subTopicId,
    contents: noteContents
  });
  newNote.save()
    .then(
      () => {
        res.send(newNote);
      }
    ).catch(
      (e) => {
        console.log(e);
        res.status(400).send({message: 'Could not save note'});
      }
    );
};


module.exports = {
  addNewTopic,
  addNewSubTopic,
  addNewNote
};
