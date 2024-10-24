const utilsDate = require('../utils/date');
const connectDB = require('../config/db');
const farmRepository = require('../repositories/farmRepository');
const milkProductionRepository = require('../repositories/milkProductionRepository');
const { getPricesByMonth } = require('../utils/production');

const getMilkProduction = async (db, farm_id, date) => {
  const farm = await farmRepository.getFarmById(db, farm_id);
  if (!farm) throw new Error('FARM_NOT_FOUND');

  const dateSplit = utilsDate.splitDate(date);
  let milkProduction = await milkProductionRepository.getMilkProductionByFarmIdAndDate(
    db,
    farm_id,
    dateSplit.month,
    dateSplit.year,
  );
  if (!milkProduction) {
    const prices = getPricesByMonth(date);
    const milkProductionDb = {
      farm_id: farm._id,
      month: dateSplit.month,
      year: dateSplit.year,
      productions: [],
      total_liters: 0,
      total_distance: 0,
      prices,
    };
    await milkProductionRepository.createMilkProduction(db, milkProductionDb);

    milkProduction = await milkProductionRepository.getMilkProductionByFarmIdAndDate(
      db,
      farm_id,
      dateSplit.month,
      dateSplit.year,
    );
  }
  return milkProduction;
};

const createMilkProduction = async (milkProductionData) => {
  const db = await connectDB();

  const farm = await farmRepository.getFarmById(db, milkProductionData.farm_id);
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

  const total_distance = milkProduction.total_distance + farm.distance;
  const total_liters = milkProduction.total_liters + milkProductionData.liters;

  milkProduction.total_distance = total_distance;
  milkProduction.total_liters = total_liters;
  milkProduction.productions.push(production);

  return milkProductionRepository.registerMilkProduction(
    db,
    milkProduction._id,
    milkProduction,
  );
};

module.exports = { createMilkProduction };
