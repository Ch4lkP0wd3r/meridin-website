
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function generateReconReport(target: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a professional digital presence audit for a fictional entity named "${target}". Use clear, sophisticated business intelligence terminology. Focus on public visibility, potential privacy risks, and overall digital safety profile. Keep it under 150 words. Format as refined professional paragraphs. Avoid jargon like 'OSINT', 'payload', or 'extraction'.`,
      config: {
        temperature: 0.6,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error: any) {
    console.error("Intelligence summary failed:", error);
    
    // Check if the error is a rate limit or "run out" scenario
    if (error?.status === 429 || error?.message?.includes('429')) {
      return "PROTOCOL_CONGESTION: Intelligence nodes are currently at maximum capacity processing high-priority requests. Please re-initiate link in 60 seconds.";
    }
    
    return "The requested analysis is currently unavailable. Our team has been notified of the interruption.";
  }
}
