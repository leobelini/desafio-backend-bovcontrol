const Joi = require("joi");

const paramsSchema = Joi.object({
  farm_id: Joi.string().required(),
});

const querySchema = Joi.object({
  month: Joi.number().required(),
});

const milkProductionReportMiddleware = async (req, res, next) => {
  const { error } = paramsSchema.validate(req.params);
  if (error) return next(error);

  const { error: queryError } = querySchema.validate(req.query);
  if (queryError) return next(queryError);
  next();
};

module.exports = milkProductionReportMiddleware;
