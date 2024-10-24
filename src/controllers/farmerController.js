const handler = require("../utils/httpHandler");
const farmerService = require("../services/farmerService");

/**
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 */
const createFarmer = async (req, res) => {
  try {
    await farmerService.createFarmer(req.body);
    return handler.createResponse(null, 201);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createFarmer: handler.create(createFarmer),
};
