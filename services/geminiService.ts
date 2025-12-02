
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini client safely using env variable
const getClient = () => {
  // Use process.env.API_KEY directly as per @google/genai guidelines.
  // This also fixes the TypeScript error regarding ImportMeta.
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("API_KEY is missing. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

const SYSTEM_INSTRUCTION = `
You are 'WDSL Assistant', the official AI support for the Wicklow & District Schoolboys/Girls League.
Your goal is to help parents, coaches, and players with questions about the league.

Key Information:
- The league organizes youth football (U8 to U16) in County Wicklow, Ireland.
- Main clubs include: Arklow Town, Wicklow Rovers, Ashford Rovers, Greystones United, Newtown Juniors.
- Common queries: Kick-off times, pitch locations (e.g., Whitegates for Wicklow Rovers, Travers Insurances Park for Arklow), postponement rules, transfer windows, age eligibility.
- Tone: Sporty, encouraging, polite, and helpful. 

If asked about specific live match scores that you don't know, apologize and say you only have access to finished results uploaded to the system.
If asked about child protection or serious disputes, advise them to contact the League Child Welfare Officer directly via the contact page.
`;

export const sendMessageToGemini = async (history: { role: string; text: string }[], newMessage: string): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "I'm currently on the bench (API Key missing). Please check back later.";
  }

  try {
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: newMessage
    });

    return response.text || "I didn't quite catch that pass. Could you say it again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the referee right now. Please try again later.";
  }
};