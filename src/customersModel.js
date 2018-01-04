const Customer = require('./entity/Customer')
const Address = require('./entity/Address')

/**
 * Temp data storage
 */
let customersData = []

module.exports = class CustomerModel{
  /**
   * Add customer to customer storage
   * @param {string} name
   * @param {string} lastName
   * @param {string} mail
   * @param {[Object]} addresses
   * @return {Customer}
   */
  static addCustomer (name, lastName, mail, addresses) {
    let exist = customersData.reduce((exist, customer) => {
      return exist || customer.mail === mail
    }, false)
    if (exist) {
      throw `Mail ${mail} already exist`
    } else {
      let tmpAddresses = []
      let baseAddresses = (addresses) ? addresses : []
      baseAddresses.forEach((rawAddress) => {
        tmpAddresses.push(new Address(rawAddress.street, rawAddress.city, rawAddress.zipcode))
      })
      let customer = new Customer(name, lastName, mail, tmpAddresses)
      customersData.push(customer)
      return customer
    }
  }
  /**
   * Add an array of customers data to customer storage
   * @param {[object]} customers
   * @return {[Customer]}
   */
  static addCustomers (customers) {
    let newCustomers = []
    customers.forEach((customer) => {
      newCustomers.push(this.addCustomer(customer.name, customer.lastName, customer.mail, (customer.addresses) ? customer.addresses : []))
    })
    return newCustomers
  }
  /**
   * Return a customer find by mail
   * @param {string} mail
   * @return {Customer}
   */
  static getCustomer (mail) {
    let customer = customersData.find((customer) => {
      return customer.mail === mail
    })
    if (customer) {
      return customer
    } else {
      throw `Customer not found`
    }
  }
  /**
   * Return all the customers storage
   * @return {[Customer]}
   */
  static getCustomers () {
    return customersData
  }
  /**
   * Truncate all the customers storage
   */
  static truncateCustomers() {
    customersData = []
  }
}
