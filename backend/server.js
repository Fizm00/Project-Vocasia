const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
routes.use(cors());

dotenv.config();

connectDB();

app.use(express.json());

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
  console.log(`Example app listening on port ${port}`);
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
});
