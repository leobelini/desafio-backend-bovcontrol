const Joi = require('joi');

const bodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signInMiddleware = async (req, res, next) => {
  const { error } = bodySchema.validate(req.body);
  if (error) return next(error);

  return next();
};

module.exports = signInMiddleware;
