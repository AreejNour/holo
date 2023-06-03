import { Router } from "express";
import createValidator from "../middlewares/validators/customers/isCreateValid";
import CustomerController from "../controllers/Customer.controller";
import CustomerCodeValidator from "../middlewares/validators/customers/isGetCustomerCodesValid";

const CustomerRouter = Router();

CustomerRouter.post("/", createValidator, CustomerController.createCustomer);
CustomerRouter.get("/codes/:email/:pageNumber/:pageSize", CustomerCodeValidator, CustomerController.getCustomerCodes);


export default CustomerRouter;
