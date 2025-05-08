const mongoose = require("mongoose");

const labelsTech = new mongoose.Schema({
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
  labels: {
    type: String,
  },
});
module.exports = mongoose.model("tech", labelsTech, "tech");
