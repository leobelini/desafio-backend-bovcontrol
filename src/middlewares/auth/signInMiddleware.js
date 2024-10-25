import joi from 'joi';

const bodySchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const signInMiddleware = async (req, res, next) => {
  const { error } = bodySchema.validate(req.body);
  if (error) return next(error);

  return next();
};

export default signInMiddleware;
