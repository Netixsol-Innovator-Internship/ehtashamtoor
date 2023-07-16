import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
// import multer from "multer";
import mongoose from "mongoose";
import { isAdmin } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();
  await isAdmin(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      const { id } = req.query;
      try {
        if (id) {
          const product = await Product.findById(id);
          if (product) {
            res.json(product);
          } else {
            res.status(404).json({ message: "Product not found" });
          }
        } else {
          res.status(400).json({ message: "Invalid ID parameter" });
        }
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      try {
        const products = await Product.find();
        res.json(products);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  if (method === "POST") {
    try {
      const { title, description, price, images, category, properties } =
        req.body;

      // check extensions
      const extensions = ["jpg", "jpeg", "svg", "png", "gif", "WebP"];
      images.map(({ url }) => {
        const ext = url.split(".").pop();
        if (!extensions.includes(ext)) {
          return res.status(400).send({
            success: false,
            message: "image format not supported",
          });
        }
      });

      const ProductDoc = await Product.create({
        title,
        description,
        price,
        images,
        category,
        properties,
      });
      if (ProductDoc) {
        res.send({ ProductDoc, success: true, message: "product created" });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  if (method === "PUT") {
    const { title, description, price, _id, images, properties, category } =
      req.body;

    const updated = await Product.updateOne(
      { _id },
      { title, description, price, images, properties, category }
    );
    if (updated) {
      res.status(200).json({ success: true, message: "Product updated" });
    } else {
      res.json({ success: false, message: "Cannot update product" });
    }

    try {
    } catch (error) {
      console.log(error);
    }
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      const { id } = req.query;
      try {
        if (id) {
          const product = await Product.findByIdAndDelete(id);
          if (product) {
            res.json({ product, success: true, message: "Product deleted" });
          } else {
            res
              .status(404)
              .json({ success: false, message: "Product not found" });
          }
        } else {
          res
            .status(400)
            .json({ success: false, message: "Invalid ID parameter" });
        }
      } catch (error) {
        console.log(error.message);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    }
  }
}
