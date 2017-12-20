const fs = require('fs')
const path = require('path')

module.exports = class SchemaParser {
  /**
   * Open, read and return the schema.gql
   * @return string
   */
  static getSchema () {
    let schemaPath = path.join(__dirname, 'schema.gql')
    try {
      return fs.readFileSync(schemaPath, 'utf8')
    } catch (error) {
      throw error
    }
  }
}
