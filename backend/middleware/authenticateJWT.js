const redisClient = require("../config/redis");

const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided." });
  }

  try {
    // Periksa apakah Redis Client aktif
    if (!redisClient.isOpen) {
      console.error("Redis client is not connected");
      await redisClient.connect();
    }

    const checkToken = await redisClient.get(`BLACKLIST_TOKEN:${token}`);
    if (checkToken) {
      return res
        .status(403)
        .json({ message: "Warning: Token has been blacklisted" });
    }

    next(); // Token valid
  } catch (error) {
    console.error("Redis Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authenticateJWT;
