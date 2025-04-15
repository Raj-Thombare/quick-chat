import { Redis } from "ioredis";

// const redis = new Redis({
//     host: "localhost",
//     port: 6379
// })

const redis = new Redis({
    port: Number(process.env.REDIS_PORT || 6379),
    host: process.env.REDIS_HOST,
    username: "default",
    password: process.env.REDIS_PASSWORD,
    db: 0,
});

export default redis;
