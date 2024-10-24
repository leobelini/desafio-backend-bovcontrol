const handler = require('../utils/httpHandler');
const farmerService = require('../services/farmerService');

/**
 * @param {import('express').Request} req - Request object
 */
const createFarmer = async (req) => {
  await farmerService.createFarmer(req.body);
  return handler.createResponse(null, 201);
};

const getFarmers = async () => {
  const farmers = await farmerService.getFarmers();
  return handler.createResponse(farmers);
};

module.exports = {
  createFarmer: handler.create(createFarmer),
  getFarmers: handler.create(getFarmers),
};
