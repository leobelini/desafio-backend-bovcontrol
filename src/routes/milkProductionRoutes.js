import express from 'express';

import authenticateToken from '../middlewares/auth/authenticate.js';
import milkProductionController from '../controllers/milkProductionController.js';
import createMilkProductionMiddleware from '../middlewares/milkProduction/createMilkProductionMiddleware.js';

const router = express.Router();

router.post(
  '/milk-productions',
  authenticateToken,
  createMilkProductionMiddleware,
  milkProductionController.createMilkProduction,
);

export default router;