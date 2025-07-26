const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  id: Number,
  user_id: Number,
  order_date: Date,
  status: String
});

module.exports = mongoose.model("Order", OrderSchema);
