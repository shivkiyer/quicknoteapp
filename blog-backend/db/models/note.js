var mongoose = require('mongoose');

var SubTopic = require('./subtopic');

var NoteSchema = new mongoose.Schema({
  title: String,
  subtopic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subtopics'
  },
  contents: [{
    itemType: String,
    itemData: String,
    _id: {id: false}
  }]
});

var Note = mongoose.model('notes', NoteSchema);

module.exports = Note;
