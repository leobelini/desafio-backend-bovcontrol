const utilsDate = require('../utils/date');
const connectDB = require('../config/db');
const farmRepository = require('../repositories/farmRepository');
const milkProductionRepository = require('../repositories/milkProductionRepository');
const { getPricesByMonth } = require('../utils/production');

const getMilkProduction = async (db, farmId, date) => {
  const farm = await farmRepository.getFarmById(db, farmId);
  if (!farm) throw new Error('FARM_NOT_FOUND');

  const dateSplit = utilsDate.splitDate(date);
  let milkProduction = await milkProductionRepository.getMilkProductionByFarmIdAndDate(
    db,
    farmId,
    dateSplit.month,
    dateSplit.year,
  );
  if (!milkProduction) {
    const prices = getPricesByMonth(date);
    const milkProductionDb = {
      farmId: farm._id,
      month: dateSplit.month,
      year: dateSplit.year,
      productions: [],
      totalLiters: 0,
      totalDistance: 0,
      prices,
    };
    await milkProductionRepository.createMilkProduction(db, milkProductionDb);

    milkProduction = await milkProductionRepository.getMilkProductionByFarmIdAndDate(
      db,
      farmId,
      dateSplit.month,
      dateSplit.year,
    );
  }
  return milkProduction;
};

const createMilkProduction = async (milkProductionData) => {
  const db = await connectDB();

  const farm = await farmRepository.getFarmById(db, milkProductionData.farmId);
  if (!farm) throw new Error('FARM_NOT_FOUND');

  const milkProduction = await getMilkProduction(
    db,
    farm._id,
    milkProductionData.date,
  );

  const production = {
    date: milkProductionData.date,
    liters: milkProductionData.liters,
  };

  const totalDistance = milkProduction.totalDistance + farm.distance;
  const totalLiters = milkProduction.totalLiters + milkProductionData.liters;

  milkProduction.totalDistance = totalDistance;
  milkProduction.totalLiters = totalLiters;
  milkProduction.productions.push(production);

  return milkProductionRepository.registerMilkProduction(
    db,
    milkProduction._id,
    milkProduction,
  );
};

module.exports = { createMilkProduction };
