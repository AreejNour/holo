import { Customer } from "../models/Customer";

export default new class CustomerService {
  async isCustomerExist(email: string) {
    try {
      if (email == null) return false
      const customer = await this.getCustomer(email);

      if (customer) return true;
      return false;
    }
    catch (e) {
      throw e;
    }
  }

  async createCustomer(name: string, email: string) {
    try {
      if (await this.isCustomerExist(email)) {
        throw {
          message: `this customer with email'${email}' is already exists`,
          status: 400
        }
      }
      const customer = await Customer.create({ name, email });
      return customer;
    }
    catch (e) {
      throw e;
    }
  }
  async getCustomer(email: string) {
    try {
      if (email == null) return false;
      return await Customer.findOne({ where: { email } });
    }
    catch (e) {
      throw e;
    }
  }
}