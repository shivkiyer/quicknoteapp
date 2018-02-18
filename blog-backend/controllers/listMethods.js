var Topic = require('./../db/models/topic');
var SubTopic = require('./../db/models/subtopic');
var Note = require('./../db/models/note');

var playground = require('./../playground/just_trying_mongo');

var indexPage = (req, res) => {
  // playground.addATopic({
  //   title: 'Node',
  //   desc: 'Backend tech'
  // });

  // playground.addASubTopic({
  //   title: 'Node',
  //   desc: 'Backend tech'
  // },
  // {
  //   title: 'Authentication',
  //   desc: 'Logins and password encryption',
  // })

  // playground.addANote({
  //   title: 'Authentication',
  //   desc: 'Logins and password encryption',
  // },
  // {
  //   title: 'Using Jason Web Tokens',
  //   contents: [
  //       {
  //         itemType: 'text',
  //         itemData: 'Need to install the JWT package through npm'
  //       },
  //       {
  //         itemType: 'text',
  //         itemData: 'Has methods for hashing and salting passwords'
  //       }
  //   ]
  // });

  res.send("Hi there");
};


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
        return Topic.findOne({title: topicTitle, desc: topicDesc});
      }
    ).then(
      (item) => {
        res.send(item);
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

  Topic.findById(topicId).then(
    (topicItem) => {
      topic = topicItem;
      let newSubTopic = new SubTopic(
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
      return SubTopic.findOne({
        title: subTopicTitle,
        desc: subTopicDesc,
        topic: topic
      });
    }
  ).then(
    (item) => {
      res.send(item);
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
  var subtopicId = req.params.subtopicid;
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
    contents: noteContents
  });
  newNote.save()
    .then(
      () => {
        return Note.findById(newNote._id);
      }
    ).then(
      (item) => {
        res.send(item);
      }
    ).catch(
      (e) => {
        console.log(e);
        res.status(400).send({message: 'Could not save note'});
      }
    );
};


module.exports = {
  indexPage,
  getTopicList,
  getSubTopicList,
  getNoteList,
  addNewTopic,
  addNewSubTopic,
  addNewNote
};
