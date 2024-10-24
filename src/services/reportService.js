const connectDB = require("../config/db");
const utilsDate = require("../utils/date");
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

    const totalDaysInMonth = items.length
      ? utilsDate.getTotalDaysInMonth(items[0].date)
      : 0;

    for (const { date, liters } of items) {
      const { day } = utilsDate.splitDate(date);
      result[year].productions.push({ day, liters });
    }

    result[year].daily_average = totalDaysInMonth
      ? total_liters / totalDaysInMonth
      : 0;
  }

  return result;
};

module.exports = {
  getMilkProduction,
};
