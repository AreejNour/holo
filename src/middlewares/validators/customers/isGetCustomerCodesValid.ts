import * as Joi from "joi";
import { Request, Response } from "express";


const getCustomerCodesValidator = (req: Request, res: Response, next: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    pageNumber: Joi.number().required(),
    pageSize: Joi.number().required()
  });
  const { error } = schema.validate(req.params);

  if (error?.message) {
    return res
      .status(400)
      .json({ message: error.message, errorKey: error?.details[0].path[0] });
  }
  next();
};
export default getCustomerCodesValidator;
