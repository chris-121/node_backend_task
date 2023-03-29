const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  regLink: String,
  date: String,
  startTime: String,
  endTime: String,
  basicInfo: String,
  speakers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Speaker",
    },
  ],
  resources: String,
  joiningInfo: String,
  organizedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Event", eventSchema);
