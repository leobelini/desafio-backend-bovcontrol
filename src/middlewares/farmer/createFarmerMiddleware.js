const Joi = require("joi");

const bodySchema = Joi.object({
  name: Joi.string().required(),
});

const createFarmerMiddleware = async (req, res, next) => {
  const { error } = bodySchema.validate(req.body);
  if (error) return next(error);

  next();
};

module.exports = createFarmerMiddleware;
