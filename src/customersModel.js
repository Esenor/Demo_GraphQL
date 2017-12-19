const Customer = require('./Customer')

/**
 * 
 */
let customersData = []

module.exports = {
  /**
   * 
   */
  addCustomer: function (name, lastName, mail) {
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
  addCustomers: function (customers) {
    let newCustomers = []
    customers.forEach((customer) => {
      newCustomers.push(this.addCustomer(customer.name, customer.lastName, customer.mail))
    })
    return newCustomers
  },
  /**
   * 
   */
  getCustomer: function (mail) {
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
  getCustomers: function () {
    return customersData
  }
}