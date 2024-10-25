import * as farmService from '../services/farmService.js';
import { createResponse, create } from '../utils/httpHandler.js';

/**
 * @param {import('express').Request} req - Request object
 */
const createFarmHandler = async (req) => {
  await farmService.createFarm(req.body);
  return createResponse(null, 201);
};

const getFarmsHandler = async () => {
  const farms = await farmService.getFarms();
  return createResponse(farms);
};

const farmController = {
  createFarm: create(createFarmHandler),
  getFarms: create(getFarmsHandler),
};

export default farmController;
