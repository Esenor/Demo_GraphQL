var config = require('../../etc/redis.json')
var redis = require('redis')

module.exports.setValue = (key, value) => {
  let client = getClient(config)
  client.set(key, value)
}

module.exports.flushAll = () => {
  let client = getClient(config)
  client.flushall()
}

module.exports.readValueAsync = (key) => {
  return new Promise((resolve, reject) => {
    let client = getClient(config)
    client.get(key, (error, response) => {
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    })
  })
}

module.exports.mgetAsync = (key) => {
  return new Promise((resolve, reject) => {
    let client = getClient(config)
    client.keys(key, (error, responseKeys) => {
      if (error) {
        reject(error)
      } else {
        if (responseKeys.length > 0) {
          client.mget(responseKeys, (error, response) => {
            if (error) {
              reject(error)
            } else {
              resolve(response)
            }
          })
        } else {
          resolve([])
        }
      }
    })
  })
}

function getClient(config) {
  let client = redis.createClient(config)
  client.on('error', (error) => {
    throw error
  })
  return client
}
