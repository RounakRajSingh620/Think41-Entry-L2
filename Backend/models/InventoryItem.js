const mongoose = require("mongoose");

const InventoryItemSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  quantity: Number,
  distribution_center_id: Number
});

module.exports = mongoose.model("InventoryItem", InventoryItemSchema);
