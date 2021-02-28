const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, minlength: 5 },
  password: { type: String, required: true, minlength: 10 }
});

module.exports = mongoose.model('User', userSchema);