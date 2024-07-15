import { generateText } from "ai"
import { google } from "@ai-sdk/google"


require('dotenv').config();
// console.log(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");

  const { text } = await generateText({
    model: google("models/gemini-1.5-flash-latest"),
    prompt: prompt
  })
  return Response.json({ question:prompt,message: text });
}

/*
  //get the url params
  const { searchParams } = new URL(req.url);
  //get the query for name
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  //show in the console the results
  console.log(id, name);
*/