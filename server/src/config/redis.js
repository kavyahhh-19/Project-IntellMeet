const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (error) => {
  console.error("Redis unavailable:", error.message);
});

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Redis connected");
    }
  } catch (error) {
    console.log("Running without Redis cache");
  }
};

module.exports = {
  redisClient,
  connectRedis,
};