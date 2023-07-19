import mongoose, { model, Schema, models } from "mongoose";

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
});

export const Restaurant =
  models.Restaurant || model("Restaurant", restaurantSchema);
