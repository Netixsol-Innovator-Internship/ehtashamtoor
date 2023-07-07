import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
  },
});

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  address: addressSchema,
  createdAt: {
    type: Date,
    default: () => Date(),
  },
});

const customer = mongoose.model("customer", customerSchema);

export default customer;
