var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
  title: String,
  desc: String
});

var Topic = mongoose.model('topics', TopicSchema);

module.exports = Topic;
