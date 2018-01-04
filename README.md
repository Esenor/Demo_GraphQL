# tw_graphql #

## usage ##

    $ npm i
    $ npm start

## API consumption ##

### Schema ###

See schema at `/src/schema`

### Add customer ###

#### one customer ####

    curl -X POST \
    http://localhost:3042/ \
    -H 'Content-Type: application/json' \
    -d '{"query":"mutation {addCustomer(customer: {name: \"Lorem\", lastName: \"Ipsum\", mail: \"lorem_ipsum@gmail.com\", addresses: [{street: \"1 street lorrem\", city: \"London\", zipcode: \"654884\"}]}) {id,mail}}"}'

#### Chained mutation ####

    curl -X POST \
    http://localhost:3042/ \
    -H 'Content-Type: application/json' \
    -d '{"query":"mutation {parent_customer: addCustomer(customer: {name: \"Rick\", lastName: \"Sanchez\", mail: \"rick_sanchez@gmail.com\"}) {id,mail},customer: addCustomer(customer: {name: \"Morty\", lastName: \"Smith\", mail: \"morty_smith@gmail.com\"}) {id,mail},related_customer: addCustomer(customer: {name: \"Summer\", lastName: \"Smith\", mail: \"summer_smith@gmail.com\"}) {id,mail}}"}'

### Add customers ###

    curl -X POST \
    http://localhost:3042/ \
    -H 'Content-Type: application/json' \
    -d '{"query":"mutation {addCustomers(customers: [{name: \"Dello\", lastName: \"Cassadar\", mail: \"cassdel@gmail.com\"}, {name: \"postman\", lastName: \"Smith\", mail: \"mymail@gmail.com\"}]) {id,name,lastName,mail}}"}'

### Get customer by mail ###

#### One customer ####

    curl -X GET \
    'http://localhost:3042?query={getCustomer(mail:"lorem_ipsum@gmail.com"){id,name,lastName,mail}}'

#### Chained query ####

    curl -X GET \
    'http://localhost:3042?query={customer_default: getCustomer(mail: "lorem_ipsum@gmail.com") {id,name,lastName,mail}, customer_related: getCustomer(mail: "mymail@gmail.com") {id,name,lastName,mail}}'

### List all customers ###

    curl -X GET \
    'http://localhost:3042?query={customers:listCustomers{id,name,mail,addresses{street,city,zipcode}}}'
