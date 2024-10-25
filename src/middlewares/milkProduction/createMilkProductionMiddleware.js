import joi from 'joi';

const bodySchema = joi.object({
  farmId: joi.string().required(),
  liters: joi.number().required(),
  date: joi.date().required(),
});

const createMilkProductionMiddleware = (req, res, next) => {
  const { error, value } = bodySchema.validate(req.body);
  if (error) return next(error);

  req.body = value;
  return next();
};

export default createMilkProductionMiddleware;
