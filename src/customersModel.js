const Customer = require('./Customer')
const Address = require('./Address')

/**
 * 
 */
let customersData = []

module.exports = {
  /**
   * 
   */
  addCustomer: function (name, lastName, mail, addresses) {
    let exist = customersData.reduce((exist, customer) => {
      return exist || customer.mail === mail
    }, false)
    if (exist) {
      throw `Mail ${mail} already exist`
    } else {
      let tmpAddresses = []
      addresses.forEach((rawAddress) => {
        tmpAddresses.push(new Address(rawAddress.street, rawAddress.city, rawAddress.zipcode))
      })
      console.log(tmpAddresses)
      let customer = new Customer(name, lastName, mail, tmpAddresses)
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
      newCustomers.push(this.addCustomer(customer.name, customer.lastName, customer.mail, (customer.addresses) ? customer.addresses : []))
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