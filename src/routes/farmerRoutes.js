const express = require("express");

const userController = require("../controllers/userController");
const authenticateToken = require("../middlewares/auth/authenticate");
const createFarmerMiddleware = require("../middlewares/farmer/createFarmerMiddleware");

require("./farmerRoutesDefinitions");

const router = express.Router();

router.post(
  "/farmers",
  authenticateToken,
  createFarmerMiddleware,
  userController.createUser
);

module.exports = router;
