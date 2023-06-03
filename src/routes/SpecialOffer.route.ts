import { Router } from "express";
import SepcialOfferController from "../controllers/SepcialOffer.controller";
import createValidator from "../middlewares/validators/special_offers/isCreateValid";

const OfferRouter = Router();

OfferRouter.post("/", createValidator, SepcialOfferController.createOffer);

export default OfferRouter;
