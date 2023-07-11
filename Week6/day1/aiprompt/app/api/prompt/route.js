import Prompt from "@models/Prompt";
import { connectDb } from "@utils/database";

export const GET = async (req, res) => {
  try {
    await connectDb();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts, { status: 200 }));
  } catch (error) {
    return new Response("failed to fetch prompts", { status: 500 });
  }
};
