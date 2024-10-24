const express = require('express');

const userController = require('../controllers/userController');
const createUserMiddleware = require('../middlewares/user/createUserMiddleware');

const router = express.Router();

router.post('/users', createUserMiddleware, userController.createUser);

module.exports = router;
