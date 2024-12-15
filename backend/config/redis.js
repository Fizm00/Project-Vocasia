const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379", // Sesuaikan URL jika Redis menggunakan host/port lain
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

(async () => {
  if (!client.isOpen) {
    await client.connect(); // Pastikan Redis Client terhubung
    console.log("Redis client connected");
  }
})();

module.exports = client;
