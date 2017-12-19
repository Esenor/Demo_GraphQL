const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const schemaParser = require('./schemaParser')
const resolver = require('./resolver')

function createApplication () {
  let application = express()
  application.use('/', graphqlHTTP({
    schema: buildSchema(schemaParser.getSchema()),
    rootValue: resolver,
    graphiql: true
  }))
  return application
}

function startServer (application, port) {
  console.log(`***************\n*** GRAPHQL ***\n\nStarted on http://localhost:3000\n----------\nSchemas availables\n${schemaParser.getSchema()}`)
  return application.listen(port)
}

startServer(createApplication(), 3000)
