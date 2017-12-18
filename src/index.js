const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const customersModel = require('./customersModel')

let schema = buildSchema(`  
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
`)

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
console.log('Started on localhost:3000')
