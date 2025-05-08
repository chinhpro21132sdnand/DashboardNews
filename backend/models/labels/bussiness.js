const mongoose = require("mongoose");

const labelsBusiness = new mongoose.Schema({
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
module.exports = mongoose.model("business", labelsBusiness, "business");
