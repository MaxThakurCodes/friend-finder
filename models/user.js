const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  username: { type: String, required: true },
});

const userModel = mongoose.model("find", userSchema);

module.exports = userModel;
