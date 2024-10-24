const express = require('express');

const farmController = require('../controllers/farmController');
const authenticateToken = require('../middlewares/auth/authenticate');
const createFarmMiddleware = require('../middlewares/farm/createFarmMiddleware');

const router = express.Router();

router.post(
  '/farms',
  authenticateToken,
  createFarmMiddleware,
  farmController.createFarm,
);

router.get('/farms', authenticateToken, farmController.getFarms);

module.exports = router;
