import Redis from 'ioredis'

let client: Redis;

function getClient() {
    if (client) return client;
    client = new Redis({
        enableOfflineQueue: false,
        host: "redis",
        port: 6379
    })
    return client;
}


export const redisClient = getClient();

