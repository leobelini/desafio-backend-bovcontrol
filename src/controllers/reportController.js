const handler = require('../utils/httpHandler');
const reportService = require('../services/reportService');

const getMilkProduction = async (req) => {
  const milkProductions = await reportService.getMilkProduction(
    req.params.farm_id,
    parseInt(req.query.month, 10),
  );
  return handler.createResponse(milkProductions);
};

const getPaymentFarmerInMonth = async (req) => {
  const milkProductions = await reportService.getPaymentFarmerInMonth(
    req.params.farmer_id,
    parseInt(req.query.month, 10),
  );
  return handler.createResponse(milkProductions);
};

const getPaymentFarmInYear = async (req) => {
  const milkProductions = await reportService.getPaymentFarmInYear(
    req.params.farm_id,
    parseInt(req.params.year, 10),
  );
  return handler.createResponse(milkProductions);
};

module.exports = {
  getMilkProduction: handler.create(getMilkProduction),
  getPaymentFarmerInMonth: handler.create(getPaymentFarmerInMonth),
  getPaymentFarmInYear: handler.create(getPaymentFarmInYear),
};
