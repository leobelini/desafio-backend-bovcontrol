const handler = require('../utils/httpHandler');
const milkProductionService = require('../services/milkProductionService');

/**
 * @param {import('express').Request} req - Request object
 */
const createMilkProduction = async (req) => {
  await milkProductionService.createMilkProduction(req.body);
  return handler.createResponse(null, 201);
};

module.exports = {
  createMilkProduction: handler.create(createMilkProduction),
};
