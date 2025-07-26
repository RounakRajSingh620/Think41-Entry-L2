const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  id: Number,
  order_id: Number,
  product_id: Number,
  quantity: Number
});

module.exports = mongoose.model("OrderItem", OrderItemSchema);
