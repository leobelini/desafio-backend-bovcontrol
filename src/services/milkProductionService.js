import connectDB from '../config/db.js';
import { splitDate } from '../utils/date.js';
import { getPricesByMonth } from '../utils/production.js';
import farmRepository from '../repositories/farmRepository.js';
import milkProductionRepository from '../repositories/milkProductionRepository.js';

const getMilkProduction = async (db, farmId, date) => {
  const farm = await farmRepository.getFarmById(db, farmId);
  if (!farm) throw new Error('FARM_NOT_FOUND');

  const dateSplit = splitDate(date);
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

export default { createMilkProduction };
