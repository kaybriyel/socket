import { Redis, RedisOptions } from 'ioredis'
import env from '../env'

const dotenv = require('dotenv')
dotenv.config()

// if(!process.env.CACHE_HOST) throw Error('INVAID CACHE_HOST, CHECK ENV')
// if(!process.env.CACHE_PORT) throw Error('INVAID CACHE_PORT, CHECK ENV')

// const redisOption: RedisOptions = {
//   host: process.env.CACHE_HOST || 'localhost',
//   port: Number(process.env.CACHE_PORT || 6379),
// }

export const redisClient = new Redis(env.REDIS_URL)

// export const redisClient  = new Redis('localhost')

export const redisSub = redisClient.duplicate()

redisClient.on('error', (err: Error) => {
  console.error('Redis client error: ' + err)
})

redisClient.on('connect', () => {
  console.log('Redis client connected to redis')
})

redisSub.on('error', (err: Error) => {
  console.error('Redis sub error: ' + err)
})

redisSub.on('connect', () => {
  console.log('Redis sub connected to redis')
})