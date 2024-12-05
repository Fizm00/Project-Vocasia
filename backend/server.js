const express = require("express");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routes = require("./routes");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
routes.use(cors());

dotenv.config();

connectDB();

app.use(cors());
app.use(bodyParser.json());

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
app.use(passport.initialize());
app.use(passport.session());

// Konfigurasi Passport
require("./config/passport")(passport);

// routes setup
app.use("/api/v1", routes);

// route default
// app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Email User:", process.env.EMAIL_USER);
  console.log("Email Pass:", process.env.EMAIL_PASS);

  console.log(`Example app listening on port ${port}`);
  console.log("MONGODB_URI:", process.env.MONGO_URI);
});
