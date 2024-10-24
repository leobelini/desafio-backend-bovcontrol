const Joi = require('joi');

const paramsSchema = Joi.object({
  farm_id: Joi.string().required(),
  year: Joi.number().required(),
});

const paymentFarmInYearReportMiddleware = async (req, res, next) => {
  const { error } = paramsSchema.validate(req.params);
  if (error) return next(error);

  return next();
};

module.exports = paymentFarmInYearReportMiddleware;
