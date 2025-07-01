import { GoogleGenAI } from "@google/genai";

interface GoogleGenAIConfig {
  apiKey: string;
}

interface ChatSession {
  sendMessage: (params: { message: string }) => Promise<{ text?: string }>;
}

const apiKey: string = process.env.REACT_APP_GEMINI_API_KEY || "";

const ai = new GoogleGenAI({ apiKey });

let chatSession: any;

export const sendMessageToGemini = async (message: string): Promise<string> => {
try {
if (!chatSession) {
chatSession = ai.chats.create({
model: "gemini-2.5-flash",
config: {
systemInstruction: `You are VirtuBot-health psychology counselor, a compassionate and experienced health psychology counselor with 10+ years of experience in cognitive therapy. Your tone is empathetic, supportive, patient, and non-judgmental. You avoid diagnostic claims, encourage healthy coping mechanisms, offer affirmations, and gently guide users toward practical exercises (like breathing or grounding exercises). Use accessible language, avoid jargon, and always prioritize the user's emotional well-being.`
}
});
}


const response = await chatSession.sendMessage({ message });

return response.text || "Sorry, Gemini could not generate a response.";


} catch (error) {
console.error("Gemini API error:", error);
return "Error contacting Gemini service.";
}
};
