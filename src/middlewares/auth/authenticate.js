const jwt = require("jsonwebtoken");
const authService = require("../../services/authService");

const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  try {
    const authToken = token.split(" ")[1];

    const data = await authService.getDataJwt(authToken);
    const user = await authService.getUserForJwt(data.id);

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "TOKEN_IS_INVALID" });
  }

  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   if (err) return res.sendStatus(403);
  //   req.user = user;
  //   next();
  // });
};

module.exports = authenticateToken;
