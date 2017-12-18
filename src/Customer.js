const uuidv4 = require('uuid/v4')

module.exports = class Customer {
  /**
   * 
   * @param {*} name 
   * @param {*} lastName 
   * @param {*} mail 
   * @param {*} id 
   */
  constructor (name, lastName, mail, id) {
    this.id = (id) ? id : uuidv4()
    this.name = name
    this.lastName = lastName
    this.mail = mail
  }
}
