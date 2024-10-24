const Joi = require('joi');

const paramsSchema = Joi.object({
  farmer_id: Joi.string().required(),
  month: Joi.number().required(),
});

const milkProductionReportMiddleware = async (req, res, next) => {
  const { error } = paramsSchema.validate(req.params);
  if (error) return next(error);
  return next();
};

module.exports = milkProductionReportMiddleware;
