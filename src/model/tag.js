const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  tag: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Tag", tagSchema);
