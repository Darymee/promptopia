import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const POST = async (req, _) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDb();
    const newPrompt = await Prompt.create({ creator: userId, tag, prompt });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", {
      status: 500,
    });
  }
};
