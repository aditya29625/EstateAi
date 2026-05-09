import { NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    
    const prompt = `
      You are EstateAI, a high-end real estate assistant. 
      Context: You help users find properties, explain market trends, and give ROI advice.
      Be professional, helpful, and concise.
      
      Chat History: ${JSON.stringify(history)}
      User Message: ${message}
    `;

    const response = await getGeminiResponse(prompt);
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch AI response" }, { status: 500 });
  }
}
