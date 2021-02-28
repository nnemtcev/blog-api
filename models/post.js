const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true, minlength: 10 },
  body: { type: String, required: true, minlength: 10 },
  timestamp: { type: Date, required: true },
  comments: [{ type: Schema.Types.ObjectId, required: true }],
  published: { type: Boolean, required: true }
});

module.exports = mongoose.model('Post', postSchema);