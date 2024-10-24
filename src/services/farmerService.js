const connectDB = require('../config/db');
const farmerRepository = require('../repositories/farmerRepository');

const createFarmer = async (farmerData) => {
  const db = await connectDB();
  return farmerRepository.createFarmer(db, farmerData);
};

const getFarmers = async () => {
  const db = await connectDB();
  return farmerRepository.getFarmers(db);
};

module.exports = {
  createFarmer,
  getFarmers,
};
