const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");


const DB = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(DB);
    console.log(`Connection made....`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;