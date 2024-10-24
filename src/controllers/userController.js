const handler = require("../utils/httpHandler");
const userService = require("../services/userService");

/**
 * @param {import('express').Request} req - Request object
 */
const createUser = async (req) => {
  await userService.createUser(req.body);
  return handler.createResponse(null, 201);
};

module.exports = {
  createUser: handler.create(createUser),
};
