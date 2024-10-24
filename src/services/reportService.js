const connectDB = require("../config/db");
const utilsDate = require("../utils/date");
const { formatPrice } = require("../utils/number");
const farmerRepository = require("../repositories/farmerRepository");
const milkProductionRepository = require("../repositories/milkProductionRepository");

/**
 * @param {string} farmId
 * @param {number} month
 *
 * @returns {Array<Object>}
 **/
const getMilkProduction = async (farmId, month) => {
  const db = await connectDB();

  const productions =
    await milkProductionRepository.getMilkProductionByFarmIdAndMonth(
      db,
      farmId,
      month
    );

  const result = {};

  for (const { year, total_liters, productions: items } of productions) {
    if (!result[year]) {
      result[year] = { productions: [], total_liters, daily_average: 0 };
    }

    for (const { date, liters } of items) {
      const { day } = utilsDate.splitDate(date);
      result[year].productions.push({ day, liters });
    }

    result[year].daily_average = total_liters / (items || []).length;
  }

  return result;
};

/**
 * @param {string} farmId
 * @param {number} month
 *
 * @returns {Array<Object>}
 **/
const getPaymentFarmerInMonth = async (farmerId, month) => {
  const db = await connectDB();

  const farmer = await farmerRepository.getFarmerById(db, farmerId);
  if (!farmer) throw new Error("FARMER_NOT_FOUND");

  const milkProductions =
    await milkProductionRepository.getMilkProductionByFarmsIdAndMonth(
      db,
      farmer.farms,
      month
    );

  const result = milkProductions.reduce((acc, row) => {
    const { year, month, total_liters, total_distance, prices } = row;
    const { price } = calculateMilkProduction(
      month,
      total_liters,
      total_distance,
      prices
    );

    if (!acc[year]) {
      acc[year] = {
        pricePTBR: formatPrice(price, "pt-BR", "BRL"),
        priceUSD: formatPrice(price, "en-US", "USD"),
      };
    }
    return acc;
  }, {});

  return result;
};

const calculateMilkProduction = (month, liters, distance, prices) => {
  const {
    milk_base_price,
    distance_unit_50_price,
    distance_above_50_price,
    bonus_price,
  } = prices;

  const distance_cost =
    distance <= 50
      ? distance * distance_unit_50_price
      : 50 * distance_unit_50_price + (distance - 50) * distance_above_50_price;

  const bonus_total =
    liters > 10000 && month > 6 ? (liters - 10000) * bonus_price : 0;

  const milk_price = liters * milk_base_price;
  const price = milk_price - distance_cost + bonus_total;

  return { price };
};

module.exports = {
  getMilkProduction,
  getPaymentFarmerInMonth,
};
