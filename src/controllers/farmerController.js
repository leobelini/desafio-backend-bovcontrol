import farmerService from '../services/farmerService.js';
import { createResponse, create } from '../utils/httpHandler.js';

/**
 * @param {import('express').Request} req - Request object
 */
const createFarmerHandler = async (req) => {
  await farmerService.createFarmer(req.body);
  return createResponse(null, 201);
};

const getFarmersHandler = async () => {
  const farmers = await farmerService.getFarmers();
  return createResponse(farmers);
};

const farmerController = {
  createFarmer: create(createFarmerHandler),
  getFarmers: create(getFarmersHandler),
};

export default farmerController;
