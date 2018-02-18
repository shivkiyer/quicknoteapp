var listMethods = require('./../controllers/listMethods');

var routes = (app) => {
  app.get('/api', listMethods.indexPage);
  app.get('/api/topicsdb', listMethods.getTopicList);
  app.get('/api/topicsdb/:topicid', listMethods.getSubTopicList);
  app.get('/api/topicsdb/:topicid/:subtopicid', listMethods.getNoteList);
  app.post('/api/topicsdb', listMethods.addNewTopic);
  app.post('/api/topicsdb/:topicid', listMethods.addNewSubTopic);
  app.post('/api/topicsdb/:topicid/:subtopicid', listMethods.addNewNote);
};

module.exports = routes;
