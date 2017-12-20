const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const SchemaParser = require('./SchemaParser')
const Resolver = require('./Resolver')
const devTool = require('./devTool')

/**
 * Create an Express application
 * @return {Express}
 */
function createApplication () {
  let application = express()
  application.use('/', graphqlHTTP({
    // Load GQL Schema
    schema: buildSchema(SchemaParser.getSchema()),
    rootValue: Resolver,
    graphiql: true
  }))
  return application
}

/**
 * Start the Express Server of the Express Application
 * @param {*} application 
 * @param {*} port
 * @return {Server}
 */
function startServer (application, port) {
  console.log(`***************\n*** GRAPHQL ***\n\nStarted on http://localhost:3000\n----------\nSchemas availables\n${SchemaParser.getSchema()}`)
  return application.listen(port)
}

// Start application
startServer(createApplication(), 3000)
devTool.addSampleCustomer()
