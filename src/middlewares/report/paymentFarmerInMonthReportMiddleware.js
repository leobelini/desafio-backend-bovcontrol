import joi from 'joi';

const paramsSchema = joi.object({
  farmerId: joi.string().required(),
  month: joi.number().required(),
});

const milkProductionReportMiddleware = async (req, res, next) => {
  const { error } = paramsSchema.validate(req.params);
  if (error) return next(error);
  return next();
};

export default milkProductionReportMiddleware;
