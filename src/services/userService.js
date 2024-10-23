const connectDB = require("../config/db");
const { hash, compare } = require("../utils/hash");
const userRepository = require("../repositories/userRepository");

const createUser = async (userData) => {
  const db = await connectDB();

  const foundUser = await userRepository.getUserByEmail(db, userData.email);
  if (foundUser) {
    throw new Error("USER_ALREADY_EXISTS");
  }

  // Hash password
  userData.password = await hash(userData.password, 10);

  return await userRepository.createUser(db, userData);
};

const getUserById = async (userId) => {
  throw new Error("NOT_IMPLEMENTED");
};

const getUserByEmail = async (email) => {
  const db = await connectDB();
  return await userRepository.getUserByEmail(db, email);
};

module.exports = { createUser, getUserById, getUserByEmail };
