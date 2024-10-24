const Joi = require("joi");

const bodySchema = Joi.object({
  farm_id: Joi.string().required(),
  liters: Joi.number().required(),
  date: Joi.date().required(),
});

const createMilkProductionMiddleware = (req, res, next) => {
  const { error, value } = bodySchema.validate(req.body);
  if (error) return next(error);

  req.body = value;
  next();
};

module.exports = createMilkProductionMiddleware;
