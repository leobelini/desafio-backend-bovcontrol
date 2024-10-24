const express = require('express');

const reportController = require('../controllers/reportController');
const authenticateToken = require('../middlewares/auth/authenticate');
const milkProductionReportMiddleware = require('../middlewares/report/milkProductionReportMiddleware');
const paymentFarmInYearReportMiddleware = require('../middlewares/report/paymentFarmInYearReportMiddleware');
const paymentFarmerInMonthReportMiddleware = require('../middlewares/report/paymentFarmerInMonthReportMiddleware');

const router = express.Router();

router.get(
  '/reports/farms/:farm_id/milk-production/month/:month',
  authenticateToken,
  milkProductionReportMiddleware,
  reportController.getMilkProduction,
);

router.get(
  '/reports/farms/:farm_id/payment/year/:year',
  authenticateToken,
  paymentFarmInYearReportMiddleware,
  reportController.getPaymentFarmInYear,
);

router.get(
  '/reports/farmers/:farmer_id/payment/month/:month',
  authenticateToken,
  paymentFarmerInMonthReportMiddleware,
  reportController.getPaymentFarmerInMonth,
);

module.exports = router;
