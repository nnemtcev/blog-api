const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.get('/', postController.get);
router.get('/:postId', postController.byId);
router.post('/', postController.create);
router.patch('/:postId', postController.update);
router.patch('/publish', postController.publishAll);
router.patch('/unpublish', postController.unpublishAll);
router.delete('/:postId', postController.delete);

module.exports = router;