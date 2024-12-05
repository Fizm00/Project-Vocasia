const express = require("express");

const mongoose = require("mongoose");

const user = require("./User");

const propertySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  facility: { type: String, required: true },
  image: { type: String, required: true },
  property_type: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const property = mongoose.model("Property", propertySchema);

module.exports = property;
