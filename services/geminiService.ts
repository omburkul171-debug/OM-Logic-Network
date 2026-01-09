

import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Correct initialization: always use { apiKey: process.env.API_KEY } directly.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async analyzeLogicTree(conclusion: string, nodes: any) {
    const prompt = `Analyze the following logic tree for consistency and potential fallacies. 
    Conclusion: ${conclusion}
    Nodes: ${JSON.stringify(nodes)}
    
    Provide a "Reasoning Score" out of 1000 and a brief qualitative critique.`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              critique: { type: Type.STRING },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['score', 'critique']
          }
        }
      });
      // Correctly access .text property from GenerateContentResponse.
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return null;
    }
  }

  async findCommonGround(treeA: any, treeB: any) {
    const prompt = `Compare these two logic trees and find "Common Ground" (points of agreement or shared principles).
    Tree A Conclusion: ${treeA.conclusion}
    Tree B Conclusion: ${treeB.conclusion}
    
    Tree A Logic: ${JSON.stringify(treeA.nodes)}
    Tree B Logic: ${JSON.stringify(treeB.nodes)}`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              sharedPrinciples: { type: Type.ARRAY, items: { type: Type.STRING } },
              synthesis: { type: Type.STRING, description: 'A potential new conclusion combining both views.' }
            },
            required: ['sharedPrinciples', 'synthesis']
          }
        }
      });
      // Correctly access .text property from GenerateContentResponse.
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Common Ground Error:", error);
      return null;
    }
  }
}

export const gemini = new GeminiService();
