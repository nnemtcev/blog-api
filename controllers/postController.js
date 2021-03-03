const Post = require('../models/post');

exports.get = function(req, res, next) {
  Post.find({}, (err, posts) => {
    if (err) { return next(err); }
    return res.json(posts);
  });
};

exports.byId = function(req, res, next) {
  Post.findOne({ _id: req.params.postId }, (err, post) => {
    if (err) { return next(err); }
    return res.json(post);
  });
};

exports.create = function(req, res, next) {
  const { title, body } = req.body;
  Post.create({
    title,
    body,
    timestamp: new Date(),
    comments: [],
    published: false
  }, (err) => {
    if (err) { return next(err); }
    return res.json('POST CREATED');
  });
};

exports.update = function(req, res, next) {
  const { title, body } = req.body;
  Post.findOneAndUpdate({ _id: req.params.postId }, { title, body }, { new: true }, (err, newPost) => {
    if (err) { return next(err); }
    return res.json(newPost);
  });
};

exports.delete = function(req, res, next) {
  Post.deleteOne({ _id: req.params.postId }, {}, err => {
    if (err) { return next(err); }
    return res.json('POST DELETED');
  });
};

exports.publishAll = function(req, res, next) {
  Post.updateMany({ published: false }, { published: true }, { new: true }, (err, newPost) => {
    if (err) { return next(err); }
    return res.json(newPost);
  });
};

exports.unpublishAll = function(req, res, next) {
    Post.updateMany({ published: true }, { published: false }, { new: true }, (err, newPost) => {
      if (err) { return next(err); }
      return res.json(newPost);
    });
};