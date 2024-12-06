const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET_KEY || "SECRET_KEY", (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user; // Menyimpan data pengguna di req.user
    console.log("Decoded User:", req.user);

    next();
  });
};

module.exports = authenticateToken;
