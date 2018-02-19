var listMethods = require('./../controllers/listMethods');
var insertMethods = require('./../controllers/insertMethods');

var routes = (app) => {
  // list methods to get contents
  app.get('/api/topicsdb', listMethods.getTopicList);
  app.get('/api/topicsdb/:topicid', listMethods.getSubTopicList);
  app.get('/api/topicsdb/:topicid/:subtopicid', listMethods.getNoteList);

  // insert methods to add new contents
  app.post('/api/topicsdb', insertMethods.addNewTopic);
  app.post('/api/topicsdb/:topicid', insertMethods.addNewSubTopic);
  app.post('/api/topicsdb/:topicid/:subtopicid', insertMethods.addNewNote);
};

module.exports = routes;
