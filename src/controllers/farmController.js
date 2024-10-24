const handler = require('../utils/httpHandler');
const farmService = require('../services/farmService');

/**
 * @param {import('express').Request} req - Request object
 */
const createFarm = async (req) => {
  await farmService.createFarm(req.body);
  return handler.createResponse(null, 201);
};

const getFarms = async () => {
  const farms = await farmService.getFarms();
  return handler.createResponse(farms);
};

module.exports = {
  createFarm: handler.create(createFarm),
  getFarms: handler.create(getFarms),
};
