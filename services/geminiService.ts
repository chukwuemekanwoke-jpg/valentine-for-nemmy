
import { GoogleGenAI } from "@google/genai";

export const generateLovePoem = async (name: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a 4-line poem for my girlfriend ${name} who just agreed to be my Valentine. Make it incredibly sweet, playful, and include emojis.`,
      config: {
        temperature: 1,
        maxOutputTokens: 200,
      }
    });
    
    return response.text || "Roses are red, violets are blue,\nI'm the luckiest guy, because I have you.\nValentine's Day is going to be grand,\nWalking through life, holding your hand. ❤️";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "My heart is dancing, full of glee,\nBecause you said 'yes' to me!\nNemmy my dear, you're the best,\nI'm so happy I passed the test! ❤️";
  }
};
