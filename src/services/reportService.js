const connectDB = require('../config/db');
const utilsDate = require('../utils/date');
const { formatPrice } = require('../utils/number');
const farmRepository = require('../repositories/farmRepository');
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

  const farm = await farmRepository.getFarmById(db, farmId);
  if (!farm) throw new Error('FARM_NOT_FOUND');

  const productions = await milkProductionRepository.getMilkProductionByFarmIdAndMonth(
    db,
    farmId,
    month,
  );

  const result = {};

  productions.forEach((production) => {
    const { year, totalLiters, productions: items } = production;

    if (!result[year]) {
      result[year] = { productions: [], totalLiters, dailyAverage: 0 };
    }

    items.forEach((item) => {
      const { date, liters } = item;
      const { day } = utilsDate.splitDate(date);
      result[year].productions.push({ day, liters });
    });

    result[year].dailyAverage = totalLiters / (items || []).length;
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
      year, month: milkProductionMonth, totalLiters, totalDistance, prices,
    } = row;
    const { price } = calculateMilkProduction(
      milkProductionMonth,
      totalLiters,
      totalDistance,
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

const getPaymentFarmInYear = async (farmId, year) => {
  const db = await connectDB();

  const farm = await farmRepository.getFarmById(db, farmId);
  if (!farm) throw new Error('FARM_NOT_FOUND');

  const milkProductions = await milkProductionRepository.getMilkProductionByFarmIdAndYear(
    db,
    farmId,
    year,
  );

  const result = milkProductions.reduce((acc, row) => {
    const {
      month, totalLiters, totalDistance, prices,
    } = row;

    const { price } = calculateMilkProduction(
      month,
      totalLiters,
      totalDistance,
      prices,
    );

    if (!acc[month]) {
      acc[month] = {
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
  getPaymentFarmInYear,
};
