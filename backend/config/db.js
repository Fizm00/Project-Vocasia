const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB = process.env.MONGODB_URI || "mongodb://localhost:27017/anak-kost";
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB : " + process.env.MONGODB_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
