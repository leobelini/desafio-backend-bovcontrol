import userService  from '../services/userService.js';
import { createResponse, create } from '../utils/httpHandler.js';

/**
 * @param {import('express').Request} req - Request object
 */
const createUserHandler = async (req) => {
  await userService.createUser(req.body);
  return createResponse(null, 201);
};

const createUser = create(createUserHandler);

export default { createUser };