const mongoose = require("mongoose");

const blockListSchema = new mongoose.Schema({
  user: {
    uid: { type: String, required: true },
    reason: { type: String, required: true },
  },
  moderator: {
    uid: { type: String, required: true },
  },
});

let blockListModel = mongoose.model("blocklist", blockListSchema);

module.exports = blockListModel;
