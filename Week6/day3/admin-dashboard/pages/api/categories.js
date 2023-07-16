import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { AuthOptions, isAdmin } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  await isAdmin(req, res);

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }
  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    res.send({ categoryDoc, message: "Category created", success: true });
  }
  if (method === "DELETE") {
    const { _id } = req.query;
    const deleted = await Category.deleteOne({ _id });
    if (deleted) {
      res.json({ message: "Category Deleted", success: true });
    } else {
      res.json({ success: false, message: "Unable to delete category" });
    }
  }
  if (method === "PUT") {
    const { name, parentCategory, _id, properties } = req.body;

    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory || undefined,
        properties,
      }
    );
    res.send({ categoryDoc, message: "Category updated", success: true });
  }
}
