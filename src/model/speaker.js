const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  name: String,
  about: String,
  fileName: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Speaker", speakerSchema);
