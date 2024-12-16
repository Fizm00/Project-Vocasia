const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSeeder = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`User Seeder|Connected to MongoDB: ${process.env.MONGO_URI}`);
    console.log(
      `User Seeder|MongoDB Connected: ${response.connection.readyState}`
    );

    // Opsional: Menghapus data lama
    await User.deleteMany();
    console.log("User Seeder|Old users removed!");

    const hashedPassword = await bcrypt.hash("Password123", 10);

    const users = [
      {
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        photo:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        role: "admin",
        phone: "08123456789",
        address: "Bandung, Jalan Dago 5",
        is_verified: true,
      },
      {
        name: "user true",
        email: "usertrue@example.com",
        password: hashedPassword,
        photo:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        role: "user",
        phone: "08123456789",
        address: "Bandung, Jalan Dago 5",
        is_verified: true,
      },
      {
        name: "user false",
        email: "userfalse@example.com",
        password: hashedPassword,
        photo:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        role: "user",
        phone: "08123456789",
        address: "Bandung, Jalan Dago 5",
        is_verified: false,
      },
    ];

    const result = await User.insertMany(users);
    console.log(
      `User Seeder|Users seeded successfully! Inserted: ${result.length} records`
    );
  } catch (error) {
    console.error(`User Seeder|Error: ${error.message}`);
  } finally {
    await mongoose.connection.close();
    console.log("User Seeder|Database connection closed!");
  }
};

module.exports = userSeeder;
