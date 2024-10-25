import { createResponse, create } from '../utils/httpHandler.js';
import milkProductionService  from '../services/milkProductionService.js';

/**
 * @param {import('express').Request} req - Request object
 */
const createMilkProductionHandler = async (req) => {
  await milkProductionService.createMilkProduction(req.body);
  return createResponse(null, 201);
};

const milkProductionController = {
  createMilkProduction:create(createMilkProductionHandler),
}

export default milkProductionController
