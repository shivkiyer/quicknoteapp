var mongoose = require('mongoose');

var Topic = require('./topic');

var SubTopicSchema = new mongoose.Schema({
  title: String,
  desc: String,
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'topics'
  }
})

var SubTopic = mongoose.model('subtopics', SubTopicSchema);

module.exports = SubTopic;
