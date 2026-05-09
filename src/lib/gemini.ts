export const getGeminiResponse = async (prompt: string) => {
  const API_KEY = process.env.GEMINI_API_KEY;
  // Using gemini-2.5-flash-lite as verified in the models list
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Gemini API Error:", data);
      return "I'm sorry, I encountered an error processing your request. " + (data.error?.message || "Check your API key and model availability.");
    }
  } catch (error: any) {
    console.error("Gemini Fetch Error:", error);
    return "AI Error: " + error.message;
  }
};
