const handler = require("../utils/httpHandler");
const farmService = require("../services/farmService");

/**
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 */
const createFarm = async (req, res) => {
  await farmService.createFarm(req.body);
  return handler.createResponse(null, 201);
};

module.exports = { createFarm: handler.create(createFarm) };
