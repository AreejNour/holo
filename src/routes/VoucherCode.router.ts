import { Router } from "express";
import createValidator from "../middlewares/validators/voucher_codes/isCreateValid";
import redeemValidator from "../middlewares/validators/voucher_codes/isRedeemValid";

import VoucherCodeController from "../controllers/VoucherCode.controller";

const VoucherRouter = Router();

VoucherRouter.post("/", createValidator, VoucherCodeController.createVoucher);
VoucherRouter.put("/redeem", redeemValidator, VoucherCodeController.redeemVoucher);


export default VoucherRouter;
