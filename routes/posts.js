const express = require('express');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const router = express.Router();

router.get('/', postController.get);
router.get('/:postId', postController.byId);
router.get('/:postId/comments', commentController.getCommentsByPostId);
router.get('/:postId/comments/:commentId', commentController.getCommentsById);

router.post('/', postController.create);

router.patch('/publish', postController.publishAll);
router.patch('/unpublish', postController.unpublishAll);
router.patch('/:postId', postController.update);

router.delete('/:postId', postController.delete);

module.exports = router;