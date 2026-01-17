
import { GoogleGenAI } from "@google/genai";
import { ProfileData } from "../types";

export const askGeminiAboutProfile = async (prompt: string, profile: ProfileData) => {
  // Use the API key directly from process.env as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are the "AI Assistant" for ${profile.name}'s digital portfolio. 
    Your job is to answer questions about ${profile.name}'s professional background, skills, and projects based on the provided data.
    
    Context about ${profile.name}:
    - Bio: ${profile.bio}
    - Current Role: ${profile.title}
    - Experience: ${JSON.stringify(profile.experience)}
    - Skills: ${JSON.stringify(profile.skills)}
    - Education: ${JSON.stringify(profile.education)}
    - Projects: ${JSON.stringify(profile.projects)}
    
    Guidelines:
    1. Be professional, friendly, and enthusiastic about ${profile.name}.
    2. Keep answers concise.
    3. If you don't know the answer based on the data, politely say you don't have that specific information and suggest contacting ${profile.name} via email at ${profile.email}.
    4. Use Markdown for formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Accessing response.text as a property, not a method, as per guidelines.
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI assistant is currently offline. Please try again later or contact me directly!";
  }
};
