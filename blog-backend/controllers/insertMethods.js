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
  noteLabels.splice(noteLabels.indexOf('title'),1);
  var noteContents = [];
  noteLabels.forEach((item) => {
    if (item.slice(0, 4) === 'text' || item.slice(0, 4) === 'code') {
      noteContents.push({});
    }
  });
  for (let iIndex=0; iIndex<noteLabels.length; iIndex++) {
    for (let jIndex=iIndex+1; jIndex<noteLabels.length; jIndex++) {
      if (parseInt(noteLabels[iIndex].slice(4,5)) >  parseInt(noteLabels[jIndex].slice(4,5))) {
        let temp = noteLabels[iIndex];
        noteLabels[iIndex] = noteLabels[jIndex];
        noteLabels[jIndex] = temp;
      }
    }
  }
  let countIndex = 0;
  noteLabels.forEach((item) => {
    if (item.slice(0, 4)==='text') {
      noteContents[countIndex]['itemType'] = 'text';
      noteContents[countIndex]['itemData'] = req.body[item];
      countIndex += 1;
    }
    if (item.slice(0, 4)==='code') {
      noteContents[countIndex]['itemType'] = 'code';
      noteContents[countIndex]['itemData'] = req.body[item];
      countIndex += 1;
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
