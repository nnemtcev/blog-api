const Comment = require('../models/comment');
const Post = require('../models/post');

exports.getCommentsByPostId = function(req, res, next) {
  Post.findOne({ _id: req.params.postId }, (err, post) => {
    if (err) { return next(err); }
    return res.json(post.comments);
  });
};

exports.getCommentsById = function(req, res, next) {
  Post.findOne({ _id: req.params.postId }, (err, post) => {
    if (err) { return next(err); }
    return post.comments.filter(comment._id === req.params.commentId);
  })
};

exports.createComment = function(req, res, next) {
  Post.findOne({ _id: req.params.postId }, (err, post) => {
    if (err) { return next(err); }
    
  });
};