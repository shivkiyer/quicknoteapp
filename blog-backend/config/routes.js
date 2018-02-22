var listMethods = require('./../controllers/listMethods');
var insertMethods = require('./../controllers/insertMethods');
var deleteMethods = require('./../controllers/deleteMethods');
var patchMethods = require('./../controllers/patchMethods');

var routes = (app) => {
  // list methods to get contents
  app.get('/api/topicsdb', listMethods.getTopicList);
  app.get('/api/topicsdb/:topicid', listMethods.getSubTopicList);
  app.get('/api/topicsdb/:topicid/:subtopicid', listMethods.getNoteList);

  // insert methods to add new contents
  app.post('/api/topicsdb', insertMethods.addNewTopic);
  app.post('/api/topicsdb/:topicid', insertMethods.addNewSubTopic);
  app.post('/api/topicsdb/:topicid/:subtopicid', insertMethods.addNewNote);

  // delete methods to delete existing contents
  app.delete('/api/topicsdb/:topicid', deleteMethods.removeTopic);
  app.delete('/api/topicsdb/:topicid/:subtopicid', deleteMethods.removeSubTopic);
  app.delete('/api/topicsdb/:topicid/:subtopicid/:noteid', deleteMethods.removeNote);

  // patch methods to change existing contents
  app.patch('/api/topicsdb/:topicid', patchMethods.changeTopic);
  app.patch('/api/topicsdb/:topicid/:subtopicid', patchMethods.changeSubTopic);
  app.patch('/api/topicsdb/:topicid/:subtopicid/:noteid', patchMethods.changeNote);
};

module.exports = routes;
