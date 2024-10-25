import jwt from 'jsonwebtoken';

import { compare } from '../utils/hash.js';
import userService from './userService.js';

const createJwt = async (user) => {
  const token = jwt.sign(
    {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    },
  );

  return token;
};

const getUserForSingIn = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) throw new Error('USER_NOT_FOUND');

  const passwordIsValid = await compare(password, user.password);
  if (!passwordIsValid) throw new Error('USER_NOT_FOUND');

  delete user.password;

  return user;
};

const getDataJwt = async (token) => {
  try {
    const tokenChecked =jwt.verify(token, process.env.JWT_SECRET);
    return tokenChecked;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('TOKEN_IS_EXPIRED');
    }

    throw new Error('TOKEN_IS_INVALID');
  }
};

const getUserForJwt = async (tokenData) => {
  const user = await userService.getUserById(tokenData.id);

  return user;
};

export {
  getUserForJwt,
  getDataJwt,
  getUserForSingIn,
  createJwt,
};
