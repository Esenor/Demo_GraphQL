const CustomersModel = require('../model/customersModel')
const devTool = require('../devTool')


module.exports = class Resolver {
  /**
   * Return list of all customer
   * @param {Object} args
   * @return {[Customers]}
   */
  static async getCustomer (args) {
    return await CustomersModel.getCustomerAsync(args.mail)
  }

  /**
   * Add a customer to model and return a customer
   * @param {Object} args
   * @return {Customer}
   */
  static async addCustomer (args) {
    return await CustomersModel.addCustomerAsync(
      args.customer.name,
      args.customer.lastName,
      args.customer.mail,
      args.customer.addresses
    )
  }

  /**
   * Return a array of all customer stored in the model
   * @param {Object} args
   * @return {[Customer]}
   */
  static async listCustomers (args) {
    return await CustomersModel.listCustomersAsync(args.keyFilter)
  }

  /**
   * 
   */
  static async generateRandomCustomer () {
    let customer = devTool.getSampleCustomer()
    return await CustomersModel.addCustomerAsync(customer.name, customer.lastName, customer.mail, customer.addresses)
  }

  /** 
   * 
   */
  static truncateCustomers () {
    CustomersModel.truncateCustomers()
    return 'truncate finish'
  }
}
