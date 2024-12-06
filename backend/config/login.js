const jwt = require("jsonwebtoken");
require("dotenv").config();

const user = { id: "64b7b8345e98cf001f5e5367", email: "user@example.com" };
const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

console.log(token);
