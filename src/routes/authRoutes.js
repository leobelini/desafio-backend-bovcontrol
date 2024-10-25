import express from 'express';

import authController from '../controllers/authController.js';
import authenticateToken from '../middlewares/auth/authenticate.js';
import signInMiddleware from '../middlewares/auth/signInMiddleware.js';

const router = express.Router();

router.post('/signIn', signInMiddleware, authController.signIn);
router.get('/me', authenticateToken, authController.me);

export default router;
