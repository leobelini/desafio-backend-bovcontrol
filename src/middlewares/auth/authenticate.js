import {errorHandler} from '../global/errorHandler.js';
import { getDataJwt, getUserForJwt } from '../../services/authService.js';

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(403);

  try {
    const authToken = token.split(' ')[1];

    const data = await getDataJwt(authToken);
    const user = await getUserForJwt(data);

    req.user = user;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

export default authenticateToken;
