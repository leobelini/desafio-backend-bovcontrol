const express = require('express');

const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/auth/authenticate');
const signInMiddleware = require('../middlewares/auth/signInMiddleware');

const router = express.Router();
require('./authRoutesDefinitions');

router.post('/signIn', signInMiddleware, authController.signIn);
router.get('/me', authenticateToken, authController.me);
module.exports = router;
