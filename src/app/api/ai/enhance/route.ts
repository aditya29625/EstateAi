import { NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    
    const prompt = `
      You are an expert real estate copywriter. 
      Improve the following property description to make it sound luxurious, professional, and SEO-optimized.
      Keep it around 3-4 sentences.
      
      Original Description: ${description}
    `;

    const enhanced = await getGeminiResponse(prompt);
    return NextResponse.json({ enhanced });
  } catch (error) {
    return NextResponse.json({ error: "Failed to enhance description" }, { status: 500 });
  }
}
