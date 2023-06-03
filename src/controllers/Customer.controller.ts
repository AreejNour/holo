import { Request, Response } from "express";
import CustomerServie from "../services/Customer.Servie";
import VoucherService from "../services/Voucher.service";

export default new class CustomerController {
  async createCustomer(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const customer = await CustomerServie.createCustomer(name, email);

      res.send({
        customer
      })
    }
    catch (err) {
      res.statusCode = err.status || 500;
      res.json({
        message: err.message,
      });
    }
  }
  async getCustomerCodes(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const pageNumber = Number(req.params.pageNumber) || 0;
      const pageSize = Number(req.params.pageSize) || 20;

      const { vouchers, count } = await VoucherService.getCustomerCodes(email, pageNumber, pageSize);
      res.send({
        vouchers,
        count
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