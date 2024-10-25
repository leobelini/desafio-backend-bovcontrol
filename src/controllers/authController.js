import { createResponse, create } from '../utils/httpHandler.js';
import { getUserForSingIn, createJwt } from '../services/authService.js';

/**
 * @param {import('express').Request} req - Request object
 */

const signInHandler = async (req) => {
  const { body } = req;
  const { email, password } = body;

  const user = await getUserForSingIn(email, password);
  const jwt = await createJwt(user);
  return createResponse({ token: jwt });
};

/**
 * @param {import('express').Request} req - Request object
 */
const meHandler = async (req) => {
  const { user } = req;
  delete user.password;
  return createResponse(user);
};

const authController = {
  signIn:create(signInHandler),
  me:create(meHandler),
};

export default authController;