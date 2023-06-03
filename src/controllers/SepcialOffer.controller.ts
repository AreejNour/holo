import { Request, Response } from "express";
import SpecialOfferService from "../services/SpecialOffer.service";

export default new class SpecialOfferController {
  async createOffer(req: Request, res: Response) {
    try {
      const { name, percent } = req.body;
      const offer = await SpecialOfferService.createOffer(name, percent);
      
      res.send({
        offer
      })
    }
    catch (err) {
      res.statusCode = err.status || 500;
      res.json({
        message: err.message,
      });
    }
  }
}