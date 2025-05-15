const mongoose = require("mongoose");

const labelsPolitics = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    required: true,
  },
  comment: {
    type: Number,
    required: true,
  },
  viral: {
    type: Date,
    required: true,
  },
  labels: {
    type: String,
  },
});
module.exports = mongoose.model("politics", labelsPolitics, "politics");
