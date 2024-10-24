const connectDB = require('../config/db');
const utilsDate = require('../utils/date');
const { formatPrice } = require('../utils/number');
const { calculateMilkProduction } = require('../utils/production');
const farmerRepository = require('../repositories/farmerRepository');
const milkProductionRepository = require('../repositories/milkProductionRepository');

/**
 * @param {string} farmId
 * @param {number} month
 *
 * @returns {Array<Object>}
 * */
const getMilkProduction = async (farmId, month) => {
  const db = await connectDB();

  const productions = await milkProductionRepository.getMilkProductionByFarmIdAndMonth(
    db,
    farmId,
    month,
  );

  const result = {};

  productions.forEach((production) => {
    const { year, total_liters, productions: items } = production;

    if (!result[year]) {
      result[year] = { productions: [], total_liters, daily_average: 0 };
    }

    items.forEach((item) => {
      const { date, liters } = item;
      const { day } = utilsDate.splitDate(date);
      result[year].productions.push({ day, liters });
    });

    result[year].daily_average = total_liters / (items || []).length;
  });

  return result;
};

/**
 * @param {string} farmId
 * @param {number} month
 *
 * @returns {Array<Object>}
 * */
const getPaymentFarmerInMonth = async (farmerId, month) => {
  const db = await connectDB();

  const farmer = await farmerRepository.getFarmerById(db, farmerId);
  if (!farmer) throw new Error('FARMER_NOT_FOUND');

  const milkProductions = await milkProductionRepository.getMilkProductionByFarmsIdAndMonth(
    db,
    farmer.farms,
    month,
  );

  const result = milkProductions.reduce((acc, row) => {
    const {
      year, month, total_liters, total_distance, prices,
    } = row;
    const { price } = calculateMilkProduction(
      month,
      total_liters,
      total_distance,
      prices,
    );

    if (!acc[year]) {
      acc[year] = {
        pricePTBR: formatPrice(price, 'pt-BR', 'BRL'),
        priceUSD: formatPrice(price, 'en-US', 'USD'),
      };
    }
    return acc;
  }, {});

  return result;
};

module.exports = {
  getMilkProduction,
  getPaymentFarmerInMonth,
};
