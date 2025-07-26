const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const InventoryItem = require("../models/InventoryItem");
const DistributionCenter = require("../models/DistributionCenter");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    loadAll();
  })
  .catch(err => console.error("❌ MongoDB Error:", err));

async function importCSV(filePath, Model) {
  return new Promise((resolve, reject) => {
    const records = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // Convert string number fields to actual numbers
        for (const key in row) {
          if (!isNaN(row[key])) {
            row[key] = Number(row[key]);
          }
        }
        records.push(row);
      })
      .on("end", async () => {
        try {
          await Model.insertMany(records);
          console.log(`✅ Loaded ${Model.modelName}: ${records.length} records`);
          resolve();
        } catch (error) {
          console.error(`❌ Error loading ${Model.modelName}:`, error.message);
          reject(error);
        }
      });
  });
}

async function loadAll() {
  try {
    await importCSV("archive/users.csv", User);
    await importCSV("archive/products.csv", Product);
    await importCSV("archive/orders.csv", Order);
    await importCSV("archive/order_items.csv", OrderItem);
    await importCSV("archive/inventory_items.csv", InventoryItem);
    await importCSV("archive/distribution_centers.csv", DistributionCenter);
    console.log("✅ All CSVs Loaded Successfully!");
  } catch (err) {
    console.error("❌ Load Error:", err);
  } finally {
    mongoose.disconnect();
  }
}
