import Prompt from "@models/Prompt";
import { connectDb } from "@utils/database";

// get request

export const GET = async (req, { params }) => {
  try {
    await connectDb();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("no prompt found");
    }

    return new Response(JSON.stringify(prompt, { status: 200 }));
  } catch (error) {
    return new Response("failed to fetch prompts", { status: 500 });
  }
};

// patch request
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  console.log(prompt, tag)

  try {
    await connectDb();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("no prompt found");
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt));
  } catch (error) {
    console.log(error.message);
    return new Response("failed patching existing prompt");
  }
};

// delete request

export const DELETE = async (req, { params }) => {
  try {
    await connectDb();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("prompt deleted");
  } catch (error) {
    return new Response("failed deleting prompt");
  }
};
