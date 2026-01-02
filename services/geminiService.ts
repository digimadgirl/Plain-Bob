
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Always use named parameter for apiKey and use it directly from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTutorResponse = async (history: ChatMessage[]) => {
  const systemInstruction = `
    You are an expert English Bell Ringing teacher specializing in Plain Bob Doubles.
    Your goal is to help students understand the "Blue Line", the "Circle of Work", and the rules of the method.
    
    Key technical facts:
    - Rung on 5 bells + 1 cover bell (6 total).
    - 4 pieces of work at the lead end: 2nds, 3-4 Down dodge, 3-4 Up dodge, 4-5 Long (often called Long 5ths in Doubles).
    - Rule: When the treble leads, the bell that the treble has just turned stays in 2nds. The others dodge in 3-4, and the bell in 5ths stays in 5ths.
    
    Be encouraging, clear, and use bell ringing terminology accurately.
    If the user asks something unrelated to bell ringing, gently redirect them.
  `;

  try {
    // Using generateContent with the full conversation history for better context handling
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      })),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Access the .text property directly as per guidelines
    return response.text || "I'm sorry, I couldn't formulate a response. Please try asking again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my bell tower right now. Please try again in a moment.";
  }
};
