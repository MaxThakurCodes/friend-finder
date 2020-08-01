const mongoose = require("mongoose");

let convoSchema = new mongoose.Schema({
  u1: { type: String, required: true },
  u2: { type: String, required: true },
});

const convoModel = mongoose.model("Convos", convoSchema);

module.exports = convoModel;
