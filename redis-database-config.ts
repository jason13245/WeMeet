import redis = require('redis');

const options: redis.ClientOpts = {
    host: 'localhost',
    port: 6379
};

let client: redis.RedisClient = redis.createClient(0,'', options);

export default client;