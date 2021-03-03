var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.signIn);

module.exports = router;
