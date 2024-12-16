const mongoose = require("mongoose");
const Property = require("../models/Property");
const User = require("../models/User");
const { faker } = require("@faker-js/faker");
const getRandomPropertyImage = require("../config/unsplash");
require("dotenv").config();

const propertySeeder = async (req, res) => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Property Seeder|Connected to MongoDB: ${process.env.MONGO_URI}`
    );

    // == Ambil beberapa user ==
    // const user = await User.findOne();
    const users = await User.find().limit(3);
    if (!users || users.length === 0) {
      throw new Error("User not found");
    }

    // == Ambil beberapa property ==
    const properties = [];

    for (let i = 0; i < 2; i++) {
      const user = faker.helpers.arrayElement(users);
      const images = [];

      for (let j = 0; j < 2; j++) {
        const imageUrl = await getRandomPropertyImage();
        if (imageUrl) {
          images.push("/uploads/" + Date.now() + "-" + imageUrl); // Tambahkan hanya jika URL valid
        } else {
          images.push("https://via.placeholder.com/500"); // Fallback URL jika API gagal
        }
      }

      properties.push({
        user_id: user,
        name: faker.internet.username(),
        facility: faker.helpers.arrayElements([
          "ac",
          "wifi",
          "parkir",
          "kamar mandi",
          "Kolam renang",
        ]),
        images: images,
        gender_type: faker.helpers.arrayElement(["Putra", "Putri", "Campur"]),
        property_type: faker.helpers.arrayElement(["Kost", "Rumah"]),
        stock: faker.finance.amount({ min: 1, max: 10, dec: 0 }),
        price: faker.finance.amount({ min: 70000, max: 5000000, dec: 0 }),
        city: faker.location.timeZone(),
        address: faker.location.streetAddress({ useFullAddress: true }),
        description: faker.lorem.sentence(),
      });
    }

    // Hapus properti lama (opsional)
    // await Property.deleteMany();
    // console.log("Property Seeder|Old properties removed!");

    const result = await Property.insertMany(properties);
    console.log("Property Result " + result);

    res.status(200).json({
      status: "success | OK",
      message: "Property Seeder success|Properties seeded successfully!",
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error(`Property Seeder Catch|Error: ${error.message}`);
  } finally {
    await mongoose.connection.close();
    console.log("Property Seeder Finally|Database connection closed!");
  }
};

module.exports = propertySeeder;
