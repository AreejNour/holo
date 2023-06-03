import * as Joi from "joi";

const createValidator = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    percent: Joi.number().min(1).required(),
  });
  const { error } = schema.validate(req.body);

  if (error?.message) {
    return res
      .status(400)
      .json({ message: error.message, errorKey: error?.details[0].path[0] });
  }
  next();
};
export default createValidator;
