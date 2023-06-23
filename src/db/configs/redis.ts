import * as _ from 'lodash'
const redis = require('redis')
const { promisify } = require('util')
const redisConfig = {
  host: process.env.REDIS_HOST,
  port: +(process.env.REDIS_PORT || 6380),
  password: process.env.REDIS_PASSWORD,
  tls: {
    servername: process.env.REDIS_HOST
  }
}

const redisClient = redis.createClient(
  process.env.IS_DEV !== 'true'
    ? redisConfig
    : {
        host: process.env.REDIS_HOST,
        port: +(process.env.REDIS_PORT || 6379),
        password: process.env.REDIS_PASSWORD
      }
)

const getAsync = promisify(redisClient.get).bind(redisClient)

export const getRedisData = async (key: string) => {
  const value = await getAsync(key)
  if (!_.isEmpty(value)) {
    return JSON.parse(value)
  }
  return null
}
export const setRedisData = async (key: string, value: string, ttl?: number) => {
  await redisClient.setex(key, ttl || 24 * 3600, value)
}
export const deleteKey = async (key: string) => {
  await redisClient.del(key)
}

export const getRedisClient = () => {
  return redisClient
}
