import * as Joi from "joi";

const redeemValidator = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    customer_email: Joi.string().email().required(),
    code: Joi.string().required()
  });
  const { error } = schema.validate(req.body);

  if (error?.message) {
    return res
      .status(400)
      .json({ message: error.message, errorKey: error?.details[0].path[0] });
  }
  next();
};
export default redeemValidator;
