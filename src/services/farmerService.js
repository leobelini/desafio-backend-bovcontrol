import connectDB from '../config/db.js';
import farmerRepository from '../repositories/farmerRepository.js';

const createFarmer = async (farmerData) => {
  const db = await connectDB();
  return farmerRepository.createFarmer(db, farmerData);
};

const getFarmers = async () => {
  const db = await connectDB();
  return farmerRepository.getFarmers(db);
};

const farmerService = {
  createFarmer,
  getFarmers,
};

export default farmerService;