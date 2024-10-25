import * as utilsDate from './date.js';

const calculateMilkProduction = (month, liters, distance, prices) => {
  const {
    milkBasePrice,
    distanceUnit50Price,
    distanceAbove50Price,
    bonusPrice,
  } = prices;

  const distanceCost = distance <= 50
    ? distance * distanceUnit50Price
    : 50 * distanceUnit50Price + (distance - 50) * distanceAbove50Price;

  const bonusTotal = liters > 10000 && month > 6 ? (liters - 10000) * bonusPrice : 0;

  const milkPrice = liters * milkBasePrice;
  const price = milkPrice - distanceCost + bonusTotal;

  return { price };
};

const getPricesByMonth = (date) => {
  let milkBasePrice = 0;
  let distanceUnit50Price = 0;
  let distanceAbove50Price = 0;
  let bonusPrice = 0;

  const semester = utilsDate.getSemester(date);
  if (semester === 1) {
    milkBasePrice = 1.8;
    distanceUnit50Price = 0.05;
    distanceAbove50Price = 0.06;
  } else if (semester === 2) {
    milkBasePrice = 1.95;
    bonusPrice = 0.01;
  }

  return {
    milkBasePrice,
    distanceUnit50Price,
    distanceAbove50Price,
    bonusPrice,
  };
};

export {
  calculateMilkProduction,
  getPricesByMonth,
};
