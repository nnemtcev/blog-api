const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: { type: String, required: true, minlength: 10 },
  timestamp: { type: Date, required: true },
  commenterName: { type: String, required: true, minlength: 3 }
});

module.exports = mongoose.model('Comment', CommentSchema);