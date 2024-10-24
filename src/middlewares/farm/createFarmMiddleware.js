const Joi = require('joi');

const bodySchema = Joi.object({
  name: Joi.string().required(),
  farmer_id: Joi.string().required(),
  distance: Joi.number().required(),
});

const createFarmMiddleware = async (req, res, next) => {
  const { error, value } = bodySchema.validate(req.body);
  if (error) return next(error);

  req.body = value;
  return next();
};

module.exports = createFarmMiddleware;
