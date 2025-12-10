import { GoogleGenAI, Type } from "@google/genai";
import { ColorDef, AIAnalysisResult } from '../types';

export const analyzePaletteWithGemini = async (colors: ColorDef[]): Promise<AIAnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelId = "gemini-2.5-flash"; // Fast and capable for this task

    const colorList = colors.map(c => c.hex).join(', ');

    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Analise esta paleta de cores: ${colorList}. Forneça a vibe psicológica geral e, para cada cor, seu significado psicológico específico e um uso recomendado na UI (ex: 'Botão de Ação', 'Fundo', 'Texto'). RESPONDA EM PORTUGUÊS DO BRASIL.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallVibe: { type: Type.STRING, description: "Resumo do clima da paleta em Português" },
            colorAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hex: { type: Type.STRING },
                  psychology: { type: Type.STRING, description: "Impacto psicológico desta cor específica em Português" },
                  recommendedUsage: { type: Type.STRING, description: "Melhor elemento de UI para aplicar esta cor em Português" }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Sem resposta da IA");
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
      contents: `Crie uma paleta de cores baseada nesta descrição: "${prompt}". Retorne 5 cores distintas que funcionem bem juntas. Os nomes das cores devem ser criativos e em PORTUGUÊS DO BRASIL.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: "Um nome criativo para esta paleta em Português" },
                colors: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            hex: { type: Type.STRING, description: "Código Hex incluindo #" },
                            name: { type: Type.STRING, description: "Um nome criativo para a cor em Português" }
                        }
                    }
                }
            }
        }
      }
    });
     const text = response.text;
    if (!text) throw new Error("Sem resposta da IA");
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
      contents: `Qual é o código de cor hex padrão para uma cor descrita como "${description}"? Retorne apenas o código hex.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hex: { type: Type.STRING, description: "O código hex da cor, ex: #FF0000" },
          },
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("Sem resposta da IA");
    const result = JSON.parse(text);
    return result.hex;
  } catch (error) {
    console.error("Gemini Color Lookup Error:", error);
    throw error;
  }
};