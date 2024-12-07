const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  try {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    console.log("Generated Token:", token); // Log token yang dihasilkan
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

const result = generateToken({ _id: "12345", email: "user@example.com" });

module.exports = result;
// Contoh pemanggilan
// const user = { _id: "12345", email: "user@example.com" };
// const token = generateToken(user);
