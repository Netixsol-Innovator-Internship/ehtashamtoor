import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongodb is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log(
      "----------------MONGODB IS UP AND RUNNING------------------------"
    );
  } catch (error) {
    console.log(error);
  }
};