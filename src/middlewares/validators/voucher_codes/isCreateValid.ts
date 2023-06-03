import * as Joi from "joi";

const createValidator = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    offer_name: Joi.string().required(),
    customer_email: Joi.string().email().required(),
    expiry_date: Joi.date().required()
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
