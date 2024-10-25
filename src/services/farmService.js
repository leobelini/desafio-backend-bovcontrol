const connectDB = require('../config/db');
const farmRepository = require('../repositories/farmRepository');
const farmerRepository = require('../repositories/farmerRepository');

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

module.exports = { createFarm, getFarms };
