import joi from 'joi';

const bodySchema = joi.object({
  name: joi.string().required(),
});

const createFarmerMiddleware = async (req, res, next) => {
  const { error } = bodySchema.validate(req.body);
  if (error) return next(error);

  return next();
};

export default createFarmerMiddleware;
