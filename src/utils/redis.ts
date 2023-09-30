import IoRedis, { RedisOptions } from 'ioredis'

const dotenv = require('dotenv')
dotenv.config()

// if(!process.env.CACHE_HOST) throw Error('INVAID CACHE_HOST, CHECK ENV')
// if(!process.env.CACHE_PORT) throw Error('INVAID CACHE_PORT, CHECK ENV')

let redisOption: RedisOptions = {
  host: process.env.CACHE_HOST || 'localhost',
  port: Number(process.env.CACHE_PORT || 6379),
}

export const redisClient = new IoRedis(redisOption)

redisClient.on('error', (err: Error) => {
  console.error('Session Redis error: ' + err)
})

redisClient.on('connect', () => {
  console.log('Session connected to redis')
})

export const redisSub = redisClient.duplicate()