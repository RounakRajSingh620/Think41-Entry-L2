const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  address: String
});

module.exports = mongoose.model("User", UserSchema);
