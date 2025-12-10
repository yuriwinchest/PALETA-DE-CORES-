import { GoogleGenAI, Type } from "@google/genai";
import { ColorDef, AIAnalysisResult } from '../types';

export const analyzePaletteWithGemini = async (colors: ColorDef[]): Promise<AIAnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelId = "gemini-2.5-flash"; // Fast and capable for this task

    const colorList = colors.map(c => c.hex).join(', ');

    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Analyze this color palette: ${colorList}. Provide the overall psychological vibe, and for each color, its specific psychological meaning and a recommended UI usage (e.g., 'CTA Button', 'Background', 'Text').`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallVibe: { type: Type.STRING, description: "A summary of the palette's mood" },
            colorAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hex: { type: Type.STRING },
                  psychology: { type: Type.STRING, description: "Psychological impact of this specific color" },
                  recommendedUsage: { type: Type.STRING, description: "Best UI element to apply this color to" }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as AIAnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const generatePaletteFromPrompt = async (prompt: string): Promise<{ name: string; colors: { hex: string; name: string }[] }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelId = "gemini-2.5-flash";

    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Create a color palette based on this description: "${prompt}". Return 5 distinct colors that work well together.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: "A creative name for this palette" },
                colors: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            hex: { type: Type.STRING, description: "Hex code including #" },
                            name: { type: Type.STRING, description: "A creative name for the color" }
                        }
                    }
                }
            }
        }
      }
    });
     const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
}

export const getColorFromDescription = async (description: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelId = "gemini-2.5-flash";

    const response = await ai.models.generateContent({
      model: modelId,
      contents: `What is the standard hex color code for a color described as "${description}"? Return only the hex code.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hex: { type: Type.STRING, description: "The hex code of the color, e.g. #FF0000" },
          },
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    const result = JSON.parse(text);
    return result.hex;
  } catch (error) {
    console.error("Gemini Color Lookup Error:", error);
    throw error;
  }
};