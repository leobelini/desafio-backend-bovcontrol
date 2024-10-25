import express from 'express';

import reportController from '../controllers/reportController.js';
import authenticateToken from '../middlewares/auth/authenticate.js';
import milkProductionReportMiddleware from '../middlewares/report/milkProductionReportMiddleware.js';
import paymentFarmInYearReportMiddleware from '../middlewares/report/paymentFarmInYearReportMiddleware.js';
import paymentFarmerInMonthReportMiddleware from '../middlewares/report/paymentFarmerInMonthReportMiddleware.js';

const router = express.Router();

router.get(
  '/reports/farms/:farmId/milk-production/month/:month',
  authenticateToken,
  milkProductionReportMiddleware,
  reportController.getMilkProduction,
);

router.get(
  '/reports/farms/:farmId/payment/year/:year',
  authenticateToken,
  paymentFarmInYearReportMiddleware,
  reportController.getPaymentFarmInYear,
);

router.get(
  '/reports/farmers/:farmerId/payment/month/:month',
  authenticateToken,
  paymentFarmerInMonthReportMiddleware,
  reportController.getPaymentFarmerInMonth,
);

export default router;
