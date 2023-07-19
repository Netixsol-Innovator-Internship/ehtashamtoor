import { mongooseConnect } from "@/lib/mongoose";
import { FoodItem } from "@/models/FoodItem";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    res.json(await FoodItem.find().populate("category"));
  }

  if (method === "POST") {
    const { name, price, category, images, deliveryType } = req.body;

    const foodExists = await FoodItem.findOne({ name });
    if (foodExists) {
      return res.send({ message: "Fooditem exists", success: false });
    }

    const FoodDoc = await FoodItem.create({
      name,
      price,
      category,
      images,
      deliveryType,
    });

    await FoodDoc.save();

    res.send({ FoodDoc, message: "Fooditem added", success: true });
  }
  if (method === "DELETE") {
    const { _id } = req.query;
    const deleted = await FoodItem.deleteOne({ _id });
    if (deleted) {
      res.json({ message: "FoodItem Deleted", success: true });
    } else {
      res.json({ success: false, message: "Unable to delete Fooditem" });
    }
  }
  if (method === "PUT") {
    const { name, _id, price, category, images, deliveryType } = req.body;

    // again we will have restaurant data

    const FoodDoc = await FoodItem.updateOne(
      { _id },
      {
        name,
        price,
        category,
        images,
        deliveryType,
      }
    );
    res.send({ FoodDoc, message: "Fooditem updated", success: true });
  }
}
