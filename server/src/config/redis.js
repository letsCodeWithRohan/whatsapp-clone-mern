const Redis = require("ioredis");

let redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

try {
    redis.on("connect", () => {
        console.log("Connected to Redis");
    });

    redis.on("error", (err) => {
        redis = null;
        console.error("Redis error:", err);
    });
} catch (error) {
    console.error("Error initializing Redis:", error);
}

module.exports = redis;