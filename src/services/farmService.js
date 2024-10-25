import connectDB from '../config/db.js';
import farmRepository from '../repositories/farmRepository.js';
import farmerRepository from '../repositories/farmerRepository.js';

const createFarm = async (farmData) => {
  const db = await connectDB();
  const farmer = await farmerRepository.getFarmerById(db, farmData.farmerId);
  if (!farmer) {
    throw new Error('FARMER_NOT_FOUND');
  }

  const newFarmData = { ...farmData };
  newFarmData.farmerId = farmer._id;

  const result = await farmRepository.createFarm(db, newFarmData);

  farmerRepository.addFarmInFarmer(db, farmer._id, result);

  return result;
};

const getFarms = async () => {
  const db = await connectDB();
  return farmRepository.listFarms(db);
};

export { createFarm, getFarms };
