import joi from 'joi';

const bodySchema = joi.object({
  name: joi.string().required(),
  farmerId: joi.string().required(),
  distance: joi.number().required(),
});

const createFarmMiddleware = async (req, res, next) => {
  const { error, value } = bodySchema.validate(req.body);
  if (error) return next(error);

  req.body = value;
  return next();
};

export default createFarmMiddleware;
