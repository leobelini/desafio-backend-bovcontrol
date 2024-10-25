import joi from 'joi';

const bodySchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const createUserMiddleware = async (req, res, next) => {
  const { error } = bodySchema.validate(req.body);
  if (error) return next(error);

  return next();
};

export default createUserMiddleware;
