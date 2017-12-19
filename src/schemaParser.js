const fs = require('fs')
const path = require('path')

module.exports = {
  /**
   * @return string
   */
  getSchema: () => {
    let schemaPath = path.join(__dirname, 'schema.gql')
    try {
      return fs.readFileSync(schemaPath, 'utf8')
    } catch (error) {
      throw error
    }
  }
}