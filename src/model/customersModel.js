const Customer = require('../entity/Customer')
const Address = require('../entity/Address')
const redis = require('../redis/connector')

module.exports = class CustomerModel{
  /**
   * Add customer to customer storage
   * @param {string} name
   * @param {string} lastName
   * @param {string} mail
   * @param {[Object]} addresses
   * @return {Customer}
   */
  static async addCustomerAsync (name, lastName, mail, addresses) {
    return addCustomerAsync(name, lastName, mail, addresses)
  }
  /**
   * Return a customer find by mail
   * @param {string} mail
   * @return {Customer}
   */
  static async getCustomerAsync (mail) {
    return getCustomerAsync(mail)
  }
  /**
   * Return all the customers storage
   * @return {[Customer]}
   */
  static async listCustomersAsync () {    
    return listCustomersAsync()
  }
  /**
   * Truncate all the customers storage
   */
  static truncateCustomers() {
    redis.flushAll()
  }
}

async function getCustomerAsync (mail) {
  return new Promise((resolve, reject) => {
    redis.readValueAsync(mail).then((data) => {
      if (data) {
        resolve(JSON.parse(data))
      } else {
        reject(`Customer not found`)
      }
    }).catch((error) => {
      reject(`Customer not found`)
    })
  })
}

async function addCustomerAsync (name, lastName, mail, addresses) {
  return new Promise(async(resolve, reject) => {
    getCustomerAsync(mail).then((customer) => {
      reject(`Mail ${mail} already exist`)
    }).catch((error) => {
      let tmpAddresses = []
      let baseAddresses = (addresses) ? addresses : []
      baseAddresses.forEach((rawAddress) => {
        tmpAddresses.push(new Address(rawAddress.street, rawAddress.city, rawAddress.zipcode))
      })
      let customer = new Customer(name, lastName, mail, tmpAddresses)
      redis.setValue(customer.mail, JSON.stringify(customer))
      resolve(customer)
    })
  })
}

async function listCustomersAsync () {
  return new Promise((resolve, reject) => {
    redis.mgetAsync('*').then((response) => {
      resolve(response.map((data) => {
        return JSON.parse(data)
      }))
    }).catch((error) => {
      reject(error)
    })
  })
}
