const express = require("express");

const authenticateToken = require("../middlewares/auth/authenticate");
const milkProductionController = require("../controllers/milkProductionController");
const createMilkProductionMiddleware = require("../middlewares/milkProduction/createMilkProductionMiddleware");

require("./milkProductionRoutesDefinitions");

const router = express.Router();

router.post(
  "/milk-productions",
  authenticateToken,
  createMilkProductionMiddleware,
  milkProductionController.createMilkProduction
);

module.exports = router;
