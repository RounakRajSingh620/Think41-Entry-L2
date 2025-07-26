const mongoose = require("mongoose");

const DistributionCenterSchema = new mongoose.Schema({
  id: Number,
  name: String,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model("DistributionCenter", DistributionCenterSchema);
