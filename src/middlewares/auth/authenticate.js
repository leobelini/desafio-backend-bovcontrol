const errorHandler = require("../global/errorHandler");
const authService = require("../../services/authService");

const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  try {
    const authToken = token.split(" ")[1];

    const data = await authService.getDataJwt(authToken);
    const user = await authService.getUserForJwt(data);

    req.user = user;
    next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

module.exports = authenticateToken;
