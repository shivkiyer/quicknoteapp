var Topic = require('./../db/models/topic');
var SubTopic = require('./../db/models/subtopic');
var Note = require('./../db/models/note');
const mongoose = require('mongoose');


var changeTopic = (req, res) => {
  var topicId = req.params.topicid;
  var newTopicTitle = req.body.title;
  var newTopicDesc = req.body.desc;

  Topic.findByIdAndUpdate(topicId,
          {
            $set: {
                    title: newTopicTitle,
                    desc: newTopicDesc
                  }
          })
      .then(
        (topic) => {
          res.send();
        }
      ).catch(
        (e) => {
          res.status(400).send({message: 'Could not change topic'});
        }
      );
};


var changeSubTopic = (req, res) => {
  var topicId = req.params.topicid;
  var subTopicId = req.params.subtopicid;
  var newSubTopicTitle = req.body.title;
  var newSubTopicDesc = req.body.desc;

  SubTopic.findByIdAndUpdate(subTopicId,
          {
            $set: {
                    title: newSubTopicTitle,
                    desc: newSubTopicDesc
                  }
          })
      .then(
        (subtopic) => {
          res.send();
        }
      ).catch(
        (e) => {
          res.status(400).send({message: 'Could not change subtopic'});
        }
      );
};


var changeNote = (req, res) => {
  var topicId = req.params.topicid;
  var subTopicId = req.params.subtopicid;
  var noteId = req.params.noteid;
  var newNoteTitle = req.body.title;
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

  Note.findByIdAndUpdate(noteId,
          {
            $set: {
                    title: newNoteTitle,
                    contents: noteContents
                  }
          })
      .then(
        () => {
          return Note.findById(noteId);
        }
      ).then(
        (note) => {
          res.send(note);
        }
      ).catch(
        (e) => {
          res.status(400).send({message: 'Could not change subtopic'});
        }
      );
};


module.exports = {
  changeTopic,
  changeSubTopic,
  changeNote
};
