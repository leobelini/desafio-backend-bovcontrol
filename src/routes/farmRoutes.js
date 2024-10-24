const express = require("express");

const farmController = require("../controllers/farmController");
const authenticateToken = require("../middlewares/auth/authenticate");
const createFarmMiddleware = require("../middlewares/farm/createFarmMiddleware");

require("./farmRoutersDefinitions");

const router = express.Router();

router.post(
  "/farms",
  authenticateToken,
  createFarmMiddleware,
  farmController.createFarm
);

module.exports = router;
