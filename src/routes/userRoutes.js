import express from 'express';

import userController from '../controllers/userController.js';
import createUserMiddleware from '../middlewares/user/createUserMiddleware.js';

const router = express.Router();

router.post('/users', createUserMiddleware, userController.createUser);

export default router;
