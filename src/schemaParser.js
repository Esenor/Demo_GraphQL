const fs = require('fs')
const path = require('path')

const typeSchema = 'type.gql'
const inputSchema = 'input.gql'
const mutationSchema = 'mutation.gql'
const querySchema = 'query.gql'

module.exports = class SchemaParser {
  /**
   * Open, read and return the schema.gql
   * @return string
   */
  static getSchema () {
    // Schema parser helper
    const getSchema = (schemaName) => {
      let schemaPath = path.join(__dirname, 'schema', schemaName)
      try {
        return fs.readFileSync(schemaPath, 'utf8')
      } catch (error) {
        throw error
      }
    }
    // Read all schema
    try {
      this.query = getSchema(querySchema)
      this.input = getSchema(inputSchema)
      this.type = getSchema(typeSchema)
      this.mutation = getSchema(mutationSchema) 
    } catch (error) {
      throw error 
    }
    // Build and return Schema closure
    return {
      schema: {
        query: this.query,
        input: this.input,
        type: this.type,
        mutation: this.mutation
      },
      toString: () => {
        return [
          this.query,
          this.input,
          this.type,
          this.mutation
        ].join('')
      }
    }
  }
}
