import express from 'express';

import farmController from '../controllers/farmController.js';
import authenticateToken from '../middlewares/auth/authenticate.js';
import createFarmMiddleware from '../middlewares/farm/createFarmMiddleware.js';

const router = express.Router();

router.post(
  '/farms',
  authenticateToken,
  createFarmMiddleware,
  farmController.createFarm,
);

router.get('/farms', authenticateToken, farmController.getFarms);

export default router;