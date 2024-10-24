const express = require("express");

const reportController = require("../controllers/reportController.js");
const authenticateToken = require("../middlewares/auth/authenticate");
const milkProductionReportMiddleware = require("../middlewares/report/milkProductionReportMiddleware.js");

require("./reportRoutesDefinitions");

const router = express.Router();

router.get(
  "/reports/:farm_id/milk-production",
  authenticateToken,
  milkProductionReportMiddleware,
  reportController.getMilkProduction
);

module.exports = router;
