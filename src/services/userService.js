import connectDB from '../config/db.js';
import { hash } from '../utils/hash.js';
import userRepository from '../repositories/userRepository.js';

const createUser = async (userData) => {
  const db = await connectDB();

  const foundUser = await userRepository.getUserByEmail(db, userData.email);
  if (foundUser) {
    throw new Error('USER_ALREADY_EXISTS');
  }

  // Hash password
  const newUser = { ...userData };
  newUser.password = await hash(newUser.password, 10);

  return userRepository.createUser(db, newUser);
};

const getUserById = async (userId) => {
  const db = await connectDB();
  return userRepository.getUserById(db, userId);
};

const getUserByEmail = async (email) => {
  const db = await connectDB();
  return userRepository.getUserByEmail(db, email);
};

export default { createUser, getUserById, getUserByEmail };
