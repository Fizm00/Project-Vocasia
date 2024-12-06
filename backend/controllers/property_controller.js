const express = require("express");
const Property = require("../models/Property");
const upload = require("../middleware/upload_image");

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
    res.status(200).json({
      status: "success | OK",
      message: "List Of Properties",
      success: true,
      data: properties,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.status(200).json({
      status: "success | OK",
      message: "Property By Id",
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

const createProperty = async (req, res) => {
  try {
    // Validasi jika tidak ada file yang diunggah
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "No images uploaded. Please upload at least one image.",
        success: false,
        data: null,
      });
    }

    // Ambil semua path dari file yang diunggah
    const imagePaths = req.files.map((file) => file.path);

    // Buat properti baru dengan data dari req.body dan images
    const property = new Property({
      ...req.body,
      images: imagePaths, // Menyimpan path gambar ke database
    });

    console.log("Request files:", req.files);

    // Simpan properti ke database
    await property.save();

    res.status(200).json({
      status: "success | OK",
      message: "Property Created Successfully",
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error occurred: ${error.message}`,
      success: false,
      data: null,
    });
  }
};

const updatePropertyById = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success | OK",
      message: "Property Updated Successfully",
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

const deletePropertyById = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success | OK",
      message: "Property Deleted Successfully",
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      success: false,
      data: null,
    });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updatePropertyById,
  deletePropertyById,
};
