const mongoose = require("mongoose");

// const addressSchema = new mongoose.Schema({
//   address: {
//     type: String,
//   },
// });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  phone: {
    type: String,
  },
  //   address: addressSchema,
  createdAt: {
    type: Date,
    default: () => Date(),
  },
});
const userObj = mongoose.model("customer", userSchema);

module.exports = userObj;
