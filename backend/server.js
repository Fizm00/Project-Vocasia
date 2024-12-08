const express = require("express");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routes = require("./routes");
const connectDB = require("./config/db");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
routes.use(cors());

dotenv.config();

connectDB();

app.use(cors());

app.use(express.json());

// Konfigurasi Session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport Middleware
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

// routes setup
app.use("/api/v1", routes);

// upload images
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/uploads", express.static("uploads"));

// start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Email User:", process.env.EMAIL_USER);
  console.log("Email Pass:", process.env.EMAIL_PASS);

  console.log(`Example app listening on port ${port}`);
  console.log("MONGODB_URI:", process.env.MONGO_URI);
});
