import { generateText } from "ai"
import { google } from "@ai-sdk/google"

require('dotenv').config();

/**
 * In the enviroment variable file, you must to add the variable GOOGLE_GENERATIVE_AI_API_KEY and value of api key
 * I am using the google api with Gemini
 */

if(process.env.GOOGLE_GENERATIVE_API_KEY == undefined){
  process.env.GOOGLE_GENERATIVE_API_KEY = "AIz...XY9Q"
}

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");

  const { text } = await generateText({
    model: google("models/gemini-1.5-pro-latest"),
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