import express from 'express';

import farmerController from '../controllers/farmerController.js';
import authenticateToken from '../middlewares/auth/authenticate.js';
import createFarmerMiddleware from '../middlewares/farmer/createFarmerMiddleware.js';

const router = express.Router();

router.post(
  '/farmers',
  authenticateToken,
  createFarmerMiddleware,
  farmerController.createFarmer,
);

router.get('/farmers', authenticateToken, farmerController.getFarmers);

export default router;
