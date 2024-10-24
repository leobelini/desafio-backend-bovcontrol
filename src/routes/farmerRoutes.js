const express = require("express");

const farmerController = require("../controllers/farmerController");
const authenticateToken = require("../middlewares/auth/authenticate");
const createFarmerMiddleware = require("../middlewares/farmer/createFarmerMiddleware");

require("./farmerRoutesDefinitions");

const router = express.Router();

router.post(
  "/farmers",
  authenticateToken,
  createFarmerMiddleware,
  farmerController.createFarmer
);

module.exports = router;
