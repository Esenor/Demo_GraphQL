const Customer = require('./Customer')

/**
 * 
 */
let customersData = []

module.exports = {
  /**
   * 
   */
  addCustomer: (name, lastName, mail) => {
    let exist = customersData.reduce((exist, customer) => {
      return exist || customer.mail === mail
    }, false)
    if (exist) {
      throw `Mail ${mail} already exist`
    } else {
      let customer = new Customer(name, lastName, mail)
      customersData.push(customer)
      return customer
    }
  },
  /**
   * 
   */
  getCustomer: (mail) => {
    let customer = customersData.find((customer) => {
      return customer.mail === mail
    })
    if (customer) {
      return customer
    } else {
      throw `Customer not found`
    }
  },
  /**
   * 
   */
  getCustomers: () => {
    return customersData
  }
}