import VoucherService from "../services/Voucher.service";
import { Request, Response } from "express";

export default new class VoucherCodeController {
  async createVoucher(req: Request, res: Response) {
    try {
      const { customer_email, offer_name, expiry_date } = req.body;
      const voucher = await VoucherService.createCode(customer_email, offer_name, expiry_date);

      res.send({
        voucher
      });
    }
    catch (err) {
      res.statusCode = err.status || 500;
      res.json({
        message: err.message,
      });
    }
  }

  async redeemVoucher(req: Request, res: Response) {
    try {
      const { customer_email, code } = req.body;
      const offer = await VoucherService.redeemCode(customer_email, code);
      res.send({
        offer
      });
    }
    catch (err) {
      res.statusCode = err.status || 500;
      res.json({
        message: err.message,
      });
    }
  }
}