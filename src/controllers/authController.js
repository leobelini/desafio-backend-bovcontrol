const handler = require("../utils/httpHandler");
const authService = require("../services/authService");

/**
 * @param {import('express').Request} req - Request object
 */

const signIn = async (req) => {
  const { body } = req;
  const { email, password } = body;

  const user = await authService.getUserForSingIn(email, password);
  const jwt = await authService.createJwt(user);
  return handler.createResponse({ token: jwt });
};

/**
 * @param {import('express').Request} req - Request object
 */
const me = async (req) => {
  const user = req.user;
  delete user.password;
  return handler.createResponse(user);
};

module.exports = {
  signIn: handler.create(signIn),
  me: handler.create(me),
};
