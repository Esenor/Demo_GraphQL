var config = require('../../etc/redis.json')
var redis = require('redis')

/**
 * Add value to Redis
 * @param {*} key 
 * @param {*} value 
 */
module.exports.setValue = (key, value) => {
  let client = getClient(config)
  client.set(key, value)
}

/**
 * Flush all data in Redis
 */
module.exports.flushAll = () => {
  let client = getClient(config)
  client.flushall()
}

/**
 * Read value in Redis
 * @param {*} key 
 */
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

/**
 * Get all value in Redis (match apttern)
 * @param {*} key 
 */
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

/**
 * Return redis client object
 * @param {*} config 
 */
function getClient(config) {
  let client = redis.createClient(config)
  client.on('error', (error) => {
    throw error
  })
  return client
}
