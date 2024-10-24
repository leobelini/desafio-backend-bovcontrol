const utilsDate = require("../utils/date");
const connectDB = require("../config/db");
const farmRepository = require("../repositories/farmRepository");
const milkProductionRepository = require("../repositories/milkProductionRepository");

const createMilkProduction = async (milkProductionData) => {
  const db = await connectDB();

  const farm = await farmRepository.getFarmById(db, milkProductionData.farm_id);
  if (!farm) throw new Error("FARM_NOT_FOUND");

  const calculatedMilkProduction = calculateMilkProduction(
    milkProductionData.date,
    milkProductionData.liters,
    farm.distance
  );

  const milkProductionDb = {
    farm_id: farm._id,
    production_date: milkProductionData.date,
    liters: milkProductionData.liters,
    price: calculatedMilkProduction.price,
    details: calculatedMilkProduction,
  };
  delete milkProductionDb.details.price;

  const milkProduction = await milkProductionRepository.createMilkProduction(
    db,
    milkProductionDb
  );

  return milkProduction;
};

const calculateMilkProduction = (date, liters, distance) => {
  let milk_base_price = 0;
  let distance_unit_50_price = 0;
  let distance_above_50_price = 0;
  let bonus_price = 0;

  // Set base price based on semester
  const semester = utilsDate.getSemester(date);
  if (semester === 1) {
    milk_base_price = 1.8;
    distance_unit_50_price = 0.05;
    distance_above_50_price = 0.06;
  } else if (semester === 2) {
    milk_base_price = 1.95;
    bonus_price = 0.01;
  }

  // Calculate distance price
  let distance_unit_50_cost = 0;
  let distance_above_50_cost = 0;
  let distance_unit_50_total = 0;
  let distance_above_50_total = 0;
  let distance_cost = 0;
  if (distance <= 50) {
    distance_unit_50_cost = distance_unit_50_price * distance;
    distance_unit_50_total = distance;
  } else {
    distance_unit_50_cost = distance_unit_50_price * 50;
    distance_above_50_cost = distance_above_50_price * (distance - 50);
    distance_unit_50_total = 50;
    distance_above_50_total = distance - 50;
  }
  distance_cost = distance_unit_50_cost + distance_above_50_cost;

  // Calculate bonus price
  let bonus_total = 0;
  if (liters > 10000 && semester === 2) {
    bonus_total = bonus_price * (liters - 10000);
  }

  // Calculate total price
  let milk_price = liters * milk_base_price;
  const price = milk_price - distance_cost + bonus_total;

  return {
    price,
    distance_unit_50_cost,
    distance_above_50_cost,
    distance_unit_50_total,
    distance_above_50_total,
    distance_cost,
    distance_unit_50_price,
    distance_above_50_price,
    bonus_price,
    milk_base_price,
    bonus_total,
    milk_price,
  };
};

module.exports = { createMilkProduction, calculateMilkProduction };
