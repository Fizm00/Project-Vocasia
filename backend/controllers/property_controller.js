const express = require("express");
const Property = require("../models/Property");
const user = require("../models/User");
const path = require("path");
const fs = require("fs");
// const { response } = require("express");

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
    // File gambar yang diunggah
    // const images = req.files.map((file) => file.path); // Simpan path file
    const images = req.files.map((file) => "/uploads" + file.filename); // Simpan path file

    // Data lain dari request
    const {
      user_id,
      name,
      facility,
      gender_type,
      property_type,
      stock,
      price,
      city,
      address,
      description,
    } = req.body;

    console.log("Request User:", req.user);
    // Buat properti baru
    const property = new Property({
      // user_id: req.user.id || req.body.user_id, // Pastikan req.user tersedia
      user_id,
      name,
      facility: facility.split(","), // Misal fasilitas dipisahkan koma
      images: images,
      gender_type,
      property_type,
      stock,
      price,
      city,
      address,
      description,
    });

    const savedProperty = await property.save();

    res.status(201).json({
      message: "Property berhasil dibuat",
      property,
      savedProperty: savedProperty._id + savedProperty,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal membuat property", error: error.message });
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
    // const property = await Property.findByIdAndDelete(req.params.id);
    // res.status(200).json({
    //   status: "success | OK",
    //   message: "Property Deleted Successfully",
    //   success: true,
    //   data: property,
    // });

    const userId = req.body.user_id;

    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const imagePath = path.join(
      __dirname,
      "..",
      "storages",
      "uploads",
      "images",
      // userId,
      // property.user_id
      property.images[0]
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Menghapus file gambar
      console.log("File berhasil dihapus:", imagePath);
    } else {
      console.log("File tidak ditemukan:", imagePath);
    }
    await Property.findByIdAndDelete(propertyId);

    res.status(200).json({
      status: "success | OK",
      message: "Property Deleted Successfully",
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Terjadi kesalahan saat menghapus properti |" + error.message,
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
