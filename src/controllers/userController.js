const handler = require("../utils/httpHandler");
const userService = require("../services/userService");

/**
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 */
const createUser = async (req, res) => {
  try {
    await userService.createUser(req.body);
    return handler.createResponse(null, 201);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser: handler.create(createUser),
};
