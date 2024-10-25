/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const { fakerPT_BR: faker } = require('@faker-js/faker');

require('../config/env');

const userService = require('../services/userService');
const farmService = require('../services/farmService');
const farmerService = require('../services/farmerService');
const milkProductionService = require('../services/milkProductionService');
const { getTotalDaysInMonth } = require('../utils/date');

const seedUser = async () => {
  try {
    await userService.createUser({
      name: 'admin',
      email: 'admin@localhost',
      password: 'admin',
    });
  } catch (e) {
    console.log(e);
  }
};

const seedMilkProduction = async (farmId) => {
  const totalMilkProductionInMonth = 10;
  const rangeYears = 2;

  const startYear = new Date().getFullYear() - rangeYears;
  const endYear = new Date().getFullYear();

  for (let i = startYear; i <= endYear; i++) {
    for (let month = 0; month <= 12; month++) {
      const randNum = Math.floor(Math.random() * totalMilkProductionInMonth);
      for (let j = 0; j < randNum; j++) {
        try {
          const date = new Date();
          date.setFullYear(i);
          date.setMonth(month);
          const lastDay = getTotalDaysInMonth(date);
          const randDay = Math.floor(Math.random() * lastDay);
          date.setDate(randDay);

          const milkProductionData = {
            farmId,
            liters: Math.floor(Math.random() * 4000),
            date: date.toISOString(),
          };

          await milkProductionService.createMilkProduction(milkProductionData);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};

const seedFarm = async (farmerId) => {
  const totalFarmByFarmer = 5;

  const randNum = Math.floor(Math.random() * totalFarmByFarmer);
  for (let j = 0; j < randNum; j++) {
    try {
      const farmData = {
        name: faker.company.name(),
        farmerId,
        distance: Math.floor(Math.random() * 300),
      };
      const farmId = await farmService.createFarm(farmData);

      await seedMilkProduction(farmId);
    } catch (e) {
      console.log(e);
    }
  }
};

const seedFarmer = async () => {
  const totalFarmer = 10;

  for (let i = 0; i < totalFarmer; i++) {
    console.log(`Seed farmer ${i + 1} of ${totalFarmer}`);
    try {
      const farmerData = {
        name: faker.person.fullName(),
      };
      const farmerId = await farmerService.createFarmer(farmerData);

      await seedFarm(farmerId);
    } catch (e) {
      console.log(e);
    }
  }
};

const run = async () => {
  await seedUser();
  await seedFarmer();

  process.exit();
};

run();
