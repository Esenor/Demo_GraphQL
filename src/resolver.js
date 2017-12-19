const customersModel = require('./customersModel')

module.exports = {
  /**
   * 
   */
  getCustomer: (args) => {
    return customersModel.getCustomer(args.mail)
  },
  /**
   * 
   */
  addCustomer: (args) => {
    return customersModel.addCustomer(
      args.customer.name,
      args.customer.lastName,
      args.customer.mail,
      args.customer.addresses
    )
  },
  /**
   * 
   */
  addCustomers: (args) => {
    return customersModel.addCustomers(args.customers)
  },
  /**
   * 
   */
  listCustomers: () => {
    return customersModel.getCustomers()
  }
}
