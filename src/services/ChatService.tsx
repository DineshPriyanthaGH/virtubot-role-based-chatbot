// src/services/ChatService.ts
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";

const ai = new GoogleGenAI({ apiKey });

let chatSession: any;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    if (!chatSession) {
      chatSession = ai.chats.create({ model: "gemini-2.5-flash" });
    }

    const response = await chatSession.sendMessage({ message });

    return response.text || "Sorry, Gemini could not generate a response.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Error contacting Gemini service.";
  }
};
