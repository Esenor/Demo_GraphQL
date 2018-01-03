const CustomersModel = require('./CustomersModel')
const devTool = require('./devTool')

module.exports = class Resolver {
  /**
   * Return list of all customer
   * @param {Object} args
   * @return {[Customers]}
   */
  static getCustomer (args) {
    return CustomersModel.getCustomer(args.mail)
  }
  /**
   * Add a customer to model and return a customer
   * @param {Object} args
   * @return {Customer}
   */
  static addCustomer (args) {
    return CustomersModel.addCustomer(
      args.customer.name,
      args.customer.lastName,
      args.customer.mail,
      args.customer.addresses
    )
  }
  /**
   * Add customers to model and return an array of customers
   * @param {Object} args
   * @return {[Customer]}
   */
  static addCustomers (args) {
    return CustomersModel.addCustomers(args.customers)
  }
  /**
   * Return a array of all customer stored in the model
   * @param {Object} args
   * @return {[Customer]}
   */
  static listCustomers () {
    return CustomersModel.getCustomers()
  }

  static generateRandomCustomers() {
    return CustomersModel.addCustomers(devTool.getSampleCustomer())
  }
}
