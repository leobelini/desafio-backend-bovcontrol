const express = require('express');

const reportController = require('../controllers/reportController');
const authenticateToken = require('../middlewares/auth/authenticate');
const milkProductionReportMiddleware = require('../middlewares/report/milkProductionReportMiddleware');
const paymentFarmerInMonthReportMiddleware = require('../middlewares/report/paymentFarmerInMonthReportMiddleware');

require('./reportRoutesDefinitions');

const router = express.Router();

router.get(
  '/reports/farms/:farm_id/milk-production',
  authenticateToken,
  milkProductionReportMiddleware,
  reportController.getMilkProduction,
);

router.get(
  '/reports/farmers/:farmer_id/payment',
  authenticateToken,
  paymentFarmerInMonthReportMiddleware,
  reportController.getPaymentFarmerInMonth,
);

module.exports = router;
