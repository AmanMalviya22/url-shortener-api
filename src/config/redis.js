const Redis = require('ioredis');
require('dotenv').config();

const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

module.exports = redisClient;
