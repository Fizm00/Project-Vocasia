const express = require("express");
const Property = require("../models/Property");

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
    const property = new Property(req.body);
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
      message: error.message,
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
