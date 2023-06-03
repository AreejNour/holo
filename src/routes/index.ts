import express from "express";
const router = express.Router();
import OfferRouter from "./SpecialOffer.route"
import CustomerRouter from "./Customer.route"
import VoucherRouter from "./VoucherCode.router";
//common apis
router.use("/special_offers", OfferRouter);
router.use("/customers", CustomerRouter);
router.use("/voucher_codes", VoucherRouter);



export default router;
