import { createClient } from 'redis';
import RedisStore from 'connect-redis'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
let redisClient;
let redisStore;

async function connectToRedis() {
    redisClient = createClient();
    redisClient.on('error', err => console.log('Redis Client Error', err));
    await redisClient.connect().then(() => {
        console.log("Redis server is Running and Connected to Database");
    }).catch((error) => {
        console.error("Redis Connection Failed:", error);
    })

    redisStore = new RedisStore({
        client: redisClient,
        prefix: 'myapp:',
    });
};

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Database Connection Failed:', error);
    }
}

export {
    connectToDatabase,
    connectToRedis,
    redisStore,
};
