const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 255,
    required: true,
  },
  role: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lstPermisson: {
    type: [String],
    default: [],
    required: true,
  },
});
//  role {
//   user,
//   admin,
//   manager,
// }
module.exports = mongoose.model("users", userSchema);
