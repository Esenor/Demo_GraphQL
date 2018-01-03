const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const SchemaParser = require('./SchemaParser')
const Resolver = require('./Resolver')
const devTool = require('./devTool')
const cors = require('cors')

const schema = SchemaParser.getSchema()
const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  credentials: true
}
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type,token')
  next()
}

/**
 * Create an Express application
 * @return {Express}
 */
function createApplication () {
  let application = express()

  application.use(cors(corsOptions))
  application.use(allowCrossDomain)

  application.use('/', graphqlHTTP({
    // Load GQL Schema
    schema: buildSchema(schema.toString()),
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
  console.log(`***************\n*** GRAPHQL ***\n\nStarted on http://localhost:${port}\n----------\nSchemas availables\n${schema}`)
  return application.listen(port)
}

// Start application
startServer(createApplication(), 3042)
devTool.addSampleCustomer()
