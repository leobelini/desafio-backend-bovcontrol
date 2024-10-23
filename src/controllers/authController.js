const handler = require("../utils/httpHandler");
const authService = require("../services/authService");

/**
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 */

const signIn = async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  const user = await authService.getUserForSingIn(email, password);
  const jwt = await authService.createJwt(user);
  return handler.createResponse({ token: jwt });
};

const me = async (req, res) => {
  try {
    const user = req.user;
    return handler.createResponse({ user });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signIn: handler.create(signIn),
  me: handler.create(me),
};
