import { SpecialOffer } from "../models/SpecialOffer";

export default new class SpecialOfferService {
  async isOfferExist(name: string) {
    try {
      if (name == null) return false
      const offer = await this.getOffer(name);

      if (offer) return true;
      return false;
    }
    catch (e) {
      throw e;
    }
  }

  async createOffer(name: string, percent: number) {
    try {
      if (await this.isOfferExist(name)) {
        throw {
          message: `this offer with name '${name}' is already exists`,
          status: 400
        }
      }
      const offer = await SpecialOffer.create({ name, percent });
      return offer;
    }
    catch (e) {
      throw e;
    }
  }
  async getOffer(name: string) {
    try {
      if (name == null) return false
      return await SpecialOffer.findOne({ where: { name } });
    }
    catch (e) {
      throw e;
    }
  }
}