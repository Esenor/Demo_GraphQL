const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const customersModel = require('./customersModel')

let rawSchema = `  
  type Customer {
    id: ID
    name: String
    lastName: String
    mail: String
  }

  type Query {
    getCustomer(mail: String!): Customer
    addCustomer(name: String!, lastName: String!, mail: String!): Customer
    listCustomers: [Customer]
  }
`
let schema = buildSchema(rawSchema)

let root = {
  getCustomer: (args) => {
    return customersModel.getCustomer(args.mail)
  },
  addCustomer: (args) => {
    return customersModel.addCustomer(args.name, args.lastName, args.mail)
  },
  listCustomers: () => {
    return customersModel.getCustomers()
  }
}

let app = express()
app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

let server = app.listen(3000)
console.log(`***************\n*** GRAPHQL ***\n\nStarted on http://localhost:3000\n----------\nSchemas availables\n${rawSchema}`)
