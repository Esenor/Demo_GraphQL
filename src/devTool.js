const CustomerModel = require('./CustomersModel')
const faker = require('faker')

module.exports = {
  /**
   * Add 3 customer to customers storage
   */
  addSampleCustomer: () => {
    CustomerModel.addCustomers(getFakeCustomers([0, 1, 2, 3]))
  }
}

/**
 * Return fake list of Customer
 * @param {[number]} addressesAssignation 
 */
function getFakeCustomers (addressesAssignation = []) {
  let customers = []
  addressesAssignation.forEach((totalAddress) => {
    customers.push(Object.assign({}, getFakeCustomer(), {addresses: getFakeAddressesList(totalAddress)}))
  })
  return customers
}

/**
 * Return a fake list of addresses
 * @param {number} totalAddress
 * @return {[object]}
 */
function getFakeAddressesList (totalAddress) {
  let addresses = []
  for (let i = 0; i < totalAddress; i++) {
    addresses.push({
      street: faker.fake('{{address.streetAddress}}'),
      city: faker.fake('{{address.city}}'),
      zipcode: faker.fake('{{address.zipCode}}')
    })
  }
  return addresses
}

/**
 * Return fake customer
 * @return {Object}
 */
function getFakeCustomer () {
  return {
    name: faker.fake('{{name.firstName}}'),
    lastName: faker.fake('{{name.lastName}}'),
    mail: faker.fake('{{internet.email}}'),
    addresses: []
  }
}
