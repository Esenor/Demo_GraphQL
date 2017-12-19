# TW_GraphQL #

## usage ##

    $ npm i
    $ npm start

## API consumption ##

### Schema ###

    #############################################
    #############################################
    ### CUSTOM TYPE

    type Customer {
    id: ID
    name: String
    lastName: String
    mail: String
    }

    #############################################
    #############################################
    ### INPUT CUSTOM TYPE

    input CustomerInput {
    name: String!
    lastName: String!
    mail: String!
    }

    #############################################
    #############################################
    ### MUTATION

    type Mutation {
    addCustomer(customer: CustomerInput!): Customer
    addCustomers(customers: [CustomerInput]!): [Customer]
    }

    #############################################
    #############################################
    ### QUERY

    type Query {
    getCustomer(mail: String!): Customer
    listCustomers: [Customer]
    }

### Add customer ###

    curl -X POST \
    http://localhost:3000/ \
    -H 'Content-Type: application/json' \
    -d '{"query":"mutation {addCustomer(customer: {name: \"Lorem\", lastName: \"Ipsum\", mail: \"lorem_ipsum@gmail.com\"}) {id,mail}}"}'

### Add customers ###

    curl -X POST \
    http://localhost:3000/ \
    -H 'Content-Type: application/json' \
    -d '{"query":"mutation {addCustomers(customers: [{name: \"Dello\", lastName: \"Cassadar\", mail: \"cassdel@gmail.com\"}, {name: \"postman\", lastName: \"Smith\", mail: \"mymail@gmail.com\"}]) {id,name,lastName,mail}}"}'

### Get customer by mail ###

    curl -X GET \
    'http://localhost:3000?query={getCustomer(mail:"lorem_ipsum@gmail.com"){id,name,lastName,mail}}'

### List all customers ###

    curl -X GET \
    'http://localhost:3000?query={listCustomers{id,name,mail}}'
