import pkg from "express-redis-cache";

const redisCache = pkg({
  host: "localhost",      // correct (Node runs on Windows)
  port: 6379,
  prefix: "materbackend",
  expire: 60 * 60
});

redisCache.on("error", (err) => {
  console.error("Redis Cache Error:", err.message);
});

export default redisCache;
