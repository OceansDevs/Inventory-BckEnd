const express = require("express");
const inventory = require("../models/inventMODELS");
const { format } = require("@fast-csv/format");

const getInventories = async (req, res) => {
  try {
    const items = await inventory.find().lean(); // retrieve from DB

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="inventory.csv"'
    );
    res.setHeader("Content-Type", "text/csv");

    const csvStream = format({ headers: true });
    csvStream.pipe(res);

    items.forEach((item) => csvStream.write(item));
    csvStream.end();
  } catch (error) {
    console.error("Error generating CSV:", error);
    res
      .status(500)
      .json({ message: "Failed to download inventory data as CSV." });
  }
};

const getInventoriesById = async (req, res) => {
  try {
    const inventoryID = req.params.id;
    const inventoryItem = await inventory.findById(inventoryID);
    if (!inventoryItem) {
      return res.status(404).json({
        message: "Inventory not found",
      });
    }
    res.status(200).json({
      message: "Inventory fetched successfully",
      inventory: inventoryItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching inventory",
      error: error.message,
    });
  }
};

const createInventory = async (req, res) => {
  try {
    const { name, quantity, price, category, supplier } = req.body;
    const newInventory = new inventory({
      name,
      quantity,
      price,
      category,
      supplier,
    });

    const savedInventory = await newInventory.save();
    res.status(201).json({
      message: "Inventory created successfully",
      inventory: savedInventory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating inventory",
      error: error.message,
    });
  }
};

const updateInventory = async (req, res) => {
  try {
    const inventoryID = req.params.id;
    const { name, quantity } = req.body;
    const updatedInventory = await inventory.findByIdAndUpdate(
      inventoryID,
      { name, quantity },
      { new: true }
    );

    if (!updatedInventory) {
      return res.status(404).json({
        message: "Inventory not found",
      });
    }
    res.status(200).json({
      message: "Inventory updated successfully",
      inventory: updatedInventory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating inventory",
      error: error.message,
    });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const inventoryID = req.params.id;
    const deletedInventory = await inventory.findByIdAndDelete(inventoryID);
    if (!deleteInventory) {
      return res.status(404).json({
        message: "Inventory not found",
      });
    }
    res.status(200).json({
      message: "Inventory deleted successfully",
      inventory: deletedInventory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting inventory",
      error: error.message,
    });
  }
};

module.exports = {
  getInventories,
  getInventoriesById,
  createInventory,
  updateInventory,
  deleteInventory,
};
