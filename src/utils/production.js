const calculateMilkProduction = (month, liters, distance, prices) => {
  const {
    milk_base_price,
    distance_unit_50_price,
    distance_above_50_price,
    bonus_price,
  } = prices;

  const distance_cost = distance <= 50
    ? distance * distance_unit_50_price
    : 50 * distance_unit_50_price + (distance - 50) * distance_above_50_price;

  const bonus_total = liters > 10000 && month > 6 ? (liters - 10000) * bonus_price : 0;

  const milk_price = liters * milk_base_price;
  const price = milk_price - distance_cost + bonus_total;

  return { price };
};

const getPricesByMonth = (date) => {
  let milk_base_price = 0;
  let distance_unit_50_price = 0;
  let distance_above_50_price = 0;
  let bonus_price = 0;

  const semester = utilsDate.getSemester(date);
  if (semester === 1) {
    milk_base_price = 1.8;
    distance_unit_50_price = 0.05;
    distance_above_50_price = 0.06;
  } else if (semester === 2) {
    milk_base_price = 1.95;
    bonus_price = 0.01;
  }

  return {
    milk_base_price,
    distance_unit_50_price,
    distance_above_50_price,
    bonus_price,
  };
};

module.exports = {
  calculateMilkProduction,
  getPricesByMonth,
};
