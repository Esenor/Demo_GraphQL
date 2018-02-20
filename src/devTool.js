const faker = require('faker')

module.exports = {
  /**
   * Return 2 fake customers
   */
  getSampleCustomer: () => {
    return Object.assign({}, getFakeCustomer(), { addresses: getFakeAddressesList(2) })
  }
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
