import mongoose, { model, models, Schema } from "mongoose";

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
  foodItems: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
        // required: true,
      },
    },
  ],
  role: {
    type: String,
    default: "restaurant",
  },
});

export const Restaurant =
  models.Restaurant || model("Restaurant", restaurantSchema);
