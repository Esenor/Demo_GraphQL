const uuidv4 = require('uuid/v4')

module.exports = class Address {
  /**
   * 
   * @param {*} street 
   * @param {*} city 
   * @param {*} zipcode 
   * @param {*} id 
   */
  constructor(street, city, zipcode, id) {
    this.id = (id) ? id : uuidv4()
    this.street = street
    this.city = city
    this.zipcode = zipcode
  }
}
