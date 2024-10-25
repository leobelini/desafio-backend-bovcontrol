const Joi = require('joi');

const bodySchema = Joi.object({
  farmId: Joi.string().required(),
  liters: Joi.number().required(),
  date: Joi.date().required(),
});

const createMilkProductionMiddleware = (req, res, next) => {
  const { error, value } = bodySchema.validate(req.body);
  if (error) return next(error);

  req.body = value;
  return next();
};

module.exports = createMilkProductionMiddleware;
