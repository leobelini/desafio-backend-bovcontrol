import reportService from '../services/reportService.js';
import { createResponse, create } from '../utils/httpHandler.js';

const getMilkProductionHandler = async (req) => {
  const milkProductions = await reportService.getMilkProduction(
    req.params.farmId,
    parseInt(req.params.month, 10),
  );
  return createResponse(milkProductions);
};

const getPaymentFarmerInMonthHandler = async (req) => {
  const milkProductions = await reportService.getPaymentFarmerInMonth(
    req.params.farmerId,
    parseInt(req.params.month, 10),
  );
  return createResponse(milkProductions);
};

const getPaymentFarmInYearHandler = async (req) => {
  const milkProductions = await reportService.getPaymentFarmInYear(
    req.params.farmId,
    parseInt(req.params.year, 10),
  );
  return createResponse(milkProductions);
};

const reportController = {
  getMilkProduction: create(getMilkProductionHandler),
  getPaymentFarmerInMonth: create(getPaymentFarmerInMonthHandler),
  getPaymentFarmInYear: create(getPaymentFarmInYearHandler),
};

export default reportController;
