import { Op } from "sequelize";
import { VoucherCode } from "../models/VoucherCode";
import CustomerServie from "./Customer.Servie";
import SpecialOfferService from "./SpecialOffer.service";
import { SpecialOffer } from "../models/SpecialOffer";

export default new class VoucherCodeService {
  async isCodeExist(customer_id: number, offer_id: number) {
    try {
      const voucher = await VoucherCode.findOne({
        where: {
          CustomerId: customer_id,
          SpecialOfferId: offer_id,
          is_used: false,
          expiry_date: {
            [Op.gt]: new Date()
          }
        }
      });

      if (voucher) return true;
      return false;
    }
    catch (e) {
      throw e;
    }
  }

  async createCode(customer_mail: string, offer_name: string, expiry_date: Date) {
    try {

      const customer = await CustomerServie.getCustomer(customer_mail);

      if (!customer) {
        throw {
          message: `there is no customer with email '${customer_mail}'`,
          status: 404
        }
      }
      const offer = await SpecialOfferService.getOffer(offer_name);
      if (!offer) {
        throw {
          message: `there is no offer with name '${offer_name}'`,
          status: 404
        }
      }
      if (await this.isCodeExist(customer.id, offer.id)) {
        throw {
          message: `this code is already exists`,
          status: 400
        }
      }
      const voucher = await VoucherCode.create({
        code: this.randomCode().trim(),
        CustomerId: customer.id,
        SpecialOfferId: offer.id,
        expiry_date
      });
      return voucher;
    }
    catch (e) {
      throw e;
    }
  }
  randomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  async redeemCode(customer_mail: string, code: string) {
    try {
      const customer = await CustomerServie.getCustomer(customer_mail);

      if (!customer) {
        throw {
          message: `there is no customer with email '${customer_mail}'`,
          status: 404
        }

      }

      const voucher = await VoucherCode.findOne({
        where: {
          code: code.trim(),
          is_used: false,
          CustomerId: customer.id,
          expiry_date: {
            [Op.gt]: new Date()
          }
        },
        include: SpecialOffer
      });


      if (!voucher) {
        throw {
          message: `there is no valid voucher for ${customer_mail} with this code '${code}'`,
          status: 404
        }

      }
      voucher.is_used = true;
      voucher.used_at = new Date();
      await voucher.save();
      return voucher['SpecialOffer'];
    }
    catch (e) {
      throw e;
    }
  }

  async getCustomerCodes(customer_mail: string, pageNumber: number, pageSize: number) {
    try {
      const customer = await CustomerServie.getCustomer(customer_mail);

      if (!customer) {
        throw {
          message: `there is no customer with email '${customer_mail}'`,
          status: 404
        }
      }

      const result = await VoucherCode.findAndCountAll({
        where: {
          is_used: false,
          CustomerId: customer.id,
          expiry_date: {
            [Op.gt]: new Date()
          }
        },
        include: SpecialOffer,
        offset: pageNumber * pageSize,
        limit: pageSize
      });

      return { vouchers: result.rows, count: result.count };
    }
    catch (e) {
      throw e;
    }
  }
}