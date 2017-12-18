#TW_GraphQL#

## usage ##

    $ npm i
    $ npm start

## API consumption ##

### Schema ###

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

### Add customer ###

    curl -X POST \
    http://localhost:3000/ \
    -H 'Content-Type: application/json' \
    -d '{"query":"{addCustomer(name: \"Lorem\", lastName: \"Ipsum\", mail:  \"lorem_ipsum@gmail.com\") {id,mail},}"}'

### Get customer by mail###

    curl -X POST \
    http://localhost:3000/ \
    -H 'Content-Type: application/json' \
    -d '{"query":"{getCustomer(mail: \"lorem_ipsum@gmail.com\") {id,name,lastName,mail}}"}'

### List all customers ###

    curl -X POST \
    http://localhost:3000/ \
    -H 'Content-Type: application/json' \
    -d '{"query":"{listCustomers {id, name, mail}}"}'