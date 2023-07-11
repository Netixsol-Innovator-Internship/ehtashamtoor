import Prompt from "@models/Prompt";
import { connectDb } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectDb();
    const newPrompt = new Prompt({ creator: userId, tag, prompt });

    await newPrompt.save();

    return new Response(
      JSON.stringify(newPrompt, {
        status: 201,
      })
    );
  } catch (error) {
    console.log(error.message);
    return new Response("Failed to create a prompt", { status: 500 });
  }
};
