const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    facility: [{ type: String, required: true }],
    images: [{ type: String, required: true }],
    gender_type: {
      type: String,
      required: true,
      enum: ["Putra", "Putri", "Campur"],
    },
    property_type: {
      type: String,
      required: true,
      enum: ["Kost", "Rumah", "Apartemen", "Villa"],
    },
    price: { type: Number, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
