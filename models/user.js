const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, minlength: 5 },
  password: { type: String, required: true, minlength: 10 }
});

UserSchema
.virtual('url')
.get(() => {
  return `/users/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);