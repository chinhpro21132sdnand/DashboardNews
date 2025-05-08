const mongoose = require("mongoose");

const labelsEntertaiment = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
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
  labels: {
    type: String,
  },
});
module.exports = mongoose.model(
  "entertainment",
  labelsEntertaiment,
  "entertainment"
);
