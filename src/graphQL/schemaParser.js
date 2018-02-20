const fs = require('fs')
const path = require('path')

module.exports = class SchemaParser {
  /**
   * Open, read and return the schema.gql
   * @return string
   */
  static getSchema(schemaPath = '../schema') {
    let gqlFile = fs.readdirSync(path.join(__dirname, schemaPath))
    let schema = gqlFile.reduce((schemaDefinition, fileName) => {
      if (/.gql/.test(fileName)) {
        return [schemaDefinition, fs.readFileSync(path.join(__dirname, schemaPath, fileName), 'utf8')].join('\n')
      }
    }, '')
    return schema
  }
}
