const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dresscode: {
    type: String,
  },
  ageRestriction: {
    type: String,
  },
  endTime: {
    type: String,
    required: true,
  },
  speaker: {
    name: String,
    title: String,
    speakerImage: String,
  },
  eventTag: [String],
  location: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const EVENT = mongoose.model("EVENT", eventSchema);
module.exports = EVENT;
