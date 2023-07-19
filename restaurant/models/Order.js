import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  foodItems: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Delivered"],
    default: "Pending",
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

export const Order = models?.Order || model("Order", OrderSchema);
